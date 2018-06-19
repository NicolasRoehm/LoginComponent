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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNyLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtLyIsInNvdXJjZXMiOlsibGliL3ZhbGlkYXRvcnMvdXNyLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBU0EsTUFBTTs7Ozs7SUFFRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWU7UUFFbEMscUJBQUksSUFBSSxHQUFHLENBQUMsT0FBeUIsRUFBd0MsRUFBRTtZQUU3RSxxQkFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEUsRUFBRSxDQUFDLENBQUUsQ0FBQyxZQUFhLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRyxJQUFJLEVBQUUsQ0FBQztZQUUzQixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2IsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUM7Ozs7OztJQUdQLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcUI7UUFFdkMscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckcsRUFBRSxDQUFDLENBQUUsQ0FBQyxPQUFRLENBQUM7WUFDYixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Ozs7O0lBR1AsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFxQjtRQUV2QyxxQkFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkUsRUFBRSxDQUFDLENBQUUsQ0FBQyxPQUFRLENBQUM7WUFDYixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLElBQUksQ0FBQzs7Q0FHZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JGbiB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25SZXN1bHRcclxue1xyXG4gIFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzclZhbGlkYXRvclxyXG57XHJcbiAgcHVibGljIHN0YXRpYyBjdXN0b20ocmVnZXhwIDogUmVnRXhwKSA6IFZhbGlkYXRvckZuXHJcbiAge1xyXG4gICAgbGV0IGZ1bmMgPSAoY29udHJvbCA6IEFic3RyYWN0Q29udHJvbCkgOiB7IFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbiB9IHwgbnVsbCA9PlxyXG4gICAge1xyXG4gICAgICBsZXQgaXNSZXNwZWN0ZnVsID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiByZWdleHAudGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgICAgaWYgKCAhaXNSZXNwZWN0ZnVsIClcclxuICAgICAgICByZXR1cm4geyBjdXN0b20gOiB0cnVlIH07XHJcblxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuYztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZW1haWwoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaXNFbWFpbCA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL1thLXowLTkuXyUrLV0rQFthLXowLTkuLV0rXFwuW2Etel17Miw0fS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWlzRW1haWwgKVxyXG4gICAgICByZXR1cm4geyBlbWFpbDogdHJ1ZSB9O1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBwaG9uZShjb250cm9sIDogRm9ybUNvbnRyb2wpIDogVmFsaWRhdGlvblJlc3VsdFxyXG4gIHtcclxuICAgIGxldCBpc1Bob25lID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvXlxcKz9cXGQqJC8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWlzUGhvbmUgKVxyXG4gICAgICByZXR1cm4geyBwaG9uZTogdHJ1ZSB9O1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIl19