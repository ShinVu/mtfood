<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;

class BePermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::orderByDesc('id')
            ->paginate(20);

        $viewData = [
            'permissions' => $permissions
        ];

        return view('be.permission.index', $viewData);
    }

    public function create()
    {
        return view('be.permission.create');
    }

    public function store(Request $request)
    {
        try {
            $data = $request->except('_token');
            $data['created_at'] = Carbon::now();
            Permission::create($data);
        }catch (\Exception $exception) {
            Log::error("ERROR => BePermissionController@store => ". $exception->getMessage());
            toastr()->error('Thêm mới thất bại!', 'Thông báo');
            return redirect()->route('get_admin.permission.create');
        }
        toastr()->success('Thêm mới thành công!', 'Thông báo');
        return redirect()->route('get_admin.permission.index');
    }

    public function edit($id)
    {
        $permission = Permission::findOrFail($id);
        return view('be.permission.update', compact('permission'));
    }

    public function update(Request $request, $id) {
        try {
            $data = $request->except('_token');
            $data['updated_at'] = Carbon::now();

            Permission::find($id)->update($data);
        }catch (\Exception $exception) {
            Log::error("ERROR => BePermissionController@store => ". $exception->getMessage());
            toastr()->error('Update thất bại!', 'Thông báo');
            return redirect()->route('get_admin.permission.update', $id);
        }
        toastr()->success('Update thành công!', 'Thông báo');
        return redirect()->route('get_admin.permission.index');
    }

    public function delete(Request $request, $id) {
        try {
            $permission = Permission::findOrFail($id);
            if ($permission) $permission->delete();

        }catch (\Exception $exception) {
            toastr()->error('Update thất bại!', 'Thông báo');
            Log::error("ERROR => BePermissionController@delete => ". $exception->getMessage());
        }

        toastr()->success('Update thành công!', 'Thông báo');
        return redirect()->route('get_admin.permission.index');
    }
}
