// ts syntax issue: https://github.com/lodash/lodash/issues/3192
// reference: https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
import throttle = require('lodash/throttle')
import * as React from 'react'
import { ITabInfo } from '../types'
import { KEYCODE_ENTER } from '../keyCode'

interface INavBarProps {
    currentURL: string
    isURLFocus: boolean
    updateURL: (url: string) => void
    focus: () => void
    blur: () => void
    reload: () => void
    forward: () => void
    backward: () => void
    navigate: () => void
    searchVisited: (query: string) => void
}

export class NavBar extends React.Component<INavBarProps> {
    private input: HTMLInputElement | null = null

    componentWillReceiveProps(props: INavBarProps) {
        if (props.isURLFocus && this.input) {
            this.input.focus()
        } else if (!props.isURLFocus && this.input) {
            this.input.blur()
        }
    }

    render() {
        return (
            <div className="app-nav">
                <span className="nav" onClick={() => this.props.backward()}>
                    <i className="fa fa-arrow-left" />
                </span>
                <span className="nav" onClick={() => this.props.forward()}>
                    <i className="fa fa-arrow-right" />
                </span>
                <span className="nav" onClick={() => this.props.reload()}>
                    <i className="fa fa-refresh" />
                </span>
                <div className="url ml-8">
                    <input
                        ref={(el) => this.input = el}
                        value={this.props.currentURL}
                        onKeyDown={this.handleKeyboard}
                        onChange={this.handleInput}
                        onFocus={() => this.props.focus()}
                        onBlur={() => this.props.blur()}
                    />
                </div>
            </div>
        )
    }

    isURLReady = (): boolean => {
        return this.props.currentURL !== ''
    }

    isEnter = (keyCode: number): boolean => {
        return keyCode === KEYCODE_ENTER
    }

    handleKeyboard = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (this.isEnter(event.keyCode) && this.isURLReady()) {
            this.props.navigate()
        }
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.updateURL(event.target.value)
        this.handleSearch(event)
    }

    // 实现函数节流
    handleSearch = throttle((event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.searchVisited(event.target.value)
    })
}