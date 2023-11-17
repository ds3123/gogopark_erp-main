import { useFetch_Others_By_CreatedDate } from "hooks/react-query/other/useFetchOther" 


/*

   @ 其他：收入 / 支出

*/


// 取得 _ 特定日期 ( 付款日期 )，其他資料 : < 其他 : 收入 > < 其他 : 支出 >
export const useEffect_Get_Other_Data = ( shop_Id : string , query_Date : string ) => {


    // 所有其他資料 ( 收入 + 支出 )
    const all_Others  = useFetch_Others_By_CreatedDate( shop_Id , query_Date ) ;

    // 收入
    const income      = all_Others.filter( ( x : any ) => x['type'] === "收入" ) ;

    // 支出
    const expenditure = all_Others.filter( ( x:any ) => x['type'] === "支出" ) ;

    return { income , expenditure } ;
    

}