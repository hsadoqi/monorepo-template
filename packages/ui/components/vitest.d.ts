import "vitest"
import { TestingLibraryMatchers } from "@repo/foundation-vitest-utils/setup"

declare global {
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Assertion<T = any> = TestingLibraryMatchers<T, void>
  }
}
