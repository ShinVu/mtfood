<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetCategoryRequest;
use App\Http\Requests\getProductByCategoryRequest;
use App\Http\Requests\getProductByFilterRequest;
use App\Http\Requests\GetProductDetailRequest;
use App\Http\Requests\GetProductDiscountRequest;
use App\Http\Requests\GetProductImageReview;
use App\Http\Requests\GetProductMostLikedRequest;
use App\Http\Requests\GetProductNewRequest;
use App\Http\Requests\GetProductReview;
use App\Http\Requests\GetTagRequest;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductDiscount;
use App\Models\ProductHaveTag;
use App\Models\ProductTag;
use App\Models\Review;
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
                ->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();

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
                ->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();
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
                ->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();

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
            $product = Product::where('id', $productId)
                ->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                    $join->on('products.id', '=', 'highest_discount.product_id');
                })
                ->selectRaw('*, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->first();

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

    public function getProductByCategory(getProductByCategoryRequest $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\Product $product */
            $categoryId = (int)($data['category_id']);
            $limit = 10;
            if (isset($data['limit'])) {
                $limit = $data['limit'];
            }
            $highestDiscount = ProductDiscount::select('product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_id');
            $products = Product::where('category_id', $categoryId)->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->skip(0)->take($limit)
                ->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();

            return response(['message' => 'getProductByCategorySuccessfully', 'result' => ['products' => $products]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
    public function getProductImageReview(GetProductImageReview $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\Review $reviewImage */
            $reviewImage = Review::where('product_id', $data['product_id'])->skip(0)->take(10)->get(['id', 'image_url']);
            $numsOfImages = Review::where('product_id', $data['product_id'])->whereNotNull('image_url')->count();
            return response(['message' => 'getProductImageReviewSuccessfully', 'result' => ['images' => $reviewImage, 'numOfImages' => $numsOfImages]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getProductReview(GetProductReview $request)
    {
        try {
            $data = $request->validated();
            $filter = json_decode($data['filter'], true);
            /** @var \App\Models\Review $reviews */
            $reviews = Review::where('reviews.product_id', $data['product_id']);

            /**Setting query for review filter */
            //Filter reviews with image
            if ($filter[1]) {
                $reviews = $reviews->whereNotNull('reviews.image_url');
            }

            //Filter reviews with order completed
            if ($filter[2]) {
                /** @var \App\Models\Order $order */
                $reviews = $reviews->join('order_details', 'reviews.order_details_id', '=', 'order_details.id')
                    ->join('orders', 'order_details.order_id', '=', 'orders.id')
                    ->where('orders.status', 'completed');
            }

            //Generate filter for stars
            $ratingFilter = [];
            if ($filter[7]) {
                array_push($ratingFilter, 1);
            }
            if ($filter[6]) {
                array_push($ratingFilter, 2);
            }
            if ($filter[5]) {
                array_push($ratingFilter, 3);
            }
            if ($filter[4]) {
                array_push($ratingFilter, 4);
            }
            if ($filter[3]) {
                array_push($ratingFilter, 5);
            }

            //Base case when no filter is selected
            if (sizeof($ratingFilter) == 0) {
                $ratingFilter = [1, 2, 3, 4, 5];
            }

            //Get star filter
            $reviews = $reviews->whereIn('reviews.rating', $ratingFilter);


            /**Setting query for review sort */
            $sort = $data['sort'];
            if ($sort == 1) {
                $reviews = $reviews->orderBy('reviews.updated_at', 'desc');
            } else if ($sort == 2) {
                $reviews = $reviews->orderBy('reviews.rating', 'desc');
            } else if ($sort == 3) {
                $reviews = $reviews->orderBy('reviews.rating', 'asc');
            }

            /**Join with customer */
            $reviews = $reviews->join('customers', 'reviews.customer_id', '=', 'customers.id');
            //Get result
            $reviews = $reviews->get(['reviews.id', 'reviews.content', 'reviews.rating', 'reviews.image_url', 'reviews.nums_of_rate_useful', 'reviews.updated_at', 'reviews.product_id', 'customers.name']);

            /** @var \App\Models\Review $reviews */
            return response(['message' => 'getProductReviewSuccessfully', 'result' => ['reviews' => $reviews]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getProductByFilter(getProductByFilterRequest $request)
    {
        try {
            $data = $request->validated();

            /** @var \App\Models\Review $products */

            $products = Product::query();

            //Get products discount
            $highestDiscount = ProductDiscount::select('product_discounts.product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_discounts.product_id');
            $products = $products->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            });

            $products = $products->selectRaw('products.id,products.name,products.image_url,products.is_wholesale,products.category_id,products.rating,products.quantity_available,products.updated_at,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount');

            /**Setting query for product filter */
            //Filter category

            if (isset($data['category'])) {
                $category = (int)$data['category'];

                $products = $products->where('products.category_id', $category);
            }

            //Filter tag
            if (isset($data['tag'])) {

                $tag = json_decode($data['tag'], true);

                $products = $products->join('product_have_tag', 'products.id', '=', 'product_have_tag.product_id')->whereIn('product_have_tag.tag_id', $tag)->distinct();
            }

            // //Filter price

            if (isset($data['price_from']) && isset($data['price_to'])) {

                $priceFrom = (float)$data['price_from'];
                $priceTo = (float)$data['price_to'];
                $products = $products->havingBetween('priceDiscount', [$priceFrom, $priceTo]);
            } else if (isset($data['price_from'])) {
                $priceFrom = (float)$data['price_from'];
                $products = $products->having('priceDiscount', '>=', $priceFrom);
            } else if (isset($data['price_to'])) {
                $priceTo = (float)$data['price_to'];
                $products = $products->having('priceDiscount', '<=', $priceTo);
            }


            // //Filter services 

            if (isset($data['discount']) && filter_var($data['discount'], FILTER_VALIDATE_BOOLEAN)) {

                $products = $products->whereNotNull('highest_discount.max_discount_amount');
            }
            if (isset($data['voucher']) && filter_var($data['voucher'], FILTER_VALIDATE_BOOLEAN)) {
                $products = $products;
            }
            if (isset($data['onStock']) && filter_var($data['onStock'], FILTER_VALIDATE_BOOLEAN)) {
                $products = $products->where('products.quantity_available', '>', 0);
            }
            if (isset($data['wholesaleProduct']) && filter_var($data['wholesaleProduct'], FILTER_VALIDATE_BOOLEAN)) {
                $products = $products->where('products.is_wholesale', true);
            }


            if (isset($data['rating'])) {
                $products = $products->where('products.rating', '>=', (float)$data['rating']);
            }

            //Sort product
            if (isset($data['sort'])) {
                $sort = (string)$data['sort'];
                if ($sort == "common") {
                    $products = $products;
                } else if ($sort == "mostPurchased") {
                    $products = $products;
                } else if ($sort == "new") {
                    $products = $products->orderBy('products.updated_at', 'desc');
                } else if ($sort == "priceHTL") {
                    $products = $products->orderBy('priceDiscount', 'desc');
                } else if ($sort == "priceLTH") {
                    $products = $products->orderBy('priceDiscount', 'asc');
                }
            }

            //Pagination
            //Get total page of products
            if (isset($data['offset']) && isset($data['limit'])) {
                $totalPageProduct = ceil($products->count() / (int)$data['limit']);
                $products = $products->skip((int)$data['offset'])->take((int)$data['limit']);
            }
            // Get product
            $products = $products->get();
            return response(['message' => 'getProductSuccessfully', 'result' => ['product' => $products, 'totalPage' => $totalPageProduct]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
