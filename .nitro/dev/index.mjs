import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import destr from 'file:///home/nex/projects/budget-me-server/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestURL, getRequestHeader, getResponseHeader, getRequestHeaders, setResponseHeaders, setResponseStatus, send, appendResponseHeader, removeResponseHeader, createError as createError$1, setResponseHeader, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, readBody, getQuery as getQuery$1 } from 'file:///home/nex/projects/budget-me-server/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///home/nex/projects/budget-me-server/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///home/nex/projects/budget-me-server/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///home/nex/projects/budget-me-server/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file:///home/nex/projects/budget-me-server/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///home/nex/projects/budget-me-server/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///home/nex/projects/budget-me-server/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///home/nex/projects/budget-me-server/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///home/nex/projects/budget-me-server/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///home/nex/projects/budget-me-server/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///home/nex/projects/budget-me-server/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///home/nex/projects/budget-me-server/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///home/nex/projects/budget-me-server/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import consola from 'file:///home/nex/projects/budget-me-server/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///home/nex/projects/budget-me-server/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///home/nex/projects/budget-me-server/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///home/nex/projects/budget-me-server/node_modules/source-map/source-map.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file:///home/nex/projects/budget-me-server/node_modules/pathe/dist/index.mjs';
import { initializeApp, cert } from 'file:///home/nex/projects/budget-me-server/node_modules/firebase-admin/lib/esm/app/index.js';
import { getAuth } from 'file:///home/nex/projects/budget-me-server/node_modules/firebase-admin/lib/esm/auth/index.js';
import { Server } from 'node:http';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { relations, eq, and, gte, lte, desc, count } from 'file:///home/nex/projects/budget-me-server/node_modules/drizzle-orm/index.js';
import dayjs from 'file:///home/nex/projects/budget-me-server/node_modules/dayjs/dayjs.min.js';
import { drizzle } from 'file:///home/nex/projects/budget-me-server/node_modules/drizzle-orm/node-postgres/index.js';
import { Pool } from 'file:///home/nex/projects/budget-me-server/node_modules/pg/esm/index.mjs';
import { pgTable, pgEnum, timestamp, char, numeric, text, uuid, boolean, integer } from 'file:///home/nex/projects/budget-me-server/node_modules/drizzle-orm/pg-core/index.js';

const serverAssets = [{"baseName":"server","dir":"/home/nex/projects/budget-me-server/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/nex/projects/budget-me-server"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/nex/projects/budget-me-server/server"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/nex/projects/budget-me-server/.nitro"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/nex/projects/budget-me-server/.nitro/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/home/nex/projects/budget-me-server/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {}
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: undefined,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const plugins = [
  
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _e59J2Y = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VALID_TOKENS = (process.env.API_TOKENS || "").split(",").filter(Boolean);
const _xUoXbK = eventHandler((event) => {
  return requireApiToken(event);
});
async function verifyApiToken(event) {
  const authHeader = getHeader(event, "x-api-token");
  if (!authHeader) {
    return false;
  }
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  return VALID_TOKENS.includes(token.trim());
}
async function requireApiToken(event) {
  const isValid = await verifyApiToken(event);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      data: {
        message: "Invalid or missing API token"
      }
    });
  }
}
function getHeader(event, name) {
  const value = event.headers.get(name);
  return value != null ? value : void 0;
}
function createError(options) {
  const error = new Error(options.statusMessage);
  error.statusCode = options.statusCode;
  error.statusMessage = options.statusMessage;
  error.data = options.data;
  return error;
}

let firebaseApp;
function initializeFirebase() {
  if (firebaseApp) {
    return firebaseApp;
  }
  firebaseApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : void 0
    })
  });
  return firebaseApp;
}
function getFirebaseAuth() {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return getAuth(firebaseApp);
}

const PUBLIC_URLS = ["/ping", "/carousel"];
const _ZF_1gP = eventHandler(async (event) => {
  if (PUBLIC_URLS.includes(getRequestURL(event).pathname)) {
    return;
  }
  const auth = getFirebaseAuth();
  const authHeader = event.req.headers["authorization"];
  if (!authHeader) {
    throw createError$1({
      statusCode: 401,
      statusMessage: "Unauthorized",
      data: {
        message: "You are not authorized. Maybe you forgot to signin?"
      }
    });
  }
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  try {
    await auth.verifyIdToken(token);
    const user = await auth.getUser((await auth.verifyIdToken(token)).uid);
    event.context.user = user;
  } catch (error) {
    throw createError$1({
      statusCode: 401,
      statusMessage: "Unauthorized",
      data: {
        message: "Invalid or expired token. Please signin again."
      }
    });
  }
});

const _lazy_r1DGKI = () => Promise.resolve().then(function () { return index_get$l; });
const _lazy_c19YEB = () => Promise.resolve().then(function () { return index_post$b; });
const _lazy_jnOBWn = () => Promise.resolve().then(function () { return index_post$9; });
const _lazy_GAqini = () => Promise.resolve().then(function () { return index_get$j; });
const _lazy_yVq_XB = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_FQtkuh = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_re5qFV = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_LlFHyc = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_omPn6K = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_kLe1ph = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_74fx5s = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_Q05I6c = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_7euJqI = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_2gUd0o = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_Rrn4m5 = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_nCWDWZ = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_NQWhoq = () => Promise.resolve().then(function () { return index_get$1; });

