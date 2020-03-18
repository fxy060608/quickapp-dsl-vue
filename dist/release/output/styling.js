! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define &&
        define.amd ? define(t) : (e = e || self).styling = t()
}(this, function() {
    "use strict";
    const e = [];

    function t(t, n) {
        e.push(...n)
    }

    function n() {
        e.splice(0)
    }

    function s() {
        return e.slice()
    }
    class o {
        constructor() {
            this._nodeType = o.NodeType.UNKNOWN, this._nodeName = null, this._ownerDocument = null, this._real = !
                0, this.ref = null, this._docId = null, this._depth = null, this.parentNode = null, this.childNodes = [],
                this.nextSibling = null, this.previousSibling = null
        }
        get nodeType() {
            return this._nodeType
        }
        get nodeName() {
            return this._nodeName
        }
        get ownerDocument() {
            return this._ownerDocument
        }
    }
    o.NodeRef = {
        HTML_ID: "-1"
    }, o.NodeType = {
        UNKNOWN: 0,
        ELEMENT: 1,
        ATTR: 2,
        TEXT: 3,
        COMMENT: 8,
        DOCUMENT: 9,
        DOCUMENT_FRAGMENT: 11,
        FIGMENT: 101
    };
    const r = /-(\w)/g,
        l = function(e) {
            const t = Object.create(null);
            return function(n) {
                return t[n] || (t[n] = e(n))
            }
        }(e => e.replace(r, i));

    function i(e, t) {
        return t ? t.toUpperCase() : ""
    }

    function c(...e) {
        const t = e.reduce((e, t) => e.concat(t), []);
        return Array.from(new Set(t))
    }
    const a = {};

    function u(e, t) {
        e && (a[e] = t)
    }

    function d(e) {
        return a[e]
    }

    function h(e) {
        const t = d(e);
        return t && t.listener ? t.listener : null
    }

    function f(e, t) {
        if (e._docId === t) return;
        const n = d(t);
        if (n) {
            e._docId = t, n._nodeMap[e.ref] = e;
            for (let t = 0, n = e.childNodes.length; t < n; t++) f(e.childNodes[t], e._docId)
        }
    }

    function p(e, t) {
        return e._nodeMap[t]
    }

    function g(e, t, n, s) {
        n < 0 && (n = 0);
        const o = t[n - 1],
            r = t[n];
        return t.splice(n, 0, e), s && (o && (o.nextSibling = e || null), e.previousSibling = o || null, e.nextSibling =
            r || null, r && (r.previousSibling = e || null)), n
    }

    function m(e, t, n) {
        const s = t.indexOf(e);
        if (!(s < 0)) {
            if (n) {
                const n = t[s - 1],
                    o = t[s + 1];
                n && (n.nextSibling = o || null), o && (o.previousSibling = n || null), e.previousSibling = null, e
                    .nextSibling = null
            }
            t.splice(s, 1)
        }
    }
    const y = {};

    function _(e, t, n) {
        const s = e ? N(e) : null;
        y[s] = {
            shouldCareStyleObjectId: n,
            content: t
        }
    }

    function b(e, t, n) {
        const {
            shouldCareStyleObjectId: s,
            content: o
        } = t || {};
        if (!o) return;
        const r = JSON.parse(o),
            l = r && r.list || [];
        for (let t = 0, o = l.length; t < o; t++) {
            const o = l[t];
            let r = null;
            o["@info"] && o["@info"].styleObjectId && (r = o["@info"].styleObjectId), s ? global.registerStyleObject(
                "", r, l[t], n, e, !1) : global.registerStyleObject("", null, l[t], !0, e, !1)
        }
    }

    function N(e) {
        return `###${e}`
    }

    function E(e) {
        const t = [];
        let n = e;
        const s = e._docId,
            o = d(s)._styleSheetHash[0];
        for (t.push(...o), e._useParentStyle && (n = e.parentNode); n && !n._styleObjectId;) n = n.parentNode;
        if (n && n._styleObjectId) {
            const e = function(e, t) {
                const n = d(e);
                return n ? n._styleSheetHash[t] : null
            }(s, n._styleObjectId);
            e && -1 === t.indexOf(e) && t.push(e)
        }
        return global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### 获取节点(${e.ref}:${e._type})的样式表:${t.map(e=>e.id).join(",")}`), t
    }
    const S = {
            UNKNOWN: 0,
            ELEMENT: 1,
            ATTR: 2,
            TEXT: 3,
            COMMENT: 8,
            DOCUMENT: 9,
            DOCUMENT_FRAGMENT: 11,
            FIGMENT: 101
        },
        C = /^data.+/;

    function v(e) {
        return (e || "").split(/\s+/).filter(e => "" !== e).filter((e, t, n) => n.indexOf(e) === t)
    }

    function A(e) {
        return e._attr
    }

    function I(e) {
        return e._style
    }

    function O(e) {
        if (e._classList) return e._classList;
        const t = A(e);
        return e._classList = v(t.class), e._classList
    }

    function T(e) {
        return e.mergedStyle
    }

    function w(e, t = !0, n = !1, s = !1) {
        if (e.nodeType === S.ELEMENT) {
            const o = {
                    ref: e.ref.toString(),
                    type: e._type
                },
                r = function(e) {
                    if (e._styleObjectId) return e._styleObjectId;
                    let t = e;
                    for (; t && !t._styleObjectId;) t = t.parentNode;
                    return t && (e._styleObjectId = t._styleObjectId), e._styleObjectId
                }(e);
            r && (o.prop = {
                _styleObjectId: r
            }), n && e._styleObject && (o.styleObject = e._styleObject), e._useParentStyle && (o.prop = o.prop ||
                {}, o.prop._useParentStyle = !0);
            const l = A(e);
            if (l && Object.keys(l).length) {
                o.attr = {};
                for (const e in l) {
                    const t = l[e];
                    o.attr[e] = -1 !== [null, void 0].indexOf(t) ? "" : t
                }
            }
            const i = I(e);
            if (i && Object.keys(i).length && (o.inlineStyle = i), s) {
                const t = T(e);
                t && Object.keys(t).length && (o.style = t)
            }
            const c = Object.keys(e._eventTargetListeners || {});
            c && c.length && (o.event = c);
            const a = e.layoutChildren || e.childNodes;
            if (t && a && a.length) {
                const e = [];
                for (let o = 0, r = a.length; o < r; o++) {
                    const r = a[o],
                        l = w(r, t, n, s);
                    L(r) ? e.push(l) : e.push.apply(e, l)
                }
                o.children = e
            }
            return o
        }
        if (e.nodeType === S.FIGMENT) {
            const o = [];
            if (t && e.layoutChildren && e.layoutChildren.length)
                for (let r = 0, l = e.layoutChildren.length; r < l; r++) {
                    const l = e.layoutChildren[r],
                        i = w(l, t, n, s);
                    l.nodeType === S.FIGMENT ? o.push.apply(o, i) : o.push(i)
                }
            return o
        }
        if (e.nodeType === S.COMMENT) return [];
        global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### getNodeAsJSON() 忽略该类型(${e.nodeType})的节点序列化`)
    }

    function L(e) {
        return e._render
    }

    function j(e, t = !1) {
        let n = t ? e : e.parentNode;
        return n
    }

    function R(e, t = !1) {
        const n = [];
        let s = j(e, t);
        for (; s;) n.push(s), s = j(s);
        return n
    }
    const $ = {
            TAG: 1,
            CLASS: 1e3,
            ID: 1e6,
            STEP: 1e6,
            INLINE: 1e9
        },
        M = {
            TAG: 1,
            CLASS: 2,
            ID: 3,
            DESC: 4,
            INLINE: 5
        },
        D = {
            name: null,
            type: null,
            score: null,
            order: 0,
            style: null,
            _sheetId: null,
            _hitNodeMap: null,
            _styleFullList: null
        };

    function x(e) {
        const t = Object.assign({}, D, {
            type: M.TAG,
            score: {
                self: $.TAG,
                depth: 1
            },
            _hitNodeMap: {}
        }, e);
        return t.score.sum = t.score.self * $.STEP + t.order, t
    }

    function F(e) {
        const t = Object.assign({}, D, {
            type: M.CLASS,
            score: {
                self: $.CLASS,
                depth: 1
            },
            _hitNodeMap: {}
        }, e);
        return t.score.sum = t.score.self * $.STEP + t.order, t
    }

    function k(e) {
        const t = Object.assign({}, D, {
            type: M.ID,
            score: {
                self: $.ID,
                depth: 1
            },
            _hitNodeMap: {}
        }, e);
        return t.score.sum = t.score.self * $.STEP + t.order, t
    }

    function P(e) {
        const t = Object.assign({}, D, {
            type: M.DESC,
            _hitNodeMap: {}
        }, e);
        return t.score = function(e, t) {
            const n = {
                id: 0,
                class: 0,
                tag: 0,
                self: 0,
                depth: 1
            };
            for (let t = 0, s = e.length; t < s; t++) {
                const s = e[t];
                G(s) ? n.tag += 1 : H(s) ? n.id += 1 : J(s) ? n.class += 1 : U(s) && (n.depth += 1)
            }
            return n.self = n.id * $.ID + n.class * $.CLASS + n.tag * $.TAG, {
                self: n.self,
                depth: n.depth
            }
        }(t.meta.ruleDef, t.order), t.score.sum = t.score.self * $.STEP + t.order, t
    }

    function G(e) {
        return "tag" === e.type
    }

    function J(e) {
        return "attribute" === e.type && "class" === e.name
    }

    function H(e) {
        return "attribute" === e.type && "id" === e.name
    }

    function U(e) {
        return "descendant" === e.type || "child" === e.type
    }

    function B(e, t) {
        let n;
        switch (e.type) {
            case M.TAG:
                n = {
                    match: e.name === t._type,
                    matchChanged: !1,
                    pathChanged: !1
                };
                break;
            case M.CLASS:
                n = {
                    match: -1 !== O(t).indexOf(e.name.substring(1)),
                    matchChanged: !1,
                    pathChanged: !1
                };
                break;
            case M.ID:
                n = {
                    match: A(t).id === e.name.substring(1),
                    matchChanged: !1,
                    pathChanged: !1
                };
                break;
            case M.DESC:
                n = function(e, t) {
                    const n = e.meta.ruleDef,
                        s = [];
                    let o = [t];
                    for (let r = n.length - 1; r >= 0; r--) {
                        const l = n[r],
                            i = r === n.length - 1;
                        if (0 === (o = W(l, o)).length || t._depth < e.score.depth) return K(e, t, !1, []);
                        i || -1 !== ["descendant", "child"].indexOf(l.type) || s.push(o[0].ref)
                    }
                    return K(e, t, !0, s)
                }(e, t);
                break;
            default:
                throw new Error(`不支持的CSS规则类型：${e.type}`)
        }
        return n.match ? function(e, t) {
            e._hitNodeMap[t] = !0
        }(e, t.ref) : function(e, t) {
            delete e._hitNodeMap[t]
        }(e, t.ref), n
    }

    function K(e, t, n, s) {
        const o = {
            match: n,
            matchChanged: null,
            pathChanged: null
        };
        if (n) {
            const n = t._ownCssRuleCache[e.order];
            n ? n.join(",") === s.join(",") ? (o.matchChanged = !1, o.pathChanged = !1) : (o.matchChanged = !1, o.pathChanged = !
                0) : (o.matchChanged = !0, o.pathChanged = !0), t._ownCssRuleCache[e.order] = s
        } else {
            t._ownCssRuleCache[e.order] ? (o.matchChanged = !0, o.pathChanged = !0) : (o.matchChanged = !1, o.pathChanged = !
                1), t._ownCssRuleCache[e.order] = null
        }
        return global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### 节点(${t._type}:${t.ref})与后代CSS规则(${e.name})的匹配计算：${JSON.stringify(o)}`), o
    }

    function W(e, t) {
        const n = e.type;
        switch (n) {
            case "attribute":
                return function(e, t) {
                    if (J(e)) {
                        const n = t.find(t => -1 !== O(t).indexOf(e.value));
                        return n ? [n] : []
                    }
                    if (H(e)) {
                        const n = t.find(t => A(t).id === e.value);
                        return n ? [n] : []
                    }
                    return console.warn(`### App Runtime ### 未知的CSS Selector规则：${e.name}，当前支持：class, id`), []
                }(e, t);
            case "tag":
                return function(e, t) {
                    const n = t.find(t => t._type === e.name);
                    return n ? [n] : []
                }(e, t);
            case "descendant":
                return function(e, t) {
                    const n = [];
                    for (let e = 0, s = t.length; e < s; e++) {
                        const s = t[e];
                        n.push.apply(n, R(s))
                    }
                    return n
                }(0, t);
            case "child":
                return function(e, t) {
                    const n = [];
                    for (let e = 0, s = t.length; e < s; e++) {
                        const s = t[e],
                            o = j(s);
                        o && n.push(o)
                    }
                    return n
                }(0, t);
            default:
                return console.warn(`### App Runtime ### 未知的CSS Selector规则：${n}，当前支持：tag, class, id, 后代, '>'`), []
        }
    }

    function q(e, t) {
        if (!d(e._docId)) return void(global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### calcNodeStyle() 节点(${e.ref}:${e._type})暂无关联document`));
        if (global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Runtime ### calcNodeStyle() 节点(${e.ref}:${e._type})计算类型：${t}`), e._mergedStyleCache = null,
            !t || t === M.INLINE) {
            const t = e._matchedCssRuleCache[M.INLINE];
            e._matchedCssRuleCache[M.INLINE] = t || []
        }
        let n, s, o, r, l;
        t && t !== M.TAG || (e._matchedCssRuleCache[M.TAG] = []), t && t !== M.CLASS || (e._matchedCssRuleCache[M.CLASS] = []),
            t && t !== M.ID || (e._matchedCssRuleCache[M.ID] = []);
        const i = I(e);
        if ((!t || t === M.INLINE) && ((n = e._matchedCssRuleCache[M.INLINE]).length ? n[0].style = i : n.push(
                function(e) {
                    const t = Object.assign({}, D, {
                        name: "INLINE",
                        type: M.INLINE,
                        score: {
                            self: $.INLINE
                        },
                        _hitNodeMap: {}
                    }, e);
                    return t.score.sum = t.score.self * $.STEP + t.order, t
                }({
                    style: i
                })), t === M.INLINE)) return;
        const c = E(e);
        for (let i = 0, a = c.length; i < a; i++) {
            const a = c[i],
                u = (a.id, a.nameHash),
                d = a.descLast;
            if (!t || t === M.TAG) {
                n = e._matchedCssRuleCache[M.TAG];
                const t = e._type;
                if (l = !1) n.push.apply(n, l);
                else {
                    s = o = [], u.hasOwnProperty(t) && (s = z([u[t]], e));
                    const l = d[t] && d[t].list || [];
                    l.length > 0 && (o = Y(l, e)), r = s.concat(o), n.push.apply(n, r)
                }
            }
            const h = O(e);
            if (h.length > 0 && (!t || t === M.CLASS)) {
                n = e._matchedCssRuleCache[M.CLASS];
                const t = h.map(e => `.${e}`);
                for (let i = 0, c = t.length; i < c; i++) {
                    const c = t[i];
                    if (l = !1) n.push.apply(n, l);
                    else {
                        if (s = o = [], u.hasOwnProperty(c) && (s = z([u[c]], e)), d[c]) {
                            o = Y(d[c].list || [], e)
                        }
                        r = s.concat(o), n.push.apply(n, r)
                    }
                }
            }
            if (A(e).id && (!t || t === M.ID)) {
                n = e._matchedCssRuleCache[M.ID];
                const t = A(e).id,
                    i = `#${t}`;
                if (l = !1) n.push.apply(n, l);
                else {
                    s = o = [], t && u.hasOwnProperty(i) && (s = z([u[i]], e));
                    const l = d[i] && d[i].list || [];
                    t && l.length > 0 && (o = Y(l, e)), r = s.concat(o), n.push.apply(n, r)
                }
            }
        }
    }

    function z(e, t) {
        const n = [];
        for (let s = 0, o = e.length; s < o; s++) {
            const o = e[s];
            B(o, t).match && n.push(o)
        }
        return n
    }

    function Y(e, t) {
        const n = [];
        for (let s = 0; s < e.length; s++) {
            const o = e[s];
            B(o, t).match && n.push(o)
        }
        return n
    }

    function X(e, t) {
        const n = function(e, t) {
                const n = E(e),
                    s = [];
                for (let e = 0, o = n.length; e < o; e++) {
                    const o = n[e],
                        r = o.descNotLast;
                    if (r[t]) {
                        const e = r[t].list;
                        s.push(...e)
                    }
                }
                return s
            }(e, t),
            s = [];
        for (let t = 0, o = n.length; t < o; t++) {
            const o = Z(n[t], e);
            s.push(...o)
        }
        return c(s)
    }

    function Z(e, t) {
        const n = [];
        for (let s = 0, o = t.childNodes.length; s < o; s++) {
            const o = t.childNodes[s];
            B(e, o).matchChanged && n.push(o.ref);
            const r = Z(e, o);
            n.push(...r)
        }
        return n
    }

    function Q(e, t, n) {
        const s = n ? e.childNodes.indexOf(n) : e.childNodes.length,
            r = h(e._docId),
            l = d(e._docId);
        t.parentNode ? (! function(e, t, n, s) {
            const o = t.indexOf(e);
            if (o < 0 || o === n) return -1;
            m(e, t, s);
            let r = n;
            o <= n && (r = n - 1), g(e, t, r, s)
        }(t, e.childNodes, s, !0), r && r.moveElement(t.ref, e.ref, s)) : (! function e(t, n) {
            t.parentNode = n, n._docId && (f(t, n._docId), t._depth = n._depth + 1);
            for (let n = 0, s = t.childNodes.length; n < s; n++) e(t.childNodes[n], t)
        }(t, e), g(t, e.childNodes, s, !0), function e(t) {
            if (t.nodeType === o.NodeType.ELEMENT && t._docId) {
                global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### 添加到文档时计算节点(${t.ref}:${t._type})的样式`), q(t);
                for (let n = 0, s = t.childNodes.length; n < s; n++) e(t.childNodes[n])
            }
        }(t), r && (e === l.documentElement ? (l.body = t, r.createBody(t)) : r.addElement(t, e.ref, s)))
    }

    function V(e, t, n) {
        if (!e._ownerDocument || "ref" === t) return;
        if (e[t] === n) return;
        const s = e[t];
        e[t] = n, global.Env && "trace" === global.Env.logLevel && console.trace(
            `### App Runtime ### 元素的内部属性(${t})更新(${s}=>${n})`);
        const o = h(e._docId);
        o && o.setProp(e.ref, t, n)
    }

    function ee(e, t, n) {
        if (!e._ownerDocument || "ref" === t) return;
        if ((null === (s = n) || "object" != typeof s) && A(e)[t] === n) return;
        var s;
        if ("class" === t) e._classList = null;
        else if (C.test(t)) {
            const s = t.replace(/[A-Z]/g, e => "-" + e.toLowerCase()).replace(/^data-/, "").replace(/-([a-z])/g, (e,
                t) => t.toUpperCase());
            e._dataset[s] = n
        }
        const o = A(e)[t];
        A(e)[t] = n, global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Runtime ### 元素的属性(${t})更新(${o}=>${n})`), se(e, t, n),
            function(e, t, n, s) {
                const o = h(e._docId),
                    r = d(e._docId);
                if (!o) return;
                if (!A(e).hasOwnProperty("descRestyling")) return;
                if (global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Runtime ### 元素的属性(${t})更新(${s}=>${n})`), "class" === t) {
                    const t = v(s),
                        o = v(n),
                        l = function(e, t) {
                            const n = {};
                            return e.forEach(e => n[e] = !0), t.forEach(e => n[e] ? delete n[e] : n[e] = !0),
                                Object.keys(n)
                        }(t, o).map(e => `.${e}`),
                        i = l.map(t => X(e, t)),
                        a = c(...i);
                    for (let e = 0, t = a.length; e < t; e++) {
                        const t = a[e],
                            n = p(r, t);
                        n && (q(n), oe(n))
                    }
                } else if ("id" === t) {
                    const t = s ? X(e, `#${s}`) : [],
                        o = n ? X(e, `#${n}`) : [],
                        l = c(t, o),
                        i = l;
                    for (let e = 0, t = i.length; e < t; e++) {
                        const t = i[e],
                            n = p(r, t);
                        n && (q(n), oe(n))
                    }
                }
            }(e, t, n, o)
    }

    function te(e, t, n) {
        e._ownerDocument && I(e)[t] !== n && (I(e)[t] = n, se(e, "style", null, [t, n]))
    }

    function ne(e, t) {
        if (!e._ownerDocument) return;
        if (t = t || "", I(e) === t) return;
        ! function(e, t) {
            e._style = t || {}
        }(e, "string" == typeof t ? function(e) {
            const t = {};
            return e.split(";").filter(e => e.trim()).forEach(e => {
                const n = e.indexOf(":");
                let s = e.substring(0, n).trim();
                s = l(s);
                const o = e.substring(n + 1).trim();
                t[s] = o
            }), global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Runtime ### 元素的样式转换：${e} 为${JSON.stringify(t)}`), t
        }(t) : t), se(e, "style")
    }

    function se(e, t, n, s) {
        const o = h(e._docId);
        o && ("class" === t ? (q(e, M.CLASS), o.setStyles(e.ref, T(e), {
            class: n
        })) : "id" === t ? (q(e, M.ID), o.setStyles(e.ref, T(e), {
            id: n
        })) : "style" === t ? (q(e, M.INLINE), s ? o.setStyle(e.ref, ...s) : o.setStyles(e.ref, T(e))) : o.setAttr(
            e.ref, t, n))
    }

    function oe(e) {
        const t = h(e._docId);
        t && t.setStyles(e.ref, T(e))
    }
    class re extends o {
        constructor(e) {
            super(...arguments), this._nodeType = o.NodeType.ELEMENT, this._nodeName = e.toUpperCase(), this._tagName =
                e.toUpperCase(), this._eventTargetListeners = {}, this._type = e, this._attr = {}, this._style = {},
                this._dataset = {}, this._classList = null, this._styleObjectId = null, this._useParentStyle =
                null, this._usedCSSPropertyCache = {}, this._matchedCssRuleCache = {}, this._mergedStyleCache =
                null, this._ownCssRuleCache = {}
        }
        get tagName() {
            return this._tagName
        }
        get dataset() {
            return this._dataset
        }
        get mergedStyle() {
            return this._mergedStyleCache || (this._mergedStyleCache = function(e, t) {
                if (!t) return global.Env && "trace" === global.Env.logLevel && console.trace(
                    "### App Runtime ### 计算节点CSS样式优先级 没有样式缓存对象，不再计算"), {};
                const n = function(e) {
                        const t = [];
                        for (const n in e) {
                            const s = e[n];
                            s && s.length && t.push.apply(t, s)
                        }
                        return t.sort((e, t) => e.score.sum - t.score.sum), t
                    }(t),
                    s = n.map(e => e.style);
                global.Env && "trace" === global.Env.logLevel && console.trace(
                    "### App Runtime ### 按照优先级合并节点样式：", n.map(e => `"${e.name}"`).join(" < "));
                const o = Object.assign({}, ...s),
                    r = Object.keys(Object.assign({}, e, o));
                for (let t = 0, n = r.length; t < n; t++) {
                    const n = r[t];
                    void 0 !== o[n] && void 0 === e[n] ? e[n] = !0 : void 0 === o[n] && void 0 !== e[n] &&
                        (o[n] = "")
                }
                return o
            }(this._usedCSSPropertyCache, this._matchedCssRuleCache)), this._mergedStyleCache
        }
        appendChild(e) {
            if (!(e && e instanceof o)) throw new Error("### App Runtime ### appendChild() 函数的node参数无效");
            if (e.parentNode && e.parentNode !== this) throw new Error(
                "### App Runtime ### appendChild() 参数node的父节点不匹配");
            return Q(this, e, null)
        }
        insertBefore(e, t) {
            if (!(e && 2 === arguments.length && e instanceof o)) throw new Error(
                "### App Runtime ### insertBefore() 函数的node/before参数无效");
            if (e.parentNode && e.parentNode !== this) throw new Error(
                "### App Runtime ### insertBefore() 参数node的父节点不匹配");
            return Q(this, e, t)
        }
        removeChild(e) {
            if (!(e && e instanceof o)) throw new Error("### App Runtime ### removeChild() node参数无效");
            if (e.parentNode !== this) throw new Error("### App Runtime ### removeChild() 参数node的父节点不匹配");
            global.Env && "trace" === global.Env.logLevel && console.trace(
                    `### App Runtime ### removeChild() 移除节点：${JSON.stringify(w(e,!1,!1,!1))}`), e.parentNode =
                null;
            const t = h(e._docId);
            return t && t.removeElement(e.ref), m(e, this.childNodes, !0),
                function e(t, n) {
                    if (t._docId !== n) return;
                    const s = d(n);
                    if (s) {
                        for (let n = 0, s = t.childNodes.length; n < s; n++) e(t.childNodes[n], t._docId);
                        t._depth = null, s._nodeMap[t.ref] = null, t._docId = null
                    }
                }(e, e._docId), e
        }
        toString() {
            const e = A(this),
                t = T(this);
            return "<" + this._type + " attr=" + JSON.stringify(e) + " style=" + JSON.stringify(t) + ">" + this
                .childNodes.map(e => e.toString()).join("") + "</" + this._type + ">"
        }
    }

    function le(e) {
        const t = new re("html");
        return t.ref = o.NodeRef.HTML_ID, t._depth = 0, t._ownerDocument = e, f(t, e._docId), t.parentNode = e, e.childNodes
            .push(t), t
    }
    class ie extends re {
        constructor(e, t) {
            var n;
            super("#document"), this._nodeType = o.NodeType.DOCUMENT, this._nodeName = "#document", this.body =
                null, e = e ? e.toString() : "", this._docId = e, this._nodeMap = {}, this.listener = t, this._styleSheetHash = {},
                this._styleSheetHash[0] = [], u(this._docId, this), Object.defineProperty(this,
                    "documentElement", {
                        configurable: !0,
                        enumerable: !1,
                        writable: !1,
                        value: le(this)
                    }), b(n = this.documentElement, y.null, !0), b(n, y[n._docId], !1)
        }
        createElement(e) {
            const t = new re(e);
            return t._ownerDocument = this, t
        }
    }
    var ce = function(e, t) {
            var n = [];
            if ("" !== (e = function e(t, n, s) {
                    var o, r, l, i, c = [],
                        a = !1;

                    function u() {
                        var e = n.match(ae)[0];
                        return n = n.substr(e.length), be(e)
                    }

                    function d(e) {
                        for (; Ne(n.charAt(e));) e++;
                        n = n.substr(e)
                    }

                    function h(e) {
                        for (var t = 0;
                            "\\" === n.charAt(--e);) t++;
                        return 1 == (1 & t)
                    }
                    for (d(0);
                        "" !== n;)
                        if (Ne(r = n.charAt(0))) a = !0, d(1);
                        else if (r in fe) c.push({
                        type: fe[r]
                    }), a = !1, d(1);
                    else if ("," === r) {
                        if (0 === c.length) throw new SyntaxError("empty sub-selector");
                        t.push(c), c = [], a = !1, d(1)
                    } else if (a && (c.length > 0 && c.push({
                            type: "descendant"
                        }), a = !1), "*" === r) n = n.substr(1), c.push({
                        type: "universal"
                    });
                    else if (r in pe) n = n.substr(1), c.push({
                        type: "attribute",
                        name: pe[r][0],
                        action: pe[r][1],
                        value: u(),
                        ignoreCase: !1
                    });
                    else if ("[" === r) {
                        if (n = n.substr(1), !(o = n.match(de))) throw new SyntaxError(
                            "Malformed attribute selector: " + n);
                        n = n.substr(o[0].length), l = be(o[1]), s && ("lowerCaseAttributeNames" in s ? !s.lowerCaseAttributeNames :
                            s.xmlMode) || (l = l.toLowerCase()), c.push({
                            type: "attribute",
                            name: l,
                            action: he[o[2]],
                            value: be(o[4] || o[5] || ""),
                            ignoreCase: !!o[6]
                        })
                    } else if (":" === r) {
                        if (":" === n.charAt(1)) {
                            n = n.substr(2), c.push({
                                type: "pseudo-element",
                                name: u().toLowerCase()
                            });
                            continue
                        }
                        if (n = n.substr(1), l = u().toLowerCase(), o = null, "(" === n.charAt(0))
                            if (l in ge) {
                                var f = (i = n.charAt(1)) in ye;
                                if (n = n.substr(f + 1), n = e(o = [], n, s), f) {
                                    if (n.charAt(0) !== i) throw new SyntaxError("unmatched quotes in :" + l);
                                    n = n.substr(1)
                                }
                                if (")" !== n.charAt(0)) throw new SyntaxError(
                                    "missing closing parenthesis in :" + l + " " + n);
                                n = n.substr(1)
                            } else {
                                for (var p = 1, g = 1; g > 0 && p < n.length; p++) "(" !== n.charAt(p) || h(p) ?
                                    ")" !== n.charAt(p) || h(p) || g-- : g++;
                                if (g) throw new SyntaxError("parenthesis not matched");
                                o = n.substr(1, p - 2), n = n.substr(p), l in me && ((i = o.charAt(0)) === o.slice(
                                    -1) && i in ye && (o = o.slice(1, -1)), o = be(o))
                            } c.push({
                            type: "pseudo",
                            name: l,
                            data: o
                        })
                    } else {
                        if (!ae.test(n)) return c.length && "descendant" === c[c.length - 1].type && c.pop(),
                            Ee(t, c), n;
                        l = u(), s && ("lowerCaseTags" in s ? !s.lowerCaseTags : s.xmlMode) || (l = l.toLowerCase()),
                            c.push({
                                type: "tag",
                                name: l
                            })
                    }
                    return Ee(t, c), n
                }(n, e + "", t))) throw new SyntaxError("Unmatched selector: " + e);
            return n
        },
        ae = /^(?:\\.|[\w\-\u00b0-\uFFFF])+/,
        ue = /\\([\da-f]{1,6}\s?|(\s)|.)/gi,
        de =
        /^\s*((?:\\.|[\w\u00b0-\uFFFF\-])+)\s*(?:(\S?)=\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00b0-\uFFFF\-])*)|)|)\s*(i)?\]/,
        he = {
            __proto__: null,
            undefined: "exists",
            "": "equals",
            "~": "element",
            "^": "start",
            $: "end",
            "*": "any",
            "!": "not",
            "|": "hyphen"
        },
        fe = {
            __proto__: null,
            ">": "child",
            "<": "parent",
            "~": "sibling",
            "+": "adjacent"
        },
        pe = {
            __proto__: null,
            "#": ["id", "equals"],
            ".": ["class", "element"]
        },
        ge = {
            __proto__: null,
            has: !0,
            not: !0,
            matches: !0
        },
        me = {
            __proto__: null,
            contains: !0,
            icontains: !0
        },
        ye = {
            __proto__: null,
            '"': !0,
            "'": !0
        };

    function _e(e, t, n) {
        var s = "0x" + t - 65536;
        return s != s || n ? t : s < 0 ? String.fromCharCode(s + 65536) : String.fromCharCode(s >> 10 | 55296, 1023 &
            s | 56320)
    }

    function be(e) {
        return e.replace(ue, _e)
    }

    function Ne(e) {
        return " " === e || "\n" === e || "\t" === e || "\f" === e || "\r" === e
    }

    function Ee(e, t) {
        if (e.length > 0 && 0 === t.length) throw new SyntaxError("empty sub-selector");
        e.push(t)
    }
    const Se = new WeakMap;

    function Ce(e, t) {
        if (!Se.has(t)) {
            const n = function(e, t) {
                const n = Object.keys(t || {}),
                    s = {
                        id: ve++,
                        name: e,
                        from: 0,
                        size: 0,
                        nameHash: {},
                        descLast: {},
                        descNotLast: {}
                    };
                s.from = Ae, s.size = n.length, Ae += n.length;
                for (let e = 0, o = n.length; e < o; e++) {
                    const o = n[e],
                        r = t[o];
                    let l;
                    if (!r || "_" === o[0]) continue;
                    if (r.animationName) {
                        const e = Oe(r.animationName, t);
                        e && (r.animationKeyframes = e)
                    }
                    if (r.fontFamily) {
                        const e = Te(r.fontFamily, t);
                        e && (r.fontFamilyDesc = e)
                    }
                    if (r._meta && delete r._meta, !r._meta && Ie.test(o)) {
                        try {
                            const e = Le(o),
                                t = e[0];
                            t.length > 1 && (r._meta = {}, r._meta.ruleDef = t)
                        } catch (e) {
                            console.warn(`### App Runtime ### 编译CSS后代选择器(${o})出错：${e.message}`);
                            continue
                        }
                        global.Env && "trace" === global.Env.logLevel && console.trace(
                            `### App Runtime ### 编译CSS后代选择器(${o})`)
                    }
                    if (r._meta && r._meta.ruleDef) {
                        const e = r._meta.ruleDef;
                        for (let t = 0, n = e.length; t < n; t++) {
                            const n = e[t];
                            G(n) ? n.idtt = n.name : J(n) ? n.idtt = `.${n.value}` : H(n) && (n.idtt =
                                `#${n.value}`)
                        }
                    }
                    global.Env && "trace" === global.Env.logLevel && console.trace(
                        `### App Runtime ### 遍历样式节点(${s.id})的选择器(${o})：${JSON.stringify(r)}`);
                    const i = Object.assign({}, r),
                        c = s.from + e;
                    if (i._meta) {
                        const e = i._meta;
                        delete i._meta, s.nameHash[o] = l = P({
                            name: o,
                            score: null,
                            order: c,
                            style: i,
                            meta: e,
                            _sheetId: s.id
                        });
                        const t = l.meta.ruleDef,
                            n = t[t.length - 1];
                        for (let e = 0, n = t.length; e < n - 1; e++) {
                            const n = t[e];
                            if (!U(n)) {
                                const e = n.idtt;
                                s.descNotLast[e] = s.descNotLast[e] || {
                                    list: []
                                }, s.descNotLast[e].list.push(l)
                            }
                        }
                        if (!U(n)) {
                            const e = n.idtt;
                            s.descLast[e] = s.descLast[e] || {
                                list: []
                            }, s.descLast[e].list.push(l)
                        }
                    } else {
                        if ("@KEYFRAMES" === o) continue;
                        "#" === o[0] ? s.nameHash[o] = l = k({
                            name: o,
                            order: c,
                            style: i,
                            _sheetId: s.id
                        }) : "." === o[0] ? s.nameHash[o] = l = F({
                            name: o,
                            order: c,
                            style: i,
                            _sheetId: s.id
                        }) : s.nameHash[o] = l = x({
                            name: o,
                            order: c,
                            style: i,
                            _sheetId: s.id
                        })
                    }
                }
                return s
            }(e, t);
            Se.set(t, n)
        }
        return Se.get(t)
    }
    let ve = 1,
        Ae = 1;
    const Ie = /\s/;

    function Oe(e, t) {
        const n = t["@KEYFRAMES"];
        if (n) {
            const t = n[e];
            if (t) return JSON.stringify(t)
        }
        return null
    }

    function Te(e, t) {
        const n = t["@FONT-FACE"],
            s = e.replace(/["']+/g, "").split(","),
            o = [];
        return s.length > 0 ? (s.forEach(e => {
            (e = e.trim()) && (n && n[e] ? o.push(n[e]) : o.push({
                fontName: e
            }))
        }), JSON.stringify(o)) : null
    }
    const we = new Map;

    function Le(e) {
        return we.has(e) || we.set(e, ce(e)), we.get(e)
    }
    class je {
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

    function Re(e, t = []) {
        return {
            module: "dom",
            method: e,
            args: t
        }
    }
    class $e {
        constructor(e, t) {
            this.id = e, this.streamer = t
        }
        createFinish(e) {
            return global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Runtime ### createFinish---- "), this.streamer.over(this.id, [Re("createFinish")],
                e)
        }
        updateFinish(e) {
            return global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Runtime ### updateFinish---- "), this.streamer.over(this.id, [Re("updateFinish")],
                e)
        }
        createBody(e) {
            const t = w(e, !0, !1, !0),
                n = t.children;
            delete t.children;
            const s = [Re("createBody", [t])];
            return n && s.push.apply(s, n.map(e => Re("addElement", [t.ref, e, -1]))), this.addActions(s)
        }
        addElement(e, t, n) {
            return n >= 0 || (n = -1), this.addActions(Re("addElement", [t, w(e, !0, !1, !0), n]))
        }
        removeElement(e) {
            if (Array.isArray(e)) {
                const t = e.map(e => Re("removeElement", [e]));
                return this.addActions(t)
            }
            return this.addActions(Re("removeElement", [e]))
        }
        moveElement(e, t, n) {
            return this.addActions(Re("moveElement", [e, t, n]))
        }
        setProp(e, t, n) {
            const s = {
                prop: {}
            };
            return s.prop[t] = n, this.addActions(Re("updateProps", [e, s]))
        }
        setAttr(e, t, n) {
            const s = {
                attr: {}
            };
            return null == n ? (console.warn(
                    `### App Runtime ### 组件 ${e} 的属性 ${t} 被修改为 undefined/null, 自动修改为默认值或空值`), s.attr[t] =
                "") : s.attr[t] = n, this.addActions(Re("updateAttrs", [e, s]))
        }
        setStyle(e, t, n) {
            const s = {
                style: {}
            };
            return null == n ? (console.warn(
                    `### App Runtime ### 组件 ${e} 的样式 ${t} 被修改为 undefined/null, 自动修改为默认值或空值`), s.style[t] =
                "") : s.style[t] = n, this.addActions(Re("updateStyle", [e, s]))
        }
        setStyles(e, t, n) {
            const s = {
                attr: n
            };
            return t && (s.style = t), this.addActions(Re("updateStyles", [e, s]))
        }
        setStyleObject(e, t, n, s, o) {
            return this.addActions(Re("updateStyleObject", [e, t, n, s, o]))
        }
        addEvent(e, t) {
            return this.addActions(Re("addEvent", [e, t]))
        }
        removeEvent(e, t) {
            return this.addActions(Re("removeEvent", [e, t]))
        }
        updatePageTitleBar(e) {
            return this.addActions(Re("updateTitleBar", [e]))
        }
        invokeComponentMethod(e, t, n, s) {
            return this.addActions({
                component: e,
                ref: t,
                method: n,
                args: s
            })
        }
        addActions(e) {
            Array.isArray(e) || (e = [e]), global.Env && "trace" === global.Env.logLevel && console.trace(
                "### App Runtime ### addActions---- ", JSON.stringify(e)), this.streamer.push(this.id, e)
        }
    }
    const Me = function(e) {
        const n = new je(t, 1),
            s = new $e(e, n);
        return new ie(e, s)
    };

    function De(e, t, n, s, o, r) {
        if (global.Env && "trace" === global.Env.logLevel && console.trace(
                `### App Runtime ### 基于节点(${o&&o.ref})注册样式节点(${s})`), o._ownerDocument) {
            if (s || (o._styleObject = n, o._styleObjectId = t), n) {
                ! function(e, t, n, s, o) {
                    t && (e._styleSheetHash[t] = n), s ? e._styleSheetHash[0].push(n) : o._styleObjectId = t
                }(o._ownerDocument, t, Ce(e, n), s, o)
            }
            if (r) {
                const r = h(o._docId);
                r && r.setStyleObject(o.ref, s, e, t, n)
            }
        }
    }

    function xe(e, t) {
        const n = e.createElement(t.type);
        n.ref = t.ref;
        const s = Object.keys(t.prop || {});
        for (let e = 0, o = s.length; e < o; e++) V(n, s[e], t.prop[s[e]]);
        t.styleObject && De("", n._styleObjectId, t.styleObject, !1, n, !0);
        const o = Object.keys(t.attr || {});
        for (let e = 0, s = o.length; e < s; e++) ee(n, o[e], t.attr[o[e]]);
        if (t.inlineStyle && ne(n, t.inlineStyle), t.event)
            for (let e = 0, s = t.event.length; e < s; e++) n._eventTargetListeners[t.event[e]] = "";
        if (t.children)
            for (let s = 0, o = t.children.length; s < o; s++) {
                const o = xe(e, t.children[s]);
                n.appendChild(o)
            }
        return n
    }

    function Fe(e, t) {
        const n = [];
        for (let s = 0, o = t.length; s < o; s++) n.push(...Pe(e, t[s]));
        return [e, n]
    }

    function ke(e) {
        return p(d(N(e._docId)), e.ref)
    }

    function Pe(e, t) {
        const o = N(e);
        let r = null;
        if ("dom" === t.module) switch (t.method) {
            case "createFinish":
            case "updateFinish":
                r = [t];
                break;
            case "createBody":
                ! function(e, t) {
                    if (!d(e)) {
                        const t = Me(e);
                        u(e, t)
                    }
                    const n = d(e),
                        s = xe(n, t);
                    n.documentElement.appendChild(s)
                }(o, ...t.args), r = s(), n();
                break;
            case "addElement":
                ! function(e, t, n) {
                    const s = d(e),
                        o = p(s, t);
                    if (o) {
                        const e = xe(s, n);
                        o.appendChild(e)
                    }
                }(o, ...t.args), r = s(), n();
                break;
            case "removeElement":
                ! function(e, t) {
                    const n = p(d(e), t);
                    n && n.parentNode && n.parentNode.removeChild(n)
                }(o, ...t.args), r = s(), n();
                break;
            case "moveElement":
                ! function(e, t, n, s) {
                    const o = d(e),
                        r = p(o, t),
                        l = p(o, n);
                    if (l) {
                        const e = l.childNodes[s];
                        l.insertBefore(r, e)
                    }
                }(o, ...t.args), r = s(), n();
                break;
            case "updateProps":
                ! function(e, t, n) {
                    const s = p(d(e), t);
                    for (const e in n.prop) V(s, e, n.prop[e])
                }(o, ...t.args), r = s(), n();
                break;
            case "updateAttrs":
                ! function(e, t, n) {
                    const s = p(d(e), t);
                    for (const e in n.attr) ee(s, e, n.attr[e])
                }(o, ...t.args), r = s(), n();
                break;
            case "updateStyle":
                ! function(e, t, n) {
                    const s = p(d(e), t);
                    for (const e in n.style) te(s, e, n.style[e])
                }(o, ...t.args), r = s(), n();
                break;
            case "updateStyles":
                ! function(e, t, n) {
                    const s = p(d(e), t);
                    if (n.attr)
                        for (const e in n.attr) ee(s, e, n.attr[e]);
                    n.style && ne(s, n.style)
                }(o, ...t.args), r = s(), n();
                break;
            case "updateStyleObject":
                ! function(e, t, n, s, o, r) {
                    if (!d(e) && n) {
                        const t = Me(e);
                        u(e, t)
                    }
                    const l = p(d(e), t);
                    De(s, o, r, n, l, !0)
                }(o, ...t.args), r = s(), n();
                break;
            case "addEvent":
            case "removeEvent":
            case "exitFullscreen":
            case "updateTitleBar":
            case "updateStatusBar":
            case "statistics":
                r = [t];
                break;
            default:
                throw new Error(`无法处理的DOM消息：${JSON.stringify(t)}`)
        } else t.component && (r = [t]);
        if (!r || 0 === r.length) throw new Error(`无法处理的call消息：${JSON.stringify(t)}`);
        return r
    }
    let Ge = null;
    let Je = null;
    return {
        __proto__: null,
        proxySendActions: function() {
            Ge = global.sendActions, global.sendActions = function(...e) {
                const t = Fe(...e);
                return Ge(...t)
            }
        },
        proxyCallNative: function() {
            global.STYLING = !0, Je = global.callNative, global.callNative = function(...e) {
                "string" == typeof e[1] && (e[1] = JSON.parse(e[1]));
                const t = Fe(...e);
                return t[1] instanceof Array && (t[1] = JSON.stringify(t[1])), Je(...t)
            }, global.getStylingNode = ke, global.registerFromCssFile = _, global.registerStyleObject = De
        }
    }
});
//# sourceMappingURL=styling.js.map
