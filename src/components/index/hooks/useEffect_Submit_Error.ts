
import { useState } from 'react' ;
import { useDispatch } from 'react-redux' ;
import { useHistory } from "react-router-dom" ;
import { submit_Service_Error , submit_Delete_Service } from "store/actions/action_Error" ; 
import{ useLocation } from "react-router";
import { useQueryClient } from "react-query" ;



// # 銷單 --------


// 點選 _ 提交銷單
export const useEffect_Click_Delete_Service = ( data : any , current_User_Name : string ) => {

    const dispatch    = useDispatch() ;
    const history     = useHistory() ;
    const current_Url = useLocation().pathname;     // 取得目前 url  例如 :  ~ /customers

    const queryClient = useQueryClient() ;
    
    // 點選 _ 事件
    const click_Delete_Service = () => {

       dispatch( submit_Delete_Service( data ,  current_User_Name , history , current_Url , queryClient ) ) ;
     
    } ;


    return click_Delete_Service

} ;





// # 異常 --------

// 點選 _ 轉異常
export const useEffect_Click_Is_Error = () => {

    // 是否點選 : 轉異常
    const [ is_Error , set_Is_Error ] = useState( false ) ;  

    // 點選事件
    const click_Is_Error = () => set_Is_Error( !is_Error ) ;


    return { is_Error , click_Is_Error }

} ;


// 點選 _ 提交異常
export const useEffect_Click_Submit_Error = ( data : any , current_User_Name : string ) => {

     const dispatch    = useDispatch();
     const history     = useHistory() ;
     const queryClient = useQueryClient() ;

     // 異常原因
     const [ error_Cause , set_Error_Cause ] = useState( '' ) ;  


     // 點選事件
     const click_Submit_Error = () => {

        if( !error_Cause ){ alert( "請輸入 : 異常原因" ) ; return false ; }

        // 提交錯誤 
        dispatch( submit_Service_Error( data , 
                                        error_Cause , 
                                        current_User_Name , 
                                        history ,
                                        queryClient 
                                       ) ) ;

     
     } ;   

     return { error_Cause , set_Error_Cause , click_Submit_Error } 

} ;