/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jest/valid-title */

import { render , screen } from "@testing-library/react" ;
import { useHistory } from "react-router-dom" ;

import Submit_Error from "./Submit_Error" ;

import axios from 'axios';

// Rddux
import { storeFactory } from "store/tool";
import { Provider } from "react-redux" ;
import reducer_Service from "store/reducers/reducer_Service";


import { submit_Service_Error , submit_Delete_Service } from "store/actions/action_Error" ;


// # React-Query
import { QueryClient , QueryClientProvider } from 'react-query' ;



describe( "" , () => { 

   // # React-Query Client
   const queryClient = new QueryClient() ;


   let store : any ;

    //  相關 ruducer
    const reducers_Obj = { 
                            Service : reducer_Service ,
                         } ;   

    // 建立 store、渲染 <Second_Nav_Options />                         
    beforeEach( () => {

        store = storeFactory( reducers_Obj ) ;

    }) ;   


    test( "" , () => {
    
    
    }) ;


    // 再確認 以下測試是否有用 ? 2023.01.04


   // test( "" , async() => {


   //     render( 
   //             <Provider store = { store } >  

   //                <QueryClientProvider client = { queryClient } >

   //                   <Submit_Error current_User_Name = "測試帳號" data = { {} }  />  

   //                </QueryClientProvider>

   //             </Provider>  
   //           ) ;

        
   //      const mock_Service_Data       = {
   //                                         service_type   : "洗澡" ,   
   //                                         bath_id        : "114" ,
   //                                         payment_method : "方案" ,
   //                                         plan           : {
   //                                                            id : "115"
   //                                                          }
   //                                       } ;   
   //      const history                 = null ;
   //      const mock_Update_Service     = jest.fn( () => axios.get( "" ) ) ; 
   //      const mock_Update_Plan_Record = jest.fn( () => axios.get( "" ) );     


   //      await store.dispatch( submit_Delete_Service( mock_Service_Data , 
   //                                                    "測試帳號"  , 
   //                                                     history 
   //                                                  )  
   //                    )


   //      expect( mock_Update_Service ).toHaveBeenCalledTimes( 1 ) ;        
   //      expect( mock_Update_Plan_Record ).toHaveBeenCalledTimes( 1 ) ;        


   // }) ; 

}) ;



