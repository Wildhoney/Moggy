module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = moggy;
	
	var _utility = __webpack_require__(1);
	
	/**
	 * @method apply
	 * @param {Object|Array} value
	 * @return {Object}
	 */
	function moggy(value) {
	  return (0, _utility.extend)(value);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.each = each;
	exports.isFunction = isFunction;
	exports.patch = patch;
	exports.extend = extend;
	/**
	 * @method each
	 * @param {Object} proto
	 * @param {Function} fn
	 * @return {void}
	 */
	function each(proto, fn) {
	  Object.getOwnPropertyNames(proto).forEach(fn);
	}
	
	/**
	 * @method isFunction
	 * @param {*} a
	 * @return {Boolean}
	 */
	function isFunction(a) {
	  return typeof a === 'function';
	}
	
	/**
	 * @method patch
	 * @param {Object} proto
	 * @param {String} name
	 * @param {Function} fn
	 * @return {*}
	 */
	function patch(proto, name, fn) {
	
	  Object.defineProperty(proto, name, {
	
	    /**
	     * @constant configurable
	     * @type {Boolean}
	     */
	    configurable: false,
	
	    /**
	     * @constant writable
	     * @type {Boolean}
	     */
	    writable: false,
	
	    /**
	     * @constant enumerable
	     * @type {Boolean}
	     */
	    enumerable: false,
	
	    /**
	     * @method value
	     * @param {*} args
	     * @return {*}
	     */
	    value: function (...args) {
	      return fn(this, ...args);
	    }
	
	  });
	}
	
	/**
	 * @method extend
	 * @param {*} value
	 * @return {Object}
	 */
	function extend(value) {
	
	  /**
	   * @constant prototype
	   * @type {Object}
	   */
	  const { prototype } = value.constructor;
	
	  /**
	   * @class Immutable
	   * @extends {Function} value.constructor
	   */
	  class Immutable extends value.constructor {}
	
	  each(prototype, name => isFunction(prototype[name]) && patch(Immutable.prototype, name, (context, ...args) => {
	
	    // Make a copy of the object which removes the immutability.
	    const extensibleContext = [...context];
	
	    try {
	
	      // Attempt to apply a function which we'll assume doesn't have any side-effects.
	      return prototype[name].apply(context, args);
	    } catch (e) {
	
	      // However if the function did in fact attempt to mutate the frozen object, then we'll
	      // handle that gracefully, and return a tuple of the result and its side-effect.
	      const result = prototype[name].apply(extensibleContext, args);
	      return Object.freeze([extensibleContext, result]);
	    }
	  }));
	
	  return Object.freeze(Array.isArray(value) ? new Immutable(...value) : new Immutable(value));
	}

/***/ }
/******/ ]);