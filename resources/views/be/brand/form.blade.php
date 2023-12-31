<form method="POST" action="" autocomplete="off" enctype="multipart/form-data">
    @csrf
    <div class="form-group">
        <label for="exampleInputEmail1">Nguồn gốc sản phẩm</label>
        <input type="text" name="brand_name" placeholder="Nguồn gốc" class="form-control" value="{{ old('brand_name', $brand->brand_name ?? "") }}">
        @error('brand_name')
            <small id="emailHelp" class="form-text text-danger">{{ $errors->first('brand_name') }}</small>
        @enderror

    </div>
    <button type="submit" class="btn btn-primary">Lưu dữ liệu</button>
</form>
