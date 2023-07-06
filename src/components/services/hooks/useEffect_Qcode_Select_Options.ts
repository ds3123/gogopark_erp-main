/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { useState , useEffect , useMemo } from 'react' ;
import { set_Current_Q_Code } from "store/actions/action_Info" ;

import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useSelector } from "react-redux" ;
import { useFetch_Shop_ServiceDate_Used_Qcodes } from "hooks/react-query/service/useFetchServices" ;

import { fetch_Shop_ServiceDate_Used_Qcodes } from "utils/api/api_Service" ;


 // 建立 _ 預設 : Q 碼編號 ( 1 ~ 60 )
const set_Default_Qcodes = () : any[] => {


    let default_Q_arr = [] as any[] ;

    for( let i = 1 as any ; i <= 60 ; i++ ){

        if( i<10 ){ i = '0'+i ; }                 // 小於 10 , 加 "0"
        default_Q_arr.push( i.toString() ) ;

    }

    return default_Q_arr

} ;





// 取得 _ 當天 / 目前 可使用的 Qcode
export const useEffect_Filter_Available_Qcodes = () => {


     // 目前登入者，所屬店家 id    
     const shop_Id      = useAccount_Shop_Id() ;

     // 到店日期( 預設 : 今日 )
     const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;


    // 可供使用的 Q_code
    let [ available_Qcode , set_Ava_Q ] = useState<any[]>([] );


    // 預設 : Q 碼編號 ( 1 ~ 60 )
    const default_Q_arr = useMemo( () => set_Default_Qcodes() , [] ) ; 


    

    useEffect( () => {

        let is_Mounted = true ;

        // 特定日期 ( 日期由 Redux 取得 )，所有服務，"已被使用" 的 Q 碼
        fetch_Shop_ServiceDate_Used_Qcodes( shop_Id  , service_Date ).then( qcodes_Used_By_Date => {

            // 取得 : 當天 /  目前可供使用 Q 碼
            const avaiable_Q_Arr = default_Q_arr.filter( x => qcodes_Used_By_Date.indexOf( x ) === -1 ) ;

            if( is_Mounted ) set_Ava_Q( avaiable_Q_Arr ) ;

        } ) ;

        return () => { is_Mounted = false ; } 
       

     } , [ service_Date ] ) ;  // 監控 _ 到店日期
    

   return available_Qcode


} ;



/*

    * 設定 _ 初始 State ( Qcode ) 

    * Ｑcode 下拉變動處理 _ 設定  Store State  
     

*/ 
export const useEffect_Change_Qcode_Select = ( available_Qcode : string[] ) => {


    const dispatch = useDispatch();


    // 變動處理函式
    const change_Qcode_Select = ( qCode : string ) => {
    
        // 設定 Store State ( 供 Create_Data_Container 提交時，設定 shop_Q_Code 欄位用 )
        dispatch( set_Current_Q_Code( qCode ) );  // S

    } ;


    // 設定 _ 初始 State
    useEffect( () => {

       dispatch( set_Current_Q_Code( available_Qcode[0] ) ) ;
 
    } , [ available_Qcode ] ) ;



    return change_Qcode_Select

} ;

