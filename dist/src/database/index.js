"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connnectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connnectToDatabase() {
    mongoose_1.default
        .connect("mongodb://localhost:27017/your-database")
        .then(() => {
        console.log("Connected to database");
    })
        .catch(() => {
        console.log("Failed to connect to database");
    });
}
exports.connnectToDatabase = connnectToDatabase;
