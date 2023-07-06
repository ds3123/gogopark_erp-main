
import { useFetch_Shop_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ; 
import { useAcchout_Shop_User } from "hooks/data/useAccount" ;
import { update_Plan_Record_By_Id } from "utils/api/api_Plan" ;
import { update_Service_By_Service_Url_Id } from "utils/api/api_Service" ;
import { Toast } from 'templates/note/Toast' ;
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { useHistory } from "react-router-dom" ;
import cookie from 'react-cookies';
import { useQueryClient } from "react-query" ;


// 設定 _ 加價項目字串
export const useEffect_Set_Extra_Items = () => {


     // 目前登入者，所屬店家 id
     const shop_Id = useAccount_Shop_Id() ;

     // 讀取 _ 特定商店，所有服務價格
     const all_Service_Prices = useFetch_Shop_Service_Prices( shop_Id )  ; 



    // 篩選出 _ 加價項目
    const filter_Extra_Items = ( extra_Item_Arr : any[] ) : string => {
    
        const arr = all_Service_Prices.filter(  x  => extra_Item_Arr.includes( x['id'] ) );
    
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


// 設定 _ 該服務紀錄：到店日期
export const useEffect_Set_Service_Date = () => {


    const set_Service_Date = ( record : any ) : string => {
    
        let service_Date = null ;

        if( record?.service_type === '洗澡' ) service_Date = record.bath?.service_date ;
        if( record?.service_type === '美容' ) service_Date = record.beauty?.service_date ;
    
        return service_Date

    } ;


    return set_Service_Date


} ;


// 點選 _ 使用紀錄 -> 銷單
export const useEffect_Click_Delete_Service = () => {

    const history     = useHistory() ;
    const dispatch    = useDispatch() ;

    // 目前登入者資訊  
    const unserInfo   = useAcchout_Shop_User() ;

    const queryClient = useQueryClient() ;


    const click_Delete_Service = async( record : any ) => {
    
        // 刪除快取
        queryClient.invalidateQueries() ;

        const type : "洗澡" | "美容" = record.service_type ;
        
        // API 路徑
        const service_Api  = type === "洗澡" ? "/bathes" : "/beauties" ; 
        
        // 服務單 id
        const service_Id   = type === "洗澡" ? record?.bath?.bath_id : record?.beauty?.beauty_id ;
        
        // 目前登入者用者
        const current_User = unserInfo[ "employee_name" ] ? unserInfo[ "employee_name" ] : unserInfo[ "account" ] ;

        // 此方案使用紀錄 id
        const record_Id    = record?.id ;



        if( service_Api && service_Id && record_Id ){


            // 更新 _ 物件 
            const obj = {
                          is_delete        : 1 ,  // 銷單
                          delete_submitter : current_User ? current_User : '測試員'
                        } ;


            await update_Service_By_Service_Url_Id( service_Api , service_Id , obj ) ;

                                   
            Toast( "此服務已銷單" ) ;

            // 更新 _ 使用方案的服務紀錄
            await update_Plan_Record_By_Id( record_Id , obj ) ;      

            Toast( "已更新方案使用紀錄" ) ;


            // 設定 cookie ( for 前往 : 洗美 > 方案 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Plan' , '洗美_方案' , { path : '/' , maxAge : 5 } ) ;


            // 關掉右側面板
            dispatch( set_Side_Panel( false , null , {} ) ) ;

            
            history.push("/wrongpath");  // 錯誤路徑
            history.push("/services");   // 正確路徑

          

        }else{

           alert( "銷單失敗" ) ;

        }             


    } ;

    return click_Delete_Service

} ;

// 點選 _ 取消 : 銷單
export const useEffect_Click_Reset_Delete = () => {


    const history     = useHistory() ;
    const dispatch    = useDispatch() ;

    // 目前登入者資訊  
    const unserInfo   = useAcchout_Shop_User() ;


    const queryClient = useQueryClient() ;
    
    const click_Reset_Delete = async( record : any ) => {


        // 刪除快取
        queryClient.invalidateQueries() ;
    

        const type : "洗澡" | "美容" = record.service_type ;
        
        // API 路徑
        const service_Api  = type === "洗澡" ? "/bathes" : "/beauties" ; 
        
        // 服務單 id
        const service_Id   = type === "洗澡" ? record?.bath?.bath_id : record?.beauty?.beauty_id ;
        
        // 目前登入者用者
        const current_User = unserInfo[ "employee_name" ] ? unserInfo[ "employee_name" ] : unserInfo[ "account" ] ;

        // 此方案使用紀錄 id
        const record_Id    = record?.id ;



        if( service_Api && service_Id && record_Id ){


            // 更新 _ 物件 
            const obj = {
                          is_delete        : 0 ,  // 取消 _ 銷單
                          delete_submitter : current_User ? current_User : '測試員'
                        } ;

        
            await update_Service_By_Service_Url_Id( service_Api , service_Id , obj ) ;

                       
            Toast( "此服務已復原銷單" ) ;

            // 更新 _ 使用方案的服務紀錄
            await update_Plan_Record_By_Id( record_Id , obj ) ;      

            Toast( "已更新方案使用紀錄" ) ;


            // 關掉右側面板
            dispatch( set_Side_Panel( false , null , {} ) ) ;

        
            // 設定 cookie ( for 前往 : 洗美 > 方案 / 3 秒後銷毀 )
            cookie.save( 'after_Created_Plan' , '洗美_方案' , { path : '/' , maxAge : 3 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/services");   // 正確路徑

        
        
        }else{

           alert( "銷單失敗" ) ;

        }             


    } ;

    return click_Reset_Delete



} ;