<form method="POST" action="" autocomplete="off" enctype="multipart/form-data">
    <div class="row">
        <div class="col-sm-8">
            @csrf
            <div class="form-group">
                <label for="exampleInputEmail1">Tên sản phẩm</label>
                <input type="text" name="product_name" placeholder="Tên sản phẩm" class="form-control" value="{{ old('product_name', $product->product_name ?? "") }}">
                @error('product_name')
                <small id="emailHelp" class="form-text text-danger">{{ $errors->first('product_name') }}</small>
                @enderror
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Mô tả</label>
                <textarea name="product_description" class="form-control" id="" cols="30" rows="3">{{ old('product_description', $product->product_description ?? "") }}</textarea>
                @error('product_description')
                <small id="emailHelp" class="form-text text-danger">{{ $errors->first('product_description') }}</small>
                @enderror
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Cân nặng</label>
                        <input type="number" name="product_weight" placeholder="10" class="form-control" value="{{ old('product_weight', $product->product_weight ?? 0) }}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Giảm giá (%)</label>
                        <input type="text" name="product_sale" placeholder="10" class="form-control" value="{{ old('product_sale', $product->product_sale ?? "") }}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nguồn gốc</label>
                        {{-- <input type="text" name="origin" placeholder="10" class="form-control" value="{{ old('origin', $product->origin ?? "") }}"> --}}
                        <select name="product_brand" class="form-control" id="product_brand">
                            <option value="">Chọn nguồn gốc</option>
                            @foreach($product_brand ?? [] as $item)
                                <option value="{{ $item->brand_id }}" {{ ($product->product_brand ?? 0) == $item->brand_id ? "selected" : "" }}>{{ $item->brand_name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            @if (isset($images) && $images && !(count($images) == 0))
                @foreach($images as $item)
                    <a href="{{ route('get_admin.product.delete_image', [
                        'id' => (int)$product->product_id,
                        'name' => $item
                    ]) }}" style="margin-bottom: 10px;display: inline-block">
                        <img src="{{ pare_url_file($item) }}" style="width: 100px;height: auto;margin-right: 10px;border: 1px solid #dedede;border-radius: 5px" alt="">
                    </a>
                @endforeach
            @endif
            <div class="form-group">
                <label for="exampleInputEmail1">Album ảnh</label>
                <div class="file-loading">
                    <input id="images" type="file" name="file[]" multiple class="file"
                           data-overwrite-initial="false" data-min-file-count="0">
                </div>
            </div>
            <div id="wrap-row-menu">
                <h5>Giá sỉ</h5>

                <div class="col-md-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Giá sỉ mức 1 (10-29)</label>
                        <input type="text" name="level1" placeholder="0" class="form-control js-money" value="{{ old('level1', number_format(($product->level1 ?? 0),0,',')) }}">
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Giá sỉ mức 2 (30-59)</label>
                        <input type="text" name="level2" placeholder="0" class="form-control js-money" value="{{ old('level2', number_format(($product->level2 ?? 0),0,',')) }}">
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Giá sỉ mức 3 (60-99)</label>
                        <input type="text" name="level3" placeholder="0" class="form-control js-money" value="{{ old('level3', number_format(($product->level3 ?? 0),0,',')) }}">
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Giá sỉ mức 4 (100-150)</label>
                        <input type="text" name="level4" placeholder="0" class="form-control js-money" value="{{ old('level4', number_format(($product->level4 ?? 0),0,',')) }}">
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Lưu dữ liệu</button>
        </div>
        <div class="col-sm-4">
            <div class="form-group">
                <label for="exampleInputEmail1">Danh mục</label>
                <select name="product_category" class="form-control">
                    <option value="">Chọn danh mục</option>
                    @foreach($categories ?? [] as $item)
                        <option value="{{ $item->id }}" {{ ($product->product_category ?? 0) == $item->id ? "selected" : "" }}>{{ $item->name }}</option>
                    @endforeach
                </select>
                @error('product_category')
                    <small id="emailHelp" class="form-text text-danger">{{ $errors->first('product_category') }}</small>
                @enderror
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Trạng thái</label>
                <select name="product_status" id="" class="form-control">
                    @foreach($status ?? [] as $key => $item)
                        <option value="{{ $key }}" {{ ($product->product_status ?? 0) == $key ? "selected" : "" }}>{{ $item['name'] }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Giá</label>
                <input type="text" name="product_price" placeholder="0" class="form-control js-money" value="{{ old('price', number_format(($product->product_price ?? 0),0,',')) }}">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Số lượng</label>
                <input type="text" name="product_quantity" placeholder="0" class="form-control" value="{{ old('product_quantity', $product->product_quantity ?? 0) }}">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Hình ảnh</label>
                <input type="file" class="form-control" name="avatar">
                @if (isset($product->product_image) && $product->product_image)
                    <img src="{{ pare_url_file($product->product_image) }}" style="width: 60px;height: 60px; border-radius: 10px; margin-top: 10px" alt="">
                @endif
            </div>
        </div>
    </div>
</form>
{{--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" crossorigin="anonymous"--}}
{{--        referrerpolicy="no-referrer"></script>--}}

<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/css/fileinput.css" media="all"
      rel="stylesheet" type="text/css"/>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/fileinput.js"
        type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/themes/fa/theme.js"
        type="text/javascript"></script>


<script>
    $(function (){
        $('#copy_menu').off('click').click(function () {
            let $rowMenu = $('.row-menu-temple').clone().removeClass('row-menu-temple');
            $rowMenu.find('.action-row-menu').removeClass('hide');
            $('#wrap-row-menu').append($rowMenu);
        })

        $('#copy_option').off('click').click(function () {
            let $rowMenu = $('.row-option-temple').clone().removeClass('row-option-temple');
            $rowMenu.find('.action-row-menu').removeClass('hide');
            $('#wrap-row-option').append($rowMenu);
        })



        $('#wrap-row-menu').on('click', '.btn-remove', function () {
            let $this = $(this);
            if (confirm("Bạn có chắc chắn muốn xoá menu này?"))
            {
                $this.closest('.row-menu').remove();
            }
        })

        $('#wrap-row-option').on('click', '.btn-remove', function () {
            let $this = $(this);
            if (confirm("Bạn có chắc chắn muốn xoá menu này?"))
            {
                $this.closest('.row-menu').remove();
            }
        })

        $('#wrap-row-menu').on('click', '.btn-move-up' ,function () {
            let $this = $(this);
            let $rowMenu  = $this.closest('.row-menu');
            let $rowMenuBefore = $rowMenu.prev();
            $rowMenu.after($rowMenuBefore);
        })

        $('#wrap-row-option').on('click', '.btn-move-up' ,function () {
            let $this = $(this);
            let $rowMenu  = $this.closest('.row-menu');
            let $rowMenuBefore = $rowMenu.prev();
            $rowMenu.after($rowMenuBefore);
        })

        $('#wrap-row-menu').on('click', '.btn-move-down', function () {
            let $this = $(this);
            let $rowMenu  = $this.closest('.row-menu');
            let $rowMenuBefore = $rowMenu.next();
            $rowMenu.before($rowMenuBefore);
        })

        $('#wrap-row-option').on('click', '.btn-move-down', function () {
            let $this = $(this);
            let $rowMenu  = $this.closest('.row-menu');
            let $rowMenuBefore = $rowMenu.next();
            $rowMenu.before($rowMenuBefore);
        })

        $(".js-money").on('input', function (e) {
            $(this).val(formatCurrency(this.value.replace(/[,VNĐ]/g, '')));
        }).on('keypress', function (e) {
            if (!$.isNumeric(String.fromCharCode(e.which))) e.preventDefault();
        }).on('paste', function (e) {
            var cb = e.originalEvent.clipboardData || window.clipboardData;
            if (!$.isNumeric(cb.getData('text'))) e.preventDefault();
        });

        function formatCurrency(number) {
            let n = number.split('').reverse().join("");
            let n2 = n.replace(/\d\d\d(?!$)/g, "$&,");

            return n2.split('').reverse().join('');
        }
    })
</script>
