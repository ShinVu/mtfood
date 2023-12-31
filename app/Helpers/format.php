<?php


function getOrderShipFee($data){
    $shopInfo = getShopInfoGHN();
    $GHN_API = env('GHN_API');
    $GHN_TOKEN = env('GHN_TOKEN');
    $url = $GHN_API.'/shiip/public-api/v2/shipping-order/fee';
    $headers = [
        'token: '.$GHN_TOKEN,
        'Content-Type: application/json',
        'ShopId: '.$shopInfo['_id']
    ];


    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    $shopOrder_json = curl_exec($ch);
    curl_close($ch);
    $shopOrder_json = json_decode($shopOrder_json, true);


    // print_r($shopOrder_json);
    // throw new Exception(123);

    return $shopOrder_json;
}

function createOrderGHN($data){
    $shopInfo = getShopInfoGHN();

    $data->from_name = $shopInfo['name'];
    $data->from_phone = $shopInfo['phone'];
    $data->from_address = $shopInfo['address'];
    $data->from_ward_name = env('GHN_ward_name');
    $data->from_district_name = env('GHN_district_name');
    $data->from_province_name = env('GHN_province_name');

    $GHN_API = env('GHN_API');
    $GHN_TOKEN = env('GHN_TOKEN');

    $url = $GHN_API.'/shiip/public-api/v2/shipping-order/create';
    $headers = [
        'token: '.$GHN_TOKEN,
        'Content-Type: application/json',
        'ShopId: '.$shopInfo['_id']
    ];


    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    $shopOrder_json = curl_exec($ch);
    curl_close($ch);
    $shopOrder_json = json_decode($shopOrder_json, true);
    //   print_r($shopOrder_json);
    // throw new Exception(123);
    return $shopOrder_json;
}

function getShopInfoGHN(){
    $GHN_API = env('GHN_API');
    $GHN_TOKEN = env('GHN_TOKEN');
    $GHN_SHOPID = env('GHN_SHOPID');

    $url = $GHN_API.'/shiip/public-api/v2/shop/all';

    $headers = [
        'token: '.$GHN_TOKEN
    ];
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $shopInfo_json = curl_exec($ch);
    //$err = curl_error($ch);
    curl_close($ch);
    $shopInfo=json_decode($shopInfo_json, true);
    $shopInfo = $shopInfo['data']['shops'];

    $flag = false;

    foreach($shopInfo as $shop){
        if($shop['_id'] == $GHN_SHOPID){
          $flag = true;
          $shopInfo = $shop;
          break;
        }
    }

    if(!$flag) throw new Exception('khong tim thay cua hang tai GHN');

    return $shopInfo;
}

function format_order_type($value)
{
    $text = '';
    if ($value == 1) {
        echo "Thanh toán khi nhận hàng (COD)";
    } elseif ($value == 2) {
        echo "Thanh toán MOMO QR CODE";
    } elseif ($value == 3) {
        echo "Thanh toán chuyển khoản MoMo";
    } elseif ($value == 4) {
        echo "Thanh toán chuyển khoản VNPAY";
    } elseif ($value == 5) {
        echo "Mua hàng trực tiếp";
    }
    echo $text;
}

