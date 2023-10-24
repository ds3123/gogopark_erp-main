/* eslint-disable react-hooks/exhaustive-deps */

import { useState , useEffect } from 'react' ;
import { Service } from '../edit/Lodge_Service' ; 
import { useDispatch } from "react-redux" ; 
import { set_Lodge_Bath_Amount , set_Lodge_Beauty_Amount , set_Lodge_Custom_Amount  } from "store/actions/action_Extra_Service_Fee" ;



type Item = { 

    title  : string ,
    amount : string
    
 } ;


type ObjSum = {

    "洗澡" : ( num : number , amountTotal : number , itemArr : any[] ) => void ,
    "美容" : ( num : number , amountTotal : number , itemArr : any[] ) => void ,
    "自訂" : ( num : number , amountTotal : number , itemArr : any[] ) => void

}


type ObjArr = {

    "洗澡" : ( arr : any[] ) => void ,
    "美容" : ( arr : any[] ) => void ,
    "自訂" : ( arr : any[] ) => void 
  
}


type ObjDetail = {

    "洗澡" : ( value : number ) => void ,
    "美容" : ( value : number ) => void ,
    "自訂" : ( value : number ) => void ,
 
 }


type ObjInput = {

    "洗澡" : ( amount : number , itemArr : any[] ) => void ,
    "美容" : ( amount : number , itemArr : any[] ) => void ,
    "自訂" : ( amount : number , itemArr : any[] ) => void ,
 
 }



// 取得 _ 洗澡、美容、自訂 標籤：小計金額、次數
export const useEffect_ServiceTag_Sum = () => {


    // 洗澡：次數、金額
    const [ bathFee , set_BathFee ]     = useState< any >( { num : 0 , amount : 0 , itemArr : [] , type : "洗澡" } ) ;

    // 美容：次數、金額
    const [ beautyFee , set_BeautyFee ] = useState< any >( { num : 0 , amount : 0 , itemArr : [] , type : "美容" } ) ;

    // 自訂費用：次數、金額
    const [ customFee , set_CustomFee ] = useState< any >( { num : 0 , amount : 0 , itemArr : [] , type : "自訂" } ) ;


    // 策略物件
    const set_Fee : ObjSum  = {

        "洗澡" : ( num : number , amountTotal : number , itemArr : any ) => set_BathFee(   { ...bathFee   , num : num , amount : amountTotal , itemArr : itemArr } ) ,
        "美容" : ( num : number , amountTotal : number , itemArr : any ) => set_BeautyFee( { ...beautyFee , num : num , amount : amountTotal , itemArr : itemArr } ) ,
        "自訂" : ( num : number , amountTotal : number , itemArr : any ) => set_CustomFee( { ...customFee , num : num , amount : amountTotal , itemArr : itemArr } ) ,

    } ;


    // 取得 _ 洗澡：次數、金額
    const get_Service_Fee = ( itemArr : any[] , type : Service ) => {
    
            // 次數
            const num         = itemArr.length ;

            // 先取出金額
            const amountArr   = itemArr.map( x => isNaN( parseInt( x?.amount ) ) ? 0 : parseInt( x?.amount ) ) ;

            // 加總金額
            const amountTotal = amountArr.reduce( ( accu , curr ) => accu + curr , 0 ) ;

            if( typeof set_Fee[ type ] === 'function' ) set_Fee[ type ]( num , amountTotal , itemArr ) ;

    } ;


    return { bathFee , beautyFee , customFee , get_Service_Fee } ;


} ;


// 新增項目清單 ( 新增、刪除 )
export const useEffect_ServiceItem_Edit = () => {

    const [ itemArr_Bath   , set_ItemArr_Bath ]   = useState< any[] >( [] ) ;
    const [ itemArr_Beauty , set_ItemArr_Beauty ] = useState< any[] >( [] ) ;
    const [ itemArr_Custom , set_ItemArr_Custom ] = useState< any[] >( [] ) ;


    // 策略物件
    const set_ItemArr_Cash : ObjArr = {

            "洗澡" : ( arr : any[] ) => set_ItemArr_Bath( arr ) ,
            "美容" : ( arr : any[] ) => set_ItemArr_Beauty( arr ) ,
            "自訂" : ( arr : any[] ) => set_ItemArr_Custom( arr ) 
    
    } ;


    // 點選 _ 新增
    const click_AddItem = ( type : Service ) => ( item : any  ) => {

            // 新增位置
            const arr = type === "洗澡" ? itemArr_Bath :
                        type === "美容" ? itemArr_Beauty :
                        type === "自訂" ? itemArr_Custom :
                        [] ;         

            // 執行新增
            if( typeof set_ItemArr_Cash[ type ] === 'function' ) set_ItemArr_Cash[ type ]( [ ...arr , item ] ) ;

    } ;


    // 點選 _ 刪除
    const click_DeleteItem = ( type : Service , itemArr : any[] ) => ( index : number ) => {

        const filterArr = itemArr.filter( ( x , y ) => y !== index ) ;
            
        set_ItemArr_Cash[ type ]( filterArr ) ;

    }


    return { itemArr_Bath , itemArr_Beauty , itemArr_Custom , click_AddItem , click_DeleteItem  } ;


}


