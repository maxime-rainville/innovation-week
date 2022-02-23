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

/***/ "./src/boot/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _registerComponents = __webpack_require__("./src/boot/registerComponents.js");

var _registerComponents2 = _interopRequireDefault(_registerComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.document.addEventListener('DOMContentLoaded', function () {
  (0, _registerComponents2.default)();
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
      props = _objectWithoutProperties(_ref, ['match']);

  var path = match.path;

  return _react2.default.createElement(
    LeftAndMain,
    null,
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

/***/ "./src/components/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnovationWeek = undefined;

var _InnovationWeek = __webpack_require__("./src/components/InnovationWeek.js");

var _InnovationWeek2 = _interopRequireDefault(_InnovationWeek);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.InnovationWeek = _InnovationWeek2.default;

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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map