"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidaRotas = void 0;
var ValidaRotas = /** @class */ (function () {
    function ValidaRotas() {
    }
    ValidaRotas.prototype.canActivate = function (route, state) {
        // Usuario autenticado.
        return true;
    };
    return ValidaRotas;
}());
exports.ValidaRotas = ValidaRotas;
//# sourceMappingURL=valida.rotas.js.map