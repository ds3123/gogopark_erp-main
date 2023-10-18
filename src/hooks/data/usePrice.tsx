/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect , useState } from "react" ;
import { useSelector } from "react-redux" ;
import { useAccount_Shop_Id } from "./useAccount" ;
import { useEffect_Set_Plan_Receivable_Amount } from "components/plan/hooks/useEffect_Plan_Type_Columns" ;
import { useEffect_Set_BathBeauty_Price_Type_By_SpeciesId } from "hooks/data/useService_Price" ;



// # 主要服務 ( 基礎、洗澡、美容 )
const usePrice_Service = () => {

    // 服務基本價格
    let service_Basic_Price = 0 ;


    // 目前所點選 _ 新增類別標籤
    const current           = useSelector(( state : any ) => state.Service.current_Create_Tab ) ;

    // 基本價格 : 基礎 ( 點選基礎服務項目 )
    const basicSumPrice     = useSelector( ( state : any ) => state.Basic.Basic_Sum_Price )  ;

    // 基本價格 : 洗澡 或 美容 ( 品種預設價格 )
    const Bath_Beauty_Price = useEffect_Set_BathBeauty_Price_Type_By_SpeciesId() ;

    // 依照新增類型，判斷 _ 服務基本價格
    if( current === "基礎" )                      service_Basic_Price = basicSumPrice ;
    if( current === "洗澡" || current === "美容" ) service_Basic_Price = Bath_Beauty_Price ;


    // 此次服務，自行調整、增減金額
    const Self_Adjust_Amount = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Self_Adjust_Amount ) ) ;

    // 接送費用
    const pickupFee          = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;

    // 加價項目費用
    const extraItemFee       = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Extra_Item_Fee ) ) ;

    // 加價美容費用
    const extraBeautyFee     = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Extra_Beauty_Fee ) ) ;

    
    // 加總 _ 新增服務：應收金額 ( receivable )
    return service_Basic_Price + Self_Adjust_Amount + pickupFee + extraItemFee + extraBeautyFee ;


} ;

// # 安親價格
const usePrice_Care = () => {

    // 應收金額 ( 包含 : 住宿金額以外的費用  Ex. 接送費 )
    const [ receivable , set_Receivable ] = useState( 0 ) ;

    // 目前所選擇的 _ 安親類型 ( 一般安親、住宿 _ 提早抵達、住宿 _ 延後帶走 )
    const current_Care_Type   = useSelector(( state : any ) => state.Care.current_Care_Type ) ;

    // 此次服務，自行調整、增減金額
    const Self_Adjust_Amount  = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Self_Adjust_Amount ) ) ;

    // 接送費
    const pickupFee           = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;

    // 一般安親費用
    const Care_Ordinary_Price = parseInt( useSelector(( state : any ) => state.Care.Care_Ordinary_Price ) ) ;

    // 住宿 _ 提早抵達 : 轉安親費用
    const Care_Ahead_Price    = parseInt( useSelector(( state : any ) => state.Care.Care_Ahead_Price ) ) ;

    // 住宿 _ 延後帶走 : 轉安親費用
    const Care_Postpone_Price = parseInt( useSelector(( state : any ) => state.Care.Care_Postpone_Price ) ) ;

    // 設定 _ 應收金額  ( receivable )
    useEffect( () => {

       let care_Price = 0 ;

       if( current_Care_Type === '一般安親' )     care_Price = Care_Ordinary_Price ;
       if( current_Care_Type === '住宿_提早抵達' ) care_Price = Care_Ahead_Price ;
       if( current_Care_Type === '住宿_延後帶走' ) care_Price = Care_Postpone_Price ;

       set_Receivable( care_Price + Self_Adjust_Amount + pickupFee ) ;

    } , [ current_Care_Type , Care_Ordinary_Price , Care_Ahead_Price , Care_Postpone_Price , Self_Adjust_Amount , pickupFee ] ) ;



    return receivable 

} ;

// # 住宿價格
const usePrice_Lodge = () => {

    // 住宿金額
    const current_Lodge_Price_Sum = useSelector( ( state : any ) => state.Lodge.current_Lodge_Price_Sum )  ;

    // 安親費用 ( 提早 15 : 00 入住 )
    const care_Amount             = parseInt( useSelector(( state : any ) => state.Extra_Fee.Lodge_Care_Amount ) ) ;

    // 同住費用
    const together_Amount         = parseInt( useSelector(( state : any ) => state.Extra_Fee.Lodge_Together_Amount ) ) ;


    // 洗澡費用
    const bath_Amount             = parseInt( useSelector(( state : any ) => state.Extra_Fee.Lodge_Bath_Amount ) ) ;

    // 美容費用
    const beauty_Amount           = parseInt( useSelector(( state : any ) => state.Extra_Fee.Lodge_Beauty_Amount ) ) ;

    // 美容費用
    const custom_Amount           = parseInt( useSelector(( state : any ) => state.Extra_Fee.Lodge_Custom_Amount ) ) ;


    // 此次服務，自行調整、增減金額
    const Self_Adjust_Amount      = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Self_Adjust_Amount ) ) ;

    // 接送費
    const pickupFee               = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;


    // 應收金額 ( 包含 : 住宿金額以外的費用  Ex. 接送費 )
    const [ receivable , set_Receivable ] = useState( 0 ) ;


    // 設定 _ 應收金額  ( receivable )
    useEffect( ( ) => {

        set_Receivable( current_Lodge_Price_Sum + care_Amount + bath_Amount + beauty_Amount + custom_Amount + together_Amount + Self_Adjust_Amount + pickupFee ) ;

    } ,[ current_Lodge_Price_Sum , care_Amount , bath_Amount , beauty_Amount , custom_Amount , together_Amount , Self_Adjust_Amount , pickupFee ] ) ;


    return receivable ;

} ;
 

// ------------------------


// # 取得 _ 該次新增服務 : 應收金額
export const usePrice_Service_Receivable = () => {


    // 目前所點選 _ 新增類別標籤
    const current = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;

    // 目前登入者，所屬店家 id
    const shop_Id = useAccount_Shop_Id() ;

    // 目前所選擇的 _ 方案類型(名稱)
    const current_Plan_Name  = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;  


    // # 各服務類型，所應提供資料 :    
    const service_Receivable = usePrice_Service() ; // 基礎、洗澡、美容
    const care_Receivable    = usePrice_Care() ;    // 安親 
    const lodge_Receivable   = usePrice_Lodge() ;   // 住宿 
    const plan_Receivable    = useEffect_Set_Plan_Receivable_Amount( shop_Id , current_Plan_Name ) ; // 方案

    
    // # 依照目前新增服務類別，回傳應收金額

    // 主要服務 ( 基礎、洗澡、美容 )
    if( current === '基礎' || current === '洗澡' || current === '美容' ) return service_Receivable ;

    // 安親
    if( current === '安親' ) return care_Receivable ;

    // 住宿
    if( current === '住宿' ) return lodge_Receivable ;

    // 方案 ( 包月洗澡、包月美容 )
    if( current === '方案' ) return plan_Receivable ;


    return 0 ;


} ;