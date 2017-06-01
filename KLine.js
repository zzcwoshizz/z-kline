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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(30)('wks')
  , uid        = __webpack_require__(32)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(50);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(49);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(11)
  , createDesc = __webpack_require__(16);
module.exports = __webpack_require__(7) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(1)
  , ctx       = __webpack_require__(24)
  , hide      = __webpack_require__(6)
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
/* 9 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(5)
  , IE8_DOM_DEFINE = __webpack_require__(64)
  , toPrimitive    = __webpack_require__(82)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(13);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(76)
  , enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(30)('keys')
  , uid    = __webpack_require__(32);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(27)
  , defined = __webpack_require__(13);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(80)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(28)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(51);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(23)
  , TAG = __webpack_require__(0)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(59);
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(70)
  , $export        = __webpack_require__(8)
  , redefine       = __webpack_require__(79)
  , hide           = __webpack_require__(6)
  , has            = __webpack_require__(10)
  , Iterators      = __webpack_require__(3)
  , $iterCreate    = __webpack_require__(67)
  , setToStringTag = __webpack_require__(29)
  , getPrototypeOf = __webpack_require__(75)
  , ITERATOR       = __webpack_require__(0)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(11).f
  , has = __webpack_require__(10)
  , TAG = __webpack_require__(0)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(18)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(22)
  , ITERATOR  = __webpack_require__(0)('iterator')
  , Iterators = __webpack_require__(3);
module.exports = __webpack_require__(1).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(6)
  , Iterators     = __webpack_require__(3)
  , TO_STRING_TAG = __webpack_require__(0)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 35 */
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
        buyPrice.push(parseFloat(el[0]));
        buyVolume.push(parseFloat(el[1]));
    });
    sell.forEach(function (el) {
        sellPrice.push(parseFloat(el[0]));
        sellVolume.push(parseFloat(el[1]));
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
        var x = void 0;
        var _y = void 0;
        var rectH = 90;
        var text = void 0;
        var title = '';
        if (this.pos.x >= this.contentWidth * (1 - p2)) {
            var _i8 = parseInt((this.pos.x - this.contentWidth * (1 - p2)) / (this.contentWidth * p2) * sell.length);
            title = '卖单：';
            text = [sell[_i8][0], sellDepth[_i8]];
            ctx.beginPath();
            x = this.pos.x;
            _y = this.contentHeight - sellDepth[_i8] / maxVolume * this.contentHeight;
            ctx.arc(x, _y, 8, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = 'rgb(255, 0, 0)';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
        } else if (this.pos.x <= this.contentWidth * p1) {
            var _i9 = parseInt(this.pos.x / (this.contentWidth * p1) * buy.length);
            title = '买单：';
            text = [buy[buy.length - 1 - _i9][0], buyDepth[buyDepth.length - 1 - _i9]];
            ctx.beginPath();
            x = this.pos.x;
            _y = this.contentHeight - buyDepth[buyDepth.length - 1 - _i9] / maxVolume * this.contentHeight;
            ctx.arc(x, _y, 8, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = 'rgb(0, 255, 0)';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
        } else {
            return;
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
        ctx.fillText(title, textX, textY);
    }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = canDraw;
function canDraw() {
    if (this.state.range[0] != this.lastState.range[0] || this.state.range[1] != this.lastState.range[1]) {
        return [true, true];
    }
    if (this.force[0] || this.force[1]) {
        var temp = this.force;
        this.force = [false, false];
        return temp;
    }
    return [false, false];
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(53);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = computAxis;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 计算最大价格，最小价格，y轴显示的价格差
function computAxis() {
    var start = this.state.start;
    var hi = this.state.hi;
    var lo = this.state.lo;
    var close = this.state.close;
    var ma30 = this.state.ma30;
    var ma7 = this.state.ma7;
    var ema30 = this.state.ema30;
    var ema7 = this.state.ema7;
    var up = this.state.up;
    var mb = this.state.mb;
    var dn = this.state.dn;
    var startIndex = this.state.range[0];
    var endIndex = this.state.range[1];
    var maxY = Math.max(start[startIndex], hi[startIndex], lo[startIndex], close[startIndex], ma30[startIndex], ma7[startIndex], ema30[startIndex], ema7[startIndex]);
    var minY = Math.min(start[startIndex], hi[startIndex], lo[startIndex], close[startIndex], ma30[startIndex], ma7[startIndex], ema30[startIndex], ema7[startIndex]);
    var maxPrice = hi[startIndex];
    var minPrice = lo[startIndex];
    var maxPriceIndex = startIndex;
    var minPriceIndex = startIndex;
    var mainCsi = this.option.mainCsi;
    for (var i = startIndex; i < endIndex; i++) {
        if (i >= this.state.times.length) {
            break;
        }
        var csi = [];
        if (mainCsi === 'ma') {
            csi = [ma30[i], ma7[i]];
        } else if (mainCsi === 'ema') {
            csi = [ema30[i], ema7[i]];
        } else if (mainCsi === 'boll') {
            csi = [up[i], mb[i], dn[i]];
        }
        var maxVal = Math.max.apply(Math, [start[i], hi[i], lo[i], close[i]].concat((0, _toConsumableArray3.default)(csi)));
        var minVal = Math.min.apply(Math, [start[i], hi[i], lo[i], close[i]].concat((0, _toConsumableArray3.default)(csi)));
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
    var cha = maxY - minY;
    var n = 0;
    if (cha >= 1) {
        n = cha.toFixed(0).length;
    } else {
        var str = cha.toString().split('.')[1];
        for (var _i = 0; _i < str.length; _i++) {
            if (str.charAt(_i) == 0) {
                n--;
            }
        }
    }
    var intervalY = Math.ceil((maxY - minY) * 0.2 / Math.pow(10, n - 2)) * Math.pow(10, n - 2);
    return {
        maxY: maxY,
        minY: minY,
        maxPrice: maxPrice,
        maxPriceIndex: maxPriceIndex,
        minPrice: minPrice,
        minPriceIndex: minPriceIndex,
        max: maxY + intervalY - maxY % intervalY,
        min: minY - minY % intervalY,
        intervalY: intervalY
    };
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = draw;
function draw() {
    if (!this.lastState) {
        this.lastState = { range: [-1, -1] };
    }
    var canDraw = this.canDraw();
    if (canDraw[1]) {
        this.drawHairLine();
    }
    if (canDraw[0]) {
        var ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        drawBackground.call(this);
        drawTime.call(this);
        drawSplitLine.call(this);

        var yaxis = this.computAxis();

        this.drawMain(yaxis);

        this.drawAid();
    }

    this.lastState = this.state;

    requestAnimationFrame(this.draw.bind(this));
}

function drawBackground() {
    var ctx = this.ctx;
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, this.width, this.height);
}

function drawTime() {
    var ctx = this.ctx;
    ctx.fillStyle = this.colors.timeBackground;
    ctx.fillRect(0, this.timeView.y, this.width, this.timeView.h);
}

function drawSplitLine() {
    var ctx = this.ctx;
    ctx.strokeStyle = this.colors.splitLine;
    ctx.beginPath();
    ctx.moveTo(0, (this.mainView.h + this.mainView.y + this.aidView.y) * 0.5);
    ctx.lineTo(this.width, (this.mainView.h + this.mainView.y + this.aidView.y) * 0.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.mainYaxisView.x, 0);
    ctx.lineTo(this.aidYaxisView.x, this.aidYaxisView.y + this.aidYaxisView.h);
    ctx.stroke();
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = drawAid;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toInt(num) {
    return ~~(0.5 + num);
}
function drawAid() {
    if (this.option.aidCsi === 'volume') {
        drawVolume.call(this);
    } else if (this.option.aidCsi === 'macd') {
        drawMacd.call(this);
    } else if (this.option.aidCsi === 'kdj') {
        drawKdj.call(this);
    }
}

function drawVolume() {
    var _this = this;

    var ctx = this.ctx;
    var aidView = this.aidView;
    var aidYaxisView = this.aidYaxisView;

    var _state$range = (0, _slicedToArray3.default)(this.state.range, 2),
        startIndex = _state$range[0],
        endIndex = _state$range[1];

    var verticalRectNumber = endIndex - startIndex;

    var realVolume = [];
    var realVolumeMa7 = [];
    var realVolumeMa30 = [];
    this.state.volume.forEach(function (el, i) {
        if (i >= startIndex && i < endIndex) {
            realVolume.push(el);
            realVolumeMa7.push(_this.state.volumeMa7[i]);
            realVolumeMa30.push(_this.state.volumeMa30[i]);
        }
    });
    var maxVolume = Math.max.apply(Math, realVolume.concat(realVolumeMa7, realVolumeMa30)) * 1.25;
    this.csiYaxisSector = [maxVolume, 0];

    var n = 0;
    if (maxVolume >= 1) {
        n = maxVolume.toFixed(0).length;
    } else {
        var str = maxVolume.toString().split('.')[1];
        for (var i = 0; i < str.length; i++) {
            if (str.charAt[1] == 0) {
                n--;
            }
        }
    }
    var interval = Math.ceil(maxVolume * 0.25 / Math.pow(10, n - 2)) * Math.pow(10, n - 2);
    var yAxis = [];
    for (var _i = interval; _i < maxVolume; _i += interval) {
        yAxis.unshift(_i);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (var _i2 = 0; _i2 < yAxis.length; _i2++) {
        ctx.fillText(yAxis[_i2], aidYaxisView.x + aidYaxisView.w * 0.5, aidYaxisView.y + aidYaxisView.h - yAxis[_i2] / maxVolume * aidYaxisView.h);
        ctx.beginPath();
        ctx.moveTo(0, aidYaxisView.y + aidYaxisView.h - yAxis[_i2] / maxVolume * aidYaxisView.h);
        ctx.lineTo(aidYaxisView.x, aidYaxisView.y + aidYaxisView.h - yAxis[_i2] / maxVolume * aidYaxisView.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.strokeStyle = this.colors.textColor;
    for (var _i3 = 0; _i3 < yAxis.length; _i3++) {
        var x = aidYaxisView.x;
        var y = aidYaxisView.y + aidYaxisView.h - yAxis[_i3] / maxVolume * aidYaxisView.h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
    }

    ctx.fillStyle = this.colors.greenColor;
    for (var _i4 = startIndex, j = 0; _i4 < endIndex; _i4++, j++) {
        if (_i4 >= this.state.times.length) {
            break;
        }
        if (this.state.start[_i4] < this.state.close[_i4]) {
            var _x = (j + 0.1) * aidView.w / verticalRectNumber + aidView.x;
            var w = aidView.w / verticalRectNumber * 0.8;
            var h = -realVolume[j] / maxVolume * aidView.h;
            var _y = aidView.y + aidView.h;
            ctx.fillRect(_x, _y, w, h);
        }
    }

    ctx.fillStyle = this.colors.redColor;
    for (var _i5 = startIndex, _j = 0; _i5 < endIndex; _i5++, _j++) {
        if (_i5 >= this.state.times.length) {
            break;
        }
        if (this.state.close[_i5] <= this.state.start[_i5]) {
            var _x2 = (_j + 0.1) * aidView.w / verticalRectNumber + aidView.x;
            var _w = aidView.w / verticalRectNumber * 0.8;
            var _h = -realVolume[_j] / maxVolume * aidView.h;
            var _y2 = aidView.y + aidView.h;
            ctx.fillRect(_x2, _y2, _w, _h);
        }
    }
    ctx.beginPath();
    for (var _i6 = startIndex, _j2 = 0; _j2 < verticalRectNumber; _i6++, _j2++) {
        if (_i6 >= this.state.times.length) {
            break;
        }
        ctx.strokeStyle = this.colors.ma30Color;
        var _x3 = _j2 * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        var _y3 = (maxVolume - this.state.volumeMa30[_i6]) / maxVolume * aidView.h + aidView.y;
        if (_j2 == 0) {
            ctx.moveTo(_x3, _y3);
        }
        ctx.lineTo(_x3, _y3);
    }
    ctx.stroke();

    ctx.beginPath();
    for (var _i7 = startIndex, _j3 = 0; _j3 < verticalRectNumber; _i7++, _j3++) {
        if (_i7 >= this.state.times.length) {
            break;
        }
        ctx.strokeStyle = this.colors.ma7Color;
        var _x4 = _j3 * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        var _y4 = (maxVolume - this.state.volumeMa7[_i7]) / maxVolume * aidView.h + aidView.y;
        if (_j3 == 0) {
            ctx.moveTo(_x4, _y4);
        }
        ctx.lineTo(_x4, _y4);
    }
    ctx.stroke();
    ctx.closePath();
}

function drawMacd() {
    var _this2 = this;

    var ctx = this.ctx;

    var _state$range2 = (0, _slicedToArray3.default)(this.state.range, 2),
        startIndex = _state$range2[0],
        endIndex = _state$range2[1];

    var verticalRectNumber = endIndex - startIndex;
    var aidView = this.aidView;
    var aidYaxisView = this.aidYaxisView;

    var max = 0;
    var min = 0;
    this.state.macd.forEach(function (el, i) {
        if (i < startIndex || i >= endIndex) {
            return;
        }
        var val = Math.max(el, _this2.state.dif[i], _this2.state.dea[i]);
        max = max > val ? max : val;
        val = Math.min(el, _this2.state.dif[i], _this2.state.dea[i]);
        min = min < val ? min : val;
    });
    max = (max > Math.abs(min) ? max : Math.abs(min)) * 1.25;
    this.csiYaxisSector = [max, -max];
    var yAxis = [max, max * 2 / 3, max / 3, -max / 3, -max * 2 / 3, -max];

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (var i = 1; i < yAxis.length - 1; i++) {
        ctx.fillText(this.setDP(yAxis[i]), aidYaxisView.x + aidYaxisView.w * 0.5, aidYaxisView.y + i / (yAxis.length - 1) * aidYaxisView.h);
        ctx.beginPath();
        ctx.moveTo(0, aidYaxisView.y + i / (yAxis.length - 1) * aidYaxisView.h);
        ctx.lineTo(aidYaxisView.x, aidYaxisView.y + i / (yAxis.length - 1) * aidYaxisView.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.fillStyle = this.colors.greenColor;
    ctx.strokeStyle = this.colors.greenColor;
    for (var _i8 = startIndex, j = 0; _i8 < endIndex; _i8++, j++) {
        if (_i8 >= this.state.times.length) {
            break;
        }
        if (this.state.macd[_i8] > 0) {
            var y = aidView.y + aidView.h * 0.5;
            var w = aidView.w / verticalRectNumber * 0.8;
            var x = j * aidView.w / verticalRectNumber + aidView.x + w * 0.1;
            var h = -this.state.macd[_i8] / max * aidView.h * 0.5;
            if (Math.abs(this.state.macd[_i8]) > Math.abs(this.state.macd[_i8 - 1])) {
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
    for (var _i9 = startIndex, _j4 = 0; _i9 < endIndex; _i9++, _j4++) {
        if (_i9 >= this.state.times.length) {
            break;
        }
        if (this.state.macd[_i9] <= 0) {
            var _y5 = aidView.y + aidView.h * 0.5;
            var _w2 = aidView.w / verticalRectNumber * 0.8;
            var _x5 = _j4 * aidView.w / verticalRectNumber + aidView.x + _w2 * 0.1;
            var _h2 = -this.state.macd[_i9] / max * aidView.h * 0.5;
            if (Math.abs(this.state.macd[_i9]) > Math.abs(this.state.macd[_i9 - 1])) {
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
    for (var _i10 = startIndex, _j5 = 0; _i10 < endIndex; _i10++, _j5++) {
        if (_i10 >= this.state.times.length) {
            break;
        }
        var _x6 = _j5 * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        var _y6 = (max - this.state.dif[_i10]) / (2 * max) * aidView.h + aidView.y;
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
    for (var _i11 = startIndex, _j6 = 0; _i11 < endIndex; _i11++, _j6++) {
        if (_i11 >= this.state.times.length) {
            break;
        }
        var _x7 = _j6 * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        var _y7 = (max - this.state.dea[_i11]) / (2 * max) * aidView.h + aidView.y;
        if (_j6 === 0) {
            ctx.moveTo(_x7, _y7);
            continue;
        }
        ctx.lineTo(_x7, _y7);
    }
    ctx.stroke();
}

function drawKdj() {
    var _this3 = this;

    var ctx = this.ctx;

    var _state$range3 = (0, _slicedToArray3.default)(this.state.range, 2),
        startIndex = _state$range3[0],
        endIndex = _state$range3[1];

    var verticalRectNumber = endIndex - startIndex;
    var aidView = this.aidView;
    var aidYaxisView = this.aidYaxisView;

    var max = 0;
    var min = 0;
    this.state.k.forEach(function (el, i) {
        if (i < startIndex || i >= endIndex) {
            return;
        }
        var val = Math.max(el, _this3.state.d[i], _this3.state.j[i]);
        max = max > val ? max : val;
        val = Math.min(el, _this3.state.d[i], _this3.state.j[i]);
        min = min < val ? min : val;
    });
    this.csiYaxisSector = [max, min];

    max *= 1.1;
    var cha = max - min;

    var n = 0;
    if (cha >= 1) {
        n = cha.toFixed(0).length;
    } else {
        var str = cha.toString().split('.')[1];
        for (var i = 0; i < str.length; i++) {
            if (str.charAt[1] == 0) {
                n--;
            }
        }
    }
    var interval = Math.ceil(cha * 0.25 / Math.pow(10, n - 2)) * Math.pow(10, n - 2);
    var yAxis = [];
    for (var _i12 = 0; _i12 < max; _i12 += interval) {
        yAxis.unshift(_i12);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (var _i13 = 0; _i13 < yAxis.length; _i13++) {
        ctx.fillText(yAxis[_i13], aidYaxisView.x + aidYaxisView.w * 0.5, aidYaxisView.y + (max - yAxis[_i13]) / cha * aidYaxisView.h);
        ctx.beginPath();
        ctx.moveTo(0, aidYaxisView.y + (max - yAxis[_i13]) / cha * aidYaxisView.h);
        ctx.lineTo(aidYaxisView.x, aidYaxisView.y + (max - yAxis[_i13]) / cha * aidYaxisView.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.strokeStyle = this.colors.textColor;
    for (var _i14 = 0; _i14 < yAxis.length; _i14++) {
        var x = aidYaxisView.x;
        var y = aidYaxisView.y + (max - yAxis[_i14]) / cha * aidYaxisView.h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
    }

    ctx.strokeStyle = this.colors.ma7Color;
    ctx.beginPath();
    for (var _i15 = startIndex, j = 0; _i15 < endIndex; _i15++, j++) {
        if (_i15 >= this.state.times.length) {
            break;
        }
        var _x8 = j * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        var _y8 = (max - this.state.k[_i15]) / cha * aidView.h + aidView.y;
        if (j == 0) {
            ctx.moveTo(_x8, _y8);
        }
        ctx.lineTo(_x8, _y8);
    }
    ctx.stroke();

    ctx.strokeStyle = this.colors.ma30Color;
    ctx.beginPath();
    for (var _i16 = startIndex, _j7 = 0; _i16 < endIndex; _i16++, _j7++) {
        if (_i16 >= this.state.times.length) {
            break;
        }
        var _x9 = _j7 * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        var _y9 = (max - this.state.d[_i16]) / cha * aidView.h + aidView.y;
        if (_j7 == 0) {
            ctx.moveTo(_x9, _y9);
        }
        ctx.lineTo(_x9, _y9);
    }
    ctx.stroke();

    ctx.strokeStyle = this.colors.macdColor;
    ctx.beginPath();
    for (var _i17 = startIndex, _j8 = 0; _i17 < endIndex; _i17++, _j8++) {
        if (_i17 >= this.state.times.length) {
            break;
        }
        var _x10 = _j8 * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        var _y10 = (max - this.state.j[_i17]) / cha * aidView.h + aidView.y;
        if (_j8 == 0) {
            ctx.moveTo(_x10, _y10);
        }
        ctx.lineTo(_x10, _y10);
    }
    ctx.stroke();
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = drawMain;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toInt(num) {
    return ~~(0.5 + num);
}
function drawMain(yaxis) {
    var ctx = this.ctx;

    var times = this.state.times;
    var timeStr = this.state.timeStr;
    var start = this.state.start;
    var hi = this.state.hi;
    var lo = this.state.lo;
    var close = this.state.close;

    var max = yaxis.max,
        min = yaxis.min,
        maxPrice = yaxis.maxPrice,
        maxPriceIndex = yaxis.maxPriceIndex,
        minPrice = yaxis.minPrice,
        minPriceIndex = yaxis.minPriceIndex,
        intervalY = yaxis.intervalY;


    var mainView = this.mainView;
    var mainYaxisView = this.mainYaxisView;
    var timeView = this.timeView;

    var _state$range = (0, _slicedToArray3.default)(this.state.range, 2),
        startIndex = _state$range[0],
        endIndex = _state$range[1];

    var verticalRectNumber = endIndex - startIndex;

    // y轴刻度数值 y轴刻度线
    ctx.fillStyle = this.colors.textColor;
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var lengthY = (max - min) / intervalY;
    for (var i = 0; i < lengthY; i++) {
        ctx.fillText((max - i * intervalY).toFixed(this.option.priceDecimal), toInt(mainYaxisView.x + mainYaxisView.w * 0.5), toInt(i * intervalY / (max - min) * mainYaxisView.h + mainYaxisView.y));

        var x = mainYaxisView.x;
        var y = i * intervalY / (max - min) * mainYaxisView.h + mainYaxisView.y;
        x = toInt(x);
        y = toInt(y);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    ctx.lineWidth = this.dpr;
    ctx.setLineDash([]);
    ctx.strokeStyle = this.colors.textColor;
    for (var _i = 0; _i < lengthY; _i++) {
        var _x = mainYaxisView.x;
        var _y = _i * intervalY / (max - min) * mainYaxisView.h + mainYaxisView.y;
        _x = toInt(_x);
        _y = toInt(_y);
        ctx.beginPath();
        ctx.moveTo(_x + 10, _y);
        ctx.lineTo(_x, _y);
        ctx.stroke();
    }

    this.drawTimeline();

    // 蜡烛线
    ctx.strokeStyle = this.colors.redColor;
    ctx.fillStyle = this.colors.redColor;
    for (var _i2 = startIndex, j = 0; _i2 < endIndex; _i2++, j++) {
        if (_i2 >= times.length) {
            break;
        }
        if (close[_i2] > start[_i2]) {
            continue;
        }
        var _x2 = (j + 0.1) * mainView.w / verticalRectNumber + mainView.x;
        var _y2 = (max - Math.max(start[_i2], close[_i2])) / (max - min) * mainView.h + mainView.y;
        var w = mainView.w / verticalRectNumber * 0.8;
        var h = (Math.max(start[_i2], close[_i2]) - Math.min(start[_i2], close[_i2])) / (max - min) * mainView.h;
        _x2 = toInt(_x2);
        _y2 = toInt(_y2);
        w = toInt(w);
        h = toInt(h);
        ctx.fillRect(_x2, _y2, w, h < this.dpr ? this.dpr : h);
        var x1 = j * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
        var y1 = (max - hi[_i2]) / (max - min) * mainView.h + mainView.y;
        var x2 = x1;
        var y2 = (max - lo[_i2]) / (max - min) * mainView.h + mainView.y;
        x1 = toInt(x1);
        y1 = toInt(y1);
        x2 = toInt(x2);
        y2 = toInt(y2);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    ctx.strokeStyle = this.colors.greenColor;
    ctx.fillStyle = this.colors.greenColor;
    for (var _i3 = startIndex, _j = 0; _i3 < endIndex; _i3++, _j++) {
        if (_i3 >= times.length) {
            break;
        }
        if (close[_i3] <= start[_i3]) {
            continue;
        }
        var _x3 = (_j + 0.1) * mainView.w / verticalRectNumber + mainView.x;
        var _y3 = (max - Math.max(start[_i3], close[_i3])) / (max - min) * mainView.h + mainView.y;
        var _w = mainView.w / verticalRectNumber * 0.8;
        var _h = (Math.max(start[_i3], close[_i3]) - Math.min(start[_i3], close[_i3])) / (max - min) * mainView.h;
        _x3 = toInt(_x3);
        _y3 = toInt(_y3);
        _w = toInt(_w);
        _h = toInt(_h);
        ctx.fillRect(_x3, _y3, _w, _h < this.dpr ? this.dpr : _h);
        var _x4 = _j * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
        var _y4 = (max - hi[_i3]) / (max - min) * mainView.h + mainView.y;
        var _x5 = _x4;
        var _y5 = (max - lo[_i3]) / (max - min) * mainView.h + mainView.y;
        _x4 = toInt(_x4);
        _y4 = toInt(_y4);
        _x5 = toInt(_x5);
        _y5 = toInt(_y5);
        ctx.beginPath();
        ctx.moveTo(_x4, _y4);
        ctx.lineTo(_x5, _y5);
        ctx.stroke();
    }

    if (this.option.mainCsi === 'ma') {
        // ma30
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma30Color;
        for (var _i4 = startIndex, _j2 = 0; _j2 < verticalRectNumber; _i4++, _j2++) {
            if (_i4 >= times.length) {
                break;
            }
            var _x6 = _j2 * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
            var _y6 = (max - this.state.ma30[_i4]) / (max - min) * mainView.h + mainView.y;
            _x6 = toInt(_x6);
            _y6 = toInt(_y6);
            if (_j2 == 0) {
                ctx.moveTo(_x6, _y6);
            }
            ctx.lineTo(_x6, _y6);
        }
        ctx.stroke();

        // ma7
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma7Color;
        for (var _i5 = startIndex, _j3 = 0; _j3 < verticalRectNumber; _i5++, _j3++) {
            if (_i5 >= this.state.times.length) {
                break;
            }
            var _x7 = _j3 * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
            var _y7 = (max - this.state.ma7[_i5]) / (max - min) * mainView.h + mainView.y;
            _x7 = toInt(_x7);
            _y7 = toInt(_y7);
            if (_j3 == 0) {
                ctx.moveTo(_x7, _y7);
            }
            ctx.lineTo(_x7, _y7);
        }
        ctx.stroke();
    } else if (this.option.mainCsi === 'ema') {
        // ema30
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma30Color;
        for (var _i6 = startIndex, _j4 = 0; _j4 < verticalRectNumber; _i6++, _j4++) {
            if (_i6 >= times.length) {
                break;
            }
            var _x8 = _j4 * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
            var _y8 = (max - this.state.ema30[_i6]) / (max - min) * mainView.h + mainView.y;
            _x8 = toInt(_x8);
            _y8 = toInt(_y8);
            if (_j4 == 0) {
                ctx.moveTo(_x8, _y8);
            }
            ctx.lineTo(_x8, _y8);
        }
        ctx.stroke();

        // ema7
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma7Color;
        for (var _i7 = startIndex, _j5 = 0; _j5 < verticalRectNumber; _i7++, _j5++) {
            if (_i7 >= times.length) {
                break;
            }
            var _x9 = _j5 * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
            var _y9 = (max - this.state.ema7[_i7]) / (max - min) * mainView.h + mainView.y;
            _x9 = toInt(_x9);
            _y9 = toInt(_y9);
            if (_j5 == 0) {
                ctx.moveTo(_x9, _y9);
            }
            ctx.lineTo(_x9, _y9);
        }
        ctx.stroke();
    } else if (this.option.mainCsi === 'boll') {
        // UP
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma30Color;
        for (var _i8 = startIndex, _j6 = 0; _j6 < verticalRectNumber; _i8++, _j6++) {
            if (_i8 >= times.length) {
                break;
            }
            var _x10 = _j6 * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
            var _y10 = (max - this.state.up[_i8]) / (max - min) * mainView.h + mainView.y;
            _x10 = toInt(_x10);
            _y10 = toInt(_y10);
            if (_j6 == 0) {
                ctx.moveTo(_x10, _y10);
            }
            ctx.lineTo(_x10, _y10);
        }
        ctx.stroke();

        // MB
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma7Color;
        for (var _i9 = startIndex, _j7 = 0; _j7 < verticalRectNumber; _i9++, _j7++) {
            if (_i9 >= times.length) {
                break;
            }
            var _x11 = _j7 * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
            var _y11 = (max - this.state.mb[_i9]) / (max - min) * mainView.h + mainView.y;
            _x11 = toInt(_x11);
            _y11 = toInt(_y11);
            if (_j7 == 0) {
                ctx.moveTo(_x11, _y11);
            }
            ctx.lineTo(_x11, _y11);
        }
        ctx.stroke();

        // DN
        ctx.beginPath();
        ctx.strokeStyle = this.colors.macdColor;
        for (var _i10 = startIndex, _j8 = 0; _j8 < verticalRectNumber; _i10++, _j8++) {
            if (_i10 >= times.length) {
                break;
            }
            var _x12 = _j8 * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
            var _y12 = (max - this.state.dn[_i10]) / (max - min) * mainView.h + mainView.y;
            _x12 = toInt(_x12);
            _y12 = toInt(_y12);
            if (_j8 == 0) {
                ctx.moveTo(_x12, _y12);
            }
            ctx.lineTo(_x12, _y12);
        }
        ctx.stroke();
    } else if (this.option.mainCsi === 'sar') {
        ctx.strokeStyle = this.colors.macdColor;
        for (var _i11 = startIndex, _j9 = 0; _j9 < verticalRectNumber; _i11++, _j9++) {
            if (_i11 >= times.length) {
                break;
            }
            var _x13 = _j9 * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
            var _y13 = (max - this.state.sar[_i11]) / (max - min) * mainView.h + mainView.y;
            _x13 = toInt(_x13);
            _y13 = toInt(_y13);
            ctx.beginPath();
            ctx.arc(_x13, _y13, mainView.w / verticalRectNumber / 6, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    // 画最高点，最低点
    ctx.fillStyle = this.colors.textColor;
    ctx.textBaseline = 'middle';
    var index = maxPriceIndex - startIndex;
    var index1 = minPriceIndex - startIndex;
    var maxX = mainView.w / verticalRectNumber * 0.5 + (index + 0.1) * mainView.w / verticalRectNumber + mainView.x;
    var maxY = (max - maxPrice) / (max - min) * mainView.h + mainView.y;
    var minX = mainView.w / verticalRectNumber * 0.5 + (index1 + 0.1) * mainView.w / verticalRectNumber + mainView.x;
    var minY = (max - minPrice) / (max - min) * mainView.h + mainView.y;
    maxX = toInt(maxX);
    maxY = toInt(maxY);
    minX = toInt(minX);
    minY = toInt(minY);
    if (index < verticalRectNumber * 0.5) {
        ctx.textAlign = 'left';
        ctx.fillText(' ← ' + maxPrice, maxX, maxY);
    } else {
        ctx.textAlign = 'right';
        ctx.fillText(maxPrice + ' → ', maxX, maxY);
    }
    if (index1 < verticalRectNumber * 0.5) {
        ctx.textAlign = 'left';
        ctx.fillText(' ← ' + minPrice, minX, minY);
    } else {
        ctx.textAlign = 'right';
        ctx.fillText(minPrice + ' → ', minX, minY);
    }

    // 当前价格
    ctx.textAlign = 'left';
    ctx.fillStyle = this.colors.currentTextColor;
    ctx.fillText(' ← ' + close[close.length - 1], mainView.x + mainView.w, (max - close[close.length - 1]) / (max - min) * mainView.h + mainView.y);
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = drawTimeline;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toInt(num) {
    return ~~(0.5 + num);
}
var getPeriod = function getPeriod(n) {
    return function () {
        for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
            arr[_key] = arguments[_key];
        }

        if (Math.floor(n) >= arr.length) {
            return arr[arr.length - 1];
        } else {
            return arr[Math.floor(n)];
        }
    };
};
function drawTimeline() {
    var ctx = this.ctx;
    var times = this.state.times;
    var timeStr = this.state.timeStr;
    var mainView = this.mainView;
    var timeView = this.timeView;

    var _state$range = (0, _slicedToArray3.default)(this.state.range, 2),
        startIndex = _state$range[0],
        endIndex = _state$range[1];

    var verticalRectNumber = endIndex - startIndex;
    var period = this.option.period;
    // 时间轴
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var p = void 0;
    var n = verticalRectNumber / this.maxVerticalRectNumber * 5;
    if (period === 60) {
        p = getPeriod(n)(600, 1200, 1800, 2400, 3000);
    } else if (period === 60 * 3) {
        p = getPeriod(n)(600 * 3, 1200 * 3, 1800 * 3, 2400 * 3, 3000 * 3);
    } else if (period === 60 * 5) {
        p = getPeriod(n)(600 * 5, 1200 * 5, 1800 * 5, 2400 * 5, 3000 * 5);
    } else if (period === 60 * 15) {
        p = getPeriod(n)(600 * 15, 1200 * 15, 1800 * 15, 2400 * 15, 3000 * 15, 3600 * 15);
    } else if (period === 60 * 30) {
        p = getPeriod(n)(600 * 30, 1200 * 30, 1800 * 30, 2400 * 30, 3000 * 30, 3600 * 30);
    } else if (period === 60 * 60) {
        p = getPeriod(n)(600 * 60, 1200 * 60, 1800 * 60, 2400 * 60, 3000 * 60, 3600 * 60);
    } else if (period === 60 * 60 * 12) {
        p = getPeriod(n)(600 * 60 * 12, 1200 * 60 * 12, 1800 * 60 * 12, 2400 * 60 * 12, 3000 * 60 * 12, 3600 * 60 * 12);
    } else if (period === 60 * 60 * 24) {
        p = getPeriod(n)(600 * 60 * 24, 1200 * 60 * 24, 1800 * 60 * 24, 2400 * 60 * 24, 3000 * 60 * 24, 3600 * 60 * 24);
    } else if (period === 60 * 60 * 24 * 7) {
        p = getPeriod(n)(600 * 60 * 24 * 7, 1200 * 60 * 24 * 7, 1800 * 60 * 24 * 7, 2400 * 60 * 24 * 7, 3000 * 60 * 24 * 7, 3600 * 60 * 24 * 7);
    } else if (period === 60 * 60 * 24 * 30) {
        p = false;
    }
    var timeFilterParams = [];
    for (var i = startIndex; i < endIndex; i++) {
        if (i >= times.length) {
            break;
        }
        if (times[i] % p === 0) {
            var x = (i - startIndex) / verticalRectNumber * mainView.w + mainView.x;
            var y = timeView.y + timeView.h * 0.5;
            x = toInt(x);
            y = toInt(y);
            timeFilterParams.push({ x: x, y: y, time: times[i] });
            ctx.beginPath();
            ctx.moveTo(x, this.height - 2);
            ctx.lineTo(x, this.height - 8);
            ctx.stroke();
        }
    }
    this.option.timeFilter(ctx, timeFilterParams);
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(21);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = operation;
exports.drawHairLine = drawHairLine;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function operation(canvas, overCanvas) {
    var _this = this;

    var overCtx = this.overCtx;
    var mainView = this.mainView,
        mainYaxisView = this.mainYaxisView,
        aidView = this.aidView,
        aidYaxisView = this.aidYaxisView;


    var isDown = false;
    var lastIndex = -1;
    var lastTouchDistance = 0;

    var move = function move(e) {
        var pos = _this.getMousePos(e);

        var _state$range = (0, _slicedToArray3.default)(_this.state.range, 2),
            startIndex = _state$range[0],
            endIndex = _state$range[1];

        var verticalRectNumber = endIndex - startIndex;
        var currentIndex = Math.floor((pos.x - aidView.x) / aidView.w * verticalRectNumber);
        if (isDown) {
            _this.moveRange(currentIndex - lastIndex);
        }
        if (_this.isInLineView(pos)) {
            _this.pos = pos;
            _this.forceUpdate(false, true);
        } else {
            overCtx.clearRect(0, 0, _this.width, _this.height);
        }
        lastIndex = currentIndex;
    };

    var scale = function scale(n) {
        if (n > 20) {
            n = 20;
        }
        if (n < -20) {
            n = -20;
        }
        _this.scaleRange(n);
    };

    if (this.device === 'pc') {
        var mousedown = function mousedown(e) {
            isDown = true;
            var pos = _this.getMousePos(e);
            var verticalRectNumber = _this.state.range[1] - _this.state.range[0];
            var currentIndex = Math.floor((pos.x - aidView.x) / aidView.w * verticalRectNumber);
            lastIndex = currentIndex;
        };
        var mouseup = function mouseup() {
            isDown = false;
        };
        var mouseout = function mouseout() {
            isDown = false;
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
    } else {
        var touchstart = function touchstart(e) {
            isDown = true;
            if (e.targetTouches.length == 2) {
                var touch1 = _this.getMousePos(e.targetTouches[0]);
                var touch2 = _this.getMousePos(e.targetTouches[1]);
                lastTouchDistance = Math.sqrt(Math.pow(touch1.x - touch2.x, 2) + Math.pow(touch1.y - touch2.y, 2));
            } else if (e.targetTouches.length === 1) {
                var pos = _this.getMousePos(e.targetTouches[0]);

                var _state$range2 = (0, _slicedToArray3.default)(_this.state.range, 2),
                    startIndex = _state$range2[0],
                    endIndex = _state$range2[1];

                var verticalRectNumber = endIndex - startIndex;
                var currentIndex = Math.floor((pos.x - mainView.x) / mainView.w * verticalRectNumber);
                lastIndex = currentIndex;
                _this.pos = pos;
                _this.forceUpdate(false, true);
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

                var _state$range3 = (0, _slicedToArray3.default)(_this.state.range, 2),
                    startIndex = _state$range3[0],
                    endIndex = _state$range3[1];

                var verticalRectNumber = endIndex - startIndex;
                var n = verticalRectNumber - currentDistance / lastTouchDistance * verticalRectNumber;
                lastTouchDistance = currentDistance;
                if (n > 0) {
                    n = Math.ceil(n);
                } else {
                    n = Math.floor(n);
                }
                _this.pos = touch1;
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

function drawHairLine() {
    var pos = this.pos;
    if (!pos) {
        return;
    }
    var overCtx = this.overCtx;
    var mainView = this.mainView,
        mainYaxisView = this.mainYaxisView,
        aidView = this.aidView,
        aidYaxisView = this.aidYaxisView,
        timeView = this.timeView;

    var _state$range4 = (0, _slicedToArray3.default)(this.state.range, 2),
        startIndex = _state$range4[0],
        endIndex = _state$range4[1];

    var verticalRectNumber = endIndex - startIndex;

    var currentIndex = Math.floor((pos.x - aidView.x) / aidView.w * verticalRectNumber);
    var x = currentIndex * aidView.w / verticalRectNumber + aidView.w / verticalRectNumber * 0.5 + mainView.x;
    var y = pos.y;

    overCtx.clearRect(0, 0, this.width, this.height);
    if (currentIndex + startIndex >= this.state.times.length || currentIndex + startIndex < 0) {
        return;
    }

    overCtx.lineWidth = this.dpr;
    overCtx.strokeStyle = this.colors.hairLine;

    overCtx.beginPath();
    overCtx.moveTo(x, this.height);
    overCtx.lineTo(x, 0);
    overCtx.stroke();

    overCtx.beginPath();
    overCtx.moveTo(0, y);
    overCtx.lineTo(this.width, y);
    overCtx.stroke();

    // x轴坐标
    var currentTime = this.option.overTimeFilter(this.state.times[startIndex + currentIndex]);
    overCtx.textAlign = 'center';
    overCtx.textBaseline = 'middle';
    overCtx.fillStyle = this.colors.timeBackground;
    overCtx.fillRect(x - overCtx.measureText(currentTime).width * 0.5 - 10, this.height - timeView.h * 0.5, overCtx.measureText(currentTime).width + 20, timeView.h * 0.5 - this.dpr);
    overCtx.strokeStyle = this.colors.textFrameColor;
    overCtx.strokeRect(x - overCtx.measureText(currentTime).width * 0.5 - 10, this.height - timeView.h * 0.5, overCtx.measureText(currentTime).width + 20, timeView.h * 0.5 - this.dpr);
    overCtx.fillStyle = this.colors.textColor;
    overCtx.fillText(currentTime, x, this.height - (timeView.h * 0.5 - this.dpr) * 0.5);

    // 画y轴坐标

    var _computAxis = this.computAxis(),
        max = _computAxis.max,
        min = _computAxis.min;

    var view = mainYaxisView;
    var w = this.width - view.x;
    overCtx.textAlign = 'right';
    overCtx.textBaseline = 'middle';
    overCtx.fillStyle = this.colors.background;
    overCtx.fillRect(view.x, y - 16, w, 32);
    overCtx.strokeStyle = this.colors.textFrameColor;
    overCtx.strokeRect(view.x, y - 16, w, 32);
    overCtx.fillStyle = this.colors.textColor;

    overCtx.textAlign = 'center';
    if (this.isInLineView(pos) === mainView) {
        var yText = max - (max - min) * (y - view.y) / view.h;
        overCtx.fillText(yText.toFixed(this.option.priceDecimal), mainYaxisView.x + mainYaxisView.w * 0.5, y);
    } else {
        view = aidYaxisView;
        if (this.option.aidCsi === 'volume') {
            var _yText = (1 - (y - view.y) / view.h) * (this.csiYaxisSector[0] - this.csiYaxisSector[1]);
            overCtx.fillText(this.setDP(_yText), mainYaxisView.x + mainYaxisView.w * 0.5, y);
        } else if (this.option.aidCsi === 'macd' || this.option.aidCsi === 'kdj') {
            var _yText2 = this.csiYaxisSector[1] * (y - view.y) / view.h + this.csiYaxisSector[0] * (1 - (y - view.y) / view.h);
            overCtx.fillText(this.setDP(_yText2), mainYaxisView.x + mainYaxisView.w * 0.5, y);
        }
    }

    var basicSelectOption = {
        time: this.state.times[currentIndex + startIndex],
        start: this.state.start[currentIndex + startIndex],
        hi: this.state.hi[currentIndex + startIndex],
        lo: this.state.lo[currentIndex + startIndex],
        close: this.state.close[currentIndex + startIndex],
        volume: this.state.volume[currentIndex + startIndex]
    };
    var selectOption = (0, _extends3.default)({}, basicSelectOption);
    if (this.option.mainCsi === 'ma') {
        selectOption = (0, _extends3.default)({}, selectOption, {
            ma7: this.state.ma7[currentIndex + startIndex],
            ma30: this.state.ma30[currentIndex + startIndex]
        });
    } else if (this.option.mainCsi === 'ema') {
        selectOption = (0, _extends3.default)({}, selectOption, {
            ema7: this.state.ema7[currentIndex + startIndex],
            ema30: this.state.ema30[currentIndex + startIndex]
        });
    } else if (this.option.mainCsi === 'boll') {
        selectOption = (0, _extends3.default)({}, selectOption, {
            up: this.state.up[currentIndex + startIndex],
            mb: this.state.mb[currentIndex + startIndex],
            dn: this.state.dn[currentIndex + startIndex]
        });
    }

    this.select(selectOption, 0);

    if (this.option.aidCsi === 'volume') {
        this.select({
            volume: this.state.volume[currentIndex + startIndex],
            ma7: this.state.volumeMa7[currentIndex + startIndex],
            ma30: this.state.volumeMa30[currentIndex + startIndex]
        }, 1);
    }
    if (this.option.aidCsi === 'macd') {
        this.select({
            dif: this.state.dif[currentIndex + startIndex],
            dea: this.state.dea[currentIndex + startIndex],
            macd: this.state.macd[currentIndex + startIndex]
        }, 1);
    }
    if (this.option.aidCsi === 'kdj') {
        this.select({
            k: this.state.k[currentIndex + startIndex],
            d: this.state.d[currentIndex + startIndex],
            j: this.state.j[currentIndex + startIndex]
        }, 1);
    }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(21);

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = __webpack_require__(4);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.moveRange = moveRange;
exports.scaleRange = scaleRange;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function moveRange(distance) {
    var _state$range = (0, _slicedToArray3.default)(this.state.range, 2),
        startIndex = _state$range[0],
        endIndex = _state$range[1];

    var verticalRectNumber = endIndex - startIndex;
    var newStartIndex = startIndex - distance;
    var newEndIndex = endIndex - distance;
    if (newStartIndex >= this.state.times.length) {
        newStartIndex = this.state.times.length - 1;
        newEndIndex = newStartIndex + verticalRectNumber;
    }
    if (newStartIndex < 0) {
        newStartIndex = 0;
        newEndIndex = verticalRectNumber;
    }
    this.state = (0, _extends3.default)({}, this.state, { range: [newStartIndex, newEndIndex] });
}

function scaleRange(n) {
    var _state$range2 = (0, _slicedToArray3.default)(this.state.range, 2),
        startIndex = _state$range2[0],
        endIndex = _state$range2[1];

    var verticalRectNumber = endIndex - startIndex;
    var newStartIndex = startIndex - n;
    var newEndIndex = endIndex + n;
    if ((endIndex - startIndex) * 0.5 > this.state.times.length - startIndex) {
        newStartIndex += n;
        newEndIndex += n;
    }
    var newVerticalRectNumber = newEndIndex - newStartIndex;
    if (newVerticalRectNumber < this.minVerticalRectNumber) {
        newStartIndex = startIndex - (this.minVerticalRectNumber - verticalRectNumber) * 0.5;
        newEndIndex = endIndex + (this.minVerticalRectNumber - verticalRectNumber) * 0.5;
    }
    if (newVerticalRectNumber > this.maxVerticalRectNumber) {
        newStartIndex = startIndex - (this.maxVerticalRectNumber - verticalRectNumber) * 0.5;
        newEndIndex = endIndex + (this.maxVerticalRectNumber - verticalRectNumber) * 0.5;
    }
    newVerticalRectNumber = newEndIndex - newStartIndex;

    if (newStartIndex >= this.state.times.length) {
        newStartIndex = this.state.times.length - 1;
        newEndIndex = newStartIndex + newVerticalRectNumber;
    }
    if (newStartIndex < 0) {
        newStartIndex = 0;
        newEndIndex = newVerticalRectNumber;
    }
    this.state = (0, _extends3.default)({}, this.state, { range: [newStartIndex, newEndIndex] });
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(52);

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
                if (overCtx.measureText(text).width + x + 40 > this.mainView.x + this.mainView.w) {
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
            overCtx.fillStyle = this.colors.mobileBar;
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
                if (overCtx.measureText(_text).width + _x + 40 > this.mainView.x + this.mainView.w) {
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
        var _y2 = this.aidView.y;
        for (var _i2 = 0; _i2 < (0, _keys2.default)(data).length; _i2++) {
            var _key2 = (0, _keys2.default)(data)[_i2];
            var _text2 = transformKey(_key2) + '：' + data[_key2];
            if (overCtx.measureText(_text2).width + _x2 + 40 > this.mainView.x + this.mainView.w) {
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
    } else if (key === 'up') {
        return 'UP';
    } else if (key === 'mb') {
        return 'MB';
    } else if (key === 'dn') {
        return 'DN';
    } else if (key === 'k') {
        return 'K';
    } else if (key === 'd') {
        return 'D';
    } else if (key === 'j') {
        return 'J';
    } else {
        return key;
    }
}

function setStyle(key, ctx) {
    key = key.toLowerCase();
    if (key === 'ema7' || key === 'ma7' || key === 'dif' || key === 'mb' || key === 'k') {
        ctx.fillStyle = this.colors.ma7Color;
    } else if (key === 'ema30' || key === 'ma30' || key === 'dea' || key === 'up' || key === 'd') {
        ctx.fillStyle = this.colors.ma30Color;
    } else if (key === 'macd' || key === 'dn' || key === 'j') {
        ctx.fillStyle = this.colors.macdColor;
    } else {
        ctx.fillStyle = this.colors.textColorLight;
    }
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setData;
function setData() {
    var _this = this;

    var maxLength = -1;
    var data = this.option.data;
    var times = [];
    var start = [];
    var hi = [];
    var lo = [];
    var close = [];
    var volume = [];
    data.forEach(function (d) {
        times.push(d[0]);
        start.push(d[1]);
        hi.push(d[2]);
        lo.push(d[3]);
        close.push(d[4]);
        volume.push(d[5]);
        maxLength = Math.max(maxLength, d[1].toFixed(_this.option.priceDecimal).length, d[2].toFixed(_this.option.priceDecimal).length, d[3].toFixed(_this.option.priceDecimal).length, d[4].toFixed(_this.option.priceDecimal).length, d[5].toFixed(_this.option.priceDecimal).length);
    });
    this.state = {
        times: times,
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
        ma20: close.map(function (el, i) {
            if (i < 19) {
                return el;
            } else {
                var sum = 0;
                for (var index = i; index > i - 20; index--) {
                    sum += close[index];
                }
                return _this.setDP(sum / 20);
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
        }),
        isDown: false,
        range: data.length > 70 ? [data.length - 70, data.length + 18] : [0, 88]
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
        var macd = _this.setDP(val);
        maxLength = Math.max(maxLength, macd.toString().length);
        return macd;
    });

    // 计算BOLL
    this.state.up = [];
    this.state.mb = [];
    this.state.dn = [];
    this.state.ma20.forEach(function (el, i) {
        if (i === 0) {
            _this.state.mb.push(_this.state.ma20[i]);
            _this.state.up.push(_this.state.ma20[i]);
            _this.state.dn.push(_this.state.ma20[i]);
            return;
        }
        var sum = 0;
        for (var index = i < 20 ? 0 : i - 20; index < i; index++) {
            sum += Math.pow(_this.state.close[index] - _this.state.ma20[index], 2);
        }
        var md = Math.sqrt(sum / (i < 20 ? i : 20));
        _this.state.mb.push(_this.setDP(_this.state.ma20[i - 1]));
        _this.state.up.push(_this.setDP(_this.state.ma20[i - 1] + 2 * md));
        _this.state.dn.push(_this.setDP(_this.state.ma20[i - 1] - 2 * md));
    });

    // 计算kdj
    this.state.k = [];
    this.state.d = [];
    this.state.j = [];
    this.state.close.forEach(function (el, i) {
        var h = _this.state.hi[i - 8 < 0 ? 0 : i - 8];
        var l = _this.state.lo[i - 8 < 0 ? 0 : i - 8];
        var defaultIndex = i - 8 < 0 ? 0 : i - 8;
        for (var index = defaultIndex; index <= i; index++) {
            l = Math.min(_this.state.lo[index], l);
            h = Math.max(_this.state.hi[index], h);
        }
        var rsv = void 0;
        if (h === l) {
            rsv = 100;
        } else {
            rsv = (el - l) / (h - l) * 100;
        }
        if (i === 0) {
            _this.state.k.push(_this.setDP(100 / 3 + rsv / 3));
            _this.state.d.push(_this.setDP(100 / 3 + _this.state.k[i] / 3));
            _this.state.j.push(_this.setDP(3 * _this.state.k[i] - 2 * _this.state.d[i]));
            return;
        }
        _this.state.k.push(_this.setDP(2 / 3 * _this.state.k[i - 1] + rsv / 3));
        _this.state.d.push(_this.setDP(2 / 3 * _this.state.d[i - 1] + _this.state.k[i] / 3));
        _this.state.j.push(_this.setDP(3 * _this.state.k[i] - 2 * _this.state.d[i]));
    });

    // 计算sar
    this.state.sar = [];
    var af = 0.02;
    for (var i = 0; i < times.length; i++) {
        if (i === 0) {
            this.state.sar.push(this.state.lo[i]);
            continue;
        }
        if (i === 1) {
            this.state.sar.push(this.state.hi[i]);
            continue;
        }
        var ep = void 0;
        if (this.state.close[i] > this.state.close[i - 1]) {
            ep = Math.max(this.state.hi[i - 1], this.state.hi[i - 2]);
        } else {
            ep = Math.min(this.state.lo[i - 1], this.state.lo[i - 2]);
        }
        if (this.state.close[i] > this.state.close[i - 1] && this.state.close[i - 1] > this.state.close[i - 2]) {
            if (Math.max(this.state.hi[i], this.state.hi[i - 1]) > Math.max(this.state.hi[i - 1], this.state.hi[i - 2])) {
                af = af + 0.02 > 0.2 ? 0.2 : af + 0.02;
            }
        } else if (this.state.close[i] <= this.state.close[i - 1] && this.state.close[i - 1] <= this.state.close[i - 2]) {
            if (Math.min(this.state.lo[i], this.state.lo[i - 1]) < Math.min(this.state.lo[i - 1], this.state.lo[i - 2])) {
                af = af + 0.02 > 0.2 ? 0.2 : af + 0.02;
            }
        } else {
            af = 0.02;
        }
        var preSar = this.state.sar[i - 1];
        var sar = preSar + af * (ep - preSar);
        if (this.state.close[i] > this.state.close[i - 1]) {
            if (sar > this.state.lo[i] || sar > this.state.lo[i - 1] || sar > this.state.lo[i - 2]) {
                sar = Math.min(this.state.lo[i], this.state.lo[i - 1], this.state.lo[i - 2]);
            }
        } else {
            if (sar < this.state.hi[i] || sar < this.state.hi[i - 1] || sar < this.state.hi[i - 2]) {
                sar = Math.max(this.state.hi[i], this.state.hi[i - 1], this.state.hi[i - 2]);
            }
        }
        this.state.sar.push(sar);
    }

    return Math.ceil(this.ctx.measureText(Math.pow(10, maxLength)).width);
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setOption;
Date.prototype.format = function (fmt) {
    if (this == 'Invalid Date') {
        return '';
    }
    var o = {
        'M+': this.getMonth() + 1,
        'D+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};
function setOption() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    var data = option.data;
    if (this.option) {
        var lastPeriod = this.option.period;
        this.option = {
            theme: option.theme || this.option.theme,
            fontSize: option.fontSize || this.option.fontSize,
            mainCsi: option.mainCsi || this.option.mainCsi,
            aidCsi: option.aidCsi || this.option.aidCsi,
            timeFilter: option.timeFilter || this.option.timeFilter,
            overTimeFilter: option.overTimeFilter || this.option.overTimeFilter,
            priceDecimal: option.priceDecimal || this.option.priceDecimal,
            data: (data || this.option.data).map(function (d) {
                return d;
            }),
            period: option.period || this.option.period
        };
        var lastRange = this.state.range;
        init.call(this, option);
        if (lastPeriod === this.option.period) {
            this.state.range = lastRange;
        }
    } else {
        this.option = {
            theme: option.theme || 'dark',
            fontSize: option.fontSize || 12,
            mainCsi: option.mainCsi || 'ma',
            aidCsi: option.aidCsi || 'volume',
            timeFilter: option.timeFilter || function (t) {
                return new Date(t * 1000).toString('M/d/yyyy');
            },
            overTimeFilter: option.overTimeFilter || function (t) {
                return new Date(t * 1000).toString('M/d/yyyy');
            },
            priceDecimal: option.priceDecimal === undefined ? 0 : option.priceDecimal,
            data: (data || []).map(function (d) {
                return d;
            }),
            period: option.period || 60 * 60
        };

        init.call(this, option);
    }
}

function init() {
    this.device = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? 'mb' : 'pc';
    // 设置全局色彩
    var isDarkTheme = this.option.theme === 'dark';
    this.colors = {
        background: isDarkTheme ? '#2e3947' : 'white',
        timeBackground: isDarkTheme ? '#343f4d' : '#fff',
        splitLine: isDarkTheme ? 'rgb(66, 73, 82)' : '#eee',
        textColor: isDarkTheme ? '#fff' : '#333',
        currentTextColor: isDarkTheme ? 'rgb(239, 229, 46)' : 'rgb(242, 121, 53)',
        textFrameColor: isDarkTheme ? 'white' : 'black',
        greenColor: isDarkTheme ? '#3bd181' : '#48b484',
        redColor: isDarkTheme ? '#eb3f2f' : '#d64541',
        ma30Color: isDarkTheme ? 'rgb(234, 177, 103)' : 'rgb(234, 177, 103)',
        ma7Color: isDarkTheme ? 'rgb(166, 206, 227)' : 'rgb(59, 187, 59)',
        macdColor: isDarkTheme ? 'rgb(208, 146, 209)' : 'rgb(208, 146, 209)',
        hairLine: isDarkTheme ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        mobileBar: isDarkTheme ? '#343f4d' : '#fafafa'
    };

    this.ctx.font = this.option.fontSize * this.dpr + 'px sans-serif';
    this.overCtx.font = this.option.fontSize * this.dpr + 'px sans-serif';

    var yAxisWidth = this.setData();

    var left = 20;
    var right = 20;
    var top = 40 * this.dpr;
    var bottom = 80;
    var middle = 20;

    var width = this.width;
    var height = this.height;

    this.proportion = 0.7;

    var mainView = {
        x: left,
        y: top,
        w: width - yAxisWidth - left - right - middle,
        h: (height - top - bottom) * this.proportion - middle * 0.5
    };
    var mainYaxisView = {
        x: mainView.w + mainView.x + middle,
        y: mainView.y,
        w: yAxisWidth,
        h: mainView.h
    };
    var aidView = {
        x: mainView.x,
        y: mainView.y + mainView.h + middle,
        w: mainView.w,
        h: (height - top - bottom) * (1 - this.proportion) + middle * 0.5
    };
    var aidYaxisView = {
        x: mainYaxisView.x,
        y: aidView.y,
        w: yAxisWidth,
        h: aidView.h
    };
    var timeView = {
        x: mainYaxisView.x,
        y: aidView.y + aidView.h,
        w: width,
        h: bottom
    };
    this.mainView = mainView;
    this.mainYaxisView = mainYaxisView;
    this.aidView = aidView;
    this.aidYaxisView = aidYaxisView;
    this.timeView = timeView;

    this.maxVerticalRectNumber = parseInt(mainView.w / this.dpr / 2) % 2 === 0 ? parseInt(mainView.w / this.dpr / 2) : parseInt(mainView.w / this.dpr / 2) + 1;
    this.minVerticalRectNumber = 30;
    this.force = [true, true];
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Depth = undefined;
exports.KLine = KLine;

var _setOption = __webpack_require__(46);

var _setOption2 = _interopRequireDefault(_setOption);

var _setData = __webpack_require__(45);

var _setData2 = _interopRequireDefault(_setData);

var _draw = __webpack_require__(38);

var _draw2 = _interopRequireDefault(_draw);

var _drawMain = __webpack_require__(40);

var _drawMain2 = _interopRequireDefault(_drawMain);

var _drawAid = __webpack_require__(39);

var _drawAid2 = _interopRequireDefault(_drawAid);

var _drawTimeline = __webpack_require__(41);

var _drawTimeline2 = _interopRequireDefault(_drawTimeline);

var _operation = __webpack_require__(42);

var _operation2 = _interopRequireDefault(_operation);

var _select = __webpack_require__(44);

var _select2 = _interopRequireDefault(_select);

var _range = __webpack_require__(43);

var _computAxis = __webpack_require__(37);

var _computAxis2 = _interopRequireDefault(_computAxis);

var _canDraw = __webpack_require__(36);

var _canDraw2 = _interopRequireDefault(_canDraw);

var _Depth = __webpack_require__(35);

var _Depth2 = _interopRequireDefault(_Depth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function KLine(canvas, overCanvas, option) {
    this.canvas = canvas;
    this.overCanvas = overCanvas;
    if (canvas.width !== overCanvas.width || canvas.height !== overCanvas.height) {
        console.log('Two canvas\'s width and height must equal');
        return;
    }
    this.ctx = canvas.getContext('2d');
    this.overCtx = overCanvas.getContext('2d');
    this.dpr = canvas.width / canvas.getBoundingClientRect().width;
    this.setOption(option);
    this.draw();
    this.operation(canvas, overCanvas);
}

KLine.prototype = {
    setOption: _setOption2.default,
    setData: _setData2.default,
    draw: _draw2.default,
    drawMain: _drawMain2.default,
    drawAid: _drawAid2.default,
    drawHairLine: _operation.drawHairLine,
    drawTimeline: _drawTimeline2.default,
    operation: _operation2.default,
    select: _select2.default,
    getMousePos: getMousePos,
    setDP: setDP,
    isInLineView: isInLineView,
    moveRange: _range.moveRange,
    scaleRange: _range.scaleRange,
    canDraw: _canDraw2.default,
    computAxis: _computAxis2.default,
    forceUpdate: function forceUpdate(canvasCanDraw, overCanvasCanDraw) {
        this.force = [canvasCanDraw || this.force[0], overCanvasCanDraw || this.force[1]];
    }
};

// 获取鼠标在canvas上的坐标点
function getMousePos(e) {
    var rect = e.target.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * this.dpr,
        y: (e.clientY - rect.top) * this.dpr
    };
}

// 控制小数位数
function setDP(num) {
    return Math.abs(num) > 0.1 ? Number(num.toFixed(2)) : Number(num.toFixed(7));
}

// 判断鼠标是否在${this.views}中
function isInLineView(pos) {
    var x = pos.x,
        y = pos.y;

    var view1 = this.mainView;
    var view2 = this.aidView;
    if (x >= view1.x && x < view1.x + view1.w && y >= view1.y && y < view1.y + view1.h) {
        return view1;
    } else if (x >= view2.x && x < view2.x + view2.w && y >= view2.y && y < view2.y + view2.h) {
        return view2;
    } else {
        return false;
    }
}

_Depth2.default.prototype.getMousePos = getMousePos;
_Depth2.default.prototype.setDP = setDP;

exports.Depth = _Depth2.default;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(54), __esModule: true };

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(48);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
__webpack_require__(85);
module.exports = __webpack_require__(1).Array.from;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
__webpack_require__(20);
module.exports = __webpack_require__(83);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
__webpack_require__(20);
module.exports = __webpack_require__(84);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(1).Object.assign;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
module.exports = __webpack_require__(1).Object.keys;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19)
  , toLength  = __webpack_require__(31)
  , toIndex   = __webpack_require__(81);
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(11)
  , createDesc      = __webpack_require__(16);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(9)(function(){
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(3)
  , ITERATOR   = __webpack_require__(0)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(72)
  , descriptor     = __webpack_require__(16)
  , setToStringTag = __webpack_require__(29)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(0)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(0)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(15)
  , gOPS     = __webpack_require__(74)
  , pIE      = __webpack_require__(77)
  , toObject = __webpack_require__(12)
  , IObject  = __webpack_require__(27)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(9)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(5)
  , dPs         = __webpack_require__(73)
  , enumBugKeys = __webpack_require__(26)
  , IE_PROTO    = __webpack_require__(17)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(25)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(63).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(11)
  , anObject = __webpack_require__(5)
  , getKeys  = __webpack_require__(15);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 74 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(10)
  , toObject    = __webpack_require__(12)
  , IE_PROTO    = __webpack_require__(17)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(10)
  , toIObject    = __webpack_require__(19)
  , arrayIndexOf = __webpack_require__(61)(false)
  , IE_PROTO     = __webpack_require__(17)('IE_PROTO');

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
/* 77 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(8)
  , core    = __webpack_require__(1)
  , fails   = __webpack_require__(9);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18)
  , defined   = __webpack_require__(13);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(18)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5)
  , get      = __webpack_require__(33);
module.exports = __webpack_require__(1).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(22)
  , ITERATOR  = __webpack_require__(0)('iterator')
  , Iterators = __webpack_require__(3);
module.exports = __webpack_require__(1).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(24)
  , $export        = __webpack_require__(8)
  , toObject       = __webpack_require__(12)
  , call           = __webpack_require__(66)
  , isArrayIter    = __webpack_require__(65)
  , toLength       = __webpack_require__(31)
  , createProperty = __webpack_require__(62)
  , getIterFn      = __webpack_require__(33);

$export($export.S + $export.F * !__webpack_require__(68)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(60)
  , step             = __webpack_require__(69)
  , Iterators        = __webpack_require__(3)
  , toIObject        = __webpack_require__(19);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(28)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(8);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(71)});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(12)
  , $keys    = __webpack_require__(15);

__webpack_require__(78)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ })
/******/ ]);
});