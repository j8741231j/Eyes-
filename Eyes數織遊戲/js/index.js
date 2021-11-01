// 播放背景音樂

var bgmPlay = false;
var bgm = [];
setInterval(
    function () {

        if (bgmPlay == false) {

            document.getElementById("bgm0").play();
            bgm[0] = 1;
            bgmPlay = true;
        }
    }, 0.5);



//新增 上題目表格
var tab = document.getElementById('topTab');
for (var i = 0; i < 3; i++) {
    var tr = document.createElement("tr");
    tr.setAttribute("class", "toptr");
    tr.setAttribute("id", "toptr" + i);
    for (var j = 0; j < 10; j++) {
        var td = document.createElement("td");
        td.setAttribute("class", "toptd");
        var temp = i * 10 + j;
        td.setAttribute("id", "toptd" + temp);
        td.innerHTML = " ";
        tr.appendChild(td);
    }
    tab.appendChild(tr);
}

//新增 左題目表格
var tab = document.getElementById('leftTab');
for (var i = 0; i < 10; i++) {
    var tr = document.createElement("tr");
    tr.setAttribute("class", "lefttr");
    tr.setAttribute("id", "lefttr" + i);
    for (var j = 0; j < 3; j++) {
        var td = document.createElement("td");
        td.setAttribute("class", "lefttd");
        var temp = i * 10 + j;
        td.setAttribute("id", "lefttd" + temp);
        td.innerHTML = " ";
        tr.appendChild(td);
    }
    tab.appendChild(tr);
}
// 新增 最後一關額外的左題目表格
var tab = document.getElementById('leftTab2');
for (var i = 0; i < 10; i++) {
    var tr = document.createElement("tr");
    tr.setAttribute("class", "lefttr");
    tr.setAttribute("id", "lefttr" + i);
    for (var j = 0; j < 1; j++) {
        var td = document.createElement("td");
        td.setAttribute("class", "extra_lefttd");
        var temp = i * 10 + j;
        td.setAttribute("id", "extra_lefttd" + temp);
        td.innerHTML = " ";
        tr.appendChild(td);
    }
    tab.appendChild(tr);
}

//新增 遊戲表格
var tab = document.getElementById('tab');
for (var i = 0; i < 10; i++) {
    var tr = document.createElement("tr");
    tr.setAttribute("class", "gametr");
    tr.setAttribute("id", "gametr" + i);
    for (var j = 0; j < 10; j++) {
        var td = document.createElement("td");
        td.setAttribute("class", "gametd");
        var temp = i * 10 + j;
        td.setAttribute("id", "gametd" + temp);
        td.innerHTML = " ";
        tr.appendChild(td);
        if (j == 4) {
            td.style.borderRightColor = "black";
            td.style.borderRightWidth = "3.25px";
        }
        if (i == 4) {
            td.style.borderBottomColor = "black";
            td.style.borderBottomWidth = "3.25px";
        }
    }
    tab.appendChild(tr);
}

// 獲取遊戲表格權限
var getTd = [];
for (var k = 0; k < 100; k++) {
    getTd[k] = document.getElementById('gametd' + k);
    getTd[k].setAttribute("onmousedown", "Check1(" + k + ")");
    getTd[k].setAttribute("onmousemove", "Check2(" + k + ")");
}

//監控滑鼠是否按下
var mode = 0;
//監控滑鼠是否移動中
var moving = 0;


var body = document.getElementsByTagName('body')[0];
body.setAttribute("onmouseup", 'Check3()');


// 算分數
// var score = [];
var fullMarks = 100;
//幾條命
var life = 4;

// 特例 第7關贏時
var lv7win=0;
// 勝利
function Win() {

    document.getElementById('btnNext').style.opacity = "1";
    document.getElementById('btnNext').disabled = false;
if(level==9){
    lv7win=1;
}

    level += 1;

    // 保險起見滑鼠強制放開
    mode = 0;
    // alert("Victory");

}
//失敗
function Loss() {
    $('table').removeClass('tableShow');
    document.getElementById('btnRestart').style.opacity = "1";
    document.getElementById('btnRestart').disabled = false;
    // 讓表格不可以再監聽滑鼠事件
    for (var k = 0; k < 100; k++) {
        getTd[k].setAttribute("onmousedown", "");
    }
    $("table").css("opacity", "0.5");
    if (level == 10)
        $("#leftTab2 ").css("opacity", "0.5");
    // 保險起見滑鼠強制放開
    mode = 0;
    // alert("Defeat");
}

