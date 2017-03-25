//
var link = document.getElementById('J-link');
var bigBanner = document.getElementById('J-bigBanner');
var minBanner = document.getElementById('J-minBanner');
link.onclick = function () {
    var height = utils.css(bigBanner, 'height');
    var text = link.childNodes;
    if (height == 0) {
        utils.css(bigBanner, 'display', 'block');
        animate(bigBanner, {height: 300}, 300);
        animate(minBanner, {height: 0}, 300);
        link.children[0].style.backgroundPosition = '0px 0px';
        console.log(text);
        text[0].nodeValue = '收起';
    } else {
        animate(bigBanner, {height: 0}, 300);
        animate(minBanner, {height: 60}, 300);
        link.children[0].style.backgroundPosition = '0px -4px';
        text[0].nodeValue = '展开';
    }
}
//////
var searchText = document.getElementById('J-search-text');
var hdSearch = document.getElementById('J-hd-search');
searchText.onfocus = function () {
    hdSearch.style.display = 'block';
}
searchText.onmouseout = function () {
    hdSearch.style.display = 'none';
    searchText.blur();
}
hdSearch.onmousemove = function () {
    hdSearch.style.display = 'block';
}
//最大的轮播图
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~我是分隔线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var banners = utils.getElesByClass('banner');
new Banner(banners[0], 'data.txt', 3000);
var Inner = document.getElementById('Inner');
var divs = utils.children(Inner, 'div');
var divsColor = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9'];
for (var i = 0; i < divs.length; i++) {
    utils.addClass(divs[i], divsColor[i]);
}
/// 选项卡
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~我是分隔线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var layout = document.getElementsByClassName('banner-layout-bottom')[0];
var layoutTab = layout.getElementsByClassName('layout-tab')[0];
var oas = layoutTab.getElementsByTagName('a');
var tabContent = layout.getElementsByClassName('layout-tab-content')[0];
var divs = tabContent.getElementsByTagName('div');
for (var i = 0; i < oas.length; i++) {
    ~(function (i) {
        oas[i].onmousemove = function () {
            for (var j = 0; j < oas.length; j++) {
                oas[j].className = '';
                utils.removeClass(divs[j], 'cur');
            }
            utils.addClass(this, 'cur');
            utils.addClass(divs[i], 'cur');
        }
    })(i);
}
//左右轮播
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~我是分隔线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var mainMod = utils.getElesByClass('main-mod')[0];
var ul = mainMod.getElementsByTagName('ul')[0];
var lis = ul.getElementsByTagName('li');
var prevBtn = utils.getElesByClass('prev-btn', mainMod)[0];
var nextBtn = utils.getElesByClass('next-btn', mainMod)[0];
var timer = window.setInterval(autoMove, 3000);
var step = 0;
function autoMove() {
    step++;
    if (step == 2) {
        utils.css(ul, 'left', -1060);
        step = 0;
    }
    animate(ul, {left: step * -1060}, 500);
}
ul.onmousemove = function () {
    window.clearInterval(timer);
}
ul.onmouseout = function () {
    timer = window.setInterval(autoMove, 3000);
}
prevBtn.onclick = function () {
    if (step == 0) {
        utils.css(ul, 'left', 0);
        //step = 0;
    }
    autoMove();
}
nextBtn.onclick = autoMove;

