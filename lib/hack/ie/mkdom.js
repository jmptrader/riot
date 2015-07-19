
/**
 * hack/ie/mkdom.js
 *
 * Hacks needed for the old internet explorer versions [lower than IE10]
 */

!(function () {

  var ver = riot.hack.ieVersion

  if (ver && ver < 10) {

    riot.hack.mkdom = function(el, template, tagName) {

      var fn =
        (tagName === 'optgroup')  ? optgroupInnerHTML :
        (tagName === 'option')    ? optionInnerHTML :
        (el.nodeName === 'TBODY') ? tbodyInnerHTML : 0

      if (fn)
        fn(el, template, tagName)
      else
        el.innerHTML = template
    }
  }

  // create <tr|th|td> element

  /* istanbul ignore next */
  function tbodyInnerHTML(el, html, tagName) {

    var div = mkEl('div'),
        child

    div.innerHTML = '<table>' + html + '</table>'

    child = div.getElementsByTagName(tagName)[0]
    if (child)
      el.appendChild(child)
  }

  // <option value="v">text

  /* istanbul ignore next */
  function optionInnerHTML(el, html, tagName) {

    var match = html.match(/<(\w+)\s*([^>]*)>(.*)(?:<\/\1\b)?/i),
        opt = mkEl(tagName)

    setAttributes(opt, match[2])

    opt.innerHTML = match[3].trim()

    el.appendChild(opt)
  }

  // <optgroup id="id1" label="foo">
  //   <option value="v1">text1
  //   <option value="v2">text2
  // </optgroup>

  /* istanbul ignore next */
  function optgroupInnerHTML(el, html, tagName) {

    var match = html.match(/<(\w+)\s*([^>]*)>([\s\S]*)<\/\1\s*>/i),
        grp = mkEl(tagName)

    if (match) {

      match[2] && setAttributes(grp, match[2])

      match[3].replace(/<(option)\b[^>]*>.*(?:<\/\1\b)?/gi,
        function (m) {
          optionInnerHTML(grp, m.trim(), 'option')
        })
    }

    return el.appendChild(grp)
  }

  // Set the attributes on 'html' to the `el` element

  // this regexp will be in shared/regexps.js
  var attrInfo = { 'selected': 0, 'disabled': 0, 'label': 1 }

  function setAttributes(el, str) {

    walkAttributes(html, function (att, v) {
      if (attr === 'value')
        el.value = v

      else {
        if (v[0] === '{' && attr in attrInfo)
            attr = (attrInfo[attr] ? RIOT_PREFIX : '__') + attr
        el.setAttribute(attr, v)
      }
    })
  }

})()

// eof hack/ie/mkdom.js
