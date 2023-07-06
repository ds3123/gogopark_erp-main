/* eslint-disable react/jsx-pascal-case */
import { useContext , useEffect  } from "react"

// React Hook Form
import { useForm , SubmitHandler} from "react-hook-form";

// 各表單驗證條件
import { schema_Customer } from "utils/validator/form_validator"
import { ICustomer } from "utils/Interface_Type";
import { yupResolver } from "@hookform/resolvers/yup";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel" ;
import Customer_Form from "components/customers/edit/Customer_Form" ;

// Hook
import { useUpdate_Data } from "hooks/ajax_crud/useAjax_Update";
import { update_Customer_Relatives } from "store/actions/action_Customer";
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router-dom" ;
import { get_Customer_Relatives } from "store/actions/action_Customer";
import{ useLocation } from "react-router" ;

import Data_Table_Id from 'templates/note/Data_Table_Id'
import Update_Submit_Button from 'templates/button/Update_Submit_Button'



{ /*  編輯客戶 */ }
const Update_Customer  = ( ) => {

    const dispatch    = useDispatch() ;
    const current_Url = useLocation().pathname ;    // 取得目前 url  例如 :  ~ /customers

    // 取得 context 值
    const value    = useContext( SidePanelContext ) ;  
    const customer = value.preLoadData ? value.preLoadData : {} ;
    const cus_Id   = customer ? customer.id : '' ;  // 身分證字號
    const relative = value.preLoadData.customer_relation ? value.preLoadData.customer_relation : [] ;  // 關係人資料


    // 預先填寫欄位 : 客人
    let obj : any = {

        // 客戶
        customer_Id        : cus_Id ,
        customer_Name      : customer.name ,
        customer_Cellphone : customer.mobile_phone ,
        customer_Telephone : customer.tel_phone ,
        customer_Line      : customer.line ,
        customer_Email     : customer.email ,
        customer_Address   : customer.address ,
        customer_Sex       : customer.sex ,
        customer_P_Note    : customer.note ,

    }


    // 預先填寫欄位 : 關係人         
    relative.forEach( ( x : any , y : number ) => { 

        if( !x ) return null ;

        const index = ( y+1 ).toString() ;

        obj["customer_Relative_Name_"+index]      = x["name"] ;
        obj["customer_Relative_Type_"+index]      = x["type"] ;
        obj["customer_Relative_Family_"+index]    = x["tag"] ;
        obj["customer_Relative_Cellphone_"+index] = x["mobile_phone"] ;
        obj["customer_Relative_Telephone_"+index] = x["tel_phone"] ;
        obj["customer_Relative_Sex_"+index]       = x["sex"] ;
        obj["customer_Relative_Id_"+index]        = x["id"] ;
        obj["customer_Relative_Address_"+index]   = x["address"] ;

    })  


    // React Hook Form
    const { register , watch , handleSubmit , formState: { errors , isValid } } =
                    useForm< ICustomer >({
                        mode          : "all" ,
                        resolver      : yupResolver( schema_Customer ) ,
                        defaultValues : obj
                    }) ;

    const update_Data = useUpdate_Data() ;
  
    // 關係人數
    const Customer_Relatives_Num = useSelector( ( state : any ) => state.Customer.Customer_Relatives_Num ) ;
    const history                = useHistory() ;


    // 提交表單
    const onSubmit : SubmitHandler< ICustomer > = data => {

       // 更新 _ 客戶
       update_Data( "/customers" , customer.customer_id , data , current_Url , "客戶" ) ;

       // 更新 _ 關係人 
       dispatch( update_Customer_Relatives( data['customer_Id'] , data , Customer_Relatives_Num , history , current_Url ) ) ;

    } ;


    // 取得 _ 客戶關係人資料 ( Current_Customer_Relatives )
    useEffect( () => { 
    
      if( cus_Id ) dispatch( get_Customer_Relatives( cus_Id ) ) ;
    
    } , [ cus_Id ] ) ;


    // 欲傳遞屬性
    const props = {

        register    : register ,
        watch       : watch ,
        errors      : errors ,
        isValid     : isValid ,

        customer_Id : cus_Id      // 身分證字號
       
    }


    return <form onSubmit = { handleSubmit( onSubmit ) } >

             { /* 資料表 id */ }       
             <Data_Table_Id id = { customer?.customer_id } />
               
             { /* 客戶表單欄位 */ }
             <Customer_Form  { ...props } />

             { /* 提交按鈕 */ }
             <Update_Submit_Button  name = "提交表單" isValid = { isValid } />
                        
           </form>

} ;

export default Update_Customer