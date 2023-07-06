

const data = [
               { no : "1" , type : "A" , des : "跨縣市,跨店" , range : "跨縣市、跨店檢視 / 編輯資料"  } ,
               { no : "2" , type : "B" , des : "跨縣市、跨店檢視 / 編輯資料" , range : "單一縣市跨店檢視 / 編輯資料"  } ,
               { no : "3" , type : "C" , des : "單一店家檢視 / 編輯資料  ..." , range : "範圍"  } ,
             
             ]




// @ 權限管理 : 個別商店
const Auth_Shop_List = () => {

 
  return <>

            <table className="table is-fullwidth is-hoverable relative w-full" >

                <thead>

                    <tr>
                        <th style={{width:"70px"}}> 編 號 </th>
                        <th> 權限類別   </th>
                        <th> 權限範圍  </th>
                        <th> 執行動作 </th>
                        
                        
                        <th> 封 存      </th>
                    </tr>

                </thead>

                <tbody>

                   <tr> 
                        <td> 1 </td> 
                        <td>  <b> A </b> </td> 
                        <td className="td_Left"> <b className="tag is-medium m_Right_10 is-primary"> 跨縣市 </b> <b className="tag is-medium m_Right_10 is-primary"> 跨品牌 </b> <b className="tag is-medium m_Right_10 is-primary"> 跨店 </b> </td>
                        <td className="td_Left"> <b className="tag is-medium m_Right_10 is-primary"> 檢視 </b> <b className="tag is-medium m_Right_10 is-primary"> 編輯 </b>  </td> 
                        <td> <b className="fas fa-download"></b>  </td> 
                   </tr>

                   <tr> 
                        <td> 2 </td> 
                        <td>  <b> B </b> </td> 
                        <td className="td_Left"> <b className="tag is-medium m_Right_10"> 跨縣市 </b> <b className="tag is-medium m_Right_10 is-primary"> 跨品牌 </b> <b className="tag is-medium m_Right_10 is-primary"> 跨店 </b> </td>
                        <td className="td_Left"> <b className="tag is-medium m_Right_10 is-primary"> 檢視 </b> <b className="tag is-medium m_Right_10"> 編輯 </b>  </td> 
                        <td> <b className="fas fa-download"></b>  </td> 
                   </tr>

                   <tr> 
                        <td> 3 </td> 
                        <td>  <b> C </b> </td> 
                        <td className="td_Left"> <b className="tag is-medium m_Right_10"> 跨縣市 </b> <b className="tag is-medium m_Right_10"> 跨品牌 </b> <b className="tag is-medium m_Right_10 is-primary"> 跨店 </b> </td>
                        <td className="td_Left"> <b className="tag is-medium m_Right_10 is-primary"> 檢視 </b> <b className="tag is-medium m_Right_10"> 編輯 </b>  </td> 
                        <td> <b className="fas fa-download"></b>  </td> 
                   </tr>

                   <tr> 
                        <td> 4 </td> 
                        <td>  <b> D </b> </td> 
                        <td className="td_Left"> <b className="tag is-medium m_Right_10"> 跨縣市 </b> <b className="tag is-medium m_Right_10"> 跨品牌 </b> <b className="tag is-medium m_Right_10"> 跨店 </b> </td>
                        <td className="td_Left"> <b className="tag is-medium m_Right_10 "> 檢視 </b> <b className="tag is-medium m_Right_10"> 編輯 </b>  </td> 
                        <td> <b className="fas fa-download"></b>  </td> 
                   </tr>
                    
                </tbody>

            </table>

         </>  

} ;

export default Auth_Shop_List
       