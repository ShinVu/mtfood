<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\getProductRecommendationItemItem;
use App\Http\Requests\getProductRecommendationUserItem;
use App\Models\Product;
use App\Models\ProductDiscount;
use Exception;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class RecommendationController extends Controller
{
    public function getProductRecommendationUserItem(getProductRecommendationUserItem $request)
    {
        try {
            $data = $request->validated();

            $userId = 1;
            $num_item = 8;

            if (isset($data['userId'])) {
                $userId = $data['userId'];
            }
            if (isset($data['numItems'])) {
                $num_item = $data['numItems'];
            }

            $response = Http::get('http://127.0.0.1:50083/api/user_sample', ['user_id' => $userId, 'num_item' => $num_item]);
            $productIds = $response->json()['product_id'];

            /** @var \App\Models\Product $productNew */
            /** @var \App\Models\ProductDiscount $highestDiscount */
            $highestDiscount = ProductDiscount::select('product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_id');
            $productNew = Product::where('products.status', true)->whereIn('products.id', $productIds)->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->orderBy('products.updated_at', 'desc')
                ->skip(0)->take($num_item)
                ->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();

            //Append media path
            $productPath = 'storage/product/';
            foreach ($productNew as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
            return response(['message' => 'getProductNewSuccessfully', 'result' => ['product' => $productNew]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getProductRecommendationItemItem(getProductRecommendationItemItem $request)
    {
        try {
            $data = $request->validated();

            $itemId = 1;
            $num_item = 8;

            if (isset($data['itemId'])) {
                $itemId = $data['itemId'];
            }
            if (isset($data['numItems'])) {
                $num_item = $data['numItems'];
            }

            $response = Http::get('http://127.0.0.1:50083/api/item_item', ['item_id' => $itemId, 'num_item' => $num_item]);
            $productIds = $response->json()['product_id'];

            /** @var \App\Models\Product $productNew */
            /** @var \App\Models\ProductDiscount $highestDiscount */
            $highestDiscount = ProductDiscount::select('product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_id');
            $productNew = Product::where('products.status', true)->whereIn('products.id', $productIds)->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->orderBy('products.updated_at', 'desc')
                ->skip(0)->take($num_item)
                ->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();

            //Append media path
            $productPath = 'storage/product/';
            foreach ($productNew as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
            return response(['message' => 'getProductNewSuccessfully', 'result' => ['product' => $productNew]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