const handlers = [
  { route: '', handler: _e59J2Y, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _xUoXbK, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _ZF_1gP, lazy: false, middleware: true, method: undefined },
  { route: '/accounts', handler: _lazy_r1DGKI, lazy: true, middleware: false, method: "get" },
  { route: '/accounts', handler: _lazy_c19YEB, lazy: true, middleware: false, method: "post" },
  { route: '/accounts/new', handler: _lazy_jnOBWn, lazy: true, middleware: false, method: "post" },
  { route: '/budgets/charts/usage', handler: _lazy_GAqini, lazy: true, middleware: false, method: "get" },
  { route: '/budgets', handler: _lazy_yVq_XB, lazy: true, middleware: false, method: "get" },
  { route: '/budgets', handler: _lazy_FQtkuh, lazy: true, middleware: false, method: "post" },
  { route: '/budgets/missing', handler: _lazy_re5qFV, lazy: true, middleware: false, method: "get" },
  { route: '/carousel', handler: _lazy_LlFHyc, lazy: true, middleware: false, method: "get" },
  { route: '/categories', handler: _lazy_omPn6K, lazy: true, middleware: false, method: "get" },
  { route: '/is-account-setup-complete', handler: _lazy_kLe1ph, lazy: true, middleware: false, method: "get" },
  { route: '/is-account-setup-complete', handler: _lazy_74fx5s, lazy: true, middleware: false, method: "post" },
  { route: '/ping', handler: _lazy_Q05I6c, lazy: true, middleware: false, method: "get" },
  { route: '/prompts', handler: _lazy_7euJqI, lazy: true, middleware: false, method: "get" },
  { route: '/transactions', handler: _lazy_2gUd0o, lazy: true, middleware: false, method: "get" },
  { route: '/transactions', handler: _lazy_Rrn4m5, lazy: true, middleware: false, method: "post" },
  { route: '/transactions/manual', handler: _lazy_nCWDWZ, lazy: true, middleware: false, method: "post" },
  { route: '/transactions/stats', handler: _lazy_NQWhoq, lazy: true, middleware: false, method: "get" }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError$1({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError$1({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const CarouselTable = pgTable("carousels", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  subText: text("sub_text").notNull(),
  imageUrl: text("image_url")
});
const UserProfileTable = pgTable("user_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().unique(),
  isAccountSetupComplete: boolean("is_account_setup_complete").notNull().default(false),
  isNextMonthBudgetReady: boolean("is_next_month_budget_ready").notNull().default(false)
});
const AccoutType = pgEnum("account_type", ["BANK", "WALLET", "CREDIT_CARD", "CASH"]);
const AccountTable = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  accountType: AccoutType("account_type").notNull(),
  name: char("name", { length: 60 }).notNull(),
  balance: numeric("balance", { precision: 15, scale: 2 }).notNull().default("0.00"),
  currency: char("currency", { length: 3 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
const CategoryGroupTable = pgTable("category_groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  order: integer("order").notNull().default(0)
});
const MonthlyBudgetTable = pgTable("monthly_budgets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  groupId: uuid("group_id").references(() => CategoryGroupTable.id, { onDelete: "cascade" }),
  month: text("month").notNull(),
  // Format: "YYYY-MM"
  assigned: numeric("assigned", { precision: 15, scale: 2 }).notNull().default("0.00"),
  remaining: numeric("remaining", { precision: 15, scale: 2 }).notNull().default("0.00"),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
const TransactionType = pgEnum("transaction_type", ["INCOME", "EXPENSE", "TRANSFER"]);
const TransactionTable = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  groupId: uuid("group_id").references(() => CategoryGroupTable.id, { onDelete: "set null" }),
  budgetId: uuid("budget_id").references(() => MonthlyBudgetTable.id, { onDelete: "set null" }),
  title: char("title", { length: 90 }).notNull(),
  category: text("category").notNull(),
  accountId: uuid("account_id").notNull(),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  // Negative for spending
  date: timestamp("date").notNull().defaultNow(),
  type: TransactionType("type").notNull(),
  memo: text("memo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
const CategoryRelations = relations(CategoryGroupTable, ({ one, many }) => ({
  group: one(CategoryGroupTable, {
    fields: [CategoryGroupTable.id],
    references: [CategoryGroupTable.id]
  }),
  budgets: many(MonthlyBudgetTable),
  transactions: many(TransactionTable)
}));
const MonthlyBudgetRelations = relations(MonthlyBudgetTable, ({ one }) => ({
  category: one(CategoryGroupTable, {
    fields: [MonthlyBudgetTable.groupId],
    references: [CategoryGroupTable.id]
  })
}));
const TransactionRelations = relations(TransactionTable, ({ one }) => ({
  category: one(CategoryGroupTable, {
    fields: [TransactionTable.groupId],
    references: [CategoryGroupTable.id]
  })
}));

const schema = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AccountTable: AccountTable,
  AccoutType: AccoutType,
  CarouselTable: CarouselTable,
  CategoryGroupTable: CategoryGroupTable,
  CategoryRelations: CategoryRelations,
  MonthlyBudgetRelations: MonthlyBudgetRelations,
  MonthlyBudgetTable: MonthlyBudgetTable,
  TransactionRelations: TransactionRelations,
  TransactionTable: TransactionTable,
  TransactionType: TransactionType,
  UserProfileTable: UserProfileTable
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const db = drizzle({ client: pool, schema });

const index_get$k = eventHandler(async (event) => {
  try {
    const userId = event.context.user.uid;
    const accounts = await db.query.AccountTable.findMany({
      where: () => eq(AccountTable.userId, userId)
    }).execute();
    return {
      statusCode: 200,
      message: "Fetched accounts successfully",
      data: {
        accounts
      }
    };
  } catch (error) {
    return createError$1({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: {
        message: "An error occurred while fetching accounts."
      }
    });
  }
});

const index_get$l = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$k
});

const index_post$a = eventHandler(async (event) => {
  var _a;
  try {
    const userId = event.context.user.uid;
    const profile = await db.query.UserProfileTable.findFirst({
      where: () => eq(UserProfileTable.userId, userId)
    }).execute();
    const isAccountSteupComplete = (_a = profile == null ? void 0 : profile.isAccountSetupComplete) != null ? _a : false;
    if (!isAccountSteupComplete) {
      const hasAccounts = await db.query.AccountTable.findMany({
        where: () => eq(UserProfileTable.userId, userId)
      }).execute();
      if (hasAccounts.length > 0) {
        await db.delete(UserProfileTable).where(eq(UserProfileTable.userId, userId)).execute();
      }
    }
    const body = await readBody(event);
    const accounts = body.accounts.map((account) => {
      var _a2;
      return {
        userId,
        accountType: account.accountType,
        name: (_a2 = account.name) == null ? void 0 : _a2.trim(),
        balance: account.balance,
        currency: account.currency.trim().toUpperCase()
      };
    });
    await db.insert(AccountTable).values(accounts).execute();
    return {
      statusCode: 200,
      message: "Accounts added successfully",
      data: {
        addedAccounts: accounts.length,
        accounts
      }
    };
  } catch (error) {
    console.log(error);
    return createError$1({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: {
        message: "An error occurred while adding accounts."
      }
    });
  }
});

const index_post$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$a
});

const index_post$8 = eventHandler(async (event) => {
  try {
    const userId = event.context.user.uid;
    const body = await readBody(event);
    const accounts = body.accounts.map((account) => {
      var _a;
      return {
        userId,
        accountType: account.accountType,
        name: (_a = account.name) == null ? void 0 : _a.trim(),
        balance: account.balance,
        currency: account.currency.trim().toUpperCase()
      };
    });
    await db.insert(AccountTable).values(accounts).execute();
    return {
      statusCode: 200,
      message: "Accounts added successfully",
      data: {
        addedAccounts: accounts.length,
        accounts
      }
    };
  } catch (error) {
    console.log(error);
    return createError$1({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: {
        message: "An error occurred while adding accounts."
      }
    });
  }
});

const index_post$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$8
});

