/* eslint-disable react/jsx-pascal-case */
import { useFetch_Customer_Pets_By_CustomerId } from "hooks/react-query/customer/useFetchCustomers" ;
import Customer_Other_Pets from "./Customer_Other_Pets" ;




// # 客戶資訊
const Customer_Info_Button : React.FC< { data : any } > = ( { data } ) => {

    
    // 客戶資料
    const cus = data?.customer ;

    // 寵物資料
    const pet = data?.pet ;


    // 該客戶所有寵物
    const customer_Pets = useFetch_Customer_Pets_By_CustomerId( cus?.id ) ;



  return <>
    
            <b className = "f_14" > <p> { cus?.name }  <span className = "f_12"> ( { cus?.mobile_phone } ) </span> </p>  </b> 
            
            <p> { cus?.id } </p>

            <Customer_Other_Pets data = { customer_Pets } current_Pet = { pet } />

         </>
} ;

export default Customer_Info_Button