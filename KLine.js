(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["KLine"] = factory();
	else
		root["KLine"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(2)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = draw;
exports.computAxis = computAxis;
var lastStartIndex = -1;
var lastEndIndex = -1;
var lastVerticalRectNumber = -1;
function draw(flag) {
    if (this.isDraw) {
        return;
    }
    if (lastStartIndex === this.state.startIndex && lastEndIndex === this.state.endIndex && lastVerticalRectNumber === this.state.verticalRectNumber && !flag) {
        return;
    }
    this.isDraw = true;
    this.state.yaxis = computAxis.call(this);
    this.ctx.clearRect(0, 0, this.width, this.height);
    drawBackground.call(this);
    drawKLine.call(this);
    if (this.option.csi2.length > 0) {
        this.drawCsi();
    }
    this.isDraw = false;
    lastStartIndex = this.state.startIndex;
    lastEndIndex = this.state.endIndex;
    lastVerticalRectNumber = this.state.verticalRectNumber;
}

function drawKLine() {
    var ctx = this.ctx;
    var theme = this.option.theme;

    var times = this.state.times;
    var timeStr = this.state.timeStr;
    var start = this.state.start;
    var hi = this.state.hi;
    var lo = this.state.lo;
    var close = this.state.close;

    var _state$yaxis = this.state.yaxis,
        max = _state$yaxis.max,
        min = _state$yaxis.min,
        maxPrice = _state$yaxis.maxPrice,
        maxPriceIndex = _state$yaxis.maxPriceIndex,
        minPrice = _state$yaxis.minPrice,
        minPriceIndex = _state$yaxis.minPriceIndex,
        intervalY = _state$yaxis.intervalY;


    var view1 = this.views[0];
    var view2 = this.views[1];
    var view3 = this.views[2];

    ctx.fillStyle = this.colors.textColor;
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var lengthY = (max - min) / intervalY;
    for (var i = 0; i < lengthY; i++) {
        ctx.fillText(this.option.priceFilter(max - i * intervalY), view2.x + view2.w * 0.5, i * intervalY / (max - min) * view2.h + view2.y);

        var x = view2.x;
        var y = i * intervalY / (max - min) * view2.h + view2.y;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    ctx.lineWidth = this.dpr;
    ctx.setLineDash([]);
    ctx.strokeStyle = this.colors.textColor;
    for (var _i = 0; _i < lengthY; _i++) {
        var _x = view2.x;
        var _y = _i * intervalY / (max - min) * view2.h + view2.y;
        ctx.beginPath();
        ctx.moveTo(_x + 10, _y);
        ctx.lineTo(_x, _y);
        ctx.stroke();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var _i2 = 1; _i2 < 5; _i2++) {
        var _index = _i2 / 5 * this.state.verticalRectNumber + this.state.startIndex;
        if (_index >= times.length) {
            break;
        }
        var _x2 = view1.x + view1.w * _i2 / 5;
        var _y2 = (this.height + view3.y + view3.h) * 0.5;
        ctx.fillText(timeStr[_i2], _x2, _y2);

        ctx.beginPath();
        ctx.moveTo(_x2, this.height - 2);
        ctx.lineTo(_x2, this.height - 8);
        ctx.stroke();
    }

    ctx.strokeStyle = this.colors.redColor;
    ctx.fillStyle = this.colors.redColor;
    for (var _i3 = this.state.startIndex, j = 0; _i3 < this.state.endIndex; _i3++, j++) {
        if (_i3 >= times.length) {
            break;
        }
        if (close[_i3] <= start[_i3]) {
            var _x3 = (j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
            var _y3 = (max - Math.max(start[_i3], close[_i3])) / (max - min) * view1.h + view1.y;
            var w = view1.w / this.state.verticalRectNumber * 0.8;
            var h = (Math.max(start[_i3], close[_i3]) - Math.min(start[_i3], close[_i3])) / (max - min) * view1.h;
            ctx.fillRect(_x3, _y3, w, h < this.dpr ? this.dpr : h);
            var x1 = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            var y1 = (max - hi[_i3]) / (max - min) * view1.h + view1.y;
            var x2 = x1;
            var y2 = (max - lo[_i3]) / (max - min) * view1.h + view1.y;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    ctx.strokeStyle = this.colors.greenColor;
    ctx.fillStyle = this.colors.greenColor;
    for (var _i4 = this.state.startIndex, _j = 0; _i4 < this.state.endIndex; _i4++, _j++) {
        if (_i4 >= times.length) {
            break;
        }
        if (close[_i4] > start[_i4]) {
            var _x4 = (_j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
            var _y4 = (max - Math.max(start[_i4], close[_i4])) / (max - min) * view1.h + view1.y;
            var _w = view1.w / this.state.verticalRectNumber * 0.8;
            var _h = (Math.max(start[_i4], close[_i4]) - Math.min(start[_i4], close[_i4])) / (max - min) * view1.h;
            ctx.fillRect(_x4, _y4, _w, _h < this.dpr ? this.dpr : _h);
            var _x5 = _j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            var _y5 = (max - hi[_i4]) / (max - min) * view1.h + view1.y;
            var _x6 = _x5;
            var _y6 = (max - lo[_i4]) / (max - min) * view1.h + view1.y;
            ctx.beginPath();
            ctx.moveTo(_x5, _y5);
            ctx.lineTo(_x6, _y6);
            ctx.stroke();
        }
    }

    if (this.option.csi === 'ma') {
        // ma30
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma30Color;
        for (var _i5 = this.state.startIndex, _j2 = 0; _j2 < this.state.verticalRectNumber; _i5++, _j2++) {
            if (_i5 >= this.state.times.length) {
                break;
            }
            var _x7 = _j2 * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            var _y7 = (max - this.state.ma30[_i5]) / (max - min) * view1.h + view1.y;
            if (_j2 == 0) {
                ctx.moveTo(_x7, _y7);
            }
            ctx.lineTo(_x7, _y7);
        }
        ctx.stroke();

        // ma7
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma7Color;
        for (var _i6 = this.state.startIndex, _j3 = 0; _j3 < this.state.verticalRectNumber; _i6++, _j3++) {
            if (_i6 >= this.state.times.length) {
                break;
            }
            var _x8 = _j3 * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            var _y8 = (max - this.state.ma7[_i6]) / (max - min) * view1.h + view1.y;
            if (_j3 == 0) {
                ctx.moveTo(_x8, _y8);
            }
            ctx.lineTo(_x8, _y8);
        }
        ctx.stroke();
    } else if (this.option.csi === 'ema') {
        // ema30
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma30Color;
        for (var _i7 = this.state.startIndex, _j4 = 0; _j4 < this.state.verticalRectNumber; _i7++, _j4++) {
            if (_i7 >= this.state.times.length) {
                break;
            }
            var _x9 = _j4 * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            var _y9 = (max - this.state.ema30[_i7]) / (max - min) * view1.h + view1.y;
            if (_j4 == 0) {
                ctx.moveTo(_x9, _y9);
            }
            ctx.lineTo(_x9, _y9);
        }
        ctx.stroke();

        // ema7
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma7Color;
        for (var _i8 = this.state.startIndex, _j5 = 0; _j5 < this.state.verticalRectNumber; _i8++, _j5++) {
            if (_i8 >= this.state.times.length) {
                break;
            }
            var _x10 = _j5 * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            var _y10 = (max - this.state.ema7[_i8]) / (max - min) * view1.h + view1.y;
            if (_j5 == 0) {
                ctx.moveTo(_x10, _y10);
            }
            ctx.lineTo(_x10, _y10);
        }
        ctx.stroke();
    }

    // 画最高点，最低点
    ctx.fillStyle = this.colors.textColor;
    ctx.textBaseline = 'middle';
    var index = maxPriceIndex - this.state.startIndex;
    var index1 = minPriceIndex - this.state.startIndex;
    var maxX = view1.w / this.state.verticalRectNumber * 0.5 + (index + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
    var maxY = (max - maxPrice) / (max - min) * view1.h + view1.y;
    var minX = view1.w / this.state.verticalRectNumber * 0.5 + (index1 + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
    var minY = (max - minPrice) / (max - min) * view1.h + view1.y;
    if (index < this.state.verticalRectNumber * 0.5) {
        ctx.textAlign = 'left';
        ctx.fillText(' ← ' + maxPrice, maxX, maxY);
    } else {
        ctx.textAlign = 'right';
        ctx.fillText(maxPrice + ' → ', maxX, maxY);
    }
    if (index1 < this.state.verticalRectNumber * 0.5) {
        ctx.textAlign = 'left';
        ctx.fillText(' ← ' + minPrice, minX, minY);
    } else {
        ctx.textAlign = 'right';
        ctx.fillText(minPrice + ' → ', minX, minY);
    }

    // 当前价格
    ctx.textAlign = 'left';
    ctx.fillStyle = this.colors.currentTextColor;
    ctx.fillText(' ← ' + close[close.length - 1], view1.x + view1.w, (max - close[close.length - 1]) / (max - min) * view1.h + view1.y);
}

function drawBackground() {
    var ctx = this.ctx;
    var theme = this.option.theme;
    ctx.lineWidth = this.dpr;
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, this.width, this.height);

    var marginTop = 0;
    // 垂直分割线
    ctx.strokeStyle = this.colors.splitLine;
    ctx.beginPath();
    ctx.moveTo(this.views[1].x, 0);
    ctx.lineTo(this.views[3].x, this.views[3].y + this.views[3].h + marginTop);
    ctx.stroke();
    if (theme === 'dark') {
        ctx.fillStyle = this.colors.timeBackground;
        ctx.fillRect(0, this.views[2].y + marginTop + this.views[2].h, this.width, this.height);
    } else {
        ctx.beginPath();
        ctx.moveTo(0, this.views[2].y + this.views[2].h + marginTop);
        ctx.lineTo(this.views[3].x + this.views[3].w, this.views[2].y + this.views[2].h + marginTop);
        ctx.stroke();
    }

    // 画分割线
    if (this.option.csi2.length > 0) {
        ctx.strokeStyle = this.colors.splitLine;
        ctx.beginPath();
        ctx.moveTo(0, (this.views[0].h + this.views[0].y + this.views[2].y) * 0.5);
        ctx.lineTo(this.width, (this.views[0].h + this.views[0].y + this.views[2].y) * 0.5);
        ctx.stroke();
    }
}

function computAxis() {
    var start = this.state.start;
    var hi = this.state.hi;
    var lo = this.state.lo;
    var close = this.state.close;
    var ma30 = this.state.ma30;
    var ma7 = this.state.ma7;
    var ema30 = this.state.ema30;
    var ema7 = this.state.ema7;
    var startIndex = this.state.startIndex;
    var endIndex = this.state.endIndex;
    var maxY = -99999;
    var minY = 99999;
    var maxPrice = -99999;
    var minPrice = 99999;
    var maxPriceIndex = -1;
    var minPriceIndex = -1;
    for (var i = startIndex; i < endIndex; i++) {
        if (i < startIndex || i >= endIndex) {
            return;
        }
        var maxVal = Math.max(start[i], hi[i], lo[i], close[i], ma30[i], ma7[i], ema30[i], ema7[i]);
        var minVal = Math.min(start[i], hi[i], lo[i], close[i], ma30[i], ma7[i], ema30[i], ema7[i]);
        maxY = maxVal > maxY ? maxVal : maxY;
        minY = minVal < minY ? minVal : minY;
        var maxPriceVal = hi[i];
        var minPriceVal = lo[i];
        if (maxPriceVal > maxPrice) {
            maxPriceIndex = i;
            maxPrice = maxPriceVal;
        }
        if (minPriceVal < minPrice) {
            minPriceIndex = i;
            minPrice = minPriceVal;
        }
    }
    var n = (maxY - minY).toFixed(0).length;
    var intervalY = Math.ceil((maxY - minY) * 0.2 / Math.pow(10, n - 1)) * Math.pow(10, n - 1);
    return {
        maxY: maxY,
        minY: minY,
        maxPrice: maxPrice,
        maxPriceIndex: maxPriceIndex,
        minPrice: minPrice,
        minPriceIndex: minPriceIndex,
        max: maxY + 2 * intervalY - maxY % intervalY,
        min: minY - minY % intervalY - intervalY,
        intervalY: intervalY
    };
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(3)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(27)
  , hide      = __webpack_require__(31)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(24)
  , IE8_DOM_DEFINE = __webpack_require__(32)
  , toPrimitive    = __webpack_require__(43)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(33)
  , defined = __webpack_require__(6);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Depth;
function Depth(ele, option) {
    var _this = this;

    this.dpr = window.devicePixelRatio > 2 ? window.devicePixelRatio : 2;
    ele.style.width = option.width + 'px';
    ele.style.height = option.height + 'px';

    var canvas = document.createElement('canvas');
    canvas.style.width = option.width + 'px';
    canvas.style.height = option.height + 'px';
    canvas.width = option.width * this.dpr;
    canvas.height = option.height * this.dpr;
    this.canvas = canvas;

    this.width = option.width * this.dpr;
    this.height = option.height * this.dpr;
    this.ctx = canvas.getContext('2d');
    this.ctx.font = this.dpr * 12 + 'px sans-serif';

    ele.appendChild(canvas);

    this.theme = option.theme || 'white';
    this.colors = {
        background: this.theme === 'dark' ? 'black' : 'white',
        fontColor: this.theme === 'dark' ? '#656565' : '#656565',
        splitColor: this.theme === 'dark' ? '#333' : '#ccc'
    };

    canvas.addEventListener('mousemove', function (e) {
        _this.pos = _this.getMousePos(e);
        _this.setData();
    });
    canvas.addEventListener('mouseout', function (e) {
        _this.pos = null;
        _this.setData();
    });
    canvas.addEventListener('mousecancel', function (e) {
        _this.pos = null;
        _this.setData();
    });
}

Depth.prototype.setData = function (data) {
    if (!data) {
        data = this.data;
    } else {
        this.data = data;
    }
    var _data = this.data,
        buy = _data.buy,
        sell = _data.sell;


    var buyPrice = [];
    var sellPrice = [];
    var buyVolume = [];
    var sellVolume = [];
    buy.forEach(function (el) {
        buyPrice.push(el[0]);
        buyVolume.push(el[1]);
    });
    sell.forEach(function (el) {
        sellPrice.push(el[0]);
        sellVolume.push(el[1]);
    });
    var buyDepth = [];
    for (var i = 0; i < buyVolume.length; i++) {
        if (i === 0) {
            buyDepth[i] = parseFloat(buyVolume[i]);
            continue;
        }
        buyDepth[i] = buyDepth[i - 1] + parseFloat(buyVolume[i]);
    }
    var sellDepth = [];
    for (var _i = 0; _i < sellVolume.length; _i++) {
        if (_i === 0) {
            sellDepth[_i] = parseFloat(sellVolume[_i]);
            continue;
        }
        sellDepth[_i] = sellDepth[_i - 1] + parseFloat(sellVolume[_i]);
    }

    var maxVolume = Math.max(buyDepth[buyDepth.length - 1], sellDepth[sellDepth.length - 1]);
    var n = (maxVolume * 0.2).toFixed(0).length;
    var interval = Math.ceil(maxVolume * 0.2 / Math.pow(10, n - 1)) * Math.pow(10, n - 1);
    var yAxis = [];
    for (var _i2 = interval; _i2 < maxVolume; _i2 += interval) {
        yAxis.unshift(_i2);
    }

    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, this.width, this.height);

    var maxLength = 0;
    for (var _i3 = interval; _i3 < maxVolume; _i3 += interval) {
        maxLength = Math.max(maxLength, ctx.measureText(_i3.toString()).width);
    }
    this.contentWidth = this.width - maxLength - 10;
    this.contentHeight = this.height - this.dpr * 16;

    n = ((sellPrice[sellPrice.length - 1] - buyPrice[buyPrice.length - 1]) * 0.25).toFixed(0).length;
    var intervalX = Math.ceil(maxVolume * 0.25 / Math.pow(10, n - 1)) * Math.pow(10, n - 1);
    ctx.fillStyle = this.colors.fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (var _i4 = buyPrice[buyPrice.length - 1] + intervalX; _i4 < sellPrice[sellPrice.length - 1]; _i4 += intervalX) {
        ctx.fillText(parseInt(_i4), (_i4 - buyPrice[buyPrice.length - 1]) / (sellPrice[sellPrice.length - 1] - buyPrice[buyPrice.length - 1]) * this.contentWidth, this.contentHeight);
    }

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.fontColor;
    ctx.save();
    ctx.strokeStyle = this.colors.splitColor;
    ctx.setLineDash([2, 2]);
    for (var _i5 = interval; _i5 < maxVolume; _i5 += interval) {
        var y = this.contentHeight - this.contentHeight * _i5 / maxVolume;
        ctx.fillText(_i5, this.contentWidth + 5, y);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.contentWidth, y);
        ctx.stroke();
    }
    ctx.restore();

    // 买单
    var p1 = (buyPrice[0] - buyPrice[buyPrice.length - 1]) / (sellPrice[sellPrice.length - 1] - buyPrice[buyPrice.length - 1]);
    ctx.lineWidth = this.dpr;
    ctx.beginPath();
    ctx.moveTo(0, this.contentHeight - buyDepth[buyDepth.length - 1] / maxVolume * this.contentHeight);
    for (var _i6 = buyDepth.length - 2; _i6 >= 0; _i6--) {
        ctx.lineTo(this.contentWidth * p1 - this.contentWidth * p1 * _i6 / buyDepth.length, this.contentHeight - buyDepth[_i6] / maxVolume * this.contentHeight);
        if (_i6 === 0) {
            ctx.lineTo(this.contentWidth * p1 - this.contentWidth * p1 * _i6 / buyDepth.length, this.contentHeight);
        }
    }
    ctx.lineTo(0, this.contentHeight);
    ctx.closePath();
    var lineargradient = ctx.createLinearGradient(0, 0, 0, this.contentHeight);
    lineargradient.addColorStop(0, 'rgba(54, 168, 83, 1)');
    lineargradient.addColorStop(1, 'rgba(171, 205, 82, 0.2)');
    ctx.fillStyle = lineargradient;
    ctx.fill();
    ctx.strokeStyle = '#246b38';
    ctx.stroke();

    // 卖单
    var p2 = (sellPrice[sellPrice.length - 1] - sellPrice[0]) / (sellPrice[sellPrice.length - 1] - buyPrice[buyPrice.length - 1]);
    ctx.beginPath();
    ctx.moveTo(this.contentWidth, this.contentHeight - sellDepth[sellDepth.length - 1] / maxVolume * this.contentHeight);
    for (var _i7 = sellDepth.length - 2; _i7 >= 0; _i7--) {
        ctx.lineTo(this.contentWidth * (1 - p2) + this.contentWidth * p2 * _i7 / sellDepth.length, this.contentHeight - sellDepth[_i7] / maxVolume * this.contentHeight);
        if (_i7 === 0) {
            ctx.lineTo(this.contentWidth * (1 - p2) + this.contentWidth * p2 * _i7 / sellDepth.length, this.contentHeight);
        }
    }
    ctx.lineTo(this.contentWidth, this.contentHeight);
    ctx.closePath();
    lineargradient = ctx.createLinearGradient(this.contentWidth, 0, this.contentWidth, this.contentHeight);
    lineargradient.addColorStop(0, 'rgba(216, 34, 13, 1)');
    lineargradient.addColorStop(1, 'rgba(233, 84, 21, 0.2)');
    ctx.fillStyle = lineargradient;
    ctx.fill();
    ctx.strokeStyle = '#b81c0b';
    ctx.stroke();

    ctx.strokeStyle = this.colors.fontColor;
    ctx.strokeRect(0, 0, this.contentWidth, this.contentHeight);

    if (this.pos && this.pos.x < this.contentWidth && this.pos.y < this.contentHeight) {
        var num = buy.length * 2;
        var currentIndex = parseInt(this.pos.x / this.contentWidth * num);
        var x = void 0;
        var _y = void 0;
        var rectH = 90;
        var text = void 0;
        if (currentIndex >= buy.length) {
            var _i8 = currentIndex - buy.length;
            text = [sell[_i8][0], sellDepth[_i8]];
            ctx.beginPath();
            x = this.contentWidth * (1 - p2) + this.contentWidth * p2 * _i8 / sellDepth.length;
            _y = this.contentHeight - sellDepth[_i8] / maxVolume * this.contentHeight;
            ctx.arc(x, _y, 8, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = 'rgb(255, 0, 0)';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
        } else {
            var _i9 = currentIndex;
            text = [buy[buy.length - 1 - _i9][0], buyDepth[buyDepth.length - 1 - _i9]];
            ctx.beginPath();
            x = this.contentWidth * p1 * _i9 / buyDepth.length;
            _y = this.contentHeight - buyDepth[buyDepth.length - 1 - _i9] / maxVolume * this.contentHeight;
            ctx.arc(x, _y, 8, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = 'rgb(0, 255, 0)';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
        ctx.strokeStyle = 'white';

        var rectW = ctx.measureText('买单：' + this.setDP(text[1])).width + 30;
        x = x > this.contentWidth * 0.5 ? x - 10 : x + 10;
        _y = _y > this.contentHeight * 0.5 ? _y - 10 : _y + 10;
        rectW = x > this.contentWidth * 0.5 ? -rectW : rectW;
        rectH = _y > this.contentHeight * 0.5 ? -rectH : rectH;
        ctx.save();
        ctx.shadowColor = this.colors.fontColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 3;
        ctx.strokeRect(x, _y, rectW, rectH);
        ctx.restore();

        ctx.fillStyle = '#656565';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        var textX = x > this.contentWidth * 0.5 ? x + rectW + 10 : x + 10;
        var textY = _y > this.contentHeight * 0.5 ? _y + rectH * 2 / 3 : _y + rectH / 3;
        ctx.fillText('￥' + text[0], textX, textY);
        textY = _y > this.contentHeight * 0.5 ? _y + rectH / 3 : _y + rectH * 2 / 3;
        ctx.fillText((currentIndex < buy.length ? '买单：' : '卖单：') + this.setDP(text[1]), textX, textY);
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = drawCsi;
function drawCsi() {
    var csi = this.option.csi2;
    var views = this.views;
    var volumeIndex = csi.indexOf('volume');
    if (volumeIndex > -1) {
        drawVolume.call(this, views[(volumeIndex + 1) * 2], views[(volumeIndex + 1) * 2 + 1]);
    }
    var macdIndex = csi.indexOf('macd');
    if (macdIndex > -1) {
        drawMacd.call(this, views[(macdIndex + 1) * 2], views[(macdIndex + 1) * 2 + 1]);
    }
}

function drawVolume(view1, view2) {
    var _this = this;

    var ctx = this.ctx;
    var theme = this.option.theme;

    var realVolume = [];
    var realVolumeMa7 = [];
    var realVolumeMa30 = [];
    this.state.volume.forEach(function (el, i) {
        if (i >= _this.state.startIndex && i < _this.state.endIndex) {
            realVolume.push(el);
            realVolumeMa7.push(_this.state.volumeMa7[i]);
            realVolumeMa30.push(_this.state.volumeMa30[i]);
        }
    });
    var maxVolume = Math.max.apply(Math, realVolume.concat(realVolumeMa7, realVolumeMa30)) * 1.25;
    this.csiYAxisSector = [maxVolume, 0];
    var n = (maxVolume * 0.25).toFixed(0).length;
    var interval = Math.ceil(maxVolume * 0.25 / Math.pow(10, n - 1)) * Math.pow(10, n - 1);
    var yAxis = [];
    for (var i = interval; i < maxVolume; i += interval) {
        yAxis.unshift(i);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (var _i = 0; _i < yAxis.length; _i++) {
        ctx.fillText(yAxis[_i], view2.x + view2.w * 0.5, view2.y + view2.h - yAxis[_i] / maxVolume * view2.h);
        ctx.beginPath();
        ctx.moveTo(0, view2.y + view2.h - yAxis[_i] / maxVolume * view2.h);
        ctx.lineTo(view2.x, view2.y + view2.h - yAxis[_i] / maxVolume * view2.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.strokeStyle = this.colors.textColor;
    for (var _i2 = 0; _i2 < yAxis.length; _i2++) {
        var x = view2.x;
        var y = view2.y + view2.h - yAxis[_i2] / maxVolume * view2.h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
    }

    ctx.fillStyle = this.colors.greenColor;
    for (var _i3 = this.state.startIndex, j = 0; _i3 < this.state.endIndex; _i3++, j++) {
        if (_i3 >= this.state.times.length) {
            break;
        }
        if (this.state.start[_i3] < this.state.close[_i3]) {
            var _x = (j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
            var w = view1.w / this.state.verticalRectNumber * 0.8;
            var h = -realVolume[j] / maxVolume * view1.h;
            var _y = view1.y + view1.h;
            ctx.fillRect(_x, _y, w, h);
        }
    }

    ctx.fillStyle = this.colors.redColor;
    for (var _i4 = this.state.startIndex, _j = 0; _i4 < this.state.endIndex; _i4++, _j++) {
        if (_i4 >= this.state.times.length) {
            break;
        }
        if (this.state.close[_i4] <= this.state.start[_i4]) {
            var _x2 = (_j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
            var _w = view1.w / this.state.verticalRectNumber * 0.8;
            var _h = -realVolume[_j] / maxVolume * view1.h;
            var _y2 = view1.y + view1.h;
            ctx.fillRect(_x2, _y2, _w, _h);
        }
    }
    ctx.beginPath();
    for (var _i5 = this.state.startIndex, _j2 = 0; _j2 < this.state.verticalRectNumber; _i5++, _j2++) {
        if (_i5 >= this.state.times.length) {
            break;
        }
        ctx.strokeStyle = this.colors.ma30Color;
        var _x3 = _j2 * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
        var _y3 = (maxVolume - this.state.volumeMa30[_i5]) / maxVolume * view1.h + view1.y;
        if (_j2 == 0) {
            ctx.moveTo(_x3, _y3);
        }
        ctx.lineTo(_x3, _y3);
    }
    ctx.stroke();

    ctx.beginPath();
    for (var _i6 = this.state.startIndex, _j3 = 0; _j3 < this.state.verticalRectNumber; _i6++, _j3++) {
        if (_i6 >= this.state.times.length) {
            break;
        }
        ctx.strokeStyle = this.colors.ma7Color;
        var _x4 = _j3 * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
        var _y4 = (maxVolume - this.state.volumeMa7[_i6]) / maxVolume * view1.h + view1.y;
        if (_j3 == 0) {
            ctx.moveTo(_x4, _y4);
        }
        ctx.lineTo(_x4, _y4);
    }
    ctx.stroke();
    ctx.closePath();
}

function drawMacd(view1, view2) {
    var _this2 = this;

    var ctx = this.ctx;
    var theme = this.option.theme;

    var max = 0;
    var min = 0;
    this.state.macd.forEach(function (el, i) {
        if (i < _this2.state.startIndex || i >= _this2.state.endIndex) {
            return;
        }
        var val = Math.max(el, _this2.state.dif[i], _this2.state.dea[i]);
        max = max > val ? max : val;
        val = Math.min(el, _this2.state.dif[i], _this2.state.dea[i]);
        min = min < val ? min : val;
    });
    max = (max > Math.abs(min) ? max : Math.abs(min)) * 1.5;
    this.csiYAxisSector = [max, -max];
    var yAxis = [max, max * 2 / 3, max / 3, -max / 3, -max * 2 / 3, -max];

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (var i = 1; i < yAxis.length - 1; i++) {
        ctx.fillText(this.setDP(yAxis[i]), view2.x + view2.w * 0.5, view2.y + i / (yAxis.length - 1) * view2.h);
        ctx.beginPath();
        ctx.moveTo(0, view2.y + i / (yAxis.length - 1) * view2.h);
        ctx.lineTo(view2.x, view2.y + i / (yAxis.length - 1) * view2.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.fillStyle = this.colors.greenColor;
    ctx.strokeStyle = this.colors.greenColor;
    for (var _i7 = this.state.startIndex, j = 0; _i7 < this.state.endIndex; _i7++, j++) {
        if (_i7 >= this.state.times.length) {
            break;
        }
        if (this.state.macd[_i7] > 0) {
            var y = view1.y + view1.h * 0.5;
            var w = view1.w / this.state.verticalRectNumber * 0.8;
            var x = j * view1.w / this.state.verticalRectNumber + view1.x + w * 0.1;
            var h = -this.state.macd[_i7] / max * view1.h * 0.5;
            if (Math.abs(this.state.macd[_i7]) > Math.abs(this.state.macd[_i7 - 1])) {
                ctx.fillRect(x, y, w, h);
            } else {
                if (w <= this.dpr * 4) {
                    ctx.fillRect(x, y, w, h);
                } else {
                    ctx.strokeRect(x, y, w, h);
                }
            }
        }
    }
    ctx.fillStyle = this.colors.redColor;
    ctx.strokeStyle = this.colors.redColor;
    for (var _i8 = this.state.startIndex, _j4 = 0; _i8 < this.state.endIndex; _i8++, _j4++) {
        if (_i8 >= this.state.times.length) {
            break;
        }
        if (this.state.macd[_i8] <= 0) {
            var _y5 = view1.y + view1.h * 0.5;
            var _w2 = view1.w / this.state.verticalRectNumber * 0.8;
            var _x5 = _j4 * view1.w / this.state.verticalRectNumber + view1.x + _w2 * 0.1;
            var _h2 = -this.state.macd[_i8] / max * view1.h * 0.5;
            if (Math.abs(this.state.macd[_i8]) > Math.abs(this.state.macd[_i8 - 1])) {
                ctx.fillRect(_x5, _y5, _w2, _h2);
            } else {
                if (_w2 <= this.dpr * 4) {
                    ctx.fillRect(_x5, _y5, _w2, _h2);
                } else {
                    ctx.strokeRect(_x5, _y5, _w2, _h2);
                }
            }
        }
    }

    // dif
    ctx.strokeStyle = this.colors.ma7Color;
    ctx.beginPath();
    for (var _i9 = this.state.startIndex, _j5 = 0; _i9 < this.state.endIndex; _i9++, _j5++) {
        if (_i9 >= this.state.times.length) {
            break;
        }
        var _x6 = _j5 * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
        var _y6 = (max - this.state.dif[_i9]) / (2 * max) * view1.h + view1.y;
        if (_j5 === 0) {
            ctx.moveTo(_x6, _y6);
            continue;
        }
        ctx.lineTo(_x6, _y6);
    }
    ctx.stroke();

    // dea
    ctx.strokeStyle = this.colors.ma30Color;
    ctx.beginPath();
    for (var _i10 = this.state.startIndex, _j6 = 0; _i10 < this.state.endIndex; _i10++, _j6++) {
        if (_i10 >= this.state.times.length) {
            break;
        }
        var _x7 = _j6 * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
        var _y7 = (max - this.state.dea[_i10]) / (2 * max) * view1.h + view1.y;
        if (_j6 === 0) {
            ctx.moveTo(_x7, _y7);
            continue;
        }
        ctx.lineTo(_x7, _y7);
    }
    ctx.stroke();
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(20);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = operation;

var _draw = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function operation() {
    var _this = this;

    var overCtx = this.overCtx;
    var overCanvas = this.overCanvas;

    var isDown = false;
    var lastIndex = 0;
    var lastPos = { x: -1, y: -1 };
    var lastTouchDistance = 0;

    var lock = false;

    var move = function move(e) {
        var pos = _this.getMousePos(e);
        var currentIndex = Math.floor((pos.x - _this.views[0].x) / _this.views[0].w * _this.state.verticalRectNumber);
        var x = currentIndex * _this.views[0].w / _this.state.verticalRectNumber + 0.5 * _this.views[0].w / _this.state.verticalRectNumber + _this.views[0].x;
        if (x != lastPos.x || pos.y != lastPos.y) {
            overCtx.clearRect(0, 0, _this.width, _this.height);
            if (isDown) {
                var num = lastIndex - currentIndex;
                if (_this.state.startIndex + num < 0) {
                    num = -_this.state.startIndex;
                }
                if (_this.state.endIndex + num > _this.state.times.length + _this.state.verticalRectNumber * 0.5) {
                    num = _this.state.times.length + _this.state.verticalRectNumber * 0.5 - _this.state.endIndex;
                }
                _this.state.startIndex += num;
                _this.state.endIndex += num;
                _this.draw();
            } else {
                var flag = _this.isInLineView(pos);
                if (flag !== false && currentIndex + _this.state.startIndex < _this.state.times.length) {
                    _this.overCanvas.style.cursor = 'none';
                    drawHairline.call(_this, x, pos.y, currentIndex);
                } else {
                    _this.overCanvas.style.cursor = 'default';
                }
            }
            lastIndex = currentIndex;
            lastPos = { x: x, y: pos.y };
        }
    };
    var scale = function scale(n) {
        if (n > 10) {
            n = 10;
        }
        if (n < -10) {
            n = -10;
        }
        var lastStartIndex = _this.state.startIndex;
        var lastEndIndex = _this.state.endIndex;
        var lastVerticalRectNumber = _this.state.verticalRectNumber;
        _this.state.startIndex -= n;
        _this.state.endIndex += n;
        if (_this.state.endIndex - _this.state.startIndex > _this.maxKLineNumber) {
            _this.state.startIndex = lastStartIndex - (_this.maxKLineNumber - lastVerticalRectNumber) / 2;
            _this.state.endIndex = lastEndIndex + (_this.maxKLineNumber - lastVerticalRectNumber) / 2;
        }
        if (_this.state.endIndex - _this.state.startIndex < _this.minKLineNumber) {
            _this.state.startIndex = lastStartIndex + (lastVerticalRectNumber - _this.minKLineNumber) / 2;
            _this.state.endIndex = lastEndIndex - (lastVerticalRectNumber - _this.minKLineNumber) / 2;
        }
        _this.state.verticalRectNumber = _this.state.endIndex - _this.state.startIndex;
        if (_this.state.startIndex < 0) {
            _this.state.endIndex -= _this.state.startIndex;
            _this.state.startIndex = 0;
        }
        _this.draw();
    };
    if (this.device == 'pc') {
        var mousedown = function mousedown(e) {
            isDown = true;
            var pos = _this.getMousePos(e);
            var currentIndex = Math.floor((pos.x - _this.views[0].x) / _this.views[0].w * _this.state.verticalRectNumber);
            lastIndex = currentIndex;
        };
        var mouseup = function mouseup() {
            isDown = false;
        };
        var mouseout = function mouseout() {
            isDown = false;
            overCtx.clearRect(0, 0, _this.width, _this.height);
        };
        overCanvas.addEventListener('mousedown', mousedown);
        overCanvas.addEventListener('mouseup', mouseup);
        overCanvas.addEventListener('mouseout', mouseout);
        overCanvas.addEventListener('mousemove', move);
        overCanvas.addEventListener('wheel', function (e) {
            e.preventDefault();
            var n = Number(e.deltaY.toFixed(0));
            scale(n);
        });
    }
    if (this.device == 'mb') {
        var touchstart = function touchstart(e) {
            isDown = true;
            if (e.targetTouches.length == 2) {
                var touch1 = _this.getMousePos(e.targetTouches[0]);
                var touch2 = _this.getMousePos(e.targetTouches[1]);
                lastTouchDistance = Math.sqrt(Math.pow(touch1.x - touch2.x, 2) + Math.pow(touch1.y - touch2.y, 2));
            }
            var pos = _this.getMousePos(e.targetTouches[0]);
            var currentIndex = Math.floor((pos.x - _this.views[0].x) / _this.views[0].w * _this.state.verticalRectNumber);
            lastIndex = currentIndex;
            var x = currentIndex * _this.views[0].w / _this.state.verticalRectNumber + 0.5 * _this.views[0].w / _this.state.verticalRectNumber + _this.views[0].x;
            var flag = _this.isInLineView(pos);
            if (flag !== false && currentIndex + _this.state.startIndex < _this.state.times.length) {
                overCtx.clearRect(0, 0, _this.width, _this.height);
                drawHairline.call(_this, x, pos.y, currentIndex);
            }
        };
        var touchend = function touchend() {
            isDown = false;
        };
        var touchcancel = function touchcancel() {
            isDown = false;
            overCtx.clearRect(0, 0, _this.width, _this.height);
        };
        var touchmove = function touchmove(e) {
            e.preventDefault();
            if (e.targetTouches.length === 2) {
                var touch1 = _this.getMousePos(e.targetTouches[0]);
                var touch2 = _this.getMousePos(e.targetTouches[1]);
                var currentDistance = Math.sqrt(Math.pow(touch1.x - touch2.x, 2) + Math.pow(touch1.y - touch2.y, 2));
                var n = _this.state.verticalRectNumber - currentDistance / lastTouchDistance * _this.state.verticalRectNumber;
                lastTouchDistance = currentDistance;
                if (n > 0) {
                    n = Math.ceil(n);
                } else {
                    n = Math.floor(n);
                }
                scale(n);
            } else {
                move(e.targetTouches[0]);
            }
        };
        overCanvas.addEventListener('touchstart', touchstart);
        overCanvas.addEventListener('touchend', touchend);
        overCanvas.addEventListener('touchcancel', touchcancel);
        overCanvas.addEventListener('touchmove', touchmove);
    }
}

function drawHairline(x, y, currentIndex) {
    var _select$call;

    x = x || this.lastPos.x;
    y = y || this.lastPos.y;
    var overCtx = this.overCtx;
    overCtx.lineWidth = this.dpr;
    overCtx.strokeStyle = this.colors.subline;
    overCtx.beginPath();
    // 画横线
    overCtx.moveTo(0, y);
    overCtx.lineTo(this.width, y);
    overCtx.stroke();
    // 画竖线
    overCtx.moveTo(x, 0);
    overCtx.lineTo(x, this.height);
    overCtx.stroke();
    overCtx.closePath();

    // 画x轴的坐标
    var currentTime = this.state.times[this.state.startIndex + currentIndex];
    overCtx.textAlign = 'center';
    overCtx.textBaseline = 'bottom';
    overCtx.fillStyle = this.colors.background;
    overCtx.fillRect(x - overCtx.measureText(currentTime).width * 0.5 - 10 * this.dpr, this.height - 50, overCtx.measureText(currentTime).width + 20 * this.dpr, 50 - this.dpr);
    overCtx.strokeStyle = this.colors.textFrameColor;
    overCtx.strokeRect(x - overCtx.measureText(currentTime).width * 0.5 - 10 * this.dpr, this.height - 50, overCtx.measureText(currentTime).width + 20 * this.dpr, 50 - this.dpr);
    overCtx.fillStyle = this.colors.textColor;
    overCtx.fillText(this.option.overTimeFilter(currentTime), x, this.height - 7);

    // 画y轴坐标
    // 根据intervalY计算y轴显示的最大和最小的数值

    var _computAxis$call = _draw.computAxis.call(this),
        max = _computAxis$call.max,
        min = _computAxis$call.min;

    var view = this.views[1];
    var w = this.width - view.x;
    overCtx.textAlign = 'right';
    overCtx.textBaseline = 'middle';
    overCtx.fillStyle = this.colors.background;
    overCtx.fillRect(view.x, y - 16, w, 32);
    overCtx.strokeStyle = this.colors.textFrameColor;
    overCtx.strokeRect(view.x, y - 16, w, 32);
    overCtx.fillStyle = this.colors.textColor;

    var csiStr = this.option.csi2[0];
    var flag = this.isInLineView({ x: x, y: y });
    if (flag === 0) {
        var yText = max - (max - min) * (y - view.y) / view.h;
        overCtx.fillText(this.option.overYFilter(yText), view.x + view.w, y);
    } else if (flag === 1) {
        view = this.views[3];
        if (csiStr === 'volume') {
            var _yText = (1 - (y - view.y) / view.h) * (this.csiYAxisSector[0] - this.csiYAxisSector[1]);
            overCtx.fillText(this.setDP(_yText), view.x + view.w, y);
        }
        if (csiStr === 'macd') {
            var _yText2 = this.csiYAxisSector[1] * (y - view.y) / view.h + this.csiYAxisSector[0] * (1 - (y - view.y) / view.h);
            overCtx.fillText(this.setDP(_yText2), view.x + view.w, y);
        }
    }
    this.select.call(this, (_select$call = {
        time: this.state.times[currentIndex + this.state.startIndex],
        start: this.state.start[currentIndex + this.state.startIndex],
        hi: this.state.hi[currentIndex + this.state.startIndex],
        lo: this.state.lo[currentIndex + this.state.startIndex],
        close: this.state.close[currentIndex + this.state.startIndex],
        volume: this.state.volume[currentIndex + this.state.startIndex]
    }, (0, _defineProperty3.default)(_select$call, this.option.csi + 7, this.state[this.option.csi + 7][currentIndex + this.state.startIndex]), (0, _defineProperty3.default)(_select$call, this.option.csi + 30, this.state[this.option.csi + 30][currentIndex + this.state.startIndex]), _select$call), 0);

    var ma7Color = this.colors.ma7Color;
    var ma30Color = this.colors.ma30Color;
    if (csiStr === 'volume') {
        this.select.call(this, {
            volume: this.state.volume[currentIndex + this.state.startIndex],
            ma7: this.state.volumeMa7[currentIndex + this.state.startIndex],
            ma30: this.state.volumeMa30[currentIndex + this.state.startIndex]
        }, 1);
    }
    if (csiStr === 'macd') {
        this.select.call(this, {
            dif: this.state.dif[currentIndex + this.state.startIndex],
            dea: this.state.dea[currentIndex + this.state.startIndex],
            macd: this.state.macd[currentIndex + this.state.startIndex]
        }, 1);
    }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(19);

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (data, flag) {
    var overCtx = this.overCtx;
    overCtx.textAlign = 'left';
    overCtx.textBaseline = 'top';
    if (flag === 0) {
        if (this.device === 'pc') {
            var x = 5;
            var y = 5;
            for (var i = 0; i < (0, _keys2.default)(data).length; i++) {
                var key = (0, _keys2.default)(data)[i];
                var text = void 0;
                if (key === 'time') {
                    text = '时间：' + this.option.overTimeFilter(data[key]);
                } else {
                    text = transformKey(key) + '：' + data[key];
                }
                if (overCtx.measureText(text).width + x + 40 > this.views[0].x + this.views[0].w) {
                    x = 5;
                    y += 40;
                }
                setStyle.call(this, key, overCtx);
                overCtx.fillText(text, x, y);
                x += overCtx.measureText(text).width + 40;
            }
        } else {
            var _text = this.option.overTimeFilter(data.time) + '   \u5F00' + data.start + '   \u9AD8' + data.hi + '   \u4F4E' + data.lo + '   \u6536' + data.close;
            overCtx.textAlign = 'center';
            overCtx.textBaseline = 'middle';
            overCtx.fillStyle = '#343f4d';
            overCtx.fillRect(0, 0, this.width, 32 * this.dpr);
            overCtx.fillStyle = this.colors.textColor;
            overCtx.fillText(_text, this.width * 0.5, 16 * this.dpr);
            var _x = 5;
            var _y = 32 * this.dpr + 5;
            overCtx.textAlign = 'left';
            overCtx.textBaseline = 'top';
            for (var _i = 0; _i < (0, _keys2.default)(data).length; _i++) {
                var _key = (0, _keys2.default)(data)[_i];
                if (/(time|start|hi|lo|end)/g.test(_key)) {
                    continue;
                }
                _text = transformKey(_key) + '：' + data[_key];
                if (overCtx.measureText(_text).width + _x + 40 > this.views[0].x + this.views[0].w) {
                    _x = 5;
                    _y += 40;
                }
                setStyle.call(this, _key, overCtx);
                overCtx.fillText(_text, _x, _y);
                _x += overCtx.measureText(_text).width + 40;
            }
        }
    } else if (flag === 1) {
        var _x2 = 5;
        var _y2 = this.views[2].y;
        for (var _i2 = 0; _i2 < (0, _keys2.default)(data).length; _i2++) {
            var _key2 = (0, _keys2.default)(data)[_i2];
            var _text2 = transformKey(_key2) + '：' + data[_key2];
            if (overCtx.measureText(_text2).width + _x2 + 40 > this.views[0].x + this.views[0].w) {
                _x2 = 5;
                _y2 += 40;
            }
            setStyle.call(this, _key2, overCtx);
            overCtx.fillText(_text2, _x2, _y2);
            _x2 += overCtx.measureText(_text2).width + 40;
        }
    }
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformKey(key) {
    if (key === 'time') {
        return '时间';
    } else if (key === 'start') {
        return '开';
    } else if (key === 'hi') {
        return '高';
    } else if (key === 'lo') {
        return '低';
    } else if (key === 'close') {
        return '收';
    } else if (key === 'volume') {
        return '量';
    } else if (key === 'macd') {
        return 'MACD';
    } else if (key === 'ema7') {
        return 'EMA7';
    } else if (key === 'ema30') {
        return 'EMA30';
    } else if (key === 'ma7') {
        return 'MA7';
    } else if (key === 'ma30') {
        return 'MA30';
    } else if (key === 'dif') {
        return 'DIF';
    } else if (key === 'dea') {
        return 'DEA';
    } else {
        return key;
    }
}

function setStyle(key, ctx) {
    key = key.toLowerCase();
    if (key === 'ema7' || key === 'ma7' || key === 'dif') {
        ctx.fillStyle = this.colors.ma7Color;
    } else if (key === 'ema30' || key === 'ma30' || key === 'dea') {
        ctx.fillStyle = this.colors.ma30Color;
    } else if (key === 'macd') {
        ctx.fillStyle = this.colors.macdColor;
    } else {
        ctx.fillStyle = this.colors.textColorLight;
    }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setData;
function setData(data) {
    var _this = this;

    var times = [];
    var timeStr = [];
    var start = [];
    var hi = [];
    var lo = [];
    var close = [];
    var volume = [];
    data.forEach(function (d) {
        times.push(d[0]);
        if (!_this.initial) {
            timeStr.push(_this.option.timeFilter(d[0]));
        }
        start.push(d[1]);
        hi.push(d[2]);
        lo.push(d[3]);
        close.push(d[4]);
        volume.push(d[5]);
    });
    this.state = {
        startIndex: data.length - 50,
        endIndex: data.length,
        verticalRectNumber: 50,
        isDown: false,
        times: times,
        timeStr: timeStr,
        start: start,
        hi: hi,
        lo: lo,
        close: close,
        volume: volume,
        ma30: close.map(function (el, i) {
            if (i < 29) {
                return el;
            } else {
                var sum = 0;
                for (var index = i; index > i - 30; index--) {
                    sum += close[index];
                }
                return _this.setDP(sum / 30);
            }
        }),
        ma7: close.map(function (el, i) {
            if (i < 6) {
                return el;
            } else {
                var sum = 0;
                for (var index = i; index > i - 7; index--) {
                    sum += close[index];
                }
                return _this.setDP(sum / 7);
            }
        }),
        volumeMa7: volume.map(function (el, i) {
            if (i < 6) {
                return el;
            } else {
                var sum = 0;
                for (var index = i; index > i - 7; index--) {
                    sum += volume[index];
                }
                return _this.setDP(sum / 7);
            }
        }),
        volumeMa30: volume.map(function (el, i) {
            if (i < 29) {
                return el;
            } else {
                var sum = 0;
                for (var index = i; index > i - 30; index--) {
                    sum += volume[index];
                }
                return _this.setDP(sum / 30);
            }
        })
    };
    this.state.ema30 = [];
    this.state.close.forEach(function (el, i) {
        if (i === 0) {
            _this.state.ema30[i] = el;
        } else {
            var val = 2 / 31 * (_this.state.close[i] - _this.state.ema30[i - 1]) + _this.state.ema30[i - 1];
            _this.state.ema30[i] = _this.setDP(val);
        }
    });
    this.state.ema7 = [];
    this.state.close.forEach(function (el, i) {
        if (i === 0) {
            _this.state.ema7[i] = el;
        } else {
            var val = 2 / 8 * (_this.state.close[i] - _this.state.ema7[i - 1]) + _this.state.ema7[i - 1];
            _this.state.ema7[i] = _this.setDP(val);
        }
    });
    this.state.ema15 = [];
    this.state.close.forEach(function (el, i) {
        if (i === 0) {
            _this.state.ema15[i] = el;
        } else {
            var val = 2 / 16 * (_this.state.close[i] - _this.state.ema15[i - 1]) + _this.state.ema15[i - 1];
            _this.state.ema15[i] = _this.setDP(val);
        }
    });
    this.state.ema26 = [];
    this.state.close.forEach(function (el, i) {
        if (i === 0) {
            _this.state.ema26[i] = el;
        } else {
            var val = 2 / 27 * (_this.state.close[i] - _this.state.ema26[i - 1]) + _this.state.ema26[i - 1];
            _this.state.ema26[i] = _this.setDP(val);
        }
    });
    this.state.ema12 = [];
    this.state.close.forEach(function (el, i) {
        if (i === 0) {
            _this.state.ema12[i] = el;
        } else {
            var val = 2 / 13 * (_this.state.close[i] - _this.state.ema12[i - 1]) + _this.state.ema12[i - 1];
            _this.state.ema12[i] = _this.setDP(val);
        }
    });
    this.state.dif = this.state.ema12.map(function (el, i) {
        var val = el - _this.state.ema26[i];
        return _this.setDP(val);
    });
    this.state.dea = [];
    this.state.dif.forEach(function (el, i) {
        if (i === 0) {
            _this.state.dea[i] = el;
        } else {
            var val = _this.state.dea[i - 1] * 0.8 + el * 0.2;
            _this.state.dea[i] = _this.setDP(val);
        }
    });
    this.state.macd = this.state.dif.map(function (el, i) {
        var val = (el - _this.state.dea[i]) * 2;
        return _this.setDP(val);
    });
    if (!this.initial) {
        this.draw();
    }
    this.initial = true;
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = update;
function update(data) {
    var lastState = this.state;
    this.setData(data);
    var cha = 0;
    this.state.timeStr = lastState.timeStr;
    if (this.state.times.length > lastState.times.length) {
        this.state.timeStr.push(this.option.timeFilter(this.state.times[this.state.times.length - 1]));
        if (lastState.endIndex === lastState.times.length) {
            cha = 1;
        }
    }
    this.state.startIndex = lastState.startIndex + cha;
    this.state.endIndex = lastState.endIndex + cha;
    this.state.verticalRectNumber = lastState.verticalRectNumber;
    this.draw(true);
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Depth = exports.KLine = undefined;

var _setData = __webpack_require__(15);

var _setData2 = _interopRequireDefault(_setData);

var _draw = __webpack_require__(5);

var _draw2 = _interopRequireDefault(_draw);

var _operation = __webpack_require__(13);

var _operation2 = _interopRequireDefault(_operation);

var _select = __webpack_require__(14);

var _select2 = _interopRequireDefault(_select);

var _drawCsi = __webpack_require__(12);

var _drawCsi2 = _interopRequireDefault(_drawCsi);

var _update = __webpack_require__(16);

var _update2 = _interopRequireDefault(_update);

var _Depth = __webpack_require__(11);

var _Depth2 = _interopRequireDefault(_Depth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function KLine(ele, option) {
    if (option === undefined || option === null) {
        option = {};
    }
    this.ele = ele;
    this.setOption(option);
    this.operation();
}

KLine.prototype = {
    setOption: setOption,
    init: init,
    operation: _operation2.default,
    setData: _setData2.default,
    draw: _draw2.default,
    drawCsi: _drawCsi2.default,
    select: _select2.default,
    setDP: setDP,
    getMousePos: getMousePos,
    isInLineView: isInLineView,
    update: _update2.default
};

// 获取鼠标在canvas上的坐标点
function getMousePos(e) {
    var rect = e.target.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * this.dpr,
        y: (e.clientY - rect.top) * this.dpr
    };
}

// 判断鼠标是否在${this.views}中
function isInLineView(pos) {
    var x = pos.x,
        y = pos.y;

    var view1 = this.views[0];
    var view2 = this.views[2];
    if (x >= view1.x && x < view1.x + view1.w && y >= view1.y && y < view1.y + view1.h) {
        return 0;
    } else if (x >= view2.x && x < view2.x + view2.w && y >= view2.y && y < view2.y + view2.h) {
        return 1;
    } else {
        return false;
    }
}

// 控制小数位数
function setDP(num) {
    return Math.abs(num) > 1 ? Number(num.toFixed(2)) : Number(num.toFixed(7));
}

function setOption(option) {
    // 配置项
    if (this.option) {
        this.option = {
            theme: option.theme || this.option.theme,
            width: option.width || this.option.width,
            height: option.height || this.option.height,
            yAxisWidth: option.yAxisWidth || this.option.yAxisWidth,
            fontSize: option.fontSize || this.option.fontSize,
            csi: option.csi || this.option.csi,
            csi2: option.csi2 || this.option.csi2,
            timeFilter: option.timeFilter || this.option.timeFilter,
            priceFilter: option.priceFilter || this.option.priceFilter,
            overTimeFilter: option.overTimeFilter || this.option.overTimeFilter,
            overYFilter: option.overYFilter || this.option.overYFilter
        };
    } else {
        this.option = {
            theme: option.theme || 'dark',
            width: option.width,
            height: option.height,
            yAxisWidth: option.yAxisWidth || 140,
            fontSize: option.fontSize || 12,
            csi: option.csi || 'ema',
            csi2: option.csi2 || ['volume'],
            timeFilter: option.timeFilter || function (t) {
                return new Date(t * 1000).toLocaleDateString();
            },
            priceFilter: option.priceFilter || function (d) {
                return Number(d.toFixed(2));
            },
            overTimeFilter: option.overTimeFilter || function (t) {
                return new Date(t * 1000).toLocaleTimeString();
            },
            overYFilter: option.overYFilter || function (d) {
                return Number(d.toFixed(2));
            }
        };
    }
    this.init();
}

function init() {
    var flag = true;
    this.device = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? 'mb' : 'pc';
    this.dpr = 2;
    var ele = this.ele;
    ele.style.fontSize = this.option.fontSize + 'px';
    this.ele = ele;

    var width = this.option.width * this.dpr;
    var height = this.option.height * this.dpr;
    // canvas宽度
    this.width = width;
    // canvas高度
    this.height = height;
    ele.style.width = width / this.dpr + 'px';
    ele.style.height = height / this.dpr + 'px';
    ele.style.position = 'relative';

    var canvas = this.canvas || document.createElement('canvas');
    if (!this.canvas) {
        ele.appendChild(canvas);
        flag = false;
    }
    // 渲染canvas
    this.canvas = canvas;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';

    var overCanvas = this.overCanvas || document.createElement('canvas');
    if (!this.overCanvas) {
        ele.appendChild(overCanvas);
    }
    // 覆盖层canvas
    this.overCanvas = overCanvas;
    overCanvas.width = width;
    overCanvas.height = height;
    overCanvas.style.width = '100%';
    overCanvas.style.height = '100%';
    overCanvas.style.position = 'absolute';

    // 渲染上下文对象
    var ctx = canvas.getContext('2d');
    this.ctx = ctx;
    this.ctx.font = this.option.fontSize * this.dpr + 'px sans-serif';
    // 覆盖层的渲染上下文对象
    var overCtx = overCanvas.getContext('2d');
    this.overCtx = overCtx;
    this.overCtx.font = this.option.fontSize * this.dpr + 'px sans-serif';

    // 上下画图区域高度比
    if (this.option.csi2.length == 1) {
        this.split = [6, 4];
    } else {
        this.split = [10, 0];
    }
    var yAxisWidth = this.option.yAxisWidth;

    var left = 20;
    var right = 20;
    var top = 40 * this.dpr;
    var bottom = 100;
    var middle = 20;
    var view1 = {
        x: left,
        y: top,
        w: width - yAxisWidth - left - right - middle,
        h: (height - top - bottom) * (this.split[0] / (this.split[0] + this.split[1])) - middle * 0.5
    };
    var view2 = {
        x: view1.w + view1.x + middle,
        y: view1.y,
        w: yAxisWidth,
        h: view1.h
    };
    var view3 = {
        x: view1.x,
        y: view1.y + view1.h + middle,
        w: view1.w,
        h: (height - top - bottom) * (this.split[1] / (this.split[0] + this.split[1])) + middle * 0.5
    };
    var view4 = {
        x: view2.x,
        y: view3.y,
        w: yAxisWidth,
        h: view3.h
    };
    var views = [view1, view2, view3, view4];
    this.views = views;

    this.maxKLineNumber = parseInt(this.width / 2 / this.dpr) % 2 === 0 ? parseInt(this.width / 2 / this.dpr) : parseInt(this.width / 2 / this.dpr) - 1;
    this.minKLineNumber = 16;

    // 设置全局色彩
    var isDarkTheme = this.option.theme === 'dark';
    this.colors = {
        background: isDarkTheme ? '#2e3947' : 'white',
        timeBackground: isDarkTheme ? '#343f4d' : '#fff',
        splitLine: isDarkTheme ? 'rgb(66, 73, 82)' : '#eee',
        subline: isDarkTheme ? 'rgb(86, 93, 102)' : '#ddd',
        textColor: isDarkTheme ? '#fff' : '#333',
        currentTextColor: isDarkTheme ? 'rgb(239, 229, 46)' : 'rgb(242, 121, 53)',
        textFrameColor: isDarkTheme ? 'white' : 'black',
        greenColor: isDarkTheme ? '#3bd181' : '#48b484',
        redColor: isDarkTheme ? '#eb3f2f' : '#d64541',
        ma30Color: isDarkTheme ? 'rgb(234, 177, 103)' : 'rgb(234, 177, 103)',
        ma7Color: isDarkTheme ? 'rgb(166, 206, 227)' : 'rgb(59, 187, 59)',
        macdColor: isDarkTheme ? 'rgb(208, 146, 209)' : 'rgb(208, 146, 209)'
    };
    if (flag) {
        this.draw(true);
    }
}

exports.KLine = KLine;
exports.Depth = _Depth2.default;

_Depth2.default.prototype.getMousePos = getMousePos;
_Depth2.default.prototype.setDP = setDP;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(18);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(46);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10)
  , toLength  = __webpack_require__(41)
  , toIndex   = __webpack_require__(40);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(23);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(3).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 30 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(8)
  , createDesc = __webpack_require__(37);
module.exports = __webpack_require__(1) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(2)(function(){
  return Object.defineProperty(__webpack_require__(28)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(26);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(30)
  , toIObject    = __webpack_require__(10)
  , arrayIndexOf = __webpack_require__(25)(false)
  , IE_PROTO     = __webpack_require__(38)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(34)
  , enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(7)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(2);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(39)('keys')
  , uid    = __webpack_require__(44);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(9)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(9)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(6);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1), 'Object', {defineProperty: __webpack_require__(8).f});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(42)
  , $keys    = __webpack_require__(35);

__webpack_require__(36)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ })
/******/ ]);
});