// margin-left ////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~我是分隔线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var marginLeft = (function () {
    var mainMid = utils.getElesByClass('main-mid')[0];
    var imgs = utils.getElesByClass('img', mainMid);

    function imgMargin() {
        for (var i = 0; i < imgs.length; i++) {
            ~(function (i) {
                var curImg = imgs[i];
                curImg.onmousemove = function () {
                    animate(curImg, {marginLeft: -10}, 100);
                };
                curImg.onmouseout = function () {
                    animate(curImg, {marginLeft: 0}, 110);
                }
            })
            (i);
        }
    }

    return {
        init: function () {
            imgMargin();
        }
    }
})
();
marginLeft.init();

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~我是分隔线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var bCon = utils.getElesByClass('b_con');
new Banner1(bCon[0], 'data1.txt', 3000);
new Banner1(bCon[1], 'data2.txt', 3000);
new Banner1(bCon[2], 'data3.txt', 3000);
new Banner1(bCon[3], 'data4.txt', 3000);
new Banner1(bCon[4], 'data5.txt', 3000);
new Banner1(bCon[5], 'data6.txt', 3000);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~我是分隔线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var bottomShuffling = (function () {
    var swrap = utils.getElesByClass('swrap')[0];
    var tabArrow = utils.getElesByClass('tab_arrow', swrap)[0];
    var lis = swrap.getElementsByTagName('li');
    var sgTabcontent = utils.getElesByClass('sg_tabcontent', swrap);
    var timer;
    var left = {};


    function shuffling() {
        for (var i = 0; i < lis.length; i++) {
            ~(function (i) {
                lis[i].onmousemove = function (e) {
                    left[i] = utils.offset(lis[i]).left - 115;
                    animate(tabArrow, {left: left[i]}, 200);
                    for (var j = 0; j < sgTabcontent.length; j++) {
                        utils.css(sgTabcontent[j], 'display', 'none');
                    }
                    utils.css(sgTabcontent[i], 'display', 'block');
                }
            })(i);
        }
    }

    function shuTime() {
        var step = 0;
        timer && window.clearInterval(timer);
        timer = window.setInterval(function () {
            if (step < sgTabcontent.length) {
                utils.css(sgTabcontent[step], 'display', 'none');
                step++;
                if (step == sgTabcontent.length) {
                    step = 0;
                }
                utils.css(sgTabcontent[step], 'display', 'block');
                animate(tabArrow, {left: left[step]}, 200);
                //console.log(left);
            }
        }, 5000);
        swrap.onmousemove = function () {
            window.clearInterval(timer);
        }
        swrap.onmouseout = function () {
            timer = window.setInterval(shuTime, 5000);
        }
    }


    return {
        init: function () {
            shuffling();
            shuTime();
        }
    }
})();
bottomShuffling.init();

var aTop = document.getElementById('a_top');
var timer1 = null;
var duration = 500;
var speed = null;
aTop.onclick = function () {
    timer && window.clearInterval(timer1);
    timer1 = window.setInterval(function () {
        var curScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        speed = curScrollTop / duration * 10;
        if (curScrollTop <= 0) {
            window.clearInterval(timer1);
            return;
        }
        curScrollTop -= speed;
        document.body.scrollTop = curScrollTop;
    }, 10);

};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~header fixed我是分隔线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var headerFixed = (function () {
    var header = document.getElementById('header'),
        hdFixedBg = utils.getElesByClass('hd-fixed-bg', header)[0],
        floorLeftBox = utils.getElesByClass('floor_left_box')[0];

    function fixed() {
        var scroll = document.body.scrollTop;
        if (scroll >= 1000) {
            utils.addClass(header, 'headerFixed');
            utils.addClass(hdFixedBg, 'hd_fixed_bg');
            utils.css(floorLeftBox, 'display', 'block');
            animate(floorLeftBox, {opacity: 1}, 300);
        }
        if (scroll < 1000) {
            window.clearInterval(timer);
            utils.removeClass(header, 'headerFixed');
            utils.removeClass(hdFixedBg, 'hd_fixed_bg');
            animate(floorLeftBox, {opacity: 0}, 300);
            utils.css(floorLeftBox, 'display', 'none');
        }

    }

    return {
        init: function () {
            fixed();
            document.body.onscroll = fixed;
        }
    }
})();
headerFixed.init();

var floorLeftBox = (function () {
    var modFloorTitle = document.getElementsByClassName('mod_floor_title'),
        floorLeftBox = utils.getElesByClass('floor_left_box')[0],
        oas = floorLeftBox.getElementsByTagName('a'),
        offsetTop = [],
        Top = 20;
    var timer = null;
    var duration = 500;
    var speed = null;
    for (var i = 0; i < modFloorTitle.length; i++) {
        offsetTop.push(utils.offset(modFloorTitle[i]).top);
    }
    function scrool() {
        for (var i = 0; i < oas.length; i++) {
            oas[i].onclick = function () {
                window.clearInterval(timer);
                var thia = this.getAttribute('data-tpc');
                timer = window.setInterval(function () {
                    var scrollTop = offsetTop[thia] - 800,
                        curTop = document.documentElement.scrollTop || document.body.scrollTop,
                        isSum = curTop - scrollTop;
                    console.log(scrollTop, curTop);
                    speed = scrollTop / duration * 10;
                    isSum >= 0 ? curTop -= speed : curTop += speed;
                    document.body.scrollTop = curTop;
                    if (isSum >= 0) {
                        if (curTop <= scrollTop + 10) {
                            window.clearInterval(timer);
                            return
                        }
                    }
                }, 10);
            }
        }
    }

    return {
        init: function () {
            scrool();
        }
    }
})();
floorLeftBox.init();