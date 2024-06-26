/* eslint-disable react-hooks/exhaustive-deps */
import { useState , useEffect } from "react" ;
import axios from "utils/axios" ;



/* @ GET : 透過 Ajax _ 取得資料 */

// # 服務資料 ----



// * 取得 : 特定日期 【 之後 】，所有服務 ( 包含 : 客人、客人關係人、寵物 )
export const useRead_After_Date_Services = ( date : string ) => {

    const [ data , set_Data ] = useState( [] ) ;

    // 取得資料
    useEffect( () => {

        axios.get( `/services/show_after_services/${ date }` ).then( res => { set_Data( res.data ) ; } );

    } , [ date ] ) ;

    return data ;

} ; 



// # 寵物 ---

// 依照 _ 寵物編號
export const useRead_Pet_By_Serial = ( serial : string ) => {

    const [ data , set_Data ] = useState([] ) ;

    useEffect(( ) => {

       axios.get(`/pets/${ serial }`).then( res => set_Data( res.data ) ) ;

    } , [ serial ] );

    return data ;

} ;


// # 方案 ( Ex. 包月洗澡 ... ) ---




// # 品種 & 價錢 ----

// 依照品種資料表的 欄位 與 欄位值，查詢是否已有該品種資料
export const useRead_Species_By_Column = ( column : string , value : string | number ) => {

    const [ data , set_Data ] = useState([] ) ;

    useEffect(( ) => {

        if( column && value ){
            axios.get( `/pet_species/show_by_col_param/${ column }/${ value }` ).then( res => set_Data( res.data ) ) ;
        }

        // 沒有查詢值，設回空陣列
        if( !value ) set_Data([] ) ;

    } , [ column , value ] );

    return { data } ;

} ;


// 時間按鈕紀錄 ( 美容師區中，美容師點選時間按鈕紀錄 )
export const useRead_TimeRecord_By_Id_Button = ( table_id : string , button : string ) => {

    const [ timeRecord , set_TimeRecord ] = useState( [] ) ;

    useEffect(() => {

        axios.get( `/time_records/show_by_id_button/${ table_id }/${ button }` ).then( res => { set_TimeRecord( res.data ) ; } );

    } , [] ) ;

    return timeRecord ;

} ;



// # 住宿

// 所有住宿
export const useRead_All_Lodges = ( ) => {

    const [ lodges , set_Lodges ] = useState([]);

    useEffect( () => {

       axios.get( '/lodges' ).then( res => { set_Lodges( res.data ) ; } );

    } , [] ) ;

    return lodges ;

} ;
