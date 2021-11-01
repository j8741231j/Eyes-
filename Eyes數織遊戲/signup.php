<html>

<head>
    <meta charset="utf-8" />
    <link rel="icon" href="./img/icons.png" type="image/ico" />
    <title>~⊙註冊帳號⊙~></title>
    <!-- 引入CSS檔 -->
    <style>
        body {
            width: 100%;
            height: 100%;
            background-image: url("./img/RegBG.png");
            position: fixed;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            top: 0px;
            left: 0px;
        }


        div {
            background-color: wheat;
            width: 40%;
            height: 97%;
            margin-left: 30%;
            /* background-image: linear-gradient(rgba(255, 255, 255,0.8 ), rgba(0, 0, 0, 0.5)),url("./img/divRegister.jpg"); */
            background-image: url("./img/divRegister.jpg");
            position: fixed;
            background-size: cover;
            background-position: right 50%;
            background-repeat: no-repeat;
            top: 5px;
            box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.8);
            border-radius: 10px;
            border: 4px solid black;
        }

        p {
            
            background-color: rgba(255, 255, 255, 0.7);
            width: 55%;
            height: 10%;
            position: absolute;
            top: 48%;
            left: 22%;
            text-align: center;
            font-family: 'Brush Script MT';
            font-weight: bold;
            padding-top: 3%;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.8);
        }
    </style>
</head>

<body>

    <div>
        <p id="pInformation">註冊成功<br>
        <a href="./login.html">【按此回登入頁面】</a>
    </p>
    </div>



    <!-- 您輸入的帳號為:<?php echo $_POST['username']; ?><br>
    您輸入的密碼為:<?php echo $_POST['password']; ?><br>
    您輸入的姓名為:<?php echo $_POST['name']; ?><br>
    您輸入的信箱為:<?php echo $_POST['email']; ?><br>
    您輸入的手機為:<?php echo $_POST['phone']; ?><br> -->




    <?php

    $username = $_POST['username']; //post獲取表單裡的name
    $password = $_POST['password']; //post獲取表單裡的password
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    // 建立MySQL的資料庫連接 
    $link = mysqli_connect(
        "localhost",
        "root",
        "",
        "user"
    )
        or die("無法開啟MySQL資料庫連接!<br/>");
    // echo "資料庫user開啟成功!<br/>";


    $sql = "SELECT *  from  `user` where `username` = '$username'";
    //執行上述的sql程式
    $result = mysqli_query($link, $sql);
    //數結果有幾行
    $count = mysqli_num_rows($result);
    //只要大於0行 代表已存在
    if ($count > 0) {
        echo "
        <script>
        var pText=document.getElementsByTagName('p');
        var str='此帳號已註冊過<br>【3秒後跳轉至註冊頁面】';
        pText[0].innerHTML=str;
        
        setTimeout(function(){window.location.href='signup.html';},3000);
        </script>
        ";
    } else {
        // echo "帳號不存在!";
        $sql = "INSERT INTO `user`(`id`,`username`, `password`, `name`, `email`, `phone`)
 VALUES (null,'$username','$password','$name','$email','$phone')"; // 指定SQL字串
        // echo "SQL字串: $sql <br/>";
        //送出UTF8編碼的MySQL指令
        mysqli_query($link, 'SET NAMES utf8');
        mysqli_query($link, $sql);
    }











    // if (!$link) {
    //     echo "MySQL資料庫連接錯誤!<br/>";
    //     exit();
    // } else {
    //     echo "MySQL資料庫test連接成功!<br/>";
    // }
    mysqli_close($link);  // 關閉資料庫連接
    ?>
</body>

</html>