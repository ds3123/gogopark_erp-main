import { useEffect } from 'react' ;


// 初始設定顯示資料
export const useEffect_Init_Data = ( done_Plans : any[] , set_Data : ( data : any[] ) => void ) => {


    useEffect( () => {
      
        if( done_Plans?.length > 0 ) set_Data( done_Plans ) ; 
         
    } , [ done_Plans , set_Data ] ) ;


} ;