// .imgLeaves {
//     position: fixed;
// }

function Leaf() {
    this.width = parseInt(Math.random() * 20) + 150;
    this.pos = {
        left: parseInt(Math.random() * (document.documentElement.clientWidth - this.width) + 50),
        top: 0
    }
    this.speed = parseInt(Math.random() * 20) + 70;
    this.fallTime = parseInt(Math.random() * 900) + 100;
    this.oImg = new Image();
    this.oImg.src = './img/leaves/leaves' + (parseInt(Math.random() * 12) + 1) + '.png';
    
    this.oImg.className = "imgLeaves";
    this.oImg.style.width = 20 + 'px';
    this.oImg.style.left = this.pos.left + 'px';
    this.oImg.style.top = this.pos.top;
    document.body.appendChild(this.oImg);
}
// 控制速度
Leaf.prototype.fall = function() {
    var that = this;
    setInterval(function() {
        that.oImg.style.top = that.oImg.offsetTop + 7 + 'px';
        that.oImg.style.left = that.oImg.offsetLeft + -1.5 + 'px';
    }, that.speed);
};
// 每3秒掉一次
Start();
setInterval(Start, 10000);
//幾片葉子
function Start() {
    // console.log('掉');
    for (var i = 0; i < 5; i++) {
        // console.log(i);
        
        (function(leaf) {leaf.fall();})(new Leaf());
        // (function(leaf) {
        //     setTimeout(function() {
        //             leaf.fall();
        //         }, 0) //0秒後開始掉
        // })(new Leaf());
    }
    setTimeout(ClearAll, 9900);
}
// setInterval(ClearAll, 9900);
function ClearAll() {
    $(".imgLeaves").remove();
}