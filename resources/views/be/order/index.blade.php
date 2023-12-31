@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý đơn hàng</h4>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="main-pane-top d-flex space-between align-center" style="padding-inline: 20px;">
                    <div class="input__search p-relative">
                        <form class="search-form" action="?action=order&query=order_search" method="POST">
                            <i class="icon-search p-absolute"></i>
                            <input type="search" name="order_search" class="form-control" placeholder="Search Here" title="Search here">
                        </form>
                    </div>
                    <div class="dropdown dropdown__item">
                        <select name="orderStatus" onchange="showThisOnChange(this.value)" id="orderStatus">
                            <option value="-1">Tất cả</option>
                            <option value="0" selected>Đơn đang xử lý</option>
                            <option value="1">Đang chuyển bị hàng</option>
                            <option value="2">Đang giao hàng</option>
                            <option value="3">Đã hoàn thành</option>
                          </select>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-hover table-action">
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Thời gian</th>
                                <th>Tên người đặt</th>
                                <th>Loại đơn hàng</th>
                                <th>Tình trạng đơn hàng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($orders ?? [] as $item)
                                <tr class="orderStatus{{$item['order_status']}}">
                                    <td>{{ $item['order_code'] }}</td>
                                    <td>{{ $item['order_date'] }}</td>
                                    <td>{{ $item['account_name'] }}</td>
                                    <td>{{ format_order_type($item['order_type']) }}</td>
                                    <td>
                                        <span class="col-span {{ format_status_style($item['order_status']) }}">
                                        {{ format_order_status($item['order_status']) }} / {{ format_GHNorder_status($item['GHN_code'])}}
                                        </span>
                                    </td>
                                    <td>
                                        <a href="{{ route('get_admin.order.show', $item['order_id']) }}">Chi tiết</a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <link href="{{asset('theme_admin/css/customize.css') }}" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script>
        showThisOnChange = function(value) {
            for(i=0;i<4;i++){
                if(i==value || value==-1){
                    $('.orderStatus' + i).css('display', '');
                }else{
                    $('.orderStatus' + i).css('display', 'none');
                }
            }
        }
        showThisOnChange(0);
    </script>
@stop
