interface ExInf<F extends (...args: unknown[]) => unknown> {
    (...args: Parameters<F>): ReturnType<F>
}

function doable<F extends (...args: unknown[]) => unknown>
(func: F) {
    return function<T extends {
        new (...args: any[]): {}
    }>
    (constructor: T) {
        /* @ts-ignore */
        return class extends constructor implements ExInf<F> {
            constructor() {
                super()
                return Object.setPrototypeOf(
                    func,
                    constructor.prototype
                )
            }
        } as T & ExInf<F> & {a: 1}
    }
}

@doable(() => 1231)
class A {
    m1() {
        return 123
    }
}

const a = new A
/* @ts-ignore */
console.log(a())