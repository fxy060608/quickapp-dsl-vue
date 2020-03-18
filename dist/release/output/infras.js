! function(e) {
    "function" == typeof define && define.amd ? define(e) : e()
}(function() {
    "use strict";
    var e = "0.0.7";
    let t = null;
    const n = ["off", "error", "warn", "info", "log", "debug", "trace"];
    let o = {};

    function r(e) {
        const t = global.Env && global.Env.logLevel || "log";
        return o[t] && o[t][e]
    }
    var l = {
        setNativeConsole: function() {
            t = global.console, n.forEach(e => {
                const t = n.indexOf(e);
                o[e] = {}, n.forEach(r => {
                    n.indexOf(r) <= t && (o[e][r] = !0)
                })
            });
            const {
                trace: e,
                debug: l,
                log: s,
                info: i,
                warn: a,
                error: c,
                time: u,
                timeEnd: p,
                record: d
            } = console, h = console;
            console._ori = {
                trace: e,
                debug: l,
                log: s,
                info: i,
                warn: a,
                error: c,
                time: u,
                timeEnd: p,
                record: d
            }, console._ori.record || (console._ori.record = console._ori.info), h.trace = ((...e) => {
                r("trace") && console._ori.debug.apply(console, e)
            }), h.debug = ((...e) => {
                r("debug") && (console._ori.debug || console._ori.trace).apply(console, e)
            }), h.log = ((...e) => {
                r("log") && console._ori.log.apply(console, e)
            }), h.info = ((...e) => {
                r("info") && console._ori.info.apply(console, e)
            }), h.warn = ((...e) => {
                r("warn") && console._ori.warn.apply(console, e)
            }), h.error = ((...e) => {
                r("error") && console._ori.error.apply(console, e)
            }), h.time = ((...e) => {
                global.Env && global.Env.logPerf && r("info") && console._ori.time.apply(console, e)
            }), h.timeEnd = ((...e) => {
                global.Env && global.Env.logPerf && r("info") && console._ori.timeEnd.apply(console,
                    e)
            }), h.record = ((...e) => {
                global.Env && global.Env.logPerf && r("info") && console._ori.record.apply(console,
                    e)
            })
        },
        resetNativeConsole: function() {
            o = {}, global.console = t
        }
    };
    let s = null;

    function i(e) {
        return "string" == typeof e ? {
            uri: e
        } : "object" == typeof e ? e : void 0
    }
    var a = {
        setNativeRouter: function() {
            if (s = global.history) {
                const {
                    go: e,
                    back: t,
                    push: n,
                    replace: o
                } = s;
                global.history._ori = {
                    go: e,
                    back: t,
                    push: n,
                    replace: o
                }, global.history.go = ((...e) => {
                    global.history._ori.go.apply(global.history, e)
                }), global.history.back = (() => {
                    global.history._ori.back.apply(global.history)
                }), global.history.forward = (() => {}), global.history.push = ((...e) => {
                    const t = i(e);
                    t && global.history._ori.push.apply(global.history, t)
                }), global.history.replace = ((...e) => {
                    const t = i(e);
                    t && global.history._ori.replace.apply(global.history, t)
                })
            } else global.history = {
                go: function(...e) {},
                back: function(...e) {},
                forward: function(...e) {},
                push: function(...e) {},
                replace: function(...e) {}
            }
        },
        resetNativeRouter: function() {
            global.history = s
        }
    };
    let c = null,
        u = null,
        p = null,
        d = null,
        h = null,
        f = null,
        g = null,
        m = null,
        b = null;
    var v = {
        setNativeConsole: l.setNativeConsole,
        resetNativeConsole: l.resetNativeConsole,
        setNativeTimer: function() {
            c = global.setTimeout, u = global.setInterval, p = global.requestAnimationFrame, d = global.clearTimeout,
                h = global.setTimeoutNative, f = global.clearInterval, g = global.setIntervalNative, m =
                global.cancelAnimationFrame, b = global.requestAnimationFrameNative;
            const e = {};
            let t = 0;
            "function" == typeof h && (global.setTimeoutWrap = function(n, o, r) {
                return e[++t] = o, global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### setTimeoutWrap ${t}----`), h(n, t, r), t
            }, global.setTimeout = function(e, t) {
                return global.setTimeoutWrap(-1, e, t)
            }, global.setTimeoutCallback = function(t) {
                global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Framework ### setTimeout 执行回调 ${t}----`), "function" == typeof e[t] &&
                    (e[t](), delete e[t])
            }, global.clearTimeout = global.clearTimeoutWrap = function(t) {
                "function" == typeof d && d(t), "function" == typeof e[t] ? delete e[t] : e[t] =
                    void 0
            }), "function" == typeof g && (global.setIntervalWrap = function(n, o, r) {
                return e[++t] = o, global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### setIntervalWrap ${t}----`), g(n, t, r), t
            }, global.setInterval = function(e, t) {
                return global.setIntervalWrap(-1, e, t)
            }, global.setIntervalCallback = function(t) {
                global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### setInterval 执行回调 ${t}----`), "function" == typeof e[
                    t] && e[t]()
            }, global.clearInterval = global.clearIntervalWrap = function(t) {
                "function" == typeof f && f(t), "function" == typeof e[t] ? delete e[t] : e[t] =
                    void 0
            }), "function" == typeof b && (global.requestAnimationFrameWrap = function(n, o) {
                return e[++t] = o, global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### requestAnimationFrame ${t}----`), b(n, t), t
            }, global.requestAnimationFrame = function(e) {
                return global.requestAnimationFrameWrap(-1, e)
            }, global.requestAnimationFrameCallback = function(n) {
                global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Framework ### requestAnimationFrame 执行回调 ${t}----`), "function" ==
                    typeof e[n] && e[n]()
            }, global.cancelAnimationFrame = global.cancelAnimationFrameWrap = function(t) {
                "function" == typeof m && m(t), "function" == typeof e[t] ? delete e[t] : e[t] =
                    void 0
            })
        },
        resetNativeTimer: function() {
            global.setTimeout = c, global.clearTimeout = d, global.clearTimeoutWrap = null, global.setTimeoutCallback =
                null, global.setTimeoutWrap = null, global.setInterval = u, global.clearInterval = f,
                global.clearIntervalWrap = null, global.setIntervalCallback = null, global.setIntervalWrap =
                null, global.requestAnimationFrame = p, global.cancelAnimationFrame = m, global.cancelAnimationFrameWrap =
                null, global.requestAnimationFrameCallback = null, global.requestAnimationFrameWrap = null
        },
        setNativeRouter: a.setNativeRouter,
        resetNativeRouter: a.resetNativeRouter,
        freezePrototype: function() {
            Object.freeze(Object), Object.freeze(Array), Object.freeze(Object.prototype), Object.freeze(
                    Array.prototype), Object.freeze(String.prototype), Object.freeze(Number.prototype),
                Object.freeze(Boolean.prototype), Object.freeze(Error.prototype), Object.freeze(Date.prototype),
                Object.freeze(RegExp.prototype)
        }
    };

    function E(e, t, n) {
        return "function" == typeof global.compileAndRunScript ? function(e, t, n) {
            let o = "(function (";
            const r = [],
                l = [];
            for (const t in e) r.push(t), l.push(e[t]);
            for (let e = 0; e < r.length - 1; ++e) o += r[e], o += ",";
            o += r[r.length - 1], o += ") {", o += t, o += "\n  })", console.record(
                `### App Performance ### 编译JS[PERF:compileJS]开始：${(new Date).toJSON()}`), console.time(
                "PERF:compileJS");
            let s = global.compileAndRunScript(o, n);
            return console.timeEnd("PERF:compileJS"), console.record(
                `### App Performance ### 编译JS[PERF:compileJS]结束：${(new Date).toJSON()}`), console.record(
                `### App Performance ### 执行JS[PERF:executeJS]开始：${(new Date).toJSON()}`), console.time(
                "PERF:executeJS"), console.time("PERF:defineUxObject"), s && "function" == typeof s && (s =
                s(...l)), console.timeEnd("PERF:executeJS"), console.record(
                `### App Performance ### 执行JS[PERF:executeJS]结束：${(new Date).toJSON()}`), s
        }(e, t, n) : function(e, t) {
            const n = [],
                o = [];
            for (const t in e) n.push(t), o.push(e[t]);
            n.push(t), console.record(`### App Performance ### 编译JS[PERF:compileJS]开始：${(new Date).toJSON()}`),
                console.time("PERF:compileJS");
            const r = new Function(...n);
            console.timeEnd("PERF:compileJS"), console.record(
                `### App Performance ### 编译JS[PERF:compileJS]结束：${(new Date).toJSON()}`), console.record(
                `### App Performance ### 执行JS[PERF:executeJS]开始：${(new Date).toJSON()}`), console.time(
                "PERF:executeJS"), console.time("PERF:defineUxObject");
            const l = r(...o);
            return console.timeEnd("PERF:executeJS"), console.record(
                `### App Performance ### 执行JS[PERF:executeJS]结束：${(new Date).toJSON()}`), l
        }(e, t)
    }

    function y(e) {
        const t = Object.prototype.toString.call(e);
        return t.substring(8, t.length - 1).toLowerCase()
    }

    function _(e) {
        const t = Object.create(null);
        return function(n) {
            return t[n] || (t[n] = e(n))
        }
    }
    const w = /-(\w)/g,
        A = _(e => e.replace(w, N));

    function N(e, t) {
        return t ? t.toUpperCase() : ""
    }
    const $ = /([a-z\d])([A-Z])/g,
        P = _(e => e.replace($, "$1-$2").toLowerCase());

    function S(e) {
        return "function" == typeof e
    }

    function O(e) {
        return null !== e && "object" == typeof e
    }
    let T = 0;

    function k() {
        return ++T
    }
    const C = {},
        R = {};
    let F = {};
    const I = {
        MODE: {
            SYNC: 0,
            CALLBACK: 1,
            SUBSCRIBE: 2
        },
        TYPE: {
            METHOD: 0,
            ATTRIBUTE: 1,
            EVENT: 2
        },
        NORMALIZE: {
            RAW: 0,
            JSON: 1
        },
        RESULT: {
            MODULE_INST: 0
        },
        MULTIPLE: {
            SINGLE: 0,
            MULTI: 1
        }
    };

    function L(e, t, n) {
        global.Env && "trace" === global.Env.logLevel && console.trace(`### App Framework ### require模块：${t}`);
        const o = [t];
        let r, l = {};
        if (t.indexOf(".") < 0) {
            const e = t + ".";
            for (const t in U()) t.startsWith(e) && o.push(t)
        }
        if (o.forEach(o => {
                const s = U()[o];
                if (!s) return;
                let i = o.replace(t, "");
                if ("." === i.substr(0, 1) && (i = i.substr(1)), s.instantiable) {
                    const e = function(...t) {
                        const n = e.__init__(...t);
                        Object.defineProperty(this, "_instId", {
                            enumerable: !1,
                            configurable: !1,
                            writable: !1,
                            value: n && n.instId
                        })
                    };
                    if (0 === i.length) l = e;
                    else {
                        const t = i.split(".");
                        if (t.length > 0) {
                            const n = t.pop();
                            M(l, t)[n] = e
                        }
                    }
                }
                if (o === t) r = l;
                else if (i.length > 0) {
                    const e = i.split(".");
                    e.length > 0 && (r = M(l, e))
                }! function(e, t, n, o) {
                    const r = n.methods;
                    for (const l in r) {
                        const s = r[l],
                            i = s.instanceMethod ? t.prototype : t;
                        l in i && console.warn(`### App Framework ### 模块${n.name}的接口函数${l}---- 重复定义`);
                        const a = function(...t) {
                            if (e._isApp && !e._defined) throw new Error(
                                `请确认Native方法调用[${n.name}.${l}()]发生在应用app的生命周期的创建['onCreate()']之后`);
                            const r = Object.prototype.hasOwnProperty.call(this, "_instId") ? this._instId :
                                o;
                            return x(e, n, s, t, r)
                        };
                        Object.defineProperty(i, l, {
                            configurable: !1,
                            enumerable: !0,
                            get() {
                                return a.bind(this)
                            },
                            set(e) {
                                console.warn(`### App Framework ### 接口${n.name}的方法(${l})为可读，不可覆盖`)
                            }
                        }), global.Env && "trace" === global.Env.logLevel && console.trace(
                            `### App Framework ### require---- 模块${n.name}接口函数${l}`)
                    }
                    const l = n.attributes;
                    for (const e in l) {
                        const o = l[e],
                            r = o.instanceMethod ? t.prototype : t;
                        Object.defineProperty(r, e, {
                            configurable: !1,
                            enumerable: !0,
                            get() {
                                if (o[1]) {
                                    let t = this[o[1].name]();
                                    if (o[1] && o[1].subAttrs || o[2] && o[2].subAttrs) {
                                        const r = this;
                                        t || (t = {});
                                        let l = [];
                                        o[1] && o[1].subAttrs && (l = l.concat(o[1].subAttrs)), o[2] &&
                                            o[2].subAttrs && (l = l.concat(o[1].subAttrs));
                                        const s = new Set(l);
                                        l = Array.from(s);
                                        for (const s in l) {
                                            const i = l[s];
                                            Object.defineProperty(t, i, {
                                                configurable: !0,
                                                enumerable: !0,
                                                get() {
                                                    if (o[1] && o[1].subAttrs && !(o[1]
                                                            .subAttrs.indexOf(i) < 0))
                                                        return r[o[1].name]()[i];
                                                    console.warn(
                                                        `### App Framework ### 模块${n.name}的接口属性(${e})的子属性(${i})不可读`
                                                    )
                                                },
                                                set(t) {
                                                    if (!o[2] || !o[2].subAttrs || o[2]
                                                        .subAttrs.indexOf(i) < 0)
                                                        console.warn(
                                                            `### App Framework ### 模块${n.name}的接口属性(${e})的子属性(${i})不可写`
                                                        );
                                                    else {
                                                        const e = {};
                                                        e[i] = t, r[o[2].name]({
                                                            value: e
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }
                                    return t
                                }
                                console.warn(`### App Framework ### 模块${n.name}的接口属性(${e})不可读`)
                            },
                            set(t) {
                                o[2] ? this[o[2].name]({
                                    value: t
                                }) : console.warn(
                                    `### App Framework ### 模块${n.name}的接口属性(${e})不可写`)
                            }
                        })
                    }
                    const s = n.events;
                    for (const e in s) {
                        const o = s[e];
                        o.cache = o.cache || {};
                        const r = o.instanceMethod ? t.prototype : t;
                        Object.defineProperty(r, e, {
                            configurable: !1,
                            enumerable: !0,
                            get() {
                                const e = void 0 === this._instId ? -1 : this._instId;
                                return o.cache[e]
                            },
                            set(t) {
                                if ("function" != typeof t && -1 === [null, void 0].indexOf(t))
                                    console.warn(
                                        `### App Framework ### 模块${n.name}的接口事件(${e})值类型必须是函数或null`
                                    );
                                else {
                                    const e = void 0 === this._instId ? -1 : this._instId,
                                        n = "function" == typeof t ? t.bind(this) : t;
                                    this[o.name]({
                                        success: n
                                    }), o.cache[e] = t
                                }
                            }
                        })
                    }
                }(e, r, s, n)
            }), 0 === Object.keys(l).length) throw new Error(`请确认引入的模块[${t}]：名称正确并且在manifest.json的features中声明`);
        return l
    }

    function M(e, t) {
        if (!e) return;
        let n = e;
        return t.forEach(e => {
            e in n || (n[e] = {}), n = n[e]
        }), n
    }
    const j = ["success", "cancel", "fail", "complete"];

    function x(e, t, n, o, r) {
        const {
            name: l,
            type: s
        } = t, {
            name: i,
            mode: a,
            type: c,
            normalize: u,
            multiple: p
        } = n;
        if (!e._callbacks) return console.warn(`### App Framework ### 容器已销毁,接口调用(${l}.${i}())无效`), new Error(
            "invokeNative: 容器已销毁");
        if ("feature" === s && !global.JsBridge) return new Error("invokeNative: JsBridge没有初始化");
        if ("module" === s && !global.ModuleManager) return new Error("invokeNative: ModuleManager没有初始化");
        console.time(`PERF:invokeMod:${l}.${i}()`);
        const d = "feature" === s ? global.JsBridge : global.ModuleManager;
        o.length > 0 && void 0 === o[0] && console.warn(`### App Framework ### 接口调用${l}.${i}的参数为 undefined`);
        const h = o.length > 0 ? o[0] : {};
        h && h.callback && (h.success && console.warn("### App Framework ### invoke函数不能同时出现'success'和'callback'参数"),
            h.success = h.callback);
        let f = {};
        const g = {};
        if (O(h))
            for (const t in h) {
                const n = h[t];
                j.indexOf(t) >= 0 ? "function" == typeof n ? g[t] = n : console.warn(
                    `### App Framework ### invoke函数的回调参数${t}类型不是function`) : "callback" !== t && (u === I.NORMALIZE
                    .JSON ? f[t] = D(n, e) : f[t] = "function" == typeof t ? D(n, e) : n)
            } else S(h) ? g.success = h : f = h;
        if (u === I.NORMALIZE.JSON && (f = JSON.stringify(f)), a === I.MODE.SYNC) {
            let n = "-1";
            if (p === I.MULTIPLE.MULTI && S(h) && (n = B(h).toString(), global.Env && "trace" === global.Env.logLevel &&
                    console.trace(`${i} 方法的回调函数参数id：${n}`), "-1" === n)) return;
            const o = d.invoke(l, i, f, n, r);
            return null == o ? void console.warn(`### App Framework ### invoke函数 '${l}.${i}' 返回值为null`) : (global.Env &&
                "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### invoke函数 '${l}.${i}' 调用成功，返回值为: ${o}`), J(e, o, t, i).data)
        } {
            let n, o, s;
            c === I.TYPE.METHOD && a === I.MODE.CALLBACK && (g.flagCallback = !0);
            const u = [];
            if (Object.keys(g).length) {
                const r = global.isRpkMinPlatformVersionGEQ(1040) ? void 0 : g;
                let l = -1;
                p === I.MULTIPLE.MULTI ? -1 === (l = B(g.success)) && (global.Env && "trace" === global.Env.logLevel &&
                        console.trace(`### App Framework ###  新增监听实例，id：${l}`), l = k()) : l = k(), e._callbacks[l] =
                    (l => {
                        const a = g,
                            c = J(e, l, t, i),
                            u = c.code,
                            p = c.data;
                        0 === u && a.success ? a.success.call(r, p) : 100 === u && a.cancel ? a.cancel.call(r) :
                            u >= 200 && a.fail && a.fail.call(r, p, u), a.complete && a.complete.call(r, p), n &&
                            (0 === u ? o({
                                data: p
                            }) : s({
                                data: p,
                                code: u
                            }))
                    }), C[l] = {
                        instance: e.id.toString(),
                        preserved: a === I.MODE.SUBSCRIBE,
                        cbFunc: g.success
                    }, u.push(f), u.push(l.toString())
            } else u.push(f), u.push("-1");
            if (d.invoke(l, i, ...u, r), console.timeEnd(`PERF:invokeMod:${l}.${i}()`), c === I.TYPE.METHOD && a ===
                I.MODE.CALLBACK && 1 === Object.keys(g).length) return n = new Promise((e, t) => {
                o = e, s = t
            })
        }
    }

    function J(e, t, n, o) {
        const r = "string" == typeof t ? JSON.parse(t) : t || {},
            l = r.content;
        return l && l._nativeType === I.RESULT.MODULE_INST ? (n.instantiable && "__init__" === o ? r.data = l : r.data =
            L(e, l.name, l.instId), e._nativeInstList && e._nativeInstList.push(t), r.data.instHandler = l.instHandler
        ) : r.data = l, r
    }

    function D(e, t) {
        switch (y(e)) {
            case "undefined":
            case "null":
                return "";
            case "regexp":
                return e.toString();
            case "date":
                return e.toISOString();
            case "number":
            case "string":
            case "boolean":
            case "array":
            case "object":
                return e;
            case "function":
                const n = k();
                return t._callbacks ? t._callbacks[n] = e : global.Env && "trace" === global.Env.logLevel &&
                    console.trace("### App Framework ### normalize() inst实例已经销毁，不再注册回调"), C[n] = {
                        instance: t.id.toString(),
                        preserved: !1,
                        cbFunc: e
                    }, n.toString();
            default:
                return JSON.stringify(e)
        }
    }

    function B(e) {
        let t = -1;
        for (const n in C)
            if (C[n] && C[n].cbFunc && C[n].cbFunc === e) {
                t = n;
                break
            } return t
    }

    function H(e, t) {
        R[e] = t
    }

    function U() {
        return F
    }
    class q {
        constructor(e) {
            this.id = e, this._callbacks = {}, this._nativeInstList = [], H(e, this)
        }
        invoke(e, t, n, o) {
            global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Framework ### 调用对象(${e.id})的回调(${t}) 参数：`, JSON.stringify(n));
            const r = e._callbacks[t];
            if ("function" == typeof r) {
                const l = r(n);
                return void 0 !== o && !1 !== o || (e._callbacks[t] = void 0), l
            }
            return new Error(`invoke: 无效invoke回调函数Id "${t}"`)
        }
        destroy() {
            this._callbacks = null, this._nativeInstList = null, H(this.id, null)
        }
    }
    class z {
        constructor() {
            this.eventMap = {}
        }
        subscribe(e, t, n) {
            if (n && n.once) {
                const n = o => {
                    t(o), this.remove(e, n)
                };
                return this.subscribe(e, n)
            }
            if (this.eventMap[e] = this.eventMap[e] || [], "function" == typeof t) {
                const n = this.eventMap[e]; - 1 === n.indexOf(t) && n.push(t)
            }
        }
        publish(e, t, n) {
            let o = null;
            const r = this.eventMap[e] || [];
            for (let e = 0, n = r.length; e < n; e++) o = r[e](t, o);
            return o
        }
        remove(e, t) {
            if (!this.eventMap[e]) return;
            const n = this.eventMap[e],
                o = n.indexOf(t);
            o > -1 && n.splice(o, 1)
        }
    }
    const W = Symbol("connectionProperty"),
        G = Symbol("messageCallbacks"),
        V = Symbol("nextId"),
        Y = Symbol("onMessage");
    let X = {};
    let Z = null;
    const K = {};
    class Q {
        constructor(e = "message", t = {}) {
            this.type = e, this.data = t.data || null, this.timeStamp = Date.now()
        }
    }
    const ee = {};

    function te(e, t = null) {
        ee[e] = t
    }

    function ne(e) {
        console.time(`PERF:readResource(${e})`);
        const t = global.readResource(e);
        return console.timeEnd(`PERF:readResource(${e})`), t || console.warn(`文件不存在，请确认其路径：${e}`), t
    }
    var oe = {
        init: function() {
            v.setNativeConsole(), v.setNativeTimer(), v.setNativeRouter()
        },
        exposeToNative: function(e) {
            for (const t in e) global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Framework ### 注册全局函数----", t), global[t] = ((...n) => {
                const o = e[t](...n);
                return o instanceof Error && console.error(o.toString()), o
            })
        },
        defineBundle: te,
        Session: class extends z {
            constructor() {
                super(), this[W] = null, this[V] = 1, this[G] = new Map
            }
            connect() {
                if (this[W]) throw new Error("The inspector session has already connected");
                this[W] = new global.Connection(e => this[Y](e))
            } [Y](e) {
                const t = JSON.parse(e);
                try {
                    if (t.id) {
                        const e = this[G].get(t.id);
                        if (this[G].delete(t.id), e) {
                            if (t.error) return e(new Error(t.error.code, t.error.message));
                            e(null, t.result)
                        }
                    } else this.publish(t.method, t, null), this.publish("inspectorNotification", t,
                        null)
                } catch (e) {
                    console.log(e)
                }
            }
            post(e, t, n) {
                if (o = e, "[object String]" !== Object.prototype.toString.call(o)) throw new Error(
                    "method must be a string");
                var o;
                if (!n && S(t) && (n = t, t = null), t && "object" != typeof t) throw new Error(
                    "params not object");
                if (n && "function" != typeof n) throw new Error("callback is not valid");
                if (!this[W]) throw new Error("ERR_INSPECTOR_NOT_CONNECTED");
                const r = this[V]++,
                    l = {
                        id: r,
                        method: e
                    };
                t && (l.params = t), n && this[G].set(r, n), this[W].dispatch(JSON.stringify(l))
            }
            disconnect() {
                this[W] && (this[W].disconnect(), this[W] = null, this[G].values().length > 0 &&
                    console.warn("remainingCallbacks will not executed due to inspector closed"),
                    this[G].clear(), this[V] = 1)
            }
        },
        requireBundle: function(e) {
            if (e = e.replace(/\.js$/, ""), !ee[e]) {
                let t = global.readResource(`assets:///js/bundles/${e}.js`);
                "string" == typeof t && (t = E({}, `${t}; return ${e}`, `/bundles/${e}.js`)), te(e, t)
            }
            return ee[e]
        },
        loadResource: ne,
        BroadcastChannel: class {
            constructor(e) {
                if (global.Env.engine === global.ENGINE_TYPE.CARD) throw new Error(
                    "BroadcastChannel is not supported.");
                Object.defineProperty(this, "name", {
                        configurable: !1,
                        enumerable: !0,
                        writable: !1,
                        value: String(e)
                    }), this._closed = !1, this.onmessage = null, K[this.name] || (K[this.name] = []),
                    K[this.name].push(this)
            }
            postMessage(e) {
                if (this._closed) throw new Error(`BroadcastChannel "${this.name}" is closed.`);
                const t = K[this.name];
                if (t && t.length)
                    for (let n = 0; n < t.length; ++n) {
                        const o = t[n];
                        o._closed || o === this || "function" == typeof o.onmessage && o.onmessage(new Q(
                            "message", {
                                data: e
                            }))
                    }
            }
            close() {
                if (!this._closed && (this._closed = !0, K[this.name])) {
                    const e = K[this.name].indexOf(this);
                    e > -1 ? K[this.name].splice(e, 1) : delete K[this.name]
                }
            }
        },
        ENGINE_TYPE: {
            PAGE: "page",
            CARD: "card"
        },
        ModuleHost: q,
        requireModule: L,
        requireScriptFile: function(e, t) {
            const n = ne(e);
            if (n && "string" == typeof n) return E(t,
                `(function(global){"use strict"; ${n}  \n })(Object.create(this))`, e)
        },
        exposure: {
            registerModules: function(e, t = "feature") {
                console.record(`### App Performance ### 注册模块[PERF:registerMod]开始：${(new Date).toJSON()}`),
                    "string" == typeof e && (e = JSON.parse(e)), global.Env && "trace" === global.Env.logLevel &&
                    console.trace("### App Framework ### registerModules---- ", JSON.stringify(e)),
                    "object" == typeof(e = e.map(function(e) {
                        return e.__type__ = t, e
                    })) && function(e, t = !0) {
                        let n = [];
                        Array.isArray(e) ? n = e : n.push(e), n.forEach(e => {
                            const n = e.name;
                            global.Env && "trace" === global.Env.logLevel && console.trace(
                                `### App Framework ### 注册模块---- ${n} <${e.__type__}>`);
                            let o = F[n];
                            o || (o = {
                                type: e.__type__,
                                name: e.name,
                                methods: {},
                                attributes: {},
                                events: {},
                                instantiable: e.instantiable
                            }, F[n] = o), o.methods || (o.methods = {});
                            const r = o.methods;
                            e.methods && e.methods.length && e.methods.forEach(e => {
                                const l = e.name;
                                if (void 0 === e.mode && (e.mode = I.MODE.SYNC), void 0 ===
                                    e.type && (e.type = I.TYPE.METHOD), void 0 === e.normalize &&
                                    (e.normalize = I.NORMALIZE.JSON), void 0 === e.instanceMethod &&
                                    (e.instanceMethod = !1), !o.instantiable && e.instanceMethod
                                ) throw new Error(`模块 ${o.name} 配置定义错误`);
                                if (e.type === I.TYPE.ATTRIBUTE) {
                                    const t = e.alias,
                                        n = e.access;
                                    o.attributes[t] = o.attributes[t] || {}, o.attributes[t]
                                        [n] = e, o.attributes[t].instanceMethod = e.instanceMethod
                                } else if (e.type === I.TYPE.EVENT) {
                                    const t = e.alias;
                                    o.events[t] = e
                                }
                                l ? r[l] && !t || (r[l] = e, global.Env && "trace" ===
                                        global.Env.logLevel && console.trace(
                                            `### App Framework ### 注册模块 ${n} 接口---- ${l}`)) :
                                    console.warn(
                                        `### App Framework ### 模块 ${n} 的接口没有name属性`)
                            })
                        })
                    }(e), console.record(
                        `### App Performance ### 注册模块[PERF:registerMod]结束：${(new Date).toJSON()}`)
            },
            execInvokeCallback: function(e) {
                "string" == typeof e && (e = JSON.parse(e));
                const t = function(e) {
                    const t = C[e];
                    return t && !0 === t.preserved || (C[e] = void 0), t
                }(e.callback);
                if (global.Env && "trace" === global.Env.logLevel && console.trace(
                        "### App Framework ### 处理invoke回调----", JSON.stringify(t)), t) {
                    const n = function(e) {
                        return R[e]
                    }(t.instance);
                    if (n) {
                        const o = [n, e.callback, e.data, t.preserved];
                        return n._callbacks ? n.invoke(...o) : new Error(
                            `execInvokeCallback: 回调函数所属对象已经无效 "${n.id}"`)
                    }
                }
                return new Error(`execInvokeCallback: 无效invoke回调Id "${t&&t.instance}"`)
            },
            registerManifest: function(e) {
                console.record(
                    `### App Performance ### 注册manifest[PERF:registerManifest]开始：${(new Date).toJSON()}`
                ), global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### 注册manifest：${JSON.stringify(e)}`), "string" == typeof e && (
                    e = JSON.parse(e)), X = e || {}
            },
            getManifestField: function(e) {
                const t = e.split(".");
                let n = X;
                for (let e = 0, o = t.length; e < o && null != (n = n[t[e]]); e++);
                return n
            },
            isRpkMinPlatformVersionGEQ: function(e) {
                return X.minPlatformVersion >= e
            },
            isRpkDebugMode: function() {
                return null !== Z ? Z : (Z = !1, X.config && !0 === X.config.debug && (Z = !0), Z)
            }
        }
    };
    class re {
        constructor(e, t = {
            bubbles: !1,
            cancelable: !1
        }) {
            if (arguments.length > 1 && "object" != typeof t) throw new Error(
                `### App Runtime ### addEventListener() 参数2传递的话，必须是对象：${t}`);
            this._type = e, this._bubbles = t.bubbles, this._cancelable = t.cancelable, this._target = null,
                this._currentTarget = null, this._eventPhase = re.NONE, this._defaultPrevented = !1, this._timeStamp =
                Date.now(), this._supportW3C = !0, this._flagStopPropagation = !1, this._flagStopImmediatePropagation = !
                1, this._throwError = !0, this._listenNodes = {}
        }
        get type() {
            return this._type
        }
        get bubbles() {
            return this._bubbles
        }
        get cancelable() {
            return this._cancelable
        }
        get target() {
            return this._target
        }
        get currentTarget() {
            return this._currentTarget
        }
        get eventPhase() {
            return this._eventPhase
        }
        get defaultPrevented() {
            return this._defaultPrevented
        }
        get timeStamp() {
            return this._timeStamp
        }
        stopPropagation() {
            this._flagStopPropagation = !0
        }
        stopImmediatePropagation() {
            this._flagStopImmediatePropagation = !0, this.stopPropagation()
        }
        preventDefault() {
            throw new Error("### App Runtime ### preventDefault() 暂不支持该方法")
        }
        toJSON() {
            return {
                type: this._type,
                target: this._target,
                currentTarget: this._currentTarget,
                timeStamp: this._timeStamp
            }
        }
    }
    re.NONE = 0, re.CAPTURING_PHASE = 1, re.AT_TARGET = 2, re.BUBBLING_PHASE = 3;
    class le extends re {
        constructor() {
            super(...arguments), this._touches = null, this._changedTouches = null
        }
        get touches() {
            return this._touches
        }
        set touches(e) {
            if (this._touches) throw new Error("### App Framework ### TouchEvent 不支持修改 touches 属性");
            this._touches = e
        }
        get changedTouches() {
            return this._changedTouches
        }
        set changedTouches(e) {
            if (this._changedTouches) throw new Error(
                "### App Framework ### TouchEvent 不支持修改 changedTouches 属性");
            this._changedTouches = e
        }
        toJSON() {
            const e = super.toJSON();
            return Object.assign(e, {
                touches: this._touches,
                changedTouches: this._changedTouches
            })
        }
    }
    const se = {
            HTML_ID: "-1"
        },
        ie = {
            UNKNOWN: 0,
            ELEMENT: 1,
            ATTR: 2,
            TEXT: 3,
            COMMENT: 8,
            DOCUMENT: 9,
            DOCUMENT_FRAGMENT: 11,
            FIGMENT: 101
        };
    let ae = 1;
    class ce {
        constructor() {
            this._nodeType = ce.NodeType.UNKNOWN, this._nodeName = null, this._nodeValue = null, this._ownerDocument =
                null, this._textContent = null, this.ref = (ae++).toString(), this.childNodes = [], this.layoutChildren = [],
                this.parentNode = null, this.nextSibling = null, this.previousSibling = null, this._docId =
                null, this._layout = !1, this._render = !1, this._renderCount = null
        }
        get nodeType() {
            return this._nodeType
        }
        get nodeName() {
            return this._nodeName
        }
        get nodeValue() {
            return this._nodeValue
        }
        get ownerDocument() {
            return this._ownerDocument
        }
        get textContent() {
            return this._textContent
        }
        set textContent(e) {
            if (this.nodeType !== ce.NodeType.TEXT) {
                const t = this.ownerDocument.createTextNode(e);
                this.appendChild(t)
            } else this._textContent = e
        }
    }
    ce.NodeRef = se, ce.NodeType = ie;
    const ue = {};

    function pe(e) {
        return ue[e]
    }

    function de(e) {
        const t = pe(e);
        return t && t.listener ? t.listener : null
    }

    function he(e, t) {
        if (e._docId === t) return;
        const n = pe(t);
        if (n) {
            e._docId = t, n._nodeMap[e.ref] = e;
            for (let t = 0, n = e.childNodes.length; t < n; t++) he(e.childNodes[t], e._docId)
        }
    }

    function fe(e, t) {
        e.parentNode = t, t._docId && (he(e, t._docId), e._depth = t._depth + 1);
        for (let t = 0, n = e.childNodes.length; t < n; t++) fe(e.childNodes[t], e)
    }

    function ge(e, t, n, o) {
        n < 0 && (n = 0);
        const r = t[n - 1],
            l = t[n];
        return t.splice(n, 0, e), o && (r && (r.nextSibling = e || null), e.previousSibling = r || null, e.nextSibling =
            l || null, l && (l.previousSibling = e || null)), n
    }

    function me(e, t, n) {
        const o = t.indexOf(e);
        if (!(o < 0)) {
            if (n) {
                const n = t[o - 1],
                    r = t[o + 1];
                n && (n.nextSibling = r || null), r && (r.previousSibling = n || null), e.previousSibling = null, e
                    .nextSibling = null
            }
            t.splice(o, 1)
        }
    }

    function be(e, t, n, o) {
        const r = t.indexOf(e);
        if (r < 0 || r === n) return -1;
        me(e, t, o);
        let l = n;
        return r <= n && (l = n - 1), ge(e, t, l, o), n
    }
    let ve = 1;
    const Ee = /^data.+/;

    function ye(e, t) {
        const n = [],
            o = Object.assign({}, t);
        if (e)
            for (let t = 0, r = e.length; t < r; t++) {
                const r = e[t];
                o.hasOwnProperty(r.name) ? (n.push({
                    name: P(r.name),
                    value: o[r.name],
                    disabled: !1
                }), delete o[r.name]) : r.disabled && n.push({
                    name: P(r.name),
                    value: r.value,
                    disabled: r.disabled
                })
            }
        for (const e in o) n.push({
            name: P(e),
            value: o[e],
            disabled: !1
        });
        return n
    }
    const _e = {};

    function we(e) {
        "string" == typeof e && (e = JSON.parse(e)), Array.isArray(e) || (e = [e]), e.forEach(e => {
            if (!e) return;
            e.name || (e.name = e.type, delete e.type), e.methods = e.methods || [], global.Env && "trace" ===
                global.Env.logLevel && console.trace("### App Runtime ### 注册组件---- ", JSON.stringify(e));
            let t = _e[e.name];
            t ? t.methods = Array.from(new Set(t.methods.concat(e.methods))) : (t = _e[e.name] = JSON.parse(
                JSON.stringify(e))).def = {}
        })
    }

    function Ae(e) {
        return _e[e]
    }

    function Ne(e) {
        return e._attr
    }

    function $e(e) {
        return e._style
    }

    function Pe(e, t = !0, n = !1, o = !1) {
        if (e.nodeType === ie.ELEMENT) {
            const r = {
                    ref: e.ref.toString(),
                    type: e._type
                },
                l = function(e) {
                    if (e._styleObjectId) return e._styleObjectId;
                    let t = e;
                    for (; t && !t._styleObjectId;) t = t.parentNode;
                    return t && (e._styleObjectId = t._styleObjectId), e._styleObjectId
                }(e);
            l && (r.prop = {
                _styleObjectId: l
            }), n && e._styleObject && (r.styleObject = e._styleObject), e._useParentStyle && (r.prop = r.prop ||
                {}, r.prop._useParentStyle = !0);
            const s = Ne(e);
            if (s && Object.keys(s).length) {
                r.attr = {};
                for (const e in s) {
                    const t = s[e];
                    r.attr[e] = -1 !== [null, void 0].indexOf(t) ? "" : t
                }
            }
            const i = $e(e);
            if (i && Object.keys(i).length && (r.inlineStyle = i), o) {
                const t = function(e) {
                    return e.mergedStyle
                }(e);
                t && Object.keys(t).length && (r.style = t)
            }
            const a = Object.keys(e._eventTargetListeners || {});
            a && a.length && (r.event = a);
            const c = e.layoutChildren || e.childNodes;
            if (t && c && c.length) {
                const e = [];
                for (let r = 0, l = c.length; r < l; r++) {
                    const l = c[r],
                        s = Pe(l, t, n, o);
                    Oe(l) ? e.push(s) : e.push.apply(e, s)
                }
                r.children = e
            }
            return r
        }
        if (e.nodeType === ie.FIGMENT) {
            const r = [];
            if (t && e.layoutChildren && e.layoutChildren.length)
                for (let l = 0, s = e.layoutChildren.length; l < s; l++) {
                    const s = e.layoutChildren[l],
                        i = Pe(s, t, n, o);
                    s.nodeType === ie.FIGMENT ? r.push.apply(r, i) : r.push(i)
                }
            return r
        }
        if (e.nodeType === ie.COMMENT) return [];
        global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### getNodeAsJSON() 忽略该类型(${e.nodeType})的节点序列化`)
    }

    function Se(e) {
        return e._layout
    }

    function Oe(e) {
        return e._render
    }

    function Te(e, t = !1) {
        let n = t ? e : e.parentNode;
        for (; n && !Oe(n);) n = n.parentNode;
        return n
    }

    function ke(e) {
        if (null !== e._renderCount) return e._renderCount;
        let t = Oe(e) ? 1 : 0;
        if (Se(e) && !Oe(e))
            for (let n = 0, o = e.layoutChildren.length; n < o; n++) t += ke(e.layoutChildren[n]);
        return e._renderCount = t, t
    }

    function Ce(e) {
        let t = e;
        for (; t;) t._renderCount = null, t = t.parentNode
    }

    function Re(e) {
        const t = e.parentNode;
        if (e.nodeType === ie.DOCUMENT || e.ref === se.HTML_ID) return 0;
        if (!t || !Se(e)) return -1;
        const n = Fe(e, t);
        let o = 0;
        return Oe(t) || (o = Re(t)), n < 0 || o < 0 ? -1 : n + o
    }

    function Fe(e, t) {
        if (!t.layoutChildren || t.layoutChildren.length <= 0) return -1;
        const n = t.layoutChildren.indexOf(e);
        if (n > 0) {
            let e = 0;
            for (let o = 0, r = n; o < r; o++) e += ke(t.layoutChildren[o]);
            return e
        }
        return n
    }

    function Ie(e) {
        delete e._depth, delete e._tmpRenderIndexInParent, delete e._eventTargetListeners, delete e._bindWatcherList,
            delete e._vm,
            function(e) {
                if (delete e._docId, delete e._layout, delete e._render, delete e._renderCount, delete e.nextSibling,
                    delete e.previousSibling, delete e.parentNode, e.childNodes)
                    for (let t = e.childNodes.length - 1; t >= 0; t--) Le(e.childNodes[t]);
                delete e.layoutChildren, delete e.childNodes, delete e._content, delete e._ownerDocument, global.Env &&
                    "trace" === global.Env.logLevel && console.trace(
                        `### App Runtime ### 销毁节点：节点(${e.ref})剩余属性有：[${Object.keys(e).join(", ")}]`)
            }(e)
    }

    function Le(e) {
        global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Runtime ### 销毁元素：${JSON.stringify(Pe(e,!1,!1,!1))}`), delete e._classList, delete e._styleObject,
            delete e._styleObjectId, delete e._useParentStyle, delete e._usedCSSPropertyCache, delete e._matchedCssRuleCache,
            delete e._mergedStyleCache, delete e._ownCssRuleCache, delete e._attr, delete e._style, delete e._dataset,
            Ie(e)
    }

    function Me(e, t, n) {
        n instanceof Object || (n = {
            capture: !!n
        });
        const o = t.type,
            r = e._eventTargetListeners[o],
            l = n.capture ? re.CAPTURING_PHASE : re.BUBBLING_PHASE;
        if (r && r[l] && r[l].list) {
            const n = r[l].list;
            for (let o = 0, r = n.length; o < r; o++) {
                const r = n[o];
                t._target = e, global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### fireTargetEventListener() 事件响应:${t.type}，节点:${e.ref}`), r && (r.call(t
                    .target, t), t._listenNodes[t.target.ref] = !0)
            }
        }
    }
    class je extends ce {
        constructor() {
            super(...arguments), this._eventTargetListeners = {}
        }
        addEventListener(e, t, n) {
            if (arguments.length < 2) throw new Error(
                `### App Runtime ### addEventListener() 至少需要传递两个参数:${arguments.length}`);
            if ("string" != typeof e) throw new Error("### App Runtime ### addEventListener() 参数1必须是字符串，事件类型");
            if ("function" != typeof t) throw new Error("### App Runtime ### addEventListener() 参数2必须是函数，监听事件");
            global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### addEventListener() 节点(${this.ref})注册事件(${e})`), n instanceof Object ||
                (n = {
                    capture: !!n,
                    once: !1,
                    passive: !1
                });
            const o = n.capture ? re.CAPTURING_PHASE : re.BUBBLING_PHASE,
                r = this._eventTargetListeners[e] = this._eventTargetListeners[e] || {};
            if (r[o] = r[o] || {}, r[o].list = r[o].list || [], r[o].hash = r[o].hash || {}, -1 === r[o].list.indexOf(
                    t)) {
                const e = r[o].list.push(t);
                r[o].hash[e - 1] = {
                    capture: !!n.capture,
                    once: !!n.once,
                    passive: !!n.passive
                }
            }
            const l = de(this._docId);
            l && l.addEvent(this.ref, e)
        }
        removeEventListener(e, t, n) {
            if (arguments.length < 2) throw new Error(
                `### App Runtime ### addEventListener() 至少需要传递两个参数:${arguments.length}`);
            if ("string" != typeof e) throw new Error("### App Runtime ### addEventListener() 参数1必须是字符串，事件类型");
            if ("function" != typeof t) throw new Error("### App Runtime ### addEventListener() 参数2必须是函数，监听事件");
            global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### Element ${this.ref} 执行 removeEventListener(${e})---- `), n instanceof Object ||
                (n = {
                    capture: !!n
                });
            const o = n.capture ? re.CAPTURING_PHASE : re.BUBBLING_PHASE,
                r = this._eventTargetListeners[e] = this._eventTargetListeners[e] || {};
            r[o] = r[o] || {}, r[o].list = r[o].list || [], r[o].hash = r[o].hash || {};
            const l = r[o].list.indexOf(t); - 1 !== l && (r[o].list.splice(l, 1), r[o].hash[l] = null), 0 ===
                r[o].list.length && (r[o] = null)
        }
        dispatchEvent(e) {
            if (!(e instanceof re)) throw new Error("### App Runtime ### dispatchEvent() 参数1所属类必须是事件类");
            if (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### dispatchEvent() 执行事件:${e.type}, 来自节点:${this.ref}`), e._supportW3C) {
                e._target = this;
                const t = e.type,
                    n = function(e, t = !1) {
                        const n = [];
                        let o = Te(e, t);
                        for (; o;) n.push(o), o = Te(o);
                        return n
                    }(this, !0),
                    o = n.slice().reverse().concat(n);
                if (o[0] && o[0].parentNode === o[0].ownerDocument) {
                    const e = o[0].ownerDocument;
                    o.unshift(e), o.push(e)
                }
                for (; o.length > 0;) {
                    const n = o[0],
                        r = o.indexOf(n),
                        l = o.indexOf(this);
                    if (e._eventPhase = r < l ? re.CAPTURING_PHASE : r === l ? re.AT_TARGET : re.BUBBLING_PHASE,
                        e._currentTarget = n, !e.bubbles && e.eventPhase === re.BUBBLING_PHASE) break;
                    global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Runtime ### dispatchEvent() 执行事件:${t}, 阶段:${e.eventPhase}, Target:${e.target.ref}, CurrentTarget:${e.currentTarget.ref}`
                    );
                    const s = n._eventTargetListeners[t];
                    let i = e.eventPhase;
                    if (e.target === e.currentTarget && (i = n === o[1] ? re.CAPTURING_PHASE : re.BUBBLING_PHASE),
                        s && s[i] && s[i].list) {
                        const t = s[i].hash,
                            o = s[i].list.slice();
                        for (let r = 0, l = o.length; r < l && !e._flagStopImmediatePropagation; r++) {
                            const l = o[r];
                            try {
                                global.Env && "trace" === global.Env.logLevel && console.trace(
                                    `### App Runtime ### dispatchEvent() 事件响应:${e.type}，阶段:${e.eventPhase}`
                                ), l && (l.call(e.currentTarget, e), e._listenNodes[e.currentTarget.ref] = !
                                    0)
                            } catch (t) {
                                console.error(
                                    `### App Runtime ### dispatchEvent() 事件响应:${e.type}，阶段:${e.eventPhase}, JS报错:`,
                                    t.message, l), console.error(t.stack), e._throwError && global.setTimeout(
                                    () => {
                                        throw t
                                    }, 0)
                            }
                            t[r] && t[r].once && n.removeEventListener(e.type, l, t[r])
                        }
                    }
                    if (e._flagStopImmediatePropagation || e._flagStopPropagation) break;
                    o.shift()
                }
                e._currentTarget = null
            } else Me(this, e);
            if ("click" === e.type && global.Env && global.Env.engine === global.ENGINE_TYPE.CARD) {
                const t = de(this._docId);
                t && t.collectStatistics({
                    type: e.type,
                    ref: this.ref,
                    listeners: Object.keys(e._listenNodes)
                })
            }
            e._listenNodes = {}
        }
    }

    function xe(e) {
        if (e.nodeType === ce.NodeType.ELEMENT && e._docId)
            for (let t = 0, n = e.layoutChildren.length; t < n; t++) xe(e.layoutChildren[t])
    }

    function Je(e, t, n) {
        if (t.nodeType === ce.NodeType.DOCUMENT_FRAGMENT) {
            const o = t.childNodes.slice();
            for (let r = 0, l = o.length; r < l; r++) t.removeChild(o[r]), Je(e, o[r], n);
            return t
        }
        const o = Te(e, !0),
            r = n ? e.childNodes.indexOf(n) : e.childNodes.length,
            l = de(e._docId);
        if (t.nodeType === ce.NodeType.TEXT) throw new Error(
            `### App Runtime ### 不支持在非渲染节点中添加文本节点：${t.textContent}`);
        if (t.parentNode) {
            if (be(t, e.childNodes, r, !0), Se(t))
                if (n) {
                    const r = be(t, e.layoutChildren, e.layoutChildren.indexOf(n));
                    Ce(e);
                    const s = Re(t);
                    if (l && r >= 0) return l.moveNode(t, o, s)
                } else {
                    const n = be(t, e.layoutChildren, e.layoutChildren.length);
                    Ce(e);
                    const r = Re(t);
                    if (l && n >= 0) return l.moveNode(t, o, r)
                }
        } else if (fe(t, e), ge(t, e.childNodes, r, !0), xe(t), Se(t))
            if (n) {
                ge(t, e.layoutChildren, e.layoutChildren.indexOf(n)), Ce(e);
                const r = Re(t);
                if (l) return l.addNode(t, o, r)
            } else {
                ge(t, e.layoutChildren, e.layoutChildren.length), Ce(e);
                const n = e === o ? -1 : Re(t);
                if (l) return l.addNode(t, o, n)
            }
    }
    class De extends je {
        constructor() {
            super(...arguments), this._depth = null, this._tmpRenderIndexInParent = null
        }
        appendChild(e) {
            if (!(e && e instanceof ce)) throw new Error("### App Runtime ### appendChild() 函数的node参数无效");
            if (e.parentNode && e.parentNode !== this) throw new Error(
                "### App Runtime ### appendChild() 参数node的父节点不匹配");
            return Je(this, e, null)
        }
        insertBefore(e, t) {
            if (!(e && 2 === arguments.length && e instanceof ce)) throw new Error(
                "### App Runtime ### insertBefore() 函数的node/before参数无效");
            if (e.parentNode && e.parentNode !== this) throw new Error(
                "### App Runtime ### insertBefore() 参数node的父节点不匹配");
            return e === t || e.nextSibling && e.nextSibling === t ? e : Je(this, e, t)
        }
        removeChild(e) {
            if (!(e && e instanceof ce)) throw new Error("### App Runtime ### removeChild() node参数无效");
            if (e.parentNode !== this) throw new Error("### App Runtime ### removeChild() 参数node的父节点不匹配");
            if (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### removeChild() 移除节点：${JSON.stringify(Pe(e,!1,!1,!1))}`), Ce(e), e.parentNode =
                null, Se(e)) {
                if (Oe(e)) {
                    const t = de(e._docId);
                    t && t.removeElement(e.ref)
                } else {
                    const t = e.childNodes.slice();
                    for (let n = 0; n < t.length; n++) e.removeChild(t[n])
                }
                me(e, this.layoutChildren)
            }
            return me(e, this.childNodes, !0),
                function e(t, n) {
                    if (t._docId !== n) return;
                    const o = pe(n);
                    if (o) {
                        for (let n = 0, o = t.childNodes.length; n < o; n++) e(t.childNodes[n], t._docId);
                        t._depth = null, o._nodeMap[t.ref] = null, t._docId = null
                    }
                }(e, e._docId), e
        }
        toJSON() {
            return Pe(this, !0, !1, !1)
        }
    }
    class Be extends De {
        constructor(e) {
            super(...arguments), this._nodeType = ce.NodeType.COMMENT, this._nodeName = "#comment", this._nodeValue =
                e, this._layout = !0, this._render = !1, this._data = e
        }
        get data() {
            return this._data
        }
        set data(e) {
            const t = "" + e;
            return this._nodeValue = t, this._data = t, this._data
        }
        appendChild(e) {
            throw new Error("### App Runtime ### appendChild() 注释节点不支持插入子节点")
        }
        insertBefore(e, t) {
            throw new Error("### App Runtime ### insertBefore() 注释节点不支持插入子节点")
        }
        toString() {
            return "\x3c!-- " + this._data + " --\x3e"
        }
    }

    function He(e, t, n, o) {
        if (!e._ownerDocument || "ref" === t) return;
        if (!O(n) && Ne(e)[t] === n && !1 !== o) return;
        if ("class" === t) e._classList = null;
        else if (Ee.test(t)) {
            const o = t.replace(/[A-Z]/g, e => "-" + e.toLowerCase()).replace(/^data-/, "").replace(/-([a-z])/g, (e,
                t) => t.toUpperCase());
            e._dataset[o] = n
        }
        const r = Ne(e)[t];
        Ne(e)[t] = n, global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### 元素的属性(${t})更新(${r}=>${n})`), qe(e, o, t, n)
    }

    function Ue(e, t, n) {
        if (!e._ownerDocument) return;
        if (t = t || "", $e(e) === t && !1 !== n) return;
        ! function(e, t) {
            e._style = t || {}
        }(e, "string" == typeof t ? function(e) {
            const t = {};
            return e.split(";").filter(e => e.trim()).forEach(e => {
                const n = e.indexOf(":");
                let o = e.substring(0, n).trim();
                o = A(o);
                const r = e.substring(n + 1).trim();
                t[o] = r
            }), global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Runtime ### 元素的样式转换：${e} 为${JSON.stringify(t)}`), t
        }(t) : t), qe(e, n, "style")
    }

    function qe(e, t, n, o, r) {
        const l = de(e._docId);
        l && ("class" === n ? !t && l.setStyles(e.ref, null, {
            class: o
        }) : "id" === n ? !t && l.setStyles(e.ref, null, {
            id: o
        }) : "style" === n ? r ? !t && l.setStyle(e.ref, ...r) : !t && l.setStyles(e.ref, $e(e)) : !t && l.setAttr(
            e.ref, n, o))
    }
    class ze extends De {
        constructor(e) {
            super(...arguments), this._nodeType = ce.NodeType.ELEMENT, this._nodeName = e.toUpperCase(), this._tagName =
                e.toUpperCase(), this._type = e, this._attr = {}, this._style = {}, this._dataset = {}, this._layout = !
                0, this._render = !0, this._classList = null, this._styleObject = null, this._styleObjectId =
                null, this._useParentStyle = null, this._usedCSSPropertyCache = {}, this._matchedCssRuleCache = {},
                this._mergedStyleCache = null, this._ownCssRuleCache = {}
        }
        get style() {
            return this._style
        }
        get type() {
            return console.warn("### App Runtime ### type属性将被废弃，不推荐使用"), this._type
        }
        get id() {
            console.warn("### App Runtime ### id属性将被废弃，不推荐使用");
            const e = Ne(this);
            return e && e.id
        }
        get dataset() {
            return this._dataset
        }
        get attr() {
            return console.warn("### App Runtime ### attr属性将被废弃，不推荐使用"), Ne(this)
        }
        get tagName() {
            return this._tagName
        }
        get mergedStyle() {
            return null
        }
        appendChild(e) {
            return e.nodeType === ce.NodeType.TEXT ? (He(this, "value", e.textContent), fe(e, this), e) : super
                .appendChild(e)
        }
        insertBefore(e, t) {
            return e.nodeType === ce.NodeType.TEXT ? (He(this, "value", e.textContent), fe(e, this), e) : super
                .insertBefore(e, t)
        }
        hasAttribute(e) {
            const t = Ne(this);
            return t && t.hasOwnProperty(e)
        }
        toString() {
            const e = Ne(this),
                t = $e(this);
            return "<" + this._type + " attr=" + JSON.stringify(e) + " style=" + JSON.stringify(t) + ">" + this
                .layoutChildren.map(e => e.toString()).join("") + "</" + this._type + ">"
        }
    }
    class We extends De {
        constructor() {
            super(...arguments), this._nodeType = ce.NodeType.DOCUMENT_FRAGMENT, this._nodeName =
                "#document-fragment", this._layout = !0, this._render = !1
        }
    }
    class Ge extends De {
        constructor() {
            super(...arguments), this._nodeType = ce.NodeType.FIGMENT, this._nodeName = "#figment", this._layout = !
                0, this._render = !1
        }
        toString() {
            let e = "";
            return this.childNodes.length && (e = this.childNodes.map(e => e.toString()).join("")), e
        }
    }
    class Ve extends De {
        constructor(e) {
            super(...arguments), this._nodeType = ce.NodeType.TEXT, this._nodeName = "#text", this._textContent =
                e, this._wholeText = e, this._layout = !1, this._render = !1
        }
        get wholeText() {
            return this._wholeText
        }
        appendChild(e) {
            throw new Error("### App Runtime ### appendChild() 文本节点不支持插入子节点")
        }
        insertBefore(e, t) {
            throw new Error("### App Runtime ### insertBefore() 文本节点不支持插入子节点")
        }
    }
    class Ye extends ze {
        constructor() {
            super(...arguments), this.ref = ce.NodeRef.HTML_ID, this._depth = 0
        }
        appendChild(e) {
            return function(e, t, n) {
                if (e.layoutChildren.length > 0 || t.parentNode) return void console.warn(
                    "### App Runtime ### Document添加多个Body节点----");
                const o = pe(e._docId),
                    r = e.childNodes,
                    l = r.indexOf(n);
                l < 0 ? r.push(t) : r.splice(l, 0, t), Se(t) ? (he(t, t._docId), fe(t, e), ge(t, e.layoutChildren,
                        e.layoutChildren.length), Ce(e), xe(t), o.body = t, de(e._docId).createBody(t)) :
                    fe(t, e)
            }(this, e)
        }
        insertBefore(e, t) {
            console.warn("### App Runtime ### 暂不支持nodeHtml.insertBefore()")
        }
    }
    class Xe extends ze {
        get value() {
            return this._attr && this._attr.value
        }
        set value(e) {
            this._attr && (this._attr.value = e)
        }
        get checked() {
            return this._attr && this._attr.checked
        }
        set checked(e) {
            this._attr && (this._attr.checked = e)
        }
    }
    const Ze = /^(touchstart|touchmove|touchcancel|touchend)$/,
        Ke = /^(touchstart|touchmove|touchcancel|touchend|click|longpress)$/;

    function Qe(e, t) {
        let n;
        return Ze.test(e) ? (n = new le(e, t))._supportW3C = !1 : (n = new re(e, t))._supportW3C = !1, Ke.test(e) &&
            global.isRpkMinPlatformVersionGEQ(1040) && (n._supportW3C = !0, n._bubbles = !0), n
    }

    function et(e) {
        const t = new Ye("html");
        return t._ownerDocument = e, he(t, e._docId), t.parentNode = e, e.childNodes.push(t), e.layoutChildren.push(
            t), t
    }
    class tt extends De {
        constructor(e, t) {
            var n, o;
            super(...arguments), this._nodeType = ce.NodeType.DOCUMENT, this._nodeName = "#document", this.body =
                null, e = e ? e.toString() : "", this._docId = e, this._nodeMap = {}, this.listener = t, this._styleSheetHash = {},
                this._styleSheetHash[0] = [], this._styleObjectMap = new Map, n = this._docId, o = this, n && (
                    ue[n] = o), Object.defineProperty(this, "documentElement", {
                    configurable: !0,
                    enumerable: !1,
                    writable: !1,
                    value: et(this)
                })
        }
        createElement(e) {
            let t;
            return (t = "input" === e || "textarea" === e ? new Xe(e) : new ze(e))._ownerDocument = this, t
        }
        createDocumentFragment() {
            const e = new We;
            return e._ownerDocument = this, e
        }
        createTextNode(e) {
            const t = new Ve(e);
            return t._ownerDocument = this, t
        }
        createComment(e) {
            const t = new Be(e);
            return t._ownerDocument = this, t
        }
        createEvent(e, t) {
            return Qe(e, t)
        }
    }

    function nt(e, t = []) {
        return {
            module: "dom",
            method: e,
            args: t
        }
    }
    class ot {
        constructor(e, t) {
            this.id = e, this.streamer = t, this.actionLen = 0
        }
        createFinish(e) {
            global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Runtime ### createFinish---- ");
            const t = this.streamer.over(this.id, [nt("createFinish")], e);
            return this.resetActionLen(), t
        }
        updateFinish(e) {
            global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Runtime ### updateFinish---- ");
            const t = this.streamer.over(this.id, [nt("updateFinish")], e);
            return this.resetActionLen(), t
        }
        createBody(e) {
            const t = Pe(e, !0, !0, !1),
                n = t.children;
            delete t.children;
            const o = [nt("createBody", [t])];
            return n && o.push.apply(o, n.map(e => nt("addElement", [t.ref, e, -1]))), this.addActions(o)
        }
        addNode(e, t, n) {
            let o;
            if (t && Oe(t) || console.error(`### App Runtime ### addNode的parent(${t.type})必须是可渲染节点`), n < 0 &&
                (n = -1), Oe(e)) o = this.addElement(e, t.ref, n);
            else {
                let r = n;
                e.layoutChildren.every(e => (o = Oe(e) ? this.addElement(e, t.ref, r) : this.addNode(e, t, r),
                    r += ke(e), -1 !== o))
            }
            return o
        }
        addElement(e, t, n) {
            return n >= 0 || (n = -1), this.addActions(nt("addElement", [t, Pe(e, !0, !0, !1), n]))
        }
        removeNode(e) {
            let t;
            return Oe(e) ? t = this.removeElement(e.ref) : e.layoutChildren.every(e => -1 !== (t = Oe(e) ? this
                .removeElement(e.ref) : this.removeNode(e))), t
        }
        removeElement(e) {
            if (Array.isArray(e)) {
                const t = e.map(e => nt("removeElement", [e]));
                return this.addActions(t)
            }
            return this.addActions(nt("removeElement", [e]))
        }
        moveNode(e, t, n) {
            let o;
            if (t && Oe(t) || console.error("### App Runtime ### moveNode的parent必须是可渲染节点"), n >= 0 || (n = -1),
                Oe(e)) o = this.moveElement(e.ref, t.ref, n);
            else {
                let r = n;
                e.layoutChildren.every(e => (o = Oe(e) ? this.moveElement(e.ref, t.ref, r) : this.moveNode(e, t,
                    r), r += ke(e), -1 !== o))
            }
            return o
        }
        moveElement(e, t, n) {
            return this.addActions(nt("moveElement", [e, t, n]))
        }
        setProp(e, t, n) {
            const o = {
                prop: {}
            };
            return o.prop[t] = n, this.addActions(nt("updateProps", [e, o]))
        }
        setAttr(e, t, n) {
            const o = {
                attr: {}
            };
            return null == n ? (console.warn(
                    `### App Runtime ### 组件 ${e} 的属性 ${t} 被修改为 undefined/null, 自动修改为默认值或空值`), o.attr[t] =
                "") : o.attr[t] = n, this.addActions(nt("updateAttrs", [e, o]))
        }
        setStyle(e, t, n) {
            const o = {
                style: {}
            };
            return null == n ? (console.warn(
                    `### App Runtime ### 组件 ${e} 的样式 ${t} 被修改为 undefined/null, 自动修改为默认值或空值`), o.style[t] =
                "") : o.style[t] = n, this.addActions(nt("updateStyle", [e, o]))
        }
        setStyles(e, t, n) {
            const o = {
                attr: n
            };
            return t && (o.style = t), this.addActions(nt("updateStyles", [e, o]))
        }
        setStyleObject(e, t, n, o, r) {
            return this.addActions(nt("updateStyleObject", [e, t, n, o, r]))
        }
        addEvent(e, t) {
            return this.addActions(nt("addEvent", [e, t]))
        }
        removeEvent(e, t) {
            return this.addActions(nt("removeEvent", [e, t]))
        }
        updatePageTitleBar(e) {
            return this.addActions(nt("updateTitleBar", [e]))
        }
        updatePageStatusBar(e) {
            return this.addActions(nt("updateStatusBar", [e]))
        }
        scrollTo(e) {
            return this.addActions(nt("scrollTo", [e]))
        }
        scrollBy(e) {
            return this.addActions(nt("scrollBy", [e]))
        }
        exitFullscreen() {
            return this.addActions(nt("exitFullscreen", []))
        }
        collectStatistics(e) {
            return this.addActions(nt("statistics", [e]))
        }
        invokeComponentMethod(e, t, n, o) {
            return this.addActions({
                component: e,
                ref: t,
                method: n,
                args: o
            })
        }
        addActions(e) {
            Array.isArray(e) || (e = [e]), global.Env && "trace" === global.Env.logLevel && console.trace(
                    "### App Runtime ### addActions---- ", JSON.stringify(e)), this.actionLen += e.length, this
                .streamer.push(this.id, e)
        }
        hasActions() {
            return !!this.actionLen
        }
        resetActionLen() {
            this.actionLen = 0
        }
    }
    class rt {
        constructor(e, t) {
            this.call = e, this.batchThreshold = void 0 === t ? 50 : t, this._boolDefineNextTick = !0, this.list = []
        }
        push(e, t) {
            let n;
            if (0 === this.batchThreshold) this.list.push.apply(this.list, t);
            else if (1 === this.batchThreshold) this.list.push.apply(this.list, t), n = this.call(e, this.list),
                this.list.splice(0);
            else {
                if (!(this.batchThreshold > 1)) throw new Error(
                    `### App Runtime ### push() 不支持的batchThreshold值：${this.batchThreshold}`);
                for (this.list.push.apply(this.list, t); this.list.length >= this.batchThreshold;) {
                    const t = this.list.splice(0, this.batchThreshold);
                    n = this.call(e, t)
                }
            }
            return this._boolDefineNextTick && this._defineNextTick(e), n
        }
        over(e, t) {
            return this.list.length && (this.call(e, this.list), this.list.splice(0)), this.call(e, t)
        }
        _defineNextTick(e) {
            this._nextTick || (this._nextTick = Promise.resolve().then(() => {
                this.list.length && console.warn(
                        `### App Runtime ### _defineNextTick(${e}) 应该由框架保证及时发送`), this._nextTick =
                    null
            }))
        }
    }
    let lt = !0;
    const st = function(e, t, ...n) {
        return global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Bridge ### sendActions() 发送消息：${e},${t.length},${JSON.stringify(t)}`), lt && (console.record(
                `### App Performance ### 首次发送消息[PERF:callNative]开始(${t.length})：${(new Date).toJSON()}`),
            lt = !1), t = JSON.stringify(t, function(e, t) {
            return t && t.constructor === RegExp ? {
                type: y(t),
                source: t.source,
                flags: t.flags
            } : t
        }), global.callNative(e, t, ...n)
    };
    var it = {
        init: function() {
            Object.freeze(re), Object.freeze(re.prototype), Object.freeze(Be), Object.freeze(Be.prototype),
                Object.freeze(tt), Object.freeze(tt.prototype), Object.freeze(ze), Object.freeze(ze.prototype),
                Object.freeze(Ge), Object.freeze(Ge.prototype), Object.freeze(We), Object.freeze(We.prototype),
                Object.freeze(Ye), Object.freeze(Ye.prototype), Object.freeze(ce), Object.freeze(ce.prototype),
                Object.freeze(De), Object.freeze(De.prototype), Object.freeze(je), Object.freeze(je.prototype),
                Object.freeze(Ve), Object.freeze(Ve.prototype)
        },
        Node: ce,
        Event: re,
        TouchEvent: le,
        helper: {
            __proto__: null,
            registerComponents: we,
            getComponentDefaultOptions: Ae,
            bindComponentMethods: function(e) {
                const t = Ae(e.tagName.toLowerCase());
                if (t && t.methods) {
                    const n = t.methods.filter(e => "animate" !== e);
                    return n.forEach(function(n) {
                        e[n] || (e[n] = function(...o) {
                            const r = de(e._docId);
                            r ? (r.invokeComponentMethod(t.name, e.ref, n, o), global.Env &&
                                "trace" === global.Env.logLevel && console.trace(
                                    `### App Runtime ### 调用组件的方法：${t.name}.${n}()`,
                                    JSON.stringify(o))) : console.warn(
                                `### App Runtime ### 调用组件的方法无效：${t.name}.${n}(), 组件已销毁`
                            )
                        })
                    }), n
                }
                return []
            },
            createDocument: function(e) {
                const t = new rt(st),
                    n = new ot(e, t);
                return new tt(e, n)
            },
            registerStyleObject: function(e, t, n, o) {
                if (global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Runtime ### 基于节点(${o&&o.ref})注册样式节点(${n})`), !o._ownerDocument) return;
                let r;
                const l = t && t["@info"] || {};
                l && l.styleObjectId ? (r = l.styleObjectId, t = null) : r = function(e, t) {
                    let n;
                    const o = pe(e);
                    return o && o._styleObjectMap ? (n = o._styleObjectMap.get(t)) || (function(e) {
                        for (const t in e) {
                            const n = e[t];
                            n && n._meta && delete n._meta
                        }
                    }(t), n = ve++, o._styleObjectMap.set(t, n)) : (n = ve++, global.Env && "trace" ===
                        global.Env.logLevel && console.trace(
                            `### App Runtime ### 获取样式对象ID：文档(${e})已销毁，生成无缓存时的ID：${n}`)), n
                }(o._ownerDocument._docId, t), n || (o._styleObject = t, o._styleObjectId = r);
                const s = de(o._docId);
                s && s.setStyleObject(o.ref, n, e, r, t)
            },
            createEvent: Qe,
            createFigment: function(e) {
                const t = new Ge;
                return t._ownerDocument = e, t
            },
            updatePageTitleBar: function(e, t) {
                const n = de(e._docId);
                n && n.updatePageTitleBar(t)
            },
            updatePageStatusBar: function(e, t) {
                const n = de(e._docId);
                n && n.updatePageStatusBar(t)
            },
            scrollTo: function(e, t) {
                const n = de(e._docId);
                n && n.scrollTo(t)
            },
            scrollBy: function(e, t) {
                const n = de(e._docId);
                n && n.scrollBy(t)
            },
            exitFullscreen: function(e) {
                const t = de(e._docId);
                t && t.exitFullscreen()
            },
            setElementProp: function(e, t, n, o) {
                if (!e._ownerDocument || "ref" === t) return;
                if (e[t] === n && !1 !== o) return;
                const r = e[t];
                e[t] = n, global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### 元素的内部属性(${t})更新(${r}=>${n})`);
                const l = de(e._docId);
                l && l.setProp(e.ref, t, n)
            },
            setElementAttr: He,
            setElementStyle: function(e, t, n, o) {
                e._ownerDocument && ($e(e)[t] === n && !1 !== o || ($e(e)[t] = n, qe(e, o, "style", null, [
                    t, n
                ])))
            },
            setElementStyles: Ue,
            getElementMatchedCssRuleList: function(e, t) {
                const n = $e(e),
                    o = [{
                        editable: !0,
                        styleSheetName: null,
                        style: ye(e._inlineStyleFullList, n)
                    }],
                    r = JSON.parse(JSON.stringify(o));
                return console.warn(`### App Runtime ### 获取样式:该平台版本仅支持获取节点${e.ref}的内联样式`), r
            },
            setElementMatchedCssRule: function(e, t, n) {
                const o = {},
                    r = [];
                for (let e = 0, t = n.length; e < t; e++) {
                    const t = n[e];
                    r.push({
                        name: t.name,
                        value: t.value,
                        disabled: t.disabled
                    }), t.disabled || (o[t.name] = t.value)
                }
                "INLINE" === t ? (Ue(e, o), e._inlineStyleFullList = r, global.Env && "trace" === global.Env
                        .logLevel && console.trace(
                            `### App Runtime ### 更新样式:元素(${e.ref})的内联样式：${t}:${JSON.stringify(o)}`)) :
                    console.warn(`### App Runtime ### 更新样式:该平台版本仅支持更新内联样式，不支持：${t}`)
            },
            resetNodeChildren: function(e) {
                for (let t = 0, n = e.layoutChildren.length; t < n; t++) {
                    const n = e.layoutChildren[t];
                    n._tmpRenderIndexInParent = Fe(n, e)
                }
                e.childNodes.length = 0, e.layoutChildren.length = 0
            },
            restoreNodeChildren: function(e, t) {
                if (!t.parentNode || t.parentNode !== e) return;
                e.childNodes.push(t), e.layoutChildren.push(t);
                const n = Te(e, !0);
                if (Se(t)) {
                    const o = de(e._docId),
                        r = Re(t),
                        l = r !== t._tmpRenderIndexInParent;
                    if (t._tmpRenderIndexInParent = null, o && l) return o.moveNode(t, n, r)
                }
            },
            fireTargetEventListener: Me,
            clearTargetEventListener: function(e, t, n) {
                n instanceof Object || (n = {
                    capture: !!n
                });
                const o = n.capture ? re.CAPTURING_PHASE : re.BUBBLING_PHASE;
                e._eventTargetListeners[t] && delete e._eventTargetListeners[t][o]
            },
            getDocumentNodeByRef: function(e, t) {
                return e._nodeMap[t]
            },
            isNodeInDocument: function(e) {
                return !(!e || !e._docId)
            },
            recreateDocument: function(e) {
                const t = e.body;
                t ? e.listener.createBody(t) : console.error("### App Runtime ### Document没有body节点, 无法重建")
            },
            destroyTagNode: function(e) {
                switch (e.nodeType) {
                    case ie.DOCUMENT:
                        ! function(e) {
                            var t;
                            global.Env && "trace" === global.Env.logLevel && console.trace(
                                    "### App Runtime ### 销毁文档"), delete e._nodeMap, delete e.listener,
                                delete e._styleSheetHash, e._styleObjectMap && e._styleObjectMap.clear(),
                                delete e._styleObjectMap, e.documentElement && Le(e.documentElement),
                                delete e.documentElement, delete e.body, delete e.childNodes, delete e.layoutChildren,
                                t = e._docId, ue[t] = null, Ie(e)
                        }(e);
                        break;
                    case ie.ELEMENT:
                        Le(e);
                        break;
                    default:
                        Ie(e)
                }
            },
            getNodeAsJSON: Pe,
            getNodeDepth: function(e) {
                return e._depth
            }
        },
        exposure: {
            registerComponents: we
        }
    };
    const at = {
        initApp: "quickapp.app.initApp",
        initPage: "quickapp.page.initPage",
        destroyPage: "quickapp.page.destroyPage",
        fireEvent: "quickapp.page.fireEvent",
        onShow: "quickapp.page.onShow",
        onHide: "quickapp.page.onHide",
        onBackPress: "quickapp.page.onBackPress",
        onMenuPress: "quickapp.page.onMenuPress",
        onOrientationChange: "quickapp.page.onOrientationChange",
        onConfigurationChanged: "quickapp.page.onConfigurationChanged",
        onRefresh: "quickapp.page.onRefresh",
        callbackDone: "quickapp.page.callbackDone"
    };
    class ct {
        constructor(e, t) {
            if (t instanceof ct) return t;
            this.timestamp = Date.now(), this.detail = t, this.type = e;
            let n = !1;
            this.stop = function() {
                n = !0
            }, this.hasStopped = function() {
                return n
            }
        }
    }
    const ut = ["onCreate", "onInit", "onReady", "onRequest", "onShow", "onHide", "onDestroy", "onBackPress",
        "onMenuPress", "onOrientationChange", "onError", "onPageNotFound"
    ];
    ct.reserveEvents = ut, ct.isReservedEvent = function(e) {
        return ut.indexOf(e) >= 0
    };
    const pt = {};
    Object.setPrototypeOf(pt, new z);
    const dt = {},
        ht = [];

    function ft(e, t) {
        return Object.assign(dt, e), ht.splice(0, ht.length, ...t), gt()
    }

    function gt() {
        const e = [dt.language, dt.countryOrRegion].filter(e => !!e).join("-");
        return {
            localeObject: dt,
            resources: ht,
            locale: e
        }
    }
    let mt = null;
    class bt extends q {
        constructor(e, t) {
            super(...arguments), this._isApp = !0, this.options = t || {}, this.name = "", this.entry = "",
                this.customComponentMap = {}, this._def = null, this._data = {}, this._events = {}, this._valid = !
                0, this._plugins = [], this._pluginInstalled = !1, this._shareDocStyle = !1
        }
        $clear() {
            this.options = {}, this.name = "", this.customComponentMap = {}, this._def = null, this._data = {},
                this._events = {}, this.destroy()
        }
        get $data() {
            return O(this._data) || (this._data = {}), this._data
        }
        set $data(e) {
            const t = "function" == typeof e ? e() : e;
            t ? (this._data = this._data || {}, Object.keys(t).forEach(e => {
                ! function(e) {
                    const t = (e + "").charCodeAt(0);
                    return 36 === t || 95 === t
                }(e) ? (e in this._data && console.warn(`### App Framework ### App 全局数据 (${e}) 被覆盖`),
                    this._data[e] = t[e]) : console.error(
                    `### App Framework ### 页面数据属性名 '${e}' 非法, 属性名不能以$或_开头`)
            })) : (this._data = {}, console.warn("### App Framework ### App 全局数据被清空"))
        }
        get $def() {
            return this._def
        }
        set $def(e) {
            global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Framework ### App 元数据初始化----"), this._def = e, e.plugins || (e.plugins = []);
            const t = e.manifest;
            if (global.Env && "trace" === global.Env.logLevel && console.trace(
                    "### App Framework ### App 元数据manifest----", JSON.stringify(t)), t) {
                this.name = t.name;
                const e = t.config;
                global.Env && "trace" === global.Env.logLevel && console.trace(
                    "### App Framework ### App 元数据config----", JSON.stringify(e)), e && (this.$data = e.data,
                    this._shareDocStyle = !!e.shareDocStyle);
                const n = t.router;
                global.Env && "trace" === global.Env.logLevel && console.trace(
                    "### App Framework ### App 元数据router----", JSON.stringify(n)), n && (this.entry = n.entry ||
                    "")
            }
            for (const t in e) {
                "function" != typeof e[t] || ct.isReservedEvent(t) || (this[t] = e[t])
            }
            this.$on("applc:onDestroy", () => {
                this._valid = !1
            }), ct.reserveEvents.forEach(t => {
                this.$on(`applc:${t}`, e[t])
            }), this._defined = !0
        }
        get $valid() {
            return this._valid
        }
        getLocaleConfig() {
            return gt()
        }
        $emit(e, t) {
            const n = this._events[e];
            if (n)
                for (let o = 0; o < n.length; o++) {
                    const r = new ct(e, t);
                    n[o].call(this, r)
                }
        }
        _emit(e, t) {
            const n = this._events[e];
            if (n)
                for (let e = 0; e < n.length; e++) n[e].call(this, t)
        }
        $on(e, t) {
            if (!e || "function" != typeof t) return;
            const n = this._events;
            n[e] = n[e] || [], n[e].push(t)
        }
        $off(e) {
            if (!e) return;
            delete this._events[e]
        }
        exit() {
            null === mt && (mt = pt.platform.requireModule(this, "system.app")), mt.exit(this.id)
        }
    }
    class vt extends q {
        constructor(e, t, n, o, r) {
            super(...arguments), this._isPage = !0, this.app = t, this.name = null, this.vm = null, this.intent =
                n, this.doc = pt.runtime.helper.createDocument(e), this._valid = !0, this._visible = !1, this._meta =
                Object.assign({
                    query: r
                }, n, o), this._orientation = n.orientation
        }
        get $valid() {
            return this._valid
        }
        get $visible() {
            return this._valid && this._visible
        }
        get orientation() {
            return this._orientation
        }
        get pageName() {
            return this._meta.name
        }
        get pageComponent() {
            return this._meta.component
        }
        get query() {
            return this._meta.query
        }
        invoke(...e) {
            super.invoke(...e), this.$valid && pt.publish(at.callbackDone, [this])
        }
    }

    function Et(e, t, n = [], o) {
        if (global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Framework ### 调用页面(${e.id})的回调(${t}) 参数：`, JSON.stringify(n)), !e._callbacks) return new Error(
            `invoke: 回调函数 "${t}" 没有注册`);
        if (!e.$valid) return void console.error(`invoke: 回调函数所属对象(${e.id})已经无效, 终止回调执行`);
        const r = e._callbacks[t];
        if ("function" == typeof r) {
            const l = r(...n);
            return void 0 !== o && !1 !== o || (e._callbacks[t] = void 0), e.doc && pt.publish(at.callbackDone, [e]),
                l
        }
        return new Error(`callback: 无效回调函数Id "${t}"`)
    }

    function yt(e, t) {
        switch (y(e)) {
            case "undefined":
            case "null":
                return "";
            case "regexp":
                return e.toString();
            case "date":
                return e.toISOString();
            case "number":
            case "string":
            case "boolean":
            case "array":
                return e;
            case "object":
                if (e.nodeType) return e.ref;
                const n = {};
                for (const o in e) n[o] = yt(e[o], t);
                return n;
            case "function":
                const o = k();
                return t._callbacks ? t._callbacks[o] = e : global.Env && "trace" === global.Env.logLevel &&
                    console.trace("### App Framework ### normalize() 页面已经销毁，不再注册回调"), o.toString();
            default:
                return JSON.stringify(e)
        }
    }
    let _t = {};
    const wt = {},
        At = {},
        Nt = {};

    function $t(e) {
        Nt[e] = function(...t) {
            for (const n in _t) {
                const o = _t[n];
                o && o[e] && o[e](...t)
            }
        }
    }

    function Pt(e) {
        Nt[e] = "createApplication" === e ? function(t, n, ...o) {
            let r = wt[t];
            return r ? new Error(`Runtime ${e}:无效应用id "${t}"`) : (r = {
                framework: "xFramework",
                created: Date.now()
            }, wt[t] = r, console.log(
                `### App Framework ### 创建应用 ${t}---- 框架: ${r.framework} 版本: ${global.frameworkVersion}`
            ), _t[r.framework].createApplication(t, n, ...o))
        } : "destroyApplication" === e ? function(t) {
            const n = wt[t];
            if (n && _t[n.framework]) {
                const e = _t[n.framework].destroyApplication(t);
                return wt[t] = null, e
            }
            return new Error(`Runtime ${e}:无效应用Id:  "${t}"`)
        } : function(...t) {
            const n = t[0],
                o = wt[n];
            return o && _t[o.framework] ? _t[o.framework][e](...t) : new Error(`Runtime ${e}:无效应用Id:  "${n}"`)
        }
    }

    function St(e) {
        let t, n;
        "string" == typeof e ? t = e : e.length && e.length > 1 && (t = e[0], n = e[1]), "createPage" === t ? Nt[t] =
            function(e, n, o, r, l, s) {
                const i = wt[n];
                if (!i) return new Error(`Runtime ${t}:无效应用id "${n}"`);
                let a = At[e];
                return a ? new Error(`Runtime ${t}:无效页面id "${e}"`) : (a = {
                        appId: n,
                        created: Date.now()
                    }, At[e] = a, console.log(`### App Framework ### 创建页面 ${e}----应用Id: ${n}`), _t[i.framework]
                    .createPage(e, n, o, r, l, s))
            } : (Nt[t] = function(...n) {
                const o = n[0],
                    r = At[o];
                if (r) {
                    const l = wt[r.appId];
                    if (l && _t[l.framework]) {
                        const r = _t[l.framework][t](...n);
                        return "destroyPage" === e && (At[o] = null), r
                    }
                    return new Error(`Runtime ${t}:无效应用Id:  "${r.appId}"`)
                }
                return "backPressPage" === e ? (console.error(
                    `### App Framework ### backPressPage 无效页面Id:  "${o}"`), !1) : new Error(
                    `Runtime ${t}:无效页面Id:  "${o}"`)
            }, n && (Nt[n] = function(...e) {
                const n = e[0],
                    o = At[n];
                if (o) {
                    const r = wt[o.appId];
                    return r && _t[r.framework] ? _t[r.framework][t](...e) : new Error(
                        `Runtime ${t}:无效页面Id: "${n}"`)
                }
            }))
    }
    const Ot = ["registerDsl", "locateDsl", "changeAppLocale"],
        Tt = ["createApplication", "onRequestApplication", "onShowApplication", "onHideApplication", "getAppConfig",
            "notifyAppError", "destroyApplication", "notifyPageNotFound"
        ],
        kt = ["createPage", "destroyPage", "recreatePage", "changeVisiblePage", "backPressPage", "menuPressPage",
            "notifyConfigurationChanged", "orientationChangePage", "refreshPage", ["processCallbacks",
                "execJSBatch"
            ], "getPage", "getPageRoot", "getPageElementStyles", "setPageElementStyles", "setPageElementAttrs",
            "replacePageElementWithHtml"
        ];
    const Ct = {},
        Rt = {};

    function Ft(e, t) {
        const n = Ct[e];
        n ? (global.Env && "trace" === global.Env.logLevel && console.trace(`### App Framework ### ${t} 应用(${e})响应`),
            n.$valid ? (n._emit(`applc:${t}`), global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Framework ### 调用 ${t} 回调成功`)) : global.Env && "trace" === global.Env.logLevel &&
            console.trace(`### App Framework ### 调用 ${t} 回调时应用(${e})已销毁`)) : console.error(
            `### App Framework ### ${t} app不存在， id： ${e}`)
    }
    const It = {
        1: (e, ...t) => (function e(t, n, o, r, l) {
            if (!t.$valid) return new Error("fireEvent: 只有Page才能发送Dom事件");
            if (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### 向页面(${t.id}) 的节点(${n})发送事件 "${o}"---- ${JSON.stringify(l)}`),
                Array.isArray(n)) return void n.some(n => !1 !== e(t, n, o, r));
            return pt.publish(at.fireEvent, [t, n, o, r, l])
        })(e, ...t),
        2: (e, ...t) => Et(e, ...t)
    };
    const Lt = {
        config: pt,
        init: function(e) {
            pt.platform = e.platform, pt.runtime = e.runtime, pt.dock = e.dock,
                function(e) {
                    _t = {
                        xFramework: e.dock
                    }, Ot.forEach($t), Tt.forEach(Pt), kt.forEach(St)
                }(e)
        },
        locateDsl: function() {
            console.record(`### App Performance ### 启动框架[PERF:locateDsl]开始：${(new Date).toJSON()}`);
            let e = global.getManifestField("config.dsl.name");
            e || (global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Framework ### 无法从manifest找到对应的dsl名称"), e = "xvm");
            let t = null;
            "xvm" !== e && (t = pt.platform.loadResource("dsl.js")), t ? global.Env && "trace" === global.Env
                .logLevel && console.trace("### App Framework ### 从安装包中获取dsl") : (global.Env && "trace" ===
                    global.Env.logLevel && console.trace(`### App Framework ### 从平台中获取dsl-${e}`), t = pt.platform
                    .loadResource(`assets:///js/dsls/dsl-${e}.js`)),
                function(e) {
                    let t = e;
                    "string" == typeof e && (t = E({}, `${e}; return dsl;`)),
                        function(e) {
                            e.init(pt)
                        }(t)
                }(t), console.record(
                    `### App Performance ### 启动框架[PERF:locateDsl]结束：${(new Date).toJSON()}`)
        },
        changeAppLocale: function(e, t) {
            ft(e, t)
        },
        createApplication: function(e, t) {
            console.record(
                    `### App Performance ### 调用APPJS整体[PERF:createApplication]开始：${(new Date).toJSON()}`),
                console.time("PERF:createApplication");
            let n, o = Ct[e];
            return o ? n = new Error(`createApplication: 无效应用Id "${e}"`) : (global.Env && "trace" ===
                    global.Env.logLevel && console.trace("### App Framework ### 平台配置信息：", JSON.stringify(
                        global.Env)), console.time("PERF:newAppClass"), o = new bt(e, {}), console.timeEnd(
                        "PERF:newAppClass"), Ct[e] = o, n = pt.publish(at.initApp, [o, t])), console.timeEnd(
                    "PERF:createApplication"), console.record(
                    `### App Performance ### 调用APPJS整体[PERF:createApplication]结束：${(new Date).toJSON()}`),
                n
        },
        onRequestApplication: function(e) {
            Ft(e, "onRequest")
        },
        onShowApplication: function(e) {
            Ft(e, "onShow")
        },
        onHideApplication: function(e) {
            Ft(e, "onHide")
        },
        notifyAppError: function(e, t) {
            const n = Ct[e];
            if (n) {
                if (global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Framework ### notifyAppError 应用(${e})响应`), n.$valid) try {
                    n._emit("applc:onError", t)
                } catch (e) {
                    throw e.message = `$INTERRUPTION$:${e.message}`, e
                }
            } else console.error(`### App Framework ### notifyAppError 应用(${e})无效`)
        },
        destroyApplication: function(e) {
            const t = Ct[e];
            return t ? (function(e) {
                e.$emit("applc:onDestroy"), e.$clear(), global.Env && "trace" === global.Env.logLevel &&
                    console.trace(`### App Framework ### 成功销毁应用(${e.id})----`)
            }(t), Ct) : new Error(`destroyApplication: 无效应用Id "${e}"`)
        },
        createPage: function(e, t, n, o, r, l) {
            console.record(`### App Performance ### 调用PageJS整体[PERF:createPage]开始：${(new Date).toJSON()}`),
                console.time("PERF:createPage");
            const s = Ct[t];
            if (!s) return new Error(`createPage: 无效应用Id "${t}"`);
            o = o || {};
            let i, a = Rt[e];
            if (a) i = new Error(`createPage: 无效页面Id "${e}"`);
            else {
                global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Framework ### 创建页面(${e})---- `, JSON.stringify(r)), console.time(
                        "PERF:newPageClass"), a = new vt(e, s, r, l, o), console.timeEnd(
                        "PERF:newPageClass"), console.record(
                        `### App Performance ### 实例化Page对象[PERF:newPageClass]结束：${(new Date).toJSON()}`),
                    Rt[e] = a;
                const t = function(e, t, n) {
                    const o = e,
                        r = {};
                    return {
                        setTimeout: function(e, l) {
                            const s = n(e, o),
                                i = global.setTimeoutWrap(o.id, function() {
                                    t(o, s)
                                }, l || 0);
                            return r[i.toString()] = s, i.toString()
                        },
                        setInterval: function(e, l) {
                            const s = n(e, o),
                                i = global.setIntervalWrap(o.id, function() {
                                    t(o, s, [], !0)
                                }, l || 0);
                            return r[i.toString()] = s, i.toString()
                        },
                        clearTimeout: function(e) {
                            global.clearTimeoutWrap(e), r[e] = void 0
                        },
                        clearInterval: function(e) {
                            global.clearIntervalWrap(e), r[e] = void 0
                        },
                        requestAnimationFrame: function(e) {
                            const l = n(e, o),
                                s = global.requestAnimationFrameWrap(o.id, function() {
                                    t(o, l)
                                });
                            return r[s.toString()] = l, s.toString()
                        },
                        cancelAnimationFrame: function(e) {
                            global.cancelAnimationFrameWrap(e), r[e] = void 0
                        }
                    }
                }(a, Et, yt);
                i = pt.publish(at.initPage, [a, n, o, t])
            }
            return console.timeEnd("PERF:createPage"), console.record(
                `### App Performance ### 调用PageJS整体[PERF:createPage]结束：${(new Date).toJSON()}`), i
        },
        recreatePage: function(e) {
            const t = Rt[e];
            let n;
            return n = t ? function(e) {
                if (console.log(`### App Framework ### 重建页面(${e.id})----`), !e.$valid) return console.error(
                    `### App Framework ### 页面(${e.id})缺少dom数据`), new Error("recreatePage: 无效数据");
                pt.runtime.helper.recreateDocument(e.doc), e.doc.listener.createFinish()
            }(t) : new Error(`recreatePage: 无效页面Id "${e}"`)
        },
        destroyPage: function(e) {
            const t = Rt[e];
            return t ? (pt.publish(at.destroyPage, [t]), function(e) {
                console.log(`### App Framework ### 销毁页面(${e.id})----`), e.intent = null, e.name =
                    null, pt.runtime.helper.destroyTagNode(e.doc), e.doc = null, e._valid = !1, e._visible = !
                    1, e.destroy(), global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Framework ### 成功销毁页面(${e.id})----`)
            }(t), delete Rt[e], Rt) : new Error(`destroyPage: 无效页面Id "${e}"`)
        },
        changeVisiblePage: function(e, t) {
            const n = Rt[e];
            if (n) {
                global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### changeVisiblePage 页面(${e})响应：${t}`), n._visible = t;
                const o = t ? at.onShow : at.onHide;
                pt.publish(o, [n])
            } else console.error(`### App Framework ### changeVisiblePage 页面(${e})无效`)
        },
        backPressPage: function(e) {
            const t = Rt[e];
            let n = !1;
            return t ? (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### backPressOnPage 页面(${e})响应`), n = pt.publish(at.onBackPress,
                    [t])) : console.error(`### App Framework ### backPressOnPage 页面(${e})无效`), !0 !== n &&
                (n = !1), n
        },
        menuPressPage: function(e) {
            const t = Rt[e];
            let n = !1;
            return t ? (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### menuPressOnPage 页面(${e})响应`), n = pt.publish(at.onMenuPress,
                    [t])) : console.error(`### App Framework ### menuPressOnPage 页面(${e})无效`), !0 !== n &&
                (n = !1), n
        },
        notifyConfigurationChanged: function(e, t) {
            const n = Rt[e];
            n ? (global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Framework ### notifyConfigurationChanged 页面(${e})响应：${JSON.stringify(t)}`),
                    pt.publish(at.onConfigurationChanged, [n, t])) : global.Env && "trace" === global.Env.logLevel &&
                console.trace(
                    `### App Framework ### notifyConfigurationChanged 页面(${e})无效：${JSON.stringify(t)}`)
        },
        orientationChangePage: function(e, t) {
            const n = Rt[e];
            n ? (global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Framework ### orientationChangePage 页面(${e})响应：${JSON.stringify(t)}`), pt.publish(
                at.onOrientationChange, [n, t])) : console.error(
                `### App Framework ### orientationChangePage 页面(${e})无效`)
        },
        refreshPage: function(e, t, n) {
            t = t || {};
            const o = Rt[e];
            o ? (global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Framework ### refreshPage 页面(${e})响应：${JSON.stringify(t)}`), pt.publish(at
                .onRefresh, [o, t, n])) : console.error(`### App Framework ### refreshPage 页面(${e})无效`)
        },
        processCallbacks: function(e, t) {
            if (!Array.isArray(t)) return new Error(`processCallbacks: 无效任务回调数据 "${e}"`);
            let n = Rt[e];
            if (n || (n = Ct[e]), n) {
                const e = [];
                return t.forEach(t => {
                    const o = It[t.action],
                        r = [...t.args];
                    "function" == typeof o ? (r.unshift(n), e.push(o(...r))) : (console.error(
                        `### App Framework ### 无法识别的回调函数类型 (${t.action})`), e.push(
                        "invalid"))
                }), e
            }
            return new Error(`processCallbacks: 无效回调来源Id "${e}"`)
        },
        getAppConfig: function(e) {
            const t = Ct[e];
            let n;
            return n = t ? t.$def : new Error(`getAppConfig: 无效应用Id "${e}"`)
        },
        getPageRoot: function(e) {
            const t = Rt[e];
            let n;
            return n = t ? function(e) {
                const t = (e.doc || {}).body || {};
                return pt.runtime.helper.getNodeAsJSON(t)
            }(t) : new Error(`getPageRoot: 无效页面Id "${e}"`)
        },
        getPage: function(e) {
            return Rt[e]
        },
        getPageElementStyles: function(e, t) {
            const n = Rt[e];
            let o;
            return o = n && n.doc ? function(e, t) {
                let n;
                const o = pt.runtime.helper.getDocumentNodeByRef(e.doc, t);
                if (o) {
                    const e = pt.runtime.helper.getElementMatchedCssRuleList(o);
                    return n = {
                        inlineStyle: e.shift(),
                        matchedCSSRules: e
                    }
                }
                return n = new Error(`getElementStyles: 无效节点ref "${t}"`)
            }(n, t) : new Error(`getPageElementStyles: 无效页面Id "${e}"`)
        },
        setPageElementStyles: function(e, t, n, o) {
            const r = Rt[e];
            let l;
            return r && r.doc ? (global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Framework ### 更新页面元素样式: ", JSON.stringify(arguments)), l = function(e, t,
                n, o) {
                let r;
                const l = pt.runtime.helper.getDocumentNodeByRef(e.doc, t);
                if (l) {
                    for (let e = 0, t = o.length; e < t; e++) {
                        const t = o[e];
                        t.name = A(t.name)
                    }
                    r = pt.runtime.helper.setElementMatchedCssRule(l, n, o), e.doc.listener.updateFinish()
                } else r = new Error(`setPageElementStyles: 无效节点ref "${t}"`);
                return r
            }(r, t, n, o)) : l = new Error(`setPageElementStyles: 无效页面Id "${e}"`), l
        },
        setPageElementAttrs: function(e, t, n) {
            const o = Rt[e];
            let r;
            return o && o.doc ? (global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Framework ### 更新页面元素的属性: ", JSON.stringify(arguments)), r = function(e, t,
                n) {
                let o;
                const r = pt.runtime.helper.getDocumentNodeByRef(e.doc, t);
                if (r) {
                    for (let e = 0, t = n.length; e < t; e++) {
                        const t = n[e];
                        if (t.name = A(t.name.trim()), "" === t.name);
                        else if ("style" === t.name) {
                            const e = t.value.split(";").map(e => {
                                    const t = e.split(":");
                                    return {
                                        name: A(t[0].trim()),
                                        value: t[1]
                                    }
                                }).filter(e => "" !== e.name),
                                n = {};
                            for (let t = 0, o = e.length; t < o; t++) {
                                const o = e[t];
                                o.disabled || (n[o.name] = o.value)
                            }
                            pt.runtime.helper.setElementStyles(r, n)
                        } else pt.runtime.helper.setElementAttr(r, t.name, t.value)
                    }
                    e.doc.listener.updateFinish()
                } else o = new Error(`setElementAttrs: 无效节点ref "${t}"`);
                return o
            }(o, t, n)) : r = new Error(`setPageElementAttrs: 无效页面Id "${e}"`), r
        },
        replacePageElementWithHtml: function(e, t, n) {
            const o = Rt[e];
            let r;
            if (o && o.doc) {
                const e = pt.runtime.helper.getDocumentNodeByRef(o.doc, t),
                    l = e.parentNode,
                    s = l.layoutChildren.indexOf(e);
                try {
                    const t = pt.platform.requireBundle("parser.js").parseHTML(n),
                        i = function e(t, n) {
                            if (global.Env && "trace" === global.Env.logLevel && console.trace(
                                    `### App Runtime ### 编译节点：${JSON.stringify(t)}`), t.hasOwnProperty(
                                    "length")) {
                                const o = [];
                                for (let r = 0, l = t.length; r < l; r++) {
                                    const l = e(t[r], n);
                                    l && o.push(l)
                                }
                                return o
                            }
                            if (!t.nodeType || t.nodeType === n.NodeType.ELEMENT) {
                                const o = n.createElement(t.type);
                                for (const e in t.attr) pt.runtime.helper.setElementAttr(o, e, t.attr[e]);
                                t.classList && t.classList.length && pt.runtime.helper.setElementAttr(o,
                                    "class", t.classList.join(" "));
                                for (const e in t.style) pt.runtime.helper.setElementStyle(o, e, t.style[e]);
                                if (t.children)
                                    for (let r = 0, l = t.children.length; r < l; r++) {
                                        const l = e(t.children[r], n);
                                        l && o.appendChild(l)
                                    }
                                return o
                            }
                            console.warn(`### App Runtime ### 不支持插入的节点类型：${t.nodeType}`)
                        }(t, o.doc);
                    if (i) {
                        l.removeChild(e);
                        const t = i.hasOwnProperty("length") ? i : [i];
                        for (let e = 0, n = t.length; e < n; e++) {
                            const n = t[e];
                            l.insertBefore(n, l.layoutChildren[s + e])
                        }
                        o.doc.listener.updateFinish(), global.Env && "trace" === global.Env.logLevel &&
                            console.trace("### App Framework ### 使用HTML替换元素:", JSON.stringify(arguments),
                                JSON.stringify(t))
                    } else r = new Error(`replacePageElementWithHtml: 使用HTML替换元素，编译出错：${JSON.stringify(t)}`)
                } catch (e) {
                    r = new Error(`replacePageElementWithHtml: 使用HTML替换元素：${e}`)
                }
            } else r = new Error(`replacePageElementWithHtml: 无效页面Id "${e}"`);
            return r
        },
        bindComponentMethods: function(e, t) {
            if (t && !t._hasBind) {
                const n = t.tagName.toLowerCase();
                t.animate = function(e, t) {
                    return (n, o) => {
                        const r = {
                                keyframes: n,
                                options: o
                            },
                            l = pt.platform.requireBundle("animation.js"),
                            s = pt.platform.requireModule(t.app, "system.animation"),
                            i = new l(t, e, r, s);
                        return Object.freeze(i)
                    }
                }(t, e), pt.runtime.helper.bindComponentMethods(t).forEach(function(n) {
                    const o = t[n];
                    t[n] = function(...r) {
                        if (e && e.doc && e.$valid) {
                            pt.publish(at.callbackDone, [e]);
                            const l = r.map(t => yt(t, e));
                            o.apply(t[n], l)
                        }
                    }
                }), t.getViewId = function() {
                    return global.getPageElementViewId(t.ref)
                }, "canvas" === n && function(e, t) {
                    const n = pt.platform.requireBundle("canvas.js"),
                        o = pt.platform.requireModule(t.app, "system.canvas");
                    e = n.enable(e, t.app, {
                        module: o
                    })
                }(t, e), t._hasBind = !0
            }
            return t
        },
        notifyPageNotFound: function(e, t = {}) {
            const n = Ct[e];
            n ? (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### notifyPageNotFound 应用(${e})响应， 参数： ${JSON.stringify(t)}`), n
                .$valid ? (n._emit("applc:onPageNotFound", t), global.Env && "trace" === global.Env.logLevel &&
                    console.trace(
                        `### App Framework ### 调用 onPageNotFound 回调成功， 参数： ${JSON.stringify(t)}`)) :
                global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Framework ### 调用 onPageNotFound 回调时应用(${e})已销毁`)) : console.error(
                `### App Framework ### notifyPageNotFound app不存在， id： ${e}`)
        },
        makeEvaluateBuildScript: function(e) {
            return function t(n) {
                const o = Object.assign({
                    $app_evaluate$: t
                }, e);
                return pt.platform.requireScriptFile(n, o)
            }
        },
        exposure: Nt
    };
    global.initInfras = function() {
        global.frameworkVersion = e;
        const t = {};
        t.platform = oe, oe.init(), t.platform.exposeToNative(oe.exposure), global.Session = oe.Session, global
            .BroadcastChannel = oe.BroadcastChannel, global.ENGINE_TYPE = oe.ENGINE_TYPE, t.runtime = it, it.init(),
            t.platform.exposeToNative(it.exposure), t.dock = Lt, Lt.init(t), t.platform.exposeToNative(Lt.exposure),
            t.platform.defineBundle("parser"), t.platform.defineBundle("canvas"), t.platform.defineBundle(
                "animation"), console.record(
                `### App Performance ### 启动平台[PERF:infras]结束：${(new Date).toJSON()}`)
    }
});
//# sourceMappingURL=infras.js.map
