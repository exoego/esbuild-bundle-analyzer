// src/index.ts
import { pathToFileURL } from "node:url";

// src/compare.ts
import fs2 from "node:fs";
import path from "node:path";

// node_modules/tslib/tslib.es6.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

// node_modules/zrender/lib/core/platform.js
var DEFAULT_FONT_SIZE = 12;
var DEFAULT_FONT_FAMILY = "sans-serif";
var DEFAULT_FONT = DEFAULT_FONT_SIZE + "px " + DEFAULT_FONT_FAMILY;
var OFFSET = 20;
var SCALE = 100;
var defaultWidthMapStr = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function getTextWidthMap(mapStr) {
  var map3 = {};
  if (typeof JSON === "undefined") {
    return map3;
  }
  for (var i = 0; i < mapStr.length; i++) {
    var char = String.fromCharCode(i + 32);
    var size = (mapStr.charCodeAt(i) - OFFSET) / SCALE;
    map3[char] = size;
  }
  return map3;
}
var DEFAULT_TEXT_WIDTH_MAP = getTextWidthMap(defaultWidthMapStr);
var platformApi = {
  createCanvas: function() {
    return typeof document !== "undefined" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ function() {
    var _ctx;
    var _cachedFont;
    return function(text, font) {
      if (!_ctx) {
        var canvas = platformApi.createCanvas();
        _ctx = canvas && canvas.getContext("2d");
      }
      if (_ctx) {
        if (_cachedFont !== font) {
          _cachedFont = _ctx.font = font || DEFAULT_FONT;
        }
        return _ctx.measureText(text);
      } else {
        text = text || "";
        font = font || DEFAULT_FONT;
        var res = /(\d+)px/.exec(font);
        var fontSize = res && +res[1] || DEFAULT_FONT_SIZE;
        var width = 0;
        if (font.indexOf("mono") >= 0) {
          width = fontSize * text.length;
        } else {
          for (var i = 0; i < text.length; i++) {
            var preCalcWidth = DEFAULT_TEXT_WIDTH_MAP[text[i]];
            width += preCalcWidth == null ? fontSize : preCalcWidth * fontSize;
          }
        }
        return { width };
      }
    };
  }(),
  loadImage: function(src, onload, onerror) {
    var image = new Image();
    image.onload = onload;
    image.onerror = onerror;
    image.src = src;
    return image;
  }
};

// node_modules/zrender/lib/core/util.js
var BUILTIN_OBJECT = reduce([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(obj, val) {
  obj["[object " + val + "]"] = true;
  return obj;
}, {});
var TYPED_ARRAY = reduce([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(obj, val) {
  obj["[object " + val + "Array]"] = true;
  return obj;
}, {});
var objToString = Object.prototype.toString;
var arrayProto = Array.prototype;
var nativeForEach = arrayProto.forEach;
var nativeFilter = arrayProto.filter;
var nativeSlice = arrayProto.slice;
var nativeMap = arrayProto.map;
var ctorFunction = function() {
}.constructor;
var protoFunction = ctorFunction ? ctorFunction.prototype : null;
var protoKey = "__proto__";
var idStart = 2311;
function guid() {
  return idStart++;
}
function logError() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  if (typeof console !== "undefined") {
    console.error.apply(console, args);
  }
}
function clone(source) {
  if (source == null || typeof source !== "object") {
    return source;
  }
  var result = source;
  var typeStr = objToString.call(source);
  if (typeStr === "[object Array]") {
    if (!isPrimitive(source)) {
      result = [];
      for (var i = 0, len2 = source.length; i < len2; i++) {
        result[i] = clone(source[i]);
      }
    }
  } else if (TYPED_ARRAY[typeStr]) {
    if (!isPrimitive(source)) {
      var Ctor = source.constructor;
      if (Ctor.from) {
        result = Ctor.from(source);
      } else {
        result = new Ctor(source.length);
        for (var i = 0, len2 = source.length; i < len2; i++) {
          result[i] = source[i];
        }
      }
    }
  } else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
    result = {};
    for (var key in source) {
      if (source.hasOwnProperty(key) && key !== protoKey) {
        result[key] = clone(source[key]);
      }
    }
  }
  return result;
}
function merge(target, source, overwrite) {
  if (!isObject(source) || !isObject(target)) {
    return overwrite ? clone(source) : target;
  }
  for (var key in source) {
    if (source.hasOwnProperty(key) && key !== protoKey) {
      var targetProp = target[key];
      var sourceProp = source[key];
      if (isObject(sourceProp) && isObject(targetProp) && !isArray(sourceProp) && !isArray(targetProp) && !isDom(sourceProp) && !isDom(targetProp) && !isBuiltInObject(sourceProp) && !isBuiltInObject(targetProp) && !isPrimitive(sourceProp) && !isPrimitive(targetProp)) {
        merge(targetProp, sourceProp, overwrite);
      } else if (overwrite || !(key in target)) {
        target[key] = clone(source[key]);
      }
    }
  }
  return target;
}
function extend(target, source) {
  if (Object.assign) {
    Object.assign(target, source);
  } else {
    for (var key in source) {
      if (source.hasOwnProperty(key) && key !== protoKey) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
function defaults(target, source, overlay) {
  var keysArr = keys(source);
  for (var i = 0; i < keysArr.length; i++) {
    var key = keysArr[i];
    if (overlay ? source[key] != null : target[key] == null) {
      target[key] = source[key];
    }
  }
  return target;
}
var createCanvas = platformApi.createCanvas;
function indexOf(array, value) {
  if (array) {
    if (array.indexOf) {
      return array.indexOf(value);
    }
    for (var i = 0, len2 = array.length; i < len2; i++) {
      if (array[i] === value) {
        return i;
      }
    }
  }
  return -1;
}
function inherits(clazz, baseClazz) {
  var clazzPrototype = clazz.prototype;
  function F() {
  }
  F.prototype = baseClazz.prototype;
  clazz.prototype = new F();
  for (var prop in clazzPrototype) {
    if (clazzPrototype.hasOwnProperty(prop)) {
      clazz.prototype[prop] = clazzPrototype[prop];
    }
  }
  clazz.prototype.constructor = clazz;
  clazz.superClass = baseClazz;
}
function mixin(target, source, override) {
  target = "prototype" in target ? target.prototype : target;
  source = "prototype" in source ? source.prototype : source;
  if (Object.getOwnPropertyNames) {
    var keyList = Object.getOwnPropertyNames(source);
    for (var i = 0; i < keyList.length; i++) {
      var key = keyList[i];
      if (key !== "constructor") {
        if (override ? source[key] != null : target[key] == null) {
          target[key] = source[key];
        }
      }
    }
  } else {
    defaults(target, source, override);
  }
}
function isArrayLike(data) {
  if (!data) {
    return false;
  }
  if (typeof data === "string") {
    return false;
  }
  return typeof data.length === "number";
}
function each(arr, cb, context) {
  if (!(arr && cb)) {
    return;
  }
  if (arr.forEach && arr.forEach === nativeForEach) {
    arr.forEach(cb, context);
  } else if (arr.length === +arr.length) {
    for (var i = 0, len2 = arr.length; i < len2; i++) {
      cb.call(context, arr[i], i, arr);
    }
  } else {
    for (var key in arr) {
      if (arr.hasOwnProperty(key)) {
        cb.call(context, arr[key], key, arr);
      }
    }
  }
}
function map(arr, cb, context) {
  if (!arr) {
    return [];
  }
  if (!cb) {
    return slice(arr);
  }
  if (arr.map && arr.map === nativeMap) {
    return arr.map(cb, context);
  } else {
    var result = [];
    for (var i = 0, len2 = arr.length; i < len2; i++) {
      result.push(cb.call(context, arr[i], i, arr));
    }
    return result;
  }
}
function reduce(arr, cb, memo, context) {
  if (!(arr && cb)) {
    return;
  }
  for (var i = 0, len2 = arr.length; i < len2; i++) {
    memo = cb.call(context, memo, arr[i], i, arr);
  }
  return memo;
}
function filter(arr, cb, context) {
  if (!arr) {
    return [];
  }
  if (!cb) {
    return slice(arr);
  }
  if (arr.filter && arr.filter === nativeFilter) {
    return arr.filter(cb, context);
  } else {
    var result = [];
    for (var i = 0, len2 = arr.length; i < len2; i++) {
      if (cb.call(context, arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
    return result;
  }
}
function keys(obj) {
  if (!obj) {
    return [];
  }
  if (Object.keys) {
    return Object.keys(obj);
  }
  var keyList = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      keyList.push(key);
    }
  }
  return keyList;
}
function bindPolyfill(func, context) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  return function() {
    return func.apply(context, args.concat(nativeSlice.call(arguments)));
  };
}
var bind = protoFunction && isFunction(protoFunction.bind) ? protoFunction.call.bind(protoFunction.bind) : bindPolyfill;
function curry(func) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  return function() {
    return func.apply(this, args.concat(nativeSlice.call(arguments)));
  };
}
function isArray(value) {
  if (Array.isArray) {
    return Array.isArray(value);
  }
  return objToString.call(value) === "[object Array]";
}
function isFunction(value) {
  return typeof value === "function";
}
function isString(value) {
  return typeof value === "string";
}
function isStringSafe(value) {
  return objToString.call(value) === "[object String]";
}
function isNumber(value) {
  return typeof value === "number";
}
function isObject(value) {
  var type = typeof value;
  return type === "function" || !!value && type === "object";
}
function isBuiltInObject(value) {
  return !!BUILTIN_OBJECT[objToString.call(value)];
}
function isTypedArray(value) {
  return !!TYPED_ARRAY[objToString.call(value)];
}
function isDom(value) {
  return typeof value === "object" && typeof value.nodeType === "number" && typeof value.ownerDocument === "object";
}
function isGradientObject(value) {
  return value.colorStops != null;
}
function isRegExp(value) {
  return objToString.call(value) === "[object RegExp]";
}
function eqNaN(value) {
  return value !== value;
}
function retrieve() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  for (var i = 0, len2 = args.length; i < len2; i++) {
    if (args[i] != null) {
      return args[i];
    }
  }
}
function retrieve2(value0, value1) {
  return value0 != null ? value0 : value1;
}
function retrieve3(value0, value1, value2) {
  return value0 != null ? value0 : value1 != null ? value1 : value2;
}
function slice(arr) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  return nativeSlice.apply(arr, args);
}
function normalizeCssArray(val) {
  if (typeof val === "number") {
    return [val, val, val, val];
  }
  var len2 = val.length;
  if (len2 === 2) {
    return [val[0], val[1], val[0], val[1]];
  } else if (len2 === 3) {
    return [val[0], val[1], val[2], val[1]];
  }
  return val;
}
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
function trim(str) {
  if (str == null) {
    return null;
  } else if (typeof str.trim === "function") {
    return str.trim();
  } else {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }
}
var primitiveKey = "__ec_primitive__";
function setAsPrimitive(obj) {
  obj[primitiveKey] = true;
}
function isPrimitive(obj) {
  return obj[primitiveKey];
}
var MapPolyfill = function() {
  function MapPolyfill2() {
    this.data = {};
  }
  MapPolyfill2.prototype["delete"] = function(key) {
    var existed = this.has(key);
    if (existed) {
      delete this.data[key];
    }
    return existed;
  };
  MapPolyfill2.prototype.has = function(key) {
    return this.data.hasOwnProperty(key);
  };
  MapPolyfill2.prototype.get = function(key) {
    return this.data[key];
  };
  MapPolyfill2.prototype.set = function(key, value) {
    this.data[key] = value;
    return this;
  };
  MapPolyfill2.prototype.keys = function() {
    return keys(this.data);
  };
  MapPolyfill2.prototype.forEach = function(callback) {
    var data = this.data;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        callback(data[key], key);
      }
    }
  };
  return MapPolyfill2;
}();
var isNativeMapSupported = typeof Map === "function";
function maybeNativeMap() {
  return isNativeMapSupported ? /* @__PURE__ */ new Map() : new MapPolyfill();
}
var HashMap = function() {
  function HashMap2(obj) {
    var isArr = isArray(obj);
    this.data = maybeNativeMap();
    var thisMap = this;
    obj instanceof HashMap2 ? obj.each(visit) : obj && each(obj, visit);
    function visit(value, key) {
      isArr ? thisMap.set(value, key) : thisMap.set(key, value);
    }
  }
  HashMap2.prototype.hasKey = function(key) {
    return this.data.has(key);
  };
  HashMap2.prototype.get = function(key) {
    return this.data.get(key);
  };
  HashMap2.prototype.set = function(key, value) {
    this.data.set(key, value);
    return value;
  };
  HashMap2.prototype.each = function(cb, context) {
    this.data.forEach(function(value, key) {
      cb.call(context, value, key);
    });
  };
  HashMap2.prototype.keys = function() {
    var keys2 = this.data.keys();
    return isNativeMapSupported ? Array.from(keys2) : keys2;
  };
  HashMap2.prototype.removeKey = function(key) {
    this.data["delete"](key);
  };
  return HashMap2;
}();
function createHashMap(obj) {
  return new HashMap(obj);
}
function concatArray(a, b) {
  var newArray = new a.constructor(a.length + b.length);
  for (var i = 0; i < a.length; i++) {
    newArray[i] = a[i];
  }
  var offset = a.length;
  for (var i = 0; i < b.length; i++) {
    newArray[i + offset] = b[i];
  }
  return newArray;
}
function createObject(proto, properties) {
  var obj;
  if (Object.create) {
    obj = Object.create(proto);
  } else {
    var StyleCtor = function() {
    };
    StyleCtor.prototype = proto;
    obj = new StyleCtor();
  }
  if (properties) {
    extend(obj, properties);
  }
  return obj;
}
function hasOwn(own, prop) {
  return own.hasOwnProperty(prop);
}
function noop() {
}
var RADIAN_TO_DEGREE = 180 / Math.PI;

// node_modules/zrender/lib/core/env.js
var Browser = /* @__PURE__ */ function() {
  function Browser2() {
    this.firefox = false;
    this.ie = false;
    this.edge = false;
    this.newEdge = false;
    this.weChat = false;
  }
  return Browser2;
}();
var Env = /* @__PURE__ */ function() {
  function Env2() {
    this.browser = new Browser();
    this.node = false;
    this.wxa = false;
    this.worker = false;
    this.svgSupported = false;
    this.touchEventsSupported = false;
    this.pointerEventsSupported = false;
    this.domSupported = false;
    this.transformSupported = false;
    this.transform3dSupported = false;
    this.hasGlobalWindow = typeof window !== "undefined";
  }
  return Env2;
}();
var env = new Env();
if (typeof wx === "object" && typeof wx.getSystemInfoSync === "function") {
  env.wxa = true;
  env.touchEventsSupported = true;
} else if (typeof document === "undefined" && typeof self !== "undefined") {
  env.worker = true;
} else if (typeof navigator === "undefined" || navigator.userAgent.indexOf("Node.js") === 0) {
  env.node = true;
  env.svgSupported = true;
} else {
  detect(navigator.userAgent, env);
}
function detect(ua, env2) {
  var browser = env2.browser;
  var firefox = ua.match(/Firefox\/([\d.]+)/);
  var ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/.+?rv:(([\d.]+))/);
  var edge = ua.match(/Edge?\/([\d.]+)/);
  var weChat = /micromessenger/i.test(ua);
  if (firefox) {
    browser.firefox = true;
    browser.version = firefox[1];
  }
  if (ie) {
    browser.ie = true;
    browser.version = ie[1];
  }
  if (edge) {
    browser.edge = true;
    browser.version = edge[1];
    browser.newEdge = +edge[1].split(".")[0] > 18;
  }
  if (weChat) {
    browser.weChat = true;
  }
  env2.svgSupported = typeof SVGRect !== "undefined";
  env2.touchEventsSupported = "ontouchstart" in window && !browser.ie && !browser.edge;
  env2.pointerEventsSupported = "onpointerdown" in window && (browser.edge || browser.ie && +browser.version >= 11);
  env2.domSupported = typeof document !== "undefined";
  var style = document.documentElement.style;
  env2.transform3dSupported = (browser.ie && "transition" in style || browser.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in style) && !("OTransition" in style);
  env2.transformSupported = env2.transform3dSupported || browser.ie && +browser.version >= 9;
}
var env_default = env;

// node_modules/echarts/lib/util/clazz.js
var TYPE_DELIMITER = ".";
var IS_CONTAINER = "___EC__COMPONENT__CONTAINER___";
var IS_EXTENDED_CLASS = "___EC__EXTENDED_CLASS___";
function parseClassType(componentType) {
  var ret = {
    main: "",
    sub: ""
  };
  if (componentType) {
    var typeArr = componentType.split(TYPE_DELIMITER);
    ret.main = typeArr[0] || "";
    ret.sub = typeArr[1] || "";
  }
  return ret;
}
function checkClassType(componentType) {
  assert(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(componentType), 'componentType "' + componentType + '" illegal');
}
function isExtendedClass(clz) {
  return !!(clz && clz[IS_EXTENDED_CLASS]);
}
function enableClassExtend(rootClz, mandatoryMethods) {
  rootClz.$constructor = rootClz;
  rootClz.extend = function(proto) {
    if (process.env.NODE_ENV !== "production") {
      each(mandatoryMethods, function(method) {
        if (!proto[method]) {
          console.warn("Method `" + method + "` should be implemented" + (proto.type ? " in " + proto.type : "") + ".");
        }
      });
    }
    var superClass = this;
    var ExtendedClass;
    if (isESClass(superClass)) {
      ExtendedClass = /** @class */
      function(_super) {
        __extends(class_1, _super);
        function class_1() {
          return _super.apply(this, arguments) || this;
        }
        return class_1;
      }(superClass);
    } else {
      ExtendedClass = function() {
        (proto.$constructor || superClass).apply(this, arguments);
      };
      inherits(ExtendedClass, this);
    }
    extend(ExtendedClass.prototype, proto);
    ExtendedClass[IS_EXTENDED_CLASS] = true;
    ExtendedClass.extend = this.extend;
    ExtendedClass.superCall = superCall;
    ExtendedClass.superApply = superApply;
    ExtendedClass.superClass = superClass;
    return ExtendedClass;
  };
}
function isESClass(fn) {
  return isFunction(fn) && /^class\s/.test(Function.prototype.toString.call(fn));
}
function mountExtend(SubClz, SupperClz) {
  SubClz.extend = SupperClz.extend;
}
var classBase = Math.round(Math.random() * 10);
function enableClassCheck(target) {
  var classAttr = ["__\0is_clz", classBase++].join("_");
  target.prototype[classAttr] = true;
  if (process.env.NODE_ENV !== "production") {
    assert(!target.isInstance, 'The method "is" can not be defined.');
  }
  target.isInstance = function(obj) {
    return !!(obj && obj[classAttr]);
  };
}
function superCall(context, methodName) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  return this.superClass.prototype[methodName].apply(context, args);
}
function superApply(context, methodName, args) {
  return this.superClass.prototype[methodName].apply(context, args);
}
function enableClassManagement(target) {
  var storage = {};
  target.registerClass = function(clz) {
    var componentFullType = clz.type || clz.prototype.type;
    if (componentFullType) {
      checkClassType(componentFullType);
      clz.prototype.type = componentFullType;
      var componentTypeInfo = parseClassType(componentFullType);
      if (!componentTypeInfo.sub) {
        if (process.env.NODE_ENV !== "production") {
          if (storage[componentTypeInfo.main]) {
            console.warn(componentTypeInfo.main + " exists.");
          }
        }
        storage[componentTypeInfo.main] = clz;
      } else if (componentTypeInfo.sub !== IS_CONTAINER) {
        var container = makeContainer(componentTypeInfo);
        container[componentTypeInfo.sub] = clz;
      }
    }
    return clz;
  };
  target.getClass = function(mainType, subType, throwWhenNotFound) {
    var clz = storage[mainType];
    if (clz && clz[IS_CONTAINER]) {
      clz = subType ? clz[subType] : null;
    }
    if (throwWhenNotFound && !clz) {
      throw new Error(!subType ? mainType + ".type should be specified." : "Component " + mainType + "." + (subType || "") + " is used but not imported.");
    }
    return clz;
  };
  target.getClassesByMainType = function(componentType) {
    var componentTypeInfo = parseClassType(componentType);
    var result = [];
    var obj = storage[componentTypeInfo.main];
    if (obj && obj[IS_CONTAINER]) {
      each(obj, function(o, type) {
        type !== IS_CONTAINER && result.push(o);
      });
    } else {
      result.push(obj);
    }
    return result;
  };
  target.hasClass = function(componentType) {
    var componentTypeInfo = parseClassType(componentType);
    return !!storage[componentTypeInfo.main];
  };
  target.getAllClassMainTypes = function() {
    var types = [];
    each(storage, function(obj, type) {
      types.push(type);
    });
    return types;
  };
  target.hasSubTypes = function(componentType) {
    var componentTypeInfo = parseClassType(componentType);
    var obj = storage[componentTypeInfo.main];
    return obj && obj[IS_CONTAINER];
  };
  function makeContainer(componentTypeInfo) {
    var container = storage[componentTypeInfo.main];
    if (!container || !container[IS_CONTAINER]) {
      container = storage[componentTypeInfo.main] = {};
      container[IS_CONTAINER] = true;
    }
    return container;
  }
}

// node_modules/echarts/lib/model/mixin/makeStyleMapper.js
function makeStyleMapper(properties, ignoreParent) {
  for (var i = 0; i < properties.length; i++) {
    if (!properties[i][1]) {
      properties[i][1] = properties[i][0];
    }
  }
  ignoreParent = ignoreParent || false;
  return function(model, excludes, includes) {
    var style = {};
    for (var i2 = 0; i2 < properties.length; i2++) {
      var propName = properties[i2][1];
      if (excludes && indexOf(excludes, propName) >= 0 || includes && indexOf(includes, propName) < 0) {
        continue;
      }
      var val = model.getShallow(propName, ignoreParent);
      if (val != null) {
        style[properties[i2][0]] = val;
      }
    }
    return style;
  };
}

// node_modules/echarts/lib/model/mixin/areaStyle.js
var AREA_STYLE_KEY_MAP = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
];
var getAreaStyle = makeStyleMapper(AREA_STYLE_KEY_MAP);
var AreaStyleMixin = (
  /** @class */
  function() {
    function AreaStyleMixin2() {
    }
    AreaStyleMixin2.prototype.getAreaStyle = function(excludes, includes) {
      return getAreaStyle(this, excludes, includes);
    };
    return AreaStyleMixin2;
  }()
);

// node_modules/zrender/lib/core/LRU.js
var Entry = /* @__PURE__ */ function() {
  function Entry2(val) {
    this.value = val;
  }
  return Entry2;
}();
var LinkedList = function() {
  function LinkedList2() {
    this._len = 0;
  }
  LinkedList2.prototype.insert = function(val) {
    var entry = new Entry(val);
    this.insertEntry(entry);
    return entry;
  };
  LinkedList2.prototype.insertEntry = function(entry) {
    if (!this.head) {
      this.head = this.tail = entry;
    } else {
      this.tail.next = entry;
      entry.prev = this.tail;
      entry.next = null;
      this.tail = entry;
    }
    this._len++;
  };
  LinkedList2.prototype.remove = function(entry) {
    var prev = entry.prev;
    var next = entry.next;
    if (prev) {
      prev.next = next;
    } else {
      this.head = next;
    }
    if (next) {
      next.prev = prev;
    } else {
      this.tail = prev;
    }
    entry.next = entry.prev = null;
    this._len--;
  };
  LinkedList2.prototype.len = function() {
    return this._len;
  };
  LinkedList2.prototype.clear = function() {
    this.head = this.tail = null;
    this._len = 0;
  };
  return LinkedList2;
}();
var LRU = function() {
  function LRU2(maxSize) {
    this._list = new LinkedList();
    this._maxSize = 10;
    this._map = {};
    this._maxSize = maxSize;
  }
  LRU2.prototype.put = function(key, value) {
    var list = this._list;
    var map3 = this._map;
    var removed = null;
    if (map3[key] == null) {
      var len2 = list.len();
      var entry = this._lastRemovedEntry;
      if (len2 >= this._maxSize && len2 > 0) {
        var leastUsedEntry = list.head;
        list.remove(leastUsedEntry);
        delete map3[leastUsedEntry.key];
        removed = leastUsedEntry.value;
        this._lastRemovedEntry = leastUsedEntry;
      }
      if (entry) {
        entry.value = value;
      } else {
        entry = new Entry(value);
      }
      entry.key = key;
      list.insertEntry(entry);
      map3[key] = entry;
    }
    return removed;
  };
  LRU2.prototype.get = function(key) {
    var entry = this._map[key];
    var list = this._list;
    if (entry != null) {
      if (entry !== list.tail) {
        list.remove(entry);
        list.insertEntry(entry);
      }
      return entry.value;
    }
  };
  LRU2.prototype.clear = function() {
    this._list.clear();
    this._map = {};
  };
  LRU2.prototype.len = function() {
    return this._list.len();
  };
  return LRU2;
}();
var LRU_default = LRU;

// node_modules/zrender/lib/graphic/helper/image.js
var globalImageCache = new LRU_default(50);
function findExistImage(newImageOrSrc) {
  if (typeof newImageOrSrc === "string") {
    var cachedImgObj = globalImageCache.get(newImageOrSrc);
    return cachedImgObj && cachedImgObj.image;
  } else {
    return newImageOrSrc;
  }
}
function createOrUpdateImage(newImageOrSrc, image, hostEl, onload, cbPayload) {
  if (!newImageOrSrc) {
    return image;
  } else if (typeof newImageOrSrc === "string") {
    if (image && image.__zrImageSrc === newImageOrSrc || !hostEl) {
      return image;
    }
    var cachedImgObj = globalImageCache.get(newImageOrSrc);
    var pendingWrap = { hostEl, cb: onload, cbPayload };
    if (cachedImgObj) {
      image = cachedImgObj.image;
      !isImageReady(image) && cachedImgObj.pending.push(pendingWrap);
    } else {
      image = platformApi.loadImage(newImageOrSrc, imageOnLoad, imageOnLoad);
      image.__zrImageSrc = newImageOrSrc;
      globalImageCache.put(newImageOrSrc, image.__cachedImgObj = {
        image,
        pending: [pendingWrap]
      });
    }
    return image;
  } else {
    return newImageOrSrc;
  }
}
function imageOnLoad() {
  var cachedImgObj = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var i = 0; i < cachedImgObj.pending.length; i++) {
    var pendingWrap = cachedImgObj.pending[i];
    var cb = pendingWrap.cb;
    cb && cb(this, pendingWrap.cbPayload);
    pendingWrap.hostEl.dirty();
  }
  cachedImgObj.pending.length = 0;
}
function isImageReady(image) {
  return image && image.width && image.height;
}

// node_modules/zrender/lib/core/matrix.js
function create() {
  return [1, 0, 0, 1, 0, 0];
}
function identity(out2) {
  out2[0] = 1;
  out2[1] = 0;
  out2[2] = 0;
  out2[3] = 1;
  out2[4] = 0;
  out2[5] = 0;
  return out2;
}
function copy(out2, m) {
  out2[0] = m[0];
  out2[1] = m[1];
  out2[2] = m[2];
  out2[3] = m[3];
  out2[4] = m[4];
  out2[5] = m[5];
  return out2;
}
function mul(out2, m1, m2) {
  var out0 = m1[0] * m2[0] + m1[2] * m2[1];
  var out1 = m1[1] * m2[0] + m1[3] * m2[1];
  var out22 = m1[0] * m2[2] + m1[2] * m2[3];
  var out3 = m1[1] * m2[2] + m1[3] * m2[3];
  var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
  var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
  out2[0] = out0;
  out2[1] = out1;
  out2[2] = out22;
  out2[3] = out3;
  out2[4] = out4;
  out2[5] = out5;
  return out2;
}
function translate(out2, a, v) {
  out2[0] = a[0];
  out2[1] = a[1];
  out2[2] = a[2];
  out2[3] = a[3];
  out2[4] = a[4] + v[0];
  out2[5] = a[5] + v[1];
  return out2;
}
function rotate(out2, a, rad, pivot) {
  if (pivot === void 0) {
    pivot = [0, 0];
  }
  var aa = a[0];
  var ac = a[2];
  var atx = a[4];
  var ab = a[1];
  var ad = a[3];
  var aty = a[5];
  var st = Math.sin(rad);
  var ct = Math.cos(rad);
  out2[0] = aa * ct + ab * st;
  out2[1] = -aa * st + ab * ct;
  out2[2] = ac * ct + ad * st;
  out2[3] = -ac * st + ct * ad;
  out2[4] = ct * (atx - pivot[0]) + st * (aty - pivot[1]) + pivot[0];
  out2[5] = ct * (aty - pivot[1]) - st * (atx - pivot[0]) + pivot[1];
  return out2;
}
function scale(out2, a, v) {
  var vx = v[0];
  var vy = v[1];
  out2[0] = a[0] * vx;
  out2[1] = a[1] * vy;
  out2[2] = a[2] * vx;
  out2[3] = a[3] * vy;
  out2[4] = a[4] * vx;
  out2[5] = a[5] * vy;
  return out2;
}
function invert(out2, a) {
  var aa = a[0];
  var ac = a[2];
  var atx = a[4];
  var ab = a[1];
  var ad = a[3];
  var aty = a[5];
  var det = aa * ad - ab * ac;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out2[0] = ad * det;
  out2[1] = -ab * det;
  out2[2] = -ac * det;
  out2[3] = aa * det;
  out2[4] = (ac * aty - ad * atx) * det;
  out2[5] = (ab * atx - aa * aty) * det;
  return out2;
}

// node_modules/zrender/lib/core/Point.js
var Point = function() {
  function Point2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  Point2.prototype.copy = function(other) {
    this.x = other.x;
    this.y = other.y;
    return this;
  };
  Point2.prototype.clone = function() {
    return new Point2(this.x, this.y);
  };
  Point2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
  };
  Point2.prototype.equal = function(other) {
    return other.x === this.x && other.y === this.y;
  };
  Point2.prototype.add = function(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  };
  Point2.prototype.scale = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  };
  Point2.prototype.scaleAndAdd = function(other, scalar) {
    this.x += other.x * scalar;
    this.y += other.y * scalar;
  };
  Point2.prototype.sub = function(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  };
  Point2.prototype.dot = function(other) {
    return this.x * other.x + this.y * other.y;
  };
  Point2.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  Point2.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  };
  Point2.prototype.normalize = function() {
    var len2 = this.len();
    this.x /= len2;
    this.y /= len2;
    return this;
  };
  Point2.prototype.distance = function(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  };
  Point2.prototype.distanceSquare = function(other) {
    var dx = this.x - other.x;
    var dy = this.y - other.y;
    return dx * dx + dy * dy;
  };
  Point2.prototype.negate = function() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  };
  Point2.prototype.transform = function(m) {
    if (!m) {
      return;
    }
    var x = this.x;
    var y = this.y;
    this.x = m[0] * x + m[2] * y + m[4];
    this.y = m[1] * x + m[3] * y + m[5];
    return this;
  };
  Point2.prototype.toArray = function(out2) {
    out2[0] = this.x;
    out2[1] = this.y;
    return out2;
  };
  Point2.prototype.fromArray = function(input) {
    this.x = input[0];
    this.y = input[1];
  };
  Point2.set = function(p, x, y) {
    p.x = x;
    p.y = y;
  };
  Point2.copy = function(p, p2) {
    p.x = p2.x;
    p.y = p2.y;
  };
  Point2.len = function(p) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
  };
  Point2.lenSquare = function(p) {
    return p.x * p.x + p.y * p.y;
  };
  Point2.dot = function(p0, p1) {
    return p0.x * p1.x + p0.y * p1.y;
  };
  Point2.add = function(out2, p0, p1) {
    out2.x = p0.x + p1.x;
    out2.y = p0.y + p1.y;
  };
  Point2.sub = function(out2, p0, p1) {
    out2.x = p0.x - p1.x;
    out2.y = p0.y - p1.y;
  };
  Point2.scale = function(out2, p0, scalar) {
    out2.x = p0.x * scalar;
    out2.y = p0.y * scalar;
  };
  Point2.scaleAndAdd = function(out2, p0, p1, scalar) {
    out2.x = p0.x + p1.x * scalar;
    out2.y = p0.y + p1.y * scalar;
  };
  Point2.lerp = function(out2, p0, p1, t) {
    var onet = 1 - t;
    out2.x = onet * p0.x + t * p1.x;
    out2.y = onet * p0.y + t * p1.y;
  };
  return Point2;
}();
var Point_default = Point;

// node_modules/zrender/lib/core/BoundingRect.js
var mathMin = Math.min;
var mathMax = Math.max;
var lt = new Point_default();
var rb = new Point_default();
var lb = new Point_default();
var rt = new Point_default();
var minTv = new Point_default();
var maxTv = new Point_default();
var BoundingRect = function() {
  function BoundingRect2(x, y, width, height) {
    if (width < 0) {
      x = x + width;
      width = -width;
    }
    if (height < 0) {
      y = y + height;
      height = -height;
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  BoundingRect2.prototype.union = function(other) {
    var x = mathMin(other.x, this.x);
    var y = mathMin(other.y, this.y);
    if (isFinite(this.x) && isFinite(this.width)) {
      this.width = mathMax(other.x + other.width, this.x + this.width) - x;
    } else {
      this.width = other.width;
    }
    if (isFinite(this.y) && isFinite(this.height)) {
      this.height = mathMax(other.y + other.height, this.y + this.height) - y;
    } else {
      this.height = other.height;
    }
    this.x = x;
    this.y = y;
  };
  BoundingRect2.prototype.applyTransform = function(m) {
    BoundingRect2.applyTransform(this, this, m);
  };
  BoundingRect2.prototype.calculateTransform = function(b) {
    var a = this;
    var sx = b.width / a.width;
    var sy = b.height / a.height;
    var m = create();
    translate(m, m, [-a.x, -a.y]);
    scale(m, m, [sx, sy]);
    translate(m, m, [b.x, b.y]);
    return m;
  };
  BoundingRect2.prototype.intersect = function(b, mtv) {
    if (!b) {
      return false;
    }
    if (!(b instanceof BoundingRect2)) {
      b = BoundingRect2.create(b);
    }
    var a = this;
    var ax0 = a.x;
    var ax1 = a.x + a.width;
    var ay0 = a.y;
    var ay1 = a.y + a.height;
    var bx0 = b.x;
    var bx1 = b.x + b.width;
    var by0 = b.y;
    var by1 = b.y + b.height;
    var overlap = !(ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
    if (mtv) {
      var dMin = Infinity;
      var dMax = 0;
      var d0 = Math.abs(ax1 - bx0);
      var d1 = Math.abs(bx1 - ax0);
      var d2 = Math.abs(ay1 - by0);
      var d3 = Math.abs(by1 - ay0);
      var dx = Math.min(d0, d1);
      var dy = Math.min(d2, d3);
      if (ax1 < bx0 || bx1 < ax0) {
        if (dx > dMax) {
          dMax = dx;
          if (d0 < d1) {
            Point_default.set(maxTv, -d0, 0);
          } else {
            Point_default.set(maxTv, d1, 0);
          }
        }
      } else {
        if (dx < dMin) {
          dMin = dx;
          if (d0 < d1) {
            Point_default.set(minTv, d0, 0);
          } else {
            Point_default.set(minTv, -d1, 0);
          }
        }
      }
      if (ay1 < by0 || by1 < ay0) {
        if (dy > dMax) {
          dMax = dy;
          if (d2 < d3) {
            Point_default.set(maxTv, 0, -d2);
          } else {
            Point_default.set(maxTv, 0, d3);
          }
        }
      } else {
        if (dx < dMin) {
          dMin = dx;
          if (d2 < d3) {
            Point_default.set(minTv, 0, d2);
          } else {
            Point_default.set(minTv, 0, -d3);
          }
        }
      }
    }
    if (mtv) {
      Point_default.copy(mtv, overlap ? minTv : maxTv);
    }
    return overlap;
  };
  BoundingRect2.prototype.contain = function(x, y) {
    var rect = this;
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
  };
  BoundingRect2.prototype.clone = function() {
    return new BoundingRect2(this.x, this.y, this.width, this.height);
  };
  BoundingRect2.prototype.copy = function(other) {
    BoundingRect2.copy(this, other);
  };
  BoundingRect2.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  };
  BoundingRect2.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  };
  BoundingRect2.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  };
  BoundingRect2.create = function(rect) {
    return new BoundingRect2(rect.x, rect.y, rect.width, rect.height);
  };
  BoundingRect2.copy = function(target, source) {
    target.x = source.x;
    target.y = source.y;
    target.width = source.width;
    target.height = source.height;
  };
  BoundingRect2.applyTransform = function(target, source, m) {
    if (!m) {
      if (target !== source) {
        BoundingRect2.copy(target, source);
      }
      return;
    }
    if (m[1] < 1e-5 && m[1] > -1e-5 && m[2] < 1e-5 && m[2] > -1e-5) {
      var sx = m[0];
      var sy = m[3];
      var tx = m[4];
      var ty = m[5];
      target.x = source.x * sx + tx;
      target.y = source.y * sy + ty;
      target.width = source.width * sx;
      target.height = source.height * sy;
      if (target.width < 0) {
        target.x += target.width;
        target.width = -target.width;
      }
      if (target.height < 0) {
        target.y += target.height;
        target.height = -target.height;
      }
      return;
    }
    lt.x = lb.x = source.x;
    lt.y = rt.y = source.y;
    rb.x = rt.x = source.x + source.width;
    rb.y = lb.y = source.y + source.height;
    lt.transform(m);
    rt.transform(m);
    rb.transform(m);
    lb.transform(m);
    target.x = mathMin(lt.x, rb.x, lb.x, rt.x);
    target.y = mathMin(lt.y, rb.y, lb.y, rt.y);
    var maxX = mathMax(lt.x, rb.x, lb.x, rt.x);
    var maxY = mathMax(lt.y, rb.y, lb.y, rt.y);
    target.width = maxX - target.x;
    target.height = maxY - target.y;
  };
  return BoundingRect2;
}();
var BoundingRect_default = BoundingRect;

// node_modules/zrender/lib/contain/text.js
var textWidthCache = {};
function getWidth(text, font) {
  font = font || DEFAULT_FONT;
  var cacheOfFont = textWidthCache[font];
  if (!cacheOfFont) {
    cacheOfFont = textWidthCache[font] = new LRU_default(500);
  }
  var width = cacheOfFont.get(text);
  if (width == null) {
    width = platformApi.measureText(text, font).width;
    cacheOfFont.put(text, width);
  }
  return width;
}
function innerGetBoundingRect(text, font, textAlign, textBaseline) {
  var width = getWidth(text, font);
  var height = getLineHeight(font);
  var x = adjustTextX(0, width, textAlign);
  var y = adjustTextY(0, height, textBaseline);
  var rect = new BoundingRect_default(x, y, width, height);
  return rect;
}
function getBoundingRect(text, font, textAlign, textBaseline) {
  var textLines = ((text || "") + "").split("\n");
  var len2 = textLines.length;
  if (len2 === 1) {
    return innerGetBoundingRect(textLines[0], font, textAlign, textBaseline);
  } else {
    var uniondRect = new BoundingRect_default(0, 0, 0, 0);
    for (var i = 0; i < textLines.length; i++) {
      var rect = innerGetBoundingRect(textLines[i], font, textAlign, textBaseline);
      i === 0 ? uniondRect.copy(rect) : uniondRect.union(rect);
    }
    return uniondRect;
  }
}
function adjustTextX(x, width, textAlign) {
  if (textAlign === "right") {
    x -= width;
  } else if (textAlign === "center") {
    x -= width / 2;
  }
  return x;
}
function adjustTextY(y, height, verticalAlign) {
  if (verticalAlign === "middle") {
    y -= height / 2;
  } else if (verticalAlign === "bottom") {
    y -= height;
  }
  return y;
}
function getLineHeight(font) {
  return getWidth("\u56FD", font);
}
function parsePercent(value, maxValue) {
  if (typeof value === "string") {
    if (value.lastIndexOf("%") >= 0) {
      return parseFloat(value) / 100 * maxValue;
    }
    return parseFloat(value);
  }
  return value;
}
function calculateTextPosition(out2, opts, rect) {
  var textPosition = opts.position || "inside";
  var distance2 = opts.distance != null ? opts.distance : 5;
  var height = rect.height;
  var width = rect.width;
  var halfHeight = height / 2;
  var x = rect.x;
  var y = rect.y;
  var textAlign = "left";
  var textVerticalAlign = "top";
  if (textPosition instanceof Array) {
    x += parsePercent(textPosition[0], rect.width);
    y += parsePercent(textPosition[1], rect.height);
    textAlign = null;
    textVerticalAlign = null;
  } else {
    switch (textPosition) {
      case "left":
        x -= distance2;
        y += halfHeight;
        textAlign = "right";
        textVerticalAlign = "middle";
        break;
      case "right":
        x += distance2 + width;
        y += halfHeight;
        textVerticalAlign = "middle";
        break;
      case "top":
        x += width / 2;
        y -= distance2;
        textAlign = "center";
        textVerticalAlign = "bottom";
        break;
      case "bottom":
        x += width / 2;
        y += height + distance2;
        textAlign = "center";
        break;
      case "inside":
        x += width / 2;
        y += halfHeight;
        textAlign = "center";
        textVerticalAlign = "middle";
        break;
      case "insideLeft":
        x += distance2;
        y += halfHeight;
        textVerticalAlign = "middle";
        break;
      case "insideRight":
        x += width - distance2;
        y += halfHeight;
        textAlign = "right";
        textVerticalAlign = "middle";
        break;
      case "insideTop":
        x += width / 2;
        y += distance2;
        textAlign = "center";
        break;
      case "insideBottom":
        x += width / 2;
        y += height - distance2;
        textAlign = "center";
        textVerticalAlign = "bottom";
        break;
      case "insideTopLeft":
        x += distance2;
        y += distance2;
        break;
      case "insideTopRight":
        x += width - distance2;
        y += distance2;
        textAlign = "right";
        break;
      case "insideBottomLeft":
        x += distance2;
        y += height - distance2;
        textVerticalAlign = "bottom";
        break;
      case "insideBottomRight":
        x += width - distance2;
        y += height - distance2;
        textAlign = "right";
        textVerticalAlign = "bottom";
        break;
    }
  }
  out2 = out2 || {};
  out2.x = x;
  out2.y = y;
  out2.align = textAlign;
  out2.verticalAlign = textVerticalAlign;
  return out2;
}

// node_modules/zrender/lib/graphic/helper/parseText.js
var STYLE_REG = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function truncateText(text, containerWidth, font, ellipsis, options) {
  if (!containerWidth) {
    return "";
  }
  var textLines = (text + "").split("\n");
  options = prepareTruncateOptions(containerWidth, font, ellipsis, options);
  for (var i = 0, len2 = textLines.length; i < len2; i++) {
    textLines[i] = truncateSingleLine(textLines[i], options);
  }
  return textLines.join("\n");
}
function prepareTruncateOptions(containerWidth, font, ellipsis, options) {
  options = options || {};
  var preparedOpts = extend({}, options);
  preparedOpts.font = font;
  ellipsis = retrieve2(ellipsis, "...");
  preparedOpts.maxIterations = retrieve2(options.maxIterations, 2);
  var minChar = preparedOpts.minChar = retrieve2(options.minChar, 0);
  preparedOpts.cnCharWidth = getWidth("\u56FD", font);
  var ascCharWidth = preparedOpts.ascCharWidth = getWidth("a", font);
  preparedOpts.placeholder = retrieve2(options.placeholder, "");
  var contentWidth = containerWidth = Math.max(0, containerWidth - 1);
  for (var i = 0; i < minChar && contentWidth >= ascCharWidth; i++) {
    contentWidth -= ascCharWidth;
  }
  var ellipsisWidth = getWidth(ellipsis, font);
  if (ellipsisWidth > contentWidth) {
    ellipsis = "";
    ellipsisWidth = 0;
  }
  contentWidth = containerWidth - ellipsisWidth;
  preparedOpts.ellipsis = ellipsis;
  preparedOpts.ellipsisWidth = ellipsisWidth;
  preparedOpts.contentWidth = contentWidth;
  preparedOpts.containerWidth = containerWidth;
  return preparedOpts;
}
function truncateSingleLine(textLine, options) {
  var containerWidth = options.containerWidth;
  var font = options.font;
  var contentWidth = options.contentWidth;
  if (!containerWidth) {
    return "";
  }
  var lineWidth = getWidth(textLine, font);
  if (lineWidth <= containerWidth) {
    return textLine;
  }
  for (var j = 0; ; j++) {
    if (lineWidth <= contentWidth || j >= options.maxIterations) {
      textLine += options.ellipsis;
      break;
    }
    var subLength = j === 0 ? estimateLength(textLine, contentWidth, options.ascCharWidth, options.cnCharWidth) : lineWidth > 0 ? Math.floor(textLine.length * contentWidth / lineWidth) : 0;
    textLine = textLine.substr(0, subLength);
    lineWidth = getWidth(textLine, font);
  }
  if (textLine === "") {
    textLine = options.placeholder;
  }
  return textLine;
}
function estimateLength(text, contentWidth, ascCharWidth, cnCharWidth) {
  var width = 0;
  var i = 0;
  for (var len2 = text.length; i < len2 && width < contentWidth; i++) {
    var charCode = text.charCodeAt(i);
    width += 0 <= charCode && charCode <= 127 ? ascCharWidth : cnCharWidth;
  }
  return i;
}
function parsePlainText(text, style) {
  text != null && (text += "");
  var overflow = style.overflow;
  var padding = style.padding;
  var font = style.font;
  var truncate = overflow === "truncate";
  var calculatedLineHeight = getLineHeight(font);
  var lineHeight = retrieve2(style.lineHeight, calculatedLineHeight);
  var bgColorDrawn = !!style.backgroundColor;
  var truncateLineOverflow = style.lineOverflow === "truncate";
  var width = style.width;
  var lines;
  if (width != null && (overflow === "break" || overflow === "breakAll")) {
    lines = text ? wrapText(text, style.font, width, overflow === "breakAll", 0).lines : [];
  } else {
    lines = text ? text.split("\n") : [];
  }
  var contentHeight = lines.length * lineHeight;
  var height = retrieve2(style.height, contentHeight);
  if (contentHeight > height && truncateLineOverflow) {
    var lineCount = Math.floor(height / lineHeight);
    lines = lines.slice(0, lineCount);
  }
  if (text && truncate && width != null) {
    var options = prepareTruncateOptions(width, font, style.ellipsis, {
      minChar: style.truncateMinChar,
      placeholder: style.placeholder
    });
    for (var i = 0; i < lines.length; i++) {
      lines[i] = truncateSingleLine(lines[i], options);
    }
  }
  var outerHeight = height;
  var contentWidth = 0;
  for (var i = 0; i < lines.length; i++) {
    contentWidth = Math.max(getWidth(lines[i], font), contentWidth);
  }
  if (width == null) {
    width = contentWidth;
  }
  var outerWidth = contentWidth;
  if (padding) {
    outerHeight += padding[0] + padding[2];
    outerWidth += padding[1] + padding[3];
    width += padding[1] + padding[3];
  }
  if (bgColorDrawn) {
    outerWidth = width;
  }
  return {
    lines,
    height,
    outerWidth,
    outerHeight,
    lineHeight,
    calculatedLineHeight,
    contentWidth,
    contentHeight,
    width
  };
}
var RichTextToken = /* @__PURE__ */ function() {
  function RichTextToken2() {
  }
  return RichTextToken2;
}();
var RichTextLine = /* @__PURE__ */ function() {
  function RichTextLine2(tokens) {
    this.tokens = [];
    if (tokens) {
      this.tokens = tokens;
    }
  }
  return RichTextLine2;
}();
var RichTextContentBlock = /* @__PURE__ */ function() {
  function RichTextContentBlock2() {
    this.width = 0;
    this.height = 0;
    this.contentWidth = 0;
    this.contentHeight = 0;
    this.outerWidth = 0;
    this.outerHeight = 0;
    this.lines = [];
  }
  return RichTextContentBlock2;
}();
function parseRichText(text, style) {
  var contentBlock = new RichTextContentBlock();
  text != null && (text += "");
  if (!text) {
    return contentBlock;
  }
  var topWidth = style.width;
  var topHeight = style.height;
  var overflow = style.overflow;
  var wrapInfo = (overflow === "break" || overflow === "breakAll") && topWidth != null ? { width: topWidth, accumWidth: 0, breakAll: overflow === "breakAll" } : null;
  var lastIndex = STYLE_REG.lastIndex = 0;
  var result;
  while ((result = STYLE_REG.exec(text)) != null) {
    var matchedIndex = result.index;
    if (matchedIndex > lastIndex) {
      pushTokens(contentBlock, text.substring(lastIndex, matchedIndex), style, wrapInfo);
    }
    pushTokens(contentBlock, result[2], style, wrapInfo, result[1]);
    lastIndex = STYLE_REG.lastIndex;
  }
  if (lastIndex < text.length) {
    pushTokens(contentBlock, text.substring(lastIndex, text.length), style, wrapInfo);
  }
  var pendingList = [];
  var calculatedHeight = 0;
  var calculatedWidth = 0;
  var stlPadding = style.padding;
  var truncate = overflow === "truncate";
  var truncateLine = style.lineOverflow === "truncate";
  function finishLine(line2, lineWidth2, lineHeight2) {
    line2.width = lineWidth2;
    line2.lineHeight = lineHeight2;
    calculatedHeight += lineHeight2;
    calculatedWidth = Math.max(calculatedWidth, lineWidth2);
  }
  outer:
    for (var i = 0; i < contentBlock.lines.length; i++) {
      var line = contentBlock.lines[i];
      var lineHeight = 0;
      var lineWidth = 0;
      for (var j = 0; j < line.tokens.length; j++) {
        var token = line.tokens[j];
        var tokenStyle = token.styleName && style.rich[token.styleName] || {};
        var textPadding = token.textPadding = tokenStyle.padding;
        var paddingH = textPadding ? textPadding[1] + textPadding[3] : 0;
        var font = token.font = tokenStyle.font || style.font;
        token.contentHeight = getLineHeight(font);
        var tokenHeight = retrieve2(tokenStyle.height, token.contentHeight);
        token.innerHeight = tokenHeight;
        textPadding && (tokenHeight += textPadding[0] + textPadding[2]);
        token.height = tokenHeight;
        token.lineHeight = retrieve3(tokenStyle.lineHeight, style.lineHeight, tokenHeight);
        token.align = tokenStyle && tokenStyle.align || style.align;
        token.verticalAlign = tokenStyle && tokenStyle.verticalAlign || "middle";
        if (truncateLine && topHeight != null && calculatedHeight + token.lineHeight > topHeight) {
          if (j > 0) {
            line.tokens = line.tokens.slice(0, j);
            finishLine(line, lineWidth, lineHeight);
            contentBlock.lines = contentBlock.lines.slice(0, i + 1);
          } else {
            contentBlock.lines = contentBlock.lines.slice(0, i);
          }
          break outer;
        }
        var styleTokenWidth = tokenStyle.width;
        var tokenWidthNotSpecified = styleTokenWidth == null || styleTokenWidth === "auto";
        if (typeof styleTokenWidth === "string" && styleTokenWidth.charAt(styleTokenWidth.length - 1) === "%") {
          token.percentWidth = styleTokenWidth;
          pendingList.push(token);
          token.contentWidth = getWidth(token.text, font);
        } else {
          if (tokenWidthNotSpecified) {
            var textBackgroundColor = tokenStyle.backgroundColor;
            var bgImg = textBackgroundColor && textBackgroundColor.image;
            if (bgImg) {
              bgImg = findExistImage(bgImg);
              if (isImageReady(bgImg)) {
                token.width = Math.max(token.width, bgImg.width * tokenHeight / bgImg.height);
              }
            }
          }
          var remainTruncWidth = truncate && topWidth != null ? topWidth - lineWidth : null;
          if (remainTruncWidth != null && remainTruncWidth < token.width) {
            if (!tokenWidthNotSpecified || remainTruncWidth < paddingH) {
              token.text = "";
              token.width = token.contentWidth = 0;
            } else {
              token.text = truncateText(token.text, remainTruncWidth - paddingH, font, style.ellipsis, { minChar: style.truncateMinChar });
              token.width = token.contentWidth = getWidth(token.text, font);
            }
          } else {
            token.contentWidth = getWidth(token.text, font);
          }
        }
        token.width += paddingH;
        lineWidth += token.width;
        tokenStyle && (lineHeight = Math.max(lineHeight, token.lineHeight));
      }
      finishLine(line, lineWidth, lineHeight);
    }
  contentBlock.outerWidth = contentBlock.width = retrieve2(topWidth, calculatedWidth);
  contentBlock.outerHeight = contentBlock.height = retrieve2(topHeight, calculatedHeight);
  contentBlock.contentHeight = calculatedHeight;
  contentBlock.contentWidth = calculatedWidth;
  if (stlPadding) {
    contentBlock.outerWidth += stlPadding[1] + stlPadding[3];
    contentBlock.outerHeight += stlPadding[0] + stlPadding[2];
  }
  for (var i = 0; i < pendingList.length; i++) {
    var token = pendingList[i];
    var percentWidth = token.percentWidth;
    token.width = parseInt(percentWidth, 10) / 100 * contentBlock.width;
  }
  return contentBlock;
}
function pushTokens(block, str, style, wrapInfo, styleName) {
  var isEmptyStr = str === "";
  var tokenStyle = styleName && style.rich[styleName] || {};
  var lines = block.lines;
  var font = tokenStyle.font || style.font;
  var newLine = false;
  var strLines;
  var linesWidths;
  if (wrapInfo) {
    var tokenPadding = tokenStyle.padding;
    var tokenPaddingH = tokenPadding ? tokenPadding[1] + tokenPadding[3] : 0;
    if (tokenStyle.width != null && tokenStyle.width !== "auto") {
      var outerWidth_1 = parsePercent(tokenStyle.width, wrapInfo.width) + tokenPaddingH;
      if (lines.length > 0) {
        if (outerWidth_1 + wrapInfo.accumWidth > wrapInfo.width) {
          strLines = str.split("\n");
          newLine = true;
        }
      }
      wrapInfo.accumWidth = outerWidth_1;
    } else {
      var res = wrapText(str, font, wrapInfo.width, wrapInfo.breakAll, wrapInfo.accumWidth);
      wrapInfo.accumWidth = res.accumWidth + tokenPaddingH;
      linesWidths = res.linesWidths;
      strLines = res.lines;
    }
  } else {
    strLines = str.split("\n");
  }
  for (var i = 0; i < strLines.length; i++) {
    var text = strLines[i];
    var token = new RichTextToken();
    token.styleName = styleName;
    token.text = text;
    token.isLineHolder = !text && !isEmptyStr;
    if (typeof tokenStyle.width === "number") {
      token.width = tokenStyle.width;
    } else {
      token.width = linesWidths ? linesWidths[i] : getWidth(text, font);
    }
    if (!i && !newLine) {
      var tokens = (lines[lines.length - 1] || (lines[0] = new RichTextLine())).tokens;
      var tokensLen = tokens.length;
      tokensLen === 1 && tokens[0].isLineHolder ? tokens[0] = token : (text || !tokensLen || isEmptyStr) && tokens.push(token);
    } else {
      lines.push(new RichTextLine([token]));
    }
  }
}
function isAlphabeticLetter(ch) {
  var code = ch.charCodeAt(0);
  return code >= 32 && code <= 591 || code >= 880 && code <= 4351 || code >= 4608 && code <= 5119 || code >= 7680 && code <= 8303;
}
var breakCharMap = reduce(",&?/;] ".split(""), function(obj, ch) {
  obj[ch] = true;
  return obj;
}, {});
function isWordBreakChar(ch) {
  if (isAlphabeticLetter(ch)) {
    if (breakCharMap[ch]) {
      return true;
    }
    return false;
  }
  return true;
}
function wrapText(text, font, lineWidth, isBreakAll, lastAccumWidth) {
  var lines = [];
  var linesWidths = [];
  var line = "";
  var currentWord = "";
  var currentWordWidth = 0;
  var accumWidth = 0;
  for (var i = 0; i < text.length; i++) {
    var ch = text.charAt(i);
    if (ch === "\n") {
      if (currentWord) {
        line += currentWord;
        accumWidth += currentWordWidth;
      }
      lines.push(line);
      linesWidths.push(accumWidth);
      line = "";
      currentWord = "";
      currentWordWidth = 0;
      accumWidth = 0;
      continue;
    }
    var chWidth = getWidth(ch, font);
    var inWord = isBreakAll ? false : !isWordBreakChar(ch);
    if (!lines.length ? lastAccumWidth + accumWidth + chWidth > lineWidth : accumWidth + chWidth > lineWidth) {
      if (!accumWidth) {
        if (inWord) {
          lines.push(currentWord);
          linesWidths.push(currentWordWidth);
          currentWord = ch;
          currentWordWidth = chWidth;
        } else {
          lines.push(ch);
          linesWidths.push(chWidth);
        }
      } else if (line || currentWord) {
        if (inWord) {
          if (!line) {
            line = currentWord;
            currentWord = "";
            currentWordWidth = 0;
            accumWidth = currentWordWidth;
          }
          lines.push(line);
          linesWidths.push(accumWidth - currentWordWidth);
          currentWord += ch;
          currentWordWidth += chWidth;
          line = "";
          accumWidth = currentWordWidth;
        } else {
          if (currentWord) {
            line += currentWord;
            currentWord = "";
            currentWordWidth = 0;
          }
          lines.push(line);
          linesWidths.push(accumWidth);
          line = ch;
          accumWidth = chWidth;
        }
      }
      continue;
    }
    accumWidth += chWidth;
    if (inWord) {
      currentWord += ch;
      currentWordWidth += chWidth;
    } else {
      if (currentWord) {
        line += currentWord;
        currentWord = "";
        currentWordWidth = 0;
      }
      line += ch;
    }
  }
  if (!lines.length && !line) {
    line = text;
    currentWord = "";
    currentWordWidth = 0;
  }
  if (currentWord) {
    line += currentWord;
  }
  if (line) {
    lines.push(line);
    linesWidths.push(accumWidth);
  }
  if (lines.length === 1) {
    accumWidth += lastAccumWidth;
  }
  return {
    accumWidth,
    lines,
    linesWidths
  };
}

// node_modules/zrender/lib/core/vector.js
function create2(x, y) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  return [x, y];
}
function clone2(v) {
  return [v[0], v[1]];
}
function add(out2, v1, v2) {
  out2[0] = v1[0] + v2[0];
  out2[1] = v1[1] + v2[1];
  return out2;
}
function sub(out2, v1, v2) {
  out2[0] = v1[0] - v2[0];
  out2[1] = v1[1] - v2[1];
  return out2;
}
function len(v) {
  return Math.sqrt(lenSquare(v));
}
function lenSquare(v) {
  return v[0] * v[0] + v[1] * v[1];
}
function scale2(out2, v, s) {
  out2[0] = v[0] * s;
  out2[1] = v[1] * s;
  return out2;
}
function normalize(out2, v) {
  var d = len(v);
  if (d === 0) {
    out2[0] = 0;
    out2[1] = 0;
  } else {
    out2[0] = v[0] / d;
    out2[1] = v[1] / d;
  }
  return out2;
}
function distance(v1, v2) {
  return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]));
}
var dist = distance;
function distanceSquare(v1, v2) {
  return (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
}
var distSquare = distanceSquare;
function applyTransform(out2, v, m) {
  var x = v[0];
  var y = v[1];
  out2[0] = m[0] * x + m[2] * y + m[4];
  out2[1] = m[1] * x + m[3] * y + m[5];
  return out2;
}
function min(out2, v1, v2) {
  out2[0] = Math.min(v1[0], v2[0]);
  out2[1] = Math.min(v1[1], v2[1]);
  return out2;
}
function max(out2, v1, v2) {
  out2[0] = Math.max(v1[0], v2[0]);
  out2[1] = Math.max(v1[1], v2[1]);
  return out2;
}

// node_modules/zrender/lib/core/Transformable.js
var mIdentity = identity;
var EPSILON = 5e-5;
function isNotAroundZero(val) {
  return val > EPSILON || val < -EPSILON;
}
var scaleTmp = [];
var tmpTransform = [];
var originTransform = create();
var abs = Math.abs;
var Transformable = function() {
  function Transformable2() {
  }
  Transformable2.prototype.getLocalTransform = function(m) {
    return Transformable2.getLocalTransform(this, m);
  };
  Transformable2.prototype.setPosition = function(arr) {
    this.x = arr[0];
    this.y = arr[1];
  };
  Transformable2.prototype.setScale = function(arr) {
    this.scaleX = arr[0];
    this.scaleY = arr[1];
  };
  Transformable2.prototype.setSkew = function(arr) {
    this.skewX = arr[0];
    this.skewY = arr[1];
  };
  Transformable2.prototype.setOrigin = function(arr) {
    this.originX = arr[0];
    this.originY = arr[1];
  };
  Transformable2.prototype.needLocalTransform = function() {
    return isNotAroundZero(this.rotation) || isNotAroundZero(this.x) || isNotAroundZero(this.y) || isNotAroundZero(this.scaleX - 1) || isNotAroundZero(this.scaleY - 1) || isNotAroundZero(this.skewX) || isNotAroundZero(this.skewY);
  };
  Transformable2.prototype.updateTransform = function() {
    var parentTransform = this.parent && this.parent.transform;
    var needLocalTransform = this.needLocalTransform();
    var m = this.transform;
    if (!(needLocalTransform || parentTransform)) {
      if (m) {
        mIdentity(m);
        this.invTransform = null;
      }
      return;
    }
    m = m || create();
    if (needLocalTransform) {
      this.getLocalTransform(m);
    } else {
      mIdentity(m);
    }
    if (parentTransform) {
      if (needLocalTransform) {
        mul(m, parentTransform, m);
      } else {
        copy(m, parentTransform);
      }
    }
    this.transform = m;
    this._resolveGlobalScaleRatio(m);
  };
  Transformable2.prototype._resolveGlobalScaleRatio = function(m) {
    var globalScaleRatio = this.globalScaleRatio;
    if (globalScaleRatio != null && globalScaleRatio !== 1) {
      this.getGlobalScale(scaleTmp);
      var relX = scaleTmp[0] < 0 ? -1 : 1;
      var relY = scaleTmp[1] < 0 ? -1 : 1;
      var sx = ((scaleTmp[0] - relX) * globalScaleRatio + relX) / scaleTmp[0] || 0;
      var sy = ((scaleTmp[1] - relY) * globalScaleRatio + relY) / scaleTmp[1] || 0;
      m[0] *= sx;
      m[1] *= sx;
      m[2] *= sy;
      m[3] *= sy;
    }
    this.invTransform = this.invTransform || create();
    invert(this.invTransform, m);
  };
  Transformable2.prototype.getComputedTransform = function() {
    var transformNode = this;
    var ancestors = [];
    while (transformNode) {
      ancestors.push(transformNode);
      transformNode = transformNode.parent;
    }
    while (transformNode = ancestors.pop()) {
      transformNode.updateTransform();
    }
    return this.transform;
  };
  Transformable2.prototype.setLocalTransform = function(m) {
    if (!m) {
      return;
    }
    var sx = m[0] * m[0] + m[1] * m[1];
    var sy = m[2] * m[2] + m[3] * m[3];
    var rotation = Math.atan2(m[1], m[0]);
    var shearX = Math.PI / 2 + rotation - Math.atan2(m[3], m[2]);
    sy = Math.sqrt(sy) * Math.cos(shearX);
    sx = Math.sqrt(sx);
    this.skewX = shearX;
    this.skewY = 0;
    this.rotation = -rotation;
    this.x = +m[4];
    this.y = +m[5];
    this.scaleX = sx;
    this.scaleY = sy;
    this.originX = 0;
    this.originY = 0;
  };
  Transformable2.prototype.decomposeTransform = function() {
    if (!this.transform) {
      return;
    }
    var parent = this.parent;
    var m = this.transform;
    if (parent && parent.transform) {
      parent.invTransform = parent.invTransform || create();
      mul(tmpTransform, parent.invTransform, m);
      m = tmpTransform;
    }
    var ox = this.originX;
    var oy = this.originY;
    if (ox || oy) {
      originTransform[4] = ox;
      originTransform[5] = oy;
      mul(tmpTransform, m, originTransform);
      tmpTransform[4] -= ox;
      tmpTransform[5] -= oy;
      m = tmpTransform;
    }
    this.setLocalTransform(m);
  };
  Transformable2.prototype.getGlobalScale = function(out2) {
    var m = this.transform;
    out2 = out2 || [];
    if (!m) {
      out2[0] = 1;
      out2[1] = 1;
      return out2;
    }
    out2[0] = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
    out2[1] = Math.sqrt(m[2] * m[2] + m[3] * m[3]);
    if (m[0] < 0) {
      out2[0] = -out2[0];
    }
    if (m[3] < 0) {
      out2[1] = -out2[1];
    }
    return out2;
  };
  Transformable2.prototype.transformCoordToLocal = function(x, y) {
    var v2 = [x, y];
    var invTransform = this.invTransform;
    if (invTransform) {
      applyTransform(v2, v2, invTransform);
    }
    return v2;
  };
  Transformable2.prototype.transformCoordToGlobal = function(x, y) {
    var v2 = [x, y];
    var transform = this.transform;
    if (transform) {
      applyTransform(v2, v2, transform);
    }
    return v2;
  };
  Transformable2.prototype.getLineScale = function() {
    var m = this.transform;
    return m && abs(m[0] - 1) > 1e-10 && abs(m[3] - 1) > 1e-10 ? Math.sqrt(abs(m[0] * m[3] - m[2] * m[1])) : 1;
  };
  Transformable2.prototype.copyTransform = function(source) {
    copyTransform(this, source);
  };
  Transformable2.getLocalTransform = function(target, m) {
    m = m || [];
    var ox = target.originX || 0;
    var oy = target.originY || 0;
    var sx = target.scaleX;
    var sy = target.scaleY;
    var ax = target.anchorX;
    var ay = target.anchorY;
    var rotation = target.rotation || 0;
    var x = target.x;
    var y = target.y;
    var skewX = target.skewX ? Math.tan(target.skewX) : 0;
    var skewY = target.skewY ? Math.tan(-target.skewY) : 0;
    if (ox || oy || ax || ay) {
      var dx = ox + ax;
      var dy = oy + ay;
      m[4] = -dx * sx - skewX * dy * sy;
      m[5] = -dy * sy - skewY * dx * sx;
    } else {
      m[4] = m[5] = 0;
    }
    m[0] = sx;
    m[3] = sy;
    m[1] = skewY * sx;
    m[2] = skewX * sy;
    rotation && rotate(m, m, rotation);
    m[4] += ox + x;
    m[5] += oy + y;
    return m;
  };
  Transformable2.initDefaultProps = function() {
    var proto = Transformable2.prototype;
    proto.scaleX = proto.scaleY = proto.globalScaleRatio = 1;
    proto.x = proto.y = proto.originX = proto.originY = proto.skewX = proto.skewY = proto.rotation = proto.anchorX = proto.anchorY = 0;
  }();
  return Transformable2;
}();
var TRANSFORMABLE_PROPS = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function copyTransform(target, source) {
  for (var i = 0; i < TRANSFORMABLE_PROPS.length; i++) {
    var propName = TRANSFORMABLE_PROPS[i];
    target[propName] = source[propName];
  }
}
var Transformable_default = Transformable;

// node_modules/zrender/lib/animation/easing.js
var easingFuncs = {
  linear: function(k) {
    return k;
  },
  quadraticIn: function(k) {
    return k * k;
  },
  quadraticOut: function(k) {
    return k * (2 - k);
  },
  quadraticInOut: function(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
  },
  cubicIn: function(k) {
    return k * k * k;
  },
  cubicOut: function(k) {
    return --k * k * k + 1;
  },
  cubicInOut: function(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
  },
  quarticIn: function(k) {
    return k * k * k * k;
  },
  quarticOut: function(k) {
    return 1 - --k * k * k * k;
  },
  quarticInOut: function(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k;
    }
    return -0.5 * ((k -= 2) * k * k * k - 2);
  },
  quinticIn: function(k) {
    return k * k * k * k * k;
  },
  quinticOut: function(k) {
    return --k * k * k * k * k + 1;
  },
  quinticInOut: function(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  },
  sinusoidalIn: function(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  },
  sinusoidalOut: function(k) {
    return Math.sin(k * Math.PI / 2);
  },
  sinusoidalInOut: function(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  },
  exponentialIn: function(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  },
  exponentialOut: function(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  },
  exponentialInOut: function(k) {
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if ((k *= 2) < 1) {
      return 0.5 * Math.pow(1024, k - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  },
  circularIn: function(k) {
    return 1 - Math.sqrt(1 - k * k);
  },
  circularOut: function(k) {
    return Math.sqrt(1 - --k * k);
  },
  circularInOut: function(k) {
    if ((k *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  },
  elasticIn: function(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }
    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  },
  elasticOut: function(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }
    return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
  },
  elasticInOut: function(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) {
      return 0;
    }
    if (k === 1) {
      return 1;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }
    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }
    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
  },
  backIn: function(k) {
    var s = 1.70158;
    return k * k * ((s + 1) * k - s);
  },
  backOut: function(k) {
    var s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  },
  backInOut: function(k) {
    var s = 1.70158 * 1.525;
    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  },
  bounceIn: function(k) {
    return 1 - easingFuncs.bounceOut(1 - k);
  },
  bounceOut: function(k) {
    if (k < 1 / 2.75) {
      return 7.5625 * k * k;
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    } else {
      return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    }
  },
  bounceInOut: function(k) {
    if (k < 0.5) {
      return easingFuncs.bounceIn(k * 2) * 0.5;
    }
    return easingFuncs.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }
};
var easing_default = easingFuncs;

// node_modules/zrender/lib/core/curve.js
var mathPow = Math.pow;
var mathSqrt = Math.sqrt;
var EPSILON2 = 1e-8;
var EPSILON_NUMERIC = 1e-4;
var THREE_SQRT = mathSqrt(3);
var ONE_THIRD = 1 / 3;
var _v0 = create2();
var _v1 = create2();
var _v2 = create2();
function isAroundZero(val) {
  return val > -EPSILON2 && val < EPSILON2;
}
function isNotAroundZero2(val) {
  return val > EPSILON2 || val < -EPSILON2;
}
function cubicAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return onet * onet * (onet * p0 + 3 * t * p1) + t * t * (t * p3 + 3 * onet * p2);
}
function cubicDerivativeAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return 3 * (((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet + (p3 - p2) * t * t);
}
function cubicRootAt(p0, p1, p2, p3, val, roots2) {
  var a = p3 + 3 * (p1 - p2) - p0;
  var b = 3 * (p2 - p1 * 2 + p0);
  var c = 3 * (p1 - p0);
  var d = p0 - val;
  var A = b * b - 3 * a * c;
  var B = b * c - 9 * a * d;
  var C = c * c - 3 * b * d;
  var n = 0;
  if (isAroundZero(A) && isAroundZero(B)) {
    if (isAroundZero(b)) {
      roots2[0] = 0;
    } else {
      var t1 = -c / b;
      if (t1 >= 0 && t1 <= 1) {
        roots2[n++] = t1;
      }
    }
  } else {
    var disc = B * B - 4 * A * C;
    if (isAroundZero(disc)) {
      var K = B / A;
      var t1 = -b / a + K;
      var t2 = -K / 2;
      if (t1 >= 0 && t1 <= 1) {
        roots2[n++] = t1;
      }
      if (t2 >= 0 && t2 <= 1) {
        roots2[n++] = t2;
      }
    } else if (disc > 0) {
      var discSqrt = mathSqrt(disc);
      var Y1 = A * b + 1.5 * a * (-B + discSqrt);
      var Y2 = A * b + 1.5 * a * (-B - discSqrt);
      if (Y1 < 0) {
        Y1 = -mathPow(-Y1, ONE_THIRD);
      } else {
        Y1 = mathPow(Y1, ONE_THIRD);
      }
      if (Y2 < 0) {
        Y2 = -mathPow(-Y2, ONE_THIRD);
      } else {
        Y2 = mathPow(Y2, ONE_THIRD);
      }
      var t1 = (-b - (Y1 + Y2)) / (3 * a);
      if (t1 >= 0 && t1 <= 1) {
        roots2[n++] = t1;
      }
    } else {
      var T = (2 * A * b - 3 * a * B) / (2 * mathSqrt(A * A * A));
      var theta = Math.acos(T) / 3;
      var ASqrt = mathSqrt(A);
      var tmp = Math.cos(theta);
      var t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
      var t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a);
      var t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);
      if (t1 >= 0 && t1 <= 1) {
        roots2[n++] = t1;
      }
      if (t2 >= 0 && t2 <= 1) {
        roots2[n++] = t2;
      }
      if (t3 >= 0 && t3 <= 1) {
        roots2[n++] = t3;
      }
    }
  }
  return n;
}
function cubicExtrema(p0, p1, p2, p3, extrema2) {
  var b = 6 * p2 - 12 * p1 + 6 * p0;
  var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
  var c = 3 * p1 - 3 * p0;
  var n = 0;
  if (isAroundZero(a)) {
    if (isNotAroundZero2(b)) {
      var t1 = -c / b;
      if (t1 >= 0 && t1 <= 1) {
        extrema2[n++] = t1;
      }
    }
  } else {
    var disc = b * b - 4 * a * c;
    if (isAroundZero(disc)) {
      extrema2[0] = -b / (2 * a);
    } else if (disc > 0) {
      var discSqrt = mathSqrt(disc);
      var t1 = (-b + discSqrt) / (2 * a);
      var t2 = (-b - discSqrt) / (2 * a);
      if (t1 >= 0 && t1 <= 1) {
        extrema2[n++] = t1;
      }
      if (t2 >= 0 && t2 <= 1) {
        extrema2[n++] = t2;
      }
    }
  }
  return n;
}
function cubicSubdivide(p0, p1, p2, p3, t, out2) {
  var p01 = (p1 - p0) * t + p0;
  var p12 = (p2 - p1) * t + p1;
  var p23 = (p3 - p2) * t + p2;
  var p012 = (p12 - p01) * t + p01;
  var p123 = (p23 - p12) * t + p12;
  var p0123 = (p123 - p012) * t + p012;
  out2[0] = p0;
  out2[1] = p01;
  out2[2] = p012;
  out2[3] = p0123;
  out2[4] = p0123;
  out2[5] = p123;
  out2[6] = p23;
  out2[7] = p3;
}
function cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out2) {
  var t;
  var interval = 5e-3;
  var d = Infinity;
  var prev;
  var next;
  var d1;
  var d2;
  _v0[0] = x;
  _v0[1] = y;
  for (var _t = 0; _t < 1; _t += 0.05) {
    _v1[0] = cubicAt(x0, x1, x2, x3, _t);
    _v1[1] = cubicAt(y0, y1, y2, y3, _t);
    d1 = distSquare(_v0, _v1);
    if (d1 < d) {
      t = _t;
      d = d1;
    }
  }
  d = Infinity;
  for (var i = 0; i < 32; i++) {
    if (interval < EPSILON_NUMERIC) {
      break;
    }
    prev = t - interval;
    next = t + interval;
    _v1[0] = cubicAt(x0, x1, x2, x3, prev);
    _v1[1] = cubicAt(y0, y1, y2, y3, prev);
    d1 = distSquare(_v1, _v0);
    if (prev >= 0 && d1 < d) {
      t = prev;
      d = d1;
    } else {
      _v2[0] = cubicAt(x0, x1, x2, x3, next);
      _v2[1] = cubicAt(y0, y1, y2, y3, next);
      d2 = distSquare(_v2, _v0);
      if (next <= 1 && d2 < d) {
        t = next;
        d = d2;
      } else {
        interval *= 0.5;
      }
    }
  }
  if (out2) {
    out2[0] = cubicAt(x0, x1, x2, x3, t);
    out2[1] = cubicAt(y0, y1, y2, y3, t);
  }
  return mathSqrt(d);
}
function cubicLength(x0, y0, x1, y1, x2, y2, x3, y3, iteration) {
  var px = x0;
  var py = y0;
  var d = 0;
  var step = 1 / iteration;
  for (var i = 1; i <= iteration; i++) {
    var t = i * step;
    var x = cubicAt(x0, x1, x2, x3, t);
    var y = cubicAt(y0, y1, y2, y3, t);
    var dx = x - px;
    var dy = y - py;
    d += Math.sqrt(dx * dx + dy * dy);
    px = x;
    py = y;
  }
  return d;
}
function quadraticAt(p0, p1, p2, t) {
  var onet = 1 - t;
  return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
}
function quadraticDerivativeAt(p0, p1, p2, t) {
  return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
}
function quadraticRootAt(p0, p1, p2, val, roots2) {
  var a = p0 - 2 * p1 + p2;
  var b = 2 * (p1 - p0);
  var c = p0 - val;
  var n = 0;
  if (isAroundZero(a)) {
    if (isNotAroundZero2(b)) {
      var t1 = -c / b;
      if (t1 >= 0 && t1 <= 1) {
        roots2[n++] = t1;
      }
    }
  } else {
    var disc = b * b - 4 * a * c;
    if (isAroundZero(disc)) {
      var t1 = -b / (2 * a);
      if (t1 >= 0 && t1 <= 1) {
        roots2[n++] = t1;
      }
    } else if (disc > 0) {
      var discSqrt = mathSqrt(disc);
      var t1 = (-b + discSqrt) / (2 * a);
      var t2 = (-b - discSqrt) / (2 * a);
      if (t1 >= 0 && t1 <= 1) {
        roots2[n++] = t1;
      }
      if (t2 >= 0 && t2 <= 1) {
        roots2[n++] = t2;
      }
    }
  }
  return n;
}
function quadraticExtremum(p0, p1, p2) {
  var divider = p0 + p2 - 2 * p1;
  if (divider === 0) {
    return 0.5;
  } else {
    return (p0 - p1) / divider;
  }
}
function quadraticSubdivide(p0, p1, p2, t, out2) {
  var p01 = (p1 - p0) * t + p0;
  var p12 = (p2 - p1) * t + p1;
  var p012 = (p12 - p01) * t + p01;
  out2[0] = p0;
  out2[1] = p01;
  out2[2] = p012;
  out2[3] = p012;
  out2[4] = p12;
  out2[5] = p2;
}
function quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, out2) {
  var t;
  var interval = 5e-3;
  var d = Infinity;
  _v0[0] = x;
  _v0[1] = y;
  for (var _t = 0; _t < 1; _t += 0.05) {
    _v1[0] = quadraticAt(x0, x1, x2, _t);
    _v1[1] = quadraticAt(y0, y1, y2, _t);
    var d1 = distSquare(_v0, _v1);
    if (d1 < d) {
      t = _t;
      d = d1;
    }
  }
  d = Infinity;
  for (var i = 0; i < 32; i++) {
    if (interval < EPSILON_NUMERIC) {
      break;
    }
    var prev = t - interval;
    var next = t + interval;
    _v1[0] = quadraticAt(x0, x1, x2, prev);
    _v1[1] = quadraticAt(y0, y1, y2, prev);
    var d1 = distSquare(_v1, _v0);
    if (prev >= 0 && d1 < d) {
      t = prev;
      d = d1;
    } else {
      _v2[0] = quadraticAt(x0, x1, x2, next);
      _v2[1] = quadraticAt(y0, y1, y2, next);
      var d2 = distSquare(_v2, _v0);
      if (next <= 1 && d2 < d) {
        t = next;
        d = d2;
      } else {
        interval *= 0.5;
      }
    }
  }
  if (out2) {
    out2[0] = quadraticAt(x0, x1, x2, t);
    out2[1] = quadraticAt(y0, y1, y2, t);
  }
  return mathSqrt(d);
}
function quadraticLength(x0, y0, x1, y1, x2, y2, iteration) {
  var px = x0;
  var py = y0;
  var d = 0;
  var step = 1 / iteration;
  for (var i = 1; i <= iteration; i++) {
    var t = i * step;
    var x = quadraticAt(x0, x1, x2, t);
    var y = quadraticAt(y0, y1, y2, t);
    var dx = x - px;
    var dy = y - py;
    d += Math.sqrt(dx * dx + dy * dy);
    px = x;
    py = y;
  }
  return d;
}

// node_modules/zrender/lib/animation/cubicEasing.js
var regexp = /cubic-bezier\(([0-9,\.e ]+)\)/;
function createCubicEasingFunc(cubicEasingStr) {
  var cubic = cubicEasingStr && regexp.exec(cubicEasingStr);
  if (cubic) {
    var points2 = cubic[1].split(",");
    var a_1 = +trim(points2[0]);
    var b_1 = +trim(points2[1]);
    var c_1 = +trim(points2[2]);
    var d_1 = +trim(points2[3]);
    if (isNaN(a_1 + b_1 + c_1 + d_1)) {
      return;
    }
    var roots_1 = [];
    return function(p) {
      return p <= 0 ? 0 : p >= 1 ? 1 : cubicRootAt(0, a_1, c_1, 1, p, roots_1) && cubicAt(0, b_1, d_1, 1, roots_1[0]);
    };
  }
}

// node_modules/zrender/lib/animation/Clip.js
var Clip = function() {
  function Clip2(opts) {
    this._inited = false;
    this._startTime = 0;
    this._pausedTime = 0;
    this._paused = false;
    this._life = opts.life || 1e3;
    this._delay = opts.delay || 0;
    this.loop = opts.loop || false;
    this.onframe = opts.onframe || noop;
    this.ondestroy = opts.ondestroy || noop;
    this.onrestart = opts.onrestart || noop;
    opts.easing && this.setEasing(opts.easing);
  }
  Clip2.prototype.step = function(globalTime, deltaTime) {
    if (!this._inited) {
      this._startTime = globalTime + this._delay;
      this._inited = true;
    }
    if (this._paused) {
      this._pausedTime += deltaTime;
      return;
    }
    var life = this._life;
    var elapsedTime = globalTime - this._startTime - this._pausedTime;
    var percent = elapsedTime / life;
    if (percent < 0) {
      percent = 0;
    }
    percent = Math.min(percent, 1);
    var easingFunc = this.easingFunc;
    var schedule = easingFunc ? easingFunc(percent) : percent;
    this.onframe(schedule);
    if (percent === 1) {
      if (this.loop) {
        var remainder = elapsedTime % life;
        this._startTime = globalTime - remainder;
        this._pausedTime = 0;
        this.onrestart();
      } else {
        return true;
      }
    }
    return false;
  };
  Clip2.prototype.pause = function() {
    this._paused = true;
  };
  Clip2.prototype.resume = function() {
    this._paused = false;
  };
  Clip2.prototype.setEasing = function(easing) {
    this.easing = easing;
    this.easingFunc = isFunction(easing) ? easing : easing_default[easing] || createCubicEasingFunc(easing);
  };
  return Clip2;
}();
var Clip_default = Clip;

// node_modules/zrender/lib/tool/color.js
var kCSSColorTable = {
  "transparent": [0, 0, 0, 0],
  "aliceblue": [240, 248, 255, 1],
  "antiquewhite": [250, 235, 215, 1],
  "aqua": [0, 255, 255, 1],
  "aquamarine": [127, 255, 212, 1],
  "azure": [240, 255, 255, 1],
  "beige": [245, 245, 220, 1],
  "bisque": [255, 228, 196, 1],
  "black": [0, 0, 0, 1],
  "blanchedalmond": [255, 235, 205, 1],
  "blue": [0, 0, 255, 1],
  "blueviolet": [138, 43, 226, 1],
  "brown": [165, 42, 42, 1],
  "burlywood": [222, 184, 135, 1],
  "cadetblue": [95, 158, 160, 1],
  "chartreuse": [127, 255, 0, 1],
  "chocolate": [210, 105, 30, 1],
  "coral": [255, 127, 80, 1],
  "cornflowerblue": [100, 149, 237, 1],
  "cornsilk": [255, 248, 220, 1],
  "crimson": [220, 20, 60, 1],
  "cyan": [0, 255, 255, 1],
  "darkblue": [0, 0, 139, 1],
  "darkcyan": [0, 139, 139, 1],
  "darkgoldenrod": [184, 134, 11, 1],
  "darkgray": [169, 169, 169, 1],
  "darkgreen": [0, 100, 0, 1],
  "darkgrey": [169, 169, 169, 1],
  "darkkhaki": [189, 183, 107, 1],
  "darkmagenta": [139, 0, 139, 1],
  "darkolivegreen": [85, 107, 47, 1],
  "darkorange": [255, 140, 0, 1],
  "darkorchid": [153, 50, 204, 1],
  "darkred": [139, 0, 0, 1],
  "darksalmon": [233, 150, 122, 1],
  "darkseagreen": [143, 188, 143, 1],
  "darkslateblue": [72, 61, 139, 1],
  "darkslategray": [47, 79, 79, 1],
  "darkslategrey": [47, 79, 79, 1],
  "darkturquoise": [0, 206, 209, 1],
  "darkviolet": [148, 0, 211, 1],
  "deeppink": [255, 20, 147, 1],
  "deepskyblue": [0, 191, 255, 1],
  "dimgray": [105, 105, 105, 1],
  "dimgrey": [105, 105, 105, 1],
  "dodgerblue": [30, 144, 255, 1],
  "firebrick": [178, 34, 34, 1],
  "floralwhite": [255, 250, 240, 1],
  "forestgreen": [34, 139, 34, 1],
  "fuchsia": [255, 0, 255, 1],
  "gainsboro": [220, 220, 220, 1],
  "ghostwhite": [248, 248, 255, 1],
  "gold": [255, 215, 0, 1],
  "goldenrod": [218, 165, 32, 1],
  "gray": [128, 128, 128, 1],
  "green": [0, 128, 0, 1],
  "greenyellow": [173, 255, 47, 1],
  "grey": [128, 128, 128, 1],
  "honeydew": [240, 255, 240, 1],
  "hotpink": [255, 105, 180, 1],
  "indianred": [205, 92, 92, 1],
  "indigo": [75, 0, 130, 1],
  "ivory": [255, 255, 240, 1],
  "khaki": [240, 230, 140, 1],
  "lavender": [230, 230, 250, 1],
  "lavenderblush": [255, 240, 245, 1],
  "lawngreen": [124, 252, 0, 1],
  "lemonchiffon": [255, 250, 205, 1],
  "lightblue": [173, 216, 230, 1],
  "lightcoral": [240, 128, 128, 1],
  "lightcyan": [224, 255, 255, 1],
  "lightgoldenrodyellow": [250, 250, 210, 1],
  "lightgray": [211, 211, 211, 1],
  "lightgreen": [144, 238, 144, 1],
  "lightgrey": [211, 211, 211, 1],
  "lightpink": [255, 182, 193, 1],
  "lightsalmon": [255, 160, 122, 1],
  "lightseagreen": [32, 178, 170, 1],
  "lightskyblue": [135, 206, 250, 1],
  "lightslategray": [119, 136, 153, 1],
  "lightslategrey": [119, 136, 153, 1],
  "lightsteelblue": [176, 196, 222, 1],
  "lightyellow": [255, 255, 224, 1],
  "lime": [0, 255, 0, 1],
  "limegreen": [50, 205, 50, 1],
  "linen": [250, 240, 230, 1],
  "magenta": [255, 0, 255, 1],
  "maroon": [128, 0, 0, 1],
  "mediumaquamarine": [102, 205, 170, 1],
  "mediumblue": [0, 0, 205, 1],
  "mediumorchid": [186, 85, 211, 1],
  "mediumpurple": [147, 112, 219, 1],
  "mediumseagreen": [60, 179, 113, 1],
  "mediumslateblue": [123, 104, 238, 1],
  "mediumspringgreen": [0, 250, 154, 1],
  "mediumturquoise": [72, 209, 204, 1],
  "mediumvioletred": [199, 21, 133, 1],
  "midnightblue": [25, 25, 112, 1],
  "mintcream": [245, 255, 250, 1],
  "mistyrose": [255, 228, 225, 1],
  "moccasin": [255, 228, 181, 1],
  "navajowhite": [255, 222, 173, 1],
  "navy": [0, 0, 128, 1],
  "oldlace": [253, 245, 230, 1],
  "olive": [128, 128, 0, 1],
  "olivedrab": [107, 142, 35, 1],
  "orange": [255, 165, 0, 1],
  "orangered": [255, 69, 0, 1],
  "orchid": [218, 112, 214, 1],
  "palegoldenrod": [238, 232, 170, 1],
  "palegreen": [152, 251, 152, 1],
  "paleturquoise": [175, 238, 238, 1],
  "palevioletred": [219, 112, 147, 1],
  "papayawhip": [255, 239, 213, 1],
  "peachpuff": [255, 218, 185, 1],
  "peru": [205, 133, 63, 1],
  "pink": [255, 192, 203, 1],
  "plum": [221, 160, 221, 1],
  "powderblue": [176, 224, 230, 1],
  "purple": [128, 0, 128, 1],
  "red": [255, 0, 0, 1],
  "rosybrown": [188, 143, 143, 1],
  "royalblue": [65, 105, 225, 1],
  "saddlebrown": [139, 69, 19, 1],
  "salmon": [250, 128, 114, 1],
  "sandybrown": [244, 164, 96, 1],
  "seagreen": [46, 139, 87, 1],
  "seashell": [255, 245, 238, 1],
  "sienna": [160, 82, 45, 1],
  "silver": [192, 192, 192, 1],
  "skyblue": [135, 206, 235, 1],
  "slateblue": [106, 90, 205, 1],
  "slategray": [112, 128, 144, 1],
  "slategrey": [112, 128, 144, 1],
  "snow": [255, 250, 250, 1],
  "springgreen": [0, 255, 127, 1],
  "steelblue": [70, 130, 180, 1],
  "tan": [210, 180, 140, 1],
  "teal": [0, 128, 128, 1],
  "thistle": [216, 191, 216, 1],
  "tomato": [255, 99, 71, 1],
  "turquoise": [64, 224, 208, 1],
  "violet": [238, 130, 238, 1],
  "wheat": [245, 222, 179, 1],
  "white": [255, 255, 255, 1],
  "whitesmoke": [245, 245, 245, 1],
  "yellow": [255, 255, 0, 1],
  "yellowgreen": [154, 205, 50, 1]
};
function clampCssByte(i) {
  i = Math.round(i);
  return i < 0 ? 0 : i > 255 ? 255 : i;
}
function clampCssAngle(i) {
  i = Math.round(i);
  return i < 0 ? 0 : i > 360 ? 360 : i;
}
function clampCssFloat(f) {
  return f < 0 ? 0 : f > 1 ? 1 : f;
}
function parseCssInt(val) {
  var str = val;
  if (str.length && str.charAt(str.length - 1) === "%") {
    return clampCssByte(parseFloat(str) / 100 * 255);
  }
  return clampCssByte(parseInt(str, 10));
}
function parseCssFloat(val) {
  var str = val;
  if (str.length && str.charAt(str.length - 1) === "%") {
    return clampCssFloat(parseFloat(str) / 100);
  }
  return clampCssFloat(parseFloat(str));
}
function cssHueToRgb(m1, m2, h) {
  if (h < 0) {
    h += 1;
  } else if (h > 1) {
    h -= 1;
  }
  if (h * 6 < 1) {
    return m1 + (m2 - m1) * h * 6;
  }
  if (h * 2 < 1) {
    return m2;
  }
  if (h * 3 < 2) {
    return m1 + (m2 - m1) * (2 / 3 - h) * 6;
  }
  return m1;
}
function lerpNumber(a, b, p) {
  return a + (b - a) * p;
}
function setRgba(out2, r, g, b, a) {
  out2[0] = r;
  out2[1] = g;
  out2[2] = b;
  out2[3] = a;
  return out2;
}
function copyRgba(out2, a) {
  out2[0] = a[0];
  out2[1] = a[1];
  out2[2] = a[2];
  out2[3] = a[3];
  return out2;
}
var colorCache = new LRU_default(20);
var lastRemovedArr = null;
function putToCache(colorStr, rgbaArr) {
  if (lastRemovedArr) {
    copyRgba(lastRemovedArr, rgbaArr);
  }
  lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || rgbaArr.slice());
}
function parse(colorStr, rgbaArr) {
  if (!colorStr) {
    return;
  }
  rgbaArr = rgbaArr || [];
  var cached = colorCache.get(colorStr);
  if (cached) {
    return copyRgba(rgbaArr, cached);
  }
  colorStr = colorStr + "";
  var str = colorStr.replace(/ /g, "").toLowerCase();
  if (str in kCSSColorTable) {
    copyRgba(rgbaArr, kCSSColorTable[str]);
    putToCache(colorStr, rgbaArr);
    return rgbaArr;
  }
  var strLen = str.length;
  if (str.charAt(0) === "#") {
    if (strLen === 4 || strLen === 5) {
      var iv = parseInt(str.slice(1, 4), 16);
      if (!(iv >= 0 && iv <= 4095)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return;
      }
      setRgba(rgbaArr, (iv & 3840) >> 4 | (iv & 3840) >> 8, iv & 240 | (iv & 240) >> 4, iv & 15 | (iv & 15) << 4, strLen === 5 ? parseInt(str.slice(4), 16) / 15 : 1);
      putToCache(colorStr, rgbaArr);
      return rgbaArr;
    } else if (strLen === 7 || strLen === 9) {
      var iv = parseInt(str.slice(1, 7), 16);
      if (!(iv >= 0 && iv <= 16777215)) {
        setRgba(rgbaArr, 0, 0, 0, 1);
        return;
      }
      setRgba(rgbaArr, (iv & 16711680) >> 16, (iv & 65280) >> 8, iv & 255, strLen === 9 ? parseInt(str.slice(7), 16) / 255 : 1);
      putToCache(colorStr, rgbaArr);
      return rgbaArr;
    }
    return;
  }
  var op = str.indexOf("(");
  var ep = str.indexOf(")");
  if (op !== -1 && ep + 1 === strLen) {
    var fname = str.substr(0, op);
    var params = str.substr(op + 1, ep - (op + 1)).split(",");
    var alpha = 1;
    switch (fname) {
      case "rgba":
        if (params.length !== 4) {
          return params.length === 3 ? setRgba(rgbaArr, +params[0], +params[1], +params[2], 1) : setRgba(rgbaArr, 0, 0, 0, 1);
        }
        alpha = parseCssFloat(params.pop());
      case "rgb":
        if (params.length >= 3) {
          setRgba(rgbaArr, parseCssInt(params[0]), parseCssInt(params[1]), parseCssInt(params[2]), params.length === 3 ? alpha : parseCssFloat(params[3]));
          putToCache(colorStr, rgbaArr);
          return rgbaArr;
        } else {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
      case "hsla":
        if (params.length !== 4) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
        params[3] = parseCssFloat(params[3]);
        hsla2rgba(params, rgbaArr);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
      case "hsl":
        if (params.length !== 3) {
          setRgba(rgbaArr, 0, 0, 0, 1);
          return;
        }
        hsla2rgba(params, rgbaArr);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
      default:
        return;
    }
  }
  setRgba(rgbaArr, 0, 0, 0, 1);
  return;
}
function hsla2rgba(hsla, rgba) {
  var h = (parseFloat(hsla[0]) % 360 + 360) % 360 / 360;
  var s = parseCssFloat(hsla[1]);
  var l = parseCssFloat(hsla[2]);
  var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  var m1 = l * 2 - m2;
  rgba = rgba || [];
  setRgba(rgba, clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255), clampCssByte(cssHueToRgb(m1, m2, h) * 255), clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255), 1);
  if (hsla.length === 4) {
    rgba[3] = hsla[3];
  }
  return rgba;
}
function rgba2hsla(rgba) {
  if (!rgba) {
    return;
  }
  var R = rgba[0] / 255;
  var G = rgba[1] / 255;
  var B = rgba[2] / 255;
  var vMin = Math.min(R, G, B);
  var vMax = Math.max(R, G, B);
  var delta = vMax - vMin;
  var L = (vMax + vMin) / 2;
  var H;
  var S2;
  if (delta === 0) {
    H = 0;
    S2 = 0;
  } else {
    if (L < 0.5) {
      S2 = delta / (vMax + vMin);
    } else {
      S2 = delta / (2 - vMax - vMin);
    }
    var deltaR = ((vMax - R) / 6 + delta / 2) / delta;
    var deltaG = ((vMax - G) / 6 + delta / 2) / delta;
    var deltaB = ((vMax - B) / 6 + delta / 2) / delta;
    if (R === vMax) {
      H = deltaB - deltaG;
    } else if (G === vMax) {
      H = 1 / 3 + deltaR - deltaB;
    } else if (B === vMax) {
      H = 2 / 3 + deltaG - deltaR;
    }
    if (H < 0) {
      H += 1;
    }
    if (H > 1) {
      H -= 1;
    }
  }
  var hsla = [H * 360, S2, L];
  if (rgba[3] != null) {
    hsla.push(rgba[3]);
  }
  return hsla;
}
function lift(color, level) {
  var colorArr = parse(color);
  if (colorArr) {
    for (var i = 0; i < 3; i++) {
      if (level < 0) {
        colorArr[i] = colorArr[i] * (1 - level) | 0;
      } else {
        colorArr[i] = (255 - colorArr[i]) * level + colorArr[i] | 0;
      }
      if (colorArr[i] > 255) {
        colorArr[i] = 255;
      } else if (colorArr[i] < 0) {
        colorArr[i] = 0;
      }
    }
    return stringify(colorArr, colorArr.length === 4 ? "rgba" : "rgb");
  }
}
function fastLerp(normalizedValue, colors, out2) {
  if (!(colors && colors.length) || !(normalizedValue >= 0 && normalizedValue <= 1)) {
    return;
  }
  out2 = out2 || [];
  var value = normalizedValue * (colors.length - 1);
  var leftIndex = Math.floor(value);
  var rightIndex = Math.ceil(value);
  var leftColor = colors[leftIndex];
  var rightColor = colors[rightIndex];
  var dv = value - leftIndex;
  out2[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
  out2[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
  out2[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
  out2[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));
  return out2;
}
function modifyHSL(color, h, s, l) {
  var colorArr = parse(color);
  if (color) {
    colorArr = rgba2hsla(colorArr);
    h != null && (colorArr[0] = clampCssAngle(h));
    s != null && (colorArr[1] = parseCssFloat(s));
    l != null && (colorArr[2] = parseCssFloat(l));
    return stringify(hsla2rgba(colorArr), "rgba");
  }
}
function modifyAlpha(color, alpha) {
  var colorArr = parse(color);
  if (colorArr && alpha != null) {
    colorArr[3] = clampCssFloat(alpha);
    return stringify(colorArr, "rgba");
  }
}
function stringify(arrColor, type) {
  if (!arrColor || !arrColor.length) {
    return;
  }
  var colorStr = arrColor[0] + "," + arrColor[1] + "," + arrColor[2];
  if (type === "rgba" || type === "hsva" || type === "hsla") {
    colorStr += "," + arrColor[3];
  }
  return type + "(" + colorStr + ")";
}
function lum(color, backgroundLum) {
  var arr = parse(color);
  return arr ? (0.299 * arr[0] + 0.587 * arr[1] + 0.114 * arr[2]) * arr[3] / 255 + (1 - arr[3]) * backgroundLum : 0;
}
var liftedColorCache = new LRU_default(100);
function liftColor(color) {
  if (isString(color)) {
    var liftedColor = liftedColorCache.get(color);
    if (!liftedColor) {
      liftedColor = lift(color, -0.1);
      liftedColorCache.put(color, liftedColor);
    }
    return liftedColor;
  } else if (isGradientObject(color)) {
    var ret = extend({}, color);
    ret.colorStops = map(color.colorStops, function(stop2) {
      return {
        offset: stop2.offset,
        color: lift(stop2.color, -0.1)
      };
    });
    return ret;
  }
  return color;
}

// node_modules/zrender/lib/svg/helper.js
var mathRound = Math.round;
function normalizeColor(color) {
  var opacity;
  if (!color || color === "transparent") {
    color = "none";
  } else if (typeof color === "string" && color.indexOf("rgba") > -1) {
    var arr = parse(color);
    if (arr) {
      color = "rgb(" + arr[0] + "," + arr[1] + "," + arr[2] + ")";
      opacity = arr[3];
    }
  }
  return {
    color,
    opacity: opacity == null ? 1 : opacity
  };
}
var EPSILON3 = 1e-4;
function isAroundZero2(transform) {
  return transform < EPSILON3 && transform > -EPSILON3;
}
function round3(transform) {
  return mathRound(transform * 1e3) / 1e3;
}
function round4(transform) {
  return mathRound(transform * 1e4) / 1e4;
}
function getMatrixStr(m) {
  return "matrix(" + round3(m[0]) + "," + round3(m[1]) + "," + round3(m[2]) + "," + round3(m[3]) + "," + round4(m[4]) + "," + round4(m[5]) + ")";
}
var TEXT_ALIGN_TO_ANCHOR = {
  left: "start",
  right: "end",
  center: "middle",
  middle: "middle"
};
function adjustTextY2(y, lineHeight, textBaseline) {
  if (textBaseline === "top") {
    y += lineHeight / 2;
  } else if (textBaseline === "bottom") {
    y -= lineHeight / 2;
  }
  return y;
}
function hasShadow(style) {
  return style && (style.shadowBlur || style.shadowOffsetX || style.shadowOffsetY);
}
function getShadowKey(displayable) {
  var style = displayable.style;
  var globalScale = displayable.getGlobalScale();
  return [
    style.shadowColor,
    (style.shadowBlur || 0).toFixed(2),
    (style.shadowOffsetX || 0).toFixed(2),
    (style.shadowOffsetY || 0).toFixed(2),
    globalScale[0],
    globalScale[1]
  ].join(",");
}
function isImagePattern(val) {
  return val && !!val.image;
}
function isSVGPattern(val) {
  return val && !!val.svgElement;
}
function isPattern(val) {
  return isImagePattern(val) || isSVGPattern(val);
}
function isLinearGradient(val) {
  return val.type === "linear";
}
function isRadialGradient(val) {
  return val.type === "radial";
}
function isGradient(val) {
  return val && (val.type === "linear" || val.type === "radial");
}
function getIdURL(id) {
  return "url(#" + id + ")";
}
function getPathPrecision(el) {
  var scale3 = el.getGlobalScale();
  var size = Math.max(scale3[0], scale3[1]);
  return Math.max(Math.ceil(Math.log(size) / Math.log(10)), 1);
}
function getSRTTransformString(transform) {
  var x = transform.x || 0;
  var y = transform.y || 0;
  var rotation = (transform.rotation || 0) * RADIAN_TO_DEGREE;
  var scaleX = retrieve2(transform.scaleX, 1);
  var scaleY = retrieve2(transform.scaleY, 1);
  var skewX = transform.skewX || 0;
  var skewY = transform.skewY || 0;
  var res = [];
  if (x || y) {
    res.push("translate(" + x + "px," + y + "px)");
  }
  if (rotation) {
    res.push("rotate(" + rotation + ")");
  }
  if (scaleX !== 1 || scaleY !== 1) {
    res.push("scale(" + scaleX + "," + scaleY + ")");
  }
  if (skewX || skewY) {
    res.push("skew(" + mathRound(skewX * RADIAN_TO_DEGREE) + "deg, " + mathRound(skewY * RADIAN_TO_DEGREE) + "deg)");
  }
  return res.join(" ");
}
var encodeBase64 = function() {
  if (env_default.hasGlobalWindow && isFunction(window.btoa)) {
    return function(str) {
      return window.btoa(unescape(encodeURIComponent(str)));
    };
  }
  if (typeof Buffer !== "undefined") {
    return function(str) {
      return Buffer.from(str).toString("base64");
    };
  }
  return function(str) {
    if (process.env.NODE_ENV !== "production") {
      logError("Base64 isn't natively supported in the current environment.");
    }
    return null;
  };
}();

// node_modules/zrender/lib/animation/Animator.js
var arraySlice = Array.prototype.slice;
function interpolateNumber(p0, p1, percent) {
  return (p1 - p0) * percent + p0;
}
function interpolate1DArray(out2, p0, p1, percent) {
  var len2 = p0.length;
  for (var i = 0; i < len2; i++) {
    out2[i] = interpolateNumber(p0[i], p1[i], percent);
  }
  return out2;
}
function interpolate2DArray(out2, p0, p1, percent) {
  var len2 = p0.length;
  var len22 = len2 && p0[0].length;
  for (var i = 0; i < len2; i++) {
    if (!out2[i]) {
      out2[i] = [];
    }
    for (var j = 0; j < len22; j++) {
      out2[i][j] = interpolateNumber(p0[i][j], p1[i][j], percent);
    }
  }
  return out2;
}
function add1DArray(out2, p0, p1, sign2) {
  var len2 = p0.length;
  for (var i = 0; i < len2; i++) {
    out2[i] = p0[i] + p1[i] * sign2;
  }
  return out2;
}
function add2DArray(out2, p0, p1, sign2) {
  var len2 = p0.length;
  var len22 = len2 && p0[0].length;
  for (var i = 0; i < len2; i++) {
    if (!out2[i]) {
      out2[i] = [];
    }
    for (var j = 0; j < len22; j++) {
      out2[i][j] = p0[i][j] + p1[i][j] * sign2;
    }
  }
  return out2;
}
function fillColorStops(val0, val1) {
  var len0 = val0.length;
  var len1 = val1.length;
  var shorterArr = len0 > len1 ? val1 : val0;
  var shorterLen = Math.min(len0, len1);
  var last = shorterArr[shorterLen - 1] || { color: [0, 0, 0, 0], offset: 0 };
  for (var i = shorterLen; i < Math.max(len0, len1); i++) {
    shorterArr.push({
      offset: last.offset,
      color: last.color.slice()
    });
  }
}
function fillArray(val0, val1, arrDim) {
  var arr0 = val0;
  var arr1 = val1;
  if (!arr0.push || !arr1.push) {
    return;
  }
  var arr0Len = arr0.length;
  var arr1Len = arr1.length;
  if (arr0Len !== arr1Len) {
    var isPreviousLarger = arr0Len > arr1Len;
    if (isPreviousLarger) {
      arr0.length = arr1Len;
    } else {
      for (var i = arr0Len; i < arr1Len; i++) {
        arr0.push(arrDim === 1 ? arr1[i] : arraySlice.call(arr1[i]));
      }
    }
  }
  var len2 = arr0[0] && arr0[0].length;
  for (var i = 0; i < arr0.length; i++) {
    if (arrDim === 1) {
      if (isNaN(arr0[i])) {
        arr0[i] = arr1[i];
      }
    } else {
      for (var j = 0; j < len2; j++) {
        if (isNaN(arr0[i][j])) {
          arr0[i][j] = arr1[i][j];
        }
      }
    }
  }
}
function cloneValue(value) {
  if (isArrayLike(value)) {
    var len2 = value.length;
    if (isArrayLike(value[0])) {
      var ret = [];
      for (var i = 0; i < len2; i++) {
        ret.push(arraySlice.call(value[i]));
      }
      return ret;
    }
    return arraySlice.call(value);
  }
  return value;
}
function rgba2String(rgba) {
  rgba[0] = Math.floor(rgba[0]) || 0;
  rgba[1] = Math.floor(rgba[1]) || 0;
  rgba[2] = Math.floor(rgba[2]) || 0;
  rgba[3] = rgba[3] == null ? 1 : rgba[3];
  return "rgba(" + rgba.join(",") + ")";
}
function guessArrayDim(value) {
  return isArrayLike(value && value[0]) ? 2 : 1;
}
var VALUE_TYPE_NUMBER = 0;
var VALUE_TYPE_1D_ARRAY = 1;
var VALUE_TYPE_2D_ARRAY = 2;
var VALUE_TYPE_COLOR = 3;
var VALUE_TYPE_LINEAR_GRADIENT = 4;
var VALUE_TYPE_RADIAL_GRADIENT = 5;
var VALUE_TYPE_UNKOWN = 6;
function isGradientValueType(valType) {
  return valType === VALUE_TYPE_LINEAR_GRADIENT || valType === VALUE_TYPE_RADIAL_GRADIENT;
}
function isArrayValueType(valType) {
  return valType === VALUE_TYPE_1D_ARRAY || valType === VALUE_TYPE_2D_ARRAY;
}
var tmpRgba = [0, 0, 0, 0];
var Track = function() {
  function Track2(propName) {
    this.keyframes = [];
    this.discrete = false;
    this._invalid = false;
    this._needsSort = false;
    this._lastFr = 0;
    this._lastFrP = 0;
    this.propName = propName;
  }
  Track2.prototype.isFinished = function() {
    return this._finished;
  };
  Track2.prototype.setFinished = function() {
    this._finished = true;
    if (this._additiveTrack) {
      this._additiveTrack.setFinished();
    }
  };
  Track2.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  };
  Track2.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  };
  Track2.prototype.addKeyframe = function(time, rawValue, easing) {
    this._needsSort = true;
    var keyframes = this.keyframes;
    var len2 = keyframes.length;
    var discrete = false;
    var valType = VALUE_TYPE_UNKOWN;
    var value = rawValue;
    if (isArrayLike(rawValue)) {
      var arrayDim = guessArrayDim(rawValue);
      valType = arrayDim;
      if (arrayDim === 1 && !isNumber(rawValue[0]) || arrayDim === 2 && !isNumber(rawValue[0][0])) {
        discrete = true;
      }
    } else {
      if (isNumber(rawValue) && !eqNaN(rawValue)) {
        valType = VALUE_TYPE_NUMBER;
      } else if (isString(rawValue)) {
        if (!isNaN(+rawValue)) {
          valType = VALUE_TYPE_NUMBER;
        } else {
          var colorArray = parse(rawValue);
          if (colorArray) {
            value = colorArray;
            valType = VALUE_TYPE_COLOR;
          }
        }
      } else if (isGradientObject(rawValue)) {
        var parsedGradient = extend({}, value);
        parsedGradient.colorStops = map(rawValue.colorStops, function(colorStop) {
          return {
            offset: colorStop.offset,
            color: parse(colorStop.color)
          };
        });
        if (isLinearGradient(rawValue)) {
          valType = VALUE_TYPE_LINEAR_GRADIENT;
        } else if (isRadialGradient(rawValue)) {
          valType = VALUE_TYPE_RADIAL_GRADIENT;
        }
        value = parsedGradient;
      }
    }
    if (len2 === 0) {
      this.valType = valType;
    } else if (valType !== this.valType || valType === VALUE_TYPE_UNKOWN) {
      discrete = true;
    }
    this.discrete = this.discrete || discrete;
    var kf = {
      time,
      value,
      rawValue,
      percent: 0
    };
    if (easing) {
      kf.easing = easing;
      kf.easingFunc = isFunction(easing) ? easing : easing_default[easing] || createCubicEasingFunc(easing);
    }
    keyframes.push(kf);
    return kf;
  };
  Track2.prototype.prepare = function(maxTime, additiveTrack) {
    var kfs = this.keyframes;
    if (this._needsSort) {
      kfs.sort(function(a, b) {
        return a.time - b.time;
      });
    }
    var valType = this.valType;
    var kfsLen = kfs.length;
    var lastKf = kfs[kfsLen - 1];
    var isDiscrete = this.discrete;
    var isArr = isArrayValueType(valType);
    var isGradient2 = isGradientValueType(valType);
    for (var i = 0; i < kfsLen; i++) {
      var kf = kfs[i];
      var value = kf.value;
      var lastValue = lastKf.value;
      kf.percent = kf.time / maxTime;
      if (!isDiscrete) {
        if (isArr && i !== kfsLen - 1) {
          fillArray(value, lastValue, valType);
        } else if (isGradient2) {
          fillColorStops(value.colorStops, lastValue.colorStops);
        }
      }
    }
    if (!isDiscrete && valType !== VALUE_TYPE_RADIAL_GRADIENT && additiveTrack && this.needsAnimate() && additiveTrack.needsAnimate() && valType === additiveTrack.valType && !additiveTrack._finished) {
      this._additiveTrack = additiveTrack;
      var startValue = kfs[0].value;
      for (var i = 0; i < kfsLen; i++) {
        if (valType === VALUE_TYPE_NUMBER) {
          kfs[i].additiveValue = kfs[i].value - startValue;
        } else if (valType === VALUE_TYPE_COLOR) {
          kfs[i].additiveValue = add1DArray([], kfs[i].value, startValue, -1);
        } else if (isArrayValueType(valType)) {
          kfs[i].additiveValue = valType === VALUE_TYPE_1D_ARRAY ? add1DArray([], kfs[i].value, startValue, -1) : add2DArray([], kfs[i].value, startValue, -1);
        }
      }
    }
  };
  Track2.prototype.step = function(target, percent) {
    if (this._finished) {
      return;
    }
    if (this._additiveTrack && this._additiveTrack._finished) {
      this._additiveTrack = null;
    }
    var isAdditive = this._additiveTrack != null;
    var valueKey = isAdditive ? "additiveValue" : "value";
    var valType = this.valType;
    var keyframes = this.keyframes;
    var kfsNum = keyframes.length;
    var propName = this.propName;
    var isValueColor = valType === VALUE_TYPE_COLOR;
    var frameIdx;
    var lastFrame = this._lastFr;
    var mathMin6 = Math.min;
    var frame;
    var nextFrame;
    if (kfsNum === 1) {
      frame = nextFrame = keyframes[0];
    } else {
      if (percent < 0) {
        frameIdx = 0;
      } else if (percent < this._lastFrP) {
        var start2 = mathMin6(lastFrame + 1, kfsNum - 1);
        for (frameIdx = start2; frameIdx >= 0; frameIdx--) {
          if (keyframes[frameIdx].percent <= percent) {
            break;
          }
        }
        frameIdx = mathMin6(frameIdx, kfsNum - 2);
      } else {
        for (frameIdx = lastFrame; frameIdx < kfsNum; frameIdx++) {
          if (keyframes[frameIdx].percent > percent) {
            break;
          }
        }
        frameIdx = mathMin6(frameIdx - 1, kfsNum - 2);
      }
      nextFrame = keyframes[frameIdx + 1];
      frame = keyframes[frameIdx];
    }
    if (!(frame && nextFrame)) {
      return;
    }
    this._lastFr = frameIdx;
    this._lastFrP = percent;
    var interval = nextFrame.percent - frame.percent;
    var w = interval === 0 ? 1 : mathMin6((percent - frame.percent) / interval, 1);
    if (nextFrame.easingFunc) {
      w = nextFrame.easingFunc(w);
    }
    var targetArr = isAdditive ? this._additiveValue : isValueColor ? tmpRgba : target[propName];
    if ((isArrayValueType(valType) || isValueColor) && !targetArr) {
      targetArr = this._additiveValue = [];
    }
    if (this.discrete) {
      target[propName] = w < 1 ? frame.rawValue : nextFrame.rawValue;
    } else if (isArrayValueType(valType)) {
      valType === VALUE_TYPE_1D_ARRAY ? interpolate1DArray(targetArr, frame[valueKey], nextFrame[valueKey], w) : interpolate2DArray(targetArr, frame[valueKey], nextFrame[valueKey], w);
    } else if (isGradientValueType(valType)) {
      var val = frame[valueKey];
      var nextVal_1 = nextFrame[valueKey];
      var isLinearGradient_1 = valType === VALUE_TYPE_LINEAR_GRADIENT;
      target[propName] = {
        type: isLinearGradient_1 ? "linear" : "radial",
        x: interpolateNumber(val.x, nextVal_1.x, w),
        y: interpolateNumber(val.y, nextVal_1.y, w),
        colorStops: map(val.colorStops, function(colorStop, idx) {
          var nextColorStop = nextVal_1.colorStops[idx];
          return {
            offset: interpolateNumber(colorStop.offset, nextColorStop.offset, w),
            color: rgba2String(interpolate1DArray([], colorStop.color, nextColorStop.color, w))
          };
        }),
        global: nextVal_1.global
      };
      if (isLinearGradient_1) {
        target[propName].x2 = interpolateNumber(val.x2, nextVal_1.x2, w);
        target[propName].y2 = interpolateNumber(val.y2, nextVal_1.y2, w);
      } else {
        target[propName].r = interpolateNumber(val.r, nextVal_1.r, w);
      }
    } else if (isValueColor) {
      interpolate1DArray(targetArr, frame[valueKey], nextFrame[valueKey], w);
      if (!isAdditive) {
        target[propName] = rgba2String(targetArr);
      }
    } else {
      var value = interpolateNumber(frame[valueKey], nextFrame[valueKey], w);
      if (isAdditive) {
        this._additiveValue = value;
      } else {
        target[propName] = value;
      }
    }
    if (isAdditive) {
      this._addToTarget(target);
    }
  };
  Track2.prototype._addToTarget = function(target) {
    var valType = this.valType;
    var propName = this.propName;
    var additiveValue = this._additiveValue;
    if (valType === VALUE_TYPE_NUMBER) {
      target[propName] = target[propName] + additiveValue;
    } else if (valType === VALUE_TYPE_COLOR) {
      parse(target[propName], tmpRgba);
      add1DArray(tmpRgba, tmpRgba, additiveValue, 1);
      target[propName] = rgba2String(tmpRgba);
    } else if (valType === VALUE_TYPE_1D_ARRAY) {
      add1DArray(target[propName], target[propName], additiveValue, 1);
    } else if (valType === VALUE_TYPE_2D_ARRAY) {
      add2DArray(target[propName], target[propName], additiveValue, 1);
    }
  };
  return Track2;
}();
var Animator = function() {
  function Animator2(target, loop, allowDiscreteAnimation, additiveTo) {
    this._tracks = {};
    this._trackKeys = [];
    this._maxTime = 0;
    this._started = 0;
    this._clip = null;
    this._target = target;
    this._loop = loop;
    if (loop && additiveTo) {
      logError("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = additiveTo;
    this._allowDiscrete = allowDiscreteAnimation;
  }
  Animator2.prototype.getMaxTime = function() {
    return this._maxTime;
  };
  Animator2.prototype.getDelay = function() {
    return this._delay;
  };
  Animator2.prototype.getLoop = function() {
    return this._loop;
  };
  Animator2.prototype.getTarget = function() {
    return this._target;
  };
  Animator2.prototype.changeTarget = function(target) {
    this._target = target;
  };
  Animator2.prototype.when = function(time, props, easing) {
    return this.whenWithKeys(time, props, keys(props), easing);
  };
  Animator2.prototype.whenWithKeys = function(time, props, propNames, easing) {
    var tracks = this._tracks;
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      var track = tracks[propName];
      if (!track) {
        track = tracks[propName] = new Track(propName);
        var initialValue = void 0;
        var additiveTrack = this._getAdditiveTrack(propName);
        if (additiveTrack) {
          var addtiveTrackKfs = additiveTrack.keyframes;
          var lastFinalKf = addtiveTrackKfs[addtiveTrackKfs.length - 1];
          initialValue = lastFinalKf && lastFinalKf.value;
          if (additiveTrack.valType === VALUE_TYPE_COLOR && initialValue) {
            initialValue = rgba2String(initialValue);
          }
        } else {
          initialValue = this._target[propName];
        }
        if (initialValue == null) {
          continue;
        }
        if (time > 0) {
          track.addKeyframe(0, cloneValue(initialValue), easing);
        }
        this._trackKeys.push(propName);
      }
      track.addKeyframe(time, cloneValue(props[propName]), easing);
    }
    this._maxTime = Math.max(this._maxTime, time);
    return this;
  };
  Animator2.prototype.pause = function() {
    this._clip.pause();
    this._paused = true;
  };
  Animator2.prototype.resume = function() {
    this._clip.resume();
    this._paused = false;
  };
  Animator2.prototype.isPaused = function() {
    return !!this._paused;
  };
  Animator2.prototype.duration = function(duration) {
    this._maxTime = duration;
    this._force = true;
    return this;
  };
  Animator2.prototype._doneCallback = function() {
    this._setTracksFinished();
    this._clip = null;
    var doneList = this._doneCbs;
    if (doneList) {
      var len2 = doneList.length;
      for (var i = 0; i < len2; i++) {
        doneList[i].call(this);
      }
    }
  };
  Animator2.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var animation = this.animation;
    var abortedList = this._abortedCbs;
    if (animation) {
      animation.removeClip(this._clip);
    }
    this._clip = null;
    if (abortedList) {
      for (var i = 0; i < abortedList.length; i++) {
        abortedList[i].call(this);
      }
    }
  };
  Animator2.prototype._setTracksFinished = function() {
    var tracks = this._tracks;
    var tracksKeys = this._trackKeys;
    for (var i = 0; i < tracksKeys.length; i++) {
      tracks[tracksKeys[i]].setFinished();
    }
  };
  Animator2.prototype._getAdditiveTrack = function(trackName) {
    var additiveTrack;
    var additiveAnimators = this._additiveAnimators;
    if (additiveAnimators) {
      for (var i = 0; i < additiveAnimators.length; i++) {
        var track = additiveAnimators[i].getTrack(trackName);
        if (track) {
          additiveTrack = track;
        }
      }
    }
    return additiveTrack;
  };
  Animator2.prototype.start = function(easing) {
    if (this._started > 0) {
      return;
    }
    this._started = 1;
    var self2 = this;
    var tracks = [];
    var maxTime = this._maxTime || 0;
    for (var i = 0; i < this._trackKeys.length; i++) {
      var propName = this._trackKeys[i];
      var track = this._tracks[propName];
      var additiveTrack = this._getAdditiveTrack(propName);
      var kfs = track.keyframes;
      var kfsNum = kfs.length;
      track.prepare(maxTime, additiveTrack);
      if (track.needsAnimate()) {
        if (!this._allowDiscrete && track.discrete) {
          var lastKf = kfs[kfsNum - 1];
          if (lastKf) {
            self2._target[track.propName] = lastKf.rawValue;
          }
          track.setFinished();
        } else {
          tracks.push(track);
        }
      }
    }
    if (tracks.length || this._force) {
      var clip = new Clip_default({
        life: maxTime,
        loop: this._loop,
        delay: this._delay || 0,
        onframe: function(percent) {
          self2._started = 2;
          var additiveAnimators = self2._additiveAnimators;
          if (additiveAnimators) {
            var stillHasAdditiveAnimator = false;
            for (var i2 = 0; i2 < additiveAnimators.length; i2++) {
              if (additiveAnimators[i2]._clip) {
                stillHasAdditiveAnimator = true;
                break;
              }
            }
            if (!stillHasAdditiveAnimator) {
              self2._additiveAnimators = null;
            }
          }
          for (var i2 = 0; i2 < tracks.length; i2++) {
            tracks[i2].step(self2._target, percent);
          }
          var onframeList = self2._onframeCbs;
          if (onframeList) {
            for (var i2 = 0; i2 < onframeList.length; i2++) {
              onframeList[i2](self2._target, percent);
            }
          }
        },
        ondestroy: function() {
          self2._doneCallback();
        }
      });
      this._clip = clip;
      if (this.animation) {
        this.animation.addClip(clip);
      }
      if (easing) {
        clip.setEasing(easing);
      }
    } else {
      this._doneCallback();
    }
    return this;
  };
  Animator2.prototype.stop = function(forwardToLast) {
    if (!this._clip) {
      return;
    }
    var clip = this._clip;
    if (forwardToLast) {
      clip.onframe(1);
    }
    this._abortedCallback();
  };
  Animator2.prototype.delay = function(time) {
    this._delay = time;
    return this;
  };
  Animator2.prototype.during = function(cb) {
    if (cb) {
      if (!this._onframeCbs) {
        this._onframeCbs = [];
      }
      this._onframeCbs.push(cb);
    }
    return this;
  };
  Animator2.prototype.done = function(cb) {
    if (cb) {
      if (!this._doneCbs) {
        this._doneCbs = [];
      }
      this._doneCbs.push(cb);
    }
    return this;
  };
  Animator2.prototype.aborted = function(cb) {
    if (cb) {
      if (!this._abortedCbs) {
        this._abortedCbs = [];
      }
      this._abortedCbs.push(cb);
    }
    return this;
  };
  Animator2.prototype.getClip = function() {
    return this._clip;
  };
  Animator2.prototype.getTrack = function(propName) {
    return this._tracks[propName];
  };
  Animator2.prototype.getTracks = function() {
    var _this = this;
    return map(this._trackKeys, function(key) {
      return _this._tracks[key];
    });
  };
  Animator2.prototype.stopTracks = function(propNames, forwardToLast) {
    if (!propNames.length || !this._clip) {
      return true;
    }
    var tracks = this._tracks;
    var tracksKeys = this._trackKeys;
    for (var i = 0; i < propNames.length; i++) {
      var track = tracks[propNames[i]];
      if (track && !track.isFinished()) {
        if (forwardToLast) {
          track.step(this._target, 1);
        } else if (this._started === 1) {
          track.step(this._target, 0);
        }
        track.setFinished();
      }
    }
    var allAborted = true;
    for (var i = 0; i < tracksKeys.length; i++) {
      if (!tracks[tracksKeys[i]].isFinished()) {
        allAborted = false;
        break;
      }
    }
    if (allAborted) {
      this._abortedCallback();
    }
    return allAborted;
  };
  Animator2.prototype.saveTo = function(target, trackKeys, firstOrLast) {
    if (!target) {
      return;
    }
    trackKeys = trackKeys || this._trackKeys;
    for (var i = 0; i < trackKeys.length; i++) {
      var propName = trackKeys[i];
      var track = this._tracks[propName];
      if (!track || track.isFinished()) {
        continue;
      }
      var kfs = track.keyframes;
      var kf = kfs[firstOrLast ? 0 : kfs.length - 1];
      if (kf) {
        target[propName] = cloneValue(kf.rawValue);
      }
    }
  };
  Animator2.prototype.__changeFinalValue = function(finalProps, trackKeys) {
    trackKeys = trackKeys || keys(finalProps);
    for (var i = 0; i < trackKeys.length; i++) {
      var propName = trackKeys[i];
      var track = this._tracks[propName];
      if (!track) {
        continue;
      }
      var kfs = track.keyframes;
      if (kfs.length > 1) {
        var lastKf = kfs.pop();
        track.addKeyframe(lastKf.time, finalProps[propName]);
        track.prepare(this._maxTime, track.getAdditiveTrack());
      }
    }
  };
  return Animator2;
}();
var Animator_default = Animator;

// node_modules/zrender/lib/core/Eventful.js
var Eventful = function() {
  function Eventful2(eventProcessors) {
    if (eventProcessors) {
      this._$eventProcessor = eventProcessors;
    }
  }
  Eventful2.prototype.on = function(event, query, handler, context) {
    if (!this._$handlers) {
      this._$handlers = {};
    }
    var _h = this._$handlers;
    if (typeof query === "function") {
      context = handler;
      handler = query;
      query = null;
    }
    if (!handler || !event) {
      return this;
    }
    var eventProcessor = this._$eventProcessor;
    if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
      query = eventProcessor.normalizeQuery(query);
    }
    if (!_h[event]) {
      _h[event] = [];
    }
    for (var i = 0; i < _h[event].length; i++) {
      if (_h[event][i].h === handler) {
        return this;
      }
    }
    var wrap = {
      h: handler,
      query,
      ctx: context || this,
      callAtLast: handler.zrEventfulCallAtLast
    };
    var lastIndex = _h[event].length - 1;
    var lastWrap = _h[event][lastIndex];
    lastWrap && lastWrap.callAtLast ? _h[event].splice(lastIndex, 0, wrap) : _h[event].push(wrap);
    return this;
  };
  Eventful2.prototype.isSilent = function(eventName) {
    var _h = this._$handlers;
    return !_h || !_h[eventName] || !_h[eventName].length;
  };
  Eventful2.prototype.off = function(eventType, handler) {
    var _h = this._$handlers;
    if (!_h) {
      return this;
    }
    if (!eventType) {
      this._$handlers = {};
      return this;
    }
    if (handler) {
      if (_h[eventType]) {
        var newList = [];
        for (var i = 0, l = _h[eventType].length; i < l; i++) {
          if (_h[eventType][i].h !== handler) {
            newList.push(_h[eventType][i]);
          }
        }
        _h[eventType] = newList;
      }
      if (_h[eventType] && _h[eventType].length === 0) {
        delete _h[eventType];
      }
    } else {
      delete _h[eventType];
    }
    return this;
  };
  Eventful2.prototype.trigger = function(eventType) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (!this._$handlers) {
      return this;
    }
    var _h = this._$handlers[eventType];
    var eventProcessor = this._$eventProcessor;
    if (_h) {
      var argLen = args.length;
      var len2 = _h.length;
      for (var i = 0; i < len2; i++) {
        var hItem = _h[i];
        if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(eventType, hItem.query)) {
          continue;
        }
        switch (argLen) {
          case 0:
            hItem.h.call(hItem.ctx);
            break;
          case 1:
            hItem.h.call(hItem.ctx, args[0]);
            break;
          case 2:
            hItem.h.call(hItem.ctx, args[0], args[1]);
            break;
          default:
            hItem.h.apply(hItem.ctx, args);
            break;
        }
      }
    }
    eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(eventType);
    return this;
  };
  Eventful2.prototype.triggerWithContext = function(type) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (!this._$handlers) {
      return this;
    }
    var _h = this._$handlers[type];
    var eventProcessor = this._$eventProcessor;
    if (_h) {
      var argLen = args.length;
      var ctx = args[argLen - 1];
      var len2 = _h.length;
      for (var i = 0; i < len2; i++) {
        var hItem = _h[i];
        if (eventProcessor && eventProcessor.filter && hItem.query != null && !eventProcessor.filter(type, hItem.query)) {
          continue;
        }
        switch (argLen) {
          case 0:
            hItem.h.call(ctx);
            break;
          case 1:
            hItem.h.call(ctx, args[0]);
            break;
          case 2:
            hItem.h.call(ctx, args[0], args[1]);
            break;
          default:
            hItem.h.apply(ctx, args.slice(1, argLen - 1));
            break;
        }
      }
    }
    eventProcessor && eventProcessor.afterTrigger && eventProcessor.afterTrigger(type);
    return this;
  };
  return Eventful2;
}();
var Eventful_default = Eventful;

// node_modules/zrender/lib/config.js
var dpr = 1;
if (env_default.hasGlobalWindow) {
  dpr = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1);
}
var devicePixelRatio = dpr;
var DARK_MODE_THRESHOLD = 0.4;
var DARK_LABEL_COLOR = "#333";
var LIGHT_LABEL_COLOR = "#ccc";
var LIGHTER_LABEL_COLOR = "#eee";

// node_modules/zrender/lib/graphic/constants.js
var REDRAW_BIT = 1;
var STYLE_CHANGED_BIT = 2;
var SHAPE_CHANGED_BIT = 4;

// node_modules/zrender/lib/Element.js
var PRESERVED_NORMAL_STATE = "__zr_normal__";
var PRIMARY_STATES_KEYS = TRANSFORMABLE_PROPS.concat(["ignore"]);
var DEFAULT_ANIMATABLE_MAP = reduce(TRANSFORMABLE_PROPS, function(obj, key) {
  obj[key] = true;
  return obj;
}, { ignore: false });
var tmpTextPosCalcRes = {};
var tmpBoundingRect = new BoundingRect_default(0, 0, 0, 0);
var Element = function() {
  function Element2(props) {
    this.id = guid();
    this.animators = [];
    this.currentStates = [];
    this.states = {};
    this._init(props);
  }
  Element2.prototype._init = function(props) {
    this.attr(props);
  };
  Element2.prototype.drift = function(dx, dy, e2) {
    switch (this.draggable) {
      case "horizontal":
        dy = 0;
        break;
      case "vertical":
        dx = 0;
        break;
    }
    var m = this.transform;
    if (!m) {
      m = this.transform = [1, 0, 0, 1, 0, 0];
    }
    m[4] += dx;
    m[5] += dy;
    this.decomposeTransform();
    this.markRedraw();
  };
  Element2.prototype.beforeUpdate = function() {
  };
  Element2.prototype.afterUpdate = function() {
  };
  Element2.prototype.update = function() {
    this.updateTransform();
    if (this.__dirty) {
      this.updateInnerText();
    }
  };
  Element2.prototype.updateInnerText = function(forceUpdate) {
    var textEl = this._textContent;
    if (textEl && (!textEl.ignore || forceUpdate)) {
      if (!this.textConfig) {
        this.textConfig = {};
      }
      var textConfig = this.textConfig;
      var isLocal = textConfig.local;
      var innerTransformable = textEl.innerTransformable;
      var textAlign = void 0;
      var textVerticalAlign = void 0;
      var textStyleChanged = false;
      innerTransformable.parent = isLocal ? this : null;
      var innerOrigin = false;
      innerTransformable.copyTransform(textEl);
      if (textConfig.position != null) {
        var layoutRect = tmpBoundingRect;
        if (textConfig.layoutRect) {
          layoutRect.copy(textConfig.layoutRect);
        } else {
          layoutRect.copy(this.getBoundingRect());
        }
        if (!isLocal) {
          layoutRect.applyTransform(this.transform);
        }
        if (this.calculateTextPosition) {
          this.calculateTextPosition(tmpTextPosCalcRes, textConfig, layoutRect);
        } else {
          calculateTextPosition(tmpTextPosCalcRes, textConfig, layoutRect);
        }
        innerTransformable.x = tmpTextPosCalcRes.x;
        innerTransformable.y = tmpTextPosCalcRes.y;
        textAlign = tmpTextPosCalcRes.align;
        textVerticalAlign = tmpTextPosCalcRes.verticalAlign;
        var textOrigin = textConfig.origin;
        if (textOrigin && textConfig.rotation != null) {
          var relOriginX = void 0;
          var relOriginY = void 0;
          if (textOrigin === "center") {
            relOriginX = layoutRect.width * 0.5;
            relOriginY = layoutRect.height * 0.5;
          } else {
            relOriginX = parsePercent(textOrigin[0], layoutRect.width);
            relOriginY = parsePercent(textOrigin[1], layoutRect.height);
          }
          innerOrigin = true;
          innerTransformable.originX = -innerTransformable.x + relOriginX + (isLocal ? 0 : layoutRect.x);
          innerTransformable.originY = -innerTransformable.y + relOriginY + (isLocal ? 0 : layoutRect.y);
        }
      }
      if (textConfig.rotation != null) {
        innerTransformable.rotation = textConfig.rotation;
      }
      var textOffset = textConfig.offset;
      if (textOffset) {
        innerTransformable.x += textOffset[0];
        innerTransformable.y += textOffset[1];
        if (!innerOrigin) {
          innerTransformable.originX = -textOffset[0];
          innerTransformable.originY = -textOffset[1];
        }
      }
      var isInside = textConfig.inside == null ? typeof textConfig.position === "string" && textConfig.position.indexOf("inside") >= 0 : textConfig.inside;
      var innerTextDefaultStyle = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
      var textFill = void 0;
      var textStroke = void 0;
      var autoStroke = void 0;
      if (isInside && this.canBeInsideText()) {
        textFill = textConfig.insideFill;
        textStroke = textConfig.insideStroke;
        if (textFill == null || textFill === "auto") {
          textFill = this.getInsideTextFill();
        }
        if (textStroke == null || textStroke === "auto") {
          textStroke = this.getInsideTextStroke(textFill);
          autoStroke = true;
        }
      } else {
        textFill = textConfig.outsideFill;
        textStroke = textConfig.outsideStroke;
        if (textFill == null || textFill === "auto") {
          textFill = this.getOutsideFill();
        }
        if (textStroke == null || textStroke === "auto") {
          textStroke = this.getOutsideStroke(textFill);
          autoStroke = true;
        }
      }
      textFill = textFill || "#000";
      if (textFill !== innerTextDefaultStyle.fill || textStroke !== innerTextDefaultStyle.stroke || autoStroke !== innerTextDefaultStyle.autoStroke || textAlign !== innerTextDefaultStyle.align || textVerticalAlign !== innerTextDefaultStyle.verticalAlign) {
        textStyleChanged = true;
        innerTextDefaultStyle.fill = textFill;
        innerTextDefaultStyle.stroke = textStroke;
        innerTextDefaultStyle.autoStroke = autoStroke;
        innerTextDefaultStyle.align = textAlign;
        innerTextDefaultStyle.verticalAlign = textVerticalAlign;
        textEl.setDefaultTextStyle(innerTextDefaultStyle);
      }
      textEl.__dirty |= REDRAW_BIT;
      if (textStyleChanged) {
        textEl.dirtyStyle(true);
      }
    }
  };
  Element2.prototype.canBeInsideText = function() {
    return true;
  };
  Element2.prototype.getInsideTextFill = function() {
    return "#fff";
  };
  Element2.prototype.getInsideTextStroke = function(textFill) {
    return "#000";
  };
  Element2.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? LIGHT_LABEL_COLOR : DARK_LABEL_COLOR;
  };
  Element2.prototype.getOutsideStroke = function(textFill) {
    var backgroundColor2 = this.__zr && this.__zr.getBackgroundColor();
    var colorArr = typeof backgroundColor2 === "string" && parse(backgroundColor2);
    if (!colorArr) {
      colorArr = [255, 255, 255, 1];
    }
    var alpha = colorArr[3];
    var isDark = this.__zr.isDarkMode();
    for (var i = 0; i < 3; i++) {
      colorArr[i] = colorArr[i] * alpha + (isDark ? 0 : 255) * (1 - alpha);
    }
    colorArr[3] = 1;
    return stringify(colorArr, "rgba");
  };
  Element2.prototype.traverse = function(cb, context) {
  };
  Element2.prototype.attrKV = function(key, value) {
    if (key === "textConfig") {
      this.setTextConfig(value);
    } else if (key === "textContent") {
      this.setTextContent(value);
    } else if (key === "clipPath") {
      this.setClipPath(value);
    } else if (key === "extra") {
      this.extra = this.extra || {};
      extend(this.extra, value);
    } else {
      this[key] = value;
    }
  };
  Element2.prototype.hide = function() {
    this.ignore = true;
    this.markRedraw();
  };
  Element2.prototype.show = function() {
    this.ignore = false;
    this.markRedraw();
  };
  Element2.prototype.attr = function(keyOrObj, value) {
    if (typeof keyOrObj === "string") {
      this.attrKV(keyOrObj, value);
    } else if (isObject(keyOrObj)) {
      var obj = keyOrObj;
      var keysArr = keys(obj);
      for (var i = 0; i < keysArr.length; i++) {
        var key = keysArr[i];
        this.attrKV(key, keyOrObj[key]);
      }
    }
    this.markRedraw();
    return this;
  };
  Element2.prototype.saveCurrentToNormalState = function(toState) {
    this._innerSaveToNormal(toState);
    var normalState = this._normalState;
    for (var i = 0; i < this.animators.length; i++) {
      var animator = this.animators[i];
      var fromStateTransition = animator.__fromStateTransition;
      if (animator.getLoop() || fromStateTransition && fromStateTransition !== PRESERVED_NORMAL_STATE) {
        continue;
      }
      var targetName = animator.targetName;
      var target = targetName ? normalState[targetName] : normalState;
      animator.saveTo(target);
    }
  };
  Element2.prototype._innerSaveToNormal = function(toState) {
    var normalState = this._normalState;
    if (!normalState) {
      normalState = this._normalState = {};
    }
    if (toState.textConfig && !normalState.textConfig) {
      normalState.textConfig = this.textConfig;
    }
    this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS);
  };
  Element2.prototype._savePrimaryToNormal = function(toState, normalState, primaryKeys) {
    for (var i = 0; i < primaryKeys.length; i++) {
      var key = primaryKeys[i];
      if (toState[key] != null && !(key in normalState)) {
        normalState[key] = this[key];
      }
    }
  };
  Element2.prototype.hasState = function() {
    return this.currentStates.length > 0;
  };
  Element2.prototype.getState = function(name) {
    return this.states[name];
  };
  Element2.prototype.ensureState = function(name) {
    var states = this.states;
    if (!states[name]) {
      states[name] = {};
    }
    return states[name];
  };
  Element2.prototype.clearStates = function(noAnimation) {
    this.useState(PRESERVED_NORMAL_STATE, false, noAnimation);
  };
  Element2.prototype.useState = function(stateName, keepCurrentStates, noAnimation, forceUseHoverLayer) {
    var toNormalState = stateName === PRESERVED_NORMAL_STATE;
    var hasStates = this.hasState();
    if (!hasStates && toNormalState) {
      return;
    }
    var currentStates = this.currentStates;
    var animationCfg = this.stateTransition;
    if (indexOf(currentStates, stateName) >= 0 && (keepCurrentStates || currentStates.length === 1)) {
      return;
    }
    var state;
    if (this.stateProxy && !toNormalState) {
      state = this.stateProxy(stateName);
    }
    if (!state) {
      state = this.states && this.states[stateName];
    }
    if (!state && !toNormalState) {
      logError("State " + stateName + " not exists.");
      return;
    }
    if (!toNormalState) {
      this.saveCurrentToNormalState(state);
    }
    var useHoverLayer = !!(state && state.hoverLayer || forceUseHoverLayer);
    if (useHoverLayer) {
      this._toggleHoverLayerFlag(true);
    }
    this._applyStateObj(stateName, state, this._normalState, keepCurrentStates, !noAnimation && !this.__inHover && animationCfg && animationCfg.duration > 0, animationCfg);
    var textContent = this._textContent;
    var textGuide = this._textGuide;
    if (textContent) {
      textContent.useState(stateName, keepCurrentStates, noAnimation, useHoverLayer);
    }
    if (textGuide) {
      textGuide.useState(stateName, keepCurrentStates, noAnimation, useHoverLayer);
    }
    if (toNormalState) {
      this.currentStates = [];
      this._normalState = {};
    } else {
      if (!keepCurrentStates) {
        this.currentStates = [stateName];
      } else {
        this.currentStates.push(stateName);
      }
    }
    this._updateAnimationTargets();
    this.markRedraw();
    if (!useHoverLayer && this.__inHover) {
      this._toggleHoverLayerFlag(false);
      this.__dirty &= ~REDRAW_BIT;
    }
    return state;
  };
  Element2.prototype.useStates = function(states, noAnimation, forceUseHoverLayer) {
    if (!states.length) {
      this.clearStates();
    } else {
      var stateObjects = [];
      var currentStates = this.currentStates;
      var len2 = states.length;
      var notChange = len2 === currentStates.length;
      if (notChange) {
        for (var i = 0; i < len2; i++) {
          if (states[i] !== currentStates[i]) {
            notChange = false;
            break;
          }
        }
      }
      if (notChange) {
        return;
      }
      for (var i = 0; i < len2; i++) {
        var stateName = states[i];
        var stateObj = void 0;
        if (this.stateProxy) {
          stateObj = this.stateProxy(stateName, states);
        }
        if (!stateObj) {
          stateObj = this.states[stateName];
        }
        if (stateObj) {
          stateObjects.push(stateObj);
        }
      }
      var lastStateObj = stateObjects[len2 - 1];
      var useHoverLayer = !!(lastStateObj && lastStateObj.hoverLayer || forceUseHoverLayer);
      if (useHoverLayer) {
        this._toggleHoverLayerFlag(true);
      }
      var mergedState = this._mergeStates(stateObjects);
      var animationCfg = this.stateTransition;
      this.saveCurrentToNormalState(mergedState);
      this._applyStateObj(states.join(","), mergedState, this._normalState, false, !noAnimation && !this.__inHover && animationCfg && animationCfg.duration > 0, animationCfg);
      var textContent = this._textContent;
      var textGuide = this._textGuide;
      if (textContent) {
        textContent.useStates(states, noAnimation, useHoverLayer);
      }
      if (textGuide) {
        textGuide.useStates(states, noAnimation, useHoverLayer);
      }
      this._updateAnimationTargets();
      this.currentStates = states.slice();
      this.markRedraw();
      if (!useHoverLayer && this.__inHover) {
        this._toggleHoverLayerFlag(false);
        this.__dirty &= ~REDRAW_BIT;
      }
    }
  };
  Element2.prototype.isSilent = function() {
    var isSilent = this.silent;
    var ancestor = this.parent;
    while (!isSilent && ancestor) {
      if (ancestor.silent) {
        isSilent = true;
        break;
      }
      ancestor = ancestor.parent;
    }
    return isSilent;
  };
  Element2.prototype._updateAnimationTargets = function() {
    for (var i = 0; i < this.animators.length; i++) {
      var animator = this.animators[i];
      if (animator.targetName) {
        animator.changeTarget(this[animator.targetName]);
      }
    }
  };
  Element2.prototype.removeState = function(state) {
    var idx = indexOf(this.currentStates, state);
    if (idx >= 0) {
      var currentStates = this.currentStates.slice();
      currentStates.splice(idx, 1);
      this.useStates(currentStates);
    }
  };
  Element2.prototype.replaceState = function(oldState, newState, forceAdd) {
    var currentStates = this.currentStates.slice();
    var idx = indexOf(currentStates, oldState);
    var newStateExists = indexOf(currentStates, newState) >= 0;
    if (idx >= 0) {
      if (!newStateExists) {
        currentStates[idx] = newState;
      } else {
        currentStates.splice(idx, 1);
      }
    } else if (forceAdd && !newStateExists) {
      currentStates.push(newState);
    }
    this.useStates(currentStates);
  };
  Element2.prototype.toggleState = function(state, enable) {
    if (enable) {
      this.useState(state, true);
    } else {
      this.removeState(state);
    }
  };
  Element2.prototype._mergeStates = function(states) {
    var mergedState = {};
    var mergedTextConfig;
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      extend(mergedState, state);
      if (state.textConfig) {
        mergedTextConfig = mergedTextConfig || {};
        extend(mergedTextConfig, state.textConfig);
      }
    }
    if (mergedTextConfig) {
      mergedState.textConfig = mergedTextConfig;
    }
    return mergedState;
  };
  Element2.prototype._applyStateObj = function(stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
    var needsRestoreToNormal = !(state && keepCurrentStates);
    if (state && state.textConfig) {
      this.textConfig = extend({}, keepCurrentStates ? this.textConfig : normalState.textConfig);
      extend(this.textConfig, state.textConfig);
    } else if (needsRestoreToNormal) {
      if (normalState.textConfig) {
        this.textConfig = normalState.textConfig;
      }
    }
    var transitionTarget = {};
    var hasTransition = false;
    for (var i = 0; i < PRIMARY_STATES_KEYS.length; i++) {
      var key = PRIMARY_STATES_KEYS[i];
      var propNeedsTransition = transition && DEFAULT_ANIMATABLE_MAP[key];
      if (state && state[key] != null) {
        if (propNeedsTransition) {
          hasTransition = true;
          transitionTarget[key] = state[key];
        } else {
          this[key] = state[key];
        }
      } else if (needsRestoreToNormal) {
        if (normalState[key] != null) {
          if (propNeedsTransition) {
            hasTransition = true;
            transitionTarget[key] = normalState[key];
          } else {
            this[key] = normalState[key];
          }
        }
      }
    }
    if (!transition) {
      for (var i = 0; i < this.animators.length; i++) {
        var animator = this.animators[i];
        var targetName = animator.targetName;
        if (!animator.getLoop()) {
          animator.__changeFinalValue(targetName ? (state || normalState)[targetName] : state || normalState);
        }
      }
    }
    if (hasTransition) {
      this._transitionState(stateName, transitionTarget, animationCfg);
    }
  };
  Element2.prototype._attachComponent = function(componentEl) {
    if (componentEl.__zr && !componentEl.__hostTarget) {
      if (process.env.NODE_ENV !== "production") {
        throw new Error("Text element has been added to zrender.");
      }
      return;
    }
    if (componentEl === this) {
      if (process.env.NODE_ENV !== "production") {
        throw new Error("Recursive component attachment.");
      }
      return;
    }
    var zr = this.__zr;
    if (zr) {
      componentEl.addSelfToZr(zr);
    }
    componentEl.__zr = zr;
    componentEl.__hostTarget = this;
  };
  Element2.prototype._detachComponent = function(componentEl) {
    if (componentEl.__zr) {
      componentEl.removeSelfFromZr(componentEl.__zr);
    }
    componentEl.__zr = null;
    componentEl.__hostTarget = null;
  };
  Element2.prototype.getClipPath = function() {
    return this._clipPath;
  };
  Element2.prototype.setClipPath = function(clipPath) {
    if (this._clipPath && this._clipPath !== clipPath) {
      this.removeClipPath();
    }
    this._attachComponent(clipPath);
    this._clipPath = clipPath;
    this.markRedraw();
  };
  Element2.prototype.removeClipPath = function() {
    var clipPath = this._clipPath;
    if (clipPath) {
      this._detachComponent(clipPath);
      this._clipPath = null;
      this.markRedraw();
    }
  };
  Element2.prototype.getTextContent = function() {
    return this._textContent;
  };
  Element2.prototype.setTextContent = function(textEl) {
    var previousTextContent = this._textContent;
    if (previousTextContent === textEl) {
      return;
    }
    if (previousTextContent && previousTextContent !== textEl) {
      this.removeTextContent();
    }
    if (process.env.NODE_ENV !== "production") {
      if (textEl.__zr && !textEl.__hostTarget) {
        throw new Error("Text element has been added to zrender.");
      }
    }
    textEl.innerTransformable = new Transformable_default();
    this._attachComponent(textEl);
    this._textContent = textEl;
    this.markRedraw();
  };
  Element2.prototype.setTextConfig = function(cfg) {
    if (!this.textConfig) {
      this.textConfig = {};
    }
    extend(this.textConfig, cfg);
    this.markRedraw();
  };
  Element2.prototype.removeTextConfig = function() {
    this.textConfig = null;
    this.markRedraw();
  };
  Element2.prototype.removeTextContent = function() {
    var textEl = this._textContent;
    if (textEl) {
      textEl.innerTransformable = null;
      this._detachComponent(textEl);
      this._textContent = null;
      this._innerTextDefaultStyle = null;
      this.markRedraw();
    }
  };
  Element2.prototype.getTextGuideLine = function() {
    return this._textGuide;
  };
  Element2.prototype.setTextGuideLine = function(guideLine) {
    if (this._textGuide && this._textGuide !== guideLine) {
      this.removeTextGuideLine();
    }
    this._attachComponent(guideLine);
    this._textGuide = guideLine;
    this.markRedraw();
  };
  Element2.prototype.removeTextGuideLine = function() {
    var textGuide = this._textGuide;
    if (textGuide) {
      this._detachComponent(textGuide);
      this._textGuide = null;
      this.markRedraw();
    }
  };
  Element2.prototype.markRedraw = function() {
    this.__dirty |= REDRAW_BIT;
    var zr = this.__zr;
    if (zr) {
      if (this.__inHover) {
        zr.refreshHover();
      } else {
        zr.refresh();
      }
    }
    if (this.__hostTarget) {
      this.__hostTarget.markRedraw();
    }
  };
  Element2.prototype.dirty = function() {
    this.markRedraw();
  };
  Element2.prototype._toggleHoverLayerFlag = function(inHover) {
    this.__inHover = inHover;
    var textContent = this._textContent;
    var textGuide = this._textGuide;
    if (textContent) {
      textContent.__inHover = inHover;
    }
    if (textGuide) {
      textGuide.__inHover = inHover;
    }
  };
  Element2.prototype.addSelfToZr = function(zr) {
    if (this.__zr === zr) {
      return;
    }
    this.__zr = zr;
    var animators = this.animators;
    if (animators) {
      for (var i = 0; i < animators.length; i++) {
        zr.animation.addAnimator(animators[i]);
      }
    }
    if (this._clipPath) {
      this._clipPath.addSelfToZr(zr);
    }
    if (this._textContent) {
      this._textContent.addSelfToZr(zr);
    }
    if (this._textGuide) {
      this._textGuide.addSelfToZr(zr);
    }
  };
  Element2.prototype.removeSelfFromZr = function(zr) {
    if (!this.__zr) {
      return;
    }
    this.__zr = null;
    var animators = this.animators;
    if (animators) {
      for (var i = 0; i < animators.length; i++) {
        zr.animation.removeAnimator(animators[i]);
      }
    }
    if (this._clipPath) {
      this._clipPath.removeSelfFromZr(zr);
    }
    if (this._textContent) {
      this._textContent.removeSelfFromZr(zr);
    }
    if (this._textGuide) {
      this._textGuide.removeSelfFromZr(zr);
    }
  };
  Element2.prototype.animate = function(key, loop, allowDiscreteAnimation) {
    var target = key ? this[key] : this;
    if (process.env.NODE_ENV !== "production") {
      if (!target) {
        logError('Property "' + key + '" is not existed in element ' + this.id);
        return;
      }
    }
    var animator = new Animator_default(target, loop, allowDiscreteAnimation);
    key && (animator.targetName = key);
    this.addAnimator(animator, key);
    return animator;
  };
  Element2.prototype.addAnimator = function(animator, key) {
    var zr = this.__zr;
    var el = this;
    animator.during(function() {
      el.updateDuringAnimation(key);
    }).done(function() {
      var animators = el.animators;
      var idx = indexOf(animators, animator);
      if (idx >= 0) {
        animators.splice(idx, 1);
      }
    });
    this.animators.push(animator);
    if (zr) {
      zr.animation.addAnimator(animator);
    }
    zr && zr.wakeUp();
  };
  Element2.prototype.updateDuringAnimation = function(key) {
    this.markRedraw();
  };
  Element2.prototype.stopAnimation = function(scope, forwardToLast) {
    var animators = this.animators;
    var len2 = animators.length;
    var leftAnimators = [];
    for (var i = 0; i < len2; i++) {
      var animator = animators[i];
      if (!scope || scope === animator.scope) {
        animator.stop(forwardToLast);
      } else {
        leftAnimators.push(animator);
      }
    }
    this.animators = leftAnimators;
    return this;
  };
  Element2.prototype.animateTo = function(target, cfg, animationProps) {
    animateTo(this, target, cfg, animationProps);
  };
  Element2.prototype.animateFrom = function(target, cfg, animationProps) {
    animateTo(this, target, cfg, animationProps, true);
  };
  Element2.prototype._transitionState = function(stateName, target, cfg, animationProps) {
    var animators = animateTo(this, target, cfg, animationProps);
    for (var i = 0; i < animators.length; i++) {
      animators[i].__fromStateTransition = stateName;
    }
  };
  Element2.prototype.getBoundingRect = function() {
    return null;
  };
  Element2.prototype.getPaintRect = function() {
    return null;
  };
  Element2.initDefaultProps = function() {
    var elProto = Element2.prototype;
    elProto.type = "element";
    elProto.name = "";
    elProto.ignore = elProto.silent = elProto.isGroup = elProto.draggable = elProto.dragging = elProto.ignoreClip = elProto.__inHover = false;
    elProto.__dirty = REDRAW_BIT;
    var logs = {};
    function logDeprecatedError(key, xKey, yKey) {
      if (!logs[key + xKey + yKey]) {
        console.warn("DEPRECATED: '" + key + "' has been deprecated. use '" + xKey + "', '" + yKey + "' instead");
        logs[key + xKey + yKey] = true;
      }
    }
    function createLegacyProperty(key, privateKey, xKey, yKey) {
      Object.defineProperty(elProto, key, {
        get: function() {
          if (process.env.NODE_ENV !== "production") {
            logDeprecatedError(key, xKey, yKey);
          }
          if (!this[privateKey]) {
            var pos = this[privateKey] = [];
            enhanceArray(this, pos);
          }
          return this[privateKey];
        },
        set: function(pos) {
          if (process.env.NODE_ENV !== "production") {
            logDeprecatedError(key, xKey, yKey);
          }
          this[xKey] = pos[0];
          this[yKey] = pos[1];
          this[privateKey] = pos;
          enhanceArray(this, pos);
        }
      });
      function enhanceArray(self2, pos) {
        Object.defineProperty(pos, 0, {
          get: function() {
            return self2[xKey];
          },
          set: function(val) {
            self2[xKey] = val;
          }
        });
        Object.defineProperty(pos, 1, {
          get: function() {
            return self2[yKey];
          },
          set: function(val) {
            self2[yKey] = val;
          }
        });
      }
    }
    if (Object.defineProperty) {
      createLegacyProperty("position", "_legacyPos", "x", "y");
      createLegacyProperty("scale", "_legacyScale", "scaleX", "scaleY");
      createLegacyProperty("origin", "_legacyOrigin", "originX", "originY");
    }
  }();
  return Element2;
}();
mixin(Element, Eventful_default);
mixin(Element, Transformable_default);
function animateTo(animatable, target, cfg, animationProps, reverse) {
  cfg = cfg || {};
  var animators = [];
  animateToShallow(animatable, "", animatable, target, cfg, animationProps, animators, reverse);
  var finishCount = animators.length;
  var doneHappened = false;
  var cfgDone = cfg.done;
  var cfgAborted = cfg.aborted;
  var doneCb = function() {
    doneHappened = true;
    finishCount--;
    if (finishCount <= 0) {
      doneHappened ? cfgDone && cfgDone() : cfgAborted && cfgAborted();
    }
  };
  var abortedCb = function() {
    finishCount--;
    if (finishCount <= 0) {
      doneHappened ? cfgDone && cfgDone() : cfgAborted && cfgAborted();
    }
  };
  if (!finishCount) {
    cfgDone && cfgDone();
  }
  if (animators.length > 0 && cfg.during) {
    animators[0].during(function(target2, percent) {
      cfg.during(percent);
    });
  }
  for (var i = 0; i < animators.length; i++) {
    var animator = animators[i];
    if (doneCb) {
      animator.done(doneCb);
    }
    if (abortedCb) {
      animator.aborted(abortedCb);
    }
    if (cfg.force) {
      animator.duration(cfg.duration);
    }
    animator.start(cfg.easing);
  }
  return animators;
}
function copyArrShallow(source, target, len2) {
  for (var i = 0; i < len2; i++) {
    source[i] = target[i];
  }
}
function is2DArray(value) {
  return isArrayLike(value[0]);
}
function copyValue(target, source, key) {
  if (isArrayLike(source[key])) {
    if (!isArrayLike(target[key])) {
      target[key] = [];
    }
    if (isTypedArray(source[key])) {
      var len2 = source[key].length;
      if (target[key].length !== len2) {
        target[key] = new source[key].constructor(len2);
        copyArrShallow(target[key], source[key], len2);
      }
    } else {
      var sourceArr = source[key];
      var targetArr = target[key];
      var len0 = sourceArr.length;
      if (is2DArray(sourceArr)) {
        var len1 = sourceArr[0].length;
        for (var i = 0; i < len0; i++) {
          if (!targetArr[i]) {
            targetArr[i] = Array.prototype.slice.call(sourceArr[i]);
          } else {
            copyArrShallow(targetArr[i], sourceArr[i], len1);
          }
        }
      } else {
        copyArrShallow(targetArr, sourceArr, len0);
      }
      targetArr.length = sourceArr.length;
    }
  } else {
    target[key] = source[key];
  }
}
function isValueSame(val1, val2) {
  return val1 === val2 || isArrayLike(val1) && isArrayLike(val2) && is1DArraySame(val1, val2);
}
function is1DArraySame(arr0, arr1) {
  var len2 = arr0.length;
  if (len2 !== arr1.length) {
    return false;
  }
  for (var i = 0; i < len2; i++) {
    if (arr0[i] !== arr1[i]) {
      return false;
    }
  }
  return true;
}
function animateToShallow(animatable, topKey, animateObj, target, cfg, animationProps, animators, reverse) {
  var targetKeys = keys(target);
  var duration = cfg.duration;
  var delay = cfg.delay;
  var additive = cfg.additive;
  var setToFinal = cfg.setToFinal;
  var animateAll = !isObject(animationProps);
  var existsAnimators = animatable.animators;
  var animationKeys = [];
  for (var k = 0; k < targetKeys.length; k++) {
    var innerKey = targetKeys[k];
    var targetVal = target[innerKey];
    if (targetVal != null && animateObj[innerKey] != null && (animateAll || animationProps[innerKey])) {
      if (isObject(targetVal) && !isArrayLike(targetVal) && !isGradientObject(targetVal)) {
        if (topKey) {
          if (!reverse) {
            animateObj[innerKey] = targetVal;
            animatable.updateDuringAnimation(topKey);
          }
          continue;
        }
        animateToShallow(animatable, innerKey, animateObj[innerKey], targetVal, cfg, animationProps && animationProps[innerKey], animators, reverse);
      } else {
        animationKeys.push(innerKey);
      }
    } else if (!reverse) {
      animateObj[innerKey] = targetVal;
      animatable.updateDuringAnimation(topKey);
      animationKeys.push(innerKey);
    }
  }
  var keyLen = animationKeys.length;
  if (!additive && keyLen) {
    for (var i = 0; i < existsAnimators.length; i++) {
      var animator = existsAnimators[i];
      if (animator.targetName === topKey) {
        var allAborted = animator.stopTracks(animationKeys);
        if (allAborted) {
          var idx = indexOf(existsAnimators, animator);
          existsAnimators.splice(idx, 1);
        }
      }
    }
  }
  if (!cfg.force) {
    animationKeys = filter(animationKeys, function(key) {
      return !isValueSame(target[key], animateObj[key]);
    });
    keyLen = animationKeys.length;
  }
  if (keyLen > 0 || cfg.force && !animators.length) {
    var revertedSource = void 0;
    var reversedTarget = void 0;
    var sourceClone = void 0;
    if (reverse) {
      reversedTarget = {};
      if (setToFinal) {
        revertedSource = {};
      }
      for (var i = 0; i < keyLen; i++) {
        var innerKey = animationKeys[i];
        reversedTarget[innerKey] = animateObj[innerKey];
        if (setToFinal) {
          revertedSource[innerKey] = target[innerKey];
        } else {
          animateObj[innerKey] = target[innerKey];
        }
      }
    } else if (setToFinal) {
      sourceClone = {};
      for (var i = 0; i < keyLen; i++) {
        var innerKey = animationKeys[i];
        sourceClone[innerKey] = cloneValue(animateObj[innerKey]);
        copyValue(animateObj, target, innerKey);
      }
    }
    var animator = new Animator_default(animateObj, false, false, additive ? filter(existsAnimators, function(animator2) {
      return animator2.targetName === topKey;
    }) : null);
    animator.targetName = topKey;
    if (cfg.scope) {
      animator.scope = cfg.scope;
    }
    if (setToFinal && revertedSource) {
      animator.whenWithKeys(0, revertedSource, animationKeys);
    }
    if (sourceClone) {
      animator.whenWithKeys(0, sourceClone, animationKeys);
    }
    animator.whenWithKeys(duration == null ? 500 : duration, reverse ? reversedTarget : target, animationKeys).delay(delay || 0);
    animatable.addAnimator(animator, topKey);
    animators.push(animator);
  }
}
var Element_default = Element;

// node_modules/zrender/lib/graphic/Displayable.js
var STYLE_MAGIC_KEY = "__zr_style_" + Math.round(Math.random() * 10);
var DEFAULT_COMMON_STYLE = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
};
var DEFAULT_COMMON_ANIMATION_PROPS = {
  style: {
    shadowBlur: true,
    shadowOffsetX: true,
    shadowOffsetY: true,
    shadowColor: true,
    opacity: true
  }
};
DEFAULT_COMMON_STYLE[STYLE_MAGIC_KEY] = true;
var PRIMARY_STATES_KEYS2 = ["z", "z2", "invisible"];
var PRIMARY_STATES_KEYS_IN_HOVER_LAYER = ["invisible"];
var Displayable = function(_super) {
  __extends(Displayable2, _super);
  function Displayable2(props) {
    return _super.call(this, props) || this;
  }
  Displayable2.prototype._init = function(props) {
    var keysArr = keys(props);
    for (var i = 0; i < keysArr.length; i++) {
      var key = keysArr[i];
      if (key === "style") {
        this.useStyle(props[key]);
      } else {
        _super.prototype.attrKV.call(this, key, props[key]);
      }
    }
    if (!this.style) {
      this.useStyle({});
    }
  };
  Displayable2.prototype.beforeBrush = function() {
  };
  Displayable2.prototype.afterBrush = function() {
  };
  Displayable2.prototype.innerBeforeBrush = function() {
  };
  Displayable2.prototype.innerAfterBrush = function() {
  };
  Displayable2.prototype.shouldBePainted = function(viewWidth, viewHeight, considerClipPath, considerAncestors) {
    var m = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && isDisplayableCulled(this, viewWidth, viewHeight) || m && !m[0] && !m[3]) {
      return false;
    }
    if (considerClipPath && this.__clipPaths) {
      for (var i = 0; i < this.__clipPaths.length; ++i) {
        if (this.__clipPaths[i].isZeroArea()) {
          return false;
        }
      }
    }
    if (considerAncestors && this.parent) {
      var parent_1 = this.parent;
      while (parent_1) {
        if (parent_1.ignore) {
          return false;
        }
        parent_1 = parent_1.parent;
      }
    }
    return true;
  };
  Displayable2.prototype.contain = function(x, y) {
    return this.rectContain(x, y);
  };
  Displayable2.prototype.traverse = function(cb, context) {
    cb.call(context, this);
  };
  Displayable2.prototype.rectContain = function(x, y) {
    var coord = this.transformCoordToLocal(x, y);
    var rect = this.getBoundingRect();
    return rect.contain(coord[0], coord[1]);
  };
  Displayable2.prototype.getPaintRect = function() {
    var rect = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var transform = this.transform;
      var elRect = this.getBoundingRect();
      var style = this.style;
      var shadowSize = style.shadowBlur || 0;
      var shadowOffsetX = style.shadowOffsetX || 0;
      var shadowOffsetY = style.shadowOffsetY || 0;
      rect = this._paintRect || (this._paintRect = new BoundingRect_default(0, 0, 0, 0));
      if (transform) {
        BoundingRect_default.applyTransform(rect, elRect, transform);
      } else {
        rect.copy(elRect);
      }
      if (shadowSize || shadowOffsetX || shadowOffsetY) {
        rect.width += shadowSize * 2 + Math.abs(shadowOffsetX);
        rect.height += shadowSize * 2 + Math.abs(shadowOffsetY);
        rect.x = Math.min(rect.x, rect.x + shadowOffsetX - shadowSize);
        rect.y = Math.min(rect.y, rect.y + shadowOffsetY - shadowSize);
      }
      var tolerance = this.dirtyRectTolerance;
      if (!rect.isZero()) {
        rect.x = Math.floor(rect.x - tolerance);
        rect.y = Math.floor(rect.y - tolerance);
        rect.width = Math.ceil(rect.width + 1 + tolerance * 2);
        rect.height = Math.ceil(rect.height + 1 + tolerance * 2);
      }
    }
    return rect;
  };
  Displayable2.prototype.setPrevPaintRect = function(paintRect) {
    if (paintRect) {
      this._prevPaintRect = this._prevPaintRect || new BoundingRect_default(0, 0, 0, 0);
      this._prevPaintRect.copy(paintRect);
    } else {
      this._prevPaintRect = null;
    }
  };
  Displayable2.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  };
  Displayable2.prototype.animateStyle = function(loop) {
    return this.animate("style", loop);
  };
  Displayable2.prototype.updateDuringAnimation = function(targetKey) {
    if (targetKey === "style") {
      this.dirtyStyle();
    } else {
      this.markRedraw();
    }
  };
  Displayable2.prototype.attrKV = function(key, value) {
    if (key !== "style") {
      _super.prototype.attrKV.call(this, key, value);
    } else {
      if (!this.style) {
        this.useStyle(value);
      } else {
        this.setStyle(value);
      }
    }
  };
  Displayable2.prototype.setStyle = function(keyOrObj, value) {
    if (typeof keyOrObj === "string") {
      this.style[keyOrObj] = value;
    } else {
      extend(this.style, keyOrObj);
    }
    this.dirtyStyle();
    return this;
  };
  Displayable2.prototype.dirtyStyle = function(notRedraw) {
    if (!notRedraw) {
      this.markRedraw();
    }
    this.__dirty |= STYLE_CHANGED_BIT;
    if (this._rect) {
      this._rect = null;
    }
  };
  Displayable2.prototype.dirty = function() {
    this.dirtyStyle();
  };
  Displayable2.prototype.styleChanged = function() {
    return !!(this.__dirty & STYLE_CHANGED_BIT);
  };
  Displayable2.prototype.styleUpdated = function() {
    this.__dirty &= ~STYLE_CHANGED_BIT;
  };
  Displayable2.prototype.createStyle = function(obj) {
    return createObject(DEFAULT_COMMON_STYLE, obj);
  };
  Displayable2.prototype.useStyle = function(obj) {
    if (!obj[STYLE_MAGIC_KEY]) {
      obj = this.createStyle(obj);
    }
    if (this.__inHover) {
      this.__hoverStyle = obj;
    } else {
      this.style = obj;
    }
    this.dirtyStyle();
  };
  Displayable2.prototype.isStyleObject = function(obj) {
    return obj[STYLE_MAGIC_KEY];
  };
  Displayable2.prototype._innerSaveToNormal = function(toState) {
    _super.prototype._innerSaveToNormal.call(this, toState);
    var normalState = this._normalState;
    if (toState.style && !normalState.style) {
      normalState.style = this._mergeStyle(this.createStyle(), this.style);
    }
    this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS2);
  };
  Displayable2.prototype._applyStateObj = function(stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
    _super.prototype._applyStateObj.call(this, stateName, state, normalState, keepCurrentStates, transition, animationCfg);
    var needsRestoreToNormal = !(state && keepCurrentStates);
    var targetStyle;
    if (state && state.style) {
      if (transition) {
        if (keepCurrentStates) {
          targetStyle = state.style;
        } else {
          targetStyle = this._mergeStyle(this.createStyle(), normalState.style);
          this._mergeStyle(targetStyle, state.style);
        }
      } else {
        targetStyle = this._mergeStyle(this.createStyle(), keepCurrentStates ? this.style : normalState.style);
        this._mergeStyle(targetStyle, state.style);
      }
    } else if (needsRestoreToNormal) {
      targetStyle = normalState.style;
    }
    if (targetStyle) {
      if (transition) {
        var sourceStyle = this.style;
        this.style = this.createStyle(needsRestoreToNormal ? {} : sourceStyle);
        if (needsRestoreToNormal) {
          var changedKeys = keys(sourceStyle);
          for (var i = 0; i < changedKeys.length; i++) {
            var key = changedKeys[i];
            if (key in targetStyle) {
              targetStyle[key] = targetStyle[key];
              this.style[key] = sourceStyle[key];
            }
          }
        }
        var targetKeys = keys(targetStyle);
        for (var i = 0; i < targetKeys.length; i++) {
          var key = targetKeys[i];
          this.style[key] = this.style[key];
        }
        this._transitionState(stateName, {
          style: targetStyle
        }, animationCfg, this.getAnimationStyleProps());
      } else {
        this.useStyle(targetStyle);
      }
    }
    var statesKeys = this.__inHover ? PRIMARY_STATES_KEYS_IN_HOVER_LAYER : PRIMARY_STATES_KEYS2;
    for (var i = 0; i < statesKeys.length; i++) {
      var key = statesKeys[i];
      if (state && state[key] != null) {
        this[key] = state[key];
      } else if (needsRestoreToNormal) {
        if (normalState[key] != null) {
          this[key] = normalState[key];
        }
      }
    }
  };
  Displayable2.prototype._mergeStates = function(states) {
    var mergedState = _super.prototype._mergeStates.call(this, states);
    var mergedStyle;
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (state.style) {
        mergedStyle = mergedStyle || {};
        this._mergeStyle(mergedStyle, state.style);
      }
    }
    if (mergedStyle) {
      mergedState.style = mergedStyle;
    }
    return mergedState;
  };
  Displayable2.prototype._mergeStyle = function(targetStyle, sourceStyle) {
    extend(targetStyle, sourceStyle);
    return targetStyle;
  };
  Displayable2.prototype.getAnimationStyleProps = function() {
    return DEFAULT_COMMON_ANIMATION_PROPS;
  };
  Displayable2.initDefaultProps = function() {
    var dispProto = Displayable2.prototype;
    dispProto.type = "displayable";
    dispProto.invisible = false;
    dispProto.z = 0;
    dispProto.z2 = 0;
    dispProto.zlevel = 0;
    dispProto.culling = false;
    dispProto.cursor = "pointer";
    dispProto.rectHover = false;
    dispProto.incremental = false;
    dispProto._rect = null;
    dispProto.dirtyRectTolerance = 0;
    dispProto.__dirty = REDRAW_BIT | STYLE_CHANGED_BIT;
  }();
  return Displayable2;
}(Element_default);
var tmpRect = new BoundingRect_default(0, 0, 0, 0);
var viewRect = new BoundingRect_default(0, 0, 0, 0);
function isDisplayableCulled(el, width, height) {
  tmpRect.copy(el.getBoundingRect());
  if (el.transform) {
    tmpRect.applyTransform(el.transform);
  }
  viewRect.width = width;
  viewRect.height = height;
  return !tmpRect.intersect(viewRect);
}
var Displayable_default = Displayable;

// node_modules/zrender/lib/core/bbox.js
var mathMin2 = Math.min;
var mathMax2 = Math.max;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI2 = Math.PI * 2;
var start = create2();
var end = create2();
var extremity = create2();
function fromLine(x0, y0, x1, y1, min3, max3) {
  min3[0] = mathMin2(x0, x1);
  min3[1] = mathMin2(y0, y1);
  max3[0] = mathMax2(x0, x1);
  max3[1] = mathMax2(y0, y1);
}
var xDim = [];
var yDim = [];
function fromCubic(x0, y0, x1, y1, x2, y2, x3, y3, min3, max3) {
  var cubicExtrema2 = cubicExtrema;
  var cubicAt2 = cubicAt;
  var n = cubicExtrema2(x0, x1, x2, x3, xDim);
  min3[0] = Infinity;
  min3[1] = Infinity;
  max3[0] = -Infinity;
  max3[1] = -Infinity;
  for (var i = 0; i < n; i++) {
    var x = cubicAt2(x0, x1, x2, x3, xDim[i]);
    min3[0] = mathMin2(x, min3[0]);
    max3[0] = mathMax2(x, max3[0]);
  }
  n = cubicExtrema2(y0, y1, y2, y3, yDim);
  for (var i = 0; i < n; i++) {
    var y = cubicAt2(y0, y1, y2, y3, yDim[i]);
    min3[1] = mathMin2(y, min3[1]);
    max3[1] = mathMax2(y, max3[1]);
  }
  min3[0] = mathMin2(x0, min3[0]);
  max3[0] = mathMax2(x0, max3[0]);
  min3[0] = mathMin2(x3, min3[0]);
  max3[0] = mathMax2(x3, max3[0]);
  min3[1] = mathMin2(y0, min3[1]);
  max3[1] = mathMax2(y0, max3[1]);
  min3[1] = mathMin2(y3, min3[1]);
  max3[1] = mathMax2(y3, max3[1]);
}
function fromQuadratic(x0, y0, x1, y1, x2, y2, min3, max3) {
  var quadraticExtremum2 = quadraticExtremum;
  var quadraticAt2 = quadraticAt;
  var tx = mathMax2(mathMin2(quadraticExtremum2(x0, x1, x2), 1), 0);
  var ty = mathMax2(mathMin2(quadraticExtremum2(y0, y1, y2), 1), 0);
  var x = quadraticAt2(x0, x1, x2, tx);
  var y = quadraticAt2(y0, y1, y2, ty);
  min3[0] = mathMin2(x0, x2, x);
  min3[1] = mathMin2(y0, y2, y);
  max3[0] = mathMax2(x0, x2, x);
  max3[1] = mathMax2(y0, y2, y);
}
function fromArc(x, y, rx, ry, startAngle, endAngle, anticlockwise, min3, max3) {
  var vec2Min = min;
  var vec2Max = max;
  var diff = Math.abs(startAngle - endAngle);
  if (diff % PI2 < 1e-4 && diff > 1e-4) {
    min3[0] = x - rx;
    min3[1] = y - ry;
    max3[0] = x + rx;
    max3[1] = y + ry;
    return;
  }
  start[0] = mathCos(startAngle) * rx + x;
  start[1] = mathSin(startAngle) * ry + y;
  end[0] = mathCos(endAngle) * rx + x;
  end[1] = mathSin(endAngle) * ry + y;
  vec2Min(min3, start, end);
  vec2Max(max3, start, end);
  startAngle = startAngle % PI2;
  if (startAngle < 0) {
    startAngle = startAngle + PI2;
  }
  endAngle = endAngle % PI2;
  if (endAngle < 0) {
    endAngle = endAngle + PI2;
  }
  if (startAngle > endAngle && !anticlockwise) {
    endAngle += PI2;
  } else if (startAngle < endAngle && anticlockwise) {
    startAngle += PI2;
  }
  if (anticlockwise) {
    var tmp = endAngle;
    endAngle = startAngle;
    startAngle = tmp;
  }
  for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
    if (angle > startAngle) {
      extremity[0] = mathCos(angle) * rx + x;
      extremity[1] = mathSin(angle) * ry + y;
      vec2Min(min3, extremity, min3);
      vec2Max(max3, extremity, max3);
    }
  }
}

// node_modules/zrender/lib/core/PathProxy.js
var CMD = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
};
var tmpOutX = [];
var tmpOutY = [];
var min2 = [];
var max2 = [];
var min22 = [];
var max22 = [];
var mathMin3 = Math.min;
var mathMax3 = Math.max;
var mathCos2 = Math.cos;
var mathSin2 = Math.sin;
var mathAbs = Math.abs;
var PI = Math.PI;
var PI22 = PI * 2;
var hasTypedArray = typeof Float32Array !== "undefined";
var tmpAngles = [];
function modPI2(radian) {
  var n = Math.round(radian / PI * 1e8) / 1e8;
  return n % 2 * PI;
}
function normalizeArcAngles(angles, anticlockwise) {
  var newStartAngle = modPI2(angles[0]);
  if (newStartAngle < 0) {
    newStartAngle += PI22;
  }
  var delta = newStartAngle - angles[0];
  var newEndAngle = angles[1];
  newEndAngle += delta;
  if (!anticlockwise && newEndAngle - newStartAngle >= PI22) {
    newEndAngle = newStartAngle + PI22;
  } else if (anticlockwise && newStartAngle - newEndAngle >= PI22) {
    newEndAngle = newStartAngle - PI22;
  } else if (!anticlockwise && newStartAngle > newEndAngle) {
    newEndAngle = newStartAngle + (PI22 - modPI2(newStartAngle - newEndAngle));
  } else if (anticlockwise && newStartAngle < newEndAngle) {
    newEndAngle = newStartAngle - (PI22 - modPI2(newEndAngle - newStartAngle));
  }
  angles[0] = newStartAngle;
  angles[1] = newEndAngle;
}
var PathProxy = function() {
  function PathProxy2(notSaveData) {
    this.dpr = 1;
    this._xi = 0;
    this._yi = 0;
    this._x0 = 0;
    this._y0 = 0;
    this._len = 0;
    if (notSaveData) {
      this._saveData = false;
    }
    if (this._saveData) {
      this.data = [];
    }
  }
  PathProxy2.prototype.increaseVersion = function() {
    this._version++;
  };
  PathProxy2.prototype.getVersion = function() {
    return this._version;
  };
  PathProxy2.prototype.setScale = function(sx, sy, segmentIgnoreThreshold) {
    segmentIgnoreThreshold = segmentIgnoreThreshold || 0;
    if (segmentIgnoreThreshold > 0) {
      this._ux = mathAbs(segmentIgnoreThreshold / devicePixelRatio / sx) || 0;
      this._uy = mathAbs(segmentIgnoreThreshold / devicePixelRatio / sy) || 0;
    }
  };
  PathProxy2.prototype.setDPR = function(dpr2) {
    this.dpr = dpr2;
  };
  PathProxy2.prototype.setContext = function(ctx) {
    this._ctx = ctx;
  };
  PathProxy2.prototype.getContext = function() {
    return this._ctx;
  };
  PathProxy2.prototype.beginPath = function() {
    this._ctx && this._ctx.beginPath();
    this.reset();
    return this;
  };
  PathProxy2.prototype.reset = function() {
    if (this._saveData) {
      this._len = 0;
    }
    if (this._pathSegLen) {
      this._pathSegLen = null;
      this._pathLen = 0;
    }
    this._version++;
  };
  PathProxy2.prototype.moveTo = function(x, y) {
    this._drawPendingPt();
    this.addData(CMD.M, x, y);
    this._ctx && this._ctx.moveTo(x, y);
    this._x0 = x;
    this._y0 = y;
    this._xi = x;
    this._yi = y;
    return this;
  };
  PathProxy2.prototype.lineTo = function(x, y) {
    var dx = mathAbs(x - this._xi);
    var dy = mathAbs(y - this._yi);
    var exceedUnit = dx > this._ux || dy > this._uy;
    this.addData(CMD.L, x, y);
    if (this._ctx && exceedUnit) {
      this._ctx.lineTo(x, y);
    }
    if (exceedUnit) {
      this._xi = x;
      this._yi = y;
      this._pendingPtDist = 0;
    } else {
      var d2 = dx * dx + dy * dy;
      if (d2 > this._pendingPtDist) {
        this._pendingPtX = x;
        this._pendingPtY = y;
        this._pendingPtDist = d2;
      }
    }
    return this;
  };
  PathProxy2.prototype.bezierCurveTo = function(x1, y1, x2, y2, x3, y3) {
    this._drawPendingPt();
    this.addData(CMD.C, x1, y1, x2, y2, x3, y3);
    if (this._ctx) {
      this._ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    }
    this._xi = x3;
    this._yi = y3;
    return this;
  };
  PathProxy2.prototype.quadraticCurveTo = function(x1, y1, x2, y2) {
    this._drawPendingPt();
    this.addData(CMD.Q, x1, y1, x2, y2);
    if (this._ctx) {
      this._ctx.quadraticCurveTo(x1, y1, x2, y2);
    }
    this._xi = x2;
    this._yi = y2;
    return this;
  };
  PathProxy2.prototype.arc = function(cx, cy, r, startAngle, endAngle, anticlockwise) {
    this._drawPendingPt();
    tmpAngles[0] = startAngle;
    tmpAngles[1] = endAngle;
    normalizeArcAngles(tmpAngles, anticlockwise);
    startAngle = tmpAngles[0];
    endAngle = tmpAngles[1];
    var delta = endAngle - startAngle;
    this.addData(CMD.A, cx, cy, r, r, startAngle, delta, 0, anticlockwise ? 0 : 1);
    this._ctx && this._ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);
    this._xi = mathCos2(endAngle) * r + cx;
    this._yi = mathSin2(endAngle) * r + cy;
    return this;
  };
  PathProxy2.prototype.arcTo = function(x1, y1, x2, y2, radius) {
    this._drawPendingPt();
    if (this._ctx) {
      this._ctx.arcTo(x1, y1, x2, y2, radius);
    }
    return this;
  };
  PathProxy2.prototype.rect = function(x, y, w, h) {
    this._drawPendingPt();
    this._ctx && this._ctx.rect(x, y, w, h);
    this.addData(CMD.R, x, y, w, h);
    return this;
  };
  PathProxy2.prototype.closePath = function() {
    this._drawPendingPt();
    this.addData(CMD.Z);
    var ctx = this._ctx;
    var x0 = this._x0;
    var y0 = this._y0;
    if (ctx) {
      ctx.closePath();
    }
    this._xi = x0;
    this._yi = y0;
    return this;
  };
  PathProxy2.prototype.fill = function(ctx) {
    ctx && ctx.fill();
    this.toStatic();
  };
  PathProxy2.prototype.stroke = function(ctx) {
    ctx && ctx.stroke();
    this.toStatic();
  };
  PathProxy2.prototype.len = function() {
    return this._len;
  };
  PathProxy2.prototype.setData = function(data) {
    var len2 = data.length;
    if (!(this.data && this.data.length === len2) && hasTypedArray) {
      this.data = new Float32Array(len2);
    }
    for (var i = 0; i < len2; i++) {
      this.data[i] = data[i];
    }
    this._len = len2;
  };
  PathProxy2.prototype.appendPath = function(path3) {
    if (!(path3 instanceof Array)) {
      path3 = [path3];
    }
    var len2 = path3.length;
    var appendSize = 0;
    var offset = this._len;
    for (var i = 0; i < len2; i++) {
      appendSize += path3[i].len();
    }
    if (hasTypedArray && this.data instanceof Float32Array) {
      this.data = new Float32Array(offset + appendSize);
    }
    for (var i = 0; i < len2; i++) {
      var appendPathData = path3[i].data;
      for (var k = 0; k < appendPathData.length; k++) {
        this.data[offset++] = appendPathData[k];
      }
    }
    this._len = offset;
  };
  PathProxy2.prototype.addData = function(cmd, a, b, c, d, e2, f, g, h) {
    if (!this._saveData) {
      return;
    }
    var data = this.data;
    if (this._len + arguments.length > data.length) {
      this._expandData();
      data = this.data;
    }
    for (var i = 0; i < arguments.length; i++) {
      data[this._len++] = arguments[i];
    }
  };
  PathProxy2.prototype._drawPendingPt = function() {
    if (this._pendingPtDist > 0) {
      this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY);
      this._pendingPtDist = 0;
    }
  };
  PathProxy2.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      var newData = [];
      for (var i = 0; i < this._len; i++) {
        newData[i] = this.data[i];
      }
      this.data = newData;
    }
  };
  PathProxy2.prototype.toStatic = function() {
    if (!this._saveData) {
      return;
    }
    this._drawPendingPt();
    var data = this.data;
    if (data instanceof Array) {
      data.length = this._len;
      if (hasTypedArray && this._len > 11) {
        this.data = new Float32Array(data);
      }
    }
  };
  PathProxy2.prototype.getBoundingRect = function() {
    min2[0] = min2[1] = min22[0] = min22[1] = Number.MAX_VALUE;
    max2[0] = max2[1] = max22[0] = max22[1] = -Number.MAX_VALUE;
    var data = this.data;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;
    var i;
    for (i = 0; i < this._len; ) {
      var cmd = data[i++];
      var isFirst = i === 1;
      if (isFirst) {
        xi = data[i];
        yi = data[i + 1];
        x0 = xi;
        y0 = yi;
      }
      switch (cmd) {
        case CMD.M:
          xi = x0 = data[i++];
          yi = y0 = data[i++];
          min22[0] = x0;
          min22[1] = y0;
          max22[0] = x0;
          max22[1] = y0;
          break;
        case CMD.L:
          fromLine(xi, yi, data[i], data[i + 1], min22, max22);
          xi = data[i++];
          yi = data[i++];
          break;
        case CMD.C:
          fromCubic(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], min22, max22);
          xi = data[i++];
          yi = data[i++];
          break;
        case CMD.Q:
          fromQuadratic(xi, yi, data[i++], data[i++], data[i], data[i + 1], min22, max22);
          xi = data[i++];
          yi = data[i++];
          break;
        case CMD.A:
          var cx = data[i++];
          var cy = data[i++];
          var rx = data[i++];
          var ry = data[i++];
          var startAngle = data[i++];
          var endAngle = data[i++] + startAngle;
          i += 1;
          var anticlockwise = !data[i++];
          if (isFirst) {
            x0 = mathCos2(startAngle) * rx + cx;
            y0 = mathSin2(startAngle) * ry + cy;
          }
          fromArc(cx, cy, rx, ry, startAngle, endAngle, anticlockwise, min22, max22);
          xi = mathCos2(endAngle) * rx + cx;
          yi = mathSin2(endAngle) * ry + cy;
          break;
        case CMD.R:
          x0 = xi = data[i++];
          y0 = yi = data[i++];
          var width = data[i++];
          var height = data[i++];
          fromLine(x0, y0, x0 + width, y0 + height, min22, max22);
          break;
        case CMD.Z:
          xi = x0;
          yi = y0;
          break;
      }
      min(min2, min2, min22);
      max(max2, max2, max22);
    }
    if (i === 0) {
      min2[0] = min2[1] = max2[0] = max2[1] = 0;
    }
    return new BoundingRect_default(min2[0], min2[1], max2[0] - min2[0], max2[1] - min2[1]);
  };
  PathProxy2.prototype._calculateLength = function() {
    var data = this.data;
    var len2 = this._len;
    var ux = this._ux;
    var uy = this._uy;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;
    if (!this._pathSegLen) {
      this._pathSegLen = [];
    }
    var pathSegLen = this._pathSegLen;
    var pathTotalLen = 0;
    var segCount = 0;
    for (var i = 0; i < len2; ) {
      var cmd = data[i++];
      var isFirst = i === 1;
      if (isFirst) {
        xi = data[i];
        yi = data[i + 1];
        x0 = xi;
        y0 = yi;
      }
      var l = -1;
      switch (cmd) {
        case CMD.M:
          xi = x0 = data[i++];
          yi = y0 = data[i++];
          break;
        case CMD.L: {
          var x2 = data[i++];
          var y2 = data[i++];
          var dx = x2 - xi;
          var dy = y2 - yi;
          if (mathAbs(dx) > ux || mathAbs(dy) > uy || i === len2 - 1) {
            l = Math.sqrt(dx * dx + dy * dy);
            xi = x2;
            yi = y2;
          }
          break;
        }
        case CMD.C: {
          var x1 = data[i++];
          var y1 = data[i++];
          var x2 = data[i++];
          var y2 = data[i++];
          var x3 = data[i++];
          var y3 = data[i++];
          l = cubicLength(xi, yi, x1, y1, x2, y2, x3, y3, 10);
          xi = x3;
          yi = y3;
          break;
        }
        case CMD.Q: {
          var x1 = data[i++];
          var y1 = data[i++];
          var x2 = data[i++];
          var y2 = data[i++];
          l = quadraticLength(xi, yi, x1, y1, x2, y2, 10);
          xi = x2;
          yi = y2;
          break;
        }
        case CMD.A:
          var cx = data[i++];
          var cy = data[i++];
          var rx = data[i++];
          var ry = data[i++];
          var startAngle = data[i++];
          var delta = data[i++];
          var endAngle = delta + startAngle;
          i += 1;
          if (isFirst) {
            x0 = mathCos2(startAngle) * rx + cx;
            y0 = mathSin2(startAngle) * ry + cy;
          }
          l = mathMax3(rx, ry) * mathMin3(PI22, Math.abs(delta));
          xi = mathCos2(endAngle) * rx + cx;
          yi = mathSin2(endAngle) * ry + cy;
          break;
        case CMD.R: {
          x0 = xi = data[i++];
          y0 = yi = data[i++];
          var width = data[i++];
          var height = data[i++];
          l = width * 2 + height * 2;
          break;
        }
        case CMD.Z: {
          var dx = x0 - xi;
          var dy = y0 - yi;
          l = Math.sqrt(dx * dx + dy * dy);
          xi = x0;
          yi = y0;
          break;
        }
      }
      if (l >= 0) {
        pathSegLen[segCount++] = l;
        pathTotalLen += l;
      }
    }
    this._pathLen = pathTotalLen;
    return pathTotalLen;
  };
  PathProxy2.prototype.rebuildPath = function(ctx, percent) {
    var d = this.data;
    var ux = this._ux;
    var uy = this._uy;
    var len2 = this._len;
    var x0;
    var y0;
    var xi;
    var yi;
    var x;
    var y;
    var drawPart = percent < 1;
    var pathSegLen;
    var pathTotalLen;
    var accumLength = 0;
    var segCount = 0;
    var displayedLength;
    var pendingPtDist = 0;
    var pendingPtX;
    var pendingPtY;
    if (drawPart) {
      if (!this._pathSegLen) {
        this._calculateLength();
      }
      pathSegLen = this._pathSegLen;
      pathTotalLen = this._pathLen;
      displayedLength = percent * pathTotalLen;
      if (!displayedLength) {
        return;
      }
    }
    lo:
      for (var i = 0; i < len2; ) {
        var cmd = d[i++];
        var isFirst = i === 1;
        if (isFirst) {
          xi = d[i];
          yi = d[i + 1];
          x0 = xi;
          y0 = yi;
        }
        if (cmd !== CMD.L && pendingPtDist > 0) {
          ctx.lineTo(pendingPtX, pendingPtY);
          pendingPtDist = 0;
        }
        switch (cmd) {
          case CMD.M:
            x0 = xi = d[i++];
            y0 = yi = d[i++];
            ctx.moveTo(xi, yi);
            break;
          case CMD.L: {
            x = d[i++];
            y = d[i++];
            var dx = mathAbs(x - xi);
            var dy = mathAbs(y - yi);
            if (dx > ux || dy > uy) {
              if (drawPart) {
                var l = pathSegLen[segCount++];
                if (accumLength + l > displayedLength) {
                  var t = (displayedLength - accumLength) / l;
                  ctx.lineTo(xi * (1 - t) + x * t, yi * (1 - t) + y * t);
                  break lo;
                }
                accumLength += l;
              }
              ctx.lineTo(x, y);
              xi = x;
              yi = y;
              pendingPtDist = 0;
            } else {
              var d2 = dx * dx + dy * dy;
              if (d2 > pendingPtDist) {
                pendingPtX = x;
                pendingPtY = y;
                pendingPtDist = d2;
              }
            }
            break;
          }
          case CMD.C: {
            var x1 = d[i++];
            var y1 = d[i++];
            var x2 = d[i++];
            var y2 = d[i++];
            var x3 = d[i++];
            var y3 = d[i++];
            if (drawPart) {
              var l = pathSegLen[segCount++];
              if (accumLength + l > displayedLength) {
                var t = (displayedLength - accumLength) / l;
                cubicSubdivide(xi, x1, x2, x3, t, tmpOutX);
                cubicSubdivide(yi, y1, y2, y3, t, tmpOutY);
                ctx.bezierCurveTo(tmpOutX[1], tmpOutY[1], tmpOutX[2], tmpOutY[2], tmpOutX[3], tmpOutY[3]);
                break lo;
              }
              accumLength += l;
            }
            ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
            xi = x3;
            yi = y3;
            break;
          }
          case CMD.Q: {
            var x1 = d[i++];
            var y1 = d[i++];
            var x2 = d[i++];
            var y2 = d[i++];
            if (drawPart) {
              var l = pathSegLen[segCount++];
              if (accumLength + l > displayedLength) {
                var t = (displayedLength - accumLength) / l;
                quadraticSubdivide(xi, x1, x2, t, tmpOutX);
                quadraticSubdivide(yi, y1, y2, t, tmpOutY);
                ctx.quadraticCurveTo(tmpOutX[1], tmpOutY[1], tmpOutX[2], tmpOutY[2]);
                break lo;
              }
              accumLength += l;
            }
            ctx.quadraticCurveTo(x1, y1, x2, y2);
            xi = x2;
            yi = y2;
            break;
          }
          case CMD.A:
            var cx = d[i++];
            var cy = d[i++];
            var rx = d[i++];
            var ry = d[i++];
            var startAngle = d[i++];
            var delta = d[i++];
            var psi = d[i++];
            var anticlockwise = !d[i++];
            var r = rx > ry ? rx : ry;
            var isEllipse = mathAbs(rx - ry) > 1e-3;
            var endAngle = startAngle + delta;
            var breakBuild = false;
            if (drawPart) {
              var l = pathSegLen[segCount++];
              if (accumLength + l > displayedLength) {
                endAngle = startAngle + delta * (displayedLength - accumLength) / l;
                breakBuild = true;
              }
              accumLength += l;
            }
            if (isEllipse && ctx.ellipse) {
              ctx.ellipse(cx, cy, rx, ry, psi, startAngle, endAngle, anticlockwise);
            } else {
              ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);
            }
            if (breakBuild) {
              break lo;
            }
            if (isFirst) {
              x0 = mathCos2(startAngle) * rx + cx;
              y0 = mathSin2(startAngle) * ry + cy;
            }
            xi = mathCos2(endAngle) * rx + cx;
            yi = mathSin2(endAngle) * ry + cy;
            break;
          case CMD.R:
            x0 = xi = d[i];
            y0 = yi = d[i + 1];
            x = d[i++];
            y = d[i++];
            var width = d[i++];
            var height = d[i++];
            if (drawPart) {
              var l = pathSegLen[segCount++];
              if (accumLength + l > displayedLength) {
                var d_1 = displayedLength - accumLength;
                ctx.moveTo(x, y);
                ctx.lineTo(x + mathMin3(d_1, width), y);
                d_1 -= width;
                if (d_1 > 0) {
                  ctx.lineTo(x + width, y + mathMin3(d_1, height));
                }
                d_1 -= height;
                if (d_1 > 0) {
                  ctx.lineTo(x + mathMax3(width - d_1, 0), y + height);
                }
                d_1 -= width;
                if (d_1 > 0) {
                  ctx.lineTo(x, y + mathMax3(height - d_1, 0));
                }
                break lo;
              }
              accumLength += l;
            }
            ctx.rect(x, y, width, height);
            break;
          case CMD.Z:
            if (drawPart) {
              var l = pathSegLen[segCount++];
              if (accumLength + l > displayedLength) {
                var t = (displayedLength - accumLength) / l;
                ctx.lineTo(xi * (1 - t) + x0 * t, yi * (1 - t) + y0 * t);
                break lo;
              }
              accumLength += l;
            }
            ctx.closePath();
            xi = x0;
            yi = y0;
        }
      }
  };
  PathProxy2.prototype.clone = function() {
    var newProxy = new PathProxy2();
    var data = this.data;
    newProxy.data = data.slice ? data.slice() : Array.prototype.slice.call(data);
    newProxy._len = this._len;
    return newProxy;
  };
  PathProxy2.CMD = CMD;
  PathProxy2.initDefaultProps = function() {
    var proto = PathProxy2.prototype;
    proto._saveData = true;
    proto._ux = 0;
    proto._uy = 0;
    proto._pendingPtDist = 0;
    proto._version = 0;
  }();
  return PathProxy2;
}();
var PathProxy_default = PathProxy;

// node_modules/zrender/lib/contain/line.js
function containStroke(x0, y0, x1, y1, lineWidth, x, y) {
  if (lineWidth === 0) {
    return false;
  }
  var _l = lineWidth;
  var _a2 = 0;
  var _b2 = x0;
  if (y > y0 + _l && y > y1 + _l || y < y0 - _l && y < y1 - _l || x > x0 + _l && x > x1 + _l || x < x0 - _l && x < x1 - _l) {
    return false;
  }
  if (x0 !== x1) {
    _a2 = (y0 - y1) / (x0 - x1);
    _b2 = (x0 * y1 - x1 * y0) / (x0 - x1);
  } else {
    return Math.abs(x - x0) <= _l / 2;
  }
  var tmp = _a2 * x - y + _b2;
  var _s = tmp * tmp / (_a2 * _a2 + 1);
  return _s <= _l / 2 * _l / 2;
}

// node_modules/zrender/lib/contain/cubic.js
function containStroke2(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
  if (lineWidth === 0) {
    return false;
  }
  var _l = lineWidth;
  if (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l || y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l || x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l || x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l) {
    return false;
  }
  var d = cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, null);
  return d <= _l / 2;
}

// node_modules/zrender/lib/contain/quadratic.js
function containStroke3(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
  if (lineWidth === 0) {
    return false;
  }
  var _l = lineWidth;
  if (y > y0 + _l && y > y1 + _l && y > y2 + _l || y < y0 - _l && y < y1 - _l && y < y2 - _l || x > x0 + _l && x > x1 + _l && x > x2 + _l || x < x0 - _l && x < x1 - _l && x < x2 - _l) {
    return false;
  }
  var d = quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, null);
  return d <= _l / 2;
}

// node_modules/zrender/lib/contain/util.js
var PI23 = Math.PI * 2;
function normalizeRadian(angle) {
  angle %= PI23;
  if (angle < 0) {
    angle += PI23;
  }
  return angle;
}

// node_modules/zrender/lib/contain/arc.js
var PI24 = Math.PI * 2;
function containStroke4(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
  if (lineWidth === 0) {
    return false;
  }
  var _l = lineWidth;
  x -= cx;
  y -= cy;
  var d = Math.sqrt(x * x + y * y);
  if (d - _l > r || d + _l < r) {
    return false;
  }
  if (Math.abs(startAngle - endAngle) % PI24 < 1e-4) {
    return true;
  }
  if (anticlockwise) {
    var tmp = startAngle;
    startAngle = normalizeRadian(endAngle);
    endAngle = normalizeRadian(tmp);
  } else {
    startAngle = normalizeRadian(startAngle);
    endAngle = normalizeRadian(endAngle);
  }
  if (startAngle > endAngle) {
    endAngle += PI24;
  }
  var angle = Math.atan2(y, x);
  if (angle < 0) {
    angle += PI24;
  }
  return angle >= startAngle && angle <= endAngle || angle + PI24 >= startAngle && angle + PI24 <= endAngle;
}

// node_modules/zrender/lib/contain/windingLine.js
function windingLine(x0, y0, x1, y1, x, y) {
  if (y > y0 && y > y1 || y < y0 && y < y1) {
    return 0;
  }
  if (y1 === y0) {
    return 0;
  }
  var t = (y - y0) / (y1 - y0);
  var dir = y1 < y0 ? 1 : -1;
  if (t === 1 || t === 0) {
    dir = y1 < y0 ? 0.5 : -0.5;
  }
  var x_ = t * (x1 - x0) + x0;
  return x_ === x ? Infinity : x_ > x ? dir : 0;
}

// node_modules/zrender/lib/contain/path.js
var CMD2 = PathProxy_default.CMD;
var PI25 = Math.PI * 2;
var EPSILON4 = 1e-4;
function isAroundEqual(a, b) {
  return Math.abs(a - b) < EPSILON4;
}
var roots = [-1, -1, -1];
var extrema = [-1, -1];
function swapExtrema() {
  var tmp = extrema[0];
  extrema[0] = extrema[1];
  extrema[1] = tmp;
}
function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
  if (y > y0 && y > y1 && y > y2 && y > y3 || y < y0 && y < y1 && y < y2 && y < y3) {
    return 0;
  }
  var nRoots = cubicRootAt(y0, y1, y2, y3, y, roots);
  if (nRoots === 0) {
    return 0;
  } else {
    var w = 0;
    var nExtrema = -1;
    var y0_ = void 0;
    var y1_ = void 0;
    for (var i = 0; i < nRoots; i++) {
      var t = roots[i];
      var unit = t === 0 || t === 1 ? 0.5 : 1;
      var x_ = cubicAt(x0, x1, x2, x3, t);
      if (x_ < x) {
        continue;
      }
      if (nExtrema < 0) {
        nExtrema = cubicExtrema(y0, y1, y2, y3, extrema);
        if (extrema[1] < extrema[0] && nExtrema > 1) {
          swapExtrema();
        }
        y0_ = cubicAt(y0, y1, y2, y3, extrema[0]);
        if (nExtrema > 1) {
          y1_ = cubicAt(y0, y1, y2, y3, extrema[1]);
        }
      }
      if (nExtrema === 2) {
        if (t < extrema[0]) {
          w += y0_ < y0 ? unit : -unit;
        } else if (t < extrema[1]) {
          w += y1_ < y0_ ? unit : -unit;
        } else {
          w += y3 < y1_ ? unit : -unit;
        }
      } else {
        if (t < extrema[0]) {
          w += y0_ < y0 ? unit : -unit;
        } else {
          w += y3 < y0_ ? unit : -unit;
        }
      }
    }
    return w;
  }
}
function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
  if (y > y0 && y > y1 && y > y2 || y < y0 && y < y1 && y < y2) {
    return 0;
  }
  var nRoots = quadraticRootAt(y0, y1, y2, y, roots);
  if (nRoots === 0) {
    return 0;
  } else {
    var t = quadraticExtremum(y0, y1, y2);
    if (t >= 0 && t <= 1) {
      var w = 0;
      var y_ = quadraticAt(y0, y1, y2, t);
      for (var i = 0; i < nRoots; i++) {
        var unit = roots[i] === 0 || roots[i] === 1 ? 0.5 : 1;
        var x_ = quadraticAt(x0, x1, x2, roots[i]);
        if (x_ < x) {
          continue;
        }
        if (roots[i] < t) {
          w += y_ < y0 ? unit : -unit;
        } else {
          w += y2 < y_ ? unit : -unit;
        }
      }
      return w;
    } else {
      var unit = roots[0] === 0 || roots[0] === 1 ? 0.5 : 1;
      var x_ = quadraticAt(x0, x1, x2, roots[0]);
      if (x_ < x) {
        return 0;
      }
      return y2 < y0 ? unit : -unit;
    }
  }
}
function windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
  y -= cy;
  if (y > r || y < -r) {
    return 0;
  }
  var tmp = Math.sqrt(r * r - y * y);
  roots[0] = -tmp;
  roots[1] = tmp;
  var dTheta = Math.abs(startAngle - endAngle);
  if (dTheta < 1e-4) {
    return 0;
  }
  if (dTheta >= PI25 - 1e-4) {
    startAngle = 0;
    endAngle = PI25;
    var dir = anticlockwise ? 1 : -1;
    if (x >= roots[0] + cx && x <= roots[1] + cx) {
      return dir;
    } else {
      return 0;
    }
  }
  if (startAngle > endAngle) {
    var tmp_1 = startAngle;
    startAngle = endAngle;
    endAngle = tmp_1;
  }
  if (startAngle < 0) {
    startAngle += PI25;
    endAngle += PI25;
  }
  var w = 0;
  for (var i = 0; i < 2; i++) {
    var x_ = roots[i];
    if (x_ + cx > x) {
      var angle = Math.atan2(y, x_);
      var dir = anticlockwise ? 1 : -1;
      if (angle < 0) {
        angle = PI25 + angle;
      }
      if (angle >= startAngle && angle <= endAngle || angle + PI25 >= startAngle && angle + PI25 <= endAngle) {
        if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
          dir = -dir;
        }
        w += dir;
      }
    }
  }
  return w;
}
function containPath(path3, lineWidth, isStroke, x, y) {
  var data = path3.data;
  var len2 = path3.len();
  var w = 0;
  var xi = 0;
  var yi = 0;
  var x0 = 0;
  var y0 = 0;
  var x1;
  var y1;
  for (var i = 0; i < len2; ) {
    var cmd = data[i++];
    var isFirst = i === 1;
    if (cmd === CMD2.M && i > 1) {
      if (!isStroke) {
        w += windingLine(xi, yi, x0, y0, x, y);
      }
    }
    if (isFirst) {
      xi = data[i];
      yi = data[i + 1];
      x0 = xi;
      y0 = yi;
    }
    switch (cmd) {
      case CMD2.M:
        x0 = data[i++];
        y0 = data[i++];
        xi = x0;
        yi = y0;
        break;
      case CMD2.L:
        if (isStroke) {
          if (containStroke(xi, yi, data[i], data[i + 1], lineWidth, x, y)) {
            return true;
          }
        } else {
          w += windingLine(xi, yi, data[i], data[i + 1], x, y) || 0;
        }
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD2.C:
        if (isStroke) {
          if (containStroke2(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y)) {
            return true;
          }
        } else {
          w += windingCubic(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
        }
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD2.Q:
        if (isStroke) {
          if (containStroke3(xi, yi, data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y)) {
            return true;
          }
        } else {
          w += windingQuadratic(xi, yi, data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
        }
        xi = data[i++];
        yi = data[i++];
        break;
      case CMD2.A:
        var cx = data[i++];
        var cy = data[i++];
        var rx = data[i++];
        var ry = data[i++];
        var theta = data[i++];
        var dTheta = data[i++];
        i += 1;
        var anticlockwise = !!(1 - data[i++]);
        x1 = Math.cos(theta) * rx + cx;
        y1 = Math.sin(theta) * ry + cy;
        if (!isFirst) {
          w += windingLine(xi, yi, x1, y1, x, y);
        } else {
          x0 = x1;
          y0 = y1;
        }
        var _x = (x - cx) * ry / rx + cx;
        if (isStroke) {
          if (containStroke4(cx, cy, ry, theta, theta + dTheta, anticlockwise, lineWidth, _x, y)) {
            return true;
          }
        } else {
          w += windingArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y);
        }
        xi = Math.cos(theta + dTheta) * rx + cx;
        yi = Math.sin(theta + dTheta) * ry + cy;
        break;
      case CMD2.R:
        x0 = xi = data[i++];
        y0 = yi = data[i++];
        var width = data[i++];
        var height = data[i++];
        x1 = x0 + width;
        y1 = y0 + height;
        if (isStroke) {
          if (containStroke(x0, y0, x1, y0, lineWidth, x, y) || containStroke(x1, y0, x1, y1, lineWidth, x, y) || containStroke(x1, y1, x0, y1, lineWidth, x, y) || containStroke(x0, y1, x0, y0, lineWidth, x, y)) {
            return true;
          }
        } else {
          w += windingLine(x1, y0, x1, y1, x, y);
          w += windingLine(x0, y1, x0, y0, x, y);
        }
        break;
      case CMD2.Z:
        if (isStroke) {
          if (containStroke(xi, yi, x0, y0, lineWidth, x, y)) {
            return true;
          }
        } else {
          w += windingLine(xi, yi, x0, y0, x, y);
        }
        xi = x0;
        yi = y0;
        break;
    }
  }
  if (!isStroke && !isAroundEqual(yi, y0)) {
    w += windingLine(xi, yi, x0, y0, x, y) || 0;
  }
  return w !== 0;
}
function contain(pathProxy, x, y) {
  return containPath(pathProxy, 0, false, x, y);
}
function containStroke5(pathProxy, lineWidth, x, y) {
  return containPath(pathProxy, lineWidth, true, x, y);
}

// node_modules/zrender/lib/graphic/Path.js
var DEFAULT_PATH_STYLE = defaults({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: false,
  strokeFirst: false
}, DEFAULT_COMMON_STYLE);
var DEFAULT_PATH_ANIMATION_PROPS = {
  style: defaults({
    fill: true,
    stroke: true,
    strokePercent: true,
    fillOpacity: true,
    strokeOpacity: true,
    lineDashOffset: true,
    lineWidth: true,
    miterLimit: true
  }, DEFAULT_COMMON_ANIMATION_PROPS.style)
};
var pathCopyParams = TRANSFORMABLE_PROPS.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]);
var Path = function(_super) {
  __extends(Path2, _super);
  function Path2(opts) {
    return _super.call(this, opts) || this;
  }
  Path2.prototype.update = function() {
    var _this = this;
    _super.prototype.update.call(this);
    var style = this.style;
    if (style.decal) {
      var decalEl = this._decalEl = this._decalEl || new Path2();
      if (decalEl.buildPath === Path2.prototype.buildPath) {
        decalEl.buildPath = function(ctx) {
          _this.buildPath(ctx, _this.shape);
        };
      }
      decalEl.silent = true;
      var decalElStyle = decalEl.style;
      for (var key in style) {
        if (decalElStyle[key] !== style[key]) {
          decalElStyle[key] = style[key];
        }
      }
      decalElStyle.fill = style.fill ? style.decal : null;
      decalElStyle.decal = null;
      decalElStyle.shadowColor = null;
      style.strokeFirst && (decalElStyle.stroke = null);
      for (var i = 0; i < pathCopyParams.length; ++i) {
        decalEl[pathCopyParams[i]] = this[pathCopyParams[i]];
      }
      decalEl.__dirty |= REDRAW_BIT;
    } else if (this._decalEl) {
      this._decalEl = null;
    }
  };
  Path2.prototype.getDecalElement = function() {
    return this._decalEl;
  };
  Path2.prototype._init = function(props) {
    var keysArr = keys(props);
    this.shape = this.getDefaultShape();
    var defaultStyle = this.getDefaultStyle();
    if (defaultStyle) {
      this.useStyle(defaultStyle);
    }
    for (var i = 0; i < keysArr.length; i++) {
      var key = keysArr[i];
      var value = props[key];
      if (key === "style") {
        if (!this.style) {
          this.useStyle(value);
        } else {
          extend(this.style, value);
        }
      } else if (key === "shape") {
        extend(this.shape, value);
      } else {
        _super.prototype.attrKV.call(this, key, value);
      }
    }
    if (!this.style) {
      this.useStyle({});
    }
  };
  Path2.prototype.getDefaultStyle = function() {
    return null;
  };
  Path2.prototype.getDefaultShape = function() {
    return {};
  };
  Path2.prototype.canBeInsideText = function() {
    return this.hasFill();
  };
  Path2.prototype.getInsideTextFill = function() {
    var pathFill = this.style.fill;
    if (pathFill !== "none") {
      if (isString(pathFill)) {
        var fillLum = lum(pathFill, 0);
        if (fillLum > 0.5) {
          return DARK_LABEL_COLOR;
        } else if (fillLum > 0.2) {
          return LIGHTER_LABEL_COLOR;
        }
        return LIGHT_LABEL_COLOR;
      } else if (pathFill) {
        return LIGHT_LABEL_COLOR;
      }
    }
    return DARK_LABEL_COLOR;
  };
  Path2.prototype.getInsideTextStroke = function(textFill) {
    var pathFill = this.style.fill;
    if (isString(pathFill)) {
      var zr = this.__zr;
      var isDarkMode2 = !!(zr && zr.isDarkMode());
      var isDarkLabel = lum(textFill, 0) < DARK_MODE_THRESHOLD;
      if (isDarkMode2 === isDarkLabel) {
        return pathFill;
      }
    }
  };
  Path2.prototype.buildPath = function(ctx, shapeCfg, inBatch) {
  };
  Path2.prototype.pathUpdated = function() {
    this.__dirty &= ~SHAPE_CHANGED_BIT;
  };
  Path2.prototype.getUpdatedPathProxy = function(inBatch) {
    !this.path && this.createPathProxy();
    this.path.beginPath();
    this.buildPath(this.path, this.shape, inBatch);
    return this.path;
  };
  Path2.prototype.createPathProxy = function() {
    this.path = new PathProxy_default(false);
  };
  Path2.prototype.hasStroke = function() {
    var style = this.style;
    var stroke = style.stroke;
    return !(stroke == null || stroke === "none" || !(style.lineWidth > 0));
  };
  Path2.prototype.hasFill = function() {
    var style = this.style;
    var fill = style.fill;
    return fill != null && fill !== "none";
  };
  Path2.prototype.getBoundingRect = function() {
    var rect = this._rect;
    var style = this.style;
    var needsUpdateRect = !rect;
    if (needsUpdateRect) {
      var firstInvoke = false;
      if (!this.path) {
        firstInvoke = true;
        this.createPathProxy();
      }
      var path3 = this.path;
      if (firstInvoke || this.__dirty & SHAPE_CHANGED_BIT) {
        path3.beginPath();
        this.buildPath(path3, this.shape, false);
        this.pathUpdated();
      }
      rect = path3.getBoundingRect();
    }
    this._rect = rect;
    if (this.hasStroke() && this.path && this.path.len() > 0) {
      var rectStroke = this._rectStroke || (this._rectStroke = rect.clone());
      if (this.__dirty || needsUpdateRect) {
        rectStroke.copy(rect);
        var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
        var w = style.lineWidth;
        if (!this.hasFill()) {
          var strokeContainThreshold = this.strokeContainThreshold;
          w = Math.max(w, strokeContainThreshold == null ? 4 : strokeContainThreshold);
        }
        if (lineScale > 1e-10) {
          rectStroke.width += w / lineScale;
          rectStroke.height += w / lineScale;
          rectStroke.x -= w / lineScale / 2;
          rectStroke.y -= w / lineScale / 2;
        }
      }
      return rectStroke;
    }
    return rect;
  };
  Path2.prototype.contain = function(x, y) {
    var localPos = this.transformCoordToLocal(x, y);
    var rect = this.getBoundingRect();
    var style = this.style;
    x = localPos[0];
    y = localPos[1];
    if (rect.contain(x, y)) {
      var pathProxy = this.path;
      if (this.hasStroke()) {
        var lineWidth = style.lineWidth;
        var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
        if (lineScale > 1e-10) {
          if (!this.hasFill()) {
            lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
          }
          if (containStroke5(pathProxy, lineWidth / lineScale, x, y)) {
            return true;
          }
        }
      }
      if (this.hasFill()) {
        return contain(pathProxy, x, y);
      }
    }
    return false;
  };
  Path2.prototype.dirtyShape = function() {
    this.__dirty |= SHAPE_CHANGED_BIT;
    if (this._rect) {
      this._rect = null;
    }
    if (this._decalEl) {
      this._decalEl.dirtyShape();
    }
    this.markRedraw();
  };
  Path2.prototype.dirty = function() {
    this.dirtyStyle();
    this.dirtyShape();
  };
  Path2.prototype.animateShape = function(loop) {
    return this.animate("shape", loop);
  };
  Path2.prototype.updateDuringAnimation = function(targetKey) {
    if (targetKey === "style") {
      this.dirtyStyle();
    } else if (targetKey === "shape") {
      this.dirtyShape();
    } else {
      this.markRedraw();
    }
  };
  Path2.prototype.attrKV = function(key, value) {
    if (key === "shape") {
      this.setShape(value);
    } else {
      _super.prototype.attrKV.call(this, key, value);
    }
  };
  Path2.prototype.setShape = function(keyOrObj, value) {
    var shape = this.shape;
    if (!shape) {
      shape = this.shape = {};
    }
    if (typeof keyOrObj === "string") {
      shape[keyOrObj] = value;
    } else {
      extend(shape, keyOrObj);
    }
    this.dirtyShape();
    return this;
  };
  Path2.prototype.shapeChanged = function() {
    return !!(this.__dirty & SHAPE_CHANGED_BIT);
  };
  Path2.prototype.createStyle = function(obj) {
    return createObject(DEFAULT_PATH_STYLE, obj);
  };
  Path2.prototype._innerSaveToNormal = function(toState) {
    _super.prototype._innerSaveToNormal.call(this, toState);
    var normalState = this._normalState;
    if (toState.shape && !normalState.shape) {
      normalState.shape = extend({}, this.shape);
    }
  };
  Path2.prototype._applyStateObj = function(stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
    _super.prototype._applyStateObj.call(this, stateName, state, normalState, keepCurrentStates, transition, animationCfg);
    var needsRestoreToNormal = !(state && keepCurrentStates);
    var targetShape;
    if (state && state.shape) {
      if (transition) {
        if (keepCurrentStates) {
          targetShape = state.shape;
        } else {
          targetShape = extend({}, normalState.shape);
          extend(targetShape, state.shape);
        }
      } else {
        targetShape = extend({}, keepCurrentStates ? this.shape : normalState.shape);
        extend(targetShape, state.shape);
      }
    } else if (needsRestoreToNormal) {
      targetShape = normalState.shape;
    }
    if (targetShape) {
      if (transition) {
        this.shape = extend({}, this.shape);
        var targetShapePrimaryProps = {};
        var shapeKeys = keys(targetShape);
        for (var i = 0; i < shapeKeys.length; i++) {
          var key = shapeKeys[i];
          if (typeof targetShape[key] === "object") {
            this.shape[key] = targetShape[key];
          } else {
            targetShapePrimaryProps[key] = targetShape[key];
          }
        }
        this._transitionState(stateName, {
          shape: targetShapePrimaryProps
        }, animationCfg);
      } else {
        this.shape = targetShape;
        this.dirtyShape();
      }
    }
  };
  Path2.prototype._mergeStates = function(states) {
    var mergedState = _super.prototype._mergeStates.call(this, states);
    var mergedShape;
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      if (state.shape) {
        mergedShape = mergedShape || {};
        this._mergeStyle(mergedShape, state.shape);
      }
    }
    if (mergedShape) {
      mergedState.shape = mergedShape;
    }
    return mergedState;
  };
  Path2.prototype.getAnimationStyleProps = function() {
    return DEFAULT_PATH_ANIMATION_PROPS;
  };
  Path2.prototype.isZeroArea = function() {
    return false;
  };
  Path2.extend = function(defaultProps) {
    var Sub = function(_super2) {
      __extends(Sub2, _super2);
      function Sub2(opts) {
        var _this = _super2.call(this, opts) || this;
        defaultProps.init && defaultProps.init.call(_this, opts);
        return _this;
      }
      Sub2.prototype.getDefaultStyle = function() {
        return clone(defaultProps.style);
      };
      Sub2.prototype.getDefaultShape = function() {
        return clone(defaultProps.shape);
      };
      return Sub2;
    }(Path2);
    for (var key in defaultProps) {
      if (typeof defaultProps[key] === "function") {
        Sub.prototype[key] = defaultProps[key];
      }
    }
    return Sub;
  };
  Path2.initDefaultProps = function() {
    var pathProto = Path2.prototype;
    pathProto.type = "path";
    pathProto.strokeContainThreshold = 5;
    pathProto.segmentIgnoreThreshold = 0;
    pathProto.subPixelOptimize = false;
    pathProto.autoBatch = false;
    pathProto.__dirty = REDRAW_BIT | STYLE_CHANGED_BIT | SHAPE_CHANGED_BIT;
  }();
  return Path2;
}(Displayable_default);
var Path_default = Path;

// node_modules/zrender/lib/graphic/TSpan.js
var DEFAULT_TSPAN_STYLE = defaults({
  strokeFirst: true,
  font: DEFAULT_FONT,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, DEFAULT_PATH_STYLE);
var TSpan = function(_super) {
  __extends(TSpan2, _super);
  function TSpan2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TSpan2.prototype.hasStroke = function() {
    var style = this.style;
    var stroke = style.stroke;
    return stroke != null && stroke !== "none" && style.lineWidth > 0;
  };
  TSpan2.prototype.hasFill = function() {
    var style = this.style;
    var fill = style.fill;
    return fill != null && fill !== "none";
  };
  TSpan2.prototype.createStyle = function(obj) {
    return createObject(DEFAULT_TSPAN_STYLE, obj);
  };
  TSpan2.prototype.setBoundingRect = function(rect) {
    this._rect = rect;
  };
  TSpan2.prototype.getBoundingRect = function() {
    var style = this.style;
    if (!this._rect) {
      var text = style.text;
      text != null ? text += "" : text = "";
      var rect = getBoundingRect(text, style.font, style.textAlign, style.textBaseline);
      rect.x += style.x || 0;
      rect.y += style.y || 0;
      if (this.hasStroke()) {
        var w = style.lineWidth;
        rect.x -= w / 2;
        rect.y -= w / 2;
        rect.width += w;
        rect.height += w;
      }
      this._rect = rect;
    }
    return this._rect;
  };
  TSpan2.initDefaultProps = function() {
    var tspanProto = TSpan2.prototype;
    tspanProto.dirtyRectTolerance = 10;
  }();
  return TSpan2;
}(Displayable_default);
TSpan.prototype.type = "tspan";
var TSpan_default = TSpan;

// node_modules/zrender/lib/graphic/Image.js
var DEFAULT_IMAGE_STYLE = defaults({
  x: 0,
  y: 0
}, DEFAULT_COMMON_STYLE);
var DEFAULT_IMAGE_ANIMATION_PROPS = {
  style: defaults({
    x: true,
    y: true,
    width: true,
    height: true,
    sx: true,
    sy: true,
    sWidth: true,
    sHeight: true
  }, DEFAULT_COMMON_ANIMATION_PROPS.style)
};
function isImageLike(source) {
  return !!(source && typeof source !== "string" && source.width && source.height);
}
var ZRImage = function(_super) {
  __extends(ZRImage2, _super);
  function ZRImage2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ZRImage2.prototype.createStyle = function(obj) {
    return createObject(DEFAULT_IMAGE_STYLE, obj);
  };
  ZRImage2.prototype._getSize = function(dim) {
    var style = this.style;
    var size = style[dim];
    if (size != null) {
      return size;
    }
    var imageSource = isImageLike(style.image) ? style.image : this.__image;
    if (!imageSource) {
      return 0;
    }
    var otherDim = dim === "width" ? "height" : "width";
    var otherDimSize = style[otherDim];
    if (otherDimSize == null) {
      return imageSource[dim];
    } else {
      return imageSource[dim] / imageSource[otherDim] * otherDimSize;
    }
  };
  ZRImage2.prototype.getWidth = function() {
    return this._getSize("width");
  };
  ZRImage2.prototype.getHeight = function() {
    return this._getSize("height");
  };
  ZRImage2.prototype.getAnimationStyleProps = function() {
    return DEFAULT_IMAGE_ANIMATION_PROPS;
  };
  ZRImage2.prototype.getBoundingRect = function() {
    var style = this.style;
    if (!this._rect) {
      this._rect = new BoundingRect_default(style.x || 0, style.y || 0, this.getWidth(), this.getHeight());
    }
    return this._rect;
  };
  return ZRImage2;
}(Displayable_default);
ZRImage.prototype.type = "image";
var Image_default = ZRImage;

// node_modules/zrender/lib/graphic/helper/roundRect.js
function buildPath(ctx, shape) {
  var x = shape.x;
  var y = shape.y;
  var width = shape.width;
  var height = shape.height;
  var r = shape.r;
  var r1;
  var r2;
  var r3;
  var r4;
  if (width < 0) {
    x = x + width;
    width = -width;
  }
  if (height < 0) {
    y = y + height;
    height = -height;
  }
  if (typeof r === "number") {
    r1 = r2 = r3 = r4 = r;
  } else if (r instanceof Array) {
    if (r.length === 1) {
      r1 = r2 = r3 = r4 = r[0];
    } else if (r.length === 2) {
      r1 = r3 = r[0];
      r2 = r4 = r[1];
    } else if (r.length === 3) {
      r1 = r[0];
      r2 = r4 = r[1];
      r3 = r[2];
    } else {
      r1 = r[0];
      r2 = r[1];
      r3 = r[2];
      r4 = r[3];
    }
  } else {
    r1 = r2 = r3 = r4 = 0;
  }
  var total;
  if (r1 + r2 > width) {
    total = r1 + r2;
    r1 *= width / total;
    r2 *= width / total;
  }
  if (r3 + r4 > width) {
    total = r3 + r4;
    r3 *= width / total;
    r4 *= width / total;
  }
  if (r2 + r3 > height) {
    total = r2 + r3;
    r2 *= height / total;
    r3 *= height / total;
  }
  if (r1 + r4 > height) {
    total = r1 + r4;
    r1 *= height / total;
    r4 *= height / total;
  }
  ctx.moveTo(x + r1, y);
  ctx.lineTo(x + width - r2, y);
  r2 !== 0 && ctx.arc(x + width - r2, y + r2, r2, -Math.PI / 2, 0);
  ctx.lineTo(x + width, y + height - r3);
  r3 !== 0 && ctx.arc(x + width - r3, y + height - r3, r3, 0, Math.PI / 2);
  ctx.lineTo(x + r4, y + height);
  r4 !== 0 && ctx.arc(x + r4, y + height - r4, r4, Math.PI / 2, Math.PI);
  ctx.lineTo(x, y + r1);
  r1 !== 0 && ctx.arc(x + r1, y + r1, r1, Math.PI, Math.PI * 1.5);
}

// node_modules/zrender/lib/graphic/helper/subPixelOptimize.js
var round = Math.round;
function subPixelOptimizeLine(outputShape, inputShape, style) {
  if (!inputShape) {
    return;
  }
  var x1 = inputShape.x1;
  var x2 = inputShape.x2;
  var y1 = inputShape.y1;
  var y2 = inputShape.y2;
  outputShape.x1 = x1;
  outputShape.x2 = x2;
  outputShape.y1 = y1;
  outputShape.y2 = y2;
  var lineWidth = style && style.lineWidth;
  if (!lineWidth) {
    return outputShape;
  }
  if (round(x1 * 2) === round(x2 * 2)) {
    outputShape.x1 = outputShape.x2 = subPixelOptimize(x1, lineWidth, true);
  }
  if (round(y1 * 2) === round(y2 * 2)) {
    outputShape.y1 = outputShape.y2 = subPixelOptimize(y1, lineWidth, true);
  }
  return outputShape;
}
function subPixelOptimizeRect(outputShape, inputShape, style) {
  if (!inputShape) {
    return;
  }
  var originX = inputShape.x;
  var originY = inputShape.y;
  var originWidth = inputShape.width;
  var originHeight = inputShape.height;
  outputShape.x = originX;
  outputShape.y = originY;
  outputShape.width = originWidth;
  outputShape.height = originHeight;
  var lineWidth = style && style.lineWidth;
  if (!lineWidth) {
    return outputShape;
  }
  outputShape.x = subPixelOptimize(originX, lineWidth, true);
  outputShape.y = subPixelOptimize(originY, lineWidth, true);
  outputShape.width = Math.max(subPixelOptimize(originX + originWidth, lineWidth, false) - outputShape.x, originWidth === 0 ? 0 : 1);
  outputShape.height = Math.max(subPixelOptimize(originY + originHeight, lineWidth, false) - outputShape.y, originHeight === 0 ? 0 : 1);
  return outputShape;
}
function subPixelOptimize(position2, lineWidth, positiveOrNegative) {
  if (!lineWidth) {
    return position2;
  }
  var doubledPosition = round(position2 * 2);
  return (doubledPosition + round(lineWidth)) % 2 === 0 ? doubledPosition / 2 : (doubledPosition + (positiveOrNegative ? 1 : -1)) / 2;
}

// node_modules/zrender/lib/graphic/shape/Rect.js
var RectShape = /* @__PURE__ */ function() {
  function RectShape2() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }
  return RectShape2;
}();
var subPixelOptimizeOutputShape = {};
var Rect = function(_super) {
  __extends(Rect3, _super);
  function Rect3(opts) {
    return _super.call(this, opts) || this;
  }
  Rect3.prototype.getDefaultShape = function() {
    return new RectShape();
  };
  Rect3.prototype.buildPath = function(ctx, shape) {
    var x;
    var y;
    var width;
    var height;
    if (this.subPixelOptimize) {
      var optimizedShape = subPixelOptimizeRect(subPixelOptimizeOutputShape, shape, this.style);
      x = optimizedShape.x;
      y = optimizedShape.y;
      width = optimizedShape.width;
      height = optimizedShape.height;
      optimizedShape.r = shape.r;
      shape = optimizedShape;
    } else {
      x = shape.x;
      y = shape.y;
      width = shape.width;
      height = shape.height;
    }
    if (!shape.r) {
      ctx.rect(x, y, width, height);
    } else {
      buildPath(ctx, shape);
    }
  };
  Rect3.prototype.isZeroArea = function() {
    return !this.shape.width || !this.shape.height;
  };
  return Rect3;
}(Path_default);
Rect.prototype.type = "rect";
var Rect_default = Rect;

// node_modules/zrender/lib/graphic/Text.js
var DEFAULT_RICH_TEXT_COLOR = {
  fill: "#000"
};
var DEFAULT_STROKE_LINE_WIDTH = 2;
var DEFAULT_TEXT_ANIMATION_PROPS = {
  style: defaults({
    fill: true,
    stroke: true,
    fillOpacity: true,
    strokeOpacity: true,
    lineWidth: true,
    fontSize: true,
    lineHeight: true,
    width: true,
    height: true,
    textShadowColor: true,
    textShadowBlur: true,
    textShadowOffsetX: true,
    textShadowOffsetY: true,
    backgroundColor: true,
    padding: true,
    borderColor: true,
    borderWidth: true,
    borderRadius: true
  }, DEFAULT_COMMON_ANIMATION_PROPS.style)
};
var ZRText = function(_super) {
  __extends(ZRText2, _super);
  function ZRText2(opts) {
    var _this = _super.call(this) || this;
    _this.type = "text";
    _this._children = [];
    _this._defaultStyle = DEFAULT_RICH_TEXT_COLOR;
    _this.attr(opts);
    return _this;
  }
  ZRText2.prototype.childrenRef = function() {
    return this._children;
  };
  ZRText2.prototype.update = function() {
    _super.prototype.update.call(this);
    if (this.styleChanged()) {
      this._updateSubTexts();
    }
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      child.zlevel = this.zlevel;
      child.z = this.z;
      child.z2 = this.z2;
      child.culling = this.culling;
      child.cursor = this.cursor;
      child.invisible = this.invisible;
    }
  };
  ZRText2.prototype.updateTransform = function() {
    var innerTransformable = this.innerTransformable;
    if (innerTransformable) {
      innerTransformable.updateTransform();
      if (innerTransformable.transform) {
        this.transform = innerTransformable.transform;
      }
    } else {
      _super.prototype.updateTransform.call(this);
    }
  };
  ZRText2.prototype.getLocalTransform = function(m) {
    var innerTransformable = this.innerTransformable;
    return innerTransformable ? innerTransformable.getLocalTransform(m) : _super.prototype.getLocalTransform.call(this, m);
  };
  ZRText2.prototype.getComputedTransform = function() {
    if (this.__hostTarget) {
      this.__hostTarget.getComputedTransform();
      this.__hostTarget.updateInnerText(true);
    }
    return _super.prototype.getComputedTransform.call(this);
  };
  ZRText2.prototype._updateSubTexts = function() {
    this._childCursor = 0;
    normalizeTextStyle(this.style);
    this.style.rich ? this._updateRichTexts() : this._updatePlainTexts();
    this._children.length = this._childCursor;
    this.styleUpdated();
  };
  ZRText2.prototype.addSelfToZr = function(zr) {
    _super.prototype.addSelfToZr.call(this, zr);
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].__zr = zr;
    }
  };
  ZRText2.prototype.removeSelfFromZr = function(zr) {
    _super.prototype.removeSelfFromZr.call(this, zr);
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].__zr = null;
    }
  };
  ZRText2.prototype.getBoundingRect = function() {
    if (this.styleChanged()) {
      this._updateSubTexts();
    }
    if (!this._rect) {
      var tmpRect3 = new BoundingRect_default(0, 0, 0, 0);
      var children = this._children;
      var tmpMat = [];
      var rect = null;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var childRect = child.getBoundingRect();
        var transform = child.getLocalTransform(tmpMat);
        if (transform) {
          tmpRect3.copy(childRect);
          tmpRect3.applyTransform(transform);
          rect = rect || tmpRect3.clone();
          rect.union(tmpRect3);
        } else {
          rect = rect || childRect.clone();
          rect.union(childRect);
        }
      }
      this._rect = rect || tmpRect3;
    }
    return this._rect;
  };
  ZRText2.prototype.setDefaultTextStyle = function(defaultTextStyle) {
    this._defaultStyle = defaultTextStyle || DEFAULT_RICH_TEXT_COLOR;
  };
  ZRText2.prototype.setTextContent = function(textContent) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Can't attach text on another text");
    }
  };
  ZRText2.prototype._mergeStyle = function(targetStyle, sourceStyle) {
    if (!sourceStyle) {
      return targetStyle;
    }
    var sourceRich = sourceStyle.rich;
    var targetRich = targetStyle.rich || sourceRich && {};
    extend(targetStyle, sourceStyle);
    if (sourceRich && targetRich) {
      this._mergeRich(targetRich, sourceRich);
      targetStyle.rich = targetRich;
    } else if (targetRich) {
      targetStyle.rich = targetRich;
    }
    return targetStyle;
  };
  ZRText2.prototype._mergeRich = function(targetRich, sourceRich) {
    var richNames = keys(sourceRich);
    for (var i = 0; i < richNames.length; i++) {
      var richName = richNames[i];
      targetRich[richName] = targetRich[richName] || {};
      extend(targetRich[richName], sourceRich[richName]);
    }
  };
  ZRText2.prototype.getAnimationStyleProps = function() {
    return DEFAULT_TEXT_ANIMATION_PROPS;
  };
  ZRText2.prototype._getOrCreateChild = function(Ctor) {
    var child = this._children[this._childCursor];
    if (!child || !(child instanceof Ctor)) {
      child = new Ctor();
    }
    this._children[this._childCursor++] = child;
    child.__zr = this.__zr;
    child.parent = this;
    return child;
  };
  ZRText2.prototype._updatePlainTexts = function() {
    var style = this.style;
    var textFont = style.font || DEFAULT_FONT;
    var textPadding = style.padding;
    var text = getStyleText(style);
    var contentBlock = parsePlainText(text, style);
    var needDrawBg = needDrawBackground(style);
    var bgColorDrawn = !!style.backgroundColor;
    var outerHeight = contentBlock.outerHeight;
    var outerWidth = contentBlock.outerWidth;
    var contentWidth = contentBlock.contentWidth;
    var textLines = contentBlock.lines;
    var lineHeight = contentBlock.lineHeight;
    var defaultStyle = this._defaultStyle;
    var baseX = style.x || 0;
    var baseY = style.y || 0;
    var textAlign = style.align || defaultStyle.align || "left";
    var verticalAlign = style.verticalAlign || defaultStyle.verticalAlign || "top";
    var textX = baseX;
    var textY = adjustTextY(baseY, contentBlock.contentHeight, verticalAlign);
    if (needDrawBg || textPadding) {
      var boxX = adjustTextX(baseX, outerWidth, textAlign);
      var boxY = adjustTextY(baseY, outerHeight, verticalAlign);
      needDrawBg && this._renderBackground(style, style, boxX, boxY, outerWidth, outerHeight);
    }
    textY += lineHeight / 2;
    if (textPadding) {
      textX = getTextXForPadding(baseX, textAlign, textPadding);
      if (verticalAlign === "top") {
        textY += textPadding[0];
      } else if (verticalAlign === "bottom") {
        textY -= textPadding[2];
      }
    }
    var defaultLineWidth = 0;
    var useDefaultFill = false;
    var textFill = getFill("fill" in style ? style.fill : (useDefaultFill = true, defaultStyle.fill));
    var textStroke = getStroke("stroke" in style ? style.stroke : !bgColorDrawn && (!defaultStyle.autoStroke || useDefaultFill) ? (defaultLineWidth = DEFAULT_STROKE_LINE_WIDTH, defaultStyle.stroke) : null);
    var hasShadow2 = style.textShadowBlur > 0;
    var fixedBoundingRect = style.width != null && (style.overflow === "truncate" || style.overflow === "break" || style.overflow === "breakAll");
    var calculatedLineHeight = contentBlock.calculatedLineHeight;
    for (var i = 0; i < textLines.length; i++) {
      var el = this._getOrCreateChild(TSpan_default);
      var subElStyle = el.createStyle();
      el.useStyle(subElStyle);
      subElStyle.text = textLines[i];
      subElStyle.x = textX;
      subElStyle.y = textY;
      if (textAlign) {
        subElStyle.textAlign = textAlign;
      }
      subElStyle.textBaseline = "middle";
      subElStyle.opacity = style.opacity;
      subElStyle.strokeFirst = true;
      if (hasShadow2) {
        subElStyle.shadowBlur = style.textShadowBlur || 0;
        subElStyle.shadowColor = style.textShadowColor || "transparent";
        subElStyle.shadowOffsetX = style.textShadowOffsetX || 0;
        subElStyle.shadowOffsetY = style.textShadowOffsetY || 0;
      }
      subElStyle.stroke = textStroke;
      subElStyle.fill = textFill;
      if (textStroke) {
        subElStyle.lineWidth = style.lineWidth || defaultLineWidth;
        subElStyle.lineDash = style.lineDash;
        subElStyle.lineDashOffset = style.lineDashOffset || 0;
      }
      subElStyle.font = textFont;
      setSeparateFont(subElStyle, style);
      textY += lineHeight;
      if (fixedBoundingRect) {
        el.setBoundingRect(new BoundingRect_default(adjustTextX(subElStyle.x, style.width, subElStyle.textAlign), adjustTextY(subElStyle.y, calculatedLineHeight, subElStyle.textBaseline), contentWidth, calculatedLineHeight));
      }
    }
  };
  ZRText2.prototype._updateRichTexts = function() {
    var style = this.style;
    var text = getStyleText(style);
    var contentBlock = parseRichText(text, style);
    var contentWidth = contentBlock.width;
    var outerWidth = contentBlock.outerWidth;
    var outerHeight = contentBlock.outerHeight;
    var textPadding = style.padding;
    var baseX = style.x || 0;
    var baseY = style.y || 0;
    var defaultStyle = this._defaultStyle;
    var textAlign = style.align || defaultStyle.align;
    var verticalAlign = style.verticalAlign || defaultStyle.verticalAlign;
    var boxX = adjustTextX(baseX, outerWidth, textAlign);
    var boxY = adjustTextY(baseY, outerHeight, verticalAlign);
    var xLeft = boxX;
    var lineTop = boxY;
    if (textPadding) {
      xLeft += textPadding[3];
      lineTop += textPadding[0];
    }
    var xRight = xLeft + contentWidth;
    if (needDrawBackground(style)) {
      this._renderBackground(style, style, boxX, boxY, outerWidth, outerHeight);
    }
    var bgColorDrawn = !!style.backgroundColor;
    for (var i = 0; i < contentBlock.lines.length; i++) {
      var line = contentBlock.lines[i];
      var tokens = line.tokens;
      var tokenCount = tokens.length;
      var lineHeight = line.lineHeight;
      var remainedWidth = line.width;
      var leftIndex = 0;
      var lineXLeft = xLeft;
      var lineXRight = xRight;
      var rightIndex = tokenCount - 1;
      var token = void 0;
      while (leftIndex < tokenCount && (token = tokens[leftIndex], !token.align || token.align === "left")) {
        this._placeToken(token, style, lineHeight, lineTop, lineXLeft, "left", bgColorDrawn);
        remainedWidth -= token.width;
        lineXLeft += token.width;
        leftIndex++;
      }
      while (rightIndex >= 0 && (token = tokens[rightIndex], token.align === "right")) {
        this._placeToken(token, style, lineHeight, lineTop, lineXRight, "right", bgColorDrawn);
        remainedWidth -= token.width;
        lineXRight -= token.width;
        rightIndex--;
      }
      lineXLeft += (contentWidth - (lineXLeft - xLeft) - (xRight - lineXRight) - remainedWidth) / 2;
      while (leftIndex <= rightIndex) {
        token = tokens[leftIndex];
        this._placeToken(token, style, lineHeight, lineTop, lineXLeft + token.width / 2, "center", bgColorDrawn);
        lineXLeft += token.width;
        leftIndex++;
      }
      lineTop += lineHeight;
    }
  };
  ZRText2.prototype._placeToken = function(token, style, lineHeight, lineTop, x, textAlign, parentBgColorDrawn) {
    var tokenStyle = style.rich[token.styleName] || {};
    tokenStyle.text = token.text;
    var verticalAlign = token.verticalAlign;
    var y = lineTop + lineHeight / 2;
    if (verticalAlign === "top") {
      y = lineTop + token.height / 2;
    } else if (verticalAlign === "bottom") {
      y = lineTop + lineHeight - token.height / 2;
    }
    var needDrawBg = !token.isLineHolder && needDrawBackground(tokenStyle);
    needDrawBg && this._renderBackground(tokenStyle, style, textAlign === "right" ? x - token.width : textAlign === "center" ? x - token.width / 2 : x, y - token.height / 2, token.width, token.height);
    var bgColorDrawn = !!tokenStyle.backgroundColor;
    var textPadding = token.textPadding;
    if (textPadding) {
      x = getTextXForPadding(x, textAlign, textPadding);
      y -= token.height / 2 - textPadding[0] - token.innerHeight / 2;
    }
    var el = this._getOrCreateChild(TSpan_default);
    var subElStyle = el.createStyle();
    el.useStyle(subElStyle);
    var defaultStyle = this._defaultStyle;
    var useDefaultFill = false;
    var defaultLineWidth = 0;
    var textFill = getFill("fill" in tokenStyle ? tokenStyle.fill : "fill" in style ? style.fill : (useDefaultFill = true, defaultStyle.fill));
    var textStroke = getStroke("stroke" in tokenStyle ? tokenStyle.stroke : "stroke" in style ? style.stroke : !bgColorDrawn && !parentBgColorDrawn && (!defaultStyle.autoStroke || useDefaultFill) ? (defaultLineWidth = DEFAULT_STROKE_LINE_WIDTH, defaultStyle.stroke) : null);
    var hasShadow2 = tokenStyle.textShadowBlur > 0 || style.textShadowBlur > 0;
    subElStyle.text = token.text;
    subElStyle.x = x;
    subElStyle.y = y;
    if (hasShadow2) {
      subElStyle.shadowBlur = tokenStyle.textShadowBlur || style.textShadowBlur || 0;
      subElStyle.shadowColor = tokenStyle.textShadowColor || style.textShadowColor || "transparent";
      subElStyle.shadowOffsetX = tokenStyle.textShadowOffsetX || style.textShadowOffsetX || 0;
      subElStyle.shadowOffsetY = tokenStyle.textShadowOffsetY || style.textShadowOffsetY || 0;
    }
    subElStyle.textAlign = textAlign;
    subElStyle.textBaseline = "middle";
    subElStyle.font = token.font || DEFAULT_FONT;
    subElStyle.opacity = retrieve3(tokenStyle.opacity, style.opacity, 1);
    setSeparateFont(subElStyle, tokenStyle);
    if (textStroke) {
      subElStyle.lineWidth = retrieve3(tokenStyle.lineWidth, style.lineWidth, defaultLineWidth);
      subElStyle.lineDash = retrieve2(tokenStyle.lineDash, style.lineDash);
      subElStyle.lineDashOffset = style.lineDashOffset || 0;
      subElStyle.stroke = textStroke;
    }
    if (textFill) {
      subElStyle.fill = textFill;
    }
    var textWidth = token.contentWidth;
    var textHeight = token.contentHeight;
    el.setBoundingRect(new BoundingRect_default(adjustTextX(subElStyle.x, textWidth, subElStyle.textAlign), adjustTextY(subElStyle.y, textHeight, subElStyle.textBaseline), textWidth, textHeight));
  };
  ZRText2.prototype._renderBackground = function(style, topStyle, x, y, width, height) {
    var textBackgroundColor = style.backgroundColor;
    var textBorderWidth = style.borderWidth;
    var textBorderColor = style.borderColor;
    var isImageBg = textBackgroundColor && textBackgroundColor.image;
    var isPlainOrGradientBg = textBackgroundColor && !isImageBg;
    var textBorderRadius = style.borderRadius;
    var self2 = this;
    var rectEl;
    var imgEl;
    if (isPlainOrGradientBg || style.lineHeight || textBorderWidth && textBorderColor) {
      rectEl = this._getOrCreateChild(Rect_default);
      rectEl.useStyle(rectEl.createStyle());
      rectEl.style.fill = null;
      var rectShape = rectEl.shape;
      rectShape.x = x;
      rectShape.y = y;
      rectShape.width = width;
      rectShape.height = height;
      rectShape.r = textBorderRadius;
      rectEl.dirtyShape();
    }
    if (isPlainOrGradientBg) {
      var rectStyle = rectEl.style;
      rectStyle.fill = textBackgroundColor || null;
      rectStyle.fillOpacity = retrieve2(style.fillOpacity, 1);
    } else if (isImageBg) {
      imgEl = this._getOrCreateChild(Image_default);
      imgEl.onload = function() {
        self2.dirtyStyle();
      };
      var imgStyle = imgEl.style;
      imgStyle.image = textBackgroundColor.image;
      imgStyle.x = x;
      imgStyle.y = y;
      imgStyle.width = width;
      imgStyle.height = height;
    }
    if (textBorderWidth && textBorderColor) {
      var rectStyle = rectEl.style;
      rectStyle.lineWidth = textBorderWidth;
      rectStyle.stroke = textBorderColor;
      rectStyle.strokeOpacity = retrieve2(style.strokeOpacity, 1);
      rectStyle.lineDash = style.borderDash;
      rectStyle.lineDashOffset = style.borderDashOffset || 0;
      rectEl.strokeContainThreshold = 0;
      if (rectEl.hasFill() && rectEl.hasStroke()) {
        rectStyle.strokeFirst = true;
        rectStyle.lineWidth *= 2;
      }
    }
    var commonStyle = (rectEl || imgEl).style;
    commonStyle.shadowBlur = style.shadowBlur || 0;
    commonStyle.shadowColor = style.shadowColor || "transparent";
    commonStyle.shadowOffsetX = style.shadowOffsetX || 0;
    commonStyle.shadowOffsetY = style.shadowOffsetY || 0;
    commonStyle.opacity = retrieve3(style.opacity, topStyle.opacity, 1);
  };
  ZRText2.makeFont = function(style) {
    var font = "";
    if (hasSeparateFont(style)) {
      font = [
        style.fontStyle,
        style.fontWeight,
        parseFontSize(style.fontSize),
        style.fontFamily || "sans-serif"
      ].join(" ");
    }
    return font && trim(font) || style.textFont || style.font;
  };
  return ZRText2;
}(Displayable_default);
var VALID_TEXT_ALIGN = { left: true, right: 1, center: 1 };
var VALID_TEXT_VERTICAL_ALIGN = { top: 1, bottom: 1, middle: 1 };
var FONT_PARTS = ["fontStyle", "fontWeight", "fontSize", "fontFamily"];
function parseFontSize(fontSize) {
  if (typeof fontSize === "string" && (fontSize.indexOf("px") !== -1 || fontSize.indexOf("rem") !== -1 || fontSize.indexOf("em") !== -1)) {
    return fontSize;
  } else if (!isNaN(+fontSize)) {
    return fontSize + "px";
  } else {
    return DEFAULT_FONT_SIZE + "px";
  }
}
function setSeparateFont(targetStyle, sourceStyle) {
  for (var i = 0; i < FONT_PARTS.length; i++) {
    var fontProp = FONT_PARTS[i];
    var val = sourceStyle[fontProp];
    if (val != null) {
      targetStyle[fontProp] = val;
    }
  }
}
function hasSeparateFont(style) {
  return style.fontSize != null || style.fontFamily || style.fontWeight;
}
function normalizeTextStyle(style) {
  normalizeStyle(style);
  each(style.rich, normalizeStyle);
  return style;
}
function normalizeStyle(style) {
  if (style) {
    style.font = ZRText.makeFont(style);
    var textAlign = style.align;
    textAlign === "middle" && (textAlign = "center");
    style.align = textAlign == null || VALID_TEXT_ALIGN[textAlign] ? textAlign : "left";
    var verticalAlign = style.verticalAlign;
    verticalAlign === "center" && (verticalAlign = "middle");
    style.verticalAlign = verticalAlign == null || VALID_TEXT_VERTICAL_ALIGN[verticalAlign] ? verticalAlign : "top";
    var textPadding = style.padding;
    if (textPadding) {
      style.padding = normalizeCssArray(style.padding);
    }
  }
}
function getStroke(stroke, lineWidth) {
  return stroke == null || lineWidth <= 0 || stroke === "transparent" || stroke === "none" ? null : stroke.image || stroke.colorStops ? "#000" : stroke;
}
function getFill(fill) {
  return fill == null || fill === "none" ? null : fill.image || fill.colorStops ? "#000" : fill;
}
function getTextXForPadding(x, textAlign, textPadding) {
  return textAlign === "right" ? x - textPadding[1] : textAlign === "center" ? x + textPadding[3] / 2 - textPadding[1] / 2 : x + textPadding[3];
}
function getStyleText(style) {
  var text = style.text;
  text != null && (text += "");
  return text;
}
function needDrawBackground(style) {
  return !!(style.backgroundColor || style.lineHeight || style.borderWidth && style.borderColor);
}
var Text_default = ZRText;

// node_modules/echarts/lib/util/number.js
var ROUND_SUPPORTED_PRECISION_MAX = 20;
function _trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}
function linearMap(val, domain, range, clamp) {
  var d0 = domain[0];
  var d1 = domain[1];
  var r0 = range[0];
  var r1 = range[1];
  var subDomain = d1 - d0;
  var subRange = r1 - r0;
  if (subDomain === 0) {
    return subRange === 0 ? r0 : (r0 + r1) / 2;
  }
  if (clamp) {
    if (subDomain > 0) {
      if (val <= d0) {
        return r0;
      } else if (val >= d1) {
        return r1;
      }
    } else {
      if (val >= d0) {
        return r0;
      } else if (val <= d1) {
        return r1;
      }
    }
  } else {
    if (val === d0) {
      return r0;
    }
    if (val === d1) {
      return r1;
    }
  }
  return (val - d0) / subDomain * subRange + r0;
}
function parsePercent2(percent, all) {
  switch (percent) {
    case "center":
    case "middle":
      percent = "50%";
      break;
    case "left":
    case "top":
      percent = "0%";
      break;
    case "right":
    case "bottom":
      percent = "100%";
      break;
  }
  if (isString(percent)) {
    if (_trim(percent).match(/%$/)) {
      return parseFloat(percent) / 100 * all;
    }
    return parseFloat(percent);
  }
  return percent == null ? NaN : +percent;
}
function round2(x, precision, returnStr) {
  if (precision == null) {
    precision = 10;
  }
  precision = Math.min(Math.max(0, precision), ROUND_SUPPORTED_PRECISION_MAX);
  x = (+x).toFixed(precision);
  return returnStr ? x : +x;
}
function getPrecision(val) {
  val = +val;
  if (isNaN(val)) {
    return 0;
  }
  if (val > 1e-14) {
    var e2 = 1;
    for (var i = 0; i < 15; i++, e2 *= 10) {
      if (Math.round(val * e2) / e2 === val) {
        return i;
      }
    }
  }
  return getPrecisionSafe(val);
}
function getPrecisionSafe(val) {
  var str = val.toString().toLowerCase();
  var eIndex = str.indexOf("e");
  var exp = eIndex > 0 ? +str.slice(eIndex + 1) : 0;
  var significandPartLen = eIndex > 0 ? eIndex : str.length;
  var dotIndex = str.indexOf(".");
  var decimalPartLen = dotIndex < 0 ? 0 : significandPartLen - 1 - dotIndex;
  return Math.max(0, decimalPartLen - exp);
}
function addSafe(val0, val1) {
  var maxPrecision = Math.max(getPrecision(val0), getPrecision(val1));
  var sum = val0 + val1;
  return maxPrecision > ROUND_SUPPORTED_PRECISION_MAX ? sum : round2(sum, maxPrecision);
}
var MAX_SAFE_INTEGER = 9007199254740991;
var TIME_REG = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function parseDate(value) {
  if (value instanceof Date) {
    return value;
  } else if (isString(value)) {
    var match = TIME_REG.exec(value);
    if (!match) {
      return /* @__PURE__ */ new Date(NaN);
    }
    if (!match[8]) {
      return new Date(+match[1], +(match[2] || 1) - 1, +match[3] || 1, +match[4] || 0, +(match[5] || 0), +match[6] || 0, match[7] ? +match[7].substring(0, 3) : 0);
    } else {
      var hour = +match[4] || 0;
      if (match[8].toUpperCase() !== "Z") {
        hour -= +match[8].slice(0, 3);
      }
      return new Date(Date.UTC(+match[1], +(match[2] || 1) - 1, +match[3] || 1, hour, +(match[5] || 0), +match[6] || 0, match[7] ? +match[7].substring(0, 3) : 0));
    }
  } else if (value == null) {
    return /* @__PURE__ */ new Date(NaN);
  }
  return new Date(Math.round(value));
}
function numericToNumber(val) {
  var valFloat = parseFloat(val);
  return valFloat == val && (valFloat !== 0 || !isString(val) || val.indexOf("x") <= 0) ? valFloat : NaN;
}
function isNumeric(val) {
  return !isNaN(numericToNumber(val));
}
function getRandomIdBase() {
  return Math.round(Math.random() * 9);
}
function getGreatestCommonDividor(a, b) {
  if (b === 0) {
    return a;
  }
  return getGreatestCommonDividor(b, a % b);
}
function getLeastCommonMultiple(a, b) {
  if (a == null) {
    return b;
  }
  if (b == null) {
    return a;
  }
  return a * b / getGreatestCommonDividor(a, b);
}

// node_modules/echarts/lib/util/log.js
var ECHARTS_PREFIX = "[ECharts] ";
var storedLogs = {};
var hasConsole = typeof console !== "undefined" && console.warn && console.log;
function outputLog(type, str, onlyOnce) {
  if (hasConsole) {
    if (onlyOnce) {
      if (storedLogs[str]) {
        return;
      }
      storedLogs[str] = true;
    }
    console[type](ECHARTS_PREFIX + str);
  }
}
function log(str, onlyOnce) {
  outputLog("log", str, onlyOnce);
}
function warn(str, onlyOnce) {
  outputLog("warn", str, onlyOnce);
}
function error(str, onlyOnce) {
  outputLog("error", str, onlyOnce);
}
function deprecateLog(str) {
  if (process.env.NODE_ENV !== "production") {
    outputLog("warn", "DEPRECATED: " + str, true);
  }
}
function deprecateReplaceLog(oldOpt, newOpt, scope) {
  if (process.env.NODE_ENV !== "production") {
    deprecateLog((scope ? "[" + scope + "]" : "") + (oldOpt + " is deprecated, use " + newOpt + " instead."));
  }
}
function makePrintable() {
  var hintInfo = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    hintInfo[_i] = arguments[_i];
  }
  var msg = "";
  if (process.env.NODE_ENV !== "production") {
    var makePrintableStringIfPossible_1 = function(val) {
      return val === void 0 ? "undefined" : val === Infinity ? "Infinity" : val === -Infinity ? "-Infinity" : eqNaN(val) ? "NaN" : val instanceof Date ? "Date(" + val.toISOString() + ")" : isFunction(val) ? "function () { ... }" : isRegExp(val) ? val + "" : null;
    };
    msg = map(hintInfo, function(arg) {
      if (isString(arg)) {
        return arg;
      } else {
        var printableStr = makePrintableStringIfPossible_1(arg);
        if (printableStr != null) {
          return printableStr;
        } else if (typeof JSON !== "undefined" && JSON.stringify) {
          try {
            return JSON.stringify(arg, function(n, val) {
              var printableStr2 = makePrintableStringIfPossible_1(val);
              return printableStr2 == null ? val : printableStr2;
            });
          } catch (err) {
            return "?";
          }
        } else {
          return "?";
        }
      }
    }).join(" ");
  }
  return msg;
}
function throwError(msg) {
  throw new Error(msg);
}

// node_modules/echarts/lib/util/model.js
var DUMMY_COMPONENT_NAME_PREFIX = "series\0";
var INTERNAL_COMPONENT_ID_PREFIX = "\0_ec_\0";
function normalizeToArray(value) {
  return value instanceof Array ? value : value == null ? [] : [value];
}
function defaultEmphasis(opt, key, subOpts) {
  if (opt) {
    opt[key] = opt[key] || {};
    opt.emphasis = opt.emphasis || {};
    opt.emphasis[key] = opt.emphasis[key] || {};
    for (var i = 0, len2 = subOpts.length; i < len2; i++) {
      var subOptName = subOpts[i];
      if (!opt.emphasis[key].hasOwnProperty(subOptName) && opt[key].hasOwnProperty(subOptName)) {
        opt.emphasis[key][subOptName] = opt[key][subOptName];
      }
    }
  }
}
var TEXT_STYLE_OPTIONS = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function getDataItemValue(dataItem) {
  return isObject(dataItem) && !isArray(dataItem) && !(dataItem instanceof Date) ? dataItem.value : dataItem;
}
function isDataItemOption(dataItem) {
  return isObject(dataItem) && !(dataItem instanceof Array);
}
function mappingToExists(existings, newCmptOptions, mode) {
  var isNormalMergeMode = mode === "normalMerge";
  var isReplaceMergeMode = mode === "replaceMerge";
  var isReplaceAllMode = mode === "replaceAll";
  existings = existings || [];
  newCmptOptions = (newCmptOptions || []).slice();
  var existingIdIdxMap = createHashMap();
  each(newCmptOptions, function(cmptOption, index) {
    if (!isObject(cmptOption)) {
      newCmptOptions[index] = null;
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      if (cmptOption.id != null && !isValidIdOrName(cmptOption.id)) {
        warnInvalidateIdOrName(cmptOption.id);
      }
      if (cmptOption.name != null && !isValidIdOrName(cmptOption.name)) {
        warnInvalidateIdOrName(cmptOption.name);
      }
    }
  });
  var result = prepareResult(existings, existingIdIdxMap, mode);
  if (isNormalMergeMode || isReplaceMergeMode) {
    mappingById(result, existings, existingIdIdxMap, newCmptOptions);
  }
  if (isNormalMergeMode) {
    mappingByName(result, newCmptOptions);
  }
  if (isNormalMergeMode || isReplaceMergeMode) {
    mappingByIndex(result, newCmptOptions, isReplaceMergeMode);
  } else if (isReplaceAllMode) {
    mappingInReplaceAllMode(result, newCmptOptions);
  }
  makeIdAndName(result);
  return result;
}
function prepareResult(existings, existingIdIdxMap, mode) {
  var result = [];
  if (mode === "replaceAll") {
    return result;
  }
  for (var index = 0; index < existings.length; index++) {
    var existing = existings[index];
    if (existing && existing.id != null) {
      existingIdIdxMap.set(existing.id, index);
    }
    result.push({
      existing: mode === "replaceMerge" || isComponentIdInternal(existing) ? null : existing,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return result;
}
function mappingById(result, existings, existingIdIdxMap, newCmptOptions) {
  each(newCmptOptions, function(cmptOption, index) {
    if (!cmptOption || cmptOption.id == null) {
      return;
    }
    var optionId = makeComparableKey(cmptOption.id);
    var existingIdx = existingIdIdxMap.get(optionId);
    if (existingIdx != null) {
      var resultItem = result[existingIdx];
      assert(!resultItem.newOption, 'Duplicated option on id "' + optionId + '".');
      resultItem.newOption = cmptOption;
      resultItem.existing = existings[existingIdx];
      newCmptOptions[index] = null;
    }
  });
}
function mappingByName(result, newCmptOptions) {
  each(newCmptOptions, function(cmptOption, index) {
    if (!cmptOption || cmptOption.name == null) {
      return;
    }
    for (var i = 0; i < result.length; i++) {
      var existing = result[i].existing;
      if (!result[i].newOption && existing && (existing.id == null || cmptOption.id == null) && !isComponentIdInternal(cmptOption) && !isComponentIdInternal(existing) && keyExistAndEqual("name", existing, cmptOption)) {
        result[i].newOption = cmptOption;
        newCmptOptions[index] = null;
        return;
      }
    }
  });
}
function mappingByIndex(result, newCmptOptions, brandNew) {
  each(newCmptOptions, function(cmptOption) {
    if (!cmptOption) {
      return;
    }
    var resultItem;
    var nextIdx = 0;
    while (
      // Be `!resultItem` only when `nextIdx >= result.length`.
      (resultItem = result[nextIdx]) && (resultItem.newOption || isComponentIdInternal(resultItem.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
      resultItem.existing && cmptOption.id != null && !keyExistAndEqual("id", cmptOption, resultItem.existing))
    ) {
      nextIdx++;
    }
    if (resultItem) {
      resultItem.newOption = cmptOption;
      resultItem.brandNew = brandNew;
    } else {
      result.push({
        newOption: cmptOption,
        brandNew,
        existing: null,
        keyInfo: null
      });
    }
    nextIdx++;
  });
}
function mappingInReplaceAllMode(result, newCmptOptions) {
  each(newCmptOptions, function(cmptOption) {
    result.push({
      newOption: cmptOption,
      brandNew: true,
      existing: null,
      keyInfo: null
    });
  });
}
function makeIdAndName(mapResult) {
  var idMap = createHashMap();
  each(mapResult, function(item) {
    var existing = item.existing;
    existing && idMap.set(existing.id, item);
  });
  each(mapResult, function(item) {
    var opt = item.newOption;
    assert(!opt || opt.id == null || !idMap.get(opt.id) || idMap.get(opt.id) === item, "id duplicates: " + (opt && opt.id));
    opt && opt.id != null && idMap.set(opt.id, item);
    !item.keyInfo && (item.keyInfo = {});
  });
  each(mapResult, function(item, index) {
    var existing = item.existing;
    var opt = item.newOption;
    var keyInfo = item.keyInfo;
    if (!isObject(opt)) {
      return;
    }
    keyInfo.name = opt.name != null ? makeComparableKey(opt.name) : existing ? existing.name : DUMMY_COMPONENT_NAME_PREFIX + index;
    if (existing) {
      keyInfo.id = makeComparableKey(existing.id);
    } else if (opt.id != null) {
      keyInfo.id = makeComparableKey(opt.id);
    } else {
      var idNum = 0;
      do {
        keyInfo.id = "\0" + keyInfo.name + "\0" + idNum++;
      } while (idMap.get(keyInfo.id));
    }
    idMap.set(keyInfo.id, item);
  });
}
function keyExistAndEqual(attr, obj1, obj2) {
  var key1 = convertOptionIdName(obj1[attr], null);
  var key2 = convertOptionIdName(obj2[attr], null);
  return key1 != null && key2 != null && key1 === key2;
}
function makeComparableKey(val) {
  if (process.env.NODE_ENV !== "production") {
    if (val == null) {
      throw new Error();
    }
  }
  return convertOptionIdName(val, "");
}
function convertOptionIdName(idOrName, defaultValue) {
  if (idOrName == null) {
    return defaultValue;
  }
  return isString(idOrName) ? idOrName : isNumber(idOrName) || isStringSafe(idOrName) ? idOrName + "" : defaultValue;
}
function warnInvalidateIdOrName(idOrName) {
  if (process.env.NODE_ENV !== "production") {
    warn("`" + idOrName + "` is invalid id or name. Must be a string or number.");
  }
}
function isValidIdOrName(idOrName) {
  return isStringSafe(idOrName) || isNumeric(idOrName);
}
function isNameSpecified(componentModel) {
  var name = componentModel.name;
  return !!(name && name.indexOf(DUMMY_COMPONENT_NAME_PREFIX));
}
function isComponentIdInternal(cmptOption) {
  return cmptOption && cmptOption.id != null && makeComparableKey(cmptOption.id).indexOf(INTERNAL_COMPONENT_ID_PREFIX) === 0;
}
function setComponentTypeToKeyInfo(mappingResult, mainType, componentModelCtor) {
  each(mappingResult, function(item) {
    var newOption = item.newOption;
    if (isObject(newOption)) {
      item.keyInfo.mainType = mainType;
      item.keyInfo.subType = determineSubType(mainType, newOption, item.existing, componentModelCtor);
    }
  });
}
function determineSubType(mainType, newCmptOption, existComponent, componentModelCtor) {
  var subType = newCmptOption.type ? newCmptOption.type : existComponent ? existComponent.subType : componentModelCtor.determineSubType(mainType, newCmptOption);
  return subType;
}
function queryDataIndex(data, payload) {
  if (payload.dataIndexInside != null) {
    return payload.dataIndexInside;
  } else if (payload.dataIndex != null) {
    return isArray(payload.dataIndex) ? map(payload.dataIndex, function(value) {
      return data.indexOfRawIndex(value);
    }) : data.indexOfRawIndex(payload.dataIndex);
  } else if (payload.name != null) {
    return isArray(payload.name) ? map(payload.name, function(value) {
      return data.indexOfName(value);
    }) : data.indexOfName(payload.name);
  }
}
function makeInner() {
  var key = "__ec_inner_" + innerUniqueIndex++;
  return function(hostObj) {
    return hostObj[key] || (hostObj[key] = {});
  };
}
var innerUniqueIndex = getRandomIdBase();
function parseFinder(ecModel, finderInput, opt) {
  var _a2 = preParseFinder(finderInput, opt), mainTypeSpecified = _a2.mainTypeSpecified, queryOptionMap = _a2.queryOptionMap, others = _a2.others;
  var result = others;
  var defaultMainType = opt ? opt.defaultMainType : null;
  if (!mainTypeSpecified && defaultMainType) {
    queryOptionMap.set(defaultMainType, {});
  }
  queryOptionMap.each(function(queryOption, mainType) {
    var queryResult = queryReferringComponents(ecModel, mainType, queryOption, {
      useDefault: defaultMainType === mainType,
      enableAll: opt && opt.enableAll != null ? opt.enableAll : true,
      enableNone: opt && opt.enableNone != null ? opt.enableNone : true
    });
    result[mainType + "Models"] = queryResult.models;
    result[mainType + "Model"] = queryResult.models[0];
  });
  return result;
}
function preParseFinder(finderInput, opt) {
  var finder;
  if (isString(finderInput)) {
    var obj = {};
    obj[finderInput + "Index"] = 0;
    finder = obj;
  } else {
    finder = finderInput;
  }
  var queryOptionMap = createHashMap();
  var others = {};
  var mainTypeSpecified = false;
  each(finder, function(value, key) {
    if (key === "dataIndex" || key === "dataIndexInside") {
      others[key] = value;
      return;
    }
    var parsedKey = key.match(/^(\w+)(Index|Id|Name)$/) || [];
    var mainType = parsedKey[1];
    var queryType = (parsedKey[2] || "").toLowerCase();
    if (!mainType || !queryType || opt && opt.includeMainTypes && indexOf(opt.includeMainTypes, mainType) < 0) {
      return;
    }
    mainTypeSpecified = mainTypeSpecified || !!mainType;
    var queryOption = queryOptionMap.get(mainType) || queryOptionMap.set(mainType, {});
    queryOption[queryType] = value;
  });
  return {
    mainTypeSpecified,
    queryOptionMap,
    others
  };
}
var SINGLE_REFERRING = {
  useDefault: true,
  enableAll: false,
  enableNone: false
};
function queryReferringComponents(ecModel, mainType, userOption, opt) {
  opt = opt || SINGLE_REFERRING;
  var indexOption = userOption.index;
  var idOption = userOption.id;
  var nameOption = userOption.name;
  var result = {
    models: null,
    specified: indexOption != null || idOption != null || nameOption != null
  };
  if (!result.specified) {
    var firstCmpt = void 0;
    result.models = opt.useDefault && (firstCmpt = ecModel.getComponent(mainType)) ? [firstCmpt] : [];
    return result;
  }
  if (indexOption === "none" || indexOption === false) {
    assert(opt.enableNone, '`"none"` or `false` is not a valid value on index option.');
    result.models = [];
    return result;
  }
  if (indexOption === "all") {
    assert(opt.enableAll, '`"all"` is not a valid value on index option.');
    indexOption = idOption = nameOption = null;
  }
  result.models = ecModel.queryComponents({
    mainType,
    index: indexOption,
    id: idOption,
    name: nameOption
  });
  return result;
}
function setAttribute(dom, key, value) {
  dom.setAttribute ? dom.setAttribute(key, value) : dom[key] = value;
}
function getAttribute(dom, key) {
  return dom.getAttribute ? dom.getAttribute(key) : dom[key];
}

// node_modules/echarts/lib/util/innerStore.js
var getECData = makeInner();
var setCommonECData = function(seriesIndex, dataType, dataIdx, el) {
  if (el) {
    var ecData = getECData(el);
    ecData.dataIndex = dataIdx;
    ecData.dataType = dataType;
    ecData.seriesIndex = seriesIndex;
    ecData.ssrType = "chart";
    if (el.type === "group") {
      el.traverse(function(child) {
        var childECData = getECData(child);
        childECData.seriesIndex = seriesIndex;
        childECData.dataIndex = dataIdx;
        childECData.dataType = dataType;
        childECData.ssrType = "chart";
      });
    }
  }
};

// node_modules/echarts/lib/util/states.js
var _highlightNextDigit = 1;
var _highlightKeyMap = {};
var getSavedStates = makeInner();
var getComponentStates = makeInner();
var HOVER_STATE_NORMAL = 0;
var HOVER_STATE_BLUR = 1;
var HOVER_STATE_EMPHASIS = 2;
var SPECIAL_STATES = ["emphasis", "blur", "select"];
var DISPLAY_STATES = ["normal", "emphasis", "blur", "select"];
var Z2_EMPHASIS_LIFT = 10;
var Z2_SELECT_LIFT = 9;
var HIGHLIGHT_ACTION_TYPE = "highlight";
var DOWNPLAY_ACTION_TYPE = "downplay";
var SELECT_ACTION_TYPE = "select";
var UNSELECT_ACTION_TYPE = "unselect";
var TOGGLE_SELECT_ACTION_TYPE = "toggleSelect";
function hasFillOrStroke(fillOrStroke) {
  return fillOrStroke != null && fillOrStroke !== "none";
}
function doChangeHoverState(el, stateName, hoverStateEnum) {
  if (el.onHoverStateChange && (el.hoverState || 0) !== hoverStateEnum) {
    el.onHoverStateChange(stateName);
  }
  el.hoverState = hoverStateEnum;
}
function singleEnterEmphasis(el) {
  doChangeHoverState(el, "emphasis", HOVER_STATE_EMPHASIS);
}
function singleLeaveEmphasis(el) {
  if (el.hoverState === HOVER_STATE_EMPHASIS) {
    doChangeHoverState(el, "normal", HOVER_STATE_NORMAL);
  }
}
function singleEnterBlur(el) {
  doChangeHoverState(el, "blur", HOVER_STATE_BLUR);
}
function singleLeaveBlur(el) {
  if (el.hoverState === HOVER_STATE_BLUR) {
    doChangeHoverState(el, "normal", HOVER_STATE_NORMAL);
  }
}
function singleEnterSelect(el) {
  el.selected = true;
}
function singleLeaveSelect(el) {
  el.selected = false;
}
function updateElementState(el, updater, commonParam) {
  updater(el, commonParam);
}
function traverseUpdateState(el, updater, commonParam) {
  updateElementState(el, updater, commonParam);
  el.isGroup && el.traverse(function(child) {
    updateElementState(child, updater, commonParam);
  });
}
function getFromStateStyle(el, props, toStateName, defaultValue) {
  var style = el.style;
  var fromState = {};
  for (var i = 0; i < props.length; i++) {
    var propName = props[i];
    var val = style[propName];
    fromState[propName] = val == null ? defaultValue && defaultValue[propName] : val;
  }
  for (var i = 0; i < el.animators.length; i++) {
    var animator = el.animators[i];
    if (animator.__fromStateTransition && animator.__fromStateTransition.indexOf(toStateName) < 0 && animator.targetName === "style") {
      animator.saveTo(fromState, props);
    }
  }
  return fromState;
}
function createEmphasisDefaultState(el, stateName, targetStates, state) {
  var hasSelect = targetStates && indexOf(targetStates, "select") >= 0;
  var cloned = false;
  if (el instanceof Path_default) {
    var store = getSavedStates(el);
    var fromFill = hasSelect ? store.selectFill || store.normalFill : store.normalFill;
    var fromStroke = hasSelect ? store.selectStroke || store.normalStroke : store.normalStroke;
    if (hasFillOrStroke(fromFill) || hasFillOrStroke(fromStroke)) {
      state = state || {};
      var emphasisStyle = state.style || {};
      if (emphasisStyle.fill === "inherit") {
        cloned = true;
        state = extend({}, state);
        emphasisStyle = extend({}, emphasisStyle);
        emphasisStyle.fill = fromFill;
      } else if (!hasFillOrStroke(emphasisStyle.fill) && hasFillOrStroke(fromFill)) {
        cloned = true;
        state = extend({}, state);
        emphasisStyle = extend({}, emphasisStyle);
        emphasisStyle.fill = liftColor(fromFill);
      } else if (!hasFillOrStroke(emphasisStyle.stroke) && hasFillOrStroke(fromStroke)) {
        if (!cloned) {
          state = extend({}, state);
          emphasisStyle = extend({}, emphasisStyle);
        }
        emphasisStyle.stroke = liftColor(fromStroke);
      }
      state.style = emphasisStyle;
    }
  }
  if (state) {
    if (state.z2 == null) {
      if (!cloned) {
        state = extend({}, state);
      }
      var z2EmphasisLift = el.z2EmphasisLift;
      state.z2 = el.z2 + (z2EmphasisLift != null ? z2EmphasisLift : Z2_EMPHASIS_LIFT);
    }
  }
  return state;
}
function createSelectDefaultState(el, stateName, state) {
  if (state) {
    if (state.z2 == null) {
      state = extend({}, state);
      var z2SelectLift = el.z2SelectLift;
      state.z2 = el.z2 + (z2SelectLift != null ? z2SelectLift : Z2_SELECT_LIFT);
    }
  }
  return state;
}
function createBlurDefaultState(el, stateName, state) {
  var hasBlur = indexOf(el.currentStates, stateName) >= 0;
  var currentOpacity = el.style.opacity;
  var fromState = !hasBlur ? getFromStateStyle(el, ["opacity"], stateName, {
    opacity: 1
  }) : null;
  state = state || {};
  var blurStyle = state.style || {};
  if (blurStyle.opacity == null) {
    state = extend({}, state);
    blurStyle = extend({
      // Already being applied 'emphasis'. DON'T mul opacity multiple times.
      opacity: hasBlur ? currentOpacity : fromState.opacity * 0.1
    }, blurStyle);
    state.style = blurStyle;
  }
  return state;
}
function elementStateProxy(stateName, targetStates) {
  var state = this.states[stateName];
  if (this.style) {
    if (stateName === "emphasis") {
      return createEmphasisDefaultState(this, stateName, targetStates, state);
    } else if (stateName === "blur") {
      return createBlurDefaultState(this, stateName, state);
    } else if (stateName === "select") {
      return createSelectDefaultState(this, stateName, state);
    }
  }
  return state;
}
function setDefaultStateProxy(el) {
  el.stateProxy = elementStateProxy;
  var textContent = el.getTextContent();
  var textGuide = el.getTextGuideLine();
  if (textContent) {
    textContent.stateProxy = elementStateProxy;
  }
  if (textGuide) {
    textGuide.stateProxy = elementStateProxy;
  }
}
function enterEmphasisWhenMouseOver(el, e2) {
  !shouldSilent(el, e2) && !el.__highByOuter && traverseUpdateState(el, singleEnterEmphasis);
}
function leaveEmphasisWhenMouseOut(el, e2) {
  !shouldSilent(el, e2) && !el.__highByOuter && traverseUpdateState(el, singleLeaveEmphasis);
}
function enterEmphasis(el, highlightDigit) {
  el.__highByOuter |= 1 << (highlightDigit || 0);
  traverseUpdateState(el, singleEnterEmphasis);
}
function leaveEmphasis(el, highlightDigit) {
  !(el.__highByOuter &= ~(1 << (highlightDigit || 0))) && traverseUpdateState(el, singleLeaveEmphasis);
}
function enterBlur(el) {
  traverseUpdateState(el, singleEnterBlur);
}
function leaveBlur(el) {
  traverseUpdateState(el, singleLeaveBlur);
}
function enterSelect(el) {
  traverseUpdateState(el, singleEnterSelect);
}
function leaveSelect(el) {
  traverseUpdateState(el, singleLeaveSelect);
}
function shouldSilent(el, e2) {
  return el.__highDownSilentOnTouch && e2.zrByTouch;
}
function allLeaveBlur(api) {
  var model = api.getModel();
  var leaveBlurredSeries = [];
  var allComponentViews = [];
  model.eachComponent(function(componentType, componentModel) {
    var componentStates = getComponentStates(componentModel);
    var isSeries2 = componentType === "series";
    var view = isSeries2 ? api.getViewOfSeriesModel(componentModel) : api.getViewOfComponentModel(componentModel);
    !isSeries2 && allComponentViews.push(view);
    if (componentStates.isBlured) {
      view.group.traverse(function(child) {
        singleLeaveBlur(child);
      });
      isSeries2 && leaveBlurredSeries.push(componentModel);
    }
    componentStates.isBlured = false;
  });
  each(allComponentViews, function(view) {
    if (view && view.toggleBlurSeries) {
      view.toggleBlurSeries(leaveBlurredSeries, false, model);
    }
  });
}
function blurSeries(targetSeriesIndex, focus, blurScope, api) {
  var ecModel = api.getModel();
  blurScope = blurScope || "coordinateSystem";
  function leaveBlurOfIndices(data, dataIndices) {
    for (var i = 0; i < dataIndices.length; i++) {
      var itemEl = data.getItemGraphicEl(dataIndices[i]);
      itemEl && leaveBlur(itemEl);
    }
  }
  if (targetSeriesIndex == null) {
    return;
  }
  if (!focus || focus === "none") {
    return;
  }
  var targetSeriesModel = ecModel.getSeriesByIndex(targetSeriesIndex);
  var targetCoordSys = targetSeriesModel.coordinateSystem;
  if (targetCoordSys && targetCoordSys.master) {
    targetCoordSys = targetCoordSys.master;
  }
  var blurredSeries = [];
  ecModel.eachSeries(function(seriesModel) {
    var sameSeries = targetSeriesModel === seriesModel;
    var coordSys = seriesModel.coordinateSystem;
    if (coordSys && coordSys.master) {
      coordSys = coordSys.master;
    }
    var sameCoordSys = coordSys && targetCoordSys ? coordSys === targetCoordSys : sameSeries;
    if (!// Not blur other series if blurScope series
    (blurScope === "series" && !sameSeries || blurScope === "coordinateSystem" && !sameCoordSys || focus === "series" && sameSeries)) {
      var view = api.getViewOfSeriesModel(seriesModel);
      view.group.traverse(function(child) {
        if (child.__highByOuter && sameSeries && focus === "self") {
          return;
        }
        singleEnterBlur(child);
      });
      if (isArrayLike(focus)) {
        leaveBlurOfIndices(seriesModel.getData(), focus);
      } else if (isObject(focus)) {
        var dataTypes = keys(focus);
        for (var d = 0; d < dataTypes.length; d++) {
          leaveBlurOfIndices(seriesModel.getData(dataTypes[d]), focus[dataTypes[d]]);
        }
      }
      blurredSeries.push(seriesModel);
      getComponentStates(seriesModel).isBlured = true;
    }
  });
  ecModel.eachComponent(function(componentType, componentModel) {
    if (componentType === "series") {
      return;
    }
    var view = api.getViewOfComponentModel(componentModel);
    if (view && view.toggleBlurSeries) {
      view.toggleBlurSeries(blurredSeries, true, ecModel);
    }
  });
}
function blurComponent(componentMainType, componentIndex, api) {
  if (componentMainType == null || componentIndex == null) {
    return;
  }
  var componentModel = api.getModel().getComponent(componentMainType, componentIndex);
  if (!componentModel) {
    return;
  }
  getComponentStates(componentModel).isBlured = true;
  var view = api.getViewOfComponentModel(componentModel);
  if (!view || !view.focusBlurEnabled) {
    return;
  }
  view.group.traverse(function(child) {
    singleEnterBlur(child);
  });
}
function blurSeriesFromHighlightPayload(seriesModel, payload, api) {
  var seriesIndex = seriesModel.seriesIndex;
  var data = seriesModel.getData(payload.dataType);
  if (!data) {
    if (process.env.NODE_ENV !== "production") {
      error("Unknown dataType " + payload.dataType);
    }
    return;
  }
  var dataIndex = queryDataIndex(data, payload);
  dataIndex = (isArray(dataIndex) ? dataIndex[0] : dataIndex) || 0;
  var el = data.getItemGraphicEl(dataIndex);
  if (!el) {
    var count = data.count();
    var current = 0;
    while (!el && current < count) {
      el = data.getItemGraphicEl(current++);
    }
  }
  if (el) {
    var ecData = getECData(el);
    blurSeries(seriesIndex, ecData.focus, ecData.blurScope, api);
  } else {
    var focus_1 = seriesModel.get(["emphasis", "focus"]);
    var blurScope = seriesModel.get(["emphasis", "blurScope"]);
    if (focus_1 != null) {
      blurSeries(seriesIndex, focus_1, blurScope, api);
    }
  }
}
function findComponentHighDownDispatchers(componentMainType, componentIndex, name, api) {
  var ret = {
    focusSelf: false,
    dispatchers: null
  };
  if (componentMainType == null || componentMainType === "series" || componentIndex == null || name == null) {
    return ret;
  }
  var componentModel = api.getModel().getComponent(componentMainType, componentIndex);
  if (!componentModel) {
    return ret;
  }
  var view = api.getViewOfComponentModel(componentModel);
  if (!view || !view.findHighDownDispatchers) {
    return ret;
  }
  var dispatchers = view.findHighDownDispatchers(name);
  var focusSelf;
  for (var i = 0; i < dispatchers.length; i++) {
    if (process.env.NODE_ENV !== "production" && !isHighDownDispatcher(dispatchers[i])) {
      error("param should be highDownDispatcher");
    }
    if (getECData(dispatchers[i]).focus === "self") {
      focusSelf = true;
      break;
    }
  }
  return {
    focusSelf,
    dispatchers
  };
}
function handleGlobalMouseOverForHighDown(dispatcher, e2, api) {
  if (process.env.NODE_ENV !== "production" && !isHighDownDispatcher(dispatcher)) {
    error("param should be highDownDispatcher");
  }
  var ecData = getECData(dispatcher);
  var _a2 = findComponentHighDownDispatchers(ecData.componentMainType, ecData.componentIndex, ecData.componentHighDownName, api), dispatchers = _a2.dispatchers, focusSelf = _a2.focusSelf;
  if (dispatchers) {
    if (focusSelf) {
      blurComponent(ecData.componentMainType, ecData.componentIndex, api);
    }
    each(dispatchers, function(dispatcher2) {
      return enterEmphasisWhenMouseOver(dispatcher2, e2);
    });
  } else {
    blurSeries(ecData.seriesIndex, ecData.focus, ecData.blurScope, api);
    if (ecData.focus === "self") {
      blurComponent(ecData.componentMainType, ecData.componentIndex, api);
    }
    enterEmphasisWhenMouseOver(dispatcher, e2);
  }
}
function handleGlobalMouseOutForHighDown(dispatcher, e2, api) {
  if (process.env.NODE_ENV !== "production" && !isHighDownDispatcher(dispatcher)) {
    error("param should be highDownDispatcher");
  }
  allLeaveBlur(api);
  var ecData = getECData(dispatcher);
  var dispatchers = findComponentHighDownDispatchers(ecData.componentMainType, ecData.componentIndex, ecData.componentHighDownName, api).dispatchers;
  if (dispatchers) {
    each(dispatchers, function(dispatcher2) {
      return leaveEmphasisWhenMouseOut(dispatcher2, e2);
    });
  } else {
    leaveEmphasisWhenMouseOut(dispatcher, e2);
  }
}
function toggleSelectionFromPayload(seriesModel, payload, api) {
  if (!isSelectChangePayload(payload)) {
    return;
  }
  var dataType = payload.dataType;
  var data = seriesModel.getData(dataType);
  var dataIndex = queryDataIndex(data, payload);
  if (!isArray(dataIndex)) {
    dataIndex = [dataIndex];
  }
  seriesModel[payload.type === TOGGLE_SELECT_ACTION_TYPE ? "toggleSelect" : payload.type === SELECT_ACTION_TYPE ? "select" : "unselect"](dataIndex, dataType);
}
function updateSeriesElementSelection(seriesModel) {
  var allData = seriesModel.getAllData();
  each(allData, function(_a2) {
    var data = _a2.data, type = _a2.type;
    data.eachItemGraphicEl(function(el, idx) {
      seriesModel.isSelected(idx, type) ? enterSelect(el) : leaveSelect(el);
    });
  });
}
function getAllSelectedIndices(ecModel) {
  var ret = [];
  ecModel.eachSeries(function(seriesModel) {
    var allData = seriesModel.getAllData();
    each(allData, function(_a2) {
      var data = _a2.data, type = _a2.type;
      var dataIndices = seriesModel.getSelectedDataIndices();
      if (dataIndices.length > 0) {
        var item = {
          dataIndex: dataIndices,
          seriesIndex: seriesModel.seriesIndex
        };
        if (type != null) {
          item.dataType = type;
        }
        ret.push(item);
      }
    });
  });
  return ret;
}
function enableHoverEmphasis(el, focus, blurScope) {
  setAsHighDownDispatcher(el, true);
  traverseUpdateState(el, setDefaultStateProxy);
  enableHoverFocus(el, focus, blurScope);
}
function disableHoverEmphasis(el) {
  setAsHighDownDispatcher(el, false);
}
function toggleHoverEmphasis(el, focus, blurScope, isDisabled) {
  isDisabled ? disableHoverEmphasis(el) : enableHoverEmphasis(el, focus, blurScope);
}
function enableHoverFocus(el, focus, blurScope) {
  var ecData = getECData(el);
  if (focus != null) {
    ecData.focus = focus;
    ecData.blurScope = blurScope;
  } else if (ecData.focus) {
    ecData.focus = null;
  }
}
function setAsHighDownDispatcher(el, asDispatcher) {
  var disable = asDispatcher === false;
  var extendedEl = el;
  if (el.highDownSilentOnTouch) {
    extendedEl.__highDownSilentOnTouch = el.highDownSilentOnTouch;
  }
  if (!disable || extendedEl.__highDownDispatcher) {
    extendedEl.__highByOuter = extendedEl.__highByOuter || 0;
    extendedEl.__highDownDispatcher = !disable;
  }
}
function isHighDownDispatcher(el) {
  return !!(el && el.__highDownDispatcher);
}
function getHighlightDigit(highlightKey) {
  var highlightDigit = _highlightKeyMap[highlightKey];
  if (highlightDigit == null && _highlightNextDigit <= 32) {
    highlightDigit = _highlightKeyMap[highlightKey] = _highlightNextDigit++;
  }
  return highlightDigit;
}
function isSelectChangePayload(payload) {
  var payloadType = payload.type;
  return payloadType === SELECT_ACTION_TYPE || payloadType === UNSELECT_ACTION_TYPE || payloadType === TOGGLE_SELECT_ACTION_TYPE;
}
function isHighDownPayload(payload) {
  var payloadType = payload.type;
  return payloadType === HIGHLIGHT_ACTION_TYPE || payloadType === DOWNPLAY_ACTION_TYPE;
}
function savePathStates(el) {
  var store = getSavedStates(el);
  store.normalFill = el.style.fill;
  store.normalStroke = el.style.stroke;
  var selectState = el.states.select || {};
  store.selectFill = selectState.style && selectState.style.fill || null;
  store.selectStroke = selectState.style && selectState.style.stroke || null;
}

// node_modules/zrender/lib/tool/transformPath.js
var CMD3 = PathProxy_default.CMD;
var points = [[], [], []];
var mathSqrt2 = Math.sqrt;
var mathAtan2 = Math.atan2;
function transformPath(path3, m) {
  if (!m) {
    return;
  }
  var data = path3.data;
  var len2 = path3.len();
  var cmd;
  var nPoint;
  var i;
  var j;
  var k;
  var p;
  var M = CMD3.M;
  var C = CMD3.C;
  var L = CMD3.L;
  var R = CMD3.R;
  var A = CMD3.A;
  var Q = CMD3.Q;
  for (i = 0, j = 0; i < len2; ) {
    cmd = data[i++];
    j = i;
    nPoint = 0;
    switch (cmd) {
      case M:
        nPoint = 1;
        break;
      case L:
        nPoint = 1;
        break;
      case C:
        nPoint = 3;
        break;
      case Q:
        nPoint = 2;
        break;
      case A:
        var x = m[4];
        var y = m[5];
        var sx = mathSqrt2(m[0] * m[0] + m[1] * m[1]);
        var sy = mathSqrt2(m[2] * m[2] + m[3] * m[3]);
        var angle = mathAtan2(-m[1] / sy, m[0] / sx);
        data[i] *= sx;
        data[i++] += x;
        data[i] *= sy;
        data[i++] += y;
        data[i++] *= sx;
        data[i++] *= sy;
        data[i++] += angle;
        data[i++] += angle;
        i += 2;
        j = i;
        break;
      case R:
        p[0] = data[i++];
        p[1] = data[i++];
        applyTransform(p, p, m);
        data[j++] = p[0];
        data[j++] = p[1];
        p[0] += data[i++];
        p[1] += data[i++];
        applyTransform(p, p, m);
        data[j++] = p[0];
        data[j++] = p[1];
    }
    for (k = 0; k < nPoint; k++) {
      var p_1 = points[k];
      p_1[0] = data[i++];
      p_1[1] = data[i++];
      applyTransform(p_1, p_1, m);
      data[j++] = p_1[0];
      data[j++] = p_1[1];
    }
  }
  path3.increaseVersion();
}

// node_modules/zrender/lib/tool/path.js
var mathSqrt3 = Math.sqrt;
var mathSin3 = Math.sin;
var mathCos3 = Math.cos;
var PI3 = Math.PI;
function vMag(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}
function vRatio(u, v) {
  return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
}
function vAngle(u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
}
function processArc(x1, y1, x2, y2, fa, fs4, rx, ry, psiDeg, cmd, path3) {
  var psi = psiDeg * (PI3 / 180);
  var xp = mathCos3(psi) * (x1 - x2) / 2 + mathSin3(psi) * (y1 - y2) / 2;
  var yp = -1 * mathSin3(psi) * (x1 - x2) / 2 + mathCos3(psi) * (y1 - y2) / 2;
  var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
  if (lambda > 1) {
    rx *= mathSqrt3(lambda);
    ry *= mathSqrt3(lambda);
  }
  var f = (fa === fs4 ? -1 : 1) * mathSqrt3((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp))) || 0;
  var cxp = f * rx * yp / ry;
  var cyp = f * -ry * xp / rx;
  var cx = (x1 + x2) / 2 + mathCos3(psi) * cxp - mathSin3(psi) * cyp;
  var cy = (y1 + y2) / 2 + mathSin3(psi) * cxp + mathCos3(psi) * cyp;
  var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
  var u = [(xp - cxp) / rx, (yp - cyp) / ry];
  var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
  var dTheta = vAngle(u, v);
  if (vRatio(u, v) <= -1) {
    dTheta = PI3;
  }
  if (vRatio(u, v) >= 1) {
    dTheta = 0;
  }
  if (dTheta < 0) {
    var n = Math.round(dTheta / PI3 * 1e6) / 1e6;
    dTheta = PI3 * 2 + n % 2 * PI3;
  }
  path3.addData(cmd, cx, cy, rx, ry, theta, dTheta, psi, fs4);
}
var commandReg = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig;
var numberReg = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function createPathProxyFromString(data) {
  var path3 = new PathProxy_default();
  if (!data) {
    return path3;
  }
  var cpx = 0;
  var cpy = 0;
  var subpathX = cpx;
  var subpathY = cpy;
  var prevCmd;
  var CMD4 = PathProxy_default.CMD;
  var cmdList = data.match(commandReg);
  if (!cmdList) {
    return path3;
  }
  for (var l = 0; l < cmdList.length; l++) {
    var cmdText = cmdList[l];
    var cmdStr = cmdText.charAt(0);
    var cmd = void 0;
    var p = cmdText.match(numberReg) || [];
    var pLen = p.length;
    for (var i = 0; i < pLen; i++) {
      p[i] = parseFloat(p[i]);
    }
    var off = 0;
    while (off < pLen) {
      var ctlPtx = void 0;
      var ctlPty = void 0;
      var rx = void 0;
      var ry = void 0;
      var psi = void 0;
      var fa = void 0;
      var fs4 = void 0;
      var x1 = cpx;
      var y1 = cpy;
      var len2 = void 0;
      var pathData = void 0;
      switch (cmdStr) {
        case "l":
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD4.L;
          path3.addData(cmd, cpx, cpy);
          break;
        case "L":
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD4.L;
          path3.addData(cmd, cpx, cpy);
          break;
        case "m":
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD4.M;
          path3.addData(cmd, cpx, cpy);
          subpathX = cpx;
          subpathY = cpy;
          cmdStr = "l";
          break;
        case "M":
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD4.M;
          path3.addData(cmd, cpx, cpy);
          subpathX = cpx;
          subpathY = cpy;
          cmdStr = "L";
          break;
        case "h":
          cpx += p[off++];
          cmd = CMD4.L;
          path3.addData(cmd, cpx, cpy);
          break;
        case "H":
          cpx = p[off++];
          cmd = CMD4.L;
          path3.addData(cmd, cpx, cpy);
          break;
        case "v":
          cpy += p[off++];
          cmd = CMD4.L;
          path3.addData(cmd, cpx, cpy);
          break;
        case "V":
          cpy = p[off++];
          cmd = CMD4.L;
          path3.addData(cmd, cpx, cpy);
          break;
        case "C":
          cmd = CMD4.C;
          path3.addData(cmd, p[off++], p[off++], p[off++], p[off++], p[off++], p[off++]);
          cpx = p[off - 2];
          cpy = p[off - 1];
          break;
        case "c":
          cmd = CMD4.C;
          path3.addData(cmd, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy, p[off++] + cpx, p[off++] + cpy);
          cpx += p[off - 2];
          cpy += p[off - 1];
          break;
        case "S":
          ctlPtx = cpx;
          ctlPty = cpy;
          len2 = path3.len();
          pathData = path3.data;
          if (prevCmd === CMD4.C) {
            ctlPtx += cpx - pathData[len2 - 4];
            ctlPty += cpy - pathData[len2 - 3];
          }
          cmd = CMD4.C;
          x1 = p[off++];
          y1 = p[off++];
          cpx = p[off++];
          cpy = p[off++];
          path3.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
          break;
        case "s":
          ctlPtx = cpx;
          ctlPty = cpy;
          len2 = path3.len();
          pathData = path3.data;
          if (prevCmd === CMD4.C) {
            ctlPtx += cpx - pathData[len2 - 4];
            ctlPty += cpy - pathData[len2 - 3];
          }
          cmd = CMD4.C;
          x1 = cpx + p[off++];
          y1 = cpy + p[off++];
          cpx += p[off++];
          cpy += p[off++];
          path3.addData(cmd, ctlPtx, ctlPty, x1, y1, cpx, cpy);
          break;
        case "Q":
          x1 = p[off++];
          y1 = p[off++];
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD4.Q;
          path3.addData(cmd, x1, y1, cpx, cpy);
          break;
        case "q":
          x1 = p[off++] + cpx;
          y1 = p[off++] + cpy;
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD4.Q;
          path3.addData(cmd, x1, y1, cpx, cpy);
          break;
        case "T":
          ctlPtx = cpx;
          ctlPty = cpy;
          len2 = path3.len();
          pathData = path3.data;
          if (prevCmd === CMD4.Q) {
            ctlPtx += cpx - pathData[len2 - 4];
            ctlPty += cpy - pathData[len2 - 3];
          }
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD4.Q;
          path3.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
          break;
        case "t":
          ctlPtx = cpx;
          ctlPty = cpy;
          len2 = path3.len();
          pathData = path3.data;
          if (prevCmd === CMD4.Q) {
            ctlPtx += cpx - pathData[len2 - 4];
            ctlPty += cpy - pathData[len2 - 3];
          }
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD4.Q;
          path3.addData(cmd, ctlPtx, ctlPty, cpx, cpy);
          break;
        case "A":
          rx = p[off++];
          ry = p[off++];
          psi = p[off++];
          fa = p[off++];
          fs4 = p[off++];
          x1 = cpx, y1 = cpy;
          cpx = p[off++];
          cpy = p[off++];
          cmd = CMD4.A;
          processArc(x1, y1, cpx, cpy, fa, fs4, rx, ry, psi, cmd, path3);
          break;
        case "a":
          rx = p[off++];
          ry = p[off++];
          psi = p[off++];
          fa = p[off++];
          fs4 = p[off++];
          x1 = cpx, y1 = cpy;
          cpx += p[off++];
          cpy += p[off++];
          cmd = CMD4.A;
          processArc(x1, y1, cpx, cpy, fa, fs4, rx, ry, psi, cmd, path3);
          break;
      }
    }
    if (cmdStr === "z" || cmdStr === "Z") {
      cmd = CMD4.Z;
      path3.addData(cmd);
      cpx = subpathX;
      cpy = subpathY;
    }
    prevCmd = cmd;
  }
  path3.toStatic();
  return path3;
}
var SVGPath = function(_super) {
  __extends(SVGPath2, _super);
  function SVGPath2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  SVGPath2.prototype.applyTransform = function(m) {
  };
  return SVGPath2;
}(Path_default);
function isPathProxy(path3) {
  return path3.setData != null;
}
function createPathOptions(str, opts) {
  var pathProxy = createPathProxyFromString(str);
  var innerOpts = extend({}, opts);
  innerOpts.buildPath = function(path3) {
    if (isPathProxy(path3)) {
      path3.setData(pathProxy.data);
      var ctx = path3.getContext();
      if (ctx) {
        path3.rebuildPath(ctx, 1);
      }
    } else {
      var ctx = path3;
      pathProxy.rebuildPath(ctx, 1);
    }
  };
  innerOpts.applyTransform = function(m) {
    transformPath(pathProxy, m);
    this.dirtyShape();
  };
  return innerOpts;
}
function createFromString(str, opts) {
  return new SVGPath(createPathOptions(str, opts));
}

// node_modules/zrender/lib/graphic/Group.js
var Group = function(_super) {
  __extends(Group3, _super);
  function Group3(opts) {
    var _this = _super.call(this) || this;
    _this.isGroup = true;
    _this._children = [];
    _this.attr(opts);
    return _this;
  }
  Group3.prototype.childrenRef = function() {
    return this._children;
  };
  Group3.prototype.children = function() {
    return this._children.slice();
  };
  Group3.prototype.childAt = function(idx) {
    return this._children[idx];
  };
  Group3.prototype.childOfName = function(name) {
    var children = this._children;
    for (var i = 0; i < children.length; i++) {
      if (children[i].name === name) {
        return children[i];
      }
    }
  };
  Group3.prototype.childCount = function() {
    return this._children.length;
  };
  Group3.prototype.add = function(child) {
    if (child) {
      if (child !== this && child.parent !== this) {
        this._children.push(child);
        this._doAdd(child);
      }
      if (process.env.NODE_ENV !== "production") {
        if (child.__hostTarget) {
          throw "This elemenet has been used as an attachment";
        }
      }
    }
    return this;
  };
  Group3.prototype.addBefore = function(child, nextSibling2) {
    if (child && child !== this && child.parent !== this && nextSibling2 && nextSibling2.parent === this) {
      var children = this._children;
      var idx = children.indexOf(nextSibling2);
      if (idx >= 0) {
        children.splice(idx, 0, child);
        this._doAdd(child);
      }
    }
    return this;
  };
  Group3.prototype.replace = function(oldChild, newChild) {
    var idx = indexOf(this._children, oldChild);
    if (idx >= 0) {
      this.replaceAt(newChild, idx);
    }
    return this;
  };
  Group3.prototype.replaceAt = function(child, index) {
    var children = this._children;
    var old = children[index];
    if (child && child !== this && child.parent !== this && child !== old) {
      children[index] = child;
      old.parent = null;
      var zr = this.__zr;
      if (zr) {
        old.removeSelfFromZr(zr);
      }
      this._doAdd(child);
    }
    return this;
  };
  Group3.prototype._doAdd = function(child) {
    if (child.parent) {
      child.parent.remove(child);
    }
    child.parent = this;
    var zr = this.__zr;
    if (zr && zr !== child.__zr) {
      child.addSelfToZr(zr);
    }
    zr && zr.refresh();
  };
  Group3.prototype.remove = function(child) {
    var zr = this.__zr;
    var children = this._children;
    var idx = indexOf(children, child);
    if (idx < 0) {
      return this;
    }
    children.splice(idx, 1);
    child.parent = null;
    if (zr) {
      child.removeSelfFromZr(zr);
    }
    zr && zr.refresh();
    return this;
  };
  Group3.prototype.removeAll = function() {
    var children = this._children;
    var zr = this.__zr;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (zr) {
        child.removeSelfFromZr(zr);
      }
      child.parent = null;
    }
    children.length = 0;
    return this;
  };
  Group3.prototype.eachChild = function(cb, context) {
    var children = this._children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      cb.call(context, child, i);
    }
    return this;
  };
  Group3.prototype.traverse = function(cb, context) {
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      var stopped = cb.call(context, child);
      if (child.isGroup && !stopped) {
        child.traverse(cb, context);
      }
    }
    return this;
  };
  Group3.prototype.addSelfToZr = function(zr) {
    _super.prototype.addSelfToZr.call(this, zr);
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      child.addSelfToZr(zr);
    }
  };
  Group3.prototype.removeSelfFromZr = function(zr) {
    _super.prototype.removeSelfFromZr.call(this, zr);
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      child.removeSelfFromZr(zr);
    }
  };
  Group3.prototype.getBoundingRect = function(includeChildren) {
    var tmpRect3 = new BoundingRect_default(0, 0, 0, 0);
    var children = includeChildren || this._children;
    var tmpMat = [];
    var rect = null;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.ignore || child.invisible) {
        continue;
      }
      var childRect = child.getBoundingRect();
      var transform = child.getLocalTransform(tmpMat);
      if (transform) {
        BoundingRect_default.applyTransform(tmpRect3, childRect, transform);
        rect = rect || tmpRect3.clone();
        rect.union(tmpRect3);
      } else {
        rect = rect || childRect.clone();
        rect.union(childRect);
      }
    }
    return rect || tmpRect3;
  };
  return Group3;
}(Element_default);
Group.prototype.type = "group";
var Group_default = Group;

// node_modules/zrender/lib/graphic/shape/Circle.js
var CircleShape = /* @__PURE__ */ function() {
  function CircleShape2() {
    this.cx = 0;
    this.cy = 0;
    this.r = 0;
  }
  return CircleShape2;
}();
var Circle = function(_super) {
  __extends(Circle2, _super);
  function Circle2(opts) {
    return _super.call(this, opts) || this;
  }
  Circle2.prototype.getDefaultShape = function() {
    return new CircleShape();
  };
  Circle2.prototype.buildPath = function(ctx, shape) {
    ctx.moveTo(shape.cx + shape.r, shape.cy);
    ctx.arc(shape.cx, shape.cy, shape.r, 0, Math.PI * 2);
  };
  return Circle2;
}(Path_default);
Circle.prototype.type = "circle";
var Circle_default = Circle;

// node_modules/zrender/lib/graphic/shape/Ellipse.js
var EllipseShape = /* @__PURE__ */ function() {
  function EllipseShape2() {
    this.cx = 0;
    this.cy = 0;
    this.rx = 0;
    this.ry = 0;
  }
  return EllipseShape2;
}();
var Ellipse = function(_super) {
  __extends(Ellipse2, _super);
  function Ellipse2(opts) {
    return _super.call(this, opts) || this;
  }
  Ellipse2.prototype.getDefaultShape = function() {
    return new EllipseShape();
  };
  Ellipse2.prototype.buildPath = function(ctx, shape) {
    var k = 0.5522848;
    var x = shape.cx;
    var y = shape.cy;
    var a = shape.rx;
    var b = shape.ry;
    var ox = a * k;
    var oy = b * k;
    ctx.moveTo(x - a, y);
    ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
    ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
    ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
    ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
    ctx.closePath();
  };
  return Ellipse2;
}(Path_default);
Ellipse.prototype.type = "ellipse";
var Ellipse_default = Ellipse;

// node_modules/zrender/lib/graphic/helper/roundSector.js
var PI4 = Math.PI;
var PI26 = PI4 * 2;
var mathSin4 = Math.sin;
var mathCos4 = Math.cos;
var mathACos = Math.acos;
var mathATan2 = Math.atan2;
var mathAbs2 = Math.abs;
var mathSqrt4 = Math.sqrt;
var mathMax4 = Math.max;
var mathMin4 = Math.min;
var e = 1e-4;
function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var dx10 = x1 - x0;
  var dy10 = y1 - y0;
  var dx32 = x3 - x2;
  var dy32 = y3 - y2;
  var t = dy32 * dx10 - dx32 * dy10;
  if (t * t < e) {
    return;
  }
  t = (dx32 * (y0 - y2) - dy32 * (x0 - x2)) / t;
  return [x0 + t * dx10, y0 + t * dy10];
}
function computeCornerTangents(x0, y0, x1, y1, radius, cr, clockwise) {
  var x01 = x0 - x1;
  var y01 = y0 - y1;
  var lo = (clockwise ? cr : -cr) / mathSqrt4(x01 * x01 + y01 * y01);
  var ox = lo * y01;
  var oy = -lo * x01;
  var x11 = x0 + ox;
  var y11 = y0 + oy;
  var x10 = x1 + ox;
  var y10 = y1 + oy;
  var x00 = (x11 + x10) / 2;
  var y00 = (y11 + y10) / 2;
  var dx = x10 - x11;
  var dy = y10 - y11;
  var d2 = dx * dx + dy * dy;
  var r = radius - cr;
  var s = x11 * y10 - x10 * y11;
  var d = (dy < 0 ? -1 : 1) * mathSqrt4(mathMax4(0, r * r * d2 - s * s));
  var cx0 = (s * dy - dx * d) / d2;
  var cy0 = (-s * dx - dy * d) / d2;
  var cx1 = (s * dy + dx * d) / d2;
  var cy1 = (-s * dx + dy * d) / d2;
  var dx0 = cx0 - x00;
  var dy0 = cy0 - y00;
  var dx1 = cx1 - x00;
  var dy1 = cy1 - y00;
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) {
    cx0 = cx1;
    cy0 = cy1;
  }
  return {
    cx: cx0,
    cy: cy0,
    x0: -ox,
    y0: -oy,
    x1: cx0 * (radius / r - 1),
    y1: cy0 * (radius / r - 1)
  };
}
function normalizeCornerRadius(cr) {
  var arr;
  if (isArray(cr)) {
    var len2 = cr.length;
    if (!len2) {
      return cr;
    }
    if (len2 === 1) {
      arr = [cr[0], cr[0], 0, 0];
    } else if (len2 === 2) {
      arr = [cr[0], cr[0], cr[1], cr[1]];
    } else if (len2 === 3) {
      arr = cr.concat(cr[2]);
    } else {
      arr = cr;
    }
  } else {
    arr = [cr, cr, cr, cr];
  }
  return arr;
}
function buildPath2(ctx, shape) {
  var _a2;
  var radius = mathMax4(shape.r, 0);
  var innerRadius = mathMax4(shape.r0 || 0, 0);
  var hasRadius = radius > 0;
  var hasInnerRadius = innerRadius > 0;
  if (!hasRadius && !hasInnerRadius) {
    return;
  }
  if (!hasRadius) {
    radius = innerRadius;
    innerRadius = 0;
  }
  if (innerRadius > radius) {
    var tmp = radius;
    radius = innerRadius;
    innerRadius = tmp;
  }
  var startAngle = shape.startAngle, endAngle = shape.endAngle;
  if (isNaN(startAngle) || isNaN(endAngle)) {
    return;
  }
  var cx = shape.cx, cy = shape.cy;
  var clockwise = !!shape.clockwise;
  var arc = mathAbs2(endAngle - startAngle);
  var mod = arc > PI26 && arc % PI26;
  mod > e && (arc = mod);
  if (!(radius > e)) {
    ctx.moveTo(cx, cy);
  } else if (arc > PI26 - e) {
    ctx.moveTo(cx + radius * mathCos4(startAngle), cy + radius * mathSin4(startAngle));
    ctx.arc(cx, cy, radius, startAngle, endAngle, !clockwise);
    if (innerRadius > e) {
      ctx.moveTo(cx + innerRadius * mathCos4(endAngle), cy + innerRadius * mathSin4(endAngle));
      ctx.arc(cx, cy, innerRadius, endAngle, startAngle, clockwise);
    }
  } else {
    var icrStart = void 0;
    var icrEnd = void 0;
    var ocrStart = void 0;
    var ocrEnd = void 0;
    var ocrs = void 0;
    var ocre = void 0;
    var icrs = void 0;
    var icre = void 0;
    var ocrMax = void 0;
    var icrMax = void 0;
    var limitedOcrMax = void 0;
    var limitedIcrMax = void 0;
    var xre = void 0;
    var yre = void 0;
    var xirs = void 0;
    var yirs = void 0;
    var xrs = radius * mathCos4(startAngle);
    var yrs = radius * mathSin4(startAngle);
    var xire = innerRadius * mathCos4(endAngle);
    var yire = innerRadius * mathSin4(endAngle);
    var hasArc = arc > e;
    if (hasArc) {
      var cornerRadius = shape.cornerRadius;
      if (cornerRadius) {
        _a2 = normalizeCornerRadius(cornerRadius), icrStart = _a2[0], icrEnd = _a2[1], ocrStart = _a2[2], ocrEnd = _a2[3];
      }
      var halfRd = mathAbs2(radius - innerRadius) / 2;
      ocrs = mathMin4(halfRd, ocrStart);
      ocre = mathMin4(halfRd, ocrEnd);
      icrs = mathMin4(halfRd, icrStart);
      icre = mathMin4(halfRd, icrEnd);
      limitedOcrMax = ocrMax = mathMax4(ocrs, ocre);
      limitedIcrMax = icrMax = mathMax4(icrs, icre);
      if (ocrMax > e || icrMax > e) {
        xre = radius * mathCos4(endAngle);
        yre = radius * mathSin4(endAngle);
        xirs = innerRadius * mathCos4(startAngle);
        yirs = innerRadius * mathSin4(startAngle);
        if (arc < PI4) {
          var it_1 = intersect(xrs, yrs, xirs, yirs, xre, yre, xire, yire);
          if (it_1) {
            var x0 = xrs - it_1[0];
            var y0 = yrs - it_1[1];
            var x1 = xre - it_1[0];
            var y1 = yre - it_1[1];
            var a = 1 / mathSin4(mathACos((x0 * x1 + y0 * y1) / (mathSqrt4(x0 * x0 + y0 * y0) * mathSqrt4(x1 * x1 + y1 * y1))) / 2);
            var b = mathSqrt4(it_1[0] * it_1[0] + it_1[1] * it_1[1]);
            limitedOcrMax = mathMin4(ocrMax, (radius - b) / (a + 1));
            limitedIcrMax = mathMin4(icrMax, (innerRadius - b) / (a - 1));
          }
        }
      }
    }
    if (!hasArc) {
      ctx.moveTo(cx + xrs, cy + yrs);
    } else if (limitedOcrMax > e) {
      var crStart = mathMin4(ocrStart, limitedOcrMax);
      var crEnd = mathMin4(ocrEnd, limitedOcrMax);
      var ct0 = computeCornerTangents(xirs, yirs, xrs, yrs, radius, crStart, clockwise);
      var ct1 = computeCornerTangents(xre, yre, xire, yire, radius, crEnd, clockwise);
      ctx.moveTo(cx + ct0.cx + ct0.x0, cy + ct0.cy + ct0.y0);
      if (limitedOcrMax < ocrMax && crStart === crEnd) {
        ctx.arc(cx + ct0.cx, cy + ct0.cy, limitedOcrMax, mathATan2(ct0.y0, ct0.x0), mathATan2(ct1.y0, ct1.x0), !clockwise);
      } else {
        crStart > 0 && ctx.arc(cx + ct0.cx, cy + ct0.cy, crStart, mathATan2(ct0.y0, ct0.x0), mathATan2(ct0.y1, ct0.x1), !clockwise);
        ctx.arc(cx, cy, radius, mathATan2(ct0.cy + ct0.y1, ct0.cx + ct0.x1), mathATan2(ct1.cy + ct1.y1, ct1.cx + ct1.x1), !clockwise);
        crEnd > 0 && ctx.arc(cx + ct1.cx, cy + ct1.cy, crEnd, mathATan2(ct1.y1, ct1.x1), mathATan2(ct1.y0, ct1.x0), !clockwise);
      }
    } else {
      ctx.moveTo(cx + xrs, cy + yrs);
      ctx.arc(cx, cy, radius, startAngle, endAngle, !clockwise);
    }
    if (!(innerRadius > e) || !hasArc) {
      ctx.lineTo(cx + xire, cy + yire);
    } else if (limitedIcrMax > e) {
      var crStart = mathMin4(icrStart, limitedIcrMax);
      var crEnd = mathMin4(icrEnd, limitedIcrMax);
      var ct0 = computeCornerTangents(xire, yire, xre, yre, innerRadius, -crEnd, clockwise);
      var ct1 = computeCornerTangents(xrs, yrs, xirs, yirs, innerRadius, -crStart, clockwise);
      ctx.lineTo(cx + ct0.cx + ct0.x0, cy + ct0.cy + ct0.y0);
      if (limitedIcrMax < icrMax && crStart === crEnd) {
        ctx.arc(cx + ct0.cx, cy + ct0.cy, limitedIcrMax, mathATan2(ct0.y0, ct0.x0), mathATan2(ct1.y0, ct1.x0), !clockwise);
      } else {
        crEnd > 0 && ctx.arc(cx + ct0.cx, cy + ct0.cy, crEnd, mathATan2(ct0.y0, ct0.x0), mathATan2(ct0.y1, ct0.x1), !clockwise);
        ctx.arc(cx, cy, innerRadius, mathATan2(ct0.cy + ct0.y1, ct0.cx + ct0.x1), mathATan2(ct1.cy + ct1.y1, ct1.cx + ct1.x1), clockwise);
        crStart > 0 && ctx.arc(cx + ct1.cx, cy + ct1.cy, crStart, mathATan2(ct1.y1, ct1.x1), mathATan2(ct1.y0, ct1.x0), !clockwise);
      }
    } else {
      ctx.lineTo(cx + xire, cy + yire);
      ctx.arc(cx, cy, innerRadius, endAngle, startAngle, clockwise);
    }
  }
  ctx.closePath();
}

// node_modules/zrender/lib/graphic/shape/Sector.js
var SectorShape = /* @__PURE__ */ function() {
  function SectorShape2() {
    this.cx = 0;
    this.cy = 0;
    this.r0 = 0;
    this.r = 0;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.clockwise = true;
    this.cornerRadius = 0;
  }
  return SectorShape2;
}();
var Sector = function(_super) {
  __extends(Sector2, _super);
  function Sector2(opts) {
    return _super.call(this, opts) || this;
  }
  Sector2.prototype.getDefaultShape = function() {
    return new SectorShape();
  };
  Sector2.prototype.buildPath = function(ctx, shape) {
    buildPath2(ctx, shape);
  };
  Sector2.prototype.isZeroArea = function() {
    return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
  };
  return Sector2;
}(Path_default);
Sector.prototype.type = "sector";
var Sector_default = Sector;

// node_modules/zrender/lib/graphic/shape/Ring.js
var RingShape = /* @__PURE__ */ function() {
  function RingShape2() {
    this.cx = 0;
    this.cy = 0;
    this.r = 0;
    this.r0 = 0;
  }
  return RingShape2;
}();
var Ring = function(_super) {
  __extends(Ring2, _super);
  function Ring2(opts) {
    return _super.call(this, opts) || this;
  }
  Ring2.prototype.getDefaultShape = function() {
    return new RingShape();
  };
  Ring2.prototype.buildPath = function(ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var PI28 = Math.PI * 2;
    ctx.moveTo(x + shape.r, y);
    ctx.arc(x, y, shape.r, 0, PI28, false);
    ctx.moveTo(x + shape.r0, y);
    ctx.arc(x, y, shape.r0, 0, PI28, true);
  };
  return Ring2;
}(Path_default);
Ring.prototype.type = "ring";
var Ring_default = Ring;

// node_modules/zrender/lib/graphic/helper/smoothBezier.js
function smoothBezier(points2, smooth, isLoop, constraint) {
  var cps = [];
  var v = [];
  var v1 = [];
  var v2 = [];
  var prevPoint;
  var nextPoint;
  var min3;
  var max3;
  if (constraint) {
    min3 = [Infinity, Infinity];
    max3 = [-Infinity, -Infinity];
    for (var i = 0, len2 = points2.length; i < len2; i++) {
      min(min3, min3, points2[i]);
      max(max3, max3, points2[i]);
    }
    min(min3, min3, constraint[0]);
    max(max3, max3, constraint[1]);
  }
  for (var i = 0, len2 = points2.length; i < len2; i++) {
    var point = points2[i];
    if (isLoop) {
      prevPoint = points2[i ? i - 1 : len2 - 1];
      nextPoint = points2[(i + 1) % len2];
    } else {
      if (i === 0 || i === len2 - 1) {
        cps.push(clone2(points2[i]));
        continue;
      } else {
        prevPoint = points2[i - 1];
        nextPoint = points2[i + 1];
      }
    }
    sub(v, nextPoint, prevPoint);
    scale2(v, v, smooth);
    var d0 = distance(point, prevPoint);
    var d1 = distance(point, nextPoint);
    var sum = d0 + d1;
    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }
    scale2(v1, v, -d0);
    scale2(v2, v, d1);
    var cp0 = add([], point, v1);
    var cp1 = add([], point, v2);
    if (constraint) {
      max(cp0, cp0, min3);
      min(cp0, cp0, max3);
      max(cp1, cp1, min3);
      min(cp1, cp1, max3);
    }
    cps.push(cp0);
    cps.push(cp1);
  }
  if (isLoop) {
    cps.push(cps.shift());
  }
  return cps;
}

// node_modules/zrender/lib/graphic/helper/poly.js
function buildPath3(ctx, shape, closePath) {
  var smooth = shape.smooth;
  var points2 = shape.points;
  if (points2 && points2.length >= 2) {
    if (smooth) {
      var controlPoints = smoothBezier(points2, smooth, closePath, shape.smoothConstraint);
      ctx.moveTo(points2[0][0], points2[0][1]);
      var len2 = points2.length;
      for (var i = 0; i < (closePath ? len2 : len2 - 1); i++) {
        var cp1 = controlPoints[i * 2];
        var cp2 = controlPoints[i * 2 + 1];
        var p = points2[(i + 1) % len2];
        ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]);
      }
    } else {
      ctx.moveTo(points2[0][0], points2[0][1]);
      for (var i = 1, l = points2.length; i < l; i++) {
        ctx.lineTo(points2[i][0], points2[i][1]);
      }
    }
    closePath && ctx.closePath();
  }
}

// node_modules/zrender/lib/graphic/shape/Polygon.js
var PolygonShape = /* @__PURE__ */ function() {
  function PolygonShape2() {
    this.points = null;
    this.smooth = 0;
    this.smoothConstraint = null;
  }
  return PolygonShape2;
}();
var Polygon = function(_super) {
  __extends(Polygon2, _super);
  function Polygon2(opts) {
    return _super.call(this, opts) || this;
  }
  Polygon2.prototype.getDefaultShape = function() {
    return new PolygonShape();
  };
  Polygon2.prototype.buildPath = function(ctx, shape) {
    buildPath3(ctx, shape, true);
  };
  return Polygon2;
}(Path_default);
Polygon.prototype.type = "polygon";
var Polygon_default = Polygon;

// node_modules/zrender/lib/graphic/shape/Polyline.js
var PolylineShape = /* @__PURE__ */ function() {
  function PolylineShape2() {
    this.points = null;
    this.percent = 1;
    this.smooth = 0;
    this.smoothConstraint = null;
  }
  return PolylineShape2;
}();
var Polyline = function(_super) {
  __extends(Polyline2, _super);
  function Polyline2(opts) {
    return _super.call(this, opts) || this;
  }
  Polyline2.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  };
  Polyline2.prototype.getDefaultShape = function() {
    return new PolylineShape();
  };
  Polyline2.prototype.buildPath = function(ctx, shape) {
    buildPath3(ctx, shape, false);
  };
  return Polyline2;
}(Path_default);
Polyline.prototype.type = "polyline";
var Polyline_default = Polyline;

// node_modules/zrender/lib/graphic/shape/Line.js
var subPixelOptimizeOutputShape2 = {};
var LineShape = /* @__PURE__ */ function() {
  function LineShape2() {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.percent = 1;
  }
  return LineShape2;
}();
var Line = function(_super) {
  __extends(Line2, _super);
  function Line2(opts) {
    return _super.call(this, opts) || this;
  }
  Line2.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  };
  Line2.prototype.getDefaultShape = function() {
    return new LineShape();
  };
  Line2.prototype.buildPath = function(ctx, shape) {
    var x1;
    var y1;
    var x2;
    var y2;
    if (this.subPixelOptimize) {
      var optimizedShape = subPixelOptimizeLine(subPixelOptimizeOutputShape2, shape, this.style);
      x1 = optimizedShape.x1;
      y1 = optimizedShape.y1;
      x2 = optimizedShape.x2;
      y2 = optimizedShape.y2;
    } else {
      x1 = shape.x1;
      y1 = shape.y1;
      x2 = shape.x2;
      y2 = shape.y2;
    }
    var percent = shape.percent;
    if (percent === 0) {
      return;
    }
    ctx.moveTo(x1, y1);
    if (percent < 1) {
      x2 = x1 * (1 - percent) + x2 * percent;
      y2 = y1 * (1 - percent) + y2 * percent;
    }
    ctx.lineTo(x2, y2);
  };
  Line2.prototype.pointAt = function(p) {
    var shape = this.shape;
    return [
      shape.x1 * (1 - p) + shape.x2 * p,
      shape.y1 * (1 - p) + shape.y2 * p
    ];
  };
  return Line2;
}(Path_default);
Line.prototype.type = "line";
var Line_default = Line;

// node_modules/zrender/lib/graphic/shape/BezierCurve.js
var out = [];
var BezierCurveShape = /* @__PURE__ */ function() {
  function BezierCurveShape2() {
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.cpx1 = 0;
    this.cpy1 = 0;
    this.percent = 1;
  }
  return BezierCurveShape2;
}();
function someVectorAt(shape, t, isTangent) {
  var cpx2 = shape.cpx2;
  var cpy2 = shape.cpy2;
  if (cpx2 != null || cpy2 != null) {
    return [
      (isTangent ? cubicDerivativeAt : cubicAt)(shape.x1, shape.cpx1, shape.cpx2, shape.x2, t),
      (isTangent ? cubicDerivativeAt : cubicAt)(shape.y1, shape.cpy1, shape.cpy2, shape.y2, t)
    ];
  } else {
    return [
      (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.x1, shape.cpx1, shape.x2, t),
      (isTangent ? quadraticDerivativeAt : quadraticAt)(shape.y1, shape.cpy1, shape.y2, t)
    ];
  }
}
var BezierCurve = function(_super) {
  __extends(BezierCurve2, _super);
  function BezierCurve2(opts) {
    return _super.call(this, opts) || this;
  }
  BezierCurve2.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  };
  BezierCurve2.prototype.getDefaultShape = function() {
    return new BezierCurveShape();
  };
  BezierCurve2.prototype.buildPath = function(ctx, shape) {
    var x1 = shape.x1;
    var y1 = shape.y1;
    var x2 = shape.x2;
    var y2 = shape.y2;
    var cpx1 = shape.cpx1;
    var cpy1 = shape.cpy1;
    var cpx2 = shape.cpx2;
    var cpy2 = shape.cpy2;
    var percent = shape.percent;
    if (percent === 0) {
      return;
    }
    ctx.moveTo(x1, y1);
    if (cpx2 == null || cpy2 == null) {
      if (percent < 1) {
        quadraticSubdivide(x1, cpx1, x2, percent, out);
        cpx1 = out[1];
        x2 = out[2];
        quadraticSubdivide(y1, cpy1, y2, percent, out);
        cpy1 = out[1];
        y2 = out[2];
      }
      ctx.quadraticCurveTo(cpx1, cpy1, x2, y2);
    } else {
      if (percent < 1) {
        cubicSubdivide(x1, cpx1, cpx2, x2, percent, out);
        cpx1 = out[1];
        cpx2 = out[2];
        x2 = out[3];
        cubicSubdivide(y1, cpy1, cpy2, y2, percent, out);
        cpy1 = out[1];
        cpy2 = out[2];
        y2 = out[3];
      }
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2);
    }
  };
  BezierCurve2.prototype.pointAt = function(t) {
    return someVectorAt(this.shape, t, false);
  };
  BezierCurve2.prototype.tangentAt = function(t) {
    var p = someVectorAt(this.shape, t, true);
    return normalize(p, p);
  };
  return BezierCurve2;
}(Path_default);
BezierCurve.prototype.type = "bezier-curve";
var BezierCurve_default = BezierCurve;

// node_modules/zrender/lib/graphic/shape/Arc.js
var ArcShape = /* @__PURE__ */ function() {
  function ArcShape2() {
    this.cx = 0;
    this.cy = 0;
    this.r = 0;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.clockwise = true;
  }
  return ArcShape2;
}();
var Arc = function(_super) {
  __extends(Arc2, _super);
  function Arc2(opts) {
    return _super.call(this, opts) || this;
  }
  Arc2.prototype.getDefaultStyle = function() {
    return {
      stroke: "#000",
      fill: null
    };
  };
  Arc2.prototype.getDefaultShape = function() {
    return new ArcShape();
  };
  Arc2.prototype.buildPath = function(ctx, shape) {
    var x = shape.cx;
    var y = shape.cy;
    var r = Math.max(shape.r, 0);
    var startAngle = shape.startAngle;
    var endAngle = shape.endAngle;
    var clockwise = shape.clockwise;
    var unitX = Math.cos(startAngle);
    var unitY = Math.sin(startAngle);
    ctx.moveTo(unitX * r + x, unitY * r + y);
    ctx.arc(x, y, r, startAngle, endAngle, !clockwise);
  };
  return Arc2;
}(Path_default);
Arc.prototype.type = "arc";
var Arc_default = Arc;

// node_modules/zrender/lib/graphic/CompoundPath.js
var CompoundPath = function(_super) {
  __extends(CompoundPath2, _super);
  function CompoundPath2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.type = "compound";
    return _this;
  }
  CompoundPath2.prototype._updatePathDirty = function() {
    var paths = this.shape.paths;
    var dirtyPath = this.shapeChanged();
    for (var i = 0; i < paths.length; i++) {
      dirtyPath = dirtyPath || paths[i].shapeChanged();
    }
    if (dirtyPath) {
      this.dirtyShape();
    }
  };
  CompoundPath2.prototype.beforeBrush = function() {
    this._updatePathDirty();
    var paths = this.shape.paths || [];
    var scale3 = this.getGlobalScale();
    for (var i = 0; i < paths.length; i++) {
      if (!paths[i].path) {
        paths[i].createPathProxy();
      }
      paths[i].path.setScale(scale3[0], scale3[1], paths[i].segmentIgnoreThreshold);
    }
  };
  CompoundPath2.prototype.buildPath = function(ctx, shape) {
    var paths = shape.paths || [];
    for (var i = 0; i < paths.length; i++) {
      paths[i].buildPath(ctx, paths[i].shape, true);
    }
  };
  CompoundPath2.prototype.afterBrush = function() {
    var paths = this.shape.paths || [];
    for (var i = 0; i < paths.length; i++) {
      paths[i].pathUpdated();
    }
  };
  CompoundPath2.prototype.getBoundingRect = function() {
    this._updatePathDirty.call(this);
    return Path_default.prototype.getBoundingRect.call(this);
  };
  return CompoundPath2;
}(Path_default);
var CompoundPath_default = CompoundPath;

// node_modules/echarts/lib/animation/basicTransition.js
var transitionStore = makeInner();
function isElementRemoved(el) {
  if (!el.__zr) {
    return true;
  }
  for (var i = 0; i < el.animators.length; i++) {
    var animator = el.animators[i];
    if (animator.scope === "leave") {
      return true;
    }
  }
  return false;
}

// node_modules/echarts/lib/util/graphic.js
var _customShapeMap = {};
function registerShape(name, ShapeClass) {
  _customShapeMap[name] = ShapeClass;
}
function makePath(pathData, opts, rect, layout) {
  var path3 = createFromString(pathData, opts);
  if (rect) {
    if (layout === "center") {
      rect = centerGraphic(rect, path3.getBoundingRect());
    }
    resizePath(path3, rect);
  }
  return path3;
}
function makeImage(imageUrl, rect, layout) {
  var zrImg = new Image_default({
    style: {
      image: imageUrl,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    onload: function(img) {
      if (layout === "center") {
        var boundingRect = {
          width: img.width,
          height: img.height
        };
        zrImg.setStyle(centerGraphic(rect, boundingRect));
      }
    }
  });
  return zrImg;
}
function centerGraphic(rect, boundingRect) {
  var aspect = boundingRect.width / boundingRect.height;
  var width = rect.height * aspect;
  var height;
  if (width <= rect.width) {
    height = rect.height;
  } else {
    width = rect.width;
    height = width / aspect;
  }
  var cx = rect.x + rect.width / 2;
  var cy = rect.y + rect.height / 2;
  return {
    x: cx - width / 2,
    y: cy - height / 2,
    width,
    height
  };
}
function resizePath(path3, rect) {
  if (!path3.applyTransform) {
    return;
  }
  var pathRect = path3.getBoundingRect();
  var m = pathRect.calculateTransform(rect);
  path3.applyTransform(m);
}
function traverseElement(el, cb) {
  var stopped;
  if (el.isGroup) {
    stopped = cb(el);
  }
  if (!stopped) {
    el.traverse(cb);
  }
}
function traverseElements(els, cb) {
  if (els) {
    if (isArray(els)) {
      for (var i = 0; i < els.length; i++) {
        traverseElement(els[i], cb);
      }
    } else {
      traverseElement(els, cb);
    }
  }
}
registerShape("circle", Circle_default);
registerShape("ellipse", Ellipse_default);
registerShape("sector", Sector_default);
registerShape("ring", Ring_default);
registerShape("polygon", Polygon_default);
registerShape("polyline", Polyline_default);
registerShape("rect", Rect_default);
registerShape("line", Line_default);
registerShape("bezierCurve", BezierCurve_default);
registerShape("arc", Arc_default);

// node_modules/echarts/lib/label/labelStyle.js
var EMPTY_OBJ = {};
function setLabelText(label, labelTexts) {
  for (var i = 0; i < SPECIAL_STATES.length; i++) {
    var stateName = SPECIAL_STATES[i];
    var text = labelTexts[stateName];
    var state = label.ensureState(stateName);
    state.style = state.style || {};
    state.style.text = text;
  }
  var oldStates = label.currentStates.slice();
  label.clearStates(true);
  label.setStyle({
    text: labelTexts.normal
  });
  label.useStates(oldStates, true);
}
function getLabelText(opt, stateModels, interpolatedValue) {
  var labelFetcher = opt.labelFetcher;
  var labelDataIndex = opt.labelDataIndex;
  var labelDimIndex = opt.labelDimIndex;
  var normalModel = stateModels.normal;
  var baseText;
  if (labelFetcher) {
    baseText = labelFetcher.getFormattedLabel(labelDataIndex, "normal", null, labelDimIndex, normalModel && normalModel.get("formatter"), interpolatedValue != null ? {
      interpolatedValue
    } : null);
  }
  if (baseText == null) {
    baseText = isFunction(opt.defaultText) ? opt.defaultText(labelDataIndex, opt, interpolatedValue) : opt.defaultText;
  }
  var statesText = {
    normal: baseText
  };
  for (var i = 0; i < SPECIAL_STATES.length; i++) {
    var stateName = SPECIAL_STATES[i];
    var stateModel = stateModels[stateName];
    statesText[stateName] = retrieve2(labelFetcher ? labelFetcher.getFormattedLabel(labelDataIndex, stateName, null, labelDimIndex, stateModel && stateModel.get("formatter")) : null, baseText);
  }
  return statesText;
}
function setLabelStyle(targetEl, labelStatesModels, opt, stateSpecified) {
  opt = opt || EMPTY_OBJ;
  var isSetOnText = targetEl instanceof Text_default;
  var needsCreateText = false;
  for (var i = 0; i < DISPLAY_STATES.length; i++) {
    var stateModel = labelStatesModels[DISPLAY_STATES[i]];
    if (stateModel && stateModel.getShallow("show")) {
      needsCreateText = true;
      break;
    }
  }
  var textContent = isSetOnText ? targetEl : targetEl.getTextContent();
  if (needsCreateText) {
    if (!isSetOnText) {
      if (!textContent) {
        textContent = new Text_default();
        targetEl.setTextContent(textContent);
      }
      if (targetEl.stateProxy) {
        textContent.stateProxy = targetEl.stateProxy;
      }
    }
    var labelStatesTexts = getLabelText(opt, labelStatesModels);
    var normalModel = labelStatesModels.normal;
    var showNormal = !!normalModel.getShallow("show");
    var normalStyle = createTextStyle(normalModel, stateSpecified && stateSpecified.normal, opt, false, !isSetOnText);
    normalStyle.text = labelStatesTexts.normal;
    if (!isSetOnText) {
      targetEl.setTextConfig(createTextConfig(normalModel, opt, false));
    }
    for (var i = 0; i < SPECIAL_STATES.length; i++) {
      var stateName = SPECIAL_STATES[i];
      var stateModel = labelStatesModels[stateName];
      if (stateModel) {
        var stateObj = textContent.ensureState(stateName);
        var stateShow = !!retrieve2(stateModel.getShallow("show"), showNormal);
        if (stateShow !== showNormal) {
          stateObj.ignore = !stateShow;
        }
        stateObj.style = createTextStyle(stateModel, stateSpecified && stateSpecified[stateName], opt, true, !isSetOnText);
        stateObj.style.text = labelStatesTexts[stateName];
        if (!isSetOnText) {
          var targetElEmphasisState = targetEl.ensureState(stateName);
          targetElEmphasisState.textConfig = createTextConfig(stateModel, opt, true);
        }
      }
    }
    textContent.silent = !!normalModel.getShallow("silent");
    if (textContent.style.x != null) {
      normalStyle.x = textContent.style.x;
    }
    if (textContent.style.y != null) {
      normalStyle.y = textContent.style.y;
    }
    textContent.ignore = !showNormal;
    textContent.useStyle(normalStyle);
    textContent.dirty();
    if (opt.enableTextSetter) {
      labelInner(textContent).setLabelText = function(interpolatedValue) {
        var labelStatesTexts2 = getLabelText(opt, labelStatesModels, interpolatedValue);
        setLabelText(textContent, labelStatesTexts2);
      };
    }
  } else if (textContent) {
    textContent.ignore = true;
  }
  targetEl.dirty();
}
function getLabelStatesModels(itemModel, labelName) {
  labelName = labelName || "label";
  var statesModels = {
    normal: itemModel.getModel(labelName)
  };
  for (var i = 0; i < SPECIAL_STATES.length; i++) {
    var stateName = SPECIAL_STATES[i];
    statesModels[stateName] = itemModel.getModel([stateName, labelName]);
  }
  return statesModels;
}
function createTextStyle(textStyleModel, specifiedTextStyle, opt, isNotNormal, isAttached) {
  var textStyle = {};
  setTextStyleCommon(textStyle, textStyleModel, opt, isNotNormal, isAttached);
  specifiedTextStyle && extend(textStyle, specifiedTextStyle);
  return textStyle;
}
function createTextConfig(textStyleModel, opt, isNotNormal) {
  opt = opt || {};
  var textConfig = {};
  var labelPosition;
  var labelRotate = textStyleModel.getShallow("rotate");
  var labelDistance = retrieve2(textStyleModel.getShallow("distance"), isNotNormal ? null : 5);
  var labelOffset = textStyleModel.getShallow("offset");
  labelPosition = textStyleModel.getShallow("position") || (isNotNormal ? null : "inside");
  labelPosition === "outside" && (labelPosition = opt.defaultOutsidePosition || "top");
  if (labelPosition != null) {
    textConfig.position = labelPosition;
  }
  if (labelOffset != null) {
    textConfig.offset = labelOffset;
  }
  if (labelRotate != null) {
    labelRotate *= Math.PI / 180;
    textConfig.rotation = labelRotate;
  }
  if (labelDistance != null) {
    textConfig.distance = labelDistance;
  }
  textConfig.outsideFill = textStyleModel.get("color") === "inherit" ? opt.inheritColor || null : "auto";
  return textConfig;
}
function setTextStyleCommon(textStyle, textStyleModel, opt, isNotNormal, isAttached) {
  opt = opt || EMPTY_OBJ;
  var ecModel = textStyleModel.ecModel;
  var globalTextStyle = ecModel && ecModel.option.textStyle;
  var richItemNames = getRichItemNames(textStyleModel);
  var richResult;
  if (richItemNames) {
    richResult = {};
    for (var name_1 in richItemNames) {
      if (richItemNames.hasOwnProperty(name_1)) {
        var richTextStyle = textStyleModel.getModel(["rich", name_1]);
        setTokenTextStyle(richResult[name_1] = {}, richTextStyle, globalTextStyle, opt, isNotNormal, isAttached, false, true);
      }
    }
  }
  if (richResult) {
    textStyle.rich = richResult;
  }
  var overflow = textStyleModel.get("overflow");
  if (overflow) {
    textStyle.overflow = overflow;
  }
  var margin = textStyleModel.get("minMargin");
  if (margin != null) {
    textStyle.margin = margin;
  }
  setTokenTextStyle(textStyle, textStyleModel, globalTextStyle, opt, isNotNormal, isAttached, true, false);
}
function getRichItemNames(textStyleModel) {
  var richItemNameMap;
  while (textStyleModel && textStyleModel !== textStyleModel.ecModel) {
    var rich = (textStyleModel.option || EMPTY_OBJ).rich;
    if (rich) {
      richItemNameMap = richItemNameMap || {};
      var richKeys = keys(rich);
      for (var i = 0; i < richKeys.length; i++) {
        var richKey = richKeys[i];
        richItemNameMap[richKey] = 1;
      }
    }
    textStyleModel = textStyleModel.parentModel;
  }
  return richItemNameMap;
}
var TEXT_PROPS_WITH_GLOBAL = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY"];
var TEXT_PROPS_SELF = ["align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis"];
var TEXT_PROPS_BOX = ["padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
function setTokenTextStyle(textStyle, textStyleModel, globalTextStyle, opt, isNotNormal, isAttached, isBlock, inRich) {
  globalTextStyle = !isNotNormal && globalTextStyle || EMPTY_OBJ;
  var inheritColor = opt && opt.inheritColor;
  var fillColor = textStyleModel.getShallow("color");
  var strokeColor = textStyleModel.getShallow("textBorderColor");
  var opacity = retrieve2(textStyleModel.getShallow("opacity"), globalTextStyle.opacity);
  if (fillColor === "inherit" || fillColor === "auto") {
    if (process.env.NODE_ENV !== "production") {
      if (fillColor === "auto") {
        deprecateReplaceLog("color: 'auto'", "color: 'inherit'");
      }
    }
    if (inheritColor) {
      fillColor = inheritColor;
    } else {
      fillColor = null;
    }
  }
  if (strokeColor === "inherit" || strokeColor === "auto") {
    if (process.env.NODE_ENV !== "production") {
      if (strokeColor === "auto") {
        deprecateReplaceLog("color: 'auto'", "color: 'inherit'");
      }
    }
    if (inheritColor) {
      strokeColor = inheritColor;
    } else {
      strokeColor = null;
    }
  }
  if (!isAttached) {
    fillColor = fillColor || globalTextStyle.color;
    strokeColor = strokeColor || globalTextStyle.textBorderColor;
  }
  if (fillColor != null) {
    textStyle.fill = fillColor;
  }
  if (strokeColor != null) {
    textStyle.stroke = strokeColor;
  }
  var textBorderWidth = retrieve2(textStyleModel.getShallow("textBorderWidth"), globalTextStyle.textBorderWidth);
  if (textBorderWidth != null) {
    textStyle.lineWidth = textBorderWidth;
  }
  var textBorderType = retrieve2(textStyleModel.getShallow("textBorderType"), globalTextStyle.textBorderType);
  if (textBorderType != null) {
    textStyle.lineDash = textBorderType;
  }
  var textBorderDashOffset = retrieve2(textStyleModel.getShallow("textBorderDashOffset"), globalTextStyle.textBorderDashOffset);
  if (textBorderDashOffset != null) {
    textStyle.lineDashOffset = textBorderDashOffset;
  }
  if (!isNotNormal && opacity == null && !inRich) {
    opacity = opt && opt.defaultOpacity;
  }
  if (opacity != null) {
    textStyle.opacity = opacity;
  }
  if (!isNotNormal && !isAttached) {
    if (textStyle.fill == null && opt.inheritColor) {
      textStyle.fill = opt.inheritColor;
    }
  }
  for (var i = 0; i < TEXT_PROPS_WITH_GLOBAL.length; i++) {
    var key = TEXT_PROPS_WITH_GLOBAL[i];
    var val = retrieve2(textStyleModel.getShallow(key), globalTextStyle[key]);
    if (val != null) {
      textStyle[key] = val;
    }
  }
  for (var i = 0; i < TEXT_PROPS_SELF.length; i++) {
    var key = TEXT_PROPS_SELF[i];
    var val = textStyleModel.getShallow(key);
    if (val != null) {
      textStyle[key] = val;
    }
  }
  if (textStyle.verticalAlign == null) {
    var baseline = textStyleModel.getShallow("baseline");
    if (baseline != null) {
      textStyle.verticalAlign = baseline;
    }
  }
  if (!isBlock || !opt.disableBox) {
    for (var i = 0; i < TEXT_PROPS_BOX.length; i++) {
      var key = TEXT_PROPS_BOX[i];
      var val = textStyleModel.getShallow(key);
      if (val != null) {
        textStyle[key] = val;
      }
    }
    var borderType = textStyleModel.getShallow("borderType");
    if (borderType != null) {
      textStyle.borderDash = borderType;
    }
    if ((textStyle.backgroundColor === "auto" || textStyle.backgroundColor === "inherit") && inheritColor) {
      if (process.env.NODE_ENV !== "production") {
        if (textStyle.backgroundColor === "auto") {
          deprecateReplaceLog("backgroundColor: 'auto'", "backgroundColor: 'inherit'");
        }
      }
      textStyle.backgroundColor = inheritColor;
    }
    if ((textStyle.borderColor === "auto" || textStyle.borderColor === "inherit") && inheritColor) {
      if (process.env.NODE_ENV !== "production") {
        if (textStyle.borderColor === "auto") {
          deprecateReplaceLog("borderColor: 'auto'", "borderColor: 'inherit'");
        }
      }
      textStyle.borderColor = inheritColor;
    }
  }
}
function getFont(opt, ecModel) {
  var gTextStyleModel = ecModel && ecModel.getModel("textStyle");
  return trim([
    // FIXME in node-canvas fontWeight is before fontStyle
    opt.fontStyle || gTextStyleModel && gTextStyleModel.getShallow("fontStyle") || "",
    opt.fontWeight || gTextStyleModel && gTextStyleModel.getShallow("fontWeight") || "",
    (opt.fontSize || gTextStyleModel && gTextStyleModel.getShallow("fontSize") || 12) + "px",
    opt.fontFamily || gTextStyleModel && gTextStyleModel.getShallow("fontFamily") || "sans-serif"
  ].join(" "));
}
var labelInner = makeInner();

// node_modules/echarts/lib/model/mixin/textStyle.js
var PATH_COLOR = ["textStyle", "color"];
var textStyleParams = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow"];
var tmpText = new Text_default();
var TextStyleMixin = (
  /** @class */
  function() {
    function TextStyleMixin2() {
    }
    TextStyleMixin2.prototype.getTextColor = function(isEmphasis) {
      var ecModel = this.ecModel;
      return this.getShallow("color") || (!isEmphasis && ecModel ? ecModel.get(PATH_COLOR) : null);
    };
    TextStyleMixin2.prototype.getFont = function() {
      return getFont({
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      }, this.ecModel);
    };
    TextStyleMixin2.prototype.getTextRect = function(text) {
      var style = {
        text,
        verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
      };
      for (var i = 0; i < textStyleParams.length; i++) {
        style[textStyleParams[i]] = this.getShallow(textStyleParams[i]);
      }
      tmpText.useStyle(style);
      tmpText.update();
      return tmpText.getBoundingRect();
    };
    return TextStyleMixin2;
  }()
);
var textStyle_default = TextStyleMixin;

// node_modules/echarts/lib/model/mixin/lineStyle.js
var LINE_STYLE_KEY_MAP = [
  ["lineWidth", "width"],
  ["stroke", "color"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "type"],
  ["lineDashOffset", "dashOffset"],
  ["lineCap", "cap"],
  ["lineJoin", "join"],
  ["miterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
];
var getLineStyle = makeStyleMapper(LINE_STYLE_KEY_MAP);
var LineStyleMixin = (
  /** @class */
  function() {
    function LineStyleMixin2() {
    }
    LineStyleMixin2.prototype.getLineStyle = function(excludes) {
      return getLineStyle(this, excludes);
    };
    return LineStyleMixin2;
  }()
);

// node_modules/echarts/lib/model/mixin/itemStyle.js
var ITEM_STYLE_KEY_MAP = [
  ["fill", "color"],
  ["stroke", "borderColor"],
  ["lineWidth", "borderWidth"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "borderType"],
  ["lineDashOffset", "borderDashOffset"],
  ["lineCap", "borderCap"],
  ["lineJoin", "borderJoin"],
  ["miterLimit", "borderMiterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
];
var getItemStyle = makeStyleMapper(ITEM_STYLE_KEY_MAP);
var ItemStyleMixin = (
  /** @class */
  function() {
    function ItemStyleMixin2() {
    }
    ItemStyleMixin2.prototype.getItemStyle = function(excludes, includes) {
      return getItemStyle(this, excludes, includes);
    };
    return ItemStyleMixin2;
  }()
);

// node_modules/echarts/lib/model/Model.js
var Model = (
  /** @class */
  function() {
    function Model2(option, parentModel, ecModel) {
      this.parentModel = parentModel;
      this.ecModel = ecModel;
      this.option = option;
    }
    Model2.prototype.init = function(option, parentModel, ecModel) {
      var rest = [];
      for (var _i = 3; _i < arguments.length; _i++) {
        rest[_i - 3] = arguments[_i];
      }
    };
    Model2.prototype.mergeOption = function(option, ecModel) {
      merge(this.option, option, true);
    };
    Model2.prototype.get = function(path3, ignoreParent) {
      if (path3 == null) {
        return this.option;
      }
      return this._doGet(this.parsePath(path3), !ignoreParent && this.parentModel);
    };
    Model2.prototype.getShallow = function(key, ignoreParent) {
      var option = this.option;
      var val = option == null ? option : option[key];
      if (val == null && !ignoreParent) {
        var parentModel = this.parentModel;
        if (parentModel) {
          val = parentModel.getShallow(key);
        }
      }
      return val;
    };
    Model2.prototype.getModel = function(path3, parentModel) {
      var hasPath = path3 != null;
      var pathFinal = hasPath ? this.parsePath(path3) : null;
      var obj = hasPath ? this._doGet(pathFinal) : this.option;
      parentModel = parentModel || this.parentModel && this.parentModel.getModel(this.resolveParentPath(pathFinal));
      return new Model2(obj, parentModel, this.ecModel);
    };
    Model2.prototype.isEmpty = function() {
      return this.option == null;
    };
    Model2.prototype.restoreData = function() {
    };
    Model2.prototype.clone = function() {
      var Ctor = this.constructor;
      return new Ctor(clone(this.option));
    };
    Model2.prototype.parsePath = function(path3) {
      if (typeof path3 === "string") {
        return path3.split(".");
      }
      return path3;
    };
    Model2.prototype.resolveParentPath = function(path3) {
      return path3;
    };
    Model2.prototype.isAnimationEnabled = function() {
      if (!env_default.node && this.option) {
        if (this.option.animation != null) {
          return !!this.option.animation;
        } else if (this.parentModel) {
          return this.parentModel.isAnimationEnabled();
        }
      }
    };
    Model2.prototype._doGet = function(pathArr, parentModel) {
      var obj = this.option;
      if (!pathArr) {
        return obj;
      }
      for (var i = 0; i < pathArr.length; i++) {
        if (!pathArr[i]) {
          continue;
        }
        obj = obj && typeof obj === "object" ? obj[pathArr[i]] : null;
        if (obj == null) {
          break;
        }
      }
      if (obj == null && parentModel) {
        obj = parentModel._doGet(this.resolveParentPath(pathArr), parentModel.parentModel);
      }
      return obj;
    };
    return Model2;
  }()
);
enableClassExtend(Model);
enableClassCheck(Model);
mixin(Model, LineStyleMixin);
mixin(Model, ItemStyleMixin);
mixin(Model, AreaStyleMixin);
mixin(Model, textStyle_default);
var Model_default = Model;

// node_modules/echarts/lib/data/DataDiffer.js
function dataIndexMapValueLength(valNumOrArrLengthMoreThan2) {
  return valNumOrArrLengthMoreThan2 == null ? 0 : valNumOrArrLengthMoreThan2.length || 1;
}
function defaultKeyGetter(item) {
  return item;
}
var DataDiffer = (
  /** @class */
  function() {
    function DataDiffer2(oldArr, newArr, oldKeyGetter, newKeyGetter, context, diffMode) {
      this._old = oldArr;
      this._new = newArr;
      this._oldKeyGetter = oldKeyGetter || defaultKeyGetter;
      this._newKeyGetter = newKeyGetter || defaultKeyGetter;
      this.context = context;
      this._diffModeMultiple = diffMode === "multiple";
    }
    DataDiffer2.prototype.add = function(func) {
      this._add = func;
      return this;
    };
    DataDiffer2.prototype.update = function(func) {
      this._update = func;
      return this;
    };
    DataDiffer2.prototype.updateManyToOne = function(func) {
      this._updateManyToOne = func;
      return this;
    };
    DataDiffer2.prototype.updateOneToMany = function(func) {
      this._updateOneToMany = func;
      return this;
    };
    DataDiffer2.prototype.updateManyToMany = function(func) {
      this._updateManyToMany = func;
      return this;
    };
    DataDiffer2.prototype.remove = function(func) {
      this._remove = func;
      return this;
    };
    DataDiffer2.prototype.execute = function() {
      this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
    };
    DataDiffer2.prototype._executeOneToOne = function() {
      var oldArr = this._old;
      var newArr = this._new;
      var newDataIndexMap = {};
      var oldDataKeyArr = new Array(oldArr.length);
      var newDataKeyArr = new Array(newArr.length);
      this._initIndexMap(oldArr, null, oldDataKeyArr, "_oldKeyGetter");
      this._initIndexMap(newArr, newDataIndexMap, newDataKeyArr, "_newKeyGetter");
      for (var i = 0; i < oldArr.length; i++) {
        var oldKey = oldDataKeyArr[i];
        var newIdxMapVal = newDataIndexMap[oldKey];
        var newIdxMapValLen = dataIndexMapValueLength(newIdxMapVal);
        if (newIdxMapValLen > 1) {
          var newIdx = newIdxMapVal.shift();
          if (newIdxMapVal.length === 1) {
            newDataIndexMap[oldKey] = newIdxMapVal[0];
          }
          this._update && this._update(newIdx, i);
        } else if (newIdxMapValLen === 1) {
          newDataIndexMap[oldKey] = null;
          this._update && this._update(newIdxMapVal, i);
        } else {
          this._remove && this._remove(i);
        }
      }
      this._performRestAdd(newDataKeyArr, newDataIndexMap);
    };
    DataDiffer2.prototype._executeMultiple = function() {
      var oldArr = this._old;
      var newArr = this._new;
      var oldDataIndexMap = {};
      var newDataIndexMap = {};
      var oldDataKeyArr = [];
      var newDataKeyArr = [];
      this._initIndexMap(oldArr, oldDataIndexMap, oldDataKeyArr, "_oldKeyGetter");
      this._initIndexMap(newArr, newDataIndexMap, newDataKeyArr, "_newKeyGetter");
      for (var i = 0; i < oldDataKeyArr.length; i++) {
        var oldKey = oldDataKeyArr[i];
        var oldIdxMapVal = oldDataIndexMap[oldKey];
        var newIdxMapVal = newDataIndexMap[oldKey];
        var oldIdxMapValLen = dataIndexMapValueLength(oldIdxMapVal);
        var newIdxMapValLen = dataIndexMapValueLength(newIdxMapVal);
        if (oldIdxMapValLen > 1 && newIdxMapValLen === 1) {
          this._updateManyToOne && this._updateManyToOne(newIdxMapVal, oldIdxMapVal);
          newDataIndexMap[oldKey] = null;
        } else if (oldIdxMapValLen === 1 && newIdxMapValLen > 1) {
          this._updateOneToMany && this._updateOneToMany(newIdxMapVal, oldIdxMapVal);
          newDataIndexMap[oldKey] = null;
        } else if (oldIdxMapValLen === 1 && newIdxMapValLen === 1) {
          this._update && this._update(newIdxMapVal, oldIdxMapVal);
          newDataIndexMap[oldKey] = null;
        } else if (oldIdxMapValLen > 1 && newIdxMapValLen > 1) {
          this._updateManyToMany && this._updateManyToMany(newIdxMapVal, oldIdxMapVal);
          newDataIndexMap[oldKey] = null;
        } else if (oldIdxMapValLen > 1) {
          for (var i_1 = 0; i_1 < oldIdxMapValLen; i_1++) {
            this._remove && this._remove(oldIdxMapVal[i_1]);
          }
        } else {
          this._remove && this._remove(oldIdxMapVal);
        }
      }
      this._performRestAdd(newDataKeyArr, newDataIndexMap);
    };
    DataDiffer2.prototype._performRestAdd = function(newDataKeyArr, newDataIndexMap) {
      for (var i = 0; i < newDataKeyArr.length; i++) {
        var newKey = newDataKeyArr[i];
        var newIdxMapVal = newDataIndexMap[newKey];
        var idxMapValLen = dataIndexMapValueLength(newIdxMapVal);
        if (idxMapValLen > 1) {
          for (var j = 0; j < idxMapValLen; j++) {
            this._add && this._add(newIdxMapVal[j]);
          }
        } else if (idxMapValLen === 1) {
          this._add && this._add(newIdxMapVal);
        }
        newDataIndexMap[newKey] = null;
      }
    };
    DataDiffer2.prototype._initIndexMap = function(arr, map3, keyArr, keyGetterName) {
      var cbModeMultiple = this._diffModeMultiple;
      for (var i = 0; i < arr.length; i++) {
        var key = "_ec_" + this[keyGetterName](arr[i], i);
        if (!cbModeMultiple) {
          keyArr[i] = key;
        }
        if (!map3) {
          continue;
        }
        var idxMapVal = map3[key];
        var idxMapValLen = dataIndexMapValueLength(idxMapVal);
        if (idxMapValLen === 0) {
          map3[key] = i;
          if (cbModeMultiple) {
            keyArr.push(key);
          }
        } else if (idxMapValLen === 1) {
          map3[key] = [idxMapVal, i];
        } else {
          idxMapVal.push(i);
        }
      }
    };
    return DataDiffer2;
  }()
);
var DataDiffer_default = DataDiffer;

// node_modules/echarts/lib/util/types.js
var VISUAL_DIMENSIONS = createHashMap(["tooltip", "label", "itemName", "itemId", "itemGroupId", "itemChildGroupId", "seriesName"]);
var SOURCE_FORMAT_ORIGINAL = "original";
var SOURCE_FORMAT_ARRAY_ROWS = "arrayRows";
var SOURCE_FORMAT_OBJECT_ROWS = "objectRows";
var SOURCE_FORMAT_KEYED_COLUMNS = "keyedColumns";
var SOURCE_FORMAT_TYPED_ARRAY = "typedArray";
var SOURCE_FORMAT_UNKNOWN = "unknown";
var SERIES_LAYOUT_BY_COLUMN = "column";
var SERIES_LAYOUT_BY_ROW = "row";

// node_modules/echarts/lib/data/helper/sourceHelper.js
var BE_ORDINAL = {
  Must: 1,
  Might: 2,
  Not: 3
  // Other cases
};
var innerGlobalModel = makeInner();
function resetSourceDefaulter(ecModel) {
  innerGlobalModel(ecModel).datasetMap = createHashMap();
}
function querySeriesUpstreamDatasetModel(seriesModel) {
  var thisData = seriesModel.get("data", true);
  if (!thisData) {
    return queryReferringComponents(seriesModel.ecModel, "dataset", {
      index: seriesModel.get("datasetIndex", true),
      id: seriesModel.get("datasetId", true)
    }, SINGLE_REFERRING).models[0];
  }
}
function queryDatasetUpstreamDatasetModels(datasetModel) {
  if (!datasetModel.get("transform", true) && !datasetModel.get("fromTransformResult", true)) {
    return [];
  }
  return queryReferringComponents(datasetModel.ecModel, "dataset", {
    index: datasetModel.get("fromDatasetIndex", true),
    id: datasetModel.get("fromDatasetId", true)
  }, SINGLE_REFERRING).models;
}
function guessOrdinal(source, dimIndex) {
  return doGuessOrdinal(source.data, source.sourceFormat, source.seriesLayoutBy, source.dimensionsDefine, source.startIndex, dimIndex);
}
function doGuessOrdinal(data, sourceFormat, seriesLayoutBy, dimensionsDefine, startIndex, dimIndex) {
  var result;
  var maxLoop = 5;
  if (isTypedArray(data)) {
    return BE_ORDINAL.Not;
  }
  var dimName;
  var dimType;
  if (dimensionsDefine) {
    var dimDefItem = dimensionsDefine[dimIndex];
    if (isObject(dimDefItem)) {
      dimName = dimDefItem.name;
      dimType = dimDefItem.type;
    } else if (isString(dimDefItem)) {
      dimName = dimDefItem;
    }
  }
  if (dimType != null) {
    return dimType === "ordinal" ? BE_ORDINAL.Must : BE_ORDINAL.Not;
  }
  if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS) {
    var dataArrayRows = data;
    if (seriesLayoutBy === SERIES_LAYOUT_BY_ROW) {
      var sample = dataArrayRows[dimIndex];
      for (var i = 0; i < (sample || []).length && i < maxLoop; i++) {
        if ((result = detectValue(sample[startIndex + i])) != null) {
          return result;
        }
      }
    } else {
      for (var i = 0; i < dataArrayRows.length && i < maxLoop; i++) {
        var row = dataArrayRows[startIndex + i];
        if (row && (result = detectValue(row[dimIndex])) != null) {
          return result;
        }
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS) {
    var dataObjectRows = data;
    if (!dimName) {
      return BE_ORDINAL.Not;
    }
    for (var i = 0; i < dataObjectRows.length && i < maxLoop; i++) {
      var item = dataObjectRows[i];
      if (item && (result = detectValue(item[dimName])) != null) {
        return result;
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
    var dataKeyedColumns = data;
    if (!dimName) {
      return BE_ORDINAL.Not;
    }
    var sample = dataKeyedColumns[dimName];
    if (!sample || isTypedArray(sample)) {
      return BE_ORDINAL.Not;
    }
    for (var i = 0; i < sample.length && i < maxLoop; i++) {
      if ((result = detectValue(sample[i])) != null) {
        return result;
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    var dataOriginal = data;
    for (var i = 0; i < dataOriginal.length && i < maxLoop; i++) {
      var item = dataOriginal[i];
      var val = getDataItemValue(item);
      if (!isArray(val)) {
        return BE_ORDINAL.Not;
      }
      if ((result = detectValue(val[dimIndex])) != null) {
        return result;
      }
    }
  }
  function detectValue(val2) {
    var beStr = isString(val2);
    if (val2 != null && isFinite(val2) && val2 !== "") {
      return beStr ? BE_ORDINAL.Might : BE_ORDINAL.Not;
    } else if (beStr && val2 !== "-") {
      return BE_ORDINAL.Must;
    }
  }
  return BE_ORDINAL.Not;
}

// node_modules/echarts/lib/data/Source.js
var SourceImpl = (
  /** @class */
  /* @__PURE__ */ function() {
    function SourceImpl2(fields) {
      this.data = fields.data || (fields.sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS ? {} : []);
      this.sourceFormat = fields.sourceFormat || SOURCE_FORMAT_UNKNOWN;
      this.seriesLayoutBy = fields.seriesLayoutBy || SERIES_LAYOUT_BY_COLUMN;
      this.startIndex = fields.startIndex || 0;
      this.dimensionsDetectedCount = fields.dimensionsDetectedCount;
      this.metaRawOption = fields.metaRawOption;
      var dimensionsDefine = this.dimensionsDefine = fields.dimensionsDefine;
      if (dimensionsDefine) {
        for (var i = 0; i < dimensionsDefine.length; i++) {
          var dim = dimensionsDefine[i];
          if (dim.type == null) {
            if (guessOrdinal(this, i) === BE_ORDINAL.Must) {
              dim.type = "ordinal";
            }
          }
        }
      }
    }
    return SourceImpl2;
  }()
);
function isSourceInstance(val) {
  return val instanceof SourceImpl;
}
function createSource(sourceData, thisMetaRawOption, sourceFormat) {
  sourceFormat = sourceFormat || detectSourceFormat(sourceData);
  var seriesLayoutBy = thisMetaRawOption.seriesLayoutBy;
  var determined = determineSourceDimensions(sourceData, sourceFormat, seriesLayoutBy, thisMetaRawOption.sourceHeader, thisMetaRawOption.dimensions);
  var source = new SourceImpl({
    data: sourceData,
    sourceFormat,
    seriesLayoutBy,
    dimensionsDefine: determined.dimensionsDefine,
    startIndex: determined.startIndex,
    dimensionsDetectedCount: determined.dimensionsDetectedCount,
    metaRawOption: clone(thisMetaRawOption)
  });
  return source;
}
function createSourceFromSeriesDataOption(data) {
  return new SourceImpl({
    data,
    sourceFormat: isTypedArray(data) ? SOURCE_FORMAT_TYPED_ARRAY : SOURCE_FORMAT_ORIGINAL
  });
}
function cloneSourceShallow(source) {
  return new SourceImpl({
    data: source.data,
    sourceFormat: source.sourceFormat,
    seriesLayoutBy: source.seriesLayoutBy,
    dimensionsDefine: clone(source.dimensionsDefine),
    startIndex: source.startIndex,
    dimensionsDetectedCount: source.dimensionsDetectedCount
  });
}
function detectSourceFormat(data) {
  var sourceFormat = SOURCE_FORMAT_UNKNOWN;
  if (isTypedArray(data)) {
    sourceFormat = SOURCE_FORMAT_TYPED_ARRAY;
  } else if (isArray(data)) {
    if (data.length === 0) {
      sourceFormat = SOURCE_FORMAT_ARRAY_ROWS;
    }
    for (var i = 0, len2 = data.length; i < len2; i++) {
      var item = data[i];
      if (item == null) {
        continue;
      } else if (isArray(item) || isTypedArray(item)) {
        sourceFormat = SOURCE_FORMAT_ARRAY_ROWS;
        break;
      } else if (isObject(item)) {
        sourceFormat = SOURCE_FORMAT_OBJECT_ROWS;
        break;
      }
    }
  } else if (isObject(data)) {
    for (var key in data) {
      if (hasOwn(data, key) && isArrayLike(data[key])) {
        sourceFormat = SOURCE_FORMAT_KEYED_COLUMNS;
        break;
      }
    }
  }
  return sourceFormat;
}
function determineSourceDimensions(data, sourceFormat, seriesLayoutBy, sourceHeader, dimensionsDefine) {
  var dimensionsDetectedCount;
  var startIndex;
  if (!data) {
    return {
      dimensionsDefine: normalizeDimensionsOption(dimensionsDefine),
      startIndex,
      dimensionsDetectedCount
    };
  }
  if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS) {
    var dataArrayRows = data;
    if (sourceHeader === "auto" || sourceHeader == null) {
      arrayRowsTravelFirst(function(val) {
        if (val != null && val !== "-") {
          if (isString(val)) {
            startIndex == null && (startIndex = 1);
          } else {
            startIndex = 0;
          }
        }
      }, seriesLayoutBy, dataArrayRows, 10);
    } else {
      startIndex = isNumber(sourceHeader) ? sourceHeader : sourceHeader ? 1 : 0;
    }
    if (!dimensionsDefine && startIndex === 1) {
      dimensionsDefine = [];
      arrayRowsTravelFirst(function(val, index) {
        dimensionsDefine[index] = val != null ? val + "" : "";
      }, seriesLayoutBy, dataArrayRows, Infinity);
    }
    dimensionsDetectedCount = dimensionsDefine ? dimensionsDefine.length : seriesLayoutBy === SERIES_LAYOUT_BY_ROW ? dataArrayRows.length : dataArrayRows[0] ? dataArrayRows[0].length : null;
  } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS) {
    if (!dimensionsDefine) {
      dimensionsDefine = objectRowsCollectDimensions(data);
    }
  } else if (sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
    if (!dimensionsDefine) {
      dimensionsDefine = [];
      each(data, function(colArr, key) {
        dimensionsDefine.push(key);
      });
    }
  } else if (sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    var value0 = getDataItemValue(data[0]);
    dimensionsDetectedCount = isArray(value0) && value0.length || 1;
  } else if (sourceFormat === SOURCE_FORMAT_TYPED_ARRAY) {
    if (process.env.NODE_ENV !== "production") {
      assert(!!dimensionsDefine, "dimensions must be given if data is TypedArray.");
    }
  }
  return {
    startIndex,
    dimensionsDefine: normalizeDimensionsOption(dimensionsDefine),
    dimensionsDetectedCount
  };
}
function objectRowsCollectDimensions(data) {
  var firstIndex = 0;
  var obj;
  while (firstIndex < data.length && !(obj = data[firstIndex++])) {
  }
  if (obj) {
    return keys(obj);
  }
}
function normalizeDimensionsOption(dimensionsDefine) {
  if (!dimensionsDefine) {
    return;
  }
  var nameMap = createHashMap();
  return map(dimensionsDefine, function(rawItem, index) {
    rawItem = isObject(rawItem) ? rawItem : {
      name: rawItem
    };
    var item = {
      name: rawItem.name,
      displayName: rawItem.displayName,
      type: rawItem.type
    };
    if (item.name == null) {
      return item;
    }
    item.name += "";
    if (item.displayName == null) {
      item.displayName = item.name;
    }
    var exist = nameMap.get(item.name);
    if (!exist) {
      nameMap.set(item.name, {
        count: 1
      });
    } else {
      item.name += "-" + exist.count++;
    }
    return item;
  });
}
function arrayRowsTravelFirst(cb, seriesLayoutBy, data, maxLoop) {
  if (seriesLayoutBy === SERIES_LAYOUT_BY_ROW) {
    for (var i = 0; i < data.length && i < maxLoop; i++) {
      cb(data[i] ? data[i][0] : null, i);
    }
  } else {
    var value0 = data[0] || [];
    for (var i = 0; i < value0.length && i < maxLoop; i++) {
      cb(value0[i], i);
    }
  }
}
function shouldRetrieveDataByName(source) {
  var sourceFormat = source.sourceFormat;
  return sourceFormat === SOURCE_FORMAT_OBJECT_ROWS || sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS;
}

// node_modules/echarts/lib/data/helper/dataProvider.js
var _a;
var _b;
var _c;
var providerMethods;
var mountMethods;
var DefaultDataProvider = (
  /** @class */
  function() {
    function DefaultDataProvider2(sourceParam, dimSize) {
      var source = !isSourceInstance(sourceParam) ? createSourceFromSeriesDataOption(sourceParam) : sourceParam;
      this._source = source;
      var data = this._data = source.data;
      if (source.sourceFormat === SOURCE_FORMAT_TYPED_ARRAY) {
        if (process.env.NODE_ENV !== "production") {
          if (dimSize == null) {
            throw new Error("Typed array data must specify dimension size");
          }
        }
        this._offset = 0;
        this._dimSize = dimSize;
        this._data = data;
      }
      mountMethods(this, data, source);
    }
    DefaultDataProvider2.prototype.getSource = function() {
      return this._source;
    };
    DefaultDataProvider2.prototype.count = function() {
      return 0;
    };
    DefaultDataProvider2.prototype.getItem = function(idx, out2) {
      return;
    };
    DefaultDataProvider2.prototype.appendData = function(newData) {
    };
    DefaultDataProvider2.prototype.clean = function() {
    };
    DefaultDataProvider2.protoInitialize = function() {
      var proto = DefaultDataProvider2.prototype;
      proto.pure = false;
      proto.persistent = true;
    }();
    DefaultDataProvider2.internalField = function() {
      var _a2;
      mountMethods = function(provider, data, source) {
        var sourceFormat = source.sourceFormat;
        var seriesLayoutBy = source.seriesLayoutBy;
        var startIndex = source.startIndex;
        var dimsDef = source.dimensionsDefine;
        var methods = providerMethods[getMethodMapKey(sourceFormat, seriesLayoutBy)];
        if (process.env.NODE_ENV !== "production") {
          assert(methods, "Invalide sourceFormat: " + sourceFormat);
        }
        extend(provider, methods);
        if (sourceFormat === SOURCE_FORMAT_TYPED_ARRAY) {
          provider.getItem = getItemForTypedArray;
          provider.count = countForTypedArray;
          provider.fillStorage = fillStorageForTypedArray;
        } else {
          var rawItemGetter = getRawSourceItemGetter(sourceFormat, seriesLayoutBy);
          provider.getItem = bind(rawItemGetter, null, data, startIndex, dimsDef);
          var rawCounter = getRawSourceDataCounter(sourceFormat, seriesLayoutBy);
          provider.count = bind(rawCounter, null, data, startIndex, dimsDef);
        }
      };
      var getItemForTypedArray = function(idx, out2) {
        idx = idx - this._offset;
        out2 = out2 || [];
        var data = this._data;
        var dimSize = this._dimSize;
        var offset = dimSize * idx;
        for (var i = 0; i < dimSize; i++) {
          out2[i] = data[offset + i];
        }
        return out2;
      };
      var fillStorageForTypedArray = function(start2, end2, storage, extent) {
        var data = this._data;
        var dimSize = this._dimSize;
        for (var dim = 0; dim < dimSize; dim++) {
          var dimExtent = extent[dim];
          var min3 = dimExtent[0] == null ? Infinity : dimExtent[0];
          var max3 = dimExtent[1] == null ? -Infinity : dimExtent[1];
          var count = end2 - start2;
          var arr = storage[dim];
          for (var i = 0; i < count; i++) {
            var val = data[i * dimSize + dim];
            arr[start2 + i] = val;
            val < min3 && (min3 = val);
            val > max3 && (max3 = val);
          }
          dimExtent[0] = min3;
          dimExtent[1] = max3;
        }
      };
      var countForTypedArray = function() {
        return this._data ? this._data.length / this._dimSize : 0;
      };
      providerMethods = (_a2 = {}, _a2[SOURCE_FORMAT_ARRAY_ROWS + "_" + SERIES_LAYOUT_BY_COLUMN] = {
        pure: true,
        appendData: appendDataSimply
      }, _a2[SOURCE_FORMAT_ARRAY_ROWS + "_" + SERIES_LAYOUT_BY_ROW] = {
        pure: true,
        appendData: function() {
          throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
        }
      }, _a2[SOURCE_FORMAT_OBJECT_ROWS] = {
        pure: true,
        appendData: appendDataSimply
      }, _a2[SOURCE_FORMAT_KEYED_COLUMNS] = {
        pure: true,
        appendData: function(newData) {
          var data = this._data;
          each(newData, function(newCol, key) {
            var oldCol = data[key] || (data[key] = []);
            for (var i = 0; i < (newCol || []).length; i++) {
              oldCol.push(newCol[i]);
            }
          });
        }
      }, _a2[SOURCE_FORMAT_ORIGINAL] = {
        appendData: appendDataSimply
      }, _a2[SOURCE_FORMAT_TYPED_ARRAY] = {
        persistent: false,
        pure: true,
        appendData: function(newData) {
          if (process.env.NODE_ENV !== "production") {
            assert(isTypedArray(newData), "Added data must be TypedArray if data in initialization is TypedArray");
          }
          this._data = newData;
        },
        // Clean self if data is already used.
        clean: function() {
          this._offset += this.count();
          this._data = null;
        }
      }, _a2);
      function appendDataSimply(newData) {
        for (var i = 0; i < newData.length; i++) {
          this._data.push(newData[i]);
        }
      }
    }();
    return DefaultDataProvider2;
  }()
);
var getItemSimply = function(rawData, startIndex, dimsDef, idx) {
  return rawData[idx];
};
var rawSourceItemGetterMap = (_a = {}, _a[SOURCE_FORMAT_ARRAY_ROWS + "_" + SERIES_LAYOUT_BY_COLUMN] = function(rawData, startIndex, dimsDef, idx) {
  return rawData[idx + startIndex];
}, _a[SOURCE_FORMAT_ARRAY_ROWS + "_" + SERIES_LAYOUT_BY_ROW] = function(rawData, startIndex, dimsDef, idx, out2) {
  idx += startIndex;
  var item = out2 || [];
  var data = rawData;
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    item[i] = row ? row[idx] : null;
  }
  return item;
}, _a[SOURCE_FORMAT_OBJECT_ROWS] = getItemSimply, _a[SOURCE_FORMAT_KEYED_COLUMNS] = function(rawData, startIndex, dimsDef, idx, out2) {
  var item = out2 || [];
  for (var i = 0; i < dimsDef.length; i++) {
    var dimName = dimsDef[i].name;
    if (process.env.NODE_ENV !== "production") {
      if (dimName == null) {
        throw new Error();
      }
    }
    var col = rawData[dimName];
    item[i] = col ? col[idx] : null;
  }
  return item;
}, _a[SOURCE_FORMAT_ORIGINAL] = getItemSimply, _a);
function getRawSourceItemGetter(sourceFormat, seriesLayoutBy) {
  var method = rawSourceItemGetterMap[getMethodMapKey(sourceFormat, seriesLayoutBy)];
  if (process.env.NODE_ENV !== "production") {
    assert(method, 'Do not support get item on "' + sourceFormat + '", "' + seriesLayoutBy + '".');
  }
  return method;
}
var countSimply = function(rawData, startIndex, dimsDef) {
  return rawData.length;
};
var rawSourceDataCounterMap = (_b = {}, _b[SOURCE_FORMAT_ARRAY_ROWS + "_" + SERIES_LAYOUT_BY_COLUMN] = function(rawData, startIndex, dimsDef) {
  return Math.max(0, rawData.length - startIndex);
}, _b[SOURCE_FORMAT_ARRAY_ROWS + "_" + SERIES_LAYOUT_BY_ROW] = function(rawData, startIndex, dimsDef) {
  var row = rawData[0];
  return row ? Math.max(0, row.length - startIndex) : 0;
}, _b[SOURCE_FORMAT_OBJECT_ROWS] = countSimply, _b[SOURCE_FORMAT_KEYED_COLUMNS] = function(rawData, startIndex, dimsDef) {
  var dimName = dimsDef[0].name;
  if (process.env.NODE_ENV !== "production") {
    if (dimName == null) {
      throw new Error();
    }
  }
  var col = rawData[dimName];
  return col ? col.length : 0;
}, _b[SOURCE_FORMAT_ORIGINAL] = countSimply, _b);
function getRawSourceDataCounter(sourceFormat, seriesLayoutBy) {
  var method = rawSourceDataCounterMap[getMethodMapKey(sourceFormat, seriesLayoutBy)];
  if (process.env.NODE_ENV !== "production") {
    assert(method, 'Do not support count on "' + sourceFormat + '", "' + seriesLayoutBy + '".');
  }
  return method;
}
var getRawValueSimply = function(dataItem, dimIndex, property) {
  return dataItem[dimIndex];
};
var rawSourceValueGetterMap = (_c = {}, _c[SOURCE_FORMAT_ARRAY_ROWS] = getRawValueSimply, _c[SOURCE_FORMAT_OBJECT_ROWS] = function(dataItem, dimIndex, property) {
  return dataItem[property];
}, _c[SOURCE_FORMAT_KEYED_COLUMNS] = getRawValueSimply, _c[SOURCE_FORMAT_ORIGINAL] = function(dataItem, dimIndex, property) {
  var value = getDataItemValue(dataItem);
  return !(value instanceof Array) ? value : value[dimIndex];
}, _c[SOURCE_FORMAT_TYPED_ARRAY] = getRawValueSimply, _c);
function getRawSourceValueGetter(sourceFormat) {
  var method = rawSourceValueGetterMap[sourceFormat];
  if (process.env.NODE_ENV !== "production") {
    assert(method, 'Do not support get value on "' + sourceFormat + '".');
  }
  return method;
}
function getMethodMapKey(sourceFormat, seriesLayoutBy) {
  return sourceFormat === SOURCE_FORMAT_ARRAY_ROWS ? sourceFormat + "_" + seriesLayoutBy : sourceFormat;
}
function retrieveRawValue(data, dataIndex, dim) {
  if (!data) {
    return;
  }
  var dataItem = data.getRawDataItem(dataIndex);
  if (dataItem == null) {
    return;
  }
  var store = data.getStore();
  var sourceFormat = store.getSource().sourceFormat;
  if (dim != null) {
    var dimIndex = data.getDimensionIndex(dim);
    var property = store.getDimensionProperty(dimIndex);
    return getRawSourceValueGetter(sourceFormat)(dataItem, dimIndex, property);
  } else {
    var result = dataItem;
    if (sourceFormat === SOURCE_FORMAT_ORIGINAL) {
      result = getDataItemValue(dataItem);
    }
    return result;
  }
}

// node_modules/echarts/lib/data/helper/dimensionHelper.js
var DimensionUserOuput = (
  /** @class */
  function() {
    function DimensionUserOuput2(encode, dimRequest) {
      this._encode = encode;
      this._schema = dimRequest;
    }
    DimensionUserOuput2.prototype.get = function() {
      return {
        // Do not generate full dimension name until fist used.
        fullDimensions: this._getFullDimensionNames(),
        encode: this._encode
      };
    };
    DimensionUserOuput2.prototype._getFullDimensionNames = function() {
      if (!this._cachedDimNames) {
        this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : [];
      }
      return this._cachedDimNames;
    };
    return DimensionUserOuput2;
  }()
);
function summarizeDimensions(data, schema) {
  var summary = {};
  var encode = summary.encode = {};
  var notExtraCoordDimMap = createHashMap();
  var defaultedLabel = [];
  var defaultedTooltip = [];
  var userOutputEncode = {};
  each(data.dimensions, function(dimName) {
    var dimItem = data.getDimensionInfo(dimName);
    var coordDim = dimItem.coordDim;
    if (coordDim) {
      if (process.env.NODE_ENV !== "production") {
        assert(VISUAL_DIMENSIONS.get(coordDim) == null);
      }
      var coordDimIndex = dimItem.coordDimIndex;
      getOrCreateEncodeArr(encode, coordDim)[coordDimIndex] = dimName;
      if (!dimItem.isExtraCoord) {
        notExtraCoordDimMap.set(coordDim, 1);
        if (mayLabelDimType(dimItem.type)) {
          defaultedLabel[0] = dimName;
        }
        getOrCreateEncodeArr(userOutputEncode, coordDim)[coordDimIndex] = data.getDimensionIndex(dimItem.name);
      }
      if (dimItem.defaultTooltip) {
        defaultedTooltip.push(dimName);
      }
    }
    VISUAL_DIMENSIONS.each(function(v, otherDim) {
      var encodeArr = getOrCreateEncodeArr(encode, otherDim);
      var dimIndex = dimItem.otherDims[otherDim];
      if (dimIndex != null && dimIndex !== false) {
        encodeArr[dimIndex] = dimItem.name;
      }
    });
  });
  var dataDimsOnCoord = [];
  var encodeFirstDimNotExtra = {};
  notExtraCoordDimMap.each(function(v, coordDim) {
    var dimArr = encode[coordDim];
    encodeFirstDimNotExtra[coordDim] = dimArr[0];
    dataDimsOnCoord = dataDimsOnCoord.concat(dimArr);
  });
  summary.dataDimsOnCoord = dataDimsOnCoord;
  summary.dataDimIndicesOnCoord = map(dataDimsOnCoord, function(dimName) {
    return data.getDimensionInfo(dimName).storeDimIndex;
  });
  summary.encodeFirstDimNotExtra = encodeFirstDimNotExtra;
  var encodeLabel = encode.label;
  if (encodeLabel && encodeLabel.length) {
    defaultedLabel = encodeLabel.slice();
  }
  var encodeTooltip = encode.tooltip;
  if (encodeTooltip && encodeTooltip.length) {
    defaultedTooltip = encodeTooltip.slice();
  } else if (!defaultedTooltip.length) {
    defaultedTooltip = defaultedLabel.slice();
  }
  encode.defaultedLabel = defaultedLabel;
  encode.defaultedTooltip = defaultedTooltip;
  summary.userOutput = new DimensionUserOuput(userOutputEncode, schema);
  return summary;
}
function getOrCreateEncodeArr(encode, dim) {
  if (!encode.hasOwnProperty(dim)) {
    encode[dim] = [];
  }
  return encode[dim];
}
function mayLabelDimType(dimType) {
  return !(dimType === "ordinal" || dimType === "time");
}

// node_modules/echarts/lib/data/SeriesDimensionDefine.js
var SeriesDimensionDefine = (
  /** @class */
  /* @__PURE__ */ function() {
    function SeriesDimensionDefine2(opt) {
      this.otherDims = {};
      if (opt != null) {
        extend(this, opt);
      }
    }
    return SeriesDimensionDefine2;
  }()
);
var SeriesDimensionDefine_default = SeriesDimensionDefine;

// node_modules/echarts/lib/data/helper/dataValueHelper.js
function parseDataValue(value, opt) {
  var dimType = opt && opt.type;
  if (dimType === "ordinal") {
    return value;
  }
  if (dimType === "time" && !isNumber(value) && value != null && value !== "-") {
    value = +parseDate(value);
  }
  return value == null || value === "" ? NaN : +value;
}
var valueParserMap = createHashMap({
  "number": function(val) {
    return parseFloat(val);
  },
  "time": function(val) {
    return +parseDate(val);
  },
  "trim": function(val) {
    return isString(val) ? trim(val) : val;
  }
});
var ORDER_COMPARISON_OP_MAP = {
  lt: function(lval, rval) {
    return lval < rval;
  },
  lte: function(lval, rval) {
    return lval <= rval;
  },
  gt: function(lval, rval) {
    return lval > rval;
  },
  gte: function(lval, rval) {
    return lval >= rval;
  }
};
var FilterOrderComparator = (
  /** @class */
  function() {
    function FilterOrderComparator2(op, rval) {
      if (!isNumber(rval)) {
        var errMsg = "";
        if (process.env.NODE_ENV !== "production") {
          errMsg = 'rvalue of "<", ">", "<=", ">=" can only be number in filter.';
        }
        throwError(errMsg);
      }
      this._opFn = ORDER_COMPARISON_OP_MAP[op];
      this._rvalFloat = numericToNumber(rval);
    }
    FilterOrderComparator2.prototype.evaluate = function(lval) {
      return isNumber(lval) ? this._opFn(lval, this._rvalFloat) : this._opFn(numericToNumber(lval), this._rvalFloat);
    };
    return FilterOrderComparator2;
  }()
);
var SortOrderComparator = (
  /** @class */
  function() {
    function SortOrderComparator2(order, incomparable) {
      var isDesc = order === "desc";
      this._resultLT = isDesc ? 1 : -1;
      if (incomparable == null) {
        incomparable = isDesc ? "min" : "max";
      }
      this._incomparable = incomparable === "min" ? -Infinity : Infinity;
    }
    SortOrderComparator2.prototype.evaluate = function(lval, rval) {
      var lvalFloat = isNumber(lval) ? lval : numericToNumber(lval);
      var rvalFloat = isNumber(rval) ? rval : numericToNumber(rval);
      var lvalNotNumeric = isNaN(lvalFloat);
      var rvalNotNumeric = isNaN(rvalFloat);
      if (lvalNotNumeric) {
        lvalFloat = this._incomparable;
      }
      if (rvalNotNumeric) {
        rvalFloat = this._incomparable;
      }
      if (lvalNotNumeric && rvalNotNumeric) {
        var lvalIsStr = isString(lval);
        var rvalIsStr = isString(rval);
        if (lvalIsStr) {
          lvalFloat = rvalIsStr ? lval : 0;
        }
        if (rvalIsStr) {
          rvalFloat = lvalIsStr ? rval : 0;
        }
      }
      return lvalFloat < rvalFloat ? this._resultLT : lvalFloat > rvalFloat ? -this._resultLT : 0;
    };
    return SortOrderComparator2;
  }()
);
var FilterEqualityComparator = (
  /** @class */
  function() {
    function FilterEqualityComparator2(isEq, rval) {
      this._rval = rval;
      this._isEQ = isEq;
      this._rvalTypeof = typeof rval;
      this._rvalFloat = numericToNumber(rval);
    }
    FilterEqualityComparator2.prototype.evaluate = function(lval) {
      var eqResult = lval === this._rval;
      if (!eqResult) {
        var lvalTypeof = typeof lval;
        if (lvalTypeof !== this._rvalTypeof && (lvalTypeof === "number" || this._rvalTypeof === "number")) {
          eqResult = numericToNumber(lval) === this._rvalFloat;
        }
      }
      return this._isEQ ? eqResult : !eqResult;
    };
    return FilterEqualityComparator2;
  }()
);

// node_modules/echarts/lib/data/DataStore.js
var UNDEFINED = "undefined";
var CtorUint32Array = typeof Uint32Array === UNDEFINED ? Array : Uint32Array;
var CtorUint16Array = typeof Uint16Array === UNDEFINED ? Array : Uint16Array;
var CtorInt32Array = typeof Int32Array === UNDEFINED ? Array : Int32Array;
var CtorFloat64Array = typeof Float64Array === UNDEFINED ? Array : Float64Array;
var dataCtors = {
  "float": CtorFloat64Array,
  "int": CtorInt32Array,
  // Ordinal data type can be string or int
  "ordinal": Array,
  "number": Array,
  "time": CtorFloat64Array
};
var defaultDimValueGetters;
function getIndicesCtor(rawCount) {
  return rawCount > 65535 ? CtorUint32Array : CtorUint16Array;
}
function getInitialExtent() {
  return [Infinity, -Infinity];
}
function cloneChunk(originalChunk) {
  var Ctor = originalChunk.constructor;
  return Ctor === Array ? originalChunk.slice() : new Ctor(originalChunk);
}
function prepareStore(store, dimIdx, dimType, end2, append) {
  var DataCtor = dataCtors[dimType || "float"];
  if (append) {
    var oldStore = store[dimIdx];
    var oldLen = oldStore && oldStore.length;
    if (!(oldLen === end2)) {
      var newStore = new DataCtor(end2);
      for (var j = 0; j < oldLen; j++) {
        newStore[j] = oldStore[j];
      }
      store[dimIdx] = newStore;
    }
  } else {
    store[dimIdx] = new DataCtor(end2);
  }
}
var DataStore = (
  /** @class */
  function() {
    function DataStore2() {
      this._chunks = [];
      this._rawExtent = [];
      this._extent = [];
      this._count = 0;
      this._rawCount = 0;
      this._calcDimNameToIdx = createHashMap();
    }
    DataStore2.prototype.initData = function(provider, inputDimensions, dimValueGetter) {
      if (process.env.NODE_ENV !== "production") {
        assert(isFunction(provider.getItem) && isFunction(provider.count), "Invalid data provider.");
      }
      this._provider = provider;
      this._chunks = [];
      this._indices = null;
      this.getRawIndex = this._getRawIdxIdentity;
      var source = provider.getSource();
      var defaultGetter = this.defaultDimValueGetter = defaultDimValueGetters[source.sourceFormat];
      this._dimValueGetter = dimValueGetter || defaultGetter;
      this._rawExtent = [];
      var willRetrieveDataByName = shouldRetrieveDataByName(source);
      this._dimensions = map(inputDimensions, function(dim) {
        if (process.env.NODE_ENV !== "production") {
          if (willRetrieveDataByName) {
            assert(dim.property != null);
          }
        }
        return {
          // Only pick these two props. Not leak other properties like orderMeta.
          type: dim.type,
          property: dim.property
        };
      });
      this._initDataFromProvider(0, provider.count());
    };
    DataStore2.prototype.getProvider = function() {
      return this._provider;
    };
    DataStore2.prototype.getSource = function() {
      return this._provider.getSource();
    };
    DataStore2.prototype.ensureCalculationDimension = function(dimName, type) {
      var calcDimNameToIdx = this._calcDimNameToIdx;
      var dimensions = this._dimensions;
      var calcDimIdx = calcDimNameToIdx.get(dimName);
      if (calcDimIdx != null) {
        if (dimensions[calcDimIdx].type === type) {
          return calcDimIdx;
        }
      } else {
        calcDimIdx = dimensions.length;
      }
      dimensions[calcDimIdx] = {
        type
      };
      calcDimNameToIdx.set(dimName, calcDimIdx);
      this._chunks[calcDimIdx] = new dataCtors[type || "float"](this._rawCount);
      this._rawExtent[calcDimIdx] = getInitialExtent();
      return calcDimIdx;
    };
    DataStore2.prototype.collectOrdinalMeta = function(dimIdx, ordinalMeta) {
      var chunk = this._chunks[dimIdx];
      var dim = this._dimensions[dimIdx];
      var rawExtents = this._rawExtent;
      var offset = dim.ordinalOffset || 0;
      var len2 = chunk.length;
      if (offset === 0) {
        rawExtents[dimIdx] = getInitialExtent();
      }
      var dimRawExtent = rawExtents[dimIdx];
      for (var i = offset; i < len2; i++) {
        var val = chunk[i] = ordinalMeta.parseAndCollect(chunk[i]);
        if (!isNaN(val)) {
          dimRawExtent[0] = Math.min(val, dimRawExtent[0]);
          dimRawExtent[1] = Math.max(val, dimRawExtent[1]);
        }
      }
      dim.ordinalMeta = ordinalMeta;
      dim.ordinalOffset = len2;
      dim.type = "ordinal";
    };
    DataStore2.prototype.getOrdinalMeta = function(dimIdx) {
      var dimInfo = this._dimensions[dimIdx];
      var ordinalMeta = dimInfo.ordinalMeta;
      return ordinalMeta;
    };
    DataStore2.prototype.getDimensionProperty = function(dimIndex) {
      var item = this._dimensions[dimIndex];
      return item && item.property;
    };
    DataStore2.prototype.appendData = function(data) {
      if (process.env.NODE_ENV !== "production") {
        assert(!this._indices, "appendData can only be called on raw data.");
      }
      var provider = this._provider;
      var start2 = this.count();
      provider.appendData(data);
      var end2 = provider.count();
      if (!provider.persistent) {
        end2 += start2;
      }
      if (start2 < end2) {
        this._initDataFromProvider(start2, end2, true);
      }
      return [start2, end2];
    };
    DataStore2.prototype.appendValues = function(values, minFillLen) {
      var chunks = this._chunks;
      var dimensions = this._dimensions;
      var dimLen = dimensions.length;
      var rawExtent = this._rawExtent;
      var start2 = this.count();
      var end2 = start2 + Math.max(values.length, minFillLen || 0);
      for (var i = 0; i < dimLen; i++) {
        var dim = dimensions[i];
        prepareStore(chunks, i, dim.type, end2, true);
      }
      var emptyDataItem = [];
      for (var idx = start2; idx < end2; idx++) {
        var sourceIdx = idx - start2;
        for (var dimIdx = 0; dimIdx < dimLen; dimIdx++) {
          var dim = dimensions[dimIdx];
          var val = defaultDimValueGetters.arrayRows.call(this, values[sourceIdx] || emptyDataItem, dim.property, sourceIdx, dimIdx);
          chunks[dimIdx][idx] = val;
          var dimRawExtent = rawExtent[dimIdx];
          val < dimRawExtent[0] && (dimRawExtent[0] = val);
          val > dimRawExtent[1] && (dimRawExtent[1] = val);
        }
      }
      this._rawCount = this._count = end2;
      return {
        start: start2,
        end: end2
      };
    };
    DataStore2.prototype._initDataFromProvider = function(start2, end2, append) {
      var provider = this._provider;
      var chunks = this._chunks;
      var dimensions = this._dimensions;
      var dimLen = dimensions.length;
      var rawExtent = this._rawExtent;
      var dimNames = map(dimensions, function(dim2) {
        return dim2.property;
      });
      for (var i = 0; i < dimLen; i++) {
        var dim = dimensions[i];
        if (!rawExtent[i]) {
          rawExtent[i] = getInitialExtent();
        }
        prepareStore(chunks, i, dim.type, end2, append);
      }
      if (provider.fillStorage) {
        provider.fillStorage(start2, end2, chunks, rawExtent);
      } else {
        var dataItem = [];
        for (var idx = start2; idx < end2; idx++) {
          dataItem = provider.getItem(idx, dataItem);
          for (var dimIdx = 0; dimIdx < dimLen; dimIdx++) {
            var dimStorage = chunks[dimIdx];
            var val = this._dimValueGetter(dataItem, dimNames[dimIdx], idx, dimIdx);
            dimStorage[idx] = val;
            var dimRawExtent = rawExtent[dimIdx];
            val < dimRawExtent[0] && (dimRawExtent[0] = val);
            val > dimRawExtent[1] && (dimRawExtent[1] = val);
          }
        }
      }
      if (!provider.persistent && provider.clean) {
        provider.clean();
      }
      this._rawCount = this._count = end2;
      this._extent = [];
    };
    DataStore2.prototype.count = function() {
      return this._count;
    };
    DataStore2.prototype.get = function(dim, idx) {
      if (!(idx >= 0 && idx < this._count)) {
        return NaN;
      }
      var dimStore = this._chunks[dim];
      return dimStore ? dimStore[this.getRawIndex(idx)] : NaN;
    };
    DataStore2.prototype.getValues = function(dimensions, idx) {
      var values = [];
      var dimArr = [];
      if (idx == null) {
        idx = dimensions;
        dimensions = [];
        for (var i = 0; i < this._dimensions.length; i++) {
          dimArr.push(i);
        }
      } else {
        dimArr = dimensions;
      }
      for (var i = 0, len2 = dimArr.length; i < len2; i++) {
        values.push(this.get(dimArr[i], idx));
      }
      return values;
    };
    DataStore2.prototype.getByRawIndex = function(dim, rawIdx) {
      if (!(rawIdx >= 0 && rawIdx < this._rawCount)) {
        return NaN;
      }
      var dimStore = this._chunks[dim];
      return dimStore ? dimStore[rawIdx] : NaN;
    };
    DataStore2.prototype.getSum = function(dim) {
      var dimData = this._chunks[dim];
      var sum = 0;
      if (dimData) {
        for (var i = 0, len2 = this.count(); i < len2; i++) {
          var value = this.get(dim, i);
          if (!isNaN(value)) {
            sum += value;
          }
        }
      }
      return sum;
    };
    DataStore2.prototype.getMedian = function(dim) {
      var dimDataArray = [];
      this.each([dim], function(val) {
        if (!isNaN(val)) {
          dimDataArray.push(val);
        }
      });
      var sortedDimDataArray = dimDataArray.sort(function(a, b) {
        return a - b;
      });
      var len2 = this.count();
      return len2 === 0 ? 0 : len2 % 2 === 1 ? sortedDimDataArray[(len2 - 1) / 2] : (sortedDimDataArray[len2 / 2] + sortedDimDataArray[len2 / 2 - 1]) / 2;
    };
    DataStore2.prototype.indexOfRawIndex = function(rawIndex) {
      if (rawIndex >= this._rawCount || rawIndex < 0) {
        return -1;
      }
      if (!this._indices) {
        return rawIndex;
      }
      var indices = this._indices;
      var rawDataIndex = indices[rawIndex];
      if (rawDataIndex != null && rawDataIndex < this._count && rawDataIndex === rawIndex) {
        return rawIndex;
      }
      var left = 0;
      var right = this._count - 1;
      while (left <= right) {
        var mid = (left + right) / 2 | 0;
        if (indices[mid] < rawIndex) {
          left = mid + 1;
        } else if (indices[mid] > rawIndex) {
          right = mid - 1;
        } else {
          return mid;
        }
      }
      return -1;
    };
    DataStore2.prototype.indicesOfNearest = function(dim, value, maxDistance) {
      var chunks = this._chunks;
      var dimData = chunks[dim];
      var nearestIndices = [];
      if (!dimData) {
        return nearestIndices;
      }
      if (maxDistance == null) {
        maxDistance = Infinity;
      }
      var minDist = Infinity;
      var minDiff = -1;
      var nearestIndicesLen = 0;
      for (var i = 0, len2 = this.count(); i < len2; i++) {
        var dataIndex = this.getRawIndex(i);
        var diff = value - dimData[dataIndex];
        var dist3 = Math.abs(diff);
        if (dist3 <= maxDistance) {
          if (dist3 < minDist || dist3 === minDist && diff >= 0 && minDiff < 0) {
            minDist = dist3;
            minDiff = diff;
            nearestIndicesLen = 0;
          }
          if (diff === minDiff) {
            nearestIndices[nearestIndicesLen++] = i;
          }
        }
      }
      nearestIndices.length = nearestIndicesLen;
      return nearestIndices;
    };
    DataStore2.prototype.getIndices = function() {
      var newIndices;
      var indices = this._indices;
      if (indices) {
        var Ctor = indices.constructor;
        var thisCount = this._count;
        if (Ctor === Array) {
          newIndices = new Ctor(thisCount);
          for (var i = 0; i < thisCount; i++) {
            newIndices[i] = indices[i];
          }
        } else {
          newIndices = new Ctor(indices.buffer, 0, thisCount);
        }
      } else {
        var Ctor = getIndicesCtor(this._rawCount);
        newIndices = new Ctor(this.count());
        for (var i = 0; i < newIndices.length; i++) {
          newIndices[i] = i;
        }
      }
      return newIndices;
    };
    DataStore2.prototype.filter = function(dims, cb) {
      if (!this._count) {
        return this;
      }
      var newStore = this.clone();
      var count = newStore.count();
      var Ctor = getIndicesCtor(newStore._rawCount);
      var newIndices = new Ctor(count);
      var value = [];
      var dimSize = dims.length;
      var offset = 0;
      var dim0 = dims[0];
      var chunks = newStore._chunks;
      for (var i = 0; i < count; i++) {
        var keep = void 0;
        var rawIdx = newStore.getRawIndex(i);
        if (dimSize === 0) {
          keep = cb(i);
        } else if (dimSize === 1) {
          var val = chunks[dim0][rawIdx];
          keep = cb(val, i);
        } else {
          var k = 0;
          for (; k < dimSize; k++) {
            value[k] = chunks[dims[k]][rawIdx];
          }
          value[k] = i;
          keep = cb.apply(null, value);
        }
        if (keep) {
          newIndices[offset++] = rawIdx;
        }
      }
      if (offset < count) {
        newStore._indices = newIndices;
      }
      newStore._count = offset;
      newStore._extent = [];
      newStore._updateGetRawIdx();
      return newStore;
    };
    DataStore2.prototype.selectRange = function(range) {
      var newStore = this.clone();
      var len2 = newStore._count;
      if (!len2) {
        return this;
      }
      var dims = keys(range);
      var dimSize = dims.length;
      if (!dimSize) {
        return this;
      }
      var originalCount = newStore.count();
      var Ctor = getIndicesCtor(newStore._rawCount);
      var newIndices = new Ctor(originalCount);
      var offset = 0;
      var dim0 = dims[0];
      var min3 = range[dim0][0];
      var max3 = range[dim0][1];
      var storeArr = newStore._chunks;
      var quickFinished = false;
      if (!newStore._indices) {
        var idx = 0;
        if (dimSize === 1) {
          var dimStorage = storeArr[dims[0]];
          for (var i = 0; i < len2; i++) {
            var val = dimStorage[i];
            if (val >= min3 && val <= max3 || isNaN(val)) {
              newIndices[offset++] = idx;
            }
            idx++;
          }
          quickFinished = true;
        } else if (dimSize === 2) {
          var dimStorage = storeArr[dims[0]];
          var dimStorage2 = storeArr[dims[1]];
          var min23 = range[dims[1]][0];
          var max23 = range[dims[1]][1];
          for (var i = 0; i < len2; i++) {
            var val = dimStorage[i];
            var val2 = dimStorage2[i];
            if ((val >= min3 && val <= max3 || isNaN(val)) && (val2 >= min23 && val2 <= max23 || isNaN(val2))) {
              newIndices[offset++] = idx;
            }
            idx++;
          }
          quickFinished = true;
        }
      }
      if (!quickFinished) {
        if (dimSize === 1) {
          for (var i = 0; i < originalCount; i++) {
            var rawIndex = newStore.getRawIndex(i);
            var val = storeArr[dims[0]][rawIndex];
            if (val >= min3 && val <= max3 || isNaN(val)) {
              newIndices[offset++] = rawIndex;
            }
          }
        } else {
          for (var i = 0; i < originalCount; i++) {
            var keep = true;
            var rawIndex = newStore.getRawIndex(i);
            for (var k = 0; k < dimSize; k++) {
              var dimk = dims[k];
              var val = storeArr[dimk][rawIndex];
              if (val < range[dimk][0] || val > range[dimk][1]) {
                keep = false;
              }
            }
            if (keep) {
              newIndices[offset++] = newStore.getRawIndex(i);
            }
          }
        }
      }
      if (offset < originalCount) {
        newStore._indices = newIndices;
      }
      newStore._count = offset;
      newStore._extent = [];
      newStore._updateGetRawIdx();
      return newStore;
    };
    DataStore2.prototype.map = function(dims, cb) {
      var target = this.clone(dims);
      this._updateDims(target, dims, cb);
      return target;
    };
    DataStore2.prototype.modify = function(dims, cb) {
      this._updateDims(this, dims, cb);
    };
    DataStore2.prototype._updateDims = function(target, dims, cb) {
      var targetChunks = target._chunks;
      var tmpRetValue = [];
      var dimSize = dims.length;
      var dataCount = target.count();
      var values = [];
      var rawExtent = target._rawExtent;
      for (var i = 0; i < dims.length; i++) {
        rawExtent[dims[i]] = getInitialExtent();
      }
      for (var dataIndex = 0; dataIndex < dataCount; dataIndex++) {
        var rawIndex = target.getRawIndex(dataIndex);
        for (var k = 0; k < dimSize; k++) {
          values[k] = targetChunks[dims[k]][rawIndex];
        }
        values[dimSize] = dataIndex;
        var retValue = cb && cb.apply(null, values);
        if (retValue != null) {
          if (typeof retValue !== "object") {
            tmpRetValue[0] = retValue;
            retValue = tmpRetValue;
          }
          for (var i = 0; i < retValue.length; i++) {
            var dim = dims[i];
            var val = retValue[i];
            var rawExtentOnDim = rawExtent[dim];
            var dimStore = targetChunks[dim];
            if (dimStore) {
              dimStore[rawIndex] = val;
            }
            if (val < rawExtentOnDim[0]) {
              rawExtentOnDim[0] = val;
            }
            if (val > rawExtentOnDim[1]) {
              rawExtentOnDim[1] = val;
            }
          }
        }
      }
    };
    DataStore2.prototype.lttbDownSample = function(valueDimension, rate) {
      var target = this.clone([valueDimension], true);
      var targetStorage = target._chunks;
      var dimStore = targetStorage[valueDimension];
      var len2 = this.count();
      var sampledIndex = 0;
      var frameSize = Math.floor(1 / rate);
      var currentRawIndex = this.getRawIndex(0);
      var maxArea;
      var area;
      var nextRawIndex;
      var newIndices = new (getIndicesCtor(this._rawCount))(Math.min((Math.ceil(len2 / frameSize) + 2) * 2, len2));
      newIndices[sampledIndex++] = currentRawIndex;
      for (var i = 1; i < len2 - 1; i += frameSize) {
        var nextFrameStart = Math.min(i + frameSize, len2 - 1);
        var nextFrameEnd = Math.min(i + frameSize * 2, len2);
        var avgX = (nextFrameEnd + nextFrameStart) / 2;
        var avgY = 0;
        for (var idx = nextFrameStart; idx < nextFrameEnd; idx++) {
          var rawIndex = this.getRawIndex(idx);
          var y = dimStore[rawIndex];
          if (isNaN(y)) {
            continue;
          }
          avgY += y;
        }
        avgY /= nextFrameEnd - nextFrameStart;
        var frameStart = i;
        var frameEnd = Math.min(i + frameSize, len2);
        var pointAX = i - 1;
        var pointAY = dimStore[currentRawIndex];
        maxArea = -1;
        nextRawIndex = frameStart;
        var firstNaNIndex = -1;
        var countNaN = 0;
        for (var idx = frameStart; idx < frameEnd; idx++) {
          var rawIndex = this.getRawIndex(idx);
          var y = dimStore[rawIndex];
          if (isNaN(y)) {
            countNaN++;
            if (firstNaNIndex < 0) {
              firstNaNIndex = rawIndex;
            }
            continue;
          }
          area = Math.abs((pointAX - avgX) * (y - pointAY) - (pointAX - idx) * (avgY - pointAY));
          if (area > maxArea) {
            maxArea = area;
            nextRawIndex = rawIndex;
          }
        }
        if (countNaN > 0 && countNaN < frameEnd - frameStart) {
          newIndices[sampledIndex++] = Math.min(firstNaNIndex, nextRawIndex);
          nextRawIndex = Math.max(firstNaNIndex, nextRawIndex);
        }
        newIndices[sampledIndex++] = nextRawIndex;
        currentRawIndex = nextRawIndex;
      }
      newIndices[sampledIndex++] = this.getRawIndex(len2 - 1);
      target._count = sampledIndex;
      target._indices = newIndices;
      target.getRawIndex = this._getRawIdx;
      return target;
    };
    DataStore2.prototype.downSample = function(dimension, rate, sampleValue, sampleIndex) {
      var target = this.clone([dimension], true);
      var targetStorage = target._chunks;
      var frameValues = [];
      var frameSize = Math.floor(1 / rate);
      var dimStore = targetStorage[dimension];
      var len2 = this.count();
      var rawExtentOnDim = target._rawExtent[dimension] = getInitialExtent();
      var newIndices = new (getIndicesCtor(this._rawCount))(Math.ceil(len2 / frameSize));
      var offset = 0;
      for (var i = 0; i < len2; i += frameSize) {
        if (frameSize > len2 - i) {
          frameSize = len2 - i;
          frameValues.length = frameSize;
        }
        for (var k = 0; k < frameSize; k++) {
          var dataIdx = this.getRawIndex(i + k);
          frameValues[k] = dimStore[dataIdx];
        }
        var value = sampleValue(frameValues);
        var sampleFrameIdx = this.getRawIndex(Math.min(i + sampleIndex(frameValues, value) || 0, len2 - 1));
        dimStore[sampleFrameIdx] = value;
        if (value < rawExtentOnDim[0]) {
          rawExtentOnDim[0] = value;
        }
        if (value > rawExtentOnDim[1]) {
          rawExtentOnDim[1] = value;
        }
        newIndices[offset++] = sampleFrameIdx;
      }
      target._count = offset;
      target._indices = newIndices;
      target._updateGetRawIdx();
      return target;
    };
    DataStore2.prototype.each = function(dims, cb) {
      if (!this._count) {
        return;
      }
      var dimSize = dims.length;
      var chunks = this._chunks;
      for (var i = 0, len2 = this.count(); i < len2; i++) {
        var rawIdx = this.getRawIndex(i);
        switch (dimSize) {
          case 0:
            cb(i);
            break;
          case 1:
            cb(chunks[dims[0]][rawIdx], i);
            break;
          case 2:
            cb(chunks[dims[0]][rawIdx], chunks[dims[1]][rawIdx], i);
            break;
          default:
            var k = 0;
            var value = [];
            for (; k < dimSize; k++) {
              value[k] = chunks[dims[k]][rawIdx];
            }
            value[k] = i;
            cb.apply(null, value);
        }
      }
    };
    DataStore2.prototype.getDataExtent = function(dim) {
      var dimData = this._chunks[dim];
      var initialExtent = getInitialExtent();
      if (!dimData) {
        return initialExtent;
      }
      var currEnd = this.count();
      var useRaw = !this._indices;
      var dimExtent;
      if (useRaw) {
        return this._rawExtent[dim].slice();
      }
      dimExtent = this._extent[dim];
      if (dimExtent) {
        return dimExtent.slice();
      }
      dimExtent = initialExtent;
      var min3 = dimExtent[0];
      var max3 = dimExtent[1];
      for (var i = 0; i < currEnd; i++) {
        var rawIdx = this.getRawIndex(i);
        var value = dimData[rawIdx];
        value < min3 && (min3 = value);
        value > max3 && (max3 = value);
      }
      dimExtent = [min3, max3];
      this._extent[dim] = dimExtent;
      return dimExtent;
    };
    DataStore2.prototype.getRawDataItem = function(idx) {
      var rawIdx = this.getRawIndex(idx);
      if (!this._provider.persistent) {
        var val = [];
        var chunks = this._chunks;
        for (var i = 0; i < chunks.length; i++) {
          val.push(chunks[i][rawIdx]);
        }
        return val;
      } else {
        return this._provider.getItem(rawIdx);
      }
    };
    DataStore2.prototype.clone = function(clonedDims, ignoreIndices) {
      var target = new DataStore2();
      var chunks = this._chunks;
      var clonedDimsMap = clonedDims && reduce(clonedDims, function(obj, dimIdx) {
        obj[dimIdx] = true;
        return obj;
      }, {});
      if (clonedDimsMap) {
        for (var i = 0; i < chunks.length; i++) {
          target._chunks[i] = !clonedDimsMap[i] ? chunks[i] : cloneChunk(chunks[i]);
        }
      } else {
        target._chunks = chunks;
      }
      this._copyCommonProps(target);
      if (!ignoreIndices) {
        target._indices = this._cloneIndices();
      }
      target._updateGetRawIdx();
      return target;
    };
    DataStore2.prototype._copyCommonProps = function(target) {
      target._count = this._count;
      target._rawCount = this._rawCount;
      target._provider = this._provider;
      target._dimensions = this._dimensions;
      target._extent = clone(this._extent);
      target._rawExtent = clone(this._rawExtent);
    };
    DataStore2.prototype._cloneIndices = function() {
      if (this._indices) {
        var Ctor = this._indices.constructor;
        var indices = void 0;
        if (Ctor === Array) {
          var thisCount = this._indices.length;
          indices = new Ctor(thisCount);
          for (var i = 0; i < thisCount; i++) {
            indices[i] = this._indices[i];
          }
        } else {
          indices = new Ctor(this._indices);
        }
        return indices;
      }
      return null;
    };
    DataStore2.prototype._getRawIdxIdentity = function(idx) {
      return idx;
    };
    DataStore2.prototype._getRawIdx = function(idx) {
      if (idx < this._count && idx >= 0) {
        return this._indices[idx];
      }
      return -1;
    };
    DataStore2.prototype._updateGetRawIdx = function() {
      this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
    };
    DataStore2.internalField = function() {
      function getDimValueSimply(dataItem, property, dataIndex, dimIndex) {
        return parseDataValue(dataItem[dimIndex], this._dimensions[dimIndex]);
      }
      defaultDimValueGetters = {
        arrayRows: getDimValueSimply,
        objectRows: function(dataItem, property, dataIndex, dimIndex) {
          return parseDataValue(dataItem[property], this._dimensions[dimIndex]);
        },
        keyedColumns: getDimValueSimply,
        original: function(dataItem, property, dataIndex, dimIndex) {
          var value = dataItem && (dataItem.value == null ? dataItem : dataItem.value);
          return parseDataValue(value instanceof Array ? value[dimIndex] : value, this._dimensions[dimIndex]);
        },
        typedArray: function(dataItem, property, dataIndex, dimIndex) {
          return dataItem[dimIndex];
        }
      };
    }();
    return DataStore2;
  }()
);
var DataStore_default = DataStore;

// node_modules/echarts/lib/data/helper/SeriesDataSchema.js
var inner = makeInner();
var dimTypeShort = {
  float: "f",
  int: "i",
  ordinal: "o",
  number: "n",
  time: "t"
};
var SeriesDataSchema = (
  /** @class */
  function() {
    function SeriesDataSchema2(opt) {
      this.dimensions = opt.dimensions;
      this._dimOmitted = opt.dimensionOmitted;
      this.source = opt.source;
      this._fullDimCount = opt.fullDimensionCount;
      this._updateDimOmitted(opt.dimensionOmitted);
    }
    SeriesDataSchema2.prototype.isDimensionOmitted = function() {
      return this._dimOmitted;
    };
    SeriesDataSchema2.prototype._updateDimOmitted = function(dimensionOmitted) {
      this._dimOmitted = dimensionOmitted;
      if (!dimensionOmitted) {
        return;
      }
      if (!this._dimNameMap) {
        this._dimNameMap = ensureSourceDimNameMap(this.source);
      }
    };
    SeriesDataSchema2.prototype.getSourceDimensionIndex = function(dimName) {
      return retrieve2(this._dimNameMap.get(dimName), -1);
    };
    SeriesDataSchema2.prototype.getSourceDimension = function(dimIndex) {
      var dimensionsDefine = this.source.dimensionsDefine;
      if (dimensionsDefine) {
        return dimensionsDefine[dimIndex];
      }
    };
    SeriesDataSchema2.prototype.makeStoreSchema = function() {
      var dimCount = this._fullDimCount;
      var willRetrieveDataByName = shouldRetrieveDataByName(this.source);
      var makeHashStrict = !shouldOmitUnusedDimensions(dimCount);
      var dimHash = "";
      var dims = [];
      for (var fullDimIdx = 0, seriesDimIdx = 0; fullDimIdx < dimCount; fullDimIdx++) {
        var property = void 0;
        var type = void 0;
        var ordinalMeta = void 0;
        var seriesDimDef = this.dimensions[seriesDimIdx];
        if (seriesDimDef && seriesDimDef.storeDimIndex === fullDimIdx) {
          property = willRetrieveDataByName ? seriesDimDef.name : null;
          type = seriesDimDef.type;
          ordinalMeta = seriesDimDef.ordinalMeta;
          seriesDimIdx++;
        } else {
          var sourceDimDef = this.getSourceDimension(fullDimIdx);
          if (sourceDimDef) {
            property = willRetrieveDataByName ? sourceDimDef.name : null;
            type = sourceDimDef.type;
          }
        }
        dims.push({
          property,
          type,
          ordinalMeta
        });
        if (willRetrieveDataByName && property != null && (!seriesDimDef || !seriesDimDef.isCalculationCoord)) {
          dimHash += makeHashStrict ? property.replace(/\`/g, "`1").replace(/\$/g, "`2") : property;
        }
        dimHash += "$";
        dimHash += dimTypeShort[type] || "f";
        if (ordinalMeta) {
          dimHash += ordinalMeta.uid;
        }
        dimHash += "$";
      }
      var source = this.source;
      var hash = [source.seriesLayoutBy, source.startIndex, dimHash].join("$$");
      return {
        dimensions: dims,
        hash
      };
    };
    SeriesDataSchema2.prototype.makeOutputDimensionNames = function() {
      var result = [];
      for (var fullDimIdx = 0, seriesDimIdx = 0; fullDimIdx < this._fullDimCount; fullDimIdx++) {
        var name_1 = void 0;
        var seriesDimDef = this.dimensions[seriesDimIdx];
        if (seriesDimDef && seriesDimDef.storeDimIndex === fullDimIdx) {
          if (!seriesDimDef.isCalculationCoord) {
            name_1 = seriesDimDef.name;
          }
          seriesDimIdx++;
        } else {
          var sourceDimDef = this.getSourceDimension(fullDimIdx);
          if (sourceDimDef) {
            name_1 = sourceDimDef.name;
          }
        }
        result.push(name_1);
      }
      return result;
    };
    SeriesDataSchema2.prototype.appendCalculationDimension = function(dimDef) {
      this.dimensions.push(dimDef);
      dimDef.isCalculationCoord = true;
      this._fullDimCount++;
      this._updateDimOmitted(true);
    };
    return SeriesDataSchema2;
  }()
);
function isSeriesDataSchema(schema) {
  return schema instanceof SeriesDataSchema;
}
function createDimNameMap(dimsDef) {
  var dataDimNameMap = createHashMap();
  for (var i = 0; i < (dimsDef || []).length; i++) {
    var dimDefItemRaw = dimsDef[i];
    var userDimName = isObject(dimDefItemRaw) ? dimDefItemRaw.name : dimDefItemRaw;
    if (userDimName != null && dataDimNameMap.get(userDimName) == null) {
      dataDimNameMap.set(userDimName, i);
    }
  }
  return dataDimNameMap;
}
function ensureSourceDimNameMap(source) {
  var innerSource = inner(source);
  return innerSource.dimNameMap || (innerSource.dimNameMap = createDimNameMap(source.dimensionsDefine));
}
function shouldOmitUnusedDimensions(dimCount) {
  return dimCount > 30;
}

// node_modules/echarts/lib/data/SeriesData.js
var isObject2 = isObject;
var map2 = map;
var CtorInt32Array2 = typeof Int32Array === "undefined" ? Array : Int32Array;
var ID_PREFIX = "e\0\0";
var INDEX_NOT_FOUND = -1;
var TRANSFERABLE_PROPERTIES = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount"];
var CLONE_PROPERTIES = ["_approximateExtent"];
var prepareInvertedIndex;
var getId;
var getIdNameFromStore;
var normalizeDimensions;
var transferProperties;
var cloneListForMapAndSample;
var makeIdFromName;
var SeriesData = (
  /** @class */
  function() {
    function SeriesData2(dimensionsInput, hostModel) {
      this.type = "list";
      this._dimOmitted = false;
      this._nameList = [];
      this._idList = [];
      this._visual = {};
      this._layout = {};
      this._itemVisuals = [];
      this._itemLayouts = [];
      this._graphicEls = [];
      this._approximateExtent = {};
      this._calculationInfo = {};
      this.hasItemOption = false;
      this.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "lttbDownSample", "map"];
      this.CHANGABLE_METHODS = ["filterSelf", "selectRange"];
      this.DOWNSAMPLE_METHODS = ["downSample", "lttbDownSample"];
      var dimensions;
      var assignStoreDimIdx = false;
      if (isSeriesDataSchema(dimensionsInput)) {
        dimensions = dimensionsInput.dimensions;
        this._dimOmitted = dimensionsInput.isDimensionOmitted();
        this._schema = dimensionsInput;
      } else {
        assignStoreDimIdx = true;
        dimensions = dimensionsInput;
      }
      dimensions = dimensions || ["x", "y"];
      var dimensionInfos = {};
      var dimensionNames = [];
      var invertedIndicesMap = {};
      var needsHasOwn = false;
      var emptyObj = {};
      for (var i = 0; i < dimensions.length; i++) {
        var dimInfoInput = dimensions[i];
        var dimensionInfo = isString(dimInfoInput) ? new SeriesDimensionDefine_default({
          name: dimInfoInput
        }) : !(dimInfoInput instanceof SeriesDimensionDefine_default) ? new SeriesDimensionDefine_default(dimInfoInput) : dimInfoInput;
        var dimensionName = dimensionInfo.name;
        dimensionInfo.type = dimensionInfo.type || "float";
        if (!dimensionInfo.coordDim) {
          dimensionInfo.coordDim = dimensionName;
          dimensionInfo.coordDimIndex = 0;
        }
        var otherDims = dimensionInfo.otherDims = dimensionInfo.otherDims || {};
        dimensionNames.push(dimensionName);
        dimensionInfos[dimensionName] = dimensionInfo;
        if (emptyObj[dimensionName] != null) {
          needsHasOwn = true;
        }
        if (dimensionInfo.createInvertedIndices) {
          invertedIndicesMap[dimensionName] = [];
        }
        if (otherDims.itemName === 0) {
          this._nameDimIdx = i;
        }
        if (otherDims.itemId === 0) {
          this._idDimIdx = i;
        }
        if (process.env.NODE_ENV !== "production") {
          assert(assignStoreDimIdx || dimensionInfo.storeDimIndex >= 0);
        }
        if (assignStoreDimIdx) {
          dimensionInfo.storeDimIndex = i;
        }
      }
      this.dimensions = dimensionNames;
      this._dimInfos = dimensionInfos;
      this._initGetDimensionInfo(needsHasOwn);
      this.hostModel = hostModel;
      this._invertedIndicesMap = invertedIndicesMap;
      if (this._dimOmitted) {
        var dimIdxToName_1 = this._dimIdxToName = createHashMap();
        each(dimensionNames, function(dimName) {
          dimIdxToName_1.set(dimensionInfos[dimName].storeDimIndex, dimName);
        });
      }
    }
    SeriesData2.prototype.getDimension = function(dim) {
      var dimIdx = this._recognizeDimIndex(dim);
      if (dimIdx == null) {
        return dim;
      }
      dimIdx = dim;
      if (!this._dimOmitted) {
        return this.dimensions[dimIdx];
      }
      var dimName = this._dimIdxToName.get(dimIdx);
      if (dimName != null) {
        return dimName;
      }
      var sourceDimDef = this._schema.getSourceDimension(dimIdx);
      if (sourceDimDef) {
        return sourceDimDef.name;
      }
    };
    SeriesData2.prototype.getDimensionIndex = function(dim) {
      var dimIdx = this._recognizeDimIndex(dim);
      if (dimIdx != null) {
        return dimIdx;
      }
      if (dim == null) {
        return -1;
      }
      var dimInfo = this._getDimInfo(dim);
      return dimInfo ? dimInfo.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(dim) : -1;
    };
    SeriesData2.prototype._recognizeDimIndex = function(dim) {
      if (isNumber(dim) || dim != null && !isNaN(dim) && !this._getDimInfo(dim) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(dim) < 0)) {
        return +dim;
      }
    };
    SeriesData2.prototype._getStoreDimIndex = function(dim) {
      var dimIdx = this.getDimensionIndex(dim);
      if (process.env.NODE_ENV !== "production") {
        if (dimIdx == null) {
          throw new Error("Unknown dimension " + dim);
        }
      }
      return dimIdx;
    };
    SeriesData2.prototype.getDimensionInfo = function(dim) {
      return this._getDimInfo(this.getDimension(dim));
    };
    SeriesData2.prototype._initGetDimensionInfo = function(needsHasOwn) {
      var dimensionInfos = this._dimInfos;
      this._getDimInfo = needsHasOwn ? function(dimName) {
        return dimensionInfos.hasOwnProperty(dimName) ? dimensionInfos[dimName] : void 0;
      } : function(dimName) {
        return dimensionInfos[dimName];
      };
    };
    SeriesData2.prototype.getDimensionsOnCoord = function() {
      return this._dimSummary.dataDimsOnCoord.slice();
    };
    SeriesData2.prototype.mapDimension = function(coordDim, idx) {
      var dimensionsSummary = this._dimSummary;
      if (idx == null) {
        return dimensionsSummary.encodeFirstDimNotExtra[coordDim];
      }
      var dims = dimensionsSummary.encode[coordDim];
      return dims ? dims[idx] : null;
    };
    SeriesData2.prototype.mapDimensionsAll = function(coordDim) {
      var dimensionsSummary = this._dimSummary;
      var dims = dimensionsSummary.encode[coordDim];
      return (dims || []).slice();
    };
    SeriesData2.prototype.getStore = function() {
      return this._store;
    };
    SeriesData2.prototype.initData = function(data, nameList, dimValueGetter) {
      var _this = this;
      var store;
      if (data instanceof DataStore_default) {
        store = data;
      }
      if (!store) {
        var dimensions = this.dimensions;
        var provider = isSourceInstance(data) || isArrayLike(data) ? new DefaultDataProvider(data, dimensions.length) : data;
        store = new DataStore_default();
        var dimensionInfos = map2(dimensions, function(dimName) {
          return {
            type: _this._dimInfos[dimName].type,
            property: dimName
          };
        });
        store.initData(provider, dimensionInfos, dimValueGetter);
      }
      this._store = store;
      this._nameList = (nameList || []).slice();
      this._idList = [];
      this._nameRepeatCount = {};
      this._doInit(0, store.count());
      this._dimSummary = summarizeDimensions(this, this._schema);
      this.userOutput = this._dimSummary.userOutput;
    };
    SeriesData2.prototype.appendData = function(data) {
      var range = this._store.appendData(data);
      this._doInit(range[0], range[1]);
    };
    SeriesData2.prototype.appendValues = function(values, names) {
      var _a2 = this._store.appendValues(values, names.length), start2 = _a2.start, end2 = _a2.end;
      var shouldMakeIdFromName = this._shouldMakeIdFromName();
      this._updateOrdinalMeta();
      if (names) {
        for (var idx = start2; idx < end2; idx++) {
          var sourceIdx = idx - start2;
          this._nameList[idx] = names[sourceIdx];
          if (shouldMakeIdFromName) {
            makeIdFromName(this, idx);
          }
        }
      }
    };
    SeriesData2.prototype._updateOrdinalMeta = function() {
      var store = this._store;
      var dimensions = this.dimensions;
      for (var i = 0; i < dimensions.length; i++) {
        var dimInfo = this._dimInfos[dimensions[i]];
        if (dimInfo.ordinalMeta) {
          store.collectOrdinalMeta(dimInfo.storeDimIndex, dimInfo.ordinalMeta);
        }
      }
    };
    SeriesData2.prototype._shouldMakeIdFromName = function() {
      var provider = this._store.getProvider();
      return this._idDimIdx == null && provider.getSource().sourceFormat !== SOURCE_FORMAT_TYPED_ARRAY && !provider.fillStorage;
    };
    SeriesData2.prototype._doInit = function(start2, end2) {
      if (start2 >= end2) {
        return;
      }
      var store = this._store;
      var provider = store.getProvider();
      this._updateOrdinalMeta();
      var nameList = this._nameList;
      var idList = this._idList;
      var sourceFormat = provider.getSource().sourceFormat;
      var isFormatOriginal = sourceFormat === SOURCE_FORMAT_ORIGINAL;
      if (isFormatOriginal && !provider.pure) {
        var sharedDataItem = [];
        for (var idx = start2; idx < end2; idx++) {
          var dataItem = provider.getItem(idx, sharedDataItem);
          if (!this.hasItemOption && isDataItemOption(dataItem)) {
            this.hasItemOption = true;
          }
          if (dataItem) {
            var itemName = dataItem.name;
            if (nameList[idx] == null && itemName != null) {
              nameList[idx] = convertOptionIdName(itemName, null);
            }
            var itemId = dataItem.id;
            if (idList[idx] == null && itemId != null) {
              idList[idx] = convertOptionIdName(itemId, null);
            }
          }
        }
      }
      if (this._shouldMakeIdFromName()) {
        for (var idx = start2; idx < end2; idx++) {
          makeIdFromName(this, idx);
        }
      }
      prepareInvertedIndex(this);
    };
    SeriesData2.prototype.getApproximateExtent = function(dim) {
      return this._approximateExtent[dim] || this._store.getDataExtent(this._getStoreDimIndex(dim));
    };
    SeriesData2.prototype.setApproximateExtent = function(extent, dim) {
      dim = this.getDimension(dim);
      this._approximateExtent[dim] = extent.slice();
    };
    SeriesData2.prototype.getCalculationInfo = function(key) {
      return this._calculationInfo[key];
    };
    SeriesData2.prototype.setCalculationInfo = function(key, value) {
      isObject2(key) ? extend(this._calculationInfo, key) : this._calculationInfo[key] = value;
    };
    SeriesData2.prototype.getName = function(idx) {
      var rawIndex = this.getRawIndex(idx);
      var name = this._nameList[rawIndex];
      if (name == null && this._nameDimIdx != null) {
        name = getIdNameFromStore(this, this._nameDimIdx, rawIndex);
      }
      if (name == null) {
        name = "";
      }
      return name;
    };
    SeriesData2.prototype._getCategory = function(dimIdx, idx) {
      var ordinal = this._store.get(dimIdx, idx);
      var ordinalMeta = this._store.getOrdinalMeta(dimIdx);
      if (ordinalMeta) {
        return ordinalMeta.categories[ordinal];
      }
      return ordinal;
    };
    SeriesData2.prototype.getId = function(idx) {
      return getId(this, this.getRawIndex(idx));
    };
    SeriesData2.prototype.count = function() {
      return this._store.count();
    };
    SeriesData2.prototype.get = function(dim, idx) {
      var store = this._store;
      var dimInfo = this._dimInfos[dim];
      if (dimInfo) {
        return store.get(dimInfo.storeDimIndex, idx);
      }
    };
    SeriesData2.prototype.getByRawIndex = function(dim, rawIdx) {
      var store = this._store;
      var dimInfo = this._dimInfos[dim];
      if (dimInfo) {
        return store.getByRawIndex(dimInfo.storeDimIndex, rawIdx);
      }
    };
    SeriesData2.prototype.getIndices = function() {
      return this._store.getIndices();
    };
    SeriesData2.prototype.getDataExtent = function(dim) {
      return this._store.getDataExtent(this._getStoreDimIndex(dim));
    };
    SeriesData2.prototype.getSum = function(dim) {
      return this._store.getSum(this._getStoreDimIndex(dim));
    };
    SeriesData2.prototype.getMedian = function(dim) {
      return this._store.getMedian(this._getStoreDimIndex(dim));
    };
    SeriesData2.prototype.getValues = function(dimensions, idx) {
      var _this = this;
      var store = this._store;
      return isArray(dimensions) ? store.getValues(map2(dimensions, function(dim) {
        return _this._getStoreDimIndex(dim);
      }), idx) : store.getValues(dimensions);
    };
    SeriesData2.prototype.hasValue = function(idx) {
      var dataDimIndicesOnCoord = this._dimSummary.dataDimIndicesOnCoord;
      for (var i = 0, len2 = dataDimIndicesOnCoord.length; i < len2; i++) {
        if (isNaN(this._store.get(dataDimIndicesOnCoord[i], idx))) {
          return false;
        }
      }
      return true;
    };
    SeriesData2.prototype.indexOfName = function(name) {
      for (var i = 0, len2 = this._store.count(); i < len2; i++) {
        if (this.getName(i) === name) {
          return i;
        }
      }
      return -1;
    };
    SeriesData2.prototype.getRawIndex = function(idx) {
      return this._store.getRawIndex(idx);
    };
    SeriesData2.prototype.indexOfRawIndex = function(rawIndex) {
      return this._store.indexOfRawIndex(rawIndex);
    };
    SeriesData2.prototype.rawIndexOf = function(dim, value) {
      var invertedIndices = dim && this._invertedIndicesMap[dim];
      if (process.env.NODE_ENV !== "production") {
        if (!invertedIndices) {
          throw new Error("Do not supported yet");
        }
      }
      var rawIndex = invertedIndices[value];
      if (rawIndex == null || isNaN(rawIndex)) {
        return INDEX_NOT_FOUND;
      }
      return rawIndex;
    };
    SeriesData2.prototype.indicesOfNearest = function(dim, value, maxDistance) {
      return this._store.indicesOfNearest(this._getStoreDimIndex(dim), value, maxDistance);
    };
    SeriesData2.prototype.each = function(dims, cb, ctx) {
      "use strict";
      if (isFunction(dims)) {
        ctx = cb;
        cb = dims;
        dims = [];
      }
      var fCtx = ctx || this;
      var dimIndices = map2(normalizeDimensions(dims), this._getStoreDimIndex, this);
      this._store.each(dimIndices, fCtx ? bind(cb, fCtx) : cb);
    };
    SeriesData2.prototype.filterSelf = function(dims, cb, ctx) {
      "use strict";
      if (isFunction(dims)) {
        ctx = cb;
        cb = dims;
        dims = [];
      }
      var fCtx = ctx || this;
      var dimIndices = map2(normalizeDimensions(dims), this._getStoreDimIndex, this);
      this._store = this._store.filter(dimIndices, fCtx ? bind(cb, fCtx) : cb);
      return this;
    };
    SeriesData2.prototype.selectRange = function(range) {
      "use strict";
      var _this = this;
      var innerRange = {};
      var dims = keys(range);
      var dimIndices = [];
      each(dims, function(dim) {
        var dimIdx = _this._getStoreDimIndex(dim);
        innerRange[dimIdx] = range[dim];
        dimIndices.push(dimIdx);
      });
      this._store = this._store.selectRange(innerRange);
      return this;
    };
    SeriesData2.prototype.mapArray = function(dims, cb, ctx) {
      "use strict";
      if (isFunction(dims)) {
        ctx = cb;
        cb = dims;
        dims = [];
      }
      ctx = ctx || this;
      var result = [];
      this.each(dims, function() {
        result.push(cb && cb.apply(this, arguments));
      }, ctx);
      return result;
    };
    SeriesData2.prototype.map = function(dims, cb, ctx, ctxCompat) {
      "use strict";
      var fCtx = ctx || ctxCompat || this;
      var dimIndices = map2(normalizeDimensions(dims), this._getStoreDimIndex, this);
      var list = cloneListForMapAndSample(this);
      list._store = this._store.map(dimIndices, fCtx ? bind(cb, fCtx) : cb);
      return list;
    };
    SeriesData2.prototype.modify = function(dims, cb, ctx, ctxCompat) {
      var _this = this;
      var fCtx = ctx || ctxCompat || this;
      if (process.env.NODE_ENV !== "production") {
        each(normalizeDimensions(dims), function(dim) {
          var dimInfo = _this.getDimensionInfo(dim);
          if (!dimInfo.isCalculationCoord) {
            console.error("Danger: only stack dimension can be modified");
          }
        });
      }
      var dimIndices = map2(normalizeDimensions(dims), this._getStoreDimIndex, this);
      this._store.modify(dimIndices, fCtx ? bind(cb, fCtx) : cb);
    };
    SeriesData2.prototype.downSample = function(dimension, rate, sampleValue, sampleIndex) {
      var list = cloneListForMapAndSample(this);
      list._store = this._store.downSample(this._getStoreDimIndex(dimension), rate, sampleValue, sampleIndex);
      return list;
    };
    SeriesData2.prototype.lttbDownSample = function(valueDimension, rate) {
      var list = cloneListForMapAndSample(this);
      list._store = this._store.lttbDownSample(this._getStoreDimIndex(valueDimension), rate);
      return list;
    };
    SeriesData2.prototype.getRawDataItem = function(idx) {
      return this._store.getRawDataItem(idx);
    };
    SeriesData2.prototype.getItemModel = function(idx) {
      var hostModel = this.hostModel;
      var dataItem = this.getRawDataItem(idx);
      return new Model_default(dataItem, hostModel, hostModel && hostModel.ecModel);
    };
    SeriesData2.prototype.diff = function(otherList) {
      var thisList = this;
      return new DataDiffer_default(otherList ? otherList.getStore().getIndices() : [], this.getStore().getIndices(), function(idx) {
        return getId(otherList, idx);
      }, function(idx) {
        return getId(thisList, idx);
      });
    };
    SeriesData2.prototype.getVisual = function(key) {
      var visual = this._visual;
      return visual && visual[key];
    };
    SeriesData2.prototype.setVisual = function(kvObj, val) {
      this._visual = this._visual || {};
      if (isObject2(kvObj)) {
        extend(this._visual, kvObj);
      } else {
        this._visual[kvObj] = val;
      }
    };
    SeriesData2.prototype.getItemVisual = function(idx, key) {
      var itemVisual = this._itemVisuals[idx];
      var val = itemVisual && itemVisual[key];
      if (val == null) {
        return this.getVisual(key);
      }
      return val;
    };
    SeriesData2.prototype.hasItemVisual = function() {
      return this._itemVisuals.length > 0;
    };
    SeriesData2.prototype.ensureUniqueItemVisual = function(idx, key) {
      var itemVisuals = this._itemVisuals;
      var itemVisual = itemVisuals[idx];
      if (!itemVisual) {
        itemVisual = itemVisuals[idx] = {};
      }
      var val = itemVisual[key];
      if (val == null) {
        val = this.getVisual(key);
        if (isArray(val)) {
          val = val.slice();
        } else if (isObject2(val)) {
          val = extend({}, val);
        }
        itemVisual[key] = val;
      }
      return val;
    };
    SeriesData2.prototype.setItemVisual = function(idx, key, value) {
      var itemVisual = this._itemVisuals[idx] || {};
      this._itemVisuals[idx] = itemVisual;
      if (isObject2(key)) {
        extend(itemVisual, key);
      } else {
        itemVisual[key] = value;
      }
    };
    SeriesData2.prototype.clearAllVisual = function() {
      this._visual = {};
      this._itemVisuals = [];
    };
    SeriesData2.prototype.setLayout = function(key, val) {
      isObject2(key) ? extend(this._layout, key) : this._layout[key] = val;
    };
    SeriesData2.prototype.getLayout = function(key) {
      return this._layout[key];
    };
    SeriesData2.prototype.getItemLayout = function(idx) {
      return this._itemLayouts[idx];
    };
    SeriesData2.prototype.setItemLayout = function(idx, layout, merge2) {
      this._itemLayouts[idx] = merge2 ? extend(this._itemLayouts[idx] || {}, layout) : layout;
    };
    SeriesData2.prototype.clearItemLayouts = function() {
      this._itemLayouts.length = 0;
    };
    SeriesData2.prototype.setItemGraphicEl = function(idx, el) {
      var seriesIndex = this.hostModel && this.hostModel.seriesIndex;
      setCommonECData(seriesIndex, this.dataType, idx, el);
      this._graphicEls[idx] = el;
    };
    SeriesData2.prototype.getItemGraphicEl = function(idx) {
      return this._graphicEls[idx];
    };
    SeriesData2.prototype.eachItemGraphicEl = function(cb, context) {
      each(this._graphicEls, function(el, idx) {
        if (el) {
          cb && cb.call(context, el, idx);
        }
      });
    };
    SeriesData2.prototype.cloneShallow = function(list) {
      if (!list) {
        list = new SeriesData2(this._schema ? this._schema : map2(this.dimensions, this._getDimInfo, this), this.hostModel);
      }
      transferProperties(list, this);
      list._store = this._store;
      return list;
    };
    SeriesData2.prototype.wrapMethod = function(methodName, injectFunction) {
      var originalMethod = this[methodName];
      if (!isFunction(originalMethod)) {
        return;
      }
      this.__wrappedMethods = this.__wrappedMethods || [];
      this.__wrappedMethods.push(methodName);
      this[methodName] = function() {
        var res = originalMethod.apply(this, arguments);
        return injectFunction.apply(this, [res].concat(slice(arguments)));
      };
    };
    SeriesData2.internalField = function() {
      prepareInvertedIndex = function(data) {
        var invertedIndicesMap = data._invertedIndicesMap;
        each(invertedIndicesMap, function(invertedIndices, dim) {
          var dimInfo = data._dimInfos[dim];
          var ordinalMeta = dimInfo.ordinalMeta;
          var store = data._store;
          if (ordinalMeta) {
            invertedIndices = invertedIndicesMap[dim] = new CtorInt32Array2(ordinalMeta.categories.length);
            for (var i = 0; i < invertedIndices.length; i++) {
              invertedIndices[i] = INDEX_NOT_FOUND;
            }
            for (var i = 0; i < store.count(); i++) {
              invertedIndices[store.get(dimInfo.storeDimIndex, i)] = i;
            }
          }
        });
      };
      getIdNameFromStore = function(data, dimIdx, idx) {
        return convertOptionIdName(data._getCategory(dimIdx, idx), null);
      };
      getId = function(data, rawIndex) {
        var id = data._idList[rawIndex];
        if (id == null && data._idDimIdx != null) {
          id = getIdNameFromStore(data, data._idDimIdx, rawIndex);
        }
        if (id == null) {
          id = ID_PREFIX + rawIndex;
        }
        return id;
      };
      normalizeDimensions = function(dimensions) {
        if (!isArray(dimensions)) {
          dimensions = dimensions != null ? [dimensions] : [];
        }
        return dimensions;
      };
      cloneListForMapAndSample = function(original) {
        var list = new SeriesData2(original._schema ? original._schema : map2(original.dimensions, original._getDimInfo, original), original.hostModel);
        transferProperties(list, original);
        return list;
      };
      transferProperties = function(target, source) {
        each(TRANSFERABLE_PROPERTIES.concat(source.__wrappedMethods || []), function(propName) {
          if (source.hasOwnProperty(propName)) {
            target[propName] = source[propName];
          }
        });
        target.__wrappedMethods = source.__wrappedMethods;
        each(CLONE_PROPERTIES, function(propName) {
          target[propName] = clone(source[propName]);
        });
        target._calculationInfo = extend({}, source._calculationInfo);
      };
      makeIdFromName = function(data, idx) {
        var nameList = data._nameList;
        var idList = data._idList;
        var nameDimIdx = data._nameDimIdx;
        var idDimIdx = data._idDimIdx;
        var name = nameList[idx];
        var id = idList[idx];
        if (name == null && nameDimIdx != null) {
          nameList[idx] = name = getIdNameFromStore(data, nameDimIdx, idx);
        }
        if (id == null && idDimIdx != null) {
          idList[idx] = id = getIdNameFromStore(data, idDimIdx, idx);
        }
        if (id == null && name != null) {
          var nameRepeatCount = data._nameRepeatCount;
          var nmCnt = nameRepeatCount[name] = (nameRepeatCount[name] || 0) + 1;
          id = name;
          if (nmCnt > 1) {
            id += "__ec__" + nmCnt;
          }
          idList[idx] = id;
        }
      };
    }();
    return SeriesData2;
  }()
);
var SeriesData_default = SeriesData;

// node_modules/echarts/lib/data/helper/createDimensions.js
function prepareSeriesDataSchema(source, opt) {
  if (!isSourceInstance(source)) {
    source = createSourceFromSeriesDataOption(source);
  }
  opt = opt || {};
  var sysDims = opt.coordDimensions || [];
  var dimsDef = opt.dimensionsDefine || source.dimensionsDefine || [];
  var coordDimNameMap = createHashMap();
  var resultList = [];
  var dimCount = getDimCount(source, sysDims, dimsDef, opt.dimensionsCount);
  var omitUnusedDimensions = opt.canOmitUnusedDimensions && shouldOmitUnusedDimensions(dimCount);
  var isUsingSourceDimensionsDef = dimsDef === source.dimensionsDefine;
  var dataDimNameMap = isUsingSourceDimensionsDef ? ensureSourceDimNameMap(source) : createDimNameMap(dimsDef);
  var encodeDef = opt.encodeDefine;
  if (!encodeDef && opt.encodeDefaulter) {
    encodeDef = opt.encodeDefaulter(source, dimCount);
  }
  var encodeDefMap = createHashMap(encodeDef);
  var indicesMap = new CtorInt32Array(dimCount);
  for (var i = 0; i < indicesMap.length; i++) {
    indicesMap[i] = -1;
  }
  function getResultItem(dimIdx) {
    var idx = indicesMap[dimIdx];
    if (idx < 0) {
      var dimDefItemRaw = dimsDef[dimIdx];
      var dimDefItem = isObject(dimDefItemRaw) ? dimDefItemRaw : {
        name: dimDefItemRaw
      };
      var resultItem2 = new SeriesDimensionDefine_default();
      var userDimName = dimDefItem.name;
      if (userDimName != null && dataDimNameMap.get(userDimName) != null) {
        resultItem2.name = resultItem2.displayName = userDimName;
      }
      dimDefItem.type != null && (resultItem2.type = dimDefItem.type);
      dimDefItem.displayName != null && (resultItem2.displayName = dimDefItem.displayName);
      var newIdx = resultList.length;
      indicesMap[dimIdx] = newIdx;
      resultItem2.storeDimIndex = dimIdx;
      resultList.push(resultItem2);
      return resultItem2;
    }
    return resultList[idx];
  }
  if (!omitUnusedDimensions) {
    for (var i = 0; i < dimCount; i++) {
      getResultItem(i);
    }
  }
  encodeDefMap.each(function(dataDimsRaw, coordDim2) {
    var dataDims = normalizeToArray(dataDimsRaw).slice();
    if (dataDims.length === 1 && !isString(dataDims[0]) && dataDims[0] < 0) {
      encodeDefMap.set(coordDim2, false);
      return;
    }
    var validDataDims = encodeDefMap.set(coordDim2, []);
    each(dataDims, function(resultDimIdxOrName, idx) {
      var resultDimIdx2 = isString(resultDimIdxOrName) ? dataDimNameMap.get(resultDimIdxOrName) : resultDimIdxOrName;
      if (resultDimIdx2 != null && resultDimIdx2 < dimCount) {
        validDataDims[idx] = resultDimIdx2;
        applyDim(getResultItem(resultDimIdx2), coordDim2, idx);
      }
    });
  });
  var availDimIdx = 0;
  each(sysDims, function(sysDimItemRaw) {
    var coordDim2;
    var sysDimItemDimsDef;
    var sysDimItemOtherDims;
    var sysDimItem;
    if (isString(sysDimItemRaw)) {
      coordDim2 = sysDimItemRaw;
      sysDimItem = {};
    } else {
      sysDimItem = sysDimItemRaw;
      coordDim2 = sysDimItem.name;
      var ordinalMeta = sysDimItem.ordinalMeta;
      sysDimItem.ordinalMeta = null;
      sysDimItem = extend({}, sysDimItem);
      sysDimItem.ordinalMeta = ordinalMeta;
      sysDimItemDimsDef = sysDimItem.dimsDef;
      sysDimItemOtherDims = sysDimItem.otherDims;
      sysDimItem.name = sysDimItem.coordDim = sysDimItem.coordDimIndex = sysDimItem.dimsDef = sysDimItem.otherDims = null;
    }
    var dataDims = encodeDefMap.get(coordDim2);
    if (dataDims === false) {
      return;
    }
    dataDims = normalizeToArray(dataDims);
    if (!dataDims.length) {
      for (var i2 = 0; i2 < (sysDimItemDimsDef && sysDimItemDimsDef.length || 1); i2++) {
        while (availDimIdx < dimCount && getResultItem(availDimIdx).coordDim != null) {
          availDimIdx++;
        }
        availDimIdx < dimCount && dataDims.push(availDimIdx++);
      }
    }
    each(dataDims, function(resultDimIdx2, coordDimIndex) {
      var resultItem2 = getResultItem(resultDimIdx2);
      if (isUsingSourceDimensionsDef && sysDimItem.type != null) {
        resultItem2.type = sysDimItem.type;
      }
      applyDim(defaults(resultItem2, sysDimItem), coordDim2, coordDimIndex);
      if (resultItem2.name == null && sysDimItemDimsDef) {
        var sysDimItemDimsDefItem = sysDimItemDimsDef[coordDimIndex];
        !isObject(sysDimItemDimsDefItem) && (sysDimItemDimsDefItem = {
          name: sysDimItemDimsDefItem
        });
        resultItem2.name = resultItem2.displayName = sysDimItemDimsDefItem.name;
        resultItem2.defaultTooltip = sysDimItemDimsDefItem.defaultTooltip;
      }
      sysDimItemOtherDims && defaults(resultItem2.otherDims, sysDimItemOtherDims);
    });
  });
  function applyDim(resultItem2, coordDim2, coordDimIndex) {
    if (VISUAL_DIMENSIONS.get(coordDim2) != null) {
      resultItem2.otherDims[coordDim2] = coordDimIndex;
    } else {
      resultItem2.coordDim = coordDim2;
      resultItem2.coordDimIndex = coordDimIndex;
      coordDimNameMap.set(coordDim2, true);
    }
  }
  var generateCoord = opt.generateCoord;
  var generateCoordCount = opt.generateCoordCount;
  var fromZero = generateCoordCount != null;
  generateCoordCount = generateCoord ? generateCoordCount || 1 : 0;
  var extra = generateCoord || "value";
  function ifNoNameFillWithCoordName(resultItem2) {
    if (resultItem2.name == null) {
      resultItem2.name = resultItem2.coordDim;
    }
  }
  if (!omitUnusedDimensions) {
    for (var resultDimIdx = 0; resultDimIdx < dimCount; resultDimIdx++) {
      var resultItem = getResultItem(resultDimIdx);
      var coordDim = resultItem.coordDim;
      if (coordDim == null) {
        resultItem.coordDim = genCoordDimName(extra, coordDimNameMap, fromZero);
        resultItem.coordDimIndex = 0;
        if (!generateCoord || generateCoordCount <= 0) {
          resultItem.isExtraCoord = true;
        }
        generateCoordCount--;
      }
      ifNoNameFillWithCoordName(resultItem);
      if (resultItem.type == null && (guessOrdinal(source, resultDimIdx) === BE_ORDINAL.Must || resultItem.isExtraCoord && (resultItem.otherDims.itemName != null || resultItem.otherDims.seriesName != null))) {
        resultItem.type = "ordinal";
      }
    }
  } else {
    each(resultList, function(resultItem2) {
      ifNoNameFillWithCoordName(resultItem2);
    });
    resultList.sort(function(item0, item1) {
      return item0.storeDimIndex - item1.storeDimIndex;
    });
  }
  removeDuplication(resultList);
  return new SeriesDataSchema({
    source,
    dimensions: resultList,
    fullDimensionCount: dimCount,
    dimensionOmitted: omitUnusedDimensions
  });
}
function removeDuplication(result) {
  var duplicationMap = createHashMap();
  for (var i = 0; i < result.length; i++) {
    var dim = result[i];
    var dimOriginalName = dim.name;
    var count = duplicationMap.get(dimOriginalName) || 0;
    if (count > 0) {
      dim.name = dimOriginalName + (count - 1);
    }
    count++;
    duplicationMap.set(dimOriginalName, count);
  }
}
function getDimCount(source, sysDims, dimsDef, optDimCount) {
  var dimCount = Math.max(source.dimensionsDetectedCount || 1, sysDims.length, dimsDef.length, optDimCount || 0);
  each(sysDims, function(sysDimItem) {
    var sysDimItemDimsDef;
    if (isObject(sysDimItem) && (sysDimItemDimsDef = sysDimItem.dimsDef)) {
      dimCount = Math.max(dimCount, sysDimItemDimsDef.length);
    }
  });
  return dimCount;
}
function genCoordDimName(name, map3, fromZero) {
  if (fromZero || map3.hasKey(name)) {
    var i = 0;
    while (map3.hasKey(name + i)) {
      i++;
    }
    name += i;
  }
  map3.set(name, true);
  return name;
}

// node_modules/echarts/lib/core/CoordinateSystem.js
var coordinateSystemCreators = {};
var CoordinateSystemManager = (
  /** @class */
  function() {
    function CoordinateSystemManager2() {
      this._coordinateSystems = [];
    }
    CoordinateSystemManager2.prototype.create = function(ecModel, api) {
      var coordinateSystems = [];
      each(coordinateSystemCreators, function(creator, type) {
        var list = creator.create(ecModel, api);
        coordinateSystems = coordinateSystems.concat(list || []);
      });
      this._coordinateSystems = coordinateSystems;
    };
    CoordinateSystemManager2.prototype.update = function(ecModel, api) {
      each(this._coordinateSystems, function(coordSys) {
        coordSys.update && coordSys.update(ecModel, api);
      });
    };
    CoordinateSystemManager2.prototype.getCoordinateSystems = function() {
      return this._coordinateSystems.slice();
    };
    CoordinateSystemManager2.register = function(type, creator) {
      coordinateSystemCreators[type] = creator;
    };
    CoordinateSystemManager2.get = function(type) {
      return coordinateSystemCreators[type];
    };
    return CoordinateSystemManager2;
  }()
);
var CoordinateSystem_default = CoordinateSystemManager;

// node_modules/echarts/lib/util/component.js
var base = Math.round(Math.random() * 10);
function getUID(type) {
  return [type || "", base++].join("_");
}
function enableSubTypeDefaulter(target) {
  var subTypeDefaulters = {};
  target.registerSubTypeDefaulter = function(componentType, defaulter) {
    var componentTypeInfo = parseClassType(componentType);
    subTypeDefaulters[componentTypeInfo.main] = defaulter;
  };
  target.determineSubType = function(componentType, option) {
    var type = option.type;
    if (!type) {
      var componentTypeMain = parseClassType(componentType).main;
      if (target.hasSubTypes(componentType) && subTypeDefaulters[componentTypeMain]) {
        type = subTypeDefaulters[componentTypeMain](option);
      }
    }
    return type;
  };
}
function enableTopologicalTravel(entity, dependencyGetter) {
  entity.topologicalTravel = function(targetNameList, fullNameList, callback, context) {
    if (!targetNameList.length) {
      return;
    }
    var result = makeDepndencyGraph(fullNameList);
    var graph = result.graph;
    var noEntryList = result.noEntryList;
    var targetNameSet = {};
    each(targetNameList, function(name) {
      targetNameSet[name] = true;
    });
    while (noEntryList.length) {
      var currComponentType = noEntryList.pop();
      var currVertex = graph[currComponentType];
      var isInTargetNameSet = !!targetNameSet[currComponentType];
      if (isInTargetNameSet) {
        callback.call(context, currComponentType, currVertex.originalDeps.slice());
        delete targetNameSet[currComponentType];
      }
      each(currVertex.successor, isInTargetNameSet ? removeEdgeAndAdd : removeEdge);
    }
    each(targetNameSet, function() {
      var errMsg = "";
      if (process.env.NODE_ENV !== "production") {
        errMsg = makePrintable("Circular dependency may exists: ", targetNameSet, targetNameList, fullNameList);
      }
      throw new Error(errMsg);
    });
    function removeEdge(succComponentType) {
      graph[succComponentType].entryCount--;
      if (graph[succComponentType].entryCount === 0) {
        noEntryList.push(succComponentType);
      }
    }
    function removeEdgeAndAdd(succComponentType) {
      targetNameSet[succComponentType] = true;
      removeEdge(succComponentType);
    }
  };
  function makeDepndencyGraph(fullNameList) {
    var graph = {};
    var noEntryList = [];
    each(fullNameList, function(name) {
      var thisItem = createDependencyGraphItem(graph, name);
      var originalDeps = thisItem.originalDeps = dependencyGetter(name);
      var availableDeps = getAvailableDependencies(originalDeps, fullNameList);
      thisItem.entryCount = availableDeps.length;
      if (thisItem.entryCount === 0) {
        noEntryList.push(name);
      }
      each(availableDeps, function(dependentName) {
        if (indexOf(thisItem.predecessor, dependentName) < 0) {
          thisItem.predecessor.push(dependentName);
        }
        var thatItem = createDependencyGraphItem(graph, dependentName);
        if (indexOf(thatItem.successor, dependentName) < 0) {
          thatItem.successor.push(name);
        }
      });
    });
    return {
      graph,
      noEntryList
    };
  }
  function createDependencyGraphItem(graph, name) {
    if (!graph[name]) {
      graph[name] = {
        predecessor: [],
        successor: []
      };
    }
    return graph[name];
  }
  function getAvailableDependencies(originalDeps, fullNameList) {
    var availableDeps = [];
    each(originalDeps, function(dep) {
      indexOf(fullNameList, dep) >= 0 && availableDeps.push(dep);
    });
    return availableDeps;
  }
}

// node_modules/zrender/lib/core/fourPointsTransform.js
var LN2 = Math.log(2);
function determinant(rows, rank, rowStart, rowMask, colMask, detCache) {
  var cacheKey = rowMask + "-" + colMask;
  var fullRank = rows.length;
  if (detCache.hasOwnProperty(cacheKey)) {
    return detCache[cacheKey];
  }
  if (rank === 1) {
    var colStart = Math.round(Math.log((1 << fullRank) - 1 & ~colMask) / LN2);
    return rows[rowStart][colStart];
  }
  var subRowMask = rowMask | 1 << rowStart;
  var subRowStart = rowStart + 1;
  while (rowMask & 1 << subRowStart) {
    subRowStart++;
  }
  var sum = 0;
  for (var j = 0, colLocalIdx = 0; j < fullRank; j++) {
    var colTag = 1 << j;
    if (!(colTag & colMask)) {
      sum += (colLocalIdx % 2 ? -1 : 1) * rows[rowStart][j] * determinant(rows, rank - 1, subRowStart, subRowMask, colMask | colTag, detCache);
      colLocalIdx++;
    }
  }
  detCache[cacheKey] = sum;
  return sum;
}
function buildTransformer(src, dest) {
  var mA = [
    [src[0], src[1], 1, 0, 0, 0, -dest[0] * src[0], -dest[0] * src[1]],
    [0, 0, 0, src[0], src[1], 1, -dest[1] * src[0], -dest[1] * src[1]],
    [src[2], src[3], 1, 0, 0, 0, -dest[2] * src[2], -dest[2] * src[3]],
    [0, 0, 0, src[2], src[3], 1, -dest[3] * src[2], -dest[3] * src[3]],
    [src[4], src[5], 1, 0, 0, 0, -dest[4] * src[4], -dest[4] * src[5]],
    [0, 0, 0, src[4], src[5], 1, -dest[5] * src[4], -dest[5] * src[5]],
    [src[6], src[7], 1, 0, 0, 0, -dest[6] * src[6], -dest[6] * src[7]],
    [0, 0, 0, src[6], src[7], 1, -dest[7] * src[6], -dest[7] * src[7]]
  ];
  var detCache = {};
  var det = determinant(mA, 8, 0, 0, 0, detCache);
  if (det === 0) {
    return;
  }
  var vh = [];
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      vh[j] == null && (vh[j] = 0);
      vh[j] += ((i + j) % 2 ? -1 : 1) * determinant(mA, 7, i === 0 ? 1 : 0, 1 << i, 1 << j, detCache) / det * dest[i];
    }
  }
  return function(out2, srcPointX, srcPointY) {
    var pk = srcPointX * vh[6] + srcPointY * vh[7] + 1;
    out2[0] = (srcPointX * vh[0] + srcPointY * vh[1] + vh[2]) / pk;
    out2[1] = (srcPointX * vh[3] + srcPointY * vh[4] + vh[5]) / pk;
  };
}

// node_modules/zrender/lib/core/dom.js
var EVENT_SAVED_PROP = "___zrEVENTSAVED";
function transformCoordWithViewport(out2, el, inX, inY, inverse) {
  if (el.getBoundingClientRect && env_default.domSupported && !isCanvasEl(el)) {
    var saved = el[EVENT_SAVED_PROP] || (el[EVENT_SAVED_PROP] = {});
    var markers = prepareCoordMarkers(el, saved);
    var transformer = preparePointerTransformer(markers, saved, inverse);
    if (transformer) {
      transformer(out2, inX, inY);
      return true;
    }
  }
  return false;
}
function prepareCoordMarkers(el, saved) {
  var markers = saved.markers;
  if (markers) {
    return markers;
  }
  markers = saved.markers = [];
  var propLR = ["left", "right"];
  var propTB = ["top", "bottom"];
  for (var i = 0; i < 4; i++) {
    var marker = document.createElement("div");
    var stl = marker.style;
    var idxLR = i % 2;
    var idxTB = (i >> 1) % 2;
    stl.cssText = [
      "position: absolute",
      "visibility: hidden",
      "padding: 0",
      "margin: 0",
      "border-width: 0",
      "user-select: none",
      "width:0",
      "height:0",
      propLR[idxLR] + ":0",
      propTB[idxTB] + ":0",
      propLR[1 - idxLR] + ":auto",
      propTB[1 - idxTB] + ":auto",
      ""
    ].join("!important;");
    el.appendChild(marker);
    markers.push(marker);
  }
  return markers;
}
function preparePointerTransformer(markers, saved, inverse) {
  var transformerName = inverse ? "invTrans" : "trans";
  var transformer = saved[transformerName];
  var oldSrcCoords = saved.srcCoords;
  var srcCoords = [];
  var destCoords = [];
  var oldCoordTheSame = true;
  for (var i = 0; i < 4; i++) {
    var rect = markers[i].getBoundingClientRect();
    var ii = 2 * i;
    var x = rect.left;
    var y = rect.top;
    srcCoords.push(x, y);
    oldCoordTheSame = oldCoordTheSame && oldSrcCoords && x === oldSrcCoords[ii] && y === oldSrcCoords[ii + 1];
    destCoords.push(markers[i].offsetLeft, markers[i].offsetTop);
  }
  return oldCoordTheSame && transformer ? transformer : (saved.srcCoords = srcCoords, saved[transformerName] = inverse ? buildTransformer(destCoords, srcCoords) : buildTransformer(srcCoords, destCoords));
}
function isCanvasEl(el) {
  return el.nodeName.toUpperCase() === "CANVAS";
}
var replaceReg = /([&<>"'])/g;
var replaceMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function encodeHTML(source) {
  return source == null ? "" : (source + "").replace(replaceReg, function(str, c) {
    return replaceMap[c];
  });
}

// node_modules/echarts/lib/i18n/langEN.js
var langEN_default = {
  time: {
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  legend: {
    selector: {
      all: "All",
      inverse: "Inv"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "Box Select",
        polygon: "Lasso Select",
        lineX: "Horizontally Select",
        lineY: "Vertically Select",
        keep: "Keep Selections",
        clear: "Clear Selections"
      }
    },
    dataView: {
      title: "Data View",
      lang: ["Data View", "Close", "Refresh"]
    },
    dataZoom: {
      title: {
        zoom: "Zoom",
        back: "Zoom Reset"
      }
    },
    magicType: {
      title: {
        line: "Switch to Line Chart",
        bar: "Switch to Bar Chart",
        stack: "Stack",
        tiled: "Tile"
      }
    },
    restore: {
      title: "Restore"
    },
    saveAsImage: {
      title: "Save as Image",
      lang: ["Right Click to Save Image"]
    }
  },
  series: {
    typeNames: {
      pie: "Pie chart",
      bar: "Bar chart",
      line: "Line chart",
      scatter: "Scatter plot",
      effectScatter: "Ripple scatter plot",
      radar: "Radar chart",
      tree: "Tree",
      treemap: "Treemap",
      boxplot: "Boxplot",
      candlestick: "Candlestick",
      k: "K line chart",
      heatmap: "Heat map",
      map: "Map",
      parallel: "Parallel coordinate map",
      lines: "Line graph",
      graph: "Relationship graph",
      sankey: "Sankey diagram",
      funnel: "Funnel chart",
      gauge: "Gauge",
      pictorialBar: "Pictorial bar",
      themeRiver: "Theme River Map",
      sunburst: "Sunburst",
      custom: "Custom chart",
      chart: "Chart"
    }
  },
  aria: {
    general: {
      withTitle: 'This is a chart about "{title}"',
      withoutTitle: "This is a chart"
    },
    series: {
      single: {
        prefix: "",
        withName: " with type {seriesType} named {seriesName}.",
        withoutName: " with type {seriesType}."
      },
      multiple: {
        prefix: ". It consists of {seriesCount} series count.",
        withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
        withoutName: " The {seriesId} series is a {seriesType}.",
        separator: {
          middle: "",
          end: ""
        }
      }
    },
    data: {
      allData: "The data is as follows: ",
      partialData: "The first {displayCnt} items are: ",
      withName: "the data for {name} is {value}",
      withoutName: "{value}",
      separator: {
        middle: ", ",
        end: ". "
      }
    }
  }
};

// node_modules/echarts/lib/i18n/langZH.js
var langZH_default = {
  time: {
    month: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
    monthAbbr: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
    dayOfWeek: ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"],
    dayOfWeekAbbr: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"]
  },
  legend: {
    selector: {
      all: "\u5168\u9009",
      inverse: "\u53CD\u9009"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "\u77E9\u5F62\u9009\u62E9",
        polygon: "\u5708\u9009",
        lineX: "\u6A2A\u5411\u9009\u62E9",
        lineY: "\u7EB5\u5411\u9009\u62E9",
        keep: "\u4FDD\u6301\u9009\u62E9",
        clear: "\u6E05\u9664\u9009\u62E9"
      }
    },
    dataView: {
      title: "\u6570\u636E\u89C6\u56FE",
      lang: ["\u6570\u636E\u89C6\u56FE", "\u5173\u95ED", "\u5237\u65B0"]
    },
    dataZoom: {
      title: {
        zoom: "\u533A\u57DF\u7F29\u653E",
        back: "\u533A\u57DF\u7F29\u653E\u8FD8\u539F"
      }
    },
    magicType: {
      title: {
        line: "\u5207\u6362\u4E3A\u6298\u7EBF\u56FE",
        bar: "\u5207\u6362\u4E3A\u67F1\u72B6\u56FE",
        stack: "\u5207\u6362\u4E3A\u5806\u53E0",
        tiled: "\u5207\u6362\u4E3A\u5E73\u94FA"
      }
    },
    restore: {
      title: "\u8FD8\u539F"
    },
    saveAsImage: {
      title: "\u4FDD\u5B58\u4E3A\u56FE\u7247",
      lang: ["\u53F3\u952E\u53E6\u5B58\u4E3A\u56FE\u7247"]
    }
  },
  series: {
    typeNames: {
      pie: "\u997C\u56FE",
      bar: "\u67F1\u72B6\u56FE",
      line: "\u6298\u7EBF\u56FE",
      scatter: "\u6563\u70B9\u56FE",
      effectScatter: "\u6D9F\u6F2A\u6563\u70B9\u56FE",
      radar: "\u96F7\u8FBE\u56FE",
      tree: "\u6811\u56FE",
      treemap: "\u77E9\u5F62\u6811\u56FE",
      boxplot: "\u7BB1\u578B\u56FE",
      candlestick: "K\u7EBF\u56FE",
      k: "K\u7EBF\u56FE",
      heatmap: "\u70ED\u529B\u56FE",
      map: "\u5730\u56FE",
      parallel: "\u5E73\u884C\u5750\u6807\u56FE",
      lines: "\u7EBF\u56FE",
      graph: "\u5173\u7CFB\u56FE",
      sankey: "\u6851\u57FA\u56FE",
      funnel: "\u6F0F\u6597\u56FE",
      gauge: "\u4EEA\u8868\u76D8\u56FE",
      pictorialBar: "\u8C61\u5F62\u67F1\u56FE",
      themeRiver: "\u4E3B\u9898\u6CB3\u6D41\u56FE",
      sunburst: "\u65ED\u65E5\u56FE",
      custom: "\u81EA\u5B9A\u4E49\u56FE\u8868",
      chart: "\u56FE\u8868"
    }
  },
  aria: {
    general: {
      withTitle: "\u8FD9\u662F\u4E00\u4E2A\u5173\u4E8E\u201C{title}\u201D\u7684\u56FE\u8868\u3002",
      withoutTitle: "\u8FD9\u662F\u4E00\u4E2A\u56FE\u8868\uFF0C"
    },
    series: {
      single: {
        prefix: "",
        withName: "\u56FE\u8868\u7C7B\u578B\u662F{seriesType}\uFF0C\u8868\u793A{seriesName}\u3002",
        withoutName: "\u56FE\u8868\u7C7B\u578B\u662F{seriesType}\u3002"
      },
      multiple: {
        prefix: "\u5B83\u7531{seriesCount}\u4E2A\u56FE\u8868\u7CFB\u5217\u7EC4\u6210\u3002",
        withName: "\u7B2C{seriesId}\u4E2A\u7CFB\u5217\u662F\u4E00\u4E2A\u8868\u793A{seriesName}\u7684{seriesType}\uFF0C",
        withoutName: "\u7B2C{seriesId}\u4E2A\u7CFB\u5217\u662F\u4E00\u4E2A{seriesType}\uFF0C",
        separator: {
          middle: "\uFF1B",
          end: "\u3002"
        }
      }
    },
    data: {
      allData: "\u5176\u6570\u636E\u662F\u2014\u2014",
      partialData: "\u5176\u4E2D\uFF0C\u524D{displayCnt}\u9879\u662F\u2014\u2014",
      withName: "{name}\u7684\u6570\u636E\u662F{value}",
      withoutName: "{value}",
      separator: {
        middle: "\uFF0C",
        end: ""
      }
    }
  }
};

// node_modules/echarts/lib/core/locale.js
var LOCALE_ZH = "ZH";
var LOCALE_EN = "EN";
var DEFAULT_LOCALE = LOCALE_EN;
var localeStorage = {};
var localeModels = {};
var SYSTEM_LANG = !env_default.domSupported ? DEFAULT_LOCALE : function() {
  var langStr = (
    /* eslint-disable-next-line */
    (document.documentElement.lang || navigator.language || navigator.browserLanguage || DEFAULT_LOCALE).toUpperCase()
  );
  return langStr.indexOf(LOCALE_ZH) > -1 ? LOCALE_ZH : DEFAULT_LOCALE;
}();
function registerLocale(locale, localeObj) {
  locale = locale.toUpperCase();
  localeModels[locale] = new Model_default(localeObj);
  localeStorage[locale] = localeObj;
}
function createLocaleObject(locale) {
  if (isString(locale)) {
    var localeObj = localeStorage[locale.toUpperCase()] || {};
    if (locale === LOCALE_ZH || locale === LOCALE_EN) {
      return clone(localeObj);
    } else {
      return merge(clone(localeObj), clone(localeStorage[DEFAULT_LOCALE]), false);
    }
  } else {
    return merge(clone(locale), clone(localeStorage[DEFAULT_LOCALE]), false);
  }
}
registerLocale(LOCALE_EN, langEN_default);
registerLocale(LOCALE_ZH, langZH_default);

// node_modules/echarts/lib/util/format.js
var normalizeCssArray2 = normalizeCssArray;
var TPL_VAR_ALIAS = ["a", "b", "c", "d", "e", "f", "g"];
var wrapVar = function(varName, seriesIdx) {
  return "{" + varName + (seriesIdx == null ? "" : seriesIdx) + "}";
};
function formatTpl(tpl, paramsList, encode) {
  if (!isArray(paramsList)) {
    paramsList = [paramsList];
  }
  var seriesLen = paramsList.length;
  if (!seriesLen) {
    return "";
  }
  var $vars = paramsList[0].$vars || [];
  for (var i = 0; i < $vars.length; i++) {
    var alias = TPL_VAR_ALIAS[i];
    tpl = tpl.replace(wrapVar(alias), wrapVar(alias, 0));
  }
  for (var seriesIdx = 0; seriesIdx < seriesLen; seriesIdx++) {
    for (var k = 0; k < $vars.length; k++) {
      var val = paramsList[seriesIdx][$vars[k]];
      tpl = tpl.replace(wrapVar(TPL_VAR_ALIAS[k], seriesIdx), encode ? encodeHTML(val) : val);
    }
  }
  return tpl;
}
function getTooltipMarker(inOpt, extraCssText) {
  var opt = isString(inOpt) ? {
    color: inOpt,
    extraCssText
  } : inOpt || {};
  var color = opt.color;
  var type = opt.type;
  extraCssText = opt.extraCssText;
  var renderMode = opt.renderMode || "html";
  if (!color) {
    return "";
  }
  if (renderMode === "html") {
    return type === "subItem" ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + encodeHTML(color) + ";" + (extraCssText || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + encodeHTML(color) + ";" + (extraCssText || "") + '"></span>';
  } else {
    var markerId = opt.markerId || "markerX";
    return {
      renderMode,
      content: "{" + markerId + "|}  ",
      style: type === "subItem" ? {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: color
      } : {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: color
      }
    };
  }
}
function convertToColorString(color, defaultColor) {
  defaultColor = defaultColor || "transparent";
  return isString(color) ? color : isObject(color) ? color.colorStops && (color.colorStops[0] || {}).color || defaultColor : defaultColor;
}
function windowOpen(link, target) {
  if (target === "_blank" || target === "blank") {
    var blank = window.open();
    blank.opener = null;
    blank.location.href = link;
  } else {
    window.open(link, target);
  }
}

// node_modules/echarts/lib/util/layout.js
var each2 = each;
var LOCATION_PARAMS = ["left", "right", "top", "bottom", "width", "height"];
var HV_NAMES = [["width", "left", "right"], ["height", "top", "bottom"]];
function boxLayout(orient, group, gap, maxWidth, maxHeight) {
  var x = 0;
  var y = 0;
  if (maxWidth == null) {
    maxWidth = Infinity;
  }
  if (maxHeight == null) {
    maxHeight = Infinity;
  }
  var currentLineMaxSize = 0;
  group.eachChild(function(child, idx) {
    var rect = child.getBoundingRect();
    var nextChild = group.childAt(idx + 1);
    var nextChildRect = nextChild && nextChild.getBoundingRect();
    var nextX;
    var nextY;
    if (orient === "horizontal") {
      var moveX = rect.width + (nextChildRect ? -nextChildRect.x + rect.x : 0);
      nextX = x + moveX;
      if (nextX > maxWidth || child.newline) {
        x = 0;
        nextX = moveX;
        y += currentLineMaxSize + gap;
        currentLineMaxSize = rect.height;
      } else {
        currentLineMaxSize = Math.max(currentLineMaxSize, rect.height);
      }
    } else {
      var moveY = rect.height + (nextChildRect ? -nextChildRect.y + rect.y : 0);
      nextY = y + moveY;
      if (nextY > maxHeight || child.newline) {
        x += currentLineMaxSize + gap;
        y = 0;
        nextY = moveY;
        currentLineMaxSize = rect.width;
      } else {
        currentLineMaxSize = Math.max(currentLineMaxSize, rect.width);
      }
    }
    if (child.newline) {
      return;
    }
    child.x = x;
    child.y = y;
    child.markRedraw();
    orient === "horizontal" ? x = nextX + gap : y = nextY + gap;
  });
}
var vbox = curry(boxLayout, "vertical");
var hbox = curry(boxLayout, "horizontal");
function getAvailableSize(positionInfo, containerRect, margin) {
  var containerWidth = containerRect.width;
  var containerHeight = containerRect.height;
  var x = parsePercent2(positionInfo.left, containerWidth);
  var y = parsePercent2(positionInfo.top, containerHeight);
  var x2 = parsePercent2(positionInfo.right, containerWidth);
  var y2 = parsePercent2(positionInfo.bottom, containerHeight);
  (isNaN(x) || isNaN(parseFloat(positionInfo.left))) && (x = 0);
  (isNaN(x2) || isNaN(parseFloat(positionInfo.right))) && (x2 = containerWidth);
  (isNaN(y) || isNaN(parseFloat(positionInfo.top))) && (y = 0);
  (isNaN(y2) || isNaN(parseFloat(positionInfo.bottom))) && (y2 = containerHeight);
  margin = normalizeCssArray2(margin || 0);
  return {
    width: Math.max(x2 - x - margin[1] - margin[3], 0),
    height: Math.max(y2 - y - margin[0] - margin[2], 0)
  };
}
function getLayoutRect(positionInfo, containerRect, margin) {
  margin = normalizeCssArray2(margin || 0);
  var containerWidth = containerRect.width;
  var containerHeight = containerRect.height;
  var left = parsePercent2(positionInfo.left, containerWidth);
  var top = parsePercent2(positionInfo.top, containerHeight);
  var right = parsePercent2(positionInfo.right, containerWidth);
  var bottom = parsePercent2(positionInfo.bottom, containerHeight);
  var width = parsePercent2(positionInfo.width, containerWidth);
  var height = parsePercent2(positionInfo.height, containerHeight);
  var verticalMargin = margin[2] + margin[0];
  var horizontalMargin = margin[1] + margin[3];
  var aspect = positionInfo.aspect;
  if (isNaN(width)) {
    width = containerWidth - right - horizontalMargin - left;
  }
  if (isNaN(height)) {
    height = containerHeight - bottom - verticalMargin - top;
  }
  if (aspect != null) {
    if (isNaN(width) && isNaN(height)) {
      if (aspect > containerWidth / containerHeight) {
        width = containerWidth * 0.8;
      } else {
        height = containerHeight * 0.8;
      }
    }
    if (isNaN(width)) {
      width = aspect * height;
    }
    if (isNaN(height)) {
      height = width / aspect;
    }
  }
  if (isNaN(left)) {
    left = containerWidth - right - width - horizontalMargin;
  }
  if (isNaN(top)) {
    top = containerHeight - bottom - height - verticalMargin;
  }
  switch (positionInfo.left || positionInfo.right) {
    case "center":
      left = containerWidth / 2 - width / 2 - margin[3];
      break;
    case "right":
      left = containerWidth - width - horizontalMargin;
      break;
  }
  switch (positionInfo.top || positionInfo.bottom) {
    case "middle":
    case "center":
      top = containerHeight / 2 - height / 2 - margin[0];
      break;
    case "bottom":
      top = containerHeight - height - verticalMargin;
      break;
  }
  left = left || 0;
  top = top || 0;
  if (isNaN(width)) {
    width = containerWidth - horizontalMargin - left - (right || 0);
  }
  if (isNaN(height)) {
    height = containerHeight - verticalMargin - top - (bottom || 0);
  }
  var rect = new BoundingRect_default(left + margin[3], top + margin[0], width, height);
  rect.margin = margin;
  return rect;
}
function positionElement(el, positionInfo, containerRect, margin, opt, out2) {
  var h = !opt || !opt.hv || opt.hv[0];
  var v = !opt || !opt.hv || opt.hv[1];
  var boundingMode = opt && opt.boundingMode || "all";
  out2 = out2 || el;
  out2.x = el.x;
  out2.y = el.y;
  if (!h && !v) {
    return false;
  }
  var rect;
  if (boundingMode === "raw") {
    rect = el.type === "group" ? new BoundingRect_default(0, 0, +positionInfo.width || 0, +positionInfo.height || 0) : el.getBoundingRect();
  } else {
    rect = el.getBoundingRect();
    if (el.needLocalTransform()) {
      var transform = el.getLocalTransform();
      rect = rect.clone();
      rect.applyTransform(transform);
    }
  }
  var layoutRect = getLayoutRect(defaults({
    width: rect.width,
    height: rect.height
  }, positionInfo), containerRect, margin);
  var dx = h ? layoutRect.x - rect.x : 0;
  var dy = v ? layoutRect.y - rect.y : 0;
  if (boundingMode === "raw") {
    out2.x = dx;
    out2.y = dy;
  } else {
    out2.x += dx;
    out2.y += dy;
  }
  if (out2 === el) {
    el.markRedraw();
  }
  return true;
}
function fetchLayoutMode(ins) {
  var layoutMode = ins.layoutMode || ins.constructor.layoutMode;
  return isObject(layoutMode) ? layoutMode : layoutMode ? {
    type: layoutMode
  } : null;
}
function mergeLayoutParam(targetOption, newOption, opt) {
  var ignoreSize = opt && opt.ignoreSize;
  !isArray(ignoreSize) && (ignoreSize = [ignoreSize, ignoreSize]);
  var hResult = merge2(HV_NAMES[0], 0);
  var vResult = merge2(HV_NAMES[1], 1);
  copy2(HV_NAMES[0], targetOption, hResult);
  copy2(HV_NAMES[1], targetOption, vResult);
  function merge2(names, hvIdx) {
    var newParams = {};
    var newValueCount = 0;
    var merged = {};
    var mergedValueCount = 0;
    var enoughParamNumber = 2;
    each2(names, function(name) {
      merged[name] = targetOption[name];
    });
    each2(names, function(name) {
      hasProp(newOption, name) && (newParams[name] = merged[name] = newOption[name]);
      hasValue(newParams, name) && newValueCount++;
      hasValue(merged, name) && mergedValueCount++;
    });
    if (ignoreSize[hvIdx]) {
      if (hasValue(newOption, names[1])) {
        merged[names[2]] = null;
      } else if (hasValue(newOption, names[2])) {
        merged[names[1]] = null;
      }
      return merged;
    }
    if (mergedValueCount === enoughParamNumber || !newValueCount) {
      return merged;
    } else if (newValueCount >= enoughParamNumber) {
      return newParams;
    } else {
      for (var i = 0; i < names.length; i++) {
        var name_1 = names[i];
        if (!hasProp(newParams, name_1) && hasProp(targetOption, name_1)) {
          newParams[name_1] = targetOption[name_1];
          break;
        }
      }
      return newParams;
    }
  }
  function hasProp(obj, name) {
    return obj.hasOwnProperty(name);
  }
  function hasValue(obj, name) {
    return obj[name] != null && obj[name] !== "auto";
  }
  function copy2(names, target, source) {
    each2(names, function(name) {
      target[name] = source[name];
    });
  }
}
function getLayoutParams(source) {
  return copyLayoutParams({}, source);
}
function copyLayoutParams(target, source) {
  source && target && each2(LOCATION_PARAMS, function(name) {
    source.hasOwnProperty(name) && (target[name] = source[name]);
  });
  return target;
}

// node_modules/echarts/lib/model/Component.js
var inner2 = makeInner();
var ComponentModel = (
  /** @class */
  function(_super) {
    __extends(ComponentModel2, _super);
    function ComponentModel2(option, parentModel, ecModel) {
      var _this = _super.call(this, option, parentModel, ecModel) || this;
      _this.uid = getUID("ec_cpt_model");
      return _this;
    }
    ComponentModel2.prototype.init = function(option, parentModel, ecModel) {
      this.mergeDefaultAndTheme(option, ecModel);
    };
    ComponentModel2.prototype.mergeDefaultAndTheme = function(option, ecModel) {
      var layoutMode = fetchLayoutMode(this);
      var inputPositionParams = layoutMode ? getLayoutParams(option) : {};
      var themeModel = ecModel.getTheme();
      merge(option, themeModel.get(this.mainType));
      merge(option, this.getDefaultOption());
      if (layoutMode) {
        mergeLayoutParam(option, inputPositionParams, layoutMode);
      }
    };
    ComponentModel2.prototype.mergeOption = function(option, ecModel) {
      merge(this.option, option, true);
      var layoutMode = fetchLayoutMode(this);
      if (layoutMode) {
        mergeLayoutParam(this.option, option, layoutMode);
      }
    };
    ComponentModel2.prototype.optionUpdated = function(newCptOption, isInit) {
    };
    ComponentModel2.prototype.getDefaultOption = function() {
      var ctor = this.constructor;
      if (!isExtendedClass(ctor)) {
        return ctor.defaultOption;
      }
      var fields = inner2(this);
      if (!fields.defaultOption) {
        var optList = [];
        var clz = ctor;
        while (clz) {
          var opt = clz.prototype.defaultOption;
          opt && optList.push(opt);
          clz = clz.superClass;
        }
        var defaultOption = {};
        for (var i = optList.length - 1; i >= 0; i--) {
          defaultOption = merge(defaultOption, optList[i], true);
        }
        fields.defaultOption = defaultOption;
      }
      return fields.defaultOption;
    };
    ComponentModel2.prototype.getReferringComponents = function(mainType, opt) {
      var indexKey = mainType + "Index";
      var idKey = mainType + "Id";
      return queryReferringComponents(this.ecModel, mainType, {
        index: this.get(indexKey, true),
        id: this.get(idKey, true)
      }, opt);
    };
    ComponentModel2.prototype.getBoxLayoutParams = function() {
      var boxLayoutModel = this;
      return {
        left: boxLayoutModel.get("left"),
        top: boxLayoutModel.get("top"),
        right: boxLayoutModel.get("right"),
        bottom: boxLayoutModel.get("bottom"),
        width: boxLayoutModel.get("width"),
        height: boxLayoutModel.get("height")
      };
    };
    ComponentModel2.prototype.getZLevelKey = function() {
      return "";
    };
    ComponentModel2.prototype.setZLevel = function(zlevel) {
      this.option.zlevel = zlevel;
    };
    ComponentModel2.protoInitialize = function() {
      var proto = ComponentModel2.prototype;
      proto.type = "component";
      proto.id = "";
      proto.name = "";
      proto.mainType = "";
      proto.subType = "";
      proto.componentIndex = 0;
    }();
    return ComponentModel2;
  }(Model_default)
);
mountExtend(ComponentModel, Model_default);
enableClassManagement(ComponentModel);
enableSubTypeDefaulter(ComponentModel);
enableTopologicalTravel(ComponentModel, getDependencies);
function getDependencies(componentType) {
  var deps = [];
  each(ComponentModel.getClassesByMainType(componentType), function(clz) {
    deps = deps.concat(clz.dependencies || clz.prototype.dependencies || []);
  });
  deps = map(deps, function(type) {
    return parseClassType(type).main;
  });
  if (componentType !== "dataset" && indexOf(deps, "dataset") <= 0) {
    deps.unshift("dataset");
  }
  return deps;
}
var Component_default = ComponentModel;

// node_modules/echarts/lib/model/mixin/palette.js
var innerColor = makeInner();
var innerDecal = makeInner();
var PaletteMixin = (
  /** @class */
  function() {
    function PaletteMixin2() {
    }
    PaletteMixin2.prototype.getColorFromPalette = function(name, scope, requestNum) {
      var defaultPalette = normalizeToArray(this.get("color", true));
      var layeredPalette = this.get("colorLayer", true);
      return getFromPalette(this, innerColor, defaultPalette, layeredPalette, name, scope, requestNum);
    };
    PaletteMixin2.prototype.clearColorPalette = function() {
      clearPalette(this, innerColor);
    };
    return PaletteMixin2;
  }()
);
function getDecalFromPalette(ecModel, name, scope, requestNum) {
  var defaultDecals = normalizeToArray(ecModel.get(["aria", "decal", "decals"]));
  return getFromPalette(ecModel, innerDecal, defaultDecals, null, name, scope, requestNum);
}
function getNearestPalette(palettes, requestColorNum) {
  var paletteNum = palettes.length;
  for (var i = 0; i < paletteNum; i++) {
    if (palettes[i].length > requestColorNum) {
      return palettes[i];
    }
  }
  return palettes[paletteNum - 1];
}
function getFromPalette(that, inner9, defaultPalette, layeredPalette, name, scope, requestNum) {
  scope = scope || that;
  var scopeFields = inner9(scope);
  var paletteIdx = scopeFields.paletteIdx || 0;
  var paletteNameMap = scopeFields.paletteNameMap = scopeFields.paletteNameMap || {};
  if (paletteNameMap.hasOwnProperty(name)) {
    return paletteNameMap[name];
  }
  var palette = requestNum == null || !layeredPalette ? defaultPalette : getNearestPalette(layeredPalette, requestNum);
  palette = palette || defaultPalette;
  if (!palette || !palette.length) {
    return;
  }
  var pickedPaletteItem = palette[paletteIdx];
  if (name) {
    paletteNameMap[name] = pickedPaletteItem;
  }
  scopeFields.paletteIdx = (paletteIdx + 1) % palette.length;
  return pickedPaletteItem;
}
function clearPalette(that, inner9) {
  inner9(that).paletteIdx = 0;
  inner9(that).paletteNameMap = {};
}

// node_modules/echarts/lib/model/mixin/dataFormat.js
var DIMENSION_LABEL_REG = /\{@(.+?)\}/g;
var DataFormatMixin = (
  /** @class */
  function() {
    function DataFormatMixin2() {
    }
    DataFormatMixin2.prototype.getDataParams = function(dataIndex, dataType) {
      var data = this.getData(dataType);
      var rawValue = this.getRawValue(dataIndex, dataType);
      var rawDataIndex = data.getRawIndex(dataIndex);
      var name = data.getName(dataIndex);
      var itemOpt = data.getRawDataItem(dataIndex);
      var style = data.getItemVisual(dataIndex, "style");
      var color = style && style[data.getItemVisual(dataIndex, "drawType") || "fill"];
      var borderColor = style && style.stroke;
      var mainType = this.mainType;
      var isSeries2 = mainType === "series";
      var userOutput = data.userOutput && data.userOutput.get();
      return {
        componentType: mainType,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: isSeries2 ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: isSeries2 ? this.id : null,
        seriesName: isSeries2 ? this.name : null,
        name,
        dataIndex: rawDataIndex,
        data: itemOpt,
        dataType,
        value: rawValue,
        color,
        borderColor,
        dimensionNames: userOutput ? userOutput.fullDimensions : null,
        encode: userOutput ? userOutput.encode : null,
        // Param name list for mapping `a`, `b`, `c`, `d`, `e`
        $vars: ["seriesName", "name", "value"]
      };
    };
    DataFormatMixin2.prototype.getFormattedLabel = function(dataIndex, status, dataType, labelDimIndex, formatter, extendParams) {
      status = status || "normal";
      var data = this.getData(dataType);
      var params = this.getDataParams(dataIndex, dataType);
      if (extendParams) {
        params.value = extendParams.interpolatedValue;
      }
      if (labelDimIndex != null && isArray(params.value)) {
        params.value = params.value[labelDimIndex];
      }
      if (!formatter) {
        var itemModel = data.getItemModel(dataIndex);
        formatter = itemModel.get(status === "normal" ? ["label", "formatter"] : [status, "label", "formatter"]);
      }
      if (isFunction(formatter)) {
        params.status = status;
        params.dimensionIndex = labelDimIndex;
        return formatter(params);
      } else if (isString(formatter)) {
        var str = formatTpl(formatter, params);
        return str.replace(DIMENSION_LABEL_REG, function(origin, dimStr) {
          var len2 = dimStr.length;
          var dimLoose = dimStr;
          if (dimLoose.charAt(0) === "[" && dimLoose.charAt(len2 - 1) === "]") {
            dimLoose = +dimLoose.slice(1, len2 - 1);
            if (process.env.NODE_ENV !== "production") {
              if (isNaN(dimLoose)) {
                error("Invalide label formatter: @" + dimStr + ", only support @[0], @[1], @[2], ...");
              }
            }
          }
          var val = retrieveRawValue(data, dataIndex, dimLoose);
          if (extendParams && isArray(extendParams.interpolatedValue)) {
            var dimIndex = data.getDimensionIndex(dimLoose);
            if (dimIndex >= 0) {
              val = extendParams.interpolatedValue[dimIndex];
            }
          }
          return val != null ? val + "" : "";
        });
      }
    };
    DataFormatMixin2.prototype.getRawValue = function(idx, dataType) {
      return retrieveRawValue(this.getData(dataType), idx);
    };
    DataFormatMixin2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      return;
    };
    return DataFormatMixin2;
  }()
);

// node_modules/echarts/lib/core/task.js
function createTask(define) {
  return new Task(define);
}
var Task = (
  /** @class */
  function() {
    function Task2(define) {
      define = define || {};
      this._reset = define.reset;
      this._plan = define.plan;
      this._count = define.count;
      this._onDirty = define.onDirty;
      this._dirty = true;
    }
    Task2.prototype.perform = function(performArgs) {
      var upTask = this._upstream;
      var skip = performArgs && performArgs.skip;
      if (this._dirty && upTask) {
        var context = this.context;
        context.data = context.outputData = upTask.context.outputData;
      }
      if (this.__pipeline) {
        this.__pipeline.currentTask = this;
      }
      var planResult;
      if (this._plan && !skip) {
        planResult = this._plan(this.context);
      }
      var lastModBy = normalizeModBy(this._modBy);
      var lastModDataCount = this._modDataCount || 0;
      var modBy = normalizeModBy(performArgs && performArgs.modBy);
      var modDataCount = performArgs && performArgs.modDataCount || 0;
      if (lastModBy !== modBy || lastModDataCount !== modDataCount) {
        planResult = "reset";
      }
      function normalizeModBy(val) {
        !(val >= 1) && (val = 1);
        return val;
      }
      var forceFirstProgress;
      if (this._dirty || planResult === "reset") {
        this._dirty = false;
        forceFirstProgress = this._doReset(skip);
      }
      this._modBy = modBy;
      this._modDataCount = modDataCount;
      var step = performArgs && performArgs.step;
      if (upTask) {
        if (process.env.NODE_ENV !== "production") {
          assert(upTask._outputDueEnd != null);
        }
        this._dueEnd = upTask._outputDueEnd;
      } else {
        if (process.env.NODE_ENV !== "production") {
          assert(!this._progress || this._count);
        }
        this._dueEnd = this._count ? this._count(this.context) : Infinity;
      }
      if (this._progress) {
        var start2 = this._dueIndex;
        var end2 = Math.min(step != null ? this._dueIndex + step : Infinity, this._dueEnd);
        if (!skip && (forceFirstProgress || start2 < end2)) {
          var progress = this._progress;
          if (isArray(progress)) {
            for (var i = 0; i < progress.length; i++) {
              this._doProgress(progress[i], start2, end2, modBy, modDataCount);
            }
          } else {
            this._doProgress(progress, start2, end2, modBy, modDataCount);
          }
        }
        this._dueIndex = end2;
        var outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : end2;
        if (process.env.NODE_ENV !== "production") {
          assert(outputDueEnd >= this._outputDueEnd);
        }
        this._outputDueEnd = outputDueEnd;
      } else {
        this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
      }
      return this.unfinished();
    };
    Task2.prototype.dirty = function() {
      this._dirty = true;
      this._onDirty && this._onDirty(this.context);
    };
    Task2.prototype._doProgress = function(progress, start2, end2, modBy, modDataCount) {
      iterator.reset(start2, end2, modBy, modDataCount);
      this._callingProgress = progress;
      this._callingProgress({
        start: start2,
        end: end2,
        count: end2 - start2,
        next: iterator.next
      }, this.context);
    };
    Task2.prototype._doReset = function(skip) {
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0;
      this._settedOutputEnd = null;
      var progress;
      var forceFirstProgress;
      if (!skip && this._reset) {
        progress = this._reset(this.context);
        if (progress && progress.progress) {
          forceFirstProgress = progress.forceFirstProgress;
          progress = progress.progress;
        }
        if (isArray(progress) && !progress.length) {
          progress = null;
        }
      }
      this._progress = progress;
      this._modBy = this._modDataCount = null;
      var downstream = this._downstream;
      downstream && downstream.dirty();
      return forceFirstProgress;
    };
    Task2.prototype.unfinished = function() {
      return this._progress && this._dueIndex < this._dueEnd;
    };
    Task2.prototype.pipe = function(downTask) {
      if (process.env.NODE_ENV !== "production") {
        assert(downTask && !downTask._disposed && downTask !== this);
      }
      if (this._downstream !== downTask || this._dirty) {
        this._downstream = downTask;
        downTask._upstream = this;
        downTask.dirty();
      }
    };
    Task2.prototype.dispose = function() {
      if (this._disposed) {
        return;
      }
      this._upstream && (this._upstream._downstream = null);
      this._downstream && (this._downstream._upstream = null);
      this._dirty = false;
      this._disposed = true;
    };
    Task2.prototype.getUpstream = function() {
      return this._upstream;
    };
    Task2.prototype.getDownstream = function() {
      return this._downstream;
    };
    Task2.prototype.setOutputEnd = function(end2) {
      this._outputDueEnd = this._settedOutputEnd = end2;
    };
    return Task2;
  }()
);
var iterator = /* @__PURE__ */ function() {
  var end2;
  var current;
  var modBy;
  var modDataCount;
  var winCount;
  var it = {
    reset: function(s, e2, sStep, sCount) {
      current = s;
      end2 = e2;
      modBy = sStep;
      modDataCount = sCount;
      winCount = Math.ceil(modDataCount / modBy);
      it.next = modBy > 1 && modDataCount > 0 ? modNext : sequentialNext;
    }
  };
  return it;
  function sequentialNext() {
    return current < end2 ? current++ : null;
  }
  function modNext() {
    var dataIndex = current % winCount * modBy + Math.ceil(current / winCount);
    var result = current >= end2 ? null : dataIndex < modDataCount ? dataIndex : current;
    current++;
    return result;
  }
}();

// node_modules/echarts/lib/data/helper/transform.js
var ExternalSource = (
  /** @class */
  function() {
    function ExternalSource2() {
    }
    ExternalSource2.prototype.getRawData = function() {
      throw new Error("not supported");
    };
    ExternalSource2.prototype.getRawDataItem = function(dataIndex) {
      throw new Error("not supported");
    };
    ExternalSource2.prototype.cloneRawData = function() {
      return;
    };
    ExternalSource2.prototype.getDimensionInfo = function(dim) {
      return;
    };
    ExternalSource2.prototype.cloneAllDimensionInfo = function() {
      return;
    };
    ExternalSource2.prototype.count = function() {
      return;
    };
    ExternalSource2.prototype.retrieveValue = function(dataIndex, dimIndex) {
      return;
    };
    ExternalSource2.prototype.retrieveValueFromItem = function(dataItem, dimIndex) {
      return;
    };
    ExternalSource2.prototype.convertValue = function(rawVal, dimInfo) {
      return parseDataValue(rawVal, dimInfo);
    };
    return ExternalSource2;
  }()
);
function createExternalSource(internalSource, externalTransform) {
  var extSource = new ExternalSource();
  var data = internalSource.data;
  var sourceFormat = extSource.sourceFormat = internalSource.sourceFormat;
  var sourceHeaderCount = internalSource.startIndex;
  var errMsg = "";
  if (internalSource.seriesLayoutBy !== SERIES_LAYOUT_BY_COLUMN) {
    if (process.env.NODE_ENV !== "production") {
      errMsg = '`seriesLayoutBy` of upstream dataset can only be "column" in data transform.';
    }
    throwError(errMsg);
  }
  var dimensions = [];
  var dimsByName = {};
  var dimsDef = internalSource.dimensionsDefine;
  if (dimsDef) {
    each(dimsDef, function(dimDef, idx) {
      var name = dimDef.name;
      var dimDefExt = {
        index: idx,
        name,
        displayName: dimDef.displayName
      };
      dimensions.push(dimDefExt);
      if (name != null) {
        var errMsg_1 = "";
        if (hasOwn(dimsByName, name)) {
          if (process.env.NODE_ENV !== "production") {
            errMsg_1 = 'dimension name "' + name + '" duplicated.';
          }
          throwError(errMsg_1);
        }
        dimsByName[name] = dimDefExt;
      }
    });
  } else {
    for (var i = 0; i < internalSource.dimensionsDetectedCount || 0; i++) {
      dimensions.push({
        index: i
      });
    }
  }
  var rawItemGetter = getRawSourceItemGetter(sourceFormat, SERIES_LAYOUT_BY_COLUMN);
  if (externalTransform.__isBuiltIn) {
    extSource.getRawDataItem = function(dataIndex) {
      return rawItemGetter(data, sourceHeaderCount, dimensions, dataIndex);
    };
    extSource.getRawData = bind(getRawData, null, internalSource);
  }
  extSource.cloneRawData = bind(cloneRawData, null, internalSource);
  var rawCounter = getRawSourceDataCounter(sourceFormat, SERIES_LAYOUT_BY_COLUMN);
  extSource.count = bind(rawCounter, null, data, sourceHeaderCount, dimensions);
  var rawValueGetter = getRawSourceValueGetter(sourceFormat);
  extSource.retrieveValue = function(dataIndex, dimIndex) {
    var rawItem = rawItemGetter(data, sourceHeaderCount, dimensions, dataIndex);
    return retrieveValueFromItem(rawItem, dimIndex);
  };
  var retrieveValueFromItem = extSource.retrieveValueFromItem = function(dataItem, dimIndex) {
    if (dataItem == null) {
      return;
    }
    var dimDef = dimensions[dimIndex];
    if (dimDef) {
      return rawValueGetter(dataItem, dimIndex, dimDef.name);
    }
  };
  extSource.getDimensionInfo = bind(getDimensionInfo, null, dimensions, dimsByName);
  extSource.cloneAllDimensionInfo = bind(cloneAllDimensionInfo, null, dimensions);
  return extSource;
}
function getRawData(upstream) {
  var sourceFormat = upstream.sourceFormat;
  if (!isSupportedSourceFormat(sourceFormat)) {
    var errMsg = "";
    if (process.env.NODE_ENV !== "production") {
      errMsg = "`getRawData` is not supported in source format " + sourceFormat;
    }
    throwError(errMsg);
  }
  return upstream.data;
}
function cloneRawData(upstream) {
  var sourceFormat = upstream.sourceFormat;
  var data = upstream.data;
  if (!isSupportedSourceFormat(sourceFormat)) {
    var errMsg = "";
    if (process.env.NODE_ENV !== "production") {
      errMsg = "`cloneRawData` is not supported in source format " + sourceFormat;
    }
    throwError(errMsg);
  }
  if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS) {
    var result = [];
    for (var i = 0, len2 = data.length; i < len2; i++) {
      result.push(data[i].slice());
    }
    return result;
  } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS) {
    var result = [];
    for (var i = 0, len2 = data.length; i < len2; i++) {
      result.push(extend({}, data[i]));
    }
    return result;
  }
}
function getDimensionInfo(dimensions, dimsByName, dim) {
  if (dim == null) {
    return;
  }
  if (isNumber(dim) || !isNaN(dim) && !hasOwn(dimsByName, dim)) {
    return dimensions[dim];
  } else if (hasOwn(dimsByName, dim)) {
    return dimsByName[dim];
  }
}
function cloneAllDimensionInfo(dimensions) {
  return clone(dimensions);
}
var externalTransformMap = createHashMap();
function registerExternalTransform(externalTransform) {
  externalTransform = clone(externalTransform);
  var type = externalTransform.type;
  var errMsg = "";
  if (!type) {
    if (process.env.NODE_ENV !== "production") {
      errMsg = "Must have a `type` when `registerTransform`.";
    }
    throwError(errMsg);
  }
  var typeParsed = type.split(":");
  if (typeParsed.length !== 2) {
    if (process.env.NODE_ENV !== "production") {
      errMsg = 'Name must include namespace like "ns:regression".';
    }
    throwError(errMsg);
  }
  var isBuiltIn = false;
  if (typeParsed[0] === "echarts") {
    type = typeParsed[1];
    isBuiltIn = true;
  }
  externalTransform.__isBuiltIn = isBuiltIn;
  externalTransformMap.set(type, externalTransform);
}
function applyDataTransform(rawTransOption, sourceList, infoForPrint) {
  var pipedTransOption = normalizeToArray(rawTransOption);
  var pipeLen = pipedTransOption.length;
  var errMsg = "";
  if (!pipeLen) {
    if (process.env.NODE_ENV !== "production") {
      errMsg = "If `transform` declared, it should at least contain one transform.";
    }
    throwError(errMsg);
  }
  for (var i = 0, len2 = pipeLen; i < len2; i++) {
    var transOption = pipedTransOption[i];
    sourceList = applySingleDataTransform(transOption, sourceList, infoForPrint, pipeLen === 1 ? null : i);
    if (i !== len2 - 1) {
      sourceList.length = Math.max(sourceList.length, 1);
    }
  }
  return sourceList;
}
function applySingleDataTransform(transOption, upSourceList, infoForPrint, pipeIndex) {
  var errMsg = "";
  if (!upSourceList.length) {
    if (process.env.NODE_ENV !== "production") {
      errMsg = "Must have at least one upstream dataset.";
    }
    throwError(errMsg);
  }
  if (!isObject(transOption)) {
    if (process.env.NODE_ENV !== "production") {
      errMsg = "transform declaration must be an object rather than " + typeof transOption + ".";
    }
    throwError(errMsg);
  }
  var transType = transOption.type;
  var externalTransform = externalTransformMap.get(transType);
  if (!externalTransform) {
    if (process.env.NODE_ENV !== "production") {
      errMsg = 'Can not find transform on type "' + transType + '".';
    }
    throwError(errMsg);
  }
  var extUpSourceList = map(upSourceList, function(upSource) {
    return createExternalSource(upSource, externalTransform);
  });
  var resultList = normalizeToArray(externalTransform.transform({
    upstream: extUpSourceList[0],
    upstreamList: extUpSourceList,
    config: clone(transOption.config)
  }));
  if (process.env.NODE_ENV !== "production") {
    if (transOption.print) {
      var printStrArr = map(resultList, function(extSource) {
        var pipeIndexStr = pipeIndex != null ? " === pipe index: " + pipeIndex : "";
        return ["=== dataset index: " + infoForPrint.datasetIndex + pipeIndexStr + " ===", "- transform result data:", makePrintable(extSource.data), "- transform result dimensions:", makePrintable(extSource.dimensions)].join("\n");
      }).join("\n");
      log(printStrArr);
    }
  }
  return map(resultList, function(result, resultIndex) {
    var errMsg2 = "";
    if (!isObject(result)) {
      if (process.env.NODE_ENV !== "production") {
        errMsg2 = "A transform should not return some empty results.";
      }
      throwError(errMsg2);
    }
    if (!result.data) {
      if (process.env.NODE_ENV !== "production") {
        errMsg2 = "Transform result data should be not be null or undefined";
      }
      throwError(errMsg2);
    }
    var sourceFormat = detectSourceFormat(result.data);
    if (!isSupportedSourceFormat(sourceFormat)) {
      if (process.env.NODE_ENV !== "production") {
        errMsg2 = "Transform result data should be array rows or object rows.";
      }
      throwError(errMsg2);
    }
    var resultMetaRawOption;
    var firstUpSource = upSourceList[0];
    if (firstUpSource && resultIndex === 0 && !result.dimensions) {
      var startIndex = firstUpSource.startIndex;
      if (startIndex) {
        result.data = firstUpSource.data.slice(0, startIndex).concat(result.data);
      }
      resultMetaRawOption = {
        seriesLayoutBy: SERIES_LAYOUT_BY_COLUMN,
        sourceHeader: startIndex,
        dimensions: firstUpSource.metaRawOption.dimensions
      };
    } else {
      resultMetaRawOption = {
        seriesLayoutBy: SERIES_LAYOUT_BY_COLUMN,
        sourceHeader: 0,
        dimensions: result.dimensions
      };
    }
    return createSource(result.data, resultMetaRawOption, null);
  });
}
function isSupportedSourceFormat(sourceFormat) {
  return sourceFormat === SOURCE_FORMAT_ARRAY_ROWS || sourceFormat === SOURCE_FORMAT_OBJECT_ROWS;
}

// node_modules/echarts/lib/data/helper/sourceManager.js
var SourceManager = (
  /** @class */
  function() {
    function SourceManager2(sourceHost) {
      this._sourceList = [];
      this._storeList = [];
      this._upstreamSignList = [];
      this._versionSignBase = 0;
      this._dirty = true;
      this._sourceHost = sourceHost;
    }
    SourceManager2.prototype.dirty = function() {
      this._setLocalSource([], []);
      this._storeList = [];
      this._dirty = true;
    };
    SourceManager2.prototype._setLocalSource = function(sourceList, upstreamSignList) {
      this._sourceList = sourceList;
      this._upstreamSignList = upstreamSignList;
      this._versionSignBase++;
      if (this._versionSignBase > 9e10) {
        this._versionSignBase = 0;
      }
    };
    SourceManager2.prototype._getVersionSign = function() {
      return this._sourceHost.uid + "_" + this._versionSignBase;
    };
    SourceManager2.prototype.prepareSource = function() {
      if (this._isDirty()) {
        this._createSource();
        this._dirty = false;
      }
    };
    SourceManager2.prototype._createSource = function() {
      this._setLocalSource([], []);
      var sourceHost = this._sourceHost;
      var upSourceMgrList = this._getUpstreamSourceManagers();
      var hasUpstream = !!upSourceMgrList.length;
      var resultSourceList;
      var upstreamSignList;
      if (isSeries(sourceHost)) {
        var seriesModel = sourceHost;
        var data = void 0;
        var sourceFormat = void 0;
        var upSource = void 0;
        if (hasUpstream) {
          var upSourceMgr = upSourceMgrList[0];
          upSourceMgr.prepareSource();
          upSource = upSourceMgr.getSource();
          data = upSource.data;
          sourceFormat = upSource.sourceFormat;
          upstreamSignList = [upSourceMgr._getVersionSign()];
        } else {
          data = seriesModel.get("data", true);
          sourceFormat = isTypedArray(data) ? SOURCE_FORMAT_TYPED_ARRAY : SOURCE_FORMAT_ORIGINAL;
          upstreamSignList = [];
        }
        var newMetaRawOption = this._getSourceMetaRawOption() || {};
        var upMetaRawOption = upSource && upSource.metaRawOption || {};
        var seriesLayoutBy = retrieve2(newMetaRawOption.seriesLayoutBy, upMetaRawOption.seriesLayoutBy) || null;
        var sourceHeader = retrieve2(newMetaRawOption.sourceHeader, upMetaRawOption.sourceHeader);
        var dimensions = retrieve2(newMetaRawOption.dimensions, upMetaRawOption.dimensions);
        var needsCreateSource = seriesLayoutBy !== upMetaRawOption.seriesLayoutBy || !!sourceHeader !== !!upMetaRawOption.sourceHeader || dimensions;
        resultSourceList = needsCreateSource ? [createSource(data, {
          seriesLayoutBy,
          sourceHeader,
          dimensions
        }, sourceFormat)] : [];
      } else {
        var datasetModel = sourceHost;
        if (hasUpstream) {
          var result = this._applyTransform(upSourceMgrList);
          resultSourceList = result.sourceList;
          upstreamSignList = result.upstreamSignList;
        } else {
          var sourceData = datasetModel.get("source", true);
          resultSourceList = [createSource(sourceData, this._getSourceMetaRawOption(), null)];
          upstreamSignList = [];
        }
      }
      if (process.env.NODE_ENV !== "production") {
        assert(resultSourceList && upstreamSignList);
      }
      this._setLocalSource(resultSourceList, upstreamSignList);
    };
    SourceManager2.prototype._applyTransform = function(upMgrList) {
      var datasetModel = this._sourceHost;
      var transformOption = datasetModel.get("transform", true);
      var fromTransformResult = datasetModel.get("fromTransformResult", true);
      if (process.env.NODE_ENV !== "production") {
        assert(fromTransformResult != null || transformOption != null);
      }
      if (fromTransformResult != null) {
        var errMsg = "";
        if (upMgrList.length !== 1) {
          if (process.env.NODE_ENV !== "production") {
            errMsg = "When using `fromTransformResult`, there should be only one upstream dataset";
          }
          doThrow(errMsg);
        }
      }
      var sourceList;
      var upSourceList = [];
      var upstreamSignList = [];
      each(upMgrList, function(upMgr) {
        upMgr.prepareSource();
        var upSource = upMgr.getSource(fromTransformResult || 0);
        var errMsg2 = "";
        if (fromTransformResult != null && !upSource) {
          if (process.env.NODE_ENV !== "production") {
            errMsg2 = "Can not retrieve result by `fromTransformResult`: " + fromTransformResult;
          }
          doThrow(errMsg2);
        }
        upSourceList.push(upSource);
        upstreamSignList.push(upMgr._getVersionSign());
      });
      if (transformOption) {
        sourceList = applyDataTransform(transformOption, upSourceList, {
          datasetIndex: datasetModel.componentIndex
        });
      } else if (fromTransformResult != null) {
        sourceList = [cloneSourceShallow(upSourceList[0])];
      }
      return {
        sourceList,
        upstreamSignList
      };
    };
    SourceManager2.prototype._isDirty = function() {
      if (this._dirty) {
        return true;
      }
      var upSourceMgrList = this._getUpstreamSourceManagers();
      for (var i = 0; i < upSourceMgrList.length; i++) {
        var upSrcMgr = upSourceMgrList[i];
        if (
          // Consider the case that there is ancestor diry, call it recursively.
          // The performance is probably not an issue because usually the chain is not long.
          upSrcMgr._isDirty() || this._upstreamSignList[i] !== upSrcMgr._getVersionSign()
        ) {
          return true;
        }
      }
    };
    SourceManager2.prototype.getSource = function(sourceIndex) {
      sourceIndex = sourceIndex || 0;
      var source = this._sourceList[sourceIndex];
      if (!source) {
        var upSourceMgrList = this._getUpstreamSourceManagers();
        return upSourceMgrList[0] && upSourceMgrList[0].getSource(sourceIndex);
      }
      return source;
    };
    SourceManager2.prototype.getSharedDataStore = function(seriesDimRequest) {
      if (process.env.NODE_ENV !== "production") {
        assert(isSeries(this._sourceHost), "Can only call getDataStore on series source manager.");
      }
      var schema = seriesDimRequest.makeStoreSchema();
      return this._innerGetDataStore(schema.dimensions, seriesDimRequest.source, schema.hash);
    };
    SourceManager2.prototype._innerGetDataStore = function(storeDims, seriesSource, sourceReadKey) {
      var sourceIndex = 0;
      var storeList = this._storeList;
      var cachedStoreMap = storeList[sourceIndex];
      if (!cachedStoreMap) {
        cachedStoreMap = storeList[sourceIndex] = {};
      }
      var cachedStore = cachedStoreMap[sourceReadKey];
      if (!cachedStore) {
        var upSourceMgr = this._getUpstreamSourceManagers()[0];
        if (isSeries(this._sourceHost) && upSourceMgr) {
          cachedStore = upSourceMgr._innerGetDataStore(storeDims, seriesSource, sourceReadKey);
        } else {
          cachedStore = new DataStore_default();
          cachedStore.initData(new DefaultDataProvider(seriesSource, storeDims.length), storeDims);
        }
        cachedStoreMap[sourceReadKey] = cachedStore;
      }
      return cachedStore;
    };
    SourceManager2.prototype._getUpstreamSourceManagers = function() {
      var sourceHost = this._sourceHost;
      if (isSeries(sourceHost)) {
        var datasetModel = querySeriesUpstreamDatasetModel(sourceHost);
        return !datasetModel ? [] : [datasetModel.getSourceManager()];
      } else {
        return map(queryDatasetUpstreamDatasetModels(sourceHost), function(datasetModel2) {
          return datasetModel2.getSourceManager();
        });
      }
    };
    SourceManager2.prototype._getSourceMetaRawOption = function() {
      var sourceHost = this._sourceHost;
      var seriesLayoutBy;
      var sourceHeader;
      var dimensions;
      if (isSeries(sourceHost)) {
        seriesLayoutBy = sourceHost.get("seriesLayoutBy", true);
        sourceHeader = sourceHost.get("sourceHeader", true);
        dimensions = sourceHost.get("dimensions", true);
      } else if (!this._getUpstreamSourceManagers().length) {
        var model = sourceHost;
        seriesLayoutBy = model.get("seriesLayoutBy", true);
        sourceHeader = model.get("sourceHeader", true);
        dimensions = model.get("dimensions", true);
      }
      return {
        seriesLayoutBy,
        sourceHeader,
        dimensions
      };
    };
    return SourceManager2;
  }()
);
function isSeries(sourceHost) {
  return sourceHost.mainType === "series";
}
function doThrow(errMsg) {
  throw new Error(errMsg);
}

// node_modules/echarts/lib/component/tooltip/tooltipMarkup.js
function createTooltipMarkup(type, option) {
  option.type = type;
  return option;
}
function retrieveVisualColorForTooltipMarker(series, dataIndex) {
  var style = series.getData().getItemVisual(dataIndex, "style");
  var color = style[series.visualDrawType];
  return convertToColorString(color);
}
var TooltipMarkupStyleCreator = (
  /** @class */
  function() {
    function TooltipMarkupStyleCreator2() {
      this.richTextStyles = {};
      this._nextStyleNameId = getRandomIdBase();
    }
    TooltipMarkupStyleCreator2.prototype._generateStyleName = function() {
      return "__EC_aUTo_" + this._nextStyleNameId++;
    };
    TooltipMarkupStyleCreator2.prototype.makeTooltipMarker = function(markerType, colorStr, renderMode) {
      var markerId = renderMode === "richText" ? this._generateStyleName() : null;
      var marker = getTooltipMarker({
        color: colorStr,
        type: markerType,
        renderMode,
        markerId
      });
      if (isString(marker)) {
        return marker;
      } else {
        if (process.env.NODE_ENV !== "production") {
          assert(markerId);
        }
        this.richTextStyles[markerId] = marker.style;
        return marker.content;
      }
    };
    TooltipMarkupStyleCreator2.prototype.wrapRichTextStyle = function(text, styles) {
      var finalStl = {};
      if (isArray(styles)) {
        each(styles, function(stl) {
          return extend(finalStl, stl);
        });
      } else {
        extend(finalStl, styles);
      }
      var styleName = this._generateStyleName();
      this.richTextStyles[styleName] = finalStl;
      return "{" + styleName + "|" + text + "}";
    };
    return TooltipMarkupStyleCreator2;
  }()
);

// node_modules/echarts/lib/component/tooltip/seriesFormatTooltip.js
function defaultSeriesFormatTooltip(opt) {
  var series = opt.series;
  var dataIndex = opt.dataIndex;
  var multipleSeries = opt.multipleSeries;
  var data = series.getData();
  var tooltipDims = data.mapDimensionsAll("defaultedTooltip");
  var tooltipDimLen = tooltipDims.length;
  var value = series.getRawValue(dataIndex);
  var isValueArr = isArray(value);
  var markerColor = retrieveVisualColorForTooltipMarker(series, dataIndex);
  var inlineValue;
  var inlineValueType;
  var subBlocks;
  var sortParam;
  if (tooltipDimLen > 1 || isValueArr && !tooltipDimLen) {
    var formatArrResult = formatTooltipArrayValue(value, series, dataIndex, tooltipDims, markerColor);
    inlineValue = formatArrResult.inlineValues;
    inlineValueType = formatArrResult.inlineValueTypes;
    subBlocks = formatArrResult.blocks;
    sortParam = formatArrResult.inlineValues[0];
  } else if (tooltipDimLen) {
    var dimInfo = data.getDimensionInfo(tooltipDims[0]);
    sortParam = inlineValue = retrieveRawValue(data, dataIndex, tooltipDims[0]);
    inlineValueType = dimInfo.type;
  } else {
    sortParam = inlineValue = isValueArr ? value[0] : value;
  }
  var seriesNameSpecified = isNameSpecified(series);
  var seriesName = seriesNameSpecified && series.name || "";
  var itemName = data.getName(dataIndex);
  var inlineName = multipleSeries ? seriesName : itemName;
  return createTooltipMarkup("section", {
    header: seriesName,
    // When series name is not specified, do not show a header line with only '-'.
    // This case always happens in tooltip.trigger: 'item'.
    noHeader: multipleSeries || !seriesNameSpecified,
    sortParam,
    blocks: [createTooltipMarkup("nameValue", {
      markerType: "item",
      markerColor,
      // Do not mix display seriesName and itemName in one tooltip,
      // which might confuses users.
      name: inlineName,
      // name dimension might be auto assigned, where the name might
      // be not readable. So we check trim here.
      noName: !trim(inlineName),
      value: inlineValue,
      valueType: inlineValueType,
      dataIndex
    })].concat(subBlocks || [])
  });
}
function formatTooltipArrayValue(value, series, dataIndex, tooltipDims, colorStr) {
  var data = series.getData();
  var isValueMultipleLine = reduce(value, function(isValueMultipleLine2, val, idx) {
    var dimItem = data.getDimensionInfo(idx);
    return isValueMultipleLine2 = isValueMultipleLine2 || dimItem && dimItem.tooltip !== false && dimItem.displayName != null;
  }, false);
  var inlineValues = [];
  var inlineValueTypes = [];
  var blocks = [];
  tooltipDims.length ? each(tooltipDims, function(dim) {
    setEachItem(retrieveRawValue(data, dataIndex, dim), dim);
  }) : each(value, setEachItem);
  function setEachItem(val, dim) {
    var dimInfo = data.getDimensionInfo(dim);
    if (!dimInfo || dimInfo.otherDims.tooltip === false) {
      return;
    }
    if (isValueMultipleLine) {
      blocks.push(createTooltipMarkup("nameValue", {
        markerType: "subItem",
        markerColor: colorStr,
        name: dimInfo.displayName,
        value: val,
        valueType: dimInfo.type
      }));
    } else {
      inlineValues.push(val);
      inlineValueTypes.push(dimInfo.type);
    }
  }
  return {
    inlineValues,
    inlineValueTypes,
    blocks
  };
}

// node_modules/echarts/lib/model/Series.js
var inner3 = makeInner();
function getSelectionKey(data, dataIndex) {
  return data.getName(dataIndex) || data.getId(dataIndex);
}
var SERIES_UNIVERSAL_TRANSITION_PROP = "__universalTransitionEnabled";
var SeriesModel = (
  /** @class */
  function(_super) {
    __extends(SeriesModel2, _super);
    function SeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this._selectedDataIndicesMap = {};
      return _this;
    }
    SeriesModel2.prototype.init = function(option, parentModel, ecModel) {
      this.seriesIndex = this.componentIndex;
      this.dataTask = createTask({
        count: dataTaskCount,
        reset: dataTaskReset
      });
      this.dataTask.context = {
        model: this
      };
      this.mergeDefaultAndTheme(option, ecModel);
      var sourceManager = inner3(this).sourceManager = new SourceManager(this);
      sourceManager.prepareSource();
      var data = this.getInitialData(option, ecModel);
      wrapData(data, this);
      this.dataTask.context.data = data;
      if (process.env.NODE_ENV !== "production") {
        assert(data, "getInitialData returned invalid data.");
      }
      inner3(this).dataBeforeProcessed = data;
      autoSeriesName(this);
      this._initSelectedMapFromData(data);
    };
    SeriesModel2.prototype.mergeDefaultAndTheme = function(option, ecModel) {
      var layoutMode = fetchLayoutMode(this);
      var inputPositionParams = layoutMode ? getLayoutParams(option) : {};
      var themeSubType = this.subType;
      if (Component_default.hasClass(themeSubType)) {
        themeSubType += "Series";
      }
      merge(option, ecModel.getTheme().get(this.subType));
      merge(option, this.getDefaultOption());
      defaultEmphasis(option, "label", ["show"]);
      this.fillDataTextStyle(option.data);
      if (layoutMode) {
        mergeLayoutParam(option, inputPositionParams, layoutMode);
      }
    };
    SeriesModel2.prototype.mergeOption = function(newSeriesOption, ecModel) {
      newSeriesOption = merge(this.option, newSeriesOption, true);
      this.fillDataTextStyle(newSeriesOption.data);
      var layoutMode = fetchLayoutMode(this);
      if (layoutMode) {
        mergeLayoutParam(this.option, newSeriesOption, layoutMode);
      }
      var sourceManager = inner3(this).sourceManager;
      sourceManager.dirty();
      sourceManager.prepareSource();
      var data = this.getInitialData(newSeriesOption, ecModel);
      wrapData(data, this);
      this.dataTask.dirty();
      this.dataTask.context.data = data;
      inner3(this).dataBeforeProcessed = data;
      autoSeriesName(this);
      this._initSelectedMapFromData(data);
    };
    SeriesModel2.prototype.fillDataTextStyle = function(data) {
      if (data && !isTypedArray(data)) {
        var props = ["show"];
        for (var i = 0; i < data.length; i++) {
          if (data[i] && data[i].label) {
            defaultEmphasis(data[i], "label", props);
          }
        }
      }
    };
    SeriesModel2.prototype.getInitialData = function(option, ecModel) {
      return;
    };
    SeriesModel2.prototype.appendData = function(params) {
      var data = this.getRawData();
      data.appendData(params.data);
    };
    SeriesModel2.prototype.getData = function(dataType) {
      var task = getCurrentTask(this);
      if (task) {
        var data = task.context.data;
        return dataType == null ? data : data.getLinkedData(dataType);
      } else {
        return inner3(this).data;
      }
    };
    SeriesModel2.prototype.getAllData = function() {
      var mainData = this.getData();
      return mainData && mainData.getLinkedDataAll ? mainData.getLinkedDataAll() : [{
        data: mainData
      }];
    };
    SeriesModel2.prototype.setData = function(data) {
      var task = getCurrentTask(this);
      if (task) {
        var context = task.context;
        context.outputData = data;
        if (task !== this.dataTask) {
          context.data = data;
        }
      }
      inner3(this).data = data;
    };
    SeriesModel2.prototype.getEncode = function() {
      var encode = this.get("encode", true);
      if (encode) {
        return createHashMap(encode);
      }
    };
    SeriesModel2.prototype.getSourceManager = function() {
      return inner3(this).sourceManager;
    };
    SeriesModel2.prototype.getSource = function() {
      return this.getSourceManager().getSource();
    };
    SeriesModel2.prototype.getRawData = function() {
      return inner3(this).dataBeforeProcessed;
    };
    SeriesModel2.prototype.getColorBy = function() {
      var colorBy = this.get("colorBy");
      return colorBy || "series";
    };
    SeriesModel2.prototype.isColorBySeries = function() {
      return this.getColorBy() === "series";
    };
    SeriesModel2.prototype.getBaseAxis = function() {
      var coordSys = this.coordinateSystem;
      return coordSys && coordSys.getBaseAxis && coordSys.getBaseAxis();
    };
    SeriesModel2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      return defaultSeriesFormatTooltip({
        series: this,
        dataIndex,
        multipleSeries
      });
    };
    SeriesModel2.prototype.isAnimationEnabled = function() {
      var ecModel = this.ecModel;
      if (env_default.node && !(ecModel && ecModel.ssr)) {
        return false;
      }
      var animationEnabled = this.getShallow("animation");
      if (animationEnabled) {
        if (this.getData().count() > this.getShallow("animationThreshold")) {
          animationEnabled = false;
        }
      }
      return !!animationEnabled;
    };
    SeriesModel2.prototype.restoreData = function() {
      this.dataTask.dirty();
    };
    SeriesModel2.prototype.getColorFromPalette = function(name, scope, requestColorNum) {
      var ecModel = this.ecModel;
      var color = PaletteMixin.prototype.getColorFromPalette.call(this, name, scope, requestColorNum);
      if (!color) {
        color = ecModel.getColorFromPalette(name, scope, requestColorNum);
      }
      return color;
    };
    SeriesModel2.prototype.coordDimToDataDim = function(coordDim) {
      return this.getRawData().mapDimensionsAll(coordDim);
    };
    SeriesModel2.prototype.getProgressive = function() {
      return this.get("progressive");
    };
    SeriesModel2.prototype.getProgressiveThreshold = function() {
      return this.get("progressiveThreshold");
    };
    SeriesModel2.prototype.select = function(innerDataIndices, dataType) {
      this._innerSelect(this.getData(dataType), innerDataIndices);
    };
    SeriesModel2.prototype.unselect = function(innerDataIndices, dataType) {
      var selectedMap = this.option.selectedMap;
      if (!selectedMap) {
        return;
      }
      var selectedMode = this.option.selectedMode;
      var data = this.getData(dataType);
      if (selectedMode === "series" || selectedMap === "all") {
        this.option.selectedMap = {};
        this._selectedDataIndicesMap = {};
        return;
      }
      for (var i = 0; i < innerDataIndices.length; i++) {
        var dataIndex = innerDataIndices[i];
        var nameOrId = getSelectionKey(data, dataIndex);
        selectedMap[nameOrId] = false;
        this._selectedDataIndicesMap[nameOrId] = -1;
      }
    };
    SeriesModel2.prototype.toggleSelect = function(innerDataIndices, dataType) {
      var tmpArr = [];
      for (var i = 0; i < innerDataIndices.length; i++) {
        tmpArr[0] = innerDataIndices[i];
        this.isSelected(innerDataIndices[i], dataType) ? this.unselect(tmpArr, dataType) : this.select(tmpArr, dataType);
      }
    };
    SeriesModel2.prototype.getSelectedDataIndices = function() {
      if (this.option.selectedMap === "all") {
        return [].slice.call(this.getData().getIndices());
      }
      var selectedDataIndicesMap = this._selectedDataIndicesMap;
      var nameOrIds = keys(selectedDataIndicesMap);
      var dataIndices = [];
      for (var i = 0; i < nameOrIds.length; i++) {
        var dataIndex = selectedDataIndicesMap[nameOrIds[i]];
        if (dataIndex >= 0) {
          dataIndices.push(dataIndex);
        }
      }
      return dataIndices;
    };
    SeriesModel2.prototype.isSelected = function(dataIndex, dataType) {
      var selectedMap = this.option.selectedMap;
      if (!selectedMap) {
        return false;
      }
      var data = this.getData(dataType);
      return (selectedMap === "all" || selectedMap[getSelectionKey(data, dataIndex)]) && !data.getItemModel(dataIndex).get(["select", "disabled"]);
    };
    SeriesModel2.prototype.isUniversalTransitionEnabled = function() {
      if (this[SERIES_UNIVERSAL_TRANSITION_PROP]) {
        return true;
      }
      var universalTransitionOpt = this.option.universalTransition;
      if (!universalTransitionOpt) {
        return false;
      }
      if (universalTransitionOpt === true) {
        return true;
      }
      return universalTransitionOpt && universalTransitionOpt.enabled;
    };
    SeriesModel2.prototype._innerSelect = function(data, innerDataIndices) {
      var _a2, _b2;
      var option = this.option;
      var selectedMode = option.selectedMode;
      var len2 = innerDataIndices.length;
      if (!selectedMode || !len2) {
        return;
      }
      if (selectedMode === "series") {
        option.selectedMap = "all";
      } else if (selectedMode === "multiple") {
        if (!isObject(option.selectedMap)) {
          option.selectedMap = {};
        }
        var selectedMap = option.selectedMap;
        for (var i = 0; i < len2; i++) {
          var dataIndex = innerDataIndices[i];
          var nameOrId = getSelectionKey(data, dataIndex);
          selectedMap[nameOrId] = true;
          this._selectedDataIndicesMap[nameOrId] = data.getRawIndex(dataIndex);
        }
      } else if (selectedMode === "single" || selectedMode === true) {
        var lastDataIndex = innerDataIndices[len2 - 1];
        var nameOrId = getSelectionKey(data, lastDataIndex);
        option.selectedMap = (_a2 = {}, _a2[nameOrId] = true, _a2);
        this._selectedDataIndicesMap = (_b2 = {}, _b2[nameOrId] = data.getRawIndex(lastDataIndex), _b2);
      }
    };
    SeriesModel2.prototype._initSelectedMapFromData = function(data) {
      if (this.option.selectedMap) {
        return;
      }
      var dataIndices = [];
      if (data.hasItemOption) {
        data.each(function(idx) {
          var rawItem = data.getRawDataItem(idx);
          if (rawItem && rawItem.selected) {
            dataIndices.push(idx);
          }
        });
      }
      if (dataIndices.length > 0) {
        this._innerSelect(data, dataIndices);
      }
    };
    SeriesModel2.registerClass = function(clz) {
      return Component_default.registerClass(clz);
    };
    SeriesModel2.protoInitialize = function() {
      var proto = SeriesModel2.prototype;
      proto.type = "series.__base__";
      proto.seriesIndex = 0;
      proto.ignoreStyleOnData = false;
      proto.hasSymbolVisual = false;
      proto.defaultSymbol = "circle";
      proto.visualStyleAccessPath = "itemStyle";
      proto.visualDrawType = "fill";
    }();
    return SeriesModel2;
  }(Component_default)
);
mixin(SeriesModel, DataFormatMixin);
mixin(SeriesModel, PaletteMixin);
mountExtend(SeriesModel, Component_default);
function autoSeriesName(seriesModel) {
  var name = seriesModel.name;
  if (!isNameSpecified(seriesModel)) {
    seriesModel.name = getSeriesAutoName(seriesModel) || name;
  }
}
function getSeriesAutoName(seriesModel) {
  var data = seriesModel.getRawData();
  var dataDims = data.mapDimensionsAll("seriesName");
  var nameArr = [];
  each(dataDims, function(dataDim) {
    var dimInfo = data.getDimensionInfo(dataDim);
    dimInfo.displayName && nameArr.push(dimInfo.displayName);
  });
  return nameArr.join(" ");
}
function dataTaskCount(context) {
  return context.model.getRawData().count();
}
function dataTaskReset(context) {
  var seriesModel = context.model;
  seriesModel.setData(seriesModel.getRawData().cloneShallow());
  return dataTaskProgress;
}
function dataTaskProgress(param, context) {
  if (context.outputData && param.end > context.outputData.count()) {
    context.model.getRawData().cloneShallow(context.outputData);
  }
}
function wrapData(data, seriesModel) {
  each(concatArray(data.CHANGABLE_METHODS, data.DOWNSAMPLE_METHODS), function(methodName) {
    data.wrapMethod(methodName, curry(onDataChange, seriesModel));
  });
}
function onDataChange(seriesModel, newList) {
  var task = getCurrentTask(seriesModel);
  if (task) {
    task.setOutputEnd((newList || this).count());
  }
  return newList;
}
function getCurrentTask(seriesModel) {
  var scheduler = (seriesModel.ecModel || {}).scheduler;
  var pipeline = scheduler && scheduler.getPipeline(seriesModel.uid);
  if (pipeline) {
    var task = pipeline.currentTask;
    if (task) {
      var agentStubMap = task.agentStubMap;
      if (agentStubMap) {
        task = agentStubMap.get(seriesModel.uid);
      }
    }
    return task;
  }
}
var Series_default = SeriesModel;

// node_modules/echarts/lib/util/symbol.js
var Triangle = Path_default.extend({
  type: "triangle",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(path3, shape) {
    var cx = shape.cx;
    var cy = shape.cy;
    var width = shape.width / 2;
    var height = shape.height / 2;
    path3.moveTo(cx, cy - height);
    path3.lineTo(cx + width, cy + height);
    path3.lineTo(cx - width, cy + height);
    path3.closePath();
  }
});
var Diamond = Path_default.extend({
  type: "diamond",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(path3, shape) {
    var cx = shape.cx;
    var cy = shape.cy;
    var width = shape.width / 2;
    var height = shape.height / 2;
    path3.moveTo(cx, cy - height);
    path3.lineTo(cx + width, cy);
    path3.lineTo(cx, cy + height);
    path3.lineTo(cx - width, cy);
    path3.closePath();
  }
});
var Pin = Path_default.extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(path3, shape) {
    var x = shape.x;
    var y = shape.y;
    var w = shape.width / 5 * 3;
    var h = Math.max(w, shape.height);
    var r = w / 2;
    var dy = r * r / (h - r);
    var cy = y - h + r + dy;
    var angle = Math.asin(dy / r);
    var dx = Math.cos(angle) * r;
    var tanX = Math.sin(angle);
    var tanY = Math.cos(angle);
    var cpLen = r * 0.6;
    var cpLen2 = r * 0.7;
    path3.moveTo(x - dx, cy + dy);
    path3.arc(x, cy, r, Math.PI - angle, Math.PI * 2 + angle);
    path3.bezierCurveTo(x + dx - tanX * cpLen, cy + dy + tanY * cpLen, x, y - cpLen2, x, y);
    path3.bezierCurveTo(x, y - cpLen2, x - dx + tanX * cpLen, cy + dy + tanY * cpLen, x - dx, cy + dy);
    path3.closePath();
  }
});
var Arrow = Path_default.extend({
  type: "arrow",
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(ctx, shape) {
    var height = shape.height;
    var width = shape.width;
    var x = shape.x;
    var y = shape.y;
    var dx = width / 3 * 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx, y + height);
    ctx.lineTo(x, y + height / 4 * 3);
    ctx.lineTo(x - dx, y + height);
    ctx.lineTo(x, y);
    ctx.closePath();
  }
});
var symbolCtors = {
  line: Line_default,
  rect: Rect_default,
  roundRect: Rect_default,
  square: Rect_default,
  circle: Circle_default,
  diamond: Diamond,
  pin: Pin,
  arrow: Arrow,
  triangle: Triangle
};
var symbolShapeMakers = {
  line: function(x, y, w, h, shape) {
    shape.x1 = x;
    shape.y1 = y + h / 2;
    shape.x2 = x + w;
    shape.y2 = y + h / 2;
  },
  rect: function(x, y, w, h, shape) {
    shape.x = x;
    shape.y = y;
    shape.width = w;
    shape.height = h;
  },
  roundRect: function(x, y, w, h, shape) {
    shape.x = x;
    shape.y = y;
    shape.width = w;
    shape.height = h;
    shape.r = Math.min(w, h) / 4;
  },
  square: function(x, y, w, h, shape) {
    var size = Math.min(w, h);
    shape.x = x;
    shape.y = y;
    shape.width = size;
    shape.height = size;
  },
  circle: function(x, y, w, h, shape) {
    shape.cx = x + w / 2;
    shape.cy = y + h / 2;
    shape.r = Math.min(w, h) / 2;
  },
  diamond: function(x, y, w, h, shape) {
    shape.cx = x + w / 2;
    shape.cy = y + h / 2;
    shape.width = w;
    shape.height = h;
  },
  pin: function(x, y, w, h, shape) {
    shape.x = x + w / 2;
    shape.y = y + h / 2;
    shape.width = w;
    shape.height = h;
  },
  arrow: function(x, y, w, h, shape) {
    shape.x = x + w / 2;
    shape.y = y + h / 2;
    shape.width = w;
    shape.height = h;
  },
  triangle: function(x, y, w, h, shape) {
    shape.cx = x + w / 2;
    shape.cy = y + h / 2;
    shape.width = w;
    shape.height = h;
  }
};
var symbolBuildProxies = {};
each(symbolCtors, function(Ctor, name) {
  symbolBuildProxies[name] = new Ctor();
});
var SymbolClz = Path_default.extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition: function(out2, config, rect) {
    var res = calculateTextPosition(out2, config, rect);
    var shape = this.shape;
    if (shape && shape.symbolType === "pin" && config.position === "inside") {
      res.y = rect.y + rect.height * 0.4;
    }
    return res;
  },
  buildPath: function(ctx, shape, inBundle) {
    var symbolType = shape.symbolType;
    if (symbolType !== "none") {
      var proxySymbol = symbolBuildProxies[symbolType];
      if (!proxySymbol) {
        symbolType = "rect";
        proxySymbol = symbolBuildProxies[symbolType];
      }
      symbolShapeMakers[symbolType](shape.x, shape.y, shape.width, shape.height, proxySymbol.shape);
      proxySymbol.buildPath(ctx, proxySymbol.shape, inBundle);
    }
  }
});
function symbolPathSetColor(color, innerColor2) {
  if (this.type !== "image") {
    var symbolStyle = this.style;
    if (this.__isEmptyBrush) {
      symbolStyle.stroke = color;
      symbolStyle.fill = innerColor2 || "#fff";
      symbolStyle.lineWidth = 2;
    } else if (this.shape.symbolType === "line") {
      symbolStyle.stroke = color;
    } else {
      symbolStyle.fill = color;
    }
    this.markRedraw();
  }
}
function createSymbol(symbolType, x, y, w, h, color, keepAspect) {
  var isEmpty = symbolType.indexOf("empty") === 0;
  if (isEmpty) {
    symbolType = symbolType.substr(5, 1).toLowerCase() + symbolType.substr(6);
  }
  var symbolPath;
  if (symbolType.indexOf("image://") === 0) {
    symbolPath = makeImage(symbolType.slice(8), new BoundingRect_default(x, y, w, h), keepAspect ? "center" : "cover");
  } else if (symbolType.indexOf("path://") === 0) {
    symbolPath = makePath(symbolType.slice(7), {}, new BoundingRect_default(x, y, w, h), keepAspect ? "center" : "cover");
  } else {
    symbolPath = new SymbolClz({
      shape: {
        symbolType,
        x,
        y,
        width: w,
        height: h
      }
    });
  }
  symbolPath.__isEmptyBrush = isEmpty;
  symbolPath.setColor = symbolPathSetColor;
  if (color) {
    symbolPath.setColor(color);
  }
  return symbolPath;
}

// node_modules/echarts/lib/chart/helper/createRenderPlanner.js
function createRenderPlanner() {
  var inner9 = makeInner();
  return function(seriesModel) {
    var fields = inner9(seriesModel);
    var pipelineContext = seriesModel.pipelineContext;
    var originalLarge = !!fields.large;
    var originalProgressive = !!fields.progressiveRender;
    var large = fields.large = !!(pipelineContext && pipelineContext.large);
    var progressive = fields.progressiveRender = !!(pipelineContext && pipelineContext.progressiveRender);
    return !!(originalLarge !== large || originalProgressive !== progressive) && "reset";
  };
}

// node_modules/echarts/lib/view/Chart.js
var inner4 = makeInner();
var renderPlanner = createRenderPlanner();
var ChartView = (
  /** @class */
  function() {
    function ChartView2() {
      this.group = new Group_default();
      this.uid = getUID("viewChart");
      this.renderTask = createTask({
        plan: renderTaskPlan,
        reset: renderTaskReset
      });
      this.renderTask.context = {
        view: this
      };
    }
    ChartView2.prototype.init = function(ecModel, api) {
    };
    ChartView2.prototype.render = function(seriesModel, ecModel, api, payload) {
      if (process.env.NODE_ENV !== "production") {
        throw new Error("render method must been implemented");
      }
    };
    ChartView2.prototype.highlight = function(seriesModel, ecModel, api, payload) {
      var data = seriesModel.getData(payload && payload.dataType);
      if (!data) {
        if (process.env.NODE_ENV !== "production") {
          error("Unknown dataType " + payload.dataType);
        }
        return;
      }
      toggleHighlight(data, payload, "emphasis");
    };
    ChartView2.prototype.downplay = function(seriesModel, ecModel, api, payload) {
      var data = seriesModel.getData(payload && payload.dataType);
      if (!data) {
        if (process.env.NODE_ENV !== "production") {
          error("Unknown dataType " + payload.dataType);
        }
        return;
      }
      toggleHighlight(data, payload, "normal");
    };
    ChartView2.prototype.remove = function(ecModel, api) {
      this.group.removeAll();
    };
    ChartView2.prototype.dispose = function(ecModel, api) {
    };
    ChartView2.prototype.updateView = function(seriesModel, ecModel, api, payload) {
      this.render(seriesModel, ecModel, api, payload);
    };
    ChartView2.prototype.updateLayout = function(seriesModel, ecModel, api, payload) {
      this.render(seriesModel, ecModel, api, payload);
    };
    ChartView2.prototype.updateVisual = function(seriesModel, ecModel, api, payload) {
      this.render(seriesModel, ecModel, api, payload);
    };
    ChartView2.prototype.eachRendered = function(cb) {
      traverseElements(this.group, cb);
    };
    ChartView2.markUpdateMethod = function(payload, methodName) {
      inner4(payload).updateMethod = methodName;
    };
    ChartView2.protoInitialize = function() {
      var proto = ChartView2.prototype;
      proto.type = "chart";
    }();
    return ChartView2;
  }()
);
function elSetState(el, state, highlightDigit) {
  if (el && isHighDownDispatcher(el)) {
    (state === "emphasis" ? enterEmphasis : leaveEmphasis)(el, highlightDigit);
  }
}
function toggleHighlight(data, payload, state) {
  var dataIndex = queryDataIndex(data, payload);
  var highlightDigit = payload && payload.highlightKey != null ? getHighlightDigit(payload.highlightKey) : null;
  if (dataIndex != null) {
    each(normalizeToArray(dataIndex), function(dataIdx) {
      elSetState(data.getItemGraphicEl(dataIdx), state, highlightDigit);
    });
  } else {
    data.eachItemGraphicEl(function(el) {
      elSetState(el, state, highlightDigit);
    });
  }
}
enableClassExtend(ChartView, ["dispose"]);
enableClassManagement(ChartView);
function renderTaskPlan(context) {
  return renderPlanner(context.model);
}
function renderTaskReset(context) {
  var seriesModel = context.model;
  var ecModel = context.ecModel;
  var api = context.api;
  var payload = context.payload;
  var progressiveRender = seriesModel.pipelineContext.progressiveRender;
  var view = context.view;
  var updateMethod = payload && inner4(payload).updateMethod;
  var methodName = progressiveRender ? "incrementalPrepareRender" : updateMethod && view[updateMethod] ? updateMethod : "render";
  if (methodName !== "render") {
    view[methodName](seriesModel, ecModel, api, payload);
  }
  return progressMethodMap[methodName];
}
var progressMethodMap = {
  incrementalPrepareRender: {
    progress: function(params, context) {
      context.view.incrementalRender(params, context.model, context.ecModel, context.api, context.payload);
    }
  },
  render: {
    // Put view.render in `progress` to support appendData. But in this case
    // view.render should not be called in reset, otherwise it will be called
    // twise. Use `forceFirstProgress` to make sure that view.render is called
    // in any cases.
    forceFirstProgress: true,
    progress: function(params, context) {
      context.view.render(context.model, context.ecModel, context.api, context.payload);
    }
  }
};
var Chart_default = ChartView;

// node_modules/echarts/lib/util/throttle.js
function throttle(fn, delay, debounce) {
  var currCall;
  var lastCall = 0;
  var lastExec = 0;
  var timer = null;
  var diff;
  var scope;
  var args;
  var debounceNextCall;
  delay = delay || 0;
  function exec() {
    lastExec = (/* @__PURE__ */ new Date()).getTime();
    timer = null;
    fn.apply(scope, args || []);
  }
  var cb = function() {
    var cbArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      cbArgs[_i] = arguments[_i];
    }
    currCall = (/* @__PURE__ */ new Date()).getTime();
    scope = this;
    args = cbArgs;
    var thisDelay = debounceNextCall || delay;
    var thisDebounce = debounceNextCall || debounce;
    debounceNextCall = null;
    diff = currCall - (thisDebounce ? lastCall : lastExec) - thisDelay;
    clearTimeout(timer);
    if (thisDebounce) {
      timer = setTimeout(exec, thisDelay);
    } else {
      if (diff >= 0) {
        exec();
      } else {
        timer = setTimeout(exec, -diff);
      }
    }
    lastCall = currCall;
  };
  cb.clear = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  cb.debounceNextCall = function(debounceDelay) {
    debounceNextCall = debounceDelay;
  };
  return cb;
}

// node_modules/echarts/lib/legacy/dataSelectAction.js
function handleSeriesLegacySelectEvents(type, eventPostfix, ecIns, ecModel, payload) {
  var legacyEventName = type + eventPostfix;
  if (!ecIns.isSilent(legacyEventName)) {
    if (process.env.NODE_ENV !== "production") {
      deprecateLog("event " + legacyEventName + " is deprecated.");
    }
    ecModel.eachComponent({
      mainType: "series",
      subType: "pie"
    }, function(seriesModel) {
      var seriesIndex = seriesModel.seriesIndex;
      var selectedMap = seriesModel.option.selectedMap;
      var selected = payload.selected;
      for (var i = 0; i < selected.length; i++) {
        if (selected[i].seriesIndex === seriesIndex) {
          var data = seriesModel.getData();
          var dataIndex = queryDataIndex(data, payload.fromActionPayload);
          ecIns.trigger(legacyEventName, {
            type: legacyEventName,
            seriesId: seriesModel.id,
            name: isArray(dataIndex) ? data.getName(dataIndex[0]) : data.getName(dataIndex),
            selected: isString(selectedMap) ? selectedMap : extend({}, selectedMap)
          });
        }
      }
    });
  }
}
function handleLegacySelectEvents(messageCenter, ecIns, api) {
  messageCenter.on("selectchanged", function(params) {
    var ecModel = api.getModel();
    if (params.isFromClick) {
      handleSeriesLegacySelectEvents("map", "selectchanged", ecIns, ecModel, params);
      handleSeriesLegacySelectEvents("pie", "selectchanged", ecIns, ecModel, params);
    } else if (params.fromAction === "select") {
      handleSeriesLegacySelectEvents("map", "selected", ecIns, ecModel, params);
      handleSeriesLegacySelectEvents("pie", "selected", ecIns, ecModel, params);
    } else if (params.fromAction === "unselect") {
      handleSeriesLegacySelectEvents("map", "unselected", ecIns, ecModel, params);
      handleSeriesLegacySelectEvents("pie", "unselected", ecIns, ecModel, params);
    }
  });
}

// node_modules/zrender/lib/mixin/Draggable.js
var Param = /* @__PURE__ */ function() {
  function Param2(target, e2) {
    this.target = target;
    this.topTarget = e2 && e2.topTarget;
  }
  return Param2;
}();
var Draggable = function() {
  function Draggable2(handler) {
    this.handler = handler;
    handler.on("mousedown", this._dragStart, this);
    handler.on("mousemove", this._drag, this);
    handler.on("mouseup", this._dragEnd, this);
  }
  Draggable2.prototype._dragStart = function(e2) {
    var draggingTarget = e2.target;
    while (draggingTarget && !draggingTarget.draggable) {
      draggingTarget = draggingTarget.parent || draggingTarget.__hostTarget;
    }
    if (draggingTarget) {
      this._draggingTarget = draggingTarget;
      draggingTarget.dragging = true;
      this._x = e2.offsetX;
      this._y = e2.offsetY;
      this.handler.dispatchToElement(new Param(draggingTarget, e2), "dragstart", e2.event);
    }
  };
  Draggable2.prototype._drag = function(e2) {
    var draggingTarget = this._draggingTarget;
    if (draggingTarget) {
      var x = e2.offsetX;
      var y = e2.offsetY;
      var dx = x - this._x;
      var dy = y - this._y;
      this._x = x;
      this._y = y;
      draggingTarget.drift(dx, dy, e2);
      this.handler.dispatchToElement(new Param(draggingTarget, e2), "drag", e2.event);
      var dropTarget = this.handler.findHover(x, y, draggingTarget).target;
      var lastDropTarget = this._dropTarget;
      this._dropTarget = dropTarget;
      if (draggingTarget !== dropTarget) {
        if (lastDropTarget && dropTarget !== lastDropTarget) {
          this.handler.dispatchToElement(new Param(lastDropTarget, e2), "dragleave", e2.event);
        }
        if (dropTarget && dropTarget !== lastDropTarget) {
          this.handler.dispatchToElement(new Param(dropTarget, e2), "dragenter", e2.event);
        }
      }
    }
  };
  Draggable2.prototype._dragEnd = function(e2) {
    var draggingTarget = this._draggingTarget;
    if (draggingTarget) {
      draggingTarget.dragging = false;
    }
    this.handler.dispatchToElement(new Param(draggingTarget, e2), "dragend", e2.event);
    if (this._dropTarget) {
      this.handler.dispatchToElement(new Param(this._dropTarget, e2), "drop", e2.event);
    }
    this._draggingTarget = null;
    this._dropTarget = null;
  };
  return Draggable2;
}();
var Draggable_default = Draggable;

// node_modules/zrender/lib/core/event.js
var MOUSE_EVENT_REG = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
var _calcOut = [];
var firefoxNotSupportOffsetXY = env_default.browser.firefox && +env_default.browser.version.split(".")[0] < 39;
function clientToLocal(el, e2, out2, calculate) {
  out2 = out2 || {};
  if (calculate) {
    calculateZrXY(el, e2, out2);
  } else if (firefoxNotSupportOffsetXY && e2.layerX != null && e2.layerX !== e2.offsetX) {
    out2.zrX = e2.layerX;
    out2.zrY = e2.layerY;
  } else if (e2.offsetX != null) {
    out2.zrX = e2.offsetX;
    out2.zrY = e2.offsetY;
  } else {
    calculateZrXY(el, e2, out2);
  }
  return out2;
}
function calculateZrXY(el, e2, out2) {
  if (env_default.domSupported && el.getBoundingClientRect) {
    var ex = e2.clientX;
    var ey = e2.clientY;
    if (isCanvasEl(el)) {
      var box = el.getBoundingClientRect();
      out2.zrX = ex - box.left;
      out2.zrY = ey - box.top;
      return;
    } else {
      if (transformCoordWithViewport(_calcOut, el, ex, ey)) {
        out2.zrX = _calcOut[0];
        out2.zrY = _calcOut[1];
        return;
      }
    }
  }
  out2.zrX = out2.zrY = 0;
}
function getNativeEvent(e2) {
  return e2 || window.event;
}
function normalizeEvent(el, e2, calculate) {
  e2 = getNativeEvent(e2);
  if (e2.zrX != null) {
    return e2;
  }
  var eventType = e2.type;
  var isTouch = eventType && eventType.indexOf("touch") >= 0;
  if (!isTouch) {
    clientToLocal(el, e2, e2, calculate);
    var wheelDelta = getWheelDeltaMayPolyfill(e2);
    e2.zrDelta = wheelDelta ? wheelDelta / 120 : -(e2.detail || 0) / 3;
  } else {
    var touch = eventType !== "touchend" ? e2.targetTouches[0] : e2.changedTouches[0];
    touch && clientToLocal(el, touch, e2, calculate);
  }
  var button = e2.button;
  if (e2.which == null && button !== void 0 && MOUSE_EVENT_REG.test(e2.type)) {
    e2.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
  }
  return e2;
}
function getWheelDeltaMayPolyfill(e2) {
  var rawWheelDelta = e2.wheelDelta;
  if (rawWheelDelta) {
    return rawWheelDelta;
  }
  var deltaX = e2.deltaX;
  var deltaY = e2.deltaY;
  if (deltaX == null || deltaY == null) {
    return rawWheelDelta;
  }
  var delta = deltaY !== 0 ? Math.abs(deltaY) : Math.abs(deltaX);
  var sign2 = deltaY > 0 ? -1 : deltaY < 0 ? 1 : deltaX > 0 ? -1 : 1;
  return 3 * delta * sign2;
}
function addEventListener(el, name, handler, opt) {
  el.addEventListener(name, handler, opt);
}
function removeEventListener(el, name, handler, opt) {
  el.removeEventListener(name, handler, opt);
}
var stop = function(e2) {
  e2.preventDefault();
  e2.stopPropagation();
  e2.cancelBubble = true;
};
function isMiddleOrRightButtonOnMouseUpDown(e2) {
  return e2.which === 2 || e2.which === 3;
}

// node_modules/zrender/lib/core/GestureMgr.js
var GestureMgr = function() {
  function GestureMgr2() {
    this._track = [];
  }
  GestureMgr2.prototype.recognize = function(event, target, root) {
    this._doTrack(event, target, root);
    return this._recognize(event);
  };
  GestureMgr2.prototype.clear = function() {
    this._track.length = 0;
    return this;
  };
  GestureMgr2.prototype._doTrack = function(event, target, root) {
    var touches = event.touches;
    if (!touches) {
      return;
    }
    var trackItem = {
      points: [],
      touches: [],
      target,
      event
    };
    for (var i = 0, len2 = touches.length; i < len2; i++) {
      var touch = touches[i];
      var pos = clientToLocal(root, touch, {});
      trackItem.points.push([pos.zrX, pos.zrY]);
      trackItem.touches.push(touch);
    }
    this._track.push(trackItem);
  };
  GestureMgr2.prototype._recognize = function(event) {
    for (var eventName in recognizers) {
      if (recognizers.hasOwnProperty(eventName)) {
        var gestureInfo = recognizers[eventName](this._track, event);
        if (gestureInfo) {
          return gestureInfo;
        }
      }
    }
  };
  return GestureMgr2;
}();
function dist2(pointPair) {
  var dx = pointPair[1][0] - pointPair[0][0];
  var dy = pointPair[1][1] - pointPair[0][1];
  return Math.sqrt(dx * dx + dy * dy);
}
function center(pointPair) {
  return [
    (pointPair[0][0] + pointPair[1][0]) / 2,
    (pointPair[0][1] + pointPair[1][1]) / 2
  ];
}
var recognizers = {
  pinch: function(tracks, event) {
    var trackLen = tracks.length;
    if (!trackLen) {
      return;
    }
    var pinchEnd = (tracks[trackLen - 1] || {}).points;
    var pinchPre = (tracks[trackLen - 2] || {}).points || pinchEnd;
    if (pinchPre && pinchPre.length > 1 && pinchEnd && pinchEnd.length > 1) {
      var pinchScale = dist2(pinchEnd) / dist2(pinchPre);
      !isFinite(pinchScale) && (pinchScale = 1);
      event.pinchScale = pinchScale;
      var pinchCenter = center(pinchEnd);
      event.pinchX = pinchCenter[0];
      event.pinchY = pinchCenter[1];
      return {
        type: "pinch",
        target: tracks[0].target,
        event
      };
    }
  }
};

// node_modules/zrender/lib/Handler.js
var SILENT = "silent";
function makeEventPacket(eveType, targetInfo, event) {
  return {
    type: eveType,
    event,
    target: targetInfo.target,
    topTarget: targetInfo.topTarget,
    cancelBubble: false,
    offsetX: event.zrX,
    offsetY: event.zrY,
    gestureEvent: event.gestureEvent,
    pinchX: event.pinchX,
    pinchY: event.pinchY,
    pinchScale: event.pinchScale,
    wheelDelta: event.zrDelta,
    zrByTouch: event.zrByTouch,
    which: event.which,
    stop: stopEvent
  };
}
function stopEvent() {
  stop(this.event);
}
var EmptyProxy = function(_super) {
  __extends(EmptyProxy2, _super);
  function EmptyProxy2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.handler = null;
    return _this;
  }
  EmptyProxy2.prototype.dispose = function() {
  };
  EmptyProxy2.prototype.setCursor = function() {
  };
  return EmptyProxy2;
}(Eventful_default);
var HoveredResult = /* @__PURE__ */ function() {
  function HoveredResult2(x, y) {
    this.x = x;
    this.y = y;
  }
  return HoveredResult2;
}();
var handlerNames = [
  "click",
  "dblclick",
  "mousewheel",
  "mouseout",
  "mouseup",
  "mousedown",
  "mousemove",
  "contextmenu"
];
var tmpRect2 = new BoundingRect_default(0, 0, 0, 0);
var Handler = function(_super) {
  __extends(Handler2, _super);
  function Handler2(storage, painter, proxy, painterRoot, pointerSize) {
    var _this = _super.call(this) || this;
    _this._hovered = new HoveredResult(0, 0);
    _this.storage = storage;
    _this.painter = painter;
    _this.painterRoot = painterRoot;
    _this._pointerSize = pointerSize;
    proxy = proxy || new EmptyProxy();
    _this.proxy = null;
    _this.setHandlerProxy(proxy);
    _this._draggingMgr = new Draggable_default(_this);
    return _this;
  }
  Handler2.prototype.setHandlerProxy = function(proxy) {
    if (this.proxy) {
      this.proxy.dispose();
    }
    if (proxy) {
      each(handlerNames, function(name) {
        proxy.on && proxy.on(name, this[name], this);
      }, this);
      proxy.handler = this;
    }
    this.proxy = proxy;
  };
  Handler2.prototype.mousemove = function(event) {
    var x = event.zrX;
    var y = event.zrY;
    var isOutside = isOutsideBoundary(this, x, y);
    var lastHovered = this._hovered;
    var lastHoveredTarget = lastHovered.target;
    if (lastHoveredTarget && !lastHoveredTarget.__zr) {
      lastHovered = this.findHover(lastHovered.x, lastHovered.y);
      lastHoveredTarget = lastHovered.target;
    }
    var hovered = this._hovered = isOutside ? new HoveredResult(x, y) : this.findHover(x, y);
    var hoveredTarget = hovered.target;
    var proxy = this.proxy;
    proxy.setCursor && proxy.setCursor(hoveredTarget ? hoveredTarget.cursor : "default");
    if (lastHoveredTarget && hoveredTarget !== lastHoveredTarget) {
      this.dispatchToElement(lastHovered, "mouseout", event);
    }
    this.dispatchToElement(hovered, "mousemove", event);
    if (hoveredTarget && hoveredTarget !== lastHoveredTarget) {
      this.dispatchToElement(hovered, "mouseover", event);
    }
  };
  Handler2.prototype.mouseout = function(event) {
    var eventControl = event.zrEventControl;
    if (eventControl !== "only_globalout") {
      this.dispatchToElement(this._hovered, "mouseout", event);
    }
    if (eventControl !== "no_globalout") {
      this.trigger("globalout", { type: "globalout", event });
    }
  };
  Handler2.prototype.resize = function() {
    this._hovered = new HoveredResult(0, 0);
  };
  Handler2.prototype.dispatch = function(eventName, eventArgs) {
    var handler = this[eventName];
    handler && handler.call(this, eventArgs);
  };
  Handler2.prototype.dispose = function() {
    this.proxy.dispose();
    this.storage = null;
    this.proxy = null;
    this.painter = null;
  };
  Handler2.prototype.setCursorStyle = function(cursorStyle) {
    var proxy = this.proxy;
    proxy.setCursor && proxy.setCursor(cursorStyle);
  };
  Handler2.prototype.dispatchToElement = function(targetInfo, eventName, event) {
    targetInfo = targetInfo || {};
    var el = targetInfo.target;
    if (el && el.silent) {
      return;
    }
    var eventKey = "on" + eventName;
    var eventPacket = makeEventPacket(eventName, targetInfo, event);
    while (el) {
      el[eventKey] && (eventPacket.cancelBubble = !!el[eventKey].call(el, eventPacket));
      el.trigger(eventName, eventPacket);
      el = el.__hostTarget ? el.__hostTarget : el.parent;
      if (eventPacket.cancelBubble) {
        break;
      }
    }
    if (!eventPacket.cancelBubble) {
      this.trigger(eventName, eventPacket);
      if (this.painter && this.painter.eachOtherLayer) {
        this.painter.eachOtherLayer(function(layer) {
          if (typeof layer[eventKey] === "function") {
            layer[eventKey].call(layer, eventPacket);
          }
          if (layer.trigger) {
            layer.trigger(eventName, eventPacket);
          }
        });
      }
    }
  };
  Handler2.prototype.findHover = function(x, y, exclude) {
    var list = this.storage.getDisplayList();
    var out2 = new HoveredResult(x, y);
    setHoverTarget(list, out2, x, y, exclude);
    if (this._pointerSize && !out2.target) {
      var candidates = [];
      var pointerSize = this._pointerSize;
      var targetSizeHalf = pointerSize / 2;
      var pointerRect = new BoundingRect_default(x - targetSizeHalf, y - targetSizeHalf, pointerSize, pointerSize);
      for (var i = list.length - 1; i >= 0; i--) {
        var el = list[i];
        if (el !== exclude && !el.ignore && !el.ignoreCoarsePointer && (!el.parent || !el.parent.ignoreCoarsePointer)) {
          tmpRect2.copy(el.getBoundingRect());
          if (el.transform) {
            tmpRect2.applyTransform(el.transform);
          }
          if (tmpRect2.intersect(pointerRect)) {
            candidates.push(el);
          }
        }
      }
      if (candidates.length) {
        var rStep = 4;
        var thetaStep = Math.PI / 12;
        var PI28 = Math.PI * 2;
        for (var r = 0; r < targetSizeHalf; r += rStep) {
          for (var theta = 0; theta < PI28; theta += thetaStep) {
            var x1 = x + r * Math.cos(theta);
            var y1 = y + r * Math.sin(theta);
            setHoverTarget(candidates, out2, x1, y1, exclude);
            if (out2.target) {
              return out2;
            }
          }
        }
      }
    }
    return out2;
  };
  Handler2.prototype.processGesture = function(event, stage) {
    if (!this._gestureMgr) {
      this._gestureMgr = new GestureMgr();
    }
    var gestureMgr = this._gestureMgr;
    stage === "start" && gestureMgr.clear();
    var gestureInfo = gestureMgr.recognize(event, this.findHover(event.zrX, event.zrY, null).target, this.proxy.dom);
    stage === "end" && gestureMgr.clear();
    if (gestureInfo) {
      var type = gestureInfo.type;
      event.gestureEvent = type;
      var res = new HoveredResult();
      res.target = gestureInfo.target;
      this.dispatchToElement(res, type, gestureInfo.event);
    }
  };
  return Handler2;
}(Eventful_default);
each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function(name) {
  Handler.prototype[name] = function(event) {
    var x = event.zrX;
    var y = event.zrY;
    var isOutside = isOutsideBoundary(this, x, y);
    var hovered;
    var hoveredTarget;
    if (name !== "mouseup" || !isOutside) {
      hovered = this.findHover(x, y);
      hoveredTarget = hovered.target;
    }
    if (name === "mousedown") {
      this._downEl = hoveredTarget;
      this._downPoint = [event.zrX, event.zrY];
      this._upEl = hoveredTarget;
    } else if (name === "mouseup") {
      this._upEl = hoveredTarget;
    } else if (name === "click") {
      if (this._downEl !== this._upEl || !this._downPoint || dist(this._downPoint, [event.zrX, event.zrY]) > 4) {
        return;
      }
      this._downPoint = null;
    }
    this.dispatchToElement(hovered, name, event);
  };
});
function isHover(displayable, x, y) {
  if (displayable[displayable.rectHover ? "rectContain" : "contain"](x, y)) {
    var el = displayable;
    var isSilent = void 0;
    var ignoreClip = false;
    while (el) {
      if (el.ignoreClip) {
        ignoreClip = true;
      }
      if (!ignoreClip) {
        var clipPath = el.getClipPath();
        if (clipPath && !clipPath.contain(x, y)) {
          return false;
        }
      }
      if (el.silent) {
        isSilent = true;
      }
      var hostEl = el.__hostTarget;
      el = hostEl ? hostEl : el.parent;
    }
    return isSilent ? SILENT : true;
  }
  return false;
}
function setHoverTarget(list, out2, x, y, exclude) {
  for (var i = list.length - 1; i >= 0; i--) {
    var el = list[i];
    var hoverCheckResult = void 0;
    if (el !== exclude && !el.ignore && (hoverCheckResult = isHover(el, x, y))) {
      !out2.topTarget && (out2.topTarget = el);
      if (hoverCheckResult !== SILENT) {
        out2.target = el;
        break;
      }
    }
  }
}
function isOutsideBoundary(handlerInstance, x, y) {
  var painter = handlerInstance.painter;
  return x < 0 || x > painter.getWidth() || y < 0 || y > painter.getHeight();
}
var Handler_default = Handler;

// node_modules/zrender/lib/core/timsort.js
var DEFAULT_MIN_MERGE = 32;
var DEFAULT_MIN_GALLOPING = 7;
function minRunLength(n) {
  var r = 0;
  while (n >= DEFAULT_MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
}
function makeAscendingRun(array, lo, hi, compare3) {
  var runHi = lo + 1;
  if (runHi === hi) {
    return 1;
  }
  if (compare3(array[runHi++], array[lo]) < 0) {
    while (runHi < hi && compare3(array[runHi], array[runHi - 1]) < 0) {
      runHi++;
    }
    reverseRun(array, lo, runHi);
  } else {
    while (runHi < hi && compare3(array[runHi], array[runHi - 1]) >= 0) {
      runHi++;
    }
  }
  return runHi - lo;
}
function reverseRun(array, lo, hi) {
  hi--;
  while (lo < hi) {
    var t = array[lo];
    array[lo++] = array[hi];
    array[hi--] = t;
  }
}
function binaryInsertionSort(array, lo, hi, start2, compare3) {
  if (start2 === lo) {
    start2++;
  }
  for (; start2 < hi; start2++) {
    var pivot = array[start2];
    var left = lo;
    var right = start2;
    var mid;
    while (left < right) {
      mid = left + right >>> 1;
      if (compare3(pivot, array[mid]) < 0) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    var n = start2 - left;
    switch (n) {
      case 3:
        array[left + 3] = array[left + 2];
      case 2:
        array[left + 2] = array[left + 1];
      case 1:
        array[left + 1] = array[left];
        break;
      default:
        while (n > 0) {
          array[left + n] = array[left + n - 1];
          n--;
        }
    }
    array[left] = pivot;
  }
}
function gallopLeft(value, array, start2, length, hint, compare3) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;
  if (compare3(value, array[start2 + hint]) > 0) {
    maxOffset = length - hint;
    while (offset < maxOffset && compare3(value, array[start2 + hint + offset]) > 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;
      if (offset <= 0) {
        offset = maxOffset;
      }
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    lastOffset += hint;
    offset += hint;
  } else {
    maxOffset = hint + 1;
    while (offset < maxOffset && compare3(value, array[start2 + hint - offset]) <= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;
      if (offset <= 0) {
        offset = maxOffset;
      }
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;
  }
  lastOffset++;
  while (lastOffset < offset) {
    var m = lastOffset + (offset - lastOffset >>> 1);
    if (compare3(value, array[start2 + m]) > 0) {
      lastOffset = m + 1;
    } else {
      offset = m;
    }
  }
  return offset;
}
function gallopRight(value, array, start2, length, hint, compare3) {
  var lastOffset = 0;
  var maxOffset = 0;
  var offset = 1;
  if (compare3(value, array[start2 + hint]) < 0) {
    maxOffset = hint + 1;
    while (offset < maxOffset && compare3(value, array[start2 + hint - offset]) < 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;
      if (offset <= 0) {
        offset = maxOffset;
      }
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    var tmp = lastOffset;
    lastOffset = hint - offset;
    offset = hint - tmp;
  } else {
    maxOffset = length - hint;
    while (offset < maxOffset && compare3(value, array[start2 + hint + offset]) >= 0) {
      lastOffset = offset;
      offset = (offset << 1) + 1;
      if (offset <= 0) {
        offset = maxOffset;
      }
    }
    if (offset > maxOffset) {
      offset = maxOffset;
    }
    lastOffset += hint;
    offset += hint;
  }
  lastOffset++;
  while (lastOffset < offset) {
    var m = lastOffset + (offset - lastOffset >>> 1);
    if (compare3(value, array[start2 + m]) < 0) {
      offset = m;
    } else {
      lastOffset = m + 1;
    }
  }
  return offset;
}
function TimSort(array, compare3) {
  var minGallop = DEFAULT_MIN_GALLOPING;
  var runStart;
  var runLength;
  var stackSize = 0;
  var tmp = [];
  runStart = [];
  runLength = [];
  function pushRun(_runStart, _runLength) {
    runStart[stackSize] = _runStart;
    runLength[stackSize] = _runLength;
    stackSize += 1;
  }
  function mergeRuns() {
    while (stackSize > 1) {
      var n = stackSize - 2;
      if (n >= 1 && runLength[n - 1] <= runLength[n] + runLength[n + 1] || n >= 2 && runLength[n - 2] <= runLength[n] + runLength[n - 1]) {
        if (runLength[n - 1] < runLength[n + 1]) {
          n--;
        }
      } else if (runLength[n] > runLength[n + 1]) {
        break;
      }
      mergeAt(n);
    }
  }
  function forceMergeRuns() {
    while (stackSize > 1) {
      var n = stackSize - 2;
      if (n > 0 && runLength[n - 1] < runLength[n + 1]) {
        n--;
      }
      mergeAt(n);
    }
  }
  function mergeAt(i) {
    var start1 = runStart[i];
    var length1 = runLength[i];
    var start2 = runStart[i + 1];
    var length2 = runLength[i + 1];
    runLength[i] = length1 + length2;
    if (i === stackSize - 3) {
      runStart[i + 1] = runStart[i + 2];
      runLength[i + 1] = runLength[i + 2];
    }
    stackSize--;
    var k = gallopRight(array[start2], array, start1, length1, 0, compare3);
    start1 += k;
    length1 -= k;
    if (length1 === 0) {
      return;
    }
    length2 = gallopLeft(array[start1 + length1 - 1], array, start2, length2, length2 - 1, compare3);
    if (length2 === 0) {
      return;
    }
    if (length1 <= length2) {
      mergeLow(start1, length1, start2, length2);
    } else {
      mergeHigh(start1, length1, start2, length2);
    }
  }
  function mergeLow(start1, length1, start2, length2) {
    var i = 0;
    for (i = 0; i < length1; i++) {
      tmp[i] = array[start1 + i];
    }
    var cursor1 = 0;
    var cursor2 = start2;
    var dest = start1;
    array[dest++] = array[cursor2++];
    if (--length2 === 0) {
      for (i = 0; i < length1; i++) {
        array[dest + i] = tmp[cursor1 + i];
      }
      return;
    }
    if (length1 === 1) {
      for (i = 0; i < length2; i++) {
        array[dest + i] = array[cursor2 + i];
      }
      array[dest + length2] = tmp[cursor1];
      return;
    }
    var _minGallop = minGallop;
    var count1;
    var count2;
    var exit;
    while (1) {
      count1 = 0;
      count2 = 0;
      exit = false;
      do {
        if (compare3(array[cursor2], tmp[cursor1]) < 0) {
          array[dest++] = array[cursor2++];
          count2++;
          count1 = 0;
          if (--length2 === 0) {
            exit = true;
            break;
          }
        } else {
          array[dest++] = tmp[cursor1++];
          count1++;
          count2 = 0;
          if (--length1 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < _minGallop);
      if (exit) {
        break;
      }
      do {
        count1 = gallopRight(array[cursor2], tmp, cursor1, length1, 0, compare3);
        if (count1 !== 0) {
          for (i = 0; i < count1; i++) {
            array[dest + i] = tmp[cursor1 + i];
          }
          dest += count1;
          cursor1 += count1;
          length1 -= count1;
          if (length1 <= 1) {
            exit = true;
            break;
          }
        }
        array[dest++] = array[cursor2++];
        if (--length2 === 0) {
          exit = true;
          break;
        }
        count2 = gallopLeft(tmp[cursor1], array, cursor2, length2, 0, compare3);
        if (count2 !== 0) {
          for (i = 0; i < count2; i++) {
            array[dest + i] = array[cursor2 + i];
          }
          dest += count2;
          cursor2 += count2;
          length2 -= count2;
          if (length2 === 0) {
            exit = true;
            break;
          }
        }
        array[dest++] = tmp[cursor1++];
        if (--length1 === 1) {
          exit = true;
          break;
        }
        _minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
      if (exit) {
        break;
      }
      if (_minGallop < 0) {
        _minGallop = 0;
      }
      _minGallop += 2;
    }
    minGallop = _minGallop;
    minGallop < 1 && (minGallop = 1);
    if (length1 === 1) {
      for (i = 0; i < length2; i++) {
        array[dest + i] = array[cursor2 + i];
      }
      array[dest + length2] = tmp[cursor1];
    } else if (length1 === 0) {
      throw new Error();
    } else {
      for (i = 0; i < length1; i++) {
        array[dest + i] = tmp[cursor1 + i];
      }
    }
  }
  function mergeHigh(start1, length1, start2, length2) {
    var i = 0;
    for (i = 0; i < length2; i++) {
      tmp[i] = array[start2 + i];
    }
    var cursor1 = start1 + length1 - 1;
    var cursor2 = length2 - 1;
    var dest = start2 + length2 - 1;
    var customCursor = 0;
    var customDest = 0;
    array[dest--] = array[cursor1--];
    if (--length1 === 0) {
      customCursor = dest - (length2 - 1);
      for (i = 0; i < length2; i++) {
        array[customCursor + i] = tmp[i];
      }
      return;
    }
    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;
      for (i = length1 - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i];
      }
      array[dest] = tmp[cursor2];
      return;
    }
    var _minGallop = minGallop;
    while (true) {
      var count1 = 0;
      var count2 = 0;
      var exit = false;
      do {
        if (compare3(tmp[cursor2], array[cursor1]) < 0) {
          array[dest--] = array[cursor1--];
          count1++;
          count2 = 0;
          if (--length1 === 0) {
            exit = true;
            break;
          }
        } else {
          array[dest--] = tmp[cursor2--];
          count2++;
          count1 = 0;
          if (--length2 === 1) {
            exit = true;
            break;
          }
        }
      } while ((count1 | count2) < _minGallop);
      if (exit) {
        break;
      }
      do {
        count1 = length1 - gallopRight(tmp[cursor2], array, start1, length1, length1 - 1, compare3);
        if (count1 !== 0) {
          dest -= count1;
          cursor1 -= count1;
          length1 -= count1;
          customDest = dest + 1;
          customCursor = cursor1 + 1;
          for (i = count1 - 1; i >= 0; i--) {
            array[customDest + i] = array[customCursor + i];
          }
          if (length1 === 0) {
            exit = true;
            break;
          }
        }
        array[dest--] = tmp[cursor2--];
        if (--length2 === 1) {
          exit = true;
          break;
        }
        count2 = length2 - gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare3);
        if (count2 !== 0) {
          dest -= count2;
          cursor2 -= count2;
          length2 -= count2;
          customDest = dest + 1;
          customCursor = cursor2 + 1;
          for (i = 0; i < count2; i++) {
            array[customDest + i] = tmp[customCursor + i];
          }
          if (length2 <= 1) {
            exit = true;
            break;
          }
        }
        array[dest--] = array[cursor1--];
        if (--length1 === 0) {
          exit = true;
          break;
        }
        _minGallop--;
      } while (count1 >= DEFAULT_MIN_GALLOPING || count2 >= DEFAULT_MIN_GALLOPING);
      if (exit) {
        break;
      }
      if (_minGallop < 0) {
        _minGallop = 0;
      }
      _minGallop += 2;
    }
    minGallop = _minGallop;
    if (minGallop < 1) {
      minGallop = 1;
    }
    if (length2 === 1) {
      dest -= length1;
      cursor1 -= length1;
      customDest = dest + 1;
      customCursor = cursor1 + 1;
      for (i = length1 - 1; i >= 0; i--) {
        array[customDest + i] = array[customCursor + i];
      }
      array[dest] = tmp[cursor2];
    } else if (length2 === 0) {
      throw new Error();
    } else {
      customCursor = dest - (length2 - 1);
      for (i = 0; i < length2; i++) {
        array[customCursor + i] = tmp[i];
      }
    }
  }
  return {
    mergeRuns,
    forceMergeRuns,
    pushRun
  };
}
function sort(array, compare3, lo, hi) {
  if (!lo) {
    lo = 0;
  }
  if (!hi) {
    hi = array.length;
  }
  var remaining = hi - lo;
  if (remaining < 2) {
    return;
  }
  var runLength = 0;
  if (remaining < DEFAULT_MIN_MERGE) {
    runLength = makeAscendingRun(array, lo, hi, compare3);
    binaryInsertionSort(array, lo, hi, lo + runLength, compare3);
    return;
  }
  var ts = TimSort(array, compare3);
  var minRun = minRunLength(remaining);
  do {
    runLength = makeAscendingRun(array, lo, hi, compare3);
    if (runLength < minRun) {
      var force = remaining;
      if (force > minRun) {
        force = minRun;
      }
      binaryInsertionSort(array, lo, lo + force, lo + runLength, compare3);
      runLength = force;
    }
    ts.pushRun(lo, runLength);
    ts.mergeRuns();
    remaining -= runLength;
    lo += runLength;
  } while (remaining !== 0);
  ts.forceMergeRuns();
}

// node_modules/zrender/lib/Storage.js
var invalidZErrorLogged = false;
function logInvalidZError() {
  if (invalidZErrorLogged) {
    return;
  }
  invalidZErrorLogged = true;
  console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors");
}
function shapeCompareFunc(a, b) {
  if (a.zlevel === b.zlevel) {
    if (a.z === b.z) {
      return a.z2 - b.z2;
    }
    return a.z - b.z;
  }
  return a.zlevel - b.zlevel;
}
var Storage = function() {
  function Storage2() {
    this._roots = [];
    this._displayList = [];
    this._displayListLen = 0;
    this.displayableSortFunc = shapeCompareFunc;
  }
  Storage2.prototype.traverse = function(cb, context) {
    for (var i = 0; i < this._roots.length; i++) {
      this._roots[i].traverse(cb, context);
    }
  };
  Storage2.prototype.getDisplayList = function(update, includeIgnore) {
    includeIgnore = includeIgnore || false;
    var displayList = this._displayList;
    if (update || !displayList.length) {
      this.updateDisplayList(includeIgnore);
    }
    return displayList;
  };
  Storage2.prototype.updateDisplayList = function(includeIgnore) {
    this._displayListLen = 0;
    var roots2 = this._roots;
    var displayList = this._displayList;
    for (var i = 0, len2 = roots2.length; i < len2; i++) {
      this._updateAndAddDisplayable(roots2[i], null, includeIgnore);
    }
    displayList.length = this._displayListLen;
    sort(displayList, shapeCompareFunc);
  };
  Storage2.prototype._updateAndAddDisplayable = function(el, clipPaths, includeIgnore) {
    if (el.ignore && !includeIgnore) {
      return;
    }
    el.beforeUpdate();
    el.update();
    el.afterUpdate();
    var userSetClipPath = el.getClipPath();
    if (el.ignoreClip) {
      clipPaths = null;
    } else if (userSetClipPath) {
      if (clipPaths) {
        clipPaths = clipPaths.slice();
      } else {
        clipPaths = [];
      }
      var currentClipPath = userSetClipPath;
      var parentClipPath = el;
      while (currentClipPath) {
        currentClipPath.parent = parentClipPath;
        currentClipPath.updateTransform();
        clipPaths.push(currentClipPath);
        parentClipPath = currentClipPath;
        currentClipPath = currentClipPath.getClipPath();
      }
    }
    if (el.childrenRef) {
      var children = el.childrenRef();
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (el.__dirty) {
          child.__dirty |= REDRAW_BIT;
        }
        this._updateAndAddDisplayable(child, clipPaths, includeIgnore);
      }
      el.__dirty = 0;
    } else {
      var disp = el;
      if (clipPaths && clipPaths.length) {
        disp.__clipPaths = clipPaths;
      } else if (disp.__clipPaths && disp.__clipPaths.length > 0) {
        disp.__clipPaths = [];
      }
      if (isNaN(disp.z)) {
        logInvalidZError();
        disp.z = 0;
      }
      if (isNaN(disp.z2)) {
        logInvalidZError();
        disp.z2 = 0;
      }
      if (isNaN(disp.zlevel)) {
        logInvalidZError();
        disp.zlevel = 0;
      }
      this._displayList[this._displayListLen++] = disp;
    }
    var decalEl = el.getDecalElement && el.getDecalElement();
    if (decalEl) {
      this._updateAndAddDisplayable(decalEl, clipPaths, includeIgnore);
    }
    var textGuide = el.getTextGuideLine();
    if (textGuide) {
      this._updateAndAddDisplayable(textGuide, clipPaths, includeIgnore);
    }
    var textEl = el.getTextContent();
    if (textEl) {
      this._updateAndAddDisplayable(textEl, clipPaths, includeIgnore);
    }
  };
  Storage2.prototype.addRoot = function(el) {
    if (el.__zr && el.__zr.storage === this) {
      return;
    }
    this._roots.push(el);
  };
  Storage2.prototype.delRoot = function(el) {
    if (el instanceof Array) {
      for (var i = 0, l = el.length; i < l; i++) {
        this.delRoot(el[i]);
      }
      return;
    }
    var idx = indexOf(this._roots, el);
    if (idx >= 0) {
      this._roots.splice(idx, 1);
    }
  };
  Storage2.prototype.delAllRoots = function() {
    this._roots = [];
    this._displayList = [];
    this._displayListLen = 0;
    return;
  };
  Storage2.prototype.getRoots = function() {
    return this._roots;
  };
  Storage2.prototype.dispose = function() {
    this._displayList = null;
    this._roots = null;
  };
  return Storage2;
}();
var Storage_default = Storage;

// node_modules/zrender/lib/animation/requestAnimationFrame.js
var requestAnimationFrame;
requestAnimationFrame = env_default.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(func) {
  return setTimeout(func, 16);
};
var requestAnimationFrame_default = requestAnimationFrame;

// node_modules/zrender/lib/animation/Animation.js
function getTime() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var Animation = function(_super) {
  __extends(Animation2, _super);
  function Animation2(opts) {
    var _this = _super.call(this) || this;
    _this._running = false;
    _this._time = 0;
    _this._pausedTime = 0;
    _this._pauseStart = 0;
    _this._paused = false;
    opts = opts || {};
    _this.stage = opts.stage || {};
    return _this;
  }
  Animation2.prototype.addClip = function(clip) {
    if (clip.animation) {
      this.removeClip(clip);
    }
    if (!this._head) {
      this._head = this._tail = clip;
    } else {
      this._tail.next = clip;
      clip.prev = this._tail;
      clip.next = null;
      this._tail = clip;
    }
    clip.animation = this;
  };
  Animation2.prototype.addAnimator = function(animator) {
    animator.animation = this;
    var clip = animator.getClip();
    if (clip) {
      this.addClip(clip);
    }
  };
  Animation2.prototype.removeClip = function(clip) {
    if (!clip.animation) {
      return;
    }
    var prev = clip.prev;
    var next = clip.next;
    if (prev) {
      prev.next = next;
    } else {
      this._head = next;
    }
    if (next) {
      next.prev = prev;
    } else {
      this._tail = prev;
    }
    clip.next = clip.prev = clip.animation = null;
  };
  Animation2.prototype.removeAnimator = function(animator) {
    var clip = animator.getClip();
    if (clip) {
      this.removeClip(clip);
    }
    animator.animation = null;
  };
  Animation2.prototype.update = function(notTriggerFrameAndStageUpdate) {
    var time = getTime() - this._pausedTime;
    var delta = time - this._time;
    var clip = this._head;
    while (clip) {
      var nextClip = clip.next;
      var finished = clip.step(time, delta);
      if (finished) {
        clip.ondestroy();
        this.removeClip(clip);
        clip = nextClip;
      } else {
        clip = nextClip;
      }
    }
    this._time = time;
    if (!notTriggerFrameAndStageUpdate) {
      this.trigger("frame", delta);
      this.stage.update && this.stage.update();
    }
  };
  Animation2.prototype._startLoop = function() {
    var self2 = this;
    this._running = true;
    function step() {
      if (self2._running) {
        requestAnimationFrame_default(step);
        !self2._paused && self2.update();
      }
    }
    requestAnimationFrame_default(step);
  };
  Animation2.prototype.start = function() {
    if (this._running) {
      return;
    }
    this._time = getTime();
    this._pausedTime = 0;
    this._startLoop();
  };
  Animation2.prototype.stop = function() {
    this._running = false;
  };
  Animation2.prototype.pause = function() {
    if (!this._paused) {
      this._pauseStart = getTime();
      this._paused = true;
    }
  };
  Animation2.prototype.resume = function() {
    if (this._paused) {
      this._pausedTime += getTime() - this._pauseStart;
      this._paused = false;
    }
  };
  Animation2.prototype.clear = function() {
    var clip = this._head;
    while (clip) {
      var nextClip = clip.next;
      clip.prev = clip.next = clip.animation = null;
      clip = nextClip;
    }
    this._head = this._tail = null;
  };
  Animation2.prototype.isFinished = function() {
    return this._head == null;
  };
  Animation2.prototype.animate = function(target, options) {
    options = options || {};
    this.start();
    var animator = new Animator_default(target, options.loop);
    this.addAnimator(animator);
    return animator;
  };
  return Animation2;
}(Eventful_default);
var Animation_default = Animation;

// node_modules/zrender/lib/dom/HandlerProxy.js
var TOUCH_CLICK_DELAY = 300;
var globalEventSupported = env_default.domSupported;
var localNativeListenerNames = function() {
  var mouseHandlerNames = [
    "click",
    "dblclick",
    "mousewheel",
    "wheel",
    "mouseout",
    "mouseup",
    "mousedown",
    "mousemove",
    "contextmenu"
  ];
  var touchHandlerNames = [
    "touchstart",
    "touchend",
    "touchmove"
  ];
  var pointerEventNameMap = {
    pointerdown: 1,
    pointerup: 1,
    pointermove: 1,
    pointerout: 1
  };
  var pointerHandlerNames = map(mouseHandlerNames, function(name) {
    var nm = name.replace("mouse", "pointer");
    return pointerEventNameMap.hasOwnProperty(nm) ? nm : name;
  });
  return {
    mouse: mouseHandlerNames,
    touch: touchHandlerNames,
    pointer: pointerHandlerNames
  };
}();
var globalNativeListenerNames = {
  mouse: ["mousemove", "mouseup"],
  pointer: ["pointermove", "pointerup"]
};
var wheelEventSupported = false;
function isPointerFromTouch(event) {
  var pointerType = event.pointerType;
  return pointerType === "pen" || pointerType === "touch";
}
function setTouchTimer(scope) {
  scope.touching = true;
  if (scope.touchTimer != null) {
    clearTimeout(scope.touchTimer);
    scope.touchTimer = null;
  }
  scope.touchTimer = setTimeout(function() {
    scope.touching = false;
    scope.touchTimer = null;
  }, 700);
}
function markTouch(event) {
  event && (event.zrByTouch = true);
}
function normalizeGlobalEvent(instance, event) {
  return normalizeEvent(instance.dom, new FakeGlobalEvent(instance, event), true);
}
function isLocalEl(instance, el) {
  var elTmp = el;
  var isLocal = false;
  while (elTmp && elTmp.nodeType !== 9 && !(isLocal = elTmp.domBelongToZr || elTmp !== el && elTmp === instance.painterRoot)) {
    elTmp = elTmp.parentNode;
  }
  return isLocal;
}
var FakeGlobalEvent = /* @__PURE__ */ function() {
  function FakeGlobalEvent2(instance, event) {
    this.stopPropagation = noop;
    this.stopImmediatePropagation = noop;
    this.preventDefault = noop;
    this.type = event.type;
    this.target = this.currentTarget = instance.dom;
    this.pointerType = event.pointerType;
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }
  return FakeGlobalEvent2;
}();
var localDOMHandlers = {
  mousedown: function(event) {
    event = normalizeEvent(this.dom, event);
    this.__mayPointerCapture = [event.zrX, event.zrY];
    this.trigger("mousedown", event);
  },
  mousemove: function(event) {
    event = normalizeEvent(this.dom, event);
    var downPoint = this.__mayPointerCapture;
    if (downPoint && (event.zrX !== downPoint[0] || event.zrY !== downPoint[1])) {
      this.__togglePointerCapture(true);
    }
    this.trigger("mousemove", event);
  },
  mouseup: function(event) {
    event = normalizeEvent(this.dom, event);
    this.__togglePointerCapture(false);
    this.trigger("mouseup", event);
  },
  mouseout: function(event) {
    event = normalizeEvent(this.dom, event);
    var element = event.toElement || event.relatedTarget;
    if (!isLocalEl(this, element)) {
      if (this.__pointerCapturing) {
        event.zrEventControl = "no_globalout";
      }
      this.trigger("mouseout", event);
    }
  },
  wheel: function(event) {
    wheelEventSupported = true;
    event = normalizeEvent(this.dom, event);
    this.trigger("mousewheel", event);
  },
  mousewheel: function(event) {
    if (wheelEventSupported) {
      return;
    }
    event = normalizeEvent(this.dom, event);
    this.trigger("mousewheel", event);
  },
  touchstart: function(event) {
    event = normalizeEvent(this.dom, event);
    markTouch(event);
    this.__lastTouchMoment = /* @__PURE__ */ new Date();
    this.handler.processGesture(event, "start");
    localDOMHandlers.mousemove.call(this, event);
    localDOMHandlers.mousedown.call(this, event);
  },
  touchmove: function(event) {
    event = normalizeEvent(this.dom, event);
    markTouch(event);
    this.handler.processGesture(event, "change");
    localDOMHandlers.mousemove.call(this, event);
  },
  touchend: function(event) {
    event = normalizeEvent(this.dom, event);
    markTouch(event);
    this.handler.processGesture(event, "end");
    localDOMHandlers.mouseup.call(this, event);
    if (+/* @__PURE__ */ new Date() - +this.__lastTouchMoment < TOUCH_CLICK_DELAY) {
      localDOMHandlers.click.call(this, event);
    }
  },
  pointerdown: function(event) {
    localDOMHandlers.mousedown.call(this, event);
  },
  pointermove: function(event) {
    if (!isPointerFromTouch(event)) {
      localDOMHandlers.mousemove.call(this, event);
    }
  },
  pointerup: function(event) {
    localDOMHandlers.mouseup.call(this, event);
  },
  pointerout: function(event) {
    if (!isPointerFromTouch(event)) {
      localDOMHandlers.mouseout.call(this, event);
    }
  }
};
each(["click", "dblclick", "contextmenu"], function(name) {
  localDOMHandlers[name] = function(event) {
    event = normalizeEvent(this.dom, event);
    this.trigger(name, event);
  };
});
var globalDOMHandlers = {
  pointermove: function(event) {
    if (!isPointerFromTouch(event)) {
      globalDOMHandlers.mousemove.call(this, event);
    }
  },
  pointerup: function(event) {
    globalDOMHandlers.mouseup.call(this, event);
  },
  mousemove: function(event) {
    this.trigger("mousemove", event);
  },
  mouseup: function(event) {
    var pointerCaptureReleasing = this.__pointerCapturing;
    this.__togglePointerCapture(false);
    this.trigger("mouseup", event);
    if (pointerCaptureReleasing) {
      event.zrEventControl = "only_globalout";
      this.trigger("mouseout", event);
    }
  }
};
function mountLocalDOMEventListeners(instance, scope) {
  var domHandlers = scope.domHandlers;
  if (env_default.pointerEventsSupported) {
    each(localNativeListenerNames.pointer, function(nativeEventName) {
      mountSingleDOMEventListener(scope, nativeEventName, function(event) {
        domHandlers[nativeEventName].call(instance, event);
      });
    });
  } else {
    if (env_default.touchEventsSupported) {
      each(localNativeListenerNames.touch, function(nativeEventName) {
        mountSingleDOMEventListener(scope, nativeEventName, function(event) {
          domHandlers[nativeEventName].call(instance, event);
          setTouchTimer(scope);
        });
      });
    }
    each(localNativeListenerNames.mouse, function(nativeEventName) {
      mountSingleDOMEventListener(scope, nativeEventName, function(event) {
        event = getNativeEvent(event);
        if (!scope.touching) {
          domHandlers[nativeEventName].call(instance, event);
        }
      });
    });
  }
}
function mountGlobalDOMEventListeners(instance, scope) {
  if (env_default.pointerEventsSupported) {
    each(globalNativeListenerNames.pointer, mount);
  } else if (!env_default.touchEventsSupported) {
    each(globalNativeListenerNames.mouse, mount);
  }
  function mount(nativeEventName) {
    function nativeEventListener(event) {
      event = getNativeEvent(event);
      if (!isLocalEl(instance, event.target)) {
        event = normalizeGlobalEvent(instance, event);
        scope.domHandlers[nativeEventName].call(instance, event);
      }
    }
    mountSingleDOMEventListener(scope, nativeEventName, nativeEventListener, { capture: true });
  }
}
function mountSingleDOMEventListener(scope, nativeEventName, listener, opt) {
  scope.mounted[nativeEventName] = listener;
  scope.listenerOpts[nativeEventName] = opt;
  addEventListener(scope.domTarget, nativeEventName, listener, opt);
}
function unmountDOMEventListeners(scope) {
  var mounted = scope.mounted;
  for (var nativeEventName in mounted) {
    if (mounted.hasOwnProperty(nativeEventName)) {
      removeEventListener(scope.domTarget, nativeEventName, mounted[nativeEventName], scope.listenerOpts[nativeEventName]);
    }
  }
  scope.mounted = {};
}
var DOMHandlerScope = /* @__PURE__ */ function() {
  function DOMHandlerScope2(domTarget, domHandlers) {
    this.mounted = {};
    this.listenerOpts = {};
    this.touching = false;
    this.domTarget = domTarget;
    this.domHandlers = domHandlers;
  }
  return DOMHandlerScope2;
}();
var HandlerDomProxy = function(_super) {
  __extends(HandlerDomProxy2, _super);
  function HandlerDomProxy2(dom, painterRoot) {
    var _this = _super.call(this) || this;
    _this.__pointerCapturing = false;
    _this.dom = dom;
    _this.painterRoot = painterRoot;
    _this._localHandlerScope = new DOMHandlerScope(dom, localDOMHandlers);
    if (globalEventSupported) {
      _this._globalHandlerScope = new DOMHandlerScope(document, globalDOMHandlers);
    }
    mountLocalDOMEventListeners(_this, _this._localHandlerScope);
    return _this;
  }
  HandlerDomProxy2.prototype.dispose = function() {
    unmountDOMEventListeners(this._localHandlerScope);
    if (globalEventSupported) {
      unmountDOMEventListeners(this._globalHandlerScope);
    }
  };
  HandlerDomProxy2.prototype.setCursor = function(cursorStyle) {
    this.dom.style && (this.dom.style.cursor = cursorStyle || "default");
  };
  HandlerDomProxy2.prototype.__togglePointerCapture = function(isPointerCapturing) {
    this.__mayPointerCapture = null;
    if (globalEventSupported && +this.__pointerCapturing ^ +isPointerCapturing) {
      this.__pointerCapturing = isPointerCapturing;
      var globalHandlerScope = this._globalHandlerScope;
      isPointerCapturing ? mountGlobalDOMEventListeners(this, globalHandlerScope) : unmountDOMEventListeners(globalHandlerScope);
    }
  };
  return HandlerDomProxy2;
}(Eventful_default);
var HandlerProxy_default = HandlerDomProxy;

// node_modules/zrender/lib/zrender.js
var painterCtors = {};
var instances = {};
function delInstance(id) {
  delete instances[id];
}
function isDarkMode(backgroundColor2) {
  if (!backgroundColor2) {
    return false;
  }
  if (typeof backgroundColor2 === "string") {
    return lum(backgroundColor2, 1) < DARK_MODE_THRESHOLD;
  } else if (backgroundColor2.colorStops) {
    var colorStops = backgroundColor2.colorStops;
    var totalLum = 0;
    var len2 = colorStops.length;
    for (var i = 0; i < len2; i++) {
      totalLum += lum(colorStops[i].color, 1);
    }
    totalLum /= len2;
    return totalLum < DARK_MODE_THRESHOLD;
  }
  return false;
}
var ZRender = function() {
  function ZRender2(id, dom, opts) {
    var _this = this;
    this._sleepAfterStill = 10;
    this._stillFrameAccum = 0;
    this._needsRefresh = true;
    this._needsRefreshHover = true;
    this._darkMode = false;
    opts = opts || {};
    this.dom = dom;
    this.id = id;
    var storage = new Storage_default();
    var rendererType = opts.renderer || "canvas";
    if (!painterCtors[rendererType]) {
      rendererType = keys(painterCtors)[0];
    }
    if (process.env.NODE_ENV !== "production") {
      if (!painterCtors[rendererType]) {
        throw new Error("Renderer '" + rendererType + "' is not imported. Please import it first.");
      }
    }
    opts.useDirtyRect = opts.useDirtyRect == null ? false : opts.useDirtyRect;
    var painter = new painterCtors[rendererType](dom, storage, opts, id);
    var ssrMode = opts.ssr || painter.ssrOnly;
    this.storage = storage;
    this.painter = painter;
    var handlerProxy = !env_default.node && !env_default.worker && !ssrMode ? new HandlerProxy_default(painter.getViewportRoot(), painter.root) : null;
    var useCoarsePointer = opts.useCoarsePointer;
    var usePointerSize = useCoarsePointer == null || useCoarsePointer === "auto" ? env_default.touchEventsSupported : !!useCoarsePointer;
    var defaultPointerSize = 44;
    var pointerSize;
    if (usePointerSize) {
      pointerSize = retrieve2(opts.pointerSize, defaultPointerSize);
    }
    this.handler = new Handler_default(storage, painter, handlerProxy, painter.root, pointerSize);
    this.animation = new Animation_default({
      stage: {
        update: ssrMode ? null : function() {
          return _this._flush(true);
        }
      }
    });
    if (!ssrMode) {
      this.animation.start();
    }
  }
  ZRender2.prototype.add = function(el) {
    if (this._disposed || !el) {
      return;
    }
    this.storage.addRoot(el);
    el.addSelfToZr(this);
    this.refresh();
  };
  ZRender2.prototype.remove = function(el) {
    if (this._disposed || !el) {
      return;
    }
    this.storage.delRoot(el);
    el.removeSelfFromZr(this);
    this.refresh();
  };
  ZRender2.prototype.configLayer = function(zLevel, config) {
    if (this._disposed) {
      return;
    }
    if (this.painter.configLayer) {
      this.painter.configLayer(zLevel, config);
    }
    this.refresh();
  };
  ZRender2.prototype.setBackgroundColor = function(backgroundColor2) {
    if (this._disposed) {
      return;
    }
    if (this.painter.setBackgroundColor) {
      this.painter.setBackgroundColor(backgroundColor2);
    }
    this.refresh();
    this._backgroundColor = backgroundColor2;
    this._darkMode = isDarkMode(backgroundColor2);
  };
  ZRender2.prototype.getBackgroundColor = function() {
    return this._backgroundColor;
  };
  ZRender2.prototype.setDarkMode = function(darkMode) {
    this._darkMode = darkMode;
  };
  ZRender2.prototype.isDarkMode = function() {
    return this._darkMode;
  };
  ZRender2.prototype.refreshImmediately = function(fromInside) {
    if (this._disposed) {
      return;
    }
    if (!fromInside) {
      this.animation.update(true);
    }
    this._needsRefresh = false;
    this.painter.refresh();
    this._needsRefresh = false;
  };
  ZRender2.prototype.refresh = function() {
    if (this._disposed) {
      return;
    }
    this._needsRefresh = true;
    this.animation.start();
  };
  ZRender2.prototype.flush = function() {
    if (this._disposed) {
      return;
    }
    this._flush(false);
  };
  ZRender2.prototype._flush = function(fromInside) {
    var triggerRendered;
    var start2 = getTime();
    if (this._needsRefresh) {
      triggerRendered = true;
      this.refreshImmediately(fromInside);
    }
    if (this._needsRefreshHover) {
      triggerRendered = true;
      this.refreshHoverImmediately();
    }
    var end2 = getTime();
    if (triggerRendered) {
      this._stillFrameAccum = 0;
      this.trigger("rendered", {
        elapsedTime: end2 - start2
      });
    } else if (this._sleepAfterStill > 0) {
      this._stillFrameAccum++;
      if (this._stillFrameAccum > this._sleepAfterStill) {
        this.animation.stop();
      }
    }
  };
  ZRender2.prototype.setSleepAfterStill = function(stillFramesCount) {
    this._sleepAfterStill = stillFramesCount;
  };
  ZRender2.prototype.wakeUp = function() {
    if (this._disposed) {
      return;
    }
    this.animation.start();
    this._stillFrameAccum = 0;
  };
  ZRender2.prototype.refreshHover = function() {
    this._needsRefreshHover = true;
  };
  ZRender2.prototype.refreshHoverImmediately = function() {
    if (this._disposed) {
      return;
    }
    this._needsRefreshHover = false;
    if (this.painter.refreshHover && this.painter.getType() === "canvas") {
      this.painter.refreshHover();
    }
  };
  ZRender2.prototype.resize = function(opts) {
    if (this._disposed) {
      return;
    }
    opts = opts || {};
    this.painter.resize(opts.width, opts.height);
    this.handler.resize();
  };
  ZRender2.prototype.clearAnimation = function() {
    if (this._disposed) {
      return;
    }
    this.animation.clear();
  };
  ZRender2.prototype.getWidth = function() {
    if (this._disposed) {
      return;
    }
    return this.painter.getWidth();
  };
  ZRender2.prototype.getHeight = function() {
    if (this._disposed) {
      return;
    }
    return this.painter.getHeight();
  };
  ZRender2.prototype.setCursorStyle = function(cursorStyle) {
    if (this._disposed) {
      return;
    }
    this.handler.setCursorStyle(cursorStyle);
  };
  ZRender2.prototype.findHover = function(x, y) {
    if (this._disposed) {
      return;
    }
    return this.handler.findHover(x, y);
  };
  ZRender2.prototype.on = function(eventName, eventHandler, context) {
    if (!this._disposed) {
      this.handler.on(eventName, eventHandler, context);
    }
    return this;
  };
  ZRender2.prototype.off = function(eventName, eventHandler) {
    if (this._disposed) {
      return;
    }
    this.handler.off(eventName, eventHandler);
  };
  ZRender2.prototype.trigger = function(eventName, event) {
    if (this._disposed) {
      return;
    }
    this.handler.trigger(eventName, event);
  };
  ZRender2.prototype.clear = function() {
    if (this._disposed) {
      return;
    }
    var roots2 = this.storage.getRoots();
    for (var i = 0; i < roots2.length; i++) {
      if (roots2[i] instanceof Group_default) {
        roots2[i].removeSelfFromZr(this);
      }
    }
    this.storage.delAllRoots();
    this.painter.clear();
  };
  ZRender2.prototype.dispose = function() {
    if (this._disposed) {
      return;
    }
    this.animation.stop();
    this.clear();
    this.storage.dispose();
    this.painter.dispose();
    this.handler.dispose();
    this.animation = this.storage = this.painter = this.handler = null;
    this._disposed = true;
    delInstance(this.id);
  };
  return ZRender2;
}();
function init(dom, opts) {
  var zr = new ZRender(guid(), dom, opts);
  instances[zr.id] = zr;
  return zr;
}
function registerPainter(name, Ctor) {
  painterCtors[name] = Ctor;
}
var ssrDataGetter;
function getElementSSRData(el) {
  if (typeof ssrDataGetter === "function") {
    return ssrDataGetter(el);
  }
}
function registerSSRDataGetter(getter) {
  ssrDataGetter = getter;
}

// node_modules/echarts/lib/model/globalDefault.js
var platform = "";
if (typeof navigator !== "undefined") {
  platform = navigator.platform || "";
}
var decalColor = "rgba(0, 0, 0, 0.2)";
var globalDefault_default = {
  darkMode: "auto",
  // backgroundColor: 'rgba(0,0,0,0)',
  colorBy: "series",
  color: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc"],
  gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
  aria: {
    decal: {
      decals: [{
        color: decalColor,
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        symbolSize: 1,
        rotation: Math.PI / 6
      }, {
        color: decalColor,
        symbol: "circle",
        dashArrayX: [[8, 8], [0, 8, 8, 0]],
        dashArrayY: [6, 0],
        symbolSize: 0.8
      }, {
        color: decalColor,
        dashArrayX: [1, 0],
        dashArrayY: [4, 3],
        rotation: -Math.PI / 4
      }, {
        color: decalColor,
        dashArrayX: [[6, 6], [0, 6, 6, 0]],
        dashArrayY: [6, 0]
      }, {
        color: decalColor,
        dashArrayX: [[1, 0], [1, 6]],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }, {
        color: decalColor,
        symbol: "triangle",
        dashArrayX: [[9, 9], [0, 9, 9, 0]],
        dashArrayY: [7, 2],
        symbolSize: 0.75
      }]
    }
  },
  // If xAxis and yAxis declared, grid is created by default.
  // grid: {},
  textStyle: {
    // color: '#000',
    // decoration: 'none',
    // PENDING
    fontFamily: platform.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
    // fontFamily: 'Arial, Verdana, sans-serif',
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal"
  },
  // http://blogs.adobe.com/webplatform/2014/02/24/using-blend-modes-in-html-canvas/
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
  // Default is source-over
  blendMode: null,
  stateAnimation: {
    duration: 300,
    easing: "cubicOut"
  },
  animation: "auto",
  animationDuration: 1e3,
  animationDurationUpdate: 500,
  animationEasing: "cubicInOut",
  animationEasingUpdate: "cubicInOut",
  animationThreshold: 2e3,
  // Configuration for progressive/incremental rendering
  progressiveThreshold: 3e3,
  progressive: 400,
  // Threshold of if use single hover layer to optimize.
  // It is recommended that `hoverLayerThreshold` is equivalent to or less than
  // `progressiveThreshold`, otherwise hover will cause restart of progressive,
  // which is unexpected.
  // see example <echarts/test/heatmap-large.html>.
  hoverLayerThreshold: 3e3,
  // See: module:echarts/scale/Time
  useUTC: false
};

// node_modules/echarts/lib/model/internalComponentCreator.js
var internalOptionCreatorMap = createHashMap();
function concatInternalOptions(ecModel, mainType, newCmptOptionList) {
  var internalOptionCreator = internalOptionCreatorMap.get(mainType);
  if (!internalOptionCreator) {
    return newCmptOptionList;
  }
  var internalOptions = internalOptionCreator(ecModel);
  if (!internalOptions) {
    return newCmptOptionList;
  }
  if (process.env.NODE_ENV !== "production") {
    for (var i = 0; i < internalOptions.length; i++) {
      assert(isComponentIdInternal(internalOptions[i]));
    }
  }
  return newCmptOptionList.concat(internalOptions);
}

// node_modules/echarts/lib/model/Global.js
var reCreateSeriesIndices;
var assertSeriesInitialized;
var initBase;
var OPTION_INNER_KEY = "\0_ec_inner";
var OPTION_INNER_VALUE = 1;
var BUITIN_COMPONENTS_MAP = {
  grid: "GridComponent",
  polar: "PolarComponent",
  geo: "GeoComponent",
  singleAxis: "SingleAxisComponent",
  parallel: "ParallelComponent",
  calendar: "CalendarComponent",
  graphic: "GraphicComponent",
  toolbox: "ToolboxComponent",
  tooltip: "TooltipComponent",
  axisPointer: "AxisPointerComponent",
  brush: "BrushComponent",
  title: "TitleComponent",
  timeline: "TimelineComponent",
  markPoint: "MarkPointComponent",
  markLine: "MarkLineComponent",
  markArea: "MarkAreaComponent",
  legend: "LegendComponent",
  dataZoom: "DataZoomComponent",
  visualMap: "VisualMapComponent",
  // aria: 'AriaComponent',
  // dataset: 'DatasetComponent',
  // Dependencies
  xAxis: "GridComponent",
  yAxis: "GridComponent",
  angleAxis: "PolarComponent",
  radiusAxis: "PolarComponent"
};
var BUILTIN_CHARTS_MAP = {
  line: "LineChart",
  bar: "BarChart",
  pie: "PieChart",
  scatter: "ScatterChart",
  radar: "RadarChart",
  map: "MapChart",
  tree: "TreeChart",
  treemap: "TreemapChart",
  graph: "GraphChart",
  gauge: "GaugeChart",
  funnel: "FunnelChart",
  parallel: "ParallelChart",
  sankey: "SankeyChart",
  boxplot: "BoxplotChart",
  candlestick: "CandlestickChart",
  effectScatter: "EffectScatterChart",
  lines: "LinesChart",
  heatmap: "HeatmapChart",
  pictorialBar: "PictorialBarChart",
  themeRiver: "ThemeRiverChart",
  sunburst: "SunburstChart",
  custom: "CustomChart"
};
var componetsMissingLogPrinted = {};
function checkMissingComponents(option) {
  each(option, function(componentOption, mainType) {
    if (!Component_default.hasClass(mainType)) {
      var componentImportName = BUITIN_COMPONENTS_MAP[mainType];
      if (componentImportName && !componetsMissingLogPrinted[componentImportName]) {
        error("Component " + mainType + " is used but not imported.\nimport { " + componentImportName + " } from 'echarts/components';\necharts.use([" + componentImportName + "]);");
        componetsMissingLogPrinted[componentImportName] = true;
      }
    }
  });
}
var GlobalModel = (
  /** @class */
  function(_super) {
    __extends(GlobalModel2, _super);
    function GlobalModel2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalModel2.prototype.init = function(option, parentModel, ecModel, theme2, locale, optionManager) {
      theme2 = theme2 || {};
      this.option = null;
      this._theme = new Model_default(theme2);
      this._locale = new Model_default(locale);
      this._optionManager = optionManager;
    };
    GlobalModel2.prototype.setOption = function(option, opts, optionPreprocessorFuncs2) {
      if (process.env.NODE_ENV !== "production") {
        assert(option != null, "option is null/undefined");
        assert(option[OPTION_INNER_KEY] !== OPTION_INNER_VALUE, "please use chart.getOption()");
      }
      var innerOpt = normalizeSetOptionInput(opts);
      this._optionManager.setOption(option, optionPreprocessorFuncs2, innerOpt);
      this._resetOption(null, innerOpt);
    };
    GlobalModel2.prototype.resetOption = function(type, opt) {
      return this._resetOption(type, normalizeSetOptionInput(opt));
    };
    GlobalModel2.prototype._resetOption = function(type, opt) {
      var optionChanged = false;
      var optionManager = this._optionManager;
      if (!type || type === "recreate") {
        var baseOption = optionManager.mountOption(type === "recreate");
        if (process.env.NODE_ENV !== "production") {
          checkMissingComponents(baseOption);
        }
        if (!this.option || type === "recreate") {
          initBase(this, baseOption);
        } else {
          this.restoreData();
          this._mergeOption(baseOption, opt);
        }
        optionChanged = true;
      }
      if (type === "timeline" || type === "media") {
        this.restoreData();
      }
      if (!type || type === "recreate" || type === "timeline") {
        var timelineOption = optionManager.getTimelineOption(this);
        if (timelineOption) {
          optionChanged = true;
          this._mergeOption(timelineOption, opt);
        }
      }
      if (!type || type === "recreate" || type === "media") {
        var mediaOptions = optionManager.getMediaOption(this);
        if (mediaOptions.length) {
          each(mediaOptions, function(mediaOption) {
            optionChanged = true;
            this._mergeOption(mediaOption, opt);
          }, this);
        }
      }
      return optionChanged;
    };
    GlobalModel2.prototype.mergeOption = function(option) {
      this._mergeOption(option, null);
    };
    GlobalModel2.prototype._mergeOption = function(newOption, opt) {
      var option = this.option;
      var componentsMap = this._componentsMap;
      var componentsCount = this._componentsCount;
      var newCmptTypes = [];
      var newCmptTypeMap = createHashMap();
      var replaceMergeMainTypeMap = opt && opt.replaceMergeMainTypeMap;
      resetSourceDefaulter(this);
      each(newOption, function(componentOption, mainType) {
        if (componentOption == null) {
          return;
        }
        if (!Component_default.hasClass(mainType)) {
          option[mainType] = option[mainType] == null ? clone(componentOption) : merge(option[mainType], componentOption, true);
        } else if (mainType) {
          newCmptTypes.push(mainType);
          newCmptTypeMap.set(mainType, true);
        }
      });
      if (replaceMergeMainTypeMap) {
        replaceMergeMainTypeMap.each(function(val, mainTypeInReplaceMerge) {
          if (Component_default.hasClass(mainTypeInReplaceMerge) && !newCmptTypeMap.get(mainTypeInReplaceMerge)) {
            newCmptTypes.push(mainTypeInReplaceMerge);
            newCmptTypeMap.set(mainTypeInReplaceMerge, true);
          }
        });
      }
      Component_default.topologicalTravel(newCmptTypes, Component_default.getAllClassMainTypes(), visitComponent, this);
      function visitComponent(mainType) {
        var newCmptOptionList = concatInternalOptions(this, mainType, normalizeToArray(newOption[mainType]));
        var oldCmptList = componentsMap.get(mainType);
        var mergeMode = (
          // `!oldCmptList` means init. See the comment in `mappingToExists`
          !oldCmptList ? "replaceAll" : replaceMergeMainTypeMap && replaceMergeMainTypeMap.get(mainType) ? "replaceMerge" : "normalMerge"
        );
        var mappingResult = mappingToExists(oldCmptList, newCmptOptionList, mergeMode);
        setComponentTypeToKeyInfo(mappingResult, mainType, Component_default);
        option[mainType] = null;
        componentsMap.set(mainType, null);
        componentsCount.set(mainType, 0);
        var optionsByMainType = [];
        var cmptsByMainType = [];
        var cmptsCountByMainType = 0;
        var tooltipExists;
        var tooltipWarningLogged;
        each(mappingResult, function(resultItem, index) {
          var componentModel = resultItem.existing;
          var newCmptOption = resultItem.newOption;
          if (!newCmptOption) {
            if (componentModel) {
              componentModel.mergeOption({}, this);
              componentModel.optionUpdated({}, false);
            }
          } else {
            var isSeriesType = mainType === "series";
            var ComponentModelClass = Component_default.getClass(
              mainType,
              resultItem.keyInfo.subType,
              !isSeriesType
              // Give a more detailed warn later if series don't exists
            );
            if (!ComponentModelClass) {
              if (process.env.NODE_ENV !== "production") {
                var subType = resultItem.keyInfo.subType;
                var seriesImportName = BUILTIN_CHARTS_MAP[subType];
                if (!componetsMissingLogPrinted[subType]) {
                  componetsMissingLogPrinted[subType] = true;
                  if (seriesImportName) {
                    error("Series " + subType + " is used but not imported.\nimport { " + seriesImportName + " } from 'echarts/charts';\necharts.use([" + seriesImportName + "]);");
                  } else {
                    error("Unknown series " + subType);
                  }
                }
              }
              return;
            }
            if (mainType === "tooltip") {
              if (tooltipExists) {
                if (process.env.NODE_ENV !== "production") {
                  if (!tooltipWarningLogged) {
                    warn("Currently only one tooltip component is allowed.");
                    tooltipWarningLogged = true;
                  }
                }
                return;
              }
              tooltipExists = true;
            }
            if (componentModel && componentModel.constructor === ComponentModelClass) {
              componentModel.name = resultItem.keyInfo.name;
              componentModel.mergeOption(newCmptOption, this);
              componentModel.optionUpdated(newCmptOption, false);
            } else {
              var extraOpt = extend({
                componentIndex: index
              }, resultItem.keyInfo);
              componentModel = new ComponentModelClass(newCmptOption, this, this, extraOpt);
              extend(componentModel, extraOpt);
              if (resultItem.brandNew) {
                componentModel.__requireNewView = true;
              }
              componentModel.init(newCmptOption, this, this);
              componentModel.optionUpdated(null, true);
            }
          }
          if (componentModel) {
            optionsByMainType.push(componentModel.option);
            cmptsByMainType.push(componentModel);
            cmptsCountByMainType++;
          } else {
            optionsByMainType.push(void 0);
            cmptsByMainType.push(void 0);
          }
        }, this);
        option[mainType] = optionsByMainType;
        componentsMap.set(mainType, cmptsByMainType);
        componentsCount.set(mainType, cmptsCountByMainType);
        if (mainType === "series") {
          reCreateSeriesIndices(this);
        }
      }
      if (!this._seriesIndices) {
        reCreateSeriesIndices(this);
      }
    };
    GlobalModel2.prototype.getOption = function() {
      var option = clone(this.option);
      each(option, function(optInMainType, mainType) {
        if (Component_default.hasClass(mainType)) {
          var opts = normalizeToArray(optInMainType);
          var realLen = opts.length;
          var metNonInner = false;
          for (var i = realLen - 1; i >= 0; i--) {
            if (opts[i] && !isComponentIdInternal(opts[i])) {
              metNonInner = true;
            } else {
              opts[i] = null;
              !metNonInner && realLen--;
            }
          }
          opts.length = realLen;
          option[mainType] = opts;
        }
      });
      delete option[OPTION_INNER_KEY];
      return option;
    };
    GlobalModel2.prototype.getTheme = function() {
      return this._theme;
    };
    GlobalModel2.prototype.getLocaleModel = function() {
      return this._locale;
    };
    GlobalModel2.prototype.setUpdatePayload = function(payload) {
      this._payload = payload;
    };
    GlobalModel2.prototype.getUpdatePayload = function() {
      return this._payload;
    };
    GlobalModel2.prototype.getComponent = function(mainType, idx) {
      var list = this._componentsMap.get(mainType);
      if (list) {
        var cmpt = list[idx || 0];
        if (cmpt) {
          return cmpt;
        } else if (idx == null) {
          for (var i = 0; i < list.length; i++) {
            if (list[i]) {
              return list[i];
            }
          }
        }
      }
    };
    GlobalModel2.prototype.queryComponents = function(condition) {
      var mainType = condition.mainType;
      if (!mainType) {
        return [];
      }
      var index = condition.index;
      var id = condition.id;
      var name = condition.name;
      var cmpts = this._componentsMap.get(mainType);
      if (!cmpts || !cmpts.length) {
        return [];
      }
      var result;
      if (index != null) {
        result = [];
        each(normalizeToArray(index), function(idx) {
          cmpts[idx] && result.push(cmpts[idx]);
        });
      } else if (id != null) {
        result = queryByIdOrName("id", id, cmpts);
      } else if (name != null) {
        result = queryByIdOrName("name", name, cmpts);
      } else {
        result = filter(cmpts, function(cmpt) {
          return !!cmpt;
        });
      }
      return filterBySubType(result, condition);
    };
    GlobalModel2.prototype.findComponents = function(condition) {
      var query = condition.query;
      var mainType = condition.mainType;
      var queryCond = getQueryCond(query);
      var result = queryCond ? this.queryComponents(queryCond) : filter(this._componentsMap.get(mainType), function(cmpt) {
        return !!cmpt;
      });
      return doFilter(filterBySubType(result, condition));
      function getQueryCond(q) {
        var indexAttr = mainType + "Index";
        var idAttr = mainType + "Id";
        var nameAttr = mainType + "Name";
        return q && (q[indexAttr] != null || q[idAttr] != null || q[nameAttr] != null) ? {
          mainType,
          // subType will be filtered finally.
          index: q[indexAttr],
          id: q[idAttr],
          name: q[nameAttr]
        } : null;
      }
      function doFilter(res) {
        return condition.filter ? filter(res, condition.filter) : res;
      }
    };
    GlobalModel2.prototype.eachComponent = function(mainType, cb, context) {
      var componentsMap = this._componentsMap;
      if (isFunction(mainType)) {
        var ctxForAll_1 = cb;
        var cbForAll_1 = mainType;
        componentsMap.each(function(cmpts2, componentType) {
          for (var i2 = 0; cmpts2 && i2 < cmpts2.length; i2++) {
            var cmpt2 = cmpts2[i2];
            cmpt2 && cbForAll_1.call(ctxForAll_1, componentType, cmpt2, cmpt2.componentIndex);
          }
        });
      } else {
        var cmpts = isString(mainType) ? componentsMap.get(mainType) : isObject(mainType) ? this.findComponents(mainType) : null;
        for (var i = 0; cmpts && i < cmpts.length; i++) {
          var cmpt = cmpts[i];
          cmpt && cb.call(context, cmpt, cmpt.componentIndex);
        }
      }
    };
    GlobalModel2.prototype.getSeriesByName = function(name) {
      var nameStr = convertOptionIdName(name, null);
      return filter(this._componentsMap.get("series"), function(oneSeries) {
        return !!oneSeries && nameStr != null && oneSeries.name === nameStr;
      });
    };
    GlobalModel2.prototype.getSeriesByIndex = function(seriesIndex) {
      return this._componentsMap.get("series")[seriesIndex];
    };
    GlobalModel2.prototype.getSeriesByType = function(subType) {
      return filter(this._componentsMap.get("series"), function(oneSeries) {
        return !!oneSeries && oneSeries.subType === subType;
      });
    };
    GlobalModel2.prototype.getSeries = function() {
      return filter(this._componentsMap.get("series"), function(oneSeries) {
        return !!oneSeries;
      });
    };
    GlobalModel2.prototype.getSeriesCount = function() {
      return this._componentsCount.get("series");
    };
    GlobalModel2.prototype.eachSeries = function(cb, context) {
      assertSeriesInitialized(this);
      each(this._seriesIndices, function(rawSeriesIndex) {
        var series = this._componentsMap.get("series")[rawSeriesIndex];
        cb.call(context, series, rawSeriesIndex);
      }, this);
    };
    GlobalModel2.prototype.eachRawSeries = function(cb, context) {
      each(this._componentsMap.get("series"), function(series) {
        series && cb.call(context, series, series.componentIndex);
      });
    };
    GlobalModel2.prototype.eachSeriesByType = function(subType, cb, context) {
      assertSeriesInitialized(this);
      each(this._seriesIndices, function(rawSeriesIndex) {
        var series = this._componentsMap.get("series")[rawSeriesIndex];
        if (series.subType === subType) {
          cb.call(context, series, rawSeriesIndex);
        }
      }, this);
    };
    GlobalModel2.prototype.eachRawSeriesByType = function(subType, cb, context) {
      return each(this.getSeriesByType(subType), cb, context);
    };
    GlobalModel2.prototype.isSeriesFiltered = function(seriesModel) {
      assertSeriesInitialized(this);
      return this._seriesIndicesMap.get(seriesModel.componentIndex) == null;
    };
    GlobalModel2.prototype.getCurrentSeriesIndices = function() {
      return (this._seriesIndices || []).slice();
    };
    GlobalModel2.prototype.filterSeries = function(cb, context) {
      assertSeriesInitialized(this);
      var newSeriesIndices = [];
      each(this._seriesIndices, function(seriesRawIdx) {
        var series = this._componentsMap.get("series")[seriesRawIdx];
        cb.call(context, series, seriesRawIdx) && newSeriesIndices.push(seriesRawIdx);
      }, this);
      this._seriesIndices = newSeriesIndices;
      this._seriesIndicesMap = createHashMap(newSeriesIndices);
    };
    GlobalModel2.prototype.restoreData = function(payload) {
      reCreateSeriesIndices(this);
      var componentsMap = this._componentsMap;
      var componentTypes = [];
      componentsMap.each(function(components, componentType) {
        if (Component_default.hasClass(componentType)) {
          componentTypes.push(componentType);
        }
      });
      Component_default.topologicalTravel(componentTypes, Component_default.getAllClassMainTypes(), function(componentType) {
        each(componentsMap.get(componentType), function(component) {
          if (component && (componentType !== "series" || !isNotTargetSeries(component, payload))) {
            component.restoreData();
          }
        });
      });
    };
    GlobalModel2.internalField = function() {
      reCreateSeriesIndices = function(ecModel) {
        var seriesIndices = ecModel._seriesIndices = [];
        each(ecModel._componentsMap.get("series"), function(series) {
          series && seriesIndices.push(series.componentIndex);
        });
        ecModel._seriesIndicesMap = createHashMap(seriesIndices);
      };
      assertSeriesInitialized = function(ecModel) {
        if (process.env.NODE_ENV !== "production") {
          if (!ecModel._seriesIndices) {
            throw new Error("Option should contains series.");
          }
        }
      };
      initBase = function(ecModel, baseOption) {
        ecModel.option = {};
        ecModel.option[OPTION_INNER_KEY] = OPTION_INNER_VALUE;
        ecModel._componentsMap = createHashMap({
          series: []
        });
        ecModel._componentsCount = createHashMap();
        var airaOption = baseOption.aria;
        if (isObject(airaOption) && airaOption.enabled == null) {
          airaOption.enabled = true;
        }
        mergeTheme(baseOption, ecModel._theme.option);
        merge(baseOption, globalDefault_default, false);
        ecModel._mergeOption(baseOption, null);
      };
    }();
    return GlobalModel2;
  }(Model_default)
);
function isNotTargetSeries(seriesModel, payload) {
  if (payload) {
    var index = payload.seriesIndex;
    var id = payload.seriesId;
    var name_1 = payload.seriesName;
    return index != null && seriesModel.componentIndex !== index || id != null && seriesModel.id !== id || name_1 != null && seriesModel.name !== name_1;
  }
}
function mergeTheme(option, theme2) {
  var notMergeColorLayer = option.color && !option.colorLayer;
  each(theme2, function(themeItem, name) {
    if (name === "colorLayer" && notMergeColorLayer) {
      return;
    }
    if (!Component_default.hasClass(name)) {
      if (typeof themeItem === "object") {
        option[name] = !option[name] ? clone(themeItem) : merge(option[name], themeItem, false);
      } else {
        if (option[name] == null) {
          option[name] = themeItem;
        }
      }
    }
  });
}
function queryByIdOrName(attr, idOrName, cmpts) {
  if (isArray(idOrName)) {
    var keyMap_1 = createHashMap();
    each(idOrName, function(idOrNameItem) {
      if (idOrNameItem != null) {
        var idName = convertOptionIdName(idOrNameItem, null);
        idName != null && keyMap_1.set(idOrNameItem, true);
      }
    });
    return filter(cmpts, function(cmpt) {
      return cmpt && keyMap_1.get(cmpt[attr]);
    });
  } else {
    var idName_1 = convertOptionIdName(idOrName, null);
    return filter(cmpts, function(cmpt) {
      return cmpt && idName_1 != null && cmpt[attr] === idName_1;
    });
  }
}
function filterBySubType(components, condition) {
  return condition.hasOwnProperty("subType") ? filter(components, function(cmpt) {
    return cmpt && cmpt.subType === condition.subType;
  }) : components;
}
function normalizeSetOptionInput(opts) {
  var replaceMergeMainTypeMap = createHashMap();
  opts && each(normalizeToArray(opts.replaceMerge), function(mainType) {
    if (process.env.NODE_ENV !== "production") {
      assert(Component_default.hasClass(mainType), '"' + mainType + '" is not valid component main type in "replaceMerge"');
    }
    replaceMergeMainTypeMap.set(mainType, true);
  });
  return {
    replaceMergeMainTypeMap
  };
}
mixin(GlobalModel, PaletteMixin);
var Global_default = GlobalModel;

// node_modules/echarts/lib/core/ExtensionAPI.js
var availableMethods = [
  "getDom",
  "getZr",
  "getWidth",
  "getHeight",
  "getDevicePixelRatio",
  "dispatchAction",
  "isSSR",
  "isDisposed",
  "on",
  "off",
  "getDataURL",
  "getConnectedDataURL",
  // 'getModel',
  "getOption",
  // 'getViewOfComponentModel',
  // 'getViewOfSeriesModel',
  "getId",
  "updateLabelLayout"
];
var ExtensionAPI = (
  /** @class */
  /* @__PURE__ */ function() {
    function ExtensionAPI2(ecInstance) {
      each(availableMethods, function(methodName) {
        this[methodName] = bind(ecInstance[methodName], ecInstance);
      }, this);
    }
    return ExtensionAPI2;
  }()
);
var ExtensionAPI_default = ExtensionAPI;

// node_modules/echarts/lib/model/OptionManager.js
var QUERY_REG = /^(min|max)?(.+)$/;
var OptionManager = (
  /** @class */
  function() {
    function OptionManager2(api) {
      this._timelineOptions = [];
      this._mediaList = [];
      this._currentMediaIndices = [];
      this._api = api;
    }
    OptionManager2.prototype.setOption = function(rawOption, optionPreprocessorFuncs2, opt) {
      if (rawOption) {
        each(normalizeToArray(rawOption.series), function(series) {
          series && series.data && isTypedArray(series.data) && setAsPrimitive(series.data);
        });
        each(normalizeToArray(rawOption.dataset), function(dataset) {
          dataset && dataset.source && isTypedArray(dataset.source) && setAsPrimitive(dataset.source);
        });
      }
      rawOption = clone(rawOption);
      var optionBackup = this._optionBackup;
      var newParsedOption = parseRawOption(rawOption, optionPreprocessorFuncs2, !optionBackup);
      this._newBaseOption = newParsedOption.baseOption;
      if (optionBackup) {
        if (newParsedOption.timelineOptions.length) {
          optionBackup.timelineOptions = newParsedOption.timelineOptions;
        }
        if (newParsedOption.mediaList.length) {
          optionBackup.mediaList = newParsedOption.mediaList;
        }
        if (newParsedOption.mediaDefault) {
          optionBackup.mediaDefault = newParsedOption.mediaDefault;
        }
      } else {
        this._optionBackup = newParsedOption;
      }
    };
    OptionManager2.prototype.mountOption = function(isRecreate) {
      var optionBackup = this._optionBackup;
      this._timelineOptions = optionBackup.timelineOptions;
      this._mediaList = optionBackup.mediaList;
      this._mediaDefault = optionBackup.mediaDefault;
      this._currentMediaIndices = [];
      return clone(isRecreate ? optionBackup.baseOption : this._newBaseOption);
    };
    OptionManager2.prototype.getTimelineOption = function(ecModel) {
      var option;
      var timelineOptions = this._timelineOptions;
      if (timelineOptions.length) {
        var timelineModel = ecModel.getComponent("timeline");
        if (timelineModel) {
          option = clone(
            // FIXME:TS as TimelineModel or quivlant interface
            timelineOptions[timelineModel.getCurrentIndex()]
          );
        }
      }
      return option;
    };
    OptionManager2.prototype.getMediaOption = function(ecModel) {
      var ecWidth = this._api.getWidth();
      var ecHeight = this._api.getHeight();
      var mediaList = this._mediaList;
      var mediaDefault = this._mediaDefault;
      var indices = [];
      var result = [];
      if (!mediaList.length && !mediaDefault) {
        return result;
      }
      for (var i = 0, len2 = mediaList.length; i < len2; i++) {
        if (applyMediaQuery(mediaList[i].query, ecWidth, ecHeight)) {
          indices.push(i);
        }
      }
      if (!indices.length && mediaDefault) {
        indices = [-1];
      }
      if (indices.length && !indicesEquals(indices, this._currentMediaIndices)) {
        result = map(indices, function(index) {
          return clone(index === -1 ? mediaDefault.option : mediaList[index].option);
        });
      }
      this._currentMediaIndices = indices;
      return result;
    };
    return OptionManager2;
  }()
);
function parseRawOption(rawOption, optionPreprocessorFuncs2, isNew) {
  var mediaList = [];
  var mediaDefault;
  var baseOption;
  var declaredBaseOption = rawOption.baseOption;
  var timelineOnRoot = rawOption.timeline;
  var timelineOptionsOnRoot = rawOption.options;
  var mediaOnRoot = rawOption.media;
  var hasMedia = !!rawOption.media;
  var hasTimeline = !!(timelineOptionsOnRoot || timelineOnRoot || declaredBaseOption && declaredBaseOption.timeline);
  if (declaredBaseOption) {
    baseOption = declaredBaseOption;
    if (!baseOption.timeline) {
      baseOption.timeline = timelineOnRoot;
    }
  } else {
    if (hasTimeline || hasMedia) {
      rawOption.options = rawOption.media = null;
    }
    baseOption = rawOption;
  }
  if (hasMedia) {
    if (isArray(mediaOnRoot)) {
      each(mediaOnRoot, function(singleMedia) {
        if (process.env.NODE_ENV !== "production") {
          if (singleMedia && !singleMedia.option && isObject(singleMedia.query) && isObject(singleMedia.query.option)) {
            error("Illegal media option. Must be like { media: [ { query: {}, option: {} } ] }");
          }
        }
        if (singleMedia && singleMedia.option) {
          if (singleMedia.query) {
            mediaList.push(singleMedia);
          } else if (!mediaDefault) {
            mediaDefault = singleMedia;
          }
        }
      });
    } else {
      if (process.env.NODE_ENV !== "production") {
        error("Illegal media option. Must be an array. Like { media: [ {...}, {...} ] }");
      }
    }
  }
  doPreprocess(baseOption);
  each(timelineOptionsOnRoot, function(option) {
    return doPreprocess(option);
  });
  each(mediaList, function(media) {
    return doPreprocess(media.option);
  });
  function doPreprocess(option) {
    each(optionPreprocessorFuncs2, function(preProcess) {
      preProcess(option, isNew);
    });
  }
  return {
    baseOption,
    timelineOptions: timelineOptionsOnRoot || [],
    mediaDefault,
    mediaList
  };
}
function applyMediaQuery(query, ecWidth, ecHeight) {
  var realMap = {
    width: ecWidth,
    height: ecHeight,
    aspectratio: ecWidth / ecHeight
    // lower case for convenience.
  };
  var applicable = true;
  each(query, function(value, attr) {
    var matched = attr.match(QUERY_REG);
    if (!matched || !matched[1] || !matched[2]) {
      return;
    }
    var operator = matched[1];
    var realAttr = matched[2].toLowerCase();
    if (!compare(realMap[realAttr], value, operator)) {
      applicable = false;
    }
  });
  return applicable;
}
function compare(real, expect, operator) {
  if (operator === "min") {
    return real >= expect;
  } else if (operator === "max") {
    return real <= expect;
  } else {
    return real === expect;
  }
}
function indicesEquals(indices1, indices2) {
  return indices1.join(",") === indices2.join(",");
}
var OptionManager_default = OptionManager;

// node_modules/echarts/lib/preprocessor/helper/compatStyle.js
var each3 = each;
var isObject3 = isObject;
var POSSIBLE_STYLES = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
function compatEC2ItemStyle(opt) {
  var itemStyleOpt = opt && opt.itemStyle;
  if (!itemStyleOpt) {
    return;
  }
  for (var i = 0, len2 = POSSIBLE_STYLES.length; i < len2; i++) {
    var styleName = POSSIBLE_STYLES[i];
    var normalItemStyleOpt = itemStyleOpt.normal;
    var emphasisItemStyleOpt = itemStyleOpt.emphasis;
    if (normalItemStyleOpt && normalItemStyleOpt[styleName]) {
      if (process.env.NODE_ENV !== "production") {
        deprecateReplaceLog("itemStyle.normal." + styleName, styleName);
      }
      opt[styleName] = opt[styleName] || {};
      if (!opt[styleName].normal) {
        opt[styleName].normal = normalItemStyleOpt[styleName];
      } else {
        merge(opt[styleName].normal, normalItemStyleOpt[styleName]);
      }
      normalItemStyleOpt[styleName] = null;
    }
    if (emphasisItemStyleOpt && emphasisItemStyleOpt[styleName]) {
      if (process.env.NODE_ENV !== "production") {
        deprecateReplaceLog("itemStyle.emphasis." + styleName, "emphasis." + styleName);
      }
      opt[styleName] = opt[styleName] || {};
      if (!opt[styleName].emphasis) {
        opt[styleName].emphasis = emphasisItemStyleOpt[styleName];
      } else {
        merge(opt[styleName].emphasis, emphasisItemStyleOpt[styleName]);
      }
      emphasisItemStyleOpt[styleName] = null;
    }
  }
}
function convertNormalEmphasis(opt, optType, useExtend) {
  if (opt && opt[optType] && (opt[optType].normal || opt[optType].emphasis)) {
    var normalOpt = opt[optType].normal;
    var emphasisOpt = opt[optType].emphasis;
    if (normalOpt) {
      if (process.env.NODE_ENV !== "production") {
        deprecateLog("'normal' hierarchy in " + optType + " has been removed since 4.0. All style properties are configured in " + optType + " directly now.");
      }
      if (useExtend) {
        opt[optType].normal = opt[optType].emphasis = null;
        defaults(opt[optType], normalOpt);
      } else {
        opt[optType] = normalOpt;
      }
    }
    if (emphasisOpt) {
      if (process.env.NODE_ENV !== "production") {
        deprecateLog(optType + ".emphasis has been changed to emphasis." + optType + " since 4.0");
      }
      opt.emphasis = opt.emphasis || {};
      opt.emphasis[optType] = emphasisOpt;
      if (emphasisOpt.focus) {
        opt.emphasis.focus = emphasisOpt.focus;
      }
      if (emphasisOpt.blurScope) {
        opt.emphasis.blurScope = emphasisOpt.blurScope;
      }
    }
  }
}
function removeEC3NormalStatus(opt) {
  convertNormalEmphasis(opt, "itemStyle");
  convertNormalEmphasis(opt, "lineStyle");
  convertNormalEmphasis(opt, "areaStyle");
  convertNormalEmphasis(opt, "label");
  convertNormalEmphasis(opt, "labelLine");
  convertNormalEmphasis(opt, "upperLabel");
  convertNormalEmphasis(opt, "edgeLabel");
}
function compatTextStyle(opt, propName) {
  var labelOptSingle = isObject3(opt) && opt[propName];
  var textStyle = isObject3(labelOptSingle) && labelOptSingle.textStyle;
  if (textStyle) {
    if (process.env.NODE_ENV !== "production") {
      deprecateLog("textStyle hierarchy in " + propName + " has been removed since 4.0. All textStyle properties are configured in " + propName + " directly now.");
    }
    for (var i = 0, len2 = TEXT_STYLE_OPTIONS.length; i < len2; i++) {
      var textPropName = TEXT_STYLE_OPTIONS[i];
      if (textStyle.hasOwnProperty(textPropName)) {
        labelOptSingle[textPropName] = textStyle[textPropName];
      }
    }
  }
}
function compatEC3CommonStyles(opt) {
  if (opt) {
    removeEC3NormalStatus(opt);
    compatTextStyle(opt, "label");
    opt.emphasis && compatTextStyle(opt.emphasis, "label");
  }
}
function processSeries(seriesOpt) {
  if (!isObject3(seriesOpt)) {
    return;
  }
  compatEC2ItemStyle(seriesOpt);
  removeEC3NormalStatus(seriesOpt);
  compatTextStyle(seriesOpt, "label");
  compatTextStyle(seriesOpt, "upperLabel");
  compatTextStyle(seriesOpt, "edgeLabel");
  if (seriesOpt.emphasis) {
    compatTextStyle(seriesOpt.emphasis, "label");
    compatTextStyle(seriesOpt.emphasis, "upperLabel");
    compatTextStyle(seriesOpt.emphasis, "edgeLabel");
  }
  var markPoint = seriesOpt.markPoint;
  if (markPoint) {
    compatEC2ItemStyle(markPoint);
    compatEC3CommonStyles(markPoint);
  }
  var markLine = seriesOpt.markLine;
  if (markLine) {
    compatEC2ItemStyle(markLine);
    compatEC3CommonStyles(markLine);
  }
  var markArea = seriesOpt.markArea;
  if (markArea) {
    compatEC3CommonStyles(markArea);
  }
  var data = seriesOpt.data;
  if (seriesOpt.type === "graph") {
    data = data || seriesOpt.nodes;
    var edgeData = seriesOpt.links || seriesOpt.edges;
    if (edgeData && !isTypedArray(edgeData)) {
      for (var i = 0; i < edgeData.length; i++) {
        compatEC3CommonStyles(edgeData[i]);
      }
    }
    each(seriesOpt.categories, function(opt) {
      removeEC3NormalStatus(opt);
    });
  }
  if (data && !isTypedArray(data)) {
    for (var i = 0; i < data.length; i++) {
      compatEC3CommonStyles(data[i]);
    }
  }
  markPoint = seriesOpt.markPoint;
  if (markPoint && markPoint.data) {
    var mpData = markPoint.data;
    for (var i = 0; i < mpData.length; i++) {
      compatEC3CommonStyles(mpData[i]);
    }
  }
  markLine = seriesOpt.markLine;
  if (markLine && markLine.data) {
    var mlData = markLine.data;
    for (var i = 0; i < mlData.length; i++) {
      if (isArray(mlData[i])) {
        compatEC3CommonStyles(mlData[i][0]);
        compatEC3CommonStyles(mlData[i][1]);
      } else {
        compatEC3CommonStyles(mlData[i]);
      }
    }
  }
  if (seriesOpt.type === "gauge") {
    compatTextStyle(seriesOpt, "axisLabel");
    compatTextStyle(seriesOpt, "title");
    compatTextStyle(seriesOpt, "detail");
  } else if (seriesOpt.type === "treemap") {
    convertNormalEmphasis(seriesOpt.breadcrumb, "itemStyle");
    each(seriesOpt.levels, function(opt) {
      removeEC3NormalStatus(opt);
    });
  } else if (seriesOpt.type === "tree") {
    removeEC3NormalStatus(seriesOpt.leaves);
  }
}
function toArr(o) {
  return isArray(o) ? o : o ? [o] : [];
}
function toObj(o) {
  return (isArray(o) ? o[0] : o) || {};
}
function globalCompatStyle(option, isTheme) {
  each3(toArr(option.series), function(seriesOpt) {
    isObject3(seriesOpt) && processSeries(seriesOpt);
  });
  var axes = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
  isTheme && axes.push("valueAxis", "categoryAxis", "logAxis", "timeAxis");
  each3(axes, function(axisName) {
    each3(toArr(option[axisName]), function(axisOpt) {
      if (axisOpt) {
        compatTextStyle(axisOpt, "axisLabel");
        compatTextStyle(axisOpt.axisPointer, "label");
      }
    });
  });
  each3(toArr(option.parallel), function(parallelOpt) {
    var parallelAxisDefault = parallelOpt && parallelOpt.parallelAxisDefault;
    compatTextStyle(parallelAxisDefault, "axisLabel");
    compatTextStyle(parallelAxisDefault && parallelAxisDefault.axisPointer, "label");
  });
  each3(toArr(option.calendar), function(calendarOpt) {
    convertNormalEmphasis(calendarOpt, "itemStyle");
    compatTextStyle(calendarOpt, "dayLabel");
    compatTextStyle(calendarOpt, "monthLabel");
    compatTextStyle(calendarOpt, "yearLabel");
  });
  each3(toArr(option.radar), function(radarOpt) {
    compatTextStyle(radarOpt, "name");
    if (radarOpt.name && radarOpt.axisName == null) {
      radarOpt.axisName = radarOpt.name;
      delete radarOpt.name;
      if (process.env.NODE_ENV !== "production") {
        deprecateLog("name property in radar component has been changed to axisName");
      }
    }
    if (radarOpt.nameGap != null && radarOpt.axisNameGap == null) {
      radarOpt.axisNameGap = radarOpt.nameGap;
      delete radarOpt.nameGap;
      if (process.env.NODE_ENV !== "production") {
        deprecateLog("nameGap property in radar component has been changed to axisNameGap");
      }
    }
    if (process.env.NODE_ENV !== "production") {
      each3(radarOpt.indicator, function(indicatorOpt) {
        if (indicatorOpt.text) {
          deprecateReplaceLog("text", "name", "radar.indicator");
        }
      });
    }
  });
  each3(toArr(option.geo), function(geoOpt) {
    if (isObject3(geoOpt)) {
      compatEC3CommonStyles(geoOpt);
      each3(toArr(geoOpt.regions), function(regionObj) {
        compatEC3CommonStyles(regionObj);
      });
    }
  });
  each3(toArr(option.timeline), function(timelineOpt) {
    compatEC3CommonStyles(timelineOpt);
    convertNormalEmphasis(timelineOpt, "label");
    convertNormalEmphasis(timelineOpt, "itemStyle");
    convertNormalEmphasis(timelineOpt, "controlStyle", true);
    var data = timelineOpt.data;
    isArray(data) && each(data, function(item) {
      if (isObject(item)) {
        convertNormalEmphasis(item, "label");
        convertNormalEmphasis(item, "itemStyle");
      }
    });
  });
  each3(toArr(option.toolbox), function(toolboxOpt) {
    convertNormalEmphasis(toolboxOpt, "iconStyle");
    each3(toolboxOpt.feature, function(featureOpt) {
      convertNormalEmphasis(featureOpt, "iconStyle");
    });
  });
  compatTextStyle(toObj(option.axisPointer), "label");
  compatTextStyle(toObj(option.tooltip).axisPointer, "label");
}

// node_modules/echarts/lib/preprocessor/backwardCompat.js
function get(opt, path3) {
  var pathArr = path3.split(",");
  var obj = opt;
  for (var i = 0; i < pathArr.length; i++) {
    obj = obj && obj[pathArr[i]];
    if (obj == null) {
      break;
    }
  }
  return obj;
}
function set(opt, path3, val, overwrite) {
  var pathArr = path3.split(",");
  var obj = opt;
  var key;
  var i = 0;
  for (; i < pathArr.length - 1; i++) {
    key = pathArr[i];
    if (obj[key] == null) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  if (overwrite || obj[pathArr[i]] == null) {
    obj[pathArr[i]] = val;
  }
}
function compatLayoutProperties(option) {
  option && each(LAYOUT_PROPERTIES, function(prop) {
    if (prop[0] in option && !(prop[1] in option)) {
      option[prop[1]] = option[prop[0]];
    }
  });
}
var LAYOUT_PROPERTIES = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]];
var COMPATITABLE_COMPONENTS = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"];
var BAR_ITEM_STYLE_MAP = [["borderRadius", "barBorderRadius"], ["borderColor", "barBorderColor"], ["borderWidth", "barBorderWidth"]];
function compatBarItemStyle(option) {
  var itemStyle = option && option.itemStyle;
  if (itemStyle) {
    for (var i = 0; i < BAR_ITEM_STYLE_MAP.length; i++) {
      var oldName = BAR_ITEM_STYLE_MAP[i][1];
      var newName = BAR_ITEM_STYLE_MAP[i][0];
      if (itemStyle[oldName] != null) {
        itemStyle[newName] = itemStyle[oldName];
        if (process.env.NODE_ENV !== "production") {
          deprecateReplaceLog(oldName, newName);
        }
      }
    }
  }
}
function compatPieLabel(option) {
  if (!option) {
    return;
  }
  if (option.alignTo === "edge" && option.margin != null && option.edgeDistance == null) {
    if (process.env.NODE_ENV !== "production") {
      deprecateReplaceLog("label.margin", "label.edgeDistance", "pie");
    }
    option.edgeDistance = option.margin;
  }
}
function compatSunburstState(option) {
  if (!option) {
    return;
  }
  if (option.downplay && !option.blur) {
    option.blur = option.downplay;
    if (process.env.NODE_ENV !== "production") {
      deprecateReplaceLog("downplay", "blur", "sunburst");
    }
  }
}
function compatGraphFocus(option) {
  if (!option) {
    return;
  }
  if (option.focusNodeAdjacency != null) {
    option.emphasis = option.emphasis || {};
    if (option.emphasis.focus == null) {
      if (process.env.NODE_ENV !== "production") {
        deprecateReplaceLog("focusNodeAdjacency", "emphasis: { focus: 'adjacency'}", "graph/sankey");
      }
      option.emphasis.focus = "adjacency";
    }
  }
}
function traverseTree(data, cb) {
  if (data) {
    for (var i = 0; i < data.length; i++) {
      cb(data[i]);
      data[i] && traverseTree(data[i].children, cb);
    }
  }
}
function globalBackwardCompat(option, isTheme) {
  globalCompatStyle(option, isTheme);
  option.series = normalizeToArray(option.series);
  each(option.series, function(seriesOpt) {
    if (!isObject(seriesOpt)) {
      return;
    }
    var seriesType2 = seriesOpt.type;
    if (seriesType2 === "line") {
      if (seriesOpt.clipOverflow != null) {
        seriesOpt.clip = seriesOpt.clipOverflow;
        if (process.env.NODE_ENV !== "production") {
          deprecateReplaceLog("clipOverflow", "clip", "line");
        }
      }
    } else if (seriesType2 === "pie" || seriesType2 === "gauge") {
      if (seriesOpt.clockWise != null) {
        seriesOpt.clockwise = seriesOpt.clockWise;
        if (process.env.NODE_ENV !== "production") {
          deprecateReplaceLog("clockWise", "clockwise");
        }
      }
      compatPieLabel(seriesOpt.label);
      var data = seriesOpt.data;
      if (data && !isTypedArray(data)) {
        for (var i = 0; i < data.length; i++) {
          compatPieLabel(data[i]);
        }
      }
      if (seriesOpt.hoverOffset != null) {
        seriesOpt.emphasis = seriesOpt.emphasis || {};
        if (seriesOpt.emphasis.scaleSize = null) {
          if (process.env.NODE_ENV !== "production") {
            deprecateReplaceLog("hoverOffset", "emphasis.scaleSize");
          }
          seriesOpt.emphasis.scaleSize = seriesOpt.hoverOffset;
        }
      }
    } else if (seriesType2 === "gauge") {
      var pointerColor = get(seriesOpt, "pointer.color");
      pointerColor != null && set(seriesOpt, "itemStyle.color", pointerColor);
    } else if (seriesType2 === "bar") {
      compatBarItemStyle(seriesOpt);
      compatBarItemStyle(seriesOpt.backgroundStyle);
      compatBarItemStyle(seriesOpt.emphasis);
      var data = seriesOpt.data;
      if (data && !isTypedArray(data)) {
        for (var i = 0; i < data.length; i++) {
          if (typeof data[i] === "object") {
            compatBarItemStyle(data[i]);
            compatBarItemStyle(data[i] && data[i].emphasis);
          }
        }
      }
    } else if (seriesType2 === "sunburst") {
      var highlightPolicy = seriesOpt.highlightPolicy;
      if (highlightPolicy) {
        seriesOpt.emphasis = seriesOpt.emphasis || {};
        if (!seriesOpt.emphasis.focus) {
          seriesOpt.emphasis.focus = highlightPolicy;
          if (process.env.NODE_ENV !== "production") {
            deprecateReplaceLog("highlightPolicy", "emphasis.focus", "sunburst");
          }
        }
      }
      compatSunburstState(seriesOpt);
      traverseTree(seriesOpt.data, compatSunburstState);
    } else if (seriesType2 === "graph" || seriesType2 === "sankey") {
      compatGraphFocus(seriesOpt);
    } else if (seriesType2 === "map") {
      if (seriesOpt.mapType && !seriesOpt.map) {
        if (process.env.NODE_ENV !== "production") {
          deprecateReplaceLog("mapType", "map", "map");
        }
        seriesOpt.map = seriesOpt.mapType;
      }
      if (seriesOpt.mapLocation) {
        if (process.env.NODE_ENV !== "production") {
          deprecateLog("`mapLocation` is not used anymore.");
        }
        defaults(seriesOpt, seriesOpt.mapLocation);
      }
    }
    if (seriesOpt.hoverAnimation != null) {
      seriesOpt.emphasis = seriesOpt.emphasis || {};
      if (seriesOpt.emphasis && seriesOpt.emphasis.scale == null) {
        if (process.env.NODE_ENV !== "production") {
          deprecateReplaceLog("hoverAnimation", "emphasis.scale");
        }
        seriesOpt.emphasis.scale = seriesOpt.hoverAnimation;
      }
    }
    compatLayoutProperties(seriesOpt);
  });
  if (option.dataRange) {
    option.visualMap = option.dataRange;
  }
  each(COMPATITABLE_COMPONENTS, function(componentName) {
    var options = option[componentName];
    if (options) {
      if (!isArray(options)) {
        options = [options];
      }
      each(options, function(option2) {
        compatLayoutProperties(option2);
      });
    }
  });
}

// node_modules/echarts/lib/processor/dataStack.js
function dataStack(ecModel) {
  var stackInfoMap = createHashMap();
  ecModel.eachSeries(function(seriesModel) {
    var stack = seriesModel.get("stack");
    if (stack) {
      var stackInfoList = stackInfoMap.get(stack) || stackInfoMap.set(stack, []);
      var data = seriesModel.getData();
      var stackInfo = {
        // Used for calculate axis extent automatically.
        // TODO: Type getCalculationInfo return more specific type?
        stackResultDimension: data.getCalculationInfo("stackResultDimension"),
        stackedOverDimension: data.getCalculationInfo("stackedOverDimension"),
        stackedDimension: data.getCalculationInfo("stackedDimension"),
        stackedByDimension: data.getCalculationInfo("stackedByDimension"),
        isStackedByIndex: data.getCalculationInfo("isStackedByIndex"),
        data,
        seriesModel
      };
      if (!stackInfo.stackedDimension || !(stackInfo.isStackedByIndex || stackInfo.stackedByDimension)) {
        return;
      }
      stackInfoList.length && data.setCalculationInfo("stackedOnSeries", stackInfoList[stackInfoList.length - 1].seriesModel);
      stackInfoList.push(stackInfo);
    }
  });
  stackInfoMap.each(calculateStack);
}
function calculateStack(stackInfoList) {
  each(stackInfoList, function(targetStackInfo, idxInStack) {
    var resultVal = [];
    var resultNaN = [NaN, NaN];
    var dims = [targetStackInfo.stackResultDimension, targetStackInfo.stackedOverDimension];
    var targetData = targetStackInfo.data;
    var isStackedByIndex = targetStackInfo.isStackedByIndex;
    var stackStrategy = targetStackInfo.seriesModel.get("stackStrategy") || "samesign";
    targetData.modify(dims, function(v0, v1, dataIndex) {
      var sum = targetData.get(targetStackInfo.stackedDimension, dataIndex);
      if (isNaN(sum)) {
        return resultNaN;
      }
      var byValue;
      var stackedDataRawIndex;
      if (isStackedByIndex) {
        stackedDataRawIndex = targetData.getRawIndex(dataIndex);
      } else {
        byValue = targetData.get(targetStackInfo.stackedByDimension, dataIndex);
      }
      var stackedOver = NaN;
      for (var j = idxInStack - 1; j >= 0; j--) {
        var stackInfo = stackInfoList[j];
        if (!isStackedByIndex) {
          stackedDataRawIndex = stackInfo.data.rawIndexOf(stackInfo.stackedByDimension, byValue);
        }
        if (stackedDataRawIndex >= 0) {
          var val = stackInfo.data.getByRawIndex(stackInfo.stackResultDimension, stackedDataRawIndex);
          if (stackStrategy === "all" || stackStrategy === "positive" && val > 0 || stackStrategy === "negative" && val < 0 || stackStrategy === "samesign" && sum >= 0 && val > 0 || stackStrategy === "samesign" && sum <= 0 && val < 0) {
            sum = addSafe(sum, val);
            stackedOver = val;
            break;
          }
        }
      }
      resultVal[0] = sum;
      resultVal[1] = stackedOver;
      return resultVal;
    });
  });
}

// node_modules/echarts/lib/view/Component.js
var ComponentView = (
  /** @class */
  function() {
    function ComponentView2() {
      this.group = new Group_default();
      this.uid = getUID("viewComponent");
    }
    ComponentView2.prototype.init = function(ecModel, api) {
    };
    ComponentView2.prototype.render = function(model, ecModel, api, payload) {
    };
    ComponentView2.prototype.dispose = function(ecModel, api) {
    };
    ComponentView2.prototype.updateView = function(model, ecModel, api, payload) {
    };
    ComponentView2.prototype.updateLayout = function(model, ecModel, api, payload) {
    };
    ComponentView2.prototype.updateVisual = function(model, ecModel, api, payload) {
    };
    ComponentView2.prototype.toggleBlurSeries = function(seriesModels, isBlur, ecModel) {
    };
    ComponentView2.prototype.eachRendered = function(cb) {
      var group = this.group;
      if (group) {
        group.traverse(cb);
      }
    };
    return ComponentView2;
  }()
);
enableClassExtend(ComponentView);
enableClassManagement(ComponentView);
var Component_default2 = ComponentView;

// node_modules/echarts/lib/visual/style.js
var inner5 = makeInner();
var defaultStyleMappers = {
  itemStyle: makeStyleMapper(ITEM_STYLE_KEY_MAP, true),
  lineStyle: makeStyleMapper(LINE_STYLE_KEY_MAP, true)
};
var defaultColorKey = {
  lineStyle: "stroke",
  itemStyle: "fill"
};
function getStyleMapper(seriesModel, stylePath) {
  var styleMapper = seriesModel.visualStyleMapper || defaultStyleMappers[stylePath];
  if (!styleMapper) {
    console.warn("Unknown style type '" + stylePath + "'.");
    return defaultStyleMappers.itemStyle;
  }
  return styleMapper;
}
function getDefaultColorKey(seriesModel, stylePath) {
  var colorKey = seriesModel.visualDrawType || defaultColorKey[stylePath];
  if (!colorKey) {
    console.warn("Unknown style type '" + stylePath + "'.");
    return "fill";
  }
  return colorKey;
}
var seriesStyleTask = {
  createOnAllSeries: true,
  performRawSeries: true,
  reset: function(seriesModel, ecModel) {
    var data = seriesModel.getData();
    var stylePath = seriesModel.visualStyleAccessPath || "itemStyle";
    var styleModel = seriesModel.getModel(stylePath);
    var getStyle2 = getStyleMapper(seriesModel, stylePath);
    var globalStyle = getStyle2(styleModel);
    var decalOption = styleModel.getShallow("decal");
    if (decalOption) {
      data.setVisual("decal", decalOption);
      decalOption.dirty = true;
    }
    var colorKey = getDefaultColorKey(seriesModel, stylePath);
    var color = globalStyle[colorKey];
    var colorCallback = isFunction(color) ? color : null;
    var hasAutoColor = globalStyle.fill === "auto" || globalStyle.stroke === "auto";
    if (!globalStyle[colorKey] || colorCallback || hasAutoColor) {
      var colorPalette2 = seriesModel.getColorFromPalette(
        // TODO series count changed.
        seriesModel.name,
        null,
        ecModel.getSeriesCount()
      );
      if (!globalStyle[colorKey]) {
        globalStyle[colorKey] = colorPalette2;
        data.setVisual("colorFromPalette", true);
      }
      globalStyle.fill = globalStyle.fill === "auto" || isFunction(globalStyle.fill) ? colorPalette2 : globalStyle.fill;
      globalStyle.stroke = globalStyle.stroke === "auto" || isFunction(globalStyle.stroke) ? colorPalette2 : globalStyle.stroke;
    }
    data.setVisual("style", globalStyle);
    data.setVisual("drawType", colorKey);
    if (!ecModel.isSeriesFiltered(seriesModel) && colorCallback) {
      data.setVisual("colorFromPalette", false);
      return {
        dataEach: function(data2, idx) {
          var dataParams = seriesModel.getDataParams(idx);
          var itemStyle = extend({}, globalStyle);
          itemStyle[colorKey] = colorCallback(dataParams);
          data2.setItemVisual(idx, "style", itemStyle);
        }
      };
    }
  }
};
var sharedModel = new Model_default();
var dataStyleTask = {
  createOnAllSeries: true,
  performRawSeries: true,
  reset: function(seriesModel, ecModel) {
    if (seriesModel.ignoreStyleOnData || ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }
    var data = seriesModel.getData();
    var stylePath = seriesModel.visualStyleAccessPath || "itemStyle";
    var getStyle2 = getStyleMapper(seriesModel, stylePath);
    var colorKey = data.getVisual("drawType");
    return {
      dataEach: data.hasItemOption ? function(data2, idx) {
        var rawItem = data2.getRawDataItem(idx);
        if (rawItem && rawItem[stylePath]) {
          sharedModel.option = rawItem[stylePath];
          var style = getStyle2(sharedModel);
          var existsStyle = data2.ensureUniqueItemVisual(idx, "style");
          extend(existsStyle, style);
          if (sharedModel.option.decal) {
            data2.setItemVisual(idx, "decal", sharedModel.option.decal);
            sharedModel.option.decal.dirty = true;
          }
          if (colorKey in style) {
            data2.setItemVisual(idx, "colorFromPalette", false);
          }
        }
      } : null
    };
  }
};
var dataColorPaletteTask = {
  performRawSeries: true,
  overallReset: function(ecModel) {
    var paletteScopeGroupByType = createHashMap();
    ecModel.eachSeries(function(seriesModel) {
      var colorBy = seriesModel.getColorBy();
      if (seriesModel.isColorBySeries()) {
        return;
      }
      var key = seriesModel.type + "-" + colorBy;
      var colorScope = paletteScopeGroupByType.get(key);
      if (!colorScope) {
        colorScope = {};
        paletteScopeGroupByType.set(key, colorScope);
      }
      inner5(seriesModel).scope = colorScope;
    });
    ecModel.eachSeries(function(seriesModel) {
      if (seriesModel.isColorBySeries() || ecModel.isSeriesFiltered(seriesModel)) {
        return;
      }
      var dataAll = seriesModel.getRawData();
      var idxMap = {};
      var data = seriesModel.getData();
      var colorScope = inner5(seriesModel).scope;
      var stylePath = seriesModel.visualStyleAccessPath || "itemStyle";
      var colorKey = getDefaultColorKey(seriesModel, stylePath);
      data.each(function(idx) {
        var rawIdx = data.getRawIndex(idx);
        idxMap[rawIdx] = idx;
      });
      dataAll.each(function(rawIdx) {
        var idx = idxMap[rawIdx];
        var fromPalette = data.getItemVisual(idx, "colorFromPalette");
        if (fromPalette) {
          var itemStyle = data.ensureUniqueItemVisual(idx, "style");
          var name_1 = dataAll.getName(rawIdx) || rawIdx + "";
          var dataCount = dataAll.count();
          itemStyle[colorKey] = seriesModel.getColorFromPalette(name_1, colorScope, dataCount);
        }
      });
    });
  }
};

// node_modules/echarts/lib/loading/default.js
var PI5 = Math.PI;
function defaultLoading(api, opts) {
  opts = opts || {};
  defaults(opts, {
    text: "loading",
    textColor: "#000",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "sans-serif",
    maskColor: "rgba(255, 255, 255, 0.8)",
    showSpinner: true,
    color: "#5470c6",
    spinnerRadius: 10,
    lineWidth: 5,
    zlevel: 0
  });
  var group = new Group_default();
  var mask = new Rect_default({
    style: {
      fill: opts.maskColor
    },
    zlevel: opts.zlevel,
    z: 1e4
  });
  group.add(mask);
  var textContent = new Text_default({
    style: {
      text: opts.text,
      fill: opts.textColor,
      fontSize: opts.fontSize,
      fontWeight: opts.fontWeight,
      fontStyle: opts.fontStyle,
      fontFamily: opts.fontFamily
    },
    zlevel: opts.zlevel,
    z: 10001
  });
  var labelRect = new Rect_default({
    style: {
      fill: "none"
    },
    textContent,
    textConfig: {
      position: "right",
      distance: 10
    },
    zlevel: opts.zlevel,
    z: 10001
  });
  group.add(labelRect);
  var arc;
  if (opts.showSpinner) {
    arc = new Arc_default({
      shape: {
        startAngle: -PI5 / 2,
        endAngle: -PI5 / 2 + 0.1,
        r: opts.spinnerRadius
      },
      style: {
        stroke: opts.color,
        lineCap: "round",
        lineWidth: opts.lineWidth
      },
      zlevel: opts.zlevel,
      z: 10001
    });
    arc.animateShape(true).when(1e3, {
      endAngle: PI5 * 3 / 2
    }).start("circularInOut");
    arc.animateShape(true).when(1e3, {
      startAngle: PI5 * 3 / 2
    }).delay(300).start("circularInOut");
    group.add(arc);
  }
  group.resize = function() {
    var textWidth = textContent.getBoundingRect().width;
    var r = opts.showSpinner ? opts.spinnerRadius : 0;
    var cx = (api.getWidth() - r * 2 - (opts.showSpinner && textWidth ? 10 : 0) - textWidth) / 2 - (opts.showSpinner && textWidth ? 0 : 5 + textWidth / 2) + (opts.showSpinner ? 0 : textWidth / 2) + (textWidth ? 0 : r);
    var cy = api.getHeight() / 2;
    opts.showSpinner && arc.setShape({
      cx,
      cy
    });
    labelRect.setShape({
      x: cx - r,
      y: cy - r,
      width: r * 2,
      height: r * 2
    });
    mask.setShape({
      x: 0,
      y: 0,
      width: api.getWidth(),
      height: api.getHeight()
    });
  };
  group.resize();
  return group;
}

// node_modules/echarts/lib/core/Scheduler.js
var Scheduler = (
  /** @class */
  function() {
    function Scheduler2(ecInstance, api, dataProcessorHandlers, visualHandlers) {
      this._stageTaskMap = createHashMap();
      this.ecInstance = ecInstance;
      this.api = api;
      dataProcessorHandlers = this._dataProcessorHandlers = dataProcessorHandlers.slice();
      visualHandlers = this._visualHandlers = visualHandlers.slice();
      this._allHandlers = dataProcessorHandlers.concat(visualHandlers);
    }
    Scheduler2.prototype.restoreData = function(ecModel, payload) {
      ecModel.restoreData(payload);
      this._stageTaskMap.each(function(taskRecord) {
        var overallTask = taskRecord.overallTask;
        overallTask && overallTask.dirty();
      });
    };
    Scheduler2.prototype.getPerformArgs = function(task, isBlock) {
      if (!task.__pipeline) {
        return;
      }
      var pipeline = this._pipelineMap.get(task.__pipeline.id);
      var pCtx = pipeline.context;
      var incremental = !isBlock && pipeline.progressiveEnabled && (!pCtx || pCtx.progressiveRender) && task.__idxInPipeline > pipeline.blockIndex;
      var step = incremental ? pipeline.step : null;
      var modDataCount = pCtx && pCtx.modDataCount;
      var modBy = modDataCount != null ? Math.ceil(modDataCount / step) : null;
      return {
        step,
        modBy,
        modDataCount
      };
    };
    Scheduler2.prototype.getPipeline = function(pipelineId) {
      return this._pipelineMap.get(pipelineId);
    };
    Scheduler2.prototype.updateStreamModes = function(seriesModel, view) {
      var pipeline = this._pipelineMap.get(seriesModel.uid);
      var data = seriesModel.getData();
      var dataLen = data.count();
      var progressiveRender = pipeline.progressiveEnabled && view.incrementalPrepareRender && dataLen >= pipeline.threshold;
      var large = seriesModel.get("large") && dataLen >= seriesModel.get("largeThreshold");
      var modDataCount = seriesModel.get("progressiveChunkMode") === "mod" ? dataLen : null;
      seriesModel.pipelineContext = pipeline.context = {
        progressiveRender,
        modDataCount,
        large
      };
    };
    Scheduler2.prototype.restorePipelines = function(ecModel) {
      var scheduler = this;
      var pipelineMap = scheduler._pipelineMap = createHashMap();
      ecModel.eachSeries(function(seriesModel) {
        var progressive = seriesModel.getProgressive();
        var pipelineId = seriesModel.uid;
        pipelineMap.set(pipelineId, {
          id: pipelineId,
          head: null,
          tail: null,
          threshold: seriesModel.getProgressiveThreshold(),
          progressiveEnabled: progressive && !(seriesModel.preventIncremental && seriesModel.preventIncremental()),
          blockIndex: -1,
          step: Math.round(progressive || 700),
          count: 0
        });
        scheduler._pipe(seriesModel, seriesModel.dataTask);
      });
    };
    Scheduler2.prototype.prepareStageTasks = function() {
      var stageTaskMap = this._stageTaskMap;
      var ecModel = this.api.getModel();
      var api = this.api;
      each(this._allHandlers, function(handler) {
        var record = stageTaskMap.get(handler.uid) || stageTaskMap.set(handler.uid, {});
        var errMsg = "";
        if (process.env.NODE_ENV !== "production") {
          errMsg = '"reset" and "overallReset" must not be both specified.';
        }
        assert(!(handler.reset && handler.overallReset), errMsg);
        handler.reset && this._createSeriesStageTask(handler, record, ecModel, api);
        handler.overallReset && this._createOverallStageTask(handler, record, ecModel, api);
      }, this);
    };
    Scheduler2.prototype.prepareView = function(view, model, ecModel, api) {
      var renderTask = view.renderTask;
      var context = renderTask.context;
      context.model = model;
      context.ecModel = ecModel;
      context.api = api;
      renderTask.__block = !view.incrementalPrepareRender;
      this._pipe(model, renderTask);
    };
    Scheduler2.prototype.performDataProcessorTasks = function(ecModel, payload) {
      this._performStageTasks(this._dataProcessorHandlers, ecModel, payload, {
        block: true
      });
    };
    Scheduler2.prototype.performVisualTasks = function(ecModel, payload, opt) {
      this._performStageTasks(this._visualHandlers, ecModel, payload, opt);
    };
    Scheduler2.prototype._performStageTasks = function(stageHandlers, ecModel, payload, opt) {
      opt = opt || {};
      var unfinished = false;
      var scheduler = this;
      each(stageHandlers, function(stageHandler, idx) {
        if (opt.visualType && opt.visualType !== stageHandler.visualType) {
          return;
        }
        var stageHandlerRecord = scheduler._stageTaskMap.get(stageHandler.uid);
        var seriesTaskMap = stageHandlerRecord.seriesTaskMap;
        var overallTask = stageHandlerRecord.overallTask;
        if (overallTask) {
          var overallNeedDirty_1;
          var agentStubMap = overallTask.agentStubMap;
          agentStubMap.each(function(stub) {
            if (needSetDirty(opt, stub)) {
              stub.dirty();
              overallNeedDirty_1 = true;
            }
          });
          overallNeedDirty_1 && overallTask.dirty();
          scheduler.updatePayload(overallTask, payload);
          var performArgs_1 = scheduler.getPerformArgs(overallTask, opt.block);
          agentStubMap.each(function(stub) {
            stub.perform(performArgs_1);
          });
          if (overallTask.perform(performArgs_1)) {
            unfinished = true;
          }
        } else if (seriesTaskMap) {
          seriesTaskMap.each(function(task, pipelineId) {
            if (needSetDirty(opt, task)) {
              task.dirty();
            }
            var performArgs = scheduler.getPerformArgs(task, opt.block);
            performArgs.skip = !stageHandler.performRawSeries && ecModel.isSeriesFiltered(task.context.model);
            scheduler.updatePayload(task, payload);
            if (task.perform(performArgs)) {
              unfinished = true;
            }
          });
        }
      });
      function needSetDirty(opt2, task) {
        return opt2.setDirty && (!opt2.dirtyMap || opt2.dirtyMap.get(task.__pipeline.id));
      }
      this.unfinished = unfinished || this.unfinished;
    };
    Scheduler2.prototype.performSeriesTasks = function(ecModel) {
      var unfinished;
      ecModel.eachSeries(function(seriesModel) {
        unfinished = seriesModel.dataTask.perform() || unfinished;
      });
      this.unfinished = unfinished || this.unfinished;
    };
    Scheduler2.prototype.plan = function() {
      this._pipelineMap.each(function(pipeline) {
        var task = pipeline.tail;
        do {
          if (task.__block) {
            pipeline.blockIndex = task.__idxInPipeline;
            break;
          }
          task = task.getUpstream();
        } while (task);
      });
    };
    Scheduler2.prototype.updatePayload = function(task, payload) {
      payload !== "remain" && (task.context.payload = payload);
    };
    Scheduler2.prototype._createSeriesStageTask = function(stageHandler, stageHandlerRecord, ecModel, api) {
      var scheduler = this;
      var oldSeriesTaskMap = stageHandlerRecord.seriesTaskMap;
      var newSeriesTaskMap = stageHandlerRecord.seriesTaskMap = createHashMap();
      var seriesType2 = stageHandler.seriesType;
      var getTargetSeries = stageHandler.getTargetSeries;
      if (stageHandler.createOnAllSeries) {
        ecModel.eachRawSeries(create3);
      } else if (seriesType2) {
        ecModel.eachRawSeriesByType(seriesType2, create3);
      } else if (getTargetSeries) {
        getTargetSeries(ecModel, api).each(create3);
      }
      function create3(seriesModel) {
        var pipelineId = seriesModel.uid;
        var task = newSeriesTaskMap.set(pipelineId, oldSeriesTaskMap && oldSeriesTaskMap.get(pipelineId) || createTask({
          plan: seriesTaskPlan,
          reset: seriesTaskReset,
          count: seriesTaskCount
        }));
        task.context = {
          model: seriesModel,
          ecModel,
          api,
          // PENDING: `useClearVisual` not used?
          useClearVisual: stageHandler.isVisual && !stageHandler.isLayout,
          plan: stageHandler.plan,
          reset: stageHandler.reset,
          scheduler
        };
        scheduler._pipe(seriesModel, task);
      }
    };
    Scheduler2.prototype._createOverallStageTask = function(stageHandler, stageHandlerRecord, ecModel, api) {
      var scheduler = this;
      var overallTask = stageHandlerRecord.overallTask = stageHandlerRecord.overallTask || createTask({
        reset: overallTaskReset
      });
      overallTask.context = {
        ecModel,
        api,
        overallReset: stageHandler.overallReset,
        scheduler
      };
      var oldAgentStubMap = overallTask.agentStubMap;
      var newAgentStubMap = overallTask.agentStubMap = createHashMap();
      var seriesType2 = stageHandler.seriesType;
      var getTargetSeries = stageHandler.getTargetSeries;
      var overallProgress = true;
      var shouldOverallTaskDirty = false;
      var errMsg = "";
      if (process.env.NODE_ENV !== "production") {
        errMsg = '"createOnAllSeries" is not supported for "overallReset", because it will block all streams.';
      }
      assert(!stageHandler.createOnAllSeries, errMsg);
      if (seriesType2) {
        ecModel.eachRawSeriesByType(seriesType2, createStub);
      } else if (getTargetSeries) {
        getTargetSeries(ecModel, api).each(createStub);
      } else {
        overallProgress = false;
        each(ecModel.getSeries(), createStub);
      }
      function createStub(seriesModel) {
        var pipelineId = seriesModel.uid;
        var stub = newAgentStubMap.set(pipelineId, oldAgentStubMap && oldAgentStubMap.get(pipelineId) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (shouldOverallTaskDirty = true, createTask({
          reset: stubReset,
          onDirty: stubOnDirty
        })));
        stub.context = {
          model: seriesModel,
          overallProgress
          // FIXME:TS never used, so comment it
          // modifyOutputEnd: modifyOutputEnd
        };
        stub.agent = overallTask;
        stub.__block = overallProgress;
        scheduler._pipe(seriesModel, stub);
      }
      if (shouldOverallTaskDirty) {
        overallTask.dirty();
      }
    };
    Scheduler2.prototype._pipe = function(seriesModel, task) {
      var pipelineId = seriesModel.uid;
      var pipeline = this._pipelineMap.get(pipelineId);
      !pipeline.head && (pipeline.head = task);
      pipeline.tail && pipeline.tail.pipe(task);
      pipeline.tail = task;
      task.__idxInPipeline = pipeline.count++;
      task.__pipeline = pipeline;
    };
    Scheduler2.wrapStageHandler = function(stageHandler, visualType) {
      if (isFunction(stageHandler)) {
        stageHandler = {
          overallReset: stageHandler,
          seriesType: detectSeriseType(stageHandler)
        };
      }
      stageHandler.uid = getUID("stageHandler");
      visualType && (stageHandler.visualType = visualType);
      return stageHandler;
    };
    ;
    return Scheduler2;
  }()
);
function overallTaskReset(context) {
  context.overallReset(context.ecModel, context.api, context.payload);
}
function stubReset(context) {
  return context.overallProgress && stubProgress;
}
function stubProgress() {
  this.agent.dirty();
  this.getDownstream().dirty();
}
function stubOnDirty() {
  this.agent && this.agent.dirty();
}
function seriesTaskPlan(context) {
  return context.plan ? context.plan(context.model, context.ecModel, context.api, context.payload) : null;
}
function seriesTaskReset(context) {
  if (context.useClearVisual) {
    context.data.clearAllVisual();
  }
  var resetDefines = context.resetDefines = normalizeToArray(context.reset(context.model, context.ecModel, context.api, context.payload));
  return resetDefines.length > 1 ? map(resetDefines, function(v, idx) {
    return makeSeriesTaskProgress(idx);
  }) : singleSeriesTaskProgress;
}
var singleSeriesTaskProgress = makeSeriesTaskProgress(0);
function makeSeriesTaskProgress(resetDefineIdx) {
  return function(params, context) {
    var data = context.data;
    var resetDefine = context.resetDefines[resetDefineIdx];
    if (resetDefine && resetDefine.dataEach) {
      for (var i = params.start; i < params.end; i++) {
        resetDefine.dataEach(data, i);
      }
    } else if (resetDefine && resetDefine.progress) {
      resetDefine.progress(params, data);
    }
  };
}
function seriesTaskCount(context) {
  return context.data.count();
}
function detectSeriseType(legacyFunc) {
  seriesType = null;
  try {
    legacyFunc(ecModelMock, apiMock);
  } catch (e2) {
  }
  return seriesType;
}
var ecModelMock = {};
var apiMock = {};
var seriesType;
mockMethods(ecModelMock, Global_default);
mockMethods(apiMock, ExtensionAPI_default);
ecModelMock.eachSeriesByType = ecModelMock.eachRawSeriesByType = function(type) {
  seriesType = type;
};
ecModelMock.eachComponent = function(cond) {
  if (cond.mainType === "series" && cond.subType) {
    seriesType = cond.subType;
  }
};
function mockMethods(target, Clz) {
  for (var name_1 in Clz.prototype) {
    target[name_1] = noop;
  }
}
var Scheduler_default = Scheduler;

// node_modules/echarts/lib/theme/light.js
var colorAll = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"];
var light_default = {
  color: colorAll,
  colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], colorAll]
};

// node_modules/echarts/lib/theme/dark.js
var contrastColor = "#B9B8CE";
var backgroundColor = "#100C2A";
var axisCommon = function() {
  return {
    axisLine: {
      lineStyle: {
        color: contrastColor
      }
    },
    splitLine: {
      lineStyle: {
        color: "#484753"
      }
    },
    splitArea: {
      areaStyle: {
        color: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"]
      }
    },
    minorSplitLine: {
      lineStyle: {
        color: "#20203B"
      }
    }
  };
};
var colorPalette = ["#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff"];
var theme = {
  darkMode: true,
  color: colorPalette,
  backgroundColor,
  axisPointer: {
    lineStyle: {
      color: "#817f91"
    },
    crossStyle: {
      color: "#817f91"
    },
    label: {
      // TODO Contrast of label backgorundColor
      color: "#fff"
    }
  },
  legend: {
    textStyle: {
      color: contrastColor
    }
  },
  textStyle: {
    color: contrastColor
  },
  title: {
    textStyle: {
      color: "#EEF1FA"
    },
    subtextStyle: {
      color: "#B9B8CE"
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: contrastColor
    }
  },
  dataZoom: {
    borderColor: "#71708A",
    textStyle: {
      color: contrastColor
    },
    brushStyle: {
      color: "rgba(135,163,206,0.3)"
    },
    handleStyle: {
      color: "#353450",
      borderColor: "#C5CBE3"
    },
    moveHandleStyle: {
      color: "#B0B6C3",
      opacity: 0.3
    },
    fillerColor: "rgba(135,163,206,0.2)",
    emphasis: {
      handleStyle: {
        borderColor: "#91B7F2",
        color: "#4D587D"
      },
      moveHandleStyle: {
        color: "#636D9A",
        opacity: 0.7
      }
    },
    dataBackground: {
      lineStyle: {
        color: "#71708A",
        width: 1
      },
      areaStyle: {
        color: "#71708A"
      }
    },
    selectedDataBackground: {
      lineStyle: {
        color: "#87A3CE"
      },
      areaStyle: {
        color: "#87A3CE"
      }
    }
  },
  visualMap: {
    textStyle: {
      color: contrastColor
    }
  },
  timeline: {
    lineStyle: {
      color: contrastColor
    },
    label: {
      color: contrastColor
    },
    controlStyle: {
      color: contrastColor,
      borderColor: contrastColor
    }
  },
  calendar: {
    itemStyle: {
      color: backgroundColor
    },
    dayLabel: {
      color: contrastColor
    },
    monthLabel: {
      color: contrastColor
    },
    yearLabel: {
      color: contrastColor
    }
  },
  timeAxis: axisCommon(),
  logAxis: axisCommon(),
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),
  line: {
    symbol: "circle"
  },
  graph: {
    color: colorPalette
  },
  gauge: {
    title: {
      color: contrastColor
    },
    axisLine: {
      lineStyle: {
        color: [[1, "rgba(207,212,219,0.2)"]]
      }
    },
    axisLabel: {
      color: contrastColor
    },
    detail: {
      color: "#EEF1FA"
    }
  },
  candlestick: {
    itemStyle: {
      color: "#f64e56",
      color0: "#54ea92",
      borderColor: "#f64e56",
      borderColor0: "#54ea92"
      // borderColor: '#ca2824',
      // borderColor0: '#09a443'
    }
  }
};
theme.categoryAxis.splitLine.show = false;
var dark_default = theme;

// node_modules/echarts/lib/util/ECEventProcessor.js
var ECEventProcessor = (
  /** @class */
  function() {
    function ECEventProcessor2() {
    }
    ECEventProcessor2.prototype.normalizeQuery = function(query) {
      var cptQuery = {};
      var dataQuery = {};
      var otherQuery = {};
      if (isString(query)) {
        var condCptType = parseClassType(query);
        cptQuery.mainType = condCptType.main || null;
        cptQuery.subType = condCptType.sub || null;
      } else {
        var suffixes_1 = ["Index", "Name", "Id"];
        var dataKeys_1 = {
          name: 1,
          dataIndex: 1,
          dataType: 1
        };
        each(query, function(val, key) {
          var reserved = false;
          for (var i = 0; i < suffixes_1.length; i++) {
            var propSuffix = suffixes_1[i];
            var suffixPos = key.lastIndexOf(propSuffix);
            if (suffixPos > 0 && suffixPos === key.length - propSuffix.length) {
              var mainType = key.slice(0, suffixPos);
              if (mainType !== "data") {
                cptQuery.mainType = mainType;
                cptQuery[propSuffix.toLowerCase()] = val;
                reserved = true;
              }
            }
          }
          if (dataKeys_1.hasOwnProperty(key)) {
            dataQuery[key] = val;
            reserved = true;
          }
          if (!reserved) {
            otherQuery[key] = val;
          }
        });
      }
      return {
        cptQuery,
        dataQuery,
        otherQuery
      };
    };
    ECEventProcessor2.prototype.filter = function(eventType, query) {
      var eventInfo = this.eventInfo;
      if (!eventInfo) {
        return true;
      }
      var targetEl = eventInfo.targetEl;
      var packedEvent = eventInfo.packedEvent;
      var model = eventInfo.model;
      var view = eventInfo.view;
      if (!model || !view) {
        return true;
      }
      var cptQuery = query.cptQuery;
      var dataQuery = query.dataQuery;
      return check(cptQuery, model, "mainType") && check(cptQuery, model, "subType") && check(cptQuery, model, "index", "componentIndex") && check(cptQuery, model, "name") && check(cptQuery, model, "id") && check(dataQuery, packedEvent, "name") && check(dataQuery, packedEvent, "dataIndex") && check(dataQuery, packedEvent, "dataType") && (!view.filterForExposedEvent || view.filterForExposedEvent(eventType, query.otherQuery, targetEl, packedEvent));
      function check(query2, host, prop, propOnHost) {
        return query2[prop] == null || host[propOnHost || prop] === query2[prop];
      }
    };
    ECEventProcessor2.prototype.afterTrigger = function() {
      this.eventInfo = null;
    };
    return ECEventProcessor2;
  }()
);

// node_modules/echarts/lib/visual/symbol.js
var SYMBOL_PROPS_WITH_CB = ["symbol", "symbolSize", "symbolRotate", "symbolOffset"];
var SYMBOL_PROPS = SYMBOL_PROPS_WITH_CB.concat(["symbolKeepAspect"]);
var seriesSymbolTask = {
  createOnAllSeries: true,
  // For legend.
  performRawSeries: true,
  reset: function(seriesModel, ecModel) {
    var data = seriesModel.getData();
    if (seriesModel.legendIcon) {
      data.setVisual("legendIcon", seriesModel.legendIcon);
    }
    if (!seriesModel.hasSymbolVisual) {
      return;
    }
    var symbolOptions = {};
    var symbolOptionsCb = {};
    var hasCallback = false;
    for (var i = 0; i < SYMBOL_PROPS_WITH_CB.length; i++) {
      var symbolPropName = SYMBOL_PROPS_WITH_CB[i];
      var val = seriesModel.get(symbolPropName);
      if (isFunction(val)) {
        hasCallback = true;
        symbolOptionsCb[symbolPropName] = val;
      } else {
        symbolOptions[symbolPropName] = val;
      }
    }
    symbolOptions.symbol = symbolOptions.symbol || seriesModel.defaultSymbol;
    data.setVisual(extend({
      legendIcon: seriesModel.legendIcon || symbolOptions.symbol,
      symbolKeepAspect: seriesModel.get("symbolKeepAspect")
    }, symbolOptions));
    if (ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }
    var symbolPropsCb = keys(symbolOptionsCb);
    function dataEach(data2, idx) {
      var rawValue = seriesModel.getRawValue(idx);
      var params = seriesModel.getDataParams(idx);
      for (var i2 = 0; i2 < symbolPropsCb.length; i2++) {
        var symbolPropName2 = symbolPropsCb[i2];
        data2.setItemVisual(idx, symbolPropName2, symbolOptionsCb[symbolPropName2](rawValue, params));
      }
    }
    return {
      dataEach: hasCallback ? dataEach : null
    };
  }
};
var dataSymbolTask = {
  createOnAllSeries: true,
  // For legend.
  performRawSeries: true,
  reset: function(seriesModel, ecModel) {
    if (!seriesModel.hasSymbolVisual) {
      return;
    }
    if (ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }
    var data = seriesModel.getData();
    function dataEach(data2, idx) {
      var itemModel = data2.getItemModel(idx);
      for (var i = 0; i < SYMBOL_PROPS.length; i++) {
        var symbolPropName = SYMBOL_PROPS[i];
        var val = itemModel.getShallow(symbolPropName, true);
        if (val != null) {
          data2.setItemVisual(idx, symbolPropName, val);
        }
      }
    }
    return {
      dataEach: data.hasItemOption ? dataEach : null
    };
  }
};

// node_modules/echarts/lib/visual/helper.js
function getItemVisualFromData(data, dataIndex, key) {
  switch (key) {
    case "color":
      var style = data.getItemVisual(dataIndex, "style");
      return style[data.getVisual("drawType")];
    case "opacity":
      return data.getItemVisual(dataIndex, "style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return data.getItemVisual(dataIndex, key);
    default:
      if (process.env.NODE_ENV !== "production") {
        console.warn("Unknown visual type " + key);
      }
  }
}
function getVisualFromData(data, key) {
  switch (key) {
    case "color":
      var style = data.getVisual("style");
      return style[data.getVisual("drawType")];
    case "opacity":
      return data.getVisual("style").opacity;
    case "symbol":
    case "symbolSize":
    case "liftZ":
      return data.getVisual(key);
    default:
      if (process.env.NODE_ENV !== "production") {
        console.warn("Unknown visual type " + key);
      }
  }
}

// node_modules/echarts/lib/util/event.js
function findEventDispatcher(target, det, returnFirstMatch) {
  var found;
  while (target) {
    if (det(target)) {
      found = target;
      if (returnFirstMatch) {
        break;
      }
    }
    target = target.__hostTarget || target.parent;
  }
  return found;
}

// node_modules/zrender/lib/core/WeakMap.js
var wmUniqueIndex = Math.round(Math.random() * 9);
var supportDefineProperty = typeof Object.defineProperty === "function";
var WeakMap = function() {
  function WeakMap2() {
    this._id = "__ec_inner_" + wmUniqueIndex++;
  }
  WeakMap2.prototype.get = function(key) {
    return this._guard(key)[this._id];
  };
  WeakMap2.prototype.set = function(key, value) {
    var target = this._guard(key);
    if (supportDefineProperty) {
      Object.defineProperty(target, this._id, {
        value,
        enumerable: false,
        configurable: true
      });
    } else {
      target[this._id] = value;
    }
    return this;
  };
  WeakMap2.prototype["delete"] = function(key) {
    if (this.has(key)) {
      delete this._guard(key)[this._id];
      return true;
    }
    return false;
  };
  WeakMap2.prototype.has = function(key) {
    return !!this._guard(key)[this._id];
  };
  WeakMap2.prototype._guard = function(key) {
    if (key !== Object(key)) {
      throw TypeError("Value of WeakMap is not a non-null object.");
    }
    return key;
  };
  return WeakMap2;
}();
var WeakMap_default = WeakMap;

// node_modules/zrender/lib/canvas/helper.js
function isSafeNum(num) {
  return isFinite(num);
}
function createLinearGradient(ctx, obj, rect) {
  var x = obj.x == null ? 0 : obj.x;
  var x2 = obj.x2 == null ? 1 : obj.x2;
  var y = obj.y == null ? 0 : obj.y;
  var y2 = obj.y2 == null ? 0 : obj.y2;
  if (!obj.global) {
    x = x * rect.width + rect.x;
    x2 = x2 * rect.width + rect.x;
    y = y * rect.height + rect.y;
    y2 = y2 * rect.height + rect.y;
  }
  x = isSafeNum(x) ? x : 0;
  x2 = isSafeNum(x2) ? x2 : 1;
  y = isSafeNum(y) ? y : 0;
  y2 = isSafeNum(y2) ? y2 : 0;
  var canvasGradient = ctx.createLinearGradient(x, y, x2, y2);
  return canvasGradient;
}
function createRadialGradient(ctx, obj, rect) {
  var width = rect.width;
  var height = rect.height;
  var min3 = Math.min(width, height);
  var x = obj.x == null ? 0.5 : obj.x;
  var y = obj.y == null ? 0.5 : obj.y;
  var r = obj.r == null ? 0.5 : obj.r;
  if (!obj.global) {
    x = x * width + rect.x;
    y = y * height + rect.y;
    r = r * min3;
  }
  x = isSafeNum(x) ? x : 0.5;
  y = isSafeNum(y) ? y : 0.5;
  r = r >= 0 && isSafeNum(r) ? r : 0.5;
  var canvasGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
  return canvasGradient;
}
function getCanvasGradient(ctx, obj, rect) {
  var canvasGradient = obj.type === "radial" ? createRadialGradient(ctx, obj, rect) : createLinearGradient(ctx, obj, rect);
  var colorStops = obj.colorStops;
  for (var i = 0; i < colorStops.length; i++) {
    canvasGradient.addColorStop(colorStops[i].offset, colorStops[i].color);
  }
  return canvasGradient;
}
function isClipPathChanged(clipPaths, prevClipPaths) {
  if (clipPaths === prevClipPaths || !clipPaths && !prevClipPaths) {
    return false;
  }
  if (!clipPaths || !prevClipPaths || clipPaths.length !== prevClipPaths.length) {
    return true;
  }
  for (var i = 0; i < clipPaths.length; i++) {
    if (clipPaths[i] !== prevClipPaths[i]) {
      return true;
    }
  }
  return false;
}
function parseInt10(val) {
  return parseInt(val, 10);
}
function getSize(root, whIdx, opts) {
  var wh = ["width", "height"][whIdx];
  var cwh = ["clientWidth", "clientHeight"][whIdx];
  var plt = ["paddingLeft", "paddingTop"][whIdx];
  var prb = ["paddingRight", "paddingBottom"][whIdx];
  if (opts[wh] != null && opts[wh] !== "auto") {
    return parseFloat(opts[wh]);
  }
  var stl = document.defaultView.getComputedStyle(root);
  return (root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh])) - (parseInt10(stl[plt]) || 0) - (parseInt10(stl[prb]) || 0) | 0;
}

// node_modules/zrender/lib/canvas/dashStyle.js
function normalizeLineDash(lineType, lineWidth) {
  if (!lineType || lineType === "solid" || !(lineWidth > 0)) {
    return null;
  }
  return lineType === "dashed" ? [4 * lineWidth, 2 * lineWidth] : lineType === "dotted" ? [lineWidth] : isNumber(lineType) ? [lineType] : isArray(lineType) ? lineType : null;
}
function getLineDash(el) {
  var style = el.style;
  var lineDash = style.lineDash && style.lineWidth > 0 && normalizeLineDash(style.lineDash, style.lineWidth);
  var lineDashOffset = style.lineDashOffset;
  if (lineDash) {
    var lineScale_1 = style.strokeNoScale && el.getLineScale ? el.getLineScale() : 1;
    if (lineScale_1 && lineScale_1 !== 1) {
      lineDash = map(lineDash, function(rawVal) {
        return rawVal / lineScale_1;
      });
      lineDashOffset /= lineScale_1;
    }
  }
  return [lineDash, lineDashOffset];
}

// node_modules/zrender/lib/canvas/graphic.js
var pathProxyForDraw = new PathProxy_default(true);
function styleHasStroke(style) {
  var stroke = style.stroke;
  return !(stroke == null || stroke === "none" || !(style.lineWidth > 0));
}
function isValidStrokeFillStyle(strokeOrFill) {
  return typeof strokeOrFill === "string" && strokeOrFill !== "none";
}
function styleHasFill(style) {
  var fill = style.fill;
  return fill != null && fill !== "none";
}
function doFillPath(ctx, style) {
  if (style.fillOpacity != null && style.fillOpacity !== 1) {
    var originalGlobalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = style.fillOpacity * style.opacity;
    ctx.fill();
    ctx.globalAlpha = originalGlobalAlpha;
  } else {
    ctx.fill();
  }
}
function doStrokePath(ctx, style) {
  if (style.strokeOpacity != null && style.strokeOpacity !== 1) {
    var originalGlobalAlpha = ctx.globalAlpha;
    ctx.globalAlpha = style.strokeOpacity * style.opacity;
    ctx.stroke();
    ctx.globalAlpha = originalGlobalAlpha;
  } else {
    ctx.stroke();
  }
}
function createCanvasPattern(ctx, pattern, el) {
  var image = createOrUpdateImage(pattern.image, pattern.__image, el);
  if (isImageReady(image)) {
    var canvasPattern = ctx.createPattern(image, pattern.repeat || "repeat");
    if (typeof DOMMatrix === "function" && canvasPattern && canvasPattern.setTransform) {
      var matrix = new DOMMatrix();
      matrix.translateSelf(pattern.x || 0, pattern.y || 0);
      matrix.rotateSelf(0, 0, (pattern.rotation || 0) * RADIAN_TO_DEGREE);
      matrix.scaleSelf(pattern.scaleX || 1, pattern.scaleY || 1);
      canvasPattern.setTransform(matrix);
    }
    return canvasPattern;
  }
}
function brushPath(ctx, el, style, inBatch) {
  var _a2;
  var hasStroke = styleHasStroke(style);
  var hasFill = styleHasFill(style);
  var strokePercent = style.strokePercent;
  var strokePart = strokePercent < 1;
  var firstDraw = !el.path;
  if ((!el.silent || strokePart) && firstDraw) {
    el.createPathProxy();
  }
  var path3 = el.path || pathProxyForDraw;
  var dirtyFlag = el.__dirty;
  if (!inBatch) {
    var fill = style.fill;
    var stroke = style.stroke;
    var hasFillGradient = hasFill && !!fill.colorStops;
    var hasStrokeGradient = hasStroke && !!stroke.colorStops;
    var hasFillPattern = hasFill && !!fill.image;
    var hasStrokePattern = hasStroke && !!stroke.image;
    var fillGradient = void 0;
    var strokeGradient = void 0;
    var fillPattern = void 0;
    var strokePattern = void 0;
    var rect = void 0;
    if (hasFillGradient || hasStrokeGradient) {
      rect = el.getBoundingRect();
    }
    if (hasFillGradient) {
      fillGradient = dirtyFlag ? getCanvasGradient(ctx, fill, rect) : el.__canvasFillGradient;
      el.__canvasFillGradient = fillGradient;
    }
    if (hasStrokeGradient) {
      strokeGradient = dirtyFlag ? getCanvasGradient(ctx, stroke, rect) : el.__canvasStrokeGradient;
      el.__canvasStrokeGradient = strokeGradient;
    }
    if (hasFillPattern) {
      fillPattern = dirtyFlag || !el.__canvasFillPattern ? createCanvasPattern(ctx, fill, el) : el.__canvasFillPattern;
      el.__canvasFillPattern = fillPattern;
    }
    if (hasStrokePattern) {
      strokePattern = dirtyFlag || !el.__canvasStrokePattern ? createCanvasPattern(ctx, stroke, el) : el.__canvasStrokePattern;
      el.__canvasStrokePattern = fillPattern;
    }
    if (hasFillGradient) {
      ctx.fillStyle = fillGradient;
    } else if (hasFillPattern) {
      if (fillPattern) {
        ctx.fillStyle = fillPattern;
      } else {
        hasFill = false;
      }
    }
    if (hasStrokeGradient) {
      ctx.strokeStyle = strokeGradient;
    } else if (hasStrokePattern) {
      if (strokePattern) {
        ctx.strokeStyle = strokePattern;
      } else {
        hasStroke = false;
      }
    }
  }
  var scale3 = el.getGlobalScale();
  path3.setScale(scale3[0], scale3[1], el.segmentIgnoreThreshold);
  var lineDash;
  var lineDashOffset;
  if (ctx.setLineDash && style.lineDash) {
    _a2 = getLineDash(el), lineDash = _a2[0], lineDashOffset = _a2[1];
  }
  var needsRebuild = true;
  if (firstDraw || dirtyFlag & SHAPE_CHANGED_BIT) {
    path3.setDPR(ctx.dpr);
    if (strokePart) {
      path3.setContext(null);
    } else {
      path3.setContext(ctx);
      needsRebuild = false;
    }
    path3.reset();
    el.buildPath(path3, el.shape, inBatch);
    path3.toStatic();
    el.pathUpdated();
  }
  if (needsRebuild) {
    path3.rebuildPath(ctx, strokePart ? strokePercent : 1);
  }
  if (lineDash) {
    ctx.setLineDash(lineDash);
    ctx.lineDashOffset = lineDashOffset;
  }
  if (!inBatch) {
    if (style.strokeFirst) {
      if (hasStroke) {
        doStrokePath(ctx, style);
      }
      if (hasFill) {
        doFillPath(ctx, style);
      }
    } else {
      if (hasFill) {
        doFillPath(ctx, style);
      }
      if (hasStroke) {
        doStrokePath(ctx, style);
      }
    }
  }
  if (lineDash) {
    ctx.setLineDash([]);
  }
}
function brushImage(ctx, el, style) {
  var image = el.__image = createOrUpdateImage(style.image, el.__image, el, el.onload);
  if (!image || !isImageReady(image)) {
    return;
  }
  var x = style.x || 0;
  var y = style.y || 0;
  var width = el.getWidth();
  var height = el.getHeight();
  var aspect = image.width / image.height;
  if (width == null && height != null) {
    width = height * aspect;
  } else if (height == null && width != null) {
    height = width / aspect;
  } else if (width == null && height == null) {
    width = image.width;
    height = image.height;
  }
  if (style.sWidth && style.sHeight) {
    var sx = style.sx || 0;
    var sy = style.sy || 0;
    ctx.drawImage(image, sx, sy, style.sWidth, style.sHeight, x, y, width, height);
  } else if (style.sx && style.sy) {
    var sx = style.sx;
    var sy = style.sy;
    var sWidth = width - sx;
    var sHeight = height - sy;
    ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
  } else {
    ctx.drawImage(image, x, y, width, height);
  }
}
function brushText(ctx, el, style) {
  var _a2;
  var text = style.text;
  text != null && (text += "");
  if (text) {
    ctx.font = style.font || DEFAULT_FONT;
    ctx.textAlign = style.textAlign;
    ctx.textBaseline = style.textBaseline;
    var lineDash = void 0;
    var lineDashOffset = void 0;
    if (ctx.setLineDash && style.lineDash) {
      _a2 = getLineDash(el), lineDash = _a2[0], lineDashOffset = _a2[1];
    }
    if (lineDash) {
      ctx.setLineDash(lineDash);
      ctx.lineDashOffset = lineDashOffset;
    }
    if (style.strokeFirst) {
      if (styleHasStroke(style)) {
        ctx.strokeText(text, style.x, style.y);
      }
      if (styleHasFill(style)) {
        ctx.fillText(text, style.x, style.y);
      }
    } else {
      if (styleHasFill(style)) {
        ctx.fillText(text, style.x, style.y);
      }
      if (styleHasStroke(style)) {
        ctx.strokeText(text, style.x, style.y);
      }
    }
    if (lineDash) {
      ctx.setLineDash([]);
    }
  }
}
var SHADOW_NUMBER_PROPS = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"];
var STROKE_PROPS = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function bindCommonProps(ctx, style, prevStyle, forceSetAll, scope) {
  var styleChanged = false;
  if (!forceSetAll) {
    prevStyle = prevStyle || {};
    if (style === prevStyle) {
      return false;
    }
  }
  if (forceSetAll || style.opacity !== prevStyle.opacity) {
    flushPathDrawn(ctx, scope);
    styleChanged = true;
    var opacity = Math.max(Math.min(style.opacity, 1), 0);
    ctx.globalAlpha = isNaN(opacity) ? DEFAULT_COMMON_STYLE.opacity : opacity;
  }
  if (forceSetAll || style.blend !== prevStyle.blend) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    ctx.globalCompositeOperation = style.blend || DEFAULT_COMMON_STYLE.blend;
  }
  for (var i = 0; i < SHADOW_NUMBER_PROPS.length; i++) {
    var propName = SHADOW_NUMBER_PROPS[i];
    if (forceSetAll || style[propName] !== prevStyle[propName]) {
      if (!styleChanged) {
        flushPathDrawn(ctx, scope);
        styleChanged = true;
      }
      ctx[propName] = ctx.dpr * (style[propName] || 0);
    }
  }
  if (forceSetAll || style.shadowColor !== prevStyle.shadowColor) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    ctx.shadowColor = style.shadowColor || DEFAULT_COMMON_STYLE.shadowColor;
  }
  return styleChanged;
}
function bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetAll, scope) {
  var style = getStyle(el, scope.inHover);
  var prevStyle = forceSetAll ? null : prevEl && getStyle(prevEl, scope.inHover) || {};
  if (style === prevStyle) {
    return false;
  }
  var styleChanged = bindCommonProps(ctx, style, prevStyle, forceSetAll, scope);
  if (forceSetAll || style.fill !== prevStyle.fill) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    isValidStrokeFillStyle(style.fill) && (ctx.fillStyle = style.fill);
  }
  if (forceSetAll || style.stroke !== prevStyle.stroke) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    isValidStrokeFillStyle(style.stroke) && (ctx.strokeStyle = style.stroke);
  }
  if (forceSetAll || style.opacity !== prevStyle.opacity) {
    if (!styleChanged) {
      flushPathDrawn(ctx, scope);
      styleChanged = true;
    }
    ctx.globalAlpha = style.opacity == null ? 1 : style.opacity;
  }
  if (el.hasStroke()) {
    var lineWidth = style.lineWidth;
    var newLineWidth = lineWidth / (style.strokeNoScale && el.getLineScale ? el.getLineScale() : 1);
    if (ctx.lineWidth !== newLineWidth) {
      if (!styleChanged) {
        flushPathDrawn(ctx, scope);
        styleChanged = true;
      }
      ctx.lineWidth = newLineWidth;
    }
  }
  for (var i = 0; i < STROKE_PROPS.length; i++) {
    var prop = STROKE_PROPS[i];
    var propName = prop[0];
    if (forceSetAll || style[propName] !== prevStyle[propName]) {
      if (!styleChanged) {
        flushPathDrawn(ctx, scope);
        styleChanged = true;
      }
      ctx[propName] = style[propName] || prop[1];
    }
  }
  return styleChanged;
}
function bindImageStyle(ctx, el, prevEl, forceSetAll, scope) {
  return bindCommonProps(ctx, getStyle(el, scope.inHover), prevEl && getStyle(prevEl, scope.inHover), forceSetAll, scope);
}
function setContextTransform(ctx, el) {
  var m = el.transform;
  var dpr2 = ctx.dpr || 1;
  if (m) {
    ctx.setTransform(dpr2 * m[0], dpr2 * m[1], dpr2 * m[2], dpr2 * m[3], dpr2 * m[4], dpr2 * m[5]);
  } else {
    ctx.setTransform(dpr2, 0, 0, dpr2, 0, 0);
  }
}
function updateClipStatus(clipPaths, ctx, scope) {
  var allClipped = false;
  for (var i = 0; i < clipPaths.length; i++) {
    var clipPath = clipPaths[i];
    allClipped = allClipped || clipPath.isZeroArea();
    setContextTransform(ctx, clipPath);
    ctx.beginPath();
    clipPath.buildPath(ctx, clipPath.shape);
    ctx.clip();
  }
  scope.allClipped = allClipped;
}
function isTransformChanged(m0, m1) {
  if (m0 && m1) {
    return m0[0] !== m1[0] || m0[1] !== m1[1] || m0[2] !== m1[2] || m0[3] !== m1[3] || m0[4] !== m1[4] || m0[5] !== m1[5];
  } else if (!m0 && !m1) {
    return false;
  }
  return true;
}
var DRAW_TYPE_PATH = 1;
var DRAW_TYPE_IMAGE = 2;
var DRAW_TYPE_TEXT = 3;
var DRAW_TYPE_INCREMENTAL = 4;
function canPathBatch(style) {
  var hasFill = styleHasFill(style);
  var hasStroke = styleHasStroke(style);
  return !(style.lineDash || !(+hasFill ^ +hasStroke) || hasFill && typeof style.fill !== "string" || hasStroke && typeof style.stroke !== "string" || style.strokePercent < 1 || style.strokeOpacity < 1 || style.fillOpacity < 1);
}
function flushPathDrawn(ctx, scope) {
  scope.batchFill && ctx.fill();
  scope.batchStroke && ctx.stroke();
  scope.batchFill = "";
  scope.batchStroke = "";
}
function getStyle(el, inHover) {
  return inHover ? el.__hoverStyle || el.style : el.style;
}
function brushSingle(ctx, el) {
  brush(ctx, el, { inHover: false, viewWidth: 0, viewHeight: 0 }, true);
}
function brush(ctx, el, scope, isLast) {
  var m = el.transform;
  if (!el.shouldBePainted(scope.viewWidth, scope.viewHeight, false, false)) {
    el.__dirty &= ~REDRAW_BIT;
    el.__isRendered = false;
    return;
  }
  var clipPaths = el.__clipPaths;
  var prevElClipPaths = scope.prevElClipPaths;
  var forceSetTransform = false;
  var forceSetStyle = false;
  if (!prevElClipPaths || isClipPathChanged(clipPaths, prevElClipPaths)) {
    if (prevElClipPaths && prevElClipPaths.length) {
      flushPathDrawn(ctx, scope);
      ctx.restore();
      forceSetStyle = forceSetTransform = true;
      scope.prevElClipPaths = null;
      scope.allClipped = false;
      scope.prevEl = null;
    }
    if (clipPaths && clipPaths.length) {
      flushPathDrawn(ctx, scope);
      ctx.save();
      updateClipStatus(clipPaths, ctx, scope);
      forceSetTransform = true;
    }
    scope.prevElClipPaths = clipPaths;
  }
  if (scope.allClipped) {
    el.__isRendered = false;
    return;
  }
  el.beforeBrush && el.beforeBrush();
  el.innerBeforeBrush();
  var prevEl = scope.prevEl;
  if (!prevEl) {
    forceSetStyle = forceSetTransform = true;
  }
  var canBatchPath = el instanceof Path_default && el.autoBatch && canPathBatch(el.style);
  if (forceSetTransform || isTransformChanged(m, prevEl.transform)) {
    flushPathDrawn(ctx, scope);
    setContextTransform(ctx, el);
  } else if (!canBatchPath) {
    flushPathDrawn(ctx, scope);
  }
  var style = getStyle(el, scope.inHover);
  if (el instanceof Path_default) {
    if (scope.lastDrawType !== DRAW_TYPE_PATH) {
      forceSetStyle = true;
      scope.lastDrawType = DRAW_TYPE_PATH;
    }
    bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetStyle, scope);
    if (!canBatchPath || !scope.batchFill && !scope.batchStroke) {
      ctx.beginPath();
    }
    brushPath(ctx, el, style, canBatchPath);
    if (canBatchPath) {
      scope.batchFill = style.fill || "";
      scope.batchStroke = style.stroke || "";
    }
  } else {
    if (el instanceof TSpan_default) {
      if (scope.lastDrawType !== DRAW_TYPE_TEXT) {
        forceSetStyle = true;
        scope.lastDrawType = DRAW_TYPE_TEXT;
      }
      bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetStyle, scope);
      brushText(ctx, el, style);
    } else if (el instanceof Image_default) {
      if (scope.lastDrawType !== DRAW_TYPE_IMAGE) {
        forceSetStyle = true;
        scope.lastDrawType = DRAW_TYPE_IMAGE;
      }
      bindImageStyle(ctx, el, prevEl, forceSetStyle, scope);
      brushImage(ctx, el, style);
    } else if (el.getTemporalDisplayables) {
      if (scope.lastDrawType !== DRAW_TYPE_INCREMENTAL) {
        forceSetStyle = true;
        scope.lastDrawType = DRAW_TYPE_INCREMENTAL;
      }
      brushIncremental(ctx, el, scope);
    }
  }
  if (canBatchPath && isLast) {
    flushPathDrawn(ctx, scope);
  }
  el.innerAfterBrush();
  el.afterBrush && el.afterBrush();
  scope.prevEl = el;
  el.__dirty = 0;
  el.__isRendered = true;
}
function brushIncremental(ctx, el, scope) {
  var displayables = el.getDisplayables();
  var temporalDisplayables = el.getTemporalDisplayables();
  ctx.save();
  var innerScope = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: false,
    viewWidth: scope.viewWidth,
    viewHeight: scope.viewHeight,
    inHover: scope.inHover
  };
  var i;
  var len2;
  for (i = el.getCursor(), len2 = displayables.length; i < len2; i++) {
    var displayable = displayables[i];
    displayable.beforeBrush && displayable.beforeBrush();
    displayable.innerBeforeBrush();
    brush(ctx, displayable, innerScope, i === len2 - 1);
    displayable.innerAfterBrush();
    displayable.afterBrush && displayable.afterBrush();
    innerScope.prevEl = displayable;
  }
  for (var i_1 = 0, len_1 = temporalDisplayables.length; i_1 < len_1; i_1++) {
    var displayable = temporalDisplayables[i_1];
    displayable.beforeBrush && displayable.beforeBrush();
    displayable.innerBeforeBrush();
    brush(ctx, displayable, innerScope, i_1 === len_1 - 1);
    displayable.innerAfterBrush();
    displayable.afterBrush && displayable.afterBrush();
    innerScope.prevEl = displayable;
  }
  el.clearTemporalDisplayables();
  el.notClear = true;
  ctx.restore();
}

// node_modules/echarts/lib/util/decal.js
var decalMap = new WeakMap_default();
var decalCache = new LRU_default(100);
var decalKeys = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function createOrUpdatePatternFromDecal(decalObject, api) {
  if (decalObject === "none") {
    return null;
  }
  var dpr2 = api.getDevicePixelRatio();
  var zr = api.getZr();
  var isSVG = zr.painter.type === "svg";
  if (decalObject.dirty) {
    decalMap["delete"](decalObject);
  }
  var oldPattern = decalMap.get(decalObject);
  if (oldPattern) {
    return oldPattern;
  }
  var decalOpt = defaults(decalObject, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: true,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });
  if (decalOpt.backgroundColor === "none") {
    decalOpt.backgroundColor = null;
  }
  var pattern = {
    repeat: "repeat"
  };
  setPatternnSource(pattern);
  pattern.rotation = decalOpt.rotation;
  pattern.scaleX = pattern.scaleY = isSVG ? 1 : 1 / dpr2;
  decalMap.set(decalObject, pattern);
  decalObject.dirty = false;
  return pattern;
  function setPatternnSource(pattern2) {
    var keys2 = [dpr2];
    var isValidKey = true;
    for (var i = 0; i < decalKeys.length; ++i) {
      var value = decalOpt[decalKeys[i]];
      if (value != null && !isArray(value) && !isString(value) && !isNumber(value) && typeof value !== "boolean") {
        isValidKey = false;
        break;
      }
      keys2.push(value);
    }
    var cacheKey;
    if (isValidKey) {
      cacheKey = keys2.join(",") + (isSVG ? "-svg" : "");
      var cache = decalCache.get(cacheKey);
      if (cache) {
        isSVG ? pattern2.svgElement = cache : pattern2.image = cache;
      }
    }
    var dashArrayX = normalizeDashArrayX(decalOpt.dashArrayX);
    var dashArrayY = normalizeDashArrayY(decalOpt.dashArrayY);
    var symbolArray = normalizeSymbolArray(decalOpt.symbol);
    var lineBlockLengthsX = getLineBlockLengthX(dashArrayX);
    var lineBlockLengthY = getLineBlockLengthY(dashArrayY);
    var canvas = !isSVG && platformApi.createCanvas();
    var svgRoot = isSVG && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    };
    var pSize = getPatternSize();
    var ctx;
    if (canvas) {
      canvas.width = pSize.width * dpr2;
      canvas.height = pSize.height * dpr2;
      ctx = canvas.getContext("2d");
    }
    brushDecal();
    if (isValidKey) {
      decalCache.put(cacheKey, canvas || svgRoot);
    }
    pattern2.image = canvas;
    pattern2.svgElement = svgRoot;
    pattern2.svgWidth = pSize.width;
    pattern2.svgHeight = pSize.height;
    function getPatternSize() {
      var width = 1;
      for (var i2 = 0, xlen = lineBlockLengthsX.length; i2 < xlen; ++i2) {
        width = getLeastCommonMultiple(width, lineBlockLengthsX[i2]);
      }
      var symbolRepeats = 1;
      for (var i2 = 0, xlen = symbolArray.length; i2 < xlen; ++i2) {
        symbolRepeats = getLeastCommonMultiple(symbolRepeats, symbolArray[i2].length);
      }
      width *= symbolRepeats;
      var height = lineBlockLengthY * lineBlockLengthsX.length * symbolArray.length;
      if (process.env.NODE_ENV !== "production") {
        var warn2 = function(attrName) {
          console.warn("Calculated decal size is greater than " + attrName + " due to decal option settings so " + attrName + " is used for the decal size. Please consider changing the decal option to make a smaller decal or set " + attrName + " to be larger to avoid incontinuity.");
        };
        if (width > decalOpt.maxTileWidth) {
          warn2("maxTileWidth");
        }
        if (height > decalOpt.maxTileHeight) {
          warn2("maxTileHeight");
        }
      }
      return {
        width: Math.max(1, Math.min(width, decalOpt.maxTileWidth)),
        height: Math.max(1, Math.min(height, decalOpt.maxTileHeight))
      };
    }
    function brushDecal() {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (decalOpt.backgroundColor) {
          ctx.fillStyle = decalOpt.backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      var ySum = 0;
      for (var i2 = 0; i2 < dashArrayY.length; ++i2) {
        ySum += dashArrayY[i2];
      }
      if (ySum <= 0) {
        return;
      }
      var y = -lineBlockLengthY;
      var yId = 0;
      var yIdTotal = 0;
      var xId0 = 0;
      while (y < pSize.height) {
        if (yId % 2 === 0) {
          var symbolYId = yIdTotal / 2 % symbolArray.length;
          var x = 0;
          var xId1 = 0;
          var xId1Total = 0;
          while (x < pSize.width * 2) {
            var xSum = 0;
            for (var i2 = 0; i2 < dashArrayX[xId0].length; ++i2) {
              xSum += dashArrayX[xId0][i2];
            }
            if (xSum <= 0) {
              break;
            }
            if (xId1 % 2 === 0) {
              var size = (1 - decalOpt.symbolSize) * 0.5;
              var left = x + dashArrayX[xId0][xId1] * size;
              var top_1 = y + dashArrayY[yId] * size;
              var width = dashArrayX[xId0][xId1] * decalOpt.symbolSize;
              var height = dashArrayY[yId] * decalOpt.symbolSize;
              var symbolXId = xId1Total / 2 % symbolArray[symbolYId].length;
              brushSymbol(left, top_1, width, height, symbolArray[symbolYId][symbolXId]);
            }
            x += dashArrayX[xId0][xId1];
            ++xId1Total;
            ++xId1;
            if (xId1 === dashArrayX[xId0].length) {
              xId1 = 0;
            }
          }
          ++xId0;
          if (xId0 === dashArrayX.length) {
            xId0 = 0;
          }
        }
        y += dashArrayY[yId];
        ++yIdTotal;
        ++yId;
        if (yId === dashArrayY.length) {
          yId = 0;
        }
      }
      function brushSymbol(x2, y2, width2, height2, symbolType) {
        var scale3 = isSVG ? 1 : dpr2;
        var symbol = createSymbol(symbolType, x2 * scale3, y2 * scale3, width2 * scale3, height2 * scale3, decalOpt.color, decalOpt.symbolKeepAspect);
        if (isSVG) {
          var symbolVNode = zr.painter.renderOneToVNode(symbol);
          if (symbolVNode) {
            svgRoot.children.push(symbolVNode);
          }
        } else {
          brushSingle(ctx, symbol);
        }
      }
    }
  }
}
function normalizeSymbolArray(symbol) {
  if (!symbol || symbol.length === 0) {
    return [["rect"]];
  }
  if (isString(symbol)) {
    return [[symbol]];
  }
  var isAllString = true;
  for (var i = 0; i < symbol.length; ++i) {
    if (!isString(symbol[i])) {
      isAllString = false;
      break;
    }
  }
  if (isAllString) {
    return normalizeSymbolArray([symbol]);
  }
  var result = [];
  for (var i = 0; i < symbol.length; ++i) {
    if (isString(symbol[i])) {
      result.push([symbol[i]]);
    } else {
      result.push(symbol[i]);
    }
  }
  return result;
}
function normalizeDashArrayX(dash) {
  if (!dash || dash.length === 0) {
    return [[0, 0]];
  }
  if (isNumber(dash)) {
    var dashValue = Math.ceil(dash);
    return [[dashValue, dashValue]];
  }
  var isAllNumber = true;
  for (var i = 0; i < dash.length; ++i) {
    if (!isNumber(dash[i])) {
      isAllNumber = false;
      break;
    }
  }
  if (isAllNumber) {
    return normalizeDashArrayX([dash]);
  }
  var result = [];
  for (var i = 0; i < dash.length; ++i) {
    if (isNumber(dash[i])) {
      var dashValue = Math.ceil(dash[i]);
      result.push([dashValue, dashValue]);
    } else {
      var dashValue = map(dash[i], function(n) {
        return Math.ceil(n);
      });
      if (dashValue.length % 2 === 1) {
        result.push(dashValue.concat(dashValue));
      } else {
        result.push(dashValue);
      }
    }
  }
  return result;
}
function normalizeDashArrayY(dash) {
  if (!dash || typeof dash === "object" && dash.length === 0) {
    return [0, 0];
  }
  if (isNumber(dash)) {
    var dashValue_1 = Math.ceil(dash);
    return [dashValue_1, dashValue_1];
  }
  var dashValue = map(dash, function(n) {
    return Math.ceil(n);
  });
  return dash.length % 2 ? dashValue.concat(dashValue) : dashValue;
}
function getLineBlockLengthX(dash) {
  return map(dash, function(line) {
    return getLineBlockLengthY(line);
  });
}
function getLineBlockLengthY(dash) {
  var blockLength = 0;
  for (var i = 0; i < dash.length; ++i) {
    blockLength += dash[i];
  }
  if (dash.length % 2 === 1) {
    return blockLength * 2;
  }
  return blockLength;
}

// node_modules/echarts/lib/visual/decal.js
function decalVisual(ecModel, api) {
  ecModel.eachRawSeries(function(seriesModel) {
    if (ecModel.isSeriesFiltered(seriesModel)) {
      return;
    }
    var data = seriesModel.getData();
    if (data.hasItemVisual()) {
      data.each(function(idx) {
        var decal2 = data.getItemVisual(idx, "decal");
        if (decal2) {
          var itemStyle = data.ensureUniqueItemVisual(idx, "style");
          itemStyle.decal = createOrUpdatePatternFromDecal(decal2, api);
        }
      });
    }
    var decal = data.getVisual("decal");
    if (decal) {
      var style = data.getVisual("style");
      style.decal = createOrUpdatePatternFromDecal(decal, api);
    }
  });
}

// node_modules/echarts/lib/core/lifecycle.js
var lifecycle = new Eventful_default();
var lifecycle_default = lifecycle;

// node_modules/echarts/lib/core/impl.js
var implsStore = {};
function registerImpl(name, impl) {
  if (process.env.NODE_ENV !== "production") {
    if (implsStore[name]) {
      error("Already has an implementation of " + name + ".");
    }
  }
  implsStore[name] = impl;
}
function getImpl(name) {
  if (process.env.NODE_ENV !== "production") {
    if (!implsStore[name]) {
      error("Implementation of " + name + " doesn't exists.");
    }
  }
  return implsStore[name];
}

// node_modules/echarts/lib/core/echarts.js
var TEST_FRAME_REMAIN_TIME = 1;
var PRIORITY_PROCESSOR_SERIES_FILTER = 800;
var PRIORITY_PROCESSOR_DATASTACK = 900;
var PRIORITY_PROCESSOR_FILTER = 1e3;
var PRIORITY_PROCESSOR_DEFAULT = 2e3;
var PRIORITY_PROCESSOR_STATISTIC = 5e3;
var PRIORITY_VISUAL_LAYOUT = 1e3;
var PRIORITY_VISUAL_PROGRESSIVE_LAYOUT = 1100;
var PRIORITY_VISUAL_GLOBAL = 2e3;
var PRIORITY_VISUAL_CHART = 3e3;
var PRIORITY_VISUAL_COMPONENT = 4e3;
var PRIORITY_VISUAL_CHART_DATA_CUSTOM = 4500;
var PRIORITY_VISUAL_POST_CHART_LAYOUT = 4600;
var PRIORITY_VISUAL_BRUSH = 5e3;
var PRIORITY_VISUAL_ARIA = 6e3;
var PRIORITY_VISUAL_DECAL = 7e3;
var PRIORITY = {
  PROCESSOR: {
    FILTER: PRIORITY_PROCESSOR_FILTER,
    SERIES_FILTER: PRIORITY_PROCESSOR_SERIES_FILTER,
    STATISTIC: PRIORITY_PROCESSOR_STATISTIC
  },
  VISUAL: {
    LAYOUT: PRIORITY_VISUAL_LAYOUT,
    PROGRESSIVE_LAYOUT: PRIORITY_VISUAL_PROGRESSIVE_LAYOUT,
    GLOBAL: PRIORITY_VISUAL_GLOBAL,
    CHART: PRIORITY_VISUAL_CHART,
    POST_CHART_LAYOUT: PRIORITY_VISUAL_POST_CHART_LAYOUT,
    COMPONENT: PRIORITY_VISUAL_COMPONENT,
    BRUSH: PRIORITY_VISUAL_BRUSH,
    CHART_ITEM: PRIORITY_VISUAL_CHART_DATA_CUSTOM,
    ARIA: PRIORITY_VISUAL_ARIA,
    DECAL: PRIORITY_VISUAL_DECAL
  }
};
var IN_MAIN_PROCESS_KEY = "__flagInMainProcess";
var PENDING_UPDATE = "__pendingUpdate";
var STATUS_NEEDS_UPDATE_KEY = "__needsUpdateStatus";
var ACTION_REG = /^[a-zA-Z0-9_]+$/;
var CONNECT_STATUS_KEY = "__connectUpdateStatus";
var CONNECT_STATUS_PENDING = 0;
var CONNECT_STATUS_UPDATING = 1;
var CONNECT_STATUS_UPDATED = 2;
function createRegisterEventWithLowercaseECharts(method) {
  return function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (this.isDisposed()) {
      disposedWarning(this.id);
      return;
    }
    return toLowercaseNameAndCallEventful(this, method, args);
  };
}
function createRegisterEventWithLowercaseMessageCenter(method) {
  return function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return toLowercaseNameAndCallEventful(this, method, args);
  };
}
function toLowercaseNameAndCallEventful(host, method, args) {
  args[0] = args[0] && args[0].toLowerCase();
  return Eventful_default.prototype[method].apply(host, args);
}
var MessageCenter = (
  /** @class */
  function(_super) {
    __extends(MessageCenter2, _super);
    function MessageCenter2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    return MessageCenter2;
  }(Eventful_default)
);
var messageCenterProto = MessageCenter.prototype;
messageCenterProto.on = createRegisterEventWithLowercaseMessageCenter("on");
messageCenterProto.off = createRegisterEventWithLowercaseMessageCenter("off");
var prepare;
var prepareView;
var updateDirectly;
var updateMethods;
var doConvertPixel;
var updateStreamModes;
var doDispatchAction;
var flushPendingActions;
var triggerUpdatedEvent;
var bindRenderedEvent;
var bindMouseEvent;
var render;
var renderComponents;
var renderSeries;
var createExtensionAPI;
var enableConnect;
var markStatusToUpdate;
var applyChangedStates;
var ECharts = (
  /** @class */
  function(_super) {
    __extends(ECharts2, _super);
    function ECharts2(dom, theme2, opts) {
      var _this = _super.call(this, new ECEventProcessor()) || this;
      _this._chartsViews = [];
      _this._chartsMap = {};
      _this._componentsViews = [];
      _this._componentsMap = {};
      _this._pendingActions = [];
      opts = opts || {};
      if (isString(theme2)) {
        theme2 = themeStorage[theme2];
      }
      _this._dom = dom;
      var defaultRenderer = "canvas";
      var defaultCoarsePointer = "auto";
      var defaultUseDirtyRect = false;
      if (process.env.NODE_ENV !== "production") {
        var root = (
          /* eslint-disable-next-line */
          env_default.hasGlobalWindow ? window : global
        );
        if (root) {
          defaultRenderer = retrieve2(root.__ECHARTS__DEFAULT__RENDERER__, defaultRenderer);
          defaultCoarsePointer = retrieve2(root.__ECHARTS__DEFAULT__COARSE_POINTER, defaultCoarsePointer);
          defaultUseDirtyRect = retrieve2(root.__ECHARTS__DEFAULT__USE_DIRTY_RECT__, defaultUseDirtyRect);
        }
      }
      if (opts.ssr) {
        registerSSRDataGetter(function(el) {
          var ecData = getECData(el);
          var dataIndex = ecData.dataIndex;
          if (dataIndex == null) {
            return;
          }
          var hashMap = createHashMap();
          hashMap.set("series_index", ecData.seriesIndex);
          hashMap.set("data_index", dataIndex);
          ecData.ssrType && hashMap.set("ssr_type", ecData.ssrType);
          return hashMap;
        });
      }
      var zr = _this._zr = init(dom, {
        renderer: opts.renderer || defaultRenderer,
        devicePixelRatio: opts.devicePixelRatio,
        width: opts.width,
        height: opts.height,
        ssr: opts.ssr,
        useDirtyRect: retrieve2(opts.useDirtyRect, defaultUseDirtyRect),
        useCoarsePointer: retrieve2(opts.useCoarsePointer, defaultCoarsePointer),
        pointerSize: opts.pointerSize
      });
      _this._ssr = opts.ssr;
      _this._throttledZrFlush = throttle(bind(zr.flush, zr), 17);
      theme2 = clone(theme2);
      theme2 && globalBackwardCompat(theme2, true);
      _this._theme = theme2;
      _this._locale = createLocaleObject(opts.locale || SYSTEM_LANG);
      _this._coordSysMgr = new CoordinateSystem_default();
      var api = _this._api = createExtensionAPI(_this);
      function prioritySortFunc(a, b) {
        return a.__prio - b.__prio;
      }
      sort(visualFuncs, prioritySortFunc);
      sort(dataProcessorFuncs, prioritySortFunc);
      _this._scheduler = new Scheduler_default(_this, api, dataProcessorFuncs, visualFuncs);
      _this._messageCenter = new MessageCenter();
      _this._initEvents();
      _this.resize = bind(_this.resize, _this);
      zr.animation.on("frame", _this._onframe, _this);
      bindRenderedEvent(zr, _this);
      bindMouseEvent(zr, _this);
      setAsPrimitive(_this);
      return _this;
    }
    ECharts2.prototype._onframe = function() {
      if (this._disposed) {
        return;
      }
      applyChangedStates(this);
      var scheduler = this._scheduler;
      if (this[PENDING_UPDATE]) {
        var silent = this[PENDING_UPDATE].silent;
        this[IN_MAIN_PROCESS_KEY] = true;
        try {
          prepare(this);
          updateMethods.update.call(this, null, this[PENDING_UPDATE].updateParams);
        } catch (e2) {
          this[IN_MAIN_PROCESS_KEY] = false;
          this[PENDING_UPDATE] = null;
          throw e2;
        }
        this._zr.flush();
        this[IN_MAIN_PROCESS_KEY] = false;
        this[PENDING_UPDATE] = null;
        flushPendingActions.call(this, silent);
        triggerUpdatedEvent.call(this, silent);
      } else if (scheduler.unfinished) {
        var remainTime = TEST_FRAME_REMAIN_TIME;
        var ecModel = this._model;
        var api = this._api;
        scheduler.unfinished = false;
        do {
          var startTime = +/* @__PURE__ */ new Date();
          scheduler.performSeriesTasks(ecModel);
          scheduler.performDataProcessorTasks(ecModel);
          updateStreamModes(this, ecModel);
          scheduler.performVisualTasks(ecModel);
          renderSeries(this, this._model, api, "remain", {});
          remainTime -= +/* @__PURE__ */ new Date() - startTime;
        } while (remainTime > 0 && scheduler.unfinished);
        if (!scheduler.unfinished) {
          this._zr.flush();
        }
      }
    };
    ECharts2.prototype.getDom = function() {
      return this._dom;
    };
    ECharts2.prototype.getId = function() {
      return this.id;
    };
    ECharts2.prototype.getZr = function() {
      return this._zr;
    };
    ECharts2.prototype.isSSR = function() {
      return this._ssr;
    };
    ECharts2.prototype.setOption = function(option, notMerge, lazyUpdate) {
      if (this[IN_MAIN_PROCESS_KEY]) {
        if (process.env.NODE_ENV !== "production") {
          error("`setOption` should not be called during main process.");
        }
        return;
      }
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      var silent;
      var replaceMerge;
      var transitionOpt;
      if (isObject(notMerge)) {
        lazyUpdate = notMerge.lazyUpdate;
        silent = notMerge.silent;
        replaceMerge = notMerge.replaceMerge;
        transitionOpt = notMerge.transition;
        notMerge = notMerge.notMerge;
      }
      this[IN_MAIN_PROCESS_KEY] = true;
      if (!this._model || notMerge) {
        var optionManager = new OptionManager_default(this._api);
        var theme2 = this._theme;
        var ecModel = this._model = new Global_default();
        ecModel.scheduler = this._scheduler;
        ecModel.ssr = this._ssr;
        ecModel.init(null, null, null, theme2, this._locale, optionManager);
      }
      this._model.setOption(option, {
        replaceMerge
      }, optionPreprocessorFuncs);
      var updateParams = {
        seriesTransition: transitionOpt,
        optionChanged: true
      };
      if (lazyUpdate) {
        this[PENDING_UPDATE] = {
          silent,
          updateParams
        };
        this[IN_MAIN_PROCESS_KEY] = false;
        this.getZr().wakeUp();
      } else {
        try {
          prepare(this);
          updateMethods.update.call(this, null, updateParams);
        } catch (e2) {
          this[PENDING_UPDATE] = null;
          this[IN_MAIN_PROCESS_KEY] = false;
          throw e2;
        }
        if (!this._ssr) {
          this._zr.flush();
        }
        this[PENDING_UPDATE] = null;
        this[IN_MAIN_PROCESS_KEY] = false;
        flushPendingActions.call(this, silent);
        triggerUpdatedEvent.call(this, silent);
      }
    };
    ECharts2.prototype.setTheme = function() {
      deprecateLog("ECharts#setTheme() is DEPRECATED in ECharts 3.0");
    };
    ECharts2.prototype.getModel = function() {
      return this._model;
    };
    ECharts2.prototype.getOption = function() {
      return this._model && this._model.getOption();
    };
    ECharts2.prototype.getWidth = function() {
      return this._zr.getWidth();
    };
    ECharts2.prototype.getHeight = function() {
      return this._zr.getHeight();
    };
    ECharts2.prototype.getDevicePixelRatio = function() {
      return this._zr.painter.dpr || env_default.hasGlobalWindow && window.devicePixelRatio || 1;
    };
    ECharts2.prototype.getRenderedCanvas = function(opts) {
      if (process.env.NODE_ENV !== "production") {
        deprecateReplaceLog("getRenderedCanvas", "renderToCanvas");
      }
      return this.renderToCanvas(opts);
    };
    ECharts2.prototype.renderToCanvas = function(opts) {
      opts = opts || {};
      var painter = this._zr.painter;
      if (process.env.NODE_ENV !== "production") {
        if (painter.type !== "canvas") {
          throw new Error("renderToCanvas can only be used in the canvas renderer.");
        }
      }
      return painter.getRenderedCanvas({
        backgroundColor: opts.backgroundColor || this._model.get("backgroundColor"),
        pixelRatio: opts.pixelRatio || this.getDevicePixelRatio()
      });
    };
    ECharts2.prototype.renderToSVGString = function(opts) {
      opts = opts || {};
      var painter = this._zr.painter;
      if (process.env.NODE_ENV !== "production") {
        if (painter.type !== "svg") {
          throw new Error("renderToSVGString can only be used in the svg renderer.");
        }
      }
      return painter.renderToString({
        useViewBox: opts.useViewBox
      });
    };
    ECharts2.prototype.getSvgDataURL = function() {
      if (!env_default.svgSupported) {
        return;
      }
      var zr = this._zr;
      var list = zr.storage.getDisplayList();
      each(list, function(el) {
        el.stopAnimation(null, true);
      });
      return zr.painter.toDataURL();
    };
    ECharts2.prototype.getDataURL = function(opts) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      opts = opts || {};
      var excludeComponents = opts.excludeComponents;
      var ecModel = this._model;
      var excludesComponentViews = [];
      var self2 = this;
      each(excludeComponents, function(componentType) {
        ecModel.eachComponent({
          mainType: componentType
        }, function(component) {
          var view = self2._componentsMap[component.__viewId];
          if (!view.group.ignore) {
            excludesComponentViews.push(view);
            view.group.ignore = true;
          }
        });
      });
      var url = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(opts).toDataURL("image/" + (opts && opts.type || "png"));
      each(excludesComponentViews, function(view) {
        view.group.ignore = false;
      });
      return url;
    };
    ECharts2.prototype.getConnectedDataURL = function(opts) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      var isSvg = opts.type === "svg";
      var groupId = this.group;
      var mathMin6 = Math.min;
      var mathMax6 = Math.max;
      var MAX_NUMBER = Infinity;
      if (connectedGroups[groupId]) {
        var left_1 = MAX_NUMBER;
        var top_1 = MAX_NUMBER;
        var right_1 = -MAX_NUMBER;
        var bottom_1 = -MAX_NUMBER;
        var canvasList_1 = [];
        var dpr_1 = opts && opts.pixelRatio || this.getDevicePixelRatio();
        each(instances2, function(chart, id) {
          if (chart.group === groupId) {
            var canvas = isSvg ? chart.getZr().painter.getSvgDom().innerHTML : chart.renderToCanvas(clone(opts));
            var boundingRect = chart.getDom().getBoundingClientRect();
            left_1 = mathMin6(boundingRect.left, left_1);
            top_1 = mathMin6(boundingRect.top, top_1);
            right_1 = mathMax6(boundingRect.right, right_1);
            bottom_1 = mathMax6(boundingRect.bottom, bottom_1);
            canvasList_1.push({
              dom: canvas,
              left: boundingRect.left,
              top: boundingRect.top
            });
          }
        });
        left_1 *= dpr_1;
        top_1 *= dpr_1;
        right_1 *= dpr_1;
        bottom_1 *= dpr_1;
        var width = right_1 - left_1;
        var height = bottom_1 - top_1;
        var targetCanvas = platformApi.createCanvas();
        var zr_1 = init(targetCanvas, {
          renderer: isSvg ? "svg" : "canvas"
        });
        zr_1.resize({
          width,
          height
        });
        if (isSvg) {
          var content_1 = "";
          each(canvasList_1, function(item) {
            var x = item.left - left_1;
            var y = item.top - top_1;
            content_1 += '<g transform="translate(' + x + "," + y + ')">' + item.dom + "</g>";
          });
          zr_1.painter.getSvgRoot().innerHTML = content_1;
          if (opts.connectedBackgroundColor) {
            zr_1.painter.setBackgroundColor(opts.connectedBackgroundColor);
          }
          zr_1.refreshImmediately();
          return zr_1.painter.toDataURL();
        } else {
          if (opts.connectedBackgroundColor) {
            zr_1.add(new Rect_default({
              shape: {
                x: 0,
                y: 0,
                width,
                height
              },
              style: {
                fill: opts.connectedBackgroundColor
              }
            }));
          }
          each(canvasList_1, function(item) {
            var img = new Image_default({
              style: {
                x: item.left * dpr_1 - left_1,
                y: item.top * dpr_1 - top_1,
                image: item.dom
              }
            });
            zr_1.add(img);
          });
          zr_1.refreshImmediately();
          return targetCanvas.toDataURL("image/" + (opts && opts.type || "png"));
        }
      } else {
        return this.getDataURL(opts);
      }
    };
    ECharts2.prototype.convertToPixel = function(finder, value) {
      return doConvertPixel(this, "convertToPixel", finder, value);
    };
    ECharts2.prototype.convertFromPixel = function(finder, value) {
      return doConvertPixel(this, "convertFromPixel", finder, value);
    };
    ECharts2.prototype.containPixel = function(finder, value) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      var ecModel = this._model;
      var result;
      var findResult = parseFinder(ecModel, finder);
      each(findResult, function(models, key) {
        key.indexOf("Models") >= 0 && each(models, function(model) {
          var coordSys = model.coordinateSystem;
          if (coordSys && coordSys.containPoint) {
            result = result || !!coordSys.containPoint(value);
          } else if (key === "seriesModels") {
            var view = this._chartsMap[model.__viewId];
            if (view && view.containPoint) {
              result = result || view.containPoint(value, model);
            } else {
              if (process.env.NODE_ENV !== "production") {
                warn(key + ": " + (view ? "The found component do not support containPoint." : "No view mapping to the found component."));
              }
            }
          } else {
            if (process.env.NODE_ENV !== "production") {
              warn(key + ": containPoint is not supported");
            }
          }
        }, this);
      }, this);
      return !!result;
    };
    ECharts2.prototype.getVisual = function(finder, visualType) {
      var ecModel = this._model;
      var parsedFinder = parseFinder(ecModel, finder, {
        defaultMainType: "series"
      });
      var seriesModel = parsedFinder.seriesModel;
      if (process.env.NODE_ENV !== "production") {
        if (!seriesModel) {
          warn("There is no specified series model");
        }
      }
      var data = seriesModel.getData();
      var dataIndexInside = parsedFinder.hasOwnProperty("dataIndexInside") ? parsedFinder.dataIndexInside : parsedFinder.hasOwnProperty("dataIndex") ? data.indexOfRawIndex(parsedFinder.dataIndex) : null;
      return dataIndexInside != null ? getItemVisualFromData(data, dataIndexInside, visualType) : getVisualFromData(data, visualType);
    };
    ECharts2.prototype.getViewOfComponentModel = function(componentModel) {
      return this._componentsMap[componentModel.__viewId];
    };
    ECharts2.prototype.getViewOfSeriesModel = function(seriesModel) {
      return this._chartsMap[seriesModel.__viewId];
    };
    ECharts2.prototype._initEvents = function() {
      var _this = this;
      each(MOUSE_EVENT_NAMES, function(eveName) {
        var handler = function(e2) {
          var ecModel = _this.getModel();
          var el = e2.target;
          var params;
          var isGlobalOut = eveName === "globalout";
          if (isGlobalOut) {
            params = {};
          } else {
            el && findEventDispatcher(el, function(parent) {
              var ecData = getECData(parent);
              if (ecData && ecData.dataIndex != null) {
                var dataModel = ecData.dataModel || ecModel.getSeriesByIndex(ecData.seriesIndex);
                params = dataModel && dataModel.getDataParams(ecData.dataIndex, ecData.dataType, el) || {};
                return true;
              } else if (ecData.eventData) {
                params = extend({}, ecData.eventData);
                return true;
              }
            }, true);
          }
          if (params) {
            var componentType = params.componentType;
            var componentIndex = params.componentIndex;
            if (componentType === "markLine" || componentType === "markPoint" || componentType === "markArea") {
              componentType = "series";
              componentIndex = params.seriesIndex;
            }
            var model = componentType && componentIndex != null && ecModel.getComponent(componentType, componentIndex);
            var view = model && _this[model.mainType === "series" ? "_chartsMap" : "_componentsMap"][model.__viewId];
            if (process.env.NODE_ENV !== "production") {
              if (!isGlobalOut && !(model && view)) {
                warn("model or view can not be found by params");
              }
            }
            params.event = e2;
            params.type = eveName;
            _this._$eventProcessor.eventInfo = {
              targetEl: el,
              packedEvent: params,
              model,
              view
            };
            _this.trigger(eveName, params);
          }
        };
        handler.zrEventfulCallAtLast = true;
        _this._zr.on(eveName, handler, _this);
      });
      each(eventActionMap, function(actionType, eventType) {
        _this._messageCenter.on(eventType, function(event) {
          this.trigger(eventType, event);
        }, _this);
      });
      each(["selectchanged"], function(eventType) {
        _this._messageCenter.on(eventType, function(event) {
          this.trigger(eventType, event);
        }, _this);
      });
      handleLegacySelectEvents(this._messageCenter, this, this._api);
    };
    ECharts2.prototype.isDisposed = function() {
      return this._disposed;
    };
    ECharts2.prototype.clear = function() {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      this.setOption({
        series: []
      }, true);
    };
    ECharts2.prototype.dispose = function() {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      this._disposed = true;
      var dom = this.getDom();
      if (dom) {
        setAttribute(this.getDom(), DOM_ATTRIBUTE_KEY, "");
      }
      var chart = this;
      var api = chart._api;
      var ecModel = chart._model;
      each(chart._componentsViews, function(component) {
        component.dispose(ecModel, api);
      });
      each(chart._chartsViews, function(chart2) {
        chart2.dispose(ecModel, api);
      });
      chart._zr.dispose();
      chart._dom = chart._model = chart._chartsMap = chart._componentsMap = chart._chartsViews = chart._componentsViews = chart._scheduler = chart._api = chart._zr = chart._throttledZrFlush = chart._theme = chart._coordSysMgr = chart._messageCenter = null;
      delete instances2[chart.id];
    };
    ECharts2.prototype.resize = function(opts) {
      if (this[IN_MAIN_PROCESS_KEY]) {
        if (process.env.NODE_ENV !== "production") {
          error("`resize` should not be called during main process.");
        }
        return;
      }
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      this._zr.resize(opts);
      var ecModel = this._model;
      this._loadingFX && this._loadingFX.resize();
      if (!ecModel) {
        return;
      }
      var needPrepare = ecModel.resetOption("media");
      var silent = opts && opts.silent;
      if (this[PENDING_UPDATE]) {
        if (silent == null) {
          silent = this[PENDING_UPDATE].silent;
        }
        needPrepare = true;
        this[PENDING_UPDATE] = null;
      }
      this[IN_MAIN_PROCESS_KEY] = true;
      try {
        needPrepare && prepare(this);
        updateMethods.update.call(this, {
          type: "resize",
          animation: extend({
            // Disable animation
            duration: 0
          }, opts && opts.animation)
        });
      } catch (e2) {
        this[IN_MAIN_PROCESS_KEY] = false;
        throw e2;
      }
      this[IN_MAIN_PROCESS_KEY] = false;
      flushPendingActions.call(this, silent);
      triggerUpdatedEvent.call(this, silent);
    };
    ECharts2.prototype.showLoading = function(name, cfg) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      if (isObject(name)) {
        cfg = name;
        name = "";
      }
      name = name || "default";
      this.hideLoading();
      if (!loadingEffects[name]) {
        if (process.env.NODE_ENV !== "production") {
          warn("Loading effects " + name + " not exists.");
        }
        return;
      }
      var el = loadingEffects[name](this._api, cfg);
      var zr = this._zr;
      this._loadingFX = el;
      zr.add(el);
    };
    ECharts2.prototype.hideLoading = function() {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      this._loadingFX && this._zr.remove(this._loadingFX);
      this._loadingFX = null;
    };
    ECharts2.prototype.makeActionFromEvent = function(eventObj) {
      var payload = extend({}, eventObj);
      payload.type = eventActionMap[eventObj.type];
      return payload;
    };
    ECharts2.prototype.dispatchAction = function(payload, opt) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      if (!isObject(opt)) {
        opt = {
          silent: !!opt
        };
      }
      if (!actions[payload.type]) {
        return;
      }
      if (!this._model) {
        return;
      }
      if (this[IN_MAIN_PROCESS_KEY]) {
        this._pendingActions.push(payload);
        return;
      }
      var silent = opt.silent;
      doDispatchAction.call(this, payload, silent);
      var flush = opt.flush;
      if (flush) {
        this._zr.flush();
      } else if (flush !== false && env_default.browser.weChat) {
        this._throttledZrFlush();
      }
      flushPendingActions.call(this, silent);
      triggerUpdatedEvent.call(this, silent);
    };
    ECharts2.prototype.updateLabelLayout = function() {
      lifecycle_default.trigger("series:layoutlabels", this._model, this._api, {
        // Not adding series labels.
        // TODO
        updatedSeries: []
      });
    };
    ECharts2.prototype.appendData = function(params) {
      if (this._disposed) {
        disposedWarning(this.id);
        return;
      }
      var seriesIndex = params.seriesIndex;
      var ecModel = this.getModel();
      var seriesModel = ecModel.getSeriesByIndex(seriesIndex);
      if (process.env.NODE_ENV !== "production") {
        assert(params.data && seriesModel);
      }
      seriesModel.appendData(params);
      this._scheduler.unfinished = true;
      this.getZr().wakeUp();
    };
    ECharts2.internalField = function() {
      prepare = function(ecIns) {
        var scheduler = ecIns._scheduler;
        scheduler.restorePipelines(ecIns._model);
        scheduler.prepareStageTasks();
        prepareView(ecIns, true);
        prepareView(ecIns, false);
        scheduler.plan();
      };
      prepareView = function(ecIns, isComponent) {
        var ecModel = ecIns._model;
        var scheduler = ecIns._scheduler;
        var viewList = isComponent ? ecIns._componentsViews : ecIns._chartsViews;
        var viewMap = isComponent ? ecIns._componentsMap : ecIns._chartsMap;
        var zr = ecIns._zr;
        var api = ecIns._api;
        for (var i = 0; i < viewList.length; i++) {
          viewList[i].__alive = false;
        }
        isComponent ? ecModel.eachComponent(function(componentType, model) {
          componentType !== "series" && doPrepare(model);
        }) : ecModel.eachSeries(doPrepare);
        function doPrepare(model) {
          var requireNewView = model.__requireNewView;
          model.__requireNewView = false;
          var viewId = "_ec_" + model.id + "_" + model.type;
          var view2 = !requireNewView && viewMap[viewId];
          if (!view2) {
            var classType = parseClassType(model.type);
            var Clazz = isComponent ? Component_default2.getClass(classType.main, classType.sub) : (
              // FIXME:TS
              // (ChartView as ChartViewConstructor).getClass('series', classType.sub)
              // For backward compat, still support a chart type declared as only subType
              // like "liquidfill", but recommend "series.liquidfill"
              // But need a base class to make a type series.
              Chart_default.getClass(classType.sub)
            );
            if (process.env.NODE_ENV !== "production") {
              assert(Clazz, classType.sub + " does not exist.");
            }
            view2 = new Clazz();
            view2.init(ecModel, api);
            viewMap[viewId] = view2;
            viewList.push(view2);
            zr.add(view2.group);
          }
          model.__viewId = view2.__id = viewId;
          view2.__alive = true;
          view2.__model = model;
          view2.group.__ecComponentInfo = {
            mainType: model.mainType,
            index: model.componentIndex
          };
          !isComponent && scheduler.prepareView(view2, model, ecModel, api);
        }
        for (var i = 0; i < viewList.length; ) {
          var view = viewList[i];
          if (!view.__alive) {
            !isComponent && view.renderTask.dispose();
            zr.remove(view.group);
            view.dispose(ecModel, api);
            viewList.splice(i, 1);
            if (viewMap[view.__id] === view) {
              delete viewMap[view.__id];
            }
            view.__id = view.group.__ecComponentInfo = null;
          } else {
            i++;
          }
        }
      };
      updateDirectly = function(ecIns, method, payload, mainType, subType) {
        var ecModel = ecIns._model;
        ecModel.setUpdatePayload(payload);
        if (!mainType) {
          each([].concat(ecIns._componentsViews).concat(ecIns._chartsViews), callView);
          return;
        }
        var query = {};
        query[mainType + "Id"] = payload[mainType + "Id"];
        query[mainType + "Index"] = payload[mainType + "Index"];
        query[mainType + "Name"] = payload[mainType + "Name"];
        var condition = {
          mainType,
          query
        };
        subType && (condition.subType = subType);
        var excludeSeriesId = payload.excludeSeriesId;
        var excludeSeriesIdMap;
        if (excludeSeriesId != null) {
          excludeSeriesIdMap = createHashMap();
          each(normalizeToArray(excludeSeriesId), function(id) {
            var modelId = convertOptionIdName(id, null);
            if (modelId != null) {
              excludeSeriesIdMap.set(modelId, true);
            }
          });
        }
        ecModel && ecModel.eachComponent(condition, function(model) {
          var isExcluded = excludeSeriesIdMap && excludeSeriesIdMap.get(model.id) != null;
          if (isExcluded) {
            return;
          }
          ;
          if (isHighDownPayload(payload)) {
            if (model instanceof Series_default) {
              if (payload.type === HIGHLIGHT_ACTION_TYPE && !payload.notBlur && !model.get(["emphasis", "disabled"])) {
                blurSeriesFromHighlightPayload(model, payload, ecIns._api);
              }
            } else {
              var _a2 = findComponentHighDownDispatchers(model.mainType, model.componentIndex, payload.name, ecIns._api), focusSelf = _a2.focusSelf, dispatchers = _a2.dispatchers;
              if (payload.type === HIGHLIGHT_ACTION_TYPE && focusSelf && !payload.notBlur) {
                blurComponent(model.mainType, model.componentIndex, ecIns._api);
              }
              if (dispatchers) {
                each(dispatchers, function(dispatcher) {
                  payload.type === HIGHLIGHT_ACTION_TYPE ? enterEmphasis(dispatcher) : leaveEmphasis(dispatcher);
                });
              }
            }
          } else if (isSelectChangePayload(payload)) {
            if (model instanceof Series_default) {
              toggleSelectionFromPayload(model, payload, ecIns._api);
              updateSeriesElementSelection(model);
              markStatusToUpdate(ecIns);
            }
          }
        }, ecIns);
        ecModel && ecModel.eachComponent(condition, function(model) {
          var isExcluded = excludeSeriesIdMap && excludeSeriesIdMap.get(model.id) != null;
          if (isExcluded) {
            return;
          }
          ;
          callView(ecIns[mainType === "series" ? "_chartsMap" : "_componentsMap"][model.__viewId]);
        }, ecIns);
        function callView(view) {
          view && view.__alive && view[method] && view[method](view.__model, ecModel, ecIns._api, payload);
        }
      };
      updateMethods = {
        prepareAndUpdate: function(payload) {
          prepare(this);
          updateMethods.update.call(this, payload, {
            // Needs to mark option changed if newOption is given.
            // It's from MagicType.
            // TODO If use a separate flag optionChanged in payload?
            optionChanged: payload.newOption != null
          });
        },
        update: function(payload, updateParams) {
          var ecModel = this._model;
          var api = this._api;
          var zr = this._zr;
          var coordSysMgr = this._coordSysMgr;
          var scheduler = this._scheduler;
          if (!ecModel) {
            return;
          }
          ecModel.setUpdatePayload(payload);
          scheduler.restoreData(ecModel, payload);
          scheduler.performSeriesTasks(ecModel);
          coordSysMgr.create(ecModel, api);
          scheduler.performDataProcessorTasks(ecModel, payload);
          updateStreamModes(this, ecModel);
          coordSysMgr.update(ecModel, api);
          clearColorPalette(ecModel);
          scheduler.performVisualTasks(ecModel, payload);
          render(this, ecModel, api, payload, updateParams);
          var backgroundColor2 = ecModel.get("backgroundColor") || "transparent";
          var darkMode = ecModel.get("darkMode");
          zr.setBackgroundColor(backgroundColor2);
          if (darkMode != null && darkMode !== "auto") {
            zr.setDarkMode(darkMode);
          }
          lifecycle_default.trigger("afterupdate", ecModel, api);
        },
        updateTransform: function(payload) {
          var _this = this;
          var ecModel = this._model;
          var api = this._api;
          if (!ecModel) {
            return;
          }
          ecModel.setUpdatePayload(payload);
          var componentDirtyList = [];
          ecModel.eachComponent(function(componentType, componentModel) {
            if (componentType === "series") {
              return;
            }
            var componentView = _this.getViewOfComponentModel(componentModel);
            if (componentView && componentView.__alive) {
              if (componentView.updateTransform) {
                var result = componentView.updateTransform(componentModel, ecModel, api, payload);
                result && result.update && componentDirtyList.push(componentView);
              } else {
                componentDirtyList.push(componentView);
              }
            }
          });
          var seriesDirtyMap = createHashMap();
          ecModel.eachSeries(function(seriesModel) {
            var chartView = _this._chartsMap[seriesModel.__viewId];
            if (chartView.updateTransform) {
              var result = chartView.updateTransform(seriesModel, ecModel, api, payload);
              result && result.update && seriesDirtyMap.set(seriesModel.uid, 1);
            } else {
              seriesDirtyMap.set(seriesModel.uid, 1);
            }
          });
          clearColorPalette(ecModel);
          this._scheduler.performVisualTasks(ecModel, payload, {
            setDirty: true,
            dirtyMap: seriesDirtyMap
          });
          renderSeries(this, ecModel, api, payload, {}, seriesDirtyMap);
          lifecycle_default.trigger("afterupdate", ecModel, api);
        },
        updateView: function(payload) {
          var ecModel = this._model;
          if (!ecModel) {
            return;
          }
          ecModel.setUpdatePayload(payload);
          Chart_default.markUpdateMethod(payload, "updateView");
          clearColorPalette(ecModel);
          this._scheduler.performVisualTasks(ecModel, payload, {
            setDirty: true
          });
          render(this, ecModel, this._api, payload, {});
          lifecycle_default.trigger("afterupdate", ecModel, this._api);
        },
        updateVisual: function(payload) {
          var _this = this;
          var ecModel = this._model;
          if (!ecModel) {
            return;
          }
          ecModel.setUpdatePayload(payload);
          ecModel.eachSeries(function(seriesModel) {
            seriesModel.getData().clearAllVisual();
          });
          Chart_default.markUpdateMethod(payload, "updateVisual");
          clearColorPalette(ecModel);
          this._scheduler.performVisualTasks(ecModel, payload, {
            visualType: "visual",
            setDirty: true
          });
          ecModel.eachComponent(function(componentType, componentModel) {
            if (componentType !== "series") {
              var componentView = _this.getViewOfComponentModel(componentModel);
              componentView && componentView.__alive && componentView.updateVisual(componentModel, ecModel, _this._api, payload);
            }
          });
          ecModel.eachSeries(function(seriesModel) {
            var chartView = _this._chartsMap[seriesModel.__viewId];
            chartView.updateVisual(seriesModel, ecModel, _this._api, payload);
          });
          lifecycle_default.trigger("afterupdate", ecModel, this._api);
        },
        updateLayout: function(payload) {
          updateMethods.update.call(this, payload);
        }
      };
      doConvertPixel = function(ecIns, methodName, finder, value) {
        if (ecIns._disposed) {
          disposedWarning(ecIns.id);
          return;
        }
        var ecModel = ecIns._model;
        var coordSysList = ecIns._coordSysMgr.getCoordinateSystems();
        var result;
        var parsedFinder = parseFinder(ecModel, finder);
        for (var i = 0; i < coordSysList.length; i++) {
          var coordSys = coordSysList[i];
          if (coordSys[methodName] && (result = coordSys[methodName](ecModel, parsedFinder, value)) != null) {
            return result;
          }
        }
        if (process.env.NODE_ENV !== "production") {
          warn("No coordinate system that supports " + methodName + " found by the given finder.");
        }
      };
      updateStreamModes = function(ecIns, ecModel) {
        var chartsMap = ecIns._chartsMap;
        var scheduler = ecIns._scheduler;
        ecModel.eachSeries(function(seriesModel) {
          scheduler.updateStreamModes(seriesModel, chartsMap[seriesModel.__viewId]);
        });
      };
      doDispatchAction = function(payload, silent) {
        var _this = this;
        var ecModel = this.getModel();
        var payloadType = payload.type;
        var escapeConnect = payload.escapeConnect;
        var actionWrap = actions[payloadType];
        var actionInfo = actionWrap.actionInfo;
        var cptTypeTmp = (actionInfo.update || "update").split(":");
        var updateMethod = cptTypeTmp.pop();
        var cptType = cptTypeTmp[0] != null && parseClassType(cptTypeTmp[0]);
        this[IN_MAIN_PROCESS_KEY] = true;
        var payloads = [payload];
        var batched = false;
        if (payload.batch) {
          batched = true;
          payloads = map(payload.batch, function(item) {
            item = defaults(extend({}, item), payload);
            item.batch = null;
            return item;
          });
        }
        var eventObjBatch = [];
        var eventObj;
        var isSelectChange = isSelectChangePayload(payload);
        var isHighDown = isHighDownPayload(payload);
        if (isHighDown) {
          allLeaveBlur(this._api);
        }
        each(payloads, function(batchItem) {
          eventObj = actionWrap.action(batchItem, _this._model, _this._api);
          eventObj = eventObj || extend({}, batchItem);
          eventObj.type = actionInfo.event || eventObj.type;
          eventObjBatch.push(eventObj);
          if (isHighDown) {
            var _a2 = preParseFinder(payload), queryOptionMap = _a2.queryOptionMap, mainTypeSpecified = _a2.mainTypeSpecified;
            var componentMainType = mainTypeSpecified ? queryOptionMap.keys()[0] : "series";
            updateDirectly(_this, updateMethod, batchItem, componentMainType);
            markStatusToUpdate(_this);
          } else if (isSelectChange) {
            updateDirectly(_this, updateMethod, batchItem, "series");
            markStatusToUpdate(_this);
          } else if (cptType) {
            updateDirectly(_this, updateMethod, batchItem, cptType.main, cptType.sub);
          }
        });
        if (updateMethod !== "none" && !isHighDown && !isSelectChange && !cptType) {
          try {
            if (this[PENDING_UPDATE]) {
              prepare(this);
              updateMethods.update.call(this, payload);
              this[PENDING_UPDATE] = null;
            } else {
              updateMethods[updateMethod].call(this, payload);
            }
          } catch (e2) {
            this[IN_MAIN_PROCESS_KEY] = false;
            throw e2;
          }
        }
        if (batched) {
          eventObj = {
            type: actionInfo.event || payloadType,
            escapeConnect,
            batch: eventObjBatch
          };
        } else {
          eventObj = eventObjBatch[0];
        }
        this[IN_MAIN_PROCESS_KEY] = false;
        if (!silent) {
          var messageCenter = this._messageCenter;
          messageCenter.trigger(eventObj.type, eventObj);
          if (isSelectChange) {
            var newObj = {
              type: "selectchanged",
              escapeConnect,
              selected: getAllSelectedIndices(ecModel),
              isFromClick: payload.isFromClick || false,
              fromAction: payload.type,
              fromActionPayload: payload
            };
            messageCenter.trigger(newObj.type, newObj);
          }
        }
      };
      flushPendingActions = function(silent) {
        var pendingActions = this._pendingActions;
        while (pendingActions.length) {
          var payload = pendingActions.shift();
          doDispatchAction.call(this, payload, silent);
        }
      };
      triggerUpdatedEvent = function(silent) {
        !silent && this.trigger("updated");
      };
      bindRenderedEvent = function(zr, ecIns) {
        zr.on("rendered", function(params) {
          ecIns.trigger("rendered", params);
          if (
            // Although zr is dirty if initial animation is not finished
            // and this checking is called on frame, we also check
            // animation finished for robustness.
            zr.animation.isFinished() && !ecIns[PENDING_UPDATE] && !ecIns._scheduler.unfinished && !ecIns._pendingActions.length
          ) {
            ecIns.trigger("finished");
          }
        });
      };
      bindMouseEvent = function(zr, ecIns) {
        zr.on("mouseover", function(e2) {
          var el = e2.target;
          var dispatcher = findEventDispatcher(el, isHighDownDispatcher);
          if (dispatcher) {
            handleGlobalMouseOverForHighDown(dispatcher, e2, ecIns._api);
            markStatusToUpdate(ecIns);
          }
        }).on("mouseout", function(e2) {
          var el = e2.target;
          var dispatcher = findEventDispatcher(el, isHighDownDispatcher);
          if (dispatcher) {
            handleGlobalMouseOutForHighDown(dispatcher, e2, ecIns._api);
            markStatusToUpdate(ecIns);
          }
        }).on("click", function(e2) {
          var el = e2.target;
          var dispatcher = findEventDispatcher(el, function(target) {
            return getECData(target).dataIndex != null;
          }, true);
          if (dispatcher) {
            var actionType = dispatcher.selected ? "unselect" : "select";
            var ecData = getECData(dispatcher);
            ecIns._api.dispatchAction({
              type: actionType,
              dataType: ecData.dataType,
              dataIndexInside: ecData.dataIndex,
              seriesIndex: ecData.seriesIndex,
              isFromClick: true
            });
          }
        });
      };
      function clearColorPalette(ecModel) {
        ecModel.clearColorPalette();
        ecModel.eachSeries(function(seriesModel) {
          seriesModel.clearColorPalette();
        });
      }
      ;
      function allocateZlevels(ecModel) {
        ;
        var componentZLevels = [];
        var seriesZLevels = [];
        var hasSeparateZLevel = false;
        ecModel.eachComponent(function(componentType, componentModel) {
          var zlevel = componentModel.get("zlevel") || 0;
          var z = componentModel.get("z") || 0;
          var zlevelKey = componentModel.getZLevelKey();
          hasSeparateZLevel = hasSeparateZLevel || !!zlevelKey;
          (componentType === "series" ? seriesZLevels : componentZLevels).push({
            zlevel,
            z,
            idx: componentModel.componentIndex,
            type: componentType,
            key: zlevelKey
          });
        });
        if (hasSeparateZLevel) {
          var zLevels = componentZLevels.concat(seriesZLevels);
          var lastSeriesZLevel_1;
          var lastSeriesKey_1;
          sort(zLevels, function(a, b) {
            if (a.zlevel === b.zlevel) {
              return a.z - b.z;
            }
            return a.zlevel - b.zlevel;
          });
          each(zLevels, function(item) {
            var componentModel = ecModel.getComponent(item.type, item.idx);
            var zlevel = item.zlevel;
            var key = item.key;
            if (lastSeriesZLevel_1 != null) {
              zlevel = Math.max(lastSeriesZLevel_1, zlevel);
            }
            if (key) {
              if (zlevel === lastSeriesZLevel_1 && key !== lastSeriesKey_1) {
                zlevel++;
              }
              lastSeriesKey_1 = key;
            } else if (lastSeriesKey_1) {
              if (zlevel === lastSeriesZLevel_1) {
                zlevel++;
              }
              lastSeriesKey_1 = "";
            }
            lastSeriesZLevel_1 = zlevel;
            componentModel.setZLevel(zlevel);
          });
        }
      }
      render = function(ecIns, ecModel, api, payload, updateParams) {
        allocateZlevels(ecModel);
        renderComponents(ecIns, ecModel, api, payload, updateParams);
        each(ecIns._chartsViews, function(chart) {
          chart.__alive = false;
        });
        renderSeries(ecIns, ecModel, api, payload, updateParams);
        each(ecIns._chartsViews, function(chart) {
          if (!chart.__alive) {
            chart.remove(ecModel, api);
          }
        });
      };
      renderComponents = function(ecIns, ecModel, api, payload, updateParams, dirtyList) {
        each(dirtyList || ecIns._componentsViews, function(componentView) {
          var componentModel = componentView.__model;
          clearStates(componentModel, componentView);
          componentView.render(componentModel, ecModel, api, payload);
          updateZ(componentModel, componentView);
          updateStates(componentModel, componentView);
        });
      };
      renderSeries = function(ecIns, ecModel, api, payload, updateParams, dirtyMap) {
        var scheduler = ecIns._scheduler;
        updateParams = extend(updateParams || {}, {
          updatedSeries: ecModel.getSeries()
        });
        lifecycle_default.trigger("series:beforeupdate", ecModel, api, updateParams);
        var unfinished = false;
        ecModel.eachSeries(function(seriesModel) {
          var chartView = ecIns._chartsMap[seriesModel.__viewId];
          chartView.__alive = true;
          var renderTask = chartView.renderTask;
          scheduler.updatePayload(renderTask, payload);
          clearStates(seriesModel, chartView);
          if (dirtyMap && dirtyMap.get(seriesModel.uid)) {
            renderTask.dirty();
          }
          if (renderTask.perform(scheduler.getPerformArgs(renderTask))) {
            unfinished = true;
          }
          chartView.group.silent = !!seriesModel.get("silent");
          updateBlend(seriesModel, chartView);
          updateSeriesElementSelection(seriesModel);
        });
        scheduler.unfinished = unfinished || scheduler.unfinished;
        lifecycle_default.trigger("series:layoutlabels", ecModel, api, updateParams);
        lifecycle_default.trigger("series:transition", ecModel, api, updateParams);
        ecModel.eachSeries(function(seriesModel) {
          var chartView = ecIns._chartsMap[seriesModel.__viewId];
          updateZ(seriesModel, chartView);
          updateStates(seriesModel, chartView);
        });
        updateHoverLayerStatus(ecIns, ecModel);
        lifecycle_default.trigger("series:afterupdate", ecModel, api, updateParams);
      };
      markStatusToUpdate = function(ecIns) {
        ecIns[STATUS_NEEDS_UPDATE_KEY] = true;
        ecIns.getZr().wakeUp();
      };
      applyChangedStates = function(ecIns) {
        if (!ecIns[STATUS_NEEDS_UPDATE_KEY]) {
          return;
        }
        ecIns.getZr().storage.traverse(function(el) {
          if (isElementRemoved(el)) {
            return;
          }
          applyElementStates(el);
        });
        ecIns[STATUS_NEEDS_UPDATE_KEY] = false;
      };
      function applyElementStates(el) {
        var newStates = [];
        var oldStates = el.currentStates;
        for (var i = 0; i < oldStates.length; i++) {
          var stateName = oldStates[i];
          if (!(stateName === "emphasis" || stateName === "blur" || stateName === "select")) {
            newStates.push(stateName);
          }
        }
        if (el.selected && el.states.select) {
          newStates.push("select");
        }
        if (el.hoverState === HOVER_STATE_EMPHASIS && el.states.emphasis) {
          newStates.push("emphasis");
        } else if (el.hoverState === HOVER_STATE_BLUR && el.states.blur) {
          newStates.push("blur");
        }
        el.useStates(newStates);
      }
      function updateHoverLayerStatus(ecIns, ecModel) {
        var zr = ecIns._zr;
        var storage = zr.storage;
        var elCount = 0;
        storage.traverse(function(el) {
          if (!el.isGroup) {
            elCount++;
          }
        });
        if (elCount > ecModel.get("hoverLayerThreshold") && !env_default.node && !env_default.worker) {
          ecModel.eachSeries(function(seriesModel) {
            if (seriesModel.preventUsingHoverLayer) {
              return;
            }
            var chartView = ecIns._chartsMap[seriesModel.__viewId];
            if (chartView.__alive) {
              chartView.eachRendered(function(el) {
                if (el.states.emphasis) {
                  el.states.emphasis.hoverLayer = true;
                }
              });
            }
          });
        }
      }
      ;
      function updateBlend(seriesModel, chartView) {
        var blendMode = seriesModel.get("blendMode") || null;
        chartView.eachRendered(function(el) {
          if (!el.isGroup) {
            el.style.blend = blendMode;
          }
        });
      }
      ;
      function updateZ(model, view) {
        if (model.preventAutoZ) {
          return;
        }
        var z = model.get("z") || 0;
        var zlevel = model.get("zlevel") || 0;
        view.eachRendered(function(el) {
          doUpdateZ(el, z, zlevel, -Infinity);
          return true;
        });
      }
      ;
      function doUpdateZ(el, z, zlevel, maxZ2) {
        var label = el.getTextContent();
        var labelLine = el.getTextGuideLine();
        var isGroup = el.isGroup;
        if (isGroup) {
          var children = el.childrenRef();
          for (var i = 0; i < children.length; i++) {
            maxZ2 = Math.max(doUpdateZ(children[i], z, zlevel, maxZ2), maxZ2);
          }
        } else {
          el.z = z;
          el.zlevel = zlevel;
          maxZ2 = Math.max(el.z2, maxZ2);
        }
        if (label) {
          label.z = z;
          label.zlevel = zlevel;
          isFinite(maxZ2) && (label.z2 = maxZ2 + 2);
        }
        if (labelLine) {
          var textGuideLineConfig = el.textGuideLineConfig;
          labelLine.z = z;
          labelLine.zlevel = zlevel;
          isFinite(maxZ2) && (labelLine.z2 = maxZ2 + (textGuideLineConfig && textGuideLineConfig.showAbove ? 1 : -1));
        }
        return maxZ2;
      }
      function clearStates(model, view) {
        view.eachRendered(function(el) {
          if (isElementRemoved(el)) {
            return;
          }
          var textContent = el.getTextContent();
          var textGuide = el.getTextGuideLine();
          if (el.stateTransition) {
            el.stateTransition = null;
          }
          if (textContent && textContent.stateTransition) {
            textContent.stateTransition = null;
          }
          if (textGuide && textGuide.stateTransition) {
            textGuide.stateTransition = null;
          }
          if (el.hasState()) {
            el.prevStates = el.currentStates;
            el.clearStates();
          } else if (el.prevStates) {
            el.prevStates = null;
          }
        });
      }
      function updateStates(model, view) {
        var stateAnimationModel = model.getModel("stateAnimation");
        var enableAnimation = model.isAnimationEnabled();
        var duration = stateAnimationModel.get("duration");
        var stateTransition = duration > 0 ? {
          duration,
          delay: stateAnimationModel.get("delay"),
          easing: stateAnimationModel.get("easing")
          // additive: stateAnimationModel.get('additive')
        } : null;
        view.eachRendered(function(el) {
          if (el.states && el.states.emphasis) {
            if (isElementRemoved(el)) {
              return;
            }
            if (el instanceof Path_default) {
              savePathStates(el);
            }
            if (el.__dirty) {
              var prevStates = el.prevStates;
              if (prevStates) {
                el.useStates(prevStates);
              }
            }
            if (enableAnimation) {
              el.stateTransition = stateTransition;
              var textContent = el.getTextContent();
              var textGuide = el.getTextGuideLine();
              if (textContent) {
                textContent.stateTransition = stateTransition;
              }
              if (textGuide) {
                textGuide.stateTransition = stateTransition;
              }
            }
            if (el.__dirty) {
              applyElementStates(el);
            }
          }
        });
      }
      ;
      createExtensionAPI = function(ecIns) {
        return new /** @class */
        (function(_super2) {
          __extends(class_1, _super2);
          function class_1() {
            return _super2 !== null && _super2.apply(this, arguments) || this;
          }
          class_1.prototype.getCoordinateSystems = function() {
            return ecIns._coordSysMgr.getCoordinateSystems();
          };
          class_1.prototype.getComponentByElement = function(el) {
            while (el) {
              var modelInfo = el.__ecComponentInfo;
              if (modelInfo != null) {
                return ecIns._model.getComponent(modelInfo.mainType, modelInfo.index);
              }
              el = el.parent;
            }
          };
          class_1.prototype.enterEmphasis = function(el, highlightDigit) {
            enterEmphasis(el, highlightDigit);
            markStatusToUpdate(ecIns);
          };
          class_1.prototype.leaveEmphasis = function(el, highlightDigit) {
            leaveEmphasis(el, highlightDigit);
            markStatusToUpdate(ecIns);
          };
          class_1.prototype.enterBlur = function(el) {
            enterBlur(el);
            markStatusToUpdate(ecIns);
          };
          class_1.prototype.leaveBlur = function(el) {
            leaveBlur(el);
            markStatusToUpdate(ecIns);
          };
          class_1.prototype.enterSelect = function(el) {
            enterSelect(el);
            markStatusToUpdate(ecIns);
          };
          class_1.prototype.leaveSelect = function(el) {
            leaveSelect(el);
            markStatusToUpdate(ecIns);
          };
          class_1.prototype.getModel = function() {
            return ecIns.getModel();
          };
          class_1.prototype.getViewOfComponentModel = function(componentModel) {
            return ecIns.getViewOfComponentModel(componentModel);
          };
          class_1.prototype.getViewOfSeriesModel = function(seriesModel) {
            return ecIns.getViewOfSeriesModel(seriesModel);
          };
          return class_1;
        }(ExtensionAPI_default))(ecIns);
      };
      enableConnect = function(chart) {
        function updateConnectedChartsStatus(charts, status) {
          for (var i = 0; i < charts.length; i++) {
            var otherChart = charts[i];
            otherChart[CONNECT_STATUS_KEY] = status;
          }
        }
        each(eventActionMap, function(actionType, eventType) {
          chart._messageCenter.on(eventType, function(event) {
            if (connectedGroups[chart.group] && chart[CONNECT_STATUS_KEY] !== CONNECT_STATUS_PENDING) {
              if (event && event.escapeConnect) {
                return;
              }
              var action_1 = chart.makeActionFromEvent(event);
              var otherCharts_1 = [];
              each(instances2, function(otherChart) {
                if (otherChart !== chart && otherChart.group === chart.group) {
                  otherCharts_1.push(otherChart);
                }
              });
              updateConnectedChartsStatus(otherCharts_1, CONNECT_STATUS_PENDING);
              each(otherCharts_1, function(otherChart) {
                if (otherChart[CONNECT_STATUS_KEY] !== CONNECT_STATUS_UPDATING) {
                  otherChart.dispatchAction(action_1);
                }
              });
              updateConnectedChartsStatus(otherCharts_1, CONNECT_STATUS_UPDATED);
            }
          });
        });
      };
    }();
    return ECharts2;
  }(Eventful_default)
);
var echartsProto = ECharts.prototype;
echartsProto.on = createRegisterEventWithLowercaseECharts("on");
echartsProto.off = createRegisterEventWithLowercaseECharts("off");
echartsProto.one = function(eventName, cb, ctx) {
  var self2 = this;
  deprecateLog("ECharts#one is deprecated.");
  function wrapped() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    cb && cb.apply && cb.apply(this, args2);
    self2.off(eventName, wrapped);
  }
  ;
  this.on.call(this, eventName, wrapped, ctx);
};
var MOUSE_EVENT_NAMES = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
function disposedWarning(id) {
  if (process.env.NODE_ENV !== "production") {
    warn("Instance " + id + " has been disposed");
  }
}
var actions = {};
var eventActionMap = {};
var dataProcessorFuncs = [];
var optionPreprocessorFuncs = [];
var visualFuncs = [];
var themeStorage = {};
var loadingEffects = {};
var instances2 = {};
var connectedGroups = {};
var idBase = +/* @__PURE__ */ new Date() - 0;
var groupIdBase = +/* @__PURE__ */ new Date() - 0;
var DOM_ATTRIBUTE_KEY = "_echarts_instance_";
function init2(dom, theme2, opts) {
  var isClient = !(opts && opts.ssr);
  if (isClient) {
    if (process.env.NODE_ENV !== "production") {
      if (!dom) {
        throw new Error("Initialize failed: invalid dom.");
      }
    }
    var existInstance = getInstanceByDom(dom);
    if (existInstance) {
      if (process.env.NODE_ENV !== "production") {
        warn("There is a chart instance already initialized on the dom.");
      }
      return existInstance;
    }
    if (process.env.NODE_ENV !== "production") {
      if (isDom(dom) && dom.nodeName.toUpperCase() !== "CANVAS" && (!dom.clientWidth && (!opts || opts.width == null) || !dom.clientHeight && (!opts || opts.height == null))) {
        warn("Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight. They should not be 0.For example, you may need to call this in the callback of window.onload.");
      }
    }
  }
  var chart = new ECharts(dom, theme2, opts);
  chart.id = "ec_" + idBase++;
  instances2[chart.id] = chart;
  isClient && setAttribute(dom, DOM_ATTRIBUTE_KEY, chart.id);
  enableConnect(chart);
  lifecycle_default.trigger("afterinit", chart);
  return chart;
}
function getInstanceByDom(dom) {
  return instances2[getAttribute(dom, DOM_ATTRIBUTE_KEY)];
}
function registerTheme(name, theme2) {
  themeStorage[name] = theme2;
}
function registerPreprocessor(preprocessorFunc) {
  if (indexOf(optionPreprocessorFuncs, preprocessorFunc) < 0) {
    optionPreprocessorFuncs.push(preprocessorFunc);
  }
}
function registerProcessor(priority, processor) {
  normalizeRegister(dataProcessorFuncs, priority, processor, PRIORITY_PROCESSOR_DEFAULT);
}
function registerPostInit(postInitFunc) {
  registerUpdateLifecycle("afterinit", postInitFunc);
}
function registerPostUpdate(postUpdateFunc) {
  registerUpdateLifecycle("afterupdate", postUpdateFunc);
}
function registerUpdateLifecycle(name, cb) {
  lifecycle_default.on(name, cb);
}
function registerAction(actionInfo, eventName, action) {
  if (isFunction(eventName)) {
    action = eventName;
    eventName = "";
  }
  var actionType = isObject(actionInfo) ? actionInfo.type : [actionInfo, actionInfo = {
    event: eventName
  }][0];
  actionInfo.event = (actionInfo.event || actionType).toLowerCase();
  eventName = actionInfo.event;
  if (eventActionMap[eventName]) {
    return;
  }
  assert(ACTION_REG.test(actionType) && ACTION_REG.test(eventName));
  if (!actions[actionType]) {
    actions[actionType] = {
      action,
      actionInfo
    };
  }
  eventActionMap[eventName] = actionType;
}
function registerCoordinateSystem(type, coordSysCreator) {
  CoordinateSystem_default.register(type, coordSysCreator);
}
function registerLayout(priority, layoutTask) {
  normalizeRegister(visualFuncs, priority, layoutTask, PRIORITY_VISUAL_LAYOUT, "layout");
}
function registerVisual(priority, visualTask) {
  normalizeRegister(visualFuncs, priority, visualTask, PRIORITY_VISUAL_CHART, "visual");
}
var registeredTasks = [];
function normalizeRegister(targetList, priority, fn, defaultPriority, visualType) {
  if (isFunction(priority) || isObject(priority)) {
    fn = priority;
    priority = defaultPriority;
  }
  if (process.env.NODE_ENV !== "production") {
    if (isNaN(priority) || priority == null) {
      throw new Error("Illegal priority");
    }
    each(targetList, function(wrap) {
      assert(wrap.__raw !== fn);
    });
  }
  if (indexOf(registeredTasks, fn) >= 0) {
    return;
  }
  registeredTasks.push(fn);
  var stageHandler = Scheduler_default.wrapStageHandler(fn, visualType);
  stageHandler.__prio = priority;
  stageHandler.__raw = fn;
  targetList.push(stageHandler);
}
function registerLoading(name, loadingFx) {
  loadingEffects[name] = loadingFx;
}
function registerMap(mapName, geoJson, specialAreas) {
  var registerMap2 = getImpl("registerMap");
  registerMap2 && registerMap2(mapName, geoJson, specialAreas);
}
var registerTransform = registerExternalTransform;
registerVisual(PRIORITY_VISUAL_GLOBAL, seriesStyleTask);
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataStyleTask);
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataColorPaletteTask);
registerVisual(PRIORITY_VISUAL_GLOBAL, seriesSymbolTask);
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataSymbolTask);
registerVisual(PRIORITY_VISUAL_DECAL, decalVisual);
registerPreprocessor(globalBackwardCompat);
registerProcessor(PRIORITY_PROCESSOR_DATASTACK, dataStack);
registerLoading("default", defaultLoading);
registerAction({
  type: HIGHLIGHT_ACTION_TYPE,
  event: HIGHLIGHT_ACTION_TYPE,
  update: HIGHLIGHT_ACTION_TYPE
}, noop);
registerAction({
  type: DOWNPLAY_ACTION_TYPE,
  event: DOWNPLAY_ACTION_TYPE,
  update: DOWNPLAY_ACTION_TYPE
}, noop);
registerAction({
  type: SELECT_ACTION_TYPE,
  event: SELECT_ACTION_TYPE,
  update: SELECT_ACTION_TYPE
}, noop);
registerAction({
  type: UNSELECT_ACTION_TYPE,
  event: UNSELECT_ACTION_TYPE,
  update: UNSELECT_ACTION_TYPE
}, noop);
registerAction({
  type: TOGGLE_SELECT_ACTION_TYPE,
  event: TOGGLE_SELECT_ACTION_TYPE,
  update: TOGGLE_SELECT_ACTION_TYPE
}, noop);
registerTheme("light", light_default);
registerTheme("dark", dark_default);

// node_modules/echarts/lib/extension.js
var extensions = [];
var extensionRegisters = {
  registerPreprocessor,
  registerProcessor,
  registerPostInit,
  registerPostUpdate,
  registerUpdateLifecycle,
  registerAction,
  registerCoordinateSystem,
  registerLayout,
  registerVisual,
  registerTransform,
  registerLoading,
  registerMap,
  registerImpl,
  PRIORITY,
  ComponentModel: Component_default,
  ComponentView: Component_default2,
  SeriesModel: Series_default,
  ChartView: Chart_default,
  // TODO Use ComponentModel and SeriesModel instead of Constructor
  registerComponentModel: function(ComponentModelClass) {
    Component_default.registerClass(ComponentModelClass);
  },
  registerComponentView: function(ComponentViewClass) {
    Component_default2.registerClass(ComponentViewClass);
  },
  registerSeriesModel: function(SeriesModelClass) {
    Series_default.registerClass(SeriesModelClass);
  },
  registerChartView: function(ChartViewClass) {
    Chart_default.registerClass(ChartViewClass);
  },
  registerSubTypeDefaulter: function(componentType, defaulter) {
    Component_default.registerSubTypeDefaulter(componentType, defaulter);
  },
  registerPainter: function(painterType, PainterCtor) {
    registerPainter(painterType, PainterCtor);
  }
};
function use(ext) {
  if (isArray(ext)) {
    each(ext, function(singleExt) {
      use(singleExt);
    });
    return;
  }
  if (indexOf(extensions, ext) >= 0) {
    return;
  }
  extensions.push(ext);
  if (isFunction(ext)) {
    ext = {
      install: ext
    };
  }
  ext.install(extensionRegisters);
}

// node_modules/echarts/lib/component/helper/interactionMutex.js
var ATTR = "\0_ec_interaction_mutex";
function isTaken(zr, resourceKey) {
  return !!getStore(zr)[resourceKey];
}
function getStore(zr) {
  return zr[ATTR] || (zr[ATTR] = {});
}
registerAction({
  type: "takeGlobalCursor",
  event: "globalCursorTaken",
  update: "update"
}, noop);

// node_modules/echarts/lib/component/helper/RoamController.js
var RoamController = (
  /** @class */
  function(_super) {
    __extends(RoamController2, _super);
    function RoamController2(zr) {
      var _this = _super.call(this) || this;
      _this._zr = zr;
      var mousedownHandler = bind(_this._mousedownHandler, _this);
      var mousemoveHandler = bind(_this._mousemoveHandler, _this);
      var mouseupHandler = bind(_this._mouseupHandler, _this);
      var mousewheelHandler = bind(_this._mousewheelHandler, _this);
      var pinchHandler = bind(_this._pinchHandler, _this);
      _this.enable = function(controlType, opt) {
        this.disable();
        this._opt = defaults(clone(opt) || {}, {
          zoomOnMouseWheel: true,
          moveOnMouseMove: true,
          // By default, wheel do not trigger move.
          moveOnMouseWheel: false,
          preventDefaultMouseMove: true
        });
        if (controlType == null) {
          controlType = true;
        }
        if (controlType === true || controlType === "move" || controlType === "pan") {
          zr.on("mousedown", mousedownHandler);
          zr.on("mousemove", mousemoveHandler);
          zr.on("mouseup", mouseupHandler);
        }
        if (controlType === true || controlType === "scale" || controlType === "zoom") {
          zr.on("mousewheel", mousewheelHandler);
          zr.on("pinch", pinchHandler);
        }
      };
      _this.disable = function() {
        zr.off("mousedown", mousedownHandler);
        zr.off("mousemove", mousemoveHandler);
        zr.off("mouseup", mouseupHandler);
        zr.off("mousewheel", mousewheelHandler);
        zr.off("pinch", pinchHandler);
      };
      return _this;
    }
    RoamController2.prototype.isDragging = function() {
      return this._dragging;
    };
    RoamController2.prototype.isPinching = function() {
      return this._pinching;
    };
    RoamController2.prototype.setPointerChecker = function(pointerChecker) {
      this.pointerChecker = pointerChecker;
    };
    RoamController2.prototype.dispose = function() {
      this.disable();
    };
    RoamController2.prototype._mousedownHandler = function(e2) {
      if (isMiddleOrRightButtonOnMouseUpDown(e2)) {
        return;
      }
      var el = e2.target;
      while (el) {
        if (el.draggable) {
          return;
        }
        el = el.__hostTarget || el.parent;
      }
      var x = e2.offsetX;
      var y = e2.offsetY;
      if (this.pointerChecker && this.pointerChecker(e2, x, y)) {
        this._x = x;
        this._y = y;
        this._dragging = true;
      }
    };
    RoamController2.prototype._mousemoveHandler = function(e2) {
      if (!this._dragging || !isAvailableBehavior("moveOnMouseMove", e2, this._opt) || e2.gestureEvent === "pinch" || isTaken(this._zr, "globalPan")) {
        return;
      }
      var x = e2.offsetX;
      var y = e2.offsetY;
      var oldX = this._x;
      var oldY = this._y;
      var dx = x - oldX;
      var dy = y - oldY;
      this._x = x;
      this._y = y;
      this._opt.preventDefaultMouseMove && stop(e2.event);
      trigger(this, "pan", "moveOnMouseMove", e2, {
        dx,
        dy,
        oldX,
        oldY,
        newX: x,
        newY: y,
        isAvailableBehavior: null
      });
    };
    RoamController2.prototype._mouseupHandler = function(e2) {
      if (!isMiddleOrRightButtonOnMouseUpDown(e2)) {
        this._dragging = false;
      }
    };
    RoamController2.prototype._mousewheelHandler = function(e2) {
      var shouldZoom = isAvailableBehavior("zoomOnMouseWheel", e2, this._opt);
      var shouldMove = isAvailableBehavior("moveOnMouseWheel", e2, this._opt);
      var wheelDelta = e2.wheelDelta;
      var absWheelDeltaDelta = Math.abs(wheelDelta);
      var originX = e2.offsetX;
      var originY = e2.offsetY;
      if (wheelDelta === 0 || !shouldZoom && !shouldMove) {
        return;
      }
      if (shouldZoom) {
        var factor = absWheelDeltaDelta > 3 ? 1.4 : absWheelDeltaDelta > 1 ? 1.2 : 1.1;
        var scale3 = wheelDelta > 0 ? factor : 1 / factor;
        checkPointerAndTrigger(this, "zoom", "zoomOnMouseWheel", e2, {
          scale: scale3,
          originX,
          originY,
          isAvailableBehavior: null
        });
      }
      if (shouldMove) {
        var absDelta = Math.abs(wheelDelta);
        var scrollDelta = (wheelDelta > 0 ? 1 : -1) * (absDelta > 3 ? 0.4 : absDelta > 1 ? 0.15 : 0.05);
        checkPointerAndTrigger(this, "scrollMove", "moveOnMouseWheel", e2, {
          scrollDelta,
          originX,
          originY,
          isAvailableBehavior: null
        });
      }
    };
    RoamController2.prototype._pinchHandler = function(e2) {
      if (isTaken(this._zr, "globalPan")) {
        return;
      }
      var scale3 = e2.pinchScale > 1 ? 1.1 : 1 / 1.1;
      checkPointerAndTrigger(this, "zoom", null, e2, {
        scale: scale3,
        originX: e2.pinchX,
        originY: e2.pinchY,
        isAvailableBehavior: null
      });
    };
    return RoamController2;
  }(Eventful_default)
);
function checkPointerAndTrigger(controller, eventName, behaviorToCheck, e2, contollerEvent) {
  if (controller.pointerChecker && controller.pointerChecker(e2, contollerEvent.originX, contollerEvent.originY)) {
    stop(e2.event);
    trigger(controller, eventName, behaviorToCheck, e2, contollerEvent);
  }
}
function trigger(controller, eventName, behaviorToCheck, e2, contollerEvent) {
  contollerEvent.isAvailableBehavior = bind(isAvailableBehavior, null, behaviorToCheck, e2);
  controller.trigger(eventName, contollerEvent);
}
function isAvailableBehavior(behaviorToCheck, e2, settings) {
  var setting = settings[behaviorToCheck];
  return !behaviorToCheck || setting && (!isString(setting) || e2.event[setting + "Key"]);
}
var RoamController_default = RoamController;

// node_modules/echarts/lib/data/helper/linkSeriesData.js
var inner6 = makeInner();
function linkSeriesData(opt) {
  var mainData = opt.mainData;
  var datas = opt.datas;
  if (!datas) {
    datas = {
      main: mainData
    };
    opt.datasAttr = {
      main: "data"
    };
  }
  opt.datas = opt.mainData = null;
  linkAll(mainData, datas, opt);
  each(datas, function(data) {
    each(mainData.TRANSFERABLE_METHODS, function(methodName) {
      data.wrapMethod(methodName, curry(transferInjection, opt));
    });
  });
  mainData.wrapMethod("cloneShallow", curry(cloneShallowInjection, opt));
  each(mainData.CHANGABLE_METHODS, function(methodName) {
    mainData.wrapMethod(methodName, curry(changeInjection, opt));
  });
  assert(datas[mainData.dataType] === mainData);
}
function transferInjection(opt, res) {
  if (isMainData(this)) {
    var datas = extend({}, inner6(this).datas);
    datas[this.dataType] = res;
    linkAll(res, datas, opt);
  } else {
    linkSingle(res, this.dataType, inner6(this).mainData, opt);
  }
  return res;
}
function changeInjection(opt, res) {
  opt.struct && opt.struct.update();
  return res;
}
function cloneShallowInjection(opt, res) {
  each(inner6(res).datas, function(data, dataType) {
    data !== res && linkSingle(data.cloneShallow(), dataType, res, opt);
  });
  return res;
}
function getLinkedData(dataType) {
  var mainData = inner6(this).mainData;
  return dataType == null || mainData == null ? mainData : inner6(mainData).datas[dataType];
}
function getLinkedDataAll() {
  var mainData = inner6(this).mainData;
  return mainData == null ? [{
    data: mainData
  }] : map(keys(inner6(mainData).datas), function(type) {
    return {
      type,
      data: inner6(mainData).datas[type]
    };
  });
}
function isMainData(data) {
  return inner6(data).mainData === data;
}
function linkAll(mainData, datas, opt) {
  inner6(mainData).datas = {};
  each(datas, function(data, dataType) {
    linkSingle(data, dataType, mainData, opt);
  });
}
function linkSingle(data, dataType, mainData, opt) {
  inner6(mainData).datas[dataType] = data;
  inner6(data).mainData = mainData;
  data.dataType = dataType;
  if (opt.struct) {
    data[opt.structAttr] = opt.struct;
    opt.struct[opt.datasAttr[dataType]] = data;
  }
  data.getLinkedData = getLinkedData;
  data.getLinkedDataAll = getLinkedDataAll;
}
var linkSeriesData_default = linkSeriesData;

// node_modules/echarts/lib/data/Tree.js
var TreeNode = (
  /** @class */
  function() {
    function TreeNode2(name, hostTree) {
      this.depth = 0;
      this.height = 0;
      this.dataIndex = -1;
      this.children = [];
      this.viewChildren = [];
      this.isExpand = false;
      this.name = name || "";
      this.hostTree = hostTree;
    }
    TreeNode2.prototype.isRemoved = function() {
      return this.dataIndex < 0;
    };
    TreeNode2.prototype.eachNode = function(options, cb, context) {
      if (isFunction(options)) {
        context = cb;
        cb = options;
        options = null;
      }
      options = options || {};
      if (isString(options)) {
        options = {
          order: options
        };
      }
      var order = options.order || "preorder";
      var children = this[options.attr || "children"];
      var suppressVisitSub;
      order === "preorder" && (suppressVisitSub = cb.call(context, this));
      for (var i = 0; !suppressVisitSub && i < children.length; i++) {
        children[i].eachNode(options, cb, context);
      }
      order === "postorder" && cb.call(context, this);
    };
    TreeNode2.prototype.updateDepthAndHeight = function(depth) {
      var height = 0;
      this.depth = depth;
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.updateDepthAndHeight(depth + 1);
        if (child.height > height) {
          height = child.height;
        }
      }
      this.height = height + 1;
    };
    TreeNode2.prototype.getNodeById = function(id) {
      if (this.getId() === id) {
        return this;
      }
      for (var i = 0, children = this.children, len2 = children.length; i < len2; i++) {
        var res = children[i].getNodeById(id);
        if (res) {
          return res;
        }
      }
    };
    TreeNode2.prototype.contains = function(node) {
      if (node === this) {
        return true;
      }
      for (var i = 0, children = this.children, len2 = children.length; i < len2; i++) {
        var res = children[i].contains(node);
        if (res) {
          return res;
        }
      }
    };
    TreeNode2.prototype.getAncestors = function(includeSelf) {
      var ancestors = [];
      var node = includeSelf ? this : this.parentNode;
      while (node) {
        ancestors.push(node);
        node = node.parentNode;
      }
      ancestors.reverse();
      return ancestors;
    };
    TreeNode2.prototype.getAncestorsIndices = function() {
      var indices = [];
      var currNode = this;
      while (currNode) {
        indices.push(currNode.dataIndex);
        currNode = currNode.parentNode;
      }
      indices.reverse();
      return indices;
    };
    TreeNode2.prototype.getDescendantIndices = function() {
      var indices = [];
      this.eachNode(function(childNode) {
        indices.push(childNode.dataIndex);
      });
      return indices;
    };
    TreeNode2.prototype.getValue = function(dimension) {
      var data = this.hostTree.data;
      return data.getStore().get(data.getDimensionIndex(dimension || "value"), this.dataIndex);
    };
    TreeNode2.prototype.setLayout = function(layout, merge2) {
      this.dataIndex >= 0 && this.hostTree.data.setItemLayout(this.dataIndex, layout, merge2);
    };
    TreeNode2.prototype.getLayout = function() {
      return this.hostTree.data.getItemLayout(this.dataIndex);
    };
    TreeNode2.prototype.getModel = function(path3) {
      if (this.dataIndex < 0) {
        return;
      }
      var hostTree = this.hostTree;
      var itemModel = hostTree.data.getItemModel(this.dataIndex);
      return itemModel.getModel(path3);
    };
    TreeNode2.prototype.getLevelModel = function() {
      return (this.hostTree.levelModels || [])[this.depth];
    };
    TreeNode2.prototype.setVisual = function(key, value) {
      this.dataIndex >= 0 && this.hostTree.data.setItemVisual(this.dataIndex, key, value);
    };
    TreeNode2.prototype.getVisual = function(key) {
      return this.hostTree.data.getItemVisual(this.dataIndex, key);
    };
    TreeNode2.prototype.getRawIndex = function() {
      return this.hostTree.data.getRawIndex(this.dataIndex);
    };
    TreeNode2.prototype.getId = function() {
      return this.hostTree.data.getId(this.dataIndex);
    };
    TreeNode2.prototype.getChildIndex = function() {
      if (this.parentNode) {
        var children = this.parentNode.children;
        for (var i = 0; i < children.length; ++i) {
          if (children[i] === this) {
            return i;
          }
        }
        return -1;
      }
      return -1;
    };
    TreeNode2.prototype.isAncestorOf = function(node) {
      var parent = node.parentNode;
      while (parent) {
        if (parent === this) {
          return true;
        }
        parent = parent.parentNode;
      }
      return false;
    };
    TreeNode2.prototype.isDescendantOf = function(node) {
      return node !== this && node.isAncestorOf(this);
    };
    return TreeNode2;
  }()
);
var Tree = (
  /** @class */
  function() {
    function Tree2(hostModel) {
      this.type = "tree";
      this._nodes = [];
      this.hostModel = hostModel;
    }
    Tree2.prototype.eachNode = function(options, cb, context) {
      this.root.eachNode(options, cb, context);
    };
    Tree2.prototype.getNodeByDataIndex = function(dataIndex) {
      var rawIndex = this.data.getRawIndex(dataIndex);
      return this._nodes[rawIndex];
    };
    Tree2.prototype.getNodeById = function(name) {
      return this.root.getNodeById(name);
    };
    Tree2.prototype.update = function() {
      var data = this.data;
      var nodes = this._nodes;
      for (var i = 0, len2 = nodes.length; i < len2; i++) {
        nodes[i].dataIndex = -1;
      }
      for (var i = 0, len2 = data.count(); i < len2; i++) {
        nodes[data.getRawIndex(i)].dataIndex = i;
      }
    };
    Tree2.prototype.clearLayouts = function() {
      this.data.clearItemLayouts();
    };
    Tree2.createTree = function(dataRoot, hostModel, beforeLink) {
      var tree = new Tree2(hostModel);
      var listData = [];
      var dimMax = 1;
      buildHierarchy(dataRoot);
      function buildHierarchy(dataNode, parentNode2) {
        var value = dataNode.value;
        dimMax = Math.max(dimMax, isArray(value) ? value.length : 1);
        listData.push(dataNode);
        var node = new TreeNode(convertOptionIdName(dataNode.name, ""), tree);
        parentNode2 ? addChild(node, parentNode2) : tree.root = node;
        tree._nodes.push(node);
        var children = dataNode.children;
        if (children) {
          for (var i = 0; i < children.length; i++) {
            buildHierarchy(children[i], node);
          }
        }
      }
      tree.root.updateDepthAndHeight(0);
      var dimensions = prepareSeriesDataSchema(listData, {
        coordDimensions: ["value"],
        dimensionsCount: dimMax
      }).dimensions;
      var list = new SeriesData_default(dimensions, hostModel);
      list.initData(listData);
      beforeLink && beforeLink(list);
      linkSeriesData_default({
        mainData: list,
        struct: tree,
        structAttr: "tree"
      });
      tree.update();
      return tree;
    };
    return Tree2;
  }()
);
function addChild(child, node) {
  var children = node.children;
  if (child.parentNode === node) {
    return;
  }
  children.push(child);
  child.parentNode = node;
}
var Tree_default = Tree;

// node_modules/echarts/lib/chart/helper/treeHelper.js
function retrieveTargetInfo(payload, validPayloadTypes, seriesModel) {
  if (payload && indexOf(validPayloadTypes, payload.type) >= 0) {
    var root = seriesModel.getData().tree.root;
    var targetNode = payload.targetNode;
    if (isString(targetNode)) {
      targetNode = root.getNodeById(targetNode);
    }
    if (targetNode && root.contains(targetNode)) {
      return {
        node: targetNode
      };
    }
    var targetNodeId = payload.targetNodeId;
    if (targetNodeId != null && (targetNode = root.getNodeById(targetNodeId))) {
      return {
        node: targetNode
      };
    }
  }
}
function getPathToRoot(node) {
  var path3 = [];
  while (node) {
    node = node.parentNode;
    node && path3.push(node);
  }
  return path3.reverse();
}
function aboveViewRoot(viewRoot, node) {
  var viewPath = getPathToRoot(viewRoot);
  return indexOf(viewPath, node) >= 0;
}
function wrapTreePathInfo(node, seriesModel) {
  var treePathInfo = [];
  while (node) {
    var nodeDataIndex = node.dataIndex;
    treePathInfo.push({
      name: node.name,
      dataIndex: nodeDataIndex,
      value: seriesModel.getRawValue(nodeDataIndex)
    });
    node = node.parentNode;
  }
  treePathInfo.reverse();
  return treePathInfo;
}

// node_modules/echarts/lib/chart/treemap/treemapAction.js
var actionTypes = ["treemapZoomToNode", "treemapRender", "treemapMove"];
function installTreemapAction(registers) {
  for (var i = 0; i < actionTypes.length; i++) {
    registers.registerAction({
      type: actionTypes[i],
      update: "updateView"
    }, noop);
  }
  registers.registerAction({
    type: "treemapRootToNode",
    update: "updateView"
  }, function(payload, ecModel) {
    ecModel.eachComponent({
      mainType: "series",
      subType: "treemap",
      query: payload
    }, handleRootToNode);
    function handleRootToNode(model, index) {
      var types = ["treemapZoomToNode", "treemapRootToNode"];
      var targetInfo = retrieveTargetInfo(payload, types, model);
      if (targetInfo) {
        var originViewRoot = model.getViewRoot();
        if (originViewRoot) {
          payload.direction = aboveViewRoot(originViewRoot, targetInfo.node) ? "rollUp" : "drillDown";
        }
        model.resetViewRoot(targetInfo.node);
      }
    }
  });
}

// node_modules/echarts/lib/chart/helper/enableAriaDecalForTree.js
function enableAriaDecalForTree(seriesModel) {
  var data = seriesModel.getData();
  var tree = data.tree;
  var decalPaletteScope = {};
  tree.eachNode(function(node) {
    var current = node;
    while (current && current.depth > 1) {
      current = current.parentNode;
    }
    var decal = getDecalFromPalette(seriesModel.ecModel, current.name || current.dataIndex + "", decalPaletteScope);
    node.setVisual("decal", decal);
  });
}

// node_modules/echarts/lib/chart/treemap/TreemapSeries.js
var TreemapSeriesModel = (
  /** @class */
  function(_super) {
    __extends(TreemapSeriesModel2, _super);
    function TreemapSeriesModel2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = TreemapSeriesModel2.type;
      _this.preventUsingHoverLayer = true;
      return _this;
    }
    TreemapSeriesModel2.prototype.getInitialData = function(option, ecModel) {
      var root = {
        name: option.name,
        children: option.data
      };
      completeTreeValue(root);
      var levels = option.levels || [];
      var designatedVisualItemStyle = this.designatedVisualItemStyle = {};
      var designatedVisualModel = new Model_default({
        itemStyle: designatedVisualItemStyle
      }, this, ecModel);
      levels = option.levels = setDefault(levels, ecModel);
      var levelModels = map(levels || [], function(levelDefine) {
        return new Model_default(levelDefine, designatedVisualModel, ecModel);
      }, this);
      var tree = Tree_default.createTree(root, this, beforeLink);
      function beforeLink(nodeData) {
        nodeData.wrapMethod("getItemModel", function(model, idx) {
          var node = tree.getNodeByDataIndex(idx);
          var levelModel = node ? levelModels[node.depth] : null;
          model.parentModel = levelModel || designatedVisualModel;
          return model;
        });
      }
      return tree.data;
    };
    TreemapSeriesModel2.prototype.optionUpdated = function() {
      this.resetViewRoot();
    };
    TreemapSeriesModel2.prototype.formatTooltip = function(dataIndex, multipleSeries, dataType) {
      var data = this.getData();
      var value = this.getRawValue(dataIndex);
      var name = data.getName(dataIndex);
      return createTooltipMarkup("nameValue", {
        name,
        value
      });
    };
    TreemapSeriesModel2.prototype.getDataParams = function(dataIndex) {
      var params = _super.prototype.getDataParams.apply(this, arguments);
      var node = this.getData().tree.getNodeByDataIndex(dataIndex);
      params.treeAncestors = wrapTreePathInfo(node, this);
      params.treePathInfo = params.treeAncestors;
      return params;
    };
    TreemapSeriesModel2.prototype.setLayoutInfo = function(layoutInfo) {
      this.layoutInfo = this.layoutInfo || {};
      extend(this.layoutInfo, layoutInfo);
    };
    TreemapSeriesModel2.prototype.mapIdToIndex = function(id) {
      var idIndexMap = this._idIndexMap;
      if (!idIndexMap) {
        idIndexMap = this._idIndexMap = createHashMap();
        this._idIndexMapCount = 0;
      }
      var index = idIndexMap.get(id);
      if (index == null) {
        idIndexMap.set(id, index = this._idIndexMapCount++);
      }
      return index;
    };
    TreemapSeriesModel2.prototype.getViewRoot = function() {
      return this._viewRoot;
    };
    TreemapSeriesModel2.prototype.resetViewRoot = function(viewRoot) {
      viewRoot ? this._viewRoot = viewRoot : viewRoot = this._viewRoot;
      var root = this.getRawData().tree.root;
      if (!viewRoot || viewRoot !== root && !root.contains(viewRoot)) {
        this._viewRoot = root;
      }
    };
    TreemapSeriesModel2.prototype.enableAriaDecal = function() {
      enableAriaDecalForTree(this);
    };
    TreemapSeriesModel2.type = "series.treemap";
    TreemapSeriesModel2.layoutMode = "box";
    TreemapSeriesModel2.defaultOption = {
      // Disable progressive rendering
      progressive: 0,
      // size: ['80%', '80%'],            // deprecated, compatible with ec2.
      left: "center",
      top: "middle",
      width: "80%",
      height: "80%",
      sort: true,
      clipWindow: "origin",
      squareRatio: 0.5 * (1 + Math.sqrt(5)),
      leafDepth: null,
      drillDownIcon: "\u25B6",
      // to align specialized icon. ▷▶❒❐▼✚
      zoomToNodeRatio: 0.32 * 0.32,
      roam: true,
      nodeClick: "zoomToNode",
      animation: true,
      animationDurationUpdate: 900,
      animationEasing: "quinticInOut",
      breadcrumb: {
        show: true,
        height: 22,
        left: "center",
        top: "bottom",
        // right
        // bottom
        emptyItemWidth: 25,
        itemStyle: {
          color: "rgba(0,0,0,0.7)",
          textStyle: {
            color: "#fff"
          }
        },
        emphasis: {
          itemStyle: {
            color: "rgba(0,0,0,0.9)"
            // '#5793f3',
          }
        }
      },
      label: {
        show: true,
        // Do not use textDistance, for ellipsis rect just the same as treemap node rect.
        distance: 0,
        padding: 5,
        position: "inside",
        // formatter: null,
        color: "#fff",
        overflow: "truncate"
        // align
        // verticalAlign
      },
      upperLabel: {
        show: false,
        position: [0, "50%"],
        height: 20,
        // formatter: null,
        // color: '#fff',
        overflow: "truncate",
        // align: null,
        verticalAlign: "middle"
      },
      itemStyle: {
        color: null,
        colorAlpha: null,
        colorSaturation: null,
        borderWidth: 0,
        gapWidth: 0,
        borderColor: "#fff",
        borderColorSaturation: null
        // If specified, borderColor will be ineffective, and the
        // border color is evaluated by color of current node and
        // borderColorSaturation.
      },
      emphasis: {
        upperLabel: {
          show: true,
          position: [0, "50%"],
          overflow: "truncate",
          verticalAlign: "middle"
        }
      },
      visualDimension: 0,
      visualMin: null,
      visualMax: null,
      color: [],
      // level[n].color (if necessary).
      // + Specify color list of each level. level[0].color would be global
      // color list if not specified. (see method `setDefault`).
      // + But set as a empty array to forbid fetch color from global palette
      // when using nodeModel.get('color'), otherwise nodes on deep level
      // will always has color palette set and are not able to inherit color
      // from parent node.
      // + TreemapSeries.color can not be set as 'none', otherwise effect
      // legend color fetching (see seriesColor.js).
      colorAlpha: null,
      colorSaturation: null,
      colorMappingBy: "index",
      visibleMin: 10,
      // be rendered. Only works when sort is 'asc' or 'desc'.
      childrenVisibleMin: null,
      // grandchildren will not show.
      // Why grandchildren? If not grandchildren but children,
      // some siblings show children and some not,
      // the appearance may be mess and not consistent,
      levels: []
      // Each item: {
      //     visibleMin, itemStyle, visualDimension, label
      // }
    };
    return TreemapSeriesModel2;
  }(Series_default)
);
function completeTreeValue(dataNode) {
  var sum = 0;
  each(dataNode.children, function(child) {
    completeTreeValue(child);
    var childValue = child.value;
    isArray(childValue) && (childValue = childValue[0]);
    sum += childValue;
  });
  var thisValue = dataNode.value;
  if (isArray(thisValue)) {
    thisValue = thisValue[0];
  }
  if (thisValue == null || isNaN(thisValue)) {
    thisValue = sum;
  }
  if (thisValue < 0) {
    thisValue = 0;
  }
  isArray(dataNode.value) ? dataNode.value[0] = thisValue : dataNode.value = thisValue;
}
function setDefault(levels, ecModel) {
  var globalColorList = normalizeToArray(ecModel.get("color"));
  var globalDecalList = normalizeToArray(ecModel.get(["aria", "decal", "decals"]));
  if (!globalColorList) {
    return;
  }
  levels = levels || [];
  var hasColorDefine;
  var hasDecalDefine;
  each(levels, function(levelDefine) {
    var model = new Model_default(levelDefine);
    var modelColor = model.get("color");
    var modelDecal = model.get("decal");
    if (model.get(["itemStyle", "color"]) || modelColor && modelColor !== "none") {
      hasColorDefine = true;
    }
    if (model.get(["itemStyle", "decal"]) || modelDecal && modelDecal !== "none") {
      hasDecalDefine = true;
    }
  });
  var level0 = levels[0] || (levels[0] = {});
  if (!hasColorDefine) {
    level0.color = globalColorList.slice();
  }
  if (!hasDecalDefine && globalDecalList) {
    level0.decal = globalDecalList.slice();
  }
  return levels;
}
var TreemapSeries_default = TreemapSeriesModel;

// node_modules/echarts/lib/chart/treemap/Breadcrumb.js
var TEXT_PADDING = 8;
var ITEM_GAP = 8;
var ARRAY_LENGTH = 5;
var Breadcrumb = (
  /** @class */
  function() {
    function Breadcrumb2(containerGroup) {
      this.group = new Group_default();
      containerGroup.add(this.group);
    }
    Breadcrumb2.prototype.render = function(seriesModel, api, targetNode, onSelect) {
      var model = seriesModel.getModel("breadcrumb");
      var thisGroup = this.group;
      thisGroup.removeAll();
      if (!model.get("show") || !targetNode) {
        return;
      }
      var normalStyleModel = model.getModel("itemStyle");
      var emphasisModel = model.getModel("emphasis");
      var textStyleModel = normalStyleModel.getModel("textStyle");
      var emphasisTextStyleModel = emphasisModel.getModel(["itemStyle", "textStyle"]);
      var layoutParam = {
        pos: {
          left: model.get("left"),
          right: model.get("right"),
          top: model.get("top"),
          bottom: model.get("bottom")
        },
        box: {
          width: api.getWidth(),
          height: api.getHeight()
        },
        emptyItemWidth: model.get("emptyItemWidth"),
        totalWidth: 0,
        renderList: []
      };
      this._prepare(targetNode, layoutParam, textStyleModel);
      this._renderContent(seriesModel, layoutParam, normalStyleModel, emphasisModel, textStyleModel, emphasisTextStyleModel, onSelect);
      positionElement(thisGroup, layoutParam.pos, layoutParam.box);
    };
    Breadcrumb2.prototype._prepare = function(targetNode, layoutParam, textStyleModel) {
      for (var node = targetNode; node; node = node.parentNode) {
        var text = convertOptionIdName(node.getModel().get("name"), "");
        var textRect = textStyleModel.getTextRect(text);
        var itemWidth = Math.max(textRect.width + TEXT_PADDING * 2, layoutParam.emptyItemWidth);
        layoutParam.totalWidth += itemWidth + ITEM_GAP;
        layoutParam.renderList.push({
          node,
          text,
          width: itemWidth
        });
      }
    };
    Breadcrumb2.prototype._renderContent = function(seriesModel, layoutParam, normalStyleModel, emphasisModel, textStyleModel, emphasisTextStyleModel, onSelect) {
      var lastX = 0;
      var emptyItemWidth = layoutParam.emptyItemWidth;
      var height = seriesModel.get(["breadcrumb", "height"]);
      var availableSize = getAvailableSize(layoutParam.pos, layoutParam.box);
      var totalWidth = layoutParam.totalWidth;
      var renderList = layoutParam.renderList;
      var emphasisItemStyle = emphasisModel.getModel("itemStyle").getItemStyle();
      for (var i = renderList.length - 1; i >= 0; i--) {
        var item = renderList[i];
        var itemNode = item.node;
        var itemWidth = item.width;
        var text = item.text;
        if (totalWidth > availableSize.width) {
          totalWidth -= itemWidth - emptyItemWidth;
          itemWidth = emptyItemWidth;
          text = null;
        }
        var el = new Polygon_default({
          shape: {
            points: makeItemPoints(lastX, 0, itemWidth, height, i === renderList.length - 1, i === 0)
          },
          style: defaults(normalStyleModel.getItemStyle(), {
            lineJoin: "bevel"
          }),
          textContent: new Text_default({
            style: createTextStyle(textStyleModel, {
              text
            })
          }),
          textConfig: {
            position: "inside"
          },
          z2: Z2_EMPHASIS_LIFT * 1e4,
          onclick: curry(onSelect, itemNode)
        });
        el.disableLabelAnimation = true;
        el.getTextContent().ensureState("emphasis").style = createTextStyle(emphasisTextStyleModel, {
          text
        });
        el.ensureState("emphasis").style = emphasisItemStyle;
        toggleHoverEmphasis(el, emphasisModel.get("focus"), emphasisModel.get("blurScope"), emphasisModel.get("disabled"));
        this.group.add(el);
        packEventData(el, seriesModel, itemNode);
        lastX += itemWidth + ITEM_GAP;
      }
    };
    Breadcrumb2.prototype.remove = function() {
      this.group.removeAll();
    };
    return Breadcrumb2;
  }()
);
function makeItemPoints(x, y, itemWidth, itemHeight, head, tail) {
  var points2 = [[head ? x : x - ARRAY_LENGTH, y], [x + itemWidth, y], [x + itemWidth, y + itemHeight], [head ? x : x - ARRAY_LENGTH, y + itemHeight]];
  !tail && points2.splice(2, 0, [x + itemWidth + ARRAY_LENGTH, y + itemHeight / 2]);
  !head && points2.push([x, y + itemHeight / 2]);
  return points2;
}
function packEventData(el, seriesModel, itemNode) {
  getECData(el).eventData = {
    componentType: "series",
    componentSubType: "treemap",
    componentIndex: seriesModel.componentIndex,
    seriesIndex: seriesModel.seriesIndex,
    seriesName: seriesModel.name,
    seriesType: "treemap",
    selfType: "breadcrumb",
    nodeData: {
      dataIndex: itemNode && itemNode.dataIndex,
      name: itemNode && itemNode.name
    },
    treePathInfo: itemNode && wrapTreePathInfo(itemNode, seriesModel)
  };
}
var Breadcrumb_default = Breadcrumb;

// node_modules/echarts/lib/util/animation.js
var AnimationWrap = (
  /** @class */
  function() {
    function AnimationWrap2() {
      this._storage = [];
      this._elExistsMap = {};
    }
    AnimationWrap2.prototype.add = function(el, target, duration, delay, easing) {
      if (this._elExistsMap[el.id]) {
        return false;
      }
      this._elExistsMap[el.id] = true;
      this._storage.push({
        el,
        target,
        duration,
        delay,
        easing
      });
      return true;
    };
    AnimationWrap2.prototype.finished = function(callback) {
      this._finishedCallback = callback;
      return this;
    };
    AnimationWrap2.prototype.start = function() {
      var _this = this;
      var count = this._storage.length;
      var checkTerminate = function() {
        count--;
        if (count <= 0) {
          _this._storage.length = 0;
          _this._elExistsMap = {};
          _this._finishedCallback && _this._finishedCallback();
        }
      };
      for (var i = 0, len2 = this._storage.length; i < len2; i++) {
        var item = this._storage[i];
        item.el.animateTo(item.target, {
          duration: item.duration,
          delay: item.delay,
          easing: item.easing,
          setToFinal: true,
          done: checkTerminate,
          aborted: checkTerminate
        });
      }
      return this;
    };
    return AnimationWrap2;
  }()
);
function createWrap() {
  return new AnimationWrap();
}

// node_modules/echarts/lib/chart/treemap/TreemapView.js
var Group2 = Group_default;
var Rect2 = Rect_default;
var DRAG_THRESHOLD = 3;
var PATH_LABEL_NOAMAL = "label";
var PATH_UPPERLABEL_NORMAL = "upperLabel";
var Z2_BASE = Z2_EMPHASIS_LIFT * 10;
var Z2_BG = Z2_EMPHASIS_LIFT * 2;
var Z2_CONTENT = Z2_EMPHASIS_LIFT * 3;
var getStateItemStyle = makeStyleMapper([
  ["fill", "color"],
  // `borderColor` and `borderWidth` has been occupied,
  // so use `stroke` to indicate the stroke of the rect.
  ["stroke", "strokeColor"],
  ["lineWidth", "strokeWidth"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
]);
var getItemStyleNormal = function(model) {
  var itemStyle = getStateItemStyle(model);
  itemStyle.stroke = itemStyle.fill = itemStyle.lineWidth = null;
  return itemStyle;
};
var inner7 = makeInner();
var TreemapView = (
  /** @class */
  function(_super) {
    __extends(TreemapView2, _super);
    function TreemapView2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = TreemapView2.type;
      _this._state = "ready";
      _this._storage = createStorage();
      return _this;
    }
    TreemapView2.prototype.render = function(seriesModel, ecModel, api, payload) {
      var models = ecModel.findComponents({
        mainType: "series",
        subType: "treemap",
        query: payload
      });
      if (indexOf(models, seriesModel) < 0) {
        return;
      }
      this.seriesModel = seriesModel;
      this.api = api;
      this.ecModel = ecModel;
      var types = ["treemapZoomToNode", "treemapRootToNode"];
      var targetInfo = retrieveTargetInfo(payload, types, seriesModel);
      var payloadType = payload && payload.type;
      var layoutInfo = seriesModel.layoutInfo;
      var isInit = !this._oldTree;
      var thisStorage = this._storage;
      var reRoot = payloadType === "treemapRootToNode" && targetInfo && thisStorage ? {
        rootNodeGroup: thisStorage.nodeGroup[targetInfo.node.getRawIndex()],
        direction: payload.direction
      } : null;
      var containerGroup = this._giveContainerGroup(layoutInfo);
      var hasAnimation = seriesModel.get("animation");
      var renderResult = this._doRender(containerGroup, seriesModel, reRoot);
      hasAnimation && !isInit && (!payloadType || payloadType === "treemapZoomToNode" || payloadType === "treemapRootToNode") ? this._doAnimation(containerGroup, renderResult, seriesModel, reRoot) : renderResult.renderFinally();
      this._resetController(api);
      this._renderBreadcrumb(seriesModel, api, targetInfo);
    };
    TreemapView2.prototype._giveContainerGroup = function(layoutInfo) {
      var containerGroup = this._containerGroup;
      if (!containerGroup) {
        containerGroup = this._containerGroup = new Group2();
        this._initEvents(containerGroup);
        this.group.add(containerGroup);
      }
      containerGroup.x = layoutInfo.x;
      containerGroup.y = layoutInfo.y;
      return containerGroup;
    };
    TreemapView2.prototype._doRender = function(containerGroup, seriesModel, reRoot) {
      var thisTree = seriesModel.getData().tree;
      var oldTree = this._oldTree;
      var lastsForAnimation = createStorage();
      var thisStorage = createStorage();
      var oldStorage = this._storage;
      var willInvisibleEls = [];
      function doRenderNode(thisNode, oldNode, parentGroup, depth) {
        return renderNode(seriesModel, thisStorage, oldStorage, reRoot, lastsForAnimation, willInvisibleEls, thisNode, oldNode, parentGroup, depth);
      }
      dualTravel(thisTree.root ? [thisTree.root] : [], oldTree && oldTree.root ? [oldTree.root] : [], containerGroup, thisTree === oldTree || !oldTree, 0);
      var willDeleteEls = clearStorage(oldStorage);
      this._oldTree = thisTree;
      this._storage = thisStorage;
      return {
        lastsForAnimation,
        willDeleteEls,
        renderFinally
      };
      function dualTravel(thisViewChildren, oldViewChildren, parentGroup, sameTree, depth) {
        if (sameTree) {
          oldViewChildren = thisViewChildren;
          each(thisViewChildren, function(child, index) {
            !child.isRemoved() && processNode(index, index);
          });
        } else {
          new DataDiffer_default(oldViewChildren, thisViewChildren, getKey, getKey).add(processNode).update(processNode).remove(curry(processNode, null)).execute();
        }
        function getKey(node) {
          return node.getId();
        }
        function processNode(newIndex, oldIndex) {
          var thisNode = newIndex != null ? thisViewChildren[newIndex] : null;
          var oldNode = oldIndex != null ? oldViewChildren[oldIndex] : null;
          var group = doRenderNode(thisNode, oldNode, parentGroup, depth);
          group && dualTravel(thisNode && thisNode.viewChildren || [], oldNode && oldNode.viewChildren || [], group, sameTree, depth + 1);
        }
      }
      function clearStorage(storage) {
        var willDeleteEls2 = createStorage();
        storage && each(storage, function(store, storageName) {
          var delEls = willDeleteEls2[storageName];
          each(store, function(el) {
            el && (delEls.push(el), inner7(el).willDelete = true);
          });
        });
        return willDeleteEls2;
      }
      function renderFinally() {
        each(willDeleteEls, function(els) {
          each(els, function(el) {
            el.parent && el.parent.remove(el);
          });
        });
        each(willInvisibleEls, function(el) {
          el.invisible = true;
          el.dirty();
        });
      }
    };
    TreemapView2.prototype._doAnimation = function(containerGroup, renderResult, seriesModel, reRoot) {
      var durationOption = seriesModel.get("animationDurationUpdate");
      var easingOption = seriesModel.get("animationEasing");
      var duration = (isFunction(durationOption) ? 0 : durationOption) || 0;
      var easing = (isFunction(easingOption) ? null : easingOption) || "cubicOut";
      var animationWrap = createWrap();
      each(renderResult.willDeleteEls, function(store, storageName) {
        each(store, function(el, rawIndex) {
          if (el.invisible) {
            return;
          }
          var parent = el.parent;
          var target;
          var innerStore = inner7(parent);
          if (reRoot && reRoot.direction === "drillDown") {
            target = parent === reRoot.rootNodeGroup ? {
              shape: {
                x: 0,
                y: 0,
                width: innerStore.nodeWidth,
                height: innerStore.nodeHeight
              },
              style: {
                opacity: 0
              }
            } : {
              style: {
                opacity: 0
              }
            };
          } else {
            var targetX = 0;
            var targetY = 0;
            if (!innerStore.willDelete) {
              targetX = innerStore.nodeWidth / 2;
              targetY = innerStore.nodeHeight / 2;
            }
            target = storageName === "nodeGroup" ? {
              x: targetX,
              y: targetY,
              style: {
                opacity: 0
              }
            } : {
              shape: {
                x: targetX,
                y: targetY,
                width: 0,
                height: 0
              },
              style: {
                opacity: 0
              }
            };
          }
          target && animationWrap.add(el, target, duration, 0, easing);
        });
      });
      each(this._storage, function(store, storageName) {
        each(store, function(el, rawIndex) {
          var last = renderResult.lastsForAnimation[storageName][rawIndex];
          var target = {};
          if (!last) {
            return;
          }
          if (el instanceof Group_default) {
            if (last.oldX != null) {
              target.x = el.x;
              target.y = el.y;
              el.x = last.oldX;
              el.y = last.oldY;
            }
          } else {
            if (last.oldShape) {
              target.shape = extend({}, el.shape);
              el.setShape(last.oldShape);
            }
            if (last.fadein) {
              el.setStyle("opacity", 0);
              target.style = {
                opacity: 1
              };
            } else if (el.style.opacity !== 1) {
              target.style = {
                opacity: 1
              };
            }
          }
          animationWrap.add(el, target, duration, 0, easing);
        });
      }, this);
      this._state = "animating";
      animationWrap.finished(bind(function() {
        this._state = "ready";
        renderResult.renderFinally();
      }, this)).start();
    };
    TreemapView2.prototype._resetController = function(api) {
      var controller = this._controller;
      if (!controller) {
        controller = this._controller = new RoamController_default(api.getZr());
        controller.enable(this.seriesModel.get("roam"));
        controller.on("pan", bind(this._onPan, this));
        controller.on("zoom", bind(this._onZoom, this));
      }
      var rect = new BoundingRect_default(0, 0, api.getWidth(), api.getHeight());
      controller.setPointerChecker(function(e2, x, y) {
        return rect.contain(x, y);
      });
    };
    TreemapView2.prototype._clearController = function() {
      var controller = this._controller;
      if (controller) {
        controller.dispose();
        controller = null;
      }
    };
    TreemapView2.prototype._onPan = function(e2) {
      if (this._state !== "animating" && (Math.abs(e2.dx) > DRAG_THRESHOLD || Math.abs(e2.dy) > DRAG_THRESHOLD)) {
        var root = this.seriesModel.getData().tree.root;
        if (!root) {
          return;
        }
        var rootLayout = root.getLayout();
        if (!rootLayout) {
          return;
        }
        this.api.dispatchAction({
          type: "treemapMove",
          from: this.uid,
          seriesId: this.seriesModel.id,
          rootRect: {
            x: rootLayout.x + e2.dx,
            y: rootLayout.y + e2.dy,
            width: rootLayout.width,
            height: rootLayout.height
          }
        });
      }
    };
    TreemapView2.prototype._onZoom = function(e2) {
      var mouseX = e2.originX;
      var mouseY = e2.originY;
      if (this._state !== "animating") {
        var root = this.seriesModel.getData().tree.root;
        if (!root) {
          return;
        }
        var rootLayout = root.getLayout();
        if (!rootLayout) {
          return;
        }
        var rect = new BoundingRect_default(rootLayout.x, rootLayout.y, rootLayout.width, rootLayout.height);
        var layoutInfo = this.seriesModel.layoutInfo;
        mouseX -= layoutInfo.x;
        mouseY -= layoutInfo.y;
        var m = create();
        translate(m, m, [-mouseX, -mouseY]);
        scale(m, m, [e2.scale, e2.scale]);
        translate(m, m, [mouseX, mouseY]);
        rect.applyTransform(m);
        this.api.dispatchAction({
          type: "treemapRender",
          from: this.uid,
          seriesId: this.seriesModel.id,
          rootRect: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
          }
        });
      }
    };
    TreemapView2.prototype._initEvents = function(containerGroup) {
      var _this = this;
      containerGroup.on("click", function(e2) {
        if (_this._state !== "ready") {
          return;
        }
        var nodeClick = _this.seriesModel.get("nodeClick", true);
        if (!nodeClick) {
          return;
        }
        var targetInfo = _this.findTarget(e2.offsetX, e2.offsetY);
        if (!targetInfo) {
          return;
        }
        var node = targetInfo.node;
        if (node.getLayout().isLeafRoot) {
          _this._rootToNode(targetInfo);
        } else {
          if (nodeClick === "zoomToNode") {
            _this._zoomToNode(targetInfo);
          } else if (nodeClick === "link") {
            var itemModel = node.hostTree.data.getItemModel(node.dataIndex);
            var link = itemModel.get("link", true);
            var linkTarget = itemModel.get("target", true) || "blank";
            link && windowOpen(link, linkTarget);
          }
        }
      }, this);
    };
    TreemapView2.prototype._renderBreadcrumb = function(seriesModel, api, targetInfo) {
      var _this = this;
      if (!targetInfo) {
        targetInfo = seriesModel.get("leafDepth", true) != null ? {
          node: seriesModel.getViewRoot()
        } : this.findTarget(api.getWidth() / 2, api.getHeight() / 2);
        if (!targetInfo) {
          targetInfo = {
            node: seriesModel.getData().tree.root
          };
        }
      }
      (this._breadcrumb || (this._breadcrumb = new Breadcrumb_default(this.group))).render(seriesModel, api, targetInfo.node, function(node) {
        if (_this._state !== "animating") {
          aboveViewRoot(seriesModel.getViewRoot(), node) ? _this._rootToNode({
            node
          }) : _this._zoomToNode({
            node
          });
        }
      });
    };
    TreemapView2.prototype.remove = function() {
      this._clearController();
      this._containerGroup && this._containerGroup.removeAll();
      this._storage = createStorage();
      this._state = "ready";
      this._breadcrumb && this._breadcrumb.remove();
    };
    TreemapView2.prototype.dispose = function() {
      this._clearController();
    };
    TreemapView2.prototype._zoomToNode = function(targetInfo) {
      this.api.dispatchAction({
        type: "treemapZoomToNode",
        from: this.uid,
        seriesId: this.seriesModel.id,
        targetNode: targetInfo.node
      });
    };
    TreemapView2.prototype._rootToNode = function(targetInfo) {
      this.api.dispatchAction({
        type: "treemapRootToNode",
        from: this.uid,
        seriesId: this.seriesModel.id,
        targetNode: targetInfo.node
      });
    };
    TreemapView2.prototype.findTarget = function(x, y) {
      var targetInfo;
      var viewRoot = this.seriesModel.getViewRoot();
      viewRoot.eachNode({
        attr: "viewChildren",
        order: "preorder"
      }, function(node) {
        var bgEl = this._storage.background[node.getRawIndex()];
        if (bgEl) {
          var point = bgEl.transformCoordToLocal(x, y);
          var shape = bgEl.shape;
          if (shape.x <= point[0] && point[0] <= shape.x + shape.width && shape.y <= point[1] && point[1] <= shape.y + shape.height) {
            targetInfo = {
              node,
              offsetX: point[0],
              offsetY: point[1]
            };
          } else {
            return false;
          }
        }
      }, this);
      return targetInfo;
    };
    TreemapView2.type = "treemap";
    return TreemapView2;
  }(Chart_default)
);
function createStorage() {
  return {
    nodeGroup: [],
    background: [],
    content: []
  };
}
function renderNode(seriesModel, thisStorage, oldStorage, reRoot, lastsForAnimation, willInvisibleEls, thisNode, oldNode, parentGroup, depth) {
  if (!thisNode) {
    return;
  }
  var thisLayout = thisNode.getLayout();
  var data = seriesModel.getData();
  var nodeModel = thisNode.getModel();
  data.setItemGraphicEl(thisNode.dataIndex, null);
  if (!thisLayout || !thisLayout.isInView) {
    return;
  }
  var thisWidth = thisLayout.width;
  var thisHeight = thisLayout.height;
  var borderWidth = thisLayout.borderWidth;
  var thisInvisible = thisLayout.invisible;
  var thisRawIndex = thisNode.getRawIndex();
  var oldRawIndex = oldNode && oldNode.getRawIndex();
  var thisViewChildren = thisNode.viewChildren;
  var upperHeight = thisLayout.upperHeight;
  var isParent = thisViewChildren && thisViewChildren.length;
  var itemStyleNormalModel = nodeModel.getModel("itemStyle");
  var itemStyleEmphasisModel = nodeModel.getModel(["emphasis", "itemStyle"]);
  var itemStyleBlurModel = nodeModel.getModel(["blur", "itemStyle"]);
  var itemStyleSelectModel = nodeModel.getModel(["select", "itemStyle"]);
  var borderRadius = itemStyleNormalModel.get("borderRadius") || 0;
  var group = giveGraphic("nodeGroup", Group2);
  if (!group) {
    return;
  }
  parentGroup.add(group);
  group.x = thisLayout.x || 0;
  group.y = thisLayout.y || 0;
  group.markRedraw();
  inner7(group).nodeWidth = thisWidth;
  inner7(group).nodeHeight = thisHeight;
  if (thisLayout.isAboveViewRoot) {
    return group;
  }
  var bg = giveGraphic("background", Rect2, depth, Z2_BG);
  bg && renderBackground(group, bg, isParent && thisLayout.upperLabelHeight);
  var emphasisModel = nodeModel.getModel("emphasis");
  var focus = emphasisModel.get("focus");
  var blurScope = emphasisModel.get("blurScope");
  var isDisabled = emphasisModel.get("disabled");
  var focusOrIndices = focus === "ancestor" ? thisNode.getAncestorsIndices() : focus === "descendant" ? thisNode.getDescendantIndices() : focus;
  if (isParent) {
    if (isHighDownDispatcher(group)) {
      setAsHighDownDispatcher(group, false);
    }
    if (bg) {
      setAsHighDownDispatcher(bg, !isDisabled);
      data.setItemGraphicEl(thisNode.dataIndex, bg);
      enableHoverFocus(bg, focusOrIndices, blurScope);
    }
  } else {
    var content = giveGraphic("content", Rect2, depth, Z2_CONTENT);
    content && renderContent(group, content);
    bg.disableMorphing = true;
    if (bg && isHighDownDispatcher(bg)) {
      setAsHighDownDispatcher(bg, false);
    }
    setAsHighDownDispatcher(group, !isDisabled);
    data.setItemGraphicEl(thisNode.dataIndex, group);
    enableHoverFocus(group, focusOrIndices, blurScope);
  }
  return group;
  function renderBackground(group2, bg2, useUpperLabel) {
    var ecData = getECData(bg2);
    ecData.dataIndex = thisNode.dataIndex;
    ecData.seriesIndex = seriesModel.seriesIndex;
    bg2.setShape({
      x: 0,
      y: 0,
      width: thisWidth,
      height: thisHeight,
      r: borderRadius
    });
    if (thisInvisible) {
      processInvisible(bg2);
    } else {
      bg2.invisible = false;
      var style = thisNode.getVisual("style");
      var visualBorderColor = style.stroke;
      var normalStyle = getItemStyleNormal(itemStyleNormalModel);
      normalStyle.fill = visualBorderColor;
      var emphasisStyle = getStateItemStyle(itemStyleEmphasisModel);
      emphasisStyle.fill = itemStyleEmphasisModel.get("borderColor");
      var blurStyle = getStateItemStyle(itemStyleBlurModel);
      blurStyle.fill = itemStyleBlurModel.get("borderColor");
      var selectStyle = getStateItemStyle(itemStyleSelectModel);
      selectStyle.fill = itemStyleSelectModel.get("borderColor");
      if (useUpperLabel) {
        var upperLabelWidth = thisWidth - 2 * borderWidth;
        prepareText(
          // PENDING: convert ZRColor to ColorString for text.
          bg2,
          visualBorderColor,
          style.opacity,
          {
            x: borderWidth,
            y: 0,
            width: upperLabelWidth,
            height: upperHeight
          }
        );
      } else {
        bg2.removeTextContent();
      }
      bg2.setStyle(normalStyle);
      bg2.ensureState("emphasis").style = emphasisStyle;
      bg2.ensureState("blur").style = blurStyle;
      bg2.ensureState("select").style = selectStyle;
      setDefaultStateProxy(bg2);
    }
    group2.add(bg2);
  }
  function renderContent(group2, content2) {
    var ecData = getECData(content2);
    ecData.dataIndex = thisNode.dataIndex;
    ecData.seriesIndex = seriesModel.seriesIndex;
    var contentWidth = Math.max(thisWidth - 2 * borderWidth, 0);
    var contentHeight = Math.max(thisHeight - 2 * borderWidth, 0);
    content2.culling = true;
    content2.setShape({
      x: borderWidth,
      y: borderWidth,
      width: contentWidth,
      height: contentHeight,
      r: borderRadius
    });
    if (thisInvisible) {
      processInvisible(content2);
    } else {
      content2.invisible = false;
      var nodeStyle = thisNode.getVisual("style");
      var visualColor = nodeStyle.fill;
      var normalStyle = getItemStyleNormal(itemStyleNormalModel);
      normalStyle.fill = visualColor;
      normalStyle.decal = nodeStyle.decal;
      var emphasisStyle = getStateItemStyle(itemStyleEmphasisModel);
      var blurStyle = getStateItemStyle(itemStyleBlurModel);
      var selectStyle = getStateItemStyle(itemStyleSelectModel);
      prepareText(content2, visualColor, nodeStyle.opacity, null);
      content2.setStyle(normalStyle);
      content2.ensureState("emphasis").style = emphasisStyle;
      content2.ensureState("blur").style = blurStyle;
      content2.ensureState("select").style = selectStyle;
      setDefaultStateProxy(content2);
    }
    group2.add(content2);
  }
  function processInvisible(element) {
    !element.invisible && willInvisibleEls.push(element);
  }
  function prepareText(rectEl, visualColor, visualOpacity, upperLabelRect) {
    var normalLabelModel = nodeModel.getModel(upperLabelRect ? PATH_UPPERLABEL_NORMAL : PATH_LABEL_NOAMAL);
    var defaultText = convertOptionIdName(nodeModel.get("name"), null);
    var isShow = normalLabelModel.getShallow("show");
    setLabelStyle(rectEl, getLabelStatesModels(nodeModel, upperLabelRect ? PATH_UPPERLABEL_NORMAL : PATH_LABEL_NOAMAL), {
      defaultText: isShow ? defaultText : null,
      inheritColor: visualColor,
      defaultOpacity: visualOpacity,
      labelFetcher: seriesModel,
      labelDataIndex: thisNode.dataIndex
    });
    var textEl = rectEl.getTextContent();
    if (!textEl) {
      return;
    }
    var textStyle = textEl.style;
    var textPadding = normalizeCssArray(textStyle.padding || 0);
    if (upperLabelRect) {
      rectEl.setTextConfig({
        layoutRect: upperLabelRect
      });
      textEl.disableLabelLayout = true;
    }
    textEl.beforeUpdate = function() {
      var width = Math.max((upperLabelRect ? upperLabelRect.width : rectEl.shape.width) - textPadding[1] - textPadding[3], 0);
      var height = Math.max((upperLabelRect ? upperLabelRect.height : rectEl.shape.height) - textPadding[0] - textPadding[2], 0);
      if (textStyle.width !== width || textStyle.height !== height) {
        textEl.setStyle({
          width,
          height
        });
      }
    };
    textStyle.truncateMinChar = 2;
    textStyle.lineOverflow = "truncate";
    addDrillDownIcon(textStyle, upperLabelRect, thisLayout);
    var textEmphasisState = textEl.getState("emphasis");
    addDrillDownIcon(textEmphasisState ? textEmphasisState.style : null, upperLabelRect, thisLayout);
  }
  function addDrillDownIcon(style, upperLabelRect, thisLayout2) {
    var text = style ? style.text : null;
    if (!upperLabelRect && thisLayout2.isLeafRoot && text != null) {
      var iconChar = seriesModel.get("drillDownIcon", true);
      style.text = iconChar ? iconChar + " " + text : text;
    }
  }
  function giveGraphic(storageName, Ctor, depth2, z) {
    var element = oldRawIndex != null && oldStorage[storageName][oldRawIndex];
    var lasts = lastsForAnimation[storageName];
    if (element) {
      oldStorage[storageName][oldRawIndex] = null;
      prepareAnimationWhenHasOld(lasts, element);
    } else if (!thisInvisible) {
      element = new Ctor();
      if (element instanceof Displayable_default) {
        element.z2 = calculateZ2(depth2, z);
      }
      prepareAnimationWhenNoOld(lasts, element);
    }
    return thisStorage[storageName][thisRawIndex] = element;
  }
  function prepareAnimationWhenHasOld(lasts, element) {
    var lastCfg = lasts[thisRawIndex] = {};
    if (element instanceof Group2) {
      lastCfg.oldX = element.x;
      lastCfg.oldY = element.y;
    } else {
      lastCfg.oldShape = extend({}, element.shape);
    }
  }
  function prepareAnimationWhenNoOld(lasts, element) {
    var lastCfg = lasts[thisRawIndex] = {};
    var parentNode2 = thisNode.parentNode;
    var isGroup = element instanceof Group_default;
    if (parentNode2 && (!reRoot || reRoot.direction === "drillDown")) {
      var parentOldX = 0;
      var parentOldY = 0;
      var parentOldBg = lastsForAnimation.background[parentNode2.getRawIndex()];
      if (!reRoot && parentOldBg && parentOldBg.oldShape) {
        parentOldX = parentOldBg.oldShape.width;
        parentOldY = parentOldBg.oldShape.height;
      }
      if (isGroup) {
        lastCfg.oldX = 0;
        lastCfg.oldY = parentOldY;
      } else {
        lastCfg.oldShape = {
          x: parentOldX,
          y: parentOldY,
          width: 0,
          height: 0
        };
      }
    }
    lastCfg.fadein = !isGroup;
  }
}
function calculateZ2(depth, z2InLevel) {
  return depth * Z2_BASE + z2InLevel;
}
var TreemapView_default = TreemapView;

// node_modules/echarts/lib/visual/VisualMapping.js
var each4 = each;
var isObject4 = isObject;
var CATEGORY_DEFAULT_VISUAL_INDEX = -1;
var VisualMapping = (
  /** @class */
  function() {
    function VisualMapping2(option) {
      var mappingMethod = option.mappingMethod;
      var visualType = option.type;
      var thisOption = this.option = clone(option);
      this.type = visualType;
      this.mappingMethod = mappingMethod;
      this._normalizeData = normalizers[mappingMethod];
      var visualHandler = VisualMapping2.visualHandlers[visualType];
      this.applyVisual = visualHandler.applyVisual;
      this.getColorMapper = visualHandler.getColorMapper;
      this._normalizedToVisual = visualHandler._normalizedToVisual[mappingMethod];
      if (mappingMethod === "piecewise") {
        normalizeVisualRange(thisOption);
        preprocessForPiecewise(thisOption);
      } else if (mappingMethod === "category") {
        thisOption.categories ? preprocessForSpecifiedCategory(thisOption) : normalizeVisualRange(thisOption, true);
      } else {
        assert(mappingMethod !== "linear" || thisOption.dataExtent);
        normalizeVisualRange(thisOption);
      }
    }
    VisualMapping2.prototype.mapValueToVisual = function(value) {
      var normalized = this._normalizeData(value);
      return this._normalizedToVisual(normalized, value);
    };
    VisualMapping2.prototype.getNormalizer = function() {
      return bind(this._normalizeData, this);
    };
    VisualMapping2.listVisualTypes = function() {
      return keys(VisualMapping2.visualHandlers);
    };
    VisualMapping2.isValidType = function(visualType) {
      return VisualMapping2.visualHandlers.hasOwnProperty(visualType);
    };
    VisualMapping2.eachVisual = function(visual, callback, context) {
      if (isObject(visual)) {
        each(visual, callback, context);
      } else {
        callback.call(context, visual);
      }
    };
    VisualMapping2.mapVisual = function(visual, callback, context) {
      var isPrimary;
      var newVisual = isArray(visual) ? [] : isObject(visual) ? {} : (isPrimary = true, null);
      VisualMapping2.eachVisual(visual, function(v, key) {
        var newVal = callback.call(context, v, key);
        isPrimary ? newVisual = newVal : newVisual[key] = newVal;
      });
      return newVisual;
    };
    VisualMapping2.retrieveVisuals = function(obj) {
      var ret = {};
      var hasVisual;
      obj && each4(VisualMapping2.visualHandlers, function(h, visualType) {
        if (obj.hasOwnProperty(visualType)) {
          ret[visualType] = obj[visualType];
          hasVisual = true;
        }
      });
      return hasVisual ? ret : null;
    };
    VisualMapping2.prepareVisualTypes = function(visualTypes) {
      if (isArray(visualTypes)) {
        visualTypes = visualTypes.slice();
      } else if (isObject4(visualTypes)) {
        var types_1 = [];
        each4(visualTypes, function(item, type) {
          types_1.push(type);
        });
        visualTypes = types_1;
      } else {
        return [];
      }
      visualTypes.sort(function(type1, type2) {
        return type2 === "color" && type1 !== "color" && type1.indexOf("color") === 0 ? 1 : -1;
      });
      return visualTypes;
    };
    VisualMapping2.dependsOn = function(visualType1, visualType2) {
      return visualType2 === "color" ? !!(visualType1 && visualType1.indexOf(visualType2) === 0) : visualType1 === visualType2;
    };
    VisualMapping2.findPieceIndex = function(value, pieceList, findClosestWhenOutside) {
      var possibleI;
      var abs2 = Infinity;
      for (var i = 0, len2 = pieceList.length; i < len2; i++) {
        var pieceValue = pieceList[i].value;
        if (pieceValue != null) {
          if (pieceValue === value || isString(pieceValue) && pieceValue === value + "") {
            return i;
          }
          findClosestWhenOutside && updatePossible(pieceValue, i);
        }
      }
      for (var i = 0, len2 = pieceList.length; i < len2; i++) {
        var piece = pieceList[i];
        var interval = piece.interval;
        var close_1 = piece.close;
        if (interval) {
          if (interval[0] === -Infinity) {
            if (littleThan(close_1[1], value, interval[1])) {
              return i;
            }
          } else if (interval[1] === Infinity) {
            if (littleThan(close_1[0], interval[0], value)) {
              return i;
            }
          } else if (littleThan(close_1[0], interval[0], value) && littleThan(close_1[1], value, interval[1])) {
            return i;
          }
          findClosestWhenOutside && updatePossible(interval[0], i);
          findClosestWhenOutside && updatePossible(interval[1], i);
        }
      }
      if (findClosestWhenOutside) {
        return value === Infinity ? pieceList.length - 1 : value === -Infinity ? 0 : possibleI;
      }
      function updatePossible(val, index) {
        var newAbs = Math.abs(val - value);
        if (newAbs < abs2) {
          abs2 = newAbs;
          possibleI = index;
        }
      }
    };
    VisualMapping2.visualHandlers = {
      color: {
        applyVisual: makeApplyVisual("color"),
        getColorMapper: function() {
          var thisOption = this.option;
          return bind(thisOption.mappingMethod === "category" ? function(value, isNormalized) {
            !isNormalized && (value = this._normalizeData(value));
            return doMapCategory.call(this, value);
          } : function(value, isNormalized, out2) {
            var returnRGBArray = !!out2;
            !isNormalized && (value = this._normalizeData(value));
            out2 = fastLerp(value, thisOption.parsedVisual, out2);
            return returnRGBArray ? out2 : stringify(out2, "rgba");
          }, this);
        },
        _normalizedToVisual: {
          linear: function(normalized) {
            return stringify(fastLerp(normalized, this.option.parsedVisual), "rgba");
          },
          category: doMapCategory,
          piecewise: function(normalized, value) {
            var result = getSpecifiedVisual.call(this, value);
            if (result == null) {
              result = stringify(fastLerp(normalized, this.option.parsedVisual), "rgba");
            }
            return result;
          },
          fixed: doMapFixed
        }
      },
      colorHue: makePartialColorVisualHandler(function(color, value) {
        return modifyHSL(color, value);
      }),
      colorSaturation: makePartialColorVisualHandler(function(color, value) {
        return modifyHSL(color, null, value);
      }),
      colorLightness: makePartialColorVisualHandler(function(color, value) {
        return modifyHSL(color, null, null, value);
      }),
      colorAlpha: makePartialColorVisualHandler(function(color, value) {
        return modifyAlpha(color, value);
      }),
      decal: {
        applyVisual: makeApplyVisual("decal"),
        _normalizedToVisual: {
          linear: null,
          category: doMapCategory,
          piecewise: null,
          fixed: null
        }
      },
      opacity: {
        applyVisual: makeApplyVisual("opacity"),
        _normalizedToVisual: createNormalizedToNumericVisual([0, 1])
      },
      liftZ: {
        applyVisual: makeApplyVisual("liftZ"),
        _normalizedToVisual: {
          linear: doMapFixed,
          category: doMapFixed,
          piecewise: doMapFixed,
          fixed: doMapFixed
        }
      },
      symbol: {
        applyVisual: function(value, getter, setter) {
          var symbolCfg = this.mapValueToVisual(value);
          setter("symbol", symbolCfg);
        },
        _normalizedToVisual: {
          linear: doMapToArray,
          category: doMapCategory,
          piecewise: function(normalized, value) {
            var result = getSpecifiedVisual.call(this, value);
            if (result == null) {
              result = doMapToArray.call(this, normalized);
            }
            return result;
          },
          fixed: doMapFixed
        }
      },
      symbolSize: {
        applyVisual: makeApplyVisual("symbolSize"),
        _normalizedToVisual: createNormalizedToNumericVisual([0, 1])
      }
    };
    return VisualMapping2;
  }()
);
function preprocessForPiecewise(thisOption) {
  var pieceList = thisOption.pieceList;
  thisOption.hasSpecialVisual = false;
  each(pieceList, function(piece, index) {
    piece.originIndex = index;
    if (piece.visual != null) {
      thisOption.hasSpecialVisual = true;
    }
  });
}
function preprocessForSpecifiedCategory(thisOption) {
  var categories = thisOption.categories;
  var categoryMap = thisOption.categoryMap = {};
  var visual = thisOption.visual;
  each4(categories, function(cate, index) {
    categoryMap[cate] = index;
  });
  if (!isArray(visual)) {
    var visualArr_1 = [];
    if (isObject(visual)) {
      each4(visual, function(v, cate) {
        var index = categoryMap[cate];
        visualArr_1[index != null ? index : CATEGORY_DEFAULT_VISUAL_INDEX] = v;
      });
    } else {
      visualArr_1[CATEGORY_DEFAULT_VISUAL_INDEX] = visual;
    }
    visual = setVisualToOption(thisOption, visualArr_1);
  }
  for (var i = categories.length - 1; i >= 0; i--) {
    if (visual[i] == null) {
      delete categoryMap[categories[i]];
      categories.pop();
    }
  }
}
function normalizeVisualRange(thisOption, isCategory) {
  var visual = thisOption.visual;
  var visualArr = [];
  if (isObject(visual)) {
    each4(visual, function(v) {
      visualArr.push(v);
    });
  } else if (visual != null) {
    visualArr.push(visual);
  }
  var doNotNeedPair = {
    color: 1,
    symbol: 1
  };
  if (!isCategory && visualArr.length === 1 && !doNotNeedPair.hasOwnProperty(thisOption.type)) {
    visualArr[1] = visualArr[0];
  }
  setVisualToOption(thisOption, visualArr);
}
function makePartialColorVisualHandler(applyValue) {
  return {
    applyVisual: function(value, getter, setter) {
      var colorChannel = this.mapValueToVisual(value);
      setter("color", applyValue(getter("color"), colorChannel));
    },
    _normalizedToVisual: createNormalizedToNumericVisual([0, 1])
  };
}
function doMapToArray(normalized) {
  var visual = this.option.visual;
  return visual[Math.round(linearMap(normalized, [0, 1], [0, visual.length - 1], true))] || {};
}
function makeApplyVisual(visualType) {
  return function(value, getter, setter) {
    setter(visualType, this.mapValueToVisual(value));
  };
}
function doMapCategory(normalized) {
  var visual = this.option.visual;
  return visual[this.option.loop && normalized !== CATEGORY_DEFAULT_VISUAL_INDEX ? normalized % visual.length : normalized];
}
function doMapFixed() {
  return this.option.visual[0];
}
function createNormalizedToNumericVisual(sourceExtent) {
  return {
    linear: function(normalized) {
      return linearMap(normalized, sourceExtent, this.option.visual, true);
    },
    category: doMapCategory,
    piecewise: function(normalized, value) {
      var result = getSpecifiedVisual.call(this, value);
      if (result == null) {
        result = linearMap(normalized, sourceExtent, this.option.visual, true);
      }
      return result;
    },
    fixed: doMapFixed
  };
}
function getSpecifiedVisual(value) {
  var thisOption = this.option;
  var pieceList = thisOption.pieceList;
  if (thisOption.hasSpecialVisual) {
    var pieceIndex = VisualMapping.findPieceIndex(value, pieceList);
    var piece = pieceList[pieceIndex];
    if (piece && piece.visual) {
      return piece.visual[this.type];
    }
  }
}
function setVisualToOption(thisOption, visualArr) {
  thisOption.visual = visualArr;
  if (thisOption.type === "color") {
    thisOption.parsedVisual = map(visualArr, function(item) {
      var color = parse(item);
      if (!color && process.env.NODE_ENV !== "production") {
        warn("'" + item + "' is an illegal color, fallback to '#000000'", true);
      }
      return color || [0, 0, 0, 1];
    });
  }
  return visualArr;
}
var normalizers = {
  linear: function(value) {
    return linearMap(value, this.option.dataExtent, [0, 1], true);
  },
  piecewise: function(value) {
    var pieceList = this.option.pieceList;
    var pieceIndex = VisualMapping.findPieceIndex(value, pieceList, true);
    if (pieceIndex != null) {
      return linearMap(pieceIndex, [0, pieceList.length - 1], [0, 1], true);
    }
  },
  category: function(value) {
    var index = this.option.categories ? this.option.categoryMap[value] : value;
    return index == null ? CATEGORY_DEFAULT_VISUAL_INDEX : index;
  },
  fixed: noop
};
function littleThan(close, a, b) {
  return close ? a <= b : a < b;
}
var VisualMapping_default = VisualMapping;

// node_modules/echarts/lib/chart/treemap/treemapVisual.js
var ITEM_STYLE_NORMAL = "itemStyle";
var inner8 = makeInner();
var treemapVisual_default = {
  seriesType: "treemap",
  reset: function(seriesModel) {
    var tree = seriesModel.getData().tree;
    var root = tree.root;
    if (root.isRemoved()) {
      return;
    }
    travelTree(
      root,
      // Visual should calculate from tree root but not view root.
      {},
      seriesModel.getViewRoot().getAncestors(),
      seriesModel
    );
  }
};
function travelTree(node, designatedVisual, viewRootAncestors, seriesModel) {
  var nodeModel = node.getModel();
  var nodeLayout = node.getLayout();
  var data = node.hostTree.data;
  if (!nodeLayout || nodeLayout.invisible || !nodeLayout.isInView) {
    return;
  }
  var nodeItemStyleModel = nodeModel.getModel(ITEM_STYLE_NORMAL);
  var visuals = buildVisuals(nodeItemStyleModel, designatedVisual, seriesModel);
  var existsStyle = data.ensureUniqueItemVisual(node.dataIndex, "style");
  var borderColor = nodeItemStyleModel.get("borderColor");
  var borderColorSaturation = nodeItemStyleModel.get("borderColorSaturation");
  var thisNodeColor;
  if (borderColorSaturation != null) {
    thisNodeColor = calculateColor(visuals);
    borderColor = calculateBorderColor(borderColorSaturation, thisNodeColor);
  }
  existsStyle.stroke = borderColor;
  var viewChildren = node.viewChildren;
  if (!viewChildren || !viewChildren.length) {
    thisNodeColor = calculateColor(visuals);
    existsStyle.fill = thisNodeColor;
  } else {
    var mapping_1 = buildVisualMapping(node, nodeModel, nodeLayout, nodeItemStyleModel, visuals, viewChildren);
    each(viewChildren, function(child, index) {
      if (child.depth >= viewRootAncestors.length || child === viewRootAncestors[child.depth]) {
        var childVisual = mapVisual(nodeModel, visuals, child, index, mapping_1, seriesModel);
        travelTree(child, childVisual, viewRootAncestors, seriesModel);
      }
    });
  }
}
function buildVisuals(nodeItemStyleModel, designatedVisual, seriesModel) {
  var visuals = extend({}, designatedVisual);
  var designatedVisualItemStyle = seriesModel.designatedVisualItemStyle;
  each(["color", "colorAlpha", "colorSaturation"], function(visualName) {
    designatedVisualItemStyle[visualName] = designatedVisual[visualName];
    var val = nodeItemStyleModel.get(visualName);
    designatedVisualItemStyle[visualName] = null;
    val != null && (visuals[visualName] = val);
  });
  return visuals;
}
function calculateColor(visuals) {
  var color = getValueVisualDefine(visuals, "color");
  if (color) {
    var colorAlpha = getValueVisualDefine(visuals, "colorAlpha");
    var colorSaturation = getValueVisualDefine(visuals, "colorSaturation");
    if (colorSaturation) {
      color = modifyHSL(color, null, null, colorSaturation);
    }
    if (colorAlpha) {
      color = modifyAlpha(color, colorAlpha);
    }
    return color;
  }
}
function calculateBorderColor(borderColorSaturation, thisNodeColor) {
  return thisNodeColor != null ? modifyHSL(thisNodeColor, null, null, borderColorSaturation) : null;
}
function getValueVisualDefine(visuals, name) {
  var value = visuals[name];
  if (value != null && value !== "none") {
    return value;
  }
}
function buildVisualMapping(node, nodeModel, nodeLayout, nodeItemStyleModel, visuals, viewChildren) {
  if (!viewChildren || !viewChildren.length) {
    return;
  }
  var rangeVisual = getRangeVisual(nodeModel, "color") || visuals.color != null && visuals.color !== "none" && (getRangeVisual(nodeModel, "colorAlpha") || getRangeVisual(nodeModel, "colorSaturation"));
  if (!rangeVisual) {
    return;
  }
  var visualMin = nodeModel.get("visualMin");
  var visualMax = nodeModel.get("visualMax");
  var dataExtent = nodeLayout.dataExtent.slice();
  visualMin != null && visualMin < dataExtent[0] && (dataExtent[0] = visualMin);
  visualMax != null && visualMax > dataExtent[1] && (dataExtent[1] = visualMax);
  var colorMappingBy = nodeModel.get("colorMappingBy");
  var opt = {
    type: rangeVisual.name,
    dataExtent,
    visual: rangeVisual.range
  };
  if (opt.type === "color" && (colorMappingBy === "index" || colorMappingBy === "id")) {
    opt.mappingMethod = "category";
    opt.loop = true;
  } else {
    opt.mappingMethod = "linear";
  }
  var mapping = new VisualMapping_default(opt);
  inner8(mapping).drColorMappingBy = colorMappingBy;
  return mapping;
}
function getRangeVisual(nodeModel, name) {
  var range = nodeModel.get(name);
  return isArray(range) && range.length ? {
    name,
    range
  } : null;
}
function mapVisual(nodeModel, visuals, child, index, mapping, seriesModel) {
  var childVisuals = extend({}, visuals);
  if (mapping) {
    var mappingType = mapping.type;
    var colorMappingBy = mappingType === "color" && inner8(mapping).drColorMappingBy;
    var value = colorMappingBy === "index" ? index : colorMappingBy === "id" ? seriesModel.mapIdToIndex(child.getId()) : child.getValue(nodeModel.get("visualDimension"));
    childVisuals[mappingType] = mapping.mapValueToVisual(value);
  }
  return childVisuals;
}

// node_modules/echarts/lib/chart/treemap/treemapLayout.js
var mathMax5 = Math.max;
var mathMin5 = Math.min;
var retrieveValue = retrieve;
var each5 = each;
var PATH_BORDER_WIDTH = ["itemStyle", "borderWidth"];
var PATH_GAP_WIDTH = ["itemStyle", "gapWidth"];
var PATH_UPPER_LABEL_SHOW = ["upperLabel", "show"];
var PATH_UPPER_LABEL_HEIGHT = ["upperLabel", "height"];
var treemapLayout_default = {
  seriesType: "treemap",
  reset: function(seriesModel, ecModel, api, payload) {
    var ecWidth = api.getWidth();
    var ecHeight = api.getHeight();
    var seriesOption = seriesModel.option;
    var layoutInfo = getLayoutRect(seriesModel.getBoxLayoutParams(), {
      width: api.getWidth(),
      height: api.getHeight()
    });
    var size = seriesOption.size || [];
    var containerWidth = parsePercent2(retrieveValue(layoutInfo.width, size[0]), ecWidth);
    var containerHeight = parsePercent2(retrieveValue(layoutInfo.height, size[1]), ecHeight);
    var payloadType = payload && payload.type;
    var types = ["treemapZoomToNode", "treemapRootToNode"];
    var targetInfo = retrieveTargetInfo(payload, types, seriesModel);
    var rootRect = payloadType === "treemapRender" || payloadType === "treemapMove" ? payload.rootRect : null;
    var viewRoot = seriesModel.getViewRoot();
    var viewAbovePath = getPathToRoot(viewRoot);
    if (payloadType !== "treemapMove") {
      var rootSize = payloadType === "treemapZoomToNode" ? estimateRootSize(seriesModel, targetInfo, viewRoot, containerWidth, containerHeight) : rootRect ? [rootRect.width, rootRect.height] : [containerWidth, containerHeight];
      var sort_1 = seriesOption.sort;
      if (sort_1 && sort_1 !== "asc" && sort_1 !== "desc") {
        sort_1 = "desc";
      }
      var options = {
        squareRatio: seriesOption.squareRatio,
        sort: sort_1,
        leafDepth: seriesOption.leafDepth
      };
      viewRoot.hostTree.clearLayouts();
      var viewRootLayout_1 = {
        x: 0,
        y: 0,
        width: rootSize[0],
        height: rootSize[1],
        area: rootSize[0] * rootSize[1]
      };
      viewRoot.setLayout(viewRootLayout_1);
      squarify(viewRoot, options, false, 0);
      viewRootLayout_1 = viewRoot.getLayout();
      each5(viewAbovePath, function(node, index) {
        var childValue = (viewAbovePath[index + 1] || viewRoot).getValue();
        node.setLayout(extend({
          dataExtent: [childValue, childValue],
          borderWidth: 0,
          upperHeight: 0
        }, viewRootLayout_1));
      });
    }
    var treeRoot = seriesModel.getData().tree.root;
    treeRoot.setLayout(calculateRootPosition(layoutInfo, rootRect, targetInfo), true);
    seriesModel.setLayoutInfo(layoutInfo);
    prunning(
      treeRoot,
      // Transform to base element coordinate system.
      new BoundingRect_default(-layoutInfo.x, -layoutInfo.y, ecWidth, ecHeight),
      viewAbovePath,
      viewRoot,
      0
    );
  }
};
function squarify(node, options, hideChildren, depth) {
  var width;
  var height;
  if (node.isRemoved()) {
    return;
  }
  var thisLayout = node.getLayout();
  width = thisLayout.width;
  height = thisLayout.height;
  var nodeModel = node.getModel();
  var borderWidth = nodeModel.get(PATH_BORDER_WIDTH);
  var halfGapWidth = nodeModel.get(PATH_GAP_WIDTH) / 2;
  var upperLabelHeight = getUpperLabelHeight(nodeModel);
  var upperHeight = Math.max(borderWidth, upperLabelHeight);
  var layoutOffset = borderWidth - halfGapWidth;
  var layoutOffsetUpper = upperHeight - halfGapWidth;
  node.setLayout({
    borderWidth,
    upperHeight,
    upperLabelHeight
  }, true);
  width = mathMax5(width - 2 * layoutOffset, 0);
  height = mathMax5(height - layoutOffset - layoutOffsetUpper, 0);
  var totalArea = width * height;
  var viewChildren = initChildren(node, nodeModel, totalArea, options, hideChildren, depth);
  if (!viewChildren.length) {
    return;
  }
  var rect = {
    x: layoutOffset,
    y: layoutOffsetUpper,
    width,
    height
  };
  var rowFixedLength = mathMin5(width, height);
  var best = Infinity;
  var row = [];
  row.area = 0;
  for (var i = 0, len2 = viewChildren.length; i < len2; ) {
    var child = viewChildren[i];
    row.push(child);
    row.area += child.getLayout().area;
    var score = worst(row, rowFixedLength, options.squareRatio);
    if (score <= best) {
      i++;
      best = score;
    } else {
      row.area -= row.pop().getLayout().area;
      position(row, rowFixedLength, rect, halfGapWidth, false);
      rowFixedLength = mathMin5(rect.width, rect.height);
      row.length = row.area = 0;
      best = Infinity;
    }
  }
  if (row.length) {
    position(row, rowFixedLength, rect, halfGapWidth, true);
  }
  if (!hideChildren) {
    var childrenVisibleMin = nodeModel.get("childrenVisibleMin");
    if (childrenVisibleMin != null && totalArea < childrenVisibleMin) {
      hideChildren = true;
    }
  }
  for (var i = 0, len2 = viewChildren.length; i < len2; i++) {
    squarify(viewChildren[i], options, hideChildren, depth + 1);
  }
}
function initChildren(node, nodeModel, totalArea, options, hideChildren, depth) {
  var viewChildren = node.children || [];
  var orderBy = options.sort;
  orderBy !== "asc" && orderBy !== "desc" && (orderBy = null);
  var overLeafDepth = options.leafDepth != null && options.leafDepth <= depth;
  if (hideChildren && !overLeafDepth) {
    return node.viewChildren = [];
  }
  viewChildren = filter(viewChildren, function(child) {
    return !child.isRemoved();
  });
  sort2(viewChildren, orderBy);
  var info = statistic(nodeModel, viewChildren, orderBy);
  if (info.sum === 0) {
    return node.viewChildren = [];
  }
  info.sum = filterByThreshold(nodeModel, totalArea, info.sum, orderBy, viewChildren);
  if (info.sum === 0) {
    return node.viewChildren = [];
  }
  for (var i = 0, len2 = viewChildren.length; i < len2; i++) {
    var area = viewChildren[i].getValue() / info.sum * totalArea;
    viewChildren[i].setLayout({
      area
    });
  }
  if (overLeafDepth) {
    viewChildren.length && node.setLayout({
      isLeafRoot: true
    }, true);
    viewChildren.length = 0;
  }
  node.viewChildren = viewChildren;
  node.setLayout({
    dataExtent: info.dataExtent
  }, true);
  return viewChildren;
}
function filterByThreshold(nodeModel, totalArea, sum, orderBy, orderedChildren) {
  if (!orderBy) {
    return sum;
  }
  var visibleMin = nodeModel.get("visibleMin");
  var len2 = orderedChildren.length;
  var deletePoint = len2;
  for (var i = len2 - 1; i >= 0; i--) {
    var value = orderedChildren[orderBy === "asc" ? len2 - i - 1 : i].getValue();
    if (value / sum * totalArea < visibleMin) {
      deletePoint = i;
      sum -= value;
    }
  }
  orderBy === "asc" ? orderedChildren.splice(0, len2 - deletePoint) : orderedChildren.splice(deletePoint, len2 - deletePoint);
  return sum;
}
function sort2(viewChildren, orderBy) {
  if (orderBy) {
    viewChildren.sort(function(a, b) {
      var diff = orderBy === "asc" ? a.getValue() - b.getValue() : b.getValue() - a.getValue();
      return diff === 0 ? orderBy === "asc" ? a.dataIndex - b.dataIndex : b.dataIndex - a.dataIndex : diff;
    });
  }
  return viewChildren;
}
function statistic(nodeModel, children, orderBy) {
  var sum = 0;
  for (var i = 0, len2 = children.length; i < len2; i++) {
    sum += children[i].getValue();
  }
  var dimension = nodeModel.get("visualDimension");
  var dataExtent;
  if (!children || !children.length) {
    dataExtent = [NaN, NaN];
  } else if (dimension === "value" && orderBy) {
    dataExtent = [children[children.length - 1].getValue(), children[0].getValue()];
    orderBy === "asc" && dataExtent.reverse();
  } else {
    dataExtent = [Infinity, -Infinity];
    each5(children, function(child) {
      var value = child.getValue(dimension);
      value < dataExtent[0] && (dataExtent[0] = value);
      value > dataExtent[1] && (dataExtent[1] = value);
    });
  }
  return {
    sum,
    dataExtent
  };
}
function worst(row, rowFixedLength, ratio) {
  var areaMax = 0;
  var areaMin = Infinity;
  for (var i = 0, area = void 0, len2 = row.length; i < len2; i++) {
    area = row[i].getLayout().area;
    if (area) {
      area < areaMin && (areaMin = area);
      area > areaMax && (areaMax = area);
    }
  }
  var squareArea = row.area * row.area;
  var f = rowFixedLength * rowFixedLength * ratio;
  return squareArea ? mathMax5(f * areaMax / squareArea, squareArea / (f * areaMin)) : Infinity;
}
function position(row, rowFixedLength, rect, halfGapWidth, flush) {
  var idx0WhenH = rowFixedLength === rect.width ? 0 : 1;
  var idx1WhenH = 1 - idx0WhenH;
  var xy = ["x", "y"];
  var wh = ["width", "height"];
  var last = rect[xy[idx0WhenH]];
  var rowOtherLength = rowFixedLength ? row.area / rowFixedLength : 0;
  if (flush || rowOtherLength > rect[wh[idx1WhenH]]) {
    rowOtherLength = rect[wh[idx1WhenH]];
  }
  for (var i = 0, rowLen = row.length; i < rowLen; i++) {
    var node = row[i];
    var nodeLayout = {};
    var step = rowOtherLength ? node.getLayout().area / rowOtherLength : 0;
    var wh1 = nodeLayout[wh[idx1WhenH]] = mathMax5(rowOtherLength - 2 * halfGapWidth, 0);
    var remain = rect[xy[idx0WhenH]] + rect[wh[idx0WhenH]] - last;
    var modWH = i === rowLen - 1 || remain < step ? remain : step;
    var wh0 = nodeLayout[wh[idx0WhenH]] = mathMax5(modWH - 2 * halfGapWidth, 0);
    nodeLayout[xy[idx1WhenH]] = rect[xy[idx1WhenH]] + mathMin5(halfGapWidth, wh1 / 2);
    nodeLayout[xy[idx0WhenH]] = last + mathMin5(halfGapWidth, wh0 / 2);
    last += modWH;
    node.setLayout(nodeLayout, true);
  }
  rect[xy[idx1WhenH]] += rowOtherLength;
  rect[wh[idx1WhenH]] -= rowOtherLength;
}
function estimateRootSize(seriesModel, targetInfo, viewRoot, containerWidth, containerHeight) {
  var currNode = (targetInfo || {}).node;
  var defaultSize = [containerWidth, containerHeight];
  if (!currNode || currNode === viewRoot) {
    return defaultSize;
  }
  var parent;
  var viewArea = containerWidth * containerHeight;
  var area = viewArea * seriesModel.option.zoomToNodeRatio;
  while (parent = currNode.parentNode) {
    var sum = 0;
    var siblings = parent.children;
    for (var i = 0, len2 = siblings.length; i < len2; i++) {
      sum += siblings[i].getValue();
    }
    var currNodeValue = currNode.getValue();
    if (currNodeValue === 0) {
      return defaultSize;
    }
    area *= sum / currNodeValue;
    var parentModel = parent.getModel();
    var borderWidth = parentModel.get(PATH_BORDER_WIDTH);
    var upperHeight = Math.max(borderWidth, getUpperLabelHeight(parentModel));
    area += 4 * borderWidth * borderWidth + (3 * borderWidth + upperHeight) * Math.pow(area, 0.5);
    area > MAX_SAFE_INTEGER && (area = MAX_SAFE_INTEGER);
    currNode = parent;
  }
  area < viewArea && (area = viewArea);
  var scale3 = Math.pow(area / viewArea, 0.5);
  return [containerWidth * scale3, containerHeight * scale3];
}
function calculateRootPosition(layoutInfo, rootRect, targetInfo) {
  if (rootRect) {
    return {
      x: rootRect.x,
      y: rootRect.y
    };
  }
  var defaultPosition = {
    x: 0,
    y: 0
  };
  if (!targetInfo) {
    return defaultPosition;
  }
  var targetNode = targetInfo.node;
  var layout = targetNode.getLayout();
  if (!layout) {
    return defaultPosition;
  }
  var targetCenter = [layout.width / 2, layout.height / 2];
  var node = targetNode;
  while (node) {
    var nodeLayout = node.getLayout();
    targetCenter[0] += nodeLayout.x;
    targetCenter[1] += nodeLayout.y;
    node = node.parentNode;
  }
  return {
    x: layoutInfo.width / 2 - targetCenter[0],
    y: layoutInfo.height / 2 - targetCenter[1]
  };
}
function prunning(node, clipRect, viewAbovePath, viewRoot, depth) {
  var nodeLayout = node.getLayout();
  var nodeInViewAbovePath = viewAbovePath[depth];
  var isAboveViewRoot = nodeInViewAbovePath && nodeInViewAbovePath === node;
  if (nodeInViewAbovePath && !isAboveViewRoot || depth === viewAbovePath.length && node !== viewRoot) {
    return;
  }
  node.setLayout({
    // isInView means: viewRoot sub tree + viewAbovePath
    isInView: true,
    // invisible only means: outside view clip so that the node can not
    // see but still layout for animation preparation but not render.
    invisible: !isAboveViewRoot && !clipRect.intersect(nodeLayout),
    isAboveViewRoot
  }, true);
  var childClipRect = new BoundingRect_default(clipRect.x - nodeLayout.x, clipRect.y - nodeLayout.y, clipRect.width, clipRect.height);
  each5(node.viewChildren || [], function(child) {
    prunning(child, childClipRect, viewAbovePath, viewRoot, depth + 1);
  });
}
function getUpperLabelHeight(model) {
  return model.get(PATH_UPPER_LABEL_SHOW) ? model.get(PATH_UPPER_LABEL_HEIGHT) : 0;
}

// node_modules/echarts/lib/chart/treemap/install.js
function install(registers) {
  registers.registerSeriesModel(TreemapSeries_default);
  registers.registerChartView(TreemapView_default);
  registers.registerVisual(treemapVisual_default);
  registers.registerLayout(treemapLayout_default);
  installTreemapAction(registers);
}

// node_modules/zrender/lib/svg/SVGPathRebuilder.js
var mathSin5 = Math.sin;
var mathCos5 = Math.cos;
var PI6 = Math.PI;
var PI27 = Math.PI * 2;
var degree = 180 / PI6;
var SVGPathRebuilder = function() {
  function SVGPathRebuilder2() {
  }
  SVGPathRebuilder2.prototype.reset = function(precision) {
    this._start = true;
    this._d = [];
    this._str = "";
    this._p = Math.pow(10, precision || 4);
  };
  SVGPathRebuilder2.prototype.moveTo = function(x, y) {
    this._add("M", x, y);
  };
  SVGPathRebuilder2.prototype.lineTo = function(x, y) {
    this._add("L", x, y);
  };
  SVGPathRebuilder2.prototype.bezierCurveTo = function(x, y, x2, y2, x3, y3) {
    this._add("C", x, y, x2, y2, x3, y3);
  };
  SVGPathRebuilder2.prototype.quadraticCurveTo = function(x, y, x2, y2) {
    this._add("Q", x, y, x2, y2);
  };
  SVGPathRebuilder2.prototype.arc = function(cx, cy, r, startAngle, endAngle, anticlockwise) {
    this.ellipse(cx, cy, r, r, 0, startAngle, endAngle, anticlockwise);
  };
  SVGPathRebuilder2.prototype.ellipse = function(cx, cy, rx, ry, psi, startAngle, endAngle, anticlockwise) {
    var dTheta = endAngle - startAngle;
    var clockwise = !anticlockwise;
    var dThetaPositive = Math.abs(dTheta);
    var isCircle = isAroundZero2(dThetaPositive - PI27) || (clockwise ? dTheta >= PI27 : -dTheta >= PI27);
    var unifiedTheta = dTheta > 0 ? dTheta % PI27 : dTheta % PI27 + PI27;
    var large = false;
    if (isCircle) {
      large = true;
    } else if (isAroundZero2(dThetaPositive)) {
      large = false;
    } else {
      large = unifiedTheta >= PI6 === !!clockwise;
    }
    var x0 = cx + rx * mathCos5(startAngle);
    var y0 = cy + ry * mathSin5(startAngle);
    if (this._start) {
      this._add("M", x0, y0);
    }
    var xRot = Math.round(psi * degree);
    if (isCircle) {
      var p = 1 / this._p;
      var dTheta_1 = (clockwise ? 1 : -1) * (PI27 - p);
      this._add("A", rx, ry, xRot, 1, +clockwise, cx + rx * mathCos5(startAngle + dTheta_1), cy + ry * mathSin5(startAngle + dTheta_1));
      if (p > 0.01) {
        this._add("A", rx, ry, xRot, 0, +clockwise, x0, y0);
      }
    } else {
      var x = cx + rx * mathCos5(endAngle);
      var y = cy + ry * mathSin5(endAngle);
      this._add("A", rx, ry, xRot, +large, +clockwise, x, y);
    }
  };
  SVGPathRebuilder2.prototype.rect = function(x, y, w, h) {
    this._add("M", x, y);
    this._add("l", w, 0);
    this._add("l", 0, h);
    this._add("l", -w, 0);
    this._add("Z");
  };
  SVGPathRebuilder2.prototype.closePath = function() {
    if (this._d.length > 0) {
      this._add("Z");
    }
  };
  SVGPathRebuilder2.prototype._add = function(cmd, a, b, c, d, e2, f, g, h) {
    var vals = [];
    var p = this._p;
    for (var i = 1; i < arguments.length; i++) {
      var val = arguments[i];
      if (isNaN(val)) {
        this._invalid = true;
        return;
      }
      vals.push(Math.round(val * p) / p);
    }
    this._d.push(cmd + vals.join(" "));
    this._start = cmd === "Z";
  };
  SVGPathRebuilder2.prototype.generateStr = function() {
    this._str = this._invalid ? "" : this._d.join("");
    this._d = [];
  };
  SVGPathRebuilder2.prototype.getStr = function() {
    return this._str;
  };
  return SVGPathRebuilder2;
}();
var SVGPathRebuilder_default = SVGPathRebuilder;

// node_modules/zrender/lib/svg/mapStyleToAttrs.js
var NONE = "none";
var mathRound2 = Math.round;
function pathHasFill(style) {
  var fill = style.fill;
  return fill != null && fill !== NONE;
}
function pathHasStroke(style) {
  var stroke = style.stroke;
  return stroke != null && stroke !== NONE;
}
var strokeProps = ["lineCap", "miterLimit", "lineJoin"];
var svgStrokeProps = map(strokeProps, function(prop) {
  return "stroke-" + prop.toLowerCase();
});
function mapStyleToAttrs(updateAttr, style, el, forceUpdate) {
  var opacity = style.opacity == null ? 1 : style.opacity;
  if (el instanceof Image_default) {
    updateAttr("opacity", opacity);
    return;
  }
  if (pathHasFill(style)) {
    var fill = normalizeColor(style.fill);
    updateAttr("fill", fill.color);
    var fillOpacity = style.fillOpacity != null ? style.fillOpacity * fill.opacity * opacity : fill.opacity * opacity;
    if (forceUpdate || fillOpacity < 1) {
      updateAttr("fill-opacity", fillOpacity);
    }
  } else {
    updateAttr("fill", NONE);
  }
  if (pathHasStroke(style)) {
    var stroke = normalizeColor(style.stroke);
    updateAttr("stroke", stroke.color);
    var strokeScale = style.strokeNoScale ? el.getLineScale() : 1;
    var strokeWidth = strokeScale ? (style.lineWidth || 0) / strokeScale : 0;
    var strokeOpacity = style.strokeOpacity != null ? style.strokeOpacity * stroke.opacity * opacity : stroke.opacity * opacity;
    var strokeFirst = style.strokeFirst;
    if (forceUpdate || strokeWidth !== 1) {
      updateAttr("stroke-width", strokeWidth);
    }
    if (forceUpdate || strokeFirst) {
      updateAttr("paint-order", strokeFirst ? "stroke" : "fill");
    }
    if (forceUpdate || strokeOpacity < 1) {
      updateAttr("stroke-opacity", strokeOpacity);
    }
    if (style.lineDash) {
      var _a2 = getLineDash(el), lineDash = _a2[0], lineDashOffset = _a2[1];
      if (lineDash) {
        lineDashOffset = mathRound2(lineDashOffset || 0);
        updateAttr("stroke-dasharray", lineDash.join(","));
        if (lineDashOffset || forceUpdate) {
          updateAttr("stroke-dashoffset", lineDashOffset);
        }
      }
    } else if (forceUpdate) {
      updateAttr("stroke-dasharray", NONE);
    }
    for (var i = 0; i < strokeProps.length; i++) {
      var propName = strokeProps[i];
      if (forceUpdate || style[propName] !== DEFAULT_PATH_STYLE[propName]) {
        var val = style[propName] || DEFAULT_PATH_STYLE[propName];
        val && updateAttr(svgStrokeProps[i], val);
      }
    }
  } else if (forceUpdate) {
    updateAttr("stroke", NONE);
  }
}

// node_modules/zrender/lib/svg/core.js
var SVGNS = "http://www.w3.org/2000/svg";
var XLINKNS = "http://www.w3.org/1999/xlink";
var XMLNS = "http://www.w3.org/2000/xmlns/";
var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
var META_DATA_PREFIX = "ecmeta_";
function createElement(name) {
  return document.createElementNS(SVGNS, name);
}
function createVNode(tag, key, attrs, children, text) {
  return {
    tag,
    attrs: attrs || {},
    children,
    text,
    key
  };
}
function createElementOpen(name, attrs) {
  var attrsStr = [];
  if (attrs) {
    for (var key in attrs) {
      var val = attrs[key];
      var part = key;
      if (val === false) {
        continue;
      } else if (val !== true && val != null) {
        part += '="' + val + '"';
      }
      attrsStr.push(part);
    }
  }
  return "<" + name + " " + attrsStr.join(" ") + ">";
}
function createElementClose(name) {
  return "</" + name + ">";
}
function vNodeToString(el, opts) {
  opts = opts || {};
  var S2 = opts.newline ? "\n" : "";
  function convertElToString(el2) {
    var children = el2.children, tag = el2.tag, attrs = el2.attrs, text = el2.text;
    return createElementOpen(tag, attrs) + (tag !== "style" ? encodeHTML(text) : text || "") + (children ? "" + S2 + map(children, function(child) {
      return convertElToString(child);
    }).join(S2) + S2 : "") + createElementClose(tag);
  }
  return convertElToString(el);
}
function getCssString(selectorNodes, animationNodes, opts) {
  opts = opts || {};
  var S2 = opts.newline ? "\n" : "";
  var bracketBegin = " {" + S2;
  var bracketEnd = S2 + "}";
  var selectors = map(keys(selectorNodes), function(className) {
    return className + bracketBegin + map(keys(selectorNodes[className]), function(attrName) {
      return attrName + ":" + selectorNodes[className][attrName] + ";";
    }).join(S2) + bracketEnd;
  }).join(S2);
  var animations = map(keys(animationNodes), function(animationName) {
    return "@keyframes " + animationName + bracketBegin + map(keys(animationNodes[animationName]), function(percent) {
      return percent + bracketBegin + map(keys(animationNodes[animationName][percent]), function(attrName) {
        var val = animationNodes[animationName][percent][attrName];
        if (attrName === "d") {
          val = 'path("' + val + '")';
        }
        return attrName + ":" + val + ";";
      }).join(S2) + bracketEnd;
    }).join(S2) + bracketEnd;
  }).join(S2);
  if (!selectors && !animations) {
    return "";
  }
  return ["<![CDATA[", selectors, animations, "]]>"].join(S2);
}
function createBrushScope(zrId) {
  return {
    zrId,
    shadowCache: {},
    patternCache: {},
    gradientCache: {},
    clipPathCache: {},
    defs: {},
    cssNodes: {},
    cssAnims: {},
    cssStyleCache: {},
    cssAnimIdx: 0,
    shadowIdx: 0,
    gradientIdx: 0,
    patternIdx: 0,
    clipPathIdx: 0
  };
}
function createSVGVNode(width, height, children, useViewBox) {
  return createVNode("svg", "root", {
    "width": width,
    "height": height,
    "xmlns": SVGNS,
    "xmlns:xlink": XLINKNS,
    "version": "1.1",
    "baseProfile": "full",
    "viewBox": useViewBox ? "0 0 " + width + " " + height : false
  }, children);
}

// node_modules/zrender/lib/svg/cssClassId.js
var cssClassIdx = 0;
function getClassId() {
  return cssClassIdx++;
}

// node_modules/zrender/lib/svg/cssAnimation.js
var EASING_MAP = {
  cubicIn: "0.32,0,0.67,0",
  cubicOut: "0.33,1,0.68,1",
  cubicInOut: "0.65,0,0.35,1",
  quadraticIn: "0.11,0,0.5,0",
  quadraticOut: "0.5,1,0.89,1",
  quadraticInOut: "0.45,0,0.55,1",
  quarticIn: "0.5,0,0.75,0",
  quarticOut: "0.25,1,0.5,1",
  quarticInOut: "0.76,0,0.24,1",
  quinticIn: "0.64,0,0.78,0",
  quinticOut: "0.22,1,0.36,1",
  quinticInOut: "0.83,0,0.17,1",
  sinusoidalIn: "0.12,0,0.39,0",
  sinusoidalOut: "0.61,1,0.88,1",
  sinusoidalInOut: "0.37,0,0.63,1",
  exponentialIn: "0.7,0,0.84,0",
  exponentialOut: "0.16,1,0.3,1",
  exponentialInOut: "0.87,0,0.13,1",
  circularIn: "0.55,0,1,0.45",
  circularOut: "0,0.55,0.45,1",
  circularInOut: "0.85,0,0.15,1"
};
var transformOriginKey = "transform-origin";
function buildPathString(el, kfShape, path3) {
  var shape = extend({}, el.shape);
  extend(shape, kfShape);
  el.buildPath(path3, shape);
  var svgPathBuilder = new SVGPathRebuilder_default();
  svgPathBuilder.reset(getPathPrecision(el));
  path3.rebuildPath(svgPathBuilder, 1);
  svgPathBuilder.generateStr();
  return svgPathBuilder.getStr();
}
function setTransformOrigin(target, transform) {
  var originX = transform.originX, originY = transform.originY;
  if (originX || originY) {
    target[transformOriginKey] = originX + "px " + originY + "px";
  }
}
var ANIMATE_STYLE_MAP = {
  fill: "fill",
  opacity: "opacity",
  lineWidth: "stroke-width",
  lineDashOffset: "stroke-dashoffset"
};
function addAnimation(cssAnim, scope) {
  var animationName = scope.zrId + "-ani-" + scope.cssAnimIdx++;
  scope.cssAnims[animationName] = cssAnim;
  return animationName;
}
function createCompoundPathCSSAnimation(el, attrs, scope) {
  var paths = el.shape.paths;
  var composedAnim = {};
  var cssAnimationCfg;
  var cssAnimationName;
  each(paths, function(path3) {
    var subScope = createBrushScope(scope.zrId);
    subScope.animation = true;
    createCSSAnimation(path3, {}, subScope, true);
    var cssAnims = subScope.cssAnims;
    var cssNodes = subScope.cssNodes;
    var animNames = keys(cssAnims);
    var len2 = animNames.length;
    if (!len2) {
      return;
    }
    cssAnimationName = animNames[len2 - 1];
    var lastAnim = cssAnims[cssAnimationName];
    for (var percent in lastAnim) {
      var kf = lastAnim[percent];
      composedAnim[percent] = composedAnim[percent] || { d: "" };
      composedAnim[percent].d += kf.d || "";
    }
    for (var className in cssNodes) {
      var val = cssNodes[className].animation;
      if (val.indexOf(cssAnimationName) >= 0) {
        cssAnimationCfg = val;
      }
    }
  });
  if (!cssAnimationCfg) {
    return;
  }
  attrs.d = false;
  var animationName = addAnimation(composedAnim, scope);
  return cssAnimationCfg.replace(cssAnimationName, animationName);
}
function getEasingFunc(easing) {
  return isString(easing) ? EASING_MAP[easing] ? "cubic-bezier(" + EASING_MAP[easing] + ")" : createCubicEasingFunc(easing) ? easing : "" : "";
}
function createCSSAnimation(el, attrs, scope, onlyShape) {
  var animators = el.animators;
  var len2 = animators.length;
  var cssAnimations = [];
  if (el instanceof CompoundPath_default) {
    var animationCfg = createCompoundPathCSSAnimation(el, attrs, scope);
    if (animationCfg) {
      cssAnimations.push(animationCfg);
    } else if (!len2) {
      return;
    }
  } else if (!len2) {
    return;
  }
  var groupAnimators = {};
  for (var i = 0; i < len2; i++) {
    var animator = animators[i];
    var cfgArr = [animator.getMaxTime() / 1e3 + "s"];
    var easing = getEasingFunc(animator.getClip().easing);
    var delay = animator.getDelay();
    if (easing) {
      cfgArr.push(easing);
    } else {
      cfgArr.push("linear");
    }
    if (delay) {
      cfgArr.push(delay / 1e3 + "s");
    }
    if (animator.getLoop()) {
      cfgArr.push("infinite");
    }
    var cfg = cfgArr.join(" ");
    groupAnimators[cfg] = groupAnimators[cfg] || [cfg, []];
    groupAnimators[cfg][1].push(animator);
  }
  function createSingleCSSAnimation(groupAnimator) {
    var animators2 = groupAnimator[1];
    var len3 = animators2.length;
    var transformKfs = {};
    var shapeKfs = {};
    var finalKfs = {};
    var animationTimingFunctionAttrName = "animation-timing-function";
    function saveAnimatorTrackToCssKfs(animator3, cssKfs, toCssAttrName) {
      var tracks = animator3.getTracks();
      var maxTime = animator3.getMaxTime();
      for (var k = 0; k < tracks.length; k++) {
        var track = tracks[k];
        if (track.needsAnimate()) {
          var kfs = track.keyframes;
          var attrName = track.propName;
          toCssAttrName && (attrName = toCssAttrName(attrName));
          if (attrName) {
            for (var i3 = 0; i3 < kfs.length; i3++) {
              var kf = kfs[i3];
              var percent2 = Math.round(kf.time / maxTime * 100) + "%";
              var kfEasing = getEasingFunc(kf.easing);
              var rawValue = kf.rawValue;
              if (isString(rawValue) || isNumber(rawValue)) {
                cssKfs[percent2] = cssKfs[percent2] || {};
                cssKfs[percent2][attrName] = kf.rawValue;
                if (kfEasing) {
                  cssKfs[percent2][animationTimingFunctionAttrName] = kfEasing;
                }
              }
            }
          }
        }
      }
    }
    for (var i2 = 0; i2 < len3; i2++) {
      var animator2 = animators2[i2];
      var targetProp = animator2.targetName;
      if (!targetProp) {
        !onlyShape && saveAnimatorTrackToCssKfs(animator2, transformKfs);
      } else if (targetProp === "shape") {
        saveAnimatorTrackToCssKfs(animator2, shapeKfs);
      }
    }
    for (var percent in transformKfs) {
      var transform = {};
      copyTransform(transform, el);
      extend(transform, transformKfs[percent]);
      var str = getSRTTransformString(transform);
      var timingFunction = transformKfs[percent][animationTimingFunctionAttrName];
      finalKfs[percent] = str ? {
        transform: str
      } : {};
      setTransformOrigin(finalKfs[percent], transform);
      if (timingFunction) {
        finalKfs[percent][animationTimingFunctionAttrName] = timingFunction;
      }
    }
    ;
    var path3;
    var canAnimateShape = true;
    for (var percent in shapeKfs) {
      finalKfs[percent] = finalKfs[percent] || {};
      var isFirst = !path3;
      var timingFunction = shapeKfs[percent][animationTimingFunctionAttrName];
      if (isFirst) {
        path3 = new PathProxy_default();
      }
      var len_1 = path3.len();
      path3.reset();
      finalKfs[percent].d = buildPathString(el, shapeKfs[percent], path3);
      var newLen = path3.len();
      if (!isFirst && len_1 !== newLen) {
        canAnimateShape = false;
        break;
      }
      if (timingFunction) {
        finalKfs[percent][animationTimingFunctionAttrName] = timingFunction;
      }
    }
    ;
    if (!canAnimateShape) {
      for (var percent in finalKfs) {
        delete finalKfs[percent].d;
      }
    }
    if (!onlyShape) {
      for (var i2 = 0; i2 < len3; i2++) {
        var animator2 = animators2[i2];
        var targetProp = animator2.targetName;
        if (targetProp === "style") {
          saveAnimatorTrackToCssKfs(animator2, finalKfs, function(propName) {
            return ANIMATE_STYLE_MAP[propName];
          });
        }
      }
    }
    var percents = keys(finalKfs);
    var allTransformOriginSame = true;
    var transformOrigin;
    for (var i2 = 1; i2 < percents.length; i2++) {
      var p0 = percents[i2 - 1];
      var p1 = percents[i2];
      if (finalKfs[p0][transformOriginKey] !== finalKfs[p1][transformOriginKey]) {
        allTransformOriginSame = false;
        break;
      }
      transformOrigin = finalKfs[p0][transformOriginKey];
    }
    if (allTransformOriginSame && transformOrigin) {
      for (var percent in finalKfs) {
        if (finalKfs[percent][transformOriginKey]) {
          delete finalKfs[percent][transformOriginKey];
        }
      }
      attrs[transformOriginKey] = transformOrigin;
    }
    if (filter(percents, function(percent2) {
      return keys(finalKfs[percent2]).length > 0;
    }).length) {
      var animationName = addAnimation(finalKfs, scope);
      return animationName + " " + groupAnimator[0] + " both";
    }
  }
  for (var key in groupAnimators) {
    var animationCfg = createSingleCSSAnimation(groupAnimators[key]);
    if (animationCfg) {
      cssAnimations.push(animationCfg);
    }
  }
  if (cssAnimations.length) {
    var className = scope.zrId + "-cls-" + getClassId();
    scope.cssNodes["." + className] = {
      animation: cssAnimations.join(",")
    };
    attrs["class"] = className;
  }
}

// node_modules/zrender/lib/svg/cssEmphasis.js
function createCSSEmphasis(el, attrs, scope) {
  if (!el.ignore) {
    if (el.isSilent()) {
      var style = {
        "pointer-events": "none"
      };
      setClassAttribute(style, attrs, scope, true);
    } else {
      var emphasisStyle = el.states.emphasis && el.states.emphasis.style ? el.states.emphasis.style : {};
      var fill = emphasisStyle.fill;
      if (!fill) {
        var normalFill = el.style && el.style.fill;
        var selectFill = el.states.select && el.states.select.style && el.states.select.style.fill;
        var fromFill = el.currentStates.indexOf("select") >= 0 ? selectFill || normalFill : normalFill;
        if (fromFill) {
          fill = liftColor(fromFill);
        }
      }
      var lineWidth = emphasisStyle.lineWidth;
      if (lineWidth) {
        var scaleX = !emphasisStyle.strokeNoScale && el.transform ? el.transform[0] : 1;
        lineWidth = lineWidth / scaleX;
      }
      var style = {
        cursor: "pointer"
      };
      if (fill) {
        style.fill = fill;
      }
      if (emphasisStyle.stroke) {
        style.stroke = emphasisStyle.stroke;
      }
      if (lineWidth) {
        style["stroke-width"] = lineWidth;
      }
      setClassAttribute(style, attrs, scope, true);
    }
  }
}
function setClassAttribute(style, attrs, scope, withHover) {
  var styleKey = JSON.stringify(style);
  var className = scope.cssStyleCache[styleKey];
  if (!className) {
    className = scope.zrId + "-cls-" + getClassId();
    scope.cssStyleCache[styleKey] = className;
    scope.cssNodes["." + className + (withHover ? ":hover" : "")] = style;
  }
  attrs["class"] = attrs["class"] ? attrs["class"] + " " + className : className;
}

// node_modules/zrender/lib/svg/graphic.js
var round5 = Math.round;
function isImageLike2(val) {
  return val && isString(val.src);
}
function isCanvasLike(val) {
  return val && isFunction(val.toDataURL);
}
function setStyleAttrs(attrs, style, el, scope) {
  mapStyleToAttrs(function(key, val) {
    var isFillStroke = key === "fill" || key === "stroke";
    if (isFillStroke && isGradient(val)) {
      setGradient(style, attrs, key, scope);
    } else if (isFillStroke && isPattern(val)) {
      setPattern(el, attrs, key, scope);
    } else if (isFillStroke && val === "none") {
      attrs[key] = "transparent";
    } else {
      attrs[key] = val;
    }
  }, style, el, false);
  setShadow(el, attrs, scope);
}
function setMetaData(attrs, el) {
  var metaData = getElementSSRData(el);
  if (metaData) {
    metaData.each(function(val, key) {
      val != null && (attrs[(META_DATA_PREFIX + key).toLowerCase()] = val + "");
    });
    if (el.isSilent()) {
      attrs[META_DATA_PREFIX + "silent"] = "true";
    }
  }
}
function noRotateScale(m) {
  return isAroundZero2(m[0] - 1) && isAroundZero2(m[1]) && isAroundZero2(m[2]) && isAroundZero2(m[3] - 1);
}
function noTranslate(m) {
  return isAroundZero2(m[4]) && isAroundZero2(m[5]);
}
function setTransform(attrs, m, compress) {
  if (m && !(noTranslate(m) && noRotateScale(m))) {
    var mul2 = compress ? 10 : 1e4;
    attrs.transform = noRotateScale(m) ? "translate(" + round5(m[4] * mul2) / mul2 + " " + round5(m[5] * mul2) / mul2 + ")" : getMatrixStr(m);
  }
}
function convertPolyShape(shape, attrs, mul2) {
  var points2 = shape.points;
  var strArr = [];
  for (var i = 0; i < points2.length; i++) {
    strArr.push(round5(points2[i][0] * mul2) / mul2);
    strArr.push(round5(points2[i][1] * mul2) / mul2);
  }
  attrs.points = strArr.join(" ");
}
function validatePolyShape(shape) {
  return !shape.smooth;
}
function createAttrsConvert(desc) {
  var normalizedDesc = map(desc, function(item) {
    return typeof item === "string" ? [item, item] : item;
  });
  return function(shape, attrs, mul2) {
    for (var i = 0; i < normalizedDesc.length; i++) {
      var item = normalizedDesc[i];
      var val = shape[item[0]];
      if (val != null) {
        attrs[item[1]] = round5(val * mul2) / mul2;
      }
    }
  };
}
var builtinShapesDef = {
  circle: [createAttrsConvert(["cx", "cy", "r"])],
  polyline: [convertPolyShape, validatePolyShape],
  polygon: [convertPolyShape, validatePolyShape]
};
function hasShapeAnimation(el) {
  var animators = el.animators;
  for (var i = 0; i < animators.length; i++) {
    if (animators[i].targetName === "shape") {
      return true;
    }
  }
  return false;
}
function brushSVGPath(el, scope) {
  var style = el.style;
  var shape = el.shape;
  var builtinShpDef = builtinShapesDef[el.type];
  var attrs = {};
  var needsAnimate = scope.animation;
  var svgElType = "path";
  var strokePercent = el.style.strokePercent;
  var precision = scope.compress && getPathPrecision(el) || 4;
  if (builtinShpDef && !scope.willUpdate && !(builtinShpDef[1] && !builtinShpDef[1](shape)) && !(needsAnimate && hasShapeAnimation(el)) && !(strokePercent < 1)) {
    svgElType = el.type;
    var mul2 = Math.pow(10, precision);
    builtinShpDef[0](shape, attrs, mul2);
  } else {
    var needBuildPath = !el.path || el.shapeChanged();
    if (!el.path) {
      el.createPathProxy();
    }
    var path3 = el.path;
    if (needBuildPath) {
      path3.beginPath();
      el.buildPath(path3, el.shape);
      el.pathUpdated();
    }
    var pathVersion = path3.getVersion();
    var elExt = el;
    var svgPathBuilder = elExt.__svgPathBuilder;
    if (elExt.__svgPathVersion !== pathVersion || !svgPathBuilder || strokePercent !== elExt.__svgPathStrokePercent) {
      if (!svgPathBuilder) {
        svgPathBuilder = elExt.__svgPathBuilder = new SVGPathRebuilder_default();
      }
      svgPathBuilder.reset(precision);
      path3.rebuildPath(svgPathBuilder, strokePercent);
      svgPathBuilder.generateStr();
      elExt.__svgPathVersion = pathVersion;
      elExt.__svgPathStrokePercent = strokePercent;
    }
    attrs.d = svgPathBuilder.getStr();
  }
  setTransform(attrs, el.transform);
  setStyleAttrs(attrs, style, el, scope);
  setMetaData(attrs, el);
  scope.animation && createCSSAnimation(el, attrs, scope);
  scope.emphasis && createCSSEmphasis(el, attrs, scope);
  return createVNode(svgElType, el.id + "", attrs);
}
function brushSVGImage(el, scope) {
  var style = el.style;
  var image = style.image;
  if (image && !isString(image)) {
    if (isImageLike2(image)) {
      image = image.src;
    } else if (isCanvasLike(image)) {
      image = image.toDataURL();
    }
  }
  if (!image) {
    return;
  }
  var x = style.x || 0;
  var y = style.y || 0;
  var dw = style.width;
  var dh = style.height;
  var attrs = {
    href: image,
    width: dw,
    height: dh
  };
  if (x) {
    attrs.x = x;
  }
  if (y) {
    attrs.y = y;
  }
  setTransform(attrs, el.transform);
  setStyleAttrs(attrs, style, el, scope);
  setMetaData(attrs, el);
  scope.animation && createCSSAnimation(el, attrs, scope);
  return createVNode("image", el.id + "", attrs);
}
function brushSVGTSpan(el, scope) {
  var style = el.style;
  var text = style.text;
  text != null && (text += "");
  if (!text || isNaN(style.x) || isNaN(style.y)) {
    return;
  }
  var font = style.font || DEFAULT_FONT;
  var x = style.x || 0;
  var y = adjustTextY2(style.y || 0, getLineHeight(font), style.textBaseline);
  var textAlign = TEXT_ALIGN_TO_ANCHOR[style.textAlign] || style.textAlign;
  var attrs = {
    "dominant-baseline": "central",
    "text-anchor": textAlign
  };
  if (hasSeparateFont(style)) {
    var separatedFontStr = "";
    var fontStyle = style.fontStyle;
    var fontSize = parseFontSize(style.fontSize);
    if (!parseFloat(fontSize)) {
      return;
    }
    var fontFamily = style.fontFamily || DEFAULT_FONT_FAMILY;
    var fontWeight = style.fontWeight;
    separatedFontStr += "font-size:" + fontSize + ";font-family:" + fontFamily + ";";
    if (fontStyle && fontStyle !== "normal") {
      separatedFontStr += "font-style:" + fontStyle + ";";
    }
    if (fontWeight && fontWeight !== "normal") {
      separatedFontStr += "font-weight:" + fontWeight + ";";
    }
    attrs.style = separatedFontStr;
  } else {
    attrs.style = "font: " + font;
  }
  if (text.match(/\s/)) {
    attrs["xml:space"] = "preserve";
  }
  if (x) {
    attrs.x = x;
  }
  if (y) {
    attrs.y = y;
  }
  setTransform(attrs, el.transform);
  setStyleAttrs(attrs, style, el, scope);
  setMetaData(attrs, el);
  scope.animation && createCSSAnimation(el, attrs, scope);
  return createVNode("text", el.id + "", attrs, void 0, text);
}
function brush2(el, scope) {
  if (el instanceof Path_default) {
    return brushSVGPath(el, scope);
  } else if (el instanceof Image_default) {
    return brushSVGImage(el, scope);
  } else if (el instanceof TSpan_default) {
    return brushSVGTSpan(el, scope);
  }
}
function setShadow(el, attrs, scope) {
  var style = el.style;
  if (hasShadow(style)) {
    var shadowKey = getShadowKey(el);
    var shadowCache = scope.shadowCache;
    var shadowId = shadowCache[shadowKey];
    if (!shadowId) {
      var globalScale = el.getGlobalScale();
      var scaleX = globalScale[0];
      var scaleY = globalScale[1];
      if (!scaleX || !scaleY) {
        return;
      }
      var offsetX = style.shadowOffsetX || 0;
      var offsetY = style.shadowOffsetY || 0;
      var blur_1 = style.shadowBlur;
      var _a2 = normalizeColor(style.shadowColor), opacity = _a2.opacity, color = _a2.color;
      var stdDx = blur_1 / 2 / scaleX;
      var stdDy = blur_1 / 2 / scaleY;
      var stdDeviation = stdDx + " " + stdDy;
      shadowId = scope.zrId + "-s" + scope.shadowIdx++;
      scope.defs[shadowId] = createVNode("filter", shadowId, {
        "id": shadowId,
        "x": "-100%",
        "y": "-100%",
        "width": "300%",
        "height": "300%"
      }, [
        createVNode("feDropShadow", "", {
          "dx": offsetX / scaleX,
          "dy": offsetY / scaleY,
          "stdDeviation": stdDeviation,
          "flood-color": color,
          "flood-opacity": opacity
        })
      ]);
      shadowCache[shadowKey] = shadowId;
    }
    attrs.filter = getIdURL(shadowId);
  }
}
function setGradient(style, attrs, target, scope) {
  var val = style[target];
  var gradientTag;
  var gradientAttrs = {
    "gradientUnits": val.global ? "userSpaceOnUse" : "objectBoundingBox"
  };
  if (isLinearGradient(val)) {
    gradientTag = "linearGradient";
    gradientAttrs.x1 = val.x;
    gradientAttrs.y1 = val.y;
    gradientAttrs.x2 = val.x2;
    gradientAttrs.y2 = val.y2;
  } else if (isRadialGradient(val)) {
    gradientTag = "radialGradient";
    gradientAttrs.cx = retrieve2(val.x, 0.5);
    gradientAttrs.cy = retrieve2(val.y, 0.5);
    gradientAttrs.r = retrieve2(val.r, 0.5);
  } else {
    if (process.env.NODE_ENV !== "production") {
      logError("Illegal gradient type.");
    }
    return;
  }
  var colors = val.colorStops;
  var colorStops = [];
  for (var i = 0, len2 = colors.length; i < len2; ++i) {
    var offset = round4(colors[i].offset) * 100 + "%";
    var stopColor = colors[i].color;
    var _a2 = normalizeColor(stopColor), color = _a2.color, opacity = _a2.opacity;
    var stopsAttrs = {
      "offset": offset
    };
    stopsAttrs["stop-color"] = color;
    if (opacity < 1) {
      stopsAttrs["stop-opacity"] = opacity;
    }
    colorStops.push(createVNode("stop", i + "", stopsAttrs));
  }
  var gradientVNode = createVNode(gradientTag, "", gradientAttrs, colorStops);
  var gradientKey = vNodeToString(gradientVNode);
  var gradientCache = scope.gradientCache;
  var gradientId = gradientCache[gradientKey];
  if (!gradientId) {
    gradientId = scope.zrId + "-g" + scope.gradientIdx++;
    gradientCache[gradientKey] = gradientId;
    gradientAttrs.id = gradientId;
    scope.defs[gradientId] = createVNode(gradientTag, gradientId, gradientAttrs, colorStops);
  }
  attrs[target] = getIdURL(gradientId);
}
function setPattern(el, attrs, target, scope) {
  var val = el.style[target];
  var boundingRect = el.getBoundingRect();
  var patternAttrs = {};
  var repeat = val.repeat;
  var noRepeat = repeat === "no-repeat";
  var repeatX = repeat === "repeat-x";
  var repeatY = repeat === "repeat-y";
  var child;
  if (isImagePattern(val)) {
    var imageWidth_1 = val.imageWidth;
    var imageHeight_1 = val.imageHeight;
    var imageSrc = void 0;
    var patternImage = val.image;
    if (isString(patternImage)) {
      imageSrc = patternImage;
    } else if (isImageLike2(patternImage)) {
      imageSrc = patternImage.src;
    } else if (isCanvasLike(patternImage)) {
      imageSrc = patternImage.toDataURL();
    }
    if (typeof Image === "undefined") {
      var errMsg = "Image width/height must been given explictly in svg-ssr renderer.";
      assert(imageWidth_1, errMsg);
      assert(imageHeight_1, errMsg);
    } else if (imageWidth_1 == null || imageHeight_1 == null) {
      var setSizeToVNode_1 = function(vNode, img) {
        if (vNode) {
          var svgEl = vNode.elm;
          var width = imageWidth_1 || img.width;
          var height = imageHeight_1 || img.height;
          if (vNode.tag === "pattern") {
            if (repeatX) {
              height = 1;
              width /= boundingRect.width;
            } else if (repeatY) {
              width = 1;
              height /= boundingRect.height;
            }
          }
          vNode.attrs.width = width;
          vNode.attrs.height = height;
          if (svgEl) {
            svgEl.setAttribute("width", width);
            svgEl.setAttribute("height", height);
          }
        }
      };
      var createdImage = createOrUpdateImage(imageSrc, null, el, function(img) {
        noRepeat || setSizeToVNode_1(patternVNode, img);
        setSizeToVNode_1(child, img);
      });
      if (createdImage && createdImage.width && createdImage.height) {
        imageWidth_1 = imageWidth_1 || createdImage.width;
        imageHeight_1 = imageHeight_1 || createdImage.height;
      }
    }
    child = createVNode("image", "img", {
      href: imageSrc,
      width: imageWidth_1,
      height: imageHeight_1
    });
    patternAttrs.width = imageWidth_1;
    patternAttrs.height = imageHeight_1;
  } else if (val.svgElement) {
    child = clone(val.svgElement);
    patternAttrs.width = val.svgWidth;
    patternAttrs.height = val.svgHeight;
  }
  if (!child) {
    return;
  }
  var patternWidth;
  var patternHeight;
  if (noRepeat) {
    patternWidth = patternHeight = 1;
  } else if (repeatX) {
    patternHeight = 1;
    patternWidth = patternAttrs.width / boundingRect.width;
  } else if (repeatY) {
    patternWidth = 1;
    patternHeight = patternAttrs.height / boundingRect.height;
  } else {
    patternAttrs.patternUnits = "userSpaceOnUse";
  }
  if (patternWidth != null && !isNaN(patternWidth)) {
    patternAttrs.width = patternWidth;
  }
  if (patternHeight != null && !isNaN(patternHeight)) {
    patternAttrs.height = patternHeight;
  }
  var patternTransform = getSRTTransformString(val);
  patternTransform && (patternAttrs.patternTransform = patternTransform);
  var patternVNode = createVNode("pattern", "", patternAttrs, [child]);
  var patternKey = vNodeToString(patternVNode);
  var patternCache = scope.patternCache;
  var patternId = patternCache[patternKey];
  if (!patternId) {
    patternId = scope.zrId + "-p" + scope.patternIdx++;
    patternCache[patternKey] = patternId;
    patternAttrs.id = patternId;
    patternVNode = scope.defs[patternId] = createVNode("pattern", patternId, patternAttrs, [child]);
  }
  attrs[target] = getIdURL(patternId);
}
function setClipPath(clipPath, attrs, scope) {
  var clipPathCache = scope.clipPathCache, defs = scope.defs;
  var clipPathId = clipPathCache[clipPath.id];
  if (!clipPathId) {
    clipPathId = scope.zrId + "-c" + scope.clipPathIdx++;
    var clipPathAttrs = {
      id: clipPathId
    };
    clipPathCache[clipPath.id] = clipPathId;
    defs[clipPathId] = createVNode("clipPath", clipPathId, clipPathAttrs, [brushSVGPath(clipPath, scope)]);
  }
  attrs["clip-path"] = getIdURL(clipPathId);
}

// node_modules/zrender/lib/svg/domapi.js
function createTextNode(text) {
  return document.createTextNode(text);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function parentNode(node) {
  return node.parentNode;
}
function nextSibling(node) {
  return node.nextSibling;
}
function setTextContent(node, text) {
  node.textContent = text;
}

// node_modules/zrender/lib/svg/patch.js
var colonChar = 58;
var xChar = 120;
var emptyNode = createVNode("", "");
function isUndef(s) {
  return s === void 0;
}
function isDef(s) {
  return s !== void 0;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var map3 = {};
  for (var i = beginIdx; i <= endIdx; ++i) {
    var key = children[i].key;
    if (key !== void 0) {
      if (process.env.NODE_ENV !== "production") {
        if (map3[key] != null) {
          console.error("Duplicate key " + key);
        }
      }
      map3[key] = i;
    }
  }
  return map3;
}
function sameVnode(vnode1, vnode2) {
  var isSameKey = vnode1.key === vnode2.key;
  var isSameTag = vnode1.tag === vnode2.tag;
  return isSameTag && isSameKey;
}
function createElm(vnode) {
  var i;
  var children = vnode.children;
  var tag = vnode.tag;
  if (isDef(tag)) {
    var elm = vnode.elm = createElement(tag);
    updateAttrs(emptyNode, vnode);
    if (isArray(children)) {
      for (i = 0; i < children.length; ++i) {
        var ch = children[i];
        if (ch != null) {
          appendChild(elm, createElm(ch));
        }
      }
    } else if (isDef(vnode.text) && !isObject(vnode.text)) {
      appendChild(elm, createTextNode(vnode.text));
    }
  } else {
    vnode.elm = createTextNode(vnode.text);
  }
  return vnode.elm;
}
function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];
    if (ch != null) {
      insertBefore(parentElm, createElm(ch), before);
    }
  }
}
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];
    if (ch != null) {
      if (isDef(ch.tag)) {
        var parent_1 = parentNode(ch.elm);
        removeChild(parent_1, ch.elm);
      } else {
        removeChild(parentElm, ch.elm);
      }
    }
  }
}
function updateAttrs(oldVnode, vnode) {
  var key;
  var elm = vnode.elm;
  var oldAttrs = oldVnode && oldVnode.attrs || {};
  var attrs = vnode.attrs || {};
  if (oldAttrs === attrs) {
    return;
  }
  for (key in attrs) {
    var cur = attrs[key];
    var old = oldAttrs[key];
    if (old !== cur) {
      if (cur === true) {
        elm.setAttribute(key, "");
      } else if (cur === false) {
        elm.removeAttribute(key);
      } else {
        if (key === "style") {
          elm.style.cssText = cur;
        } else if (key.charCodeAt(0) !== xChar) {
          elm.setAttribute(key, cur);
        } else if (key === "xmlns:xlink" || key === "xmlns") {
          elm.setAttributeNS(XMLNS, key, cur);
        } else if (key.charCodeAt(3) === colonChar) {
          elm.setAttributeNS(XML_NAMESPACE, key, cur);
        } else if (key.charCodeAt(5) === colonChar) {
          elm.setAttributeNS(XLINKNS, key, cur);
        } else {
          elm.setAttribute(key, cur);
        }
      }
    }
  }
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}
function updateChildren(parentElm, oldCh, newCh) {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newEndIdx];
  var oldKeyToIdx;
  var idxInOld;
  var elmToMove;
  var before;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      insertBefore(parentElm, oldStartVnode.elm, nextSibling(oldEndVnode.elm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (isUndef(oldKeyToIdx)) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      idxInOld = oldKeyToIdx[newStartVnode.key];
      if (isUndef(idxInOld)) {
        insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm);
      } else {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.tag !== newStartVnode.tag) {
          insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm);
        } else {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = void 0;
          insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
    if (oldStartIdx > oldEndIdx) {
      before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
    } else {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }
}
function patchVnode(oldVnode, vnode) {
  var elm = vnode.elm = oldVnode.elm;
  var oldCh = oldVnode.children;
  var ch = vnode.children;
  if (oldVnode === vnode) {
    return;
  }
  updateAttrs(oldVnode, vnode);
  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      if (oldCh !== ch) {
        updateChildren(elm, oldCh, ch);
      }
    } else if (isDef(ch)) {
      if (isDef(oldVnode.text)) {
        setTextContent(elm, "");
      }
      addVnodes(elm, null, ch, 0, ch.length - 1);
    } else if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    } else if (isDef(oldVnode.text)) {
      setTextContent(elm, "");
    }
  } else if (oldVnode.text !== vnode.text) {
    if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    }
    setTextContent(elm, vnode.text);
  }
}
function patch(oldVnode, vnode) {
  if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode);
  } else {
    var elm = oldVnode.elm;
    var parent_2 = parentNode(elm);
    createElm(vnode);
    if (parent_2 !== null) {
      insertBefore(parent_2, vnode.elm, nextSibling(elm));
      removeVnodes(parent_2, [oldVnode], 0, 0);
    }
  }
  return vnode;
}

// node_modules/zrender/lib/svg/Painter.js
var svgId = 0;
var SVGPainter = function() {
  function SVGPainter2(root, storage, opts) {
    this.type = "svg";
    this.refreshHover = createMethodNotSupport("refreshHover");
    this.configLayer = createMethodNotSupport("configLayer");
    this.storage = storage;
    this._opts = opts = extend({}, opts);
    this.root = root;
    this._id = "zr" + svgId++;
    this._oldVNode = createSVGVNode(opts.width, opts.height);
    if (root && !opts.ssr) {
      var viewport = this._viewport = document.createElement("div");
      viewport.style.cssText = "position:relative;overflow:hidden";
      var svgDom = this._svgDom = this._oldVNode.elm = createElement("svg");
      updateAttrs(null, this._oldVNode);
      viewport.appendChild(svgDom);
      root.appendChild(viewport);
    }
    this.resize(opts.width, opts.height);
  }
  SVGPainter2.prototype.getType = function() {
    return this.type;
  };
  SVGPainter2.prototype.getViewportRoot = function() {
    return this._viewport;
  };
  SVGPainter2.prototype.getViewportRootOffset = function() {
    var viewportRoot = this.getViewportRoot();
    if (viewportRoot) {
      return {
        offsetLeft: viewportRoot.offsetLeft || 0,
        offsetTop: viewportRoot.offsetTop || 0
      };
    }
  };
  SVGPainter2.prototype.getSvgDom = function() {
    return this._svgDom;
  };
  SVGPainter2.prototype.refresh = function() {
    if (this.root) {
      var vnode = this.renderToVNode({
        willUpdate: true
      });
      vnode.attrs.style = "position:absolute;left:0;top:0;user-select:none";
      patch(this._oldVNode, vnode);
      this._oldVNode = vnode;
    }
  };
  SVGPainter2.prototype.renderOneToVNode = function(el) {
    return brush2(el, createBrushScope(this._id));
  };
  SVGPainter2.prototype.renderToVNode = function(opts) {
    opts = opts || {};
    var list = this.storage.getDisplayList(true);
    var width = this._width;
    var height = this._height;
    var scope = createBrushScope(this._id);
    scope.animation = opts.animation;
    scope.willUpdate = opts.willUpdate;
    scope.compress = opts.compress;
    scope.emphasis = opts.emphasis;
    var children = [];
    var bgVNode = this._bgVNode = createBackgroundVNode(width, height, this._backgroundColor, scope);
    bgVNode && children.push(bgVNode);
    var mainVNode = !opts.compress ? this._mainVNode = createVNode("g", "main", {}, []) : null;
    this._paintList(list, scope, mainVNode ? mainVNode.children : children);
    mainVNode && children.push(mainVNode);
    var defs = map(keys(scope.defs), function(id) {
      return scope.defs[id];
    });
    if (defs.length) {
      children.push(createVNode("defs", "defs", {}, defs));
    }
    if (opts.animation) {
      var animationCssStr = getCssString(scope.cssNodes, scope.cssAnims, { newline: true });
      if (animationCssStr) {
        var styleNode = createVNode("style", "stl", {}, [], animationCssStr);
        children.push(styleNode);
      }
    }
    return createSVGVNode(width, height, children, opts.useViewBox);
  };
  SVGPainter2.prototype.renderToString = function(opts) {
    opts = opts || {};
    return vNodeToString(this.renderToVNode({
      animation: retrieve2(opts.cssAnimation, true),
      emphasis: retrieve2(opts.cssEmphasis, true),
      willUpdate: false,
      compress: true,
      useViewBox: retrieve2(opts.useViewBox, true)
    }), { newline: true });
  };
  SVGPainter2.prototype.setBackgroundColor = function(backgroundColor2) {
    this._backgroundColor = backgroundColor2;
  };
  SVGPainter2.prototype.getSvgRoot = function() {
    return this._mainVNode && this._mainVNode.elm;
  };
  SVGPainter2.prototype._paintList = function(list, scope, out2) {
    var listLen = list.length;
    var clipPathsGroupsStack = [];
    var clipPathsGroupsStackDepth = 0;
    var currentClipPathGroup;
    var prevClipPaths;
    var clipGroupNodeIdx = 0;
    for (var i = 0; i < listLen; i++) {
      var displayable = list[i];
      if (!displayable.invisible) {
        var clipPaths = displayable.__clipPaths;
        var len2 = clipPaths && clipPaths.length || 0;
        var prevLen = prevClipPaths && prevClipPaths.length || 0;
        var lca = void 0;
        for (lca = Math.max(len2 - 1, prevLen - 1); lca >= 0; lca--) {
          if (clipPaths && prevClipPaths && clipPaths[lca] === prevClipPaths[lca]) {
            break;
          }
        }
        for (var i_1 = prevLen - 1; i_1 > lca; i_1--) {
          clipPathsGroupsStackDepth--;
          currentClipPathGroup = clipPathsGroupsStack[clipPathsGroupsStackDepth - 1];
        }
        for (var i_2 = lca + 1; i_2 < len2; i_2++) {
          var groupAttrs = {};
          setClipPath(clipPaths[i_2], groupAttrs, scope);
          var g = createVNode("g", "clip-g-" + clipGroupNodeIdx++, groupAttrs, []);
          (currentClipPathGroup ? currentClipPathGroup.children : out2).push(g);
          clipPathsGroupsStack[clipPathsGroupsStackDepth++] = g;
          currentClipPathGroup = g;
        }
        prevClipPaths = clipPaths;
        var ret = brush2(displayable, scope);
        if (ret) {
          (currentClipPathGroup ? currentClipPathGroup.children : out2).push(ret);
        }
      }
    }
  };
  SVGPainter2.prototype.resize = function(width, height) {
    var opts = this._opts;
    var root = this.root;
    var viewport = this._viewport;
    width != null && (opts.width = width);
    height != null && (opts.height = height);
    if (root && viewport) {
      viewport.style.display = "none";
      width = getSize(root, 0, opts);
      height = getSize(root, 1, opts);
      viewport.style.display = "";
    }
    if (this._width !== width || this._height !== height) {
      this._width = width;
      this._height = height;
      if (viewport) {
        var viewportStyle = viewport.style;
        viewportStyle.width = width + "px";
        viewportStyle.height = height + "px";
      }
      if (!isPattern(this._backgroundColor)) {
        var svgDom = this._svgDom;
        if (svgDom) {
          svgDom.setAttribute("width", width);
          svgDom.setAttribute("height", height);
        }
        var bgEl = this._bgVNode && this._bgVNode.elm;
        if (bgEl) {
          bgEl.setAttribute("width", width);
          bgEl.setAttribute("height", height);
        }
      } else {
        this.refresh();
      }
    }
  };
  SVGPainter2.prototype.getWidth = function() {
    return this._width;
  };
  SVGPainter2.prototype.getHeight = function() {
    return this._height;
  };
  SVGPainter2.prototype.dispose = function() {
    if (this.root) {
      this.root.innerHTML = "";
    }
    this._svgDom = this._viewport = this.storage = this._oldVNode = this._bgVNode = this._mainVNode = null;
  };
  SVGPainter2.prototype.clear = function() {
    if (this._svgDom) {
      this._svgDom.innerHTML = null;
    }
    this._oldVNode = null;
  };
  SVGPainter2.prototype.toDataURL = function(base64) {
    var str = this.renderToString();
    var prefix = "data:image/svg+xml;";
    if (base64) {
      str = encodeBase64(str);
      return str && prefix + "base64," + str;
    }
    return prefix + "charset=UTF-8," + encodeURIComponent(str);
  };
  return SVGPainter2;
}();
function createMethodNotSupport(method) {
  return function() {
    if (process.env.NODE_ENV !== "production") {
      logError('In SVG mode painter not support method "' + method + '"');
    }
  };
}
function createBackgroundVNode(width, height, backgroundColor2, scope) {
  var bgVNode;
  if (backgroundColor2 && backgroundColor2 !== "none") {
    bgVNode = createVNode("rect", "bg", {
      width,
      height,
      x: "0",
      y: "0"
    });
    if (isGradient(backgroundColor2)) {
      setGradient({ fill: backgroundColor2 }, bgVNode.attrs, "fill", scope);
    } else if (isPattern(backgroundColor2)) {
      setPattern({
        style: {
          fill: backgroundColor2
        },
        dirty: noop,
        getBoundingRect: function() {
          return { width, height };
        }
      }, bgVNode.attrs, "fill", scope);
    } else {
      var _a2 = normalizeColor(backgroundColor2), color = _a2.color, opacity = _a2.opacity;
      bgVNode.attrs.fill = color;
      opacity < 1 && (bgVNode.attrs["fill-opacity"] = opacity);
    }
  }
  return bgVNode;
}
var Painter_default = SVGPainter;

// node_modules/echarts/lib/renderer/installSVGRenderer.js
function install2(registers) {
  registers.registerPainter("svg", Painter_default);
}

// src/compare.ts
import process2 from "node:process";

// node_modules/filesize/dist/filesize.esm.js
var ARRAY = "array";
var BIT = "bit";
var BITS = "bits";
var BYTE = "byte";
var BYTES = "bytes";
var EMPTY = "";
var EXPONENT = "exponent";
var FUNCTION = "function";
var IEC = "iec";
var INVALID_NUMBER = "Invalid number";
var INVALID_ROUND = "Invalid rounding method";
var JEDEC = "jedec";
var OBJECT = "object";
var PERIOD = ".";
var ROUND = "round";
var S = "s";
var SI = "si";
var SI_KBIT = "kbit";
var SI_KBYTE = "kB";
var SPACE = " ";
var STRING = "string";
var ZERO = "0";
var STRINGS = {
  symbol: {
    iec: {
      bits: ["bit", "Kibit", "Mibit", "Gibit", "Tibit", "Pibit", "Eibit", "Zibit", "Yibit"],
      bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
    },
    jedec: {
      bits: ["bit", "Kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"],
      bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    }
  },
  fullform: {
    iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
    jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"]
  }
};
function filesize(arg, {
  bits = false,
  pad = false,
  base: base2 = -1,
  round: round6 = 2,
  locale = EMPTY,
  localeOptions = {},
  separator = EMPTY,
  spacer = SPACE,
  symbols = {},
  standard = EMPTY,
  output = STRING,
  fullform = false,
  fullforms = [],
  exponent = -1,
  roundingMethod = ROUND,
  precision = 0
} = {}) {
  let e2 = exponent, num = Number(arg), result = [], val = 0, u = EMPTY;
  if (standard === SI) {
    base2 = 10;
    standard = JEDEC;
  } else if (standard === IEC || standard === JEDEC) {
    base2 = 2;
  } else if (base2 === 2) {
    standard = IEC;
  } else {
    base2 = 10;
    standard = JEDEC;
  }
  const ceil = base2 === 10 ? 1e3 : 1024, full = fullform === true, neg = num < 0, roundingFunc = Math[roundingMethod];
  if (typeof arg !== "bigint" && isNaN(arg)) {
    throw new TypeError(INVALID_NUMBER);
  }
  if (typeof roundingFunc !== FUNCTION) {
    throw new TypeError(INVALID_ROUND);
  }
  if (neg) {
    num = -num;
  }
  if (e2 === -1 || isNaN(e2)) {
    e2 = Math.floor(Math.log(num) / Math.log(ceil));
    if (e2 < 0) {
      e2 = 0;
    }
  }
  if (e2 > 8) {
    if (precision > 0) {
      precision += 8 - e2;
    }
    e2 = 8;
  }
  if (output === EXPONENT) {
    return e2;
  }
  if (num === 0) {
    result[0] = 0;
    u = result[1] = STRINGS.symbol[standard][bits ? BITS : BYTES][e2];
  } else {
    val = num / (base2 === 2 ? Math.pow(2, e2 * 10) : Math.pow(1e3, e2));
    if (bits) {
      val = val * 8;
      if (val >= ceil && e2 < 8) {
        val = val / ceil;
        e2++;
      }
    }
    const p = Math.pow(10, e2 > 0 ? round6 : 0);
    result[0] = roundingFunc(val * p) / p;
    if (result[0] === ceil && e2 < 8 && exponent === -1) {
      result[0] = 1;
      e2++;
    }
    u = result[1] = base2 === 10 && e2 === 1 ? bits ? SI_KBIT : SI_KBYTE : STRINGS.symbol[standard][bits ? BITS : BYTES][e2];
  }
  if (neg) {
    result[0] = -result[0];
  }
  if (precision > 0) {
    result[0] = result[0].toPrecision(precision);
  }
  result[1] = symbols[result[1]] || result[1];
  if (locale === true) {
    result[0] = result[0].toLocaleString();
  } else if (locale.length > 0) {
    result[0] = result[0].toLocaleString(locale, localeOptions);
  } else if (separator.length > 0) {
    result[0] = result[0].toString().replace(PERIOD, separator);
  }
  if (pad && Number.isInteger(result[0]) === false && round6 > 0) {
    const x = separator || PERIOD, tmp = result[0].toString().split(x), s = tmp[1] || EMPTY, l = s.length, n = round6 - l;
    result[0] = `${tmp[0]}${x}${s.padEnd(l + n, ZERO)}`;
  }
  if (full) {
    result[1] = fullforms[e2] ? fullforms[e2] : STRINGS.fullform[standard][e2] + (bits ? BIT : BYTE) + (result[0] === 1 ? EMPTY : S);
  }
  return output === ARRAY ? result : output === OBJECT ? {
    value: result[0],
    symbol: result[1],
    exponent: e2,
    unit: u
  } : result.join(spacer);
}

// src/utils.ts
import fs from "node:fs";
function loadJsonFile(path3) {
  return JSON.parse(fs.readFileSync(path3).toString("utf-8"));
}
function loadMetaFile(path3) {
  return loadJsonFile(path3);
}
function loadAnalysisJson(path3) {
  return loadJsonFile(path3);
}
function getInput(name) {
  const val = process.env[`INPUT_${name.toUpperCase()}`] || "";
  return val.trim();
}

// src/compare.ts
use([install, install2]);
function buildTree(input) {
  const root = { name: "", path: "", value: 0, children: [] };
  for (const [filePath, { bytesInOutput }] of Object.entries(input)) {
    const directories = filePath.split("/");
    buildNode(root, directories, bytesInOutput);
  }
  colorize(root);
  return root.children;
}
function buildNode(node, directories, value) {
  const dir = directories.shift();
  if (dir === void 0) {
    return;
  }
  let child = node.children.find((child2) => child2.name === dir);
  if (!child) {
    child = {
      name: dir,
      path: `${node.path}/${dir}`.replace(/^\//, ""),
      value,
      children: []
    };
    node.children.push(child);
  }
  node.value += value;
  buildNode(child, directories, value);
}
var COLOR_PALETTE = [
  "rgb( 83, 178, 173)",
  "rgb( 65,  70, 195)",
  "rgb(231, 139,  55)",
  "rgb(205,  74, 129)",
  "rgb(127, 132, 242)",
  "rgb(142, 221, 120)",
  "rgb( 57, 120, 235)",
  "rgb(106,  43, 203)",
  "rgb(226, 199,  66)"
];
function colorize(root) {
  root.children.forEach((child, index) => {
    if (index % 2 === 0) {
      child.color = [...COLOR_PALETTE];
    } else {
      child.color = [...COLOR_PALETTE].reverse();
    }
  });
}
function compare2(input) {
  let hasAnyChange = false;
  let output = `## \u{1F4E6} esbuild Bundle Analysis for ${input.name}

This analysis was generated by [esbuild-bundle-analyzer](https://github.com/exoego/esbuild-bundle-analyzer). \u{1F916}
`;
  const current = loadAnalysisJson(
    path.join(process2.cwd(), input.analyzerDirectory, "bundle_analysis.json")
  );
  let base2;
  try {
    base2 = loadAnalysisJson(
      path.join(
        process2.cwd(),
        input.analyzerDirectory,
        "base/bundle/bundle_analysis.json"
      )
    );
  } catch (e2) {
    base2 = {};
  }
  const baseLength = 80;
  const myChart = init2(null, null, {
    ssr: true,
    renderer: "svg",
    width: 23 * baseLength,
    height: 9 * baseLength
  });
  for (const metafileRelPath of input.metafiles) {
    const metafile = loadMetaFile(path.join(process2.cwd(), metafileRelPath));
    for (const [outfile, buildMeta] of Object.entries(metafile.outputs)) {
      const data = buildTree(buildMeta.inputs);
      myChart.clear();
      const option = {
        type: "treemap",
        visibleMin: 300,
        breadcrumb: {
          show: false
        },
        // Disable mouse events: https://echarts.apache.org/en/option.html#series-treemap.silent
        silent: true,
        label: {
          show: true
        },
        upperLabel: {
          show: true,
          height: 20,
          formatter: (params) => {
            if (typeof params.value !== "number") {
              return `{directory| ${params.name}/}`;
            }
            const kb = (params.value / 1024).toFixed(0);
            return `{directory| ${params.name}/} {dirsize| ${kb} KB}`;
          },
          rich: {
            directory: {
              color: "#fff"
            },
            dirsize: {
              color: "rgba(255,255,255,0.6)"
            }
          },
          backgroundColor: "transparent",
          position: "insideTop",
          align: "center",
          distance: 15
        },
        itemStyle: {
          borderColorSaturation: 0.4,
          borderWidth: 2,
          gapWidth: 1
        },
        levels: [
          {
            color: ["#222"],
            itemStyle: {},
            upperLabel: {
              // No parent label for top-level nodes like `node_modules/`
              show: false
            }
          },
          {
            itemStyle: {
              borderWidth: 1,
              gapWidth: 3
            }
          }
        ],
        data
      };
      myChart.setOption({ series: [option] });
      fs2.writeFileSync(
        path.join(
          process2.cwd(),
          input.analyzerDirectory,
          `${metafileRelPath}/${outfile}.svg`.replaceAll(/[/>]/g, "_")
        ),
        myChart.renderToSVGString().trim()
      );
      fs2.writeFileSync(
        path.join(
          process2.cwd(),
          input.analyzerDirectory,
          `${metafileRelPath}/${outfile}.json`.replaceAll(/[/>]/g, "_")
        ),
        JSON.stringify(data, null, 2)
      );
    }
  }
  myChart.dispose();
  const allOutFiles = [
    .../* @__PURE__ */ new Set([...Object.keys(current), ...Object.keys(base2)])
  ].sort();
  const comparison = allOutFiles.map((outfile) => {
    const currentStats = current[outfile];
    const baseStats = base2[outfile];
    if (!currentStats) {
      hasAnyChange = true;
      return { ...baseStats, diff: -1, remark: "deleted" };
    }
    if (!baseStats) {
      hasAnyChange = true;
      return { ...currentStats, diff: -1, remark: "added" };
    }
    const diff = currentStats.bytes - baseStats.bytes;
    const increase = !!Math.sign(diff);
    if (diff !== 0) {
      hasAnyChange = true;
    }
    return {
      ...currentStats,
      diff,
      remark: increase ? "increased" : "decreased"
    };
  });
  if (hasAnyChange) {
    output += markdownTable(comparison, input.percentExtraAttention);
    if (input.showDetails) {
      output += `
<details>
<summary>Details</summary>
<p>Next to the size is how much the size has increased or decreased compared with the base branch of this PR.</p>
<ul>
<li>\u203C\uFE0F: Size increased by ${input.percentExtraAttention}% or more. Special attention should be given to this.</li>
<li>\u26A0\uFE0F: Size increased in acceptable range (lower than ${input.percentExtraAttention}%).</li>
<li>\u2705: No change or even downsized.</li>
<li>\u{1F5D1}\uFE0F: The out file is deleted: not found in base branch.</li>
<li>\u{1F195}: The out file is newly found: will be added to base branch.</li>
</ul>
</details>
`;
    }
  } else {
    output += "This PR introduced no changes to the esbuild bundle! \u{1F64C}";
  }
  output += `<!-- __ESBUILD_BUNDLE_${input.name} -->`;
  console.dir({
    input,
    hasAnyChange,
    output
  });
  fs2.mkdirSync(path.join(process2.cwd(), input.analyzerDirectory), {
    recursive: true
  });
  fs2.writeFileSync(
    path.join(
      process2.cwd(),
      input.analyzerDirectory,
      "bundle_analysis_comment.txt"
    ),
    output.trim()
  );
}
function filesize2(bytes) {
  return filesize(bytes, {
    spacer: "\xA0"
  });
}
function markdownTable(data, redThreshold) {
  const rows = data.map((d) => {
    return `${d.metafile} | ${d.outfile} | ${renderSize(d)} | ${renderNote(
      d,
      redThreshold
    )}
`;
  }).join("");
  return `
Meta File | Out File  | Size (raw) | Note 
----------|----------|-----------:|------
${rows}`;
}
function renderSize(d) {
  return filesize2(d.bytes);
}
function renderNote(d, redThreshold) {
  if (d.remark === "deleted") {
    return "\u{1F5D1}\uFE0F Deleted";
  }
  if (d.remark === "added") {
    return "\u{1F195} Added";
  }
  if (d.diff) {
    const percentChange = d.diff / d.bytes * 100;
    return `${renderStatusIndicator(percentChange, redThreshold)}${filesize2(
      d.diff
    )} (${sign(percentChange)}${percentChange.toFixed(1)}%)`;
  }
  return "\u2705  No change";
}
function sign(num) {
  return num < 0 ? "" : "+";
}
function renderStatusIndicator(percentChange, redThreshold) {
  let res;
  if (percentChange > 0 && percentChange < redThreshold) {
    res = "\u26A0\uFE0F";
  } else if (percentChange >= redThreshold) {
    res = "\u203C\uFE0F";
  } else {
    res = "\u2705 ";
  }
  return `${res} ${sign(percentChange)}`;
}

// src/report.ts
import fs3 from "node:fs";
import path2 from "node:path";
import process3 from "node:process";
function report(input) {
  const allPageSizes = getAllPageSizes(input);
  fs3.mkdirSync(path2.join(process3.cwd(), input.analyzerDirectory), {
    recursive: true
  });
  const resultJsonPath = path2.join(
    process3.cwd(),
    input.analyzerDirectory,
    "bundle_analysis.json"
  );
  fs3.writeFileSync(resultJsonPath, JSON.stringify(allPageSizes, null, 2));
  console.log(`Wrote ${resultJsonPath}`);
}
function getAllPageSizes(input) {
  const acc = {};
  return input.metafiles.reduce((acc2, metafile) => {
    const metaFilePath = path2.join(process3.cwd(), metafile);
    try {
      fs3.accessSync(metaFilePath, fs3.constants.R_OK);
    } catch (err) {
      console.error(
        `No meta file found at "${metaFilePath}" - a path to meta file may be wrong, or esbuild is not executed.`
      );
      process3.exit(1);
    }
    const metaFileJson = loadMetaFile(metaFilePath);
    Object.entries(metaFileJson.outputs).reduce((acc3, output) => {
      const [outfile, buildMeta] = output;
      if (!input.includeExtensions.some(
        (ext) => outfile.toLowerCase().endsWith(ext)
      )) {
        return acc3;
      }
      acc3[`${metafile} -> ${outfile}`] = {
        bytes: buildMeta.bytes,
        metafile,
        outfile
      };
      return acc3;
    }, acc2);
    return acc2;
  }, acc);
}

// src/index.ts
function getOptions() {
  const rawMetafiles = getInput("metafiles");
  if (!rawMetafiles) {
    throw new Error("metafiles is not specified");
  }
  const name = getInput("name");
  if (!name) {
    throw new Error("name is not specified");
  }
  return {
    percentExtraAttention: Number.parseInt(
      getInput("percent_extra_attention") || "20",
      10
    ),
    showDetails: ["true", "True", "TRUE"].includes(
      getInput("show_details") || "true"
    ),
    includeExtensions: (getInput("include_extensions") || ".js,.mjs,.cjs").split(","),
    name,
    analyzerDirectory: getInput("analyze_directory") || ".analyzer",
    metafiles: rawMetafiles.split(",")
  };
}
function run(options = getOptions()) {
  report(options);
  compare2(options);
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  run();
}
export {
  run
};
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)

zrender/lib/zrender.js:
  (*!
  * ZRender, a high performance 2d drawing library.
  *
  * Copyright (c) 2013, Baidu Inc.
  * All rights reserved.
  *
  * LICENSE
  * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
  *)

filesize/dist/filesize.esm.js:
  (**
   * filesize
   *
   * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
   * @license BSD-3-Clause
   * @version 10.1.1
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9jb21wYXJlLnRzIiwgIi4uL3NyYy91dGlscy50cyIsICIuLi9zcmMvcmVwb3J0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBwYXRoVG9GaWxlVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSBcIi4vY29tcGFyZVwiO1xuaW1wb3J0IHsgcmVwb3J0IH0gZnJvbSBcIi4vcmVwb3J0XCI7XG5pbXBvcnQgdHlwZSB7IE9wdGlvbnMgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgZ2V0SW5wdXQgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBnZXRPcHRpb25zKCk6IE9wdGlvbnMge1xuXHRjb25zdCByYXdNZXRhZmlsZXMgPSBnZXRJbnB1dChcIm1ldGFmaWxlc1wiKTtcblx0aWYgKCFyYXdNZXRhZmlsZXMpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJtZXRhZmlsZXMgaXMgbm90IHNwZWNpZmllZFwiKTtcblx0fVxuXHRjb25zdCBuYW1lID0gZ2V0SW5wdXQoXCJuYW1lXCIpO1xuXHRpZiAoIW5hbWUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJuYW1lIGlzIG5vdCBzcGVjaWZpZWRcIik7XG5cdH1cblx0cmV0dXJuIHtcblx0XHRwZXJjZW50RXh0cmFBdHRlbnRpb246IE51bWJlci5wYXJzZUludChcblx0XHRcdGdldElucHV0KFwicGVyY2VudF9leHRyYV9hdHRlbnRpb25cIikgfHwgXCIyMFwiLFxuXHRcdFx0MTAsXG5cdFx0KSxcblx0XHRzaG93RGV0YWlsczogW1widHJ1ZVwiLCBcIlRydWVcIiwgXCJUUlVFXCJdLmluY2x1ZGVzKFxuXHRcdFx0Z2V0SW5wdXQoXCJzaG93X2RldGFpbHNcIikgfHwgXCJ0cnVlXCIsXG5cdFx0KSxcblx0XHRpbmNsdWRlRXh0ZW5zaW9uczogKFxuXHRcdFx0Z2V0SW5wdXQoXCJpbmNsdWRlX2V4dGVuc2lvbnNcIikgfHwgXCIuanMsLm1qcywuY2pzXCJcblx0XHQpLnNwbGl0KFwiLFwiKSxcblx0XHRuYW1lLFxuXHRcdGFuYWx5emVyRGlyZWN0b3J5OiBnZXRJbnB1dChcImFuYWx5emVfZGlyZWN0b3J5XCIpIHx8IFwiLmFuYWx5emVyXCIsXG5cdFx0bWV0YWZpbGVzOiByYXdNZXRhZmlsZXMuc3BsaXQoXCIsXCIpLFxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKG9wdGlvbnM6IE9wdGlvbnMgPSBnZXRPcHRpb25zKCkpOiB2b2lkIHtcblx0cmVwb3J0KG9wdGlvbnMpO1xuXHRjb21wYXJlKG9wdGlvbnMpO1xufVxuXG5pZiAoaW1wb3J0Lm1ldGEudXJsID09PSBwYXRoVG9GaWxlVVJMKHByb2Nlc3MuYXJndlsxXSkuaHJlZikge1xuXHRydW4oKTtcbn1cbiIsICJpbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB0eXBlIHsgVHJlZW1hcFNlcmllc09wdGlvbiB9IGZyb20gXCJlY2hhcnRzXCI7XG5pbXBvcnQgeyBUcmVlbWFwQ2hhcnQgfSBmcm9tIFwiZWNoYXJ0cy9jaGFydHNcIjtcbmltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSBcImVjaGFydHMvY29yZVwiO1xuaW1wb3J0IHsgU1ZHUmVuZGVyZXIgfSBmcm9tIFwiZWNoYXJ0cy9yZW5kZXJlcnNcIjtcblxuaW1wb3J0IHByb2Nlc3MgZnJvbSBcIm5vZGU6cHJvY2Vzc1wiO1xuaW1wb3J0IHsgZmlsZXNpemUgYXMgb3JpZ2luYWxGaWxlc2l6ZSB9IGZyb20gXCJmaWxlc2l6ZVwiO1xuaW1wb3J0IHR5cGUgeyBDb21wYXJlUmVzdWx0LCBPcHRpb25zLCBSZXBvcnQgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgbG9hZEFuYWx5c2lzSnNvbiwgbG9hZE1ldGFGaWxlIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZWNoYXJ0cy51c2UoW1RyZWVtYXBDaGFydCwgU1ZHUmVuZGVyZXJdKTtcblxuaW50ZXJmYWNlIFRyZWVNYXBOb2RlIHtcblx0dmFsdWU6IG51bWJlcjtcblx0bmFtZTogc3RyaW5nO1xuXHRjb2xvcj86IEFycmF5PHN0cmluZz47XG5cdHBhdGg6IHN0cmluZztcblx0Y2hpbGRyZW46IFRyZWVNYXBOb2RlW107XG59XG5cbmZ1bmN0aW9uIGJ1aWxkVHJlZShpbnB1dDogUmVjb3JkPHN0cmluZywgeyBieXRlc0luT3V0cHV0OiBudW1iZXIgfT4pIHtcblx0Y29uc3Qgcm9vdDogVHJlZU1hcE5vZGUgPSB7IG5hbWU6IFwiXCIsIHBhdGg6IFwiXCIsIHZhbHVlOiAwLCBjaGlsZHJlbjogW10gfTtcblx0Zm9yIChjb25zdCBbZmlsZVBhdGgsIHsgYnl0ZXNJbk91dHB1dCB9XSBvZiBPYmplY3QuZW50cmllcyhpbnB1dCkpIHtcblx0XHRjb25zdCBkaXJlY3RvcmllcyA9IGZpbGVQYXRoLnNwbGl0KFwiL1wiKTtcblx0XHRidWlsZE5vZGUocm9vdCwgZGlyZWN0b3JpZXMsIGJ5dGVzSW5PdXRwdXQpO1xuXHR9XG5cdGNvbG9yaXplKHJvb3QpO1xuXG5cdHJldHVybiByb290LmNoaWxkcmVuO1xufVxuXG5mdW5jdGlvbiBidWlsZE5vZGUoXG5cdG5vZGU6IFRyZWVNYXBOb2RlLFxuXHRkaXJlY3RvcmllczogQXJyYXk8c3RyaW5nPixcblx0dmFsdWU6IG51bWJlcixcbik6IHZvaWQge1xuXHRjb25zdCBkaXIgPSBkaXJlY3Rvcmllcy5zaGlmdCgpO1xuXHRpZiAoZGlyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0bGV0IGNoaWxkID0gbm9kZS5jaGlsZHJlbi5maW5kKChjaGlsZCkgPT4gY2hpbGQubmFtZSA9PT0gZGlyKTtcblx0aWYgKCFjaGlsZCkge1xuXHRcdGNoaWxkID0ge1xuXHRcdFx0bmFtZTogZGlyLFxuXHRcdFx0cGF0aDogYCR7bm9kZS5wYXRofS8ke2Rpcn1gLnJlcGxhY2UoL15cXC8vLCBcIlwiKSxcblx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdGNoaWxkcmVuOiBbXSxcblx0XHR9O1xuXHRcdG5vZGUuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdH1cblx0bm9kZS52YWx1ZSArPSB2YWx1ZTtcblx0YnVpbGROb2RlKGNoaWxkLCBkaXJlY3RvcmllcywgdmFsdWUpO1xufVxuXG4vLyBodHRwczovL3NwZWN0cnVtLmFkb2JlLmNvbS9wYWdlL2NvbG9yLWZvci1kYXRhLXZpc3VhbGl6YXRpb24vI0NhdGVnb3JpY2FsXG5jb25zdCBDT0xPUl9QQUxFVFRFID0gW1xuXHRcInJnYiggODMsIDE3OCwgMTczKVwiLFxuXHRcInJnYiggNjUsICA3MCwgMTk1KVwiLFxuXHRcInJnYigyMzEsIDEzOSwgIDU1KVwiLFxuXHRcInJnYigyMDUsICA3NCwgMTI5KVwiLFxuXHRcInJnYigxMjcsIDEzMiwgMjQyKVwiLFxuXHRcInJnYigxNDIsIDIyMSwgMTIwKVwiLFxuXHRcInJnYiggNTcsIDEyMCwgMjM1KVwiLFxuXHRcInJnYigxMDYsICA0MywgMjAzKVwiLFxuXHRcInJnYigyMjYsIDE5OSwgIDY2KVwiLFxuXTtcblxuZnVuY3Rpb24gY29sb3JpemUocm9vdDogVHJlZU1hcE5vZGUpOiB2b2lkIHtcblx0cm9vdC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHtcblx0XHRpZiAoaW5kZXggJSAyID09PSAwKSB7XG5cdFx0XHRjaGlsZC5jb2xvciA9IFsuLi5DT0xPUl9QQUxFVFRFXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hpbGQuY29sb3IgPSBbLi4uQ09MT1JfUEFMRVRURV0ucmV2ZXJzZSgpO1xuXHRcdH1cblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlKGlucHV0OiBPcHRpb25zKTogdm9pZCB7XG5cdGxldCBoYXNBbnlDaGFuZ2UgPSBmYWxzZTtcblx0bGV0IG91dHB1dCA9IGAjIyBcdUQ4M0RcdURDRTYgZXNidWlsZCBCdW5kbGUgQW5hbHlzaXMgZm9yICR7aW5wdXQubmFtZX1cblxuVGhpcyBhbmFseXNpcyB3YXMgZ2VuZXJhdGVkIGJ5IFtlc2J1aWxkLWJ1bmRsZS1hbmFseXplcl0oaHR0cHM6Ly9naXRodWIuY29tL2V4b2Vnby9lc2J1aWxkLWJ1bmRsZS1hbmFseXplcikuIFx1RDgzRVx1REQxNlxuYDtcblxuXHRjb25zdCBjdXJyZW50ID0gbG9hZEFuYWx5c2lzSnNvbihcblx0XHRwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgaW5wdXQuYW5hbHl6ZXJEaXJlY3RvcnksIFwiYnVuZGxlX2FuYWx5c2lzLmpzb25cIiksXG5cdCk7XG5cdGxldCBiYXNlOiBSZXBvcnQ7XG5cdHRyeSB7XG5cdFx0YmFzZSA9IGxvYWRBbmFseXNpc0pzb24oXG5cdFx0XHRwYXRoLmpvaW4oXG5cdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdGlucHV0LmFuYWx5emVyRGlyZWN0b3J5LFxuXHRcdFx0XHRcImJhc2UvYnVuZGxlL2J1bmRsZV9hbmFseXNpcy5qc29uXCIsXG5cdFx0XHQpLFxuXHRcdCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRiYXNlID0ge307XG5cdH1cblxuXHRjb25zdCBiYXNlTGVuZ3RoID0gODA7XG5cdGNvbnN0IG15Q2hhcnQgPSBlY2hhcnRzLmluaXQobnVsbCwgbnVsbCwge1xuXHRcdHNzcjogdHJ1ZSxcblx0XHRyZW5kZXJlcjogXCJzdmdcIixcblx0XHR3aWR0aDogMjMgKiBiYXNlTGVuZ3RoLFxuXHRcdGhlaWdodDogOSAqIGJhc2VMZW5ndGgsXG5cdH0pO1xuXHRmb3IgKGNvbnN0IG1ldGFmaWxlUmVsUGF0aCBvZiBpbnB1dC5tZXRhZmlsZXMpIHtcblx0XHRjb25zdCBtZXRhZmlsZSA9IGxvYWRNZXRhRmlsZShwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgbWV0YWZpbGVSZWxQYXRoKSk7XG5cdFx0Zm9yIChjb25zdCBbb3V0ZmlsZSwgYnVpbGRNZXRhXSBvZiBPYmplY3QuZW50cmllcyhtZXRhZmlsZS5vdXRwdXRzKSkge1xuXHRcdFx0Y29uc3QgZGF0YSA9IGJ1aWxkVHJlZShidWlsZE1ldGEuaW5wdXRzKTtcblx0XHRcdG15Q2hhcnQuY2xlYXIoKTtcblx0XHRcdGNvbnN0IG9wdGlvbjogVHJlZW1hcFNlcmllc09wdGlvbiA9IHtcblx0XHRcdFx0dHlwZTogXCJ0cmVlbWFwXCIsXG5cdFx0XHRcdHZpc2libGVNaW46IDMwMCxcblx0XHRcdFx0YnJlYWRjcnVtYjoge1xuXHRcdFx0XHRcdHNob3c6IGZhbHNlLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQvLyBEaXNhYmxlIG1vdXNlIGV2ZW50czogaHR0cHM6Ly9lY2hhcnRzLmFwYWNoZS5vcmcvZW4vb3B0aW9uLmh0bWwjc2VyaWVzLXRyZWVtYXAuc2lsZW50XG5cdFx0XHRcdHNpbGVudDogdHJ1ZSxcblx0XHRcdFx0bGFiZWw6IHtcblx0XHRcdFx0XHRzaG93OiB0cnVlLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR1cHBlckxhYmVsOiB7XG5cdFx0XHRcdFx0c2hvdzogdHJ1ZSxcblx0XHRcdFx0XHRoZWlnaHQ6IDIwLFxuXHRcdFx0XHRcdGZvcm1hdHRlcjogKHBhcmFtcykgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBwYXJhbXMudmFsdWUgIT09IFwibnVtYmVyXCIpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGB7ZGlyZWN0b3J5fCAke3BhcmFtcy5uYW1lfS99YDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IGtiID0gKHBhcmFtcy52YWx1ZSAvIDEwMjQpLnRvRml4ZWQoMCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYHtkaXJlY3Rvcnl8ICR7cGFyYW1zLm5hbWV9L30ge2RpcnNpemV8ICR7a2J9IEtCfWA7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyaWNoOiB7XG5cdFx0XHRcdFx0XHRkaXJlY3Rvcnk6IHtcblx0XHRcdFx0XHRcdFx0Y29sb3I6IFwiI2ZmZlwiLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGRpcnNpemU6IHtcblx0XHRcdFx0XHRcdFx0Y29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjYpXCIsXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG5cdFx0XHRcdFx0cG9zaXRpb246IFwiaW5zaWRlVG9wXCIsXG5cdFx0XHRcdFx0YWxpZ246IFwiY2VudGVyXCIsXG5cdFx0XHRcdFx0ZGlzdGFuY2U6IDE1LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpdGVtU3R5bGU6IHtcblx0XHRcdFx0XHRib3JkZXJDb2xvclNhdHVyYXRpb246IDAuNCxcblx0XHRcdFx0XHRib3JkZXJXaWR0aDogMixcblx0XHRcdFx0XHRnYXBXaWR0aDogMSxcblx0XHRcdFx0fSxcblx0XHRcdFx0bGV2ZWxzOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29sb3I6IFtcIiMyMjJcIl0sXG5cdFx0XHRcdFx0XHRpdGVtU3R5bGU6IHt9LFxuXHRcdFx0XHRcdFx0dXBwZXJMYWJlbDoge1xuXHRcdFx0XHRcdFx0XHQvLyBObyBwYXJlbnQgbGFiZWwgZm9yIHRvcC1sZXZlbCBub2RlcyBsaWtlIGBub2RlX21vZHVsZXMvYFxuXHRcdFx0XHRcdFx0XHRzaG93OiBmYWxzZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpdGVtU3R5bGU6IHtcblx0XHRcdFx0XHRcdFx0Ym9yZGVyV2lkdGg6IDEsXG5cdFx0XHRcdFx0XHRcdGdhcFdpZHRoOiAzLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXRhLFxuXHRcdFx0fTtcblx0XHRcdG15Q2hhcnQuc2V0T3B0aW9uKHsgc2VyaWVzOiBbb3B0aW9uXSB9KTtcblxuXHRcdFx0ZnMud3JpdGVGaWxlU3luYyhcblx0XHRcdFx0cGF0aC5qb2luKFxuXHRcdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdFx0aW5wdXQuYW5hbHl6ZXJEaXJlY3RvcnksXG5cdFx0XHRcdFx0YCR7bWV0YWZpbGVSZWxQYXRofS8ke291dGZpbGV9LnN2Z2AucmVwbGFjZUFsbCgvWy8+XS9nLCBcIl9cIiksXG5cdFx0XHRcdCksXG5cdFx0XHRcdG15Q2hhcnQucmVuZGVyVG9TVkdTdHJpbmcoKS50cmltKCksXG5cdFx0XHQpO1xuXHRcdFx0ZnMud3JpdGVGaWxlU3luYyhcblx0XHRcdFx0cGF0aC5qb2luKFxuXHRcdFx0XHRcdHByb2Nlc3MuY3dkKCksXG5cdFx0XHRcdFx0aW5wdXQuYW5hbHl6ZXJEaXJlY3RvcnksXG5cdFx0XHRcdFx0YCR7bWV0YWZpbGVSZWxQYXRofS8ke291dGZpbGV9Lmpzb25gLnJlcGxhY2VBbGwoL1svPl0vZywgXCJfXCIpLFxuXHRcdFx0XHQpLFxuXHRcdFx0XHRKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdG15Q2hhcnQuZGlzcG9zZSgpO1xuXG5cdGNvbnN0IGFsbE91dEZpbGVzOiBzdHJpbmdbXSA9IFtcblx0XHQuLi5uZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhjdXJyZW50KSwgLi4uT2JqZWN0LmtleXMoYmFzZSldKSxcblx0XS5zb3J0KCk7XG5cdGNvbnN0IGNvbXBhcmlzb246IEFycmF5PENvbXBhcmVSZXN1bHQ+ID0gYWxsT3V0RmlsZXMubWFwKChvdXRmaWxlKSA9PiB7XG5cdFx0Y29uc3QgY3VycmVudFN0YXRzID0gY3VycmVudFtvdXRmaWxlXTtcblx0XHRjb25zdCBiYXNlU3RhdHMgPSBiYXNlW291dGZpbGVdO1xuXG5cdFx0aWYgKCFjdXJyZW50U3RhdHMpIHtcblx0XHRcdGhhc0FueUNoYW5nZSA9IHRydWU7XG5cdFx0XHQvLyBkZWxldGVkIG91dCBmaWxlXG5cdFx0XHRyZXR1cm4geyAuLi5iYXNlU3RhdHMsIGRpZmY6IC0xLCByZW1hcms6IFwiZGVsZXRlZFwiIH07XG5cdFx0fVxuXHRcdGlmICghYmFzZVN0YXRzKSB7XG5cdFx0XHRoYXNBbnlDaGFuZ2UgPSB0cnVlO1xuXHRcdFx0Ly8gbmV3IG91dCBmaWxlXG5cdFx0XHRyZXR1cm4geyAuLi5jdXJyZW50U3RhdHMsIGRpZmY6IC0xLCByZW1hcms6IFwiYWRkZWRcIiB9O1xuXHRcdH1cblx0XHRjb25zdCBkaWZmID0gY3VycmVudFN0YXRzLmJ5dGVzIC0gYmFzZVN0YXRzLmJ5dGVzO1xuXHRcdGNvbnN0IGluY3JlYXNlID0gISFNYXRoLnNpZ24oZGlmZik7XG5cdFx0aWYgKGRpZmYgIT09IDApIHtcblx0XHRcdGhhc0FueUNoYW5nZSA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5jdXJyZW50U3RhdHMsXG5cdFx0XHRkaWZmLFxuXHRcdFx0cmVtYXJrOiBpbmNyZWFzZSA/IFwiaW5jcmVhc2VkXCIgOiBcImRlY3JlYXNlZFwiLFxuXHRcdH07XG5cdH0pO1xuXG5cdGlmIChoYXNBbnlDaGFuZ2UpIHtcblx0XHRvdXRwdXQgKz0gbWFya2Rvd25UYWJsZShjb21wYXJpc29uLCBpbnB1dC5wZXJjZW50RXh0cmFBdHRlbnRpb24pO1xuXG5cdFx0aWYgKGlucHV0LnNob3dEZXRhaWxzKSB7XG5cdFx0XHRvdXRwdXQgKz0gYFxcbjxkZXRhaWxzPlxuPHN1bW1hcnk+RGV0YWlsczwvc3VtbWFyeT5cbjxwPk5leHQgdG8gdGhlIHNpemUgaXMgaG93IG11Y2ggdGhlIHNpemUgaGFzIGluY3JlYXNlZCBvciBkZWNyZWFzZWQgY29tcGFyZWQgd2l0aCB0aGUgYmFzZSBicmFuY2ggb2YgdGhpcyBQUi48L3A+XG48dWw+XG48bGk+XHUyMDNDXHVGRTBGOiBTaXplIGluY3JlYXNlZCBieSAke2lucHV0LnBlcmNlbnRFeHRyYUF0dGVudGlvbn0lIG9yIG1vcmUuIFNwZWNpYWwgYXR0ZW50aW9uIHNob3VsZCBiZSBnaXZlbiB0byB0aGlzLjwvbGk+XG48bGk+XHUyNkEwXHVGRTBGOiBTaXplIGluY3JlYXNlZCBpbiBhY2NlcHRhYmxlIHJhbmdlIChsb3dlciB0aGFuICR7aW5wdXQucGVyY2VudEV4dHJhQXR0ZW50aW9ufSUpLjwvbGk+XG48bGk+XHUyNzA1OiBObyBjaGFuZ2Ugb3IgZXZlbiBkb3duc2l6ZWQuPC9saT5cbjxsaT5cdUQ4M0RcdURERDFcdUZFMEY6IFRoZSBvdXQgZmlsZSBpcyBkZWxldGVkOiBub3QgZm91bmQgaW4gYmFzZSBicmFuY2guPC9saT5cbjxsaT5cdUQ4M0NcdUREOTU6IFRoZSBvdXQgZmlsZSBpcyBuZXdseSBmb3VuZDogd2lsbCBiZSBhZGRlZCB0byBiYXNlIGJyYW5jaC48L2xpPlxuPC91bD5cbjwvZGV0YWlscz5cXG5gO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRvdXRwdXQgKz0gXCJUaGlzIFBSIGludHJvZHVjZWQgbm8gY2hhbmdlcyB0byB0aGUgZXNidWlsZCBidW5kbGUhIFx1RDgzRFx1REU0Q1wiO1xuXHR9XG5cblx0Ly8gd2UgYWRkIHRoaXMgdGFnIHNvIHRoYXQgb3VyIGFjdGlvbiBjYW4gYmUgYWJsZSB0byBlYXNpbHkgYW5kXG5cdC8vIGNvbnNpc3RlbnRseSBmaW5kIHRoZSByaWdodCBjb21tZW50IHRvIGVkaXQgYXMgbW9yZSBjb21taXRzIGFyZSBwdXNoZWQuXG5cdG91dHB1dCArPSBgPCEtLSBfX0VTQlVJTERfQlVORExFXyR7aW5wdXQubmFtZX0gLS0+YDtcblxuXHQvLyBMb2cgbW9zdGx5IGZvciB0ZXN0aW5nIGFuZCBkZWJ1Z2dpbmcuXG5cdC8vIFRoaXMgd2lsbCBzaG93IHVwIGluIHRoZSBnaXRodWIgYWN0aW9ucyBjb25zb2xlLlxuXHRjb25zb2xlLmRpcih7XG5cdFx0aW5wdXQsXG5cdFx0aGFzQW55Q2hhbmdlLFxuXHRcdG91dHB1dCxcblx0fSk7XG5cblx0Ly8gV3JpdGUgdGhlIG91dHB1dCB0byBhIGZpbGUgd2hpY2ggaXMgbGF0ZXIgcmVhZCBpblxuXHQvLyBhcyBjb21tZW50IGNvbnRlbnRzIGJ5IHRoZSBhY3Rpb25zIHdvcmtmbG93LlxuXHRmcy5ta2RpclN5bmMocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGlucHV0LmFuYWx5emVyRGlyZWN0b3J5KSwge1xuXHRcdHJlY3Vyc2l2ZTogdHJ1ZSxcblx0fSk7XG5cdGZzLndyaXRlRmlsZVN5bmMoXG5cdFx0cGF0aC5qb2luKFxuXHRcdFx0cHJvY2Vzcy5jd2QoKSxcblx0XHRcdGlucHV0LmFuYWx5emVyRGlyZWN0b3J5LFxuXHRcdFx0XCJidW5kbGVfYW5hbHlzaXNfY29tbWVudC50eHRcIixcblx0XHQpLFxuXHRcdG91dHB1dC50cmltKCksXG5cdCk7XG59XG5cbmZ1bmN0aW9uIGZpbGVzaXplKGJ5dGVzOiBudW1iZXIpOiBzdHJpbmcge1xuXHRyZXR1cm4gb3JpZ2luYWxGaWxlc2l6ZShieXRlcywge1xuXHRcdHNwYWNlcjogXCJcdTAwQTBcIixcblx0fSk7XG59XG5cbmZ1bmN0aW9uIG1hcmtkb3duVGFibGUoXG5cdGRhdGE6IEFycmF5PENvbXBhcmVSZXN1bHQ+LFxuXHRyZWRUaHJlc2hvbGQ6IG51bWJlcixcbik6IHN0cmluZyB7XG5cdGNvbnN0IHJvd3MgPSBkYXRhXG5cdFx0Lm1hcCgoZCkgPT4ge1xuXHRcdFx0cmV0dXJuIGAke2QubWV0YWZpbGV9IHwgJHtkLm91dGZpbGV9IHwgJHtyZW5kZXJTaXplKGQpfSB8ICR7cmVuZGVyTm90ZShcblx0XHRcdFx0ZCxcblx0XHRcdFx0cmVkVGhyZXNob2xkLFxuXHRcdFx0KX1cXG5gO1xuXHRcdH0pXG5cdFx0LmpvaW4oXCJcIik7XG5cblx0cmV0dXJuIGBcbk1ldGEgRmlsZSB8IE91dCBGaWxlICB8IFNpemUgKHJhdykgfCBOb3RlIFxuLS0tLS0tLS0tLXwtLS0tLS0tLS0tfC0tLS0tLS0tLS0tOnwtLS0tLS1cbiR7cm93c31gO1xufVxuXG5mdW5jdGlvbiByZW5kZXJTaXplKGQ6IENvbXBhcmVSZXN1bHQpOiBzdHJpbmcge1xuXHRyZXR1cm4gZmlsZXNpemUoZC5ieXRlcyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5vdGUoZDogQ29tcGFyZVJlc3VsdCwgcmVkVGhyZXNob2xkOiBudW1iZXIpOiBzdHJpbmcge1xuXHRpZiAoZC5yZW1hcmsgPT09IFwiZGVsZXRlZFwiKSB7XG5cdFx0cmV0dXJuIFwiXHVEODNEXHVEREQxXHVGRTBGIERlbGV0ZWRcIjtcblx0fVxuXHRpZiAoZC5yZW1hcmsgPT09IFwiYWRkZWRcIikge1xuXHRcdHJldHVybiBcIlx1RDgzQ1x1REQ5NSBBZGRlZFwiO1xuXHR9XG5cdGlmIChkLmRpZmYpIHtcblx0XHRjb25zdCBwZXJjZW50Q2hhbmdlID0gKGQuZGlmZiAvIGQuYnl0ZXMpICogMTAwO1xuXHRcdHJldHVybiBgJHtyZW5kZXJTdGF0dXNJbmRpY2F0b3IocGVyY2VudENoYW5nZSwgcmVkVGhyZXNob2xkKX0ke2ZpbGVzaXplKFxuXHRcdFx0ZC5kaWZmLFxuXHRcdCl9ICgke3NpZ24ocGVyY2VudENoYW5nZSl9JHtwZXJjZW50Q2hhbmdlLnRvRml4ZWQoMSl9JSlgO1xuXHR9XG5cdHJldHVybiBcIlx1MjcwNSAgTm8gY2hhbmdlXCI7XG59XG5cbmZ1bmN0aW9uIHNpZ24obnVtOiBudW1iZXIpOiBzdHJpbmcge1xuXHRyZXR1cm4gbnVtIDwgMCA/IFwiXCIgOiBcIitcIjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyU3RhdHVzSW5kaWNhdG9yKFxuXHRwZXJjZW50Q2hhbmdlOiBudW1iZXIsXG5cdHJlZFRocmVzaG9sZDogbnVtYmVyLFxuKTogc3RyaW5nIHtcblx0bGV0IHJlczogc3RyaW5nO1xuXHRpZiAocGVyY2VudENoYW5nZSA+IDAgJiYgcGVyY2VudENoYW5nZSA8IHJlZFRocmVzaG9sZCkge1xuXHRcdHJlcyA9IFwiXHUyNkEwXHVGRTBGXCI7XG5cdH0gZWxzZSBpZiAocGVyY2VudENoYW5nZSA+PSByZWRUaHJlc2hvbGQpIHtcblx0XHRyZXMgPSBcIlx1MjAzQ1x1RkUwRlwiO1xuXHR9IGVsc2Uge1xuXHRcdHJlcyA9IFwiXHUyNzA1IFwiO1xuXHR9XG5cdHJldHVybiBgJHtyZXN9ICR7c2lnbihwZXJjZW50Q2hhbmdlKX1gO1xufVxuIiwgImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuXG5pbXBvcnQgdHlwZSB7IE1ldGFmaWxlIH0gZnJvbSBcImVzYnVpbGRcIjtcbmltcG9ydCB0eXBlIHsgUmVwb3J0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZnVuY3Rpb24gbG9hZEpzb25GaWxlKHBhdGg6IHN0cmluZykge1xuXHRyZXR1cm4gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aCkudG9TdHJpbmcoXCJ1dGYtOFwiKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkTWV0YUZpbGUocGF0aDogc3RyaW5nKTogTWV0YWZpbGUge1xuXHRyZXR1cm4gbG9hZEpzb25GaWxlKHBhdGgpIGFzIE1ldGFmaWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEFuYWx5c2lzSnNvbihwYXRoOiBzdHJpbmcpOiBSZXBvcnQge1xuXHRyZXR1cm4gbG9hZEpzb25GaWxlKHBhdGgpIGFzIFJlcG9ydDtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FjdGlvbnMvdG9vbGtpdC9ibG9iLzgxYTczYWJhOGJlZGQ1MzJmNmVkZGNjNDFlZDNhMGZhZDhiMWNmZWIvcGFja2FnZXMvY29yZS9zcmMvY29yZS50cyNMMTI2XG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5wdXQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcblx0Y29uc3QgdmFsID0gcHJvY2Vzcy5lbnZbYElOUFVUXyR7bmFtZS50b1VwcGVyQ2FzZSgpfWBdIHx8IFwiXCI7XG5cdHJldHVybiB2YWwudHJpbSgpO1xufVxuIiwgImltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHByb2Nlc3MgZnJvbSBcIm5vZGU6cHJvY2Vzc1wiO1xuXG5pbXBvcnQgdHlwZSB7IE9wdGlvbnMsIFJlcG9ydCB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBsb2FkTWV0YUZpbGUgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0KGlucHV0OiBPcHRpb25zKTogdm9pZCB7XG5cdGNvbnN0IGFsbFBhZ2VTaXplcyA9IGdldEFsbFBhZ2VTaXplcyhpbnB1dCk7XG5cdGZzLm1rZGlyU3luYyhwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgaW5wdXQuYW5hbHl6ZXJEaXJlY3RvcnkpLCB7XG5cdFx0cmVjdXJzaXZlOiB0cnVlLFxuXHR9KTtcblx0Y29uc3QgcmVzdWx0SnNvblBhdGggPSBwYXRoLmpvaW4oXG5cdFx0cHJvY2Vzcy5jd2QoKSxcblx0XHRpbnB1dC5hbmFseXplckRpcmVjdG9yeSxcblx0XHRcImJ1bmRsZV9hbmFseXNpcy5qc29uXCIsXG5cdCk7XG5cdGZzLndyaXRlRmlsZVN5bmMocmVzdWx0SnNvblBhdGgsIEpTT04uc3RyaW5naWZ5KGFsbFBhZ2VTaXplcywgbnVsbCwgMikpO1xuXHRjb25zb2xlLmxvZyhgV3JvdGUgJHtyZXN1bHRKc29uUGF0aH1gKTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsUGFnZVNpemVzKGlucHV0OiBPcHRpb25zKTogUmVwb3J0IHtcblx0Y29uc3QgYWNjOiBSZXBvcnQgPSB7fTtcblx0cmV0dXJuIGlucHV0Lm1ldGFmaWxlcy5yZWR1Y2UoKGFjYywgbWV0YWZpbGUpID0+IHtcblx0XHRjb25zdCBtZXRhRmlsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgbWV0YWZpbGUpO1xuXHRcdHRyeSB7XG5cdFx0XHRmcy5hY2Nlc3NTeW5jKG1ldGFGaWxlUGF0aCwgZnMuY29uc3RhbnRzLlJfT0spO1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdFx0YE5vIG1ldGEgZmlsZSBmb3VuZCBhdCBcIiR7bWV0YUZpbGVQYXRofVwiIC0gYSBwYXRoIHRvIG1ldGEgZmlsZSBtYXkgYmUgd3JvbmcsIG9yIGVzYnVpbGQgaXMgbm90IGV4ZWN1dGVkLmAsXG5cdFx0XHQpO1xuXHRcdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1ldGFGaWxlSnNvbiA9IGxvYWRNZXRhRmlsZShtZXRhRmlsZVBhdGgpO1xuXHRcdE9iamVjdC5lbnRyaWVzKG1ldGFGaWxlSnNvbi5vdXRwdXRzKS5yZWR1Y2UoKGFjYywgb3V0cHV0KSA9PiB7XG5cdFx0XHRjb25zdCBbb3V0ZmlsZSwgYnVpbGRNZXRhXSA9IG91dHB1dDtcblx0XHRcdGlmIChcblx0XHRcdFx0IWlucHV0LmluY2x1ZGVFeHRlbnNpb25zLnNvbWUoKGV4dCkgPT5cblx0XHRcdFx0XHRvdXRmaWxlLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoZXh0KSxcblx0XHRcdFx0KVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBhY2M7XG5cdFx0XHR9XG5cdFx0XHRhY2NbYCR7bWV0YWZpbGV9IC0+ICR7b3V0ZmlsZX1gXSA9IHtcblx0XHRcdFx0Ynl0ZXM6IGJ1aWxkTWV0YS5ieXRlcyxcblx0XHRcdFx0bWV0YWZpbGUsXG5cdFx0XHRcdG91dGZpbGUsXG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIGFjYztcblx0XHR9LCBhY2MpO1xuXHRcdHJldHVybiBhY2M7XG5cdH0sIGFjYyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxxQkFBcUI7OztBQ0E5QixPQUFPQSxTQUFRO0FBQ2YsT0FBTyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTWpCLE9BQU9DLGNBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHBCLE9BQU8sUUFBUTtBQUtmLFNBQVMsYUFBYUMsT0FBYztBQUNuQyxTQUFPLEtBQUssTUFBTSxHQUFHLGFBQWFBLEtBQUksRUFBRSxTQUFTLE9BQU8sQ0FBQztBQUMxRDtBQUVPLFNBQVMsYUFBYUEsT0FBd0I7QUFDcEQsU0FBTyxhQUFhQSxLQUFJO0FBQ3pCO0FBRU8sU0FBUyxpQkFBaUJBLE9BQXNCO0FBQ3RELFNBQU8sYUFBYUEsS0FBSTtBQUN6QjtBQUdPLFNBQVMsU0FBUyxNQUFzQjtBQUM5QyxRQUFNLE1BQU0sUUFBUSxJQUFJLFNBQVMsS0FBSyxZQUFZLENBQUMsRUFBRSxLQUFLO0FBQzFELFNBQU8sSUFBSSxLQUFLO0FBQ2pCOzs7QURUUSxJQUFJLENBQUMsU0FBY0MsUUFBVyxDQUFDO0FBVXZDLFNBQVMsVUFBVSxPQUFrRDtBQUNwRSxRQUFNLE9BQW9CLEVBQUUsTUFBTSxJQUFJLE1BQU0sSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLEVBQUU7QUFDdkUsYUFBVyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsS0FBSyxPQUFPLFFBQVEsS0FBSyxHQUFHO0FBQ2xFLFVBQU0sY0FBYyxTQUFTLE1BQU0sR0FBRztBQUN0QyxjQUFVLE1BQU0sYUFBYSxhQUFhO0FBQUEsRUFDM0M7QUFDQSxXQUFTLElBQUk7QUFFYixTQUFPLEtBQUs7QUFDYjtBQUVBLFNBQVMsVUFDUixNQUNBLGFBQ0EsT0FDTztBQUNQLFFBQU0sTUFBTSxZQUFZLE1BQU07QUFDOUIsTUFBSSxRQUFRLFFBQVc7QUFDdEI7QUFBQSxFQUNEO0FBQ0EsTUFBSSxRQUFRLEtBQUssU0FBUyxLQUFLLENBQUNDLFdBQVVBLE9BQU0sU0FBUyxHQUFHO0FBQzVELE1BQUksQ0FBQyxPQUFPO0FBQ1gsWUFBUTtBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsR0FBRyxRQUFRLE9BQU8sRUFBRTtBQUFBLE1BQzdDO0FBQUEsTUFDQSxVQUFVLENBQUM7QUFBQSxJQUNaO0FBQ0EsU0FBSyxTQUFTLEtBQUssS0FBSztBQUFBLEVBQ3pCO0FBQ0EsT0FBSyxTQUFTO0FBQ2QsWUFBVSxPQUFPLGFBQWEsS0FBSztBQUNwQztBQUdBLElBQU0sZ0JBQWdCO0FBQUEsRUFDckI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNEO0FBRUEsU0FBUyxTQUFTLE1BQXlCO0FBQzFDLE9BQUssU0FBUyxRQUFRLENBQUMsT0FBTyxVQUFVO0FBQ3ZDLFFBQUksUUFBUSxNQUFNLEdBQUc7QUFDcEIsWUFBTSxRQUFRLENBQUMsR0FBRyxhQUFhO0FBQUEsSUFDaEMsT0FBTztBQUNOLFlBQU0sUUFBUSxDQUFDLEdBQUcsYUFBYSxFQUFFLFFBQVE7QUFBQSxJQUMxQztBQUFBLEVBQ0QsQ0FBQztBQUNGO0FBRU8sU0FBU0MsU0FBUSxPQUFzQjtBQUM3QyxNQUFJLGVBQWU7QUFDbkIsTUFBSSxTQUFTLDRDQUFxQyxNQUFNLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFLNUQsUUFBTSxVQUFVO0FBQUEsSUFDZixLQUFLLEtBQUtDLFNBQVEsSUFBSSxHQUFHLE1BQU0sbUJBQW1CLHNCQUFzQjtBQUFBLEVBQ3pFO0FBQ0EsTUFBSUM7QUFDSixNQUFJO0FBQ0gsSUFBQUEsUUFBTztBQUFBLE1BQ04sS0FBSztBQUFBLFFBQ0pELFNBQVEsSUFBSTtBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ047QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLEVBQ0QsU0FBU0UsSUFBRztBQUNYLElBQUFELFFBQU8sQ0FBQztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGFBQWE7QUFDbkIsUUFBTSxVQUFrQkUsTUFBSyxNQUFNLE1BQU07QUFBQSxJQUN4QyxLQUFLO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixPQUFPLEtBQUs7QUFBQSxJQUNaLFFBQVEsSUFBSTtBQUFBLEVBQ2IsQ0FBQztBQUNELGFBQVcsbUJBQW1CLE1BQU0sV0FBVztBQUM5QyxVQUFNLFdBQVcsYUFBYSxLQUFLLEtBQUtILFNBQVEsSUFBSSxHQUFHLGVBQWUsQ0FBQztBQUN2RSxlQUFXLENBQUMsU0FBUyxTQUFTLEtBQUssT0FBTyxRQUFRLFNBQVMsT0FBTyxHQUFHO0FBQ3BFLFlBQU0sT0FBTyxVQUFVLFVBQVUsTUFBTTtBQUN2QyxjQUFRLE1BQU07QUFDZCxZQUFNLFNBQThCO0FBQUEsUUFDbkMsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFVBQ1gsTUFBTTtBQUFBLFFBQ1A7QUFBQTtBQUFBLFFBRUEsUUFBUTtBQUFBLFFBQ1IsT0FBTztBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1A7QUFBQSxRQUNBLFlBQVk7QUFBQSxVQUNYLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVcsQ0FBQyxXQUFXO0FBQ3RCLGdCQUFJLE9BQU8sT0FBTyxVQUFVLFVBQVU7QUFDckMscUJBQU8sZUFBZSxPQUFPLElBQUk7QUFBQSxZQUNsQztBQUNBLGtCQUFNLE1BQU0sT0FBTyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBQzFDLG1CQUFPLGVBQWUsT0FBTyxJQUFJLGdCQUFnQixFQUFFO0FBQUEsVUFDcEQ7QUFBQSxVQUNBLE1BQU07QUFBQSxZQUNMLFdBQVc7QUFBQSxjQUNWLE9BQU87QUFBQSxZQUNSO0FBQUEsWUFDQSxTQUFTO0FBQUEsY0FDUixPQUFPO0FBQUEsWUFDUjtBQUFBLFVBQ0Q7QUFBQSxVQUNBLGlCQUFpQjtBQUFBLFVBQ2pCLFVBQVU7QUFBQSxVQUNWLE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxRQUNYO0FBQUEsUUFDQSxXQUFXO0FBQUEsVUFDVix1QkFBdUI7QUFBQSxVQUN2QixhQUFhO0FBQUEsVUFDYixVQUFVO0FBQUEsUUFDWDtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ1A7QUFBQSxZQUNDLE9BQU8sQ0FBQyxNQUFNO0FBQUEsWUFDZCxXQUFXLENBQUM7QUFBQSxZQUNaLFlBQVk7QUFBQTtBQUFBLGNBRVgsTUFBTTtBQUFBLFlBQ1A7QUFBQSxVQUNEO0FBQUEsVUFDQTtBQUFBLFlBQ0MsV0FBVztBQUFBLGNBQ1YsYUFBYTtBQUFBLGNBQ2IsVUFBVTtBQUFBLFlBQ1g7QUFBQSxVQUNEO0FBQUEsUUFDRDtBQUFBLFFBQ0E7QUFBQSxNQUNEO0FBQ0EsY0FBUSxVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXRDLE1BQUFJLElBQUc7QUFBQSxRQUNGLEtBQUs7QUFBQSxVQUNKSixTQUFRLElBQUk7QUFBQSxVQUNaLE1BQU07QUFBQSxVQUNOLEdBQUcsZUFBZSxJQUFJLE9BQU8sT0FBTyxXQUFXLFNBQVMsR0FBRztBQUFBLFFBQzVEO0FBQUEsUUFDQSxRQUFRLGtCQUFrQixFQUFFLEtBQUs7QUFBQSxNQUNsQztBQUNBLE1BQUFJLElBQUc7QUFBQSxRQUNGLEtBQUs7QUFBQSxVQUNKSixTQUFRLElBQUk7QUFBQSxVQUNaLE1BQU07QUFBQSxVQUNOLEdBQUcsZUFBZSxJQUFJLE9BQU8sUUFBUSxXQUFXLFNBQVMsR0FBRztBQUFBLFFBQzdEO0FBQUEsUUFDQSxLQUFLLFVBQVUsTUFBTSxNQUFNLENBQUM7QUFBQSxNQUM3QjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0EsVUFBUSxRQUFRO0FBRWhCLFFBQU0sY0FBd0I7QUFBQSxJQUM3QixHQUFHLG9CQUFJLElBQUksQ0FBQyxHQUFHLE9BQU8sS0FBSyxPQUFPLEdBQUcsR0FBRyxPQUFPLEtBQUtDLEtBQUksQ0FBQyxDQUFDO0FBQUEsRUFDM0QsRUFBRSxLQUFLO0FBQ1AsUUFBTSxhQUFtQyxZQUFZLElBQUksQ0FBQyxZQUFZO0FBQ3JFLFVBQU0sZUFBZSxRQUFRLE9BQU87QUFDcEMsVUFBTSxZQUFZQSxNQUFLLE9BQU87QUFFOUIsUUFBSSxDQUFDLGNBQWM7QUFDbEIscUJBQWU7QUFFZixhQUFPLEVBQUUsR0FBRyxXQUFXLE1BQU0sSUFBSSxRQUFRLFVBQVU7QUFBQSxJQUNwRDtBQUNBLFFBQUksQ0FBQyxXQUFXO0FBQ2YscUJBQWU7QUFFZixhQUFPLEVBQUUsR0FBRyxjQUFjLE1BQU0sSUFBSSxRQUFRLFFBQVE7QUFBQSxJQUNyRDtBQUNBLFVBQU0sT0FBTyxhQUFhLFFBQVEsVUFBVTtBQUM1QyxVQUFNLFdBQVcsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJO0FBQ2pDLFFBQUksU0FBUyxHQUFHO0FBQ2YscUJBQWU7QUFBQSxJQUNoQjtBQUNBLFdBQU87QUFBQSxNQUNOLEdBQUc7QUFBQSxNQUNIO0FBQUEsTUFDQSxRQUFRLFdBQVcsY0FBYztBQUFBLElBQ2xDO0FBQUEsRUFDRCxDQUFDO0FBRUQsTUFBSSxjQUFjO0FBQ2pCLGNBQVUsY0FBYyxZQUFZLE1BQU0scUJBQXFCO0FBRS9ELFFBQUksTUFBTSxhQUFhO0FBQ3RCLGdCQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQ0FJZSxNQUFNLHFCQUFxQjtBQUFBLG1FQUNFLE1BQU0scUJBQXFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNbEY7QUFBQSxFQUNELE9BQU87QUFDTixjQUFVO0FBQUEsRUFDWDtBQUlBLFlBQVUseUJBQXlCLE1BQU0sSUFBSTtBQUk3QyxVQUFRLElBQUk7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNELENBQUM7QUFJRCxFQUFBRyxJQUFHLFVBQVUsS0FBSyxLQUFLSixTQUFRLElBQUksR0FBRyxNQUFNLGlCQUFpQixHQUFHO0FBQUEsSUFDL0QsV0FBVztBQUFBLEVBQ1osQ0FBQztBQUNELEVBQUFJLElBQUc7QUFBQSxJQUNGLEtBQUs7QUFBQSxNQUNKSixTQUFRLElBQUk7QUFBQSxNQUNaLE1BQU07QUFBQSxNQUNOO0FBQUEsSUFDRDtBQUFBLElBQ0EsT0FBTyxLQUFLO0FBQUEsRUFDYjtBQUNEO0FBRUEsU0FBU0ssVUFBUyxPQUF1QjtBQUN4QyxTQUFPLFNBQWlCLE9BQU87QUFBQSxJQUM5QixRQUFRO0FBQUEsRUFDVCxDQUFDO0FBQ0Y7QUFFQSxTQUFTLGNBQ1IsTUFDQSxjQUNTO0FBQ1QsUUFBTSxPQUFPLEtBQ1gsSUFBSSxDQUFDLE1BQU07QUFDWCxXQUFPLEdBQUcsRUFBRSxRQUFRLE1BQU0sRUFBRSxPQUFPLE1BQU0sV0FBVyxDQUFDLENBQUMsTUFBTTtBQUFBLE1BQzNEO0FBQUEsTUFDQTtBQUFBLElBQ0QsQ0FBQztBQUFBO0FBQUEsRUFDRixDQUFDLEVBQ0EsS0FBSyxFQUFFO0FBRVQsU0FBTztBQUFBO0FBQUE7QUFBQSxFQUdOLElBQUk7QUFDTjtBQUVBLFNBQVMsV0FBVyxHQUEwQjtBQUM3QyxTQUFPQSxVQUFTLEVBQUUsS0FBSztBQUN4QjtBQUVBLFNBQVMsV0FBVyxHQUFrQixjQUE4QjtBQUNuRSxNQUFJLEVBQUUsV0FBVyxXQUFXO0FBQzNCLFdBQU87QUFBQSxFQUNSO0FBQ0EsTUFBSSxFQUFFLFdBQVcsU0FBUztBQUN6QixXQUFPO0FBQUEsRUFDUjtBQUNBLE1BQUksRUFBRSxNQUFNO0FBQ1gsVUFBTSxnQkFBaUIsRUFBRSxPQUFPLEVBQUUsUUFBUztBQUMzQyxXQUFPLEdBQUcsc0JBQXNCLGVBQWUsWUFBWSxDQUFDLEdBQUdBO0FBQUEsTUFDOUQsRUFBRTtBQUFBLElBQ0gsQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDLEdBQUcsY0FBYyxRQUFRLENBQUMsQ0FBQztBQUFBLEVBQ3JEO0FBQ0EsU0FBTztBQUNSO0FBRUEsU0FBUyxLQUFLLEtBQXFCO0FBQ2xDLFNBQU8sTUFBTSxJQUFJLEtBQUs7QUFDdkI7QUFFQSxTQUFTLHNCQUNSLGVBQ0EsY0FDUztBQUNULE1BQUk7QUFDSixNQUFJLGdCQUFnQixLQUFLLGdCQUFnQixjQUFjO0FBQ3RELFVBQU07QUFBQSxFQUNQLFdBQVcsaUJBQWlCLGNBQWM7QUFDekMsVUFBTTtBQUFBLEVBQ1AsT0FBTztBQUNOLFVBQU07QUFBQSxFQUNQO0FBQ0EsU0FBTyxHQUFHLEdBQUcsSUFBSSxLQUFLLGFBQWEsQ0FBQztBQUNyQzs7O0FFM1VBLE9BQU9DLFNBQVE7QUFDZixPQUFPQyxXQUFVO0FBQ2pCLE9BQU9DLGNBQWE7QUFLYixTQUFTLE9BQU8sT0FBc0I7QUFDNUMsUUFBTSxlQUFlLGdCQUFnQixLQUFLO0FBQzFDLEVBQUFDLElBQUcsVUFBVUMsTUFBSyxLQUFLQyxTQUFRLElBQUksR0FBRyxNQUFNLGlCQUFpQixHQUFHO0FBQUEsSUFDL0QsV0FBVztBQUFBLEVBQ1osQ0FBQztBQUNELFFBQU0saUJBQWlCRCxNQUFLO0FBQUEsSUFDM0JDLFNBQVEsSUFBSTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ047QUFBQSxFQUNEO0FBQ0EsRUFBQUYsSUFBRyxjQUFjLGdCQUFnQixLQUFLLFVBQVUsY0FBYyxNQUFNLENBQUMsQ0FBQztBQUN0RSxVQUFRLElBQUksU0FBUyxjQUFjLEVBQUU7QUFDdEM7QUFFQSxTQUFTLGdCQUFnQixPQUF3QjtBQUNoRCxRQUFNLE1BQWMsQ0FBQztBQUNyQixTQUFPLE1BQU0sVUFBVSxPQUFPLENBQUNHLE1BQUssYUFBYTtBQUNoRCxVQUFNLGVBQWVGLE1BQUssS0FBS0MsU0FBUSxJQUFJLEdBQUcsUUFBUTtBQUN0RCxRQUFJO0FBQ0gsTUFBQUYsSUFBRyxXQUFXLGNBQWNBLElBQUcsVUFBVSxJQUFJO0FBQUEsSUFDOUMsU0FBUyxLQUFLO0FBQ2IsY0FBUTtBQUFBLFFBQ1AsMEJBQTBCLFlBQVk7QUFBQSxNQUN2QztBQUNBLE1BQUFFLFNBQVEsS0FBSyxDQUFDO0FBQUEsSUFDZjtBQUVBLFVBQU0sZUFBZSxhQUFhLFlBQVk7QUFDOUMsV0FBTyxRQUFRLGFBQWEsT0FBTyxFQUFFLE9BQU8sQ0FBQ0MsTUFBSyxXQUFXO0FBQzVELFlBQU0sQ0FBQyxTQUFTLFNBQVMsSUFBSTtBQUM3QixVQUNDLENBQUMsTUFBTSxrQkFBa0I7QUFBQSxRQUFLLENBQUMsUUFDOUIsUUFBUSxZQUFZLEVBQUUsU0FBUyxHQUFHO0FBQUEsTUFDbkMsR0FDQztBQUNELGVBQU9BO0FBQUEsTUFDUjtBQUNBLE1BQUFBLEtBQUksR0FBRyxRQUFRLE9BQU8sT0FBTyxFQUFFLElBQUk7QUFBQSxRQUNsQyxPQUFPLFVBQVU7QUFBQSxRQUNqQjtBQUFBLFFBQ0E7QUFBQSxNQUNEO0FBQ0EsYUFBT0E7QUFBQSxJQUNSLEdBQUdBLElBQUc7QUFDTixXQUFPQTtBQUFBLEVBQ1IsR0FBRyxHQUFHO0FBQ1A7OztBSC9DQSxTQUFTLGFBQXNCO0FBQzlCLFFBQU0sZUFBZSxTQUFTLFdBQVc7QUFDekMsTUFBSSxDQUFDLGNBQWM7QUFDbEIsVUFBTSxJQUFJLE1BQU0sNEJBQTRCO0FBQUEsRUFDN0M7QUFDQSxRQUFNLE9BQU8sU0FBUyxNQUFNO0FBQzVCLE1BQUksQ0FBQyxNQUFNO0FBQ1YsVUFBTSxJQUFJLE1BQU0sdUJBQXVCO0FBQUEsRUFDeEM7QUFDQSxTQUFPO0FBQUEsSUFDTix1QkFBdUIsT0FBTztBQUFBLE1BQzdCLFNBQVMseUJBQXlCLEtBQUs7QUFBQSxNQUN2QztBQUFBLElBQ0Q7QUFBQSxJQUNBLGFBQWEsQ0FBQyxRQUFRLFFBQVEsTUFBTSxFQUFFO0FBQUEsTUFDckMsU0FBUyxjQUFjLEtBQUs7QUFBQSxJQUM3QjtBQUFBLElBQ0Esb0JBQ0MsU0FBUyxvQkFBb0IsS0FBSyxpQkFDakMsTUFBTSxHQUFHO0FBQUEsSUFDWDtBQUFBLElBQ0EsbUJBQW1CLFNBQVMsbUJBQW1CLEtBQUs7QUFBQSxJQUNwRCxXQUFXLGFBQWEsTUFBTSxHQUFHO0FBQUEsRUFDbEM7QUFDRDtBQUVPLFNBQVMsSUFBSSxVQUFtQixXQUFXLEdBQVM7QUFDMUQsU0FBTyxPQUFPO0FBQ2QsRUFBQUMsU0FBUSxPQUFPO0FBQ2hCO0FBRUEsSUFBSSxZQUFZLFFBQVEsY0FBYyxRQUFRLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTTtBQUM1RCxNQUFJO0FBQ0w7IiwKICAibmFtZXMiOiBbImZzIiwgInByb2Nlc3MiLCAicGF0aCIsICJpbnN0YWxsIiwgImNoaWxkIiwgImNvbXBhcmUiLCAicHJvY2VzcyIsICJiYXNlIiwgImUiLCAiaW5pdCIsICJmcyIsICJmaWxlc2l6ZSIsICJmcyIsICJwYXRoIiwgInByb2Nlc3MiLCAiZnMiLCAicGF0aCIsICJwcm9jZXNzIiwgImFjYyIsICJjb21wYXJlIl0KfQo=
