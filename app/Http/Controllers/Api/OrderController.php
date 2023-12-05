<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\getOrderDetailRequest;
use App\Http\Requests\getOrdersRequest;
use App\Http\Requests\getOrderVoucherRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\OrderDiscount;
use App\Models\Product;
use Exception;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

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

            $orders = $orders->skip($offset)->take($limit)->get();




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

            $voucher = $voucher->get();

            return response(['message' => 'getOrderVoucherSuccessfully', 'result' => ['voucher' => $voucher]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
