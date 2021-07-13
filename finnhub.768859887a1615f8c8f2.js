(self["webpackChunkwebpack_5"] = self["webpackChunkwebpack_5"] || []).push([[828],{

/***/ 313:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _superagent = _interopRequireDefault(__webpack_require__(569));

var _querystring = _interopRequireDefault(__webpack_require__(7673));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* @module ApiClient
* @version 1.2.1
*/

/**
* Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
* application to use this class directly - the *Api and model classes provide the public API for the service. The
* contents of this file should be regarded as internal but are documented for completeness.
* @alias module:ApiClient
* @class
*/
var ApiClient = /*#__PURE__*/function () {
  function ApiClient() {
    _classCallCheck(this, ApiClient);

    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default https://finnhub.io/api/v1
     */
    this.basePath = 'https://finnhub.io/api/v1'.replace(/\/+$/, '');
    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */

    this.authentications = {
      'api_key': {
        type: 'apiKey',
        'in': 'query',
        name: 'token'
      }
    };
    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */

    this.defaultHeaders = {};
    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */

    this.timeout = 60000;
    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */

    this.cache = true;
    /**
     * If set to true, the client will save the cookies from each server
     * response, and return them in the next request.
     * @default false
     */

    this.enableCookies = false;
    /*
     * Used to save and return cookies in a node.js (non-browser) setting,
     * if this.enableCookies is set to true.
     */

    if (typeof window === 'undefined') {
      this.agent = new _superagent["default"].agent();
    }
    /*
     * Allow user to override superagent agent
     */


    this.requestAgent = null;
    /*
     * Allow user to add superagent plugins
     */

    this.plugins = null;
  }
  /**
  * Returns a string representation for an actual parameter.
  * @param param The actual parameter.
  * @returns {String} The string representation of <code>param</code>.
  */


  _createClass(ApiClient, [{
    key: "paramToString",
    value: function paramToString(param) {
      if (param == undefined || param == null) {
        return '';
      }

      if (param instanceof Date) {
        return param.toJSON();
      }

      return param.toString();
    }
    /**
     * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
     * NOTE: query parameters are not handled here.
     * @param {String} path The path to append to the base URL.
     * @param {Object} pathParams The parameter values to append.
     * @param {String} apiBasePath Base path defined in the path, operation level to override the default one
     * @returns {String} The encoded path with parameter values substituted.
     */

  }, {
    key: "buildUrl",
    value: function buildUrl(path, pathParams, apiBasePath) {
      var _this = this;

      if (!path.match(/^\//)) {
        path = '/' + path;
      }

      var url = this.basePath + path; // use API (operation, path) base path if defined

      if (apiBasePath !== null && apiBasePath !== undefined) {
        url = apiBasePath + path;
      }

      url = url.replace(/\{([\w-]+)\}/g, function (fullMatch, key) {
        var value;

        if (pathParams.hasOwnProperty(key)) {
          value = _this.paramToString(pathParams[key]);
        } else {
          value = fullMatch;
        }

        return encodeURIComponent(value);
      });
      return url;
    }
    /**
    * Checks whether the given content type represents JSON.<br>
    * JSON content type examples:<br>
    * <ul>
    * <li>application/json</li>
    * <li>application/json; charset=UTF8</li>
    * <li>APPLICATION/JSON</li>
    * </ul>
    * @param {String} contentType The MIME content type to check.
    * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
    */

  }, {
    key: "isJsonMime",
    value: function isJsonMime(contentType) {
      return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
    }
    /**
    * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
    * @param {Array.<String>} contentTypes
    * @returns {String} The chosen content type, preferring JSON.
    */

  }, {
    key: "jsonPreferredMime",
    value: function jsonPreferredMime(contentTypes) {
      for (var i = 0; i < contentTypes.length; i++) {
        if (this.isJsonMime(contentTypes[i])) {
          return contentTypes[i];
        }
      }

      return contentTypes[0];
    }
    /**
    * Checks whether the given parameter value represents file-like content.
    * @param param The parameter to check.
    * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
    */

  }, {
    key: "isFileParam",
    value: function isFileParam(param) {
      // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
      if (true) {
        var fs;

        try {
          fs = __webpack_require__(4922);
        } catch (err) {}

        if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
          return true;
        }
      } // Buffer in Node.js


      if (typeof Buffer === 'function' && param instanceof Buffer) {
        return true;
      } // Blob in browser


      if (typeof Blob === 'function' && param instanceof Blob) {
        return true;
      } // File in browser (it seems File object is also instance of Blob, but keep this for safe)


      if (typeof File === 'function' && param instanceof File) {
        return true;
      }

      return false;
    }
    /**
    * Normalizes parameter values:
    * <ul>
    * <li>remove nils</li>
    * <li>keep files and arrays</li>
    * <li>format to string with `paramToString` for other cases</li>
    * </ul>
    * @param {Object.<String, Object>} params The parameters as object properties.
    * @returns {Object.<String, Object>} normalized parameters.
    */

  }, {
    key: "normalizeParams",
    value: function normalizeParams(params) {
      var newParams = {};

      for (var key in params) {
        if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
          var value = params[key];

          if (this.isFileParam(value) || Array.isArray(value)) {
            newParams[key] = value;
          } else {
            newParams[key] = this.paramToString(value);
          }
        }
      }

      return newParams;
    }
    /**
    * Builds a string representation of an array-type actual parameter, according to the given collection format.
    * @param {Array} param An array parameter.
    * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
    * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
    * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
    */

  }, {
    key: "buildCollectionParam",
    value: function buildCollectionParam(param, collectionFormat) {
      if (param == null) {
        return null;
      }

      switch (collectionFormat) {
        case 'csv':
          return param.map(this.paramToString).join(',');

        case 'ssv':
          return param.map(this.paramToString).join(' ');

        case 'tsv':
          return param.map(this.paramToString).join('\t');

        case 'pipes':
          return param.map(this.paramToString).join('|');

        case 'multi':
          //return the array directly as SuperAgent will handle it as expected
          return param.map(this.paramToString);

        default:
          throw new Error('Unknown collection format: ' + collectionFormat);
      }
    }
    /**
    * Applies authentication headers to the request.
    * @param {Object} request The request object created by a <code>superagent()</code> call.
    * @param {Array.<String>} authNames An array of authentication method names.
    */

  }, {
    key: "applyAuthToRequest",
    value: function applyAuthToRequest(request, authNames) {
      var _this2 = this;

      authNames.forEach(function (authName) {
        var auth = _this2.authentications[authName];

        switch (auth.type) {
          case 'basic':
            if (auth.username || auth.password) {
              request.auth(auth.username || '', auth.password || '');
            }

            break;

          case 'bearer':
            if (auth.accessToken) {
              request.set({
                'Authorization': 'Bearer ' + auth.accessToken
              });
            }

            break;

          case 'apiKey':
            if (auth.apiKey) {
              var data = {};

              if (auth.apiKeyPrefix) {
                data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
              } else {
                data[auth.name] = auth.apiKey;
              }

              if (auth['in'] === 'header') {
                request.set(data);
              } else {
                request.query(data);
              }
            }

            break;

          case 'oauth2':
            if (auth.accessToken) {
              request.set({
                'Authorization': 'Bearer ' + auth.accessToken
              });
            }

            break;

          default:
            throw new Error('Unknown authentication type: ' + auth.type);
        }
      });
    }
    /**
     * Deserializes an HTTP response body into a value of the specified type.
     * @param {Object} response A SuperAgent response object.
     * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
     * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
     * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
     * all properties on <code>data<code> will be converted to this type.
     * @returns A value of the specified type.
     */

  }, {
    key: "deserialize",
    value: function deserialize(response, returnType) {
      if (response == null || returnType == null || response.status == 204) {
        return null;
      } // Rely on SuperAgent for parsing response body.
      // See http://visionmedia.github.io/superagent/#parsing-response-bodies


      var data = response.body;

      if (data == null || _typeof(data) === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length) {
        // SuperAgent does not always produce a body; use the unparsed response as a fallback
        data = response.text;
      }

      return ApiClient.convertToType(data, returnType);
    }
    /**
     * Callback function to receive the result of the operation.
     * @callback module:ApiClient~callApiCallback
     * @param {String} error Error message, if any.
     * @param data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Invokes the REST service using the supplied settings and parameters.
     * @param {String} path The base URL to invoke.
     * @param {String} httpMethod The HTTP method to use.
     * @param {Object.<String, String>} pathParams A map of path parameters and their values.
     * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
     * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
     * @param {Object.<String, Object>} formParams A map of form parameters and their values.
     * @param {Object} bodyParam The value to pass as the request body.
     * @param {Array.<String>} authNames An array of authentication type names.
     * @param {Array.<String>} contentTypes An array of request MIME types.
     * @param {Array.<String>} accepts An array of acceptable response MIME types.
     * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
     * constructor for a complex type.
     * @param {String} apiBasePath base path defined in the operation/path level to override the default one
     * @param {module:ApiClient~callApiCallback} callback The callback function.
     * @returns {Object} The SuperAgent request object.
     */

  }, {
    key: "callApi",
    value: function callApi(path, httpMethod, pathParams, queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts, returnType, apiBasePath, callback) {
      var _this3 = this;

      var url = this.buildUrl(path, pathParams, apiBasePath);
      var request = (0, _superagent["default"])(httpMethod, url);

      if (this.plugins !== null) {
        for (var index in this.plugins) {
          if (this.plugins.hasOwnProperty(index)) {
            request.use(this.plugins[index]);
          }
        }
      } // apply authentications


      this.applyAuthToRequest(request, authNames); // set query parameters

      if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
        queryParams['_'] = new Date().getTime();
      }

      request.query(this.normalizeParams(queryParams)); // set header parameters

      request.set(this.defaultHeaders).set(this.normalizeParams(headerParams)); // set requestAgent if it is set by user

      if (this.requestAgent) {
        request.agent(this.requestAgent);
      } // set request timeout


      request.timeout(this.timeout);
      var contentType = this.jsonPreferredMime(contentTypes);

      if (contentType) {
        // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
        if (contentType != 'multipart/form-data') {
          request.type(contentType);
        }
      }

      if (contentType === 'application/x-www-form-urlencoded') {
        request.send(_querystring["default"].stringify(this.normalizeParams(formParams)));
      } else if (contentType == 'multipart/form-data') {
        var _formParams = this.normalizeParams(formParams);

        for (var key in _formParams) {
          if (_formParams.hasOwnProperty(key)) {
            if (this.isFileParam(_formParams[key])) {
              // file field
              request.attach(key, _formParams[key]);
            } else {
              request.field(key, _formParams[key]);
            }
          }
        }
      } else if (bodyParam !== null && bodyParam !== undefined) {
        if (!request.header['Content-Type']) {
          request.type('application/json');
        }

        request.send(bodyParam);
      }

      var accept = this.jsonPreferredMime(accepts);

      if (accept) {
        request.accept(accept);
      }

      if (returnType === 'Blob') {
        request.responseType('blob');
      } else if (returnType === 'String') {
        request.responseType('string');
      } // Attach previously saved cookies, if enabled


      if (this.enableCookies) {
        if (typeof window === 'undefined') {
          this.agent._attachCookies(request);
        } else {
          request.withCredentials();
        }
      }

      request.end(function (error, response) {
        if (callback) {
          var data = null;

          if (!error) {
            try {
              data = _this3.deserialize(response, returnType);

              if (_this3.enableCookies && typeof window === 'undefined') {
                _this3.agent._saveCookies(response);
              }
            } catch (err) {
              error = err;
            }
          }

          callback(error, data, response);
        }
      });
      return request;
    }
    /**
    * Parses an ISO-8601 string representation of a date value.
    * @param {String} str The date value as a string.
    * @returns {Date} The parsed date object.
    */

  }, {
    key: "hostSettings",

    /**
      * Gets an array of host settings
      * @returns An array of host settings
      */
    value: function hostSettings() {
      return [{
        'url': "https://finnhub.io/api/v1",
        'description': "No description provided"
      }];
    }
  }, {
    key: "getBasePathFromSettings",
    value: function getBasePathFromSettings(index) {
      var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var servers = this.hostSettings(); // check array index out of bound

      if (index < 0 || index >= servers.length) {
        throw new Error("Invalid index " + index + " when selecting the host settings. Must be less than " + servers.length);
      }

      var server = servers[index];
      var url = server['url']; // go through variable and assign a value

      for (var variable_name in server['variables']) {
        if (variable_name in variables) {
          var variable = server['variables'][variable_name];

          if (!('enum_values' in variable) || variable['enum_values'].includes(variables[variable_name])) {
            url = url.replace("{" + variable_name + "}", variables[variable_name]);
          } else {
            throw new Error("The variable `" + variable_name + "` in the host URL has invalid value " + variables[variable_name] + ". Must be " + server['variables'][variable_name]['enum_values'] + ".");
          }
        } else {
          // use default value
          url = url.replace("{" + variable_name + "}", server['variables'][variable_name]['default_value']);
        }
      }

      return url;
    }
    /**
    * Constructs a new map or array model from REST data.
    * @param data {Object|Array} The REST data.
    * @param obj {Object|Array} The target object or array.
    */

  }], [{
    key: "parseDate",
    value: function parseDate(str) {
      return new Date(str);
    }
    /**
    * Converts a value to the specified type.
    * @param {(String|Object)} data The data to convert, as a string or object.
    * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
    * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
    * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
    * all properties on <code>data<code> will be converted to this type.
    * @returns An instance of the specified type or null or undefined if data is null or undefined.
    */

  }, {
    key: "convertToType",
    value: function convertToType(data, type) {
      if (data === null || data === undefined) return data;

      switch (type) {
        case 'Boolean':
          return Boolean(data);

        case 'Integer':
          return parseInt(data, 10);

        case 'Number':
          return parseFloat(data);

        case 'String':
          return String(data);

        case 'Date':
          return ApiClient.parseDate(String(data));

        case 'Blob':
          return data;

        default:
          if (type === Object) {
            // generic object, return directly
            return data;
          } else if (typeof type.constructFromObject === 'function') {
            // for model type like User and enum class
            return type.constructFromObject(data);
          } else if (Array.isArray(type)) {
            // for array type like: ['String']
            var itemType = type[0];
            return data.map(function (item) {
              return ApiClient.convertToType(item, itemType);
            });
          } else if (_typeof(type) === 'object') {
            // for plain object type like: {'String': 'Integer'}
            var keyType, valueType;

            for (var k in type) {
              if (type.hasOwnProperty(k)) {
                keyType = k;
                valueType = type[k];
                break;
              }
            }

            var result = {};

            for (var k in data) {
              if (data.hasOwnProperty(k)) {
                var key = ApiClient.convertToType(k, keyType);
                var value = ApiClient.convertToType(data[k], valueType);
                result[key] = value;
              }
            }

            return result;
          } else {
            // for unknown type, return the data directly
            return data;
          }

      }
    }
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj, itemType) {
      if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          if (data.hasOwnProperty(i)) obj[i] = ApiClient.convertToType(data[i], itemType);
        }
      } else {
        for (var k in data) {
          if (data.hasOwnProperty(k)) obj[k] = ApiClient.convertToType(data[k], itemType);
        }
      }
    }
  }]);

  return ApiClient;
}();
/**
 * Enumeration of collection format separator strategies.
 * @enum {String}
 * @readonly
 */


ApiClient.CollectionFormatEnum = {
  /**
   * Comma-separated values. Value: <code>csv</code>
   * @const
   */
  CSV: ',',

  /**
   * Space-separated values. Value: <code>ssv</code>
   * @const
   */
  SSV: ' ',

  /**
   * Tab-separated values. Value: <code>tsv</code>
   * @const
   */
  TSV: '\t',

  /**
   * Pipe(|)-separated values. Value: <code>pipes</code>
   * @const
   */
  PIPES: '|',

  /**
   * Native array. Value: <code>multi</code>
   * @const
   */
  MULTI: 'multi'
};
/**
* The default API client implementation.
* @type {module:ApiClient}
*/

ApiClient.instance = new ApiClient();
var _default = ApiClient;
exports.default = _default;

/***/ }),

/***/ 8133:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

var _AggregateIndicators = _interopRequireDefault(__webpack_require__(7433));

var _BasicFinancials = _interopRequireDefault(__webpack_require__(9603));

var _CompanyExecutive = _interopRequireDefault(__webpack_require__(9348));

var _CompanyProfile = _interopRequireDefault(__webpack_require__(6953));

var _CompanyProfile2 = _interopRequireDefault(__webpack_require__(2153));

var _CountryMetadata = _interopRequireDefault(__webpack_require__(8650));

var _CovidInfo = _interopRequireDefault(__webpack_require__(4272));

var _CryptoCandles = _interopRequireDefault(__webpack_require__(750));

var _CryptoSymbol = _interopRequireDefault(__webpack_require__(9368));

var _Dividends = _interopRequireDefault(__webpack_require__(7269));

var _ETFsCountryExposure = _interopRequireDefault(__webpack_require__(5345));

var _ETFsHoldings = _interopRequireDefault(__webpack_require__(8030));

var _ETFsIndustryExposure = _interopRequireDefault(__webpack_require__(9483));

var _ETFsProfile = _interopRequireDefault(__webpack_require__(5028));

var _EarningResult = _interopRequireDefault(__webpack_require__(8711));

var _EarningsCalendar = _interopRequireDefault(__webpack_require__(3124));

var _EarningsCallTranscripts = _interopRequireDefault(__webpack_require__(3235));

var _EarningsCallTranscriptsList = _interopRequireDefault(__webpack_require__(927));

var _EarningsEstimates = _interopRequireDefault(__webpack_require__(5796));

var _EconomicCode = _interopRequireDefault(__webpack_require__(1787));

var _EconomicData = _interopRequireDefault(__webpack_require__(2296));

var _Filing = _interopRequireDefault(__webpack_require__(7871));

var _FinancialStatements = _interopRequireDefault(__webpack_require__(2542));

var _FinancialsAsReported = _interopRequireDefault(__webpack_require__(6599));

var _ForexCandles = _interopRequireDefault(__webpack_require__(3939));

var _ForexSymbol = _interopRequireDefault(__webpack_require__(403));

var _Forexrates = _interopRequireDefault(__webpack_require__(3926));

var _FundOwnership = _interopRequireDefault(__webpack_require__(4890));

var _IPOCalendar = _interopRequireDefault(__webpack_require__(4854));

var _IndicesConstituents = _interopRequireDefault(__webpack_require__(3219));

var _IndicesHistoricalConstituents = _interopRequireDefault(__webpack_require__(2464));

var _InvestorsOwnership = _interopRequireDefault(__webpack_require__(2282));

var _LastBidAsk = _interopRequireDefault(__webpack_require__(5588));

var _MajorDevelopments = _interopRequireDefault(__webpack_require__(3454));

var _News = _interopRequireDefault(__webpack_require__(8425));

var _NewsSentiment = _interopRequireDefault(__webpack_require__(2731));

var _PatternRecognition = _interopRequireDefault(__webpack_require__(8051));

var _PriceTarget = _interopRequireDefault(__webpack_require__(5875));

var _Quote = _interopRequireDefault(__webpack_require__(5089));

var _RecommendationTrend = _interopRequireDefault(__webpack_require__(9495));

var _RevenueEstimates = _interopRequireDefault(__webpack_require__(22));

var _SimilarityIndex = _interopRequireDefault(__webpack_require__(498));

var _Split = _interopRequireDefault(__webpack_require__(2156));

var _Stock = _interopRequireDefault(__webpack_require__(1853));

var _StockCandles = _interopRequireDefault(__webpack_require__(6224));

var _SupportResistance = _interopRequireDefault(__webpack_require__(9125));

var _TickData = _interopRequireDefault(__webpack_require__(7110));

