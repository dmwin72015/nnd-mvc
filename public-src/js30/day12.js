"use strict";
//TODO:待优化
define('js30/day12', ['../lib/jQuery-3.1.1.min.js', '../lib/keycode.js'], function($, key) {
    var MOD = {
        hide: 1,
        show: 0
    };

    function Password(opt) {
        this.pwd = [];
        this.$ = $;
        this.status = {
            word: ['|', '❋'],
            cname: 'flash'
        };
        this.lastTime = 0;
        this.wrap = '.password';
        this.isActive = false;
        this.timer = null;
        this.maxSize = 6
        this.mode = 0;
        this.isUpper = false;
        return this.init();
    }
    Password.prototype = {
        init: function() {
            this.wrapDom = _$(this.wrap)[0];
            this.initevent();
        },
        active: function(f) {
            var that = this,
                len = that.pwd.length,
                wrap = that.wrapDom;
            if (len == that.maxSize) {
                var span = _$('span', wrap)[len - 1];
            } else {
                var span = _$('span', wrap)[len];
                that.txtFlash(span);
            }
            addClass(span, 'focus');
            that.isActive = true;
        },
        inactive: function() {
            clearInterval(this.timer);
            var that = this,
                len = that.pwd.length,
                span = _$('span', that.wrapDom)[len == that.maxSize ? len - 1 : len];
            var i = _$('i', span)[0];
            removeClass(span, 'focus');
            removeClass(i, that.status.cname);
            if (len == that.maxSize) {
                that.txtPwd(span);
            } else {
                that.txtNormal(span);
            }
            that.isActive = false;
        },
        inputPwd: function(word) {
            this.pwd.push(word);
            var len = this.pwd.length;
            var lastIndex = len - 1,
                txt = this.status.word[0];
            var span = _$('span', this.wrapDom)[lastIndex];
            if (len == this.maxSize) {
                this.txtPwd(span);
                return;
            } else {
                this.txtPwd(span, true);
            }
            this.txtFlash(getNextElement(span));
        },
        deletePwd: function() {
            var lastLen = this.pwd.length;
            this.pwd.pop();
            var span = _$('span', this.wrapDom)[lastLen - 1];
            if (lastLen == this.maxSize) {
                this.txtFlash(span);
                return;
            }
            var span = _$('span', this.wrapDom)[lastLen - 1];
            this.txtNormal(getNextElement(span));
            this.txtFlash(span);
        },
        txtPwd: function(span, isNotFocus) {
            clearInterval(this.timer);
            var i = _$('i', span)[0];
            i.innerText = this.mode == 0 ? this.status.word[1] : this.pwd.slice(-1);
            isNotFocus && removeClass(span, 'focus');
            removeClass(i, this.status.cname);
        },
        txtNormal: function(span) {
            clearInterval(this.timer);
            var i = _$('i', span)[0];
            i.innerText = '';
            removeClass(span, 'focus');
            removeClass(i, 'flash');
        },
        txtFlash: function(span) {
            clearInterval(this.timer);
            var txt = this.status.word[0],
                sClass = this.status.cname;
            var i = _$('i', span)[0];
            addClass(span, 'focus');
            addClass(_$('i', span)[0], sClass);
            i.innerText = txt;
            var index = 0;
            this.timer = setInterval(function() {
                i.innerText = index & 1 == 1 ? txt : '';
                index++;
            }, 800);
        },
        contains: function(parent, son, container) {
            if (parent == son) return true;
            if (!parent || !son) return false;
            if (parent.contains) {
                return parent.contains(son);
            }
            if (parent.compareDocumentPosition) {
                return !!(parent.compareDocumentPosition(son) & 16)
            }
            var _parent = son.parentNode;
            while (_parent && _parent != container) {
                if (_parent == parent) {
                    return true;
                }
                _parent = _parent.parentNode
            }
            return false;
        },
        getPwd: function() {
            return this.pwd.join('');
        },
        showPwd: function() {
            var that = this;
            _$('span', that.wrapDom).forEach(function(e, index, arr) {
                if (that.pwd[index]) {
                    _$('i', e)[0].innerText = that.pwd[index];
                }
            });
            this.mode = 1;
        },
        hidePwd: function() {
            var that = this;
            _$('span', that.wrapDom).forEach(function(e, index, arr) {
                if (that.pwd[index]) {
                    _$('i', e)[0].innerText = '❋';
                }
            });
            this.mode = 0;
        },
        toggleMod: function() {
            if (this.mode == 1) {
                this.hidePwd();
            } else {
                this.showPwd();
            }
        },
        initevent: function() {
            var that = this,
                wrap = _$(that.wrap)[0];
            var oPwd = document.querySelector('#password');
            window.addEventListener('click', function(ev) {
                var curTarget = ev.target;
                if (containClass(curTarget, 'toogleShow')) {
                    that.toggleMod();
                    toggleClass(curTarget, 'show');
                    return;
                }
                if (that.contains(wrap, curTarget)) {
                    oPwd.focus();
                    !that.isActive && that.active();
                } else {
                    that.isActive && that.inactive();
                }
            });
            window.addEventListener('keyup', function(ev) {
                var _w = key[ev.keyCode];
                if (!that.isActive) return;
                if (ev.keyCode == 8 || ev.keyCode == 46) {
                    that.pwd.length > 0 && that.deletePwd();
                    ev.preventDefault();
                    return;
                }
                if (that.pwd.length >= that.maxSize) {
                    return;
                }
                if (/^[\w\d]$/i.test(_w)) {
                    that.inputPwd(_w, ev.shiftKey);
                    ev.preventDefault();
                }
            });
            window.addEventListener('keypress', function(ev) {
                var _w = String.fromCharCode(ev.keyCode);
                if (oPwd.value.length >= that.maxSize) {
                    ev.preventDefault();
                }
            })
        }
    }
    var pwd = new Password();

    function addClass(dom, cName) {
        if (!cName || typeof cName != 'string') return;
        dom.classList.add(cName);
    }

    function removeClass(dom, cName) {
        if (!cName || typeof cName != 'string') return;
        dom.classList.remove(cName);
    }

    function containClass(dom, cName) {
        return dom.classList.contains(cName);
    }

    function _$(selector, parent) {
        parent = parent || document;
        return parent.querySelectorAll(selector);
    }

    function toggleClass(dom, cName) {
        dom.classList.toggle(cName);
    }

    function getNextElement(element) {
        if (element.nextElementSibling) {
            return element.nextElementSibling;
        } else {
            var node = element.nextSibling;
            while (node && node.nodeType !== 1) {
                node = node.nextibling;
            }
            return node;
        }
    }

    function getPreviousElement(element) {
        if (element.previousElementSibling) {
            return element.previousElementSibling;
        } else {
            var el = element.previousSibling;
            while (el && el.nodeType !== 1) {
                el = el.previousSibling;
            }
            return el;
        }
    }
});
