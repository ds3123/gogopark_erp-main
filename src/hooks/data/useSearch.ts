

import { useState } from 'react' ;



// 搜尋關鍵字
export const useSearch_Keyword = () => {

    // 所輸入 : 搜尋關鍵字
    const [ search_Keyword , set_SearchKeyword ] = useState( "" ) ; 

    // 取得 _ 搜尋框中的文字
    const get_SearchKeyword = ( value : string ) => set_SearchKeyword( value ) ; 

    return { search_Keyword , get_SearchKeyword }


} ;