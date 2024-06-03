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
- 元组 数组 转 来联合类型 T[number]
- 捏造一个类型 T，默认值 T = {}
- 字符串转数组

## any never unknow

## 接口只能扩展使用静态已知成员的对象类型或对象类型的交集

在 TypeScript 中，接口（`interface`）的扩展有一定的规则和限制。特别是，当你试图扩展某个类型时，这个类型必须是静态已知的对象类型或者对象类型的交集。否则，TypeScript 会报错。

### 什么是静态已知成员的对象类型或对象类型的交集？

1. **静态已知成员的对象类型**：指的是对象字面量类型或者明确声明的对象类型。

   例如：

   ```typescript
   interface A {
     propA: string;
   }

   interface B extends A {
     propB: number;
   }
   ```

   在这里，`B` 扩展了 `A`，而 `A` 是一个静态已知成员的对象类型。

2. **对象类型的交集**：指的是两个或多个对象类型的交集。

   例如：

   ```typescript
   interface A {
     propA: string;
   }

   interface B {
     propB: number;
   }

   type C = A & B;

   interface D extends C {
     propD: boolean;
   }
   ```

   在这里，`D` 扩展了 `C`，而 `C` 是 `A` 和 `B` 的交集类型。

### 不能扩展非对象类型

扩展非对象类型（如基本类型、联合类型等）是不允许的。例如：

```typescript
type Primitive = string | number;

interface E extends Primitive {
  propE: boolean;
}
// 错误：接口只能扩展对象类型或对象类型的交集
```

### 解决方法

为了避免这种错误，可以确保接口只扩展静态已知的对象类型或对象类型的交集。如果你需要扩展联合类型中的每个对象类型，可以使用交集类型。

例如：

```typescript
type F = { propF: string } | { propG: number };

interface G extends F {
  propG: boolean;
}
// 错误：接口只能扩展对象类型或对象类型的交集
```

正确的做法是将类型定义为交集类型：

```typescript
type F1 = { propF: string };
type F2 = { propG: number };

type F = F1 & F2;

interface G extends F {
  propH: boolean;
}
// 这样是正确的，因为 F 是一个对象类型的交集
```

### 示例

以下是一个完整的示例，展示了如何正确扩展对象类型及其交集类型：

```typescript
// 定义静态已知对象类型
interface User {
  id: number;
  name: string;
}

// 扩展对象类型
interface Admin extends User {
  isAdmin: boolean;
}

// 定义多个对象类型
interface Address {
  street: string;
  city: string;
}

interface Contact {
  email: string;
  phone: string;
}

// 定义对象类型的交集
type UserProfile = User & Address & Contact;

// 扩展对象类型的交集
interface CompleteProfile extends UserProfile {
  profilePictureUrl: string;
}

// 示例用法
const admin: Admin = {
  id: 1,
  name: "Alice",
  isAdmin: true
};

const completeProfile: CompleteProfile = {
  id: 2,
  name: "Bob",
  street: "123 Main St",
  city: "Somewhere",
  email: "bob@example.com",
  phone: "123-456-7890",
  profilePictureUrl: "http://example.com/profile.jpg"
};
```

### 总结

在 TypeScript 中，接口只能扩展静态已知成员的对象类型或对象类型的交集。这些类型在定义时必须是明确的对象类型，而不是联合类型或基本类型。如果遇到类型错误，可以将类型定义为交集类型来解决问题。这样，接口扩展的类型将是一个明确的对象类型的交集，符合 TypeScript 的类型系统规则。
