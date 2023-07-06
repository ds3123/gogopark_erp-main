import { useSelector } from "react-redux";
import axios from "utils/axios" ;


// @ 新增 _ 客戶關係人
export const useCreate_Customer_Relatives = ( ) => {

    
    // 關係人數
    const Customer_Relatives_Num = useSelector( ( state : any ) => state.Customer.Customer_Relatives_Num ) ;
    

    // 新增資料邏輯
    const create_Cus_Relatives = ( api : string , data : any ) => {


        // 依照關係人數，新增關係人
        for( let n = 1 ; n <= Customer_Relatives_Num ; n++ ){

            const num = n.toString() ; 

            // 轉換資料欄位
            const submitData = {

                account_id   : data['account_id'] ,   // 使用者 : 所屬商店 id

                customer_id  : data['customer_Id'] ,  // 客戶身分證字號

                name         : data['customer_Relative_Name_'+num] ,
                type         : data['customer_Relative_Type_'+num] ,
                tag          : data['customer_Relative_Family_'+num] === "請選擇" ? "" : data['customer_Relative_Family_'+num] ,
                
                mobile_phone : data['customer_Relative_Cellphone_'+num] ,
                tel_phone    : data['customer_Relative_Telephone_'+num] ,

                sex          : data['customer_Relative_Sex_'+num] === "請選擇" ? "" : data['customer_Relative_Sex_'+num] ,  
                id           : data['customer_Relative_Id_'+num] ,   
                address      : data['customer_Relative_Address_'+num]    

            } ;

           
            // 再確認 2022.12.30 ( 拿掉 是否客戶已存在的判斷 )

                axios.post( api , submitData )
                     .catch( err =>  alert( `新增 "關係人" 錯誤 ( ${ err } )．`  )  ) ;

            
                 

        }

    } ;

    return create_Cus_Relatives

} ;