var _UpgradeDowngrade = _interopRequireDefault(__webpack_require__(8610));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Default service.
* @module api/DefaultApi
* @version 1.2.1
*/
var DefaultApi = /*#__PURE__*/function () {
  /**
  * Constructs a new DefaultApi. 
  * @alias module:api/DefaultApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function DefaultApi(apiClient) {
    _classCallCheck(this, DefaultApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Callback function to receive the result of the aggregateIndicator operation.
   * @callback module:api/DefaultApi~aggregateIndicatorCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AggregateIndicators} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Aggregate Indicators
   * Get aggregate signal of multiple technical indicators such as MACD, RSI, Moving Average v.v.
   * @param {String} symbol symbol
   * @param {String} resolution Supported resolution includes <code>1, 5, 15, 30, 60, D, W, M </code>.Some timeframes might not be available depending on the exchange.
   * @param {module:api/DefaultApi~aggregateIndicatorCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AggregateIndicators}
   */


  _createClass(DefaultApi, [{
    key: "aggregateIndicator",
    value: function aggregateIndicator(symbol, resolution, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling aggregateIndicator");
      } // verify the required parameter 'resolution' is set


      if (resolution === undefined || resolution === null) {
        throw new Error("Missing the required parameter 'resolution' when calling aggregateIndicator");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'resolution': resolution
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _AggregateIndicators["default"];
      return this.apiClient.callApi('/scan/technical-indicator', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the companyBasicFinancials operation.
     * @callback module:api/DefaultApi~companyBasicFinancialsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BasicFinancials} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Basic Financials
     * Get company basic financials such as margin, P/E ratio, 52-week high/low etc.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {String} metric Metric type. Can be 1 of the following values <code>all, price, valuation, margin</code>
     * @param {module:api/DefaultApi~companyBasicFinancialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BasicFinancials}
     */

  }, {
    key: "companyBasicFinancials",
    value: function companyBasicFinancials(symbol, metric, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling companyBasicFinancials");
      } // verify the required parameter 'metric' is set


      if (metric === undefined || metric === null) {
        throw new Error("Missing the required parameter 'metric' when calling companyBasicFinancials");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'metric': metric
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _BasicFinancials["default"];
      return this.apiClient.callApi('/stock/metric', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the companyEarnings operation.
     * @callback module:api/DefaultApi~companyEarningsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/EarningResult>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Earnings Surprises
     * Get company historical quarterly earnings surprise going back to 2000.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Limit number of period returned. Leave blank to get the full history.
     * @param {module:api/DefaultApi~companyEarningsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/EarningResult>}
     */

  }, {
    key: "companyEarnings",
    value: function companyEarnings(symbol, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling companyEarnings");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'limit': opts['limit']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_EarningResult["default"]];
      return this.apiClient.callApi('/stock/earnings', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the companyEpsEstimates operation.
     * @callback module:api/DefaultApi~companyEpsEstimatesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EarningsEstimates} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Earnings Estimates
     * Get company's EPS estimates.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {Object} opts Optional parameters
     * @param {String} opts.freq Can take 1 of the following values: <code>annual, quarterly</code>. Default to <code>quarterly</code>
     * @param {module:api/DefaultApi~companyEpsEstimatesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EarningsEstimates}
     */

  }, {
    key: "companyEpsEstimates",
    value: function companyEpsEstimates(symbol, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling companyEpsEstimates");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'freq': opts['freq']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _EarningsEstimates["default"];
      return this.apiClient.callApi('/stock/eps-estimate', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the companyExecutive operation.
     * @callback module:api/DefaultApi~companyExecutiveCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CompanyExecutive} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Company Executive
     * Get a list of company's executives and members of the Board.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {module:api/DefaultApi~companyExecutiveCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CompanyExecutive}
     */

  }, {
    key: "companyExecutive",
    value: function companyExecutive(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling companyExecutive");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _CompanyExecutive["default"];
      return this.apiClient.callApi('/stock/executive', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the companyNews operation.
     * @callback module:api/DefaultApi~companyNewsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/News>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Company News
     * List latest company news by symbol. This endpoint is only available for North American companies.
     * @param {String} symbol Company symbol.
     * @param {Date} from From date <code>YYYY-MM-DD</code>.
     * @param {Date} to To date <code>YYYY-MM-DD</code>.
     * @param {module:api/DefaultApi~companyNewsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/News>}
     */

  }, {
    key: "companyNews",
    value: function companyNews(symbol, from, to, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling companyNews");
      } // verify the required parameter 'from' is set


      if (from === undefined || from === null) {
        throw new Error("Missing the required parameter 'from' when calling companyNews");
      } // verify the required parameter 'to' is set


      if (to === undefined || to === null) {
        throw new Error("Missing the required parameter 'to' when calling companyNews");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'from': from,
        'to': to
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_News["default"]];
      return this.apiClient.callApi('/company-news', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the companyPeers operation.
     * @callback module:api/DefaultApi~companyPeersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<String>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Peers
     * Get company peers. Return a list of peers in the same country and GICS sub-industry
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {module:api/DefaultApi~companyPeersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<String>}
     */

  }, {
    key: "companyPeers",
    value: function companyPeers(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling companyPeers");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = ['String'];
      return this.apiClient.callApi('/stock/peers', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the companyProfile operation.
     * @callback module:api/DefaultApi~companyProfileCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CompanyProfile} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Company Profile
     * Get general information of a company. You can query by symbol, ISIN or CUSIP
     * @param {Object} opts Optional parameters
     * @param {String} opts.symbol Symbol of the company: AAPL e.g.
     * @param {String} opts.isin ISIN
     * @param {String} opts.cusip CUSIP
     * @param {module:api/DefaultApi~companyProfileCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CompanyProfile}
     */

  }, {
    key: "companyProfile",
    value: function companyProfile(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'symbol': opts['symbol'],
        'isin': opts['isin'],
        'cusip': opts['cusip']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _CompanyProfile["default"];
      return this.apiClient.callApi('/stock/profile', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the companyProfile2 operation.
     * @callback module:api/DefaultApi~companyProfile2Callback
     * @param {String} error Error message, if any.
     * @param {module:model/CompanyProfile2} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Company Profile 2
     * Get general information of a company. You can query by symbol, ISIN or CUSIP. This is the free version of <a href=\"#company-profile\">Company Profile</a>.
     * @param {Object} opts Optional parameters
     * @param {String} opts.symbol Symbol of the company: AAPL e.g.
     * @param {String} opts.isin ISIN
     * @param {String} opts.cusip CUSIP
     * @param {module:api/DefaultApi~companyProfile2Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CompanyProfile2}
     */

  }, {
    key: "companyProfile2",
    value: function companyProfile2(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'symbol': opts['symbol'],
        'isin': opts['isin'],
        'cusip': opts['cusip']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _CompanyProfile2["default"];
      return this.apiClient.callApi('/stock/profile2', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the companyRevenueEstimates operation.
     * @callback module:api/DefaultApi~companyRevenueEstimatesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/RevenueEstimates} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Revenue Estimates
     * Get company's revenue estimates.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {Object} opts Optional parameters
     * @param {String} opts.freq Can take 1 of the following values: <code>annual, quarterly</code>. Default to <code>quarterly</code>
     * @param {module:api/DefaultApi~companyRevenueEstimatesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/RevenueEstimates}
     */

  }, {
    key: "companyRevenueEstimates",
    value: function companyRevenueEstimates(symbol, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling companyRevenueEstimates");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'freq': opts['freq']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _RevenueEstimates["default"];
      return this.apiClient.callApi('/stock/revenue-estimate', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the country operation.
     * @callback module:api/DefaultApi~countryCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CountryMetadata>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Country Metadata
     * List all countries and metadata.
     * @param {module:api/DefaultApi~countryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CountryMetadata>}
     */

  }, {
    key: "country",
    value: function country(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_CountryMetadata["default"]];
      return this.apiClient.callApi('/country', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the covid19 operation.
     * @callback module:api/DefaultApi~covid19Callback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CovidInfo>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * COVID-19
     * Get real-time updates on the number of COVID-19 (Corona virus) cases in the US with a state-by-state breakdown. Data is sourced from CDC and reputable sources. You can also access this API <a href=\"https://rapidapi.com/Finnhub/api/finnhub-real-time-covid-19\" target=\"_blank\" rel=\"nofollow\">here</a>
     * @param {module:api/DefaultApi~covid19Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CovidInfo>}
     */

  }, {
    key: "covid19",
    value: function covid19(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_CovidInfo["default"]];
      return this.apiClient.callApi('/covid19/us', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the cryptoCandles operation.
     * @callback module:api/DefaultApi~cryptoCandlesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CryptoCandles} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Crypto Candles
     * Get candlestick data for crypto symbols.
     * @param {String} symbol Use symbol returned in <code>/crypto/symbol</code> endpoint for this field.
     * @param {String} resolution Supported resolution includes <code>1, 5, 15, 30, 60, D, W, M </code>.Some timeframes might not be available depending on the exchange.
     * @param {Number} from UNIX timestamp. Interval initial value.
     * @param {Number} to UNIX timestamp. Interval end value.
     * @param {module:api/DefaultApi~cryptoCandlesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CryptoCandles}
     */

  }, {
    key: "cryptoCandles",
    value: function cryptoCandles(symbol, resolution, from, to, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling cryptoCandles");
      } // verify the required parameter 'resolution' is set


      if (resolution === undefined || resolution === null) {
        throw new Error("Missing the required parameter 'resolution' when calling cryptoCandles");
      } // verify the required parameter 'from' is set


      if (from === undefined || from === null) {
        throw new Error("Missing the required parameter 'from' when calling cryptoCandles");
      } // verify the required parameter 'to' is set


      if (to === undefined || to === null) {
        throw new Error("Missing the required parameter 'to' when calling cryptoCandles");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'resolution': resolution,
        'from': from,
        'to': to
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _CryptoCandles["default"];
      return this.apiClient.callApi('/crypto/candle', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the cryptoExchanges operation.
     * @callback module:api/DefaultApi~cryptoExchangesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<String>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Crypto Exchanges
     * List supported crypto exchanges
     * @param {module:api/DefaultApi~cryptoExchangesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<String>}
     */

  }, {
    key: "cryptoExchanges",
    value: function cryptoExchanges(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = ['String'];
      return this.apiClient.callApi('/crypto/exchange', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the cryptoSymbols operation.
     * @callback module:api/DefaultApi~cryptoSymbolsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CryptoSymbol>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Crypto Symbol
     * List supported crypto symbols by exchange
     * @param {String} exchange Exchange you want to get the list of symbols from.
     * @param {module:api/DefaultApi~cryptoSymbolsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/CryptoSymbol>}
     */

  }, {
    key: "cryptoSymbols",
    value: function cryptoSymbols(exchange, callback) {
      var postBody = null; // verify the required parameter 'exchange' is set

      if (exchange === undefined || exchange === null) {
        throw new Error("Missing the required parameter 'exchange' when calling cryptoSymbols");
      }

      var pathParams = {};
      var queryParams = {
        'exchange': exchange
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_CryptoSymbol["default"]];
      return this.apiClient.callApi('/crypto/symbol', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the earningsCalendar operation.
     * @callback module:api/DefaultApi~earningsCalendarCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EarningsCalendar} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Earnings Calendar
     * Get historical and coming earnings release dating back to 2003. You can setup <a href=\"#webhook\">webhook</a> to receive real-time earnings update.
     * @param {Object} opts Optional parameters
     * @param {Date} opts.from From date: 2020-03-15.
     * @param {Date} opts.to To date: 2020-03-16.
     * @param {String} opts.symbol Filter by symbol: AAPL.
     * @param {Boolean} opts.international Set to <code>true</code> to include international markets. Default value is <code>false</code>
     * @param {module:api/DefaultApi~earningsCalendarCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EarningsCalendar}
     */

  }, {
    key: "earningsCalendar",
    value: function earningsCalendar(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'from': opts['from'],
        'to': opts['to'],
        'symbol': opts['symbol'],
        'international': opts['international']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _EarningsCalendar["default"];
      return this.apiClient.callApi('/calendar/earnings', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the economicCode operation.
     * @callback module:api/DefaultApi~economicCodeCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/EconomicCode>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Economic Code
     * List codes of supported economic data.
     * @param {module:api/DefaultApi~economicCodeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/EconomicCode>}
     */

  }, {
    key: "economicCode",
    value: function economicCode(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_EconomicCode["default"]];
      return this.apiClient.callApi('/economic/code', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the economicData operation.
     * @callback module:api/DefaultApi~economicDataCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EconomicData} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Economic Data
     * Get economic data.
     * @param {String} code Economic code.
     * @param {module:api/DefaultApi~economicDataCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EconomicData}
     */

  }, {
    key: "economicData",
    value: function economicData(code, callback) {
      var postBody = null; // verify the required parameter 'code' is set

      if (code === undefined || code === null) {
        throw new Error("Missing the required parameter 'code' when calling economicData");
      }

      var pathParams = {};
      var queryParams = {
        'code': code
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _EconomicData["default"];
      return this.apiClient.callApi('/economic', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the etfsCountryExposure operation.
     * @callback module:api/DefaultApi~etfsCountryExposureCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ETFsCountryExposure} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * ETFs Country Exposure
     * Get ETF country exposure data.
     * @param {String} symbol ETF symbol.
     * @param {module:api/DefaultApi~etfsCountryExposureCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ETFsCountryExposure}
     */

  }, {
    key: "etfsCountryExposure",
    value: function etfsCountryExposure(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling etfsCountryExposure");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ETFsCountryExposure["default"];
      return this.apiClient.callApi('/etf/country', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the etfsHoldings operation.
     * @callback module:api/DefaultApi~etfsHoldingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ETFsHoldings} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * ETFs Holdings
     * Get current ETF holdings.
     * @param {String} symbol ETF symbol.
     * @param {module:api/DefaultApi~etfsHoldingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ETFsHoldings}
     */

  }, {
    key: "etfsHoldings",
    value: function etfsHoldings(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling etfsHoldings");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ETFsHoldings["default"];
      return this.apiClient.callApi('/etf/holdings', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the etfsIndustryExposure operation.
     * @callback module:api/DefaultApi~etfsIndustryExposureCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ETFsIndustryExposure} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * ETFs Industry Exposure
     * Get ETF industry exposure data.
     * @param {String} symbol ETF symbol.
     * @param {module:api/DefaultApi~etfsIndustryExposureCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ETFsIndustryExposure}
     */

  }, {
    key: "etfsIndustryExposure",
    value: function etfsIndustryExposure(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling etfsIndustryExposure");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ETFsIndustryExposure["default"];
      return this.apiClient.callApi('/etf/sector', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the etfsProfile operation.
     * @callback module:api/DefaultApi~etfsProfileCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ETFsProfile} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * ETFs Profile
     * Get ETF profile information. Currently support all US ETFs.
     * @param {String} symbol ETF symbol.
     * @param {module:api/DefaultApi~etfsProfileCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ETFsProfile}
     */

  }, {
    key: "etfsProfile",
    value: function etfsProfile(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling etfsProfile");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ETFsProfile["default"];
      return this.apiClient.callApi('/etf/profile', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the filings operation.
     * @callback module:api/DefaultApi~filingsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Filing>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Filings
     * List company's filing. Limit to 250 documents at a time. This data is available for bulk download on <a href=\"https://www.kaggle.com/finnhub/sec-filings\" target=\"_blank\">Kaggle SEC Filings database</a>.
     * @param {Object} opts Optional parameters
     * @param {String} opts.symbol Symbol. Leave <code>symbol</code>,<code>cik</code> and <code>accessNumber</code> empty to list latest filings.
     * @param {String} opts.cik CIK.
     * @param {String} opts.accessNumber Access number of a specific report you want to retrieve data from.
     * @param {String} opts.form Filter by form. You can use this value <code>NT 10-K</code> to find non-timely filings for a company.
     * @param {Date} opts.from From date: 2020-03-15.
     * @param {Date} opts.to To date: 2020-03-16.
     * @param {module:api/DefaultApi~filingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Filing>}
     */

  }, {
    key: "filings",
    value: function filings(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'symbol': opts['symbol'],
        'cik': opts['cik'],
        'accessNumber': opts['accessNumber'],
        'form': opts['form'],
        'from': opts['from'],
        'to': opts['to']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Filing["default"]];
      return this.apiClient.callApi('/stock/filings', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the financials operation.
     * @callback module:api/DefaultApi~financialsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FinancialStatements} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Financial Statements
     * Get standardized balance sheet, income statement and cash flow for global companies going back 30+ years.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {String} statement Statement can take 1 of these values <code>bs, ic, cf</code> for Balance Sheet, Income Statement, Cash Flow respectively.
     * @param {String} freq Frequency can take 1 of these values <code>annual, quarterly, ttm, ytd</code>.  TTM (Trailing Twelve Months) option is available for Income Statement and Cash Flow. YTD (Year To Date) option is only available for Cash Flow.
     * @param {module:api/DefaultApi~financialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FinancialStatements}
     */

  }, {
    key: "financials",
    value: function financials(symbol, statement, freq, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling financials");
      } // verify the required parameter 'statement' is set


      if (statement === undefined || statement === null) {
        throw new Error("Missing the required parameter 'statement' when calling financials");
      } // verify the required parameter 'freq' is set


      if (freq === undefined || freq === null) {
        throw new Error("Missing the required parameter 'freq' when calling financials");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'statement': statement,
        'freq': freq
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _FinancialStatements["default"];
      return this.apiClient.callApi('/stock/financials', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the financialsReported operation.
     * @callback module:api/DefaultApi~financialsReportedCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FinancialsAsReported} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Financials As Reported
     * Get financials as reported. This data is available for bulk download on <a href=\"https://www.kaggle.com/finnhub/reported-financials\" target=\"_blank\">Kaggle SEC Financials database</a>.
     * @param {Object} opts Optional parameters
     * @param {String} opts.symbol Symbol.
     * @param {String} opts.cik CIK.
     * @param {String} opts.accessNumber Access number of a specific report you want to retrieve financials from.
     * @param {String} opts.freq Frequency. Can be either <code>annual</code> or <code>quarterly</code>. Default to <code>annual</code>.
     * @param {module:api/DefaultApi~financialsReportedCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FinancialsAsReported}
     */

  }, {
    key: "financialsReported",
    value: function financialsReported(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'symbol': opts['symbol'],
        'cik': opts['cik'],
        'accessNumber': opts['accessNumber'],
        'freq': opts['freq']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _FinancialsAsReported["default"];
      return this.apiClient.callApi('/stock/financials-reported', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the forexCandles operation.
     * @callback module:api/DefaultApi~forexCandlesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ForexCandles} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Forex Candles
     * Get candlestick data for forex symbols.
     * @param {String} symbol Use symbol returned in <code>/forex/symbol</code> endpoint for this field.
     * @param {String} resolution Supported resolution includes <code>1, 5, 15, 30, 60, D, W, M </code>.Some timeframes might not be available depending on the exchange.
     * @param {Number} from UNIX timestamp. Interval initial value.
     * @param {Number} to UNIX timestamp. Interval end value.
     * @param {module:api/DefaultApi~forexCandlesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ForexCandles}
     */

  }, {
    key: "forexCandles",
    value: function forexCandles(symbol, resolution, from, to, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling forexCandles");
      } // verify the required parameter 'resolution' is set


      if (resolution === undefined || resolution === null) {
        throw new Error("Missing the required parameter 'resolution' when calling forexCandles");
      } // verify the required parameter 'from' is set


      if (from === undefined || from === null) {
        throw new Error("Missing the required parameter 'from' when calling forexCandles");
      } // verify the required parameter 'to' is set


      if (to === undefined || to === null) {
        throw new Error("Missing the required parameter 'to' when calling forexCandles");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'resolution': resolution,
        'from': from,
        'to': to
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ForexCandles["default"];
      return this.apiClient.callApi('/forex/candle', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the forexExchanges operation.
     * @callback module:api/DefaultApi~forexExchangesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<String>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Forex Exchanges
     * List supported forex exchanges
     * @param {module:api/DefaultApi~forexExchangesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<String>}
     */

  }, {
    key: "forexExchanges",
    value: function forexExchanges(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = ['String'];
      return this.apiClient.callApi('/forex/exchange', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the forexRates operation.
     * @callback module:api/DefaultApi~forexRatesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Forexrates} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Forex rates
     * Get rates for all forex pairs. Ideal for currency conversion
     * @param {Object} opts Optional parameters
     * @param {String} opts.base Base currency. Default to EUR.
     * @param {module:api/DefaultApi~forexRatesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Forexrates}
     */

  }, {
    key: "forexRates",
    value: function forexRates(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'base': opts['base']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Forexrates["default"];
      return this.apiClient.callApi('/forex/rates', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the forexSymbols operation.
     * @callback module:api/DefaultApi~forexSymbolsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ForexSymbol>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Forex Symbol
     * List supported forex symbols.
     * @param {String} exchange Exchange you want to get the list of symbols from.
     * @param {module:api/DefaultApi~forexSymbolsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ForexSymbol>}
     */

  }, {
    key: "forexSymbols",
    value: function forexSymbols(exchange, callback) {
      var postBody = null; // verify the required parameter 'exchange' is set

      if (exchange === undefined || exchange === null) {
        throw new Error("Missing the required parameter 'exchange' when calling forexSymbols");
      }

      var pathParams = {};
      var queryParams = {
        'exchange': exchange
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_ForexSymbol["default"]];
      return this.apiClient.callApi('/forex/symbol', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the fundOwnership operation.
     * @callback module:api/DefaultApi~fundOwnershipCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FundOwnership} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Fund Ownership
     * Get a full list fund and institutional investors of a company in descending order of the number of shares held.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Limit number of results. Leave empty to get the full list.
     * @param {module:api/DefaultApi~fundOwnershipCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FundOwnership}
     */

  }, {
    key: "fundOwnership",
    value: function fundOwnership(symbol, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling fundOwnership");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'limit': opts['limit']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _FundOwnership["default"];
      return this.apiClient.callApi('/stock/fund-ownership', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the generalNews operation.
     * @callback module:api/DefaultApi~generalNewsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/News>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * General News
     * Get latest market news.
     * @param {String} category This parameter can be 1 of the following values <code>general, forex, crypto, merger</code>.
     * @param {Object} opts Optional parameters
     * @param {String} opts.minId Use this field to get only news after this ID. Default to 0
     * @param {module:api/DefaultApi~generalNewsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/News>}
     */

  }, {
    key: "generalNews",
    value: function generalNews(category, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'category' is set

      if (category === undefined || category === null) {
        throw new Error("Missing the required parameter 'category' when calling generalNews");
      }

      var pathParams = {};
      var queryParams = {
        'category': category,
        'minId': opts['minId']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_News["default"]];
      return this.apiClient.callApi('/news', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the indicesConstituents operation.
     * @callback module:api/DefaultApi~indicesConstituentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/IndicesConstituents} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Indices Constituents
     * Get a list of index's constituents. Currently support <code>^GSPC (S&P 500)</code>, <code>^NDX (Nasdaq 100)</code>, <code>^DJI (Dow Jones)</code>
     * @param {String} symbol symbol
     * @param {module:api/DefaultApi~indicesConstituentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/IndicesConstituents}
     */

  }, {
    key: "indicesConstituents",
    value: function indicesConstituents(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling indicesConstituents");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _IndicesConstituents["default"];
      return this.apiClient.callApi('/index/constituents', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the indicesHistoricalConstituents operation.
     * @callback module:api/DefaultApi~indicesHistoricalConstituentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/IndicesHistoricalConstituents} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Indices Historical Constituents
     * Get full history of index's constituents including symbols and dates of joining and leaving the Index. Currently support <code>^GSPC (S&P 500)</code>, <code>^NDX (Nasdaq 100)</code>, <code>^DJI (Dow Jones)</code>
     * @param {String} symbol symbol
     * @param {module:api/DefaultApi~indicesHistoricalConstituentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/IndicesHistoricalConstituents}
     */

  }, {
    key: "indicesHistoricalConstituents",
    value: function indicesHistoricalConstituents(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling indicesHistoricalConstituents");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _IndicesHistoricalConstituents["default"];
      return this.apiClient.callApi('/index/historical-constituents', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the investorsOwnership operation.
     * @callback module:api/DefaultApi~investorsOwnershipCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InvestorsOwnership} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Investors Ownership
     * Get a full list of shareholders/investors of a company in descending order of the number of shares held.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Limit number of results. Leave empty to get the full list.
     * @param {module:api/DefaultApi~investorsOwnershipCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InvestorsOwnership}
     */

  }, {
    key: "investorsOwnership",
    value: function investorsOwnership(symbol, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling investorsOwnership");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'limit': opts['limit']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _InvestorsOwnership["default"];
      return this.apiClient.callApi('/stock/investor-ownership', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the ipoCalendar operation.
     * @callback module:api/DefaultApi~ipoCalendarCallback
     * @param {String} error Error message, if any.
     * @param {module:model/IPOCalendar} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * IPO Calendar
     * Get recent and coming IPO.
     * @param {Date} from From date: 2020-03-15.
     * @param {Date} to To date: 2020-03-16.
     * @param {module:api/DefaultApi~ipoCalendarCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/IPOCalendar}
     */

  }, {
    key: "ipoCalendar",
    value: function ipoCalendar(from, to, callback) {
      var postBody = null; // verify the required parameter 'from' is set

      if (from === undefined || from === null) {
        throw new Error("Missing the required parameter 'from' when calling ipoCalendar");
      } // verify the required parameter 'to' is set


      if (to === undefined || to === null) {
        throw new Error("Missing the required parameter 'to' when calling ipoCalendar");
      }

      var pathParams = {};
      var queryParams = {
        'from': from,
        'to': to
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _IPOCalendar["default"];
      return this.apiClient.callApi('/calendar/ipo', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the majorDevelopments operation.
     * @callback module:api/DefaultApi~majorDevelopmentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MajorDevelopments} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Major Developments
     * List latest major developments of a company going back 20 years with 12M+ data points. This data can be used to highlight the most significant events.
     * @param {String} symbol Company symbol.
     * @param {Object} opts Optional parameters
     * @param {Date} opts.from From time: 2020-01-01.
     * @param {Date} opts.to To time: 2020-01-05.
     * @param {module:api/DefaultApi~majorDevelopmentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MajorDevelopments}
     */

  }, {
    key: "majorDevelopments",
    value: function majorDevelopments(symbol, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling majorDevelopments");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'from': opts['from'],
        'to': opts['to']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _MajorDevelopments["default"];
      return this.apiClient.callApi('/major-development', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the newsSentiment operation.
     * @callback module:api/DefaultApi~newsSentimentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NewsSentiment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * News Sentiment
     * Get company's news sentiment and statistics. This endpoint is only available for US companies.
     * @param {String} symbol Company symbol.
     * @param {module:api/DefaultApi~newsSentimentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NewsSentiment}
     */

  }, {
    key: "newsSentiment",
    value: function newsSentiment(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling newsSentiment");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _NewsSentiment["default"];
      return this.apiClient.callApi('/news-sentiment', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the patternRecognition operation.
     * @callback module:api/DefaultApi~patternRecognitionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PatternRecognition} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Pattern Recognition
     * Run pattern recognition algorithm on a symbol. Support double top/bottom, triple top/bottom, head and shoulders, triangle, wedge, channel, flag, and candlestick patterns.
     * @param {String} symbol Symbol
     * @param {String} resolution Supported resolution includes <code>1, 5, 15, 30, 60, D, W, M </code>.Some timeframes might not be available depending on the exchange.
     * @param {module:api/DefaultApi~patternRecognitionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PatternRecognition}
     */

  }, {
    key: "patternRecognition",
    value: function patternRecognition(symbol, resolution, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling patternRecognition");
      } // verify the required parameter 'resolution' is set


      if (resolution === undefined || resolution === null) {
        throw new Error("Missing the required parameter 'resolution' when calling patternRecognition");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'resolution': resolution
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _PatternRecognition["default"];
      return this.apiClient.callApi('/scan/pattern', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the priceTarget operation.
     * @callback module:api/DefaultApi~priceTargetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PriceTarget} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Price Target
     * Get latest price target consensus.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {module:api/DefaultApi~priceTargetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PriceTarget}
     */

  }, {
    key: "priceTarget",
    value: function priceTarget(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling priceTarget");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _PriceTarget["default"];
      return this.apiClient.callApi('/stock/price-target', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the quote operation.
     * @callback module:api/DefaultApi~quoteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Quote} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Quote
     * <p>Get real-time quote data for US stocks. Constant polling is not recommended. Use websocket if you need real-time update.</p><p>Real-time stock prices for international markets are supported for Enterprise clients via our partner's feed. <a href=\"mailto:support@finnhub.io\">Contact Us</a> to learn more.</p>
     * @param {String} symbol Symbol
     * @param {module:api/DefaultApi~quoteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Quote}
     */

  }, {
    key: "quote",
    value: function quote(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling quote");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Quote["default"];
      return this.apiClient.callApi('/quote', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the recommendationTrends operation.
     * @callback module:api/DefaultApi~recommendationTrendsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/RecommendationTrend>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Recommendation Trends
     * Get latest analyst recommendation trends for a company.
     * @param {String} symbol Symbol of the company: AAPL.
     * @param {module:api/DefaultApi~recommendationTrendsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/RecommendationTrend>}
     */

  }, {
    key: "recommendationTrends",
    value: function recommendationTrends(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling recommendationTrends");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_RecommendationTrend["default"]];
      return this.apiClient.callApi('/stock/recommendation', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the similarityIndex operation.
     * @callback module:api/DefaultApi~similarityIndexCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SimilarityIndex} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Similarity Index
     * <p>Calculate the textual difference between a company's 10-K / 10-Q reports and the same type of report in the previous year using Cosine Similarity. For example, this endpoint compares 2019's 10-K with 2018's 10-K. Companies breaking from its routines in disclosure of financial condition and risk analysis section can signal a significant change in the company's stock price in the upcoming 4 quarters.</p>
     * @param {Object} opts Optional parameters
     * @param {String} opts.symbol Symbol. Required if cik is empty
     * @param {String} opts.cik CIK. Required if symbol is empty
     * @param {String} opts.freq <code>annual</code> or <code>quarterly</code>. Default to <code>annual</code>
     * @param {module:api/DefaultApi~similarityIndexCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SimilarityIndex}
     */

  }, {
    key: "similarityIndex",
    value: function similarityIndex(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'symbol': opts['symbol'],
        'cik': opts['cik'],
        'freq': opts['freq']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _SimilarityIndex["default"];
      return this.apiClient.callApi('/stock/similarity-index', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the stockBidask operation.
     * @callback module:api/DefaultApi~stockBidaskCallback
     * @param {String} error Error message, if any.
     * @param {module:model/LastBidAsk} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Last Bid-Ask
     * Get last bid/ask data for US stocks.
     * @param {String} symbol Symbol.
     * @param {module:api/DefaultApi~stockBidaskCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/LastBidAsk}
     */

  }, {
    key: "stockBidask",
    value: function stockBidask(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling stockBidask");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _LastBidAsk["default"];
      return this.apiClient.callApi('/stock/bidask', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the stockCandles operation.
     * @callback module:api/DefaultApi~stockCandlesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/StockCandles} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Stock Candles
     * <p>Get candlestick data for stocks going back 25 years for US stocks.</p><p>Real-time stock prices for international markets are supported for Enterprise clients via our partner's feed. <a href=\"mailto:support@finnhub.io\">Contact Us</a> to learn more.</p>
     * @param {String} symbol Symbol.
     * @param {String} resolution Supported resolution includes <code>1, 5, 15, 30, 60, D, W, M </code>.Some timeframes might not be available depending on the exchange.
     * @param {Number} from UNIX timestamp. Interval initial value.
     * @param {Number} to UNIX timestamp. Interval end value.
     * @param {Object} opts Optional parameters
     * @param {String} opts.adjusted By default, <code>adjusted=false</code>. Use <code>true</code> to get adjusted data.
     * @param {module:api/DefaultApi~stockCandlesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/StockCandles}
     */

  }, {
    key: "stockCandles",
    value: function stockCandles(symbol, resolution, from, to, opts, callback) {
      opts = opts || {};
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling stockCandles");
      } // verify the required parameter 'resolution' is set


      if (resolution === undefined || resolution === null) {
        throw new Error("Missing the required parameter 'resolution' when calling stockCandles");
      } // verify the required parameter 'from' is set


      if (from === undefined || from === null) {
        throw new Error("Missing the required parameter 'from' when calling stockCandles");
      } // verify the required parameter 'to' is set


      if (to === undefined || to === null) {
        throw new Error("Missing the required parameter 'to' when calling stockCandles");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'resolution': resolution,
        'from': from,
        'to': to,
        'adjusted': opts['adjusted']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _StockCandles["default"];
      return this.apiClient.callApi('/stock/candle', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the stockDividends operation.
     * @callback module:api/DefaultApi~stockDividendsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Dividends>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Dividends
     * Get dividends data for common stocks going back 30 years.
     * @param {String} symbol Symbol.
     * @param {Date} from YYYY-MM-DD.
     * @param {Date} to YYYY-MM-DD.
     * @param {module:api/DefaultApi~stockDividendsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Dividends>}
     */

  }, {
    key: "stockDividends",
    value: function stockDividends(symbol, from, to, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling stockDividends");
      } // verify the required parameter 'from' is set


      if (from === undefined || from === null) {
        throw new Error("Missing the required parameter 'from' when calling stockDividends");
      } // verify the required parameter 'to' is set


      if (to === undefined || to === null) {
        throw new Error("Missing the required parameter 'to' when calling stockDividends");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'from': from,
        'to': to
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Dividends["default"]];
      return this.apiClient.callApi('/stock/dividend', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the stockSplits operation.
     * @callback module:api/DefaultApi~stockSplitsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Split>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Splits
     * Get splits data for stocks.
     * @param {String} symbol Symbol.
     * @param {Date} from YYYY-MM-DD.
     * @param {Date} to YYYY-MM-DD.
     * @param {module:api/DefaultApi~stockSplitsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Split>}
     */

  }, {
    key: "stockSplits",
    value: function stockSplits(symbol, from, to, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling stockSplits");
      } // verify the required parameter 'from' is set


      if (from === undefined || from === null) {
        throw new Error("Missing the required parameter 'from' when calling stockSplits");
      } // verify the required parameter 'to' is set


      if (to === undefined || to === null) {
        throw new Error("Missing the required parameter 'to' when calling stockSplits");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'from': from,
        'to': to
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Split["default"]];
      return this.apiClient.callApi('/stock/split', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the stockSymbols operation.
     * @callback module:api/DefaultApi~stockSymbolsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Stock>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Stock Symbol
     * List supported stocks. A list of supported CFD Indices can be found <a href=\"https://docs.google.com/spreadsheets/d/1BAbIXBgl405fj0oHeEyRFEu8mW4QD1PhvtaBATLoR14/edit?usp=sharing\" target=\"_blank\">here</a>.
     * @param {String} exchange Exchange you want to get the list of symbols from. List of exchanges with fundamental data can be found <a href=\"https://docs.google.com/spreadsheets/d/1I3pBxjfXB056-g_JYf_6o3Rns3BV2kMGG1nCatb91ls/edit?usp=sharing\" target=\"_blank\">here</a>.
     * @param {module:api/DefaultApi~stockSymbolsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Stock>}
     */

  }, {
    key: "stockSymbols",
    value: function stockSymbols(exchange, callback) {
      var postBody = null; // verify the required parameter 'exchange' is set

      if (exchange === undefined || exchange === null) {
        throw new Error("Missing the required parameter 'exchange' when calling stockSymbols");
      }

      var pathParams = {};
      var queryParams = {
        'exchange': exchange
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Stock["default"]];
      return this.apiClient.callApi('/stock/symbol', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the stockTick operation.
     * @callback module:api/DefaultApi~stockTickCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TickData} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Tick Data
     * <p>Get historical tick data for US stocks from all 13 exchanges. You can send the request directly to our tick server at <a href=\"https://tick.finnhub.io/\">https://tick.finnhub.io/</a> with the same path and parameters or get redirected there if you call our main server. Data is updated at the end of each trading day.</p><p>Tick data from 1985 is available for Enterprise clients. <a href=\"mailto:support@finnhub.io\">Contact us</a> to learn more.</p>
     * @param {String} symbol Symbol.
     * @param {Date} _date Date: 2020-04-02.
     * @param {Number} limit Limit number of ticks returned. Maximum value: <code>25000</code>
     * @param {Number} skip Number of ticks to skip. Use this parameter to loop through the entire data.
     * @param {module:api/DefaultApi~stockTickCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/TickData}
     */

  }, {
    key: "stockTick",
    value: function stockTick(symbol, _date, limit, skip, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling stockTick");
      } // verify the required parameter '_date' is set


      if (_date === undefined || _date === null) {
        throw new Error("Missing the required parameter '_date' when calling stockTick");
      } // verify the required parameter 'limit' is set


      if (limit === undefined || limit === null) {
        throw new Error("Missing the required parameter 'limit' when calling stockTick");
      } // verify the required parameter 'skip' is set


      if (skip === undefined || skip === null) {
        throw new Error("Missing the required parameter 'skip' when calling stockTick");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'date': _date,
        'limit': limit,
        'skip': skip
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _TickData["default"];
      return this.apiClient.callApi('/stock/tick', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the supportResistance operation.
     * @callback module:api/DefaultApi~supportResistanceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SupportResistance} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Support/Resistance
     * Get support and resistance levels for a symbol.
     * @param {String} symbol Symbol
     * @param {String} resolution Supported resolution includes <code>1, 5, 15, 30, 60, D, W, M </code>.Some timeframes might not be available depending on the exchange.
     * @param {module:api/DefaultApi~supportResistanceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SupportResistance}
     */

  }, {
    key: "supportResistance",
    value: function supportResistance(symbol, resolution, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling supportResistance");
      } // verify the required parameter 'resolution' is set


      if (resolution === undefined || resolution === null) {
        throw new Error("Missing the required parameter 'resolution' when calling supportResistance");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'resolution': resolution
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _SupportResistance["default"];
      return this.apiClient.callApi('/scan/support-resistance', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the technicalIndicator operation.
     * @callback module:api/DefaultApi~technicalIndicatorCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Technical Indicators
     * Return technical indicator with price data. List of supported indicators can be found <a href=\"https://docs.google.com/spreadsheets/d/1ylUvKHVYN2E87WdwIza8ROaCpd48ggEl1k5i5SgA29k/edit?usp=sharing\" target=\"_blank\">here</a>.
     * @param {String} symbol symbol
     * @param {String} resolution Supported resolution includes <code>1, 5, 15, 30, 60, D, W, M </code>.Some timeframes might not be available depending on the exchange.
     * @param {Number} from UNIX timestamp. Interval initial value.
     * @param {Number} to UNIX timestamp. Interval end value.
     * @param {String} indicator Indicator name. Full list can be found <a href=\"https://docs.google.com/spreadsheets/d/1ylUvKHVYN2E87WdwIza8ROaCpd48ggEl1k5i5SgA29k/edit?usp=sharing\" target=\"_blank\">here</a>.
     * @param {Object} opts Optional parameters
     * @param {Object} opts.indicatorFields Check out <a href=\"https://docs.google.com/spreadsheets/d/1ylUvKHVYN2E87WdwIza8ROaCpd48ggEl1k5i5SgA29k/edit?usp=sharing\" target=\"_blank\">this page</a> to see which indicators and params are supported.
     * @param {module:api/DefaultApi~technicalIndicatorCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */

  }, {
    key: "technicalIndicator",
    value: function technicalIndicator(symbol, resolution, from, to, indicator, opts, callback) {
      opts = opts || {};
      var postBody = opts['indicatorFields']; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling technicalIndicator");
      } // verify the required parameter 'resolution' is set


      if (resolution === undefined || resolution === null) {
        throw new Error("Missing the required parameter 'resolution' when calling technicalIndicator");
      } // verify the required parameter 'from' is set


      if (from === undefined || from === null) {
        throw new Error("Missing the required parameter 'from' when calling technicalIndicator");
      } // verify the required parameter 'to' is set


      if (to === undefined || to === null) {
        throw new Error("Missing the required parameter 'to' when calling technicalIndicator");
      } // verify the required parameter 'indicator' is set


      if (indicator === undefined || indicator === null) {
        throw new Error("Missing the required parameter 'indicator' when calling technicalIndicator");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol,
        'resolution': resolution,
        'from': from,
        'to': to,
        'indicator': indicator
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Object;
      return this.apiClient.callApi('/indicator', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the transcripts operation.
     * @callback module:api/DefaultApi~transcriptsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EarningsCallTranscripts} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Earnings Call Transcripts
     * <p>Get earnings call transcripts, audio and participants' list. This endpoint is only available for US companies. <p>17+ years of data is available with 170,000+ audio which add up to 6TB in size.</p>
     * @param {String} id Transcript's id obtained with <a href=\"#transcripts-list\">Transcripts List endpoint</a>.
     * @param {module:api/DefaultApi~transcriptsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EarningsCallTranscripts}
     */

  }, {
    key: "transcripts",
    value: function transcripts(id, callback) {
      var postBody = null; // verify the required parameter 'id' is set

      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling transcripts");
      }

      var pathParams = {};
      var queryParams = {
        'id': id
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _EarningsCallTranscripts["default"];
      return this.apiClient.callApi('/stock/transcripts', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the transcriptsList operation.
     * @callback module:api/DefaultApi~transcriptsListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EarningsCallTranscriptsList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Earnings Call Transcripts List
     * List earnings call transcripts' metadata. This endpoint is only available for US companies.
     * @param {String} symbol Company symbol: AAPL. Leave empty to list the latest transcripts
     * @param {module:api/DefaultApi~transcriptsListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EarningsCallTranscriptsList}
     */

  }, {
    key: "transcriptsList",
    value: function transcriptsList(symbol, callback) {
      var postBody = null; // verify the required parameter 'symbol' is set

      if (symbol === undefined || symbol === null) {
        throw new Error("Missing the required parameter 'symbol' when calling transcriptsList");
      }

      var pathParams = {};
      var queryParams = {
        'symbol': symbol
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _EarningsCallTranscriptsList["default"];
      return this.apiClient.callApi('/stock/transcripts/list', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
    /**
     * Callback function to receive the result of the upgradeDowngrade operation.
     * @callback module:api/DefaultApi~upgradeDowngradeCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UpgradeDowngrade>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Stock Upgrade/Downgrade
     * Get latest stock upgrade and downgrade.
     * @param {Object} opts Optional parameters
     * @param {String} opts.symbol Symbol of the company: AAPL. If left blank, the API will return latest stock upgrades/downgrades.
     * @param {Date} opts.from From date: 2000-03-15.
     * @param {Date} opts.to To date: 2020-03-16.
     * @param {module:api/DefaultApi~upgradeDowngradeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UpgradeDowngrade>}
     */

  }, {
    key: "upgradeDowngrade",
    value: function upgradeDowngrade(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'symbol': opts['symbol'],
        'from': opts['from'],
        'to': opts['to']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['api_key'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_UpgradeDowngrade["default"]];
      return this.apiClient.callApi('/stock/upgrade-downgrade', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return DefaultApi;
}();

exports.default = DefaultApi;

/***/ }),

/***/ 4545:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
Object.defineProperty(exports, "Sl", ({
  enumerable: true,
  get: function get() {
    return _ApiClient["default"];
  }
}));
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _AggregateIndicators["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _BasicFinancials["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Company["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _CompanyExecutive["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _CompanyNewsStatistics["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _CompanyProfile["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _CompanyProfile2["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _CountryMetadata["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _CovidInfo["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _CryptoCandles["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _CryptoSymbol["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Development["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Dividends["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ETFCountryExposureData["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ETFHoldingsData["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ETFSectorExposureData["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ETFsCountryExposure["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ETFsHoldings["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ETFsIndustryExposure["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ETFsProfile["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EarningEstimate["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EarningRelease["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EarningResult["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EarningsCalendar["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EarningsCallTranscripts["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EarningsCallTranscriptsList["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EarningsEstimates["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EconomicCalendar["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EconomicCode["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EconomicData["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _EconomicEvent["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Estimate["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Filing["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _FinancialStatements["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _FinancialsAsReported["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ForexCandles["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _ForexSymbol["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Forexrates["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _FundOwnership["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _IPOCalendar["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _IPOEvent["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _IndexHistoricalConstituent["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Indicator["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _IndicesConstituents["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _IndicesHistoricalConstituents["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Investor["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _InvestorsOwnership["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _LastBidAsk["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _MajorDevelopments["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _News["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _NewsSentiment["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _PatternRecognition["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _PriceTarget["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Quote["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _RecommendationTrend["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Report["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _RevenueEstimates["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Sentiment["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _SimilarityIndex["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Split["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Stock["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _StockCandles["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _StockTranscripts["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _SupportResistance["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _TechnicalAnalysis["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _TickData["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _TranscriptContent["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _TranscriptParticipant["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Trend["default"];
  }
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _UpgradeDowngrade["default"];
  }
});
Object.defineProperty(exports, "M2", ({
  enumerable: true,
  get: function get() {
    return _DefaultApi["default"];
  }
}));

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

var _AggregateIndicators = _interopRequireDefault(__webpack_require__(7433));

var _BasicFinancials = _interopRequireDefault(__webpack_require__(9603));

var _Company = _interopRequireDefault(__webpack_require__(9938));

var _CompanyExecutive = _interopRequireDefault(__webpack_require__(9348));

var _CompanyNewsStatistics = _interopRequireDefault(__webpack_require__(6175));

var _CompanyProfile = _interopRequireDefault(__webpack_require__(6953));

var _CompanyProfile2 = _interopRequireDefault(__webpack_require__(2153));

var _CountryMetadata = _interopRequireDefault(__webpack_require__(8650));

var _CovidInfo = _interopRequireDefault(__webpack_require__(4272));

var _CryptoCandles = _interopRequireDefault(__webpack_require__(750));

var _CryptoSymbol = _interopRequireDefault(__webpack_require__(9368));

var _Development = _interopRequireDefault(__webpack_require__(3623));

var _Dividends = _interopRequireDefault(__webpack_require__(7269));

var _ETFCountryExposureData = _interopRequireDefault(__webpack_require__(2425));

var _ETFHoldingsData = _interopRequireDefault(__webpack_require__(4333));

var _ETFSectorExposureData = _interopRequireDefault(__webpack_require__(238));

var _ETFsCountryExposure = _interopRequireDefault(__webpack_require__(5345));

var _ETFsHoldings = _interopRequireDefault(__webpack_require__(8030));

var _ETFsIndustryExposure = _interopRequireDefault(__webpack_require__(9483));

var _ETFsProfile = _interopRequireDefault(__webpack_require__(5028));

var _EarningEstimate = _interopRequireDefault(__webpack_require__(9838));

var _EarningRelease = _interopRequireDefault(__webpack_require__(5186));

var _EarningResult = _interopRequireDefault(__webpack_require__(8711));

var _EarningsCalendar = _interopRequireDefault(__webpack_require__(3124));

var _EarningsCallTranscripts = _interopRequireDefault(__webpack_require__(3235));

var _EarningsCallTranscriptsList = _interopRequireDefault(__webpack_require__(927));

var _EarningsEstimates = _interopRequireDefault(__webpack_require__(5796));

var _EconomicCalendar = _interopRequireDefault(__webpack_require__(2366));

var _EconomicCode = _interopRequireDefault(__webpack_require__(1787));

var _EconomicData = _interopRequireDefault(__webpack_require__(2296));

var _EconomicEvent = _interopRequireDefault(__webpack_require__(3403));

var _Estimate = _interopRequireDefault(__webpack_require__(1300));

var _Filing = _interopRequireDefault(__webpack_require__(7871));

var _FinancialStatements = _interopRequireDefault(__webpack_require__(2542));

var _FinancialsAsReported = _interopRequireDefault(__webpack_require__(6599));

var _ForexCandles = _interopRequireDefault(__webpack_require__(3939));

var _ForexSymbol = _interopRequireDefault(__webpack_require__(403));

var _Forexrates = _interopRequireDefault(__webpack_require__(3926));

var _FundOwnership = _interopRequireDefault(__webpack_require__(4890));

var _IPOCalendar = _interopRequireDefault(__webpack_require__(4854));

var _IPOEvent = _interopRequireDefault(__webpack_require__(6925));

var _IndexHistoricalConstituent = _interopRequireDefault(__webpack_require__(3042));

var _Indicator = _interopRequireDefault(__webpack_require__(1790));

var _IndicesConstituents = _interopRequireDefault(__webpack_require__(3219));

var _IndicesHistoricalConstituents = _interopRequireDefault(__webpack_require__(2464));

var _Investor = _interopRequireDefault(__webpack_require__(1995));

var _InvestorsOwnership = _interopRequireDefault(__webpack_require__(2282));

var _LastBidAsk = _interopRequireDefault(__webpack_require__(5588));

var _MajorDevelopments = _interopRequireDefault(__webpack_require__(3454));

var _News = _interopRequireDefault(__webpack_require__(8425));

var _NewsSentiment = _interopRequireDefault(__webpack_require__(2731));

var _PatternRecognition = _interopRequireDefault(__webpack_require__(8051));

var _PriceTarget = _interopRequireDefault(__webpack_require__(5875));

var _Quote = _interopRequireDefault(__webpack_require__(5089));

var _RecommendationTrend = _interopRequireDefault(__webpack_require__(9495));

var _Report = _interopRequireDefault(__webpack_require__(3180));

var _RevenueEstimates = _interopRequireDefault(__webpack_require__(22));

var _Sentiment = _interopRequireDefault(__webpack_require__(6320));

var _SimilarityIndex = _interopRequireDefault(__webpack_require__(498));

var _Split = _interopRequireDefault(__webpack_require__(2156));

var _Stock = _interopRequireDefault(__webpack_require__(1853));

var _StockCandles = _interopRequireDefault(__webpack_require__(6224));

var _StockTranscripts = _interopRequireDefault(__webpack_require__(6037));

var _SupportResistance = _interopRequireDefault(__webpack_require__(9125));

var _TechnicalAnalysis = _interopRequireDefault(__webpack_require__(9931));

var _TickData = _interopRequireDefault(__webpack_require__(7110));

var _TranscriptContent = _interopRequireDefault(__webpack_require__(9237));

var _TranscriptParticipant = _interopRequireDefault(__webpack_require__(1850));

var _Trend = _interopRequireDefault(__webpack_require__(3994));

var _UpgradeDowngrade = _interopRequireDefault(__webpack_require__(8610));

var _DefaultApi = _interopRequireDefault(__webpack_require__(8133));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***/ }),

/***/ 7433:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

var _TechnicalAnalysis = _interopRequireDefault(__webpack_require__(9931));

var _Trend = _interopRequireDefault(__webpack_require__(3994));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The AggregateIndicators model module.
 * @module model/AggregateIndicators
 * @version 1.2.1
 */
var AggregateIndicators = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>AggregateIndicators</code>.
   * @alias module:model/AggregateIndicators
   */
  function AggregateIndicators() {
    _classCallCheck(this, AggregateIndicators);

    AggregateIndicators.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(AggregateIndicators, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>AggregateIndicators</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AggregateIndicators} obj Optional instance to populate.
     * @return {module:model/AggregateIndicators} The populated <code>AggregateIndicators</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new AggregateIndicators();

        if (data.hasOwnProperty('technicalAnalysis')) {
          obj['technicalAnalysis'] = _TechnicalAnalysis["default"].constructFromObject(data['technicalAnalysis']);
        }

        if (data.hasOwnProperty('trend')) {
          obj['trend'] = _Trend["default"].constructFromObject(data['trend']);
        }
      }

      return obj;
    }
  }]);

  return AggregateIndicators;
}();
/**
 * @member {module:model/TechnicalAnalysis} technicalAnalysis
 */


AggregateIndicators.prototype['technicalAnalysis'] = undefined;
/**
 * @member {module:model/Trend} trend
 */

AggregateIndicators.prototype['trend'] = undefined;
var _default = AggregateIndicators;
exports.default = _default;

/***/ }),

/***/ 9603:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The BasicFinancials model module.
 * @module model/BasicFinancials
 * @version 1.2.1
 */
var BasicFinancials = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>BasicFinancials</code>.
   * @alias module:model/BasicFinancials
   */
  function BasicFinancials() {
    _classCallCheck(this, BasicFinancials);

    BasicFinancials.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(BasicFinancials, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>BasicFinancials</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/BasicFinancials} obj Optional instance to populate.
     * @return {module:model/BasicFinancials} The populated <code>BasicFinancials</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new BasicFinancials();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('metricType')) {
          obj['metricType'] = _ApiClient["default"].convertToType(data['metricType'], 'String');
        }

        if (data.hasOwnProperty('metric')) {
          obj['metric'] = _ApiClient["default"].convertToType(data['metric'], Object);
        }
      }

      return obj;
    }
  }]);

  return BasicFinancials;
}();
/**
 * Symbol of the company.
 * @member {String} symbol
 */


BasicFinancials.prototype['symbol'] = undefined;
/**
 * Metric type.
 * @member {String} metricType
 */

BasicFinancials.prototype['metricType'] = undefined;
/**
 * @member {Object} metric
 */

BasicFinancials.prototype['metric'] = undefined;
var _default = BasicFinancials;
exports.default = _default;

/***/ }),

/***/ 9938:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Company model module.
 * @module model/Company
 * @version 1.2.1
 */
var Company = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Company</code>.
   * @alias module:model/Company
   */
  function Company() {
    _classCallCheck(this, Company);

    Company.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Company, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Company</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Company} obj Optional instance to populate.
     * @return {module:model/Company} The populated <code>Company</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Company();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('age')) {
          obj['age'] = _ApiClient["default"].convertToType(data['age'], 'Number');
        }

        if (data.hasOwnProperty('title')) {
          obj['title'] = _ApiClient["default"].convertToType(data['title'], 'String');
        }

        if (data.hasOwnProperty('since')) {
          obj['since'] = _ApiClient["default"].convertToType(data['since'], 'String');
        }

        if (data.hasOwnProperty('sex')) {
          obj['sex'] = _ApiClient["default"].convertToType(data['sex'], 'String');
        }

        if (data.hasOwnProperty('compensation')) {
          obj['compensation'] = _ApiClient["default"].convertToType(data['compensation'], 'Number');
        }

        if (data.hasOwnProperty('currency')) {
          obj['currency'] = _ApiClient["default"].convertToType(data['currency'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Company;
}();
/**
 * Executive name
 * @member {String} name
 */


Company.prototype['name'] = undefined;
/**
 * Age
 * @member {Number} age
 */

Company.prototype['age'] = undefined;
/**
 * Title
 * @member {String} title
 */

Company.prototype['title'] = undefined;
/**
 * Year appointed
 * @member {String} since
 */

Company.prototype['since'] = undefined;
/**
 * Sex
 * @member {String} sex
 */

Company.prototype['sex'] = undefined;
/**
 * Total compensation
 * @member {Number} compensation
 */

Company.prototype['compensation'] = undefined;
/**
 * Compensation currency
 * @member {String} currency
 */

Company.prototype['currency'] = undefined;
var _default = Company;
exports.default = _default;

/***/ }),

/***/ 9348:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CompanyExecutive model module.
 * @module model/CompanyExecutive
 * @version 1.2.1
 */
var CompanyExecutive = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CompanyExecutive</code>.
   * @alias module:model/CompanyExecutive
   */
  function CompanyExecutive() {
    _classCallCheck(this, CompanyExecutive);

    CompanyExecutive.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CompanyExecutive, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>CompanyExecutive</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CompanyExecutive} obj Optional instance to populate.
     * @return {module:model/CompanyExecutive} The populated <code>CompanyExecutive</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CompanyExecutive();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('executive')) {
          obj['executive'] = _ApiClient["default"].convertToType(data['executive'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return CompanyExecutive;
}();
/**
 * Company symbol.
 * @member {String} symbol
 */


CompanyExecutive.prototype['symbol'] = undefined;
/**
 * Array of company's executives and members of the Board.
 * @member {Array.<Object>} executive
 */

CompanyExecutive.prototype['executive'] = undefined;
var _default = CompanyExecutive;
exports.default = _default;

/***/ }),

/***/ 6175:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CompanyNewsStatistics model module.
 * @module model/CompanyNewsStatistics
 * @version 1.2.1
 */
var CompanyNewsStatistics = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CompanyNewsStatistics</code>.
   * @alias module:model/CompanyNewsStatistics
   */
  function CompanyNewsStatistics() {
    _classCallCheck(this, CompanyNewsStatistics);

    CompanyNewsStatistics.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CompanyNewsStatistics, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>CompanyNewsStatistics</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CompanyNewsStatistics} obj Optional instance to populate.
     * @return {module:model/CompanyNewsStatistics} The populated <code>CompanyNewsStatistics</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CompanyNewsStatistics();

        if (data.hasOwnProperty('articlesInLastWeek')) {
          obj['articlesInLastWeek'] = _ApiClient["default"].convertToType(data['articlesInLastWeek'], 'Number');
        }

        if (data.hasOwnProperty('buzz')) {
          obj['buzz'] = _ApiClient["default"].convertToType(data['buzz'], 'Number');
        }

        if (data.hasOwnProperty('weeklyAverage')) {
          obj['weeklyAverage'] = _ApiClient["default"].convertToType(data['weeklyAverage'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return CompanyNewsStatistics;
}();
/**
 * 
 * @member {Number} articlesInLastWeek
 */


CompanyNewsStatistics.prototype['articlesInLastWeek'] = undefined;
/**
 * 
 * @member {Number} buzz
 */

CompanyNewsStatistics.prototype['buzz'] = undefined;
/**
 * 
 * @member {Number} weeklyAverage
 */

CompanyNewsStatistics.prototype['weeklyAverage'] = undefined;
var _default = CompanyNewsStatistics;
exports.default = _default;

/***/ }),

/***/ 6953:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CompanyProfile model module.
 * @module model/CompanyProfile
 * @version 1.2.1
 */
var CompanyProfile = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CompanyProfile</code>.
   * @alias module:model/CompanyProfile
   */
  function CompanyProfile() {
    _classCallCheck(this, CompanyProfile);

    CompanyProfile.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CompanyProfile, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>CompanyProfile</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CompanyProfile} obj Optional instance to populate.
     * @return {module:model/CompanyProfile} The populated <code>CompanyProfile</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CompanyProfile();

        if (data.hasOwnProperty('address')) {
          obj['address'] = _ApiClient["default"].convertToType(data['address'], 'String');
        }

        if (data.hasOwnProperty('city')) {
          obj['city'] = _ApiClient["default"].convertToType(data['city'], 'String');
        }

        if (data.hasOwnProperty('country')) {
          obj['country'] = _ApiClient["default"].convertToType(data['country'], 'String');
        }

        if (data.hasOwnProperty('currency')) {
          obj['currency'] = _ApiClient["default"].convertToType(data['currency'], 'String');
        }

        if (data.hasOwnProperty('cusip')) {
          obj['cusip'] = _ApiClient["default"].convertToType(data['cusip'], 'String');
        }

        if (data.hasOwnProperty('sedol')) {
          obj['sedol'] = _ApiClient["default"].convertToType(data['sedol'], 'String');
        }

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }

        if (data.hasOwnProperty('exchange')) {
          obj['exchange'] = _ApiClient["default"].convertToType(data['exchange'], 'String');
        }

        if (data.hasOwnProperty('ggroup')) {
          obj['ggroup'] = _ApiClient["default"].convertToType(data['ggroup'], 'String');
        }

        if (data.hasOwnProperty('gind')) {
          obj['gind'] = _ApiClient["default"].convertToType(data['gind'], 'String');
        }

        if (data.hasOwnProperty('gsector')) {
          obj['gsector'] = _ApiClient["default"].convertToType(data['gsector'], 'String');
        }

        if (data.hasOwnProperty('gsubind')) {
          obj['gsubind'] = _ApiClient["default"].convertToType(data['gsubind'], 'String');
        }

        if (data.hasOwnProperty('isin')) {
          obj['isin'] = _ApiClient["default"].convertToType(data['isin'], 'String');
        }

        if (data.hasOwnProperty('naicsNationalIndustry')) {
          obj['naicsNationalIndustry'] = _ApiClient["default"].convertToType(data['naicsNationalIndustry'], 'String');
        }

        if (data.hasOwnProperty('naics')) {
          obj['naics'] = _ApiClient["default"].convertToType(data['naics'], 'String');
        }

        if (data.hasOwnProperty('naicsSector')) {
          obj['naicsSector'] = _ApiClient["default"].convertToType(data['naicsSector'], 'String');
        }

        if (data.hasOwnProperty('naicsSubsector')) {
          obj['naicsSubsector'] = _ApiClient["default"].convertToType(data['naicsSubsector'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('phone')) {
          obj['phone'] = _ApiClient["default"].convertToType(data['phone'], 'String');
        }

        if (data.hasOwnProperty('state')) {
          obj['state'] = _ApiClient["default"].convertToType(data['state'], 'String');
        }

        if (data.hasOwnProperty('ticker')) {
          obj['ticker'] = _ApiClient["default"].convertToType(data['ticker'], 'String');
        }

        if (data.hasOwnProperty('weburl')) {
          obj['weburl'] = _ApiClient["default"].convertToType(data['weburl'], 'String');
        }

        if (data.hasOwnProperty('ipo')) {
          obj['ipo'] = _ApiClient["default"].convertToType(data['ipo'], 'Date');
        }

        if (data.hasOwnProperty('marketCapitalization')) {
          obj['marketCapitalization'] = _ApiClient["default"].convertToType(data['marketCapitalization'], 'Number');
        }

        if (data.hasOwnProperty('shareOutstanding')) {
          obj['shareOutstanding'] = _ApiClient["default"].convertToType(data['shareOutstanding'], 'Number');
        }

        if (data.hasOwnProperty('employeeTotal')) {
          obj['employeeTotal'] = _ApiClient["default"].convertToType(data['employeeTotal'], 'Number');
        }

        if (data.hasOwnProperty('logo')) {
          obj['logo'] = _ApiClient["default"].convertToType(data['logo'], 'String');
        }

        if (data.hasOwnProperty('finnhubIndustry')) {
          obj['finnhubIndustry'] = _ApiClient["default"].convertToType(data['finnhubIndustry'], 'String');
        }
      }

      return obj;
    }
  }]);

  return CompanyProfile;
}();
/**
 * Address of company's headquarter.
 * @member {String} address
 */


CompanyProfile.prototype['address'] = undefined;
/**
 * City of company's headquarter.
 * @member {String} city
 */

CompanyProfile.prototype['city'] = undefined;
/**
 * Country of company's headquarter.
 * @member {String} country
 */

CompanyProfile.prototype['country'] = undefined;
/**
 * Currency used in company filings.
 * @member {String} currency
 */

CompanyProfile.prototype['currency'] = undefined;
/**
 * CUSIP number.
 * @member {String} cusip
 */

CompanyProfile.prototype['cusip'] = undefined;
/**
 * Sedol number.
 * @member {String} sedol
 */

CompanyProfile.prototype['sedol'] = undefined;
/**
 * Company business summary.
 * @member {String} description
 */

CompanyProfile.prototype['description'] = undefined;
/**
 * Listed exchange.
 * @member {String} exchange
 */

CompanyProfile.prototype['exchange'] = undefined;
/**
 * GICS industry group.
 * @member {String} ggroup
 */

CompanyProfile.prototype['ggroup'] = undefined;
/**
 * GICS industry.
 * @member {String} gind
 */

CompanyProfile.prototype['gind'] = undefined;
/**
 * GICS sector.
 * @member {String} gsector
 */

CompanyProfile.prototype['gsector'] = undefined;
/**
 * GICS sub-industry.
 * @member {String} gsubind
 */

CompanyProfile.prototype['gsubind'] = undefined;
/**
 * ISIN number.
 * @member {String} isin
 */

CompanyProfile.prototype['isin'] = undefined;
/**
 * NAICS national industry.
 * @member {String} naicsNationalIndustry
 */

CompanyProfile.prototype['naicsNationalIndustry'] = undefined;
/**
 * NAICS industry.
 * @member {String} naics
 */

CompanyProfile.prototype['naics'] = undefined;
/**
 * NAICS sector.
 * @member {String} naicsSector
 */

CompanyProfile.prototype['naicsSector'] = undefined;
/**
 * NAICS subsector.
 * @member {String} naicsSubsector
 */

CompanyProfile.prototype['naicsSubsector'] = undefined;
/**
 * Company name.
 * @member {String} name
 */

CompanyProfile.prototype['name'] = undefined;
/**
 * Company phone number.
 * @member {String} phone
 */

CompanyProfile.prototype['phone'] = undefined;
/**
 * State of company's headquarter.
 * @member {String} state
 */

CompanyProfile.prototype['state'] = undefined;
/**
 * Company symbol/ticker as used on the listed exchange.
 * @member {String} ticker
 */

CompanyProfile.prototype['ticker'] = undefined;
/**
 * Company website.
 * @member {String} weburl
 */

CompanyProfile.prototype['weburl'] = undefined;
/**
 * IPO date.
 * @member {Date} ipo
 */

CompanyProfile.prototype['ipo'] = undefined;
/**
 * Market Capitalization.
 * @member {Number} marketCapitalization
 */

CompanyProfile.prototype['marketCapitalization'] = undefined;
/**
 * Number of oustanding shares.
 * @member {Number} shareOutstanding
 */

CompanyProfile.prototype['shareOutstanding'] = undefined;
/**
 * Number of employee.
 * @member {Number} employeeTotal
 */

CompanyProfile.prototype['employeeTotal'] = undefined;
/**
 * Logo image.
 * @member {String} logo
 */

CompanyProfile.prototype['logo'] = undefined;
/**
 * Finnhub industry classification.
 * @member {String} finnhubIndustry
 */

CompanyProfile.prototype['finnhubIndustry'] = undefined;
var _default = CompanyProfile;
exports.default = _default;

/***/ }),

/***/ 2153:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CompanyProfile2 model module.
 * @module model/CompanyProfile2
 * @version 1.2.1
 */
var CompanyProfile2 = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CompanyProfile2</code>.
   * @alias module:model/CompanyProfile2
   */
  function CompanyProfile2() {
    _classCallCheck(this, CompanyProfile2);

    CompanyProfile2.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CompanyProfile2, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>CompanyProfile2</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CompanyProfile2} obj Optional instance to populate.
     * @return {module:model/CompanyProfile2} The populated <code>CompanyProfile2</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CompanyProfile2();

        if (data.hasOwnProperty('country')) {
          obj['country'] = _ApiClient["default"].convertToType(data['country'], 'String');
        }

        if (data.hasOwnProperty('currency')) {
          obj['currency'] = _ApiClient["default"].convertToType(data['currency'], 'String');
        }

        if (data.hasOwnProperty('exchange')) {
          obj['exchange'] = _ApiClient["default"].convertToType(data['exchange'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('ticker')) {
          obj['ticker'] = _ApiClient["default"].convertToType(data['ticker'], 'String');
        }

        if (data.hasOwnProperty('ipo')) {
          obj['ipo'] = _ApiClient["default"].convertToType(data['ipo'], 'Date');
        }

        if (data.hasOwnProperty('marketCapitalization')) {
          obj['marketCapitalization'] = _ApiClient["default"].convertToType(data['marketCapitalization'], 'Number');
        }

        if (data.hasOwnProperty('shareOutstanding')) {
          obj['shareOutstanding'] = _ApiClient["default"].convertToType(data['shareOutstanding'], 'Number');
        }

        if (data.hasOwnProperty('logo')) {
          obj['logo'] = _ApiClient["default"].convertToType(data['logo'], 'String');
        }

        if (data.hasOwnProperty('phone')) {
          obj['phone'] = _ApiClient["default"].convertToType(data['phone'], 'String');
        }

        if (data.hasOwnProperty('weburl')) {
          obj['weburl'] = _ApiClient["default"].convertToType(data['weburl'], 'String');
        }

        if (data.hasOwnProperty('finnhubIndustry')) {
          obj['finnhubIndustry'] = _ApiClient["default"].convertToType(data['finnhubIndustry'], 'String');
        }
      }

      return obj;
    }
  }]);

  return CompanyProfile2;
}();
/**
 * Country of company's headquarter.
 * @member {String} country
 */


CompanyProfile2.prototype['country'] = undefined;
/**
 * Currency used in company filings.
 * @member {String} currency
 */

CompanyProfile2.prototype['currency'] = undefined;
/**
 * Listed exchange.
 * @member {String} exchange
 */

CompanyProfile2.prototype['exchange'] = undefined;
/**
 * Company name.
 * @member {String} name
 */

CompanyProfile2.prototype['name'] = undefined;
/**
 * Company symbol/ticker as used on the listed exchange.
 * @member {String} ticker
 */

CompanyProfile2.prototype['ticker'] = undefined;
/**
 * IPO date.
 * @member {Date} ipo
 */

CompanyProfile2.prototype['ipo'] = undefined;
/**
 * Market Capitalization.
 * @member {Number} marketCapitalization
 */

CompanyProfile2.prototype['marketCapitalization'] = undefined;
/**
 * Number of oustanding shares.
 * @member {Number} shareOutstanding
 */

CompanyProfile2.prototype['shareOutstanding'] = undefined;
/**
 * Logo image.
 * @member {String} logo
 */

CompanyProfile2.prototype['logo'] = undefined;
/**
 * Company phone number.
 * @member {String} phone
 */

CompanyProfile2.prototype['phone'] = undefined;
/**
 * Company website.
 * @member {String} weburl
 */

CompanyProfile2.prototype['weburl'] = undefined;
/**
 * Finnhub industry classification.
 * @member {String} finnhubIndustry
 */

CompanyProfile2.prototype['finnhubIndustry'] = undefined;
var _default = CompanyProfile2;
exports.default = _default;

/***/ }),

/***/ 8650:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CountryMetadata model module.
 * @module model/CountryMetadata
 * @version 1.2.1
 */
var CountryMetadata = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CountryMetadata</code>.
   * @alias module:model/CountryMetadata
   */
  function CountryMetadata() {
    _classCallCheck(this, CountryMetadata);

    CountryMetadata.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CountryMetadata, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>CountryMetadata</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CountryMetadata} obj Optional instance to populate.
     * @return {module:model/CountryMetadata} The populated <code>CountryMetadata</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CountryMetadata();

        if (data.hasOwnProperty('country')) {
          obj['country'] = _ApiClient["default"].convertToType(data['country'], 'String');
        }

        if (data.hasOwnProperty('code2')) {
          obj['code2'] = _ApiClient["default"].convertToType(data['code2'], 'String');
        }

        if (data.hasOwnProperty('code3')) {
          obj['code3'] = _ApiClient["default"].convertToType(data['code3'], 'String');
        }

        if (data.hasOwnProperty('codeNo')) {
          obj['codeNo'] = _ApiClient["default"].convertToType(data['codeNo'], 'String');
        }

        if (data.hasOwnProperty('currency')) {
          obj['currency'] = _ApiClient["default"].convertToType(data['currency'], 'String');
        }

        if (data.hasOwnProperty('currencyCode')) {
          obj['currencyCode'] = _ApiClient["default"].convertToType(data['currencyCode'], 'String');
        }
      }

      return obj;
    }
  }]);

  return CountryMetadata;
}();
/**
 * Country name
 * @member {String} country
 */


CountryMetadata.prototype['country'] = undefined;
/**
 * Alpha 2 code
 * @member {String} code2
 */

CountryMetadata.prototype['code2'] = undefined;
/**
 * Alpha 3 code
 * @member {String} code3
 */

CountryMetadata.prototype['code3'] = undefined;
/**
 * UN code
 * @member {String} codeNo
 */

CountryMetadata.prototype['codeNo'] = undefined;
/**
 * Currency name
 * @member {String} currency
 */

CountryMetadata.prototype['currency'] = undefined;
/**
 * Currency code
 * @member {String} currencyCode
 */

CountryMetadata.prototype['currencyCode'] = undefined;
var _default = CountryMetadata;
exports.default = _default;

/***/ }),

/***/ 4272:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CovidInfo model module.
 * @module model/CovidInfo
 * @version 1.2.1
 */
var CovidInfo = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CovidInfo</code>.
   * @alias module:model/CovidInfo
   */
  function CovidInfo() {
    _classCallCheck(this, CovidInfo);

    CovidInfo.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CovidInfo, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>CovidInfo</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CovidInfo} obj Optional instance to populate.
     * @return {module:model/CovidInfo} The populated <code>CovidInfo</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CovidInfo();

        if (data.hasOwnProperty('state')) {
          obj['state'] = _ApiClient["default"].convertToType(data['state'], 'String');
        }

        if (data.hasOwnProperty('case')) {
          obj['case'] = _ApiClient["default"].convertToType(data['case'], 'Number');
        }

        if (data.hasOwnProperty('death')) {
          obj['death'] = _ApiClient["default"].convertToType(data['death'], 'Number');
        }

        if (data.hasOwnProperty('updated')) {
          obj['updated'] = _ApiClient["default"].convertToType(data['updated'], 'Date');
        }
      }

      return obj;
    }
  }]);

  return CovidInfo;
}();
/**
 * State.
 * @member {String} state
 */


CovidInfo.prototype['state'] = undefined;
/**
 * Number of confirmed cases.
 * @member {Number} case
 */

CovidInfo.prototype['case'] = undefined;
/**
 * Number of confirmed deaths.
 * @member {Number} death
 */

CovidInfo.prototype['death'] = undefined;
/**
 * Updated time.
 * @member {Date} updated
 */

CovidInfo.prototype['updated'] = undefined;
var _default = CovidInfo;
exports.default = _default;

/***/ }),

/***/ 750:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CryptoCandles model module.
 * @module model/CryptoCandles
 * @version 1.2.1
 */
var CryptoCandles = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CryptoCandles</code>.
   * @alias module:model/CryptoCandles
   */
  function CryptoCandles() {
    _classCallCheck(this, CryptoCandles);

    CryptoCandles.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CryptoCandles, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>CryptoCandles</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CryptoCandles} obj Optional instance to populate.
     * @return {module:model/CryptoCandles} The populated <code>CryptoCandles</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CryptoCandles();

        if (data.hasOwnProperty('o')) {
          obj['o'] = _ApiClient["default"].convertToType(data['o'], ['Number']);
        }

        if (data.hasOwnProperty('h')) {
          obj['h'] = _ApiClient["default"].convertToType(data['h'], ['Number']);
        }

        if (data.hasOwnProperty('l')) {
          obj['l'] = _ApiClient["default"].convertToType(data['l'], ['Number']);
        }

        if (data.hasOwnProperty('c')) {
          obj['c'] = _ApiClient["default"].convertToType(data['c'], ['Number']);
        }

        if (data.hasOwnProperty('v')) {
          obj['v'] = _ApiClient["default"].convertToType(data['v'], ['Number']);
        }

        if (data.hasOwnProperty('t')) {
          obj['t'] = _ApiClient["default"].convertToType(data['t'], ['Number']);
        }

        if (data.hasOwnProperty('s')) {
          obj['s'] = _ApiClient["default"].convertToType(data['s'], 'String');
        }
      }

      return obj;
    }
  }]);

  return CryptoCandles;
}();
/**
 * List of open prices for returned candles.
 * @member {Array.<Number>} o
 */


CryptoCandles.prototype['o'] = undefined;
/**
 * List of high prices for returned candles.
 * @member {Array.<Number>} h
 */

CryptoCandles.prototype['h'] = undefined;
/**
 * List of low prices for returned candles.
 * @member {Array.<Number>} l
 */

CryptoCandles.prototype['l'] = undefined;
/**
 * List of close prices for returned candles.
 * @member {Array.<Number>} c
 */

CryptoCandles.prototype['c'] = undefined;
/**
 * List of volume data for returned candles.
 * @member {Array.<Number>} v
 */

CryptoCandles.prototype['v'] = undefined;
/**
 * List of timestamp for returned candles.
 * @member {Array.<Number>} t
 */

CryptoCandles.prototype['t'] = undefined;
/**
 * Status of the response. This field can either be ok or no_data.
 * @member {String} s
 */

CryptoCandles.prototype['s'] = undefined;
var _default = CryptoCandles;
exports.default = _default;

/***/ }),

/***/ 9368:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CryptoSymbol model module.
 * @module model/CryptoSymbol
 * @version 1.2.1
 */
var CryptoSymbol = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CryptoSymbol</code>.
   * @alias module:model/CryptoSymbol
   */
  function CryptoSymbol() {
    _classCallCheck(this, CryptoSymbol);

    CryptoSymbol.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CryptoSymbol, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>CryptoSymbol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CryptoSymbol} obj Optional instance to populate.
     * @return {module:model/CryptoSymbol} The populated <code>CryptoSymbol</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CryptoSymbol();

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }

        if (data.hasOwnProperty('displaySymbol')) {
          obj['displaySymbol'] = _ApiClient["default"].convertToType(data['displaySymbol'], 'String');
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }
      }

      return obj;
    }
  }]);

  return CryptoSymbol;
}();
/**
 * Symbol description
 * @member {String} description
 */


CryptoSymbol.prototype['description'] = undefined;
/**
 * Display symbol name.
 * @member {String} displaySymbol
 */

CryptoSymbol.prototype['displaySymbol'] = undefined;
/**
 * Unique symbol used to identify this symbol used in <code>/crypto/candle</code> endpoint.
 * @member {String} symbol
 */

CryptoSymbol.prototype['symbol'] = undefined;
var _default = CryptoSymbol;
exports.default = _default;

/***/ }),

/***/ 3623:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Development model module.
 * @module model/Development
 * @version 1.2.1
 */
var Development = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Development</code>.
   * @alias module:model/Development
   */
  function Development() {
    _classCallCheck(this, Development);

    Development.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Development, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Development</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Development} obj Optional instance to populate.
     * @return {module:model/Development} The populated <code>Development</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Development();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('datetime')) {
          obj['datetime'] = _ApiClient["default"].convertToType(data['datetime'], 'Date');
        }

        if (data.hasOwnProperty('headline')) {
          obj['headline'] = _ApiClient["default"].convertToType(data['headline'], 'String');
        }

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Development;
}();
/**
 * Company symbol.
 * @member {String} symbol
 */


Development.prototype['symbol'] = undefined;
/**
 * Published time in <code>YYYY-MM-DD HH:MM:SS</code> format.
 * @member {Date} datetime
 */

Development.prototype['datetime'] = undefined;
/**
 * Development headline.
 * @member {String} headline
 */

Development.prototype['headline'] = undefined;
/**
 * Development description.
 * @member {String} description
 */

Development.prototype['description'] = undefined;
var _default = Development;
exports.default = _default;

/***/ }),

/***/ 7269:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Dividends model module.
 * @module model/Dividends
 * @version 1.2.1
 */
var Dividends = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Dividends</code>.
   * @alias module:model/Dividends
   */
  function Dividends() {
    _classCallCheck(this, Dividends);

    Dividends.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Dividends, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Dividends</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Dividends} obj Optional instance to populate.
     * @return {module:model/Dividends} The populated <code>Dividends</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Dividends();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('date')) {
          obj['date'] = _ApiClient["default"].convertToType(data['date'], 'Date');
        }

        if (data.hasOwnProperty('amount')) {
          obj['amount'] = _ApiClient["default"].convertToType(data['amount'], 'Number');
        }

        if (data.hasOwnProperty('adjustedAmount')) {
          obj['adjustedAmount'] = _ApiClient["default"].convertToType(data['adjustedAmount'], 'Number');
        }

        if (data.hasOwnProperty('payDate')) {
          obj['payDate'] = _ApiClient["default"].convertToType(data['payDate'], 'Date');
        }

        if (data.hasOwnProperty('recordDate')) {
          obj['recordDate'] = _ApiClient["default"].convertToType(data['recordDate'], 'Date');
        }

        if (data.hasOwnProperty('declarationDate')) {
          obj['declarationDate'] = _ApiClient["default"].convertToType(data['declarationDate'], 'Date');
        }

        if (data.hasOwnProperty('currency')) {
          obj['currency'] = _ApiClient["default"].convertToType(data['currency'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Dividends;
}();
/**
 * Symbol.
 * @member {String} symbol
 */


Dividends.prototype['symbol'] = undefined;
/**
 * Ex-Dividend date.
 * @member {Date} date
 */

Dividends.prototype['date'] = undefined;
/**
 * Amount in local currency.
 * @member {Number} amount
 */

Dividends.prototype['amount'] = undefined;
/**
 * Adjusted dividend.
 * @member {Number} adjustedAmount
 */

Dividends.prototype['adjustedAmount'] = undefined;
/**
 * Pay date.
 * @member {Date} payDate
 */

Dividends.prototype['payDate'] = undefined;
/**
 * Record date.
 * @member {Date} recordDate
 */

Dividends.prototype['recordDate'] = undefined;
/**
 * Declaration date.
 * @member {Date} declarationDate
 */

Dividends.prototype['declarationDate'] = undefined;
/**
 * Currency.
 * @member {String} currency
 */

Dividends.prototype['currency'] = undefined;
var _default = Dividends;
exports.default = _default;

/***/ }),

/***/ 2425:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ETFCountryExposureData model module.
 * @module model/ETFCountryExposureData
 * @version 1.2.1
 */
var ETFCountryExposureData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ETFCountryExposureData</code>.
   * @alias module:model/ETFCountryExposureData
   */
  function ETFCountryExposureData() {
    _classCallCheck(this, ETFCountryExposureData);

    ETFCountryExposureData.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ETFCountryExposureData, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ETFCountryExposureData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ETFCountryExposureData} obj Optional instance to populate.
     * @return {module:model/ETFCountryExposureData} The populated <code>ETFCountryExposureData</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ETFCountryExposureData();

        if (data.hasOwnProperty('country')) {
          obj['country'] = _ApiClient["default"].convertToType(data['country'], 'String');
        }

        if (data.hasOwnProperty('exposure')) {
          obj['exposure'] = _ApiClient["default"].convertToType(data['exposure'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ETFCountryExposureData;
}();
/**
 * Country
 * @member {String} country
 */


ETFCountryExposureData.prototype['country'] = undefined;
/**
 * Percent of exposure.
 * @member {String} exposure
 */

ETFCountryExposureData.prototype['exposure'] = undefined;
var _default = ETFCountryExposureData;
exports.default = _default;

/***/ }),

/***/ 4333:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ETFHoldingsData model module.
 * @module model/ETFHoldingsData
 * @version 1.2.1
 */
var ETFHoldingsData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ETFHoldingsData</code>.
   * @alias module:model/ETFHoldingsData
   */
  function ETFHoldingsData() {
    _classCallCheck(this, ETFHoldingsData);

    ETFHoldingsData.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ETFHoldingsData, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ETFHoldingsData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ETFHoldingsData} obj Optional instance to populate.
     * @return {module:model/ETFHoldingsData} The populated <code>ETFHoldingsData</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ETFHoldingsData();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('share')) {
          obj['share'] = _ApiClient["default"].convertToType(data['share'], 'Number');
        }

        if (data.hasOwnProperty('percent')) {
          obj['percent'] = _ApiClient["default"].convertToType(data['percent'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return ETFHoldingsData;
}();
/**
 * Symbol description
 * @member {String} symbol
 */


ETFHoldingsData.prototype['symbol'] = undefined;
/**
 * Number of shares owned by the ETF.
 * @member {Number} share
 */

ETFHoldingsData.prototype['share'] = undefined;
/**
 * Portfolio's percent
 * @member {Number} percent
 */

ETFHoldingsData.prototype['percent'] = undefined;
var _default = ETFHoldingsData;
exports.default = _default;

/***/ }),

/***/ 238:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ETFSectorExposureData model module.
 * @module model/ETFSectorExposureData
 * @version 1.2.1
 */
var ETFSectorExposureData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ETFSectorExposureData</code>.
   * @alias module:model/ETFSectorExposureData
   */
  function ETFSectorExposureData() {
    _classCallCheck(this, ETFSectorExposureData);

    ETFSectorExposureData.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ETFSectorExposureData, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ETFSectorExposureData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ETFSectorExposureData} obj Optional instance to populate.
     * @return {module:model/ETFSectorExposureData} The populated <code>ETFSectorExposureData</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ETFSectorExposureData();

        if (data.hasOwnProperty('industry')) {
          obj['industry'] = _ApiClient["default"].convertToType(data['industry'], 'String');
        }

        if (data.hasOwnProperty('exposure')) {
          obj['exposure'] = _ApiClient["default"].convertToType(data['exposure'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ETFSectorExposureData;
}();
/**
 * Industry
 * @member {String} industry
 */


ETFSectorExposureData.prototype['industry'] = undefined;
/**
 * Percent of exposure.
 * @member {String} exposure
 */

ETFSectorExposureData.prototype['exposure'] = undefined;
var _default = ETFSectorExposureData;
exports.default = _default;

/***/ }),

/***/ 5345:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ETFsCountryExposure model module.
 * @module model/ETFsCountryExposure
 * @version 1.2.1
 */
var ETFsCountryExposure = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ETFsCountryExposure</code>.
   * @alias module:model/ETFsCountryExposure
   */
  function ETFsCountryExposure() {
    _classCallCheck(this, ETFsCountryExposure);

    ETFsCountryExposure.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ETFsCountryExposure, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ETFsCountryExposure</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ETFsCountryExposure} obj Optional instance to populate.
     * @return {module:model/ETFsCountryExposure} The populated <code>ETFsCountryExposure</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ETFsCountryExposure();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('countryExposure')) {
          obj['countryExposure'] = _ApiClient["default"].convertToType(data['countryExposure'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return ETFsCountryExposure;
}();
/**
 * ETF symbol.
 * @member {String} symbol
 */


ETFsCountryExposure.prototype['symbol'] = undefined;
/**
 * Array of countries and and exposure levels.
 * @member {Array.<Object>} countryExposure
 */

ETFsCountryExposure.prototype['countryExposure'] = undefined;
var _default = ETFsCountryExposure;
exports.default = _default;

/***/ }),

/***/ 8030:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ETFsHoldings model module.
 * @module model/ETFsHoldings
 * @version 1.2.1
 */
var ETFsHoldings = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ETFsHoldings</code>.
   * @alias module:model/ETFsHoldings
   */
  function ETFsHoldings() {
    _classCallCheck(this, ETFsHoldings);

    ETFsHoldings.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ETFsHoldings, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ETFsHoldings</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ETFsHoldings} obj Optional instance to populate.
     * @return {module:model/ETFsHoldings} The populated <code>ETFsHoldings</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ETFsHoldings();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('holdings')) {
          obj['holdings'] = _ApiClient["default"].convertToType(data['holdings'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return ETFsHoldings;
}();
/**
 * ETF symbol.
 * @member {String} symbol
 */


ETFsHoldings.prototype['symbol'] = undefined;
/**
 * Array of holdings.
 * @member {Array.<Object>} holdings
 */

ETFsHoldings.prototype['holdings'] = undefined;
var _default = ETFsHoldings;
exports.default = _default;

/***/ }),

/***/ 9483:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ETFsIndustryExposure model module.
 * @module model/ETFsIndustryExposure
 * @version 1.2.1
 */
var ETFsIndustryExposure = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ETFsIndustryExposure</code>.
   * @alias module:model/ETFsIndustryExposure
   */
  function ETFsIndustryExposure() {
    _classCallCheck(this, ETFsIndustryExposure);

    ETFsIndustryExposure.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ETFsIndustryExposure, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ETFsIndustryExposure</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ETFsIndustryExposure} obj Optional instance to populate.
     * @return {module:model/ETFsIndustryExposure} The populated <code>ETFsIndustryExposure</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ETFsIndustryExposure();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('sectorExposure')) {
          obj['sectorExposure'] = _ApiClient["default"].convertToType(data['sectorExposure'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return ETFsIndustryExposure;
}();
/**
 * ETF symbol.
 * @member {String} symbol
 */


ETFsIndustryExposure.prototype['symbol'] = undefined;
/**
 * Array of industries and exposure levels.
 * @member {Array.<Object>} sectorExposure
 */

ETFsIndustryExposure.prototype['sectorExposure'] = undefined;
var _default = ETFsIndustryExposure;
exports.default = _default;

/***/ }),

/***/ 5028:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ETFsProfile model module.
 * @module model/ETFsProfile
 * @version 1.2.1
 */
var ETFsProfile = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ETFsProfile</code>.
   * @alias module:model/ETFsProfile
   */
  function ETFsProfile() {
    _classCallCheck(this, ETFsProfile);

    ETFsProfile.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ETFsProfile, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ETFsProfile</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ETFsProfile} obj Optional instance to populate.
     * @return {module:model/ETFsProfile} The populated <code>ETFsProfile</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ETFsProfile();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('profile')) {
          obj['profile'] = _ApiClient["default"].convertToType(data['profile'], Object);
        }
      }

      return obj;
    }
  }]);

  return ETFsProfile;
}();
/**
 * Use symbol returned in <code>/forex/symbol</code> endpoint for this field.
 * @member {String} symbol
 */


ETFsProfile.prototype['symbol'] = undefined;
/**
 * @member {Object} profile
 */

ETFsProfile.prototype['profile'] = undefined;
var _default = ETFsProfile;
exports.default = _default;

/***/ }),

/***/ 9838:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EarningEstimate model module.
 * @module model/EarningEstimate
 * @version 1.2.1
 */
var EarningEstimate = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EarningEstimate</code>.
   * @alias module:model/EarningEstimate
   */
  function EarningEstimate() {
    _classCallCheck(this, EarningEstimate);

    EarningEstimate.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EarningEstimate, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EarningEstimate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EarningEstimate} obj Optional instance to populate.
     * @return {module:model/EarningEstimate} The populated <code>EarningEstimate</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EarningEstimate();

        if (data.hasOwnProperty('epsAvg')) {
          obj['epsAvg'] = _ApiClient["default"].convertToType(data['epsAvg'], 'Number');
        }

        if (data.hasOwnProperty('epsHigh')) {
          obj['epsHigh'] = _ApiClient["default"].convertToType(data['epsHigh'], 'Number');
        }

        if (data.hasOwnProperty('epsLow')) {
          obj['epsLow'] = _ApiClient["default"].convertToType(data['epsLow'], 'Number');
        }

        if (data.hasOwnProperty('numberAnalysts')) {
          obj['numberAnalysts'] = _ApiClient["default"].convertToType(data['numberAnalysts'], 'Number');
        }

        if (data.hasOwnProperty('period')) {
          obj['period'] = _ApiClient["default"].convertToType(data['period'], 'Date');
        }
      }

      return obj;
    }
  }]);

  return EarningEstimate;
}();
/**
 * Average EPS estimates.
 * @member {Number} epsAvg
 */


EarningEstimate.prototype['epsAvg'] = undefined;
/**
 * Highest estimate.
 * @member {Number} epsHigh
 */

EarningEstimate.prototype['epsHigh'] = undefined;
/**
 * Lowest estimate.
 * @member {Number} epsLow
 */

EarningEstimate.prototype['epsLow'] = undefined;
/**
 * Number of Analysts.
 * @member {Number} numberAnalysts
 */

EarningEstimate.prototype['numberAnalysts'] = undefined;
/**
 * Period.
 * @member {Date} period
 */

EarningEstimate.prototype['period'] = undefined;
var _default = EarningEstimate;
exports.default = _default;

/***/ }),

/***/ 5186:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EarningRelease model module.
 * @module model/EarningRelease
 * @version 1.2.1
 */
var EarningRelease = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EarningRelease</code>.
   * @alias module:model/EarningRelease
   */
  function EarningRelease() {
    _classCallCheck(this, EarningRelease);

    EarningRelease.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EarningRelease, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EarningRelease</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EarningRelease} obj Optional instance to populate.
     * @return {module:model/EarningRelease} The populated <code>EarningRelease</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EarningRelease();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('date')) {
          obj['date'] = _ApiClient["default"].convertToType(data['date'], 'Date');
        }

        if (data.hasOwnProperty('hour')) {
          obj['hour'] = _ApiClient["default"].convertToType(data['hour'], 'String');
        }

        if (data.hasOwnProperty('year')) {
          obj['year'] = _ApiClient["default"].convertToType(data['year'], 'Number');
        }

        if (data.hasOwnProperty('quarter')) {
          obj['quarter'] = _ApiClient["default"].convertToType(data['quarter'], 'Number');
        }

        if (data.hasOwnProperty('epsEstimate')) {
          obj['epsEstimate'] = _ApiClient["default"].convertToType(data['epsEstimate'], 'Number');
        }

        if (data.hasOwnProperty('epsActual')) {
          obj['epsActual'] = _ApiClient["default"].convertToType(data['epsActual'], 'Number');
        }

        if (data.hasOwnProperty('revenueEstimate')) {
          obj['revenueEstimate'] = _ApiClient["default"].convertToType(data['revenueEstimate'], 'Number');
        }

        if (data.hasOwnProperty('revenueActual')) {
          obj['revenueActual'] = _ApiClient["default"].convertToType(data['revenueActual'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return EarningRelease;
}();
/**
 * Symbol.
 * @member {String} symbol
 */


EarningRelease.prototype['symbol'] = undefined;
/**
 * Date.
 * @member {Date} date
 */

EarningRelease.prototype['date'] = undefined;
/**
 * Indicates whether the earnings is announced before market open(<code>bmo</code>), after market close(<code>amc</code>), or during market hour(<code>dmh</code>).
 * @member {String} hour
 */

EarningRelease.prototype['hour'] = undefined;
/**
 * Earnings year.
 * @member {Number} year
 */

EarningRelease.prototype['year'] = undefined;
/**
 * Earnings quarter.
 * @member {Number} quarter
 */

EarningRelease.prototype['quarter'] = undefined;
/**
 * EPS estimate.
 * @member {Number} epsEstimate
 */

EarningRelease.prototype['epsEstimate'] = undefined;
/**
 * EPS actual.
 * @member {Number} epsActual
 */

EarningRelease.prototype['epsActual'] = undefined;
/**
 * Revenue estimate.
 * @member {Number} revenueEstimate
 */

EarningRelease.prototype['revenueEstimate'] = undefined;
/**
 * Revenue actual.
 * @member {Number} revenueActual
 */

EarningRelease.prototype['revenueActual'] = undefined;
var _default = EarningRelease;
exports.default = _default;

/***/ }),

/***/ 8711:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EarningResult model module.
 * @module model/EarningResult
 * @version 1.2.1
 */
var EarningResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EarningResult</code>.
   * @alias module:model/EarningResult
   */
  function EarningResult() {
    _classCallCheck(this, EarningResult);

    EarningResult.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EarningResult, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EarningResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EarningResult} obj Optional instance to populate.
     * @return {module:model/EarningResult} The populated <code>EarningResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EarningResult();

        if (data.hasOwnProperty('actual')) {
          obj['actual'] = _ApiClient["default"].convertToType(data['actual'], 'Number');
        }

        if (data.hasOwnProperty('estimate')) {
          obj['estimate'] = _ApiClient["default"].convertToType(data['estimate'], 'Number');
        }

        if (data.hasOwnProperty('period')) {
          obj['period'] = _ApiClient["default"].convertToType(data['period'], 'Date');
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }
      }

      return obj;
    }
  }]);

  return EarningResult;
}();
/**
 * Actual earning result.
 * @member {Number} actual
 */


EarningResult.prototype['actual'] = undefined;
/**
 * Estimated earning.
 * @member {Number} estimate
 */

EarningResult.prototype['estimate'] = undefined;
/**
 * Reported period.
 * @member {Date} period
 */

EarningResult.prototype['period'] = undefined;
/**
 * Company symbol.
 * @member {String} symbol
 */

EarningResult.prototype['symbol'] = undefined;
var _default = EarningResult;
exports.default = _default;

/***/ }),

/***/ 3124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EarningsCalendar model module.
 * @module model/EarningsCalendar
 * @version 1.2.1
 */
var EarningsCalendar = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EarningsCalendar</code>.
   * @alias module:model/EarningsCalendar
   */
  function EarningsCalendar() {
    _classCallCheck(this, EarningsCalendar);

    EarningsCalendar.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EarningsCalendar, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EarningsCalendar</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EarningsCalendar} obj Optional instance to populate.
     * @return {module:model/EarningsCalendar} The populated <code>EarningsCalendar</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EarningsCalendar();

        if (data.hasOwnProperty('earningsCalendar')) {
          obj['earningsCalendar'] = _ApiClient["default"].convertToType(data['earningsCalendar'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return EarningsCalendar;
}();
/**
 * Array of earnings release.
 * @member {Array.<Object>} earningsCalendar
 */


EarningsCalendar.prototype['earningsCalendar'] = undefined;
var _default = EarningsCalendar;
exports.default = _default;

/***/ }),

/***/ 3235:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EarningsCallTranscripts model module.
 * @module model/EarningsCallTranscripts
 * @version 1.2.1
 */
var EarningsCallTranscripts = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EarningsCallTranscripts</code>.
   * @alias module:model/EarningsCallTranscripts
   */
  function EarningsCallTranscripts() {
    _classCallCheck(this, EarningsCallTranscripts);

    EarningsCallTranscripts.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EarningsCallTranscripts, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EarningsCallTranscripts</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EarningsCallTranscripts} obj Optional instance to populate.
     * @return {module:model/EarningsCallTranscripts} The populated <code>EarningsCallTranscripts</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EarningsCallTranscripts();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('transcript')) {
          obj['transcript'] = _ApiClient["default"].convertToType(data['transcript'], [Object]);
        }

        if (data.hasOwnProperty('participant')) {
          obj['participant'] = _ApiClient["default"].convertToType(data['participant'], [Object]);
        }

        if (data.hasOwnProperty('audio')) {
          obj['audio'] = _ApiClient["default"].convertToType(data['audio'], 'String');
        }

        if (data.hasOwnProperty('id')) {
          obj['id'] = _ApiClient["default"].convertToType(data['id'], 'String');
        }

        if (data.hasOwnProperty('title')) {
          obj['title'] = _ApiClient["default"].convertToType(data['title'], 'String');
        }

        if (data.hasOwnProperty('time')) {
          obj['time'] = _ApiClient["default"].convertToType(data['time'], 'Date');
        }

        if (data.hasOwnProperty('year')) {
          obj['year'] = _ApiClient["default"].convertToType(data['year'], 'Number');
        }

        if (data.hasOwnProperty('quarter')) {
          obj['quarter'] = _ApiClient["default"].convertToType(data['quarter'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return EarningsCallTranscripts;
}();
/**
 * Company symbol.
 * @member {String} symbol
 */


EarningsCallTranscripts.prototype['symbol'] = undefined;
/**
 * Transcript content.
 * @member {Array.<Object>} transcript
 */

EarningsCallTranscripts.prototype['transcript'] = undefined;
/**
 * Participant list
 * @member {Array.<Object>} participant
 */

EarningsCallTranscripts.prototype['participant'] = undefined;
/**
 * Audio link.
 * @member {String} audio
 */

EarningsCallTranscripts.prototype['audio'] = undefined;
/**
 * Transcript's ID.
 * @member {String} id
 */

EarningsCallTranscripts.prototype['id'] = undefined;
/**
 * Title.
 * @member {String} title
 */

EarningsCallTranscripts.prototype['title'] = undefined;
/**
 * Time of the event.
 * @member {Date} time
 */

EarningsCallTranscripts.prototype['time'] = undefined;
/**
 * Year of earnings result in the case of earnings call transcript.
 * @member {Number} year
 */

EarningsCallTranscripts.prototype['year'] = undefined;
/**
 * Quarter of earnings result in the case of earnings call transcript.
 * @member {Number} quarter
 */

EarningsCallTranscripts.prototype['quarter'] = undefined;
var _default = EarningsCallTranscripts;
exports.default = _default;

/***/ }),

/***/ 927:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EarningsCallTranscriptsList model module.
 * @module model/EarningsCallTranscriptsList
 * @version 1.2.1
 */
var EarningsCallTranscriptsList = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EarningsCallTranscriptsList</code>.
   * @alias module:model/EarningsCallTranscriptsList
   */
  function EarningsCallTranscriptsList() {
    _classCallCheck(this, EarningsCallTranscriptsList);

    EarningsCallTranscriptsList.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EarningsCallTranscriptsList, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EarningsCallTranscriptsList</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EarningsCallTranscriptsList} obj Optional instance to populate.
     * @return {module:model/EarningsCallTranscriptsList} The populated <code>EarningsCallTranscriptsList</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EarningsCallTranscriptsList();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('transcripts')) {
          obj['transcripts'] = _ApiClient["default"].convertToType(data['transcripts'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return EarningsCallTranscriptsList;
}();
/**
 * Company symbol.
 * @member {String} symbol
 */


EarningsCallTranscriptsList.prototype['symbol'] = undefined;
/**
 * Array of transcripts' metadata
 * @member {Array.<Object>} transcripts
 */

EarningsCallTranscriptsList.prototype['transcripts'] = undefined;
var _default = EarningsCallTranscriptsList;
exports.default = _default;

/***/ }),

/***/ 5796:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EarningsEstimates model module.
 * @module model/EarningsEstimates
 * @version 1.2.1
 */
var EarningsEstimates = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EarningsEstimates</code>.
   * @alias module:model/EarningsEstimates
   */
  function EarningsEstimates() {
    _classCallCheck(this, EarningsEstimates);

    EarningsEstimates.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EarningsEstimates, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EarningsEstimates</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EarningsEstimates} obj Optional instance to populate.
     * @return {module:model/EarningsEstimates} The populated <code>EarningsEstimates</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EarningsEstimates();

        if (data.hasOwnProperty('data')) {
          obj['data'] = _ApiClient["default"].convertToType(data['data'], [Object]);
        }

        if (data.hasOwnProperty('freq')) {
          obj['freq'] = _ApiClient["default"].convertToType(data['freq'], 'String');
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }
      }

      return obj;
    }
  }]);

  return EarningsEstimates;
}();
/**
 * List of estimates
 * @member {Array.<Object>} data
 */


