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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHdkLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtLyIsInNvdXJjZXMiOlsibGliL2Zvcm1zL3B3ZC1mb3JtL3B3ZC52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBLE1BQU07Ozs7OztJQUVHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBWSxFQUFFLEdBQVk7UUFFakQscUJBQUksSUFBSSxHQUFHLENBQUMsT0FBeUIsRUFBd0MsRUFBRTtZQUU3RSxxQkFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztZQUN0RyxFQUFFLENBQUMsQ0FBRSxDQUFDLFlBQWEsQ0FBQztnQkFDbEIsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO1lBRTlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYixDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR1AsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFxQjtRQUV4QyxxQkFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLENBQUUsQ0FBQyxTQUFVLENBQUM7WUFDZixNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFMUIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR1AsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFxQjtRQUV2QyxxQkFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUUsQ0FBQyxRQUFTLENBQUM7WUFDZCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR1AsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFxQjtRQUV2QyxxQkFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUUsQ0FBQyxRQUFTLENBQUM7WUFDZCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR1AsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFxQjtRQUV0QyxxQkFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksNEJBQTRCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RixFQUFFLENBQUMsQ0FBRSxDQUFDLE9BQVEsQ0FBQztZQUNiLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDOztDQUVmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvckZuIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvblJlc3VsdFxyXG57XHJcbiAgW2tleSA6IHN0cmluZ10gOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHdkVmFsaWRhdG9yXHJcbntcclxuICBwdWJsaWMgc3RhdGljIGxvbmdFbm91Z2gobWluIDogbnVtYmVyLCBtYXggOiBudW1iZXIpIDogVmFsaWRhdG9yRm5cclxuICB7XHJcbiAgICBsZXQgZnVuYyA9IChjb250cm9sIDogQWJzdHJhY3RDb250cm9sKSA6IHsgW2tleSA6IHN0cmluZ10gOiBib29sZWFuIH0gfCBudWxsID0+XHJcbiAgICB7XHJcbiAgICAgIGxldCBpc0xvbmdFbm91Z2ggPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIGNvbnRyb2wudmFsdWUubGVuZ3RoID49IDggJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPD0gMTI4O1xyXG4gICAgICBpZiAoICFpc0xvbmdFbm91Z2ggKVxyXG4gICAgICAgIHJldHVybiB7IGxvbmdFbm91Z2g6IHRydWUgfTtcclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBudW1iZXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzTnVtYmVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvXFxkLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaGFzTnVtYmVyIClcclxuICAgICAgcmV0dXJuIHsgbnVtYmVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHVwcGVyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc1VwcGVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW0EtWl0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNVcHBlciApXHJcbiAgICAgIHJldHVybiB7IHVwcGVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGxvd2VyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc0xvd2VyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW2Etel0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNMb3dlciApXHJcbiAgICAgIHJldHVybiB7IGxvd2VyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNoYXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzQ2hhciA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL1shQCMkJV4mXFwqKClfK1xcLT1cXFtcXF17fXwnXS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc0NoYXIgKVxyXG4gICAgICByZXR1cm4geyBjaGFyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==