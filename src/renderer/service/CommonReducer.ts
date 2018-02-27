export interface IAction {
    type: string
}

export interface IReduce<S, A> {
    (state: S, action: A): S
}

export class CommonReducer<S, A extends IAction> {
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