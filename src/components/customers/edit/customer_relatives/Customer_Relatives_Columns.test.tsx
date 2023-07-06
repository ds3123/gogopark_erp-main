/* eslint-disable jest/valid-title */
import { render }  from "@testing-library/react" ;
import '@testing-library/jest-dom/extend-expect';
import Customer_Relatives_Columns from "./Customer_Relatives_Columns"


// Redux
import { createStore , combineReducers , applyMiddleware } from 'redux' ;
import { Provider } from 'react-redux' ;
import thunk from 'redux-thunk' ;
import reducer_Customer from "store/reducers/reducer_Customer";
import reducer_Service from "store/reducers/reducer_Service";


// redux-mock-store
import configureMockStore from 'redux-mock-store'
const middlewares = [thunk]
const mockStore   = configureMockStore(middlewares)


// fetch-mock
// import fetchMock from 'fetch-mock';


describe( "測試 _ 關係人欄位區 : 資料提供、點擊行為" , () => { 


   test( "" , () => {

        const fakeProps = {
            current  : '洗澡' ,
            register : jest.fn() ,
            setValue : jest.fn()
        }

        const store = createStore(
                                   combineReducers( { 
                                                       Customer : reducer_Customer ,
                                                       Service  : reducer_Service 
                                                     } ) ,
                                   applyMiddleware( thunk )
                                 ) ;    


        render(  
                <Provider store={ store } >  
                    <Customer_Relatives_Columns { ...fakeProps }/>  
                </Provider> 
              ) ;



              

   }) ; 

}) ;




