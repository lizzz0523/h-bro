import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { TabPanel as DumbTabPanel } from '../component/TabPanel.react'
import { IGlobalState } from '../reducer'
import { INavigateAction, OpenTabAction, SetTabAction } from '../action/navigate'
import { IHistoryAction, AddVisitedAction } from '../action/history'

function mapStateToProps(state: IGlobalState) {
    const { tabs, currentTabId } = state.navigate

    return {
        tabs,
        currentTabId
    }
}

function mapDispatchToProps(dispatch: Dispatch<INavigateAction | IHistoryAction>) {
    return {
        openTab: (url?: string) => { dispatch(new OpenTabAction(url)) },
        updateTabURL: (id: number, url: string) => { dispatch(new SetTabAction(id, 'url', url)) },
        updateTabTitle: (id: number, title: string) => { dispatch(new SetTabAction(id, 'title', title)) },
        updateTabFavicon: (id: number, favicon: string) => { dispatch(new SetTabAction(id, 'favicon', favicon)) },
        addVisited: (url: string, title: string) => { dispatch(new AddVisitedAction(url, title)) }
    }
}

export const TabPanel = connect(mapStateToProps, mapDispatchToProps)(DumbTabPanel)