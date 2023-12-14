<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\createOrderRequest;
use App\Http\Requests\getOrderDetailRequest;
use App\Http\Requests\getOrdersRequest;
use App\Http\Requests\getOrderVoucherRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\orderDetailBatch;
use App\Models\OrderDiscount;
use App\Models\Product;
use App\Models\ProductBatch;
use App\Models\ProductDiscount;
use App\Models\ProductHaveTag;
use App\Models\ProductPricing;
use App\Models\ProductTag;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPSTORM_META\map;

class OrderController extends Controller
{
    public function getOrders(getOrdersRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();


            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            /** @var \App\Models\Order $order */
            $orders = Order::where('customer_id', $data['customerId']);

            //get type from request
            $type = "all";
            if (isset($data['type'])) {
                $type = $data['type'];
            }
            array('created', 'waiting_payment', 'waiting_confirm_payment', 'waiting_confirm', 'packing', 'waiting_shipment', 'shipping', 'delivered', 'completed', 'cancel_waiting_refund', 'canceled_refund', 'canceled', 'return_wating_refund', 'returned');
            //Get orders based on type
            if ($type == "all") {
                $orders = $orders;
            } else if ($type == "created") {
                $orders = $orders->where('status', 'created');
            } else if ($type == "waitingPayment") {
                $orders = $orders->whereIn('status', ['waiting_payment', 'waiting_confirm_payment', 'waiting_confirm']);
            } else if ($type == "preparing") {
                $orders = $orders->where('status', 'packing');
            } else if ($type == "waitingDelivery") {
                $orders = $orders->where('status', 'waiting_shipment');
            } else if ($type == "delivering") {
                $orders = $orders->where('status', 'shipping');
            } else if ($type == "delivered") {
                $orders = $orders->whereIn('status', ['delivered', 'completed']);
            } else if ($type == "canceled") {
                $orders = $orders->whereIn('status', ['cancel_waiting_refund', 'canceled_refund', 'canceled']);
            } else if ($type == "return") {
                $orders = $orders->whereIn('status', ['return_waiting_refund', 'returned']);
            }

            //If user search by keyword
            if (isset($data['keyword'])) {
                //Search within orders
                $searchOrders = Order::search((string)$data['keyword'])->keys()->all();


                //Search within products
                $searchProducts = Product::search((string)$data['keyword'])->keys();

                $searchByProducts = Product::whereIn('id', $searchProducts)->withWhereHas('orderDetail.order', function (Builder $query)  use ($data, $searchProducts) {
                    $query->where('customer_id', $data['customerId']);
                })->get();

                $searchOrder = [];
                foreach ($searchByProducts as $searchByProduct) {

                    foreach ($searchByProduct['orderDetail'] as $orderDetail) {
                        if (isset($orderDetail['order'])) {
                            array_push($searchOrder, $orderDetail['order']['id']);
                        }
                    }
                }

                //Sort based on products and orders search
                $keywordOrders = array_merge($searchOrder, $searchOrders);
                $orders = $orders->whereIn('id', $keywordOrders);
            }

            //Get order details and its relationships
            $orders = $orders->with([
                'orderDetail' => [
                    'product'
                ],
            ]);

            //Get length of orders
            $totalOrders = $orders->count();
            $offset = 0;
            $limit = 10;

            if (isset($data['offset'])) {
                $offset = $data['offset'];
            }
            if (isset($data['limit'])) {
                $limit = $data['limit'];
            }

            $orders = $orders->skip($offset)->take($limit)->orderBy('updated_at', 'desc')->get();

            //Append media path
            $productPath = 'storage/product/';

            foreach ($orders as $order) {
                foreach ($order->orderDetail as $orderDetail) {
                    if ($orderDetail->product->image_url) {

                        $productId = $orderDetail->product->id;

                        $fullPath = $productPath . $productId . "/" . $orderDetail->product->image_url;

                        $orderDetail->product->image_path = asset($fullPath);
                    }
                }
            }



            return response(['message' => 'getOrdersSuccessfully', 'result' => ['orders' => $orders, 'totalOrders' => $totalOrders]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function orderSearch(getOrdersRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();


            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            /** @var \App\Models\Order $order */
            $orders = Order::where('customer_id', $data['customerId']);

            //get type from request
            $type = "all";
            if (isset($data['type'])) {
                $type = $data['type'];
            }
            array('created', 'waiting_payment', 'waiting_confirm_payment', 'waiting_confirm', 'packing', 'waiting_shipment', 'shipping', 'delivered', 'completed', 'cancel_waiting_refund', 'canceled_refund', 'canceled', 'return_waiting_refund', 'returned');
            //Get orders based on type
            if ($type == "all") {
                $orders = $orders;
            } else if ($type == "created") {
                $orders = $orders->where('status', 'created');
            } else if ($type == "waitingPayment") {
                $orders = $orders->whereIn('status', ['waiting_payment', 'waiting_confirm_payment', 'waiting_confirm']);
            } else if ($type == "preparing") {
                $orders = $orders->where('status', 'packing');
            } else if ($type == "waitingDelivery") {
                $orders = $orders->where('status', 'waiting_shipment');
            } else if ($type == "delivering") {
                $orders = $orders->where('status', 'shipping');
            } else if ($type == "delivered") {
                $orders = $orders->whereIn('status', ['delivered', 'completed']);
            } else if ($type == "canceled") {
                $orders = $orders->whereIn('status', ['cancel_waiting_refund', 'canceled_refund', 'canceled']);
            } else if ($type == "return") {
                $orders = $orders->whereIn('status', ['return_waiting_refund', 'returned']);
            }

            //If user search by keyword
            if (isset($data['keyword'])) {
                //Search within orders
                $searchOrders = Order::search((string)$data['keyword'])->keys()->all();


                //Search within products
                $searchProducts = Product::search((string)$data['keyword'])->keys();

                $searchByProducts = Product::whereIn('id', $searchProducts)->withWhereHas('orderDetail.order', function (Builder $query)  use ($data, $searchProducts) {
                    $query->where('customer_id', $data['customerId']);
                })->get();

                $searchOrder = [];
                foreach ($searchByProducts as $searchByProduct) {

                    foreach ($searchByProduct['orderDetail'] as $orderDetail) {
                        if (isset($orderDetail['order'])) {
                            array_push($searchOrder, $orderDetail['order']['id']);
                        }
                    }
                }

                //Sort based on products and orders search
                $keywordOrders = array_merge($searchOrder, $searchOrders);
                $orders = $orders->whereIn('id', $keywordOrders);
            }

            //Get order details and its relationships
            $orders = $orders->with([
                'orderDetail' => [
                    'product'
                ],
            ]);

            //Get length of orders
            $totalOrders = $orders->count();
            $offset = 0;
            $limit = 5;

            if (isset($data['offset'])) {
                $offset = $data['offset'];
            }
            if (isset($data['limit'])) {
                $limit = $data['limit'];
            }

            $orders = $orders->skip($offset)->take($limit)->get(['id', 'order_code']);




            return response(['message' => 'getOrdersSuccessfully', 'result' => ['orders' => $orders, 'totalOrders' => $totalOrders]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }


    public function getOrderDetail(getOrderDetailRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();


            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            /** @var \App\Models\Order $order */
            $order = Order::where('id', $data['orderId']);

            //Get order details and its relationships
            $order = $order->with([
                'orderDetail' => [
                    'product'
                ],
            ]);

            $order = $order->first();
            //Append media path
            $productPath = 'storage/product/';

            foreach ($order->orderDetail as $orderDetail) {

                if ($imageName = $orderDetail->product->image_url) {
                    $fullPath = $productPath . $orderDetail->product->id . "/" . $imageName;
                    $orderDetail->product->image_url = asset($fullPath);
                }
            }

            return response(['message' => 'getProductDetailSuccessfully', 'result' => ['order' => $order]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getOrderVoucher(getOrderVoucherRequest $request)
    {
        try {
            $data = $request->validated();

            /** @var \App\Models\Order $order */
            $voucher = OrderDiscount::where('is_active', 1);

            $voucher = $voucher->orderBy('total_discount', 'desc')->get();

            return response(['message' => 'getOrderVoucherSuccessfully', 'result' => ['voucher' => $voucher]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function createOrder(createOrderRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();


            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['customer_id']);

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            //Begin transaction for creating order
            DB::beginTransaction();


            //Create order with initial information
            $payment_method = $data['payment_method'];
            $delivery_method = $data['delivery_method'];
            $customer_id = $data['customer_id'];
            $delivery_address_id = $data['delivery_address_id'];
            $order_code = Carbon::now()->timestamp;
            $newOrder = Order::create([
                'order_code' => $order_code,
                'payment_method' => $payment_method,
                'delivery_method' => $delivery_method,
                'customer_id' => $customer_id,
                'delivery_address_id' => $delivery_address_id,
                'status' => 'created'
            ]);

            //Init order amount
            $total = 0;
            $subtotal = 0;
            $shipping_subtotal = 0;
            $voucher_discount = 0;
            $products_discount = 0;
            $vat = 0;

            //Products user want to buy, including {id: productId, quantity: productQuantity}
            $products = $data['products'];

            //Create order detail, calculate amount for each product
            foreach ($products as $orderProduct) {

                //Get products discount
                $highestDiscount = ProductDiscount::select('product_discounts.product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                    ->where('is_active', true)
                    ->groupBy('product_discounts.product_id');
                $product = Product::where('id', $orderProduct['id'])->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                    $join->on('products.id', '=', 'highest_discount.product_id');
                });

                $product = $product->selectRaw('products.id,products.name,products.image_url,products.is_wholesale,products.category_id,products.rating,products.quantity_available,products.updated_at,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount');
                $product = $product->first();


                // If product doesn't exist
                if (!$product) {
                    return response(['message' => 'productNotAvailable', 'result' => []], 200);
                }


                // If product quantity is not enough for user 
                if ($product['quantity_available'] < $orderProduct['quantity']) {
                    return response(['message' => 'productQuantityNotAvailable', 'result' => ['product' => $product]], 402);
                }


                // Create order detail

                //Product batches, there may be more then 1 available batch
                $batches = ProductBatch::where('product_id', $product['id'])->where('quantity_available', '>', 0)->orderBy('expiry_date', 'asc')->get();

                //Product pricing, there should be only 1 active price
                $pricing = ProductPricing::where('product_id', $product['id'])->where('is_active', 1)->first();

                //Product discount, there should be only 1 active discount
                $discount = ProductDiscount::where('product_id', $product['id'])->where('is_active', 1)->first();


                //Create order detail with informations
                $orderDetail = OrderDetail::create([
                    'quantity' => $orderProduct['quantity'],
                    'unit_price' => $product['priceDiscount'],
                    'unit_discount' =>  $product['max_discount_amount'] ? $product['max_discount_amount'] : 0,
                    'pricing_id' =>  $pricing['id'],
                    'discount_id' => $discount ? $discount['id'] : null,
                    'order_id' => $newOrder['id'],
                    'product_id' => $product['id']
                ]);

                //Get product quantity sold for batches
                $quantity = $orderProduct['quantity'];

                //Get new product quantity
                $product['quantity_available'] = $product['quantity_available'] - $quantity;
                $product->save();


                //Create order_detail_batch for each batch till quantity match
                foreach ($batches as $batch) {
                    if ($quantity > 0) {
                        //If batch quantities left is not enough => batch quantity left = 0;
                        if ($batch['quantity_available'] <= $quantity) {
                            orderDetailBatch::create([
                                'order_detail_id' => $orderDetail['id'],
                                'batch_id' => $batch['id'],
                                'quantity' => $batch['quantity_available']
                            ]);
                            $quantity = $quantity - $batch['quantity_available'];
                            $batch['quantity_available'] = 0;
                            $batch->save();
                        } else {
                            //If batch quantities left is enough => batch quantity left = batch quantity - number of product user need;
                            orderDetailBatch::create([
                                'order_detail_id' => $orderDetail['id'],
                                'batch_id' => $batch['id'],
                                'quantity' => $quantity
                            ]);

                            $batch['quantity_available'] = $batch['quantity_available'] - $quantity;
                            $quantity = 0;

                            $batch->save();
                        }
                    }
                }

                //Total price of products not including discount
                $subtotal = $subtotal + $product['price'] * $orderProduct['quantity'];

                //Total discount of products
                $products_discount = $products_discount + $product['max_discount_amount'] * $orderProduct['quantity'];
            }


            //Voucher 
            $voucher_discount_value = 0;
            //If there is a voucher 
            if (isset($data['order_discount_id'])) {
                //check if voucher requirement for minimum value is met
                $voucher_discount = OrderDiscount::where('id', $data['order_discount_id'])->first();

                //if total after discount is smaller than minimum order value requirement
                if ($subtotal - $products_discount < $voucher_discount['minimum_order_value']) {
                    return response(['message' => 'voucherRequirementNotMeet'], 202);
                }

                //Get voucher discount
                $voucher_discount_value = $voucher_discount['total_discount'];

                //newOrder voucher discount id
                $newOrder->order_discount_id = $voucher_discount['id'];
            }


            // calculate order total

            //Get shipping fee
            $customer_address = $data['delivery_address_id'];
            //Calculate shipping fee with delivery services api (not implemented yet)
            $shipping_subtotal = 21000;


            //Get vat
            $vat = 0;

            //Get total
            $total = $subtotal + $shipping_subtotal - $voucher_discount_value - $products_discount + $vat;


            //Update new payment value to the order
            $newOrder->total = $total;
            $newOrder->subtotal = $subtotal;
            $newOrder->shipping_subtotal = $shipping_subtotal;
            $newOrder->voucher_discount = $voucher_discount_value;
            $newOrder->products_discount = $products_discount;
            $newOrder->vat = $vat;

            $newOrder->save();
            // if ($payment_method == 'momo' | $payment_method == "vnpay") {
            //     $newOrder->status = "waiting_payment";
            // } else if ($payment_method = "cod") {
            //     $newOrder->status = "waiting_confirm";
            // }
            // $newOrder->save();

            //Only commit transaction to database if everything is valid
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
