@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý đơn hàng</h4>
        </div>
        <div>
            <form class="form-inline">
                <a href="{{ route('get_admin.order.createOffline') }}" class="btn btn-primary mb-2 mr-2">Tạo đơn hàng</a>
                <div class="form-group mb-2 mr-2" style="width: 400px">
                    <input type="text" name="n" style="width: 100%" class="form-control" value="{{ Request::get('n') }}" placeholder="">
                </div>
            </form>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th style="width: 50px">STT</th>
                    <th>Mã VĐ</th>
                    <th>Thời gian</th>
                    <th>Nhân viên lên đơn</th>
                    <th>Loại đơn hàng</th>
                    <th>Tổng tiền</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                    @foreach($orders ?? [] as $item)
                        <tr>
                            <td>{{ $item->order_id }}</td>
                            <td>{{ $item->order_code }}</td>
                            <td>{{ $item->order_date ?? "[N\A]" }}</td>
                            <td>{{ $item->name }}</td>
                            <td>Mua hàng trực tiếp</td>
                            <td>{{ $item->total_amount }}</td>
                            <td>
                                <a href="{{ route('get_admin.order.showOffline', $item->order_id) }}">Chi tiết</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
