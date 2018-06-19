/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
export class ExistsLayoutPipe {
    /**
     * @param {?} value
     * @param {?} layout
     * @return {?}
     */
    transform(value, layout) {
        let /** @type {?} */ exist = false;
        for (let /** @type {?} */ key of Object.keys(value))
            if (value[key] === layout)
                exist = true;
        return exist;
    }
}
ExistsLayoutPipe.decorators = [
    { type: Pipe, args: [{ name: 'existsLayout' },] },
];
function ExistsLayoutPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ExistsLayoutPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ExistsLayoutPipe.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzLWxheW91dC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvcGlwZXMvZXhpc3RzLWxheW91dC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQWUsZUFBZSxDQUFDO0FBSTlDLE1BQU07Ozs7OztJQUVKLFNBQVMsQ0FBQyxLQUFXLEVBQUUsTUFBZTtRQUVwQyxxQkFBSSxLQUFLLEdBQWEsS0FBSyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxDQUFFLHFCQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxNQUFPLENBQUM7Z0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFakIsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNkOzs7WUFYRixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7IG5hbWU6ICdleGlzdHNMYXlvdXQnIH0pXHJcbmV4cG9ydCBjbGFzcyBFeGlzdHNMYXlvdXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybVxyXG57XHJcbiAgdHJhbnNmb3JtKHZhbHVlIDogYW55LCBsYXlvdXQgOiBzdHJpbmcpXHJcbiAge1xyXG4gICAgbGV0IGV4aXN0IDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZm9yICggbGV0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZSkgKVxyXG4gICAgICBpZiAoIHZhbHVlW2tleV0gPT09IGxheW91dCApXHJcbiAgICAgICAgZXhpc3QgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBleGlzdDtcclxuICB9XHJcbn1cclxuIl19