"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dmc = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var effects_1 = require("@ngrx/effects");
var dmc_____dasherize_name_____action_1 = require("./dmc-<%= dasherize(name) %>.action");
var Dmc = /** @class */ (function () {
    function Dmc() {
    }
    Dmc = __decorate([
        core_1.Injectable()
    ], Dmc);
    return Dmc;
}());
exports.Dmc = Dmc;
(name) %  > Effect;
{
    myAction$ = effects_1.createEffect(function () {
        _this.actions$.pipe(effects_1.ofType(dmc_____dasherize_name_____action_1.myActionType), operators_1.mergeMap(function () { return _this.myActionService.getAll()
            .pipe(operators_1.map(function (data) { return ({ type: dmc_____dasherize_name_____action_1.myActionSuccessType, payload: data }); }), operators_1.catchError(function () { return rxjs_1.EMPTY; })); }));
    });
    constructor(private, actions$, effects_1.Actions, private, myActionService, MyActionService);
    { }
}
