'use client';
"use strict";
exports.__esModule = true;
var recharts_1 = require("recharts");
var react_1 = require("react");
var Tile_1 = require("~/core/ui/Tile");
var Heading_1 = require("~/core/ui/Heading");
var use_user_session_1 = require("~/core/hooks/use-user-session");
function DashboardDemo() {
    var mrr = react_1.useMemo(function () { return generateDemoData(); }, []);
    var visitors = react_1.useMemo(function () { return generateDemoData(); }, []);
    var returningVisitors = react_1.useMemo(function () { return generateDemoData(); }, []);
    var churn = react_1.useMemo(function () { return generateDemoData(); }, []);
    var netRevenue = react_1.useMemo(function () { return generateDemoData(); }, []);
    var fees = react_1.useMemo(function () { return generateDemoData(); }, []);
    var newCustomers = react_1.useMemo(function () { return generateDemoData(); }, []);
    var tickets = react_1.useMemo(function () { return generateDemoData(); }, []);
    var activeUsers = react_1.useMemo(function () { return generateDemoData(); }, []);
    return (React.createElement("div", { className: 'flex flex-col space-y-6 pb-36' },
        React.createElement(UserGreetings, null),
        React.createElement("div", { className: 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3' +
                ' xl:grid-cols-4' },
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "Monthly Recurring Revenue"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement("div", { className: 'flex justify-between' },
                        React.createElement(Tile_1["default"].Figure, null, "$" + mrr[1]),
                        React.createElement(Tile_1["default"].Trend, { trend: 'up' }, "20%")),
                    React.createElement(Chart, { data: mrr[0] }))),
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "Revenue"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement("div", { className: 'flex justify-between' },
                        React.createElement(Tile_1["default"].Figure, null, "$" + netRevenue[1]),
                        React.createElement(Tile_1["default"].Trend, { trend: 'up' }, "12%")),
                    React.createElement(Chart, { data: netRevenue[0] }))),
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "Fees"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement("div", { className: 'flex justify-between' },
                        React.createElement(Tile_1["default"].Figure, null, "$" + fees[1]),
                        React.createElement(Tile_1["default"].Trend, { trend: 'up' }, "9%")),
                    React.createElement(Chart, { data: fees[0] }))),
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "New Customers"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement("div", { className: 'flex justify-between' },
                        React.createElement(Tile_1["default"].Figure, null, "" + newCustomers[1]),
                        React.createElement(Tile_1["default"].Trend, { trend: 'down' }, "-25%")),
                    React.createElement(Chart, { data: newCustomers[0] }))),
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "Visitors"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement("div", { className: 'flex justify-between' },
                        React.createElement(Tile_1["default"].Figure, null, visitors[1]),
                        React.createElement(Tile_1["default"].Trend, { trend: 'down' }, "-4.3%")),
                    React.createElement(Chart, { data: visitors[0] }))),
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "Returning Visitors"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement("div", { className: 'flex justify-between' },
                        React.createElement(Tile_1["default"].Figure, null, returningVisitors[1]),
                        React.createElement(Tile_1["default"].Trend, { trend: 'stale' }, "10%")),
                    React.createElement(Chart, { data: returningVisitors[0] }))),
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "Churn"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement("div", { className: 'flex justify-between' },
                        React.createElement(Tile_1["default"].Figure, null,
                            churn[1],
                            "%"),
                        React.createElement(Tile_1["default"].Trend, { trend: 'up' }, "-10%")),
                    React.createElement(Chart, { data: churn[0] }))),
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "Support Tickets"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement("div", { className: 'flex justify-between' },
                        React.createElement(Tile_1["default"].Figure, null, tickets[1]),
                        React.createElement(Tile_1["default"].Trend, { trend: 'up' }, "-30%")),
                    React.createElement(Chart, { data: tickets[0] })))),
        React.createElement("div", null,
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "Active Users"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement("div", { className: 'flex justify-between' },
                        React.createElement(Tile_1["default"].Figure, null, activeUsers[1]),
                        React.createElement(Tile_1["default"].Trend, { trend: 'up' }, "10%")),
                    React.createElement(Chart, { data: activeUsers[0] })))),
        React.createElement("div", null,
            React.createElement(Tile_1["default"], null,
                React.createElement(Tile_1["default"].Heading, null, "Customers"),
                React.createElement(Tile_1["default"].Body, null,
                    React.createElement(CustomersTable, null))))));
}
exports["default"] = DashboardDemo;
function UserGreetings() {
    var _a, _b, _c, _d;
    var user = use_user_session_1["default"]();
    var userDisplayName = (_d = (_b = (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.displayName) !== null && _b !== void 0 ? _b : (_c = user === null || user === void 0 ? void 0 : user.auth) === null || _c === void 0 ? void 0 : _c.user.email) !== null && _d !== void 0 ? _d : "Anonymous";
    return (React.createElement("div", null,
        React.createElement(Heading_1["default"], { type: 4 },
            "Welcome Back, ",
            userDisplayName),
        React.createElement("p", { className: 'text-gray-500 dark:text-gray-400' },
            React.createElement("span", null, "Here's what is happening in your SaaS"))));
}
function generateDemoData() {
    var today = new Date();
    var formatter = new Intl.DateTimeFormat('en-us', {
        month: 'long',
        year: '2-digit'
    });
    var data = [];
    for (var n = 8; n > 0; n -= 1) {
        var date = new Date(today.getFullYear(), today.getMonth() - n, 1);
        data.push({
            name: formatter.format(date),
            value: (Math.random() * 1000).toFixed(1)
        });
    }
    return [data, data[data.length - 1].value];
}
function Chart(props) {
    return (React.createElement("div", { className: 'h-36' },
        React.createElement(recharts_1.ResponsiveContainer, { width: '100%', height: '100%' },
            React.createElement(recharts_1.LineChart, { width: 400, height: 100, data: props.data },
                React.createElement(recharts_1.Line, { className: 'text-primary-500', type: "monotone", dataKey: "value", stroke: "currentColor", strokeWidth: 2.5, dot: false }),
                React.createElement(recharts_1.XAxis, { className: "text-[9px]", axisLine: false, tickSize: 0, dataKey: "name", height: 15, dy: 10 })))));
}
function CustomersTable() {
    return (React.createElement("table", { className: 'Table' },
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "Customer"),
                React.createElement("th", null, "Plan"),
                React.createElement("th", null, "MRR"),
                React.createElement("th", null, "Logins"),
                React.createElement("th", null, "Status"))),
        React.createElement("tbody", null,
            React.createElement("tr", null,
                React.createElement("td", null, "Pippin Oddo"),
                React.createElement("td", null, "Pro"),
                React.createElement("td", null, "$100.2"),
                React.createElement("td", null, "920"),
                React.createElement("td", null,
                    React.createElement(Tile_1["default"].Badge, { trend: 'up' }, "Healthy"))),
            React.createElement("tr", null,
                React.createElement("td", null, "V\u00E4in\u00F6 P\u00E1nfilo"),
                React.createElement("td", null, "Basic"),
                React.createElement("td", null, "$40.6"),
                React.createElement("td", null, "300"),
                React.createElement("td", null,
                    React.createElement(Tile_1["default"].Badge, { trend: 'stale' }, "Possible Churn"))),
            React.createElement("tr", null,
                React.createElement("td", null, "Giorgos Quinten"),
                React.createElement("td", null, "Pro"),
                React.createElement("td", null, "$2004.3"),
                React.createElement("td", null, "1000"),
                React.createElement("td", null,
                    React.createElement(Tile_1["default"].Badge, { trend: 'up' }, "Healthy"))),
            React.createElement("tr", null,
                React.createElement("td", null, "Adhelm Otis"),
                React.createElement("td", null, "Basic"),
                React.createElement("td", null, "$0"),
                React.createElement("td", null, "10"),
                React.createElement("td", null,
                    React.createElement(Tile_1["default"].Badge, { trend: 'down' }, "Churned"))))));
}
