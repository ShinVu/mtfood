<form method="POST" action="" autocomplete="off" enctype="multipart/form-data">
    <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <div class="card-content">
                    <div class="receipt">
                        @php
                            $total_amount = $inventory['total_amount'];
                        @endphp
                            <div class="receipt__header text-center">
                                <h3 class="receipt__title">Phiếu Nhập Kho</h3>
                                <p>Mã phiếu : <?php echo $inventory['inventory_code'] ?></p>
                                <p class="receipt__date">Ngày nhập: <?php echo $inventory['inventory_date'] ?></p>
                            </div>
                            <div class="receipt__info">
                                <table>
                                    <tr>
                                        <td>
                                            <p class="receipt__info--name">Người nhập kho: <input class="receipt__info--input" name="staf_name" value="<?php echo $inventory['staf_name'] ?>" type="text" placeholder="tên người nhập" required></p>
                                        </td>
                                        <td>
                                            <p class="receipt__info--company">Tên đơn vị cung cấp: <input class="receipt__info--input" name="supplier_name" value="<?php echo $inventory['supplier_name'] ?>" type="text" placeholder="tên đơn vị cung cấp" required></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="receipt__info--note">Ghi chú: <input class="receipt__info--input" name="inventory_note" value="<?php echo $inventory['inventory_note'] ?>" type="text" placeholder="Lý do nhập kho" required></p>
                                        </td>
                                        <td>
                                            <p class="receipt__info--company">Số điện thoại: <input class="receipt__info--input" name="inventory_phone" value="<?php echo $inventory['supplier_phone'] ?>" type="text"></p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        <div class="table-responsive receipt__table" style="margin-top: 20px;">
                            <table class="table table-hover table-action">
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>Tên sản phẩm</th>
                                        <th class="text-center">Số lượng</th>
                                        <th class="text-right">Đơn giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @php
                                        $i = 0;
                                    @endphp
                                    @foreach ($inventory_detail as $row)
                                        @php
                                        $i++;
                                        @endphp
                                        <tr>
                                            <td>
                                                <?php echo $i ?>
                                            </td>
                                            <td><?php echo $row['product_name'] ?></td>
                                            <td class="text-center"><?php echo $row['product_quantity'] ?></td>
                                            <td class="text-right"><?php echo number_format($row['product_price_import']) . '₫' ?></td>
                                        </tr>
                                    @endforeach
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>

                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td class="text-right"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div class="w-100 text-right">
                            <p>Tổng tiền: <?php echo number_format((float) $total_amount) . '₫' ?></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="{{ route('get_admin.inventory.print', $inventory['inventory_id']) }}" target="_blank" class="btn btn-outline-dark btn-fw mt-xl"> <i class="icon-printer"></i> In Hóa Đơn</a>
    </div>

    </div>
</form>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<link href="{{asset('theme_admin/css/customize.css') }}" rel="stylesheet">



<style>
    .bordernone{
        border: none;
    }
</style>
