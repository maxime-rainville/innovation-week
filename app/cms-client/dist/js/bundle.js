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


var _ReactRouteRegister = __webpack_require__(4);

var _ReactRouteRegister2 = _interopRequireDefault(_ReactRouteRegister);

var _Config = __webpack_require__(3);

var _Config2 = _interopRequireDefault(_Config);

var _Index = __webpack_require__("./src/components/Pages/Index.js");

var _Index2 = _interopRequireDefault(_Index);

var _Foo = __webpack_require__("./src/components/Pages/Foo.js");

var _Foo2 = _interopRequireDefault(_Foo);

var _Bar = __webpack_require__("./src/components/Pages/Bar.js");

var _Bar2 = _interopRequireDefault(_Bar);

var _NotFound = __webpack_require__("./src/components/Pages/NotFound.js");

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.document.addEventListener('DOMContentLoaded', function () {

  var sectionConfig = _Config2.default.getSection('InnovationWeek');

  _ReactRouteRegister2.default.add({
    path: '/',
    routes: [{
      path: '/' + sectionConfig.url + '/bar/:parameterOne?/:parameterTwo?',
      component: _Bar2.default
    }, {
      path: '/' + sectionConfig.url + '/foo',
      component: _Foo2.default
    }, {
      path: '/' + sectionConfig.url,
      component: _Index2.default,
      exact: true
    }, {
      path: '/',
      component: _NotFound2.default,
      exact: false
    }]
  });
});

/***/ }),

/***/ "./src/bundles/bundle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("./src/boot/index.js");

/***/ }),

/***/ "./src/components/Pages/Bar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Injector = __webpack_require__(0);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftAndMain = (0, _Injector.loadComponent)('LeftAndMain');

var Page = function Page(_ref) {
  var _ref$match$params = _ref.match.params,
      parameterOne = _ref$match$params.parameterOne,
      parameterTwo = _ref$match$params.parameterTwo;
  return _react2.default.createElement(
    LeftAndMain,
    null,
    'This is a Bar page. parameterOne=',
    parameterOne,
    ' parameterTwo=',
    parameterTwo,
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Injector = __webpack_require__(0);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftAndMain = (0, _Injector.loadComponent)('LeftAndMain');

var Page = function Page() {
  return _react2.default.createElement(
    LeftAndMain,
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

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Injector = __webpack_require__(0);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftAndMain = (0, _Injector.loadComponent)('LeftAndMain');

var Page = function Page() {
  return _react2.default.createElement(
    LeftAndMain,
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

/***/ "./src/components/Pages/NotFound.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Injector = __webpack_require__(0);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftAndMain = (0, _Injector.loadComponent)('LeftAndMain');

var Page = function Page() {
  return _react2.default.createElement(
    LeftAndMain,
    null,
    'Invalid Route 404',
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/admin/innovation' },
      'Back home'
    )
  );
};

exports.default = Page;

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = ReactRouterDom;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = Config;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = ReactRouteRegister;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map