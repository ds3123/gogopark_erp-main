
import { useEffect } from 'react' ;
import cookie from 'react-cookies';
import useCreate_App_Container_Context  from "containers/contexts/appContainerContext" ;
import { useQueryClient } from "react-query" ;



 // ＠ 在新增 / 刪除方案，或新增 / 封存安親後，依照所新增的 Cookie，重導向、點選相對應的方案或安親標籤
export const useCookie_Click_Second_Nav = () => { 


     // 設定 _ 服務 ( 第二層 Ex. 洗美、方案 ; 住宿、安親 ) 點選標籤 
     const { set_Service_Second_Nav_Tab } = useCreate_App_Container_Context() ; 
    
     
    const queryClient  = useQueryClient() ;


    // 取得 _ Cookie
    const get_Cookies = () => {

        // ＃ 方案
        const create_Plan = cookie.load( 'after_Created_Plan' ) ;  // 新增
        const delete_Plan = cookie.load( 'after_Delete_Plan' ) ;   // 刪除
        // # 安親
        const create_Care  = cookie.load('after_Created_Care') ;  // 新增
        const archive_Care = cookie.load('after_Archive_Care') ;  // 封存
 
        return { create_Plan , delete_Plan , create_Care , archive_Care }

    } ;


    //  依 Cookie，點選 _ 方案或安親標籤
    useEffect( () => {


        // 延遲 500 ms ，避免點選方案時，出現錯誤資料
        setTimeout( () => { 


            const { create_Plan , delete_Plan , create_Care , archive_Care } = get_Cookies() ;

            // #  新增 / 刪除 _ "方案" 後，依 Cookie 點選 : "方案"標籤 
            if( ( create_Plan && create_Plan === '洗美_方案' ) || ( delete_Plan && delete_Plan === '洗美_方案' ) ){

                // 刪除快取
                queryClient.invalidateQueries() ;

                set_Service_Second_Nav_Tab( '方 案' ) ;

            } 
               
        
                
            // # 新增 / 封存 _ "安親" 後，依 cookie，點選 : "安親"標籤  
            if( ( create_Care && create_Care === '住宿_安親' ) || ( archive_Care && archive_Care === '住宿_安親' ) )
                set_Service_Second_Nav_Tab( '安 親' ) ;


        } , 500 )

        
       
    } , [] ) ;

}





