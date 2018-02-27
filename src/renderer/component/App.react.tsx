import * as React from 'react'
import { TabList } from '../container/TabList'
import { TabPanel } from '../container/TabPanel'
import { NavBar } from '../container/NavBar'

export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <TabList />
                <NavBar />
                <TabPanel />
            </div>
        )
    }
}