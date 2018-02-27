import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { TabList as DumbTabList } from '../component/TabList.react'
import { IGlobalState } from '../reducer'
import { INavigateAction, OpenTabAction, CloseTabAction, SelectTabAction } from '../action/navigate'

function mapStateToProps(state: IGlobalState) {
    const { tabs, currentTabId } = state.navigate

    return {
        tabs,
        currentTabId
    }
}

function mapDispatchToProps(dispatch: Dispatch<INavigateAction>) {
    return {
        openTab: (url?: string) => { dispatch(new OpenTabAction(url)) },
        closeTab: (id: number) => { dispatch(new CloseTabAction(id)) },
        selectTab: (id: number) => { dispatch(new SelectTabAction(id)) }
    }
}

export const TabList = connect(mapStateToProps, mapDispatchToProps)(DumbTabList)