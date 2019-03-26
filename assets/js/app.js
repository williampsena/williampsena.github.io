var _extends =
    Object.assign ||
    function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t]
        for (var a in n)
          Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a])
      }
      return e
    },
  _typeof =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(e) {
          return typeof e
        }
      : function(e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e
        }
!(function(e, t) {
  'object' ===
    ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) &&
  'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : (e.LazyLoad = t())
})(this, function() {
  'use strict'
  var c = !('onscroll' in window) || /glebot/.test(navigator.userAgent),
    u = function(e, t) {
      e && e(t)
    },
    h = function(e) {
      return (
        e.getBoundingClientRect().top +
        window.pageYOffset -
        e.ownerDocument.documentElement.clientTop
      )
    },
    v = function(e) {
      return (
        e.getBoundingClientRect().left +
        window.pageXOffset -
        e.ownerDocument.documentElement.clientLeft
      )
    },
    d = function(e, t, n) {
      return !((f = e),
      (m = n),
      ((p = t) === window
        ? window.innerHeight + window.pageYOffset
        : h(p) + p.offsetHeight) <=
        h(f) - m ||
        ((u = e),
        (g = n),
        ((d = t) === window ? window.pageYOffset : h(d)) >=
          h(u) + g + u.offsetHeight) ||
        ((s = e),
        (o = t),
        (l = n),
        (c = window.innerWidth),
        (o === window ? c + window.pageXOffset : v(o) + c) <= v(s) - l) ||
        ((a = e),
        (r = n),
        ((i = t) === window ? window.pageXOffset : v(i)) >=
          v(a) + r + a.offsetWidth))
      var a, i, r, s, o, l, c, u, d, g, f, p, m
    },
    i = function(e, t) {
      var n,
        a = 'LazyLoad::Initialized',
        i = new e(t)
      try {
        n = new CustomEvent(a, {
          detail: {
            instance: i
          }
        })
      } catch (e) {
        ;(n = document.createEvent('CustomEvent')).initCustomEvent(a, !1, !1, {
          instance: i
        })
      }
      window.dispatchEvent(n)
    },
    g = 'data-',
    s = function(e, t) {
      return e.getAttribute(g + t)
    },
    e = function(e, t, n) {
      var a = e.tagName,
        i = s(e, n)
      if ('IMG' === a) {
        !(function(e, t) {
          var n = e.parentNode
          if (!n || 'PICTURE' === n.tagName)
            for (var a = 0; a < n.children.length; a++) {
              var i = n.children[a]
              if ('SOURCE' === i.tagName) {
                var r = s(i, t)
                r && i.setAttribute('srcset', r)
              }
            }
        })(e, t)
        var r = s(e, t)
        return (
          r && e.setAttribute('srcset', r), void (i && e.setAttribute('src', i))
        )
      }
      'IFRAME' !== a
        ? i && (e.style.backgroundImage = 'url("' + i + '")')
        : i && e.setAttribute('src', i)
    },
    t = 'undefined' != typeof window,
    n = t && 'classList' in document.createElement('p'),
    f = function(e, t) {
      n ? e.classList.add(t) : (e.className += (e.className ? ' ' : '') + t)
    },
    r = function(e, t) {
      n
        ? e.classList.remove(t)
        : (e.className = e.className
            .replace(new RegExp('(^|\\s+)' + t + '(\\s+|$)'), ' ')
            .replace(/^\s+/, '')
            .replace(/\s+$/, ''))
    },
    a = function(e) {
      ;(this._settings = _extends(
        {},
        {
          elements_selector: 'img',
          container: window,
          threshold: 300,
          throttle: 150,
          data_src: 'src',
          data_srcset: 'srcset',
          class_loading: 'loading',
          class_loaded: 'loaded',
          class_error: 'error',
          class_initial: 'initial',
          skip_invisible: !0,
          callback_load: null,
          callback_error: null,
          callback_set: null,
          callback_processed: null,
          callback_enter: null
        },
        e
      )),
        (this._queryOriginNode =
          this._settings.container === window
            ? document
            : this._settings.container),
        (this._previousLoopTime = 0),
        (this._loopTimeout = null),
        (this._boundHandleScroll = this.handleScroll.bind(this)),
        (this._isFirstLoop = !0),
        window.addEventListener('resize', this._boundHandleScroll),
        this.update()
    }
  a.prototype = {
    _reveal: function(t) {
      var n = this._settings,
        a = function e() {
          n &&
            (t.removeEventListener('load', i),
            t.removeEventListener('error', e),
            r(t, n.class_loading),
            f(t, n.class_error),
            u(n.callback_error, t))
        },
        i = function e() {
          n &&
            (r(t, n.class_loading),
            f(t, n.class_loaded),
            t.removeEventListener('load', e),
            t.removeEventListener('error', a),
            u(n.callback_load, t))
        }
      u(n.callback_enter, t),
        ('IMG' !== t.tagName && 'IFRAME' !== t.tagName) ||
          (t.addEventListener('load', i),
          t.addEventListener('error', a),
          f(t, n.class_loading)),
        e(t, n.data_srcset, n.data_src),
        u(n.callback_set, t)
    },
    _loopThroughElements: function() {
      var e,
        t,
        n = this._settings,
        a = this._elements,
        i = a ? a.length : 0,
        r = void 0,
        s = [],
        o = this._isFirstLoop
      for (r = 0; r < i; r++) {
        var l = a[r]
        ;(n.skip_invisible && null === l.offsetParent) ||
          ((c || d(l, n.container, n.threshold)) &&
            (o && f(l, n.class_initial),
            this._reveal(l),
            s.push(r),
            (e = 'was-processed'),
            (t = !0),
            l.setAttribute(g + e, t)))
      }
      for (; s.length; ) a.splice(s.pop(), 1), u(n.callback_processed, a.length)
      0 === i && this._stopScrollHandler(), o && (this._isFirstLoop = !1)
    },
    _purgeElements: function() {
      var e = this._elements,
        t = e.length,
        n = void 0,
        a = []
      for (n = 0; n < t; n++) {
        var i = e[n]
        s(i, 'was-processed') && a.push(n)
      }
      for (; 0 < a.length; ) e.splice(a.pop(), 1)
    },
    _startScrollHandler: function() {
      this._isHandlingScroll ||
        ((this._isHandlingScroll = !0),
        this._settings.container.addEventListener(
          'scroll',
          this._boundHandleScroll
        ))
    },
    _stopScrollHandler: function() {
      this._isHandlingScroll &&
        ((this._isHandlingScroll = !1),
        this._settings.container.removeEventListener(
          'scroll',
          this._boundHandleScroll
        ))
    },
    handleScroll: function() {
      var e = this._settings.throttle
      if (0 !== e) {
        var t = Date.now(),
          n = e - (t - this._previousLoopTime)
        n <= 0 || e < n
          ? (this._loopTimeout &&
              (clearTimeout(this._loopTimeout), (this._loopTimeout = null)),
            (this._previousLoopTime = t),
            this._loopThroughElements())
          : this._loopTimeout ||
            (this._loopTimeout = setTimeout(
              function() {
                ;(this._previousLoopTime = Date.now()),
                  (this._loopTimeout = null),
                  this._loopThroughElements()
              }.bind(this),
              n
            ))
      } else this._loopThroughElements()
    },
    update: function() {
      ;(this._elements = Array.prototype.slice.call(
        this._queryOriginNode.querySelectorAll(this._settings.elements_selector)
      )),
        this._purgeElements(),
        this._loopThroughElements(),
        this._startScrollHandler()
    },
    destroy: function() {
      window.removeEventListener('resize', this._boundHandleScroll),
        this._loopTimeout &&
          (clearTimeout(this._loopTimeout), (this._loopTimeout = null)),
        this._stopScrollHandler(),
        (this._elements = null),
        (this._queryOriginNode = null),
        (this._settings = null)
    }
  }
  var o = window.lazyLoadOptions
  return (
    t &&
      o &&
      (function(e, t) {
        var n = t.length
        if (n) for (var a = 0; a < n; a++) i(e, t[a])
        else i(e, t)
      })(a, o),
    a
  )
}),
  (function(e) {
    if ('object' == typeof exports && 'undefined' != typeof module)
      module.exports = e()
    else if ('function' == typeof define && define.amd) define([], e)
    else {
      ;('undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : this
      ).fitvids = e()
    }
  })(function() {
    return (function r(s, o, l) {
      function c(n, e) {
        if (!o[n]) {
          if (!s[n]) {
            var t = 'function' == typeof require && require
            if (!e && t) return t(n, !0)
            if (u) return u(n, !0)
            var a = new Error("Cannot find module '" + n + "'")
            throw ((a.code = 'MODULE_NOT_FOUND'), a)
          }
          var i = (o[n] = {
            exports: {}
          })
          s[n][0].call(
            i.exports,
            function(e) {
              var t = s[n][1][e]
              return c(t || e)
            },
            i,
            i.exports,
            r,
            s,
            o,
            l
          )
        }
        return o[n].exports
      }
      for (
        var u = 'function' == typeof require && require, e = 0;
        e < l.length;
        e++
      )
        c(l[e])
      return c
    })(
      {
        1: [
          function(e, t, n) {
            'use strict'
            var o = [
              'iframe[src*="player.vimeo.com"]',
              'iframe[src*="youtube.com"]',
              'iframe[src*="youtube-nocookie.com"]',
              'iframe[src*="kickstarter.com"][src*="video.html"]',
              'object'
            ]

            function l(e, t) {
              return (
                'string' == typeof e && ((t = e), (e = document)),
                Array.prototype.slice.call(e.querySelectorAll(t))
              )
            }

            function c(e) {
              if (!/fluid-width-video-wrapper/.test(e.parentNode.className)) {
                var t = parseInt(e.getAttribute('width'), 10),
                  n = parseInt(e.getAttribute('height'), 10),
                  a = isNaN(t) ? e.clientWidth : t,
                  i = (isNaN(n) ? e.clientHeight : n) / a
                e.removeAttribute('width'), e.removeAttribute('height')
                var r = document.createElement('div')
                e.parentNode.insertBefore(r, e),
                  (r.className = 'fluid-width-video-wrapper'),
                  (r.style.paddingTop = 100 * i + '%'),
                  r.appendChild(e)
              }
            }

            function u(e) {
              return void 0 === e ? '' : Array.isArray(e) ? e.join() : e
            }
            t.exports = function(e, t) {
              var n
              ;(t = t || {}),
                (n = e = e || 'body'),
                '[object Object]' === Object.prototype.toString.call(n) &&
                  ((t = e), (e = 'body'))
              var a = l(e)
              if (!(a.length < 1)) {
                var i
                if (!document.getElementById('fit-vids-style'))
                  (
                    document.head || document.getElementsByTagName('head')[0]
                  ).appendChild(
                    (((i = document.createElement('div')).innerHTML =
                      '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
                    i.childNodes[1])
                  )
                var r = u(t.players),
                  s = u(o)
                r.length && (s = s + ',' + r),
                  a.forEach(function(e) {
                    l(e, s).forEach(c)
                  })
              }
            }
          },
          {}
        ]
      },
      {},
      [1]
    )(1)
  })
var callback = function() {
  fitvids(), (lazyLoad = newLazyLoad())
  var e = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  )
  0 < e.length &&
    e.forEach(function(r) {
      r.addEventListener('click', function() {
        var e = r.dataset.target,
          t = document.getElementById(e)
        r.classList.toggle('is-active'), t.classList.toggle('is-active')
      }),
        (r.onkeydown = function(e) {
          var t = !1,
            n = !1
          if (
            ('key' in (e = e || window.event)
              ? ((t = 'Enter' == e.key || 'Ent' == e.key),
                (n = 'Escape' == e.key || 'Esc' == e.key))
              : ((t = 13 == e.keyCode), (n = 27 == e.keyCode)),
            t)
          ) {
            var a = r.dataset.target,
              i = document.getElementById(a)
            r.classList.add('is-active'), i.classList.add('is-active')
          }
          if (n) {
            ;(a = r.dataset.target), (i = document.getElementById(a))
            r.classList.remove('is-active'), i.classList.remove('is-active')
          }
        })
    })
  var t = document.getElementById('comments')
  if (t) {
    var n = function(e) {
      1 == isInViewport(t) &&
        (loadComments(), document.removeEventListener('scroll', n, !0))
    }
    document.addEventListener('scroll', n, !0)
  }
  document.querySelectorAll('.kg-gallery-image img').forEach(function(e) {
    var t = e.closest('.kg-gallery-image'),
      n = e.attributes.width.value / e.attributes.height.value
    t.style.flex = n + ' 1 0%'
  })
}

