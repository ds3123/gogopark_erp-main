/* eslint-disable react/jsx-pascal-case */

import { FC , useMemo } from 'react' ;
import { useFetch_Pet_Plans } from "hooks/react-query/plan/useFetchPlans" ;
import Plan_Type from 'components/plan/components/Plan_Type' ;
import Plan_Used_Column from 'components/plan/components/Plan_Used_Column' ;
import { sort_Data_By_CreatedDate } from 'utils/data/sort_data' ;
import { is_Downloading } from 'templates/note/Query_Info';





// 標題
const title = ( pet_Data : any , all_Plans : any[] ) => 

          <b className = "tag is-large f_18" > 

            <i className = "fas fa-dog" ></i> &nbsp; 
            <div> 

                <span className = "m_Right_5" > { pet_Data['name'] } </span> 
                
                <span className = "f_12" > 
                 ( { pet_Data['species'] } / { pet_Data['serial'] } ) 
                </span>

            </div> 

            <span className="tag is-medium is-rounded is-white m_Left_10"> 
                  方案筆數 : &nbsp; <span className = "fDblue"> { all_Plans?.length } </span>
            </span>
                                    
          </b>  


// 沒有方案
const is_No_Plan = ( pet_Data : any , all_Plans : any[] ) => 

        <div>  

            { title( pet_Data , all_Plans ) }

            <div className = "tag is-large is-white w-full relative fBold fDblue" style={{ top:"200px" }}>

                <i className = "fas fa-info-circle pointer m_Right_5"></i>
                &nbsp; { pet_Data?.name } ： 沒有 _ 方案資料
                
            </div> 
                                    
        </div> ;


// # 特定寵物：所有方案
const Pet_Plans : FC< { pet_Data : any } > = ( { pet_Data } ) => {


  // 特定寵物 _ 所有購買的方案  
  const { data : all_Plans , isError , isFetching } = useFetch_Pet_Plans( pet_Data?.serial ) ;


  // 排序
  const _all_Plans = useMemo( () => sort_Data_By_CreatedDate( all_Plans , "desc" ) , [ all_Plans ] ) ;



  // 資料取得中
  if( isFetching ) return is_Downloading() ;
 
  // 資料發生錯誤
  if( isError ) return <div className = "fRed" > 資料取得錯誤，請稍候再試 ... </div>

  // 沒有任何方案
  if( all_Plans?.length === 0 ) return is_No_Plan( pet_Data , all_Plans ) ;


  return <>

            { title( pet_Data , all_Plans ) }

            <div className = "m_Top_50 relative" 
                 style     = {{ height : "780px" , paddingLeft : "60px" , paddingBottom : "50px" , overflowY : "scroll" , overflowX : "hidden" }} >

                {

                  _all_Plans?.map(( x : any , y : number ) => {

                     return <div key = { y } className = "columns is-multiline m_Bottom_50 relative" >

                               <div className = "column is-4 relative" >

                                  <b className = "absolute" style={{ left : "-20px" , top : "17px" }}> 
                                      { y + 1 } 
                                  </b> 
                                
                                  <Plan_Type data = { x } /> 
                                  
                               </div>

                               <div className = "column is-6" >
                                
                                  <Plan_Used_Column data = { x } /> 
                                  
                               </div>

                            </div>

                  })

                }

            </div>
             
         </>

} ;

export default Pet_Plans  