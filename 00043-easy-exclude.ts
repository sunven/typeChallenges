// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>
]

// ============= Your Code Here =============
// T extends U ? X : Y
// (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
type MyExclude<T, U> = T extends U ? never : T
