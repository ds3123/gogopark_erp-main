/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jest/valid-title */

import { render , screen } from "@testing-library/react" ;

// Rddux
import { storeFactory } from "store/tool" ;
import { Provider } from "react-redux" ;
import reducer_Plan from "store/reducers/reducer_Plan" ;
import reducer_Service from "store/reducers/reducer_Service" ;
import Apply_Plan_Options from "./Apply_Plan_Options" ;




describe( "特定寵物，所購買、可供選用的方案" , () => { 

    let store : any ;

    // 相關 ruducer
    const reducers_Obj = { 
                            Plan    : reducer_Plan ,
                            Service : reducer_Service
                         } ;   

    // 建立 store、渲染 <Second_Nav_Options />                         
    beforeEach( () => {

         store = storeFactory( reducers_Obj ) ;

    }) ;   

   test( "初始渲染 ：當寵物有 4 個方案時，畫面中會出現 4 個標籤選項" , () => {

       const mock_Pet_Plans : any[] = [ {} , {} , {} , {} ] ;

       render( 
                <Provider store = { store } > 
                    <Apply_Plan_Options  current_Tap = "洗澡"  pet_All_Plans = { mock_Pet_Plans } /> 
                </Provider>
             ) ;


       const plan_Options = screen.queryAllByTestId( "plan-option-row" ) ;

       expect( plan_Options ).toHaveLength( 4 ) ;

   }) ; 

}) ;





