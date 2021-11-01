<html>

<head>
    <meta charset="utf-8" />
    <link rel="icon" href="./img/icon.png" type="image/ico" />
    <title>~⊙登入訊息⊙~></title>
    <!-- 引入CSS檔 -->
    <style>
        body {
            width: 100%;
            height: 100%;
            background-image: url("./img/mainBG.png");
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
            font-family: 'serif';
            font-weight: bold;
            padding-top: 3%;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.8);
        }
    </style>
</head>

<body>

    <div>
        <p id="pInformation">登入成功<br>
            <a href="./index.php">【自動跳轉至遊戲頁面】</a>
        </p>
    </div>


    <!-- 您輸入的帳號為:<?php echo $_POST['username']; ?><br>
    您輸入的密碼為:<?php echo $_POST['password']; ?><br> -->

    <?php

    $username = $_POST['username']; //post獲取表單裡的name
    $password = $_POST['password']; //post獲取表單裡的password
    // 建立MySQL的資料庫連接 
    $link = mysqli_connect(
        "localhost",
        "root",
        "",
        "user"
    )
        or die("無法開啟MySQL資料庫連接!<br/>");
    // echo "資料庫user開啟成功!<br/>";


    $sql = "SELECT *  from  `user` where username = '$username' and password='$password'";
    //執行上述的sql程式
    $result = mysqli_query($link, $sql);
    //數結果有幾行
    $count = mysqli_num_rows($result);
    //只要大於0行 代表已存在
    if ($count > 0) {


        session_start();
       

        $_SESSION['userName'] = $username;
        // echo $_SESSION['userName'];
        // echo '<br>';


        $sql = "SELECT  name , game_progress  from  `user` where username = '$username' and password='$password'";
        //執行上述的sql程式
        $result = mysqli_query($link, $sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
            // printf("名子: %s<br>", $row[0]);
            $_SESSION['name'] = $row[0];
            // printf("遊戲進度為: %s<br>", $row[1]);
            $_SESSION['game_progress'] = $row[1];
        }




        header("refresh:0;url=index.php"); //如果成功跳轉至完整版遊戲頁面
        exit;
    } else {
        // echo "使用者名稱或密碼錯誤";
        echo "
        <script>
        var pText=document.getElementsByTagName('p');
        var str='使用者名稱或密碼錯誤<br>【3秒後跳轉至登入頁面】';
        pText[0].innerHTML=str;
        
        setTimeout(function(){window.location.href='login.html';},3000);
        </script>
        "; //如果錯誤使用js 3秒後跳轉到登入頁面重試;
    }

    mysqli_close($link);  // 關閉資料庫連接
    ?>

</body>

</html>