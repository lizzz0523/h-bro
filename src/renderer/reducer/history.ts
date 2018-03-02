import { IVisited } from '../types'
import { CommonReducer, IReduce } from '../service/CommonReducer'
import { IHistoryAction, IAddVisitedAction, IRemoveVisitedAction,
    ISearchVisitedResolvedAction, IClearVisitedAction } from '../action/history'
import { SEARCH_VISITED, ADD_VISITED, REMOVE_VISITED,
    SEARCH_VISITED_RESOLVED, CLEAR_VISITED } from '../actionType'

export interface IHistoryState {
    visited: IVisited[]
}

export type IHistoryReduce =
    IReduce<IHistoryState, ISearchVisitedResolvedAction> | IReduce<IHistoryState, IClearVisitedAction>

export class HistoryReducer extends CommonReducer<IHistoryState, IHistoryAction> {
    constructor(initState: IHistoryState) {
        super(initState)

        this.bind(SEARCH_VISITED_RESOLVED, this.searchVisited)
        this.bind(CLEAR_VISITED, this.clearVisited)
    }

    bind(type: SEARCH_VISITED_RESOLVED, reduce: IReduce<IHistoryState, ISearchVisitedResolvedAction>): void
    bind(type: CLEAR_VISITED, reduce: IReduce<IHistoryState, IClearVisitedAction>): void
    bind(type: string, reduce: IHistoryReduce): void {
        super.bind(type, reduce as IReduce<IHistoryState, IHistoryAction>)
    }

    searchVisited = (state: IHistoryState, action: ISearchVisitedResolvedAction): IHistoryState => {
        return { ...state, visited: action.visited }
    }

    clearVisited = (state: IHistoryState, action: IClearVisitedAction): IHistoryState => {
        return { ...state, visited: [] }
    }
}

const reducer = new HistoryReducer({
    visited: []
})

export const history = reducer.dispatch