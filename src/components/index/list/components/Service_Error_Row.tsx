
import { FC } from 'react' ;
import { 
         get_ServiceOrder_Error_ServiceType , 
         get_ServiceOrder_Error_Note , 
         get_ServiceOrder_Error_PetInfo 
        } from "fp/services/read/get_Error" ;

type Service = {

    service : any ;
  
}



// # 異常記錄 _ 列
export const Service_Error_Row : FC< Service > = ( { service } ) => {

        console.log( service ) ;


    
        // * 作業人員
        const admin_User      = service['admin_user'] === '測試員' ? '店長' : service['admin_user'] ;
        const error_Submitter = service['error_submitter'] ;


        // * 加價單 ( 被刪除 )
        const extra_fee_id  = service?.extra_fee_id ;

        // * 客人
        const cus_Name   = !extra_fee_id ? service?.customer?.name         : service?.cus_name ;    // 姓名
        const cus_Mobile = !extra_fee_id ? service?.customer?.mobile_phone : service?.cus_mobile ;  // 手機 

    

    return <tr>

                {/* { /* 服務類別 */ }
                <td className="td_Left"> 
                  
                   { get_ServiceOrder_Error_ServiceType( service )  }
                 
                </td>

                { /* 異常說明 */ }
                <td className="td_Left"> 
                    <b className="fDred"> { get_ServiceOrder_Error_Note( service ) } </b>           
                </td>

                { /* 主人姓名 */ }
                <td> { cus_Name }  </td>

                { /* 主人手機 */ }
                <td> { cus_Mobile } </td>

               { /* 寵物資訊 */ }
                <td className="td_Left">

                  {  get_ServiceOrder_Error_PetInfo( service ) }

                </td>

                { /* 錯誤提交人 */ }
                <td> 

                   { ( error_Submitter === '測試員'  ) ? '店長' : admin_User } 

                </td>
             
            </tr>



} ;