function Turn() {
    document.getElementById("divTurnLevel").style.opacity = "1";
    document.getElementById("divTurnLevel").style.zIndex = "3";
    stopBGM();
    setTimeout(function () { Continue(); }, 1200);
    if (level > 5)
        $("#divMain").css("background-image", ' url("./img/divMain2.PNG")');
    else
        $("#divMain").css("background-image", ' url("./img/divMain.PNG")');


}

function Continue() {
    document.getElementById("transition").play();
    Clear();

}

// 畫面重製
function Clear() {

    document.getElementById("divTurnLevel").style.opacity = "0";
    document.getElementById("divTurnLevel").style.zIndex = "0";
    $('table').addClass('tableShow');

    life = 4;
    $(".Heart").css("opacity", "1");
    // score = [];
    for (var k = 0; k < 100; k++) {
        getTd[k].style.backgroundImage = "url('./img/correct.png')";
        getTd[k].style.backgroundSize = "0%";
        getTd[k].setAttribute("onmousedown", "Check1(" + k + ")");
    }
    document.getElementById('btnRestart').style.opacity = "0";
    document.getElementById('btnRestart').disabled = true;
    document.getElementById('btnNext').style.opacity = "0";
    document.getElementById('btnNext').disabled = true;
    $("table").css("opacity", "1");
    $("td").css("opacity", "1");
    // 最後一關額外的題目
    if (level != 10) {
        $("#leftTab2 ").css("opacity", "0");
        // $("#leftTab2").animate({ opacity: "0" }, 5000);
    }else if(level == 10){

        $("#leftTab2").css("opacity", "0.5");
    }
    $('td').text("");
    topQuestion = [];
    leftQuestion = [];
    answer = [];
    wrongNum = [];
    switch (level) {
        case 0:
            $('td').text("");
            break;
        case 1:
            Level1();
            break;
        case 2:
            Level2();
            break;
        case 3:
            Level3();
            break;
        case 4:
            Level4();
            break;
        case 5:
        case 11:
            LvGetGift();
            break;
        case 6:
        case 12:
            Last();
            break;
        case 7:
            Level5();
            break;
        case 8:
            Level6();
            break;
        case 9:
            Level7();
            break;
        case 10:
            Level8();
            break;
    }
    for (var i = 0; i < 10; i++) {
        topCSCount[i] = 0;
        leftCSCount[i] = 0;
    }

}

var order = [];

// 滑鼠按一下
function Check1(k) {
    //滑鼠靜止狀態才給觸發按一下模式
    mode = 1;

    if (answer.indexOf(k) != -1) {
        getTd[k].style.backgroundSize = "120%";
        answer.splice(answer.indexOf(k), 1);
        document.getElementById("bingo").play();

        //檢查是否整行列都完成
        Finish(k);

        if (answer.length == 0)
            Win();

    } else {
        if (wrongNum.indexOf(k) != -1 && getTd[k].style.backgroundSize != "120%") {

            getTd[k].style.backgroundImage = "url('./img/wrong.png')";
            getTd[k].style.backgroundSize = "120%";
            wrongNum.splice(wrongNum.indexOf(k), 1);
            document.getElementById("wrong").play();
            life = life - 1;
            DeleteHeart(life);
            if (life == 0)
                Loss();
        }
    }


}
// 滑鼠拖移
function Check2(k) {
    if (mode == 1)
        Check1(k);
}



// 滑鼠放開
function Check3() {
    mode = 0;

}

// 出題目
var topQuestion = [];
var leftQuestion = [];
var answer = [];
var wrongNum = [];
var BG = document.getElementById("divBack");
var gameArea = document.getElementById("divMain");

