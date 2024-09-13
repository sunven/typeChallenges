// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
]

// ============= Your Code Here =============
type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1]
> = CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>
