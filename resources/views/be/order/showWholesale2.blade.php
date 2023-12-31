@extends('be.layouts.app_be')
@section('content')
    @php
        $Jquery_val = "";
        $Jquery_valMain_child = "";
        $orderInfo = new stdClass();
        $orderInfo->data = array();
        $orderInfo->total = $order['total_amount'];
        $orderInfo->val = 0;
        $orderInfo->showTable = true;
    @endphp
    <form method="POST" action="" autocomplete="off" enctype="multipart/form-data">
        @csrf
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý đơn hàng</h4>
            <a href="{{ route('get_admin.order.indexWholesale') }}">Trở về</a>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="card-content">
                    <div class="checkout">
                        <div class="row">
                            <div class="col col-lg-7">
                                <div class="checkout__title d-flex align-center space-between">
                                    <span>Mã đơn hàng: {{ $order['order_code'] }}</span>
                                    <span>Thời gian: {{ $order['order_date'] }}</span>
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
                                <div id="orderTable" style="margin-bottom: 30px;"></div>
                                <div id="btComplete">
                                    @if($order['parent_id'] == 0)
                                        <a href="{{ route('get_admin.order.updateFinished', $order['order_id']) }}" class="btn btn-outline-dark btn-fw">Đã hoàn thành</a>
                                    @endif
                                </div>
                            </div>
                            <div class="col col-lg-5">
                                <div class="checkout__cart">
                                    <div class="checkout__items">
                                        @foreach($orderdetail ?? [] as $item)
                                            @php
                                                $orderInfo_child =  new stdClass();
                                                $orderInfo_child->id =  $item['product_id'];
                                                $orderInfo_child->name =  $item['product_name'];
                                                $orderInfo_child->quantity = (int)$item['product_quantity'];
                                                $orderInfo_child->image = explode("|||||", $item['product_image'])[0];
                                                $orderInfo_child->val = 0;
                                                array_push($orderInfo->data, $orderInfo_child);
                                                $Jquery_val = $Jquery_val."{id: ".$item['product_id'].",name: '".$item['product_name']."',quantity: ".$item['product_quantity'].", image: '".explode("|||||", $item['product_image'])[0]."', price: ".$item['product_price'].", ck: ".(($item['p_price'] - $item['level'.format_wholesale_price($item['product_quantity'])])*$item['product_quantity'])."},";
                                            @endphp
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
                                        @php
                                            $Jquery_val= "var items = [$Jquery_val];";
                                        @endphp
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
                                @php
                                    $Jquery_valMain_child = "";
                                @endphp
                                @foreach($orderChildsDetail as $orderChild)
                                    <div class="checkout__cart checkout__infomation">
                                        <div class="checkout__title d-flex align-center space-between"><span>Mã đơn hàng: {{ $orderChild['order']->order_code }}</span> <span>Thời gian: {{ $orderChild['order']->order_date }}</span></div>
                                        <div class="checkout__items">
                                            @php
                                                $Jquery_val_child = "";
                                            @endphp
                                            @foreach($orderChild['detail'] as $item)
                                                @php
                                                    addChild($orderInfo, $item['product_id'], $item['product_quantity']);
                                                    $Jquery_val_child = $Jquery_val_child."{id: ".$item['product_id'].",name: '".$item['product_name']."',quantity: ".$item['product_quantity'].", image: '".explode("|||||", $item['product_image'])[0]."', price: ".$item['product_price'].", ck: ".(($item['p_price'] - $item['level'.format_wholesale_price($item['product_quantity'])])*$item['product_quantity'])."},";
                                                @endphp
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
                                            @php
                                                $Jquery_valMain_child = $Jquery_valMain_child."{data: [$Jquery_val_child], id: ".$orderChild['order']['order_code']."},";
                                            @endphp
                                        </div>
                                        <div class="checkout__bottom d-flex align-center space-between">
                                            <h4 class="checkout__total">Tổng tiền:</h4>
                                            <span class="checkout__total">{{ number_format($orderChild['order']->total_amount) }}</span>
                                        </div>
                                        <div class="order_status d-flex align-center space-between">Tình trạng đơn: <span class="col-span">{{ format_order_status($orderChild['order']->order_status) }}</span></div>
                                        <div class="checkout__bottom d-flex align-center space-between">
                                            @if($orderChild['order']->order_status == 0)
                                                <a href="{{ route('get_admin.order.updateWholesale', $orderChild['order']->order_id) }}" class="btn btn-outline-dark btn-fw">Duyệt đơn</a>
                                            @elseif($orderChild['order']->order_status == 1)
                                                <a href="{{ route('get_admin.order.updateWholesale', $orderChild['order']->order_id) }}" class="btn btn-outline-dark btn-fw">Tự đi giao</a>
                                                <a href="{{ route('get_admin.order.sendGHNWholesale', $orderChild['order']->order_id) }}" class="btn btn-outline-dark btn-fw">Gửi đơn vị giao hàng</a>
                                            @elseif ($orderChild['order']->order_status == 2)
                                                @if($orderChild['order']->GHN_code == null)
                                                    <a href="{{ route('get_admin.order.updateDebt1', $orderChild['order']->order_id) }}" class="btn btn-outline-dark btn-fw">Đã thu tiền</a>
                                                    <a href="{{ route('get_admin.order.updateDebt0', $orderChild['order']->order_id) }}" class="btn btn-outline-dark btn-fw">Công nợ</a>
                                                    <a href="{{ route('get_admin.order.detroyWholesale', $orderChild['order']->order_id) }}" class="btn btn-outline-dark btn-fw">Hủy đơn hàng</a>
                                                @else
                                                    <a href="{{ route('get_admin.order.updateWholesale', $orderChild['order']->order_id) }}" class="btn btn-outline-dark btn-fw">Duyệt đơn</a>
                                                @endif
                                            @else
                                                <a href="{{ route('get_admin.order.detroyWholesale', $orderChild['order']->order_id) }}" class="btn btn-outline-dark btn-fw">Trả hàng</a>
                                            @endif
                                                <a href="{{ route('get_admin.order.print', $orderChild['order']->order_id) }}" target="_blank" class="btn btn-outline-dark btn-fw mg-l-16">In Hóa Đơn</a>

                                        </div>
                                @endforeach
                                @php
                                    $Jquery_valMain_child = "var items_child = [".$Jquery_valMain_child."];";
                                @endphp
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="card addSubOrder mt-sm">
                <div class="card-body">
                    <div class="card-content">
                        <div class="row">
                            <div class="col col-lg-7">
                                <div class="checkout__infomation">
                                    <div class="productInfo"></div>
                                    <div class="productAdd">
                                    </div>
                                </div>
                            </div>
                            <div class="col col-lg-5">
                                <div class="checkout__cart">
                                    <div class="checkout__items productsSubOrder">
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
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

    <script>
        var activeSubOrder = true;
        var items = [];
        var items_child = [];
        var order_code = {{$order->order_code}};
        @php
            echo $Jquery_val;
            echo $Jquery_valMain_child;
        @endphp
        @if($orderInfo->showTable)
            @php
                echo "var orderTable = ".json_encode($orderInfo).";"
            @endphp
            
        @else
            @php
                echo "var orderTable = {};"
            @endphp
        @endif

        function showOrderTable(ob){
            let html = `<div class="table-responsive" style="overflow: hidden;">
                        <table class="table table-hover table-action">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Tên hàng</th>
                                    <th>Số lượng</th>
                                    <th>Số lượng giao</th>
                                    <th>Số lượng chưa giao</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            for(let i = 0; i < ob.data.length; i++){
                html += `
                                <tr>
                                    <td><img src="modules/product/uploads/` + ob.data[i].image + `" class="product_image" alt="image"></td>
                                    <td>` + ob.data[i].name + `</td>
                                    <td>` + ob.data[i].quantity + `</td>
                                    <td>` + ob.data[i].val + `</td>
                                    <td>` + (ob.data[i].quantity - ob.data[i].val) + `</td>
                                </tr>
                `;
            }
            html += `
                                <tr>
                                    <td colspan="3" style="padding:5px;">Số tiền đã thanh toán</td>
                                    <td colspan="2" style="padding:5px;">` + ob.val + `</td>
                                </tr>
                                <tr>
                                    <td colspan="3" style="padding:5px;">Số tiền còn lại</td>
                                    <td colspan="2" style="padding:5px;">` + (ob.total - ob.val) + `</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            `;
            return html;
        }

        function showSuccessToast() {
            toast({
                title: "Success",
                message: "Cập nhật thành công",
                type: "success",
                duration: 0,
            });
        }
        function showInfoToast() {
            toast({
                title: "Info",
                message: "Tính năng tạm thời đang phát triển",
                type: "info",
                duration: 0,
            });
        }
        function showErrorToast() {
            toast({
                title: "Error",
                message: "Không thể thực thi yêu cầu",
                type: "error",
                duration: 0,
            });
        }

        function itemCount(id, arr){
            let count = 0;
            for(let i=0;i<arr.length;i++){
                for(let j=0;j<arr[i].data.length;j++){
                    if(arr[i].data[j].id == id){
                        count += arr[i].data[j].quantity;
                    }
                }
            }
            return count;
        }

        function showProductExists(mainArr, arr){
            let html = "";
            let flag = false;
            let count = 0;
            if(arr.length == 0){
                // --
            }else{
                for(let i=0;i<mainArr.length;i++){
                    html += `<div class="checkout__title d-flex align-center space-between">
                                <span>` + mainArr[i].name + `: </span> <span>Số lượng: ` + (mainArr[i].quantity - itemCount(mainArr[i].id, arr)) + `</span>
                            </div>`;
                    if((mainArr[i].quantity - itemCount(mainArr[i].id, arr)) == 0){
                        count++;
                        if(mainArr.length == 1) flag = true;
                        else if(count == mainArr.length && !flag) flag = false;
                        else flag = true;
                    }
                }
            }

            $('.productInfo').html(html);
            console.log(flag);
            return flag;
        }

        function showSelectProductAll(){
            let html = `<div style="width:100%">
                            <label class="info__title" for="">Chọn sản phẩm:</label>
                            <select name="productAll" id="productAll" class="info__input flex-1 productAll" required>`;
                html +=         '<option value="">Chưa xác định</option>';

            for(i=0;i<items.length; i++){
                html +=         '<option quantity="' + items[i].quantity + '" value="' + items[i].id + '">' + items[i].name + '</option>';
            }

            html +=         `</select>
                        </div>
                        <div style="width:100%">
                            <label class="info__title" for="">Số lượng:</label>
                            <input class="flex-1 quantity mt-sm" name="quantity" type="number" style="width: 312px;" required>
                        <div>`;
            html +=     `<div style="width:100%">
                            <a target="_blank" onclick="addProductSubOrder()" class="btn btn-outline-dark btn-fw mg-l-16 mt-sm">Thêm sản phẩm</a>
                        </div>`;
            $('.productAdd').html(html);
            //$('.productAll').chosen();
        }

        var itemsSubOrder = [];

        function addProductSubOrder(){
            let id = $('.productAll').find(":selected").val();
            let quantity = $('.quantity').val();
            let flag = false;

            let current = (id) => {
                for(let i=0; i<itemsSubOrder.length;i++){
                    if(parseInt(id) == itemsSubOrder[i].id) return i;
                }
                return -1;
            };
            for(let i=0; i<items.length;i++){
                if((items[i].id == parseInt(id)) && (parseInt(items[i].quantity) >=
                            ((parseInt(quantity) + ((current(id)==-1)?0:itemsSubOrder[current(id)].quantity))) + itemCount(items[i].id, items_child))){
                    flag = true;
                    if(current(id)==-1)
                        itemsSubOrder.push({
                            id: items[i].id,
                            image: items[i].image,
                            quantity: parseInt(quantity),
                            name: items[i].name,
                            price:  items[i].price,
                            ck: items[i].ck/items[i].quantity * parseInt(quantity)
                        });
                    else{
                        itemsSubOrder[current(id)].quantity += parseInt(quantity);
                        itemsSubOrder[current(id)].ck += items[i].ck/items[i].quantity * parseInt(quantity);
                    }

                    break;
                }
            }
            if(flag){
                let html = "";
                for(i=0; i<itemsSubOrder.length;i++){
                    html += `<div class="checkout__item d-flex align-center">
                                <div class="checkout__image p-relative">
                                    <div class="product-quantity align-center d-flex justify-center p-absolute"><span class="quantity-number">` + itemsSubOrder[i].quantity + `</span></div>
                                    <img class="w-100 d-block object-fit-cover ratio-1" src="modules/product/uploads/` + itemsSubOrder[i].image + `" alt="">
                                </div>
                                <div class="checkout__name flex-1">
                                    <h3 class="checkout__name">` + itemsSubOrder[i].name + `</h3>
                                </div>
                                <div class="checkout__price">` + itemsSubOrder[i].price + `</div>
                            </div>`;
                }
                if(html != ""){
                    $('.productsSubOrder').html(html + `
                        <div class="checkout__item d-flex align-center">
                            
                                <input type="hidden" id="jsonData" name="jsonData">
                                <input type="hidden" id="parent_id" name="parent_id" value="` + order_code + `">
                                <button type="submit" value="Submit" name="tachdon" class="btn btn-outline-dark btn-fw mg-l-16">Tách đơn</button>
                            
                        </div>
                    `);
                    $('#jsonData').val(JSON.stringify(itemsSubOrder))
                }
            }else
                showErrorToast();
        }

        //activeSubOrder
        if(!activeSubOrder){
            $('.addSubOrder').css('display', 'none');
            $('#btComplete').css('display', 'none');
        }else{
            showSelectProductAll();
            if(showProductExists(items, items_child)){
                $('.addSubOrder').css('display', 'none');
            }else{
                $('#btComplete').css('display', 'none');
            }
        }

        if(orderTable != {}){
            $('#orderTable').html(showOrderTable(orderTable));
        }
    </script>

@stop
