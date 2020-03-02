import { composeMatcher } from "../composeMatcher";

export function throttleTime<T>(duration: number) {
    return composeMatcher<T, { data: T; lastClick: number; }, T>(
        [
            (data, { lastClick }) => {

                const now = Date.now();

                return now - lastClick < duration ?
                    null :
                    [{ data, "lastClick": now }]
                    ;

            },
            { "lastClick": 0, "data": null as any }
        ],
        ({ data }) => [data]
    );
}