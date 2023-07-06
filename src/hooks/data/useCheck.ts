
import { fetch_Shop_Customers_Query_By_Column } from "utils/api/api_Customer" ;
import { fetch_Shop_Pet } from "utils/api/api_Pet" ;


// 檢查 _ 客戶在資料表 ( customer ) 中，是否已經存在
export const useCheck_IsExisting_Customer = () => {

    // 檢查 _ 客戶是否存在
    const check_Customer_Data = async( data : any , account_id? : string ) => {

        const cusId        =  data['customer_Id'] ;        // 身分證字號
        const cusCellphone =  data['customer_Cellphone'] ; // 手機號碼

        let reslut_Id    = [] ;
        let reslut_Phone = [] ;

        if( account_id && cusId )        reslut_Id    = await fetch_Shop_Customers_Query_By_Column( account_id , "id" , cusId ) ;
        if( account_id && cusCellphone ) reslut_Phone = await fetch_Shop_Customers_Query_By_Column( account_id , "mobile_phone" , cusCellphone ) ;
        
        return reslut_Id?.length > 0 || reslut_Phone?.length > 0 ;  // 回傳 Promise 解析結果 ( Boolean )

    } ;
      
    return check_Customer_Data 

} ;



// 檢查 _ 寵物在資料表 ( pet ) 中，是否已經存在
export const useCheck_IsExisting_Pet = () => {


    // 檢查 _ 寵物是否存在
    const check_Pet_Data = async( data : any , account_id? : string ,  ) => {

        const pet_Serial = data['pet_Serial'] ;  // 寵物序號

        let result_Serial = [] ;

        if( account_id && pet_Serial ) result_Serial = await fetch_Shop_Pet( account_id , pet_Serial ) ;

        return result_Serial?.length > 0    // 回傳 Promise 解析結果 ( Boolean )

    }

    return check_Pet_Data 

}

