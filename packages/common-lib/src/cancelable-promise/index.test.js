import { MyPromise } from './index';
import Q, { delay as qDelay } from 'q';
import { Promise as BBPromise, delay as bbDelay } from 'bluebird';

describe('promise test', () => {
    it('Q should be instance of Promise but not...', async () => {
        const qVal = Q(qDelay(100))
            .then(() => {
                return 'value';
            })
            .then(val => {
                console.log('q:', val);
                return val;
            });
        const aVal = await qVal;

        expect(aVal).toBe('value');
        console.log('promise instance', qVal);
        console.log('valueOf:', qVal.valueOf());

        expect(qVal instanceof Promise).not.toBe(true); // q does not return Promise instance.
    });

    it('Promise valueof', async () => {
        const qVal = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('value');
            }, 1000);
        });
        console.log('valueOf before resolve:', qVal.valueOf());
        expect(qVal.valueOf()).toBeInstanceOf(Promise);
        // const aVal = await qVal;

        // expect(aVal).toBe('val1');
        // console.log('promise instance', qVal);
        // console.log('valueOf:', qVal.valueOf());

        // expect(qVal instanceof Promise).toBe(true); // q does not return Promise instance.
    });

    it('BB should be instance of Promise', async () => {
        const bbVal = BBPromise.resolve(bbDelay(100)).then(() => 'value');
        const aVal = await bbVal;
        expect(aVal).toBe('value');
        expect(bbVal instanceof Promise).not.toBe(true); // bluebird does not return Promise instance.
    });

    it('instanceof Promise', async () => {
        const myPromise = new MyPromise((resolve, reject) => {
            resolve('value');
        });

        expect(myPromise instanceof Promise).toBe(true);
    });

    it('fullfilled with third arg', async () => {
        const myPromise = new MyPromise((resolve, reject) => {
            resolve('value');
        }, 'thirdArg1');
        await myPromise
            .then(
                ({ state, value }, thirdArg) => {
                    expect(state).toBe('done');
                    expect(value).toBe('value');
                    expect(thirdArg).toBe('thirdArg1');
                    return value + thirdArg;
                },
                null,
                'thirdArg1'
            )
            .then(({ value, state }) => {
                expect(value).toBe('valuethirdArg1');
                expect(state).toBe('done');
            });
    });

    it('fullfilled with third arg', async () => {
        const myPromise = new MyPromise((resolve, reject) => {
            resolve('value');
        }, 'thirdArg1');
        await myPromise.then(
            ({ state, value }, thirdArg) => {
                expect(state).toBe('done');
                expect(value).toBe('value');
                expect(thirdArg).toBe('thirdArg1');
            },
            null,
            'thirdArg1'
        );
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
