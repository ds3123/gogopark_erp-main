
import { useFetch_Shop_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ; 
import { useDispatch } from "react-redux" ;
import { useHistory } from "react-router-dom" ;
import { useQueryClient } from "react-query" ;
import { delete_ServiceOrder_By_PlanUsedRecord , undo_Delete_ServiceOrder_By_PlanUsedRecord }  from "fp/services/delete/delete_ServiceOrder" ;


// 設定 _ 加價項目字串
export const useEffect_Set_Extra_Items = () => {


     // 目前登入者，所屬店家 id
     const shop_Id = useAccount_Shop_Id() ;

     // 讀取 _ 特定商店，所有服務價格
     const all_Service_Prices = useFetch_Shop_Service_Prices( shop_Id )  ; 



    // 篩選出 _ 加價項目
    const filter_Extra_Items = ( extra_Item_Arr : any[] ) : string => {
    
        const arr = all_Service_Prices.filter(  x => extra_Item_Arr.includes( x['id'] ) ) ;
    
        if( arr.length > 0 ){
            const item_Arr = arr.map( x => x['service_name'] ) ;
            return item_Arr.join( ' , ' ) ; 
        } 

        return ''

    } ;


    // 取得 _ 加價項目字串
    const set_Extra_Items = ( record : any ) : string => {
       

        let extra_Item_Arr = null ;
        if( record?.service_type === '洗澡' ) extra_Item_Arr = record.bath?.extra_service?.split(',') ;
        if( record?.service_type === '美容' ) extra_Item_Arr = record.beauty?.extra_service?.split(',') ;

        if( extra_Item_Arr ){
            const _extra_Item_Arr = extra_Item_Arr.map( ( x : any ) => parseInt( x ) ) ; // 轉型為 Integer
            return filter_Extra_Items( _extra_Item_Arr )
        }

        return ''

    } ;


    return set_Extra_Items


} ;



// 點選 _ 使用紀錄 -> 銷單
export const useEffect_Click_Delete_Service = () => {

    const history     = useHistory() ;
    const dispatch    = useDispatch() ;
    const queryClient = useQueryClient() ;


    // 點選 _ 刪除函式
    const click_Delete_Service = ( record : any ) => {

        delete_ServiceOrder_By_PlanUsedRecord( record )( queryClient , dispatch , history ) ;
       
    } ;

    return click_Delete_Service

} ;



// 點選 _ 取消 : 銷單
export const useEffect_Click_Undo_Delete_Service = () => {

    const history     = useHistory() ;
    const dispatch    = useDispatch() ;
    const queryClient = useQueryClient() ;

    const click_Reset_Delete = async( record : any ) => {

        undo_Delete_ServiceOrder_By_PlanUsedRecord( record )( queryClient , dispatch , history ) ;

    } ;

    return click_Reset_Delete

} ;