// 設定 _ 目前所點選服務頁籤
export const useEffect_CurrentTag = () => {


    const [ currentTag , set_CurrentTag ] = useState< Service | "" >( "" ) ;


    const click_Tag = ( current : Service | ""  ) => set_CurrentTag( current ) ; 


    return { currentTag , click_Tag } ;

} ;


// 自訂費用 
export const useEffect_Custom_Fee = () => {

    // 項目內容
    const [ item , set_Item ] = useState< Item >({ 
                                                    title  : "" ,
                                                    amount : ""
                                                }) ;

    // 修改 _ 項目
    const change_Title  = ( value : any ) => set_Item({ ...item , title : value }) ;

    // 修改 _ 金額
    const change_Amount = ( value : any ) => set_Item({ ...item , amount : value }) ;

    return { item , change_Title , change_Amount , set_Item  }


} ;


// 付款方式
export const useEffect_Payment_Method = () => {

     // 付款方式
   const [ method , set_Method ] = useState< "現金" | "方案" | "贈送" >( "現金" ) ;

   return {  method , set_Method  } ;

} ;


// 現金金額
export const useEffect_Payment_Cash = () => {

   const [ amount , set_Amount ] = useState< string >( "" ) ;

   return { amount , set_Amount } ;

} ;




// 設定 _ 洗澡、美容、自訂費用 : 明細清單
export const useEffect_Summary_Detail_Price = ( currentTag : "洗澡" | "美容" | "自訂" | ""  , amount : number ) => {

   const dispatch = useDispatch() ;

   // 策略物件
   const obj : ObjDetail = {

      "洗澡" : ( value ) => dispatch( set_Lodge_Bath_Amount( value ) ) ,
      "美容" : ( value ) => dispatch( set_Lodge_Beauty_Amount( value ) ) ,
      "自訂" : ( value ) => dispatch( set_Lodge_Custom_Amount( value ) ) ,

   }

   // 設定 _ 價格 ( for 價格明細 )
   useEffect( () => {

     if( amount && currentTag ) obj[ currentTag as Service ]( amount ) ;
      
   } , [ amount ] ) ;


} ;


// 將所選擇服務價格資料，輸入 input 欄位
export const useEffect_Insert_ServicePrices = ( setValue : any , feeObj : { num : number ; amount : number ; itemArr : any[] ; type : Service } ) => {

    const { type , amount , itemArr } = feeObj ;  



    // 串接 _ 回傳字串
    const get_RturnString = ( x : any , y : number ) => {

        const method = x?.method === '現金' ? `[ ${ x?.method } ]` :
                       x?.method === '方案' ? `[ ${ x?.method } ] 使用 1 次` :
                      `[ ${ x?.method } ] 贈送 1 次` ;

        const amount = x?.amount ? `/ 金額 : ${ x?.amount } 元` : '' ;  
        const date   = x?.date !== 'Invalid date' ? ' / 日期 : ' + x?.date : '' ;
        const note   = x?.note ? ' / 備註 : ' + x?.note : '' ; 

        return `${ y+1 }. ${ method } ${ amount } ${ date } ${ note }` ;
    
    } ;


    // 策略物件
    const obj : ObjInput = {

        "洗澡" : ( amount , itemArr ) => {

                                            const arr = itemArr.map( ( x , y ) => get_RturnString( x , y ) ) ;
                                            const str = arr.join( ',' );

                                            setValue( "lodge_Bath_Price" , amount ) ;
                                            setValue( "lodge_Bath_Items" , str ) ;

                                        } ,

        "美容" : ( amount , itemArr ) => {

                                            const arr = itemArr.map( ( x , y ) => get_RturnString( x , y ) ) ;
                                            const str = arr.join( ',' );

                                            setValue( "lodge_Beauty_Price" , amount ) ;
                                            setValue( "lodge_Beauty_Items" , str ) ;

                                        } ,
        
        "自訂" : ( amount , itemArr ) => {

                                            const arr = itemArr.map( ( x , y ) => `${ x?.title } _ ${ x?.amount } 元` ) ;
                                            const str = arr.join( ',' );
                                            
                                            setValue( "lodge_Custom_Price" , amount ) ;
                                            setValue( "lodge_Custom_Items" , str ) ;

                                        } 

    } ; 


    useEffect( () => {
        
        if( type ) obj[ type ]( amount , itemArr ) ;
        
    } , [ type , amount , itemArr ] ) ;


} ;


