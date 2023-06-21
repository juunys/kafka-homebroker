"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAssetsController = void 0;
const common_1 = require("@nestjs/common");
const wallet_assets_service_1 = require("./wallet-assets.service");
let WalletAssetsController = exports.WalletAssetsController = class WalletAssetsController {
    constructor(walletAssetsService) {
        this.walletAssetsService = walletAssetsService;
    }
    all(wallet_id) {
        return this.walletAssetsService.all({ wallet_id });
    }
    create(wallet_id, body) {
        return this.walletAssetsService.create({
            wallet_id,
            ...body,
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('wallet_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletAssetsController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('wallet_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WalletAssetsController.prototype, "create", null);
exports.WalletAssetsController = WalletAssetsController = __decorate([
    (0, common_1.Controller)('wallets/:wallet_id/assets'),
    __metadata("design:paramtypes", [wallet_assets_service_1.WalletAssetsService])
], WalletAssetsController);
//# sourceMappingURL=wallet-assets.controller.js.map