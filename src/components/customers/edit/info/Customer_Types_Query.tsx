/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect_Click_Set_Cutomer_Data } from "../../hooks/useEffect_Customer_Form" ;
import { useState , useEffect } from 'react' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useFetch_Shop_Customers_Query_By_Column ,
         useFetch_All_Shops_Customers_Query_By_Column 
       } from "hooks/react-query/customer/useFetchCustomers" ;

interface IQuery {
   query    : any ;
   setValue : any ;
}


const style_1 = { width : "80%" , height : "35px" , left : "140px" , top : "0px"   , overflowY : "hidden" } as const ;
const style_2 = { width : "80%" , height : "35px" , left : "140px" , top : "-40px" , overflowY : "hidden" } as const ;
const tag     = "tag is-medium hover is-light" ;
const red     = { color : "red"  } ;
const gray    = { color : "gray" } ;


// @ 顯示 _ 查詢客戶 : "身分證字號"、"手機號碼" 結果 ( 顯示 : 客戶姓名、新客戶 在標題列右上方 )
const Customer_Types_Query = ( { query , setValue } : IQuery ) => {


    // # 查詢 _ 特定店家，特定欄位 ( 身分證字號、手機號碼 )，是否有相對應客戶
    const shop_Id                = useAccount_Shop_Id() ;   // 目前登入使用者，所屬店家 id
    const query_Result_Id        = useFetch_Shop_Customers_Query_By_Column( shop_Id , 'id'           , query['customer_Id'] ) ;        // 以身分證字號查詢
    const query_Result_CellPhone = useFetch_Shop_Customers_Query_By_Column( shop_Id , 'mobile_phone' , query['customer_Cellphone'] ) ; // 以手機號碼查詢  

    // # 查詢 _ 所有店家，特定欄位 ( 身分證字號、手機號碼 )，是否有相對應客戶
    const query_All_Result_Id        = useFetch_All_Shops_Customers_Query_By_Column( 'id'           , query['customer_Id'] ) ;        // 以身分證字號查詢
    const query_All_Result_CellPhone = useFetch_All_Shops_Customers_Query_By_Column( 'mobile_phone' , query['customer_Cellphone'] ) ; // 以手機號碼查詢  

   
    const [ is_Querying , set_Is_Querying ]    = useState( false ) ;  


    // 目前輸入 _ 查詢中的客戶 : 身分證字號、姓名、手機號碼
    const { customer_Id , customer_Cellphone } = query ;


    // 點選 _ 客戶名字，設定、帶入欄位資料
    const click_Set_Customer_Data = useEffect_Click_Set_Cutomer_Data() ;
    const set_Cus_Data            = ( data : any ) => click_Set_Customer_Data( data , setValue ) ;


    // 設定 _ 是否在輸入欄位數值
    useEffect( () => {
        
        set_Is_Querying( customer_Id || customer_Cellphone ? true : false ) ;

    } , [ customer_Id , customer_Cellphone ] ) ;


    // 加密 _ 名字
    const encrypt_Name = ( name : string ) : string => {

        const arr_Name = name.split( '' ) ;

        // 前 2 個字元維持原狀
        const c_Name = arr_Name.map( ( x , i ) => {

            if( i === 0 || i=== 1 ) return x ;

            return '*'

        } )

        return c_Name.join( '' )  
    
    } ;

    // 加密 _ 手機號碼
    const encrypt_Mobile = ( mobile : string ) : string => {
    
        const arr_Mobile = mobile.split( '' ) ;

        const c_Mobile = arr_Mobile.map( ( x , i ) => {

            if( i === 7 || i=== 8 ) return '*' ;

            return x 
  
        } ) 

        return c_Mobile.join( '' )  
    
    } ;


  return <>

              { /* < 所有店家 >，有符合 _ 身分證字號  */ }
              <div className = "absolute" style = { style_2 } >

                 {  ( is_Querying && ( query_All_Result_Id.length > 0 || query_All_Result_CellPhone.length > 0 ) ) &&

                    <b className = "tag is-warning is-light is-medium is-rounded" > 
                    <b className = "tag is-warning is-medium is-rounded" > 他店 </b> &nbsp; &nbsp; &nbsp;
                     
                    { /* 顯示查詢結果 _ 身分證字號 */ }
                    {

                        ( is_Querying && query_All_Result_Id.length > 0 ) &&

                            query_All_Result_Id.map( ( x : any , v : any ) => {
                                
                                // 排除 _ 本店資料
                                if( x['account_id'] === shop_Id ) return false ;

                                return <span key = { v } style = { gray } > { encrypt_Name( x['name'] ) } ( { encrypt_Mobile( x['mobile_phone'] ) } ) &nbsp; &nbsp; </span> ;
                                
                            } )

                    }

                    { /* 顯示查詢結果 _ 手機號碼 */ }
                    {

                        ( is_Querying && query_All_Result_CellPhone.length > 0 ) &&

                            query_All_Result_CellPhone.map( ( x : any , v : any ) => {

                                // 排除 _ 本店資料 
                                if( x['account_id'] === shop_Id ) return false ;

                                return <span key = { v } style = { gray }  > { encrypt_Name( x['name'] ) } ( { encrypt_Mobile( x['mobile_phone'] ) } ) &nbsp; &nbsp; </span> ;

                            })

                    }

                   </b>

                 }

              </div>


              { /* < 特定店家 >，有符合 _ 身分證字號  */ }
              <div className = "absolute" style = { style_1 } >

                  { /* 顯示查詢結果 _ 身分證字號 */ }
                  {


                     ( is_Querying && query_Result_Id.length > 0 ) &&

                          query_Result_Id.map(( x : any , v : any ) => {

                              return <span key = { v } >
                                        <b className = { tag } onClick={ () => set_Cus_Data( x ) }> { x['name'] } ( { x['mobile_phone'] } )  </b> &nbsp;
                                     </span> ;

                          })

                  }


                  { /* 顯示查詢結果 _ 手機號碼 */ }
                  {

                    ( is_Querying && query_Result_CellPhone.length > 0 ) &&

                          query_Result_CellPhone.map( ( x : any , v : any ) => {

                              return <span key = { v } >
                                        <b className = { tag } onClick = { () => set_Cus_Data( x ) }> { x['name'] } ( { x['mobile_phone'] } )  </b> &nbsp;
                                     </span> ;

                          })

                  }

              </div>


              { /* ----------------------------------------------------------------------- */ }

              { /* 顯示 : 新客戶 */ }
              { ( is_Querying && query_Result_Id.length === 0 && query_Result_CellPhone.length === 0 ) && <b className = "absolute" style = { red } > 新客戶 </b> }

         </>

} ;

export default Customer_Types_Query