EarningsEstimates.prototype['data'] = undefined;
/**
 * Frequency: annual or quarterly.
 * @member {String} freq
 */

EarningsEstimates.prototype['freq'] = undefined;
/**
 * Company symbol.
 * @member {String} symbol
 */

EarningsEstimates.prototype['symbol'] = undefined;
var _default = EarningsEstimates;
exports.default = _default;

/***/ }),

/***/ 2366:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EconomicCalendar model module.
 * @module model/EconomicCalendar
 * @version 1.2.1
 */
var EconomicCalendar = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EconomicCalendar</code>.
   * @alias module:model/EconomicCalendar
   */
  function EconomicCalendar() {
    _classCallCheck(this, EconomicCalendar);

    EconomicCalendar.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EconomicCalendar, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EconomicCalendar</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EconomicCalendar} obj Optional instance to populate.
     * @return {module:model/EconomicCalendar} The populated <code>EconomicCalendar</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EconomicCalendar();

        if (data.hasOwnProperty('economicCalendar')) {
          obj['economicCalendar'] = _ApiClient["default"].convertToType(data['economicCalendar'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return EconomicCalendar;
}();
/**
 * Array of economic events.
 * @member {Array.<Object>} economicCalendar
 */


EconomicCalendar.prototype['economicCalendar'] = undefined;
var _default = EconomicCalendar;
exports.default = _default;

/***/ }),

