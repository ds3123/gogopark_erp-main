/* eslint-disable react/jsx-pascal-case */

import { FC } from 'react' ;
import Date_Input_Nav from './components/Date_Input_Nav' ;
import Date_Tags from './components/Date_Tags' ;
import { useFetch_Shop_All_Holidays } from "hooks/react-query/lodge/useFetchHoliday" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { delete_Holiday_RowDates } from "utils/api/api_Lodge" ; 
import { useEffect_Edit_Redirect } from "./hooks/useEffect_Holidays_List"


// 熱門時段 / 國定假日
const Holidays_List : FC = () => {


    // 目前登入者所屬店家 id
    const shop_Id = useAccount_Shop_Id() ;


    // 特定店家，所有熱門時段
    const shopAllHolidays = useFetch_Shop_All_Holidays( shop_Id ) ;

    // 重導向
    const redirect = useEffect_Edit_Redirect( "已刪除 : 此時段所有日期" ) ;


    // 點選 _ 刪除特定時段，所有日期
    const click_Delete_Row = async( shop_Id : string , title : string ) => {
    
        await delete_Holiday_RowDates( shop_Id , title ) ;

        redirect() ;
    
    } ;


    return <>

              <Date_Input_Nav />

              <hr/>
              
              {
                 shopAllHolidays.map( ( item : any , index : number ) => {


                      return <div key = { index } className = "columns is-multiline is-mobile m_Top_30 m_Bottom_50" >

                                 <div className = "column is-3-desktop relative" >

                                     <b className = "delete relative m_Right_15" 
                                        style     = {{ top : "7px" , background : "rgba(200,0,0,.7)" }} onClick = { () => { 

                                                       if( window.confirm( `確認要刪除此時段所有日期?` ) )  click_Delete_Row( shop_Id , item.title ) ;

                                                    }} ></b>

                                      <b className = "tag is-white f_13 fDblue"> { item.title } </b>

                                      <span className = "f_10" > ( { item.date.length } 天 ) </span> 

                                 </div>

                                 <div className = "column is-9-desktop relative" >

                                      { <Date_Tags date = { item.date } /> }

                                 </div>

                             </div>   


                  } )

              }

           </>
    
    

} ;


export default Holidays_List
       