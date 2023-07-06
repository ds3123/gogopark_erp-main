/* eslint-disable react-hooks/exhaustive-deps */
import { useAccount_Shop } from 'hooks/data/useAccount';


type Sum = {
   data_Sum   : number ;  // 顯示資料筆數
}





// @ 資料列表筆數
const Data_List_Sum = ( { data_Sum } : Sum ) => {

   
   // 目前登入帳號，所屬店家資訊
   const shopInfo = useAccount_Shop() ; 


   return  <span className="tag is-medium is-rounded m_Bottom_30" style={{ float:"right" }}> 
   
              店家 : &nbsp; <span className="fDred"> { shopInfo["name"] } </span> （ { shopInfo["zipcode"] }-{ shopInfo["num"] } ）&nbsp;/&nbsp; 資料筆數 : &nbsp;
            
                   <span className="fGreen"> { data_Sum }  </span> &nbsp;

           </span>   


} ;

export default Data_List_Sum
       