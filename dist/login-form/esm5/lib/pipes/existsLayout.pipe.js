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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzTGF5b3V0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9leGlzdHNMYXlvdXQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBZSxlQUFlLENBQUM7Ozs7Ozs7OztJQU01QyxvQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQVcsRUFBRSxNQUFlO1FBRXBDLHFCQUFJLEtBQUssR0FBYSxLQUFLLENBQUM7O1lBQzVCLEdBQUcsQ0FBQyxDQUFhLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBLGdCQUFBO2dCQUE3QixJQUFJLEdBQUcsV0FBQTtnQkFDWCxFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTyxDQUFDO29CQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQUE7Ozs7Ozs7OztRQUVqQixNQUFNLENBQUMsS0FBSyxDQUFDOztLQUNkOztnQkFYRixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFOzsyQkFIOUI7O1NBSWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7IG5hbWU6ICdleGlzdHNMYXlvdXQnIH0pXHJcbmV4cG9ydCBjbGFzcyBFeGlzdHNMYXlvdXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybVxyXG57XHJcbiAgdHJhbnNmb3JtKHZhbHVlIDogYW55LCBsYXlvdXQgOiBzdHJpbmcpXHJcbiAge1xyXG4gICAgbGV0IGV4aXN0IDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZm9yICggbGV0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZSkgKVxyXG4gICAgICBpZiAoIHZhbHVlW2tleV0gPT09IGxheW91dCApXHJcbiAgICAgICAgZXhpc3QgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBleGlzdDtcclxuICB9XHJcbn1cclxuIl19