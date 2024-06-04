"use strict";
// import { headers } from 'next/headers';
// import { NextResponse } from 'next/server';
// import StripeWebhooks from '~/core/stripe/stripe-webhooks.enum';
// import Stripe from 'stripe';
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
exports.POST = void 0;
var headers_1 = require("next/headers");
var server_1 = require("next/server");
var get_stripe_1 = require("~/core/stripe/get-stripe");
var logger_1 = require("~/core/logger");
var http_exceptions_1 = require("~/core/http-exceptions");
var mutations_1 = require("~/lib/subscriptions/mutations");
var server_client_1 = require("~/core/supabase/server-client");
var mutations_2 = require("~/lib/organizations/database/mutations");
var stripe_webhooks_enum_1 = require("~/core/stripe/stripe-webhooks.enum");
var configuration_1 = require("~/configuration");
var db_tables_1 = require("~/lib/db-tables");
var STRIPE_SIGNATURE_HEADER = 'stripe-signature';
var webhookSecretKey = 'whsec_D8IJEs2IEkzawbeYZCa6859SkO06Ykc7';
/**
 * @description Handle the webhooks from Stripe related to checkouts
 */
function POST(request) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var logger, signature, rawBody, stripe, client, event, _e, session, _f, subscriptionId, subscription, orgPrevSlots, subscription, subscription, subscription, error_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    logger = logger_1["default"]();
                    signature = headers_1.headers().get(STRIPE_SIGNATURE_HEADER);
                    logger.info("[Stripe] Received Stripe Webhook");
                    if (!webhookSecretKey) {
                        return [2 /*return*/, http_exceptions_1.throwInternalServerErrorException("The variable STRIPE_WEBHOOK_SECRET is unset. Please add the STRIPE_WEBHOOK_SECRET environment variable")];
                    }
                    // verify signature header is not missing
                    if (!signature) {
                        return [2 /*return*/, http_exceptions_1.throwBadRequestException()];
                    }
                    return [4 /*yield*/, request.text()];
                case 1:
                    rawBody = _g.sent();
                    return [4 /*yield*/, get_stripe_1["default"]()];
                case 2:
                    stripe = _g.sent();
                    client = server_client_1["default"]({
                        admin: true
                    });
                    _g.label = 3;
                case 3:
                    _g.trys.push([3, 18, , 19]);
                    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecretKey);
                    logger.info({
                        type: event.type
                    }, "[Stripe] Processing Stripe Webhook...");
                    _e = event.type;
                    switch (_e) {
                        case stripe_webhooks_enum_1["default"].Completed: return [3 /*break*/, 4];
                        case stripe_webhooks_enum_1["default"].ChargeFailed: return [3 /*break*/, 11];
                        case stripe_webhooks_enum_1["default"].AsyncPaymentFailed: return [3 /*break*/, 13];
                        case stripe_webhooks_enum_1["default"].SubscriptionUpdated: return [3 /*break*/, 15];
                    }
                    return [3 /*break*/, 17];
                case 4:
                    session = event.data.object;
                    _f = session.mode;
                    switch (_f) {
                        case 'subscription': return [3 /*break*/, 5];
                        case 'payment': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 11];
                case 5:
                    subscriptionId = session.subscription;
                    return [4 /*yield*/, stripe.subscriptions.retrieve(subscriptionId)];
                case 6:
                    subscription = _g.sent();
                    return [4 /*yield*/, onCheckoutCompleted(client, session, subscription)];
                case 7:
                    _g.sent();
                    return [3 /*break*/, 11];
                case 8: return [4 /*yield*/, client
                        .from(db_tables_1.ORGANIZATIONS_TABLE)
                        .select('slots')
                        .eq('id', Number((_a = session === null || session === void 0 ? void 0 : session.client_reference_id) === null || _a === void 0 ? void 0 : _a.split('/')[0]))
                        .single()];
                case 9:
                    orgPrevSlots = (_g.sent());
                    return [4 /*yield*/, client
                            .from(db_tables_1.ORGANIZATIONS_TABLE)
                            .update({
                            slots: ((_b = orgPrevSlots === null || orgPrevSlots === void 0 ? void 0 : orgPrevSlots.data) === null || _b === void 0 ? void 0 : _b.slots) +
                                Number((_c = session === null || session === void 0 ? void 0 : session.client_reference_id) === null || _c === void 0 ? void 0 : _c.split('/')[1])
                        })
                            .eq('id', Number((_d = session === null || session === void 0 ? void 0 : session.client_reference_id) === null || _d === void 0 ? void 0 : _d.split('/')[0]))];
                case 10:
                    _g.sent();
                    return [3 /*break*/, 11];
                case 11:
                    subscription = event.data.object;
                    return [4 /*yield*/, mutations_1.deleteSubscription(client, subscription.id)];
                case 12:
                    _g.sent();
                    return [3 /*break*/, 17];
                case 13:
                    subscription = event.data.object;
                    return [4 /*yield*/, mutations_1.deleteSubscription(client, subscription.id)];
                case 14:
                    _g.sent();
                    return [3 /*break*/, 17];
                case 15:
                    subscription = event.data.object;
                    return [4 /*yield*/, mutations_1.updateSubscriptionById(client, subscription)];
                case 16:
                    _g.sent();
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/, server_1.NextResponse.json({ success: true })];
                case 18:
                    error_1 = _g.sent();
                    logger.error({
                        error: error_1
                    }, "[Stripe] Webhook handling failed");
                    return [2 /*return*/, http_exceptions_1.throwInternalServerErrorException()];
                case 19: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
/**
 * @description When the checkout is completed, we store the order. The
 * subscription is only activated if the order was paid successfully.
 * Otherwise, we have to wait for a further webhook
 */
function onCheckoutCompleted(client, session, subscription) {
    return __awaiter(this, void 0, void 0, function () {
        var organizationId, customerId, _a, error, data, productId, product;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    organizationId = getOrganizationIdFromClientReference(session);
                    customerId = session.customer;
                    return [4 /*yield*/, mutations_1.addSubscription(client, subscription)];
                case 1:
                    _a = _b.sent(), error = _a.error, data = _a.data;
                    productId = subscription.plan.id;
                    product = configuration_1["default"].stripe.products.find(function (i) { return i.stripeProductId === productId; });
                    return [4 /*yield*/, mutations_2.updateOrganization(client, {
                            id: organizationId,
                            data: { credits: product === null || product === void 0 ? void 0 : product.credits }
                        })];
                case 2:
                    _b.sent();
                    if (error) {
                        return [2 /*return*/, Promise.reject("Failed to add subscription to the database: " + error)];
                    }
                    return [2 /*return*/, mutations_2.setOrganizationSubscriptionData(client, {
                            organizationId: organizationId,
                            customerId: customerId,
                            subscriptionId: data.id
                        })];
            }
        });
    });
}
/**
 * @name getOrganizationIdFromClientReference
 * @description Get the organization ID from the client reference ID
 * @param session
 */
function getOrganizationIdFromClientReference(session) {
    return Number(session.client_reference_id);
}
