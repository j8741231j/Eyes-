// 播放背景音樂
var bgmPlay = false;
var bgm = [];
setInterval(
    function() {
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

//全場監控滑鼠放開事件
var body = document.getElementsByTagName('body')[0];
body.setAttribute("onmouseup", 'Check3()');


// 算分數
var fullMarks = 100;
//幾條命
var life = 4;
// 勝利
function Win() {
    document.getElementById('btnNext').style.opacity = "1";
    document.getElementById('btnNext').disabled = false;
    level = 2;
    // 保險起見滑鼠強制放開
    mode = 0;
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
    // 保險起見滑鼠強制放開
    mode = 0;
    // alert("Defeat");
}

function Turn() {
    document.getElementById("divTurnLevel").style.opacity = "1";
    document.getElementById("divTurnLevel").style.zIndex = "3";
    stopBGM();
    setTimeout(function() { Continue(); }, 1500);

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
        getTd[k].style.backgroundImage = "url('../Eyes/img/correct.png')";
        getTd[k].style.backgroundSize = "0%";
        getTd[k].setAttribute("onmousedown", "Check1(" + k + ")");
    }
    document.getElementById('btnRestart').style.opacity = "0";
    document.getElementById('btnRestart').disabled = true;
    document.getElementById('btnNext').style.opacity = "0";
    document.getElementById('btnNext').disabled = true;
    $("table").css("opacity", "1");
    $("td").css("opacity", "1");
    $('td').text("");
    topQuestion = [];
    leftQuestion = [];
    answer = [];
    wrongNum = [];
    switch (level) {
        case 1:
            Level1();
            break;
        default:
            Last();
    }
    for (var i = 0; i < 10; i++) {
        topCSCount[i] = 0;
        leftCSCount[i] = 0;
    }
}

// var order = [];

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
        if (wrongNum.indexOf(k) != -1) {

            getTd[k].style.backgroundImage = "url('../Eyes/img/wrong.png')";
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

function Level1() {
    level = 1;

    fullMarks = 84;
    answer = [2, 4, 7, 8, 9, 11, 12, 13, 14, 15, 18, 19, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 41, 42, 43, 44, 45, 48, 49];
    for (var j = 51; j < 100; j++)
        answer.push(j);
    topQuestion = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 4, 9, 10, 9, 10, 9, 5, 5, 10, 10];
    leftQuestion = [1, 1, 3, 0, 5, 2, 0, 5, 2, 0, 7, 2, 0, 5, 2, 0, 0, 9, 0, 0, 10, 0, 0, 10, 0, 0, 10, 0, 0, 10];
    getWrongNum_getQuestion();

}

// function Level2() {
//     level = 2;

//     fullMarks = 65;
//     answer = [
//         1, 2, 3, 6, 7, 8,
//         10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
//         22, 23, 24, 25, 26, 27,
//         31, 32, 33, 34, 35, 36, 37, 38,
//         43, 44, 45, 46,
//         52, 53, 55, 56, 57,
//         61, 62, 64, 65, 66, 67, 68,
//         71, 73, 75, 76, 77, 78,
//         81, 82, 84, 85, 86, 87, 88,
//         92, 93, 94, 95, 96, 97
//     ];
//     topQuestion = [0, 2, 4, 6, 4, 0, 0, 0, 2, 0, 0, 1, 2, 1, 1, 0, 0, 4, 1, 0, 1, 3, 2, 1, 2, 9, 10, 5, 3, 1];
//     leftQuestion = [0, 3, 3, 0, 0, 10, 0, 0, 6, 0, 0, 8, 0, 0, 4, 0, 2, 3, 0, 2, 5, 1, 1, 4, 0, 2, 5, 0, 0, 6];
//     getWrongNum_getQuestion();

// }

// function Level3() {
//     level = 3;
//     fullMarks = 66;
//     answer = [
//         1, 2, 3, 4, 5, 6, 7, 8,
//         10, 15, 16, 17, 18, 19,
//         20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
//         30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
//         41, 42, 43, 44, 45, 46, 47, 48,
//         51, 52, 53, 54, 55, 56, 57, 58,
//         63, 64, 65, 66,
//         74, 75,
//         84, 85,
//         91, 92, 93, 94, 95, 96, 97, 98
//     ];
//     topQuestion = [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 4, 4, 5, 1, 0, 7, 6, 6, 0, 3, 1, 1, 1, 8, 10, 1, 1, 1, 3];
//     leftQuestion = [0, 0, 8, 0, 1, 5, 0, 0, 10, 0, 0, 10, 0, 0, 8, 0, 0, 8, 0, 0, 4, 0, 0, 2, 0, 0, 2, 0, 0, 8];
//     getWrongNum_getQuestion();

// }

// function Level4() {
//     level = 4;
//     fullMarks = 66;
//     answer = [
//         1, 2, 3, 10, 11, 12, 13, 22, 25, 26, 27, 28, 31, 32, 34, 35, 36, 37, 38, 39, 79, 81, 82, 83, 84, 85, 89, 93, 94
//     ];
//     for (var j = 41; j < 77; j++)
//         answer.push(j);
//     topQuestion = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 2, 0, 0, 0, 0, 0, 0, 3, 6, 9, 6, 7, 7, 6, 5, 5, 6];
//     leftQuestion = [0, 0, 3, 0, 0, 4, 0, 1, 4, 0, 2, 6, 0, 0, 9, 0, 0, 10, 0, 0, 10, 0, 7, 1, 0, 5, 1, 0, 0, 2];
//     getWrongNum_getQuestion();

// }

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
    BG.style.backgroundImage = "linear-gradient(rgba(0, 0, 0,0.5 ), rgba(0, 0, 0, 0.5)), url('../Eyes/img/mainBG.png')";
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
// var save = 1;
var btnStart = document.getElementById('btnStart');
btnStart.setAttribute("onclick", "Level1()");
// switch (save) {
//     case 1:
//         btnStart.setAttribute("onclick", "Level1()");
//         break;
    // case 2:
    //     btnStart.setAttribute("onclick", "Level2()");
    //     break;
    // case 3:
    //     btnStart.setAttribute("onclick", "Level3()");
    //     break;
    // case 4:
    //     btnStart.setAttribute("onclick", "Level4()");
    //     break;
//}

//加入背景音樂
function stopBGM() {
    for (var i = 0; i < 2; i++) {
        
        if (bgm[i] == 1) {
            document.getElementById("bgm" + i).pause();
            bgm[i] = 0;
        }
    }
}

function selectBGM() {
    document.getElementById("bgm" + level).play();
    bgm[level] = 1;

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
    if (leftCSCount[i] == leftQuestion[i * 3] + leftQuestion[i * 3 + 1] + leftQuestion[i * 3 + 2]) {

        for (var m = i * 10; m < i * 10 + 10; m++) {
            if (getTd[m].style.backgroundSize != "120%") {
                getTd[m].style.backgroundImage = "url('../Eyes/img/wrong.png')";
                getTd[m].style.backgroundSize = "120%";
            }
        }
        getLeft[i * 3].style.opacity = 0.5;
        getLeft[i * 3 + 1].style.opacity = 0.5;
        getLeft[i * 3 + 2].style.opacity = 0.5;

    }

    topCSCount[k % 10] += 1;
    var j = k % 10;
    if (topCSCount[j] == topQuestion[j] + topQuestion[j + 10] + topQuestion[j + 20]) {

        for (var n = j; n < j + 100; n += 10) {
            if (getTd[n].style.backgroundSize != "120%") {
                getTd[n].style.backgroundImage = "url('../Eyes/img/wrong.png')";
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
    gameArea.style.opacity = "0";
    gameArea.style.zIndex = "0";
    level = 5;
    last.style.opacity = "1";
    $("#p1").css("height", "9%");
    setTimeout(function(){ $("#p1").html("Thank you for playing<br>Join a member to enjoy a complete game<br>2021 / 05 / 18");},1500);
    
    
    last.style.zIndex = "5";
}

//回首頁
function Esc() {
    console.log("跳出");
    level = 0;
    stopBGM();
    selectBGM();
    Clear();
    last.style.opacity = "0";
    last.style.zIndex = "0";
    gameArea.style.opacity = "0";
    gameArea.style.zIndex = "0";
    BG.style.backgroundImage = "url('./img/mainBG.png')";
    $("#p1").css("height", "2%");


}