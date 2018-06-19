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
export class PasswordValidator {
    /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    static longEnough(min, max) {
        let /** @type {?} */ func = (control) => {
            let /** @type {?} */ isLongEnough = control.value !== null && control.value.length >= 8 && control.value.length <= 128;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZm9ybXMvcHdkLWZvcm0vcGFzc3dvcmQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFTQSxNQUFNOzs7Ozs7SUFFRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVksRUFBRSxHQUFZO1FBRWpELHFCQUFJLElBQUksR0FBRyxDQUFDLE9BQXlCLEVBQXdDLEVBQUU7WUFFN0UscUJBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7WUFDdEcsRUFBRSxDQUFDLENBQUUsQ0FBQyxZQUFhLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUU5QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2IsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdQLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBcUI7UUFFeEMscUJBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25FLEVBQUUsQ0FBQyxDQUFFLENBQUMsU0FBVSxDQUFDO1lBQ2YsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRTFCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdQLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcUI7UUFFdkMscUJBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxDQUFFLENBQUMsUUFBUyxDQUFDO1lBQ2QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdQLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcUI7UUFFdkMscUJBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxDQUFFLENBQUMsUUFBUyxDQUFDO1lBQ2QsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdQLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBcUI7UUFFdEMscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLDRCQUE0QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekYsRUFBRSxDQUFDLENBQUUsQ0FBQyxPQUFRLENBQUM7WUFDYixNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Q0FFZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JGbiB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25SZXN1bHRcclxue1xyXG4gIFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkVmFsaWRhdG9yXHJcbntcclxuICBwdWJsaWMgc3RhdGljIGxvbmdFbm91Z2gobWluIDogbnVtYmVyLCBtYXggOiBudW1iZXIpIDogVmFsaWRhdG9yRm5cclxuICB7XHJcbiAgICBsZXQgZnVuYyA9IChjb250cm9sIDogQWJzdHJhY3RDb250cm9sKSA6IHsgW2tleSA6IHN0cmluZ10gOiBib29sZWFuIH0gfCBudWxsID0+XHJcbiAgICB7XHJcbiAgICAgIGxldCBpc0xvbmdFbm91Z2ggPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIGNvbnRyb2wudmFsdWUubGVuZ3RoID49IDggJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPD0gMTI4O1xyXG4gICAgICBpZiAoICFpc0xvbmdFbm91Z2ggKVxyXG4gICAgICAgIHJldHVybiB7IGxvbmdFbm91Z2g6IHRydWUgfTtcclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBudW1iZXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzTnVtYmVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvXFxkLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaGFzTnVtYmVyIClcclxuICAgICAgcmV0dXJuIHsgbnVtYmVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHVwcGVyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc1VwcGVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW0EtWl0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNVcHBlciApXHJcbiAgICAgIHJldHVybiB7IHVwcGVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGxvd2VyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc0xvd2VyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW2Etel0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNMb3dlciApXHJcbiAgICAgIHJldHVybiB7IGxvd2VyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNoYXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzQ2hhciA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL1shQCMkJV4mXFwqKClfK1xcLT1cXFtcXF17fXwnXS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc0NoYXIgKVxyXG4gICAgICByZXR1cm4geyBjaGFyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==