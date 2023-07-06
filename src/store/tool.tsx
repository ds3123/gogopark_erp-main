

// Redux
import { createStore , applyMiddleware , combineReducers } from "redux" ;
import thunk from 'redux-thunk' ;


// 建立 _ Redux Store ( 回傳 : store )
export const storeFactory = ( reducer_Obj : any = {} , initialState : any = {} ) => {

        const rootReducer = combineReducers( reducer_Obj ) ;

        return createStore( rootReducer , initialState ,  applyMiddleware( thunk ) ) ;
    
 } ;





