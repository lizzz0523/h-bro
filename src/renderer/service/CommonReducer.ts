import { Action, AnyAction } from 'redux'

export interface IReduce<S, A extends Action = AnyAction> {
    (state: S, action: A): S
}

export class CommonReducer<S, A extends Action = AnyAction> {
    private actions: { [type: string]: IReduce<S, A> } = {}
    private initState: S

    constructor(initState: S) {
        this.initState = initState
    }

    bind(type: string, reduce: IReduce<S, A>): void {
        this.actions[type] = reduce
    }

    dispatch = (state: S | undefined, action: A): S => {
        state = state || this.initState

        if (action.type in this.actions) {
            return  this.actions[action.type](state, action)
        }

        return state
    }
}