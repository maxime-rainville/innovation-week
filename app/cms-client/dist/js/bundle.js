/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bundles/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/index.js":
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__("./node_modules/uuid/v1.js");
var v4 = __webpack_require__("./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__("./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__("./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__("./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__("./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./src/boot/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _registerComponents = __webpack_require__("./src/boot/registerComponents.js");

var _registerComponents2 = _interopRequireDefault(_registerComponents);

var _registerReducers = __webpack_require__("./src/boot/registerReducers.js");

var _registerReducers2 = _interopRequireDefault(_registerReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.document.addEventListener('DOMContentLoaded', function () {
  (0, _registerComponents2.default)();
  (0, _registerReducers2.default)();
});

/***/ }),

/***/ "./src/boot/registerComponents.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Injector = __webpack_require__(2);

var _Injector2 = _interopRequireDefault(_Injector);

var _components = __webpack_require__("./src/components/index.js");

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _Injector2.default.component.registerMany(_extends({}, components));
};

/***/ }),

/***/ "./src/boot/registerReducers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Injector = __webpack_require__(2);

var _Injector2 = _interopRequireDefault(_Injector);

var _redux = __webpack_require__(4);

var _TodoReducer = __webpack_require__("./src/state/todo/TodoReducer.js");

var _TodoReducer2 = _interopRequireDefault(_TodoReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _Injector2.default.reducer.registerMany({
    todo: _TodoReducer2.default
  });
};

/***/ }),

/***/ "./src/bundles/bundle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("./src/boot/index.js");

/***/ }),

/***/ "./src/components/InnovationWeek.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Injector = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(1);

var _Index = __webpack_require__("./src/components/Pages/Index.js");

var _Index2 = _interopRequireDefault(_Index);

var _Foo = __webpack_require__("./src/components/Pages/Foo.js");

var _Foo2 = _interopRequireDefault(_Foo);

var _Bar = __webpack_require__("./src/components/Pages/Bar.js");

var _Bar2 = _interopRequireDefault(_Bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var breadcrumbs = [{
  text: 'Innovation Week',
  href: 'innovation-week'
}];

var LeftAndMain = (0, _Injector.loadComponent)('LeftAndMain');

var InnovationWeek = function InnovationWeek(_ref) {
  var match = _ref.match,
      push = _ref.history.push,
      props = _objectWithoutProperties(_ref, ['match', 'history']);

  var path = match.path;


  console.dir(props);

  var topActions = [{
    color: 'primary',
    label: 'Home',
    icon: 'home',
    value: 'home',
    onClick: function onClick() {
      push(path);
    }
  }, {
    color: 'secondary',
    label: 'Foo',
    value: 'foo',
    onClick: function onClick() {
      push(path + '/foo');
    }
  }, {
    color: 'secondary',
    label: 'Bar',
    value: 'bar',
    onClick: function onClick() {
      push(path + '/bar');
    }
  }];

  return _react2.default.createElement(
    LeftAndMain,
    { topActions: topActions },
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { path: path + '/bar/:paramOne?/:paramTwo?', component: _Bar2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: path + '/foo', component: _Foo2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: path, component: _Index2.default, exact: true })
    )
  );
};

exports.default = (0, _reactRouterDom.withRouter)(InnovationWeek);

/***/ }),

/***/ "./src/components/Pages/Bar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function Page(_ref) {
  var _ref$match$params = _ref.match.params,
      paramOne = _ref$match$params.paramOne,
      paramTwo = _ref$match$params.paramTwo;
  return _react2.default.createElement(
    'div',
    null,
    'This is a Bar page. parameterOne=',
    paramOne,
    ' parameterTwo=',
    paramTwo,
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/admin/innovation' },
      'Back'
    )
  );
};

exports.default = (0, _reactRouterDom.withRouter)(Page);

/***/ }),

/***/ "./src/components/Pages/Foo.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function Page() {
  return _react2.default.createElement(
    'div',
    null,
    'This is a Foo page',
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/admin/innovation' },
      'Back'
    )
  );
};

