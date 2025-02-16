
    export const debounce = <F extends (...args: any[]) => any>(
        func: F,
        waitFor: number
    ): ((...args: Parameters<F>) => void) => {
        let timeoutId: number | null = null;

        const debouncedFunc = (...args: Parameters<F>) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = window.setTimeout(() => {
                func(...args);
            }, waitFor);
        };

        return debouncedFunc;
    };
