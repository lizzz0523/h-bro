import * as React from 'react'
import { ITabInfo } from '../types'
import { KEYCODE_ENTER } from '../keyCode'

interface INavBarProps {
    currentURL: string
    isURLFocus: boolean
    searchVisited: (query: string) => void
    updateURL: (url: string) => void
    focus: () => void
    blur: () => void
    reload: () => void
    forward: () => void
    backward: () => void
    navigate: () => void
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
                        onChange={(ev) => this.props.updateURL(ev.target.value)}
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
}