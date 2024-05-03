


// useContext
import { useContext } from "react" ;
import { SidePanelContext } from "templates/panel/Side_Panel";


import { IService_5_Prices } from "utils/Interface_Type" ;


/*

    ＠ 顯示價格調整前後訊息

*/


type Info = {

    species_Prices : IService_5_Prices ;
 
 }
 

const Price_Difference_Info = ( { species_Prices } : Info ) => {


    const value = useContext( SidePanelContext ) ;          // 取得 context 值
    const pet   = value.preLoadData ? value.preLoadData : {} ;


    
    // 品種基本價格 
    const single_Bath   = species_Prices?.single_Bath ? species_Prices?.single_Bath : 0 ;
    const month_Bath    = species_Prices?.month_Bath ? species_Prices?.month_Bath  : 0 ;
    const single_Beauty = species_Prices?.single_Beauty ? species_Prices?.single_Beauty : 0 ;
    const month_Beauty  = species_Prices?.month_Beauty ? species_Prices?.month_Beauty : 0 ;


    // 資料庫中已儲存價格
    const data_Single_Bath   = pet.single_bath_price ? pet.single_bath_price : '' ;       // 單次洗澡
    const data_Month_Bath    = pet.month_bath_price ? pet.month_bath_price : '' ;         // 包月洗澡  
    const data_Single_Beauty = pet.single_beauty_price ? pet.single_beauty_price : '' ;   // 單次美容
    const data_Month_Beauty  = pet.month_beauty_price ? pet.month_beauty_price : '' ;     // 包月美容


    // 差價
    const diff_Single_Bath   = data_Single_Bath ? data_Single_Bath - single_Bath : "" ;
    const diff_Month_Bath    = data_Month_Bath ? data_Month_Bath - month_Bath : "" ;
   
    const diff_Single_Beauty = data_Single_Beauty ? data_Single_Beauty - single_Beauty : "" ;
    const diff_Month_Beauty  = data_Month_Beauty ? data_Month_Beauty - month_Beauty : "" ;


    // 調整後的價格
    // const adjust_Single_Bath   = useSelector( ( state : any ) => state.Price.adjust_Single_Bath ) ;
    // const adjust_Single_Beauty = useSelector( ( state : any ) => state.Price.adjust_Single_Beauty ) ;
    // const adjust_Month_Bath    = useSelector( ( state : any ) => state.Price.adjust_Month_Bath ) ;
    // const adjust_Month_Beauty  = useSelector( ( state : any ) => state.Price.adjust_Month_Beauty ) ;



   const get_Style = ( fee : number | "" ) => `tag is-medium w-full is-light is-rounded ${ ( fee && fee > 0 ) ? 'is-success' : 'is-danger' }` ;



   return <div className="columns is-multiline is-mobile relative" >
 

              { /* 單次洗澡 */ }
              <div className="column is-offset-3 is-2-desktop">

                { ( data_Single_Bath && diff_Single_Bath ) &&

                    <b className = { get_Style( diff_Single_Bath ) } > 
                       差額 ： { diff_Single_Bath  }
                    </b>
                 
                 }    

              </div>
              
              { /* 包月洗澡 */ }
              <div className="column is-2-desktop">

                { data_Month_Bath && 

                    <b className = { get_Style( diff_Month_Bath ) } > 
                       差額 ：  {  diff_Month_Bath }
                    </b>

                 }  
    
              </div>
              
              { /* 單次美容 */ }
              <div className="column is-2-desktop">

                { data_Single_Beauty &&
    
                    <b className = { get_Style( diff_Single_Beauty ) } > 
                      差額 ： { diff_Single_Beauty }
                    </b>   

                }  

              </div>
              
              { /* 包月美容 */ }
              <div className="column is-2-desktop">

                { data_Month_Beauty &&  

                    <b className= { get_Style( diff_Month_Beauty ) } > 
                      差額 ： { diff_Month_Beauty } 
                    </b>

                } 

              </div>
        
          </div>


} ;

export default Price_Difference_Info
       