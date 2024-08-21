// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>
]

// ============= Your Code Here =============
// type PartialByKeys<T, K> =
// type PartialByKeys<T, K extends keyof T = keyof T> = Omit<Omit<T, K> & Partial<Pick<T, K>>, never>

type MergeType<O> = {
  [P in keyof O]: O[P]
}

// type PartialByKeys<T, K extends keyof T = keyof T> = MergeType<
//   {
//     [P in keyof T as P extends K ? P : never]?: T[P]
//   } & {
//     [P in keyof T as P extends K ? never : P]: T[P]
//   }
// >

type PartialByKeys<T, K extends keyof T = keyof T> = Omit<
  {
    [key in Extract<keyof T, K>]?: T[key]
  } & {
    [key in Exclude<keyof T, K>]: T[key]
  },
  never
>
