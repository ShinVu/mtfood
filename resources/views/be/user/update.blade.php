@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h2>Cập nhật</h2>
            <a href="{{ route('get_admin.user.index') }}">Trở về</a>
        </div>
        <div class="row">
            <div class="col-md-12">
                @include('be.user.form')
            </div>
        </div>
    </div>
@stop
