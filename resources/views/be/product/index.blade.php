@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý sản phẩm</h4>
        </div>
        <div>
            <form class="form-inline">
                <a href="{{ route('get_admin.product.create') }}" class="btn btn-primary mb-2 mr-2">Thêm mới</a>
                <div class="form-group mb-2 mr-2">
                    <label for="inputPassword2" class="sr-only">Danh mục</label>
                    <select name="status" id="" class="form-control">
                        <option value="">Danh mục</option>
                    </select>
                </div>
                <div class="form-group mb-2 mr-2" style="width: 400px">
                    <input type="text" name="n" style="width: 100%" class="form-control" value="{{ Request::get('n') }}" placeholder="">
                </div>
            </form>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th style="width: 30%">Tên sản phẩm</th>
                    <th>Danh mục</th>
{{--                    <th>Author</th>--}}
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                @foreach($products ?? [] as $item)
                    <tr>
                        <td>{{ $item->id }}</td>
                        <td>
                            <a href="" style="display: inline-block;position: relative">
                                <img src="{{ pare_url_file($item->image_url) }}" style="width: 60px;height: 60px; border-radius: 10px" alt="">
                                <span class="badge badge-danger" style="position: absolute;right: 10px;top: 10px">{{ $item->images_count }}</span>
                            </a>
                        </td>
                        <td>
                            {{ $item->name }} <br>
{{--                            <span>{{ $item->province->name ?? "..." }} - {{ $item->district->name ?? "..." }} - {{ $item->ward->name ?? "..." }}</span>--}}
                        </td>
                        <td>{{ $item->category->name ?? "[N\A]" }}</td>
{{--                        <td>{{ $item->user->name ?? "[N\A]" }}</td>--}}
                        <td>{{ number_format($item->price,0,',','.') }}đ</td>
                        <td>
                            <span class="{{ $item->getStatus($item->status)['class'] ?? "badge badge-light" }}">{{ $item->getStatus($item->status)['name'] ?? "Tạm dừng" }}</span>
                        </td>
                        <td>{{ $item->created_at }}</td>
                        <td>
                            <a href="{{ route('get_admin.product.update', $item->id) }}">Edit</a>
                            <a href="javascript:;void(0)">|</a>
                            <a href="{{ route('get_admin.product.delete', $item->id) }}">Delete</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            <div class="col-12">
                {!! $products->appends($query ?? [])->links() !!}
            </div>
        </div>
    </div>
@stop