//扣血
function DeleteHeart(life) {
    switch (life) {
        case 3:
            document.getElementById("picHeart4").style.opacity = 0;
            break;
        case 2:
            document.getElementById("picHeart3").style.opacity = 0;
            break;
        case 1:
            document.getElementById("picHeart2").style.opacity = 0;
            break;
        case 0:
            document.getElementById("picHeart1").style.opacity = 0;
            break;
    }

}
function GoLv1() {
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('./img/MainBG.png')";
    $("#divGetPic").css("opacity", "0");
    $("#divGetPic").css("z-index", "0");
    $("#divLast").css("opacity", "0");
    $("#divLast").css("z-index", "0");

    level = 1;
    Turn();
}
function Level1() {

    console.log("save change");
    document.getElementById("saveNum").value = save;

    level = 1;
    fullMarks = 84;
    answer = [2, 4, 7, 8, 9, 11, 12, 13, 14, 15, 18, 19, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 41, 42, 43, 44, 45, 48, 49];
    for (var j = 51; j < 100; j++)
        answer.push(j);
    topQuestion = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 4, 9, 10, 9, 10, 9, 5, 5, 10, 10];
    leftQuestion = [1, 1, 3, 0, 5, 2, 0, 5, 2, 0, 7, 2, 0, 5, 2, 0, 0, 9, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10];
    getWrongNum_getQuestion();

}
function GoLv2() {
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('./img/MainBG.png')";
    $("#divGetPic").css("opacity", "0");
    $("#divGetPic").css("z-index", "0");
    $("#divLast").css("opacity", "0");
    $("#divLast").css("z-index", "0");
    level = 2;
    Turn();
}
function Level2() {
    if (save < 2) {
        save = 2;
        console.log("save change");
        document.getElementById("saveNum").value = save;
    }
    console.log(save);
    level = 2;

    $("#btnLv2").removeAttr("disabled");
    $("#btnLv2").removeAttr("style");
    fullMarks = 65;
    answer = [
        1, 2, 3, 6, 7, 8,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        22, 23, 24, 25, 26, 27,
        31, 32, 33, 34, 35, 36, 37, 38,
        43, 44, 45, 46,
        52, 53, 55, 56, 57,
        61, 62, 64, 65, 66, 67, 68,
        71, 73, 75, 76, 77, 78,
        81, 82, 84, 85, 86, 87, 88,
        92, 93, 94, 95, 96, 97
    ];
    topQuestion = [0, 2, 4, 6, 4, 0, 0, 0, 2, 0, 0, 1, 2, 1, 1, 0, 0, 4, 1, 0, 1, 3, 2, 1, 2, 9, 10, 5, 3, 1];
    leftQuestion = [0, 3, 3, 0, 0, 10, 0, 0, 6, 0, 0, 8, 0, 0, 4, 0, 2, 3, 0, 2, 5, 1, 1, 4, 0, 2, 5, 0, 0, 6];
    getWrongNum_getQuestion();

}
function GoLv3() {
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('./img/MainBG.png')";
    $("#divGetPic").css("opacity", "0");
    $("#divGetPic").css("z-index", "0");
    $("#divLast").css("opacity", "0");
    $("#divLast").css("z-index", "0");
    level = 3;
    Turn();
}
function Level3() {
    if (save < 3) {
        save = 3;
        console.log("save change");
        document.getElementById("saveNum").value = save;
    }
    console.log(save);
    level = 3;

    $("#btnLv3").removeAttr("disabled");
    $("#btnLv3").removeAttr("style");

    fullMarks = 66;
    answer = [
        1, 2, 3, 4, 5, 6, 7, 8,
        10, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
        41, 42, 43, 44, 45, 46, 47, 48,
        51, 52, 53, 54, 55, 56, 57, 58,
        63, 64, 65, 66,
        74, 75,
        84, 85,
        91, 92, 93, 94, 95, 96, 97, 98
    ];
    topQuestion = [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 4, 4, 5, 1, 0, 7, 6, 6, 0, 3, 1, 1, 1, 8, 10, 1, 1, 1, 3];
    leftQuestion = [0, 0, 8, 0, 1, 5, 0, 0, 10, 0, 0, 10, 0, 0, 8, 0, 0, 8, 0, 0, 4, 0, 0, 2, 0, 0, 2, 0, 0, 8];
    getWrongNum_getQuestion();

}
function GoLv4() {
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('./img/MainBG.png')";
    $("#divGetPic").css("opacity", "0");
    $("#divGetPic").css("z-index", "0");
    $("#divLast").css("opacity", "0");
    $("#divLast").css("z-index", "0");
    level = 4;
    Turn();
}
function Level4() {
    if (save < 4) {
        save = 4;
        console.log("save change");
        document.getElementById("saveNum").value = save;
    }
    console.log(save);
    $('td').text("");
    level = 4;

    console.log(save);
    $("#btnLv4").removeAttr("disabled");
    $("#btnLv4").removeAttr("style");
    fullMarks = 66;
    answer = [
        1, 2, 3, 10, 11, 12, 13, 22, 25, 26, 27, 28, 31, 32, 34, 35, 36, 37, 38, 39, 79, 81, 82, 83, 84, 85, 89, 93, 94
    ];
    for (var j = 41; j < 77; j++)
        answer.push(j);
    topQuestion = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 2, 0, 0, 0, 0, 0, 0, 3, 6, 9, 6, 7, 7, 6, 5, 5, 6];
    leftQuestion = [0, 0, 3, 0, 0, 4, 0, 1, 4, 0, 2, 6, 0, 0, 9, 0, 0, 10, 0, 0, 10, 0, 7, 1, 0, 5, 1, 0, 0, 2];
    getWrongNum_getQuestion();

}

