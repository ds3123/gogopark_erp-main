/* eslint-disable react/jsx-pascal-case */

import { useSelector } from "react-redux";
import SearchBar from "templates/search/SearchBar";
import Search_Type_Note from "templates/search/Search_Type_Note";
import { Services } from "utils/Interface_Type" ;
import Second_Nav_Options from "./Second_Nav_Options";

import Second_Nav_Service_Filters from "templates/nav/Second_Nav_Service_Filters" ;
import Second_Nav_Lodge_Filters from "templates/nav/Second_Nav_Lodge_Filters" ;


type Nav = {

    data_Type       : Services ;                   // 資料類型 ( Ex. customer , pet , service , lodge , care , plan )
    get_Search_Text : ( value : string ) => void ; // 取得、回傳 _ 搜尋框文字
    refetch?         : any
}


// for 共同版面 
const Data_List_Nav = ( { data_Type , get_Search_Text , refetch } : Nav ) => {

    // # 客戶 : 客戶關係人相關資訊
    const is_Relatives_Info = useSelector( ( state : any ) => state.Search.iS_Csutomer_Relative_Info ) ;


    return <div className="columns is-multiline is-variable is-12 m_Bottom_50">

                { /* 第二層標籤選項 */ } 
                <div className="column is-4-desktop">

                    <Second_Nav_Options data_Type = { data_Type } />

                </div>

                { /* 額外篩選條件 */ }
                <div className="column is-4-desktop">
 
                   { /* 洗 美 */ }
                   {  data_Type === "service" && <Second_Nav_Service_Filters />  }

                   { /* 住 宿 */ }
                   {  data_Type === "lodge" && <Second_Nav_Lodge_Filters />  }

                </div>

                <div className="column is-4-desktop">

                    { /* 可搜尋類型提示 */ }  
                    <Search_Type_Note data_Type = { data_Type } />

                    { /* 搜尋列 */ }
                    <SearchBar get_Search_Text = { get_Search_Text } refetch = { refetch } /> 

                    { /* 搜尋提醒文字 */ }
                    <div className="m_Top_10 f_11" style={{ color:"gray" , width:"600px" }}>  
                       &nbsp; { is_Relatives_Info } 
                    </div>
        
                </div>

            </div>  


} ;

export default Data_List_Nav
       