
import Service_Price_List from "components/management/price/Service_Price_List";
import { useFetch_Shop_Service_Type_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount"; 



/* @ 基礎 _ 服務價格清單 */
const Basic_Price = ( ) => {

  const data = useFetch_Shop_Service_Type_Prices( useAccount_Shop_Id() , '基礎' ) ;


  return <Service_Price_List data = { data } />

}  ;

export default Basic_Price

