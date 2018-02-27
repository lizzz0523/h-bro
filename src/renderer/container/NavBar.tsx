import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { NavBar as DumbNavBar } from '../component/NavBar.react'
import { IGlobalState } from '../reducer'
import { INavigateAction, UpdateURLAction,
    FocusEnterAction, FocusLeaveAction, WillNavigateAction,
    ReloadAction, ForwardActoin, BackwardAction } from '../action/navigate'
import { IHistoryAction, SearchVisitedAction } from '../action/history'

function mapStateToProps(state: IGlobalState) {
    const { currentURL, isURLFocus } = state.navigate

    return {
        currentURL,
        isURLFocus
    }
}

function mapDispatchToProps(dispatch: Dispatch<INavigateAction | IHistoryAction>) {
    return {
        searchVisited: (query: string) => { dispatch(new SearchVisitedAction(query)) },
        updateURL: (url: string) => { dispatch(new UpdateURLAction(url)) },
        focus: () => { dispatch(new FocusEnterAction() )},
        blur: () => { dispatch(new FocusLeaveAction() )},
        reload: () => { dispatch(new ReloadAction() )},
        forward: () => { dispatch(new ForwardActoin() )},
        backward: () => { dispatch(new BackwardAction() )},
        navigate: () => { dispatch(new WillNavigateAction() )}
    }
}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(DumbNavBar)