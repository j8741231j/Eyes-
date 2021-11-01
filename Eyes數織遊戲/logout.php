<html>

<head>
    <meta charset="utf-8" />
    <link rel="icon" href="./img/icon.png" type="image/ico" />
    <title>~⊙登出中⊙~></title>
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
<?php 
// Logout: echo $_POST['Logout']; 
session_start();
unset($_SESSION['userName']);
header("refresh:0;url=index.php"); //登出成功跳轉至完整版遊戲頁面再等index.php自己導到登入頁面
        exit;

?>


    
</body>

</html>