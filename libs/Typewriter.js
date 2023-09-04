"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TypewriterQueue = (function () {
    function TypewriterQueue(parentTypewriter) {
        this.queue = [];
        this.parentObject = parentTypewriter;
        this.workingOnPromise = false;
        this.stop = false;
    }
    TypewriterQueue.prototype.add = function (tasks, loop) {
        var _this = this;
        tasks.forEach(function (task, index) {
            _this.enlistPromiseToQueue(function () { return task(); });
            if (index === tasks.length - 1 && loop) {
                _this.enlistPromiseToQueue;
            }
            index === tasks.length - 1 && loop
                ? _this.enlistPromiseToQueue(function () {
                    return _this.parentObject.delete().then(function () { return _this.add(tasks, loop); });
                })
                : null;
        });
    };
    TypewriterQueue.prototype.enlistPromiseToQueue = function (promise) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queue.push({
                promise: promise,
                resolve: resolve,
                reject: reject,
            });
            _this.remove();
        });
    };
    TypewriterQueue.prototype.remove = function () {
        var _this = this;
        if (this.workingOnPromise) {
            return false;
        }
        if (this.stop) {
            this.queue = [];
            this.stop = false;
            return;
        }
        var item = this.queue.shift();
        if (!item) {
            return false;
        }
        this.workingOnPromise = true;
        item.promise().then(function () {
            _this.workingOnPromise = false;
            item.resolve();
            _this.remove();
        });
    };
    return TypewriterQueue;
}());
var TypewriterLight = (function () {
    function TypewriterLight(elemId, options) {
        this.state = {
            typing: false,
        };
        var wrapper = document.getElementById(elemId);
        if (!wrapper) {
            throw new Error("Element with id: ".concat(elemId, " does not exist on document"));
        }
        else {
            wrapper.innerHTML = "<typewriter id='typew-app-".concat(elemId, "'></typewriter><cursor id='typew-cursor-").concat(elemId, "'></cursor>").concat(options.endDot ? "<dot style='margin-left: 0.3em'>.</dot>" : "");
            this.appElement = document.getElementById("typew-app-".concat(elemId));
            if (!this.appElement) {
                throw new Error("Element with id: ".concat(elemId, " does not exist on document"));
            }
            this.cursorElement = document.getElementById("typew-cursor-".concat(elemId));
            this.cursorElement.style.fontSize = "1.3em";
            this.cursorElement.style.position = "absolute";
            this.cursorElement.style.lineHeight = ".6em";
            this.cursorElement.style.fontWeight = "300";
            this.cursorElement.style.color = options.cursorColor;
            this.speed = options.speed;
            this.cursorSpeed = options.cursorSpeed;
            this.showCursor();
            this.queue = new TypewriterQueue(this);
        }
    }
    TypewriterLight.prototype.showCursor = function () {
        var _this = this;
        var hideCursor = function () {
            setTimeout(function () {
                _this.cursorElement.innerHTML = "";
                _this.showCursor();
            }, _this.cursorSpeed);
        };
        setTimeout(function () {
            _this.cursorElement.innerHTML = "|";
            if (!_this.state.typing) {
                hideCursor();
            }
            else {
                _this.showCursor();
            }
        }, this.cursorSpeed);
    };
    TypewriterLight.prototype.deleteLast = function () {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                var currText = _this.appElement.innerHTML;
                var result = currText.slice(0, currText.length - 1);
                _this.appElement.innerHTML = result;
                resolve();
            }, _this.speed / 2);
        });
    };
    TypewriterLight.prototype.typeOne = function (char) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.appElement.innerHTML += char;
                resolve();
            }, _this.speed);
        });
    };
    TypewriterLight.prototype.wait = function (timeMs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, timeMs);
                    })];
            });
        });
    };
    TypewriterLight.prototype.delete = function (numOfChars) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.state.typing = true;
                return [2, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    numOfChars ? null : (numOfChars = this.appElement.innerHTML.length);
                                    return [4, this.deleteLast().then(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(numOfChars - 1 > 0)) return [3, 2];
                                                        return [4, this.delete(numOfChars - 1).then(function () { return resolve(); })];
                                                    case 1:
                                                        _a.sent();
                                                        return [3, 3];
                                                    case 2:
                                                        this.state.typing = false;
                                                        resolve();
                                                        _a.label = 3;
                                                    case 3: return [2];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })];
            });
        });
    };
    TypewriterLight.prototype.type = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.state.typing = true;
                return [2, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.typeOne(message[0]).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(message.length > 0)) return [3, 3];
                                                    message = message.slice(1, message.length);
                                                    if (!(message.length === 0)) return [3, 1];
                                                    this.state.typing = false;
                                                    resolve();
                                                    return [3, 3];
                                                case 1: return [4, this.type(message).then(function () { return resolve(); })];
                                                case 2:
                                                    _a.sent();
                                                    _a.label = 3;
                                                case 3: return [2];
                                            }
                                        });
                                    }); })];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); })];
            });
        });
    };
    return TypewriterLight;
}());
//# sourceMappingURL=Typewriter.js.map