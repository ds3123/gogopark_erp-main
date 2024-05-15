/* eslint-disable react/jsx-pascal-case */
import List_Result_Row from "./List_Result_Row";


// # 篩選結果
const List_Result : React.FC< { data : any[] } > = ( { data } ) => {

  return <>

            { data?.map( ( x : any , y : number ) => <List_Result_Row key = { y } data = { x } /> ) }
             
         </>

} ;

export default List_Result  