// 生成題目程序
var getTop = [];
var getLeft = [];

// 獲取地雷區與題目
function getWrongNum_getQuestion() {
    //找地雷區
    for (var i = 0; i < 100; i++) {
        if (answer.indexOf(i) == -1)
            wrongNum.push(i);
    }
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('./img/MainBG.png')";
    gameArea.style.opacity = "1";
    gameArea.style.zIndex = "2";
    // 獲取上題目表格權限
    // var getTop = [];
    for (var k = 0; k < 30; k++) {
        getTop[k] = document.getElementById('toptd' + k);
        if (topQuestion[k] != 0)
            getTop[k].innerText = topQuestion[k];
    }
    //獲取左題目表格權限
    // var getLeft = [];
    for (var k = 0; k < 30; k++) {
        var temp1 = parseInt(k / 3) * 10 + k % 3
        getLeft[k] = document.getElementById('lefttd' + temp1);
        if (leftQuestion[k] != 0)
            getLeft[k].innerText = leftQuestion[k];
    }
    stopBGM();
    selectBGM();

}

// 存檔(控制Start會到哪一關)
var level = 0;
var save = parseInt(document.getElementById("saveNum").value);
//剛登入時 哪需關卡是開放的
console.log("現在的save:" + save);
if (save < 5) {
    for (var i = 1; i <= save; i++) {
        $("#btnLv" + i).removeAttr("disabled");
        $("#btnLv" + i).removeAttr("style");
    }
}
else if (save >= 5 && save < 7) {
    for (var i = 1; i <= 4; i++) {
        $("#btnLv" + i).removeAttr("disabled");
        $("#btnLv" + i).removeAttr("style");
    }
} else if (save >= 7) {
    for (var i = 1; i <= save - 2; i++) {
        $("#btnLv" + i).removeAttr("disabled");
        $("#btnLv" + i).removeAttr("style");
    }
}


if (save >= 6) {
    $('#Gallery1').css({ 'background-image': 'url(./img/flor.png)' });
    $('#Gallery2').css({ 'background-image': '' });
}
else if (save >= 12)
    $('#Gallery2').css({ 'background-image': 'url(./img/lumen.jpg)' });
