<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BeHomeController extends Controller
{
    public function index()
    {
        $totalUser = User::where("user_type", "USER")->select("id")->count();
        $totalProduct = Product::select("id")->count();
        $totalOrders = Order::select("id")->count();
        $totalChat = DB::table('chat_messages')->select("id")->count();
        $viewData = [
            "totalUser"    => $totalUser,
            "totalOrders"  => $totalOrders,
            "totalChat"    => $totalChat,
            'totalProduct' => $totalProduct
        ];

        return view('be.home.index', $viewData);
    }
}
