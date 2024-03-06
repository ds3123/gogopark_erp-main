
import { useState } from 'react' ;
import { useDispatch } from 'react-redux' ;
import { useHistory } from "react-router-dom" ;
import { submit_Service_Error  } from "store/actions/action_Error" ; 
import{ useLocation } from "react-router";
import { useQueryClient } from "react-query" ;
import axios from "utils/axios" ;
import { Toast } from 'templates/note/Toast';
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { get_Cookie_EmployeeName } from "fp/common/read/get_User" ;
import { delete_ServiceOrder } from "fp/services/delete/delete_ServiceOrder" ;


// # 銷單 --------


// 點選 _ 提交銷單
export const useEffect_Click_Delete_Service = ( data : any ) => {

    const dispatch    = useDispatch() ;
    const history     = useHistory() ;
    const current_Url = useLocation().pathname;     // 取得目前 url  例如 :  ~ /customers

    const queryClient = useQueryClient() ;
    
    // 點選 _ 刪除函式
    const click_Delete_Service = () => {

        delete_ServiceOrder( data )( queryClient , dispatch , history )( current_Url ) ;

    } ;

    return click_Delete_Service

} ;


// 點選 _ 提交銷單 ( 專為 "住宿" )
export const useEffect_Click_Delete_Lodge = ( data : any ) => {
    
    const queryClient = useQueryClient() ;
    const dispatch    = useDispatch() ;
    const history     = useHistory() ;

    const click_Delete_Lodge = () => {

        const lodge_Id = data?.id ;

        if( !lodge_Id ) return alert( "更新失敗" ) ;

        const obj = { is_delete : 1 , delete_submitter : get_Cookie_EmployeeName() } ;

        // 更新資料
        axios.put( `lodges/${ lodge_Id }` , obj ).then( res => {

            Toast( `住宿單已銷單 ( id : ${ lodge_Id } )` ) ;

            // 刪除快取
            queryClient.invalidateQueries() ;

            // 關掉右側面板
            dispatch( set_Side_Panel( false , null , {} ) ) ;

            // 恢復 _ 右側捲軸
            document.body.style.position = '' ;   
              
            // 前往相對應頁面
            history.push( "/wrongpath" );  // 錯誤路徑
            history.push( "/lodge" );      // 正確路徑


        }) ;
    
    } ;


    return click_Delete_Lodge

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