/***/ 1787:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EconomicCode model module.
 * @module model/EconomicCode
 * @version 1.2.1
 */
var EconomicCode = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EconomicCode</code>.
   * @alias module:model/EconomicCode
   */
  function EconomicCode() {
    _classCallCheck(this, EconomicCode);

    EconomicCode.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EconomicCode, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EconomicCode</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EconomicCode} obj Optional instance to populate.
     * @return {module:model/EconomicCode} The populated <code>EconomicCode</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EconomicCode();

        if (data.hasOwnProperty('code')) {
          obj['code'] = _ApiClient["default"].convertToType(data['code'], 'String');
        }

        if (data.hasOwnProperty('country')) {
          obj['country'] = _ApiClient["default"].convertToType(data['country'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('unit')) {
          obj['unit'] = _ApiClient["default"].convertToType(data['unit'], 'String');
        }
      }

      return obj;
    }
  }]);

  return EconomicCode;
}();
/**
 * Finnhub economic code used to get historical data
 * @member {String} code
 */


EconomicCode.prototype['code'] = undefined;
/**
 * Country
 * @member {String} country
 */

EconomicCode.prototype['country'] = undefined;
/**
 * Indicator name
 * @member {String} name
 */

EconomicCode.prototype['name'] = undefined;
/**
 * Unit
 * @member {String} unit
 */