function GameStart() {

    switch (save) {
        case 1:
            Level1();
            break;
        case 2:
            Level2();
            break;
        case 3:
            Level3();
            break;
        case 4:
        case 5:
            Level4();
            break;
        case 6:
        case 7:
            $("#divMain").css("background-image", ' url("./img/divMain2.PNG")');
            Level5();
            break;
        case 8:
            $("#divMain").css("background-image", ' url("./img/divMain2.PNG")');
            Level6();
            break;
        case 9:
            $("#divMain").css("background-image", ' url("./img/divMain2.PNG")');
            Level7();
            break;
        case 10:
        case 11:
        case 12:
            $("#divMain").css("background-image", ' url("./img/divMain2.PNG")');
            Level8();
            break;

    }
}



//加入背景音樂
function stopBGM() {
    if (level != 6 && level != 12) {
        for (var i = 0; i < 10; i++) {

            if (bgm[i] == 1) {
                document.getElementById("bgm" + i).pause();

                bgm[i] = 0;
            }
        }
    }

}

function selectBGM() {
    setTimeout(function () {
        if (level < 5 && level > 0) {
            document.getElementById("bgm" + level).play();
            bgm[level] = 1;
        }
        else if (level < 11 && level > 6) {
            var a = level - 6;
            document.getElementById("bgm" + a).play();
            bgm[a] = 1;
        }
        else {
            document.getElementById("bgm0").play();
            bgm[0] = 1;
        }
    }, 1500);


}



// 做完一行就補上叉叉
var topCSCount = [];
var leftCSCount = [];
for (var i = 0; i < 10; i++) {
    topCSCount[i] = 0;
    leftCSCount[i] = 0;
}


//檢查行列是否完成
function Finish(k) {
    leftCSCount[parseInt(k / 10)] += 1;
    var i = parseInt(k / 10);
    if (level == 10) {
        console.log("彌補了");
        leftQuestion[6] = 3;
        leftQuestion[9] = 4;
        leftQuestion[12] = 3;
    }
    if (leftCSCount[i] == leftQuestion[i * 3] + leftQuestion[i * 3 + 1] + leftQuestion[i * 3 + 2]) {

        for (var m = i * 10; m < i * 10 + 10; m++) {
            if (getTd[m].style.backgroundSize != "120%") {
                getTd[m].style.backgroundImage = "url('./img/wrong.png')";
                getTd[m].style.backgroundSize = "120%";
            }
        }
        getLeft[i * 3].style.opacity = 0.5;
        getLeft[i * 3 + 1].style.opacity = 0.5;
        getLeft[i * 3 + 2].style.opacity = 0.5;
        if (level == 10)
            document.getElementById("extra_lefttd" + (i * 10)).style.opacity = 0.5;

    }

    topCSCount[k % 10] += 1;
    var j = k % 10;
    if (topCSCount[j] == topQuestion[j] + topQuestion[j + 10] + topQuestion[j + 20]) {

        for (var n = j; n < j + 100; n += 10) {
            if (getTd[n].style.backgroundSize != "120%") {
                getTd[n].style.backgroundImage = "url('./img/wrong.png')";
                getTd[n].style.backgroundSize = "120%";
            }
        }
        getTop[j].style.opacity = 0.5;
        getTop[j + 10].style.opacity = 0.5;
        getTop[j + 20].style.opacity = 0.5;

    }
}

//感謝狀頁面
var last = document.getElementById("divLast");

function Last() {
    $("#divGetPic").css("opacity", "0");
    $("#divGetPic").css("z-index", "0");
    //第一大關最後
    if (level <= 6) {

        $("#divLast").css("background-image", ' url("./img/last.PNG")');
        if (save < 6) {
            save = 6;
            console.log("save change");
            document.getElementById("saveNum").value = save;
        }
        console.log(save);
        level = 6;
        gameArea.style.opacity = "0";
        gameArea.style.zIndex = "0";

        last.style.opacity = "1";
        $("#p1").css("height", "10%");

        last.style.zIndex = "5";
        console.log("進Last");
        $("#btnLv5").removeAttr("disabled");
        $("#btnLv5").removeAttr("style");

    }
    //第二大關最後
    else if (level <= 12) {
        $("#divLast").css("background-image", ' url("./img/last2.PNG")');
        if (save < 12) {
            save = 12;
            console.log("save change");
            document.getElementById("saveNum").value = save;
        }
        console.log(save);
        level = 12;
        gameArea.style.opacity = "0";
        gameArea.style.zIndex = "0";

        last.style.opacity = "1";
        $("#p1").css("height", "10%");
        last.style.zIndex = "5";

    }

}

