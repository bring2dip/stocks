(self["webpackChunkwebpack_5"] = self["webpackChunkwebpack_5"] || []).push([[143],{

/***/ 5579:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var date_fns_fp_format__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6469);
/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7018);
/* harmony import */ var date_fns_fp_subDays__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6115);
/* harmony import */ var lodash_round__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9854);
/* harmony import */ var lodash_round__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_round__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gridjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5587);
/* harmony import */ var _emotion_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1738);
/* harmony import */ var finnhub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4545);








const API_KEY = "MISSING_ENV_VAR".FINHUB_KEY;
const finhubAuthentication = finnhub__WEBPACK_IMPORTED_MODULE_3__/* .ApiClient.instance.authentications.api_key */ .Sl.instance.authentications.api_key;

function setApiKey(key) {
  finhubAuthentication.apiKey = key;
}

const finnhubClient = new finnhub__WEBPACK_IMPORTED_MODULE_3__/* .DefaultApi */ .M2();

const getById = id => document.getElementById(id);

function bold(text) {
  return (0,gridjs__WEBPACK_IMPORTED_MODULE_1__.h)('b', {}, text);
}

function getData(symbol, startTime, endTime) {
  return new Promise((resolve, reject) => {
    finnhubClient.stockCandles(symbol, "D", startTime, endTime, {}, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

const statsFunctionsMap = {
  min: mathjs__WEBPACK_IMPORTED_MODULE_4__/* .min */ .VV$,
  max: mathjs__WEBPACK_IMPORTED_MODULE_4__/* .max */ .Fp7,
  mean: mathjs__WEBPACK_IMPORTED_MODULE_4__/* .mean */ .J69,
  median: mathjs__WEBPACK_IMPORTED_MODULE_4__/* .median */ .C2o,
  std: mathjs__WEBPACK_IMPORTED_MODULE_4__/* .std */ .qoR
};

const getUnixTime = date => {
  return Math.floor(date.getTime() / 1000);
};

const MAX_NUMS = 40;
const initalData = [['-', '-', '-', '-', '-', '-', '-', '-']];

async function displayTable(stockGrid, symbolInput) {
  const today = new Date();
  const subtractMaxDays = (0,date_fns_fp_subDays__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z)(MAX_NUMS);
  const formatDate = (0,date_fns_fp_format__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)('dd MMM');
  const startDate = subtractMaxDays(today);
  const endDate = today;
  const loadingDiv = getById('stocks-loading-container');
  loadingDiv.innerHTML = 'Loading...';

  try {
    const responseData = await getData(symbolInput.toUpperCase(), getUnixTime(startDate), getUnixTime(endDate));
    responseData.hlDiff = [];
    responseData.coDiff = [];
    loadingDiv.innerHTML = '';
    let data = [];
    const totalDays = responseData.c.length;

    for (let i = 0; i < totalDays; i++) {
      const hlDiff = responseData.h[i] - responseData.l[i];
      const coDiff = responseData.c[i] - responseData.o[i];
      responseData.hlDiff.push(hlDiff);
      responseData.coDiff.push(coDiff);
      data.push([formatDate(new Date(responseData.t[i] * 1000)), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(responseData.o[i], 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(responseData.h[i], 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(responseData.l[i], 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(responseData.c[i], 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(responseData.v[i], 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(hlDiff, 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(coDiff, 2)]);
    }

    data.push(['-', '-', '-', '-', '-', '-', '-', '-']);
    const stats = ['max', 'min', 'mean', 'median', 'std'];
    stats.forEach(statItem => {
      data.push([bold(statItem), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(statsFunctionsMap[statItem](responseData.o), 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(statsFunctionsMap[statItem](responseData.h), 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(statsFunctionsMap[statItem](responseData.l), 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(statsFunctionsMap[statItem](responseData.c), 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(statsFunctionsMap[statItem](responseData.v), 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(statsFunctionsMap[statItem](responseData.hlDiff), 2), lodash_round__WEBPACK_IMPORTED_MODULE_0___default()(statsFunctionsMap[statItem](responseData.coDiff), 2)]);
    });
    stockGrid.updateConfig({
      data
    }).forceRender();
  } catch (e) {
    stockGrid.updateConfig({
      data: initalData
    }).forceRender();
    loadingDiv.innerHTML = 'Loading failed';
  }
}

const styles = {
  container: _emotion_css__WEBPACK_IMPORTED_MODULE_2__/* .css */ .iv`
      * {
        font-family: 'Tahoma';
      }
    `,
  table: _emotion_css__WEBPACK_IMPORTED_MODULE_2__/* .css */ .iv`
      tr:hover td {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `,
  th: _emotion_css__WEBPACK_IMPORTED_MODULE_2__/* .css */ .iv`
      text-align: right;
      &:hover {
        background-color: #999;
        color: #fff;
      }
    `,
  td: _emotion_css__WEBPACK_IMPORTED_MODULE_2__/* .css */ .iv`
      color: #555;
      text-align: right;
      &:hover {
        color: #000;
      }
    `
};
window.addEventListener('load', () => {
  const fetchBtn = getById('stocks-fetch-btn');
  const symbolInput = getById('stocks-symbol');
  const dataContainer = getById('stocks-table-container');
  const apiKeyInput = getById('stocks-api-key');
  const messageContainer = getById('stocks-message-container');
  const stockGrid = new gridjs__WEBPACK_IMPORTED_MODULE_1__/* .Grid */ .rj({
    columns: ['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'HLDiff', 'CODiff'],
    data: initalData,
    className: styles
  });

  const getApiKeyValue = () => {
    const apiKeyValue = apiKeyInput.value || API_KEY;
    return apiKeyValue;
  };

  stockGrid.render(dataContainer);

  if (getApiKeyValue()) {
    displayTable(stockGrid, symbolInput.value);
  }

  fetchBtn.addEventListener('click', () => {
    const {
      value
    } = symbolInput;
    const apiKey = getApiKeyValue();

    if (!apiKey) {
      messageContainer.innerHTML = 'Finnhub API Key required';
      return;
    }

    if (!value) {
      messageContainer.innerHTML = 'Stock symbol is required';
      return;
    }

    messageContainer.innerHTML = '';
    setApiKey(apiKey);
    displayTable(stockGrid, value);
  });
  symbolInput.addEventListener('keydown', e => {
    const {
      value
    } = symbolInput;
    const apiKey = getApiKeyValue();

    if (e.key === 'Enter' || e.keyCode === 13) {
      if (!apiKey) {
        messageContainer.innerHTML = 'Finnhub API Key required';
        return;
      }

      if (!value) {
        messageContainer.innerHTML = 'Stock symbol is required';
        return;
      }

      messageContainer.innerHTML = '';
      setApiKey(apiKey);
      displayTable(stockGrid, value);
    }
  });
});

/***/ }),

/***/ 4922:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 5042:
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [202,940,828,284,788,691,37,668,359,876,251,312,609,186,494,758], () => (__webpack_exec__(5579)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);