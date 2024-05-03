import { useEffect } from 'react' ;
import { useDispatch , useSelector } from "react-redux";
import { set_Current_Pet } from "store/actions/action_Pet" ;
import { useFetch_Species } from "hooks/react-query/species/useFetchSpecies" ;
import { useFetch_Shop_Species_5_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { set_month_bath_price , set_month_beauty_price } from "store/actions/action_Plan" ;



// 點選 _ 客戶寵物標籤，以帶入所欲適用的 : 寵物編號
export const useEffect_Click_Pet_Button = ( setValue : any ) => {


    const dispatch   = useDispatch() ;

    // 取得 _ 所有寵物品種資料   
    const petSpecies = useFetch_Species() ;     
    
    // 目前所選擇 : 方案類型 ( 名稱 )
    const current_Plan_Type  = useSelector( ( state : any ) => state.Plan.current_Plan_Type ) ;         

    // 目前 "寵物品種" 下拉選項所選擇 id ( species 資料表的 id )  
    const current_Species_Id = useSelector( ( state : any ) => state.Pet.current_Species_Id ) ;         

    //---------------

    // 點選 _ 寵物按鈕
    const click_Pet_Button = ( pet : any ) => {

        // 設定 _ 目前所點選的寵物
        dispatch( set_Current_Pet( pet ) ) ;  
       
       
        if( !current_Plan_Type || current_Plan_Type === '請選擇' ){
            alert('請先選擇 : 方案類型') ;
            return false ;
        }

        if( !current_Species_Id || current_Species_Id === '請選擇' ){
            alert('請先選擇 : 寵物品種') ;
            return false ;
        }

        // 目前 "寵物品種" 下拉選單，所選擇寵物品種
        const species_Selected = petSpecies.filter( x => x['id'] === parseInt( current_Species_Id ) )[0]  ;

        if( species_Selected['name'] !== pet['species'] ){
            alert( `目前下拉所選擇寵物品種為 : ${ species_Selected['name'] }，不符合所欲適用寵物品種 : ${ pet['species'] } ` ) ;
            return false ;
        }


        // 帶入寵物編號 ( 並啟動 _ 驗證 : shouldValidate )
        setValue( 'plan_Apply_Pet' , pet['serial'] , { shouldValidate : true  } ) ;
    

    } ;


    return click_Pet_Button


} ;


// 取得 _ 方案基本價格 ( for 編輯 )
export const useEffect_Get_Edit_Plan_Basic_Price = (  ) => {

    
    const get_Plan_Basic_Price = ( data : any  ) => {

            if( !data ) return 0 ;

            const pet       = data['pet'] ;
            const plan_Type = data['plan_type'] ;  // 方案類型( Ex. 包月洗澡、包月美容... )

            // 包月洗澡下，有自訂價錢
            if( plan_Type === '包月洗澡' && pet?.month_bath_price )   return pet?.month_bath_price ;
            
            // 包月美容下，有自訂價錢
            if( plan_Type === '包月美容' && pet?.month_beauty_price ) return pet?.month_beauty_price ;
            
            return data['plan_basic_price'] ;
    
    } ;

    return get_Plan_Basic_Price

} ;


// 設定 _ 預設方案 ( 包月洗澡、包月美容 ) 品種預設價格
export const useEffect_Default_Plan_Basic_Price = () => {

    const dispatch = useDispatch();


    // 目前所選擇 _ 寵物品種 id
    const current_Plan_Type  = useSelector( ( state : any ) => state.Plan.current_Plan_Type ) ;
   
    // 目前所選擇 _ 寵物品種 id
    const currnet_Species_Id = useSelector( ( state : any ) => state.Pet.current_Species_Id ) ;
   
    // 特定品種，5 種基本價格 ( NOTE : 一率先採用狗狗公園定價 ( account_id === 1 )  )
    const species_Prices     = useFetch_Shop_Species_5_Service_Prices( "1" , currnet_Species_Id ) ;

    
    // 設定價格
    useEffect( () => {

     
       if( current_Plan_Type && currnet_Species_Id && current_Plan_Type === "包月洗澡" ){

            const month_Bath = species_Prices?.month_Bath as number ;
            dispatch( set_month_bath_price( month_Bath ? month_Bath : 0 ) )

       } 

       if( current_Plan_Type && currnet_Species_Id && current_Plan_Type === "包月美容" ){

           const month_Beauty = species_Prices?.month_Beauty as number ;
           dispatch( set_month_beauty_price( month_Beauty ? month_Beauty : 0) )

       } 

       return () => {

                 dispatch( set_month_bath_price( 0 ) )
                 dispatch( set_month_beauty_price( 0 ) )

             }

             
    } , [ current_Plan_Type , currnet_Species_Id , species_Prices ] ) ;


} ;
