<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inventory;
use App\Models\InventoryDetail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use DateTime;
use Illuminate\Support\Facades\Log;
use PDF;

class BeInventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $inventory_name = $request->n ?? "";

        $inventory = Inventory::join('account', 'inventory.account_id', '=', 'account.account_id')
            ->where('account_name', 'like', '%' . $inventory_name . '%')
            ->get();

        $viewData = [
            'inventory' => $inventory,
            'page'      => 0 //index
        ];

        return view('be.inventory.index', $viewData);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try{
            $data = $request->except('_token');

            //dd($data);
            $inventory_code = time();

            $inventory = [
                'inventory_code'    => $inventory_code,
                'inventory_note'    => $data['inventory_note'],
                'staf_name'         => $data['staf_name'],
                'supplier_name'     => $data['supplier_name'],
                'supplier_phone'    => $data['inventory_phone'],
                'account_id'        => $data['account_id'],
                'inventory_status'  => $data['inventory_status'],
                'total_amount'      => $data['total_amount'],
                'inventory_date'    => (new DateTime('now', new \DateTimeZone('Asia/Ho_Chi_Minh')))->format('Y-m-d H:i:s')
            ];
            Inventory::create($inventory);

            $inventoryDetailArr = json_decode($data['pastValue']);

            for($i=0;$i<count($inventoryDetailArr); $i++){
                $inventoryDetail = [
                    'inventory_code'        => $inventory_code,
                    'product_id'            => $inventoryDetailArr[$i]->product_id,
                    'product_date_import'   => $inventoryDetailArr[$i]->product_date_import,
                    'product_quantity'      => $inventoryDetailArr[$i]->product_quantity,
                    'product_price_import'  => $inventoryDetailArr[$i]->product_price_import,
                    'product_quantity'      => $inventoryDetailArr[$i]->product_quantity
                ];

                $product = Product::find($inventoryDetailArr[$i]->product_id);
                Product::find($inventoryDetailArr[$i]->product_id)->update([
                    'quantity_available' => (int)$inventoryDetailArr[$i]->product_quantity + (int)$product->quantity_available
                ]);

                InventoryDetail::create($inventoryDetail);
            }

        } catch ( \Exception $exception ) {
            Log::error("ERROR => InventoryController@store => " . $exception->getMessage());
            toastr()->error($exception->getMessage(), 'Thông báo');
            return redirect()->route('get_admin.inventory.create');
        }

        toastr()->success('Xử lý thành công', 'Thông báo');
        return redirect()->route('get_admin.inventory.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        $inventory = Inventory::join('account', 'inventory.account_id', '=', 'account.account_id')
            ->where('inventory_id', '=', $id)
            ->get();

        $inventory_detail = InventoryDetail::join('inventory', 'inventory.inventory_code', '=', 'inventory_detail.inventory_code')
            ->join('product', 'product.product_id', '=', 'inventory_detail.product_id')
            ->where('inventory.inventory_id', '=', $id)
            ->get();

        $viewData = [
            'inventory'         => $inventory[0],
            'inventory_detail'  => $inventory_detail,
            'page'              => 1 //show
        ];

        return view('be.inventory.show', $viewData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function create()
    {
        $products = Product::all();
        $page = 0;

        return view('be.inventory.create', compact('products', 'page'));
    }

    public function print(string $id)
    {
        //
        $inventory = Inventory::join('account', 'inventory.account_id', '=', 'account.account_id')
            ->where('inventory_id', '=', $id)
            ->get();

        $inventory_detail = InventoryDetail::join('inventory', 'inventory.inventory_code', '=', 'inventory_detail.inventory_code')
            ->join('product', 'product.product_id', '=', 'inventory_detail.product_id')
            ->where('inventory.inventory_id', '=', $id)
            ->get();

        $inventory = $inventory[0];

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

        // PDF::Write(10,"Mã đơn hàng: ".$row_info['order_code']."");
            // PDF::Ln(10);

            // PDF::Write(10,"Thời gian: ".$row_info['order_date']);
            // PDF::Ln(20);

            // PDF::Write(10,"Tên khách hàng: ".$row_info['delivery_name']);
            // PDF::Ln(10);

            // PDF::Write(10,"SĐT khách hàng: ".$row_info['delivery_phone']);
            // PDF::Ln(10);

            // PDF::Write(10,"Địa chỉ khách hàng: ".$row_info['delivery_address']);
            // PDF::Ln(20);

        $htmlHeader = '
            <table>
                <tr>
                    <td style="width: 40%; text-align: left; ">
                        <span style="font-weight: bold; font-size: 15px;">Tên cửa hàng: </span><span style="font-weight: bold; font-size: 20px;">MTFoods</span><br/>
                        <span style="font-weight: bold; font-size: 15px;">Địa chỉ: </span><span style="font-size: 15px;">190 đường TL15, Thạnh Lộc, quận 12, HCM</span><br/>
                    </td>
                    <td style="text-align: center; width: 60%;">
                        <span style="font-weight: bold; font-size: 30px;">PHIẾU NHẬP KHO</span>
                    </td>
                </tr>
            </table>
            ';
        PDF::writeHTML($htmlHeader, true, false, true, false, '');
        PDF::Ln(5);


        $htmInfo = '
            <table style="width: 100%;">
                <tr>
                    <td style="text-align: left;width: 170px;">
                        <span style="font-weight: bold; font-size: 15px;">Nhân viên nhập: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$inventory['staf_name'].'</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;width: 170px;">
                        <span style="font-weight: bold; font-size: 15px;">Tên nhà cung cấp: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$inventory['supplier_name'].'</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;width: 170px;">
                        <span style="font-weight: bold; font-size: 15px;">SĐT nhà cung cấp: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$inventory['supplier_phone'].'</span>
                    </td>
                </tr>
            </table>
            ';


        $htmOderInfo = '
            <table style="width: 100%;">
                <tr>
                    <td style="text-align: left;width: 150px;">
                        <span style="font-weight: bold; font-size: 15px;">Mã phiếu nhập: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$inventory['inventory_code'].'</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left;width: 150px;">
                        <span style="font-weight: bold; font-size: 15px;">Thời gian nhập: </span>
                    </td>
                    <td style="text-align: left; border-bottom: 1px dashed gray">
                        <span style="font-size: 15px;">'.$inventory['inventory_date'].'</span>
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

        $width_cell=array(10,20,120,25,30,35,30);

        PDF::Cell($width_cell[0],10,'ID',1,0,'C',false);
        PDF::Cell($width_cell[1],10,'Mã SP',1,0,'C',false);
        PDF::Cell($width_cell[2],10,'Tên sản phẩm',1,0,'C',false);
        PDF::Cell($width_cell[3],10,'Số lượng',1,0,'C',false);
        PDF::Cell($width_cell[4],10,'Giá',1,0,'C',false);
        PDF::Cell($width_cell[5],10,'Tổng tiền',1,0,'C',false);
        PDF::Cell($width_cell[6],10,'HSD',1,1,'C',false);
        PDF::SetFillColor(235,236,236);
        $fill=false;
        $i = 0;
        $total = 0;
        foreach($inventory_detail as $row){
            $i++;
            $total += $row['product_price_import']*$row['product_quantity'];
        PDF::Cell($width_cell[0],10,$i,1,0,'C',$fill);
        PDF::Cell($width_cell[1],10,$row['product_id'],1,0,'C',$fill);
        PDF::Cell($width_cell[2],10,$row['product_name'],1,0,'C',$fill);
        PDF::Cell($width_cell[3],10,$row['product_quantity'],1,0,'C',$fill);
        PDF::Cell($width_cell[4],10,number_format($row['product_price_import']).'đ',1,0,'C',$fill);
        PDF::Cell($width_cell[5],10,number_format($row['product_price_import']*$row['product_quantity']).'đ',1,0,'C',$fill);
        PDF::Cell($width_cell[6],10,$row['product_date_import'],1,1,'C',$fill);
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

        PDF::Cell(183,10,'',0,0,'C',false);
        PDF::Cell(92,10,'Ngày ...... tháng ...... năm 20....',0,0,'C',false);
        PDF::Ln(6);
        PDF::Cell(91,10,'NHÂN VIÊN GIAO',0,0,'C',false);
        PDF::Cell(92,10,'NGƯỜI NHẬN',0,0,'C',false);
        PDF::Cell(92,10,'NHÂN VIÊN NHẬP',0,0,'C',false);
        PDF::Ln(10);
        PDF::Cell(91,10,'......................',0,0,'C',false);
        PDF::Cell(92,10,'......................',0,0,'C',false);
        PDF::Cell(92,10,'......................',0,0,'C',false);


        // ---------------------------------------------------------

        //Close and output PDF document
        PDF::Output();

        //============================================================+
        // END OF FILE
        //============================================================+


	// ---------------------------------------------------------

	//Close and output PDF document
        $filename = storage_path() . '/'.$inventory['inventory_code'].'.pdf';
        PDF::output($filename, 'F');

	//============================================================+
	// END OF FILE
	//============================================================+

        return response()->file($filename);
    }
}
