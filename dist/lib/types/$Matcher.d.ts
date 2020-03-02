export declare type $Matcher<T, U> = $Matcher.Stateless<T, U> | $Matcher.Stateful<T, U>;
export declare namespace $Matcher {
    /**
     * When using a transformative matcher with
     * waitFor, attachOnce or attachOncePrepend
     * the first matched event will cause the handler
     * to be detached so there is no purpose of
     * detaching via the matcher or using a stateful matcher
     */
    type Once<T, U> = (data: T) => (Result.Matched.NoDetachArg<U> | Result.NotMatched);
    type Stateless<T, U> = (data: T, prev?: undefined, cbInvokedIfMatched?: true) => Result<U>;
    /** [ $Matcher function, initial value ] */
    type Stateful<T, U> = [(data: T, prev: U, cbInvokedIfMatched?: true) => Result<U>, U];
    /**
     * [U] or [U,null] => pass U to the handler's callback.
     * [U,"DETACH"] => detach the handler then pass U to the handler's callback.
     * null => do not pass the event data to the handler callback.
     * "DETACH" => detach the handler and do not pass the event data to the handler's callback.
     */
    type Result<U> = Result.Matched<U> | Result.NotMatched;
    namespace Result {
        type Detach = "DETACH";
        namespace Detach {
            function match($result: Result<any>): $result is Detach;
        }
        type NotMatched = Detach | null;
        namespace NotMatched {
            function match($result: Result<any>): $result is NotMatched;
        }
        type Matched<U> = Matched.NoDetachArg<U> | Matched.WithDetachArg<U>;
        namespace Matched {
            type NoDetachArg<U> = readonly [U];
            type WithDetachArg<U> = readonly [U, Detach | null];
            function match($result: Result<any>): $result is NotMatched;
        }
    }
}