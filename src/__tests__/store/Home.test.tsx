


import reducer_Test from 'store/reducers/reducer_Test' ;

import Home from 'components/counter/Home'

// Redux
import { createStore , combineReducers , applyMiddleware } from 'redux' ;
import { Provider } from 'react-redux' ;
import thunk from 'redux-thunk' ;

import '@testing-library/jest-dom/extend-expect';

import { render , screen , waitFor } from '@testing-library/react' ;



test( '元件渲染後，將會顯示從 API 取得的 user 資料' , async() => {

   // Arrange
   global.fetch = jest.fn().mockResolvedValue(
      { json: () => ({ user: 'Danny' }) }
    );
 
                                       
      const store = createStore(
                                 combineReducers( { Home : reducer_Test } ) ,
                                 applyMiddleware( thunk )
                               )    


   render(  <Provider store={ store } >  <Home/>   </Provider> )
   
   

   const out = await waitFor( () => screen.findByText( /Danny/ ) ) 


   expect( out ).toBeInTheDocument();

                  

 } )