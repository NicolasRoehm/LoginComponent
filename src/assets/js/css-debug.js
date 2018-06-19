var CssDebug = (function() {

  CssDebug.boxvis;
  CssDebug.latestInfo;
  CssDebug.scrollTimeout = null;
  CssDebug.scrollendDelay = 250; // ms
  CssDebug.query = {};

  function CssDebug() {
  }

  CssDebug.readQueryString = function () {
    var scripts = document.getElementsByTagName('script');
    var myScript = scripts[scripts.length - 1];
    var qs = myScript.src.replace(/^[^\?]+\??/,'');

    var vars = qs.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      CssDebug.query[decodeURIComponent(pair[0])] = pair.length > 1 ? decodeURIComponent(pair[1]) : true;
    }
  }

  CssDebug.addEvent = function (obj, type, fn) {
    if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type + fn] = function(){
        obj['e' + type + fn](window.event);
      }
      obj.attachEvent('on' + type, obj[type + fn]);
    } else {
      obj.addEventListener(type, fn, false);
    }
  }

  CssDebug.removeEvent = function (obj, type, fn) {
    if (obj.detachEvent) {
      obj.detachEvent('on' + type, obj[type + fn]);
      obj[type + fn] = null;
    } else {
      obj.removeEventListener(type, fn, false);
    }
  }

  CssDebug.addStyleElement = function (css) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  CssDebug.getStyleValue = function (style, value) {
    return parseFloat(style[value]);
  }

  CssDebug.getElementInfo = function (element) {
    var styles = window.getComputedStyle(element);

    var className = "";
    if(!(typeof SVGAnimatedString) && element.className)
      className = "." + element.className.replace(/\s/g, '.');

    return {
      element: element,
      tagName: element.tagName,
      selectors: {
        id: element.id ? "#" + element.id : "",
        className: className
      },
      box: element.getBoundingClientRect(),
      margin: {
        top: CssDebug.getStyleValue(styles, 'margin-top'),
        right: CssDebug.getStyleValue(styles, 'margin-right'),
        bottom: CssDebug.getStyleValue(styles, 'margin-bottom'),
        left: CssDebug.getStyleValue(styles, 'margin-left')
      },
      border: {
        top: CssDebug.getStyleValue(styles, 'border-top-width'),
        right: CssDebug.getStyleValue(styles, 'border-right-width'),
        bottom: CssDebug.getStyleValue(styles, 'border-bottom-width'),
        left: CssDebug.getStyleValue(styles, 'border-left-width')
      },
      padding: {
        top: CssDebug.getStyleValue(styles, 'padding-top'),
        right: CssDebug.getStyleValue(styles, 'padding-right'),
        bottom: CssDebug.getStyleValue(styles, 'padding-bottom'),
        left: CssDebug.getStyleValue(styles, 'padding-left')
      }
    };
  }

  CssDebug.mouseHandler = function (e) {
    CssDebug.clearScrollTimer();

    var info = CssDebug.getElementInfo(e.target);
    CssDebug.latestInfo = info;
    CssDebug.showInfo(info);
  }

  CssDebug.mouseOutHandler = function (e) {
    CssDebug.hideBoxVis();
  }

  CssDebug.scrollHandler = function (e) {
    if (!CssDebug.scrollTimeout) {
      CssDebug.onScrollStart();
    }

    CssDebug.scrollTimeout = setTimeout(onScrollEnd, CssDebug.scrollendDelay);
  }

  CssDebug.clearScrollTimer = function () {
    clearTimeout(CssDebug.scrollTimeout);
    CssDebug.scrollTimeout = null;
  }

  CssDebug.onScrollStart = function () {
    CssDebug.hideBoxVis();
  }

  CssDebug.onScrollEnd = function () {
    CssDebug.clearScrollTimer();
    if (CssDebug.latestInfo) {
      CssDebug.latestInfo.box = CssDebug.latestInfo.element.getBoundingClientRect();
      CssDebug.showInfo(CssDebug.latestInfo);
    }
  }

  CssDebug.hideBoxVis = function () {
    CssDebug.boxvis.tooltip.style.display = 'none';

    CssDebug.boxvis.margin.horizontal.removeAttribute("style");
    CssDebug.boxvis.margin.vertical.removeAttribute("style");
    CssDebug.boxvis.margin.inner.style.display = 'none';

    CssDebug.boxvis.border.horizontal.removeAttribute("style");
    CssDebug.boxvis.border.vertical.removeAttribute("style");
    CssDebug.boxvis.border.inner.style.display = 'none';

    CssDebug.boxvis.padding.horizontal.removeAttribute("style");
    CssDebug.boxvis.padding.vertical.removeAttribute("style");
    CssDebug.boxvis.padding.inner.style.display = 'none';

    CssDebug.boxvis.box.horizontal.removeAttribute("style");
    CssDebug.boxvis.box.vertical.removeAttribute("style");
    CssDebug.boxvis.box.inner.style.display = 'none';
  }

  CssDebug.showInfo = function (info) {
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // tooltip
    var tagName = '<span class="t">' + info.tagName.toLowerCase() + '</span>';
    var idSelector = '<span class="i">' + info.selectors.id.toLowerCase() + '</span>';
    var classSelector = '<span class="c">' + info.selectors.className.toLowerCase() + '</span>';
    var dimensions = '<span class="d"> | ' + (Math.round(info.box.width * 100) / 100) + ' x ' + (Math.round(info.box.height * 100) / 100) + '</span>';
    var information = tagName + idSelector + classSelector + dimensions;

    CssDebug.boxvis.tooltip.style.display = 'block';
    CssDebug.boxvis.tooltip.innerHTML = information;
    var tooltipBox = CssDebug.boxvis.tooltip.getBoundingClientRect();

    var tooltipTop = info.box.top - 30;
    CssDebug.boxvis.tooltip.classList.remove('top');
    if (tooltipTop < 0) {
      CssDebug.boxvis.tooltip.classList.add('top');

      tooltipTop = info.box.bottom + 6;

      if (tooltipTop + 30 > windowHeight) {
        tooltipTop = 6;
      }
    }

    var tooltipLeft = info.box.left + 2;
    CssDebug.boxvis.tooltip.classList.remove('right');
    if (tooltipLeft < 0) {
      tooltipLeft = 2;
    } else {
      if (tooltipLeft + tooltipBox.width > windowWidth) {
        CssDebug.boxvis.tooltip.classList.add('right');
        tooltipLeft = windowWidth - tooltipBox.width - 2;
      }
    }

    CssDebug.boxvis.tooltip.style.top = tooltipTop + 'px';
    CssDebug.boxvis.tooltip.style.left = tooltipLeft + 'px';


    // margin
    CssDebug.boxvis.margin.horizontal.style.top = (info.box.top - info.margin.top) + 'px';
    CssDebug.boxvis.margin.horizontal.style.height = (info.box.height + info.margin.top + info.margin.bottom) + 'px';

    CssDebug.boxvis.margin.vertical.style.left = (info.box.left - info.margin.left) + 'px';
    CssDebug.boxvis.margin.vertical.style.width = (info.box.width + info.margin.left + info.margin.right) + 'px';

    CssDebug.boxvis.margin.inner.style.display = 'block';
    CssDebug.boxvis.margin.inner.style.top = (info.box.top - info.margin.top) + 'px';
    CssDebug.boxvis.margin.inner.style.left = (info.box.left - info.margin.left) + 'px';
    CssDebug.boxvis.margin.inner.style.height = (info.box.height + info.margin.top + info.margin.bottom) + 'px';
    CssDebug.boxvis.margin.inner.style.width = (info.box.width + info.margin.left + info.margin.right) + 'px';


    // border
    CssDebug.boxvis.border.horizontal.style.top = (info.box.top) + 'px';
    CssDebug.boxvis.border.horizontal.style.height = info.box.height + 'px';

    CssDebug.boxvis.border.vertical.style.left = (info.box.left) + 'px';
    CssDebug.boxvis.border.vertical.style.width = info.box.width + 'px';

    CssDebug.boxvis.border.inner.style.display = 'block';
    CssDebug.boxvis.border.inner.style.top = (info.box.top) + 'px';
    CssDebug.boxvis.border.inner.style.left = (info.box.left) + 'px';
    CssDebug.boxvis.border.inner.style.height = info.box.height + 'px';
    CssDebug.boxvis.border.inner.style.width = info.box.width + 'px';


    // padding
    CssDebug.boxvis.padding.horizontal.style.top = (info.box.top + info.border.top) + 'px';
    CssDebug.boxvis.padding.horizontal.style.height = (info.box.height - info.border.top- info.border.bottom) + 'px';

    CssDebug.boxvis.padding.vertical.style.left = (info.box.left + info.border.left) + 'px';
    CssDebug.boxvis.padding.vertical.style.width = (info.box.width - info.border.left - info.border.right) + 'px';

    CssDebug.boxvis.padding.inner.style.display = 'block';
    CssDebug.boxvis.padding.inner.style.top = (info.box.top + info.border.top) + 'px';
    CssDebug.boxvis.padding.inner.style.left = (info.box.left + info.border.left) + 'px';
    CssDebug.boxvis.padding.inner.style.height = (info.box.height - info.border.top - info.border.bottom) + 'px';
    CssDebug.boxvis.padding.inner.style.width = (info.box.width - info.border.left - info.border.right) + 'px';


    // box
    CssDebug.boxvis.box.horizontal.style.top = (info.box.top + info.border.top + info.padding.top) + 'px';
    CssDebug.boxvis.box.horizontal.style.height = (info.box.height - info.border.top - info.border.bottom - info.padding.top - info.padding.bottom) + 'px';

    CssDebug.boxvis.box.vertical.style.left = (info.box.left + info.border.left + info.padding.left) + 'px';
    CssDebug.boxvis.box.vertical.style.width = (info.box.width - info.border.left - info.border.right - info.padding.left - info.padding.right) + 'px';

    CssDebug.boxvis.box.inner.style.display = 'block';
    CssDebug.boxvis.box.inner.style.top = (info.box.top + info.border.top + info.padding.top) + 'px';
    CssDebug.boxvis.box.inner.style.left = (info.box.left + info.border.left + info.padding.left) + 'px';
    CssDebug.boxvis.box.inner.style.height = (info.box.height - info.border.top - info.border.bottom - info.padding.top - info.padding.bottom) + 'px';
    CssDebug.boxvis.box.inner.style.width = (info.box.width - info.border.left - info.border.right - info.padding.left - info.padding.right) + 'px';
  }

  CssDebug.AddOutliners = function () {
    var styles = '.boxvis > div > div{pointer-events:none;position:fixed;z-index:2147483637;top:-10px;bottom:-10px;left:-10px;right:-10px}.boxvis:not(.noln) > div > div{border-width:1px;border-style:dashed}.boxvis > .mg > div{border-color:#e67700}.boxvis > .bd > div{border-color:#dcdc40}.boxvis > .pd > div{border-color:#00bb20}.boxvis > .bx > div{border-color:#0000e6}.boxvis > div > .o{z-index:2147483638;border:none;display:none}.boxvis:not(.nobg) > .mg > .o{background-color:rgba(255,153,0,0.125)}.boxvis:not(.nobg) > .pd > .o{background-color:rgba(0,140,64,0.125)}.boxvis:not(.nobg) > .bd > .o{background-color:rgba(255,255,0,0.125)}.boxvis:not(.nobg) > .bx > .o{background-color:rgba(0,100,255,0.35)}.boxvis > .i{box-shadow:0 0 4px -1px rgba(255,255,255,1);pointer-events:none;position:fixed;z-index:2147483638;background-color:#000;font-size:12px;padding:3px 8px 5px 10px;border-radius:4px;white-space:nowrap;display:none}.boxvis > .i:before{content:"";position:absolute;top:100%;left:10px;border:solid 6px transparent;border-top-color:#000}.boxvis > .i.top:before{top:-12px;border:solid 6px transparent;border-top-color:transparent;border-bottom-color:#000}.boxvis > .i.right:before{left:auto;right:10px}.boxvis > .i > .t{color:#FF74FF;font-weight:700}.boxvis > .i > .i{color:#FFB952}.boxvis > .i > .c{color:#75CFFF}.boxvis > .i > .d{font-size:10px;margin-left:3px;color:#CCC}';
    CssDebug.addStyleElement(styles);

    var html = '<div class="mg"><div class="h"></div><div class="v"></div><div class="o"></div></div><div class="bd"><div class="h"></div><div class="v"></div><div class="o"></div></div><div class="pd"><div class="h"></div><div class="v"></div><div class="o"></div></div><div class="bx"><div class="h"></div><div class="v"></div><div class="o"></div></div><div class="i"></div>';

    var outlinerContainer = document.createElement('div');
    outlinerContainer.className = 'boxvis' + (CssDebug.query.noln ? ' noln' : '') + (CssDebug.query.nobg ? ' nobg' : '');
    document.body.appendChild(outlinerContainer);

    outlinerContainer.innerHTML = html;
    var addedElements = outlinerContainer.childNodes;
    CssDebug.boxvis = {
      margin: {
        horizontal: addedElements[0].childNodes[0],
        vertical: addedElements[0].childNodes[1],
        inner: addedElements[0].childNodes[2]
      },
      border: {
        horizontal: addedElements[1].childNodes[0],
        vertical: addedElements[1].childNodes[1],
        inner: addedElements[1].childNodes[2]
      },
      padding: {
        horizontal: addedElements[2].childNodes[0],
        vertical: addedElements[2].childNodes[1],
        inner: addedElements[2].childNodes[2]
      },
      box: {
        horizontal: addedElements[3].childNodes[0],
        vertical: addedElements[3].childNodes[1],
        inner: addedElements[3].childNodes[2]
      },
      tooltip: addedElements[4]
    };
  }

  return CssDebug;

  //TODO: keyboard commands (arrow keys move from element to element)
  //  up: parent, down: first child
  //  left, right: siblings

  //TODO: Figure out how to support :before and :after pseudo elements
  // currently seems to think the mouseover is on the element, and not its :before / :after
  //  I can check if the mouse position is or is not within the element, but sometimes, the pseudo is within the element.

  // readQueryString();
  // AddOutliners();
  // addEvent(document.body, 'mouseover', mouseHandler);
  // addEvent(window, 'scroll', scrollHandler);
  // addEvent(document.body, 'mouseout', mouseOutHandler);
}());