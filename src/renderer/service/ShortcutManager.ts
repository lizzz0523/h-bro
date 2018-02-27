import { ipcRenderer } from 'electron'
import * as Mousetrap from 'mousetrap'
import { Store } from 'redux'
import { IGlobalState } from '../reducer'
import { FocusEnterAction, FocusLeaveAction,
    OpenTabAction, CloseTabAction, SelectTabAction, 
    ReloadAction, ForwardActoin, BackwardAction } from '../action/navigate'
import * as keyBinding from '../keyBinding'

export class ShortcutManager {
    static setup(store: Store<IGlobalState>) {
        /* tab shortcut */
        Mousetrap.bind(keyBinding.NEW_TAB, () => {
            store.dispatch(new OpenTabAction())
        })
        
        Mousetrap.bind(keyBinding.CLOSE_TAB, () => {
            const { navigate } = store.getState()
        
            if (navigate.currentTabId) {
                store.dispatch(new CloseTabAction(navigate.currentTabId))
            }
        })

        function moveTab(step: number) {
            const { navigate } = store.getState()
            const index = navigate.tabs.findIndex((tab) => tab.id === navigate.currentTabId)
            const length = navigate.tabs.length
            const nextIndex = (index + step + length) % length

            store.dispatch(new SelectTabAction(navigate.tabs[nextIndex].id))
        }

        Mousetrap.bind(keyBinding.PREV_TAB, () => {
            moveTab(-1)
        })

        Mousetrap.bind(keyBinding.NEXT_TAB, () => {
            moveTab(+1)
        })

        /* url shortcut */

        Mousetrap.bind(keyBinding.FOCUS, (event) => {
            event.preventDefault()
            store.dispatch(new FocusEnterAction())
        })

        ipcRenderer.on('blur', () => {
            store.dispatch(new FocusLeaveAction())
        })

        /* webview shortcut */

        Mousetrap.bind(keyBinding.RELOAD, (event) => {
            event.preventDefault()
            store.dispatch(new ReloadAction())
        })

        Mousetrap.bind(keyBinding.FORWARD, (event) => {
            event.preventDefault()
            store.dispatch(new ForwardActoin())
        })

        Mousetrap.bind(keyBinding.BACKWARD, (event) => {
            event.preventDefault()
            store.dispatch(new BackwardAction())
        })
    }
}