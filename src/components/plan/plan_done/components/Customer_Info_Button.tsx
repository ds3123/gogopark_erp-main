/* eslint-disable react/jsx-pascal-case */
import { useFetch_Customer_Pets_By_CustomerId } from "hooks/react-query/customer/useFetchCustomers" ;
import Customer_Pets_Info from "./Customer_Pets_Info" ;




// # 客戶資訊
const Customer_Info_Button : React.FC< { data : any } > = ( { data } ) => {

    
    // 客戶資料
    const cus = data?.customer ;


    // 該客戶所有寵物
    const customer_Pets = useFetch_Customer_Pets_By_CustomerId( cus?.id ) ;


    
  return <>
    
            <b className = "f_14" > <p> { cus?.name }  <span className = "f_12"> ( { cus?.mobile_phone } ) </span> </p>  </b> 
            
            <p> { cus?.id } </p>

            <Customer_Pets_Info data = { customer_Pets } />

         </>
} ;

export default Customer_Info_Button