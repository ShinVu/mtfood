@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h2>Thông tin phiếu nhập</h2>
            <a href="{{ route('get_admin.inventory.index') }}">Trở về</a>
        </div>
        <div class="row">
            <div class="col-md-12">
                @include('be.inventory.detail')
            </div>
        </div>
    </div>
@stop

