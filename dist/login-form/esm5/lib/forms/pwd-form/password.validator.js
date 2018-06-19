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
var PasswordValidator = /** @class */ (function () {
    function PasswordValidator() {
    }
    /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    PasswordValidator.longEnough = /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    function (min, max) {
        var /** @type {?} */ func = function (control) {
            var /** @type {?} */ isLongEnough = control.value !== null && control.value.length >= 8 && control.value.length <= 128;
            if (!isLongEnough)
                return { longEnough: true };
            return null;
        };
        return func;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PasswordValidator.number = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ hasNumber = control.value !== null && /\d/.test(control.value);
        if (!hasNumber)
            return { number: true };
        return null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PasswordValidator.upper = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ hasUpper = control.value !== null && /[A-Z]/.test(control.value);
        if (!hasUpper)
            return { upper: true };
        return null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PasswordValidator.lower = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ hasLower = control.value !== null && /[a-z]/.test(control.value);
        if (!hasLower)
            return { lower: true };
        return null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PasswordValidator.char = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ hasChar = control.value !== null && /[!@#$%^&\*()_+\-=\[\]{}|']/.test(control.value);
        if (!hasChar)
            return { char: true };
        return null;
    };
    return PasswordValidator;
}());
export { PasswordValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZm9ybXMvcHdkLWZvcm0vcGFzc3dvcmQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFTQSxJQUFBOzs7Ozs7OztJQUVnQiw0QkFBVTs7Ozs7Y0FBQyxHQUFZLEVBQUUsR0FBWTtRQUVqRCxxQkFBSSxJQUFJLEdBQUcsVUFBQyxPQUF5QjtZQUVuQyxxQkFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztZQUN0RyxFQUFFLENBQUMsQ0FBRSxDQUFDLFlBQWEsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO1lBRTlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR0Esd0JBQU07Ozs7Y0FBQyxPQUFxQjtRQUV4QyxxQkFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLENBQUUsQ0FBQyxTQUFVLENBQUM7WUFDZixNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFMUIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR0EsdUJBQUs7Ozs7Y0FBQyxPQUFxQjtRQUV2QyxxQkFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUUsQ0FBQyxRQUFTLENBQUM7WUFDZCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR0EsdUJBQUs7Ozs7Y0FBQyxPQUFxQjtRQUV2QyxxQkFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUUsQ0FBQyxRQUFTLENBQUM7WUFDZCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR0Esc0JBQUk7Ozs7Y0FBQyxPQUFxQjtRQUV0QyxxQkFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksNEJBQTRCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RixFQUFFLENBQUMsQ0FBRSxDQUFDLE9BQVEsQ0FBQztZQUNiLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDOzs0QkF6RGhCO0lBMkRDLENBQUE7QUFsREQsNkJBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvckZuIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvblJlc3VsdFxyXG57XHJcbiAgW2tleSA6IHN0cmluZ10gOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRWYWxpZGF0b3Jcclxue1xyXG4gIHB1YmxpYyBzdGF0aWMgbG9uZ0Vub3VnaChtaW4gOiBudW1iZXIsIG1heCA6IG51bWJlcikgOiBWYWxpZGF0b3JGblxyXG4gIHtcclxuICAgIGxldCBmdW5jID0gKGNvbnRyb2wgOiBBYnN0cmFjdENvbnRyb2wpIDogeyBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW4gfSB8IG51bGwgPT5cclxuICAgIHtcclxuICAgICAgbGV0IGlzTG9uZ0Vub3VnaCA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPj0gOCAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCA8PSAxMjg7XHJcbiAgICAgIGlmICggIWlzTG9uZ0Vub3VnaCApXHJcbiAgICAgICAgcmV0dXJuIHsgbG9uZ0Vub3VnaDogdHJ1ZSB9O1xyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIG51bWJlcihjb250cm9sIDogRm9ybUNvbnRyb2wpIDogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHtcclxuICAgIGxldCBoYXNOdW1iZXIgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9cXGQvLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNOdW1iZXIgKVxyXG4gICAgICByZXR1cm4geyBudW1iZXI6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgdXBwZXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzVXBwZXIgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9bQS1aXS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc1VwcGVyIClcclxuICAgICAgcmV0dXJuIHsgdXBwZXI6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgbG93ZXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzTG93ZXIgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9bYS16XS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc0xvd2VyIClcclxuICAgICAgcmV0dXJuIHsgbG93ZXI6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY2hhcihjb250cm9sIDogRm9ybUNvbnRyb2wpIDogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHtcclxuICAgIGxldCBoYXNDaGFyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvWyFAIyQlXiZcXCooKV8rXFwtPVxcW1xcXXt9fCddLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaGFzQ2hhciApXHJcbiAgICAgIHJldHVybiB7IGNoYXI6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19