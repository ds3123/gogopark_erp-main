
import Service_Price_List from "components/management/price/Service_Price_List";

import { useAccount_Shop_Id } from "hooks/data/useAccount"; 
import { useFetch_Shop_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;



/* @ 所有服務 _ 價格清單 */
const Service_Price = ( ) => {


    const data = useFetch_Shop_Service_Prices( useAccount_Shop_Id() ) ;


    return <Service_Price_List data = { data } />

}  ;

export default Service_Price

