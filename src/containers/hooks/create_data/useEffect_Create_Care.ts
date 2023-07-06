
import { columns_Covert_Care } from "hooks/crud/process/convert_Columns" ;
import { useCreate_Customer } from "hooks/react-query/customer/useCreateCustomer" ;
import { useCreate_Pet } from "hooks/react-query/pet/useCreatePet" ;
import { useCreate_Care } from "hooks/react-query/service/uceCreateCare" ;

import { useCheck_IsExisting_Customer , useCheck_IsExisting_Pet } from "hooks/data/useCheck" ;



// @ 新增 _ 安親單
export const useEffect_Create_Care = () => { 


    // # 新增函式
    const create_Customer_Fun  = useCreate_Customer() ; // 客戶
    const create_Pet_Fun       = useCreate_Pet() ;      // 寵物
    const create_Care_Fun      = useCreate_Care() ;    // 安親單  

    // # 檢查 _ 客戶、寵物在資料 ( customer , pet ) 中，是否已經存在
    const check_Customer_Data  = useCheck_IsExisting_Customer( ) ; // 客戶
    const check_Pet_Data       = useCheck_IsExisting_Pet( ) ;      // 寵物 
   

    // # 執行 _ 新增函式
    const create_Care = async( data : any , shop_Id? : string ) => {

      // 轉換為資料表欄位
      const obj_Arr      = columns_Covert_Care( data ) ;
      const obj_Customer = obj_Arr[ 0 ] ; // 客戶
      const obj_Pet      = obj_Arr[ 1 ] ; // 寵物
      const obj_Care     = obj_Arr[ 2 ] ; // 安親單


     
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

         
    
      // 新增 _ 安親單
      create_Care_Fun( obj_Care ) ; 
 
    
    }
     
    return create_Care


}