@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Xác nhận khách sỉ</h4>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Tên người dùng</th>
                    <th>Email</th>
                    <th>Loại tài khoản</th>
                    <th>Tình trạng</th>
                    <th>Đã từng kinh doanh qua sản phẩm</th>
                    <th>Loại hình kinh doanh</th>
                    <th>Bán hàng qua kênh</th>
                    <th>Ước tính sản lượng</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                @foreach($wholesales ?? [] as $item)
                    <tr>
                        <td>{{ $item->account_name }}</td>
                        <td>{{ $item->account_email }}</td>
                        <td>{{ format_account_type($item->account_type) }}</td>
                        <td>{{ format_account_status($item->account_status) }}</td>
                        <td>{{ format_question1_type($item->question1) }}</td>
                        <td>{{ format_question2_type($item->question2) }}</td>
                        <td>{{ format_question3_type($item->question3) }}</td>
                        <td>{{ number_format($item->question4) }}</td>
                        <td><a href="{{ route('get_admin.wholesale.updateWholesaleApprove', $item->account_id) }}">Phê duyệt</a></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@stop
