export const SET_TAB = 'SET_TAB'
export type SET_TAB = typeof SET_TAB

export const OPEN_TAB = 'OPEN_TAB'
export type OPEN_TAB = typeof OPEN_TAB

export const CLOSE_TAB = 'CLOSE_TAB'
export type CLOSE_TAB = typeof CLOSE_TAB

export const SELECT_TAB = 'SELECT_TAB'
export type SELECT_TAB = typeof SELECT_TAB

export const UPDATE_URL = 'UPDATE_URL'
export type UPDATE_URL = typeof UPDATE_URL

export const FOCUS_ENTER = 'FOCUS_ENTER'
export type FOCUS_ENTER = typeof FOCUS_ENTER

export const FOCUS_LEAVE = 'FOCUS_LEAVE'
export type FOCUS_LEAVE = typeof FOCUS_LEAVE

export const NAVIGATE = 'NAVIGATE'
export type NAVIGATE = typeof NAVIGATE

export const RELOAD = 'RELOAD'
export type RELOAD = typeof RELOAD

export const FORWARD = 'FORWARD'
export type FORWARD = typeof FORWARD

export const BACKWARD = 'BACKWARD'
export type BACKWARD = typeof BACKWARD

export const ADD_VISITED = 'ADD_VISITED'
export type ADD_VISITED = typeof ADD_VISITED

export const REMOVE_VISITED = 'REMOVE_VISITED'
export type REMOVE_VISITED = typeof REMOVE_VISITED

export const SEARCH_VISITED_PEDDING = 'SEARCH_VISITED_PEDDING'
export type SEARCH_VISITED_PEDDING = typeof SEARCH_VISITED_PEDDING

export const SEARCH_VISITED_RESOLVED = 'SEARCH_VISITED_RESOLVED'
export type SEARCH_VISITED_RESOLVED = typeof SEARCH_VISITED_RESOLVED

export const SEARCH_VISITED_REJECTED = 'SEARCH_VISITED_REJECTED'
export type SEARCH_VISITED_REJECTED = typeof SEARCH_VISITED_REJECTED

export const SEARCH_VISITED = [SEARCH_VISITED_PEDDING, SEARCH_VISITED_RESOLVED, SEARCH_VISITED_REJECTED]
export type SEARCH_VISITED = typeof SEARCH_VISITED

export const CLEAR_VISITED = 'CLEAR_VISITED'
export type CLEAR_VISITED = typeof CLEAR_VISITED