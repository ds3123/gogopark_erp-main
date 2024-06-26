
import { useSelector } from "react-redux" ;
import { useFetch_Species } from "hooks/react-query/species/useFetchSpecies" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useEffect_Set_Plan_Basic_Price } from "components/plan/hooks/useEffect_Plan_Type_Columns" ;
import { useEffect_Set_BathBeauty_Price_Type_By_SpeciesId } from "hooks/data/useService_Price" ;



// 取的 _ "基本資訊" 相關資料
const useInfo_Data = () => {

    // 服務性質 : 已到店、預約_今天、預約_未來
    const service_Status = useSelector(( state : any ) => state.Info.service_Status ) ;

    // 目前所選擇 Q 碼
    const current_Q_Code = useSelector(( state : any ) => state.Info.current_Q_Code ) ;

    return { service_Status , current_Q_Code }

} ;


// 取得 _ "方案" 相關資料
const usePlan_Data = () => {

    
    // 登入者所屬商店 id
    const shop_Id                   = useAccount_Shop_Id() ; 


    // # 預設方案
    const month_Bath_Price        = parseInt( useSelector( ( state : any ) => state.Plan.Month_Bath_Price ) ) ;   // 包月洗澡金額
    const month_Beauty_Price      = parseInt( useSelector( ( state : any ) => state.Plan.Month_Beauty_Price ) ) ; // 包月美容金額

   
    // 目前選擇 _ 方案資料表 ( plans ) id
    const current_Plan_Id         = useSelector(( state : any ) => state.Plan.current_Plan_Id ) ;

    // 目前所點選方案 : 類型 / 名稱
    const current_Plan_Type       = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ; 
       

    // 目前選擇 _ 方案備註 Ex. 包月洗澡第 1 次
    const current_Plan_Note       = useSelector(( state : any ) => state.Plan.current_Plan_Note ) ;


    // # 自訂方案 : 基本價格
    const custom_Plan_Basic_Price = useEffect_Set_Plan_Basic_Price( shop_Id , current_Plan_Type  ) ;


    return { month_Bath_Price , month_Beauty_Price , current_Plan_Id , current_Plan_Type  , current_Plan_Note , custom_Plan_Basic_Price }

} ;

// 取得 _ "住宿"、"安親" 相關資料
const useLodge_Care_Data = () => {

    // 安親 : 預計結束時間 ( for 一般安親 )
    const expect_Care_End_Time    = useSelector( ( state : any )=> state.Care.expect_Care_End_Time ) ;

    // 住宿價格
    const current_Lodge_Price_Sum = useSelector(( state : any ) => state.Lodge.current_Lodge_Price_Sum )  ;


    // 目前選擇住宿 : 價格方案 ( 可退款 / 不可退款 )
    const current_Lodge_Plan      = useSelector( ( state : any ) => state.Lodge.current_Lodge_Price_Plan ) ; 


    return { expect_Care_End_Time , current_Lodge_Price_Sum , current_Lodge_Plan }

} ;

