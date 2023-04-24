var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (b, c, a) {
        b != Array.prototype && b != Object.prototype && (b[c] = a.value);
      };
$jscomp.getGlobal = function (b) {
  return "undefined" != typeof window && window === b
    ? b
    : "undefined" != typeof global && null != global
    ? global
    : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (b, c, a, d) {
  if (c) {
    a = $jscomp.global;
    b = b.split(".");
    for (d = 0; d < b.length - 1; d++) {
      var e = b[d];
      e in a || (a[e] = {});
      a = a[e];
    }
    b = b[b.length - 1];
    d = a[b];
    c = c(d);
    c != d &&
      null != c &&
      $jscomp.defineProperty(a, b, {
        configurable: !0,
        writable: !0,
        value: c,
      });
  }
};
$jscomp.polyfill(
  "Array.from",
  function (b) {
    return b
      ? b
      : function (b, a, d) {
          a =
            null != a
              ? a
              : function (a) {
                  return a;
                };
          var e = [],
            c =
              "undefined" != typeof Symbol &&
              Symbol.iterator &&
              b[Symbol.iterator];
          if ("function" == typeof c) {
            b = c.call(b);
            for (var f = 0; !(c = b.next()).done; )
              e.push(a.call(d, c.value, f++));
          } else
            for (c = b.length, f = 0; f < c; f++) e.push(a.call(d, b[f], f));
          return e;
        };
  },
  "es6",
  "es3"
);
(function () {
  function b(a) {
    "resize" === a.type &&
      (document.body.classList.remove("navbar-dropdown-open"),
      document
        .querySelector(".navbar-dropdown")
        .querySelector(".navbar-collapse")
        .classList.remove("show"),
      document.querySelector(".navbar-dropdown").classList.remove("opened"),
      Array.from(
        document
          .querySelector(".navbar-dropdown")
          .querySelectorAll('.navbar-toggler[aria-expanded="true"]')
      ).forEach(function (b) {
        var a = b.querySelector(b.getAttribute("data-target"));
        a &&
          (a.classList.remove("in"),
          a.setAttribute("aria-expanded", "false"),
          b.setAttribute("aria-expanded", "false"));
      }));
    var b = document.documentElement.scrollTop;
    Array.from(document.querySelectorAll(".navbar-dropdown")).forEach(function (
      a
    ) {
      a.matches(".navbar-fixed-top") &&
        (a.matches(".transparent") &&
          !a.classList.contains("opened") &&
          (0 < b
            ? a.classList.remove("bg-color")
            : a.classList.add("bg-color")),
        0 < b
          ? a.classList.add("navbar-short")
          : a.classList.remove("navbar-short"));
    });
  }
  var c;
  ["scroll", "resize"].forEach(function (a) {
    document.addEventListener(a, function (a) {
      clearTimeout(c);
      c = setTimeout(function () {
        b(a);
      }, 10);
    });
  });
  ["show.bs.collapse", "hide.bs.collapse"].forEach(function (a) {
    document.addEventListener(a, function (b) {
      if ((b = b.target.closest(".navbar-dropdown")))
        "show.bs.collapse" === a
          ? (document.body.classList.add("navbar-dropdown-open"),
            b.classList.add("opened"))
          : (document.body.classList.remove("navbar-dropdown-open"),
            b.classList.remove("opened"),
            window.dispatchEvent(
              new Event("scroll.bs.navbar-dropdown.data-api")
            ),
            b.dispatchEvent(new Event("collapse.bs.navbar-dropdown")));
    });
  });
  document.addEventListener("collapse.bs.nav-dropdown", function (a) {
    (a = a.relatedTarget.closest(".navbar-dropdown")) &&
      (a = a.querySelector('.navbar-toggler[aria-expanded="true"]')) &&
      a.dispatchEvent(new Event("click"));
  });
  document.querySelectorAll(".nav-link.dropdown-toggle").forEach(function (a) {
    a.addEventListener("click", function (a) {
      a.preventDefault();
      a.target.parentNode.classList.toggle("open");
    });
  });
})();
document.querySelectorAll("nav a").forEach(function (a) {
  a.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelectorAll(".navbar-dropdown").forEach(function (dropdown) {
      dropdown.classList.remove("opened");
      dropdown.querySelector(".navbar-collapse").classList.remove("show");
    });
    if (a.target === "_blank") {
      window.open(a.getAttribute("href"), "_blank");
    } else {
      window.location.href = a.getAttribute("href");
    }
  });
});
