<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Http\Requests\addLikedProductRequest;
use App\Http\Requests\addSeenProductRequest;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\GetCategoryRequest;
use App\Http\Requests\getLikeProductRequest;
use App\Http\Requests\getProductByCategoryRequest;
use App\Http\Requests\getProductByFilterRequest;
use App\Http\Requests\getProductByIdsRequest;
use App\Http\Requests\getProductByKeywordRequest;
use App\Http\Requests\GetProductDetailRequest;
use App\Http\Requests\GetProductDiscountRequest;
use App\Http\Requests\GetProductImageReview;
use App\Http\Requests\GetProductMostLikedRequest;
use App\Http\Requests\GetProductNewRequest;
use App\Http\Requests\GetProductReview;
use App\Http\Requests\getProductWholesaleByFilterRequest;
use App\Http\Requests\getSeenProductRequest;
use App\Http\Requests\GetTagRequest;
use App\Http\Requests\productLikeStatusRequest;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductBatch;
use App\Models\ProductDiscount;
use App\Models\ProductHaveTag;
use App\Models\ProductImage;
use App\Models\ProductTag;
use App\Models\Review;
use App\Models\UserLikeProduct;
use App\Models\UserSeeProduct;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

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
            $productNew = Product::where('products.status', true)->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->orderBy('products.updated_at', 'desc')
                ->skip(0)->take($limit)
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
            $productDiscount = Product::where('status', 1)->joinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->skip(0)->take($limit)
                ->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();

            //Append media path
            $productPath = 'storage/product/';
            foreach ($productDiscount as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
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
            $productMostLiked = Product::where('status', 1)->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->orderBy('products.nums_of_like', 'desc')
                ->skip(0)->take($limit)
                ->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();

            //Append media path
            $productPath = 'storage/product/';
            foreach ($productMostLiked as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
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

            $likeState = false;
            //Check user like product status
            if (isset($data['customerId'])) {
                $customerId = $data['customerId'];

                $likeStatus = UserLikeProduct::where('product_id', $productId)->where('customer_id', $customerId);

                if ($likeStatus->exists()) {
                    $likeState = true;
                }
            }
            /** @var \App\Models\Product $product */
            /** @var \App\Models\ProductDiscount $highestDiscount */
            $highestDiscount = ProductDiscount::select('product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_id');
            $product = Product::where('id', $productId)
                ->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                    $join->on('products.id', '=', 'highest_discount.product_id');
                })
                ->selectRaw('*, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount');
            $product = $product->with(['productImage'])->first();

            //Append media path
            $productPath = 'storage/product/';

            if ($imageName = $product->image_url) {
                $fullPath = $productPath . $product->id . "/" . $imageName;
                $product->image_url = asset($fullPath);
            }

            if ($images = $product->productImage) {
                foreach ($images as $image) {
                    $fullPath = $productPath . $product->id . "/" . $image['image_url'];
                    $image->image_url = asset($fullPath);
                }
            }
            // foreach (glob("C:/xampp/htdocs/mtfood/public/storage/product" . '/*') as $file) {
            //     $folderName = explode("/", $file)[7];
            //     foreach (glob("C:/xampp/htdocs/mtfood/public/storage/product/" . $folderName  . '/*') as $image) {
            //         $productId = $folderName;
            //         $imageUrl = explode("/", $image)[8];
            //         ProductImage::create([
            //             'image_url' => $imageUrl,
            //             'product_id' => $productId,
            //             'default' => 0,
            //         ]);
            //     }
            // }

            return response(['message' => 'getProductSuccessfully', 'result' => ['product' => $product, 'likeState' => $likeState]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function productWholesaleDetail(GetProductDetailRequest $request)
    {
        try {
            $data = $request->validated();
            $productId = $data['id'];

            $likeState = false;
            //Check user like product status
            if (isset($data['customerId'])) {
                $customerId = $data['customerId'];

                $likeStatus = UserLikeProduct::where('product_id', $productId)->where('customer_id', $customerId);

                if ($likeStatus->exists()) {
                    $likeState = true;
                }
            }
            /** @var \App\Models\Product $product */
            /** @var \App\Models\ProductDiscount $highestDiscount */
            $product = Product::query()->where('id', $productId);
            $product = $product->with(['productImage',  'productWholesalePricing'])->first();

            //Append media path
            $productPath = 'storage/product/';

            if ($imageName = $product->image_url) {
                $fullPath = $productPath . $product->id . "/" . $imageName;
                $product->image_url = asset($fullPath);
            }

            if ($images = $product->productImage) {
                foreach ($images as $image) {
                    $fullPath = $productPath . $product->id . "/" . $image['image_url'];
                    $image->image_url = asset($fullPath);
                }
            }



            return response(['message' => 'getProductSuccessfully', 'result' => ['product' => $product, 'likeState' => $likeState]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }



    public function category(GetCategoryRequest $request)
    {
        try {
            /** @var \App\Models\Category $category */
            $categories = Category::all(['id', 'name', 'image_url']);
            $catPath = "storage/category/";
            foreach ($categories as $category) {
                if ($imageName = $category->image_url) {
                    $fullPath = $catPath . $category->id . "/" . $imageName;
                    $category->image_url = asset($fullPath);;
                }
            }
            return response(['message' => 'getCategorySuccessfully', 'result' => ['category' => $categories]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function createCategory(CreateCategoryRequest $request)
    {
        try {
            /** @var \App\Models\Category $category */
            $data = $request->validated();
            $file = null;
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                if (!$file->isValid()) {
                    return response(['message' => 'invalidFileUpload', 'result' => []], 400);
                }
            }

            $newCategory = Category::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'image_url' => null
            ]);


            if ($file) {
                $catPath = "public/category/" . $newCategory->id . "/";
                $newFilename = uniqid() . "_" . time() . "." . $file->getClientOriginalExtension();
                Storage::disk('local')->put($catPath . $newFilename, file_get_contents($file));
                $newCategory->image_url = $newFilename;
                $newCategory->save();
            }
            return response(['message' => 'createCategorySuccessfully', 'result' => ['category' => $newCategory]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function tag(GetTagRequest $request)
    {
        try {
            /** @var \App\Models\Tag $tag */
            $tag = ProductTag::all(['id', 'name', 'description']);
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
            $products = Product::where('status', 1)->where('category_id', $categoryId)->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            })
                ->skip(0)->take($limit)
                ->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();

            //Append media path
            $productPath = 'storage/product/';
            foreach ($products as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
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

            /** @var \App\Models\Product $products */

            $products = Product::query()->where('status', 1);

            //Get products discount
            $highestDiscount = ProductDiscount::select('product_discounts.product_id', DB::raw('MAX(discount_amount) as max_discount_amount'))
                ->where('is_active', true)
                ->groupBy('product_discounts.product_id');
            $products = $products->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                $join->on('products.id', '=', 'highest_discount.product_id');
            });

            $products = $products->selectRaw('products.id,products.name,products.image_url,products.is_wholesale,products.category_id,products.rating,products.quantity_available,products.updated_at,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount');



            //If user search by keyword
            if (isset($data['keyword'])) {
                $searchProducts = Product::search((string)$data['keyword'])->keys();
                $products = $products->whereIn('products.id', $searchProducts);
            }

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

            $products = $products->get();

            //Append media path
            $productPath = 'storage/product/';
            foreach ($products as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
            return response(['message' => 'getProductSuccessfully', 'result' => ['product' => $products, 'totalPage' => $totalPageProduct]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getProductWholesaleByFilter(getProductWholesaleByFilterRequest $request)
    {
        try {
            $data = $request->validated();

            /** @var \App\Models\Product $products */

            $products = Product::query()->where('status', 1)->where('is_wholesale', 1);

            $products = $products->selectRaw('products.id,products.name,products.image_url,products.is_wholesale,products.category_id,products.rating,products.quantity_available,products.updated_at,products.price');


            //If user search by keyword
            if (isset($data['keyword'])) {
                $searchProducts = Product::search((string)$data['keyword'])->keys();
                $products = $products->whereIn('products.id', $searchProducts);
            }

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
                    $products = $products->orderBy('products.price', 'desc');
                } else if ($sort == "priceLTH") {
                    $products = $products->orderBy('products.price', 'asc');
                }
            }

            //Pagination
            //Get total page of products
            if (isset($data['offset']) && isset($data['limit'])) {
                $totalPageProduct = ceil($products->count() / (int)$data['limit']);
                $products = $products->skip((int)$data['offset'])->take((int)$data['limit']);
            }

            //Get order details and its relationships
            $products = $products->with([
                'productWholesalePricing'
            ]);

            $products = $products->get();
            //Append media path
            $productPath = 'storage/product/';
            foreach ($products as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
            return response(['message' => 'getProductSuccessfully', 'result' => ['product' => $products, 'totalPage' => $totalPageProduct]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
    public function getProductByIds(getProductByIdsRequest $request)
    {
        try {
            $data = $request->validated();
            $productIds = ($data['productIds']);
            /** @var \App\Models\Product $products */;
            $products = Product::query()->where('status', 1)->whereIn('id', $productIds);

            //Get product
            $products = $products->get(['id', 'image_url']);

            //Append media path
            $productPath = 'storage/product/';
            foreach ($products as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
            return response(['message' => 'getProductSuccessfully', 'result' => ['product' => $products]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function createProduct(CreateProductRequest $request)
    {
        try {
            /** @var \App\Models\Category $category */
            $data = $request->validated();
            $files = null;
            if ($request->hasFile('images')) {
                $files = $request->file('images');
                foreach ($files as $file) {
                    if (!$file->isValid()) {
                        return response(['message' => 'invalidFileUpload', 'result' => []], 400);
                    }
                }
            }

            $newProduct = Product::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'price' => $data['price'],
                'unit' => 'VND',
                'exp_date' => $data['exp_date'],
                'directionForPreservation' => $data['directionForPreservation'],
                'directionForUse' => $data['directionForUse'],
                'weight' => $data['weight'],
                'pack' => $data['pack'],
                'ingredient' => $data['ingredient'],
                'is_wholesale' => $data['is_wholesale'],
                'category_id' => $data['category'],

            ]);
            $productId = $newProduct->id;
            $productPath = "public/product/" . $productId . "/";

            if ($request->hasFile('images')) {
                foreach ($files as $key => $file) {
                    $newFilename = uniqid() . "_" . time() . "." . $file->getClientOriginalExtension();
                    Storage::disk('local')->put($productPath . $newFilename, file_get_contents($file));
                    if ($key == 0) {
                        $newProduct->image_url = $newFilename;
                        $newProduct->save();
                    }
                    ProductImage::create([
                        'product_id' => $productId,
                        'default' => 0,
                        'image_url' => $newFilename
                    ]);
                }
            }



            return response(['message' => 'createProductSuccessfully', 'result' => ['product' => $newProduct]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getProductByKeyword(getProductByKeywordRequest $request)
    {
        try {
            /** @var \App\Models\Product $products */
            $data = $request->validated();
            $offset = 0;
            $limit = 5;
            $page = (int)$offset / $limit;

            $productsKey = Product::search((string)$data['keyword'])->keys();


            /** @var \App\Models\Product $products */

            $products = Product::whereIn('id', $productsKey);


            // Get product
            $products = $products->get(['id', 'name']);
            return response(['message' => 'getProductSuccessfully', 'result' => ['product' => $products]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function addSeenProduct(addSeenProductRequest $request)
    {
        try {
            $data = $request->validated();
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);
            $token = $request->bearerToken();

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            //Add seen product

            $newSeenProduct = UserSeeProduct::updateOrCreate(
                ['customer_id' => $data['customerId'], 'product_id' => $data['productId']]

            );

            return response(['message' => 'addSeenProductSuccessfully', 'result' => ['userSeeProduct' => $newSeenProduct]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function addLikedProduct(addLikedProductRequest $request)
    {
        try {
            $data = $request->validated();
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);
            $token = $request->bearerToken();

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            //Add seen product
            $userLikeProduct = UserLikeProduct::where('customer_id', $data['customerId'])->where('product_id', $data['productId']);
            if ($userLikeProduct->exists()) {
                $unlikeProduct = $userLikeProduct->delete();
                return response(['message' => 'removeLikedProductSuccessfully', 'result' => ['userSeeProduct' => $unlikeProduct]], 200);
            } else {
                $newLikedProduct = UserLikeProduct::create(
                    ['customer_id' => $data['customerId'], 'product_id' => $data['productId']]
                );
                return response(['message' => 'addLikedProductSuccessfully', 'result' => ['userSeeProduct' => $newLikedProduct]], 200);
            }
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getSeenProduct(getSeenProductRequest $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\UserSeeProduct $userSeeProduct */

            $offset = 0;
            $limit = 10;

            if (isset($data['offset'])) {
                $limit = $data['offset'];
            }
            if (isset($data['limit'])) {
                $limit = $data['limit'];
            }

            $userSeeProduct = UserSeeProduct::where('user_see_product.customer_id', $data['customerId'])->distinct();

            $highestDiscount = ProductDiscount::select('product_discounts.product_id', DB::raw('MAX(product_discounts.discount_amount) as max_discount_amount'))
                ->where('product_discounts.is_active', true)
                ->groupBy('product_discounts.product_id');

            $products = Product::joinSub($userSeeProduct, 'user_see_product', function (JoinClause $join) {
                $join->on('products.id', '=', 'user_see_product.product_id');
            })
                ->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                    $join->on('products.id', '=', 'highest_discount.product_id');
                });


            //Pagination
            //Get total page of products
            $totalPageProduct = 1;
            if (isset($data['offset']) && isset($data['limit'])) {
                $totalPageProduct = ceil($products->count() / (int)$data['limit']);
                $products = $products->skip((int)$data['offset'])->take((int)$data['limit']);
            }

            // Get product
            $products = $products->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();
            //Append media path
            $productPath = 'storage/product/';
            foreach ($products as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
            return response(['message' => 'getUserSeenProductSuccessfully', 'result' => ['product' => $products, 'totalPage' => $totalPageProduct]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getLikedProduct(getLikeProductRequest $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\UserLikeProduct $userLikeProduct */

            $offset = 0;
            $limit = 10;

            if (isset($data['offset'])) {
                $limit = $data['offset'];
            }
            if (isset($data['limit'])) {
                $limit = $data['limit'];
            }

            $userLikeProduct = UserLikeProduct::where('user_like_product.customer_id', $data['customerId'])->distinct();

            $highestDiscount = ProductDiscount::select('product_discounts.product_id', DB::raw('MAX(product_discounts.discount_amount) as max_discount_amount'))
                ->where('product_discounts.is_active', true)
                ->groupBy('product_discounts.product_id');

            $products = Product::joinSub($userLikeProduct, 'user_see_product', function (JoinClause $join) {
                $join->on('products.id', '=', 'user_see_product.product_id');
            })
                ->leftJoinSub($highestDiscount, 'highest_discount', function (JoinClause $join) {
                    $join->on('products.id', '=', 'highest_discount.product_id');
                });


            //Pagination
            //Get total page of products
            $totalPageProduct = 1;
            if (isset($data['offset']) && isset($data['limit'])) {
                $totalPageProduct = ceil($products->count() / (int)$data['limit']);
                $products = $products->skip((int)$data['offset'])->take((int)$data['limit']);
            }

            // Get product
            $products = $products->selectRaw('products.id,products.name,products.image_url,products.price,highest_discount.max_discount_amount, case when (highest_discount.max_discount_amount is not NULL) then (products.price - highest_discount.max_discount_amount) else products.price end as priceDiscount')
                ->get();

            //Append media path
            $productPath = 'storage/product/';
            foreach ($products as $product) {
                if ($imageName = $product->image_url) {
                    $fullPath = $productPath . $product->id . "/" . $imageName;
                    $product->image_url = asset($fullPath);
                }
            }
            return response(['message' => 'getUserLikeProductSuccessfully', 'result' => ['product' => $products, 'totalPage' => $totalPageProduct]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getProductLikeStatus(productLikeStatusRequest $request)
    {
        try {
            $data = $request->validated();
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);
            $token = $request->bearerToken();

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            //Add seen product
            $userLikeProduct = UserLikeProduct::where('customer_id', $data['customerId'])->where('product_id', $data['productId']);
            $userLikeStatus = $userLikeProduct->exists();
            return response(['message' => 'getProductLikeStatus', 'result' => ['status' => $userLikeStatus]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
