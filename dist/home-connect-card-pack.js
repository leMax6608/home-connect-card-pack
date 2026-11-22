const G = globalThis, ne = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, se = /* @__PURE__ */ Symbol(), me = /* @__PURE__ */ new WeakMap();
let Te = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== se) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ne && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ge = (n) => new Te(typeof n == "string" ? n : n + "", void 0, se), w = (n, ...e) => {
  const t = n.length === 1 ? n[0] : e.reduce((i, s, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new Te(t, n, se);
}, qe = (n, e) => {
  if (ne) n.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = G.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, n.appendChild(i);
  }
}, fe = ne ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ge(t);
})(n) : n;
const { is: Ye, defineProperty: Ze, getOwnPropertyDescriptor: Je, getOwnPropertyNames: Xe, getOwnPropertySymbols: Qe, getPrototypeOf: et } = Object, Y = globalThis, ye = Y.trustedTypes, tt = ye ? ye.emptyScript : "", it = Y.reactiveElementPolyfillSupport, W = (n, e) => n, te = { toAttribute(n, e) {
  switch (e) {
    case Boolean:
      n = n ? tt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, e) {
  let t = n;
  switch (e) {
    case Boolean:
      t = n !== null;
      break;
    case Number:
      t = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(n);
      } catch {
        t = null;
      }
  }
  return t;
} }, Pe = (n, e) => !Ye(n, e), _e = { attribute: !0, type: String, converter: te, reflect: !1, useDefault: !1, hasChanged: Pe };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let T = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = _e) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Ze(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: r } = Je(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const l = s?.call(this);
      r?.call(this, a), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? _e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const e = et(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const t = this.properties, i = [...Xe(t), ...Qe(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(fe(s));
    } else e !== void 0 && t.push(fe(e));
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
    return qe(e, this.constructor.elementStyles), e;
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
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : te).toAttribute(t, i.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : te;
      this._$Em = s;
      const l = a.fromAttribute(t, r.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, r) {
    if (e !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? Pe)(r, t) || i.useDefault && i.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: r }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), r !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, r] of i) {
        const { wrapped: a } = r, l = this[s];
        a !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, r, l);
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
T.elementStyles = [], T.shadowRootOptions = { mode: "open" }, T[W("elementProperties")] = /* @__PURE__ */ new Map(), T[W("finalized")] = /* @__PURE__ */ new Map(), it?.({ ReactiveElement: T }), (Y.reactiveElementVersions ??= []).push("2.1.2");
const re = globalThis, be = (n) => n, q = re.trustedTypes, ve = q ? q.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ne = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, De = "?" + $, nt = `<${De}>`, C = document, R = () => C.createComment(""), j = (n) => n === null || typeof n != "object" && typeof n != "function", ae = Array.isArray, st = (n) => ae(n) || typeof n?.[Symbol.iterator] == "function", X = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, we = /-->/g, xe = />/g, S = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $e = /'/g, ke = /"/g, Ie = /^(?:script|style|textarea|title)$/i, rt = (n) => (e, ...t) => ({ _$litType$: n, strings: e, values: t }), p = rt(1), z = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), Ae = /* @__PURE__ */ new WeakMap(), E = C.createTreeWalker(C, 129);
function Me(n, e) {
  if (!ae(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ve !== void 0 ? ve.createHTML(e) : e;
}
const at = (n, e) => {
  const t = n.length - 1, i = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = H;
  for (let l = 0; l < t; l++) {
    const o = n[l];
    let c, g, h = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, g = a.exec(o), g !== null); ) m = a.lastIndex, a === H ? g[1] === "!--" ? a = we : g[1] !== void 0 ? a = xe : g[2] !== void 0 ? (Ie.test(g[2]) && (s = RegExp("</" + g[2], "g")), a = S) : g[3] !== void 0 && (a = S) : a === S ? g[0] === ">" ? (a = s ?? H, h = -1) : g[1] === void 0 ? h = -2 : (h = a.lastIndex - g[2].length, c = g[1], a = g[3] === void 0 ? S : g[3] === '"' ? ke : $e) : a === ke || a === $e ? a = S : a === we || a === xe ? a = H : (a = S, s = void 0);
    const b = a === S && n[l + 1].startsWith("/>") ? " " : "";
    r += a === H ? o + nt : h >= 0 ? (i.push(c), o.slice(0, h) + Ne + o.slice(h) + $ + b) : o + $ + (h === -2 ? l : b);
  }
  return [Me(n, r + (n[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class L {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const l = e.length - 1, o = this.parts, [c, g] = at(e, t);
    if (this.el = L.createElement(c, i), E.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = E.nextNode()) !== null && o.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Ne)) {
          const m = g[a++], b = s.getAttribute(h).split($), x = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: r, name: x[2], strings: b, ctor: x[1] === "." ? lt : x[1] === "?" ? ct : x[1] === "@" ? dt : Z }), s.removeAttribute(h);
        } else h.startsWith($) && (o.push({ type: 6, index: r }), s.removeAttribute(h));
        if (Ie.test(s.tagName)) {
          const h = s.textContent.split($), m = h.length - 1;
          if (m > 0) {
            s.textContent = q ? q.emptyScript : "";
            for (let b = 0; b < m; b++) s.append(h[b], R()), E.nextNode(), o.push({ type: 2, index: ++r });
            s.append(h[m], R());
          }
        }
      } else if (s.nodeType === 8) if (s.data === De) o.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = s.data.indexOf($, h + 1)) !== -1; ) o.push({ type: 7, index: r }), h += $.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const i = C.createElement("template");
    return i.innerHTML = e, i;
  }
}
function O(n, e, t = n, i) {
  if (e === z) return e;
  let s = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const r = j(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = s : t._$Cl = s), s !== void 0 && (e = O(n, s._$AS(n, e.values), s, i)), e;
}
class ot {
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
    const { el: { content: t }, parts: i } = this._$AD, s = (e?.creationScope ?? C).importNode(t, !0);
    E.currentNode = s;
    let r = E.nextNode(), a = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let c;
        o.type === 2 ? c = new U(r, r.nextSibling, this, e) : o.type === 1 ? c = new o.ctor(r, o.name, o.strings, this, e) : o.type === 6 && (c = new ht(r, this, e)), this._$AV.push(c), o = i[++l];
      }
      a !== o?.index && (r = E.nextNode(), a++);
    }
    return E.currentNode = C, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = O(this, e, t), j(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : st(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = L.createElement(Me(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(t);
    else {
      const r = new ot(s, this), a = r.u(this.options);
      r.p(t), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Ae.get(e.strings);
    return t === void 0 && Ae.set(e.strings, t = new L(e)), t;
  }
  k(e) {
    ae(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const r of e) s === t.length ? t.push(i = new U(this.O(R()), this.O(R()), this, this.options)) : i = t[s], i._$AI(r), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = be(e).nextSibling;
      be(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, t = this, i, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) e = O(this, e, t, 0), a = !j(e) || e !== this._$AH && e !== z, a && (this._$AH = e);
    else {
      const l = e;
      let o, c;
      for (e = r[0], o = 0; o < r.length - 1; o++) c = O(this, l[i + o], t, o), c === z && (c = this._$AH[o]), a ||= !j(c) || c !== this._$AH[o], c === u ? e = u : e !== u && (e += (c ?? "") + r[o + 1]), this._$AH[o] = c;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class lt extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class ct extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class dt extends Z {
  constructor(e, t, i, s, r) {
    super(e, t, i, s, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = O(this, e, t, 0) ?? u) === z) return;
    const i = this._$AH, s = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, r = e !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ht {
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
const ut = re.litHtmlPolyfillSupport;
ut?.(L, U), (re.litHtmlVersions ??= []).push("3.3.3");
const pt = (n, e, t) => {
  const i = t?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = t?.renderBefore ?? null;
    i._$litPart$ = s = new U(e.insertBefore(R(), r), r, void 0, t ?? {});
  }
  return s._$AI(n), s;
};
const oe = globalThis;
let _ = class extends T {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return z;
  }
};
_._$litElement$ = !0, _.finalized = !0, oe.litElementHydrateSupport?.({ LitElement: _ });
const gt = oe.litElementPolyfillSupport;
gt?.({ LitElement: _ });
(oe.litElementVersions ??= []).push("4.2.2");
function Q(n) {
  return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function mt(n, e, t) {
  const i = e.entity_id.split(".")[0];
  if (t.domains?.length && !t.domains.includes(i)) return -1e3;
  const s = n.states[e.entity_id], r = Q([
    e.entity_id,
    e.name,
    e.original_name,
    s?.attributes.friendly_name,
    s?.attributes.device_class,
    s?.attributes.unit_of_measurement,
    s?.attributes.icon
  ].filter(Boolean).join(" "));
  let a = 10;
  if (t.domains?.length) {
    const o = t.domains.indexOf(i);
    a += (t.domains.length - o) * 8;
  }
  for (const o of t.aliases || []) {
    const c = Q(o);
    r.includes(c) && (a = Math.max(a, 100 + c.length));
  }
  const l = Q(t.key.replace(/_entity$/, "")).split(" ");
  return a += l.filter((o) => r.includes(o)).length * 4, (e.disabled_by || e.hidden_by) && (a -= 50), a;
}
async function Oe(n, e, t, i) {
  const s = await n.callWS({ type: "config/entity_registry/list" }), r = s.find((c) => c.entity_id === e);
  if (!r?.device_id) throw new Error("The selected anchor entity has no device registry link.");
  const a = s.filter((c) => c.device_id === r.device_id && !c.disabled_by && !c.hidden_by), l = {}, o = new Set(Object.entries(i).filter(([c, g]) => c !== "entity" && typeof g == "string" && g.includes(".")).map(([, c]) => c));
  for (const c of t.fields) {
    if (c.key === "entity" || i[c.key]) continue;
    const g = a.filter((h) => !o.has(h.entity_id)).map((h) => ({ entry: h, score: mt(n, h, c) })).filter(({ score: h }) => h >= 50).sort((h, m) => m.score - h.score || h.entry.entity_id.localeCompare(m.entry.entity_id));
    g[0] && (l[c.key] = g[0].entry.entity_id, o.add(g[0].entry.entity_id));
  }
  return { anchor: r, candidates: a, suggestions: l };
}
async function ft(n, e, t, i) {
  return (await Oe(n, e, t, i)).suggestions;
}
const yt = {
  warnings: "Warnungen",
  "field.i_dos_1_fill_level_entity": "i-Dos 1 nachfüllen",
  "field.i_dos_2_fill_level_entity": "i-Dos 2 nachfüllen",
  "option.show_warnings_collapsed": "Warnungen auch eingeklappt anzeigen",
  "editor.extra_warnings": "Eigene Warnungen",
  "editor.extra_warnings_help": "Wähle einen Binärsensor, der bei Handlungsbedarf einschaltet. Der Name ist optional. Inaktive und nicht verfügbare Warnungen bleiben ausgeblendet.",
  "editor.warning_entity": "Warnsensor",
  "editor.warning_name": "Optionaler Warnungsname",
  "editor.add_warning": "Warnung hinzufügen",
  "editor.remove_warning": "Warnung entfernen",
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
  "action.more_info": "Mehr Informationen",
  "action.toggle_details": "Details ein-/ausklappen",
  "action.confirm_cancel": "Abbrechen bestätigen",
  "action.dismiss": "Schließen",
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
  "device.washer": "Waschmaschine",
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
  "field.filter_check_entity": "Filtersystem prüfen",
  "field.filter_entity": "Maschinenreinigungsfilter",
  "field.aquastop_entity": "AquaStop aufgetreten",
  "field.heater_scale_entity": "Wasserheizung verkalkt",
  "field.current_temperature_entity": "Aktuelle Temperatur",
  "field.washing_temperature_entity": "Waschtemperatur",
  "field.spin_speed_entity": "Schleuderdrehzahl",
  "field.drum_clean_reminder_entity": "Trommel reinigen",
  "field.prewash_entity": "Vorwäsche",
  "field.less_ironing_entity": "Weniger Bügeln",
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
  "editor.accent_color": "Akzentfarbe",
  "editor.detect": "Geräte-Entities erkennen",
  "editor.detected": "passende Entities ergänzt. Bitte alle Vorschläge vor dem Speichern prüfen.",
  "editor.no_matches": "Keine weiteren eindeutigen Zuordnungen gefunden.",
  "editor.copy_yaml": "YAML kopieren",
  "editor.copy_report": "Erkennungsbericht kopieren",
  "editor.program_names": "Programme manuell umbenennen",
  "editor.program_names_help": "Nur optionale Anzeigenamen. An Home Assistant wird weiterhin der unveränderte Originalwert gesendet.",
  "editor.custom_program_name": "Eigener Name",
  "editor.yaml_copied": "YAML-Konfiguration in die Zwischenablage kopiert.",
  "editor.report_copied": "Erkennungsbericht kopiert. Bitte vor dem Teilen persönliche Bezeichnungen prüfen.",
  "option.default_expanded": "Standardmäßig geöffnet",
  "option.animations": "Animationen",
  "option.confirm_cancel": "Programmabbruch durch zweiten Klick bestätigen",
  "option.show_progress": "Fortschritt anzeigen",
  "option.show_remaining_time": "Restzeit anzeigen",
  "option.show_status_section": "Statusbereich anzeigen",
  "option.show_options_section": "Optionsbereich anzeigen",
  "option.show_settings_section": "Geräteeinstellungen anzeigen"
}, _t = {
  warnings: "Waarschuwingen",
  "field.i_dos_1_fill_level_entity": "i-Dos 1 bijvullen",
  "field.i_dos_2_fill_level_entity": "i-Dos 2 bijvullen",
  "option.show_warnings_collapsed": "Waarschuwingen ook ingeklapt tonen",
  "editor.extra_warnings": "Eigen waarschuwingen",
  "editor.extra_warnings_help": "Kies een binaire sensor die aangaat wanneer aandacht nodig is. De naam is optioneel. Inactieve en niet-beschikbare waarschuwingen blijven verborgen.",
  "editor.warning_entity": "Waarschuwingssensor",
  "editor.warning_name": "Optionele waarschuwingsnaam",
  "editor.add_warning": "Waarschuwing toevoegen",
  "editor.remove_warning": "Waarschuwing verwijderen",
  "section.general": "Algemeen",
  "section.program": "Programma",
  "section.actions": "Acties",
  "section.options": "Opties",
  "section.status": "Status & onderhoud",
  "section.settings": "Apparaatinstellingen",
  "section.appearance": "Weergave",
  "section.layout": "Indeling & gedrag",
  "action.start": "Start",
  "action.pause": "Pauze",
  "action.resume": "Hervatten",
  "action.cancel": "Annuleren",
  "action.more_info": "Meer informatie",
  "action.toggle_details": "Details in-/uitklappen",
  "action.confirm_cancel": "Annuleren bevestigen",
  "action.dismiss": "Sluiten",
  power: "Aan/uit",
  progress: "Programmavoortgang",
  running: "Actief programma",
  paused: "Gepauzeerd",
  ready: "Gereed",
  appliance_status: "Apparaatstatus",
  working: "Bezig…",
  not_configured: "Niet geconfigureerd",
  unavailable: "Niet beschikbaar",
  unknown: "Onbekend",
  "device.dishwasher": "Vaatwasser",
  "device.oven": "Oven",
  "device.washer": "Wasmachine",
  "device.coffee": "Koffiemachine",
  "device.dryer": "Droger",
  "field.entity": "Anker-entiteit van apparaat",
  "field.power_entity": "Aan/uit",
  "field.status_entity": "Status",
  "field.operating_state_entity": "Bedrijfsstatus",
  "field.selected_program_entity": "Geselecteerd programma",
  "field.active_program_entity": "Actief programma",
  "field.progress_entity": "Programmavoortgang",
  "field.remaining_time_entity": "Resterende tijd",
  "field.start_entity": "Start",
  "field.pause_entity": "Pauze",
  "field.resume_entity": "Hervatten",
  "field.cancel_entity": "Annuleren",
  "field.phase_entity": "Programmafase",
  "field.door_entity": "Deur",
  "field.water_entity": "Geschat waterverbruik",
  "field.energy_entity": "Geschat energieverbruik",
  "field.salt_entity": "Zout",
  "field.rinse_aid_entity": "Glansspoelmiddel",
  "field.vario_speed_entity": "VarioSpeed Plus",
  "field.hygiene_entity": "Hygiëne Plus",
  "field.half_load_entity": "Halve belading",
  "field.silent_entity": "Stille modus",
  "field.care_entity": "Machineverzorging",
  "field.filter_check_entity": "Filtersysteem controleren",
  "field.filter_entity": "Filter machineverzorging",
  "field.aquastop_entity": "AquaStop geactiveerd",
  "field.heater_scale_entity": "Verwarmingselement verkalkt",
  "field.washing_temperature_entity": "Wastemperatuur",
  "field.spin_speed_entity": "Toerental",
  "field.drum_clean_reminder_entity": "Trommel reinigen",
  "field.prewash_entity": "Voorwassen",
  "field.less_ironing_entity": "Minder strijken",
  "field.current_temperature_entity": "Huidige temperatuur",
  "field.target_temperature_entity": "Ingestelde temperatuur",
  "field.duration_entity": "Duur",
  "field.level_entity": "Stand",
  "field.rapid_preheat_entity": "Snel voorverwarmen",
  "field.water_tank_entity": "Waterreservoir",
  "field.alarm_entity": "Timer",
  "field.child_lock_entity": "Kinderslot",
  "field.display_brightness_entity": "Helderheid display",
  "field.key_tones_entity": "Toetsgeluiden",
  "field.cooling_fan_entity": "Nalooptijd koelventilator",
  "field.tone_duration_entity": "Signaalduur",
  "field.power_state_entity": "Bedrijfsstatus",
  "field.bean_amount_entity": "Hoeveelheid bonen",
  "field.fill_quantity_entity": "Vulhoeveelheid",
  "field.coffee_temperature_entity": "Koffietemperatuur",
  "field.milk_ratio_entity": "Verhouding koffie/melk",
  "field.bean_container_entity": "Bonenreservoir",
  "field.water_temperature_entity": "Watertemperatuur",
  "field.flow_rate_entity": "Doorstroomsnelheid",
  "field.multiple_beverages_entity": "Meerdere dranken",
  "field.beans_empty_entity": "Bonenreservoir leeg",
  "field.drip_tray_entity": "Lekbak",
  "field.cup_warmer_entity": "Kopjeswarmer",
  "field.finish_at_entity": "Klaar over",
  "field.drying_target_entity": "Droogdoel",
  "field.speed_perfect_entity": "SpeedPerfect",
  "field.gentle_entity": "Voorzichtig",
  "field.wrinkle_guard_entity": "Kreukbescherming",
  "field.reload_entity": "Bijvullen mogelijk",
  "field.condensate_entity": "Condenswaterreservoir",
  "field.lint_filter_entity": "Pluizenfilter",
  "field.load_recommendation_entity": "Beladingsadvies",
  "field.drum_light_entity": "Trommelverlichting",
  "field.door_light_entity": "Deurringverlichting",
  "field.signal_volume_entity": "Signaalvolume",
  "field.brightness_entity": "Helderheid",
  "field.auto_power_off_entity": "Automatisch uitschakelen",
  "editor.intro": "Kies een willekeurige entiteit van het apparaat als anker. De automatische herkenning gebruikt het apparaat- en entiteitenregister en vult alleen lege velden; elke suggestie blijft aanpasbaar.",
  "editor.name": "Naam overschrijven",
  "editor.icon": "Pictogram overschrijven",
  "editor.accent_color": "Accentkleur",
  "editor.detect": "Entiteiten van apparaat herkennen",
  "editor.detected": "passende entiteiten toegevoegd. Controleer alle suggesties voor het opslaan.",
  "editor.no_matches": "Geen verdere eenduidige koppelingen gevonden.",
  "editor.copy_yaml": "YAML kopiëren",
  "editor.copy_report": "Herkenningsrapport kopiëren",
  "editor.program_names": "Programma's handmatig hernoemen",
  "editor.program_names_help": "Alleen optionele weergavenamen. Naar Home Assistant wordt nog steeds de oorspronkelijke waarde gestuurd.",
  "editor.custom_program_name": "Eigen naam",
  "editor.yaml_copied": "YAML-configuratie naar het klembord gekopieerd.",
  "editor.report_copied": "Herkenningsrapport gekopieerd. Controleer persoonlijke namen voordat je het deelt.",
  "option.default_expanded": "Standaard uitgeklapt",
  "option.animations": "Animaties",
  "option.confirm_cancel": "Programma annuleren met tweede klik bevestigen",
  "option.show_progress": "Voortgang tonen",
  "option.show_remaining_time": "Resterende tijd tonen",
  "option.show_status_section": "Statusgedeelte tonen",
  "option.show_options_section": "Optiegedeelte tonen",
  "option.show_settings_section": "Apparaatinstellingen tonen"
}, bt = { de: yt, nl: _t };
function He(n) {
  return (n?.language || n?.locale?.language || "en").toLowerCase().split(/[-_]/)[0];
}
function d(n, e, t) {
  return bt[He(n)]?.[e] || t;
}
function le(n, e) {
  return d(n, `field.${e.key}`, e.label);
}
async function Se(n) {
  if (navigator.clipboard?.writeText)
    try {
      await navigator.clipboard.writeText(n);
      return;
    } catch {
    }
  const e = document.createElement("textarea");
  e.value = n, e.setAttribute("readonly", ""), e.style.position = "fixed", e.style.opacity = "0", document.body.appendChild(e), e.select();
  const t = document.execCommand("copy");
  if (e.remove(), !t) throw new Error("Could not copy to the clipboard.");
}
const Be = "1.9.0", vt = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", "null", ""]);
function y(n) {
  return !!n && !vt.has(String(n.state).toLowerCase());
}
function Ee(n) {
  return (/enumtype|eventpresentstate|operationstate|powerstate/i.test(n) && n.includes(".") || n.includes(".") && /^[a-z_]+\./i.test(n) ? n.split(".").pop() : n).replace(/^BSH[._]Common[._]|^Dishcare[._]|^Cooking[._]|^LaundryCare[._]|^ConsumerProducts[._]CoffeeMaker[._]/i, "").replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}
function A(n) {
  if (!n) return "";
  const e = n.state.trim().toLowerCase();
  return (e.split(/[.:/]/).filter(Boolean).pop() || e).replace(/[\s_-]+/g, "");
}
function wt(n) {
  const e = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i.exec(n);
  if (!e) return;
  const t = Number(e[1] || 0) * 1440 + Number(e[2] || 0) * 60 + Number(e[3] || 0) + Math.floor(Number(e[4] || 0) / 60), i = Math.floor(t / 60), s = t % 60;
  return i ? `${i}:${String(s).padStart(2, "0")} h` : `${s} min`;
}
function xt(n, e, t) {
  if (n.formatEntityState)
    try {
      const i = n.formatEntityState(e, t);
      if (i && i !== t) return i;
    } catch {
    }
  return t;
}
function k(n, e) {
  if (!e) return d(n, "not_configured", "Not configured");
  if (!y(e)) return e?.state === "unavailable" ? d(n, "unavailable", "Unavailable") : d(n, "unknown", "Unknown");
  if (n.formatEntityState)
    try {
      const l = n.formatEntityState(e);
      if (l && l !== e.state) {
        const o = Ee(e.state).toLowerCase();
        if (l.toLowerCase() !== o) return l;
      }
    } catch {
    }
  const t = A(e), i = {
    run: ["Running", "Läuft", "Bezig"],
    running: ["Running", "Läuft", "Bezig"],
    active: ["Active", "Aktiv", "Actief"],
    ready: ["Ready", "Bereit", "Gereed"],
    pause: ["Paused", "Pausiert", "Gepauzeerd"],
    paused: ["Paused", "Pausiert", "Gepauzeerd"],
    off: ["Off", "Aus", "Uit"],
    on: ["On", "Ein", "Aan"],
    inactive: ["Inactive", "Inaktiv", "Inactief"],
    finished: ["Finished", "Beendet", "Klaar"],
    completed: ["Completed", "Beendet", "Klaar"],
    error: ["Error", "Fehler", "Fout"]
  }, r = { de: 1, nl: 2 }[He(n)] ?? 0;
  if (i[t] && /enumtype|eventpresentstate|operationstate|powerstate/i.test(e.state)) return i[t][r];
  const a = wt(e.state);
  return a || `${Ee(e.state)}${e.attributes.unit_of_measurement ? ` ${e.attributes.unit_of_measurement}` : ""}`;
}
function We(n) {
  if (!n || !y(n)) return;
  const e = Number.parseFloat(n.state.replace(",", "."));
  return Number.isFinite(e) ? e : void 0;
}
function $t(n) {
  const e = We(n);
  if (e !== void 0)
    return Math.max(0, Math.min(100, e <= 1 && !n?.attributes.unit_of_measurement ? e * 100 : e));
}
function kt(n) {
  return !n || !y(n) ? !1 : ["on", "open", "true", "active", "running", "run", "1", "present"].includes(A(n));
}
function Ce(n) {
  if (!n || !y(n)) return !1;
  const e = A(n);
  return !["off", "closed", "locked", "ok", "normal", "none", "false", "0", "available", "full", "filled", "notpresent", "ready", "good"].includes(e);
}
function At(n, e) {
  const t = n?.trim();
  return !t || t.length > 96 || /[;{}]/.test(t) ? e : /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(t) || /^[a-z]+$/i.test(t) || /^var\(--[a-z0-9_-]+\)$/i.test(t) || /^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([\d\s.,%+\-/a-z]+\)$/i.test(t) ? t : e;
}
function St(n) {
  return n === "running" || n === "paused";
}
function Et(...n) {
  const e = n.filter((i) => !!i && y(i));
  if (!e.length && n.some(Boolean)) return "unavailable";
  const t = e.map(A);
  return n[0] && y(n[0]) && ["off", "aus", "ausgeschaltet", "inactive"].includes(A(n[0])) ? "off" : t.some((i) => ["pause", "paused", "angehalten", "unterbrochen"].includes(i)) ? "paused" : t.some((i) => ["run", "running", "active", "inoperation", "betrieb", "heat", "heating", "brew", "brewing", "drying", "trocknen"].includes(i)) ? "running" : t.some((i) => ["off", "aus", "ausgeschaltet", "inactive", "standby"].includes(i)) ? "off" : "idle";
}
function ce(n) {
  return Array.isArray(n.extra_warnings) ? n.extra_warnings.filter((e) => !!e && typeof e.entity == "string" && e.entity.includes(".")) : [];
}
function Ct(n, e, t) {
  const i = t.fields.filter((r) => r.warning).flatMap((r) => {
    const a = e[r.key];
    if (typeof a != "string") return [];
    const l = n.states[a];
    return Ce(l) && (r.warningStates ? r.warningStates.some((c) => A(l) === c || A(l).endsWith(c)) : !0) ? [{ entity: l, label: le(n, r) }] : [];
  });
  for (const r of ce(e)) {
    const a = n.states[r.entity];
    Ce(a) && i.push({ entity: a, label: (typeof r.name == "string" ? r.name.trim() : "") || a.attributes.friendly_name || r.entity });
  }
  const s = /* @__PURE__ */ new Set();
  return i.filter(({ entity: r }) => s.has(r.entity_id) ? !1 : (s.add(r.entity_id), !0)).map(({ entity: r, label: a }) => ({ entity: r, label: a, value: r.entity_id.startsWith("binary_sensor.") ? "" : k(n, r) }));
}
function B(n) {
  return typeof n == "boolean" ? String(n) : !/^(?:true|false|null|~|yes|no|on|off|[-+]?\d.*)$/i.test(n) && /^[A-Za-z0-9_./:%-]+$/.test(n) ? n : JSON.stringify(n);
}
function zt(n, e) {
  const t = [
    "type",
    "entity",
    "name",
    "icon",
    "accent_color",
    ...e.fields.map((r) => r.key),
    "program_names",
    "extra_warnings",
    "show_warnings_collapsed",
    "default_expanded",
    "animations",
    "confirm_cancel",
    "show_progress",
    "show_remaining_time",
    "show_status_section",
    "show_options_section",
    "show_settings_section"
  ], i = Object.keys(n).filter((r) => !t.includes(r)).sort();
  return `${[.../* @__PURE__ */ new Set([...t, ...i])].flatMap((r) => {
    const a = n[r];
    if (typeof a == "string" || typeof a == "boolean") return [`${r}: ${B(a)}`];
    if (r === "extra_warnings" && Array.isArray(a)) {
      const l = ce(n);
      return l.length ? ["extra_warnings:", ...l.flatMap((o) => [
        `  - entity: ${B(o.entity)}`,
        ...o.name ? [`    name: ${B(o.name)}`] : []
      ])] : [];
    }
    if (a && typeof a == "object") {
      const l = Object.entries(a).filter((o) => typeof o[1] == "string" && !!o[1].trim()).sort(([o], [c]) => o.localeCompare(c));
      return l.length ? [`${r}:`, ...l.map(([o, c]) => `  ${B(o)}: ${B(c)}`)] : [];
    }
    return [];
  }).join(`
`)}
`;
}
function Tt(n) {
  return (n || "").replace(/[\r\n]+/g, " ").trim();
}
async function Pt(n, e, t, i) {
  const { candidates: s, suggestions: r } = await Oe(n, e, t, i), a = t.fields.flatMap((o) => {
    const c = i[o.key], g = r[o.key], h = typeof c == "string" ? c : typeof g == "string" ? `${g} (suggested)` : "—";
    return [`- ${o.key}: ${h}`];
  }), l = s.slice().sort((o, c) => o.entity_id.localeCompare(c.entity_id)).map((o) => {
    const c = Tt(o.name || o.original_name);
    return `- ${o.entity_id}${c ? ` | ${c}` : ""}`;
  });
  return [
    "Home Connect Card Pack – entity discovery report",
    `Version: ${Be}`,
    `Card: ${t.cardType}`,
    `Anchor: ${e}`,
    "",
    "Role mappings",
    ...a,
    "",
    "Enabled entities found on the same device",
    ...l.length ? l : ["- none"],
    "",
    "Privacy note: No entity states, attributes, device IDs, IP addresses or credentials are included. Entity IDs and names can still contain personal labels; review this report before sharing it.",
    ""
  ].join(`
`);
}
const Nt = [
  { id: "general", label: "General", icon: "mdi:information-outline" },
  { id: "program", label: "Program", icon: "mdi:tune-variant" },
  { id: "actions", label: "Actions", icon: "mdi:gesture-tap-button" },
  { id: "options", label: "Options", icon: "mdi:toggle-switch-outline" },
  { id: "status", label: "Status & care", icon: "mdi:heart-pulse" },
  { id: "settings", label: "Device settings", icon: "mdi:cog-outline" }
];
class F extends _ {
  constructor() {
    super(...arguments), this._discovering = !1, this._copying = "", this._notice = "", this._autoDetectedAnchor = "";
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _discovering: { state: !0 },
      _copying: { state: !0 },
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
    .tool-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
    .tool { min-height: 40px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 10px; border: 1px solid var(--divider-color); border-radius: 10px; color: var(--primary-text-color); background: var(--secondary-background-color); font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }
    .tool:hover { border-color: var(--primary-color); }
    .tool:disabled { opacity: .55; cursor: not-allowed; }
    .tool ha-icon { --mdc-icon-size: 18px; }
    .program-names { border: 1px solid var(--divider-color); border-radius: 11px; background: color-mix(in srgb, var(--secondary-background-color), transparent 35%); }
    .program-names summary { min-height: 42px; display: flex; align-items: center; gap: 8px; padding: 0 11px; color: var(--primary-text-color); font-size: 13px; font-weight: 650; cursor: pointer; }
    .program-names summary ha-icon { --mdc-icon-size: 18px; color: var(--primary-color); }
    .program-names-body { display: grid; gap: 10px; padding: 0 11px 11px; }
    .program-names-help { margin: 0; color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
    .program-rename { display: grid; grid-template-columns: minmax(0, 1fr) minmax(140px, 1fr); align-items: center; gap: 9px; }
    .program-rename code { overflow: hidden; color: var(--secondary-text-color); font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
    .program-rename input { height: 36px; font-size: 12px; }
    .notice { font-size: 12px; color: var(--secondary-text-color); }
    .warning-row { display: grid; gap: 8px; padding: 10px; border: 1px solid var(--divider-color); border-radius: 10px; }
    .loading { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @media (max-width: 480px) { .tool-row, .program-rename { grid-template-columns: 1fr; } .program-rename { gap: 4px; } }
  `;
  }
  setConfig(e) {
    this._config = { ...e };
  }
  updated(e) {
    const t = this._config?.entity;
    t || (this._autoDetectedAnchor = ""), this.hass && t && t !== this._autoDetectedAnchor && (this._autoDetectedAnchor = t, this.autoDetect());
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
      const t = await ft(this.hass, e, this.definition, this._config);
      if (this._config?.entity !== e) return;
      const i = Object.fromEntries(Object.entries(t).filter(([r]) => !this._config?.[r])), s = Object.keys(i).length;
      this.notify({ ...this._config, ...i }), this._notice = s ? `${s} ${d(this.hass, "editor.detected", "matching entities added. Review every suggestion before saving.")}` : d(this.hass, "editor.no_matches", "No additional unambiguous matches were found.");
    } catch (t) {
      this._notice = t instanceof Error ? t.message : "Automatic discovery failed.";
    } finally {
      this._discovering = !1, this._config?.entity && this._config.entity !== e && this.autoDetect();
    }
  }
  async copyYaml() {
    if (!(!this._config || this._copying)) {
      this._copying = "yaml";
      try {
        await Se(zt(this._config, this.definition)), this._notice = d(this.hass, "editor.yaml_copied", "YAML configuration copied to the clipboard.");
      } catch (e) {
        this._notice = e instanceof Error ? e.message : "Could not copy the YAML configuration.";
      } finally {
        this._copying = "";
      }
    }
  }
  async copyDiscoveryReport() {
    if (!(!this.hass || !this._config?.entity || this._copying)) {
      this._copying = "report";
      try {
        const e = await Pt(this.hass, this._config.entity, this.definition, this._config);
        await Se(e), this._notice = d(this.hass, "editor.report_copied", "Entity discovery report copied. Review personal labels before sharing it.");
      } catch (e) {
        this._notice = e instanceof Error ? e.message : "Could not create the entity discovery report.";
      } finally {
        this._copying = "";
      }
    }
  }
  entitySelector(e) {
    const t = e.domains && e.domains.length === 1 ? e.domains[0] : e.domains;
    return { entity: t ? { domain: t } : {} };
  }
  renderEntityField(e) {
    if (!this._config || !this.hass) return u;
    const t = typeof this._config[e.key] == "string" ? this._config[e.key] : "";
    return p`<div class="field"><label>${le(this.hass, e)}</label><ha-selector
      .hass=${this.hass} .selector=${this.entitySelector(e)} .value=${t}
      @value-changed=${(i) => {
      this.change(e.key, i.detail.value), e.key === "entity" && i.detail.value && this.autoDetect();
    }}></ha-selector></div>`;
  }
  renderToggle(e, t, i) {
    if (!this._config) return u;
    const s = typeof this._config[e] == "boolean" ? !!this._config[e] : i;
    return p`<div class="toggle"><label for=${e}>${t}</label><ha-switch id=${e} .checked=${s} @change=${(r) => this.change(e, r.currentTarget.checked)}></ha-switch></div>`;
  }
  availablePrograms() {
    if (!this._config || !this.hass) return [];
    const e = [], t = (l, o = !1) => {
      if (typeof l != "string" || !l.trim() || e.includes(l)) return;
      const c = l.toLowerCase().replace(/[\s_.-]+/g, "");
      !o && (["unknown", "unavailable", "none", "null", "off"].includes(c) || /noprogram|notselected/.test(c)) || e.push(l);
    }, i = this._config.selected_program_entity, s = typeof i == "string" ? this.hass.states[i] : void 0;
    for (const l of s?.attributes.options || []) t(l);
    t(s?.state);
    const r = this._config.active_program_entity, a = typeof r == "string" ? this.hass.states[r] : void 0;
    t(a?.state);
    for (const l of Object.keys(this._config.program_names || {})) t(l, !0);
    return e;
  }
  changeProgramName(e, t) {
    if (!this._config) return;
    const i = { ...this._config }, s = { ...i.program_names || {} }, r = t.trim();
    r ? s[e] = r : delete s[e], Object.keys(s).length ? i.program_names = s : delete i.program_names, this.notify(i);
  }
  renderProgramNames() {
    if (!this._config) return u;
    const e = this.availablePrograms();
    if (!e.length) return u;
    const t = this._config.program_names || {};
    return p`<details class="program-names"><summary><ha-icon icon="mdi:rename-box-outline"></ha-icon>${d(this.hass, "editor.program_names", "Rename programs manually")}</summary><div class="program-names-body">
      <p class="program-names-help">${d(this.hass, "editor.program_names_help", "Optional display names only. The original value is still sent to Home Assistant.")}</p>
      ${e.map((i) => p`<label class="program-rename"><code title=${i}>${i}</code><input type="text" .value=${t[i] || ""} placeholder=${d(this.hass, "editor.custom_program_name", "Custom name")} aria-label=${`${d(this.hass, "editor.custom_program_name", "Custom name")}: ${i}`} @change=${(s) => this.changeProgramName(i, s.currentTarget.value)}></label>`)}
    </div></details>`;
  }
  changeWarning(e, t) {
    if (!this._config) return;
    const i = Array.isArray(this._config.extra_warnings) ? this._config.extra_warnings.slice() : [];
    t ? i[e] = { ...i[e], ...t } : i.splice(e, 1);
    const s = { ...this._config };
    i.length ? s.extra_warnings = i : delete s.extra_warnings, this.notify(s);
  }
  renderExtraWarnings() {
    if (!this._config) return u;
    const e = Array.isArray(this._config.extra_warnings) ? this._config.extra_warnings : [];
    return p`<section class="group"><h3 class="group-title"><ha-icon icon="mdi:alert-outline"></ha-icon>${d(this.hass, "editor.extra_warnings", "Custom warnings")}</h3><div class="fields">
      <p class="intro">${d(this.hass, "editor.extra_warnings_help", "Choose a binary sensor that turns on when attention is needed. Names are optional; inactive and unavailable warnings stay hidden.")}</p>
      ${e.map((t, i) => p`<div class="warning-row">
        <ha-selector .hass=${this.hass} .selector=${{ entity: { domain: "binary_sensor" } }} .value=${t.entity || ""}
          .label=${d(this.hass, "editor.warning_entity", "Warning entity")}
          @value-changed=${(s) => this.changeWarning(i, { entity: s.detail.value || "" })}></ha-selector>
        <input type="text" .value=${t.name || ""} placeholder=${d(this.hass, "editor.warning_name", "Optional warning name")} aria-label=${d(this.hass, "editor.warning_name", "Optional warning name")}
          @change=${(s) => this.changeWarning(i, { name: s.currentTarget.value })}>
        <button type="button" class="tool" @click=${() => this.changeWarning(i)}>${d(this.hass, "editor.remove_warning", "Remove warning")}</button>
      </div>`)}
      <button type="button" class="tool" @click=${() => this.changeWarning(e.length, { entity: "" })}><ha-icon icon="mdi:plus"></ha-icon>${d(this.hass, "editor.add_warning", "Add warning")}</button>
    </div></section>`;
  }
  render() {
    return !this._config || !this.hass ? u : p`<div class="editor">
      <p class="intro">${d(this.hass, "editor.intro", "Choose any entity from the appliance as the anchor. Auto-detection uses Home Assistant's entity/device registry and only fills empty fields; every result remains editable.")}</p>
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:palette-outline"></ha-icon>${d(this.hass, "section.appearance", "Appearance")}</h3><div class="fields">
        <div class="field"><label for="name">${d(this.hass, "editor.name", "Name override")}</label><input id="name" type="text" .value=${this._config.name || ""} placeholder=${this.definition.defaultName} @change=${(e) => this.change("name", e.currentTarget.value)}></div>
        <div class="field"><label for="icon">${d(this.hass, "editor.icon", "Icon override")}</label><input id="icon" type="text" .value=${this._config.icon || ""} placeholder=${this.definition.defaultIcon} @change=${(e) => this.change("icon", e.currentTarget.value)}></div>
        <div class="field"><label for="accent_color">${d(this.hass, "editor.accent_color", "Accent color")}</label><input id="accent_color" type="text" .value=${this._config.accent_color || ""} placeholder=${`${this.definition.accent} / var(--primary-color)`} @change=${(e) => this.change("accent_color", e.currentTarget.value)}></div>
      </div></section>
      ${Nt.map((e) => {
      const t = this.definition.fields.filter((i) => i.section === e.id);
      return t.length ? p`<section class="group"><h3 class="group-title"><ha-icon .icon=${e.icon}></ha-icon>${d(this.hass, `section.${e.id}`, e.label)}</h3><div class="fields">${t.map((i) => this.renderEntityField(i))}
          ${e.id === "program" ? this.renderProgramNames() : ""}
          ${e.id === "general" ? p`
            <button type="button" class="detect" ?disabled=${!this._config?.entity || this._discovering} @click=${this.autoDetect}><ha-icon class=${this._discovering ? "loading" : ""} .icon=${this._discovering ? "mdi:loading" : "mdi:auto-fix"}></ha-icon>${d(this.hass, "editor.detect", "Detect device entities")}</button>
            <div class="tool-row">
              <button type="button" class="tool" ?disabled=${!!this._copying} @click=${this.copyYaml}><ha-icon icon="mdi:content-copy"></ha-icon>${d(this.hass, "editor.copy_yaml", "Copy YAML")}</button>
              <button type="button" class="tool" ?disabled=${!this._config?.entity || !!this._copying} @click=${this.copyDiscoveryReport}><ha-icon class=${this._copying === "report" ? "loading" : ""} .icon=${this._copying === "report" ? "mdi:loading" : "mdi:clipboard-text-search-outline"}></ha-icon>${d(this.hass, "editor.copy_report", "Copy discovery report")}</button>
            </div>
            ${this._notice ? p`<div class="notice" role="status">${this._notice}</div>` : ""}` : ""}
        </div></section>` : u;
    })}
      ${this.renderExtraWarnings()}
      <section class="group"><h3 class="group-title"><ha-icon icon="mdi:eye-outline"></ha-icon>${d(this.hass, "section.layout", "Layout & behavior")}</h3><div class="fields">
        ${this.renderToggle("default_expanded", d(this.hass, "option.default_expanded", "Expanded by default"), !1)}
        ${this.renderToggle("animations", d(this.hass, "option.animations", "Animations"), !0)}
        ${this.renderToggle("confirm_cancel", d(this.hass, "option.confirm_cancel", "Require a second tap to cancel a program"), !0)}
        ${this.renderToggle("show_progress", d(this.hass, "option.show_progress", "Show progress"), !0)}
        ${this.renderToggle("show_remaining_time", d(this.hass, "option.show_remaining_time", "Show remaining time"), !0)}
        ${this.renderToggle("show_warnings_collapsed", d(this.hass, "option.show_warnings_collapsed", "Show warnings while collapsed"), !0)}
        ${this.renderToggle("show_status_section", d(this.hass, "option.show_status_section", "Show status section"), !0)}
        ${this.definition.fields.some((e) => e.section === "options") ? this.renderToggle("show_options_section", d(this.hass, "option.show_options_section", "Show options section"), !0) : u}
        ${this.renderToggle("show_settings_section", d(this.hass, "option.show_settings_section", "Show device settings"), !0)}
      </div></section>
    </div>`;
  }
}
const V = [
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
], P = {
  kind: "dishwasher",
  cardType: "custom:home-connect-dishwasher-card",
  editorTag: "home-connect-dishwasher-card-editor",
  displayName: "Home Connect Dishwasher",
  description: "Compact controls and status for a Home Connect dishwasher.",
  defaultName: "Dishwasher",
  defaultIcon: "mdi:dishwasher",
  accent: "#4f8cff",
  fields: [
    ...V.filter((n) => n.key !== "pause_entity" && n.key !== "resume_entity"),
    { key: "phase_entity", label: "Program phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["program phase", "programmphase"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tur"], warning: !0 },
    { key: "water_entity", label: "Estimated water", section: "status", kind: "status", domains: ["sensor"], aliases: ["water consumption", "wasserverbrauch"] },
    { key: "energy_entity", label: "Estimated energy", section: "status", kind: "status", domains: ["sensor"], aliases: ["energy consumption", "energieverbrauch"] },
    { key: "salt_entity", label: "Salt", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["salt", "salz"], warning: !0 },
    { key: "rinse_aid_entity", label: "Rinse aid", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["rinse aid", "klarspuler"], warning: !0 },
    { key: "vario_speed_entity", label: "VarioSpeed Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["variospeed"] },
    { key: "hygiene_entity", label: "Hygiene Plus", section: "options", kind: "toggle", domains: ["switch"], aliases: ["hygiene plus"] },
    { key: "half_load_entity", label: "Half load", section: "options", kind: "toggle", domains: ["switch"], aliases: ["half load", "halbe ladung"] },
    { key: "silent_entity", label: "Silent", section: "options", kind: "toggle", domains: ["switch"], aliases: ["silent", "leise"] },
    { key: "filter_check_entity", label: "Check filter system", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["filtersystem prufen", "filter system check", "check filter system", "check filter"], warning: !0 },
    { key: "filter_entity", label: "Machine-care filter", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["maschinenreinigung filter", "machine care filter"], warning: !0 },
    { key: "aquastop_entity", label: "AquaStop triggered", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["aquastop aufgetreten", "aquastop triggered", "aquastop occurred", "aquastop"], warning: !0 },
    { key: "care_entity", label: "Machine care", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["machine care", "maschinenreinigung"], warning: !0 },
    { key: "heater_scale_entity", label: "Heater scale warning", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["heater scale", "wasserheizung verkalkt"], warning: !0 }
  ]
}, N = {
  kind: "oven",
  cardType: "custom:home-connect-oven-card",
  editorTag: "home-connect-oven-card-editor",
  displayName: "Home Connect Oven",
  description: "Program, temperature, timer and status controls for a Home Connect oven.",
  defaultName: "Oven",
  defaultIcon: "mdi:stove",
  accent: "#ff8a45",
  fields: [
    ...V,
    { key: "current_temperature_entity", label: "Current temperature", section: "status", kind: "status", domains: ["sensor"], aliases: ["current temperature", "aktuelle temperatur"], prominent: !0 },
    { key: "target_temperature_entity", label: "Target temperature", section: "program", kind: "number", domains: ["number"], aliases: ["target temperature", "sollwert temperatur"] },
    { key: "duration_entity", label: "Duration", section: "program", kind: "number", domains: ["number"], aliases: ["duration", "dauer"] },
    { key: "level_entity", label: "Level", section: "program", kind: "select", domains: ["select"], aliases: ["level", "stufe"] },
    { key: "rapid_preheat_entity", label: "Rapid preheat", section: "options", kind: "toggle", domains: ["switch"], aliases: ["rapid preheat", "schnelles vorheizen"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tur"], warning: !0 },
    { key: "water_tank_entity", label: "Water tank", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["water tank", "wassertank"], warning: !0 },
    { key: "alarm_entity", label: "Timer", section: "settings", kind: "number", domains: ["number"], aliases: ["alarm clock", "timer"] },
    { key: "child_lock_entity", label: "Child lock", section: "settings", kind: "toggle", domains: ["switch", "select"], aliases: ["child lock", "kindersicherung"] },
    { key: "display_brightness_entity", label: "Display brightness", section: "settings", kind: "number", domains: ["number"], aliases: ["display brightness", "display helligkeit"] },
    { key: "key_tones_entity", label: "Key tones", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["key tone", "tastentone"] },
    { key: "cooling_fan_entity", label: "Cooling fan duration", section: "settings", kind: "select", domains: ["select"], aliases: ["cooling fan", "kuhllufter"] },
    { key: "tone_duration_entity", label: "Tone duration", section: "settings", kind: "select", domains: ["select"], aliases: ["tone duration", "tondauer"] }
  ]
}, D = {
  kind: "coffee",
  cardType: "custom:home-connect-coffee-card",
  editorTag: "home-connect-coffee-card-editor",
  displayName: "Home Connect Coffee Machine",
  description: "A drink-first controller for Home Connect coffee machines.",
  defaultName: "Coffee machine",
  defaultIcon: "mdi:coffee-maker",
  accent: "#b9794a",
  fields: [
    ...V.filter((n) => n.key !== "remaining_time_entity"),
    { key: "bean_amount_entity", label: "Bean amount", section: "program", kind: "select", domains: ["select"], aliases: ["bean amount", "bohnenmenge"] },
    { key: "fill_quantity_entity", label: "Fill quantity", section: "program", kind: "number", domains: ["number"], aliases: ["fill quantity", "fullmenge"] },
    { key: "coffee_temperature_entity", label: "Coffee temperature", section: "program", kind: "select", domains: ["select"], aliases: ["coffee temperature", "kaffeetemperatur"] },
    { key: "milk_ratio_entity", label: "Coffee / milk ratio", section: "program", kind: "select", domains: ["select"], aliases: ["coffee milk ratio", "kaffee milch verhaltnis"] },
    { key: "bean_container_entity", label: "Bean container", section: "program", kind: "select", domains: ["select"], aliases: ["bean container", "bohnenbehalter"] },
    { key: "water_temperature_entity", label: "Water temperature", section: "program", kind: "select", domains: ["select"], aliases: ["hot water temperature", "wassertemperatur"] },
    { key: "flow_rate_entity", label: "Flow rate", section: "program", kind: "select", domains: ["select"], aliases: ["flow rate", "durchflussmenge"] },
    { key: "multiple_beverages_entity", label: "Multiple beverages", section: "program", kind: "toggle", domains: ["switch"], aliases: ["multiple beverages", "multiple beverage", "mehrere getranke", "mehrere getränke"] },
    { key: "water_tank_entity", label: "Water tank", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["water tank", "wassertank"], warning: !0 },
    { key: "beans_empty_entity", label: "Beans empty", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["beans empty", "bohnenbehalter leer"], warning: !0 },
    { key: "drip_tray_entity", label: "Drip tray", section: "status", kind: "status", domains: ["sensor", "binary_sensor"], aliases: ["drip tray", "auffangschale"], warning: !0 },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tur"], warning: !0 },
    { key: "cup_warmer_entity", label: "Cup warmer", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["cup warmer", "tassenwarmer"] },
    { key: "child_lock_entity", label: "Child lock", section: "settings", kind: "toggle", domains: ["switch"], aliases: ["child lock", "kindersicherung"] }
  ]
}, I = {
  kind: "dryer",
  cardType: "custom:home-connect-dryer-card",
  editorTag: "home-connect-dryer-card-editor",
  displayName: "Home Connect Dryer",
  description: "Program, options, lighting and maintenance for a Home Connect dryer.",
  defaultName: "Dryer",
  defaultIcon: "mdi:tumble-dryer",
  accent: "#8c70e8",
  fields: [
    ...V,
    { key: "phase_entity", label: "Process phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["process phase", "prozessphase"] },
    { key: "finish_at_entity", label: "Finish at", section: "status", kind: "status", domains: ["sensor"], aliases: ["finish at", "finish in", "fertig in"] },
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
}, M = {
  kind: "washer",
  cardType: "custom:home-connect-washer-card",
  editorTag: "home-connect-washer-card-editor",
  displayName: "Home Connect Washer",
  description: "Compact controls and status for a Home Connect washer.",
  defaultName: "Washer",
  defaultIcon: "mdi:washing-machine",
  accent: "#58a6ff",
  fields: [
    ...V,
    { key: "phase_entity", label: "Process phase", section: "status", kind: "status", domains: ["sensor"], aliases: ["process phase", "programmphase", "prozessphase", "phase"] },
    { key: "door_entity", label: "Door", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["door", "tür"], warning: !0 },
    { key: "washing_temperature_entity", label: "Washing temperature", section: "program", kind: "select", domains: ["select"], aliases: ["washing temperature", "waschtemperatur", "temperature", "temperatur", "wastemperatuur"] },
    { key: "spin_speed_entity", label: "Spin speed", section: "program", kind: "select", domains: ["select", "sensor"], aliases: ["spin speed", "drehzahl", "spin speed level"] },
    { key: "finish_at_entity", label: "Finish in", section: "status", kind: "status", domains: ["sensor"], aliases: ["finish at", "finish in", "fertig in"] },
    { key: "drum_clean_reminder_entity", label: "Drum clean reminder", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["drum clean reminder", "trommel reinigen"], warning: !0 },
    { key: "i_dos_1_fill_level_entity", label: "i-Dos 1 low", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["poor i dos 1 fill level", "poor idos1 fill level", "idos1 fill level poor", "i dos 1 fill level", "idos1 fill level", "i dos 1 fullstand"], warning: !0, warningStates: ["on", "true", "1", "present", "confirmed", "poor", "low", "empty"] },
    { key: "i_dos_2_fill_level_entity", label: "i-Dos 2 low", section: "status", kind: "status", domains: ["binary_sensor", "sensor"], aliases: ["poor i dos 2 fill level", "poor idos2 fill level", "idos2 fill level poor", "i dos 2 fill level", "idos2 fill level", "i dos 2 fullstand"], warning: !0, warningStates: ["on", "true", "1", "present", "confirmed", "poor", "low", "empty"] },
    { key: "prewash_entity", label: "Prewash", section: "options", kind: "toggle", domains: ["switch"], aliases: ["prewash", "vorwäsche"] },
    { key: "less_ironing_entity", label: "Less ironing", section: "options", kind: "toggle", domains: ["switch"], aliases: ["less ironing", "weniger bügeln"] },
    { key: "drum_light_entity", label: "Drum light", section: "options", kind: "light", domains: ["light", "switch"], aliases: ["drum light", "trommellicht"] }
  ]
};
function f(n, e) {
  customElements.get(n) || customElements.define(n, e);
}
class Dt extends F {
  constructor() {
    super(...arguments), this.definition = P;
  }
}
f(P.editorTag, Dt);
class It extends F {
  constructor() {
    super(...arguments), this.definition = N;
  }
}
f(N.editorTag, It);
class Mt extends F {
  constructor() {
    super(...arguments), this.definition = D;
  }
}
f(D.editorTag, Mt);
class Ot extends F {
  constructor() {
    super(...arguments), this.definition = I;
  }
}
f(I.editorTag, Ot);
class Ht extends F {
  constructor() {
    super(...arguments), this.definition = M;
  }
}
f(M.editorTag, Ht);
const Bt = { ATTRIBUTE: 1 }, Wt = (n) => (...e) => ({ _$litDirective$: n, values: e });
let Rt = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const Re = "important", jt = " !" + Re, je = Wt(class extends Rt {
  constructor(n) {
    if (super(n), n.type !== Bt.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return Object.keys(n).reduce((e, t) => {
      const i = n[t];
      return i == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(n, [e]) {
    const { style: t } = n.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const i of this.ft) e[i] == null && (this.ft.delete(i), i.includes("-") ? t.removeProperty(i) : t[i] = null);
    for (const i in e) {
      const s = e[i];
      if (s != null) {
        this.ft.add(i);
        const r = typeof s == "string" && s.endsWith(jt);
        i.includes("-") || r ? t.setProperty(i, r ? s.slice(0, -11) : s, r ? Re : "") : t[i] = s;
      }
    }
    return z;
  }
}), Lt = w`
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
    align-items: center; gap: 12px; padding: 13px 14px; color: inherit; background: transparent;
  }
  .summary-button { min-width: 0; padding: 0; border: 0; color: inherit; background: transparent; font: inherit; cursor: pointer; }
  .header-button { display: block; width: 100%; text-align: left; border-radius: 12px; }
  .summary-toggle { display: flex; align-items: center; justify-content: flex-end; gap: 10px; max-width: min(48vw, 420px); border-radius: 999px; }
  .header-button:disabled { cursor: default; }
  .summary.has-progress { min-height: 88px; padding-bottom: 24px; }
  .summary-progress { position: absolute; left: 14px; right: 14px; bottom: 10px; height: 5px; overflow: hidden; border-radius: 999px; background: color-mix(in srgb, var(--secondary-background-color), var(--divider-color) 18%); box-shadow: inset 0 1px 1px #0001; }
  .summary-progress-fill { width: 100%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, color-mix(in srgb, var(--hc-accent), white 12%), var(--hc-accent)); box-shadow: 0 0 8px color-mix(in srgb, var(--hc-accent), transparent 58%); transform-origin: left; transition: transform 420ms cubic-bezier(.2,.8,.2,1); }
  .summary-button:focus-visible, button:focus-visible, select:focus-visible, input:focus-visible {
    outline: 2px solid var(--hc-accent); outline-offset: -2px;
  }
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
  .warning-strip { display: flex; flex-wrap: wrap; gap: 6px; padding-bottom: 1px; }
  .shell > .warning-strip { padding: 0 14px 12px; }
  .warning-strip::-webkit-scrollbar { display: none; }
  .action-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .primary-actions { padding-top: 2px; }
  .error {
    margin: 0 14px 14px; padding: 9px 9px 9px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px; border-radius: 10px;
    color: var(--error-color); background: color-mix(in srgb, var(--error-color), transparent 88%); font-size: 13px;
  }
  .error button { width: 30px; height: 30px; flex: none; display: grid; place-items: center; padding: 0; border: 0; border-radius: 9px; color: inherit; background: transparent; cursor: pointer; }
  .error button:hover { background: color-mix(in srgb, var(--error-color), transparent 84%); }
  .error ha-icon { --mdc-icon-size: 18px; }
  .mode-unavailable ha-card { border-color: color-mix(in srgb, var(--error-color), transparent 55%); }
  @container (max-width: 520px) {
    .summary { min-height: 70px; grid-template-columns: minmax(0, 1fr) auto; padding: 11px 12px; }
    .summary.has-progress { min-height: 84px; padding-bottom: 23px; }
    .summary-progress { left: 12px; right: 12px; bottom: 9px; }
    .summary-toggle { max-width: none; }
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
function Ut(n, e, t) {
  const i = e[t];
  return n && typeof i == "string" ? n.states[i] : void 0;
}
function Ft(n) {
  const e = /* @__PURE__ */ new Set();
  for (const t of ce(n)) e.add(t.entity);
  for (const [t, i] of Object.entries(n))
    (t === "entity" || t.endsWith("_entity")) && typeof i == "string" && i.includes(".") && e.add(i);
  return [...e];
}
function Vt(n, e, t) {
  return n === e ? !1 : !n || !e || n.language !== e.language || n.locale?.language !== e.locale?.language ? !0 : t.some((i) => n.states[i] !== e.states[i]);
}
async function Kt(n, e) {
  const t = e.entity_id.split(".")[0];
  if (t === "select" || t === "input_select") {
    const i = e.attributes.options || [], s = (o) => o.toLowerCase().split(/[.:/]/).filter(Boolean).pop()?.replace(/[\s_-]/g, "") || "", r = i.find((o) => ["on", "ein", "active"].includes(s(o))), a = i.find((o) => ["off", "aus", "inactive", "standby"].includes(s(o))), l = ["on", "ein", "active"].includes(A(e)) ? a : r;
    if (!l) throw new Error("This select has no recognizable on/off options.");
    await n.callService(t, "select_option", { entity_id: e.entity_id, option: l });
    return;
  }
  if (!["switch", "light", "input_boolean"].includes(t)) throw new Error("The configured entity is not a switch or light.");
  await n.callService(t, e.state === "on" ? "turn_off" : "turn_on", { entity_id: e.entity_id });
}
async function Gt(n, e) {
  const t = e.entity_id.split(".")[0];
  if (t !== "button" && t !== "input_button") throw new Error("The configured action is not a button entity.");
  await n.callService(t, "press", { entity_id: e.entity_id });
}
async function qt(n, e, t) {
  const i = e.entity_id.split(".")[0];
  if (i !== "select" && i !== "input_select") throw new Error("The configured entity is not a select.");
  await n.callService(i, "select_option", { entity_id: e.entity_id, option: t });
}
async function Yt(n, e, t) {
  const i = e.entity_id.split(".")[0];
  if (i !== "number" && i !== "input_number") throw new Error("The configured entity is not a number.");
  if (!Number.isFinite(t)) throw new Error("The configured value is not a finite number.");
  await n.callService(i, "set_value", { entity_id: e.entity_id, value: t });
}
function Le(n, e) {
  n.dispatchEvent(new CustomEvent("hass-action", {
    detail: {
      config: { entity: e, tap_action: { action: "more-info" } },
      action: "tap"
    },
    bubbles: !0,
    composed: !0
  }));
}
function ie(n, e) {
  return e?.[n]?.trim() || void 0;
}
function ze(n, e, t) {
  return ie(e.state, t) || k(n, e);
}
class Zt extends _ {
  constructor() {
    super(...arguments), this.name = "Appliance", this.icon = "mdi:devices", this.status = "Unknown", this.program = "", this.mode = "idle", this.accent = "var(--primary-color)", this.busy = !1, this.animations = !0;
  }
  static {
    this.properties = {
      name: {},
      icon: {},
      status: {},
      program: {},
      mode: {},
      accent: {},
      busy: { type: Boolean },
      animations: { type: Boolean }
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
    .running.animated .icon ha-icon { animation: breathe 2.4s ease-in-out infinite; }
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
    @media (prefers-reduced-motion: reduce) { .running.animated .icon ha-icon { animation: none; } }
  `;
  }
  render() {
    return p`<div class="header ${this.mode} ${this.animations ? "animated" : ""}" style=${je({ "--hc-accent": this.accent })}>
      <div class="icon"><ha-icon .icon=${this.icon}></ha-icon></div>
      <div class="copy">
        <div class="name">${this.name}</div>
        <div class="sub"><span class="dot"></span><span class="status">${this.busy ? "Working…" : this.status}</span>${this.program ? p`<span class="program">${this.program}</span>` : ""}</div>
      </div>
    </div>`;
  }
}
f("hc-appliance-header", Zt);
class Jt extends _ {
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
    return p`<div class=${this.animated ? "" : "static"} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(e)}>
      <div class="top"><span>${this.label}</span><span class="value">${Math.round(e)}%</span></div>
      <div class="track"><div class="fill" style=${`transform:scaleX(${e / 100})`}></div></div>
    </div>`;
  }
}
f("hc-progress-display", Jt);
class Xt extends _ {
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
    return p`<span class="chip ${this.warning ? "warning" : ""}" title=${`${this.label}${this.value ? `: ${this.value}` : ""}`}>${this.icon ? p`<ha-icon .icon=${this.icon}></ha-icon>` : ""}<span>${this.label}${this.value ? p` <b>${this.value}</b>` : ""}</span></span>`;
  }
}
f("hc-status-chip", Xt);
class Qt extends _ {
  constructor() {
    super(...arguments), this.valueLabels = {}, this.label = "", this.kind = "status", this.disabled = !1, this.busy = !1;
  }
  static {
    this.properties = { hass: { attribute: !1 }, entity: { attribute: !1 }, valueLabels: { attribute: !1 }, label: {}, kind: {}, disabled: { type: Boolean }, busy: { type: Boolean } };
  }
  static {
    this.styles = w`
    :host { display: block; min-width: 0; }
    .control { min-height: 48px; display: grid; gap: 6px; }
    .line { min-height: 45px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .label { min-width: 0; color: var(--secondary-text-color); font-size: 12px; font-weight: 520; }
    .value { padding: 4px 0; color: var(--primary-text-color); font-size: 13px; font-weight: 600; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .status-line { width: 100%; padding: 0; border: 0; color: inherit; background: transparent; text-align: left; font: inherit; cursor: pointer; }
    .status-line:hover .value { color: var(--hc-accent); }
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
      const s = kt(this.entity);
      return p`<div class="line ${e ? "unavailable" : ""}"><span class="label">${this.label}</span><button class="switch ${s ? "on" : ""}" type="button" role="switch" aria-checked=${String(s)} aria-label=${this.label} ?disabled=${t} @click=${() => this.emit("toggle")}></button></div>`;
    }
    if (this.kind === "select") {
      const s = this.entity.attributes.options || [], r = s.includes(this.entity.state) || e ? s : [this.entity.state, ...s];
      return p`<div class="line ${e ? "unavailable" : ""}"><label class="label" for="select">${this.label}</label><select id="select" ?disabled=${t} @change=${(a) => this.emit("select", a.target.value)}>${r.map((a) => p`<option .value=${a} ?selected=${a === this.entity?.state}>${ie(a, this.valueLabels) || xt(this.hass, this.entity, a)}</option>`)}</select></div>`;
    }
    if (this.kind === "number") {
      const s = We(this.entity) ?? Number(this.entity.attributes.min ?? 0), r = Number(this.entity.attributes.min ?? 0), a = Number(this.entity.attributes.max ?? 100), l = Number(this.entity.attributes.step ?? 1);
      return p`<div class="control ${e ? "unavailable" : ""}"><div class="number-head"><label class="label" for="range">${this.label}</label><span class="number-value">${k(this.hass, this.entity)}</span></div><input id="range" type="range" min=${r} max=${a} step=${l} .value=${String(s)} ?disabled=${t} @change=${(o) => this.emit("number", Number(o.target.value))}></div>`;
    }
    const i = ie(this.entity.state, this.valueLabels) || k(this.hass, this.entity);
    return p`<button type="button" class="line status-line ${e ? "unavailable" : ""}" @click=${() => Le(this, this.entity.entity_id)} aria-label=${`${this.label}: ${i}`}><span class="label">${this.label}</span><span class="value">${i}</span></button>`;
  }
}
f("hc-entity-control", Qt);
class ei extends _ {
  constructor() {
    super(...arguments), this.title = "Section", this.icon = "mdi:tune-variant", this.open = !1;
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
    return p`<button type="button" @click=${() => this.open = !this.open} aria-expanded=${String(this.open)}><ha-icon .icon=${this.icon}></ha-icon><span class="title">${this.title}</span><ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon></button><div class="body" ?inert=${!this.open}><div class="clip"><div class="content"><slot></slot></div></div></div>`;
  }
}
f("hc-expandable-section", ei);
class ti extends _ {
  constructor() {
    super(...arguments), this.actions = [], this.busyIds = /* @__PURE__ */ new Set(), this.confirmingId = "";
  }
  static {
    this.properties = { actions: { attribute: !1 }, busyIds: { attribute: !1 }, confirmingId: {} };
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
    button.confirming { color: var(--text-primary-color, white); border-color: var(--error-color); background: var(--error-color); box-shadow: 0 5px 14px color-mix(in srgb, var(--error-color), transparent 72%); }
    button:disabled { opacity: .5; cursor: not-allowed; }
    ha-icon { --mdc-icon-size: 17px; }
    .busy ha-icon { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
  }
  render() {
    return p`<div class="row">${this.actions.map((e) => {
      const t = this.busyIds.has(e.entityId), i = this.confirmingId === e.entityId;
      return p`<button type="button" class="${e.primary ? "primary" : ""} ${e.danger ? "danger" : ""} ${i ? "confirming" : ""} ${t ? "busy" : ""}" ?disabled=${e.disabled || t} @click=${() => this.dispatchEvent(new CustomEvent("hc-action", { detail: e, bubbles: !0, composed: !0 }))}><ha-icon .icon=${t ? "mdi:loading" : i ? "mdi:alert-circle-outline" : e.icon}></ha-icon><span>${i && e.confirmLabel || e.label}</span></button>`;
    })}</div>`;
  }
}
f("hc-action-buttons", ti);
const ii = {
  program: { title: "Program", icon: "mdi:tune-variant" },
  options: { title: "Options", icon: "mdi:toggle-switch-outline" },
  status: { title: "Status & care", icon: "mdi:information-outline" },
  settings: { title: "Device settings", icon: "mdi:cog-outline" }
};
class K extends _ {
  constructor() {
    super(...arguments), this._expanded = !1, this._busyIds = /* @__PURE__ */ new Set(), this._error = "", this._confirmingId = "", this._expandedByUser = !1;
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _expanded: { state: !0 },
      _busyIds: { state: !0 },
      _error: { state: !0 },
      _confirmingId: { state: !0 }
    };
  }
  static {
    this.styles = [Lt, w`
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
  getGridOptions() {
    return { columns: 6, min_columns: 3 };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearConfirmation();
  }
  shouldUpdate(e) {
    return e.size > 1 || !e.has("hass") || !this._config ? !0 : Vt(e.get("hass"), this.hass, Ft(this._config));
  }
  getState(e) {
    return this._config && Ut(this.hass, this._config, e);
  }
  toggleExpanded() {
    this._expandedByUser = !0, this._expanded = !this._expanded;
  }
  infoEntityId() {
    if (this._config)
      for (const e of ["entity", "operating_state_entity", "status_entity", "power_state_entity", "power_entity"]) {
        const t = this._config[e];
        if (typeof t == "string" && t.includes(".")) return t;
      }
  }
  showMoreInfo() {
    const e = this.infoEntityId();
    e && Le(this, e);
  }
  clearConfirmation() {
    this._confirmationTimer !== void 0 && window.clearTimeout(this._confirmationTimer), this._confirmationTimer = void 0, this._confirmingId = "";
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
    const { entity: t, action: i, value: s } = e.detail;
    this.withBusy(t, async () => {
      this.hass && (i === "toggle" && await Kt(this.hass, t), i === "select" && typeof s == "string" && await qt(this.hass, t, s), i === "number" && typeof s == "number" && await Yt(this.hass, t, s));
    });
  }
  handleAction(e) {
    const t = e.detail;
    if (t.danger && this._config?.confirm_cancel !== !1 && this._confirmingId !== t.entityId) {
      this.clearConfirmation(), this._confirmingId = t.entityId, this._confirmationTimer = window.setTimeout(() => this.clearConfirmation(), 5e3);
      return;
    }
    this.clearConfirmation();
    const i = this.hass?.states[t.entityId];
    i && this.withBusy(i, () => Gt(this.hass, i));
  }
  renderPower(e) {
    const t = this.getState("power_entity") || this.getState("power_state_entity");
    if (!t) return u;
    const i = t.entity_id.split(".")[0], s = i === "select" || i === "input_select" ? "select" : i === "light" ? "light" : i === "switch" || i === "input_boolean" ? "toggle" : "status";
    return p`<div class="power-row"><hc-entity-control .hass=${this.hass} .entity=${t} .label=${d(this.hass, "power", "Power")} .kind=${s} .busy=${this._busyIds.has(t.entity_id)} .disabled=${e}></hc-entity-control></div>`;
  }
  renderActions(e) {
    if (!this._config || !this.hass || e === "off" || e === "unavailable") return u;
    const i = (e === "paused" ? [["resume_entity", d(this.hass, "action.resume", "Resume"), "mdi:play", !0, !1], ["cancel_entity", d(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : e === "running" ? [["pause_entity", d(this.hass, "action.pause", "Pause"), "mdi:pause", !1, !1], ["cancel_entity", d(this.hass, "action.cancel", "Cancel"), "mdi:stop", !1, !0]] : [["start_entity", d(this.hass, "action.start", "Start"), "mdi:play", !0, !1]]).flatMap(([s, r, a, l, o]) => {
      if (!this.definition.fields.some((m) => m.key === s)) return [];
      const c = this._config?.[s], g = typeof c == "string" ? this.hass?.states[c] : void 0, h = g?.entity_id.split(".")[0];
      return g ? [{ key: s, label: r, confirmLabel: o ? d(this.hass, "action.confirm_cancel", "Confirm cancel") : void 0, icon: a, entityId: c, primary: l, danger: o, disabled: g.state === "unavailable" || h !== "button" && h !== "input_button" }] : [];
    });
    return i.length ? p`<div class="primary-actions"><hc-action-buttons .actions=${i} .busyIds=${this._busyIds} .confirmingId=${this._confirmingId}></hc-action-buttons></div>` : u;
  }
  renderSection(e, t) {
    if (!this._config || e === "options" && this._config.show_options_section === !1 || e === "status" && this._config.show_status_section === !1 || e === "settings" && this._config.show_settings_section === !1) return u;
    const i = this.configuredFields(e);
    if (!i.length) return u;
    const s = ii[e];
    return p`<hc-expandable-section .title=${d(this.hass, `section.${e}`, s.title)} .icon=${s.icon} .open=${!1}>
      <div class="section-grid ${e === "program" ? "program-grid" : ""}">${i.map(({ field: r, entity: a }) => p`
        <div class="entity-slot"><hc-entity-control .hass=${this.hass} .entity=${a} .label=${le(this.hass, r)} .kind=${this.controlKind(r, a)}
          .valueLabels=${r.key === "selected_program_entity" || r.key === "active_program_entity" ? this._config?.program_names || {} : {}}
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
    const e = this.getState("operating_state_entity") || this.getState("status_entity") || this.getState("power_state_entity") || this.getState("power_entity") || this.getState("entity"), t = this.getState("power_entity") || this.getState("power_state_entity"), i = this.getState("active_program_entity"), s = this.getState("selected_program_entity"), r = $t(this.getState("progress_entity")), a = (this.supportsField("remaining_time_entity") ? this.getState("remaining_time_entity") : void 0) || (this.supportsField("finish_at_entity") ? this.getState("finish_at_entity") : void 0), l = Et(t, e), o = St(l), c = o ? i || s : s || i, g = l === "off" ? void 0 : c, h = o ? r : void 0, m = o ? a : void 0, b = l === "off" && t ? t : e, x = this._config.animations !== !1, de = Ct(this.hass, this._config, this.definition), he = de.length ? p`<div class="warning-strip" role="status" aria-label=${d(this.hass, "warnings", "Warnings")}>${de.map(({ label: v, value: Ke }) => p`<hc-status-chip .label=${v} .value=${Ke} warning icon="mdi:alert-outline"></hc-status-chip>`)}</div>` : u, ue = this._config.show_warnings_collapsed !== !1, Ue = this.definition.fields.filter((v) => v.prominent).map((v) => ({ field: v, entity: this.getState(v.key) })).filter(({ entity: v }) => y(v)), J = l === "running" || l === "paused", Fe = this.infoEntityId(), pe = At(this._config.accent_color, this.definition.accent), ge = this._config.program_names, Ve = l !== "off" && (y(c) || y(m) || h !== void 0);
    return p`<ha-card style=${je({ "--hc-accent": pe })} @hc-control=${this.handleControl} @hc-action=${this.handleAction}>
      <div class="shell mode-${l} ${this._expanded ? "expanded" : ""} ${x ? "" : "no-animation"} ${l === "unavailable" ? "unavailable" : ""}">
        <div class="summary ${h !== void 0 && this._config.show_progress !== !1 ? "has-progress" : ""}">
          <button class="summary-button header-button" type="button" ?disabled=${!Fe} @click=${this.showMoreInfo} title=${d(this.hass, "action.more_info", "More information")} aria-label=${d(this.hass, "action.more_info", "More information")}>
            <hc-appliance-header .name=${this._config.name || d(this.hass, `device.${this.definition.kind}`, this.definition.defaultName)} .icon=${this._config.icon || this.definition.defaultIcon}
              .status=${k(this.hass, b)} .program=${y(g) ? ze(this.hass, g, ge) : ""} .mode=${l} .accent=${pe} .animations=${x}></hc-appliance-header>
          </button>
          <button class="summary-button summary-toggle" type="button" @click=${this.toggleExpanded} aria-expanded=${String(this._expanded)} aria-label=${d(this.hass, "action.toggle_details", "Toggle details")}><div class="metrics">
            ${Ue.map(({ entity: v }) => p`<span class="metric">${k(this.hass, v)}</span>`)}
            ${h !== void 0 && this._config.show_progress !== !1 ? p`<span class="metric progress">${Math.round(h)}%</span>` : ""}
            ${y(m) && this._config.show_remaining_time !== !1 ? p`<span class="metric">${k(this.hass, m)}</span>` : ""}
          </div><ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon></button>
          ${h !== void 0 && this._config.show_progress !== !1 ? p`<div class="summary-progress" aria-hidden="true"><div class="summary-progress-fill" style=${`transform:scaleX(${h / 100})`}></div></div>` : ""}
        </div>
        ${ue ? he : u}
        <div class="details" ?inert=${!this._expanded}><div class="details-inner"><div class="details-content">
          ${ue ? u : he}
          ${this.renderPower(!1)}
          ${Ve ? p`<div class="activity"><div class="activity-top"><div class="activity-copy"><div class="activity-label">${l === "running" ? d(this.hass, "running", "Now running") : l === "paused" ? d(this.hass, "paused", "Paused") : d(this.hass, "ready", "Ready")}</div><div class="activity-program">${y(c) ? ze(this.hass, c, ge) : d(this.hass, "appliance_status", "Appliance status")}</div></div>${y(m) && this._config.show_remaining_time !== !1 ? p`<div class="activity-time">${k(this.hass, m)}</div>` : ""}</div>${h !== void 0 && this._config.show_progress !== !1 ? p`<hc-progress-display .value=${h} .label=${d(this.hass, "progress", "Program progress")} .animated=${x}></hc-progress-display>` : ""}</div>` : ""}
          ${this.renderActions(l)}
          ${l !== "off" ? this.renderSection("program", J) : u}
          ${l !== "off" ? this.renderSection("options", J) : u}
          ${this.renderSection("status", !1)}
          ${l !== "off" ? this.renderSection("settings", J) : u}
        </div></div></div>
        ${this._error ? p`<div class="error" role="alert"><span>${this._error}</span><button type="button" @click=${() => {
      this._error = "";
    }} aria-label=${d(this.hass, "action.dismiss", "Dismiss")} title=${d(this.hass, "action.dismiss", "Dismiss")}><ha-icon icon="mdi:close"></ha-icon></button></div>` : ""}
      </div>
    </ha-card>`;
  }
}
class ni extends K {
  constructor() {
    super(...arguments), this.definition = P;
  }
  static getConfigElement() {
    return document.createElement(P.editorTag);
  }
  static getStubConfig() {
    return { name: P.defaultName };
  }
}
f("home-connect-dishwasher-card", ni);
class si extends K {
  constructor() {
    super(...arguments), this.definition = N;
  }
  static getConfigElement() {
    return document.createElement(N.editorTag);
  }
  static getStubConfig() {
    return { name: N.defaultName };
  }
}
f("home-connect-oven-card", si);
class ri extends K {
  constructor() {
    super(...arguments), this.definition = D;
  }
  static getConfigElement() {
    return document.createElement(D.editorTag);
  }
  static getStubConfig() {
    return { name: D.defaultName };
  }
}
f("home-connect-coffee-card", ri);
class ai extends K {
  constructor() {
    super(...arguments), this.definition = I;
  }
  static getConfigElement() {
    return document.createElement(I.editorTag);
  }
  static getStubConfig() {
    return { name: I.defaultName };
  }
}
f("home-connect-dryer-card", ai);
class oi extends K {
  constructor() {
    super(...arguments), this.definition = M;
  }
  static getConfigElement() {
    return document.createElement(M.editorTag);
  }
  static getStubConfig() {
    return { name: M.defaultName };
  }
}
f("home-connect-washer-card", oi);
const li = {
  dishwasher: ["dishwasher", "dish care", "dishcare", "geschirrspuler", "spulmaschine"],
  oven: ["oven", "backofen", "herd"],
  coffee: ["coffee maker", "coffeemaker", "coffee machine", "kaffeemaschine", "kaffeevollautomat", "espresso"],
  dryer: ["dryer", "tumble dryer", "tumbledryer", "trockner", "waschetrockner"],
  washer: ["washer", "washing machine", "washingmachine", "waschmaschine", "wasmachine"]
};
function ee(n) {
  return n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function ci(n, e, t) {
  const i = n.states[e];
  if (!i) return !1;
  const s = ee([
    e,
    i.attributes.friendly_name,
    i.attributes.device_class,
    i.attributes.icon
  ].filter(Boolean).join(" "));
  return li[t].some((r) => t === "washer" ? ` ${s} `.includes(` ${ee(r)} `) : s.includes(ee(r)));
}
const di = [P, N, D, I, M];
window.customCards = window.customCards || [];
for (const n of di)
  window.customCards.some((e) => e.type === n.cardType.replace("custom:", "")) || window.customCards.push({
    type: n.cardType.replace("custom:", ""),
    name: n.displayName,
    description: n.description,
    preview: !0,
    documentationURL: "https://github.com/leMax6608/home-connect-card-pack#readme",
    getEntitySuggestion: (e, t) => ci(e, t, n.kind) ? { config: { type: n.cardType, entity: t } } : null
  });
console.info(`%c HOME-CONNECT-CARD-PACK %c v${Be} `, "color:white;background:#445b78;font-weight:700", "color:#445b78;background:#eef2f7");
//# sourceMappingURL=home-connect-card-pack.js.map
