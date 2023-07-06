
import { columns_Covert_Service_Plans } from "hooks/crud/process/convert_Columns" ;
import { useCreate_Plan } from "hooks/react-query/plan/useCreatePlan" ;
import { useCreate_Customer } from "hooks/react-query/customer/useCreateCustomer" ;
import { useCheck_IsExisting_Customer } from "hooks/data/useCheck" ;



// @ 新增 _ 方案 ( 客戶購買方案 )
export const useEffect_Create_Plan = () => { 

 
    // # 新增函式
    const create_Customer_Fun  = useCreate_Customer() ; // 客戶
    const create_Plan_Fun      = useCreate_Plan() ;     // 方案單

    // # 檢查 _ 客戶在資料 ( customer ) 中，是否已經存在
    const check_Customer_Data  = useCheck_IsExisting_Customer( ) ; // 客戶
    

    // # 執行 _ 新增函式
    const create_Plan = async( data : any , shop_Id? : string ) => {


        // # 轉換欄位
        const obj_Arr      = columns_Covert_Service_Plans( data ) ;
        const obj_Customer = obj_Arr[ 0 ] ; // 客戶
        const obj_Plan     = obj_Arr[ 1 ] ; // 方案單


        // 檢查 _ 客戶是否存在
        await check_Customer_Data( data , shop_Id ).then( is_Customer_Existing => {

            // 若資料表 ( customer ) 中無該客戶，才新增
            if( !is_Customer_Existing ) create_Customer_Fun( obj_Customer ) ;
            
        } ) ;

       
        // 新增 _ 方案單
        create_Plan_Fun( obj_Plan ) ;  
     
    }
     
    return create_Plan


}