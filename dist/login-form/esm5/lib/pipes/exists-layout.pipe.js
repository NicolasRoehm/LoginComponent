/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ExistsLayoutPipe = /** @class */ (function () {
    function ExistsLayoutPipe() {
    }
    /**
     * @param {?} value
     * @param {?} layout
     * @return {?}
     */
    ExistsLayoutPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} layout
     * @return {?}
     */
    function (value, layout) {
        var /** @type {?} */ exist = false;
        try {
            for (var _a = tslib_1.__values(Object.keys(value)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                if (value[key] === layout)
                    exist = true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return exist;
        var e_1, _c;
    };
    ExistsLayoutPipe.decorators = [
        { type: Pipe, args: [{ name: 'existsLayout' },] },
    ];
    return ExistsLayoutPipe;
}());
export { ExistsLayoutPipe };
function ExistsLayoutPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ExistsLayoutPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ExistsLayoutPipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzLWxheW91dC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvcGlwZXMvZXhpc3RzLWxheW91dC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFlLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBTTVDLG9DQUFTOzs7OztJQUFULFVBQVUsS0FBVyxFQUFFLE1BQWU7UUFFcEMscUJBQUksS0FBSyxHQUFhLEtBQUssQ0FBQzs7WUFDNUIsR0FBRyxDQUFDLENBQWEsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUEsZ0JBQUE7Z0JBQTdCLElBQUksR0FBRyxXQUFBO2dCQUNYLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFPLENBQUM7b0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUM7YUFBQTs7Ozs7Ozs7O1FBRWpCLE1BQU0sQ0FBQyxLQUFLLENBQUM7O0tBQ2Q7O2dCQVhGLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUU7OzJCQUg5Qjs7U0FJYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlIH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHsgbmFtZTogJ2V4aXN0c0xheW91dCcgfSlcclxuZXhwb3J0IGNsYXNzIEV4aXN0c0xheW91dFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtXHJcbntcclxuICB0cmFuc2Zvcm0odmFsdWUgOiBhbnksIGxheW91dCA6IHN0cmluZylcclxuICB7XHJcbiAgICBsZXQgZXhpc3QgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBmb3IgKCBsZXQga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSApXHJcbiAgICAgIGlmICggdmFsdWVba2V5XSA9PT0gbGF5b3V0IClcclxuICAgICAgICBleGlzdCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGV4aXN0O1xyXG4gIH1cclxufVxyXG4iXX0=