import beerReducer from "./beerReducer"
import {createStore, combineReducers, applyMiddleware, compose, Action } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk"


let redusers = combineReducers({
  
    beerPage: beerReducer
})

type RedusersType = typeof redusers
export type AppStateType = ReturnType<RedusersType>


export type InferActionsTypes <T> = T extends {[keys: string]:( ... args:any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action=Action, R =Promise<void>> = ThunkAction <R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(redusers, composeEnhancers(  applyMiddleware(thunkMiddleware)))


//@ts-ignore
window.__store__ = store

export default store