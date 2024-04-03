export function delay(callback: Function, ms: number) {
    let timer = 0;
    return function() {
        let context = this, args = arguments;
        window.clearTimeout(timer);

        timer = window.setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}