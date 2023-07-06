
import axios from 'utils/axios' ;
import { Dispatch } from "redux" ;
import { action_Types } from './action_Success';

// 取得 _ 待猜測文字 ( 回傳 : Ajax 函式 )   
// export const get_SecreteWord = () => { 

//    return axios.get( "https://jsonplaceholder.typicode.com/users/1" ).then( res => res.data ) ;
    
// }


// 取得 _ 待猜測文字 ( 回傳 : Thunk /  )   
export const get_SecreteWord = () => { 

    return ( dispatch : Dispatch ) => {

                return axios.get( "https://jsonplaceholder.typicode.com/users/1" ).then( res => {

                            dispatch({
                                       type    : action_Types.SET_SECRET_WORD ,
                                       payload : "party"
                                     })

                    }) ;
     
           }

 }