function format_GHNorder_status($value){
    if($value == null) return 'N/A';


    $GHN_API = env('GHN_API');
    $GHN_TOKEN = env('GHN_TOKEN');
    $GHN_SHOPID = env('GHN_SHOPID');
    $GHN_CLIENTID = env('GHN_CLIENTID');

    $url = $GHN_API.'/shiip/public-api/v2/shipping-order/detail';
    $headers = [
        'token: '.$GHN_TOKEN,
        'Content-Type: application/json'
    ];

    $data = new stdClass();
    $data->order_code = $value;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    $shopOrder_json = curl_exec($ch);
    curl_close($ch);
    $shopOrder_json=json_decode($shopOrder_json, true);
    $shopOrder_json = $shopOrder_json['data'];

    switch($shopOrder_json['status']){
        case 'ready_to_pick': return 'GHN - Chờ lấy hàng';
        case 'picking': return 'GHN - Đang lấy hàng';
        case 'Đang tương tác với người gửi': return 'GHN - money_collect_picking';
        case 'Lấy hàng thành công': return 'GHN - picked';
        case 'Nhập kho': return 'GHN - storing';
        case 'Đang trung chuyển': return 'GHN - transporting';
        case 'Đang phân loại': return 'GHN - sorting';
        case 'Đang giao hàng': return 'GHN - delivering';
        case 'Giao hàng thành công': return 'GHN - delivered';
        case 'Đang tương tác với người nhận': return 'GHN - money_collect_delivering';
        case 'Giao hàng không thành công': return 'GHN - delivery_fail';
        case 'Chờ xác nhận giao lại': return 'GHN - waiting_to_return';
        case 'Chuyển hoàn': return 'GHN - return';
        case 'Đang trung chuyển hàng hoàn': return 'GHN - return_transporting';
        case 'Đang phân loại hàng hoàn': return 'GHN - return_sorting';
        case 'Đang hoàn hàng': return 'GHN - returning';
        case 'Hoàn hàng không thành công': return 'GHN - return_fail';
        case 'Chờ hoàn tất': return 'GHN - waiting_to_finish';
        case 'Hoàn tất': return 'GHN - finish';
        case 'Hoàn hàng thành công': return 'GHN - returned';
        case 'Đơn huỷ': return 'GHN - cancel';
        case 'Hàng ngoại lệ': return 'GHN - exception';
        case 'Hàng thất lạc': return 'GHN - lost';
        case 'Hàng hư hỏng': return 'GHN - damage';
        default: return 'GHN - Không rõ mã code GHN trả về';
    }
    return 'GHN - Không rõ mã code trả về';
}

function format_order_status($value)
{
    $text = '';
    if ($value == -1) {
        $text = 'Đơn hàng đã hủy';
    } elseif ($value == 0) {
        $text = 'Đang xử lý';
    } elseif ($value == 1) {
        $text = 'Đang chuẩn bị';
    } elseif ($value == 2) {
        $text = 'Đang giao hàng';
    } elseif ($value == 3) {
        $text = 'Đã giao hàng';
    } elseif ($value == 4) {
        $text = 'Đơn hàng hoàn trả';
    }  else {
        $text = 'Đã hoàn thành';
    }
    echo $text;
}

function format_collection_type($value)
{
    $text = '';
    if ($value == 0) {
        $text = 'Tùy chọn sản phẩm';
    } else {
        $text = 'Sắp xếp theo từ khóa';
    }
    echo $text;
}

function format_account_type($value)
{
    $text = '';
    if ($value == 0) {
        $text = 'Khách hàng';
    } elseif ($value == 1) {
        $text = 'Nhân viên';
    }
    else {
        $text = 'Quản trị viên';
    }
    echo $text;
}

function format_account_status($value)
{
    $text = '';
    if ($value == -1) {
        $text = 'Tạm khóa';
    } else {
        $text = 'Đang hoạt động';
    }
    echo $text;
}


function format_article_status($value)
{
    $text = '';
    if ($value == 0) {
        $text = 'Bản nháp';
    } else {
        $text = 'Xuất bản';
    }
    echo $text;
}

function format_comment_status($value)
{
    $text = '';
    if ($value == 0) {
        $text = 'Cần phê duyệt';
    } else {
        $text = 'Đã phê duệt';
    }
    echo $text;
}

function format_gender($value)
{
    $text = '';
    if ($value == 1) {
        $text = 'Nam';
    } elseif ($value == 2) {
        $text = 'Nữ';
    } else {
        $text = 'Chưa xác định';
    }
    echo $text;
}

//fomat date time
function format_datetime($value)
{
    $timestamp = strtotime($value);
    $date = new DateTime();
    $date->setTimestamp($timestamp);

    $formattedDate = $date->format('Y-m-d H:i:s');
    echo $formattedDate;
}

// format
function format_status_style($value) {
    $class = '';
    if ($value == -1) {
        $class = 'color-bg-red';
    } elseif ($value == 0) {
        $class = 'color-bg-orange';
    } elseif ($value == 1) {
        $class = 'color-bg-yellow';
    } elseif ($value == 2) {
        $class = 'color-bg-blue';
    } else {
        $class = 'color-bg-green';
    }
    echo $class;
}

function format_quantity_style($value) {
    $class = '';
    if ($value < 5) {
        $class = 'color-t-red';
    }
    echo $class;
}

function format_evaluate_status($value)
{
    $text = '';
    if ($value == -1) {
        $text = 'Tiêu cực';
    } else {
        $text = 'Tích cực';
    }
    echo $text;
}

