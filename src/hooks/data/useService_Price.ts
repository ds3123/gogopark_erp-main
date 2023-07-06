/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react' ;
import { useSelector , useDispatch } from "react-redux" ;
import { set_Current_Create_Service_Type } from "store/actions/action_Service" ;
import { useFetch_Shop_Species_5_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { useFetch_Services_By_PetSeial_ServiceType } from "hooks/react-query/service/useFetchServices" ;
import { IService_5_Prices } from "utils/Interface_Type" ;


// 取得 _ 目前點選寵物，在特定服務類型 ( 洗澡 / 美容 ) 下，其所有服務紀錄 --> 用以判斷 : 初次洗澡、單次洗澡
const useFetch_Current_Pet_Type_Records = () => {

     // 目前新增類型標籤
     const current_Tab  = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;

     // 目前所點選寵物資料
     const current_Pet  = useSelector( ( state : any ) => state.Pet.current_Pet ) ;
 

     // 取得 _ 服務紀錄
     const pet_Type_Service_Records = useFetch_Services_By_PetSeial_ServiceType( current_Pet?.serial , current_Tab ) ; 

     return pet_Type_Service_Records

} ;


// 取得 _ 特定店家，特定寵物品種 id ( 欄位 : species_id )，5 種 < 基本服務價格 > : 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容
const useFetch_Current_Pet_Species_Prices = () => {


    // 目前寵物資料 > 品種 ( 品種 id / 下拉選單 )
    const current_Species_Id  = useSelector( ( state : any ) => state.Pet.current_Species_Id ) ;

    // < NOTE > : 一律採取狗狗公園定價 ( account_id === 1 )，否則切換到其他帳號，會讀取不到  2023.01.07
    const { 

            first_Bath ,   // 初次洗澡優惠 
            single_Bath ,  // 單次洗澡
            single_Beauty  // 單次美容
         
          } = useFetch_Shop_Species_5_Service_Prices( "1" , current_Species_Id ) as IService_5_Prices ;


    return { first_Bath , single_Bath , single_Beauty }      

} ;



/*

     # 設定 _ 洗澡 / 美容 ( 初次洗澡優惠 、單次洗澡、單次美容 ) ：

         1. 預設（ 品種 ）基本價格 
         2. 服務型態 : 初次洗澡優惠 / 單次洗澡 / 單次美容 

*/ 
export const useEffect_Set_BathBeauty_Price_Type_By_SpeciesId = () : number => {


    // 洗澡 或 品種，此次服務 : 基本 / 品種 價格 
    const [ basic_Price , set_Basic_Price ] = useState( 0 ) ;


    const dispatch     = useDispatch() ;

    // 目前新增類型標籤
    const current_Tab  = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;

    // 目前所點選寵物資料
    const current_Pet  = useSelector( ( state : any ) => state.Pet.current_Pet ) ;
    
   
    // 目前點選寵物，在特定服務類型 ( 洗澡 / 美容 ) 下，其所有服務紀錄 --> 用以判斷 : 初次洗澡、單次洗澡
    const pet_Type_Service_Records = useFetch_Current_Pet_Type_Records() ;

 
    // 目前選擇品種基本價格 : 初次洗澡優惠、單次洗澡、單次美容
    const { first_Bath , single_Bath , single_Beauty } = useFetch_Current_Pet_Species_Prices() ;


    // ------------


    const is_No_Records     = pet_Type_Service_Records?.length === 0 ;
    const is_Having_Records = pet_Type_Service_Records?.length > 0 ;

    // 設定 _ 此次 ( 洗澡 / 美容 ) 服務 : 付費類型 ( 初次洗澡優惠、單次洗澡、單次美容 )
    const set_Service_Price_Type = () => {

        let type = "" ;

        if( current_Tab === '洗澡' && is_No_Records )     type = "初次洗澡優惠" ;               
        if( current_Tab === '洗澡' && is_Having_Records ) type = "單次洗澡" ;           
        if( current_Tab === '美容' )                      type = "單次美容" ;

        // 設定 _ 付費類型
        dispatch( set_Current_Create_Service_Type( type ) ) ;

    } ;

    // 設定 _ 此次 ( 洗澡 / 美容 ) 服務 : 基本價格 ( 初次洗澡、單次洗澡、單次美容 )
    const set_Service_Basic_Price = () => {

        let price = 0 ;

        // 初次洗澡
        if( current_Tab === '洗澡' && is_No_Records ) price = first_Bath ;  

        // 單次洗澡
        if( current_Tab === '洗澡' && is_Having_Records ){

            // 調整後 _ 洗澡基本價格
            const adjusted_Bath = current_Pet?.single_bath_price ; 
           
            // * 若洗澡有調整價格，以調整後的價格為主
            price = adjusted_Bath ? adjusted_Bath : single_Bath ; 

        }  

        // 單次美容
        if( current_Tab === '美容' ){

            // 調整後 _ 美容基本價格
            const adjusted_Beauty = current_Pet?.single_beauty_price ; 

            // * 若美容有調整價格，以調整後的價格為主
            price = adjusted_Beauty ? adjusted_Beauty : single_Beauty ; 

        }                      

        set_Basic_Price( price )
    
    } ;
    
   
    // 判斷、設定 _ 目前新增的 : 服務價格 & 服務類型( 初次洗澡優惠、單次洗澡、單次美容 )
    useEffect( () => { 

        set_Service_Price_Type() ;
        
        set_Service_Basic_Price();
   
    } , [ current_Tab , first_Bath , single_Bath , single_Beauty , pet_Type_Service_Records ] ) ;


    return basic_Price

} ;