exports.default = Page;

/***/ }),

/***/ "./src/components/Pages/Index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function Page() {
  return _react2.default.createElement(
    'div',
    null,
    'This is the default landing page',
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/admin/innovation/foo' },
      'Foo'
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/admin/innovation/bar' },
      'Bar'
    )
  );
};

exports.default = Page;

/***/ }),

/***/ "./src/components/Todo/Form.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(3);

var _FormBuilderModal = __webpack_require__(5);

var _FormBuilderModal2 = _interopRequireDefault(_FormBuilderModal);

var _SchemaActions = __webpack_require__(6);

var schemaActions = _interopRequireWildcard(_SchemaActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.getModalProps = _this.getModalProps.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Form, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(oldProps) {
      var props = this.props;
    }
  }, {
    key: 'getModalProps',
    value: function getModalProps() {
      var props = Object.assign({}, this.props, {
        onSubmit: this.handleSubmit,
        onClosed: this.props.onClosed,
        autoFocus: true,
        showErrorMessage: true
      });

      return props;
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(data, action) {
      switch (action) {
        case 'action_cancel':
          {
            this.props.onClosed();
            break;
          }
        default:
          {
            this.props.onInsert(data, action);
          }
      }

      return Promise.resolve();
    }
  }, {
    key: 'render',
    value: function render() {
      var modalProps = this.getModalProps();
      return _react2.default.createElement(_FormBuilderModal2.default, modalProps);
    }
  }]);

  return Form;
}(_react.Component);

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      schema: (0, _redux.bindActionCreators)(schemaActions, dispatch)
    }
  };
}

function mapStateToProps(state) {
  var schemaUrl = '/admin/todo/formSchema';

  return {
    schemaUrl: schemaUrl
  };
}
exports.default = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(Form);

/***/ }),

/***/ "./src/components/Todo/Gallery.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Injector = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(3);

var _Item = __webpack_require__("./src/components/Todo/Item.js");

var _Item2 = _interopRequireDefault(_Item);

var _Form = __webpack_require__("./src/components/Todo/Form.js");

var _Form2 = _interopRequireDefault(_Form);

var _TodoActions = __webpack_require__("./src/state/todo/TodoActions.js");

var todoActions = _interopRequireWildcard(_TodoActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LeftAndMain = (0, _Injector.loadComponent)('LeftAndMain');

var Gallery = function Gallery(_ref) {
  var path = _ref.match.path,
      push = _ref.history.push,
      todos = _ref.todos,
      actions = _ref.actions,
      props = _objectWithoutProperties(_ref, ['match', 'history', 'todos', 'actions']);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];

  var topActions = [{
    children: 'Add',
    icon: 'plus',
    key: 'add',
    onClick: function onClick() {
      setShowModal(true);
    }
  }, {
    children: 'Something else',
    icon: 'minus',
    key: 'minus',
    className: 'mr-auto'
  }, {
    children: 'Filter',
    icon: 'filter',
    key: 'filter'
  }];

  var tabProps = {
    current: 'done',
    tabs: [{ title: 'Todo', key: 'todo' }, { title: 'Done', key: 'done' }]
  };

  var onInsert = function onInsert(data) {
    setShowModal(false);
    actions.add(data.title, data.body);
  };

  return _react2.default.createElement(
    LeftAndMain,
    { topActions: topActions, title: 'Todo List', tabProps: tabProps },
    _react2.default.createElement(
      'div',
      { className: 'todo-flex-box' },
      todos.map(function (todo) {
        return _react2.default.createElement(_Item2.default, _extends({ key: todo.id }, todo, { path: path + '/show' }));
      })
    ),
    _react2.default.createElement(_Form2.default, { title: 'Add a todo', isOpen: showModal, onClosed: function onClosed() {
        return setShowModal(false);
      }, onInsert: onInsert, identifer: 'boom' })
  );
};

