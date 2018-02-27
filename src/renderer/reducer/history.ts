import { handle } from 'redux-pack'
import { IVisited } from '../types'
import { CommonReducer, IReduce } from '../service/CommonReducer'
import { IHistoryAction, ISearchVisitedAction, IAddVisitedAction, IRemoveVisitedAction } from '../action/history'
import { SEARCH_VISITED, ADD_VISITED, REMOVE_VISITED } from '../actionType'

export interface IHistoryState {
    visited: IVisited[]
}

export type IHistoryReduce =
    IReduce<IHistoryState, ISearchVisitedAction> | IReduce<IHistoryState, IAddVisitedAction> |
    IReduce<IHistoryState, IRemoveVisitedAction>

export class HistoryReducer extends CommonReducer<IHistoryState, IHistoryAction> {
    constructor(initState: IHistoryState) {
        super(initState)

        this.bind(SEARCH_VISITED, this.searchVisited)
        this.bind(ADD_VISITED, this.addVisited)
        this.bind(REMOVE_VISITED, this.removeVisited)
    }

    bind(type: SEARCH_VISITED, reduce: IReduce<IHistoryState, ISearchVisitedAction>): void
    bind(type: ADD_VISITED, reduce: IReduce<IHistoryState, IAddVisitedAction>): void
    bind(type: REMOVE_VISITED, reduce: IReduce<IHistoryState, IRemoveVisitedAction>): void
    bind(type: string, reduce: IHistoryReduce): void {
        super.bind(type, reduce as IReduce<IHistoryState, IHistoryAction>)
    }

    searchVisited = (state: IHistoryState, action: ISearchVisitedAction) => {
        const visited = action.payload

        return handle<IHistoryState>(state, action, {
            success: () => {
                return { ...state, visited }
            }
        })
    }

    addVisited = (state: IHistoryState, action: IAddVisitedAction) => {
        return state
    }

    removeVisited = (state: IHistoryState, action: IRemoveVisitedAction) => {
        return state
    }
}

const reducer = new HistoryReducer({
    visited: []
})

export const history = reducer.dispatch