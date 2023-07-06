
import { render , waitFor } from "@testing-library/react" ;
import { reducer_Success } from "./reducers/reducer_Success" ;

// Redux
import { createStore , combineReducers , applyMiddleware } from 'redux' ;
import { Provider } from 'react-redux' ;
import thunk from 'redux-thunk' ;

import { storeFactory } from "./jotto/utils/tool";




import { Input } from "./Input" ;
import { mount } from "enzyme";


const setup = ( initialState : any = {} , secreteWord : string ) => {

  // # React Testing Library  
  // const store = createStore(
  //                            combineReducers( { Success : reducer_Success } ) , // root_Reducer
  //                            applyMiddleware( thunk )
  //                          ) ;

  // return render(  
  //                <Provider store = { store } >  
  //                   <Input secreteWord = { secreteWord } />   
  //                </Provider> 
  //              ) ;


  // # Enzyme
  const store = storeFactory( initialState ) ;
  
  return mount( 
                <Provider store = { store } >  
                   <Input secreteWord = { secreteWord } />   
                </Provider> 
              ) 
              
}
 

describe( "" , () => { 

    test( "" , () => {
  
        // const { getByRole } = setup( "party" ) ;


    }) ;



}) ;



