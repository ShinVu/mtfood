<form method="POST" action="" autocomplete="off" enctype="multipart/form-data">
    @csrf
    <div class="form-group">
        <label for="exampleInputEmail1">Tên danh mục</label>
        <input type="text" name="category_name" placeholder="Tên danh mục" class="form-control" value="{{ old('category_name', $category->category_name ?? "") }}">
        @error('category_name')
            <small id="emailHelp" class="form-text text-danger">{{ $errors->first('category_name') }}</small>
        @enderror

    </div>
    <div class="form-group">
        <label for="exampleInputEmail1">Mô tả</label>
        <textarea name="category_description" class="form-control" id="" cols="30" rows="3">{{ old('category_description', $category->category_description ?? "") }}</textarea>
        @error('category_description')
        <small id="emailHelp" class="form-text text-danger">{{ $errors->first('category_description') }}</small>
        @enderror
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Hình ảnh</label>
        <input type="file" class="form-control" name="avatar">
        @if (isset($category->avatar) && $category->category_image)
            <img src="{{ pare_url_file($category->category_image) }}" style="width: 60px;height: 60px; border-radius: 10px; margin-top: 10px" alt="">
        @endif
    </div>
    <button type="submit" class="btn btn-primary">Lưu dữ liệu</button>
</form>
