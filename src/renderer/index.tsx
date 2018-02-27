import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { middleware as reduxPackMiddleware } from 'redux-pack'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'

import { App } from './component/App.react'
import { reducers } from './reducer'
import { ShortcutManager } from './service/ShortcutManager'
import { HistoryManager } from './service/HistoryManager'

const store = createStore(reducers, applyMiddleware(reduxPackMiddleware))

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root') as HTMLElement
)

ShortcutManager.setup(store)
HistoryManager.setup()