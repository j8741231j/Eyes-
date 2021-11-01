<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!-- <link rel="icon" href="./img/indexIcon.ico" type="image/x-icon"> -->
    <link rel="icon" href="./img/icon.png" type="image/ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>~⊙艾斯⊙~</title>
    <!-- 引入CSS檔 -->
    <link rel="stylesheet" type="text/css" href="./css/index.css">
    <link rel="stylesheet" type="text/css" href="./css/giftBox.css">
    <!-- 引入JavaScript檔 -->
    <script type="text/javascript" src="./js/index.js" defer></script>
    <script type="text/javascript" src="./js/leaves.js" defer></script>
    <!-- <script type="text/javascript" src="./js/giftBox.js" defer></script> -->
    <script src="./js/jquery-3.4.1.js"></script>
</head>

<body>
    <!-- 主背景 -->
    <div id='divBack'>
        <button id='btnStart' onclick="GameStart()">Start</button><br>
        <button onclick="Win()" style="position: absolute; left:27%">測試</button>
    </div>


    <!-- 遊戲空間 -->
    <div id='divMain'>
        <img class="Heart" id="picHeart1" src="./img/heart.png" alt="剩餘機會">
        <img class="Heart" id="picHeart2" src="./img/heart.png" alt="剩餘機會">
        <img class="Heart" id="picHeart3" src="./img/heart.png" alt="剩餘機會">
        <img class="Heart" id="picHeart4" src="./img/heart.png" alt="剩餘機會">
        <table id='topTab'></table>
        <table id='leftTab'></table>
        
        <table id='tab'></table>
        <button id='btnNext' onclick="Turn()" disabled="disabled">Next</button>
        <button id='btnRestart' onclick="Continue()" disabled="disabled">Restart</button>
        <audio id="bingo" preload="preload" src="./img/bgm/currect.mp3"></audio>
        <audio id="wrong" preload="preload" src="./img/bgm/wrong.mp3"></audio>
        <audio id="transition" preload="preload" src="./img/bgm/turn.mp3"></audio>
        <audio id="bgm0" loop="loop" preload="preload" src="./img/bgm/SometimesSomeone.mp3"></audio>
        <audio id="bgm5" loop="loop" preload="preload" src="./img/bgm/SometimesSomeone.mp3"></audio>
        <audio id="bgm6" loop="loop" preload="preload" src="./img/bgm/SometimesSomeone.mp3"></audio>

        <audio id="bgm1" loop="loop" preload="preload" src="./img/bgm/MistyForest.mp3"></audio>
        <audio id="bgm2" loop="loop" preload="preload" src="./img/bgm/VanillaBubble.mp3"></audio>
        <audio id="bgm3" loop="loop" preload="preload" src="./img/bgm/loveMe.mp3"></audio>
        <audio id="bgm4" loop="loop" preload="preload" src="./img/bgm/pureWhite.mp3"></audio>
        <button id='btnEsc2' onclick="Esc()">Exit</button>
        <table id='leftTab2'></table>


    </div>
    <!-- 過場黑屏 -->
    <div id=divTurnLevel>
    </div>
    <!-- 感謝狀 -->
    <div id='divLast'>
        <p id="p1">Thank you for playing.<br>continue...</p>
        <button id='btnEsc' onclick="Esc()">Exit</button>
    </div>


    <!-- 玩家資料區 -->
    <div id="divUser">
        <?php
        session_start();
        // echo $_SESSION['userName'];
        //判斷有無用戶登入
        if (!isset($_SESSION['userName'])) {
            echo "錯誤執行";
            header("refresh:0;url=login.html"); //如果失敗跳轉至登入頁面
            exit;
        }
        ?>
        <!-- 存檔用表單 -->
        <form action="update.php" method="post">
            Welcome back! <font color="blue">
                <?php echo $_SESSION['name']; ?>
            </font><br>
            Username: <font color="blue"><?php echo $_SESSION['userName']; ?></font><br>
            Game-Progress:
            <input  id="saveNum" type="text" style="width: 20px; color:blue; " name="gameProgress" value=<?php echo $_SESSION['game_progress']; ?>>
            <button id="btnSave" type="submit">Save</button><br>
        </form>
        <!-- 登出用表單 -->
        <form action="logout.php" method="post">
            <!-- 使用者&nbsp;<?php echo $_SESSION['userName']; ?>&nbsp;已登入 -->
            <input id="btnLogout" type="submit" value="Logout" />
            <input type="hidden" name="Logout" value="true" />
        </form>

        <?php
        error_reporting(0);
        if ($_POST['Logout'] == "true") {
            // echo "登出了";
            unset($_SESSION['userName']);
            session_destroy();
            header("Refresh: 0; url=login.html");
            exit;
        }
        ?>



    </div>
    <!-- 章節選擇區 -->
    <div class="divChapter">
        <p id="pFlor">Flor</p>
        <button class='btnLv' id='btnLv1' onclick='GoLv1()'>Level1</button><br>
        <button class='btnLv' id='btnLv2' onclick="GoLv2()" disabled="disabled" style="opacity: 0.5;">Level2</button><br>
        <button class='btnLv' id='btnLv3' onclick="GoLv3()" disabled="disabled" style="opacity: 0.5;">Level3</button><br>
        <button class='btnLv' id='btnLv4' onclick="GoLv4()" disabled="disabled" style="opacity: 0.5;">Level4</button><br>
        <p id="pFlor">Lumen</p>
        <button class='btnLv_2' id='btnLv5' onclick='GoLv5()' disabled="disabled" style="opacity: 0.5;">Level5</button><br>
        <button class='btnLv_2' id='btnLv6' onclick="GoLv6()" disabled="disabled" style="opacity: 0.5;">Level6</button><br>
        <button class='btnLv_2' id='btnLv7' onclick="GoLv7()" disabled="disabled" style="opacity: 0.5;">Level7</button><br>
        <button class='btnLv_2' id='btnLv8' onclick="GoLv8()" disabled="disabled" style="opacity: 0.5;">Level8</button><br>

    </div>
    <div class="showorhide1">Select Level</div>

    <!-- 獲取獎勵頁面 -->
    <div id="divGetPic">
        <img id="box" src="./img/close.png" alt="寶箱">
        <button id="btnKey" onclick="openGitBox()"></button>
        <img class="light" id="light0" src="./img/light2.png" alt="光點">
        <img class="light" id="light1" src="./img/light1.png" alt="光點">
        <img class="light" id="light2" src="./img/light2.png" alt="光點">
        <img class="light" id="light3" src="./img/light1.png" alt="光點">
        <img class="light" id="light4" src="./img/light2.png" alt="光點">
        <img class="light" id="light5" src="./img/light1.png" alt="光點">
        <img class="light" id="light6" src="./img/light2.png" alt="光點">
        <img class="light" id="light7" src="./img/light1.png" alt="光點">
        <img class="light" id="light8" src="./img/light2.png" alt="光點">
        <img class="light" id="light9" src="./img/light1.png" alt="光點">

    </div>

    <!-- 圖庫 -->
    <div class="divGallery">
        <p id="pGallery">Gallery</p>
        <img class="Gallery" id="Gallery1" src="./img/picBox.png" style="width: 50%;" alt="pic1"><br>
        <img class="Gallery" id="Gallery2" src="./img/picBox.png" style="width: 50%; background-image: url(./img/NotOpen.png);" alt="pic2"><br>
        <img class="Gallery" id="Gallery3" src="./img/picBox.png" style="width: 50%;  background-image: url(./img/NotOpen.png);" alt="pic3"><br>
    </div>
    <div class="showorhide2"></div>






</body>

</html>