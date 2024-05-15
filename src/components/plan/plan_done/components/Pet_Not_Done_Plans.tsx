/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC , useMemo } from 'react' ;
import { is_Plan_Done } from 'components/plan/hooks/useEffect_Plan_Used_Column';
import Plan_Type from './Plan_Type';



// 寵物 : 尚未使用完方案
const Pet_Not_Done_Plans : FC< { data : any[] , current_Pet : any } > = ( { data , current_Pet } ) => {


  // 該寵物方案：尚未使用完 ( 近 300 筆 )
  const pet_Not_Done_Plans = useMemo( () => data?.filter( x => x?.pet?.serial === current_Pet?.serial && !is_Plan_Done( x ) ) , [ data ] ) ;


  if( pet_Not_Done_Plans?.length === 0 ) return null ;


  return <div className = "m_Top_10">

            <p className = "m_Bottom_5 fDblue">  未用完方案 : </p> 

            { pet_Not_Done_Plans?.map( ( x : any , y : number ) => 

                <div key = { y } > <Plan_Type data = { x } />  </div> 
            
            )}
             
         </div>
} ;

export default Pet_Not_Done_Plans  