//回首頁
function Esc() {
    level = 0;
    Clear();
    stopBGM();
    selectBGM();
    last.style.opacity = "0";
    last.style.zIndex = "0";
    gameArea.style.opacity = "0";
    gameArea.style.zIndex = "0";
    BG.style.backgroundImage = "url('./img/MainBG.png')";
    $("#p1").css("height", "2%");


}


//拉出列表按鍵
$(".showorhide1").click(function () {

    $(".divChapter ").toggleClass("show1");
    $(".showorhide1 ").toggleClass("show1-1");
});

$(".showorhide2").click(function () {

    $(".divGallery ").toggleClass("show2");
    $(".showorhide2 ").toggleClass("show2-1");
});

// 領取獎勵區
function LvGetGift() {
    // 第一大關
    if (level <= 5) {
        if (save < 5) {
            save = 5;
            console.log("save change");
            document.getElementById("saveNum").value = save;
        }
        level = 5;
        selectBGM();
        if (document.getElementById("saveNum").value == 5) {
            // 顯示獲獎區
            $("#divGetPic").css("opacity", "1");
            $("#divGetPic").css("z-index", "2");
            // 把遊戲區隱藏
            gameArea.style.opacity = "0";
            gameArea.style.zIndex = "0";
        } else {
            Last();
        }
    }
    // 第二大關
    else if (level <= 11) {
        if (save < 11) {
            save = 11;
            console.log("save change");
            document.getElementById("saveNum").value = save;
        }
        level = 11;
        selectBGM();
        if (document.getElementById("saveNum").value == 11) {
            // 顯示獲獎區
            //因為是第二大關所以背景是Lumen
            $("#divGetPic").css("background-image", ' linear-gradient(rgba(0, 0, 0,0.8 ), rgba(0, 0, 0, 0.8)),url("./img/last2.PNG")');
            $("#divGetPic").css("opacity", "1");
            $("#divGetPic").css("z-index", "2");
            $("#box").attr("src", "./img/close.png");


            $('#btnKey').removeAttr("disabled");
            // 把遊戲區隱藏
            gameArea.style.opacity = "0";
            gameArea.style.zIndex = "0";
        } else {
            Last();
        }
    }






}


//按鑰匙打開寶箱
function openGitBox() {

    $("#box").attr("src", "./img/open.png");

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (level == 5) {
        var img = document.createElement("img");
        img.setAttribute("id", "imgGift");
        img.setAttribute("src", "./img/flor.png");
        img.setAttribute("alt", "獎勵");
        img.setAttribute("ondblclick", "getPic()");
        document.getElementById("divGetPic").appendChild(img);
        $("#imgGift").css("height", "50%");
        $("#imgGift").css("top", "15%");
        $("#imgGift").css("left", "35%");
    }
    else if (level == 11) {
        var img2 = document.createElement("img");
        img2.setAttribute("id", "imgGift2");
        img2.setAttribute("src", "./img/lumen.jpg");
        img2.setAttribute("alt", "獎勵");
        img2.setAttribute("ondblclick", "getPic()");
        document.getElementById("divGetPic").appendChild(img2);
        $("#imgGift2").animate({ top: "15%", height: "50%", left: "35%" }, 500);

        // $("#imgGift2").css("height", "50%");
        // $("#imgGift2").css("top", "15%");
        // $("#imgGift2").css("left", "35%");
    }

    $('#btnKey').attr('disabled', "disabled");
    // $('#btnKey').removeAttr("disabled");


}
// 點兩下圖片 獲取圖片
function getPic() {
    // 第一大關
    if (save == 5) {
        save = 6;
        console.log("save change");
        document.getElementById("saveNum").value = save;
        console.log(save);
        // $("#imgGift").animate({ height: "0%" }, 500);
        $("#imgGift").animate({ top: "5%", left: "180%", height: "2%", opacity: "0", zIndex: "0" }, 300);
        setTimeout(function () { $('#Gallery1').css({ 'background-image': 'url(./img/flor.png)' }); }, 1000);
        setTimeout(function () { $('#Gallery2').css({ 'background-image': '' }); }, 1000);

        setTimeout(function () {
            $("#imgGift").remove();
        }, 2000);
    }
    // 第二大關
    else if (save == 11) {

        save = 12;
        console.log("save change");
        document.getElementById("saveNum").value = save;
        console.log(save);
        // $("#imgGift").animate({ height: "0%" }, 500);
        $("#imgGift2").animate({ top: "5%", left: "180%", height: "2%", opacity: "0", zIndex: "0" }, 300);
        setTimeout(function () { $('#Gallery2').css({ 'background-image': 'url(./img/lumen.jpg)' }); }, 1000);
    }



    level += 1;

    $("#divGetPic").animate({ opacity: "0", zIndex: "0" }, 3000);

    // $("#divGetPic").animate({ zIndex: "0" }, 2000);
    // $("#divGetPic").css("opacity", "0");
    // $("#divGetPic").css("z-index", "0");
    setTimeout(function () { Turn(); }, 700);



}



