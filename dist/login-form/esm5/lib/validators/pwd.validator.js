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
            var /** @type {?} */ isLongEnough = control.value !== null && control.value.length >= min && control.value.length <= max;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHdkLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtLyIsInNvdXJjZXMiOlsibGliL3ZhbGlkYXRvcnMvcHdkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBU0EsSUFBQTs7Ozs7Ozs7SUFFZ0IsdUJBQVU7Ozs7O2NBQUMsR0FBWSxFQUFFLEdBQVk7UUFFakQscUJBQUksSUFBSSxHQUFHLFVBQUMsT0FBeUI7WUFFbkMscUJBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7WUFDeEcsRUFBRSxDQUFDLENBQUUsQ0FBQyxZQUFhLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUU5QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2IsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdBLG1CQUFNOzs7O2NBQUMsT0FBcUI7UUFFeEMscUJBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25FLEVBQUUsQ0FBQyxDQUFFLENBQUMsU0FBVSxDQUFDO1lBQ2YsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRTFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdBLGtCQUFLOzs7O2NBQUMsT0FBcUI7UUFFdkMscUJBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxDQUFFLENBQUMsUUFBUyxDQUFDO1lBQ2QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdBLGtCQUFLOzs7O2NBQUMsT0FBcUI7UUFFdkMscUJBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxDQUFFLENBQUMsUUFBUyxDQUFDO1lBQ2QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdBLGlCQUFJOzs7O2NBQUMsT0FBcUI7UUFFdEMscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLDRCQUE0QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekYsRUFBRSxDQUFDLENBQUUsQ0FBQyxPQUFRLENBQUM7WUFDYixNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQzs7dUJBekRoQjtJQTJEQyxDQUFBO0FBbERELHdCQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JGbiB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25SZXN1bHRcclxue1xyXG4gIFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFB3ZFZhbGlkYXRvclxyXG57XHJcbiAgcHVibGljIHN0YXRpYyBsb25nRW5vdWdoKG1pbiA6IG51bWJlciwgbWF4IDogbnVtYmVyKSA6IFZhbGlkYXRvckZuXHJcbiAge1xyXG4gICAgbGV0IGZ1bmMgPSAoY29udHJvbCA6IEFic3RyYWN0Q29udHJvbCkgOiB7IFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbiB9IHwgbnVsbCA9PlxyXG4gICAge1xyXG4gICAgICBsZXQgaXNMb25nRW5vdWdoID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCA+PSBtaW4gJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPD0gbWF4O1xyXG4gICAgICBpZiAoICFpc0xvbmdFbm91Z2ggKVxyXG4gICAgICAgIHJldHVybiB7IGxvbmdFbm91Z2g6IHRydWUgfTtcclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBudW1iZXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzTnVtYmVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvXFxkLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaGFzTnVtYmVyIClcclxuICAgICAgcmV0dXJuIHsgbnVtYmVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHVwcGVyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc1VwcGVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW0EtWl0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNVcHBlciApXHJcbiAgICAgIHJldHVybiB7IHVwcGVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGxvd2VyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc0xvd2VyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW2Etel0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNMb3dlciApXHJcbiAgICAgIHJldHVybiB7IGxvd2VyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNoYXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzQ2hhciA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL1shQCMkJV4mXFwqKClfK1xcLT1cXFtcXF17fXwnXS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc0NoYXIgKVxyXG4gICAgICByZXR1cm4geyBjaGFyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==