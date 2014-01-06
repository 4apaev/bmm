$ = (function(document, window, $) {

  var node = Node.prototype,
    nodeList = NodeList.prototype,
    forEach = 'forEach',
    trigger = 'trigger',
    each = [][forEach],
    dummy = document.createElement('i');

  nodeList[forEach] = each;

  node.dad = function() {
    return this.parentElement;
  };

  node.attr = function(attr, set) {
    if (!attr) return;
    return set ? this.setAttribute(attr, set) : this.getAttribute(attr);
  };

  node.find = function(s) {
    var r = this.querySelectorAll(s || '☺'),
      length = r.length;
    return length == 1 ? r[0] : r;
  };

  node.html = function(html) {
    if (html) this.innerHTML = html;
    return this.innerHTML;
  };

  node.txt = function(txt) {
    if (txt) this.innerText = txt;
    return this.innerText;
  };

  node.addhtml = function(html, pos) {
    if (html) this.insertAdjacentHTML(pos || 'beforeend', html);
    return this;
  };

  // node.css = function(stl) {

  //   stl = stl || []['slice'].call(this.style);
  //   var type = stl.constructor.name;
  //   if (type === 'String') return this.style[stl];
  //   if (type === 'Array') {
  //     return []['slice'].call(this.style).map(function(val, i) {
  //       var obj = {};
  //       obj[val] = this.style[val];
  //       return obj;
  //     }.bind(this))
  //   }

  //   stl.forEach(function(val, key) { this.style[key] = val}.bind(this);

  //   return this;
  // };

  window.on = node.on = function(event, fn) {
    this.addEventListener(event, fn, false);
    return this;
  };

  nodeList.on = function(event, fn) {
    this[forEach](function(el) {
      el.on(event, fn);
    });
    return this;
  };

  window.off = node.off = function(event, fn) {
    this.removeEventListener(event, fn, false);
    return this;
  };

  nodeList.off = function(event, fn) {
    this[forEach](function(el) {
      el.off(event, fn);
    });
    return this;
  };

  window[trigger] = node[trigger] = function(type, data) {

    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };

  nodeList[trigger] = function(event) {
    this[forEach](function(el) {
      el[trigger](event);
    });
    return this;
  };

  $ = function(s) {

    var r = document.querySelectorAll(s || '☺'),
      length = r.length;
    return length == 1 ? r[0] : r;
  };

  $.on = node.on.bind(dummy);
  $[trigger] = node[trigger].bind(dummy);
  $.do = document.createElement.bind(document);

  return $;
})(document, this);
