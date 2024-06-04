'use client';
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
exports.__esModule = true;
var react_1 = require("react");
var Trans_1 = require("~/core/ui/Trans");
var AuthErrorMessage_1 = require("./AuthErrorMessage");
var use_sign_up_with_email_password_1 = require("~/core/hooks/use-sign-up-with-email-password");
var If_1 = require("~/core/ui/If");
var Alert_1 = require("~/core/ui/Alert");
var EmailPasswordSignUpForm_1 = require("~/app/(auth)/components/EmailPasswordSignUpForm");
var configuration_1 = require("~/configuration");
var requireEmailConfirmation = configuration_1["default"].auth.requireEmailConfirmation;
var EmailPasswordSignUpContainer = function (_a) {
    var onSignUp = _a.onSignUp, onSubmit = _a.onSubmit, onError = _a.onError;
    var signUpMutation = use_sign_up_with_email_password_1["default"]();
    var redirecting = react_1.useRef(false);
    var loading = signUpMutation.isMutating || redirecting.current;
    var _b = react_1.useState(false), showVerifyEmailAlert = _b[0], setShowVerifyEmailAlert = _b[1];
    var callOnErrorCallback = react_1.useCallback(function () {
        if (signUpMutation.error && onError) {
            onError(signUpMutation.error);
        }
    }, [signUpMutation.error, onError]);
    react_1.useEffect(function () {
        callOnErrorCallback();
    }, [callOnErrorCallback]);
    var onSignupRequested = react_1.useCallback(function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var data, userId, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (loading) {
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, signUpMutation.trigger(params)];
                case 2:
                    data = _b.sent();
                    // If the user is required to confirm their email, we display a message
                    if (requireEmailConfirmation) {
                        setShowVerifyEmailAlert(true);
                        if (onSubmit) {
                            userId = (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id;
                            onSubmit(userId);
                        }
                    }
                    else {
                        // Otherwise, we redirect the user to the onboarding page
                        onSignUp && onSignUp();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    if (onError) {
                        onError(error_1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [loading, onError, onSignUp, onSubmit, signUpMutation]);
    return (React.createElement(React.Fragment, null,
        React.createElement(If_1["default"], { condition: showVerifyEmailAlert },
            React.createElement(Alert_1["default"], { type: 'success' },
                React.createElement(Alert_1["default"].Heading, null,
                    React.createElement(Trans_1["default"], { i18nKey: 'auth:emailConfirmationAlertHeading' })),
                React.createElement("p", { "data-cy": 'email-confirmation-alert' },
                    React.createElement(Trans_1["default"], { i18nKey: 'auth:emailConfirmationAlertBody' })))),
        React.createElement(If_1["default"], { condition: !showVerifyEmailAlert },
            React.createElement(AuthErrorMessage_1["default"], { error: signUpMutation.error }),
            React.createElement(EmailPasswordSignUpForm_1["default"], { onSubmit: onSignupRequested, loading: loading }))));
};
exports["default"] = EmailPasswordSignUpContainer;
