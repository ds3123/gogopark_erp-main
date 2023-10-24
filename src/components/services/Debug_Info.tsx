
import {useSelector} from "react-redux";
import { useAccount_Shop_Id } from "hooks/data/useAccount";

import { useFetch_Shop_Species_5_Service_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { IService_5_Prices } from "utils/Interface_Type" ;


// @ for 除錯、顯示數值 ( 固定於左側 )
const Debug_Info = ( ) => {

    // 目前登入使用者，所屬店家 id 
    const shop_Id = useAccount_Shop_Id() ;


    // 是否開啟
    const Side_Debug_Open          = useSelector(( state : any ) => state.Layout.Side_Debug_Open ) ;

    // -------------------------------------------------------------

    // 是否顯示 : 寵物區塊
    const is_Show_Section_Pet      = useSelector( ( state : any ) => state.Layout.is_Show_Section_Pet ) ;

    // 是否顯示 : 整體服務區塊
    const is_Show_Section_Services = useSelector( ( state : any ) => state.Layout.is_Show_Section_Services ) ;


    // -------------------------------------------------------------

    // 方案 : 包月洗澡 _ 條件不符 ( Redux )
    const invalid_To_Plan             = useSelector(( state : any ) => state.Form.invalid_To_Plan ) ;

    // 員工
    const invalid_To_Employee         = useSelector( ( state : any ) => state.Form.invalid_To_Employee ) ;

    // 目前新增的服務類型 : 初次洗澡優惠、單次洗澡、單次美容 ( Redux )
    const current_Create_Service_Type = useSelector(( state : any ) => state.Service.current_Create_Service_Type ) ;

    // 目前寵物服務價格 ( 初次洗澡、單次洗澡 .... )
    const current_Pet_Service_Price   = useSelector(( state : any ) => state.Pet.current_Pet_Service_Price  )

    // 目前寵物資料 > 品種 ( 品種 id / 下拉選單 )
    const current_Species_Id          = useSelector(( state : any ) => state.Pet.current_Species_Id  ) ;

    /*

        取得 _ 特定店家，特定寵物品種 id ( 欄位 : species_id )，5 種基本服務價格 : 初次洗澡、單次洗澡、包月洗澡、單次美容、包月美容 

        NOTE : 一率先採用狗狗公園定價 ( account_id === 1 )

    */ 
    const species_5_Prices            = useFetch_Shop_Species_5_Service_Prices( "1" , current_Species_Id ) as IService_5_Prices ;



    // # 方案
    const current_Plan_Type          = useSelector(( state : any ) => state.Plan.current_Plan_Type  ) ;           // 目前 _ 方案類型
  
    const current_Plan_Id            = useSelector(( state : any ) => state.Plan.current_Plan_Id  ) ;             // 目前 _ 方案資料表 ( plans ) id
    const current_Plan_Note          = useSelector(( state : any ) => state.Plan.current_Plan_Note  ) ;           // 目前 _ 方案備註 Ex. 包月洗澡第 1 次

    const is_Plan_Used               = useSelector(( state : any ) => state.Plan.is_Plan_Used  ) ;                // 是否已 _ 點選使用方案 : "包月洗澡" or "包月美容" 標籤 ( for 表單提交驗證邏輯 )

    const Customer_Plans_Records     = useSelector( ( state : any ) => state.Customer.Customer_Plans_Records ) ;  // 客戶 _ 方案 ( Ex. 包月洗澡、美容 )、使用紀錄 ( 由 Customer_Form.tsx 中查詢設定 )
  

    const container = {
                        position     : "absolute" ,
                        borderRadius : "5px" ,
                        padding      : "20px 15px" ,
                        top          : "0px" ,
                        left         : "-60px" ,
                        background   : "white" ,
                        width        : "350px" ,
                        overflow     : "auto" ,
                        height       : "650px" ,
                        zIndex       : "2000" ,
                        boxShadow    : "1px 1px 5px 2px rgba(0,0,0,.2)"
                      } as any ;

    return <>

              { Side_Debug_Open &&

                <div style = { container } >

                    <div className="m_Bottom_30"> 是否顯示 : 寵物區塊 <br/> ( is_Show_Section_Pet ) :          <br/> <b className="fRed"> { is_Show_Section_Pet      ? '1' : '0' } </b> </div>
                    <div className="m_Bottom_30"> 是否顯示 : 服務整體區塊 <br/> ( is_Show_Section_Services ) : <br/> <b className="fRed"> { is_Show_Section_Services ? '1' : '0' } </b> </div>

                    <hr/>

                    <div className="m_Bottom_30"> 方案驗證 <br/> ( invalid_To_Plan ) : <br/> <b className="fRed"> { invalid_To_Plan ? '1' : '0' } </b> </div>
                    
                    <div className="m_Bottom_30"> 員工驗證 <br/> ( invalid_To_Employee ) : <br/> <b className="fRed"> { invalid_To_Employee ? '1' : '0' } </b> </div>
                   


                    <div className="m_Bottom_30"> 目前新增的服務類型 <br/> ( current_Create_Service_Type ) : <br/> <b className="fRed"> { current_Create_Service_Type  } </b> </div>
                    
                    <div className="m_Bottom_30"> 目前品種 id (下拉選單) <br/> ( current_Species_Id ) : <br/> <b className="fRed"> { current_Species_Id  } </b> </div>
                    
                    <div className="m_Bottom_30"> 
                       初次洗澡優惠 : <b className="fRed"> { species_5_Prices?.first_Bath }    </b> <br/>      
                       單次洗澡 : <b className="fRed">    { species_5_Prices?.single_Bath }   </b> <br/>      
                       包月洗澡 : <b className="fRed">    { species_5_Prices?.month_Bath }    </b> <br/>      
                       單次美容 : <b className="fRed">    { species_5_Prices?.single_Beauty } </b> <br/>      
                       包月美容 : <b className="fRed">    { species_5_Prices?.month_Beauty }  </b> 
                    </div>

                    <div className="m_Bottom_30"> 目前服務價格 <br/> ( current_Pet_Service_Price ) : <br/> <b className="fRed"> { current_Pet_Service_Price  } </b> </div>
                   
                    <hr/>
 
                    <div className="m_Bottom_30">  目前 _ 方案類型 <br/> ( current_Plan_Type ) : <br/> <b className="fRed"> {  current_Plan_Type } </b> </div>
                    
                    <div className="m_Bottom_30">  目前 _ 方案 Id  <br/> ( current_Plan_Id ) : <br/> <b className="fRed"> {  current_Plan_Id } </b> </div>
                   
                    <div className="m_Bottom_30">  目前 _ 方案備註  <br/> ( current_Plan_Note ) : <br/> <b className="fRed"> {  current_Plan_Note } </b> </div>
                    
                                       
                    <div className="m_Bottom_30">  目前 _ 是否以點選使用  <br/> ( is_Plan_Used ) : <br/> <b className="fRed"> {  is_Plan_Used ? 'True' : 'False' } </b> </div>
                    
                    <div className="m_Bottom_30">  方案使用紀錄  <br/> ( Customer_Plans_Records ) : <br/> <b className="fRed"> {  Customer_Plans_Records.length } </b> </div>
                    

                </div>  

              }

           </>

} ;


export default Debug_Info