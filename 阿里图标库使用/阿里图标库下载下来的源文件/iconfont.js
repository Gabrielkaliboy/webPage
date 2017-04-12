;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-fanhuidingbu" viewBox="0 0 1026 1024">' +
    '' +
    '<path d="M512.750933 73.045333c241.732267 0 439.5008 197.2224 439.5008 438.272s-197.802667 438.237867-439.5008 438.237867c-241.732267 0-439.5008-197.188267-439.5008-438.237867S271.018667 73.045333 512.750933 73.045333M512.750933 0C227.054933 0 0 233.745067 0 511.317333c0 277.538133 227.054933 511.2832 512.750933 511.2832 285.696 0 512.7168-226.4064 512.7168-511.2832C1025.467733 226.4064 798.446933 0 512.750933 0L512.750933 0zM563.985067 803.464533 563.985067 409.019733l175.8208 175.342933 65.911467-73.045333-292.9664-292.181333-293.000533 292.181333 65.9456 73.045333 175.752533-175.342933 0 394.4448L563.985067 803.464533z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xinfeng" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1021.866667 300C1024 290.4 1023.2 280.533333 1016.533333 272.533333 1015.466667 271.466667 1013.333333 271.733333 1012 270.4 1000.8 244.533333 981.066667 226.666667 944 226.666667L112 226.666667c-39.466667 0-82.133333 15.2-101.333333 44.533333C9.866667 272 8.533333 272 7.733333 272.533333 1.066667 280.533333 0 290.4 1.866667 299.733333 1.6 302.133333 0 304 0 306.666667l0 512C0 872 58.933333 930.666667 112 930.666667l832 0c53.066667 0 80.266667-58.933333 80.266667-112L1024.266667 306.666667C1024.266667 303.733333 1022.133333 302.666667 1021.866667 300zM928 290.666667l16 0c0.266667 0 0.266667 0 0.533333 0L512 635.466667 81.333333 292C91.2 290.133333 103.2 290.666667 112 290.666667L928 290.666667zM944 866.666667 112 866.666667c-17.6 0-48-30.133333-48-48l0-458.666667 427.2 341.333333C497.066667 706.666667 504.533333 709.333333 512 709.333333c7.466667 0 14.933333-2.666667 21.066667-7.733333l427.2-341.333333 0 458.666667C960.266667 836.533333 961.6 866.666667 944 866.666667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)