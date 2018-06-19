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
var PwdValidator = /** @class */ (function () {
    function PwdValidator() {
    }
    /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    PwdValidator.longEnough = /**
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
    PwdValidator.number = /**
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
    PwdValidator.upper = /**
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
    PwdValidator.lower = /**
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
    PwdValidator.char = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ hasChar = control.value !== null && /[!@#$%^&\*()_+\-=\[\]{}|']/.test(control.value);
        if (!hasChar)
            return { char: true };
        return null;
    };
    return PwdValidator;
}());
export { PwdValidator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHdkLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtLyIsInNvdXJjZXMiOlsibGliL2Zvcm1zL3B3ZC1mb3JtL3B3ZC52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBLElBQUE7Ozs7Ozs7O0lBRWdCLHVCQUFVOzs7OztjQUFDLEdBQVksRUFBRSxHQUFZO1FBRWpELHFCQUFJLElBQUksR0FBRyxVQUFDLE9BQXlCO1lBRW5DLHFCQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1lBQ3RHLEVBQUUsQ0FBQyxDQUFFLENBQUMsWUFBYSxDQUFDO2dCQUNsQixNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFFOUIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHQSxtQkFBTTs7OztjQUFDLE9BQXFCO1FBRXhDLHFCQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRSxFQUFFLENBQUMsQ0FBRSxDQUFDLFNBQVUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUUxQixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHQSxrQkFBSzs7OztjQUFDLE9BQXFCO1FBRXZDLHFCQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxFQUFFLENBQUMsQ0FBRSxDQUFDLFFBQVMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHQSxrQkFBSzs7OztjQUFDLE9BQXFCO1FBRXZDLHFCQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxFQUFFLENBQUMsQ0FBRSxDQUFDLFFBQVMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHQSxpQkFBSTs7OztjQUFDLE9BQXFCO1FBRXRDLHFCQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pGLEVBQUUsQ0FBQyxDQUFFLENBQUMsT0FBUSxDQUFDO1lBQ2IsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUM7O3VCQXpEaEI7SUEyREMsQ0FBQTtBQWxERCx3QkFrREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yRm4gfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uUmVzdWx0XHJcbntcclxuICBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQd2RWYWxpZGF0b3Jcclxue1xyXG4gIHB1YmxpYyBzdGF0aWMgbG9uZ0Vub3VnaChtaW4gOiBudW1iZXIsIG1heCA6IG51bWJlcikgOiBWYWxpZGF0b3JGblxyXG4gIHtcclxuICAgIGxldCBmdW5jID0gKGNvbnRyb2wgOiBBYnN0cmFjdENvbnRyb2wpIDogeyBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW4gfSB8IG51bGwgPT5cclxuICAgIHtcclxuICAgICAgbGV0IGlzTG9uZ0Vub3VnaCA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPj0gOCAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCA8PSAxMjg7XHJcbiAgICAgIGlmICggIWlzTG9uZ0Vub3VnaCApXHJcbiAgICAgICAgcmV0dXJuIHsgbG9uZ0Vub3VnaDogdHJ1ZSB9O1xyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIG51bWJlcihjb250cm9sIDogRm9ybUNvbnRyb2wpIDogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHtcclxuICAgIGxldCBoYXNOdW1iZXIgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9cXGQvLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNOdW1iZXIgKVxyXG4gICAgICByZXR1cm4geyBudW1iZXI6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgdXBwZXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzVXBwZXIgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9bQS1aXS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc1VwcGVyIClcclxuICAgICAgcmV0dXJuIHsgdXBwZXI6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgbG93ZXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzTG93ZXIgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9bYS16XS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc0xvd2VyIClcclxuICAgICAgcmV0dXJuIHsgbG93ZXI6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY2hhcihjb250cm9sIDogRm9ybUNvbnRyb2wpIDogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHtcclxuICAgIGxldCBoYXNDaGFyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvWyFAIyQlXiZcXCooKV8rXFwtPVxcW1xcXXt9fCddLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaGFzQ2hhciApXHJcbiAgICAgIHJldHVybiB7IGNoYXI6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19