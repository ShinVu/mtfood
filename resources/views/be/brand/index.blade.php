@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý nguồn gốc sản phẩm</h4>
        </div>
        <div>
            <form class="form-inline">
                <a href="{{ route('get_admin.brand.create') }}" class="btn btn-primary mb-2 mr-2">Thêm mới</a>
                <div class="form-group mb-2 mr-2" style="width: 400px">
                    <input type="text" name="n" style="width: 100%" class="form-control" value="{{ Request::get('n') }}" placeholder="">
                </div>
            </form>
        </div>
        <div class="table-responsive" style="min-height: 60vh">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nguồn gốc</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                @foreach($brand ?? [] as $item)
                    <tr>
                        <td>{{ $item->brand_id }}</td>
                        <td>{{ $item->brand_name }}</td>
                        <td>
                            <a href="{{ route('get_admin.brand.update', $item->brand_id) }}">Chỉnh sửa</a>
                            <a href="javascript:;void(0)">|</a>
                            <a href="{{ route('get_admin.brand.delete', $item->brand_id) }}">Xóa</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
