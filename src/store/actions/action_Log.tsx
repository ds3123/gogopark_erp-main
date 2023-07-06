

import { Dispatch } from "redux" ;
import axios from "utils/axios" ;


// 新增 _ 員工使用紀錄
export const createUseRecord = (  userId : string , actionType : string , actionDescription : string , time : string ) => {

           
    return ( dispatch : Dispatch ) => {

                axios.get( `http://localhost` ).then( res => {

                    dispatch({
                                type     : "GET_CURRENT_CUSTOMER_PETS" ,
                                cus_Pets : res.data
                             })

                });

           } ;

    
} ;


export const toGet = ( ) => {


    return ( dispatch : Dispatch ) => {


                dispatch({
                            type : "SET_NAME" ,
                            name : "Danny"
                         })


            }

   
} ;

export const fetchData = () => {

    return ( dispatch : Dispatch ) => {
      
        // Some async action with promise  
        return fetch( '/users.json' ).then( () => dispatch( { type: 'FETCH_DATA_SUCCESS' } ) ) 

     } ;

} ;


export const getData_fetch = () => {

    return async( ) => {


                // 欲排除 mock  的 fecth() 非同步區塊
                const response  = await fetch(  'https://url/count'  )  ;
                const { count } = await response.json( )  ;

                // 欲測試區塊
                const res = count + 1 ;

                return res


           }

}



export const getData_axios = () => {

    return ( ) => {

                axios.get( 'http://local.url' ).then( res => {
    
                    const data = res.data ;






                    return data

    
                })


                


           }



}


// -----------------------------------------------------




export const addCounter = () => ({
    type: 'ADD_COUNTER',
    payload: { addQuantity: 1, },
});


const fetchCountRequest = () => ({
    type: 'FETCH_COUNT_REQUEST' ,
});


const fetchCountSuccess = ( body : any ) => ({

    type   : 'FETCH_COUNT_SUCCESS',
    count : body.count ,

});
  

export const fetchCount = () => ( ( dispatch : Dispatch ) => {

     dispatch( fetchCountRequest() ) ;
    
     axios.get('http://example.com/count')
          .then( res => res.data )
          .then( body => dispatch( fetchCountSuccess( body ) ) ) ;

  });



// -----------------------------------------------------



export const fetchUser = () => axios.get( 'https://jsonplaceholder.typicode.com/users/1' ) ; 







