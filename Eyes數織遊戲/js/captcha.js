// $("#btnSumit").click(function() {
//     if ($("#username").val() == "") {
//         alert("你尚未填寫帳戶名稱");
//         $("#username").focus();
//     } else if ($("#password").val() == "") {
//         alert("你尚未填寫密碼");
//         $("#password").focus();
//     } else if ($("#pwCheck").val() == "") {
//         alert("請確認密碼");
//         $("#pwCheck").focus();
//     } else if ($("#name").val() == "") {
//         alert("你尚未填寫姓名");
//         $("#name").focus();
//     } else if ($("#email").val() == "") {
//         alert("你尚未填寫信箱");
//         $("#email").focus();
//     } else if ($("#phone").val() == "") {
//         alert("你尚未填寫電話");
//         $("#phone").focus();
//     } else {
//         //檢查驗證碼
//         Validate();
//     }
// })

var code=""; //在全域性定義驗證碼

//產生驗證碼
function createCode() {
    code = "";
    var codeLength = 5; //驗證碼的長度
    var checkCode = document.getElementById("btnGetCode");
    var BGindex = Math.floor(Math.random() * 4);
    checkCode.style.backgroundImage = "url('./img/CAPTCHA/codeBG" + BGindex + ".png')";
    var random = new Array( 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //隨機數
    for (var i = 0; i < codeLength; i++) { //迴圈操作
        var index = Math.floor(Math.random() * 30); //取得隨機數的索引（0~35）
        code += random[index]; //根據索引取得隨機數加到code上
    }
    checkCode.value = code; //把code值賦給驗證碼
}
// 校驗驗證碼
document.getElementById("btnSubmit").addEventListener("click", Validate);

function Validate() {
    var inputCode = document.getElementById("CAPTCHA").value.toUpperCase(); //取得輸入的驗證碼並轉化為大寫
    if (inputCode.length <= 0) { //若輸入的驗證碼長度為0
        alert("請輸入驗證碼!"); //則彈出請輸入驗證碼
        $("#CAPTCHA").focus();
    } else if (inputCode != code.toUpperCase()) { //若輸入的驗證碼與產生的驗證碼不一致時
        alert("驗證碼輸入錯誤!"); //則彈出驗證碼輸入錯誤
        createCode(); //重新整理驗證碼
        $("#CAPTCHA").val(""); //清空文字框
        $("#CAPTCHA").focus(); //重新聚焦驗證碼框

    } else { //輸入正確時
        // $("#CAPTCHA").blur(); //繫結驗證碼輸入正確時要做的事
        document.getElementById("formRegister").submit()
    }
};