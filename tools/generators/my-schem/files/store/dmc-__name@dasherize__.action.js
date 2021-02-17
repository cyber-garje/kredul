"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myAction = exports.myActionSuccessType = exports.myActionType = exports.prefix = void 0;
var store_1 = require("@ngrx/store");
exports.prefix = '[DMC <%= dasherize(name) %>]';
exports.myActionType = exports.prefix + " my action";
exports.myActionSuccessType = exports.prefix + " my action success";
exports.myAction = store_1.createAction(exports.myActionType);
