
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useFetch_Shop_All_Holidays } from "hooks/react-query/lodge/useFetchHoliday" ;
import { get_Lodge_Convert_Single_Date } from "fp/lodges/read/get_Lodge" ;



// 取得 _ 特定店家，所有熱門時段日期
export const useEffect_Shop_Lodge_Holidays = () => {


    // 目前登入者所屬店家 id
    const shop_Id         = useAccount_Shop_Id() ;

    // 特定店家，所有熱門時段
    const shopAllHolidays = useFetch_Shop_All_Holidays( shop_Id ) ;

    // 轉換格式
    const nationalHolidays = get_Lodge_Convert_Single_Date( shopAllHolidays ) ;


    return nationalHolidays ;


} ;