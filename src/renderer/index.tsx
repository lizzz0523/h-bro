import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './component/App.react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducers } from './reducer'
import { ShortcutManager } from './service/ShortcutManager'

const store = createStore(reducers)

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root') as HTMLElement
)

ShortcutManager.register(store)