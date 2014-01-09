$ = (function(document, window, $) {

  var
    node     = Node.prototype,
    nodeList = NodeList.prototype,
    dummy    = document.createElement('i'),
    doq = function(query, scope) {
      var ok = !/[\s,:]/.test(query);
      return (scope ? scope : document)[(ok ? {
                   '#': 'getElementById'
                  ,'.': 'getElementsByClassName'
                  ,'@': 'getElementsByName'
                  ,'=': 'getElementsByTagName'
                }[query[0]] : 'querySelectorAll')](ok ? query.slice(1) : query);
    },

    doqa = function(query, scope) {return (scope ? scope : document).querySelectorAll(query) },
    doqi = function(query, scope) {return (scope ? scope : document).getElementById(query) },
    doqc = function(query, scope) {return (scope ? scope : document).getElementsByClassName(query) },
    doqt = function(query, scope) {return (scope ? scope : document).getElementsByTagName(query) },
    doqn = function(query, scope) {return (scope ? scope : document).getElementsByName(query) },
    dq   = function(query, scope) {return (scope ? scope : document).querySelector(query) };

  nodeList['forEach'] = nodeList['each'] = []['forEach'];

  window.on = node.on = function(event, fn) {
    this.addEventListener(event, fn, false);
    return this;
  };
  nodeList.on = function(event, fn) {
    this['forEach'](function(el) {
      el.on(event, fn);
    });
    return this;
  };
  window.off = node.off = function(event, fn) {
    this.removeEventListener(event, fn, false);
    return this;
  };
  nodeList.off = function(event, fn) {
    this['forEach'](function(el) {
      el.off(event, fn);
    });
    return this;
  };
  window['trigger'] = node['trigger'] = function(type, data) {

    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
  };

  nodeList['trigger'] = function(event) {
    this['forEach'](function(el) {
      el['trigger'](event);
    });
    return this;
  };

  node.dad = function() {
    return this.parentElement;
  };

  node.attr = function(val, key) {
    return key ? this.setAttribute(key, val) : this.getAttribute(val);
  };

  node.attrs = function(data) {
    Object.keys(data).forEach(function(val, key){
      this.attr(data[val], val);
    }.bind(this));
  };


  node.html = function(html) {
    if (html) this.innerHTML = html;
    return this.innerHTML;
  };

  node.empty = function() {
    return this.innerHTML = '';
  };

  node.edit = function(mode) {
    this.attr(true, "contenteditable");
  };

  node.hide = function() {
    this.style.display = 'none';
  };

  node.show = function() {
    this.classList.toggle('show');
  };

  node.txt = function(txt) {
    if (txt) this.innerText = txt;
    return this.innerText;
  };

  node.addhtml = function(html, pos) {
    if (html) this.insertAdjacentHTML(pos || 'beforeend', html);
    return this;
  };

  node.before = function(elm) {
    this.insertBefore(elm, this.firstChild);
  };

  node.after = function(elm) {
    this.insertBefore(elm);
  };

  node.append = function(elm) {
    this.appendChild(elm);
  };
  $ = doq;
  $.doqi = doqi;
  $.doqc = doqc;
  $.doqt = doqt;
  $.doqn = doqn;
  $.doqa = doqa;
  $.dq = dq;
  $.tar = function(o) { return []['slice'].call(o) };

  $.on = node.on.bind(dummy);
  $['trigger'] = node['trigger'].bind(dummy);
  $.do = document.createElement.bind(document);

  return $;
})(document, this);
