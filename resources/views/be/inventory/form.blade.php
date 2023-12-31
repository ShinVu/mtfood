<form method="POST" action="" autocomplete="off" enctype="multipart/form-data">
    <div class="row">
        <div class="col-sm-8">
            @csrf
            <div class="card">
                <div class="card-body">
                    <div class="card-content">
                            <div class="receipt">
                                <div class="receipt__header text-center">
                                    <h3 class="receipt__title">Phiếu Nhập Kho</h3>
                                    <input type="hidden" id="pastValue" name="pastValue" value="">
                                    <input type="hidden" id="account_id" name="account_id" value="1">
                                    <input type="hidden" id="inventory_status" name="inventory_status" value="0">
                                    <input type="hidden" id="total_amount" name="total_amount" value="0">
                                </div>
                                <div class="receipt__info">
                                    <table>
                                        <tr>
                                            <td>
                                                <p class="receipt__info--name">Người nhập kho: <input value="{{ $page ? $inventory[0]->staf_name: '' }}" class="receipt__info--input bordernone" name="staf_name" type="text" placeholder="tên người nhập" required></p>
                                            </td>
                                            <td>
                                                <p class="receipt__info--company">Tên đơn vị cung cấp: <input value="{{ $page ? $inventory[0]->supplier_name: '' }}"  class="receipt__info--input bordernone" name="supplier_name" type="text" placeholder="tên đơn vị cung cấp" required></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class="receipt__info--note">Ghi chú: <input value="{{ $page ? $inventory[0]->inventory_note: '' }}"  class="receipt__info--input bordernone" name="inventory_note" type="text" placeholder="Lý do nhập kho" required></p>
                                            </td>
                                            <td>
                                                <p class="receipt__info--company">Số điện thoại: <input value="{{ $page ? $inventory[0]->supplier_phone: '' }}"  class="receipt__info--input bordernone" name="inventory_phone" type="text" placeholder="nhập vào số điện thoại" required></p>
                                            </td>
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
                                                <th class="text-right">Đơn giá</th>
                                                <th class="text-right">HSD</th>
                                            </tr>
                                        </thead>
                                        <tbody id="bodyTable">
                                            @php
                                                $total_amount = 0;
                                            @endphp
                                            @if($page)
                                                @foreach($inventory_detail ?? [] as $item)
                                                    <tr>
                                                        <td>{{$item->product_id}}</td>
                                                        <td>{{$item->product_name}}</td>
                                                        <td>{{$item->product_quantity}}</td>
                                                        <td>{{(int)$item->product_price}}</td>
                                                        <td>{{$item->product_date_import}}</td>
                                                    </tr>

                                                    @php
                                                        $total_amount += (int)$item->product_price_import*(int)$item->product_quantity;
                                                    @endphp
                                                @endforeach
                                            @endif
                                        </tbody>
                                    </table>
                                </div>
                                <div class="w-100 text-right">
                                    <p>Tổng tiền: <span id="total_amountx">{{ $page?$total_amount:'0' }}</span> đ</p>
                                </div>
                            </div>
                            <div style="display: {{ $page?'none':'true' }} !important;" class="w-100 d-flex align-center space-between">
                                <button type="submit" name="inventory_add" class="btn btn-primary btn-icon-text">
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
                                <h4 class="card-title">Sản phẩm nhập</h4>
                            </div>
                            <div class="input-item form-group">
                                <label for="productid" class="d-block">Sản phẩm</label>
                                <select id="product_id" name="product_id" class="form-control" required>
                                    <option value="0" selected>Chọn danh mục</option>
                                    @foreach($products ?? [] as $item)
                                        <option value="{{ $item->product_id }}" >{{ $item->product_name }}</option>
                                    @endforeach
                                </select>
                                @error('product_id')
                                    <small id="emailHelp" class="form-text text-danger">{{ $errors->first('product_id') }}</small>
                                @enderror
                            </div>
                            <div class="input-item form-group">
                                <label for="title" class="d-block">Số lượng nhập</label>
                                <input class="d-block form-control" id="product_quantity" name="product_quantity" type="number" value="0" placeholder="Nhập vào số lượng" required>
                            </div>
                            <div class="input-item form-group">
                                <label for="title" class="d-block">Giá nhập</label>
                                <input class="d-block form-control" id="product_price_import" name="product_price_import" type="text" value="0" placeholder="Nhập vào giá sản phẩm" required>
                            </div>
                            <div class="input-item form-group">
                                <label for="title" class="d-block">Hạn sử dụng (ngày): </label>
                                <input class="d-block form-control" id="product_date_import" name="product_date_import" type="number" value="30" required>
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
        var arrInventory = [];

        function updateBodyTable(arr){
            let html = "";
            let sum = 0;
            for(i=0;i<arr.length;i++){
                html += `
                    <tr>
                        <td><input name='id[]' style='border:0;outline:0;display:inline-block' value='` + arr[i].product_id + `' disabled></td>
                        <td><input name="name[]" style='border:0;outline:0;display:inline-block' value='` + arr[i].product_name + `' disabled></td>
                        <td class="text-right"><input name="quantity[]" style='border:0;outline:0;display:inline-block' value='` + arr[i].product_quantity + `' disabled></td>
                        <td class="text-right"><input name="price[]" style='border:0;outline:0;display:inline-block' value='` + arr[i].product_price_import + `' disabled></td>
                        <td class="text-right"><input name="date[]" style='border:0;outline:0;display:inline-block' value='` + arr[i].product_date_import + `' disabled></td>
                    </tr>
                `;
                sum += arr[i].product_price_import*arr[i].product_quantity;
            }

            if(html != ""){
                $('#bodyTable').html(html);
                $('#total_amountx').html(sum);
                $('#total_amount').val(sum);
            }
        }

        $('#clearAll').on('click', function(e){
            e.preventDefault();
            arrInventory = [];
            $('#bodyTable').html("<tr><td colspan='5' class='text-center'>Không có sản phẩm</td></tr>");
            $('#total_amountx').html(0);
            $('#total_amount').val(0);
        });

        $('#addProduct').on('click', function(e){
            e.preventDefault();
            if($('#product_id').val() == 0) return;

            let newProduct = {
                product_id : $('#product_id').val(),
                product_name: $('#product_id option:selected').text(),
                product_quantity : parseInt($('#product_quantity').val()),
                product_price_import : parseInt($('#product_price_import').val()),
                product_date_import : parseInt($('#product_date_import').val())
            };

            let flag = false;
            for(i=0; i<arrInventory.length; i++){
                if(arrInventory[i].product_id == newProduct.product_id){
                    arrInventory[i].product_quantity += parseInt(newProduct.product_quantity);
                    arrInventory[i].product_price_import = parseInt(newProduct.product_price_import);
                    flag = true;
                }
            }
            if(!flag){
                arrInventory.push(newProduct);
            }

            $('#pastValue').val(JSON.stringify(arrInventory));

            updateBodyTable(arrInventory);
        });

        function submitInventory(){
            $.ajax({
                url: '/admin/inventory/create',
                type: 'POST',
                dataType: 'json',
                data: arrInventory, // stringified data to be sent
                success: function(response) {

                },
                error: function() {
                    console.error('Failed');
                }
            });
        }
    });
</script>
<style>
    .bordernone{
        border: none;
    }
</style>
