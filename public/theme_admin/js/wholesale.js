function showOrderTable(ob){
    let html = `<div class="table-responsive" style="overflow: hidden;">
                <table class="table table-hover table-action">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tên hàng</th>
                            <th>Số lượng</th>
                            <th>Số lượng giao</th>
                            <th>Số lượng chưa giao</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    for(let i = 0; i < ob.data.length; i++){
        html += `
                        <tr>
                            <td><img src="modules/product/uploads/` + ob.data[i].image + `" class="product_image" alt="image"></td>
                            <td>` + ob.data[i].name + `</td>
                            <td>` + ob.data[i].quantity + `</td>
                            <td>` + ob.data[i].val + `</td>
                            <td>` + (ob.data[i].quantity - ob.data[i].val) + `</td>
                        </tr>
        `;
    }
    html += `
                        <tr>
                            <td colspan="3" style="padding:5px;">Số tiền đã thanh toán</td>
                            <td colspan="2" style="padding:5px;">` + ob.val + `</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="padding:5px;">Số tiền còn lại</td>
                            <td colspan="2" style="padding:5px;">` + (ob.total - ob.val) + `</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    `;
    return html;
}

function showSuccessToast() {
    toast({
        title: "Success",
        message: "Cập nhật thành công",
        type: "success",
        duration: 0,
    });
}
function showInfoToast() {
    toast({
        title: "Info",
        message: "Tính năng tạm thời đang phát triển",
        type: "info",
        duration: 0,
    });
}
function showErrorToast() {
    toast({
        title: "Error",
        message: "Không thể thực thi yêu cầu",
        type: "error",
        duration: 0,
    });
}

function itemCount(id, arr){
    let count = 0;
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].data.length;j++){
            if(arr[i].data[j].id == id){
                count += arr[i].data[j].quantity;
            }
        }
    }
    return count;
}

function showProductExists(mainArr, arr){
    let html = "";
    let flag = false;
    let count = 0;
    if(arr.length == 0){
        // --
    }else{
        for(let i=0;i<mainArr.length;i++){
            html += `<div class="checkout__title d-flex align-center space-between">
                        <span>` + mainArr[i].name + `: </span> <span>Số lượng: ` + (mainArr[i].quantity - itemCount(mainArr[i].id, arr)) + `</span>
                    </div>`;
            if((mainArr[i].quantity - itemCount(mainArr[i].id, arr)) == 0){
                count++;
                if(mainArr.length == 1) flag = true;
                else if(count == mainArr.length && !flag) flag = false;
                else flag = true;
            }
        }
    }

    $('.productInfo').html(html);
    console.log(flag);
    return flag;
}

function showSelectProductAll(){
    let html = `<div style="width:100%">
                    <label class="info__title" for="">Chọn sản phẩm:</label>
                    <select name="productAll" id="productAll" class="info__input flex-1 productAll" required>`;
        html +=         '<option value="">Chưa xác định</option>';

    for(i=0;i<items.length; i++){
        html +=         '<option quantity="' + items[i].quantity + '" value="' + items[i].id + '">' + items[i].name + '</option>';
    }

    html +=         `</select>
                </div>
                <div style="width:100%">
                    <label class="info__title" for="">Số lượng:</label>
                    <input class="flex-1 quantity mt-sm" name="quantity" type="number" style="width: 312px;" required>
                <div>`;
    html +=     `<div style="width:100%">
                    <a target="_blank" onclick="addProductSubOrder()" class="btn btn-outline-dark btn-fw mg-l-16 mt-sm">Thêm sản phẩm</a>
                </div>`;
    $('.productAdd').html(html);
    //$('.productAll').chosen();
}

var itemsSubOrder = [];

function addProductSubOrder(){
    let id = $('.productAll').find(":selected").val();
    let quantity = $('.quantity').val();
    let flag = false;

    let current = (id) => {
        for(let i=0; i<itemsSubOrder.length;i++){
            if(parseInt(id) == itemsSubOrder[i].id) return i;
        }
        return -1;
    };
    for(let i=0; i<items.length;i++){
        if((items[i].id == parseInt(id)) && (parseInt(items[i].quantity) >=
                    ((parseInt(quantity) + ((current(id)==-1)?0:itemsSubOrder[current(id)].quantity))) + itemCount(items[i].id, items_child))){
            flag = true;
            if(current(id)==-1)
                itemsSubOrder.push({
                    id: items[i].id,
                    image: items[i].image,
                    quantity: parseInt(quantity),
                    name: items[i].name,
                    price:  items[i].price,
                    ck: items[i].ck/items[i].quantity * parseInt(quantity)
                });
            else{
                itemsSubOrder[current(id)].quantity += parseInt(quantity);
                itemsSubOrder[current(id)].ck += items[i].ck/items[i].quantity * parseInt(quantity);
            }

            break;
        }
    }
    if(flag){
        let html = "";
        for(i=0; i<itemsSubOrder.length;i++){
            html += `<div class="checkout__item d-flex align-center">
                        <div class="checkout__image p-relative">
                            <div class="product-quantity align-center d-flex justify-center p-absolute"><span class="quantity-number">` + itemsSubOrder[i].quantity + `</span></div>
                            <img class="w-100 d-block object-fit-cover ratio-1" src="modules/product/uploads/` + itemsSubOrder[i].image + `" alt="">
                        </div>
                        <div class="checkout__name flex-1">
                            <h3 class="checkout__name">` + itemsSubOrder[i].name + `</h3>
                        </div>
                        <div class="checkout__price">` + itemsSubOrder[i].price + `</div>
                    </div>`;
        }
        if(html != ""){
            $('.productsSubOrder').html(html + `
                <div class="checkout__item d-flex align-center">
                    <form action="modules/wholesale/processSubOrder.php" method="POST">
                        <input type="hidden" id="jsonData" name="jsonData">
                        <input type="hidden" id="parent_id" name="parent_id" value="{{ $order->order_code }}">
                        <button type="submit" value="Submit" name="tachdon" class="btn btn-outline-dark btn-fw mg-l-16">Tách đơn</button>
                    </form>
                </div>
            `);
            $('#jsonData').val(JSON.stringify(itemsSubOrder))
        }
    }else
        showErrorToast();
}

//activeSubOrder
if(!activeSubOrder){
    $('.addSubOrder').css('display', 'none');
    $('#btComplete').css('display', 'none');
}else{
    showSelectProductAll();
    if(showProductExists(items, items_child)){
        $('.addSubOrder').css('display', 'none');
    }else{
        $('#btComplete').css('display', 'none');
    }
}

if(orderTable != {}){
    $('#orderTable').html(showOrderTable(orderTable));
}