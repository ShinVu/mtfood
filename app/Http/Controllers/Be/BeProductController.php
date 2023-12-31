<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductOption;
use App\Models\ProductValue;
use App\Models\ProductWholesalePrice;
use App\Models\Province;
use App\Models\Brand;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class BeProductController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->n;

        $products = Product::join('category', 'product.product_category', '=', 'category.category_id')
            ->where('product_name', 'like', '%' . $name . '%')
            ->get();

        $model = new Product();
        $status = $model->getStatus();

        $viewData = [
            'products' => $products,
            'query'    => $request->query(),
            'status'   => $status
        ];

        return view('be.product.index', $viewData);
    }

    public function create()
    {
        $categories = Category::all();
        $model = new Product();
        $status = $model->getStatus();
    //    $provinces = Province::all();
    //    $productOptions = ProductOption::all();


        $product_brand = Brand::all();

        $provinces = $productOptions = [];
        return view('be.product.create', compact('categories', 'status', 'product_brand'));
    }

    public function store(Request $request)
    {
        try {
            $data = $request->except('_token');

            $data['product_price'] = str_replace(',', '', $request->product_price);
            $data['level1'] = str_replace(',', '', $request->level1);
            $data['level2'] = str_replace(',', '', $request->level2);
            $data['level3'] = str_replace(',', '', $request->level3);
            $data['level4'] = str_replace(',', '', $request->level4);

            // if ($request->avatar) {
            //     $file = upload_image('avatar');
            //     if (isset($file['code']) && $file['code'] == 1) $data['image_url'] = $file['name'];
            // }
            //dd($data);
            $data['image_url'] = $this->uploadMultiImage($request->file);

            //dd($request->file);

//            $data['user_id'] = Auth::user()->id;

            $product = Product::create($data);

        //    if ($request->file) {
        //        $this->syncAlbumImageAndProduct($request->file, $product->id);
        //    }
//
//            if ($request->wholesale)
//                $this->processWholesalePrice($request->wholesale, $product->id);
//
//            $this->processProductOptionValue($request->options, $product->id);

        } catch ( \Exception $exception ) {
            Log::error("ERROR => ProductController@store => " . $exception->getMessage());
            toastr()->error($exception->getMessage(), 'Thông báo');
            return redirect()->route('get_admin.product.create');
        }

        toastr()->success('Xử lý thành công', 'Thông báo');
        return redirect()->route('get_admin.product.index');
    }

    public function edit($id)
    {
        $product = Product::where('product_id', '=', $id)->get();
        $categories = Category::all();
        $model = new Product();
        $status = $model->getStatus();

        $product_brand = Brand::all();

//        $provinces = Province::all();
//        $productOptions = ProductOption::all();

        $provinces = $productOptions = [];

//        $activeDistricts = DB::table('districts')->where('id', $product->district_id)
//            ->pluck('name', 'id')->toArray();
//
//        $activeWard = DB::table('wards')->where('id', $product->ward_id)
//            ->pluck('name', 'id')->toArray();

//        $productValues = ProductValue::where('product_id', $id)->get();

//        $images = ProductImage::where('product_id', $id)->orderByDesc('id')->get();
//        $productsWholesale = ProductWholesalePrice::where('product_id', $id)->get();


        $viewData = [
            'product'           => $product[0],
            'categories'        => $categories,
            'status'            => $status,
            'images'            => explode('|||||', $product[0]->product_image ?? '') ?? [],
            'provinces'         => $provinces,
            'activeDistricts'   => $activeDistricts ?? [],
            'activeWard'        => $activeWard ?? [],
            'productsWholesale' => $productsWholesale ?? [],
            'productOptions'    => $productOptions,
            'productValues'     => $productValues ?? [],
            'product_brand'      => $product_brand ?? []
        ];

        return view('be.product.update', $viewData);
    }

    public function update(Request $request, $id)
    {
        try {
            $data = $request->except('_token');
            $data['product_price'] = str_replace(',', '', $request->product_price);
            $data['level1'] = str_replace(',', '', $request->level1);
            $data['level2'] = str_replace(',', '', $request->level2);
            $data['level3'] = str_replace(',', '', $request->level3);
            $data['level4'] = str_replace(',', '', $request->level4);
            $obj = Product::find($request->product_id);
            $imageURL = $this->uploadMultiImage($request->file);
            if($imageURL == ""){
                $imageURL = $obj->product_image;
            }else
            $imageURL = $imageURL.'|||||'.($obj->product_image ?? '');
            $data['product_image'] = $imageURL;
            //dd($data);
            // if ($request->avatar) {
            //     $file = upload_image('avatar');
            //     if (isset($file['code']) && $file['code'] == 1) $data['image_url'] = $file['name'];
            // }

            //$product_id = $id;
            Product::find($id)->update($data);
//            $this->processWholesalePrice($request->wholesale, $id);
//            if ($request->file) {
//                $this->syncAlbumImageAndProduct($request->file, $id);
//            }
//
//            $this->processProductOptionValue($request->options, $id);
        } catch ( \Exception $exception ) {
            Log::error("ERROR => ProductController@store => " . $exception->getMessage());
            toastr()->error('Xử lý thất bại', 'Thông báo');
            return redirect()->route('get_admin.product.update', $id);
        }

        toastr()->success('Xử lý thành công', 'Thông báo');
        return redirect()->route('get_admin.product.index');
    }

    public function processWholesalePrice($wholesales, $productID)
    {
        $flag = false;
        $prices = $wholesales['price'];
        if (!empty($prices)) {
            ProductWholesalePrice::where('product_id', $productID)->delete();
            $items = [];
            foreach ($prices as $key => $price) {
                if (!empty($price) && $price != null) {
                    $items[] = [
                        'form'       => $wholesales['form'][$key],
                        'to'         => $wholesales['to'][$key],
                        'unit_price' => 'price',
                        'price'      => $price,
                        'product_id' => $productID,
                        'created_at' => Carbon::now()
                    ];
                    $flag = true;
                }
            }

            ProductWholesalePrice::insert($items);
        }

        Product::where('id', $productID)->update([
            'is_wholesale' => $flag,
            'updated_at'   => Carbon::now()
        ]);
    }

    public function processProductOptionValue($options, $productID)
    {
        $flag = false;
        $productOptionIds = $options['productOptionId'] ?? [];

        if (!empty($productOptionIds)) {
            ProductValue::where('product_id', $productID)->delete();
            $items = [];
            foreach ($productOptionIds as $key => $id) {
                if (!empty($id) && $id != null) {
                    $items[] = [
                        'product_option_id' => $id,
                        'name_value'        => $options['value'][$key] ?? 0,
                        'category_id'       => 0,
                        'status'            => 1,
                        'product_id'        => $productID,
                        'created_at'        => Carbon::now()
                    ];
                    $flag = true;
                }
            }
            ProductValue::insert($items);
        }
    }

    public function delete(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            if ($product) $product->delete();

        } catch ( \Exception $exception ) {
            Log::error("ERROR => ProductController@delete => " . $exception->getMessage());
        }
        return redirect()->route('get_admin.product.index');
    }

    public function syncAlbumImageAndProduct($files, $productID)
    {
        foreach ($files as $key => $fileImage) {
            $ext = $fileImage->getClientOriginalExtension();
            $extend = [
                'png', 'jpg', 'jpeg', 'PNG', 'JPG'
            ];

            if (!in_array($ext, $extend)) return false;

            $filename = date('Y-m-d__') . Str::slug($fileImage->getClientOriginalName()) . '.' . $ext;
            $path = public_path() . '/uploads/' . date('Y/m/d/');
            if (!\File::exists($path)) {
                mkdir($path, 0777, true);
            }

            $fileImage->move($path, $filename);
            \DB::table('products_images')
                ->insert([
                    'name'       => $fileImage->getClientOriginalName(),
                    'path'       => $filename,
                    'product_id' => $productID,
                    'created_at' => Carbon::now()
                ]);
        }
    }

    protected function uploadMultiImage($files){

        $i=0;
        $nameReturn = "";

        if($files != null){
            foreach ($files as $key => $fileImage) {
                $ext = $fileImage->getClientOriginalExtension();
                $extend = [
                    'png', 'jpg', 'jpeg', 'PNG', 'JPG'
                ];

                if (!in_array($ext, $extend)) return "";


                $path = public_path() . '/uploads';
                if (!\File::exists($path)) {
                    mkdir($path, 0777, true);
                }

                $filename = time() . Str::slug($fileImage->getClientOriginalName()) . '.' . $ext;

                $fileImage->move($path, $filename);

                if($i==0){
                    $nameReturn = $filename;
                }
                else{
                    $nameReturn = $nameReturn. '|||||' .$filename;
                }
                $i++;

                // $fileImage->move($path, $filename);
                // \DB::table('products_images')
                //     ->insert([
                //         'name'       => $fileImage->getClientOriginalName(),
                //         'path'       => $filename,
                //         'product_id' => $productID,
                //         'created_at' => Carbon::now()
                //     ]);
            }
        }
        return $nameReturn;
    }

    public function deleteImage(Request $request)
    {
        $data = Product::find($request->id);

        $imageArr = explode('|||||', $data->product_image);

        $imageUrl = "";

        for($i=0; $i<count($imageArr); $i++){
            if($imageArr[$i] != $request->name){
                if($imageUrl == "")
                    $imageUrl = $imageArr[$i];
                else
                    $imageUrl = $imageUrl . '|||||' . $imageArr[$i];
            }
        }

        //$data->image_url = $imageUrl;
        Product::find($request->id)->update([
            'product_image' => $imageUrl
        ]);

        return redirect()->back();
    }

    public function indexExists(Request $request)
    {
        $products = Product::with('category:id,name');

        if ($name = $request->n)
            $products->where('product_name', 'like', '%' . $name . '%');

        if ($s = $request->status)
            $products->where('status', $s);

        $products = $products
            ->orderByDesc('product_id')
            ->paginate(20);

        $model = new Product();
        $status = $model->getStatus();

        $viewData = [
            'products' => $products,
            'query'    => $request->query(),
            'status'   => $status
        ];

        return view('be.product.indexExists', $viewData);
    }
}
