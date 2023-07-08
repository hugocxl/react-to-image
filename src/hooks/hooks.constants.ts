import { HookStateStatus } from './hooks.types'

export const INITIAL_STATE = {
  status: HookStateStatus.Idle,
  error: null,
  data: null
}
