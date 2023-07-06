/* eslint-disable react/jsx-pascal-case */
import { useEffect } from "react" ;
import { useDispatch } from "react-redux";

import { set_current_plan_type } from 'store/actions/action_Plan' ;
import { set_Current_Species_Select_Id } from "store/actions/action_Pet" ;

import Admin_Data_Render from "templates/layout/Admin_Data_Render" ; 



/* @ 方案 ( 預設、自訂 ) */
const Plans = ( ) => {

    const dispatch = useDispatch() ;

    
    // 先清空 : 目前方案類型( 名稱 )、寵物品種 id --> 點選方案類型時，才會顯示 : 編輯狀態版面
    useEffect( () => { 
    
        dispatch( set_current_plan_type( '' ) ) ;
        dispatch( set_Current_Species_Select_Id( '' ) ) ; 

    } , [] ) ;


    return <Admin_Data_Render data_Type = { "plan" }  />

} ;

export default Plans