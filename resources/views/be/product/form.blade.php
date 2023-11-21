<form method="POST" action="" autocomplete="off" enctype="multipart/form-data">
    <div class="row">
        <div class="col-sm-8">
            @csrf
            <div class="form-group">
                <label for="exampleInputEmail1">Tên sản phẩm</label>
                <input type="text" name="name" placeholder="Tên sản phẩm" class="form-control" value="{{ old('name', $product->name ?? "") }}">
                @error('name')
                <small id="emailHelp" class="form-text text-danger">{{ $errors->first('name') }}</small>
                @enderror
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Mô tả</label>
                <textarea name="description" class="form-control" id="" cols="30" rows="3">{{ old('description', $product->description ?? "") }}</textarea>
                @error('description')
                <small id="emailHelp" class="form-text text-danger">{{ $errors->first('description') }}</small>
                @enderror
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Cân nặng</label>
                        <input type="number" name="weight" placeholder="10" class="form-control" value="{{ old('weight', $product->weight ?? 0) }}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nguyên liệu</label>
                        <input type="text" name="ingredient" placeholder="10" class="form-control" value="{{ old('ingredient', $product->ingredient ?? "") }}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nguồn gốc</label>
                        <input type="text" name="origin" placeholder="10" class="form-control" value="{{ old('origin', $product->origin ?? "") }}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Tỉnh thành</label>
                        <select name="province_id" class="form-control" id="loadDistrict">
                            <option value="">Chọn tỉnh thành</option>
                            @foreach($provinces ?? [] as $item)
                                <option value="{{ $item->id }}" {{ ($product->province_id ?? 0) == $item->id ? "selected" : "" }}>{{ $item->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Quận huyện</label>
                        <select name="district_id" class="form-control" id="districtsData">
                            <option value="">Chọn quận huyện</option>
                            @foreach($activeDistricts ?? [] as $key =>  $item)
                                <option value="{{ $key }}" selected>{{ $item }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Phường xã</label>
                        <select name="ward_id" class="form-control" id="wardData">
                            <option value="">Chọn phường xã</option>
                            @foreach($activeWard ?? [] as $key =>  $item)
                                <option value="{{ $key }}" selected>{{ $item }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            @if (isset($images) && $images && !$images->isEmpty())
                @foreach($images as $item)
                    <a href="{{ route('get_admin.product.delete_image', $item->id) }}" style="margin-bottom: 10px;display: inline-block">
                        <img src="{{ pare_url_file($item->path) }}" style="width: 100px;height: auto;margin-right: 10px;border: 1px solid #dedede;border-radius: 5px" alt="">
                    </a>
                @endforeach
            @endif
{{--            <div class="form-group">--}}
{{--                <label for="exampleInputEmail1">Album ảnh</label>--}}
{{--                <div class="file-loading">--}}
{{--                    <input id="images" type="file" name="file[]" multiple class="file"--}}
{{--                           data-overwrite-initial="false" data-min-file-count="0">--}}
{{--                </div>--}}
{{--            </div>--}}
            <div id="wrap-row-menu">
                <h5>Giá sỉ</h5>
                @if(isset($productsWholesale) && $productsWholesale && !$productsWholesale->IsEmpty())
                    @foreach($productsWholesale as $key => $item)
                        <div class="row row-menu {{ $key == 0 ? 'row-menu-temple' : '' }}">
                            <div class="col-sm-2">
                                <div class="form-group mlr-10">
                                    <input type="text" class="form-control" name="wholesale[form][]"
                                           value="{{ $item->form }}" placeholder=""/>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group mlr-10">
                                    <input type="text" class="form-control" name="wholesale[to][]"
                                           value="{{ $item->to }}" placeholder=""/>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group mlr-10">
                                    <input type="text" class="form-control" name="wholesale[unit_price][]"
                                           value="price"
                                           placeholder=""/>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group mlr-10">
                                    <input type="text" class="form-control" name="wholesale[price][]"
                                           value="{{ $item->price }}"
                                           placeholder="Permission"/>
                                </div>
                            </div>
                            <div class="col-md-2 action-row-menu {{ $key == 0 ? 'hide' : '' }}">
                                <div class="form-group">
                                    <a href="javascript:void(0)" class="btn btn-sm btn-default btn-remove"><i class="fa fa-trash"></i>  </a>
                                    <a href="javascript:void(0)" class="btn btn-sm btn-default btn-move-up"><i class="fa fa-arrow-up"></i></a>
                                    <a href="javascript:void(0)" class="btn btn-sm btn-default btn-move-down"><i class="fa fa-arrow-down"></i></a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="row row-menu row-menu-temple">
                        <div class="col-sm-2">
                            <div class="form-group mlr-10">
                                <input type="number" class="form-control" name="wholesale[form][]"
                                       value="" placeholder="SL từ"/>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group mlr-10">
                                <input type="number" class="form-control" name="wholesale[to][]"
                                       value=""
                                       placeholder="Đến"/>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group mlr-10">
                                <input type="text" class="form-control" name="wholesale[unit_price][]"
                                       value="price"
                                       placeholder="?param=1&param2=2"/>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group mlr-10">
                                <input type="text" class="form-control" name="wholesale[price][]"
                                       value=""
                                       placeholder="Price"/>
                            </div>
                        </div>
                        <div class="col-md-2 action-row-menu hide">
                            <div class="form-group">
                                <a href="javascript:void(0)" class="btn btn-sm btn-default btn-remove"><i class="fa fa-trash"></i>  </a>
                                <a href="javascript:void(0)" class="btn btn-sm btn-default btn-move-up"><i class="fa fa-arrow-up"></i></a>
                                <a href="javascript:void(0)" class="btn btn-sm btn-default btn-move-down"><i class="fa fa-arrow-down"></i></a>
                            </div>
                        </div>
                    </div>
                @endif
            </div>
            <div class="row">
                <div class="form-group">
                    <a id="copy_menu" class="col-sm-12" href="javascript:void(0)"><i class="fa fa-plus"></i> Thêm menu</a>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Lưu dữ liệu</button>
        </div>
        <div class="col-sm-4">
            <div class="form-group">
                <label for="exampleInputEmail1">Danh mục</label>
                <select name="category_id" class="form-control">
                    <option value="">Chọn danh mục</option>
                    @foreach($categories ?? [] as $item)
                        <option value="{{ $item->id }}" {{ ($product->category_id ?? 0) == $item->id ? "selected" : "" }}>{{ $item->name }}</option>
                    @endforeach
                </select>
                @error('category_id')
                    <small id="emailHelp" class="form-text text-danger">{{ $errors->first('category_id') }}</small>
                @enderror
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Trạng thái</label>
                <select name="status" id="" class="form-control">
                    @foreach($status ?? [] as $key => $item)
                        <option value="{{ $key }}" {{ ($product->status ?? 0) == $key ? "selected" : "" }}>{{ $item['name'] }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Giá</label>
                <input type="text" name="price" placeholder="0" class="form-control js-money" value="{{ old('price', number_format(($product->price ?? 0),0,',')) }}">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Đơn vị</label>
                <input type="text" name="unit" placeholder="0" class="form-control" value="{{ old('unit', $product->unit ?? 'Chiếc') }}">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Số lượng</label>
                <input type="text" name="quantity_available" placeholder="0" class="form-control" value="{{ old('quantity_available', $product->quantity_available ?? 0) }}">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Hạn sử dụng</label>
                <input type="date" name="exp_date" placeholder="0" class="form-control" required value="{{ old('exp_date', $product->exp_date ?? "") }}">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Hình ảnh</label>
                <input type="file" class="form-control" name="avatar">
                @if (isset($product->image_url) && $product->image_url)
                    <img src="{{ pare_url_file($product->image_url) }}" style="width: 60px;height: 60px; border-radius: 10px; margin-top: 10px" alt="">
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