// @ 根據目前位置 ( current )，根據新增個別需要，為提交的資料物件( data )，再附加 _ 屬性、屬性值
export const useAdd_Data_Obj_Extra_Props = ( ) => {

    // 登入者所屬商店 id
    const shop_Id    = useAccount_Shop_Id() ;  

    // 取得 _ 所有寵物品種資料
    const petSpecies = useFetch_Species() ;


    // 基礎價格
    const basicSumPrice     = useSelector( ( state : any ) => state.Basic.Basic_Sum_Price )  ;

    // 洗澡 或 美容，品種基本價格
    const Bath_Beauty_Price = useEffect_Set_BathBeauty_Price_Type_By_SpeciesId() ;

    // 加價項目費用
    const extraItemFee      = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Extra_Item_Fee ) ) ;

    // 加價美容費用
    const extraBeautyFee    = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Extra_Beauty_Fee ) ) ;


    // 目前新增 _ 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
    const current_Create_Service_Type = useSelector(( state : any ) => state.Service.current_Create_Service_Type ) ;


    // # 取得 _ 欲附加屬性的值
    const { month_Bath_Price , month_Beauty_Price , current_Plan_Id , current_Plan_Type , current_Plan_Note , custom_Plan_Basic_Price } = usePlan_Data();

    const { expect_Care_End_Time , current_Lodge_Price_Sum , current_Lodge_Plan } = useLodge_Care_Data() ;

    const { service_Status , current_Q_Code } = useInfo_Data() ;


    const add_Data_Obj_Extra_Props = ( current : string , data : any ) => {

        /*
             < 重要 : 2024.02.02 >

             # 目前登入帳號，所屬店家 id 
               * 後續新增各種對象 ( 客人、寵物、洗澡 ... ) ， 在 convert_Columns.ts 檔案中 ，皆須設定 account_id 此屬性 
               * 代表所新增的對象，所屬店家 id
        
        */ 
        data.account_id = shop_Id ; 
        
        // 將 "寵物品種 pet_species 資料表 id" ， 改為 : "寵物品種名稱"
        if( data['pet_Species'] && data['pet_Species'] !== '請選擇' ){  // 有寵物區塊欄位
            const pet        = petSpecies.filter( x => x['id'] === parseInt( data['pet_Species'] ) )[0] ;
            data.pet_Species = pet['name'] ;
        }

        // --------------------------------------


        if( current === "基礎" || current === "洗澡" || current === "美容" ){
            data.shop_Q_Code                 = current_Q_Code ;              // 目前所選擇 _ 到店處理碼 Q
            data.service_Status              = service_Status ;              // 服務性質 : 已到店、預約_今天、預約_未來
            data.current_Create_Service_Type = current_Create_Service_Type ; // 目前新增 _ 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )
        }

        if( current === "洗澡" || current === "美容" ){
            data.current_Plan_Id             = current_Plan_Id ;             // 目前選擇 _ 方案資料表 ( plans ) id
            data.current_Plan_Type           = current_Plan_Type ;           // 目前所點選方案 : 類型 / 名稱 
            data.current_Plan_Note           = current_Plan_Note ;           // 目前選擇 _ 方案備註 Ex. 包月洗澡第 1 次
        }

        // ------------------------------

        if( current === "基礎" ) data.basic_Fee = basicSumPrice ; // 基礎費

        if( current === "洗澡" ){
            data.current_Tab          = current ;              // 目前所處 _ 新增標籤
            data.bath_Fee             = Bath_Beauty_Price ;    // 洗澡品種基本價格
            data.extra_Service_Fee    = extraItemFee ;         // 加價項目 _ 費用
            data.extra_Beauty_Fee     = extraBeautyFee ;       // 加價美容 _ 費用
        }

        if( current === "美容" ){
            data.current_Tab          = current ;              // 目前所處 _ 新增標籤 
            data.beauty_Fee           = Bath_Beauty_Price ;    // 洗澡品種基本價格
            data.extra_Service_Fee    = extraItemFee ;         // 加價項目 _ 費用
        }

        if( current === "安親" ){
            data.shop_Q_Code          = current_Q_Code ;       // 目前所選擇 _ 到店處理碼 Q
            data.expect_Care_End_Time = expect_Care_End_Time ; // 預計結束時間 ( for 一般安親 )
        }

        if( current === "住宿" ) {

            data.lodge_Price = current_Lodge_Price_Sum ; // 住宿費用
            data.lodge_Plan  = current_Lodge_Plan ;      // 住宿價格方案 ( 可退款 / 不可退款 )

        }  

        if( current === "方案" ){
            data.month_Bath_Price   = month_Bath_Price ;        // 包月洗澡 費用
            data.month_Beauty_Price = month_Beauty_Price ;      // 包月美容 費用
            data.custom_Plan_Price  = custom_Plan_Basic_Price ; // 自訂方案 費用
        }

        return data

    } ;

    return add_Data_Obj_Extra_Props ;

} ;
