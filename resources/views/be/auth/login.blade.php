<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>CMS - {{ date('Y') }}</title>
    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/dashboard/">
    <!-- Bootstrap core CSS -->
    <link href="{{asset('theme_admin/css/bootstrap.min.css') }}" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="{{asset('theme_admin/css/dashboard.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        .nav-tab-profile .nav-item.active {
            border-bottom:  1px solid #dedede;
        }
        .select2-container--default .select2-selection--single {
            height: 48px !important;
        }
        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 48px !important;
        }
        .select2-container--default .select2-selection--single .select2-selection__arrow {
            height: 48px !important;
        }
        .navbar-brand {
            background-color: initial;
        }
    </style>
</head>
<body>
<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0" style="background-color: #47AD97 !important;">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="" style="display: inline-grid">
        <img style="width: 50px;height: 50px;margin: 0 auto" src="{{ asset('logo.png') }}" alt="">
    </a>
    @if (!get_data_user('web'))
        <div class="collapse navbar-collapse" id="navbarSupportedContent" style="flex-direction: row-reverse">
            <ul class="navbar-nav" >
                <li class="nav-item">
                    <a class="nav-link btn btn-sm btn-primary" style="color: white;padding-left: 10px;padding-right: 10px" href="{{ route('get_admin.login') }}">Đăng nhập</a>
                </li>
            </ul>
        </div>
    @else
    <div class="dropdown" style="margin-right: 10px;">
        <button class="btn dropdown-toggle" style="background: none;color: white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span style="font-size: 16px;">Xin chào</span>
            <img src="" onerror="this.src='https://123code.net/images/preloader.png';" style="width: 40px;height: 40px;border-radius: 50%" alt="">
        </button>
        <div class="dropdown-menu" style="left: unset;right: 10px" aria-labelledby="dropdownMenu2">
            <a href="{{ route('get_admin.home') }}" class="dropdown-item" title="Cập nhật thông tin">Cập nhật thông tin</a>
            <a href="{{ route('get_admin.home') }}" title="Đăng xuất" class="dropdown-item">Đăng xuất</a>
        </div>
    </div>
    @endif
</nav>
<div class="container-fluid" style="background-color: #D9D9D9">
    <div class="row">
        <main role="main" class="col-md-6 offset-3 col-lg-6 pt-3 px-4" style="height: 100vh">
            <div class="main-content">
                <div class="row">
                    <div class="col-md-12">
                        <h3> Login Admin </h3>
                        <form method="POST" action="" autocomplete="off" enctype="multipart/form-data">
                            @csrf
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email</label>
                                        <input type="text" name="email" required placeholder="Email" class="form-control" value="">
                                        @error('email')
                                        <small id="emailHelp" class="form-text text-danger">{{ $errors->first('email') }}</small>
                                        @enderror
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Password</label>
                                        <input type="password" name="password" placeholder="******" required class="form-control" value="">
                                    </div>
                                    <button type="submit" class="btn btn-primary">Lưu dữ liệu</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
<!-- Bootstrap core JavaScript
    ================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
{{--<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>--}}
<script src="https://code.jquery.com/jquery-3.1.1.min.js">
    <script src="{{ asset('theme_admin/js/popper.min.js') }}"></script>
<script src="{{ asset('theme_admin/js/bootstrap.min.js') }}"></script>
<!-- Icons -->
<script src="https://unpkg.com/feather-icons/dist/feather.min.js"></script>
<script>
    feather.replace();
</script>
<!-- Graphs -->
{{--<script src="https://cdn.jsdelivr.net/npm/chart.js@2.7.1/dist/Chart.min.js"></script>--}}
@yield('script')
</body>
</html>
