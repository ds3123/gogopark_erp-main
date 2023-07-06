import { useDispatch , useSelector } from "react-redux";

import { set_Detail_Mode } from "store/actions/action_Index" ;



// 設定 _ 是否為詳細模式
export const useEffect_Is_Detail_Mode = () => {

     const dispatch = useDispatch() ;


    // 首頁詳細模式 ( 展開所有統計資料 )
    const is_Detail_Mode = useSelector(( state : any ) => state.Index.is_Detail_Mode ) ;

    // 點選 _ 詳細模式
    const click_Detail_Mode  = () => dispatch( set_Detail_Mode( !is_Detail_Mode ) );


    return { is_Detail_Mode , click_Detail_Mode }


} ;