@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý đơn hàng</h4>
            <a href="{{ route('get_admin.order.indexOffline') }}">Trở về</a>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="card-content">
                    <div class="checkout">
                        <div class="row">
                            <div class="col col-lg-7">
                                <div class="checkout__title d-flex align-center space-between">
                                    <span>Mã đơn hàng: <?php echo $order['order_code']; ?></span>
                                    <span>Thời gian: <?php echo $order['order_date']?></span>
                                </div>

                                <div class="checkout__infomation">
                                    <div class="info__item d-flex">
                                        <label class="info__title" for="">Tên khách hàng:</label>
                                        <input type="text" class="info__input flex-1" name="delivery_name" value="{{ $delivery['delivery_name'] }}" readonly></input>
                                    </div>
                                    <div class="info__item d-flex">
                                        <label class="info__title" for="">Địa chỉ:</label>
                                        <input type="text" class="info__input flex-1" name="delivery_address" value="{{ $delivery['delivery_address'] }}" readonly></input>
                                    </div>
                                    <div class="info__item d-flex">
                                        <label class="info__title" for="">Số điện thoại:</label>
                                        <input type="text" class="info__input flex-1" name="delivery_phone" value="{{ $delivery['delivery_phone'] }}" readonly></input>
                                    </div>
                                    <div class="info__item d-flex">
                                        <label class="info__title" for="">Ghi chú:</label>
                                        <input type="text" class="info__input flex-1" name="delivery_note" value="{{ $delivery['delivery_note'] }}" readonly></input>
                                    </div>
                                    <div class="info__item d-flex">
                                        <label for="" class="info__title" for="order_type">Phương thức:</label>
                                        <input type="text" class="info__input flex-1" name="order_type" value="{{ format_order_type($order['order_type']) }}"></input>
                                    </div>
                                </div>
                            </div>
                            <div class="col col-lg-5">
                                <div class="checkout__cart">
                                    <div class="checkout__items">
                                        @foreach($orderdetail ?? [] as $item)
                                            <div class="checkout__item d-flex align-center">
                                                <div class="checkout__image p-relative">
                                                    <div class="product-quantity align-center d-flex justify-center p-absolute"><span class="quantity-number">{{ $item['product_quantity'] }}</span></div>
                                                    <img class="w-100 d-block object-fit-cover ratio-1" src="{{ pare_url_file($item['product_image']) }}" alt="">
                                                </div>
                                                <div class="checkout__name flex-1">
                                                    <h3 class="checkout__name">{{ $item['product_name'] }}</h3>
                                                </div>
                                                <div class="checkout__price">{{ (number_format($item['product_price'] - ($item['product_price'] / 100 * $item['product_sale']))) }} ₫</div>
                                            </div>
                                        @endforeach
                                    </div>
                                    <table class="w-100 mg-t-20">
                                        <tr class="table-row">
                                            <td class="h6 table-col">Giảm giá</td>
                                            <td class="h6 table-col text-right"> 0₫</td>
                                        </tr>
                                        <tr class="table-row">
                                            <td class="h6 table-col">Phí vận chuyển</td>
                                            <td class="h6 table-col text-right">Miễn phí</td>
                                        </tr>
                                    </table>
                                    <div class="checkout__bottom d-flex align-center space-between">
                                        <h4 class="checkout__total">Tổng tiền:</h4>
                                        <span class="checkout__total"><?php echo number_format((float) $order['total_amount']) . '₫' ?></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <link href="{{asset('theme_admin/css/customize.css') }}" rel="stylesheet">
@stop
