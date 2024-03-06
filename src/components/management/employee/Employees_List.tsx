/* eslint-disable react/jsx-pascal-case */

import Employees_Nav from "./Employees_Nav" ;
import Employees_Table from "./Employees_Table" ;
import { useFetch_Shop_Employees } from "hooks/react-query/employee/useFetchEmployees" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useEffect_ZipCode_ShopNum } from "./hooks/useEffect_Employees_List" ;


/* 管理區 _ 員工 */
const Employees_List = () => {


    // 設定、取得 _ 導覽元件的 : 郵遞區號、員工所屬店別區域編號
    const { zipcode , shopNum , get_ZipCode_Info , get_ShopNum } = useEffect_ZipCode_ShopNum() ;


    // 登入者所屬店家 id
    const shop_Id = useAccount_Shop_Id() ;


    // 取得 _ 特定商店，所有員工資料
    const data = useFetch_Shop_Employees( shop_Id ) ;


   return <>

            { /* 導覽 ( Nav ) 區塊 */ } 
            <Employees_Nav />

            { /* 資料表格清單 */ }
            <Employees_Table data = { data } zipcode = { zipcode }  shopNum = { shopNum } />
             
         </> 
           

} ;

export default Employees_List


