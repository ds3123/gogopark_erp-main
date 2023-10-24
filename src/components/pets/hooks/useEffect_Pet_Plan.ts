
import { useSelector } from "react-redux";
import { useFetch_Pet_Plans } from "hooks/react-query/plan/useFetchPlans" ;



// 取得 _ 目前所點選寵物 ( current_Pet )，所有的方案
export const useEffect_Get_Current_Pet_Plans = () => {

     // 目前在寵物區，所點選寵物資料
     const current_Pet                  = useSelector( ( state : any ) => state.Pet.current_Pet ) ;
     // 寵物編號
     const current_Pet_Serial           = current_Pet ? current_Pet['serial'] : '' ; 
     
     // 特定寵物 _ 所有購買的方案  
     const { data : current_Pet_Plans } = useFetch_Pet_Plans( current_Pet_Serial ) ;

     return current_Pet_Plans ;

} ;