setInterval(
    function () {
        for (var i = 0; i < 10; i++) {
            var lightPosition = parseInt(Math.random() * 70) + 10;
            $("#light" + i).css("top", lightPosition + "%");
            var lightPosition = parseInt(Math.random() * 70) + 10;
            $("#light" + i).css("left", lightPosition + "%");
        }
    }, 500);






//第二大關
function GoLv5() {
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('./img/MainBG.png')";
    $("#divGetPic").css("opacity", "0");
    $("#divGetPic").css("z-index", "0");
    $("#divLast").css("opacity", "0");
    $("#divLast").css("z-index", "0");

    level = 7;
    Turn();
}
function Level5() {
    console.log("進Level5()");
    if (save < 7) {
        save = 7;
        console.log("save change");
        document.getElementById("saveNum").value = save;
    }
    $("#btnLv5").removeAttr("disabled");
    $("#btnLv5").removeAttr("style");
    level = 7;
    fullMarks = 52;
    answer = [4, 5, 13, 16, 21, 24, 25, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 44, 45, 48,
        50, 51, 52, 54, 55, 57, 58, 59, 60, 61, 62, 64, 65, 67, 68, 69, 70, 71, 72, 74, 75, 77, 78, 79,
        83, 84, 85, 86, 91, 92, 97, 98];
    topQuestion = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 6, 3, 1, 1, 1, 1, 3, 6, 0, 3, 1, 1, 1, 7, 7, 1, 1, 1, 3];
    leftQuestion = [0, 0, 2, 0, 1, 1, 1, 2, 1, 0, 0, 8, 1, 2, 1, 3, 2, 3, 3, 2, 3, 3, 2, 3, 0, 0, 4, 0, 2, 2];
    getWrongNum_getQuestion();

}
function GoLv6() {
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('./img/MainBG.png')";
    $("#divGetPic").css("opacity", "0");
    $("#divGetPic").css("z-index", "0");
    $("#divLast").css("opacity", "0");
    $("#divLast").css("z-index", "0");
    level = 8;
    Turn();
}
function Level6() {
    if (save < 8) {
        save = 8;
        console.log("save change");
        document.getElementById("saveNum").value = save;
    }
    console.log(save);
    level = 8;

    $("#btnLv6").removeAttr("disabled");
    $("#btnLv6").removeAttr("style");
    fullMarks = 55;
    answer = [
        2, 11, 12, 20, 21, 22, 25, 26, 28, 30, 31, 32, 34, 35, 36, 38, 39, 41, 42, 44, 45, 46, 48, 49,
        52, 53, 54, 55, 56, 57, 58, 59, 62, 63, 64, 65, 66, 67, 68, 69, 73, 74, 75, 76, 77, 78, 79,
        83, 84, 87, 88, 93, 94, 97, 98
    ];
    for (var i = 0; i < 20; i++) {
        topQuestion.push(0);
    }
    topQuestion.push(2, 4, 7, 5, 7, 6, 6, 5, 8, 5);
    leftQuestion = [0, 0, 1, 0, 0, 2, 3, 2, 1, 3, 3, 2, 2, 3, 2, 0, 0, 8, 0, 0, 8, 0, 0, 7, 0, 2, 2, 0, 2, 2];
    getWrongNum_getQuestion();

}
function GoLv7() {
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('./img/MainBG.png')";
    $("#divGetPic").css("opacity", "0");
    $("#divGetPic").css("z-index", "0");
    $("#divLast").css("opacity", "0");
    $("#divLast").css("z-index", "0");
    level = 9;
    Turn();
}
function Level7() {
    if (save < 9) {
        save = 9;
        console.log("save change");
        document.getElementById("saveNum").value = save;
    }
    console.log(save);
    level = 9;

    $("#btnLv7").removeAttr("disabled");
    $("#btnLv7").removeAttr("style");

    fullMarks = 55;
    answer = [
        9, 14, 15, 16, 18, 23, 24, 25, 26, 27, 28, 29, 32, 33, 34, 37, 38, 39, 42, 43, 45, 46, 47, 48, 49,
        51, 52, 53, 55, 56, 57, 58, 59, 61, 62, 64, 65, 66, 67, 68, 71, 73, 74, 75, 76, 77,
        80, 81, 82, 83, 84, 85, 90, 91, 92, 93
    ];
    for (var i = 0; i < 12; i++) {
        topQuestion.push(0);
    }
    topQuestion.push(4, 4, 3, 2, 2, 0, 0, 1, 2, 5, 2, 3, 3, 5, 4, 6, 6, 4);
    leftQuestion = [0, 0, 1, 0, 3, 1, 0, 0, 7, 0, 3, 3, 0, 2, 5, 0, 3, 5, 0, 2, 5, 0, 1, 5, 0, 0, 6, 0, 0, 4];
    getWrongNum_getQuestion();

}
function GoLv8() {
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('./img/MainBG.png')";
    $("#divGetPic").css("opacity", "0");
    $("#divGetPic").css("z-index", "0");
    $("#divLast").css("opacity", "0");
    $("#divLast").css("z-index", "0");
    level = 10;
    golv8=1;
    Turn();
}
var golv8=0;
function Level8() {
    
    if (level == 10 && golv8==0 && lv7win==0) {
        console.log("btnRestart可以按");
        $("#leftTab2").animate({ opacity: "0.9" }, 1000);
    }
    else{

        $("#leftTab2 ").css("opacity", "0.9");
        golv8=0;
        lv7win=0;
    }
    
    level = 10;

    if (save < 10) {
        save = 10;
        console.log("save change");
        document.getElementById("saveNum").value = save;
    }
    console.log(save);
    $('td').text("");
    document.getElementById("extra_lefttd20").style.opacity = 1;
    document.getElementById("extra_lefttd30").style.opacity = 1;
    document.getElementById("extra_lefttd40").style.opacity = 1;
    document.getElementById("extra_lefttd20").innerText = "1";
    document.getElementById("extra_lefttd30").innerText = "2";
    document.getElementById("extra_lefttd40").innerText = "1";



    console.log(save);
    $("#btnLv8").removeAttr("disabled");
    $("#btnLv8").removeAttr("style");
    fullMarks = 48;
    answer = [
        4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 20, 23, 24, 26, 29, 30, 31, 33, 34, 36, 38, 39, 41, 43, 44, 46, 48,
        52, 53, 54, 55, 56, 57, 64, 65, 73, 74, 75, 76, 82, 84, 85, 86, 87, 92, 95, 96, 97
    ];
    topQuestion = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 5, 0, 2, 5, 1, 1, 0, 2, 2, 2, 1, 9, 5, 3, 2, 2, 2];
    leftQuestion = [0, 0, 2, 0, 0, 8, 2, 1, 1, 2, 1, 2, 2, 1, 1, 0, 0, 6, 0, 0, 2, 0, 0, 4, 0, 1, 4, 0, 1, 3];
    getWrongNum_getQuestion();

}
