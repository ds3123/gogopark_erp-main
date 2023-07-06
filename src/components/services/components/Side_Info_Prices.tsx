
import { useSelector } from "react-redux" ;
import { useSpecies_Id_To_Name } from 'hooks/data/useSwitch_Species_Id_Name' ;
import { useFetch_Shop_Species_5_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { IService_5_Prices } from "utils/Interface_Type" ;


/*

  @ 側邊提示資訊( 新增服務時顯示 )
    1. 品種基本價格
    2. 自行調整價格

*/

const Side_Info_Prices = ( ) => {


    // 目前所輸入 : 寵物品種 id
    const current_Species_Id       = useSelector(( state : any ) => state.Pet.current_Species_Id  ) ;          

    // 目前寵物品種名稱 ( Ex. 秋田犬 )
    const current_Pet_Species_Name = useSpecies_Id_To_Name( current_Species_Id ) ;

    // 客戶單，目前所填入客戶的所有寵物
    const current_Customer_Pets    = useSelector(( state:any ) => state.Customer.Current_Customer_Pets ) ;


    /*
       
      # 取得 _ 特定店家，特定寵物品種 id ( 欄位 : species_id )，5 種基本服務價格 : 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容 
    
          NOTE : 一率先採用狗狗公園定價 ( account_id === 1 ) ，否則其他帳號，會讀取不到 2023.01.09   
    
    */ 
    const species_5_Prices = useFetch_Shop_Species_5_Service_Prices( "1" , current_Species_Id ) as IService_5_Prices ;       


    const no_Adj = <b className="fDred"> 未調整 </b> ;


    return <>

                { /*  基本價格  */ } 
                <span className="tag is-white is-large">
                    <i className="fas fa-dollar-sign"></i> &nbsp; 基本價格 : &nbsp;
                    { 
                        current_Pet_Species_Name ? 
                            <b style={{ color:"darkorange" }}> { current_Pet_Species_Name } </b> : 
                            <b>尚未指定<span className="fDred"> 寵物 </span> </b> 
                    }
                </span>
                
                { current_Pet_Species_Name &&

                    <>

                        { /* 洗澡 */ }
                        <b className="tag is-success is-medium is-light is-rounded m_Top_10 m_Bottom_10"> 洗澡 &nbsp;
                            <b className="tag is-white is-rounded"> 初次 &nbsp; <b className="fRed"> { species_5_Prices?.first_Bath }  </b> </b> &nbsp;
                            <b className="tag is-white is-rounded"> 單次 &nbsp; <b className="fRed"> { species_5_Prices?.single_Bath } </b> </b> &nbsp;
                            <b className="tag is-white is-rounded"> 包月 &nbsp; <b className="fRed"> { species_5_Prices?.month_Bath }  </b> </b> &nbsp;
                        </b>
                        
                        { /* 美容 */ }
                        <b className="tag is-danger is-medium is-light is-rounded m_Bottom_40"> 美容 &nbsp;
                            <b className="tag is-white is-rounded"> 單次 &nbsp; <b className="fRed"> { species_5_Prices?.single_Beauty } </b> </b> &nbsp;
                            <b className="tag is-white is-rounded"> 包月 &nbsp; <b className="fRed"> { species_5_Prices?.month_Beauty }  </b> </b> &nbsp;
                        </b>

                    </>

                }

                <br/> <br/> 


                { /* 調整價格 */ }
                { current_Customer_Pets.length > 0 &&  
                    
                    <>

                        <span className="tag is-white is-large">
                            <i className="fas fa-dollar-sign"></i> &nbsp; 調整價格  &nbsp;
                        </span>
                        
                        { current_Customer_Pets.map( ( x:any , y:number ) => (

                            <div className="m_Top_10" key={y}>

                                <b className="fDblue relatvie m_Top_30" style={{ marginLeft : "50px"  }}> { x.name }  </b>( { x.species } )

                                <div className="relative" style={{ left : "60px" }}>

                                    { /* 洗澡 */ }
                                    <b className="tag is-success is-medium is-light is-rounded m_Top_10 "> 洗澡 &nbsp;
                                       
                                        <b className="tag is-white is-rounded"> 單次 &nbsp; 
                                           <b className="fRed"> 
                                             { x.single_bath_price ? x.single_bath_price : no_Adj } 
                                           </b> 
                                        </b> &nbsp;
                                       
                                        <b className="tag is-white is-rounded"> 包月 &nbsp; 
                                           <b className="fRed"> 
                                             { x.month_bath_price ? x.month_bath_price : no_Adj }  
                                           </b> 
                                        </b> &nbsp;

                                    </b>

                                    { /* 美容 */ }
                                    <b className="tag is-danger is-medium is-light is-rounded m_Top_10 m_Bottom_30"> 美容 &nbsp;

                                        <b className="tag is-white is-rounded"> 單次 &nbsp; 
                                            <b className="fRed"> 
                                               { x.single_beauty_price ? x.single_beauty_price : no_Adj } 
                                            </b> 
                                        </b> &nbsp;
                                       
                                        <b className="tag is-white is-rounded"> 包月 &nbsp; 
                                            <b className="fRed"> 
                                                { x.month_beauty_price ? x.month_beauty_price : no_Adj }  
                                            </b> 
                                        </b> &nbsp;
                                   
                                    </b>
                                    
                                </div> 

                            </div>

                        ) ) }

                    </>

                }      

                
           </>

} ;

export default Side_Info_Prices
       