
import { columns_Covert_Service_Prices , 
         columns_Covert_Service_Prices_SPECIES } from "hooks/crud/process/convert_Columns" ;

import { useCreate_Price } from "hooks/react-query/price/useCreatePrice" ;
import { useDispatch } from "react-redux" ;
import { useHistory } from "react-router-dom";
import { Toast } from 'templates/note/Toast' ;
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import cookie from 'react-cookies' ;

import { useQueryClient } from "react-query" ;




// @ 新增 _ 價格
export const useEffect_Create_Price = () => { 

    const dispatch = useDispatch() ;
    const history  = useHistory() ;
    
    // # 新增函式
    const create_Price_Fun = useCreate_Price() ;
    
    const queryClient = useQueryClient() ;



    // # 執行 _ 新增函式
    const create_Price = ( data : any ) => {

        // 轉換為資料表欄位 ( 資料表：service_prices )
        const obj_Prices         = columns_Covert_Service_Prices( data ) ;         // 新增 _ "個別項目" 價格 
        const obj_Prices_Species = columns_Covert_Service_Prices_SPECIES( data ) ; // 新增 _ "寵物品種" 價格


        // * 新增價格 : 寵物品種
        if( data['service_Price_Create_Way'] === '寵物品種' ){

            // 逐一新增資料
            obj_Prices_Species.forEach( x => {  create_Price_Fun( x ) ;  }) ;

            // 延遲 1 秒，再重導向 ( 等待以上資料，Ajax 新增完畢 )
            setTimeout( () => {

                // 刪除快取
                queryClient.invalidateQueries() ;

                // 新增成功通知
                Toast( "已新增 : 服務價格" ) ;
               
                // 關掉右側面板
                dispatch( set_Side_Panel(false , null ,{} ) ) ;

                // 設定 cookie ( for 前往 : 價格管理 > 服務價格 / 5 秒後銷毀 )
                cookie.save( 'after_Created_Redirect' , '價格管理_品種價格'  ,  { path : '/' , maxAge : 5 } ) ;

                history.push("/wrongpath");  // 錯誤路徑
                history.push("/management");  // 正確路徑

            } , 1000 )

        }

        // * 新增價格 : 個別項目
        if( data['service_Price_Create_Way'] === '個別項目' ){

            create_Price_Fun( obj_Prices , {
                                             onSuccess : () => { 

                                                // 刪除快取
                                                queryClient.invalidateQueries() ;

                                                // 新增成功通知
                                                Toast( "已新增 : 服務價格" ) ;
                                                
                                                // 關掉右側面板
                                                dispatch( set_Side_Panel(false , null ,{} ) ) ;

                                                // 設定 cookie ( for 前往 : 價格管理 > ... / 5 秒後銷毀 )
                                                let redirect = '' ;                                  // 依照新增服務類別，決定重導向後的位置
                                                const s_Type = obj_Prices['service_type'] ;

                                                if( s_Type === '基礎' )     redirect = '價格管理_基礎' ;
                                                if( s_Type === '洗澡' )     redirect = '價格管理_洗澡' ;
                                                if( s_Type === '美容' )     redirect = '價格管理_美容' ;
                                                if( s_Type === '安親' )     redirect = '價格管理_安親' ;
                                                if( s_Type === '住宿' )     redirect = '價格管理_住宿' ;
                                                if( s_Type === '加價項目' ) redirect = '價格管理_加價項目' ;
                                                if( s_Type === '加價美容' ) redirect = '價格管理_加價美容' ;

                                                cookie.save( 'after_Created_Redirect' , redirect  ,  { path : '/' , maxAge : 5 } ) ;

                                                history.push("/wrongpath");  // 錯誤路徑
                                                history.push("/management");  // 正確路徑

                                             } 

                                           }) ;
            

        }

     
    }
     
    return create_Price


}