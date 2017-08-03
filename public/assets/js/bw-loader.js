type = 'text/javascript' > window.BWEUM || (BWEUM = {});
BWEUM.info = {
    "stand": true,
    "agentType": "browser",
    "agent": "bi-collector.oneapm.com/static/js/bw-send-411.5.9.js",
    "beaconUrl": "bi-collector.oneapm.com/beacon",
    "licenseKey": "UgYBG1sUDQle4",
    "applicationID": 2279716
};
/*!OneAPM-v411.5.9 */
!function () {
    window.NREUM || (window.NREUM = {}), window.BWEUM || (window.BWEUM = window.NREUM);
    var a;
    window.BWEUM.require = a, window.apmFirstbyte = window.apmUserFirstbyte || (new Date).getTime(), a = function b(c, d, e) {
        function f(h, i) {
            if (!d[h]) {
                if (!c[h]) {
                    var j = "function" == typeof a && a;
                    if (!i && j)return j(h, !0);
                    if (g)return g(h, !0);
                    var k = new Error("Cannot find module '" + h + "'");
                    throw k.code = "MODULE_NOT_FOUND", k
                }
                var l = d[h] = {exports: {}};
                c[h][0].call(l.exports, function (a) {
                    var b = c[h][1][a];
                    return f(b ? b : a)
                }, l, l.exports, b, c, d, e)
            }
            return d[h].exports
        }

        for (var g = "function" == typeof a && a, h = 0; h < e.length; h++)f(e[h]);
        return f
    }({
        38: [function (a, b) {
            function c(a, b) {
                var c = [], e = "", f = 0;
                for (e in a)d.call(a, e) && (c[f] = b(e, a[e]), f += 1);
                return c
            }

            var d = Object.prototype.hasOwnProperty;
            b.exports = c
        }, {}], 39: [function (a, b) {
            b.exports = function (a) {
                var b = document.createElement("a"), c = window.location, d = {};
                b.href = a, d.port = b.port;
                var e = b.href.split("://");
                return !d.port && e[1] && (d.port = e[1].split("/")[0].split(":")[1]), d.port && "0" !== d.port || (d.port = "https" === e[0] ? "443" : "80"), d.hostname = b.hostname || c.hostname, d.pathname = b.pathname, "/" !== d.pathname.charAt(0) && (d.pathname = "/" + d.pathname), d.sameOrigin = !b.hostname || b.hostname === document.domain && b.port === c.port && b.protocol === c.protocol, d
            }
        }, {}], 35: [function (a, b) {
            function c() {
                var a = m.info = window.BWEUM.info;
                if (a && a.agent && a.licenseKey && a.applicationID && i && i.body) {
                    m.proto = "https" === l.split(":")[0] || a.sslForHttp ? "https://" : "http://", g("mark", ["onload", f()]);
                    var b = i.createElement("script");
                    b.src = 0 == a.agent.indexOf("//") ? a.agent : m.proto + a.agent, b.src += "?v=411.5.9 ", i.body.appendChild(b)
                }
            }

            function d() {
                o || "complete" === i.readyState && e()
            }

            function e() {
                g("mark", ["domContent", f()])
            }

            function f() {
                return (new Date).getTime()
            }

            var g = a("handle"), h = window, i = h.document, j = "addEventListener", k = "attachEvent", l = ("" + location).split("?")[0], m = b.exports = {
                offset: window.apmFirstbyte || f(),
                origin: l,
                features: {}
            };
            g("mark", ["firstbyte", window.apmFirstbyte || f()]), "complete" === document.readyState ? (e(), c()) : i[j] ? (i[j]("DOMContentLoaded", e, !1), h[j]("load", c, !1)) : (i[k]("onreadystatechange", d), h[k]("onload", c));
            var n = !1, o = !1;
            try {
                n = null == window.frameElement && document.documentElement
            } catch (m) {
            }
            n && n.doScroll && !function p() {
                if (!o) {
                    try {
                        n.doScroll("left")
                    } catch (a) {
                        return setTimeout(p, 50)
                    }
                    o = !0, e()
                }
            }()
        }, {handle: 34}], 34: [function (a, b) {
            function c(a, b, c) {
                return d.listeners(a).length ? d.emit(a, b, c) : (e[a] || (e[a] = []), void e[a].push(b))
            }

            var d = a("ee").create(), e = {};
            b.exports = c, c.ee = d, d.q = e
        }, {ee: 32}], 37: [function (a, b) {
            function c(a, b, c) {
                b || (b = 0), "undefined" == typeof c && (c = a ? a.length : 0);
                for (var d = -1, e = c - b || 0, f = new Array(0 > e ? 0 : e); ++d < e;)f[d] = a[b + d];
                return f
            }

            b.exports = c
        }, {}], 32: [function (a, b) {
            function c(a, b) {
                var c = g(a, f);
                c && 1 == c.ended && (a[b] = {}, delete a[b])
            }

            function d(a) {
                function b(b, d, h) {
                    a && a(b, d, h), h || (h = {});
                    var j = i(b), k = j.length, l = {};
                    try {
                        l = g(h, f, e)
                    } catch (m) {
                    }
                    for (var n = 0; k > n; n++)j[n].apply(l, d);
                    try {
                        c(h, f, e)
                    } catch (m) {
                    }
                    return l
                }

                function h(a, b) {
                    k[a] = i(a).concat(b)
                }

                function i(a) {
                    return k[a] || []
                }

                function j() {
                    return d(b)
                }

                var k = {};
                return {on: h, emit: b, create: j, listeners: i, _events: k}
            }

            function e() {
                return {}
            }

            var f = "bw@context", g = a("gos");
            b.exports = d()
        }, {gos: 33}], 33: [function (a, b) {
            function c(a, b, c) {
                if (d.call(a, b))return a[b];
                var e = c();
                if (Object.defineProperty && Object.keys)try {
                    return Object.defineProperty(a, b, {value: e, writable: !0, enumerable: !1}), e
                } catch (f) {
                }
                try {
                    a[b] = e
                } catch (f) {
                }
                return e
            }

            var d = Object.prototype.hasOwnProperty;
            b.exports = c
        }, {}]
    }, {}, []), a = function c(b, d, e) {
        function f(h, i) {
            if (!d[h]) {
                if (!b[h]) {
                    var j = "function" == typeof a && a;
                    if (!i && j)return j(h, !0);
                    if (g)return g(h, !0);
                    var k = new Error("Cannot find module '" + h + "'");
                    throw k.code = "MODULE_NOT_FOUND", k
                }
                var l = d[h] = {exports: {}};
                b[h][0].call(l.exports, function (a) {
                    var c = b[h][1][a];
                    return f(c ? c : a)
                }, l, l.exports, c, b, d, e)
            }
            return d[h].exports
        }

        for (var g = "function" == typeof a && a, h = 0; h < e.length; h++)f(e[h]);
        return f
    }({
        1: [function (a) {
            a("loader"), a("errorload"), a("xhrload"), a("perfload"), a("wrap-fetch")
        }, {errorload: 5, loader: 35, perfload: 6, "wrap-fetch": 29, xhrload: 7}],
        29: [function (a, b) {
            function c(a, b, c) {
                var d = a[b];
                "function" == typeof d && (a[b] = function () {
                    var a = d.apply(this, arguments);
                    return f.emit(c + "start", arguments, a), a.then(function (b) {
                        return f.emit(c + "end", [null, b], a), b
                    }, function (b) {
                        throw f.emit(c + "end", [b], a), b
                    })
                })
            }

            function d(a, b) {
                var c = g(b), d = a.params;
                d.host = c.hostname + ":" + c.port, d.pathname = c.pathname, a.sameOrigin = c.sameOrigin
            }

            function e() {
                return (new Date).getTime()
            }

            {
                var f = (a("lodash._slice"), a("ee").create()), g = a("parse-url"), h = a("gos"), i = a("handle"), j = a("map-own");
                a("wrap-function")(f)
            }
            b.exports = f;
            var k = window, l = "fetch-", m = l + "body-", n = ["arrayBuffer", "blob", "json", "text", "formData"], o = k.Request, p = k.Response, q = k.fetch, r = "prototype";
            o && p && q && (j(n, function (a, b) {
                c(o[r], b, m), c(p[r], b, m)
            }), c(k, "fetch", l), f.on(l + "end", function (a, b) {
                var c = this, d = {};
                h(d, "bw@context", function () {
                    return c
                }), b ? b.clone().arrayBuffer().then(function (a) {
                    c.rxSize = a.byteLength, f.emit(l + "done", [null, b], d)
                }) : f.emit(l + "done", [arrayBuffer], d)
            })), f.on("fetch-start", function (a, b) {
                var c;
                this.totalCbs = 0, this.called = 0, this.cbTime = 0, this.end = function () {
                }, this.ended = !1, this.xhrGuids = {}, this.startTime = e(), c = "object" == typeof a ? a.url : a, void 0 == b && (b = {method: "get"}), this.params = {method: b.method}, d(this, c), this.metrics = {}, this.metrics.txSize = 0, b && b.body && (this.metrics.txSize = b.body.length)
            }), f.on("fetch-end", function () {
                this.endTime = e()
            }), f.on("fetch-done", function (a, b) {
                this.ended = !0, this.metrics.duration = this.endTime - this.startTime, this.metrics.rxSize = this.rxSize, this.params.status = b.status, i("xhr", [this.params, this.metrics, this.startTime, this.creatType])
            })
        }, {ee: 32, gos: 33, handle: 34, "lodash._slice": 37, "map-own": 38, "parse-url": 39, "wrap-function": 40}],
        7: [function (a) {
            function b(a) {
                if ("string" == typeof a && a.length)return a.length;
                if ("object" != typeof a)return void 0;
                if ("undefined" != typeof ArrayBuffer && a instanceof ArrayBuffer && a.byteLength)return a.byteLength;
                if ("undefined" != typeof Blob && a instanceof Blob && a.size)return a.size;
                if ("undefined" != typeof FormData && a instanceof FormData)return void 0;
                try {
                    return JSON.stringify(a).length
                } catch (b) {
                    return void 0
                }
            }

            function c(a, b) {
                return b
            }

            function d(a) {
                a.send = o.wrapOld(a.send, "send-xhr-", c), a.onreadystatechange = o.wrapOld(a.onreadystatechange, "iexhr-onreadystatechange-", c), a.onerror = o.wrapOld(a.onerror, "iexhr-onerror-", c)
            }

            function e(a) {
                var c = this.params, d = this.metrics;
                if (!this.ended) {
                    if (this.ended = !0, a.removeEventListener)for (var e = 0; m > e; e++)a.removeEventListener(l[e], this.listener, !1);
                    if (!c.aborted) {
                        if (d.duration = (new Date).getTime() - this.startTime, 4 === a.readyState) {
                            c.status = a.status;
                            var f = a.responseType, g = "arraybuffer" === f || "blob" === f || "json" === f ? a.response : a.responseText, h = b(g);
                            h && (d.rxSize = h)
                        } else c.status = 0;
                        d.cbTime = this.cbTime, c && c.pathname && c.pathname.indexOf("beacon/resources") < 0 && i("xhr", [c, d, this.startTime, this.creatType])
                    }
                }
            }

            function f(a, b) {
                var c = j(b), d = a.params;
                d.host = c.hostname + ":" + c.port, d.pathname = c.pathname, a.sameOrigin = c.sameOrigin
            }

            var g = window, h = (g.performance, window.XMLHttpRequest);
            if (h && h.prototype && !/CriOS/.test(navigator.userAgent)) {
                a("loader").features.xhr = !0;
                var i = a("handle"), j = a("parse-url"), k = a("ee"), l = ["load", "error", "abort", "timeout"], m = l.length, n = a("loader_id"), o = a("wrap-function")(k);
                a("wrap-events"), a("wrap-xhr"), k.on("new-xhr", function () {
                    this.totalCbs = 0, this.called = 0, this.cbTime = 0, this.end = e, this.ended = !1, this.xhrGuids = {}
                }), k.on("open-xhr-start", function (a) {
                    this.params = {method: a[0]}, f(this, a[1]), this.metrics = {}
                }), k.on("open-xhr-end", function (a, b) {
                    b.__oldie && d(b)
                }), k.on("send-xhr-start", function (a, c) {
                    var d = this.metrics, e = a[0], f = this;
                    if (d && e) {
                        var g = b(e);
                        g && (d.txSize = g)
                    }
                    if (this.startTime = (new Date).getTime(), this.listener = function (a) {
                            try {
                                "abort" === a.type && (f.params.aborted = !0), ("load" !== a.type || f.called === f.totalCbs && (f.onloadCalled || "function" != typeof c.onload)) && f.end && f.end(c)
                            } catch (b) {
                                try {
                                    k.emit("internal-error", [b])
                                } catch (d) {
                                }
                            }
                        }, c.addEventListener)for (var h = 0; m > h; h++)c.addEventListener(l[h], this.listener, !1)
                }), k.on("iexhr-onreadystatechange-start", function (a, b) {
                    if (1 == b.readyState) {
                        var d = b.onreadystatechange;
                        setTimeout(function () {
                            b.onreadystatechange !== d && (b.onreadystatechange = o.wrapOld(b.onreadystatechange, "iexhr-onreadystatechange-", c))
                        }, 0)
                    }
                    4 == b.readyState && (this.xhrCbStart = (new Date).getTime())
                }), k.on("iexhr-onreadystatechange-end", function (a, b) {
                    var c = this;
                    this.xhrCbStart && k.emit("xhr-cb-time", [(new Date).getTime() - this.xhrCbStart, this.onload, b], b), 4 == b.readyState && c.end(b)
                }), k.on("xhr-cb-time", function (a, b, c) {
                    this.cbTime += a, b ? this.onloadCalled = !0 : this.called += 1, this.called !== this.totalCbs || !this.onloadCalled && "function" == typeof c.onload || this.end(c)
                }), k.on("xhr-load-added", function (a, b) {
                    var c = "" + n(a) + !!b;
                    this.xhrGuids && !this.xhrGuids[c] && (this.xhrGuids[c] = !0, this.totalCbs += 1)
                }), k.on("xhr-load-removed", function (a, b) {
                    var c = "" + n(a) + !!b;
                    this.xhrGuids && this.xhrGuids[c] && (delete this.xhrGuids[c], this.totalCbs -= 1)
                }), k.on("addEventListener-end", function (a, b) {
                    b instanceof XMLHttpRequest && "load" === a[0] && k.emit("xhr-load-added", [a[1], a[2]], b)
                }), k.on("removeEventListener-end", function (a, b) {
                    b instanceof XMLHttpRequest && "load" === a[0] && k.emit("xhr-load-removed", [a[1], a[2]], b)
                }), k.on("fn-start", function (a, b, c) {
                    b instanceof XMLHttpRequest && ("onload" === c && (this.onload = !0), ("load" === (a[0] && a[0].type) || this.onload) && (this.xhrCbStart = (new Date).getTime()))
                }), k.on("fn-end", function (a, b) {
                    this.xhrCbStart && k.emit("xhr-cb-time", [(new Date).getTime() - this.xhrCbStart, this.onload, b], b)
                })
            }
        }, {
            ee: 32,
            handle: 34,
            loader: 35,
            loader_id: 36,
            "parse-url": 39,
            "wrap-events": 28,
            "wrap-function": 40,
            "wrap-xhr": 31
        }],
        36: [function (a, b) {
            function c(a) {
                var b = typeof a;
                return !a || "object" !== b && "function" !== b ? -1 : a === window ? 0 : f(a, e, function () {
                    return d++
                })
            }

            var d = 1, e = "bw@id", f = a("gos");
            b.exports = c
        }, {gos: 33}],
        6: [function (a) {
            var b = window.performance;
            if (b && b.timing && b.getEntriesByType) {
                var c = a("ee"), d = a("handle"), e = (a("wrap-timer"), a("loader"));
                e.features.stn = !0, c.on("fn-start", function (a) {
                    var b = a[0];
                    b instanceof Event && (this.bstStart = Date.now())
                }), c.on("fn-end", function (a, b) {
                    var c = a[0];
                    c instanceof Event && d("bst", [c, b, this.bstStart, Date.now()])
                })
            }
        }, {ee: 32, handle: 34, loader: 35, "wrap-timer": 30}],
        5: [function (a) {
            function b(a, b, d, g, i) {
                try {
                    j ? j -= 1 : e("err", [i || new c(a, b, d)])
                } catch (k) {
                    try {
                        e("ierr", [k, (new Date).getTime(), !0])
                    } catch (l) {
                    }
                }
                return "function" == typeof h ? h.apply(this, f(arguments)) : !1
            }

            function c(a, b, c) {
                this.message = a || "Uncaught error with no additional information", this.sourceURL = b, this.line = c
            }

            function d(a) {
                e("err", [a, (new Date).getTime()])
            }

            var e = a("handle"), f = a("lodash._slice"), g = a("ee"), h = window.onerror, i = !1, j = 0;
            a("loader").features.err = !0, window.onerror = b, window.BWEUM.noticeError = d;
            var k = window.XMLHttpRequest;
            try {
                throw new Error
            } catch (l) {
                "stack" in l && (a("wrap-timer"), "addEventListener" in window && a("wrap-events"), k && k.prototype && k.prototype.addEventListener && a("wrap-xhr"), i = !0)
            }
            g.on("fn-start", function () {
                i && (j += 1)
            }), g.on("fn-err", function (a, b, c) {
                i && (this.thrown = !0, d(c))
            }), g.on("fn-end", function () {
                i && !this.thrown && j > 0 && (j -= 1)
            }), g.on("internal-error", function (a) {
                e("ierr", [a, (new Date).getTime(), !0])
            })
        }, {
            ee: 32,
            handle: 34,
            loader: 35,
            "lodash._slice": 37,
            "wrap-events": 28,
            "wrap-timer": 30,
            "wrap-xhr": 31
        }],
        31: [function (a, b) {
            function c() {
                j.inPlace(this, m, "fn-")
            }

            function d(a, b) {
                j.inPlace(b, ["onreadystatechange"], "fn-")
            }

            function e(a) {
                a.open = j.wrapOld(a.open, "open-xhr-", f)
            }

            function f(a, b) {
                return b
            }

            var g = a("ee").create(), h = a("wrap-events"), i = a("wrap-function"), j = i(g), k = i(h), l = window.XMLHttpRequest, m = ["onload", "onerror", "onabort", "onloadstart", "onloadend", "onprogress", "ontimeout"];
            b.exports = g, window._ApmXMLHttpRequest = window.XMLHttpRequest, window.XMLHttpRequest = function (a) {
                var b = new l(a);
                try {
                    g.emit("new-xhr", [], b), l.prototype.addEventListener ? (k.inPlace(b, ["addEventListener", "removeEventListener"], "-", function (a, b) {
                        return b
                    }), b.addEventListener("readystatechange", c, !1)) : (b.__oldie = !0, e(b))
                } catch (d) {
                    try {
                        g.emit("internal-error", [d])
                    } catch (f) {
                    }
                }
                return b
            }, window.XMLHttpRequest.prototype = l.prototype, j.inPlace(XMLHttpRequest.prototype, ["open", "send"], "-xhr-", f), g.on("send-xhr-start", d), g.on("open-xhr-start", d)
        }, {ee: 32, "wrap-events": 28, "wrap-function": 40}],
        30: [function (a, b) {
            function c(a, b, c) {
                var d = a[0];
                "string" == typeof d && (d = new Function(d)), a[0] = e(d, "fn-", null, c)
            }

            var d = (a("lodash._slice"), a("ee").create()), e = a("wrap-function")(d);
            b.exports = d, e.inPlace(window, ["setTimeout", "setInterval", "setImmediate"], "setTimer-"), d.on("setTimer-start", c)
        }, {ee: 32, "lodash._slice": 37, "wrap-function": 40}],
        28: [function (a, b) {
            function c(a) {
                f.inPlace(a, ["addEventListener", "removeEventListener"], "-", d)
            }

            function d(a) {
                return a[1]
            }

            var e = (a("lodash._slice"), a("ee").create()), f = a("wrap-function")(e), g = a("gos");
            if (b.exports = e, c(window), "getPrototypeOf" in Object) {
                for (var h = document; h && !h.hasOwnProperty("addEventListener");)h = Object.getPrototypeOf(h);
                h && c(h);
                for (var i = XMLHttpRequest.prototype; i && !i.hasOwnProperty("addEventListener");)i = Object.getPrototypeOf(i);
                i && c(i)
            } else Object.prototype.hasOwnProperty.call(XMLHttpRequest, "addEventListener") && c(XMLHttpRequest.prototype);
            e.on("addEventListener-start", function (a) {
                if (a[1]) {
                    var b = a[1];
                    "function" == typeof b ? this.wrapped = a[1] = g(b, "bw@wrapped", function () {
                        return f(b, "fn-", null, b.name || "anonymous")
                    }) : "function" == typeof b.handleEvent && f.inPlace(b, ["handleEvent"], "fn-")
                }
            }), e.on("removeEventListener-start", function (a) {
                var b = this.wrapped;
                b && (a[1] = b)
            })
        }, {ee: 32, gos: 33, "lodash._slice": 37, "wrap-function": 40}],
        40: [function (a, b) {
            function c(a) {
                return !(a && "function" == typeof a && a.apply && !a[f])
            }

            var d = a("ee"), e = a("lodash._slice"), f = "bw@wrapper", g = Object.prototype.hasOwnProperty;
            b.exports = function (a) {
                function b(a, b, d, g, i) {
                    function j() {
                        var c = this;
                        return h(a, b, c, e(arguments), d, g, i)
                    }

                    if (c(a))return a;
                    b || (b = "");
                    try {
                        j[f] = !0
                    } catch (k) {
                    }
                    return l(a, j), j
                }

                function h(a, b, c, d, e, f) {
                    var d, c, g, h;
                    try {
                        g = e && e(d, c) || {}
                    } catch (i) {
                        m([i, "", [d, c, f], g])
                    }
                    var j = a.name || "";
                    k(b + "start", [d, c, f, j], g);
                    try {
                        return h = a.apply(c, d)
                    } catch (l) {
                        var n = window.console;
                        throw void 0 != n && n.error && n.log && void 0 != l.stack && (n.log("OneAPM catch error"), n.error(l.stack)), k(b + "err", [d, c, l], g), l
                    } finally {
                        k(b + "end", [d, c, h, j], g)
                    }
                }

                function i(a, b, c) {
                    var a = a || function () {
                        }, b = b || "-";
                    return function () {
                        var d = this;
                        return h(a, b, d, e(arguments), c)
                    }
                }

                function j(a, d, e, f) {
                    e || (e = "");
                    var g, h, i, j = "-" === e.charAt(0);
                    for (i = 0; i < d.length; i++)h = d[i], g = a[h], c(g) || (a[h] = b(g, j ? h + e : e, f, h, a))
                }

                function k(b, c, d) {
                    try {
                        a.emit(b, c, d)
                    } catch (e) {
                        m([e, b, c, d])
                    }
                }

                function l(a, b) {
                    if (Object.defineProperty && Object.keys)try {
                        var c = Object.keys(a);
                        return c.forEach(function (c) {
                            Object.defineProperty(b, c, {
                                get: function () {
                                    return a[c]
                                }, set: function (b) {
                                    return a[c] = b, b
                                }
                            })
                        }), b
                    } catch (d) {
                        m([d])
                    }
                    for (var e in a)g.call(a, e) && (b[e] = a[e]);
                    return b
                }

                function m(b) {
                    try {
                        a.emit("internal-error", b)
                    } catch (c) {
                    }
                }

                return a || (a = d), b.inPlace = j, b.flag = f, b.wrapOld = i, b
            }
        }, {ee: 32, "lodash._slice": 37}]
    }, {}, [1]), window.BWEUM.require = a
}();
