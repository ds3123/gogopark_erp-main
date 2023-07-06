

import '@testing-library/jest-dom/extend-expect' ;
import { render , screen , waitFor  }  from "@testing-library/react" ;
import thunk from 'redux-thunk' ;

import Axios , { AxiosPromise } from 'axios' ;
import { mocked } from "ts-jest/utils" ;


import { createUseRecord , toGet , fetchData  } from "store/actions/action_Log" ;
import configureStore from 'redux-mock-store' ; // for 測試 Redux Action


// 建立 _ 所要 mock 的 store ( 僅針對 action ，所以隔絕 reducer, store 的影響 )
const middlewares : any[] = [ thunk ] ;
const mockStore = configureStore( middlewares ) ;

// 待測試的 action ( You would import the action from your codebase in a real scenario )
const addTodo = () => ({ type : 'ADD_TODO' }) ; 



// 包住要隔離的東西，並且能夠得到 mock 物件的屬性
const mockedAxios = mocked( Axios , true )  ;



// 製作 action_Log 的替身 
jest.mock( "store/actions/action_Log" , () => {

     return {

               __esModule      : true ,                  // ES 6    
               
               createUseRecord : jest.fn( () => 16 ) ,

               fetchData       : jest.fn().mockResolvedValue( {   json : ( ) => (  { count : 5 }  )  }  ) ,

               toGet           : jest.fn().mockImplementation(  () => Promise.resolve( { data : 123 }  ) as AxiosPromise  )
              
            }

}) ;  

jest.mock( 'axios' ) ;  // This overwrites axios methods with jest Mock


beforeEach( () => {


   const res_1 = createUseRecord( "12" , "新增" , "洗澡單" , "2022.08.04" ) ; 
   // console.log( "createUseRecord 回傳值 : " , res_1 ) ;


   const res_2 = fetchData() ;
   // console.log( "fetchData 回傳值 : " , res_2 ) ;


   const res_3 = toGet() ;
   // console.log( "toGet 回傳值 : " , res_3 ) ;



   // * 回傳 : 特定值 --> mockResolvedValue()

   const obj = { name : 'Danny' }

   // const mockFunc_2 = jest.fn().mockResolvedValue(  {   json : ( ) => ( { count : 5 } )  } ) ; 
   // Axios.get.mockResolvedValue( obj ) 
   // console.log( "444 ---> " , mockFunc_2() ) ;
   // expect( mockFunc_2() ).toHaveBeenCalled( )

} ) ;


it( '是否 dispatch 某特定 action' , () => {

    // Initialize mockstore with empty state
    const initialState = {}
    const store        = mockStore( initialState )
  
    // Dispatch the action
    store.dispatch( addTodo() ) ;  // dispatch 所要測試的 action

    // # 測試 _ store 是否含有所期待已 dispatch 的 action ( { type : 'ADD_TODO' } )
    const actions         = store.getActions() ;     // 取得 store 中所有 actions
    const expectedPayload = { type : 'ADD_TODO' } ; 

    expect( actions ).toEqual( [ expectedPayload ] ) ;

} )










// describe('with success', () => {

//     const url        = 'http://test-url.com';
//     const onComplete = jest.fn();
//     const data       = {};

//     beforeEach(() => {
        
//         //axios.get.mockResolvedValue(data);
//         Axios.post = jest.fn().mockResolvedValue( data )

//     });


//     it( 'should call axios get with given url' , () => {

//         getResource( url , onComplete ) ;
//         createUseRecord( "12" , "新增" , "洗澡單" , "2022.08.04" ) ;
//         expect( axios.post ).toHaveBeenCalledTimes( 0 ) ;

//     });


//     it('should call onComplete callback with response', async () => { // do not forget 'async'

//         await getResource( url , onComplete ) ;      // notice the 'await' because onComplete callback is called in '.then'
//         expect( onComplete ).toBeCalledWith( data ) ;

//     }) ;


// }) ;





// test( '初始以非同步 ( Ajax ) 取得資料，顯示於 : Name is ' , async() => {

//     global.fetch = jest.fn( ).mockResolvedValue(  { json : () => ( { name : "DDDD" } )  }    ) 

//     render( <APIComponent /> ) ;

//     const out = await waitFor( () => screen.getByRole( "term" ) ) ;

//     expect( out ).toHaveTextContent( "Name is DDDD" ) ;

// })



