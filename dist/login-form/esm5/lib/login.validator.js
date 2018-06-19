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
var LoginValidator = /** @class */ (function () {
    function LoginValidator() {
    }
    /**
     * @param {?} regexp
     * @return {?}
     */
    LoginValidator.custom = /**
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
    LoginValidator.email = /**
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
    LoginValidator.phone = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ isPhone = control.value !== null && /^\+?\d*$/.test(control.value);
        if (!isPhone)
            return { phone: true };
        return null;
    };
    return LoginValidator;
}());
export { LoginValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4udmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvbG9naW4udmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFTQSxJQUFBOzs7Ozs7O0lBRWdCLHFCQUFNOzs7O2NBQUMsTUFBZTtRQUVsQyxxQkFBSSxJQUFJLEdBQUcsVUFBQyxPQUF5QjtZQUVuQyxxQkFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEUsRUFBRSxDQUFDLENBQUUsQ0FBQyxZQUFhLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRyxJQUFJLEVBQUUsQ0FBQztZQUUzQixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2IsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdBLG9CQUFLOzs7O2NBQUMsT0FBcUI7UUFFdkMscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckcsRUFBRSxDQUFDLENBQUUsQ0FBQyxPQUFRLENBQUM7WUFDYixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR0Esb0JBQUs7Ozs7Y0FBQyxPQUFxQjtRQUV2QyxxQkFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkUsRUFBRSxDQUFDLENBQUUsQ0FBQyxPQUFRLENBQUM7WUFDYixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQzs7eUJBdkNoQjtJQTBDQyxDQUFBO0FBakNELDBCQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JGbiB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25SZXN1bHRcclxue1xyXG4gIFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvZ2luVmFsaWRhdG9yXHJcbntcclxuICBwdWJsaWMgc3RhdGljIGN1c3RvbShyZWdleHAgOiBSZWdFeHApIDogVmFsaWRhdG9yRm5cclxuICB7XHJcbiAgICBsZXQgZnVuYyA9IChjb250cm9sIDogQWJzdHJhY3RDb250cm9sKSA6IHsgW2tleSA6IHN0cmluZ10gOiBib29sZWFuIH0gfCBudWxsID0+XHJcbiAgICB7XHJcbiAgICAgIGxldCBpc1Jlc3BlY3RmdWwgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIHJlZ2V4cC50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgICBpZiAoICFpc1Jlc3BlY3RmdWwgKVxyXG4gICAgICAgIHJldHVybiB7IGN1c3RvbSA6IHRydWUgfTtcclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBlbWFpbChjb250cm9sIDogRm9ybUNvbnRyb2wpIDogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHtcclxuICAgIGxldCBpc0VtYWlsID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW2EtejAtOS5fJSstXStAW2EtejAtOS4tXStcXC5bYS16XXsyLDR9Ly50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaXNFbWFpbCApXHJcbiAgICAgIHJldHVybiB7IGVtYWlsOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHBob25lKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGlzUGhvbmUgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9eXFwrP1xcZCokLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaXNQaG9uZSApXHJcbiAgICAgIHJldHVybiB7IHBob25lOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=