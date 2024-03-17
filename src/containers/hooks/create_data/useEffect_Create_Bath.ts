import { columns_Covert_Bath } from "hooks/crud/process/convert_Columns" ;
import { useCreate_Customer } from "hooks/react-query/customer/useCreateCustomer" ;
import { useCreate_Pet } from "hooks/react-query/pet/useCreatePet" ;
import { useCreate_Bath } from "hooks/react-query/service/useCreateBath" ;
import { useCheck_IsExisting_Customer , useCheck_IsExisting_Pet } from "hooks/data/useCheck" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { Toast } from 'templates/note/Toast' ;
import { useHistory } from "react-router-dom" ;
import { useDispatch } from "react-redux" ;
import { useCreate_Plan_Record } from "hooks/react-query/plan/useCreatePlan";
import { set_Side_Info } from "store/actions/action_Global_Layout" ;
import { useQueryClient } from "react-query" ;


// @ 新增 _ 洗澡單
export const useEffect_Create_Bath = () => { 

    const dispatch = useDispatch() ;
    const history  = useHistory() ;

    // # 新增函式
    const create_Customer_Fun = useCreate_Customer() ;    // 客戶 
    const create_Pet_Fun      = useCreate_Pet() ;         // 寵物
    const create_Bath_Fun     = useCreate_Bath() ;        // 洗澡單
    const create_Plan_Record  = useCreate_Plan_Record() ; // 使用方案紀錄


    // # 檢查 _ 客戶、寵物在資料 ( customer , pet ) 中，是否已經存在
    const check_Customer_Data = useCheck_IsExisting_Customer() ; // 客戶
    const check_Pet_Data      = useCheck_IsExisting_Pet() ;      // 寵物 


    const queryClient         = useQueryClient() ;

    // 執行 _ 新增函式
    const create_Bath = async( data : any , shop_Id? : string ) => {

        
        // 轉換為資料表欄位
        const obj_Arr      = columns_Covert_Bath( data ) ;
        const obj_Customer = obj_Arr[ 0 ] ; // 客戶
        const obj_Pet      = obj_Arr[ 1 ] ; // 寵物
        const obj_Bath     = obj_Arr[ 2 ] ; // 洗澡單

        
        // 檢查 _ 客戶是否存在
        await check_Customer_Data( data , shop_Id ).then( is_Customer_Existing => {

            // 若資料表 ( customer ) 中無該客戶，才新增
            if( !is_Customer_Existing ) create_Customer_Fun( obj_Customer ) ;
        
        } ) ;


        // 檢查 _ 寵物是否存在
        await check_Pet_Data( data , shop_Id ).then( is_Pet_Existing => {

            // 若資料表 ( pet ) 中無該寵物，才新增
            if( !is_Pet_Existing ) create_Pet_Fun( obj_Pet ) ;
            
        } ) ;


        // 延遲 50 ms 
        setTimeout( () => {

            // 新增 _ 洗澡單
            create_Bath_Fun( obj_Bath , {

                // 新增成功後
                onSuccess : ( res ) => {


                    //  # 如果付款方式是 "方案" --> 再新增 _ 方案 "使用紀錄" ( 資料表 : plan_used_records )
                    if( data['payment_Method'] === "方案" ){

                        // * 新增 _ 方案使用紀錄
                        const bath_Id = res.data ; // 新增洗澡單 id

                        const obj_Record = {

                            account_id    : data['account_id'] ,                                         // 所屬店家 id

                            plan_type     : data['current_Plan_Type'] ? data['current_Plan_Type'] : '' , // 方案類型 / 名稱
                            plan_id       : data['current_Plan_Id'] ? data['current_Plan_Id'] : ''  ,    // 本次美容，所使用的方案資料表( plans ) id
                            customer_id   : data['customer_Id'] ? data['customer_Id'] : '' ,             // 客戶身分證字號
                            pet_serial    : data['pet_Serial'] ? data['pet_Serial'] : '' ,               // 寵物編號
                            service_id    : bath_Id ? bath_Id : null ,                                   // 新增洗澡單後，回傳的該筆 _ 資料表 id
                            service_type  : data['current_Tab'] ,                                        // 服務類型 ( 洗澡 or 美容 )
                            service_note  : data['current_Plan_Note'] ,                                  // 目前選擇 _ 方案備註     Ex. 包月洗澡第 1 次
                            
                            /*

                                 # 目前選擇 _ 方案服務價錢 ( 基本價格 / 4  )

                                   * 目前應無作用 2023.10.21
                            
                            */ 
                            service_price : data['current_Plan_Used_Fee'] ? parseInt( data['current_Plan_Used_Fee'] ) : 0 
                        
                        } ;

                        create_Plan_Record( obj_Record ) ;

                    }else{

                        // 刪除快取
                        queryClient.invalidateQueries() ;

                        // 新增成功
                        Toast( "已新增 : 洗澡單" ) ;
                            
                        // 關掉右側面板
                        dispatch( set_Side_Panel( false , null , {} ) ) ;

                        // 關掉左側提示面板
                        dispatch( set_Side_Info( false ) ) ;  

                        // 前往相對應頁面
                        history.push( "/wrongpath" ) ;  // 錯誤路徑
                        history.push( "/services" ) ;   // 正確路徑

                    }  
                    
                }

            } ) ;  

         } , 50 )


    }
        
    return create_Bath

}