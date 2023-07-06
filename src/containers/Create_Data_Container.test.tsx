/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jest/valid-title */
import { render , screen , waitFor } from "@testing-library/react" ;


// Rddux
import { storeFactory } from "store/tool" ;
import { Provider } from "react-redux" ;

import reducer_Service from "store/reducers/reducer_Service" ;
import reducer_Pet from "store/reducers/reducer_Pet" ;
import reducer_Global_Layout from "store/reducers/reducer_Global_Layout" ;
import reducer_Plan from "store/reducers/reducer_Plan" ;
import reducer_Basic from "store/reducers/reducer_Basic" ;
import reducer_Care from "store/reducers/reducer_Care" ;
import reducer_Info from "store/reducers/reducer_Info" ;
import reducer_Lodge from "store/reducers/reducer_Lodge" ;
import reducer_Form_Validator from "store/reducers/reducer_Form_Validator" ;
 
import reducer_Customer from "store/reducers/reducer_Customer" ;
import reducer_Extra_Service_Fee from "store/reducers/reducer_Extra_Service_Fee" ;
import Create_Data_Container from "./Create_Data_Container" ;

import { set_Current_Create_Tab } from "store/actions/action_Service" ;


describe( "" , () => { 

   let store : any ;
  
   // 相關 ruducer
   const reducers_Obj = { 
                           Service   : reducer_Service ,
                           Pet       : reducer_Pet ,
                           Layout    : reducer_Global_Layout ,
                           Plan      : reducer_Plan ,
                           Basic     : reducer_Basic ,
                           Care      : reducer_Care ,
                           Lodge     : reducer_Lodge , 
                           Info      : reducer_Info ,
                           Customer  : reducer_Customer ,
                           Extra_Fee : reducer_Extra_Service_Fee ,
                           Form      : reducer_Form_Validator
                         } ;  
                         
   
    // 建立 store、渲染 <Second_Nav_Options />                         
    beforeEach( () => {

       store = storeFactory( reducers_Obj , { } ) ;

    }) ;   


    test( "" , () => {

      // render( <Provider store = { store } > 
      //               <Create_Data_Container /> 
      //          </Provider> ) ;


      /*
         
         # 尚未完成 10.07
           涉及太多層元件，若 dispatch 會有非同步問題
      
      */

      // store.dispatch( set_Current_Create_Tab( "洗澡" ) )


      // const states = store.getState();

     
   

      
     

        


    }) ; 

}) ;



