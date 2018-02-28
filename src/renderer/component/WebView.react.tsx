import { WebviewTag } from 'electron'
import * as React from 'react'
import { WebviewManager } from '../service/WebviewManager'

interface IWebViewProps {
    src: string
    active: boolean
    onOpen: (url: string) => void
    onURLChange: (title: string) => void
    onTitleChange: (title: string) => void
    onFaviconChange: (title: string) => void
}

export class WebView extends React.Component<IWebViewProps> {
    private webview: WebviewTag | null = null

    componentDidMount() {
        if (!this.webview) {
            return
        }

        this.webview.addEventListener('new-window', (event) => {
            this.props.onOpen(event.url)
        })

        this.webview.addEventListener('will-navigate', (event) => {
            this.props.onURLChange(event.url)
        })

        this.webview.addEventListener('did-navigate', (event) => {
            this.props.onURLChange(event.url)
        })
        
        this.webview.addEventListener('did-navigate-in-page', (event) => {
            this.props.onURLChange(event.url)
        })

        this.webview.addEventListener('page-title-updated', (event) => {
            this.props.onTitleChange(event.title)
        })

        this.webview.addEventListener('page-favicon-updated', (event) => {
            this.props.onFaviconChange(event.favicons[0])
        })

        // 当前webview激活状态，马上注册到WebviewManager中
        if (this.props.active) {
            WebviewManager.register(this.webview)
        }
    }

    componentWillUnmount() {
        // 当前tab被关闭，在webview销毁前，从WebviewManager中释放
        if (this.webview) {
            WebviewManager.unregister(this.webview)
        }
    }

    componentWillReceiveProps(props: IWebViewProps) {
        // 当前webview被重新激活，马上注册到WebviewManager中
        if (this.webview && props.active) {
            WebviewManager.register(this.webview)
        }
    }

    render() {
        return (
            <div className="webview">
                <webview ref={(el) => this.webview = el as WebviewTag} src={this.props.src} />
            </div>
        )
    }
} 