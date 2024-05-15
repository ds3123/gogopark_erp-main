
import { useState , useEffect } from 'react' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ; 
import { useFetch_Shop_Service_Type_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { 
        useEffect_Extra_Items_Total ,
        useEffect_Change_Picked_Item  ,     
} from "components/services/hooks/useEffect_Extra_Item" ;

import { 
        useEffect_Extra_Beauty_Total ,
        useEffect_Change_Picked_Item as useEffect_Edit_Picked_Beauties
} from "components/services/hooks/useEffect_Extra_Beauty" ;

import { useFetch_Shop_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;


  
/*

  @ for 加價單 ( 服務單建立後，臨時加價欄位 ) 欄位

*/


// # 加價項目欄位
export const useEffect_Side_Extra_Items_Fee = () => {


    // 是否顯示
    const [ is_On , set_Is_On ] = useState( false ) ;


    // 目前登入者，所屬店家 id
    const shop_Id           = useAccount_Shop_Id() ;

    // 取得 _ "加價項目" 所有價格
    const extra_Item_Prices = useFetch_Shop_Service_Type_Prices( shop_Id , '加價項目' ) ;


    // 所點選的服務名稱 ( for 新增 ) / 變動處理 : 點選加價項目
    const { services_Picked , change_Picked_Item } = useEffect_Change_Picked_Item() ;


    // 加總 _ 所點選加價項目金額
    const items_Prices_Total = useEffect_Extra_Items_Total( services_Picked , extra_Item_Prices ) ;


    const item_Fields = <>

                            <b className = { `tag is-medium m_Right_20 m_Bottom_20 m_Top_20 pointer  ${ is_On ? 'is-black' : '' }` }
                               onClick   = { () => set_Is_On( !is_On ) } > 
                               
                               加價項目 { items_Prices_Total > 0 && <> ( { items_Prices_Total } 元 )  </> } 
                                
                            </b> <br/>  

                            { is_On &&
 
                                extra_Item_Prices.map( ( x , y ) => {

                                    const current_Id = x['id'].toString();
                                    const is_Checked = services_Picked.includes( current_Id )

                                    return <div key = { y } className="relative m_Bottom_20 m_Left_30">

                                                    <input type  = "checkbox" value = { x['id'] }  checked = { is_Checked }
                                                        onChange = { e => change_Picked_Item(e.target.value)} />

                                                    <b> { x['service_name'] } </b>

                                                    { x['note'] && 
                                                        <span className = "f_10 fBlue m_Left_10" > { x['note'] }  </span>
                                                    }

                                            </div>

                                })

                            }

                        </>
    

                    
    return { items_Prices_Total , services_Picked  , item_Fields , is_On }                    


} ;


// # 加價美容欄位
export const useEffect_Side_Extra_Beauty_Fee = () => {


    // 是否顯示
    const [ is_On , set_Is_On ] = useState( false ) ;

    // 目前登入者，所屬店家 id
    const shop_Id             = useAccount_Shop_Id() ;

    // 取得 _ "加價項目" 所有價格
    const extra_Beauty_Prices = useFetch_Shop_Service_Type_Prices( shop_Id , '加價美容' ) ;

    // 所點選的服務名稱 ( for 新增 ) / 變動處理 : 點選加價項目
    const { beauty_Picked , change_Picked_Item } = useEffect_Edit_Picked_Beauties() ;

    // 加總 _ 所點選加價項目金額
    const beauties_Prices_Total = useEffect_Extra_Beauty_Total( beauty_Picked , extra_Beauty_Prices ) ;


    const beauty_Fields = <>

                               <b className = { `tag is-medium m_Right_20 m_Bottom_20 m_Top_20 pointer  ${ is_On ? 'is-black' : '' }` }
                                   onClick  = { () => set_Is_On( !is_On ) } > 
                                    
                                    加價美容 { beauties_Prices_Total > 0 && <> ( { beauties_Prices_Total } 元 )  </> } 
                                    
                               </b> <br/> 

                               { is_On &&

                                    extra_Beauty_Prices.map( ( x , y ) => {

                                            const current_Id = x['id'].toString();
                                            const is_Checked = beauty_Picked.includes( current_Id )

                                            return <div key={y} className="relative m_Bottom_20 m_Left_30">

                                                        <input type  = "checkbox" value={ x['id'] }  checked = { is_Checked } 
                                                            onChange = { e => change_Picked_Item( e.target.value ) } />
                                                        <b> { x['service_name'] } </b>


                                                        { x['note'] &&
                                                            <span className="f_10 fBlue m_Left_10">  { x['note']}  </span>
                                                        }

                                                   </div>

                                    })

                                }
    
                          </>


   return { beauties_Prices_Total , beauty_Picked , beauty_Fields , is_On }

} ;
 

// # 自訂加價欄位
export const useEffect_Side_Extra_Custom_Fee = () => {


    // 是否顯示
    const [ is_On , set_Is_On ] = useState( false ) ;

    // 自訂項目
    const [ custom_Item , set_Custom_Item ]   = useState( '' ) ;
    
    // 自訂價格
    const [ custom_Price , set_Custom_Price ] = useState( 0 ) ;


    // 自訂加價欄位
    const custom_Fields = <> 

                             <b className = { `tag is-medium m_Bottom_20 m_Top_20 pointer  ${ is_On ? 'is-black' : '' }` }
                                  onClick = { () => set_Is_On( !is_On ) } > 
                               
                                自訂加價 { custom_Price > 0 && <> ( { custom_Price } 元 )  </> } 
                               
                             </b> 

                             { is_On && 

                                <div className="columns is-multiline is-mobile m_Bottom_30">

                                    <div className="column is-8-desktop">

                                        <div className="control has-icons-left" >

                                            <span className="icon is-small is-left"> <i className="fas fa-list-ol"></i> </span>
                                            <input className = "input" 
                                                   type      = 'text' 
                                                   onChange  = { e => set_Custom_Item( e.target.value ) } />

                                        </div>
                                        
                                    </div>

                                    <div className="column is-4-desktop">

                                        <div className="control has-icons-left" >

                                            <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>
                                            <input className = "input" 
                                                   type      = 'number' 
                                                   onChange  = { e => set_Custom_Price( parseInt( e.target.value ) ) } />

                                        </div>
                                        
                                    </div>

                                </div> 

                             }  

                          </>


   return { custom_Item , custom_Price , custom_Fields , is_On }

} ;


// # 取得 _ 所選擇 : 加價項目名稱
export const useEffect_Get_Extra_Items = ( itemNumArr : string[] ) => {

     // 目前登入者，所屬店家 id
     const shop_Id            = useAccount_Shop_Id() ;

     // 讀取 _ 所有服務價格
     const all_Service_Prices = useFetch_Shop_Service_Prices( shop_Id ) ; 

     // 篩選出
     const service_Arr = all_Service_Prices.filter( x => { 
               
                            const str_Id = ( x['id'] as string ).toString() ; // 轉為字串

                            return itemNumArr.indexOf( str_Id ) !== -1
   
                         }) ;

    // 重組取出加價項目名稱                     
    const items_Data = service_Arr.map( ( x : any ) => x['service_name'] ) ;

    return items_Data



} ;