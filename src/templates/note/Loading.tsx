
import { useIsFetching , useIsMutating } from "react-query" ;


// @ 下載圖示 ( for React Query / 統一設定 ) 目前尚未使用 2022.12.05
export const Loading = () => { 

  const isFetching = useIsFetching() ; // 取得資料中
  const isMutating = useIsMutating() ; // 修改中

  const is_Display = isFetching || isMutating ? true : false ;


  return <>
  
           { is_Display &&

                <div className="has-text-centered" >
                    <button className="button is-loading is-white m_Top_100"></button>
                </div> 
            
            }
   
          </>

  }
  
  
  
         
  