@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý đơn hàng</h4>
        </div>
        <div>
{{--            <form class="form-inline">--}}
{{--                <div class="form-group mb-2 mr-2">--}}
{{--                    <label for="inputPassword2" class="sr-only">Tên</label>--}}
{{--                    <input type="text" name="n" class="form-control" value="{{ Request::get('n') }}" placeholder="Điện thoại ip">--}}
{{--                </div>--}}

{{--                <div class="form-group mb-2 mr-2">--}}
{{--                    <label for="inputPassword2" class="sr-only">Trạng thái</label>--}}
{{--                    <select name="status" id="" class="form-control">--}}
{{--                        <option value="">---</option>--}}
{{--                    </select>--}}
{{--                </div>--}}
{{--                <button type="submit" class="btn btn-primary mb-2">Find</button>--}}
{{--            </form>--}}
            <ul class="lists-status-order">
                <li>
                    <a href="" class="badge badge-danger">Chờ xác nhận</a>
                </li>
                <li>
                    <a href="" class="badge badge-light">Chờ lấy hàng</a>
                </li>
                <li>
                    <a href="" class="badge badge-light">Đang giao hàng</a>
                </li>
                <li>
                    <a href="" class="badge badge-light">Đã giao hàng</a>
                </li>
                <li>
                    <a href="" class="badge badge-light">Đơn sự cố</a>
                </li>
            </ul>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th style="width: 50px">STT</th>
                    <th>Mã VĐ</th>
                    <th>Thông tin</th>
                    <th>Nội dung</th>
                    <th>Cod</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                    @for($i = 1 ; $i <= 10 ; $i ++)
                        <tr>
                            <td style="text-align: center"><a href="">{{ $i }}</a></td>
                            <td>
                                <span>VDOO{{ $i }}</span>
                            </td>
                            <td>
                                <span>Yến Nhi</span> <br>
                                <span>0909.233.445</span> <br>
                                <span>Ba Đình - Hà Nội</span>
                            </td>
                            <td>
                                <span>1 Gà khô</span> <br>
                                <span>1 kho gà</span>
                            </td>
                            <td>
                                <span>20.450.000 đ</span>
                            </td>
                            <td>
                                <span class="badge badge badge-light">Khởi tạo</span>
                            </td>
                            <td>
                                <a href="">Huỷ</a>
                                <a href="javascript:;void(0)">|</a>
                                <a href="">Cập nhật</a>
                                <a href="javascript:;void(0)">|</a>
                                <a href="">In HĐ</a>
                            </td>
                        </tr>
                    @endfor
                </tbody>
            </table>
        </div>
    </div>
@stop