EconomicCode.prototype['unit'] = undefined;
var _default = EconomicCode;
exports.default = _default;

/***/ }),

/***/ 2296:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EconomicData model module.
 * @module model/EconomicData
 * @version 1.2.1
 */
var EconomicData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EconomicData</code>.
   * @alias module:model/EconomicData
   */
  function EconomicData() {
    _classCallCheck(this, EconomicData);

    EconomicData.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EconomicData, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EconomicData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EconomicData} obj Optional instance to populate.
     * @return {module:model/EconomicData} The populated <code>EconomicData</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EconomicData();

        if (data.hasOwnProperty('data')) {
          obj['data'] = _ApiClient["default"].convertToType(data['data'], [Object]);
        }

        if (data.hasOwnProperty('code')) {
          obj['code'] = _ApiClient["default"].convertToType(data['code'], 'String');
        }
      }

      return obj;
    }
  }]);

  return EconomicData;
}();
/**
 * Array of economic data for requested code.
 * @member {Array.<Object>} data
 */


EconomicData.prototype['data'] = undefined;
/**
 * Finnhub economic code
 * @member {String} code
 */

EconomicData.prototype['code'] = undefined;
var _default = EconomicData;
exports.default = _default;

/***/ }),

/***/ 3403:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The EconomicEvent model module.
 * @module model/EconomicEvent
 * @version 1.2.1
 */
