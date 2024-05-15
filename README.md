# base

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}
```

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type TupleToObject<T extends readonly (PropertyKey)[]> = {
  [K in T[number]]: K
}

// T extends U ? X : Y
// (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
type MyExclude<T, U> = T extends U ? never : T

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never

type If<C extends boolean, T, F> = C extends true ? T : F

type P = readonly unknown[]
type Concat<T extends P, U extends P> = [...T, ...U]

type Includes<T extends readonly unknown[], U> = T extends [infer First, ...infer Rest]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false

type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
```

- 如何取得一个对象的 key，比如 Todo 的 title 等 `keyof T`
- 如何取得一个数组的元素，比如 Todo 的 title 等 `T[number]`
- 联合类型的 extends <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types>
- 如何获取一个类型的中的 泛型？ infer
- 遍历数组的每一项
- 获取方法参数 `...args: infer P`

## any never unknow
