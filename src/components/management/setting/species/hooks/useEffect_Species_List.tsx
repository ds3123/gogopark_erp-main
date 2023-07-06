
import { useState , useEffect } from 'react' ;
import axios from 'utils/axios' ;
import cookie from 'react-cookies';
import { Toast } from 'templates/note/Toast';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Species from "components/management/setting/species/edit/Update_Species";




// 點選 _ 品種名稱，右側顯示品種資訊
export const useEffect_Click_Info = () => {

    const dispatch = useDispatch() ;
    
    // 點選 _ 品種名稱
    const click_Species  = ( species : any ) => dispatch( set_Side_Panel( true , <Update_Species /> , { preLoadData : species } ) ) ;


    return click_Species


} ;




// 點選 _ 向上、向下排序 ( 尚未使用 2022.12.17 )
export const useEffect_Species_Sort_Click = ( data : any[] ) => {

    // 目前品種資料排序現況
    const [ species , set_Species ] = useState< any[] >( [] ) ;


     // 點選 _ 向上排序
     const click_Up   = ( index : number ) => {

        if( index === 0 ){ alert( '已為第一個項目' ) ; return false ; }

        // # 前端排序 --------------------------

        let _species : any = [ ...species ] ;

        // 取得 _ 所刪除項目
        const deleteItem = _species.splice( index-1 ,1 ) ;

        // 新增 _ 所刪除項目
        _species.splice( index+1 , 0 , deleteItem[0] ) ;


        // 設定、渲染畫面
        set_Species( _species ) ;


    } ;

    // 點選 _ 向下排序
    const click_Down = ( index : number ) => {

        const maxIndex = ( species.length ) - 1 ;
        if( index === maxIndex ){ alert( '已為最後一個項目' ) ; return false ; }

        // # 前端排序  --------------------------
        let _species : any = [ ...species ] ;

        // 取得 _ 所刪除項目
        const deleteItem = _species.splice( index+1 ,1 ) ;

        // 新增 _ 所刪除項目
        _species.splice( index , 0 , deleteItem[0] ) ;

        // 設定、渲染畫面
        set_Species( _species ) ;

    } ;


    
    // 取得、設定資料
    useEffect( ( ) => {

       if( data.length > 0 ) set_Species( data ) ;
  
    } , [ data ] ) ;
  

    return { species , click_Up ,  click_Down }
    

} ;


// 點選 _ 更新 :資料庫排序 ( 尚未使用 2022.12.17 )
export const useEffect_Species_Sort_Refresh = () => {

    const history = useHistory() ;

    // # 更新 _ 資料庫排序
    const refresh_Data = ( species_Data : any[] ) => {

        // 依照資料表( species_sorts )欄位，重組資料
        const postArr = species_Data.map( ( x:any ) => {
            return { pet_id : x['id'] , pet_name : x['name'] } ;
        }) ;


        // 以 POST 方法，傳送 ( 大量 / 陣列 ) 資料
        axios.post( `/species_sorts/create_multi_data` , postArr ).then( res => {

            // 新增成功通知
            Toast(`🦄 ${ res.data } ` )

            // 設定 cookie ( for 前往 : 系統設定 / 5 秒後銷毀 )
            cookie.save( 'after_Created_Redirect' , '系統設定_寵物品種' , { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath" ) ;  // 錯誤路徑
            history.push("/management" ) ; // 正確路徑

        })

    } ;

    return refresh_Data


}