const getStatus = (percentage) => {
  if (percentage > 80) return "danger";
  if (percentage > 60) return "warning";
  return "okay";
};
const index_get$i = eventHandler(async (event) => {
  var _a;
  try {
    const userId = (_a = event.context.user) == null ? void 0 : _a.uid;
    if (!userId) {
      return createError$1({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const month = dayjs(/* @__PURE__ */ new Date()).format("YYYY-MM");
    const monthStart = dayjs(month).startOf("month").toDate();
    const monthEnd = dayjs(month).endOf("month").toDate();
    const budgets = await db.select({
      id: MonthlyBudgetTable.id,
      groupId: MonthlyBudgetTable.groupId,
      categoryName: CategoryGroupTable.name,
      assigned: MonthlyBudgetTable.assigned
    }).from(MonthlyBudgetTable).leftJoin(CategoryGroupTable, eq(MonthlyBudgetTable.groupId, CategoryGroupTable.id)).where(and(eq(MonthlyBudgetTable.userId, userId), eq(MonthlyBudgetTable.month, month)));
    const transactions = await db.select({
      budgetId: TransactionTable.budgetId,
      groupId: TransactionTable.groupId,
      amount: TransactionTable.amount
    }).from(TransactionTable).where(
      and(
        eq(TransactionTable.userId, userId),
        eq(TransactionTable.type, "EXPENSE"),
        gte(TransactionTable.date, monthStart),
        lte(TransactionTable.date, monthEnd)
      )
    );
    const transactionsByGroup = /* @__PURE__ */ new Map();
    transactions.forEach((transaction) => {
      if (transaction.groupId) {
        const currentAmount = transactionsByGroup.get(transaction.groupId) || 0;
        const amount = Math.abs(parseFloat(transaction.amount));
        transactionsByGroup.set(transaction.groupId, currentAmount + amount);
      }
    });
    const bars = budgets.map((budget) => {
      const budgetAmount = parseFloat(budget.assigned) || 0;
      const spentAmount = transactionsByGroup.get(budget.groupId || "") || 0;
      const usagePercentage = budgetAmount > 0 ? spentAmount / budgetAmount * 100 : 0;
      const status = getStatus(usagePercentage);
      return {
        category: budget.categoryName || "Unknown",
        categoryId: budget.groupId || "",
        budgetAmount,
        spentAmount,
        usagePercentage: Math.round(usagePercentage * 100) / 100,
        // Round to 2 decimals
        status
      };
    });
    const chartData = {
      month,
      bars
    };
    return {
      statusCode: 200,
      message: "Budget usage chart data fetched successfully",
      data: chartData
    };
  } catch (error) {
    console.error("Error fetching budget usage charts:", error);
    return createError$1({
      statusCode: 500,
      message: "Internal Server Error",
      data: { message: "An error occurred while fetching budget usage charts." }
    });
  }
});

const index_get$j = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$i
});

const index_get$g = eventHandler(async (event) => {
  try {
    const userId = event.context.user.uid;
    const queryParams = getQuery$1(event);
    const month = queryParams.month || dayjs(/* @__PURE__ */ new Date()).format("YYYY-MM");
    const budgets = await db.select({
      id: MonthlyBudgetTable.id,
      userId: MonthlyBudgetTable.userId,
      groupId: MonthlyBudgetTable.groupId,
      month: MonthlyBudgetTable.month,
      assigned: MonthlyBudgetTable.assigned,
      remaining: MonthlyBudgetTable.remaining,
      updatedAt: MonthlyBudgetTable.updatedAt,
      categoryName: CategoryGroupTable.name
    }).from(MonthlyBudgetTable).leftJoin(CategoryGroupTable, eq(MonthlyBudgetTable.groupId, CategoryGroupTable.id)).where(and(eq(MonthlyBudgetTable.userId, userId), eq(MonthlyBudgetTable.month, month)));
    return {
      statusCode: 200,
      message: "Budgets fetched successfully.",
      data: { budgets }
    };
  } catch (error) {
    console.log(error);
    return createError$1({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { message: "An error occurred while fetching budgets." }
    });
  }
});

const index_get$h = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$g
});

const index_post$6 = eventHandler(async (event) => {
  try {
    const userId = event.context.user.uid;
    const body = await readBody(event);
    const budgets = body.budgets;
    if (!budgets || !Array.isArray(budgets)) {
      return createError$1({
        statusCode: 400,
        statusMessage: "Bad Request",
        data: { message: "Invalid budgets data." }
      });
    }
    const categories = await db.select().from(CategoryGroupTable);
    const budgetsToInsert = [];
    categories.map((category) => {
      const matchingBudget = budgets.filter((b) => b.groupId === category.id);
      if (matchingBudget.length > 0) {
        const totalAssigned = matchingBudget.reduce(
          (sum, b) => sum + parseFloat(b.assigned),
          0
        );
        const data = {
          userId,
          groupId: category.id,
          month: body.month || dayjs(/* @__PURE__ */ new Date()).format("YYYY-MM"),
          assigned: totalAssigned.toFixed(2)
        };
        budgetsToInsert.push(data);
      }
    });
    await db.transaction(async (tx) => {
      for (const budgetData of budgetsToInsert) {
        const existingBudget = await tx.select().from(MonthlyBudgetTable).where(
          and(
            eq(MonthlyBudgetTable.userId, budgetData.userId),
            eq(MonthlyBudgetTable.groupId, budgetData.groupId),
            eq(MonthlyBudgetTable.month, budgetData.month)
          )
        ).limit(1);
        if (existingBudget.length > 0) {
          await tx.update(MonthlyBudgetTable).set({ assigned: budgetData.assigned, updatedAt: /* @__PURE__ */ new Date() }).where(eq(MonthlyBudgetTable.id, existingBudget[0].id));
        } else {
          await tx.insert(MonthlyBudgetTable).values(budgetData);
        }
      }
    });
    const createdBudgets = await db.select().from(MonthlyBudgetTable).where(and(eq(MonthlyBudgetTable.userId, userId)));
    return {
      statusCode: 200,
      message: "Budgets processed successfully.",
      data: { budgets: createdBudgets }
    };
  } catch (error) {
    console.error("Error handling POST /budgets:", error);
    return createError$1({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { message: "An error occurred while processing your request." }
    });
  }
});

