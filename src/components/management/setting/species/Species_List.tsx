
import { useDelete_Species } from "hooks/react-query/species/useDeleteSpecies" ;
import { useEffect_Click_Info } from "./hooks/useEffect_Species_List" ;
import { useFetch_Species } from "hooks/react-query/species/useFetchSpecies" ;



const left = { textAlign : 'left' } as const ;
const bt   = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;



// @ 寵物品種清單  
const Service_List = ( ) => {


    // 取得 _ 所有寵物品種資料 
    const data           = useFetch_Species() ;

    // 點選 _ 品種名稱
    const click_Species  = useEffect_Click_Info() ;

    // 點選 _ 刪除品種函式
    const delete_Species = useDelete_Species() ;


    return <>

              <table className = "table is-fullwidth is-hoverable" style = {{ marginBottom : "150px" }} >

                    <thead>

                        <tr>
                            { /* 
                            
                                <th className="relative">

                                    <b className="tag is-medium relative pointer"
                                    style={{ background:"rgb(150,0,0)" , color:"white" }}
                                    onClick = { ( ) => refresh_Data( species )  } >
                                    <i className="fas fa-stream"></i> &nbsp; 排 序
                                    </b>

                                </th> 


                              */ }
                            <th> 名 稱 </th>
                            <th> 代 號 </th>
                            <th> 代 碼 </th>
                            <th> 體 型 </th>
                            <th> 毛 髮 </th>
                            <th> 備 註 </th>
                            <th> 刪 除 </th>
                        </tr>
                        
                    </thead>

                    <tbody>

                       {

                          data.map( ( x : any , y : any ) => {

                              return <tr key={y} style={{ lineHeight : "40px" }}>

                                        {/* 
                                        
                                        <td className='relative'>

                                            <b className="tag is-medium relative is-white" onClick={ () => click_Up(y) }>
                                                <span className="absolute" style={{ top:"0px" , fontSize:"22pt" }}>
                                                    <i className="fas fa-sort-up pointer"   ></i>
                                                </span>
                                            </b> &nbsp;&nbsp;

                                            <b className="tag is-medium is-white" onClick={ () => click_Down(y) }>
                                               <span className="absolute" style={{ top:"0px" , fontSize:"22pt" }}>
                                                   <i className="fas fa-sort-down" ></i>
                                               </span>
                                            </b>

                                        </td>
                                        
                                        */}

                                        <td style={ left }>
                                            <b className="tag is-medium pointer" style={bt} onClick={ () => click_Species( x ) }>  { x['name'] }  </b>
                                        </td>
                                        <td> { x['serial'] }              </td>
                                        <td> { x['character'] }           </td>
                                        <td> { x['size'] }                </td>
                                        <td> { x['fur'] }                 </td>
                                        <td style={ left }> { x['note'] } </td>
                                        <td>
                                            <b className="delete relative" style={{ top:"7px" }}
                                               onClick={ () => { if( window.confirm("確認要刪除此品種 ?") ) delete_Species( x['id'] ) } } >
                                            </b>
                                        </td>

                                     </tr>

                           })

                       }

                    </tbody>

              </table>


           </>

} ;

export default Service_List ;

