@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý danh mục</h4>
        </div>
        <div>
            <form class="form-inline">
                <a href="{{ route('get_admin.category.create') }}" class="btn btn-primary mb-2 mr-2">Thêm mới</a>
{{--                <div class="form-group mb-2 mr-2">--}}
{{--                    <label for="inputPassword2" class="sr-only">Danh mục</label>--}}
{{--                    <select name="status" id="" class="form-control">--}}
{{--                        <option value="">Danh mục</option>--}}
{{--                    </select>--}}
{{--                </div>--}}
                <div class="form-group mb-2 mr-2" style="width: 400px">
                    <input type="text" name="n" style="width: 100%" class="form-control" value="{{ Request::get('n') }}" placeholder="">
                </div>
            </form>
        </div>
        <div class="table-responsive" style="min-height: 60vh">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>Tên danh mục</th>
                    <th>Slug</th>
                    <th>Mô tả</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                @foreach($categories ?? [] as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>
                            <img src="{{ pare_url_file($item->image_url) }}" style="width: 60px;height: 60px; border-radius: 10px" alt="">
                        </td>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->slug }}</td>
                        <td>{{ $item->description }}</td>
                        <td>{{ $item->created_at }}</td>
                        <td>
                            <a href="{{ route('get_admin.category.update', $item->id) }}">Edit</a>
                            <a href="javascript:;void(0)">|</a>
                            <a href="{{ route('get_admin.category.delete', $item->id) }}">Delete</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
