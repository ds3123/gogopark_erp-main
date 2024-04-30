/* eslint-disable react/jsx-pascal-case */
import { FC } from 'react' ;
import { usePlan_Filter_By_Type } from "hooks/data/usePlan" ;
import { useSelector } from "react-redux" ;
import { useEffect_Get_Current_Pet_Plans } from "components/pets/hooks/useEffect_Pet_Plan" ;
import Plan_Status_Tabs from './plan_status/Plan_Status_Tabs' ;


// @ 特定寵物，所有購買、可供使用的方案選項
const Apply_Plan_Options : FC = ( ) => {


      // 目前所點選 _ 新增類別標籤
      const current_Create_Tab    = useSelector(( state : any ) => state.Service.current_Create_Tab ) ;

      // 取得 _ 目前所點選寵物 ( current_Pet )，所有的方案
      const current_Pet_All_Plans = useEffect_Get_Current_Pet_Plans() ;

      // < T > 特定寵物 : 所有購買方案，依所處新增 _ 洗澡 或 美容 頁籤，顯示可用方案 ( 並依 "建檔日期" 欄位 ( created_at ）: 新 -> 舊 )
      const plan_Options          = usePlan_Filter_By_Type( current_Create_Tab , current_Pet_All_Plans ) ;

      
    return <>

              <Plan_Status_Tabs plan_Options = { plan_Options } />
 
           </>

} ;

export default Apply_Plan_Options
       