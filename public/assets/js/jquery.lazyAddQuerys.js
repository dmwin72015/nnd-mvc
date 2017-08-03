(function ($, window, document, undefined) {
    var $window = $(window);
    var doc = document;
    var Cookie = window.Cookie = {
        set: function (e, t, o, i, s, n) {
            doc.cookie = e + "=" + (n ? t : encodeURIComponent(t)) + (s ? "; expires=" + s.toGMTString() : "") + (i ? "; path=" + i : "; path=/") + (o ? "; domain=" + o : "")
        },
        get: function (e, t) {
            var o = doc.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
            return null != o ? decodeURIComponent(o[2]) : t
        },
        clear: function (e, t, o) {
            this.get(e) && (doc.cookie = e + "=" + (t ? "; path=" + t : "; path=/") + (o ? "; domain=" + o : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT")
        }
    };
    var _getQuerys = function (url, name) {
        var vars = {};
        url = url || window.location.href;
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (m, key, value) {
                vars[key] = window.decodeURIComponent(value);
            });
        return name ? (vars[name] || '') : vars;
    };

    var _isUrlLike = function (url) {
        return !/^#|javascript|tel|mailto/i.test(url);
    };

    var _hasQuerys = function (url) {
        return !$.isEmptyObject(_getQuerys(url));
    };
    var _fixHref = function (href, querys_add) {
        if (!href && !$.isEmptyObject(querys_add)) return href;
        var hash = href.indexOf('#') ? href.split('#')[1] : '';
        var path = href.split('?')[0] || '';
        return path + '?' + $.param(querys_add) + (hash ? '#' + hash : '');
    };

    $.fn.lazyquery = function (options) {
        var elements = this;
        var $container;
        var settings = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            skip_invisible: true,
            appear: null,
            querys: null,
            filter: null,
            ingnor: {attr: 'nopass', val: '1'}
        };

        function update() {
            settings.querys = querys();
            var counter = 0;
            elements.each(function () {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });
        }

        if (options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        //TODO:增加过滤条件
        function querys() {
            var loca_query = _getQuerys();
            var conf_query = settings.querys;
            var filter = settings.filter;
            var query = {};
            var push_key_val = function (key, valid) {
                if (typeof key == 'string') {
                    if ($.isFunction(valid)) {// { a: function(){}  }
                        var result = valid(loca_query[key]);
                        if (result !== false) {
                            query[key] = result;
                        }
                        return;
                    }

                    if ($.isArray(valid)) { //{ a: [1,2,3]}
                        if ($.inArray(loca_query[key], valid) != -1) {
                            query[key] = loca_query[key];
                        }
                        return;
                    }
                    if (valid instanceof RegExp) {// {a : /aa/}
                        if (valid.test(loca_query[key])) {
                            query[key] = loca_query[key];
                        }
                        return;
                    }
                    if (loca_query[key]) {// 'a'
                        query[key] = loca_query[key];
                    }
                } else if ($.isPlainObject(key)) {// [ { a : function | Arrary | RegExp } ]
                    for (var name in valid) {
                        push_key_val(name, valid[name]);
                    }
                }
            };
            if (filter) {
                if (typeof filter == 'string') {
                    push_key_val(filter);
                } else if ($.isArray(filter)) {
                    for (var i = 0; i < filter.length; i++) {
                        push_key_val(filter[i]);
                    }
                } else if ($.isPlainObject(filter)) {
                    for (var name in filter) {
                        push_key_val(name, filter[name]);
                    }
                }
            }
            return $.extend({}, query, conf_query);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
        settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.on(settings.event, function () {
                return update();
            });
        }

        this.each(function () {
            var self = this;
            var $self = $(self);

            self.loaded = false;
            /* When appear is triggered load original image. */

            $self.one("appear", function () {
                console.log(settings.querys);
                if (!this.loaded && !$.isEmptyObject(settings.querys)) {
                    //TODO:修改url
                    //TODO:参数不为空,url合法,是a标签 ,不含属性nopass = 1
                    var oldHref = $(this).attr('href');
                    if ($(this).is('a') && _isUrlLike(oldHref) && !$.isEmptyObject(settings.querys) && $(this).attr(settings.ingnor.attr) != settings.ingnor.val) {
                        $(this).attr('href', _fixHref(oldHref, $.extend({}, _getQuerys(oldHref), settings.querys)));
                    }
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.on(settings.event, function () {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.on("resize", function () {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.on("pageshow", function (event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function () {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function () {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };

    $.leftofbegin = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function (element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold": function (a) {
            return $.belowthefold(a, {threshold: 0});
        },
        "above-the-top": function (a) {
            return !$.belowthefold(a, {threshold: 0});
        },
        "right-of-screen": function (a) {
            return $.rightoffold(a, {threshold: 0});
        },
        "left-of-screen": function (a) {
            return !$.rightoffold(a, {threshold: 0});
        },
        "in-viewport": function (a) {
            return $.inviewport(a, {threshold: 0});
        },
        /* Maintain BC for couple of versions. */
        "above-the-fold": function (a) {
            return !$.belowthefold(a, {threshold: 0});
        },
        "right-of-fold": function (a) {
            return $.rightoffold(a, {threshold: 0});
        },
        "left-of-fold": function (a) {
            return !$.rightoffold(a, {threshold: 0});
        }
    });

})(jQuery, window, document);
