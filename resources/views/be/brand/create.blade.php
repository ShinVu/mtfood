@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h2>Thêm mới</h2>
            <a href="{{ route('get_admin.brand.index') }}">Trở về</a>
        </div>
        <div class="row">
            <div class="col-md-8">
                @include('be.brand.form')
            </div>
        </div>
    </div>
@stop
