import { LibFn, LibFnReturn } from '../shared/types'

/**
 * Options for the hook
 */
export type HookOptions<F extends LibFn> = Parameters<F>[1] & {
  /**
   * This function will fire before the conversion starts
   */
  onStart?: () => unknown
  /**
   * This function will fire when the conversion is being processed
   */
  onLoading?: () => unknown
  /**
   * This function will fire if the conversion encounters an error and will be passed the error
   */
  onError?: (error: any) => unknown
  /**
   * This function will fire when the conversion is successful and will be passed the conversion's result
   */
  onSuccess?: (args: LibFnReturn<F>) => unknown
}

/**
 * Return type of the hook
 */
export type HookReturn<F extends LibFn, E = unknown> = [
  /**
   * Function to set the ref for the hook
   */
  (domNode: E) => void,
  /**
   * Function to start the conversion
   */
  () => void,
  /**
   * State of the hook
   */
  HookExtendedState<F>
]

/**
 * Status of the hook state
 */
export enum HookStateStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

/**
 * State of the hook
 */
export type HookState<F extends LibFn> = {
  /**
   * Current status of the conversion
   */
  status: HookStateStatus
  /**
   * Error message if an error occurred
   */
  error: string
  /**
   * The last successfully resolved data for the conversion
   */
  data: LibFnReturn<F> | null
}

/**
 * Derived state of the hook
 */
export type HookDerivedState = {
  /**
   * Flag indicating if the hook is idle
   */
  isIdle: boolean
  /**
   * Flag indicating if the hook is loading
   */
  isLoading: boolean
  /**
   * Flag indicating if an error occurred
   */
  isError: boolean
  /**
   * Flag indicating if the hook was successful
   */
  isSuccess: boolean
}

/**
 * Extended state of the hook
 */
export type HookExtendedState<F extends LibFn> = HookState<F> & HookDerivedState

/**
 * Action to update the hook state
 */
export type HookStateAction<F extends LibFn> =
  | { type: HookStateStatus.Loading }
  | { type: HookStateStatus.Success; data: LibFnReturn<F> }
  | { type: HookStateStatus.Error; error: string }

export type HookStateReducer<F extends LibFn> = (
  state: HookState<F>,
  action: HookStateAction<F>
) => HookState<F>