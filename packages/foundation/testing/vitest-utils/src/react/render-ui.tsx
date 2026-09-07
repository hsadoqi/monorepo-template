import type { ReactNode } from "react"
import { createTestRender } from "./create-test-render"

export const renderUi = createTestRender((children: ReactNode) => (
  <>{children}</>
))
