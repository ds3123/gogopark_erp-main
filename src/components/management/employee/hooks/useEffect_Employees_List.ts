

import { useState } from 'react' ;
import { Zipcode_Info } from "utils/Interface_Type" ;



// 設定、取得 _ 導覽元件的 : 郵遞區號、員工所屬店別區域編號
export const useEffect_ZipCode_ShopNum = () => {


    // 郵遞區號
    const [ zipcode , set_Zipcode ] = useState( "" ) ;

    // 區域店別編號
    const [ shopNum , set_ShopNum ] = useState( "" ) ;


    // 取得、回傳 : 郵遞區號
    const get_ZipCode_Info = ( info : Zipcode_Info ) => set_Zipcode( info['zipcode'] ) ;


    // 取得、回傳 : 區域店別編號
    const get_ShopNum      = ( num : string ) => set_ShopNum( num ) ;


    return { zipcode , shopNum , get_ZipCode_Info , get_ShopNum }


} ;