import { useState } from 'react' ;
import axios from "utils/axios" ;
import { Toast } from 'templates/note/Toast';
import { useQueryClient } from "react-query" ;


// 儲存 _ 美容師備註 ( for 寵物消費紀錄列 )
export const useEffect_Beauticain_Note = ( 
                                           beautician_note : string ,                 // 美容師備註
                                           service_id      : string ,                 // 服務單 id ( 洗澡：data.bath_id / 美容 : data.beauty_id )
                                           api             : "/bathes" | "/beauties"  // API url
                                         ) => {


        // 美容師備註
        const [ beauticianNote , set_BeauticianNote ] = useState< string >( beautician_note ) ;

        const queryClient = useQueryClient() ;


        // 點選 _ 儲存美容師備註
        const click_Save_BeauticianNote = () => {

            if( !service_id ) return alert( "更新失敗" ) ;

            // 更新資料
            axios.put( `${ api }/${ service_id }` , { beautician_note : beauticianNote } ).then( res => {

                Toast( `美容師備註 ( id : ${ service_id  } )，更新成功` ) ;

                // 刪除快取
                queryClient.invalidateQueries() ;

            });
        
        } ;


       return { beauticianNote , set_BeauticianNote , click_Save_BeauticianNote } ;


} ;

