export interface ITabInfo {
    id: number
    url: string
    title: string
    favicon: string
}

export interface ITabData {
    tabs: ITabInfo[]
    currentTabId: number | undefined
}