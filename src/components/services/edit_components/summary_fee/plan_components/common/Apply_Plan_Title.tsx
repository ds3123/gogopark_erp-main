import { FC } from 'react' ;
import { useSelector } from 'react-redux'



// @ 標題 : 客戶、寵物、此次價格
const Apply_Plan_Title : FC = (  ) => {


   // 目前客戶區，所選擇或填入 : 客戶姓名 
   const current_Customer_Name = useSelector( ( state : any ) => state.Customer.Current_Customer )?.name ; 
  

   // 目前在寵物區，所點選寵物資料
   const current_Pet           = useSelector( ( state : any ) => state.Pet.current_Pet ) ;                


   return  <span className="tag is-large is-white m_Bottom_10">

             <b> 
                { current_Customer_Name && <> 客戶 : <span className="fDred"> { current_Customer_Name  } </span> / </> }
               
                寵物     : { current_Pet ?
                              <span className="fDred"> { current_Pet['name'] } ( { current_Pet['species'] } ) </span> :
                              <span className="fRed"> 尚未選擇品種  </span>
                          }  
                        
              
             </b> 

           </span>

} ;


export default Apply_Plan_Title
       