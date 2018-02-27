import { combineReducers } from 'redux'
import { navigate, INavigateState } from './navigate'
import { history, IHistoryState } from './history'

export interface IGlobalState {
    navigate: INavigateState,
    history: IHistoryState
}

export const reducers = combineReducers<IGlobalState>({
    navigate,
    history
})