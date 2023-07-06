/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */

import { columns_Covert_Customer } from "hooks/crud/process/convert_Columns" ;
import { useCreate_Customer } from "hooks/react-query/customer/useCreateCustomer" ;
import { useCheck_IsExisting_Customer } from "hooks/data/useCheck" ;




// @ 新增 _ 客戶
export const useEffect_Create_Customer = () => {

    
    // # 新增函式
    const create_Customer_Fun = useCreate_Customer();

    // # 檢查 _ 客戶在資料表 ( customer ) 中，是否已經存在
    const check_Customer_Data = useCheck_IsExisting_Customer() ;


    // # 執行 _ 新增函式
    const create_Customer = ( data : any , shop_Id? : string ) => {

        
        // 轉換為資料表欄位
        const obj_Customer = columns_Covert_Customer( data ) ; 

        // 檢查 _ 客戶是否存在
        check_Customer_Data( data , shop_Id ).then( is_Customer_Existing => {

                // 若資料表 ( customer ) 中無該客戶，才新增
                if( !is_Customer_Existing ){
                    create_Customer_Fun( obj_Customer ) ;
                }else{
                    alert('資料庫已有該客戶資料') ;
                }

        } ) ;

    
    }  ;


    return create_Customer

} ;


