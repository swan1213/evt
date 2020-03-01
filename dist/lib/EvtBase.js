"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var EvtBaseProtected_1 = require("./EvtBaseProtected");
var isCallableFunction_1 = require("../tools/isCallableFunction");
var typeSafety_1 = require("../tools/typeSafety");
function parseOverloadParamsFactory(_a) {
    var defaultBoundTo = _a.defaultBoundTo;
    var canBeMatcher = function (p) {
        return isCallableFunction_1.isCallableFunction(p) || (typeof p === "object" &&
            p.length === 2 &&
            isCallableFunction_1.isCallableFunction(p[0]));
    };
    var defaultParams = {
        "matcher": function matchAll() { return true; },
        "boundTo": defaultBoundTo,
        "timeout": undefined,
        "callback": undefined
    };
    return function parseOverloadParams(inputs, methodName) {
        switch (methodName) {
            case "createDelegate":
                {
                    var n = inputs.length
                        -
                            (inputs.length !== 0 &&
                                inputs[inputs.length - 1] === undefined ?
                                1 : 0);
                    switch (n) {
                        case 0:
                            return typeSafety_1.id(__assign({}, defaultParams));
                        case 1:
                            //[ matcher ]
                            //[ boundTo ]
                            var _a = __read(inputs, 1), p = _a[0];
                            return canBeMatcher(p) ? typeSafety_1.id(__assign(__assign({}, defaultParams), { "matcher": p })) : typeSafety_1.id(__assign(__assign({}, defaultParams), { "boundTo": p }));
                        case 2:
                            //[ matcher, boundTo ]
                            var _b = __read(inputs, 2), p1 = _b[0], p2 = _b[1];
                            return typeSafety_1.id(__assign(__assign({}, defaultParams), { "matcher": p1, "boundTo": p2 }));
                    }
                }
                break;
            case "waitFor":
                {
                    var n = inputs.length;
                    if (n === 2) {
                        var _c = __read(inputs, 2), p1 = _c[0], p2 = _c[1];
                        return typeSafety_1.id(__assign(__assign({}, defaultParams), { "matcher": p1, "timeout": p2 }));
                    }
                    else {
                        var _d = __read(inputs, 1), p = _d[0];
                        return typeSafety_1.id(canBeMatcher(p) ? (__assign(__assign({}, defaultParams), { "matcher": p })) : (__assign(__assign({}, defaultParams), { "timeout": p })));
                    }
                }
                break;
            case "attach-ish":
                {
                    //[ matcher, boundTo, timeout, callback ]
                    //[ matcher, boundTo, callback ]
                    //[ matcher, timeout, callback ]
                    //[ boundTo, timeout, callback ]
                    //[ matcher, callback ]
                    //[ boundTo, callback ]
                    //[ timeout, callback ]
                    //[ callback ]
                    var n = inputs.length;
                    switch (n) {
                        case 4: {
                            //[ matcher, boundTo, timeout, callback ]
                            var _e = __read(inputs, 4), p1 = _e[0], p2 = _e[1], p3 = _e[2], p4 = _e[3];
                            return typeSafety_1.id(__assign(__assign({}, defaultParams), { "matcher": p1, "boundTo": p2, "timeout": p3, "callback": p4 }));
                        }
                        case 3: {
                            //[ matcher, boundTo, callback ]
                            //[ matcher, timeout, callback ]
                            //[ boundTo, timeout, callback ]
                            var _f = __read(inputs, 3), p1 = _f[0], p2 = _f[1], p3 = _f[2];
                            if (typeof p2 === "number") {
                                //[ matcher, timeout, callback ]
                                //[ boundTo, timeout, callback ]
                                var timeout = p2;
                                var callback = p3;
                                if (canBeMatcher(p1)) {
                                    //[ matcher, timeout, callback ]
                                    return typeSafety_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                        callback: callback, "matcher": p1 }));
                                }
                                else {
                                    //[ boundTo, timeout, callback ]
                                    return typeSafety_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                        callback: callback, "boundTo": p1 }));
                                }
                            }
                            else {
                                //[ matcher, boundTo, callback ]
                                return typeSafety_1.id(__assign(__assign({}, defaultParams), { "matcher": p1, "boundTo": p2, "callback": p3 }));
                            }
                        }
                        case 2: {
                            //[ matcher, callback ]
                            //[ boundTo, callback ]
                            //[ timeout, callback ]
                            var _g = __read(inputs, 2), p1 = _g[0], p2 = _g[1];
                            if (typeof p1 === "number") {
                                //[ timeout, callback ]
                                return typeSafety_1.id(__assign(__assign({}, defaultParams), { "timeout": p1, "callback": p2 }));
                            }
                            else {
                                //[ matcher, callback ]
                                //[ boundTo, callback ]
                                var callback = p2;
                                if (canBeMatcher(p1)) {
                                    return typeSafety_1.id(__assign(__assign({}, defaultParams), { callback: callback, "matcher": p1 }));
                                }
                                else {
                                    return typeSafety_1.id(__assign(__assign({}, defaultParams), { callback: callback, "boundTo": p1 }));
                                }
                            }
                        }
                        case 1: {
                            //[ callback ]
                            var _h = __read(inputs, 1), p = _h[0];
                            return typeSafety_1.id(__assign(__assign({}, defaultParams), { "callback": p }));
                        }
                        case 0: {
                            return typeSafety_1.id(__assign({}, defaultParams));
                        }
                    }
                }
                break;
        }
    };
}
exports.parseOverloadParamsFactory = parseOverloadParamsFactory;
/** Evt without evtAttach property, attachOnceMatched and createDelegate */
var EvtBase = /** @class */ (function (_super) {
    __extends(EvtBase, _super);
    function EvtBase() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.parseOverloadParams = parseOverloadParamsFactory({ "defaultBoundTo": _this_1 });
        return _this_1;
    }
    EvtBase.prototype.waitFor = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.__waitFor.call(this, this.parseOverloadParams(inputs, "waitFor"));
    };
    EvtBase.prototype.$attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attach.apply(this, __spread(inputs));
    };
    EvtBase.prototype.attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach(this.parseOverloadParams(inputs, "attach-ish"));
    };
    EvtBase.prototype.$attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnce.apply(this, __spread(inputs));
    };
    EvtBase.prototype.attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachOnce(this.parseOverloadParams(inputs, "attach-ish"));
    };
    EvtBase.prototype.$attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnceExtract.apply(this, __spread(inputs));
    };
    EvtBase.prototype.attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachExtract(this.parseOverloadParams(inputs, "attach-ish"));
    };
    EvtBase.prototype.$attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachPrepend.apply(this, __spread(inputs));
    };
    EvtBase.prototype.attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachPrepend(this.parseOverloadParams(inputs, "attach-ish"));
    };
    EvtBase.prototype.$attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOncePrepend.apply(this, __spread(inputs));
    };
    EvtBase.prototype.attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachOncePrepend(this.parseOverloadParams(inputs, "attach-ish"));
    };
    EvtBase.prototype.$attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnceExtract.apply(this, __spread(inputs));
    };
    EvtBase.prototype.attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachOnceExtract(this.parseOverloadParams(inputs, "attach-ish"));
    };
    return EvtBase;
}(EvtBaseProtected_1.EvtBaseProtected));
exports.EvtBase = EvtBase;
//# sourceMappingURL=EvtBase.js.map