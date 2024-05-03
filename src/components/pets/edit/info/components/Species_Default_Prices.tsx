
import { IService_5_Prices } from "utils/Interface_Type" ;


/*

   ＠ 寵物品種基本價格 :
      1. 初次洗澡
      2. 單次洗澡
      3. 包月洗澡
      4. 單次美容
      5. 包月美容

*/


type Defaut = {

   species        : string ; 
   species_Prices : IService_5_Prices ;

}


const position = { top : "-5px" , left : "10px" } ;
const columns  = "columns is-multiline is-mobile relative" ;



const Species_Default_Prices = ( { species , species_Prices } : Defaut ) => {

 

    return <>
    
              <b className="tag is-large is-white m_Bottom_30">  
                  <i className="fas fa-dollar-sign"></i>&nbsp;品種標準價格 ( <span className="fDblue" > &nbsp;{ species }&nbsp;</span> ) 
              </b> 

              <div className={ columns } >

                <div className="column is-offset-1 is-2-desktop">  <span className="fOrange">  初次洗澡 </span> : <b className="fRed"> { species_Prices?.first_Bath } </b> </div>      
                <div className="column is-2-desktop"> 單次洗澡 : <b className="fRed"> { species_Prices?.single_Bath } </b> </div>      
                <div className="column is-2-desktop relative"> 
                        包月洗澡 
                        <span className=" absolute fDblue f_9" style={ position }> ( 4 次洗澡 ) </span>   : 
                        <b className="fRed"> { species_Prices?.month_Bath } </b> 
                </div>   
                <div className="column is-2-desktop"> 單次美容 : <b className="fRed"> { species_Prices?.single_Beauty } </b> </div>      
                <div className="column is-2-desktop relative"> 
                    包月美容 
                    <span className=" absolute fDblue f_9" style={ position }> ( 3 次洗澡 ， 1 次美容 ) </span>   : 
                    <b className="fRed"> { species_Prices?.month_Beauty } </b> 
                </div>      

              </div>
               
           </>
    
    
} ;

export default Species_Default_Prices 
       