import * as React from 'react'
import * as classNames from 'classnames'
import { WebView } from './WebView.react'
import { ITabInfo, ITabData } from '../types'

interface ITabPanelProps extends ITabData {
    openTab: (url?: string) => void
    updateTabURL: (id: number, url: string) => void
    updateTabTitle: (id: number, title: string) => void
    updateTabFavicon: (id: number, favicon: string) => void
    addVisited: (url: string, title: string) => void
}

export class TabPanel extends React.Component<ITabPanelProps> {
    render() {
        const { tabs, currentTabId } = this.props
        const avaliable = (tab: ITabInfo) => (tab.url !== '')

        return (
            <div className="app-panel">
                <ul className="webviews">
                    {
                        tabs.filter(avaliable).map((tab) => {
                            const isCurrent = currentTabId === tab.id
                            const className = classNames({ 'webviews_hidden': !isCurrent })

                            return (
                                <li className={className} key={tab.id}>
                                    <WebView
                                        active={isCurrent}
                                        
                                        src={tab.url}
                                        onOpen={(url) => this.props.openTab(url)}
                                        onLoaded={(url, title) => this.props.addVisited(url, title)}
                                        onURLChange={(url) => this.props.updateTabURL(tab.id, url)}
                                        onTitleChange={(title) => this.props.updateTabTitle(tab.id, title)}
                                        onFaviconChange={(favicon) => this.props.updateTabFavicon(tab.id, favicon)}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}