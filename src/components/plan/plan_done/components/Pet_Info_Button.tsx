/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { useStore_Plan } from "store/zustand/plan_store";
import Pet_Not_Done_Plans from './Pet_Not_Done_Plans';


// # 寵物資訊
const Pet_Info_Button : React.FC< { data : any } > = ( { data } ) => {


    // 寵物資料
    const pet = data?.pet ;


    // 店家所有方案 ( 近 300 筆 )
    const shop_All_Plans     = useStore_Plan( state => state.shop_plans ) ;
    

  return <>


              <b className = "f_14" > 
                 <p> { pet?.name }  <span className = "f_11"> ( { pet?.species } ) </span> </p> 
              </b> 
              
              <p> { pet?.serial } </p>  


              <Pet_Not_Done_Plans data = { shop_All_Plans } current_Pet = { pet } />

             
         </>
} ;

export default Pet_Info_Button  