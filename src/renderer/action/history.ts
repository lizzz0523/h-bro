import { HistoryManager } from '../service/HistoryManager'
import { ADD_VISITED, REMOVE_VISITED, SEARCH_VISITED } from '../actionType'
import { IVisited } from '../types'

export interface IAddVisitedAction {
    type: ADD_VISITED
    promise: Promise<void>
}

export interface IRemoveVisitedAction {
    type: REMOVE_VISITED
    promise: Promise<void>
}

export interface ISearchVisitedAction {
    type: SEARCH_VISITED
    promise: Promise<IVisited[]>
    payload: IVisited[]
}

export type IHistoryAction = IAddVisitedAction | IRemoveVisitedAction | ISearchVisitedAction

export class AddVisitedAction implements IAddVisitedAction {
    type: ADD_VISITED = ADD_VISITED
    promise: Promise<void>

    constructor(url: string, title: string) {
        this.promise =  HistoryManager.insert(url, title)
        return { type: this.type, promise: this.promise }
    }
}

export class RemoveVisitedAction implements IRemoveVisitedAction {
    type: REMOVE_VISITED = REMOVE_VISITED
    promise: Promise<void>

    constructor(url: string) {
        this.promise =  HistoryManager.remove(url)
        return { type: this.type, promise: this.promise }
    }
}

export class SearchVisitedAction implements ISearchVisitedAction {
    type: SEARCH_VISITED = SEARCH_VISITED
    promise: Promise<IVisited[]>
    payload: IVisited[]

    constructor(query: string) {
        this.promise = HistoryManager.search(query)
        this.payload = []
        return { type: this.type, promise: this.promise, payload: this.payload }
    }
}