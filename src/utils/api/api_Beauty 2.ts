
import axios from 'utils/axios' ;


// @ 美容單 相關 API ( 資料表 : beauty )

// [ GET ] ---------------




// [ POST ] ---------------

// 新增 _ 美容單  ( for React Query )
export const create_Beauty = ( obj : any ) => axios.post( "/beauties" , obj ) ;


// [ PUT ] ---------------



// [ DELETE ] ---------------
