type FnStore<T, Arg> =
    | {
          state: 'pending';
          arg?: Arg;
      }
    | {
          state: 'canceled';
          arg?: Arg;
          errMsg: string;
      }
    | {
          state: 'done';
          arg?: Arg;
          resolvedValue: T;
      }
    | {
          state: 'errored';
          arg?: Arg;
          error: Error;
      };

type CanceledInfo = {
    __state: 'canceled';
    msg: string;
};

type PromiseLikeAndMore<T> = PromiseLike<T> | null | undefined;
type TAndPromiseLike<T> = T | PromiseLikeAndMore<T>;

export class MyPromise<T, Arg = undefined> extends Promise<
    TAndPromiseLike<T> | CanceledInfo
> {
    #fnStore: FnStore<T, Arg>;
    constructor(
        initializer: (
            resolve: (
                value: CanceledInfo | TAndPromiseLike<CanceledInfo | T>
            ) => void,
            reject: (err: Error) => void
        ) => void,
        arg?: Arg
    ) {
        const fnStore: FnStore<T, Arg> = {
            state: 'pending',
            arg: arg,
        };

        super(initializer);
        this.#fnStore = fnStore;
    }
    state() {
        return this.#fnStore.state;
    }
    done(value: T) {
        this.#fnStore = {
            state: 'done',
            arg: this.#fnStore.arg,
            resolvedValue: value,
        };
        return this;
    }
    cancel(msg: string) {
        this.#fnStore = {
            state: 'canceled',
            arg: this.#fnStore.arg,
            errMsg: msg,
        };
        return this;
    }
    // then<TResult1 = T, TResult2 = never>(
    //     onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined,
    //     onrejected?: ((reason: any) => TResult2) | PromiseLike<TResult2> | null | undefined
    // ): Promise<TResult1|TResult2>;
    static resolve<ResolveType, ArgType>(value?: TAndPromiseLike<ResolveType>) {
        return new MyPromise<ResolveType, ArgType>((res, _rej) => {
            res(value);
        });
    }
    static reject<RejectType = never, ArgType = undefined>(
        error: Error,
        arg?: ArgType
    ) {
        return new MyPromise<RejectType, ArgType>((_res, rej) => {
            rej(error);
        }, arg) as Promise<RejectType>;
    }
    valueOf(): Object {
        if (this.#fnStore.state === 'done') {
            return this.#fnStore.resolvedValue as Object;
        } else if (this.#fnStore.state === 'canceled') {
            return {
                __state: 'canceled',
                msg: this.#fnStore.errMsg,
            } as CanceledInfo;
        } else if (this.#fnStore.state === 'errored') {
            throw this.#fnStore.error;
        } else {
            return this;
        }
    }

    thenWithArg<TResolved, TRejected>(
        onFulfilled: (
            ret: TAndPromiseLike<T> | CanceledInfo,
            arg?: Arg
        ) => TResolved,
        onRejected?: (reason: any, arg?: Arg) => TRejected
    ) {
        const fulfillWrapper = (
            ret: TAndPromiseLike<T> | CanceledInfo
        ): TResolved => {
            return onFulfilled(ret, this.#fnStore.arg);
        };
        const rejectWrapper = (reason: any) => {
            return onRejected ? onRejected(reason, this.#fnStore.arg) : reason;
        };
        return super.then<TResolved, TRejected>(fulfillWrapper, rejectWrapper);
    }

    then<TResolved = TAndPromiseLike<T> | CanceledInfo, TRejected = never>(
        onFulfilled?:
            | ((
                  ret: TAndPromiseLike<T> | CanceledInfo
              ) => TResolved | PromiseLike<TResolved>)
            | null
            | undefined,
        onRejected?:
            | ((reason: any) => TRejected | PromiseLike<TRejected>)
            | null
            | undefined
    ): Promise<TResolved | TRejected> {
        // const fulfillWrapper = (
        //     ret: TAndPromiseLike<T> | CanceledInfo
        // ): TResolved | PromiseLike<TResolved> => {
        //     return onFulfilled(ret);
        // };
        // const rejectWrapper = (reason: any) => {
        //     return onRejected ? onRejected(reason) : reason;
        // };
        super.then<TResolved, TRejected>(onFulfilled, onRejected);
        return this as Promise<TResolved | TRejected>;
    }
}
