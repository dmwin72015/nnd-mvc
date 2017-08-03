function hideIntroPage() {
    var oLogo = document.querySelector('#logo');
    var oLogoHalf = document.querySelectorAll('.logoHalf');
    var oIntroPage = document.querySelector('#intro-page');
    hide(oIntroPage);
    return;
    addClass(oLogo, 'rotate');
    removeClass(oLogo, 'loading')


    oLogoHalf.forEach(function (ele, index, arr) {
        // addClass(ele, 'turn');
    });
    var oIntro = document.querySelector('.intro-page');
    addTransitionEndEvent(oLogo, function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        addTransitionEndEvent(oIntro, function (ev) {
            hide(oIntro);
        });
        addClass(oIntro, 'hide');
        removeEle(oLogo);
    });
}

function getStyle(ele, name) {
    var style = null;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(ele, null);
    } else {
        style = ele.currentStyle;
    }
    return style;
}

function addClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !cls.trim()) {
        return
    }

    /* istanbul ignore else */
    if (el.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(/\s+/).forEach(function (c) {
                return el.classList.add(c);
            });
        } else {
            el.classList.add(cls);
        }
    } else {
        var cur = ' ' + el.getAttribute('class') + ' ';
        if (cur.indexOf(' ' + cls + ' ') < 0) {
            el.setAttribute('class', (cur + cls).trim());
        }
    }
}

function removeClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !cls.trim()) {
        return
    }

    /* istanbul ignore else */
    if (el.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(/\s+/).forEach(function (c) {
                return el.classList.remove(c);
            });
        } else {
            el.classList.remove(cls);
        }
    } else {
        var cur = ' ' + el.getAttribute('class') + ' ';
        var tar = ' ' + cls + ' ';
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ');
        }
        el.setAttribute('class', cur.trim());
    }
}

function removeEle(ele) {
    (ele.parentNode || document).removeChild(ele);
}

function hide(ele) {
    ele.style.display = 'none';
}

function addTransitionEndEvent(ele, fn) {
    var body = body = document.body || document.documentElement;
    var style = body.style;

    var transitionEnd = (function () {
        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };
        for (var name in transEndEventNames) {
            if (typeof style[name] === "string") {
                return transEndEventNames[name]
            }
        }
    })();

    var isCalled = false;
    ele.addEventListener(transitionEnd, function (ev) {
        if (!isCalled) {
            fn && fn(ev);
            isCalled = true;
        }
    }, false);
}

setTimeout(hideIntroPage, 1);

var appDesc = new Vue({
    el: '#description',
    data: {
        title: '董小胖 STORY 马小肉',
        lines: [{
            text: '在2015年的一个上午',
            index: 0,
            time: Date.now()
        }, {
            text: '一个胖胖的女孩出现在我的生活里',
            index: 1,
            time: Date.now()
        }]
    },
    methods: {
        style:function(){
            console.log(arguments);
        }
    },
    computed: {
        style: function () {
            console.log(arguments);
            return {
                'major': this.index % 2 === 1
            }
        }
    }
});