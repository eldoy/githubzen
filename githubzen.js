// ==UserScript==
// @name         GithubZen
// @namespace    https://github.com/
// @version      0.1
// @description  Get rid of annoying things on Github
// @author       Vidar Eldøy <vidar@eldoy.com>
// @match        https://github.com/**/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

;(function () {
  var ss = ['#repos-sticky-header', '#symbols-pane', '.gvCnwW']
  var q = (s) => document.querySelector(s)

  function transform() {
    var path = window.location.pathname

    if (/^\/.+?\/.+?\/tree|blob\/.*\/.*$/.test(path)) {
      var content = q('.repository-content')
      if (!content) return window.location.reload(true)
      if (content) {
        content.style.maxWidth = '768px'
        content.style.margin = '0 auto'
      }
      for (var s of ss) {
        var el = q(s)
        if (el) el.remove()
      }
      var files = q('section[aria-labelledby="file-name-id"]')
      if (files) {
        files.style.marginTop = 0
        var p = files.parentNode
        p.style.overflow = 'hidden'
        p.style.borderTop = '1px solid rgb(208, 215, 222)'
        p.style.borderRadius = '6px'
      }
    }
    setTimeout(transform, 100)
  }
  transform()
})()
