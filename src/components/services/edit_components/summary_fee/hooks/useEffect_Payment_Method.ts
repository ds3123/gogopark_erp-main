/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react' ;
import { useSelector } from "react-redux";
import { usePet_Is_Plans_Available } from 'hooks/data/usePet' ;


// # 新增服務時， 付款方式 : 相關 effect
export const useEffect_Payment_Method_Create = ( current : string , setValue : any , set_Current_Payment_Method : any ) => {

     // # for 新增
     const current_Pet        = useSelector( ( state : any ) => state.Pet.current_Pet ) ;  // 取得 _ 目前所點選寵物
     const is_Plans_Available = usePet_Is_Plans_Available( current_Pet?.serial ) ;         // 判斷 _ 特定寵物，是否能有方案，可供使用
  
    // 依照是否仍有 : 方案使用額度，設定 _ 預設上，欄位 : 付款方式，是否先顯示為 "方案"
    useEffect( () => {

      // 使用設定 "方案" 選項 （ 僅：洗澡、美容 ）
      const is_Plan = is_Plans_Available && ( current === '洗澡' || current === '美容' )  ;

      // 設定 _ select 欄位值
      setValue( 'payment_Method' , is_Plan ? '方案' : '現金' ) ; 

      // 設定 _ 目前付款方式
      set_Current_Payment_Method( is_Plan ? '方案' : '現金' ) ;

        
    } , [ current , current_Pet?.serial , is_Plans_Available ] ) ;


} ;