const index_post$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$6
});

const index_get$e = eventHandler(async (event) => {
  var _a;
  try {
    const userId = (_a = event.context.user) == null ? void 0 : _a.uid;
    const queryParams = getQuery$1(event);
    const month = queryParams.month || dayjs().format("YYYY-MM");
    if (!userId) {
      return createError$1({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const allCategories = await db.select().from(CategoryGroupTable).orderBy(CategoryGroupTable.order);
    const userBudgets = await db.select().from(MonthlyBudgetTable).where(eq(MonthlyBudgetTable.userId, userId) && eq(MonthlyBudgetTable.month, month));
    const categoriesWithBudgets = new Set(userBudgets.map((budget) => {
      var _a2;
      return (_a2 = budget.groupId) == null ? void 0 : _a2.toString();
    }));
    const missingBudgetCategories = allCategories.filter(
      (category) => !categoriesWithBudgets.has(category.id)
    );
    return {
      statusCode: 200,
      message: "Fetched missing budget categories successfully",
      data: {
        month,
        missingCategories: missingBudgetCategories,
        totalCategories: allCategories.length,
        categoriesWithBudgets: userBudgets.length,
        missingCount: missingBudgetCategories.length
      }
    };
  } catch (error) {
    console.error("Error fetching missing budgets:", error);
    return createError$1({
      statusCode: 500,
      message: "Internal Server Error"
    });
  }
});

const index_get$f = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$e
});

const index_get$c = eventHandler(async (event) => {
  try {
    const carousels = await db.select().from(CarouselTable);
    return {
      statusCode: 200,
      message: "Carousels fetched successfully",
      data: carousels
    };
  } catch (error) {
    return createError$1({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to fetch carousels",
      data: null
    });
  }
});

const index_get$d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$c
});

const index_get$a = eventHandler(async (_event) => {
  try {
    const categories = await db.select().from(CategoryGroupTable);
    return {
      statusCode: 200,
      message: "Categories fetched successfully.",
      data: { categories }
    };
  } catch (error) {
    console.log(error);
    return createError$1({
      statusCode: 500,
      message: "Internal Server Error",
      data: {
        message: "An error occurred while processing the request."
      }
    });
  }
});

const index_get$b = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$a
});

const index_get$8 = eventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    return {
      statusCode: 200,
      message: "User not authenticated",
      data: { isAccountSetupComplete: false, hasAccounts: false }
    };
  }
  const userId = user.uid;
  const profile = await db.query.UserProfileTable.findFirst({
    where: () => eq(UserProfileTable.userId, userId)
  }).execute();
  const hasAccounts = await db.query.AccountTable.findFirst({
    where: () => eq(UserProfileTable.userId, userId)
  }).execute();
  return {
    statusCode: 200,
    message: "Fetched account setup status",
    data: {
      isSetupComplete: profile ? profile.isAccountSetupComplete : false,
      hasAccounts: !!hasAccounts
    }
  };
});

const index_get$9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$8
});

const index_post$4 = eventHandler(async (event) => {
  try {
    const userId = event.context.user.uid;
    const profle = await db.query.UserProfileTable.findFirst({
      where: eq(UserProfileTable.userId, userId)
    });
    if (!profle) {
      await db.insert(UserProfileTable).values({
        userId,
        isAccountSetupComplete: true
      });
      return {
        statusCode: 200,
        message: "Account setup not complete.",
        data: { isAccountSetupComplete: true, hasAccounts: true }
      };
    }
    await db.update(UserProfileTable).set({ isAccountSetupComplete: true }).where(eq(UserProfileTable.userId, userId));
    return {
      statusCode: 200,
      message: "Account setup marked as complete.",
      data: {
        isAccountSetupComplete: true,
        hasAccounts: true
      }
    };
  } catch (error) {
    return createError$1({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { message: "An error occurred while checking account setup." }
    });
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$4
});

const index_get$6 = eventHandler(async (event) => {
  return {
    statusCode: 200,
    message: "Server said pong"
  };
});

const index_get$7 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$6
});

const PROMPT$2 = `
    You are a "YNAB-style" Budgeting Onboarding Assistant called "Budget Me". Your ONLY goal is to gather account information from the user to set up their initial budget.

              **The Data Schema:**
              Each account must strictly contain:
              - name: (string) e.g., "Main Savings", "Leather Wallet"
              - accountType: (string) Must be one of: [CASH, WALLET, BANK, CREDIT_CARD]
              - balance: (number) The current amount.

              **Your Protocol:**
              1. **Focus:** If the user asks about anything other than adding accounts, politely steer them back.
              2. **Extraction:** If the user mentions balances (e.g., "I have 20 in bank, 3000 in credit card"), extract them into the JSON format.
              3. **Inquiry:** If info is missing (e.g., they didn't give a name for the bank), ask for it.
              4. **Completion:** Once you have all info, ask "Does this look correct?" 
              5. **Output Format:** You must ALWAYS provide a "response" for the user to see, and if you have extracted data, include it in an "accounts" array.

              **Response JSON Structure:**
              {
                "chatResponse": "The message to show the user",
                "accounts": [ { "name": "...", "accountType": "...", "balance": 0, "currency": "..." } ],
                "isComplete": true/false (Set true only if user says 'Yes' to the final summary)
              }
`;

