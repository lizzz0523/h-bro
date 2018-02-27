import * as React from 'react'
import * as classNames from 'classnames'
import { ITabInfo, ITabData } from '../types'

interface ITabListProps extends ITabData {
    openTab: (url?: string) => void
    closeTab: (id: number) => void
    selectTab: (id: number) => void
}

export class TabList extends React.Component<ITabListProps> {
    componentDidMount() {
        this.props.openTab()
    }
    
    render() {
        const { tabs, currentTabId } = this.props
        const stop = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation()

        return (
            <nav className="app-tabs">
                <ul className="tabs">
                    {
                        tabs.map((tab: ITabInfo) => {
                            const isCurrent = currentTabId === tab.id
                            const tabCurrent = classNames({ 'tabs_current': isCurrent })
                            const hasFavicon = tab.favicon !== ''
                            const tabFavicon = classNames({ 'tabs_favicon': true, 'hide': !hasFavicon })
                            const favicon = { backgroundImage: `url(${ tab.favicon }` }

                            return (
                                <li className={tabCurrent} key={tab.id} onClick={() => this.props.selectTab(tab.id)}>
                                    <span className={tabFavicon} style={favicon} />
                                    <span className="tabs_title">{tab.title}</span>
                                    <i
                                        className="tabs_close fa fa-times"
                                        onClick={(e) => (stop(e), this.props.closeTab(tab.id))}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="tabs-add"><button onClick={() => this.props.openTab()} /></div>
            </nav>
        )
    }
}