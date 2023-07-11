

import { useHistory } from "react-router-dom" ;
import { useQueryClient } from "react-query" ;
import { useDispatch } from "react-redux";

import { undo_Delete_ServiceOrder } from "fp/services/delete/delete_ServiceOrder" ;



// 點選 _ 回復 : 銷單
export const useEffect_Click_Undo_ServiceOrder_Delete = () => {


    const history     = useHistory() ;
    const dispatch    = useDispatch() ;
    const queryClient = useQueryClient() ;


    // 點選 _ 刪除函式
    const click_Undo_ServiceOrder_Delete = ( data : any ) => {

        
        undo_Delete_ServiceOrder( data )( queryClient , dispatch , history )( "/services" ) ;

       
    } ;

    return click_Undo_ServiceOrder_Delete

    
} ;