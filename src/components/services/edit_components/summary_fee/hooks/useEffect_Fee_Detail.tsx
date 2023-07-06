/* eslint-disable no-lone-blocks */
import { useSelector } from "react-redux" ; 
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useEffect_Set_Plan_Basic_Price } from "components/plan/hooks/useEffect_Plan_Type_Columns" ;
import { useEffect_Set_BathBeauty_Price_Type_By_SpeciesId } from "hooks/data/useService_Price"


/* @ 金額所包含 _ 費用明細 */
const margin = { marginLeft : "10px" , marginBottom : "15px" } ;





// # 服務 --------------

// * 基礎
export const FeeDetail_Basic = () => {


    // 基礎價格
    const basicSumPrice      = useSelector( ( state : any ) => state.Basic.Basic_Sum_Price )  ;

    // # 此次服務，自行調整、增減金額
    const Self_Adjust_Amount = useSelector(( state : any ) => state.Extra_Fee.Self_Adjust_Amount )  ;

    // # 接送費
    const pickupFee          = useSelector(( state : any ) => state.Extra_Fee.Pickup_Fee )  ;


    return <>
             { basicSumPrice      !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 基礎費 : { basicSumPrice } 元  </b> }
             { Self_Adjust_Amount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { Self_Adjust_Amount } 元 </b> }
             { pickupFee          !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 接送費 : { pickupFee } 元     </b> }
           </>

}


// * 洗澡
export const FeeDetail_Bath = () => { 


    // 此次洗澡，基本品種價格
    const basic_Bath_Price   = useEffect_Set_BathBeauty_Price_Type_By_SpeciesId() ;

    // 自行調整、增減金額
    const self_Adjust_Amount = useSelector(( state : any ) => state.Extra_Fee.Self_Adjust_Amount )  ;

    // 接送費
    const pickupFee          = useSelector(( state : any ) => state.Extra_Fee.Pickup_Fee ) ;

    // 加價項目費用
    const extraItemFee       = useSelector( ( state : any ) => state.Extra_Fee.Extra_Item_Fee ) ;

    // 加價美容費用
    const extraBeautyFee     = useSelector( ( state : any ) => state.Extra_Fee.Extra_Beauty_Fee ) ;


    return  <>
                { basic_Bath_Price !== 0   && <b className="tag is-medium is-rounded" style={ margin }> 洗澡費 : { basic_Bath_Price } 元  </b> }
                { self_Adjust_Amount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { self_Adjust_Amount } 元  </b> }
                { pickupFee !== 0          && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :   { pickupFee } 元     </b> }
                { extraItemFee !== 0       && <b className="tag is-medium is-rounded" style={ margin }> 加價項目 : { extraItemFee } 元     </b> }
                { extraBeautyFee !== 0     && <b className="tag is-medium is-rounded" style={ margin }> 加價美容 : { extraBeautyFee } 元   </b> }
            </>

}


// * 美容
export const FeeDetail_Beauty = () => { 


    // 此次美容，基本品種價格
    const basic_Beauty_Price = useEffect_Set_BathBeauty_Price_Type_By_SpeciesId() ;

    // 自行調整、增減金額
    const selfAdjustAmount   = useSelector(( state : any ) => state.Extra_Fee.Self_Adjust_Amount )  ;

    // 接送費
    const pickupFee          = useSelector(( state : any ) => state.Extra_Fee.Pickup_Fee ) ;

    // 加價項目費用
    const extraItemFee       = useSelector( ( state : any ) => state.Extra_Fee.Extra_Item_Fee ) ;


    return  <>
                { basic_Beauty_Price !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 美容費 : { basic_Beauty_Price } 元  </b> }
                { selfAdjustAmount !== 0   && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { selfAdjustAmount } 元  </b> }
                { pickupFee !== 0          && <b className="tag is-medium is-rounded" style={ margin }> 接送費 : { pickupFee } 元  </b> }
                { extraItemFee !== 0       && <b className="tag is-medium is-rounded" style={ margin }> 加價項目 : { extraItemFee } 元  </b> }
            </>

}


// * 安親 : 一般安親
export const FeeDetail_Care_Ordinary = () => { 


    // 一般安親費用
    const Care_Ordinary_Price = useSelector(( state : any ) => state.Care.Care_Ordinary_Price ) ;  

    // # 此次服務，自行調整、增減金額
    const selfAdjustAmount    = useSelector(( state : any ) => state.Extra_Fee.Self_Adjust_Amount ) ;

    // # 接送費
    const pickupFee           = useSelector(( state : any ) => state.Extra_Fee.Pickup_Fee ) ;


    return  <>
               { Care_Ordinary_Price !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 安親費 : { Care_Ordinary_Price } 元  </b> }
               { selfAdjustAmount !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { selfAdjustAmount } 元  </b> }
               { pickupFee !== 0           && <b className="tag is-medium is-rounded" style={ margin }> 接送費 : { pickupFee } 元  </b> }
            </>


}



// * 安親 : ( 住宿 ) 提早到達，轉安親
export const FeeDetail_Care_Ahead = () => { 


    // 提早抵達，轉安親費用
    const Care_Ahead_Price    = useSelector(( state : any ) => state.Care.Care_Ahead_Price ) ;          

    // # 此次服務，自行調整、增減金額
    const selfAdjustAmount    = useSelector(( state : any ) => state.Extra_Fee.Self_Adjust_Amount )  ;

    // # 接送費
    const pickupFee           = useSelector(( state : any ) => state.Extra_Fee.Pickup_Fee )  ;


    return  <>
               { Care_Ahead_Price !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 安親費 : { Care_Ahead_Price } 元  </b> }
               { selfAdjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { selfAdjustAmount } 元  </b> }
               { pickupFee !== 0        && <b className="tag is-medium is-rounded" style={ margin }> 接送費 : { pickupFee } 元     </b> }
            </>


}