var EconomicEvent = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EconomicEvent</code>.
   * @alias module:model/EconomicEvent
   */
  function EconomicEvent() {
    _classCallCheck(this, EconomicEvent);

    EconomicEvent.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(EconomicEvent, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>EconomicEvent</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EconomicEvent} obj Optional instance to populate.
     * @return {module:model/EconomicEvent} The populated <code>EconomicEvent</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EconomicEvent();

        if (data.hasOwnProperty('actual')) {
          obj['actual'] = _ApiClient["default"].convertToType(data['actual'], 'Number');
        }

        if (data.hasOwnProperty('prev')) {
          obj['prev'] = _ApiClient["default"].convertToType(data['prev'], 'Number');
        }

        if (data.hasOwnProperty('country')) {
          obj['country'] = _ApiClient["default"].convertToType(data['country'], 'String');
        }

        if (data.hasOwnProperty('unit')) {
          obj['unit'] = _ApiClient["default"].convertToType(data['unit'], 'String');
        }

        if (data.hasOwnProperty('estimate')) {
          obj['estimate'] = _ApiClient["default"].convertToType(data['estimate'], 'Number');
        }

        if (data.hasOwnProperty('event')) {
          obj['event'] = _ApiClient["default"].convertToType(data['event'], 'String');
        }

        if (data.hasOwnProperty('impact')) {
          obj['impact'] = _ApiClient["default"].convertToType(data['impact'], 'String');
        }

        if (data.hasOwnProperty('time')) {
          obj['time'] = _ApiClient["default"].convertToType(data['time'], 'String');
        }
      }

      return obj;
    }
  }]);

  return EconomicEvent;
}();
/**
 * Actual release
 * @member {Number} actual
 */


EconomicEvent.prototype['actual'] = undefined;
/**
 * Previous release
 * @member {Number} prev
 */

EconomicEvent.prototype['prev'] = undefined;
/**
 * Country
 * @member {String} country
 */

EconomicEvent.prototype['country'] = undefined;
/**
 * Unit
 * @member {String} unit
 */

EconomicEvent.prototype['unit'] = undefined;
/**
 * Estimate
 * @member {Number} estimate
 */

EconomicEvent.prototype['estimate'] = undefined;
/**
 * Event
 * @member {String} event
 */

EconomicEvent.prototype['event'] = undefined;
/**
 * Impact level
 * @member {String} impact
 */

EconomicEvent.prototype['impact'] = undefined;
/**
 * Release time
 * @member {String} time
 */

EconomicEvent.prototype['time'] = undefined;
var _default = EconomicEvent;
exports.default = _default;

/***/ }),

/***/ 1300:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Estimate model module.
 * @module model/Estimate
 * @version 1.2.1
 */
var Estimate = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Estimate</code>.
   * @alias module:model/Estimate
   */
  function Estimate() {
    _classCallCheck(this, Estimate);

    Estimate.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Estimate, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Estimate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Estimate} obj Optional instance to populate.
     * @return {module:model/Estimate} The populated <code>Estimate</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Estimate();

        if (data.hasOwnProperty('revenueAvg')) {
          obj['revenueAvg'] = _ApiClient["default"].convertToType(data['revenueAvg'], 'Number');
        }

        if (data.hasOwnProperty('revenueHigh')) {
          obj['revenueHigh'] = _ApiClient["default"].convertToType(data['revenueHigh'], 'Number');
        }

        if (data.hasOwnProperty('revenueLow')) {
          obj['revenueLow'] = _ApiClient["default"].convertToType(data['revenueLow'], 'Number');
        }

        if (data.hasOwnProperty('numberAnalysts')) {
          obj['numberAnalysts'] = _ApiClient["default"].convertToType(data['numberAnalysts'], 'Number');
        }

        if (data.hasOwnProperty('period')) {
          obj['period'] = _ApiClient["default"].convertToType(data['period'], 'Date');
        }
      }

      return obj;
    }
  }]);

  return Estimate;
}();
/**
 * Average revenue estimates.
 * @member {Number} revenueAvg
 */


Estimate.prototype['revenueAvg'] = undefined;
/**
 * Highest estimate.
 * @member {Number} revenueHigh
 */

Estimate.prototype['revenueHigh'] = undefined;
/**
 * Lowest estimate.
 * @member {Number} revenueLow
 */

Estimate.prototype['revenueLow'] = undefined;
/**
 * Number of Analysts.
 * @member {Number} numberAnalysts
 */

Estimate.prototype['numberAnalysts'] = undefined;
/**
 * Period.
 * @member {Date} period
 */

Estimate.prototype['period'] = undefined;
var _default = Estimate;
exports.default = _default;

/***/ }),

/***/ 7871:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Filing model module.
 * @module model/Filing
 * @version 1.2.1
 */
var Filing = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Filing</code>.
   * @alias module:model/Filing
   */
  function Filing() {
    _classCallCheck(this, Filing);

    Filing.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Filing, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Filing</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Filing} obj Optional instance to populate.
     * @return {module:model/Filing} The populated <code>Filing</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Filing();

        if (data.hasOwnProperty('accessNumber')) {
          obj['accessNumber'] = _ApiClient["default"].convertToType(data['accessNumber'], 'String');
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('cik')) {
          obj['cik'] = _ApiClient["default"].convertToType(data['cik'], 'String');
        }

        if (data.hasOwnProperty('form')) {
          obj['form'] = _ApiClient["default"].convertToType(data['form'], 'String');
        }

        if (data.hasOwnProperty('filedDate')) {
          obj['filedDate'] = _ApiClient["default"].convertToType(data['filedDate'], 'Date');
        }

        if (data.hasOwnProperty('acceptedDate')) {
          obj['acceptedDate'] = _ApiClient["default"].convertToType(data['acceptedDate'], 'Date');
        }

        if (data.hasOwnProperty('reportUrl')) {
          obj['reportUrl'] = _ApiClient["default"].convertToType(data['reportUrl'], 'String');
        }

        if (data.hasOwnProperty('filingUrl')) {
          obj['filingUrl'] = _ApiClient["default"].convertToType(data['filingUrl'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Filing;
}();
/**
 * Access number.
 * @member {String} accessNumber
 */


Filing.prototype['accessNumber'] = undefined;
/**
 * Symbol.
 * @member {String} symbol
 */

Filing.prototype['symbol'] = undefined;
/**
 * CIK.
 * @member {String} cik
 */

Filing.prototype['cik'] = undefined;
/**
 * Form type.
 * @member {String} form
 */

Filing.prototype['form'] = undefined;
/**
 * Filed date <code>%Y-%m-%d %H:%M:%S</code>.
 * @member {Date} filedDate
 */

Filing.prototype['filedDate'] = undefined;
/**
 * Accepted date <code>%Y-%m-%d %H:%M:%S</code>.
 * @member {Date} acceptedDate
 */

Filing.prototype['acceptedDate'] = undefined;
/**
 * Report's URL.
 * @member {String} reportUrl
 */

Filing.prototype['reportUrl'] = undefined;
/**
 * Filing's URL.
 * @member {String} filingUrl
 */

Filing.prototype['filingUrl'] = undefined;
var _default = Filing;
exports.default = _default;

/***/ }),

/***/ 2542:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The FinancialStatements model module.
 * @module model/FinancialStatements
 * @version 1.2.1
 */
var FinancialStatements = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>FinancialStatements</code>.
   * @alias module:model/FinancialStatements
   */
  function FinancialStatements() {
    _classCallCheck(this, FinancialStatements);

    FinancialStatements.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(FinancialStatements, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>FinancialStatements</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FinancialStatements} obj Optional instance to populate.
     * @return {module:model/FinancialStatements} The populated <code>FinancialStatements</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FinancialStatements();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('financials')) {
          obj['financials'] = _ApiClient["default"].convertToType(data['financials'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return FinancialStatements;
}();
/**
 * Symbol of the company.
 * @member {String} symbol
 */


FinancialStatements.prototype['symbol'] = undefined;
/**
 * An array of map of key, value pairs containing the data for each period.
 * @member {Array.<Object>} financials
 */

FinancialStatements.prototype['financials'] = undefined;
var _default = FinancialStatements;
exports.default = _default;

/***/ }),

/***/ 6599:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The FinancialsAsReported model module.
 * @module model/FinancialsAsReported
 * @version 1.2.1
 */
var FinancialsAsReported = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>FinancialsAsReported</code>.
   * @alias module:model/FinancialsAsReported
   */
  function FinancialsAsReported() {
    _classCallCheck(this, FinancialsAsReported);

    FinancialsAsReported.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(FinancialsAsReported, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>FinancialsAsReported</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FinancialsAsReported} obj Optional instance to populate.
     * @return {module:model/FinancialsAsReported} The populated <code>FinancialsAsReported</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FinancialsAsReported();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('cik')) {
          obj['cik'] = _ApiClient["default"].convertToType(data['cik'], 'String');
        }

        if (data.hasOwnProperty('data')) {
          obj['data'] = _ApiClient["default"].convertToType(data['data'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return FinancialsAsReported;
}();
/**
 * Symbol
 * @member {String} symbol
 */


FinancialsAsReported.prototype['symbol'] = undefined;
/**
 * CIK
 * @member {String} cik
 */

FinancialsAsReported.prototype['cik'] = undefined;
/**
 * Array of filings.
 * @member {Array.<Object>} data
 */

FinancialsAsReported.prototype['data'] = undefined;
var _default = FinancialsAsReported;
exports.default = _default;

/***/ }),

/***/ 3939:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ForexCandles model module.
 * @module model/ForexCandles
 * @version 1.2.1
 */
var ForexCandles = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ForexCandles</code>.
   * @alias module:model/ForexCandles
   */
  function ForexCandles() {
    _classCallCheck(this, ForexCandles);

    ForexCandles.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ForexCandles, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ForexCandles</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ForexCandles} obj Optional instance to populate.
     * @return {module:model/ForexCandles} The populated <code>ForexCandles</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ForexCandles();

        if (data.hasOwnProperty('o')) {
          obj['o'] = _ApiClient["default"].convertToType(data['o'], ['Number']);
        }

        if (data.hasOwnProperty('h')) {
          obj['h'] = _ApiClient["default"].convertToType(data['h'], ['Number']);
        }

        if (data.hasOwnProperty('l')) {
          obj['l'] = _ApiClient["default"].convertToType(data['l'], ['Number']);
        }

        if (data.hasOwnProperty('c')) {
          obj['c'] = _ApiClient["default"].convertToType(data['c'], ['Number']);
        }

        if (data.hasOwnProperty('v')) {
          obj['v'] = _ApiClient["default"].convertToType(data['v'], ['Number']);
        }

        if (data.hasOwnProperty('t')) {
          obj['t'] = _ApiClient["default"].convertToType(data['t'], ['Number']);
        }

        if (data.hasOwnProperty('s')) {
          obj['s'] = _ApiClient["default"].convertToType(data['s'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ForexCandles;
}();
/**
 * List of open prices for returned candles.
 * @member {Array.<Number>} o
 */


ForexCandles.prototype['o'] = undefined;
/**
 * List of high prices for returned candles.
 * @member {Array.<Number>} h
 */

ForexCandles.prototype['h'] = undefined;
/**
 * List of low prices for returned candles.
 * @member {Array.<Number>} l
 */

ForexCandles.prototype['l'] = undefined;
/**
 * List of close prices for returned candles.
 * @member {Array.<Number>} c
 */

ForexCandles.prototype['c'] = undefined;
/**
 * List of volume data for returned candles.
 * @member {Array.<Number>} v
 */

ForexCandles.prototype['v'] = undefined;
/**
 * List of timestamp for returned candles.
 * @member {Array.<Number>} t
 */

ForexCandles.prototype['t'] = undefined;
/**
 * Status of the response. This field can either be ok or no_data.
 * @member {String} s
 */

ForexCandles.prototype['s'] = undefined;
var _default = ForexCandles;
exports.default = _default;

/***/ }),

/***/ 403:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ForexSymbol model module.
 * @module model/ForexSymbol
 * @version 1.2.1
 */
var ForexSymbol = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ForexSymbol</code>.
   * @alias module:model/ForexSymbol
   */
  function ForexSymbol() {
    _classCallCheck(this, ForexSymbol);

    ForexSymbol.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ForexSymbol, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>ForexSymbol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ForexSymbol} obj Optional instance to populate.
     * @return {module:model/ForexSymbol} The populated <code>ForexSymbol</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ForexSymbol();

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }

        if (data.hasOwnProperty('displaySymbol')) {
          obj['displaySymbol'] = _ApiClient["default"].convertToType(data['displaySymbol'], 'String');
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ForexSymbol;
}();
/**
 * Symbol description
 * @member {String} description
 */


ForexSymbol.prototype['description'] = undefined;
/**
 * Display symbol name.
 * @member {String} displaySymbol
 */

ForexSymbol.prototype['displaySymbol'] = undefined;
/**
 * Unique symbol used to identify this symbol used in <code>/forex/candle</code> endpoint.
 * @member {String} symbol
 */

ForexSymbol.prototype['symbol'] = undefined;
var _default = ForexSymbol;
exports.default = _default;

/***/ }),

/***/ 3926:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Forexrates model module.
 * @module model/Forexrates
 * @version 1.2.1
 */
var Forexrates = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Forexrates</code>.
   * @alias module:model/Forexrates
   */
  function Forexrates() {
    _classCallCheck(this, Forexrates);

    Forexrates.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Forexrates, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Forexrates</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Forexrates} obj Optional instance to populate.
     * @return {module:model/Forexrates} The populated <code>Forexrates</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Forexrates();

        if (data.hasOwnProperty('base')) {
          obj['base'] = _ApiClient["default"].convertToType(data['base'], 'String');
        }

        if (data.hasOwnProperty('quote')) {
          obj['quote'] = _ApiClient["default"].convertToType(data['quote'], Object);
        }
      }

      return obj;
    }
  }]);

  return Forexrates;
}();
/**
 * Base currency.
 * @member {String} base
 */


Forexrates.prototype['base'] = undefined;
/**
 * @member {Object} quote
 */

Forexrates.prototype['quote'] = undefined;
var _default = Forexrates;
exports.default = _default;

/***/ }),

/***/ 4890:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The FundOwnership model module.
 * @module model/FundOwnership
 * @version 1.2.1
 */
var FundOwnership = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>FundOwnership</code>.
   * @alias module:model/FundOwnership
   */
  function FundOwnership() {
    _classCallCheck(this, FundOwnership);

    FundOwnership.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(FundOwnership, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>FundOwnership</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FundOwnership} obj Optional instance to populate.
     * @return {module:model/FundOwnership} The populated <code>FundOwnership</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FundOwnership();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('ownership')) {
          obj['ownership'] = _ApiClient["default"].convertToType(data['ownership'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return FundOwnership;
}();
/**
 * Symbol of the company.
 * @member {String} symbol
 */


FundOwnership.prototype['symbol'] = undefined;
/**
 * Array of investors with detailed information about their holdings.
 * @member {Array.<Object>} ownership
 */

FundOwnership.prototype['ownership'] = undefined;
var _default = FundOwnership;
exports.default = _default;

/***/ }),

/***/ 4854:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The IPOCalendar model module.
 * @module model/IPOCalendar
 * @version 1.2.1
 */
var IPOCalendar = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>IPOCalendar</code>.
   * @alias module:model/IPOCalendar
   */
  function IPOCalendar() {
    _classCallCheck(this, IPOCalendar);

    IPOCalendar.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(IPOCalendar, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>IPOCalendar</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IPOCalendar} obj Optional instance to populate.
     * @return {module:model/IPOCalendar} The populated <code>IPOCalendar</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new IPOCalendar();

        if (data.hasOwnProperty('ipoCalendar')) {
          obj['ipoCalendar'] = _ApiClient["default"].convertToType(data['ipoCalendar'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return IPOCalendar;
}();
/**
 * Array of IPO events.
 * @member {Array.<Object>} ipoCalendar
 */


IPOCalendar.prototype['ipoCalendar'] = undefined;
var _default = IPOCalendar;
exports.default = _default;

/***/ }),

/***/ 6925:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The IPOEvent model module.
 * @module model/IPOEvent
 * @version 1.2.1
 */
var IPOEvent = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>IPOEvent</code>.
   * @alias module:model/IPOEvent
   */
  function IPOEvent() {
    _classCallCheck(this, IPOEvent);

    IPOEvent.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(IPOEvent, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>IPOEvent</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IPOEvent} obj Optional instance to populate.
     * @return {module:model/IPOEvent} The populated <code>IPOEvent</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new IPOEvent();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('date')) {
          obj['date'] = _ApiClient["default"].convertToType(data['date'], 'Date');
        }

        if (data.hasOwnProperty('exchange')) {
          obj['exchange'] = _ApiClient["default"].convertToType(data['exchange'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('status')) {
          obj['status'] = _ApiClient["default"].convertToType(data['status'], 'String');
        }

        if (data.hasOwnProperty('price')) {
          obj['price'] = _ApiClient["default"].convertToType(data['price'], 'String');
        }

        if (data.hasOwnProperty('numberOfShares')) {
          obj['numberOfShares'] = _ApiClient["default"].convertToType(data['numberOfShares'], 'Number');
        }

        if (data.hasOwnProperty('totalSharesValue')) {
          obj['totalSharesValue'] = _ApiClient["default"].convertToType(data['totalSharesValue'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return IPOEvent;
}();
/**
 * Symbol.
 * @member {String} symbol
 */


IPOEvent.prototype['symbol'] = undefined;
/**
 * IPO date.
 * @member {Date} date
 */

IPOEvent.prototype['date'] = undefined;
/**
 * Exchange.
 * @member {String} exchange
 */

IPOEvent.prototype['exchange'] = undefined;
/**
 * Company's name.
 * @member {String} name
 */

IPOEvent.prototype['name'] = undefined;
/**
 * IPO status. Can take 1 of the following values: <code>expected</code>,<code>priced</code>,<code>withdrawn</code>,<code>filed</code>
 * @member {String} status
 */

IPOEvent.prototype['status'] = undefined;
/**
 * Projected price or price range.
 * @member {String} price
 */

IPOEvent.prototype['price'] = undefined;
/**
 * Number of shares offered during the IPO.
 * @member {Number} numberOfShares
 */

IPOEvent.prototype['numberOfShares'] = undefined;
/**
 * Total shares value.
 * @member {Number} totalSharesValue
 */

IPOEvent.prototype['totalSharesValue'] = undefined;
var _default = IPOEvent;
exports.default = _default;

/***/ }),

/***/ 3042:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The IndexHistoricalConstituent model module.
 * @module model/IndexHistoricalConstituent
 * @version 1.2.1
 */
var IndexHistoricalConstituent = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>IndexHistoricalConstituent</code>.
   * @alias module:model/IndexHistoricalConstituent
   */
  function IndexHistoricalConstituent() {
    _classCallCheck(this, IndexHistoricalConstituent);

    IndexHistoricalConstituent.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(IndexHistoricalConstituent, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>IndexHistoricalConstituent</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IndexHistoricalConstituent} obj Optional instance to populate.
     * @return {module:model/IndexHistoricalConstituent} The populated <code>IndexHistoricalConstituent</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new IndexHistoricalConstituent();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('action')) {
          obj['action'] = _ApiClient["default"].convertToType(data['action'], 'String');
        }

        if (data.hasOwnProperty('date')) {
          obj['date'] = _ApiClient["default"].convertToType(data['date'], 'Date');
        }
      }

      return obj;
    }
  }]);

  return IndexHistoricalConstituent;
}();
/**
 * Symbol
 * @member {String} symbol
 */


