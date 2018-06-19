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
export class UsrValidator {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNyLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtLyIsInNvdXJjZXMiOlsibGliL3Vzci52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBLE1BQU07Ozs7O0lBRUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFlO1FBRWxDLHFCQUFJLElBQUksR0FBRyxDQUFDLE9BQXlCLEVBQXdDLEVBQUU7WUFFN0UscUJBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hFLEVBQUUsQ0FBQyxDQUFFLENBQUMsWUFBYSxDQUFDO2dCQUNsQixNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUcsSUFBSSxFQUFFLENBQUM7WUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHUCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXFCO1FBRXZDLHFCQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSx3Q0FBd0MsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JHLEVBQUUsQ0FBQyxDQUFFLENBQUMsT0FBUSxDQUFDO1lBQ2IsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdQLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcUI7UUFFdkMscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLEVBQUUsQ0FBQyxDQUFFLENBQUMsT0FBUSxDQUFDO1lBQ2IsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxJQUFJLENBQUM7O0NBR2YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yRm4gfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uUmVzdWx0XHJcbntcclxuICBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVc3JWYWxpZGF0b3Jcclxue1xyXG4gIHB1YmxpYyBzdGF0aWMgY3VzdG9tKHJlZ2V4cCA6IFJlZ0V4cCkgOiBWYWxpZGF0b3JGblxyXG4gIHtcclxuICAgIGxldCBmdW5jID0gKGNvbnRyb2wgOiBBYnN0cmFjdENvbnRyb2wpIDogeyBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW4gfSB8IG51bGwgPT5cclxuICAgIHtcclxuICAgICAgbGV0IGlzUmVzcGVjdGZ1bCA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgcmVnZXhwLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICAgIGlmICggIWlzUmVzcGVjdGZ1bCApXHJcbiAgICAgICAgcmV0dXJuIHsgY3VzdG9tIDogdHJ1ZSB9O1xyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVtYWlsKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGlzRW1haWwgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9bYS16MC05Ll8lKy1dK0BbYS16MC05Li1dK1xcLlthLXpdezIsNH0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFpc0VtYWlsIClcclxuICAgICAgcmV0dXJuIHsgZW1haWw6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcGhvbmUoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaXNQaG9uZSA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL15cXCs/XFxkKiQvLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFpc1Bob25lIClcclxuICAgICAgcmV0dXJuIHsgcGhvbmU6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==