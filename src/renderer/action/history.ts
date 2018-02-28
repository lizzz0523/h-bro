import { HistoryManager } from '../service/HistoryManager'
import { ADD_VISITED, REMOVE_VISITED, CLEAR_VISITED, SEARCH_VISITED,
    SEARCH_VISITED_PEDDING, SEARCH_VISITED_RESOLVED, SEARCH_VISITED_REJECTED } from '../actionType'
import { IVisited } from '../types'

export interface IAddVisitedAction {
    type: ADD_VISITED
}

export interface IRemoveVisitedAction {
    type: REMOVE_VISITED
}

export interface ISearchVisitedAction {
    type: SEARCH_VISITED
    query: string
    visited: Promise<IVisited[]>
}

export interface ISearchVisitedPeddingAction {
    type: SEARCH_VISITED_PEDDING
}

export interface ISearchVisitedRejectedAction {
    type: SEARCH_VISITED_REJECTED
    error: Error
}

export interface ISearchVisitedResolvedAction {
    type: SEARCH_VISITED_RESOLVED
    query: string
    visited: IVisited[]
}

export interface IClearVisitedAction {
    type: CLEAR_VISITED
}

export type IHistoryAction = IAddVisitedAction | IRemoveVisitedAction | ISearchVisitedAction |
    ISearchVisitedPeddingAction | ISearchVisitedResolvedAction | ISearchVisitedRejectedAction

// 把当前浏览的页面信息，加入到数据库
export class AddVisitedAction implements IAddVisitedAction {
    type: ADD_VISITED = ADD_VISITED

    constructor(url: string, title: string) {
        HistoryManager.insert(url, title)
        return { type: this.type }
    }
}

// 从数据库中删除某个url对应的页面信息
export class RemoveVisitedAction implements IRemoveVisitedAction {
    type: REMOVE_VISITED = REMOVE_VISITED

    constructor(url: string) {
        HistoryManager.remove(url)
        return { type: this.type }
    }
}

// 从数据库中搜索url与某个字符串匹配的所有页面信息
export class SearchVisitedAction implements ISearchVisitedAction {
    type: SEARCH_VISITED = SEARCH_VISITED
    visited: Promise<IVisited[]>

    constructor(public query: string) {
        this.visited = HistoryManager.search(query)
        return { type: this.type, visited: this.visited, query }
    }
}

// 把已经搜索到的页面信息清除掉
export class ClearVisitedAction implements IClearVisitedAction {
    type: CLEAR_VISITED = CLEAR_VISITED
    
    constructor() {
        return { type: this.type }
    }
}