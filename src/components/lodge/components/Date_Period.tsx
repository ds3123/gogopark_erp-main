import { useState , useEffect } from "react" ;

// React Hook Form
import { useForm } from "react-hook-form" ;
import Date_Picker from "templates/form/Date_Picker" ;
import moment from "moment" ;


import { set_Lodge_Check_In_Date , set_Lodge_Check_Out_Date  } from "store/actions/action_Lodge" ;
import { useDispatch, useSelector } from "react-redux";



type date = {
   checkIn_Date  : any 
   checkOut_Date : any
}


// 日期 ( 住房、退房日期 )
const Date_Period = ( ) => {

    const dispatch = useDispatch() ;

    
    const { control , setValue } = useForm<date>({ mode : "all" }) ;     // React Hook Form

    // 住房日期
    const check_In_Date  = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ;   

    // 退房日期
    const check_Out_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_Out_Date ) ;  


    // 變更 : 住房日期
    const handle_CheckIn_Date = ( date : any ) => {

        const _date = moment( date ).format('YYYY-MM-DD') ; 
    
        // 住房日期、晚於退房日期 --> 將退房日期，設為 _ 住房日期
        if( _date > check_Out_Date ){
            dispatch( set_Lodge_Check_In_Date( _date ) ) ;
            setValue( 'checkOut_Date' , date ) ;  // Input
        } 

        // 設定 _ 住房日期 
        dispatch( set_Lodge_Check_In_Date( _date ) ) ;


    } ;


    // 變更 : 退房日期
    const handle_CheckOut_Date = ( date : any ) => {

        const _date = moment( date ).format('YYYY-MM-DD') ; 

        // 日期檢查
        if( _date < check_In_Date ){
            alert('退房日期，不能早於住房日期') ;
            // 設為今日
            dispatch( set_Lodge_Check_Out_Date( check_In_Date ) ) ;
            setValue( 'checkOut_Date' , new Date( check_In_Date ) ) ; 
            return false ;
        }

        // 設定 _ 退房日期 
        dispatch( set_Lodge_Check_Out_Date( _date ) ) ;

    } ;



    const date = { display : "block" , float : "left"  } as const ;

    return <>   

              <div style= { date }>

                <b> 住房日期 </b>   
                <Date_Picker control        = { control }
                            name            = "checkIn_Date"
                            default_Date    = { new Date }
                            handle_OnChange = { ( value : any ) => handle_CheckIn_Date( value ) }  />   

              </div>

              <div className="tag is-white relative" style={{ float:"left" , top:"30px" }}> ---- </div>

              <div style= { date }>

                <b> 退房日期 </b>   
                <Date_Picker control        = { control }
                            name            = "checkOut_Date"
                            default_Date    = { new Date }
                            handle_OnChange = { ( value : any ) => handle_CheckOut_Date( value ) }  />   
            
              </div>

           </> 

} ;


export default Date_Period
       