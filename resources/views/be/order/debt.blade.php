@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="row">
            <div class="col">
                <div class="header__list d-flex space-between align-center">
                    <h3 class="card-title" style="margin: 0;">Danh sách công nợ</h3>
                    <div class="action_group">

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="main-pane-top d-flex justify-center align-center">
                            <div class="input__search p-relative">
                                <form class="search-form" action="" method="POST">
                                    <i class="icon-search p-absolute"></i>
                                    <input type="search" class="form-control" name="account_keyword" placeholder="Search Here" title="Search here">
                                </form>
                            </div>
                        </div>
                        <div class="table-responsive">
                                <table class="table table-hover table-action">
                                    <thead>
                                        <tr>
                                            <th>Tên khách hàng</th>
                                            <th>Thông tin hóa đơn</th>
                                            <th>Số tiền nợ</th>
                                            <th>
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($debts as $row)
                                            @php
                                                $total = 0;
                                            @endphp
                                            @foreach ($row['debts'] as $item)
                                                @php
                                                    $total += $item['total_amount'];
                                                @endphp
                                            <tr>
                                                <td style="background: lightskyblue;">{{ $item['account_name'] }}</td>
                                                <td><a href="{{ route('get_admin.order.showWholesale2', $item['order_id']) }}"><?php echo $item['order_code'] ?></a></td>
                                                <td><?php echo number_format($item['total_amount']) ?> đ</td>
                                                <td>
                                                <a target="_blank" href="{{ route('get_admin.order.payDebt', $item['order_id']) }}" class="btn btn-outline-dark btn-fw mg-l-16">Đã thanh toán</a>
                                                </td>
                                            </tr>

                                            @endforeach
                                            <tr>
                                                <td colspan="2" style="padding:20px;background: lightskyblue; font-weight: 900;">Tổng</td>
                                                <td colspan="2" style="padding:20px;background: lightskyblue">{{ number_format($total) }}</td>
                                            </tr>
                                         @endforeach
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link href="{{asset('theme_admin/css/customize.css') }}" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>


    <style>

    .contact__btn {
        padding: 15px 35px;
        margin-right: 10px;
        border: solid 1px black;
    }
    </style>
@stop
