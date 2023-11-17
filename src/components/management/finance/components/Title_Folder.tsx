
import { FC , useState  } from 'react' ;



type Title = {

   tag_Color           : string ;
   service_Type        : string ;
   amount_Type         : string ; 

   amount_Total        : number | React.ReactNode ; 

   pickup_Total?       : number ;  // 接送費總計

   lodge_Bath_Total?   : number ;  // 住宿洗澡費總計
   lodge_Beauty_Total? : number ;  // 住宿美容費總計

}


// # 各區塊標題列
const Title_Folder : FC< Title > = ( { children ,  
                                       tag_Color , 
                                       service_Type , 
                                       amount_Type , 
                                       amount_Total , 
                                       pickup_Total , 
                                       lodge_Bath_Total,
                                       lodge_Beauty_Total
                                    } ) => {

    
  const [ is_folding , set_Is_Folding ] = useState< boolean >( false ) ;


  const is_Expenditure = amount_Type === '支 出' || amount_Type === '扣 _ 預收款' ;
  

  const is_Show_Pickup      = pickup_Total       ? pickup_Total       : "" ;
  const is_Show_LodgeBath   = lodge_Bath_Total   ? lodge_Bath_Total   : "" ;
  const is_Show_LodgeBeauty = lodge_Beauty_Total ? lodge_Beauty_Total : "" ;

  
  return  <div className = { `columns is-multiline is-mobile ${ is_Show_Pickup && is_Show_LodgeBath && is_Show_LodgeBeauty ? 'm_Top_40' : '' }` } >

                { /* 標題 */ }
                <div className = 'column is-9-desktop' >
                    
                   <b className = { 'tag is-large is-light ' + tag_Color } > 
                   { service_Type } :&nbsp;<span className = "fBlue"> { amount_Type } </span>  </b>

                </div>

                { /* 小計 / 按鈕 */ }
                <div className = 'column is-3-desktop relative' >

                    { /* 小計 */ }
                    <b className = 'tag is-large is-white absolute' style = { is_Expenditure ? { left : "150px" , top : "10px" } : { left : "0px" } } > 
                        
                         <span className = { is_Expenditure ? 'fBlue' : 'fRed' }  > 

                            { amount_Total } 元
                            
                              { /* 接送費、住宿洗澡、住宿美容 */ }
                              {/* <div className = "absolute" style = {{ width:"150px" , left : "10px" , bottom:"40px" }} >

                                  { is_Show_LodgeBath && 
                                    
                                    <div className = "tag is-success is-light is-rounded w-full m_Bottom_10 f_11" style = { { float : "left" , top : "0px" , left : "0px" } } >
                                        含洗澡費 &nbsp; <b className = "tag is-white f_10 is-rounded" > { lodge_Bath_Total } </b>
                                    </div>

                                  }

                                  { is_Show_LodgeBeauty && 
                                    
                                    <div className = "tag is-danger is-light is-rounded w-full m_Bottom_10 f_11" style = { { float : "left" , top : "0px" , left : "0px" } } >
                                        含美容費 &nbsp; <b className = "tag is-white f_10 is-rounded" > { lodge_Beauty_Total } </b>
                                    </div>

                                  }

                                 { is_Show_Pickup && 

                                    <div className = "tag is-link is-light is-rounded w-full f_11" style = { { float : "left" , top : "0px" , left : "0px" } } >
                                        含接送費 &nbsp; <b className = "tag is-white f_10 is-rounded" > { pickup_Total } </b>
                                    </div>

                                 } 

                              </div> */}
                            
                          </span>  

                    </b>
                        
                    { /* 按鈕 */ }
                    <b className = { `tag is-medium f_10 pointer ${ !is_folding ? 'is-white' : 'is-success is-light' } relative` }
                       style     = { { float:'right' } }
                       onClick   = { () => set_Is_Folding( !is_folding ) } >
                                    <i className="fas fa-bars"></i>
                    </b> 

                </div>

                { /* 區塊內容 */ }
                <div className = 'column is-12-desktop' >

                     { is_folding && children }
                    
                </div>

           </div> 

} ;

export default Title_Folder  