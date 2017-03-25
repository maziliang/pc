function Banner(container, dataUrl, interval) {
    this.container = container;
    this.dataUrl = dataUrl;
    this.interval = interval || 2000;
    this.bannerInner = utils.getElesByClass('bannerInner', this.container)[0];
    this.focus = utils.children(this.container, 'ul')[0];
    this.left = utils.getElesByClass('left', this.container)[0];
    this.right = utils.getElesByClass('right', this.container)[0];
    this.imgs = this.bannerInner.getElementsByTagName('img');
    this.lis = this.focus.getElementsByTagName('li');
    this.timer = null;
    this.step = 0;
    this.data = null;
    this.init();
}
Banner.prototype = {
    constructor: Banner,
    getData: function () {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.dataUrl + '?_=' + new Date().getTime(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                that.data = utils.jsonParse(xhr.responseText);
            }
        }
        xhr.send(null);
    },
    bindData: function () {
        if (this.data) {
            var strImg = '';
            var strLi = '';
            for (var i = 0; i < this.data.length; i++) {
                strImg += '<div><img src=""realSrc="' + this.data[i].src + '"/></div>';
                strLi += i === 0 ? '<li class="selected"></li>' : '<li></li>';
            }
            this.bannerInner.innerHTML = strImg;
            this.focus.innerHTML = strLi;
        }
    },
    imgLoad: function () {
        var that = this;
        for (var i = 0; i < this.imgs.length; i++) {
            ;
            (function (i) {
                var curImg = that.imgs[i];
                var tempImg = new Image();
                tempImg.src = curImg.getAttribute('realSrc');
                tempImg.onload = function () {
                    curImg.src = this.src;
                    utils.css(curImg, 'display', 'block');
                    if (i === 0) {
                        utils.css(curImg.parentNode, 'zIndex', 1);
                        animate(curImg.parentNode, {opacity: 1}, 500);
                    }
                }
            })(i);
        }
    },
    autoMove: function () {
        this.step++;
        if (this.step == this.data.length) {
            this.step = 0;
        }
        this.setImg();
    },
    setImg: function () {
        for (var i = 0; i < this.imgs.length; i++) {
            var curImg = this.imgs[i];
            if (i === this.step) {
                utils.css(curImg.parentNode, 'zIndex', 1);
                animate(curImg.parentNode, {opacity: 1}, 300, function () {
                    var siblings = utils.siblings(this);
                    for (var i = 0; i < siblings.length; i++) {
                        utils.css(siblings[i], 'opacity', 0);
                    }
                });
            } else {
                utils.css(curImg.parentNode, 'zIndex', 0);
            }
        }
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = i === this.step ? 'selected' : '';
        }
    },
    bannerBindEvent: function () {
        var that = this;
        this.container.onmouseover = function () {
            window.clearInterval(that.timer);
            that.left.style.display = that.right.style.display = 'block';
        }
        this.container.onmouseout = function () {
            that.timer = window.setInterval(function () {
                that.autoMove();
            }, that.interval);
            that.left.style.display = that.right.style.display = 'none';
        }
    },
    focusBindevent: function () {
        var that = this;
        for (var i = 0; i < this.lis.length; i++) {
            var curLi = this.lis[i];
            curLi.index = i;
            curLi.onclick = function () {
                that.step = this.index;
                that.setImg();
            }
        }
    },
    buttonBindEvent: function () {
        var that = this;
        this.left.onclick = function () {
            that.step--;
            if (that.step == -1) {
                that.step = that.data.length - 1;
            }
            that.setImg();
        }
        this.right.onclick = function () {
            that.autoMove();
        }
    },
    init: function () {
        var that = this;
        this.getData();
        this.bindData();
        this.imgLoad();
        this.timer = window.setInterval(function () {
            that.autoMove();
        }, this.interval);
        this.bannerBindEvent();
        this.focusBindevent();
        this.buttonBindEvent();
    }
};


//|||||||||||||||||||||||||||


