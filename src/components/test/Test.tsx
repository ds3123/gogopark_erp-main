
import Test_API from './types/Test_API' ;
import { Udemy_Index } from './udemy/Udemy_Index' ;
import { Click_Count } from './udemy/click_count/Click_Count' ;
import { Jotto_App } from './udemy/jotto/Jotto_App' ;
import { useState , useEffect } from 'react' ;

import axios from 'utils/axios' ;


// @ < 測試專用頁面 >
const Test = () => {

   const [ data , set_Data ] = useState( "" ) ; 

   useEffect( () => {
     
       axios.get( "http://localhost:7777/Laravel_Projects/gogopark/public/index.php/api/basics" )
            .then( res => {

               const obj = res.data[ 0 ]  ; 
               set_Data( obj?.service_type ) ;

            }) ;

   } , [] ) ; 

   return <> 
              { data && <div data-testid="service_Type" >{ data }</div>  }
          </> 

} ;

export default Test
       