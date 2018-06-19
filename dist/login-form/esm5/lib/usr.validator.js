/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function ValidationResult() { }
function ValidationResult_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [key : string] : boolean;
    */
}
var UsrValidator = /** @class */ (function () {
    function UsrValidator() {
    }
    /**
     * @param {?} regexp
     * @return {?}
     */
    UsrValidator.custom = /**
     * @param {?} regexp
     * @return {?}
     */
    function (regexp) {
        var /** @type {?} */ func = function (control) {
            var /** @type {?} */ isRespectful = control.value !== null && regexp.test(control.value);
            if (!isRespectful)
                return { custom: true };
            return null;
        };
        return func;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    UsrValidator.email = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ isEmail = control.value !== null && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(control.value);
        if (!isEmail)
            return { email: true };
        return null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    UsrValidator.phone = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ isPhone = control.value !== null && /^\+?\d*$/.test(control.value);
        if (!isPhone)
            return { phone: true };
        return null;
    };
    return UsrValidator;
}());
export { UsrValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNyLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtLyIsInNvdXJjZXMiOlsibGliL3Vzci52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBLElBQUE7Ozs7Ozs7SUFFZ0IsbUJBQU07Ozs7Y0FBQyxNQUFlO1FBRWxDLHFCQUFJLElBQUksR0FBRyxVQUFDLE9BQXlCO1lBRW5DLHFCQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RSxFQUFFLENBQUMsQ0FBRSxDQUFDLFlBQWEsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFHLElBQUksRUFBRSxDQUFDO1lBRTNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR0Esa0JBQUs7Ozs7Y0FBQyxPQUFxQjtRQUV2QyxxQkFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksd0NBQXdDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRyxFQUFFLENBQUMsQ0FBRSxDQUFDLE9BQVEsQ0FBQztZQUNiLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHQSxrQkFBSzs7OztjQUFDLE9BQXFCO1FBRXZDLHFCQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RSxFQUFFLENBQUMsQ0FBRSxDQUFDLE9BQVEsQ0FBQztZQUNiLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDOzt1QkF2Q2hCO0lBMENDLENBQUE7QUFqQ0Qsd0JBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvckZuIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvblJlc3VsdFxyXG57XHJcbiAgW2tleSA6IHN0cmluZ10gOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXNyVmFsaWRhdG9yXHJcbntcclxuICBwdWJsaWMgc3RhdGljIGN1c3RvbShyZWdleHAgOiBSZWdFeHApIDogVmFsaWRhdG9yRm5cclxuICB7XHJcbiAgICBsZXQgZnVuYyA9IChjb250cm9sIDogQWJzdHJhY3RDb250cm9sKSA6IHsgW2tleSA6IHN0cmluZ10gOiBib29sZWFuIH0gfCBudWxsID0+XHJcbiAgICB7XHJcbiAgICAgIGxldCBpc1Jlc3BlY3RmdWwgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIHJlZ2V4cC50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgICBpZiAoICFpc1Jlc3BlY3RmdWwgKVxyXG4gICAgICAgIHJldHVybiB7IGN1c3RvbSA6IHRydWUgfTtcclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBlbWFpbChjb250cm9sIDogRm9ybUNvbnRyb2wpIDogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHtcclxuICAgIGxldCBpc0VtYWlsID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW2EtejAtOS5fJSstXStAW2EtejAtOS4tXStcXC5bYS16XXsyLDR9Ly50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaXNFbWFpbCApXHJcbiAgICAgIHJldHVybiB7IGVtYWlsOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHBob25lKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGlzUGhvbmUgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9eXFwrP1xcZCokLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaXNQaG9uZSApXHJcbiAgICAgIHJldHVybiB7IHBob25lOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=