function format_evaluate_style($value)
{
    $class = '';
    if ($value == -1) {
        $class = 'color-bg-red';
    } else {
        $class = 'color-bg-green';
    }
    echo $class;
}

function format_question1_type($value)
{
    $text = '';
    if ($value == 0) {
        $text = 'Chưa';
    } elseif ($value == 1) {
        $text = 'Có';
    }
    else {
        $text = 'sai dữ liệu';
    }
    echo $text;
}

function format_question2_type($value)
{
    $text = '';
    if ($value == 0) {
        $text = 'Không chọn';
    } elseif ($value == 1) {
        $text = 'Công ty';
    } elseif ($value == 2) {
        $text = 'Hộ kinh doanh';
    }  elseif ($value == 3) {
        $text = 'Cá nhân';
    }
    else {
        $text = 'sai dữ liệu';
    }
    echo $text;
}

function format_question3_type($value)
{
    $text = '';
    if ($value == 0) {
        $text = 'Không chọn';
    } elseif ($value == 1) {
        $text = 'Phân phối';
    } elseif ($value == 2) {
        $text = 'Bán lẻ';
    }
    else {
        $text = 'sai dữ liệu';
    }
    echo $text;
}

function format_wholesale_price($value){
    if($value >= 10 && $value <= 29) return 1;
    elseif($value >= 30 && $value <= 59) return 2;
    elseif($value >= 60 && $value <= 99) return 3;
    elseif($value >= 100) return 4;
    else return 0;
}

function addChild($ob, $id, $val){
    for($i=0; $i < count($ob->data); $i++){
        if($ob->data[$i]->id == $id){
            $ob->data[$i]->val += $val;
        }
    }
}

function returnChild($ob, $id){
    for($i=0; $i < count($ob->data); $i++){
        if($ob->data[$i]->id == $id){
            return  $ob->data[$i]->val;
        }
    }
    return 0;
}

function VndText($amount)
{
         if($amount <=0)
        {
            return $textnumber="Tiền phải là số nguyên dương lớn hơn số 0";
        }
        $Text=array("không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín");
        $TextLuythua =array("","nghìn", "triệu", "tỷ", "ngàn tỷ", "triệu tỷ", "tỷ tỷ");
        $textnumber = "";
        $length = strlen($amount);
       
        for ($i = 0; $i < $length; $i++)
        $unread[$i] = 0;
       
        for ($i = 0; $i < $length; $i++)
        {              
            $so = substr($amount, $length - $i -1 , 1);               
           
            if ( ($so == 0) && ($i % 3 == 0) && ($unread[$i] == 0)){
                for ($j = $i+1 ; $j < $length ; $j ++)
                {
                    $so1 = substr($amount,$length - $j -1, 1);
                    if ($so1 != 0)
                        break;
                }                      
                      
                if (intval(($j - $i )/3) > 0){
                    for ($k = $i ; $k <intval(($j-$i)/3)*3 + $i; $k++)
                        $unread[$k] =1;
                }
            }
        }
       
        for ($i = 0; $i < $length; $i++)
        {       
            $so = substr($amount,$length - $i -1, 1);      
            if ($unread[$i] ==1)
            continue;
           
            if ( ($i% 3 == 0) && ($i > 0))
            $textnumber = $TextLuythua[$i/3] ." ". $textnumber;    
           
            if ($i % 3 == 2 )
            $textnumber = 'trăm ' . $textnumber;
           
            if ($i % 3 == 1)
            $textnumber = 'mươi ' . $textnumber;
           
           
            $textnumber = $Text[$so] ." ". $textnumber;
        }
       
        //Phai de cac ham replace theo dung thu tu nhu the nay
        $textnumber = str_replace("không mươi", "lẻ", $textnumber);
        $textnumber = str_replace("lẻ không", "", $textnumber);
        $textnumber = str_replace("mươi không", "mươi", $textnumber);
        $textnumber = str_replace("một mươi", "mười", $textnumber);
        $textnumber = str_replace("mươi năm", "mươi lăm", $textnumber);
        $textnumber = str_replace("mươi một", "mươi mốt", $textnumber);
        $textnumber = str_replace("mười năm", "mười lăm", $textnumber);
       
        return ucfirst($textnumber." đồng chẵn");
}
