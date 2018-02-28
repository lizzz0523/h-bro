import { Store, Dispatch, Action, AnyAction, Middleware } from 'redux'

interface IHashMap {
    [key: string]: any
}

function isArray(val: any): val is Array<any> {
    return Array.isArray(val)
}

function isPromise(val: any): val is Promise<any> {
    return val && typeof val.then === 'function'
}

function hasPromiseProps(obj: IHashMap) {
    return Object.keys(obj).some(key => isPromise(obj[key]))
}

function resolveProps(obj: IHashMap): Promise<IHashMap> {
    const props = Object.keys(obj)
    const values = props.map(prop => obj[prop])

    return Promise.all(values).then(resolved => {
        return props.reduce(
            (result, prop, index) => (result[prop] = resolved[index], result), {} as IHashMap
        )
    })
}

export const asyncMiddleware: Middleware = () => (dispatch: Dispatch) => (action: AnyAction) => {
    if (!isArray(action.type) || !hasPromiseProps(action)) {
        return dispatch(action)
    }

    const [PEDDING, RESOLVED, REJECTED] = action.type

    resolveProps(action).then(
        result => { dispatch({ ...result, type: RESOLVED }) },
        error => { dispatch({ error, type: REJECTED }) }
    )

    return dispatch({ type: PEDDING })
}