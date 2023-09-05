

import { useState } from 'react' ;
import moment from "moment" ;
import cookie from "react-cookies" ;
import { useHistory } from "react-router-dom" ;
import { Toast } from 'templates/note/Toast' ;




// 輸入 _ 起始、結束日期
export const useEffect_CheckIn_CheckOut = ( setValue : any ) => {


    const [ check_In  , set_Check_In ]  = useState( moment( new Date() ).format( 'YYYY-MM-DD' ) ) ;
    const [ check_Out , set_Check_OUt ] = useState( moment( new Date() ).format( 'YYYY-MM-DD' ) ) ;


    // 變更 : 住房日期
    const handle_CheckIn_Date = ( date : any ) => {

        const _date = moment( date ).format( 'YYYY-MM-DD' ) ; 
        const today = moment( new Date() ).format( 'YYYY-MM-DD' ) ;  // 今日

        // 所選擇日期( 轉換格式 )
        if( _date < today ){
            alert( '起始日期，不能早於今日' ) ;
            setValue( 'start_date' , new Date() ) ; // 設回今天
            return false ;
        }

        // 起始日期晚於結束日期 --> 將結束日期，設為 _ 起始日期
        if( _date > check_Out ){
            set_Check_OUt( _date ) ;                
            setValue( 'end_date' , date ) ;   
        } 

        // 設定 _ 起始日期
        set_Check_In( _date ) ;

    } ;


    // 變更 : 退房日期
    const handle_CheckOut_Date = ( date : any ) => {

        const _date = moment( date ).format('YYYY-MM-DD' ) ; 

        // 設定 _ 退房日期 
        set_Check_OUt( _date ) ;

    } ;


    return { check_In , check_Out , handle_CheckIn_Date , handle_CheckOut_Date }


} ;


// 編輯 ( 新增、刪除 ) 後，重導向
export const useEffect_Edit_Redirect = ( toastMsg : string ) => {

    const history  = useHistory() ;

    const redirect = () => {

        // 新增成功
        Toast( toastMsg ) ;

        // 設定 cookie ( for 前往 : 系統設定 > 熱門時段  / 5 秒後銷毀 )
        cookie.save( 'after_Created_Redirect' , '系統設定_熱門時段' , { path : '/' , maxAge : 5 } ) ;

        history.push( "/wrongpath" );  // 錯誤路徑
        history.push( "/management" ); // 正確路徑

    
    } ;

    return redirect

} ;