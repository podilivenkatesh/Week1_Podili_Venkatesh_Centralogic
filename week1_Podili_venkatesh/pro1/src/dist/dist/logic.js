"use strict";
// logic.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitString = void 0;
function splitString(inputString) {
    const revisedString = inputString.replace('_', ' ');
    return { revisedString };
}
exports.splitString = splitString;
