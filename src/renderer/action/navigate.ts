import {
    SET_TAB, OPEN_TAB, CLOSE_TAB, SELECT_TAB,
    UPDATE_URL, FOCUS_ENTER, FOCUS_LEAVE,
    RELOAD, FORWARD, BACKWARD, NAVIGATE
} from '../actionType'

export interface ISetTabAction {
    type: SET_TAB
    id: number
    prop: string
    value: string
}

export interface IOpenTabAction {
    type: OPEN_TAB
    url?: string
}

export interface ICloseTabAction {
    type: CLOSE_TAB
    id: number
}

export interface ISelectTabAction {
    type: SELECT_TAB
    id: number
}

export interface IUpdateURLAction {
    type: UPDATE_URL,
    url: string
}

export interface IFocusEnterAction {
    type: FOCUS_ENTER
}

export interface IFocusLeaveAction {
    type: FOCUS_LEAVE
}

export interface IWillNavigateAction {
    type: NAVIGATE
}

export interface IReloadAction {
    type: RELOAD
}

export interface IForwardAction {
    type: FORWARD
}

export interface IBackwardAction {
    type: BACKWARD
}

export type INavigateAction = 
    ISetTabAction | IOpenTabAction | ICloseTabAction | ISelectTabAction |
    IReloadAction | IForwardAction | IBackwardAction | IWillNavigateAction |
    IUpdateURLAction | IFocusEnterAction | IFocusLeaveAction

// 设置tab的属性（url，title，favicon等）
export class SetTabAction implements ISetTabAction {
    type: SET_TAB = SET_TAB
    
    constructor(public id: number, public prop: string, public value: string) {
        return { type: this.type, id, prop, value }
    }
}

// 打开新的tab
export class OpenTabAction implements IOpenTabAction {
    type: OPEN_TAB = OPEN_TAB

    constructor(public url?: string) {
        return { type: this.type, url }
    }
}

// 关闭某个tab
export class CloseTabAction implements ICloseTabAction {
    type: CLOSE_TAB = CLOSE_TAB

    constructor(public id: number) {
        return { type: this.type, id }
    }
}

// 选中某个tab
export class SelectTabAction implements ISelectTabAction {
    type: SELECT_TAB = SELECT_TAB

    constructor(public id: number) {
        return { type: this.type, id }
    }
}

// 更新输入框中的url
export class UpdateURLAction implements IUpdateURLAction {
    type: UPDATE_URL = UPDATE_URL

    constructor(public url: string) {
        return { type: this.type, url }
    }
}

// 输入框获得焦点
export class FocusEnterAction implements IFocusEnterAction {
    type: FOCUS_ENTER = FOCUS_ENTER

    constructor() {
        return { type: this.type }
    }
}

// 输入框失去焦点
export class FocusLeaveAction implements IFocusLeaveAction {
    type: FOCUS_LEAVE = FOCUS_LEAVE

    constructor() {
        return { type: this.type }
    }
}

// 根据url进入新页面
export class WillNavigateAction implements IWillNavigateAction {
    type: NAVIGATE = NAVIGATE

    constructor() {
        return { type: this.type }
    }
}

export class ReloadAction implements IReloadAction {
    type: RELOAD = RELOAD

    constructor() {
        return { type: this.type }
    }
}

export class ForwardActoin implements IForwardAction {
    type: FORWARD = FORWARD

    constructor() {
        return { type: this.type }
    }
}

export class BackwardAction implements IBackwardAction {
    type: BACKWARD = BACKWARD

    constructor() {
        return { type: this.type }
    }
}