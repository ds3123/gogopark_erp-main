

import { Dispatch } from "redux";


  export const fetchUser = () => async ( dispatch : Dispatch ) => {


    const response = await fetch('http://httpbin.org/get') ;
    const user     = await response.json() ;

    dispatch({

                type    : 'SET_USER' ,
                payload : { user } ,
  
             }) ;


  };



  

  // -----------------

  export const addCounter = () => ({

    type    : 'ADD_COUNTER' ,
    payload : { addQuantity: 1  }

  });


 
export const fetchCountRequest = () => ({

  type: 'FETCH_COUNT_REQUEST' 

});


export const fetchCountSuccess = ( body : any  ) => ({

  type: 'FETCH_COUNT_SUCCESS' ,
  count: body.count

});

export const fetchCount = () => (

  ( dispatch : Dispatch ) => {

          dispatch(fetchCountRequest());

          return fetch('http://example.com/count')
                  .then(res => res.json())
                  .then(body => dispatch(fetchCountSuccess(body)));

   }

);
