@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Lịch sử phiếu nhập kho</h4>
        </div>
        <div>
            <form class="form-inline">
                <a href="{{ route('get_admin.inventory.create') }}" class="btn btn-primary mb-2 mr-2">Tạo phiếu nhập</a>
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
                    <th>Mã phiếu</th>
                    <th>Thời gian</th>
                    <th>Người nhập</th>
                    <th>Tổng tiền</th>
                </tr>
                </thead>
                <tbody>
                @foreach($inventory ?? [] as $item)
                    <tr>
                        <td>{{ $item->inventory_id }}</td>
                        <td>{{ $item->inventory_code }}</td>
                        <td>{{ $item->inventory_date ?? "[N\A]" }}</td>
                        <td>{{ $item->name }}</td>

                        <td>
                            <a href="{{ route('get_admin.inventory.show', $item->inventory_id) }}">Chi tiết</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
