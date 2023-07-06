




// @ 權限管理 : 商店成員
const Auth_Member_List = () => {


    return <>
  

                <table className="table is-fullwidth is-hoverable relative w-full" >

                        <thead>

                            <tr>
                                <th style={{width:"70px"}}> 編 號 </th>
                                <th> 職務類別   </th>
                                <th> 職等   </th>

                                <th> 權限範圍  </th>
                                <th> 執行動作 </th>
                                
                                
                                <th> 封 存      </th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr> 
                                  <td> 1   </td> 
                                  <td> 店長 </td> 
                                  <td> 3   </td> 
                                  <td>  <b className="tag is-medium m_Right_10 is-primary"> 客戶 </b> <b className="tag is-medium m_Right_10 is-primary"> 寵物 </b> <b className="tag is-medium m_Right_10 is-primary"> 服務 </b> <b className="tag is-medium m_Right_10 is-primary"> 美容區 </b> <b className="tag is-medium m_Right_10 is-primary"> 管理區 </b>    </td>
                                  <td className="td_Left"> <b className="tag is-medium m_Right_10 is-primary"> 檢視 </b> <b className="tag is-medium m_Right_10 is-primary"> 編輯 </b>  </td> 
                                  <td> <b className="fas fa-download"></b>  </td>
                            </tr>

                            <tr> 
                                  <td> 2   </td> 
                                  <td> 行政 </td> 
                                  <td> 3   </td> 
                                  <td>  <b className="tag is-medium m_Right_10 is-primary"> 客戶 </b> <b className="tag is-medium m_Right_10 is-primary"> 寵物 </b> <b className="tag is-medium m_Right_10 is-primary"> 服務 </b> <b className="tag is-medium m_Right_10 "> 美容區 </b> <b className="tag is-medium m_Right_10"> 管理區 </b>    </td>
                                  <td className="td_Left"> <b className="tag is-medium m_Right_10 is-primary"> 檢視 </b> <b className="tag is-medium m_Right_10 is-primary"> 編輯 </b>  </td> 
                                  <td> <b className="fas fa-download"></b>  </td>
                            </tr>

                            <tr> 
                                  <td> 3   </td> 
                                  <td> 美容師 </td> 
                                  <td> 3   </td> 
                                  <td>  <b className="tag is-medium m_Right_10"> 客戶 </b> <b className="tag is-medium m_Right_10"> 寵物 </b> <b className="tag is-medium m_Right_10"> 服務 </b> <b className="tag is-medium m_Right_10 is-primary"> 美容區 </b> <b className="tag is-medium m_Right_10"> 管理區 </b>    </td>
                                  <td className="td_Left"> <b className="tag is-medium m_Right_10 is-primary"> 檢視 </b> <b className="tag is-medium m_Right_10 is-primary"> 編輯 </b>  </td> 
                                  <td> <b className="fas fa-download"></b>  </td>
                            </tr>

                            <tr> 
                                  <td> 4   </td> 
                                  <td> 接送員 </td> 
                                  <td> 3   </td> 
                                  <td>  <b className="tag is-medium m_Right_10 is-primary"> 客戶 </b> <b className="tag is-medium m_Right_10 is-primary"> 寵物 </b> <b className="tag is-medium m_Right_10 is-primary"> 服務 </b> <b className="tag is-medium m_Right_10"> 美容區 </b> <b className="tag is-medium m_Right_10"> 管理區 </b>    </td>
                                  <td className="td_Left"> <b className="tag is-medium m_Right_10 is-primary"> 檢視 </b> <b className="tag is-medium m_Right_10"> 編輯 </b>  </td> 
                                  <td> <b className="fas fa-download"></b>  </td>
                            </tr>

                           
                            
                        </tbody>

                </table>



           </>  

} ;

export default Auth_Member_List
       