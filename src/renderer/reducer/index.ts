import { combineReducers } from 'redux'
import { navigate, INavigateState } from './navigate'

export interface IGlobalState {
    navigate: INavigateState
}

export const reducers = combineReducers<IGlobalState>({
    navigate
})