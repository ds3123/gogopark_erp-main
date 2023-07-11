
import { set_Side_Panel , set_Side_Extra_Fee } from "store/actions/action_Global_Layout" ; 
import { compose } from "fp/tool" ;

import { Toast } from 'templates/note/Toast' ;


/*

   # 作業執行完成後，callback 動作

*/




// 關閉 _ 右側 : 滑動面板
export const close_Right_Panel = ( dispatch : any ) => () => dispatch( set_Side_Panel( false , null , {} ) ) ;


// 關閉 _ 左側 : 加價面板
export const close_Left_ExtraFee_Panel = ( dispatch : any ) => () => dispatch( set_Side_Extra_Fee( false , null ) ) ;



// 編輯完成， Toast 通知、關閉面板
export const is_Edit_Done = ( dispatch : any , msg : string ) => {

      compose( 
               Toast ,
               close_Right_Panel( dispatch ) ,
               close_Left_ExtraFee_Panel( dispatch ) ,
              )( msg ) ;

} ;



// 重導向 
export const redirect_To = ( history : any , url : string ) => {

    history.push( "/wrongpath" ) ;
    history.push( url ) ;

} 




// 檢查 _ 非同步傳回結果是否有誤 ( 有 : alert() / 無 : 回傳 true )
export const check_Error = ( result : boolean , msg : string ) => {
       
    if( !result ){
        alert( `${ msg }` ) ;  
        return () => false ;
    }

   return ( pre : boolean ) => {

        if( typeof pre === "boolean" ) return pre

        return true  ;

   }

} ;


// 編輯作業完成後，後續動作
export const done_Callback = ( queryClient : any , dispatch : any , history : any ) => ( url : string ) => ( reslut : boolean ) => {

    if( reslut ){

        queryClient.invalidateQueries() ; 

        is_Edit_Done( dispatch , "作業完成" ) ;
        redirect_To( history , url ) ;  

    }

} ;








