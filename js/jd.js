/**
 * Created by Administrator on 2016/3/25.
 */
/**
 * Created by Administrator on 2016/3/17.
 */
    //????
window.onload = function(){
    var win = $(".inner_img")[0];
    //console.log(win)
    var imgs = $("a", win);
    var lins = $("li", win);
    var num = 0;
    var btnL = $(".btn_left")[0];
    var btnR = $(".btn_right")[0];
    var t = setInterval(move, 3000);
    var flag = true;

    //????????????????? ????
    win.onmouseover = function () {
        clearInterval(t);
    }
    //???????????? ????????
    win.onmouseout = function () {
        clearInterval(t);
        t = setInterval(move, 3000);
    }
    //????С?????????л?
    for (var i = 0; i < lins.length; i++) {
        lins[i].index = i;
        lins[i].onmouseover = function () {
            num = this.index;
            for (var i = 0; i < imgs.length; i++) {
                animate(imgs[i], {opacity: 0}, 500);
                lins[i].className = "";
            }
            animate(imgs[this.index], {opacity: 1}, 500);
            lins[this.index].className = "xydhot";

        }
    }


    //btnR
    btnR.onclick = function () {
        move();
    }
    //btnL
    btnL.onclick = function () {
        num--;
        if (num < 0) {
            num = imgs.length - 1;
        }
        for (var i = 0; i < imgs.length; i++) {
            animate(imgs[i], {opacity: 0}, 500);
            lins[i].className = "";
        }
        animate(imgs[num], {opacity: 1}, 500);
        lins[num].className = "xydhot";
    }


    //??????
    function move() {
        if (!flag) {
            return;
        }
        flag = false;
        //?????±?
        num++;
        //?????Χ
        if (num == imgs.length) {
            num = 0;
        }
        //???в???????
        for (var i = 0; i < imgs.length; i++) {
            animate(imgs[i], {opacity: 0}, 500, function () {
                flag = true;
            });
            lins[i].className = "";
        }
        //??????????
        animate(imgs[num], {opacity: 1}, 500, function () {
            flag = true;
        });
        lins[num].className = "xydhot";
    }
}
