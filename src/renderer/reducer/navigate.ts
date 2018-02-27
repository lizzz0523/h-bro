import { ITabInfo, ITabData } from '../types'
import { WebviewManager } from '../service/WebviewManager'
import { CommonReducer, IReduce } from '../service/CommonReducer'
import { INavigateAction, IOpenTabAction, ICloseTabAction, ISelectTabAction, ISetTabAction,
    IUpdateURLAction, IFocusEnterAction, IFocusLeaveAction, IWillNavigateAction,
    IReloadAction, IForwardAction, IBackwardAction } from '../action/navigate'
import {
    SET_TAB, OPEN_TAB, CLOSE_TAB, SELECT_TAB,
    UPDATE_URL, FOCUS_ENTER, FOCUS_LEAVE,
    RELOAD, FORWARD, BACKWARD, NAVIGATE
} from '../actionType'

export interface INavigateState extends ITabData {
    isURLFocus: boolean
    currentURL: string
}

export type INavigateReduce = 
    IReduce<INavigateState, IOpenTabAction> | IReduce<INavigateState, ICloseTabAction> |
    IReduce<INavigateState, ISelectTabAction> | IReduce<INavigateState, ISetTabAction> |
    IReduce<INavigateState, IUpdateURLAction> | IReduce<INavigateState, IFocusEnterAction> |
    IReduce<INavigateState, IFocusLeaveAction> | IReduce<INavigateState, IWillNavigateAction> |
    IReduce<INavigateState, IReloadAction> | IReduce<INavigateState, IForwardAction> |
    IReduce<INavigateState, IBackwardAction>

export class NavigateReducer extends CommonReducer<INavigateState, INavigateAction> {
    private static TAB_ID: number = 1
    private static DEFAULT_TAB_TITLE: string = '新标签页'

    // 根据给定id获取对应的tab
    static findTab(tabs: ITabInfo[], id: number): ITabInfo | undefined {
        return tabs.find((tab) => tab.id === id)
    }

    // 根据给定id获取对应的tab url
    static getTabURL(tabs: ITabInfo[], id: number): string | undefined {
        const tab = NavigateReducer.findTab(tabs, id)
        return tab ? tab.url : void 0
    }

    // 根据给定id，设置对应tab的某个属性
    static setTab(state: ITabData, id: number, prop: string, value: string) {
        const tab = NavigateReducer.findTab(state.tabs, id)
        const index = tab ? state.tabs.indexOf(tab) : -1

        if (index < 0) {
            return state
        }

        const tabs = [
            ...state.tabs.slice(0, index),
            { ...(tab as ITabInfo), [prop]: value },
            ...state.tabs.slice(index + 1)
        ]
        const currentTabId = state.currentTabId
        
        return { tabs, currentTabId }
    }

    // 打开一个新的tab
    static openTab(state: ITabData, url: string = ''): ITabData {
        const tab = {
            url,

            id: NavigateReducer.TAB_ID++,
            title: NavigateReducer.DEFAULT_TAB_TITLE,
            favicon: ''
        }

        // 新的tab加入到当前tab列表的尾部
        const tabs = [ ...state.tabs, tab ]
        const currentTabId = tab.id

        return { tabs, currentTabId }
    }

    // 根据给定id关闭对应的tab
    static closeTab(state: ITabData, id: number): ITabData {
        const tab = NavigateReducer.findTab(state.tabs, id)
        const index = tab ? state.tabs.indexOf(tab) : -1

        if (index < 0) {
            return state
        }

        const isTail = state.tabs.length === index + 1
        const isLast = state.tabs.length === 1

        const tabs = [
            ...state.tabs.slice(0, index),
            ...state.tabs.slice(index + 1)
        ]

        // 当关闭的是当前选中的tab，这要更新当前选中的tab为临近tab
        let currentTabId

        if (id === state.currentTabId) {
            currentTabId = isLast ? void 0 : state.tabs[isTail ? index - 1 : index + 1].id
        } else {
            currentTabId = state.currentTabId
        }
        
        return { tabs, currentTabId }
    }

    // 更加给定id选中对应的tab
    static selectTab(state: ITabData, id: number): ITabData {
        return { tabs: state.tabs, currentTabId: id }
    }

    constructor(initState: INavigateState) {
        super(initState)

        this.bind(OPEN_TAB, this.openTab)
        this.bind(CLOSE_TAB, this.closeTab)
        this.bind(SELECT_TAB, this.selectTab)
        this.bind(SET_TAB, this.setTab)
        this.bind(UPDATE_URL, this.updateURL)
        this.bind(FOCUS_ENTER, this.focusEnter)
        this.bind(FOCUS_LEAVE, this.focusLeave)
        this.bind(NAVIGATE, this.navigate)
        this.bind(RELOAD, this.reload)
        this.bind(FORWARD, this.forward)
        this.bind(BACKWARD, this.backward)
    }

