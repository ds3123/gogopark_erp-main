/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */

import Check_Lodge_Button from "components/lodge/components/Check_Lodge_Button" ;
import { Today_Appointment } from "./Today_Appointment" ;
import { Today_Statistic } from "./Today_Statistic" ;
import { FC } from 'react' ;


type Statistics = {

  data : any ;

} ;



/* @ 今日預約、今日統計 */
const Statistics_Rows : FC< Statistics > = ( { data } ) => {

         
    return <>
               { /* 點選 _ 檢視住宿情形  */ }
               <b className = "absolute" style = {{ top : "200px" , right : "-11%" }}> <Check_Lodge_Button /> </b>

               <div className = "columns is-mobile  is-multiline relative" style = { { top : "80px" , left : "-5%" } } >

                  { /* 今日預約 */ }
                  <div className = "column is-12-desktop" >

                       <Today_Appointment data = { data } />                    
 
                  </div>

                  { /* 今日統計 */ }
                  <div className = "column is-12-desktop relative" style = {{ zIndex:1 } as any}>

                       <Today_Statistic data = { data } />

                  </div>

               </div>
          </>

} ;

export default Statistics_Rows ;