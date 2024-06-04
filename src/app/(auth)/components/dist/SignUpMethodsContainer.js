'use client';
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var If_1 = require("~/core/ui/If");
var Trans_1 = require("~/core/ui/Trans");
var EmailPasswordSignUpContainer_1 = require("~/app/(auth)/components/EmailPasswordSignUpContainer");
var PhoneNumberSignInContainer_1 = require("~/app/(auth)/components/PhoneNumberSignInContainer");
var EmailLinkAuth_1 = require("~/app/(auth)/components/EmailLinkAuth");
var OAuthProviders_1 = require("~/app/(auth)/components/OAuthProviders");
var configuration_1 = require("~/configuration");
function SignUpMethodsContainer() {
    var router = navigation_1.useRouter();
    var onSignUp = react_1.useCallback(function () {
        router.push("/ai-voice-generator");
    }, [router]);
    return (React.createElement(React.Fragment, null,
        React.createElement(OAuthProviders_1["default"], null),
        React.createElement(If_1["default"], { condition: configuration_1["default"].auth.providers.emailPassword },
            React.createElement("div", null,
                React.createElement("span", { className: 'text-xs text-gray-400' },
                    React.createElement(Trans_1["default"], { i18nKey: 'auth:orContinueWithEmail' }))),
            React.createElement(EmailPasswordSignUpContainer_1["default"], { onSignUp: onSignUp })),
        React.createElement(If_1["default"], { condition: configuration_1["default"].auth.providers.phoneNumber },
            React.createElement(PhoneNumberSignInContainer_1["default"], { onSignIn: onSignUp })),
        React.createElement(If_1["default"], { condition: configuration_1["default"].auth.providers.emailLink },
            React.createElement(EmailLinkAuth_1["default"], null))));
}
exports["default"] = SignUpMethodsContainer;
