"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("./middleware/routes");
var port = 3000;
routes_1.app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