function mapStateToProps(state) {
  return {
    todos: state.todo.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      add: function add(title, body) {
        return dispatch(todoActions.add(title, body));
      }
    }
  };
}

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Gallery));

/***/ }),

/***/ "./src/components/Todo/Item.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function Item(_ref) {
  var id = _ref.id,
      title = _ref.title,
      picture = _ref.picture,
      path = _ref.path;
  return _react2.default.createElement(
    _reactRouterDom.Link,
    { className: 'item', to: path + '/' + id },
    _react2.default.createElement('div', { className: 'item__thumbnail', style: { backgroundImage: 'url(' + picture + '?id=' + id + ')' } }),
    _react2.default.createElement(
      'div',
      { className: 'item__title' },
      title
    )
  );
};

exports.default = Item;

/***/ }),

/***/ "./src/components/Todo/Show.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Injector = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(3);

var _TodoActions = __webpack_require__("./src/state/todo/TodoActions.js");

var todoActions = _interopRequireWildcard(_TodoActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var LeftAndMain = (0, _Injector.loadComponent)('LeftAndMain');

var Show = function Show(_ref) {
  var push = _ref.history.push,
      todo = _ref.todo,
      path = _ref.path,
      actions = _ref.actions,
      props = _objectWithoutProperties(_ref, ['history', 'todo', 'path', 'actions']);

  var breadcrumbs = [{
    text: 'Todo List',
    href: 'admin/todo',
    onClick: function onClick(event) {
      event.preventDefault();
      push('..');
    }
  }, {
    text: todo.title,
    href: path + '/show/' + todo.id
  }];

  var topActions = [{
    color: 'primary',
    title: 'Mark has done',
    icon: 'check-mark',
    value: 'done',
    onClick: function onClick() {
      actions.done(todo.id);
      push('..');
    }
  }];

  return _react2.default.createElement(
    LeftAndMain,
    { bottomActions: topActions, breadcrumbs: breadcrumbs },
    _react2.default.createElement(
      'h1',
      null,
      todo.title
    ),
    _react2.default.createElement(
      'p',
      null,
      todo.body
    ),
    _react2.default.createElement('img', { src: todo.picture + '?id=' + todo.id, alt: '' })
  );
};

function mapStateToProps(state, ownProps) {
  return {
    todo: state.todo.todos.find(function (todo) {
      return todo.id === ownProps.match.params.id;
    }),
    path: ownProps.match.path
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      done: function done(id) {
        return dispatch(todoActions.done(id));
      }
    }
  };
}

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Show));

/***/ }),

/***/ "./src/components/Todo/Todo.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Injector = __webpack_require__(2);

var _reactRouterDom = __webpack_require__(1);

var _Gallery = __webpack_require__("./src/components/Todo/Gallery.js");

var _Gallery2 = _interopRequireDefault(_Gallery);

var _Show = __webpack_require__("./src/components/Todo/Show.js");

var _Show2 = _interopRequireDefault(_Show);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Todo = function Todo(_ref) {
  var path = _ref.match.path,
      push = _ref.history.push,
      todos = _ref.todos,
      actions = _ref.actions,
      props = _objectWithoutProperties(_ref, ['match', 'history', 'todos', 'actions']);

  return _react2.default.createElement(
    _reactRouterDom.Switch,
    null,
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: path, component: _Gallery2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: path + '/show/:id', component: _Show2.default })
  );
};

function mapStateToProps(state) {
  return {
    todos: state.todo.todos
  };
};

exports.default = (0, _reactRouterDom.withRouter)(Todo);

/***/ }),

/***/ "./src/components/Widget.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Widget = function Widget(_ref) {
  var lastname = _ref.lastname,
      firstname = _ref.firstname,
      email = _ref.email;
  return _react2.default.createElement(
    'ul',
    null,
    _react2.default.createElement(
      'li',
      null,
      firstname
    ),
    _react2.default.createElement(
      'li',
      null,
      lastname
    ),
    _react2.default.createElement(
      'li',
      null,
      email
    )
  );
};

