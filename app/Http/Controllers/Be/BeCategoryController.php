<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class BeCategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::whereRaw(1);
        if ($request->n) $categories->where('category_name','like','%'.$request->n.'%');

        $categories = $categories->orderByDesc('category_id')->paginate(20);

        $viewData = [
            'categories' => $categories
        ];

        return view('be.category.index', $viewData);
    }

    public function create()
    {
        return view('be.category.create');
    }

    public function store(Request $request)
    {
        try {
            $data = $request->except('_token','avatar');

            if ($request->avatar){
                $file = upload_image('avatar');
                if (isset($file['code']) && $file['code'] == 1) $data['category_image'] = $file['name'];
            }

            $category = Category::create($data);
        }catch (\Exception $exception) {
            toastr()->error('Thêm mới thất bại!', 'Thông báo');
            Log::error("ERROR => BeCategoryController@store => ". $exception->getMessage());
            return redirect()->route('get_admin.category.create');
        }
        toastr()->success('Thêm mới thành công!', 'Thông báo');
        return redirect()->route('get_admin.category.index');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return view('be.category.update', compact('category'));
    }

    public function update(Request $request, $id) {
        try {
            $data = $request->except('_token');

            if ($request->avatar){
                $file = upload_image('avatar');
                if (isset($file['code']) && $file['code'] == 1) $data['category_image'] = $file['name'];
            }

            Category::find($id)->update($data);
        }catch (\Exception $exception) {
            toastr()->error('Update thất bại!', 'Thông báo');
            Log::error("ERROR => BeCategoryController@store => ". $exception->getMessage());
            return redirect()->route('get_admin.category.update', $id);
        }

        toastr()->success('Update thành công!', 'Thông báo');
        return redirect()->route('get_admin.category.index');
    }

    public function delete(Request $request, $id) {
        try {
            $category = Category::findOrFail($id);
            if ($category) $category->delete();

        }catch (\Exception $exception) {
            toastr()->error('Update thất bại!', 'Thông báo');
            Log::error("ERROR => BeCategoryController@delete => ". $exception->getMessage());
        }

        toastr()->success('Update thành công!', 'Thông báo');
        return redirect()->route('get_admin.category.index');
    }
}
