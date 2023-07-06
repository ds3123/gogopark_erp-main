
import { Input } from "templates/form/Input";


type Relative_Row = {

    rel_Arr : any[] ;                                                                   // 待渲染關係人欄位數
    is_Setting_Existing_Data : boolean | string | undefined ;                           // 是否處於 _ 新增資料，且該客戶已有新增關係人 ( 帶入舊、已新增關係人資料列 )
    click_Archive_Relatives   : ( table_Id : string , customer_Id : string  ) => void ; // 點選 _ 封存 : 關係人 
    register : any ;

}


// @ 渲染 _ 關係人資料欄位
const Render_Customer_Relatives_Row = ( { rel_Arr , is_Setting_Existing_Data , click_Archive_Relatives , register } : Relative_Row ) => {

   return <>

             {

                rel_Arr.map( ( x : any , y : number ) => { 

                    if( x['is_archive'] === 1 ) return null ;  // 封存資料

                    const index = ( y+1 ).toString() ;       // 索引數字

                    return  <div className="relative" key={ y } >

                            { /* 索引 */ }
                            { !is_Setting_Existing_Data &&
                                <b className="tag is-medium m_Bottom_20 relative" style={{ left:"-10px" }}>  關係人 _ { index }   </b> 
                            }

                            { /* 封存鈕 ( 2 個關係人以上才顯示封存鈕 ) */ }
                            { y === 0 || 
                                
                                <b className="relative pointer" style={{ float:"right" , top:"10px" }} 
                                    onClick = { () => { if( window.confirm("確認要 : 封存此關係人資料 ?") ) click_Archive_Relatives( x['relation_id'] , x['customer_id'] ) }  }>
                                    <i className="fas fa-download"></i>
                                </b> 

                            }
                        
                            { /* ----- 關係人欄位 -----  */ } 
                            <div className="columns is-multiline  is-mobile">

                                <Input type="text" name={ `customer_Relative_Name_${ index }` } label="姓 名" register={register} error={ null } icon="fas fa-user" asterisk={true} columns="3" />

                                { /* 類型 */ }    
                                <div className="column is-3-desktop required">

                                    <p> 類 型 </p>

                                    <div className="control has-icons-left">

                                        <div className="select" >
                                            <select { ...register( `customer_Relative_Type_${ index}` ) } >
                                                <option value="緊急連絡人"> 緊急連絡人 </option>
                                                <option value="介紹人">    介紹人    </option>
                                            </select>
                                        </div>

                                        <div className="icon is-small is-left">
                                            <i className="fas fa-globe"></i>
                                        </div>

                                    </div>

                                </div>

                                { /* 關係 */ }
                                <div className="column is-2-desktop required">

                                    <p> 關 係 </p>

                                    <div className="control has-icons-left">

                                        <div className="select">
                                            <select { ...register( `customer_Relative_Family_${ index }` ) }  >
                                                <option value="請選擇"> 請選擇 </option>
                                                <option value="父"> 父 </option>
                                                <option value="母"> 母 </option>
                                                <option value="兄"> 兄 </option>
                                                <option value="弟"> 弟 </option>
                                                <option value="姊"> 姊 </option>
                                                <option value="妹"> 妹 </option>
                                                <option value="夫妻"> 夫妻 </option>
                                                <option value="同學"> 同學 </option>
                                                <option value="朋友"> 朋友 </option>
                                                <option value="其他"> 其他 </option>
                                            </select>
                                        </div>

                                        <div className="icon is-small is-left">
                                            <i className="fas fa-user-friends"></i>
                                        </div>

                                    </div>

                                </div>

                                <Input type="text" name={ `customer_Relative_Cellphone_${ index }` }  label="手機號碼" register={register} error={ null } icon="fas fa-mobile-alt" asterisk={true} columns="2" />
                                <Input type="text" name={ `customer_Relative_Telephone_${ index }` }  label="家用電話" register={register} error={ null } icon="fas fa-phone" asterisk={false} columns="2" />

                                { /* 性別 */ }  
                                <div className="column is-2-desktop">

                                    <p> 性 別 </p>

                                    <div className="control has-icons-left">

                                        <div className="select">
                                            <select {...register( `customer_Relative_Sex_${ index }` )}  >
                                                <option value="請選擇">請選擇</option>
                                                <option value="男"> 男 </option>
                                                <option value="女"> 女 </option>
                                            </select>
                                        </div>

                                        <div className="icon is-small is-left">
                                            <i className="fas fa-venus-mars"></i>
                                        </div>

                                    </div>

                                </div>

                                <Input type="text" name={ `customer_Relative_Id_${ index }` }      label="身分證字號" register={register} error={ null } icon="fas fa-id-card-alt" asterisk={ false } columns="3"  />
                                <Input type="text" name={ `customer_Relative_Address_${ index }` } label="通訊地址"   register={register} error={ null } icon="fas fa-home"        asterisk={ false } columns="7"  />

                            </div>   

                            <br/><br/>
                            
                        </div> 


                }) 

             }
      
          </> 

} ;

export default Render_Customer_Relatives_Row
       