const PROMPT$1 = `
    AI Budgeting Assistant System PromptRoleYou are the "Fast-Track Budget Architect." Your goal is to move the user from a raw bank balance to a fully assigned zero-based budget using the absolute minimum number of questions.ContextThe user has just connected their accounts and has a "To Be Budgeted" (TBB) amount of: {{TBB_AMOUNT}}.You have access to the following Admin Category Groups. YOU MUST ONLY USE THE IDs PROVIDED HERE:{{CATEGORY_GROUPS_LIST}}Strategy: The "Inference & Confirm" MethodInstead of asking "How much do you spend on X?", you will make a smart estimate based on their TBB and common spending patterns, then ask them to adjust.Phase 1: Fixed Bills & Needs (The Big Rocks)Ask ONE question to cover all major monthly obligations: "What are your monthly 'must-haves' like Rent/Mortgage, Utilities, and Insurance? Just list the names and amounts."Action: Map these items to the specific groupId provided in the context that matches "Fixed Bills" or "Health/Medical" if applicable.Phase 2: Lifestyle & Daily Spend (The Fast Estimates)Do not ask for amounts individually. Propose a bundle based on their remaining TBB.Example Prompt: "I've set aside your bills. For your remaining {{REMAINING_TBB}}, I suggest the following weekly targets: {{GROCERIES}}/wk for Groceries, {{OUTING}}/wk for Dining/Outing, and {{TRANSPORT}}/wk for Transport. Does that sound realistic, or should we shift some numbers?"Action: Map these to the provided IDs for "Living Expenses," "Transport," and "Lifestyle" Groups.Phase 3: The Safety Net & GoalsAsk one final question: "Should we put the remaining {{REMAINING_TBB}} toward a specific Financial Goal (like an Emergency Fund) or keep it in 'Unexpected' for now?"Response JSON StructureYour response must ALWAYS be a JSON object. No markdown backticks unless specifically requested. Every turn must include a chatResponse and the full budgets array representing the current state of the budget.{
  "chatResponse": "The conversational message to show the user",
  "budgets": [
    {
      "categoryName": "Groceries",
      "groupId": "UUID_FROM_PROVIDED_LIST",
      "month": "YYYY-MM",
      "assigned": 450.00
    }
  ],
  "isComplete": false
}
Mandatory Mapping RulesZero Hallucination: NEVER generate a new UUID for groupId. If a category doesn't perfectly fit, pick the closest match from the provided {{CATEGORY_GROUPS_LIST}}.Strict Category Names: Use the names provided by the user for specific bills (e.g., "Netflix", "Rent"), but for daily spending, use the standard names (e.g., "Groceries", "Dining Out").Mathematical Integrity: The sum of all assigned values in the budgets array MUST EQUAL OR BE LESS THAN the initial {{TBB_AMOUNT}}.State Persistence: In every response, include the entire list of budgets created so far in the session, not just the new ones.Completion: Set isComplete to true ONLY when the user says "Yes" or "Confirm" to the final summary and the TBB is fully assigned.Voice and TonePrecise: Use exact numbers.Short: No fluff. Maximum 2 sentences per turn.Supportive: Acknowledge that budgeting is a "best guess" and can be changed later.Handling Medical/EducationIf the user mentions high-priority specific needs like "I have a monthly medicine cost of $50" or "Tuition is $200," prioritize these immediately in Phase 1 and deduct from the remaining TBB before proposing Phase 2 estimates.
`;

const PROMPT = `
    ---
    title: AI Transaction Creator System Prompt
    role: Financial Entry Clerk
    ---

    ## \u{1F9FE} Role

    You are the **Financial Entry Clerk**.

    Your responsibility is to accurately parse user messages into structured financial transactions while matching them to the user\u2019s existing **accounts**, **budgets** and **categories**.

    You must output **machine-readable JSON only**, following the exact schema defined below.

    ---

    ## \u{1F9E0} Context (Dynamic Inputs)

    You will be provided with the following runtime data:

    - **User Accounts List**: {{ACCOUNTS_JSON}}
    Used to identify valid accountId values.

    - **User Budgets**: {{BUDGETS_JSON}}  
    Used to identify valid groupId, budgetId, and category names.

    - **All Possible Categories**: {{CATEGORIES_JSON}} these are system defined fixed categories that CANNOT be changed by the user.  
        Used to help match user-described categories to valid options. each user budgets are mapped to one of these categories. on transaction group id field must match the group id of the budget that maps to the matched category.

    - **Current Date**: {{CURRENT_DATE}}  
    Used as the default transaction date unless the user specifies otherwise.

    - relevant table schema from the database for data structure understanding.
        export const CategoryGroupTable = pgTable("category_groups", {
          id: uuid("id").primaryKey().defaultRandom(),
          name: text("name").notNull(), 
          description: text("description"), 
          order: integer("order").notNull().default(0),
        });
        
        
        export const MonthlyBudgetTable = pgTable("monthly_budgets", {
          id: uuid("id").primaryKey().defaultRandom(),
          userId: text("user_id").notNull(),
          groupId: uuid("group_id").references(() => CategoryGroupTable.id, { onDelete: "cascade" }),
          month: text("month").notNull(), // Format: "YYYY-MM"
          assigned: numeric("assigned", { precision: 15, scale: 2 }).notNull().default("0.00"),
          remaining: numeric("remaining", { precision: 15, scale: 2 }).notNull().default("0.00"),
          updatedAt: timestamp("updated_at").notNull().defaultNow(),
        });
        
        export const TransactionType = pgEnum("transaction_type", ["INCOME", "EXPENSE", "TRANSFER"]);
        
        export const TransactionTable = pgTable("transactions", {
          id: uuid("id").primaryKey().defaultRandom(),
          userId: text("user_id").notNull(),
          groupId: uuid("group_id").references(() => CategoryGroupTable.id, { onDelete: "set null" }),
          budgetId: uuid("budget_id").references(() => MonthlyBudgetTable.id, { onDelete: "set null" }),
          title: char("title", { length: 90 }).notNull(),
          category: text("category").notNull(),
          accountId: uuid("account_id").notNull(), 
          amount: numeric("amount", { precision: 15, scale: 2 }).notNull(), // Negative for spending
          date: timestamp("date").notNull().defaultNow(),
          type: TransactionType("type").notNull(),
          memo: text("memo"),
          createdAt: timestamp("created_at").notNull().defaultNow(),
          updatedAt: timestamp("updated_at").notNull().defaultNow(),
        });

    ---

    ## \u{1F4B3} Transaction Types & Logic

    ### EXPENSE
    - When the user **spends money**
    - Amount must be a **positive number**
    - Backend handles negative accounting

    ### INCOME
    - When the user **receives money**
    - Amount must be a **positive number**

    ### TRANSFER
    - When money moves **between two accounts**
    - Record the **primary movement only**
    - Still requires a valid accountId

    ---

    ## \u{1F6E0}\uFE0F Strategy

    ### 1. Identify the Transaction Type
    Determine whether the message represents:
    - Spending \u2192 EXPENSE
    - Earning \u2192 INCOME
    - Moving money \u2192 TRANSFER

    ---

    ### 2. Fuzzy Matching (Critical)
    - Match user-described categories (e.g. \u201Cfood\u201D, \u201Cgroceries\u201D, \u201Crent\u201D)  
    to the **closest categoryName** in {{CATEGORIES_JSON}} using semantic similarity.
    
    - Never invent categories

    ---

    ### 3. Data Extraction Rules

    | Field | Rule |
    |-----|-----|
    | **title** | Short, clean, merchant-style name (e.g. \u201CStarbucks\u201D) |
    | **amount** | Numeric value only (no symbols) |
    | **memo** | Extra details, notes, or context |
    | **date** | YYYY-MM-DD, default to {{CURRENT_DATE}} |
    | **accountId** | Must exist in {{ACCOUNTS_JSON}} |
    | **groupId** | Must exist in {{CATEGORIES_JSON}} where groupId is id |
    | **budgetId** | Must exist in {{BUDGETS_JSON}} |

    ---

    ## \u{1F4E6} Response Format (MANDATORY)

    You must **always** return a raw JSON object in the following structure:

    json
    {
    "chatResponse": "Short confirmation or clarification message",
    "transactions": [
        {
        "title": "Short Descriptive Title",
        "category": "Matched Category Name",
        "groupId": "UUID_FROM_BUDGETS",
        "budgetId": "UUID_FROM_BUDGETS",
        "accountId": "UUID_FROM_ACCOUNTS",
        "amount": 50.00,
        "type": "EXPENSE",
        "memo": "Optional extra details",
        "date": "YYYY-MM-DD"
        }
    ],
    "isComplete": true
    }

`;

