// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>
]

// @ts-expect-error
type error = Flatten<'1'>

// ============= Your Code Here =============
// 你的答案
type Flatten<T extends any[], U extends any[] = []> = T extends [infer A, ...infer Rest]
  ? A extends any[]
    ? Flatten<[...A, ...Rest], [...U]>
    : Flatten<Rest, [...U, A]>
  : U
