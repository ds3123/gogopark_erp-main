/* eslint-disable react/jsx-pascal-case */
import Plan_Used_Records_Button from "components/plan/components/Plan_Used_Records_Button";
import Plan_Type from '../components/Plan_Type';



// # 篩選結果
const List_Result : React.FC< { data : any[] } > = ( { data } ) => {

  return <>

            {
                data?.map( ( x : any , y : number ) => {

                    const pet = x?.pet ;
                    const cus = x?.customer ;

                    return <div key = { y } className = "columns p-4 m_Bottom_20" >

                                <div className = "column is-3" > <Plan_Type data = { x } /> </div>
                                <div className = "column is-3" > <b className = "f_14" > <p> { pet?.name }  <span className = "f_11"> ( { pet?.species } ) </span> </p> </b> { pet?.serial }   </div>
                                <div className = "column is-3" > <b className = "f_14" > <p> { cus?.name }  <span className = "f_12"> ( { cus?.mobile_phone } ) </span> </p> </b>  { cus?.id } </div>
                                <div className = "column is-offset-1 is-1 has-text-centered" > <Plan_Used_Records_Button plan = { x } /> </div>

                           </div> ;

                }) 
            }
             
         </>

} ;

export default List_Result  