// * 安親 : ( 住宿 ) 延後帶走
export const FeeDetail_Care_Postpone = () => { 


    // 延後帶走，轉安親費用
    const Care_Postpone_Price = useSelector(( state : any ) => state.Care.Care_Postpone_Price ) ;      
        
    // # 此次服務，自行調整、增減金額
    const selfAdjustAmount    = useSelector(( state : any ) => state.Extra_Fee.Self_Adjust_Amount )  ;

    // # 接送費
    const pickupFee           = useSelector(( state : any ) => state.Extra_Fee.Pickup_Fee )  ;


    return  <>
               { Care_Postpone_Price !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 安親費 : { Care_Postpone_Price } 元  </b> }
               { selfAdjustAmount    !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { selfAdjustAmount } 元  </b> }
               { pickupFee           !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 接送費 : { pickupFee } 元  </b> }
            </>


}


// * 住宿
export const FeeDetail_Lodge = () => { 


    // 住宿金額
    const current_Lodge_Price = useSelector(( state : any ) => state.Lodge.current_Lodge_Price_Sum ) ;  

    // 自行調整、增減金額
    const self_Adjust_Amount  = useSelector(( state : any ) => state.Extra_Fee.Self_Adjust_Amount )  ;

    // 接送費
    const pickupFee           = useSelector(( state : any ) => state.Extra_Fee.Pickup_Fee )  ;


    return  <>
               { current_Lodge_Price !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 住宿費 : { current_Lodge_Price } 元  </b> }
               { self_Adjust_Amount  !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 個體調整金額 : { self_Adjust_Amount } 元  </b> }
               { pickupFee           !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 接送費 : { pickupFee } 元  </b> }
            </>

}



// # 方案 ---------------

// * 預設方案 : 包月洗澡
export const FeeDetail_Default_Plan_Bath = () => {


    // 目前登入者，所屬店家 id
    const shop_Id           = useAccount_Shop_Id();

     // 目前選擇 _ 方案類型( 名稱 ) 
    const current_Plan_Type = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;  
    

    // -----------


    // 方案 : 基本價格
    const plan_Basic_Price  = useEffect_Set_Plan_Basic_Price( shop_Id , current_Plan_Type ) ;
    
    // 自行加減價金額
    const adjust_Price      = useSelector(( state : any ) => state.Plan.self_Adjust_Amount ) ;        

    // 接送費 ( 方案有獨立的接送費輸入欄位 )
    const plan_PickupFee    = useSelector(( state : any ) => state.Plan.service_Pickup_Fee )  ;


    return   <>
                 { plan_Basic_Price !== 0  && <b className="tag is-medium is-rounded" style={ margin }> 包月洗澡 _ 基本價格 : { plan_Basic_Price } 元  </b> }
                 { adjust_Price !== 0   && <b className="tag is-medium is-rounded" style={ margin }> 自行調整金額 :     { adjust_Price } 元  </b> }
                 { plan_PickupFee !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :        { plan_PickupFee } 元  </b> }
            </>


} ;


// * 預設方案 : 包月美容
export const FeeDetail_Default_Plan_Beauty = () => {

    // 目前登入者，所屬店家 id
    const shop_Id          = useAccount_Shop_Id();

    // 目前選擇 _ 方案類型( 名稱 ) 
    const current_Plan_Type = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;  
    

    // -----------


    // 方案 : 基本價格
    const plan_Basic_Price  = useEffect_Set_Plan_Basic_Price( shop_Id , current_Plan_Type ) ;

    
    // 自行加減價金額
    const adjust_Price      = useSelector(( state : any ) => state.Plan.self_Adjust_Amount ) ;        

    // 接送費 ( 方案有獨立的接送費輸入欄位 )
    const plan_PickupFee    = useSelector(( state : any ) => state.Plan.service_Pickup_Fee )  ;

    
    return  <>
                { plan_Basic_Price !== 0  && <b className="tag is-medium is-rounded" style={ margin }> 包月美容 _ 基本價格 : { plan_Basic_Price } 元  </b> }
                { adjust_Price !== 0   && <b className="tag is-medium is-rounded" style={ margin }> 自行調整金額 :        { adjust_Price } 元  </b> }
                { plan_PickupFee !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :         { plan_PickupFee } 元  </b> }
            </>       

}


// * 自訂方案
export const FeeDetail_Custom_Plan = () => {


    // 目前登入者，所屬店家 id
    const shop_Id           = useAccount_Shop_Id() ;

    // 方案類型( 名稱 ) ( Ex. 預設方案 : 包月洗澡、包月美容 、自訂方案 )
    const current_Plan_Type = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;         


    // -----------

    // 自訂方案 : 基本價格 
    const plan_Basic_Price  = useEffect_Set_Plan_Basic_Price( shop_Id , current_Plan_Type ) ;

    // 自行加減價金額
    const adjust_Price      = useSelector(( state : any ) => state.Plan.self_Adjust_Amount ) ;  

    // 接送費 ( 方案有獨立的接送費輸入欄位 )
    const plan_PickupFee    = useSelector(( state : any ) => state.Plan.service_Pickup_Fee ) ;

    

   return  <>
             { plan_Basic_Price !== 0 && <b className="tag is-medium is-rounded" style={ margin }> { current_Plan_Type } _ 基本價格 : { plan_Basic_Price } 元  </b> }
             { adjust_Price !== 0     && <b className="tag is-medium is-rounded" style={ margin }>  自行調整金額 : { adjust_Price } 元   </b> }
             { plan_PickupFee !== 0   && <b className="tag is-medium is-rounded" style={ margin }>  接送費 :      { plan_PickupFee } 元 </b> }
           </> 



}