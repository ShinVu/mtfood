@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4>Quản lý nhóm quyền</h4>
        </div>
        <div>
            <form class="form-inline">
                <a href="" class="btn btn-primary mb-2 mr-2">Thêm mới</a>
{{--                <div class="form-group mb-2 mr-2">--}}
{{--                    <label for="inputPassword2" class="sr-only">Danh mục</label>--}}
{{--                    <select name="status" id="" class="form-control">--}}
{{--                        <option value="">Danh mục</option>--}}
{{--                    </select>--}}
{{--                </div>--}}
                <div class="form-group mb-2 mr-2" style="width: 400px">
                    <input type="text" name="n" style="width: 100%" class="form-control" value="{{ Request::get('n') }}" placeholder="">
                </div>
            </form>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th style="width: 50px;text-align: center">ID</th>
                    <th>Tên</th>
                    <th>Permission</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @for($i = 1 ; $i <= 10 ; $i ++)
                    <tr>
                        <td class="text-center">
                            <span>{{ $i }}</span>
                        </td>
                        <td>
                            <span>Supper Admin</span>
                        </td>
                        <td>
                            <span class="badge badge-primary">Full</span>
                        </td>
                        <td>
                            <a href="">Cập nhật</a>
                            <a href="javascript:;void(0)">|</a>
                            <a href="">Xoá</a>
                        </td>
                    </tr>
                @endfor
                </tbody>
            </table>
        </div>
    </div>
@stop
