! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ?
        define(["exports"], t) : t((e = e || self)["infras-ext"] = {})
}(this, function(e) {
    "use strict";
    class t {
        constructor(e, n = {
            bubbles: !1,
            cancelable: !1
        }) {
            if (arguments.length > 1 && "object" != typeof n) throw new Error(
                `### App Runtime ### addEventListener() 参数2传递的话，必须是对象：${n}`);
            this._type = e, this._bubbles = n.bubbles, this._cancelable = n.cancelable, this._target = null,
                this._currentTarget = null, this._eventPhase = t.NONE, this._defaultPrevented = !1, this._timeStamp =
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
    t.NONE = 0, t.CAPTURING_PHASE = 1, t.AT_TARGET = 2, t.BUBBLING_PHASE = 3;
    class n extends t {
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
    const o = {
            HTML_ID: "-1"
        },
        r = {
            UNKNOWN: 0,
            ELEMENT: 1,
            ATTR: 2,
            TEXT: 3,
            COMMENT: 8,
            DOCUMENT: 9,
            DOCUMENT_FRAGMENT: 11,
            FIGMENT: 101
        };
    let s = 1;
    class i {
        constructor() {
            this._nodeType = i.NodeType.UNKNOWN, this._nodeName = null, this._nodeValue = null, this._ownerDocument =
                null, this._textContent = null, this.ref = (s++).toString(), this.childNodes = [], this.layoutChildren = [],
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
            if (this.nodeType !== i.NodeType.TEXT) {
                const t = this.ownerDocument.createTextNode(e);
                this.appendChild(t)
            } else this._textContent = e
        }
    }
    i.NodeRef = o, i.NodeType = r;
    const a = {};

    function l(e) {
        return a[e]
    }

    function d(e) {
        const t = l(e);
        return t && t.listener ? t.listener : null
    }

    function c(e, t) {
        if (e._docId === t) return;
        const n = l(t);
        if (n) {
            e._docId = t, n._nodeMap[e.ref] = e;
            for (let t = 0, n = e.childNodes.length; t < n; t++) c(e.childNodes[t], e._docId)
        }
    }

    function h(e, t) {
        return e._nodeMap[t]
    }

    function u(e, t) {
        e.parentNode = t, t._docId && (c(e, t._docId), e._depth = t._depth + 1);
        for (let t = 0, n = e.childNodes.length; t < n; t++) u(e.childNodes[t], e)
    }

    function p(e, t, n, o) {
        n < 0 && (n = 0);
        const r = t[n - 1],
            s = t[n];
        return t.splice(n, 0, e), o && (r && (r.nextSibling = e || null), e.previousSibling = r || null, e.nextSibling =
            s || null, s && (s.previousSibling = e || null)), n
    }

    function m(e, t, n) {
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

    function g(e, t, n, o) {
        const r = t.indexOf(e);
        if (r < 0 || r === n) return -1;
        m(e, t, o);
        let s = n;
        return r <= n && (s = n - 1), p(e, t, s, o), n
    }
    let f = 1;

    function _(e) {
        const t = Object.prototype.toString.call(e);
        return t.substring(8, t.length - 1).toLowerCase()
    }

    function y(e) {
        const t = Object.create(null);
        return function(n) {
            return t[n] || (t[n] = e(n))
        }
    }
    const b = /-(\w)/g,
        v = y(e => e.replace(b, w));

    function w(e, t) {
        return t ? t.toUpperCase() : ""
    }
    const C = /([a-z\d])([A-Z])/g,
        E = y(e => e.replace(C, "$1-$2").toLowerCase());
    const A = /^data.+/;

    function F(e, t) {
        const n = [],
            o = Object.assign({}, t);
        if (e)
            for (let t = 0, r = e.length; t < r; t++) {
                const r = e[t];
                o.hasOwnProperty(r.name) ? (n.push({
                    name: E(r.name),
                    value: o[r.name],
                    disabled: !1
                }), delete o[r.name]) : r.disabled && n.push({
                    name: E(r.name),
                    value: r.value,
                    disabled: r.disabled
                })
            }
        for (const e in o) n.push({
            name: E(e),
            value: o[e],
            disabled: !1
        });
        return n
    }
    const x = {};

    function N(e) {
        "string" == typeof e && (e = JSON.parse(e)), Array.isArray(e) || (e = [e]), e.forEach(e => {
            if (!e) return;
            e.name || (e.name = e.type, delete e.type), e.methods = e.methods || [], global.Env && "trace" ===
                global.Env.logLevel && console.trace("### App Runtime ### 注册组件---- ", JSON.stringify(e));
            let t = x[e.name];
            t ? t.methods = Array.from(new Set(t.methods.concat(e.methods))) : (t = x[e.name] = JSON.parse(
                JSON.stringify(e))).def = {}
        })
    }

    function T(e) {
        return x[e]
    }

    function O(e) {
        const t = T(e.tagName.toLowerCase());
        if (t && t.methods) {
            const n = t.methods.filter(e => "animate" !== e);
            return n.forEach(function(n) {
                e[n] || (e[n] = function(...o) {
                    const r = d(e._docId);
                    r ? (r.invokeComponentMethod(t.name, e.ref, n, o), global.Env && "trace" ===
                            global.Env.logLevel && console.trace(
                                `### App Runtime ### 调用组件的方法：${t.name}.${n}()`, JSON.stringify(o))) :
                        console.warn(`### App Runtime ### 调用组件的方法无效：${t.name}.${n}(), 组件已销毁`)
                })
            }), n
        }
        return []
    }

    function S(e) {
        return e._attr
    }

    function I(e) {
        return e._style
    }

    function R(e) {
        return e.mergedStyle
    }

    function P(e, t) {
        e._style = t || {}
    }

    function D(e) {
        const t = {};
        return e.split(";").filter(e => e.trim()).forEach(e => {
            const n = e.indexOf(":");
            let o = e.substring(0, n).trim();
            o = v(o);
            const r = e.substring(n + 1).trim();
            t[o] = r
        }), global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### 元素的样式转换：${e} 为${JSON.stringify(t)}`), t
    }

    function L(e, t = !0, n = !1, o = !1) {
        if (e.nodeType === r.ELEMENT) {
            const r = {
                    ref: e.ref.toString(),
                    type: e._type
                },
                s = function(e) {
                    if (e._styleObjectId) return e._styleObjectId;
                    let t = e;
                    for (; t && !t._styleObjectId;) t = t.parentNode;
                    return t && (e._styleObjectId = t._styleObjectId), e._styleObjectId
                }(e);
            s && (r.prop = {
                _styleObjectId: s
            }), n && e._styleObject && (r.styleObject = e._styleObject), e._useParentStyle && (r.prop = r.prop ||
                {}, r.prop._useParentStyle = !0);
            const i = S(e);
            if (i && Object.keys(i).length) {
                r.attr = {};
                for (const e in i) {
                    const t = i[e];
                    r.attr[e] = -1 !== [null, void 0].indexOf(t) ? "" : t
                }
            }
            const a = I(e);
            if (a && Object.keys(a).length && (r.inlineStyle = a), o) {
                const t = R(e);
                t && Object.keys(t).length && (r.style = t)
            }
            const l = Object.keys(e._eventTargetListeners || {});
            l && l.length && (r.event = l);
            const d = e.layoutChildren || e.childNodes;
            if (t && d && d.length) {
                const e = [];
                for (let r = 0, s = d.length; r < s; r++) {
                    const s = d[r],
                        i = L(s, t, n, o);
                    j(s) ? e.push(i) : e.push.apply(e, i)
                }
                r.children = e
            }
            return r
        }
        if (e.nodeType === r.FIGMENT) {
            const s = [];
            if (t && e.layoutChildren && e.layoutChildren.length)
                for (let i = 0, a = e.layoutChildren.length; i < a; i++) {
                    const a = e.layoutChildren[i],
                        l = L(a, t, n, o);
                    a.nodeType === r.FIGMENT ? s.push.apply(s, l) : s.push(l)
                }
            return s
        }
        if (e.nodeType === r.COMMENT) return [];
        global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### getNodeAsJSON() 忽略该类型(${e.nodeType})的节点序列化`)
    }

    function B(e) {
        return e._depth
    }

    function k(e) {
        return e._layout
    }

    function j(e) {
        return e._render
    }

    function $(e, t = !1) {
        let n = t ? e : e.parentNode;
        for (; n && !j(n);) n = n.parentNode;
        return n
    }

    function M(e, t = !1) {
        const n = [];
        let o = $(e, t);
        for (; o;) n.push(o), o = $(o);
        return n
    }

    function z(e) {
        if (null !== e._renderCount) return e._renderCount;
        let t = j(e) ? 1 : 0;
        if (k(e) && !j(e))
            for (let n = 0, o = e.layoutChildren.length; n < o; n++) t += z(e.layoutChildren[n]);
        return e._renderCount = t, t
    }

    function U(e) {
        let t = e;
        for (; t;) t._renderCount = null, t = t.parentNode
    }

    function G(e) {
        const t = e.parentNode;
        if (e.nodeType === r.DOCUMENT || e.ref === o.HTML_ID) return 0;
        if (!t || !k(e)) return -1;
        const n = W(e, t);
        let s = 0;
        return j(t) || (s = G(t)), n < 0 || s < 0 ? -1 : n + s
    }

    function W(e, t) {
        if (!t.layoutChildren || t.layoutChildren.length <= 0) return -1;
        const n = t.layoutChildren.indexOf(e);
        if (n > 0) {
            let e = 0;
            for (let o = 0, r = n; o < r; o++) e += z(t.layoutChildren[o]);
            return e
        }
        return n
    }

    function J(e) {
        switch (e.nodeType) {
            case r.DOCUMENT:
                ! function(e) {
                    global.Env && "trace" === global.Env.logLevel && console.trace("### App Runtime ### 销毁文档"),
                        delete e._nodeMap, delete e.listener, delete e._styleSheetHash, e._styleObjectMap && e._styleObjectMap
                        .clear();
                    delete e._styleObjectMap, e.documentElement && q(e.documentElement);
                    delete e.documentElement, delete e.body, delete e.childNodes, delete e.layoutChildren, t = e._docId,
                        a[t] = null, H(e);
                    var t
                }(e);
                break;
            case r.ELEMENT:
                q(e);
                break;
            default:
                H(e)
        }
    }

    function H(e) {
        delete e._depth, delete e._tmpRenderIndexInParent, delete e._eventTargetListeners, delete e._bindWatcherList,
            delete e._vm,
            function(e) {
                if (delete e._docId, delete e._layout, delete e._render, delete e._renderCount, delete e.nextSibling,
                    delete e.previousSibling, delete e.parentNode, e.childNodes)
                    for (let t = e.childNodes.length - 1; t >= 0; t--) q(e.childNodes[t]);
                delete e.layoutChildren, delete e.childNodes, delete e._content, delete e._ownerDocument, global.Env &&
                    "trace" === global.Env.logLevel && console.trace(
                        `### App Runtime ### 销毁节点：节点(${e.ref})剩余属性有：[${Object.keys(e).join(", ")}]`)
            }(e)
    }

    function q(e) {
        global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Runtime ### 销毁元素：${JSON.stringify(L(e,!1,!1,!1))}`), delete e._classList, delete e._styleObject,
            delete e._styleObjectId, delete e._useParentStyle, delete e._usedCSSPropertyCache, delete e._matchedCssRuleCache,
            delete e._mergedStyleCache, delete e._ownCssRuleCache, delete e._attr, delete e._style, delete e._dataset,
            H(e)
    }
    var Z = {
        __proto__: null,
        registerComponents: N,
        getComponentDefaultOptions: T,
        bindComponentMethods: O,
        getDocumentNodeByRef: h,
        getNodeAttributesAsObject: S,
        getNodeInlineStyleAsObject: I,
        getNodeAttrClassList: function(e) {
            if (e._classList) return e._classList;
            const t = S(e);
            return e._classList = (t.class || "").split(/\s+/).filter(e => "" !== e).filter((e, t, n) => n.indexOf(
                e) === t), e._classList
        },
        getNodeMergedStyleAsObject: R,
        setNodeInlineStyle: P,
        getNodeAsJSON: L,
        getNodeDepth: B,
        supportLayout: k,
        supportRender: j,
        renderParent: $,
        renderParents: M,
        calcRenderCount: z,
        resetRenderCount: U,
        renderIndexInRenderParent: G,
        renderIndexInParent: W,
        destroyTagNode: J,
        cssText2StyleObject: D
    };

    function X(e, n, o) {
        o instanceof Object || (o = {
            capture: !!o
        });
        const r = n.type,
            s = e._eventTargetListeners[r],
            i = o.capture ? t.CAPTURING_PHASE : t.BUBBLING_PHASE;
        if (s && s[i] && s[i].list) {
            const t = s[i].list;
            for (let o = 0, r = t.length; o < r; o++) {
                const r = t[o];
                n._target = e, global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### fireTargetEventListener() 事件响应:${n.type}，节点:${e.ref}`), r && (r.call(n
                    .target, n), n._listenNodes[n.target.ref] = !0)
            }
        }
    }
    class Y extends i {
        constructor() {
            super(...arguments), this._eventTargetListeners = {}
        }
        addEventListener(e, n, o) {
            if (arguments.length < 2) throw new Error(
                `### App Runtime ### addEventListener() 至少需要传递两个参数:${arguments.length}`);
            if ("string" != typeof e) throw new Error("### App Runtime ### addEventListener() 参数1必须是字符串，事件类型");
            if ("function" != typeof n) throw new Error("### App Runtime ### addEventListener() 参数2必须是函数，监听事件");
            global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### addEventListener() 节点(${this.ref})注册事件(${e})`), o instanceof Object ||
                (o = {
                    capture: !!o,
                    once: !1,
                    passive: !1
                });
            const r = o.capture ? t.CAPTURING_PHASE : t.BUBBLING_PHASE,
                s = this._eventTargetListeners[e] = this._eventTargetListeners[e] || {};
            if (s[r] = s[r] || {}, s[r].list = s[r].list || [], s[r].hash = s[r].hash || {}, -1 === s[r].list.indexOf(
                    n)) {
                const e = s[r].list.push(n);
                s[r].hash[e - 1] = {
                    capture: !!o.capture,
                    once: !!o.once,
                    passive: !!o.passive
                }
            }
            const i = d(this._docId);
            i && i.addEvent(this.ref, e)
        }
        removeEventListener(e, n, o) {
            if (arguments.length < 2) throw new Error(
                `### App Runtime ### addEventListener() 至少需要传递两个参数:${arguments.length}`);
            if ("string" != typeof e) throw new Error("### App Runtime ### addEventListener() 参数1必须是字符串，事件类型");
            if ("function" != typeof n) throw new Error("### App Runtime ### addEventListener() 参数2必须是函数，监听事件");
            global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### Element ${this.ref} 执行 removeEventListener(${e})---- `), o instanceof Object ||
                (o = {
                    capture: !!o
                });
            const r = o.capture ? t.CAPTURING_PHASE : t.BUBBLING_PHASE,
                s = this._eventTargetListeners[e] = this._eventTargetListeners[e] || {};
            s[r] = s[r] || {}, s[r].list = s[r].list || [], s[r].hash = s[r].hash || {};
            const i = s[r].list.indexOf(n); - 1 !== i && (s[r].list.splice(i, 1), s[r].hash[i] = null), 0 ===
                s[r].list.length && (s[r] = null)
        }
        dispatchEvent(e) {
            if (!(e instanceof t)) throw new Error("### App Runtime ### dispatchEvent() 参数1所属类必须是事件类");
            if (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### dispatchEvent() 执行事件:${e.type}, 来自节点:${this.ref}`), e._supportW3C) {
                e._target = this;
                const n = e.type,
                    o = M(this, !0),
                    r = o.slice().reverse().concat(o);
                if (r[0] && r[0].parentNode === r[0].ownerDocument) {
                    const e = r[0].ownerDocument;
                    r.unshift(e), r.push(e)
                }
                for (; r.length > 0;) {
                    const o = r[0],
                        s = r.indexOf(o),
                        i = r.indexOf(this);
                    if (e._eventPhase = s < i ? t.CAPTURING_PHASE : s === i ? t.AT_TARGET : t.BUBBLING_PHASE, e
                        ._currentTarget = o, !e.bubbles && e.eventPhase === t.BUBBLING_PHASE) break;
                    global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Runtime ### dispatchEvent() 执行事件:${n}, 阶段:${e.eventPhase}, Target:${e.target.ref}, CurrentTarget:${e.currentTarget.ref}`
                    );
                    const a = o._eventTargetListeners[n];
                    let l = e.eventPhase;
                    if (e.target === e.currentTarget && (l = o === r[1] ? t.CAPTURING_PHASE : t.BUBBLING_PHASE),
                        a && a[l] && a[l].list) {
                        const t = a[l].hash,
                            n = a[l].list.slice();
                        for (let r = 0, s = n.length; r < s && !e._flagStopImmediatePropagation; r++) {
                            const s = n[r];
                            try {
                                global.Env && "trace" === global.Env.logLevel && console.trace(
                                    `### App Runtime ### dispatchEvent() 事件响应:${e.type}，阶段:${e.eventPhase}`
                                ), s && (s.call(e.currentTarget, e), e._listenNodes[e.currentTarget.ref] = !
                                    0)
                            } catch (t) {
                                console.error(
                                    `### App Runtime ### dispatchEvent() 事件响应:${e.type}，阶段:${e.eventPhase}, JS报错:`,
                                    t.message, s), console.error(t.stack), e._throwError && global.setTimeout(
                                    () => {
                                        throw t
                                    }, 0)
                            }
                            t[r] && t[r].once && o.removeEventListener(e.type, s, t[r])
                        }
                    }
                    if (e._flagStopImmediatePropagation || e._flagStopPropagation) break;
                    r.shift()
                }
                e._currentTarget = null
            } else X(this, e);
            if ("click" === e.type && global.Env && global.Env.engine === global.ENGINE_TYPE.CARD) {
                const t = d(this._docId);
                t && t.collectStatistics({
                    type: e.type,
                    ref: this.ref,
                    listeners: Object.keys(e._listenNodes)
                })
            }
            e._listenNodes = {}
        }
    }

    function V(e) {
        if (e.nodeType === i.NodeType.ELEMENT && e._docId)
            for (let t = 0, n = e.layoutChildren.length; t < n; t++) V(e.layoutChildren[t])
    }

    function K(e, t, n) {
        if (t.nodeType === i.NodeType.DOCUMENT_FRAGMENT) {
            const o = t.childNodes.slice();
            for (let r = 0, s = o.length; r < s; r++) t.removeChild(o[r]), K(e, o[r], n);
            return t
        }
        const o = $(e, !0),
            r = n ? e.childNodes.indexOf(n) : e.childNodes.length,
            s = d(e._docId);
        if (t.nodeType === i.NodeType.TEXT) throw new Error(`### App Runtime ### 不支持在非渲染节点中添加文本节点：${t.textContent}`);
        if (t.parentNode) {
            if (g(t, e.childNodes, r, !0), k(t))
                if (n) {
                    const r = g(t, e.layoutChildren, e.layoutChildren.indexOf(n));
                    U(e);
                    const i = G(t);
                    if (s && r >= 0) return s.moveNode(t, o, i)
                } else {
                    const n = g(t, e.layoutChildren, e.layoutChildren.length);
                    U(e);
                    const r = G(t);
                    if (s && n >= 0) return s.moveNode(t, o, r)
                }
        } else if (u(t, e), p(t, e.childNodes, r, !0), V(t), k(t))
            if (n) {
                p(t, e.layoutChildren, e.layoutChildren.indexOf(n)), U(e);
                const r = G(t);
                if (s) return s.addNode(t, o, r)
            } else {
                p(t, e.layoutChildren, e.layoutChildren.length), U(e);
                const n = e === o ? -1 : G(t);
                if (s) return s.addNode(t, o, n)
            }
    }
    class Q extends Y {
        constructor() {
            super(...arguments), this._depth = null, this._tmpRenderIndexInParent = null
        }
        appendChild(e) {
            if (!(e && e instanceof i)) throw new Error("### App Runtime ### appendChild() 函数的node参数无效");
            if (e.parentNode && e.parentNode !== this) throw new Error(
                "### App Runtime ### appendChild() 参数node的父节点不匹配");
            return K(this, e, null)
        }
        insertBefore(e, t) {
            if (!(e && 2 === arguments.length && e instanceof i)) throw new Error(
                "### App Runtime ### insertBefore() 函数的node/before参数无效");
            if (e.parentNode && e.parentNode !== this) throw new Error(
                "### App Runtime ### insertBefore() 参数node的父节点不匹配");
            return e === t || e.nextSibling && e.nextSibling === t ? e : K(this, e, t)
        }
        removeChild(e) {
            if (!(e && e instanceof i)) throw new Error("### App Runtime ### removeChild() node参数无效");
            if (e.parentNode !== this) throw new Error("### App Runtime ### removeChild() 参数node的父节点不匹配");
            if (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### removeChild() 移除节点：${JSON.stringify(L(e,!1,!1,!1))}`), U(e), e.parentNode =
                null, k(e)) {
                if (j(e)) {
                    const t = d(e._docId);
                    t && t.removeElement(e.ref)
                } else {
                    const t = e.childNodes.slice();
                    for (let n = 0; n < t.length; n++) e.removeChild(t[n])
                }
                m(e, this.layoutChildren)
            }
            return m(e, this.childNodes, !0),
                function e(t, n) {
                    if (t._docId !== n) return;
                    const o = l(n);
                    if (o) {
                        for (let n = 0, o = t.childNodes.length; n < o; n++) e(t.childNodes[n], t._docId);
                        t._depth = null, o._nodeMap[t.ref] = null, t._docId = null
                    }
                }(e, e._docId), e
        }
        toJSON() {
            return L(this, !0, !1, !1)
        }
    }
    class ee extends Q {
        constructor(e) {
            super(...arguments), this._nodeType = i.NodeType.COMMENT, this._nodeName = "#comment", this._nodeValue =
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

    function te(e, t, n, o) {
        if (!e._ownerDocument || "ref" === t) return;
        if ((null === (r = n) || "object" != typeof r) && S(e)[t] === n && !1 !== o) return;
        var r;
        if ("class" === t) e._classList = null;
        else if (A.test(t)) {
            const o = t.replace(/[A-Z]/g, e => "-" + e.toLowerCase()).replace(/^data-/, "").replace(/-([a-z])/g, (e,
                t) => t.toUpperCase());
            e._dataset[o] = n
        }
        const s = S(e)[t];
        S(e)[t] = n, global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### 元素的属性(${t})更新(${s}=>${n})`), oe(e, o, t, n)
    }

    function ne(e, t, n) {
        if (!e._ownerDocument) return;
        if (t = t || "", I(e) === t && !1 !== n) return;
        P(e, "string" == typeof t ? D(t) : t), oe(e, n, "style")
    }

    function oe(e, t, n, o, r) {
        const s = d(e._docId);
        s && ("class" === n ? !t && s.setStyles(e.ref, null, {
            class: o
        }) : "id" === n ? !t && s.setStyles(e.ref, null, {
            id: o
        }) : "style" === n ? r ? !t && s.setStyle(e.ref, ...r) : !t && s.setStyles(e.ref, I(e)) : !t && s.setAttr(
            e.ref, n, o))
    }
    class re extends Q {
        constructor(e) {
            super(...arguments), this._nodeType = i.NodeType.ELEMENT, this._nodeName = e.toUpperCase(), this._tagName =
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
            const e = S(this);
            return e && e.id
        }
        get dataset() {
            return this._dataset
        }
        get attr() {
            return console.warn("### App Runtime ### attr属性将被废弃，不推荐使用"), S(this)
        }
        get tagName() {
            return this._tagName
        }
        get mergedStyle() {
            return null
        }
        appendChild(e) {
            return e.nodeType === i.NodeType.TEXT ? (te(this, "value", e.textContent), u(e, this), e) : super.appendChild(
                e)
        }
        insertBefore(e, t) {
            return e.nodeType === i.NodeType.TEXT ? (te(this, "value", e.textContent), u(e, this), e) : super.insertBefore(
                e, t)
        }
        hasAttribute(e) {
            const t = S(this);
            return t && t.hasOwnProperty(e)
        }
        toString() {
            const e = S(this),
                t = I(this);
            return "<" + this._type + " attr=" + JSON.stringify(e) + " style=" + JSON.stringify(t) + ">" + this
                .layoutChildren.map(e => e.toString()).join("") + "</" + this._type + ">"
        }
    }
    class se extends Q {
        constructor() {
            super(...arguments), this._nodeType = i.NodeType.DOCUMENT_FRAGMENT, this._nodeName =
                "#document-fragment", this._layout = !0, this._render = !1
        }
    }
    class ie extends Q {
        constructor() {
            super(...arguments), this._nodeType = i.NodeType.FIGMENT, this._nodeName = "#figment", this._layout = !
                0, this._render = !1
        }
        toString() {
            let e = "";
            return this.childNodes.length && (e = this.childNodes.map(e => e.toString()).join("")), e
        }
    }
    class ae extends Q {
        constructor(e) {
            super(...arguments), this._nodeType = i.NodeType.TEXT, this._nodeName = "#text", this._textContent =
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
    class le extends re {
        constructor() {
            super(...arguments), this.ref = i.NodeRef.HTML_ID, this._depth = 0
        }
        appendChild(e) {
            return function(e, t, n) {
                if (e.layoutChildren.length > 0 || t.parentNode) return void console.warn(
                    "### App Runtime ### Document添加多个Body节点----");
                const o = l(e._docId),
                    r = e.childNodes,
                    s = r.indexOf(n);
                s < 0 ? r.push(t) : r.splice(s, 0, t), k(t) ? (c(t, t._docId), u(t, e), p(t, e.layoutChildren,
                    e.layoutChildren.length), U(e), V(t), o.body = t, d(e._docId).createBody(t)) : u(t,
                    e)
            }(this, e)
        }
        insertBefore(e, t) {
            console.warn("### App Runtime ### 暂不支持nodeHtml.insertBefore()")
        }
    }
    class de extends re {
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
    const ce = /^(touchstart|touchmove|touchcancel|touchend)$/,
        he = /^(touchstart|touchmove|touchcancel|touchend|click|longpress)$/;

    function ue(e, o) {
        let r;
        return ce.test(e) ? (r = new n(e, o))._supportW3C = !1 : (r = new t(e, o))._supportW3C = !1, he.test(e) &&
            global.isRpkMinPlatformVersionGEQ(1040) && (r._supportW3C = !0, r._bubbles = !0), r
    }

    function pe(e) {
        const t = new le("html");
        return t._ownerDocument = e, c(t, e._docId), t.parentNode = e, e.childNodes.push(t), e.layoutChildren.push(
            t), t
    }
    class me extends Q {
        constructor(e, t) {
            var n, o;
            super(...arguments), this._nodeType = i.NodeType.DOCUMENT, this._nodeName = "#document", this.body =
                null, e = e ? e.toString() : "", this._docId = e, this._nodeMap = {}, this.listener = t, this._styleSheetHash = {},
                this._styleSheetHash[0] = [], this._styleObjectMap = new Map, n = this._docId, o = this, n && (
                    a[n] = o), Object.defineProperty(this, "documentElement", {
                    configurable: !0,
                    enumerable: !1,
                    writable: !1,
                    value: pe(this)
                })
        }
        createElement(e) {
            let t;
            return (t = "input" === e || "textarea" === e ? new de(e) : new re(e))._ownerDocument = this, t
        }
        createDocumentFragment() {
            const e = new se;
            return e._ownerDocument = this, e
        }
        createTextNode(e) {
            const t = new ae(e);
            return t._ownerDocument = this, t
        }
        createComment(e) {
            const t = new ee(e);
            return t._ownerDocument = this, t
        }
        createEvent(e, t) {
            return ue(e, t)
        }
    }

    function ge() {
        Object.freeze(t), Object.freeze(t.prototype), Object.freeze(ee), Object.freeze(ee.prototype), Object.freeze(
                me), Object.freeze(me.prototype), Object.freeze(re), Object.freeze(re.prototype), Object.freeze(ie),
            Object.freeze(ie.prototype), Object.freeze(se), Object.freeze(se.prototype), Object.freeze(le), Object.freeze(
                le.prototype), Object.freeze(i), Object.freeze(i.prototype), Object.freeze(Q), Object.freeze(Q.prototype),
            Object.freeze(Y), Object.freeze(Y.prototype), Object.freeze(ae), Object.freeze(ae.prototype)
    }

    function fe(e, t = []) {
        return {
            module: "dom",
            method: e,
            args: t
        }
    }
    class _e {
        constructor(e, t) {
            this.id = e, this.streamer = t, this.actionLen = 0
        }
        createFinish(e) {
            global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Runtime ### createFinish---- ");
            const t = this.streamer.over(this.id, [fe("createFinish")], e);
            return this.resetActionLen(), t
        }
        updateFinish(e) {
            global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Runtime ### updateFinish---- ");
            const t = this.streamer.over(this.id, [fe("updateFinish")], e);
            return this.resetActionLen(), t
        }
        createBody(e) {
            const t = L(e, !0, !0, !1),
                n = t.children;
            delete t.children;
            const o = [fe("createBody", [t])];
            return n && o.push.apply(o, n.map(e => fe("addElement", [t.ref, e, -1]))), this.addActions(o)
        }
        addNode(e, t, n) {
            let o;
            if (t && j(t) || console.error(`### App Runtime ### addNode的parent(${t.type})必须是可渲染节点`), n < 0 && (
                    n = -1), j(e)) o = this.addElement(e, t.ref, n);
            else {
                let r = n;
                e.layoutChildren.every(e => (o = j(e) ? this.addElement(e, t.ref, r) : this.addNode(e, t, r), r +=
                    z(e), -1 !== o))
            }
            return o
        }
        addElement(e, t, n) {
            return n >= 0 || (n = -1), this.addActions(fe("addElement", [t, L(e, !0, !0, !1), n]))
        }
        removeNode(e) {
            let t;
            return j(e) ? t = this.removeElement(e.ref) : e.layoutChildren.every(e => -1 !== (t = j(e) ? this.removeElement(
                e.ref) : this.removeNode(e))), t
        }
        removeElement(e) {
            if (Array.isArray(e)) {
                const t = e.map(e => fe("removeElement", [e]));
                return this.addActions(t)
            }
            return this.addActions(fe("removeElement", [e]))
        }
        moveNode(e, t, n) {
            let o;
            if (t && j(t) || console.error("### App Runtime ### moveNode的parent必须是可渲染节点"), n >= 0 || (n = -1),
                j(e)) o = this.moveElement(e.ref, t.ref, n);
            else {
                let r = n;
                e.layoutChildren.every(e => (o = j(e) ? this.moveElement(e.ref, t.ref, r) : this.moveNode(e, t,
                    r), r += z(e), -1 !== o))
            }
            return o
        }
        moveElement(e, t, n) {
            return this.addActions(fe("moveElement", [e, t, n]))
        }
        setProp(e, t, n) {
            const o = {
                prop: {}
            };
            return o.prop[t] = n, this.addActions(fe("updateProps", [e, o]))
        }
        setAttr(e, t, n) {
            const o = {
                attr: {}
            };
            return null == n ? (console.warn(
                    `### App Runtime ### 组件 ${e} 的属性 ${t} 被修改为 undefined/null, 自动修改为默认值或空值`), o.attr[t] =
                "") : o.attr[t] = n, this.addActions(fe("updateAttrs", [e, o]))
        }
        setStyle(e, t, n) {
            const o = {
                style: {}
            };
            return null == n ? (console.warn(
                    `### App Runtime ### 组件 ${e} 的样式 ${t} 被修改为 undefined/null, 自动修改为默认值或空值`), o.style[t] =
                "") : o.style[t] = n, this.addActions(fe("updateStyle", [e, o]))
        }
        setStyles(e, t, n) {
            const o = {
                attr: n
            };
            return t && (o.style = t), this.addActions(fe("updateStyles", [e, o]))
        }
        setStyleObject(e, t, n, o, r) {
            return this.addActions(fe("updateStyleObject", [e, t, n, o, r]))
        }
        addEvent(e, t) {
            return this.addActions(fe("addEvent", [e, t]))
        }
        removeEvent(e, t) {
            return this.addActions(fe("removeEvent", [e, t]))
        }
        updatePageTitleBar(e) {
            return this.addActions(fe("updateTitleBar", [e]))
        }
        updatePageStatusBar(e) {
            return this.addActions(fe("updateStatusBar", [e]))
        }
        scrollTo(e) {
            return this.addActions(fe("scrollTo", [e]))
        }
        scrollBy(e) {
            return this.addActions(fe("scrollBy", [e]))
        }
        exitFullscreen() {
            return this.addActions(fe("exitFullscreen", []))
        }
        collectStatistics(e) {
            return this.addActions(fe("statistics", [e]))
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
    class ye {
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
    let be = !0;
    const ve = function(e, t, ...n) {
        return global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Bridge ### sendActions() 发送消息：${e},${t.length},${JSON.stringify(t)}`), be && (console.record(
                `### App Performance ### 首次发送消息[PERF:callNative]开始(${t.length})：${(new Date).toJSON()}`),
            be = !1), t = JSON.stringify(t, function(e, t) {
            return t && t.constructor === RegExp ? {
                type: _(t),
                source: t.source,
                flags: t.flags
            } : t
        }), global.callNative(e, t, ...n)
    };
    var we = {
        __proto__: null,
        registerComponents: N,
        getComponentDefaultOptions: T,
        bindComponentMethods: O,
        createDocument: function(e) {
            const t = new ye(ve),
                n = new _e(e, t);
            return new me(e, n)
        },
        registerStyleObject: function(e, t, n, o) {
            if (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### 基于节点(${o&&o.ref})注册样式节点(${n})`), !o._ownerDocument) return;
            let r;
            const s = t && t["@info"] || {};
            s && s.styleObjectId ? (r = s.styleObjectId, t = null) : r = function(e, t) {
                let n;
                const o = l(e);
                return o && o._styleObjectMap ? (n = o._styleObjectMap.get(t)) || (function(e) {
                    for (const t in e) {
                        const n = e[t];
                        n && n._meta && delete n._meta
                    }
                }(t), n = f++, o._styleObjectMap.set(t, n)) : (n = f++, global.Env && "trace" ===
                    global.Env.logLevel && console.trace(
                        `### App Runtime ### 获取样式对象ID：文档(${e})已销毁，生成无缓存时的ID：${n}`)), n
            }(o._ownerDocument._docId, t), n || (o._styleObject = t, o._styleObjectId = r);
            const i = d(o._docId);
            i && i.setStyleObject(o.ref, n, e, r, t)
        },
        createEvent: ue,
        createFigment: function(e) {
            const t = new ie;
            return t._ownerDocument = e, t
        },
        updatePageTitleBar: function(e, t) {
            const n = d(e._docId);
            n && n.updatePageTitleBar(t)
        },
        updatePageStatusBar: function(e, t) {
            const n = d(e._docId);
            n && n.updatePageStatusBar(t)
        },
        scrollTo: function(e, t) {
            const n = d(e._docId);
            n && n.scrollTo(t)
        },
        scrollBy: function(e, t) {
            const n = d(e._docId);
            n && n.scrollBy(t)
        },
        exitFullscreen: function(e) {
            const t = d(e._docId);
            t && t.exitFullscreen()
        },
        setElementProp: function(e, t, n, o) {
            if (!e._ownerDocument || "ref" === t) return;
            if (e[t] === n && !1 !== o) return;
            const r = e[t];
            e[t] = n, global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Runtime ### 元素的内部属性(${t})更新(${r}=>${n})`);
            const s = d(e._docId);
            s && s.setProp(e.ref, t, n)
        },
        setElementAttr: te,
        setElementStyle: function(e, t, n, o) {
            e._ownerDocument && (I(e)[t] === n && !1 !== o || (I(e)[t] = n, oe(e, o, "style", null, [t, n])))
        },
        setElementStyles: ne,
        getElementMatchedCssRuleList: function(e, t) {
            const n = I(e),
                o = [{
                    editable: !0,
                    styleSheetName: null,
                    style: F(e._inlineStyleFullList, n)
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
            "INLINE" === t ? (ne(e, o), e._inlineStyleFullList = r, global.Env && "trace" === global.Env.logLevel &&
                    console.trace(`### App Runtime ### 更新样式:元素(${e.ref})的内联样式：${t}:${JSON.stringify(o)}`)) :
                console.warn(`### App Runtime ### 更新样式:该平台版本仅支持更新内联样式，不支持：${t}`)
        },
        resetNodeChildren: function(e) {
            for (let t = 0, n = e.layoutChildren.length; t < n; t++) {
                const n = e.layoutChildren[t];
                n._tmpRenderIndexInParent = W(n, e)
            }
            e.childNodes.length = 0, e.layoutChildren.length = 0
        },
        restoreNodeChildren: function(e, t) {
            if (!t.parentNode || t.parentNode !== e) return;
            e.childNodes.push(t), e.layoutChildren.push(t);
            const n = $(e, !0);
            if (k(t)) {
                const o = d(e._docId),
                    r = G(t),
                    s = r !== t._tmpRenderIndexInParent;
                if (t._tmpRenderIndexInParent = null, o && s) return o.moveNode(t, n, r)
            }
        },
        fireTargetEventListener: X,
        clearTargetEventListener: function(e, n, o) {
            o instanceof Object || (o = {
                capture: !!o
            });
            const r = o.capture ? t.CAPTURING_PHASE : t.BUBBLING_PHASE;
            e._eventTargetListeners[n] && delete e._eventTargetListeners[n][r]
        },
        getDocumentNodeByRef: h,
        isNodeInDocument: function(e) {
            return !(!e || !e._docId)
        },
        recreateDocument: function(e) {
            const t = e.body;
            t ? e.listener.createBody(t) : console.error("### App Runtime ### Document没有body节点, 无法重建")
        },
        destroyTagNode: J,
        getNodeAsJSON: L,
        getNodeDepth: B
    };
    var Ce = {
        init: function() {
            ge()
        },
        Node: i,
        Event: t,
        TouchEvent: n,
        helper: we,
        exposure: {
            registerComponents: N
        }
    };
    const Ee = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var Ae = {
        arrayBufferToBase64: function(e) {
            const t = new Uint8Array(256);
            for (let e = 0; e < Ee.length; e++) t[Ee.charCodeAt(e)] = e;
            const n = new Uint8Array(e),
                o = n.length;
            let r = "";
            for (let e = 0; e < o; e += 3) r += Ee[n[e] >> 2], r += Ee[(3 & n[e]) << 4 | n[e + 1] >> 4], r +=
                Ee[(15 & n[e + 1]) << 2 | n[e + 2] >> 6], r += Ee[63 & n[e + 2]];
            return o % 3 == 2 ? r = r.substring(0, r.length - 1) + "=" : o % 3 == 1 && (r = r.substring(0,
                r.length - 2) + "=="), r
        },
        base64ToArrayBuffer: function(e) {
            const t = new Uint8Array(256);
            for (let e = 0; e < Ee.length; e++) t[Ee.charCodeAt(e)] = e;
            let n = .75 * e.length;
            const o = e.length;
            let r, s, i, a, l, d = 0;
            "=" === e[e.length - 1] && (n--, "=" === e[e.length - 2] && n--);
            const c = new ArrayBuffer(n),
                h = new Uint8Array(c);
            for (r = 0; r < o; r += 4) s = t[e.charCodeAt(r)], i = t[e.charCodeAt(r + 1)], a = t[e.charCodeAt(
                    r + 2)], l = t[e.charCodeAt(r + 3)], h[d++] = s << 2 | i >> 4, h[d++] = (15 & i) << 4 |
                a >> 2, h[d++] = (3 & a) << 6 | 63 & l;
            return c
        },
        btoa: function(e) {
            const t = String(e);
            let n = Ee,
                o = 0,
                r = "";
            for (let e, s, i = .75; !isNaN(e = t.charCodeAt(i)) || 63 & o || (n = "=", (i - .75) % 1); i +=
                .75)
                if (e > 127) {
                    (s = encodeURI(t.charAt(i)).split("%")).shift();
                    for (let e, t = i % 1; s[0 | t]; t += .75) e = s[0 | t], o = o << 8 | parseInt(e, 16),
                        r += n.charAt(63 & o >> 8 - t % 1 * 8);
                    i = .75 === i ? 0 : i, i += .75 * s.length % 1
                } else o = o << 8 | e, r += n.charAt(63 & o >> 8 - i % 1 * 8);
            return r
        }
    };
    let Fe = 0;
    let xe = 1;
    const Ne = function() {};
    class Te {
        constructor() {
            this._id = xe++, this._width = 0, this._height = 0, this._src = void 0, this._onload = Ne, this._onerror =
                Ne, this.complete = !1
        }
        get width() {
            return this._width
        }
        set width(e) {
            this._width = e
        }
        get height() {
            return this._height
        }
        set height(e) {
            this._height = e
        }
        get src() {
            return this._src
        }
        set src(e) {
            e.startsWith("//") && (e = "http:" + e), this._src = e, Te.channel.preloadImage([this._src, this._id],
                e => {
                    let t = {};
                    "string" == typeof e && (e = JSON.parse(e)), e.error ? (t = {
                        type: "error",
                        target: this,
                        error: e.error
                    }, this.onerror(t)) : (this.complete = !0, this.width = "number" == typeof e.width ?
                        e.width : 0, this.height = "number" == typeof e.height ? e.height : 0, t = {
                            type: "load",
                            target: this
                        }, this.onload(t))
                })
        }
        addEventListener(e, t) {
            "load" === e ? this.onload = t : "error" === e && (this.onerror = t)
        }
        removeEventListener(e, t) {
            "load" === e ? this.onload = Ne : "error" === e && (this.onerror = Ne)
        }
        get onload() {
            return this._onload
        }
        set onload(e) {
            this._onload = e
        }
        get onerror() {
            return this._onerror
        }
        set onerror(e) {
            this._onerror = e
        }
    }
    class Oe {
        constructor(e, t) {
            this._style = t, this._img = e
        }
    }
    class Se {
        constructor() {
            arguments && 3 === arguments.length ? (this._start_pos = {
                _x: arguments[0],
                _y: arguments[1],
                _r: 0
            }, this._end_pos = {
                _x: arguments[0],
                _y: arguments[1],
                _r: arguments[2]
            }, this._type = "radial") : arguments && 4 === arguments.length ? (this._start_pos = {
                _x: arguments[0],
                _y: arguments[1]
            }, this._end_pos = {
                _x: arguments[2],
                _y: arguments[3]
            }, this._type = "linear") : arguments && 6 === arguments.length && (this._start_pos = {
                _x: arguments[0],
                _y: arguments[1],
                _r: arguments[2]
            }, this._end_pos = {
                _x: arguments[3],
                _y: arguments[4],
                _r: arguments[5]
            }, this._type = "radial"), this._stop_count = 0, this._stops = [0, 0, 0, 0, 0]
        }
        addColorStop(e, t) {
            this._stop_count < 5 && e >= 0 && e <= 1 && (this._stops[this._stop_count] = {
                _pos: e,
                _color: t
            }, this._stop_count++)
        }
    }
    class Ie {
        constructor(e) {
            this._width = e
        }
        get width() {
            return this._width
        }
    }
    class Re {
        constructor(e) {
            this.className = "CanvasRenderingContext2D", this._drawCommands = "", this._globalAlpha = 1, this._fillStyle =
                "rgb(0,0,0)", this._strokeStyle = "rgb(0,0,0)", this._lineWidth = 1, this._lineDashOffset = 0,
                this._lineDash = [], this._lineCap = "butt", this._lineJoin = "miter", this._miterLimit = 10,
                this._globalCompositeOperation = "source-over", this._textAlign = "start", this._textBaseline =
                "alphabetic", this._font = "10px sans-serif", this._savedGlobalAlpha = [], this._shadowBlur = 0,
                this._shadowColor = "rgba(0,0,0,0)", this._shadowOffsetX = 0, this._shadowOfssetY = 0, this.timer =
                null, this._pageId = e._docId, this.componentId = e.ref, this.canvas = e, this.schedule = !1
        }
        set fillStyle(e) {
            this._fillStyle = e;
            let t = "";
            if ("string" == typeof e) this._drawCommands = this._drawCommands.concat("AA" + e + ";");
            else if (e instanceof Oe) {
                const t = e._img;
                this._drawCommands = this._drawCommands.concat("AB" + t._id + "," + e._style + ";")
            } else if ("linear" === e._type) {
                t = "AC" + e._start_pos._x.toFixed(2) + "," + e._start_pos._y.toFixed(2) + "," + e._end_pos._x.toFixed(
                    2) + "," + e._end_pos._y.toFixed(2);
                for (let n = 0; n < e._stop_count; ++n) t += "," + e._stops[n]._pos + "," + e._stops[n]._color;
                this._drawCommands = this._drawCommands.concat(t + ";")
            } else if ("radial" === e._type) {
                t = "AD" + e._start_pos._x.toFixed(2) + "," + e._start_pos._y.toFixed(2) + "," + e._start_pos._r
                    .toFixed(2) + "," + e._end_pos._x.toFixed(2) + "," + e._end_pos._y.toFixed(2) + "," + e._end_pos
                    ._r.toFixed(2);
                for (let n = 0; n < e._stop_count; ++n) t += "," + e._stops[n]._pos + "," + e._stops[n]._color;
                this._drawCommands = this._drawCommands.concat(t + ";")
            }
            this.usePromise()
        }
        get fillStyle() {
            return this._fillStyle
        }
        get globalAlpha() {
            return this._globalAlpha
        }
        set globalAlpha(e) {
            this._globalAlpha = e, this._drawCommands = this._drawCommands.concat("C?" + e.toFixed(2) + ";"),
                this.usePromise()
        }
        get strokeStyle() {
            return this._strokeStyle
        }
        set strokeStyle(e) {
            this._strokeStyle = e;
            let t = "";
            if ("string" == typeof e) this._drawCommands = this._drawCommands.concat("NA" + e + ";");
            else if (e instanceof Oe) {
                const t = e._img;
                this._drawCommands = this._drawCommands.concat("NB" + t._id + "," + e._style + ";")
            } else if ("linear" === e._type) {
                t = "NC" + e._start_pos._x.toFixed(2) + "," + e._start_pos._y.toFixed(2) + "," + e._end_pos._x.toFixed(
                    2) + "," + e._end_pos._y.toFixed(2);
                for (let n = 0; n < e._stop_count; ++n) t += "," + e._stops[n]._pos + "," + e._stops[n]._color;
                this._drawCommands = this._drawCommands.concat(t + ";")
            } else if ("radial" === e._type) {
                t = "ND" + e._start_pos._x.toFixed(2) + "," + e._start_pos._y.toFixed(2) + "," + e._start_pos._r
                    .toFixed(2) + "," + e._end_pos._x.toFixed(2) + "," + e._end_pos._y.toFixed(2) + "," + e._end_pos
                    ._r.toFixed(2);
                for (let n = 0; n < e._stop_count; ++n) t += "," + e._stops[n]._pos + "," + e._stops[n]._color;
                this._drawCommands = this._drawCommands.concat(t + ";")
            }
            this.usePromise()
        }
        get lineWidth() {
            return this._lineWidth
        }
        set lineWidth(e) {
            this._lineWidth = e, this._drawCommands = this._drawCommands.concat("H?" + e + ";"), this.usePromise()
        }
        get lineCap() {
            return this._lineCap
        }
        set lineCap(e) {
            this._lineCap = e, this._drawCommands = this._drawCommands.concat("E?" + e + ";"), this.usePromise()
        }
        get lineJoin() {
            return this._lineJoin
        }
        set lineJoin(e) {
            this._lineJoin = e, this._drawCommands = this._drawCommands.concat("G?" + e + ";"), this.usePromise()
        }
        get miterLimit() {
            return this._miterLimit
        }
        set miterLimit(e) {
            this._miterLimit = e, this._drawCommands = this._drawCommands.concat("I?" + e + ";"), this.usePromise()
        }
        get globalCompositeOperation() {
            return this._globalCompositeOperation
        }
        set globalCompositeOperation(e) {
            this._globalCompositeOperation = e, this._drawCommands = this._drawCommands.concat("D?" + e + ";"),
                this.usePromise()
        }
        get textAlign() {
            return this._textAlign
        }
        set textAlign(e) {
            this._textAlign = e, this._drawCommands = this._drawCommands.concat("O?" + e + ";"), this.usePromise()
        }
        get textBaseline() {
            return this._textBaseline
        }
        set textBaseline(e) {
            this._textBaseline = e, this._drawCommands = this._drawCommands.concat("P?" + e + ";"), this.usePromise()
        }
        get font() {
            return this._font
        }
        set font(e) {
            this._font = e, this._drawCommands = this._drawCommands.concat("B?" + e + ";"), this.usePromise()
        }
        setTransform(e, t, n, o, r, s) {
            this._drawCommands = this._drawCommands.concat("l?" + (1 === e ? "1" : e.toFixed(2)) + "," + (0 ===
                t ? "0" : t.toFixed(2)) + "," + (0 === n ? "0" : n.toFixed(2)) + "," + (1 === o ? "1" :
                o.toFixed(2)) + "," + r.toFixed(2) + "," + s.toFixed(2) + ";"), this.usePromise()
        }
        transform(e, t, n, o, r, s) {
            this._drawCommands = this._drawCommands.concat("p?" + (1 === e ? "1" : e.toFixed(2)) + "," + (0 ===
                t ? "0" : t.toFixed(2)) + "," + (0 === n ? "0" : n.toFixed(2)) + "," + (1 === o ? "1" :
                o.toFixed(2)) + "," + r + "," + s + ";"), this.usePromise()
        }
        resetTransform() {
            this._drawCommands = this._drawCommands.concat("r?;"), this.usePromise()
        }
        scale(e, t) {
            this._drawCommands = this._drawCommands.concat("j?" + e.toFixed(2) + "," + t.toFixed(2) + ";"),
                this.usePromise()
        }
        rotate(e) {
            this._drawCommands = this._drawCommands.concat("h?" + e.toFixed(6) + ";"), this.usePromise()
        }
        translate(e, t) {
            this._drawCommands = this._drawCommands.concat("q?" + e.toFixed(2) + "," + t.toFixed(2) + ";"),
                this.usePromise()
        }
        save() {
            this._savedGlobalAlpha.push(this._globalAlpha), this._drawCommands = this._drawCommands.concat(
                "i?;"), this.usePromise()
        }
        restore() {
            this._drawCommands = this._drawCommands.concat("g?;"), this._globalAlpha = this._savedGlobalAlpha.pop(),
                this.usePromise()
        }
        createPattern(e, t) {
            return new Oe(e, t)
        }
        createLinearGradient(e, t, n, o) {
            return new Se(e, t, n, o)
        }
        createRadialGradient() {
            return arguments && 3 === arguments.length ? new Se(arguments[0], arguments[1], arguments[2]) :
                arguments && 6 === arguments.length ? new Se(arguments[0], arguments[1], arguments[2],
                    arguments[3], arguments[4], arguments[5]) : void 0
        }
        strokeRect(e, t, n, o) {
            this._drawCommands = this._drawCommands.concat("n?" + e + "," + t + "," + n + "," + o + ";"), this.usePromise()
        }
        clearRect(e, t, n, o) {
            this._drawCommands = this._drawCommands.concat("U?" + e + "," + t + "," + n + "," + o + ";"), this.usePromise()
        }
        clip() {
            this._drawCommands = this._drawCommands.concat("V?;"), this.usePromise()
        }
        closePath() {
            this._drawCommands = this._drawCommands.concat("W?;"), this.usePromise()
        }
        moveTo(e, t) {
            this._drawCommands = this._drawCommands.concat("c?" + e.toFixed(2) + "," + t.toFixed(2) + ";"),
                this.usePromise()
        }
        lineTo(e, t) {
            this._drawCommands = this._drawCommands.concat("b?" + e.toFixed(2) + "," + t.toFixed(2) + ";"),
                this.usePromise()
        }
        getLineDash() {
            return this._lineDash
        }
        setLineDash(e) {
            if (Array.isArray(e)) {
                for (let t = 0, n = e.length; t < n; t++) {
                    if ("number" != typeof e[t] || e[t] < 0) return void console.warn(
                        "### App Canvas ### setLineDash 的参数必须为数组，且数组元素为数字类型，元素值不小于0");
                    if (isNaN(e[t])) return void console.warn(
                        "### App Canvas ### setLineDash 的参数必须为数组且元素值不能为 NaN")
                }
                e.length % 2 == 1 && e.push(...e), this._lineDash = e, this._drawCommands = this._drawCommands.concat(
                    "k?" + e + ";"), this.usePromise()
            } else console.warn("### App Canvas ### setLineDash 的参数必须为数组")
        }
        get lineDashOffset() {
            return this._lineDashOffset
        }
        set lineDashOffset(e) {
            "number" == typeof e ? isNaN(e) ? console.warn("### App Canvas ### lineDashOffset 值不能为 NaN") : (
                this._lineDashOffset = e, this._drawCommands = this._drawCommands.concat("F?" + e + ";"),
                this.usePromise()) : console.warn("### App Canvas ### lineDashOffset 值必须为数字类型")
        }
        quadraticCurveTo(e, t, n, o) {
            this._drawCommands = this._drawCommands.concat("e?" + e + "," + t + "," + n + "," + o + ";"), this.usePromise()
        }
        bezierCurveTo(e, t, n, o, r, s) {
            this._drawCommands = this._drawCommands.concat("T?" + e.toFixed(2) + "," + t.toFixed(2) + "," + n.toFixed(
                2) + "," + o.toFixed(2) + "," + r.toFixed(2) + "," + s.toFixed(2) + ";"), this.usePromise()
        }
        arcTo(e, t, n, o, r) {
            this._drawCommands = this._drawCommands.concat("R?" + e + "," + t + "," + n + "," + o + "," + r +
                ";"), this.usePromise()
        }
        beginPath() {
            this._drawCommands = this._drawCommands.concat("S?;")
        }
        fillRect(e, t, n, o) {
            this._drawCommands = this._drawCommands.concat("Z?" + e + "," + t + "," + n + "," + o + ";"), this.usePromise()
        }
        rect(e, t, n, o) {
            this._drawCommands = this._drawCommands.concat("f?" + e + "," + t + "," + n + "," + o + ";"), this.usePromise()
        }
        fill() {
            this._drawCommands = this._drawCommands.concat("Y?;"), this.usePromise()
        }
        stroke() {
            this._drawCommands = this._drawCommands.concat("m?;"), this.usePromise()
        }
        arc(e, t, n, o, r, s) {
            let i = 0;
            s && (i = 1), this._drawCommands = this._drawCommands.concat("Q?" + e.toFixed(2) + "," + t.toFixed(
                2) + "," + n.toFixed(2) + "," + o + "," + r + "," + i + ";"), this.usePromise()
        }
        fillText() {
            if (arguments) switch (arguments.length) {
                case 3:
                    this._drawCommands = this._drawCommands.concat("a?" + Ae.btoa(arguments[0]) + "," +
                        arguments[1] + "," + arguments[2] + ";"), this.usePromise();
                    break;
                case 4:
                    this._drawCommands = this._drawCommands.concat("a?" + Ae.btoa(arguments[0]) + "," +
                        arguments[1] + "," + arguments[2] + "," + arguments[3] + ";"), this.usePromise()
            }
        }
        strokeText() {
            if (arguments) switch (arguments.length) {
                case 3:
                    this._drawCommands = this._drawCommands.concat("o?" + Ae.btoa(arguments[0]) + "," +
                        arguments[1] + "," + arguments[2] + ";"), this.usePromise();
                    break;
                case 4:
                    this._drawCommands = this._drawCommands.concat("o?" + Ae.btoa(arguments[0]) + "," +
                        arguments[1] + "," + arguments[2] + "," + arguments[3] + ";"), this.usePromise()
            }
        }
        measureText(e) {
            this.sendImmediately();
            const t = "!?" + Ae.btoa(e) + "," + this._font + ";",
                n = Re.channel.render2dSync(this._pageId, this.componentId, t);
            return n.error ? new Ie(0) : new Ie(parseFloat(n.width))
        }
        isPointInPath(e, t) {
            throw new Error("Canvas not supported yet")
        }
        drawImage(e, t, n, o, r, s, i, a, l) {
            const d = arguments.length;
            if ("image" === e.type) {
                const t = e.attr.src;
                (e = new Te).width = 0, e.height = 0, e.src = t
            }
            this._drawCommands += function(e) {
                if (3 === d) {
                    const o = parseFloat(t) || 0,
                        r = parseFloat(n) || 0;
                    return "X?" + e._id + ",0,0," + e.width + "," + e.height + "," + o + "," + r + "," + e.width +
                        "," + e.height + ";"
                }
                if (5 === d) {
                    const s = parseFloat(t) || 0,
                        i = parseFloat(n) || 0,
                        a = parseInt(o) || e.width,
                        l = parseInt(r) || e.height;
                    return "X?" + e._id + ",0,0," + e.width + "," + e.height + "," + s + "," + i + "," + a +
                        "," + l + ";"
                }
                if (9 === d) return t = parseFloat(t) || 0, n = parseFloat(n) || 0, o = parseInt(o) || e.width,
                    r = parseInt(r) || e.height, s = parseFloat(s) || 0, i = parseFloat(i) || 0, a =
                    parseInt(a) || e.width, l = parseInt(l) || e.height, "X?" + e._id + "," + t + "," +
                    n + "," + o + "," + r + "," + s + "," + i + "," + a + "," + l + ";"
            }(e), this.usePromise()
        }
        getImageData(e, t, n, o) {
            if (n <= 0 || o <= 0) throw new Error("the source width or height must be > 0");
            this.sendImmediately();
            const r = "@?" + e + "," + t + "," + n + "," + o + ";",
                s = Re.channel.render2dSync(this._pageId, this.componentId, r);
            return s.error ? {
                width: 0,
                height: 0,
                data: new Uint8ClampedArray(0)
            } : {
                data: new Uint8ClampedArray(s.data),
                width: s.width,
                height: s.height
            }
        }
        createImageData(e, t) {
            let n;
            return 1 === arguments.length && (e = (n = e).width, t = n.height), (e <= 0 || t <= 0) && (e = 0, t =
                0), {
                width: e,
                height: t,
                data: new Uint8ClampedArray(e * t * 4)
            }
        }
        putImageData(e, t, n, o = 0, r = 0, s, i) {
            const a = arguments.length,
                l = e.width,
                d = e.height,
                c = e.data;
            if (c.length !== d * l * 4) throw new Error("illegal ImageData");
            if (3 === a) this._drawCommands = this._drawCommands.concat("d?" + l + "," + d + "," + Ae.arrayBufferToBase64(
                c) + "," + t + "," + n + ";");
            else if (7 === a) {
                const e = {
                    left: o < 0 ? 0 : o,
                    top: r < 0 ? 0 : r
                };
                e.right = Math.min(Math.max(o + s, e.left), l), e.bottom = Math.min(Math.max(r + i, e.top), d),
                    o = e.left, r = e.top, s = e.right - e.left, i = e.bottom - e.top;
                const a = new Uint8ClampedArray(s * i * 4);
                let h, u = 0;
                for (let t = r; t < e.bottom; t++) {
                    h = 4 * (l * t + o);
                    for (let e = 0; e < s; e++) a[u] = c[h], a[u + 1] = c[h + 1], a[u + 2] = c[h + 2], a[u + 3] =
                        c[h + 3], u += 4, h += 4
                }
                this._drawCommands = this._drawCommands.concat("d?" + s + "," + i + "," + Ae.arrayBufferToBase64(
                    a) + "," + t + "," + n + ";")
            }
            this.usePromise()
        }
        get shadowBlur() {
            return this._shadowBlur
        }
        set shadowBlur(e) {
            e < 0 || isNaN(e) || (this._globalAlpha = e, this._drawCommands = this._drawCommands.concat("J?" +
                e + ";"), this.usePromise())
        }
        get shadowColor() {
            return this._shadowColor
        }
        set shadowColor(e) {
            this._shadowColor = e, this._drawCommands = this._drawCommands.concat("K?" + e + ";"), this.usePromise()
        }
        get shadowOffsetX() {
            return this._shadowOffsetX
        }
        set shadowOffsetX(e) {
            e < 0 || isNaN(e) || (this._shadowOffsetX = e, this._drawCommands = this._drawCommands.concat("L?" +
                e + ";"), this.usePromise())
        }
        get shadowOffsetY() {
            return this._shadowOffsetY
        }
        set shadowOffsetY(e) {
            e < 0 || isNaN(e) || (this._shadowOffsetY = e, this._drawCommands = this._drawCommands.concat("M?" +
                e + ";"), this.usePromise())
        }
        usePromise() {
            const e = this;
            e.schedule || (Promise.resolve().then(() => {
                e.sendImmediately(), e.schedule = !1
            }), e.schedule = !0)
        }
        sendImmediately() {
            Re.channel.render2d(this._pageId, this.componentId, this._drawCommands), this._drawCommands = ""
        }
    }
    const Pe = function() {
        let e = null;
        const t = {};
        return {
            getModule: t => e,
            setModule(n, o) {
                const r = "__native_module__" + n;
                t[r] || (t[r] = o, e = o)
            },
            callGetContext(t, n, o) {
                e.getContext({
                    pageId: t,
                    componentId: n,
                    type: o
                })
            },
            render2dSync: (t, n, o) => e.canvasNative2DSync({
                pageId: t,
                componentId: n,
                commands: o
            }),
            render2d: function(t, n, o) {
                o && (global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Canvas render2d ### ${o} `), e.canvasNative2D({
                    pageId: t,
                    componentId: n,
                    commands: o
                }))
            },
            preloadImage([t, n], o) {
                global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Canvas preloadImage url ### ${t} `), e.preloadImage({
                    url: t,
                    id: n,
                    success: function(e) {
                        e.url = t, e.id = n, o && o(e)
                    }
                })
            }
        }
    }();
    var De = {
        enable: function(e, t, {
            module: n
        } = {}) {
            e._bindTexture = [], Pe.setModule(t.id, n), Te.channel = Re.channel = Pe, global.Image = Te;
            const o = {};
            e.getContext = function(e) {
                let t = null;
                const n = this._docId;
                if (!e.match(/2d/i)) throw new Error("### App Canvas ### not supported context " + e);
                return o[this.ref] || (o[this.ref] = new Re(this)), t = o[this.ref], Pe.callGetContext(
                    n, this.ref, "2d"), t
            };
            const r = e.toTempFilePath;
            return e.toTempFilePath = ((...t) => {
                const n = e.getContext("2d");
                Re.channel.render2d(n._pageId, n.componentId, n._drawCommands), n._drawCommands =
                    "", r(...t)
            }), e
        }
    };
    const Le = new Map([
        ["forall", "∀"],
        ["part", "∂"],
        ["exists", "∃"],
        ["empty", "∅"],
        ["nabla", "∇"],
        ["isin", "∈"],
        ["notin", "∉"],
        ["ni", "∋"],
        ["prod", "∏"],
        ["sum", "∑"],
        ["minus", "−"],
        ["lowast", "∗"],
        ["radic", "√"],
        ["prop", "∝"],
        ["infin", "∞"],
        ["ang", "∠"],
        ["and", "∧"],
        ["or", "∨"],
        ["cap", "∩"],
        ["cup", "∪"],
        ["int", "∫"],
        ["there4", "∴"],
        ["sim", "∼"],
        ["cong", "≅"],
        ["asymp", "≈"],
        ["ne", "≠"],
        ["le", "≤"],
        ["ge", "≥"],
        ["sub", "⊂"],
        ["sup", "⊃"],
        ["nsub", "⊄"],
        ["sube", "⊆"],
        ["supe", "⊇"],
        ["oplus", "⊕"],
        ["otimes", "⊗"],
        ["perp", "⊥"],
        ["sdot", "⋅"],
        ["Alpha", "Α"],
        ["Beta", "Β"],
        ["Gamma", "Γ"],
        ["Delta", "Δ"],
        ["Epsilon", "Ε"],
        ["Zeta", "Ζ"],
        ["Eta", "Η"],
        ["Theta", "Θ"],
        ["Iota", "Ι"],
        ["Kappa", "Κ"],
        ["Lambda", "Λ"],
        ["Mu", "Μ"],
        ["Nu", "Ν"],
        ["Xi", "Ν"],
        ["Omicron", "Ο"],
        ["Pi", "Π"],
        ["Rho", "Ρ"],
        ["Sigma", "Σ"],
        ["Tau", "Τ"],
        ["Upsilon", "Υ"],
        ["Phi", "Φ"],
        ["Chi", "Χ"],
        ["Psi", "Ψ"],
        ["Omega", "Ω"],
        ["alpha", "α"],
        ["beta", "β"],
        ["gamma", "γ"],
        ["delta", "δ"],
        ["epsilon", "ε"],
        ["zeta", "ζ"],
        ["eta", "η"],
        ["theta", "θ"],
        ["iota", "ι"],
        ["kappa", "κ"],
        ["lambda", "λ"],
        ["mu", "μ"],
        ["nu", "ν"],
        ["xi", "ξ"],
        ["omicron", "ο"],
        ["pi", "π"],
        ["rho", "ρ"],
        ["sigmaf", "ς"],
        ["sigma", "σ"],
        ["tau", "τ"],
        ["upsilon", "υ"],
        ["phi", "φ"],
        ["chi", "χ"],
        ["psi", "ψ"],
        ["omega", "ω"],
        ["thetasym", "ϑ"],
        ["upsih", "ϒ"],
        ["piv", "ϖ"],
        ["middot", "·"],
        ["nbsp", " "],
        ["quot", "'"],
        ["amp", "&"],
        ["lt", "<"],
        ["gt", ">"],
        ["OElig", "Œ"],
        ["oelig", "œ"],
        ["Scaron", "Š"],
        ["scaron", "š"],
        ["Yuml", "Ÿ"],
        ["fnof", "ƒ"],
        ["circ", "ˆ"],
        ["tilde", "˜"],
        ["ensp", ""],
        ["emsp", ""],
        ["thinsp", ""],
        ["zwnj", ""],
        ["zwj", ""],
        ["lrm", ""],
        ["rlm", ""],
        ["ndash", "–"],
        ["mdash", "—"],
        ["lsquo", "‘"],
        ["rsquo", "’"],
        ["sbquo", "‚"],
        ["ldquo", "“"],
        ["rdquo", "”"],
        ["bdquo", "„"],
        ["dagger", "†"],
        ["Dagger", "‡"],
        ["bull", "•"],
        ["hellip", "…"],
        ["permil", "‰"],
        ["prime", "′"],
        ["Prime", "″"],
        ["lsaquo", "‹"],
        ["rsaquo", "›"],
        ["oline", "‾"],
        ["euro", "€"],
        ["trade", "™"],
        ["larr", "←"],
        ["uarr", "↑"],
        ["rarr", "→"],
        ["darr", "↓"],
        ["harr", "↔"],
        ["crarr", "↵"],
        ["lceil", "⌈"],
        ["rceil", "⌉"],
        ["lfloor", "⌊"],
        ["rfloor", "⌋"],
        ["loz", "◊"],
        ["spades", "♠"],
        ["clubs", "♣"],
        ["hearts", "♥"],
        ["diams", "♦"],
        ["#8203", ""]
    ]);

    function Be(e) {
        const t = new Map,
            n = e.split(",");
        for (let e = 0; e < n.length; e++) t.set(n[e], !0);
        return t
    }

    function ke(e) {
        return e.replace(/-([a-z])/g, function(e, t) {
            return t.toUpperCase()
        })
    }

    function je(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase()
        })
    }

    function $e(e, t) {
        const n = [];
        if (t) switch (e.forEach((e, t) => {
            n[t] = {}, n[t].n = e
        }), t.length) {
            case 1:
                e.forEach((e, o) => {
                    n[o].v = t[0]
                });
                break;
            case 2:
                e.forEach((e, o) => {
                    n[o].v = o % 2 ? t[1] : t[0]
                });
                break;
            case 3:
                e.forEach((e, o) => {
                    n[o].v = o % 2 ? t[1] : t[o]
                });
                break;
            default:
                e.forEach((e, o) => {
                    n[o].v = t[o]
                })
        }
        return n
    }

    function Me(e) {
        return "number" == typeof e || "string" == typeof e
    }
    const ze =
        /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
        Ue = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
        Ge = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
        We = Be(
            "area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
        Je = Be(
            "br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"
        ),
        He = Be(
            "abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"
        ),
        qe = Be("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
        Ze = Be(
            "checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"
        ),
        Xe = Be("script,style,block");
    const Ye = ["NOTE", "WARNING", "ERROR"],
        Ve = new Map([
            ["aliceblue", "#F0F8FF"],
            ["antiquewhite", "#FAEBD7"],
            ["aqua", "#00FFFF"],
            ["aquamarine", "#7FFFD4"],
            ["azure", "#F0FFFF"],
            ["beige", "#F5F5DC"],
            ["bisque", "#FFE4C4"],
            ["black", "#000000"],
            ["blanchedalmond", "#FFEBCD"],
            ["blue", "#0000FF"],
            ["blueviolet", "#8A2BE2"],
            ["brown", "#A52A2A"],
            ["burlywood", "#DEB887"],
            ["cadetblue", "#5F9EA0"],
            ["chartreuse", "#7FFF00"],
            ["chocolate", "#D2691E"],
            ["coral", "#FF7F50"],
            ["cornflowerblue", "#6495ED"],
            ["cornsilk", "#FFF8DC"],
            ["crimson", "#DC143C"],
            ["cyan", "#00FFFF"],
            ["darkblue", "#00008B"],
            ["darkcyan", "#008B8B"],
            ["darkgoldenrod", "#B8860B"],
            ["darkgray", "#A9A9A9"],
            ["darkgreen", "#006400"],
            ["darkgrey", "#A9A9A9"],
            ["darkkhaki", "#BDB76B"],
            ["darkmagenta", "#8B008B"],
            ["darkolivegreen", "#556B2F"],
            ["darkorange", "#FF8C00"],
            ["darkorchid", "#9932CC"],
            ["darkred", "#8B0000"],
            ["darksalmon", "#E9967A"],
            ["darkseagreen", "#8FBC8F"],
            ["darkslateblue", "#483D8B"],
            ["darkslategray", "#2F4F4F"],
            ["darkslategrey", "#2F4F4F"],
            ["darkturquoise", "#00CED1"],
            ["darkviolet", "#9400D3"],
            ["deeppink", "#FF1493"],
            ["deepskyblue", "#00BFFF"],
            ["dimgray", "#696969"],
            ["dimgrey", "#696969"],
            ["dodgerblue", "#1E90FF"],
            ["firebrick", "#B22222"],
            ["floralwhite", "#FFFAF0"],
            ["forestgreen", "#228B22"],
            ["fuchsia", "#FF00FF"],
            ["gainsboro", "#DCDCDC"],
            ["ghostwhite", "#F8F8FF"],
            ["gold", "#FFD700"],
            ["goldenrod", "#DAA520"],
            ["gray", "#808080"],
            ["green", "#008000"],
            ["greenyellow", "#ADFF2F"],
            ["grey", "#808080"],
            ["honeydew", "#F0FFF0"],
            ["hotpink", "#FF69B4"],
            ["indianred", "#CD5C5C"],
            ["indigo", "#4B0082"],
            ["ivory", "#FFFFF0"],
            ["khaki", "#F0E68C"],
            ["lavender", "#E6E6FA"],
            ["lavenderblush", "#FFF0F5"],
            ["lawngreen", "#7CFC00"],
            ["lemonchiffon", "#FFFACD"],
            ["lightblue", "#ADD8E6"],
            ["lightcoral", "#F08080"],
            ["lightcyan", "#E0FFFF"],
            ["lightgoldenrodyellow", "#FAFAD2"],
            ["lightgray", "#D3D3D3"],
            ["lightgreen", "#90EE90"],
            ["lightgrey", "#D3D3D3"],
            ["lightpink", "#FFB6C1"],
            ["lightsalmon", "#FFA07A"],
            ["lightseagreen", "#20B2AA"],
            ["lightskyblue", "#87CEFA"],
            ["lightslategray", "#778899"],
            ["lightslategrey", "#778899"],
            ["lightsteelblue", "#B0C4DE"],
            ["lightyellow", "#FFFFE0"],
            ["lime", "#00FF00"],
            ["limegreen", "#32CD32"],
            ["linen", "#FAF0E6"],
            ["magenta", "#FF00FF"],
            ["maroon", "#800000"],
            ["mediumaquamarine", "#66CDAA"],
            ["mediumblue", "#0000CD"],
            ["mediumorchid", "#BA55D3"],
            ["mediumpurple", "#9370DB"],
            ["mediumseagreen", "#3CB371"],
            ["mediumslateblue", "#7B68EE"],
            ["mediumspringgreen", "#00FA9A"],
            ["mediumturquoise", "#48D1CC"],
            ["mediumvioletred", "#C71585"],
            ["midnightblue", "#191970"],
            ["mintcream", "#F5FFFA"],
            ["mistyrose", "#FFE4E1"],
            ["moccasin", "#FFE4B5"],
            ["navajowhite", "#FFDEAD"],
            ["navy", "#000080"],
            ["oldlace", "#FDF5E6"],
            ["olive", "#808000"],
            ["olivedrab", "#6B8E23"],
            ["orange", "#FFA500"],
            ["orangered", "#FF4500"],
            ["orchid", "#DA70D6"],
            ["palegoldenrod", "#EEE8AA"],
            ["palegreen", "#98FB98"],
            ["paleturquoise", "#AFEEEE"],
            ["palevioletred", "#DB7093"],
            ["papayawhip", "#FFEFD5"],
            ["peachpuff", "#FFDAB9"],
            ["peru", "#CD853F"],
            ["pink", "#FFC0CB"],
            ["plum", "#DDA0DD"],
            ["powderblue", "#B0E0E6"],
            ["purple", "#800080"],
            ["red", "#FF0000"],
            ["rosybrown", "#BC8F8F"],
            ["royalblue", "#4169E1"],
            ["saddlebrown", "#8B4513"],
            ["salmon", "#FA8072"],
            ["sandybrown", "#F4A460"],
            ["seagreen", "#2E8B57"],
            ["seashell", "#FFF5EE"],
            ["sienna", "#A0522D"],
            ["silver", "#C0C0C0"],
            ["skyblue", "#87CEEB"],
            ["slateblue", "#6A5ACD"],
            ["slategray", "#708090"],
            ["slategrey", "#708090"],
            ["snow", "#FFFAFA"],
            ["springgreen", "#00FF7F"],
            ["steelblue", "#4682B4"],
            ["tan", "#D2B48C"],
            ["teal", "#008080"],
            ["thistle", "#D8BFD8"],
            ["tomato", "#FF6347"],
            ["turquoise", "#40E0D0"],
            ["violet", "#EE82EE"],
            ["wheat", "#F5DEB3"],
            ["white", "#FFFFFF"],
            ["whitesmoke", "#F5F5F5"],
            ["yellow", "#FFFF00"],
            ["yellowgreen", "#9ACD32"]
        ]),
        Ke = ["px", "%"],
        Qe = /^[-+]?[0-9]*\.?[0-9]+(.*)$/,
        et = /^#[0-9a-fA-F]{6}$/,
        tt = /^#[0-9a-fA-F]{3}$/,
        nt = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
        ot = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)$/,
        rt = /^hsl\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*\)$/,
        st = /^hsla\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*,\s*(\d*\.?\d+)\s*\)$/,
        it = /^[-+]?[0-9]+$/,
        at = /^url\(\s*['"]?\s*([^()]+?)\s*['"]?\s*\)$/,
        lt = /^[a-zA-Z_][a-zA-Z0-9]*$/,
        dt = /^[-+]?[0-9]*\.?[0-9]+$/,
        ct = {
            length: function(e, t) {
                const n = (e = (e || "").toString()).match(Qe);
                if (t || (t = Ke), n) {
                    const o = n[1];
                    return o ? t.indexOf(o.toLowerCase()) >= 0 ? {
                        value: e
                    } : {
                        value: parseFloat(e) + t[0],
                        reason: function(e, n, r) {
                            return "ERROR: 属性 `" + je(e) + "` 不支持单位 `" + o + "`, 目前仅支持 `" + JSON.stringify(
                                t) + "`"
                        }
                    } : {
                        value: parseFloat(e) + t[0],
                        reason: function(e, n, o) {
                            return "WARNING: 属性 `" + je(e) + "` 没有指定单位，默认为 `" + t[0] + "`"
                        }
                    }
                }
                return {
                    value: null,
                    reason: function(e, t, n) {
                        return "ERROR: 属性 `" + je(e) + "` 的值 `" + t + "` 不正确(仅支持数值)"
                    }
                }
            },
            color: function(e) {
                if ((e = (e || "").toString()).match(et)) return {
                    value: e
                };
                if (e.match(tt)) return {
                    value: "#" + e[1] + e[1] + e[2] + e[2] + e[3] + e[3],
                    reason: function(e, t, n) {
                        return "NOTE: 颜色值 `" + t + "` 转换为 `" + n + "`"
                    }
                };
                if (Ve.get(e)) return {
                    value: Ve.get(e),
                    reason: function(e, t, n) {
                        return "NOTE: 颜色值 `" + t + "` 转换为 `" + n + "`"
                    }
                };
                let t, n, o, r, s, i, a, l;
                return (t = nt.exec(e)) && (n = parseInt(t[1]), o = parseInt(t[2]), r = parseInt(t[3]), n >= 0 &&
                    n <= 255 && o >= 0 && o <= 255 && r >= 0 && r <= 255) ? {
                    value: "rgb(" + [n, o, r].join(",") + ")"
                } : (t = ot.exec(e)) && (n = parseInt(t[1]), o = parseInt(t[2]), r = parseInt(t[3]), s =
                    parseFloat(t[4]), n >= 0 && n <= 255 && o >= 0 && o <= 255 && r >= 0 && r <= 255 && s >=
                    0 && s <= 1) ? {
                    value: "rgba(" + [n, o, r, s].join(",") + ")"
                } : (t = rt.exec(e) || st.exec(e)) && (i = parseInt(t[1]), a = parseInt(t[2]), l = parseInt(
                        t[3]), s = parseFloat(t[4]), i >= 0 && i <= 360 && a >= 0 && a <= 100 && l >= 0 &&
                    l <= 100) ? s >= 0 && s <= 1 ? {
                    value: `hsla(${i},${a}%,${l}%,${s})`
                } : {
                    value: `hsl(${i},${a}%,${l}%)`
                } : "transparent" === e ? {
                    value: "rgba(0,0,0,0)"
                } : {
                    value: null,
                    reason: function(e, t, n) {
                        return "ERROR: 属性`" + je(e) + "` 的颜色值 `" + t + "` 无效`"
                    }
                }
            },
            number: function(e) {
                const t = (e = (e || "").toString()).match(dt);
                return t && !t[1] ? {
                    value: parseFloat(e)
                } : {
                    value: null,
                    reason: function(e, t, n) {
                        return "ERROR: 属性`" + je(e) + "` 的值 `" + t + "` 无效 ` (仅支持数值)"
                    }
                }
            },
            integer: function(e) {
                return (e = (e || "").toString()).match(it) ? {
                    value: parseInt(e, 10)
                } : {
                    value: null,
                    reason: function(e, t, n) {
                        return "ERROR: 属性`" + je(e) + "` 的值 `" + t + "` 无效 ` (仅支持整数)"
                    }
                }
            },
            url: function(e) {
                if ((e = (e || "").toString().trim()).match(/^none$/i)) return {
                    value: "none"
                };
                const t = at.exec(e);
                return t ? {
                    value: t[1]
                } : {
                    value: null,
                    reason: function(e, t, n) {
                        return "WARNING: 属性`" + je(e) + "` 的值 `" + t + "` 必须是 none 或者 url(...)"
                    }
                }
            },
            name: function(e) {
                return (e = (e || "").toString()).match(lt) ? {
                    value: e
                } : {
                    value: null,
                    reason: function(e, t, n) {
                        return "ERROR: 属性`" + je(e) + "` 的值 `" + t + "` 格式不正确"
                    }
                }
            },
            enum: function(e, t) {
                const n = e.indexOf(t);
                return n > 0 ? {
                    value: t
                } : 0 === n ? {
                    value: t,
                    reason: function(e, t, n) {
                        return "NOTE:  属性`" + je(e) + "` 的值 `" + t + "` 是缺省值(可以忽略不写)"
                    }
                } : {
                    value: null,
                    reason: function(t, n, o) {
                        return "ERROR: 属性`" + je(t) + "` 的值 `" + n + "` 无效 ` (有效枚举值为: `" + e.join("`|`") +
                            "`)"
                    }
                }
            },
            arraylength: function(e, t, n) {
                const o = (t = (t || "").toString()).split(/\s+/);
                if (o && o.length <= 4) {
                    const t = [];
                    let r;
                    const s = [];
                    let i = 0;
                    return o.forEach((e, o) => {
                        if (Me((r = ct.length(e, n)).value) && t.push(r.value), r.reason) {
                            let t = r.reason(o.toString(), e, r.value);
                            const n = t.match(/^([A-Z]+):/);
                            if (n) {
                                const e = Ye.indexOf(n[1]);
                                i < Ye.indexOf(n[1]) && (i = e), t = t.replace(n[0], "").trim()
                            }
                            s.push(t)
                        }
                    }), {
                        value: i < 2 ? $e(e, t) : null,
                        reason: s.length > 0 ? function(e, t, n) {
                            return Ye[i] + ": 属性`" + je(e) + "` 的值 `" + t + "` 存在问题: \n  " + s.join(
                                "\n  ")
                        } : null
                    }
                }
                return {
                    value: null,
                    reason: function(e, t, n) {
                        return "ERROR: 属性`" + je(e) + "` 的值 `" + t + "` 格式不正确"
                    }
                }
            },
            arraycolor: function(e, t) {
                const n = (t = (t || "").toString()).split(/\s+/);
                if (n && n.length <= 4) {
                    const t = [];
                    let o;
                    const r = [];
                    let s = 0;
                    return n.forEach((e, n) => {
                        if (Me((o = ct.color(e)).value) && t.push(o.value), o.reason) {
                            let t = o.reason(n.toString(), e, o.value);
                            const i = t.match(/^([A-Z]+):/);
                            if (i) {
                                const e = Ye.indexOf(i[1]);
                                s < Ye.indexOf(i[1]) && (s = e), t = t.replace(i[0], "").trim()
                            }
                            r.push(t)
                        }
                    }), {
                        value: s < 2 ? $e(e, t) : null,
                        reason: r.length > 0 ? function(e, t, n) {
                            return Ye[s] + ": 属性`" + je(e) + "` 的值 `" + t + "` 存在问题: \n  " + r.join(
                                "\n  ")
                        } : null
                    }
                }
                return {
                    value: null,
                    reason: function(e, t, n) {
                        return "ERROR: 属性`" + je(e) + "` 的值 `" + t + "` 格式不正确"
                    }
                }
            },
            border: function(e, t) {
                const n = (e = (e || "").toString()).split(/\s+/);
                if (n && n.length <= 3) {
                    let e, o = [];
                    const r = [];
                    let s = 0;
                    const i = [];
                    let a = -1;
                    return n.forEach((n, a) => {
                        if (Me(ct.length(n, t).value) ? (i.push(0), (e = pt.borderWidth(n)).value instanceof Array &&
                                (o = o.concat(e.value))) : Me(pt.borderStyle(n).value) ? (i.push(1), e =
                                pt.borderStyle(n), o.push({
                                    n: "borderStyle",
                                    v: n
                                })) : Me(ct.color(n).value) ? (i.push(2), (e = pt.borderColor(n)).value instanceof Array &&
                                (o = o.concat(e.value))) : (e = {}, s = 2, r.push("属性`" + a + "` 的值 `" +
                                n + "` 存在问题: \n  不满足width、style和color的检验标准")), e && e.reason) {
                            let t = e.reason(a.toString(), n, e.value);
                            const o = t.match(/^([A-Z]+):/);
                            if (o) {
                                const e = Ye.indexOf(o[1]);
                                s < Ye.indexOf(o[1]) && (s = e), t = t.replace(o[0], "").trim()
                            }
                            r.push(t)
                        }
                    }), i.forEach(e => {
                        e > a ? a = e : (s = 2, r.push("必须按顺序设置属性width style color"))
                    }), {
                        value: s < 2 ? o : null,
                        reason: r.length > 0 ? function(e, t, n) {
                            return Ye[s] + ": 属性`" + je(e) + "` 的值 `" + t + "` 存在问题: \n  " + r.join(
                                "\n  ")
                        } : null
                    }
                }
                return {
                    value: null,
                    reason: function(e, t, n) {
                        return "ERROR: 属性`" + je(e) + "` 的值 `" + t + "` 格式不正确"
                    }
                }
            },
            display: function(e) {
                e = (e || "").toString();
                const t = ["flex", "none"],
                    n = t.indexOf(e);
                return n > 0 ? {
                    value: e
                } : "block" === e ? {
                    value: "flex",
                    reason: function(e, n, o) {
                        return "ERROR: 属性`" + je(e) + "` 的值 `" + n + "` 需修改为flex ` (有效枚举值为: `" + t.join(
                            "`|`") + "`)"
                    }
                } : 0 === n ? {
                    value: e,
                    reason: !1
                } : {
                    value: null,
                    reason: function(e, n, o) {
                        return "ERROR: 属性`" + je(e) + "` 的值 `" + n + "` 无效 ` (有效枚举值为: `" + t.join("`|`") +
                            "`)"
                    }
                }
            }
        };

    function ht(e) {
        return ct.enum.bind(null, e)
    }

    function ut(e, t) {
        return ct[e].bind(null, t)
    }
    const pt = {
        width: ct.length,
        height: ct.length,
        padding: ut("arraylength", ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]),
        paddingLeft: ct.length,
        paddingRight: ct.length,
        paddingTop: ct.length,
        paddingBottom: ct.length,
        margin: ut("arraylength", ["marginTop", "marginRight", "marginBottom", "marginLeft"]),
        marginLeft: ct.length,
        marginRight: ct.length,
        marginTop: ct.length,
        marginBottom: ct.length,
        border: ct.border,
        borderWidth: ut("arraylength", ["borderTopWidth", "borderRightWidth", "borderBottomWidth",
            "borderLeftWidth"
        ]),
        borderLeftWidth: ct.length,
        borderTopWidth: ct.length,
        borderRightWidth: ct.length,
        borderBottomWidth: ct.length,
        borderColor: ut("arraycolor", ["borderTopColor", "borderRightColor", "borderBottomColor",
            "borderLeftColor"
        ]),
        borderLeftColor: ct.color,
        borderTopColor: ct.color,
        borderRightColor: ct.color,
        borderBottomColor: ct.color,
        borderStyle: ht(["solid", "dotted", "dashed"]),
        borderRadius: ct.length,
        borderBottomLeftRadius: ct.length,
        borderBottomRightRadius: ct.length,
        borderTopLeftRadius: ct.length,
        borderTopRightRadius: ct.length,
        flex: ct.number,
        flexGrow: ct.number,
        flexShrink: ct.number,
        flexBasis: ct.length,
        flexDirection: ht(["row", "column"]),
        flexWrap: ht(["nowrap", "wrap", "wrap-reverse"]),
        justifyContent: ht(["flex-start", "flex-end", "center", "space-between"]),
        alignItems: ht(["stretch", "flex-start", "flex-end", "center"]),
        alignContent: ht(["stretch", "flex-start", "flex-end", "center", "space-between", "space-around"]),
        position: ht(["none", "fixed"]),
        top: ct.length,
        bottom: ct.length,
        left: ct.length,
        right: ct.length,
        zIndex: ct.integer,
        opacity: ct.number,
        backgroundColor: ct.color,
        backgroundImage: ct.url,
        backgroundRepeat: ht(["no-repeat", "repeat", "repeat-x", "repeat-y"]),
        backgroundPosition: ct.position,
        display: ct.display,
        visibility: ht(["visible", "hidden"]),
        lines: ct.integer,
        color: ct.color,
        fontSize: ct.length,
        fontStyle: ht(["normal", "italic"]),
        fontWeight: ht(["normal", "bold"]),
        textDecoration: ht(["none", "underline", "line-through"]),
        textAlign: ht(["left", "center", "right"]),
        lineHeight: ct.length,
        textOverflow: ht(["clip", "ellipsis"]),
        placeholderColor: ct.color,
        selectedColor: ct.color,
        textColor: ct.color,
        timeColor: ct.color,
        textHighlightColor: ct.color,
        strokeWidth: ct.length,
        progressColor: ct.color,
        resizeMode: ht(["cover", "contain", "stretch", "center"]),
        columns: ct.number,
        columnSpan: ct.number
    };

    function mt(e, t) {
        const n = {},
            o = [],
            r = function(e, t) {
                let n, o;
                const r = pt[e];
                return "function" == typeof r ? (n = "function" != typeof t ? r(t) : {
                    value: t
                }).reason && (o = {
                    reason: n.reason(e, t, n.value)
                }) : (n = {
                    value: t
                }, o = {
                    reason: "ERROR: 样式名 `" + je(e) + "` 不支持"
                }), {
                    value: n.value instanceof Array ? n.value : [{
                        n: e,
                        v: n.value
                    }],
                    log: o
                }
            }(ke(e), t);
        return r.value.forEach(e => {
            Me(e.v) && o.push(e)
        }), o && (n.value = o), r.log && (n.log = r.log.reason), n
    }
    const gt = new Map([
        ["img", "image"],
        ["p", "text"],
        ["h1", "text"],
        ["h2", "text"],
        ["h3", "text"],
        ["h4", "text"],
        ["h5", "text"],
        ["h6", "text"],
        ["b", "span"],
        ["strong", "span"],
        ["i", "span"],
        ["del", "span"],
        ["article", "div"],
        ["br", "span"]
    ]);

    function ft(e) {
        const t = gt.get(e);
        return void 0 !== t ? t : e
    }
    const _t = {
        div: {},
        h1: {
            fontSize: "60px",
            fontWeight: "normal"
        },
        h2: {
            fontSize: "45px",
            fontWeight: "normal"
        },
        h3: {
            fontWeight: "normal",
            fontSize: "35px"
        },
        h4: {
            fontWeight: "normal",
            fontSize: "30px"
        },
        h5: {
            fontWeight: "normal",
            fontSize: "25px"
        },
        h6: {
            fontWeight: "normal",
            fontSize: "20px"
        },
        b: {
            fontWeight: "bold"
        },
        strong: {
            fontWeight: "bold"
        },
        i: {
            fontStyle: "italic"
        },
        a: {
            color: "#00BFFF"
        },
        del: {
            textDecoration: "line-through"
        }
    };

    function yt(e) {
        let t = {};
        return _t[e] && (t = _t[e]), t
    }
    const bt = {
        br: {
            value: "\n"
        }
    };

    function vt(e) {
        let t = {};
        return bt[e] && (t = bt[e]), t
    }

    function wt(e, t, n) {
        const o = "html" !== t,
            r = "edit" === n;
        e = function(e) {
            return e.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*>\n/, "").replace(/<.*!DOCTYPE.*>\n/,
                "")
        }(e), e = e.replace(/&([a-zA-Z#0-9]+?);/g, (e, t) => Le.get[t] || "&" + t + ";").replace(/\r\n?/g, "");
        const s = [],
            i = {
                type: "div",
                children: [],
                events: {},
                classList: [],
                attr: {},
                style: {
                    flex: 1,
                    flexDirection: "column"
                }
            };
        return function(e, t) {
            let n, o, r;
            const s = [];
            let i = e;
            for (s.last = function() {
                    return this[this.length - 1]
                }; e;) {
                if (o = !0, s.last() && Xe.has(s.last())) e = e.replace(new RegExp("([\\s\\S]*?)(</" + s.last() +
                    "[^>]*>)", "i"), function(e, n) {
                    return n = n.replace(/<!--([\s\S]*?)-->/g, "$1").replace(
                        /<!\[CDATA\[([\s\S]*?)]]>/g, "$1"), t.text && t.text(n), ""
                }), l(0, s.last());
                else if (0 === e.indexOf("\x3c!--") ? (n = e.indexOf("--\x3e")) >= 0 && (t.comment && t.comment(
                        e.substring(4, n)), e = e.substring(n + 3), o = !1) : 0 === e.indexOf("</") ? (r = e.match(
                        Ue)) && (e = e.substring(r[0].length), r[0].replace(Ue, l), o = !1) : 0 === e.indexOf(
                        "<") && (r = e.match(ze)) && (e = e.substring(r[0].length), r[0].replace(ze, a), o = !1),
                    o) {
                    n = e.indexOf("<");
                    let o = "";
                    for (; 0 === n;) o += "<", n = (e = e.substring(1)).indexOf("<");
                    o += n < 0 ? e : e.substring(0, n), e = n < 0 ? "" : e.substring(n), t.text && t.text(o)
                }
                e === i && console.error("### App Parser ### 解析错误: " + e), i = e
            }

            function a(e, n, o, r) {
                if (n = n.toLowerCase(), Je.has(n))
                    for (; s.last() && He.has(s.last());) l(0, s.last());
                if (qe.has(n) && s.last() === n && l(0, n), (r = We.has(n) || !!r) || s.push(n), t.start) {
                    const e = [];
                    o.replace(Ge, function(t, n) {
                        const o = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[
                            4] ? arguments[4] : Ze.has(n) ? n : "";
                        e.push({
                            name: n,
                            value: o,
                            escaped: o.replace(/(^|[^\\])"/g, '$1\\"')
                        })
                    }), t.start && t.start(n, e, r)
                }
            }

            function l(e, n) {
                let o = 0;
                if (n)
                    for (n = n.toLowerCase(), o = s.length - 1; o >= 0 && s[o] !== n; o--);
                if (o >= 0) {
                    for (let e = s.length - 1; e >= o; e--) t.end && t.end(s[e]);
                    s.length = o
                }
            }
            l()
        }(e, {
            start: function(e, t, n) {
                const a = {
                    type: o ? e : ft(e),
                    children: [],
                    events: {},
                    classList: [],
                    attr: o ? {} : vt(e),
                    style: o ? {} : yt(e)
                };
                if (0 !== t.length && (a.attr = t.reduce(function(e, t) {
                        const n = ke(t.name);
                        let o = t.value;
                        return "class" === n ? a.classList = o.split(/\s+/) : "style" === n ? o
                            .split(";").forEach(function(e) {
                                let t, n, o = e.trim().split(":");
                                o.length > 2 && (o[1] = o.slice(1).join(":"), o = o.slice(0,
                                    2)), 2 === o.length && ((n = mt(t = o[0].trim(), o[
                                    1].trim())).value && n.value.forEach(e => {
                                    Me(e.v) && (a.style[e.n] = e.v)
                                }), n.log && console.warn("### App Parser ###", n.log))
                            }) : "id" === n ? a.id = o : r ? e[n] = o : (o.match(/ /) && (o = o
                                .split(" ")), e[n] ? Array.isArray(e[n]) ? e[n].push(o) : e[
                                n] = [e[n], o] : e[n] = o), e
                    }, {})), o || "source" !== a.type || (i.source = a.attr.src), n) {
                    const e = s[0] || i;
                    void 0 === e.children && (e.children = []), e.children.push(a)
                } else s.unshift(a)
            },
            end: function(e) {
                const t = o ? e : ft(e),
                    n = s.shift();
                if (n.type !== t && console.error("### App Parser ### 结束标签不匹配:", e), !o && "video" ===
                    n.type && i.source && (n.attr.src = i.source, delete i.source), 0 === s.length) i.children
                    .push(n);
                else {
                    const e = s[0];
                    void 0 === e.children && (e.children = []), e.children.push(n)
                }
            },
            text: function(e) {
                if ("" !== e.slice().replace(/\s*/, "")) {
                    const t = s[0];
                    if (!r || t && -1 !== ["text", "a", "span"].indexOf(t.type)) {
                        if (t)
                            if (-1 !== ["text", "a"].indexOf(t.type)) {
                                const n = {
                                    type: "span",
                                    children: [],
                                    events: {},
                                    classList: [],
                                    attr: {
                                        value: e
                                    },
                                    style: {},
                                    polyfill: !0
                                };
                                void 0 === t.children && (t.children = []), t.children.push(n)
                            } else t.attr.value = e
                    } else {
                        const n = {
                            type: "text",
                            children: [],
                            events: {},
                            classList: [],
                            attr: {
                                value: e
                            },
                            style: {}
                        };
                        (t || i).children.push(n)
                    }
                }
            },
            comment: function(e) {}
        }), global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Parser ### 解析${t}文本成功：${JSON.stringify(i)}`), i
    }
    var Ct = {
        compile: wt,
        parseHTML: function(e) {
            const t = wt(e, "", "edit");
            return function e(t) {
                if (t.children) {
                    -1 !== ["text", "a"].indexOf(t.type) && (t.children.length > 0 && delete t.attr.value,
                        1 === t.children.length && t.children[0].polyfill && (t.attr = Object.assign(
                            t.attr, t.children[0].attr), t.children = []));
                    for (let n = 0, o = t.children.length; n < o; n++) {
                        const o = t.children[n];
                        e(o)
                    }
                }
            }(t), t.children || []
        }
    };
    var Et = {
        compile: function(e, t) {
            return "" === (e = e.trim()) && (e = "<div></div>"), Ct.compile(e, t)
        },
        validateStyle: mt,
        parseHTML: Ct.parseHTML
    };
    const At = {
            Listener: _e,
            Streamer: ye,
            helper: we,
            misc: Z
        },
        Ft = {
            Node: i,
            Event: t,
            TouchEvent: n,
            DomDocument: me,
            freeze: ge
        },
        xt = {
            animation: class {
                constructor(e, t, n = {}, o) {
                    this.page = e, this.commonParams = {
                            componentId: t.ref,
                            animationId: (Fe++).toString()
                        }, n.options && n.options.iterations === 1 / 0 && (n.options.iterations = -1), this
                        .initParams = Object.assign(n, this.commonParams), this.animationModule = o, this.animationModule
                        .enable(this.initParams)
                }
                set finished(e) {
                    console.warn("### App Framework ### Animation Api: finished 是只读属性")
                }
                get finished() {
                    return this.animationModule.getFinished(this.commonParams)
                }
                set playState(e) {
                    global.Env && "trace" === global.Env.logLevel && console.trace(
                        "### App Framework ### Animation Api: playState 是只读属性")
                }
                get playState() {
                    const e = this.animationModule.getPlayState(this.commonParams);
                    return global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Framework ### Animation Api: 获取 playState 状态为：${e}`), e
                }
                set startTime(e = "") {
                    Object.assign(this.commonParams, {
                        startTime: e
                    }), this.animationModule.setStartTime(this.commonParams)
                }
                get startTime() {
                    const e = this.animationModule.getStartTime(this.commonParams);
                    return global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Framework ### Animation Api: 获取 startTime 状态为：${e}`), e
                }
                set onfinish(e) {
                    this.animationModule.onfinish({
                        componentId: this.commonParams.componentId,
                        animationId: this.commonParams.animationId,
                        success: () => {
                            e && e()
                        }
                    })
                }
                get onfinish() {
                    return () => {}
                }
                set oncancel(e) {
                    this.animationModule.oncancel({
                        componentId: this.commonParams.componentId,
                        animationId: this.commonParams.animationId,
                        success: () => {
                            e && e()
                        }
                    })
                }
                get oncancel() {
                    return () => {}
                }
                play() {
                    global.Env && "trace" === global.Env.logLevel && console.trace(
                        "### App Framework ### Animation Api: 调用 play 方法"), this.animationModule.play(
                        this.commonParams)
                }
                finish() {
                    global.Env && "trace" === global.Env.logLevel && console.trace(
                        "### App Framework ### Animation Api: 调用 finish 方法"), this.animationModule.finish(
                        this.commonParams)
                }
                pause() {
                    global.Env && "trace" === global.Env.logLevel && console.trace(
                        "### App Framework ### Animation Api: 调用 pause 方法"), this.animationModule.pause(
                        this.commonParams)
                }
                cancel() {
                    global.Env && "trace" === global.Env.logLevel && console.trace(
                        "### App Framework ### Animation Api: 调用 cancel 方法"), this.animationModule.cancel(
                        this.commonParams)
                }
                reverse() {
                    global.Env && "trace" === global.Env.logLevel && console.trace(
                        "### App Framework ### Animation Api: 调用 reverse 方法"), this.animationModule.reverse(
                        this.commonParams)
                }
            },
            canvas: De,
            parser: Et
        };
    e.Base64 = Ae, e.Runtime = Ce, e.bundles = xt, e.dom = Ft, e.runtime = At, Object.defineProperty(e,
        "__esModule", {
            value: !0
        })
});
//# sourceMappingURL=infras-ext.js.map
