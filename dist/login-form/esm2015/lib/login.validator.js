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
export class LoginValidator {
    /**
     * @param {?} regexp
     * @return {?}
     */
    static custom(regexp) {
        let /** @type {?} */ func = (control) => {
            let /** @type {?} */ isRespectful = control.value !== null && regexp.test(control.value);
            if (!isRespectful)
                return { custom: true };
            return null;
        };
        return func;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static email(control) {
        let /** @type {?} */ isEmail = control.value !== null && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(control.value);
        if (!isEmail)
            return { email: true };
        return null;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static phone(control) {
        let /** @type {?} */ isPhone = control.value !== null && /^\+?\d*$/.test(control.value);
        if (!isPhone)
            return { phone: true };
        return null;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4udmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvbG9naW4udmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFTQSxNQUFNOzs7OztJQUVHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBZTtRQUVsQyxxQkFBSSxJQUFJLEdBQUcsQ0FBQyxPQUF5QixFQUF3QyxFQUFFO1lBRTdFLHFCQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RSxFQUFFLENBQUMsQ0FBRSxDQUFDLFlBQWEsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFHLElBQUksRUFBRSxDQUFDO1lBRTNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR1AsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFxQjtRQUV2QyxxQkFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksd0NBQXdDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRyxFQUFFLENBQUMsQ0FBRSxDQUFDLE9BQVEsQ0FBQztZQUNiLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHUCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXFCO1FBRXZDLHFCQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RSxFQUFFLENBQUMsQ0FBRSxDQUFDLE9BQVEsQ0FBQztZQUNiLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDOztDQUdmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvckZuIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvblJlc3VsdFxyXG57XHJcbiAgW2tleSA6IHN0cmluZ10gOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9naW5WYWxpZGF0b3Jcclxue1xyXG4gIHB1YmxpYyBzdGF0aWMgY3VzdG9tKHJlZ2V4cCA6IFJlZ0V4cCkgOiBWYWxpZGF0b3JGblxyXG4gIHtcclxuICAgIGxldCBmdW5jID0gKGNvbnRyb2wgOiBBYnN0cmFjdENvbnRyb2wpIDogeyBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW4gfSB8IG51bGwgPT5cclxuICAgIHtcclxuICAgICAgbGV0IGlzUmVzcGVjdGZ1bCA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgcmVnZXhwLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICAgIGlmICggIWlzUmVzcGVjdGZ1bCApXHJcbiAgICAgICAgcmV0dXJuIHsgY3VzdG9tIDogdHJ1ZSB9O1xyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVtYWlsKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGlzRW1haWwgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9bYS16MC05Ll8lKy1dK0BbYS16MC05Li1dK1xcLlthLXpdezIsNH0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFpc0VtYWlsIClcclxuICAgICAgcmV0dXJuIHsgZW1haWw6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcGhvbmUoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaXNQaG9uZSA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL15cXCs/XFxkKiQvLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFpc1Bob25lIClcclxuICAgICAgcmV0dXJuIHsgcGhvbmU6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==