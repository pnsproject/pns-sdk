(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key2 of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key2) && key2 !== "default")
          __defProp(target, key2, { get: () => module[key2], enumerable: !(desc = __getOwnPropDesc(module, key2)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup3 = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup3[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup3[num >> 18 & 63] + lookup3[num >> 12 & 63] + lookup3[num >> 6 & 63] + lookup3[num & 63];
      }
      function encodeChunk(uint8, start2, end) {
        var tmp;
        var output = [];
        for (var i2 = start2; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(lookup3[tmp >> 2] + lookup3[tmp << 4 & 63] + "==");
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(lookup3[tmp >> 10] + lookup3[tmp >> 4 & 63] + lookup3[tmp << 2 & 63] + "=");
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer3;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError('The "string" argument must be of type string. Received type number');
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError('The "value" argument must not be of type number. Received type number');
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b)
          return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array))
          a = Buffer3.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array))
          b = Buffer3.from(b, b.offset, b.byteLength);
        if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
          throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        }
        if (a === b)
          return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat2(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf))
                buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(buffer, buf, pos);
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0)
          return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start2, end) {
        let loweredCase = false;
        if (start2 === void 0 || start2 < 0) {
          start2 = 0;
        }
        if (start2 > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start2 >>>= 0;
        if (end <= start2) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start2, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start2, end);
            case "ascii":
              return asciiSlice(this, start2, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start2, end);
            case "base64":
              return base64Slice(this, start2, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start2, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b) {
        if (!Buffer3.isBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect4() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start2, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
        }
        if (start2 === void 0) {
          start2 = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start2 < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start2 >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start2 >= end) {
          return 1;
        }
        start2 >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        let x = thisEnd - thisStart;
        let y = end - start2;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start2, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found)
              return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON2() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start2, end) {
        if (start2 === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start2, end));
        }
      }
      function utf8Slice(buf, start2, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start2;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        }
        return res;
      }
      function asciiSlice(buf, start2, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start2; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start2, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start2; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start2, end) {
        const len = buf.length;
        if (!start2 || start2 < 0)
          start2 = 0;
        if (!end || end < 0 || end > len)
          end = len;
        let out = "";
        for (let i = start2; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start2, end) {
        const bytes = buf.slice(start2, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start2, end) {
        const len = this.length;
        start2 = ~~start2;
        end = end === void 0 ? len : ~~end;
        if (start2 < 0) {
          start2 += len;
          if (start2 < 0)
            start2 = 0;
        } else if (start2 > len) {
          start2 = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start2)
          end = start2;
        const newBuf = this.subarray(start2, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul3 = 1;
        let i = 0;
        while (++i < byteLength2 && (mul3 *= 256)) {
          val += this[offset + i] * mul3;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul3 = 1;
        while (byteLength2 > 0 && (mul3 *= 256)) {
          val += this[offset + --byteLength2] * mul3;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul3 = 1;
        let i = 0;
        while (++i < byteLength2 && (mul3 *= 256)) {
          val += this[offset + i] * mul3;
        }
        mul3 *= 128;
        if (val >= mul3)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul3 = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul3 *= 256)) {
          val += this[offset + --i] * mul3;
        }
        mul3 *= 128;
        if (val >= mul3)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul3 = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul3 *= 256)) {
          this[offset + i] = value / mul3 & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul3 = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul3 *= 256)) {
          this[offset + i] = value / mul3 & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul3 = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul3 *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul3 >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul3 = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul3 *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul3 >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start2, end) {
        if (!Buffer3.isBuffer(target))
          throw new TypeError("argument should be a Buffer");
        if (!start2)
          start2 = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start2)
          end = start2;
        if (end === start2)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start2 < 0 || start2 >= this.length)
          throw new RangeError("Index out of range");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start2) {
          end = target.length - targetStart + start2;
        }
        const len = end - start2;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start2, end);
        } else {
          Uint8Array.prototype.set.call(target, this.subarray(start2, end), targetStart);
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start2, end, encoding) {
        if (typeof val === "string") {
          if (typeof start2 === "string") {
            encoding = start2;
            start2 = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start2 < 0 || this.length < start2 || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start2) {
          return this;
        }
        start2 = start2 >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start2; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start2; ++i) {
            this[i + start2] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E("ERR_BUFFER_OUT_OF_BOUNDS", function(name2) {
        if (name2) {
          return `${name2} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      }, RangeError);
      E("ERR_INVALID_ARG_TYPE", function(name2, actual) {
        return `The "${name2}" argument must be of type number. Received type ${typeof actual}`;
      }, TypeError);
      E("ERR_OUT_OF_RANGE", function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      }, RangeError);
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start2 = val[0] === "-" ? 1 : 0;
        for (; i >= start2 + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name2) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name2, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/js-sha3/src/sha3.js
  var require_sha3 = __commonJS({
    "node_modules/js-sha3/src/sha3.js"(exports, module) {
      (function() {
        "use strict";
        var root = typeof window === "object" ? window : {};
        var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
        if (NODE_JS) {
          root = global;
        }
        var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module === "object" && module.exports;
        var HEX_CHARS = "0123456789abcdef".split("");
        var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
        var KECCAK_PADDING = [1, 256, 65536, 16777216];
        var PADDING = [6, 1536, 393216, 100663296];
        var SHIFT = [0, 8, 16, 24];
        var RC = [
          1,
          0,
          32898,
          0,
          32906,
          2147483648,
          2147516416,
          2147483648,
          32907,
          0,
          2147483649,
          0,
          2147516545,
          2147483648,
          32777,
          2147483648,
          138,
          0,
          136,
          0,
          2147516425,
          0,
          2147483658,
          0,
          2147516555,
          0,
          139,
          2147483648,
          32905,
          2147483648,
          32771,
          2147483648,
          32770,
          2147483648,
          128,
          2147483648,
          32778,
          0,
          2147483658,
          2147483648,
          2147516545,
          2147483648,
          32896,
          2147483648,
          2147483649,
          0,
          2147516424,
          2147483648
        ];
        var BITS = [224, 256, 384, 512];
        var SHAKE_BITS = [128, 256];
        var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array"];
        var createOutputMethod = function(bits2, padding2, outputType) {
          return function(message) {
            return new Keccak(bits2, padding2, bits2).update(message)[outputType]();
          };
        };
        var createShakeOutputMethod = function(bits2, padding2, outputType) {
          return function(message, outputBits) {
            return new Keccak(bits2, padding2, outputBits).update(message)[outputType]();
          };
        };
        var createMethod = function(bits2, padding2) {
          var method = createOutputMethod(bits2, padding2, "hex");
          method.create = function() {
            return new Keccak(bits2, padding2, bits2);
          };
          method.update = function(message) {
            return method.create().update(message);
          };
          for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
            var type = OUTPUT_TYPES[i2];
            method[type] = createOutputMethod(bits2, padding2, type);
          }
          return method;
        };
        var createShakeMethod = function(bits2, padding2) {
          var method = createShakeOutputMethod(bits2, padding2, "hex");
          method.create = function(outputBits) {
            return new Keccak(bits2, padding2, outputBits);
          };
          method.update = function(message, outputBits) {
            return method.create(outputBits).update(message);
          };
          for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
            var type = OUTPUT_TYPES[i2];
            method[type] = createShakeOutputMethod(bits2, padding2, type);
          }
          return method;
        };
        var algorithms = [
          { name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod },
          { name: "sha3", padding: PADDING, bits: BITS, createMethod },
          { name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod }
        ];
        var methods = {}, methodNames = [];
        for (var i = 0; i < algorithms.length; ++i) {
          var algorithm = algorithms[i];
          var bits = algorithm.bits;
          for (var j = 0; j < bits.length; ++j) {
            var methodName = algorithm.name + "_" + bits[j];
            methodNames.push(methodName);
            methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
          }
        }
        function Keccak(bits2, padding2, outputBits) {
          this.blocks = [];
          this.s = [];
          this.padding = padding2;
          this.outputBits = outputBits;
          this.reset = true;
          this.block = 0;
          this.start = 0;
          this.blockCount = 1600 - (bits2 << 1) >> 5;
          this.byteCount = this.blockCount << 2;
          this.outputBlocks = outputBits >> 5;
          this.extraBytes = (outputBits & 31) >> 3;
          for (var i2 = 0; i2 < 50; ++i2) {
            this.s[i2] = 0;
          }
        }
        Keccak.prototype.update = function(message) {
          var notString = typeof message !== "string";
          if (notString && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          }
          var length = message.length, blocks = this.blocks, byteCount = this.byteCount, blockCount = this.blockCount, index = 0, s = this.s, i2, code;
          while (index < length) {
            if (this.reset) {
              this.reset = false;
              blocks[0] = this.block;
              for (i2 = 1; i2 < blockCount + 1; ++i2) {
                blocks[i2] = 0;
              }
            }
            if (notString) {
              for (i2 = this.start; index < length && i2 < byteCount; ++index) {
                blocks[i2 >> 2] |= message[index] << SHIFT[i2++ & 3];
              }
            } else {
              for (i2 = this.start; index < length && i2 < byteCount; ++index) {
                code = message.charCodeAt(index);
                if (code < 128) {
                  blocks[i2 >> 2] |= code << SHIFT[i2++ & 3];
                } else if (code < 2048) {
                  blocks[i2 >> 2] |= (192 | code >> 6) << SHIFT[i2++ & 3];
                  blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
                } else if (code < 55296 || code >= 57344) {
                  blocks[i2 >> 2] |= (224 | code >> 12) << SHIFT[i2++ & 3];
                  blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
                  blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
                } else {
                  code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  blocks[i2 >> 2] |= (240 | code >> 18) << SHIFT[i2++ & 3];
                  blocks[i2 >> 2] |= (128 | code >> 12 & 63) << SHIFT[i2++ & 3];
                  blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3];
                  blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3];
                }
              }
            }
            this.lastByteIndex = i2;
            if (i2 >= byteCount) {
              this.start = i2 - byteCount;
              this.block = blocks[blockCount];
              for (i2 = 0; i2 < blockCount; ++i2) {
                s[i2] ^= blocks[i2];
              }
              f(s);
              this.reset = true;
            } else {
              this.start = i2;
            }
          }
          return this;
        };
        Keccak.prototype.finalize = function() {
          var blocks = this.blocks, i2 = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
          blocks[i2 >> 2] |= this.padding[i2 & 3];
          if (this.lastByteIndex === this.byteCount) {
            blocks[0] = blocks[blockCount];
            for (i2 = 1; i2 < blockCount + 1; ++i2) {
              blocks[i2] = 0;
            }
          }
          blocks[blockCount - 1] |= 2147483648;
          for (i2 = 0; i2 < blockCount; ++i2) {
            s[i2] ^= blocks[i2];
          }
          f(s);
        };
        Keccak.prototype.toString = Keccak.prototype.hex = function() {
          this.finalize();
          var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
          var hex2 = "", block;
          while (j2 < outputBlocks) {
            for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
              block = s[i2];
              hex2 += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
            }
            if (j2 % blockCount === 0) {
              f(s);
              i2 = 0;
            }
          }
          if (extraBytes) {
            block = s[i2];
            if (extraBytes > 0) {
              hex2 += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
            }
            if (extraBytes > 1) {
              hex2 += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
            }
            if (extraBytes > 2) {
              hex2 += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
            }
          }
          return hex2;
        };
        Keccak.prototype.arrayBuffer = function() {
          this.finalize();
          var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
          var bytes = this.outputBits >> 3;
          var buffer;
          if (extraBytes) {
            buffer = new ArrayBuffer(outputBlocks + 1 << 2);
          } else {
            buffer = new ArrayBuffer(bytes);
          }
          var array = new Uint32Array(buffer);
          while (j2 < outputBlocks) {
            for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
              array[j2] = s[i2];
            }
            if (j2 % blockCount === 0) {
              f(s);
            }
          }
          if (extraBytes) {
            array[i2] = s[i2];
            buffer = buffer.slice(0, bytes);
          }
          return buffer;
        };
        Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;
        Keccak.prototype.digest = Keccak.prototype.array = function() {
          this.finalize();
          var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
          var array = [], offset, block;
          while (j2 < outputBlocks) {
            for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
              offset = j2 << 2;
              block = s[i2];
              array[offset] = block & 255;
              array[offset + 1] = block >> 8 & 255;
              array[offset + 2] = block >> 16 & 255;
              array[offset + 3] = block >> 24 & 255;
            }
            if (j2 % blockCount === 0) {
              f(s);
            }
          }
          if (extraBytes) {
            offset = j2 << 2;
            block = s[i2];
            if (extraBytes > 0) {
              array[offset] = block & 255;
            }
            if (extraBytes > 1) {
              array[offset + 1] = block >> 8 & 255;
            }
            if (extraBytes > 2) {
              array[offset + 2] = block >> 16 & 255;
            }
          }
          return array;
        };
        var f = function(s) {
          var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
          for (n = 0; n < 48; n += 2) {
            c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
            c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
            c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
            c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
            c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
            c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
            c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
            c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
            c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
            c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
            h = c8 ^ (c2 << 1 | c3 >>> 31);
            l = c9 ^ (c3 << 1 | c2 >>> 31);
            s[0] ^= h;
            s[1] ^= l;
            s[10] ^= h;
            s[11] ^= l;
            s[20] ^= h;
            s[21] ^= l;
            s[30] ^= h;
            s[31] ^= l;
            s[40] ^= h;
            s[41] ^= l;
            h = c0 ^ (c4 << 1 | c5 >>> 31);
            l = c1 ^ (c5 << 1 | c4 >>> 31);
            s[2] ^= h;
            s[3] ^= l;
            s[12] ^= h;
            s[13] ^= l;
            s[22] ^= h;
            s[23] ^= l;
            s[32] ^= h;
            s[33] ^= l;
            s[42] ^= h;
            s[43] ^= l;
            h = c2 ^ (c6 << 1 | c7 >>> 31);
            l = c3 ^ (c7 << 1 | c6 >>> 31);
            s[4] ^= h;
            s[5] ^= l;
            s[14] ^= h;
            s[15] ^= l;
            s[24] ^= h;
            s[25] ^= l;
            s[34] ^= h;
            s[35] ^= l;
            s[44] ^= h;
            s[45] ^= l;
            h = c4 ^ (c8 << 1 | c9 >>> 31);
            l = c5 ^ (c9 << 1 | c8 >>> 31);
            s[6] ^= h;
            s[7] ^= l;
            s[16] ^= h;
            s[17] ^= l;
            s[26] ^= h;
            s[27] ^= l;
            s[36] ^= h;
            s[37] ^= l;
            s[46] ^= h;
            s[47] ^= l;
            h = c6 ^ (c0 << 1 | c1 >>> 31);
            l = c7 ^ (c1 << 1 | c0 >>> 31);
            s[8] ^= h;
            s[9] ^= l;
            s[18] ^= h;
            s[19] ^= l;
            s[28] ^= h;
            s[29] ^= l;
            s[38] ^= h;
            s[39] ^= l;
            s[48] ^= h;
            s[49] ^= l;
            b0 = s[0];
            b1 = s[1];
            b32 = s[11] << 4 | s[10] >>> 28;
            b33 = s[10] << 4 | s[11] >>> 28;
            b14 = s[20] << 3 | s[21] >>> 29;
            b15 = s[21] << 3 | s[20] >>> 29;
            b46 = s[31] << 9 | s[30] >>> 23;
            b47 = s[30] << 9 | s[31] >>> 23;
            b28 = s[40] << 18 | s[41] >>> 14;
            b29 = s[41] << 18 | s[40] >>> 14;
            b20 = s[2] << 1 | s[3] >>> 31;
            b21 = s[3] << 1 | s[2] >>> 31;
            b2 = s[13] << 12 | s[12] >>> 20;
            b3 = s[12] << 12 | s[13] >>> 20;
            b34 = s[22] << 10 | s[23] >>> 22;
            b35 = s[23] << 10 | s[22] >>> 22;
            b16 = s[33] << 13 | s[32] >>> 19;
            b17 = s[32] << 13 | s[33] >>> 19;
            b48 = s[42] << 2 | s[43] >>> 30;
            b49 = s[43] << 2 | s[42] >>> 30;
            b40 = s[5] << 30 | s[4] >>> 2;
            b41 = s[4] << 30 | s[5] >>> 2;
            b22 = s[14] << 6 | s[15] >>> 26;
            b23 = s[15] << 6 | s[14] >>> 26;
            b4 = s[25] << 11 | s[24] >>> 21;
            b5 = s[24] << 11 | s[25] >>> 21;
            b36 = s[34] << 15 | s[35] >>> 17;
            b37 = s[35] << 15 | s[34] >>> 17;
            b18 = s[45] << 29 | s[44] >>> 3;
            b19 = s[44] << 29 | s[45] >>> 3;
            b10 = s[6] << 28 | s[7] >>> 4;
            b11 = s[7] << 28 | s[6] >>> 4;
            b42 = s[17] << 23 | s[16] >>> 9;
            b43 = s[16] << 23 | s[17] >>> 9;
            b24 = s[26] << 25 | s[27] >>> 7;
            b25 = s[27] << 25 | s[26] >>> 7;
            b6 = s[36] << 21 | s[37] >>> 11;
            b7 = s[37] << 21 | s[36] >>> 11;
            b38 = s[47] << 24 | s[46] >>> 8;
            b39 = s[46] << 24 | s[47] >>> 8;
            b30 = s[8] << 27 | s[9] >>> 5;
            b31 = s[9] << 27 | s[8] >>> 5;
            b12 = s[18] << 20 | s[19] >>> 12;
            b13 = s[19] << 20 | s[18] >>> 12;
            b44 = s[29] << 7 | s[28] >>> 25;
            b45 = s[28] << 7 | s[29] >>> 25;
            b26 = s[38] << 8 | s[39] >>> 24;
            b27 = s[39] << 8 | s[38] >>> 24;
            b8 = s[48] << 14 | s[49] >>> 18;
            b9 = s[49] << 14 | s[48] >>> 18;
            s[0] = b0 ^ ~b2 & b4;
            s[1] = b1 ^ ~b3 & b5;
            s[10] = b10 ^ ~b12 & b14;
            s[11] = b11 ^ ~b13 & b15;
            s[20] = b20 ^ ~b22 & b24;
            s[21] = b21 ^ ~b23 & b25;
            s[30] = b30 ^ ~b32 & b34;
            s[31] = b31 ^ ~b33 & b35;
            s[40] = b40 ^ ~b42 & b44;
            s[41] = b41 ^ ~b43 & b45;
            s[2] = b2 ^ ~b4 & b6;
            s[3] = b3 ^ ~b5 & b7;
            s[12] = b12 ^ ~b14 & b16;
            s[13] = b13 ^ ~b15 & b17;
            s[22] = b22 ^ ~b24 & b26;
            s[23] = b23 ^ ~b25 & b27;
            s[32] = b32 ^ ~b34 & b36;
            s[33] = b33 ^ ~b35 & b37;
            s[42] = b42 ^ ~b44 & b46;
            s[43] = b43 ^ ~b45 & b47;
            s[4] = b4 ^ ~b6 & b8;
            s[5] = b5 ^ ~b7 & b9;
            s[14] = b14 ^ ~b16 & b18;
            s[15] = b15 ^ ~b17 & b19;
            s[24] = b24 ^ ~b26 & b28;
            s[25] = b25 ^ ~b27 & b29;
            s[34] = b34 ^ ~b36 & b38;
            s[35] = b35 ^ ~b37 & b39;
            s[44] = b44 ^ ~b46 & b48;
            s[45] = b45 ^ ~b47 & b49;
            s[6] = b6 ^ ~b8 & b0;
            s[7] = b7 ^ ~b9 & b1;
            s[16] = b16 ^ ~b18 & b10;
            s[17] = b17 ^ ~b19 & b11;
            s[26] = b26 ^ ~b28 & b20;
            s[27] = b27 ^ ~b29 & b21;
            s[36] = b36 ^ ~b38 & b30;
            s[37] = b37 ^ ~b39 & b31;
            s[46] = b46 ^ ~b48 & b40;
            s[47] = b47 ^ ~b49 & b41;
            s[8] = b8 ^ ~b0 & b2;
            s[9] = b9 ^ ~b1 & b3;
            s[18] = b18 ^ ~b10 & b12;
            s[19] = b19 ^ ~b11 & b13;
            s[28] = b28 ^ ~b20 & b22;
            s[29] = b29 ^ ~b21 & b23;
            s[38] = b38 ^ ~b30 & b32;
            s[39] = b39 ^ ~b31 & b33;
            s[48] = b48 ^ ~b40 & b42;
            s[49] = b49 ^ ~b41 & b43;
            s[0] ^= RC[n];
            s[1] ^= RC[n + 1];
          }
        };
        if (COMMON_JS) {
          module.exports = methods;
        } else {
          for (var i = 0; i < methodNames.length; ++i) {
            root[methodNames[i]] = methods[methodNames[i]];
          }
        }
      })();
    }
  });

  // (disabled):node_modules/buffer/index.js
  var require_buffer2 = __commonJS({
    "(disabled):node_modules/buffer/index.js"() {
    }
  });

  // node_modules/bn.js/lib/bn.js
  var require_bn = __commonJS({
    "node_modules/bn.js/lib/bn.js"(exports, module) {
      (function(module2, exports2) {
        "use strict";
        function assert2(val, msg) {
          if (!val)
            throw new Error(msg || "Assertion failed");
        }
        function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
        function BN3(number, base2, endian) {
          if (BN3.isBN(number)) {
            return number;
          }
          this.negative = 0;
          this.words = null;
          this.length = 0;
          this.red = null;
          if (number !== null) {
            if (base2 === "le" || base2 === "be") {
              endian = base2;
              base2 = 10;
            }
            this._init(number || 0, base2 || 10, endian || "be");
          }
        }
        if (typeof module2 === "object") {
          module2.exports = BN3;
        } else {
          exports2.BN = BN3;
        }
        BN3.BN = BN3;
        BN3.wordSize = 26;
        var Buffer3;
        try {
          if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
            Buffer3 = window.Buffer;
          } else {
            Buffer3 = require_buffer2().Buffer;
          }
        } catch (e) {
        }
        BN3.isBN = function isBN(num) {
          if (num instanceof BN3) {
            return true;
          }
          return num !== null && typeof num === "object" && num.constructor.wordSize === BN3.wordSize && Array.isArray(num.words);
        };
        BN3.max = function max(left, right) {
          if (left.cmp(right) > 0)
            return left;
          return right;
        };
        BN3.min = function min(left, right) {
          if (left.cmp(right) < 0)
            return left;
          return right;
        };
        BN3.prototype._init = function init2(number, base2, endian) {
          if (typeof number === "number") {
            return this._initNumber(number, base2, endian);
          }
          if (typeof number === "object") {
            return this._initArray(number, base2, endian);
          }
          if (base2 === "hex") {
            base2 = 16;
          }
          assert2(base2 === (base2 | 0) && base2 >= 2 && base2 <= 36);
          number = number.toString().replace(/\s+/g, "");
          var start2 = 0;
          if (number[0] === "-") {
            start2++;
            this.negative = 1;
          }
          if (start2 < number.length) {
            if (base2 === 16) {
              this._parseHex(number, start2, endian);
            } else {
              this._parseBase(number, base2, start2);
              if (endian === "le") {
                this._initArray(this.toArray(), base2, endian);
              }
            }
          }
        };
        BN3.prototype._initNumber = function _initNumber(number, base2, endian) {
          if (number < 0) {
            this.negative = 1;
            number = -number;
          }
          if (number < 67108864) {
            this.words = [number & 67108863];
            this.length = 1;
          } else if (number < 4503599627370496) {
            this.words = [
              number & 67108863,
              number / 67108864 & 67108863
            ];
            this.length = 2;
          } else {
            assert2(number < 9007199254740992);
            this.words = [
              number & 67108863,
              number / 67108864 & 67108863,
              1
            ];
            this.length = 3;
          }
          if (endian !== "le")
            return;
          this._initArray(this.toArray(), base2, endian);
        };
        BN3.prototype._initArray = function _initArray(number, base2, endian) {
          assert2(typeof number.length === "number");
          if (number.length <= 0) {
            this.words = [0];
            this.length = 1;
            return this;
          }
          this.length = Math.ceil(number.length / 3);
          this.words = new Array(this.length);
          for (var i = 0; i < this.length; i++) {
            this.words[i] = 0;
          }
          var j, w;
          var off = 0;
          if (endian === "be") {
            for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
              w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
              this.words[j] |= w << off & 67108863;
              this.words[j + 1] = w >>> 26 - off & 67108863;
              off += 24;
              if (off >= 26) {
                off -= 26;
                j++;
              }
            }
          } else if (endian === "le") {
            for (i = 0, j = 0; i < number.length; i += 3) {
              w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
              this.words[j] |= w << off & 67108863;
              this.words[j + 1] = w >>> 26 - off & 67108863;
              off += 24;
              if (off >= 26) {
                off -= 26;
                j++;
              }
            }
          }
          return this.strip();
        };
        function parseHex4Bits(string, index) {
          var c = string.charCodeAt(index);
          if (c >= 65 && c <= 70) {
            return c - 55;
          } else if (c >= 97 && c <= 102) {
            return c - 87;
          } else {
            return c - 48 & 15;
          }
        }
        function parseHexByte(string, lowerBound, index) {
          var r = parseHex4Bits(string, index);
          if (index - 1 >= lowerBound) {
            r |= parseHex4Bits(string, index - 1) << 4;
          }
          return r;
        }
        BN3.prototype._parseHex = function _parseHex(number, start2, endian) {
          this.length = Math.ceil((number.length - start2) / 6);
          this.words = new Array(this.length);
          for (var i = 0; i < this.length; i++) {
            this.words[i] = 0;
          }
          var off = 0;
          var j = 0;
          var w;
          if (endian === "be") {
            for (i = number.length - 1; i >= start2; i -= 2) {
              w = parseHexByte(number, start2, i) << off;
              this.words[j] |= w & 67108863;
              if (off >= 18) {
                off -= 18;
                j += 1;
                this.words[j] |= w >>> 26;
              } else {
                off += 8;
              }
            }
          } else {
            var parseLength = number.length - start2;
            for (i = parseLength % 2 === 0 ? start2 + 1 : start2; i < number.length; i += 2) {
              w = parseHexByte(number, start2, i) << off;
              this.words[j] |= w & 67108863;
              if (off >= 18) {
                off -= 18;
                j += 1;
                this.words[j] |= w >>> 26;
              } else {
                off += 8;
              }
            }
          }
          this.strip();
        };
        function parseBase(str, start2, end, mul3) {
          var r = 0;
          var len = Math.min(str.length, end);
          for (var i = start2; i < len; i++) {
            var c = str.charCodeAt(i) - 48;
            r *= mul3;
            if (c >= 49) {
              r += c - 49 + 10;
            } else if (c >= 17) {
              r += c - 17 + 10;
            } else {
              r += c;
            }
          }
          return r;
        }
        BN3.prototype._parseBase = function _parseBase(number, base2, start2) {
          this.words = [0];
          this.length = 1;
          for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base2) {
            limbLen++;
          }
          limbLen--;
          limbPow = limbPow / base2 | 0;
          var total = number.length - start2;
          var mod = total % limbLen;
          var end = Math.min(total, total - mod) + start2;
          var word = 0;
          for (var i = start2; i < end; i += limbLen) {
            word = parseBase(number, i, i + limbLen, base2);
            this.imuln(limbPow);
            if (this.words[0] + word < 67108864) {
              this.words[0] += word;
            } else {
              this._iaddn(word);
            }
          }
          if (mod !== 0) {
            var pow = 1;
            word = parseBase(number, i, number.length, base2);
            for (i = 0; i < mod; i++) {
              pow *= base2;
            }
            this.imuln(pow);
            if (this.words[0] + word < 67108864) {
              this.words[0] += word;
            } else {
              this._iaddn(word);
            }
          }
          this.strip();
        };
        BN3.prototype.copy = function copy(dest) {
          dest.words = new Array(this.length);
          for (var i = 0; i < this.length; i++) {
            dest.words[i] = this.words[i];
          }
          dest.length = this.length;
          dest.negative = this.negative;
          dest.red = this.red;
        };
        BN3.prototype.clone = function clone() {
          var r = new BN3(null);
          this.copy(r);
          return r;
        };
        BN3.prototype._expand = function _expand(size) {
          while (this.length < size) {
            this.words[this.length++] = 0;
          }
          return this;
        };
        BN3.prototype.strip = function strip() {
          while (this.length > 1 && this.words[this.length - 1] === 0) {
            this.length--;
          }
          return this._normSign();
        };
        BN3.prototype._normSign = function _normSign() {
          if (this.length === 1 && this.words[0] === 0) {
            this.negative = 0;
          }
          return this;
        };
        BN3.prototype.inspect = function inspect4() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
        };
        var zeros2 = [
          "",
          "0",
          "00",
          "000",
          "0000",
          "00000",
          "000000",
          "0000000",
          "00000000",
          "000000000",
          "0000000000",
          "00000000000",
          "000000000000",
          "0000000000000",
          "00000000000000",
          "000000000000000",
          "0000000000000000",
          "00000000000000000",
          "000000000000000000",
          "0000000000000000000",
          "00000000000000000000",
          "000000000000000000000",
          "0000000000000000000000",
          "00000000000000000000000",
          "000000000000000000000000",
          "0000000000000000000000000"
        ];
        var groupSizes = [
          0,
          0,
          25,
          16,
          12,
          11,
          10,
          9,
          8,
          8,
          7,
          7,
          7,
          7,
          6,
          6,
          6,
          6,
          6,
          6,
          6,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5
        ];
        var groupBases = [
          0,
          0,
          33554432,
          43046721,
          16777216,
          48828125,
          60466176,
          40353607,
          16777216,
          43046721,
          1e7,
          19487171,
          35831808,
          62748517,
          7529536,
          11390625,
          16777216,
          24137569,
          34012224,
          47045881,
          64e6,
          4084101,
          5153632,
          6436343,
          7962624,
          9765625,
          11881376,
          14348907,
          17210368,
          20511149,
          243e5,
          28629151,
          33554432,
          39135393,
          45435424,
          52521875,
          60466176
        ];
        BN3.prototype.toString = function toString(base2, padding2) {
          base2 = base2 || 10;
          padding2 = padding2 | 0 || 1;
          var out;
          if (base2 === 16 || base2 === "hex") {
            out = "";
            var off = 0;
            var carry = 0;
            for (var i = 0; i < this.length; i++) {
              var w = this.words[i];
              var word = ((w << off | carry) & 16777215).toString(16);
              carry = w >>> 24 - off & 16777215;
              if (carry !== 0 || i !== this.length - 1) {
                out = zeros2[6 - word.length] + word + out;
              } else {
                out = word + out;
              }
              off += 2;
              if (off >= 26) {
                off -= 26;
                i--;
              }
            }
            if (carry !== 0) {
              out = carry.toString(16) + out;
            }
            while (out.length % padding2 !== 0) {
              out = "0" + out;
            }
            if (this.negative !== 0) {
              out = "-" + out;
            }
            return out;
          }
          if (base2 === (base2 | 0) && base2 >= 2 && base2 <= 36) {
            var groupSize = groupSizes[base2];
            var groupBase = groupBases[base2];
            out = "";
            var c = this.clone();
            c.negative = 0;
            while (!c.isZero()) {
              var r = c.modn(groupBase).toString(base2);
              c = c.idivn(groupBase);
              if (!c.isZero()) {
                out = zeros2[groupSize - r.length] + r + out;
              } else {
                out = r + out;
              }
            }
            if (this.isZero()) {
              out = "0" + out;
            }
            while (out.length % padding2 !== 0) {
              out = "0" + out;
            }
            if (this.negative !== 0) {
              out = "-" + out;
            }
            return out;
          }
          assert2(false, "Base should be between 2 and 36");
        };
        BN3.prototype.toNumber = function toNumber() {
          var ret = this.words[0];
          if (this.length === 2) {
            ret += this.words[1] * 67108864;
          } else if (this.length === 3 && this.words[2] === 1) {
            ret += 4503599627370496 + this.words[1] * 67108864;
          } else if (this.length > 2) {
            assert2(false, "Number can only safely store up to 53 bits");
          }
          return this.negative !== 0 ? -ret : ret;
        };
        BN3.prototype.toJSON = function toJSON2() {
          return this.toString(16);
        };
        BN3.prototype.toBuffer = function toBuffer(endian, length) {
          assert2(typeof Buffer3 !== "undefined");
          return this.toArrayLike(Buffer3, endian, length);
        };
        BN3.prototype.toArray = function toArray(endian, length) {
          return this.toArrayLike(Array, endian, length);
        };
        BN3.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
          var byteLength = this.byteLength();
          var reqLength = length || Math.max(1, byteLength);
          assert2(byteLength <= reqLength, "byte array longer than desired length");
          assert2(reqLength > 0, "Requested array length <= 0");
          this.strip();
          var littleEndian = endian === "le";
          var res = new ArrayType(reqLength);
          var b, i;
          var q = this.clone();
          if (!littleEndian) {
            for (i = 0; i < reqLength - byteLength; i++) {
              res[i] = 0;
            }
            for (i = 0; !q.isZero(); i++) {
              b = q.andln(255);
              q.iushrn(8);
              res[reqLength - i - 1] = b;
            }
          } else {
            for (i = 0; !q.isZero(); i++) {
              b = q.andln(255);
              q.iushrn(8);
              res[i] = b;
            }
            for (; i < reqLength; i++) {
              res[i] = 0;
            }
          }
          return res;
        };
        if (Math.clz32) {
          BN3.prototype._countBits = function _countBits(w) {
            return 32 - Math.clz32(w);
          };
        } else {
          BN3.prototype._countBits = function _countBits(w) {
            var t = w;
            var r = 0;
            if (t >= 4096) {
              r += 13;
              t >>>= 13;
            }
            if (t >= 64) {
              r += 7;
              t >>>= 7;
            }
            if (t >= 8) {
              r += 4;
              t >>>= 4;
            }
            if (t >= 2) {
              r += 2;
              t >>>= 2;
            }
            return r + t;
          };
        }
        BN3.prototype._zeroBits = function _zeroBits(w) {
          if (w === 0)
            return 26;
          var t = w;
          var r = 0;
          if ((t & 8191) === 0) {
            r += 13;
            t >>>= 13;
          }
          if ((t & 127) === 0) {
            r += 7;
            t >>>= 7;
          }
          if ((t & 15) === 0) {
            r += 4;
            t >>>= 4;
          }
          if ((t & 3) === 0) {
            r += 2;
            t >>>= 2;
          }
          if ((t & 1) === 0) {
            r++;
          }
          return r;
        };
        BN3.prototype.bitLength = function bitLength() {
          var w = this.words[this.length - 1];
          var hi = this._countBits(w);
          return (this.length - 1) * 26 + hi;
        };
        function toBitArray(num) {
          var w = new Array(num.bitLength());
          for (var bit = 0; bit < w.length; bit++) {
            var off = bit / 26 | 0;
            var wbit = bit % 26;
            w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
          }
          return w;
        }
        BN3.prototype.zeroBits = function zeroBits() {
          if (this.isZero())
            return 0;
          var r = 0;
          for (var i = 0; i < this.length; i++) {
            var b = this._zeroBits(this.words[i]);
            r += b;
            if (b !== 26)
              break;
          }
          return r;
        };
        BN3.prototype.byteLength = function byteLength() {
          return Math.ceil(this.bitLength() / 8);
        };
        BN3.prototype.toTwos = function toTwos(width) {
          if (this.negative !== 0) {
            return this.abs().inotn(width).iaddn(1);
          }
          return this.clone();
        };
        BN3.prototype.fromTwos = function fromTwos(width) {
          if (this.testn(width - 1)) {
            return this.notn(width).iaddn(1).ineg();
          }
          return this.clone();
        };
        BN3.prototype.isNeg = function isNeg() {
          return this.negative !== 0;
        };
        BN3.prototype.neg = function neg3() {
          return this.clone().ineg();
        };
        BN3.prototype.ineg = function ineg() {
          if (!this.isZero()) {
            this.negative ^= 1;
          }
          return this;
        };
        BN3.prototype.iuor = function iuor(num) {
          while (this.length < num.length) {
            this.words[this.length++] = 0;
          }
          for (var i = 0; i < num.length; i++) {
            this.words[i] = this.words[i] | num.words[i];
          }
          return this.strip();
        };
        BN3.prototype.ior = function ior(num) {
          assert2((this.negative | num.negative) === 0);
          return this.iuor(num);
        };
        BN3.prototype.or = function or(num) {
          if (this.length > num.length)
            return this.clone().ior(num);
          return num.clone().ior(this);
        };
        BN3.prototype.uor = function uor(num) {
          if (this.length > num.length)
            return this.clone().iuor(num);
          return num.clone().iuor(this);
        };
        BN3.prototype.iuand = function iuand(num) {
          var b;
          if (this.length > num.length) {
            b = num;
          } else {
            b = this;
          }
          for (var i = 0; i < b.length; i++) {
            this.words[i] = this.words[i] & num.words[i];
          }
          this.length = b.length;
          return this.strip();
        };
        BN3.prototype.iand = function iand(num) {
          assert2((this.negative | num.negative) === 0);
          return this.iuand(num);
        };
        BN3.prototype.and = function and(num) {
          if (this.length > num.length)
            return this.clone().iand(num);
          return num.clone().iand(this);
        };
        BN3.prototype.uand = function uand(num) {
          if (this.length > num.length)
            return this.clone().iuand(num);
          return num.clone().iuand(this);
        };
        BN3.prototype.iuxor = function iuxor(num) {
          var a;
          var b;
          if (this.length > num.length) {
            a = this;
            b = num;
          } else {
            a = num;
            b = this;
          }
          for (var i = 0; i < b.length; i++) {
            this.words[i] = a.words[i] ^ b.words[i];
          }
          if (this !== a) {
            for (; i < a.length; i++) {
              this.words[i] = a.words[i];
            }
          }
          this.length = a.length;
          return this.strip();
        };
        BN3.prototype.ixor = function ixor(num) {
          assert2((this.negative | num.negative) === 0);
          return this.iuxor(num);
        };
        BN3.prototype.xor = function xor(num) {
          if (this.length > num.length)
            return this.clone().ixor(num);
          return num.clone().ixor(this);
        };
        BN3.prototype.uxor = function uxor(num) {
          if (this.length > num.length)
            return this.clone().iuxor(num);
          return num.clone().iuxor(this);
        };
        BN3.prototype.inotn = function inotn(width) {
          assert2(typeof width === "number" && width >= 0);
          var bytesNeeded = Math.ceil(width / 26) | 0;
          var bitsLeft = width % 26;
          this._expand(bytesNeeded);
          if (bitsLeft > 0) {
            bytesNeeded--;
          }
          for (var i = 0; i < bytesNeeded; i++) {
            this.words[i] = ~this.words[i] & 67108863;
          }
          if (bitsLeft > 0) {
            this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
          }
          return this.strip();
        };
        BN3.prototype.notn = function notn(width) {
          return this.clone().inotn(width);
        };
        BN3.prototype.setn = function setn(bit, val) {
          assert2(typeof bit === "number" && bit >= 0);
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          this._expand(off + 1);
          if (val) {
            this.words[off] = this.words[off] | 1 << wbit;
          } else {
            this.words[off] = this.words[off] & ~(1 << wbit);
          }
          return this.strip();
        };
        BN3.prototype.iadd = function iadd(num) {
          var r;
          if (this.negative !== 0 && num.negative === 0) {
            this.negative = 0;
            r = this.isub(num);
            this.negative ^= 1;
            return this._normSign();
          } else if (this.negative === 0 && num.negative !== 0) {
            num.negative = 0;
            r = this.isub(num);
            num.negative = 1;
            return r._normSign();
          }
          var a, b;
          if (this.length > num.length) {
            a = this;
            b = num;
          } else {
            a = num;
            b = this;
          }
          var carry = 0;
          for (var i = 0; i < b.length; i++) {
            r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
            this.words[i] = r & 67108863;
            carry = r >>> 26;
          }
          for (; carry !== 0 && i < a.length; i++) {
            r = (a.words[i] | 0) + carry;
            this.words[i] = r & 67108863;
            carry = r >>> 26;
          }
          this.length = a.length;
          if (carry !== 0) {
            this.words[this.length] = carry;
            this.length++;
          } else if (a !== this) {
            for (; i < a.length; i++) {
              this.words[i] = a.words[i];
            }
          }
          return this;
        };
        BN3.prototype.add = function add3(num) {
          var res;
          if (num.negative !== 0 && this.negative === 0) {
            num.negative = 0;
            res = this.sub(num);
            num.negative ^= 1;
            return res;
          } else if (num.negative === 0 && this.negative !== 0) {
            this.negative = 0;
            res = num.sub(this);
            this.negative = 1;
            return res;
          }
          if (this.length > num.length)
            return this.clone().iadd(num);
          return num.clone().iadd(this);
        };
        BN3.prototype.isub = function isub(num) {
          if (num.negative !== 0) {
            num.negative = 0;
            var r = this.iadd(num);
            num.negative = 1;
            return r._normSign();
          } else if (this.negative !== 0) {
            this.negative = 0;
            this.iadd(num);
            this.negative = 1;
            return this._normSign();
          }
          var cmp = this.cmp(num);
          if (cmp === 0) {
            this.negative = 0;
            this.length = 1;
            this.words[0] = 0;
            return this;
          }
          var a, b;
          if (cmp > 0) {
            a = this;
            b = num;
          } else {
            a = num;
            b = this;
          }
          var carry = 0;
          for (var i = 0; i < b.length; i++) {
            r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
            carry = r >> 26;
            this.words[i] = r & 67108863;
          }
          for (; carry !== 0 && i < a.length; i++) {
            r = (a.words[i] | 0) + carry;
            carry = r >> 26;
            this.words[i] = r & 67108863;
          }
          if (carry === 0 && i < a.length && a !== this) {
            for (; i < a.length; i++) {
              this.words[i] = a.words[i];
            }
          }
          this.length = Math.max(this.length, i);
          if (a !== this) {
            this.negative = 1;
          }
          return this.strip();
        };
        BN3.prototype.sub = function sub(num) {
          return this.clone().isub(num);
        };
        function smallMulTo(self2, num, out) {
          out.negative = num.negative ^ self2.negative;
          var len = self2.length + num.length | 0;
          out.length = len;
          len = len - 1 | 0;
          var a = self2.words[0] | 0;
          var b = num.words[0] | 0;
          var r = a * b;
          var lo = r & 67108863;
          var carry = r / 67108864 | 0;
          out.words[0] = lo;
          for (var k = 1; k < len; k++) {
            var ncarry = carry >>> 26;
            var rword = carry & 67108863;
            var maxJ = Math.min(k, num.length - 1);
            for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
              var i = k - j | 0;
              a = self2.words[i] | 0;
              b = num.words[j] | 0;
              r = a * b + rword;
              ncarry += r / 67108864 | 0;
              rword = r & 67108863;
            }
            out.words[k] = rword | 0;
            carry = ncarry | 0;
          }
          if (carry !== 0) {
            out.words[k] = carry | 0;
          } else {
            out.length--;
          }
          return out.strip();
        }
        var comb10MulTo = function comb10MulTo2(self2, num, out) {
          var a = self2.words;
          var b = num.words;
          var o = out.words;
          var c = 0;
          var lo;
          var mid;
          var hi;
          var a0 = a[0] | 0;
          var al0 = a0 & 8191;
          var ah0 = a0 >>> 13;
          var a1 = a[1] | 0;
          var al1 = a1 & 8191;
          var ah1 = a1 >>> 13;
          var a2 = a[2] | 0;
          var al2 = a2 & 8191;
          var ah2 = a2 >>> 13;
          var a3 = a[3] | 0;
          var al3 = a3 & 8191;
          var ah3 = a3 >>> 13;
          var a4 = a[4] | 0;
          var al4 = a4 & 8191;
          var ah4 = a4 >>> 13;
          var a5 = a[5] | 0;
          var al5 = a5 & 8191;
          var ah5 = a5 >>> 13;
          var a6 = a[6] | 0;
          var al6 = a6 & 8191;
          var ah6 = a6 >>> 13;
          var a7 = a[7] | 0;
          var al7 = a7 & 8191;
          var ah7 = a7 >>> 13;
          var a8 = a[8] | 0;
          var al8 = a8 & 8191;
          var ah8 = a8 >>> 13;
          var a9 = a[9] | 0;
          var al9 = a9 & 8191;
          var ah9 = a9 >>> 13;
          var b0 = b[0] | 0;
          var bl0 = b0 & 8191;
          var bh0 = b0 >>> 13;
          var b1 = b[1] | 0;
          var bl1 = b1 & 8191;
          var bh1 = b1 >>> 13;
          var b2 = b[2] | 0;
          var bl2 = b2 & 8191;
          var bh2 = b2 >>> 13;
          var b3 = b[3] | 0;
          var bl3 = b3 & 8191;
          var bh3 = b3 >>> 13;
          var b4 = b[4] | 0;
          var bl4 = b4 & 8191;
          var bh4 = b4 >>> 13;
          var b5 = b[5] | 0;
          var bl5 = b5 & 8191;
          var bh5 = b5 >>> 13;
          var b6 = b[6] | 0;
          var bl6 = b6 & 8191;
          var bh6 = b6 >>> 13;
          var b7 = b[7] | 0;
          var bl7 = b7 & 8191;
          var bh7 = b7 >>> 13;
          var b8 = b[8] | 0;
          var bl8 = b8 & 8191;
          var bh8 = b8 >>> 13;
          var b9 = b[9] | 0;
          var bl9 = b9 & 8191;
          var bh9 = b9 >>> 13;
          out.negative = self2.negative ^ num.negative;
          out.length = 19;
          lo = Math.imul(al0, bl0);
          mid = Math.imul(al0, bh0);
          mid = mid + Math.imul(ah0, bl0) | 0;
          hi = Math.imul(ah0, bh0);
          var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
          w0 &= 67108863;
          lo = Math.imul(al1, bl0);
          mid = Math.imul(al1, bh0);
          mid = mid + Math.imul(ah1, bl0) | 0;
          hi = Math.imul(ah1, bh0);
          lo = lo + Math.imul(al0, bl1) | 0;
          mid = mid + Math.imul(al0, bh1) | 0;
          mid = mid + Math.imul(ah0, bl1) | 0;
          hi = hi + Math.imul(ah0, bh1) | 0;
          var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
          w1 &= 67108863;
          lo = Math.imul(al2, bl0);
          mid = Math.imul(al2, bh0);
          mid = mid + Math.imul(ah2, bl0) | 0;
          hi = Math.imul(ah2, bh0);
          lo = lo + Math.imul(al1, bl1) | 0;
          mid = mid + Math.imul(al1, bh1) | 0;
          mid = mid + Math.imul(ah1, bl1) | 0;
          hi = hi + Math.imul(ah1, bh1) | 0;
          lo = lo + Math.imul(al0, bl2) | 0;
          mid = mid + Math.imul(al0, bh2) | 0;
          mid = mid + Math.imul(ah0, bl2) | 0;
          hi = hi + Math.imul(ah0, bh2) | 0;
          var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
          w2 &= 67108863;
          lo = Math.imul(al3, bl0);
          mid = Math.imul(al3, bh0);
          mid = mid + Math.imul(ah3, bl0) | 0;
          hi = Math.imul(ah3, bh0);
          lo = lo + Math.imul(al2, bl1) | 0;
          mid = mid + Math.imul(al2, bh1) | 0;
          mid = mid + Math.imul(ah2, bl1) | 0;
          hi = hi + Math.imul(ah2, bh1) | 0;
          lo = lo + Math.imul(al1, bl2) | 0;
          mid = mid + Math.imul(al1, bh2) | 0;
          mid = mid + Math.imul(ah1, bl2) | 0;
          hi = hi + Math.imul(ah1, bh2) | 0;
          lo = lo + Math.imul(al0, bl3) | 0;
          mid = mid + Math.imul(al0, bh3) | 0;
          mid = mid + Math.imul(ah0, bl3) | 0;
          hi = hi + Math.imul(ah0, bh3) | 0;
          var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
          w3 &= 67108863;
          lo = Math.imul(al4, bl0);
          mid = Math.imul(al4, bh0);
          mid = mid + Math.imul(ah4, bl0) | 0;
          hi = Math.imul(ah4, bh0);
          lo = lo + Math.imul(al3, bl1) | 0;
          mid = mid + Math.imul(al3, bh1) | 0;
          mid = mid + Math.imul(ah3, bl1) | 0;
          hi = hi + Math.imul(ah3, bh1) | 0;
          lo = lo + Math.imul(al2, bl2) | 0;
          mid = mid + Math.imul(al2, bh2) | 0;
          mid = mid + Math.imul(ah2, bl2) | 0;
          hi = hi + Math.imul(ah2, bh2) | 0;
          lo = lo + Math.imul(al1, bl3) | 0;
          mid = mid + Math.imul(al1, bh3) | 0;
          mid = mid + Math.imul(ah1, bl3) | 0;
          hi = hi + Math.imul(ah1, bh3) | 0;
          lo = lo + Math.imul(al0, bl4) | 0;
          mid = mid + Math.imul(al0, bh4) | 0;
          mid = mid + Math.imul(ah0, bl4) | 0;
          hi = hi + Math.imul(ah0, bh4) | 0;
          var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
          w4 &= 67108863;
          lo = Math.imul(al5, bl0);
          mid = Math.imul(al5, bh0);
          mid = mid + Math.imul(ah5, bl0) | 0;
          hi = Math.imul(ah5, bh0);
          lo = lo + Math.imul(al4, bl1) | 0;
          mid = mid + Math.imul(al4, bh1) | 0;
          mid = mid + Math.imul(ah4, bl1) | 0;
          hi = hi + Math.imul(ah4, bh1) | 0;
          lo = lo + Math.imul(al3, bl2) | 0;
          mid = mid + Math.imul(al3, bh2) | 0;
          mid = mid + Math.imul(ah3, bl2) | 0;
          hi = hi + Math.imul(ah3, bh2) | 0;
          lo = lo + Math.imul(al2, bl3) | 0;
          mid = mid + Math.imul(al2, bh3) | 0;
          mid = mid + Math.imul(ah2, bl3) | 0;
          hi = hi + Math.imul(ah2, bh3) | 0;
          lo = lo + Math.imul(al1, bl4) | 0;
          mid = mid + Math.imul(al1, bh4) | 0;
          mid = mid + Math.imul(ah1, bl4) | 0;
          hi = hi + Math.imul(ah1, bh4) | 0;
          lo = lo + Math.imul(al0, bl5) | 0;
          mid = mid + Math.imul(al0, bh5) | 0;
          mid = mid + Math.imul(ah0, bl5) | 0;
          hi = hi + Math.imul(ah0, bh5) | 0;
          var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
          w5 &= 67108863;
          lo = Math.imul(al6, bl0);
          mid = Math.imul(al6, bh0);
          mid = mid + Math.imul(ah6, bl0) | 0;
          hi = Math.imul(ah6, bh0);
          lo = lo + Math.imul(al5, bl1) | 0;
          mid = mid + Math.imul(al5, bh1) | 0;
          mid = mid + Math.imul(ah5, bl1) | 0;
          hi = hi + Math.imul(ah5, bh1) | 0;
          lo = lo + Math.imul(al4, bl2) | 0;
          mid = mid + Math.imul(al4, bh2) | 0;
          mid = mid + Math.imul(ah4, bl2) | 0;
          hi = hi + Math.imul(ah4, bh2) | 0;
          lo = lo + Math.imul(al3, bl3) | 0;
          mid = mid + Math.imul(al3, bh3) | 0;
          mid = mid + Math.imul(ah3, bl3) | 0;
          hi = hi + Math.imul(ah3, bh3) | 0;
          lo = lo + Math.imul(al2, bl4) | 0;
          mid = mid + Math.imul(al2, bh4) | 0;
          mid = mid + Math.imul(ah2, bl4) | 0;
          hi = hi + Math.imul(ah2, bh4) | 0;
          lo = lo + Math.imul(al1, bl5) | 0;
          mid = mid + Math.imul(al1, bh5) | 0;
          mid = mid + Math.imul(ah1, bl5) | 0;
          hi = hi + Math.imul(ah1, bh5) | 0;
          lo = lo + Math.imul(al0, bl6) | 0;
          mid = mid + Math.imul(al0, bh6) | 0;
          mid = mid + Math.imul(ah0, bl6) | 0;
          hi = hi + Math.imul(ah0, bh6) | 0;
          var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
          w6 &= 67108863;
          lo = Math.imul(al7, bl0);
          mid = Math.imul(al7, bh0);
          mid = mid + Math.imul(ah7, bl0) | 0;
          hi = Math.imul(ah7, bh0);
          lo = lo + Math.imul(al6, bl1) | 0;
          mid = mid + Math.imul(al6, bh1) | 0;
          mid = mid + Math.imul(ah6, bl1) | 0;
          hi = hi + Math.imul(ah6, bh1) | 0;
          lo = lo + Math.imul(al5, bl2) | 0;
          mid = mid + Math.imul(al5, bh2) | 0;
          mid = mid + Math.imul(ah5, bl2) | 0;
          hi = hi + Math.imul(ah5, bh2) | 0;
          lo = lo + Math.imul(al4, bl3) | 0;
          mid = mid + Math.imul(al4, bh3) | 0;
          mid = mid + Math.imul(ah4, bl3) | 0;
          hi = hi + Math.imul(ah4, bh3) | 0;
          lo = lo + Math.imul(al3, bl4) | 0;
          mid = mid + Math.imul(al3, bh4) | 0;
          mid = mid + Math.imul(ah3, bl4) | 0;
          hi = hi + Math.imul(ah3, bh4) | 0;
          lo = lo + Math.imul(al2, bl5) | 0;
          mid = mid + Math.imul(al2, bh5) | 0;
          mid = mid + Math.imul(ah2, bl5) | 0;
          hi = hi + Math.imul(ah2, bh5) | 0;
          lo = lo + Math.imul(al1, bl6) | 0;
          mid = mid + Math.imul(al1, bh6) | 0;
          mid = mid + Math.imul(ah1, bl6) | 0;
          hi = hi + Math.imul(ah1, bh6) | 0;
          lo = lo + Math.imul(al0, bl7) | 0;
          mid = mid + Math.imul(al0, bh7) | 0;
          mid = mid + Math.imul(ah0, bl7) | 0;
          hi = hi + Math.imul(ah0, bh7) | 0;
          var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
          w7 &= 67108863;
          lo = Math.imul(al8, bl0);
          mid = Math.imul(al8, bh0);
          mid = mid + Math.imul(ah8, bl0) | 0;
          hi = Math.imul(ah8, bh0);
          lo = lo + Math.imul(al7, bl1) | 0;
          mid = mid + Math.imul(al7, bh1) | 0;
          mid = mid + Math.imul(ah7, bl1) | 0;
          hi = hi + Math.imul(ah7, bh1) | 0;
          lo = lo + Math.imul(al6, bl2) | 0;
          mid = mid + Math.imul(al6, bh2) | 0;
          mid = mid + Math.imul(ah6, bl2) | 0;
          hi = hi + Math.imul(ah6, bh2) | 0;
          lo = lo + Math.imul(al5, bl3) | 0;
          mid = mid + Math.imul(al5, bh3) | 0;
          mid = mid + Math.imul(ah5, bl3) | 0;
          hi = hi + Math.imul(ah5, bh3) | 0;
          lo = lo + Math.imul(al4, bl4) | 0;
          mid = mid + Math.imul(al4, bh4) | 0;
          mid = mid + Math.imul(ah4, bl4) | 0;
          hi = hi + Math.imul(ah4, bh4) | 0;
          lo = lo + Math.imul(al3, bl5) | 0;
          mid = mid + Math.imul(al3, bh5) | 0;
          mid = mid + Math.imul(ah3, bl5) | 0;
          hi = hi + Math.imul(ah3, bh5) | 0;
          lo = lo + Math.imul(al2, bl6) | 0;
          mid = mid + Math.imul(al2, bh6) | 0;
          mid = mid + Math.imul(ah2, bl6) | 0;
          hi = hi + Math.imul(ah2, bh6) | 0;
          lo = lo + Math.imul(al1, bl7) | 0;
          mid = mid + Math.imul(al1, bh7) | 0;
          mid = mid + Math.imul(ah1, bl7) | 0;
          hi = hi + Math.imul(ah1, bh7) | 0;
          lo = lo + Math.imul(al0, bl8) | 0;
          mid = mid + Math.imul(al0, bh8) | 0;
          mid = mid + Math.imul(ah0, bl8) | 0;
          hi = hi + Math.imul(ah0, bh8) | 0;
          var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
          w8 &= 67108863;
          lo = Math.imul(al9, bl0);
          mid = Math.imul(al9, bh0);
          mid = mid + Math.imul(ah9, bl0) | 0;
          hi = Math.imul(ah9, bh0);
          lo = lo + Math.imul(al8, bl1) | 0;
          mid = mid + Math.imul(al8, bh1) | 0;
          mid = mid + Math.imul(ah8, bl1) | 0;
          hi = hi + Math.imul(ah8, bh1) | 0;
          lo = lo + Math.imul(al7, bl2) | 0;
          mid = mid + Math.imul(al7, bh2) | 0;
          mid = mid + Math.imul(ah7, bl2) | 0;
          hi = hi + Math.imul(ah7, bh2) | 0;
          lo = lo + Math.imul(al6, bl3) | 0;
          mid = mid + Math.imul(al6, bh3) | 0;
          mid = mid + Math.imul(ah6, bl3) | 0;
          hi = hi + Math.imul(ah6, bh3) | 0;
          lo = lo + Math.imul(al5, bl4) | 0;
          mid = mid + Math.imul(al5, bh4) | 0;
          mid = mid + Math.imul(ah5, bl4) | 0;
          hi = hi + Math.imul(ah5, bh4) | 0;
          lo = lo + Math.imul(al4, bl5) | 0;
          mid = mid + Math.imul(al4, bh5) | 0;
          mid = mid + Math.imul(ah4, bl5) | 0;
          hi = hi + Math.imul(ah4, bh5) | 0;
          lo = lo + Math.imul(al3, bl6) | 0;
          mid = mid + Math.imul(al3, bh6) | 0;
          mid = mid + Math.imul(ah3, bl6) | 0;
          hi = hi + Math.imul(ah3, bh6) | 0;
          lo = lo + Math.imul(al2, bl7) | 0;
          mid = mid + Math.imul(al2, bh7) | 0;
          mid = mid + Math.imul(ah2, bl7) | 0;
          hi = hi + Math.imul(ah2, bh7) | 0;
          lo = lo + Math.imul(al1, bl8) | 0;
          mid = mid + Math.imul(al1, bh8) | 0;
          mid = mid + Math.imul(ah1, bl8) | 0;
          hi = hi + Math.imul(ah1, bh8) | 0;
          lo = lo + Math.imul(al0, bl9) | 0;
          mid = mid + Math.imul(al0, bh9) | 0;
          mid = mid + Math.imul(ah0, bl9) | 0;
          hi = hi + Math.imul(ah0, bh9) | 0;
          var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
          w9 &= 67108863;
          lo = Math.imul(al9, bl1);
          mid = Math.imul(al9, bh1);
          mid = mid + Math.imul(ah9, bl1) | 0;
          hi = Math.imul(ah9, bh1);
          lo = lo + Math.imul(al8, bl2) | 0;
          mid = mid + Math.imul(al8, bh2) | 0;
          mid = mid + Math.imul(ah8, bl2) | 0;
          hi = hi + Math.imul(ah8, bh2) | 0;
          lo = lo + Math.imul(al7, bl3) | 0;
          mid = mid + Math.imul(al7, bh3) | 0;
          mid = mid + Math.imul(ah7, bl3) | 0;
          hi = hi + Math.imul(ah7, bh3) | 0;
          lo = lo + Math.imul(al6, bl4) | 0;
          mid = mid + Math.imul(al6, bh4) | 0;
          mid = mid + Math.imul(ah6, bl4) | 0;
          hi = hi + Math.imul(ah6, bh4) | 0;
          lo = lo + Math.imul(al5, bl5) | 0;
          mid = mid + Math.imul(al5, bh5) | 0;
          mid = mid + Math.imul(ah5, bl5) | 0;
          hi = hi + Math.imul(ah5, bh5) | 0;
          lo = lo + Math.imul(al4, bl6) | 0;
          mid = mid + Math.imul(al4, bh6) | 0;
          mid = mid + Math.imul(ah4, bl6) | 0;
          hi = hi + Math.imul(ah4, bh6) | 0;
          lo = lo + Math.imul(al3, bl7) | 0;
          mid = mid + Math.imul(al3, bh7) | 0;
          mid = mid + Math.imul(ah3, bl7) | 0;
          hi = hi + Math.imul(ah3, bh7) | 0;
          lo = lo + Math.imul(al2, bl8) | 0;
          mid = mid + Math.imul(al2, bh8) | 0;
          mid = mid + Math.imul(ah2, bl8) | 0;
          hi = hi + Math.imul(ah2, bh8) | 0;
          lo = lo + Math.imul(al1, bl9) | 0;
          mid = mid + Math.imul(al1, bh9) | 0;
          mid = mid + Math.imul(ah1, bl9) | 0;
          hi = hi + Math.imul(ah1, bh9) | 0;
          var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
          w10 &= 67108863;
          lo = Math.imul(al9, bl2);
          mid = Math.imul(al9, bh2);
          mid = mid + Math.imul(ah9, bl2) | 0;
          hi = Math.imul(ah9, bh2);
          lo = lo + Math.imul(al8, bl3) | 0;
          mid = mid + Math.imul(al8, bh3) | 0;
          mid = mid + Math.imul(ah8, bl3) | 0;
          hi = hi + Math.imul(ah8, bh3) | 0;
          lo = lo + Math.imul(al7, bl4) | 0;
          mid = mid + Math.imul(al7, bh4) | 0;
          mid = mid + Math.imul(ah7, bl4) | 0;
          hi = hi + Math.imul(ah7, bh4) | 0;
          lo = lo + Math.imul(al6, bl5) | 0;
          mid = mid + Math.imul(al6, bh5) | 0;
          mid = mid + Math.imul(ah6, bl5) | 0;
          hi = hi + Math.imul(ah6, bh5) | 0;
          lo = lo + Math.imul(al5, bl6) | 0;
          mid = mid + Math.imul(al5, bh6) | 0;
          mid = mid + Math.imul(ah5, bl6) | 0;
          hi = hi + Math.imul(ah5, bh6) | 0;
          lo = lo + Math.imul(al4, bl7) | 0;
          mid = mid + Math.imul(al4, bh7) | 0;
          mid = mid + Math.imul(ah4, bl7) | 0;
          hi = hi + Math.imul(ah4, bh7) | 0;
          lo = lo + Math.imul(al3, bl8) | 0;
          mid = mid + Math.imul(al3, bh8) | 0;
          mid = mid + Math.imul(ah3, bl8) | 0;
          hi = hi + Math.imul(ah3, bh8) | 0;
          lo = lo + Math.imul(al2, bl9) | 0;
          mid = mid + Math.imul(al2, bh9) | 0;
          mid = mid + Math.imul(ah2, bl9) | 0;
          hi = hi + Math.imul(ah2, bh9) | 0;
          var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
          w11 &= 67108863;
          lo = Math.imul(al9, bl3);
          mid = Math.imul(al9, bh3);
          mid = mid + Math.imul(ah9, bl3) | 0;
          hi = Math.imul(ah9, bh3);
          lo = lo + Math.imul(al8, bl4) | 0;
          mid = mid + Math.imul(al8, bh4) | 0;
          mid = mid + Math.imul(ah8, bl4) | 0;
          hi = hi + Math.imul(ah8, bh4) | 0;
          lo = lo + Math.imul(al7, bl5) | 0;
          mid = mid + Math.imul(al7, bh5) | 0;
          mid = mid + Math.imul(ah7, bl5) | 0;
          hi = hi + Math.imul(ah7, bh5) | 0;
          lo = lo + Math.imul(al6, bl6) | 0;
          mid = mid + Math.imul(al6, bh6) | 0;
          mid = mid + Math.imul(ah6, bl6) | 0;
          hi = hi + Math.imul(ah6, bh6) | 0;
          lo = lo + Math.imul(al5, bl7) | 0;
          mid = mid + Math.imul(al5, bh7) | 0;
          mid = mid + Math.imul(ah5, bl7) | 0;
          hi = hi + Math.imul(ah5, bh7) | 0;
          lo = lo + Math.imul(al4, bl8) | 0;
          mid = mid + Math.imul(al4, bh8) | 0;
          mid = mid + Math.imul(ah4, bl8) | 0;
          hi = hi + Math.imul(ah4, bh8) | 0;
          lo = lo + Math.imul(al3, bl9) | 0;
          mid = mid + Math.imul(al3, bh9) | 0;
          mid = mid + Math.imul(ah3, bl9) | 0;
          hi = hi + Math.imul(ah3, bh9) | 0;
          var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
          w12 &= 67108863;
          lo = Math.imul(al9, bl4);
          mid = Math.imul(al9, bh4);
          mid = mid + Math.imul(ah9, bl4) | 0;
          hi = Math.imul(ah9, bh4);
          lo = lo + Math.imul(al8, bl5) | 0;
          mid = mid + Math.imul(al8, bh5) | 0;
          mid = mid + Math.imul(ah8, bl5) | 0;
          hi = hi + Math.imul(ah8, bh5) | 0;
          lo = lo + Math.imul(al7, bl6) | 0;
          mid = mid + Math.imul(al7, bh6) | 0;
          mid = mid + Math.imul(ah7, bl6) | 0;
          hi = hi + Math.imul(ah7, bh6) | 0;
          lo = lo + Math.imul(al6, bl7) | 0;
          mid = mid + Math.imul(al6, bh7) | 0;
          mid = mid + Math.imul(ah6, bl7) | 0;
          hi = hi + Math.imul(ah6, bh7) | 0;
          lo = lo + Math.imul(al5, bl8) | 0;
          mid = mid + Math.imul(al5, bh8) | 0;
          mid = mid + Math.imul(ah5, bl8) | 0;
          hi = hi + Math.imul(ah5, bh8) | 0;
          lo = lo + Math.imul(al4, bl9) | 0;
          mid = mid + Math.imul(al4, bh9) | 0;
          mid = mid + Math.imul(ah4, bl9) | 0;
          hi = hi + Math.imul(ah4, bh9) | 0;
          var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
          w13 &= 67108863;
          lo = Math.imul(al9, bl5);
          mid = Math.imul(al9, bh5);
          mid = mid + Math.imul(ah9, bl5) | 0;
          hi = Math.imul(ah9, bh5);
          lo = lo + Math.imul(al8, bl6) | 0;
          mid = mid + Math.imul(al8, bh6) | 0;
          mid = mid + Math.imul(ah8, bl6) | 0;
          hi = hi + Math.imul(ah8, bh6) | 0;
          lo = lo + Math.imul(al7, bl7) | 0;
          mid = mid + Math.imul(al7, bh7) | 0;
          mid = mid + Math.imul(ah7, bl7) | 0;
          hi = hi + Math.imul(ah7, bh7) | 0;
          lo = lo + Math.imul(al6, bl8) | 0;
          mid = mid + Math.imul(al6, bh8) | 0;
          mid = mid + Math.imul(ah6, bl8) | 0;
          hi = hi + Math.imul(ah6, bh8) | 0;
          lo = lo + Math.imul(al5, bl9) | 0;
          mid = mid + Math.imul(al5, bh9) | 0;
          mid = mid + Math.imul(ah5, bl9) | 0;
          hi = hi + Math.imul(ah5, bh9) | 0;
          var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
          w14 &= 67108863;
          lo = Math.imul(al9, bl6);
          mid = Math.imul(al9, bh6);
          mid = mid + Math.imul(ah9, bl6) | 0;
          hi = Math.imul(ah9, bh6);
          lo = lo + Math.imul(al8, bl7) | 0;
          mid = mid + Math.imul(al8, bh7) | 0;
          mid = mid + Math.imul(ah8, bl7) | 0;
          hi = hi + Math.imul(ah8, bh7) | 0;
          lo = lo + Math.imul(al7, bl8) | 0;
          mid = mid + Math.imul(al7, bh8) | 0;
          mid = mid + Math.imul(ah7, bl8) | 0;
          hi = hi + Math.imul(ah7, bh8) | 0;
          lo = lo + Math.imul(al6, bl9) | 0;
          mid = mid + Math.imul(al6, bh9) | 0;
          mid = mid + Math.imul(ah6, bl9) | 0;
          hi = hi + Math.imul(ah6, bh9) | 0;
          var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
          w15 &= 67108863;
          lo = Math.imul(al9, bl7);
          mid = Math.imul(al9, bh7);
          mid = mid + Math.imul(ah9, bl7) | 0;
          hi = Math.imul(ah9, bh7);
          lo = lo + Math.imul(al8, bl8) | 0;
          mid = mid + Math.imul(al8, bh8) | 0;
          mid = mid + Math.imul(ah8, bl8) | 0;
          hi = hi + Math.imul(ah8, bh8) | 0;
          lo = lo + Math.imul(al7, bl9) | 0;
          mid = mid + Math.imul(al7, bh9) | 0;
          mid = mid + Math.imul(ah7, bl9) | 0;
          hi = hi + Math.imul(ah7, bh9) | 0;
          var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
          w16 &= 67108863;
          lo = Math.imul(al9, bl8);
          mid = Math.imul(al9, bh8);
          mid = mid + Math.imul(ah9, bl8) | 0;
          hi = Math.imul(ah9, bh8);
          lo = lo + Math.imul(al8, bl9) | 0;
          mid = mid + Math.imul(al8, bh9) | 0;
          mid = mid + Math.imul(ah8, bl9) | 0;
          hi = hi + Math.imul(ah8, bh9) | 0;
          var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
          w17 &= 67108863;
          lo = Math.imul(al9, bl9);
          mid = Math.imul(al9, bh9);
          mid = mid + Math.imul(ah9, bl9) | 0;
          hi = Math.imul(ah9, bh9);
          var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
          c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
          w18 &= 67108863;
          o[0] = w0;
          o[1] = w1;
          o[2] = w2;
          o[3] = w3;
          o[4] = w4;
          o[5] = w5;
          o[6] = w6;
          o[7] = w7;
          o[8] = w8;
          o[9] = w9;
          o[10] = w10;
          o[11] = w11;
          o[12] = w12;
          o[13] = w13;
          o[14] = w14;
          o[15] = w15;
          o[16] = w16;
          o[17] = w17;
          o[18] = w18;
          if (c !== 0) {
            o[19] = c;
            out.length++;
          }
          return out;
        };
        if (!Math.imul) {
          comb10MulTo = smallMulTo;
        }
        function bigMulTo(self2, num, out) {
          out.negative = num.negative ^ self2.negative;
          out.length = self2.length + num.length;
          var carry = 0;
          var hncarry = 0;
          for (var k = 0; k < out.length - 1; k++) {
            var ncarry = hncarry;
            hncarry = 0;
            var rword = carry & 67108863;
            var maxJ = Math.min(k, num.length - 1);
            for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
              var i = k - j;
              var a = self2.words[i] | 0;
              var b = num.words[j] | 0;
              var r = a * b;
              var lo = r & 67108863;
              ncarry = ncarry + (r / 67108864 | 0) | 0;
              lo = lo + rword | 0;
              rword = lo & 67108863;
              ncarry = ncarry + (lo >>> 26) | 0;
              hncarry += ncarry >>> 26;
              ncarry &= 67108863;
            }
            out.words[k] = rword;
            carry = ncarry;
            ncarry = hncarry;
          }
          if (carry !== 0) {
            out.words[k] = carry;
          } else {
            out.length--;
          }
          return out.strip();
        }
        function jumboMulTo(self2, num, out) {
          var fftm = new FFTM();
          return fftm.mulp(self2, num, out);
        }
        BN3.prototype.mulTo = function mulTo(num, out) {
          var res;
          var len = this.length + num.length;
          if (this.length === 10 && num.length === 10) {
            res = comb10MulTo(this, num, out);
          } else if (len < 63) {
            res = smallMulTo(this, num, out);
          } else if (len < 1024) {
            res = bigMulTo(this, num, out);
          } else {
            res = jumboMulTo(this, num, out);
          }
          return res;
        };
        function FFTM(x, y) {
          this.x = x;
          this.y = y;
        }
        FFTM.prototype.makeRBT = function makeRBT(N2) {
          var t = new Array(N2);
          var l = BN3.prototype._countBits(N2) - 1;
          for (var i = 0; i < N2; i++) {
            t[i] = this.revBin(i, l, N2);
          }
          return t;
        };
        FFTM.prototype.revBin = function revBin(x, l, N2) {
          if (x === 0 || x === N2 - 1)
            return x;
          var rb = 0;
          for (var i = 0; i < l; i++) {
            rb |= (x & 1) << l - i - 1;
            x >>= 1;
          }
          return rb;
        };
        FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N2) {
          for (var i = 0; i < N2; i++) {
            rtws[i] = rws[rbt[i]];
            itws[i] = iws[rbt[i]];
          }
        };
        FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N2, rbt) {
          this.permute(rbt, rws, iws, rtws, itws, N2);
          for (var s = 1; s < N2; s <<= 1) {
            var l = s << 1;
            var rtwdf = Math.cos(2 * Math.PI / l);
            var itwdf = Math.sin(2 * Math.PI / l);
            for (var p = 0; p < N2; p += l) {
              var rtwdf_ = rtwdf;
              var itwdf_ = itwdf;
              for (var j = 0; j < s; j++) {
                var re = rtws[p + j];
                var ie = itws[p + j];
                var ro = rtws[p + j + s];
                var io = itws[p + j + s];
                var rx = rtwdf_ * ro - itwdf_ * io;
                io = rtwdf_ * io + itwdf_ * ro;
                ro = rx;
                rtws[p + j] = re + ro;
                itws[p + j] = ie + io;
                rtws[p + j + s] = re - ro;
                itws[p + j + s] = ie - io;
                if (j !== l) {
                  rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                  itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                  rtwdf_ = rx;
                }
              }
            }
          }
        };
        FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
          var N2 = Math.max(m, n) | 1;
          var odd = N2 & 1;
          var i = 0;
          for (N2 = N2 / 2 | 0; N2; N2 = N2 >>> 1) {
            i++;
          }
          return 1 << i + 1 + odd;
        };
        FFTM.prototype.conjugate = function conjugate(rws, iws, N2) {
          if (N2 <= 1)
            return;
          for (var i = 0; i < N2 / 2; i++) {
            var t = rws[i];
            rws[i] = rws[N2 - i - 1];
            rws[N2 - i - 1] = t;
            t = iws[i];
            iws[i] = -iws[N2 - i - 1];
            iws[N2 - i - 1] = -t;
          }
        };
        FFTM.prototype.normalize13b = function normalize13b(ws, N2) {
          var carry = 0;
          for (var i = 0; i < N2 / 2; i++) {
            var w = Math.round(ws[2 * i + 1] / N2) * 8192 + Math.round(ws[2 * i] / N2) + carry;
            ws[i] = w & 67108863;
            if (w < 67108864) {
              carry = 0;
            } else {
              carry = w / 67108864 | 0;
            }
          }
          return ws;
        };
        FFTM.prototype.convert13b = function convert13b(ws, len, rws, N2) {
          var carry = 0;
          for (var i = 0; i < len; i++) {
            carry = carry + (ws[i] | 0);
            rws[2 * i] = carry & 8191;
            carry = carry >>> 13;
            rws[2 * i + 1] = carry & 8191;
            carry = carry >>> 13;
          }
          for (i = 2 * len; i < N2; ++i) {
            rws[i] = 0;
          }
          assert2(carry === 0);
          assert2((carry & ~8191) === 0);
        };
        FFTM.prototype.stub = function stub(N2) {
          var ph = new Array(N2);
          for (var i = 0; i < N2; i++) {
            ph[i] = 0;
          }
          return ph;
        };
        FFTM.prototype.mulp = function mulp(x, y, out) {
          var N2 = 2 * this.guessLen13b(x.length, y.length);
          var rbt = this.makeRBT(N2);
          var _ = this.stub(N2);
          var rws = new Array(N2);
          var rwst = new Array(N2);
          var iwst = new Array(N2);
          var nrws = new Array(N2);
          var nrwst = new Array(N2);
          var niwst = new Array(N2);
          var rmws = out.words;
          rmws.length = N2;
          this.convert13b(x.words, x.length, rws, N2);
          this.convert13b(y.words, y.length, nrws, N2);
          this.transform(rws, _, rwst, iwst, N2, rbt);
          this.transform(nrws, _, nrwst, niwst, N2, rbt);
          for (var i = 0; i < N2; i++) {
            var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
            iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
            rwst[i] = rx;
          }
          this.conjugate(rwst, iwst, N2);
          this.transform(rwst, iwst, rmws, _, N2, rbt);
          this.conjugate(rmws, _, N2);
          this.normalize13b(rmws, N2);
          out.negative = x.negative ^ y.negative;
          out.length = x.length + y.length;
          return out.strip();
        };
        BN3.prototype.mul = function mul3(num) {
          var out = new BN3(null);
          out.words = new Array(this.length + num.length);
          return this.mulTo(num, out);
        };
        BN3.prototype.mulf = function mulf(num) {
          var out = new BN3(null);
          out.words = new Array(this.length + num.length);
          return jumboMulTo(this, num, out);
        };
        BN3.prototype.imul = function imul(num) {
          return this.clone().mulTo(num, this);
        };
        BN3.prototype.imuln = function imuln(num) {
          assert2(typeof num === "number");
          assert2(num < 67108864);
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = (this.words[i] | 0) * num;
            var lo = (w & 67108863) + (carry & 67108863);
            carry >>= 26;
            carry += w / 67108864 | 0;
            carry += lo >>> 26;
            this.words[i] = lo & 67108863;
          }
          if (carry !== 0) {
            this.words[i] = carry;
            this.length++;
          }
          return this;
        };
        BN3.prototype.muln = function muln(num) {
          return this.clone().imuln(num);
        };
        BN3.prototype.sqr = function sqr() {
          return this.mul(this);
        };
        BN3.prototype.isqr = function isqr() {
          return this.imul(this.clone());
        };
        BN3.prototype.pow = function pow(num) {
          var w = toBitArray(num);
          if (w.length === 0)
            return new BN3(1);
          var res = this;
          for (var i = 0; i < w.length; i++, res = res.sqr()) {
            if (w[i] !== 0)
              break;
          }
          if (++i < w.length) {
            for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
              if (w[i] === 0)
                continue;
              res = res.mul(q);
            }
          }
          return res;
        };
        BN3.prototype.iushln = function iushln(bits) {
          assert2(typeof bits === "number" && bits >= 0);
          var r = bits % 26;
          var s = (bits - r) / 26;
          var carryMask = 67108863 >>> 26 - r << 26 - r;
          var i;
          if (r !== 0) {
            var carry = 0;
            for (i = 0; i < this.length; i++) {
              var newCarry = this.words[i] & carryMask;
              var c = (this.words[i] | 0) - newCarry << r;
              this.words[i] = c | carry;
              carry = newCarry >>> 26 - r;
            }
            if (carry) {
              this.words[i] = carry;
              this.length++;
            }
          }
          if (s !== 0) {
            for (i = this.length - 1; i >= 0; i--) {
              this.words[i + s] = this.words[i];
            }
            for (i = 0; i < s; i++) {
              this.words[i] = 0;
            }
            this.length += s;
          }
          return this.strip();
        };
        BN3.prototype.ishln = function ishln(bits) {
          assert2(this.negative === 0);
          return this.iushln(bits);
        };
        BN3.prototype.iushrn = function iushrn(bits, hint, extended) {
          assert2(typeof bits === "number" && bits >= 0);
          var h;
          if (hint) {
            h = (hint - hint % 26) / 26;
          } else {
            h = 0;
          }
          var r = bits % 26;
          var s = Math.min((bits - r) / 26, this.length);
          var mask = 67108863 ^ 67108863 >>> r << r;
          var maskedWords = extended;
          h -= s;
          h = Math.max(0, h);
          if (maskedWords) {
            for (var i = 0; i < s; i++) {
              maskedWords.words[i] = this.words[i];
            }
            maskedWords.length = s;
          }
          if (s === 0) {
          } else if (this.length > s) {
            this.length -= s;
            for (i = 0; i < this.length; i++) {
              this.words[i] = this.words[i + s];
            }
          } else {
            this.words[0] = 0;
            this.length = 1;
          }
          var carry = 0;
          for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
            var word = this.words[i] | 0;
            this.words[i] = carry << 26 - r | word >>> r;
            carry = word & mask;
          }
          if (maskedWords && carry !== 0) {
            maskedWords.words[maskedWords.length++] = carry;
          }
          if (this.length === 0) {
            this.words[0] = 0;
            this.length = 1;
          }
          return this.strip();
        };
        BN3.prototype.ishrn = function ishrn(bits, hint, extended) {
          assert2(this.negative === 0);
          return this.iushrn(bits, hint, extended);
        };
        BN3.prototype.shln = function shln(bits) {
          return this.clone().ishln(bits);
        };
        BN3.prototype.ushln = function ushln(bits) {
          return this.clone().iushln(bits);
        };
        BN3.prototype.shrn = function shrn(bits) {
          return this.clone().ishrn(bits);
        };
        BN3.prototype.ushrn = function ushrn(bits) {
          return this.clone().iushrn(bits);
        };
        BN3.prototype.testn = function testn(bit) {
          assert2(typeof bit === "number" && bit >= 0);
          var r = bit % 26;
          var s = (bit - r) / 26;
          var q = 1 << r;
          if (this.length <= s)
            return false;
          var w = this.words[s];
          return !!(w & q);
        };
        BN3.prototype.imaskn = function imaskn(bits) {
          assert2(typeof bits === "number" && bits >= 0);
          var r = bits % 26;
          var s = (bits - r) / 26;
          assert2(this.negative === 0, "imaskn works only with positive numbers");
          if (this.length <= s) {
            return this;
          }
          if (r !== 0) {
            s++;
          }
          this.length = Math.min(s, this.length);
          if (r !== 0) {
            var mask = 67108863 ^ 67108863 >>> r << r;
            this.words[this.length - 1] &= mask;
          }
          return this.strip();
        };
        BN3.prototype.maskn = function maskn(bits) {
          return this.clone().imaskn(bits);
        };
        BN3.prototype.iaddn = function iaddn(num) {
          assert2(typeof num === "number");
          assert2(num < 67108864);
          if (num < 0)
            return this.isubn(-num);
          if (this.negative !== 0) {
            if (this.length === 1 && (this.words[0] | 0) < num) {
              this.words[0] = num - (this.words[0] | 0);
              this.negative = 0;
              return this;
            }
            this.negative = 0;
            this.isubn(num);
            this.negative = 1;
            return this;
          }
          return this._iaddn(num);
        };
        BN3.prototype._iaddn = function _iaddn(num) {
          this.words[0] += num;
          for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
            this.words[i] -= 67108864;
            if (i === this.length - 1) {
              this.words[i + 1] = 1;
            } else {
              this.words[i + 1]++;
            }
          }
          this.length = Math.max(this.length, i + 1);
          return this;
        };
        BN3.prototype.isubn = function isubn(num) {
          assert2(typeof num === "number");
          assert2(num < 67108864);
          if (num < 0)
            return this.iaddn(-num);
          if (this.negative !== 0) {
            this.negative = 0;
            this.iaddn(num);
            this.negative = 1;
            return this;
          }
          this.words[0] -= num;
          if (this.length === 1 && this.words[0] < 0) {
            this.words[0] = -this.words[0];
            this.negative = 1;
          } else {
            for (var i = 0; i < this.length && this.words[i] < 0; i++) {
              this.words[i] += 67108864;
              this.words[i + 1] -= 1;
            }
          }
          return this.strip();
        };
        BN3.prototype.addn = function addn(num) {
          return this.clone().iaddn(num);
        };
        BN3.prototype.subn = function subn(num) {
          return this.clone().isubn(num);
        };
        BN3.prototype.iabs = function iabs() {
          this.negative = 0;
          return this;
        };
        BN3.prototype.abs = function abs() {
          return this.clone().iabs();
        };
        BN3.prototype._ishlnsubmul = function _ishlnsubmul(num, mul3, shift) {
          var len = num.length + shift;
          var i;
          this._expand(len);
          var w;
          var carry = 0;
          for (i = 0; i < num.length; i++) {
            w = (this.words[i + shift] | 0) + carry;
            var right = (num.words[i] | 0) * mul3;
            w -= right & 67108863;
            carry = (w >> 26) - (right / 67108864 | 0);
            this.words[i + shift] = w & 67108863;
          }
          for (; i < this.length - shift; i++) {
            w = (this.words[i + shift] | 0) + carry;
            carry = w >> 26;
            this.words[i + shift] = w & 67108863;
          }
          if (carry === 0)
            return this.strip();
          assert2(carry === -1);
          carry = 0;
          for (i = 0; i < this.length; i++) {
            w = -(this.words[i] | 0) + carry;
            carry = w >> 26;
            this.words[i] = w & 67108863;
          }
          this.negative = 1;
          return this.strip();
        };
        BN3.prototype._wordDiv = function _wordDiv(num, mode) {
          var shift = this.length - num.length;
          var a = this.clone();
          var b = num;
          var bhi = b.words[b.length - 1] | 0;
          var bhiBits = this._countBits(bhi);
          shift = 26 - bhiBits;
          if (shift !== 0) {
            b = b.ushln(shift);
            a.iushln(shift);
            bhi = b.words[b.length - 1] | 0;
          }
          var m = a.length - b.length;
          var q;
          if (mode !== "mod") {
            q = new BN3(null);
            q.length = m + 1;
            q.words = new Array(q.length);
            for (var i = 0; i < q.length; i++) {
              q.words[i] = 0;
            }
          }
          var diff = a.clone()._ishlnsubmul(b, 1, m);
          if (diff.negative === 0) {
            a = diff;
            if (q) {
              q.words[m] = 1;
            }
          }
          for (var j = m - 1; j >= 0; j--) {
            var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
            qj = Math.min(qj / bhi | 0, 67108863);
            a._ishlnsubmul(b, qj, j);
            while (a.negative !== 0) {
              qj--;
              a.negative = 0;
              a._ishlnsubmul(b, 1, j);
              if (!a.isZero()) {
                a.negative ^= 1;
              }
            }
            if (q) {
              q.words[j] = qj;
            }
          }
          if (q) {
            q.strip();
          }
          a.strip();
          if (mode !== "div" && shift !== 0) {
            a.iushrn(shift);
          }
          return {
            div: q || null,
            mod: a
          };
        };
        BN3.prototype.divmod = function divmod(num, mode, positive) {
          assert2(!num.isZero());
          if (this.isZero()) {
            return {
              div: new BN3(0),
              mod: new BN3(0)
            };
          }
          var div, mod, res;
          if (this.negative !== 0 && num.negative === 0) {
            res = this.neg().divmod(num, mode);
            if (mode !== "mod") {
              div = res.div.neg();
            }
            if (mode !== "div") {
              mod = res.mod.neg();
              if (positive && mod.negative !== 0) {
                mod.iadd(num);
              }
            }
            return {
              div,
              mod
            };
          }
          if (this.negative === 0 && num.negative !== 0) {
            res = this.divmod(num.neg(), mode);
            if (mode !== "mod") {
              div = res.div.neg();
            }
            return {
              div,
              mod: res.mod
            };
          }
          if ((this.negative & num.negative) !== 0) {
            res = this.neg().divmod(num.neg(), mode);
            if (mode !== "div") {
              mod = res.mod.neg();
              if (positive && mod.negative !== 0) {
                mod.isub(num);
              }
            }
            return {
              div: res.div,
              mod
            };
          }
          if (num.length > this.length || this.cmp(num) < 0) {
            return {
              div: new BN3(0),
              mod: this
            };
          }
          if (num.length === 1) {
            if (mode === "div") {
              return {
                div: this.divn(num.words[0]),
                mod: null
              };
            }
            if (mode === "mod") {
              return {
                div: null,
                mod: new BN3(this.modn(num.words[0]))
              };
            }
            return {
              div: this.divn(num.words[0]),
              mod: new BN3(this.modn(num.words[0]))
            };
          }
          return this._wordDiv(num, mode);
        };
        BN3.prototype.div = function div(num) {
          return this.divmod(num, "div", false).div;
        };
        BN3.prototype.mod = function mod(num) {
          return this.divmod(num, "mod", false).mod;
        };
        BN3.prototype.umod = function umod(num) {
          return this.divmod(num, "mod", true).mod;
        };
        BN3.prototype.divRound = function divRound(num) {
          var dm = this.divmod(num);
          if (dm.mod.isZero())
            return dm.div;
          var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
          var half = num.ushrn(1);
          var r2 = num.andln(1);
          var cmp = mod.cmp(half);
          if (cmp < 0 || r2 === 1 && cmp === 0)
            return dm.div;
          return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
        };
        BN3.prototype.modn = function modn(num) {
          assert2(num <= 67108863);
          var p = (1 << 26) % num;
          var acc = 0;
          for (var i = this.length - 1; i >= 0; i--) {
            acc = (p * acc + (this.words[i] | 0)) % num;
          }
          return acc;
        };
        BN3.prototype.idivn = function idivn(num) {
          assert2(num <= 67108863);
          var carry = 0;
          for (var i = this.length - 1; i >= 0; i--) {
            var w = (this.words[i] | 0) + carry * 67108864;
            this.words[i] = w / num | 0;
            carry = w % num;
          }
          return this.strip();
        };
        BN3.prototype.divn = function divn(num) {
          return this.clone().idivn(num);
        };
        BN3.prototype.egcd = function egcd(p) {
          assert2(p.negative === 0);
          assert2(!p.isZero());
          var x = this;
          var y = p.clone();
          if (x.negative !== 0) {
            x = x.umod(p);
          } else {
            x = x.clone();
          }
          var A = new BN3(1);
          var B = new BN3(0);
          var C = new BN3(0);
          var D = new BN3(1);
          var g = 0;
          while (x.isEven() && y.isEven()) {
            x.iushrn(1);
            y.iushrn(1);
            ++g;
          }
          var yp = y.clone();
          var xp = x.clone();
          while (!x.isZero()) {
            for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
              ;
            if (i > 0) {
              x.iushrn(i);
              while (i-- > 0) {
                if (A.isOdd() || B.isOdd()) {
                  A.iadd(yp);
                  B.isub(xp);
                }
                A.iushrn(1);
                B.iushrn(1);
              }
            }
            for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
              ;
            if (j > 0) {
              y.iushrn(j);
              while (j-- > 0) {
                if (C.isOdd() || D.isOdd()) {
                  C.iadd(yp);
                  D.isub(xp);
                }
                C.iushrn(1);
                D.iushrn(1);
              }
            }
            if (x.cmp(y) >= 0) {
              x.isub(y);
              A.isub(C);
              B.isub(D);
            } else {
              y.isub(x);
              C.isub(A);
              D.isub(B);
            }
          }
          return {
            a: C,
            b: D,
            gcd: y.iushln(g)
          };
        };
        BN3.prototype._invmp = function _invmp(p) {
          assert2(p.negative === 0);
          assert2(!p.isZero());
          var a = this;
          var b = p.clone();
          if (a.negative !== 0) {
            a = a.umod(p);
          } else {
            a = a.clone();
          }
          var x1 = new BN3(1);
          var x2 = new BN3(0);
          var delta = b.clone();
          while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
            for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
              ;
            if (i > 0) {
              a.iushrn(i);
              while (i-- > 0) {
                if (x1.isOdd()) {
                  x1.iadd(delta);
                }
                x1.iushrn(1);
              }
            }
            for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
              ;
            if (j > 0) {
              b.iushrn(j);
              while (j-- > 0) {
                if (x2.isOdd()) {
                  x2.iadd(delta);
                }
                x2.iushrn(1);
              }
            }
            if (a.cmp(b) >= 0) {
              a.isub(b);
              x1.isub(x2);
            } else {
              b.isub(a);
              x2.isub(x1);
            }
          }
          var res;
          if (a.cmpn(1) === 0) {
            res = x1;
          } else {
            res = x2;
          }
          if (res.cmpn(0) < 0) {
            res.iadd(p);
          }
          return res;
        };
        BN3.prototype.gcd = function gcd(num) {
          if (this.isZero())
            return num.abs();
          if (num.isZero())
            return this.abs();
          var a = this.clone();
          var b = num.clone();
          a.negative = 0;
          b.negative = 0;
          for (var shift = 0; a.isEven() && b.isEven(); shift++) {
            a.iushrn(1);
            b.iushrn(1);
          }
          do {
            while (a.isEven()) {
              a.iushrn(1);
            }
            while (b.isEven()) {
              b.iushrn(1);
            }
            var r = a.cmp(b);
            if (r < 0) {
              var t = a;
              a = b;
              b = t;
            } else if (r === 0 || b.cmpn(1) === 0) {
              break;
            }
            a.isub(b);
          } while (true);
          return b.iushln(shift);
        };
        BN3.prototype.invm = function invm(num) {
          return this.egcd(num).a.umod(num);
        };
        BN3.prototype.isEven = function isEven() {
          return (this.words[0] & 1) === 0;
        };
        BN3.prototype.isOdd = function isOdd() {
          return (this.words[0] & 1) === 1;
        };
        BN3.prototype.andln = function andln(num) {
          return this.words[0] & num;
        };
        BN3.prototype.bincn = function bincn(bit) {
          assert2(typeof bit === "number");
          var r = bit % 26;
          var s = (bit - r) / 26;
          var q = 1 << r;
          if (this.length <= s) {
            this._expand(s + 1);
            this.words[s] |= q;
            return this;
          }
          var carry = q;
          for (var i = s; carry !== 0 && i < this.length; i++) {
            var w = this.words[i] | 0;
            w += carry;
            carry = w >>> 26;
            w &= 67108863;
            this.words[i] = w;
          }
          if (carry !== 0) {
            this.words[i] = carry;
            this.length++;
          }
          return this;
        };
        BN3.prototype.isZero = function isZero() {
          return this.length === 1 && this.words[0] === 0;
        };
        BN3.prototype.cmpn = function cmpn(num) {
          var negative = num < 0;
          if (this.negative !== 0 && !negative)
            return -1;
          if (this.negative === 0 && negative)
            return 1;
          this.strip();
          var res;
          if (this.length > 1) {
            res = 1;
          } else {
            if (negative) {
              num = -num;
            }
            assert2(num <= 67108863, "Number is too big");
            var w = this.words[0] | 0;
            res = w === num ? 0 : w < num ? -1 : 1;
          }
          if (this.negative !== 0)
            return -res | 0;
          return res;
        };
        BN3.prototype.cmp = function cmp(num) {
          if (this.negative !== 0 && num.negative === 0)
            return -1;
          if (this.negative === 0 && num.negative !== 0)
            return 1;
          var res = this.ucmp(num);
          if (this.negative !== 0)
            return -res | 0;
          return res;
        };
        BN3.prototype.ucmp = function ucmp(num) {
          if (this.length > num.length)
            return 1;
          if (this.length < num.length)
            return -1;
          var res = 0;
          for (var i = this.length - 1; i >= 0; i--) {
            var a = this.words[i] | 0;
            var b = num.words[i] | 0;
            if (a === b)
              continue;
            if (a < b) {
              res = -1;
            } else if (a > b) {
              res = 1;
            }
            break;
          }
          return res;
        };
        BN3.prototype.gtn = function gtn(num) {
          return this.cmpn(num) === 1;
        };
        BN3.prototype.gt = function gt(num) {
          return this.cmp(num) === 1;
        };
        BN3.prototype.gten = function gten(num) {
          return this.cmpn(num) >= 0;
        };
        BN3.prototype.gte = function gte(num) {
          return this.cmp(num) >= 0;
        };
        BN3.prototype.ltn = function ltn(num) {
          return this.cmpn(num) === -1;
        };
        BN3.prototype.lt = function lt(num) {
          return this.cmp(num) === -1;
        };
        BN3.prototype.lten = function lten(num) {
          return this.cmpn(num) <= 0;
        };
        BN3.prototype.lte = function lte(num) {
          return this.cmp(num) <= 0;
        };
        BN3.prototype.eqn = function eqn(num) {
          return this.cmpn(num) === 0;
        };
        BN3.prototype.eq = function eq4(num) {
          return this.cmp(num) === 0;
        };
        BN3.red = function red(num) {
          return new Red(num);
        };
        BN3.prototype.toRed = function toRed(ctx) {
          assert2(!this.red, "Already a number in reduction context");
          assert2(this.negative === 0, "red works only with positives");
          return ctx.convertTo(this)._forceRed(ctx);
        };
        BN3.prototype.fromRed = function fromRed() {
          assert2(this.red, "fromRed works only with numbers in reduction context");
          return this.red.convertFrom(this);
        };
        BN3.prototype._forceRed = function _forceRed(ctx) {
          this.red = ctx;
          return this;
        };
        BN3.prototype.forceRed = function forceRed(ctx) {
          assert2(!this.red, "Already a number in reduction context");
          return this._forceRed(ctx);
        };
        BN3.prototype.redAdd = function redAdd(num) {
          assert2(this.red, "redAdd works only with red numbers");
          return this.red.add(this, num);
        };
        BN3.prototype.redIAdd = function redIAdd(num) {
          assert2(this.red, "redIAdd works only with red numbers");
          return this.red.iadd(this, num);
        };
        BN3.prototype.redSub = function redSub(num) {
          assert2(this.red, "redSub works only with red numbers");
          return this.red.sub(this, num);
        };
        BN3.prototype.redISub = function redISub(num) {
          assert2(this.red, "redISub works only with red numbers");
          return this.red.isub(this, num);
        };
        BN3.prototype.redShl = function redShl(num) {
          assert2(this.red, "redShl works only with red numbers");
          return this.red.shl(this, num);
        };
        BN3.prototype.redMul = function redMul(num) {
          assert2(this.red, "redMul works only with red numbers");
          this.red._verify2(this, num);
          return this.red.mul(this, num);
        };
        BN3.prototype.redIMul = function redIMul(num) {
          assert2(this.red, "redMul works only with red numbers");
          this.red._verify2(this, num);
          return this.red.imul(this, num);
        };
        BN3.prototype.redSqr = function redSqr() {
          assert2(this.red, "redSqr works only with red numbers");
          this.red._verify1(this);
          return this.red.sqr(this);
        };
        BN3.prototype.redISqr = function redISqr() {
          assert2(this.red, "redISqr works only with red numbers");
          this.red._verify1(this);
          return this.red.isqr(this);
        };
        BN3.prototype.redSqrt = function redSqrt() {
          assert2(this.red, "redSqrt works only with red numbers");
          this.red._verify1(this);
          return this.red.sqrt(this);
        };
        BN3.prototype.redInvm = function redInvm() {
          assert2(this.red, "redInvm works only with red numbers");
          this.red._verify1(this);
          return this.red.invm(this);
        };
        BN3.prototype.redNeg = function redNeg() {
          assert2(this.red, "redNeg works only with red numbers");
          this.red._verify1(this);
          return this.red.neg(this);
        };
        BN3.prototype.redPow = function redPow(num) {
          assert2(this.red && !num.red, "redPow(normalNum)");
          this.red._verify1(this);
          return this.red.pow(this, num);
        };
        var primes = {
          k256: null,
          p224: null,
          p192: null,
          p25519: null
        };
        function MPrime(name2, p) {
          this.name = name2;
          this.p = new BN3(p, 16);
          this.n = this.p.bitLength();
          this.k = new BN3(1).iushln(this.n).isub(this.p);
          this.tmp = this._tmp();
        }
        MPrime.prototype._tmp = function _tmp() {
          var tmp = new BN3(null);
          tmp.words = new Array(Math.ceil(this.n / 13));
          return tmp;
        };
        MPrime.prototype.ireduce = function ireduce(num) {
          var r = num;
          var rlen;
          do {
            this.split(r, this.tmp);
            r = this.imulK(r);
            r = r.iadd(this.tmp);
            rlen = r.bitLength();
          } while (rlen > this.n);
          var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
          if (cmp === 0) {
            r.words[0] = 0;
            r.length = 1;
          } else if (cmp > 0) {
            r.isub(this.p);
          } else {
            if (r.strip !== void 0) {
              r.strip();
            } else {
              r._strip();
            }
          }
          return r;
        };
        MPrime.prototype.split = function split(input, out) {
          input.iushrn(this.n, 0, out);
        };
        MPrime.prototype.imulK = function imulK(num) {
          return num.imul(this.k);
        };
        function K256() {
          MPrime.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
        }
        inherits(K256, MPrime);
        K256.prototype.split = function split(input, output) {
          var mask = 4194303;
          var outLen = Math.min(input.length, 9);
          for (var i = 0; i < outLen; i++) {
            output.words[i] = input.words[i];
          }
          output.length = outLen;
          if (input.length <= 9) {
            input.words[0] = 0;
            input.length = 1;
            return;
          }
          var prev = input.words[9];
          output.words[output.length++] = prev & mask;
          for (i = 10; i < input.length; i++) {
            var next = input.words[i] | 0;
            input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
            prev = next;
          }
          prev >>>= 22;
          input.words[i - 10] = prev;
          if (prev === 0 && input.length > 10) {
            input.length -= 10;
          } else {
            input.length -= 9;
          }
        };
        K256.prototype.imulK = function imulK(num) {
          num.words[num.length] = 0;
          num.words[num.length + 1] = 0;
          num.length += 2;
          var lo = 0;
          for (var i = 0; i < num.length; i++) {
            var w = num.words[i] | 0;
            lo += w * 977;
            num.words[i] = lo & 67108863;
            lo = w * 64 + (lo / 67108864 | 0);
          }
          if (num.words[num.length - 1] === 0) {
            num.length--;
            if (num.words[num.length - 1] === 0) {
              num.length--;
            }
          }
          return num;
        };
        function P224() {
          MPrime.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
        }
        inherits(P224, MPrime);
        function P192() {
          MPrime.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
        }
        inherits(P192, MPrime);
        function P25519() {
          MPrime.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
        }
        inherits(P25519, MPrime);
        P25519.prototype.imulK = function imulK(num) {
          var carry = 0;
          for (var i = 0; i < num.length; i++) {
            var hi = (num.words[i] | 0) * 19 + carry;
            var lo = hi & 67108863;
            hi >>>= 26;
            num.words[i] = lo;
            carry = hi;
          }
          if (carry !== 0) {
            num.words[num.length++] = carry;
          }
          return num;
        };
        BN3._prime = function prime(name2) {
          if (primes[name2])
            return primes[name2];
          var prime2;
          if (name2 === "k256") {
            prime2 = new K256();
          } else if (name2 === "p224") {
            prime2 = new P224();
          } else if (name2 === "p192") {
            prime2 = new P192();
          } else if (name2 === "p25519") {
            prime2 = new P25519();
          } else {
            throw new Error("Unknown prime " + name2);
          }
          primes[name2] = prime2;
          return prime2;
        };
        function Red(m) {
          if (typeof m === "string") {
            var prime = BN3._prime(m);
            this.m = prime.p;
            this.prime = prime;
          } else {
            assert2(m.gtn(1), "modulus must be greater than 1");
            this.m = m;
            this.prime = null;
          }
        }
        Red.prototype._verify1 = function _verify1(a) {
          assert2(a.negative === 0, "red works only with positives");
          assert2(a.red, "red works only with red numbers");
        };
        Red.prototype._verify2 = function _verify2(a, b) {
          assert2((a.negative | b.negative) === 0, "red works only with positives");
          assert2(a.red && a.red === b.red, "red works only with red numbers");
        };
        Red.prototype.imod = function imod(a) {
          if (this.prime)
            return this.prime.ireduce(a)._forceRed(this);
          return a.umod(this.m)._forceRed(this);
        };
        Red.prototype.neg = function neg3(a) {
          if (a.isZero()) {
            return a.clone();
          }
          return this.m.sub(a)._forceRed(this);
        };
        Red.prototype.add = function add3(a, b) {
          this._verify2(a, b);
          var res = a.add(b);
          if (res.cmp(this.m) >= 0) {
            res.isub(this.m);
          }
          return res._forceRed(this);
        };
        Red.prototype.iadd = function iadd(a, b) {
          this._verify2(a, b);
          var res = a.iadd(b);
          if (res.cmp(this.m) >= 0) {
            res.isub(this.m);
          }
          return res;
        };
        Red.prototype.sub = function sub(a, b) {
          this._verify2(a, b);
          var res = a.sub(b);
          if (res.cmpn(0) < 0) {
            res.iadd(this.m);
          }
          return res._forceRed(this);
        };
        Red.prototype.isub = function isub(a, b) {
          this._verify2(a, b);
          var res = a.isub(b);
          if (res.cmpn(0) < 0) {
            res.iadd(this.m);
          }
          return res;
        };
        Red.prototype.shl = function shl(a, num) {
          this._verify1(a);
          return this.imod(a.ushln(num));
        };
        Red.prototype.imul = function imul(a, b) {
          this._verify2(a, b);
          return this.imod(a.imul(b));
        };
        Red.prototype.mul = function mul3(a, b) {
          this._verify2(a, b);
          return this.imod(a.mul(b));
        };
        Red.prototype.isqr = function isqr(a) {
          return this.imul(a, a.clone());
        };
        Red.prototype.sqr = function sqr(a) {
          return this.mul(a, a);
        };
        Red.prototype.sqrt = function sqrt(a) {
          if (a.isZero())
            return a.clone();
          var mod3 = this.m.andln(3);
          assert2(mod3 % 2 === 1);
          if (mod3 === 3) {
            var pow = this.m.add(new BN3(1)).iushrn(2);
            return this.pow(a, pow);
          }
          var q = this.m.subn(1);
          var s = 0;
          while (!q.isZero() && q.andln(1) === 0) {
            s++;
            q.iushrn(1);
          }
          assert2(!q.isZero());
          var one = new BN3(1).toRed(this);
          var nOne = one.redNeg();
          var lpow = this.m.subn(1).iushrn(1);
          var z = this.m.bitLength();
          z = new BN3(2 * z * z).toRed(this);
          while (this.pow(z, lpow).cmp(nOne) !== 0) {
            z.redIAdd(nOne);
          }
          var c = this.pow(z, q);
          var r = this.pow(a, q.addn(1).iushrn(1));
          var t = this.pow(a, q);
          var m = s;
          while (t.cmp(one) !== 0) {
            var tmp = t;
            for (var i = 0; tmp.cmp(one) !== 0; i++) {
              tmp = tmp.redSqr();
            }
            assert2(i < m);
            var b = this.pow(c, new BN3(1).iushln(m - i - 1));
            r = r.redMul(b);
            c = b.redSqr();
            t = t.redMul(c);
            m = i;
          }
          return r;
        };
        Red.prototype.invm = function invm(a) {
          var inv = a._invmp(this.m);
          if (inv.negative !== 0) {
            inv.negative = 0;
            return this.imod(inv).redNeg();
          } else {
            return this.imod(inv);
          }
        };
        Red.prototype.pow = function pow(a, num) {
          if (num.isZero())
            return new BN3(1).toRed(this);
          if (num.cmpn(1) === 0)
            return a.clone();
          var windowSize = 4;
          var wnd = new Array(1 << windowSize);
          wnd[0] = new BN3(1).toRed(this);
          wnd[1] = a;
          for (var i = 2; i < wnd.length; i++) {
            wnd[i] = this.mul(wnd[i - 1], a);
          }
          var res = wnd[0];
          var current = 0;
          var currentLen = 0;
          var start2 = num.bitLength() % 26;
          if (start2 === 0) {
            start2 = 26;
          }
          for (i = num.length - 1; i >= 0; i--) {
            var word = num.words[i];
            for (var j = start2 - 1; j >= 0; j--) {
              var bit = word >> j & 1;
              if (res !== wnd[0]) {
                res = this.sqr(res);
              }
              if (bit === 0 && current === 0) {
                currentLen = 0;
                continue;
              }
              current <<= 1;
              current |= bit;
              currentLen++;
              if (currentLen !== windowSize && (i !== 0 || j !== 0))
                continue;
              res = this.mul(res, wnd[current]);
              currentLen = 0;
              current = 0;
            }
            start2 = 26;
          }
          return res;
        };
        Red.prototype.convertTo = function convertTo(num) {
          var r = num.umod(this.m);
          return r === num ? r.clone() : r;
        };
        Red.prototype.convertFrom = function convertFrom(num) {
          var res = num.clone();
          res.red = null;
          return res;
        };
        BN3.mont = function mont(num) {
          return new Mont(num);
        };
        function Mont(m) {
          Red.call(this, m);
          this.shift = this.m.bitLength();
          if (this.shift % 26 !== 0) {
            this.shift += 26 - this.shift % 26;
          }
          this.r = new BN3(1).iushln(this.shift);
          this.r2 = this.imod(this.r.sqr());
          this.rinv = this.r._invmp(this.m);
          this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
          this.minv = this.minv.umod(this.r);
          this.minv = this.r.sub(this.minv);
        }
        inherits(Mont, Red);
        Mont.prototype.convertTo = function convertTo(num) {
          return this.imod(num.ushln(this.shift));
        };
        Mont.prototype.convertFrom = function convertFrom(num) {
          var r = this.imod(num.mul(this.rinv));
          r.red = null;
          return r;
        };
        Mont.prototype.imul = function imul(a, b) {
          if (a.isZero() || b.isZero()) {
            a.words[0] = 0;
            a.length = 1;
            return a;
          }
          var t = a.imul(b);
          var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
          var u = t.isub(c).iushrn(this.shift);
          var res = u;
          if (u.cmp(this.m) >= 0) {
            res = u.isub(this.m);
          } else if (u.cmpn(0) < 0) {
            res = u.iadd(this.m);
          }
          return res._forceRed(this);
        };
        Mont.prototype.mul = function mul3(a, b) {
          if (a.isZero() || b.isZero())
            return new BN3(0)._forceRed(this);
          var t = a.mul(b);
          var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
          var u = t.isub(c).iushrn(this.shift);
          var res = u;
          if (u.cmp(this.m) >= 0) {
            res = u.isub(this.m);
          } else if (u.cmpn(0) < 0) {
            res = u.iadd(this.m);
          }
          return res._forceRed(this);
        };
        Mont.prototype.invm = function invm(a) {
          var res = this.imod(a._invmp(this.m).mul(this.r2));
          return res._forceRed(this);
        };
      })(typeof module === "undefined" || module, exports);
    }
  });

  // node_modules/minimalistic-assert/index.js
  var require_minimalistic_assert = __commonJS({
    "node_modules/minimalistic-assert/index.js"(exports, module) {
      module.exports = assert2;
      function assert2(val, msg) {
        if (!val)
          throw new Error(msg || "Assertion failed");
      }
      assert2.equal = function assertEqual2(l, r, msg) {
        if (l != r)
          throw new Error(msg || "Assertion failed: " + l + " != " + r);
      };
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/hash.js/lib/hash/utils.js
  var require_utils = __commonJS({
    "node_modules/hash.js/lib/hash/utils.js"(exports) {
      "use strict";
      var assert2 = require_minimalistic_assert();
      var inherits = require_inherits_browser();
      exports.inherits = inherits;
      function isSurrogatePair(msg, i) {
        if ((msg.charCodeAt(i) & 64512) !== 55296) {
          return false;
        }
        if (i < 0 || i + 1 >= msg.length) {
          return false;
        }
        return (msg.charCodeAt(i + 1) & 64512) === 56320;
      }
      function toArray(msg, enc) {
        if (Array.isArray(msg))
          return msg.slice();
        if (!msg)
          return [];
        var res = [];
        if (typeof msg === "string") {
          if (!enc) {
            var p = 0;
            for (var i = 0; i < msg.length; i++) {
              var c = msg.charCodeAt(i);
              if (c < 128) {
                res[p++] = c;
              } else if (c < 2048) {
                res[p++] = c >> 6 | 192;
                res[p++] = c & 63 | 128;
              } else if (isSurrogatePair(msg, i)) {
                c = 65536 + ((c & 1023) << 10) + (msg.charCodeAt(++i) & 1023);
                res[p++] = c >> 18 | 240;
                res[p++] = c >> 12 & 63 | 128;
                res[p++] = c >> 6 & 63 | 128;
                res[p++] = c & 63 | 128;
              } else {
                res[p++] = c >> 12 | 224;
                res[p++] = c >> 6 & 63 | 128;
                res[p++] = c & 63 | 128;
              }
            }
          } else if (enc === "hex") {
            msg = msg.replace(/[^a-z0-9]+/ig, "");
            if (msg.length % 2 !== 0)
              msg = "0" + msg;
            for (i = 0; i < msg.length; i += 2)
              res.push(parseInt(msg[i] + msg[i + 1], 16));
          }
        } else {
          for (i = 0; i < msg.length; i++)
            res[i] = msg[i] | 0;
        }
        return res;
      }
      exports.toArray = toArray;
      function toHex2(msg) {
        var res = "";
        for (var i = 0; i < msg.length; i++)
          res += zero2(msg[i].toString(16));
        return res;
      }
      exports.toHex = toHex2;
      function htonl(w) {
        var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
        return res >>> 0;
      }
      exports.htonl = htonl;
      function toHex32(msg, endian) {
        var res = "";
        for (var i = 0; i < msg.length; i++) {
          var w = msg[i];
          if (endian === "little")
            w = htonl(w);
          res += zero8(w.toString(16));
        }
        return res;
      }
      exports.toHex32 = toHex32;
      function zero2(word) {
        if (word.length === 1)
          return "0" + word;
        else
          return word;
      }
      exports.zero2 = zero2;
      function zero8(word) {
        if (word.length === 7)
          return "0" + word;
        else if (word.length === 6)
          return "00" + word;
        else if (word.length === 5)
          return "000" + word;
        else if (word.length === 4)
          return "0000" + word;
        else if (word.length === 3)
          return "00000" + word;
        else if (word.length === 2)
          return "000000" + word;
        else if (word.length === 1)
          return "0000000" + word;
        else
          return word;
      }
      exports.zero8 = zero8;
      function join32(msg, start2, end, endian) {
        var len = end - start2;
        assert2(len % 4 === 0);
        var res = new Array(len / 4);
        for (var i = 0, k = start2; i < res.length; i++, k += 4) {
          var w;
          if (endian === "big")
            w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
          else
            w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
          res[i] = w >>> 0;
        }
        return res;
      }
      exports.join32 = join32;
      function split32(msg, endian) {
        var res = new Array(msg.length * 4);
        for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
          var m = msg[i];
          if (endian === "big") {
            res[k] = m >>> 24;
            res[k + 1] = m >>> 16 & 255;
            res[k + 2] = m >>> 8 & 255;
            res[k + 3] = m & 255;
          } else {
            res[k + 3] = m >>> 24;
            res[k + 2] = m >>> 16 & 255;
            res[k + 1] = m >>> 8 & 255;
            res[k] = m & 255;
          }
        }
        return res;
      }
      exports.split32 = split32;
      function rotr32(w, b) {
        return w >>> b | w << 32 - b;
      }
      exports.rotr32 = rotr32;
      function rotl32(w, b) {
        return w << b | w >>> 32 - b;
      }
      exports.rotl32 = rotl32;
      function sum32(a, b) {
        return a + b >>> 0;
      }
      exports.sum32 = sum32;
      function sum32_3(a, b, c) {
        return a + b + c >>> 0;
      }
      exports.sum32_3 = sum32_3;
      function sum32_4(a, b, c, d) {
        return a + b + c + d >>> 0;
      }
      exports.sum32_4 = sum32_4;
      function sum32_5(a, b, c, d, e) {
        return a + b + c + d + e >>> 0;
      }
      exports.sum32_5 = sum32_5;
      function sum64(buf, pos, ah, al) {
        var bh = buf[pos];
        var bl = buf[pos + 1];
        var lo = al + bl >>> 0;
        var hi = (lo < al ? 1 : 0) + ah + bh;
        buf[pos] = hi >>> 0;
        buf[pos + 1] = lo;
      }
      exports.sum64 = sum64;
      function sum64_hi(ah, al, bh, bl) {
        var lo = al + bl >>> 0;
        var hi = (lo < al ? 1 : 0) + ah + bh;
        return hi >>> 0;
      }
      exports.sum64_hi = sum64_hi;
      function sum64_lo(ah, al, bh, bl) {
        var lo = al + bl;
        return lo >>> 0;
      }
      exports.sum64_lo = sum64_lo;
      function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
        var carry = 0;
        var lo = al;
        lo = lo + bl >>> 0;
        carry += lo < al ? 1 : 0;
        lo = lo + cl >>> 0;
        carry += lo < cl ? 1 : 0;
        lo = lo + dl >>> 0;
        carry += lo < dl ? 1 : 0;
        var hi = ah + bh + ch + dh + carry;
        return hi >>> 0;
      }
      exports.sum64_4_hi = sum64_4_hi;
      function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
        var lo = al + bl + cl + dl;
        return lo >>> 0;
      }
      exports.sum64_4_lo = sum64_4_lo;
      function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
        var carry = 0;
        var lo = al;
        lo = lo + bl >>> 0;
        carry += lo < al ? 1 : 0;
        lo = lo + cl >>> 0;
        carry += lo < cl ? 1 : 0;
        lo = lo + dl >>> 0;
        carry += lo < dl ? 1 : 0;
        lo = lo + el >>> 0;
        carry += lo < el ? 1 : 0;
        var hi = ah + bh + ch + dh + eh + carry;
        return hi >>> 0;
      }
      exports.sum64_5_hi = sum64_5_hi;
      function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
        var lo = al + bl + cl + dl + el;
        return lo >>> 0;
      }
      exports.sum64_5_lo = sum64_5_lo;
      function rotr64_hi(ah, al, num) {
        var r = al << 32 - num | ah >>> num;
        return r >>> 0;
      }
      exports.rotr64_hi = rotr64_hi;
      function rotr64_lo(ah, al, num) {
        var r = ah << 32 - num | al >>> num;
        return r >>> 0;
      }
      exports.rotr64_lo = rotr64_lo;
      function shr64_hi(ah, al, num) {
        return ah >>> num;
      }
      exports.shr64_hi = shr64_hi;
      function shr64_lo(ah, al, num) {
        var r = ah << 32 - num | al >>> num;
        return r >>> 0;
      }
      exports.shr64_lo = shr64_lo;
    }
  });

  // node_modules/hash.js/lib/hash/common.js
  var require_common = __commonJS({
    "node_modules/hash.js/lib/hash/common.js"(exports) {
      "use strict";
      var utils = require_utils();
      var assert2 = require_minimalistic_assert();
      function BlockHash() {
        this.pending = null;
        this.pendingTotal = 0;
        this.blockSize = this.constructor.blockSize;
        this.outSize = this.constructor.outSize;
        this.hmacStrength = this.constructor.hmacStrength;
        this.padLength = this.constructor.padLength / 8;
        this.endian = "big";
        this._delta8 = this.blockSize / 8;
        this._delta32 = this.blockSize / 32;
      }
      exports.BlockHash = BlockHash;
      BlockHash.prototype.update = function update2(msg, enc) {
        msg = utils.toArray(msg, enc);
        if (!this.pending)
          this.pending = msg;
        else
          this.pending = this.pending.concat(msg);
        this.pendingTotal += msg.length;
        if (this.pending.length >= this._delta8) {
          msg = this.pending;
          var r = msg.length % this._delta8;
          this.pending = msg.slice(msg.length - r, msg.length);
          if (this.pending.length === 0)
            this.pending = null;
          msg = utils.join32(msg, 0, msg.length - r, this.endian);
          for (var i = 0; i < msg.length; i += this._delta32)
            this._update(msg, i, i + this._delta32);
        }
        return this;
      };
      BlockHash.prototype.digest = function digest(enc) {
        this.update(this._pad());
        assert2(this.pending === null);
        return this._digest(enc);
      };
      BlockHash.prototype._pad = function pad() {
        var len = this.pendingTotal;
        var bytes = this._delta8;
        var k = bytes - (len + this.padLength) % bytes;
        var res = new Array(k + this.padLength);
        res[0] = 128;
        for (var i = 1; i < k; i++)
          res[i] = 0;
        len <<= 3;
        if (this.endian === "big") {
          for (var t = 8; t < this.padLength; t++)
            res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = len >>> 24 & 255;
          res[i++] = len >>> 16 & 255;
          res[i++] = len >>> 8 & 255;
          res[i++] = len & 255;
        } else {
          res[i++] = len & 255;
          res[i++] = len >>> 8 & 255;
          res[i++] = len >>> 16 & 255;
          res[i++] = len >>> 24 & 255;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          for (t = 8; t < this.padLength; t++)
            res[i++] = 0;
        }
        return res;
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha/common.js
  var require_common2 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/common.js"(exports) {
      "use strict";
      var utils = require_utils();
      var rotr32 = utils.rotr32;
      function ft_1(s, x, y, z) {
        if (s === 0)
          return ch32(x, y, z);
        if (s === 1 || s === 3)
          return p32(x, y, z);
        if (s === 2)
          return maj32(x, y, z);
      }
      exports.ft_1 = ft_1;
      function ch32(x, y, z) {
        return x & y ^ ~x & z;
      }
      exports.ch32 = ch32;
      function maj32(x, y, z) {
        return x & y ^ x & z ^ y & z;
      }
      exports.maj32 = maj32;
      function p32(x, y, z) {
        return x ^ y ^ z;
      }
      exports.p32 = p32;
      function s0_256(x) {
        return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
      }
      exports.s0_256 = s0_256;
      function s1_256(x) {
        return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
      }
      exports.s1_256 = s1_256;
      function g0_256(x) {
        return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
      }
      exports.g0_256 = g0_256;
      function g1_256(x) {
        return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
      }
      exports.g1_256 = g1_256;
    }
  });

  // node_modules/hash.js/lib/hash/sha/1.js
  var require__ = __commonJS({
    "node_modules/hash.js/lib/hash/sha/1.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var common = require_common();
      var shaCommon = require_common2();
      var rotl32 = utils.rotl32;
      var sum32 = utils.sum32;
      var sum32_5 = utils.sum32_5;
      var ft_1 = shaCommon.ft_1;
      var BlockHash = common.BlockHash;
      var sha1_K = [
        1518500249,
        1859775393,
        2400959708,
        3395469782
      ];
      function SHA1() {
        if (!(this instanceof SHA1))
          return new SHA1();
        BlockHash.call(this);
        this.h = [
          1732584193,
          4023233417,
          2562383102,
          271733878,
          3285377520
        ];
        this.W = new Array(80);
      }
      utils.inherits(SHA1, BlockHash);
      module.exports = SHA1;
      SHA1.blockSize = 512;
      SHA1.outSize = 160;
      SHA1.hmacStrength = 80;
      SHA1.padLength = 64;
      SHA1.prototype._update = function _update(msg, start2) {
        var W = this.W;
        for (var i = 0; i < 16; i++)
          W[i] = msg[start2 + i];
        for (; i < W.length; i++)
          W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        var a = this.h[0];
        var b = this.h[1];
        var c = this.h[2];
        var d = this.h[3];
        var e = this.h[4];
        for (i = 0; i < W.length; i++) {
          var s = ~~(i / 20);
          var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
          e = d;
          d = c;
          c = rotl32(b, 30);
          b = a;
          a = t;
        }
        this.h[0] = sum32(this.h[0], a);
        this.h[1] = sum32(this.h[1], b);
        this.h[2] = sum32(this.h[2], c);
        this.h[3] = sum32(this.h[3], d);
        this.h[4] = sum32(this.h[4], e);
      };
      SHA1.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "big");
        else
          return utils.split32(this.h, "big");
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha/256.js
  var require__2 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/256.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var common = require_common();
      var shaCommon = require_common2();
      var assert2 = require_minimalistic_assert();
      var sum32 = utils.sum32;
      var sum32_4 = utils.sum32_4;
      var sum32_5 = utils.sum32_5;
      var ch32 = shaCommon.ch32;
      var maj32 = shaCommon.maj32;
      var s0_256 = shaCommon.s0_256;
      var s1_256 = shaCommon.s1_256;
      var g0_256 = shaCommon.g0_256;
      var g1_256 = shaCommon.g1_256;
      var BlockHash = common.BlockHash;
      var sha256_K = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      function SHA256() {
        if (!(this instanceof SHA256))
          return new SHA256();
        BlockHash.call(this);
        this.h = [
          1779033703,
          3144134277,
          1013904242,
          2773480762,
          1359893119,
          2600822924,
          528734635,
          1541459225
        ];
        this.k = sha256_K;
        this.W = new Array(64);
      }
      utils.inherits(SHA256, BlockHash);
      module.exports = SHA256;
      SHA256.blockSize = 512;
      SHA256.outSize = 256;
      SHA256.hmacStrength = 192;
      SHA256.padLength = 64;
      SHA256.prototype._update = function _update(msg, start2) {
        var W = this.W;
        for (var i = 0; i < 16; i++)
          W[i] = msg[start2 + i];
        for (; i < W.length; i++)
          W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
        var a = this.h[0];
        var b = this.h[1];
        var c = this.h[2];
        var d = this.h[3];
        var e = this.h[4];
        var f = this.h[5];
        var g = this.h[6];
        var h = this.h[7];
        assert2(this.k.length === W.length);
        for (i = 0; i < W.length; i++) {
          var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
          var T2 = sum32(s0_256(a), maj32(a, b, c));
          h = g;
          g = f;
          f = e;
          e = sum32(d, T1);
          d = c;
          c = b;
          b = a;
          a = sum32(T1, T2);
        }
        this.h[0] = sum32(this.h[0], a);
        this.h[1] = sum32(this.h[1], b);
        this.h[2] = sum32(this.h[2], c);
        this.h[3] = sum32(this.h[3], d);
        this.h[4] = sum32(this.h[4], e);
        this.h[5] = sum32(this.h[5], f);
        this.h[6] = sum32(this.h[6], g);
        this.h[7] = sum32(this.h[7], h);
      };
      SHA256.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "big");
        else
          return utils.split32(this.h, "big");
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha/224.js
  var require__3 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/224.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var SHA256 = require__2();
      function SHA224() {
        if (!(this instanceof SHA224))
          return new SHA224();
        SHA256.call(this);
        this.h = [
          3238371032,
          914150663,
          812702999,
          4144912697,
          4290775857,
          1750603025,
          1694076839,
          3204075428
        ];
      }
      utils.inherits(SHA224, SHA256);
      module.exports = SHA224;
      SHA224.blockSize = 512;
      SHA224.outSize = 224;
      SHA224.hmacStrength = 192;
      SHA224.padLength = 64;
      SHA224.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h.slice(0, 7), "big");
        else
          return utils.split32(this.h.slice(0, 7), "big");
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha/512.js
  var require__4 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/512.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var common = require_common();
      var assert2 = require_minimalistic_assert();
      var rotr64_hi = utils.rotr64_hi;
      var rotr64_lo = utils.rotr64_lo;
      var shr64_hi = utils.shr64_hi;
      var shr64_lo = utils.shr64_lo;
      var sum64 = utils.sum64;
      var sum64_hi = utils.sum64_hi;
      var sum64_lo = utils.sum64_lo;
      var sum64_4_hi = utils.sum64_4_hi;
      var sum64_4_lo = utils.sum64_4_lo;
      var sum64_5_hi = utils.sum64_5_hi;
      var sum64_5_lo = utils.sum64_5_lo;
      var BlockHash = common.BlockHash;
      var sha512_K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function SHA512() {
        if (!(this instanceof SHA512))
          return new SHA512();
        BlockHash.call(this);
        this.h = [
          1779033703,
          4089235720,
          3144134277,
          2227873595,
          1013904242,
          4271175723,
          2773480762,
          1595750129,
          1359893119,
          2917565137,
          2600822924,
          725511199,
          528734635,
          4215389547,
          1541459225,
          327033209
        ];
        this.k = sha512_K;
        this.W = new Array(160);
      }
      utils.inherits(SHA512, BlockHash);
      module.exports = SHA512;
      SHA512.blockSize = 1024;
      SHA512.outSize = 512;
      SHA512.hmacStrength = 192;
      SHA512.padLength = 128;
      SHA512.prototype._prepareBlock = function _prepareBlock(msg, start2) {
        var W = this.W;
        for (var i = 0; i < 32; i++)
          W[i] = msg[start2 + i];
        for (; i < W.length; i += 2) {
          var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
          var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
          var c1_hi = W[i - 14];
          var c1_lo = W[i - 13];
          var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
          var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
          var c3_hi = W[i - 32];
          var c3_lo = W[i - 31];
          W[i] = sum64_4_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
          W[i + 1] = sum64_4_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
        }
      };
      SHA512.prototype._update = function _update(msg, start2) {
        this._prepareBlock(msg, start2);
        var W = this.W;
        var ah = this.h[0];
        var al = this.h[1];
        var bh = this.h[2];
        var bl = this.h[3];
        var ch = this.h[4];
        var cl = this.h[5];
        var dh = this.h[6];
        var dl = this.h[7];
        var eh = this.h[8];
        var el = this.h[9];
        var fh = this.h[10];
        var fl = this.h[11];
        var gh = this.h[12];
        var gl = this.h[13];
        var hh = this.h[14];
        var hl = this.h[15];
        assert2(this.k.length === W.length);
        for (var i = 0; i < W.length; i += 2) {
          var c0_hi = hh;
          var c0_lo = hl;
          var c1_hi = s1_512_hi(eh, el);
          var c1_lo = s1_512_lo(eh, el);
          var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
          var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
          var c3_hi = this.k[i];
          var c3_lo = this.k[i + 1];
          var c4_hi = W[i];
          var c4_lo = W[i + 1];
          var T1_hi = sum64_5_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
          var T1_lo = sum64_5_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
          c0_hi = s0_512_hi(ah, al);
          c0_lo = s0_512_lo(ah, al);
          c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
          c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
          var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
          var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
          hh = gh;
          hl = gl;
          gh = fh;
          gl = fl;
          fh = eh;
          fl = el;
          eh = sum64_hi(dh, dl, T1_hi, T1_lo);
          el = sum64_lo(dl, dl, T1_hi, T1_lo);
          dh = ch;
          dl = cl;
          ch = bh;
          cl = bl;
          bh = ah;
          bl = al;
          ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
          al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
        }
        sum64(this.h, 0, ah, al);
        sum64(this.h, 2, bh, bl);
        sum64(this.h, 4, ch, cl);
        sum64(this.h, 6, dh, dl);
        sum64(this.h, 8, eh, el);
        sum64(this.h, 10, fh, fl);
        sum64(this.h, 12, gh, gl);
        sum64(this.h, 14, hh, hl);
      };
      SHA512.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "big");
        else
          return utils.split32(this.h, "big");
      };
      function ch64_hi(xh, xl, yh, yl, zh) {
        var r = xh & yh ^ ~xh & zh;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function ch64_lo(xh, xl, yh, yl, zh, zl) {
        var r = xl & yl ^ ~xl & zl;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function maj64_hi(xh, xl, yh, yl, zh) {
        var r = xh & yh ^ xh & zh ^ yh & zh;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function maj64_lo(xh, xl, yh, yl, zh, zl) {
        var r = xl & yl ^ xl & zl ^ yl & zl;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s0_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 28);
        var c1_hi = rotr64_hi(xl, xh, 2);
        var c2_hi = rotr64_hi(xl, xh, 7);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s0_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 28);
        var c1_lo = rotr64_lo(xl, xh, 2);
        var c2_lo = rotr64_lo(xl, xh, 7);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s1_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 14);
        var c1_hi = rotr64_hi(xh, xl, 18);
        var c2_hi = rotr64_hi(xl, xh, 9);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s1_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 14);
        var c1_lo = rotr64_lo(xh, xl, 18);
        var c2_lo = rotr64_lo(xl, xh, 9);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g0_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 1);
        var c1_hi = rotr64_hi(xh, xl, 8);
        var c2_hi = shr64_hi(xh, xl, 7);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g0_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 1);
        var c1_lo = rotr64_lo(xh, xl, 8);
        var c2_lo = shr64_lo(xh, xl, 7);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g1_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 19);
        var c1_hi = rotr64_hi(xl, xh, 29);
        var c2_hi = shr64_hi(xh, xl, 6);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g1_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 19);
        var c1_lo = rotr64_lo(xl, xh, 29);
        var c2_lo = shr64_lo(xh, xl, 6);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
    }
  });

  // node_modules/hash.js/lib/hash/sha/384.js
  var require__5 = __commonJS({
    "node_modules/hash.js/lib/hash/sha/384.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var SHA512 = require__4();
      function SHA384() {
        if (!(this instanceof SHA384))
          return new SHA384();
        SHA512.call(this);
        this.h = [
          3418070365,
          3238371032,
          1654270250,
          914150663,
          2438529370,
          812702999,
          355462360,
          4144912697,
          1731405415,
          4290775857,
          2394180231,
          1750603025,
          3675008525,
          1694076839,
          1203062813,
          3204075428
        ];
      }
      utils.inherits(SHA384, SHA512);
      module.exports = SHA384;
      SHA384.blockSize = 1024;
      SHA384.outSize = 384;
      SHA384.hmacStrength = 192;
      SHA384.padLength = 128;
      SHA384.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h.slice(0, 12), "big");
        else
          return utils.split32(this.h.slice(0, 12), "big");
      };
    }
  });

  // node_modules/hash.js/lib/hash/sha.js
  var require_sha = __commonJS({
    "node_modules/hash.js/lib/hash/sha.js"(exports) {
      "use strict";
      exports.sha1 = require__();
      exports.sha224 = require__3();
      exports.sha256 = require__2();
      exports.sha384 = require__5();
      exports.sha512 = require__4();
    }
  });

  // node_modules/hash.js/lib/hash/ripemd.js
  var require_ripemd = __commonJS({
    "node_modules/hash.js/lib/hash/ripemd.js"(exports) {
      "use strict";
      var utils = require_utils();
      var common = require_common();
      var rotl32 = utils.rotl32;
      var sum32 = utils.sum32;
      var sum32_3 = utils.sum32_3;
      var sum32_4 = utils.sum32_4;
      var BlockHash = common.BlockHash;
      function RIPEMD160() {
        if (!(this instanceof RIPEMD160))
          return new RIPEMD160();
        BlockHash.call(this);
        this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        this.endian = "little";
      }
      utils.inherits(RIPEMD160, BlockHash);
      exports.ripemd160 = RIPEMD160;
      RIPEMD160.blockSize = 512;
      RIPEMD160.outSize = 160;
      RIPEMD160.hmacStrength = 192;
      RIPEMD160.padLength = 64;
      RIPEMD160.prototype._update = function update2(msg, start2) {
        var A = this.h[0];
        var B = this.h[1];
        var C = this.h[2];
        var D = this.h[3];
        var E = this.h[4];
        var Ah = A;
        var Bh = B;
        var Ch = C;
        var Dh = D;
        var Eh = E;
        for (var j = 0; j < 80; j++) {
          var T = sum32(rotl32(sum32_4(A, f(j, B, C, D), msg[r[j] + start2], K(j)), s[j]), E);
          A = E;
          E = D;
          D = rotl32(C, 10);
          C = B;
          B = T;
          T = sum32(rotl32(sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start2], Kh(j)), sh[j]), Eh);
          Ah = Eh;
          Eh = Dh;
          Dh = rotl32(Ch, 10);
          Ch = Bh;
          Bh = T;
        }
        T = sum32_3(this.h[1], C, Dh);
        this.h[1] = sum32_3(this.h[2], D, Eh);
        this.h[2] = sum32_3(this.h[3], E, Ah);
        this.h[3] = sum32_3(this.h[4], A, Bh);
        this.h[4] = sum32_3(this.h[0], B, Ch);
        this.h[0] = T;
      };
      RIPEMD160.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "little");
        else
          return utils.split32(this.h, "little");
      };
      function f(j, x, y, z) {
        if (j <= 15)
          return x ^ y ^ z;
        else if (j <= 31)
          return x & y | ~x & z;
        else if (j <= 47)
          return (x | ~y) ^ z;
        else if (j <= 63)
          return x & z | y & ~z;
        else
          return x ^ (y | ~z);
      }
      function K(j) {
        if (j <= 15)
          return 0;
        else if (j <= 31)
          return 1518500249;
        else if (j <= 47)
          return 1859775393;
        else if (j <= 63)
          return 2400959708;
        else
          return 2840853838;
      }
      function Kh(j) {
        if (j <= 15)
          return 1352829926;
        else if (j <= 31)
          return 1548603684;
        else if (j <= 47)
          return 1836072691;
        else if (j <= 63)
          return 2053994217;
        else
          return 0;
      }
      var r = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        7,
        4,
        13,
        1,
        10,
        6,
        15,
        3,
        12,
        0,
        9,
        5,
        2,
        14,
        11,
        8,
        3,
        10,
        14,
        4,
        9,
        15,
        8,
        1,
        2,
        7,
        0,
        6,
        13,
        11,
        5,
        12,
        1,
        9,
        11,
        10,
        0,
        8,
        12,
        4,
        13,
        3,
        7,
        15,
        14,
        5,
        6,
        2,
        4,
        0,
        5,
        9,
        7,
        12,
        2,
        10,
        14,
        1,
        3,
        8,
        11,
        6,
        15,
        13
      ];
      var rh = [
        5,
        14,
        7,
        0,
        9,
        2,
        11,
        4,
        13,
        6,
        15,
        8,
        1,
        10,
        3,
        12,
        6,
        11,
        3,
        7,
        0,
        13,
        5,
        10,
        14,
        15,
        8,
        12,
        4,
        9,
        1,
        2,
        15,
        5,
        1,
        3,
        7,
        14,
        6,
        9,
        11,
        8,
        12,
        2,
        10,
        0,
        4,
        13,
        8,
        6,
        4,
        1,
        3,
        11,
        15,
        0,
        5,
        12,
        2,
        13,
        9,
        7,
        10,
        14,
        12,
        15,
        10,
        4,
        1,
        5,
        8,
        7,
        6,
        2,
        13,
        14,
        0,
        3,
        9,
        11
      ];
      var s = [
        11,
        14,
        15,
        12,
        5,
        8,
        7,
        9,
        11,
        13,
        14,
        15,
        6,
        7,
        9,
        8,
        7,
        6,
        8,
        13,
        11,
        9,
        7,
        15,
        7,
        12,
        15,
        9,
        11,
        7,
        13,
        12,
        11,
        13,
        6,
        7,
        14,
        9,
        13,
        15,
        14,
        8,
        13,
        6,
        5,
        12,
        7,
        5,
        11,
        12,
        14,
        15,
        14,
        15,
        9,
        8,
        9,
        14,
        5,
        6,
        8,
        6,
        5,
        12,
        9,
        15,
        5,
        11,
        6,
        8,
        13,
        12,
        5,
        12,
        13,
        14,
        11,
        8,
        5,
        6
      ];
      var sh = [
        8,
        9,
        9,
        11,
        13,
        15,
        15,
        5,
        7,
        7,
        8,
        11,
        14,
        14,
        12,
        6,
        9,
        13,
        15,
        7,
        12,
        8,
        9,
        11,
        7,
        7,
        12,
        7,
        6,
        15,
        13,
        11,
        9,
        7,
        15,
        11,
        8,
        6,
        6,
        14,
        12,
        13,
        5,
        14,
        13,
        13,
        7,
        5,
        15,
        5,
        8,
        11,
        14,
        14,
        6,
        14,
        6,
        9,
        12,
        9,
        12,
        5,
        15,
        8,
        8,
        5,
        12,
        9,
        12,
        5,
        14,
        6,
        8,
        13,
        6,
        5,
        15,
        13,
        11,
        11
      ];
    }
  });

  // node_modules/hash.js/lib/hash/hmac.js
  var require_hmac = __commonJS({
    "node_modules/hash.js/lib/hash/hmac.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      var assert2 = require_minimalistic_assert();
      function Hmac(hash3, key2, enc) {
        if (!(this instanceof Hmac))
          return new Hmac(hash3, key2, enc);
        this.Hash = hash3;
        this.blockSize = hash3.blockSize / 8;
        this.outSize = hash3.outSize / 8;
        this.inner = null;
        this.outer = null;
        this._init(utils.toArray(key2, enc));
      }
      module.exports = Hmac;
      Hmac.prototype._init = function init2(key2) {
        if (key2.length > this.blockSize)
          key2 = new this.Hash().update(key2).digest();
        assert2(key2.length <= this.blockSize);
        for (var i = key2.length; i < this.blockSize; i++)
          key2.push(0);
        for (i = 0; i < key2.length; i++)
          key2[i] ^= 54;
        this.inner = new this.Hash().update(key2);
        for (i = 0; i < key2.length; i++)
          key2[i] ^= 106;
        this.outer = new this.Hash().update(key2);
      };
      Hmac.prototype.update = function update2(msg, enc) {
        this.inner.update(msg, enc);
        return this;
      };
      Hmac.prototype.digest = function digest(enc) {
        this.outer.update(this.inner.digest());
        return this.outer.digest(enc);
      };
    }
  });

  // node_modules/hash.js/lib/hash.js
  var require_hash = __commonJS({
    "node_modules/hash.js/lib/hash.js"(exports) {
      var hash3 = exports;
      hash3.utils = require_utils();
      hash3.common = require_common();
      hash3.sha = require_sha();
      hash3.ripemd = require_ripemd();
      hash3.hmac = require_hmac();
      hash3.sha1 = hash3.sha.sha1;
      hash3.sha256 = hash3.sha.sha256;
      hash3.sha224 = hash3.sha.sha224;
      hash3.sha384 = hash3.sha.sha384;
      hash3.sha512 = hash3.sha.sha512;
      hash3.ripemd160 = hash3.ripemd.ripemd160;
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/utils.js
  var require_utils2 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/utils.js"(exports) {
      "use strict";
      var assert2 = require_minimalistic_assert();
      var inherits = require_inherits_browser();
      exports.inherits = inherits;
      function toArray(msg, enc) {
        if (Array.isArray(msg))
          return msg.slice();
        if (!msg)
          return [];
        var res = [];
        if (typeof msg === "string") {
          if (!enc) {
            for (var i = 0; i < msg.length; i++) {
              var c = msg.charCodeAt(i);
              var hi = c >> 8;
              var lo = c & 255;
              if (hi)
                res.push(hi, lo);
              else
                res.push(lo);
            }
          } else if (enc === "hex") {
            msg = msg.replace(/[^a-z0-9]+/ig, "");
            if (msg.length % 2 !== 0)
              msg = "0" + msg;
            for (i = 0; i < msg.length; i += 2)
              res.push(parseInt(msg[i] + msg[i + 1], 16));
          }
        } else {
          for (i = 0; i < msg.length; i++)
            res[i] = msg[i] | 0;
        }
        return res;
      }
      exports.toArray = toArray;
      function toHex2(msg) {
        var res = "";
        for (var i = 0; i < msg.length; i++)
          res += zero2(msg[i].toString(16));
        return res;
      }
      exports.toHex = toHex2;
      function htonl(w) {
        var res = w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24;
        return res >>> 0;
      }
      exports.htonl = htonl;
      function toHex32(msg, endian) {
        var res = "";
        for (var i = 0; i < msg.length; i++) {
          var w = msg[i];
          if (endian === "little")
            w = htonl(w);
          res += zero8(w.toString(16));
        }
        return res;
      }
      exports.toHex32 = toHex32;
      function zero2(word) {
        if (word.length === 1)
          return "0" + word;
        else
          return word;
      }
      exports.zero2 = zero2;
      function zero8(word) {
        if (word.length === 7)
          return "0" + word;
        else if (word.length === 6)
          return "00" + word;
        else if (word.length === 5)
          return "000" + word;
        else if (word.length === 4)
          return "0000" + word;
        else if (word.length === 3)
          return "00000" + word;
        else if (word.length === 2)
          return "000000" + word;
        else if (word.length === 1)
          return "0000000" + word;
        else
          return word;
      }
      exports.zero8 = zero8;
      function join32(msg, start2, end, endian) {
        var len = end - start2;
        assert2(len % 4 === 0);
        var res = new Array(len / 4);
        for (var i = 0, k = start2; i < res.length; i++, k += 4) {
          var w;
          if (endian === "big")
            w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
          else
            w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
          res[i] = w >>> 0;
        }
        return res;
      }
      exports.join32 = join32;
      function split32(msg, endian) {
        var res = new Array(msg.length * 4);
        for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
          var m = msg[i];
          if (endian === "big") {
            res[k] = m >>> 24;
            res[k + 1] = m >>> 16 & 255;
            res[k + 2] = m >>> 8 & 255;
            res[k + 3] = m & 255;
          } else {
            res[k + 3] = m >>> 24;
            res[k + 2] = m >>> 16 & 255;
            res[k + 1] = m >>> 8 & 255;
            res[k] = m & 255;
          }
        }
        return res;
      }
      exports.split32 = split32;
      function rotr32(w, b) {
        return w >>> b | w << 32 - b;
      }
      exports.rotr32 = rotr32;
      function rotl32(w, b) {
        return w << b | w >>> 32 - b;
      }
      exports.rotl32 = rotl32;
      function sum32(a, b) {
        return a + b >>> 0;
      }
      exports.sum32 = sum32;
      function sum32_3(a, b, c) {
        return a + b + c >>> 0;
      }
      exports.sum32_3 = sum32_3;
      function sum32_4(a, b, c, d) {
        return a + b + c + d >>> 0;
      }
      exports.sum32_4 = sum32_4;
      function sum32_5(a, b, c, d, e) {
        return a + b + c + d + e >>> 0;
      }
      exports.sum32_5 = sum32_5;
      function sum64(buf, pos, ah, al) {
        var bh = buf[pos];
        var bl = buf[pos + 1];
        var lo = al + bl >>> 0;
        var hi = (lo < al ? 1 : 0) + ah + bh;
        buf[pos] = hi >>> 0;
        buf[pos + 1] = lo;
      }
      exports.sum64 = sum64;
      function sum64_hi(ah, al, bh, bl) {
        var lo = al + bl >>> 0;
        var hi = (lo < al ? 1 : 0) + ah + bh;
        return hi >>> 0;
      }
      exports.sum64_hi = sum64_hi;
      function sum64_lo(ah, al, bh, bl) {
        var lo = al + bl;
        return lo >>> 0;
      }
      exports.sum64_lo = sum64_lo;
      function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
        var carry = 0;
        var lo = al;
        lo = lo + bl >>> 0;
        carry += lo < al ? 1 : 0;
        lo = lo + cl >>> 0;
        carry += lo < cl ? 1 : 0;
        lo = lo + dl >>> 0;
        carry += lo < dl ? 1 : 0;
        var hi = ah + bh + ch + dh + carry;
        return hi >>> 0;
      }
      exports.sum64_4_hi = sum64_4_hi;
      function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
        var lo = al + bl + cl + dl;
        return lo >>> 0;
      }
      exports.sum64_4_lo = sum64_4_lo;
      function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
        var carry = 0;
        var lo = al;
        lo = lo + bl >>> 0;
        carry += lo < al ? 1 : 0;
        lo = lo + cl >>> 0;
        carry += lo < cl ? 1 : 0;
        lo = lo + dl >>> 0;
        carry += lo < dl ? 1 : 0;
        lo = lo + el >>> 0;
        carry += lo < el ? 1 : 0;
        var hi = ah + bh + ch + dh + eh + carry;
        return hi >>> 0;
      }
      exports.sum64_5_hi = sum64_5_hi;
      function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
        var lo = al + bl + cl + dl + el;
        return lo >>> 0;
      }
      exports.sum64_5_lo = sum64_5_lo;
      function rotr64_hi(ah, al, num) {
        var r = al << 32 - num | ah >>> num;
        return r >>> 0;
      }
      exports.rotr64_hi = rotr64_hi;
      function rotr64_lo(ah, al, num) {
        var r = ah << 32 - num | al >>> num;
        return r >>> 0;
      }
      exports.rotr64_lo = rotr64_lo;
      function shr64_hi(ah, al, num) {
        return ah >>> num;
      }
      exports.shr64_hi = shr64_hi;
      function shr64_lo(ah, al, num) {
        var r = ah << 32 - num | al >>> num;
        return r >>> 0;
      }
      exports.shr64_lo = shr64_lo;
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/common.js
  var require_common3 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/common.js"(exports) {
      "use strict";
      var utils = require_utils2();
      var assert2 = require_minimalistic_assert();
      function BlockHash() {
        this.pending = null;
        this.pendingTotal = 0;
        this.blockSize = this.constructor.blockSize;
        this.outSize = this.constructor.outSize;
        this.hmacStrength = this.constructor.hmacStrength;
        this.padLength = this.constructor.padLength / 8;
        this.endian = "big";
        this._delta8 = this.blockSize / 8;
        this._delta32 = this.blockSize / 32;
      }
      exports.BlockHash = BlockHash;
      BlockHash.prototype.update = function update2(msg, enc) {
        msg = utils.toArray(msg, enc);
        if (!this.pending)
          this.pending = msg;
        else
          this.pending = this.pending.concat(msg);
        this.pendingTotal += msg.length;
        if (this.pending.length >= this._delta8) {
          msg = this.pending;
          var r = msg.length % this._delta8;
          this.pending = msg.slice(msg.length - r, msg.length);
          if (this.pending.length === 0)
            this.pending = null;
          msg = utils.join32(msg, 0, msg.length - r, this.endian);
          for (var i = 0; i < msg.length; i += this._delta32)
            this._update(msg, i, i + this._delta32);
        }
        return this;
      };
      BlockHash.prototype.digest = function digest(enc) {
        this.update(this._pad());
        assert2(this.pending === null);
        return this._digest(enc);
      };
      BlockHash.prototype._pad = function pad() {
        var len = this.pendingTotal;
        var bytes = this._delta8;
        var k = bytes - (len + this.padLength) % bytes;
        var res = new Array(k + this.padLength);
        res[0] = 128;
        for (var i = 1; i < k; i++)
          res[i] = 0;
        len <<= 3;
        if (this.endian === "big") {
          for (var t = 8; t < this.padLength; t++)
            res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = len >>> 24 & 255;
          res[i++] = len >>> 16 & 255;
          res[i++] = len >>> 8 & 255;
          res[i++] = len & 255;
        } else {
          res[i++] = len & 255;
          res[i++] = len >>> 8 & 255;
          res[i++] = len >>> 16 & 255;
          res[i++] = len >>> 24 & 255;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          res[i++] = 0;
          for (t = 8; t < this.padLength; t++)
            res[i++] = 0;
        }
        return res;
      };
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/common.js
  var require_common4 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/common.js"(exports) {
      "use strict";
      var utils = require_utils2();
      var rotr32 = utils.rotr32;
      function ft_1(s, x, y, z) {
        if (s === 0)
          return ch32(x, y, z);
        if (s === 1 || s === 3)
          return p32(x, y, z);
        if (s === 2)
          return maj32(x, y, z);
      }
      exports.ft_1 = ft_1;
      function ch32(x, y, z) {
        return x & y ^ ~x & z;
      }
      exports.ch32 = ch32;
      function maj32(x, y, z) {
        return x & y ^ x & z ^ y & z;
      }
      exports.maj32 = maj32;
      function p32(x, y, z) {
        return x ^ y ^ z;
      }
      exports.p32 = p32;
      function s0_256(x) {
        return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
      }
      exports.s0_256 = s0_256;
      function s1_256(x) {
        return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
      }
      exports.s1_256 = s1_256;
      function g0_256(x) {
        return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
      }
      exports.g0_256 = g0_256;
      function g1_256(x) {
        return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
      }
      exports.g1_256 = g1_256;
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/1.js
  var require__6 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/1.js"(exports, module) {
      "use strict";
      var utils = require_utils2();
      var common = require_common3();
      var shaCommon = require_common4();
      var rotl32 = utils.rotl32;
      var sum32 = utils.sum32;
      var sum32_5 = utils.sum32_5;
      var ft_1 = shaCommon.ft_1;
      var BlockHash = common.BlockHash;
      var sha1_K = [
        1518500249,
        1859775393,
        2400959708,
        3395469782
      ];
      function SHA1() {
        if (!(this instanceof SHA1))
          return new SHA1();
        BlockHash.call(this);
        this.h = [
          1732584193,
          4023233417,
          2562383102,
          271733878,
          3285377520
        ];
        this.W = new Array(80);
      }
      utils.inherits(SHA1, BlockHash);
      module.exports = SHA1;
      SHA1.blockSize = 512;
      SHA1.outSize = 160;
      SHA1.hmacStrength = 80;
      SHA1.padLength = 64;
      SHA1.prototype._update = function _update(msg, start2) {
        var W = this.W;
        for (var i = 0; i < 16; i++)
          W[i] = msg[start2 + i];
        for (; i < W.length; i++)
          W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        var a = this.h[0];
        var b = this.h[1];
        var c = this.h[2];
        var d = this.h[3];
        var e = this.h[4];
        for (i = 0; i < W.length; i++) {
          var s = ~~(i / 20);
          var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
          e = d;
          d = c;
          c = rotl32(b, 30);
          b = a;
          a = t;
        }
        this.h[0] = sum32(this.h[0], a);
        this.h[1] = sum32(this.h[1], b);
        this.h[2] = sum32(this.h[2], c);
        this.h[3] = sum32(this.h[3], d);
        this.h[4] = sum32(this.h[4], e);
      };
      SHA1.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "big");
        else
          return utils.split32(this.h, "big");
      };
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/256.js
  var require__7 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/256.js"(exports, module) {
      "use strict";
      var utils = require_utils2();
      var common = require_common3();
      var shaCommon = require_common4();
      var assert2 = require_minimalistic_assert();
      var sum32 = utils.sum32;
      var sum32_4 = utils.sum32_4;
      var sum32_5 = utils.sum32_5;
      var ch32 = shaCommon.ch32;
      var maj32 = shaCommon.maj32;
      var s0_256 = shaCommon.s0_256;
      var s1_256 = shaCommon.s1_256;
      var g0_256 = shaCommon.g0_256;
      var g1_256 = shaCommon.g1_256;
      var BlockHash = common.BlockHash;
      var sha256_K = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      function SHA256() {
        if (!(this instanceof SHA256))
          return new SHA256();
        BlockHash.call(this);
        this.h = [
          1779033703,
          3144134277,
          1013904242,
          2773480762,
          1359893119,
          2600822924,
          528734635,
          1541459225
        ];
        this.k = sha256_K;
        this.W = new Array(64);
      }
      utils.inherits(SHA256, BlockHash);
      module.exports = SHA256;
      SHA256.blockSize = 512;
      SHA256.outSize = 256;
      SHA256.hmacStrength = 192;
      SHA256.padLength = 64;
      SHA256.prototype._update = function _update(msg, start2) {
        var W = this.W;
        for (var i = 0; i < 16; i++)
          W[i] = msg[start2 + i];
        for (; i < W.length; i++)
          W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
        var a = this.h[0];
        var b = this.h[1];
        var c = this.h[2];
        var d = this.h[3];
        var e = this.h[4];
        var f = this.h[5];
        var g = this.h[6];
        var h = this.h[7];
        assert2(this.k.length === W.length);
        for (i = 0; i < W.length; i++) {
          var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
          var T2 = sum32(s0_256(a), maj32(a, b, c));
          h = g;
          g = f;
          f = e;
          e = sum32(d, T1);
          d = c;
          c = b;
          b = a;
          a = sum32(T1, T2);
        }
        this.h[0] = sum32(this.h[0], a);
        this.h[1] = sum32(this.h[1], b);
        this.h[2] = sum32(this.h[2], c);
        this.h[3] = sum32(this.h[3], d);
        this.h[4] = sum32(this.h[4], e);
        this.h[5] = sum32(this.h[5], f);
        this.h[6] = sum32(this.h[6], g);
        this.h[7] = sum32(this.h[7], h);
      };
      SHA256.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "big");
        else
          return utils.split32(this.h, "big");
      };
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/224.js
  var require__8 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/224.js"(exports, module) {
      "use strict";
      var utils = require_utils2();
      var SHA256 = require__7();
      function SHA224() {
        if (!(this instanceof SHA224))
          return new SHA224();
        SHA256.call(this);
        this.h = [
          3238371032,
          914150663,
          812702999,
          4144912697,
          4290775857,
          1750603025,
          1694076839,
          3204075428
        ];
      }
      utils.inherits(SHA224, SHA256);
      module.exports = SHA224;
      SHA224.blockSize = 512;
      SHA224.outSize = 224;
      SHA224.hmacStrength = 192;
      SHA224.padLength = 64;
      SHA224.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h.slice(0, 7), "big");
        else
          return utils.split32(this.h.slice(0, 7), "big");
      };
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/512.js
  var require__9 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/512.js"(exports, module) {
      "use strict";
      var utils = require_utils2();
      var common = require_common3();
      var assert2 = require_minimalistic_assert();
      var rotr64_hi = utils.rotr64_hi;
      var rotr64_lo = utils.rotr64_lo;
      var shr64_hi = utils.shr64_hi;
      var shr64_lo = utils.shr64_lo;
      var sum64 = utils.sum64;
      var sum64_hi = utils.sum64_hi;
      var sum64_lo = utils.sum64_lo;
      var sum64_4_hi = utils.sum64_4_hi;
      var sum64_4_lo = utils.sum64_4_lo;
      var sum64_5_hi = utils.sum64_5_hi;
      var sum64_5_lo = utils.sum64_5_lo;
      var BlockHash = common.BlockHash;
      var sha512_K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function SHA512() {
        if (!(this instanceof SHA512))
          return new SHA512();
        BlockHash.call(this);
        this.h = [
          1779033703,
          4089235720,
          3144134277,
          2227873595,
          1013904242,
          4271175723,
          2773480762,
          1595750129,
          1359893119,
          2917565137,
          2600822924,
          725511199,
          528734635,
          4215389547,
          1541459225,
          327033209
        ];
        this.k = sha512_K;
        this.W = new Array(160);
      }
      utils.inherits(SHA512, BlockHash);
      module.exports = SHA512;
      SHA512.blockSize = 1024;
      SHA512.outSize = 512;
      SHA512.hmacStrength = 192;
      SHA512.padLength = 128;
      SHA512.prototype._prepareBlock = function _prepareBlock(msg, start2) {
        var W = this.W;
        for (var i = 0; i < 32; i++)
          W[i] = msg[start2 + i];
        for (; i < W.length; i += 2) {
          var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
          var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
          var c1_hi = W[i - 14];
          var c1_lo = W[i - 13];
          var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
          var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
          var c3_hi = W[i - 32];
          var c3_lo = W[i - 31];
          W[i] = sum64_4_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
          W[i + 1] = sum64_4_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
        }
      };
      SHA512.prototype._update = function _update(msg, start2) {
        this._prepareBlock(msg, start2);
        var W = this.W;
        var ah = this.h[0];
        var al = this.h[1];
        var bh = this.h[2];
        var bl = this.h[3];
        var ch = this.h[4];
        var cl = this.h[5];
        var dh = this.h[6];
        var dl = this.h[7];
        var eh = this.h[8];
        var el = this.h[9];
        var fh = this.h[10];
        var fl = this.h[11];
        var gh = this.h[12];
        var gl = this.h[13];
        var hh = this.h[14];
        var hl = this.h[15];
        assert2(this.k.length === W.length);
        for (var i = 0; i < W.length; i += 2) {
          var c0_hi = hh;
          var c0_lo = hl;
          var c1_hi = s1_512_hi(eh, el);
          var c1_lo = s1_512_lo(eh, el);
          var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
          var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
          var c3_hi = this.k[i];
          var c3_lo = this.k[i + 1];
          var c4_hi = W[i];
          var c4_lo = W[i + 1];
          var T1_hi = sum64_5_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
          var T1_lo = sum64_5_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
          c0_hi = s0_512_hi(ah, al);
          c0_lo = s0_512_lo(ah, al);
          c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
          c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
          var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
          var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
          hh = gh;
          hl = gl;
          gh = fh;
          gl = fl;
          fh = eh;
          fl = el;
          eh = sum64_hi(dh, dl, T1_hi, T1_lo);
          el = sum64_lo(dl, dl, T1_hi, T1_lo);
          dh = ch;
          dl = cl;
          ch = bh;
          cl = bl;
          bh = ah;
          bl = al;
          ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
          al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
        }
        sum64(this.h, 0, ah, al);
        sum64(this.h, 2, bh, bl);
        sum64(this.h, 4, ch, cl);
        sum64(this.h, 6, dh, dl);
        sum64(this.h, 8, eh, el);
        sum64(this.h, 10, fh, fl);
        sum64(this.h, 12, gh, gl);
        sum64(this.h, 14, hh, hl);
      };
      SHA512.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "big");
        else
          return utils.split32(this.h, "big");
      };
      function ch64_hi(xh, xl, yh, yl, zh) {
        var r = xh & yh ^ ~xh & zh;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function ch64_lo(xh, xl, yh, yl, zh, zl) {
        var r = xl & yl ^ ~xl & zl;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function maj64_hi(xh, xl, yh, yl, zh) {
        var r = xh & yh ^ xh & zh ^ yh & zh;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function maj64_lo(xh, xl, yh, yl, zh, zl) {
        var r = xl & yl ^ xl & zl ^ yl & zl;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s0_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 28);
        var c1_hi = rotr64_hi(xl, xh, 2);
        var c2_hi = rotr64_hi(xl, xh, 7);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s0_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 28);
        var c1_lo = rotr64_lo(xl, xh, 2);
        var c2_lo = rotr64_lo(xl, xh, 7);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s1_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 14);
        var c1_hi = rotr64_hi(xh, xl, 18);
        var c2_hi = rotr64_hi(xl, xh, 9);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function s1_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 14);
        var c1_lo = rotr64_lo(xh, xl, 18);
        var c2_lo = rotr64_lo(xl, xh, 9);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g0_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 1);
        var c1_hi = rotr64_hi(xh, xl, 8);
        var c2_hi = shr64_hi(xh, xl, 7);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g0_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 1);
        var c1_lo = rotr64_lo(xh, xl, 8);
        var c2_lo = shr64_lo(xh, xl, 7);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g1_512_hi(xh, xl) {
        var c0_hi = rotr64_hi(xh, xl, 19);
        var c1_hi = rotr64_hi(xl, xh, 29);
        var c2_hi = shr64_hi(xh, xl, 6);
        var r = c0_hi ^ c1_hi ^ c2_hi;
        if (r < 0)
          r += 4294967296;
        return r;
      }
      function g1_512_lo(xh, xl) {
        var c0_lo = rotr64_lo(xh, xl, 19);
        var c1_lo = rotr64_lo(xl, xh, 29);
        var c2_lo = shr64_lo(xh, xl, 6);
        var r = c0_lo ^ c1_lo ^ c2_lo;
        if (r < 0)
          r += 4294967296;
        return r;
      }
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/384.js
  var require__10 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/384.js"(exports, module) {
      "use strict";
      var utils = require_utils2();
      var SHA512 = require__9();
      function SHA384() {
        if (!(this instanceof SHA384))
          return new SHA384();
        SHA512.call(this);
        this.h = [
          3418070365,
          3238371032,
          1654270250,
          914150663,
          2438529370,
          812702999,
          355462360,
          4144912697,
          1731405415,
          4290775857,
          2394180231,
          1750603025,
          3675008525,
          1694076839,
          1203062813,
          3204075428
        ];
      }
      utils.inherits(SHA384, SHA512);
      module.exports = SHA384;
      SHA384.blockSize = 1024;
      SHA384.outSize = 384;
      SHA384.hmacStrength = 192;
      SHA384.padLength = 128;
      SHA384.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h.slice(0, 12), "big");
        else
          return utils.split32(this.h.slice(0, 12), "big");
      };
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha.js
  var require_sha2 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha.js"(exports) {
      "use strict";
      exports.sha1 = require__6();
      exports.sha224 = require__8();
      exports.sha256 = require__7();
      exports.sha384 = require__10();
      exports.sha512 = require__9();
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/ripemd.js
  var require_ripemd2 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/ripemd.js"(exports) {
      "use strict";
      var utils = require_utils2();
      var common = require_common3();
      var rotl32 = utils.rotl32;
      var sum32 = utils.sum32;
      var sum32_3 = utils.sum32_3;
      var sum32_4 = utils.sum32_4;
      var BlockHash = common.BlockHash;
      function RIPEMD160() {
        if (!(this instanceof RIPEMD160))
          return new RIPEMD160();
        BlockHash.call(this);
        this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        this.endian = "little";
      }
      utils.inherits(RIPEMD160, BlockHash);
      exports.ripemd160 = RIPEMD160;
      RIPEMD160.blockSize = 512;
      RIPEMD160.outSize = 160;
      RIPEMD160.hmacStrength = 192;
      RIPEMD160.padLength = 64;
      RIPEMD160.prototype._update = function update2(msg, start2) {
        var A = this.h[0];
        var B = this.h[1];
        var C = this.h[2];
        var D = this.h[3];
        var E = this.h[4];
        var Ah = A;
        var Bh = B;
        var Ch = C;
        var Dh = D;
        var Eh = E;
        for (var j = 0; j < 80; j++) {
          var T = sum32(rotl32(sum32_4(A, f(j, B, C, D), msg[r[j] + start2], K(j)), s[j]), E);
          A = E;
          E = D;
          D = rotl32(C, 10);
          C = B;
          B = T;
          T = sum32(rotl32(sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start2], Kh(j)), sh[j]), Eh);
          Ah = Eh;
          Eh = Dh;
          Dh = rotl32(Ch, 10);
          Ch = Bh;
          Bh = T;
        }
        T = sum32_3(this.h[1], C, Dh);
        this.h[1] = sum32_3(this.h[2], D, Eh);
        this.h[2] = sum32_3(this.h[3], E, Ah);
        this.h[3] = sum32_3(this.h[4], A, Bh);
        this.h[4] = sum32_3(this.h[0], B, Ch);
        this.h[0] = T;
      };
      RIPEMD160.prototype._digest = function digest(enc) {
        if (enc === "hex")
          return utils.toHex32(this.h, "little");
        else
          return utils.split32(this.h, "little");
      };
      function f(j, x, y, z) {
        if (j <= 15)
          return x ^ y ^ z;
        else if (j <= 31)
          return x & y | ~x & z;
        else if (j <= 47)
          return (x | ~y) ^ z;
        else if (j <= 63)
          return x & z | y & ~z;
        else
          return x ^ (y | ~z);
      }
      function K(j) {
        if (j <= 15)
          return 0;
        else if (j <= 31)
          return 1518500249;
        else if (j <= 47)
          return 1859775393;
        else if (j <= 63)
          return 2400959708;
        else
          return 2840853838;
      }
      function Kh(j) {
        if (j <= 15)
          return 1352829926;
        else if (j <= 31)
          return 1548603684;
        else if (j <= 47)
          return 1836072691;
        else if (j <= 63)
          return 2053994217;
        else
          return 0;
      }
      var r = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        7,
        4,
        13,
        1,
        10,
        6,
        15,
        3,
        12,
        0,
        9,
        5,
        2,
        14,
        11,
        8,
        3,
        10,
        14,
        4,
        9,
        15,
        8,
        1,
        2,
        7,
        0,
        6,
        13,
        11,
        5,
        12,
        1,
        9,
        11,
        10,
        0,
        8,
        12,
        4,
        13,
        3,
        7,
        15,
        14,
        5,
        6,
        2,
        4,
        0,
        5,
        9,
        7,
        12,
        2,
        10,
        14,
        1,
        3,
        8,
        11,
        6,
        15,
        13
      ];
      var rh = [
        5,
        14,
        7,
        0,
        9,
        2,
        11,
        4,
        13,
        6,
        15,
        8,
        1,
        10,
        3,
        12,
        6,
        11,
        3,
        7,
        0,
        13,
        5,
        10,
        14,
        15,
        8,
        12,
        4,
        9,
        1,
        2,
        15,
        5,
        1,
        3,
        7,
        14,
        6,
        9,
        11,
        8,
        12,
        2,
        10,
        0,
        4,
        13,
        8,
        6,
        4,
        1,
        3,
        11,
        15,
        0,
        5,
        12,
        2,
        13,
        9,
        7,
        10,
        14,
        12,
        15,
        10,
        4,
        1,
        5,
        8,
        7,
        6,
        2,
        13,
        14,
        0,
        3,
        9,
        11
      ];
      var s = [
        11,
        14,
        15,
        12,
        5,
        8,
        7,
        9,
        11,
        13,
        14,
        15,
        6,
        7,
        9,
        8,
        7,
        6,
        8,
        13,
        11,
        9,
        7,
        15,
        7,
        12,
        15,
        9,
        11,
        7,
        13,
        12,
        11,
        13,
        6,
        7,
        14,
        9,
        13,
        15,
        14,
        8,
        13,
        6,
        5,
        12,
        7,
        5,
        11,
        12,
        14,
        15,
        14,
        15,
        9,
        8,
        9,
        14,
        5,
        6,
        8,
        6,
        5,
        12,
        9,
        15,
        5,
        11,
        6,
        8,
        13,
        12,
        5,
        12,
        13,
        14,
        11,
        8,
        5,
        6
      ];
      var sh = [
        8,
        9,
        9,
        11,
        13,
        15,
        15,
        5,
        7,
        7,
        8,
        11,
        14,
        14,
        12,
        6,
        9,
        13,
        15,
        7,
        12,
        8,
        9,
        11,
        7,
        7,
        12,
        7,
        6,
        15,
        13,
        11,
        9,
        7,
        15,
        11,
        8,
        6,
        6,
        14,
        12,
        13,
        5,
        14,
        13,
        13,
        7,
        5,
        15,
        5,
        8,
        11,
        14,
        14,
        6,
        14,
        6,
        9,
        12,
        9,
        12,
        5,
        15,
        8,
        8,
        5,
        12,
        9,
        12,
        5,
        14,
        6,
        8,
        13,
        6,
        5,
        15,
        13,
        11,
        11
      ];
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/hmac.js
  var require_hmac2 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/hmac.js"(exports, module) {
      "use strict";
      var utils = require_utils2();
      var assert2 = require_minimalistic_assert();
      function Hmac(hash3, key2, enc) {
        if (!(this instanceof Hmac))
          return new Hmac(hash3, key2, enc);
        this.Hash = hash3;
        this.blockSize = hash3.blockSize / 8;
        this.outSize = hash3.outSize / 8;
        this.inner = null;
        this.outer = null;
        this._init(utils.toArray(key2, enc));
      }
      module.exports = Hmac;
      Hmac.prototype._init = function init2(key2) {
        if (key2.length > this.blockSize)
          key2 = new this.Hash().update(key2).digest();
        assert2(key2.length <= this.blockSize);
        for (var i = key2.length; i < this.blockSize; i++)
          key2.push(0);
        for (i = 0; i < key2.length; i++)
          key2[i] ^= 54;
        this.inner = new this.Hash().update(key2);
        for (i = 0; i < key2.length; i++)
          key2[i] ^= 106;
        this.outer = new this.Hash().update(key2);
      };
      Hmac.prototype.update = function update2(msg, enc) {
        this.inner.update(msg, enc);
        return this;
      };
      Hmac.prototype.digest = function digest(enc) {
        this.outer.update(this.inner.digest());
        return this.outer.digest(enc);
      };
    }
  });

  // node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash.js
  var require_hash2 = __commonJS({
    "node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash.js"(exports) {
      var hash3 = exports;
      hash3.utils = require_utils2();
      hash3.common = require_common3();
      hash3.sha = require_sha2();
      hash3.ripemd = require_ripemd2();
      hash3.hmac = require_hmac2();
      hash3.sha1 = hash3.sha.sha1;
      hash3.sha256 = hash3.sha.sha256;
      hash3.sha224 = hash3.sha.sha224;
      hash3.sha384 = hash3.sha.sha384;
      hash3.sha512 = hash3.sha.sha512;
      hash3.ripemd160 = hash3.ripemd.ripemd160;
    }
  });

  // node_modules/aes-js/index.js
  var require_aes_js = __commonJS({
    "node_modules/aes-js/index.js"(exports, module) {
      "use strict";
      (function(root) {
        function checkInt(value) {
          return parseInt(value) === value;
        }
        function checkInts(arrayish) {
          if (!checkInt(arrayish.length)) {
            return false;
          }
          for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
              return false;
            }
          }
          return true;
        }
        function coerceArray(arg, copy) {
          if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === "Uint8Array") {
            if (copy) {
              if (arg.slice) {
                arg = arg.slice();
              } else {
                arg = Array.prototype.slice.call(arg);
              }
            }
            return arg;
          }
          if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
              throw new Error("Array contains invalid value: " + arg);
            }
            return new Uint8Array(arg);
          }
          if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
          }
          throw new Error("unsupported array-like object");
        }
        function createArray(length) {
          return new Uint8Array(length);
        }
        function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
          if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
              sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
              sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
          }
          targetArray.set(sourceArray, targetStart);
        }
        var convertUtf8 = function() {
          function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
              var c = text.charCodeAt(i++);
              if (c === 37) {
                result.push(parseInt(text.substr(i, 2), 16));
                i += 2;
              } else {
                result.push(c);
              }
            }
            return coerceArray(result);
          }
          function fromBytes(bytes) {
            var result = [], i = 0;
            while (i < bytes.length) {
              var c = bytes[i];
              if (c < 128) {
                result.push(String.fromCharCode(c));
                i++;
              } else if (c > 191 && c < 224) {
                result.push(String.fromCharCode((c & 31) << 6 | bytes[i + 1] & 63));
                i += 2;
              } else {
                result.push(String.fromCharCode((c & 15) << 12 | (bytes[i + 1] & 63) << 6 | bytes[i + 2] & 63));
                i += 3;
              }
            }
            return result.join("");
          }
          return {
            toBytes,
            fromBytes
          };
        }();
        var convertHex = function() {
          function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
              result.push(parseInt(text.substr(i, 2), 16));
            }
            return result;
          }
          var Hex = "0123456789abcdef";
          function fromBytes(bytes) {
            var result = [];
            for (var i = 0; i < bytes.length; i++) {
              var v = bytes[i];
              result.push(Hex[(v & 240) >> 4] + Hex[v & 15]);
            }
            return result.join("");
          }
          return {
            toBytes,
            fromBytes
          };
        }();
        var numberOfRounds = { 16: 10, 24: 12, 32: 14 };
        var rcon = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145];
        var S = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
        var Si = [82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255, 135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250, 195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134, 104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87, 167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143, 202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206, 240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26, 113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219, 192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81, 127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200, 235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125];
        var T1 = [3328402341, 4168907908, 4000806809, 4135287693, 4294111757, 3597364157, 3731845041, 2445657428, 1613770832, 33620227, 3462883241, 1445669757, 3892248089, 3050821474, 1303096294, 3967186586, 2412431941, 528646813, 2311702848, 4202528135, 4026202645, 2992200171, 2387036105, 4226871307, 1101901292, 3017069671, 1604494077, 1169141738, 597466303, 1403299063, 3832705686, 2613100635, 1974974402, 3791519004, 1033081774, 1277568618, 1815492186, 2118074177, 4126668546, 2211236943, 1748251740, 1369810420, 3521504564, 4193382664, 3799085459, 2883115123, 1647391059, 706024767, 134480908, 2512897874, 1176707941, 2646852446, 806885416, 932615841, 168101135, 798661301, 235341577, 605164086, 461406363, 3756188221, 3454790438, 1311188841, 2142417613, 3933566367, 302582043, 495158174, 1479289972, 874125870, 907746093, 3698224818, 3025820398, 1537253627, 2756858614, 1983593293, 3084310113, 2108928974, 1378429307, 3722699582, 1580150641, 327451799, 2790478837, 3117535592, 0, 3253595436, 1075847264, 3825007647, 2041688520, 3059440621, 3563743934, 2378943302, 1740553945, 1916352843, 2487896798, 2555137236, 2958579944, 2244988746, 3151024235, 3320835882, 1336584933, 3992714006, 2252555205, 2588757463, 1714631509, 293963156, 2319795663, 3925473552, 67240454, 4269768577, 2689618160, 2017213508, 631218106, 1269344483, 2723238387, 1571005438, 2151694528, 93294474, 1066570413, 563977660, 1882732616, 4059428100, 1673313503, 2008463041, 2950355573, 1109467491, 537923632, 3858759450, 4260623118, 3218264685, 2177748300, 403442708, 638784309, 3287084079, 3193921505, 899127202, 2286175436, 773265209, 2479146071, 1437050866, 4236148354, 2050833735, 3362022572, 3126681063, 840505643, 3866325909, 3227541664, 427917720, 2655997905, 2749160575, 1143087718, 1412049534, 999329963, 193497219, 2353415882, 3354324521, 1807268051, 672404540, 2816401017, 3160301282, 369822493, 2916866934, 3688947771, 1681011286, 1949973070, 336202270, 2454276571, 201721354, 1210328172, 3093060836, 2680341085, 3184776046, 1135389935, 3294782118, 965841320, 831886756, 3554993207, 4068047243, 3588745010, 2345191491, 1849112409, 3664604599, 26054028, 2983581028, 2622377682, 1235855840, 3630984372, 2891339514, 4092916743, 3488279077, 3395642799, 4101667470, 1202630377, 268961816, 1874508501, 4034427016, 1243948399, 1546530418, 941366308, 1470539505, 1941222599, 2546386513, 3421038627, 2715671932, 3899946140, 1042226977, 2521517021, 1639824860, 227249030, 260737669, 3765465232, 2084453954, 1907733956, 3429263018, 2420656344, 100860677, 4160157185, 470683154, 3261161891, 1781871967, 2924959737, 1773779408, 394692241, 2579611992, 974986535, 664706745, 3655459128, 3958962195, 731420851, 571543859, 3530123707, 2849626480, 126783113, 865375399, 765172662, 1008606754, 361203602, 3387549984, 2278477385, 2857719295, 1344809080, 2782912378, 59542671, 1503764984, 160008576, 437062935, 1707065306, 3622233649, 2218934982, 3496503480, 2185314755, 697932208, 1512910199, 504303377, 2075177163, 2824099068, 1841019862, 739644986];
        var T2 = [2781242211, 2230877308, 2582542199, 2381740923, 234877682, 3184946027, 2984144751, 1418839493, 1348481072, 50462977, 2848876391, 2102799147, 434634494, 1656084439, 3863849899, 2599188086, 1167051466, 2636087938, 1082771913, 2281340285, 368048890, 3954334041, 3381544775, 201060592, 3963727277, 1739838676, 4250903202, 3930435503, 3206782108, 4149453988, 2531553906, 1536934080, 3262494647, 484572669, 2923271059, 1783375398, 1517041206, 1098792767, 49674231, 1334037708, 1550332980, 4098991525, 886171109, 150598129, 2481090929, 1940642008, 1398944049, 1059722517, 201851908, 1385547719, 1699095331, 1587397571, 674240536, 2704774806, 252314885, 3039795866, 151914247, 908333586, 2602270848, 1038082786, 651029483, 1766729511, 3447698098, 2682942837, 454166793, 2652734339, 1951935532, 775166490, 758520603, 3000790638, 4004797018, 4217086112, 4137964114, 1299594043, 1639438038, 3464344499, 2068982057, 1054729187, 1901997871, 2534638724, 4121318227, 1757008337, 0, 750906861, 1614815264, 535035132, 3363418545, 3988151131, 3201591914, 1183697867, 3647454910, 1265776953, 3734260298, 3566750796, 3903871064, 1250283471, 1807470800, 717615087, 3847203498, 384695291, 3313910595, 3617213773, 1432761139, 2484176261, 3481945413, 283769337, 100925954, 2180939647, 4037038160, 1148730428, 3123027871, 3813386408, 4087501137, 4267549603, 3229630528, 2315620239, 2906624658, 3156319645, 1215313976, 82966005, 3747855548, 3245848246, 1974459098, 1665278241, 807407632, 451280895, 251524083, 1841287890, 1283575245, 337120268, 891687699, 801369324, 3787349855, 2721421207, 3431482436, 959321879, 1469301956, 4065699751, 2197585534, 1199193405, 2898814052, 3887750493, 724703513, 2514908019, 2696962144, 2551808385, 3516813135, 2141445340, 1715741218, 2119445034, 2872807568, 2198571144, 3398190662, 700968686, 3547052216, 1009259540, 2041044702, 3803995742, 487983883, 1991105499, 1004265696, 1449407026, 1316239930, 504629770, 3683797321, 168560134, 1816667172, 3837287516, 1570751170, 1857934291, 4014189740, 2797888098, 2822345105, 2754712981, 936633572, 2347923833, 852879335, 1133234376, 1500395319, 3084545389, 2348912013, 1689376213, 3533459022, 3762923945, 3034082412, 4205598294, 133428468, 634383082, 2949277029, 2398386810, 3913789102, 403703816, 3580869306, 2297460856, 1867130149, 1918643758, 607656988, 4049053350, 3346248884, 1368901318, 600565992, 2090982877, 2632479860, 557719327, 3717614411, 3697393085, 2249034635, 2232388234, 2430627952, 1115438654, 3295786421, 2865522278, 3633334344, 84280067, 33027830, 303828494, 2747425121, 1600795957, 4188952407, 3496589753, 2434238086, 1486471617, 658119965, 3106381470, 953803233, 334231800, 3005978776, 857870609, 3151128937, 1890179545, 2298973838, 2805175444, 3056442267, 574365214, 2450884487, 550103529, 1233637070, 4289353045, 2018519080, 2057691103, 2399374476, 4166623649, 2148108681, 387583245, 3664101311, 836232934, 3330556482, 3100665960, 3280093505, 2955516313, 2002398509, 287182607, 3413881008, 4238890068, 3597515707, 975967766];
        var T3 = [1671808611, 2089089148, 2006576759, 2072901243, 4061003762, 1807603307, 1873927791, 3310653893, 810573872, 16974337, 1739181671, 729634347, 4263110654, 3613570519, 2883997099, 1989864566, 3393556426, 2191335298, 3376449993, 2106063485, 4195741690, 1508618841, 1204391495, 4027317232, 2917941677, 3563566036, 2734514082, 2951366063, 2629772188, 2767672228, 1922491506, 3227229120, 3082974647, 4246528509, 2477669779, 644500518, 911895606, 1061256767, 4144166391, 3427763148, 878471220, 2784252325, 3845444069, 4043897329, 1905517169, 3631459288, 827548209, 356461077, 67897348, 3344078279, 593839651, 3277757891, 405286936, 2527147926, 84871685, 2595565466, 118033927, 305538066, 2157648768, 3795705826, 3945188843, 661212711, 2999812018, 1973414517, 152769033, 2208177539, 745822252, 439235610, 455947803, 1857215598, 1525593178, 2700827552, 1391895634, 994932283, 3596728278, 3016654259, 695947817, 3812548067, 795958831, 2224493444, 1408607827, 3513301457, 0, 3979133421, 543178784, 4229948412, 2982705585, 1542305371, 1790891114, 3410398667, 3201918910, 961245753, 1256100938, 1289001036, 1491644504, 3477767631, 3496721360, 4012557807, 2867154858, 4212583931, 1137018435, 1305975373, 861234739, 2241073541, 1171229253, 4178635257, 33948674, 2139225727, 1357946960, 1011120188, 2679776671, 2833468328, 1374921297, 2751356323, 1086357568, 2408187279, 2460827538, 2646352285, 944271416, 4110742005, 3168756668, 3066132406, 3665145818, 560153121, 271589392, 4279952895, 4077846003, 3530407890, 3444343245, 202643468, 322250259, 3962553324, 1608629855, 2543990167, 1154254916, 389623319, 3294073796, 2817676711, 2122513534, 1028094525, 1689045092, 1575467613, 422261273, 1939203699, 1621147744, 2174228865, 1339137615, 3699352540, 577127458, 712922154, 2427141008, 2290289544, 1187679302, 3995715566, 3100863416, 339486740, 3732514782, 1591917662, 186455563, 3681988059, 3762019296, 844522546, 978220090, 169743370, 1239126601, 101321734, 611076132, 1558493276, 3260915650, 3547250131, 2901361580, 1655096418, 2443721105, 2510565781, 3828863972, 2039214713, 3878868455, 3359869896, 928607799, 1840765549, 2374762893, 3580146133, 1322425422, 2850048425, 1823791212, 1459268694, 4094161908, 3928346602, 1706019429, 2056189050, 2934523822, 135794696, 3134549946, 2022240376, 628050469, 779246638, 472135708, 2800834470, 3032970164, 3327236038, 3894660072, 3715932637, 1956440180, 522272287, 1272813131, 3185336765, 2340818315, 2323976074, 1888542832, 1044544574, 3049550261, 1722469478, 1222152264, 50660867, 4127324150, 236067854, 1638122081, 895445557, 1475980887, 3117443513, 2257655686, 3243809217, 489110045, 2662934430, 3778599393, 4162055160, 2561878936, 288563729, 1773916777, 3648039385, 2391345038, 2493985684, 2612407707, 505560094, 2274497927, 3911240169, 3460925390, 1442818645, 678973480, 3749357023, 2358182796, 2717407649, 2306869641, 219617805, 3218761151, 3862026214, 1120306242, 1756942440, 1103331905, 2578459033, 762796589, 252780047, 2966125488, 1425844308, 3151392187, 372911126];
        var T4 = [1667474886, 2088535288, 2004326894, 2071694838, 4075949567, 1802223062, 1869591006, 3318043793, 808472672, 16843522, 1734846926, 724270422, 4278065639, 3621216949, 2880169549, 1987484396, 3402253711, 2189597983, 3385409673, 2105378810, 4210693615, 1499065266, 1195886990, 4042263547, 2913856577, 3570689971, 2728590687, 2947541573, 2627518243, 2762274643, 1920112356, 3233831835, 3082273397, 4261223649, 2475929149, 640051788, 909531756, 1061110142, 4160160501, 3435941763, 875846760, 2779116625, 3857003729, 4059105529, 1903268834, 3638064043, 825316194, 353713962, 67374088, 3351728789, 589522246, 3284360861, 404236336, 2526454071, 84217610, 2593830191, 117901582, 303183396, 2155911963, 3806477791, 3958056653, 656894286, 2998062463, 1970642922, 151591698, 2206440989, 741110872, 437923380, 454765878, 1852748508, 1515908788, 2694904667, 1381168804, 993742198, 3604373943, 3014905469, 690584402, 3823320797, 791638366, 2223281939, 1398011302, 3520161977, 0, 3991743681, 538992704, 4244381667, 2981218425, 1532751286, 1785380564, 3419096717, 3200178535, 960056178, 1246420628, 1280103576, 1482221744, 3486468741, 3503319995, 4025428677, 2863326543, 4227536621, 1128514950, 1296947098, 859002214, 2240123921, 1162203018, 4193849577, 33687044, 2139062782, 1347481760, 1010582648, 2678045221, 2829640523, 1364325282, 2745433693, 1077985408, 2408548869, 2459086143, 2644360225, 943212656, 4126475505, 3166494563, 3065430391, 3671750063, 555836226, 269496352, 4294908645, 4092792573, 3537006015, 3452783745, 202118168, 320025894, 3974901699, 1600119230, 2543297077, 1145359496, 387397934, 3301201811, 2812801621, 2122220284, 1027426170, 1684319432, 1566435258, 421079858, 1936954854, 1616945344, 2172753945, 1330631070, 3705438115, 572679748, 707427924, 2425400123, 2290647819, 1179044492, 4008585671, 3099120491, 336870440, 3739122087, 1583276732, 185277718, 3688593069, 3772791771, 842159716, 976899700, 168435220, 1229577106, 101059084, 606366792, 1549591736, 3267517855, 3553849021, 2897014595, 1650632388, 2442242105, 2509612081, 3840161747, 2038008818, 3890688725, 3368567691, 926374254, 1835907034, 2374863873, 3587531953, 1313788572, 2846482505, 1819063512, 1448540844, 4109633523, 3941213647, 1701162954, 2054852340, 2930698567, 134748176, 3132806511, 2021165296, 623210314, 774795868, 471606328, 2795958615, 3031746419, 3334885783, 3907527627, 3722280097, 1953799400, 522133822, 1263263126, 3183336545, 2341176845, 2324333839, 1886425312, 1044267644, 3048588401, 1718004428, 1212733584, 50529542, 4143317495, 235803164, 1633788866, 892690282, 1465383342, 3115962473, 2256965911, 3250673817, 488449850, 2661202215, 3789633753, 4177007595, 2560144171, 286339874, 1768537042, 3654906025, 2391705863, 2492770099, 2610673197, 505291324, 2273808917, 3924369609, 3469625735, 1431699370, 673740880, 3755965093, 2358021891, 2711746649, 2307489801, 218961690, 3217021541, 3873845719, 1111672452, 1751693520, 1094828930, 2576986153, 757954394, 252645662, 2964376443, 1414855848, 3149649517, 370555436];
        var T5 = [1374988112, 2118214995, 437757123, 975658646, 1001089995, 530400753, 2902087851, 1273168787, 540080725, 2910219766, 2295101073, 4110568485, 1340463100, 3307916247, 641025152, 3043140495, 3736164937, 632953703, 1172967064, 1576976609, 3274667266, 2169303058, 2370213795, 1809054150, 59727847, 361929877, 3211623147, 2505202138, 3569255213, 1484005843, 1239443753, 2395588676, 1975683434, 4102977912, 2572697195, 666464733, 3202437046, 4035489047, 3374361702, 2110667444, 1675577880, 3843699074, 2538681184, 1649639237, 2976151520, 3144396420, 4269907996, 4178062228, 1883793496, 2403728665, 2497604743, 1383856311, 2876494627, 1917518562, 3810496343, 1716890410, 3001755655, 800440835, 2261089178, 3543599269, 807962610, 599762354, 33778362, 3977675356, 2328828971, 2809771154, 4077384432, 1315562145, 1708848333, 101039829, 3509871135, 3299278474, 875451293, 2733856160, 92987698, 2767645557, 193195065, 1080094634, 1584504582, 3178106961, 1042385657, 2531067453, 3711829422, 1306967366, 2438237621, 1908694277, 67556463, 1615861247, 429456164, 3602770327, 2302690252, 1742315127, 2968011453, 126454664, 3877198648, 2043211483, 2709260871, 2084704233, 4169408201, 0, 159417987, 841739592, 504459436, 1817866830, 4245618683, 260388950, 1034867998, 908933415, 168810852, 1750902305, 2606453969, 607530554, 202008497, 2472011535, 3035535058, 463180190, 2160117071, 1641816226, 1517767529, 470948374, 3801332234, 3231722213, 1008918595, 303765277, 235474187, 4069246893, 766945465, 337553864, 1475418501, 2943682380, 4003061179, 2743034109, 4144047775, 1551037884, 1147550661, 1543208500, 2336434550, 3408119516, 3069049960, 3102011747, 3610369226, 1113818384, 328671808, 2227573024, 2236228733, 3535486456, 2935566865, 3341394285, 496906059, 3702665459, 226906860, 2009195472, 733156972, 2842737049, 294930682, 1206477858, 2835123396, 2700099354, 1451044056, 573804783, 2269728455, 3644379585, 2362090238, 2564033334, 2801107407, 2776292904, 3669462566, 1068351396, 742039012, 1350078989, 1784663195, 1417561698, 4136440770, 2430122216, 775550814, 2193862645, 2673705150, 1775276924, 1876241833, 3475313331, 3366754619, 270040487, 3902563182, 3678124923, 3441850377, 1851332852, 3969562369, 2203032232, 3868552805, 2868897406, 566021896, 4011190502, 3135740889, 1248802510, 3936291284, 699432150, 832877231, 708780849, 3332740144, 899835584, 1951317047, 4236429990, 3767586992, 866637845, 4043610186, 1106041591, 2144161806, 395441711, 1984812685, 1139781709, 3433712980, 3835036895, 2664543715, 1282050075, 3240894392, 1181045119, 2640243204, 25965917, 4203181171, 4211818798, 3009879386, 2463879762, 3910161971, 1842759443, 2597806476, 933301370, 1509430414, 3943906441, 3467192302, 3076639029, 3776767469, 2051518780, 2631065433, 1441952575, 404016761, 1942435775, 1408749034, 1610459739, 3745345300, 2017778566, 3400528769, 3110650942, 941896748, 3265478751, 371049330, 3168937228, 675039627, 4279080257, 967311729, 135050206, 3635733660, 1683407248, 2076935265, 3576870512, 1215061108, 3501741890];
        var T6 = [1347548327, 1400783205, 3273267108, 2520393566, 3409685355, 4045380933, 2880240216, 2471224067, 1428173050, 4138563181, 2441661558, 636813900, 4233094615, 3620022987, 2149987652, 2411029155, 1239331162, 1730525723, 2554718734, 3781033664, 46346101, 310463728, 2743944855, 3328955385, 3875770207, 2501218972, 3955191162, 3667219033, 768917123, 3545789473, 692707433, 1150208456, 1786102409, 2029293177, 1805211710, 3710368113, 3065962831, 401639597, 1724457132, 3028143674, 409198410, 2196052529, 1620529459, 1164071807, 3769721975, 2226875310, 486441376, 2499348523, 1483753576, 428819965, 2274680428, 3075636216, 598438867, 3799141122, 1474502543, 711349675, 129166120, 53458370, 2592523643, 2782082824, 4063242375, 2988687269, 3120694122, 1559041666, 730517276, 2460449204, 4042459122, 2706270690, 3446004468, 3573941694, 533804130, 2328143614, 2637442643, 2695033685, 839224033, 1973745387, 957055980, 2856345839, 106852767, 1371368976, 4181598602, 1033297158, 2933734917, 1179510461, 3046200461, 91341917, 1862534868, 4284502037, 605657339, 2547432937, 3431546947, 2003294622, 3182487618, 2282195339, 954669403, 3682191598, 1201765386, 3917234703, 3388507166, 0, 2198438022, 1211247597, 2887651696, 1315723890, 4227665663, 1443857720, 507358933, 657861945, 1678381017, 560487590, 3516619604, 975451694, 2970356327, 261314535, 3535072918, 2652609425, 1333838021, 2724322336, 1767536459, 370938394, 182621114, 3854606378, 1128014560, 487725847, 185469197, 2918353863, 3106780840, 3356761769, 2237133081, 1286567175, 3152976349, 4255350624, 2683765030, 3160175349, 3309594171, 878443390, 1988838185, 3704300486, 1756818940, 1673061617, 3403100636, 272786309, 1075025698, 545572369, 2105887268, 4174560061, 296679730, 1841768865, 1260232239, 4091327024, 3960309330, 3497509347, 1814803222, 2578018489, 4195456072, 575138148, 3299409036, 446754879, 3629546796, 4011996048, 3347532110, 3252238545, 4270639778, 915985419, 3483825537, 681933534, 651868046, 2755636671, 3828103837, 223377554, 2607439820, 1649704518, 3270937875, 3901806776, 1580087799, 4118987695, 3198115200, 2087309459, 2842678573, 3016697106, 1003007129, 2802849917, 1860738147, 2077965243, 164439672, 4100872472, 32283319, 2827177882, 1709610350, 2125135846, 136428751, 3874428392, 3652904859, 3460984630, 3572145929, 3593056380, 2939266226, 824852259, 818324884, 3224740454, 930369212, 2801566410, 2967507152, 355706840, 1257309336, 4148292826, 243256656, 790073846, 2373340630, 1296297904, 1422699085, 3756299780, 3818836405, 457992840, 3099667487, 2135319889, 77422314, 1560382517, 1945798516, 788204353, 1521706781, 1385356242, 870912086, 325965383, 2358957921, 2050466060, 2388260884, 2313884476, 4006521127, 901210569, 3990953189, 1014646705, 1503449823, 1062597235, 2031621326, 3212035895, 3931371469, 1533017514, 350174575, 2256028891, 2177544179, 1052338372, 741876788, 1606591296, 1914052035, 213705253, 2334669897, 1107234197, 1899603969, 3725069491, 2631447780, 2422494913, 1635502980, 1893020342, 1950903388, 1120974935];
        var T7 = [2807058932, 1699970625, 2764249623, 1586903591, 1808481195, 1173430173, 1487645946, 59984867, 4199882800, 1844882806, 1989249228, 1277555970, 3623636965, 3419915562, 1149249077, 2744104290, 1514790577, 459744698, 244860394, 3235995134, 1963115311, 4027744588, 2544078150, 4190530515, 1608975247, 2627016082, 2062270317, 1507497298, 2200818878, 567498868, 1764313568, 3359936201, 2305455554, 2037970062, 1047239e3, 1910319033, 1337376481, 2904027272, 2892417312, 984907214, 1243112415, 830661914, 861968209, 2135253587, 2011214180, 2927934315, 2686254721, 731183368, 1750626376, 4246310725, 1820824798, 4172763771, 3542330227, 48394827, 2404901663, 2871682645, 671593195, 3254988725, 2073724613, 145085239, 2280796200, 2779915199, 1790575107, 2187128086, 472615631, 3029510009, 4075877127, 3802222185, 4107101658, 3201631749, 1646252340, 4270507174, 1402811438, 1436590835, 3778151818, 3950355702, 3963161475, 4020912224, 2667994737, 273792366, 2331590177, 104699613, 95345982, 3175501286, 2377486676, 1560637892, 3564045318, 369057872, 4213447064, 3919042237, 1137477952, 2658625497, 1119727848, 2340947849, 1530455833, 4007360968, 172466556, 266959938, 516552836, 0, 2256734592, 3980931627, 1890328081, 1917742170, 4294704398, 945164165, 3575528878, 958871085, 3647212047, 2787207260, 1423022939, 775562294, 1739656202, 3876557655, 2530391278, 2443058075, 3310321856, 547512796, 1265195639, 437656594, 3121275539, 719700128, 3762502690, 387781147, 218828297, 3350065803, 2830708150, 2848461854, 428169201, 122466165, 3720081049, 1627235199, 648017665, 4122762354, 1002783846, 2117360635, 695634755, 3336358691, 4234721005, 4049844452, 3704280881, 2232435299, 574624663, 287343814, 612205898, 1039717051, 840019705, 2708326185, 793451934, 821288114, 1391201670, 3822090177, 376187827, 3113855344, 1224348052, 1679968233, 2361698556, 1058709744, 752375421, 2431590963, 1321699145, 3519142200, 2734591178, 188127444, 2177869557, 3727205754, 2384911031, 3215212461, 2648976442, 2450346104, 3432737375, 1180849278, 331544205, 3102249176, 4150144569, 2952102595, 2159976285, 2474404304, 766078933, 313773861, 2570832044, 2108100632, 1668212892, 3145456443, 2013908262, 418672217, 3070356634, 2594734927, 1852171925, 3867060991, 3473416636, 3907448597, 2614737639, 919489135, 164948639, 2094410160, 2997825956, 590424639, 2486224549, 1723872674, 3157750862, 3399941250, 3501252752, 3625268135, 2555048196, 3673637356, 1343127501, 4130281361, 3599595085, 2957853679, 1297403050, 81781910, 3051593425, 2283490410, 532201772, 1367295589, 3926170974, 895287692, 1953757831, 1093597963, 492483431, 3528626907, 1446242576, 1192455638, 1636604631, 209336225, 344873464, 1015671571, 669961897, 3375740769, 3857572124, 2973530695, 3747192018, 1933530610, 3464042516, 935293895, 3454686199, 2858115069, 1863638845, 3683022916, 4085369519, 3292445032, 875313188, 1080017571, 3279033885, 621591778, 1233856572, 2504130317, 24197544, 3017672716, 3835484340, 3247465558, 2220981195, 3060847922, 1551124588, 1463996600];
        var T8 = [4104605777, 1097159550, 396673818, 660510266, 2875968315, 2638606623, 4200115116, 3808662347, 821712160, 1986918061, 3430322568, 38544885, 3856137295, 718002117, 893681702, 1654886325, 2975484382, 3122358053, 3926825029, 4274053469, 796197571, 1290801793, 1184342925, 3556361835, 2405426947, 2459735317, 1836772287, 1381620373, 3196267988, 1948373848, 3764988233, 3385345166, 3263785589, 2390325492, 1480485785, 3111247143, 3780097726, 2293045232, 548169417, 3459953789, 3746175075, 439452389, 1362321559, 1400849762, 1685577905, 1806599355, 2174754046, 137073913, 1214797936, 1174215055, 3731654548, 2079897426, 1943217067, 1258480242, 529487843, 1437280870, 3945269170, 3049390895, 3313212038, 923313619, 679998e3, 3215307299, 57326082, 377642221, 3474729866, 2041877159, 133361907, 1776460110, 3673476453, 96392454, 878845905, 2801699524, 777231668, 4082475170, 2330014213, 4142626212, 2213296395, 1626319424, 1906247262, 1846563261, 562755902, 3708173718, 1040559837, 3871163981, 1418573201, 3294430577, 114585348, 1343618912, 2566595609, 3186202582, 1078185097, 3651041127, 3896688048, 2307622919, 425408743, 3371096953, 2081048481, 1108339068, 2216610296, 0, 2156299017, 736970802, 292596766, 1517440620, 251657213, 2235061775, 2933202493, 758720310, 265905162, 1554391400, 1532285339, 908999204, 174567692, 1474760595, 4002861748, 2610011675, 3234156416, 3693126241, 2001430874, 303699484, 2478443234, 2687165888, 585122620, 454499602, 151849742, 2345119218, 3064510765, 514443284, 4044981591, 1963412655, 2581445614, 2137062819, 19308535, 1928707164, 1715193156, 4219352155, 1126790795, 600235211, 3992742070, 3841024952, 836553431, 1669664834, 2535604243, 3323011204, 1243905413, 3141400786, 4180808110, 698445255, 2653899549, 2989552604, 2253581325, 3252932727, 3004591147, 1891211689, 2487810577, 3915653703, 4237083816, 4030667424, 2100090966, 865136418, 1229899655, 953270745, 3399679628, 3557504664, 4118925222, 2061379749, 3079546586, 2915017791, 983426092, 2022837584, 1607244650, 2118541908, 2366882550, 3635996816, 972512814, 3283088770, 1568718495, 3499326569, 3576539503, 621982671, 2895723464, 410887952, 2623762152, 1002142683, 645401037, 1494807662, 2595684844, 1335535747, 2507040230, 4293295786, 3167684641, 367585007, 3885750714, 1865862730, 2668221674, 2960971305, 2763173681, 1059270954, 2777952454, 2724642869, 1320957812, 2194319100, 2429595872, 2815956275, 77089521, 3973773121, 3444575871, 2448830231, 1305906550, 4021308739, 2857194700, 2516901860, 3518358430, 1787304780, 740276417, 1699839814, 1592394909, 2352307457, 2272556026, 188821243, 1729977011, 3687994002, 274084841, 3594982253, 3613494426, 2701949495, 4162096729, 322734571, 2837966542, 1640576439, 484830689, 1202797690, 3537852828, 4067639125, 349075736, 3342319475, 4157467219, 4255800159, 1030690015, 1155237496, 2951971274, 1757691577, 607398968, 2738905026, 499347990, 3794078908, 1011452712, 227885567, 2818666809, 213114376, 3034881240, 1455525988, 3414450555, 850817237, 1817998408, 3092726480];
        var U1 = [0, 235474187, 470948374, 303765277, 941896748, 908933415, 607530554, 708780849, 1883793496, 2118214995, 1817866830, 1649639237, 1215061108, 1181045119, 1417561698, 1517767529, 3767586992, 4003061179, 4236429990, 4069246893, 3635733660, 3602770327, 3299278474, 3400528769, 2430122216, 2664543715, 2362090238, 2193862645, 2835123396, 2801107407, 3035535058, 3135740889, 3678124923, 3576870512, 3341394285, 3374361702, 3810496343, 3977675356, 4279080257, 4043610186, 2876494627, 2776292904, 3076639029, 3110650942, 2472011535, 2640243204, 2403728665, 2169303058, 1001089995, 899835584, 666464733, 699432150, 59727847, 226906860, 530400753, 294930682, 1273168787, 1172967064, 1475418501, 1509430414, 1942435775, 2110667444, 1876241833, 1641816226, 2910219766, 2743034109, 2976151520, 3211623147, 2505202138, 2606453969, 2302690252, 2269728455, 3711829422, 3543599269, 3240894392, 3475313331, 3843699074, 3943906441, 4178062228, 4144047775, 1306967366, 1139781709, 1374988112, 1610459739, 1975683434, 2076935265, 1775276924, 1742315127, 1034867998, 866637845, 566021896, 800440835, 92987698, 193195065, 429456164, 395441711, 1984812685, 2017778566, 1784663195, 1683407248, 1315562145, 1080094634, 1383856311, 1551037884, 101039829, 135050206, 437757123, 337553864, 1042385657, 807962610, 573804783, 742039012, 2531067453, 2564033334, 2328828971, 2227573024, 2935566865, 2700099354, 3001755655, 3168937228, 3868552805, 3902563182, 4203181171, 4102977912, 3736164937, 3501741890, 3265478751, 3433712980, 1106041591, 1340463100, 1576976609, 1408749034, 2043211483, 2009195472, 1708848333, 1809054150, 832877231, 1068351396, 766945465, 599762354, 159417987, 126454664, 361929877, 463180190, 2709260871, 2943682380, 3178106961, 3009879386, 2572697195, 2538681184, 2236228733, 2336434550, 3509871135, 3745345300, 3441850377, 3274667266, 3910161971, 3877198648, 4110568485, 4211818798, 2597806476, 2497604743, 2261089178, 2295101073, 2733856160, 2902087851, 3202437046, 2968011453, 3936291284, 3835036895, 4136440770, 4169408201, 3535486456, 3702665459, 3467192302, 3231722213, 2051518780, 1951317047, 1716890410, 1750902305, 1113818384, 1282050075, 1584504582, 1350078989, 168810852, 67556463, 371049330, 404016761, 841739592, 1008918595, 775550814, 540080725, 3969562369, 3801332234, 4035489047, 4269907996, 3569255213, 3669462566, 3366754619, 3332740144, 2631065433, 2463879762, 2160117071, 2395588676, 2767645557, 2868897406, 3102011747, 3069049960, 202008497, 33778362, 270040487, 504459436, 875451293, 975658646, 675039627, 641025152, 2084704233, 1917518562, 1615861247, 1851332852, 1147550661, 1248802510, 1484005843, 1451044056, 933301370, 967311729, 733156972, 632953703, 260388950, 25965917, 328671808, 496906059, 1206477858, 1239443753, 1543208500, 1441952575, 2144161806, 1908694277, 1675577880, 1842759443, 3610369226, 3644379585, 3408119516, 3307916247, 4011190502, 3776767469, 4077384432, 4245618683, 2809771154, 2842737049, 3144396420, 3043140495, 2673705150, 2438237621, 2203032232, 2370213795];
        var U2 = [0, 185469197, 370938394, 487725847, 741876788, 657861945, 975451694, 824852259, 1483753576, 1400783205, 1315723890, 1164071807, 1950903388, 2135319889, 1649704518, 1767536459, 2967507152, 3152976349, 2801566410, 2918353863, 2631447780, 2547432937, 2328143614, 2177544179, 3901806776, 3818836405, 4270639778, 4118987695, 3299409036, 3483825537, 3535072918, 3652904859, 2077965243, 1893020342, 1841768865, 1724457132, 1474502543, 1559041666, 1107234197, 1257309336, 598438867, 681933534, 901210569, 1052338372, 261314535, 77422314, 428819965, 310463728, 3409685355, 3224740454, 3710368113, 3593056380, 3875770207, 3960309330, 4045380933, 4195456072, 2471224067, 2554718734, 2237133081, 2388260884, 3212035895, 3028143674, 2842678573, 2724322336, 4138563181, 4255350624, 3769721975, 3955191162, 3667219033, 3516619604, 3431546947, 3347532110, 2933734917, 2782082824, 3099667487, 3016697106, 2196052529, 2313884476, 2499348523, 2683765030, 1179510461, 1296297904, 1347548327, 1533017514, 1786102409, 1635502980, 2087309459, 2003294622, 507358933, 355706840, 136428751, 53458370, 839224033, 957055980, 605657339, 790073846, 2373340630, 2256028891, 2607439820, 2422494913, 2706270690, 2856345839, 3075636216, 3160175349, 3573941694, 3725069491, 3273267108, 3356761769, 4181598602, 4063242375, 4011996048, 3828103837, 1033297158, 915985419, 730517276, 545572369, 296679730, 446754879, 129166120, 213705253, 1709610350, 1860738147, 1945798516, 2029293177, 1239331162, 1120974935, 1606591296, 1422699085, 4148292826, 4233094615, 3781033664, 3931371469, 3682191598, 3497509347, 3446004468, 3328955385, 2939266226, 2755636671, 3106780840, 2988687269, 2198438022, 2282195339, 2501218972, 2652609425, 1201765386, 1286567175, 1371368976, 1521706781, 1805211710, 1620529459, 2105887268, 1988838185, 533804130, 350174575, 164439672, 46346101, 870912086, 954669403, 636813900, 788204353, 2358957921, 2274680428, 2592523643, 2441661558, 2695033685, 2880240216, 3065962831, 3182487618, 3572145929, 3756299780, 3270937875, 3388507166, 4174560061, 4091327024, 4006521127, 3854606378, 1014646705, 930369212, 711349675, 560487590, 272786309, 457992840, 106852767, 223377554, 1678381017, 1862534868, 1914052035, 2031621326, 1211247597, 1128014560, 1580087799, 1428173050, 32283319, 182621114, 401639597, 486441376, 768917123, 651868046, 1003007129, 818324884, 1503449823, 1385356242, 1333838021, 1150208456, 1973745387, 2125135846, 1673061617, 1756818940, 2970356327, 3120694122, 2802849917, 2887651696, 2637442643, 2520393566, 2334669897, 2149987652, 3917234703, 3799141122, 4284502037, 4100872472, 3309594171, 3460984630, 3545789473, 3629546796, 2050466060, 1899603969, 1814803222, 1730525723, 1443857720, 1560382517, 1075025698, 1260232239, 575138148, 692707433, 878443390, 1062597235, 243256656, 91341917, 409198410, 325965383, 3403100636, 3252238545, 3704300486, 3620022987, 3874428392, 3990953189, 4042459122, 4227665663, 2460449204, 2578018489, 2226875310, 2411029155, 3198115200, 3046200461, 2827177882, 2743944855];
        var U3 = [0, 218828297, 437656594, 387781147, 875313188, 958871085, 775562294, 590424639, 1750626376, 1699970625, 1917742170, 2135253587, 1551124588, 1367295589, 1180849278, 1265195639, 3501252752, 3720081049, 3399941250, 3350065803, 3835484340, 3919042237, 4270507174, 4085369519, 3102249176, 3051593425, 2734591178, 2952102595, 2361698556, 2177869557, 2530391278, 2614737639, 3145456443, 3060847922, 2708326185, 2892417312, 2404901663, 2187128086, 2504130317, 2555048196, 3542330227, 3727205754, 3375740769, 3292445032, 3876557655, 3926170974, 4246310725, 4027744588, 1808481195, 1723872674, 1910319033, 2094410160, 1608975247, 1391201670, 1173430173, 1224348052, 59984867, 244860394, 428169201, 344873464, 935293895, 984907214, 766078933, 547512796, 1844882806, 1627235199, 2011214180, 2062270317, 1507497298, 1423022939, 1137477952, 1321699145, 95345982, 145085239, 532201772, 313773861, 830661914, 1015671571, 731183368, 648017665, 3175501286, 2957853679, 2807058932, 2858115069, 2305455554, 2220981195, 2474404304, 2658625497, 3575528878, 3625268135, 3473416636, 3254988725, 3778151818, 3963161475, 4213447064, 4130281361, 3599595085, 3683022916, 3432737375, 3247465558, 3802222185, 4020912224, 4172763771, 4122762354, 3201631749, 3017672716, 2764249623, 2848461854, 2331590177, 2280796200, 2431590963, 2648976442, 104699613, 188127444, 472615631, 287343814, 840019705, 1058709744, 671593195, 621591778, 1852171925, 1668212892, 1953757831, 2037970062, 1514790577, 1463996600, 1080017571, 1297403050, 3673637356, 3623636965, 3235995134, 3454686199, 4007360968, 3822090177, 4107101658, 4190530515, 2997825956, 3215212461, 2830708150, 2779915199, 2256734592, 2340947849, 2627016082, 2443058075, 172466556, 122466165, 273792366, 492483431, 1047239e3, 861968209, 612205898, 695634755, 1646252340, 1863638845, 2013908262, 1963115311, 1446242576, 1530455833, 1277555970, 1093597963, 1636604631, 1820824798, 2073724613, 1989249228, 1436590835, 1487645946, 1337376481, 1119727848, 164948639, 81781910, 331544205, 516552836, 1039717051, 821288114, 669961897, 719700128, 2973530695, 3157750862, 2871682645, 2787207260, 2232435299, 2283490410, 2667994737, 2450346104, 3647212047, 3564045318, 3279033885, 3464042516, 3980931627, 3762502690, 4150144569, 4199882800, 3070356634, 3121275539, 2904027272, 2686254721, 2200818878, 2384911031, 2570832044, 2486224549, 3747192018, 3528626907, 3310321856, 3359936201, 3950355702, 3867060991, 4049844452, 4234721005, 1739656202, 1790575107, 2108100632, 1890328081, 1402811438, 1586903591, 1233856572, 1149249077, 266959938, 48394827, 369057872, 418672217, 1002783846, 919489135, 567498868, 752375421, 209336225, 24197544, 376187827, 459744698, 945164165, 895287692, 574624663, 793451934, 1679968233, 1764313568, 2117360635, 1933530610, 1343127501, 1560637892, 1243112415, 1192455638, 3704280881, 3519142200, 3336358691, 3419915562, 3907448597, 3857572124, 4075877127, 4294704398, 3029510009, 3113855344, 2927934315, 2744104290, 2159976285, 2377486676, 2594734927, 2544078150];
        var U4 = [0, 151849742, 303699484, 454499602, 607398968, 758720310, 908999204, 1059270954, 1214797936, 1097159550, 1517440620, 1400849762, 1817998408, 1699839814, 2118541908, 2001430874, 2429595872, 2581445614, 2194319100, 2345119218, 3034881240, 3186202582, 2801699524, 2951971274, 3635996816, 3518358430, 3399679628, 3283088770, 4237083816, 4118925222, 4002861748, 3885750714, 1002142683, 850817237, 698445255, 548169417, 529487843, 377642221, 227885567, 77089521, 1943217067, 2061379749, 1640576439, 1757691577, 1474760595, 1592394909, 1174215055, 1290801793, 2875968315, 2724642869, 3111247143, 2960971305, 2405426947, 2253581325, 2638606623, 2487810577, 3808662347, 3926825029, 4044981591, 4162096729, 3342319475, 3459953789, 3576539503, 3693126241, 1986918061, 2137062819, 1685577905, 1836772287, 1381620373, 1532285339, 1078185097, 1229899655, 1040559837, 923313619, 740276417, 621982671, 439452389, 322734571, 137073913, 19308535, 3871163981, 4021308739, 4104605777, 4255800159, 3263785589, 3414450555, 3499326569, 3651041127, 2933202493, 2815956275, 3167684641, 3049390895, 2330014213, 2213296395, 2566595609, 2448830231, 1305906550, 1155237496, 1607244650, 1455525988, 1776460110, 1626319424, 2079897426, 1928707164, 96392454, 213114376, 396673818, 514443284, 562755902, 679998e3, 865136418, 983426092, 3708173718, 3557504664, 3474729866, 3323011204, 4180808110, 4030667424, 3945269170, 3794078908, 2507040230, 2623762152, 2272556026, 2390325492, 2975484382, 3092726480, 2738905026, 2857194700, 3973773121, 3856137295, 4274053469, 4157467219, 3371096953, 3252932727, 3673476453, 3556361835, 2763173681, 2915017791, 3064510765, 3215307299, 2156299017, 2307622919, 2459735317, 2610011675, 2081048481, 1963412655, 1846563261, 1729977011, 1480485785, 1362321559, 1243905413, 1126790795, 878845905, 1030690015, 645401037, 796197571, 274084841, 425408743, 38544885, 188821243, 3613494426, 3731654548, 3313212038, 3430322568, 4082475170, 4200115116, 3780097726, 3896688048, 2668221674, 2516901860, 2366882550, 2216610296, 3141400786, 2989552604, 2837966542, 2687165888, 1202797690, 1320957812, 1437280870, 1554391400, 1669664834, 1787304780, 1906247262, 2022837584, 265905162, 114585348, 499347990, 349075736, 736970802, 585122620, 972512814, 821712160, 2595684844, 2478443234, 2293045232, 2174754046, 3196267988, 3079546586, 2895723464, 2777952454, 3537852828, 3687994002, 3234156416, 3385345166, 4142626212, 4293295786, 3841024952, 3992742070, 174567692, 57326082, 410887952, 292596766, 777231668, 660510266, 1011452712, 893681702, 1108339068, 1258480242, 1343618912, 1494807662, 1715193156, 1865862730, 1948373848, 2100090966, 2701949495, 2818666809, 3004591147, 3122358053, 2235061775, 2352307457, 2535604243, 2653899549, 3915653703, 3764988233, 4219352155, 4067639125, 3444575871, 3294430577, 3746175075, 3594982253, 836553431, 953270745, 600235211, 718002117, 367585007, 484830689, 133361907, 251657213, 2041877159, 1891211689, 1806599355, 1654886325, 1568718495, 1418573201, 1335535747, 1184342925];
        function convertToInt32(bytes) {
          var result = [];
          for (var i = 0; i < bytes.length; i += 4) {
            result.push(bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3]);
          }
          return result;
        }
        var AES = function(key2) {
          if (!(this instanceof AES)) {
            throw Error("AES must be instanitated with `new`");
          }
          Object.defineProperty(this, "key", {
            value: coerceArray(key2, true)
          });
          this._prepare();
        };
        AES.prototype._prepare = function() {
          var rounds = numberOfRounds[this.key.length];
          if (rounds == null) {
            throw new Error("invalid key size (must be 16, 24 or 32 bytes)");
          }
          this._Ke = [];
          this._Kd = [];
          for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
          }
          var roundKeyCount = (rounds + 1) * 4;
          var KC = this.key.length / 4;
          var tk = convertToInt32(this.key);
          var index;
          for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
          }
          var rconpointer = 0;
          var t = KC, tt;
          while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= S[tt >> 16 & 255] << 24 ^ S[tt >> 8 & 255] << 16 ^ S[tt & 255] << 8 ^ S[tt >> 24 & 255] ^ rcon[rconpointer] << 24;
            rconpointer += 1;
            if (KC != 8) {
              for (var i = 1; i < KC; i++) {
                tk[i] ^= tk[i - 1];
              }
            } else {
              for (var i = 1; i < KC / 2; i++) {
                tk[i] ^= tk[i - 1];
              }
              tt = tk[KC / 2 - 1];
              tk[KC / 2] ^= S[tt & 255] ^ S[tt >> 8 & 255] << 8 ^ S[tt >> 16 & 255] << 16 ^ S[tt >> 24 & 255] << 24;
              for (var i = KC / 2 + 1; i < KC; i++) {
                tk[i] ^= tk[i - 1];
              }
            }
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
              r = t >> 2;
              c = t % 4;
              this._Ke[r][c] = tk[i];
              this._Kd[rounds - r][c] = tk[i++];
              t++;
            }
          }
          for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
              tt = this._Kd[r][c];
              this._Kd[r][c] = U1[tt >> 24 & 255] ^ U2[tt >> 16 & 255] ^ U3[tt >> 8 & 255] ^ U4[tt & 255];
            }
          }
        };
        AES.prototype.encrypt = function(plaintext) {
          if (plaintext.length != 16) {
            throw new Error("invalid plaintext size (must be 16 bytes)");
          }
          var rounds = this._Ke.length - 1;
          var a = [0, 0, 0, 0];
          var t = convertToInt32(plaintext);
          for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
          }
          for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
              a[i] = T1[t[i] >> 24 & 255] ^ T2[t[(i + 1) % 4] >> 16 & 255] ^ T3[t[(i + 2) % 4] >> 8 & 255] ^ T4[t[(i + 3) % 4] & 255] ^ this._Ke[r][i];
            }
            t = a.slice();
          }
          var result = createArray(16), tt;
          for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i] = (S[t[i] >> 24 & 255] ^ tt >> 24) & 255;
            result[4 * i + 1] = (S[t[(i + 1) % 4] >> 16 & 255] ^ tt >> 16) & 255;
            result[4 * i + 2] = (S[t[(i + 2) % 4] >> 8 & 255] ^ tt >> 8) & 255;
            result[4 * i + 3] = (S[t[(i + 3) % 4] & 255] ^ tt) & 255;
          }
          return result;
        };
        AES.prototype.decrypt = function(ciphertext) {
          if (ciphertext.length != 16) {
            throw new Error("invalid ciphertext size (must be 16 bytes)");
          }
          var rounds = this._Kd.length - 1;
          var a = [0, 0, 0, 0];
          var t = convertToInt32(ciphertext);
          for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
          }
          for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
              a[i] = T5[t[i] >> 24 & 255] ^ T6[t[(i + 3) % 4] >> 16 & 255] ^ T7[t[(i + 2) % 4] >> 8 & 255] ^ T8[t[(i + 1) % 4] & 255] ^ this._Kd[r][i];
            }
            t = a.slice();
          }
          var result = createArray(16), tt;
          for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i] = (Si[t[i] >> 24 & 255] ^ tt >> 24) & 255;
            result[4 * i + 1] = (Si[t[(i + 3) % 4] >> 16 & 255] ^ tt >> 16) & 255;
            result[4 * i + 2] = (Si[t[(i + 2) % 4] >> 8 & 255] ^ tt >> 8) & 255;
            result[4 * i + 3] = (Si[t[(i + 1) % 4] & 255] ^ tt) & 255;
          }
          return result;
        };
        var ModeOfOperationECB = function(key2) {
          if (!(this instanceof ModeOfOperationECB)) {
            throw Error("AES must be instanitated with `new`");
          }
          this.description = "Electronic Code Block";
          this.name = "ecb";
          this._aes = new AES(key2);
        };
        ModeOfOperationECB.prototype.encrypt = function(plaintext) {
          plaintext = coerceArray(plaintext);
          if (plaintext.length % 16 !== 0) {
            throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
          }
          var ciphertext = createArray(plaintext.length);
          var block = createArray(16);
          for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
          }
          return ciphertext;
        };
        ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
          ciphertext = coerceArray(ciphertext);
          if (ciphertext.length % 16 !== 0) {
            throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
          }
          var plaintext = createArray(ciphertext.length);
          var block = createArray(16);
          for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
          }
          return plaintext;
        };
        var ModeOfOperationCBC = function(key2, iv) {
          if (!(this instanceof ModeOfOperationCBC)) {
            throw Error("AES must be instanitated with `new`");
          }
          this.description = "Cipher Block Chaining";
          this.name = "cbc";
          if (!iv) {
            iv = createArray(16);
          } else if (iv.length != 16) {
            throw new Error("invalid initialation vector size (must be 16 bytes)");
          }
          this._lastCipherblock = coerceArray(iv, true);
          this._aes = new AES(key2);
        };
        ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
          plaintext = coerceArray(plaintext);
          if (plaintext.length % 16 !== 0) {
            throw new Error("invalid plaintext size (must be multiple of 16 bytes)");
          }
          var ciphertext = createArray(plaintext.length);
          var block = createArray(16);
          for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            for (var j = 0; j < 16; j++) {
              block[j] ^= this._lastCipherblock[j];
            }
            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
          }
          return ciphertext;
        };
        ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
          ciphertext = coerceArray(ciphertext);
          if (ciphertext.length % 16 !== 0) {
            throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");
          }
          var plaintext = createArray(ciphertext.length);
          var block = createArray(16);
          for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            for (var j = 0; j < 16; j++) {
              plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }
            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
          }
          return plaintext;
        };
        var ModeOfOperationCFB = function(key2, iv, segmentSize) {
          if (!(this instanceof ModeOfOperationCFB)) {
            throw Error("AES must be instanitated with `new`");
          }
          this.description = "Cipher Feedback";
          this.name = "cfb";
          if (!iv) {
            iv = createArray(16);
          } else if (iv.length != 16) {
            throw new Error("invalid initialation vector size (must be 16 size)");
          }
          if (!segmentSize) {
            segmentSize = 1;
          }
          this.segmentSize = segmentSize;
          this._shiftRegister = coerceArray(iv, true);
          this._aes = new AES(key2);
        };
        ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
          if (plaintext.length % this.segmentSize != 0) {
            throw new Error("invalid plaintext size (must be segmentSize bytes)");
          }
          var encrypted = coerceArray(plaintext, true);
          var xorSegment;
          for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
              encrypted[i + j] ^= xorSegment[j];
            }
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
          }
          return encrypted;
        };
        ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
          if (ciphertext.length % this.segmentSize != 0) {
            throw new Error("invalid ciphertext size (must be segmentSize bytes)");
          }
          var plaintext = coerceArray(ciphertext, true);
          var xorSegment;
          for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
              plaintext[i + j] ^= xorSegment[j];
            }
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
          }
          return plaintext;
        };
        var ModeOfOperationOFB = function(key2, iv) {
          if (!(this instanceof ModeOfOperationOFB)) {
            throw Error("AES must be instanitated with `new`");
          }
          this.description = "Output Feedback";
          this.name = "ofb";
          if (!iv) {
            iv = createArray(16);
          } else if (iv.length != 16) {
            throw new Error("invalid initialation vector size (must be 16 bytes)");
          }
          this._lastPrecipher = coerceArray(iv, true);
          this._lastPrecipherIndex = 16;
          this._aes = new AES(key2);
        };
        ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
          var encrypted = coerceArray(plaintext, true);
          for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
              this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
              this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
          }
          return encrypted;
        };
        ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;
        var Counter = function(initialValue) {
          if (!(this instanceof Counter)) {
            throw Error("Counter must be instanitated with `new`");
          }
          if (initialValue !== 0 && !initialValue) {
            initialValue = 1;
          }
          if (typeof initialValue === "number") {
            this._counter = createArray(16);
            this.setValue(initialValue);
          } else {
            this.setBytes(initialValue);
          }
        };
        Counter.prototype.setValue = function(value) {
          if (typeof value !== "number" || parseInt(value) != value) {
            throw new Error("invalid counter value (must be an integer)");
          }
          for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = value >> 8;
          }
        };
        Counter.prototype.setBytes = function(bytes) {
          bytes = coerceArray(bytes, true);
          if (bytes.length != 16) {
            throw new Error("invalid counter bytes size (must be 16 bytes)");
          }
          this._counter = bytes;
        };
        Counter.prototype.increment = function() {
          for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
              this._counter[i] = 0;
            } else {
              this._counter[i]++;
              break;
            }
          }
        };
        var ModeOfOperationCTR = function(key2, counter) {
          if (!(this instanceof ModeOfOperationCTR)) {
            throw Error("AES must be instanitated with `new`");
          }
          this.description = "Counter";
          this.name = "ctr";
          if (!(counter instanceof Counter)) {
            counter = new Counter(counter);
          }
          this._counter = counter;
          this._remainingCounter = null;
          this._remainingCounterIndex = 16;
          this._aes = new AES(key2);
        };
        ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
          var encrypted = coerceArray(plaintext, true);
          for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
              this._remainingCounter = this._aes.encrypt(this._counter._counter);
              this._remainingCounterIndex = 0;
              this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
          }
          return encrypted;
        };
        ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;
        function pkcs7pad(data4) {
          data4 = coerceArray(data4, true);
          var padder = 16 - data4.length % 16;
          var result = createArray(data4.length + padder);
          copyArray(data4, result);
          for (var i = data4.length; i < result.length; i++) {
            result[i] = padder;
          }
          return result;
        }
        function pkcs7strip(data4) {
          data4 = coerceArray(data4, true);
          if (data4.length < 16) {
            throw new Error("PKCS#7 invalid length");
          }
          var padder = data4[data4.length - 1];
          if (padder > 16) {
            throw new Error("PKCS#7 padding byte out of range");
          }
          var length = data4.length - padder;
          for (var i = 0; i < padder; i++) {
            if (data4[length + i] !== padder) {
              throw new Error("PKCS#7 invalid padding byte");
            }
          }
          var result = createArray(length);
          copyArray(data4, result, 0, 0, length);
          return result;
        }
        var aesjs = {
          AES,
          Counter,
          ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
          },
          utils: {
            hex: convertHex,
            utf8: convertUtf8
          },
          padding: {
            pkcs7: {
              pad: pkcs7pad,
              strip: pkcs7strip
            }
          },
          _arrayTest: {
            coerceArray,
            createArray,
            copyArray
          }
        };
        if (typeof exports !== "undefined") {
          module.exports = aesjs;
        } else if (typeof define === "function" && define.amd) {
          define(aesjs);
        } else {
          if (root.aesjs) {
            aesjs._aesjs = root.aesjs;
          }
          root.aesjs = aesjs;
        }
      })(exports);
    }
  });

  // node_modules/scrypt-js/scrypt.js
  var require_scrypt = __commonJS({
    "node_modules/scrypt-js/scrypt.js"(exports, module) {
      "use strict";
      (function(root) {
        const MAX_VALUE = 2147483647;
        function SHA256(m) {
          const K = new Uint32Array([
            1116352408,
            1899447441,
            3049323471,
            3921009573,
            961987163,
            1508970993,
            2453635748,
            2870763221,
            3624381080,
            310598401,
            607225278,
            1426881987,
            1925078388,
            2162078206,
            2614888103,
            3248222580,
            3835390401,
            4022224774,
            264347078,
            604807628,
            770255983,
            1249150122,
            1555081692,
            1996064986,
            2554220882,
            2821834349,
            2952996808,
            3210313671,
            3336571891,
            3584528711,
            113926993,
            338241895,
            666307205,
            773529912,
            1294757372,
            1396182291,
            1695183700,
            1986661051,
            2177026350,
            2456956037,
            2730485921,
            2820302411,
            3259730800,
            3345764771,
            3516065817,
            3600352804,
            4094571909,
            275423344,
            430227734,
            506948616,
            659060556,
            883997877,
            958139571,
            1322822218,
            1537002063,
            1747873779,
            1955562222,
            2024104815,
            2227730452,
            2361852424,
            2428436474,
            2756734187,
            3204031479,
            3329325298
          ]);
          let h0 = 1779033703, h1 = 3144134277, h2 = 1013904242, h3 = 2773480762;
          let h4 = 1359893119, h5 = 2600822924, h6 = 528734635, h7 = 1541459225;
          const w = new Uint32Array(64);
          function blocks(p2) {
            let off = 0, len = p2.length;
            while (len >= 64) {
              let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7, u, i2, j, t1, t2;
              for (i2 = 0; i2 < 16; i2++) {
                j = off + i2 * 4;
                w[i2] = (p2[j] & 255) << 24 | (p2[j + 1] & 255) << 16 | (p2[j + 2] & 255) << 8 | p2[j + 3] & 255;
              }
              for (i2 = 16; i2 < 64; i2++) {
                u = w[i2 - 2];
                t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
                u = w[i2 - 15];
                t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
                w[i2] = (t1 + w[i2 - 7] | 0) + (t2 + w[i2 - 16] | 0) | 0;
              }
              for (i2 = 0; i2 < 64; i2++) {
                t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i2] + w[i2] | 0) | 0) | 0;
                t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
                h = g;
                g = f;
                f = e;
                e = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              h0 = h0 + a | 0;
              h1 = h1 + b | 0;
              h2 = h2 + c | 0;
              h3 = h3 + d | 0;
              h4 = h4 + e | 0;
              h5 = h5 + f | 0;
              h6 = h6 + g | 0;
              h7 = h7 + h | 0;
              off += 64;
              len -= 64;
            }
          }
          blocks(m);
          let i, bytesLeft = m.length % 64, bitLenHi = m.length / 536870912 | 0, bitLenLo = m.length << 3, numZeros = bytesLeft < 56 ? 56 : 120, p = m.slice(m.length - bytesLeft, m.length);
          p.push(128);
          for (i = bytesLeft + 1; i < numZeros; i++) {
            p.push(0);
          }
          p.push(bitLenHi >>> 24 & 255);
          p.push(bitLenHi >>> 16 & 255);
          p.push(bitLenHi >>> 8 & 255);
          p.push(bitLenHi >>> 0 & 255);
          p.push(bitLenLo >>> 24 & 255);
          p.push(bitLenLo >>> 16 & 255);
          p.push(bitLenLo >>> 8 & 255);
          p.push(bitLenLo >>> 0 & 255);
          blocks(p);
          return [
            h0 >>> 24 & 255,
            h0 >>> 16 & 255,
            h0 >>> 8 & 255,
            h0 >>> 0 & 255,
            h1 >>> 24 & 255,
            h1 >>> 16 & 255,
            h1 >>> 8 & 255,
            h1 >>> 0 & 255,
            h2 >>> 24 & 255,
            h2 >>> 16 & 255,
            h2 >>> 8 & 255,
            h2 >>> 0 & 255,
            h3 >>> 24 & 255,
            h3 >>> 16 & 255,
            h3 >>> 8 & 255,
            h3 >>> 0 & 255,
            h4 >>> 24 & 255,
            h4 >>> 16 & 255,
            h4 >>> 8 & 255,
            h4 >>> 0 & 255,
            h5 >>> 24 & 255,
            h5 >>> 16 & 255,
            h5 >>> 8 & 255,
            h5 >>> 0 & 255,
            h6 >>> 24 & 255,
            h6 >>> 16 & 255,
            h6 >>> 8 & 255,
            h6 >>> 0 & 255,
            h7 >>> 24 & 255,
            h7 >>> 16 & 255,
            h7 >>> 8 & 255,
            h7 >>> 0 & 255
          ];
        }
        function PBKDF2_HMAC_SHA256_OneIter(password, salt, dkLen) {
          password = password.length <= 64 ? password : SHA256(password);
          const innerLen = 64 + salt.length + 4;
          const inner = new Array(innerLen);
          const outerKey = new Array(64);
          let i;
          let dk = [];
          for (i = 0; i < 64; i++) {
            inner[i] = 54;
          }
          for (i = 0; i < password.length; i++) {
            inner[i] ^= password[i];
          }
          for (i = 0; i < salt.length; i++) {
            inner[64 + i] = salt[i];
          }
          for (i = innerLen - 4; i < innerLen; i++) {
            inner[i] = 0;
          }
          for (i = 0; i < 64; i++)
            outerKey[i] = 92;
          for (i = 0; i < password.length; i++)
            outerKey[i] ^= password[i];
          function incrementCounter() {
            for (let i2 = innerLen - 1; i2 >= innerLen - 4; i2--) {
              inner[i2]++;
              if (inner[i2] <= 255)
                return;
              inner[i2] = 0;
            }
          }
          while (dkLen >= 32) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))));
            dkLen -= 32;
          }
          if (dkLen > 0) {
            incrementCounter();
            dk = dk.concat(SHA256(outerKey.concat(SHA256(inner))).slice(0, dkLen));
          }
          return dk;
        }
        function blockmix_salsa8(BY, Yi, r, x, _X) {
          let i;
          arraycopy(BY, (2 * r - 1) * 16, _X, 0, 16);
          for (i = 0; i < 2 * r; i++) {
            blockxor(BY, i * 16, _X, 16);
            salsa20_8(_X, x);
            arraycopy(_X, 0, BY, Yi + i * 16, 16);
          }
          for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + i * 2 * 16, BY, i * 16, 16);
          }
          for (i = 0; i < r; i++) {
            arraycopy(BY, Yi + (i * 2 + 1) * 16, BY, (i + r) * 16, 16);
          }
        }
        function R(a, b) {
          return a << b | a >>> 32 - b;
        }
        function salsa20_8(B, x) {
          arraycopy(B, 0, x, 0, 16);
          for (let i = 8; i > 0; i -= 2) {
            x[4] ^= R(x[0] + x[12], 7);
            x[8] ^= R(x[4] + x[0], 9);
            x[12] ^= R(x[8] + x[4], 13);
            x[0] ^= R(x[12] + x[8], 18);
            x[9] ^= R(x[5] + x[1], 7);
            x[13] ^= R(x[9] + x[5], 9);
            x[1] ^= R(x[13] + x[9], 13);
            x[5] ^= R(x[1] + x[13], 18);
            x[14] ^= R(x[10] + x[6], 7);
            x[2] ^= R(x[14] + x[10], 9);
            x[6] ^= R(x[2] + x[14], 13);
            x[10] ^= R(x[6] + x[2], 18);
            x[3] ^= R(x[15] + x[11], 7);
            x[7] ^= R(x[3] + x[15], 9);
            x[11] ^= R(x[7] + x[3], 13);
            x[15] ^= R(x[11] + x[7], 18);
            x[1] ^= R(x[0] + x[3], 7);
            x[2] ^= R(x[1] + x[0], 9);
            x[3] ^= R(x[2] + x[1], 13);
            x[0] ^= R(x[3] + x[2], 18);
            x[6] ^= R(x[5] + x[4], 7);
            x[7] ^= R(x[6] + x[5], 9);
            x[4] ^= R(x[7] + x[6], 13);
            x[5] ^= R(x[4] + x[7], 18);
            x[11] ^= R(x[10] + x[9], 7);
            x[8] ^= R(x[11] + x[10], 9);
            x[9] ^= R(x[8] + x[11], 13);
            x[10] ^= R(x[9] + x[8], 18);
            x[12] ^= R(x[15] + x[14], 7);
            x[13] ^= R(x[12] + x[15], 9);
            x[14] ^= R(x[13] + x[12], 13);
            x[15] ^= R(x[14] + x[13], 18);
          }
          for (let i = 0; i < 16; ++i) {
            B[i] += x[i];
          }
        }
        function blockxor(S, Si, D, len) {
          for (let i = 0; i < len; i++) {
            D[i] ^= S[Si + i];
          }
        }
        function arraycopy(src, srcPos, dest, destPos, length) {
          while (length--) {
            dest[destPos++] = src[srcPos++];
          }
        }
        function checkBufferish(o) {
          if (!o || typeof o.length !== "number") {
            return false;
          }
          for (let i = 0; i < o.length; i++) {
            const v = o[i];
            if (typeof v !== "number" || v % 1 || v < 0 || v >= 256) {
              return false;
            }
          }
          return true;
        }
        function ensureInteger(value, name2) {
          if (typeof value !== "number" || value % 1) {
            throw new Error("invalid " + name2);
          }
          return value;
        }
        function _scrypt(password, salt, N2, r, p, dkLen, callback) {
          N2 = ensureInteger(N2, "N");
          r = ensureInteger(r, "r");
          p = ensureInteger(p, "p");
          dkLen = ensureInteger(dkLen, "dkLen");
          if (N2 === 0 || (N2 & N2 - 1) !== 0) {
            throw new Error("N must be power of 2");
          }
          if (N2 > MAX_VALUE / 128 / r) {
            throw new Error("N too large");
          }
          if (r > MAX_VALUE / 128 / p) {
            throw new Error("r too large");
          }
          if (!checkBufferish(password)) {
            throw new Error("password must be an array or buffer");
          }
          password = Array.prototype.slice.call(password);
          if (!checkBufferish(salt)) {
            throw new Error("salt must be an array or buffer");
          }
          salt = Array.prototype.slice.call(salt);
          let b = PBKDF2_HMAC_SHA256_OneIter(password, salt, p * 128 * r);
          const B = new Uint32Array(p * 32 * r);
          for (let i = 0; i < B.length; i++) {
            const j = i * 4;
            B[i] = (b[j + 3] & 255) << 24 | (b[j + 2] & 255) << 16 | (b[j + 1] & 255) << 8 | (b[j + 0] & 255) << 0;
          }
          const XY = new Uint32Array(64 * r);
          const V = new Uint32Array(32 * r * N2);
          const Yi = 32 * r;
          const x = new Uint32Array(16);
          const _X = new Uint32Array(16);
          const totalOps = p * N2 * 2;
          let currentOp = 0;
          let lastPercent10 = null;
          let stop = false;
          let state = 0;
          let i0 = 0, i1;
          let Bi;
          const limit = callback ? parseInt(1e3 / r) : 4294967295;
          const nextTick = typeof setImmediate !== "undefined" ? setImmediate : setTimeout;
          const incrementalSMix = function() {
            if (stop) {
              return callback(new Error("cancelled"), currentOp / totalOps);
            }
            let steps;
            switch (state) {
              case 0:
                Bi = i0 * 32 * r;
                arraycopy(B, Bi, XY, 0, Yi);
                state = 1;
                i1 = 0;
              case 1:
                steps = N2 - i1;
                if (steps > limit) {
                  steps = limit;
                }
                for (let i = 0; i < steps; i++) {
                  arraycopy(XY, 0, V, (i1 + i) * Yi, Yi);
                  blockmix_salsa8(XY, Yi, r, x, _X);
                }
                i1 += steps;
                currentOp += steps;
                if (callback) {
                  const percent10 = parseInt(1e3 * currentOp / totalOps);
                  if (percent10 !== lastPercent10) {
                    stop = callback(null, currentOp / totalOps);
                    if (stop) {
                      break;
                    }
                    lastPercent10 = percent10;
                  }
                }
                if (i1 < N2) {
                  break;
                }
                i1 = 0;
                state = 2;
              case 2:
                steps = N2 - i1;
                if (steps > limit) {
                  steps = limit;
                }
                for (let i = 0; i < steps; i++) {
                  const offset = (2 * r - 1) * 16;
                  const j = XY[offset] & N2 - 1;
                  blockxor(V, j * Yi, XY, Yi);
                  blockmix_salsa8(XY, Yi, r, x, _X);
                }
                i1 += steps;
                currentOp += steps;
                if (callback) {
                  const percent10 = parseInt(1e3 * currentOp / totalOps);
                  if (percent10 !== lastPercent10) {
                    stop = callback(null, currentOp / totalOps);
                    if (stop) {
                      break;
                    }
                    lastPercent10 = percent10;
                  }
                }
                if (i1 < N2) {
                  break;
                }
                arraycopy(XY, 0, B, Bi, Yi);
                i0++;
                if (i0 < p) {
                  state = 0;
                  break;
                }
                b = [];
                for (let i = 0; i < B.length; i++) {
                  b.push(B[i] >> 0 & 255);
                  b.push(B[i] >> 8 & 255);
                  b.push(B[i] >> 16 & 255);
                  b.push(B[i] >> 24 & 255);
                }
                const derivedKey = PBKDF2_HMAC_SHA256_OneIter(password, b, dkLen);
                if (callback) {
                  callback(null, 1, derivedKey);
                }
                return derivedKey;
            }
            if (callback) {
              nextTick(incrementalSMix);
            }
          };
          if (!callback) {
            while (true) {
              const derivedKey = incrementalSMix();
              if (derivedKey != void 0) {
                return derivedKey;
              }
            }
          }
          incrementalSMix();
        }
        const lib = {
          scrypt: function(password, salt, N2, r, p, dkLen, progressCallback) {
            return new Promise(function(resolve, reject) {
              let lastProgress = 0;
              if (progressCallback) {
                progressCallback(0);
              }
              _scrypt(password, salt, N2, r, p, dkLen, function(error, progress, key2) {
                if (error) {
                  reject(error);
                } else if (key2) {
                  if (progressCallback && lastProgress !== 1) {
                    progressCallback(1);
                  }
                  resolve(new Uint8Array(key2));
                } else if (progressCallback && progress !== lastProgress) {
                  lastProgress = progress;
                  return progressCallback(progress);
                }
              });
            });
          },
          syncScrypt: function(password, salt, N2, r, p, dkLen) {
            return new Uint8Array(_scrypt(password, salt, N2, r, p, dkLen));
          }
        };
        if (typeof exports !== "undefined") {
          module.exports = lib;
        } else if (typeof define === "function" && define.amd) {
          define(lib);
        } else if (root) {
          if (root.scrypt) {
            root._scrypt = root.scrypt;
          }
          root.scrypt = lib;
        }
      })(exports);
    }
  });

  // node_modules/bech32/index.js
  var require_bech32 = __commonJS({
    "node_modules/bech32/index.js"(exports, module) {
      "use strict";
      var ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
      var ALPHABET_MAP = {};
      for (var z = 0; z < ALPHABET.length; z++) {
        x = ALPHABET.charAt(z);
        if (ALPHABET_MAP[x] !== void 0)
          throw new TypeError(x + " is ambiguous");
        ALPHABET_MAP[x] = z;
      }
      var x;
      function polymodStep(pre) {
        var b = pre >> 25;
        return (pre & 33554431) << 5 ^ -(b >> 0 & 1) & 996825010 ^ -(b >> 1 & 1) & 642813549 ^ -(b >> 2 & 1) & 513874426 ^ -(b >> 3 & 1) & 1027748829 ^ -(b >> 4 & 1) & 705979059;
      }
      function prefixChk(prefix) {
        var chk = 1;
        for (var i = 0; i < prefix.length; ++i) {
          var c = prefix.charCodeAt(i);
          if (c < 33 || c > 126)
            return "Invalid prefix (" + prefix + ")";
          chk = polymodStep(chk) ^ c >> 5;
        }
        chk = polymodStep(chk);
        for (i = 0; i < prefix.length; ++i) {
          var v = prefix.charCodeAt(i);
          chk = polymodStep(chk) ^ v & 31;
        }
        return chk;
      }
      function encode4(prefix, words6, LIMIT) {
        LIMIT = LIMIT || 90;
        if (prefix.length + 7 + words6.length > LIMIT)
          throw new TypeError("Exceeds length limit");
        prefix = prefix.toLowerCase();
        var chk = prefixChk(prefix);
        if (typeof chk === "string")
          throw new Error(chk);
        var result = prefix + "1";
        for (var i = 0; i < words6.length; ++i) {
          var x2 = words6[i];
          if (x2 >> 5 !== 0)
            throw new Error("Non 5-bit word");
          chk = polymodStep(chk) ^ x2;
          result += ALPHABET.charAt(x2);
        }
        for (i = 0; i < 6; ++i) {
          chk = polymodStep(chk);
        }
        chk ^= 1;
        for (i = 0; i < 6; ++i) {
          var v = chk >> (5 - i) * 5 & 31;
          result += ALPHABET.charAt(v);
        }
        return result;
      }
      function __decode(str, LIMIT) {
        LIMIT = LIMIT || 90;
        if (str.length < 8)
          return str + " too short";
        if (str.length > LIMIT)
          return "Exceeds length limit";
        var lowered = str.toLowerCase();
        var uppered = str.toUpperCase();
        if (str !== lowered && str !== uppered)
          return "Mixed-case string " + str;
        str = lowered;
        var split = str.lastIndexOf("1");
        if (split === -1)
          return "No separator character for " + str;
        if (split === 0)
          return "Missing prefix for " + str;
        var prefix = str.slice(0, split);
        var wordChars = str.slice(split + 1);
        if (wordChars.length < 6)
          return "Data too short";
        var chk = prefixChk(prefix);
        if (typeof chk === "string")
          return chk;
        var words6 = [];
        for (var i = 0; i < wordChars.length; ++i) {
          var c = wordChars.charAt(i);
          var v = ALPHABET_MAP[c];
          if (v === void 0)
            return "Unknown character " + c;
          chk = polymodStep(chk) ^ v;
          if (i + 6 >= wordChars.length)
            continue;
          words6.push(v);
        }
        if (chk !== 1)
          return "Invalid checksum for " + str;
        return { prefix, words: words6 };
      }
      function decodeUnsafe() {
        var res = __decode.apply(null, arguments);
        if (typeof res === "object")
          return res;
      }
      function decode3(str) {
        var res = __decode.apply(null, arguments);
        if (typeof res === "object")
          return res;
        throw new Error(res);
      }
      function convert(data4, inBits, outBits, pad) {
        var value = 0;
        var bits = 0;
        var maxV = (1 << outBits) - 1;
        var result = [];
        for (var i = 0; i < data4.length; ++i) {
          value = value << inBits | data4[i];
          bits += inBits;
          while (bits >= outBits) {
            bits -= outBits;
            result.push(value >> bits & maxV);
          }
        }
        if (pad) {
          if (bits > 0) {
            result.push(value << outBits - bits & maxV);
          }
        } else {
          if (bits >= inBits)
            return "Excess padding";
          if (value << outBits - bits & maxV)
            return "Non-zero padding";
        }
        return result;
      }
      function toWordsUnsafe(bytes) {
        var res = convert(bytes, 8, 5, true);
        if (Array.isArray(res))
          return res;
      }
      function toWords(bytes) {
        var res = convert(bytes, 8, 5, true);
        if (Array.isArray(res))
          return res;
        throw new Error(res);
      }
      function fromWordsUnsafe(words6) {
        var res = convert(words6, 5, 8, false);
        if (Array.isArray(res))
          return res;
      }
      function fromWords(words6) {
        var res = convert(words6, 5, 8, false);
        if (Array.isArray(res))
          return res;
        throw new Error(res);
      }
      module.exports = {
        decodeUnsafe,
        decode: decode3,
        encode: encode4,
        toWordsUnsafe,
        toWords,
        fromWordsUnsafe,
        fromWords
      };
    }
  });

  // index.js
  var import_buffer = __toModule(require_buffer());
  var import_js_sha32 = __toModule(require_sha3());

  // node_modules/ethers/lib.esm/ethers.js
  var ethers_exports = {};
  __export(ethers_exports, {
    BaseContract: () => BaseContract,
    BigNumber: () => BigNumber,
    Contract: () => Contract,
    ContractFactory: () => ContractFactory,
    FixedNumber: () => FixedNumber,
    Signer: () => Signer,
    VoidSigner: () => VoidSigner,
    Wallet: () => Wallet,
    Wordlist: () => Wordlist,
    constants: () => lib_exports2,
    errors: () => ErrorCode,
    getDefaultProvider: () => getDefaultProvider,
    logger: () => logger44,
    providers: () => lib_exports4,
    utils: () => utils_exports,
    version: () => version25,
    wordlists: () => wordlists
  });

  // node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
  var import_bn = __toModule(require_bn());

  // node_modules/@ethersproject/logger/lib.esm/_version.js
  var version = "logger/5.2.0";

  // node_modules/@ethersproject/logger/lib.esm/index.js
  "use strict";
  var _permanentCensorErrors = false;
  var _censorErrors = false;
  var LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
  var _logLevel = LogLevels["default"];
  var _globalLogger = null;
  function _checkNormalize() {
    try {
      const missing = [];
      ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
        try {
          if ("test".normalize(form) !== "test") {
            throw new Error("bad normalize");
          }
          ;
        } catch (error) {
          missing.push(form);
        }
      });
      if (missing.length) {
        throw new Error("missing " + missing.join(", "));
      }
      if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) {
        throw new Error("broken implementation");
      }
    } catch (error) {
      return error.message;
    }
    return null;
  }
  var _normalizeError = _checkNormalize();
  var LogLevel;
  (function(LogLevel2) {
    LogLevel2["DEBUG"] = "DEBUG";
    LogLevel2["INFO"] = "INFO";
    LogLevel2["WARNING"] = "WARNING";
    LogLevel2["ERROR"] = "ERROR";
    LogLevel2["OFF"] = "OFF";
  })(LogLevel || (LogLevel = {}));
  var ErrorCode;
  (function(ErrorCode2) {
    ErrorCode2["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    ErrorCode2["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
    ErrorCode2["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
    ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
    ErrorCode2["SERVER_ERROR"] = "SERVER_ERROR";
    ErrorCode2["TIMEOUT"] = "TIMEOUT";
    ErrorCode2["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
    ErrorCode2["NUMERIC_FAULT"] = "NUMERIC_FAULT";
    ErrorCode2["MISSING_NEW"] = "MISSING_NEW";
    ErrorCode2["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
    ErrorCode2["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
    ErrorCode2["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
    ErrorCode2["CALL_EXCEPTION"] = "CALL_EXCEPTION";
    ErrorCode2["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
    ErrorCode2["NONCE_EXPIRED"] = "NONCE_EXPIRED";
    ErrorCode2["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
    ErrorCode2["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
    ErrorCode2["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
  })(ErrorCode || (ErrorCode = {}));
  var Logger = class {
    constructor(version26) {
      Object.defineProperty(this, "version", {
        enumerable: true,
        value: version26,
        writable: false
      });
    }
    _log(logLevel, args) {
      const level = logLevel.toLowerCase();
      if (LogLevels[level] == null) {
        this.throwArgumentError("invalid log level name", "logLevel", logLevel);
      }
      if (_logLevel > LogLevels[level]) {
        return;
      }
      console.log.apply(console, args);
    }
    debug(...args) {
      this._log(Logger.levels.DEBUG, args);
    }
    info(...args) {
      this._log(Logger.levels.INFO, args);
    }
    warn(...args) {
      this._log(Logger.levels.WARNING, args);
    }
    makeError(message, code, params) {
      if (_censorErrors) {
        return this.makeError("censored error", code, {});
      }
      if (!code) {
        code = Logger.errors.UNKNOWN_ERROR;
      }
      if (!params) {
        params = {};
      }
      const messageDetails = [];
      Object.keys(params).forEach((key2) => {
        try {
          messageDetails.push(key2 + "=" + JSON.stringify(params[key2]));
        } catch (error2) {
          messageDetails.push(key2 + "=" + JSON.stringify(params[key2].toString()));
        }
      });
      messageDetails.push(`code=${code}`);
      messageDetails.push(`version=${this.version}`);
      const reason = message;
      if (messageDetails.length) {
        message += " (" + messageDetails.join(", ") + ")";
      }
      const error = new Error(message);
      error.reason = reason;
      error.code = code;
      Object.keys(params).forEach(function(key2) {
        error[key2] = params[key2];
      });
      return error;
    }
    throwError(message, code, params) {
      throw this.makeError(message, code, params);
    }
    throwArgumentError(message, name2, value) {
      return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
        argument: name2,
        value
      });
    }
    assert(condition, message, code, params) {
      if (!!condition) {
        return;
      }
      this.throwError(message, code, params);
    }
    assertArgument(condition, message, name2, value) {
      if (!!condition) {
        return;
      }
      this.throwArgumentError(message, name2, value);
    }
    checkNormalize(message) {
      if (message == null) {
        message = "platform missing String.prototype.normalize";
      }
      if (_normalizeError) {
        this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "String.prototype.normalize",
          form: _normalizeError
        });
      }
    }
    checkSafeUint53(value, message) {
      if (typeof value !== "number") {
        return;
      }
      if (message == null) {
        message = "value not safe";
      }
      if (value < 0 || value >= 9007199254740991) {
        this.throwError(message, Logger.errors.NUMERIC_FAULT, {
          operation: "checkSafeInteger",
          fault: "out-of-safe-range",
          value
        });
      }
      if (value % 1) {
        this.throwError(message, Logger.errors.NUMERIC_FAULT, {
          operation: "checkSafeInteger",
          fault: "non-integer",
          value
        });
      }
    }
    checkArgumentCount(count, expectedCount, message) {
      if (message) {
        message = ": " + message;
      } else {
        message = "";
      }
      if (count < expectedCount) {
        this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
          count,
          expectedCount
        });
      }
      if (count > expectedCount) {
        this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
          count,
          expectedCount
        });
      }
    }
    checkNew(target, kind) {
      if (target === Object || target == null) {
        this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
      }
    }
    checkAbstract(target, kind) {
      if (target === kind) {
        this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
      } else if (target === Object || target == null) {
        this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
      }
    }
    static globalLogger() {
      if (!_globalLogger) {
        _globalLogger = new Logger(version);
      }
      return _globalLogger;
    }
    static setCensorship(censorship, permanent) {
      if (!censorship && permanent) {
        this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "setCensorship"
        });
      }
      if (_permanentCensorErrors) {
        if (!censorship) {
          return;
        }
        this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "setCensorship"
        });
      }
      _censorErrors = !!censorship;
      _permanentCensorErrors = !!permanent;
    }
    static setLogLevel(logLevel) {
      const level = LogLevels[logLevel.toLowerCase()];
      if (level == null) {
        Logger.globalLogger().warn("invalid log level - " + logLevel);
        return;
      }
      _logLevel = level;
    }
    static from(version26) {
      return new Logger(version26);
    }
  };
  Logger.errors = ErrorCode;
  Logger.levels = LogLevel;

  // node_modules/@ethersproject/bytes/lib.esm/_version.js
  var version2 = "bytes/5.2.0";

  // node_modules/@ethersproject/bytes/lib.esm/index.js
  "use strict";
  var logger = new Logger(version2);
  function isHexable(value) {
    return !!value.toHexString;
  }
  function addSlice(array) {
    if (array.slice) {
      return array;
    }
    array.slice = function() {
      const args = Array.prototype.slice.call(arguments);
      return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
    };
    return array;
  }
  function isBytesLike(value) {
    return isHexString(value) && !(value.length % 2) || isBytes(value);
  }
  function isBytes(value) {
    if (value == null) {
      return false;
    }
    if (value.constructor === Uint8Array) {
      return true;
    }
    if (typeof value === "string") {
      return false;
    }
    if (value.length == null) {
      return false;
    }
    for (let i = 0; i < value.length; i++) {
      const v = value[i];
      if (typeof v !== "number" || v < 0 || v >= 256 || v % 1) {
        return false;
      }
    }
    return true;
  }
  function arrayify(value, options) {
    if (!options) {
      options = {};
    }
    if (typeof value === "number") {
      logger.checkSafeUint53(value, "invalid arrayify value");
      const result = [];
      while (value) {
        result.unshift(value & 255);
        value = parseInt(String(value / 256));
      }
      if (result.length === 0) {
        result.push(0);
      }
      return addSlice(new Uint8Array(result));
    }
    if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
      value = "0x" + value;
    }
    if (isHexable(value)) {
      value = value.toHexString();
    }
    if (isHexString(value)) {
      let hex2 = value.substring(2);
      if (hex2.length % 2) {
        if (options.hexPad === "left") {
          hex2 = "0x0" + hex2.substring(2);
        } else if (options.hexPad === "right") {
          hex2 += "0";
        } else {
          logger.throwArgumentError("hex data is odd-length", "value", value);
        }
      }
      const result = [];
      for (let i = 0; i < hex2.length; i += 2) {
        result.push(parseInt(hex2.substring(i, i + 2), 16));
      }
      return addSlice(new Uint8Array(result));
    }
    if (isBytes(value)) {
      return addSlice(new Uint8Array(value));
    }
    return logger.throwArgumentError("invalid arrayify value", "value", value);
  }
  function concat(items) {
    const objects = items.map((item) => arrayify(item));
    const length = objects.reduce((accum, item) => accum + item.length, 0);
    const result = new Uint8Array(length);
    objects.reduce((offset, object) => {
      result.set(object, offset);
      return offset + object.length;
    }, 0);
    return addSlice(result);
  }
  function stripZeros(value) {
    let result = arrayify(value);
    if (result.length === 0) {
      return result;
    }
    let start2 = 0;
    while (start2 < result.length && result[start2] === 0) {
      start2++;
    }
    if (start2) {
      result = result.slice(start2);
    }
    return result;
  }
  function zeroPad(value, length) {
    value = arrayify(value);
    if (value.length > length) {
      logger.throwArgumentError("value out of range", "value", arguments[0]);
    }
    const result = new Uint8Array(length);
    result.set(value, length - value.length);
    return addSlice(result);
  }
  function isHexString(value, length) {
    if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
      return false;
    }
    if (length && value.length !== 2 + 2 * length) {
      return false;
    }
    return true;
  }
  var HexCharacters = "0123456789abcdef";
  function hexlify(value, options) {
    if (!options) {
      options = {};
    }
    if (typeof value === "number") {
      logger.checkSafeUint53(value, "invalid hexlify value");
      let hex2 = "";
      while (value) {
        hex2 = HexCharacters[value & 15] + hex2;
        value = Math.floor(value / 16);
      }
      if (hex2.length) {
        if (hex2.length % 2) {
          hex2 = "0" + hex2;
        }
        return "0x" + hex2;
      }
      return "0x00";
    }
    if (typeof value === "bigint") {
      value = value.toString(16);
      if (value.length % 2) {
        return "0x0" + value;
      }
      return "0x" + value;
    }
    if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
      value = "0x" + value;
    }
    if (isHexable(value)) {
      return value.toHexString();
    }
    if (isHexString(value)) {
      if (value.length % 2) {
        if (options.hexPad === "left") {
          value = "0x0" + value.substring(2);
        } else if (options.hexPad === "right") {
          value += "0";
        } else {
          logger.throwArgumentError("hex data is odd-length", "value", value);
        }
      }
      return value.toLowerCase();
    }
    if (isBytes(value)) {
      let result = "0x";
      for (let i = 0; i < value.length; i++) {
        let v = value[i];
        result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15];
      }
      return result;
    }
    return logger.throwArgumentError("invalid hexlify value", "value", value);
  }
  function hexDataLength(data4) {
    if (typeof data4 !== "string") {
      data4 = hexlify(data4);
    } else if (!isHexString(data4) || data4.length % 2) {
      return null;
    }
    return (data4.length - 2) / 2;
  }
  function hexDataSlice(data4, offset, endOffset) {
    if (typeof data4 !== "string") {
      data4 = hexlify(data4);
    } else if (!isHexString(data4) || data4.length % 2) {
      logger.throwArgumentError("invalid hexData", "value", data4);
    }
    offset = 2 + 2 * offset;
    if (endOffset != null) {
      return "0x" + data4.substring(offset, 2 + 2 * endOffset);
    }
    return "0x" + data4.substring(offset);
  }
  function hexConcat(items) {
    let result = "0x";
    items.forEach((item) => {
      result += hexlify(item).substring(2);
    });
    return result;
  }
  function hexValue(value) {
    const trimmed = hexStripZeros(hexlify(value, { hexPad: "left" }));
    if (trimmed === "0x") {
      return "0x0";
    }
    return trimmed;
  }
  function hexStripZeros(value) {
    if (typeof value !== "string") {
      value = hexlify(value);
    }
    if (!isHexString(value)) {
      logger.throwArgumentError("invalid hex string", "value", value);
    }
    value = value.substring(2);
    let offset = 0;
    while (offset < value.length && value[offset] === "0") {
      offset++;
    }
    return "0x" + value.substring(offset);
  }
  function hexZeroPad(value, length) {
    if (typeof value !== "string") {
      value = hexlify(value);
    } else if (!isHexString(value)) {
      logger.throwArgumentError("invalid hex string", "value", value);
    }
    if (value.length > 2 * length + 2) {
      logger.throwArgumentError("value out of range", "value", arguments[1]);
    }
    while (value.length < 2 * length + 2) {
      value = "0x0" + value.substring(2);
    }
    return value;
  }
  function splitSignature(signature2) {
    const result = {
      r: "0x",
      s: "0x",
      _vs: "0x",
      recoveryParam: 0,
      v: 0
    };
    if (isBytesLike(signature2)) {
      const bytes = arrayify(signature2);
      if (bytes.length !== 65) {
        logger.throwArgumentError("invalid signature string; must be 65 bytes", "signature", signature2);
      }
      result.r = hexlify(bytes.slice(0, 32));
      result.s = hexlify(bytes.slice(32, 64));
      result.v = bytes[64];
      if (result.v < 27) {
        if (result.v === 0 || result.v === 1) {
          result.v += 27;
        } else {
          logger.throwArgumentError("signature invalid v byte", "signature", signature2);
        }
      }
      result.recoveryParam = 1 - result.v % 2;
      if (result.recoveryParam) {
        bytes[32] |= 128;
      }
      result._vs = hexlify(bytes.slice(32, 64));
    } else {
      result.r = signature2.r;
      result.s = signature2.s;
      result.v = signature2.v;
      result.recoveryParam = signature2.recoveryParam;
      result._vs = signature2._vs;
      if (result._vs != null) {
        const vs2 = zeroPad(arrayify(result._vs), 32);
        result._vs = hexlify(vs2);
        const recoveryParam = vs2[0] >= 128 ? 1 : 0;
        if (result.recoveryParam == null) {
          result.recoveryParam = recoveryParam;
        } else if (result.recoveryParam !== recoveryParam) {
          logger.throwArgumentError("signature recoveryParam mismatch _vs", "signature", signature2);
        }
        vs2[0] &= 127;
        const s = hexlify(vs2);
        if (result.s == null) {
          result.s = s;
        } else if (result.s !== s) {
          logger.throwArgumentError("signature v mismatch _vs", "signature", signature2);
        }
      }
      if (result.recoveryParam == null) {
        if (result.v == null) {
          logger.throwArgumentError("signature missing v and recoveryParam", "signature", signature2);
        } else if (result.v === 0 || result.v === 1) {
          result.recoveryParam = result.v;
        } else {
          result.recoveryParam = 1 - result.v % 2;
        }
      } else {
        if (result.v == null) {
          result.v = 27 + result.recoveryParam;
        } else if (result.recoveryParam !== 1 - result.v % 2) {
          logger.throwArgumentError("signature recoveryParam mismatch v", "signature", signature2);
        }
      }
      if (result.r == null || !isHexString(result.r)) {
        logger.throwArgumentError("signature missing or invalid r", "signature", signature2);
      } else {
        result.r = hexZeroPad(result.r, 32);
      }
      if (result.s == null || !isHexString(result.s)) {
        logger.throwArgumentError("signature missing or invalid s", "signature", signature2);
      } else {
        result.s = hexZeroPad(result.s, 32);
      }
      const vs = arrayify(result.s);
      if (vs[0] >= 128) {
        logger.throwArgumentError("signature s out of range", "signature", signature2);
      }
      if (result.recoveryParam) {
        vs[0] |= 128;
      }
      const _vs = hexlify(vs);
      if (result._vs) {
        if (!isHexString(result._vs)) {
          logger.throwArgumentError("signature invalid _vs", "signature", signature2);
        }
        result._vs = hexZeroPad(result._vs, 32);
      }
      if (result._vs == null) {
        result._vs = _vs;
      } else if (result._vs !== _vs) {
        logger.throwArgumentError("signature _vs mismatch v and s", "signature", signature2);
      }
    }
    return result;
  }
  function joinSignature(signature2) {
    signature2 = splitSignature(signature2);
    return hexlify(concat([
      signature2.r,
      signature2.s,
      signature2.recoveryParam ? "0x1c" : "0x1b"
    ]));
  }

  // node_modules/@ethersproject/bignumber/lib.esm/_version.js
  var version3 = "bignumber/5.2.0";

  // node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
  "use strict";
  var BN = import_bn.default.BN;
  var logger2 = new Logger(version3);
  var _constructorGuard = {};
  var MAX_SAFE = 9007199254740991;
  function isBigNumberish(value) {
    return value != null && (BigNumber.isBigNumber(value) || typeof value === "number" && value % 1 === 0 || typeof value === "string" && !!value.match(/^-?[0-9]+$/) || isHexString(value) || typeof value === "bigint" || isBytes(value));
  }
  var _warnedToStringRadix = false;
  var BigNumber = class {
    constructor(constructorGuard, hex2) {
      logger2.checkNew(new.target, BigNumber);
      if (constructorGuard !== _constructorGuard) {
        logger2.throwError("cannot call constructor directly; use BigNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "new (BigNumber)"
        });
      }
      this._hex = hex2;
      this._isBigNumber = true;
      Object.freeze(this);
    }
    fromTwos(value) {
      return toBigNumber(toBN(this).fromTwos(value));
    }
    toTwos(value) {
      return toBigNumber(toBN(this).toTwos(value));
    }
    abs() {
      if (this._hex[0] === "-") {
        return BigNumber.from(this._hex.substring(1));
      }
      return this;
    }
    add(other) {
      return toBigNumber(toBN(this).add(toBN(other)));
    }
    sub(other) {
      return toBigNumber(toBN(this).sub(toBN(other)));
    }
    div(other) {
      const o = BigNumber.from(other);
      if (o.isZero()) {
        throwFault("division by zero", "div");
      }
      return toBigNumber(toBN(this).div(toBN(other)));
    }
    mul(other) {
      return toBigNumber(toBN(this).mul(toBN(other)));
    }
    mod(other) {
      const value = toBN(other);
      if (value.isNeg()) {
        throwFault("cannot modulo negative values", "mod");
      }
      return toBigNumber(toBN(this).umod(value));
    }
    pow(other) {
      const value = toBN(other);
      if (value.isNeg()) {
        throwFault("cannot raise to negative values", "pow");
      }
      return toBigNumber(toBN(this).pow(value));
    }
    and(other) {
      const value = toBN(other);
      if (this.isNegative() || value.isNeg()) {
        throwFault("cannot 'and' negative values", "and");
      }
      return toBigNumber(toBN(this).and(value));
    }
    or(other) {
      const value = toBN(other);
      if (this.isNegative() || value.isNeg()) {
        throwFault("cannot 'or' negative values", "or");
      }
      return toBigNumber(toBN(this).or(value));
    }
    xor(other) {
      const value = toBN(other);
      if (this.isNegative() || value.isNeg()) {
        throwFault("cannot 'xor' negative values", "xor");
      }
      return toBigNumber(toBN(this).xor(value));
    }
    mask(value) {
      if (this.isNegative() || value < 0) {
        throwFault("cannot mask negative values", "mask");
      }
      return toBigNumber(toBN(this).maskn(value));
    }
    shl(value) {
      if (this.isNegative() || value < 0) {
        throwFault("cannot shift negative values", "shl");
      }
      return toBigNumber(toBN(this).shln(value));
    }
    shr(value) {
      if (this.isNegative() || value < 0) {
        throwFault("cannot shift negative values", "shr");
      }
      return toBigNumber(toBN(this).shrn(value));
    }
    eq(other) {
      return toBN(this).eq(toBN(other));
    }
    lt(other) {
      return toBN(this).lt(toBN(other));
    }
    lte(other) {
      return toBN(this).lte(toBN(other));
    }
    gt(other) {
      return toBN(this).gt(toBN(other));
    }
    gte(other) {
      return toBN(this).gte(toBN(other));
    }
    isNegative() {
      return this._hex[0] === "-";
    }
    isZero() {
      return toBN(this).isZero();
    }
    toNumber() {
      try {
        return toBN(this).toNumber();
      } catch (error) {
        throwFault("overflow", "toNumber", this.toString());
      }
      return null;
    }
    toBigInt() {
      try {
        return BigInt(this.toString());
      } catch (e) {
      }
      return logger2.throwError("this platform does not support BigInt", Logger.errors.UNSUPPORTED_OPERATION, {
        value: this.toString()
      });
    }
    toString() {
      if (arguments.length > 0) {
        if (arguments[0] === 10) {
          if (!_warnedToStringRadix) {
            _warnedToStringRadix = true;
            logger2.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
          }
        } else if (arguments[0] === 16) {
          logger2.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", Logger.errors.UNEXPECTED_ARGUMENT, {});
        } else {
          logger2.throwError("BigNumber.toString does not accept parameters", Logger.errors.UNEXPECTED_ARGUMENT, {});
        }
      }
      return toBN(this).toString(10);
    }
    toHexString() {
      return this._hex;
    }
    toJSON(key2) {
      return { type: "BigNumber", hex: this.toHexString() };
    }
    static from(value) {
      if (value instanceof BigNumber) {
        return value;
      }
      if (typeof value === "string") {
        if (value.match(/^-?0x[0-9a-f]+$/i)) {
          return new BigNumber(_constructorGuard, toHex(value));
        }
        if (value.match(/^-?[0-9]+$/)) {
          return new BigNumber(_constructorGuard, toHex(new BN(value)));
        }
        return logger2.throwArgumentError("invalid BigNumber string", "value", value);
      }
      if (typeof value === "number") {
        if (value % 1) {
          throwFault("underflow", "BigNumber.from", value);
        }
        if (value >= MAX_SAFE || value <= -MAX_SAFE) {
          throwFault("overflow", "BigNumber.from", value);
        }
        return BigNumber.from(String(value));
      }
      const anyValue = value;
      if (typeof anyValue === "bigint") {
        return BigNumber.from(anyValue.toString());
      }
      if (isBytes(anyValue)) {
        return BigNumber.from(hexlify(anyValue));
      }
      if (anyValue) {
        if (anyValue.toHexString) {
          const hex2 = anyValue.toHexString();
          if (typeof hex2 === "string") {
            return BigNumber.from(hex2);
          }
        } else {
          let hex2 = anyValue._hex;
          if (hex2 == null && anyValue.type === "BigNumber") {
            hex2 = anyValue.hex;
          }
          if (typeof hex2 === "string") {
            if (isHexString(hex2) || hex2[0] === "-" && isHexString(hex2.substring(1))) {
              return BigNumber.from(hex2);
            }
          }
        }
      }
      return logger2.throwArgumentError("invalid BigNumber value", "value", value);
    }
    static isBigNumber(value) {
      return !!(value && value._isBigNumber);
    }
  };
  function toHex(value) {
    if (typeof value !== "string") {
      return toHex(value.toString(16));
    }
    if (value[0] === "-") {
      value = value.substring(1);
      if (value[0] === "-") {
        logger2.throwArgumentError("invalid hex", "value", value);
      }
      value = toHex(value);
      if (value === "0x00") {
        return value;
      }
      return "-" + value;
    }
    if (value.substring(0, 2) !== "0x") {
      value = "0x" + value;
    }
    if (value === "0x") {
      return "0x00";
    }
    if (value.length % 2) {
      value = "0x0" + value.substring(2);
    }
    while (value.length > 4 && value.substring(0, 4) === "0x00") {
      value = "0x" + value.substring(4);
    }
    return value;
  }
  function toBigNumber(value) {
    return BigNumber.from(toHex(value));
  }
  function toBN(value) {
    const hex2 = BigNumber.from(value).toHexString();
    if (hex2[0] === "-") {
      return new BN("-" + hex2.substring(3), 16);
    }
    return new BN(hex2.substring(2), 16);
  }
  function throwFault(fault, operation, value) {
    const params = { fault, operation };
    if (value != null) {
      params.value = value;
    }
    return logger2.throwError(fault, Logger.errors.NUMERIC_FAULT, params);
  }
  function _base36To16(value) {
    return new BN(value, 36).toString(16);
  }
  function _base16To36(value) {
    return new BN(value, 16).toString(36);
  }

  // node_modules/@ethersproject/bignumber/lib.esm/fixednumber.js
  "use strict";
  var logger3 = new Logger(version3);
  var _constructorGuard2 = {};
  var Zero = BigNumber.from(0);
  var NegativeOne = BigNumber.from(-1);
  function throwFault2(message, fault, operation, value) {
    const params = { fault, operation };
    if (value !== void 0) {
      params.value = value;
    }
    return logger3.throwError(message, Logger.errors.NUMERIC_FAULT, params);
  }
  var zeros = "0";
  while (zeros.length < 256) {
    zeros += zeros;
  }
  function getMultiplier(decimals) {
    if (typeof decimals !== "number") {
      try {
        decimals = BigNumber.from(decimals).toNumber();
      } catch (e) {
      }
    }
    if (typeof decimals === "number" && decimals >= 0 && decimals <= 256 && !(decimals % 1)) {
      return "1" + zeros.substring(0, decimals);
    }
    return logger3.throwArgumentError("invalid decimal size", "decimals", decimals);
  }
  function formatFixed(value, decimals) {
    if (decimals == null) {
      decimals = 0;
    }
    const multiplier = getMultiplier(decimals);
    value = BigNumber.from(value);
    const negative = value.lt(Zero);
    if (negative) {
      value = value.mul(NegativeOne);
    }
    let fraction = value.mod(multiplier).toString();
    while (fraction.length < multiplier.length - 1) {
      fraction = "0" + fraction;
    }
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
    const whole = value.div(multiplier).toString();
    if (multiplier.length === 1) {
      value = whole;
    } else {
      value = whole + "." + fraction;
    }
    if (negative) {
      value = "-" + value;
    }
    return value;
  }
  function parseFixed(value, decimals) {
    if (decimals == null) {
      decimals = 0;
    }
    const multiplier = getMultiplier(decimals);
    if (typeof value !== "string" || !value.match(/^-?[0-9.,]+$/)) {
      logger3.throwArgumentError("invalid decimal value", "value", value);
    }
    const negative = value.substring(0, 1) === "-";
    if (negative) {
      value = value.substring(1);
    }
    if (value === ".") {
      logger3.throwArgumentError("missing value", "value", value);
    }
    const comps = value.split(".");
    if (comps.length > 2) {
      logger3.throwArgumentError("too many decimal points", "value", value);
    }
    let whole = comps[0], fraction = comps[1];
    if (!whole) {
      whole = "0";
    }
    if (!fraction) {
      fraction = "0";
    }
    {
      const sigFraction = fraction.replace(/^([0-9]*?)(0*)$/, (all, sig, zeros2) => sig);
      if (sigFraction.length > multiplier.length - 1) {
        throwFault2("fractional component exceeds decimals", "underflow", "parseFixed");
      }
    }
    while (fraction.length < multiplier.length - 1) {
      fraction += "0";
    }
    const wholeValue = BigNumber.from(whole);
    const fractionValue = BigNumber.from(fraction);
    let wei = wholeValue.mul(multiplier).add(fractionValue);
    if (negative) {
      wei = wei.mul(NegativeOne);
    }
    return wei;
  }
  var FixedFormat = class {
    constructor(constructorGuard, signed, width, decimals) {
      if (constructorGuard !== _constructorGuard2) {
        logger3.throwError("cannot use FixedFormat constructor; use FixedFormat.from", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "new FixedFormat"
        });
      }
      this.signed = signed;
      this.width = width;
      this.decimals = decimals;
      this.name = (signed ? "" : "u") + "fixed" + String(width) + "x" + String(decimals);
      this._multiplier = getMultiplier(decimals);
      Object.freeze(this);
    }
    static from(value) {
      if (value instanceof FixedFormat) {
        return value;
      }
      if (typeof value === "number") {
        value = `fixed128x${value}`;
      }
      let signed = true;
      let width = 128;
      let decimals = 18;
      if (typeof value === "string") {
        if (value === "fixed") {
        } else if (value === "ufixed") {
          signed = false;
        } else {
          const match = value.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
          if (!match) {
            logger3.throwArgumentError("invalid fixed format", "format", value);
          }
          signed = match[1] !== "u";
          width = parseInt(match[2]);
          decimals = parseInt(match[3]);
        }
      } else if (value) {
        const check = (key2, type, defaultValue) => {
          if (value[key2] == null) {
            return defaultValue;
          }
          if (typeof value[key2] !== type) {
            logger3.throwArgumentError("invalid fixed format (" + key2 + " not " + type + ")", "format." + key2, value[key2]);
          }
          return value[key2];
        };
        signed = check("signed", "boolean", signed);
        width = check("width", "number", width);
        decimals = check("decimals", "number", decimals);
      }
      if (width % 8) {
        logger3.throwArgumentError("invalid fixed format width (not byte aligned)", "format.width", width);
      }
      if (decimals > 80) {
        logger3.throwArgumentError("invalid fixed format (decimals too large)", "format.decimals", decimals);
      }
      return new FixedFormat(_constructorGuard2, signed, width, decimals);
    }
  };
  var FixedNumber = class {
    constructor(constructorGuard, hex2, value, format) {
      logger3.checkNew(new.target, FixedNumber);
      if (constructorGuard !== _constructorGuard2) {
        logger3.throwError("cannot use FixedNumber constructor; use FixedNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "new FixedFormat"
        });
      }
      this.format = format;
      this._hex = hex2;
      this._value = value;
      this._isFixedNumber = true;
      Object.freeze(this);
    }
    _checkFormat(other) {
      if (this.format.name !== other.format.name) {
        logger3.throwArgumentError("incompatible format; use fixedNumber.toFormat", "other", other);
      }
    }
    addUnsafe(other) {
      this._checkFormat(other);
      const a = parseFixed(this._value, this.format.decimals);
      const b = parseFixed(other._value, other.format.decimals);
      return FixedNumber.fromValue(a.add(b), this.format.decimals, this.format);
    }
    subUnsafe(other) {
      this._checkFormat(other);
      const a = parseFixed(this._value, this.format.decimals);
      const b = parseFixed(other._value, other.format.decimals);
      return FixedNumber.fromValue(a.sub(b), this.format.decimals, this.format);
    }
    mulUnsafe(other) {
      this._checkFormat(other);
      const a = parseFixed(this._value, this.format.decimals);
      const b = parseFixed(other._value, other.format.decimals);
      return FixedNumber.fromValue(a.mul(b).div(this.format._multiplier), this.format.decimals, this.format);
    }
    divUnsafe(other) {
      this._checkFormat(other);
      const a = parseFixed(this._value, this.format.decimals);
      const b = parseFixed(other._value, other.format.decimals);
      return FixedNumber.fromValue(a.mul(this.format._multiplier).div(b), this.format.decimals, this.format);
    }
    floor() {
      const comps = this.toString().split(".");
      if (comps.length === 1) {
        comps.push("0");
      }
      let result = FixedNumber.from(comps[0], this.format);
      const hasFraction = !comps[1].match(/^(0*)$/);
      if (this.isNegative() && hasFraction) {
        result = result.subUnsafe(ONE);
      }
      return result;
    }
    ceiling() {
      const comps = this.toString().split(".");
      if (comps.length === 1) {
        comps.push("0");
      }
      let result = FixedNumber.from(comps[0], this.format);
      const hasFraction = !comps[1].match(/^(0*)$/);
      if (!this.isNegative() && hasFraction) {
        result = result.addUnsafe(ONE);
      }
      return result;
    }
    round(decimals) {
      if (decimals == null) {
        decimals = 0;
      }
      const comps = this.toString().split(".");
      if (comps.length === 1) {
        comps.push("0");
      }
      if (decimals < 0 || decimals > 80 || decimals % 1) {
        logger3.throwArgumentError("invalid decimal count", "decimals", decimals);
      }
      if (comps[1].length <= decimals) {
        return this;
      }
      const factor = FixedNumber.from("1" + zeros.substring(0, decimals));
      return this.mulUnsafe(factor).addUnsafe(BUMP).floor().divUnsafe(factor);
    }
    isZero() {
      return this._value === "0.0" || this._value === "0";
    }
    isNegative() {
      return this._value[0] === "-";
    }
    toString() {
      return this._value;
    }
    toHexString(width) {
      if (width == null) {
        return this._hex;
      }
      if (width % 8) {
        logger3.throwArgumentError("invalid byte width", "width", width);
      }
      const hex2 = BigNumber.from(this._hex).fromTwos(this.format.width).toTwos(width).toHexString();
      return hexZeroPad(hex2, width / 8);
    }
    toUnsafeFloat() {
      return parseFloat(this.toString());
    }
    toFormat(format) {
      return FixedNumber.fromString(this._value, format);
    }
    static fromValue(value, decimals, format) {
      if (format == null && decimals != null && !isBigNumberish(decimals)) {
        format = decimals;
        decimals = null;
      }
      if (decimals == null) {
        decimals = 0;
      }
      if (format == null) {
        format = "fixed";
      }
      return FixedNumber.fromString(formatFixed(value, decimals), FixedFormat.from(format));
    }
    static fromString(value, format) {
      if (format == null) {
        format = "fixed";
      }
      const fixedFormat = FixedFormat.from(format);
      const numeric = parseFixed(value, fixedFormat.decimals);
      if (!fixedFormat.signed && numeric.lt(Zero)) {
        throwFault2("unsigned value cannot be negative", "overflow", "value", value);
      }
      let hex2 = null;
      if (fixedFormat.signed) {
        hex2 = numeric.toTwos(fixedFormat.width).toHexString();
      } else {
        hex2 = numeric.toHexString();
        hex2 = hexZeroPad(hex2, fixedFormat.width / 8);
      }
      const decimal = formatFixed(numeric, fixedFormat.decimals);
      return new FixedNumber(_constructorGuard2, hex2, decimal, fixedFormat);
    }
    static fromBytes(value, format) {
      if (format == null) {
        format = "fixed";
      }
      const fixedFormat = FixedFormat.from(format);
      if (arrayify(value).length > fixedFormat.width / 8) {
        throw new Error("overflow");
      }
      let numeric = BigNumber.from(value);
      if (fixedFormat.signed) {
        numeric = numeric.fromTwos(fixedFormat.width);
      }
      const hex2 = numeric.toTwos((fixedFormat.signed ? 0 : 1) + fixedFormat.width).toHexString();
      const decimal = formatFixed(numeric, fixedFormat.decimals);
      return new FixedNumber(_constructorGuard2, hex2, decimal, fixedFormat);
    }
    static from(value, format) {
      if (typeof value === "string") {
        return FixedNumber.fromString(value, format);
      }
      if (isBytes(value)) {
        return FixedNumber.fromBytes(value, format);
      }
      try {
        return FixedNumber.fromValue(value, 0, format);
      } catch (error) {
        if (error.code !== Logger.errors.INVALID_ARGUMENT) {
          throw error;
        }
      }
      return logger3.throwArgumentError("invalid FixedNumber value", "value", value);
    }
    static isFixedNumber(value) {
      return !!(value && value._isFixedNumber);
    }
  };
  var ONE = FixedNumber.from(1);
  var BUMP = FixedNumber.from("0.5");

  // node_modules/@ethersproject/properties/lib.esm/_version.js
  var version4 = "properties/5.2.0";

  // node_modules/@ethersproject/properties/lib.esm/index.js
  "use strict";
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger4 = new Logger(version4);
  function defineReadOnly(object, name2, value) {
    Object.defineProperty(object, name2, {
      enumerable: true,
      value,
      writable: false
    });
  }
  function getStatic(ctor, key2) {
    for (let i = 0; i < 32; i++) {
      if (ctor[key2]) {
        return ctor[key2];
      }
      if (!ctor.prototype || typeof ctor.prototype !== "object") {
        break;
      }
      ctor = Object.getPrototypeOf(ctor.prototype).constructor;
    }
    return null;
  }
  function resolveProperties(object) {
    return __awaiter(this, void 0, void 0, function* () {
      const promises = Object.keys(object).map((key2) => {
        const value = object[key2];
        return Promise.resolve(value).then((v) => ({ key: key2, value: v }));
      });
      const results = yield Promise.all(promises);
      return results.reduce((accum, result) => {
        accum[result.key] = result.value;
        return accum;
      }, {});
    });
  }
  function checkProperties(object, properties) {
    if (!object || typeof object !== "object") {
      logger4.throwArgumentError("invalid object", "object", object);
    }
    Object.keys(object).forEach((key2) => {
      if (!properties[key2]) {
        logger4.throwArgumentError("invalid object key - " + key2, "transaction:" + key2, object);
      }
    });
  }
  function shallowCopy(object) {
    const result = {};
    for (const key2 in object) {
      result[key2] = object[key2];
    }
    return result;
  }
  var opaque = { bigint: true, boolean: true, "function": true, number: true, string: true };
  function _isFrozen(object) {
    if (object === void 0 || object === null || opaque[typeof object]) {
      return true;
    }
    if (Array.isArray(object) || typeof object === "object") {
      if (!Object.isFrozen(object)) {
        return false;
      }
      const keys = Object.keys(object);
      for (let i = 0; i < keys.length; i++) {
        if (!_isFrozen(object[keys[i]])) {
          return false;
        }
      }
      return true;
    }
    return logger4.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
  }
  function _deepCopy(object) {
    if (_isFrozen(object)) {
      return object;
    }
    if (Array.isArray(object)) {
      return Object.freeze(object.map((item) => deepCopy(item)));
    }
    if (typeof object === "object") {
      const result = {};
      for (const key2 in object) {
        const value = object[key2];
        if (value === void 0) {
          continue;
        }
        defineReadOnly(result, key2, deepCopy(value));
      }
      return result;
    }
    return logger4.throwArgumentError(`Cannot deepCopy ${typeof object}`, "object", object);
  }
  function deepCopy(object) {
    return _deepCopy(object);
  }
  var Description = class {
    constructor(info) {
      for (const key2 in info) {
        this[key2] = deepCopy(info[key2]);
      }
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/_version.js
  var version5 = "abi/5.2.0";

  // node_modules/@ethersproject/abi/lib.esm/fragments.js
  "use strict";
  var logger5 = new Logger(version5);
  var _constructorGuard3 = {};
  var ModifiersBytes = { calldata: true, memory: true, storage: true };
  var ModifiersNest = { calldata: true, memory: true };
  function checkModifier(type, name2) {
    if (type === "bytes" || type === "string") {
      if (ModifiersBytes[name2]) {
        return true;
      }
    } else if (type === "address") {
      if (name2 === "payable") {
        return true;
      }
    } else if (type.indexOf("[") >= 0 || type === "tuple") {
      if (ModifiersNest[name2]) {
        return true;
      }
    }
    if (ModifiersBytes[name2] || name2 === "payable") {
      logger5.throwArgumentError("invalid modifier", "name", name2);
    }
    return false;
  }
  function parseParamType(param, allowIndexed) {
    let originalParam = param;
    function throwError(i) {
      logger5.throwArgumentError(`unexpected character at position ${i}`, "param", param);
    }
    param = param.replace(/\s/g, " ");
    function newNode(parent2) {
      let node2 = { type: "", name: "", parent: parent2, state: { allowType: true } };
      if (allowIndexed) {
        node2.indexed = false;
      }
      return node2;
    }
    let parent = { type: "", name: "", state: { allowType: true } };
    let node = parent;
    for (let i = 0; i < param.length; i++) {
      let c = param[i];
      switch (c) {
        case "(":
          if (node.state.allowType && node.type === "") {
            node.type = "tuple";
          } else if (!node.state.allowParams) {
            throwError(i);
          }
          node.state.allowType = false;
          node.type = verifyType(node.type);
          node.components = [newNode(node)];
          node = node.components[0];
          break;
        case ")":
          delete node.state;
          if (node.name === "indexed") {
            if (!allowIndexed) {
              throwError(i);
            }
            node.indexed = true;
            node.name = "";
          }
          if (checkModifier(node.type, node.name)) {
            node.name = "";
          }
          node.type = verifyType(node.type);
          let child = node;
          node = node.parent;
          if (!node) {
            throwError(i);
          }
          delete child.parent;
          node.state.allowParams = false;
          node.state.allowName = true;
          node.state.allowArray = true;
          break;
        case ",":
          delete node.state;
          if (node.name === "indexed") {
            if (!allowIndexed) {
              throwError(i);
            }
            node.indexed = true;
            node.name = "";
          }
          if (checkModifier(node.type, node.name)) {
            node.name = "";
          }
          node.type = verifyType(node.type);
          let sibling = newNode(node.parent);
          node.parent.components.push(sibling);
          delete node.parent;
          node = sibling;
          break;
        case " ":
          if (node.state.allowType) {
            if (node.type !== "") {
              node.type = verifyType(node.type);
              delete node.state.allowType;
              node.state.allowName = true;
              node.state.allowParams = true;
            }
          }
          if (node.state.allowName) {
            if (node.name !== "") {
              if (node.name === "indexed") {
                if (!allowIndexed) {
                  throwError(i);
                }
                if (node.indexed) {
                  throwError(i);
                }
                node.indexed = true;
                node.name = "";
              } else if (checkModifier(node.type, node.name)) {
                node.name = "";
              } else {
                node.state.allowName = false;
              }
            }
          }
          break;
        case "[":
          if (!node.state.allowArray) {
            throwError(i);
          }
          node.type += c;
          node.state.allowArray = false;
          node.state.allowName = false;
          node.state.readArray = true;
          break;
        case "]":
          if (!node.state.readArray) {
            throwError(i);
          }
          node.type += c;
          node.state.readArray = false;
          node.state.allowArray = true;
          node.state.allowName = true;
          break;
        default:
          if (node.state.allowType) {
            node.type += c;
            node.state.allowParams = true;
            node.state.allowArray = true;
          } else if (node.state.allowName) {
            node.name += c;
            delete node.state.allowArray;
          } else if (node.state.readArray) {
            node.type += c;
          } else {
            throwError(i);
          }
      }
    }
    if (node.parent) {
      logger5.throwArgumentError("unexpected eof", "param", param);
    }
    delete parent.state;
    if (node.name === "indexed") {
      if (!allowIndexed) {
        throwError(originalParam.length - 7);
      }
      if (node.indexed) {
        throwError(originalParam.length - 7);
      }
      node.indexed = true;
      node.name = "";
    } else if (checkModifier(node.type, node.name)) {
      node.name = "";
    }
    parent.type = verifyType(parent.type);
    return parent;
  }
  function populate(object, params) {
    for (let key2 in params) {
      defineReadOnly(object, key2, params[key2]);
    }
  }
  var FormatTypes = Object.freeze({
    sighash: "sighash",
    minimal: "minimal",
    full: "full",
    json: "json"
  });
  var paramTypeArray = new RegExp(/^(.*)\[([0-9]*)\]$/);
  var ParamType = class {
    constructor(constructorGuard, params) {
      if (constructorGuard !== _constructorGuard3) {
        logger5.throwError("use fromString", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "new ParamType()"
        });
      }
      populate(this, params);
      let match = this.type.match(paramTypeArray);
      if (match) {
        populate(this, {
          arrayLength: parseInt(match[2] || "-1"),
          arrayChildren: ParamType.fromObject({
            type: match[1],
            components: this.components
          }),
          baseType: "array"
        });
      } else {
        populate(this, {
          arrayLength: null,
          arrayChildren: null,
          baseType: this.components != null ? "tuple" : this.type
        });
      }
      this._isParamType = true;
      Object.freeze(this);
    }
    format(format) {
      if (!format) {
        format = FormatTypes.sighash;
      }
      if (!FormatTypes[format]) {
        logger5.throwArgumentError("invalid format type", "format", format);
      }
      if (format === FormatTypes.json) {
        let result2 = {
          type: this.baseType === "tuple" ? "tuple" : this.type,
          name: this.name || void 0
        };
        if (typeof this.indexed === "boolean") {
          result2.indexed = this.indexed;
        }
        if (this.components) {
          result2.components = this.components.map((comp) => JSON.parse(comp.format(format)));
        }
        return JSON.stringify(result2);
      }
      let result = "";
      if (this.baseType === "array") {
        result += this.arrayChildren.format(format);
        result += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]";
      } else {
        if (this.baseType === "tuple") {
          if (format !== FormatTypes.sighash) {
            result += this.type;
          }
          result += "(" + this.components.map((comp) => comp.format(format)).join(format === FormatTypes.full ? ", " : ",") + ")";
        } else {
          result += this.type;
        }
      }
      if (format !== FormatTypes.sighash) {
        if (this.indexed === true) {
          result += " indexed";
        }
        if (format === FormatTypes.full && this.name) {
          result += " " + this.name;
        }
      }
      return result;
    }
    static from(value, allowIndexed) {
      if (typeof value === "string") {
        return ParamType.fromString(value, allowIndexed);
      }
      return ParamType.fromObject(value);
    }
    static fromObject(value) {
      if (ParamType.isParamType(value)) {
        return value;
      }
      return new ParamType(_constructorGuard3, {
        name: value.name || null,
        type: verifyType(value.type),
        indexed: value.indexed == null ? null : !!value.indexed,
        components: value.components ? value.components.map(ParamType.fromObject) : null
      });
    }
    static fromString(value, allowIndexed) {
      function ParamTypify(node) {
        return ParamType.fromObject({
          name: node.name,
          type: node.type,
          indexed: node.indexed,
          components: node.components
        });
      }
      return ParamTypify(parseParamType(value, !!allowIndexed));
    }
    static isParamType(value) {
      return !!(value != null && value._isParamType);
    }
  };
  function parseParams(value, allowIndex) {
    return splitNesting(value).map((param) => ParamType.fromString(param, allowIndex));
  }
  var Fragment = class {
    constructor(constructorGuard, params) {
      if (constructorGuard !== _constructorGuard3) {
        logger5.throwError("use a static from method", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "new Fragment()"
        });
      }
      populate(this, params);
      this._isFragment = true;
      Object.freeze(this);
    }
    static from(value) {
      if (Fragment.isFragment(value)) {
        return value;
      }
      if (typeof value === "string") {
        return Fragment.fromString(value);
      }
      return Fragment.fromObject(value);
    }
    static fromObject(value) {
      if (Fragment.isFragment(value)) {
        return value;
      }
      switch (value.type) {
        case "function":
          return FunctionFragment.fromObject(value);
        case "event":
          return EventFragment.fromObject(value);
        case "constructor":
          return ConstructorFragment.fromObject(value);
        case "error":
          return ErrorFragment.fromObject(value);
        case "fallback":
        case "receive":
          return null;
      }
      return logger5.throwArgumentError("invalid fragment object", "value", value);
    }
    static fromString(value) {
      value = value.replace(/\s/g, " ");
      value = value.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " ");
      value = value.trim();
      if (value.split(" ")[0] === "event") {
        return EventFragment.fromString(value.substring(5).trim());
      } else if (value.split(" ")[0] === "function") {
        return FunctionFragment.fromString(value.substring(8).trim());
      } else if (value.split("(")[0].trim() === "constructor") {
        return ConstructorFragment.fromString(value.trim());
      } else if (value.split(" ")[0] === "error") {
        return ErrorFragment.fromString(value.substring(5).trim());
      }
      return logger5.throwArgumentError("unsupported fragment", "value", value);
    }
    static isFragment(value) {
      return !!(value && value._isFragment);
    }
  };
  var EventFragment = class extends Fragment {
    format(format) {
      if (!format) {
        format = FormatTypes.sighash;
      }
      if (!FormatTypes[format]) {
        logger5.throwArgumentError("invalid format type", "format", format);
      }
      if (format === FormatTypes.json) {
        return JSON.stringify({
          type: "event",
          anonymous: this.anonymous,
          name: this.name,
          inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
        });
      }
      let result = "";
      if (format !== FormatTypes.sighash) {
        result += "event ";
      }
      result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
      if (format !== FormatTypes.sighash) {
        if (this.anonymous) {
          result += "anonymous ";
        }
      }
      return result.trim();
    }
    static from(value) {
      if (typeof value === "string") {
        return EventFragment.fromString(value);
      }
      return EventFragment.fromObject(value);
    }
    static fromObject(value) {
      if (EventFragment.isEventFragment(value)) {
        return value;
      }
      if (value.type !== "event") {
        logger5.throwArgumentError("invalid event object", "value", value);
      }
      const params = {
        name: verifyIdentifier(value.name),
        anonymous: value.anonymous,
        inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
        type: "event"
      };
      return new EventFragment(_constructorGuard3, params);
    }
    static fromString(value) {
      let match = value.match(regexParen);
      if (!match) {
        logger5.throwArgumentError("invalid event string", "value", value);
      }
      let anonymous = false;
      match[3].split(" ").forEach((modifier) => {
        switch (modifier.trim()) {
          case "anonymous":
            anonymous = true;
            break;
          case "":
            break;
          default:
            logger5.warn("unknown modifier: " + modifier);
        }
      });
      return EventFragment.fromObject({
        name: match[1].trim(),
        anonymous,
        inputs: parseParams(match[2], true),
        type: "event"
      });
    }
    static isEventFragment(value) {
      return value && value._isFragment && value.type === "event";
    }
  };
  function parseGas(value, params) {
    params.gas = null;
    let comps = value.split("@");
    if (comps.length !== 1) {
      if (comps.length > 2) {
        logger5.throwArgumentError("invalid human-readable ABI signature", "value", value);
      }
      if (!comps[1].match(/^[0-9]+$/)) {
        logger5.throwArgumentError("invalid human-readable ABI signature gas", "value", value);
      }
      params.gas = BigNumber.from(comps[1]);
      return comps[0];
    }
    return value;
  }
  function parseModifiers(value, params) {
    params.constant = false;
    params.payable = false;
    params.stateMutability = "nonpayable";
    value.split(" ").forEach((modifier) => {
      switch (modifier.trim()) {
        case "constant":
          params.constant = true;
          break;
        case "payable":
          params.payable = true;
          params.stateMutability = "payable";
          break;
        case "nonpayable":
          params.payable = false;
          params.stateMutability = "nonpayable";
          break;
        case "pure":
          params.constant = true;
          params.stateMutability = "pure";
          break;
        case "view":
          params.constant = true;
          params.stateMutability = "view";
          break;
        case "external":
        case "public":
        case "":
          break;
        default:
          console.log("unknown modifier: " + modifier);
      }
    });
  }
  function verifyState(value) {
    let result = {
      constant: false,
      payable: true,
      stateMutability: "payable"
    };
    if (value.stateMutability != null) {
      result.stateMutability = value.stateMutability;
      result.constant = result.stateMutability === "view" || result.stateMutability === "pure";
      if (value.constant != null) {
        if (!!value.constant !== result.constant) {
          logger5.throwArgumentError("cannot have constant function with mutability " + result.stateMutability, "value", value);
        }
      }
      result.payable = result.stateMutability === "payable";
      if (value.payable != null) {
        if (!!value.payable !== result.payable) {
          logger5.throwArgumentError("cannot have payable function with mutability " + result.stateMutability, "value", value);
        }
      }
    } else if (value.payable != null) {
      result.payable = !!value.payable;
      if (value.constant == null && !result.payable && value.type !== "constructor") {
        logger5.throwArgumentError("unable to determine stateMutability", "value", value);
      }
      result.constant = !!value.constant;
      if (result.constant) {
        result.stateMutability = "view";
      } else {
        result.stateMutability = result.payable ? "payable" : "nonpayable";
      }
      if (result.payable && result.constant) {
        logger5.throwArgumentError("cannot have constant payable function", "value", value);
      }
    } else if (value.constant != null) {
      result.constant = !!value.constant;
      result.payable = !result.constant;
      result.stateMutability = result.constant ? "view" : "payable";
    } else if (value.type !== "constructor") {
      logger5.throwArgumentError("unable to determine stateMutability", "value", value);
    }
    return result;
  }
  var ConstructorFragment = class extends Fragment {
    format(format) {
      if (!format) {
        format = FormatTypes.sighash;
      }
      if (!FormatTypes[format]) {
        logger5.throwArgumentError("invalid format type", "format", format);
      }
      if (format === FormatTypes.json) {
        return JSON.stringify({
          type: "constructor",
          stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
          payable: this.payable,
          gas: this.gas ? this.gas.toNumber() : void 0,
          inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
        });
      }
      if (format === FormatTypes.sighash) {
        logger5.throwError("cannot format a constructor for sighash", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "format(sighash)"
        });
      }
      let result = "constructor(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
      if (this.stateMutability && this.stateMutability !== "nonpayable") {
        result += this.stateMutability + " ";
      }
      return result.trim();
    }
    static from(value) {
      if (typeof value === "string") {
        return ConstructorFragment.fromString(value);
      }
      return ConstructorFragment.fromObject(value);
    }
    static fromObject(value) {
      if (ConstructorFragment.isConstructorFragment(value)) {
        return value;
      }
      if (value.type !== "constructor") {
        logger5.throwArgumentError("invalid constructor object", "value", value);
      }
      let state = verifyState(value);
      if (state.constant) {
        logger5.throwArgumentError("constructor cannot be constant", "value", value);
      }
      const params = {
        name: null,
        type: value.type,
        inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
        payable: state.payable,
        stateMutability: state.stateMutability,
        gas: value.gas ? BigNumber.from(value.gas) : null
      };
      return new ConstructorFragment(_constructorGuard3, params);
    }
    static fromString(value) {
      let params = { type: "constructor" };
      value = parseGas(value, params);
      let parens = value.match(regexParen);
      if (!parens || parens[1].trim() !== "constructor") {
        logger5.throwArgumentError("invalid constructor string", "value", value);
      }
      params.inputs = parseParams(parens[2].trim(), false);
      parseModifiers(parens[3].trim(), params);
      return ConstructorFragment.fromObject(params);
    }
    static isConstructorFragment(value) {
      return value && value._isFragment && value.type === "constructor";
    }
  };
  var FunctionFragment = class extends ConstructorFragment {
    format(format) {
      if (!format) {
        format = FormatTypes.sighash;
      }
      if (!FormatTypes[format]) {
        logger5.throwArgumentError("invalid format type", "format", format);
      }
      if (format === FormatTypes.json) {
        return JSON.stringify({
          type: "function",
          name: this.name,
          constant: this.constant,
          stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
          payable: this.payable,
          gas: this.gas ? this.gas.toNumber() : void 0,
          inputs: this.inputs.map((input) => JSON.parse(input.format(format))),
          outputs: this.outputs.map((output) => JSON.parse(output.format(format)))
        });
      }
      let result = "";
      if (format !== FormatTypes.sighash) {
        result += "function ";
      }
      result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
      if (format !== FormatTypes.sighash) {
        if (this.stateMutability) {
          if (this.stateMutability !== "nonpayable") {
            result += this.stateMutability + " ";
          }
        } else if (this.constant) {
          result += "view ";
        }
        if (this.outputs && this.outputs.length) {
          result += "returns (" + this.outputs.map((output) => output.format(format)).join(", ") + ") ";
        }
        if (this.gas != null) {
          result += "@" + this.gas.toString() + " ";
        }
      }
      return result.trim();
    }
    static from(value) {
      if (typeof value === "string") {
        return FunctionFragment.fromString(value);
      }
      return FunctionFragment.fromObject(value);
    }
    static fromObject(value) {
      if (FunctionFragment.isFunctionFragment(value)) {
        return value;
      }
      if (value.type !== "function") {
        logger5.throwArgumentError("invalid function object", "value", value);
      }
      let state = verifyState(value);
      const params = {
        type: value.type,
        name: verifyIdentifier(value.name),
        constant: state.constant,
        inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : [],
        outputs: value.outputs ? value.outputs.map(ParamType.fromObject) : [],
        payable: state.payable,
        stateMutability: state.stateMutability,
        gas: value.gas ? BigNumber.from(value.gas) : null
      };
      return new FunctionFragment(_constructorGuard3, params);
    }
    static fromString(value) {
      let params = { type: "function" };
      value = parseGas(value, params);
      let comps = value.split(" returns ");
      if (comps.length > 2) {
        logger5.throwArgumentError("invalid function string", "value", value);
      }
      let parens = comps[0].match(regexParen);
      if (!parens) {
        logger5.throwArgumentError("invalid function signature", "value", value);
      }
      params.name = parens[1].trim();
      if (params.name) {
        verifyIdentifier(params.name);
      }
      params.inputs = parseParams(parens[2], false);
      parseModifiers(parens[3].trim(), params);
      if (comps.length > 1) {
        let returns = comps[1].match(regexParen);
        if (returns[1].trim() != "" || returns[3].trim() != "") {
          logger5.throwArgumentError("unexpected tokens", "value", value);
        }
        params.outputs = parseParams(returns[2], false);
      } else {
        params.outputs = [];
      }
      return FunctionFragment.fromObject(params);
    }
    static isFunctionFragment(value) {
      return value && value._isFragment && value.type === "function";
    }
  };
  function checkForbidden(fragment) {
    const sig = fragment.format();
    if (sig === "Error(string)" || sig === "Panic(uint256)") {
      logger5.throwArgumentError(`cannot specify user defined ${sig} error`, "fragment", fragment);
    }
    return fragment;
  }
  var ErrorFragment = class extends Fragment {
    format(format) {
      if (!format) {
        format = FormatTypes.sighash;
      }
      if (!FormatTypes[format]) {
        logger5.throwArgumentError("invalid format type", "format", format);
      }
      if (format === FormatTypes.json) {
        return JSON.stringify({
          type: "error",
          name: this.name,
          inputs: this.inputs.map((input) => JSON.parse(input.format(format)))
        });
      }
      let result = "";
      if (format !== FormatTypes.sighash) {
        result += "error ";
      }
      result += this.name + "(" + this.inputs.map((input) => input.format(format)).join(format === FormatTypes.full ? ", " : ",") + ") ";
      return result.trim();
    }
    static from(value) {
      if (typeof value === "string") {
        return ErrorFragment.fromString(value);
      }
      return ErrorFragment.fromObject(value);
    }
    static fromObject(value) {
      if (ErrorFragment.isErrorFragment(value)) {
        return value;
      }
      if (value.type !== "error") {
        logger5.throwArgumentError("invalid error object", "value", value);
      }
      const params = {
        type: value.type,
        name: verifyIdentifier(value.name),
        inputs: value.inputs ? value.inputs.map(ParamType.fromObject) : []
      };
      return checkForbidden(new ErrorFragment(_constructorGuard3, params));
    }
    static fromString(value) {
      let params = { type: "error" };
      let parens = value.match(regexParen);
      if (!parens) {
        logger5.throwArgumentError("invalid error signature", "value", value);
      }
      params.name = parens[1].trim();
      if (params.name) {
        verifyIdentifier(params.name);
      }
      params.inputs = parseParams(parens[2], false);
      return checkForbidden(ErrorFragment.fromObject(params));
    }
    static isErrorFragment(value) {
      return value && value._isFragment && value.type === "error";
    }
  };
  function verifyType(type) {
    if (type.match(/^uint($|[^1-9])/)) {
      type = "uint256" + type.substring(4);
    } else if (type.match(/^int($|[^1-9])/)) {
      type = "int256" + type.substring(3);
    }
    return type;
  }
  var regexIdentifier = new RegExp("^[A-Za-z_][A-Za-z0-9_]*$");
  function verifyIdentifier(value) {
    if (!value || !value.match(regexIdentifier)) {
      logger5.throwArgumentError(`invalid identifier "${value}"`, "value", value);
    }
    return value;
  }
  var regexParen = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
  function splitNesting(value) {
    value = value.trim();
    let result = [];
    let accum = "";
    let depth = 0;
    for (let offset = 0; offset < value.length; offset++) {
      let c = value[offset];
      if (c === "," && depth === 0) {
        result.push(accum);
        accum = "";
      } else {
        accum += c;
        if (c === "(") {
          depth++;
        } else if (c === ")") {
          depth--;
          if (depth === -1) {
            logger5.throwArgumentError("unbalanced parenthesis", "value", value);
          }
        }
      }
    }
    if (accum) {
      result.push(accum);
    }
    return result;
  }

  // node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js
  "use strict";
  var logger6 = new Logger(version5);
  function checkResultErrors(result) {
    const errors = [];
    const checkErrors = function(path, object) {
      if (!Array.isArray(object)) {
        return;
      }
      for (let key2 in object) {
        const childPath = path.slice();
        childPath.push(key2);
        try {
          checkErrors(childPath, object[key2]);
        } catch (error) {
          errors.push({ path: childPath, error });
        }
      }
    };
    checkErrors([], result);
    return errors;
  }
  var Coder = class {
    constructor(name2, type, localName, dynamic) {
      this.name = name2;
      this.type = type;
      this.localName = localName;
      this.dynamic = dynamic;
    }
    _throwError(message, value) {
      logger6.throwArgumentError(message, this.localName, value);
    }
  };
  var Writer = class {
    constructor(wordSize) {
      defineReadOnly(this, "wordSize", wordSize || 32);
      this._data = [];
      this._dataLength = 0;
      this._padding = new Uint8Array(wordSize);
    }
    get data() {
      return hexConcat(this._data);
    }
    get length() {
      return this._dataLength;
    }
    _writeData(data4) {
      this._data.push(data4);
      this._dataLength += data4.length;
      return data4.length;
    }
    appendWriter(writer) {
      return this._writeData(concat(writer._data));
    }
    writeBytes(value) {
      let bytes = arrayify(value);
      const paddingOffset = bytes.length % this.wordSize;
      if (paddingOffset) {
        bytes = concat([bytes, this._padding.slice(paddingOffset)]);
      }
      return this._writeData(bytes);
    }
    _getValue(value) {
      let bytes = arrayify(BigNumber.from(value));
      if (bytes.length > this.wordSize) {
        logger6.throwError("value out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
          length: this.wordSize,
          offset: bytes.length
        });
      }
      if (bytes.length % this.wordSize) {
        bytes = concat([this._padding.slice(bytes.length % this.wordSize), bytes]);
      }
      return bytes;
    }
    writeValue(value) {
      return this._writeData(this._getValue(value));
    }
    writeUpdatableValue() {
      const offset = this._data.length;
      this._data.push(this._padding);
      this._dataLength += this.wordSize;
      return (value) => {
        this._data[offset] = this._getValue(value);
      };
    }
  };
  var Reader = class {
    constructor(data4, wordSize, coerceFunc, allowLoose) {
      defineReadOnly(this, "_data", arrayify(data4));
      defineReadOnly(this, "wordSize", wordSize || 32);
      defineReadOnly(this, "_coerceFunc", coerceFunc);
      defineReadOnly(this, "allowLoose", allowLoose);
      this._offset = 0;
    }
    get data() {
      return hexlify(this._data);
    }
    get consumed() {
      return this._offset;
    }
    static coerce(name2, value) {
      let match = name2.match("^u?int([0-9]+)$");
      if (match && parseInt(match[1]) <= 48) {
        value = value.toNumber();
      }
      return value;
    }
    coerce(name2, value) {
      if (this._coerceFunc) {
        return this._coerceFunc(name2, value);
      }
      return Reader.coerce(name2, value);
    }
    _peekBytes(offset, length, loose) {
      let alignedLength = Math.ceil(length / this.wordSize) * this.wordSize;
      if (this._offset + alignedLength > this._data.length) {
        if (this.allowLoose && loose && this._offset + length <= this._data.length) {
          alignedLength = length;
        } else {
          logger6.throwError("data out-of-bounds", Logger.errors.BUFFER_OVERRUN, {
            length: this._data.length,
            offset: this._offset + alignedLength
          });
        }
      }
      return this._data.slice(this._offset, this._offset + alignedLength);
    }
    subReader(offset) {
      return new Reader(this._data.slice(this._offset + offset), this.wordSize, this._coerceFunc, this.allowLoose);
    }
    readBytes(length, loose) {
      let bytes = this._peekBytes(0, length, !!loose);
      this._offset += bytes.length;
      return bytes.slice(0, length);
    }
    readValue() {
      return BigNumber.from(this.readBytes(this.wordSize));
    }
  };

  // node_modules/@ethersproject/keccak256/lib.esm/index.js
  var import_js_sha3 = __toModule(require_sha3());
  "use strict";
  function keccak256(data4) {
    return "0x" + import_js_sha3.default.keccak_256(arrayify(data4));
  }

  // node_modules/@ethersproject/rlp/lib.esm/index.js
  var lib_exports = {};
  __export(lib_exports, {
    decode: () => decode,
    encode: () => encode
  });

  // node_modules/@ethersproject/rlp/lib.esm/_version.js
  var version6 = "rlp/5.2.0";

  // node_modules/@ethersproject/rlp/lib.esm/index.js
  "use strict";
  var logger7 = new Logger(version6);
  function arrayifyInteger(value) {
    const result = [];
    while (value) {
      result.unshift(value & 255);
      value >>= 8;
    }
    return result;
  }
  function unarrayifyInteger(data4, offset, length) {
    let result = 0;
    for (let i = 0; i < length; i++) {
      result = result * 256 + data4[offset + i];
    }
    return result;
  }
  function _encode(object) {
    if (Array.isArray(object)) {
      let payload = [];
      object.forEach(function(child) {
        payload = payload.concat(_encode(child));
      });
      if (payload.length <= 55) {
        payload.unshift(192 + payload.length);
        return payload;
      }
      const length2 = arrayifyInteger(payload.length);
      length2.unshift(247 + length2.length);
      return length2.concat(payload);
    }
    if (!isBytesLike(object)) {
      logger7.throwArgumentError("RLP object must be BytesLike", "object", object);
    }
    const data4 = Array.prototype.slice.call(arrayify(object));
    if (data4.length === 1 && data4[0] <= 127) {
      return data4;
    } else if (data4.length <= 55) {
      data4.unshift(128 + data4.length);
      return data4;
    }
    const length = arrayifyInteger(data4.length);
    length.unshift(183 + length.length);
    return length.concat(data4);
  }
  function encode(object) {
    return hexlify(_encode(object));
  }
  function _decodeChildren(data4, offset, childOffset, length) {
    const result = [];
    while (childOffset < offset + 1 + length) {
      const decoded = _decode(data4, childOffset);
      result.push(decoded.result);
      childOffset += decoded.consumed;
      if (childOffset > offset + 1 + length) {
        logger7.throwError("child data too short", Logger.errors.BUFFER_OVERRUN, {});
      }
    }
    return { consumed: 1 + length, result };
  }
  function _decode(data4, offset) {
    if (data4.length === 0) {
      logger7.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
    }
    if (data4[offset] >= 248) {
      const lengthLength = data4[offset] - 247;
      if (offset + 1 + lengthLength > data4.length) {
        logger7.throwError("data short segment too short", Logger.errors.BUFFER_OVERRUN, {});
      }
      const length = unarrayifyInteger(data4, offset + 1, lengthLength);
      if (offset + 1 + lengthLength + length > data4.length) {
        logger7.throwError("data long segment too short", Logger.errors.BUFFER_OVERRUN, {});
      }
      return _decodeChildren(data4, offset, offset + 1 + lengthLength, lengthLength + length);
    } else if (data4[offset] >= 192) {
      const length = data4[offset] - 192;
      if (offset + 1 + length > data4.length) {
        logger7.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
      }
      return _decodeChildren(data4, offset, offset + 1, length);
    } else if (data4[offset] >= 184) {
      const lengthLength = data4[offset] - 183;
      if (offset + 1 + lengthLength > data4.length) {
        logger7.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
      }
      const length = unarrayifyInteger(data4, offset + 1, lengthLength);
      if (offset + 1 + lengthLength + length > data4.length) {
        logger7.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
      }
      const result = hexlify(data4.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
      return { consumed: 1 + lengthLength + length, result };
    } else if (data4[offset] >= 128) {
      const length = data4[offset] - 128;
      if (offset + 1 + length > data4.length) {
        logger7.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
      }
      const result = hexlify(data4.slice(offset + 1, offset + 1 + length));
      return { consumed: 1 + length, result };
    }
    return { consumed: 1, result: hexlify(data4[offset]) };
  }
  function decode(data4) {
    const bytes = arrayify(data4);
    const decoded = _decode(bytes, 0);
    if (decoded.consumed !== bytes.length) {
      logger7.throwArgumentError("invalid rlp data", "data", data4);
    }
    return decoded.result;
  }

  // node_modules/@ethersproject/address/lib.esm/_version.js
  var version7 = "address/5.2.0";

  // node_modules/@ethersproject/address/lib.esm/index.js
  "use strict";
  var logger8 = new Logger(version7);
  function getChecksumAddress(address) {
    if (!isHexString(address, 20)) {
      logger8.throwArgumentError("invalid address", "address", address);
    }
    address = address.toLowerCase();
    const chars = address.substring(2).split("");
    const expanded = new Uint8Array(40);
    for (let i = 0; i < 40; i++) {
      expanded[i] = chars[i].charCodeAt(0);
    }
    const hashed = arrayify(keccak256(expanded));
    for (let i = 0; i < 40; i += 2) {
      if (hashed[i >> 1] >> 4 >= 8) {
        chars[i] = chars[i].toUpperCase();
      }
      if ((hashed[i >> 1] & 15) >= 8) {
        chars[i + 1] = chars[i + 1].toUpperCase();
      }
    }
    return "0x" + chars.join("");
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  function log10(x) {
    if (Math.log10) {
      return Math.log10(x);
    }
    return Math.log(x) / Math.LN10;
  }
  var ibanLookup = {};
  for (let i = 0; i < 10; i++) {
    ibanLookup[String(i)] = String(i);
  }
  for (let i = 0; i < 26; i++) {
    ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
  }
  var safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
  function ibanChecksum(address) {
    address = address.toUpperCase();
    address = address.substring(4) + address.substring(0, 2) + "00";
    let expanded = address.split("").map((c) => {
      return ibanLookup[c];
    }).join("");
    while (expanded.length >= safeDigits) {
      let block = expanded.substring(0, safeDigits);
      expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
    }
    let checksum = String(98 - parseInt(expanded, 10) % 97);
    while (checksum.length < 2) {
      checksum = "0" + checksum;
    }
    return checksum;
  }
  function getAddress(address) {
    let result = null;
    if (typeof address !== "string") {
      logger8.throwArgumentError("invalid address", "address", address);
    }
    if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
      if (address.substring(0, 2) !== "0x") {
        address = "0x" + address;
      }
      result = getChecksumAddress(address);
      if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
        logger8.throwArgumentError("bad address checksum", "address", address);
      }
    } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
      if (address.substring(2, 4) !== ibanChecksum(address)) {
        logger8.throwArgumentError("bad icap checksum", "address", address);
      }
      result = _base36To16(address.substring(4));
      while (result.length < 40) {
        result = "0" + result;
      }
      result = getChecksumAddress("0x" + result);
    } else {
      logger8.throwArgumentError("invalid address", "address", address);
    }
    return result;
  }
  function isAddress(address) {
    try {
      getAddress(address);
      return true;
    } catch (error) {
    }
    return false;
  }
  function getIcapAddress(address) {
    let base36 = _base16To36(getAddress(address).substring(2)).toUpperCase();
    while (base36.length < 30) {
      base36 = "0" + base36;
    }
    return "XE" + ibanChecksum("XE00" + base36) + base36;
  }
  function getContractAddress(transaction) {
    let from = null;
    try {
      from = getAddress(transaction.from);
    } catch (error) {
      logger8.throwArgumentError("missing from address", "transaction", transaction);
    }
    const nonce = stripZeros(arrayify(BigNumber.from(transaction.nonce).toHexString()));
    return getAddress(hexDataSlice(keccak256(encode([from, nonce])), 12));
  }
  function getCreate2Address(from, salt, initCodeHash) {
    if (hexDataLength(salt) !== 32) {
      logger8.throwArgumentError("salt must be 32 bytes", "salt", salt);
    }
    if (hexDataLength(initCodeHash) !== 32) {
      logger8.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", initCodeHash);
    }
    return getAddress(hexDataSlice(keccak256(concat(["0xff", getAddress(from), salt, initCodeHash])), 12));
  }

  // node_modules/@ethersproject/abi/lib.esm/coders/address.js
  "use strict";
  var AddressCoder = class extends Coder {
    constructor(localName) {
      super("address", "address", localName, false);
    }
    defaultValue() {
      return "0x0000000000000000000000000000000000000000";
    }
    encode(writer, value) {
      try {
        getAddress(value);
      } catch (error) {
        this._throwError(error.message, value);
      }
      return writer.writeValue(value);
    }
    decode(reader) {
      return getAddress(hexZeroPad(reader.readValue().toHexString(), 20));
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js
  "use strict";
  var AnonymousCoder = class extends Coder {
    constructor(coder) {
      super(coder.name, coder.type, void 0, coder.dynamic);
      this.coder = coder;
    }
    defaultValue() {
      return this.coder.defaultValue();
    }
    encode(writer, value) {
      return this.coder.encode(writer, value);
    }
    decode(reader) {
      return this.coder.decode(reader);
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/coders/array.js
  "use strict";
  var logger9 = new Logger(version5);
  function pack(writer, coders, values) {
    let arrayValues = null;
    if (Array.isArray(values)) {
      arrayValues = values;
    } else if (values && typeof values === "object") {
      let unique = {};
      arrayValues = coders.map((coder) => {
        const name2 = coder.localName;
        if (!name2) {
          logger9.throwError("cannot encode object for signature with missing names", Logger.errors.INVALID_ARGUMENT, {
            argument: "values",
            coder,
            value: values
          });
        }
        if (unique[name2]) {
          logger9.throwError("cannot encode object for signature with duplicate names", Logger.errors.INVALID_ARGUMENT, {
            argument: "values",
            coder,
            value: values
          });
        }
        unique[name2] = true;
        return values[name2];
      });
    } else {
      logger9.throwArgumentError("invalid tuple value", "tuple", values);
    }
    if (coders.length !== arrayValues.length) {
      logger9.throwArgumentError("types/value length mismatch", "tuple", values);
    }
    let staticWriter = new Writer(writer.wordSize);
    let dynamicWriter = new Writer(writer.wordSize);
    let updateFuncs = [];
    coders.forEach((coder, index) => {
      let value = arrayValues[index];
      if (coder.dynamic) {
        let dynamicOffset = dynamicWriter.length;
        coder.encode(dynamicWriter, value);
        let updateFunc = staticWriter.writeUpdatableValue();
        updateFuncs.push((baseOffset) => {
          updateFunc(baseOffset + dynamicOffset);
        });
      } else {
        coder.encode(staticWriter, value);
      }
    });
    updateFuncs.forEach((func) => {
      func(staticWriter.length);
    });
    let length = writer.appendWriter(staticWriter);
    length += writer.appendWriter(dynamicWriter);
    return length;
  }
  function unpack(reader, coders) {
    let values = [];
    let baseReader = reader.subReader(0);
    coders.forEach((coder) => {
      let value = null;
      if (coder.dynamic) {
        let offset = reader.readValue();
        let offsetReader = baseReader.subReader(offset.toNumber());
        try {
          value = coder.decode(offsetReader);
        } catch (error) {
          if (error.code === Logger.errors.BUFFER_OVERRUN) {
            throw error;
          }
          value = error;
          value.baseType = coder.name;
          value.name = coder.localName;
          value.type = coder.type;
        }
      } else {
        try {
          value = coder.decode(reader);
        } catch (error) {
          if (error.code === Logger.errors.BUFFER_OVERRUN) {
            throw error;
          }
          value = error;
          value.baseType = coder.name;
          value.name = coder.localName;
          value.type = coder.type;
        }
      }
      if (value != void 0) {
        values.push(value);
      }
    });
    const uniqueNames = coders.reduce((accum, coder) => {
      const name2 = coder.localName;
      if (name2) {
        if (!accum[name2]) {
          accum[name2] = 0;
        }
        accum[name2]++;
      }
      return accum;
    }, {});
    coders.forEach((coder, index) => {
      let name2 = coder.localName;
      if (!name2 || uniqueNames[name2] !== 1) {
        return;
      }
      if (name2 === "length") {
        name2 = "_length";
      }
      if (values[name2] != null) {
        return;
      }
      const value = values[index];
      if (value instanceof Error) {
        Object.defineProperty(values, name2, {
          get: () => {
            throw value;
          }
        });
      } else {
        values[name2] = value;
      }
    });
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (value instanceof Error) {
        Object.defineProperty(values, i, {
          get: () => {
            throw value;
          }
        });
      }
    }
    return Object.freeze(values);
  }
  var ArrayCoder = class extends Coder {
    constructor(coder, length, localName) {
      const type = coder.type + "[" + (length >= 0 ? length : "") + "]";
      const dynamic = length === -1 || coder.dynamic;
      super("array", type, localName, dynamic);
      this.coder = coder;
      this.length = length;
    }
    defaultValue() {
      const defaultChild = this.coder.defaultValue();
      const result = [];
      for (let i = 0; i < this.length; i++) {
        result.push(defaultChild);
      }
      return result;
    }
    encode(writer, value) {
      if (!Array.isArray(value)) {
        this._throwError("expected array value", value);
      }
      let count = this.length;
      if (count === -1) {
        count = value.length;
        writer.writeValue(value.length);
      }
      logger9.checkArgumentCount(value.length, count, "coder array" + (this.localName ? " " + this.localName : ""));
      let coders = [];
      for (let i = 0; i < value.length; i++) {
        coders.push(this.coder);
      }
      return pack(writer, coders, value);
    }
    decode(reader) {
      let count = this.length;
      if (count === -1) {
        count = reader.readValue().toNumber();
        if (count * 32 > reader._data.length) {
          logger9.throwError("insufficient data length", Logger.errors.BUFFER_OVERRUN, {
            length: reader._data.length,
            count
          });
        }
      }
      let coders = [];
      for (let i = 0; i < count; i++) {
        coders.push(new AnonymousCoder(this.coder));
      }
      return reader.coerce(this.name, unpack(reader, coders));
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/coders/boolean.js
  "use strict";
  var BooleanCoder = class extends Coder {
    constructor(localName) {
      super("bool", "bool", localName, false);
    }
    defaultValue() {
      return false;
    }
    encode(writer, value) {
      return writer.writeValue(value ? 1 : 0);
    }
    decode(reader) {
      return reader.coerce(this.type, !reader.readValue().isZero());
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/coders/bytes.js
  "use strict";
  var DynamicBytesCoder = class extends Coder {
    constructor(type, localName) {
      super(type, type, localName, true);
    }
    defaultValue() {
      return "0x";
    }
    encode(writer, value) {
      value = arrayify(value);
      let length = writer.writeValue(value.length);
      length += writer.writeBytes(value);
      return length;
    }
    decode(reader) {
      return reader.readBytes(reader.readValue().toNumber(), true);
    }
  };
  var BytesCoder = class extends DynamicBytesCoder {
    constructor(localName) {
      super("bytes", localName);
    }
    decode(reader) {
      return reader.coerce(this.name, hexlify(super.decode(reader)));
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js
  "use strict";
  var FixedBytesCoder = class extends Coder {
    constructor(size, localName) {
      let name2 = "bytes" + String(size);
      super(name2, name2, localName, false);
      this.size = size;
    }
    defaultValue() {
      return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
    }
    encode(writer, value) {
      let data4 = arrayify(value);
      if (data4.length !== this.size) {
        this._throwError("incorrect data length", value);
      }
      return writer.writeBytes(data4);
    }
    decode(reader) {
      return reader.coerce(this.name, hexlify(reader.readBytes(this.size)));
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/coders/null.js
  "use strict";
  var NullCoder = class extends Coder {
    constructor(localName) {
      super("null", "", localName, false);
    }
    defaultValue() {
      return null;
    }
    encode(writer, value) {
      if (value != null) {
        this._throwError("not null", value);
      }
      return writer.writeBytes([]);
    }
    decode(reader) {
      reader.readBytes(0);
      return reader.coerce(this.name, null);
    }
  };

  // node_modules/@ethersproject/constants/lib.esm/index.js
  var lib_exports2 = {};
  __export(lib_exports2, {
    AddressZero: () => AddressZero,
    EtherSymbol: () => EtherSymbol,
    HashZero: () => HashZero,
    MaxUint256: () => MaxUint256,
    NegativeOne: () => NegativeOne2,
    One: () => One,
    Two: () => Two,
    WeiPerEther: () => WeiPerEther,
    Zero: () => Zero2
  });

  // node_modules/@ethersproject/constants/lib.esm/addresses.js
  var AddressZero = "0x0000000000000000000000000000000000000000";

  // node_modules/@ethersproject/constants/lib.esm/bignumbers.js
  var NegativeOne2 = /* @__PURE__ */ BigNumber.from(-1);
  var Zero2 = /* @__PURE__ */ BigNumber.from(0);
  var One = /* @__PURE__ */ BigNumber.from(1);
  var Two = /* @__PURE__ */ BigNumber.from(2);
  var WeiPerEther = /* @__PURE__ */ BigNumber.from("1000000000000000000");
  var MaxUint256 = /* @__PURE__ */ BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

  // node_modules/@ethersproject/constants/lib.esm/hashes.js
  var HashZero = "0x0000000000000000000000000000000000000000000000000000000000000000";

  // node_modules/@ethersproject/constants/lib.esm/strings.js
  var EtherSymbol = "\u039E";

  // node_modules/@ethersproject/constants/lib.esm/index.js
  "use strict";

  // node_modules/@ethersproject/abi/lib.esm/coders/number.js
  "use strict";
  var NumberCoder = class extends Coder {
    constructor(size, signed, localName) {
      const name2 = (signed ? "int" : "uint") + size * 8;
      super(name2, name2, localName, false);
      this.size = size;
      this.signed = signed;
    }
    defaultValue() {
      return 0;
    }
    encode(writer, value) {
      let v = BigNumber.from(value);
      let maxUintValue = MaxUint256.mask(writer.wordSize * 8);
      if (this.signed) {
        let bounds = maxUintValue.mask(this.size * 8 - 1);
        if (v.gt(bounds) || v.lt(bounds.add(One).mul(NegativeOne2))) {
          this._throwError("value out-of-bounds", value);
        }
      } else if (v.lt(Zero2) || v.gt(maxUintValue.mask(this.size * 8))) {
        this._throwError("value out-of-bounds", value);
      }
      v = v.toTwos(this.size * 8).mask(this.size * 8);
      if (this.signed) {
        v = v.fromTwos(this.size * 8).toTwos(8 * writer.wordSize);
      }
      return writer.writeValue(v);
    }
    decode(reader) {
      let value = reader.readValue().mask(this.size * 8);
      if (this.signed) {
        value = value.fromTwos(this.size * 8);
      }
      return reader.coerce(this.name, value);
    }
  };

  // node_modules/@ethersproject/strings/lib.esm/_version.js
  var version8 = "strings/5.2.0";

  // node_modules/@ethersproject/strings/lib.esm/utf8.js
  "use strict";
  var logger10 = new Logger(version8);
  var UnicodeNormalizationForm;
  (function(UnicodeNormalizationForm2) {
    UnicodeNormalizationForm2["current"] = "";
    UnicodeNormalizationForm2["NFC"] = "NFC";
    UnicodeNormalizationForm2["NFD"] = "NFD";
    UnicodeNormalizationForm2["NFKC"] = "NFKC";
    UnicodeNormalizationForm2["NFKD"] = "NFKD";
  })(UnicodeNormalizationForm || (UnicodeNormalizationForm = {}));
  var Utf8ErrorReason;
  (function(Utf8ErrorReason2) {
    Utf8ErrorReason2["UNEXPECTED_CONTINUE"] = "unexpected continuation byte";
    Utf8ErrorReason2["BAD_PREFIX"] = "bad codepoint prefix";
    Utf8ErrorReason2["OVERRUN"] = "string overrun";
    Utf8ErrorReason2["MISSING_CONTINUE"] = "missing continuation byte";
    Utf8ErrorReason2["OUT_OF_RANGE"] = "out of UTF-8 range";
    Utf8ErrorReason2["UTF16_SURROGATE"] = "UTF-16 surrogate";
    Utf8ErrorReason2["OVERLONG"] = "overlong representation";
  })(Utf8ErrorReason || (Utf8ErrorReason = {}));
  function errorFunc(reason, offset, bytes, output, badCodepoint) {
    return logger10.throwArgumentError(`invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes);
  }
  function ignoreFunc(reason, offset, bytes, output, badCodepoint) {
    if (reason === Utf8ErrorReason.BAD_PREFIX || reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
      let i = 0;
      for (let o = offset + 1; o < bytes.length; o++) {
        if (bytes[o] >> 6 !== 2) {
          break;
        }
        i++;
      }
      return i;
    }
    if (reason === Utf8ErrorReason.OVERRUN) {
      return bytes.length - offset - 1;
    }
    return 0;
  }
  function replaceFunc(reason, offset, bytes, output, badCodepoint) {
    if (reason === Utf8ErrorReason.OVERLONG) {
      output.push(badCodepoint);
      return 0;
    }
    output.push(65533);
    return ignoreFunc(reason, offset, bytes, output, badCodepoint);
  }
  var Utf8ErrorFuncs = Object.freeze({
    error: errorFunc,
    ignore: ignoreFunc,
    replace: replaceFunc
  });
  function getUtf8CodePoints(bytes, onError) {
    if (onError == null) {
      onError = Utf8ErrorFuncs.error;
    }
    bytes = arrayify(bytes);
    const result = [];
    let i = 0;
    while (i < bytes.length) {
      const c = bytes[i++];
      if (c >> 7 === 0) {
        result.push(c);
        continue;
      }
      let extraLength = null;
      let overlongMask = null;
      if ((c & 224) === 192) {
        extraLength = 1;
        overlongMask = 127;
      } else if ((c & 240) === 224) {
        extraLength = 2;
        overlongMask = 2047;
      } else if ((c & 248) === 240) {
        extraLength = 3;
        overlongMask = 65535;
      } else {
        if ((c & 192) === 128) {
          i += onError(Utf8ErrorReason.UNEXPECTED_CONTINUE, i - 1, bytes, result);
        } else {
          i += onError(Utf8ErrorReason.BAD_PREFIX, i - 1, bytes, result);
        }
        continue;
      }
      if (i - 1 + extraLength >= bytes.length) {
        i += onError(Utf8ErrorReason.OVERRUN, i - 1, bytes, result);
        continue;
      }
      let res = c & (1 << 8 - extraLength - 1) - 1;
      for (let j = 0; j < extraLength; j++) {
        let nextChar = bytes[i];
        if ((nextChar & 192) != 128) {
          i += onError(Utf8ErrorReason.MISSING_CONTINUE, i, bytes, result);
          res = null;
          break;
        }
        ;
        res = res << 6 | nextChar & 63;
        i++;
      }
      if (res === null) {
        continue;
      }
      if (res > 1114111) {
        i += onError(Utf8ErrorReason.OUT_OF_RANGE, i - 1 - extraLength, bytes, result, res);
        continue;
      }
      if (res >= 55296 && res <= 57343) {
        i += onError(Utf8ErrorReason.UTF16_SURROGATE, i - 1 - extraLength, bytes, result, res);
        continue;
      }
      if (res <= overlongMask) {
        i += onError(Utf8ErrorReason.OVERLONG, i - 1 - extraLength, bytes, result, res);
        continue;
      }
      result.push(res);
    }
    return result;
  }
  function toUtf8Bytes(str, form = UnicodeNormalizationForm.current) {
    if (form != UnicodeNormalizationForm.current) {
      logger10.checkNormalize();
      str = str.normalize(form);
    }
    let result = [];
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (c < 128) {
        result.push(c);
      } else if (c < 2048) {
        result.push(c >> 6 | 192);
        result.push(c & 63 | 128);
      } else if ((c & 64512) == 55296) {
        i++;
        const c2 = str.charCodeAt(i);
        if (i >= str.length || (c2 & 64512) !== 56320) {
          throw new Error("invalid utf-8 string");
        }
        const pair = 65536 + ((c & 1023) << 10) + (c2 & 1023);
        result.push(pair >> 18 | 240);
        result.push(pair >> 12 & 63 | 128);
        result.push(pair >> 6 & 63 | 128);
        result.push(pair & 63 | 128);
      } else {
        result.push(c >> 12 | 224);
        result.push(c >> 6 & 63 | 128);
        result.push(c & 63 | 128);
      }
    }
    return arrayify(result);
  }
  function escapeChar(value) {
    const hex2 = "0000" + value.toString(16);
    return "\\u" + hex2.substring(hex2.length - 4);
  }
  function _toEscapedUtf8String(bytes, onError) {
    return '"' + getUtf8CodePoints(bytes, onError).map((codePoint) => {
      if (codePoint < 256) {
        switch (codePoint) {
          case 8:
            return "\\b";
          case 9:
            return "\\t";
          case 10:
            return "\\n";
          case 13:
            return "\\r";
          case 34:
            return '\\"';
          case 92:
            return "\\\\";
        }
        if (codePoint >= 32 && codePoint < 127) {
          return String.fromCharCode(codePoint);
        }
      }
      if (codePoint <= 65535) {
        return escapeChar(codePoint);
      }
      codePoint -= 65536;
      return escapeChar((codePoint >> 10 & 1023) + 55296) + escapeChar((codePoint & 1023) + 56320);
    }).join("") + '"';
  }
  function _toUtf8String(codePoints) {
    return codePoints.map((codePoint) => {
      if (codePoint <= 65535) {
        return String.fromCharCode(codePoint);
      }
      codePoint -= 65536;
      return String.fromCharCode((codePoint >> 10 & 1023) + 55296, (codePoint & 1023) + 56320);
    }).join("");
  }
  function toUtf8String(bytes, onError) {
    return _toUtf8String(getUtf8CodePoints(bytes, onError));
  }
  function toUtf8CodePoints(str, form = UnicodeNormalizationForm.current) {
    return getUtf8CodePoints(toUtf8Bytes(str, form));
  }

  // node_modules/@ethersproject/strings/lib.esm/bytes32.js
  "use strict";
  function formatBytes32String(text) {
    const bytes = toUtf8Bytes(text);
    if (bytes.length > 31) {
      throw new Error("bytes32 string must be less than 32 bytes");
    }
    return hexlify(concat([bytes, HashZero]).slice(0, 32));
  }
  function parseBytes32String(bytes) {
    const data4 = arrayify(bytes);
    if (data4.length !== 32) {
      throw new Error("invalid bytes32 - not 32 bytes long");
    }
    if (data4[31] !== 0) {
      throw new Error("invalid bytes32 string - no null terminator");
    }
    let length = 31;
    while (data4[length - 1] === 0) {
      length--;
    }
    return toUtf8String(data4.slice(0, length));
  }

  // node_modules/@ethersproject/strings/lib.esm/idna.js
  "use strict";
  function bytes2(data4) {
    if (data4.length % 4 !== 0) {
      throw new Error("bad data");
    }
    let result = [];
    for (let i = 0; i < data4.length; i += 4) {
      result.push(parseInt(data4.substring(i, i + 4), 16));
    }
    return result;
  }
  function createTable(data4, func) {
    if (!func) {
      func = function(value) {
        return [parseInt(value, 16)];
      };
    }
    let lo = 0;
    let result = {};
    data4.split(",").forEach((pair) => {
      let comps = pair.split(":");
      lo += parseInt(comps[0], 16);
      result[lo] = func(comps[1]);
    });
    return result;
  }
  function createRangeTable(data4) {
    let hi = 0;
    return data4.split(",").map((v) => {
      let comps = v.split("-");
      if (comps.length === 1) {
        comps[1] = "0";
      } else if (comps[1] === "") {
        comps[1] = "1";
      }
      let lo = hi + parseInt(comps[0], 16);
      hi = parseInt(comps[1], 16);
      return { l: lo, h: hi };
    });
  }
  function matchMap(value, ranges) {
    let lo = 0;
    for (let i = 0; i < ranges.length; i++) {
      let range = ranges[i];
      lo += range.l;
      if (value >= lo && value <= lo + range.h && (value - lo) % (range.d || 1) === 0) {
        if (range.e && range.e.indexOf(value - lo) !== -1) {
          continue;
        }
        return range;
      }
    }
    return null;
  }
  var Table_A_1_ranges = createRangeTable("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d");
  var Table_B_1_flags = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((v) => parseInt(v, 16));
  var Table_B_2_ranges = [
    { h: 25, s: 32, l: 65 },
    { h: 30, s: 32, e: [23], l: 127 },
    { h: 54, s: 1, e: [48], l: 64, d: 2 },
    { h: 14, s: 1, l: 57, d: 2 },
    { h: 44, s: 1, l: 17, d: 2 },
    { h: 10, s: 1, e: [2, 6, 8], l: 61, d: 2 },
    { h: 16, s: 1, l: 68, d: 2 },
    { h: 84, s: 1, e: [18, 24, 66], l: 19, d: 2 },
    { h: 26, s: 32, e: [17], l: 435 },
    { h: 22, s: 1, l: 71, d: 2 },
    { h: 15, s: 80, l: 40 },
    { h: 31, s: 32, l: 16 },
    { h: 32, s: 1, l: 80, d: 2 },
    { h: 52, s: 1, l: 42, d: 2 },
    { h: 12, s: 1, l: 55, d: 2 },
    { h: 40, s: 1, e: [38], l: 15, d: 2 },
    { h: 14, s: 1, l: 48, d: 2 },
    { h: 37, s: 48, l: 49 },
    { h: 148, s: 1, l: 6351, d: 2 },
    { h: 88, s: 1, l: 160, d: 2 },
    { h: 15, s: 16, l: 704 },
    { h: 25, s: 26, l: 854 },
    { h: 25, s: 32, l: 55915 },
    { h: 37, s: 40, l: 1247 },
    { h: 25, s: -119711, l: 53248 },
    { h: 25, s: -119763, l: 52 },
    { h: 25, s: -119815, l: 52 },
    { h: 25, s: -119867, e: [1, 4, 5, 7, 8, 11, 12, 17], l: 52 },
    { h: 25, s: -119919, l: 52 },
    { h: 24, s: -119971, e: [2, 7, 8, 17], l: 52 },
    { h: 24, s: -120023, e: [2, 7, 13, 15, 16, 17], l: 52 },
    { h: 25, s: -120075, l: 52 },
    { h: 25, s: -120127, l: 52 },
    { h: 25, s: -120179, l: 52 },
    { h: 25, s: -120231, l: 52 },
    { h: 25, s: -120283, l: 52 },
    { h: 25, s: -120335, l: 52 },
    { h: 24, s: -119543, e: [17], l: 56 },
    { h: 24, s: -119601, e: [17], l: 58 },
    { h: 24, s: -119659, e: [17], l: 58 },
    { h: 24, s: -119717, e: [17], l: 58 },
    { h: 24, s: -119775, e: [17], l: 58 }
  ];
  var Table_B_2_lut_abs = createTable("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3");
  var Table_B_2_lut_rel = createTable("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7");
  var Table_B_2_complex = createTable("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", bytes2);
  var Table_C_ranges = createRangeTable("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
  function flatten(values) {
    return values.reduce((accum, value) => {
      value.forEach((value2) => {
        accum.push(value2);
      });
      return accum;
    }, []);
  }
  function _nameprepTableA1(codepoint) {
    return !!matchMap(codepoint, Table_A_1_ranges);
  }
  function _nameprepTableB2(codepoint) {
    let range = matchMap(codepoint, Table_B_2_ranges);
    if (range) {
      return [codepoint + range.s];
    }
    let codes3 = Table_B_2_lut_abs[codepoint];
    if (codes3) {
      return codes3;
    }
    let shift = Table_B_2_lut_rel[codepoint];
    if (shift) {
      return [codepoint + shift[0]];
    }
    let complex = Table_B_2_complex[codepoint];
    if (complex) {
      return complex;
    }
    return null;
  }
  function _nameprepTableC(codepoint) {
    return !!matchMap(codepoint, Table_C_ranges);
  }
  function nameprep(value) {
    if (value.match(/^[a-z0-9-]*$/i) && value.length <= 59) {
      return value.toLowerCase();
    }
    let codes3 = toUtf8CodePoints(value);
    codes3 = flatten(codes3.map((code) => {
      if (Table_B_1_flags.indexOf(code) >= 0) {
        return [];
      }
      if (code >= 65024 && code <= 65039) {
        return [];
      }
      let codesTableB2 = _nameprepTableB2(code);
      if (codesTableB2) {
        return codesTableB2;
      }
      return [code];
    }));
    codes3 = toUtf8CodePoints(_toUtf8String(codes3), UnicodeNormalizationForm.NFKC);
    codes3.forEach((code) => {
      if (_nameprepTableC(code)) {
        throw new Error("STRINGPREP_CONTAINS_PROHIBITED");
      }
    });
    codes3.forEach((code) => {
      if (_nameprepTableA1(code)) {
        throw new Error("STRINGPREP_CONTAINS_UNASSIGNED");
      }
    });
    let name2 = _toUtf8String(codes3);
    if (name2.substring(0, 1) === "-" || name2.substring(2, 4) === "--" || name2.substring(name2.length - 1) === "-") {
      throw new Error("invalid hyphen");
    }
    if (name2.length > 63) {
      throw new Error("too long");
    }
    return name2;
  }

  // node_modules/@ethersproject/strings/lib.esm/index.js
  "use strict";

  // node_modules/@ethersproject/abi/lib.esm/coders/string.js
  "use strict";
  var StringCoder = class extends DynamicBytesCoder {
    constructor(localName) {
      super("string", localName);
    }
    defaultValue() {
      return "";
    }
    encode(writer, value) {
      return super.encode(writer, toUtf8Bytes(value));
    }
    decode(reader) {
      return toUtf8String(super.decode(reader));
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/coders/tuple.js
  "use strict";
  var TupleCoder = class extends Coder {
    constructor(coders, localName) {
      let dynamic = false;
      const types = [];
      coders.forEach((coder) => {
        if (coder.dynamic) {
          dynamic = true;
        }
        types.push(coder.type);
      });
      const type = "tuple(" + types.join(",") + ")";
      super("tuple", type, localName, dynamic);
      this.coders = coders;
    }
    defaultValue() {
      const values = [];
      this.coders.forEach((coder) => {
        values.push(coder.defaultValue());
      });
      const uniqueNames = this.coders.reduce((accum, coder) => {
        const name2 = coder.localName;
        if (name2) {
          if (!accum[name2]) {
            accum[name2] = 0;
          }
          accum[name2]++;
        }
        return accum;
      }, {});
      this.coders.forEach((coder, index) => {
        let name2 = coder.localName;
        if (!name2 || uniqueNames[name2] !== 1) {
          return;
        }
        if (name2 === "length") {
          name2 = "_length";
        }
        if (values[name2] != null) {
          return;
        }
        values[name2] = values[index];
      });
      return Object.freeze(values);
    }
    encode(writer, value) {
      return pack(writer, this.coders, value);
    }
    decode(reader) {
      return reader.coerce(this.name, unpack(reader, this.coders));
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/abi-coder.js
  "use strict";
  var logger11 = new Logger(version5);
  var paramTypeBytes = new RegExp(/^bytes([0-9]*)$/);
  var paramTypeNumber = new RegExp(/^(u?int)([0-9]*)$/);
  var AbiCoder = class {
    constructor(coerceFunc) {
      logger11.checkNew(new.target, AbiCoder);
      defineReadOnly(this, "coerceFunc", coerceFunc || null);
    }
    _getCoder(param) {
      switch (param.baseType) {
        case "address":
          return new AddressCoder(param.name);
        case "bool":
          return new BooleanCoder(param.name);
        case "string":
          return new StringCoder(param.name);
        case "bytes":
          return new BytesCoder(param.name);
        case "array":
          return new ArrayCoder(this._getCoder(param.arrayChildren), param.arrayLength, param.name);
        case "tuple":
          return new TupleCoder((param.components || []).map((component) => {
            return this._getCoder(component);
          }), param.name);
        case "":
          return new NullCoder(param.name);
      }
      let match = param.type.match(paramTypeNumber);
      if (match) {
        let size = parseInt(match[2] || "256");
        if (size === 0 || size > 256 || size % 8 !== 0) {
          logger11.throwArgumentError("invalid " + match[1] + " bit length", "param", param);
        }
        return new NumberCoder(size / 8, match[1] === "int", param.name);
      }
      match = param.type.match(paramTypeBytes);
      if (match) {
        let size = parseInt(match[1]);
        if (size === 0 || size > 32) {
          logger11.throwArgumentError("invalid bytes length", "param", param);
        }
        return new FixedBytesCoder(size, param.name);
      }
      return logger11.throwArgumentError("invalid type", "type", param.type);
    }
    _getWordSize() {
      return 32;
    }
    _getReader(data4, allowLoose) {
      return new Reader(data4, this._getWordSize(), this.coerceFunc, allowLoose);
    }
    _getWriter() {
      return new Writer(this._getWordSize());
    }
    getDefaultValue(types) {
      const coders = types.map((type) => this._getCoder(ParamType.from(type)));
      const coder = new TupleCoder(coders, "_");
      return coder.defaultValue();
    }
    encode(types, values) {
      if (types.length !== values.length) {
        logger11.throwError("types/values length mismatch", Logger.errors.INVALID_ARGUMENT, {
          count: { types: types.length, values: values.length },
          value: { types, values }
        });
      }
      const coders = types.map((type) => this._getCoder(ParamType.from(type)));
      const coder = new TupleCoder(coders, "_");
      const writer = this._getWriter();
      coder.encode(writer, values);
      return writer.data;
    }
    decode(types, data4, loose) {
      const coders = types.map((type) => this._getCoder(ParamType.from(type)));
      const coder = new TupleCoder(coders, "_");
      return coder.decode(this._getReader(arrayify(data4), loose));
    }
  };
  var defaultAbiCoder = new AbiCoder();

  // node_modules/@ethersproject/hash/lib.esm/id.js
  function id(text) {
    return keccak256(toUtf8Bytes(text));
  }

  // node_modules/@ethersproject/hash/lib.esm/_version.js
  var version9 = "hash/5.2.0";

  // node_modules/@ethersproject/hash/lib.esm/namehash.js
  var logger12 = new Logger(version9);
  var Zeros = new Uint8Array(32);
  Zeros.fill(0);
  var Partition = new RegExp("^((.*)\\.)?([^.]+)$");
  function isValidName(name2) {
    try {
      const comps = name2.split(".");
      for (let i = 0; i < comps.length; i++) {
        if (nameprep(comps[i]).length === 0) {
          throw new Error("empty");
        }
      }
      return true;
    } catch (error) {
    }
    return false;
  }
  function namehash(name2) {
    if (typeof name2 !== "string") {
      logger12.throwArgumentError("invalid address - " + String(name2), "name", name2);
    }
    let result = Zeros;
    while (name2.length) {
      const partition = name2.match(Partition);
      const label = toUtf8Bytes(nameprep(partition[3]));
      result = keccak256(concat([result, keccak256(label)]));
      name2 = partition[2] || "";
    }
    return hexlify(result);
  }

  // node_modules/@ethersproject/hash/lib.esm/message.js
  var messagePrefix = "Ethereum Signed Message:\n";
  function hashMessage(message) {
    if (typeof message === "string") {
      message = toUtf8Bytes(message);
    }
    return keccak256(concat([
      toUtf8Bytes(messagePrefix),
      toUtf8Bytes(String(message.length)),
      message
    ]));
  }

  // node_modules/@ethersproject/hash/lib.esm/typed-data.js
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger13 = new Logger(version9);
  var padding = new Uint8Array(32);
  padding.fill(0);
  var NegativeOne3 = BigNumber.from(-1);
  var Zero3 = BigNumber.from(0);
  var One2 = BigNumber.from(1);
  var MaxUint2562 = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  function hexPadRight(value) {
    const bytes = arrayify(value);
    const padOffset = bytes.length % 32;
    if (padOffset) {
      return hexConcat([bytes, padding.slice(padOffset)]);
    }
    return hexlify(bytes);
  }
  var hexTrue = hexZeroPad(One2.toHexString(), 32);
  var hexFalse = hexZeroPad(Zero3.toHexString(), 32);
  var domainFieldTypes = {
    name: "string",
    version: "string",
    chainId: "uint256",
    verifyingContract: "address",
    salt: "bytes32"
  };
  var domainFieldNames = [
    "name",
    "version",
    "chainId",
    "verifyingContract",
    "salt"
  ];
  function checkString(key2) {
    return function(value) {
      if (typeof value !== "string") {
        logger13.throwArgumentError(`invalid domain value for ${JSON.stringify(key2)}`, `domain.${key2}`, value);
      }
      return value;
    };
  }
  var domainChecks = {
    name: checkString("name"),
    version: checkString("version"),
    chainId: function(value) {
      try {
        return BigNumber.from(value).toString();
      } catch (error) {
      }
      return logger13.throwArgumentError(`invalid domain value for "chainId"`, "domain.chainId", value);
    },
    verifyingContract: function(value) {
      try {
        return getAddress(value).toLowerCase();
      } catch (error) {
      }
      return logger13.throwArgumentError(`invalid domain value "verifyingContract"`, "domain.verifyingContract", value);
    },
    salt: function(value) {
      try {
        const bytes = arrayify(value);
        if (bytes.length !== 32) {
          throw new Error("bad length");
        }
        return hexlify(bytes);
      } catch (error) {
      }
      return logger13.throwArgumentError(`invalid domain value "salt"`, "domain.salt", value);
    }
  };
  function getBaseEncoder(type) {
    {
      const match = type.match(/^(u?)int(\d*)$/);
      if (match) {
        const signed = match[1] === "";
        const width = parseInt(match[2] || "256");
        if (width % 8 !== 0 || width > 256 || match[2] && match[2] !== String(width)) {
          logger13.throwArgumentError("invalid numeric width", "type", type);
        }
        const boundsUpper = MaxUint2562.mask(signed ? width - 1 : width);
        const boundsLower = signed ? boundsUpper.add(One2).mul(NegativeOne3) : Zero3;
        return function(value) {
          const v = BigNumber.from(value);
          if (v.lt(boundsLower) || v.gt(boundsUpper)) {
            logger13.throwArgumentError(`value out-of-bounds for ${type}`, "value", value);
          }
          return hexZeroPad(v.toTwos(256).toHexString(), 32);
        };
      }
    }
    {
      const match = type.match(/^bytes(\d+)$/);
      if (match) {
        const width = parseInt(match[1]);
        if (width === 0 || width > 32 || match[1] !== String(width)) {
          logger13.throwArgumentError("invalid bytes width", "type", type);
        }
        return function(value) {
          const bytes = arrayify(value);
          if (bytes.length !== width) {
            logger13.throwArgumentError(`invalid length for ${type}`, "value", value);
          }
          return hexPadRight(value);
        };
      }
    }
    switch (type) {
      case "address":
        return function(value) {
          return hexZeroPad(getAddress(value), 32);
        };
      case "bool":
        return function(value) {
          return !value ? hexFalse : hexTrue;
        };
      case "bytes":
        return function(value) {
          return keccak256(value);
        };
      case "string":
        return function(value) {
          return id(value);
        };
    }
    return null;
  }
  function encodeType(name2, fields) {
    return `${name2}(${fields.map(({ name: name3, type }) => type + " " + name3).join(",")})`;
  }
  var TypedDataEncoder = class {
    constructor(types) {
      defineReadOnly(this, "types", Object.freeze(deepCopy(types)));
      defineReadOnly(this, "_encoderCache", {});
      defineReadOnly(this, "_types", {});
      const links = {};
      const parents = {};
      const subtypes = {};
      Object.keys(types).forEach((type) => {
        links[type] = {};
        parents[type] = [];
        subtypes[type] = {};
      });
      for (const name2 in types) {
        const uniqueNames = {};
        types[name2].forEach((field) => {
          if (uniqueNames[field.name]) {
            logger13.throwArgumentError(`duplicate variable name ${JSON.stringify(field.name)} in ${JSON.stringify(name2)}`, "types", types);
          }
          uniqueNames[field.name] = true;
          const baseType = field.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
          if (baseType === name2) {
            logger13.throwArgumentError(`circular type reference to ${JSON.stringify(baseType)}`, "types", types);
          }
          const encoder = getBaseEncoder(baseType);
          if (encoder) {
            return;
          }
          if (!parents[baseType]) {
            logger13.throwArgumentError(`unknown type ${JSON.stringify(baseType)}`, "types", types);
          }
          parents[baseType].push(name2);
          links[name2][baseType] = true;
        });
      }
      const primaryTypes = Object.keys(parents).filter((n) => parents[n].length === 0);
      if (primaryTypes.length === 0) {
        logger13.throwArgumentError("missing primary type", "types", types);
      } else if (primaryTypes.length > 1) {
        logger13.throwArgumentError(`ambiguous primary types or unused types: ${primaryTypes.map((t) => JSON.stringify(t)).join(", ")}`, "types", types);
      }
      defineReadOnly(this, "primaryType", primaryTypes[0]);
      function checkCircular(type, found) {
        if (found[type]) {
          logger13.throwArgumentError(`circular type reference to ${JSON.stringify(type)}`, "types", types);
        }
        found[type] = true;
        Object.keys(links[type]).forEach((child) => {
          if (!parents[child]) {
            return;
          }
          checkCircular(child, found);
          Object.keys(found).forEach((subtype) => {
            subtypes[subtype][child] = true;
          });
        });
        delete found[type];
      }
      checkCircular(this.primaryType, {});
      for (const name2 in subtypes) {
        const st = Object.keys(subtypes[name2]);
        st.sort();
        this._types[name2] = encodeType(name2, types[name2]) + st.map((t) => encodeType(t, types[t])).join("");
      }
    }
    getEncoder(type) {
      let encoder = this._encoderCache[type];
      if (!encoder) {
        encoder = this._encoderCache[type] = this._getEncoder(type);
      }
      return encoder;
    }
    _getEncoder(type) {
      {
        const encoder = getBaseEncoder(type);
        if (encoder) {
          return encoder;
        }
      }
      const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
      if (match) {
        const subtype = match[1];
        const subEncoder = this.getEncoder(subtype);
        const length = parseInt(match[3]);
        return (value) => {
          if (length >= 0 && value.length !== length) {
            logger13.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
          }
          let result = value.map(subEncoder);
          if (this._types[subtype]) {
            result = result.map(keccak256);
          }
          return keccak256(hexConcat(result));
        };
      }
      const fields = this.types[type];
      if (fields) {
        const encodedType = id(this._types[type]);
        return (value) => {
          const values = fields.map(({ name: name2, type: type2 }) => {
            const result = this.getEncoder(type2)(value[name2]);
            if (this._types[type2]) {
              return keccak256(result);
            }
            return result;
          });
          values.unshift(encodedType);
          return hexConcat(values);
        };
      }
      return logger13.throwArgumentError(`unknown type: ${type}`, "type", type);
    }
    encodeType(name2) {
      const result = this._types[name2];
      if (!result) {
        logger13.throwArgumentError(`unknown type: ${JSON.stringify(name2)}`, "name", name2);
      }
      return result;
    }
    encodeData(type, value) {
      return this.getEncoder(type)(value);
    }
    hashStruct(name2, value) {
      return keccak256(this.encodeData(name2, value));
    }
    encode(value) {
      return this.encodeData(this.primaryType, value);
    }
    hash(value) {
      return this.hashStruct(this.primaryType, value);
    }
    _visit(type, value, callback) {
      {
        const encoder = getBaseEncoder(type);
        if (encoder) {
          return callback(type, value);
        }
      }
      const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
      if (match) {
        const subtype = match[1];
        const length = parseInt(match[3]);
        if (length >= 0 && value.length !== length) {
          logger13.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
        }
        return value.map((v) => this._visit(subtype, v, callback));
      }
      const fields = this.types[type];
      if (fields) {
        return fields.reduce((accum, { name: name2, type: type2 }) => {
          accum[name2] = this._visit(type2, value[name2], callback);
          return accum;
        }, {});
      }
      return logger13.throwArgumentError(`unknown type: ${type}`, "type", type);
    }
    visit(value, callback) {
      return this._visit(this.primaryType, value, callback);
    }
    static from(types) {
      return new TypedDataEncoder(types);
    }
    static getPrimaryType(types) {
      return TypedDataEncoder.from(types).primaryType;
    }
    static hashStruct(name2, types, value) {
      return TypedDataEncoder.from(types).hashStruct(name2, value);
    }
    static hashDomain(domain) {
      const domainFields = [];
      for (const name2 in domain) {
        const type = domainFieldTypes[name2];
        if (!type) {
          logger13.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(name2)}`, "domain", domain);
        }
        domainFields.push({ name: name2, type });
      }
      domainFields.sort((a, b) => {
        return domainFieldNames.indexOf(a.name) - domainFieldNames.indexOf(b.name);
      });
      return TypedDataEncoder.hashStruct("EIP712Domain", { EIP712Domain: domainFields }, domain);
    }
    static encode(domain, types, value) {
      return hexConcat([
        "0x1901",
        TypedDataEncoder.hashDomain(domain),
        TypedDataEncoder.from(types).hash(value)
      ]);
    }
    static hash(domain, types, value) {
      return keccak256(TypedDataEncoder.encode(domain, types, value));
    }
    static resolveNames(domain, types, value, resolveName2) {
      return __awaiter2(this, void 0, void 0, function* () {
        domain = shallowCopy(domain);
        const ensCache = {};
        if (domain.verifyingContract && !isHexString(domain.verifyingContract, 20)) {
          ensCache[domain.verifyingContract] = "0x";
        }
        const encoder = TypedDataEncoder.from(types);
        encoder.visit(value, (type, value2) => {
          if (type === "address" && !isHexString(value2, 20)) {
            ensCache[value2] = "0x";
          }
          return value2;
        });
        for (const name2 in ensCache) {
          ensCache[name2] = yield resolveName2(name2);
        }
        if (domain.verifyingContract && ensCache[domain.verifyingContract]) {
          domain.verifyingContract = ensCache[domain.verifyingContract];
        }
        value = encoder.visit(value, (type, value2) => {
          if (type === "address" && ensCache[value2]) {
            return ensCache[value2];
          }
          return value2;
        });
        return { domain, value };
      });
    }
    static getPayload(domain, types, value) {
      TypedDataEncoder.hashDomain(domain);
      const domainValues = {};
      const domainTypes = [];
      domainFieldNames.forEach((name2) => {
        const value2 = domain[name2];
        if (value2 == null) {
          return;
        }
        domainValues[name2] = domainChecks[name2](value2);
        domainTypes.push({ name: name2, type: domainFieldTypes[name2] });
      });
      const encoder = TypedDataEncoder.from(types);
      const typesWithDomain = shallowCopy(types);
      if (typesWithDomain.EIP712Domain) {
        logger13.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", types);
      } else {
        typesWithDomain.EIP712Domain = domainTypes;
      }
      encoder.encode(value);
      return {
        types: typesWithDomain,
        domain: domainValues,
        primaryType: encoder.primaryType,
        message: encoder.visit(value, (type, value2) => {
          if (type.match(/^bytes(\d*)/)) {
            return hexlify(arrayify(value2));
          }
          if (type.match(/^u?int/)) {
            return BigNumber.from(value2).toString();
          }
          switch (type) {
            case "address":
              return value2.toLowerCase();
            case "bool":
              return !!value2;
            case "string":
              if (typeof value2 !== "string") {
                logger13.throwArgumentError(`invalid string`, "value", value2);
              }
              return value2;
          }
          return logger13.throwArgumentError("unsupported type", "type", type);
        })
      };
    }
  };

  // node_modules/@ethersproject/hash/lib.esm/index.js
  "use strict";

  // node_modules/@ethersproject/abi/lib.esm/interface.js
  "use strict";
  var logger14 = new Logger(version5);
  var LogDescription = class extends Description {
  };
  var TransactionDescription = class extends Description {
  };
  var Indexed = class extends Description {
    static isIndexed(value) {
      return !!(value && value._isIndexed);
    }
  };
  var BuiltinErrors = {
    "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: true },
    "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] }
  };
  function wrapAccessError(property, error) {
    const wrap = new Error(`deferred error during ABI decoding triggered accessing ${property}`);
    wrap.error = error;
    return wrap;
  }
  var Interface = class {
    constructor(fragments) {
      logger14.checkNew(new.target, Interface);
      let abi4 = [];
      if (typeof fragments === "string") {
        abi4 = JSON.parse(fragments);
      } else {
        abi4 = fragments;
      }
      defineReadOnly(this, "fragments", abi4.map((fragment) => {
        return Fragment.from(fragment);
      }).filter((fragment) => fragment != null));
      defineReadOnly(this, "_abiCoder", getStatic(new.target, "getAbiCoder")());
      defineReadOnly(this, "functions", {});
      defineReadOnly(this, "errors", {});
      defineReadOnly(this, "events", {});
      defineReadOnly(this, "structs", {});
      this.fragments.forEach((fragment) => {
        let bucket = null;
        switch (fragment.type) {
          case "constructor":
            if (this.deploy) {
              logger14.warn("duplicate definition - constructor");
              return;
            }
            defineReadOnly(this, "deploy", fragment);
            return;
          case "function":
            bucket = this.functions;
            break;
          case "event":
            bucket = this.events;
            break;
          case "error":
            bucket = this.errors;
            break;
          default:
            return;
        }
        let signature2 = fragment.format();
        if (bucket[signature2]) {
          logger14.warn("duplicate definition - " + signature2);
          return;
        }
        bucket[signature2] = fragment;
      });
      if (!this.deploy) {
        defineReadOnly(this, "deploy", ConstructorFragment.from({
          payable: false,
          type: "constructor"
        }));
      }
      defineReadOnly(this, "_isInterface", true);
    }
    format(format) {
      if (!format) {
        format = FormatTypes.full;
      }
      if (format === FormatTypes.sighash) {
        logger14.throwArgumentError("interface does not support formatting sighash", "format", format);
      }
      const abi4 = this.fragments.map((fragment) => fragment.format(format));
      if (format === FormatTypes.json) {
        return JSON.stringify(abi4.map((j) => JSON.parse(j)));
      }
      return abi4;
    }
    static getAbiCoder() {
      return defaultAbiCoder;
    }
    static getAddress(address) {
      return getAddress(address);
    }
    static getSighash(fragment) {
      return hexDataSlice(id(fragment.format()), 0, 4);
    }
    static getEventTopic(eventFragment) {
      return id(eventFragment.format());
    }
    getFunction(nameOrSignatureOrSighash) {
      if (isHexString(nameOrSignatureOrSighash)) {
        for (const name2 in this.functions) {
          if (nameOrSignatureOrSighash === this.getSighash(name2)) {
            return this.functions[name2];
          }
        }
        logger14.throwArgumentError("no matching function", "sighash", nameOrSignatureOrSighash);
      }
      if (nameOrSignatureOrSighash.indexOf("(") === -1) {
        const name2 = nameOrSignatureOrSighash.trim();
        const matching = Object.keys(this.functions).filter((f) => f.split("(")[0] === name2);
        if (matching.length === 0) {
          logger14.throwArgumentError("no matching function", "name", name2);
        } else if (matching.length > 1) {
          logger14.throwArgumentError("multiple matching functions", "name", name2);
        }
        return this.functions[matching[0]];
      }
      const result = this.functions[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
      if (!result) {
        logger14.throwArgumentError("no matching function", "signature", nameOrSignatureOrSighash);
      }
      return result;
    }
    getEvent(nameOrSignatureOrTopic) {
      if (isHexString(nameOrSignatureOrTopic)) {
        const topichash = nameOrSignatureOrTopic.toLowerCase();
        for (const name2 in this.events) {
          if (topichash === this.getEventTopic(name2)) {
            return this.events[name2];
          }
        }
        logger14.throwArgumentError("no matching event", "topichash", topichash);
      }
      if (nameOrSignatureOrTopic.indexOf("(") === -1) {
        const name2 = nameOrSignatureOrTopic.trim();
        const matching = Object.keys(this.events).filter((f) => f.split("(")[0] === name2);
        if (matching.length === 0) {
          logger14.throwArgumentError("no matching event", "name", name2);
        } else if (matching.length > 1) {
          logger14.throwArgumentError("multiple matching events", "name", name2);
        }
        return this.events[matching[0]];
      }
      const result = this.events[EventFragment.fromString(nameOrSignatureOrTopic).format()];
      if (!result) {
        logger14.throwArgumentError("no matching event", "signature", nameOrSignatureOrTopic);
      }
      return result;
    }
    getError(nameOrSignatureOrSighash) {
      if (isHexString(nameOrSignatureOrSighash)) {
        const getSighash = getStatic(this.constructor, "getSighash");
        for (const name2 in this.errors) {
          const error = this.errors[name2];
          if (nameOrSignatureOrSighash === getSighash(error)) {
            return this.errors[name2];
          }
        }
        logger14.throwArgumentError("no matching error", "sighash", nameOrSignatureOrSighash);
      }
      if (nameOrSignatureOrSighash.indexOf("(") === -1) {
        const name2 = nameOrSignatureOrSighash.trim();
        const matching = Object.keys(this.errors).filter((f) => f.split("(")[0] === name2);
        if (matching.length === 0) {
          logger14.throwArgumentError("no matching error", "name", name2);
        } else if (matching.length > 1) {
          logger14.throwArgumentError("multiple matching errors", "name", name2);
        }
        return this.errors[matching[0]];
      }
      const result = this.errors[FunctionFragment.fromString(nameOrSignatureOrSighash).format()];
      if (!result) {
        logger14.throwArgumentError("no matching error", "signature", nameOrSignatureOrSighash);
      }
      return result;
    }
    getSighash(functionFragment) {
      if (typeof functionFragment === "string") {
        functionFragment = this.getFunction(functionFragment);
      }
      return getStatic(this.constructor, "getSighash")(functionFragment);
    }
    getEventTopic(eventFragment) {
      if (typeof eventFragment === "string") {
        eventFragment = this.getEvent(eventFragment);
      }
      return getStatic(this.constructor, "getEventTopic")(eventFragment);
    }
    _decodeParams(params, data4) {
      return this._abiCoder.decode(params, data4);
    }
    _encodeParams(params, values) {
      return this._abiCoder.encode(params, values);
    }
    encodeDeploy(values) {
      return this._encodeParams(this.deploy.inputs, values || []);
    }
    decodeFunctionData(functionFragment, data4) {
      if (typeof functionFragment === "string") {
        functionFragment = this.getFunction(functionFragment);
      }
      const bytes = arrayify(data4);
      if (hexlify(bytes.slice(0, 4)) !== this.getSighash(functionFragment)) {
        logger14.throwArgumentError(`data signature does not match function ${functionFragment.name}.`, "data", hexlify(bytes));
      }
      return this._decodeParams(functionFragment.inputs, bytes.slice(4));
    }
    encodeFunctionData(functionFragment, values) {
      if (typeof functionFragment === "string") {
        functionFragment = this.getFunction(functionFragment);
      }
      return hexlify(concat([
        this.getSighash(functionFragment),
        this._encodeParams(functionFragment.inputs, values || [])
      ]));
    }
    decodeFunctionResult(functionFragment, data4) {
      if (typeof functionFragment === "string") {
        functionFragment = this.getFunction(functionFragment);
      }
      let bytes = arrayify(data4);
      let reason = null;
      let errorArgs = null;
      let errorName = null;
      let errorSignature = null;
      switch (bytes.length % this._abiCoder._getWordSize()) {
        case 0:
          try {
            return this._abiCoder.decode(functionFragment.outputs, bytes);
          } catch (error) {
          }
          break;
        case 4: {
          const selector = hexlify(bytes.slice(0, 4));
          const builtin = BuiltinErrors[selector];
          if (builtin) {
            errorArgs = this._abiCoder.decode(builtin.inputs, bytes.slice(4));
            errorName = builtin.name;
            errorSignature = builtin.signature;
            if (builtin.reason) {
              reason = errorArgs[0];
            }
          } else {
            try {
              const error = this.getError(selector);
              errorArgs = this._abiCoder.decode(error.inputs, bytes.slice(4));
              errorName = error.name;
              errorSignature = error.format();
            } catch (error) {
              console.log(error);
            }
          }
          break;
        }
      }
      return logger14.throwError("call revert exception", Logger.errors.CALL_EXCEPTION, {
        method: functionFragment.format(),
        errorArgs,
        errorName,
        errorSignature,
        reason
      });
    }
    encodeFunctionResult(functionFragment, values) {
      if (typeof functionFragment === "string") {
        functionFragment = this.getFunction(functionFragment);
      }
      return hexlify(this._abiCoder.encode(functionFragment.outputs, values || []));
    }
    encodeFilterTopics(eventFragment, values) {
      if (typeof eventFragment === "string") {
        eventFragment = this.getEvent(eventFragment);
      }
      if (values.length > eventFragment.inputs.length) {
        logger14.throwError("too many arguments for " + eventFragment.format(), Logger.errors.UNEXPECTED_ARGUMENT, {
          argument: "values",
          value: values
        });
      }
      let topics = [];
      if (!eventFragment.anonymous) {
        topics.push(this.getEventTopic(eventFragment));
      }
      const encodeTopic = (param, value) => {
        if (param.type === "string") {
          return id(value);
        } else if (param.type === "bytes") {
          return keccak256(hexlify(value));
        }
        if (param.type === "address") {
          this._abiCoder.encode(["address"], [value]);
        }
        return hexZeroPad(hexlify(value), 32);
      };
      values.forEach((value, index) => {
        let param = eventFragment.inputs[index];
        if (!param.indexed) {
          if (value != null) {
            logger14.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + param.name, value);
          }
          return;
        }
        if (value == null) {
          topics.push(null);
        } else if (param.baseType === "array" || param.baseType === "tuple") {
          logger14.throwArgumentError("filtering with tuples or arrays not supported", "contract." + param.name, value);
        } else if (Array.isArray(value)) {
          topics.push(value.map((value2) => encodeTopic(param, value2)));
        } else {
          topics.push(encodeTopic(param, value));
        }
      });
      while (topics.length && topics[topics.length - 1] === null) {
        topics.pop();
      }
      return topics;
    }
    encodeEventLog(eventFragment, values) {
      if (typeof eventFragment === "string") {
        eventFragment = this.getEvent(eventFragment);
      }
      const topics = [];
      const dataTypes = [];
      const dataValues = [];
      if (!eventFragment.anonymous) {
        topics.push(this.getEventTopic(eventFragment));
      }
      if (values.length !== eventFragment.inputs.length) {
        logger14.throwArgumentError("event arguments/values mismatch", "values", values);
      }
      eventFragment.inputs.forEach((param, index) => {
        const value = values[index];
        if (param.indexed) {
          if (param.type === "string") {
            topics.push(id(value));
          } else if (param.type === "bytes") {
            topics.push(keccak256(value));
          } else if (param.baseType === "tuple" || param.baseType === "array") {
            throw new Error("not implemented");
          } else {
            topics.push(this._abiCoder.encode([param.type], [value]));
          }
        } else {
          dataTypes.push(param);
          dataValues.push(value);
        }
      });
      return {
        data: this._abiCoder.encode(dataTypes, dataValues),
        topics
      };
    }
    decodeEventLog(eventFragment, data4, topics) {
      if (typeof eventFragment === "string") {
        eventFragment = this.getEvent(eventFragment);
      }
      if (topics != null && !eventFragment.anonymous) {
        let topicHash = this.getEventTopic(eventFragment);
        if (!isHexString(topics[0], 32) || topics[0].toLowerCase() !== topicHash) {
          logger14.throwError("fragment/topic mismatch", Logger.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: topicHash, value: topics[0] });
        }
        topics = topics.slice(1);
      }
      let indexed = [];
      let nonIndexed = [];
      let dynamic = [];
      eventFragment.inputs.forEach((param, index) => {
        if (param.indexed) {
          if (param.type === "string" || param.type === "bytes" || param.baseType === "tuple" || param.baseType === "array") {
            indexed.push(ParamType.fromObject({ type: "bytes32", name: param.name }));
            dynamic.push(true);
          } else {
            indexed.push(param);
            dynamic.push(false);
          }
        } else {
          nonIndexed.push(param);
          dynamic.push(false);
        }
      });
      let resultIndexed = topics != null ? this._abiCoder.decode(indexed, concat(topics)) : null;
      let resultNonIndexed = this._abiCoder.decode(nonIndexed, data4, true);
      let result = [];
      let nonIndexedIndex = 0, indexedIndex = 0;
      eventFragment.inputs.forEach((param, index) => {
        if (param.indexed) {
          if (resultIndexed == null) {
            result[index] = new Indexed({ _isIndexed: true, hash: null });
          } else if (dynamic[index]) {
            result[index] = new Indexed({ _isIndexed: true, hash: resultIndexed[indexedIndex++] });
          } else {
            try {
              result[index] = resultIndexed[indexedIndex++];
            } catch (error) {
              result[index] = error;
            }
          }
        } else {
          try {
            result[index] = resultNonIndexed[nonIndexedIndex++];
          } catch (error) {
            result[index] = error;
          }
        }
        if (param.name && result[param.name] == null) {
          const value = result[index];
          if (value instanceof Error) {
            Object.defineProperty(result, param.name, {
              get: () => {
                throw wrapAccessError(`property ${JSON.stringify(param.name)}`, value);
              }
            });
          } else {
            result[param.name] = value;
          }
        }
      });
      for (let i = 0; i < result.length; i++) {
        const value = result[i];
        if (value instanceof Error) {
          Object.defineProperty(result, i, {
            get: () => {
              throw wrapAccessError(`index ${i}`, value);
            }
          });
        }
      }
      return Object.freeze(result);
    }
    parseTransaction(tx) {
      let fragment = this.getFunction(tx.data.substring(0, 10).toLowerCase());
      if (!fragment) {
        return null;
      }
      return new TransactionDescription({
        args: this._abiCoder.decode(fragment.inputs, "0x" + tx.data.substring(10)),
        functionFragment: fragment,
        name: fragment.name,
        signature: fragment.format(),
        sighash: this.getSighash(fragment),
        value: BigNumber.from(tx.value || "0")
      });
    }
    parseLog(log) {
      let fragment = this.getEvent(log.topics[0]);
      if (!fragment || fragment.anonymous) {
        return null;
      }
      return new LogDescription({
        eventFragment: fragment,
        name: fragment.name,
        signature: fragment.format(),
        topic: this.getEventTopic(fragment),
        args: this.decodeEventLog(fragment, log.data, log.topics)
      });
    }
    static isInterface(value) {
      return !!(value && value._isInterface);
    }
  };

  // node_modules/@ethersproject/abi/lib.esm/index.js
  "use strict";

  // node_modules/@ethersproject/abstract-provider/lib.esm/_version.js
  var version10 = "abstract-provider/5.2.0";

  // node_modules/@ethersproject/abstract-provider/lib.esm/index.js
  "use strict";
  var logger15 = new Logger(version10);
  var ForkEvent = class extends Description {
    static isForkEvent(value) {
      return !!(value && value._isForkEvent);
    }
  };
  var Provider = class {
    constructor() {
      logger15.checkAbstract(new.target, Provider);
      defineReadOnly(this, "_isProvider", true);
    }
    addListener(eventName, listener) {
      return this.on(eventName, listener);
    }
    removeListener(eventName, listener) {
      return this.off(eventName, listener);
    }
    static isProvider(value) {
      return !!(value && value._isProvider);
    }
  };

  // node_modules/@ethersproject/abstract-signer/lib.esm/_version.js
  var version11 = "abstract-signer/5.2.0";

  // node_modules/@ethersproject/abstract-signer/lib.esm/index.js
  "use strict";
  var __awaiter3 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger16 = new Logger(version11);
  var allowedTransactionKeys = [
    "accessList",
    "chainId",
    "data",
    "from",
    "gasLimit",
    "gasPrice",
    "nonce",
    "to",
    "type",
    "value"
  ];
  var forwardErrors = [
    Logger.errors.INSUFFICIENT_FUNDS,
    Logger.errors.NONCE_EXPIRED,
    Logger.errors.REPLACEMENT_UNDERPRICED
  ];
  var Signer = class {
    constructor() {
      logger16.checkAbstract(new.target, Signer);
      defineReadOnly(this, "_isSigner", true);
    }
    getBalance(blockTag) {
      return __awaiter3(this, void 0, void 0, function* () {
        this._checkProvider("getBalance");
        return yield this.provider.getBalance(this.getAddress(), blockTag);
      });
    }
    getTransactionCount(blockTag) {
      return __awaiter3(this, void 0, void 0, function* () {
        this._checkProvider("getTransactionCount");
        return yield this.provider.getTransactionCount(this.getAddress(), blockTag);
      });
    }
    estimateGas(transaction) {
      return __awaiter3(this, void 0, void 0, function* () {
        this._checkProvider("estimateGas");
        const tx = yield resolveProperties(this.checkTransaction(transaction));
        return yield this.provider.estimateGas(tx);
      });
    }
    call(transaction, blockTag) {
      return __awaiter3(this, void 0, void 0, function* () {
        this._checkProvider("call");
        const tx = yield resolveProperties(this.checkTransaction(transaction));
        return yield this.provider.call(tx, blockTag);
      });
    }
    sendTransaction(transaction) {
      this._checkProvider("sendTransaction");
      return this.populateTransaction(transaction).then((tx) => {
        return this.signTransaction(tx).then((signedTx) => {
          return this.provider.sendTransaction(signedTx);
        });
      });
    }
    getChainId() {
      return __awaiter3(this, void 0, void 0, function* () {
        this._checkProvider("getChainId");
        const network = yield this.provider.getNetwork();
        return network.chainId;
      });
    }
    getGasPrice() {
      return __awaiter3(this, void 0, void 0, function* () {
        this._checkProvider("getGasPrice");
        return yield this.provider.getGasPrice();
      });
    }
    resolveName(name2) {
      return __awaiter3(this, void 0, void 0, function* () {
        this._checkProvider("resolveName");
        return yield this.provider.resolveName(name2);
      });
    }
    checkTransaction(transaction) {
      for (const key2 in transaction) {
        if (allowedTransactionKeys.indexOf(key2) === -1) {
          logger16.throwArgumentError("invalid transaction key: " + key2, "transaction", transaction);
        }
      }
      const tx = shallowCopy(transaction);
      if (tx.from == null) {
        tx.from = this.getAddress();
      } else {
        tx.from = Promise.all([
          Promise.resolve(tx.from),
          this.getAddress()
        ]).then((result) => {
          if (result[0].toLowerCase() !== result[1].toLowerCase()) {
            logger16.throwArgumentError("from address mismatch", "transaction", transaction);
          }
          return result[0];
        });
      }
      return tx;
    }
    populateTransaction(transaction) {
      return __awaiter3(this, void 0, void 0, function* () {
        const tx = yield resolveProperties(this.checkTransaction(transaction));
        if (tx.to != null) {
          tx.to = Promise.resolve(tx.to).then((to) => __awaiter3(this, void 0, void 0, function* () {
            if (to == null) {
              return null;
            }
            const address = yield this.resolveName(to);
            if (address == null) {
              logger16.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
            }
            return address;
          }));
        }
        if (tx.gasPrice == null) {
          tx.gasPrice = this.getGasPrice();
        }
        if (tx.nonce == null) {
          tx.nonce = this.getTransactionCount("pending");
        }
        if (tx.gasLimit == null) {
          tx.gasLimit = this.estimateGas(tx).catch((error) => {
            if (forwardErrors.indexOf(error.code) >= 0) {
              throw error;
            }
            return logger16.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
              error,
              tx
            });
          });
        }
        if (tx.chainId == null) {
          tx.chainId = this.getChainId();
        } else {
          tx.chainId = Promise.all([
            Promise.resolve(tx.chainId),
            this.getChainId()
          ]).then((results) => {
            if (results[1] !== 0 && results[0] !== results[1]) {
              logger16.throwArgumentError("chainId address mismatch", "transaction", transaction);
            }
            return results[0];
          });
        }
        return yield resolveProperties(tx);
      });
    }
    _checkProvider(operation) {
      if (!this.provider) {
        logger16.throwError("missing provider", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: operation || "_checkProvider"
        });
      }
    }
    static isSigner(value) {
      return !!(value && value._isSigner);
    }
  };
  var VoidSigner = class extends Signer {
    constructor(address, provider) {
      logger16.checkNew(new.target, VoidSigner);
      super();
      defineReadOnly(this, "address", address);
      defineReadOnly(this, "provider", provider || null);
    }
    getAddress() {
      return Promise.resolve(this.address);
    }
    _fail(message, operation) {
      return Promise.resolve().then(() => {
        logger16.throwError(message, Logger.errors.UNSUPPORTED_OPERATION, { operation });
      });
    }
    signMessage(message) {
      return this._fail("VoidSigner cannot sign messages", "signMessage");
    }
    signTransaction(transaction) {
      return this._fail("VoidSigner cannot sign transactions", "signTransaction");
    }
    _signTypedData(domain, types, value) {
      return this._fail("VoidSigner cannot sign typed data", "signTypedData");
    }
    connect(provider) {
      return new VoidSigner(this.address, provider);
    }
  };

  // node_modules/@ethersproject/signing-key/lib.esm/elliptic.js
  var import_bn2 = __toModule(require_bn());
  var import_hash2 = __toModule(require_hash());
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function createCommonjsModule(fn, basedir, module) {
    return module = {
      path: basedir,
      exports: {},
      require: function(path, base2) {
        return commonjsRequire(path, base2 === void 0 || base2 === null ? module.path : base2);
      }
    }, fn(module, module.exports), module.exports;
  }
  function commonjsRequire() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
  }
  var minimalisticAssert = assert;
  function assert(val, msg) {
    if (!val)
      throw new Error(msg || "Assertion failed");
  }
  assert.equal = function assertEqual(l, r, msg) {
    if (l != r)
      throw new Error(msg || "Assertion failed: " + l + " != " + r);
  };
  var utils_1 = createCommonjsModule(function(module, exports) {
    "use strict";
    var utils = exports;
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg !== "string") {
        for (var i = 0; i < msg.length; i++)
          res[i] = msg[i] | 0;
        return res;
      }
      if (enc === "hex") {
        msg = msg.replace(/[^a-z0-9]+/ig, "");
        if (msg.length % 2 !== 0)
          msg = "0" + msg;
        for (var i = 0; i < msg.length; i += 2)
          res.push(parseInt(msg[i] + msg[i + 1], 16));
      } else {
        for (var i = 0; i < msg.length; i++) {
          var c = msg.charCodeAt(i);
          var hi = c >> 8;
          var lo = c & 255;
          if (hi)
            res.push(hi, lo);
          else
            res.push(lo);
        }
      }
      return res;
    }
    utils.toArray = toArray;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    utils.zero2 = zero2;
    function toHex2(msg) {
      var res = "";
      for (var i = 0; i < msg.length; i++)
        res += zero2(msg[i].toString(16));
      return res;
    }
    utils.toHex = toHex2;
    utils.encode = function encode4(arr, enc) {
      if (enc === "hex")
        return toHex2(arr);
      else
        return arr;
    };
  });
  var utils_1$1 = createCommonjsModule(function(module, exports) {
    "use strict";
    var utils = exports;
    utils.assert = minimalisticAssert;
    utils.toArray = utils_1.toArray;
    utils.zero2 = utils_1.zero2;
    utils.toHex = utils_1.toHex;
    utils.encode = utils_1.encode;
    function getNAF2(num, w, bits) {
      var naf = new Array(Math.max(num.bitLength(), bits) + 1);
      naf.fill(0);
      var ws = 1 << w + 1;
      var k = num.clone();
      for (var i = 0; i < naf.length; i++) {
        var z;
        var mod = k.andln(ws - 1);
        if (k.isOdd()) {
          if (mod > (ws >> 1) - 1)
            z = (ws >> 1) - mod;
          else
            z = mod;
          k.isubn(z);
        } else {
          z = 0;
        }
        naf[i] = z;
        k.iushrn(1);
      }
      return naf;
    }
    utils.getNAF = getNAF2;
    function getJSF2(k1, k2) {
      var jsf = [
        [],
        []
      ];
      k1 = k1.clone();
      k2 = k2.clone();
      var d1 = 0;
      var d2 = 0;
      var m8;
      while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
        var m14 = k1.andln(3) + d1 & 3;
        var m24 = k2.andln(3) + d2 & 3;
        if (m14 === 3)
          m14 = -1;
        if (m24 === 3)
          m24 = -1;
        var u1;
        if ((m14 & 1) === 0) {
          u1 = 0;
        } else {
          m8 = k1.andln(7) + d1 & 7;
          if ((m8 === 3 || m8 === 5) && m24 === 2)
            u1 = -m14;
          else
            u1 = m14;
        }
        jsf[0].push(u1);
        var u2;
        if ((m24 & 1) === 0) {
          u2 = 0;
        } else {
          m8 = k2.andln(7) + d2 & 7;
          if ((m8 === 3 || m8 === 5) && m14 === 2)
            u2 = -m24;
          else
            u2 = m24;
        }
        jsf[1].push(u2);
        if (2 * d1 === u1 + 1)
          d1 = 1 - d1;
        if (2 * d2 === u2 + 1)
          d2 = 1 - d2;
        k1.iushrn(1);
        k2.iushrn(1);
      }
      return jsf;
    }
    utils.getJSF = getJSF2;
    function cachedProperty(obj, name2, computer) {
      var key2 = "_" + name2;
      obj.prototype[name2] = function cachedProperty2() {
        return this[key2] !== void 0 ? this[key2] : this[key2] = computer.call(this);
      };
    }
    utils.cachedProperty = cachedProperty;
    function parseBytes(bytes) {
      return typeof bytes === "string" ? utils.toArray(bytes, "hex") : bytes;
    }
    utils.parseBytes = parseBytes;
    function intFromLE(bytes) {
      return new import_bn2.default(bytes, "hex", "le");
    }
    utils.intFromLE = intFromLE;
  });
  var getNAF = utils_1$1.getNAF;
  var getJSF = utils_1$1.getJSF;
  var assert$1 = utils_1$1.assert;
  function BaseCurve(type, conf) {
    this.type = type;
    this.p = new import_bn2.default(conf.p, 16);
    this.red = conf.prime ? import_bn2.default.red(conf.prime) : import_bn2.default.mont(this.p);
    this.zero = new import_bn2.default(0).toRed(this.red);
    this.one = new import_bn2.default(1).toRed(this.red);
    this.two = new import_bn2.default(2).toRed(this.red);
    this.n = conf.n && new import_bn2.default(conf.n, 16);
    this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
    this._wnafT1 = new Array(4);
    this._wnafT2 = new Array(4);
    this._wnafT3 = new Array(4);
    this._wnafT4 = new Array(4);
    this._bitLength = this.n ? this.n.bitLength() : 0;
    var adjustCount = this.n && this.p.div(this.n);
    if (!adjustCount || adjustCount.cmpn(100) > 0) {
      this.redN = null;
    } else {
      this._maxwellTrick = true;
      this.redN = this.n.toRed(this.red);
    }
  }
  var base = BaseCurve;
  BaseCurve.prototype.point = function point() {
    throw new Error("Not implemented");
  };
  BaseCurve.prototype.validate = function validate() {
    throw new Error("Not implemented");
  };
  BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
    assert$1(p.precomputed);
    var doubles = p._getDoubles();
    var naf = getNAF(k, 1, this._bitLength);
    var I = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
    I /= 3;
    var repr = [];
    var j;
    var nafW;
    for (j = 0; j < naf.length; j += doubles.step) {
      nafW = 0;
      for (var l = j + doubles.step - 1; l >= j; l--)
        nafW = (nafW << 1) + naf[l];
      repr.push(nafW);
    }
    var a = this.jpoint(null, null, null);
    var b = this.jpoint(null, null, null);
    for (var i = I; i > 0; i--) {
      for (j = 0; j < repr.length; j++) {
        nafW = repr[j];
        if (nafW === i)
          b = b.mixedAdd(doubles.points[j]);
        else if (nafW === -i)
          b = b.mixedAdd(doubles.points[j].neg());
      }
      a = a.add(b);
    }
    return a.toP();
  };
  BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
    var w = 4;
    var nafPoints = p._getNAFPoints(w);
    w = nafPoints.wnd;
    var wnd = nafPoints.points;
    var naf = getNAF(k, w, this._bitLength);
    var acc = this.jpoint(null, null, null);
    for (var i = naf.length - 1; i >= 0; i--) {
      for (var l = 0; i >= 0 && naf[i] === 0; i--)
        l++;
      if (i >= 0)
        l++;
      acc = acc.dblp(l);
      if (i < 0)
        break;
      var z = naf[i];
      assert$1(z !== 0);
      if (p.type === "affine") {
        if (z > 0)
          acc = acc.mixedAdd(wnd[z - 1 >> 1]);
        else
          acc = acc.mixedAdd(wnd[-z - 1 >> 1].neg());
      } else {
        if (z > 0)
          acc = acc.add(wnd[z - 1 >> 1]);
        else
          acc = acc.add(wnd[-z - 1 >> 1].neg());
      }
    }
    return p.type === "affine" ? acc.toP() : acc;
  };
  BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
    var wndWidth = this._wnafT1;
    var wnd = this._wnafT2;
    var naf = this._wnafT3;
    var max = 0;
    var i;
    var j;
    var p;
    for (i = 0; i < len; i++) {
      p = points[i];
      var nafPoints = p._getNAFPoints(defW);
      wndWidth[i] = nafPoints.wnd;
      wnd[i] = nafPoints.points;
    }
    for (i = len - 1; i >= 1; i -= 2) {
      var a = i - 1;
      var b = i;
      if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
        naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
        naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
        max = Math.max(naf[a].length, max);
        max = Math.max(naf[b].length, max);
        continue;
      }
      var comb = [
        points[a],
        null,
        null,
        points[b]
      ];
      if (points[a].y.cmp(points[b].y) === 0) {
        comb[1] = points[a].add(points[b]);
        comb[2] = points[a].toJ().mixedAdd(points[b].neg());
      } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
        comb[1] = points[a].toJ().mixedAdd(points[b]);
        comb[2] = points[a].add(points[b].neg());
      } else {
        comb[1] = points[a].toJ().mixedAdd(points[b]);
        comb[2] = points[a].toJ().mixedAdd(points[b].neg());
      }
      var index = [
        -3,
        -1,
        -5,
        -7,
        0,
        7,
        5,
        1,
        3
      ];
      var jsf = getJSF(coeffs[a], coeffs[b]);
      max = Math.max(jsf[0].length, max);
      naf[a] = new Array(max);
      naf[b] = new Array(max);
      for (j = 0; j < max; j++) {
        var ja = jsf[0][j] | 0;
        var jb = jsf[1][j] | 0;
        naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
        naf[b][j] = 0;
        wnd[a] = comb;
      }
    }
    var acc = this.jpoint(null, null, null);
    var tmp = this._wnafT4;
    for (i = max; i >= 0; i--) {
      var k = 0;
      while (i >= 0) {
        var zero = true;
        for (j = 0; j < len; j++) {
          tmp[j] = naf[j][i] | 0;
          if (tmp[j] !== 0)
            zero = false;
        }
        if (!zero)
          break;
        k++;
        i--;
      }
      if (i >= 0)
        k++;
      acc = acc.dblp(k);
      if (i < 0)
        break;
      for (j = 0; j < len; j++) {
        var z = tmp[j];
        p;
        if (z === 0)
          continue;
        else if (z > 0)
          p = wnd[j][z - 1 >> 1];
        else if (z < 0)
          p = wnd[j][-z - 1 >> 1].neg();
        if (p.type === "affine")
          acc = acc.mixedAdd(p);
        else
          acc = acc.add(p);
      }
    }
    for (i = 0; i < len; i++)
      wnd[i] = null;
    if (jacobianResult)
      return acc;
    else
      return acc.toP();
  };
  function BasePoint(curve, type) {
    this.curve = curve;
    this.type = type;
    this.precomputed = null;
  }
  BaseCurve.BasePoint = BasePoint;
  BasePoint.prototype.eq = function eq() {
    throw new Error("Not implemented");
  };
  BasePoint.prototype.validate = function validate2() {
    return this.curve.validate(this);
  };
  BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
    bytes = utils_1$1.toArray(bytes, enc);
    var len = this.p.byteLength();
    if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
      if (bytes[0] === 6)
        assert$1(bytes[bytes.length - 1] % 2 === 0);
      else if (bytes[0] === 7)
        assert$1(bytes[bytes.length - 1] % 2 === 1);
      var res = this.point(bytes.slice(1, 1 + len), bytes.slice(1 + len, 1 + 2 * len));
      return res;
    } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
      return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
    }
    throw new Error("Unknown point format");
  };
  BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
    return this.encode(enc, true);
  };
  BasePoint.prototype._encode = function _encode2(compact) {
    var len = this.curve.p.byteLength();
    var x = this.getX().toArray("be", len);
    if (compact)
      return [this.getY().isEven() ? 2 : 3].concat(x);
    return [4].concat(x, this.getY().toArray("be", len));
  };
  BasePoint.prototype.encode = function encode2(enc, compact) {
    return utils_1$1.encode(this._encode(compact), enc);
  };
  BasePoint.prototype.precompute = function precompute(power) {
    if (this.precomputed)
      return this;
    var precomputed = {
      doubles: null,
      naf: null,
      beta: null
    };
    precomputed.naf = this._getNAFPoints(8);
    precomputed.doubles = this._getDoubles(4, power);
    precomputed.beta = this._getBeta();
    this.precomputed = precomputed;
    return this;
  };
  BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
    if (!this.precomputed)
      return false;
    var doubles = this.precomputed.doubles;
    if (!doubles)
      return false;
    return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
  };
  BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;
    var doubles = [this];
    var acc = this;
    for (var i = 0; i < power; i += step) {
      for (var j = 0; j < step; j++)
        acc = acc.dbl();
      doubles.push(acc);
    }
    return {
      step,
      points: doubles
    };
  };
  BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
    if (this.precomputed && this.precomputed.naf)
      return this.precomputed.naf;
    var res = [this];
    var max = (1 << wnd) - 1;
    var dbl3 = max === 1 ? null : this.dbl();
    for (var i = 1; i < max; i++)
      res[i] = res[i - 1].add(dbl3);
    return {
      wnd,
      points: res
    };
  };
  BasePoint.prototype._getBeta = function _getBeta() {
    return null;
  };
  BasePoint.prototype.dblp = function dblp(k) {
    var r = this;
    for (var i = 0; i < k; i++)
      r = r.dbl();
    return r;
  };
  var inherits_browser = createCommonjsModule(function(module) {
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  });
  var assert$2 = utils_1$1.assert;
  function ShortCurve(conf) {
    base.call(this, "short", conf);
    this.a = new import_bn2.default(conf.a, 16).toRed(this.red);
    this.b = new import_bn2.default(conf.b, 16).toRed(this.red);
    this.tinv = this.two.redInvm();
    this.zeroA = this.a.fromRed().cmpn(0) === 0;
    this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
    this.endo = this._getEndomorphism(conf);
    this._endoWnafT1 = new Array(4);
    this._endoWnafT2 = new Array(4);
  }
  inherits_browser(ShortCurve, base);
  var short_1 = ShortCurve;
  ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
    if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
      return;
    var beta;
    var lambda;
    if (conf.beta) {
      beta = new import_bn2.default(conf.beta, 16).toRed(this.red);
    } else {
      var betas = this._getEndoRoots(this.p);
      beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
      beta = beta.toRed(this.red);
    }
    if (conf.lambda) {
      lambda = new import_bn2.default(conf.lambda, 16);
    } else {
      var lambdas = this._getEndoRoots(this.n);
      if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
        lambda = lambdas[0];
      } else {
        lambda = lambdas[1];
        assert$2(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
      }
    }
    var basis;
    if (conf.basis) {
      basis = conf.basis.map(function(vec) {
        return {
          a: new import_bn2.default(vec.a, 16),
          b: new import_bn2.default(vec.b, 16)
        };
      });
    } else {
      basis = this._getEndoBasis(lambda);
    }
    return {
      beta,
      lambda,
      basis
    };
  };
  ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
    var red = num === this.p ? this.red : import_bn2.default.mont(num);
    var tinv = new import_bn2.default(2).toRed(red).redInvm();
    var ntinv = tinv.redNeg();
    var s = new import_bn2.default(3).toRed(red).redNeg().redSqrt().redMul(tinv);
    var l1 = ntinv.redAdd(s).fromRed();
    var l2 = ntinv.redSub(s).fromRed();
    return [l1, l2];
  };
  ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
    var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
    var u = lambda;
    var v = this.n.clone();
    var x1 = new import_bn2.default(1);
    var y1 = new import_bn2.default(0);
    var x2 = new import_bn2.default(0);
    var y2 = new import_bn2.default(1);
    var a0;
    var b0;
    var a1;
    var b1;
    var a2;
    var b2;
    var prevR;
    var i = 0;
    var r;
    var x;
    while (u.cmpn(0) !== 0) {
      var q = v.div(u);
      r = v.sub(q.mul(u));
      x = x2.sub(q.mul(x1));
      var y = y2.sub(q.mul(y1));
      if (!a1 && r.cmp(aprxSqrt) < 0) {
        a0 = prevR.neg();
        b0 = x1;
        a1 = r.neg();
        b1 = x;
      } else if (a1 && ++i === 2) {
        break;
      }
      prevR = r;
      v = u;
      u = r;
      x2 = x1;
      x1 = x;
      y2 = y1;
      y1 = y;
    }
    a2 = r.neg();
    b2 = x;
    var len1 = a1.sqr().add(b1.sqr());
    var len2 = a2.sqr().add(b2.sqr());
    if (len2.cmp(len1) >= 0) {
      a2 = a0;
      b2 = b0;
    }
    if (a1.negative) {
      a1 = a1.neg();
      b1 = b1.neg();
    }
    if (a2.negative) {
      a2 = a2.neg();
      b2 = b2.neg();
    }
    return [
      { a: a1, b: b1 },
      { a: a2, b: b2 }
    ];
  };
  ShortCurve.prototype._endoSplit = function _endoSplit(k) {
    var basis = this.endo.basis;
    var v1 = basis[0];
    var v2 = basis[1];
    var c1 = v2.b.mul(k).divRound(this.n);
    var c2 = v1.b.neg().mul(k).divRound(this.n);
    var p1 = c1.mul(v1.a);
    var p2 = c2.mul(v2.a);
    var q1 = c1.mul(v1.b);
    var q2 = c2.mul(v2.b);
    var k1 = k.sub(p1).sub(p2);
    var k2 = q1.add(q2).neg();
    return { k1, k2 };
  };
  ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
    x = new import_bn2.default(x, 16);
    if (!x.red)
      x = x.toRed(this.red);
    var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
    var y = y2.redSqrt();
    if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var isOdd = y.fromRed().isOdd();
    if (odd && !isOdd || !odd && isOdd)
      y = y.redNeg();
    return this.point(x, y);
  };
  ShortCurve.prototype.validate = function validate3(point3) {
    if (point3.inf)
      return true;
    var x = point3.x;
    var y = point3.y;
    var ax = this.a.redMul(x);
    var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
    return y.redSqr().redISub(rhs).cmpn(0) === 0;
  };
  ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
    var npoints = this._endoWnafT1;
    var ncoeffs = this._endoWnafT2;
    for (var i = 0; i < points.length; i++) {
      var split = this._endoSplit(coeffs[i]);
      var p = points[i];
      var beta = p._getBeta();
      if (split.k1.negative) {
        split.k1.ineg();
        p = p.neg(true);
      }
      if (split.k2.negative) {
        split.k2.ineg();
        beta = beta.neg(true);
      }
      npoints[i * 2] = p;
      npoints[i * 2 + 1] = beta;
      ncoeffs[i * 2] = split.k1;
      ncoeffs[i * 2 + 1] = split.k2;
    }
    var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);
    for (var j = 0; j < i * 2; j++) {
      npoints[j] = null;
      ncoeffs[j] = null;
    }
    return res;
  };
  function Point(curve, x, y, isRed) {
    base.BasePoint.call(this, curve, "affine");
    if (x === null && y === null) {
      this.x = null;
      this.y = null;
      this.inf = true;
    } else {
      this.x = new import_bn2.default(x, 16);
      this.y = new import_bn2.default(y, 16);
      if (isRed) {
        this.x.forceRed(this.curve.red);
        this.y.forceRed(this.curve.red);
      }
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.y.red)
        this.y = this.y.toRed(this.curve.red);
      this.inf = false;
    }
  }
  inherits_browser(Point, base.BasePoint);
  ShortCurve.prototype.point = function point2(x, y, isRed) {
    return new Point(this, x, y, isRed);
  };
  ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
    return Point.fromJSON(this, obj, red);
  };
  Point.prototype._getBeta = function _getBeta2() {
    if (!this.curve.endo)
      return;
    var pre = this.precomputed;
    if (pre && pre.beta)
      return pre.beta;
    var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (pre) {
      var curve = this.curve;
      var endoMul = function(p) {
        return curve.point(p.x.redMul(curve.endo.beta), p.y);
      };
      pre.beta = beta;
      beta.precomputed = {
        beta: null,
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: pre.naf.points.map(endoMul)
        },
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: pre.doubles.points.map(endoMul)
        }
      };
    }
    return beta;
  };
  Point.prototype.toJSON = function toJSON() {
    if (!this.precomputed)
      return [this.x, this.y];
    return [this.x, this.y, this.precomputed && {
      doubles: this.precomputed.doubles && {
        step: this.precomputed.doubles.step,
        points: this.precomputed.doubles.points.slice(1)
      },
      naf: this.precomputed.naf && {
        wnd: this.precomputed.naf.wnd,
        points: this.precomputed.naf.points.slice(1)
      }
    }];
  };
  Point.fromJSON = function fromJSON(curve, obj, red) {
    if (typeof obj === "string")
      obj = JSON.parse(obj);
    var res = curve.point(obj[0], obj[1], red);
    if (!obj[2])
      return res;
    function obj2point(obj2) {
      return curve.point(obj2[0], obj2[1], red);
    }
    var pre = obj[2];
    res.precomputed = {
      beta: null,
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: [res].concat(pre.doubles.points.map(obj2point))
      },
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: [res].concat(pre.naf.points.map(obj2point))
      }
    };
    return res;
  };
  Point.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return "<EC Point Infinity>";
    return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
  };
  Point.prototype.isInfinity = function isInfinity() {
    return this.inf;
  };
  Point.prototype.add = function add(p) {
    if (this.inf)
      return p;
    if (p.inf)
      return this;
    if (this.eq(p))
      return this.dbl();
    if (this.neg().eq(p))
      return this.curve.point(null, null);
    if (this.x.cmp(p.x) === 0)
      return this.curve.point(null, null);
    var c = this.y.redSub(p.y);
    if (c.cmpn(0) !== 0)
      c = c.redMul(this.x.redSub(p.x).redInvm());
    var nx = c.redSqr().redISub(this.x).redISub(p.x);
    var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
    return this.curve.point(nx, ny);
  };
  Point.prototype.dbl = function dbl() {
    if (this.inf)
      return this;
    var ys1 = this.y.redAdd(this.y);
    if (ys1.cmpn(0) === 0)
      return this.curve.point(null, null);
    var a = this.curve.a;
    var x2 = this.x.redSqr();
    var dyinv = ys1.redInvm();
    var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);
    var nx = c.redSqr().redISub(this.x.redAdd(this.x));
    var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
    return this.curve.point(nx, ny);
  };
  Point.prototype.getX = function getX() {
    return this.x.fromRed();
  };
  Point.prototype.getY = function getY() {
    return this.y.fromRed();
  };
  Point.prototype.mul = function mul(k) {
    k = new import_bn2.default(k, 16);
    if (this.isInfinity())
      return this;
    else if (this._hasDoubles(k))
      return this.curve._fixedNafMul(this, k);
    else if (this.curve.endo)
      return this.curve._endoWnafMulAdd([this], [k]);
    else
      return this.curve._wnafMul(this, k);
  };
  Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
    var points = [this, p2];
    var coeffs = [k1, k2];
    if (this.curve.endo)
      return this.curve._endoWnafMulAdd(points, coeffs);
    else
      return this.curve._wnafMulAdd(1, points, coeffs, 2);
  };
  Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
    var points = [this, p2];
    var coeffs = [k1, k2];
    if (this.curve.endo)
      return this.curve._endoWnafMulAdd(points, coeffs, true);
    else
      return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
  };
  Point.prototype.eq = function eq2(p) {
    return this === p || this.inf === p.inf && (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
  };
  Point.prototype.neg = function neg(_precompute) {
    if (this.inf)
      return this;
    var res = this.curve.point(this.x, this.y.redNeg());
    if (_precompute && this.precomputed) {
      var pre = this.precomputed;
      var negate = function(p) {
        return p.neg();
      };
      res.precomputed = {
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: pre.naf.points.map(negate)
        },
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: pre.doubles.points.map(negate)
        }
      };
    }
    return res;
  };
  Point.prototype.toJ = function toJ() {
    if (this.inf)
      return this.curve.jpoint(null, null, null);
    var res = this.curve.jpoint(this.x, this.y, this.curve.one);
    return res;
  };
  function JPoint(curve, x, y, z) {
    base.BasePoint.call(this, curve, "jacobian");
    if (x === null && y === null && z === null) {
      this.x = this.curve.one;
      this.y = this.curve.one;
      this.z = new import_bn2.default(0);
    } else {
      this.x = new import_bn2.default(x, 16);
      this.y = new import_bn2.default(y, 16);
      this.z = new import_bn2.default(z, 16);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;
  }
  inherits_browser(JPoint, base.BasePoint);
  ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
    return new JPoint(this, x, y, z);
  };
  JPoint.prototype.toP = function toP() {
    if (this.isInfinity())
      return this.curve.point(null, null);
    var zinv = this.z.redInvm();
    var zinv2 = zinv.redSqr();
    var ax = this.x.redMul(zinv2);
    var ay = this.y.redMul(zinv2).redMul(zinv);
    return this.curve.point(ax, ay);
  };
  JPoint.prototype.neg = function neg2() {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  };
  JPoint.prototype.add = function add2(p) {
    if (this.isInfinity())
      return p;
    if (p.isInfinity())
      return this;
    var pz2 = p.z.redSqr();
    var z2 = this.z.redSqr();
    var u1 = this.x.redMul(pz2);
    var u2 = p.x.redMul(z2);
    var s1 = this.y.redMul(pz2.redMul(p.z));
    var s2 = p.y.redMul(z2.redMul(this.z));
    var h = u1.redSub(u2);
    var r = s1.redSub(s2);
    if (h.cmpn(0) === 0) {
      if (r.cmpn(0) !== 0)
        return this.curve.jpoint(null, null, null);
      else
        return this.dbl();
    }
    var h2 = h.redSqr();
    var h3 = h2.redMul(h);
    var v = u1.redMul(h2);
    var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
    var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
    var nz = this.z.redMul(p.z).redMul(h);
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype.mixedAdd = function mixedAdd(p) {
    if (this.isInfinity())
      return p.toJ();
    if (p.isInfinity())
      return this;
    var z2 = this.z.redSqr();
    var u1 = this.x;
    var u2 = p.x.redMul(z2);
    var s1 = this.y;
    var s2 = p.y.redMul(z2).redMul(this.z);
    var h = u1.redSub(u2);
    var r = s1.redSub(s2);
    if (h.cmpn(0) === 0) {
      if (r.cmpn(0) !== 0)
        return this.curve.jpoint(null, null, null);
      else
        return this.dbl();
    }
    var h2 = h.redSqr();
    var h3 = h2.redMul(h);
    var v = u1.redMul(h2);
    var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
    var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
    var nz = this.z.redMul(h);
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype.dblp = function dblp2(pow) {
    if (pow === 0)
      return this;
    if (this.isInfinity())
      return this;
    if (!pow)
      return this.dbl();
    var i;
    if (this.curve.zeroA || this.curve.threeA) {
      var r = this;
      for (i = 0; i < pow; i++)
        r = r.dbl();
      return r;
    }
    var a = this.curve.a;
    var tinv = this.curve.tinv;
    var jx = this.x;
    var jy = this.y;
    var jz = this.z;
    var jz4 = jz.redSqr().redSqr();
    var jyd = jy.redAdd(jy);
    for (i = 0; i < pow; i++) {
      var jx2 = jx.redSqr();
      var jyd2 = jyd.redSqr();
      var jyd4 = jyd2.redSqr();
      var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
      var t1 = jx.redMul(jyd2);
      var nx = c.redSqr().redISub(t1.redAdd(t1));
      var t2 = t1.redISub(nx);
      var dny = c.redMul(t2);
      dny = dny.redIAdd(dny).redISub(jyd4);
      var nz = jyd.redMul(jz);
      if (i + 1 < pow)
        jz4 = jz4.redMul(jyd4);
      jx = nx;
      jz = nz;
      jyd = dny;
    }
    return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
  };
  JPoint.prototype.dbl = function dbl2() {
    if (this.isInfinity())
      return this;
    if (this.curve.zeroA)
      return this._zeroDbl();
    else if (this.curve.threeA)
      return this._threeDbl();
    else
      return this._dbl();
  };
  JPoint.prototype._zeroDbl = function _zeroDbl() {
    var nx;
    var ny;
    var nz;
    if (this.zOne) {
      var xx = this.x.redSqr();
      var yy = this.y.redSqr();
      var yyyy = yy.redSqr();
      var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      s = s.redIAdd(s);
      var m = xx.redAdd(xx).redIAdd(xx);
      var t = m.redSqr().redISub(s).redISub(s);
      var yyyy8 = yyyy.redIAdd(yyyy);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      nx = t;
      ny = m.redMul(s.redISub(t)).redISub(yyyy8);
      nz = this.y.redAdd(this.y);
    } else {
      var a = this.x.redSqr();
      var b = this.y.redSqr();
      var c = b.redSqr();
      var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
      d = d.redIAdd(d);
      var e = a.redAdd(a).redIAdd(a);
      var f = e.redSqr();
      var c8 = c.redIAdd(c);
      c8 = c8.redIAdd(c8);
      c8 = c8.redIAdd(c8);
      nx = f.redISub(d).redISub(d);
      ny = e.redMul(d.redISub(nx)).redISub(c8);
      nz = this.y.redMul(this.z);
      nz = nz.redIAdd(nz);
    }
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype._threeDbl = function _threeDbl() {
    var nx;
    var ny;
    var nz;
    if (this.zOne) {
      var xx = this.x.redSqr();
      var yy = this.y.redSqr();
      var yyyy = yy.redSqr();
      var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      s = s.redIAdd(s);
      var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
      var t = m.redSqr().redISub(s).redISub(s);
      nx = t;
      var yyyy8 = yyyy.redIAdd(yyyy);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      ny = m.redMul(s.redISub(t)).redISub(yyyy8);
      nz = this.y.redAdd(this.y);
    } else {
      var delta = this.z.redSqr();
      var gamma = this.y.redSqr();
      var beta = this.x.redMul(gamma);
      var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
      alpha = alpha.redAdd(alpha).redIAdd(alpha);
      var beta4 = beta.redIAdd(beta);
      beta4 = beta4.redIAdd(beta4);
      var beta8 = beta4.redAdd(beta4);
      nx = alpha.redSqr().redISub(beta8);
      nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
      var ggamma8 = gamma.redSqr();
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
    }
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype._dbl = function _dbl() {
    var a = this.curve.a;
    var jx = this.x;
    var jy = this.y;
    var jz = this.z;
    var jz4 = jz.redSqr().redSqr();
    var jx2 = jx.redSqr();
    var jy2 = jy.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));
    var jxd4 = jx.redAdd(jx);
    jxd4 = jxd4.redIAdd(jxd4);
    var t1 = jxd4.redMul(jy2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var jyd8 = jy2.redSqr();
    jyd8 = jyd8.redIAdd(jyd8);
    jyd8 = jyd8.redIAdd(jyd8);
    jyd8 = jyd8.redIAdd(jyd8);
    var ny = c.redMul(t2).redISub(jyd8);
    var nz = jy.redAdd(jy).redMul(jz);
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype.trpl = function trpl() {
    if (!this.curve.zeroA)
      return this.dbl().add(this);
    var xx = this.x.redSqr();
    var yy = this.y.redSqr();
    var zz = this.z.redSqr();
    var yyyy = yy.redSqr();
    var m = xx.redAdd(xx).redIAdd(xx);
    var mm = m.redSqr();
    var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    e = e.redIAdd(e);
    e = e.redAdd(e).redIAdd(e);
    e = e.redISub(mm);
    var ee = e.redSqr();
    var t = yyyy.redIAdd(yyyy);
    t = t.redIAdd(t);
    t = t.redIAdd(t);
    t = t.redIAdd(t);
    var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
    var yyu4 = yy.redMul(u);
    yyu4 = yyu4.redIAdd(yyu4);
    yyu4 = yyu4.redIAdd(yyu4);
    var nx = this.x.redMul(ee).redISub(yyu4);
    nx = nx.redIAdd(nx);
    nx = nx.redIAdd(nx);
    var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
    ny = ny.redIAdd(ny);
    ny = ny.redIAdd(ny);
    ny = ny.redIAdd(ny);
    var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);
    return this.curve.jpoint(nx, ny, nz);
  };
  JPoint.prototype.mul = function mul2(k, kbase) {
    k = new import_bn2.default(k, kbase);
    return this.curve._wnafMul(this, k);
  };
  JPoint.prototype.eq = function eq3(p) {
    if (p.type === "affine")
      return this.eq(p.toJ());
    if (this === p)
      return true;
    var z2 = this.z.redSqr();
    var pz2 = p.z.redSqr();
    if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
      return false;
    var z3 = z2.redMul(this.z);
    var pz3 = pz2.redMul(p.z);
    return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
  };
  JPoint.prototype.eqXToP = function eqXToP(x) {
    var zs = this.z.redSqr();
    var rx = x.toRed(this.curve.red).redMul(zs);
    if (this.x.cmp(rx) === 0)
      return true;
    var xc = x.clone();
    var t = this.curve.redN.redMul(zs);
    for (; ; ) {
      xc.iadd(this.curve.n);
      if (xc.cmp(this.curve.p) >= 0)
        return false;
      rx.redIAdd(t);
      if (this.x.cmp(rx) === 0)
        return true;
    }
  };
  JPoint.prototype.inspect = function inspect2() {
    if (this.isInfinity())
      return "<EC JPoint Infinity>";
    return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
  };
  JPoint.prototype.isInfinity = function isInfinity2() {
    return this.z.cmpn(0) === 0;
  };
  var curve_1 = createCommonjsModule(function(module, exports) {
    "use strict";
    var curve = exports;
    curve.base = base;
    curve.short = short_1;
    curve.mont = null;
    curve.edwards = null;
  });
  var curves_1 = createCommonjsModule(function(module, exports) {
    "use strict";
    var curves = exports;
    var assert2 = utils_1$1.assert;
    function PresetCurve(options) {
      if (options.type === "short")
        this.curve = new curve_1.short(options);
      else if (options.type === "edwards")
        this.curve = new curve_1.edwards(options);
      else
        this.curve = new curve_1.mont(options);
      this.g = this.curve.g;
      this.n = this.curve.n;
      this.hash = options.hash;
      assert2(this.g.validate(), "Invalid curve");
      assert2(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    curves.PresetCurve = PresetCurve;
    function defineCurve(name2, options) {
      Object.defineProperty(curves, name2, {
        configurable: true,
        enumerable: true,
        get: function() {
          var curve = new PresetCurve(options);
          Object.defineProperty(curves, name2, {
            configurable: true,
            enumerable: true,
            value: curve
          });
          return curve;
        }
      });
    }
    defineCurve("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: import_hash2.default.sha256,
      gRed: false,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
      ]
    });
    defineCurve("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: import_hash2.default.sha256,
      gRed: false,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
      ]
    });
    defineCurve("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: import_hash2.default.sha256,
      gRed: false,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
      ]
    });
    defineCurve("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: import_hash2.default.sha384,
      gRed: false,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
      ]
    });
    defineCurve("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: import_hash2.default.sha512,
      gRed: false,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
      ]
    });
    defineCurve("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: import_hash2.default.sha256,
      gRed: false,
      g: [
        "9"
      ]
    });
    defineCurve("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: import_hash2.default.sha256,
      gRed: false,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var pre;
    try {
      pre = null.crash();
    } catch (e) {
      pre = void 0;
    }
    defineCurve("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: import_hash2.default.sha256,
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3"
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15"
        }
      ],
      gRed: false,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        pre
      ]
    });
  });
  function HmacDRBG(options) {
    if (!(this instanceof HmacDRBG))
      return new HmacDRBG(options);
    this.hash = options.hash;
    this.predResist = !!options.predResist;
    this.outLen = this.hash.outSize;
    this.minEntropy = options.minEntropy || this.hash.hmacStrength;
    this._reseed = null;
    this.reseedInterval = null;
    this.K = null;
    this.V = null;
    var entropy = utils_1.toArray(options.entropy, options.entropyEnc || "hex");
    var nonce = utils_1.toArray(options.nonce, options.nonceEnc || "hex");
    var pers = utils_1.toArray(options.pers, options.persEnc || "hex");
    minimalisticAssert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
    this._init(entropy, nonce, pers);
  }
  var hmacDrbg = HmacDRBG;
  HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
    var seed = entropy.concat(nonce).concat(pers);
    this.K = new Array(this.outLen / 8);
    this.V = new Array(this.outLen / 8);
    for (var i = 0; i < this.V.length; i++) {
      this.K[i] = 0;
      this.V[i] = 1;
    }
    this._update(seed);
    this._reseed = 1;
    this.reseedInterval = 281474976710656;
  };
  HmacDRBG.prototype._hmac = function hmac() {
    return new import_hash2.default.hmac(this.hash, this.K);
  };
  HmacDRBG.prototype._update = function update(seed) {
    var kmac = this._hmac().update(this.V).update([0]);
    if (seed)
      kmac = kmac.update(seed);
    this.K = kmac.digest();
    this.V = this._hmac().update(this.V).digest();
    if (!seed)
      return;
    this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
    this.V = this._hmac().update(this.V).digest();
  };
  HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add3, addEnc) {
    if (typeof entropyEnc !== "string") {
      addEnc = add3;
      add3 = entropyEnc;
      entropyEnc = null;
    }
    entropy = utils_1.toArray(entropy, entropyEnc);
    add3 = utils_1.toArray(add3, addEnc);
    minimalisticAssert(entropy.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits");
    this._update(entropy.concat(add3 || []));
    this._reseed = 1;
  };
  HmacDRBG.prototype.generate = function generate(len, enc, add3, addEnc) {
    if (this._reseed > this.reseedInterval)
      throw new Error("Reseed is required");
    if (typeof enc !== "string") {
      addEnc = add3;
      add3 = enc;
      enc = null;
    }
    if (add3) {
      add3 = utils_1.toArray(add3, addEnc || "hex");
      this._update(add3);
    }
    var temp = [];
    while (temp.length < len) {
      this.V = this._hmac().update(this.V).digest();
      temp = temp.concat(this.V);
    }
    var res = temp.slice(0, len);
    this._update(add3);
    this._reseed++;
    return utils_1.encode(res, enc);
  };
  var assert$3 = utils_1$1.assert;
  function KeyPair(ec2, options) {
    this.ec = ec2;
    this.priv = null;
    this.pub = null;
    if (options.priv)
      this._importPrivate(options.priv, options.privEnc);
    if (options.pub)
      this._importPublic(options.pub, options.pubEnc);
  }
  var key = KeyPair;
  KeyPair.fromPublic = function fromPublic(ec2, pub, enc) {
    if (pub instanceof KeyPair)
      return pub;
    return new KeyPair(ec2, {
      pub,
      pubEnc: enc
    });
  };
  KeyPair.fromPrivate = function fromPrivate(ec2, priv, enc) {
    if (priv instanceof KeyPair)
      return priv;
    return new KeyPair(ec2, {
      priv,
      privEnc: enc
    });
  };
  KeyPair.prototype.validate = function validate4() {
    var pub = this.getPublic();
    if (pub.isInfinity())
      return { result: false, reason: "Invalid public key" };
    if (!pub.validate())
      return { result: false, reason: "Public key is not a point" };
    if (!pub.mul(this.ec.curve.n).isInfinity())
      return { result: false, reason: "Public key * N != O" };
    return { result: true, reason: null };
  };
  KeyPair.prototype.getPublic = function getPublic(compact, enc) {
    if (typeof compact === "string") {
      enc = compact;
      compact = null;
    }
    if (!this.pub)
      this.pub = this.ec.g.mul(this.priv);
    if (!enc)
      return this.pub;
    return this.pub.encode(enc, compact);
  };
  KeyPair.prototype.getPrivate = function getPrivate(enc) {
    if (enc === "hex")
      return this.priv.toString(16, 2);
    else
      return this.priv;
  };
  KeyPair.prototype._importPrivate = function _importPrivate(key2, enc) {
    this.priv = new import_bn2.default(key2, enc || 16);
    this.priv = this.priv.umod(this.ec.curve.n);
  };
  KeyPair.prototype._importPublic = function _importPublic(key2, enc) {
    if (key2.x || key2.y) {
      if (this.ec.curve.type === "mont") {
        assert$3(key2.x, "Need x coordinate");
      } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
        assert$3(key2.x && key2.y, "Need both x and y coordinate");
      }
      this.pub = this.ec.curve.point(key2.x, key2.y);
      return;
    }
    this.pub = this.ec.curve.decodePoint(key2, enc);
  };
  KeyPair.prototype.derive = function derive(pub) {
    if (!pub.validate()) {
      assert$3(pub.validate(), "public point not validated");
    }
    return pub.mul(this.priv).getX();
  };
  KeyPair.prototype.sign = function sign(msg, enc, options) {
    return this.ec.sign(msg, this, enc, options);
  };
  KeyPair.prototype.verify = function verify(msg, signature2) {
    return this.ec.verify(msg, signature2, this);
  };
  KeyPair.prototype.inspect = function inspect3() {
    return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
  };
  var assert$4 = utils_1$1.assert;
  function Signature(options, enc) {
    if (options instanceof Signature)
      return options;
    if (this._importDER(options, enc))
      return;
    assert$4(options.r && options.s, "Signature without r or s");
    this.r = new import_bn2.default(options.r, 16);
    this.s = new import_bn2.default(options.s, 16);
    if (options.recoveryParam === void 0)
      this.recoveryParam = null;
    else
      this.recoveryParam = options.recoveryParam;
  }
  var signature = Signature;
  function Position() {
    this.place = 0;
  }
  function getLength(buf, p) {
    var initial = buf[p.place++];
    if (!(initial & 128)) {
      return initial;
    }
    var octetLen = initial & 15;
    if (octetLen === 0 || octetLen > 4) {
      return false;
    }
    var val = 0;
    for (var i = 0, off = p.place; i < octetLen; i++, off++) {
      val <<= 8;
      val |= buf[off];
      val >>>= 0;
    }
    if (val <= 127) {
      return false;
    }
    p.place = off;
    return val;
  }
  function rmPadding(buf) {
    var i = 0;
    var len = buf.length - 1;
    while (!buf[i] && !(buf[i + 1] & 128) && i < len) {
      i++;
    }
    if (i === 0) {
      return buf;
    }
    return buf.slice(i);
  }
  Signature.prototype._importDER = function _importDER(data4, enc) {
    data4 = utils_1$1.toArray(data4, enc);
    var p = new Position();
    if (data4[p.place++] !== 48) {
      return false;
    }
    var len = getLength(data4, p);
    if (len === false) {
      return false;
    }
    if (len + p.place !== data4.length) {
      return false;
    }
    if (data4[p.place++] !== 2) {
      return false;
    }
    var rlen = getLength(data4, p);
    if (rlen === false) {
      return false;
    }
    var r = data4.slice(p.place, rlen + p.place);
    p.place += rlen;
    if (data4[p.place++] !== 2) {
      return false;
    }
    var slen = getLength(data4, p);
    if (slen === false) {
      return false;
    }
    if (data4.length !== slen + p.place) {
      return false;
    }
    var s = data4.slice(p.place, slen + p.place);
    if (r[0] === 0) {
      if (r[1] & 128) {
        r = r.slice(1);
      } else {
        return false;
      }
    }
    if (s[0] === 0) {
      if (s[1] & 128) {
        s = s.slice(1);
      } else {
        return false;
      }
    }
    this.r = new import_bn2.default(r);
    this.s = new import_bn2.default(s);
    this.recoveryParam = null;
    return true;
  };
  function constructLength(arr, len) {
    if (len < 128) {
      arr.push(len);
      return;
    }
    var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
    arr.push(octets | 128);
    while (--octets) {
      arr.push(len >>> (octets << 3) & 255);
    }
    arr.push(len);
  }
  Signature.prototype.toDER = function toDER(enc) {
    var r = this.r.toArray();
    var s = this.s.toArray();
    if (r[0] & 128)
      r = [0].concat(r);
    if (s[0] & 128)
      s = [0].concat(s);
    r = rmPadding(r);
    s = rmPadding(s);
    while (!s[0] && !(s[1] & 128)) {
      s = s.slice(1);
    }
    var arr = [2];
    constructLength(arr, r.length);
    arr = arr.concat(r);
    arr.push(2);
    constructLength(arr, s.length);
    var backHalf = arr.concat(s);
    var res = [48];
    constructLength(res, backHalf.length);
    res = res.concat(backHalf);
    return utils_1$1.encode(res, enc);
  };
  var rand = function() {
    throw new Error("unsupported");
  };
  var assert$5 = utils_1$1.assert;
  function EC(options) {
    if (!(this instanceof EC))
      return new EC(options);
    if (typeof options === "string") {
      assert$5(Object.prototype.hasOwnProperty.call(curves_1, options), "Unknown curve " + options);
      options = curves_1[options];
    }
    if (options instanceof curves_1.PresetCurve)
      options = { curve: options };
    this.curve = options.curve.curve;
    this.n = this.curve.n;
    this.nh = this.n.ushrn(1);
    this.g = this.curve.g;
    this.g = options.curve.g;
    this.g.precompute(options.curve.n.bitLength() + 1);
    this.hash = options.hash || options.curve.hash;
  }
  var ec = EC;
  EC.prototype.keyPair = function keyPair(options) {
    return new key(this, options);
  };
  EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
    return key.fromPrivate(this, priv, enc);
  };
  EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
    return key.fromPublic(this, pub, enc);
  };
  EC.prototype.genKeyPair = function genKeyPair(options) {
    if (!options)
      options = {};
    var drbg = new hmacDrbg({
      hash: this.hash,
      pers: options.pers,
      persEnc: options.persEnc || "utf8",
      entropy: options.entropy || rand(this.hash.hmacStrength),
      entropyEnc: options.entropy && options.entropyEnc || "utf8",
      nonce: this.n.toArray()
    });
    var bytes = this.n.byteLength();
    var ns2 = this.n.sub(new import_bn2.default(2));
    for (; ; ) {
      var priv = new import_bn2.default(drbg.generate(bytes));
      if (priv.cmp(ns2) > 0)
        continue;
      priv.iaddn(1);
      return this.keyFromPrivate(priv);
    }
  };
  EC.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
    var delta = msg.byteLength() * 8 - this.n.bitLength();
    if (delta > 0)
      msg = msg.ushrn(delta);
    if (!truncOnly && msg.cmp(this.n) >= 0)
      return msg.sub(this.n);
    else
      return msg;
  };
  EC.prototype.sign = function sign2(msg, key2, enc, options) {
    if (typeof enc === "object") {
      options = enc;
      enc = null;
    }
    if (!options)
      options = {};
    key2 = this.keyFromPrivate(key2, enc);
    msg = this._truncateToN(new import_bn2.default(msg, 16));
    var bytes = this.n.byteLength();
    var bkey = key2.getPrivate().toArray("be", bytes);
    var nonce = msg.toArray("be", bytes);
    var drbg = new hmacDrbg({
      hash: this.hash,
      entropy: bkey,
      nonce,
      pers: options.pers,
      persEnc: options.persEnc || "utf8"
    });
    var ns1 = this.n.sub(new import_bn2.default(1));
    for (var iter = 0; ; iter++) {
      var k = options.k ? options.k(iter) : new import_bn2.default(drbg.generate(this.n.byteLength()));
      k = this._truncateToN(k, true);
      if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
        continue;
      var kp = this.g.mul(k);
      if (kp.isInfinity())
        continue;
      var kpX = kp.getX();
      var r = kpX.umod(this.n);
      if (r.cmpn(0) === 0)
        continue;
      var s = k.invm(this.n).mul(r.mul(key2.getPrivate()).iadd(msg));
      s = s.umod(this.n);
      if (s.cmpn(0) === 0)
        continue;
      var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r) !== 0 ? 2 : 0);
      if (options.canonical && s.cmp(this.nh) > 0) {
        s = this.n.sub(s);
        recoveryParam ^= 1;
      }
      return new signature({ r, s, recoveryParam });
    }
  };
  EC.prototype.verify = function verify2(msg, signature$1, key2, enc) {
    msg = this._truncateToN(new import_bn2.default(msg, 16));
    key2 = this.keyFromPublic(key2, enc);
    signature$1 = new signature(signature$1, "hex");
    var r = signature$1.r;
    var s = signature$1.s;
    if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
      return false;
    if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
      return false;
    var sinv = s.invm(this.n);
    var u1 = sinv.mul(msg).umod(this.n);
    var u2 = sinv.mul(r).umod(this.n);
    var p;
    if (!this.curve._maxwellTrick) {
      p = this.g.mulAdd(u1, key2.getPublic(), u2);
      if (p.isInfinity())
        return false;
      return p.getX().umod(this.n).cmp(r) === 0;
    }
    p = this.g.jmulAdd(u1, key2.getPublic(), u2);
    if (p.isInfinity())
      return false;
    return p.eqXToP(r);
  };
  EC.prototype.recoverPubKey = function(msg, signature$1, j, enc) {
    assert$5((3 & j) === j, "The recovery param is more than two bits");
    signature$1 = new signature(signature$1, enc);
    var n = this.n;
    var e = new import_bn2.default(msg);
    var r = signature$1.r;
    var s = signature$1.s;
    var isYOdd = j & 1;
    var isSecondKey = j >> 1;
    if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
      throw new Error("Unable to find sencond key candinate");
    if (isSecondKey)
      r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
    else
      r = this.curve.pointFromX(r, isYOdd);
    var rInv = signature$1.r.invm(n);
    var s1 = n.sub(e).mul(rInv).umod(n);
    var s2 = s.mul(rInv).umod(n);
    return this.g.mulAdd(s1, r, s2);
  };
  EC.prototype.getKeyRecoveryParam = function(e, signature$1, Q, enc) {
    signature$1 = new signature(signature$1, enc);
    if (signature$1.recoveryParam !== null)
      return signature$1.recoveryParam;
    for (var i = 0; i < 4; i++) {
      var Qprime;
      try {
        Qprime = this.recoverPubKey(e, signature$1, i);
      } catch (e2) {
        continue;
      }
      if (Qprime.eq(Q))
        return i;
    }
    throw new Error("Unable to find valid recovery factor");
  };
  var elliptic_1 = createCommonjsModule(function(module, exports) {
    "use strict";
    var elliptic = exports;
    elliptic.version = { version: "6.5.4" }.version;
    elliptic.utils = utils_1$1;
    elliptic.rand = function() {
      throw new Error("unsupported");
    };
    elliptic.curve = curve_1;
    elliptic.curves = curves_1;
    elliptic.ec = ec;
    elliptic.eddsa = null;
  });
  var EC$1 = elliptic_1.ec;

  // node_modules/@ethersproject/signing-key/lib.esm/_version.js
  var version12 = "signing-key/5.2.0";

  // node_modules/@ethersproject/signing-key/lib.esm/index.js
  "use strict";
  var logger17 = new Logger(version12);
  var _curve = null;
  function getCurve() {
    if (!_curve) {
      _curve = new EC$1("secp256k1");
    }
    return _curve;
  }
  var SigningKey = class {
    constructor(privateKey) {
      defineReadOnly(this, "curve", "secp256k1");
      defineReadOnly(this, "privateKey", hexlify(privateKey));
      const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
      defineReadOnly(this, "publicKey", "0x" + keyPair2.getPublic(false, "hex"));
      defineReadOnly(this, "compressedPublicKey", "0x" + keyPair2.getPublic(true, "hex"));
      defineReadOnly(this, "_isSigningKey", true);
    }
    _addPoint(other) {
      const p0 = getCurve().keyFromPublic(arrayify(this.publicKey));
      const p1 = getCurve().keyFromPublic(arrayify(other));
      return "0x" + p0.pub.add(p1.pub).encodeCompressed("hex");
    }
    signDigest(digest) {
      const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
      const digestBytes = arrayify(digest);
      if (digestBytes.length !== 32) {
        logger17.throwArgumentError("bad digest length", "digest", digest);
      }
      const signature2 = keyPair2.sign(digestBytes, { canonical: true });
      return splitSignature({
        recoveryParam: signature2.recoveryParam,
        r: hexZeroPad("0x" + signature2.r.toString(16), 32),
        s: hexZeroPad("0x" + signature2.s.toString(16), 32)
      });
    }
    computeSharedSecret(otherKey) {
      const keyPair2 = getCurve().keyFromPrivate(arrayify(this.privateKey));
      const otherKeyPair = getCurve().keyFromPublic(arrayify(computePublicKey(otherKey)));
      return hexZeroPad("0x" + keyPair2.derive(otherKeyPair.getPublic()).toString(16), 32);
    }
    static isSigningKey(value) {
      return !!(value && value._isSigningKey);
    }
  };
  function recoverPublicKey(digest, signature2) {
    const sig = splitSignature(signature2);
    const rs = { r: arrayify(sig.r), s: arrayify(sig.s) };
    return "0x" + getCurve().recoverPubKey(arrayify(digest), rs, sig.recoveryParam).encode("hex", false);
  }
  function computePublicKey(key2, compressed) {
    const bytes = arrayify(key2);
    if (bytes.length === 32) {
      const signingKey = new SigningKey(bytes);
      if (compressed) {
        return "0x" + getCurve().keyFromPrivate(bytes).getPublic(true, "hex");
      }
      return signingKey.publicKey;
    } else if (bytes.length === 33) {
      if (compressed) {
        return hexlify(bytes);
      }
      return "0x" + getCurve().keyFromPublic(bytes).getPublic(false, "hex");
    } else if (bytes.length === 65) {
      if (!compressed) {
        return hexlify(bytes);
      }
      return "0x" + getCurve().keyFromPublic(bytes).getPublic(true, "hex");
    }
    return logger17.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
  }

  // node_modules/@ethersproject/transactions/lib.esm/_version.js
  var version13 = "transactions/5.2.0";

  // node_modules/@ethersproject/transactions/lib.esm/index.js
  "use strict";
  var logger18 = new Logger(version13);
  function handleAddress(value) {
    if (value === "0x") {
      return null;
    }
    return getAddress(value);
  }
  function handleNumber(value) {
    if (value === "0x") {
      return Zero2;
    }
    return BigNumber.from(value);
  }
  var transactionFields = [
    { name: "nonce", maxLength: 32, numeric: true },
    { name: "gasPrice", maxLength: 32, numeric: true },
    { name: "gasLimit", maxLength: 32, numeric: true },
    { name: "to", length: 20 },
    { name: "value", maxLength: 32, numeric: true },
    { name: "data" }
  ];
  var allowedTransactionKeys2 = {
    chainId: true,
    data: true,
    gasLimit: true,
    gasPrice: true,
    nonce: true,
    to: true,
    value: true
  };
  function computeAddress(key2) {
    const publicKey = computePublicKey(key2);
    return getAddress(hexDataSlice(keccak256(hexDataSlice(publicKey, 1)), 12));
  }
  function recoverAddress(digest, signature2) {
    return computeAddress(recoverPublicKey(arrayify(digest), signature2));
  }
  function formatNumber(value, name2) {
    const result = stripZeros(BigNumber.from(value).toHexString());
    if (result.length > 32) {
      logger18.throwArgumentError("invalid length for " + name2, "transaction:" + name2, value);
    }
    return result;
  }
  function accessSetify(addr, storageKeys) {
    return {
      address: getAddress(addr),
      storageKeys: (storageKeys || []).map((storageKey, index) => {
        if (hexDataLength(storageKey) !== 32) {
          logger18.throwArgumentError("invalid access list storageKey", `accessList[${addr}:${index}]`, storageKey);
        }
        return storageKey.toLowerCase();
      })
    };
  }
  function accessListify(value) {
    if (Array.isArray(value)) {
      return value.map((set, index) => {
        if (Array.isArray(set)) {
          if (set.length > 2) {
            logger18.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${index}]`, set);
          }
          return accessSetify(set[0], set[1]);
        }
        return accessSetify(set.address, set.storageKeys);
      });
    }
    const result = Object.keys(value).map((addr) => {
      const storageKeys = value[addr].reduce((accum, storageKey) => {
        accum[storageKey] = true;
        return accum;
      }, {});
      return accessSetify(addr, Object.keys(storageKeys).sort());
    });
    result.sort((a, b) => a.address.localeCompare(b.address));
    return result;
  }
  function formatAccessList(value) {
    return accessListify(value).map((set) => [set.address, set.storageKeys]);
  }
  function _serializeEip2930(transaction, signature2) {
    const fields = [
      formatNumber(transaction.chainId || 0, "chainId"),
      formatNumber(transaction.nonce || 0, "nonce"),
      formatNumber(transaction.gasPrice || 0, "gasPrice"),
      formatNumber(transaction.gasLimit || 0, "gasLimit"),
      transaction.to != null ? getAddress(transaction.to) : "0x",
      formatNumber(transaction.value || 0, "value"),
      transaction.data || "0x",
      formatAccessList(transaction.accessList || [])
    ];
    if (signature2) {
      const sig = splitSignature(signature2);
      fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
      fields.push(stripZeros(sig.r));
      fields.push(stripZeros(sig.s));
    }
    return hexConcat(["0x01", encode(fields)]);
  }
  function _serialize(transaction, signature2) {
    checkProperties(transaction, allowedTransactionKeys2);
    const raw = [];
    transactionFields.forEach(function(fieldInfo) {
      let value = transaction[fieldInfo.name] || [];
      const options = {};
      if (fieldInfo.numeric) {
        options.hexPad = "left";
      }
      value = arrayify(hexlify(value, options));
      if (fieldInfo.length && value.length !== fieldInfo.length && value.length > 0) {
        logger18.throwArgumentError("invalid length for " + fieldInfo.name, "transaction:" + fieldInfo.name, value);
      }
      if (fieldInfo.maxLength) {
        value = stripZeros(value);
        if (value.length > fieldInfo.maxLength) {
          logger18.throwArgumentError("invalid length for " + fieldInfo.name, "transaction:" + fieldInfo.name, value);
        }
      }
      raw.push(hexlify(value));
    });
    let chainId = 0;
    if (transaction.chainId != null) {
      chainId = transaction.chainId;
      if (typeof chainId !== "number") {
        logger18.throwArgumentError("invalid transaction.chainId", "transaction", transaction);
      }
    } else if (signature2 && !isBytesLike(signature2) && signature2.v > 28) {
      chainId = Math.floor((signature2.v - 35) / 2);
    }
    if (chainId !== 0) {
      raw.push(hexlify(chainId));
      raw.push("0x");
      raw.push("0x");
    }
    if (!signature2) {
      return encode(raw);
    }
    const sig = splitSignature(signature2);
    let v = 27 + sig.recoveryParam;
    if (chainId !== 0) {
      raw.pop();
      raw.pop();
      raw.pop();
      v += chainId * 2 + 8;
      if (sig.v > 28 && sig.v !== v) {
        logger18.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", signature2);
      }
    } else if (sig.v !== v) {
      logger18.throwArgumentError("transaction.chainId/signature.v mismatch", "signature", signature2);
    }
    raw.push(hexlify(v));
    raw.push(stripZeros(arrayify(sig.r)));
    raw.push(stripZeros(arrayify(sig.s)));
    return encode(raw);
  }
  function serialize(transaction, signature2) {
    if (transaction.type == null) {
      if (transaction.accessList != null) {
        logger18.throwArgumentError("untyped transactions do not support accessList; include type: 1", "transaction", transaction);
      }
      return _serialize(transaction, signature2);
    }
    switch (transaction.type) {
      case 1:
        return _serializeEip2930(transaction, signature2);
      default:
        break;
    }
    return logger18.throwError(`unsupported transaction type: ${transaction.type}`, Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "serializeTransaction",
      transactionType: transaction.type
    });
  }
  function _parseEip2930(payload) {
    const transaction = decode(payload.slice(1));
    if (transaction.length !== 8 && transaction.length !== 11) {
      logger18.throwArgumentError("invalid component count for transaction type: 1", "payload", hexlify(payload));
    }
    const tx = {
      type: 1,
      chainId: handleNumber(transaction[0]).toNumber(),
      nonce: handleNumber(transaction[1]).toNumber(),
      gasPrice: handleNumber(transaction[2]),
      gasLimit: handleNumber(transaction[3]),
      to: handleAddress(transaction[4]),
      value: handleNumber(transaction[5]),
      data: transaction[6],
      accessList: accessListify(transaction[7])
    };
    if (transaction.length === 8) {
      return tx;
    }
    try {
      const recid = handleNumber(transaction[8]).toNumber();
      if (recid !== 0 && recid !== 1) {
        throw new Error("bad recid");
      }
      tx.v = recid;
    } catch (error) {
      logger18.throwArgumentError("invalid v for transaction type: 1", "v", transaction[8]);
    }
    tx.r = hexZeroPad(transaction[9], 32);
    tx.s = hexZeroPad(transaction[10], 32);
    try {
      const digest = keccak256(_serializeEip2930(tx));
      tx.from = recoverAddress(digest, { r: tx.r, s: tx.s, recoveryParam: tx.v });
    } catch (error) {
      console.log(error);
    }
    tx.hash = keccak256(payload);
    return tx;
  }
  function _parse(rawTransaction) {
    const transaction = decode(rawTransaction);
    if (transaction.length !== 9 && transaction.length !== 6) {
      logger18.throwArgumentError("invalid raw transaction", "rawTransaction", rawTransaction);
    }
    const tx = {
      nonce: handleNumber(transaction[0]).toNumber(),
      gasPrice: handleNumber(transaction[1]),
      gasLimit: handleNumber(transaction[2]),
      to: handleAddress(transaction[3]),
      value: handleNumber(transaction[4]),
      data: transaction[5],
      chainId: 0
    };
    if (transaction.length === 6) {
      return tx;
    }
    try {
      tx.v = BigNumber.from(transaction[6]).toNumber();
    } catch (error) {
      console.log(error);
      return tx;
    }
    tx.r = hexZeroPad(transaction[7], 32);
    tx.s = hexZeroPad(transaction[8], 32);
    if (BigNumber.from(tx.r).isZero() && BigNumber.from(tx.s).isZero()) {
      tx.chainId = tx.v;
      tx.v = 0;
    } else {
      tx.chainId = Math.floor((tx.v - 35) / 2);
      if (tx.chainId < 0) {
        tx.chainId = 0;
      }
      let recoveryParam = tx.v - 27;
      const raw = transaction.slice(0, 6);
      if (tx.chainId !== 0) {
        raw.push(hexlify(tx.chainId));
        raw.push("0x");
        raw.push("0x");
        recoveryParam -= tx.chainId * 2 + 8;
      }
      const digest = keccak256(encode(raw));
      try {
        tx.from = recoverAddress(digest, { r: hexlify(tx.r), s: hexlify(tx.s), recoveryParam });
      } catch (error) {
        console.log(error);
      }
      tx.hash = keccak256(rawTransaction);
    }
    tx.type = null;
    return tx;
  }
  function parse(rawTransaction) {
    const payload = arrayify(rawTransaction);
    if (payload[0] > 127) {
      return _parse(payload);
    }
    switch (payload[0]) {
      case 1:
        return _parseEip2930(payload);
      default:
        break;
    }
    return logger18.throwError(`unsupported transaction type: ${payload[0]}`, Logger.errors.UNSUPPORTED_OPERATION, {
      operation: "parseTransaction",
      transactionType: payload[0]
    });
  }

  // node_modules/@ethersproject/contracts/lib.esm/_version.js
  var version14 = "contracts/5.2.0";

  // node_modules/@ethersproject/contracts/lib.esm/index.js
  "use strict";
  var __awaiter4 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger19 = new Logger(version14);
  var allowedTransactionKeys3 = {
    chainId: true,
    data: true,
    from: true,
    gasLimit: true,
    gasPrice: true,
    nonce: true,
    to: true,
    value: true,
    type: true,
    accessList: true
  };
  function resolveName(resolver, nameOrPromise) {
    return __awaiter4(this, void 0, void 0, function* () {
      const name2 = yield nameOrPromise;
      try {
        return getAddress(name2);
      } catch (error) {
      }
      if (!resolver) {
        logger19.throwError("a provider or signer is needed to resolve ENS names", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "resolveName"
        });
      }
      const address = yield resolver.resolveName(name2);
      if (address == null) {
        logger19.throwArgumentError("resolver or addr is not configured for ENS name", "name", name2);
      }
      return address;
    });
  }
  function resolveAddresses(resolver, value, paramType) {
    return __awaiter4(this, void 0, void 0, function* () {
      if (Array.isArray(paramType)) {
        return yield Promise.all(paramType.map((paramType2, index) => {
          return resolveAddresses(resolver, Array.isArray(value) ? value[index] : value[paramType2.name], paramType2);
        }));
      }
      if (paramType.type === "address") {
        return yield resolveName(resolver, value);
      }
      if (paramType.type === "tuple") {
        return yield resolveAddresses(resolver, value, paramType.components);
      }
      if (paramType.baseType === "array") {
        if (!Array.isArray(value)) {
          return Promise.reject(new Error("invalid value for array"));
        }
        return yield Promise.all(value.map((v) => resolveAddresses(resolver, v, paramType.arrayChildren)));
      }
      return value;
    });
  }
  function populateTransaction(contract, fragment, args) {
    return __awaiter4(this, void 0, void 0, function* () {
      let overrides = {};
      if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
        overrides = shallowCopy(args.pop());
      }
      logger19.checkArgumentCount(args.length, fragment.inputs.length, "passed to contract");
      if (contract.signer) {
        if (overrides.from) {
          overrides.from = resolveProperties({
            override: resolveName(contract.signer, overrides.from),
            signer: contract.signer.getAddress()
          }).then((check) => __awaiter4(this, void 0, void 0, function* () {
            if (getAddress(check.signer) !== check.override) {
              logger19.throwError("Contract with a Signer cannot override from", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "overrides.from"
              });
            }
            return check.override;
          }));
        } else {
          overrides.from = contract.signer.getAddress();
        }
      } else if (overrides.from) {
        overrides.from = resolveName(contract.provider, overrides.from);
      }
      const resolved = yield resolveProperties({
        args: resolveAddresses(contract.signer || contract.provider, args, fragment.inputs),
        address: contract.resolvedAddress,
        overrides: resolveProperties(overrides) || {}
      });
      const data4 = contract.interface.encodeFunctionData(fragment, resolved.args);
      const tx = {
        data: data4,
        to: resolved.address
      };
      const ro = resolved.overrides;
      if (ro.nonce != null) {
        tx.nonce = BigNumber.from(ro.nonce).toNumber();
      }
      if (ro.gasLimit != null) {
        tx.gasLimit = BigNumber.from(ro.gasLimit);
      }
      if (ro.gasPrice != null) {
        tx.gasPrice = BigNumber.from(ro.gasPrice);
      }
      if (ro.from != null) {
        tx.from = ro.from;
      }
      if (ro.type != null) {
        tx.type = ro.type;
      }
      if (ro.accessList != null) {
        tx.accessList = accessListify(ro.accessList);
      }
      if (tx.gasLimit == null && fragment.gas != null) {
        let intrinsic = 21e3;
        const bytes = arrayify(data4);
        for (let i = 0; i < bytes.length; i++) {
          intrinsic += 4;
          if (bytes[i]) {
            intrinsic += 64;
          }
        }
        tx.gasLimit = BigNumber.from(fragment.gas).add(intrinsic);
      }
      if (ro.value) {
        const roValue = BigNumber.from(ro.value);
        if (!roValue.isZero() && !fragment.payable) {
          logger19.throwError("non-payable method cannot override value", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "overrides.value",
            value: overrides.value
          });
        }
        tx.value = roValue;
      }
      delete overrides.nonce;
      delete overrides.gasLimit;
      delete overrides.gasPrice;
      delete overrides.from;
      delete overrides.value;
      delete overrides.type;
      delete overrides.accessList;
      const leftovers = Object.keys(overrides).filter((key2) => overrides[key2] != null);
      if (leftovers.length) {
        logger19.throwError(`cannot override ${leftovers.map((l) => JSON.stringify(l)).join(",")}`, Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "overrides",
          overrides: leftovers
        });
      }
      return tx;
    });
  }
  function buildPopulate(contract, fragment) {
    return function(...args) {
      return populateTransaction(contract, fragment, args);
    };
  }
  function buildEstimate(contract, fragment) {
    const signerOrProvider = contract.signer || contract.provider;
    return function(...args) {
      return __awaiter4(this, void 0, void 0, function* () {
        if (!signerOrProvider) {
          logger19.throwError("estimate require a provider or signer", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "estimateGas"
          });
        }
        const tx = yield populateTransaction(contract, fragment, args);
        return yield signerOrProvider.estimateGas(tx);
      });
    };
  }
  function buildCall(contract, fragment, collapseSimple) {
    const signerOrProvider = contract.signer || contract.provider;
    return function(...args) {
      return __awaiter4(this, void 0, void 0, function* () {
        let blockTag = void 0;
        if (args.length === fragment.inputs.length + 1 && typeof args[args.length - 1] === "object") {
          const overrides = shallowCopy(args.pop());
          if (overrides.blockTag != null) {
            blockTag = yield overrides.blockTag;
          }
          delete overrides.blockTag;
          args.push(overrides);
        }
        if (contract.deployTransaction != null) {
          yield contract._deployed(blockTag);
        }
        const tx = yield populateTransaction(contract, fragment, args);
        const result = yield signerOrProvider.call(tx, blockTag);
        try {
          let value = contract.interface.decodeFunctionResult(fragment, result);
          if (collapseSimple && fragment.outputs.length === 1) {
            value = value[0];
          }
          return value;
        } catch (error) {
          if (error.code === Logger.errors.CALL_EXCEPTION) {
            error.address = contract.address;
            error.args = args;
            error.transaction = tx;
          }
          throw error;
        }
      });
    };
  }
  function buildSend(contract, fragment) {
    return function(...args) {
      return __awaiter4(this, void 0, void 0, function* () {
        if (!contract.signer) {
          logger19.throwError("sending a transaction requires a signer", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "sendTransaction"
          });
        }
        if (contract.deployTransaction != null) {
          yield contract._deployed();
        }
        const txRequest = yield populateTransaction(contract, fragment, args);
        const tx = yield contract.signer.sendTransaction(txRequest);
        const wait = tx.wait.bind(tx);
        tx.wait = (confirmations) => {
          return wait(confirmations).then((receipt) => {
            receipt.events = receipt.logs.map((log) => {
              let event = deepCopy(log);
              let parsed = null;
              try {
                parsed = contract.interface.parseLog(log);
              } catch (e) {
              }
              if (parsed) {
                event.args = parsed.args;
                event.decode = (data4, topics) => {
                  return contract.interface.decodeEventLog(parsed.eventFragment, data4, topics);
                };
                event.event = parsed.name;
                event.eventSignature = parsed.signature;
              }
              event.removeListener = () => {
                return contract.provider;
              };
              event.getBlock = () => {
                return contract.provider.getBlock(receipt.blockHash);
              };
              event.getTransaction = () => {
                return contract.provider.getTransaction(receipt.transactionHash);
              };
              event.getTransactionReceipt = () => {
                return Promise.resolve(receipt);
              };
              return event;
            });
            return receipt;
          });
        };
        return tx;
      });
    };
  }
  function buildDefault(contract, fragment, collapseSimple) {
    if (fragment.constant) {
      return buildCall(contract, fragment, collapseSimple);
    }
    return buildSend(contract, fragment);
  }
  function getEventTag(filter) {
    if (filter.address && (filter.topics == null || filter.topics.length === 0)) {
      return "*";
    }
    return (filter.address || "*") + "@" + (filter.topics ? filter.topics.map((topic) => {
      if (Array.isArray(topic)) {
        return topic.join("|");
      }
      return topic;
    }).join(":") : "");
  }
  var RunningEvent = class {
    constructor(tag, filter) {
      defineReadOnly(this, "tag", tag);
      defineReadOnly(this, "filter", filter);
      this._listeners = [];
    }
    addListener(listener, once) {
      this._listeners.push({ listener, once });
    }
    removeListener(listener) {
      let done = false;
      this._listeners = this._listeners.filter((item) => {
        if (done || item.listener !== listener) {
          return true;
        }
        done = true;
        return false;
      });
    }
    removeAllListeners() {
      this._listeners = [];
    }
    listeners() {
      return this._listeners.map((i) => i.listener);
    }
    listenerCount() {
      return this._listeners.length;
    }
    run(args) {
      const listenerCount = this.listenerCount();
      this._listeners = this._listeners.filter((item) => {
        const argsCopy = args.slice();
        setTimeout(() => {
          item.listener.apply(this, argsCopy);
        }, 0);
        return !item.once;
      });
      return listenerCount;
    }
    prepareEvent(event) {
    }
    getEmit(event) {
      return [event];
    }
  };
  var ErrorRunningEvent = class extends RunningEvent {
    constructor() {
      super("error", null);
    }
  };
  var FragmentRunningEvent = class extends RunningEvent {
    constructor(address, contractInterface, fragment, topics) {
      const filter = {
        address
      };
      let topic = contractInterface.getEventTopic(fragment);
      if (topics) {
        if (topic !== topics[0]) {
          logger19.throwArgumentError("topic mismatch", "topics", topics);
        }
        filter.topics = topics.slice();
      } else {
        filter.topics = [topic];
      }
      super(getEventTag(filter), filter);
      defineReadOnly(this, "address", address);
      defineReadOnly(this, "interface", contractInterface);
      defineReadOnly(this, "fragment", fragment);
    }
    prepareEvent(event) {
      super.prepareEvent(event);
      event.event = this.fragment.name;
      event.eventSignature = this.fragment.format();
      event.decode = (data4, topics) => {
        return this.interface.decodeEventLog(this.fragment, data4, topics);
      };
      try {
        event.args = this.interface.decodeEventLog(this.fragment, event.data, event.topics);
      } catch (error) {
        event.args = null;
        event.decodeError = error;
      }
    }
    getEmit(event) {
      const errors = checkResultErrors(event.args);
      if (errors.length) {
        throw errors[0].error;
      }
      const args = (event.args || []).slice();
      args.push(event);
      return args;
    }
  };
  var WildcardRunningEvent = class extends RunningEvent {
    constructor(address, contractInterface) {
      super("*", { address });
      defineReadOnly(this, "address", address);
      defineReadOnly(this, "interface", contractInterface);
    }
    prepareEvent(event) {
      super.prepareEvent(event);
      try {
        const parsed = this.interface.parseLog(event);
        event.event = parsed.name;
        event.eventSignature = parsed.signature;
        event.decode = (data4, topics) => {
          return this.interface.decodeEventLog(parsed.eventFragment, data4, topics);
        };
        event.args = parsed.args;
      } catch (error) {
      }
    }
  };
  var BaseContract = class {
    constructor(addressOrName, contractInterface, signerOrProvider) {
      logger19.checkNew(new.target, Contract);
      defineReadOnly(this, "interface", getStatic(new.target, "getInterface")(contractInterface));
      if (signerOrProvider == null) {
        defineReadOnly(this, "provider", null);
        defineReadOnly(this, "signer", null);
      } else if (Signer.isSigner(signerOrProvider)) {
        defineReadOnly(this, "provider", signerOrProvider.provider || null);
        defineReadOnly(this, "signer", signerOrProvider);
      } else if (Provider.isProvider(signerOrProvider)) {
        defineReadOnly(this, "provider", signerOrProvider);
        defineReadOnly(this, "signer", null);
      } else {
        logger19.throwArgumentError("invalid signer or provider", "signerOrProvider", signerOrProvider);
      }
      defineReadOnly(this, "callStatic", {});
      defineReadOnly(this, "estimateGas", {});
      defineReadOnly(this, "functions", {});
      defineReadOnly(this, "populateTransaction", {});
      defineReadOnly(this, "filters", {});
      {
        const uniqueFilters = {};
        Object.keys(this.interface.events).forEach((eventSignature) => {
          const event = this.interface.events[eventSignature];
          defineReadOnly(this.filters, eventSignature, (...args) => {
            return {
              address: this.address,
              topics: this.interface.encodeFilterTopics(event, args)
            };
          });
          if (!uniqueFilters[event.name]) {
            uniqueFilters[event.name] = [];
          }
          uniqueFilters[event.name].push(eventSignature);
        });
        Object.keys(uniqueFilters).forEach((name2) => {
          const filters = uniqueFilters[name2];
          if (filters.length === 1) {
            defineReadOnly(this.filters, name2, this.filters[filters[0]]);
          } else {
            logger19.warn(`Duplicate definition of ${name2} (${filters.join(", ")})`);
          }
        });
      }
      defineReadOnly(this, "_runningEvents", {});
      defineReadOnly(this, "_wrappedEmits", {});
      if (addressOrName == null) {
        logger19.throwArgumentError("invalid contract address or ENS name", "addressOrName", addressOrName);
      }
      defineReadOnly(this, "address", addressOrName);
      if (this.provider) {
        defineReadOnly(this, "resolvedAddress", resolveName(this.provider, addressOrName));
      } else {
        try {
          defineReadOnly(this, "resolvedAddress", Promise.resolve(getAddress(addressOrName)));
        } catch (error) {
          logger19.throwError("provider is required to use ENS name as contract address", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "new Contract"
          });
        }
      }
      const uniqueNames = {};
      const uniqueSignatures = {};
      Object.keys(this.interface.functions).forEach((signature2) => {
        const fragment = this.interface.functions[signature2];
        if (uniqueSignatures[signature2]) {
          logger19.warn(`Duplicate ABI entry for ${JSON.stringify(name)}`);
          return;
        }
        uniqueSignatures[signature2] = true;
        {
          const name2 = fragment.name;
          if (!uniqueNames[name2]) {
            uniqueNames[name2] = [];
          }
          uniqueNames[name2].push(signature2);
        }
        if (this[signature2] == null) {
          defineReadOnly(this, signature2, buildDefault(this, fragment, true));
        }
        if (this.functions[signature2] == null) {
          defineReadOnly(this.functions, signature2, buildDefault(this, fragment, false));
        }
        if (this.callStatic[signature2] == null) {
          defineReadOnly(this.callStatic, signature2, buildCall(this, fragment, true));
        }
        if (this.populateTransaction[signature2] == null) {
          defineReadOnly(this.populateTransaction, signature2, buildPopulate(this, fragment));
        }
        if (this.estimateGas[signature2] == null) {
          defineReadOnly(this.estimateGas, signature2, buildEstimate(this, fragment));
        }
      });
      Object.keys(uniqueNames).forEach((name2) => {
        const signatures = uniqueNames[name2];
        if (signatures.length > 1) {
          return;
        }
        const signature2 = signatures[0];
        try {
          if (this[name2] == null) {
            defineReadOnly(this, name2, this[signature2]);
          }
        } catch (e) {
        }
        if (this.functions[name2] == null) {
          defineReadOnly(this.functions, name2, this.functions[signature2]);
        }
        if (this.callStatic[name2] == null) {
          defineReadOnly(this.callStatic, name2, this.callStatic[signature2]);
        }
        if (this.populateTransaction[name2] == null) {
          defineReadOnly(this.populateTransaction, name2, this.populateTransaction[signature2]);
        }
        if (this.estimateGas[name2] == null) {
          defineReadOnly(this.estimateGas, name2, this.estimateGas[signature2]);
        }
      });
    }
    static getContractAddress(transaction) {
      return getContractAddress(transaction);
    }
    static getInterface(contractInterface) {
      if (Interface.isInterface(contractInterface)) {
        return contractInterface;
      }
      return new Interface(contractInterface);
    }
    deployed() {
      return this._deployed();
    }
    _deployed(blockTag) {
      if (!this._deployedPromise) {
        if (this.deployTransaction) {
          this._deployedPromise = this.deployTransaction.wait().then(() => {
            return this;
          });
        } else {
          this._deployedPromise = this.provider.getCode(this.address, blockTag).then((code) => {
            if (code === "0x") {
              logger19.throwError("contract not deployed", Logger.errors.UNSUPPORTED_OPERATION, {
                contractAddress: this.address,
                operation: "getDeployed"
              });
            }
            return this;
          });
        }
      }
      return this._deployedPromise;
    }
    fallback(overrides) {
      if (!this.signer) {
        logger19.throwError("sending a transactions require a signer", Logger.errors.UNSUPPORTED_OPERATION, { operation: "sendTransaction(fallback)" });
      }
      const tx = shallowCopy(overrides || {});
      ["from", "to"].forEach(function(key2) {
        if (tx[key2] == null) {
          return;
        }
        logger19.throwError("cannot override " + key2, Logger.errors.UNSUPPORTED_OPERATION, { operation: key2 });
      });
      tx.to = this.resolvedAddress;
      return this.deployed().then(() => {
        return this.signer.sendTransaction(tx);
      });
    }
    connect(signerOrProvider) {
      if (typeof signerOrProvider === "string") {
        signerOrProvider = new VoidSigner(signerOrProvider, this.provider);
      }
      const contract = new this.constructor(this.address, this.interface, signerOrProvider);
      if (this.deployTransaction) {
        defineReadOnly(contract, "deployTransaction", this.deployTransaction);
      }
      return contract;
    }
    attach(addressOrName) {
      return new this.constructor(addressOrName, this.interface, this.signer || this.provider);
    }
    static isIndexed(value) {
      return Indexed.isIndexed(value);
    }
    _normalizeRunningEvent(runningEvent) {
      if (this._runningEvents[runningEvent.tag]) {
        return this._runningEvents[runningEvent.tag];
      }
      return runningEvent;
    }
    _getRunningEvent(eventName) {
      if (typeof eventName === "string") {
        if (eventName === "error") {
          return this._normalizeRunningEvent(new ErrorRunningEvent());
        }
        if (eventName === "event") {
          return this._normalizeRunningEvent(new RunningEvent("event", null));
        }
        if (eventName === "*") {
          return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
        }
        const fragment = this.interface.getEvent(eventName);
        return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment));
      }
      if (eventName.topics && eventName.topics.length > 0) {
        try {
          const topic = eventName.topics[0];
          if (typeof topic !== "string") {
            throw new Error("invalid topic");
          }
          const fragment = this.interface.getEvent(topic);
          return this._normalizeRunningEvent(new FragmentRunningEvent(this.address, this.interface, fragment, eventName.topics));
        } catch (error) {
        }
        const filter = {
          address: this.address,
          topics: eventName.topics
        };
        return this._normalizeRunningEvent(new RunningEvent(getEventTag(filter), filter));
      }
      return this._normalizeRunningEvent(new WildcardRunningEvent(this.address, this.interface));
    }
    _checkRunningEvents(runningEvent) {
      if (runningEvent.listenerCount() === 0) {
        delete this._runningEvents[runningEvent.tag];
        const emit = this._wrappedEmits[runningEvent.tag];
        if (emit && runningEvent.filter) {
          this.provider.off(runningEvent.filter, emit);
          delete this._wrappedEmits[runningEvent.tag];
        }
      }
    }
    _wrapEvent(runningEvent, log, listener) {
      const event = deepCopy(log);
      event.removeListener = () => {
        if (!listener) {
          return;
        }
        runningEvent.removeListener(listener);
        this._checkRunningEvents(runningEvent);
      };
      event.getBlock = () => {
        return this.provider.getBlock(log.blockHash);
      };
      event.getTransaction = () => {
        return this.provider.getTransaction(log.transactionHash);
      };
      event.getTransactionReceipt = () => {
        return this.provider.getTransactionReceipt(log.transactionHash);
      };
      runningEvent.prepareEvent(event);
      return event;
    }
    _addEventListener(runningEvent, listener, once) {
      if (!this.provider) {
        logger19.throwError("events require a provider or a signer with a provider", Logger.errors.UNSUPPORTED_OPERATION, { operation: "once" });
      }
      runningEvent.addListener(listener, once);
      this._runningEvents[runningEvent.tag] = runningEvent;
      if (!this._wrappedEmits[runningEvent.tag]) {
        const wrappedEmit = (log) => {
          let event = this._wrapEvent(runningEvent, log, listener);
          if (event.decodeError == null) {
            try {
              const args = runningEvent.getEmit(event);
              this.emit(runningEvent.filter, ...args);
            } catch (error) {
              event.decodeError = error.error;
            }
          }
          if (runningEvent.filter != null) {
            this.emit("event", event);
          }
          if (event.decodeError != null) {
            this.emit("error", event.decodeError, event);
          }
        };
        this._wrappedEmits[runningEvent.tag] = wrappedEmit;
        if (runningEvent.filter != null) {
          this.provider.on(runningEvent.filter, wrappedEmit);
        }
      }
    }
    queryFilter(event, fromBlockOrBlockhash, toBlock) {
      const runningEvent = this._getRunningEvent(event);
      const filter = shallowCopy(runningEvent.filter);
      if (typeof fromBlockOrBlockhash === "string" && isHexString(fromBlockOrBlockhash, 32)) {
        if (toBlock != null) {
          logger19.throwArgumentError("cannot specify toBlock with blockhash", "toBlock", toBlock);
        }
        filter.blockHash = fromBlockOrBlockhash;
      } else {
        filter.fromBlock = fromBlockOrBlockhash != null ? fromBlockOrBlockhash : 0;
        filter.toBlock = toBlock != null ? toBlock : "latest";
      }
      return this.provider.getLogs(filter).then((logs) => {
        return logs.map((log) => this._wrapEvent(runningEvent, log, null));
      });
    }
    on(event, listener) {
      this._addEventListener(this._getRunningEvent(event), listener, false);
      return this;
    }
    once(event, listener) {
      this._addEventListener(this._getRunningEvent(event), listener, true);
      return this;
    }
    emit(eventName, ...args) {
      if (!this.provider) {
        return false;
      }
      const runningEvent = this._getRunningEvent(eventName);
      const result = runningEvent.run(args) > 0;
      this._checkRunningEvents(runningEvent);
      return result;
    }
    listenerCount(eventName) {
      if (!this.provider) {
        return 0;
      }
      if (eventName == null) {
        return Object.keys(this._runningEvents).reduce((accum, key2) => {
          return accum + this._runningEvents[key2].listenerCount();
        }, 0);
      }
      return this._getRunningEvent(eventName).listenerCount();
    }
    listeners(eventName) {
      if (!this.provider) {
        return [];
      }
      if (eventName == null) {
        const result = [];
        for (let tag in this._runningEvents) {
          this._runningEvents[tag].listeners().forEach((listener) => {
            result.push(listener);
          });
        }
        return result;
      }
      return this._getRunningEvent(eventName).listeners();
    }
    removeAllListeners(eventName) {
      if (!this.provider) {
        return this;
      }
      if (eventName == null) {
        for (const tag in this._runningEvents) {
          const runningEvent2 = this._runningEvents[tag];
          runningEvent2.removeAllListeners();
          this._checkRunningEvents(runningEvent2);
        }
        return this;
      }
      const runningEvent = this._getRunningEvent(eventName);
      runningEvent.removeAllListeners();
      this._checkRunningEvents(runningEvent);
      return this;
    }
    off(eventName, listener) {
      if (!this.provider) {
        return this;
      }
      const runningEvent = this._getRunningEvent(eventName);
      runningEvent.removeListener(listener);
      this._checkRunningEvents(runningEvent);
      return this;
    }
    removeListener(eventName, listener) {
      return this.off(eventName, listener);
    }
  };
  var Contract = class extends BaseContract {
  };
  var ContractFactory = class {
    constructor(contractInterface, bytecode, signer) {
      let bytecodeHex = null;
      if (typeof bytecode === "string") {
        bytecodeHex = bytecode;
      } else if (isBytes(bytecode)) {
        bytecodeHex = hexlify(bytecode);
      } else if (bytecode && typeof bytecode.object === "string") {
        bytecodeHex = bytecode.object;
      } else {
        bytecodeHex = "!";
      }
      if (bytecodeHex.substring(0, 2) !== "0x") {
        bytecodeHex = "0x" + bytecodeHex;
      }
      if (!isHexString(bytecodeHex) || bytecodeHex.length % 2) {
        logger19.throwArgumentError("invalid bytecode", "bytecode", bytecode);
      }
      if (signer && !Signer.isSigner(signer)) {
        logger19.throwArgumentError("invalid signer", "signer", signer);
      }
      defineReadOnly(this, "bytecode", bytecodeHex);
      defineReadOnly(this, "interface", getStatic(new.target, "getInterface")(contractInterface));
      defineReadOnly(this, "signer", signer || null);
    }
    getDeployTransaction(...args) {
      let tx = {};
      if (args.length === this.interface.deploy.inputs.length + 1 && typeof args[args.length - 1] === "object") {
        tx = shallowCopy(args.pop());
        for (const key2 in tx) {
          if (!allowedTransactionKeys3[key2]) {
            throw new Error("unknown transaction override " + key2);
          }
        }
      }
      ["data", "from", "to"].forEach((key2) => {
        if (tx[key2] == null) {
          return;
        }
        logger19.throwError("cannot override " + key2, Logger.errors.UNSUPPORTED_OPERATION, { operation: key2 });
      });
      logger19.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
      tx.data = hexlify(concat([
        this.bytecode,
        this.interface.encodeDeploy(args)
      ]));
      return tx;
    }
    deploy(...args) {
      return __awaiter4(this, void 0, void 0, function* () {
        let overrides = {};
        if (args.length === this.interface.deploy.inputs.length + 1) {
          overrides = args.pop();
        }
        logger19.checkArgumentCount(args.length, this.interface.deploy.inputs.length, " in Contract constructor");
        const params = yield resolveAddresses(this.signer, args, this.interface.deploy.inputs);
        params.push(overrides);
        const unsignedTx = this.getDeployTransaction(...params);
        const tx = yield this.signer.sendTransaction(unsignedTx);
        const address = getStatic(this.constructor, "getContractAddress")(tx);
        const contract = getStatic(this.constructor, "getContract")(address, this.interface, this.signer);
        defineReadOnly(contract, "deployTransaction", tx);
        return contract;
      });
    }
    attach(address) {
      return this.constructor.getContract(address, this.interface, this.signer);
    }
    connect(signer) {
      return new this.constructor(this.interface, this.bytecode, signer);
    }
    static fromSolidity(compilerOutput, signer) {
      if (compilerOutput == null) {
        logger19.throwError("missing compiler output", Logger.errors.MISSING_ARGUMENT, { argument: "compilerOutput" });
      }
      if (typeof compilerOutput === "string") {
        compilerOutput = JSON.parse(compilerOutput);
      }
      const abi4 = compilerOutput.abi;
      let bytecode = null;
      if (compilerOutput.bytecode) {
        bytecode = compilerOutput.bytecode;
      } else if (compilerOutput.evm && compilerOutput.evm.bytecode) {
        bytecode = compilerOutput.evm.bytecode;
      }
      return new this(abi4, bytecode, signer);
    }
    static getInterface(contractInterface) {
      return Contract.getInterface(contractInterface);
    }
    static getContractAddress(tx) {
      return getContractAddress(tx);
    }
    static getContract(address, contractInterface, signer) {
      return new Contract(address, contractInterface, signer);
    }
  };

  // node_modules/@ethersproject/basex/lib.esm/index.js
  var BaseX = class {
    constructor(alphabet) {
      defineReadOnly(this, "alphabet", alphabet);
      defineReadOnly(this, "base", alphabet.length);
      defineReadOnly(this, "_alphabetMap", {});
      defineReadOnly(this, "_leader", alphabet.charAt(0));
      for (let i = 0; i < alphabet.length; i++) {
        this._alphabetMap[alphabet.charAt(i)] = i;
      }
    }
    encode(value) {
      let source = arrayify(value);
      if (source.length === 0) {
        return "";
      }
      let digits = [0];
      for (let i = 0; i < source.length; ++i) {
        let carry = source[i];
        for (let j = 0; j < digits.length; ++j) {
          carry += digits[j] << 8;
          digits[j] = carry % this.base;
          carry = carry / this.base | 0;
        }
        while (carry > 0) {
          digits.push(carry % this.base);
          carry = carry / this.base | 0;
        }
      }
      let string = "";
      for (let k = 0; source[k] === 0 && k < source.length - 1; ++k) {
        string += this._leader;
      }
      for (let q = digits.length - 1; q >= 0; --q) {
        string += this.alphabet[digits[q]];
      }
      return string;
    }
    decode(value) {
      if (typeof value !== "string") {
        throw new TypeError("Expected String");
      }
      let bytes = [];
      if (value.length === 0) {
        return new Uint8Array(bytes);
      }
      bytes.push(0);
      for (let i = 0; i < value.length; i++) {
        let byte = this._alphabetMap[value[i]];
        if (byte === void 0) {
          throw new Error("Non-base" + this.base + " character");
        }
        let carry = byte;
        for (let j = 0; j < bytes.length; ++j) {
          carry += bytes[j] * this.base;
          bytes[j] = carry & 255;
          carry >>= 8;
        }
        while (carry > 0) {
          bytes.push(carry & 255);
          carry >>= 8;
        }
      }
      for (let k = 0; value[k] === this._leader && k < value.length - 1; ++k) {
        bytes.push(0);
      }
      return arrayify(new Uint8Array(bytes.reverse()));
    }
  };
  var Base32 = new BaseX("abcdefghijklmnopqrstuvwxyz234567");
  var Base58 = new BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

  // node_modules/@ethersproject/sha2/lib.esm/sha2.js
  var import_hash3 = __toModule(require_hash2());

  // node_modules/@ethersproject/sha2/lib.esm/types.js
  var SupportedAlgorithm;
  (function(SupportedAlgorithm2) {
    SupportedAlgorithm2["sha256"] = "sha256";
    SupportedAlgorithm2["sha512"] = "sha512";
  })(SupportedAlgorithm || (SupportedAlgorithm = {}));

  // node_modules/@ethersproject/sha2/lib.esm/_version.js
  var version15 = "sha2/5.2.0";

  // node_modules/@ethersproject/sha2/lib.esm/sha2.js
  "use strict";
  var logger20 = new Logger(version15);
  function ripemd160(data4) {
    return "0x" + import_hash3.default.ripemd160().update(arrayify(data4)).digest("hex");
  }
  function sha256(data4) {
    return "0x" + import_hash3.default.sha256().update(arrayify(data4)).digest("hex");
  }
  function sha512(data4) {
    return "0x" + import_hash3.default.sha512().update(arrayify(data4)).digest("hex");
  }
  function computeHmac(algorithm, key2, data4) {
    if (!SupportedAlgorithm[algorithm]) {
      logger20.throwError("unsupported algorithm " + algorithm, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "hmac",
        algorithm
      });
    }
    return "0x" + import_hash3.default.hmac(import_hash3.default[algorithm], arrayify(key2)).update(arrayify(data4)).digest("hex");
  }

  // node_modules/@ethersproject/pbkdf2/lib.esm/pbkdf2.js
  "use strict";
  function pbkdf2(password, salt, iterations, keylen, hashAlgorithm) {
    password = arrayify(password);
    salt = arrayify(salt);
    let hLen;
    let l = 1;
    const DK = new Uint8Array(keylen);
    const block1 = new Uint8Array(salt.length + 4);
    block1.set(salt);
    let r;
    let T;
    for (let i = 1; i <= l; i++) {
      block1[salt.length] = i >> 24 & 255;
      block1[salt.length + 1] = i >> 16 & 255;
      block1[salt.length + 2] = i >> 8 & 255;
      block1[salt.length + 3] = i & 255;
      let U = arrayify(computeHmac(hashAlgorithm, password, block1));
      if (!hLen) {
        hLen = U.length;
        T = new Uint8Array(hLen);
        l = Math.ceil(keylen / hLen);
        r = keylen - (l - 1) * hLen;
      }
      T.set(U);
      for (let j = 1; j < iterations; j++) {
        U = arrayify(computeHmac(hashAlgorithm, password, U));
        for (let k = 0; k < hLen; k++)
          T[k] ^= U[k];
      }
      const destPos = (i - 1) * hLen;
      const len = i === l ? r : hLen;
      DK.set(arrayify(T).slice(0, len), destPos);
    }
    return hexlify(DK);
  }

  // node_modules/@ethersproject/wordlists/lib.esm/_version.js
  var version16 = "wordlists/5.2.0";

  // node_modules/@ethersproject/wordlists/lib.esm/wordlist.js
  "use strict";
  var exportWordlist = false;
  var logger21 = new Logger(version16);
  var Wordlist = class {
    constructor(locale) {
      logger21.checkAbstract(new.target, Wordlist);
      defineReadOnly(this, "locale", locale);
    }
    split(mnemonic) {
      return mnemonic.toLowerCase().split(/ +/g);
    }
    join(words6) {
      return words6.join(" ");
    }
    static check(wordlist9) {
      const words6 = [];
      for (let i = 0; i < 2048; i++) {
        const word = wordlist9.getWord(i);
        if (i !== wordlist9.getWordIndex(word)) {
          return "0x";
        }
        words6.push(word);
      }
      return id(words6.join("\n") + "\n");
    }
    static register(lang, name2) {
      if (!name2) {
        name2 = lang.locale;
      }
      if (exportWordlist) {
        try {
          const anyGlobal2 = window;
          if (anyGlobal2._ethers && anyGlobal2._ethers.wordlists) {
            if (!anyGlobal2._ethers.wordlists[name2]) {
              defineReadOnly(anyGlobal2._ethers.wordlists, name2, lang);
            }
          }
        } catch (error) {
        }
      }
    }
  };

  // node_modules/@ethersproject/wordlists/lib.esm/lang-cz.js
  "use strict";
  var words = "AbdikaceAbecedaAdresaAgreseAkceAktovkaAlejAlkoholAmputaceAnanasAndulkaAnekdotaAnketaAntikaAnulovatArchaAroganceAsfaltAsistentAspiraceAstmaAstronomAtlasAtletikaAtolAutobusAzylBabkaBachorBacilBaculkaBadatelBagetaBagrBahnoBakterieBaladaBaletkaBalkonBalonekBalvanBalzaBambusBankomatBarbarBaretBarmanBarokoBarvaBaterkaBatohBavlnaBazalkaBazilikaBazukaBednaBeranBesedaBestieBetonBezinkaBezmocBeztakBicyklBidloBiftekBikinyBilanceBiografBiologBitvaBizonBlahobytBlatouchBlechaBleduleBleskBlikatBliznaBlokovatBlouditBludBobekBobrBodlinaBodnoutBohatostBojkotBojovatBokorysBolestBorecBoroviceBotaBoubelBouchatBoudaBouleBouratBoxerBradavkaBramboraBrankaBratrBreptaBriketaBrkoBrlohBronzBroskevBrunetkaBrusinkaBrzdaBrzyBublinaBubnovatBuchtaBuditelBudkaBudovaBufetBujarostBukviceBuldokBulvaBundaBunkrBurzaButikBuvolBuzolaBydletBylinaBytovkaBzukotCapartCarevnaCedrCeduleCejchCejnCelaCelerCelkemCelniceCeninaCennostCenovkaCentrumCenzorCestopisCetkaChalupaChapadloCharitaChataChechtatChemieChichotChirurgChladChlebaChlubitChmelChmuraChobotChocholChodbaCholeraChomoutChopitChorobaChovChrapotChrlitChrtChrupChtivostChudinaChutnatChvatChvilkaChvostChybaChystatChytitCibuleCigaretaCihelnaCihlaCinkotCirkusCisternaCitaceCitrusCizinecCizostClonaCokolivCouvatCtitelCtnostCudnostCuketaCukrCupotCvaknoutCvalCvikCvrkotCyklistaDalekoDarebaDatelDatumDceraDebataDechovkaDecibelDeficitDeflaceDeklDekretDemokratDepreseDerbyDeskaDetektivDikobrazDiktovatDiodaDiplomDiskDisplejDivadloDivochDlahaDlouhoDluhopisDnesDobroDobytekDocentDochutitDodnesDohledDohodaDohraDojemDojniceDokladDokolaDoktorDokumentDolarDolevaDolinaDomaDominantDomluvitDomovDonutitDopadDopisDoplnitDoposudDoprovodDopustitDorazitDorostDortDosahDoslovDostatekDosudDosytaDotazDotekDotknoutDoufatDoutnatDovozceDozaduDoznatDozorceDrahotaDrakDramatikDravecDrazeDrdolDrobnostDrogerieDrozdDrsnostDrtitDrzostDubenDuchovnoDudekDuhaDuhovkaDusitDusnoDutostDvojiceDvorecDynamitEkologEkonomieElektronElipsaEmailEmiseEmoceEmpatieEpizodaEpochaEpopejEposEsejEsenceEskortaEskymoEtiketaEuforieEvoluceExekuceExkurzeExpediceExplozeExportExtraktFackaFajfkaFakultaFanatikFantazieFarmacieFavoritFazoleFederaceFejetonFenkaFialkaFigurantFilozofFiltrFinanceFintaFixaceFjordFlanelFlirtFlotilaFondFosforFotbalFotkaFotonFrakceFreskaFrontaFukarFunkceFyzikaGalejeGarantGenetikaGeologGilotinaGlazuraGlejtGolemGolfistaGotikaGrafGramofonGranuleGrepGrilGrogGroteskaGumaHadiceHadrHalaHalenkaHanbaHanopisHarfaHarpunaHavranHebkostHejkalHejnoHejtmanHektarHelmaHematomHerecHernaHesloHezkyHistorikHladovkaHlasivkyHlavaHledatHlenHlodavecHlohHloupostHltatHlubinaHluchotaHmatHmotaHmyzHnisHnojivoHnoutHoblinaHobojHochHodinyHodlatHodnotaHodovatHojnostHokejHolinkaHolkaHolubHomoleHonitbaHonoraceHoralHordaHorizontHorkoHorlivecHormonHorninaHoroskopHorstvoHospodaHostinaHotovostHoubaHoufHoupatHouskaHovorHradbaHraniceHravostHrazdaHrbolekHrdinaHrdloHrdostHrnekHrobkaHromadaHrotHroudaHrozenHrstkaHrubostHryzatHubenostHubnoutHudbaHukotHumrHusitaHustotaHvozdHybnostHydrantHygienaHymnaHysterikIdylkaIhnedIkonaIluzeImunitaInfekceInflaceInkasoInovaceInspekceInternetInvalidaInvestorInzerceIronieJablkoJachtaJahodaJakmileJakostJalovecJantarJarmarkJaroJasanJasnoJatkaJavorJazykJedinecJedleJednatelJehlanJekotJelenJelitoJemnostJenomJepiceJeseterJevitJezdecJezeroJinakJindyJinochJiskraJistotaJitrniceJizvaJmenovatJogurtJurtaKabaretKabelKabinetKachnaKadetKadidloKahanKajakKajutaKakaoKaktusKalamitaKalhotyKalibrKalnostKameraKamkolivKamnaKanibalKanoeKantorKapalinaKapelaKapitolaKapkaKapleKapotaKaprKapustaKapybaraKaramelKarotkaKartonKasaKatalogKatedraKauceKauzaKavalecKazajkaKazetaKazivostKdekolivKdesiKedlubenKempKeramikaKinoKlacekKladivoKlamKlapotKlasikaKlaunKlecKlenbaKlepatKlesnoutKlidKlimaKlisnaKloboukKlokanKlopaKloubKlubovnaKlusatKluzkostKmenKmitatKmotrKnihaKnotKoaliceKoberecKobkaKoblihaKobylaKocourKohoutKojenecKokosKoktejlKolapsKoledaKolizeKoloKomandoKometaKomikKomnataKomoraKompasKomunitaKonatKonceptKondiceKonecKonfeseKongresKoninaKonkursKontaktKonzervaKopanecKopieKopnoutKoprovkaKorbelKorektorKormidloKoroptevKorpusKorunaKorytoKorzetKosatecKostkaKotelKotletaKotoulKoukatKoupelnaKousekKouzloKovbojKozaKozorohKrabiceKrachKrajinaKralovatKrasopisKravataKreditKrejcarKresbaKrevetaKriketKritikKrizeKrkavecKrmelecKrmivoKrocanKrokKronikaKropitKroupaKrovkaKrtekKruhadloKrupiceKrutostKrvinkaKrychleKryptaKrystalKrytKudlankaKufrKujnostKuklaKulajdaKulichKulkaKulometKulturaKunaKupodivuKurtKurzorKutilKvalitaKvasinkaKvestorKynologKyselinaKytaraKyticeKytkaKytovecKyvadloLabradorLachtanLadnostLaikLakomecLamelaLampaLanovkaLasiceLasoLasturaLatinkaLavinaLebkaLeckdyLedenLedniceLedovkaLedvinaLegendaLegieLegraceLehceLehkostLehnoutLektvarLenochodLentilkaLepenkaLepidloLetadloLetecLetmoLetokruhLevhartLevitaceLevobokLibraLichotkaLidojedLidskostLihovinaLijavecLilekLimetkaLinieLinkaLinoleumListopadLitinaLitovatLobistaLodivodLogikaLogopedLokalitaLoketLomcovatLopataLopuchLordLososLotrLoudalLouhLoukaLouskatLovecLstivostLucernaLuciferLumpLuskLustraceLviceLyraLyrikaLysinaMadamMadloMagistrMahagonMajetekMajitelMajoritaMakakMakoviceMakrelaMalbaMalinaMalovatMalviceMaminkaMandleMankoMarnostMasakrMaskotMasopustMaticeMatrikaMaturitaMazanecMazivoMazlitMazurkaMdlobaMechanikMeditaceMedovinaMelasaMelounMentolkaMetlaMetodaMetrMezeraMigraceMihnoutMihuleMikinaMikrofonMilenecMilimetrMilostMimikaMincovnaMinibarMinometMinulostMiskaMistrMixovatMladostMlhaMlhovinaMlokMlsatMluvitMnichMnohemMobilMocnostModelkaModlitbaMohylaMokroMolekulaMomentkaMonarchaMonoklMonstrumMontovatMonzunMosazMoskytMostMotivaceMotorkaMotykaMouchaMoudrostMozaikaMozekMozolMramorMravenecMrkevMrtvolaMrzetMrzutostMstitelMudrcMuflonMulatMumieMuniceMusetMutaceMuzeumMuzikantMyslivecMzdaNabouratNachytatNadaceNadbytekNadhozNadobroNadpisNahlasNahnatNahodileNahraditNaivitaNajednouNajistoNajmoutNaklonitNakonecNakrmitNalevoNamazatNamluvitNanometrNaokoNaopakNaostroNapadatNapevnoNaplnitNapnoutNaposledNaprostoNaroditNarubyNarychloNasaditNasekatNaslepoNastatNatolikNavenekNavrchNavzdoryNazvatNebeNechatNeckyNedalekoNedbatNeduhNegaceNehetNehodaNejenNejprveNeklidNelibostNemilostNemocNeochotaNeonkaNepokojNerostNervNesmyslNesouladNetvorNeuronNevinaNezvykleNicotaNijakNikamNikdyNiklNikterakNitroNoclehNohaviceNominaceNoraNorekNositelNosnostNouzeNovinyNovotaNozdraNudaNudleNugetNutitNutnostNutrieNymfaObalObarvitObavaObdivObecObehnatObejmoutObezitaObhajobaObilniceObjasnitObjektObklopitOblastOblekOblibaOblohaObludaObnosObohatitObojekOboutObrazecObrnaObrubaObrysObsahObsluhaObstaratObuvObvazObvinitObvodObvykleObyvatelObzorOcasOcelOcenitOchladitOchotaOchranaOcitnoutOdbojOdbytOdchodOdcizitOdebratOdeslatOdevzdatOdezvaOdhadceOdhoditOdjetOdjinudOdkazOdkoupitOdlivOdlukaOdmlkaOdolnostOdpadOdpisOdploutOdporOdpustitOdpykatOdrazkaOdsouditOdstupOdsunOdtokOdtudOdvahaOdvetaOdvolatOdvracetOdznakOfinaOfsajdOhlasOhniskoOhradaOhrozitOhryzekOkapOkeniceOklikaOknoOkouzlitOkovyOkrasaOkresOkrsekOkruhOkupantOkurkaOkusitOlejninaOlizovatOmakOmeletaOmezitOmladinaOmlouvatOmluvaOmylOnehdyOpakovatOpasekOperaceOpiceOpilostOpisovatOporaOpoziceOpravduOprotiOrbitalOrchestrOrgieOrliceOrlojOrtelOsadaOschnoutOsikaOsivoOslavaOslepitOslnitOslovitOsnovaOsobaOsolitOspalecOstenOstrahaOstudaOstychOsvojitOteplitOtiskOtopOtrhatOtrlostOtrokOtrubyOtvorOvanoutOvarOvesOvlivnitOvoceOxidOzdobaPachatelPacientPadouchPahorekPaktPalandaPalecPalivoPalubaPamfletPamlsekPanenkaPanikaPannaPanovatPanstvoPantoflePaprikaParketaParodiePartaParukaParybaPasekaPasivitaPastelkaPatentPatronaPavoukPaznehtPazourekPeckaPedagogPejsekPekloPelotonPenaltaPendrekPenzePeriskopPeroPestrostPetardaPeticePetrolejPevninaPexesoPianistaPihaPijavicePiklePiknikPilinaPilnostPilulkaPinzetaPipetaPisatelPistolePitevnaPivnicePivovarPlacentaPlakatPlamenPlanetaPlastikaPlatitPlavidloPlazPlechPlemenoPlentaPlesPletivoPlevelPlivatPlnitPlnoPlochaPlodinaPlombaPloutPlukPlynPobavitPobytPochodPocitPoctivecPodatPodcenitPodepsatPodhledPodivitPodkladPodmanitPodnikPodobaPodporaPodrazPodstataPodvodPodzimPoeziePohankaPohnutkaPohovorPohromaPohybPointaPojistkaPojmoutPokazitPoklesPokojPokrokPokutaPokynPolednePolibekPolknoutPolohaPolynomPomaluPominoutPomlkaPomocPomstaPomysletPonechatPonorkaPonurostPopadatPopelPopisekPoplachPoprositPopsatPopudPoradcePorcePorodPoruchaPoryvPosaditPosedPosilaPoskokPoslanecPosouditPospoluPostavaPosudekPosypPotahPotkanPotleskPotomekPotravaPotupaPotvoraPoukazPoutoPouzdroPovahaPovidlaPovlakPovozPovrchPovstatPovykPovzdechPozdravPozemekPoznatekPozorPozvatPracovatPrahoryPraktikaPralesPraotecPraporekPrasePravdaPrincipPrknoProbuditProcentoProdejProfeseProhraProjektProlomitPromilePronikatPropadProrokProsbaProtonProutekProvazPrskavkaPrstenPrudkostPrutPrvekPrvohoryPsanecPsovodPstruhPtactvoPubertaPuchPudlPukavecPuklinaPukrlePultPumpaPuncPupenPusaPusinkaPustinaPutovatPutykaPyramidaPyskPytelRacekRachotRadiaceRadniceRadonRaftRagbyRaketaRakovinaRamenoRampouchRandeRarachRaritaRasovnaRastrRatolestRazanceRazidloReagovatReakceReceptRedaktorReferentReflexRejnokReklamaRekordRekrutRektorReputaceRevizeRevmaRevolverRezervaRiskovatRizikoRobotikaRodokmenRohovkaRokleRokokoRomanetoRopovodRopuchaRorejsRosolRostlinaRotmistrRotopedRotundaRoubenkaRouchoRoupRouraRovinaRovniceRozborRozchodRozdatRozeznatRozhodceRozinkaRozjezdRozkazRozlohaRozmarRozpadRozruchRozsahRoztokRozumRozvodRubrikaRuchadloRukaviceRukopisRybaRybolovRychlostRydloRypadloRytinaRyzostSadistaSahatSakoSamecSamizdatSamotaSanitkaSardinkaSasankaSatelitSazbaSazeniceSborSchovatSebrankaSeceseSedadloSedimentSedloSehnatSejmoutSekeraSektaSekundaSekvojeSemenoSenoServisSesaditSeshoraSeskokSeslatSestraSesuvSesypatSetbaSetinaSetkatSetnoutSetrvatSeverSeznamShodaShrnoutSifonSilniceSirkaSirotekSirupSituaceSkafandrSkaliskoSkanzenSkautSkeptikSkicaSkladbaSkleniceSkloSkluzSkobaSkokanSkoroSkriptaSkrzSkupinaSkvostSkvrnaSlabikaSladidloSlaninaSlastSlavnostSledovatSlepecSlevaSlezinaSlibSlinaSlizniceSlonSloupekSlovoSluchSluhaSlunceSlupkaSlzaSmaragdSmetanaSmilstvoSmlouvaSmogSmradSmrkSmrtkaSmutekSmyslSnadSnahaSnobSobotaSochaSodovkaSokolSopkaSotvaSoubojSoucitSoudceSouhlasSouladSoumrakSoupravaSousedSoutokSouvisetSpalovnaSpasitelSpisSplavSpodekSpojenecSpoluSponzorSpornostSpoustaSprchaSpustitSrandaSrazSrdceSrnaSrnecSrovnatSrpenSrstSrubStaniceStarostaStatikaStavbaStehnoStezkaStodolaStolekStopaStornoStoupatStrachStresStrhnoutStromStrunaStudnaStupniceStvolStykSubjektSubtropySucharSudostSuknoSundatSunoutSurikataSurovinaSvahSvalstvoSvetrSvatbaSvazekSvisleSvitekSvobodaSvodidloSvorkaSvrabSykavkaSykotSynekSynovecSypatSypkostSyrovostSyselSytostTabletkaTabuleTahounTajemnoTajfunTajgaTajitTajnostTaktikaTamhleTamponTancovatTanecTankerTapetaTaveninaTazatelTechnikaTehdyTekutinaTelefonTemnotaTendenceTenistaTenorTeplotaTepnaTeprveTerapieTermoskaTextilTichoTiskopisTitulekTkadlecTkaninaTlapkaTleskatTlukotTlupaTmelToaletaTopinkaTopolTorzoTouhaToulecTradiceTraktorTrampTrasaTraverzaTrefitTrestTrezorTrhavinaTrhlinaTrochuTrojiceTroskaTroubaTrpceTrpitelTrpkostTrubecTruchlitTruhliceTrusTrvatTudyTuhnoutTuhostTundraTuristaTurnajTuzemskoTvarohTvorbaTvrdostTvrzTygrTykevUbohostUbozeUbratUbrousekUbrusUbytovnaUchoUctivostUdivitUhraditUjednatUjistitUjmoutUkazatelUklidnitUklonitUkotvitUkrojitUliceUlitaUlovitUmyvadloUnavitUniformaUniknoutUpadnoutUplatnitUplynoutUpoutatUpravitUranUrazitUsednoutUsilovatUsmrtitUsnadnitUsnoutUsouditUstlatUstrnoutUtahovatUtkatUtlumitUtonoutUtopenecUtrousitUvalitUvolnitUvozovkaUzdravitUzelUzeninaUzlinaUznatVagonValchaValounVanaVandalVanilkaVaranVarhanyVarovatVcelkuVchodVdovaVedroVegetaceVejceVelbloudVeletrhVelitelVelmocVelrybaVenkovVerandaVerzeVeselkaVeskrzeVesniceVespoduVestaVeterinaVeverkaVibraceVichrVideohraVidinaVidleVilaViniceVisetVitalitaVizeVizitkaVjezdVkladVkusVlajkaVlakVlasecVlevoVlhkostVlivVlnovkaVloupatVnucovatVnukVodaVodivostVodoznakVodstvoVojenskyVojnaVojskoVolantVolbaVolitVolnoVoskovkaVozidloVozovnaVpravoVrabecVracetVrahVrataVrbaVrcholekVrhatVrstvaVrtuleVsaditVstoupitVstupVtipVybavitVybratVychovatVydatVydraVyfotitVyhledatVyhnoutVyhoditVyhraditVyhubitVyjasnitVyjetVyjmoutVyklopitVykonatVylekatVymazatVymezitVymizetVymysletVynechatVynikatVynutitVypadatVyplatitVypravitVypustitVyrazitVyrovnatVyrvatVyslovitVysokoVystavitVysunoutVysypatVytasitVytesatVytratitVyvinoutVyvolatVyvrhelVyzdobitVyznatVzaduVzbuditVzchopitVzdorVzduchVzdychatVzestupVzhledemVzkazVzlykatVznikVzorekVzpouraVztahVztekXylofonZabratZabydletZachovatZadarmoZadusitZafoukatZahltitZahoditZahradaZahynoutZajatecZajetZajistitZaklepatZakoupitZalepitZamezitZamotatZamysletZanechatZanikatZaplatitZapojitZapsatZarazitZastavitZasunoutZatajitZatemnitZatknoutZaujmoutZavalitZaveletZavinitZavolatZavrtatZazvonitZbavitZbrusuZbudovatZbytekZdalekaZdarmaZdatnostZdivoZdobitZdrojZdvihZdymadloZeleninaZemanZeminaZeptatZezaduZezdolaZhatitZhltnoutZhlubokaZhotovitZhrubaZimaZimniceZjemnitZklamatZkoumatZkratkaZkumavkaZlatoZlehkaZlobaZlomZlostZlozvykZmapovatZmarZmatekZmijeZmizetZmocnitZmodratZmrzlinaZmutovatZnakZnalostZnamenatZnovuZobrazitZotavitZoubekZoufaleZploditZpomalitZpravaZprostitZprudkaZprvuZradaZranitZrcadloZrnitostZrnoZrovnaZrychlitZrzavostZtichaZtratitZubovinaZubrZvednoutZvenkuZveselaZvonZvratZvukovodZvyk";
  var wordlist = null;
  function loadWords(lang) {
    if (wordlist != null) {
      return;
    }
    wordlist = words.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
    if (Wordlist.check(lang) !== "0x25f44555f4af25b51a711136e1c7d6e50ce9f8917d39d6b1f076b2bb4d2fac1a") {
      wordlist = null;
      throw new Error("BIP39 Wordlist for en (English) FAILED");
    }
  }
  var LangCz = class extends Wordlist {
    constructor() {
      super("cz");
    }
    getWord(index) {
      loadWords(this);
      return wordlist[index];
    }
    getWordIndex(word) {
      loadWords(this);
      return wordlist.indexOf(word);
    }
  };
  var langCz = new LangCz();
  Wordlist.register(langCz);

  // node_modules/@ethersproject/wordlists/lib.esm/lang-en.js
  "use strict";
  var words2 = "AbandonAbilityAbleAboutAboveAbsentAbsorbAbstractAbsurdAbuseAccessAccidentAccountAccuseAchieveAcidAcousticAcquireAcrossActActionActorActressActualAdaptAddAddictAddressAdjustAdmitAdultAdvanceAdviceAerobicAffairAffordAfraidAgainAgeAgentAgreeAheadAimAirAirportAisleAlarmAlbumAlcoholAlertAlienAllAlleyAllowAlmostAloneAlphaAlreadyAlsoAlterAlwaysAmateurAmazingAmongAmountAmusedAnalystAnchorAncientAngerAngleAngryAnimalAnkleAnnounceAnnualAnotherAnswerAntennaAntiqueAnxietyAnyApartApologyAppearAppleApproveAprilArchArcticAreaArenaArgueArmArmedArmorArmyAroundArrangeArrestArriveArrowArtArtefactArtistArtworkAskAspectAssaultAssetAssistAssumeAsthmaAthleteAtomAttackAttendAttitudeAttractAuctionAuditAugustAuntAuthorAutoAutumnAverageAvocadoAvoidAwakeAwareAwayAwesomeAwfulAwkwardAxisBabyBachelorBaconBadgeBagBalanceBalconyBallBambooBananaBannerBarBarelyBargainBarrelBaseBasicBasketBattleBeachBeanBeautyBecauseBecomeBeefBeforeBeginBehaveBehindBelieveBelowBeltBenchBenefitBestBetrayBetterBetweenBeyondBicycleBidBikeBindBiologyBirdBirthBitterBlackBladeBlameBlanketBlastBleakBlessBlindBloodBlossomBlouseBlueBlurBlushBoardBoatBodyBoilBombBoneBonusBookBoostBorderBoringBorrowBossBottomBounceBoxBoyBracketBrainBrandBrassBraveBreadBreezeBrickBridgeBriefBrightBringBriskBroccoliBrokenBronzeBroomBrotherBrownBrushBubbleBuddyBudgetBuffaloBuildBulbBulkBulletBundleBunkerBurdenBurgerBurstBusBusinessBusyButterBuyerBuzzCabbageCabinCableCactusCageCakeCallCalmCameraCampCanCanalCancelCandyCannonCanoeCanvasCanyonCapableCapitalCaptainCarCarbonCardCargoCarpetCarryCartCaseCashCasinoCastleCasualCatCatalogCatchCategoryCattleCaughtCauseCautionCaveCeilingCeleryCementCensusCenturyCerealCertainChairChalkChampionChangeChaosChapterChargeChaseChatCheapCheckCheeseChefCherryChestChickenChiefChildChimneyChoiceChooseChronicChuckleChunkChurnCigarCinnamonCircleCitizenCityCivilClaimClapClarifyClawClayCleanClerkCleverClickClientCliffClimbClinicClipClockClogCloseClothCloudClownClubClumpClusterClutchCoachCoastCoconutCodeCoffeeCoilCoinCollectColorColumnCombineComeComfortComicCommonCompanyConcertConductConfirmCongressConnectConsiderControlConvinceCookCoolCopperCopyCoralCoreCornCorrectCostCottonCouchCountryCoupleCourseCousinCoverCoyoteCrackCradleCraftCramCraneCrashCraterCrawlCrazyCreamCreditCreekCrewCricketCrimeCrispCriticCropCrossCrouchCrowdCrucialCruelCruiseCrumbleCrunchCrushCryCrystalCubeCultureCupCupboardCuriousCurrentCurtainCurveCushionCustomCuteCycleDadDamageDampDanceDangerDaringDashDaughterDawnDayDealDebateDebrisDecadeDecemberDecideDeclineDecorateDecreaseDeerDefenseDefineDefyDegreeDelayDeliverDemandDemiseDenialDentistDenyDepartDependDepositDepthDeputyDeriveDescribeDesertDesignDeskDespairDestroyDetailDetectDevelopDeviceDevoteDiagramDialDiamondDiaryDiceDieselDietDifferDigitalDignityDilemmaDinnerDinosaurDirectDirtDisagreeDiscoverDiseaseDishDismissDisorderDisplayDistanceDivertDivideDivorceDizzyDoctorDocumentDogDollDolphinDomainDonateDonkeyDonorDoorDoseDoubleDoveDraftDragonDramaDrasticDrawDreamDressDriftDrillDrinkDripDriveDropDrumDryDuckDumbDuneDuringDustDutchDutyDwarfDynamicEagerEagleEarlyEarnEarthEasilyEastEasyEchoEcologyEconomyEdgeEditEducateEffortEggEightEitherElbowElderElectricElegantElementElephantElevatorEliteElseEmbarkEmbodyEmbraceEmergeEmotionEmployEmpowerEmptyEnableEnactEndEndlessEndorseEnemyEnergyEnforceEngageEngineEnhanceEnjoyEnlistEnoughEnrichEnrollEnsureEnterEntireEntryEnvelopeEpisodeEqualEquipEraEraseErodeErosionErrorEruptEscapeEssayEssenceEstateEternalEthicsEvidenceEvilEvokeEvolveExactExampleExcessExchangeExciteExcludeExcuseExecuteExerciseExhaustExhibitExileExistExitExoticExpandExpectExpireExplainExposeExpressExtendExtraEyeEyebrowFabricFaceFacultyFadeFaintFaithFallFalseFameFamilyFamousFanFancyFantasyFarmFashionFatFatalFatherFatigueFaultFavoriteFeatureFebruaryFederalFeeFeedFeelFemaleFenceFestivalFetchFeverFewFiberFictionFieldFigureFileFilmFilterFinalFindFineFingerFinishFireFirmFirstFiscalFishFitFitnessFixFlagFlameFlashFlatFlavorFleeFlightFlipFloatFlockFloorFlowerFluidFlushFlyFoamFocusFogFoilFoldFollowFoodFootForceForestForgetForkFortuneForumForwardFossilFosterFoundFoxFragileFrameFrequentFreshFriendFringeFrogFrontFrostFrownFrozenFruitFuelFunFunnyFurnaceFuryFutureGadgetGainGalaxyGalleryGameGapGarageGarbageGardenGarlicGarmentGasGaspGateGatherGaugeGazeGeneralGeniusGenreGentleGenuineGestureGhostGiantGiftGiggleGingerGiraffeGirlGiveGladGlanceGlareGlassGlideGlimpseGlobeGloomGloryGloveGlowGlueGoatGoddessGoldGoodGooseGorillaGospelGossipGovernGownGrabGraceGrainGrantGrapeGrassGravityGreatGreenGridGriefGritGroceryGroupGrowGruntGuardGuessGuideGuiltGuitarGunGymHabitHairHalfHammerHamsterHandHappyHarborHardHarshHarvestHatHaveHawkHazardHeadHealthHeartHeavyHedgehogHeightHelloHelmetHelpHenHeroHiddenHighHillHintHipHireHistoryHobbyHockeyHoldHoleHolidayHollowHomeHoneyHoodHopeHornHorrorHorseHospitalHostHotelHourHoverHubHugeHumanHumbleHumorHundredHungryHuntHurdleHurryHurtHusbandHybridIceIconIdeaIdentifyIdleIgnoreIllIllegalIllnessImageImitateImmenseImmuneImpactImposeImproveImpulseInchIncludeIncomeIncreaseIndexIndicateIndoorIndustryInfantInflictInformInhaleInheritInitialInjectInjuryInmateInnerInnocentInputInquiryInsaneInsectInsideInspireInstallIntactInterestIntoInvestInviteInvolveIronIslandIsolateIssueItemIvoryJacketJaguarJarJazzJealousJeansJellyJewelJobJoinJokeJourneyJoyJudgeJuiceJumpJungleJuniorJunkJustKangarooKeenKeepKetchupKeyKickKidKidneyKindKingdomKissKitKitchenKiteKittenKiwiKneeKnifeKnockKnowLabLabelLaborLadderLadyLakeLampLanguageLaptopLargeLaterLatinLaughLaundryLavaLawLawnLawsuitLayerLazyLeaderLeafLearnLeaveLectureLeftLegLegalLegendLeisureLemonLendLengthLensLeopardLessonLetterLevelLiarLibertyLibraryLicenseLifeLiftLightLikeLimbLimitLinkLionLiquidListLittleLiveLizardLoadLoanLobsterLocalLockLogicLonelyLongLoopLotteryLoudLoungeLoveLoyalLuckyLuggageLumberLunarLunchLuxuryLyricsMachineMadMagicMagnetMaidMailMainMajorMakeMammalManManageMandateMangoMansionManualMapleMarbleMarchMarginMarineMarketMarriageMaskMassMasterMatchMaterialMathMatrixMatterMaximumMazeMeadowMeanMeasureMeatMechanicMedalMediaMelodyMeltMemberMemoryMentionMenuMercyMergeMeritMerryMeshMessageMetalMethodMiddleMidnightMilkMillionMimicMindMinimumMinorMinuteMiracleMirrorMiseryMissMistakeMixMixedMixtureMobileModelModifyMomMomentMonitorMonkeyMonsterMonthMoonMoralMoreMorningMosquitoMotherMotionMotorMountainMouseMoveMovieMuchMuffinMuleMultiplyMuscleMuseumMushroomMusicMustMutualMyselfMysteryMythNaiveNameNapkinNarrowNastyNationNatureNearNeckNeedNegativeNeglectNeitherNephewNerveNestNetNetworkNeutralNeverNewsNextNiceNightNobleNoiseNomineeNoodleNormalNorthNoseNotableNoteNothingNoticeNovelNowNuclearNumberNurseNutOakObeyObjectObligeObscureObserveObtainObviousOccurOceanOctoberOdorOffOfferOfficeOftenOilOkayOldOliveOlympicOmitOnceOneOnionOnlineOnlyOpenOperaOpinionOpposeOptionOrangeOrbitOrchardOrderOrdinaryOrganOrientOriginalOrphanOstrichOtherOutdoorOuterOutputOutsideOvalOvenOverOwnOwnerOxygenOysterOzonePactPaddlePagePairPalacePalmPandaPanelPanicPantherPaperParadeParentParkParrotPartyPassPatchPathPatientPatrolPatternPausePavePaymentPeacePeanutPearPeasantPelicanPenPenaltyPencilPeoplePepperPerfectPermitPersonPetPhonePhotoPhrasePhysicalPianoPicnicPicturePiecePigPigeonPillPilotPinkPioneerPipePistolPitchPizzaPlacePlanetPlasticPlatePlayPleasePledgePluckPlugPlungePoemPoetPointPolarPolePolicePondPonyPoolPopularPortionPositionPossiblePostPotatoPotteryPovertyPowderPowerPracticePraisePredictPreferPreparePresentPrettyPreventPricePridePrimaryPrintPriorityPrisonPrivatePrizeProblemProcessProduceProfitProgramProjectPromoteProofPropertyProsperProtectProudProvidePublicPuddingPullPulpPulsePumpkinPunchPupilPuppyPurchasePurityPurposePursePushPutPuzzlePyramidQualityQuantumQuarterQuestionQuickQuitQuizQuoteRabbitRaccoonRaceRackRadarRadioRailRainRaiseRallyRampRanchRandomRangeRapidRareRateRatherRavenRawRazorReadyRealReasonRebelRebuildRecallReceiveRecipeRecordRecycleReduceReflectReformRefuseRegionRegretRegularRejectRelaxReleaseReliefRelyRemainRememberRemindRemoveRenderRenewRentReopenRepairRepeatReplaceReportRequireRescueResembleResistResourceResponseResultRetireRetreatReturnReunionRevealReviewRewardRhythmRibRibbonRiceRichRideRidgeRifleRightRigidRingRiotRippleRiskRitualRivalRiverRoadRoastRobotRobustRocketRomanceRoofRookieRoomRoseRotateRoughRoundRouteRoyalRubberRudeRugRuleRunRunwayRuralSadSaddleSadnessSafeSailSaladSalmonSalonSaltSaluteSameSampleSandSatisfySatoshiSauceSausageSaveSayScaleScanScareScatterSceneSchemeSchoolScienceScissorsScorpionScoutScrapScreenScriptScrubSeaSearchSeasonSeatSecondSecretSectionSecuritySeedSeekSegmentSelectSellSeminarSeniorSenseSentenceSeriesServiceSessionSettleSetupSevenShadowShaftShallowShareShedShellSheriffShieldShiftShineShipShiverShockShoeShootShopShortShoulderShoveShrimpShrugShuffleShySiblingSickSideSiegeSightSignSilentSilkSillySilverSimilarSimpleSinceSingSirenSisterSituateSixSizeSkateSketchSkiSkillSkinSkirtSkullSlabSlamSleepSlenderSliceSlideSlightSlimSloganSlotSlowSlushSmallSmartSmileSmokeSmoothSnackSnakeSnapSniffSnowSoapSoccerSocialSockSodaSoftSolarSoldierSolidSolutionSolveSomeoneSongSoonSorrySortSoulSoundSoupSourceSouthSpaceSpareSpatialSpawnSpeakSpecialSpeedSpellSpendSphereSpiceSpiderSpikeSpinSpiritSplitSpoilSponsorSpoonSportSpotSpraySpreadSpringSpySquareSqueezeSquirrelStableStadiumStaffStageStairsStampStandStartStateStaySteakSteelStemStepStereoStickStillStingStockStomachStoneStoolStoryStoveStrategyStreetStrikeStrongStruggleStudentStuffStumbleStyleSubjectSubmitSubwaySuccessSuchSuddenSufferSugarSuggestSuitSummerSunSunnySunsetSuperSupplySupremeSureSurfaceSurgeSurpriseSurroundSurveySuspectSustainSwallowSwampSwapSwarmSwearSweetSwiftSwimSwingSwitchSwordSymbolSymptomSyrupSystemTableTackleTagTailTalentTalkTankTapeTargetTaskTasteTattooTaxiTeachTeamTellTenTenantTennisTentTermTestTextThankThatThemeThenTheoryThereTheyThingThisThoughtThreeThriveThrowThumbThunderTicketTideTigerTiltTimberTimeTinyTipTiredTissueTitleToastTobaccoTodayToddlerToeTogetherToiletTokenTomatoTomorrowToneTongueTonightToolToothTopTopicToppleTorchTornadoTortoiseTossTotalTouristTowardTowerTownToyTrackTradeTrafficTragicTrainTransferTrapTrashTravelTrayTreatTreeTrendTrialTribeTrickTriggerTrimTripTrophyTroubleTruckTrueTrulyTrumpetTrustTruthTryTubeTuitionTumbleTunaTunnelTurkeyTurnTurtleTwelveTwentyTwiceTwinTwistTwoTypeTypicalUglyUmbrellaUnableUnawareUncleUncoverUnderUndoUnfairUnfoldUnhappyUniformUniqueUnitUniverseUnknownUnlockUntilUnusualUnveilUpdateUpgradeUpholdUponUpperUpsetUrbanUrgeUsageUseUsedUsefulUselessUsualUtilityVacantVacuumVagueValidValleyValveVanVanishVaporVariousVastVaultVehicleVelvetVendorVentureVenueVerbVerifyVersionVeryVesselVeteranViableVibrantViciousVictoryVideoViewVillageVintageViolinVirtualVirusVisaVisitVisualVitalVividVocalVoiceVoidVolcanoVolumeVoteVoyageWageWagonWaitWalkWallWalnutWantWarfareWarmWarriorWashWaspWasteWaterWaveWayWealthWeaponWearWeaselWeatherWebWeddingWeekendWeirdWelcomeWestWetWhaleWhatWheatWheelWhenWhereWhipWhisperWideWidthWifeWildWillWinWindowWineWingWinkWinnerWinterWireWisdomWiseWishWitnessWolfWomanWonderWoodWoolWordWorkWorldWorryWorthWrapWreckWrestleWristWriteWrongYardYearYellowYouYoungYouthZebraZeroZoneZoo";
  var wordlist2 = null;
  function loadWords2(lang) {
    if (wordlist2 != null) {
      return;
    }
    wordlist2 = words2.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
    if (Wordlist.check(lang) !== "0x3c8acc1e7b08d8e76f9fda015ef48dc8c710a73cb7e0f77b2c18a9b5a7adde60") {
      wordlist2 = null;
      throw new Error("BIP39 Wordlist for en (English) FAILED");
    }
  }
  var LangEn = class extends Wordlist {
    constructor() {
      super("en");
    }
    getWord(index) {
      loadWords2(this);
      return wordlist2[index];
    }
    getWordIndex(word) {
      loadWords2(this);
      return wordlist2.indexOf(word);
    }
  };
  var langEn = new LangEn();
  Wordlist.register(langEn);

  // node_modules/@ethersproject/wordlists/lib.esm/lang-es.js
  "use strict";
  var words3 = "A/bacoAbdomenAbejaAbiertoAbogadoAbonoAbortoAbrazoAbrirAbueloAbusoAcabarAcademiaAccesoAccio/nAceiteAcelgaAcentoAceptarA/cidoAclararAcne/AcogerAcosoActivoActoActrizActuarAcudirAcuerdoAcusarAdictoAdmitirAdoptarAdornoAduanaAdultoAe/reoAfectarAficio/nAfinarAfirmarA/gilAgitarAgoni/aAgostoAgotarAgregarAgrioAguaAgudoA/guilaAgujaAhogoAhorroAireAislarAjedrezAjenoAjusteAlacra/nAlambreAlarmaAlbaA/lbumAlcaldeAldeaAlegreAlejarAlertaAletaAlfilerAlgaAlgodo/nAliadoAlientoAlivioAlmaAlmejaAlmi/barAltarAltezaAltivoAltoAlturaAlumnoAlzarAmableAmanteAmapolaAmargoAmasarA/mbarA/mbitoAmenoAmigoAmistadAmorAmparoAmplioAnchoAncianoAnclaAndarAnde/nAnemiaA/nguloAnilloA/nimoAni/sAnotarAntenaAntiguoAntojoAnualAnularAnuncioA~adirA~ejoA~oApagarAparatoApetitoApioAplicarApodoAporteApoyoAprenderAprobarApuestaApuroAradoAra~aArarA/rbitroA/rbolArbustoArchivoArcoArderArdillaArduoA/reaA/ridoAriesArmoni/aArne/sAromaArpaArpo/nArregloArrozArrugaArteArtistaAsaAsadoAsaltoAscensoAsegurarAseoAsesorAsientoAsiloAsistirAsnoAsombroA/speroAstillaAstroAstutoAsumirAsuntoAtajoAtaqueAtarAtentoAteoA/ticoAtletaA/tomoAtraerAtrozAtu/nAudazAudioAugeAulaAumentoAusenteAutorAvalAvanceAvaroAveAvellanaAvenaAvestruzAvio/nAvisoAyerAyudaAyunoAzafra/nAzarAzoteAzu/carAzufreAzulBabaBaborBacheBahi/aBaileBajarBalanzaBalco/nBaldeBambu/BancoBandaBa~oBarbaBarcoBarnizBarroBa/sculaBasto/nBasuraBatallaBateri/aBatirBatutaBau/lBazarBebe/BebidaBelloBesarBesoBestiaBichoBienBingoBlancoBloqueBlusaBoaBobinaBoboBocaBocinaBodaBodegaBoinaBolaBoleroBolsaBombaBondadBonitoBonoBonsa/iBordeBorrarBosqueBoteBoti/nBo/vedaBozalBravoBrazoBrechaBreveBrilloBrincoBrisaBrocaBromaBronceBroteBrujaBruscoBrutoBuceoBucleBuenoBueyBufandaBufo/nBu/hoBuitreBultoBurbujaBurlaBurroBuscarButacaBuzo/nCaballoCabezaCabinaCabraCacaoCada/verCadenaCaerCafe/Cai/daCaima/nCajaCajo/nCalCalamarCalcioCaldoCalidadCalleCalmaCalorCalvoCamaCambioCamelloCaminoCampoCa/ncerCandilCanelaCanguroCanicaCantoCa~aCa~o/nCaobaCaosCapazCapita/nCapoteCaptarCapuchaCaraCarbo/nCa/rcelCaretaCargaCari~oCarneCarpetaCarroCartaCasaCascoCaseroCaspaCastorCatorceCatreCaudalCausaCazoCebollaCederCedroCeldaCe/lebreCelosoCe/lulaCementoCenizaCentroCercaCerdoCerezaCeroCerrarCertezaCe/spedCetroChacalChalecoChampu/ChanclaChapaCharlaChicoChisteChivoChoqueChozaChuletaChuparCiclo/nCiegoCieloCienCiertoCifraCigarroCimaCincoCineCintaCipre/sCircoCiruelaCisneCitaCiudadClamorClanClaroClaseClaveClienteClimaCli/nicaCobreCoccio/nCochinoCocinaCocoCo/digoCodoCofreCogerCoheteCoji/nCojoColaColchaColegioColgarColinaCollarColmoColumnaCombateComerComidaCo/modoCompraCondeConejoCongaConocerConsejoContarCopaCopiaCorazo/nCorbataCorchoCordo/nCoronaCorrerCoserCosmosCostaCra/neoCra/terCrearCrecerCrei/doCremaCri/aCrimenCriptaCrisisCromoCro/nicaCroquetaCrudoCruzCuadroCuartoCuatroCuboCubrirCucharaCuelloCuentoCuerdaCuestaCuevaCuidarCulebraCulpaCultoCumbreCumplirCunaCunetaCuotaCupo/nCu/pulaCurarCuriosoCursoCurvaCutisDamaDanzaDarDardoDa/tilDeberDe/bilDe/cadaDecirDedoDefensaDefinirDejarDelfi/nDelgadoDelitoDemoraDensoDentalDeporteDerechoDerrotaDesayunoDeseoDesfileDesnudoDestinoDesvi/oDetalleDetenerDeudaDi/aDiabloDiademaDiamanteDianaDiarioDibujoDictarDienteDietaDiezDifi/cilDignoDilemaDiluirDineroDirectoDirigirDiscoDise~oDisfrazDivaDivinoDobleDoceDolorDomingoDonDonarDoradoDormirDorsoDosDosisDrago/nDrogaDuchaDudaDueloDue~oDulceDu/oDuqueDurarDurezaDuroE/banoEbrioEcharEcoEcuadorEdadEdicio/nEdificioEditorEducarEfectoEficazEjeEjemploElefanteElegirElementoElevarElipseE/liteElixirElogioEludirEmbudoEmitirEmocio/nEmpateEmpe~oEmpleoEmpresaEnanoEncargoEnchufeEnci/aEnemigoEneroEnfadoEnfermoEnga~oEnigmaEnlaceEnormeEnredoEnsayoEnse~arEnteroEntrarEnvaseEnvi/oE/pocaEquipoErizoEscalaEscenaEscolarEscribirEscudoEsenciaEsferaEsfuerzoEspadaEspejoEspi/aEsposaEspumaEsqui/EstarEsteEstiloEstufaEtapaEternoE/ticaEtniaEvadirEvaluarEventoEvitarExactoExamenExcesoExcusaExentoExigirExilioExistirE/xitoExpertoExplicarExponerExtremoFa/bricaFa/bulaFachadaFa/cilFactorFaenaFajaFaldaFalloFalsoFaltarFamaFamiliaFamosoFarao/nFarmaciaFarolFarsaFaseFatigaFaunaFavorFaxFebreroFechaFelizFeoFeriaFerozFe/rtilFervorFesti/nFiableFianzaFiarFibraFiccio/nFichaFideoFiebreFielFieraFiestaFiguraFijarFijoFilaFileteFilialFiltroFinFincaFingirFinitoFirmaFlacoFlautaFlechaFlorFlotaFluirFlujoFlu/orFobiaFocaFogataFogo/nFolioFolletoFondoFormaForroFortunaForzarFosaFotoFracasoFra/gilFranjaFraseFraudeFrei/rFrenoFresaFri/oFritoFrutaFuegoFuenteFuerzaFugaFumarFuncio/nFundaFurgo/nFuriaFusilFu/tbolFuturoGacelaGafasGaitaGajoGalaGaleri/aGalloGambaGanarGanchoGangaGansoGarajeGarzaGasolinaGastarGatoGavila/nGemeloGemirGenGe/neroGenioGenteGeranioGerenteGermenGestoGiganteGimnasioGirarGiroGlaciarGloboGloriaGolGolfoGolosoGolpeGomaGordoGorilaGorraGotaGoteoGozarGradaGra/ficoGranoGrasaGratisGraveGrietaGrilloGripeGrisGritoGrosorGru/aGruesoGrumoGrupoGuanteGuapoGuardiaGuerraGui/aGui~oGuionGuisoGuitarraGusanoGustarHaberHa/bilHablarHacerHachaHadaHallarHamacaHarinaHazHaza~aHebillaHebraHechoHeladoHelioHembraHerirHermanoHe/roeHervirHieloHierroHi/gadoHigieneHijoHimnoHistoriaHocicoHogarHogueraHojaHombreHongoHonorHonraHoraHormigaHornoHostilHoyoHuecoHuelgaHuertaHuesoHuevoHuidaHuirHumanoHu/medoHumildeHumoHundirHuraca/nHurtoIconoIdealIdiomaI/doloIglesiaIglu/IgualIlegalIlusio/nImagenIma/nImitarImparImperioImponerImpulsoIncapazI/ndiceInerteInfielInformeIngenioInicioInmensoInmuneInnatoInsectoInstanteIntere/sI/ntimoIntuirInu/tilInviernoIraIrisIroni/aIslaIsloteJabali/Jabo/nJamo/nJarabeJardi/nJarraJaulaJazmi/nJefeJeringaJineteJornadaJorobaJovenJoyaJuergaJuevesJuezJugadorJugoJugueteJuicioJuncoJunglaJunioJuntarJu/piterJurarJustoJuvenilJuzgarKiloKoalaLabioLacioLacraLadoLadro/nLagartoLa/grimaLagunaLaicoLamerLa/minaLa/mparaLanaLanchaLangostaLanzaLa/pizLargoLarvaLa/stimaLataLa/texLatirLaurelLavarLazoLealLeccio/nLecheLectorLeerLegio/nLegumbreLejanoLenguaLentoLe~aLeo/nLeopardoLesio/nLetalLetraLeveLeyendaLibertadLibroLicorLi/derLidiarLienzoLigaLigeroLimaLi/miteLimo/nLimpioLinceLindoLi/neaLingoteLinoLinternaLi/quidoLisoListaLiteraLitioLitroLlagaLlamaLlantoLlaveLlegarLlenarLlevarLlorarLloverLluviaLoboLocio/nLocoLocuraLo/gicaLogroLombrizLomoLonjaLoteLuchaLucirLugarLujoLunaLunesLupaLustroLutoLuzMacetaMachoMaderaMadreMaduroMaestroMafiaMagiaMagoMai/zMaldadMaletaMallaMaloMama/MamboMamutMancoMandoManejarMangaManiqui/ManjarManoMansoMantaMa~anaMapaMa/quinaMarMarcoMareaMarfilMargenMaridoMa/rmolMarro/nMartesMarzoMasaMa/scaraMasivoMatarMateriaMatizMatrizMa/ximoMayorMazorcaMechaMedallaMedioMe/dulaMejillaMejorMelenaMelo/nMemoriaMenorMensajeMenteMenu/MercadoMerengueMe/ritoMesMeso/nMetaMeterMe/todoMetroMezclaMiedoMielMiembroMigaMilMilagroMilitarMillo/nMimoMinaMineroMi/nimoMinutoMiopeMirarMisaMiseriaMisilMismoMitadMitoMochilaMocio/nModaModeloMohoMojarMoldeMolerMolinoMomentoMomiaMonarcaMonedaMonjaMontoMo~oMoradaMorderMorenoMorirMorroMorsaMortalMoscaMostrarMotivoMoverMo/vilMozoMuchoMudarMuebleMuelaMuerteMuestraMugreMujerMulaMuletaMultaMundoMu~ecaMuralMuroMu/sculoMuseoMusgoMu/sicaMusloNa/carNacio/nNadarNaipeNaranjaNarizNarrarNasalNatalNativoNaturalNa/useaNavalNaveNavidadNecioNe/ctarNegarNegocioNegroNeo/nNervioNetoNeutroNevarNeveraNichoNidoNieblaNietoNi~ezNi~oNi/tidoNivelNoblezaNocheNo/minaNoriaNormaNorteNotaNoticiaNovatoNovelaNovioNubeNucaNu/cleoNudilloNudoNueraNueveNuezNuloNu/meroNutriaOasisObesoObispoObjetoObraObreroObservarObtenerObvioOcaOcasoOce/anoOchentaOchoOcioOcreOctavoOctubreOcultoOcuparOcurrirOdiarOdioOdiseaOesteOfensaOfertaOficioOfrecerOgroOi/doOi/rOjoOlaOleadaOlfatoOlivoOllaOlmoOlorOlvidoOmbligoOndaOnzaOpacoOpcio/nO/peraOpinarOponerOptarO/pticaOpuestoOracio/nOradorOralO/rbitaOrcaOrdenOrejaO/rganoOrgi/aOrgulloOrienteOrigenOrillaOroOrquestaOrugaOsadi/aOscuroOseznoOsoOstraOto~oOtroOvejaO/vuloO/xidoOxi/genoOyenteOzonoPactoPadrePaellaPa/ginaPagoPai/sPa/jaroPalabraPalcoPaletaPa/lidoPalmaPalomaPalparPanPanalPa/nicoPanteraPa~ueloPapa/PapelPapillaPaquetePararParcelaParedParirParoPa/rpadoParquePa/rrafoPartePasarPaseoPasio/nPasoPastaPataPatioPatriaPausaPautaPavoPayasoPeato/nPecadoPeceraPechoPedalPedirPegarPeinePelarPelda~oPeleaPeligroPellejoPeloPelucaPenaPensarPe~o/nPeo/nPeorPepinoPeque~oPeraPerchaPerderPerezaPerfilPericoPerlaPermisoPerroPersonaPesaPescaPe/simoPesta~aPe/taloPetro/leoPezPezu~aPicarPicho/nPiePiedraPiernaPiezaPijamaPilarPilotoPimientaPinoPintorPinzaPi~aPiojoPipaPirataPisarPiscinaPisoPistaPito/nPizcaPlacaPlanPlataPlayaPlazaPleitoPlenoPlomoPlumaPluralPobrePocoPoderPodioPoemaPoesi/aPoetaPolenPolici/aPolloPolvoPomadaPomeloPomoPompaPonerPorcio/nPortalPosadaPoseerPosiblePostePotenciaPotroPozoPradoPrecozPreguntaPremioPrensaPresoPrevioPrimoPri/ncipePrisio/nPrivarProaProbarProcesoProductoProezaProfesorProgramaProlePromesaProntoPropioPro/ximoPruebaPu/blicoPucheroPudorPuebloPuertaPuestoPulgaPulirPulmo/nPulpoPulsoPumaPuntoPu~alPu~oPupaPupilaPure/QuedarQuejaQuemarQuererQuesoQuietoQui/micaQuinceQuitarRa/banoRabiaRaboRacio/nRadicalRai/zRamaRampaRanchoRangoRapazRa/pidoRaptoRasgoRaspaRatoRayoRazaRazo/nReaccio/nRealidadReba~oReboteRecaerRecetaRechazoRecogerRecreoRectoRecursoRedRedondoReducirReflejoReformaRefra/nRefugioRegaloRegirReglaRegresoRehe/nReinoRei/rRejaRelatoRelevoRelieveRellenoRelojRemarRemedioRemoRencorRendirRentaRepartoRepetirReposoReptilResRescateResinaRespetoRestoResumenRetiroRetornoRetratoReunirReve/sRevistaReyRezarRicoRiegoRiendaRiesgoRifaRi/gidoRigorRinco/nRi~o/nRi/oRiquezaRisaRitmoRitoRizoRobleRoceRociarRodarRodeoRodillaRoerRojizoRojoRomeroRomperRonRoncoRondaRopaRoperoRosaRoscaRostroRotarRubi/RuborRudoRuedaRugirRuidoRuinaRuletaRuloRumboRumorRupturaRutaRutinaSa/badoSaberSabioSableSacarSagazSagradoSalaSaldoSaleroSalirSalmo/nSalo/nSalsaSaltoSaludSalvarSambaSancio/nSandi/aSanearSangreSanidadSanoSantoSapoSaqueSardinaSarte/nSastreSata/nSaunaSaxofo/nSeccio/nSecoSecretoSectaSedSeguirSeisSelloSelvaSemanaSemillaSendaSensorSe~alSe~orSepararSepiaSequi/aSerSerieSermo/nServirSesentaSesio/nSetaSetentaSeveroSexoSextoSidraSiestaSieteSigloSignoSi/labaSilbarSilencioSillaSi/mboloSimioSirenaSistemaSitioSituarSobreSocioSodioSolSolapaSoldadoSoledadSo/lidoSoltarSolucio/nSombraSondeoSonidoSonoroSonrisaSopaSoplarSoporteSordoSorpresaSorteoSoste/nSo/tanoSuaveSubirSucesoSudorSuegraSueloSue~oSuerteSufrirSujetoSulta/nSumarSuperarSuplirSuponerSupremoSurSurcoSure~oSurgirSustoSutilTabacoTabiqueTablaTabu/TacoTactoTajoTalarTalcoTalentoTallaTalo/nTama~oTamborTangoTanqueTapaTapeteTapiaTapo/nTaquillaTardeTareaTarifaTarjetaTarotTarroTartaTatuajeTauroTazaTazo/nTeatroTechoTeclaTe/cnicaTejadoTejerTejidoTelaTele/fonoTemaTemorTemploTenazTenderTenerTenisTensoTeori/aTerapiaTercoTe/rminoTernuraTerrorTesisTesoroTestigoTeteraTextoTezTibioTiburo/nTiempoTiendaTierraTiesoTigreTijeraTildeTimbreTi/midoTimoTintaTi/oTi/picoTipoTiraTiro/nTita/nTi/tereTi/tuloTizaToallaTobilloTocarTocinoTodoTogaToldoTomarTonoTontoToparTopeToqueTo/raxToreroTormentaTorneoToroTorpedoTorreTorsoTortugaTosToscoToserTo/xicoTrabajoTractorTraerTra/ficoTragoTrajeTramoTranceTratoTraumaTrazarTre/bolTreguaTreintaTrenTreparTresTribuTrigoTripaTristeTriunfoTrofeoTrompaTroncoTropaTroteTrozoTrucoTruenoTrufaTuberi/aTuboTuertoTumbaTumorTu/nelTu/nicaTurbinaTurismoTurnoTutorUbicarU/lceraUmbralUnidadUnirUniversoUnoUntarU~aUrbanoUrbeUrgenteUrnaUsarUsuarioU/tilUtopi/aUvaVacaVaci/oVacunaVagarVagoVainaVajillaValeVa/lidoValleValorVa/lvulaVampiroVaraVariarVaro/nVasoVecinoVectorVehi/culoVeinteVejezVelaVeleroVelozVenaVencerVendaVenenoVengarVenirVentaVenusVerVeranoVerboVerdeVeredaVerjaVersoVerterVi/aViajeVibrarVicioVi/ctimaVidaVi/deoVidrioViejoViernesVigorVilVillaVinagreVinoVi~edoVioli/nViralVirgoVirtudVisorVi/speraVistaVitaminaViudoVivazViveroVivirVivoVolca/nVolumenVolverVorazVotarVotoVozVueloVulgarYacerYateYeguaYemaYernoYesoYodoYogaYogurZafiroZanjaZapatoZarzaZonaZorroZumoZurdo";
  var lookup = {};
  var wordlist3 = null;
  function dropDiacritic(word) {
    logger21.checkNormalize();
    return toUtf8String(Array.prototype.filter.call(toUtf8Bytes(word.normalize("NFD").toLowerCase()), (c) => {
      return c >= 65 && c <= 90 || c >= 97 && c <= 123;
    }));
  }
  function expand(word) {
    const output = [];
    Array.prototype.forEach.call(toUtf8Bytes(word), (c) => {
      if (c === 47) {
        output.push(204);
        output.push(129);
      } else if (c === 126) {
        output.push(110);
        output.push(204);
        output.push(131);
      } else {
        output.push(c);
      }
    });
    return toUtf8String(output);
  }
  function loadWords3(lang) {
    if (wordlist3 != null) {
      return;
    }
    wordlist3 = words3.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ").map((w) => expand(w));
    wordlist3.forEach((word, index) => {
      lookup[dropDiacritic(word)] = index;
    });
    if (Wordlist.check(lang) !== "0xf74fb7092aeacdfbf8959557de22098da512207fb9f109cb526994938cf40300") {
      wordlist3 = null;
      throw new Error("BIP39 Wordlist for es (Spanish) FAILED");
    }
  }
  var LangEs = class extends Wordlist {
    constructor() {
      super("es");
    }
    getWord(index) {
      loadWords3(this);
      return wordlist3[index];
    }
    getWordIndex(word) {
      loadWords3(this);
      return lookup[dropDiacritic(word)];
    }
  };
  var langEs = new LangEs();
  Wordlist.register(langEs);

  // node_modules/@ethersproject/wordlists/lib.esm/lang-fr.js
  "use strict";
  var words4 = "AbaisserAbandonAbdiquerAbeilleAbolirAborderAboutirAboyerAbrasifAbreuverAbriterAbrogerAbruptAbsenceAbsoluAbsurdeAbusifAbyssalAcade/mieAcajouAcarienAccablerAccepterAcclamerAccoladeAccrocheAccuserAcerbeAchatAcheterAcidulerAcierAcompteAcque/rirAcronymeActeurActifActuelAdepteAde/quatAdhe/sifAdjectifAdjugerAdmettreAdmirerAdopterAdorerAdoucirAdresseAdroitAdulteAdverbeAe/rerAe/ronefAffaireAffecterAfficheAffreuxAffublerAgacerAgencerAgileAgiterAgraferAgre/ableAgrumeAiderAiguilleAilierAimableAisanceAjouterAjusterAlarmerAlchimieAlerteAlge-breAlgueAlie/nerAlimentAlle/gerAlliageAllouerAllumerAlourdirAlpagaAltesseAlve/oleAmateurAmbiguAmbreAme/nagerAmertumeAmidonAmiralAmorcerAmourAmovibleAmphibieAmpleurAmusantAnalyseAnaphoreAnarchieAnatomieAncienAne/antirAngleAngoisseAnguleuxAnimalAnnexerAnnonceAnnuelAnodinAnomalieAnonymeAnormalAntenneAntidoteAnxieuxApaiserApe/ritifAplanirApologieAppareilAppelerApporterAppuyerAquariumAqueducArbitreArbusteArdeurArdoiseArgentArlequinArmatureArmementArmoireArmureArpenterArracherArriverArroserArsenicArte/rielArticleAspectAsphalteAspirerAssautAsservirAssietteAssocierAssurerAsticotAstreAstuceAtelierAtomeAtriumAtroceAttaqueAttentifAttirerAttraperAubaineAubergeAudaceAudibleAugurerAuroreAutomneAutrucheAvalerAvancerAvariceAvenirAverseAveugleAviateurAvideAvionAviserAvoineAvouerAvrilAxialAxiomeBadgeBafouerBagageBaguetteBaignadeBalancerBalconBaleineBalisageBambinBancaireBandageBanlieueBannie-reBanquierBarbierBarilBaronBarqueBarrageBassinBastionBatailleBateauBatterieBaudrierBavarderBeletteBe/lierBeloteBe/ne/ficeBerceauBergerBerlineBermudaBesaceBesogneBe/tailBeurreBiberonBicycleBiduleBijouBilanBilingueBillardBinaireBiologieBiopsieBiotypeBiscuitBisonBistouriBitumeBizarreBlafardBlagueBlanchirBlessantBlinderBlondBloquerBlousonBobardBobineBoireBoiserBolideBonbonBondirBonheurBonifierBonusBordureBorneBotteBoucleBoueuxBougieBoulonBouquinBourseBoussoleBoutiqueBoxeurBrancheBrasierBraveBrebisBre-cheBreuvageBricolerBrigadeBrillantBriocheBriqueBrochureBroderBronzerBrousseBroyeurBrumeBrusqueBrutalBruyantBuffleBuissonBulletinBureauBurinBustierButinerButoirBuvableBuvetteCabanonCabineCachetteCadeauCadreCafe/ineCaillouCaissonCalculerCalepinCalibreCalmerCalomnieCalvaireCamaradeCame/raCamionCampagneCanalCanetonCanonCantineCanularCapableCaporalCapriceCapsuleCapterCapucheCarabineCarboneCaresserCaribouCarnageCarotteCarreauCartonCascadeCasierCasqueCassureCauserCautionCavalierCaverneCaviarCe/dilleCeintureCe/lesteCelluleCendrierCensurerCentralCercleCe/re/bralCeriseCernerCerveauCesserChagrinChaiseChaleurChambreChanceChapitreCharbonChasseurChatonChaussonChavirerChemiseChenilleChe/quierChercherChevalChienChiffreChignonChime-reChiotChlorureChocolatChoisirChoseChouetteChromeChuteCigareCigogneCimenterCine/maCintrerCirculerCirerCirqueCiterneCitoyenCitronCivilClaironClameurClaquerClasseClavierClientClignerClimatClivageClocheClonageCloporteCobaltCobraCocasseCocotierCoderCodifierCoffreCognerCohe/sionCoifferCoincerCole-reColibriCollineColmaterColonelCombatCome/dieCommandeCompactConcertConduireConfierCongelerConnoterConsonneContactConvexeCopainCopieCorailCorbeauCordageCornicheCorpusCorrectCorte-geCosmiqueCostumeCotonCoudeCoupureCourageCouteauCouvrirCoyoteCrabeCrainteCravateCrayonCre/atureCre/diterCre/meuxCreuserCrevetteCriblerCrierCristalCrite-reCroireCroquerCrotaleCrucialCruelCrypterCubiqueCueillirCuille-reCuisineCuivreCulminerCultiverCumulerCupideCuratifCurseurCyanureCycleCylindreCyniqueDaignerDamierDangerDanseurDauphinDe/battreDe/biterDe/borderDe/briderDe/butantDe/calerDe/cembreDe/chirerDe/ciderDe/clarerDe/corerDe/crireDe/cuplerDe/daleDe/ductifDe/esseDe/fensifDe/filerDe/frayerDe/gagerDe/givrerDe/glutirDe/graferDe/jeunerDe/liceDe/logerDemanderDemeurerDe/molirDe/nicherDe/nouerDentelleDe/nuderDe/partDe/penserDe/phaserDe/placerDe/poserDe/rangerDe/roberDe/sastreDescenteDe/sertDe/signerDe/sobe/irDessinerDestrierDe/tacherDe/testerDe/tourerDe/tresseDevancerDevenirDevinerDevoirDiableDialogueDiamantDicterDiffe/rerDige/rerDigitalDigneDiluerDimancheDiminuerDioxydeDirectifDirigerDiscuterDisposerDissiperDistanceDivertirDiviserDocileDocteurDogmeDoigtDomaineDomicileDompterDonateurDonjonDonnerDopamineDortoirDorureDosageDoseurDossierDotationDouanierDoubleDouceurDouterDoyenDragonDraperDresserDribblerDroitureDuperieDuplexeDurableDurcirDynastieE/blouirE/carterE/charpeE/chelleE/clairerE/clipseE/cloreE/cluseE/coleE/conomieE/corceE/couterE/craserE/cre/merE/crivainE/crouE/cumeE/cureuilE/difierE/duquerEffacerEffectifEffigieEffortEffrayerEffusionE/galiserE/garerE/jecterE/laborerE/largirE/lectronE/le/gantE/le/phantE/le-veE/ligibleE/litismeE/logeE/luciderE/luderEmballerEmbellirEmbryonE/meraudeE/missionEmmenerE/motionE/mouvoirEmpereurEmployerEmporterEmpriseE/mulsionEncadrerEnche-reEnclaveEncocheEndiguerEndosserEndroitEnduireE/nergieEnfanceEnfermerEnfouirEngagerEnginEngloberE/nigmeEnjamberEnjeuEnleverEnnemiEnnuyeuxEnrichirEnrobageEnseigneEntasserEntendreEntierEntourerEntraverE/nume/rerEnvahirEnviableEnvoyerEnzymeE/olienE/paissirE/pargneE/patantE/pauleE/picerieE/pide/mieE/pierE/pilogueE/pineE/pisodeE/pitapheE/poqueE/preuveE/prouverE/puisantE/querreE/quipeE/rigerE/rosionErreurE/ruptionEscalierEspadonEspe-ceEspie-gleEspoirEspritEsquiverEssayerEssenceEssieuEssorerEstimeEstomacEstradeE/tage-reE/talerE/tancheE/tatiqueE/teindreE/tendoirE/ternelE/thanolE/thiqueEthnieE/tirerE/tofferE/toileE/tonnantE/tourdirE/trangeE/troitE/tudeEuphorieE/valuerE/vasionE/ventailE/videnceE/viterE/volutifE/voquerExactExage/rerExaucerExcellerExcitantExclusifExcuseExe/cuterExempleExercerExhalerExhorterExigenceExilerExisterExotiqueExpe/dierExplorerExposerExprimerExquisExtensifExtraireExulterFableFabuleuxFacetteFacileFactureFaiblirFalaiseFameuxFamilleFarceurFarfeluFarineFaroucheFascinerFatalFatigueFauconFautifFaveurFavoriFe/brileFe/conderFe/de/rerFe/linFemmeFe/murFendoirFe/odalFermerFe/roceFerveurFestivalFeuilleFeutreFe/vrierFiascoFicelerFictifFide-leFigureFilatureFiletageFilie-reFilleulFilmerFilouFiltrerFinancerFinirFioleFirmeFissureFixerFlairerFlammeFlasqueFlatteurFle/auFle-cheFleurFlexionFloconFloreFluctuerFluideFluvialFolieFonderieFongibleFontaineForcerForgeronFormulerFortuneFossileFoudreFouge-reFouillerFoulureFourmiFragileFraiseFranchirFrapperFrayeurFre/gateFreinerFrelonFre/mirFre/ne/sieFre-reFriableFrictionFrissonFrivoleFroidFromageFrontalFrotterFruitFugitifFuiteFureurFurieuxFurtifFusionFuturGagnerGalaxieGalerieGambaderGarantirGardienGarnirGarrigueGazelleGazonGe/antGe/latineGe/luleGendarmeGe/ne/ralGe/nieGenouGentilGe/ologieGe/ome-treGe/raniumGermeGestuelGeyserGibierGiclerGirafeGivreGlaceGlaiveGlisserGlobeGloireGlorieuxGolfeurGommeGonflerGorgeGorilleGoudronGouffreGoulotGoupilleGourmandGoutteGraduelGraffitiGraineGrandGrappinGratuitGravirGrenatGriffureGrillerGrimperGrognerGronderGrotteGroupeGrugerGrutierGruye-reGue/pardGuerrierGuideGuimauveGuitareGustatifGymnasteGyrostatHabitudeHachoirHalteHameauHangarHannetonHaricotHarmonieHarponHasardHe/liumHe/matomeHerbeHe/rissonHermineHe/ronHe/siterHeureuxHibernerHibouHilarantHistoireHiverHomardHommageHomoge-neHonneurHonorerHonteuxHordeHorizonHorlogeHormoneHorribleHouleuxHousseHublotHuileuxHumainHumbleHumideHumourHurlerHydromelHygie-neHymneHypnoseIdylleIgnorerIguaneIlliciteIllusionImageImbiberImiterImmenseImmobileImmuableImpactImpe/rialImplorerImposerImprimerImputerIncarnerIncendieIncidentInclinerIncoloreIndexerIndiceInductifIne/ditIneptieInexactInfiniInfligerInformerInfusionInge/rerInhalerInhiberInjecterInjureInnocentInoculerInonderInscrireInsecteInsigneInsoliteInspirerInstinctInsulterIntactIntenseIntimeIntrigueIntuitifInutileInvasionInventerInviterInvoquerIroniqueIrradierIrre/elIrriterIsolerIvoireIvresseJaguarJaillirJambeJanvierJardinJaugerJauneJavelotJetableJetonJeudiJeunesseJoindreJoncherJonglerJoueurJouissifJournalJovialJoyauJoyeuxJubilerJugementJuniorJuponJuristeJusticeJuteuxJuve/nileKayakKimonoKiosqueLabelLabialLabourerLace/rerLactoseLaguneLaineLaisserLaitierLambeauLamelleLampeLanceurLangageLanterneLapinLargeurLarmeLaurierLavaboLavoirLectureLe/galLe/gerLe/gumeLessiveLettreLevierLexiqueLe/zardLiasseLibe/rerLibreLicenceLicorneLie-geLie-vreLigatureLigoterLigueLimerLimiteLimonadeLimpideLine/aireLingotLionceauLiquideLisie-reListerLithiumLitigeLittoralLivreurLogiqueLointainLoisirLombricLoterieLouerLourdLoutreLouveLoyalLubieLucideLucratifLueurLugubreLuisantLumie-reLunaireLundiLuronLutterLuxueuxMachineMagasinMagentaMagiqueMaigreMaillonMaintienMairieMaisonMajorerMalaxerMale/ficeMalheurMaliceMalletteMammouthMandaterManiableManquantManteauManuelMarathonMarbreMarchandMardiMaritimeMarqueurMarronMartelerMascotteMassifMate/rielMatie-reMatraqueMaudireMaussadeMauveMaximalMe/chantMe/connuMe/dailleMe/decinMe/diterMe/duseMeilleurMe/langeMe/lodieMembreMe/moireMenacerMenerMenhirMensongeMentorMercrediMe/riteMerleMessagerMesureMe/talMe/te/oreMe/thodeMe/tierMeubleMiaulerMicrobeMietteMignonMigrerMilieuMillionMimiqueMinceMine/ralMinimalMinorerMinuteMiracleMiroiterMissileMixteMobileModerneMoelleuxMondialMoniteurMonnaieMonotoneMonstreMontagneMonumentMoqueurMorceauMorsureMortierMoteurMotifMoucheMoufleMoulinMoussonMoutonMouvantMultipleMunitionMurailleMure-neMurmureMuscleMuse/umMusicienMutationMuterMutuelMyriadeMyrtilleMyste-reMythiqueNageurNappeNarquoisNarrerNatationNationNatureNaufrageNautiqueNavireNe/buleuxNectarNe/fasteNe/gationNe/gligerNe/gocierNeigeNerveuxNettoyerNeuroneNeutronNeveuNicheNickelNitrateNiveauNobleNocifNocturneNoirceurNoisetteNomadeNombreuxNommerNormatifNotableNotifierNotoireNourrirNouveauNovateurNovembreNoviceNuageNuancerNuireNuisibleNume/roNuptialNuqueNutritifObe/irObjectifObligerObscurObserverObstacleObtenirObturerOccasionOccuperOce/anOctobreOctroyerOctuplerOculaireOdeurOdorantOffenserOfficierOffrirOgiveOiseauOisillonOlfactifOlivierOmbrageOmettreOnctueuxOndulerOne/reuxOniriqueOpaleOpaqueOpe/rerOpinionOpportunOpprimerOpterOptiqueOrageuxOrangeOrbiteOrdonnerOreilleOrganeOrgueilOrificeOrnementOrqueOrtieOscillerOsmoseOssatureOtarieOuraganOursonOutilOutragerOuvrageOvationOxydeOxyge-neOzonePaisiblePalacePalmare-sPalourdePalperPanachePandaPangolinPaniquerPanneauPanoramaPantalonPapayePapierPapoterPapyrusParadoxeParcelleParesseParfumerParlerParoleParrainParsemerPartagerParureParvenirPassionPaste-quePaternelPatiencePatronPavillonPavoiserPayerPaysagePeignePeintrePelagePe/licanPellePelousePeluchePendulePe/ne/trerPe/niblePensifPe/nuriePe/pitePe/plumPerdrixPerforerPe/riodePermuterPerplexePersilPertePeserPe/talePetitPe/trirPeuplePharaonPhobiePhoquePhotonPhrasePhysiquePianoPicturalPie-cePierrePieuvrePilotePinceauPipettePiquerPiroguePiscinePistonPivoterPixelPizzaPlacardPlafondPlaisirPlanerPlaquePlastronPlateauPleurerPlexusPliagePlombPlongerPluiePlumagePochettePoe/siePoe-tePointePoirierPoissonPoivrePolairePolicierPollenPolygonePommadePompierPonctuelPonde/rerPoneyPortiquePositionPosse/derPosturePotagerPoteauPotionPoucePoulainPoumonPourprePoussinPouvoirPrairiePratiquePre/cieuxPre/direPre/fixePre/ludePre/nomPre/sencePre/textePre/voirPrimitifPrincePrisonPriverProble-meProce/derProdigeProfondProgre-sProieProjeterProloguePromenerPropreProspe-reProte/gerProuesseProverbePrudencePruneauPsychosePublicPuceronPuiserPulpePulsarPunaisePunitifPupitrePurifierPuzzlePyramideQuasarQuerelleQuestionQuie/tudeQuitterQuotientRacineRaconterRadieuxRagondinRaideurRaisinRalentirRallongeRamasserRapideRasageRatisserRavagerRavinRayonnerRe/actifRe/agirRe/aliserRe/animerRecevoirRe/citerRe/clamerRe/colterRecruterReculerRecyclerRe/digerRedouterRefaireRe/flexeRe/formerRefrainRefugeRe/galienRe/gionRe/glageRe/gulierRe/ite/rerRejeterRejouerRelatifReleverReliefRemarqueReme-deRemiseRemonterRemplirRemuerRenardRenfortReniflerRenoncerRentrerRenvoiReplierReporterRepriseReptileRequinRe/serveRe/sineuxRe/soudreRespectResterRe/sultatRe/tablirRetenirRe/ticuleRetomberRetracerRe/unionRe/ussirRevancheRevivreRe/volteRe/vulsifRichesseRideauRieurRigideRigolerRincerRiposterRisibleRisqueRituelRivalRivie-reRocheuxRomanceRompreRonceRondinRoseauRosierRotatifRotorRotuleRougeRouilleRouleauRoutineRoyaumeRubanRubisRucheRuelleRugueuxRuinerRuisseauRuserRustiqueRythmeSablerSaboterSabreSacocheSafariSagesseSaisirSaladeSaliveSalonSaluerSamediSanctionSanglierSarcasmeSardineSaturerSaugrenuSaumonSauterSauvageSavantSavonnerScalpelScandaleSce/le/ratSce/narioSceptreSche/maScienceScinderScoreScrutinSculpterSe/anceSe/cableSe/cherSecouerSe/cre/terSe/datifSe/duireSeigneurSe/jourSe/lectifSemaineSemblerSemenceSe/minalSe/nateurSensibleSentenceSe/parerSe/quenceSereinSergentSe/rieuxSerrureSe/rumServiceSe/sameSe/virSevrageSextupleSide/ralSie-cleSie/gerSifflerSigleSignalSilenceSiliciumSimpleSince-reSinistreSiphonSiropSismiqueSituerSkierSocialSocleSodiumSoigneuxSoldatSoleilSolitudeSolubleSombreSommeilSomnolerSondeSongeurSonnetteSonoreSorcierSortirSosieSottiseSoucieuxSoudureSouffleSouleverSoupapeSourceSoutirerSouvenirSpacieuxSpatialSpe/cialSphe-reSpiralStableStationSternumStimulusStipulerStrictStudieuxStupeurStylisteSublimeSubstratSubtilSubvenirSucce-sSucreSuffixeSugge/rerSuiveurSulfateSuperbeSupplierSurfaceSuricateSurmenerSurpriseSursautSurvieSuspectSyllabeSymboleSyme/trieSynapseSyntaxeSyste-meTabacTablierTactileTaillerTalentTalismanTalonnerTambourTamiserTangibleTapisTaquinerTarderTarifTartineTasseTatamiTatouageTaupeTaureauTaxerTe/moinTemporelTenailleTendreTeneurTenirTensionTerminerTerneTerribleTe/tineTexteThe-meThe/orieThe/rapieThoraxTibiaTie-deTimideTirelireTiroirTissuTitaneTitreTituberTobogganTole/rantTomateToniqueTonneauToponymeTorcheTordreTornadeTorpilleTorrentTorseTortueTotemToucherTournageTousserToxineTractionTraficTragiqueTrahirTrainTrancherTravailTre-fleTremperTre/sorTreuilTriageTribunalTricoterTrilogieTriompheTriplerTriturerTrivialTromboneTroncTropicalTroupeauTuileTulipeTumulteTunnelTurbineTuteurTutoyerTuyauTympanTyphonTypiqueTyranUbuesqueUltimeUltrasonUnanimeUnifierUnionUniqueUnitaireUniversUraniumUrbainUrticantUsageUsineUsuelUsureUtileUtopieVacarmeVaccinVagabondVagueVaillantVaincreVaisseauValableValiseVallonValveVampireVanilleVapeurVarierVaseuxVassalVasteVecteurVedetteVe/ge/talVe/hiculeVeinardVe/loceVendrediVe/ne/rerVengerVenimeuxVentouseVerdureVe/rinVernirVerrouVerserVertuVestonVe/te/ranVe/tusteVexantVexerViaducViandeVictoireVidangeVide/oVignetteVigueurVilainVillageVinaigreViolonVipe-reVirementVirtuoseVirusVisageViseurVisionVisqueuxVisuelVitalVitesseViticoleVitrineVivaceVivipareVocationVoguerVoileVoisinVoitureVolailleVolcanVoltigerVolumeVoraceVortexVoterVouloirVoyageVoyelleWagonXe/nonYachtZe-breZe/nithZesteZoologie";
  var wordlist4 = null;
  var lookup2 = {};
  function dropDiacritic2(word) {
    logger21.checkNormalize();
    return toUtf8String(Array.prototype.filter.call(toUtf8Bytes(word.normalize("NFD").toLowerCase()), (c) => {
      return c >= 65 && c <= 90 || c >= 97 && c <= 123;
    }));
  }
  function expand2(word) {
    const output = [];
    Array.prototype.forEach.call(toUtf8Bytes(word), (c) => {
      if (c === 47) {
        output.push(204);
        output.push(129);
      } else if (c === 45) {
        output.push(204);
        output.push(128);
      } else {
        output.push(c);
      }
    });
    return toUtf8String(output);
  }
  function loadWords4(lang) {
    if (wordlist4 != null) {
      return;
    }
    wordlist4 = words4.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ").map((w) => expand2(w));
    wordlist4.forEach((word, index) => {
      lookup2[dropDiacritic2(word)] = index;
    });
    if (Wordlist.check(lang) !== "0x51deb7ae009149dc61a6bd18a918eb7ac78d2775726c68e598b92d002519b045") {
      wordlist4 = null;
      throw new Error("BIP39 Wordlist for fr (French) FAILED");
    }
  }
  var LangFr = class extends Wordlist {
    constructor() {
      super("fr");
    }
    getWord(index) {
      loadWords4(this);
      return wordlist4[index];
    }
    getWordIndex(word) {
      loadWords4(this);
      return lookup2[dropDiacritic2(word)];
    }
  };
  var langFr = new LangFr();
  Wordlist.register(langFr);

  // node_modules/@ethersproject/wordlists/lib.esm/lang-ja.js
  "use strict";
  var data = [
    "AQRASRAGBAGUAIRAHBAghAURAdBAdcAnoAMEAFBAFCBKFBQRBSFBCXBCDBCHBGFBEQBpBBpQBIkBHNBeOBgFBVCBhBBhNBmOBmRBiHBiFBUFBZDBvFBsXBkFBlcBjYBwDBMBBTBBTRBWBBWXXaQXaRXQWXSRXCFXYBXpHXOQXHRXhRXuRXmXXbRXlXXwDXTRXrCXWQXWGaBWaKcaYgasFadQalmaMBacAKaRKKBKKXKKjKQRKDRKCYKCRKIDKeVKHcKlXKjHKrYNAHNBWNaRNKcNIBNIONmXNsXNdXNnBNMBNRBNrXNWDNWMNFOQABQAHQBrQXBQXFQaRQKXQKDQKOQKFQNBQNDQQgQCXQCDQGBQGDQGdQYXQpBQpQQpHQLXQHuQgBQhBQhCQuFQmXQiDQUFQZDQsFQdRQkHQbRQlOQlmQPDQjDQwXQMBQMDQcFQTBQTHQrDDXQDNFDGBDGQDGRDpFDhFDmXDZXDbRDMYDRdDTRDrXSAhSBCSBrSGQSEQSHBSVRShYShkSyQSuFSiBSdcSoESocSlmSMBSFBSFKSFNSFdSFcCByCaRCKcCSBCSRCCrCGbCEHCYXCpBCpQCIBCIHCeNCgBCgFCVECVcCmkCmwCZXCZFCdRClOClmClFCjDCjdCnXCwBCwXCcRCFQCFjGXhGNhGDEGDMGCDGCHGIFGgBGVXGVEGVRGmXGsXGdYGoSGbRGnXGwXGwDGWRGFNGFLGFOGFdGFkEABEBDEBFEXOEaBEKSENBENDEYXEIgEIkEgBEgQEgHEhFEudEuFEiBEiHEiFEZDEvBEsXEsFEdXEdREkFEbBEbRElFEPCEfkEFNYAEYAhYBNYQdYDXYSRYCEYYoYgQYgRYuRYmCYZTYdBYbEYlXYjQYRbYWRpKXpQopQnpSFpCXpIBpISphNpdBpdRpbRpcZpFBpFNpFDpFopFrLADLBuLXQLXcLaFLCXLEhLpBLpFLHXLeVLhILdHLdRLoDLbRLrXIABIBQIBCIBsIBoIBMIBRIXaIaRIKYIKRINBINuICDIGBIIDIIkIgRIxFIyQIiHIdRIbYIbRIlHIwRIMYIcRIRVITRIFBIFNIFQOABOAFOBQOaFONBONMOQFOSFOCDOGBOEQOpBOLXOIBOIFOgQOgFOyQOycOmXOsXOdIOkHOMEOMkOWWHBNHXNHXWHNXHDuHDRHSuHSRHHoHhkHmRHdRHkQHlcHlRHwBHWcgAEgAggAkgBNgBQgBEgXOgYcgLXgHjgyQgiBgsFgdagMYgWSgFQgFEVBTVXEVKBVKNVKDVKYVKRVNBVNYVDBVDxVSBVSRVCjVGNVLXVIFVhBVhcVsXVdRVbRVlRhBYhKYhDYhGShxWhmNhdahdkhbRhjohMXhTRxAXxXSxKBxNBxEQxeNxeQxhXxsFxdbxlHxjcxFBxFNxFQxFOxFoyNYyYoybcyMYuBQuBRuBruDMuCouHBudQukkuoBulVuMXuFEmCYmCRmpRmeDmiMmjdmTFmFQiADiBOiaRiKRiNBiNRiSFiGkiGFiERipRiLFiIFihYibHijBijEiMXiWBiFBiFCUBQUXFUaRUNDUNcUNRUNFUDBUSHUCDUGBUGFUEqULNULoUIRUeEUeYUgBUhFUuRUiFUsXUdFUkHUbBUjSUjYUwXUMDUcHURdUTBUrBUrXUrQZAFZXZZaRZKFZNBZQFZCXZGBZYdZpBZLDZIFZHXZHNZeQZVRZVFZmXZiBZvFZdFZkFZbHZbFZwXZcCZcRZRBvBQvBGvBLvBWvCovMYsAFsBDsaRsKFsNFsDrsSHsSFsCXsCRsEBsEHsEfspBsLBsLDsIgsIRseGsbRsFBsFQsFSdNBdSRdCVdGHdYDdHcdVbdySduDdsXdlRdwXdWYdWcdWRkBMkXOkaRkNIkNFkSFkCFkYBkpRkeNkgBkhVkmXksFklVkMBkWDkFNoBNoaQoaFoNBoNXoNaoNEoSRoEroYXoYCoYbopRopFomXojkowXorFbBEbEIbdBbjYlaRlDElMXlFDjKjjSRjGBjYBjYkjpRjLXjIBjOFjeVjbRjwBnXQnSHnpFnLXnINnMBnTRwXBwXNwXYwNFwQFwSBwGFwLXwLDweNwgBwuHwjDwnXMBXMpFMIBMeNMTHcaQcNBcDHcSFcCXcpBcLXcLDcgFcuFcnXcwXccDcTQcrFTQErXNrCHrpFrgFrbFrTHrFcWNYWNbWEHWMXWTR",
    "ABGHABIJAEAVAYJQALZJAIaRAHNXAHdcAHbRAZJMAZJRAZTRAdVJAklmAbcNAjdRAMnRAMWYAWpRAWgRAFgBAFhBAFdcBNJBBNJDBQKBBQhcBQlmBDEJBYJkBYJTBpNBBpJFBIJBBIJDBIcABOKXBOEJBOVJBOiJBOZJBepBBeLXBeIFBegBBgGJBVJXBuocBiJRBUJQBlXVBlITBwNFBMYVBcqXBTlmBWNFBWiJBWnRBFGHBFwXXKGJXNJBXNZJXDTTXSHSXSVRXSlHXCJDXGQJXEhXXYQJXYbRXOfXXeNcXVJFXhQJXhEJXdTRXjdXXMhBXcQTXRGBXTEBXTnQXFCXXFOFXFgFaBaFaBNJaBCJaBpBaBwXaNJKaNJDaQIBaDpRaEPDaHMFamDJalEJaMZJaFaFaFNBaFQJaFLDaFVHKBCYKBEBKBHDKXaFKXGdKXEJKXpHKXIBKXZDKXwXKKwLKNacKNYJKNJoKNWcKDGdKDTRKChXKGaRKGhBKGbRKEBTKEaRKEPTKLMDKLWRKOHDKVJcKdBcKlIBKlOPKFSBKFEPKFpFNBNJNJBQNBGHNBEPNBHXNBgFNBVXNBZDNBsXNBwXNNaRNNJDNNJENNJkNDCJNDVDNGJRNJiDNZJNNsCJNJFNNFSBNFCXNFEPNFLXNFIFQJBFQCaRQJEQQLJDQLJFQIaRQOqXQHaFQHHQQVJXQVJDQhNJQmEIQZJFQsJXQJrFQWbRDJABDBYJDXNFDXCXDXLXDXZDDXsJDQqXDSJFDJCXDEPkDEqXDYmQDpSJDOCkDOGQDHEIDVJDDuDuDWEBDJFgSBNDSBSFSBGHSBIBSBTQSKVYSJQNSJQiSJCXSEqXSJYVSIiJSOMYSHAHSHaQSeCFSepQSegBSHdHSHrFShSJSJuHSJUFSkNRSrSrSWEBSFaHSJFQSFCXSFGDSFYXSFODSFgBSFVXSFhBSFxFSFkFSFbBSFMFCADdCJXBCXaFCXKFCXNFCXCXCXGBCXEJCXYBCXLDCXIBCXOPCXHXCXgBCXhBCXiBCXlDCXcHCJNBCJNFCDCJCDGBCDVXCDhBCDiDCDJdCCmNCpJFCIaRCOqXCHCHCHZJCViJCuCuCmddCJiFCdNBCdHhClEJCnUJCreSCWlgCWTRCFBFCFNBCFYBCFVFCFhFCFdSCFTBCFWDGBNBGBQFGJBCGBEqGBpBGBgQGNBEGNJYGNkOGNJRGDUFGJpQGHaBGJeNGJeEGVBlGVKjGiJDGvJHGsVJGkEBGMIJGWjNGFBFGFCXGFGBGFYXGFpBGFMFEASJEAWpEJNFECJVEIXSEIQJEOqXEOcFEeNcEHEJEHlFEJgFEhlmEmDJEmZJEiMBEUqXEoSREPBFEPXFEPKFEPSFEPEFEPpFEPLXEPIBEJPdEPcFEPTBEJnXEqlHEMpREFCXEFODEFcFYASJYJAFYBaBYBVXYXpFYDhBYCJBYJGFYYbRYeNcYJeVYiIJYZJcYvJgYvJRYJsXYsJFYMYMYreVpBNHpBEJpBwXpQxFpYEJpeNDpJeDpeSFpeCHpHUJpHbBpHcHpmUJpiiJpUJrpsJuplITpFaBpFQqpFGBpFEfpFYBpFpBpFLJpFIDpFgBpFVXpFyQpFuFpFlFpFjDpFnXpFwXpJFMpFTBLXCJLXEFLXhFLXUJLXbFLalmLNJBLSJQLCLCLGJBLLDJLHaFLeNFLeSHLeCXLepFLhaRLZsJLsJDLsJrLocaLlLlLMdbLFNBLFSBLFEHLFkFIBBFIBXFIBaQIBKXIBSFIBpHIBLXIBgBIBhBIBuHIBmXIBiFIBZXIBvFIBbFIBjQIBwXIBWFIKTRIQUJIDGFICjQIYSRIINXIJeCIVaRImEkIZJFIvJRIsJXIdCJIJoRIbBQIjYBIcqXITFVIreVIFKFIFSFIFCJIFGFIFLDIFIBIJFOIFgBIFVXIJFhIFxFIFmXIFdHIFbBIJFrIJFWOBGBOQfXOOKjOUqXOfXBOqXEOcqXORVJOFIBOFlDHBIOHXiFHNTRHCJXHIaRHHJDHHEJHVbRHZJYHbIBHRsJHRkDHWlmgBKFgBSBgBCDgBGHgBpBgBIBgBVJgBuBgBvFgKDTgQVXgDUJgGSJgOqXgmUMgZIJgTUJgWIEgFBFgFNBgFDJgFSFgFGBgFYXgJFOgFgQgFVXgFhBgFbHgJFWVJABVQKcVDgFVOfXVeDFVhaRVmGdViJYVMaRVFNHhBNDhBCXhBEqhBpFhBLXhNJBhSJRheVXhhKEhxlmhZIJhdBQhkIJhbMNhMUJhMZJxNJgxQUJxDEkxDdFxSJRxplmxeSBxeCXxeGFxeYXxepQxegBxWVcxFEQxFLXxFIBxFgBxFxDxFZtxFdcxFbBxFwXyDJXyDlcuASJuDJpuDIBuCpJuGSJuIJFueEFuZIJusJXudWEuoIBuWGJuFBcuFKEuFNFuFQFuFDJuFGJuFVJuFUtuFdHuFTBmBYJmNJYmQhkmLJDmLJomIdXmiJYmvJRmsJRmklmmMBymMuCmclmmcnQiJABiJBNiJBDiBSFiBCJiBEFiBYBiBpFiBLXiBTHiJNciDEfiCZJiECJiJEqiOkHiHKFieNDiHJQieQcieDHieSFieCXieGFieEFieIHiegFihUJixNoioNXiFaBiFKFiFNDiFEPiFYXitFOitFHiFgBiFVEiFmXiFitiFbBiFMFiFrFUCXQUIoQUIJcUHQJUeCEUHwXUUJDUUqXUdWcUcqXUrnQUFNDUFSHUFCFUFEfUFLXUtFOZBXOZXSBZXpFZXVXZEQJZEJkZpDJZOqXZeNHZeCDZUqXZFBQZFEHZFLXvBAFvBKFvBCXvBEPvBpHvBIDvBgFvBuHvQNJvFNFvFGBvFIBvJFcsXCDsXLXsXsXsXlFsXcHsQqXsJQFsEqXseIFsFEHsFjDdBxOdNpRdNJRdEJbdpJRdhZJdnSJdrjNdFNJdFQHdFhNkNJDkYaRkHNRkHSRkVbRkuMRkjSJkcqDoSJFoEiJoYZJoOfXohEBoMGQocqXbBAFbBXFbBaFbBNDbBGBbBLXbBTBbBWDbGJYbIJHbFQqbFpQlDgQlOrFlVJRjGEBjZJRnXvJnXbBnEfHnOPDngJRnxfXnUJWwXEJwNpJwDpBwEfXwrEBMDCJMDGHMDIJMLJDcQGDcQpHcqXccqNFcqCXcFCJRBSBRBGBRBEJRBpQTBNFTBQJTBpBTBVXTFABTFSBTFCFTFGBTFMDrXCJrXLDrDNJrEfHrFQJrFitWNjdWNTR",
    "AKLJMANOPFASNJIAEJWXAYJNRAIIbRAIcdaAeEfDAgidRAdjNYAMYEJAMIbRAFNJBAFpJFBBIJYBDZJFBSiJhBGdEBBEJfXBEJqXBEJWRBpaUJBLXrXBIYJMBOcfXBeEfFBestXBjNJRBcDJOBFEqXXNvJRXDMBhXCJNYXOAWpXONJWXHDEBXeIaRXhYJDXZJSJXMDJOXcASJXFVJXaBQqXaBZJFasXdQaFSJQaFEfXaFpJHaFOqXKBNSRKXvJBKQJhXKEJQJKEJGFKINJBKIJjNKgJNSKVElmKVhEBKiJGFKlBgJKjnUJKwsJYKMFIJKFNJDKFIJFKFOfXNJBSFNJBCXNBpJFNJBvQNJBMBNJLJXNJOqXNJeCXNJeGFNdsJCNbTKFNwXUJQNFEPQDiJcQDMSJQSFpBQGMQJQJeOcQyCJEQUJEBQJFBrQFEJqDXDJFDJXpBDJXIMDGiJhDIJGRDJeYcDHrDJDVXgFDkAWpDkIgRDjDEqDMvJRDJFNFDJFIBSKclmSJQOFSJQVHSJQjDSJGJBSJGJFSECJoSHEJqSJHTBSJVJDSViJYSZJNBSJsJDSFSJFSFEfXSJFLXCBUJVCJXSBCJXpBCXVJXCJXsXCJXdFCJNJHCLIJgCHiJFCVNJMChCJhCUHEJCsJTRCJdYcCoQJCCFEfXCFIJgCFUJxCFstFGJBaQGJBIDGQJqXGYJNRGJHKFGeQqDGHEJFGJeLXGHIiJGHdBlGUJEBGkIJTGFQPDGJFEqEAGegEJIJBEJVJXEhQJTEiJNcEJZJFEJoEqEjDEqEPDsXEPGJBEPOqXEPeQFEfDiDEJfEFEfepQEfMiJEqXNBEqDIDEqeSFEqVJXEMvJRYXNJDYXEJHYKVJcYYJEBYJeEcYJUqXYFpJFYFstXpAZJMpBSJFpNBNFpeQPDpHLJDpHIJFpHgJFpeitFpHZJFpJFADpFSJFpJFCJpFOqXpFitBpJFZJLXIJFLIJgRLVNJWLVHJMLwNpJLFGJBLFLJDLFOqXLJFUJIBDJXIBGJBIJBYQIJBIBIBOqXIBcqDIEGJFILNJTIIJEBIOiJhIJeNBIJeIBIhiJIIWoTRIJFAHIJFpBIJFuHIFUtFIJFTHOSBYJOEcqXOHEJqOvBpFOkVJrObBVJOncqDOcNJkHhNJRHuHJuHdMhBgBUqXgBsJXgONJBgHNJDgHHJQgJeitgHsJXgJyNagyDJBgZJDrgsVJQgkEJNgkjSJgJFAHgFCJDgFZtMVJXNFVXQfXVJXDJVXoQJVQVJQVDEfXVDvJHVEqNFVeQfXVHpJFVHxfXVVJSRVVmaRVlIJOhCXVJhHjYkhxCJVhWVUJhWiJcxBNJIxeEqDxfXBFxcFEPxFSJFxFYJXyBDQJydaUJyFOPDuYCJYuLvJRuHLJXuZJLDuFOPDuFZJHuFcqXmKHJdmCQJcmOsVJiJAGFitLCFieOfXiestXiZJMEikNJQirXzFiFQqXiFIJFiFZJFiFvtFUHpJFUteIcUteOcUVCJkUhdHcUbEJEUJqXQUMNJhURjYkUFitFZDGJHZJIxDZJVJXZJFDJZJFpQvBNJBvBSJFvJxBrseQqDsVFVJdFLJDkEJNBkmNJYkFLJDoQJOPoGsJRoEAHBoEJfFbBQqDbBZJHbFVJXlFIJBjYIrXjeitcjjCEBjWMNBwXQfXwXOaFwDsJXwCJTRwrCZJMDNJQcDDJFcqDOPRYiJFTBsJXTQIJBTFEfXTFLJDrXEJFrEJXMrFZJFWEJdEWYTlm",
    "ABCDEFACNJTRAMBDJdAcNJVXBLNJEBXSIdWRXErNJkXYDJMBXZJCJaXMNJaYKKVJKcKDEJqXKDcNJhKVJrNYKbgJVXKFVJSBNBYBwDNJeQfXNJeEqXNhGJWENJFiJRQlIJbEQJfXxDQqXcfXQFNDEJQFwXUJDYcnUJDJIBgQDIUJTRDJFEqDSJQSJFSJQIJFSOPeZtSJFZJHCJXQfXCTDEqFGJBSJFGJBOfXGJBcqXGJHNJDGJRLiJEJfXEqEJFEJPEFpBEJYJBZJFYBwXUJYiJMEBYJZJyTYTONJXpQMFXFpeGIDdpJFstXpJFcPDLBVSJRLHQJqXLJFZJFIJBNJDIJBUqXIBkFDJIJEJPTIYJGWRIJeQPDIJeEfHIJFsJXOqGDSFHXEJqXgJCsJCgGQJqXgdQYJEgFMFNBgJFcqDVJwXUJVJFZJchIgJCCxOEJqXxOwXUJyDJBVRuscisciJBiJBieUtqXiJFDJkiFsJXQUGEZJcUJFsJXZtXIrXZDZJDrZJFNJDZJFstXvJFQqXvJFCJEsJXQJqkhkNGBbDJdTRbYJMEBlDwXUJMEFiJFcfXNJDRcNJWMTBLJXC",
    "BraFUtHBFSJFdbNBLJXVJQoYJNEBSJBEJfHSJHwXUJCJdAZJMGjaFVJXEJPNJBlEJfFiJFpFbFEJqIJBVJCrIBdHiJhOPFChvJVJZJNJWxGFNIFLueIBQJqUHEJfUFstOZJDrlXEASJRlXVJXSFwVJNJWD",
    "QJEJNNJDQJEJIBSFQJEJxegBQJEJfHEPSJBmXEJFSJCDEJqXLXNJFQqXIcQsFNJFIFEJqXUJgFsJXIJBUJEJfHNFvJxEqXNJnXUJFQqD",
    "IJBEJqXZJ"
  ];
  var mapping = "~~AzB~X~a~KN~Q~D~S~C~G~E~Y~p~L~I~O~eH~g~V~hxyumi~~U~~Z~~v~~s~~dkoblPjfnqwMcRTr~W~~~F~~~~~Jt";
  var wordlist5 = null;
  function hex(word) {
    return hexlify(toUtf8Bytes(word));
  }
  var KiYoKu = "0xe3818de38284e3818f";
  var KyoKu = "0xe3818de38283e3818f";
  function loadWords5(lang) {
    if (wordlist5 !== null) {
      return;
    }
    wordlist5 = [];
    const transform = {};
    transform[toUtf8String([227, 130, 154])] = false;
    transform[toUtf8String([227, 130, 153])] = false;
    transform[toUtf8String([227, 130, 133])] = toUtf8String([227, 130, 134]);
    transform[toUtf8String([227, 129, 163])] = toUtf8String([227, 129, 164]);
    transform[toUtf8String([227, 130, 131])] = toUtf8String([227, 130, 132]);
    transform[toUtf8String([227, 130, 135])] = toUtf8String([227, 130, 136]);
    function normalize2(word) {
      let result = "";
      for (let i = 0; i < word.length; i++) {
        let kana = word[i];
        const target = transform[kana];
        if (target === false) {
          continue;
        }
        if (target) {
          kana = target;
        }
        result += kana;
      }
      return result;
    }
    function sortJapanese(a, b) {
      a = normalize2(a);
      b = normalize2(b);
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
    for (let length = 3; length <= 9; length++) {
      const d = data[length - 3];
      for (let offset = 0; offset < d.length; offset += length) {
        const word = [];
        for (let i = 0; i < length; i++) {
          const k = mapping.indexOf(d[offset + i]);
          word.push(227);
          word.push(k & 64 ? 130 : 129);
          word.push((k & 63) + 128);
        }
        wordlist5.push(toUtf8String(word));
      }
    }
    wordlist5.sort(sortJapanese);
    if (hex(wordlist5[442]) === KiYoKu && hex(wordlist5[443]) === KyoKu) {
      const tmp = wordlist5[442];
      wordlist5[442] = wordlist5[443];
      wordlist5[443] = tmp;
    }
    if (Wordlist.check(lang) !== "0xcb36b09e6baa935787fd762ce65e80b0c6a8dabdfbc3a7f86ac0e2c4fd111600") {
      wordlist5 = null;
      throw new Error("BIP39 Wordlist for ja (Japanese) FAILED");
    }
  }
  var LangJa = class extends Wordlist {
    constructor() {
      super("ja");
    }
    getWord(index) {
      loadWords5(this);
      return wordlist5[index];
    }
    getWordIndex(word) {
      loadWords5(this);
      return wordlist5.indexOf(word);
    }
    split(mnemonic) {
      logger21.checkNormalize();
      return mnemonic.split(/(?:\u3000| )+/g);
    }
    join(words6) {
      return words6.join("\u3000");
    }
  };
  var langJa = new LangJa();
  Wordlist.register(langJa);

  // node_modules/@ethersproject/wordlists/lib.esm/lang-ko.js
  "use strict";
  var data2 = [
    "OYAa",
    "ATAZoATBl3ATCTrATCl8ATDloATGg3ATHT8ATJT8ATJl3ATLlvATLn4ATMT8ATMX8ATMboATMgoAToLbAToMTATrHgATvHnAT3AnAT3JbAT3MTAT8DbAT8JTAT8LmAT8MYAT8MbAT#LnAUHT8AUHZvAUJXrAUJX8AULnrAXJnvAXLUoAXLgvAXMn6AXRg3AXrMbAX3JTAX3QbAYLn3AZLgvAZrSUAZvAcAZ8AaAZ8AbAZ8AnAZ8HnAZ8LgAZ8MYAZ8MgAZ8OnAaAboAaDTrAaFTrAaJTrAaJboAaLVoAaMXvAaOl8AaSeoAbAUoAbAg8AbAl4AbGnrAbMT8AbMXrAbMn4AbQb8AbSV8AbvRlAb8AUAb8AnAb8HgAb8JTAb8NTAb8RbAcGboAcLnvAcMT8AcMX8AcSToAcrAaAcrFnAc8AbAc8MgAfGgrAfHboAfJnvAfLV8AfLkoAfMT8AfMnoAfQb8AfScrAfSgrAgAZ8AgFl3AgGX8AgHZvAgHgrAgJXoAgJX8AgJboAgLZoAgLn4AgOX8AgoATAgoAnAgoCUAgoJgAgoLXAgoMYAgoSeAgrDUAgrJTAhrFnAhrLjAhrQgAjAgoAjJnrAkMX8AkOnoAlCTvAlCV8AlClvAlFg4AlFl6AlFn3AloSnAlrAXAlrAfAlrFUAlrFbAlrGgAlrOXAlvKnAlvMTAl3AbAl3MnAnATrAnAcrAnCZ3AnCl8AnDg8AnFboAnFl3AnHX4AnHbrAnHgrAnIl3AnJgvAnLXoAnLX4AnLbrAnLgrAnLhrAnMXoAnMgrAnOn3AnSbrAnSeoAnvLnAn3OnCTGgvCTSlvCTvAUCTvKnCTvNTCT3CZCT3GUCT3MTCT8HnCUCZrCULf8CULnvCU3HnCU3JUCY6NUCbDb8CbFZoCbLnrCboOTCboScCbrFnCbvLnCb8AgCb8HgCb$LnCkLfoClBn3CloDUDTHT8DTLl3DTSU8DTrAaDTrLXDTrLjDTrOYDTrOgDTvFXDTvFnDT3HUDT3LfDUCT9DUDT4DUFVoDUFV8DUFkoDUGgrDUJnrDULl8DUMT8DUMXrDUMX4DUMg8DUOUoDUOgvDUOg8DUSToDUSZ8DbDXoDbDgoDbGT8DbJn3DbLg3DbLn4DbMXrDbMg8DbOToDboJXGTClvGTDT8GTFZrGTLVoGTLlvGTLl3GTMg8GTOTvGTSlrGToCUGTrDgGTrJYGTrScGTtLnGTvAnGTvQgGUCZrGUDTvGUFZoGUHXrGULnvGUMT8GUoMgGXoLnGXrMXGXrMnGXvFnGYLnvGZOnvGZvOnGZ8LaGZ8LmGbAl3GbDYvGbDlrGbHX3GbJl4GbLV8GbLn3GbMn4GboJTGboRfGbvFUGb3GUGb4JnGgDX3GgFl$GgJlrGgLX6GgLZoGgLf8GgOXoGgrAgGgrJXGgrMYGgrScGgvATGgvOYGnAgoGnJgvGnLZoGnLg3GnLnrGnQn8GnSbrGnrMgHTClvHTDToHTFT3HTQT8HToJTHToJgHTrDUHTrMnHTvFYHTvRfHT8MnHT8SUHUAZ8HUBb4HUDTvHUoMYHXFl6HXJX6HXQlrHXrAUHXrMnHXrSbHXvFYHXvKXHX3LjHX3MeHYvQlHZrScHZvDbHbAcrHbFT3HbFl3HbJT8HbLTrHbMT8HbMXrHbMbrHbQb8HbSX3HboDbHboJTHbrFUHbrHgHbrJTHb8JTHb8MnHb8QgHgAlrHgDT3HgGgrHgHgrHgJTrHgJT8HgLX@HgLnrHgMT8HgMX8HgMboHgOnrHgQToHgRg3HgoHgHgrCbHgrFnHgrLVHgvAcHgvAfHnAloHnCTrHnCnvHnGTrHnGZ8HnGnvHnJT8HnLf8HnLkvHnMg8HnRTrITvFUITvFnJTAXrJTCV8JTFT3JTFT8JTFn4JTGgvJTHT8JTJT8JTJXvJTJl3JTJnvJTLX4JTLf8JTLhvJTMT8JTMXrJTMnrJTObrJTQT8JTSlvJT8DUJT8FkJT8MTJT8OXJT8OgJT8QUJT8RfJUHZoJXFT4JXFlrJXGZ8JXGnrJXLV8JXLgvJXMXoJXMX3JXNboJXPlvJXoJTJXoLkJXrAXJXrHUJXrJgJXvJTJXvOnJX4KnJYAl3JYJT8JYLhvJYQToJYrQXJY6NUJbAl3JbCZrJbDloJbGT8JbGgrJbJXvJbJboJbLf8JbLhrJbLl3JbMnvJbRg8JbSZ8JboDbJbrCZJbrSUJb3KnJb8LnJfRn8JgAXrJgCZrJgDTrJgGZrJgGZ8JgHToJgJT8JgJXoJgJgvJgLX4JgLZ3JgLZ8JgLn4JgMgrJgMn4JgOgvJgPX6JgRnvJgSToJgoCZJgoJbJgoMYJgrJXJgrJgJgrLjJg6MTJlCn3JlGgvJlJl8Jl4AnJl8FnJl8HgJnAToJnATrJnAbvJnDUoJnGnrJnJXrJnJXvJnLhvJnLnrJnLnvJnMToJnMT8JnMXvJnMX3JnMg8JnMlrJnMn4JnOX8JnST4JnSX3JnoAgJnoAnJnoJTJnoObJnrAbJnrAkJnrHnJnrJTJnrJYJnrOYJnrScJnvCUJnvFaJnvJgJnvJnJnvOYJnvQUJnvRUJn3FnJn3JTKnFl3KnLT6LTDlvLTMnoLTOn3LTRl3LTSb4LTSlrLToAnLToJgLTrAULTrAcLTrCULTrHgLTrMgLT3JnLULnrLUMX8LUoJgLVATrLVDTrLVLb8LVoJgLV8MgLV8RTLXDg3LXFlrLXrCnLXrLXLX3GTLX4GgLX4OYLZAXrLZAcrLZAgrLZAhrLZDXyLZDlrLZFbrLZFl3LZJX6LZJX8LZLc8LZLnrLZSU8LZoJTLZoJnLZrAgLZrAnLZrJYLZrLULZrMgLZrSkLZvAnLZvGULZvJeLZvOTLZ3FZLZ4JXLZ8STLZ8ScLaAT3LaAl3LaHT8LaJTrLaJT8LaJXrLaJgvLaJl4LaLVoLaMXrLaMXvLaMX8LbClvLbFToLbHlrLbJn4LbLZ3LbLhvLbMXrLbMnoLbvSULcLnrLc8HnLc8MTLdrMnLeAgoLeOgvLeOn3LfAl3LfLnvLfMl3LfOX8Lf8AnLf8JXLf8LXLgJTrLgJXrLgJl8LgMX8LgRZrLhCToLhrAbLhrFULhrJXLhvJYLjHTrLjHX4LjJX8LjLhrLjSX3LjSZ4LkFX4LkGZ8LkGgvLkJTrLkMXoLkSToLkSU8LkSZ8LkoOYLl3FfLl3MgLmAZrLmCbrLmGgrLmHboLmJnoLmJn3LmLfoLmLhrLmSToLnAX6LnAb6LnCZ3LnCb3LnDTvLnDb8LnFl3LnGnrLnHZvLnHgvLnITvLnJT8LnJX8LnJlvLnLf8LnLg6LnLhvLnLnoLnMXrLnMg8LnQlvLnSbrLnrAgLnrAnLnrDbLnrFkLnrJdLnrMULnrOYLnrSTLnvAnLnvDULnvHgLnvOYLnvOnLn3GgLn4DULn4JTLn4JnMTAZoMTAloMTDb8MTFT8MTJnoMTJnrMTLZrMTLhrMTLkvMTMX8MTRTrMToATMTrDnMTrOnMT3JnMT4MnMT8FUMT8FaMT8FlMT8GTMT8GbMT8GnMT8HnMT8JTMT8JbMT8OTMUCl8MUJTrMUJU8MUMX8MURTrMUSToMXAX6MXAb6MXCZoMXFXrMXHXrMXLgvMXOgoMXrAUMXrAnMXrHgMXrJYMXrJnMXrMTMXrMgMXrOYMXrSZMXrSgMXvDUMXvOTMX3JgMX3OTMX4JnMX8DbMX8FnMX8HbMX8HgMX8HnMX8LbMX8MnMX8OnMYAb8MYGboMYHTvMYHX4MYLTrMYLnvMYMToMYOgvMYRg3MYSTrMbAToMbAXrMbAl3MbAn8MbGZ8MbJT8MbJXrMbMXvMbMX8MbMnoMbrMUMb8AfMb8FbMb8FkMcJXoMeLnrMgFl3MgGTvMgGXoMgGgrMgGnrMgHT8MgHZrMgJnoMgLnrMgLnvMgMT8MgQUoMgrHnMgvAnMg8HgMg8JYMg8LfMloJnMl8ATMl8AXMl8JYMnAToMnAT4MnAZ8MnAl3MnAl4MnCl8MnHT8MnHg8MnJnoMnLZoMnLhrMnMXoMnMX3MnMnrMnOgvMnrFbMnrFfMnrFnMnrNTMnvJXNTMl8OTCT3OTFV8OTFn3OTHZvOTJXrOTOl3OT3ATOT3JUOT3LZOT3LeOT3MbOT8ATOT8AbOT8AgOT8MbOUCXvOUMX3OXHXvOXLl3OXrMUOXvDbOX6NUOX8JbOYFZoOYLbrOYLkoOYMg8OYSX3ObHTrObHT4ObJgrObLhrObMX3ObOX8Ob8FnOeAlrOeJT8OeJXrOeJnrOeLToOeMb8OgJXoOgLXoOgMnrOgOXrOgOloOgoAgOgoJbOgoMYOgoSTOg8AbOjLX4OjMnoOjSV8OnLVoOnrAgOn3DUPXQlrPXvFXPbvFTPdAT3PlFn3PnvFbQTLn4QToAgQToMTQULV8QURg8QUoJnQXCXvQbFbrQb8AaQb8AcQb8FbQb8MYQb8ScQeAlrQeLhrQjAn3QlFXoQloJgQloSnRTLnvRTrGURTrJTRUJZrRUoJlRUrQnRZrLmRZrMnRZrSnRZ8ATRZ8JbRZ8ScRbMT8RbST3RfGZrRfMX8RfMgrRfSZrRnAbrRnGT8RnvJgRnvLfRnvMTRn8AaSTClvSTJgrSTOXrSTRg3STRnvSToAcSToAfSToAnSToHnSToLjSToMTSTrAaSTrEUST3BYST8AgST8LmSUAZvSUAgrSUDT4SUDT8SUGgvSUJXoSUJXvSULTrSU8JTSU8LjSV8AnSV8JgSXFToSXLf8SYvAnSZrDUSZrMUSZrMnSZ8HgSZ8JTSZ8JgSZ8MYSZ8QUSaQUoSbCT3SbHToSbQYvSbSl4SboJnSbvFbSb8HbSb8JgSb8OTScGZrScHgrScJTvScMT8ScSToScoHbScrMTScvAnSeAZrSeAcrSeHboSeJUoSeLhrSeMT8SeMXrSe6JgSgHTrSkJnoSkLnvSk8CUSlFl3SlrSnSl8GnSmAboSmGT8SmJU8",
    "ATLnDlATrAZoATrJX4ATrMT8ATrMX4ATrRTrATvDl8ATvJUoATvMl8AT3AToAT3MX8AT8CT3AT8DT8AT8HZrAT8HgoAUAgFnAUCTFnAXoMX8AXrAT8AXrGgvAXrJXvAXrOgoAXvLl3AZvAgoAZvFbrAZvJXoAZvJl8AZvJn3AZvMX8AZvSbrAZ8FZoAZ8LZ8AZ8MU8AZ8OTvAZ8SV8AZ8SX3AbAgFZAboJnoAbvGboAb8ATrAb8AZoAb8AgrAb8Al4Ab8Db8Ab8JnoAb8LX4Ab8LZrAb8LhrAb8MT8Ab8OUoAb8Qb8Ab8ST8AcrAUoAcrAc8AcrCZ3AcrFT3AcrFZrAcrJl4AcrJn3AcrMX3AcrOTvAc8AZ8Ac8MT8AfAcJXAgoFn4AgoGgvAgoGnrAgoLc8AgoMXoAgrLnrAkrSZ8AlFXCTAloHboAlrHbrAlrLhrAlrLkoAl3CZrAl3LUoAl3LZrAnrAl4AnrMT8An3HT4BT3IToBX4MnvBb!Ln$CTGXMnCToLZ4CTrHT8CT3JTrCT3RZrCT#GTvCU6GgvCU8Db8CU8GZrCU8HT8CboLl3CbrGgrCbrMU8Cb8DT3Cb8GnrCb8LX4Cb8MT8Cb8ObrCgrGgvCgrKX4Cl8FZoDTrAbvDTrDboDTrGT6DTrJgrDTrMX3DTrRZrDTrRg8DTvAVvDTvFZoDT3DT8DT3Ln3DT4HZrDT4MT8DT8AlrDT8MT8DUAkGbDUDbJnDYLnQlDbDUOYDbMTAnDbMXSnDboAT3DboFn4DboLnvDj6JTrGTCgFTGTGgFnGTJTMnGTLnPlGToJT8GTrCT3GTrLVoGTrLnvGTrMX3GTrMboGTvKl3GZClFnGZrDT3GZ8DTrGZ8FZ8GZ8MXvGZ8On8GZ8ST3GbCnQXGbMbFnGboFboGboJg3GboMXoGb3JTvGb3JboGb3Mn6Gb3Qb8GgDXLjGgMnAUGgrDloGgrHX4GgrSToGgvAXrGgvAZvGgvFbrGgvLl3GgvMnvGnDnLXGnrATrGnrMboGnuLl3HTATMnHTAgCnHTCTCTHTrGTvHTrHTvHTrJX8HTrLl8HTrMT8HTrMgoHTrOTrHTuOn3HTvAZrHTvDTvHTvGboHTvJU8HTvLl3HTvMXrHTvQb4HT4GT6HT4JT8HT4Jb#HT8Al3HT8GZrHT8GgrHT8HX4HT8Jb8HT8JnoHT8LTrHT8LgvHT8SToHT8SV8HUoJUoHUoJX8HUoLnrHXrLZoHXvAl3HX3LnrHX4FkvHX4LhrHX4MXoHX4OnoHZrAZ8HZrDb8HZrGZ8HZrJnrHZvGZ8HZvLnvHZ8JnvHZ8LhrHbCXJlHbMTAnHboJl4HbpLl3HbrJX8HbrLnrHbrMnvHbvRYrHgoSTrHgrFV8HgrGZ8HgrJXoHgrRnvHgvBb!HgvGTrHgvHX4HgvHn!HgvLTrHgvSU8HnDnLbHnFbJbHnvDn8Hn6GgvHn!BTvJTCTLnJTQgFnJTrAnvJTrLX4JTrOUoJTvFn3JTvLnrJTvNToJT3AgoJT3Jn4JT3LhvJT3ObrJT8AcrJT8Al3JT8JT8JT8JnoJT8LX4JT8LnrJT8MX3JT8Rg3JT8Sc8JUoBTvJU8AToJU8GZ8JU8GgvJU8JTrJU8JXrJU8JnrJU8LnvJU8ScvJXHnJlJXrGgvJXrJU8JXrLhrJXrMT8JXrMXrJXrQUoJXvCTvJXvGZ8JXvGgrJXvQT8JX8Ab8JX8DT8JX8GZ8JX8HZvJX8LnrJX8MT8JX8MXoJX8MnvJX8ST3JYGnCTJbAkGbJbCTAnJbLTAcJboDT3JboLb6JbrAnvJbrCn3JbrDl8JbrGboJbrIZoJbrJnvJbrMnvJbrQb4Jb8RZrJeAbAnJgJnFbJgScAnJgrATrJgvHZ8JgvMn4JlJlFbJlLiQXJlLjOnJlRbOlJlvNXoJlvRl3Jl4AcrJl8AUoJl8MnrJnFnMlJnHgGbJnoDT8JnoFV8JnoGgvJnoIT8JnoQToJnoRg3JnrCZ3JnrGgrJnrHTvJnrLf8JnrOX8JnvAT3JnvFZoJnvGT8JnvJl4JnvMT8JnvMX8JnvOXrJnvPX6JnvSX3JnvSZrJn3MT8Jn3MX8Jn3RTrLTATKnLTJnLTLTMXKnLTRTQlLToGb8LTrAZ8LTrCZ8LTrDb8LTrHT8LT3PX6LT4FZoLT$CTvLT$GgrLUvHX3LVoATrLVoAgoLVoJboLVoMX3LVoRg3LV8CZ3LV8FZoLV8GTvLXrDXoLXrFbrLXvAgvLXvFlrLXvLl3LXvRn6LX4Mb8LX8GT8LYCXMnLYrMnrLZoSTvLZrAZvLZrAloLZrFToLZrJXvLZrJboLZrJl4LZrLnrLZrMT8LZrOgvLZrRnvLZrST4LZvMX8LZvSlvLZ8AgoLZ8CT3LZ8JT8LZ8LV8LZ8LZoLZ8Lg8LZ8SV8LZ8SbrLZ$HT8LZ$Mn4La6CTvLbFbMnLbRYFTLbSnFZLboJT8LbrAT9LbrGb3LbrQb8LcrJX8LcrMXrLerHTvLerJbrLerNboLgrDb8LgrGZ8LgrHTrLgrMXrLgrSU8LgvJTrLgvLl3Lg6Ll3LhrLnrLhrMT8LhvAl4LiLnQXLkoAgrLkoJT8LkoJn4LlrSU8Ll3FZoLl3HTrLl3JX8Ll3JnoLl3LToLmLeFbLnDUFbLnLVAnLnrATrLnrAZoLnrAb8LnrAlrLnrGgvLnrJU8LnrLZrLnrLhrLnrMb8LnrOXrLnrSZ8LnvAb4LnvDTrLnvDl8LnvHTrLnvHbrLnvJT8LnvJU8LnvJbrLnvLhvLnvMX8LnvMb8LnvNnoLnvSU8Ln3Al3Ln4FZoLn4GT6Ln4JgvLn4LhrLn4MT8Ln4SToMToCZrMToJX8MToLX4MToLf8MToRg3MTrEloMTvGb6MT3BTrMT3Lb6MT8AcrMT8AgrMT8GZrMT8JnoMT8LnrMT8MX3MUOUAnMXAbFnMXoAloMXoJX8MXoLf8MXoLl8MXrAb8MXrDTvMXrGT8MXrGgrMXrHTrMXrLf8MXrMU8MXrOXvMXrQb8MXvGT8MXvHTrMXvLVoMX3AX3MX3Jn3MX3LhrMX3MX3MX4AlrMX4OboMX8GTvMX8GZrMX8GgrMX8JT8MX8JX8MX8LhrMX8MT8MYDUFbMYMgDbMbGnFfMbvLX4MbvLl3Mb8Mb8Mb8ST4MgGXCnMg8ATrMg8AgoMg8CZrMg8DTrMg8DboMg8HTrMg8JgrMg8LT8MloJXoMl8AhrMl8JT8MnLgAUMnoJXrMnoLX4MnoLhrMnoMT8MnrAl4MnrDb8MnrOTvMnrOgvMnrQb8MnrSU8MnvGgrMnvHZ8Mn3MToMn4DTrMn4LTrMn4Mg8NnBXAnOTFTFnOToAToOTrGgvOTrJX8OT3JXoOT6MTrOT8GgrOT8HTpOT8MToOUoHT8OUoJT8OUoLn3OXrAgoOXrDg8OXrMT8OXvSToOX6CTvOX8CZrOX8OgrOb6HgvOb8AToOb8MT8OcvLZ8OgvAlrOgvHTvOgvJTrOgvJnrOgvLZrOgvLn4OgvMT8OgvRTrOg8AZoOg8DbvOnrOXoOnvJn4OnvLhvOnvRTrOn3GgoOn3JnvOn6JbvOn8OTrPTGYFTPbBnFnPbGnDnPgDYQTPlrAnvPlrETvPlrLnvPlrMXvPlvFX4QTMTAnQTrJU8QYCnJlQYJlQlQbGTQbQb8JnrQb8LZoQb8LnvQb8MT8Qb8Ml8Qb8ST4QloAl4QloHZvQloJX8QloMn8QnJZOlRTrAZvRTrDTrRTvJn4RTvLhvRT4Jb8RZrAZrRZ8AkrRZ8JU8RZ8LV8RZ8LnvRbJlQXRg3GboRg3MnvRg8AZ8Rg8JboRg8Jl4RnLTCbRnvFl3RnvQb8SToAl4SToCZrSToFZoSToHXrSToJU8SToJgvSToJl4SToLhrSToMX3STrAlvSTrCT9STrCgrSTrGgrSTrHXrSTrHboSTrJnoSTrNboSTvLnrST4AZoST8Ab8ST8JT8SUoJn3SU6HZ#SU6JTvSU8Db8SU8HboSU8LgrSV8JT8SZrAcrSZrAl3SZrJT8SZrJnvSZrMT8SZvLUoSZ4FZoSZ8JnoSZ8RZrScoLnrScoMT8ScoMX8ScrAT4ScrAZ8ScrLZ8ScrLkvScvDb8ScvLf8ScvNToSgrFZrShvKnrSloHUoSloLnrSlrMXoSl8HgrSmrJUoSn3BX6",
    "ATFlOn3ATLgrDYAT4MTAnAT8LTMnAYJnRTrAbGgJnrAbLV8LnAbvNTAnAeFbLg3AgOYMXoAlQbFboAnDboAfAnJgoJTBToDgAnBUJbAl3BboDUAnCTDlvLnCTFTrSnCYoQTLnDTwAbAnDUDTrSnDUHgHgrDX8LXFnDbJXAcrETvLTLnGTFTQbrGTMnGToGT3DUFbGUJlPX3GbQg8LnGboJbFnGb3GgAYGgAg8ScGgMbAXrGgvAbAnGnJTLnvGnvATFgHTDT6ATHTrDlJnHYLnMn8HZrSbJTHZ8LTFnHbFTJUoHgSeMT8HgrLjAnHgvAbAnHlFUrDlHnDgvAnHnHTFT3HnQTGnrJTAaMXvJTGbCn3JTOgrAnJXvAXMnJbMg8SnJbMnRg3Jb8LTMnJnAl3OnJnGYrQlJnJlQY3LTDlCn3LTJjLg3LTLgvFXLTMg3GTLV8HUOgLXFZLg3LXNXrMnLX8QXFnLX9AlMYLYLXPXrLZAbJU8LZDUJU8LZMXrSnLZ$AgFnLaPXrDULbFYrMnLbMn8LXLboJgJgLeFbLg3LgLZrSnLgOYAgoLhrRnJlLkCTrSnLkOnLhrLnFX%AYLnFZoJXLnHTvJbLnLloAbMTATLf8MTHgJn3MTMXrAXMT3MTFnMUITvFnMXFX%AYMXMXvFbMXrFTDbMYAcMX3MbLf8SnMb8JbFnMgMXrMTMgvAXFnMgvGgCmMnAloSnMnFnJTrOXvMXSnOX8HTMnObJT8ScObLZFl3ObMXCZoPTLgrQXPUFnoQXPU3RXJlPX3RkQXPbrJXQlPlrJbFnQUAhrDbQXGnCXvQYLnHlvQbLfLnvRTOgvJbRXJYrQlRYLnrQlRbLnrQlRlFT8JlRlFnrQXSTClCn3STHTrAnSTLZQlrSTMnGTrSToHgGbSTrGTDnSTvGXCnST3HgFbSU3HXAXSbAnJn3SbFT8LnScLfLnv",
    "AT3JgJX8AT8FZoSnAT8JgFV8AT8LhrDbAZ8JT8DbAb8GgLhrAb8SkLnvAe8MT8SnAlMYJXLVAl3GYDTvAl3LfLnvBUDTvLl3CTOn3HTrCT3DUGgrCU8MT8AbCbFTrJUoCgrDb8MTDTLV8JX8DTLnLXQlDT8LZrSnDUQb8FZ8DUST4JnvDb8ScOUoDj6GbJl4GTLfCYMlGToAXvFnGboAXvLnGgAcrJn3GgvFnSToGnLf8JnvGn#HTDToHTLnFXJlHTvATFToHTvHTDToHTvMTAgoHT3STClvHT4AlFl6HT8HTDToHUoDgJTrHUoScMX3HbRZrMXoHboJg8LTHgDb8JTrHgMToLf8HgvLnLnoHnHn3HT4Hn6MgvAnJTJU8ScvJT3AaQT8JT8HTrAnJXrRg8AnJbAloMXoJbrATFToJbvMnoSnJgDb6GgvJgDb8MXoJgSX3JU8JguATFToJlPYLnQlJlQkDnLbJlQlFYJlJl8Lf8OTJnCTFnLbJnLTHXMnJnLXGXCnJnoFfRg3JnrMYRg3Jn3HgFl3KT8Dg8LnLTRlFnPTLTvPbLbvLVoSbrCZLXMY6HT3LXNU7DlrLXNXDTATLX8DX8LnLZDb8JU8LZMnoLhrLZSToJU8LZrLaLnrLZvJn3SnLZ8LhrSnLaJnoMT8LbFlrHTvLbrFTLnrLbvATLlvLb6OTFn3LcLnJZOlLeAT6Mn4LeJT3ObrLg6LXFlrLhrJg8LnLhvDlPX4LhvLfLnvLj6JTFT3LnFbrMXoLnQluCTvLnrQXCY6LnvLfLnvLnvMgLnvLnvSeLf8MTMbrJn3MT3JgST3MT8AnATrMT8LULnrMUMToCZrMUScvLf8MXoDT8SnMX6ATFToMX8AXMT8MX8FkMT8MX8HTrDUMX8ScoSnMYJT6CTvMgAcrMXoMg8SToAfMlvAXLg3MnFl3AnvOT3AnFl3OUoATHT8OU3RnLXrOXrOXrSnObPbvFn6Og8HgrSnOg8OX8DbPTvAgoJgPU3RYLnrPXrDnJZrPb8CTGgvPlrLTDlvPlvFUJnoQUvFXrQlQeMnoAl3QlrQlrSnRTFTrJUoSTDlLiLXSTFg6HT3STJgoMn4STrFTJTrSTrLZFl3ST4FnMXoSUrDlHUoScvHTvSnSfLkvMXo",
    "AUoAcrMXoAZ8HboAg8AbOg6ATFgAg8AloMXoAl3AT8JTrAl8MX8MXoCT3SToJU8Cl8Db8MXoDT8HgrATrDboOT8MXoGTOTrATMnGT8LhrAZ8GnvFnGnQXHToGgvAcrHTvAXvLl3HbrAZoMXoHgBlFXLg3HgMnFXrSnHgrSb8JUoHn6HT8LgvITvATrJUoJUoLZrRnvJU8HT8Jb8JXvFX8QT8JXvLToJTrJYrQnGnQXJgrJnoATrJnoJU8ScvJnvMnvMXoLTCTLgrJXLTJlRTvQlLbRnJlQYvLbrMb8LnvLbvFn3RnoLdCVSTGZrLeSTvGXCnLg3MnoLn3MToLlrETvMT8SToAl3MbrDU6GTvMb8LX4LhrPlrLXGXCnSToLf8Rg3STrDb8LTrSTvLTHXMnSb3RYLnMnSgOg6ATFg",
    "HUDlGnrQXrJTrHgLnrAcJYMb8DULc8LTvFgGnCk3Mg8JbAnLX4QYvFYHnMXrRUoJnGnvFnRlvFTJlQnoSTrBXHXrLYSUJgLfoMT8Se8DTrHbDb",
    "AbDl8SToJU8An3RbAb8ST8DUSTrGnrAgoLbFU6Db8LTrMg8AaHT8Jb8ObDl8SToJU8Pb3RlvFYoJl"
  ];
  var codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  function getHangul(code) {
    if (code >= 40) {
      code = code + 168 - 40;
    } else if (code >= 19) {
      code = code + 97 - 19;
    }
    return toUtf8String([225, (code >> 6) + 132, (code & 63) + 128]);
  }
  var wordlist6 = null;
  function loadWords6(lang) {
    if (wordlist6 != null) {
      return;
    }
    wordlist6 = [];
    data2.forEach((data4, length) => {
      length += 4;
      for (let i = 0; i < data4.length; i += length) {
        let word = "";
        for (let j = 0; j < length; j++) {
          word += getHangul(codes.indexOf(data4[i + j]));
        }
        wordlist6.push(word);
      }
    });
    wordlist6.sort();
    if (Wordlist.check(lang) !== "0xf9eddeace9c5d3da9c93cf7d3cd38f6a13ed3affb933259ae865714e8a3ae71a") {
      wordlist6 = null;
      throw new Error("BIP39 Wordlist for ko (Korean) FAILED");
    }
  }
  var LangKo = class extends Wordlist {
    constructor() {
      super("ko");
    }
    getWord(index) {
      loadWords6(this);
      return wordlist6[index];
    }
    getWordIndex(word) {
      loadWords6(this);
      return wordlist6.indexOf(word);
    }
  };
  var langKo = new LangKo();
  Wordlist.register(langKo);

  // node_modules/@ethersproject/wordlists/lib.esm/lang-it.js
  "use strict";
  var words5 = "AbacoAbbaglioAbbinatoAbeteAbissoAbolireAbrasivoAbrogatoAccadereAccennoAccusatoAcetoneAchilleAcidoAcquaAcreAcrilicoAcrobataAcutoAdagioAddebitoAddomeAdeguatoAderireAdipeAdottareAdulareAffabileAffettoAffissoAffrantoAforismaAfosoAfricanoAgaveAgenteAgevoleAggancioAgireAgitareAgonismoAgricoloAgrumetoAguzzoAlabardaAlatoAlbatroAlberatoAlboAlbumeAlceAlcolicoAlettoneAlfaAlgebraAlianteAlibiAlimentoAllagatoAllegroAllievoAllodolaAllusivoAlmenoAlogenoAlpacaAlpestreAltalenaAlternoAlticcioAltroveAlunnoAlveoloAlzareAmalgamaAmanitaAmarenaAmbitoAmbratoAmebaAmericaAmetistaAmicoAmmassoAmmendaAmmirareAmmonitoAmoreAmpioAmpliareAmuletoAnacardoAnagrafeAnalistaAnarchiaAnatraAncaAncellaAncoraAndareAndreaAnelloAngeloAngolareAngustoAnimaAnnegareAnnidatoAnnoAnnuncioAnonimoAnticipoAnziApaticoAperturaApodeApparireAppetitoAppoggioApprodoAppuntoAprileArabicaArachideAragostaAraldicaArancioAraturaArazzoArbitroArchivioArditoArenileArgentoArgineArgutoAriaArmoniaArneseArredatoArringaArrostoArsenicoArsoArteficeArzilloAsciuttoAscoltoAsepsiAsetticoAsfaltoAsinoAsolaAspiratoAsproAssaggioAsseAssolutoAssurdoAstaAstenutoAsticeAstrattoAtavicoAteismoAtomicoAtonoAttesaAttivareAttornoAttritoAttualeAusilioAustriaAutistaAutonomoAutunnoAvanzatoAvereAvvenireAvvisoAvvolgereAzioneAzotoAzzimoAzzurroBabeleBaccanoBacinoBacoBadessaBadilataBagnatoBaitaBalconeBaldoBalenaBallataBalzanoBambinoBandireBaraondaBarbaroBarcaBaritonoBarlumeBaroccoBasilicoBassoBatostaBattutoBauleBavaBavosaBeccoBeffaBelgioBelvaBendaBenevoleBenignoBenzinaBereBerlinaBetaBibitaBiciBidoneBifidoBigaBilanciaBimboBinocoloBiologoBipedeBipolareBirbanteBirraBiscottoBisestoBisnonnoBisonteBisturiBizzarroBlandoBlattaBollitoBonificoBordoBoscoBotanicoBottinoBozzoloBraccioBradipoBramaBrancaBravuraBretellaBrevettoBrezzaBrigliaBrillanteBrindareBroccoloBrodoBronzinaBrulloBrunoBubboneBucaBudinoBuffoneBuioBulboBuonoBurloneBurrascaBussolaBustaCadettoCaducoCalamaroCalcoloCalesseCalibroCalmoCaloriaCambusaCamerataCamiciaCamminoCamolaCampaleCanapaCandelaCaneCaninoCanottoCantinaCapaceCapelloCapitoloCapogiroCapperoCapraCapsulaCarapaceCarcassaCardoCarismaCarovanaCarrettoCartolinaCasaccioCascataCasermaCasoCassoneCastelloCasualeCatastaCatenaCatrameCautoCavilloCedibileCedrataCefaloCelebreCellulareCenaCenoneCentesimoCeramicaCercareCertoCerumeCervelloCesoiaCespoCetoChelaChiaroChiccaChiedereChimeraChinaChirurgoChitarraCiaoCiclismoCifrareCignoCilindroCiottoloCircaCirrosiCitricoCittadinoCiuffoCivettaCivileClassicoClinicaCloroCoccoCodardoCodiceCoerenteCognomeCollareColmatoColoreColposoColtivatoColzaComaCometaCommandoComodoComputerComuneConcisoCondurreConfermaCongelareConiugeConnessoConoscereConsumoContinuoConvegnoCopertoCopioneCoppiaCopricapoCorazzaCordataCoricatoCorniceCorollaCorpoCorredoCorsiaCorteseCosmicoCostanteCotturaCovatoCratereCravattaCreatoCredereCremosoCrescitaCretaCricetoCrinaleCrisiCriticoCroceCronacaCrostataCrucialeCruscaCucireCuculoCuginoCullatoCupolaCuratoreCursoreCurvoCuscinoCustodeDadoDainoDalmataDamerinoDanielaDannosoDanzareDatatoDavantiDavveroDebuttoDecennioDecisoDeclinoDecolloDecretoDedicatoDefinitoDeformeDegnoDelegareDelfinoDelirioDeltaDemenzaDenotatoDentroDepositoDerapataDerivareDerogaDescrittoDesertoDesiderioDesumereDetersivoDevotoDiametroDicembreDiedroDifesoDiffusoDigerireDigitaleDiluvioDinamicoDinnanziDipintoDiplomaDipoloDiradareDireDirottoDirupoDisagioDiscretoDisfareDisgeloDispostoDistanzaDisumanoDitoDivanoDiveltoDividereDivoratoDobloneDocenteDoganaleDogmaDolceDomatoDomenicaDominareDondoloDonoDormireDoteDottoreDovutoDozzinaDragoDruidoDubbioDubitareDucaleDunaDuomoDupliceDuraturoEbanoEccessoEccoEclissiEconomiaEderaEdicolaEdileEditoriaEducareEgemoniaEgliEgoismoEgregioElaboratoElargireEleganteElencatoElettoElevareElficoElicaElmoElsaElusoEmanatoEmblemaEmessoEmiroEmotivoEmozioneEmpiricoEmuloEndemicoEnduroEnergiaEnfasiEnotecaEntrareEnzimaEpatiteEpilogoEpisodioEpocaleEppureEquatoreErarioErbaErbosoEredeEremitaErigereErmeticoEroeErosivoErranteEsagonoEsameEsanimeEsaudireEscaEsempioEsercitoEsibitoEsigenteEsistereEsitoEsofagoEsortatoEsosoEspansoEspressoEssenzaEssoEstesoEstimareEstoniaEstrosoEsultareEtilicoEtnicoEtruscoEttoEuclideoEuropaEvasoEvidenzaEvitatoEvolutoEvvivaFabbricaFaccendaFachiroFalcoFamigliaFanaleFanfaraFangoFantasmaFareFarfallaFarinosoFarmacoFasciaFastosoFasulloFaticareFatoFavolosoFebbreFecolaFedeFegatoFelpaFeltroFemminaFendereFenomenoFermentoFerroFertileFessuraFestivoFettaFeudoFiabaFiduciaFifaFiguratoFiloFinanzaFinestraFinireFioreFiscaleFisicoFiumeFlaconeFlamencoFleboFlemmaFloridoFluenteFluoroFobicoFocacciaFocosoFoderatoFoglioFolataFolcloreFolgoreFondenteFoneticoFoniaFontanaForbitoForchettaForestaFormicaFornaioForoFortezzaForzareFosfatoFossoFracassoFranaFrassinoFratelloFreccettaFrenataFrescoFrigoFrollinoFrondeFrugaleFruttaFucilataFucsiaFuggenteFulmineFulvoFumanteFumettoFumosoFuneFunzioneFuocoFurboFurgoneFuroreFusoFutileGabbianoGaffeGalateoGallinaGaloppoGamberoGammaGaranziaGarboGarofanoGarzoneGasdottoGasolioGastricoGattoGaudioGazeboGazzellaGecoGelatinaGelsoGemelloGemmatoGeneGenitoreGennaioGenotipoGergoGhepardoGhiaccioGhisaGialloGildaGineproGiocareGioielloGiornoGioveGiratoGironeGittataGiudizioGiuratoGiustoGlobuloGlutineGnomoGobbaGolfGomitoGommoneGonfioGonnaGovernoGracileGradoGraficoGrammoGrandeGrattareGravosoGraziaGrecaGreggeGrifoneGrigioGrinzaGrottaGruppoGuadagnoGuaioGuantoGuardareGufoGuidareIbernatoIconaIdenticoIdillioIdoloIdraIdricoIdrogenoIgieneIgnaroIgnoratoIlareIllesoIllogicoIlludereImballoImbevutoImboccoImbutoImmaneImmersoImmolatoImpaccoImpetoImpiegoImportoImprontaInalareInarcareInattivoIncantoIncendioInchinoIncisivoInclusoIncontroIncrocioIncuboIndagineIndiaIndoleIneditoInfattiInfilareInflittoIngaggioIngegnoIngleseIngordoIngrossoInnescoInodoreInoltrareInondatoInsanoInsettoInsiemeInsonniaInsulinaIntasatoInteroIntonacoIntuitoInumidireInvalidoInveceInvitoIperboleIpnoticoIpotesiIppicaIrideIrlandaIronicoIrrigatoIrrorareIsolatoIsotopoIstericoIstitutoIstriceItaliaIterareLabbroLabirintoLaccaLaceratoLacrimaLacunaLaddoveLagoLampoLancettaLanternaLardosoLargaLaringeLastraLatenzaLatinoLattugaLavagnaLavoroLegaleLeggeroLemboLentezzaLenzaLeoneLepreLesivoLessatoLestoLetteraleLevaLevigatoLiberoLidoLievitoLillaLimaturaLimitareLimpidoLineareLinguaLiquidoLiraLiricaLiscaLiteLitigioLivreaLocandaLodeLogicaLombareLondraLongevoLoquaceLorenzoLotoLotteriaLuceLucidatoLumacaLuminosoLungoLupoLuppoloLusingaLussoLuttoMacabroMacchinaMaceroMacinatoMadamaMagicoMagliaMagneteMagroMaiolicaMalafedeMalgradoMalintesoMalsanoMaltoMalumoreManaManciaMandorlaMangiareManifestoMannaroManovraMansardaMantideManubrioMappaMaratonaMarcireMarettaMarmoMarsupioMascheraMassaiaMastinoMaterassoMatricolaMattoneMaturoMazurcaMeandroMeccanicoMecenateMedesimoMeditareMegaMelassaMelisMelodiaMeningeMenoMensolaMercurioMerendaMerloMeschinoMeseMessereMestoloMetalloMetodoMettereMiagolareMicaMicelioMicheleMicroboMidolloMieleMiglioreMilanoMiliteMimosaMineraleMiniMinoreMirinoMirtilloMiscelaMissivaMistoMisurareMitezzaMitigareMitraMittenteMnemonicoModelloModificaModuloMoganoMogioMoleMolossoMonasteroMoncoMondinaMonetarioMonileMonotonoMonsoneMontatoMonvisoMoraMordereMorsicatoMostroMotivatoMotosegaMottoMovenzaMovimentoMozzoMuccaMucosaMuffaMughettoMugnaioMulattoMulinelloMultiploMummiaMuntoMuovereMuraleMusaMuscoloMusicaMutevoleMutoNababboNaftaNanometroNarcisoNariceNarratoNascereNastrareNaturaleNauticaNaviglioNebulosaNecrosiNegativoNegozioNemmenoNeofitaNerettoNervoNessunoNettunoNeutraleNeveNevroticoNicchiaNinfaNitidoNobileNocivoNodoNomeNominaNordicoNormaleNorvegeseNostranoNotareNotiziaNotturnoNovellaNucleoNullaNumeroNuovoNutrireNuvolaNuzialeOasiObbedireObbligoObeliscoOblioOboloObsoletoOccasioneOcchioOccidenteOccorrereOccultareOcraOculatoOdiernoOdorareOffertaOffrireOffuscatoOggettoOggiOgnunoOlandeseOlfattoOliatoOlivaOlogrammaOltreOmaggioOmbelicoOmbraOmegaOmissioneOndosoOnereOniceOnnivoroOnorevoleOntaOperatoOpinioneOppostoOracoloOrafoOrdineOrecchinoOreficeOrfanoOrganicoOrigineOrizzonteOrmaOrmeggioOrnativoOrologioOrrendoOrribileOrtensiaOrticaOrzataOrzoOsareOscurareOsmosiOspedaleOspiteOssaOssidareOstacoloOsteOtiteOtreOttagonoOttimoOttobreOvaleOvestOvinoOviparoOvocitoOvunqueOvviareOzioPacchettoPacePacificoPadellaPadronePaesePagaPaginaPalazzinaPalesarePallidoPaloPaludePandoroPannelloPaoloPaonazzoPapricaParabolaParcellaParerePargoloPariParlatoParolaPartireParvenzaParzialePassivoPasticcaPataccaPatologiaPattumePavonePeccatoPedalarePedonalePeggioPelosoPenarePendicePenisolaPennutoPenombraPensarePentolaPepePepitaPerbenePercorsoPerdonatoPerforarePergamenaPeriodoPermessoPernoPerplessoPersuasoPertugioPervasoPesatorePesistaPesoPestiferoPetaloPettinePetulantePezzoPiacerePiantaPiattinoPiccinoPicozzaPiegaPietraPifferoPigiamaPigolioPigroPilaPiliferoPillolaPilotaPimpantePinetaPinnaPinoloPioggiaPiomboPiramidePireticoPiritePirolisiPitonePizzicoPlaceboPlanarePlasmaPlatanoPlenarioPochezzaPoderosoPodismoPoesiaPoggiarePolentaPoligonoPollicePolmonitePolpettaPolsoPoltronaPolverePomicePomodoroPontePopolosoPorfidoPorosoPorporaPorrePortataPosaPositivoPossessoPostulatoPotassioPoterePranzoPrassiPraticaPreclusoPredicaPrefissoPregiatoPrelievoPremerePrenotarePreparatoPresenzaPretestoPrevalsoPrimaPrincipePrivatoProblemaProcuraProdurreProfumoProgettoProlungaPromessaPronomePropostaProrogaProtesoProvaPrudentePrugnaPruritoPsichePubblicoPudicaPugilatoPugnoPulcePulitoPulsantePuntarePupazzoPupillaPuroQuadroQualcosaQuasiQuerelaQuotaRaccoltoRaddoppioRadicaleRadunatoRafficaRagazzoRagioneRagnoRamarroRamingoRamoRandagioRantolareRapatoRapinaRappresoRasaturaRaschiatoRasenteRassegnaRastrelloRataRavvedutoRealeRecepireRecintoReclutaReconditoRecuperoRedditoRedimereRegalatoRegistroRegolaRegressoRelazioneRemareRemotoRennaReplicaReprimereReputareResaResidenteResponsoRestauroReteRetinaRetoricaRettificaRevocatoRiassuntoRibadireRibelleRibrezzoRicaricaRiccoRicevereRiciclatoRicordoRicredutoRidicoloRidurreRifasareRiflessoRiformaRifugioRigareRigettatoRighelloRilassatoRilevatoRimanereRimbalzoRimedioRimorchioRinascitaRincaroRinforzoRinnovoRinomatoRinsavitoRintoccoRinunciaRinvenireRiparatoRipetutoRipienoRiportareRipresaRipulireRisataRischioRiservaRisibileRisoRispettoRistoroRisultatoRisvoltoRitardoRitegnoRitmicoRitrovoRiunioneRivaRiversoRivincitaRivoltoRizomaRobaRoboticoRobustoRocciaRocoRodaggioRodereRoditoreRogitoRollioRomanticoRompereRonzioRosolareRospoRotanteRotondoRotulaRovescioRubizzoRubricaRugaRullinoRumineRumorosoRuoloRupeRussareRusticoSabatoSabbiareSabotatoSagomaSalassoSaldaturaSalgemmaSalivareSalmoneSaloneSaltareSalutoSalvoSapereSapidoSaporitoSaracenoSarcasmoSartoSassosoSatelliteSatiraSatolloSaturnoSavanaSavioSaziatoSbadiglioSbalzoSbancatoSbarraSbattereSbavareSbendareSbirciareSbloccatoSbocciatoSbrinareSbruffoneSbuffareScabrosoScadenzaScalaScambiareScandaloScapolaScarsoScatenareScavatoSceltoScenicoScettroSchedaSchienaSciarpaScienzaScindereScippoSciroppoScivoloSclerareScodellaScolpitoScompartoSconfortoScoprireScortaScossoneScozzeseScribaScrollareScrutinioScuderiaScultoreScuolaScuroScusareSdebitareSdoganareSeccaturaSecondoSedanoSeggiolaSegnalatoSegregatoSeguitoSelciatoSelettivoSellaSelvaggioSemaforoSembrareSemeSeminatoSempreSensoSentireSepoltoSequenzaSerataSerbatoSerenoSerioSerpenteSerraglioServireSestinaSetolaSettimanaSfaceloSfaldareSfamatoSfarzosoSfaticatoSferaSfidaSfilatoSfingeSfocatoSfoderareSfogoSfoltireSforzatoSfrattoSfruttatoSfuggitoSfumareSfusoSgabelloSgarbatoSgonfiareSgorbioSgrassatoSguardoSibiloSiccomeSierraSiglaSignoreSilenzioSillabaSimboloSimpaticoSimulatoSinfoniaSingoloSinistroSinoSintesiSinusoideSiparioSismaSistoleSituatoSlittaSlogaturaSlovenoSmarritoSmemoratoSmentitoSmeraldoSmilzoSmontareSmottatoSmussatoSnellireSnervatoSnodoSobbalzoSobrioSoccorsoSocialeSodaleSoffittoSognoSoldatoSolenneSolidoSollazzoSoloSolubileSolventeSomaticoSommaSondaSonettoSonniferoSopireSoppesoSopraSorgereSorpassoSorrisoSorsoSorteggioSorvolatoSospiroSostaSottileSpadaSpallaSpargereSpatolaSpaventoSpazzolaSpecieSpedireSpegnereSpelaturaSperanzaSpessoreSpettraleSpezzatoSpiaSpigolosoSpillatoSpinosoSpiraleSplendidoSportivoSposoSprangaSprecareSpronatoSpruzzoSpuntinoSquilloSradicareSrotolatoStabileStaccoStaffaStagnareStampatoStantioStarnutoStaseraStatutoSteloSteppaSterzoStilettoStimaStirpeStivaleStizzosoStonatoStoricoStrappoStregatoStriduloStrozzareStruttoStuccareStufoStupendoSubentroSuccosoSudoreSuggeritoSugoSultanoSuonareSuperboSupportoSurgelatoSurrogatoSussurroSuturaSvagareSvedeseSveglioSvelareSvenutoSveziaSviluppoSvistaSvizzeraSvoltaSvuotareTabaccoTabulatoTacciareTaciturnoTaleTalismanoTamponeTanninoTaraTardivoTargatoTariffaTarpareTartarugaTastoTatticoTavernaTavolataTazzaTecaTecnicoTelefonoTemerarioTempoTemutoTendoneTeneroTensioneTentacoloTeoremaTermeTerrazzoTerzettoTesiTesseratoTestatoTetroTettoiaTifareTigellaTimbroTintoTipicoTipografoTiraggioTiroTitanioTitoloTitubanteTizioTizzoneToccareTollerareToltoTombolaTomoTonfoTonsillaTopazioTopologiaToppaTorbaTornareTorroneTortoraToscanoTossireTostaturaTotanoTraboccoTracheaTrafilaTragediaTralcioTramontoTransitoTrapanoTrarreTraslocoTrattatoTraveTrecciaTremolioTrespoloTributoTrichecoTrifoglioTrilloTrinceaTrioTristezzaTrituratoTrivellaTrombaTronoTroppoTrottolaTrovareTruccatoTubaturaTuffatoTulipanoTumultoTunisiaTurbareTurchinoTutaTutelaUbicatoUccelloUccisoreUdireUditivoUffaUfficioUgualeUlisseUltimatoUmanoUmileUmorismoUncinettoUngereUnghereseUnicornoUnificatoUnisonoUnitarioUnteUovoUpupaUraganoUrgenzaUrloUsanzaUsatoUscitoUsignoloUsuraioUtensileUtilizzoUtopiaVacanteVaccinatoVagabondoVagliatoValangaValgoValicoVallettaValorosoValutareValvolaVampataVangareVanitosoVanoVantaggioVanveraVaporeVaranoVarcatoVarianteVascaVedettaVedovaVedutoVegetaleVeicoloVelcroVelinaVellutoVeloceVenatoVendemmiaVentoVeraceVerbaleVergognaVerificaVeroVerrucaVerticaleVescicaVessilloVestaleVeteranoVetrinaVetustoViandanteVibranteVicendaVichingoVicinanzaVidimareVigiliaVignetoVigoreVileVillanoViminiVincitoreViolaViperaVirgolaVirologoVirulentoViscosoVisioneVispoVissutoVisuraVitaVitelloVittimaVivandaVividoViziareVoceVogaVolatileVolereVolpeVoragineVulcanoZampognaZannaZappatoZatteraZavorraZefiroZelanteZeloZenzeroZerbinoZibettoZincoZirconeZittoZollaZoticoZuccheroZufoloZuluZuppa";
  var wordlist7 = null;
  function loadWords7(lang) {
    if (wordlist7 != null) {
      return;
    }
    wordlist7 = words5.replace(/([A-Z])/g, " $1").toLowerCase().substring(1).split(" ");
    if (Wordlist.check(lang) !== "0x5c1362d88fd4cf614a96f3234941d29f7d37c08c5292fde03bf62c2db6ff7620") {
      wordlist7 = null;
      throw new Error("BIP39 Wordlist for it (Italian) FAILED");
    }
  }
  var LangIt = class extends Wordlist {
    constructor() {
      super("it");
    }
    getWord(index) {
      loadWords7(this);
      return wordlist7[index];
    }
    getWordIndex(word) {
      loadWords7(this);
      return wordlist7.indexOf(word);
    }
  };
  var langIt = new LangIt();
  Wordlist.register(langIt);

  // node_modules/@ethersproject/wordlists/lib.esm/lang-zh.js
  "use strict";
  var data3 = "}aE#4A=Yv&co#4N#6G=cJ&SM#66|/Z#4t&kn~46#4K~4q%b9=IR#7l,mB#7W_X2*dl}Uo~7s}Uf&Iw#9c&cw~6O&H6&wx&IG%v5=IQ~8a&Pv#47$PR&50%Ko&QM&3l#5f,D9#4L|/H&tQ;v0~6n]nN<di,AM=W5%QO&ka&ua,hM^tm=zV=JA=wR&+X]7P&NB#4J#5L|/b[dA}tJ<Do&6m&u2[U1&Kb.HM&mC=w0&MW<rY,Hq#6M}QG,13&wP}Jp]Ow%ue&Kg<HP<D9~4k~9T&I2_c6$9T#9/[C5~7O~4a=cs&O7=KK=An&l9$6U$8A&uD&QI|/Y&bg}Ux&F2#6b}E2&JN&kW&kp=U/&bb=Xl<Cj}k+~5J#6L&5z&9i}b4&Fo,ho(X0_g3~4O$Fz&QE<HN=Ww]6/%GF-Vw=tj&/D&PN#9g=YO}cL&Of&PI~5I&Ip=vU=IW#9G;0o-wU}ss&QR<BT&R9=tk$PY_dh&Pq-yh]7T,nj.Xu=EP&76=cI&Fs*Xg}z7$Gb&+I=DF,AF=cA}rL#7j=Dz&3y<Aa$52=PQ}b0(iY$Fa}oL&xV#6U=ec=WZ,xh%RY<dp#9N&Fl&44=WH*A7=sh&TB&8P=07;u+&PK}uh}J5#72)V/=xC,AB$k0&f6;1E|+5=1B,3v]6n&wR%b+&xx]7f=Ol}fl;+D^wG]7E;nB;uh^Ir&l5=JL,nS=cf=g5;u6|/Q$Gc=MH%Hg#5d%M6^86=U+$Gz,l/,ir^5y&Ba&/F-IY&FI&be%IZ#77&PW_Nu$kE(Yf&NX]7Z,Jy&FJ(Xo&Nz#/d=y7&MX<Ag}Z+;nE]Dt(iG#4D=13&Pj~4c%v8&Zo%OL&/X#4W<HR&ie~6J_1O(Y2=y5=Ad*cv_eB#6k&PX:BU#7A;uk&Ft&Fx_dD=U2;vB=U5=4F}+O&GN.HH:9s=b0%NV(jO&IH=JT}Z9=VZ<Af,Kx^4m&uJ%c6,6r;9m#+L}cf%Kh&F3~4H=vP}bu,Hz|++,1w]nv}k6;uu$jw*Kl*WX&uM[x7&Fr[m7$NO&QN]hu=JN}nR^8g#/h(ps|KC;vd}xz=V0}p6&FD$G1#7K<bG_4p~8g&cf;u4=tl}+k%5/}fz;uw<cA=u1}gU}VM=LJ=eX&+L&Pr#4U}p2:nC,2K]7H:jF&9x}uX#9O=MB<fz~8X~5m&4D&kN&u5%E/(h7(ZF&VG<de(qM|/e-Wt=3x(a+,/R]f/&ND$Ro&nU}0g=KA%kH&NK$Ke<dS}cB&IX~5g$TN]6m=Uv,Is&Py=Ef%Kz#+/%bi&+A<F4$OG&4C&FL#9V<Zk=2I_eE&6c]nw&kq$HG}y+&A8$P3}OH=XP]70%IS(AJ_gH%GZ&tY&AZ=vb~6y&/r=VI=Wv<Zi=fl=xf&eL}c8}OL=MJ=g8$F7=YT}9u=0+^xC}JH&nL^N0~4T]K2,Cy%OC#6s;vG(AC^xe^cG&MF}Br#9P;wD-7h$O/&xA}Fn^PC]6i]7G&8V$Qs;vl(TB~73~4l<mW&6V=2y&uY&+3)aP}XF;LP&kx$wU=t7;uy<FN&lz)7E=Oo*Y+;wI}9q}le;J6&Ri&4t&Qr#8B=cb&vG=J5|Ql(h5<Yy~4+}QD,Lx=wn%K/&RK=dO&Pw,Q9=co%4u;9u}g0@6a^4I%b0=zo|/c&tX=dQ=OS#+b=yz_AB&wB&Pm=W9$HP_gR=62=AO=ti=hI,oA&jr&dH=tm&b6$P2(x8=zi;nG~7F;05]0n[Ix&3m}rg=Xp=cd&uz]7t;97=cN;vV<jf&FF&F1=6Q&Ik*Kk&P4,2z=fQ]7D&3u,H0=d/}Uw<ZN<7R}Kv;0f$H7,MD]7n$F0#88~9Z%da=by;+T#/u=VF&fO&kr^kf<AB]sU,I5$Ng&Pz;0i&QD&vM=Yl:BM;nJ_xJ]U7&Kf&30,3f|Z9*dC)je_jA&Q4&Kp$NH(Yz#6S&Id%Ib=KX,AD=KV%dP}tW&Pk^+E_Ni=cq,3R}VZ(Si=b+}rv;0j}rZ]uA,/w(Sx&Jv$w9&4d&wE,NJ$Gy=J/]Ls#7k<ZQ<Y/&uj]Ov$PM;v3,2F&+u:up=On&3e,Jv;90=J+&Qm]6q}bK#+d~8Y(h2]hA;99&AS=I/}qB&dQ}yJ-VM}Vl&ui,iB&G3|Dc]7d=eQ%dX%JC_1L~4d^NP;vJ&/1)ZI#7N]9X[bQ&PL=0L(UZ,Lm&kc&IR}n7(iR<AQ<dg=33=vN}ft}au]7I,Ba=x9=dR~6R&Tq=Xi,3d$Nr&Bc}DI&ku&vf]Dn,/F&iD,Ll&Nw=0y&I7=Ls=/A&tU=Qe}Ua&uk&+F=g4=gh=Vj#+1&Qn}Uy*44#5F,Pc&Rz*Xn=oh=5W;0n_Nf(iE<Y7=vr=Zu]oz#5Z%mI=kN=Bv_Jp(T2;vt_Ml<FS&uI=L/&6P]64$M7}86<bo%QX(SI%IY&VK=Al&Ux;vv;ut*E/%uh<ZE|O3,M2(yc]yu=Wk&tp:Ex}hr,Cl&WE)+Z=8U}I2_4Q,hA_si=iw=OM=tM=yZ%Ia=U7;wT}b+;uo=Za}yS!5x}HD}fb#5O_dA;Nv%uB(yB;01(Sf}Fk;v7}Pt#8v<mZ#7L,/r&Pl~4w&f5=Ph$Fw_LF&8m,bL=yJ&BH}p/*Jn}tU~5Q;wB(h6]Df]8p^+B;E4&Wc=d+;Ea&bw$8C&FN,DM=Yf}mP~5w=fT#6V=mC=Fi=AV}jB&AN}lW}aH#/D)dZ;hl;vE}/7,CJ;31&w8,hj%u9_Js=jJ&4M~8k=TN&eC}nL&uc-wi&lX}dj=Mv=e2#6u=cr$uq$6G]8W}Jb:nm=Yg<b3(UA;vX&6n&xF=KT,jC,De&R8&oY=Zv&oB]7/=Z2&Oa}bf,hh(4h^tZ&72&Nx;D2&xL~5h~40)ZG)h+=OJ&RA]Bv$yB=Oq=df,AQ%Jn}OJ;11,3z&Tl&tj;v+^Hv,Dh(id=s+]7N&N3)9Q~8f,S4=uW=w4&uX,LX&3d]CJ&yp&8x<b2_do&lP=y/<cy_dG=Oi=7R(VH(lt_1T,Iq_AA;12^6T%k6#8K[B1{oO<AU[Bt;1b$9S&Ps<8T=St{bY,jB(Zp&63&Uv$9V,PM]6v&Af}zW[bW_oq}sm}nB&Kq&gC&ff_eq_2m&5F&TI}rf}Gf;Zr_z9;ER&jk}iz_sn<BN~+n&vo=Vi%97|ZR=Wc,WE&6t]6z%85(ly#84=KY)6m_5/=aX,N3}Tm&he&6K]tR_B2-I3;u/&hU&lH<AP=iB&IA=XL;/5&Nh=wv<BH#79=vS=zl<AA=0X_RG}Bw&9p$NW,AX&kP_Lp&/Z(Tc]Mu}hs#6I}5B&cI<bq&H9#6m=K9}vH(Y1(Y0#4B&w6,/9&gG<bE,/O=zb}I4_l8<B/;wL%Qo<HO[Mq=XX}0v&BP&F4(mG}0i}nm,EC=9u{I3,xG&/9=JY*DK&hR)BX=EI=cx=b/{6k}yX%A+&wa}Xb=la;wi^lL;0t}jo&Qb=xg=XB}iO<qo{bR=NV&8f=a0&Jy;0v=uK)HK;vN#6h&jB(h/%ud&NI%wY.X7=Pt}Cu-uL&Gs_hl%mH,tm]78=Lb^Q0#7Y=1u<Bt&+Q=Co_RH,w3;1e}ux<aU;ui}U3&Q5%bt]63&UQ|0l&uL}O7&3o,AV&dm|Nj(Xt*5+(Uu&Hh(p7(UF=VR=Bp^Jl&Hd[ix)9/=Iq]C8<67]66}mB%6f}bb}JI]8T$HA}db=YM&pa=2J}tS&Y0=PS&y4=cX$6E,hX,XP&nR;04,FQ&l0&Vm_Dv#5Y~8Z=Bi%MA]6x=JO:+p,Az&9q,Hj~6/}SD=K1:EJ}nA;Qo#/E]9R,Ie&6X%W3]61&v4=xX_MC=0q;06(Xq=fs}IG}Dv=0l}o7$iZ;9v&LH&DP-7a&OY,SZ,Kz,Cv&dh=fx|Nh,F/~7q=XF&w+;9n&Gw;0h}Z7<7O&JK(S7&LS<AD<ac=wo<Dt&zw%4B=4v#8P;9o~6p*vV=Tm,Or&I6=1q}nY=P0=gq&Bl&Uu,Ch%yb}UY=zh}dh}rl(T4_xk(YA#8R*xH,IN}Jn]7V}C4&Ty}j3]7p=cL=3h&wW%Qv<Z3=f0&RI&+S(ic_zq}oN&/Y=z1;Td=LW=0e=OI(Vc,+b^ju(UL;0r:Za%8v=Rp=zw&58&73&wK}qX]6y&8E)a2}WR=wP^ur&nQ<cH}Re=Aq&wk}Q0&+q=PP,Gc|/d^k5,Fw]8Y}Pg]p3=ju=ed}r5_yf&Cs]7z$/G<Cm&Jp&54_1G_gP_Ll}JZ;0u]k8_7k(Sg]65{9i=LN&Sx&WK,iW&fD&Lk{9a}Em-9c#8N&io=sy]8d&nT&IK(lx#7/$lW(Td<s8~49,3o<7Y=MW(T+_Jr&Wd,iL}Ct=xh&5V;v4&8n%Kx=iF&l2_0B{B+,If(J0,Lv;u8=Kx-vB=HC&vS=Z6&fU&vE^xK;3D=4h=MR#45:Jw;0d}iw=LU}I5=I0]gB*im,K9}GU,1k_4U&Tt=Vs(iX&lU(TF#7y,ZO}oA&m5#5P}PN}Uz=hM<B1&FB<aG,e6~7T<tP(UQ_ZT=wu&F8)aQ]iN,1r_Lo&/g:CD}84{J1_Ki&Na&3n$jz&FE=dc;uv;va}in}ll=fv(h1&3h}fp=Cy}BM(+E~8m}lo%v7=hC(T6$cj=BQ=Bw(DR,2j=Ks,NS|F+;00=fU=70}Mb(YU;+G&m7&hr=Sk%Co]t+(X5_Jw}0r}gC(AS-IP&QK<Z2#8Q$WC]WX}T2&pG_Ka,HC=R4&/N;Z+;ch(C7,D4$3p_Mk&B2$8D=n9%Ky#5z(CT&QJ#7B]DC]gW}nf~5M;Iw#80}Tc_1F#4Z-aC}Hl=ph=fz,/3=aW}JM}nn;DG;vm}wn,4P}T3;wx&RG$u+}zK=0b;+J_Ek{re<aZ=AS}yY#5D]7q,Cp}xN=VP*2C}GZ}aG~+m_Cs=OY#6r]6g<GS}LC(UB=3A=Bo}Jy<c4}Is;1P<AG}Op<Z1}ld}nS=1Z,yM&95&98=CJ(4t:2L$Hk=Zo}Vc;+I}np&N1}9y=iv}CO*7p=jL)px]tb^zh&GS&Vl%v/;vR=14=zJ&49|/f]hF}WG;03=8P}o/&Gg&rp;DB,Kv}Ji&Pb;aA^ll(4j%yt}+K$Ht#4y&hY]7Y<F1,eN}bG(Uh%6Z]t5%G7;+F_RE;it}tL=LS&Da=Xx(S+(4f=8G=yI}cJ}WP=37=jS}pX}hd)fp<A8=Jt~+o$HJ=M6}iX=g9}CS=dv=Cj(mP%Kd,xq|+9&LD(4/=Xm&QP=Lc}LX&fL;+K=Op(lu=Qs.qC:+e&L+=Jj#8w;SL]7S(b+#4I=c1&nG_Lf&uH;+R)ZV<bV%B/,TE&0H&Jq&Ah%OF&Ss(p2,Wv&I3=Wl}Vq;1L&lJ#9b_1H=8r=b8=JH(SZ=hD=J2#7U,/U#/X~6P,FU<eL=jx,mG=hG=CE&PU=Se(qX&LY=X6=y4&tk&QQ&tf=4g&xI}W+&mZ=Dc#7w}Lg;DA;wQ_Kb(cJ=hR%yX&Yb,hw{bX_4X;EP;1W_2M}Uc=b5(YF,CM&Tp^OJ{DD]6s=vF=Yo~8q}XH}Fu%P5(SJ=Qt;MO]s8<F3&B3&8T(Ul-BS*dw&dR<87}/8]62$PZ]Lx<Au}9Q]7c=ja=KR,Go,Us&v6(qk}pG&G2=ev^GM%w4&H4]7F&dv]J6}Ew:9w=sj-ZL}Ym$+h(Ut(Um~4n=Xs(U7%eE=Qc_JR<CA#6t<Fv|/I,IS,EG<F2(Xy$/n<Fa(h9}+9_2o&N4#7X<Zq|+f_Dp=dt&na,Ca=NJ)jY=8C=YG=s6&Q+<DO}D3=xB&R1(lw;Qn<bF(Cu|/B}HV=SS&n7,10&u0]Dm%A6^4Q=WR(TD=Xo<GH,Rj(l8)bP&n/=LM&CF,F5&ml=PJ;0k=LG=tq,Rh,D6@4i=1p&+9=YC%er_Mh;nI;0q=Fw]80=xq=FM$Gv;v6&nc;wK%H2&Kj;vs,AA=YP,66}bI(qR~5U=6q~4b$Ni=K5.X3$So&Iu(p+]8G=Cf=RY(TS_O3(iH&57=fE=Dg_Do#9z#7H;FK{qd_2k%JR}en&gh_z8;Rx}9p<cN_Ne,DO;LN_7o~/p=NF=5Y}gN<ce<C1,QE]Wv=3u<BC}GK]yq}DY&u/_hj=II(pz&rC,jV&+Z}ut=NQ;Cg-SR_ZS,+o=u/;Oy_RK_QF(Fx&xP}Wr&TA,Uh&g1=yr{ax[VF$Pg(YB;Ox=Vy;+W(Sp}XV%dd&33(l/]l4#4Y}OE=6c=bw(A7&9t%wd&N/&mo,JH&Qe)fm=Ao}fu=tH";
  var deltaData = "FAZDC6BALcLZCA+GBARCW8wNCcDDZ8LVFBOqqDUiou+M42TFAyERXFb7EjhP+vmBFpFrUpfDV2F7eB+eCltCHJFWLFCED+pWTojEIHFXc3aFn4F68zqjEuKidS1QBVPDEhE7NA4mhMF7oThD49ot3FgtzHFCK0acW1x8DH1EmLoIlrWFBLE+y5+NA3Cx65wJHTaEZVaK1mWAmPGxgYCdxwOjTDIt/faOEhTl1vqNsKtJCOhJWuio2g07KLZEQsFBUpNtwEByBgxFslFheFbiEPvi61msDvApxCzB6rBCzox7joYA5UdDc+Cb4FSgIabpXFAj3bjkmFAxCZE+mD/SFf/0ELecYCt3nLoxC6WEZf2tKDB4oZvrEmqFkKk7BwILA7gtYBpsTq//D4jD0F0wEB9pyQ1BD5Ba0oYHDI+sbDFhvrHXdDHfgFEIJLi5r8qercNFBgFLC4bo5ERJtamWBDFy73KCEb6M8VpmEt330ygCTK58EIIFkYgF84gtGA9Uyh3m68iVrFbWFbcbqiCYHZ9J1jeRPbL8yswhMiDbhEhdNoSwFbZrLT740ABEqgCkO8J1BLd1VhKKR4sD1yUo0z+FF59Mvg71CFbyEhbHSFBKEIKyoQNgQppq9T0KAqePu0ZFGrXOHdKJqkoTFhYvpDNyuuznrN84thJbsCoO6Cu6Xlvntvy0QYuAExQEYtTUBf3CoCqwgGFZ4u1HJFzDVwEy3cjcpV4QvsPaBC3rCGyCF23o4K3pp2gberGgFEJEHo4nHICtyKH2ZqyxhN05KBBJIQlKh/Oujv/DH32VrlqFdIFC7Fz9Ct4kaqFME0UETLprnN9kfy+kFmtQBB0+5CFu0N9Ij8l/VvJDh2oq3hT6EzjTHKFN7ZjZwoTsAZ4Exsko6Fpa6WC+sduz8jyrLpegTv2h1EBeYpLpm2czQW0KoCcS0bCVXCmuWJDBjN1nQNLdF58SFJ0h7i3pC3oEOKy/FjBklL70XvBEEIWp2yZ04xObzAWDDJG7f+DbqBEA7LyiR95j7MDVdDViz2RE5vWlBMv5e4+VfhP3aXNPhvLSynb9O2x4uFBV+3jqu6d5pCG28/sETByvmu/+IJ0L3wb4rj9DNOLBF6XPIODr4L19U9RRofAG6Nxydi8Bki8BhGJbBAJKzbJxkZSlF9Q2Cu8oKqggB9hBArwLLqEBWEtFowy8XK8bEyw9snT+BeyFk1ZCSrdmgfEwFePTgCjELBEnIbjaDDPJm36rG9pztcEzT8dGk23SBhXBB1H4z+OWze0ooFzz8pDBYFvp9j9tvFByf9y4EFdVnz026CGR5qMr7fxMHN8UUdlyJAzlTBDRC28k+L4FB8078ljyD91tUj1ocnTs8vdEf7znbzm+GIjEZnoZE5rnLL700Xc7yHfz05nWxy03vBB9YGHYOWxgMQGBCR24CVYNE1hpfKxN0zKnfJDmmMgMmBWqNbjfSyFCBWSCGCgR8yFXiHyEj+VtD1FB3FpC1zI0kFbzifiKTLm9yq5zFmur+q8FHqjoOBWsBPiDbnCC2ErunV6cJ6TygXFYHYp7MKN9RUlSIS8/xBAGYLzeqUnBF4QbsTuUkUqGs6CaiDWKWjQK9EJkjpkTmNCPYXL";
  var wordlist8 = {
    zh_cn: null,
    zh_tw: null
  };
  var Checks = {
    zh_cn: "0x17bcc4d8547e5a7135e365d1ab443aaae95e76d8230c2782c67305d4f21497a1",
    zh_tw: "0x51e720e90c7b87bec1d70eb6e74a21a449bd3ec9c020b01d3a40ed991b60ce5d"
  };
  var codes2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var style = "~!@#$%^&*_-=[]{}|;:,.()<>?";
  function loadWords8(lang) {
    if (wordlist8[lang.locale] !== null) {
      return;
    }
    wordlist8[lang.locale] = [];
    let deltaOffset = 0;
    for (let i = 0; i < 2048; i++) {
      const s = style.indexOf(data3[i * 3]);
      const bytes = [
        228 + (s >> 2),
        128 + codes2.indexOf(data3[i * 3 + 1]),
        128 + codes2.indexOf(data3[i * 3 + 2])
      ];
      if (lang.locale === "zh_tw") {
        const common = s % 4;
        for (let i2 = common; i2 < 3; i2++) {
          bytes[i2] = codes2.indexOf(deltaData[deltaOffset++]) + (i2 == 0 ? 228 : 128);
        }
      }
      wordlist8[lang.locale].push(toUtf8String(bytes));
    }
    if (Wordlist.check(lang) !== Checks[lang.locale]) {
      wordlist8[lang.locale] = null;
      throw new Error("BIP39 Wordlist for " + lang.locale + " (Chinese) FAILED");
    }
  }
  var LangZh = class extends Wordlist {
    constructor(country) {
      super("zh_" + country);
    }
    getWord(index) {
      loadWords8(this);
      return wordlist8[this.locale][index];
    }
    getWordIndex(word) {
      loadWords8(this);
      return wordlist8[this.locale].indexOf(word);
    }
    split(mnemonic) {
      mnemonic = mnemonic.replace(/(?:\u3000| )+/g, "");
      return mnemonic.split("");
    }
  };
  var langZhCn = new LangZh("cn");
  Wordlist.register(langZhCn);
  Wordlist.register(langZhCn, "zh");
  var langZhTw = new LangZh("tw");
  Wordlist.register(langZhTw);

  // node_modules/@ethersproject/wordlists/lib.esm/wordlists.js
  var wordlists = {
    cz: langCz,
    en: langEn,
    es: langEs,
    fr: langFr,
    it: langIt,
    ja: langJa,
    ko: langKo,
    zh: langZhCn,
    zh_cn: langZhCn,
    zh_tw: langZhTw
  };

  // node_modules/@ethersproject/wordlists/lib.esm/index.js
  "use strict";

  // node_modules/@ethersproject/hdnode/lib.esm/_version.js
  var version17 = "hdnode/5.2.0";

  // node_modules/@ethersproject/hdnode/lib.esm/index.js
  "use strict";
  var logger22 = new Logger(version17);
  var N = BigNumber.from("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
  var MasterSecret = toUtf8Bytes("Bitcoin seed");
  var HardenedBit = 2147483648;
  function getUpperMask(bits) {
    return (1 << bits) - 1 << 8 - bits;
  }
  function getLowerMask(bits) {
    return (1 << bits) - 1;
  }
  function bytes32(value) {
    return hexZeroPad(hexlify(value), 32);
  }
  function base58check(data4) {
    return Base58.encode(concat([data4, hexDataSlice(sha256(sha256(data4)), 0, 4)]));
  }
  function getWordlist(wordlist9) {
    if (wordlist9 == null) {
      return wordlists["en"];
    }
    if (typeof wordlist9 === "string") {
      const words6 = wordlists[wordlist9];
      if (words6 == null) {
        logger22.throwArgumentError("unknown locale", "wordlist", wordlist9);
      }
      return words6;
    }
    return wordlist9;
  }
  var _constructorGuard4 = {};
  var defaultPath = "m/44'/60'/0'/0/0";
  var HDNode = class {
    constructor(constructorGuard, privateKey, publicKey, parentFingerprint, chainCode, index, depth, mnemonicOrPath) {
      logger22.checkNew(new.target, HDNode);
      if (constructorGuard !== _constructorGuard4) {
        throw new Error("HDNode constructor cannot be called directly");
      }
      if (privateKey) {
        const signingKey = new SigningKey(privateKey);
        defineReadOnly(this, "privateKey", signingKey.privateKey);
        defineReadOnly(this, "publicKey", signingKey.compressedPublicKey);
      } else {
        defineReadOnly(this, "privateKey", null);
        defineReadOnly(this, "publicKey", hexlify(publicKey));
      }
      defineReadOnly(this, "parentFingerprint", parentFingerprint);
      defineReadOnly(this, "fingerprint", hexDataSlice(ripemd160(sha256(this.publicKey)), 0, 4));
      defineReadOnly(this, "address", computeAddress(this.publicKey));
      defineReadOnly(this, "chainCode", chainCode);
      defineReadOnly(this, "index", index);
      defineReadOnly(this, "depth", depth);
      if (mnemonicOrPath == null) {
        defineReadOnly(this, "mnemonic", null);
        defineReadOnly(this, "path", null);
      } else if (typeof mnemonicOrPath === "string") {
        defineReadOnly(this, "mnemonic", null);
        defineReadOnly(this, "path", mnemonicOrPath);
      } else {
        defineReadOnly(this, "mnemonic", mnemonicOrPath);
        defineReadOnly(this, "path", mnemonicOrPath.path);
      }
    }
    get extendedKey() {
      if (this.depth >= 256) {
        throw new Error("Depth too large!");
      }
      return base58check(concat([
        this.privateKey != null ? "0x0488ADE4" : "0x0488B21E",
        hexlify(this.depth),
        this.parentFingerprint,
        hexZeroPad(hexlify(this.index), 4),
        this.chainCode,
        this.privateKey != null ? concat(["0x00", this.privateKey]) : this.publicKey
      ]));
    }
    neuter() {
      return new HDNode(_constructorGuard4, null, this.publicKey, this.parentFingerprint, this.chainCode, this.index, this.depth, this.path);
    }
    _derive(index) {
      if (index > 4294967295) {
        throw new Error("invalid index - " + String(index));
      }
      let path = this.path;
      if (path) {
        path += "/" + (index & ~HardenedBit);
      }
      const data4 = new Uint8Array(37);
      if (index & HardenedBit) {
        if (!this.privateKey) {
          throw new Error("cannot derive child of neutered node");
        }
        data4.set(arrayify(this.privateKey), 1);
        if (path) {
          path += "'";
        }
      } else {
        data4.set(arrayify(this.publicKey));
      }
      for (let i = 24; i >= 0; i -= 8) {
        data4[33 + (i >> 3)] = index >> 24 - i & 255;
      }
      const I = arrayify(computeHmac(SupportedAlgorithm.sha512, this.chainCode, data4));
      const IL = I.slice(0, 32);
      const IR = I.slice(32);
      let ki = null;
      let Ki = null;
      if (this.privateKey) {
        ki = bytes32(BigNumber.from(IL).add(this.privateKey).mod(N));
      } else {
        const ek = new SigningKey(hexlify(IL));
        Ki = ek._addPoint(this.publicKey);
      }
      let mnemonicOrPath = path;
      const srcMnemonic = this.mnemonic;
      if (srcMnemonic) {
        mnemonicOrPath = Object.freeze({
          phrase: srcMnemonic.phrase,
          path,
          locale: srcMnemonic.locale || "en"
        });
      }
      return new HDNode(_constructorGuard4, ki, Ki, this.fingerprint, bytes32(IR), index, this.depth + 1, mnemonicOrPath);
    }
    derivePath(path) {
      const components = path.split("/");
      if (components.length === 0 || components[0] === "m" && this.depth !== 0) {
        throw new Error("invalid path - " + path);
      }
      if (components[0] === "m") {
        components.shift();
      }
      let result = this;
      for (let i = 0; i < components.length; i++) {
        const component = components[i];
        if (component.match(/^[0-9]+'$/)) {
          const index = parseInt(component.substring(0, component.length - 1));
          if (index >= HardenedBit) {
            throw new Error("invalid path index - " + component);
          }
          result = result._derive(HardenedBit + index);
        } else if (component.match(/^[0-9]+$/)) {
          const index = parseInt(component);
          if (index >= HardenedBit) {
            throw new Error("invalid path index - " + component);
          }
          result = result._derive(index);
        } else {
          throw new Error("invalid path component - " + component);
        }
      }
      return result;
    }
    static _fromSeed(seed, mnemonic) {
      const seedArray = arrayify(seed);
      if (seedArray.length < 16 || seedArray.length > 64) {
        throw new Error("invalid seed");
      }
      const I = arrayify(computeHmac(SupportedAlgorithm.sha512, MasterSecret, seedArray));
      return new HDNode(_constructorGuard4, bytes32(I.slice(0, 32)), null, "0x00000000", bytes32(I.slice(32)), 0, 0, mnemonic);
    }
    static fromMnemonic(mnemonic, password, wordlist9) {
      wordlist9 = getWordlist(wordlist9);
      mnemonic = entropyToMnemonic(mnemonicToEntropy(mnemonic, wordlist9), wordlist9);
      return HDNode._fromSeed(mnemonicToSeed(mnemonic, password), {
        phrase: mnemonic,
        path: "m",
        locale: wordlist9.locale
      });
    }
    static fromSeed(seed) {
      return HDNode._fromSeed(seed, null);
    }
    static fromExtendedKey(extendedKey) {
      const bytes = Base58.decode(extendedKey);
      if (bytes.length !== 82 || base58check(bytes.slice(0, 78)) !== extendedKey) {
        logger22.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
      }
      const depth = bytes[4];
      const parentFingerprint = hexlify(bytes.slice(5, 9));
      const index = parseInt(hexlify(bytes.slice(9, 13)).substring(2), 16);
      const chainCode = hexlify(bytes.slice(13, 45));
      const key2 = bytes.slice(45, 78);
      switch (hexlify(bytes.slice(0, 4))) {
        case "0x0488b21e":
        case "0x043587cf":
          return new HDNode(_constructorGuard4, null, hexlify(key2), parentFingerprint, chainCode, index, depth, null);
        case "0x0488ade4":
        case "0x04358394 ":
          if (key2[0] !== 0) {
            break;
          }
          return new HDNode(_constructorGuard4, hexlify(key2.slice(1)), null, parentFingerprint, chainCode, index, depth, null);
      }
      return logger22.throwArgumentError("invalid extended key", "extendedKey", "[REDACTED]");
    }
  };
  function mnemonicToSeed(mnemonic, password) {
    if (!password) {
      password = "";
    }
    const salt = toUtf8Bytes("mnemonic" + password, UnicodeNormalizationForm.NFKD);
    return pbkdf2(toUtf8Bytes(mnemonic, UnicodeNormalizationForm.NFKD), salt, 2048, 64, "sha512");
  }
  function mnemonicToEntropy(mnemonic, wordlist9) {
    wordlist9 = getWordlist(wordlist9);
    logger22.checkNormalize();
    const words6 = wordlist9.split(mnemonic);
    if (words6.length % 3 !== 0) {
      throw new Error("invalid mnemonic");
    }
    const entropy = arrayify(new Uint8Array(Math.ceil(11 * words6.length / 8)));
    let offset = 0;
    for (let i = 0; i < words6.length; i++) {
      let index = wordlist9.getWordIndex(words6[i].normalize("NFKD"));
      if (index === -1) {
        throw new Error("invalid mnemonic");
      }
      for (let bit = 0; bit < 11; bit++) {
        if (index & 1 << 10 - bit) {
          entropy[offset >> 3] |= 1 << 7 - offset % 8;
        }
        offset++;
      }
    }
    const entropyBits = 32 * words6.length / 3;
    const checksumBits = words6.length / 3;
    const checksumMask = getUpperMask(checksumBits);
    const checksum = arrayify(sha256(entropy.slice(0, entropyBits / 8)))[0] & checksumMask;
    if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
      throw new Error("invalid checksum");
    }
    return hexlify(entropy.slice(0, entropyBits / 8));
  }
  function entropyToMnemonic(entropy, wordlist9) {
    wordlist9 = getWordlist(wordlist9);
    entropy = arrayify(entropy);
    if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
      throw new Error("invalid entropy");
    }
    const indices = [0];
    let remainingBits = 11;
    for (let i = 0; i < entropy.length; i++) {
      if (remainingBits > 8) {
        indices[indices.length - 1] <<= 8;
        indices[indices.length - 1] |= entropy[i];
        remainingBits -= 8;
      } else {
        indices[indices.length - 1] <<= remainingBits;
        indices[indices.length - 1] |= entropy[i] >> 8 - remainingBits;
        indices.push(entropy[i] & getLowerMask(8 - remainingBits));
        remainingBits += 3;
      }
    }
    const checksumBits = entropy.length / 4;
    const checksum = arrayify(sha256(entropy))[0] & getUpperMask(checksumBits);
    indices[indices.length - 1] <<= checksumBits;
    indices[indices.length - 1] |= checksum >> 8 - checksumBits;
    return wordlist9.join(indices.map((index) => wordlist9.getWord(index)));
  }
  function isValidMnemonic(mnemonic, wordlist9) {
    try {
      mnemonicToEntropy(mnemonic, wordlist9);
      return true;
    } catch (error) {
    }
    return false;
  }
  function getAccountPath(index) {
    if (typeof index !== "number" || index < 0 || index >= HardenedBit || index % 1) {
      logger22.throwArgumentError("invalid account index", "index", index);
    }
    return `m/44'/60'/${index}'/0/0`;
  }

  // node_modules/@ethersproject/random/lib.esm/_version.js
  var version18 = "random/5.2.0";

  // node_modules/@ethersproject/random/lib.esm/random.js
  "use strict";
  var logger23 = new Logger(version18);
  var anyGlobal = null;
  try {
    anyGlobal = window;
    if (anyGlobal == null) {
      throw new Error("try next");
    }
  } catch (error) {
    try {
      anyGlobal = global;
      if (anyGlobal == null) {
        throw new Error("try next");
      }
    } catch (error2) {
      anyGlobal = {};
    }
  }
  var crypto = anyGlobal.crypto || anyGlobal.msCrypto;
  if (!crypto || !crypto.getRandomValues) {
    logger23.warn("WARNING: Missing strong random number source");
    crypto = {
      getRandomValues: function(buffer) {
        return logger23.throwError("no secure random source avaialble", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "crypto.getRandomValues"
        });
      }
    };
  }
  function randomBytes(length) {
    if (length <= 0 || length > 1024 || length % 1) {
      logger23.throwArgumentError("invalid length", "length", length);
    }
    const result = new Uint8Array(length);
    crypto.getRandomValues(result);
    return arrayify(result);
  }

  // node_modules/@ethersproject/random/lib.esm/shuffle.js
  "use strict";
  function shuffled(array) {
    array = array.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    return array;
  }

  // node_modules/@ethersproject/random/lib.esm/index.js
  "use strict";

  // node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js
  var import_aes_js = __toModule(require_aes_js());

  // node_modules/@ethersproject/json-wallets/lib.esm/_version.js
  var version19 = "json-wallets/5.2.0";

  // node_modules/@ethersproject/json-wallets/lib.esm/utils.js
  "use strict";
  function looseArrayify(hexString) {
    if (typeof hexString === "string" && hexString.substring(0, 2) !== "0x") {
      hexString = "0x" + hexString;
    }
    return arrayify(hexString);
  }
  function zpad(value, length) {
    value = String(value);
    while (value.length < length) {
      value = "0" + value;
    }
    return value;
  }
  function getPassword(password) {
    if (typeof password === "string") {
      return toUtf8Bytes(password, UnicodeNormalizationForm.NFKC);
    }
    return arrayify(password);
  }
  function searchPath(object, path) {
    let currentChild = object;
    const comps = path.toLowerCase().split("/");
    for (let i = 0; i < comps.length; i++) {
      let matchingChild = null;
      for (const key2 in currentChild) {
        if (key2.toLowerCase() === comps[i]) {
          matchingChild = currentChild[key2];
          break;
        }
      }
      if (matchingChild === null) {
        return null;
      }
      currentChild = matchingChild;
    }
    return currentChild;
  }
  function uuidV4(randomBytes2) {
    const bytes = arrayify(randomBytes2);
    bytes[6] = bytes[6] & 15 | 64;
    bytes[8] = bytes[8] & 63 | 128;
    const value = hexlify(bytes);
    return [
      value.substring(2, 10),
      value.substring(10, 14),
      value.substring(14, 18),
      value.substring(18, 22),
      value.substring(22, 34)
    ].join("-");
  }

  // node_modules/@ethersproject/json-wallets/lib.esm/crowdsale.js
  "use strict";
  var logger24 = new Logger(version19);
  var CrowdsaleAccount = class extends Description {
    isCrowdsaleAccount(value) {
      return !!(value && value._isCrowdsaleAccount);
    }
  };
  function decrypt(json, password) {
    const data4 = JSON.parse(json);
    password = getPassword(password);
    const ethaddr = getAddress(searchPath(data4, "ethaddr"));
    const encseed = looseArrayify(searchPath(data4, "encseed"));
    if (!encseed || encseed.length % 16 !== 0) {
      logger24.throwArgumentError("invalid encseed", "json", json);
    }
    const key2 = arrayify(pbkdf2(password, password, 2e3, 32, "sha256")).slice(0, 16);
    const iv = encseed.slice(0, 16);
    const encryptedSeed = encseed.slice(16);
    const aesCbc = new import_aes_js.default.ModeOfOperation.cbc(key2, iv);
    const seed = import_aes_js.default.padding.pkcs7.strip(arrayify(aesCbc.decrypt(encryptedSeed)));
    let seedHex = "";
    for (let i = 0; i < seed.length; i++) {
      seedHex += String.fromCharCode(seed[i]);
    }
    const seedHexBytes = toUtf8Bytes(seedHex);
    const privateKey = keccak256(seedHexBytes);
    return new CrowdsaleAccount({
      _isCrowdsaleAccount: true,
      address: ethaddr,
      privateKey
    });
  }

  // node_modules/@ethersproject/json-wallets/lib.esm/inspect.js
  "use strict";
  function isCrowdsaleWallet(json) {
    let data4 = null;
    try {
      data4 = JSON.parse(json);
    } catch (error) {
      return false;
    }
    return data4.encseed && data4.ethaddr;
  }
  function isKeystoreWallet(json) {
    let data4 = null;
    try {
      data4 = JSON.parse(json);
    } catch (error) {
      return false;
    }
    if (!data4.version || parseInt(data4.version) !== data4.version || parseInt(data4.version) !== 3) {
      return false;
    }
    return true;
  }
  function getJsonWalletAddress(json) {
    if (isCrowdsaleWallet(json)) {
      try {
        return getAddress(JSON.parse(json).ethaddr);
      } catch (error) {
        return null;
      }
    }
    if (isKeystoreWallet(json)) {
      try {
        return getAddress(JSON.parse(json).address);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // node_modules/@ethersproject/json-wallets/lib.esm/keystore.js
  var import_aes_js2 = __toModule(require_aes_js());
  var import_scrypt_js = __toModule(require_scrypt());
  "use strict";
  var __awaiter5 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger25 = new Logger(version19);
  function hasMnemonic(value) {
    return value != null && value.mnemonic && value.mnemonic.phrase;
  }
  var KeystoreAccount = class extends Description {
    isKeystoreAccount(value) {
      return !!(value && value._isKeystoreAccount);
    }
  };
  function _decrypt(data4, key2, ciphertext) {
    const cipher = searchPath(data4, "crypto/cipher");
    if (cipher === "aes-128-ctr") {
      const iv = looseArrayify(searchPath(data4, "crypto/cipherparams/iv"));
      const counter = new import_aes_js2.default.Counter(iv);
      const aesCtr = new import_aes_js2.default.ModeOfOperation.ctr(key2, counter);
      return arrayify(aesCtr.decrypt(ciphertext));
    }
    return null;
  }
  function _getAccount(data4, key2) {
    const ciphertext = looseArrayify(searchPath(data4, "crypto/ciphertext"));
    const computedMAC = hexlify(keccak256(concat([key2.slice(16, 32), ciphertext]))).substring(2);
    if (computedMAC !== searchPath(data4, "crypto/mac").toLowerCase()) {
      throw new Error("invalid password");
    }
    const privateKey = _decrypt(data4, key2.slice(0, 16), ciphertext);
    if (!privateKey) {
      logger25.throwError("unsupported cipher", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "decrypt"
      });
    }
    const mnemonicKey = key2.slice(32, 64);
    const address = computeAddress(privateKey);
    if (data4.address) {
      let check = data4.address.toLowerCase();
      if (check.substring(0, 2) !== "0x") {
        check = "0x" + check;
      }
      if (getAddress(check) !== address) {
        throw new Error("address mismatch");
      }
    }
    const account = {
      _isKeystoreAccount: true,
      address,
      privateKey: hexlify(privateKey)
    };
    if (searchPath(data4, "x-ethers/version") === "0.1") {
      const mnemonicCiphertext = looseArrayify(searchPath(data4, "x-ethers/mnemonicCiphertext"));
      const mnemonicIv = looseArrayify(searchPath(data4, "x-ethers/mnemonicCounter"));
      const mnemonicCounter = new import_aes_js2.default.Counter(mnemonicIv);
      const mnemonicAesCtr = new import_aes_js2.default.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
      const path = searchPath(data4, "x-ethers/path") || defaultPath;
      const locale = searchPath(data4, "x-ethers/locale") || "en";
      const entropy = arrayify(mnemonicAesCtr.decrypt(mnemonicCiphertext));
      try {
        const mnemonic = entropyToMnemonic(entropy, locale);
        const node = HDNode.fromMnemonic(mnemonic, null, locale).derivePath(path);
        if (node.privateKey != account.privateKey) {
          throw new Error("mnemonic mismatch");
        }
        account.mnemonic = node.mnemonic;
      } catch (error) {
        if (error.code !== Logger.errors.INVALID_ARGUMENT || error.argument !== "wordlist") {
          throw error;
        }
      }
    }
    return new KeystoreAccount(account);
  }
  function pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc) {
    return arrayify(pbkdf2(passwordBytes, salt, count, dkLen, prfFunc));
  }
  function pbkdf22(passwordBytes, salt, count, dkLen, prfFunc) {
    return Promise.resolve(pbkdf2Sync(passwordBytes, salt, count, dkLen, prfFunc));
  }
  function _computeKdfKey(data4, password, pbkdf2Func, scryptFunc, progressCallback) {
    const passwordBytes = getPassword(password);
    const kdf = searchPath(data4, "crypto/kdf");
    if (kdf && typeof kdf === "string") {
      const throwError = function(name2, value) {
        return logger25.throwArgumentError("invalid key-derivation function parameters", name2, value);
      };
      if (kdf.toLowerCase() === "scrypt") {
        const salt = looseArrayify(searchPath(data4, "crypto/kdfparams/salt"));
        const N2 = parseInt(searchPath(data4, "crypto/kdfparams/n"));
        const r = parseInt(searchPath(data4, "crypto/kdfparams/r"));
        const p = parseInt(searchPath(data4, "crypto/kdfparams/p"));
        if (!N2 || !r || !p) {
          throwError("kdf", kdf);
        }
        if ((N2 & N2 - 1) !== 0) {
          throwError("N", N2);
        }
        const dkLen = parseInt(searchPath(data4, "crypto/kdfparams/dklen"));
        if (dkLen !== 32) {
          throwError("dklen", dkLen);
        }
        return scryptFunc(passwordBytes, salt, N2, r, p, 64, progressCallback);
      } else if (kdf.toLowerCase() === "pbkdf2") {
        const salt = looseArrayify(searchPath(data4, "crypto/kdfparams/salt"));
        let prfFunc = null;
        const prf = searchPath(data4, "crypto/kdfparams/prf");
        if (prf === "hmac-sha256") {
          prfFunc = "sha256";
        } else if (prf === "hmac-sha512") {
          prfFunc = "sha512";
        } else {
          throwError("prf", prf);
        }
        const count = parseInt(searchPath(data4, "crypto/kdfparams/c"));
        const dkLen = parseInt(searchPath(data4, "crypto/kdfparams/dklen"));
        if (dkLen !== 32) {
          throwError("dklen", dkLen);
        }
        return pbkdf2Func(passwordBytes, salt, count, dkLen, prfFunc);
      }
    }
    return logger25.throwArgumentError("unsupported key-derivation function", "kdf", kdf);
  }
  function decryptSync(json, password) {
    const data4 = JSON.parse(json);
    const key2 = _computeKdfKey(data4, password, pbkdf2Sync, import_scrypt_js.default.syncScrypt);
    return _getAccount(data4, key2);
  }
  function decrypt2(json, password, progressCallback) {
    return __awaiter5(this, void 0, void 0, function* () {
      const data4 = JSON.parse(json);
      const key2 = yield _computeKdfKey(data4, password, pbkdf22, import_scrypt_js.default.scrypt, progressCallback);
      return _getAccount(data4, key2);
    });
  }
  function encrypt(account, password, options, progressCallback) {
    try {
      if (getAddress(account.address) !== computeAddress(account.privateKey)) {
        throw new Error("address/privateKey mismatch");
      }
      if (hasMnemonic(account)) {
        const mnemonic = account.mnemonic;
        const node = HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path || defaultPath);
        if (node.privateKey != account.privateKey) {
          throw new Error("mnemonic mismatch");
        }
      }
    } catch (e) {
      return Promise.reject(e);
    }
    if (typeof options === "function" && !progressCallback) {
      progressCallback = options;
      options = {};
    }
    if (!options) {
      options = {};
    }
    const privateKey = arrayify(account.privateKey);
    const passwordBytes = getPassword(password);
    let entropy = null;
    let path = null;
    let locale = null;
    if (hasMnemonic(account)) {
      const srcMnemonic = account.mnemonic;
      entropy = arrayify(mnemonicToEntropy(srcMnemonic.phrase, srcMnemonic.locale || "en"));
      path = srcMnemonic.path || defaultPath;
      locale = srcMnemonic.locale || "en";
    }
    let client = options.client;
    if (!client) {
      client = "ethers.js";
    }
    let salt = null;
    if (options.salt) {
      salt = arrayify(options.salt);
    } else {
      salt = randomBytes(32);
      ;
    }
    let iv = null;
    if (options.iv) {
      iv = arrayify(options.iv);
      if (iv.length !== 16) {
        throw new Error("invalid iv");
      }
    } else {
      iv = randomBytes(16);
    }
    let uuidRandom = null;
    if (options.uuid) {
      uuidRandom = arrayify(options.uuid);
      if (uuidRandom.length !== 16) {
        throw new Error("invalid uuid");
      }
    } else {
      uuidRandom = randomBytes(16);
    }
    let N2 = 1 << 17, r = 8, p = 1;
    if (options.scrypt) {
      if (options.scrypt.N) {
        N2 = options.scrypt.N;
      }
      if (options.scrypt.r) {
        r = options.scrypt.r;
      }
      if (options.scrypt.p) {
        p = options.scrypt.p;
      }
    }
    return import_scrypt_js.default.scrypt(passwordBytes, salt, N2, r, p, 64, progressCallback).then((key2) => {
      key2 = arrayify(key2);
      const derivedKey = key2.slice(0, 16);
      const macPrefix = key2.slice(16, 32);
      const mnemonicKey = key2.slice(32, 64);
      const counter = new import_aes_js2.default.Counter(iv);
      const aesCtr = new import_aes_js2.default.ModeOfOperation.ctr(derivedKey, counter);
      const ciphertext = arrayify(aesCtr.encrypt(privateKey));
      const mac = keccak256(concat([macPrefix, ciphertext]));
      const data4 = {
        address: account.address.substring(2).toLowerCase(),
        id: uuidV4(uuidRandom),
        version: 3,
        Crypto: {
          cipher: "aes-128-ctr",
          cipherparams: {
            iv: hexlify(iv).substring(2)
          },
          ciphertext: hexlify(ciphertext).substring(2),
          kdf: "scrypt",
          kdfparams: {
            salt: hexlify(salt).substring(2),
            n: N2,
            dklen: 32,
            p,
            r
          },
          mac: mac.substring(2)
        }
      };
      if (entropy) {
        const mnemonicIv = randomBytes(16);
        const mnemonicCounter = new import_aes_js2.default.Counter(mnemonicIv);
        const mnemonicAesCtr = new import_aes_js2.default.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
        const mnemonicCiphertext = arrayify(mnemonicAesCtr.encrypt(entropy));
        const now2 = new Date();
        const timestamp = now2.getUTCFullYear() + "-" + zpad(now2.getUTCMonth() + 1, 2) + "-" + zpad(now2.getUTCDate(), 2) + "T" + zpad(now2.getUTCHours(), 2) + "-" + zpad(now2.getUTCMinutes(), 2) + "-" + zpad(now2.getUTCSeconds(), 2) + ".0Z";
        data4["x-ethers"] = {
          client,
          gethFilename: "UTC--" + timestamp + "--" + data4.address,
          mnemonicCounter: hexlify(mnemonicIv).substring(2),
          mnemonicCiphertext: hexlify(mnemonicCiphertext).substring(2),
          path,
          locale,
          version: "0.1"
        };
      }
      return JSON.stringify(data4);
    });
  }

  // node_modules/@ethersproject/json-wallets/lib.esm/index.js
  "use strict";
  function decryptJsonWallet(json, password, progressCallback) {
    if (isCrowdsaleWallet(json)) {
      if (progressCallback) {
        progressCallback(0);
      }
      const account = decrypt(json, password);
      if (progressCallback) {
        progressCallback(1);
      }
      return Promise.resolve(account);
    }
    if (isKeystoreWallet(json)) {
      return decrypt2(json, password, progressCallback);
    }
    return Promise.reject(new Error("invalid JSON wallet"));
  }
  function decryptJsonWalletSync(json, password) {
    if (isCrowdsaleWallet(json)) {
      return decrypt(json, password);
    }
    if (isKeystoreWallet(json)) {
      return decryptSync(json, password);
    }
    throw new Error("invalid JSON wallet");
  }

  // node_modules/@ethersproject/wallet/lib.esm/_version.js
  var version20 = "wallet/5.2.0";

  // node_modules/@ethersproject/wallet/lib.esm/index.js
  "use strict";
  var __awaiter6 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger26 = new Logger(version20);
  function isAccount(value) {
    return value != null && isHexString(value.privateKey, 32) && value.address != null;
  }
  function hasMnemonic2(value) {
    const mnemonic = value.mnemonic;
    return mnemonic && mnemonic.phrase;
  }
  var Wallet = class extends Signer {
    constructor(privateKey, provider) {
      logger26.checkNew(new.target, Wallet);
      super();
      if (isAccount(privateKey)) {
        const signingKey = new SigningKey(privateKey.privateKey);
        defineReadOnly(this, "_signingKey", () => signingKey);
        defineReadOnly(this, "address", computeAddress(this.publicKey));
        if (this.address !== getAddress(privateKey.address)) {
          logger26.throwArgumentError("privateKey/address mismatch", "privateKey", "[REDACTED]");
        }
        if (hasMnemonic2(privateKey)) {
          const srcMnemonic = privateKey.mnemonic;
          defineReadOnly(this, "_mnemonic", () => ({
            phrase: srcMnemonic.phrase,
            path: srcMnemonic.path || defaultPath,
            locale: srcMnemonic.locale || "en"
          }));
          const mnemonic = this.mnemonic;
          const node = HDNode.fromMnemonic(mnemonic.phrase, null, mnemonic.locale).derivePath(mnemonic.path);
          if (computeAddress(node.privateKey) !== this.address) {
            logger26.throwArgumentError("mnemonic/address mismatch", "privateKey", "[REDACTED]");
          }
        } else {
          defineReadOnly(this, "_mnemonic", () => null);
        }
      } else {
        if (SigningKey.isSigningKey(privateKey)) {
          if (privateKey.curve !== "secp256k1") {
            logger26.throwArgumentError("unsupported curve; must be secp256k1", "privateKey", "[REDACTED]");
          }
          defineReadOnly(this, "_signingKey", () => privateKey);
        } else {
          if (typeof privateKey === "string") {
            if (privateKey.match(/^[0-9a-f]*$/i) && privateKey.length === 64) {
              privateKey = "0x" + privateKey;
            }
          }
          const signingKey = new SigningKey(privateKey);
          defineReadOnly(this, "_signingKey", () => signingKey);
        }
        defineReadOnly(this, "_mnemonic", () => null);
        defineReadOnly(this, "address", computeAddress(this.publicKey));
      }
      if (provider && !Provider.isProvider(provider)) {
        logger26.throwArgumentError("invalid provider", "provider", provider);
      }
      defineReadOnly(this, "provider", provider || null);
    }
    get mnemonic() {
      return this._mnemonic();
    }
    get privateKey() {
      return this._signingKey().privateKey;
    }
    get publicKey() {
      return this._signingKey().publicKey;
    }
    getAddress() {
      return Promise.resolve(this.address);
    }
    connect(provider) {
      return new Wallet(this, provider);
    }
    signTransaction(transaction) {
      return resolveProperties(transaction).then((tx) => {
        if (tx.from != null) {
          if (getAddress(tx.from) !== this.address) {
            logger26.throwArgumentError("transaction from address mismatch", "transaction.from", transaction.from);
          }
          delete tx.from;
        }
        const signature2 = this._signingKey().signDigest(keccak256(serialize(tx)));
        return serialize(tx, signature2);
      });
    }
    signMessage(message) {
      return __awaiter6(this, void 0, void 0, function* () {
        return joinSignature(this._signingKey().signDigest(hashMessage(message)));
      });
    }
    _signTypedData(domain, types, value) {
      return __awaiter6(this, void 0, void 0, function* () {
        const populated = yield TypedDataEncoder.resolveNames(domain, types, value, (name2) => {
          if (this.provider == null) {
            logger26.throwError("cannot resolve ENS names without a provider", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "resolveName",
              value: name2
            });
          }
          return this.provider.resolveName(name2);
        });
        return joinSignature(this._signingKey().signDigest(TypedDataEncoder.hash(populated.domain, types, populated.value)));
      });
    }
    encrypt(password, options, progressCallback) {
      if (typeof options === "function" && !progressCallback) {
        progressCallback = options;
        options = {};
      }
      if (progressCallback && typeof progressCallback !== "function") {
        throw new Error("invalid callback");
      }
      if (!options) {
        options = {};
      }
      return encrypt(this, password, options, progressCallback);
    }
    static createRandom(options) {
      let entropy = randomBytes(16);
      if (!options) {
        options = {};
      }
      if (options.extraEntropy) {
        entropy = arrayify(hexDataSlice(keccak256(concat([entropy, options.extraEntropy])), 0, 16));
      }
      const mnemonic = entropyToMnemonic(entropy, options.locale);
      return Wallet.fromMnemonic(mnemonic, options.path, options.locale);
    }
    static fromEncryptedJson(json, password, progressCallback) {
      return decryptJsonWallet(json, password, progressCallback).then((account) => {
        return new Wallet(account);
      });
    }
    static fromEncryptedJsonSync(json, password) {
      return new Wallet(decryptJsonWalletSync(json, password));
    }
    static fromMnemonic(mnemonic, path, wordlist9) {
      if (!path) {
        path = defaultPath;
      }
      return new Wallet(HDNode.fromMnemonic(mnemonic, null, wordlist9).derivePath(path));
    }
  };
  function verifyMessage(message, signature2) {
    return recoverAddress(hashMessage(message), signature2);
  }
  function verifyTypedData(domain, types, value, signature2) {
    return recoverAddress(TypedDataEncoder.hash(domain, types, value), signature2);
  }

  // node_modules/@ethersproject/providers/lib.esm/index.js
  var lib_exports4 = {};
  __export(lib_exports4, {
    AlchemyProvider: () => AlchemyProvider,
    AlchemyWebSocketProvider: () => AlchemyWebSocketProvider,
    BaseProvider: () => BaseProvider,
    CloudflareProvider: () => CloudflareProvider,
    EtherscanProvider: () => EtherscanProvider,
    FallbackProvider: () => FallbackProvider,
    Formatter: () => Formatter,
    InfuraProvider: () => InfuraProvider,
    InfuraWebSocketProvider: () => InfuraWebSocketProvider,
    IpcProvider: () => IpcProvider,
    JsonRpcBatchProvider: () => JsonRpcBatchProvider,
    JsonRpcProvider: () => JsonRpcProvider,
    JsonRpcSigner: () => JsonRpcSigner,
    NodesmithProvider: () => NodesmithProvider,
    PocketProvider: () => PocketProvider,
    Provider: () => Provider,
    Resolver: () => Resolver,
    StaticJsonRpcProvider: () => StaticJsonRpcProvider,
    UrlJsonRpcProvider: () => UrlJsonRpcProvider,
    Web3Provider: () => Web3Provider,
    WebSocketProvider: () => WebSocketProvider,
    getDefaultProvider: () => getDefaultProvider,
    getNetwork: () => getNetwork,
    isCommunityResourcable: () => isCommunityResourcable,
    isCommunityResource: () => isCommunityResource,
    showThrottleMessage: () => showThrottleMessage
  });

  // node_modules/@ethersproject/networks/lib.esm/_version.js
  var version21 = "networks/5.2.0";

  // node_modules/@ethersproject/networks/lib.esm/index.js
  "use strict";
  var logger27 = new Logger(version21);
  function isRenetworkable(value) {
    return value && typeof value.renetwork === "function";
  }
  function ethDefaultProvider(network) {
    const func = function(providers, options) {
      if (options == null) {
        options = {};
      }
      const providerList = [];
      if (providers.InfuraProvider) {
        try {
          providerList.push(new providers.InfuraProvider(network, options.infura));
        } catch (error) {
        }
      }
      if (providers.EtherscanProvider) {
        try {
          providerList.push(new providers.EtherscanProvider(network, options.etherscan));
        } catch (error) {
        }
      }
      if (providers.AlchemyProvider) {
        try {
          providerList.push(new providers.AlchemyProvider(network, options.alchemy));
        } catch (error) {
        }
      }
      if (providers.CloudflareProvider) {
        try {
          providerList.push(new providers.CloudflareProvider(network));
        } catch (error) {
        }
      }
      if (providerList.length === 0) {
        return null;
      }
      if (providers.FallbackProvider) {
        let quorum = 1;
        if (options.quorum != null) {
          quorum = options.quorum;
        } else if (network === "homestead") {
          quorum = 2;
        }
        return new providers.FallbackProvider(providerList, quorum);
      }
      return providerList[0];
    };
    func.renetwork = function(network2) {
      return ethDefaultProvider(network2);
    };
    return func;
  }
  function etcDefaultProvider(url, network) {
    const func = function(providers, options) {
      if (providers.JsonRpcProvider) {
        return new providers.JsonRpcProvider(url, network);
      }
      return null;
    };
    func.renetwork = function(network2) {
      return etcDefaultProvider(url, network2);
    };
    return func;
  }
  var homestead = {
    chainId: 1,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "homestead",
    _defaultProvider: ethDefaultProvider("homestead")
  };
  var ropsten = {
    chainId: 3,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "ropsten",
    _defaultProvider: ethDefaultProvider("ropsten")
  };
  var classicMordor = {
    chainId: 63,
    name: "classicMordor",
    _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/mordor", "classicMordor")
  };
  var networks = {
    unspecified: { chainId: 0, name: "unspecified" },
    homestead,
    mainnet: homestead,
    morden: { chainId: 2, name: "morden" },
    ropsten,
    testnet: ropsten,
    rinkeby: {
      chainId: 4,
      ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      name: "rinkeby",
      _defaultProvider: ethDefaultProvider("rinkeby")
    },
    kovan: {
      chainId: 42,
      name: "kovan",
      _defaultProvider: ethDefaultProvider("kovan")
    },
    goerli: {
      chainId: 5,
      ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      name: "goerli",
      _defaultProvider: ethDefaultProvider("goerli")
    },
    classic: {
      chainId: 61,
      name: "classic",
      _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/etc", "classic")
    },
    classicMorden: { chainId: 62, name: "classicMorden" },
    classicMordor,
    classicTestnet: classicMordor,
    classicKotti: {
      chainId: 6,
      name: "classicKotti",
      _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/kotti", "classicKotti")
    },
    xdai: { chainId: 100, name: "xdai" },
    matic: { chainId: 137, name: "matic" },
    bnb: { chainId: 56, name: "bnb" },
    bnbt: { chainId: 97, name: "bnbt" }
  };
  function getNetwork(network) {
    if (network == null) {
      return null;
    }
    if (typeof network === "number") {
      for (const name2 in networks) {
        const standard2 = networks[name2];
        if (standard2.chainId === network) {
          return {
            name: standard2.name,
            chainId: standard2.chainId,
            ensAddress: standard2.ensAddress || null,
            _defaultProvider: standard2._defaultProvider || null
          };
        }
      }
      return {
        chainId: network,
        name: "unknown"
      };
    }
    if (typeof network === "string") {
      const standard2 = networks[network];
      if (standard2 == null) {
        return null;
      }
      return {
        name: standard2.name,
        chainId: standard2.chainId,
        ensAddress: standard2.ensAddress,
        _defaultProvider: standard2._defaultProvider || null
      };
    }
    const standard = networks[network.name];
    if (!standard) {
      if (typeof network.chainId !== "number") {
        logger27.throwArgumentError("invalid network chainId", "network", network);
      }
      return network;
    }
    if (network.chainId !== 0 && network.chainId !== standard.chainId) {
      logger27.throwArgumentError("network chainId mismatch", "network", network);
    }
    let defaultProvider = network._defaultProvider || null;
    if (defaultProvider == null && standard._defaultProvider) {
      if (isRenetworkable(standard._defaultProvider)) {
        defaultProvider = standard._defaultProvider.renetwork(network);
      } else {
        defaultProvider = standard._defaultProvider;
      }
    }
    return {
      name: network.name,
      chainId: standard.chainId,
      ensAddress: network.ensAddress || standard.ensAddress || null,
      _defaultProvider: defaultProvider
    };
  }

  // node_modules/@ethersproject/base64/lib.esm/index.js
  var lib_exports3 = {};
  __export(lib_exports3, {
    decode: () => decode2,
    encode: () => encode3
  });

  // node_modules/@ethersproject/base64/lib.esm/base64.js
  "use strict";
  function decode2(textData) {
    textData = atob(textData);
    const data4 = [];
    for (let i = 0; i < textData.length; i++) {
      data4.push(textData.charCodeAt(i));
    }
    return arrayify(data4);
  }
  function encode3(data4) {
    data4 = arrayify(data4);
    let textData = "";
    for (let i = 0; i < data4.length; i++) {
      textData += String.fromCharCode(data4[i]);
    }
    return btoa(textData);
  }

  // node_modules/@ethersproject/base64/lib.esm/index.js
  "use strict";

  // node_modules/@ethersproject/web/lib.esm/_version.js
  var version22 = "web/5.2.0";

  // node_modules/@ethersproject/web/lib.esm/geturl.js
  "use strict";
  var __awaiter7 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  function getUrl(href, options) {
    return __awaiter7(this, void 0, void 0, function* () {
      if (options == null) {
        options = {};
      }
      const request = {
        method: options.method || "GET",
        headers: options.headers || {},
        body: options.body || void 0,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrer: "client"
      };
      const response = yield fetch(href, request);
      const body = yield response.arrayBuffer();
      const headers = {};
      if (response.headers.forEach) {
        response.headers.forEach((value, key2) => {
          headers[key2.toLowerCase()] = value;
        });
      } else {
        response.headers.keys().forEach((key2) => {
          headers[key2.toLowerCase()] = response.headers.get(key2);
        });
      }
      return {
        headers,
        statusCode: response.status,
        statusMessage: response.statusText,
        body: arrayify(new Uint8Array(body))
      };
    });
  }

  // node_modules/@ethersproject/web/lib.esm/index.js
  "use strict";
  var __awaiter8 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger28 = new Logger(version22);
  function staller(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }
  function bodyify(value, type) {
    if (value == null) {
      return null;
    }
    if (typeof value === "string") {
      return value;
    }
    if (isBytesLike(value)) {
      if (type && (type.split("/")[0] === "text" || type.split(";")[0].trim() === "application/json")) {
        try {
          return toUtf8String(value);
        } catch (error) {
        }
        ;
      }
      return hexlify(value);
    }
    return value;
  }
  function _fetchData(connection, body, processFunc) {
    const attemptLimit = typeof connection === "object" && connection.throttleLimit != null ? connection.throttleLimit : 12;
    logger28.assertArgument(attemptLimit > 0 && attemptLimit % 1 === 0, "invalid connection throttle limit", "connection.throttleLimit", attemptLimit);
    const throttleCallback = typeof connection === "object" ? connection.throttleCallback : null;
    const throttleSlotInterval = typeof connection === "object" && typeof connection.throttleSlotInterval === "number" ? connection.throttleSlotInterval : 100;
    logger28.assertArgument(throttleSlotInterval > 0 && throttleSlotInterval % 1 === 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", throttleSlotInterval);
    const headers = {};
    let url = null;
    const options = {
      method: "GET"
    };
    let allow304 = false;
    let timeout = 2 * 60 * 1e3;
    if (typeof connection === "string") {
      url = connection;
    } else if (typeof connection === "object") {
      if (connection == null || connection.url == null) {
        logger28.throwArgumentError("missing URL", "connection.url", connection);
      }
      url = connection.url;
      if (typeof connection.timeout === "number" && connection.timeout > 0) {
        timeout = connection.timeout;
      }
      if (connection.headers) {
        for (const key2 in connection.headers) {
          headers[key2.toLowerCase()] = { key: key2, value: String(connection.headers[key2]) };
          if (["if-none-match", "if-modified-since"].indexOf(key2.toLowerCase()) >= 0) {
            allow304 = true;
          }
        }
      }
      options.allowGzip = !!connection.allowGzip;
      if (connection.user != null && connection.password != null) {
        if (url.substring(0, 6) !== "https:" && connection.allowInsecureAuthentication !== true) {
          logger28.throwError("basic authentication requires a secure https url", Logger.errors.INVALID_ARGUMENT, { argument: "url", url, user: connection.user, password: "[REDACTED]" });
        }
        const authorization = connection.user + ":" + connection.password;
        headers["authorization"] = {
          key: "Authorization",
          value: "Basic " + encode3(toUtf8Bytes(authorization))
        };
      }
    }
    if (body) {
      options.method = "POST";
      options.body = body;
      if (headers["content-type"] == null) {
        headers["content-type"] = { key: "Content-Type", value: "application/octet-stream" };
      }
      if (headers["content-length"] == null) {
        headers["content-length"] = { key: "Content-Length", value: String(body.length) };
      }
    }
    const flatHeaders = {};
    Object.keys(headers).forEach((key2) => {
      const header = headers[key2];
      flatHeaders[header.key] = header.value;
    });
    options.headers = flatHeaders;
    const runningTimeout = function() {
      let timer2 = null;
      const promise = new Promise(function(resolve, reject) {
        if (timeout) {
          timer2 = setTimeout(() => {
            if (timer2 == null) {
              return;
            }
            timer2 = null;
            reject(logger28.makeError("timeout", Logger.errors.TIMEOUT, {
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              timeout,
              url
            }));
          }, timeout);
        }
      });
      const cancel = function() {
        if (timer2 == null) {
          return;
        }
        clearTimeout(timer2);
        timer2 = null;
      };
      return { promise, cancel };
    }();
    const runningFetch = function() {
      return __awaiter8(this, void 0, void 0, function* () {
        for (let attempt = 0; attempt < attemptLimit; attempt++) {
          let response = null;
          try {
            response = yield getUrl(url, options);
            if (response.statusCode === 429 && attempt < attemptLimit) {
              let tryAgain = true;
              if (throttleCallback) {
                tryAgain = yield throttleCallback(attempt, url);
              }
              if (tryAgain) {
                let stall3 = 0;
                const retryAfter = response.headers["retry-after"];
                if (typeof retryAfter === "string" && retryAfter.match(/^[1-9][0-9]*$/)) {
                  stall3 = parseInt(retryAfter) * 1e3;
                } else {
                  stall3 = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                }
                yield staller(stall3);
                continue;
              }
            }
          } catch (error) {
            response = error.response;
            if (response == null) {
              runningTimeout.cancel();
              logger28.throwError("missing response", Logger.errors.SERVER_ERROR, {
                requestBody: bodyify(options.body, flatHeaders["content-type"]),
                requestMethod: options.method,
                serverError: error,
                url
              });
            }
          }
          let body2 = response.body;
          if (allow304 && response.statusCode === 304) {
            body2 = null;
          } else if (response.statusCode < 200 || response.statusCode >= 300) {
            runningTimeout.cancel();
            logger28.throwError("bad response", Logger.errors.SERVER_ERROR, {
              status: response.statusCode,
              headers: response.headers,
              body: bodyify(body2, response.headers ? response.headers["content-type"] : null),
              requestBody: bodyify(options.body, flatHeaders["content-type"]),
              requestMethod: options.method,
              url
            });
          }
          if (processFunc) {
            try {
              const result = yield processFunc(body2, response);
              runningTimeout.cancel();
              return result;
            } catch (error) {
              if (error.throttleRetry && attempt < attemptLimit) {
                let tryAgain = true;
                if (throttleCallback) {
                  tryAgain = yield throttleCallback(attempt, url);
                }
                if (tryAgain) {
                  const timeout2 = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                  yield staller(timeout2);
                  continue;
                }
              }
              runningTimeout.cancel();
              logger28.throwError("processing response error", Logger.errors.SERVER_ERROR, {
                body: bodyify(body2, response.headers ? response.headers["content-type"] : null),
                error,
                requestBody: bodyify(options.body, flatHeaders["content-type"]),
                requestMethod: options.method,
                url
              });
            }
          }
          runningTimeout.cancel();
          return body2;
        }
        return logger28.throwError("failed response", Logger.errors.SERVER_ERROR, {
          requestBody: bodyify(options.body, flatHeaders["content-type"]),
          requestMethod: options.method,
          url
        });
      });
    }();
    return Promise.race([runningTimeout.promise, runningFetch]);
  }
  function fetchJson(connection, json, processFunc) {
    let processJsonFunc = (value, response) => {
      let result = null;
      if (value != null) {
        try {
          result = JSON.parse(toUtf8String(value));
        } catch (error) {
          logger28.throwError("invalid JSON", Logger.errors.SERVER_ERROR, {
            body: value,
            error
          });
        }
      }
      if (processFunc) {
        result = processFunc(result, response);
      }
      return result;
    };
    let body = null;
    if (json != null) {
      body = toUtf8Bytes(json);
      const updated = typeof connection === "string" ? { url: connection } : shallowCopy(connection);
      if (updated.headers) {
        const hasContentType = Object.keys(updated.headers).filter((k) => k.toLowerCase() === "content-type").length !== 0;
        if (!hasContentType) {
          updated.headers = shallowCopy(updated.headers);
          updated.headers["content-type"] = "application/json";
        }
      } else {
        updated.headers = { "content-type": "application/json" };
      }
      connection = updated;
    }
    return _fetchData(connection, body, processJsonFunc);
  }
  function poll(func, options) {
    if (!options) {
      options = {};
    }
    options = shallowCopy(options);
    if (options.floor == null) {
      options.floor = 0;
    }
    if (options.ceiling == null) {
      options.ceiling = 1e4;
    }
    if (options.interval == null) {
      options.interval = 250;
    }
    return new Promise(function(resolve, reject) {
      let timer2 = null;
      let done = false;
      const cancel = () => {
        if (done) {
          return false;
        }
        done = true;
        if (timer2) {
          clearTimeout(timer2);
        }
        return true;
      };
      if (options.timeout) {
        timer2 = setTimeout(() => {
          if (cancel()) {
            reject(new Error("timeout"));
          }
        }, options.timeout);
      }
      const retryLimit = options.retryLimit;
      let attempt = 0;
      function check() {
        return func().then(function(result) {
          if (result !== void 0) {
            if (cancel()) {
              resolve(result);
            }
          } else if (options.oncePoll) {
            options.oncePoll.once("poll", check);
          } else if (options.onceBlock) {
            options.onceBlock.once("block", check);
          } else if (!done) {
            attempt++;
            if (attempt > retryLimit) {
              if (cancel()) {
                reject(new Error("retry limit reached"));
              }
              return;
            }
            let timeout = options.interval * parseInt(String(Math.random() * Math.pow(2, attempt)));
            if (timeout < options.floor) {
              timeout = options.floor;
            }
            if (timeout > options.ceiling) {
              timeout = options.ceiling;
            }
            setTimeout(check, timeout);
          }
          return null;
        }, function(error) {
          if (cancel()) {
            reject(error);
          }
        });
      }
      check();
    });
  }

  // node_modules/@ethersproject/providers/lib.esm/base-provider.js
  var import_bech32 = __toModule(require_bech32());

  // node_modules/@ethersproject/providers/lib.esm/_version.js
  var version23 = "providers/5.2.0";

  // node_modules/@ethersproject/providers/lib.esm/formatter.js
  "use strict";
  var logger29 = new Logger(version23);
  var Formatter = class {
    constructor() {
      logger29.checkNew(new.target, Formatter);
      this.formats = this.getDefaultFormats();
    }
    getDefaultFormats() {
      const formats = {};
      const address = this.address.bind(this);
      const bigNumber = this.bigNumber.bind(this);
      const blockTag = this.blockTag.bind(this);
      const data4 = this.data.bind(this);
      const hash3 = this.hash.bind(this);
      const hex2 = this.hex.bind(this);
      const number = this.number.bind(this);
      const strictData = (v) => {
        return this.data(v, true);
      };
      formats.transaction = {
        hash: hash3,
        type: Formatter.allowNull(number, null),
        accessList: Formatter.allowNull(this.accessList.bind(this), null),
        blockHash: Formatter.allowNull(hash3, null),
        blockNumber: Formatter.allowNull(number, null),
        transactionIndex: Formatter.allowNull(number, null),
        confirmations: Formatter.allowNull(number, null),
        from: address,
        gasPrice: bigNumber,
        gasLimit: bigNumber,
        to: Formatter.allowNull(address, null),
        value: bigNumber,
        nonce: number,
        data: data4,
        r: Formatter.allowNull(this.uint256),
        s: Formatter.allowNull(this.uint256),
        v: Formatter.allowNull(number),
        creates: Formatter.allowNull(address, null),
        raw: Formatter.allowNull(data4)
      };
      formats.transactionRequest = {
        from: Formatter.allowNull(address),
        nonce: Formatter.allowNull(number),
        gasLimit: Formatter.allowNull(bigNumber),
        gasPrice: Formatter.allowNull(bigNumber),
        to: Formatter.allowNull(address),
        value: Formatter.allowNull(bigNumber),
        data: Formatter.allowNull(strictData),
        type: Formatter.allowNull(number),
        accessList: Formatter.allowNull(this.accessList.bind(this), null)
      };
      formats.receiptLog = {
        transactionIndex: number,
        blockNumber: number,
        transactionHash: hash3,
        address,
        topics: Formatter.arrayOf(hash3),
        data: data4,
        logIndex: number,
        blockHash: hash3
      };
      formats.receipt = {
        to: Formatter.allowNull(this.address, null),
        from: Formatter.allowNull(this.address, null),
        contractAddress: Formatter.allowNull(address, null),
        transactionIndex: number,
        root: Formatter.allowNull(hex2),
        gasUsed: bigNumber,
        logsBloom: Formatter.allowNull(data4),
        blockHash: hash3,
        transactionHash: hash3,
        logs: Formatter.arrayOf(this.receiptLog.bind(this)),
        blockNumber: number,
        confirmations: Formatter.allowNull(number, null),
        cumulativeGasUsed: bigNumber,
        status: Formatter.allowNull(number)
      };
      formats.block = {
        hash: hash3,
        parentHash: hash3,
        number,
        timestamp: number,
        nonce: Formatter.allowNull(hex2),
        difficulty: this.difficulty.bind(this),
        gasLimit: bigNumber,
        gasUsed: bigNumber,
        miner: address,
        extraData: data4,
        transactions: Formatter.allowNull(Formatter.arrayOf(hash3))
      };
      formats.blockWithTransactions = shallowCopy(formats.block);
      formats.blockWithTransactions.transactions = Formatter.allowNull(Formatter.arrayOf(this.transactionResponse.bind(this)));
      formats.filter = {
        fromBlock: Formatter.allowNull(blockTag, void 0),
        toBlock: Formatter.allowNull(blockTag, void 0),
        blockHash: Formatter.allowNull(hash3, void 0),
        address: Formatter.allowNull(address, void 0),
        topics: Formatter.allowNull(this.topics.bind(this), void 0)
      };
      formats.filterLog = {
        blockNumber: Formatter.allowNull(number),
        blockHash: Formatter.allowNull(hash3),
        transactionIndex: number,
        removed: Formatter.allowNull(this.boolean.bind(this)),
        address,
        data: Formatter.allowFalsish(data4, "0x"),
        topics: Formatter.arrayOf(hash3),
        transactionHash: hash3,
        logIndex: number
      };
      return formats;
    }
    accessList(accessList) {
      return accessListify(accessList || []);
    }
    number(number) {
      if (number === "0x") {
        return 0;
      }
      return BigNumber.from(number).toNumber();
    }
    bigNumber(value) {
      return BigNumber.from(value);
    }
    boolean(value) {
      if (typeof value === "boolean") {
        return value;
      }
      if (typeof value === "string") {
        value = value.toLowerCase();
        if (value === "true") {
          return true;
        }
        if (value === "false") {
          return false;
        }
      }
      throw new Error("invalid boolean - " + value);
    }
    hex(value, strict) {
      if (typeof value === "string") {
        if (!strict && value.substring(0, 2) !== "0x") {
          value = "0x" + value;
        }
        if (isHexString(value)) {
          return value.toLowerCase();
        }
      }
      return logger29.throwArgumentError("invalid hash", "value", value);
    }
    data(value, strict) {
      const result = this.hex(value, strict);
      if (result.length % 2 !== 0) {
        throw new Error("invalid data; odd-length - " + value);
      }
      return result;
    }
    address(value) {
      return getAddress(value);
    }
    callAddress(value) {
      if (!isHexString(value, 32)) {
        return null;
      }
      const address = getAddress(hexDataSlice(value, 12));
      return address === AddressZero ? null : address;
    }
    contractAddress(value) {
      return getContractAddress(value);
    }
    blockTag(blockTag) {
      if (blockTag == null) {
        return "latest";
      }
      if (blockTag === "earliest") {
        return "0x0";
      }
      if (blockTag === "latest" || blockTag === "pending") {
        return blockTag;
      }
      if (typeof blockTag === "number" || isHexString(blockTag)) {
        return hexValue(blockTag);
      }
      throw new Error("invalid blockTag");
    }
    hash(value, strict) {
      const result = this.hex(value, strict);
      if (hexDataLength(result) !== 32) {
        return logger29.throwArgumentError("invalid hash", "value", value);
      }
      return result;
    }
    difficulty(value) {
      if (value == null) {
        return null;
      }
      const v = BigNumber.from(value);
      try {
        return v.toNumber();
      } catch (error) {
      }
      return null;
    }
    uint256(value) {
      if (!isHexString(value)) {
        throw new Error("invalid uint256");
      }
      return hexZeroPad(value, 32);
    }
    _block(value, format) {
      if (value.author != null && value.miner == null) {
        value.miner = value.author;
      }
      return Formatter.check(format, value);
    }
    block(value) {
      return this._block(value, this.formats.block);
    }
    blockWithTransactions(value) {
      return this._block(value, this.formats.blockWithTransactions);
    }
    transactionRequest(value) {
      return Formatter.check(this.formats.transactionRequest, value);
    }
    transactionResponse(transaction) {
      if (transaction.gas != null && transaction.gasLimit == null) {
        transaction.gasLimit = transaction.gas;
      }
      if (transaction.to && BigNumber.from(transaction.to).isZero()) {
        transaction.to = "0x0000000000000000000000000000000000000000";
      }
      if (transaction.input != null && transaction.data == null) {
        transaction.data = transaction.input;
      }
      if (transaction.to == null && transaction.creates == null) {
        transaction.creates = this.contractAddress(transaction);
      }
      if (transaction.type === 1 && transaction.accessList == null) {
        transaction.accessList = [];
      }
      const result = Formatter.check(this.formats.transaction, transaction);
      if (transaction.chainId != null) {
        let chainId = transaction.chainId;
        if (isHexString(chainId)) {
          chainId = BigNumber.from(chainId).toNumber();
        }
        result.chainId = chainId;
      } else {
        let chainId = transaction.networkId;
        if (chainId == null && result.v == null) {
          chainId = transaction.chainId;
        }
        if (isHexString(chainId)) {
          chainId = BigNumber.from(chainId).toNumber();
        }
        if (typeof chainId !== "number" && result.v != null) {
          chainId = (result.v - 35) / 2;
          if (chainId < 0) {
            chainId = 0;
          }
          chainId = parseInt(chainId);
        }
        if (typeof chainId !== "number") {
          chainId = 0;
        }
        result.chainId = chainId;
      }
      if (result.blockHash && result.blockHash.replace(/0/g, "") === "x") {
        result.blockHash = null;
      }
      return result;
    }
    transaction(value) {
      return parse(value);
    }
    receiptLog(value) {
      return Formatter.check(this.formats.receiptLog, value);
    }
    receipt(value) {
      const result = Formatter.check(this.formats.receipt, value);
      if (result.root != null) {
        if (result.root.length <= 4) {
          const value2 = BigNumber.from(result.root).toNumber();
          if (value2 === 0 || value2 === 1) {
            if (result.status != null && result.status !== value2) {
              logger29.throwArgumentError("alt-root-status/status mismatch", "value", { root: result.root, status: result.status });
            }
            result.status = value2;
            delete result.root;
          } else {
            logger29.throwArgumentError("invalid alt-root-status", "value.root", result.root);
          }
        } else if (result.root.length !== 66) {
          logger29.throwArgumentError("invalid root hash", "value.root", result.root);
        }
      }
      if (result.status != null) {
        result.byzantium = true;
      }
      return result;
    }
    topics(value) {
      if (Array.isArray(value)) {
        return value.map((v) => this.topics(v));
      } else if (value != null) {
        return this.hash(value, true);
      }
      return null;
    }
    filter(value) {
      return Formatter.check(this.formats.filter, value);
    }
    filterLog(value) {
      return Formatter.check(this.formats.filterLog, value);
    }
    static check(format, object) {
      const result = {};
      for (const key2 in format) {
        try {
          const value = format[key2](object[key2]);
          if (value !== void 0) {
            result[key2] = value;
          }
        } catch (error) {
          error.checkKey = key2;
          error.checkValue = object[key2];
          throw error;
        }
      }
      return result;
    }
    static allowNull(format, nullValue) {
      return function(value) {
        if (value == null) {
          return nullValue;
        }
        return format(value);
      };
    }
    static allowFalsish(format, replaceValue) {
      return function(value) {
        if (!value) {
          return replaceValue;
        }
        return format(value);
      };
    }
    static arrayOf(format) {
      return function(array) {
        if (!Array.isArray(array)) {
          throw new Error("not an array");
        }
        const result = [];
        array.forEach(function(value) {
          result.push(format(value));
        });
        return result;
      };
    }
  };
  function isCommunityResourcable(value) {
    return value && typeof value.isCommunityResource === "function";
  }
  function isCommunityResource(value) {
    return isCommunityResourcable(value) && value.isCommunityResource();
  }
  var throttleMessage = false;
  function showThrottleMessage() {
    if (throttleMessage) {
      return;
    }
    throttleMessage = true;
    console.log("========= NOTICE =========");
    console.log("Request-Rate Exceeded  (this message will not be repeated)");
    console.log("");
    console.log("The default API keys for each service are provided as a highly-throttled,");
    console.log("community resource for low-traffic projects and early prototyping.");
    console.log("");
    console.log("While your application will continue to function, we highly recommended");
    console.log("signing up for your own API keys to improve performance, increase your");
    console.log("request rate/limit and enable other perks, such as metrics and advanced APIs.");
    console.log("");
    console.log("For more details: https://docs.ethers.io/api-keys/");
    console.log("==========================");
  }

  // node_modules/@ethersproject/providers/lib.esm/base-provider.js
  "use strict";
  var __awaiter9 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger30 = new Logger(version23);
  function checkTopic(topic) {
    if (topic == null) {
      return "null";
    }
    if (hexDataLength(topic) !== 32) {
      logger30.throwArgumentError("invalid topic", "topic", topic);
    }
    return topic.toLowerCase();
  }
  function serializeTopics(topics) {
    topics = topics.slice();
    while (topics.length > 0 && topics[topics.length - 1] == null) {
      topics.pop();
    }
    return topics.map((topic) => {
      if (Array.isArray(topic)) {
        const unique = {};
        topic.forEach((topic2) => {
          unique[checkTopic(topic2)] = true;
        });
        const sorted = Object.keys(unique);
        sorted.sort();
        return sorted.join("|");
      } else {
        return checkTopic(topic);
      }
    }).join("&");
  }
  function deserializeTopics(data4) {
    if (data4 === "") {
      return [];
    }
    return data4.split(/&/g).map((topic) => {
      if (topic === "") {
        return [];
      }
      const comps = topic.split("|").map((topic2) => {
        return topic2 === "null" ? null : topic2;
      });
      return comps.length === 1 ? comps[0] : comps;
    });
  }
  function getEventTag2(eventName) {
    if (typeof eventName === "string") {
      eventName = eventName.toLowerCase();
      if (hexDataLength(eventName) === 32) {
        return "tx:" + eventName;
      }
      if (eventName.indexOf(":") === -1) {
        return eventName;
      }
    } else if (Array.isArray(eventName)) {
      return "filter:*:" + serializeTopics(eventName);
    } else if (ForkEvent.isForkEvent(eventName)) {
      logger30.warn("not implemented");
      throw new Error("not implemented");
    } else if (eventName && typeof eventName === "object") {
      return "filter:" + (eventName.address || "*") + ":" + serializeTopics(eventName.topics || []);
    }
    throw new Error("invalid event - " + eventName);
  }
  function getTime() {
    return new Date().getTime();
  }
  function stall(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }
  var PollableEvents = ["block", "network", "pending", "poll"];
  var Event = class {
    constructor(tag, listener, once) {
      defineReadOnly(this, "tag", tag);
      defineReadOnly(this, "listener", listener);
      defineReadOnly(this, "once", once);
    }
    get event() {
      switch (this.type) {
        case "tx":
          return this.hash;
        case "filter":
          return this.filter;
      }
      return this.tag;
    }
    get type() {
      return this.tag.split(":")[0];
    }
    get hash() {
      const comps = this.tag.split(":");
      if (comps[0] !== "tx") {
        return null;
      }
      return comps[1];
    }
    get filter() {
      const comps = this.tag.split(":");
      if (comps[0] !== "filter") {
        return null;
      }
      const address = comps[1];
      const topics = deserializeTopics(comps[2]);
      const filter = {};
      if (topics.length > 0) {
        filter.topics = topics;
      }
      if (address && address !== "*") {
        filter.address = address;
      }
      return filter;
    }
    pollable() {
      return this.tag.indexOf(":") >= 0 || PollableEvents.indexOf(this.tag) >= 0;
    }
  };
  var coinInfos = {
    "0": { symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc" },
    "2": { symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc" },
    "3": { symbol: "doge", p2pkh: 30, p2sh: 22 },
    "60": { symbol: "eth", ilk: "eth" },
    "61": { symbol: "etc", ilk: "eth" },
    "700": { symbol: "xdai", ilk: "eth" }
  };
  function bytes32ify(value) {
    return hexZeroPad(BigNumber.from(value).toHexString(), 32);
  }
  function base58Encode(data4) {
    return Base58.encode(concat([data4, hexDataSlice(sha256(sha256(data4)), 0, 4)]));
  }
  var Resolver = class {
    constructor(provider, address, name2) {
      defineReadOnly(this, "provider", provider);
      defineReadOnly(this, "name", name2);
      defineReadOnly(this, "address", provider.formatter.address(address));
    }
    _fetchBytes(selector, parameters) {
      return __awaiter9(this, void 0, void 0, function* () {
        const transaction = {
          to: this.address,
          data: hexConcat([selector, namehash(this.name), parameters || "0x"])
        };
        const result = yield this.provider.call(transaction);
        if (result === "0x") {
          return null;
        }
        const offset = BigNumber.from(hexDataSlice(result, 0, 32)).toNumber();
        const length = BigNumber.from(hexDataSlice(result, offset, offset + 32)).toNumber();
        return hexDataSlice(result, offset + 32, offset + 32 + length);
      });
    }
    _getAddress(coinType, hexBytes) {
      const coinInfo = coinInfos[String(coinType)];
      if (coinInfo == null) {
        logger30.throwError(`unsupported coin type: ${coinType}`, Logger.errors.UNSUPPORTED_OPERATION, {
          operation: `getAddress(${coinType})`
        });
      }
      if (coinInfo.ilk === "eth") {
        return this.provider.formatter.address(hexBytes);
      }
      const bytes = arrayify(hexBytes);
      if (coinInfo.p2pkh != null) {
        const p2pkh = hexBytes.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
        if (p2pkh) {
          const length = parseInt(p2pkh[1], 16);
          if (p2pkh[2].length === length * 2 && length >= 1 && length <= 75) {
            return base58Encode(concat([[coinInfo.p2pkh], "0x" + p2pkh[2]]));
          }
        }
      }
      if (coinInfo.p2sh != null) {
        const p2sh = hexBytes.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
        if (p2sh) {
          const length = parseInt(p2sh[1], 16);
          if (p2sh[2].length === length * 2 && length >= 1 && length <= 75) {
            return base58Encode(concat([[coinInfo.p2sh], "0x" + p2sh[2]]));
          }
        }
      }
      if (coinInfo.prefix != null) {
        const length = bytes[1];
        let version26 = bytes[0];
        if (version26 === 0) {
          if (length !== 20 && length !== 32) {
            version26 = -1;
          }
        } else {
          version26 = -1;
        }
        if (version26 >= 0 && bytes.length === 2 + length && length >= 1 && length <= 75) {
          const words6 = import_bech32.default.toWords(bytes.slice(2));
          words6.unshift(version26);
          return import_bech32.default.encode(coinInfo.prefix, words6);
        }
      }
      return null;
    }
    getAddress(coinType) {
      return __awaiter9(this, void 0, void 0, function* () {
        if (coinType == null) {
          coinType = 60;
        }
        if (coinType === 60) {
          const transaction = {
            to: this.address,
            data: "0x3b3b57de" + namehash(this.name).substring(2)
          };
          const hexBytes2 = yield this.provider.call(transaction);
          if (hexBytes2 === "0x" || hexBytes2 === HashZero) {
            return null;
          }
          return this.provider.formatter.callAddress(hexBytes2);
        }
        const hexBytes = yield this._fetchBytes("0xf1cb7e06", bytes32ify(coinType));
        if (hexBytes == null || hexBytes === "0x") {
          return null;
        }
        const address = this._getAddress(coinType, hexBytes);
        if (address == null) {
          logger30.throwError(`invalid or unsupported coin data`, Logger.errors.UNSUPPORTED_OPERATION, {
            operation: `getAddress(${coinType})`,
            coinType,
            data: hexBytes
          });
        }
        return address;
      });
    }
    getContentHash() {
      return __awaiter9(this, void 0, void 0, function* () {
        const hexBytes = yield this._fetchBytes("0xbc1c58d1");
        if (hexBytes == null || hexBytes === "0x") {
          return null;
        }
        const ipfs = hexBytes.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
        if (ipfs) {
          const length = parseInt(ipfs[3], 16);
          if (ipfs[4].length === length * 2) {
            return "ipfs://" + Base58.encode("0x" + ipfs[1]);
          }
        }
        const swarm = hexBytes.match(/^0xe40101fa011b20([0-9a-f]*)$/);
        if (swarm) {
          if (swarm[1].length === 32 * 2) {
            return "bzz://" + swarm[1];
          }
        }
        return logger30.throwError(`invalid or unsupported content hash data`, Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "getContentHash()",
          data: hexBytes
        });
      });
    }
    getText(key2) {
      return __awaiter9(this, void 0, void 0, function* () {
        let keyBytes = toUtf8Bytes(key2);
        keyBytes = concat([bytes32ify(64), bytes32ify(keyBytes.length), keyBytes]);
        if (keyBytes.length % 32 !== 0) {
          keyBytes = concat([keyBytes, hexZeroPad("0x", 32 - key2.length % 32)]);
        }
        const hexBytes = yield this._fetchBytes("0x59d1d43c", hexlify(keyBytes));
        if (hexBytes == null || hexBytes === "0x") {
          return null;
        }
        return toUtf8String(hexBytes);
      });
    }
  };
  var defaultFormatter = null;
  var nextPollId = 1;
  var BaseProvider = class extends Provider {
    constructor(network) {
      logger30.checkNew(new.target, Provider);
      super();
      this._events = [];
      this._emitted = { block: -2 };
      this.formatter = new.target.getFormatter();
      defineReadOnly(this, "anyNetwork", network === "any");
      if (this.anyNetwork) {
        network = this.detectNetwork();
      }
      if (network instanceof Promise) {
        this._networkPromise = network;
        network.catch((error) => {
        });
        this._ready().catch((error) => {
        });
      } else {
        const knownNetwork = getStatic(new.target, "getNetwork")(network);
        if (knownNetwork) {
          defineReadOnly(this, "_network", knownNetwork);
          this.emit("network", knownNetwork, null);
        } else {
          logger30.throwArgumentError("invalid network", "network", network);
        }
      }
      this._maxInternalBlockNumber = -1024;
      this._lastBlockNumber = -2;
      this._pollingInterval = 4e3;
      this._fastQueryDate = 0;
    }
    _ready() {
      return __awaiter9(this, void 0, void 0, function* () {
        if (this._network == null) {
          let network = null;
          if (this._networkPromise) {
            try {
              network = yield this._networkPromise;
            } catch (error) {
            }
          }
          if (network == null) {
            network = yield this.detectNetwork();
          }
          if (!network) {
            logger30.throwError("no network detected", Logger.errors.UNKNOWN_ERROR, {});
          }
          if (this._network == null) {
            if (this.anyNetwork) {
              this._network = network;
            } else {
              defineReadOnly(this, "_network", network);
            }
            this.emit("network", network, null);
          }
        }
        return this._network;
      });
    }
    get ready() {
      return poll(() => {
        return this._ready().then((network) => {
          return network;
        }, (error) => {
          if (error.code === Logger.errors.NETWORK_ERROR && error.event === "noNetwork") {
            return void 0;
          }
          throw error;
        });
      });
    }
    static getFormatter() {
      if (defaultFormatter == null) {
        defaultFormatter = new Formatter();
      }
      return defaultFormatter;
    }
    static getNetwork(network) {
      return getNetwork(network == null ? "homestead" : network);
    }
    _getInternalBlockNumber(maxAge) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this._ready();
        if (maxAge > 0) {
          while (this._internalBlockNumber) {
            const internalBlockNumber = this._internalBlockNumber;
            try {
              const result = yield internalBlockNumber;
              if (getTime() - result.respTime <= maxAge) {
                return result.blockNumber;
              }
              break;
            } catch (error) {
              if (this._internalBlockNumber === internalBlockNumber) {
                break;
              }
            }
          }
        }
        const reqTime = getTime();
        const checkInternalBlockNumber = resolveProperties({
          blockNumber: this.perform("getBlockNumber", {}),
          networkError: this.getNetwork().then((network) => null, (error) => error)
        }).then(({ blockNumber, networkError }) => {
          if (networkError) {
            if (this._internalBlockNumber === checkInternalBlockNumber) {
              this._internalBlockNumber = null;
            }
            throw networkError;
          }
          const respTime = getTime();
          blockNumber = BigNumber.from(blockNumber).toNumber();
          if (blockNumber < this._maxInternalBlockNumber) {
            blockNumber = this._maxInternalBlockNumber;
          }
          this._maxInternalBlockNumber = blockNumber;
          this._setFastBlockNumber(blockNumber);
          return { blockNumber, reqTime, respTime };
        });
        this._internalBlockNumber = checkInternalBlockNumber;
        checkInternalBlockNumber.catch((error) => {
          if (this._internalBlockNumber === checkInternalBlockNumber) {
            this._internalBlockNumber = null;
          }
        });
        return (yield checkInternalBlockNumber).blockNumber;
      });
    }
    poll() {
      return __awaiter9(this, void 0, void 0, function* () {
        const pollId = nextPollId++;
        const runners = [];
        let blockNumber = null;
        try {
          blockNumber = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
        } catch (error) {
          this.emit("error", error);
          return;
        }
        this._setFastBlockNumber(blockNumber);
        this.emit("poll", pollId, blockNumber);
        if (blockNumber === this._lastBlockNumber) {
          this.emit("didPoll", pollId);
          return;
        }
        if (this._emitted.block === -2) {
          this._emitted.block = blockNumber - 1;
        }
        if (Math.abs(this._emitted.block - blockNumber) > 1e3) {
          logger30.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${blockNumber})`);
          this.emit("error", logger30.makeError("network block skew detected", Logger.errors.NETWORK_ERROR, {
            blockNumber,
            event: "blockSkew",
            previousBlockNumber: this._emitted.block
          }));
          this.emit("block", blockNumber);
        } else {
          for (let i = this._emitted.block + 1; i <= blockNumber; i++) {
            this.emit("block", i);
          }
        }
        if (this._emitted.block !== blockNumber) {
          this._emitted.block = blockNumber;
          Object.keys(this._emitted).forEach((key2) => {
            if (key2 === "block") {
              return;
            }
            const eventBlockNumber = this._emitted[key2];
            if (eventBlockNumber === "pending") {
              return;
            }
            if (blockNumber - eventBlockNumber > 12) {
              delete this._emitted[key2];
            }
          });
        }
        if (this._lastBlockNumber === -2) {
          this._lastBlockNumber = blockNumber - 1;
        }
        this._events.forEach((event) => {
          switch (event.type) {
            case "tx": {
              const hash3 = event.hash;
              let runner = this.getTransactionReceipt(hash3).then((receipt) => {
                if (!receipt || receipt.blockNumber == null) {
                  return null;
                }
                this._emitted["t:" + hash3] = receipt.blockNumber;
                this.emit(hash3, receipt);
                return null;
              }).catch((error) => {
                this.emit("error", error);
              });
              runners.push(runner);
              break;
            }
            case "filter": {
              const filter = event.filter;
              filter.fromBlock = this._lastBlockNumber + 1;
              filter.toBlock = blockNumber;
              const runner = this.getLogs(filter).then((logs) => {
                if (logs.length === 0) {
                  return;
                }
                logs.forEach((log) => {
                  this._emitted["b:" + log.blockHash] = log.blockNumber;
                  this._emitted["t:" + log.transactionHash] = log.blockNumber;
                  this.emit(filter, log);
                });
              }).catch((error) => {
                this.emit("error", error);
              });
              runners.push(runner);
              break;
            }
          }
        });
        this._lastBlockNumber = blockNumber;
        Promise.all(runners).then(() => {
          this.emit("didPoll", pollId);
        }).catch((error) => {
          this.emit("error", error);
        });
        return;
      });
    }
    resetEventsBlock(blockNumber) {
      this._lastBlockNumber = blockNumber - 1;
      if (this.polling) {
        this.poll();
      }
    }
    get network() {
      return this._network;
    }
    detectNetwork() {
      return __awaiter9(this, void 0, void 0, function* () {
        return logger30.throwError("provider does not support network detection", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "provider.detectNetwork"
        });
      });
    }
    getNetwork() {
      return __awaiter9(this, void 0, void 0, function* () {
        const network = yield this._ready();
        const currentNetwork = yield this.detectNetwork();
        if (network.chainId !== currentNetwork.chainId) {
          if (this.anyNetwork) {
            this._network = currentNetwork;
            this._lastBlockNumber = -2;
            this._fastBlockNumber = null;
            this._fastBlockNumberPromise = null;
            this._fastQueryDate = 0;
            this._emitted.block = -2;
            this._maxInternalBlockNumber = -1024;
            this._internalBlockNumber = null;
            this.emit("network", currentNetwork, network);
            yield stall(0);
            return this._network;
          }
          const error = logger30.makeError("underlying network changed", Logger.errors.NETWORK_ERROR, {
            event: "changed",
            network,
            detectedNetwork: currentNetwork
          });
          this.emit("error", error);
          throw error;
        }
        return network;
      });
    }
    get blockNumber() {
      this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((blockNumber) => {
        this._setFastBlockNumber(blockNumber);
      }, (error) => {
      });
      return this._fastBlockNumber != null ? this._fastBlockNumber : -1;
    }
    get polling() {
      return this._poller != null;
    }
    set polling(value) {
      if (value && !this._poller) {
        this._poller = setInterval(() => {
          this.poll();
        }, this.pollingInterval);
        if (!this._bootstrapPoll) {
          this._bootstrapPoll = setTimeout(() => {
            this.poll();
            this._bootstrapPoll = setTimeout(() => {
              if (!this._poller) {
                this.poll();
              }
              this._bootstrapPoll = null;
            }, this.pollingInterval);
          }, 0);
        }
      } else if (!value && this._poller) {
        clearInterval(this._poller);
        this._poller = null;
      }
    }
    get pollingInterval() {
      return this._pollingInterval;
    }
    set pollingInterval(value) {
      if (typeof value !== "number" || value <= 0 || parseInt(String(value)) != value) {
        throw new Error("invalid polling interval");
      }
      this._pollingInterval = value;
      if (this._poller) {
        clearInterval(this._poller);
        this._poller = setInterval(() => {
          this.poll();
        }, this._pollingInterval);
      }
    }
    _getFastBlockNumber() {
      const now2 = getTime();
      if (now2 - this._fastQueryDate > 2 * this._pollingInterval) {
        this._fastQueryDate = now2;
        this._fastBlockNumberPromise = this.getBlockNumber().then((blockNumber) => {
          if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
            this._fastBlockNumber = blockNumber;
          }
          return this._fastBlockNumber;
        });
      }
      return this._fastBlockNumberPromise;
    }
    _setFastBlockNumber(blockNumber) {
      if (this._fastBlockNumber != null && blockNumber < this._fastBlockNumber) {
        return;
      }
      this._fastQueryDate = getTime();
      if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
        this._fastBlockNumber = blockNumber;
        this._fastBlockNumberPromise = Promise.resolve(blockNumber);
      }
    }
    waitForTransaction(transactionHash, confirmations, timeout) {
      return __awaiter9(this, void 0, void 0, function* () {
        return this._waitForTransaction(transactionHash, confirmations == null ? 1 : confirmations, timeout || 0, null);
      });
    }
    _waitForTransaction(transactionHash, confirmations, timeout, replaceable) {
      return __awaiter9(this, void 0, void 0, function* () {
        const receipt = yield this.getTransactionReceipt(transactionHash);
        if ((receipt ? receipt.confirmations : 0) >= confirmations) {
          return receipt;
        }
        return new Promise((resolve, reject) => {
          const cancelFuncs = [];
          let done = false;
          const alreadyDone = function() {
            if (done) {
              return true;
            }
            done = true;
            cancelFuncs.forEach((func) => {
              func();
            });
            return false;
          };
          const minedHandler = (receipt2) => {
            if (receipt2.confirmations < confirmations) {
              return;
            }
            if (alreadyDone()) {
              return;
            }
            resolve(receipt2);
          };
          this.on(transactionHash, minedHandler);
          cancelFuncs.push(() => {
            this.removeListener(transactionHash, minedHandler);
          });
          if (replaceable) {
            let lastBlockNumber = replaceable.startBlock;
            let scannedBlock = null;
            const replaceHandler = (blockNumber) => __awaiter9(this, void 0, void 0, function* () {
              if (done) {
                return;
              }
              yield stall(1e3);
              this.getTransactionCount(replaceable.from).then((nonce) => __awaiter9(this, void 0, void 0, function* () {
                if (done) {
                  return;
                }
                if (nonce <= replaceable.nonce) {
                  lastBlockNumber = blockNumber;
                } else {
                  {
                    const mined = yield this.getTransaction(transactionHash);
                    if (mined && mined.blockNumber != null) {
                      return;
                    }
                  }
                  if (scannedBlock == null) {
                    scannedBlock = lastBlockNumber - 3;
                    if (scannedBlock < replaceable.startBlock) {
                      scannedBlock = replaceable.startBlock;
                    }
                  }
                  while (scannedBlock <= blockNumber) {
                    if (done) {
                      return;
                    }
                    const block = yield this.getBlockWithTransactions(scannedBlock);
                    for (let ti = 0; ti < block.transactions.length; ti++) {
                      const tx = block.transactions[ti];
                      if (tx.hash === transactionHash) {
                        return;
                      }
                      if (tx.from === replaceable.from && tx.nonce === replaceable.nonce) {
                        if (done) {
                          return;
                        }
                        const receipt2 = yield this.waitForTransaction(tx.hash, confirmations);
                        if (alreadyDone()) {
                          return;
                        }
                        let reason = "replaced";
                        if (tx.data === replaceable.data && tx.to === replaceable.to && tx.value.eq(replaceable.value)) {
                          reason = "repriced";
                        } else if (tx.data === "0x" && tx.from === tx.to && tx.value.isZero()) {
                          reason = "cancelled";
                        }
                        reject(logger30.makeError("transaction was replaced", Logger.errors.TRANSACTION_REPLACED, {
                          cancelled: reason === "replaced" || reason === "cancelled",
                          reason,
                          replacement: this._wrapTransaction(tx),
                          hash: transactionHash,
                          receipt: receipt2
                        }));
                        return;
                      }
                    }
                    scannedBlock++;
                  }
                }
                if (done) {
                  return;
                }
                this.once("block", replaceHandler);
              }), (error) => {
                if (done) {
                  return;
                }
                this.once("block", replaceHandler);
              });
            });
            if (done) {
              return;
            }
            this.once("block", replaceHandler);
            cancelFuncs.push(() => {
              this.removeListener("block", replaceHandler);
            });
          }
          if (typeof timeout === "number" && timeout > 0) {
            const timer2 = setTimeout(() => {
              if (alreadyDone()) {
                return;
              }
              reject(logger30.makeError("timeout exceeded", Logger.errors.TIMEOUT, { timeout }));
            }, timeout);
            if (timer2.unref) {
              timer2.unref();
            }
            cancelFuncs.push(() => {
              clearTimeout(timer2);
            });
          }
        });
      });
    }
    getBlockNumber() {
      return __awaiter9(this, void 0, void 0, function* () {
        return this._getInternalBlockNumber(0);
      });
    }
    getGasPrice() {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        const result = yield this.perform("getGasPrice", {});
        try {
          return BigNumber.from(result);
        } catch (error) {
          return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
            method: "getGasPrice",
            result,
            error
          });
        }
      });
    }
    getBalance(addressOrName, blockTag) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        const params = yield resolveProperties({
          address: this._getAddress(addressOrName),
          blockTag: this._getBlockTag(blockTag)
        });
        const result = yield this.perform("getBalance", params);
        try {
          return BigNumber.from(result);
        } catch (error) {
          return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
            method: "getBalance",
            params,
            result,
            error
          });
        }
      });
    }
    getTransactionCount(addressOrName, blockTag) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        const params = yield resolveProperties({
          address: this._getAddress(addressOrName),
          blockTag: this._getBlockTag(blockTag)
        });
        const result = yield this.perform("getTransactionCount", params);
        try {
          return BigNumber.from(result).toNumber();
        } catch (error) {
          return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
            method: "getTransactionCount",
            params,
            result,
            error
          });
        }
      });
    }
    getCode(addressOrName, blockTag) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        const params = yield resolveProperties({
          address: this._getAddress(addressOrName),
          blockTag: this._getBlockTag(blockTag)
        });
        const result = yield this.perform("getCode", params);
        try {
          return hexlify(result);
        } catch (error) {
          return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
            method: "getCode",
            params,
            result,
            error
          });
        }
      });
    }
    getStorageAt(addressOrName, position, blockTag) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        const params = yield resolveProperties({
          address: this._getAddress(addressOrName),
          blockTag: this._getBlockTag(blockTag),
          position: Promise.resolve(position).then((p) => hexValue(p))
        });
        const result = yield this.perform("getStorageAt", params);
        try {
          return hexlify(result);
        } catch (error) {
          return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
            method: "getStorageAt",
            params,
            result,
            error
          });
        }
      });
    }
    _wrapTransaction(tx, hash3, startBlock) {
      if (hash3 != null && hexDataLength(hash3) !== 32) {
        throw new Error("invalid response - sendTransaction");
      }
      const result = tx;
      if (hash3 != null && tx.hash !== hash3) {
        logger30.throwError("Transaction hash mismatch from Provider.sendTransaction.", Logger.errors.UNKNOWN_ERROR, { expectedHash: tx.hash, returnedHash: hash3 });
      }
      result.wait = (confirms, timeout) => __awaiter9(this, void 0, void 0, function* () {
        if (confirms == null) {
          confirms = 1;
        }
        if (timeout == null) {
          timeout = 0;
        }
        let replacement = void 0;
        if (confirms !== 0 && startBlock != null) {
          replacement = {
            data: tx.data,
            from: tx.from,
            nonce: tx.nonce,
            to: tx.to,
            value: tx.value,
            startBlock
          };
        }
        const receipt = yield this._waitForTransaction(tx.hash, confirms, timeout, replacement);
        if (receipt == null && confirms === 0) {
          return null;
        }
        this._emitted["t:" + tx.hash] = receipt.blockNumber;
        if (receipt.status === 0) {
          logger30.throwError("transaction failed", Logger.errors.CALL_EXCEPTION, {
            transactionHash: tx.hash,
            transaction: tx,
            receipt
          });
        }
        return receipt;
      });
      return result;
    }
    sendTransaction(signedTransaction) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        const hexTx = yield Promise.resolve(signedTransaction).then((t) => hexlify(t));
        const tx = this.formatter.transaction(signedTransaction);
        const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
        try {
          const hash3 = yield this.perform("sendTransaction", { signedTransaction: hexTx });
          return this._wrapTransaction(tx, hash3, blockNumber);
        } catch (error) {
          error.transaction = tx;
          error.transactionHash = tx.hash;
          throw error;
        }
      });
    }
    _getTransactionRequest(transaction) {
      return __awaiter9(this, void 0, void 0, function* () {
        const values = yield transaction;
        const tx = {};
        ["from", "to"].forEach((key2) => {
          if (values[key2] == null) {
            return;
          }
          tx[key2] = Promise.resolve(values[key2]).then((v) => v ? this._getAddress(v) : null);
        });
        ["gasLimit", "gasPrice", "value"].forEach((key2) => {
          if (values[key2] == null) {
            return;
          }
          tx[key2] = Promise.resolve(values[key2]).then((v) => v ? BigNumber.from(v) : null);
        });
        ["type"].forEach((key2) => {
          if (values[key2] == null) {
            return;
          }
          tx[key2] = Promise.resolve(values[key2]).then((v) => v != null ? v : null);
        });
        if (values.accessList) {
          tx.accessList = this.formatter.accessList(values.accessList);
        }
        ["data"].forEach((key2) => {
          if (values[key2] == null) {
            return;
          }
          tx[key2] = Promise.resolve(values[key2]).then((v) => v ? hexlify(v) : null);
        });
        return this.formatter.transactionRequest(yield resolveProperties(tx));
      });
    }
    _getFilter(filter) {
      return __awaiter9(this, void 0, void 0, function* () {
        filter = yield filter;
        const result = {};
        if (filter.address != null) {
          result.address = this._getAddress(filter.address);
        }
        ["blockHash", "topics"].forEach((key2) => {
          if (filter[key2] == null) {
            return;
          }
          result[key2] = filter[key2];
        });
        ["fromBlock", "toBlock"].forEach((key2) => {
          if (filter[key2] == null) {
            return;
          }
          result[key2] = this._getBlockTag(filter[key2]);
        });
        return this.formatter.filter(yield resolveProperties(result));
      });
    }
    call(transaction, blockTag) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        const params = yield resolveProperties({
          transaction: this._getTransactionRequest(transaction),
          blockTag: this._getBlockTag(blockTag)
        });
        const result = yield this.perform("call", params);
        try {
          return hexlify(result);
        } catch (error) {
          return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
            method: "call",
            params,
            result,
            error
          });
        }
      });
    }
    estimateGas(transaction) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        const params = yield resolveProperties({
          transaction: this._getTransactionRequest(transaction)
        });
        const result = yield this.perform("estimateGas", params);
        try {
          return BigNumber.from(result);
        } catch (error) {
          return logger30.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
            method: "estimateGas",
            params,
            result,
            error
          });
        }
      });
    }
    _getAddress(addressOrName) {
      return __awaiter9(this, void 0, void 0, function* () {
        const address = yield this.resolveName(addressOrName);
        if (address == null) {
          logger30.throwError("ENS name not configured", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: `resolveName(${JSON.stringify(addressOrName)})`
          });
        }
        return address;
      });
    }
    _getBlock(blockHashOrBlockTag, includeTransactions) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        blockHashOrBlockTag = yield blockHashOrBlockTag;
        let blockNumber = -128;
        const params = {
          includeTransactions: !!includeTransactions
        };
        if (isHexString(blockHashOrBlockTag, 32)) {
          params.blockHash = blockHashOrBlockTag;
        } else {
          try {
            params.blockTag = this.formatter.blockTag(yield this._getBlockTag(blockHashOrBlockTag));
            if (isHexString(params.blockTag)) {
              blockNumber = parseInt(params.blockTag.substring(2), 16);
            }
          } catch (error) {
            logger30.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", blockHashOrBlockTag);
          }
        }
        return poll(() => __awaiter9(this, void 0, void 0, function* () {
          const block = yield this.perform("getBlock", params);
          if (block == null) {
            if (params.blockHash != null) {
              if (this._emitted["b:" + params.blockHash] == null) {
                return null;
              }
            }
            if (params.blockTag != null) {
              if (blockNumber > this._emitted.block) {
                return null;
              }
            }
            return void 0;
          }
          if (includeTransactions) {
            let blockNumber2 = null;
            for (let i = 0; i < block.transactions.length; i++) {
              const tx = block.transactions[i];
              if (tx.blockNumber == null) {
                tx.confirmations = 0;
              } else if (tx.confirmations == null) {
                if (blockNumber2 == null) {
                  blockNumber2 = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                }
                let confirmations = blockNumber2 - tx.blockNumber + 1;
                if (confirmations <= 0) {
                  confirmations = 1;
                }
                tx.confirmations = confirmations;
              }
            }
            return this.formatter.blockWithTransactions(block);
          }
          return this.formatter.block(block);
        }), { oncePoll: this });
      });
    }
    getBlock(blockHashOrBlockTag) {
      return this._getBlock(blockHashOrBlockTag, false);
    }
    getBlockWithTransactions(blockHashOrBlockTag) {
      return this._getBlock(blockHashOrBlockTag, true);
    }
    getTransaction(transactionHash) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        transactionHash = yield transactionHash;
        const params = { transactionHash: this.formatter.hash(transactionHash, true) };
        return poll(() => __awaiter9(this, void 0, void 0, function* () {
          const result = yield this.perform("getTransaction", params);
          if (result == null) {
            if (this._emitted["t:" + transactionHash] == null) {
              return null;
            }
            return void 0;
          }
          const tx = this.formatter.transactionResponse(result);
          if (tx.blockNumber == null) {
            tx.confirmations = 0;
          } else if (tx.confirmations == null) {
            const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
            let confirmations = blockNumber - tx.blockNumber + 1;
            if (confirmations <= 0) {
              confirmations = 1;
            }
            tx.confirmations = confirmations;
          }
          return this._wrapTransaction(tx);
        }), { oncePoll: this });
      });
    }
    getTransactionReceipt(transactionHash) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        transactionHash = yield transactionHash;
        const params = { transactionHash: this.formatter.hash(transactionHash, true) };
        return poll(() => __awaiter9(this, void 0, void 0, function* () {
          const result = yield this.perform("getTransactionReceipt", params);
          if (result == null) {
            if (this._emitted["t:" + transactionHash] == null) {
              return null;
            }
            return void 0;
          }
          if (result.blockHash == null) {
            return void 0;
          }
          const receipt = this.formatter.receipt(result);
          if (receipt.blockNumber == null) {
            receipt.confirmations = 0;
          } else if (receipt.confirmations == null) {
            const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
            let confirmations = blockNumber - receipt.blockNumber + 1;
            if (confirmations <= 0) {
              confirmations = 1;
            }
            receipt.confirmations = confirmations;
          }
          return receipt;
        }), { oncePoll: this });
      });
    }
    getLogs(filter) {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        const params = yield resolveProperties({ filter: this._getFilter(filter) });
        const logs = yield this.perform("getLogs", params);
        logs.forEach((log) => {
          if (log.removed == null) {
            log.removed = false;
          }
        });
        return Formatter.arrayOf(this.formatter.filterLog.bind(this.formatter))(logs);
      });
    }
    getEtherPrice() {
      return __awaiter9(this, void 0, void 0, function* () {
        yield this.getNetwork();
        return this.perform("getEtherPrice", {});
      });
    }
    _getBlockTag(blockTag) {
      return __awaiter9(this, void 0, void 0, function* () {
        blockTag = yield blockTag;
        if (typeof blockTag === "number" && blockTag < 0) {
          if (blockTag % 1) {
            logger30.throwArgumentError("invalid BlockTag", "blockTag", blockTag);
          }
          let blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
          blockNumber += blockTag;
          if (blockNumber < 0) {
            blockNumber = 0;
          }
          return this.formatter.blockTag(blockNumber);
        }
        return this.formatter.blockTag(blockTag);
      });
    }
    getResolver(name2) {
      return __awaiter9(this, void 0, void 0, function* () {
        const address = yield this._getResolver(name2);
        if (address == null) {
          return null;
        }
        return new Resolver(this, address, name2);
      });
    }
    _getResolver(name2) {
      return __awaiter9(this, void 0, void 0, function* () {
        const network = yield this.getNetwork();
        if (!network.ensAddress) {
          logger30.throwError("network does not support ENS", Logger.errors.UNSUPPORTED_OPERATION, { operation: "ENS", network: network.name });
        }
        const transaction = {
          to: network.ensAddress,
          data: "0x0178b8bf" + namehash(name2).substring(2)
        };
        return this.formatter.callAddress(yield this.call(transaction));
      });
    }
    resolveName(name2) {
      return __awaiter9(this, void 0, void 0, function* () {
        name2 = yield name2;
        try {
          return Promise.resolve(this.formatter.address(name2));
        } catch (error) {
          if (isHexString(name2)) {
            throw error;
          }
        }
        if (typeof name2 !== "string") {
          logger30.throwArgumentError("invalid ENS name", "name", name2);
        }
        const resolver = yield this.getResolver(name2);
        if (!resolver) {
          return null;
        }
        return yield resolver.getAddress();
      });
    }
    lookupAddress(address) {
      return __awaiter9(this, void 0, void 0, function* () {
        address = yield address;
        address = this.formatter.address(address);
        const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
        const resolverAddress = yield this._getResolver(reverseName);
        if (!resolverAddress) {
          return null;
        }
        let bytes = arrayify(yield this.call({
          to: resolverAddress,
          data: "0x691f3431" + namehash(reverseName).substring(2)
        }));
        if (bytes.length < 32 || !BigNumber.from(bytes.slice(0, 32)).eq(32)) {
          return null;
        }
        bytes = bytes.slice(32);
        if (bytes.length < 32) {
          return null;
        }
        const length = BigNumber.from(bytes.slice(0, 32)).toNumber();
        bytes = bytes.slice(32);
        if (length > bytes.length) {
          return null;
        }
        const name2 = toUtf8String(bytes.slice(0, length));
        const addr = yield this.resolveName(name2);
        if (addr != address) {
          return null;
        }
        return name2;
      });
    }
    perform(method, params) {
      return logger30.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, { operation: method });
    }
    _startEvent(event) {
      this.polling = this._events.filter((e) => e.pollable()).length > 0;
    }
    _stopEvent(event) {
      this.polling = this._events.filter((e) => e.pollable()).length > 0;
    }
    _addEventListener(eventName, listener, once) {
      const event = new Event(getEventTag2(eventName), listener, once);
      this._events.push(event);
      this._startEvent(event);
      return this;
    }
    on(eventName, listener) {
      return this._addEventListener(eventName, listener, false);
    }
    once(eventName, listener) {
      return this._addEventListener(eventName, listener, true);
    }
    emit(eventName, ...args) {
      let result = false;
      let stopped = [];
      let eventTag = getEventTag2(eventName);
      this._events = this._events.filter((event) => {
        if (event.tag !== eventTag) {
          return true;
        }
        setTimeout(() => {
          event.listener.apply(this, args);
        }, 0);
        result = true;
        if (event.once) {
          stopped.push(event);
          return false;
        }
        return true;
      });
      stopped.forEach((event) => {
        this._stopEvent(event);
      });
      return result;
    }
    listenerCount(eventName) {
      if (!eventName) {
        return this._events.length;
      }
      let eventTag = getEventTag2(eventName);
      return this._events.filter((event) => {
        return event.tag === eventTag;
      }).length;
    }
    listeners(eventName) {
      if (eventName == null) {
        return this._events.map((event) => event.listener);
      }
      let eventTag = getEventTag2(eventName);
      return this._events.filter((event) => event.tag === eventTag).map((event) => event.listener);
    }
    off(eventName, listener) {
      if (listener == null) {
        return this.removeAllListeners(eventName);
      }
      const stopped = [];
      let found = false;
      let eventTag = getEventTag2(eventName);
      this._events = this._events.filter((event) => {
        if (event.tag !== eventTag || event.listener != listener) {
          return true;
        }
        if (found) {
          return true;
        }
        found = true;
        stopped.push(event);
        return false;
      });
      stopped.forEach((event) => {
        this._stopEvent(event);
      });
      return this;
    }
    removeAllListeners(eventName) {
      let stopped = [];
      if (eventName == null) {
        stopped = this._events;
        this._events = [];
      } else {
        const eventTag = getEventTag2(eventName);
        this._events = this._events.filter((event) => {
          if (event.tag !== eventTag) {
            return true;
          }
          stopped.push(event);
          return false;
        });
      }
      stopped.forEach((event) => {
        this._stopEvent(event);
      });
      return this;
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/json-rpc-provider.js
  "use strict";
  var __awaiter10 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger31 = new Logger(version23);
  var errorGas = ["call", "estimateGas"];
  function checkError(method, error, params) {
    if (method === "call" && error.code === Logger.errors.SERVER_ERROR) {
      const e = error.error;
      if (e && e.message.match("reverted") && isHexString(e.data)) {
        return e.data;
      }
    }
    let message = error.message;
    if (error.code === Logger.errors.SERVER_ERROR && error.error && typeof error.error.message === "string") {
      message = error.error.message;
    } else if (typeof error.body === "string") {
      message = error.body;
    } else if (typeof error.responseText === "string") {
      message = error.responseText;
    }
    message = (message || "").toLowerCase();
    const transaction = params.transaction || params.signedTransaction;
    if (message.match(/insufficient funds/)) {
      logger31.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
        error,
        method,
        transaction
      });
    }
    if (message.match(/nonce too low/)) {
      logger31.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
        error,
        method,
        transaction
      });
    }
    if (message.match(/replacement transaction underpriced/)) {
      logger31.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
        error,
        method,
        transaction
      });
    }
    if (message.match(/only replay-protected/)) {
      logger31.throwError("legacy pre-eip-155 transactions not supported", Logger.errors.UNSUPPORTED_OPERATION, {
        error,
        method,
        transaction
      });
    }
    if (errorGas.indexOf(method) >= 0 && message.match(/gas required exceeds allowance|always failing transaction|execution reverted/)) {
      logger31.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
        error,
        method,
        transaction
      });
    }
    throw error;
  }
  function timer(timeout) {
    return new Promise(function(resolve) {
      setTimeout(resolve, timeout);
    });
  }
  function getResult(payload) {
    if (payload.error) {
      const error = new Error(payload.error.message);
      error.code = payload.error.code;
      error.data = payload.error.data;
      throw error;
    }
    return payload.result;
  }
  function getLowerCase(value) {
    if (value) {
      return value.toLowerCase();
    }
    return value;
  }
  var _constructorGuard5 = {};
  var JsonRpcSigner = class extends Signer {
    constructor(constructorGuard, provider, addressOrIndex) {
      logger31.checkNew(new.target, JsonRpcSigner);
      super();
      if (constructorGuard !== _constructorGuard5) {
        throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
      }
      defineReadOnly(this, "provider", provider);
      if (addressOrIndex == null) {
        addressOrIndex = 0;
      }
      if (typeof addressOrIndex === "string") {
        defineReadOnly(this, "_address", this.provider.formatter.address(addressOrIndex));
        defineReadOnly(this, "_index", null);
      } else if (typeof addressOrIndex === "number") {
        defineReadOnly(this, "_index", addressOrIndex);
        defineReadOnly(this, "_address", null);
      } else {
        logger31.throwArgumentError("invalid address or index", "addressOrIndex", addressOrIndex);
      }
    }
    connect(provider) {
      return logger31.throwError("cannot alter JSON-RPC Signer connection", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "connect"
      });
    }
    connectUnchecked() {
      return new UncheckedJsonRpcSigner(_constructorGuard5, this.provider, this._address || this._index);
    }
    getAddress() {
      if (this._address) {
        return Promise.resolve(this._address);
      }
      return this.provider.send("eth_accounts", []).then((accounts) => {
        if (accounts.length <= this._index) {
          logger31.throwError("unknown account #" + this._index, Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "getAddress"
          });
        }
        return this.provider.formatter.address(accounts[this._index]);
      });
    }
    sendUncheckedTransaction(transaction) {
      transaction = shallowCopy(transaction);
      const fromAddress = this.getAddress().then((address) => {
        if (address) {
          address = address.toLowerCase();
        }
        return address;
      });
      if (transaction.gasLimit == null) {
        const estimate = shallowCopy(transaction);
        estimate.from = fromAddress;
        transaction.gasLimit = this.provider.estimateGas(estimate);
      }
      return resolveProperties({
        tx: resolveProperties(transaction),
        sender: fromAddress
      }).then(({ tx, sender }) => {
        if (tx.from != null) {
          if (tx.from.toLowerCase() !== sender) {
            logger31.throwArgumentError("from address mismatch", "transaction", transaction);
          }
        } else {
          tx.from = sender;
        }
        const hexTx = this.provider.constructor.hexlifyTransaction(tx, { from: true });
        return this.provider.send("eth_sendTransaction", [hexTx]).then((hash3) => {
          return hash3;
        }, (error) => {
          return checkError("sendTransaction", error, hexTx);
        });
      });
    }
    signTransaction(transaction) {
      return logger31.throwError("signing transactions is unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "signTransaction"
      });
    }
    sendTransaction(transaction) {
      return this.sendUncheckedTransaction(transaction).then((hash3) => {
        return poll(() => {
          return this.provider.getTransaction(hash3).then((tx) => {
            if (tx === null) {
              return void 0;
            }
            return this.provider._wrapTransaction(tx, hash3);
          });
        }, { oncePoll: this.provider }).catch((error) => {
          error.transactionHash = hash3;
          throw error;
        });
      });
    }
    signMessage(message) {
      return __awaiter10(this, void 0, void 0, function* () {
        const data4 = typeof message === "string" ? toUtf8Bytes(message) : message;
        const address = yield this.getAddress();
        return yield this.provider.send("eth_sign", [address.toLowerCase(), hexlify(data4)]);
      });
    }
    _signTypedData(domain, types, value) {
      return __awaiter10(this, void 0, void 0, function* () {
        const populated = yield TypedDataEncoder.resolveNames(domain, types, value, (name2) => {
          return this.provider.resolveName(name2);
        });
        const address = yield this.getAddress();
        return yield this.provider.send("eth_signTypedData_v4", [
          address.toLowerCase(),
          JSON.stringify(TypedDataEncoder.getPayload(populated.domain, types, populated.value))
        ]);
      });
    }
    unlock(password) {
      return __awaiter10(this, void 0, void 0, function* () {
        const provider = this.provider;
        const address = yield this.getAddress();
        return provider.send("personal_unlockAccount", [address.toLowerCase(), password, null]);
      });
    }
  };
  var UncheckedJsonRpcSigner = class extends JsonRpcSigner {
    sendTransaction(transaction) {
      return this.sendUncheckedTransaction(transaction).then((hash3) => {
        return {
          hash: hash3,
          nonce: null,
          gasLimit: null,
          gasPrice: null,
          data: null,
          value: null,
          chainId: null,
          confirmations: 0,
          from: null,
          wait: (confirmations) => {
            return this.provider.waitForTransaction(hash3, confirmations);
          }
        };
      });
    }
  };
  var allowedTransactionKeys4 = {
    chainId: true,
    data: true,
    gasLimit: true,
    gasPrice: true,
    nonce: true,
    to: true,
    value: true,
    type: true,
    accessList: true
  };
  var JsonRpcProvider = class extends BaseProvider {
    constructor(url, network) {
      logger31.checkNew(new.target, JsonRpcProvider);
      let networkOrReady = network;
      if (networkOrReady == null) {
        networkOrReady = new Promise((resolve, reject) => {
          setTimeout(() => {
            this.detectNetwork().then((network2) => {
              resolve(network2);
            }, (error) => {
              reject(error);
            });
          }, 0);
        });
      }
      super(networkOrReady);
      if (!url) {
        url = getStatic(this.constructor, "defaultUrl")();
      }
      if (typeof url === "string") {
        defineReadOnly(this, "connection", Object.freeze({
          url
        }));
      } else {
        defineReadOnly(this, "connection", Object.freeze(shallowCopy(url)));
      }
      this._nextId = 42;
    }
    get _cache() {
      if (this._eventLoopCache == null) {
        this._eventLoopCache = {};
      }
      return this._eventLoopCache;
    }
    static defaultUrl() {
      return "http://localhost:8545";
    }
    detectNetwork() {
      if (!this._cache["detectNetwork"]) {
        this._cache["detectNetwork"] = this._uncachedDetectNetwork();
        setTimeout(() => {
          this._cache["detectNetwork"] = null;
        }, 0);
      }
      return this._cache["detectNetwork"];
    }
    _uncachedDetectNetwork() {
      return __awaiter10(this, void 0, void 0, function* () {
        yield timer(0);
        let chainId = null;
        try {
          chainId = yield this.send("eth_chainId", []);
        } catch (error) {
          try {
            chainId = yield this.send("net_version", []);
          } catch (error2) {
          }
        }
        if (chainId != null) {
          const getNetwork2 = getStatic(this.constructor, "getNetwork");
          try {
            return getNetwork2(BigNumber.from(chainId).toNumber());
          } catch (error) {
            return logger31.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
              chainId,
              event: "invalidNetwork",
              serverError: error
            });
          }
        }
        return logger31.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
          event: "noNetwork"
        });
      });
    }
    getSigner(addressOrIndex) {
      return new JsonRpcSigner(_constructorGuard5, this, addressOrIndex);
    }
    getUncheckedSigner(addressOrIndex) {
      return this.getSigner(addressOrIndex).connectUnchecked();
    }
    listAccounts() {
      return this.send("eth_accounts", []).then((accounts) => {
        return accounts.map((a) => this.formatter.address(a));
      });
    }
    send(method, params) {
      const request = {
        method,
        params,
        id: this._nextId++,
        jsonrpc: "2.0"
      };
      this.emit("debug", {
        action: "request",
        request: deepCopy(request),
        provider: this
      });
      const cache = ["eth_chainId", "eth_blockNumber"].indexOf(method) >= 0;
      if (cache && this._cache[method]) {
        return this._cache[method];
      }
      const result = fetchJson(this.connection, JSON.stringify(request), getResult).then((result2) => {
        this.emit("debug", {
          action: "response",
          request,
          response: result2,
          provider: this
        });
        return result2;
      }, (error) => {
        this.emit("debug", {
          action: "response",
          error,
          request,
          provider: this
        });
        throw error;
      });
      if (cache) {
        this._cache[method] = result;
        setTimeout(() => {
          this._cache[method] = null;
        }, 0);
      }
      return result;
    }
    prepareRequest(method, params) {
      switch (method) {
        case "getBlockNumber":
          return ["eth_blockNumber", []];
        case "getGasPrice":
          return ["eth_gasPrice", []];
        case "getBalance":
          return ["eth_getBalance", [getLowerCase(params.address), params.blockTag]];
        case "getTransactionCount":
          return ["eth_getTransactionCount", [getLowerCase(params.address), params.blockTag]];
        case "getCode":
          return ["eth_getCode", [getLowerCase(params.address), params.blockTag]];
        case "getStorageAt":
          return ["eth_getStorageAt", [getLowerCase(params.address), params.position, params.blockTag]];
        case "sendTransaction":
          return ["eth_sendRawTransaction", [params.signedTransaction]];
        case "getBlock":
          if (params.blockTag) {
            return ["eth_getBlockByNumber", [params.blockTag, !!params.includeTransactions]];
          } else if (params.blockHash) {
            return ["eth_getBlockByHash", [params.blockHash, !!params.includeTransactions]];
          }
          return null;
        case "getTransaction":
          return ["eth_getTransactionByHash", [params.transactionHash]];
        case "getTransactionReceipt":
          return ["eth_getTransactionReceipt", [params.transactionHash]];
        case "call": {
          const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
          return ["eth_call", [hexlifyTransaction(params.transaction, { from: true }), params.blockTag]];
        }
        case "estimateGas": {
          const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
          return ["eth_estimateGas", [hexlifyTransaction(params.transaction, { from: true })]];
        }
        case "getLogs":
          if (params.filter && params.filter.address != null) {
            params.filter.address = getLowerCase(params.filter.address);
          }
          return ["eth_getLogs", [params.filter]];
        default:
          break;
      }
      return null;
    }
    perform(method, params) {
      return __awaiter10(this, void 0, void 0, function* () {
        const args = this.prepareRequest(method, params);
        if (args == null) {
          logger31.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, { operation: method });
        }
        try {
          return yield this.send(args[0], args[1]);
        } catch (error) {
          return checkError(method, error, params);
        }
      });
    }
    _startEvent(event) {
      if (event.tag === "pending") {
        this._startPending();
      }
      super._startEvent(event);
    }
    _startPending() {
      if (this._pendingFilter != null) {
        return;
      }
      const self2 = this;
      const pendingFilter = this.send("eth_newPendingTransactionFilter", []);
      this._pendingFilter = pendingFilter;
      pendingFilter.then(function(filterId) {
        function poll2() {
          self2.send("eth_getFilterChanges", [filterId]).then(function(hashes) {
            if (self2._pendingFilter != pendingFilter) {
              return null;
            }
            let seq = Promise.resolve();
            hashes.forEach(function(hash3) {
              self2._emitted["t:" + hash3.toLowerCase()] = "pending";
              seq = seq.then(function() {
                return self2.getTransaction(hash3).then(function(tx) {
                  self2.emit("pending", tx);
                  return null;
                });
              });
            });
            return seq.then(function() {
              return timer(1e3);
            });
          }).then(function() {
            if (self2._pendingFilter != pendingFilter) {
              self2.send("eth_uninstallFilter", [filterId]);
              return;
            }
            setTimeout(function() {
              poll2();
            }, 0);
            return null;
          }).catch((error) => {
          });
        }
        poll2();
        return filterId;
      }).catch((error) => {
      });
    }
    _stopEvent(event) {
      if (event.tag === "pending" && this.listenerCount("pending") === 0) {
        this._pendingFilter = null;
      }
      super._stopEvent(event);
    }
    static hexlifyTransaction(transaction, allowExtra) {
      const allowed = shallowCopy(allowedTransactionKeys4);
      if (allowExtra) {
        for (const key2 in allowExtra) {
          if (allowExtra[key2]) {
            allowed[key2] = true;
          }
        }
      }
      checkProperties(transaction, allowed);
      const result = {};
      ["gasLimit", "gasPrice", "type", "nonce", "value"].forEach(function(key2) {
        if (transaction[key2] == null) {
          return;
        }
        const value = hexValue(transaction[key2]);
        if (key2 === "gasLimit") {
          key2 = "gas";
        }
        result[key2] = value;
      });
      ["from", "to", "data"].forEach(function(key2) {
        if (transaction[key2] == null) {
          return;
        }
        result[key2] = hexlify(transaction[key2]);
      });
      if (transaction.accessList) {
        result["accessList"] = accessListify(transaction.accessList);
      }
      return result;
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/ws.js
  "use strict";
  var WS = null;
  try {
    WS = WebSocket;
    if (WS == null) {
      throw new Error("inject please");
    }
  } catch (error) {
    const logger45 = new Logger(version23);
    WS = function() {
      logger45.throwError("WebSockets not supported in this environment", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new WebSocket()"
      });
    };
  }

  // node_modules/@ethersproject/providers/lib.esm/websocket-provider.js
  "use strict";
  var __awaiter11 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger32 = new Logger(version23);
  var NextId = 1;
  var WebSocketProvider = class extends JsonRpcProvider {
    constructor(url, network) {
      if (network === "any") {
        logger32.throwError("WebSocketProvider does not support 'any' network yet", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "network:any"
        });
      }
      super(url, network);
      this._pollingInterval = -1;
      this._wsReady = false;
      defineReadOnly(this, "_websocket", new WS(this.connection.url));
      defineReadOnly(this, "_requests", {});
      defineReadOnly(this, "_subs", {});
      defineReadOnly(this, "_subIds", {});
      defineReadOnly(this, "_detectNetwork", super.detectNetwork());
      this._websocket.onopen = () => {
        this._wsReady = true;
        Object.keys(this._requests).forEach((id2) => {
          this._websocket.send(this._requests[id2].payload);
        });
      };
      this._websocket.onmessage = (messageEvent) => {
        const data4 = messageEvent.data;
        const result = JSON.parse(data4);
        if (result.id != null) {
          const id2 = String(result.id);
          const request = this._requests[id2];
          delete this._requests[id2];
          if (result.result !== void 0) {
            request.callback(null, result.result);
            this.emit("debug", {
              action: "response",
              request: JSON.parse(request.payload),
              response: result.result,
              provider: this
            });
          } else {
            let error = null;
            if (result.error) {
              error = new Error(result.error.message || "unknown error");
              defineReadOnly(error, "code", result.error.code || null);
              defineReadOnly(error, "response", data4);
            } else {
              error = new Error("unknown error");
            }
            request.callback(error, void 0);
            this.emit("debug", {
              action: "response",
              error,
              request: JSON.parse(request.payload),
              provider: this
            });
          }
        } else if (result.method === "eth_subscription") {
          const sub = this._subs[result.params.subscription];
          if (sub) {
            sub.processFunc(result.params.result);
          }
        } else {
          console.warn("this should not happen");
        }
      };
      const fauxPoll = setInterval(() => {
        this.emit("poll");
      }, 1e3);
      if (fauxPoll.unref) {
        fauxPoll.unref();
      }
    }
    detectNetwork() {
      return this._detectNetwork;
    }
    get pollingInterval() {
      return 0;
    }
    resetEventsBlock(blockNumber) {
      logger32.throwError("cannot reset events block on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "resetEventBlock"
      });
    }
    set pollingInterval(value) {
      logger32.throwError("cannot set polling interval on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setPollingInterval"
      });
    }
    poll() {
      return __awaiter11(this, void 0, void 0, function* () {
        return null;
      });
    }
    set polling(value) {
      if (!value) {
        return;
      }
      logger32.throwError("cannot set polling on WebSocketProvider", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setPolling"
      });
    }
    send(method, params) {
      const rid = NextId++;
      return new Promise((resolve, reject) => {
        function callback(error, result) {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
        const payload = JSON.stringify({
          method,
          params,
          id: rid,
          jsonrpc: "2.0"
        });
        this.emit("debug", {
          action: "request",
          request: JSON.parse(payload),
          provider: this
        });
        this._requests[String(rid)] = { callback, payload };
        if (this._wsReady) {
          this._websocket.send(payload);
        }
      });
    }
    static defaultUrl() {
      return "ws://localhost:8546";
    }
    _subscribe(tag, param, processFunc) {
      return __awaiter11(this, void 0, void 0, function* () {
        let subIdPromise = this._subIds[tag];
        if (subIdPromise == null) {
          subIdPromise = Promise.all(param).then((param2) => {
            return this.send("eth_subscribe", param2);
          });
          this._subIds[tag] = subIdPromise;
        }
        const subId = yield subIdPromise;
        this._subs[subId] = { tag, processFunc };
      });
    }
    _startEvent(event) {
      switch (event.type) {
        case "block":
          this._subscribe("block", ["newHeads"], (result) => {
            const blockNumber = BigNumber.from(result.number).toNumber();
            this._emitted.block = blockNumber;
            this.emit("block", blockNumber);
          });
          break;
        case "pending":
          this._subscribe("pending", ["newPendingTransactions"], (result) => {
            this.emit("pending", result);
          });
          break;
        case "filter":
          this._subscribe(event.tag, ["logs", this._getFilter(event.filter)], (result) => {
            if (result.removed == null) {
              result.removed = false;
            }
            this.emit(event.filter, this.formatter.filterLog(result));
          });
          break;
        case "tx": {
          const emitReceipt = (event2) => {
            const hash3 = event2.hash;
            this.getTransactionReceipt(hash3).then((receipt) => {
              if (!receipt) {
                return;
              }
              this.emit(hash3, receipt);
            });
          };
          emitReceipt(event);
          this._subscribe("tx", ["newHeads"], (result) => {
            this._events.filter((e) => e.type === "tx").forEach(emitReceipt);
          });
          break;
        }
        case "debug":
        case "poll":
        case "willPoll":
        case "didPoll":
        case "error":
          break;
        default:
          console.log("unhandled:", event);
          break;
      }
    }
    _stopEvent(event) {
      let tag = event.tag;
      if (event.type === "tx") {
        if (this._events.filter((e) => e.type === "tx").length) {
          return;
        }
        tag = "tx";
      } else if (this.listenerCount(event.event)) {
        return;
      }
      const subId = this._subIds[tag];
      if (!subId) {
        return;
      }
      delete this._subIds[tag];
      subId.then((subId2) => {
        if (!this._subs[subId2]) {
          return;
        }
        delete this._subs[subId2];
        this.send("eth_unsubscribe", [subId2]);
      });
    }
    destroy() {
      return __awaiter11(this, void 0, void 0, function* () {
        if (this._websocket.readyState === WS.CONNECTING) {
          yield new Promise((resolve) => {
            this._websocket.onopen = function() {
              resolve(true);
            };
            this._websocket.onerror = function() {
              resolve(false);
            };
          });
        }
        this._websocket.close(1e3);
      });
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/url-json-rpc-provider.js
  "use strict";
  var __awaiter12 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger33 = new Logger(version23);
  var StaticJsonRpcProvider = class extends JsonRpcProvider {
    detectNetwork() {
      const _super = Object.create(null, {
        detectNetwork: { get: () => super.detectNetwork }
      });
      return __awaiter12(this, void 0, void 0, function* () {
        let network = this.network;
        if (network == null) {
          network = yield _super.detectNetwork.call(this);
          if (!network) {
            logger33.throwError("no network detected", Logger.errors.UNKNOWN_ERROR, {});
          }
          if (this._network == null) {
            defineReadOnly(this, "_network", network);
            this.emit("network", network, null);
          }
        }
        return network;
      });
    }
  };
  var UrlJsonRpcProvider = class extends StaticJsonRpcProvider {
    constructor(network, apiKey) {
      logger33.checkAbstract(new.target, UrlJsonRpcProvider);
      network = getStatic(new.target, "getNetwork")(network);
      apiKey = getStatic(new.target, "getApiKey")(apiKey);
      const connection = getStatic(new.target, "getUrl")(network, apiKey);
      super(connection, network);
      if (typeof apiKey === "string") {
        defineReadOnly(this, "apiKey", apiKey);
      } else if (apiKey != null) {
        Object.keys(apiKey).forEach((key2) => {
          defineReadOnly(this, key2, apiKey[key2]);
        });
      }
    }
    _startPending() {
      logger33.warn("WARNING: API provider does not support pending filters");
    }
    isCommunityResource() {
      return false;
    }
    getSigner(address) {
      return logger33.throwError("API provider does not support signing", Logger.errors.UNSUPPORTED_OPERATION, { operation: "getSigner" });
    }
    listAccounts() {
      return Promise.resolve([]);
    }
    static getApiKey(apiKey) {
      return apiKey;
    }
    static getUrl(network, apiKey) {
      return logger33.throwError("not implemented; sub-classes must override getUrl", Logger.errors.NOT_IMPLEMENTED, {
        operation: "getUrl"
      });
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/alchemy-provider.js
  "use strict";
  var logger34 = new Logger(version23);
  var defaultApiKey = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";
  var AlchemyWebSocketProvider = class extends WebSocketProvider {
    constructor(network, apiKey) {
      const provider = new AlchemyProvider(network, apiKey);
      const url = provider.connection.url.replace(/^http/i, "ws").replace(".alchemyapi.", ".ws.alchemyapi.");
      super(url, provider.network);
      defineReadOnly(this, "apiKey", provider.apiKey);
    }
    isCommunityResource() {
      return this.apiKey === defaultApiKey;
    }
  };
  var AlchemyProvider = class extends UrlJsonRpcProvider {
    static getWebSocketProvider(network, apiKey) {
      return new AlchemyWebSocketProvider(network, apiKey);
    }
    static getApiKey(apiKey) {
      if (apiKey == null) {
        return defaultApiKey;
      }
      if (apiKey && typeof apiKey !== "string") {
        logger34.throwArgumentError("invalid apiKey", "apiKey", apiKey);
      }
      return apiKey;
    }
    static getUrl(network, apiKey) {
      let host = null;
      switch (network.name) {
        case "homestead":
          host = "eth-mainnet.alchemyapi.io/v2/";
          break;
        case "ropsten":
          host = "eth-ropsten.alchemyapi.io/v2/";
          break;
        case "rinkeby":
          host = "eth-rinkeby.alchemyapi.io/v2/";
          break;
        case "goerli":
          host = "eth-goerli.alchemyapi.io/v2/";
          break;
        case "kovan":
          host = "eth-kovan.alchemyapi.io/v2/";
          break;
        default:
          logger34.throwArgumentError("unsupported network", "network", arguments[0]);
      }
      return {
        allowGzip: true,
        url: "https://" + host + apiKey,
        throttleCallback: (attempt, url) => {
          if (apiKey === defaultApiKey) {
            showThrottleMessage();
          }
          return Promise.resolve(true);
        }
      };
    }
    isCommunityResource() {
      return this.apiKey === defaultApiKey;
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/cloudflare-provider.js
  "use strict";
  var __awaiter13 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger35 = new Logger(version23);
  var CloudflareProvider = class extends UrlJsonRpcProvider {
    static getApiKey(apiKey) {
      if (apiKey != null) {
        logger35.throwArgumentError("apiKey not supported for cloudflare", "apiKey", apiKey);
      }
      return null;
    }
    static getUrl(network, apiKey) {
      let host = null;
      switch (network.name) {
        case "homestead":
          host = "https://cloudflare-eth.com/";
          break;
        default:
          logger35.throwArgumentError("unsupported network", "network", arguments[0]);
      }
      return host;
    }
    perform(method, params) {
      const _super = Object.create(null, {
        perform: { get: () => super.perform }
      });
      return __awaiter13(this, void 0, void 0, function* () {
        if (method === "getBlockNumber") {
          const block = yield _super.perform.call(this, "getBlock", { blockTag: "latest" });
          return block.number;
        }
        return _super.perform.call(this, method, params);
      });
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/etherscan-provider.js
  "use strict";
  var __awaiter14 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger36 = new Logger(version23);
  function getTransactionPostData(transaction) {
    const result = {};
    for (let key2 in transaction) {
      if (transaction[key2] == null) {
        continue;
      }
      let value = transaction[key2];
      if ({ type: true, gasLimit: true, gasPrice: true, nonce: true, value: true }[key2]) {
        value = hexValue(hexlify(value));
      } else if (key2 === "accessList") {
        value = "[" + accessListify(value).map((set) => {
          return `{address:"${set.address}",storageKeys:["${set.storageKeys.join('","')}"]}`;
        }).join(",") + "]";
      } else {
        value = hexlify(value);
      }
      result[key2] = value;
    }
    return result;
  }
  function getResult2(result) {
    if (result.status == 0 && (result.message === "No records found" || result.message === "No transactions found")) {
      return result.result;
    }
    if (result.status != 1 || result.message != "OK") {
      const error = new Error("invalid response");
      error.result = JSON.stringify(result);
      if ((result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
        error.throttleRetry = true;
      }
      throw error;
    }
    return result.result;
  }
  function getJsonResult(result) {
    if (result && result.status == 0 && result.message == "NOTOK" && (result.result || "").toLowerCase().indexOf("rate limit") >= 0) {
      const error = new Error("throttled response");
      error.result = JSON.stringify(result);
      error.throttleRetry = true;
      throw error;
    }
    if (result.jsonrpc != "2.0") {
      const error = new Error("invalid response");
      error.result = JSON.stringify(result);
      throw error;
    }
    if (result.error) {
      const error = new Error(result.error.message || "unknown error");
      if (result.error.code) {
        error.code = result.error.code;
      }
      if (result.error.data) {
        error.data = result.error.data;
      }
      throw error;
    }
    return result.result;
  }
  function checkLogTag(blockTag) {
    if (blockTag === "pending") {
      throw new Error("pending not supported");
    }
    if (blockTag === "latest") {
      return blockTag;
    }
    return parseInt(blockTag.substring(2), 16);
  }
  var defaultApiKey2 = "9D13ZE7XSBTJ94N9BNJ2MA33VMAY2YPIRB";
  function checkError2(method, error, transaction) {
    if (method === "call" && error.code === Logger.errors.SERVER_ERROR) {
      const e = error.error;
      if (e && e.message.match("reverted") && isHexString(e.data)) {
        return e.data;
      }
    }
    let message = error.message;
    if (error.code === Logger.errors.SERVER_ERROR) {
      if (error.error && typeof error.error.message === "string") {
        message = error.error.message;
      } else if (typeof error.body === "string") {
        message = error.body;
      } else if (typeof error.responseText === "string") {
        message = error.responseText;
      }
    }
    message = (message || "").toLowerCase();
    if (message.match(/insufficient funds/)) {
      logger36.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
        error,
        method,
        transaction
      });
    }
    if (message.match(/same hash was already imported|transaction nonce is too low/)) {
      logger36.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
        error,
        method,
        transaction
      });
    }
    if (message.match(/another transaction with same nonce/)) {
      logger36.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
        error,
        method,
        transaction
      });
    }
    if (message.match(/execution failed due to an exception/)) {
      logger36.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
        error,
        method,
        transaction
      });
    }
    throw error;
  }
  var EtherscanProvider = class extends BaseProvider {
    constructor(network, apiKey) {
      logger36.checkNew(new.target, EtherscanProvider);
      super(network);
      defineReadOnly(this, "baseUrl", this.getBaseUrl());
      defineReadOnly(this, "apiKey", apiKey || defaultApiKey2);
    }
    getBaseUrl() {
      switch (this.network ? this.network.name : "invalid") {
        case "homestead":
          return "https://api.etherscan.io";
        case "ropsten":
          return "https://api-ropsten.etherscan.io";
        case "rinkeby":
          return "https://api-rinkeby.etherscan.io";
        case "kovan":
          return "https://api-kovan.etherscan.io";
        case "goerli":
          return "https://api-goerli.etherscan.io";
        default:
      }
      return logger36.throwArgumentError("unsupported network", "network", name);
    }
    getUrl(module, params) {
      const query = Object.keys(params).reduce((accum, key2) => {
        const value = params[key2];
        if (value != null) {
          accum += `&${key2}=${value}`;
        }
        return accum;
      }, "");
      const apiKey = this.apiKey ? `&apikey=${this.apiKey}` : "";
      return `${this.baseUrl}/api?module=${module}${query}${apiKey}`;
    }
    getPostUrl() {
      return `${this.baseUrl}/api`;
    }
    getPostData(module, params) {
      params.module = module;
      params.apikey = this.apiKey;
      return params;
    }
    fetch(module, params, post) {
      return __awaiter14(this, void 0, void 0, function* () {
        const url = post ? this.getPostUrl() : this.getUrl(module, params);
        const payload = post ? this.getPostData(module, params) : null;
        const procFunc = module === "proxy" ? getJsonResult : getResult2;
        this.emit("debug", {
          action: "request",
          request: url,
          provider: this
        });
        const connection = {
          url,
          throttleSlotInterval: 1e3,
          throttleCallback: (attempt, url2) => {
            if (this.isCommunityResource()) {
              showThrottleMessage();
            }
            return Promise.resolve(true);
          }
        };
        let payloadStr = null;
        if (payload) {
          connection.headers = { "content-type": "application/x-www-form-urlencoded; charset=UTF-8" };
          payloadStr = Object.keys(payload).map((key2) => {
            return `${key2}=${payload[key2]}`;
          }).join("&");
        }
        const result = yield fetchJson(connection, payloadStr, procFunc || getJsonResult);
        this.emit("debug", {
          action: "response",
          request: url,
          response: deepCopy(result),
          provider: this
        });
        return result;
      });
    }
    detectNetwork() {
      return __awaiter14(this, void 0, void 0, function* () {
        return this.network;
      });
    }
    perform(method, params) {
      const _super = Object.create(null, {
        perform: { get: () => super.perform }
      });
      return __awaiter14(this, void 0, void 0, function* () {
        switch (method) {
          case "getBlockNumber":
            return this.fetch("proxy", { action: "eth_blockNumber" });
          case "getGasPrice":
            return this.fetch("proxy", { action: "eth_gasPrice" });
          case "getBalance":
            return this.fetch("account", {
              action: "balance",
              address: params.address,
              tag: params.blockTag
            });
          case "getTransactionCount":
            return this.fetch("proxy", {
              action: "eth_getTransactionCount",
              address: params.address,
              tag: params.blockTag
            });
          case "getCode":
            return this.fetch("proxy", {
              action: "eth_getCode",
              address: params.address,
              tag: params.blockTag
            });
          case "getStorageAt":
            return this.fetch("proxy", {
              action: "eth_getStorageAt",
              address: params.address,
              position: params.position,
              tag: params.blockTag
            });
          case "sendTransaction":
            return this.fetch("proxy", {
              action: "eth_sendRawTransaction",
              hex: params.signedTransaction
            }, true).catch((error) => {
              return checkError2("sendTransaction", error, params.signedTransaction);
            });
          case "getBlock":
            if (params.blockTag) {
              return this.fetch("proxy", {
                action: "eth_getBlockByNumber",
                tag: params.blockTag,
                boolean: params.includeTransactions ? "true" : "false"
              });
            }
            throw new Error("getBlock by blockHash not implemented");
          case "getTransaction":
            return this.fetch("proxy", {
              action: "eth_getTransactionByHash",
              txhash: params.transactionHash
            });
          case "getTransactionReceipt":
            return this.fetch("proxy", {
              action: "eth_getTransactionReceipt",
              txhash: params.transactionHash
            });
          case "call": {
            if (params.blockTag !== "latest") {
              throw new Error("EtherscanProvider does not support blockTag for call");
            }
            const postData = getTransactionPostData(params.transaction);
            postData.module = "proxy";
            postData.action = "eth_call";
            try {
              return yield this.fetch("proxy", postData, true);
            } catch (error) {
              return checkError2("call", error, params.transaction);
            }
          }
          case "estimateGas": {
            const postData = getTransactionPostData(params.transaction);
            postData.module = "proxy";
            postData.action = "eth_estimateGas";
            try {
              return yield this.fetch("proxy", postData, true);
            } catch (error) {
              return checkError2("estimateGas", error, params.transaction);
            }
          }
          case "getLogs": {
            const args = { action: "getLogs" };
            if (params.filter.fromBlock) {
              args.fromBlock = checkLogTag(params.filter.fromBlock);
            }
            if (params.filter.toBlock) {
              args.toBlock = checkLogTag(params.filter.toBlock);
            }
            if (params.filter.address) {
              args.address = params.filter.address;
            }
            if (params.filter.topics && params.filter.topics.length > 0) {
              if (params.filter.topics.length > 1) {
                logger36.throwError("unsupported topic count", Logger.errors.UNSUPPORTED_OPERATION, { topics: params.filter.topics });
              }
              if (params.filter.topics.length === 1) {
                const topic0 = params.filter.topics[0];
                if (typeof topic0 !== "string" || topic0.length !== 66) {
                  logger36.throwError("unsupported topic format", Logger.errors.UNSUPPORTED_OPERATION, { topic0 });
                }
                args.topic0 = topic0;
              }
            }
            const logs = yield this.fetch("logs", args);
            let blocks = {};
            for (let i = 0; i < logs.length; i++) {
              const log = logs[i];
              if (log.blockHash != null) {
                continue;
              }
              if (blocks[log.blockNumber] == null) {
                const block = yield this.getBlock(log.blockNumber);
                if (block) {
                  blocks[log.blockNumber] = block.hash;
                }
              }
              log.blockHash = blocks[log.blockNumber];
            }
            return logs;
          }
          case "getEtherPrice":
            if (this.network.name !== "homestead") {
              return 0;
            }
            return parseFloat((yield this.fetch("stats", { action: "ethprice" })).ethusd);
          default:
            break;
        }
        return _super.perform.call(this, method, params);
      });
    }
    getHistory(addressOrName, startBlock, endBlock) {
      return __awaiter14(this, void 0, void 0, function* () {
        const params = {
          action: "txlist",
          address: yield this.resolveName(addressOrName),
          startblock: startBlock == null ? 0 : startBlock,
          endblock: endBlock == null ? 99999999 : endBlock,
          sort: "asc"
        };
        const result = yield this.fetch("account", params);
        return result.map((tx) => {
          ["contractAddress", "to"].forEach(function(key2) {
            if (tx[key2] == "") {
              delete tx[key2];
            }
          });
          if (tx.creates == null && tx.contractAddress != null) {
            tx.creates = tx.contractAddress;
          }
          const item = this.formatter.transactionResponse(tx);
          if (tx.timeStamp) {
            item.timestamp = parseInt(tx.timeStamp);
          }
          return item;
        });
      });
    }
    isCommunityResource() {
      return this.apiKey === defaultApiKey2;
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/fallback-provider.js
  "use strict";
  var __awaiter15 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var logger37 = new Logger(version23);
  function now() {
    return new Date().getTime();
  }
  function checkNetworks(networks2) {
    let result = null;
    for (let i = 0; i < networks2.length; i++) {
      const network = networks2[i];
      if (network == null) {
        return null;
      }
      if (result) {
        if (!(result.name === network.name && result.chainId === network.chainId && (result.ensAddress === network.ensAddress || result.ensAddress == null && network.ensAddress == null))) {
          logger37.throwArgumentError("provider mismatch", "networks", networks2);
        }
      } else {
        result = network;
      }
    }
    return result;
  }
  function median(values, maxDelta) {
    values = values.slice().sort();
    const middle = Math.floor(values.length / 2);
    if (values.length % 2) {
      return values[middle];
    }
    const a = values[middle - 1], b = values[middle];
    if (maxDelta != null && Math.abs(a - b) > maxDelta) {
      return null;
    }
    return (a + b) / 2;
  }
  function serialize2(value) {
    if (value === null) {
      return "null";
    } else if (typeof value === "number" || typeof value === "boolean") {
      return JSON.stringify(value);
    } else if (typeof value === "string") {
      return value;
    } else if (BigNumber.isBigNumber(value)) {
      return value.toString();
    } else if (Array.isArray(value)) {
      return JSON.stringify(value.map((i) => serialize2(i)));
    } else if (typeof value === "object") {
      const keys = Object.keys(value);
      keys.sort();
      return "{" + keys.map((key2) => {
        let v = value[key2];
        if (typeof v === "function") {
          v = "[function]";
        } else {
          v = serialize2(v);
        }
        return JSON.stringify(key2) + ":" + v;
      }).join(",") + "}";
    }
    throw new Error("unknown value type: " + typeof value);
  }
  var nextRid = 1;
  function stall2(duration) {
    let cancel = null;
    let timer2 = null;
    let promise = new Promise((resolve) => {
      cancel = function() {
        if (timer2) {
          clearTimeout(timer2);
          timer2 = null;
        }
        resolve();
      };
      timer2 = setTimeout(cancel, duration);
    });
    const wait = (func) => {
      promise = promise.then(func);
      return promise;
    };
    function getPromise() {
      return promise;
    }
    return { cancel, getPromise, wait };
  }
  var ForwardErrors = [
    Logger.errors.CALL_EXCEPTION,
    Logger.errors.INSUFFICIENT_FUNDS,
    Logger.errors.NONCE_EXPIRED,
    Logger.errors.REPLACEMENT_UNDERPRICED,
    Logger.errors.UNPREDICTABLE_GAS_LIMIT
  ];
  var ForwardProperties = [
    "address",
    "args",
    "errorArgs",
    "errorSignature",
    "method",
    "transaction"
  ];
  function exposeDebugConfig(config, now2) {
    const result = {
      weight: config.weight
    };
    Object.defineProperty(result, "provider", { get: () => config.provider });
    if (config.start) {
      result.start = config.start;
    }
    if (now2) {
      result.duration = now2 - config.start;
    }
    if (config.done) {
      if (config.error) {
        result.error = config.error;
      } else {
        result.result = config.result || null;
      }
    }
    return result;
  }
  function normalizedTally(normalize2, quorum) {
    return function(configs) {
      const tally = {};
      configs.forEach((c) => {
        const value = normalize2(c.result);
        if (!tally[value]) {
          tally[value] = { count: 0, result: c.result };
        }
        tally[value].count++;
      });
      const keys = Object.keys(tally);
      for (let i = 0; i < keys.length; i++) {
        const check = tally[keys[i]];
        if (check.count >= quorum) {
          return check.result;
        }
      }
      return void 0;
    };
  }
  function getProcessFunc(provider, method, params) {
    let normalize2 = serialize2;
    switch (method) {
      case "getBlockNumber":
        return function(configs) {
          const values = configs.map((c) => c.result);
          let blockNumber = median(configs.map((c) => c.result), 2);
          if (blockNumber == null) {
            return void 0;
          }
          blockNumber = Math.ceil(blockNumber);
          if (values.indexOf(blockNumber + 1) >= 0) {
            blockNumber++;
          }
          if (blockNumber >= provider._highestBlockNumber) {
            provider._highestBlockNumber = blockNumber;
          }
          return provider._highestBlockNumber;
        };
      case "getGasPrice":
        return function(configs) {
          const values = configs.map((c) => c.result);
          values.sort();
          return values[Math.floor(values.length / 2)];
        };
      case "getEtherPrice":
        return function(configs) {
          return median(configs.map((c) => c.result));
        };
      case "getBalance":
      case "getTransactionCount":
      case "getCode":
      case "getStorageAt":
      case "call":
      case "estimateGas":
      case "getLogs":
        break;
      case "getTransaction":
      case "getTransactionReceipt":
        normalize2 = function(tx) {
          if (tx == null) {
            return null;
          }
          tx = shallowCopy(tx);
          tx.confirmations = -1;
          return serialize2(tx);
        };
        break;
      case "getBlock":
        if (params.includeTransactions) {
          normalize2 = function(block) {
            if (block == null) {
              return null;
            }
            block = shallowCopy(block);
            block.transactions = block.transactions.map((tx) => {
              tx = shallowCopy(tx);
              tx.confirmations = -1;
              return tx;
            });
            return serialize2(block);
          };
        } else {
          normalize2 = function(block) {
            if (block == null) {
              return null;
            }
            return serialize2(block);
          };
        }
        break;
      default:
        throw new Error("unknown method: " + method);
    }
    return normalizedTally(normalize2, provider.quorum);
  }
  function waitForSync(config, blockNumber) {
    return __awaiter15(this, void 0, void 0, function* () {
      const provider = config.provider;
      if (provider.blockNumber != null && provider.blockNumber >= blockNumber || blockNumber === -1) {
        return provider;
      }
      return poll(() => {
        return new Promise((resolve, reject) => {
          setTimeout(function() {
            if (provider.blockNumber >= blockNumber) {
              return resolve(provider);
            }
            if (config.cancelled) {
              return resolve(null);
            }
            return resolve(void 0);
          }, 0);
        });
      }, { oncePoll: provider });
    });
  }
  function getRunner(config, currentBlockNumber, method, params) {
    return __awaiter15(this, void 0, void 0, function* () {
      let provider = config.provider;
      switch (method) {
        case "getBlockNumber":
        case "getGasPrice":
          return provider[method]();
        case "getEtherPrice":
          if (provider.getEtherPrice) {
            return provider.getEtherPrice();
          }
          break;
        case "getBalance":
        case "getTransactionCount":
        case "getCode":
          if (params.blockTag && isHexString(params.blockTag)) {
            provider = yield waitForSync(config, currentBlockNumber);
          }
          return provider[method](params.address, params.blockTag || "latest");
        case "getStorageAt":
          if (params.blockTag && isHexString(params.blockTag)) {
            provider = yield waitForSync(config, currentBlockNumber);
          }
          return provider.getStorageAt(params.address, params.position, params.blockTag || "latest");
        case "getBlock":
          if (params.blockTag && isHexString(params.blockTag)) {
            provider = yield waitForSync(config, currentBlockNumber);
          }
          return provider[params.includeTransactions ? "getBlockWithTransactions" : "getBlock"](params.blockTag || params.blockHash);
        case "call":
        case "estimateGas":
          if (params.blockTag && isHexString(params.blockTag)) {
            provider = yield waitForSync(config, currentBlockNumber);
          }
          return provider[method](params.transaction);
        case "getTransaction":
        case "getTransactionReceipt":
          return provider[method](params.transactionHash);
        case "getLogs": {
          let filter = params.filter;
          if (filter.fromBlock && isHexString(filter.fromBlock) || filter.toBlock && isHexString(filter.toBlock)) {
            provider = yield waitForSync(config, currentBlockNumber);
          }
          return provider.getLogs(filter);
        }
      }
      return logger37.throwError("unknown method error", Logger.errors.UNKNOWN_ERROR, {
        method,
        params
      });
    });
  }
  var FallbackProvider = class extends BaseProvider {
    constructor(providers, quorum) {
      logger37.checkNew(new.target, FallbackProvider);
      if (providers.length === 0) {
        logger37.throwArgumentError("missing providers", "providers", providers);
      }
      const providerConfigs = providers.map((configOrProvider, index) => {
        if (Provider.isProvider(configOrProvider)) {
          const stallTimeout = isCommunityResource(configOrProvider) ? 2e3 : 750;
          const priority = 1;
          return Object.freeze({ provider: configOrProvider, weight: 1, stallTimeout, priority });
        }
        const config = shallowCopy(configOrProvider);
        if (config.priority == null) {
          config.priority = 1;
        }
        if (config.stallTimeout == null) {
          config.stallTimeout = isCommunityResource(configOrProvider) ? 2e3 : 750;
        }
        if (config.weight == null) {
          config.weight = 1;
        }
        const weight = config.weight;
        if (weight % 1 || weight > 512 || weight < 1) {
          logger37.throwArgumentError("invalid weight; must be integer in [1, 512]", `providers[${index}].weight`, weight);
        }
        return Object.freeze(config);
      });
      const total = providerConfigs.reduce((accum, c) => accum + c.weight, 0);
      if (quorum == null) {
        quorum = total / 2;
      } else if (quorum > total) {
        logger37.throwArgumentError("quorum will always fail; larger than total weight", "quorum", quorum);
      }
      let networkOrReady = checkNetworks(providerConfigs.map((c) => c.provider.network));
      if (networkOrReady == null) {
        networkOrReady = new Promise((resolve, reject) => {
          setTimeout(() => {
            this.detectNetwork().then(resolve, reject);
          }, 0);
        });
      }
      super(networkOrReady);
      defineReadOnly(this, "providerConfigs", Object.freeze(providerConfigs));
      defineReadOnly(this, "quorum", quorum);
      this._highestBlockNumber = -1;
    }
    detectNetwork() {
      return __awaiter15(this, void 0, void 0, function* () {
        const networks2 = yield Promise.all(this.providerConfigs.map((c) => c.provider.getNetwork()));
        return checkNetworks(networks2);
      });
    }
    perform(method, params) {
      return __awaiter15(this, void 0, void 0, function* () {
        if (method === "sendTransaction") {
          const results = yield Promise.all(this.providerConfigs.map((c) => {
            return c.provider.sendTransaction(params.signedTransaction).then((result) => {
              return result.hash;
            }, (error) => {
              return error;
            });
          }));
          for (let i2 = 0; i2 < results.length; i2++) {
            const result = results[i2];
            if (typeof result === "string") {
              return result;
            }
          }
          throw results[0];
        }
        if (this._highestBlockNumber === -1 && method !== "getBlockNumber") {
          yield this.getBlockNumber();
        }
        const processFunc = getProcessFunc(this, method, params);
        const configs = shuffled(this.providerConfigs.map(shallowCopy));
        configs.sort((a, b) => a.priority - b.priority);
        const currentBlockNumber = this._highestBlockNumber;
        let i = 0;
        let first = true;
        while (true) {
          const t0 = now();
          let inflightWeight = configs.filter((c) => c.runner && t0 - c.start < c.stallTimeout).reduce((accum, c) => accum + c.weight, 0);
          while (inflightWeight < this.quorum && i < configs.length) {
            const config = configs[i++];
            const rid = nextRid++;
            config.start = now();
            config.staller = stall2(config.stallTimeout);
            config.staller.wait(() => {
              config.staller = null;
            });
            config.runner = getRunner(config, currentBlockNumber, method, params).then((result) => {
              config.done = true;
              config.result = result;
              if (this.listenerCount("debug")) {
                this.emit("debug", {
                  action: "request",
                  rid,
                  backend: exposeDebugConfig(config, now()),
                  request: { method, params: deepCopy(params) },
                  provider: this
                });
              }
            }, (error) => {
              config.done = true;
              config.error = error;
              if (this.listenerCount("debug")) {
                this.emit("debug", {
                  action: "request",
                  rid,
                  backend: exposeDebugConfig(config, now()),
                  request: { method, params: deepCopy(params) },
                  provider: this
                });
              }
            });
            if (this.listenerCount("debug")) {
              this.emit("debug", {
                action: "request",
                rid,
                backend: exposeDebugConfig(config, null),
                request: { method, params: deepCopy(params) },
                provider: this
              });
            }
            inflightWeight += config.weight;
          }
          const waiting = [];
          configs.forEach((c) => {
            if (c.done || !c.runner) {
              return;
            }
            waiting.push(c.runner);
            if (c.staller) {
              waiting.push(c.staller.getPromise());
            }
          });
          if (waiting.length) {
            yield Promise.race(waiting);
          }
          const results = configs.filter((c) => c.done && c.error == null);
          if (results.length >= this.quorum) {
            const result = processFunc(results);
            if (result !== void 0) {
              configs.forEach((c) => {
                if (c.staller) {
                  c.staller.cancel();
                }
                c.cancelled = true;
              });
              return result;
            }
            if (!first) {
              yield stall2(100).getPromise();
            }
            first = false;
          }
          const errors = configs.reduce((accum, c) => {
            if (!c.done || c.error == null) {
              return accum;
            }
            const code = c.error.code;
            if (ForwardErrors.indexOf(code) >= 0) {
              if (!accum[code]) {
                accum[code] = { error: c.error, weight: 0 };
              }
              accum[code].weight += c.weight;
            }
            return accum;
          }, {});
          Object.keys(errors).forEach((errorCode) => {
            const tally = errors[errorCode];
            if (tally.weight < this.quorum) {
              return;
            }
            configs.forEach((c) => {
              if (c.staller) {
                c.staller.cancel();
              }
              c.cancelled = true;
            });
            const e = tally.error;
            const props = {};
            ForwardProperties.forEach((name2) => {
              if (e[name2] == null) {
                return;
              }
              props[name2] = e[name2];
            });
            logger37.throwError(e.reason || e.message, errorCode, props);
          });
          if (configs.filter((c) => !c.done).length === 0) {
            break;
          }
        }
        configs.forEach((c) => {
          if (c.staller) {
            c.staller.cancel();
          }
          c.cancelled = true;
        });
        return logger37.throwError("failed to meet quorum", Logger.errors.SERVER_ERROR, {
          method,
          params,
          results: configs.map((c) => exposeDebugConfig(c)),
          provider: this
        });
      });
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/ipc-provider.js
  "use strict";
  var IpcProvider = null;

  // node_modules/@ethersproject/providers/lib.esm/infura-provider.js
  "use strict";
  var logger38 = new Logger(version23);
  var defaultProjectId = "84842078b09946638c03157f83405213";
  var InfuraWebSocketProvider = class extends WebSocketProvider {
    constructor(network, apiKey) {
      const provider = new InfuraProvider(network, apiKey);
      const connection = provider.connection;
      if (connection.password) {
        logger38.throwError("INFURA WebSocket project secrets unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "InfuraProvider.getWebSocketProvider()"
        });
      }
      const url = connection.url.replace(/^http/i, "ws").replace("/v3/", "/ws/v3/");
      super(url, network);
      defineReadOnly(this, "apiKey", provider.projectId);
      defineReadOnly(this, "projectId", provider.projectId);
      defineReadOnly(this, "projectSecret", provider.projectSecret);
    }
    isCommunityResource() {
      return this.projectId === defaultProjectId;
    }
  };
  var InfuraProvider = class extends UrlJsonRpcProvider {
    static getWebSocketProvider(network, apiKey) {
      return new InfuraWebSocketProvider(network, apiKey);
    }
    static getApiKey(apiKey) {
      const apiKeyObj = {
        apiKey: defaultProjectId,
        projectId: defaultProjectId,
        projectSecret: null
      };
      if (apiKey == null) {
        return apiKeyObj;
      }
      if (typeof apiKey === "string") {
        apiKeyObj.projectId = apiKey;
      } else if (apiKey.projectSecret != null) {
        logger38.assertArgument(typeof apiKey.projectId === "string", "projectSecret requires a projectId", "projectId", apiKey.projectId);
        logger38.assertArgument(typeof apiKey.projectSecret === "string", "invalid projectSecret", "projectSecret", "[REDACTED]");
        apiKeyObj.projectId = apiKey.projectId;
        apiKeyObj.projectSecret = apiKey.projectSecret;
      } else if (apiKey.projectId) {
        apiKeyObj.projectId = apiKey.projectId;
      }
      apiKeyObj.apiKey = apiKeyObj.projectId;
      return apiKeyObj;
    }
    static getUrl(network, apiKey) {
      let host = null;
      switch (network ? network.name : "unknown") {
        case "homestead":
          host = "mainnet.infura.io";
          break;
        case "ropsten":
          host = "ropsten.infura.io";
          break;
        case "rinkeby":
          host = "rinkeby.infura.io";
          break;
        case "kovan":
          host = "kovan.infura.io";
          break;
        case "goerli":
          host = "goerli.infura.io";
          break;
        default:
          logger38.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
            argument: "network",
            value: network
          });
      }
      const connection = {
        allowGzip: true,
        url: "https://" + host + "/v3/" + apiKey.projectId,
        throttleCallback: (attempt, url) => {
          if (apiKey.projectId === defaultProjectId) {
            showThrottleMessage();
          }
          return Promise.resolve(true);
        }
      };
      if (apiKey.projectSecret != null) {
        connection.user = "";
        connection.password = apiKey.projectSecret;
      }
      return connection;
    }
    isCommunityResource() {
      return this.projectId === defaultProjectId;
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/json-rpc-batch-provider.js
  var JsonRpcBatchProvider = class extends JsonRpcProvider {
    send(method, params) {
      const request = {
        method,
        params,
        id: this._nextId++,
        jsonrpc: "2.0"
      };
      if (this._pendingBatch == null) {
        this._pendingBatch = [];
      }
      const inflightRequest = { request, resolve: null, reject: null };
      const promise = new Promise((resolve, reject) => {
        inflightRequest.resolve = resolve;
        inflightRequest.reject = reject;
      });
      this._pendingBatch.push(inflightRequest);
      if (!this._pendingBatchAggregator) {
        this._pendingBatchAggregator = setTimeout(() => {
          const batch = this._pendingBatch;
          this._pendingBatch = null;
          this._pendingBatchAggregator = null;
          const request2 = batch.map((inflight) => inflight.request);
          this.emit("debug", {
            action: "requestBatch",
            request: deepCopy(request2),
            provider: this
          });
          return fetchJson(this.connection, JSON.stringify(request2)).then((result) => {
            this.emit("debug", {
              action: "response",
              request: request2,
              response: result,
              provider: this
            });
            batch.forEach((inflightRequest2, index) => {
              const payload = result[index];
              if (payload.error) {
                const error = new Error(payload.error.message);
                error.code = payload.error.code;
                error.data = payload.error.data;
                inflightRequest2.reject(error);
              } else {
                inflightRequest2.resolve(payload.result);
              }
            });
          }, (error) => {
            this.emit("debug", {
              action: "response",
              error,
              request: request2,
              provider: this
            });
            batch.forEach((inflightRequest2) => {
              inflightRequest2.reject(error);
            });
          });
        }, 10);
      }
      return promise;
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/nodesmith-provider.js
  "use strict";
  var logger39 = new Logger(version23);
  var defaultApiKey3 = "ETHERS_JS_SHARED";
  var NodesmithProvider = class extends UrlJsonRpcProvider {
    static getApiKey(apiKey) {
      if (apiKey && typeof apiKey !== "string") {
        logger39.throwArgumentError("invalid apiKey", "apiKey", apiKey);
      }
      return apiKey || defaultApiKey3;
    }
    static getUrl(network, apiKey) {
      logger39.warn("NodeSmith will be discontinued on 2019-12-20; please migrate to another platform.");
      let host = null;
      switch (network.name) {
        case "homestead":
          host = "https://ethereum.api.nodesmith.io/v1/mainnet/jsonrpc";
          break;
        case "ropsten":
          host = "https://ethereum.api.nodesmith.io/v1/ropsten/jsonrpc";
          break;
        case "rinkeby":
          host = "https://ethereum.api.nodesmith.io/v1/rinkeby/jsonrpc";
          break;
        case "goerli":
          host = "https://ethereum.api.nodesmith.io/v1/goerli/jsonrpc";
          break;
        case "kovan":
          host = "https://ethereum.api.nodesmith.io/v1/kovan/jsonrpc";
          break;
        default:
          logger39.throwArgumentError("unsupported network", "network", arguments[0]);
      }
      return host + "?apiKey=" + apiKey;
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/pocket-provider.js
  "use strict";
  var logger40 = new Logger(version23);
  var defaultApplicationIds = {
    homestead: "6004bcd10040261633ade990",
    ropsten: "6004bd4d0040261633ade991",
    rinkeby: "6004bda20040261633ade994",
    goerli: "6004bd860040261633ade992"
  };
  var PocketProvider = class extends UrlJsonRpcProvider {
    constructor(network, apiKey) {
      if (apiKey == null) {
        const n = getStatic(new.target, "getNetwork")(network);
        if (n) {
          const applicationId = defaultApplicationIds[n.name];
          if (applicationId) {
            apiKey = {
              applicationId,
              loadBalancer: true
            };
          }
        }
        if (apiKey == null) {
          logger40.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
            argument: "network",
            value: network
          });
        }
      }
      super(network, apiKey);
    }
    static getApiKey(apiKey) {
      if (apiKey == null) {
        logger40.throwArgumentError("PocketProvider.getApiKey does not support null apiKey", "apiKey", apiKey);
      }
      const apiKeyObj = {
        applicationId: null,
        loadBalancer: false,
        applicationSecretKey: null
      };
      if (typeof apiKey === "string") {
        apiKeyObj.applicationId = apiKey;
      } else if (apiKey.applicationSecretKey != null) {
        logger40.assertArgument(typeof apiKey.applicationId === "string", "applicationSecretKey requires an applicationId", "applicationId", apiKey.applicationId);
        logger40.assertArgument(typeof apiKey.applicationSecretKey === "string", "invalid applicationSecretKey", "applicationSecretKey", "[REDACTED]");
        apiKeyObj.applicationId = apiKey.applicationId;
        apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;
        apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
      } else if (apiKey.applicationId) {
        logger40.assertArgument(typeof apiKey.applicationId === "string", "apiKey.applicationId must be a string", "apiKey.applicationId", apiKey.applicationId);
        apiKeyObj.applicationId = apiKey.applicationId;
        apiKeyObj.loadBalancer = !!apiKey.loadBalancer;
      } else {
        logger40.throwArgumentError("unsupported PocketProvider apiKey", "apiKey", apiKey);
      }
      return apiKeyObj;
    }
    static getUrl(network, apiKey) {
      let host = null;
      switch (network ? network.name : "unknown") {
        case "homestead":
          host = "eth-mainnet.gateway.pokt.network";
          break;
        case "ropsten":
          host = "eth-ropsten.gateway.pokt.network";
          break;
        case "rinkeby":
          host = "eth-rinkeby.gateway.pokt.network";
          break;
        case "goerli":
          host = "eth-goerli.gateway.pokt.network";
          break;
        default:
          logger40.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
            argument: "network",
            value: network
          });
      }
      let url = null;
      if (apiKey.loadBalancer) {
        url = `https://${host}/v1/lb/${apiKey.applicationId}`;
      } else {
        url = `https://${host}/v1/${apiKey.applicationId}`;
      }
      const connection = { url };
      connection.headers = {};
      if (apiKey.applicationSecretKey != null) {
        connection.user = "";
        connection.password = apiKey.applicationSecretKey;
      }
      return connection;
    }
    isCommunityResource() {
      return this.applicationId === defaultApplicationIds[this.network.name];
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/web3-provider.js
  "use strict";
  var logger41 = new Logger(version23);
  var _nextId = 1;
  function buildWeb3LegacyFetcher(provider, sendFunc) {
    const fetcher = "Web3LegacyFetcher";
    return function(method, params) {
      if (method == "eth_sign" && (provider.isMetaMask || provider.isStatus)) {
        method = "personal_sign";
        params = [params[1], params[0]];
      }
      const request = {
        method,
        params,
        id: _nextId++,
        jsonrpc: "2.0"
      };
      return new Promise((resolve, reject) => {
        this.emit("debug", {
          action: "request",
          fetcher,
          request: deepCopy(request),
          provider: this
        });
        sendFunc(request, (error, response) => {
          if (error) {
            this.emit("debug", {
              action: "response",
              fetcher,
              error,
              request,
              provider: this
            });
            return reject(error);
          }
          this.emit("debug", {
            action: "response",
            fetcher,
            request,
            response,
            provider: this
          });
          if (response.error) {
            const error2 = new Error(response.error.message);
            error2.code = response.error.code;
            error2.data = response.error.data;
            return reject(error2);
          }
          resolve(response.result);
        });
      });
    };
  }
  function buildEip1193Fetcher(provider) {
    return function(method, params) {
      if (params == null) {
        params = [];
      }
      if (method == "eth_sign" && (provider.isMetaMask || provider.isStatus)) {
        method = "personal_sign";
        params = [params[1], params[0]];
      }
      const request = { method, params };
      this.emit("debug", {
        action: "request",
        fetcher: "Eip1193Fetcher",
        request: deepCopy(request),
        provider: this
      });
      return provider.request(request).then((response) => {
        this.emit("debug", {
          action: "response",
          fetcher: "Eip1193Fetcher",
          request,
          response,
          provider: this
        });
        return response;
      }, (error) => {
        this.emit("debug", {
          action: "response",
          fetcher: "Eip1193Fetcher",
          request,
          error,
          provider: this
        });
        throw error;
      });
    };
  }
  var Web3Provider = class extends JsonRpcProvider {
    constructor(provider, network) {
      logger41.checkNew(new.target, Web3Provider);
      if (provider == null) {
        logger41.throwArgumentError("missing provider", "provider", provider);
      }
      let path = null;
      let jsonRpcFetchFunc = null;
      let subprovider = null;
      if (typeof provider === "function") {
        path = "unknown:";
        jsonRpcFetchFunc = provider;
      } else {
        path = provider.host || provider.path || "";
        if (!path && provider.isMetaMask) {
          path = "metamask";
        }
        subprovider = provider;
        if (provider.request) {
          if (path === "") {
            path = "eip-1193:";
          }
          jsonRpcFetchFunc = buildEip1193Fetcher(provider);
        } else if (provider.sendAsync) {
          jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
        } else if (provider.send) {
          jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
        } else {
          logger41.throwArgumentError("unsupported provider", "provider", provider);
        }
        if (!path) {
          path = "unknown:";
        }
      }
      super(path, network);
      defineReadOnly(this, "jsonRpcFetchFunc", jsonRpcFetchFunc);
      defineReadOnly(this, "provider", subprovider);
    }
    send(method, params) {
      return this.jsonRpcFetchFunc(method, params);
    }
  };

  // node_modules/@ethersproject/providers/lib.esm/index.js
  "use strict";
  var logger42 = new Logger(version23);
  function getDefaultProvider(network, options) {
    if (network == null) {
      network = "homestead";
    }
    if (typeof network === "string") {
      const match = network.match(/^(ws|http)s?:/i);
      if (match) {
        switch (match[1]) {
          case "http":
            return new JsonRpcProvider(network);
          case "ws":
            return new WebSocketProvider(network);
          default:
            logger42.throwArgumentError("unsupported URL scheme", "network", network);
        }
      }
    }
    const n = getNetwork(network);
    if (!n || !n._defaultProvider) {
      logger42.throwError("unsupported getDefaultProvider network", Logger.errors.NETWORK_ERROR, {
        operation: "getDefaultProvider",
        network
      });
    }
    return n._defaultProvider({
      FallbackProvider,
      AlchemyProvider,
      CloudflareProvider,
      EtherscanProvider,
      InfuraProvider,
      JsonRpcProvider,
      NodesmithProvider,
      PocketProvider,
      Web3Provider,
      IpcProvider
    }, options);
  }

  // node_modules/ethers/lib.esm/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    AbiCoder: () => AbiCoder,
    ErrorFragment: () => ErrorFragment,
    EventFragment: () => EventFragment,
    FormatTypes: () => FormatTypes,
    Fragment: () => Fragment,
    FunctionFragment: () => FunctionFragment,
    HDNode: () => HDNode,
    Indexed: () => Indexed,
    Interface: () => Interface,
    LogDescription: () => LogDescription,
    Logger: () => Logger,
    ParamType: () => ParamType,
    RLP: () => lib_exports,
    SigningKey: () => SigningKey,
    SupportedAlgorithm: () => SupportedAlgorithm,
    TransactionDescription: () => TransactionDescription,
    UnicodeNormalizationForm: () => UnicodeNormalizationForm,
    Utf8ErrorFuncs: () => Utf8ErrorFuncs,
    Utf8ErrorReason: () => Utf8ErrorReason,
    _TypedDataEncoder: () => TypedDataEncoder,
    _fetchData: () => _fetchData,
    _toEscapedUtf8String: () => _toEscapedUtf8String,
    accessListify: () => accessListify,
    arrayify: () => arrayify,
    base58: () => Base58,
    base64: () => lib_exports3,
    checkProperties: () => checkProperties,
    checkResultErrors: () => checkResultErrors,
    commify: () => commify,
    computeAddress: () => computeAddress,
    computeHmac: () => computeHmac,
    computePublicKey: () => computePublicKey,
    concat: () => concat,
    deepCopy: () => deepCopy,
    defaultAbiCoder: () => defaultAbiCoder,
    defaultPath: () => defaultPath,
    defineReadOnly: () => defineReadOnly,
    entropyToMnemonic: () => entropyToMnemonic,
    fetchJson: () => fetchJson,
    formatBytes32String: () => formatBytes32String,
    formatEther: () => formatEther,
    formatUnits: () => formatUnits,
    getAccountPath: () => getAccountPath,
    getAddress: () => getAddress,
    getContractAddress: () => getContractAddress,
    getCreate2Address: () => getCreate2Address,
    getIcapAddress: () => getIcapAddress,
    getJsonWalletAddress: () => getJsonWalletAddress,
    getStatic: () => getStatic,
    hashMessage: () => hashMessage,
    hexConcat: () => hexConcat,
    hexDataLength: () => hexDataLength,
    hexDataSlice: () => hexDataSlice,
    hexStripZeros: () => hexStripZeros,
    hexValue: () => hexValue,
    hexZeroPad: () => hexZeroPad,
    hexlify: () => hexlify,
    id: () => id,
    isAddress: () => isAddress,
    isBytes: () => isBytes,
    isBytesLike: () => isBytesLike,
    isHexString: () => isHexString,
    isValidMnemonic: () => isValidMnemonic,
    isValidName: () => isValidName,
    joinSignature: () => joinSignature,
    keccak256: () => keccak256,
    mnemonicToEntropy: () => mnemonicToEntropy,
    mnemonicToSeed: () => mnemonicToSeed,
    namehash: () => namehash,
    nameprep: () => nameprep,
    parseBytes32String: () => parseBytes32String,
    parseEther: () => parseEther,
    parseTransaction: () => parse,
    parseUnits: () => parseUnits,
    poll: () => poll,
    randomBytes: () => randomBytes,
    recoverAddress: () => recoverAddress,
    recoverPublicKey: () => recoverPublicKey,
    resolveProperties: () => resolveProperties,
    ripemd160: () => ripemd160,
    serializeTransaction: () => serialize,
    sha256: () => sha256,
    sha512: () => sha512,
    shallowCopy: () => shallowCopy,
    shuffled: () => shuffled,
    solidityKeccak256: () => keccak2562,
    solidityPack: () => pack2,
    soliditySha256: () => sha2562,
    splitSignature: () => splitSignature,
    stripZeros: () => stripZeros,
    toUtf8Bytes: () => toUtf8Bytes,
    toUtf8CodePoints: () => toUtf8CodePoints,
    toUtf8String: () => toUtf8String,
    verifyMessage: () => verifyMessage,
    verifyTypedData: () => verifyTypedData,
    zeroPad: () => zeroPad
  });

  // node_modules/@ethersproject/solidity/lib.esm/index.js
  "use strict";
  var regexBytes = new RegExp("^bytes([0-9]+)$");
  var regexNumber = new RegExp("^(u?int)([0-9]*)$");
  var regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");
  var Zeros2 = "0000000000000000000000000000000000000000000000000000000000000000";
  function _pack(type, value, isArray) {
    switch (type) {
      case "address":
        if (isArray) {
          return zeroPad(value, 32);
        }
        return arrayify(value);
      case "string":
        return toUtf8Bytes(value);
      case "bytes":
        return arrayify(value);
      case "bool":
        value = value ? "0x01" : "0x00";
        if (isArray) {
          return zeroPad(value, 32);
        }
        return arrayify(value);
    }
    let match = type.match(regexNumber);
    if (match) {
      let size = parseInt(match[2] || "256");
      if (match[2] && String(size) !== match[2] || size % 8 !== 0 || size === 0 || size > 256) {
        throw new Error("invalid number type - " + type);
      }
      if (isArray) {
        size = 256;
      }
      value = BigNumber.from(value).toTwos(size);
      return zeroPad(value, size / 8);
    }
    match = type.match(regexBytes);
    if (match) {
      const size = parseInt(match[1]);
      if (String(size) !== match[1] || size === 0 || size > 32) {
        throw new Error("invalid bytes type - " + type);
      }
      if (arrayify(value).byteLength !== size) {
        throw new Error("invalid value for " + type);
      }
      if (isArray) {
        return arrayify((value + Zeros2).substring(0, 66));
      }
      return value;
    }
    match = type.match(regexArray);
    if (match && Array.isArray(value)) {
      const baseType = match[1];
      const count = parseInt(match[2] || String(value.length));
      if (count != value.length) {
        throw new Error("invalid value for " + type);
      }
      const result = [];
      value.forEach(function(value2) {
        result.push(_pack(baseType, value2, true));
      });
      return concat(result);
    }
    throw new Error("invalid type - " + type);
  }
  function pack2(types, values) {
    if (types.length != values.length) {
      throw new Error("type/value count mismatch");
    }
    const tight = [];
    types.forEach(function(type, index) {
      tight.push(_pack(type, values[index]));
    });
    return hexlify(concat(tight));
  }
  function keccak2562(types, values) {
    return keccak256(pack2(types, values));
  }
  function sha2562(types, values) {
    return sha256(pack2(types, values));
  }

  // node_modules/@ethersproject/units/lib.esm/_version.js
  var version24 = "units/5.2.0";

  // node_modules/@ethersproject/units/lib.esm/index.js
  "use strict";
  var logger43 = new Logger(version24);
  var names = [
    "wei",
    "kwei",
    "mwei",
    "gwei",
    "szabo",
    "finney",
    "ether"
  ];
  function commify(value) {
    const comps = String(value).split(".");
    if (comps.length > 2 || !comps[0].match(/^-?[0-9]*$/) || comps[1] && !comps[1].match(/^[0-9]*$/) || value === "." || value === "-.") {
      logger43.throwArgumentError("invalid value", "value", value);
    }
    let whole = comps[0];
    let negative = "";
    if (whole.substring(0, 1) === "-") {
      negative = "-";
      whole = whole.substring(1);
    }
    while (whole.substring(0, 1) === "0") {
      whole = whole.substring(1);
    }
    if (whole === "") {
      whole = "0";
    }
    let suffix = "";
    if (comps.length === 2) {
      suffix = "." + (comps[1] || "0");
    }
    while (suffix.length > 2 && suffix[suffix.length - 1] === "0") {
      suffix = suffix.substring(0, suffix.length - 1);
    }
    const formatted = [];
    while (whole.length) {
      if (whole.length <= 3) {
        formatted.unshift(whole);
        break;
      } else {
        const index = whole.length - 3;
        formatted.unshift(whole.substring(index));
        whole = whole.substring(0, index);
      }
    }
    return negative + formatted.join(",") + suffix;
  }
  function formatUnits(value, unitName) {
    if (typeof unitName === "string") {
      const index = names.indexOf(unitName);
      if (index !== -1) {
        unitName = 3 * index;
      }
    }
    return formatFixed(value, unitName != null ? unitName : 18);
  }
  function parseUnits(value, unitName) {
    if (typeof value !== "string") {
      logger43.throwArgumentError("value must be a string", "value", value);
    }
    if (typeof unitName === "string") {
      const index = names.indexOf(unitName);
      if (index !== -1) {
        unitName = 3 * index;
      }
    }
    return parseFixed(value, unitName != null ? unitName : 18);
  }
  function formatEther(wei) {
    return formatUnits(wei, 18);
  }
  function parseEther(ether) {
    return parseUnits(ether, 18);
  }

  // node_modules/ethers/lib.esm/utils.js
  "use strict";

  // node_modules/ethers/lib.esm/_version.js
  var version25 = "ethers/5.2.0";

  // node_modules/ethers/lib.esm/ethers.js
  "use strict";
  var logger44 = new Logger(version25);

  // node_modules/ethers/lib.esm/index.js
  "use strict";
  try {
    const anyGlobal2 = window;
    if (anyGlobal2._ethers == null) {
      anyGlobal2._ethers = ethers_exports;
    }
  } catch (error) {
  }

  // contracts/ENSRegistry.json
  var abi = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "ApprovalForAll",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "label",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "NewOwner",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "resolver",
          type: "address"
        }
      ],
      name: "NewResolver",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "uint64",
          name: "ttl",
          type: "uint64"
        }
      ],
      name: "NewTTL",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "address",
          name: "resolver",
          type: "address"
        },
        {
          internalType: "uint64",
          name: "ttl",
          type: "uint64"
        }
      ],
      name: "setRecord",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "label",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "address",
          name: "resolver",
          type: "address"
        },
        {
          internalType: "uint64",
          name: "ttl",
          type: "uint64"
        }
      ],
      name: "setSubnodeRecord",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "setOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "label",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "setSubnodeOwner",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "resolver",
          type: "address"
        }
      ],
      name: "setResolver",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "uint64",
          name: "ttl",
          type: "uint64"
        }
      ],
      name: "setTTL",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "resolver",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "ttl",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "recordExists",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "address",
          name: "operator",
          type: "address"
        }
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    }
  ];

  // contracts/BaseRegistrarImplementation.json
  var abi2 = [
    {
      inputs: [
        {
          internalType: "contract ENS",
          name: "_ens",
          type: "address"
        },
        {
          internalType: "bytes32",
          name: "_baseNode",
          type: "bytes32"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "ApprovalForAll",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "controller",
          type: "address"
        }
      ],
      name: "ControllerAdded",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "controller",
          type: "address"
        }
      ],
      name: "ControllerRemoved",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "expires",
          type: "uint256"
        }
      ],
      name: "NameMigrated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "expires",
          type: "uint256"
        }
      ],
      name: "NameRegistered",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "expires",
          type: "uint256"
        }
      ],
      name: "NameRenewed",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    },
    {
      inputs: [],
      name: "GRACE_PERIOD",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "baseNode",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "controllers",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "ens",
      outputs: [
        {
          internalType: "contract ENS",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "address",
          name: "operator",
          type: "address"
        }
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes"
        }
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address"
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool"
        }
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address"
        },
        {
          internalType: "address",
          name: "to",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256"
        }
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "controller",
          type: "address"
        }
      ],
      name: "addController",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "controller",
          type: "address"
        }
      ],
      name: "removeController",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "resolver",
          type: "address"
        }
      ],
      name: "setResolver",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        }
      ],
      name: "nameExpires",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        }
      ],
      name: "available",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256"
        }
      ],
      name: "register",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256"
        }
      ],
      name: "registerOnly",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256"
        }
      ],
      name: "renew",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256"
        },
        {
          internalType: "address",
          name: "owner",
          type: "address"
        }
      ],
      name: "reclaim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceID",
          type: "bytes4"
        }
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    }
  ];

  // contracts/PublicResolver.json
  var abi3 = [
    {
      inputs: [
        {
          internalType: "contract ENS",
          name: "_ens",
          type: "address"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "contentType",
          type: "uint256"
        }
      ],
      name: "ABIChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "address",
          name: "a",
          type: "address"
        }
      ],
      name: "AddrChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "coinType",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "newAddress",
          type: "bytes"
        }
      ],
      name: "AddressChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "target",
          type: "address"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isAuthorised",
          type: "bool"
        }
      ],
      name: "AuthorisationChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "hash",
          type: "bytes"
        }
      ],
      name: "ContenthashChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "name",
          type: "bytes"
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "resource",
          type: "uint16"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "record",
          type: "bytes"
        }
      ],
      name: "DNSRecordChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "name",
          type: "bytes"
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "resource",
          type: "uint16"
        }
      ],
      name: "DNSRecordDeleted",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "DNSZoneCleared",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "lastzonehash",
          type: "bytes"
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "zonehash",
          type: "bytes"
        }
      ],
      name: "DNSZonehashChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "bytes4",
          name: "interfaceID",
          type: "bytes4"
        },
        {
          indexed: false,
          internalType: "address",
          name: "implementer",
          type: "address"
        }
      ],
      name: "InterfaceChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string"
        }
      ],
      name: "NameChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "x",
          type: "bytes32"
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "y",
          type: "bytes32"
        }
      ],
      name: "PubkeyChanged",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          indexed: true,
          internalType: "string",
          name: "indexedKey",
          type: "string"
        },
        {
          indexed: false,
          internalType: "string",
          name: "key",
          type: "string"
        }
      ],
      name: "TextChanged",
      type: "event"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "contentTypes",
          type: "uint256"
        }
      ],
      name: "ABI",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "addr",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "coinType",
          type: "uint256"
        }
      ],
      name: "addr",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        },
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "authorisations",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "clearDNSZone",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "contenthash",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "name",
          type: "bytes32"
        },
        {
          internalType: "uint16",
          name: "resource",
          type: "uint16"
        }
      ],
      name: "dnsRecord",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "name",
          type: "bytes32"
        }
      ],
      name: "hasDNSRecords",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes4",
          name: "interfaceID",
          type: "bytes4"
        }
      ],
      name: "interfaceImplementer",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "pubkey",
      outputs: [
        {
          internalType: "bytes32",
          name: "x",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "y",
          type: "bytes32"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "contentType",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes"
        }
      ],
      name: "setABI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "uint256",
          name: "coinType",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "a",
          type: "bytes"
        }
      ],
      name: "setAddr",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "a",
          type: "address"
        }
      ],
      name: "setAddr",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes",
          name: "hash",
          type: "bytes"
        }
      ],
      name: "setContenthash",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes"
        }
      ],
      name: "setDNSRecords",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes4",
          name: "interfaceID",
          type: "bytes4"
        },
        {
          internalType: "address",
          name: "implementer",
          type: "address"
        }
      ],
      name: "setInterface",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "string",
          name: "name",
          type: "string"
        }
      ],
      name: "setName",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "x",
          type: "bytes32"
        },
        {
          internalType: "bytes32",
          name: "y",
          type: "bytes32"
        }
      ],
      name: "setPubkey",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "string",
          name: "key",
          type: "string"
        },
        {
          internalType: "string",
          name: "value",
          type: "string"
        }
      ],
      name: "setText",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "bytes",
          name: "hash",
          type: "bytes"
        }
      ],
      name: "setZonehash",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "string",
          name: "key",
          type: "string"
        }
      ],
      name: "text",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        }
      ],
      name: "zonehash",
      outputs: [
        {
          internalType: "bytes",
          name: "",
          type: "bytes"
        }
      ],
      stateMutability: "view",
      type: "function",
      constant: true
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "node",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "target",
          type: "address"
        },
        {
          internalType: "bool",
          name: "isAuthorised",
          type: "bool"
        }
      ],
      name: "setAuthorisation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]"
        }
      ],
      name: "multicall",
      outputs: [
        {
          internalType: "bytes[]",
          name: "results",
          type: "bytes[]"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceID",
          type: "bytes4"
        }
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "pure",
      type: "function",
      constant: true
    }
  ];

  // index.js
  function normalize(name2) {
    return name2;
  }
  function decodeLabelhash(hash3) {
    if (!(hash3.startsWith("[") && hash3.endsWith("]"))) {
      throw Error("Expected encoded labelhash to start and end with square brackets");
    }
    if (hash3.length !== 66) {
      throw Error("Expected encoded labelhash to have a length of 66");
    }
    return `${hash3.slice(1, -1)}`;
  }
  function isEncodedLabelhash(hash3) {
    return hash3.startsWith("[") && hash3.endsWith("]") && hash3.length === 66;
  }
  function namehash2(inputName) {
    if (inputName === "[root]") {
      return "0x0000000000000000000000000000000000000000000000000000000000000000";
    }
    let node = "";
    for (let i = 0; i < 32; i++) {
      node += "00";
    }
    if (inputName) {
      const labels = inputName.split(".");
      for (let i = labels.length - 1; i >= 0; i--) {
        let labelSha;
        if (isEncodedLabelhash(labels[i])) {
          labelSha = decodeLabelhash(labels[i]);
        } else {
          let normalisedLabel = normalize(labels[i]);
          labelSha = (0, import_js_sha32.keccak_256)(normalisedLabel);
        }
        node = (0, import_js_sha32.keccak_256)(new import_buffer.Buffer(node + labelSha, "hex"));
      }
    }
    return "0x" + node;
  }
  var PNS = class {
    constructor() {
    }
    connect() {
      if (typeof ethereum !== "undefined") {
        ethereum.enable().catch(console.error);
      }
    }
    async getAccount() {
      let accounts = await ethereum.request({ method: "eth_accounts" });
      let from = accounts[0];
      if (!from) {
        return await this.connect();
      }
      this.account = from;
      return from;
    }
    async getProvider(ensAddress, resolverAddress, registrarAddress, reverseRegistrarAddress) {
      let accounts = await ethereum.request({ method: "eth_accounts" });
      this.account = accounts[0];
      if (!this.account) {
        return await this.connect();
      }
      this.provider = new ethers_exports.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      this.ensContract = new ethers_exports.Contract(ensAddress, abi, this.signer);
      this.resolverContract = new ethers_exports.Contract(resolverAddress, abi3, this.signer);
      this.registrarContract = new ethers_exports.Contract(registrarAddress, abi2, this.signer);
      return {
        provider: this.provider,
        signer: this.signer
      };
    }
    owner(node) {
      let namehashed = namehash2(node);
      return this.ensContract.owner(namehashed);
    }
    register(label) {
      label = "0x" + (0, import_js_sha32.keccak_256)(label);
      return this.registrarContract.register(label, this.account);
    }
    createSubdomain(node, label) {
      let namehashed = namehash2(node);
      label = "0x" + (0, import_js_sha32.keccak_256)(label);
      return this.ensContract.setSubnodeOwner(namehashed, label, this.account);
    }
  };
  function start() {
    const pns = new PNS();
    document.querySelector("button").addEventListener("click", async () => {
      let ensAddress = "0xef9Da876d7f9e5b1E8919a7CF94A327d57c6CAb7";
      let resolverAddress = "0xd581f8C423408d08E8FDa4cEcDF4951D29867f89";
      let registrarAddress = "0x09270d622cE1E2D2d53DA920EE9577dB83A167CB";
      let reverseRegistrarAddress = "0x47FeB315728FeC50b2090035cEed0bE65065C14a";
      console.log("account", await pns.getAccount());
      console.log(await pns.getProvider(ensAddress, resolverAddress, registrarAddress, reverseRegistrarAddress));
      console.log("owner dot", await pns.owner("dot"));
      console.log("owner super.dot", await pns.owner("super.dot"));
      console.log("register hero", await pns.owner("hero.dot"));
      console.log("register hero", await pns.owner("hero.dot"));
      console.log("register hero.hero.dot", await pns.owner("hero.hero.dot"));
    });
  }
  if (document) {
    start();
  }
})();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.5.7
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2016
 * @license MIT
 */
