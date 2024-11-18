(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
(() => {
  function t(t2) {
    return function(t3) {
      if (Array.isArray(t3))
        return e(t3);
    }(t2) || function(t3) {
      if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
        return Array.from(t3);
    }(t2) || function(t3, n2) {
      if (!t3)
        return;
      if ("string" == typeof t3)
        return e(t3, n2);
      var r2 = Object.prototype.toString.call(t3).slice(8, -1);
      "Object" === r2 && t3.constructor && (r2 = t3.constructor.name);
      if ("Map" === r2 || "Set" === r2)
        return Array.from(t3);
      if ("Arguments" === r2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r2))
        return e(t3, n2);
    }(t2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function e(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var n2 = 0, r2 = new Array(e2); n2 < e2; n2++)
      r2[n2] = t2[n2];
    return r2;
  }
  function n(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function r(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? n(Object(r2), true).forEach(function(e3) {
        i(t2, e3, r2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(r2)) : n(Object(r2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(r2, e3));
      });
    }
    return t2;
  }
  function i(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function o(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function a(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var s = { alwaysOpen: false, activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white", inactiveClasses: "text-gray-500 dark:text-gray-400", onOpen: function() {
  }, onClose: function() {
  }, onToggle: function() {
  } }, c = function() {
    function e2() {
      var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      o(this, e2), this._items = t2, this._options = r(r({}, s), n3), this._init();
    }
    var n2, i2;
    return n2 = e2, (i2 = [{ key: "_init", value: function() {
      var t2 = this;
      this._items.length && this._items.map(function(e3) {
        e3.active && t2.open(e3.id), e3.triggerEl.addEventListener("click", function() {
          t2.toggle(e3.id);
        });
      });
    } }, { key: "getItem", value: function(t2) {
      return this._items.filter(function(e3) {
        return e3.id === t2;
      })[0];
    } }, { key: "open", value: function(e3) {
      var n3, r2, i3 = this, o2 = this.getItem(e3);
      this._options.alwaysOpen || this._items.map(function(e4) {
        var n4, r3;
        e4 !== o2 && ((n4 = e4.triggerEl.classList).remove.apply(n4, t(i3._options.activeClasses.split(" "))), (r3 = e4.triggerEl.classList).add.apply(r3, t(i3._options.inactiveClasses.split(" "))), e4.targetEl.classList.add("hidden"), e4.triggerEl.setAttribute("aria-expanded", false), e4.active = false, e4.iconEl && e4.iconEl.classList.remove("rotate-180"));
      }), (n3 = o2.triggerEl.classList).add.apply(n3, t(this._options.activeClasses.split(" "))), (r2 = o2.triggerEl.classList).remove.apply(r2, t(this._options.inactiveClasses.split(" "))), o2.triggerEl.setAttribute("aria-expanded", true), o2.targetEl.classList.remove("hidden"), o2.active = true, o2.iconEl && o2.iconEl.classList.add("rotate-180"), this._options.onOpen(this, o2);
    } }, { key: "toggle", value: function(t2) {
      var e3 = this.getItem(t2);
      e3.active ? this.close(t2) : this.open(t2), this._options.onToggle(this, e3);
    } }, { key: "close", value: function(e3) {
      var n3, r2, i3 = this.getItem(e3);
      (n3 = i3.triggerEl.classList).remove.apply(n3, t(this._options.activeClasses.split(" "))), (r2 = i3.triggerEl.classList).add.apply(r2, t(this._options.inactiveClasses.split(" "))), i3.targetEl.classList.add("hidden"), i3.triggerEl.setAttribute("aria-expanded", false), i3.active = false, i3.iconEl && i3.iconEl.classList.remove("rotate-180"), this._options.onClose(this, i3);
    } }]) && a(n2.prototype, i2), Object.defineProperty(n2, "prototype", { writable: false }), e2;
  }();
  function l() {
    document.querySelectorAll("[data-accordion]").forEach(function(t2) {
      var e2 = t2.getAttribute("data-accordion"), n2 = t2.getAttribute("data-active-classes"), r2 = t2.getAttribute("data-inactive-classes"), i2 = [];
      t2.querySelectorAll("[data-accordion-target]").forEach(function(t3) {
        var e3 = { id: t3.getAttribute("data-accordion-target"), triggerEl: t3, targetEl: document.querySelector(t3.getAttribute("data-accordion-target")), iconEl: t3.querySelector("[data-accordion-icon]"), active: "true" === t3.getAttribute("aria-expanded") };
        i2.push(e3);
      }), new c(i2, { alwaysOpen: "open" === e2, activeClasses: n2 || s.activeClasses, inactiveClasses: r2 || s.inactiveClasses });
    });
  }
  window.Accordion = c, "loading" !== document.readyState ? l() : document.addEventListener("DOMContentLoaded", l);
  function u(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function f(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? u(Object(n2), true).forEach(function(e3) {
        d(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : u(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function d(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function p(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function h(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var g = { triggerEl: null, onCollapse: function() {
  }, onExpand: function() {
  }, onToggle: function() {
  } }, v = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n3 = arguments.length > 1 ? arguments[1] : void 0;
      p(this, t2), this._targetEl = e3, this._triggerEl = n3 ? n3.triggerEl : g.triggerEl, this._options = f(f({}, g), n3), this._visible = false, this._init();
    }
    var e2, n2;
    return e2 = t2, (n2 = [{ key: "_init", value: function() {
      var t3 = this;
      this._triggerEl && (this._triggerEl.hasAttribute("aria-expanded") ? this._visible = "true" === this._triggerEl.getAttribute("aria-expanded") : this._visible = !this._targetEl.classList.contains("hidden"), this._triggerEl.addEventListener("click", function() {
        t3._visible ? t3.collapse() : t3.expand();
      }));
    } }, { key: "collapse", value: function() {
      this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = false, this._options.onCollapse(this);
    } }, { key: "expand", value: function() {
      this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = true, this._options.onExpand(this);
    } }, { key: "toggle", value: function() {
      this._visible ? this.collapse() : this.expand();
    } }]) && h(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  function b() {
    document.querySelectorAll("[data-collapse-toggle]").forEach(function(t2) {
      var e2 = document.getElementById(t2.getAttribute("data-collapse-toggle"));
      new v(e2, { triggerEl: t2 });
    });
  }
  window.Collapse = v, "loading" !== document.readyState ? b() : document.addEventListener("DOMContentLoaded", b);
  function m(t2) {
    return function(t3) {
      if (Array.isArray(t3))
        return y(t3);
    }(t2) || function(t3) {
      if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
        return Array.from(t3);
    }(t2) || function(t3, e2) {
      if (!t3)
        return;
      if ("string" == typeof t3)
        return y(t3, e2);
      var n2 = Object.prototype.toString.call(t3).slice(8, -1);
      "Object" === n2 && t3.constructor && (n2 = t3.constructor.name);
      if ("Map" === n2 || "Set" === n2)
        return Array.from(t3);
      if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
        return y(t3, e2);
    }(t2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function y(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var n2 = 0, r2 = new Array(e2); n2 < e2; n2++)
      r2[n2] = t2[n2];
    return r2;
  }
  function w(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function _(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? w(Object(n2), true).forEach(function(e3) {
        O(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : w(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function O(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function E(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function j(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var k = { defaultPosition: 0, indicators: { items: [], activeClasses: "bg-white dark:bg-gray-800", inactiveClasses: "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" }, interval: 3e3, onNext: function() {
  }, onPrev: function() {
  }, onChange: function() {
  } }, A = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      E(this, t2), this._items = e3, this._options = _(_(_({}, k), n3), {}, { indicators: _(_({}, k.indicators), n3.indicators) }), this._activeItem = this.getItem(this._options.defaultPosition), this._indicators = this._options.indicators.items, this._interval = null, this._init();
    }
    var e2, n2;
    return e2 = t2, (n2 = [{ key: "_init", value: function() {
      var t3 = this;
      this._items.map(function(t4) {
        t4.el.classList.add("absolute", "inset-0", "transition-all", "transform");
      }), this._getActiveItem() ? this.slideTo(this._getActiveItem().position) : this.slideTo(0), this._indicators.map(function(e3, n3) {
        e3.el.addEventListener("click", function() {
          t3.slideTo(n3);
        });
      });
    } }, { key: "getItem", value: function(t3) {
      return this._items[t3];
    } }, { key: "slideTo", value: function(t3) {
      var e3 = this._items[t3], n3 = { left: 0 === e3.position ? this._items[this._items.length - 1] : this._items[e3.position - 1], middle: e3, right: e3.position === this._items.length - 1 ? this._items[0] : this._items[e3.position + 1] };
      this._rotate(n3), this._setActiveItem(e3.position), this._interval && (this.pause(), this.cycle()), this._options.onChange(this);
    } }, { key: "next", value: function() {
      var t3 = this._getActiveItem(), e3 = null;
      e3 = t3.position === this._items.length - 1 ? this._items[0] : this._items[t3.position + 1], this.slideTo(e3.position), this._options.onNext(this);
    } }, { key: "prev", value: function() {
      var t3 = this._getActiveItem(), e3 = null;
      e3 = 0 === t3.position ? this._items[this._items.length - 1] : this._items[t3.position - 1], this.slideTo(e3.position), this._options.onPrev(this);
    } }, { key: "_rotate", value: function(t3) {
      this._items.map(function(t4) {
        t4.el.classList.add("hidden");
      }), t3.left.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), t3.left.el.classList.add("-translate-x-full", "z-10"), t3.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10"), t3.middle.el.classList.add("translate-x-0", "z-20"), t3.right.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), t3.right.el.classList.add("translate-x-full", "z-10");
    } }, { key: "cycle", value: function() {
      var t3 = this;
      this._interval = setInterval(function() {
        t3.next();
      }, this._options.interval);
    } }, { key: "pause", value: function() {
      clearInterval(this._interval);
    } }, { key: "_getActiveItem", value: function() {
      return this._activeItem;
    } }, { key: "_setActiveItem", value: function(t3) {
      var e3, n3, r2 = this;
      this._activeItem = this._items[t3], this._indicators.length && (this._indicators.map(function(t4) {
        var e4, n4;
        t4.el.setAttribute("aria-current", "false"), (e4 = t4.el.classList).remove.apply(e4, m(r2._options.indicators.activeClasses.split(" "))), (n4 = t4.el.classList).add.apply(n4, m(r2._options.indicators.inactiveClasses.split(" ")));
      }), (e3 = this._indicators[t3].el.classList).add.apply(e3, m(this._options.indicators.activeClasses.split(" "))), (n3 = this._indicators[t3].el.classList).remove.apply(n3, m(this._options.indicators.inactiveClasses.split(" "))), this._indicators[t3].el.setAttribute("aria-current", "true"));
    } }]) && j(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  function P() {
    document.querySelectorAll("[data-carousel]").forEach(function(t2) {
      var e2 = t2.getAttribute("data-carousel-interval"), n2 = "slide" === t2.getAttribute("data-carousel"), r2 = [], i2 = 0;
      t2.querySelectorAll("[data-carousel-item]").length && m(t2.querySelectorAll("[data-carousel-item]")).map(function(t3, e3) {
        r2.push({ position: e3, el: t3 }), "active" === t3.getAttribute("data-carousel-item") && (i2 = e3);
      });
      var o2 = [];
      t2.querySelectorAll("[data-carousel-slide-to]").length && m(t2.querySelectorAll("[data-carousel-slide-to]")).map(function(t3) {
        o2.push({ position: t3.getAttribute("data-carousel-slide-to"), el: t3 });
      });
      var a2 = new A(r2, { defaultPosition: i2, indicators: { items: o2 }, interval: e2 || k.interval });
      n2 && a2.cycle();
      var s2 = t2.querySelector("[data-carousel-next]"), c2 = t2.querySelector("[data-carousel-prev]");
      s2 && s2.addEventListener("click", function() {
        a2.next();
      }), c2 && c2.addEventListener("click", function() {
        a2.prev();
      });
    });
  }
  window.Carousel = A, "loading" !== document.readyState ? P() : document.addEventListener("DOMContentLoaded", P);
  function x(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function L(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? x(Object(n2), true).forEach(function(e3) {
        S(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : x(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function S(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function C(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function D(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var T = { triggerEl: null, transition: "transition-opacity", duration: 300, timing: "ease-out", onHide: function() {
  } }, I = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      C(this, t2), this._targetEl = e3, this._triggerEl = n3 ? n3.triggerEl : T.triggerEl, this._options = L(L({}, T), n3), this._init();
    }
    var e2, n2;
    return e2 = t2, (n2 = [{ key: "_init", value: function() {
      var t3 = this;
      this._triggerEl && this._triggerEl.addEventListener("click", function() {
        t3.hide();
      });
    } }, { key: "hide", value: function() {
      var t3 = this;
      this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, "opacity-0"), setTimeout(function() {
        t3._targetEl.classList.add("hidden");
      }, this._options.duration), this._options.onHide(this, this._targetEl);
    } }]) && D(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  function q() {
    document.querySelectorAll("[data-dismiss-target]").forEach(function(t2) {
      var e2 = document.querySelector(t2.getAttribute("data-dismiss-target"));
      new I(e2, { triggerEl: t2 });
    });
  }
  window.Dismiss = I, "loading" !== document.readyState ? q() : document.addEventListener("DOMContentLoaded", q);
  function M(t2) {
    if (null == t2)
      return window;
    if ("[object Window]" !== t2.toString()) {
      var e2 = t2.ownerDocument;
      return e2 && e2.defaultView || window;
    }
    return t2;
  }
  function H(t2) {
    return t2 instanceof M(t2).Element || t2 instanceof Element;
  }
  function B(t2) {
    return t2 instanceof M(t2).HTMLElement || t2 instanceof HTMLElement;
  }
  function W(t2) {
    return "undefined" != typeof ShadowRoot && (t2 instanceof M(t2).ShadowRoot || t2 instanceof ShadowRoot);
  }
  var R = Math.max, V = Math.min, U = Math.round;
  function z(t2, e2) {
    void 0 === e2 && (e2 = false);
    var n2 = t2.getBoundingClientRect(), r2 = 1, i2 = 1;
    if (B(t2) && e2) {
      var o2 = t2.offsetHeight, a2 = t2.offsetWidth;
      a2 > 0 && (r2 = U(n2.width) / a2 || 1), o2 > 0 && (i2 = U(n2.height) / o2 || 1);
    }
    return { width: n2.width / r2, height: n2.height / i2, top: n2.top / i2, right: n2.right / r2, bottom: n2.bottom / i2, left: n2.left / r2, x: n2.left / r2, y: n2.top / i2 };
  }
  function N(t2) {
    var e2 = M(t2);
    return { scrollLeft: e2.pageXOffset, scrollTop: e2.pageYOffset };
  }
  function $(t2) {
    return t2 ? (t2.nodeName || "").toLowerCase() : null;
  }
  function F(t2) {
    return ((H(t2) ? t2.ownerDocument : t2.document) || window.document).documentElement;
  }
  function X(t2) {
    return z(F(t2)).left + N(t2).scrollLeft;
  }
  function Y(t2) {
    return M(t2).getComputedStyle(t2);
  }
  function G(t2) {
    var e2 = Y(t2), n2 = e2.overflow, r2 = e2.overflowX, i2 = e2.overflowY;
    return /auto|scroll|overlay|hidden/.test(n2 + i2 + r2);
  }
  function J(t2, e2, n2) {
    void 0 === n2 && (n2 = false);
    var r2, i2, o2 = B(e2), a2 = B(e2) && function(t3) {
      var e3 = t3.getBoundingClientRect(), n3 = U(e3.width) / t3.offsetWidth || 1, r3 = U(e3.height) / t3.offsetHeight || 1;
      return 1 !== n3 || 1 !== r3;
    }(e2), s2 = F(e2), c2 = z(t2, a2), l2 = { scrollLeft: 0, scrollTop: 0 }, u2 = { x: 0, y: 0 };
    return (o2 || !o2 && !n2) && (("body" !== $(e2) || G(s2)) && (l2 = (r2 = e2) !== M(r2) && B(r2) ? { scrollLeft: (i2 = r2).scrollLeft, scrollTop: i2.scrollTop } : N(r2)), B(e2) ? ((u2 = z(e2, true)).x += e2.clientLeft, u2.y += e2.clientTop) : s2 && (u2.x = X(s2))), { x: c2.left + l2.scrollLeft - u2.x, y: c2.top + l2.scrollTop - u2.y, width: c2.width, height: c2.height };
  }
  function K(t2) {
    var e2 = z(t2), n2 = t2.offsetWidth, r2 = t2.offsetHeight;
    return Math.abs(e2.width - n2) <= 1 && (n2 = e2.width), Math.abs(e2.height - r2) <= 1 && (r2 = e2.height), { x: t2.offsetLeft, y: t2.offsetTop, width: n2, height: r2 };
  }
  function Q(t2) {
    return "html" === $(t2) ? t2 : t2.assignedSlot || t2.parentNode || (W(t2) ? t2.host : null) || F(t2);
  }
  function Z(t2) {
    return ["html", "body", "#document"].indexOf($(t2)) >= 0 ? t2.ownerDocument.body : B(t2) && G(t2) ? t2 : Z(Q(t2));
  }
  function tt(t2, e2) {
    var n2;
    void 0 === e2 && (e2 = []);
    var r2 = Z(t2), i2 = r2 === (null == (n2 = t2.ownerDocument) ? void 0 : n2.body), o2 = M(r2), a2 = i2 ? [o2].concat(o2.visualViewport || [], G(r2) ? r2 : []) : r2, s2 = e2.concat(a2);
    return i2 ? s2 : s2.concat(tt(Q(a2)));
  }
  function et(t2) {
    return ["table", "td", "th"].indexOf($(t2)) >= 0;
  }
  function nt(t2) {
    return B(t2) && "fixed" !== Y(t2).position ? t2.offsetParent : null;
  }
  function rt(t2) {
    for (var e2 = M(t2), n2 = nt(t2); n2 && et(n2) && "static" === Y(n2).position; )
      n2 = nt(n2);
    return n2 && ("html" === $(n2) || "body" === $(n2) && "static" === Y(n2).position) ? e2 : n2 || function(t3) {
      var e3 = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
      if (-1 !== navigator.userAgent.indexOf("Trident") && B(t3) && "fixed" === Y(t3).position)
        return null;
      for (var n3 = Q(t3); B(n3) && ["html", "body"].indexOf($(n3)) < 0; ) {
        var r2 = Y(n3);
        if ("none" !== r2.transform || "none" !== r2.perspective || "paint" === r2.contain || -1 !== ["transform", "perspective"].indexOf(r2.willChange) || e3 && "filter" === r2.willChange || e3 && r2.filter && "none" !== r2.filter)
          return n3;
        n3 = n3.parentNode;
      }
      return null;
    }(t2) || e2;
  }
  var it = "top", ot = "bottom", at = "right", st = "left", ct = "auto", lt = [it, ot, at, st], ut = "start", ft = "end", dt = "viewport", pt = "popper", ht = lt.reduce(function(t2, e2) {
    return t2.concat([e2 + "-" + ut, e2 + "-" + ft]);
  }, []), gt = [].concat(lt, [ct]).reduce(function(t2, e2) {
    return t2.concat([e2, e2 + "-" + ut, e2 + "-" + ft]);
  }, []), vt = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];
  function bt(t2) {
    var e2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Set(), r2 = [];
    function i2(t3) {
      n2.add(t3.name), [].concat(t3.requires || [], t3.requiresIfExists || []).forEach(function(t4) {
        if (!n2.has(t4)) {
          var r3 = e2.get(t4);
          r3 && i2(r3);
        }
      }), r2.push(t3);
    }
    return t2.forEach(function(t3) {
      e2.set(t3.name, t3);
    }), t2.forEach(function(t3) {
      n2.has(t3.name) || i2(t3);
    }), r2;
  }
  var mt = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function yt() {
    for (var t2 = arguments.length, e2 = new Array(t2), n2 = 0; n2 < t2; n2++)
      e2[n2] = arguments[n2];
    return !e2.some(function(t3) {
      return !(t3 && "function" == typeof t3.getBoundingClientRect);
    });
  }
  function wt(t2) {
    void 0 === t2 && (t2 = {});
    var e2 = t2, n2 = e2.defaultModifiers, r2 = void 0 === n2 ? [] : n2, i2 = e2.defaultOptions, o2 = void 0 === i2 ? mt : i2;
    return function(t3, e3, n3) {
      void 0 === n3 && (n3 = o2);
      var i3, a2, s2 = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, mt, o2), modifiersData: {}, elements: { reference: t3, popper: e3 }, attributes: {}, styles: {} }, c2 = [], l2 = false, u2 = { state: s2, setOptions: function(n4) {
        var i4 = "function" == typeof n4 ? n4(s2.options) : n4;
        f2(), s2.options = Object.assign({}, o2, s2.options, i4), s2.scrollParents = { reference: H(t3) ? tt(t3) : t3.contextElement ? tt(t3.contextElement) : [], popper: tt(e3) };
        var a3 = function(t4) {
          var e4 = bt(t4);
          return vt.reduce(function(t5, n5) {
            return t5.concat(e4.filter(function(t6) {
              return t6.phase === n5;
            }));
          }, []);
        }(function(t4) {
          var e4 = t4.reduce(function(t5, e5) {
            var n5 = t5[e5.name];
            return t5[e5.name] = n5 ? Object.assign({}, n5, e5, { options: Object.assign({}, n5.options, e5.options), data: Object.assign({}, n5.data, e5.data) }) : e5, t5;
          }, {});
          return Object.keys(e4).map(function(t5) {
            return e4[t5];
          });
        }([].concat(r2, s2.options.modifiers)));
        return s2.orderedModifiers = a3.filter(function(t4) {
          return t4.enabled;
        }), s2.orderedModifiers.forEach(function(t4) {
          var e4 = t4.name, n5 = t4.options, r3 = void 0 === n5 ? {} : n5, i5 = t4.effect;
          if ("function" == typeof i5) {
            var o3 = i5({ state: s2, name: e4, instance: u2, options: r3 }), a4 = function() {
            };
            c2.push(o3 || a4);
          }
        }), u2.update();
      }, forceUpdate: function() {
        if (!l2) {
          var t4 = s2.elements, e4 = t4.reference, n4 = t4.popper;
          if (yt(e4, n4)) {
            s2.rects = { reference: J(e4, rt(n4), "fixed" === s2.options.strategy), popper: K(n4) }, s2.reset = false, s2.placement = s2.options.placement, s2.orderedModifiers.forEach(function(t5) {
              return s2.modifiersData[t5.name] = Object.assign({}, t5.data);
            });
            for (var r3 = 0; r3 < s2.orderedModifiers.length; r3++)
              if (true !== s2.reset) {
                var i4 = s2.orderedModifiers[r3], o3 = i4.fn, a3 = i4.options, c3 = void 0 === a3 ? {} : a3, f3 = i4.name;
                "function" == typeof o3 && (s2 = o3({ state: s2, options: c3, name: f3, instance: u2 }) || s2);
              } else
                s2.reset = false, r3 = -1;
          }
        }
      }, update: (i3 = function() {
        return new Promise(function(t4) {
          u2.forceUpdate(), t4(s2);
        });
      }, function() {
        return a2 || (a2 = new Promise(function(t4) {
          Promise.resolve().then(function() {
            a2 = void 0, t4(i3());
          });
        })), a2;
      }), destroy: function() {
        f2(), l2 = true;
      } };
      if (!yt(t3, e3))
        return u2;
      function f2() {
        c2.forEach(function(t4) {
          return t4();
        }), c2 = [];
      }
      return u2.setOptions(n3).then(function(t4) {
        !l2 && n3.onFirstUpdate && n3.onFirstUpdate(t4);
      }), u2;
    };
  }
  var _t = { passive: true };
  function Ot(t2) {
    return t2.split("-")[0];
  }
  function Et(t2) {
    return t2.split("-")[1];
  }
  function jt(t2) {
    return ["top", "bottom"].indexOf(t2) >= 0 ? "x" : "y";
  }
  function kt(t2) {
    var e2, n2 = t2.reference, r2 = t2.element, i2 = t2.placement, o2 = i2 ? Ot(i2) : null, a2 = i2 ? Et(i2) : null, s2 = n2.x + n2.width / 2 - r2.width / 2, c2 = n2.y + n2.height / 2 - r2.height / 2;
    switch (o2) {
      case it:
        e2 = { x: s2, y: n2.y - r2.height };
        break;
      case ot:
        e2 = { x: s2, y: n2.y + n2.height };
        break;
      case at:
        e2 = { x: n2.x + n2.width, y: c2 };
        break;
      case st:
        e2 = { x: n2.x - r2.width, y: c2 };
        break;
      default:
        e2 = { x: n2.x, y: n2.y };
    }
    var l2 = o2 ? jt(o2) : null;
    if (null != l2) {
      var u2 = "y" === l2 ? "height" : "width";
      switch (a2) {
        case ut:
          e2[l2] = e2[l2] - (n2[u2] / 2 - r2[u2] / 2);
          break;
        case ft:
          e2[l2] = e2[l2] + (n2[u2] / 2 - r2[u2] / 2);
      }
    }
    return e2;
  }
  var At = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Pt(t2) {
    var e2, n2 = t2.popper, r2 = t2.popperRect, i2 = t2.placement, o2 = t2.variation, a2 = t2.offsets, s2 = t2.position, c2 = t2.gpuAcceleration, l2 = t2.adaptive, u2 = t2.roundOffsets, f2 = t2.isFixed, d2 = a2.x, p2 = void 0 === d2 ? 0 : d2, h2 = a2.y, g2 = void 0 === h2 ? 0 : h2, v2 = "function" == typeof u2 ? u2({ x: p2, y: g2 }) : { x: p2, y: g2 };
    p2 = v2.x, g2 = v2.y;
    var b2 = a2.hasOwnProperty("x"), m2 = a2.hasOwnProperty("y"), y2 = st, w2 = it, _2 = window;
    if (l2) {
      var O2 = rt(n2), E2 = "clientHeight", j2 = "clientWidth";
      if (O2 === M(n2) && "static" !== Y(O2 = F(n2)).position && "absolute" === s2 && (E2 = "scrollHeight", j2 = "scrollWidth"), i2 === it || (i2 === st || i2 === at) && o2 === ft)
        w2 = ot, g2 -= (f2 && _2.visualViewport ? _2.visualViewport.height : O2[E2]) - r2.height, g2 *= c2 ? 1 : -1;
      if (i2 === st || (i2 === it || i2 === ot) && o2 === ft)
        y2 = at, p2 -= (f2 && _2.visualViewport ? _2.visualViewport.width : O2[j2]) - r2.width, p2 *= c2 ? 1 : -1;
    }
    var k2, A2 = Object.assign({ position: s2 }, l2 && At), P2 = true === u2 ? function(t3) {
      var e3 = t3.x, n3 = t3.y, r3 = window.devicePixelRatio || 1;
      return { x: U(e3 * r3) / r3 || 0, y: U(n3 * r3) / r3 || 0 };
    }({ x: p2, y: g2 }) : { x: p2, y: g2 };
    return p2 = P2.x, g2 = P2.y, c2 ? Object.assign({}, A2, ((k2 = {})[w2] = m2 ? "0" : "", k2[y2] = b2 ? "0" : "", k2.transform = (_2.devicePixelRatio || 1) <= 1 ? "translate(" + p2 + "px, " + g2 + "px)" : "translate3d(" + p2 + "px, " + g2 + "px, 0)", k2)) : Object.assign({}, A2, ((e2 = {})[w2] = m2 ? g2 + "px" : "", e2[y2] = b2 ? p2 + "px" : "", e2.transform = "", e2));
  }
  const xt = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: function(t2) {
    var e2 = t2.state, n2 = t2.options, r2 = t2.name, i2 = n2.offset, o2 = void 0 === i2 ? [0, 0] : i2, a2 = gt.reduce(function(t3, n3) {
      return t3[n3] = function(t4, e3, n4) {
        var r3 = Ot(t4), i3 = [st, it].indexOf(r3) >= 0 ? -1 : 1, o3 = "function" == typeof n4 ? n4(Object.assign({}, e3, { placement: t4 })) : n4, a3 = o3[0], s3 = o3[1];
        return a3 = a3 || 0, s3 = (s3 || 0) * i3, [st, at].indexOf(r3) >= 0 ? { x: s3, y: a3 } : { x: a3, y: s3 };
      }(n3, e2.rects, o2), t3;
    }, {}), s2 = a2[e2.placement], c2 = s2.x, l2 = s2.y;
    null != e2.modifiersData.popperOffsets && (e2.modifiersData.popperOffsets.x += c2, e2.modifiersData.popperOffsets.y += l2), e2.modifiersData[r2] = a2;
  } };
  var Lt = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function St(t2) {
    return t2.replace(/left|right|bottom|top/g, function(t3) {
      return Lt[t3];
    });
  }
  var Ct = { start: "end", end: "start" };
  function Dt(t2) {
    return t2.replace(/start|end/g, function(t3) {
      return Ct[t3];
    });
  }
  function Tt(t2, e2) {
    var n2 = e2.getRootNode && e2.getRootNode();
    if (t2.contains(e2))
      return true;
    if (n2 && W(n2)) {
      var r2 = e2;
      do {
        if (r2 && t2.isSameNode(r2))
          return true;
        r2 = r2.parentNode || r2.host;
      } while (r2);
    }
    return false;
  }
  function It(t2) {
    return Object.assign({}, t2, { left: t2.x, top: t2.y, right: t2.x + t2.width, bottom: t2.y + t2.height });
  }
  function qt(t2, e2) {
    return e2 === dt ? It(function(t3) {
      var e3 = M(t3), n2 = F(t3), r2 = e3.visualViewport, i2 = n2.clientWidth, o2 = n2.clientHeight, a2 = 0, s2 = 0;
      return r2 && (i2 = r2.width, o2 = r2.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a2 = r2.offsetLeft, s2 = r2.offsetTop)), { width: i2, height: o2, x: a2 + X(t3), y: s2 };
    }(t2)) : H(e2) ? function(t3) {
      var e3 = z(t3);
      return e3.top = e3.top + t3.clientTop, e3.left = e3.left + t3.clientLeft, e3.bottom = e3.top + t3.clientHeight, e3.right = e3.left + t3.clientWidth, e3.width = t3.clientWidth, e3.height = t3.clientHeight, e3.x = e3.left, e3.y = e3.top, e3;
    }(e2) : It(function(t3) {
      var e3, n2 = F(t3), r2 = N(t3), i2 = null == (e3 = t3.ownerDocument) ? void 0 : e3.body, o2 = R(n2.scrollWidth, n2.clientWidth, i2 ? i2.scrollWidth : 0, i2 ? i2.clientWidth : 0), a2 = R(n2.scrollHeight, n2.clientHeight, i2 ? i2.scrollHeight : 0, i2 ? i2.clientHeight : 0), s2 = -r2.scrollLeft + X(t3), c2 = -r2.scrollTop;
      return "rtl" === Y(i2 || n2).direction && (s2 += R(n2.clientWidth, i2 ? i2.clientWidth : 0) - o2), { width: o2, height: a2, x: s2, y: c2 };
    }(F(t2)));
  }
  function Mt(t2, e2, n2) {
    var r2 = "clippingParents" === e2 ? function(t3) {
      var e3 = tt(Q(t3)), n3 = ["absolute", "fixed"].indexOf(Y(t3).position) >= 0 && B(t3) ? rt(t3) : t3;
      return H(n3) ? e3.filter(function(t4) {
        return H(t4) && Tt(t4, n3) && "body" !== $(t4);
      }) : [];
    }(t2) : [].concat(e2), i2 = [].concat(r2, [n2]), o2 = i2[0], a2 = i2.reduce(function(e3, n3) {
      var r3 = qt(t2, n3);
      return e3.top = R(r3.top, e3.top), e3.right = V(r3.right, e3.right), e3.bottom = V(r3.bottom, e3.bottom), e3.left = R(r3.left, e3.left), e3;
    }, qt(t2, o2));
    return a2.width = a2.right - a2.left, a2.height = a2.bottom - a2.top, a2.x = a2.left, a2.y = a2.top, a2;
  }
  function Ht(t2) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t2);
  }
  function Bt(t2, e2) {
    return e2.reduce(function(e3, n2) {
      return e3[n2] = t2, e3;
    }, {});
  }
  function Wt(t2, e2) {
    void 0 === e2 && (e2 = {});
    var n2 = e2, r2 = n2.placement, i2 = void 0 === r2 ? t2.placement : r2, o2 = n2.boundary, a2 = void 0 === o2 ? "clippingParents" : o2, s2 = n2.rootBoundary, c2 = void 0 === s2 ? dt : s2, l2 = n2.elementContext, u2 = void 0 === l2 ? pt : l2, f2 = n2.altBoundary, d2 = void 0 !== f2 && f2, p2 = n2.padding, h2 = void 0 === p2 ? 0 : p2, g2 = Ht("number" != typeof h2 ? h2 : Bt(h2, lt)), v2 = u2 === pt ? "reference" : pt, b2 = t2.rects.popper, m2 = t2.elements[d2 ? v2 : u2], y2 = Mt(H(m2) ? m2 : m2.contextElement || F(t2.elements.popper), a2, c2), w2 = z(t2.elements.reference), _2 = kt({ reference: w2, element: b2, strategy: "absolute", placement: i2 }), O2 = It(Object.assign({}, b2, _2)), E2 = u2 === pt ? O2 : w2, j2 = { top: y2.top - E2.top + g2.top, bottom: E2.bottom - y2.bottom + g2.bottom, left: y2.left - E2.left + g2.left, right: E2.right - y2.right + g2.right }, k2 = t2.modifiersData.offset;
    if (u2 === pt && k2) {
      var A2 = k2[i2];
      Object.keys(j2).forEach(function(t3) {
        var e3 = [at, ot].indexOf(t3) >= 0 ? 1 : -1, n3 = [it, ot].indexOf(t3) >= 0 ? "y" : "x";
        j2[t3] += A2[n3] * e3;
      });
    }
    return j2;
  }
  function Rt(t2, e2, n2) {
    return R(t2, V(e2, n2));
  }
  const Vt = { name: "preventOverflow", enabled: true, phase: "main", fn: function(t2) {
    var e2 = t2.state, n2 = t2.options, r2 = t2.name, i2 = n2.mainAxis, o2 = void 0 === i2 || i2, a2 = n2.altAxis, s2 = void 0 !== a2 && a2, c2 = n2.boundary, l2 = n2.rootBoundary, u2 = n2.altBoundary, f2 = n2.padding, d2 = n2.tether, p2 = void 0 === d2 || d2, h2 = n2.tetherOffset, g2 = void 0 === h2 ? 0 : h2, v2 = Wt(e2, { boundary: c2, rootBoundary: l2, padding: f2, altBoundary: u2 }), b2 = Ot(e2.placement), m2 = Et(e2.placement), y2 = !m2, w2 = jt(b2), _2 = "x" === w2 ? "y" : "x", O2 = e2.modifiersData.popperOffsets, E2 = e2.rects.reference, j2 = e2.rects.popper, k2 = "function" == typeof g2 ? g2(Object.assign({}, e2.rects, { placement: e2.placement })) : g2, A2 = "number" == typeof k2 ? { mainAxis: k2, altAxis: k2 } : Object.assign({ mainAxis: 0, altAxis: 0 }, k2), P2 = e2.modifiersData.offset ? e2.modifiersData.offset[e2.placement] : null, x2 = { x: 0, y: 0 };
    if (O2) {
      if (o2) {
        var L2, S2 = "y" === w2 ? it : st, C2 = "y" === w2 ? ot : at, D2 = "y" === w2 ? "height" : "width", T2 = O2[w2], I2 = T2 + v2[S2], q2 = T2 - v2[C2], M2 = p2 ? -j2[D2] / 2 : 0, H2 = m2 === ut ? E2[D2] : j2[D2], B2 = m2 === ut ? -j2[D2] : -E2[D2], W2 = e2.elements.arrow, U2 = p2 && W2 ? K(W2) : { width: 0, height: 0 }, z2 = e2.modifiersData["arrow#persistent"] ? e2.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 }, N2 = z2[S2], $2 = z2[C2], F2 = Rt(0, E2[D2], U2[D2]), X2 = y2 ? E2[D2] / 2 - M2 - F2 - N2 - A2.mainAxis : H2 - F2 - N2 - A2.mainAxis, Y2 = y2 ? -E2[D2] / 2 + M2 + F2 + $2 + A2.mainAxis : B2 + F2 + $2 + A2.mainAxis, G2 = e2.elements.arrow && rt(e2.elements.arrow), J2 = G2 ? "y" === w2 ? G2.clientTop || 0 : G2.clientLeft || 0 : 0, Q2 = null != (L2 = null == P2 ? void 0 : P2[w2]) ? L2 : 0, Z2 = T2 + Y2 - Q2, tt2 = Rt(p2 ? V(I2, T2 + X2 - Q2 - J2) : I2, T2, p2 ? R(q2, Z2) : q2);
        O2[w2] = tt2, x2[w2] = tt2 - T2;
      }
      if (s2) {
        var et2, nt2 = "x" === w2 ? it : st, ct2 = "x" === w2 ? ot : at, lt2 = O2[_2], ft2 = "y" === _2 ? "height" : "width", dt2 = lt2 + v2[nt2], pt2 = lt2 - v2[ct2], ht2 = -1 !== [it, st].indexOf(b2), gt2 = null != (et2 = null == P2 ? void 0 : P2[_2]) ? et2 : 0, vt2 = ht2 ? dt2 : lt2 - E2[ft2] - j2[ft2] - gt2 + A2.altAxis, bt2 = ht2 ? lt2 + E2[ft2] + j2[ft2] - gt2 - A2.altAxis : pt2, mt2 = p2 && ht2 ? function(t3, e3, n3) {
          var r3 = Rt(t3, e3, n3);
          return r3 > n3 ? n3 : r3;
        }(vt2, lt2, bt2) : Rt(p2 ? vt2 : dt2, lt2, p2 ? bt2 : pt2);
        O2[_2] = mt2, x2[_2] = mt2 - lt2;
      }
      e2.modifiersData[r2] = x2;
    }
  }, requiresIfExists: ["offset"] };
  const Ut = { name: "arrow", enabled: true, phase: "main", fn: function(t2) {
    var e2, n2 = t2.state, r2 = t2.name, i2 = t2.options, o2 = n2.elements.arrow, a2 = n2.modifiersData.popperOffsets, s2 = Ot(n2.placement), c2 = jt(s2), l2 = [st, at].indexOf(s2) >= 0 ? "height" : "width";
    if (o2 && a2) {
      var u2 = function(t3, e3) {
        return Ht("number" != typeof (t3 = "function" == typeof t3 ? t3(Object.assign({}, e3.rects, { placement: e3.placement })) : t3) ? t3 : Bt(t3, lt));
      }(i2.padding, n2), f2 = K(o2), d2 = "y" === c2 ? it : st, p2 = "y" === c2 ? ot : at, h2 = n2.rects.reference[l2] + n2.rects.reference[c2] - a2[c2] - n2.rects.popper[l2], g2 = a2[c2] - n2.rects.reference[c2], v2 = rt(o2), b2 = v2 ? "y" === c2 ? v2.clientHeight || 0 : v2.clientWidth || 0 : 0, m2 = h2 / 2 - g2 / 2, y2 = u2[d2], w2 = b2 - f2[l2] - u2[p2], _2 = b2 / 2 - f2[l2] / 2 + m2, O2 = Rt(y2, _2, w2), E2 = c2;
      n2.modifiersData[r2] = ((e2 = {})[E2] = O2, e2.centerOffset = O2 - _2, e2);
    }
  }, effect: function(t2) {
    var e2 = t2.state, n2 = t2.options.element, r2 = void 0 === n2 ? "[data-popper-arrow]" : n2;
    null != r2 && ("string" != typeof r2 || (r2 = e2.elements.popper.querySelector(r2))) && Tt(e2.elements.popper, r2) && (e2.elements.arrow = r2);
  }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
  function zt(t2, e2, n2) {
    return void 0 === n2 && (n2 = { x: 0, y: 0 }), { top: t2.top - e2.height - n2.y, right: t2.right - e2.width + n2.x, bottom: t2.bottom - e2.height + n2.y, left: t2.left - e2.width - n2.x };
  }
  function Nt(t2) {
    return [it, at, ot, st].some(function(e2) {
      return t2[e2] >= 0;
    });
  }
  var $t = wt({ defaultModifiers: [{ name: "eventListeners", enabled: true, phase: "write", fn: function() {
  }, effect: function(t2) {
    var e2 = t2.state, n2 = t2.instance, r2 = t2.options, i2 = r2.scroll, o2 = void 0 === i2 || i2, a2 = r2.resize, s2 = void 0 === a2 || a2, c2 = M(e2.elements.popper), l2 = [].concat(e2.scrollParents.reference, e2.scrollParents.popper);
    return o2 && l2.forEach(function(t3) {
      t3.addEventListener("scroll", n2.update, _t);
    }), s2 && c2.addEventListener("resize", n2.update, _t), function() {
      o2 && l2.forEach(function(t3) {
        t3.removeEventListener("scroll", n2.update, _t);
      }), s2 && c2.removeEventListener("resize", n2.update, _t);
    };
  }, data: {} }, { name: "popperOffsets", enabled: true, phase: "read", fn: function(t2) {
    var e2 = t2.state, n2 = t2.name;
    e2.modifiersData[n2] = kt({ reference: e2.rects.reference, element: e2.rects.popper, strategy: "absolute", placement: e2.placement });
  }, data: {} }, { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: function(t2) {
    var e2 = t2.state, n2 = t2.options, r2 = n2.gpuAcceleration, i2 = void 0 === r2 || r2, o2 = n2.adaptive, a2 = void 0 === o2 || o2, s2 = n2.roundOffsets, c2 = void 0 === s2 || s2, l2 = { placement: Ot(e2.placement), variation: Et(e2.placement), popper: e2.elements.popper, popperRect: e2.rects.popper, gpuAcceleration: i2, isFixed: "fixed" === e2.options.strategy };
    null != e2.modifiersData.popperOffsets && (e2.styles.popper = Object.assign({}, e2.styles.popper, Pt(Object.assign({}, l2, { offsets: e2.modifiersData.popperOffsets, position: e2.options.strategy, adaptive: a2, roundOffsets: c2 })))), null != e2.modifiersData.arrow && (e2.styles.arrow = Object.assign({}, e2.styles.arrow, Pt(Object.assign({}, l2, { offsets: e2.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: c2 })))), e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-placement": e2.placement });
  }, data: {} }, { name: "applyStyles", enabled: true, phase: "write", fn: function(t2) {
    var e2 = t2.state;
    Object.keys(e2.elements).forEach(function(t3) {
      var n2 = e2.styles[t3] || {}, r2 = e2.attributes[t3] || {}, i2 = e2.elements[t3];
      B(i2) && $(i2) && (Object.assign(i2.style, n2), Object.keys(r2).forEach(function(t4) {
        var e3 = r2[t4];
        false === e3 ? i2.removeAttribute(t4) : i2.setAttribute(t4, true === e3 ? "" : e3);
      }));
    });
  }, effect: function(t2) {
    var e2 = t2.state, n2 = { popper: { position: e2.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
    return Object.assign(e2.elements.popper.style, n2.popper), e2.styles = n2, e2.elements.arrow && Object.assign(e2.elements.arrow.style, n2.arrow), function() {
      Object.keys(e2.elements).forEach(function(t3) {
        var r2 = e2.elements[t3], i2 = e2.attributes[t3] || {}, o2 = Object.keys(e2.styles.hasOwnProperty(t3) ? e2.styles[t3] : n2[t3]).reduce(function(t4, e3) {
          return t4[e3] = "", t4;
        }, {});
        B(r2) && $(r2) && (Object.assign(r2.style, o2), Object.keys(i2).forEach(function(t4) {
          r2.removeAttribute(t4);
        }));
      });
    };
  }, requires: ["computeStyles"] }, xt, { name: "flip", enabled: true, phase: "main", fn: function(t2) {
    var e2 = t2.state, n2 = t2.options, r2 = t2.name;
    if (!e2.modifiersData[r2]._skip) {
      for (var i2 = n2.mainAxis, o2 = void 0 === i2 || i2, a2 = n2.altAxis, s2 = void 0 === a2 || a2, c2 = n2.fallbackPlacements, l2 = n2.padding, u2 = n2.boundary, f2 = n2.rootBoundary, d2 = n2.altBoundary, p2 = n2.flipVariations, h2 = void 0 === p2 || p2, g2 = n2.allowedAutoPlacements, v2 = e2.options.placement, b2 = Ot(v2), m2 = c2 || (b2 === v2 || !h2 ? [St(v2)] : function(t3) {
        if (Ot(t3) === ct)
          return [];
        var e3 = St(t3);
        return [Dt(t3), e3, Dt(e3)];
      }(v2)), y2 = [v2].concat(m2).reduce(function(t3, n3) {
        return t3.concat(Ot(n3) === ct ? function(t4, e3) {
          void 0 === e3 && (e3 = {});
          var n4 = e3, r3 = n4.placement, i3 = n4.boundary, o3 = n4.rootBoundary, a3 = n4.padding, s3 = n4.flipVariations, c3 = n4.allowedAutoPlacements, l3 = void 0 === c3 ? gt : c3, u3 = Et(r3), f3 = u3 ? s3 ? ht : ht.filter(function(t5) {
            return Et(t5) === u3;
          }) : lt, d3 = f3.filter(function(t5) {
            return l3.indexOf(t5) >= 0;
          });
          0 === d3.length && (d3 = f3);
          var p3 = d3.reduce(function(e4, n5) {
            return e4[n5] = Wt(t4, { placement: n5, boundary: i3, rootBoundary: o3, padding: a3 })[Ot(n5)], e4;
          }, {});
          return Object.keys(p3).sort(function(t5, e4) {
            return p3[t5] - p3[e4];
          });
        }(e2, { placement: n3, boundary: u2, rootBoundary: f2, padding: l2, flipVariations: h2, allowedAutoPlacements: g2 }) : n3);
      }, []), w2 = e2.rects.reference, _2 = e2.rects.popper, O2 = /* @__PURE__ */ new Map(), E2 = true, j2 = y2[0], k2 = 0; k2 < y2.length; k2++) {
        var A2 = y2[k2], P2 = Ot(A2), x2 = Et(A2) === ut, L2 = [it, ot].indexOf(P2) >= 0, S2 = L2 ? "width" : "height", C2 = Wt(e2, { placement: A2, boundary: u2, rootBoundary: f2, altBoundary: d2, padding: l2 }), D2 = L2 ? x2 ? at : st : x2 ? ot : it;
        w2[S2] > _2[S2] && (D2 = St(D2));
        var T2 = St(D2), I2 = [];
        if (o2 && I2.push(C2[P2] <= 0), s2 && I2.push(C2[D2] <= 0, C2[T2] <= 0), I2.every(function(t3) {
          return t3;
        })) {
          j2 = A2, E2 = false;
          break;
        }
        O2.set(A2, I2);
      }
      if (E2)
        for (var q2 = function(t3) {
          var e3 = y2.find(function(e4) {
            var n3 = O2.get(e4);
            if (n3)
              return n3.slice(0, t3).every(function(t4) {
                return t4;
              });
          });
          if (e3)
            return j2 = e3, "break";
        }, M2 = h2 ? 3 : 1; M2 > 0; M2--) {
          if ("break" === q2(M2))
            break;
        }
      e2.placement !== j2 && (e2.modifiersData[r2]._skip = true, e2.placement = j2, e2.reset = true);
    }
  }, requiresIfExists: ["offset"], data: { _skip: false } }, Vt, Ut, { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: function(t2) {
    var e2 = t2.state, n2 = t2.name, r2 = e2.rects.reference, i2 = e2.rects.popper, o2 = e2.modifiersData.preventOverflow, a2 = Wt(e2, { elementContext: "reference" }), s2 = Wt(e2, { altBoundary: true }), c2 = zt(a2, r2), l2 = zt(s2, i2, o2), u2 = Nt(c2), f2 = Nt(l2);
    e2.modifiersData[n2] = { referenceClippingOffsets: c2, popperEscapeOffsets: l2, isReferenceHidden: u2, hasPopperEscaped: f2 }, e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-reference-hidden": u2, "data-popper-escaped": f2 });
  } }] });
  function Ft(t2) {
    return function(t3) {
      if (Array.isArray(t3))
        return Xt(t3);
    }(t2) || function(t3) {
      if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
        return Array.from(t3);
    }(t2) || function(t3, e2) {
      if (!t3)
        return;
      if ("string" == typeof t3)
        return Xt(t3, e2);
      var n2 = Object.prototype.toString.call(t3).slice(8, -1);
      "Object" === n2 && t3.constructor && (n2 = t3.constructor.name);
      if ("Map" === n2 || "Set" === n2)
        return Array.from(t3);
      if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
        return Xt(t3, e2);
    }(t2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function Xt(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var n2 = 0, r2 = new Array(e2); n2 < e2; n2++)
      r2[n2] = t2[n2];
    return r2;
  }
  function Yt(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function Gt(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? Yt(Object(n2), true).forEach(function(e3) {
        Jt(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : Yt(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function Jt(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function Kt(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function Qt(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var Zt = { placement: "bottom", triggerType: "click", onShow: function() {
  }, onHide: function() {
  } }, te = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      Kt(this, t2), this._targetEl = e3, this._triggerEl = n3, this._options = Gt(Gt({}, Zt), r2), this._popperInstance = this._createPopperInstace(), this._visible = false, this._init();
    }
    var e2, n2;
    return e2 = t2, (n2 = [{ key: "_init", value: function() {
      var t3 = this;
      this._triggerEl && this._triggerEl.addEventListener("click", function() {
        t3.toggle();
      });
    } }, { key: "_createPopperInstace", value: function() {
      return $t(this._triggerEl, this._targetEl, { placement: this._options.placement, modifiers: [{ name: "offset", options: { offset: [0, 10] } }] });
    } }, { key: "_handleClickOutside", value: function(t3, e3) {
      var n3 = t3.target;
      n3 === e3 || e3.contains(n3) || this._triggerEl.contains(n3) || !this._visible || this.hide(), document.body.removeEventListener("click", this._handleClickOutside, true);
    } }, { key: "toggle", value: function() {
      this._visible ? (this.hide(), document.body.removeEventListener("click", this._handleClickOutside, true)) : this.show();
    } }, { key: "show", value: function() {
      var t3 = this;
      this._targetEl.classList.remove("hidden"), this._targetEl.classList.add("block"), this._popperInstance.setOptions(function(t4) {
        return Gt(Gt({}, t4), {}, { modifiers: [].concat(Ft(t4.modifiers), [{ name: "eventListeners", enabled: true }]) });
      }), document.body.addEventListener("click", function(e3) {
        t3._handleClickOutside(e3, t3._targetEl);
      }, true), this._popperInstance.update(), this._visible = true, this._options.onShow(this);
    } }, { key: "hide", value: function() {
      this._targetEl.classList.remove("block"), this._targetEl.classList.add("hidden"), this._popperInstance.setOptions(function(t3) {
        return Gt(Gt({}, t3), {}, { modifiers: [].concat(Ft(t3.modifiers), [{ name: "eventListeners", enabled: false }]) });
      }), this._visible = false, this._options.onHide(this);
    } }]) && Qt(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  function ee() {
    document.querySelectorAll("[data-dropdown-toggle]").forEach(function(t2) {
      var e2 = document.getElementById(t2.getAttribute("data-dropdown-toggle")), n2 = t2.getAttribute("data-dropdown-placement");
      new te(e2, t2, { placement: n2 || Zt.placement });
    });
  }
  window.Dropdown = te, "loading" !== document.readyState ? ee() : document.addEventListener("DOMContentLoaded", ee);
  function ne(t2) {
    return function(t3) {
      if (Array.isArray(t3))
        return re(t3);
    }(t2) || function(t3) {
      if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
        return Array.from(t3);
    }(t2) || function(t3, e2) {
      if (!t3)
        return;
      if ("string" == typeof t3)
        return re(t3, e2);
      var n2 = Object.prototype.toString.call(t3).slice(8, -1);
      "Object" === n2 && t3.constructor && (n2 = t3.constructor.name);
      if ("Map" === n2 || "Set" === n2)
        return Array.from(t3);
      if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
        return re(t3, e2);
    }(t2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function re(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var n2 = 0, r2 = new Array(e2); n2 < e2; n2++)
      r2[n2] = t2[n2];
    return r2;
  }
  function ie(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function oe(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? ie(Object(n2), true).forEach(function(e3) {
        ae(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : ie(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function ae(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function se(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function ce(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var le = { placement: "center", backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40", backdrop: "dynamic", onHide: function() {
  }, onShow: function() {
  }, onToggle: function() {
  } }, ue = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      se(this, t2), this._targetEl = e3, this._options = oe(oe({}, le), n3), this._isHidden = true, this._backdropEl = null, this._init();
    }
    var e2, n2;
    return e2 = t2, (n2 = [{ key: "_init", value: function() {
      var t3 = this;
      this._targetEl && (this._getPlacementClasses().map(function(e3) {
        t3._targetEl.classList.add(e3);
      }), this._targetEl.addEventListener("click", function(e3) {
        t3._handleOutsideClick(e3.target);
      }));
    } }, { key: "_createBackdrop", value: function() {
      if (this._isHidden) {
        var t3, e3 = document.createElement("div");
        e3.setAttribute("modal-backdrop", ""), (t3 = e3.classList).add.apply(t3, ne(this._options.backdropClasses.split(" "))), document.querySelector("body").append(e3), this._backdropEl = e3;
      }
    } }, { key: "_destroyBackdropEl", value: function() {
      this._isHidden || document.querySelector("[modal-backdrop]").remove();
    } }, { key: "_handleOutsideClick", value: function(t3) {
      "dynamic" === this._options.backdrop && (t3 !== this._targetEl && t3 !== this._backdropEl || this.hide());
    } }, { key: "_getPlacementClasses", value: function() {
      switch (this._options.placement) {
        case "top-left":
          return ["justify-start", "items-start"];
        case "top-center":
          return ["justify-center", "items-start"];
        case "top-right":
          return ["justify-end", "items-start"];
        case "center-left":
          return ["justify-start", "items-center"];
        case "center":
        default:
          return ["justify-center", "items-center"];
        case "center-right":
          return ["justify-end", "items-center"];
        case "bottom-left":
          return ["justify-start", "items-end"];
        case "bottom-center":
          return ["justify-center", "items-end"];
        case "bottom-right":
          return ["justify-end", "items-end"];
      }
    } }, { key: "toggle", value: function() {
      this._isHidden ? this.show() : this.hide(), this._options.onToggle(this);
    } }, { key: "show", value: function() {
      this._targetEl.classList.add("flex"), this._targetEl.classList.remove("hidden"), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._createBackdrop(), this._isHidden = false, document.body.classList.add("overflow-hidden"), this._options.onShow(this);
    } }, { key: "hide", value: function() {
      this._targetEl.classList.add("hidden"), this._targetEl.classList.remove("flex"), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._destroyBackdropEl(), this._isHidden = true, document.body.classList.remove("overflow-hidden"), this._options.onHide(this);
    } }, { key: "isHidden", value: function() {
      return this._isHidden;
    } }]) && ce(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  window.Modal = ue;
  var fe = function(t2, e2) {
    return !!e2.some(function(e3) {
      return e3.id === t2;
    }) && e2.find(function(e3) {
      return e3.id === t2;
    });
  }, de = function(t2) {
    var e2 = [];
    document.querySelectorAll("[".concat(t2.main, "]")).forEach(function(n2) {
      var r2 = n2.getAttribute(t2.main), i2 = document.getElementById(r2), o2 = i2.getAttribute(t2.placement), a2 = i2.getAttribute(t2.backdrop);
      i2 && (i2.hasAttribute("aria-hidden") || i2.hasAttribute("aria-modal") || i2.setAttribute("aria-hidden", "true"));
      var s2 = null;
      fe(r2, e2) ? s2 = (s2 = fe(r2, e2)).object : (s2 = new ue(i2, { placement: o2 || le.placement, backdrop: a2 || le.backdrop }), e2.push({ id: r2, object: s2 })), i2.hasAttribute(t2.show) && "true" === i2.getAttribute(t2.show) && s2.show(), n2.addEventListener("click", function() {
        s2.toggle();
      });
    });
  }, pe = { main: "data-modal-toggle", placement: "data-modal-placement", show: "data-modal-show", backdrop: "data-modal-backdrop" };
  "loading" !== document.readyState ? de(pe) : document.addEventListener("DOMContentLoaded", de(pe));
  function he(t2) {
    return function(t3) {
      if (Array.isArray(t3))
        return ge(t3);
    }(t2) || function(t3) {
      if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
        return Array.from(t3);
    }(t2) || function(t3, e2) {
      if (!t3)
        return;
      if ("string" == typeof t3)
        return ge(t3, e2);
      var n2 = Object.prototype.toString.call(t3).slice(8, -1);
      "Object" === n2 && t3.constructor && (n2 = t3.constructor.name);
      if ("Map" === n2 || "Set" === n2)
        return Array.from(t3);
      if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
        return ge(t3, e2);
    }(t2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function ge(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var n2 = 0, r2 = new Array(e2); n2 < e2; n2++)
      r2[n2] = t2[n2];
    return r2;
  }
  function ve(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function be(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? ve(Object(n2), true).forEach(function(e3) {
        me(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : ve(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function me(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function ye(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function we(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var _e = { placement: "left", bodyScrolling: false, backdrop: true, edge: false, edgeOffset: "bottom-[60px]", backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30", onShow: function() {
  }, onHide: function() {
  }, onToggle: function() {
  } }, Oe = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n3 = arguments.length > 1 ? arguments[1] : void 0;
      ye(this, t2), this._targetEl = e3, this._options = be(be({}, _e), n3), this._visible = false, this._init();
    }
    var e2, n2;
    return e2 = t2, (n2 = [{ key: "_init", value: function() {
      var t3 = this;
      this._targetEl && (this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.classList.add("transition-transform")), this._getPlacementClasses(this._options.placement).base.map(function(e3) {
        t3._targetEl.classList.add(e3);
      }), this.hide();
    } }, { key: "isVisible", value: function() {
      return this._visible;
    } }, { key: "hide", value: function() {
      var t3 = this;
      this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map(function(e3) {
        t3._targetEl.classList.remove(e3);
      }), this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(e3) {
        t3._targetEl.classList.add(e3);
      })) : (this._getPlacementClasses(this._options.placement).active.map(function(e3) {
        t3._targetEl.classList.remove(e3);
      }), this._getPlacementClasses(this._options.placement).inactive.map(function(e3) {
        t3._targetEl.classList.add(e3);
      })), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._options.bodyScrolling || document.body.classList.remove("overflow-hidden"), this._options.backdrop && this._destroyBackdropEl(), this._visible = false, this._options.onHide(this);
    } }, { key: "show", value: function() {
      var t3 = this;
      this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map(function(e3) {
        t3._targetEl.classList.add(e3);
      }), this._getPlacementClasses(this._options.placement + "-edge").inactive.map(function(e3) {
        t3._targetEl.classList.remove(e3);
      })) : (this._getPlacementClasses(this._options.placement).active.map(function(e3) {
        t3._targetEl.classList.add(e3);
      }), this._getPlacementClasses(this._options.placement).inactive.map(function(e3) {
        t3._targetEl.classList.remove(e3);
      })), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._options.bodyScrolling || document.body.classList.add("overflow-hidden"), this._options.backdrop && this._createBackdrop(), this._visible = true, this._options.onShow(this);
    } }, { key: "toggle", value: function() {
      this.isVisible() ? this.hide() : this.show();
    } }, { key: "_createBackdrop", value: function() {
      var t3 = this;
      if (!this._visible) {
        var e3, n3 = document.createElement("div");
        n3.setAttribute("drawer-backdrop", ""), (e3 = n3.classList).add.apply(e3, he(this._options.backdropClasses.split(" "))), document.querySelector("body").append(n3), n3.addEventListener("click", function() {
          t3.hide();
        });
      }
    } }, { key: "_destroyBackdropEl", value: function() {
      this._visible && document.querySelector("[drawer-backdrop]").remove();
    } }, { key: "_getPlacementClasses", value: function(t3) {
      switch (t3) {
        case "top":
          return { base: ["top-0", "left-0", "right-0"], active: ["transform-none"], inactive: ["-translate-y-full"] };
        case "right":
          return { base: ["right-0", "top-0"], active: ["transform-none"], inactive: ["translate-x-full"] };
        case "bottom":
          return { base: ["bottom-0", "left-0", "right-0"], active: ["transform-none"], inactive: ["translate-y-full"] };
        case "left":
        default:
          return { base: ["left-0", "top-0"], active: ["transform-none"], inactive: ["-translate-x-full"] };
        case "bottom-edge":
          return { base: ["left-0", "top-0"], active: ["transform-none"], inactive: ["translate-y-full", this._options.edgeOffset] };
      }
    } }]) && we(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  window.Drawer = Oe;
  var Ee = function(t2, e2) {
    return !!e2.some(function(e3) {
      return e3.id === t2;
    }) && e2.find(function(e3) {
      return e3.id === t2;
    });
  };
  function je() {
    var t2 = [];
    document.querySelectorAll("[data-drawer-target]").forEach(function(e2) {
      var n2 = document.getElementById(e2.getAttribute("data-drawer-target")), r2 = n2.id, i2 = e2.getAttribute("data-drawer-placement"), o2 = e2.getAttribute("data-drawer-body-scrolling"), a2 = e2.getAttribute("data-drawer-backdrop"), s2 = e2.getAttribute("data-drawer-edge"), c2 = e2.getAttribute("data-drawer-edge-offset"), l2 = null;
      Ee(r2, t2) ? l2 = (l2 = Ee(r2, t2)).object : (l2 = new Oe(n2, { placement: i2 || _e.placement, bodyScrolling: o2 ? "true" === o2 : _e.bodyScrolling, backdrop: a2 ? "true" === a2 : _e.backdrop, edge: s2 ? "true" === s2 : _e.edge, edgeOffset: c2 || _e.edgeOffset }), t2.push({ id: r2, object: l2 }));
    }), document.querySelectorAll("[data-drawer-toggle]").forEach(function(e2) {
      var n2 = document.getElementById(e2.getAttribute("data-drawer-toggle")).id, r2 = Ee(n2, t2);
      e2.addEventListener("click", function() {
        r2.object.isVisible() ? r2.object.hide() : r2.object.show();
      });
    }), document.querySelectorAll("[data-drawer-dismiss]").forEach(function(e2) {
      var n2 = document.getElementById(e2.getAttribute("data-drawer-dismiss")).id, r2 = Ee(n2, t2);
      e2.addEventListener("click", function() {
        r2.object.hide();
      });
    }), document.querySelectorAll("[data-drawer-show]").forEach(function(e2) {
      var n2 = document.getElementById(e2.getAttribute("data-drawer-show")).id, r2 = Ee(n2, t2);
      e2.addEventListener("click", function() {
        r2.object.show();
      });
    });
  }
  "loading" !== document.readyState ? je() : document.addEventListener("DOMContentLoaded", je);
  function ke(t2) {
    return function(t3) {
      if (Array.isArray(t3))
        return Ae(t3);
    }(t2) || function(t3) {
      if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
        return Array.from(t3);
    }(t2) || function(t3, e2) {
      if (!t3)
        return;
      if ("string" == typeof t3)
        return Ae(t3, e2);
      var n2 = Object.prototype.toString.call(t3).slice(8, -1);
      "Object" === n2 && t3.constructor && (n2 = t3.constructor.name);
      if ("Map" === n2 || "Set" === n2)
        return Array.from(t3);
      if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
        return Ae(t3, e2);
    }(t2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function Ae(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var n2 = 0, r2 = new Array(e2); n2 < e2; n2++)
      r2[n2] = t2[n2];
    return r2;
  }
  function Pe(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function xe(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? Pe(Object(n2), true).forEach(function(e3) {
        Le(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : Pe(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function Le(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function Se(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function Ce(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var De = { defaultTabId: null, activeClasses: "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500", inactiveClasses: "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300", onShow: function() {
  } }, Te = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      Se(this, t2), this._items = e3, this._activeTab = n3 ? this.getTab(n3.defaultTabId) : null, this._options = xe(xe({}, De), n3), this._init();
    }
    var e2, n2;
    return e2 = t2, n2 = [{ key: "_init", value: function() {
      var t3 = this;
      this._items.length && (this._activeTab || this._setActiveTab(this._items[0]), this.show(this._activeTab.id, true), this._items.map(function(e3) {
        e3.triggerEl.addEventListener("click", function() {
          t3.show(e3.id);
        });
      }));
    } }, { key: "getActiveTab", value: function() {
      return this._activeTab;
    } }, { key: "_setActiveTab", value: function(t3) {
      this._activeTab = t3;
    } }, { key: "getTab", value: function(t3) {
      return this._items.filter(function(e3) {
        return e3.id === t3;
      })[0];
    } }, { key: "show", value: function(t3) {
      var e3, n3, r2 = this, i2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], o2 = this.getTab(t3);
      (o2 !== this._activeTab || i2) && (this._items.map(function(t4) {
        var e4, n4;
        t4 !== o2 && ((e4 = t4.triggerEl.classList).remove.apply(e4, ke(r2._options.activeClasses.split(" "))), (n4 = t4.triggerEl.classList).add.apply(n4, ke(r2._options.inactiveClasses.split(" "))), t4.targetEl.classList.add("hidden"), t4.triggerEl.setAttribute("aria-selected", false));
      }), (e3 = o2.triggerEl.classList).add.apply(e3, ke(this._options.activeClasses.split(" "))), (n3 = o2.triggerEl.classList).remove.apply(n3, ke(this._options.inactiveClasses.split(" "))), o2.triggerEl.setAttribute("aria-selected", true), o2.targetEl.classList.remove("hidden"), this._setActiveTab(o2), this._options.onShow(this, o2));
    } }], n2 && Ce(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  function Ie() {
    document.querySelectorAll("[data-tabs-toggle]").forEach(function(t2) {
      var e2 = [], n2 = null;
      t2.querySelectorAll('[role="tab"]').forEach(function(t3) {
        var r2 = "true" === t3.getAttribute("aria-selected"), i2 = { id: t3.getAttribute("data-tabs-target"), triggerEl: t3, targetEl: document.querySelector(t3.getAttribute("data-tabs-target")) };
        e2.push(i2), r2 && (n2 = i2.id);
      }), new Te(e2, { defaultTabId: n2 });
    });
  }
  window.Tabs = Te, "loading" !== document.readyState ? Ie() : document.addEventListener("DOMContentLoaded", Ie);
  function qe(t2) {
    return function(t3) {
      if (Array.isArray(t3))
        return Me(t3);
    }(t2) || function(t3) {
      if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
        return Array.from(t3);
    }(t2) || function(t3, e2) {
      if (!t3)
        return;
      if ("string" == typeof t3)
        return Me(t3, e2);
      var n2 = Object.prototype.toString.call(t3).slice(8, -1);
      "Object" === n2 && t3.constructor && (n2 = t3.constructor.name);
      if ("Map" === n2 || "Set" === n2)
        return Array.from(t3);
      if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
        return Me(t3, e2);
    }(t2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function Me(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var n2 = 0, r2 = new Array(e2); n2 < e2; n2++)
      r2[n2] = t2[n2];
    return r2;
  }
  function He(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function Be(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? He(Object(n2), true).forEach(function(e3) {
        We(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : He(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function We(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function Re(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function Ve(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var Ue = { placement: "top", triggerType: "hover", onShow: function() {
  }, onHide: function() {
  } }, ze = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      Re(this, t2), this._targetEl = e3, this._triggerEl = n3, this._options = Be(Be({}, Ue), r2), this._popperInstance = this._createPopperInstace(), this._init();
    }
    var e2, n2;
    return e2 = t2, (n2 = [{ key: "_init", value: function() {
      var t3 = this;
      if (this._triggerEl) {
        var e3 = this._getTriggerEvents();
        e3.showEvents.forEach(function(e4) {
          t3._triggerEl.addEventListener(e4, function() {
            t3.show();
          });
        }), e3.hideEvents.forEach(function(e4) {
          t3._triggerEl.addEventListener(e4, function() {
            t3.hide();
          });
        });
      }
    } }, { key: "_createPopperInstace", value: function() {
      return $t(this._triggerEl, this._targetEl, { placement: this._options.placement, modifiers: [{ name: "offset", options: { offset: [0, 8] } }] });
    } }, { key: "_getTriggerEvents", value: function() {
      switch (this._options.triggerType) {
        case "hover":
        default:
          return { showEvents: ["mouseenter", "focus"], hideEvents: ["mouseleave", "blur"] };
        case "click":
          return { showEvents: ["click", "focus"], hideEvents: ["focusout", "blur"] };
      }
    } }, { key: "show", value: function() {
      this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions(function(t3) {
        return Be(Be({}, t3), {}, { modifiers: [].concat(qe(t3.modifiers), [{ name: "eventListeners", enabled: true }]) });
      }), this._popperInstance.update(), this._options.onShow(this);
    } }, { key: "hide", value: function() {
      this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(t3) {
        return Be(Be({}, t3), {}, { modifiers: [].concat(qe(t3.modifiers), [{ name: "eventListeners", enabled: false }]) });
      }), this._options.onHide(this);
    } }]) && Ve(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  function Ne() {
    document.querySelectorAll("[data-tooltip-target]").forEach(function(t2) {
      var e2 = document.getElementById(t2.getAttribute("data-tooltip-target")), n2 = t2.getAttribute("data-tooltip-trigger"), r2 = t2.getAttribute("data-tooltip-placement");
      new ze(e2, t2, { placement: r2 || Ue.placement, triggerType: n2 || Ue.triggerType });
    });
  }
  window.Tooltip = ze, "loading" !== document.readyState ? Ne() : document.addEventListener("DOMContentLoaded", Ne);
  function $e(t2) {
    return function(t3) {
      if (Array.isArray(t3))
        return Fe(t3);
    }(t2) || function(t3) {
      if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
        return Array.from(t3);
    }(t2) || function(t3, e2) {
      if (!t3)
        return;
      if ("string" == typeof t3)
        return Fe(t3, e2);
      var n2 = Object.prototype.toString.call(t3).slice(8, -1);
      "Object" === n2 && t3.constructor && (n2 = t3.constructor.name);
      if ("Map" === n2 || "Set" === n2)
        return Array.from(t3);
      if ("Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
        return Fe(t3, e2);
    }(t2) || function() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }
  function Fe(t2, e2) {
    (null == e2 || e2 > t2.length) && (e2 = t2.length);
    for (var n2 = 0, r2 = new Array(e2); n2 < e2; n2++)
      r2[n2] = t2[n2];
    return r2;
  }
  function Xe(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function Ye(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? Xe(Object(n2), true).forEach(function(e3) {
        Ge(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : Xe(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function Ge(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function Je(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function Ke(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var Qe = { placement: "top", offset: 10, triggerType: "hover", onShow: function() {
  }, onHide: function() {
  } }, Ze = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      Je(this, t2), this._targetEl = e3, this._triggerEl = n3, this._options = Ye(Ye({}, Qe), r2), this._popperInstance = this._createPopperInstace(), this._init();
    }
    var e2, n2;
    return e2 = t2, (n2 = [{ key: "_init", value: function() {
      var t3 = this;
      if (this._triggerEl) {
        var e3 = this._getTriggerEvents();
        e3.showEvents.forEach(function(e4) {
          t3._triggerEl.addEventListener(e4, function() {
            t3.show();
          }), t3._targetEl.addEventListener(e4, function() {
            t3.show();
          });
        }), e3.hideEvents.forEach(function(e4) {
          t3._triggerEl.addEventListener(e4, function() {
            setTimeout(function() {
              t3._targetEl.matches(":hover") || t3.hide();
            }, 100);
          }), t3._targetEl.addEventListener(e4, function() {
            setTimeout(function() {
              t3._triggerEl.matches(":hover") || t3.hide();
            }, 100);
          });
        });
      }
    } }, { key: "_createPopperInstace", value: function() {
      return $t(this._triggerEl, this._targetEl, { placement: this._options.placement, modifiers: [{ name: "offset", options: { offset: [0, this._options.offset] } }] });
    } }, { key: "_getTriggerEvents", value: function() {
      switch (this._options.triggerType) {
        case "hover":
        default:
          return { showEvents: ["mouseenter", "focus"], hideEvents: ["mouseleave", "blur"] };
        case "click":
          return { showEvents: ["click", "focus"], hideEvents: ["focusout", "blur"] };
      }
    } }, { key: "show", value: function() {
      this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions(function(t3) {
        return Ye(Ye({}, t3), {}, { modifiers: [].concat($e(t3.modifiers), [{ name: "eventListeners", enabled: true }]) });
      }), this._popperInstance.update(), this._options.onShow(this);
    } }, { key: "hide", value: function() {
      this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions(function(t3) {
        return Ye(Ye({}, t3), {}, { modifiers: [].concat($e(t3.modifiers), [{ name: "eventListeners", enabled: false }]) });
      }), this._options.onHide(this);
    } }]) && Ke(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  function tn() {
    document.querySelectorAll("[data-popover-target]").forEach(function(t2) {
      var e2 = document.getElementById(t2.getAttribute("data-popover-target")), n2 = t2.getAttribute("data-popover-trigger"), r2 = t2.getAttribute("data-popover-placement"), i2 = t2.getAttribute("data-popover-offset");
      new Ze(e2, t2, { placement: r2 || Qe.placement, offset: i2 ? parseInt(i2) : Qe.offset, triggerType: n2 || Qe.triggerType });
    });
  }
  window.Popover = Ze, "loading" !== document.readyState ? tn() : document.addEventListener("DOMContentLoaded", tn);
  function en(t2, e2) {
    var n2 = Object.keys(t2);
    if (Object.getOwnPropertySymbols) {
      var r2 = Object.getOwnPropertySymbols(t2);
      e2 && (r2 = r2.filter(function(e3) {
        return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
      })), n2.push.apply(n2, r2);
    }
    return n2;
  }
  function nn(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var n2 = null != arguments[e2] ? arguments[e2] : {};
      e2 % 2 ? en(Object(n2), true).forEach(function(e3) {
        rn(t2, e3, n2[e3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(n2)) : en(Object(n2)).forEach(function(e3) {
        Object.defineProperty(t2, e3, Object.getOwnPropertyDescriptor(n2, e3));
      });
    }
    return t2;
  }
  function rn(t2, e2, n2) {
    return e2 in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
  }
  function on(t2, e2) {
    if (!(t2 instanceof e2))
      throw new TypeError("Cannot call a class as a function");
  }
  function an(t2, e2) {
    for (var n2 = 0; n2 < e2.length; n2++) {
      var r2 = e2[n2];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, r2.key, r2);
    }
  }
  var sn = { triggerType: "hover", onShow: function() {
  }, onHide: function() {
  }, onToggle: function() {
  } }, cn = function() {
    function t2() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, i2 = arguments.length > 3 ? arguments[3] : void 0;
      on(this, t2), this._parentEl = e3, this._triggerEl = n3, this._targetEl = r2, this._options = nn(nn({}, sn), i2), this._visible = false, this._init();
    }
    var e2, n2;
    return e2 = t2, (n2 = [{ key: "_init", value: function() {
      var t3 = this;
      if (this._triggerEl) {
        var e3 = this._getTriggerEvents();
        e3.showEvents.forEach(function(e4) {
          t3._triggerEl.addEventListener(e4, function() {
            t3.show();
          }), t3._targetEl.addEventListener(e4, function() {
            t3.show();
          });
        }), e3.hideEvents.forEach(function(e4) {
          t3._parentEl.addEventListener(e4, function() {
            setTimeout(function() {
              t3._parentEl.matches(":hover") || t3.hide();
            }, 100);
          });
        });
      }
    } }, { key: "hide", value: function() {
      this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = false, this._options.onHide(this);
    } }, { key: "show", value: function() {
      this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = true, this._options.onShow(this);
    } }, { key: "toggle", value: function() {
      this._visible ? this.hide() : this.show();
    } }, { key: "_getTriggerEvents", value: function() {
      switch (this._options.triggerType) {
        case "hover":
        default:
          return { showEvents: ["mouseenter", "focus"], hideEvents: ["mouseleave", "blur"] };
        case "click":
          return { showEvents: ["click", "focus"], hideEvents: ["focusout", "blur"] };
      }
    } }]) && an(e2.prototype, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
  }();
  function ln() {
    document.querySelectorAll("[data-dial-init]").forEach(function(t2) {
      var e2 = t2.querySelector("[data-dial-toggle]"), n2 = document.getElementById(e2.getAttribute("data-dial-toggle")), r2 = e2.getAttribute("data-dial-trigger");
      new cn(t2, e2, n2, { triggerType: r2 || sn.triggerType });
    });
  }
  window.Dial = cn, "loading" !== document.readyState ? ln() : document.addEventListener("DOMContentLoaded", ln);
})();
const style = "";
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
if (localStorage.getItem("color-theme") === "dark" || !("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}
if (localStorage.getItem("color-theme") === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", function() {
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});
const recentWorks = [
  {
    img: "/images/video_1.mp4",
    type: "video"
  },
  {
    img: "/images/demo_img1.jpg",
    type: "img"
  },
  {
    img: "/images/demo_img2.jpg",
    type: "img"
  }
];
const recentWorks2 = [
  {
    title: "Personal Portfolio",
    description: "Professional page for personal portfolio showcase.",
    techs: ["Tailwind", "JS", "Vite"],
    img: "/images/personal-portfolio.png"
  },
  {
    title: "Doctors Portal",
    description: "Doctors appointment booking website.",
    techs: ["React", "Node", "JS"],
    img: "/images/doctors-portal.png"
  },
  {
    title: "Digital Marketing",
    description: "Professional page for digital marketing.",
    techs: ["BS5", "CSS", "JS"],
    img: "/images/digital-marketing.png"
  },
  {
    title: "Personal Portfolio",
    description: "Professional page for personal portfolio showcase.",
    techs: ["Tailwind", "JS", "Vite"],
    img: "/images/personal-portfolio.png"
  },
  {
    title: "Doctors Portal",
    description: "Doctors appointment booking website.",
    techs: ["React", "Node", "JS"],
    img: "/images/doctors-portal.png"
  },
  {
    title: "Digital Marketing",
    description: "Professional page for digital marketing.",
    techs: ["BS5", "CSS", "JS"],
    img: "/images/digital-marketing.png"
  }
];
const parent$2 = document.getElementById("recent-works-1");
const parent2 = document.getElementById("recent-works2");
const getTech = (techs) => {
  return techs.map((tech) => `<button type="button" class="text-gray-900 bg-gray-100 border border-gray-100  hover:bg-gray-50 font-medium rounded-md text-sm px-3.5 py-2 mr-2 mb-2 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-600 dark:hover:border-gray-600">
                ${tech}
            </button>`).join(" ");
};
const html$2 = recentWorks.map(
  (work) => ` <div class="carousel-item flex-shrink-0 w-[525px] h-[344px] px-2">
    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div class="w-full aspect-w-16 aspect-h-9">
            ${work.type === "video" ? `
                <video class="rounded-t-lg w-full h-full object-cover" loop muted playsinline autoplay src="${work.img}"></video>
            ` : `
                <img class="rounded-t-lg w-full h-full object-cover" src="${work.img}" />
            `}
        </div>
    </div>
</div>`
);
const html2 = recentWorks2.map(
  (work) => ` <div class="carousel-item flex-shrink-0 w-full md:w-1/3 px-2">
    <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <div class="lg:h-36 object-cover">
            <img class="rounded-t-lg w-full" src=${work.img} alt=${work.title} />
        </div>
        <div class="p-3 border-t border-gray-100 dark:border-gray-600">
            <h5 class="text-xl font-semibold text-gray-900 dark:text-gray-200">${work.title}</h5>
        <p class="font-light text-gray-800 dark:text-gray-400">${work.description}</p>
        <div class="my-4 flex flex-wrap">
            ${getTech(work.techs)}
        </div>
        <a href="https://github.com/nchdatta/personal-portfolio" target="_blank"
            class="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center rounded-lg text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
        </a>
        </div>
        </div>
    </div>`
);
console.log(parent$2, "parent>>>>>>>>.");
parent$2.innerHTML = html$2.join(" ");
parent2.innerHTML = html2.join(" ");
const techSkills = [
  {
    title: "Languages",
    skills: [
      { icon: `<i class="fa-brands fa-square-js text-yellow-500"></i>`, name: "JavaScript", label: "Expert" },
      { icon: `<i class="fa-brands fa-html5 fa-lg text-green-600"></i>`, name: "HTML5", label: "Expert" },
      { icon: `<i class="fa-brands fa-css3-alt fa-lg text-blue-600"></i>`, name: "CSS3", label: "Expert" },
      { icon: `<i class="fa-brands fa-php fa-sm text-red-600"></i>`, name: "PHP", label: "Junior" },
      { icon: `<i class="fa-brands fa-markdown fa-2xs text-slate-600"></i>`, name: "Markdown", label: "Junior" }
    ]
  },
  {
    title: "Front-end",
    skills: [
      { icon: `<i class="fa-brands fa-react text-yellow-600"></i>`, name: "React", label: "Expert" },
      { icon: `<i class="fa-solid fa-fire text-red-600"></i>`, name: "Firebase", label: "Expert" },
      { icon: `<i class="fa-brands fa-bootstrap text-green-600"></i>`, name: "Bootstrap", label: "Expert" },
      { icon: `<i class="fa-solid fa-code fa-xs text-green-600"></i>`, name: "Tailwind", label: "Expert" },
      { icon: `<i class="fa-solid fa-code fa-xs text-green-600"></i>`, name: "JQuary", label: "Intermediate" }
    ]
  },
  {
    title: "Back-end",
    skills: [
      { icon: `<i class="fa-brands fa-node fa-sm text-green-600"></i>`, name: "Node.js", label: "Expert" },
      { icon: `<i class="fa-brands fa-node-js text-green-600"></i>`, name: "Express.js", label: "Expert" }
    ]
  },
  {
    title: "Database",
    skills: [
      { icon: `<i class="fa-solid fa-server fa-xs text-green-700"></i>`, name: "MongoDB", label: "Expert" },
      { icon: `<i class="fa-solid fa-server fa-xs text-green-700"></i>`, name: "MySql", label: "Intermediate" },
      { icon: `<i class="fa-solid fa-server fa-xs text-green-700"></i>`, name: "Mongoose", label: "Expert" }
    ]
  },
  {
    title: "Dev Tools",
    skills: [
      { icon: `<i class="fa-brands fa-git text-yellow-500"></i>`, name: "Git", label: "Expert" },
      { icon: `<i class="fa-brands fa-github"></i>`, name: "GitHub", label: "Expert" },
      { icon: `<i class="fa-sharp fa-solid fa-laptop-code fa-xs text-blue-500"></i>`, name: "VS", label: "Expert" }
    ]
  },
  {
    title: "Design Tools",
    skills: [
      { icon: `<i class="fa-solid fa-bezier-curve fa-xs text-yellow-400"></i>`, name: "Adobe Photoshop", label: "Intermediate" },
      { icon: `<i class="fa-solid fa-bezier-curve fa-xs text-orange-600"></i>`, name: "Adobe Illustrator", label: "Junior" },
      { icon: `<i class="fa-brands fa-figma  text-orange-400"></i>`, name: "Figma", label: "Junior" },
      { icon: `<i class="fa-solid fa-file-powerpoint  text-blue-400"></i>`, name: "MS PowerPoint", label: "Expert" }
    ]
  }
];
const parent$1 = document.getElementById("tech-skills");
const getSkill = (skills) => {
  const skillHtml = skills.map((skill) => `<p class="text-md text-gray-700 dark:text-gray-200">
            ${skill.icon}
            ${skill.name}
            <code class="text-sm text-gray-500 dark:text-gray-300">${skill.label}</code>
        </p>`);
  return skillHtml.join(" ");
};
const html$1 = techSkills.map(
  (tech) => `<div>
        <h2 class="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">${tech.title}</h2>
        ${getSkill(tech.skills)}
    </div>`
);
parent$1.innerHTML = html$1.join(" ");
const tags = [
  {
    icon: `<i class="fa-solid fa-desktop fa-sm mr-1 text-blue-700"></i>`,
    name: "Web Developer"
  },
  {
    icon: `<i class="fa-solid fa-code fa-sm mr-1 text-blue-400"></i>`,
    name: "React Developer"
  },
  {
    icon: `<i class="fa-solid fa-code fa-sm mr-1 text-green-600"></i>`,
    name: "Node"
  },
  {
    icon: `<i class="fa-solid fa-terminal fa-sm mr-1 text-orange-500"></i>`,
    name: "MERN"
  },
  {
    icon: `<i class="fa-solid fa-terminal fa-sm mr-1 text-blue-600"></i>`,
    name: "Material UI"
  },
  {
    icon: `<i class="fa-solid fa-people-group fa-sm mr-1 text-green-500"></i>`,
    name: "Collaborate"
  }
];
const parent = document.getElementById("header-tags");
const html = tags.map(
  (tag) => `<button type="button" class="text-gray-900 bg-gray-100 border border-gray-100  hover:bg-gray-50 font-medium rounded-full text-sm px-4 py-2 lg:px-5 lg:py-2.5  mr-1 mb-2 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-700">
        ${tag.icon}
        ${tag.name}
    </button>`
);
parent.innerHTML = html.join(" ");
