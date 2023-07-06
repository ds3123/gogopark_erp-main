
import { useState } from 'react' ;
import { useDispatch  } from "react-redux" ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import Update_Price from "../../../prices/edit/Update_Price";




// 品種價格清單右側，處理 _ 自訂方案 ( 下拉選項相關設定 )
export const useEffect_Species_Custom_Plan = ( custom_Plans : any[] ) => {


     // 目前 : 自訂方案
     const [ current_Custom_Plan , set_Current_Custom_Plan ] = useState({
                                                                          plan_Name       : '',  // 方案名稱
                                                                          bath_Num        : 0 ,  // 洗澡次數
                                                                          beauty_Num      : 0 ,  // 美容次數
                                                                          plan_Period     : 0 ,  // 使用期限
                                                                          default_Price   : 0 ,  // 預設價格
                                                                          applied_Species : ''   // 方案套用品種
                                                                        }) ;

     // 顯示 : 方案
     const [ is_PlanInfo , set_Is_PlanInfo ] = useState( false ) ;


     // 切換 _ 自訂方案
    const handle_Custom_Plan_Change = ( plan_Name : string ) => {
   
        if( plan_Name === "請選擇" ){
          set_Is_PlanInfo( false ) ;
          return false
        }else{
          set_Is_PlanInfo( true ) ;
        }
  
        // 目前方案   
        const current_Plan = custom_Plans.filter( ( x : any ) => x['plan_name'] === plan_Name )[0] ;
 
        set_Current_Custom_Plan({ ...current_Custom_Plan ,
 
                                                    plan_Name       : current_Plan['plan_name'] ,          // 方案名稱   
                                                    bath_Num        : current_Plan['bath_num'] ,           // 洗澡次數
                                                    beauty_Num      : current_Plan['beauty_num'] ,         // 美容次數
                
                                                    plan_Period     : current_Plan['plan_period'] ,        // 使用期限
                                                    default_Price   : current_Plan['default_price'] ,      // 預設價格
                
                                                    applied_Species : current_Plan['plan_applied_species'] // 方案套用品種
       
                                 }) ;
  
 
 
    } ; 
    
    
    return { current_Custom_Plan , is_PlanInfo , handle_Custom_Plan_Change }


} ;


// 點選 _ 清單品種名稱，顯示右側價格資訊
export const useEffect_Species_Name_Click = () => {

    const dispatch = useDispatch() ;

    
    // 點選 _ 品種名稱
    const click_Species = ( species : any ) =>
          dispatch( set_Side_Panel( true , <Update_Price /> , { preLoadData : species , source_Create_Way : '寵物品種' } ) ) ;


   return click_Species


} ; 