exports.default = Widget;

/***/ }),

/***/ "./src/components/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todo = exports.Widget = exports.InnovationWeek = undefined;

var _InnovationWeek = __webpack_require__("./src/components/InnovationWeek.js");

var _InnovationWeek2 = _interopRequireDefault(_InnovationWeek);

var _Widget = __webpack_require__("./src/components/Widget.js");

var _Widget2 = _interopRequireDefault(_Widget);

var _Todo = __webpack_require__("./src/components/Todo/Todo.js");

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.InnovationWeek = _InnovationWeek2.default;
exports.Widget = _Widget2.default;
exports.Todo = _Todo2.default;

/***/ }),

/***/ "./src/state/todo/TodoActionTypes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ADD: 'TODO_ADD',
  DONE: 'TODO_DONE'
};

/***/ }),

/***/ "./src/state/todo/TodoActions.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.done = done;

var _TodoActionTypes = __webpack_require__("./src/state/todo/TodoActionTypes.js");

var _TodoActionTypes2 = _interopRequireDefault(_TodoActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function add(title, body) {
  return { type: _TodoActionTypes2.default.ADD, payload: { title: title, body: body } };
}

function done(id) {
  return { type: _TodoActionTypes2.default.DONE, payload: { id: id } };
}

/***/ }),

/***/ "./src/state/todo/TodoReducer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _uuid = __webpack_require__("./node_modules/uuid/index.js");

var _TodoActionTypes = __webpack_require__("./src/state/todo/TodoActionTypes.js");

var _TodoActionTypes2 = _interopRequireDefault(_TodoActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initState = {
  todos: [{
    title: 'Learn React',
    body: 'The best way to learn React is to build a simple app',
    picture: 'https://picsum.photos/400/400/?random',
    id: 'oeiaoei'
  }, {
    title: 'Complete the app',
    body: 'We need a show case for our project',
    id: 'aoeiaoeiaoei',
    picture: 'https://picsum.photos/400/400/?random'
  }, {
    title: 'Implement search',
    body: 'Seaching is a must',
    id: 'oeiioeaii',
    picture: 'https://picsum.photos/400/400/?random'
  }, {
    title: 'Implement routing',
    body: 'Seaching is a must',
    id: 'oeiaoeiaoi',
    picture: 'https://picsum.photos/400/400/?random'
  }, {
    title: 'Learn Redux',
    body: 'The best way to learn React is to build a simple app',
    picture: 'https://picsum.photos/400/400/?random',
    id: 'oeiaeuoeioei'
  }, {
    title: 'Documentation',
    body: 'We need a show case for our project',
    id: 'aoeiaoeuoddoeudeiaoei',
    picture: 'https://picsum.photos/400/400/?random'
  }, {
    title: 'Pagination',
    body: 'Seaching is a must',
    id: 'oeiiuiaoiaeiaoeioeaii',
    picture: 'https://picsum.photos/400/400/?random'
  }, {
    title: 'Streamlined GraphQL',
    body: 'Seaching is a must',
    id: 'oeiaoeiao8eig09aoeiaoi',
    picture: 'https://picsum.photos/400/400/?random'
  }]
};

function todoReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _TodoActionTypes2.default.ADD:
      {
        return _extends({}, state, {
          todos: [].concat(_toConsumableArray(state.todos), [{
            title: payload.title,
            body: payload.body,
            picture: 'https://picsum.photos/200/200/?random',
            id: (0, _uuid.v4)()
          }])
        });
      }

    case _TodoActionTypes2.default.DONE:
      {
        return _extends({}, state, {
          todos: state.todos.filter(function (todo) {
            return todo.id !== payload.id;
          })
        });
      }

    default:
      return state;
  }
}

exports.default = todoReducer;

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = ReactRouterDom;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = ReactRedux;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = Redux;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = FormBuilderModal;

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = SchemaActions;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map