IndexHistoricalConstituent.prototype['symbol'] = undefined;
/**
 * <code>add</code> or <code>remove</code>.
 * @member {String} action
 */

IndexHistoricalConstituent.prototype['action'] = undefined;
/**
 * Date of joining or leaving the index.
 * @member {Date} date
 */

IndexHistoricalConstituent.prototype['date'] = undefined;
var _default = IndexHistoricalConstituent;
exports.default = _default;

/***/ }),

/***/ 1790:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Indicator model module.
 * @module model/Indicator
 * @version 1.2.1
 */
var Indicator = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Indicator</code>.
   * @alias module:model/Indicator
   */
  function Indicator() {
    _classCallCheck(this, Indicator);

    Indicator.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Indicator, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Indicator</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Indicator} obj Optional instance to populate.
     * @return {module:model/Indicator} The populated <code>Indicator</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Indicator();

        if (data.hasOwnProperty('buy')) {
          obj['buy'] = _ApiClient["default"].convertToType(data['buy'], 'Number');
        }

        if (data.hasOwnProperty('neutral')) {
          obj['neutral'] = _ApiClient["default"].convertToType(data['neutral'], 'Number');
        }

        if (data.hasOwnProperty('sell')) {
          obj['sell'] = _ApiClient["default"].convertToType(data['sell'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return Indicator;
}();
/**
 * Number of buy signals
 * @member {Number} buy
 */


Indicator.prototype['buy'] = undefined;
/**
 * Number of neutral signals
 * @member {Number} neutral
 */

Indicator.prototype['neutral'] = undefined;
/**
 * Number of sell signals
 * @member {Number} sell
 */

Indicator.prototype['sell'] = undefined;
var _default = Indicator;
exports.default = _default;

/***/ }),

/***/ 3219:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The IndicesConstituents model module.
 * @module model/IndicesConstituents
 * @version 1.2.1
 */
var IndicesConstituents = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>IndicesConstituents</code>.
   * @alias module:model/IndicesConstituents
   */
  function IndicesConstituents() {
    _classCallCheck(this, IndicesConstituents);

    IndicesConstituents.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(IndicesConstituents, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>IndicesConstituents</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IndicesConstituents} obj Optional instance to populate.
     * @return {module:model/IndicesConstituents} The populated <code>IndicesConstituents</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new IndicesConstituents();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('constituents')) {
          obj['constituents'] = _ApiClient["default"].convertToType(data['constituents'], ['String']);
        }
      }

      return obj;
    }
  }]);

  return IndicesConstituents;
}();
/**
 * Index's symbol.
 * @member {String} symbol
 */


IndicesConstituents.prototype['symbol'] = undefined;
/**
 * Array of constituents.
 * @member {Array.<String>} constituents
 */

IndicesConstituents.prototype['constituents'] = undefined;
var _default = IndicesConstituents;
exports.default = _default;

/***/ }),

/***/ 2464:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The IndicesHistoricalConstituents model module.
 * @module model/IndicesHistoricalConstituents
 * @version 1.2.1
 */
var IndicesHistoricalConstituents = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>IndicesHistoricalConstituents</code>.
   * @alias module:model/IndicesHistoricalConstituents
   */
  function IndicesHistoricalConstituents() {
    _classCallCheck(this, IndicesHistoricalConstituents);

    IndicesHistoricalConstituents.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(IndicesHistoricalConstituents, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>IndicesHistoricalConstituents</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IndicesHistoricalConstituents} obj Optional instance to populate.
     * @return {module:model/IndicesHistoricalConstituents} The populated <code>IndicesHistoricalConstituents</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new IndicesHistoricalConstituents();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('historicalConstituents')) {
          obj['historicalConstituents'] = _ApiClient["default"].convertToType(data['historicalConstituents'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return IndicesHistoricalConstituents;
}();
/**
 * Index's symbol.
 * @member {String} symbol
 */


IndicesHistoricalConstituents.prototype['symbol'] = undefined;
/**
 * Array of historical constituents.
 * @member {Array.<Object>} historicalConstituents
 */

IndicesHistoricalConstituents.prototype['historicalConstituents'] = undefined;
var _default = IndicesHistoricalConstituents;
exports.default = _default;

/***/ }),

/***/ 1995:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Investor model module.
 * @module model/Investor
 * @version 1.2.1
 */
var Investor = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Investor</code>.
   * @alias module:model/Investor
   */
  function Investor() {
    _classCallCheck(this, Investor);

    Investor.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Investor, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Investor</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Investor} obj Optional instance to populate.
     * @return {module:model/Investor} The populated <code>Investor</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Investor();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('share')) {
          obj['share'] = _ApiClient["default"].convertToType(data['share'], 'Number');
        }

        if (data.hasOwnProperty('change')) {
          obj['change'] = _ApiClient["default"].convertToType(data['change'], 'Number');
        }

        if (data.hasOwnProperty('filingDate')) {
          obj['filingDate'] = _ApiClient["default"].convertToType(data['filingDate'], 'Date');
        }
      }

      return obj;
    }
  }]);

  return Investor;
}();
/**
 * Investor's name.
 * @member {String} name
 */


Investor.prototype['name'] = undefined;
/**
 * Number of shares held by the investor.
 * @member {Number} share
 */

Investor.prototype['share'] = undefined;
/**
 * Number of share changed (net buy or sell) from the last period.
 * @member {Number} change
 */

Investor.prototype['change'] = undefined;
/**
 * Filing date.
 * @member {Date} filingDate
 */

Investor.prototype['filingDate'] = undefined;
var _default = Investor;
exports.default = _default;

/***/ }),

/***/ 2282:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The InvestorsOwnership model module.
 * @module model/InvestorsOwnership
 * @version 1.2.1
 */
var InvestorsOwnership = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>InvestorsOwnership</code>.
   * @alias module:model/InvestorsOwnership
   */
  function InvestorsOwnership() {
    _classCallCheck(this, InvestorsOwnership);

    InvestorsOwnership.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(InvestorsOwnership, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>InvestorsOwnership</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InvestorsOwnership} obj Optional instance to populate.
     * @return {module:model/InvestorsOwnership} The populated <code>InvestorsOwnership</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new InvestorsOwnership();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('ownership')) {
          obj['ownership'] = _ApiClient["default"].convertToType(data['ownership'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return InvestorsOwnership;
}();
/**
 * Symbol of the company.
 * @member {String} symbol
 */


InvestorsOwnership.prototype['symbol'] = undefined;
/**
 * Array of investors with detailed information about their holdings.
 * @member {Array.<Object>} ownership
 */

InvestorsOwnership.prototype['ownership'] = undefined;
var _default = InvestorsOwnership;
exports.default = _default;

/***/ }),

/***/ 5588:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The LastBidAsk model module.
 * @module model/LastBidAsk
 * @version 1.2.1
 */
var LastBidAsk = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>LastBidAsk</code>.
   * @alias module:model/LastBidAsk
   */
  function LastBidAsk() {
    _classCallCheck(this, LastBidAsk);

    LastBidAsk.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(LastBidAsk, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>LastBidAsk</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LastBidAsk} obj Optional instance to populate.
     * @return {module:model/LastBidAsk} The populated <code>LastBidAsk</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LastBidAsk();

        if (data.hasOwnProperty('b')) {
          obj['b'] = _ApiClient["default"].convertToType(data['b'], 'Number');
        }

        if (data.hasOwnProperty('a')) {
          obj['a'] = _ApiClient["default"].convertToType(data['a'], 'Number');
        }

        if (data.hasOwnProperty('bv')) {
          obj['bv'] = _ApiClient["default"].convertToType(data['bv'], 'Number');
        }

        if (data.hasOwnProperty('av')) {
          obj['av'] = _ApiClient["default"].convertToType(data['av'], 'Number');
        }

        if (data.hasOwnProperty('t')) {
          obj['t'] = _ApiClient["default"].convertToType(data['t'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return LastBidAsk;
}();
/**
 * Bid price.
 * @member {Number} b
 */


LastBidAsk.prototype['b'] = undefined;
/**
 * Ask price.
 * @member {Number} a
 */

LastBidAsk.prototype['a'] = undefined;
/**
 * Bid volume.
 * @member {Number} bv
 */

LastBidAsk.prototype['bv'] = undefined;
/**
 * Ask volume.
 * @member {Number} av
 */

LastBidAsk.prototype['av'] = undefined;
/**
 * Reference UNIX timestamp in ms.
 * @member {Number} t
 */

LastBidAsk.prototype['t'] = undefined;
var _default = LastBidAsk;
exports.default = _default;

/***/ }),

/***/ 3454:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The MajorDevelopments model module.
 * @module model/MajorDevelopments
 * @version 1.2.1
 */
var MajorDevelopments = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>MajorDevelopments</code>.
   * @alias module:model/MajorDevelopments
   */
  function MajorDevelopments() {
    _classCallCheck(this, MajorDevelopments);

    MajorDevelopments.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(MajorDevelopments, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>MajorDevelopments</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MajorDevelopments} obj Optional instance to populate.
     * @return {module:model/MajorDevelopments} The populated <code>MajorDevelopments</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new MajorDevelopments();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('majorDevelopment')) {
          obj['majorDevelopment'] = _ApiClient["default"].convertToType(data['majorDevelopment'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return MajorDevelopments;
}();
/**
 * Company symbol.
 * @member {String} symbol
 */


MajorDevelopments.prototype['symbol'] = undefined;
/**
 * Array of major developments.
 * @member {Array.<Object>} majorDevelopment
 */

MajorDevelopments.prototype['majorDevelopment'] = undefined;
var _default = MajorDevelopments;
exports.default = _default;

/***/ }),

/***/ 8425:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The News model module.
 * @module model/News
 * @version 1.2.1
 */
var News = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>News</code>.
   * @alias module:model/News
   */
  function News() {
    _classCallCheck(this, News);

    News.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(News, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>News</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/News} obj Optional instance to populate.
     * @return {module:model/News} The populated <code>News</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new News();

        if (data.hasOwnProperty('category')) {
          obj['category'] = _ApiClient["default"].convertToType(data['category'], 'String');
        }

        if (data.hasOwnProperty('datetime')) {
          obj['datetime'] = _ApiClient["default"].convertToType(data['datetime'], 'Number');
        }

        if (data.hasOwnProperty('headline')) {
          obj['headline'] = _ApiClient["default"].convertToType(data['headline'], 'String');
        }

        if (data.hasOwnProperty('id')) {
          obj['id'] = _ApiClient["default"].convertToType(data['id'], 'Number');
        }

        if (data.hasOwnProperty('image')) {
          obj['image'] = _ApiClient["default"].convertToType(data['image'], 'String');
        }

        if (data.hasOwnProperty('related')) {
          obj['related'] = _ApiClient["default"].convertToType(data['related'], 'String');
        }

        if (data.hasOwnProperty('source')) {
          obj['source'] = _ApiClient["default"].convertToType(data['source'], 'String');
        }

        if (data.hasOwnProperty('summary')) {
          obj['summary'] = _ApiClient["default"].convertToType(data['summary'], 'String');
        }

        if (data.hasOwnProperty('url')) {
          obj['url'] = _ApiClient["default"].convertToType(data['url'], 'String');
        }
      }

      return obj;
    }
  }]);

  return News;
}();
/**
 * News category.
 * @member {String} category
 */


News.prototype['category'] = undefined;
/**
 * Published time in UNIX timestamp.
 * @member {Number} datetime
 */

News.prototype['datetime'] = undefined;
/**
 * News headline.
 * @member {String} headline
 */

News.prototype['headline'] = undefined;
/**
 * News ID. This value can be used for <code>minId</code> params to get the latest news only.
 * @member {Number} id
 */

News.prototype['id'] = undefined;
/**
 * Thumbnail image URL.
 * @member {String} image
 */

News.prototype['image'] = undefined;
/**
 * Related stocks and companies mentioned in the article.
 * @member {String} related
 */

News.prototype['related'] = undefined;
/**
 * News source.
 * @member {String} source
 */

News.prototype['source'] = undefined;
/**
 * News summary.
 * @member {String} summary
 */

News.prototype['summary'] = undefined;
/**
 * URL of the original article.
 * @member {String} url
 */

News.prototype['url'] = undefined;
var _default = News;
exports.default = _default;

/***/ }),

/***/ 2731:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

var _CompanyNewsStatistics = _interopRequireDefault(__webpack_require__(6175));

var _Sentiment = _interopRequireDefault(__webpack_require__(6320));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The NewsSentiment model module.
 * @module model/NewsSentiment
 * @version 1.2.1
 */
var NewsSentiment = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>NewsSentiment</code>.
   * @alias module:model/NewsSentiment
   */
  function NewsSentiment() {
    _classCallCheck(this, NewsSentiment);

    NewsSentiment.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(NewsSentiment, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>NewsSentiment</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NewsSentiment} obj Optional instance to populate.
     * @return {module:model/NewsSentiment} The populated <code>NewsSentiment</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new NewsSentiment();

        if (data.hasOwnProperty('buzz')) {
          obj['buzz'] = _CompanyNewsStatistics["default"].constructFromObject(data['buzz']);
        }

        if (data.hasOwnProperty('companyNewsScore')) {
          obj['companyNewsScore'] = _ApiClient["default"].convertToType(data['companyNewsScore'], 'Number');
        }

        if (data.hasOwnProperty('sectorAverageBullishPercent')) {
          obj['sectorAverageBullishPercent'] = _ApiClient["default"].convertToType(data['sectorAverageBullishPercent'], 'Number');
        }

        if (data.hasOwnProperty('sectorAverageNewsScore')) {
          obj['sectorAverageNewsScore'] = _ApiClient["default"].convertToType(data['sectorAverageNewsScore'], 'Number');
        }

        if (data.hasOwnProperty('sentiment')) {
          obj['sentiment'] = _Sentiment["default"].constructFromObject(data['sentiment']);
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }
      }

      return obj;
    }
  }]);

  return NewsSentiment;
}();
/**
 * @member {module:model/CompanyNewsStatistics} buzz
 */


NewsSentiment.prototype['buzz'] = undefined;
/**
 * News score.
 * @member {Number} companyNewsScore
 */

NewsSentiment.prototype['companyNewsScore'] = undefined;
/**
 * Sector average bullish percent.
 * @member {Number} sectorAverageBullishPercent
 */

NewsSentiment.prototype['sectorAverageBullishPercent'] = undefined;
/**
 * Sectore average score.
 * @member {Number} sectorAverageNewsScore
 */

NewsSentiment.prototype['sectorAverageNewsScore'] = undefined;
/**
 * @member {module:model/Sentiment} sentiment
 */

NewsSentiment.prototype['sentiment'] = undefined;
/**
 * Requested symbol.
 * @member {String} symbol
 */

NewsSentiment.prototype['symbol'] = undefined;
var _default = NewsSentiment;
exports.default = _default;

/***/ }),

/***/ 8051:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The PatternRecognition model module.
 * @module model/PatternRecognition
 * @version 1.2.1
 */
var PatternRecognition = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>PatternRecognition</code>.
   * @alias module:model/PatternRecognition
   */
  function PatternRecognition() {
    _classCallCheck(this, PatternRecognition);

    PatternRecognition.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(PatternRecognition, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>PatternRecognition</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PatternRecognition} obj Optional instance to populate.
     * @return {module:model/PatternRecognition} The populated <code>PatternRecognition</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new PatternRecognition();

        if (data.hasOwnProperty('points')) {
          obj['points'] = _ApiClient["default"].convertToType(data['points'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return PatternRecognition;
}();
/**
 * Array of patterns.
 * @member {Array.<Object>} points
 */


PatternRecognition.prototype['points'] = undefined;
var _default = PatternRecognition;
exports.default = _default;

/***/ }),

/***/ 5875:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The PriceTarget model module.
 * @module model/PriceTarget
 * @version 1.2.1
 */
var PriceTarget = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>PriceTarget</code>.
   * @alias module:model/PriceTarget
   */
  function PriceTarget() {
    _classCallCheck(this, PriceTarget);

    PriceTarget.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(PriceTarget, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>PriceTarget</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PriceTarget} obj Optional instance to populate.
     * @return {module:model/PriceTarget} The populated <code>PriceTarget</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new PriceTarget();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('targetHigh')) {
          obj['targetHigh'] = _ApiClient["default"].convertToType(data['targetHigh'], 'Number');
        }

        if (data.hasOwnProperty('targetLow')) {
          obj['targetLow'] = _ApiClient["default"].convertToType(data['targetLow'], 'Number');
        }

        if (data.hasOwnProperty('targetMean')) {
          obj['targetMean'] = _ApiClient["default"].convertToType(data['targetMean'], 'Number');
        }

        if (data.hasOwnProperty('targetMedian')) {
          obj['targetMedian'] = _ApiClient["default"].convertToType(data['targetMedian'], 'Number');
        }

        if (data.hasOwnProperty('lastUpdated')) {
          obj['lastUpdated'] = _ApiClient["default"].convertToType(data['lastUpdated'], 'Date');
        }
      }

      return obj;
    }
  }]);

  return PriceTarget;
}();
/**
 * Company symbol.
 * @member {String} symbol
 */


PriceTarget.prototype['symbol'] = undefined;
/**
 * Highes analysts' target.
 * @member {Number} targetHigh
 */

PriceTarget.prototype['targetHigh'] = undefined;
/**
 * Lowest analysts' target.
 * @member {Number} targetLow
 */

PriceTarget.prototype['targetLow'] = undefined;
/**
 * Mean of all analysts' targets.
 * @member {Number} targetMean
 */

PriceTarget.prototype['targetMean'] = undefined;
/**
 * Median of all analysts' targets.
 * @member {Number} targetMedian
 */

PriceTarget.prototype['targetMedian'] = undefined;
/**
 * Updated time of the data
 * @member {Date} lastUpdated
 */

PriceTarget.prototype['lastUpdated'] = undefined;
var _default = PriceTarget;
exports.default = _default;

/***/ }),

/***/ 5089:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Quote model module.
 * @module model/Quote
 * @version 1.2.1
 */
var Quote = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Quote</code>.
   * @alias module:model/Quote
   */
  function Quote() {
    _classCallCheck(this, Quote);

    Quote.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Quote, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Quote</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Quote} obj Optional instance to populate.
     * @return {module:model/Quote} The populated <code>Quote</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Quote();

        if (data.hasOwnProperty('o')) {
          obj['o'] = _ApiClient["default"].convertToType(data['o'], 'Number');
        }

        if (data.hasOwnProperty('h')) {
          obj['h'] = _ApiClient["default"].convertToType(data['h'], 'Number');
        }

        if (data.hasOwnProperty('l')) {
          obj['l'] = _ApiClient["default"].convertToType(data['l'], 'Number');
        }

        if (data.hasOwnProperty('c')) {
          obj['c'] = _ApiClient["default"].convertToType(data['c'], 'Number');
        }

        if (data.hasOwnProperty('pc')) {
          obj['pc'] = _ApiClient["default"].convertToType(data['pc'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return Quote;
}();
/**
 * Open price of the day
 * @member {Number} o
 */


Quote.prototype['o'] = undefined;
/**
 * High price of the day
 * @member {Number} h
 */

Quote.prototype['h'] = undefined;
/**
 * Low price of the day
 * @member {Number} l
 */

Quote.prototype['l'] = undefined;
/**
 * Current price
 * @member {Number} c
 */

Quote.prototype['c'] = undefined;
/**
 * Previous close price
 * @member {Number} pc
 */

Quote.prototype['pc'] = undefined;
var _default = Quote;
exports.default = _default;

/***/ }),

/***/ 9495:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The RecommendationTrend model module.
 * @module model/RecommendationTrend
 * @version 1.2.1
 */
var RecommendationTrend = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>RecommendationTrend</code>.
   * @alias module:model/RecommendationTrend
   */
  function RecommendationTrend() {
    _classCallCheck(this, RecommendationTrend);

    RecommendationTrend.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(RecommendationTrend, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>RecommendationTrend</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RecommendationTrend} obj Optional instance to populate.
     * @return {module:model/RecommendationTrend} The populated <code>RecommendationTrend</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new RecommendationTrend();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('buy')) {
          obj['buy'] = _ApiClient["default"].convertToType(data['buy'], 'Number');
        }

        if (data.hasOwnProperty('hold')) {
          obj['hold'] = _ApiClient["default"].convertToType(data['hold'], 'Number');
        }

        if (data.hasOwnProperty('period')) {
          obj['period'] = _ApiClient["default"].convertToType(data['period'], 'String');
        }

        if (data.hasOwnProperty('sell')) {
          obj['sell'] = _ApiClient["default"].convertToType(data['sell'], 'Number');
        }

        if (data.hasOwnProperty('strongBuy')) {
          obj['strongBuy'] = _ApiClient["default"].convertToType(data['strongBuy'], 'Number');
        }

        if (data.hasOwnProperty('strongSell')) {
          obj['strongSell'] = _ApiClient["default"].convertToType(data['strongSell'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return RecommendationTrend;
}();
/**
 * Company symbol.
 * @member {String} symbol
 */


RecommendationTrend.prototype['symbol'] = undefined;
/**
 * Number of recommendations that fall into the Buy category
 * @member {Number} buy
 */

RecommendationTrend.prototype['buy'] = undefined;
/**
 * Number of recommendations that fall into the Hold category
 * @member {Number} hold
 */

RecommendationTrend.prototype['hold'] = undefined;
/**
 * Updated period
 * @member {String} period
 */

RecommendationTrend.prototype['period'] = undefined;
/**
 * Number of recommendations that fall into the Sell category
 * @member {Number} sell
 */

RecommendationTrend.prototype['sell'] = undefined;
/**
 * Number of recommendations that fall into the Strong Buy category
 * @member {Number} strongBuy
 */

RecommendationTrend.prototype['strongBuy'] = undefined;
/**
 * Number of recommendations that fall into the Strong Sell category
 * @member {Number} strongSell
 */

RecommendationTrend.prototype['strongSell'] = undefined;
var _default = RecommendationTrend;
exports.default = _default;

/***/ }),

/***/ 3180:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Report model module.
 * @module model/Report
 * @version 1.2.1
 */
