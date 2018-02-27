import { WebviewTag } from 'electron'

export class WebviewManager {
    private static currentWebview: WebviewTag | null

    static register(webview: WebviewTag) {
        WebviewManager.currentWebview = webview
    }

    static unregister(webview: WebviewTag) {
        if (WebviewManager.currentWebview === webview) {
            WebviewManager.currentWebview = null
        }
    }

    static backward() {
        if (WebviewManager.currentWebview) {
            WebviewManager.currentWebview.goBack()
        }
    }

    static forward() {
        if (WebviewManager.currentWebview) {
            WebviewManager.currentWebview.goForward()
        }
    }

    static reload() {
        if (WebviewManager.currentWebview) {
            WebviewManager.currentWebview.reload()
        }
    }

    static stop() {
        if (WebviewManager.currentWebview) {
            WebviewManager.currentWebview.stop()
        }
    }
}