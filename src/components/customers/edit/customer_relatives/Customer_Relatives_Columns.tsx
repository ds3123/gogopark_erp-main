/* eslint-disable react/jsx-pascal-case */


import { useState , useEffect } from "react" ;
import { set_Customer_Relatives_Num } from "store/actions/action_Customer" ;
import { useDispatch, useSelector } from "react-redux" ;
import { toast } from "react-toastify" ;
import axios from "utils/axios" ;

import Show_Customer_Relatives_Row from "components/customers/edit/customer_relatives/components/Show_Customer_Relatives_Row" ;
import Add_Relatives_Button from "components/customers/edit/customer_relatives/components/Add_Relatives_Button" ;
import Render_Customer_Relatives_Row from "components/customers/edit/customer_relatives/components/Render_Customer_Relatives_Row" ;


type cRel = { 
    register : any ;
    setValue : any ;
}


// @ 關係人區塊
const Customer_Relatives_Columns = ( { register , setValue  } : cRel ) => {

    const dispatch = useDispatch() ; 


    // 目前所點選 _ 新增類型標籤
    const current = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;


    // 目前客戶 : 所有關係人 
    const Current_Customer_Relatives = useSelector( ( state : any ) => state.Customer.Current_Customer_Relatives )

    // @ 是否處於 _ 新增資料，且該客戶已有新增關係人 ( 帶入舊、已新增關係人資料列 )
    const is_Setting_Existing_Data   = current && Current_Customer_Relatives.length > 0 ;

    // @ 是否處於 _ 編輯資料
    const is_Editting_Customer_Data  = !current && Current_Customer_Relatives.length > 0 ;


    // 預設關係人數
    const [ rel_Arr , set_Rel_Arr ]  = useState( [ 1 ] ) ;


    // 點選 _ 新增 : 關係人欄位 
    const click_Add_Relatives = () => {
    
        set_Rel_Arr( [ ...rel_Arr , rel_Arr.length + 1 ] ) ;

    } ;


    // 點選 _ 封存 : 關係人 
    const click_Archive_Relatives = ( table_Id : string , customer_Id : string ) => {

        axios.put( `/customers/update_relation/${ table_Id }` , { is_archive : 1 } ).then( res => {

            toast( `🦄 資料已封存。如欲恢復，請洽詢管理員。`, { position: "top-left", autoClose: 1500, hideProgressBar: false, closeOnClick: true });

            // 查詢 _ 客戶關係人、刷新頁面
            axios.get( `/customers/show_relations/${ customer_Id }` ).then( res => { 
                set_Rel_Arr( res.data )
            })  

        })
    
    } ;

    // 點選 _ 關係人列表按鈕 -> 顯示所點選關係人資料 ( 僅顯示 1 個 )
    const click_Relatives_Btn = ( data : any ) => {

        set_Rel_Arr( [ 1 ] ) ;  // 設定 _ 顯示一個關係人欄位區塊

        setValue( "customer_Relative_Name_1"      , data['name'] ) ;
        setValue( "customer_Relative_Type_1"      , data['type'] ) ;
        setValue( "customer_Relative_Family_1"    , data['tag'] ) ;
        setValue( "customer_Relative_Cellphone_1" , data['mobile_phone'] ) ;
        setValue( "customer_Relative_Telephone_1" , data['tel_phone'] ) ;
        setValue( "customer_Relative_Sex_1"       , data['sex'] ) ;
        setValue( "customer_Relative_Id_1"        , data['id'] ) ;
        setValue( "customer_Relative_Address_1"   , data['address'] ) ;
        
    }


    // 設定 _ 關係人 : 數目 
    useEffect( () => { 
    
       dispatch( set_Customer_Relatives_Num( rel_Arr.length ) ) ;
      
    } , [ rel_Arr ] ) ;


    useEffect( () => { 

       // 【 新增 】帶入客戶資料 _ 先清除預設 ( 關係人 ) 填寫欄位
       if( is_Setting_Existing_Data ) set_Rel_Arr( [] ) ;  

       // 【 編輯 】設定 _ 關係人
       if( is_Editting_Customer_Data ) set_Rel_Arr( Current_Customer_Relatives ) ; 

    } , [ current , Current_Customer_Relatives ] ) ;


    return <>

                <label className="label" >

                    <i className = "fas fa-users"></i> &nbsp; 關係人 &nbsp;

                    { /* 關係人列 */ }  
                    <Show_Customer_Relatives_Row current = { current } Current_Customer_Relatives = { Current_Customer_Relatives } click_Relatives_Btn = { click_Relatives_Btn } />  

            
                    { /* 新增關係人欄位按鈕  */ }
                    <Add_Relatives_Button is_Setting_Existing_Data = { is_Setting_Existing_Data } click_Add_Relatives = { click_Add_Relatives }  />

                </label> <br/>

                { /* 渲染關係人欄位資料列  */ }
                <Render_Customer_Relatives_Row rel_Arr                  = { rel_Arr } 
                                               register                 = { register } 
                                               is_Setting_Existing_Data = { is_Setting_Existing_Data } 
                                               click_Archive_Relatives   = { click_Archive_Relatives }  />


           </>
    
} ;


export default Customer_Relatives_Columns
       