<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use DateTime;

use App\Models\Product;
use App\Models\Custommer;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Delivery;
use App\Models\User;
use App\Models\Account;
use App\Models\Metric;

use Illuminate\Support\Facades\Log;
use PDF;

class BeOrderController extends Controller
{

    /**
     * Update the specified resource in storage.
     */
    public function payDebt(string $id)
    {
        //
        Order::find($id)->update([
            'order_flag' => 1,
        ]);
        return redirect()->route('get_admin.order.indexDebt');
    }

    /**
     * Display a listing of the resource.
     */
    public function indexDebt(Request $request)
    {
        //
        $account_name = $request->n ?? "";

        $account = Order::join('account', 'orders.account_id', '=', 'account.account_id')
            ->where('account.account_name', 'like', '%' . $account_name . '%')
            ->where('orders.order_flag', '=', 0)
            ->distinct()
            ->get([
                'account.account_id',
                'account.account_name'
            ]);

        $arrDebt = array();
        foreach($account as $item){
            $debt = Order::join('account', 'orders.account_id', '=', 'account.account_id')
                ->where('account.account_id', '=', $item->account_id)
                ->where('orders.order_flag', '=', 0)
                ->get();
            array_push($arrDebt, [
                'account'   => $item,
                'debts'     => $debt
            ]);
        }

        $viewData = [
            'debts' => $arrDebt
        ];

        return view('be.order.debt', $viewData);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $order_code = $request->n ?? "";

        $order = Order::join('account', 'orders.account_id', '=', 'account.account_id')
            ->where('order_code', 'like', '%' . $order_code . '%')
            ->where('order_type', '<>', 5)
            ->where('orders.wholesale', '<>', 1)
            ->get();

        $viewData = [
            'orders' => $order
        ];

        return view('be.order.index', $viewData);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $order = Order::where('order_id', '=', $id )
            ->where('order_type', '<>', 5)
            ->where('wholesale', '<>', 1)
            ->get();

        // $user = User::where('id', '=', $order[0]->account_id)
        //     ->get();

        $orderdetail = OrderDetail::join('product', 'product.product_id', '=', 'order_detail.product_id')
            ->where('order_detail.order_code', '=', $order[0]->order_code)
            ->get([
                'order_detail.order_detail_id',
                'order_detail.order_code',
                'order_detail.product_id',
                'order_detail.product_price',
                'order_detail.product_quantity',
                'order_detail.product_sale',
                'product.product_image',
                'product.product_name'
            ]);

        $delivery = Delivery::where('delivery_id', '=', $order[0]->delivery_id)
            ->get();

        $viewData = [
            'order'         => $order[0],
            //'user'          => $user[0],
            'delivery'      => $delivery[0],
            'orderdetail'   => $orderdetail
        ];

        return view('be.order.show', $viewData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id)
    {
        //
        $order = Order::where('order_id', '=', $id )
            ->get();
        Order::find($order[0]->order_id)->update([
            'order_status' => $order[0]->order_status + 1,
        ]);
        if($order[0]->wholesale == 1)
            return redirect()->route('get_admin.order.showWholesale', $id);
        else
            return redirect()->route('get_admin.order.show', $id);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $order = Order::where('order_id', '=', $id )
            ->get();
        Order::find($id)->update([
            'order_status' => -1,
        ]);
        if($order[0]->wholesale == 1)
            return redirect()->route('get_admin.order.showWholesale', $id);
        else
            return redirect()->route('get_admin.order.show', $id);
    }

    public function sendGHN(string $id){
        $data = new \stdClass();
        $data->payment_type_id = 1;
        $data->required_note = "KHONGCHOXEMHANG";

        $order = Order::where('order_id', '=', $id )
            ->get();

        // $user = User::where('id', '=', $order[0]->account_id)
        //     ->get();

        $orderdetail = OrderDetail::join('product', 'product.product_id', '=', 'order_detail.product_id')
            ->where('order_detail.order_code', '=', $order[0]->order_code)
            ->get([
                'order_detail.order_detail_id',
                'order_detail.order_code',
                'order_detail.product_id',
                'order_detail.product_price',
                'order_detail.product_quantity',
                'order_detail.product_sale',
                'product.product_name',
                'product.product_weight'
            ]);

        $delivery = Delivery::where('delivery_id', '=', $order[0]->delivery_id)
            ->get();

        $total = 0;
        $total_weight = 0;
        $quantity = 0;
        $items = array();
        foreach ($orderdetail as $value) {
            $item = new \stdClass();
            $item->name = $value['product_name'];
            $item->quantity =  intval($value['product_quantity']);
            $item->weight = intval($value['product_weight'])*intval($value['product_quantity']);
            $total_weight += intval($value['product_weight'])*intval($value['product_quantity']);

            $total += ($value['product_price'] - ($value['product_price'] / 100 * $value['product_sale'])) * $value['product_quantity'];
            $quantity += $value['product_quantity'];

            array_push($items, $item);
        }


        $data->client_order_code = (string)$order[0]->order_code;
        $data->note = $delivery[0]->delivery_note;
        $data->to_name = $delivery[0]->delivery_name;
        $data->to_phone = $delivery[0]->delivery_phone;
        $data->to_address = $delivery[0]->delivery_address;
        $data->to_ward_code = (string)$delivery[0]->ward;
        $data->to_district_id = $delivery[0]->district;

        $data->weight = $total_weight;
        $data->length = 1;
        $data->width = 19;
        $data->height = 10;
        $data->service_id = 0;
        $data->service_type_id = 2;

        $data->cod_amount = $total;
        $data->insurance_value = $total;
        $data->items = $items;

        //dd($data);

        $GHN = createOrderGHN($data);
        if($GHN['code'] == 200)
        {
            $this->CUmetric($total, $quantity);
            Order::find($order[0]->order_id)->update([
                'order_status' => $order[0]->order_status + 1,
                'GHN_code'  => $GHN["data"]['order_code'],
                'GHN_fee'   => $GHN["data"]['total_fee'],
            ]);
        }
        if($order[0]->wholesale == 1)
            return redirect()->route('get_admin.order.showWholesale', $id);
        else
            return redirect()->route('get_admin.order.show', $id);
    }

    protected function CUmetric($metric_sales, $metric_quantity){
        $now = (new DateTime('now', new \DateTimeZone('Asia/Ho_Chi_Minh')))->format('Y-m-d');

        $data = Metric::where('metric_date', '=', $now)->get();

        if(count($data) != 0){
            Metric::find($data[0]->metric_id)->update([
                'metric_quantity'   => $data[0]->metric_quantity + $metric_quantity,
                'metric_sales'      => $data[0]->metric_sales + $metric_sales,
                'metric_order'      => $data[0]->metric_order + 1
            ]);
        }else{
            Metric::create([
                'metric_quantity'   => $metric_quantity,
                'metric_sales'      => $metric_sales,
                'metric_order'      => 1,
                'metric_date'       => $now
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function indexOffline(Request $request)
    {
        //
        $order_code = $request->n ?? "";

        $order = Order::join('users', 'orders.account_id', '=', 'users.id')
            ->where('order_code', 'like', '%' . $order_code . '%')
            ->where('order_type', '=', 5)
            ->get();

        $viewData = [
            'orders' => $order,
            'page'      => 0 //index
        ];

        return view('be.order.indexOffline', $viewData);
    }

    public function createOffline()
    {
        $products = Product::all();
        $page = 0;

        return view('be.order.createOffline', compact('products', 'page'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeOffline(Request $request)
    {
        try{
            //
            $data = $request->except('_token');

            $delivery = [
                'delivery_address' => $data['delivery_address'],
                'delivery_name' => $data['delivery_name'],
                'delivery_phone' => $data['delivery_phone'],
            ];

            $delivery_id = Delivery::create($delivery)->delivery_id;

            $order_code = time();
            $order = [
                'order_code'    => $order_code,
                'delivery_id'   => $delivery_id,
                'account_id'    => $data['account_id'],
                'order_date'    => (new DateTime('now', new \DateTimeZone('Asia/Ho_Chi_Minh')))->format('Y-m-d H:i:s'),
                'order_status'  => 5,
                'order_type'    => 5,
                'wholesale'     => 0,
                'total_amount'  => $data['total_amount'],
            ];

            Order::create($order);

            $orderDetailArr = json_decode($data['pastValue']);

            for($i=0;$i<count($orderDetailArr); $i++){
                $orderDetail = [
                    'order_code'        => $order_code,
                    'product_id'        => $orderDetailArr[$i]->product_id,
                    'product_price'     => $orderDetailArr[$i]->product_price,
                    'product_quantity'  => $orderDetailArr[$i]->product_quantity,
                    'product_sale'      => $orderDetailArr[$i]->product_sale
                ];

                $product = Product::find($orderDetailArr[$i]->product_id);
                Product::find($orderDetailArr[$i]->product_id)->update([
                    'quantity_available' => (int)$product->quantity_available - (int)$orderDetailArr[$i]->product_quantity
                ]);

                OrderDetail::create($orderDetail);
            }

        } catch ( \Exception $exception ) {
            Log::error("ERROR => OrderController@store => " . $exception->getMessage());
            toastr()->error($exception->getMessage(), 'Thông báo');
            return redirect()->route('get_admin.order.create');
        }

        toastr()->success('Xử lý thành công', 'Thông báo');
        return redirect()->route('get_admin.order.indexOffline');
    }

    /**
     * Display the specified resource.
     */
    public function showOffline(string $id)
    {
        //
        // $order_code = $request->n ?? "";

        $order = Order::where('order_id', 'like', '%' . $id . '%')
            ->where('order_type', '=', 5)
            ->get();

        // $user = User::where('id', '=', $order[0]->account_id)
        //     ->get();

        $orderdetail = OrderDetail::join('products', 'products.product_id', '=', 'order_detail.product_id')
            ->where('order_detail.order_code', '=', $order[0]->order_code)
            ->get([
                'order_detail.order_detail_id',
                'order_detail.order_code',
                'order_detail.product_id',
                'order_detail.product_price',
                'order_detail.product_quantity',
                'order_detail.product_sale',
                'products.product_image',
                'product.product_name'
            ]);

        $delivery = Delivery::where('delivery_id', '=', $order[0]->delivery_id)
            ->get();

        $viewData = [
            'order'         => $order[0],
            //'user'          => $user[0],
            'delivery'      => $delivery[0],
            'orderdetail'   => $orderdetail
        ];

        return view('be.order.showOffline', $viewData);
    }


    /**
     * Display a listing of the resource.
     */
    public function indexWholesale(Request $request)
    {
        //
        $a = NULL;
        $b = 0;
        $order_code = $request->n ?? "";

        $order = Order::join('account', 'orders.account_id', '=', 'account.account_id')
            ->where('order_code', 'like', '%' . $order_code . '%')
            ->where('order_type', '<>', 5)
            ->where('orders.wholesale', '=', 1)
            ->where(function ($query) use ($a, $b) {
                return $query->where('parent_id', '=', $a)
                            ->orWhere('parent_id', '=', $b);
            })
            ->get();

        $viewData = [
            'orders' => $order
        ];

        return view('be.order.indexWholesale', $viewData);
    }

    /**
     * Display the specified resource.
     */
    public function showWholesale(string $id)
    {
        //
        $a = NULL;
        $b = 0;
        $order = Order::where('order_id', '=', $id )
            ->where('order_type', '<>', 5)
            ->where('wholesale', '=', 1)
            ->where(function ($query) use ($a, $b) {
                return $query->where('parent_id', '=', $a)
                            ->orWhere('parent_id', '=', $b);
            })
            ->get();

        // $user = User::where('id', '=', $order[0]->account_id)
        //     ->get();

        $orderdetail = OrderDetail::join('product', 'product.product_id', '=', 'order_detail.product_id')
            ->where('order_detail.order_code', '=', $order[0]->order_code)
            ->get([
                'order_detail.order_detail_id',
                'order_detail.order_code',
                'order_detail.product_id',
                'order_detail.product_price',
                'order_detail.product_quantity',
                'order_detail.product_sale',
                'product.product_image',
                'product.product_name'
            ]);

        $delivery = Delivery::where('delivery_id', '=', $order[0]->delivery_id)
            ->get();

        $viewData = [
            'order'         => $order[0],
            //'user'          => $user[0],
            'delivery'      => $delivery[0],
            'orderdetail'   => $orderdetail
        ];

        return view('be.order.showWholesale', $viewData);
    }

    /**
     * Display the specified resource.
     */
    public function showWholesale2(string $id)
    {
        //
        $a = NULL;
        $b = 0;
        $order = Order::where('order_id', '=', $id )
            ->where('order_type', '<>', 5)
            ->where('wholesale', '=', 1)
            ->get();

        // $user = User::where('id', '=', $order[0]->account_id)
        //     ->get();

        $orderdetail = OrderDetail::join('product', 'product.product_id', '=', 'order_detail.product_id')
            ->where('order_detail.order_code', '=', $order[0]->order_code)
            ->get([
                'order_detail.order_detail_id',
                'order_detail.order_code',
                'order_detail.product_id',
                'order_detail.product_price',
                'order_detail.product_quantity',
                'order_detail.product_sale',
                'product.product_image',
                'product.product_name'
            ]);

        $delivery = Delivery::where('delivery_id', '=', $order[0]->delivery_id)
            ->get();


        $orderChilds = Order::where('parent_id', '=',  $order[0]->order_code)
            ->where('order_type', '<>', 5)
            ->where('wholesale', '=', 1)
            ->get();

        $orderChildsDetail = array();
        foreach($orderChilds as $child){
            $detail = OrderDetail::join('product', 'product.product_id', '=', 'order_detail.product_id')
                ->where('order_detail.order_code', '=', $child->order_code)
                ->get([
                    'order_detail.order_detail_id',
                    'order_detail.order_code',
                    'order_detail.product_id',
                    'order_detail.product_price',
                    'order_detail.product_quantity',
                    'order_detail.product_sale',
                    'product.product_image',
                    'product.product_name'
                ]);
            $deliveryChild = Delivery::where('delivery_id', '=', $child->delivery_id)
                ->get();
            array_push($orderChildsDetail, [
                'order' => $child,
                'detail' => $detail,
                'delivery' => $deliveryChild
            ]);
        }

        $viewData = [
            'order'         => $order[0],
            'delivery'      => $delivery[0],
            'orderdetail'   => $orderdetail,
            'orderChildsDetail' => $orderChildsDetail
        ];

        return view('be.order.showWholesale2', $viewData);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function createWholesale2(Request $request, $id)
    {
        try{
            //
            $data = $request->except('_token');
            //dd($data['parent_id']);
            //dd($data['jsonData']);

            $parent = Order::where('order_code', '=', $data['parent_id'])->get();
            $detail = json_decode($data['jsonData']);
            $order_code = time();

            $total_amount = 0;
            foreach($detail as $item){
                $orderDetail = [
                    'order_code'        => $order_code,
                    'product_id'        => $item->id,
                    'product_price'     => $item->price,
                    'product_quantity'  => $item->quantity,
                    'product_sale'      => 0
                ];

                $product = Product::find($item->id);
                Product::find($item->id)->update([
                    'quantity_available' => (int)$product->quantity_available - (int)$item->quantity
                ]);

                OrderDetail::create($orderDetail);

                $total_amount += $item->price*$item->quantity - $item->ck;
            }

            $order = [
                'order_code'    => $order_code,
                'delivery_id'   => $parent[0]->delivery_id,
                'account_id'    => $parent[0]->account_id,
                'order_date'    => (new DateTime('now', new \DateTimeZone('Asia/Ho_Chi_Minh')))->format('Y-m-d H:i:s'),
                'order_status'  => 0,
                'order_type'    => 1,
                'wholesale'     => 1,
                'total_amount'  => $total_amount,
                'parent_id'     => $data['parent_id']
            ];

            Order::create($order);

        } catch ( \Exception $exception ) {
            Log::error("ERROR => OrderController@store => " . $exception->getMessage());
            toastr()->error($exception->getMessage(), 'Thông báo');
            return redirect()->route('get_admin.order.showWholesale2', $id);
        }

        toastr()->success('Xử lý thành công', 'Thông báo');
        return redirect()->route('get_admin.order.showWholesale2', $id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDebt0(string $id)
    {
        //
        $order = Order::where('order_id', '=', $id )
            ->get();
        Order::find($order[0]->order_id)->update([
            'order_status' => $order[0]->order_status + 1,
            'order_flag' => 0,
        ]);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateDebt1(string $id)
    {
        //
        $order = Order::where('order_id', '=', $id )
            ->get();
        Order::find($order[0]->order_id)->update([
            'order_status' => $order[0]->order_status + 1,
            'order_flag' => 1,
        ]);

        return redirect()->back();

    }

    /**
     * Update the specified resource in storage.
     */
    public function updateWholesale(string $id)
    {
        //
        $order = Order::where('order_id', '=', $id )
            ->get();
        Order::find($order[0]->order_id)->update([
            'order_status' => $order[0]->order_status + 1,
        ]);

        return redirect()->back();
    }

    public function sendGHNWholesale(string $id){
        $data = new \stdClass();
        $data->payment_type_id = 1;
        $data->required_note = "KHONGCHOXEMHANG";

        $order = Order::where('order_id', '=', $id )
            ->get();

        // $user = User::where('id', '=', $order[0]->account_id)
        //     ->get();

        $orderdetail = OrderDetail::join('product', 'product.product_id', '=', 'order_detail.product_id')
            ->where('order_detail.order_code', '=', $order[0]->order_code)
            ->get([
                'order_detail.order_detail_id',
                'order_detail.order_code',
                'order_detail.product_id',
                'order_detail.product_price',
                'order_detail.product_quantity',
                'order_detail.product_sale',
                'product.product_name',
                'product.product_weight'
            ]);

        $delivery = Delivery::where('delivery_id', '=', $order[0]->delivery_id)
            ->get();

        $total = 0;
        $total_weight = 0;
        $quantity = 0;
        $items = array();
        foreach ($orderdetail as $value) {
            $item = new \stdClass();
            $item->name = $value['product_name'];
            $item->quantity =  intval($value['product_quantity']);
            $item->weight = intval($value['product_weight'])*intval($value['product_quantity']);
            $total_weight += intval($value['product_weight'])*intval($value['product_quantity']);

            $total += ($value['product_price'] - ($value['product_price'] / 100 * $value['product_sale'])) * $value['product_quantity'];
            $quantity += $value['product_quantity'];

            array_push($items, $item);
        }


        $data->client_order_code = (string)$order[0]->order_code;
        $data->note = $delivery[0]->delivery_note;
        $data->to_name = $delivery[0]->delivery_name;
        $data->to_phone = $delivery[0]->delivery_phone;
        $data->to_address = $delivery[0]->delivery_address;
        $data->to_ward_code = (string)$delivery[0]->ward;
        $data->to_district_id = $delivery[0]->district;

        $data->weight = $total_weight;
        $data->length = 1;
        $data->width = 19;
        $data->height = 10;
        $data->service_id = 0;
        $data->service_type_id = 2;

        $data->cod_amount = $total;
        $data->insurance_value = $total;
        $data->items = $items;

        //dd($data);

        $GHN = createOrderGHN($data);
        if($GHN['code'] == 200)
        {
            $this->CUmetric($total, $quantity);
            Order::find($order[0]->order_id)->update([
                'order_status' => $order[0]->order_status + 1,
                'GHN_code'  => $GHN["data"]['order_code'],
                'GHN_fee'   => $GHN["data"]['total_fee'],
            ]);
        }

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateFinished(string $id)
    {
        //
        $order = Order::where('order_id', '=', $id )
            ->get();
        Order::find($order[0]->order_id)->update([
            'order_status' => 3
        ]);

        return redirect()->route('get_admin.order.indexWholesale');
    }

    public function print(string $id)
    {
        //
        $order = Order::where('order_id', '=', $id )
            ->get();

        // $user = User::where('id', '=', $order[0]->account_id)
        //     ->get();

        $orderdetail = OrderDetail::join('product', 'product.product_id', '=', 'order_detail.product_id')
            ->where('order_detail.order_code', '=', $order[0]->order_code)
            ->get([
                'order_detail.order_detail_id',
                'order_detail.order_code',
                'order_detail.product_id',
                'order_detail.product_price',
                'order_detail.product_quantity',
                'order_detail.product_sale',
                'product.product_image',
                'product.product_name'
            ]);

        $delivery = Delivery::where('delivery_id', '=', $order[0]->delivery_id)
            ->get();

        $order = $order[0];
        $delivery = $delivery[0];

        PDF::setPrintHeader(false);
        PDF::setPrintFooter(false);

        // set default monospaced font
        PDF::SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

        // set margins
        PDF::SetMargins(PDF_MARGIN_LEFT, 10, PDF_MARGIN_RIGHT);

        // set auto page breaks
        PDF::SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

        // set image scale factor
        PDF::setImageScale(PDF_IMAGE_SCALE_RATIO);

        // set some language-dependent strings (optional)
        if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
            require_once(dirname(__FILE__).'/lang/eng.php');
            PDF::setLanguageArray($l);
        }

        // ---------------------------------------------------------

        PDF::setFontSubsetting(true);
        PDF::SetFont('dejavuserifcondensed', '', 12);


        // add a page
        PDF::AddPage('L');

        $htmlHeader = '
            <table>
                <tr>
                    <td style="width: 40%; text-align: left; ">
                        <span style="font-weight: bold; font-size: 15px;">Tên cửa hàng: </span><span style="font-weight: bold; font-size: 20px;">MTFoods</span><br/>
                        <span style="font-weight: bold; font-size: 15px;">Địa chỉ: </span><span style="font-size: 15px;">190 đường TL15, Thạnh Lộc, quận 12, HCM</span><br/>
                    </td>
                    <td style="text-align: center; width: 60%;">
                        <span style="font-weight: bold; font-size: 30px;">HÓA ĐƠN BÁN HÀNG</span>
                    </td>
                </tr>
            </table>
            ';
        PDF::writeHTML($htmlHeader, true, false, true, false, '');
        PDF::Ln(5);


        $htmInfo = '
            <table style="width: 100%;">
                <tr>
                    <td style="text-align: left;width: 150px;">
                        <span style="font-weight: bold; font-size: 15px;">Tên khách hàng: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$delivery['delivery_name'].'</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;width: 150px;">
                        <span style="font-weight: bold; font-size: 15px;">Địa chỉ: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$delivery['delivery_address'].'</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;width: 150px;">
                        <span style="font-weight: bold; font-size: 15px;">SĐT KH: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$delivery['delivery_phone'].'</span>
                    </td>
                </tr>
            </table>
            ';


        $htmOderInfo = '
            <table style="width: 100%;">
                <tr>
                    <td style="text-align: left;width: 150px;">
                        <span style="font-weight: bold; font-size: 15px;">Mã đơn hàng: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$order['order_code'].'</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;width: 150px;">
                        <span style="font-weight: bold; font-size: 15px;">Thời gian: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$order['order_date'].'</span>
                    </td>
                </tr>
            </table>
            ';

        $htmMiddle = '
            <table style="width: 100%;">
                <tr>
                    <td style="width: 50%;">
                        '.$htmInfo.'
                    </td>
                    <td style="width: 50%;">
                        '.$htmOderInfo.'
                    </td>
                </tr>
            </table>
            ';

        PDF::writeHTML($htmMiddle, true, false, true, false, '');
        PDF::Ln(5);

        $width_cell=array(10,20,150,25,30,40);

        PDF::Cell($width_cell[0],10,'ID',1,0,'C',false);
        PDF::Cell($width_cell[1],10,'Mã SP',1,0,'C',false);
        PDF::Cell($width_cell[2],10,'Tên sản phẩm',1,0,'C',false);
        PDF::Cell($width_cell[3],10,'Số lượng',1,0,'C',false);
        PDF::Cell($width_cell[4],10,'Đơn giá',1,0,'C',false);
        PDF::Cell($width_cell[5],10,'Thành tiền',1,1,'C',false);
        PDF::SetFillColor(235,236,236);
        $fill=false;
        $i = 0;
        $total = $order['total_amount'];
        foreach($orderdetail as $row){
            $i++;
            PDF::Cell($width_cell[0],10,$i,1,0,'C',$fill);
            PDF::Cell($width_cell[1],10,$row['product_id'],1,0,'C',$fill);
            PDF::Cell($width_cell[2],10,$row['product_name'],1,0,'C',$fill);
            PDF::Cell($width_cell[3],10,$row['product_quantity'],1,0,'C',$fill);
            PDF::Cell($width_cell[4],10,number_format($row['product_price'] - ($row['product_price'] / 100 * $row['product_sale'])).'đ',1,0,'C',$fill);
            PDF::Cell($width_cell[5],10,number_format(($row['product_price'] - ($row['product_price'] / 100 * $row['product_sale']))*$row['product_quantity'])."đ",1,1,'C',$fill);
            $fill = !$fill;

        }
        PDF::Cell(235,10,'TỔNG CỘNG',1,0,'C',false);
        PDF::Cell($width_cell[5],10,number_format($total).'đ',1,1,'C',false);
        PDF::Ln(5);

        $htmlThanhtien = '
            <table style="width: 100%; font-size: 13px;">
                <tr>
                    <td style="font-style: italic; width: 30%;">
                        <span style="font-size: 15px;">Thành tiền (viết bằng chữ): </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.VndText($total).' ./. </span>
                    </td>
                </tr>
            </table>
            ';
        PDF::writeHTML($htmlThanhtien, true, false, true, false, '');
        PDF::Ln(10);

        PDF::Cell(200,10,'',0,0,'C',false);
        PDF::Cell(75,10,'Ngày ...... tháng ...... năm 20....',0,0,'C',false);
        PDF::Ln(6);
        PDF::Cell(69,10,'KHÁCH HÀNG',0,0,'C',false);
        PDF::Cell(69,10,'NGƯỜI NHẬN',0,0,'C',false);
        PDF::Cell(68,10,'NHÂN VIÊN GIAO',0,0,'C',false);
        PDF::Cell(69,10,'CỬA HÀNG',0,0,'C',false);
        PDF::Ln(10);
        PDF::Cell(69,10,'......................',0,0,'C',false);
        PDF::Cell(69,10,'......................',0,0,'C',false);
        PDF::Cell(68,10,'......................',0,0,'C',false);
        PDF::Cell(69,10,'......................',0,0,'C',false);


	// ---------------------------------------------------------

	//Close and output PDF document
        $filename = storage_path() . '/'.$order->order_code.'.pdf';
        PDF::output($filename, 'F');

	//============================================================+
	// END OF FILE
	//============================================================+

        return response()->file($filename);
    }
}
