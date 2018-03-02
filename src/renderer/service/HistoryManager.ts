import * as rpc from 'pauls-electron-rpc'
import { Store } from 'redux'
import { IGlobalState } from '../reducer'
import { IVisited } from '../types'
import { historyManifest } from '../../manifest'

export class HistoryManager {
    static api: any

    static setup(store: Store<IGlobalState>) {
        HistoryManager.api = rpc.importAPI('history-api', historyManifest)
    }

    static insert(url: string, title: string): Promise<void> {
        return HistoryManager.api.insert(url, title)
    }

    static remove(url: string): Promise<void> {
        return HistoryManager.api.remove(url)
    }

    static removeAll(): Promise<void> {
        return HistoryManager.api.removeAll()
    }

    static search(query?: string): Promise<IVisited[]> {
        return HistoryManager.api.search(query)
    }
}