const CREATE_ACCOUNT_PROMPT_ID = "create-account";
const CREATE_BUDGETS_PROMPT_ID = "create-budgets";
const CREATE_TRANSACTION_PROMPT_ID = "create-transaction";

const index_get$4 = eventHandler(async (event) => {
  const query = getQuery$1(event);
  const userId = event.context.user.uid;
  if (!query.promptId || (query == null ? void 0 : query.promptId) === "") {
    return createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      data: {
        message: "promptId query parameter is required."
      }
    });
  }
  const promptId = query.promptId;
  if (promptId === CREATE_ACCOUNT_PROMPT_ID) {
    return {
      statusCode: 200,
      message: "Create Account Prompt fetched successfully",
      data: {
        prompt: PROMPT$2
      }
    };
  } else if (promptId == CREATE_BUDGETS_PROMPT_ID) {
    const categories = await db.select().from(CategoryGroupTable);
    const items = categories.map((category) => ({
      name: category.name,
      description: category.description,
      id: category.id,
      order: category.order
    }));
    const accounts = await db.query.AccountTable.findMany({
      where: () => eq(AccountTable.userId, userId)
    });
    const TBB = accounts.reduce((total, acc) => total + parseFloat(acc.balance), 0);
    const PROMPT = PROMPT$1.replace(
      "{{CATEGORY_GROUPS_LIST}}",
      JSON.stringify(items)
    ).replace("{{TBB_AMOUNT}}", TBB.toString());
    return {
      statusCode: 200,
      message: "Create Budgets Prompt fetched successfully",
      data: {
        prompt: PROMPT
      }
    };
  } else if (promptId === CREATE_TRANSACTION_PROMPT_ID) {
    const categories = await db.select().from(CategoryGroupTable);
    const budgets = await db.select().from(MonthlyBudgetTable).where(eq(MonthlyBudgetTable.userId, userId));
    const accounts = await db.select().from(AccountTable).where(eq(AccountTable.userId, userId));
    const PROMPT$1 = PROMPT.replace(
      "{{CATEGORIES_JSON}}",
      JSON.stringify(categories)
    ).replace("{{BUDGETS_JSON}}", JSON.stringify(budgets)).replace("{{ACCOUNTS_JSON}}", JSON.stringify(accounts));
    return {
      statusCode: 200,
      message: "Create Transaction Prompt fetched successfully",
      data: {
        prompt: PROMPT$1
      }
    };
  } else {
    return createError$1({
      statusCode: 404,
      statusMessage: "Not Found",
      data: {
        message: `Prompt with id ${promptId} not found.`
      }
    });
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$4
});

