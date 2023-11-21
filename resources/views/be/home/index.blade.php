@extends('be.layouts.app_be')
@section('content')
    <div class="main-content">
{{--        <div class="d-flex justify-content-between align-items-center">--}}
{{--            --}}
{{--        </div>--}}
        <div class="row">
            <div class="col-sm-8">
                <figure class="highcharts-figure">
                    <div id="container"></div>
                    <p class="highcharts-description">
                        Biểu đồ đánh giá doanh số ....
                    </p>
                </figure>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-sm-6 mb-4">
                        <h6 class="text-center">Tổng số sản phẩm</h6>
                        <div class="text-center">
                            <p style="width: 120px;height: 120px;border-radius: 50%;background-color: #f2f2f2;display: flex;justify-content: center;align-items: center;margin: 0 auto">
                                <span style="color: #000">{{ $totalProduct ?? 0 }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-6 mb-4">
                        <h6 class="text-center">Số đơn hàng</h6>
                        <div class="text-center">
                            <p style="width: 120px;height: 120px;border-radius: 50%;background-color: #f2f2f2;display: flex;justify-content: center;align-items: center;margin: 0 auto">
                                <span style="color: #000">{{ $totalOrders ?? 0 }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <h6 class="text-center">Số lượng chat</h6>
                        <div class="text-center">
                            <p style="width: 120px;height: 120px;border-radius: 50%;background-color: #f2f2f2;display: flex;justify-content: center;align-items: center;margin: 0 auto">
                                <span style="color: #000">{{ $totalChat ?? 0 }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <h6 class="text-center">Số khách hàng</h6>
                        <div class="text-center">
                            <p style="width: 120px;height: 120px;border-radius: 50%;background-color: #f2f2f2;display: flex;justify-content: center;align-items: center;margin: 0 auto">
                                <span style="color: #000">{{ $totalUser ?? 0  }}</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
@stop

@section('script')
    <link rel="stylesheet" href="https://code.highcharts.com/css/highcharts.css">
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script>
        Highcharts.chart('container', {

            title: {
                text: 'Doanh thu'
            },

            xAxis: {
                tickInterval: 1,
                type: 'logarithmic',
                accessibility: {
                    rangeDescription: 'Range: 1 to 10'
                }
            },

            yAxis: {
                type: 'logarithmic',
                minorTickInterval: 0.1,
                accessibility: {
                    rangeDescription: 'Range: 0.1 to 1000'
                }
            },

            tooltip: {
                headerFormat: '<b>{series.name}</b><br />',
                pointFormat: 'x = {point.x}, y = {point.y}'
            },

            series: [{
                data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
                pointStart: 1
            }]
        });
    </script>
@stop
