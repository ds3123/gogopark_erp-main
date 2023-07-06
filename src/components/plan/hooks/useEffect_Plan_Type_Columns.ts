/* eslint-disable react-hooks/exhaustive-deps */

import { useState , useEffect } from 'react' ;
import { useFetch_Shop_Custom_Plan_By_Name } from "hooks/react-query/plan/useFetchPlans" ;
import { useSelector } from "react-redux" ;
import { useFetch_Shop_Species_5_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { IService_5_Prices } from "utils/Interface_Type" ;



 // 設定 _ 所選擇方案 : 可洗澡、美容次數
export const useEffect_Set_Plan_Bath_Beauty_Num = ( shop_Id : string , current_Plan_Name : string ) => {


    // 洗澡次數、美容次數
    const [ service_Num , set_Service_Num ] = useState({ 'bath' : 0 , 'beauty' : 0 }) ;

    // 查詢 _ 目前所選擇 : 方案類型 ( 下拉選單 ) 的選項，是否為 : 自訂方案 ( 包月洗澡、包月美容以外 )
    const custom_Plan = useFetch_Shop_Custom_Plan_By_Name( shop_Id , current_Plan_Name ) ;


    // 設定 _ 方案 : 可洗澡、美容次數
    useEffect( () => {
      
       
      if( current_Plan_Name === '包月洗澡' && !custom_Plan ) set_Service_Num( { ...service_Num , 'bath' : 4 , 'beauty' : 0 } ) ;   
      if( current_Plan_Name === '包月美容' && !custom_Plan ) set_Service_Num( { ...service_Num , 'bath' : 3 , 'beauty' : 1 } ) ;   
    
      if( custom_Plan ) set_Service_Num( { ...service_Num , 'bath' : custom_Plan['bath_num'] , 'beauty' : custom_Plan['beauty_num'] } ) ; 



      return () => set_Service_Num( { ...service_Num , 'bath' : 0 , 'beauty' : 0 } ) ; 

       
    } , [ current_Plan_Name , custom_Plan ] ) ;


    return service_Num


} ;


// 設定 _ 所選擇方案 : 基本價格 ( 未加上自訂金額、接送費 ) -> 重要 : 再確認  2023.01.02
export const useEffect_Set_Plan_Basic_Price = ( shop_Id : string , current_Plan_Name : string ) : number => {


    // 基本價格  
    const [ current_Baisc_Price , set_Current_Baisc_Price ] = useState( 0 ) ;

    
    // 查詢 _ 目前所選擇 : 方案類型 ( 下拉選單 ) 的選項，是否為 : 自訂方案 ( 包月洗澡、包月美容以外 )
    const custom_Plan = useFetch_Shop_Custom_Plan_By_Name( shop_Id , current_Plan_Name ) ;

   
    // 所選擇寵物品種，預設價格
    const current_Species_Id = useSelector( ( state : any ) => state.Pet.current_Species_Id ) ;   // 目前 "寵物品種" 下拉選項所選擇 id ( species 資料表的 id )    
    
    // 特定品種，5 種基本價格 ( NOTE : 一率先採用狗狗公園定價 ( account_id === 1 )  )
    const species_5_Prices   = useFetch_Shop_Species_5_Service_Prices( "1" , current_Species_Id ) as IService_5_Prices ;
    const Month_Bath_Price   = species_5_Prices?.month_Bath     // 包月洗澡價格 ( 預設價格 ) 
    const Month_Beauty_Price = species_5_Prices?.month_Beauty ; // 包月美容價格 ( 預設價格 ) 


    // 目前所點選寵物資料
    const current_Pet  = useSelector( ( state : any ) => state.Pet.current_Pet ) ;


    /*

        # 設定 _ 方案基本價格 

         ＊ 如果有調整過 : 包月洗澡、包月美容價格，以此調整過的價格優先 

    */
    useEffect( () => {

    
       // 預設方案
       if( current_Plan_Name === '包月洗澡' ){ 

           const Adjust_Month_Bath = current_Pet?.month_bath_price ; // 調整後 _ 價格
           set_Current_Baisc_Price( Adjust_Month_Bath ? Adjust_Month_Bath : Month_Bath_Price ) ; 
        
       } ;  
      
       if( current_Plan_Name === '包月美容' ){ 

           const Adjust_Month_Beauty = current_Pet?.month_beauty_price ; // 調整後 _ 價格
           set_Current_Baisc_Price( Adjust_Month_Beauty ? Adjust_Month_Beauty : Month_Beauty_Price ) ; 
        
       } ; 

       
    // 自訂方案
       if( custom_Plan ) set_Current_Baisc_Price( custom_Plan['default_price'] ) ;


       return () => set_Current_Baisc_Price( 0 ) ;

       
    } , [ current_Plan_Name  , current_Species_Id , Month_Bath_Price , Month_Beauty_Price , custom_Plan , current_Pet ] ) ;


    return current_Baisc_Price ? current_Baisc_Price : 0 ;


} ;



// 設定 _ 購買此次方案，共計金額 / 應收金額 ( 基本價格 + 自訂金額 + 接送費 )
export const useEffect_Set_Plan_Receivable_Amount = ( shop_Id : string , current_Plan_Name : string ) : number => {

 
    const current_Baisc_Price = useEffect_Set_Plan_Basic_Price( shop_Id , current_Plan_Name ) ;  

    // 自行調整金額   
    const self_Adjust_Amount  = useSelector( ( state : any ) => state.Plan.self_Adjust_Amount ) ;  

    // 接送費   
    const service_Pickup_Fee  = useSelector( ( state : any ) => state.Plan.service_Pickup_Fee ) ;  

 
    return current_Baisc_Price + self_Adjust_Amount + service_Pickup_Fee ;

} ;