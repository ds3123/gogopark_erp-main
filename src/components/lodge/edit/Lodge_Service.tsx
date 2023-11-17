/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */

import { FC , useEffect } from 'react' ;
import { useEffect_CurrentTag , useEffect_Summary_Detail_Price } from '../hooks/useEffect_ServiceTag' ;
import Lodge_Custom_Fee from "./components/service_fee/Lodge_Custom_Fee" ;
import Lodge_Service_List from './components/service_fee/Lodge_Service_List';
import { useEffect_ServiceTag_Sum , useEffect_ServiceItem_Edit , useEffect_Insert_ServicePrices } from '../hooks/useEffect_ServiceTag' ;



export type Service =  "洗澡" | "美容" | "自訂"  ;

type CreateTag = {

    name       : Service ;
    color      : "is-success" | "is-danger" | "is-link" ;
    icon       : "fas fa-bath" | "fas fa-cut" | "fas fa-list" ;

    feeObj     : { num : number ; amount : number ; itemArr : any[] ; type : Service } ;

    currentTag : Service | "" ;

    onClick    : ( current : Service | ""  ) => void ;

    setValue   : any ;

} ;

type EditTag = {

    color : string ;
    icon  : string ;
    title : string ;
    
    items : string ;
    price : string ;

}

type LService = {

    editType     : string | undefined ;   
  
    register     : any ;
    setValue     : any ;
    control      : any ;

    serviceData? : any ; // 編輯資料
  
}

// --------


// # 各服務頁籤 ( 新增 )
const Service_Tag : FC< CreateTag > = ( { name , color , icon , currentTag  , onClick , feeObj , setValue } ) => {


    // 設定 _ 洗澡、美容、自訂費用 : 明細清單 ( 最底下 )
    useEffect_Summary_Detail_Price( currentTag , feeObj.amount ) ; 

    /*
        將所選擇服務價格資料，輸入 input 欄位：

            lodge_Bath_Price   , lodge_Bath_Items , 
            lodge_Beauty_Price , lodge_Beauty_Items , 
            lodge_Custom_Price , lodge_Custom_Items
    
    */ 
    useEffect_Insert_ServicePrices( setValue , feeObj ) ;

    

  return  <div className = "column is-4-desktop" > 

              <b className = { `tag is-medium ${ color } ${ currentTag === name ? "" : "is-light" } is-rounded relative p_20 pointer` } style = {{ top : "20px" }} onClick = { () => onClick( name ) } > 
                  
                  <i className = { icon } ></i> &nbsp; { name }

                  { /* 次數 / 金額 */ }
                  { feeObj.num > 0 && <b className = "tag is-white is-rounded f_11 m_Left_10" > <span className = "fRed" > { feeObj.amount } </span>&nbsp;元 ( { feeObj.num } ) </b> }

              </b>

          </div>

} ;


// # 各服務頁籤 ( 編輯 )
const Edit_Tag : FC< EditTag > = ( { color , icon , title , price , items } ) => {

    const _items = items ? items?.split( ',' ) : [] ;

    return  <div className = "column is-12-desktop m_Top_30" >  

                <b className = { `tag ${ color } is-large m_Left_10` } >

                    <i className = { `${ icon } m_Right_10` } ></i> { title }
                    <span className = "tag is-white m_Left_10 m_Right_10 fRed f_12 is-rounded" > { price }  </span> 元

                </b> 

                <div className = "m_Top_15 m_Left_30" >

                        { /* 費用項目 */ }
                        { _items?.length > 0 && _items?.map( ( x : any ,y : number ) => 
                                <div key = { y } className = "tag is-white is-medium m_Left_20 m_Bottom_15 w-70 p_Top_5 p_Left_20" > <b>  { x } </b> </div> ) 
                        }

                </div>

            </div>

} ;




