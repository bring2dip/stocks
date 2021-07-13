(self["webpackChunkwebpack_5"] = self["webpackChunkwebpack_5"] || []).push([[142],{

/***/ 4147:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/lodash/mean.js
var mean = __webpack_require__(8659);
var mean_default = /*#__PURE__*/__webpack_require__.n(mean);
// EXTERNAL MODULE: ./node_modules/lodash/sum.js
var sum = __webpack_require__(2297);
var sum_default = /*#__PURE__*/__webpack_require__.n(sum);
;// CONCATENATED MODULE: ./src/lib/logger.js
/* harmony default export */ const logger = ({
  // change the argument name to show if it changes the content hash
  // it doesn't change in minified mode
  log: (...abc) => console.log(abc),
  error: e => console.error(e)
});
;// CONCATENATED MODULE: ./src/lib/reports.js
/* harmony default export */ const reports = ({
  data: () => {
    return {
      views: 100,
      clicks: 20,
      bounces: 10
    };
  }
});
;// CONCATENATED MODULE: ./src/css/analytics.module.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const analytics_module = ({"title":"_2iwnhE94O_ImmIo8PvXe1f"});
;// CONCATENATED MODULE: ./src/analytics.js







function displayHello() {
  logger.log('This is an Admin app');
  logger.log('mean', mean_default()([5, 5, 10, 15, 20]));
  logger.log('mean', sum_default()([5, 5, 10, 15, 20]));
  logger.log(reports.data());
  document.body.innerHTML = `
        
        <h1 class=${analytics_module.title}">Analytics</h1>
        <h3 class=${analytics_module.title}">This is analytics.</h3>        
    `;
}

displayHello();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [202,811], () => (__webpack_exec__(4147)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);