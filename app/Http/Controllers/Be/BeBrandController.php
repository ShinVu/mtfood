<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BeBrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $brand = Brand::whereRaw(1);
        if ($request->n) $brand->where('brand_name','like','%'.$request->n.'%');

        $brand = $brand->orderByDesc('brand_id')->paginate(20);

        $viewData = [
            'brand' => $brand
        ];

        return view('be.brand.index', $viewData);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('be.brand.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            $data = $request->except('_token');
            $brand = Brand::create($data);
        }catch (\Exception $exception) {
            toastr()->error('Thêm mới thất bại!', 'Thông báo');
            Log::error("ERROR => BeBrandController@store => ". $exception->getMessage());
            return redirect()->route('get_admin.brand.create');
        }
        toastr()->success('Thêm mới thành công!', 'Thông báo');
        return redirect()->route('get_admin.brand.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $brand = Brand::findOrFail($id);
        return view('be.brand.update', compact('brand'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        try {
            $data = $request->except('_token');

            Brand::find($id)->update($data);
        }catch (\Exception $exception) {
            toastr()->error('Update thất bại!', 'Thông báo');
            Log::error("ERROR => BeBrandController@store => ". $exception->getMessage());
            return redirect()->route('get_admin.brand.update', $id);
        }

        toastr()->success('Update thành công!', 'Thông báo');
        return redirect()->route('get_admin.brand.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Request $request, $id)
    {
        //
        try {
            $brand = Brand::findOrFail($id);
            if ($brand) $brand->delete();

        }catch (\Exception $exception) {
            toastr()->error('Update thất bại!', 'Thông báo');
            Log::error("ERROR => BeBrandController@delete => ". $exception->getMessage());
        }

        toastr()->success('Update thành công!', 'Thông báo');
        return redirect()->route('get_admin.brand.index');
    }
}
