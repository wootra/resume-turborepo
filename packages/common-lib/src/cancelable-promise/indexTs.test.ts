import { MyPromise } from './index';

describe('promise test - typescript', () => {
    it('instanceof Promise', async () => {
        const myPromise = new MyPromise((resolve, reject) => {
            resolve('value');
        });

        expect(myPromise instanceof Promise).toBe(true);
    });

    it('fullfilled with third arg with instance', async () => {
        const myPromise = new MyPromise(
            (resolve: (val: string) => void, reject) => {
                resolve('value');
            },
            'thirdArg1'
        );
        await myPromise
            .then((ret, thirdArg) => {
                expect(ret.state).toBe('done');
                expect(thirdArg).toBe('thirdArg1');
                if (ret?.state === 'done' && thirdArg) {
                    return ret.value + thirdArg;
                }
            })
            .then((ret, thirdArg) => {
                const { state } = ret;
                expect(state).toBe('done');
                if (state === 'done') {
                    const { value } = ret || {};
                    expect(value).toBe('valuethirdArg1');
                    return value;
                }
            });
    });

    it('should show pending', async () => {
        const myPromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve('value');
            }, 100);
        });

        expect(myPromise.state()).toBe('pending');
    });

    it('should show cancel', async () => {
        const myPromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve('value');
            }, 100);
        });
        myPromise.cancel('it is canceled');
        expect(myPromise.state()).toBe('canceled');
        const ret = await myPromise;
        expect(ret).toStrictEqual({
            state: 'canceled',
            msg: 'it is canceled',
        });
    });

    it('should reject', async () => {
        const myPromise = new MyPromise((resolve, reject) => {
            reject('this is error from original promise');
        });
        try {
            await myPromise;
            expect(false).toBe(true); // safe guard. it should never run.
        } catch (e) {
            expect(e).toStrictEqual(
                new Error('this is error from original promise')
            );
        }
        expect(myPromise.state()).toBe('errored');
    });

    it('should resolve with done', async () => {
        const myPromise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve('value');
            }, 100);
        });
        myPromise.done('this is my return');
        expect(myPromise.state()).toBe('done');
        const ret = await myPromise;
        expect(ret).toStrictEqual({
            state: 'done',
            value: 'this is my return',
        });
    });
});
