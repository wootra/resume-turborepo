type FnStoreData<T> =
    | {
          state: 'pending';
      }
    | {
          state: 'canceled';
          msg: string;
      }
    | {
          state: 'done';
          value?: T | PromiseLike<T>;
      }
    | {
          state: 'errored';
          error: Error;
      };

type FnStoreFn<T, Arg> = {
    resolve: (value: FnStoreData<T>) => void;
    reject: (err: Error) => void;
    arg?: Arg;
};
type FnStore<T, Arg> = FnStoreData<T> & FnStoreFn<T, Arg>;

const __updateFnStore = <T, Arg, TResult = T>(
    org: FnStore<T, Arg>,
    data: FnStoreData<TResult>
): void => {
    const { resolve, reject, arg } = org;
    const keys = Object.keys(org);
    keys.forEach(key => {
        delete (org as any)[key];
    });
    Object.assign(org, {
        resolve,
        reject,
        arg,
        ...data,
    });
};
export class MyPromise<T = any, Arg = any> extends Promise<FnStoreData<T>> {
    #fnStore: FnStore<T, Arg>;
    #orgThen: <Resolved, Rejected>(
        fullfilled?: (ret: FnStoreData<T>) => Resolved | PromiseLike<Resolved>,
        failed?: (err: any) => Rejected | PromiseLike<Rejected>
    ) => void;
    constructor(
        initializer: (
            resolve: (value?: T) => void,
            reject: (err: string | Error) => void
        ) => void,
        arg?: Arg
    ) {
        const fnStore: Partial<FnStore<T, Arg>> = {
            state: 'pending',
            arg: arg,
        };
        const initWrapper = (
            resolve: (value: FnStoreData<T>) => void,
            reject: (err: Error) => void
        ) => {
            fnStore.resolve = resolve;
            fnStore.reject = reject;
            const filledFnStore = fnStore as FnStore<T, Arg>;
            const resolveWrapper = (value?: T) => {
                if (fnStore.state !== 'pending') {
                    return;
                } else {
                    // naturally resolved.
                    const data: FnStoreData<T> = {
                        state: 'done',
                        value: value,
                    };
                    __updateFnStore(filledFnStore, data);

                    resolve(data);
                }
            };
            const rejectWrapper = (err: Error | string) => {
                if (fnStore.state !== 'pending') {
                    return;
                } else {
                    // naturally resolved.
                    const error =
                        typeof err === 'string' ? new Error(err) : err;
                    __updateFnStore(filledFnStore, {
                        state: 'errored',
                        error,
                    });
                    reject(error);
                }
            };
            initializer(resolveWrapper, rejectWrapper);
        };
        super(initWrapper);
        this.#orgThen = this.then.bind(this);
        this.#fnStore = fnStore as FnStore<T, Arg>;
    }
    state() {
        return this.#fnStore.state;
    }
    updateFnStore<TResult = T>(data: FnStoreData<TResult>) {
        __updateFnStore<T, Arg, TResult>(this.#fnStore, data);
    }
    done(value: T) {
        const data: FnStoreData<T> = {
            state: 'done',
            value: value,
        };
        this.updateFnStore(data);
        this.#fnStore.resolve(data);
    }
    cancel(msg: string) {
        const data: FnStoreData<T> = {
            state: 'canceled',
            msg: msg,
        };
        this.updateFnStore(data);
        this.#fnStore.resolve(data);
    }

    // @ts-ignore-next-line
    then<TResult = any, TRejected = any>(
        onFulfilled?: (
            ret: FnStoreData<T>,
            arg?: Arg
        ) => TResult | PromiseLike<TResult>,
        onRejected?: (
            reason: any,
            arg?: Arg
        ) => TRejected | PromiseLike<TRejected>
    ): MyPromise<TResult | TRejected, Arg> {
        const fulfillWrapper =
            onFulfilled &&
            ((ret: FnStoreData<T>): TResult | PromiseLike<TResult> => {
                const res = onFulfilled(ret, this.#fnStore.arg);
                return res;
            });
        const rejectWrapper =
            onRejected &&
            ((reason: any): TRejected | PromiseLike<TRejected> => {
                return onRejected(reason, this.#fnStore.arg);
            });

        const newPromise = super.then(
            fulfillWrapper as (
                value: FnStoreData<T>
            ) => TResult | PromiseLike<TResult>,
            rejectWrapper as (reason: any) => TRejected | PromiseLike<TRejected>
        ) as MyPromise<TResult | TRejected, Arg>;
        return newPromise;
    }
}