function Banner1(container, dataUrl, interval) {
    this.container = container;
    this.dataUrl = dataUrl;
    this.interval = interval || 2000;
    this.bannerInner = utils.getElesByClass('bannerInner', this.container)[0];
    this.focus = utils.getElesByClass('focus', this.container)[0];
    this.left = utils.getElesByClass('left', this.container)[0];
    this.right = utils.getElesByClass('right', this.container)[0];
    this.imgs = this.bannerInner.getElementsByTagName('img');
    this.lis = this.focus.getElementsByTagName('li');
    this.spans = this.container.getElementsByTagName('span');
    this.cur = this.container.getElementsByClassName('cur')[0];
    this.timer = null;
    this.step = 0;
    this.data = null;
    this.init();
}
Banner1.prototype = {
    constructor: Banner,
    getData: function () {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.dataUrl + '?_=' + new Date().getTime(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                that.data = utils.jsonParse(xhr.responseText);
            }
        }
        xhr.send(null);
    },
    bindData: function () {
        if (this.data) {
            var strImg = '';
            var strLi = '';
            for (var i = 0; i < this.data.length; i++) {
                strImg += '<div><img src=""realSrc="' + this.data[i].src + '"/></div>';
                strLi += i == 0 ? '<li><span class="cur"></span></li>' : '<li><span></span></li>';
            }
            this.bannerInner.innerHTML = strImg;
            this.focus.innerHTML = strLi;
        }
    },
    imgLoad: function () {
        var that = this;
        for (var i = 0; i < this.imgs.length; i++) {
            ;
            (function (i) {
                var curImg = that.imgs[i];
                var tempImg = new Image();
                tempImg.src = curImg.getAttribute('realSrc');
                tempImg.onload = function () {
                    curImg.src = this.src;
                    utils.css(curImg, 'display', 'block');
                    if (i === 0) {
                        utils.css(curImg.parentNode, 'zIndex', 1);
                        animate(curImg.parentNode, {opacity: 1}, 500);
                    }
                }
            })(i);
        }
    },
    autoMove: function () {
        this.step++;
        if (this.step == this.data.length) {
            this.step = 0;
        }
        this.setImg();
    },
    setImg: function () {
        for (var i = 0; i < this.imgs.length; i++) {
            var curImg = this.imgs[i];
            if (i === this.step) {
                utils.css(curImg.parentNode, 'zIndex', 1);
                animate(curImg.parentNode, {opacity: 1}, 500, function () {
                    var siblings = utils.siblings(this);
                    for (var i = 0; i < siblings.length; i++) {
                        utils.css(siblings[i], 'opacity', 0);
                    }
                });
            } else {
                utils.css(curImg.parentNode, 'zIndex', 0);
            }
        }
        for (var i = 0; i < this.spans.length; i++) {
            this.spans[i].className = i === this.step ? 'cur' : '';
            if (i === this.step) {
                utils.css(this.spans[i], 'display', 'block')
                animate(this.spans[i], {width: 30}, 2000);
            } else {
                utils.css(this.spans[i], 'width', 0);
                utils.css(this.spans[i], 'display', 'none');
            }
        }
    },
    bannerBindEvent: function () {
        var that = this;
        this.container.onmouseover = function () {
            window.clearInterval(that.timer);
        }
        this.container.onmouseout = function () {
            that.timer = window.setInterval(function () {
                that.autoMove();
            }, that.interval);
        }
    },
    focusBindevent: function () {
        var that = this;
        for (var i = 0; i < this.lis.length; i++) {
            var curLi = this.lis[i];
            curLi.index = i;
            curLi.onmousemove = function () {
                that.step = this.index;
                that.setImg();
            }
        }
    },
    init: function () {
        var that = this;
        this.getData();
        this.bindData();
        animate(this.spans[0], {width: 30}, 2000);
        this.imgLoad();
        this.timer = window.setInterval(function () {
            that.autoMove();
        }, this.interval);
        this.bannerBindEvent();
        this.focusBindevent();
    }
};