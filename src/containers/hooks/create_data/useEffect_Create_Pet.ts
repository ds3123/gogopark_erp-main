
import { columns_Covert_Customer ,
         columns_Covert_Pet 
       } from "hooks/crud/process/convert_Columns" ;
import { useCreate_Customer } from "hooks/react-query/customer/useCreateCustomer" ;
import { useCreate_Pet } from "hooks/react-query/pet/useCreatePet" ;
import { useCheck_IsExisting_Customer , useCheck_IsExisting_Pet } from "hooks/data/useCheck" ;



// @ 新增 _ 寵物
export const useEffect_Create_Pet = () => {

   
    // # 新增函式
    const create_Customer_Fun = useCreate_Customer() ;
    const create_Pet_Fun      = useCreate_Pet() ;


    // # 檢查 _ 客戶、寵物在資料 ( customer , pet ) 中，是否已經存在
    const check_Customer_Data = useCheck_IsExisting_Customer() ; // 客戶
    const check_Pet_Data      = useCheck_IsExisting_Pet() ;      // 寵物  
 

    // # 執行 _ 新增函式
    const create_Pet = async( data : any , shop_Id? : string ) => {

        // 轉換為資料表欄位
        const obj_Customer = columns_Covert_Customer( data ) ;
        const obj_Pet      = columns_Covert_Pet( data ) ; 


        // 檢查 _ 客戶是否存在
        await check_Customer_Data( data , shop_Id ).then( is_Customer_Existing => {

            // 若資料表 ( customer ) 中無該客戶，才新增
            if( !is_Customer_Existing ) create_Customer_Fun( obj_Customer ) ;
            
        } ) ;
       


        // 檢查 _ 寵物是否存在
        check_Pet_Data( data , shop_Id ).then( is_Pet_Existing => {

            // 若資料表 ( pet ) 中無該寵物，才新增
            if( !is_Pet_Existing ){
                create_Pet_Fun( obj_Pet ) ;
            }else{
                alert('資料庫已有該寵物資料') ;
            }

        } ) ;


       
      


    }
    
    return create_Pet

} ;


