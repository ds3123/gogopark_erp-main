import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useFetch_Custom_Plans } from "hooks/react-query/plan/useFetchPlans" ;
import { useEffect_Species_Custom_Plan , useEffect_Species_Name_Click } from "./hooks/useEffect_Species_List" ;
import { useFetch_Species_With_Shop_Service_Prices } from "hooks/react-query/species/useFetchSpecies" ;



const left  = { textAlign  : "left" } as any ;
const bt    = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;
const blue  = { color:"rgb(0,0,160)" } ;
const blown = { color:"rgb(180,130,0)" } ;
const info  = { top:"-45px" , left:"50px" , width:"400px" , textAlign:"left" , color:"grey" } as const ;
const table = { marginBottom:"150px" , width:"108%" , left:"-4%" } ;



/* @ 各種務 【 品種 】 _ 價格清單範本 */
const Species_Price_List = () => {

    // 登入使用者，所屬商店 id
    const shop_Id      = useAccount_Shop_Id() ;

    // 取得 _ 所有 : 自訂方案
    const custom_Plans = useFetch_Custom_Plans( shop_Id ) ;

   
    // 品種價格清單右側，處理 _ 自訂方案 ( 下拉選項相關設定 )
    const { current_Custom_Plan , is_PlanInfo , handle_Custom_Plan_Change } = useEffect_Species_Custom_Plan( custom_Plans ) ;
    
    // 點選 _ 品種名稱
    const click_Species = useEffect_Species_Name_Click() ;

    /*

       # 取得 species 資料表所有資料

          Note :
        
          * 以下方法，< 僅取得 > 有設定 "服務價格" ( 在 service_prices 資料表有關聯 ）的 "寵物品種" ( pet_species )

          * 先一率顯示 _ 狗狗公園品種價格 ( account_id = 1 ) -> useFetch_Species_With_Shop_Service_Prices() 參數固定為 "1"
            
    */

    const data = useFetch_Species_With_Shop_Service_Prices( "1" ) ;  

   
    return <table className="table is-fullwidth is-hoverable relative" style = { table } >

               <thead>

                  <tr>
                     <th> 品種名稱  </th>
                     <th> 代 碼    </th>
                     <th> 代 號    </th>
                     <th> <span style={ blown }> 初次洗澡  </span>     </th>
                     <th> <span style={ blue }>  單次     </span>洗澡  </th>
                     <th> <span style={ blue }>  包月     </span>洗澡  </th>
                     <th> <span style={ blue }>  單次     </span>美容  </th>
                     <th> <span style={ blue }>  包月     </span>美容  </th>     
                     <th className="relative"> 

                         { /* 方案說明 */ }
                         { is_PlanInfo &&

                             <b className="absolute f_11" style={ info }> 
                                 洗澡次數 : <b className="fRed">  { current_Custom_Plan['bath_Num'] ? current_Custom_Plan['bath_Num'] : 0 }      </b> 次  &nbsp; &nbsp; &nbsp;
                                 美容次數 : <b className="fRed">  { current_Custom_Plan['beauty_Num'] ? current_Custom_Plan['beauty_Num'] : 0 }  </b> 次  <br/>
                                 使用期限 : <b className="fBlue"> { current_Custom_Plan['plan_Period'] }                                         </b> 天  &nbsp; &nbsp;
                                 預設價格 : <b className="fBlue"> { current_Custom_Plan['default_Price'] }                                       </b> 元
                             </b>  
                           
                          } 

                          自訂方案 : &nbsp;     
 
                          <div className="select is-small f_11 relative" style={{ top:"-5px" }}>

                             <select onChange={ e => { handle_Custom_Plan_Change( e.target.value ) } }>
                                <option value="請選擇"> 請選擇  </option>
                                { custom_Plans.map( ( x : any , y : number ) => <option key={y} value={ x['plan_name'] }> { x['plan_name'] } </option> ) }
                             </select>

                          </div>   

                     </th>
                  </tr>

               </thead>

               <tbody>

                  {

                     data.map( ( x : any , y : number ) => {

                        const service_prices = x['service_prices'] as any ;
                        const first_Bath     = service_prices.filter( ( x:any ) => ( x['service_name'] === '初次洗澡優惠價格' ) )[0] ;
                        const single_Bath    = service_prices.filter( ( x:any ) => ( x['service_name'] === '單次洗澡價格'    ) )[0] ;
                        const month_Bath     = service_prices.filter( ( x:any ) => ( x['service_name'] === '包月洗澡價格'    ) )[0] ;
                        const single_Beauty  = service_prices.filter( ( x:any ) => ( x['service_name'] === '單次美容價格'    ) )[0] ;
                        const month_Beauty   = service_prices.filter( ( x:any ) => ( x['service_name'] === '包月美容價格'    ) )[0] ;

                        x.current_Custom_Plan = current_Custom_Plan ;  // 加入 _ 客製方案

                        return <tr key = { y } >

                                 <td style = { left} >

                       
                                   { /* 狗狗公園帳號 ( shop_Id === 1 ) 才能檢視、修改品種價格 */ }
                                   { shop_Id === 1 &&

                                       <b className = "tag is-medium pointer" style = { bt } onClick = { () => click_Species( x ) } >
                                          { x['name'] }
                                       </b>
                                   
                                   }
                                   
                                   { /* 非狗狗公園帳號 */ }
                                   { shop_Id !== 1 && <b> { x['name'] } </b> }
 
                                 </td>
                                 <td> { x['serial'] }                                          </td>
                                 <td> { x['character'] }                                       </td>
                                 <td> { first_Bath ? first_Bath['service_price'] : '' }        </td>
                                 <td> { single_Bath ? single_Bath['service_price'] : '' }      </td>
                                 <td> { month_Bath ? month_Bath['service_price'] : '' }        </td>
                                 <td> { single_Beauty ? single_Beauty['service_price'] : '' }  </td>
                                 <td> { month_Beauty ? month_Beauty['service_price'] : '' }    </td>
                                 <td>   

                                      { /* 有套用品種 */ } 
                                      { ( is_PlanInfo && current_Custom_Plan['applied_Species'].includes( x['serial'] ) ) && 
                                             // <b className="tag is-medium pointer" style={ bt }  onClick={ () => click_Update_Custom_Plan( x ) } > 
                                             //     { current_Custom_Plan['default_Price'] } 
                                             // </b> 
                                             <span> { current_Custom_Plan['default_Price'] } </span> 
                                      } 

                                      { /* 未套用品種 */ } 
                                      { ( is_PlanInfo && !current_Custom_Plan['applied_Species'].includes( x['serial'] ) ) && 
                                             // <b className="tag is-medium pointer fDred" style={ bt }  onClick={ () => click_Update_Custom_Plan( x ) } > 
                                             //      未套用
                                             // </b> 
                                             <span>  未套用 </span> 
                                      }  

                                 </td>
                              </tr>

                     })

                  }

               </tbody>

             </table>
            
} ;

export default Species_Price_List ;

