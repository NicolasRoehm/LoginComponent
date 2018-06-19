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
export class PwdValidator {
    /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    static longEnough(min, max) {
        let /** @type {?} */ func = (control) => {
            let /** @type {?} */ isLongEnough = control.value !== null && control.value.length >= min && control.value.length <= max;
            if (!isLongEnough)
                return { longEnough: true };
            return null;
        };
        return func;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static number(control) {
        let /** @type {?} */ hasNumber = control.value !== null && /\d/.test(control.value);
        if (!hasNumber)
            return { number: true };
        return null;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static upper(control) {
        let /** @type {?} */ hasUpper = control.value !== null && /[A-Z]/.test(control.value);
        if (!hasUpper)
            return { upper: true };
        return null;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static lower(control) {
        let /** @type {?} */ hasLower = control.value !== null && /[a-z]/.test(control.value);
        if (!hasLower)
            return { lower: true };
        return null;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static char(control) {
        let /** @type {?} */ hasChar = control.value !== null && /[!@#$%^&\*()_+\-=\[\]{}|']/.test(control.value);
        if (!hasChar)
            return { char: true };
        return null;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHdkLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtLyIsInNvdXJjZXMiOlsibGliL3ZhbGlkYXRvcnMvcHdkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBU0EsTUFBTTs7Ozs7O0lBRUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFZLEVBQUUsR0FBWTtRQUVqRCxxQkFBSSxJQUFJLEdBQUcsQ0FBQyxPQUF5QixFQUF3QyxFQUFFO1lBRTdFLHFCQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1lBQ3hHLEVBQUUsQ0FBQyxDQUFFLENBQUMsWUFBYSxDQUFDO2dCQUNsQixNQUFNLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFFOUIsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHUCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQXFCO1FBRXhDLHFCQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRSxFQUFFLENBQUMsQ0FBRSxDQUFDLFNBQVUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUUxQixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHUCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXFCO1FBRXZDLHFCQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxFQUFFLENBQUMsQ0FBRSxDQUFDLFFBQVMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHUCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXFCO1FBRXZDLHFCQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxFQUFFLENBQUMsQ0FBRSxDQUFDLFFBQVMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDOzs7Ozs7SUFHUCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQXFCO1FBRXRDLHFCQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pGLEVBQUUsQ0FBQyxDQUFFLENBQUMsT0FBUSxDQUFDO1lBQ2IsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUM7O0NBRWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yRm4gfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uUmVzdWx0XHJcbntcclxuICBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQd2RWYWxpZGF0b3Jcclxue1xyXG4gIHB1YmxpYyBzdGF0aWMgbG9uZ0Vub3VnaChtaW4gOiBudW1iZXIsIG1heCA6IG51bWJlcikgOiBWYWxpZGF0b3JGblxyXG4gIHtcclxuICAgIGxldCBmdW5jID0gKGNvbnRyb2wgOiBBYnN0cmFjdENvbnRyb2wpIDogeyBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW4gfSB8IG51bGwgPT5cclxuICAgIHtcclxuICAgICAgbGV0IGlzTG9uZ0Vub3VnaCA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPj0gbWluICYmIGNvbnRyb2wudmFsdWUubGVuZ3RoIDw9IG1heDtcclxuICAgICAgaWYgKCAhaXNMb25nRW5vdWdoIClcclxuICAgICAgICByZXR1cm4geyBsb25nRW5vdWdoOiB0cnVlIH07XHJcblxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuYztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgbnVtYmVyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc051bWJlciA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL1xcZC8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc051bWJlciApXHJcbiAgICAgIHJldHVybiB7IG51bWJlcjogdHJ1ZSB9O1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyB1cHBlcihjb250cm9sIDogRm9ybUNvbnRyb2wpIDogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHtcclxuICAgIGxldCBoYXNVcHBlciA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL1tBLVpdLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaGFzVXBwZXIgKVxyXG4gICAgICByZXR1cm4geyB1cHBlcjogdHJ1ZSB9O1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBsb3dlcihjb250cm9sIDogRm9ybUNvbnRyb2wpIDogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHtcclxuICAgIGxldCBoYXNMb3dlciA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL1thLXpdLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaGFzTG93ZXIgKVxyXG4gICAgICByZXR1cm4geyBsb3dlcjogdHJ1ZSB9O1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBjaGFyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc0NoYXIgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9bIUAjJCVeJlxcKigpXytcXC09XFxbXFxde318J10vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNDaGFyIClcclxuICAgICAgcmV0dXJuIHsgY2hhcjogdHJ1ZSB9O1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=