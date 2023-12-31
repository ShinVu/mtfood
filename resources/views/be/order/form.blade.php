<form method="POST" action="" autocomplete="off" enctype="multipart/form-data">
    <div class="row">
        <div class="col-sm-8">
            @csrf
            <div class="card">
                <div class="card-body">
                    <div class="card-content">
                            <div class="receipt">
                                <div class="receipt__header text-center">
                                    <h3 class="receipt__title">Đơn hàng</h3>
                                    <input type="hidden" id="pastValue" name="pastValue" value="">
                                    <input type="hidden" id="account_id" name="account_id" value="1">
                                    <input type="hidden" id="inventory_status" name="inventory_status" value="0">
                                    <input type="hidden" id="total_amount" name="total_amount" value="0">
                                </div>
                                <div class="receipt__info">
                                    <table>
                                        <tr>
                                            <td>
                                                <p class="receipt__info--name">Tên khách hàng: <input value="" class="receipt__info--input bordernone" name="delivery_name" type="text" placeholder="tên khách hàng" required></p>
                                            </td>
                                            <td>
                                                <p class="receipt__info--company">Số điện thoại: <input value=""  class="receipt__info--input bordernone" name="delivery_phone" type="text" placeholder="số điện thoại" required></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class="receipt__info--note">Địa chỉ: <input value=""  class="receipt__info--input bordernone" name="delivery_address" type="text" placeholder="địa chỉ" required></p>
                                            </td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="table-responsive receipt__table" style="margin-top: 20px;">
                                    <table name="dataProduct" class="table table-hover table-action">
                                        @csrf
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên sản phẩm</th>
                                                <th class="text-right">Số lượng</th>
                                                <th class="text-right">Giảm giá</th>
                                                <th class="text-right">Đơn giá</th>
                                            </tr>
                                        </thead>
                                        <tbody id="bodyTable">
                                        </tbody>
                                    </table>
                                </div>
                                <div class="w-100 text-right">
                                    <p>Tổng tiền: <span id="total_amountx">0</span> đ</p>
                                </div>
                            </div>
                            <div  class="w-100 d-flex align-center space-between">
                                <button type="submit" name="order_add" class="btn btn-primary btn-icon-text">
                                    <i class="ti-file btn-icon-prepend"></i>
                                    Tạo phiếu
                                </button>
                                <a id="clearAll">Xóa tất cả</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="card">
                <div class="card-body">
                    <div class="card-content">
                            <div class="main-pane-top">
                                <h4 class="card-title">Sản phẩm</h4>
                            </div>
                            <div class="input-item form-group">
                                <label for="productid" class="d-block">Sản phẩm</label>
                                <select id="product_id" name="product_id" class="form-control" required>
                                    <option value="0" selected>Chọn danh mục</option>
                                    @foreach($products ?? [] as $item)
                                        <option value="{{ $item->product_id }}" >
                                            {{ $item->product_name }}
                                            <input type="hidden" id="product_quantity_{{ $item->product_id }}" value="{{ $item->product_quantity }}">
                                            <input type="hidden" id="product_price_{{ $item->product_id }}" value="{{ $item->product_price }}">
                                            <input type="hidden" id="product_sale_{{ $item->product_id }}" value="{{ $item->product_sale }}">
                                        </option>
                                    @endforeach
                                </select>
                                @error('product_id')
                                    <small id="emailHelp" class="form-text text-danger">{{ $errors->first('product_id') }}</small>
                                @enderror
                            </div>
                            <div  class="w-100 d-flex align-center space-between">
                                <div id="quantity_alert"></div>
                                <div id="price_alert"></div>
                            </div>
                            <div class="input-item form-group">
                                <label for="title" class="d-block">Số lượng</label>
                                <input class="d-block form-control" id="product_quantity" name="product_quantity" type="number" value="0" placeholder="Nhập vào số lượng" required>
                            </div>
                            <div class="w-100" style="text-align: left;">
                                <a id="addProduct" style="display: {{ $page?'none':'true' }}" name="addProduct" class="btn btn-primary mb-2 mr-2">
                                    <i class="ti-file btn-icon-prepend"></i>
                                    Thêm
                                </a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/fileinput.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/themes/fa/theme.js" type="text/javascript"></script>


<script>
    $(function (){
        var arrProduct = [];

        function productChange(){
            if($('#product_id').val() != 0){
                $('quantity_alert').html('Còn ' + $('#product_quantity_'+$('#product_id').val()).val() + ' sản phẩm');
                $('price_alert').html('' + $('#product_price_'+$('#product_id').val()).val() + ' đ');
            }
        }

        function updateBodyTable(arr){
            let html = "";
            let sum = 0;
            for(i=0;i<arr.length;i++){
                html += `
                    <tr>
                        <td><input name='id[]' style='border:0;outline:0;display:inline-block' value='` + arr[i].product_id + `' disabled></td>
                        <td><input name="name[]" style='border:0;outline:0;display:inline-block' value='` + arr[i].product_name + `' disabled></td>
                        <td class="text-right"><input name="quantity[]" style='border:0;outline:0;display:inline-block' value='` + arr[i].product_quantity + `' disabled></td>
                        <td class="text-right"><input name="price[]" style='border:0;outline:0;display:inline-block' value='` + arr[i].product_sale + `' disabled></td>
                        <td class="text-right"><input name="date[]" style='border:0;outline:0;display:inline-block' value='` + arr[i].product_price + `' disabled></td>
                    </tr>
                `;
                sum += arr[i].product_price*arr[i].product_quantity - (arr[i].product_price*arr[i].product_quantity)*arr[i].product_sale/100;
            }

            if(html != ""){
                $('#bodyTable').html(html);
                $('#total_amountx').html(sum);
                $('#total_amount').val(sum);
            }
        }

        $('#clearAll').on('click', function(e){
            e.preventDefault();
            arrProduct = [];
            $('#bodyTable').html("<tr><td colspan='5' class='text-center'>Không có sản phẩm</td></tr>");
            $('#total_amountx').html(0);
            $('#total_amount').val(0);
        });

        $('#addProduct').on('click', function(e){
            e.preventDefault();
            if($('#product_id').val() == 0) return;

            let newProduct = {
                product_id : $('#product_id').val(),
                product_name: $('#product_id option:selected').text().replace("\n                                            ", "").replace("\n                                            ", ""),
                product_sale : parseInt($('#product_sale_' + $('#product_id').val()).val()),
                product_price : parseInt($('#product_price_' + $('#product_id').val()).val()),
                product_quantity : parseInt($('#product_quantity').val()),
            };

            let flag = false;
            for(i=0; i<arrProduct.length; i++){
                if(arrProduct[i].product_id == newProduct.product_id){
                    arrProduct[i].product_quantity += parseInt(newProduct.product_quantity);
                    flag = true;
                }
            }
            if(!flag){
                arrProduct.push(newProduct);
            }

            $('#pastValue').val(JSON.stringify(arrProduct));

            updateBodyTable(arrProduct);
        });
    });
</script>
<style>
    .bordernone{
        border: none;
    }
</style>