const index_get$2 = eventHandler(async (event) => {
  var _a, _b, _c;
  try {
    const userId = (_a = event.context.user) == null ? void 0 : _a.uid;
    const queryParams = getQuery$1(event);
    const page = parseInt(queryParams.page || "1", 10);
    const pageSize = parseInt(queryParams.pageSize || "20", 10);
    const month = queryParams.month;
    const startDate = queryParams.startDate;
    const endDate = queryParams.endDate;
    const limit = pageSize > 0 ? pageSize : 20;
    const offset = page > 1 ? (page - 1) * limit : 0;
    if (!userId) {
      return createError$1({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const whereConditions = [eq(TransactionTable.userId, userId)];
    if (month) {
      const monthStart = dayjs(month).startOf("month").toDate();
      const monthEnd = dayjs(month).endOf("month").toDate();
      whereConditions.push(gte(TransactionTable.date, monthStart));
      whereConditions.push(lte(TransactionTable.date, monthEnd));
    }
    if (startDate && endDate) {
      const start = dayjs(startDate).startOf("day").toDate();
      const end = dayjs(endDate).endOf("day").toDate();
      whereConditions.push(gte(TransactionTable.date, start));
      whereConditions.push(lte(TransactionTable.date, end));
    } else if (startDate) {
      const start = dayjs(startDate).startOf("day").toDate();
      const end = dayjs(startDate).endOf("day").toDate();
      whereConditions.push(gte(TransactionTable.date, start));
      whereConditions.push(lte(TransactionTable.date, end));
    } else if (endDate) {
      const start = dayjs(endDate).startOf("day").toDate();
      const end = dayjs(endDate).endOf("day").toDate();
      whereConditions.push(gte(TransactionTable.date, start));
      whereConditions.push(lte(TransactionTable.date, end));
    }
    const whereClause = whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0];
    const transactions = await db.select().from(TransactionTable).where(whereClause).limit(limit).offset(offset).orderBy(desc(TransactionTable.date));
    const totalCountResult = await db.select({ value: count() }).from(TransactionTable).where(whereClause);
    const totalTransactions = (_c = (_b = totalCountResult[0]) == null ? void 0 : _b.value) != null ? _c : 0;
    const totalPage = Math.ceil(totalTransactions / limit);
    return {
      statusCode: 200,
      message: "Fetched transactions successfully",
      data: {
        transactions,
        page,
        totalPage,
        pageSize: limit,
        totalTransactions
      }
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return createError$1({
      statusCode: 500,
      message: "Internal Server Error"
    });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get$2
});

const index_post$2 = eventHandler(async (event) => {
  var _a, _b, _c;
  try {
    const userId = (_a = event.context.user) == null ? void 0 : _a.uid;
    if (!userId) {
      return createError$1({
        statusCode: 401,
        message: "Unauthorized",
        data: { message: "User authentication required." }
      });
    }
    const body = await readBody(event);
    if (!Array.isArray(body.transactions) || body.transactions.length === 0) {
      return createError$1({
        statusCode: 400,
        message: "Bad Request",
        data: { message: "Request body must be a non-empty array of transactions." }
      });
    }
    const transactions = body.transactions;
    for (const tx of transactions) {
      if (!((_b = tx.title) == null ? void 0 : _b.trim()) || !((_c = tx.category) == null ? void 0 : _c.trim()) || !tx.groupId || !tx.budgetId || !tx.accountId || tx.amount === void 0 || !tx.type || !tx.date) {
        return createError$1({
          statusCode: 400,
          message: "Bad Request",
          data: {
            message: "Each transaction must have title, category, groupId, budgetId, accountId, amount, type, and date."
          }
        });
      }
      if (!["INCOME", "EXPENSE", "TRANSFER"].includes(tx.type)) {
        return createError$1({
          statusCode: 400,
          message: "Bad Request",
          data: {
            message: "Invalid transaction type. Must be INCOME, EXPENSE, or TRANSFER."
          }
        });
      }
      if (typeof tx.amount !== "number" || tx.amount <= 0) {
        return createError$1({
          statusCode: 400,
          message: "Bad Request",
          data: { message: "Transaction amount must be a positive number." }
        });
      }
    }
    const validAccounts = await db.select({ id: AccountTable.id }).from(AccountTable).where(and(eq(AccountTable.userId, userId)));
    const validAccountIds = new Set(validAccounts.map((a) => a.id));
    for (const tx of transactions) {
      if (!validAccountIds.has(tx.accountId)) {
        return createError$1({
          statusCode: 404,
          message: "Not Found",
          data: {
            message: `Account ${tx.accountId} not found or does not belong to user.`
          }
        });
      }
    }
    const validBudgets = await db.select({ id: MonthlyBudgetTable.id }).from(MonthlyBudgetTable).where(eq(MonthlyBudgetTable.userId, userId));
    const validBudgetIds = new Set(validBudgets.map((b) => b.id));
    for (const tx of transactions) {
      if (!validBudgetIds.has(tx.budgetId)) {
        return createError$1({
          statusCode: 404,
          message: "Not Found",
          data: {
            message: `Budget ${tx.budgetId} not found or does not belong to user.`
          }
        });
      }
    }
    let createdCount = 0;
    await db.transaction(async (tx) => {
      var _a2;
      for (const transactionData of transactions) {
        const txDate = new Date(transactionData.date);
        const month = txDate.toISOString().slice(0, 7);
        const monthlyBudget = await tx.select().from(MonthlyBudgetTable).where(
          and(
            eq(MonthlyBudgetTable.id, transactionData.budgetId),
            eq(MonthlyBudgetTable.userId, userId),
            eq(MonthlyBudgetTable.month, month)
          )
        ).limit(1);
        if (monthlyBudget.length === 0) {
          throw new Error(
            `Monthly budget ${transactionData.budgetId} for month ${month} not found.`
          );
        }
        const amount = Math.abs(transactionData.amount).toFixed(2);
        await tx.insert(TransactionTable).values({
          userId,
          groupId: transactionData.groupId,
          budgetId: transactionData.budgetId,
          title: transactionData.title.trim(),
          category: transactionData.category.trim(),
          accountId: transactionData.accountId,
          amount,
          type: transactionData.type,
          memo: ((_a2 = transactionData.memo) == null ? void 0 : _a2.trim()) || null,
          date: txDate
        });
        if (transactionData.type === "EXPENSE") {
          const currentBudget = monthlyBudget[0];
          const newRemaining = (parseFloat(currentBudget.remaining) - transactionData.amount).toFixed(2);
          await tx.update(MonthlyBudgetTable).set({
            remaining: newRemaining,
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(MonthlyBudgetTable.id, transactionData.budgetId));
        }
        const account = await tx.select().from(AccountTable).where(
          and(
            eq(AccountTable.id, transactionData.accountId),
            eq(AccountTable.userId, userId)
          )
        ).limit(1);
        if (account.length > 0) {
          let newBalance;
          if (transactionData.type === "EXPENSE") {
            newBalance = parseFloat(account[0].balance) - transactionData.amount;
          } else if (transactionData.type === "INCOME") {
            newBalance = parseFloat(account[0].balance) + transactionData.amount;
          } else if (transactionData.type === "TRANSFER") {
            newBalance = parseFloat(account[0].balance) - transactionData.amount;
          } else {
            newBalance = parseFloat(account[0].balance);
          }
          await tx.update(AccountTable).set({
            balance: newBalance.toFixed(2),
            updatedAt: /* @__PURE__ */ new Date()
          }).where(eq(AccountTable.id, transactionData.accountId));
        }
        createdCount++;
      }
    });
    return {
      statusCode: 201,
      message: "Transactions created successfully",
      data: {
        count: createdCount
      }
    };
  } catch (error) {
    console.error("Error creating transactions:", error);
    return createError$1({
      statusCode: 500,
      message: "Internal Server Error",
      data: { message: "An error occurred while processing the request." }
    });
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post$2
});

const index_post = eventHandler(async (event) => {
  var _a, _b;
  try {
    const body = await readBody(event);
    const userId = event.context.user.uid;
    if (!((_a = body.title) == null ? void 0 : _a.trim()) || !body.groupId || !body.accountId || body.amount === void 0 || Number.isNaN(parseFloat(body.amount)) || !body.type || !body.date) {
      return createError$1({
        statusCode: 400,
        message: "Bad Request",
        data: { message: "Request body must contain a transaction object." }
      });
    }
    const _currentMonth = dayjs(/* @__PURE__ */ new Date()).format("YYYY-MM");
    let _budget = await db.query.MonthlyBudgetTable.findFirst({
      where: () => and(
        eq(MonthlyBudgetTable.userId, userId),
        eq(MonthlyBudgetTable.groupId, body.groupId),
        eq(MonthlyBudgetTable.month, _currentMonth)
      )
    });
    if (!_budget) {
      _budget = await db.query.MonthlyBudgetTable.findFirst({
        where: () => and(
          eq(MonthlyBudgetTable.userId, userId),
          eq(MonthlyBudgetTable.groupId, body.groupId)
        ),
        orderBy: (fields) => [desc(fields.month)]
      });
    }
    const _account = await db.query.AccountTable.findFirst({
      where: () => eq(AccountTable.id, body.accountId)
    });
    if (!_account) {
      return createError$1({
        statusCode: 400,
        message: "Bad Request",
        data: { message: "No account found with the specified accountId." }
      });
    }
    if (!_budget) {
      return createError$1({
        statusCode: 400,
        message: "Bad Request",
        data: { message: "No budget found for the specified category this month." }
      });
    }
    const _insertData = {
      userId,
      title: body.title,
      category: body.category || "",
      groupId: body.groupId,
      budgetId: _budget.id,
      accountId: body.accountId,
      amount: (_b = parseFloat(body.amount)) == null ? void 0 : _b.toFixed(2),
      type: body.type,
      memo: body.memo || "",
      date: body.date
    };
    if (body.type === "EXPENSE") {
      const _newRemaining = (parseFloat(_budget == null ? void 0 : _budget.remaining) - parseFloat(body.amount)).toFixed(2);
      await db.update(MonthlyBudgetTable).set({
        remaining: _newRemaining,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(MonthlyBudgetTable.id, _budget.id));
      const _accRemaining = (parseFloat(_account.balance) - parseFloat(body.amount)).toFixed(
        2
      );
      await db.update(AccountTable).set({
        balance: _accRemaining,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(AccountTable.id, body.accountId));
      await db.insert(TransactionTable).values(_insertData);
    }
    if (body.type === "INCOME") {
      const accRemainint = (parseFloat(_account.balance) + parseFloat(body.amount)).toFixed(2);
      await db.update(AccountTable).set({
        balance: accRemainint,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(AccountTable.id, body.accountId));
      await db.insert(TransactionTable).values(_insertData);
    }
    return {
      statusCode: 200,
      message: "Manual transaction added successfully."
    };
  } catch (error) {
    console.error("Error processing manual transaction:", error);
    return createError$1({
      statusCode: 500,
      message: "Internal Server Error",
      data: { message: "An error occurred while processing the manual transaction." }
    });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_post
});

const getTrendFlag = (current, previous) => {
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "neutral";
};
const index_get = eventHandler(async (event) => {
  var _a;
  try {
    const userId = (_a = event.context.user) == null ? void 0 : _a.uid;
    if (!userId) {
      return createError$1({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const currentMonth = dayjs(/* @__PURE__ */ new Date());
    const previousMonth = currentMonth.subtract(1, "month");
    const transactions = await db.select().from(TransactionTable).where(
      and(
        eq(TransactionTable.userId, userId),
        gte(TransactionTable.date, currentMonth.startOf("month").toDate()),
        lte(TransactionTable.date, currentMonth.endOf("month").toDate())
      )
    );
    const previousTransactions = await db.select().from(TransactionTable).where(
      and(
        eq(TransactionTable.userId, userId),
        gte(TransactionTable.date, previousMonth.startOf("month").toDate()),
        lte(TransactionTable.date, previousMonth.endOf("month").toDate())
      )
    );
    const totalIncome = transactions.filter((txn) => txn.type === "INCOME").reduce((sum, txn) => sum + Math.abs(parseFloat(txn.amount)), 0);
    const totalExpenses = transactions.filter((txn) => txn.type === "EXPENSE").reduce((sum, txn) => sum + Math.abs(parseFloat(txn.amount)), 0);
    const previousIncome = previousTransactions.filter((txn) => txn.type === "INCOME").reduce((sum, txn) => sum + Math.abs(parseFloat(txn.amount)), 0);
    const previousExpenses = previousTransactions.filter((txn) => txn.type === "EXPENSE").reduce((sum, txn) => sum + Math.abs(parseFloat(txn.amount)), 0);
    const incomeFlag = getTrendFlag(totalIncome, previousIncome);
    const expenseFlag = getTrendFlag(totalExpenses, previousExpenses);
    return {
      statusCode: 200,
      message: "Fetched transaction stats successfully",
      data: {
        totalIncome,
        totalExpenses,
        incomeFlag,
        expenseFlag,
        previousDayComparison: {
          previousIncome,
          previousExpenses,
          incomeDifference: totalIncome - previousIncome,
          expenseDifference: totalExpenses - previousExpenses
        }
      }
    };
  } catch (error) {
    console.error("Error fetching transaction stats:", error);
    return createError$1({
      statusCode: 500,
      message: "Internal Server Error"
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index_get
});
//# sourceMappingURL=index.mjs.map
