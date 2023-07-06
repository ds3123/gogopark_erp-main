
import axios from 'utils/axios' ;


// @ 洗澡單 相關 API ( 資料表 : bath )

// [ GET ] ---------------




// [ POST ] ---------------

// 新增 _ 洗澡單  ( for React Query )
export const create_Bath = ( obj : any ) => axios.post( "/bathes" , obj ) ;



// [ PUT ] ---------------



// [ DELETE ] ---------------
