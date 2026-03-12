const form = document.getElementById("orderForm");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const delivery = document.getElementById("delivery");
const address = document.getElementById("address");
const note = document.getElementById("note");

const noteCount = document.getElementById("noteCount");
const totalBox = document.getElementById("total");
const summary = document.getElementById("summary");
const success = document.getElementById("success");

// ===== GIÁ SẢN PHẨM =====
const prices = {
    phone: 10000000,
    laptop: 20000000,
    headphone: 2000000
};

// ===== UTIL =====
function showError(id,msg){
    document.getElementById(id+"Error").textContent = msg;
}
function clearError(id){
    document.getElementById(id+"Error").textContent="";
}

// ===== VALIDATE =====

function validateProduct(){
    if(product.value===""){
        showError("product","Chọn sản phẩm");
        return false;
    }
    clearError("product");
    return true;
}

function validateQuantity(){
    const q=parseInt(quantity.value);
    if(!Number.isInteger(q)||q<1||q>99){
        showError("quantity","1–99");
        return false;
    }
    clearError("quantity");
    return true;
}

function validateDelivery(){
    const today=new Date();
    const chosen=new Date(delivery.value);

    const max=new Date();
    max.setDate(today.getDate()+30);

    if(!delivery.value){
        showError("delivery","Chọn ngày giao");
        return false;
    }

    if(chosen<today || chosen>max){
        showError("delivery","Trong 30 ngày tới");
        return false;
    }

    clearError("delivery");
    return true;
}

function validateAddress(){
    if(address.value.trim().length<10){
        showError("address","≥10 ký tự");
        return false;
    }
    clearError("address");
    return true;
}

function validateNote(){
    if(note.value.length>200){
        showError("note","Tối đa 200 ký tự");
        return false;
    }
    clearError("note");
    return true;
}

function validatePayment(){
    const pay=document.querySelector('input[name="payment"]:checked');
    if(!pay){
        showError("payment","Chọn phương thức");
        return false;
    }
    clearError("payment");
    return true;
}

// ===== ĐẾM KÝ TỰ =====
note.addEventListener("input",()=>{
    const len=note.value.length;
    noteCount.textContent=`${len}/200`;

    if(len>200){
        noteCount.classList.add("red");
        showError("note","Vượt quá 200 ký tự");
    }else{
        noteCount.classList.remove("red");
        clearError("note");
    }
});

// ===== TÍNH TIỀN =====
function updateTotal(){
    const price=prices[product.value]||0;
    const q=parseInt(quantity.value)||0;
    totalBox.textContent=(price*q).toLocaleString();
}

product.addEventListener("change",updateTotal);
quantity.addEventListener("input",updateTotal);

// ===== BLUR VALIDATION =====
product.addEventListener("blur",validateProduct);
quantity.addEventListener("blur",validateQuantity);
delivery.addEventListener("blur",validateDelivery);
address.addEventListener("blur",validateAddress);

// ===== SUBMIT =====
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const valid =
        validateProduct() &
        validateQuantity() &
        validateDelivery() &
        validateAddress() &
        validateNote() &
        validatePayment();

    if(!valid) return;

    const price=prices[product.value];
    const q=parseInt(quantity.value);
    const total=price*q;

    summary.style.display="block";
    summary.innerHTML=`
        <h3>Xác nhận đặt hàng?</h3>
        Sản phẩm: ${product.options[product.selectedIndex].text}<br>
        Số lượng: ${q}<br>
        Ngày giao: ${delivery.value}<br>
        Tổng tiền: ${total.toLocaleString()} VNĐ<br><br>

        <button id="confirmBtn">Xác nhận</button>
        <button id="cancelBtn">Hủy</button>
    `;

    document.getElementById("confirmBtn").onclick=()=>{
        form.style.display="none";
        summary.style.display="none";
        success.innerHTML="Đặt hàng thành công! 🎉";
    };

    document.getElementById("cancelBtn").onclick=()=>{
        summary.style.display="none";
    };
});