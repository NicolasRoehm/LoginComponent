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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzTGF5b3V0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9leGlzdHNMYXlvdXQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFlLGVBQWUsQ0FBQztBQUk5QyxNQUFNOzs7Ozs7SUFFSixTQUFTLENBQUMsS0FBVyxFQUFFLE1BQWU7UUFFcEMscUJBQUksS0FBSyxHQUFhLEtBQUssQ0FBQztRQUM1QixHQUFHLENBQUMsQ0FBRSxxQkFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTyxDQUFDO2dCQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDZDs7O1lBWEYsSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUgfSAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnZXhpc3RzTGF5b3V0JyB9KVxyXG5leHBvcnQgY2xhc3MgRXhpc3RzTGF5b3V0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm1cclxue1xyXG4gIHRyYW5zZm9ybSh2YWx1ZSA6IGFueSwgbGF5b3V0IDogc3RyaW5nKVxyXG4gIHtcclxuICAgIGxldCBleGlzdCA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGZvciAoIGxldCBrZXkgb2YgT2JqZWN0LmtleXModmFsdWUpIClcclxuICAgICAgaWYgKCB2YWx1ZVtrZXldID09PSBsYXlvdXQgKVxyXG4gICAgICAgIGV4aXN0ID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZXhpc3Q7XHJcbiAgfVxyXG59XHJcbiJdfQ==