function isInViewport(e) {
  for (
    var t = e.offsetTop,
      n = e.offsetLeft,
      a = e.offsetWidth,
      i = e.offsetHeight;
    e.offsetParent;

  )
    (t += (e = e.offsetParent).offsetTop), (n += e.offsetLeft)
  return (
    t < window.pageYOffset + window.innerHeight &&
    n < window.pageXOffset + window.innerWidth &&
    t + i > window.pageYOffset &&
    n + a > window.pageXOffset
  )
}

function newLazyLoad() {
  return new LazyLoad({
    elements_selector: '.lazyload',
    class_loading: 'loading',
    class_loaded: 'loaded',
    treshold: 100,
    callback_enter: function(e) {
      e.classList.add('loading')
    },
    callback_set: function(e) {
      e.classList.remove('loading'), e.classList.add('loaded')
    }
  })
}

function updateLazyLoad(e) {
  e.update()
}

function addClass(e, t) {
  elements = document.querySelectorAll(e)
  for (var n = 0; n < elements.length; n++) elements[n].classList.add(t)
}

function removeClass(e, t) {
  elements = document.querySelectorAll(e)
  for (var n = 0; n < elements.length; n++) elements[n].classList.remove(t)
}

function loadComments() {
  var e, t
  ;(e = document),
    ((t = e.createElement('script')).src =
      '//' + disqus_shortname + '.disqus.com/embed.js'),
    t.setAttribute('data-timestamp', +new Date()),
    (e.head || e.body).appendChild(t)
}
'complete' === document.readyState ||
('loading' !== document.readyState && !document.documentElement.doScroll)
  ? callback()
  : document.addEventListener('DOMContentLoaded', callback)
