<html>

<head>
    <meta charset="utf-8" />
    <link rel="icon" href="./img/icon.png" type="image/ico" />
    <title>~⊙更新中⊙~></title>
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
        session_start();
        // echo $_SESSION['userName'];
        ?>


    <!-- 玩家的使用者名稱為:<?php echo $_SESSION['userName']; ?><br>
    要更新的遊戲進度為:<?php echo $_POST['gameProgress']; ?><br> -->




    <?php
    $gameProgress=$_POST['gameProgress'];
    $userName=$_SESSION['userName'];
    // 建立MySQL的資料庫連接 
    $link = mysqli_connect(
        "localhost",
        "root",
        "",
        "user"
    )
        or die("無法開啟MySQL資料庫連接!<br/>");
    // echo "資料庫user開啟成功!<br/>";


    
        $sql = "UPDATE user SET game_progress='$gameProgress' WHERE username ='$userName'"; // 指定SQL字串
        // echo "SQL字串: $sql <br/>";
        //送出UTF8編碼的MySQL指令
        mysqli_query($link, 'SET NAMES utf8');
        mysqli_query($link, $sql);
    
        $sql = "SELECT  name , game_progress  from  `user` where username = '$userName'";
        //執行上述的sql程式
        $result = mysqli_query($link, $sql);
        while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {
            // printf("名子: %s<br>", $row[0]);
            $_SESSION['name'] = $row[0];
            // printf("遊戲進度為: %s<br>", $row[1]);
            $_SESSION['game_progress'] = $row[1];
        }
        header("refresh:0;url=index.php");









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