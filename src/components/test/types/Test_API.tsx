

import { useState , useEffect } from 'react';
import axios from 'utils/axios' ;

import { get_AllAccounts_By_Zipcode } from 'utils/api/api_Account'


// @ < 測試 >  _ API , Ajax 請求 

const Test_API = () => {



   useEffect( () => {
     

     get_AllAccounts_By_Zipcode( "242" ).then( res => {

         console.log( 'bbb' , res.data )

     } ) 
    
  
   } , [] ) ;


   return <> 測試 API </> 


} ;

export default Test_API
       