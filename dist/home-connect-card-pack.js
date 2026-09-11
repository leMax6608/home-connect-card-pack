const j = globalThis, ee = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = /* @__PURE__ */ Symbol(), oe = /* @__PURE__ */ new WeakMap();
let _e = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = oe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && oe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ce = (s) => new _e(typeof s == "string" ? s : s + "", void 0, te), w = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, n, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new _e(t, s, te);
}, Pe = (s, e) => {
  if (ee) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = j.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, s.appendChild(i);
  }
}, le = ee ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ce(t);
})(s) : s;
const { is: Te, defineProperty: ze, getOwnPropertyDescriptor: Ne, getOwnPropertyNames: De, getOwnPropertySymbols: Oe, getPrototypeOf: Me } = Object, W = globalThis, ce = W.trustedTypes, He = ce ? ce.emptyScript : "", Ue = W.reactiveElementPolyfillSupport, U = (s, e) => s, Y = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? He : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, ve = (s, e) => !Te(s, e), de = { attribute: !0, type: String, converter: Y, reflect: !1, useDefault: !1, hasChanged: ve };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), W.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let N = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = de) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && ze(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: r } = Ne(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: n, set(a) {
      const l = n?.call(this);
      r?.call(this, a), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = Me(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const t = this.properties, i = [...De(t), ...Oe(t)];
      for (const n of i) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, n] of t) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const n = this._$Eu(t, i);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) t.unshift(le(n));
    } else e !== void 0 && t.push(le(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Pe(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Y).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Y;
      this._$Em = n;
      const l = a.fromAttribute(t, r.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, r) {
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (r = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? ve)(r, t) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: r }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: a } = r, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[U("elementProperties")] = /* @__PURE__ */ new Map(), N[U("finalized")] = /* @__PURE__ */ new Map(), Ue?.({ ReactiveElement: N }), (W.reactiveElementVersions ??= []).push("2.1.2");
const ie = globalThis, he = (s) => s, F = ie.trustedTypes, ue = F ? F.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, xe = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, we = "?" + $, Be = `<${we}>`, z = document, B = () => z.createComment(""), R = (s) => s === null || typeof s != "object" && typeof s != "function", se = Array.isArray, Re = (s) => se(s) || typeof s?.[Symbol.iterator] == "function", X = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, ge = />/g, A = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, fe = /"/g, $e = /^(?:script|style|textarea|title)$/i, Ie = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), h = Ie(1), D = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), ye = /* @__PURE__ */ new WeakMap(), S = z.createTreeWalker(z, 129);
function ke(s, e) {
  if (!se(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(e) : e;
}
const Le = (s, e) => {
  const t = s.length - 1, i = [];
  let n, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = H;
  for (let l = 0; l < t; l++) {
    const o = s[l];
    let d, p, c = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, p = a.exec(o), p !== null); ) m = a.lastIndex, a === H ? p[1] === "!--" ? a = pe : p[1] !== void 0 ? a = ge : p[2] !== void 0 ? ($e.test(p[2]) && (n = RegExp("</" + p[2], "g")), a = A) : p[3] !== void 0 && (a = A) : a === A ? p[0] === ">" ? (a = n ?? H, c = -1) : p[1] === void 0 ? c = -2 : (c = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? A : p[3] === '"' ? fe : me) : a === fe || a === me ? a = A : a === pe || a === ge ? a = H : (a = A, n = void 0);
    const v = a === A && s[l + 1].startsWith("/>") ? " " : "";
    r += a === H ? o + Be : c >= 0 ? (i.push(d), o.slice(0, c) + xe + o.slice(c) + $ + v) : o + $ + (c === -2 ? l : v);
  }
  return [ke(s, r + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class I {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let r = 0, a = 0;
    const l = e.length - 1, o = this.parts, [d, p] = Le(e, t);
    if (this.el = I.createElement(d, i), S.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = S.nextNode()) !== null && o.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(xe)) {
          const m = p[a++], v = n.getAttribute(c).split($), k = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: r, name: k[2], strings: v, ctor: k[1] === "." ? Fe : k[1] === "?" ? We : k[1] === "@" ? Ve : V }), n.removeAttribute(c);
        } else c.startsWith($) && (o.push({ type: 6, index: r }), n.removeAttribute(c));
        if ($e.test(n.tagName)) {
          const c = n.textContent.split($), m = c.length - 1;
          if (m > 0) {
            n.textContent = F ? F.emptyScript : "";
            for (let v = 0; v < m; v++) n.append(c[v], B()), S.nextNode(), o.push({ type: 2, index: ++r });
            n.append(c[m], B());
          }
        }
      } else if (n.nodeType === 8) if (n.data === we) o.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = n.data.indexOf($, c + 1)) !== -1; ) o.push({ type: 7, index: r }), c += $.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = z.createElement("template");
    return i.innerHTML = e, i;
  }
}
function O(s, e, t = s, i) {
  if (e === D) return e;
  let n = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const r = R(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = n : t._$Cl = n), n !== void 0 && (e = O(s, n._$AS(s, e.values), n, i)), e;
}
class je {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, n = (e?.creationScope ?? z).importNode(t, !0);
    S.currentNode = n;
    let r = S.nextNode(), a = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let d;
        o.type === 2 ? d = new L(r, r.nextSibling, this, e) : o.type === 1 ? d = new o.ctor(r, o.name, o.strings, this, e) : o.type === 6 && (d = new Ke(r, this, e)), this._$AV.push(d), o = i[++l];
      }
      a !== o?.index && (r = S.nextNode(), a++);
    }
    return S.currentNode = z, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class L {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, n) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = O(this, e, t), R(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== D && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Re(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && R(this._$AH) ? this._$AA.nextSibling.data = e : this.T(z.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = I.createElement(ke(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(t);
    else {
      const r = new je(n, this), a = r.u(this.options);
      r.p(t), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = ye.get(e.strings);
    return t === void 0 && ye.set(e.strings, t = new I(e)), t;
  }
  k(e) {
    se(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const r of e) n === t.length ? t.push(i = new L(this.O(B()), this.O(B()), this, this.options)) : i = t[n], i._$AI(r), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = he(e).nextSibling;
      he(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, n, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, n) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = O(this, e, t, 0), a = !R(e) || e !== this._$AH && e !== D, a && (this._$AH = e);
    else {
      const l = e;
      let o, d;
      for (e = r[0], o = 0; o < r.length - 1; o++) d = O(this, l[i + o], t, o), d === D && (d = this._$AH[o]), a ||= !R(d) || d !== this._$AH[o], d === u ? e = u : e !== u && (e += (d ?? "") + r[o + 1]), this._$AH[o] = d;
    }
    a && !n && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Fe extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class We extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class Ve extends V {
  constructor(e, t, i, n, r) {
    super(e, t, i, n, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = O(this, e, t, 0) ?? u) === D) return;
    const i = this._$AH, n = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== u && (i === u || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ke {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const Ge = ie.litHtmlPolyfillSupport;
Ge?.(I, L), (ie.litHtmlVersions ??= []).push("3.3.3");
const qe = (s, e, t) => {
  const i = t?.renderBefore ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = t?.renderBefore ?? null;
    i._$litPart$ = n = new L(e.insertBefore(B(), r), r, void 0, t ?? {});
  }
  return n._$AI(s), n;
};
const ne = globalThis;
class _ extends N {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qe(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return D;
  }
}
_._$litElement$ = !0, _.finalized = !0, ne.litElementHydrateSupport?.({ LitElement: _ });
const Ze = ne.litElementPolyfillSupport;
Ze?.({ LitElement: _ });
(ne.litElementVersions ??= []).push("4.2.2");
function J(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function Xe(s, e, t) {
  const i = e.entity_id.split(".")[0];
  if (t.domains?.length && !t.domains.includes(i)) return -1e3;
  const n = s.states[e.entity_id], r = J([
    e.entity_id,
    e.name,
    e.original_name,
    n?.attributes.friendly_name,
    n?.attributes.device_class,
    n?.attributes.unit_of_measurement,
    n?.attributes.icon
  ].filter(Boolean).join(" "));
  let a = 10;
  if (t.domains?.length) {
    const o = t.domains.indexOf(i);
    a += (t.domains.length - o) * 8;
  }
  for (const o of t.aliases || []) {
    const d = J(o);
    r.includes(d) && (a = Math.max(a, 100 + d.length));
  }
  const l = J(t.key.replace(/_entity$/, "")).split(" ");
  return a += l.filter((o) => r.includes(o)).length * 4, (e.disabled_by || e.hidden_by) && (a -= 50), a;
}
async function Je(s, e, t, i) {
  const n = await s.callWS({ type: "config/entity_registry/list" }), r = n.find((d) => d.entity_id === e);
  if (!r?.device_id) throw new Error("The selected anchor entity has no device registry link.");
  const a = n.filter((d) => d.device_id === r.device_id && !d.disabled_by && !d.hidden_by), l = {}, o = new Set(Object.entries(i).filter(([d, p]) => d !== "entity" && typeof p == "string" && p.includes(".")).map(([, d]) => d));
  for (const d of t.fields) {
    if (d.key === "entity" || i[d.key]) continue;
    const p = a.filter((c) => !o.has(c.entity_id)).map((c) => ({ entry: c, score: Xe(s, c, d) })).filter(({ score: c }) => c >= 50).sort((c, m) => m.score - c.score || c.entry.entity_id.localeCompare(m.entry.entity_id));
    p[0] && (l[d.key] = p[0].entry.entity_id, o.add(p[0].entry.entity_id));
  }
  return l;
}
const Ye = {
  "section.general": "Allgemein",
  "section.program": "Programm",
  "section.actions": "Aktionen",
  "section.options": "Optionen",
  "section.status": "Status & Wartung",
  "section.settings": "Geräteeinstellungen",
  "section.appearance": "Darstellung",
  "section.layout": "Layout & Verhalten",
  "action.start": "Start",
  "action.pause": "Pause",
  "action.resume": "Fortsetzen",
  "action.cancel": "Abbrechen",
  power: "Ein/Aus",
  progress: "Programmfortschritt",
  running: "Aktives Programm",
  paused: "Pausiert",
  ready: "Bereit",
  appliance_status: "Gerätestatus",
  working: "Wird ausgeführt…",
  not_configured: "Nicht konfiguriert",
  unavailable: "Nicht verfügbar",
  unknown: "Unbekannt",
  "device.dishwasher": "Spülmaschine",
  "device.oven": "Backofen",
  "device.coffee": "Kaffeemaschine",
  "device.dryer": "Trockner",
  "field.entity": "Geräte-Anker-Entity",
  "field.power_entity": "Ein/Aus",
  "field.status_entity": "Status",
  "field.operating_state_entity": "Betriebszustand",
  "field.selected_program_entity": "Ausgewähltes Programm",
  "field.active_program_entity": "Aktives Programm",
  "field.progress_entity": "Programmfortschritt",
  "field.remaining_time_entity": "Restzeit",
  "field.start_entity": "Start",
  "field.pause_entity": "Pause",
  "field.resume_entity": "Fortsetzen",
  "field.cancel_entity": "Abbrechen",
  "field.phase_entity": "Programmphase",
  "field.door_entity": "Tür",
  "field.water_entity": "Geschätzter Wasserverbrauch",
  "field.energy_entity": "Geschätzter Energieverbrauch",
  "field.salt_entity": "Salz",
  "field.rinse_aid_entity": "Klarspüler",
  "field.vario_speed_entity": "VarioSpeed Plus",
  "field.hygiene_entity": "Hygiene",
  "field.half_load_entity": "Halbe Ladung",
  "field.silent_entity": "Leisemodus",
  "field.care_entity": "Wartungsprogramm",
  "field.filter_entity": "Filterwarnung",
  "field.heater_scale_entity": "Wasserheizung verkalkt",
  "field.current_temperature_entity": "Aktuelle Temperatur",
  "field.target_temperature_entity": "Solltemperatur",
  "field.duration_entity": "Dauer",
  "field.level_entity": "Stufe",
  "field.rapid_preheat_entity": "Schnelles Vorheizen",
  "field.water_tank_entity": "Wassertank",
  "field.alarm_entity": "Timer",
  "field.child_lock_entity": "Kindersicherung",
  "field.display_brightness_entity": "Displayhelligkeit",
  "field.key_tones_entity": "Tastentöne",
  "field.cooling_fan_entity": "Kühllüfter-Laufzeit",
  "field.tone_duration_entity": "Tondauer",
  "field.power_state_entity": "Betriebszustand",
  "field.cups_entity": "Tassen",
  "field.bean_amount_entity": "Bohnenmenge",
  "field.fill_quantity_entity": "Füllmenge",
  "field.coffee_temperature_entity": "Kaffeetemperatur",
  "field.milk_ratio_entity": "Kaffee-/Milch-Verhältnis",
  "field.bean_container_entity": "Bohnenbehälter",
  "field.water_temperature_entity": "Wassertemperatur",
  "field.flow_rate_entity": "Durchflussmenge",
  "field.multiple_beverages_entity": "Mehrere Getränke",
  "field.beans_empty_entity": "Bohnenbehälter leer",
  "field.drip_tray_entity": "Auffangschale",
  "field.cup_warmer_entity": "Tassenwärmer",
  "field.finish_at_entity": "Fertig in",
  "field.drying_target_entity": "Trockenziel",
  "field.speed_perfect_entity": "SpeedPerfect",
  "field.gentle_entity": "Sanft",
  "field.wrinkle_guard_entity": "Knitterschutz",
  "field.reload_entity": "Nachlegen möglich",
  "field.condensate_entity": "Kondensatbehälter",
  "field.lint_filter_entity": "Flusenfilter",
  "field.load_recommendation_entity": "Beladungsempfehlung",
  "field.drum_light_entity": "Trommellicht",
  "field.door_light_entity": "Tür-Ringlicht",
  "field.signal_volume_entity": "Signallautstärke",
  "field.brightness_entity": "Helligkeit",
  "field.auto_power_off_entity": "Automatische Abschaltung",
  "editor.intro": "Wähle eine beliebige Entity des Geräts als Anker. Die automatische Erkennung nutzt die Geräte- und Entity-Registry und füllt nur leere Felder; jeder Vorschlag bleibt änderbar.",
  "editor.name": "Name überschreiben",
  "editor.icon": "Icon überschreiben",
  "editor.detect": "Geräte-Entities erkennen",
  "editor.detected": "passende Entities ergänzt. Bitte alle Vorschläge vor dem Speichern prüfen.",
  "editor.no_matches": "Keine weiteren eindeutigen Zuordnungen gefunden.",
  "option.default_expanded": "Standardmäßig geöffnet",
  "option.animations": "Animationen",
  "option.show_progress": "Fortschritt anzeigen",
  "option.show_remaining_time": "Restzeit anzeigen",
  "option.show_status_section": "Statusbereich anzeigen",
  "option.show_options_section": "Optionsbereich anzeigen",
  "option.show_settings_section": "Geräteeinstellungen anzeigen"
};
function g(s, e, t) {
  return (s?.language || s?.locale?.language || "en").toLowerCase().startsWith("de") && Ye[e] || t;
}
function Q(s, e) {
  return g(s, `field.${e.key}`, e.label);
}
const Qe = [
  { id: "general", label: "General", icon: "mdi:information-outline" },
  { id: "program", label: "Program", icon: "mdi:tune-variant" },
  { id: "actions", label: "Actions", icon: "mdi:gesture-tap-button" },
  { id: "options", label: "Options", icon: "mdi:toggle-switch-outline" },
  { id: "status", label: "Status & care", icon: "mdi:heart-pulse" },
  { id: "settings", label: "Device settings", icon: "mdi:cog-outline" }
];
class K extends _ {
  constructor() {
    super(...arguments), this._discovering = !1, this._notice = "";
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _discovering: { state: !0 },
      _notice: { state: !0 }
    };
  }
  static {
    this.styles = w`
    :host { display: block; color: var(--primary-text-color); }
    * { box-sizing: border-box; }
    .editor { display: grid; gap: 14px; }
    .intro { color: var(--secondary-text-color); font-size: 13px; line-height: 1.45; }
    .group { padding: 12px; border: 1px solid var(--divider-color); border-radius: 14px; background: var(--card-background-color); }
    .group-title { display: flex; align-items: center; gap: 8px; margin: 0 0 12px; font-size: 14px; font-weight: 650; }
    .group-title ha-icon { --mdc-icon-size: 18px; color: var(--primary-color); }
    .fields { display: grid; gap: 13px; }
    .field { display: grid; gap: 5px; }
    label { font-size: 12px; color: var(--secondary-text-color); }
    input[type=text] { width: 100%; height: 42px; padding: 0 12px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 9px; font: inherit; }
    .toggle { min-height: 40px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .toggle label { color: var(--primary-text-color); font-size: 13px; }
    .detect { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; border-radius: 10px; padding: 0 14px; color: var(--text-primary-color, white); background: var(--primary-color); font: inherit; font-weight: 650; cursor: pointer; }
    .detect:disabled { opacity: .55; cursor: not-allowed; }
    .notice { font-size: 12px; color: var(--secondary-text-color); }
    .loading { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
  }
  setConfig(e) {
    this._config = { ...e };
  }
  notify(e) {
    this._config = e, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: e }, bubbles: !0, composed: !0 }));
  }
  change(e, t) {
    if (!this._config) return;
    const i = { ...this._config };
    t === "" || t === void 0 ? delete i[e] : i[e] = t, this.notify(i);
  }
  async autoDetect() {
    if (!this.hass || !this._config?.entity || this._discovering) return;
    const e = this._config.entity;
    this._discovering = !0, this._notice = "";
    try {
      const t = await Je(this.hass, e, this.definition, this._config);
      if (this._config?.entity !== e) return;
      const i = Object.fromEntries(Object.entries(t).filter(([r]) => !this._config?.[r])), n = Object.keys(i).length;
      this.notify({ ...this._config, ...i }), this._notice = n ? `${n} ${g(this.hass, "editor.detected", "matching entities added. Review every suggestion before saving.")}` : g(this.hass, "editor.no_matches", "No additional unambiguous matches were found.");
    } catch (t) {
      this._notice = t instanceof Error ? t.message : "Automatic discovery failed.";
    } finally {
      this._discovering = !1, this._config?.entity && this._config.entity !== e && this.autoDetect();
    }
  }
  entitySelector(e) {
    const t = e.domains && e.domains.length === 1 ? e.domains[0] : e.domains;
    return { entity: t ? { domain: t } : {} };
  }
  renderEntityField(e) {
    if (!this._config || !this.hass) return u;
    const t = typeof this._config[e.key] == "string" ? this._config[e.key] : "";
    return h`<div class="field"><label>${Q(this.hass, e)}</label><ha-selector
      .hass=${this.hass} .selector=${this.entitySelector(e)} .value=${t}
      @value-changed=${(i) => {
      this.change(e.key, i.detail.value), e.key === "entity" && i.detail.value && this.autoDetect();
    }}></ha-selector></div>`;
  }
  renderToggle(e, t, i) {
    if (!this._config) return u;
    const n = typeof this._config[e] == "boolean" ? !!this._config[e] : i;
    return h`<div class="toggle"><label for=${e}>${t}</label><ha-switch id=${e} .checked=${n} @change=${(r) => this.change(e, r.currentTarget.checked)}></ha-switch></div>`;
  }
  render() {
    return !this._config || !this.hass ? u : h`<div class="editor">
      <p class="intro">${g(this.hass, "editor.intro", "Choose any entity from the appliance as the anchor. Auto-detection uses Home Assistant's entity/device registry and only fills empty fields; every result remains editable.")}</p>
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:palette-outline"></ha-icon>${g(this.hass, "section.appearance", "Appearance")}</h3><div class="fields">
        <div class="field"><label for="name">${g(this.hass, "editor.name", "Name override")}</label><input id="name" type="text" .value=${this._config.name || ""} placeholder=${this.definition.defaultName} @change=${(e) => this.change("name", e.currentTarget.value)}></div>
        <div class="field"><label for="icon">${g(this.hass, "editor.icon", "Icon override")}</label><input id="icon" type="text" .value=${this._config.icon || ""} placeholder=${this.definition.defaultIcon} @change=${(e) => this.change("icon", e.currentTarget.value)}></div>
      </div></section>
      ${Qe.map((e) => {
      const t = this.definition.fields.filter((i) => i.section === e.id);
      return t.length ? h`<section class="group"><h3 class="group-title"><ha-icon .icon=${e.icon}></ha-icon>${g(this.hass, `section.${e.id}`, e.label)}</h3><div class="fields">${t.map((i) => this.renderEntityField(i))}
          ${e.id === "general" ? h`<button type="button" class="detect" ?disabled=${!this._config?.entity || this._discovering} @click=${this.autoDetect}><ha-icon class=${this._discovering ? "loading" : ""} .icon=${this._discovering ? "mdi:loading" : "mdi:auto-fix"}></ha-icon>${g(this.hass, "editor.detect", "Detect device entities")}</button>${this._notice ? h`<div class="notice">${this._notice}</div>` : ""}` : ""}
        </div></section>` : u;
    })}
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:eye-outline"></ha-icon>${g(this.hass, "section.layout", "Layout & behavior")}</h3><div class="fields">
        ${this.renderToggle("default_expanded", g(this.hass, "option.default_expanded", "Expanded by default"), !1)}
        ${this.renderToggle("animations", g(this.hass, "option.animations", "Animations"), !0)}
        ${this.renderToggle("show_progress", g(this.hass, "option.show_progress", "Show progress"), !0)}
        ${this.renderToggle("show_remaining_time", g(this.hass, "option.show_remaining_time", "Show remaining time"), !0)}
        ${this.renderToggle("show_status_section", g(this.hass, "option.show_status_section", "Show status section"), !0)}
        ${this.renderToggle("show_options_section", g(this.hass, "option.show_options_section", "Show options section"), !0)}
        ${this.renderToggle("show_settings_section", g(this.hass, "option.show_settings_section", "Show device settings"), !0)}
      </div></section>
    </div>`;
  }
}
const G = [
  { key: "entity", label: "Device anchor entity", section: "general" },
  { key: "power_entity", label: "Power", section: "general", domains: ["switch", "select"], aliases: ["power", "einschalter", "power state"] },
  { key: "status_entity", label: "Status", section: "general", domains: ["sensor", "select"], aliases: ["status", "power state"] },
  { key: "operating_state_entity", label: "Operating state", section: "general", domains: ["sensor", "select"], aliases: ["operating state", "betriebszustand", "operation state"] },
  { key: "selected_program_entity", label: "Selected program", section: "program", kind: "select", domains: ["select"], aliases: ["selected program", "ausgewahltes programm", "program"] },
  { key: "active_program_entity", label: "Active program", section: "program", kind: "status", domains: ["sensor"], aliases: ["active program", "aktives programm"] },
  { key: "progress_entity", label: "Program progress", section: "status", kind: "status", domains: ["sensor"], aliases: ["program progress", "programmfortschritt", "progress"] },
  { key: "remaining_time_entity", label: "Remaining time", section: "status", kind: "status", domains: ["sensor"], aliases: ["remaining program time", "verbleibende programmlaufzeit", "remaining time", "estimated total program time"] },
  { key: "start_entity", label: "Start", section: "actions", domains: ["button"], aliases: ["start"] },
  { key: "pause_entity", label: "Pause", section: "actions", domains: ["button"], aliases: ["pause"] },
  { key: "resume_entity", label: "Resume", section: "actions", domains: ["button"], aliases: ["resume", "fortsetzen"] },
  { key: "cancel_entity", label: "Cancel", section: "actions", domains: ["button"], aliases: ["cancel", "abbrechen"] }
], E = {
  kind: "dishwasher",
  cardType: "custom:home-connect-dishwasher-card",
  editorTag: "home-connect-dishwasher-card-editor",
  displayName: "Home Connect Dishwasher",
  description: "Compact controls and status for a Home Connect dishwasher.",
  defaultName: "Dishwasher",
  defaultIcon: "mdi:dishwasher",
  accent: "#4f8cff",
  fields: [
    ...G.filter((s) => s.key !== "pause_entity" && s.key !== "resume_entity"),
    { key: "phase_entity", label: "Program phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["program phase", "programmphase"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["door", "tur"] },
    { key: "water_entity", label: "Estimated water", section: "status", kind: "status", domains: ["sensor"], aliases: ["water consumption", "wasserverbrauch"] },
    { key: "energy_entity", label: "Estimated energy", section: "status", kind: "status", domains: ["sensor"], aliases: ["energy consumption", "energieverbrauch"] },
    { key: "salt_entity", label: "Salt", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["salt", "salz"], warning: !0 },
    { key: "rinse_aid_entity", label: "Rinse aid", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["rinse aid", "klarspuler"], warning: !0 },
    { key: "vario_speed_entity", label: "VarioSpeed Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["variospeed"] },
    { key: "hygiene_entity", label: "Hygiene Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["hygiene plus"] },
    { key: "half_load_entity", label: "Half load", section: "options", kind: "toggle", domains: ["switch"], aliases: ["half load", "halbe ladung"] },
    { key: "silent_entity", label: "Silent", section: "options", kind: "toggle", domains: ["switch"], aliases: ["silent", "leise"] },
    { key: "care_entity", label: "Machine care", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["machine care", "maschinenreinigung"], warning: !0 },
    { key: "filter_entity", label: "Filter warning", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["filter"], warning: !0 },
    { key: "heater_scale_entity", label: "Heater scale warning", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["heater scale", "wasserheizung verkalkt"], warning: !0 }
  ]
}, C = {
  kind: "oven",
  cardType: "custom:home-connect-oven-card",
  editorTag: "home-connect-oven-card-editor",
  displayName: "Home Connect Oven",
  description: "Program, temperature, timer and status controls for a Home Connect oven.",
  defaultName: "Oven",
  defaultIcon: "mdi:stove",
  accent: "#ff8a45",
  fields: [
    ...G,
    { key: "current_temperature_entity", label: "Current temperature", section: "status", kind: "status", domains: ["sensor"], aliases: ["current temperature", "aktuelle temperatur"], prominent: !0 },
    { key: "target_temperature_entity", label: "Target temperature", section: "program", kind: "number", domains: ["number"], aliases: ["target temperature", "sollwert temperatur"] },
    { key: "duration_entity", label: "Duration", section: "program", kind: "number", domains: ["number"], aliases: ["duration", "dauer"] },
    { key: "level_entity", label: "Level", section: "program", kind: "select", domains: ["select"], aliases: ["level", "stufe"] },
    { key: "rapid_preheat_entity", label: "Rapid preheat", section: "options", kind: "toggle", domains: ["switch"], aliases: ["rapid preheat", "schnelles vorheizen"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["door", "tur"], warning: !0 },
    { key: "water_tank_entity", label: "Water tank", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["water tank", "wassertank"], warning: !0 },
    { key: "alarm_entity", label: "Timer", section: "settings", kind: "number", domains: ["number"], aliases: ["alarm clock", "timer"] },
    { key: "child_lock_entity", label: "Child lock", section: "settings", kind: "toggle", domains: ["switch", "select"], aliases: ["child lock", "kindersicherung"] },
    { key: "display_brightness_entity", label: "Display brightness", section: "settings", kind: "number", domains: ["number"], aliases: ["display brightness", "display helligkeit"] },
    { key: "key_tones_entity", label: "Key tones", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["key tone", "tastentone"] },
    { key: "cooling_fan_entity", label: "Cooling fan duration", section: "settings", kind: "select", domains: ["select"], aliases: ["cooling fan", "kuhllufter"] },
    { key: "tone_duration_entity", label: "Tone duration", section: "settings", kind: "select", domains: ["select"], aliases: ["tone duration", "tondauer"] }
  ]
}, P = {
  kind: "coffee",
  cardType: "custom:home-connect-coffee-card",
  editorTag: "home-connect-coffee-card-editor",
  displayName: "Home Connect Coffee Machine",
  description: "A drink-first controller for Home Connect coffee machines.",
  defaultName: "Coffee machine",
  defaultIcon: "mdi:coffee-maker",
  accent: "#b9794a",
  fields: [
    ...G.filter((s) => s.key !== "remaining_time_entity"),
    { key: "cups_entity", label: "Cups", section: "program", kind: "select", domains: ["select"], aliases: ["cups", "tassen"] },
    { key: "bean_amount_entity", label: "Bean amount", section: "program", kind: "select", domains: ["select"], aliases: ["bean amount", "bohnenmenge"] },
    { key: "fill_quantity_entity", label: "Fill quantity", section: "program", kind: "number", domains: ["number"], aliases: ["fill quantity", "fullmenge"] },
    { key: "coffee_temperature_entity", label: "Coffee temperature", section: "program", kind: "select", domains: ["select"], aliases: ["coffee temperature", "kaffeetemperatur"] },
    { key: "milk_ratio_entity", label: "Coffee / milk ratio", section: "program", kind: "select", domains: ["select"], aliases: ["coffee milk ratio", "kaffee milch verhaltnis"] },
    { key: "bean_container_entity", label: "Bean container", section: "program", kind: "select", domains: ["select"], aliases: ["bean container", "bohnenbehalter"] },
    { key: "water_temperature_entity", label: "Water temperature", section: "program", kind: "select", domains: ["select"], aliases: ["hot water temperature", "wassertemperatur"] },
    { key: "flow_rate_entity", label: "Flow rate", section: "program", kind: "select", domains: ["select"], aliases: ["flow rate", "durchflussmenge"] },
    { key: "multiple_beverages_entity", label: "Multiple beverages", section: "options", kind: "toggle", domains: ["switch"], aliases: ["multiple beverages", "mehrere getranke"] },
    { key: "water_tank_entity", label: "Water tank", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["water tank", "wassertank"], warning: !0 },
    { key: "beans_empty_entity", label: "Beans empty", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["beans empty", "bohnenbehalter leer"], warning: !0 },
    { key: "drip_tray_entity", label: "Drip tray", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["drip tray", "auffangschale"], warning: !0 },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["door", "tur"], warning: !0 },
    { key: "cup_warmer_entity", label: "Cup warmer", section: "options", kind: "toggle", domains: ["switch"], aliases: ["cup warmer", "tassenwarmer"] },
    { key: "child_lock_entity", label: "Child lock", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["child lock", "kindersicherung"] }
  ]
}, T = {
  kind: "dryer",
  cardType: "custom:home-connect-dryer-card",
  editorTag: "home-connect-dryer-card-editor",
  displayName: "Home Connect Dryer",
  description: "Program, options, lighting and maintenance for a Home Connect dryer.",
  defaultName: "Dryer",
  defaultIcon: "mdi:tumble-dryer",
  accent: "#8c70e8",
  fields: [
    ...G,
    { key: "phase_entity", label: "Process phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["process phase", "prozessphase"] },
    { key: "finish_at_entity", label: "Finish at", section: "status", kind: "status", domains: ["sensor"], aliases: ["finish at", "fertig in"] },
    { key: "drying_target_entity", label: "Drying target", section: "program", kind: "select", domains: ["select"], aliases: ["drying target", "trockenziel"] },
    { key: "duration_entity", label: "Duration", section: "program", kind: "number", domains: ["number"], aliases: ["duration", "dauer"] },
    { key: "speed_perfect_entity", label: "SpeedPerfect", section: "options", kind: "toggle", domains: ["switch"], aliases: ["speedperfect", "speed perfect"] },
    { key: "hygiene_entity", label: "Hygiene", section: "options", kind: "toggle", domains: ["switch"], aliases: ["hygiene"] },
    { key: "half_load_entity", label: "Half load", section: "options", kind: "toggle", domains: ["switch"], aliases: ["half load", "halbe ladung"] },
    { key: "gentle_entity", label: "Gentle", section: "options", kind: "toggle", domains: ["switch"], aliases: ["gentle", "sanft"] },
    { key: "wrinkle_guard_entity", label: "Wrinkle guard", section: "options", kind: "toggle", domains: ["switch", "select"], aliases: ["wrinkle guard", "knitterschutz"] },
    { key: "silent_entity", label: "Silent mode", section: "options", kind: "toggle", domains: ["switch"], aliases: ["silent mode", "ruhemodus"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tur"], warning: !0 },
    { key: "reload_entity", label: "Reload possible", section: "status", kind: "status", domains: ["sensor"], aliases: ["laundry reload", "nachlegemoglichkeit"] },
    { key: "condensate_entity", label: "Condensate container", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["condensate container", "kondensatbehalter"], warning: !0 },
    { key: "lint_filter_entity", label: "Lint filter", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["lint filter", "flusenfilter"], warning: !0 },
    { key: "care_entity", label: "Care cycle", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["care cycle", "wartungsprogramm"], warning: !0 },
    { key: "load_recommendation_entity", label: "Load recommendation", section: "status", kind: "status", domains: ["sensor"], aliases: ["load recommendation", "beladungsempfehlung"] },
    { key: "drum_light_entity", label: "Drum light", section: "options", kind: "light", domains: ["light", "switch"], aliases: ["drum light", "trommellicht"] },
    { key: "door_light_entity", label: "Door ring light", section: "options", kind: "light", domains: ["light", "switch"], aliases: ["door ring light", "tur ringlicht"] },
    { key: "signal_volume_entity", label: "Signal volume", section: "settings", kind: "select", domains: ["select"], aliases: ["end signal volume", "lautstarke beendet"] },
    { key: "brightness_entity", label: "Brightness", section: "settings", kind: "number", domains: ["number", "select"], aliases: ["brightness", "helligkeit"] },
    { key: "auto_power_off_entity", label: "Automatic power off", section: "settings", kind: "select", domains: ["select"], aliases: ["auto power off", "automatische abschaltung"] }
  ]
};
function b(s, e) {
  customElements.get(s) || customElements.define(s, e);
}
class et extends K {
  constructor() {
    super(...arguments), this.definition = E;
  }
}
b(E.editorTag, et);
class tt extends K {
  constructor() {
    super(...arguments), this.definition = C;
  }
}
b(C.editorTag, tt);
class it extends K {
  constructor() {
    super(...arguments), this.definition = P;
  }
}
b(P.editorTag, it);
class st extends K {
  constructor() {
    super(...arguments), this.definition = T;
  }
}
b(T.editorTag, st);
const nt = w`
  :host { display: block; --hc-accent: var(--primary-color); }
  * { box-sizing: border-box; }
  ha-card {
    display: block; overflow: hidden; position: relative;
    color: var(--primary-text-color);
    background:
      radial-gradient(110% 90% at 0% 0%, color-mix(in srgb, var(--hc-accent), transparent 92%), transparent 62%),
      var(--ha-card-background, var(--card-background-color));
    border-radius: var(--ha-card-border-radius, 18px);
    border: var(--ha-card-border-width, 1px) solid var(--divider-color);
    box-shadow: var(--ha-card-box-shadow, none);
    transition: border-color 220ms ease, box-shadow 220ms ease;
  }
  ha-card:hover { border-color: color-mix(in srgb, var(--hc-accent), var(--divider-color) 68%); }
  .shell { position: relative; container-type: inline-size; }
  .shell::before {
    content: ""; position: absolute; inset: 0 auto auto 0; width: 100%; height: 3px;
    background: linear-gradient(90deg, var(--hc-accent), color-mix(in srgb, var(--hc-accent), transparent 72%) 72%, transparent);
    opacity: .9;
  }
  .summary {
    position: relative; width: 100%; min-height: 76px; display: grid; grid-template-columns: minmax(0, 1fr) auto;
    align-items: center; gap: 12px; padding: 13px 14px; border: 0; color: inherit;
    background: transparent; text-align: left; font: inherit; cursor: pointer;
  }
  .summary.has-progress { min-height: 88px; padding-bottom: 24px; }
  .summary-progress { position: absolute; left: 14px; right: 14px; bottom: 10px; height: 5px; overflow: hidden; border-radius: 999px; background: color-mix(in srgb, var(--secondary-background-color), var(--divider-color) 18%); box-shadow: inset 0 1px 1px #0001; }
  .summary-progress-fill { width: 100%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hc-accent), white 12%), var(--hc-accent)); box-shadow: 0 0 8px color-mix(in srgb, var(--hc-accent), transparent 58%); transform-origin: left; transition: transform 420ms cubic-bezier(.2,.8,.2,1); }
  .summary:focus-visible, button:focus-visible, select:focus-visible, input:focus-visible {
    outline: 2px solid var(--hc-accent); outline-offset: -2px;
  }
  .summary-end { display: flex; align-items: center; justify-content: flex-end; gap: 10px; min-width: 0; max-width: min(48%, 420px); }
  .metrics { display: flex; align-items: center; justify-content: flex-end; gap: 6px; min-width: 0; overflow: hidden; white-space: nowrap; }
  .metric { padding: 5px 8px; border-radius: 999px; background: color-mix(in srgb, var(--secondary-background-color), transparent 20%); font-size: 11px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }
  .metric.progress { color: var(--hc-accent); background: color-mix(in srgb, var(--hc-accent), transparent 88%); font-weight: 700; }
  .chevron { flex: none; padding: 4px; border-radius: 999px; background: color-mix(in srgb, var(--secondary-background-color), transparent 18%); transition: transform 220ms ease, background 180ms ease; color: var(--secondary-text-color); }
  .expanded .chevron { transform: rotate(180deg); }
  .details { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 260ms cubic-bezier(.2,.8,.2,1); }
  .expanded .details { grid-template-rows: 1fr; }
  .details-inner { min-height: 0; overflow: hidden; }
  .details-content { padding: 2px 14px 15px; display: grid; gap: 12px; }
  .no-animation .details, .no-animation .chevron { transition: none; }
  .no-animation .summary-progress-fill { transition: none; }
  .unavailable { opacity: .72; }
  .warning-strip { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 1px; scrollbar-width: none; }
  .warning-strip::-webkit-scrollbar { display: none; }
  .action-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .primary-actions { padding-top: 2px; }
  .error {
    margin: 0 14px 14px; padding: 10px 12px; border-radius: 10px;
    color: var(--error-color); background: color-mix(in srgb, var(--error-color), transparent 88%); font-size: 13px;
  }
  .mode-unavailable ha-card { border-color: color-mix(in srgb, var(--error-color), transparent 55%); }
  @container (max-width: 520px) {
    .summary { min-height: 70px; grid-template-columns: minmax(0, 1fr) auto; padding: 11px 12px; }
    .summary.has-progress { min-height: 84px; padding-bottom: 23px; }
    .summary-progress { left: 12px; right: 12px; bottom: 9px; }
    .summary-end { max-width: none; }
    .metric { padding: 4px 6px; }
    .details-content { padding-inline: 12px; }
  }
  @media (max-width: 520px) {
    .summary { min-height: 70px; padding: 11px 12px; }
    .details-content { padding-inline: 12px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .details, .chevron, .summary-progress-fill { transition: none !important; }
  }
`;
function rt(s, e, t) {
  const i = e[t];
  return s && typeof i == "string" ? s.states[i] : void 0;
}
function at(s) {
  const e = /* @__PURE__ */ new Set();
  for (const [t, i] of Object.entries(s))
    (t === "entity" || t.endsWith("_entity")) && typeof i == "string" && i.includes(".") && e.add(i);
  return [...e];
}
function ot(s, e, t) {
  return s === e ? !1 : !s || !e || s.language !== e.language || s.locale?.language !== e.locale?.language ? !0 : t.some((i) => s.states[i] !== e.states[i]);
}
const lt = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", "null", ""]);
function y(s) {
  return !!s && !lt.has(String(s.state).toLowerCase());
}
function be(s) {
  return (/enumtype|eventpresentstate|operationstate|powerstate/i.test(s) && s.includes(".") || s.includes(".") && /^[a-z_]+\./i.test(s) ? s.split(".").pop() : s).replace(/^BSH[._]Common[._]|^Dishcare[._]|^Cooking[._]|^LaundryCare[._]|^ConsumerProducts[._]CoffeeMaker[._]/i, "").replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}
function M(s) {
  if (!s) return "";
  const e = s.state.trim().toLowerCase();
  return (e.split(/[.:/]/).filter(Boolean).pop() || e).replace(/[\s_-]+/g, "");
}
function ct(s) {
  const e = /^P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i.exec(s);
  if (!e) return;
  const t = Number(e[1] || 0), i = Number(e[2] || 0) + Math.floor(Number(e[3] || 0) / 60);
  return t ? `${t}:${String(i).padStart(2, "0")} h` : `${i} min`;
}
function x(s, e) {
  const t = (s.language || s.locale?.language || "").toLowerCase().startsWith("de");
  if (!e) return t ? "Nicht konfiguriert" : "Not configured";
  if (!y(e)) return e?.state === "unavailable" ? t ? "Nicht verfügbar" : "Unavailable" : t ? "Unbekannt" : "Unknown";
  if (s.formatEntityState)
    try {
      const a = s.formatEntityState(e);
      if (a && a !== e.state) {
        const l = be(e.state).toLowerCase();
        if (a.toLowerCase() !== l) return a;
      }
    } catch {
    }
  const i = M(e), n = {
    run: ["Running", "Läuft"],
    running: ["Running", "Läuft"],
    active: ["Active", "Aktiv"],
    ready: ["Ready", "Bereit"],
    pause: ["Paused", "Pausiert"],
    paused: ["Paused", "Pausiert"],
    off: ["Off", "Aus"],
    on: ["On", "Ein"],
    inactive: ["Inactive", "Inaktiv"],
    finished: ["Finished", "Beendet"],
    completed: ["Completed", "Beendet"],
    error: ["Error", "Fehler"]
  };
  if (n[i] && /enumtype|eventpresentstate|operationstate|powerstate/i.test(e.state)) return n[i][t ? 1 : 0];
  const r = ct(e.state);
  return r || `${be(e.state)}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
}
function Ae(s) {
  if (!s || !y(s)) return;
  const e = Number.parseFloat(s.state.replace(",", "."));
  return Number.isFinite(e) ? e : void 0;
}
function dt(s) {
  const e = Ae(s);
  if (e !== void 0)
    return Math.max(0, Math.min(100, e <= 1 && !s?.attributes.unit_of_measurement ? e * 100 : e));
}
function ht(s) {
  return !s || !y(s) ? !1 : ["on", "open", "true", "active", "running", "run", "1", "present"].includes(M(s));
}
function ut(s) {
  if (!s || !y(s)) return !1;
  const e = M(s);
  return !["off", "closed", "ok", "normal", "none", "false", "0", "available", "full", "notpresent", "ready", "good"].includes(e);
}
function pt(s) {
  return s === "running" || s === "paused";
}
function gt(...s) {
  const e = s.filter((i) => !!i && y(i));
  if (!e.length && s.some(Boolean)) return "unavailable";
  const t = e.map(M);
  return s[0] && y(s[0]) && ["off", "aus", "ausgeschaltet", "inactive"].includes(M(s[0])) ? "off" : t.some((i) => ["pause", "paused", "angehalten", "unterbrochen"].includes(i)) ? "paused" : t.some((i) => ["run", "running", "active", "inoperation", "betrieb", "heat", "heating", "brew", "brewing", "drying", "trocknen"].includes(i)) ? "running" : t.some((i) => ["off", "aus", "ausgeschaltet", "inactive", "standby"].includes(i)) ? "off" : "idle";
}
async function mt(s, e) {
  const t = e.entity_id.split(".")[0];
  if (t === "select" || t === "input_select") {
    const i = e.attributes.options || [], n = (o) => o.toLowerCase().split(/[.:/]/).filter(Boolean).pop()?.replace(/[\s_-]/g, "") || "", r = i.find((o) => ["on", "ein", "active"].includes(n(o))), a = i.find((o) => ["off", "aus", "inactive", "standby"].includes(n(o))), l = ["on", "ein", "active"].includes(M(e)) ? a : r;
    if (!l) throw new Error("This select has no recognizable on/off options.");
    await s.callService("select", "select_option", { entity_id: e.entity_id, option: l });
    return;
  }
  await s.callService(t, e.state === "on" ? "turn_off" : "turn_on", { entity_id: e.entity_id });
}
async function ft(s, e) {
  const t = e.entity_id.split(".")[0];
  if (t !== "button" && t !== "input_button") throw new Error("The configured action is not a button entity.");
  await s.callService(t, "press", { entity_id: e.entity_id });
}
async function yt(s, e, t) {
  const i = e.entity_id.split(".")[0];
  if (i !== "select" && i !== "input_select") throw new Error("The configured entity is not a select.");
  await s.callService(i, "select_option", { entity_id: e.entity_id, option: t });
}
async function bt(s, e, t) {
  const i = e.entity_id.split(".")[0];
  await s.callService(i, "set_value", { entity_id: e.entity_id, value: t });
}
class _t extends _ {
  constructor() {
    super(...arguments), this.name = "Appliance", this.icon = "mdi:devices", this.status = "Unknown", this.program = "", this.mode = "idle", this.accent = "var(--primary-color)", this.busy = !1;
  }
  static {
    this.properties = {
      name: {},
      icon: {},
      status: {},
      program: {},
      mode: {},
      accent: {},
      busy: { type: Boolean }
    };
  }
  static {
    this.styles = w`
    :host { display: block; min-width: 0; }
    .header { display: grid; grid-template-columns: 48px minmax(0,1fr); align-items: center; gap: 12px; }
    .icon {
      position: relative; width: 48px; height: 48px; display: grid; place-items: center; border-radius: 15px;
      color: var(--hc-accent); background: color-mix(in srgb, var(--hc-accent), transparent 86%);
      border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 80%);
      box-shadow: inset 0 1px 0 color-mix(in srgb, white, transparent 82%);
      transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
    }
    .icon::after { content: ""; position: absolute; inset: 5px; border-radius: 11px; border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 89%); pointer-events: none; }
    .icon ha-icon { --mdc-icon-size: 25px; }
    .running .icon { background: color-mix(in srgb, var(--hc-accent), transparent 78%); }
    .running .icon ha-icon { animation: breathe 2.4s ease-in-out infinite; }
    .off .icon, .unavailable .icon { color: var(--secondary-text-color); background: var(--secondary-background-color); }
    .copy { min-width: 0; }
    .name { font-size: 15px; font-weight: 700; letter-spacing: -.01em; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { display: flex; gap: 7px; align-items: center; margin-top: 4px; min-width: 0; }
    .dot { width: 7px; height: 7px; flex: none; border-radius: 50%; background: var(--secondary-text-color); }
    .running .dot { background: var(--success-color, #43a047); box-shadow: 0 0 0 4px color-mix(in srgb, var(--success-color, #43a047), transparent 82%); }
    .paused .dot { background: var(--warning-color, #f4b400); }
    .unavailable .dot { background: var(--error-color); }
    .status, .program { color: var(--secondary-text-color); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .program::before { content: "·"; margin-right: 7px; color: var(--hc-accent); }
    @keyframes breathe { 50% { transform: scale(1.08); } }
    @media (prefers-reduced-motion: reduce) { .running .icon ha-icon { animation: none; } }
  `;
  }
  render() {
    return h`<div class="header ${this.mode}" style=${`--hc-accent:${this.accent}`}>
      <div class="icon"><ha-icon .icon=${this.icon}></ha-icon></div>
      <div class="copy">
        <div class="name">${this.name}</div>
        <div class="sub"><span class="dot"></span><span class="status">${this.busy ? "Working…" : this.status}</span>${this.program ? h`<span class="program">${this.program}</span>` : ""}</div>
      </div>
    </div>`;
  }
}
b("hc-appliance-header", _t);
class vt extends _ {
  constructor() {
    super(...arguments), this.value = 0, this.label = "Progress", this.animated = !0;
  }
  static {
    this.properties = { value: { type: Number }, label: {}, animated: { type: Boolean } };
  }
  static {
    this.styles = w`
    :host { display: block; }
    .top { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 7px; font-size: 12px; color: var(--secondary-text-color); }
    .value { color: var(--primary-text-color); font-variant-numeric: tabular-nums; font-weight: 600; }
    .track { height: 8px; overflow: hidden; border-radius: 999px; background: color-mix(in srgb, var(--secondary-background-color), var(--divider-color) 20%); box-shadow: inset 0 1px 2px #0001; }
    .fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hc-accent), white 12%), var(--hc-accent)); box-shadow: 0 0 10px color-mix(in srgb, var(--hc-accent), transparent 62%); transition: transform 420ms cubic-bezier(.2,.8,.2,1); transform-origin: left; }
    .static .fill { transition: none; }
    @media (prefers-reduced-motion: reduce) { .fill { transition: none; } }
  `;
  }
  render() {
    const e = Math.max(0, Math.min(100, Number.isFinite(this.value) ? this.value : 0));
    return h`<div class=${this.animated ? "" : "static"} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(e)}>
      <div class="top"><span>${this.label}</span><span class="value">${Math.round(e)}%</span></div>
      <div class="track"><div class="fill" style=${`transform:scaleX(${e / 100})`}></div></div>
    </div>`;
  }
}
b("hc-progress-display", vt);
class xt extends _ {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.warning = !1, this.icon = "";
  }
  static {
    this.properties = { label: {}, value: {}, warning: { type: Boolean }, icon: {} };
  }
  static {
    this.styles = w`
    :host { display: inline-block; }
    .chip { display: inline-flex; align-items: center; gap: 6px; max-width: 240px; padding: 7px 10px; border: 1px solid color-mix(in srgb, var(--divider-color), transparent 35%); border-radius: 999px; background: color-mix(in srgb, var(--secondary-background-color), transparent 8%); font-size: 11px; color: var(--secondary-text-color); }
    .warning { color: var(--warning-color, #f59e0b); border-color: color-mix(in srgb, var(--warning-color, #f59e0b), transparent 72%); background: color-mix(in srgb, var(--warning-color, #f59e0b), transparent 90%); }
    ha-icon { --mdc-icon-size: 15px; }
    span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    b { color: currentColor; font-weight: 650; }
  `;
  }
  render() {
    return h`<span class="chip ${this.warning ? "warning" : ""}">${this.icon ? h`<ha-icon .icon=${this.icon}></ha-icon>` : ""}<span>${this.label}${this.value ? h` <b>${this.value}</b>` : ""}</span></span>`;
  }
}
b("hc-status-chip", xt);
class wt extends _ {
  constructor() {
    super(...arguments), this.label = "", this.kind = "status", this.disabled = !1, this.busy = !1;
  }
  static {
    this.properties = { hass: { attribute: !1 }, entity: { attribute: !1 }, label: {}, kind: {}, disabled: { type: Boolean }, busy: { type: Boolean } };
  }
  static {
    this.styles = w`
    :host { display: block; min-width: 0; }
    .control { min-height: 48px; display: grid; gap: 6px; }
    .line { min-height: 45px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .label { min-width: 0; color: var(--secondary-text-color); font-size: 12px; font-weight: 520; }
    .value { padding: 4px 0; color: var(--primary-text-color); font-size: 13px; font-weight: 600; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    select { max-width: 62%; min-width: 120px; height: 37px; padding: 0 30px 0 11px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); border-radius: 11px; font: inherit; font-size: 13px; transition: border-color 150ms ease, box-shadow 150ms ease; }
    select:hover:not(:disabled) { border-color: color-mix(in srgb, var(--hc-accent), var(--divider-color) 45%); }
    .switch { position: relative; width: 42px; height: 24px; flex: none; border: 0; border-radius: 999px; padding: 2px; background: var(--switch-unchecked-track-color, var(--disabled-color)); cursor: pointer; transition: background 160ms ease; }
    .switch::after { content: ""; display: block; width: 20px; height: 20px; border-radius: 50%; background: var(--switch-unchecked-button-color, #fff); box-shadow: 0 1px 3px #0004; transition: transform 160ms ease; }
    .switch.on { background: var(--hc-accent); }
    .switch.on::after { transform: translateX(18px); }
    input[type=range] { width: 100%; height: 18px; accent-color: var(--hc-accent); cursor: pointer; }
    .number-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 12px; }
    .number-value { font-weight: 650; font-variant-numeric: tabular-nums; }
    .unavailable { opacity: .58; }
    button:disabled, select:disabled, input:disabled { cursor: not-allowed; opacity: .55; }
  `;
  }
  emit(e, t) {
    !this.entity || this.disabled || this.busy || this.dispatchEvent(new CustomEvent("hc-control", { detail: { entity: this.entity, action: e, value: t }, bubbles: !0, composed: !0 }));
  }
  render() {
    if (!this.entity || !this.hass) return u;
    const e = !y(this.entity), t = this.disabled || this.busy || e;
    if (this.kind === "toggle" || this.kind === "light") {
      const i = ht(this.entity);
      return h`<div class="line ${e ? "unavailable" : ""}"><span class="label">${this.label}</span><button class="switch ${i ? "on" : ""}" type="button" role="switch" aria-checked=${String(i)} aria-label=${this.label} ?disabled=${t} @click=${() => this.emit("toggle")}></button></div>`;
    }
    if (this.kind === "select") {
      const i = this.entity.attributes.options || [], n = i.includes(this.entity.state) || e ? i : [this.entity.state, ...i];
      return h`<div class="line ${e ? "unavailable" : ""}"><label class="label" for="select">${this.label}</label><select id="select" ?disabled=${t} @change=${(r) => this.emit("select", r.target.value)}>${n.map((r) => h`<option .value=${r} ?selected=${r === this.entity?.state}>${r}</option>`)}</select></div>`;
    }
    if (this.kind === "number") {
      const i = Ae(this.entity) ?? Number(this.entity.attributes.min ?? 0), n = Number(this.entity.attributes.min ?? 0), r = Number(this.entity.attributes.max ?? 100), a = Number(this.entity.attributes.step ?? 1);
      return h`<div class="control ${e ? "unavailable" : ""}"><div class="number-head"><label class="label" for="range">${this.label}</label><span class="number-value">${x(this.hass, this.entity)}</span></div><input id="range" type="range" min=${n} max=${r} step=${a} .value=${String(i)} ?disabled=${t} @change=${(l) => this.emit("number", Number(l.target.value))}></div>`;
    }
    return h`<div class="line ${e ? "unavailable" : ""}"><span class="label">${this.label}</span><span class="value">${x(this.hass, this.entity)}</span></div>`;
  }
}
b("hc-entity-control", wt);
class $t extends _ {
  constructor() {
    super(...arguments), this.title = "Section", this.icon = "mdi:tune-variant", this.open = !0;
  }
  static {
    this.properties = { title: {}, icon: {}, open: { type: Boolean, reflect: !0 } };
  }
  static {
    this.styles = w`
    :host { display: block; overflow: hidden; border: 1px solid color-mix(in srgb, var(--divider-color), transparent 28%); border-radius: 14px; background: color-mix(in srgb, var(--secondary-background-color), transparent 34%); }
    button { width: 100%; border: 0; background: none; color: inherit; padding: 11px 12px; display: flex; align-items: center; gap: 8px; font: inherit; cursor: pointer; transition: background 160ms ease; }
    button:hover { background: color-mix(in srgb, var(--hc-accent), transparent 95%); }
    button ha-icon:first-child { color: var(--hc-accent); --mdc-icon-size: 18px; }
    .title { flex: 1; text-align: left; font-weight: 650; font-size: 13px; }
    .chevron { --mdc-icon-size: 17px; color: var(--secondary-text-color); transition: transform 180ms ease; }
    :host([open]) .chevron { transform: rotate(180deg); }
    .body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 200ms ease; }
    :host([open]) .body { grid-template-rows: 1fr; }
    .clip { overflow: hidden; min-height: 0; }
    .content { padding: 0 12px 11px; }
    @media (prefers-reduced-motion: reduce) { .body, .chevron { transition: none; } }
  `;
  }
  render() {
    return h`<button type="button" @click=${() => this.open = !this.open} aria-expanded=${String(this.open)}><ha-icon .icon=${this.icon}></ha-icon><span class="title">${this.title}</span><ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon></button><div class="body"><div class="clip"><div class="content"><slot></slot></div></div></div>`;
  }
}
b("hc-expandable-section", $t);
class kt extends _ {
  constructor() {
    super(...arguments), this.actions = [], this.busyIds = /* @__PURE__ */ new Set();
  }
  static {
    this.properties = { actions: { attribute: !1 }, busyIds: { attribute: !1 } };
  }
  static {
    this.styles = w`
    :host { display: block; }
    .row { display: flex; gap: 8px; flex-wrap: wrap; }
    button { min-height: 42px; flex: 1 1 92px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid var(--divider-color); border-radius: 12px; padding: 0 12px; color: var(--primary-text-color); background: color-mix(in srgb, var(--card-background-color), var(--secondary-background-color) 18%); box-shadow: 0 1px 2px #0000000b; font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; transition: transform 140ms ease, border-color 140ms ease, background 140ms ease; }
    button:hover:not(:disabled) { transform: translateY(-1px); border-color: color-mix(in srgb, var(--hc-accent), var(--divider-color) 55%); }
    button:active:not(:disabled) { transform: translateY(0); }
    button.primary { color: var(--text-primary-color, white); border-color: transparent; background: linear-gradient(135deg, color-mix(in srgb, var(--hc-accent), white 10%), var(--hc-accent)); box-shadow: 0 5px 14px color-mix(in srgb, var(--hc-accent), transparent 74%); }
    button.danger { color: var(--error-color); background: color-mix(in srgb, var(--error-color), transparent 95%); }
    button:disabled { opacity: .5; cursor: not-allowed; }
    ha-icon { --mdc-icon-size: 17px; }
    .busy ha-icon { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
  }
  render() {
    return h`<div class="row">${this.actions.map((e) => {
      const t = this.busyIds.has(e.entityId);
      return h`<button type="button" class="${e.primary ? "primary" : ""} ${e.danger ? "danger" : ""} ${t ? "busy" : ""}" ?disabled=${e.disabled || t} @click=${() => this.dispatchEvent(new CustomEvent("hc-action", { detail: e, bubbles: !0, composed: !0 }))}><ha-icon .icon=${t ? "mdi:loading" : e.icon}></ha-icon><span>${e.label}</span></button>`;
    })}</div>`;
  }
}
b("hc-action-buttons", kt);
const At = {
  program: { title: "Program", icon: "mdi:tune-variant" },
  options: { title: "Options", icon: "mdi:toggle-switch-outline" },
  status: { title: "Status & care", icon: "mdi:information-outline" },
  settings: { title: "Device settings", icon: "mdi:cog-outline" }
};
class q extends _ {
  constructor() {
    super(...arguments), this._expanded = !1, this._busyIds = /* @__PURE__ */ new Set(), this._error = "", this._expandedByUser = !1;
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _expanded: { state: !0 },
      _busyIds: { state: !0 },
      _error: { state: !0 }
    };
  }
  static {
    this.styles = [nt, w`
    .section-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 18px; }
    .entity-slot { min-width: 0; border-bottom: 1px solid color-mix(in srgb, var(--divider-color), transparent 45%); }
    .entity-slot:nth-last-child(-n+2) { border-bottom-color: transparent; }
    .program-grid .entity-slot:first-child { grid-column: 1 / -1; }
    .power-row { padding: 2px 11px; border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 82%); border-radius: 13px; background: color-mix(in srgb, var(--hc-accent), transparent 94%); }
    .program-focus { padding: 2px 0 5px; }
    .activity { display: grid; gap: 10px; padding: 12px; border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 80%); border-radius: 14px; background: linear-gradient(135deg, color-mix(in srgb, var(--hc-accent), transparent 91%), color-mix(in srgb, var(--secondary-background-color), transparent 24%)); }
    .activity-top { display: flex; align-items: end; justify-content: space-between; gap: 12px; }
    .activity-copy { min-width: 0; }
    .activity-label { margin-bottom: 3px; color: var(--secondary-text-color); font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .activity-program { overflow: hidden; color: var(--primary-text-color); font-size: 15px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; }
    .activity-time { flex: none; padding: 5px 8px; border-radius: 9px; color: var(--hc-accent); background: color-mix(in srgb, var(--hc-accent), transparent 88%); font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums; }
    @container (max-width: 620px) {
      .section-grid { grid-template-columns: 1fr; }
      .program-grid .entity-slot:first-child { grid-column: auto; }
      .entity-slot:nth-last-child(-n+2) { border-bottom-color: color-mix(in srgb, var(--divider-color), transparent 45%); }
      .entity-slot:last-child { border-bottom-color: transparent; }
    }
  `];
  }
  setConfig(e) {
    if (!e || typeof e != "object") throw new Error("Invalid card configuration.");
    const t = !this._config, i = this._config?.default_expanded !== e.default_expanded;
    this._config = { ...e }, (t || i && !this._expandedByUser) && (this._expanded = e.default_expanded === !0);
  }
  getCardSize() {
    return this._expanded ? 6 : 1;
  }
  shouldUpdate(e) {
    return !e.has("hass") || !this._config ? !0 : ot(e.get("hass"), this.hass, at(this._config));
  }
  getState(e) {
    return this._config && rt(this.hass, this._config, e);
  }
  supportsField(e) {
    return this.definition.fields.some((t) => t.key === e);
  }
  configuredFields(e) {
    return !this._config || !this.hass ? [] : this.definition.fields.filter((t) => t.section === e).filter((t) => !["active_program_entity", "progress_entity", "remaining_time_entity"].includes(t.key)).map((t) => ({ field: t, entity: this.getState(t.key) })).filter(({ entity: t }) => !!t);
  }
  async withBusy(e, t) {
    if (!this._busyIds.has(e.entity_id)) {
      this._busyIds = new Set(this._busyIds).add(e.entity_id), this._error = "";
      try {
        await t();
      } catch (i) {
        this._error = i instanceof Error ? i.message : "The Home Assistant service call failed.";
      } finally {
        const i = new Set(this._busyIds);
        i.delete(e.entity_id), this._busyIds = i;
      }
    }
  }
  handleControl(e) {
    const { entity: t, action: i, value: n } = e.detail;
    this.withBusy(t, async () => {
      this.hass && (i === "toggle" && await mt(this.hass, t), i === "select" && typeof n == "string" && await yt(this.hass, t, n), i === "number" && typeof n == "number" && await bt(this.hass, t, n));
    });
  }
  handleAction(e) {
    const t = this.hass?.states[e.detail.entityId];
    t && this.withBusy(t, () => ft(this.hass, t));
  }
  renderPower(e) {
    const t = this.getState("power_entity") || this.getState("power_state_entity");
    if (!t) return u;
    const i = t.entity_id.split(".")[0], n = i === "select" || i === "input_select" ? "select" : i === "light" ? "light" : i === "switch" || i === "input_boolean" ? "toggle" : "status";
    return h`<div class="power-row"><hc-entity-control .hass=${this.hass} .entity=${t} .label=${g(this.hass, "power", "Power")} .kind=${n} .busy=${this._busyIds.has(t.entity_id)} .disabled=${e}></hc-entity-control></div>`;
  }
  renderActions(e) {
    if (!this._config || !this.hass || e === "off" || e === "unavailable") return u;
    const i = (e === "paused" ? [["resume_entity", g(this.hass, "action.resume", "Resume"), "mdi:play", !0, !1], ["cancel_entity", g(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : e === "running" ? [["pause_entity", g(this.hass, "action.pause", "Pause"), "mdi:pause", !1, !1], ["cancel_entity", g(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : [["start_entity", g(this.hass, "action.start", "Start"), "mdi:play", !0, !1]]).flatMap(([n, r, a, l, o]) => {
      if (!this.definition.fields.some((m) => m.key === n)) return [];
      const d = this._config?.[n], p = typeof d == "string" ? this.hass?.states[d] : void 0, c = p?.entity_id.split(".")[0];
      return p ? [{ key: n, label: r, icon: a, entityId: d, primary: l, danger: o, disabled: p.state === "unavailable" || c !== "button" && c !== "input_button" }] : [];
    });
    return i.length ? h`<div class="primary-actions"><hc-action-buttons .actions=${i} .busyIds=${this._busyIds}></hc-action-buttons></div>` : u;
  }
  renderSection(e, t) {
    if (!this._config || e === "options" && this._config.show_options_section === !1 || e === "status" && this._config.show_status_section === !1 || e === "settings" && this._config.show_settings_section === !1) return u;
    const i = this.configuredFields(e);
    if (!i.length) return u;
    const n = At[e];
    return h`<hc-expandable-section .title=${g(this.hass, `section.${e}`, n.title)} .icon=${n.icon} .open=${!1}>
      <div class="section-grid ${e === "program" ? "program-grid" : ""}">${i.map(({ field: r, entity: a }) => h`
        <div class="entity-slot"><hc-entity-control .hass=${this.hass} .entity=${a} .label=${Q(this.hass, r)} .kind=${this.controlKind(r, a)}
          .busy=${this._busyIds.has(a.entity_id)} .disabled=${t && r.kind !== "status"}></hc-entity-control>
        </div>
      `)}</div>
    </hc-expandable-section>`;
  }
  controlKind(e, t) {
    if (e.kind === "status") return "status";
    const i = t.entity_id.split(".")[0];
    return i === "select" || i === "input_select" ? "select" : i === "number" || i === "input_number" ? "number" : i === "light" ? "light" : i === "switch" || i === "input_boolean" ? "toggle" : "status";
  }
  render() {
    if (!this._config || !this.hass) return u;
    const e = this.getState("operating_state_entity") || this.getState("status_entity") || this.getState("power_state_entity") || this.getState("power_entity") || this.getState("entity"), t = this.getState("power_entity") || this.getState("power_state_entity"), i = this.getState("active_program_entity"), n = this.getState("selected_program_entity"), r = dt(this.getState("progress_entity")), a = (this.supportsField("remaining_time_entity") ? this.getState("remaining_time_entity") : void 0) || (this.supportsField("finish_at_entity") ? this.getState("finish_at_entity") : void 0), l = gt(t, e), o = pt(l), d = o ? i || n : n || i, p = l === "off" ? void 0 : d, c = o ? r : void 0, m = o ? a : void 0, v = l === "off" && t ? t : e, k = this._config.animations !== !1, re = this.definition.fields.filter((f) => f.warning).map((f) => ({ field: f, entity: this.getState(f.key) })).filter(({ entity: f }) => f && ut(f)), Se = this.definition.fields.filter((f) => f.prominent).map((f) => ({ field: f, entity: this.getState(f.key) })).filter(({ entity: f }) => y(f)), Z = l === "running" || l === "paused", Ee = l !== "off" && (y(d) || y(m) || c !== void 0);
    return h`<ha-card style=${`--hc-accent:${this.definition.accent}`} @hc-control=${this.handleControl} @hc-action=${this.handleAction}>
      <div class="shell mode-${l} ${this._expanded ? "expanded" : ""} ${k ? "" : "no-animation"} ${l === "unavailable" ? "unavailable" : ""}">
        <button class="summary ${c !== void 0 && this._config.show_progress !== !1 ? "has-progress" : ""}" type="button" @click=${() => {
      this._expandedByUser = !0, this._expanded = !this._expanded;
    }} aria-expanded=${String(this._expanded)}>
          <hc-appliance-header .name=${this._config.name || g(this.hass, `device.${this.definition.kind}`, this.definition.defaultName)} .icon=${this._config.icon || this.definition.defaultIcon}
            .status=${x(this.hass, v)} .program=${y(p) ? x(this.hass, p) : ""} .mode=${l} .accent=${this.definition.accent}></hc-appliance-header>
          <div class="summary-end"><div class="metrics">
            ${Se.map(({ entity: f }) => h`<span class="metric">${x(this.hass, f)}</span>`)}
            ${c !== void 0 && this._config.show_progress !== !1 ? h`<span class="metric progress">${Math.round(c)}%</span>` : ""}
            ${y(m) && this._config.show_remaining_time !== !1 ? h`<span class="metric">${x(this.hass, m)}</span>` : ""}
          </div><ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon></div>
          ${c !== void 0 && this._config.show_progress !== !1 ? h`<div class="summary-progress" aria-hidden="true"><div class="summary-progress-fill" style=${`transform:scaleX(${c / 100})`}></div></div>` : ""}
        </button>
        <div class="details"><div class="details-inner"><div class="details-content">
          ${re.length ? h`<div class="warning-strip">${re.map(({ field: f, entity: ae }) => h`<hc-status-chip .label=${Q(this.hass, f)} .value=${ae?.entity_id.startsWith("binary_sensor.") ? "" : x(this.hass, ae)} warning icon="mdi:alert-outline"></hc-status-chip>`)}</div>` : ""}
          ${this.renderPower(!1)}
          ${Ee ? h`<div class="activity"><div class="activity-top"><div class="activity-copy"><div class="activity-label">${l === "running" ? g(this.hass, "running", "Now running") : l === "paused" ? g(this.hass, "paused", "Paused") : g(this.hass, "ready", "Ready")}</div><div class="activity-program">${y(d) ? x(this.hass, d) : g(this.hass, "appliance_status", "Appliance status")}</div></div>${y(m) && this._config.show_remaining_time !== !1 ? h`<div class="activity-time">${x(this.hass, m)}</div>` : ""}</div>${c !== void 0 && this._config.show_progress !== !1 ? h`<hc-progress-display .value=${c} .label=${g(this.hass, "progress", "Program progress")} .animated=${k}></hc-progress-display>` : ""}</div>` : ""}
          ${this.renderActions(l)}
          ${this.renderSection("program", Z)}
          ${this.renderSection("options", Z)}
          ${this.renderSection("status", !1)}
          ${this.renderSection("settings", Z)}
        </div></div></div>
        ${this._error ? h`<div class="error" role="alert">${this._error}</div>` : ""}
      </div>
    </ha-card>`;
  }
}
class St extends q {
  constructor() {
    super(...arguments), this.definition = E;
  }
  static getConfigElement() {
    return document.createElement(E.editorTag);
  }
  static getStubConfig() {
    return { type: E.cardType, name: E.defaultName };
  }
}
b("home-connect-dishwasher-card", St);
class Et extends q {
  constructor() {
    super(...arguments), this.definition = C;
  }
  static getConfigElement() {
    return document.createElement(C.editorTag);
  }
  static getStubConfig() {
    return { type: C.cardType, name: C.defaultName };
  }
}
b("home-connect-oven-card", Et);
class Ct extends q {
  constructor() {
    super(...arguments), this.definition = P;
  }
  static getConfigElement() {
    return document.createElement(P.editorTag);
  }
  static getStubConfig() {
    return { type: P.cardType, name: P.defaultName };
  }
}
b("home-connect-coffee-card", Ct);
class Pt extends q {
  constructor() {
    super(...arguments), this.definition = T;
  }
  static getConfigElement() {
    return document.createElement(T.editorTag);
  }
  static getStubConfig() {
    return { type: T.cardType, name: T.defaultName };
  }
}
b("home-connect-dryer-card", Pt);
const Tt = [E, C, P, T];
window.customCards = window.customCards || [];
for (const s of Tt)
  window.customCards.some((e) => e.type === s.cardType.replace("custom:", "")) || window.customCards.push({
    type: s.cardType.replace("custom:", ""),
    name: s.displayName,
    description: s.description,
    preview: !0
  });
console.info("%c HOME-CONNECT-CARD-PACK %c v1.2.1 ", "color:white;background:#445b78;font-weight:700", "color:#445b78;background:#eef2f7");
//# sourceMappingURL=home-connect-card-pack.js.map