// @ 住宿 _ 洗澡、美容、自訂費用
const Lodge_Service : FC< LService > = ( { register ,setValue , editType , serviceData } ) => {


    // 點選 _ 目前服務頁籤
    const { currentTag , click_Tag } = useEffect_CurrentTag() ;


    // 取得 _ 洗澡、美容、自訂 標籤：小計金額、次數
    const { bathFee , beautyFee , customFee , get_Service_Fee } = useEffect_ServiceTag_Sum() ;

    
    // 新增項目清單 ( 新增、刪除 )
    const { itemArr_Bath , itemArr_Beauty , itemArr_Custom , click_AddItem , click_DeleteItem } = useEffect_ServiceItem_Edit() ;
    

    // 清單資料資料
    const itemArr = currentTag === '洗澡' ? itemArr_Bath :
                    currentTag === '美容' ? itemArr_Beauty :
                    itemArr_Custom ;

    useEffect( () => {

       if( currentTag ) get_Service_Fee( itemArr , currentTag as Service ) ;
        
    } , [ itemArr , currentTag ] ) ;


  return <>


              { /* 新增 */ }
              { !editType &&

                    <>

                        { /* 隱藏欄位 */ } 
                        <input type = "hidden" { ...register( "lodge_Bath_Items" ) } />  { /* 洗澡項目 */ }
                        <input type = "hidden" { ...register( "lodge_Bath_Price" ) } />  { /* 洗澡價格 */ }

                        <input type = "hidden" { ...register( "lodge_Beauty_Items" ) } /> { /* 美容項目 */ }
                        <input type = "hidden" { ...register( "lodge_Beauty_Price" ) } /> { /* 美容價格 */ }

                        <input type = "hidden" { ...register( "lodge_Custom_Items" ) } /> { /* 自訂項目 */ }
                        <input type = "hidden" { ...register( "lodge_Custom_Price" ) } /> { /* 自訂價格 */ }

                        { /* 服務標籤 */ }
                        <div className = "column is-8-desktop" >

                            <div className = "columns is-multiline" >
                            
                               <Service_Tag name = "洗澡" color = "is-success" icon = "fas fa-bath" currentTag = { currentTag } onClick = { click_Tag } feeObj = { bathFee }   setValue = { setValue } />
                               <Service_Tag name = "美容" color = "is-danger"  icon = "fas fa-cut"  currentTag = { currentTag } onClick = { click_Tag } feeObj = { beautyFee } setValue = { setValue } />
                               <Service_Tag name = "自訂" color = "is-link"    icon = "fas fa-list" currentTag = { currentTag } onClick = { click_Tag } feeObj = { customFee } setValue = { setValue } />
                                
                            </div>

                        </div>

                        { /* 服務內容  */ }
                        <div className = "column is-12-desktop m_Top_30" >
                            
                            { ( currentTag === "洗澡" ||  currentTag === "美容" ) &&

                                <Lodge_Service_List currentTag       = { currentTag }
                                                    itemArr          = { itemArr }  
                                                    click_AddItem    = { click_AddItem( currentTag as Service ) } 
                                                    click_DeleteItem = { click_DeleteItem( currentTag as Service , itemArr ) } />

                            }

                            { currentTag === "自訂" && 

                                    <Lodge_Custom_Fee itemArr          = { itemArr_Custom } 
                                                      click_AddItem    = { click_AddItem( currentTag as Service ) } 
                                                      click_DeleteItem = { click_DeleteItem( currentTag as Service , itemArr ) }  />  
                            
                            } 

                        </div>

                    </> 

              }

              { /* 編輯 */ }
              { editType && 
                   <>
                      <Edit_Tag color = "is-success is-light" icon = "fas fa-bath" title = "洗澡費" price = { serviceData?.lodge_bath_price }   items = { serviceData?.lodge_bath_items } />
                      <Edit_Tag color = "is-danger is-light"  icon = "fas fa-cut"  title = "美容費" price = { serviceData?.lodge_beauty_price } items = { serviceData?.lodge_beauty_items } />
                      <Edit_Tag color = "is-link is-light"    icon = "fas fa-list" title = "自訂費" price = { serviceData?.custom_price }       items = { serviceData?.custom_items } />
                  </> 
              }
   
         </> 

} ;

export default Lodge_Service
       