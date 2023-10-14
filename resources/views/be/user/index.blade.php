@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý thành viên</h4>
        </div>
        <div>
            <form class="form-inline">
                <a href="{{ route('get_admin.user.create') }}" class="btn btn-primary mb-2 mr-2">Thêm mới</a>
{{--                <div class="form-group mb-2 mr-2" style="width: 400px">--}}
{{--                    <input type="text" name="n" style="width: 100%" class="form-control" value="{{ Request::get('n') }}" placeholder="">--}}
{{--                </div>--}}
            </form>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Active</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                @foreach($users ?? [] as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>
                            <img src="{{ pare_url_file($item->avatar) }}" style="width: 60px;height: 60px; border-radius: 50%" alt="">
                        </td>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->email }}</td>
                        <td>
                            <span class="{{ $item->getStatus($item->status)['class'] ?? "badge badge-light" }}">{{ $item->getStatus($item->status)['name'] ?? "Tạm dừng" }}</span>
                        </td>
                        <td>{{ $item->created_at }}</td>
                        <td>
                            <a href="{{ route('get_admin.user.update', $item->id) }}">Edit</a>
                            <a href="javascript:;void(0)">|</a>
                            <a href="{{ route('get_admin.user.delete', $item->id) }}">Delete</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
