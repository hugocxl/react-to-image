import { Options } from 'html-to-image/lib/types'

export type LibFn = (node: HTMLElement, options?: Options) => Promise<unknown>

export type LibFnReturn<F extends LibFn> = Awaited<ReturnType<F>>

export type LibOptions = Options
