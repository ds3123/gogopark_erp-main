import { useState , useEffect } from 'react' ;
import { useSelector } from "react-redux";
import { useFetch_Species } from "hooks/react-query/species/useFetchSpecies" ;
import { useFetch_Shop_Custom_Plan_By_Name } from "hooks/react-query/plan/useFetchPlans"
import { useAccount_Shop_Id } from "hooks/data/useAccount";



// 取得 _ 目前所選擇 : 方案類型 ( 下拉選單 )，所對應的寵物品種下拉選項
export const useEffect_Species_Select_Options = () => {
    

    const shop_Id           = useAccount_Shop_Id() ; // 目前登入者，所屬店家 id
    
    const all_Pet_Species   = useFetch_Species() ;  // 取得 _ 所有寵物品種資料   

    const current_Plan_Name = useSelector( ( state : any ) => state.Plan.current_Plan_Type ) ;  // 目前所選擇 : 方案類型

    const [ species_Options , set_Species_Options ] = useState<any[]>( [] ) ;                   // 設定 _ 寵物品種下拉選項                          


    // 取得 _ 目前所選擇 : 方案類型 ( 下拉選單 ) 的資料 
    const custom_Plan = useFetch_Shop_Custom_Plan_By_Name( shop_Id , current_Plan_Name ) ; 

    


    // 設定 _ 寵物品種 : 下拉選項 
    useEffect( () => {
      
        // 為預設方案
        const is_Default_Plan = current_Plan_Name === '包月洗澡' || current_Plan_Name === '包月美容' ;


        // < 預設方案 > : 包月洗澡 / 包月美容 
        if( is_Default_Plan ) set_Species_Options( () => all_Pet_Species ) ;

        
        // < 自訂方案 >
        if( !is_Default_Plan && custom_Plan ){

            // 自訂方案所套用的品種 : 序號 ( serial )
            const customPlan_Applied_Species    = custom_Plan['plan_applied_species'] ? custom_Plan['plan_applied_species'].split(',') : [] ;       

            // 從所有品種中，篩選出 _ 自訂方案
            const custom_Plan_Available_Species = all_Pet_Species.filter( ( x ) => customPlan_Applied_Species.includes( x['serial'] ) ) ;

            // 設定 _ 自訂方案 : 下拉選項 
            set_Species_Options( custom_Plan_Available_Species ) ;

        }

        return () => set_Species_Options( [] ) ;


    } , [ current_Plan_Name , all_Pet_Species , custom_Plan ] ) ;



    return species_Options


} ;