var Report = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Report</code>.
   * @alias module:model/Report
   */
  function Report() {
    _classCallCheck(this, Report);

    Report.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Report, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Report</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Report} obj Optional instance to populate.
     * @return {module:model/Report} The populated <code>Report</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Report();

        if (data.hasOwnProperty('accessNumber')) {
          obj['accessNumber'] = _ApiClient["default"].convertToType(data['accessNumber'], 'String');
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('cik')) {
          obj['cik'] = _ApiClient["default"].convertToType(data['cik'], 'String');
        }

        if (data.hasOwnProperty('year')) {
          obj['year'] = _ApiClient["default"].convertToType(data['year'], 'Number');
        }

        if (data.hasOwnProperty('quarter')) {
          obj['quarter'] = _ApiClient["default"].convertToType(data['quarter'], 'Number');
        }

        if (data.hasOwnProperty('form')) {
          obj['form'] = _ApiClient["default"].convertToType(data['form'], 'String');
        }

        if (data.hasOwnProperty('startDate')) {
          obj['startDate'] = _ApiClient["default"].convertToType(data['startDate'], 'Date');
        }

        if (data.hasOwnProperty('endDate')) {
          obj['endDate'] = _ApiClient["default"].convertToType(data['endDate'], 'Date');
        }

        if (data.hasOwnProperty('filedDate')) {
          obj['filedDate'] = _ApiClient["default"].convertToType(data['filedDate'], 'Date');
        }

        if (data.hasOwnProperty('acceptedDate')) {
          obj['acceptedDate'] = _ApiClient["default"].convertToType(data['acceptedDate'], 'Date');
        }

        if (data.hasOwnProperty('report')) {
          obj['report'] = _ApiClient["default"].convertToType(data['report'], Object);
        }
      }

      return obj;
    }
  }]);

  return Report;
}();
/**
 * Access number.
 * @member {String} accessNumber
 */


Report.prototype['accessNumber'] = undefined;
/**
 * Symbol.
 * @member {String} symbol
 */

Report.prototype['symbol'] = undefined;
/**
 * CIK.
 * @member {String} cik
 */

Report.prototype['cik'] = undefined;
/**
 * Year.
 * @member {Number} year
 */

Report.prototype['year'] = undefined;
/**
 * Quarter.
 * @member {Number} quarter
 */

Report.prototype['quarter'] = undefined;
/**
 * Form type.
 * @member {String} form
 */

Report.prototype['form'] = undefined;
/**
 * Period start date <code>%Y-%m-%d %H:%M:%S</code>.
 * @member {Date} startDate
 */

Report.prototype['startDate'] = undefined;
/**
 * Period end date <code>%Y-%m-%d %H:%M:%S</code>.
 * @member {Date} endDate
 */

Report.prototype['endDate'] = undefined;
/**
 * Filed date <code>%Y-%m-%d %H:%M:%S</code>.
 * @member {Date} filedDate
 */

Report.prototype['filedDate'] = undefined;
/**
 * Accepted date <code>%Y-%m-%d %H:%M:%S</code>.
 * @member {Date} acceptedDate
 */

Report.prototype['acceptedDate'] = undefined;
/**
 * @member {Object} report
 */

Report.prototype['report'] = undefined;
var _default = Report;
exports.default = _default;

/***/ }),

/***/ 22:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The RevenueEstimates model module.
 * @module model/RevenueEstimates
 * @version 1.2.1
 */
var RevenueEstimates = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>RevenueEstimates</code>.
   * @alias module:model/RevenueEstimates
   */
  function RevenueEstimates() {
    _classCallCheck(this, RevenueEstimates);

    RevenueEstimates.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(RevenueEstimates, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>RevenueEstimates</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RevenueEstimates} obj Optional instance to populate.
     * @return {module:model/RevenueEstimates} The populated <code>RevenueEstimates</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new RevenueEstimates();

        if (data.hasOwnProperty('data')) {
          obj['data'] = _ApiClient["default"].convertToType(data['data'], [Object]);
        }

        if (data.hasOwnProperty('freq')) {
          obj['freq'] = _ApiClient["default"].convertToType(data['freq'], 'String');
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }
      }

      return obj;
    }
  }]);

  return RevenueEstimates;
}();
/**
 * List of estimates
 * @member {Array.<Object>} data
 */


RevenueEstimates.prototype['data'] = undefined;
/**
 * Frequency: annual or quarterly.
 * @member {String} freq
 */

RevenueEstimates.prototype['freq'] = undefined;
/**
 * Company symbol.
 * @member {String} symbol
 */

RevenueEstimates.prototype['symbol'] = undefined;
var _default = RevenueEstimates;
exports.default = _default;

/***/ }),

/***/ 6320:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Sentiment model module.
 * @module model/Sentiment
 * @version 1.2.1
 */
var Sentiment = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Sentiment</code>.
   * @alias module:model/Sentiment
   */
  function Sentiment() {
    _classCallCheck(this, Sentiment);

    Sentiment.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Sentiment, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Sentiment</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Sentiment} obj Optional instance to populate.
     * @return {module:model/Sentiment} The populated <code>Sentiment</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Sentiment();

        if (data.hasOwnProperty('bearishPercent')) {
          obj['bearishPercent'] = _ApiClient["default"].convertToType(data['bearishPercent'], 'Number');
        }

        if (data.hasOwnProperty('bullishPercent')) {
          obj['bullishPercent'] = _ApiClient["default"].convertToType(data['bullishPercent'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return Sentiment;
}();
/**
 * 
 * @member {Number} bearishPercent
 */


Sentiment.prototype['bearishPercent'] = undefined;
/**
 * 
 * @member {Number} bullishPercent
 */

Sentiment.prototype['bullishPercent'] = undefined;
var _default = Sentiment;
exports.default = _default;

/***/ }),

/***/ 498:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The SimilarityIndex model module.
 * @module model/SimilarityIndex
 * @version 1.2.1
 */
var SimilarityIndex = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SimilarityIndex</code>.
   * @alias module:model/SimilarityIndex
   */
  function SimilarityIndex() {
    _classCallCheck(this, SimilarityIndex);

    SimilarityIndex.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SimilarityIndex, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>SimilarityIndex</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SimilarityIndex} obj Optional instance to populate.
     * @return {module:model/SimilarityIndex} The populated <code>SimilarityIndex</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SimilarityIndex();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('cik')) {
          obj['cik'] = _ApiClient["default"].convertToType(data['cik'], 'String');
        }

        if (data.hasOwnProperty('similarity')) {
          obj['similarity'] = _ApiClient["default"].convertToType(data['similarity'], [Object]);
        }
      }

      return obj;
    }
  }]);

  return SimilarityIndex;
}();
/**
 * Symbol.
 * @member {String} symbol
 */


SimilarityIndex.prototype['symbol'] = undefined;
/**
 * CIK.
 * @member {String} cik
 */

SimilarityIndex.prototype['cik'] = undefined;
/**
 * Array of filings with its cosine similarity compared to the same report of the previous year.
 * @member {Array.<Object>} similarity
 */

SimilarityIndex.prototype['similarity'] = undefined;
var _default = SimilarityIndex;
exports.default = _default;

/***/ }),

/***/ 2156:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Split model module.
 * @module model/Split
 * @version 1.2.1
 */
var Split = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Split</code>.
   * @alias module:model/Split
   */
  function Split() {
    _classCallCheck(this, Split);

    Split.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Split, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Split</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Split} obj Optional instance to populate.
     * @return {module:model/Split} The populated <code>Split</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Split();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('date')) {
          obj['date'] = _ApiClient["default"].convertToType(data['date'], 'Date');
        }

        if (data.hasOwnProperty('fromFactor')) {
          obj['fromFactor'] = _ApiClient["default"].convertToType(data['fromFactor'], 'Number');
        }

        if (data.hasOwnProperty('toFactor')) {
          obj['toFactor'] = _ApiClient["default"].convertToType(data['toFactor'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return Split;
}();
/**
 * Symbol.
 * @member {String} symbol
 */


Split.prototype['symbol'] = undefined;
/**
 * Split date.
 * @member {Date} date
 */

Split.prototype['date'] = undefined;
/**
 * From factor.
 * @member {Number} fromFactor
 */

Split.prototype['fromFactor'] = undefined;
/**
 * To factor.
 * @member {Number} toFactor
 */

Split.prototype['toFactor'] = undefined;
var _default = Split;
exports.default = _default;

/***/ }),

/***/ 1853:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Stock model module.
 * @module model/Stock
 * @version 1.2.1
 */
var Stock = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Stock</code>.
   * @alias module:model/Stock
   */
  function Stock() {
    _classCallCheck(this, Stock);

    Stock.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Stock, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Stock</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Stock} obj Optional instance to populate.
     * @return {module:model/Stock} The populated <code>Stock</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Stock();

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }

        if (data.hasOwnProperty('displaySymbol')) {
          obj['displaySymbol'] = _ApiClient["default"].convertToType(data['displaySymbol'], 'String');
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }

        if (data.hasOwnProperty('currency')) {
          obj['currency'] = _ApiClient["default"].convertToType(data['currency'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Stock;
}();
/**
 * Symbol description
 * @member {String} description
 */


Stock.prototype['description'] = undefined;
/**
 * Display symbol name.
 * @member {String} displaySymbol
 */

Stock.prototype['displaySymbol'] = undefined;
/**
 * Unique symbol used to identify this symbol used in <code>/stock/candle</code> endpoint.
 * @member {String} symbol
 */

Stock.prototype['symbol'] = undefined;
/**
 * Security type.
 * @member {String} type
 */

Stock.prototype['type'] = undefined;
/**
 * Price's currency. This might be different from the reporting currency of fundamental data.
 * @member {String} currency
 */

Stock.prototype['currency'] = undefined;
var _default = Stock;
exports.default = _default;

/***/ }),

/***/ 6224:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The StockCandles model module.
 * @module model/StockCandles
 * @version 1.2.1
 */
var StockCandles = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>StockCandles</code>.
   * @alias module:model/StockCandles
   */
  function StockCandles() {
    _classCallCheck(this, StockCandles);

    StockCandles.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(StockCandles, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>StockCandles</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StockCandles} obj Optional instance to populate.
     * @return {module:model/StockCandles} The populated <code>StockCandles</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new StockCandles();

        if (data.hasOwnProperty('o')) {
          obj['o'] = _ApiClient["default"].convertToType(data['o'], ['Number']);
        }

        if (data.hasOwnProperty('h')) {
          obj['h'] = _ApiClient["default"].convertToType(data['h'], ['Number']);
        }

        if (data.hasOwnProperty('l')) {
          obj['l'] = _ApiClient["default"].convertToType(data['l'], ['Number']);
        }

        if (data.hasOwnProperty('c')) {
          obj['c'] = _ApiClient["default"].convertToType(data['c'], ['Number']);
        }

        if (data.hasOwnProperty('v')) {
          obj['v'] = _ApiClient["default"].convertToType(data['v'], ['Number']);
        }

        if (data.hasOwnProperty('t')) {
          obj['t'] = _ApiClient["default"].convertToType(data['t'], ['Number']);
        }

        if (data.hasOwnProperty('s')) {
          obj['s'] = _ApiClient["default"].convertToType(data['s'], 'String');
        }
      }

      return obj;
    }
  }]);

  return StockCandles;
}();
/**
 * List of open prices for returned candles.
 * @member {Array.<Number>} o
 */


StockCandles.prototype['o'] = undefined;
/**
 * List of high prices for returned candles.
 * @member {Array.<Number>} h
 */

StockCandles.prototype['h'] = undefined;
/**
 * List of low prices for returned candles.
 * @member {Array.<Number>} l
 */

StockCandles.prototype['l'] = undefined;
/**
 * List of close prices for returned candles.
 * @member {Array.<Number>} c
 */

StockCandles.prototype['c'] = undefined;
/**
 * List of volume data for returned candles.
 * @member {Array.<Number>} v
 */

StockCandles.prototype['v'] = undefined;
/**
 * List of timestamp for returned candles.
 * @member {Array.<Number>} t
 */

StockCandles.prototype['t'] = undefined;
/**
 * Status of the response. This field can either be ok or no_data.
 * @member {String} s
 */

StockCandles.prototype['s'] = undefined;
var _default = StockCandles;
exports.default = _default;

/***/ }),

/***/ 6037:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The StockTranscripts model module.
 * @module model/StockTranscripts
 * @version 1.2.1
 */
var StockTranscripts = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>StockTranscripts</code>.
   * @alias module:model/StockTranscripts
   */
  function StockTranscripts() {
    _classCallCheck(this, StockTranscripts);

    StockTranscripts.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(StockTranscripts, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>StockTranscripts</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StockTranscripts} obj Optional instance to populate.
     * @return {module:model/StockTranscripts} The populated <code>StockTranscripts</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new StockTranscripts();

        if (data.hasOwnProperty('id')) {
          obj['id'] = _ApiClient["default"].convertToType(data['id'], 'String');
        }

        if (data.hasOwnProperty('title')) {
          obj['title'] = _ApiClient["default"].convertToType(data['title'], 'String');
        }

        if (data.hasOwnProperty('time')) {
          obj['time'] = _ApiClient["default"].convertToType(data['time'], 'Date');
        }

        if (data.hasOwnProperty('year')) {
          obj['year'] = _ApiClient["default"].convertToType(data['year'], 'Number');
        }

        if (data.hasOwnProperty('quarter')) {
          obj['quarter'] = _ApiClient["default"].convertToType(data['quarter'], 'Number');
        }
      }

      return obj;
    }
  }]);

  return StockTranscripts;
}();
/**
 * Transcript's ID used to get the <a href=\"#transcripts\">full transcript</a>.
 * @member {String} id
 */


StockTranscripts.prototype['id'] = undefined;
/**
 * Title.
 * @member {String} title
 */

StockTranscripts.prototype['title'] = undefined;
/**
 * Time of the event.
 * @member {Date} time
 */

StockTranscripts.prototype['time'] = undefined;
/**
 * Year of earnings result in the case of earnings call transcript.
 * @member {Number} year
 */

StockTranscripts.prototype['year'] = undefined;
/**
 * Quarter of earnings result in the case of earnings call transcript.
 * @member {Number} quarter
 */

StockTranscripts.prototype['quarter'] = undefined;
var _default = StockTranscripts;
exports.default = _default;

/***/ }),

/***/ 9125:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The SupportResistance model module.
 * @module model/SupportResistance
 * @version 1.2.1
 */
var SupportResistance = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SupportResistance</code>.
   * @alias module:model/SupportResistance
   */
  function SupportResistance() {
    _classCallCheck(this, SupportResistance);

    SupportResistance.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SupportResistance, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>SupportResistance</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SupportResistance} obj Optional instance to populate.
     * @return {module:model/SupportResistance} The populated <code>SupportResistance</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SupportResistance();

        if (data.hasOwnProperty('levels')) {
          obj['levels'] = _ApiClient["default"].convertToType(data['levels'], ['Number']);
        }
      }

      return obj;
    }
  }]);

  return SupportResistance;
}();
/**
 * Array of support and resistance levels.
 * @member {Array.<Number>} levels
 */


SupportResistance.prototype['levels'] = undefined;
var _default = SupportResistance;
exports.default = _default;

/***/ }),

/***/ 9931:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

var _Indicator = _interopRequireDefault(__webpack_require__(1790));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The TechnicalAnalysis model module.
 * @module model/TechnicalAnalysis
 * @version 1.2.1
 */
var TechnicalAnalysis = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>TechnicalAnalysis</code>.
   * @alias module:model/TechnicalAnalysis
   */
  function TechnicalAnalysis() {
    _classCallCheck(this, TechnicalAnalysis);

    TechnicalAnalysis.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(TechnicalAnalysis, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>TechnicalAnalysis</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TechnicalAnalysis} obj Optional instance to populate.
     * @return {module:model/TechnicalAnalysis} The populated <code>TechnicalAnalysis</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new TechnicalAnalysis();

        if (data.hasOwnProperty('count')) {
          obj['count'] = _Indicator["default"].constructFromObject(data['count']);
        }

        if (data.hasOwnProperty('signal')) {
          obj['signal'] = _ApiClient["default"].convertToType(data['signal'], 'String');
        }
      }

      return obj;
    }
  }]);

  return TechnicalAnalysis;
}();
/**
 * @member {module:model/Indicator} count
 */


TechnicalAnalysis.prototype['count'] = undefined;
/**
 * Aggregate Signal
 * @member {String} signal
 */

TechnicalAnalysis.prototype['signal'] = undefined;
var _default = TechnicalAnalysis;
exports.default = _default;

/***/ }),

/***/ 7110:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The TickData model module.
 * @module model/TickData
 * @version 1.2.1
 */
var TickData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>TickData</code>.
   * @alias module:model/TickData
   */
  function TickData() {
    _classCallCheck(this, TickData);

    TickData.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(TickData, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>TickData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TickData} obj Optional instance to populate.
     * @return {module:model/TickData} The populated <code>TickData</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new TickData();

        if (data.hasOwnProperty('s')) {
          obj['s'] = _ApiClient["default"].convertToType(data['s'], 'String');
        }

        if (data.hasOwnProperty('skip')) {
          obj['skip'] = _ApiClient["default"].convertToType(data['skip'], 'Number');
        }

        if (data.hasOwnProperty('count')) {
          obj['count'] = _ApiClient["default"].convertToType(data['count'], 'Number');
        }

        if (data.hasOwnProperty('total')) {
          obj['total'] = _ApiClient["default"].convertToType(data['total'], 'Number');
        }

        if (data.hasOwnProperty('v')) {
          obj['v'] = _ApiClient["default"].convertToType(data['v'], ['Number']);
        }

        if (data.hasOwnProperty('p')) {
          obj['p'] = _ApiClient["default"].convertToType(data['p'], ['Number']);
        }

        if (data.hasOwnProperty('t')) {
          obj['t'] = _ApiClient["default"].convertToType(data['t'], ['Number']);
        }

        if (data.hasOwnProperty('x')) {
          obj['x'] = _ApiClient["default"].convertToType(data['x'], ['String']);
        }
      }

      return obj;
    }
  }]);

  return TickData;
}();
/**
 * Symbol.
 * @member {String} s
 */


TickData.prototype['s'] = undefined;
/**
 * Number of ticks skipped.
 * @member {Number} skip
 */

TickData.prototype['skip'] = undefined;
/**
 * Number of ticks returned. If <code>count</code> < <code>limit</code>, all data for that date has been returned.
 * @member {Number} count
 */

TickData.prototype['count'] = undefined;
/**
 * Total number of ticks for that date.
 * @member {Number} total
 */

TickData.prototype['total'] = undefined;
/**
 * List of volume data.
 * @member {Array.<Number>} v
 */

TickData.prototype['v'] = undefined;
/**
 * List of price data.
 * @member {Array.<Number>} p
 */

TickData.prototype['p'] = undefined;
/**
 * List of timestamp in UNIX ms.
 * @member {Array.<Number>} t
 */

TickData.prototype['t'] = undefined;
/**
 * List of venues/exchanges.
 * @member {Array.<String>} x
 */

TickData.prototype['x'] = undefined;
var _default = TickData;
exports.default = _default;

/***/ }),

/***/ 9237:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The TranscriptContent model module.
 * @module model/TranscriptContent
 * @version 1.2.1
 */
var TranscriptContent = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>TranscriptContent</code>.
   * @alias module:model/TranscriptContent
   */
  function TranscriptContent() {
    _classCallCheck(this, TranscriptContent);

    TranscriptContent.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(TranscriptContent, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>TranscriptContent</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TranscriptContent} obj Optional instance to populate.
     * @return {module:model/TranscriptContent} The populated <code>TranscriptContent</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new TranscriptContent();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('speech')) {
          obj['speech'] = _ApiClient["default"].convertToType(data['speech'], ['String']);
        }
      }

      return obj;
    }
  }]);

  return TranscriptContent;
}();
/**
 * Speaker's name
 * @member {String} name
 */


TranscriptContent.prototype['name'] = undefined;
/**
 * Speaker's speech
 * @member {Array.<String>} speech
 */

TranscriptContent.prototype['speech'] = undefined;
var _default = TranscriptContent;
exports.default = _default;

/***/ }),

/***/ 1850:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The TranscriptParticipant model module.
 * @module model/TranscriptParticipant
 * @version 1.2.1
 */
var TranscriptParticipant = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>TranscriptParticipant</code>.
   * @alias module:model/TranscriptParticipant
   */
  function TranscriptParticipant() {
    _classCallCheck(this, TranscriptParticipant);

    TranscriptParticipant.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(TranscriptParticipant, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>TranscriptParticipant</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TranscriptParticipant} obj Optional instance to populate.
     * @return {module:model/TranscriptParticipant} The populated <code>TranscriptParticipant</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new TranscriptParticipant();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('description')) {
          obj['description'] = _ApiClient["default"].convertToType(data['description'], 'String');
        }
      }

      return obj;
    }
  }]);

  return TranscriptParticipant;
}();
/**
 * Participant's name
 * @member {String} name
 */


TranscriptParticipant.prototype['name'] = undefined;
/**
 * Participant's description
 * @member {String} description
 */

TranscriptParticipant.prototype['description'] = undefined;
var _default = TranscriptParticipant;
exports.default = _default;

/***/ }),

/***/ 3994:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Trend model module.
 * @module model/Trend
 * @version 1.2.1
 */
var Trend = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Trend</code>.
   * @alias module:model/Trend
   */
  function Trend() {
    _classCallCheck(this, Trend);

    Trend.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Trend, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>Trend</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Trend} obj Optional instance to populate.
     * @return {module:model/Trend} The populated <code>Trend</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Trend();

        if (data.hasOwnProperty('adx')) {
          obj['adx'] = _ApiClient["default"].convertToType(data['adx'], 'Number');
        }

        if (data.hasOwnProperty('trending')) {
          obj['trending'] = _ApiClient["default"].convertToType(data['trending'], 'Boolean');
        }
      }

      return obj;
    }
  }]);

  return Trend;
}();
/**
 * ADX reading
 * @member {Number} adx
 */


Trend.prototype['adx'] = undefined;
/**
 * Whether market is trending or going sideway
 * @member {Boolean} trending
 */

Trend.prototype['trending'] = undefined;
var _default = Trend;
exports.default = _default;

/***/ }),

/***/ 8610:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ApiClient = _interopRequireDefault(__webpack_require__(313));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The UpgradeDowngrade model module.
 * @module model/UpgradeDowngrade
 * @version 1.2.1
 */
var UpgradeDowngrade = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UpgradeDowngrade</code>.
   * @alias module:model/UpgradeDowngrade
   */
  function UpgradeDowngrade() {
    _classCallCheck(this, UpgradeDowngrade);

    UpgradeDowngrade.initialize(this);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UpgradeDowngrade, null, [{
    key: "initialize",
    value: function initialize(obj) {}
    /**
     * Constructs a <code>UpgradeDowngrade</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpgradeDowngrade} obj Optional instance to populate.
     * @return {module:model/UpgradeDowngrade} The populated <code>UpgradeDowngrade</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UpgradeDowngrade();

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }

        if (data.hasOwnProperty('gradeTime')) {
          obj['gradeTime'] = _ApiClient["default"].convertToType(data['gradeTime'], 'Number');
        }

        if (data.hasOwnProperty('fromGrade')) {
          obj['fromGrade'] = _ApiClient["default"].convertToType(data['fromGrade'], 'String');
        }

        if (data.hasOwnProperty('toGrade')) {
          obj['toGrade'] = _ApiClient["default"].convertToType(data['toGrade'], 'String');
        }

        if (data.hasOwnProperty('company')) {
          obj['company'] = _ApiClient["default"].convertToType(data['company'], 'String');
        }

        if (data.hasOwnProperty('action')) {
          obj['action'] = _ApiClient["default"].convertToType(data['action'], 'String');
        }
      }

      return obj;
    }
  }]);

  return UpgradeDowngrade;
}();
/**
 * Company symbol.
 * @member {String} symbol
 */


UpgradeDowngrade.prototype['symbol'] = undefined;
/**
 * Upgrade/downgrade time in UNIX timestamp.
 * @member {Number} gradeTime
 */

UpgradeDowngrade.prototype['gradeTime'] = undefined;
/**
 * From grade.
 * @member {String} fromGrade
 */

UpgradeDowngrade.prototype['fromGrade'] = undefined;
/**
 * To grade.
 * @member {String} toGrade
 */

UpgradeDowngrade.prototype['toGrade'] = undefined;
/**
 * Company/analyst who did the upgrade/downgrade.
 * @member {String} company
 */

UpgradeDowngrade.prototype['company'] = undefined;
/**
 * Action can take any of the following values: <code>up(upgrade), down(downgrade), main(maintains), init(initiate), reit(reiterate)</code>.
 * @member {String} action
 */

UpgradeDowngrade.prototype['action'] = undefined;
var _default = UpgradeDowngrade;
exports.default = _default;

/***/ })

}]);