    bind(type: OPEN_TAB, reduce: IReduce<INavigateState, IOpenTabAction>): void
    bind(type: CLOSE_TAB, reduce: IReduce<INavigateState, ICloseTabAction>): void
    bind(type: SELECT_TAB, reduce: IReduce<INavigateState, ISelectTabAction>): void
    bind(type: SET_TAB, reduce: IReduce<INavigateState, ISetTabAction>): void
    bind(type: UPDATE_URL, reduce: IReduce<INavigateState, IUpdateURLAction>): void
    bind(type: FOCUS_ENTER, reduce: IReduce<INavigateState, IFocusEnterAction>): void
    bind(type: FOCUS_LEAVE, reduce: IReduce<INavigateState, IFocusLeaveAction>): void
    bind(type: NAVIGATE, reduce: IReduce<INavigateState, IWillNavigateAction>): void
    bind(type: RELOAD, reduce: IReduce<INavigateState, IReloadAction>): void
    bind(type: FORWARD, reduce: IReduce<INavigateState, IForwardAction>): void
    bind(type: BACKWARD, reduce: IReduce<INavigateState, IBackwardAction>): void
    bind(type: string, reduce: INavigateReduce): void {
        super.bind(type, reduce as IReduce<INavigateState, INavigateAction>)
    }

    openTab = (state: INavigateState, action: IOpenTabAction): INavigateState => {
        // 打开新的tab并选中
        const { tabs, currentTabId } = NavigateReducer.openTab(state, action.url)
        const currentURL = NavigateReducer.getTabURL(tabs, currentTabId as number) as string

        return { ...state, tabs, currentTabId, currentURL }
    }

    closeTab = (state: INavigateState, action: ICloseTabAction): INavigateState => {
        // 删除id对应的tab，有可能会更新当前选中的tab
        const { tabs, currentTabId } = NavigateReducer.closeTab(state, action.id)
        const currentURL = NavigateReducer.getTabURL(tabs, currentTabId as number) as string

        return { ...state, tabs, currentTabId, currentURL }
    }

    selectTab = (state: INavigateState, action: ISelectTabAction): INavigateState => {
        // 根据给定id选中某个tab
        const { tabs, currentTabId } = NavigateReducer.selectTab(state, action.id)
        const currentURL = NavigateReducer.getTabURL(tabs, currentTabId as number) as string

        return { ...state, tabs, currentTabId, currentURL }
    }

    setTab = (state: INavigateState, action: ISetTabAction): INavigateState => {
        const { tabs, currentTabId } = NavigateReducer.setTab(state, action.id, action.prop, action.value)
        const currentURL = NavigateReducer.getTabURL(tabs, currentTabId as number) as string

        return { ...state, tabs, currentTabId, currentURL }
    }

    updateURL = (state: INavigateState, action: IUpdateURLAction): INavigateState => {
        return {
            ...state,
            currentURL: action.url
        }
    }

    focusEnter = (state: INavigateState): INavigateState => {
        // 获得焦点
        return {
            ...state,
            isURLFocus: true
        }
    }

    focusLeave = (state: INavigateState): INavigateState => {
        // 失去焦点
        return {
            ...state,
            isURLFocus: false
        }
    }

    navigate = (state: INavigateState): INavigateState => {
        // 用户输入回车，把当前输入框中的url加入到tab列表中，如果url不完整，尝试补全
        const urlComplete = !!state.currentURL.match(/^https?:\/\//)
        const url = urlComplete ? state.currentURL : `http://${ state.currentURL }`
        
        if (state.currentTabId) {
            return {
                ...state,
                ...NavigateReducer.setTab(state, state.currentTabId, 'url', url),
                currentURL: url
            }
        } else {
            return {
                ...state,
                ...NavigateReducer.openTab(state, url),
                currentURL: url
            }
        }
    }

    reload(state: INavigateState, action: IReloadAction): INavigateState {
        WebviewManager.reload()
        return state
    }

    forward(state: INavigateState, action: IForwardAction): INavigateState {
        WebviewManager.forward()
        return state
    }

    backward(state: INavigateState, action: IBackwardAction): INavigateState {
        WebviewManager.backward()
        return state
    }
}

const reducer = new NavigateReducer({
    tabs: [],
    currentTabId: void 0,
    currentURL: '',
    isURLFocus: false
})

export const navigate = reducer.dispatch