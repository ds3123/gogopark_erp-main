/* eslint-disable react/jsx-pascal-case */


import Employees_Row from "./components/Employees_Row" ; 
import { useAccount_Shop_Id } from "hooks/data/useAccount";


type Table = {

    data       : any ;                         // 資料
    zipcode    : string ;                      // 郵遞區號
    shopNum    : string ;                      // 店別編號

}


const Employees_Table = ( { data , zipcode , shopNum } : Table ) => {


    // 目前登入者所屬店家 id
    const shop_Id = useAccount_Shop_Id() ;

 
   return  <>


                {/* 
                
                <span className="tag is-medium m_Bottom_20 f_14 is-rounded">

                   &nbsp;區號 :&nbsp;<b className="fDblue f_12 m_Right_20"> { zipcode } </b>
                         序號 :&nbsp;<b className="fDblue f_12 m_Right_20"> 

                                       { ( !shopNum || shopNum === '請選擇' ) ? <span className="fDred"> 未選擇 </span> : <b className="fDblue"> { shopNum } </b> } 
                                     
                                    </b> 

                        店名 :&nbsp;<b className="fDblue f_12">  狗狗公園 </b>            

                </span> 
                
                */}

                <table className="table is-fullwidth is-hoverable">

                     <thead>

                        <tr>
                            <th> 所屬商店 <span className="f_11"> ( id ) </span> </th>
                            <th> 帳號類別    </th>
                            <th> 帳 號      </th>
                            <th> 密 碼      </th>
                            <th> 姓 名      </th>
                            <th> 計薪類別    </th>
                            <th> 職位類別    </th>
                            <th> 身分證字號  </th>
                            <th> 手機號碼    </th>
                            <th> 暱 稱      </th>
                            <th> 通訊地址    </th>
                            <th> 封 存      </th>
                        </tr>

                     </thead>

                     <tbody>

                         {
                            data.map( ( x : any , y : number ) => {

                                let tag = '' ;
                                if( x['employee_type'] === '管理帳號' ) tag = 'is-warning' ;
                                if( x['employee_type'] === '測試帳號' ) tag = 'is-danger'  ;
                                if( x['employee_type'] === '工作人員' ) tag = 'is-success' ;


                                // 只有狗狗公園帳號 ( shop_Id === 1 )，才顯示 _ [ 帳號 ] 新增標籤
                                if( shop_Id !== 1 && x['employee_type'] === "管理帳號"  ) return false ;

                                return <Employees_Row key = { y }  data = { x } tag = { tag } />

                            })
                         }

                     </tbody>

                </table> 
 
           </>



   
   
   
   
   

} ;


export default Employees_Table
       