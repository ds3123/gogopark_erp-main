/* eslint-disable react/jsx-pascal-case */
import Nav_Filter from "./components/Nav_Filter" ;
import Account_Rows from "./components/Account_Rows" ;
import { useFetch_Shop_Accounts } from "hooks/react-query/account/useFetchAccounts" ;


// @ 帳號列表
const Account_List = () => {


    // 取得 _ 所有商店帳號 ( 資料表 : accounts )
    const accounts = useFetch_Shop_Accounts() ;


    return <>
    
              {/* <Nav_Filter />         */}

              <table className="table is-fullwidth is-hoverable relative" >

                <thead>

                    <tr>
                        <th> 店 名 <span className="f_11"> ( id ) </span>       </th>
                        <th> 縣 市  </th>
                        <th> 行政區 <span className="f_11"> ( 郵遞區號 ) </span>  </th>
                        <th> 序 號  </th>
                        <th> 品 牌  </th>
                        <th> 負責人 </th>
                        {/* 

                        <th> 預設帳號  </th>
                        <th> 預設密碼  </th>
                        <th> 付費方案  </th>
                        <th> 金幣數量  </th>
                        <th> 開始日期  </th>
                        <th> 結束日期  </th>
                        <th> 權限等級  </th> 
                        
                        */}
                    </tr>

                </thead>

                <tbody>

                   { accounts.map( ( x : any , y  ) => <Account_Rows key = { y } data = { x } />  ) }
                       
                </tbody>

              </table>

           </>



} ;

export default Account_List
       