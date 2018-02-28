import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'

import { App } from './component/App.react'
import { reducers } from './reducer'
import { ShortcutManager } from './service/ShortcutManager'
import { HistoryManager } from './service/HistoryManager'
import { asyncMiddleware } from './middleware/asyncMiddleware'

const store = createStore(reducers, applyMiddleware(asyncMiddleware))

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root') as HTMLElement
)

ShortcutManager.setup(store)
HistoryManager.setup(store)