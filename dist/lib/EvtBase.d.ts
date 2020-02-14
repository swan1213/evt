import { EvtBaseProtected } from "./EvtBaseProtected";
import { Bindable } from "./defs";
/** Evt without evtAttach property, attachOnceMatched and createDelegate */
export declare class EvtBase<T> extends EvtBaseProtected<T> {
    private defaultParams;
    private readParams;
    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     *
     * matcher - Transformative
     *
     * timeout?
     */
    waitFor<U>(matcher: (data: T) => [U] | null, timeout?: number): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     *
     * matcher - Type guard
     *
     * timeout?
     */
    waitFor<Q extends T>(matcher: (data: T) => data is Q, timeout?: number): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     *
     * matcher - Filter only
     *
     * timeout?
     */
    waitFor(matcher: (data: T) => boolean, timeout?: number): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     *
     * timeout?
     */
    waitFor(timeout?: number): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attach<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - transformative
     *
     * boundTo
     *
     * callback
     */
    $attach<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - transformative
     *
     * timeout
     *
     * callback
     */
    $attach<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - transformative
     *
     * callback
     */
    $attach<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attach(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * callback
     */
    attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * callback
     */
    attach(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Type guard
     *
     * timeout
     *
     * callback
     */
    attach<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Filter only
     *
     * timeout
     *
     * callback
     */
    attach(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attach(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Type guard
     *
     * callback
     */
    attach<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Filter only
     *
     * callback
     */
    attach(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * boundTo
     *
     * callback
     */
    attach(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * timeout
     *
     * callback
     */
    attach(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * callback
     */
    attach(callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachOnce<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    $attachOnce<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * timeout
     *
     * callback
     */
    $attachOnce<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * callback
     */
    $attachOnce<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * callback
     */
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Type guard
     *
     * timeout
     *
     * callback
     */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Filter only
     *
     * timeout
     *
     * callback
     */
    attachOnce(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnce(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Type guard
     *
     * callback
     */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * matcher - Filter only
     *
     * callback
     */
    attachOnce(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * boundTo
     *
     * callback
     */
    attachOnce(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * timeout
     *
     * callback
     */
    attachOnce(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * callback
     */
    attachOnce(callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    $attachExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * timeout
     *
     * callback
     */
    $attachExtract<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * callback
     */
    $attachExtract<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * callback
     */
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Type guard
     *
     * timeout
     *
     * callback
     */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Filter only
     *
     * timeout
     *
     * callback
     */
    attachExtract(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Type guard
     *
     * callback
     */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Filter only
     *
     * callback
     */
    attachExtract(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachPrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    $attachPrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * timeout
     *
     * callback
     */
    $attachPrepend<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * callback
     */
    $attachPrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * callback
     */
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * matcher - Type guard
     *
     * timeout
     *
     * callback
     */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * matcher - Filter only
     *
     * timeout
     *
     * callback
     */
    attachPrepend(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachPrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * matcher - Type guard
     *
     * callback
     */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * matcher - Filter only
     *
     * callback
     */
    attachPrepend(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * boundTo
     *
     * callback
     */
    attachPrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * timeout
     *
     * callback
     */
    attachPrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     *
     * callback
     */
    attachPrepend(callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachOncePrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    $attachOncePrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * timeout
     *
     * callback
     */
    $attachOncePrepend<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * callback
     */
    $attachOncePrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * callback
     */
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * matcher - Type guard
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * matcher - Filter only
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * matcher - Type guard
     *
     * callback
     */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * matcher - Filter only
     *
     * callback
     */
    attachOncePrepend(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * boundTo
     *
     * callback
     */
    attachOncePrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     *
     * callback
     */
    attachOncePrepend(callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    $attachOnceExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    $attachOnceExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * timeout
     *
     * callback
     */
    $attachOnceExtract<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     *
     * matcher - Transformative
     *
     * callback
     */
    $attachOnceExtract<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Type guard
     *
     * boundTo
     *
     * callback
     */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Filter only
     *
     * boundTo
     *
     * callback
     */
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Type guard
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Filter only
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * boundTo
     *
     * timeout
     */
    attachOnceExtract(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Type guard
     *
     * callback
     */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * matcher - Filter only
     *
     * callback
     */
    attachOnceExtract(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * boundTo
     *
     * callback
     */
    attachOnceExtract(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     *
     * callback
     */
    attachOnceExtract(callback: (data: T) => void): Promise<T>;
}