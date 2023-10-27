<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetCategoryRequest;
use App\Http\Requests\GetProductDetailRequest;
use App\Http\Requests\GetProductDiscountRequest;
use App\Http\Requests\GetProductMostLikedRequest;
use App\Http\Requests\GetProductNewRequest;
use App\Http\Requests\GetTagRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductDiscount;
use App\Models\ProductTag;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\JoinClause;

class ProductController extends Controller
{

    public function productNew(GetProductNewRequest $request)
    {
        try {
            $data = $request->validated();
            $limit = $data['limit'];
            /** @var \App\Models\Product $productNew */
            /** @var \App\Models\ProductDiscount $highestDiscount */
            $highestDiscount = ProductDiscount::select('product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_id');
            $productNew = Product::leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->orderBy('products.updated_at', 'desc')
                ->skip(0)->take($limit)
                ->get(['products.id', 'products.name', 'products.image_url', 'products.price', 'highest_discount.max_discount_amount']);
            return response(['message' => 'getProductNewSuccessfully', 'result' => ['product' => $productNew]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function productDiscount(GetProductDiscountRequest $request)
    {
        try {
            $data = $request->validated();
            $limit = $data['limit'];
            /** @var \App\Models\Product $productDiscount */
            $highestDiscount = ProductDiscount::select('product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_id')
                ->orderBy('max_discount_amount', 'desc');
            $productDiscount = Product::joinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->skip(0)->take($limit)
                ->get(['products.id', 'products.name', 'products.image_url', 'products.price', 'highest_discount.max_discount_amount']);
            return response(['message' => 'getProductNewSuccessfully', 'result' => ['product' => $productDiscount]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function productMostLiked(GetProductMostLikedRequest $request)
    {
        try {
            $data = $request->validated();
            $limit = $data['limit'];
            /** @var \App\Models\Product $productMostLiked */
            /** @var \App\Models\ProductDiscount $highestDiscount */
            $highestDiscount = ProductDiscount::select('product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_id');
            $productMostLiked = Product::leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->orderBy('products.nums_of_like', 'desc')
                ->skip(0)->take($limit)
                ->get(['products.id', 'products.name', 'products.image_url', 'products.price', 'highest_discount.max_discount_amount']);

            return response(['message' => 'getProductNewSuccessfully', 'result' => ['product' => $productMostLiked]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
    public function productDetail(GetProductDetailRequest $request)
    {
        try {
            $data = $request->validated();
            $productId = $data['id'];
            /** @var \App\Models\Product $product */
            /** @var \App\Models\ProductDiscount $highestDiscount */
            $highestDiscount = ProductDiscount::select('product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_id');
            $product = Product::where('product_id', $productId)->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })->first();

            return response(['message' => 'getProductSuccessfully', 'result' => ['product' => $product]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function category(GetCategoryRequest $request)
    {
        try {
            /** @var \App\Models\Category $category */
            $category = Category::all(['id', 'name']);
            return response(['message' => 'getCategorySuccessfully', 'result' => ['category' => $category]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function tag(GetTagRequest $request)
    {
        try {
            /** @var \App\Models\Tag $tag */
            $tag = ProductTag::all(['id', 'name']);
            return response(['message' => 'getTagSuccessfully', 'result' => ['tag' => $tag]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
