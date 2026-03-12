const form = document.getElementById("form");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm");
const terms = document.getElementById("terms");

const successBox = document.getElementById("success");


// ===== UTIL =====
function showError(id,msg){
    document.getElementById(id+"Error").textContent = msg;
}

function clearError(id){
    document.getElementById(id+"Error").textContent = "";
}


// ===== VALIDATE =====

// Họ tên
function validateFullname(){
    const regex = /^[A-Za-zÀ-ỹ\s]+$/;

    if(fullname.value.trim().length < 3){
        showError("fullname","Ít nhất 3 ký tự");
        return false;
    }

    if(!regex.test(fullname.value)){
        showError("fullname","Chỉ chứa chữ cái và khoảng trắng");
        return false;
    }

    clearError("fullname");
    return true;
}

// Email
function validateEmail(){
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(email.value)){
        showError("email","Email không hợp lệ");
        return false;
    }

    clearError("email");
    return true;
}

// Phone
function validatePhone(){
    const regex=/^0\d{9}$/;

    if(!regex.test(phone.value)){
        showError("phone","SĐT gồm 10 số và bắt đầu bằng 0");
        return false;
    }

    clearError("phone");
    return true;
}

// Password
function validatePassword(){
    const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(!regex.test(password.value)){
        showError("password",
            "≥8 ký tự, có chữ hoa, chữ thường, số");
        return false;
    }

    clearError("password");
    return true;
}

// Confirm
function validateConfirm(){
    if(confirmPass.value !== password.value){
        showError("confirm","Mật khẩu không khớp");
        return false;
    }

    clearError("confirm");
    return true;
}

// Gender
function validateGender(){
    const gender =
        document.querySelector('input[name="gender"]:checked');

    if(!gender){
        showError("gender","Chọn giới tính");
        return false;
    }

    clearError("gender");
    return true;
}

// Terms
function validateTerms(){
    if(!terms.checked){
        showError("terms","Bạn phải đồng ý điều khoản");
        return false;
    }

    clearError("terms");
    return true;
}


// ===== REALTIME BLUR =====
fullname.addEventListener("blur",validateFullname);
email.addEventListener("blur",validateEmail);
phone.addEventListener("blur",validatePhone);
password.addEventListener("blur",validatePassword);
confirmPass.addEventListener("blur",validateConfirm);


// ===== CLEAR ERROR WHEN INPUT =====
["fullname","email","phone","password","confirm"]
.forEach(id=>{
    document.getElementById(id)
        .addEventListener("input",()=>clearError(id));
});


// ===== SUBMIT =====
form.addEventListener("submit",function(e){

    e.preventDefault();

    const valid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirm() &
        validateGender() &
        validateTerms();

    if(valid){
        form.style.display="none";
        successBox.innerHTML =
            `Đăng ký thành công! 🎉<br>
             Xin chào <b>${fullname.value}</b>`;
    }
});