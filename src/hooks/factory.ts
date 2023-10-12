// Dependencies
import { useReducer, useRef } from 'react'

// Constants
import { INITIAL_STATE } from './constants'

// Types
import { HookStateStatus } from './types'
import type { LibFn, LibFnReturn } from '../types'
import type {
  Hook,
  HookExtendedState,
  HookOptions,
  HookReturn,
  HookState,
  HookStateReducer
} from './types'

export function createHook<F extends LibFn>(libFn: F): Hook<F> {
  const stateReducer: HookStateReducer<F> = (state, action) => {
    switch (action.type) {
      case HookStateStatus.Loading:
        return { ...state, status: HookStateStatus.Loading }
      case HookStateStatus.Success:
        return { ...state, status: HookStateStatus.Success, data: action.data }
      case HookStateStatus.Error:
        return {
          ...state,
          status: HookStateStatus.Error,
          error: action.error
        }
      default:
        return state
    }
  }

  function getExtendedState({
    status,
    ...state
  }: HookState<LibFnReturn<F>>): HookExtendedState<LibFnReturn<F>> {
    return {
      ...state,
      status,
      isError: status === HookStateStatus.Error,
      isLoading: status === HookStateStatus.Loading,
      isSuccess: status === HookStateStatus.Success,
      isIdle: status === HookStateStatus.Idle
    }
  }

  return function <E = unknown>(options?: HookOptions<F>): HookReturn<F, E> {
    const nodeRef = useRef<E>()
    const [state, dispatchAction] = useReducer(stateReducer, INITIAL_STATE)
    const extendedState = getExtendedState(state)

    function setNodeRef(node: E): void {
      if (!nodeRef.current && node) nodeRef.current = node
    }

    async function getImage(): Promise<LibFnReturn<F> | null> {
      try {
        if (!nodeRef.current && !options?.selector) {
          throw new Error(
            'A dom element must be selected: use the selector option or the ref'
          )
        }

        if (options?.onStart) options.onStart()

        dispatchAction({ type: HookStateStatus.Loading })

        if (options?.onLoading) options.onLoading()

        const element = (
          options?.selector
            ? document.querySelector(options.selector)
            : nodeRef.current
        ) as HTMLElement
        const data = (await libFn(element, options)) as LibFnReturn<F>

        dispatchAction({ type: HookStateStatus.Success, data })

        if (options?.onSuccess) options.onSuccess(data)

        return data
      } catch (error) {
        const message = (error as Error)?.message || 'Unknown error'
        console.error('Error generating image from component:', message)

        dispatchAction({ type: HookStateStatus.Error, error: message })

        if (options?.onError) options.onError(message)

        return null
      }
    }

    return [
      extendedState,
      () => {
        getImage()
      },
      setNodeRef
    ]
  }
}
