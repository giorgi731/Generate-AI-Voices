"use strict";
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
var jsonwebtoken_1 = require("jsonwebtoken");
var configuration_1 = require("~/configuration");
var mutation_1 = require("swr/mutation");
var use_supabase_1 = require("./use-supabase");
/**
 * @name useSignUpWithEmailAndPassword
 */
function useSignUpWithEmailAndPassword() {
    var _this = this;
    var client = use_supabase_1["default"]();
    var key = ['auth', 'sign-up-with-email-password'];
    return mutation_1["default"](key, function (_, _a) {
        var credentials = _a.arg;
        var emailRedirectTo = [
            configuration_1["default"].site.siteUrl,
            configuration_1["default"].paths.signIn,
        ].join('/');
        return client.auth
            .signUp(__assign(__assign({}, credentials), { options: {
                emailRedirectTo: emailRedirectTo
            } }))
            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (response.error) {
                    throw response.error.message;
                }
                // const userId = response?.data?.user?.id;
                // await client
                //   .from(USERS_TABLE)
                //   .insert({
                //     id: userId,
                //     balance: 1500,
                //     onboarded: false,
                //     email: response?.data?.user?.email,
                //     display_name: response?.data?.user?.email?.split('@')[0],
                //     neversea: false,
                //     photo_url: '',
                //   })
                //   .throwOnError();
                // const { data: organizationId, error } = await client
                //   .rpc('create_new_organization', {
                //     org_name: response?.data?.user?.email?.split('@')[0],
                //     api_key: generateApiKey(userId),
                //     credits: 1500,
                //     user_id: userId,
                //     create_user: false,
                //   })
                //   .throwOnError()
                //   .single();
                // Return the response data along with the API Key
                // console.log(response, "vedemmmm???")
                // if (response.error) {
                //   return { error: response?.error?.message };
                // }
                return [2 /*return*/, __assign({}, response.data)];
            });
        }); });
    });
}
function generateApiKey(userId) {
    // Encrypt the payload using JWT and HS256 algorithm
    var apiKey = jsonwebtoken_1["default"].sign(userId, 'revocalize2023!@#', { algorithm: 'HS256' });
    return apiKey;
}
exports["default"] = useSignUpWithEmailAndPassword;
