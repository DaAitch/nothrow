"use strict";
exports.nothrow = function (accessor) {
    try {
        return accessor();
    }
    catch (e) {
        return undefined;
    }
};
//# sourceMappingURL=nothrow.js.map