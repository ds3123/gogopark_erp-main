/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
// useContext
import { useContext } from "react"
import { SidePanelContext } from "templates/panel/Side_Panel";
import Species_Default_Prices from "components/pets/edit/info/components/Species_Default_Prices" ;
import Adjust_Price_Section from "components/pets/edit/info/components/Adjust_Price_Section" ;
import Species_Adjust_Prices from "components/pets/edit/info/components/Species_Adjust_Prices" ;
import Price_Difference_Info from "components/pets/edit/info/components/Price_Difference_Info" ;
import { useFetch_Shop_Species_5_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { IService_5_Prices } from "utils/Interface_Type" ;



type Status = {
   register : any ;
   setValue : any ;
}


const cal = { top : "110px" , right:"50px" , zIndex :200 } ;


/*

  ＠ 寵物個別定價 :
     1.標準價格
     2.個別手動調整 ( 加減、百分比 )
     3.調整後價格  

*/
const Pet_Prices_Status = ( { register , setValue } : Status ) => {

    // 目前登入者，所屬店家 id
    const value      = useContext( SidePanelContext ) ;              
    const pet        = value.preLoadData ? value.preLoadData : {} ;
    const species    = pet?.species ;                                // 品種名稱
    const species_Id = pet?.species_id ;   // 寵物品種 id

    /*

        # 取得 _ 特定店家，特定寵物品種 id ( 欄位 : species_id )，5 種基本服務價格 : 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容 
    
         NOTE : 一率先採用狗狗公園定價 ( account_id === 1 ) ，否則其他帳號，會讀取不到 2023.01.09
    
    */ 
    const species_5_Prices = useFetch_Shop_Species_5_Service_Prices( "1" , species_Id ) as IService_5_Prices ;

    
    const [ is_Show_Adjust , set_Is_Show_Adjust  ] = useState( false ) ; // 是否顯示：調整金額輸入框
   

    return <div className="relative">

              <hr className="m_Bottom_50"/>

              { /* 是否顯示：調整金額輸入框  */ }
              <b className = { `absolute tag is-medium is-rounded pointer ${ is_Show_Adjust ? "is-primary" : "hover" }` } 
                 style     = { cal }
                 onClick   = { () => set_Is_Show_Adjust( !is_Show_Adjust ) } >  <i className="fas fa-calculator"></i> </b>

              { /* 品種標準價格  */ }
              <Species_Default_Prices species = { species } species_Prices = { species_5_Prices } /> 
             
              { /* 調整金額輸入框 */ }
              { is_Show_Adjust &&
                 <Adjust_Price_Section species_Prices = { species_5_Prices } setValue = { setValue } />
              }

              { /* 調整後金額 */ }
              <Species_Adjust_Prices register = { register } />
             
              { /*  調整差價顯示資訊  */ }
              { is_Show_Adjust || 
                 <Price_Difference_Info species_Prices = { species_5_Prices } />
              }

             <hr className="m_Bottom_50"/>
    
           </div> 
           
           
} ;

export default Pet_Prices_Status 
       



