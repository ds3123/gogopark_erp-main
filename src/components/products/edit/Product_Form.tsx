/* eslint-disable react/jsx-pascal-case */
import { useState , useEffect } from 'react' ;


// react-draft-wysiwyg
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css" ;
import { EditorState , convertFromRaw , convertToRaw, ContentState } from "draft-js" ;
import { Editor } from "react-draft-wysiwyg" ;
import draftToHtml from "draftjs-to-html" ;
import htmlToDraft from "html-to-draftjs" ;



import Upload_SIngle_Image from 'utils/upload-file/Upload_SIngle_Image' ;


const Product_Form = () => {

     // 編輯器內容狀態
     const [ eidtorState , setEidtorState ] = useState( EditorState.createEmpty() ) ;
 
     // 變更 _ 編輯器內容
     const onEditorStateChange = ( editorState : any  ) => {
    
        // 1. 設定 _ 狀態
        setEidtorState( editorState ) ;


        // 更新 _ 資料庫內容

        // 2. 將 Editor 內容，轉為 html 標籤自字串，以輸入資料庫
        const htmlStringData = draftToHtml( convertToRaw( editorState.getCurrentContent() ) ) ;

    
        /*
           3. 
  
              Ex.
                 db.collection( 'userDocs' ).doc( session.user.email )
                    .collection( 'docs' ).doc( id )
                    .set( {
  
                       editorState : convertToRaw( editorState.getCurrentContent() )    // 將目前內容狀態，轉為 JSON 格式傳送
  
                    } , {
    
                       merge :true 
  
                    } )
           
         */
  
  
     } ;

      
     // 將後端資料內容 ( html 字串 )，利用 htmlToDraft，轉為 Editor 可讀取的格式
     const setMessageToEditorState = ( message : string ) => {

        const contentBlock = htmlToDraft( message ) ;

        if( contentBlock ){

            const contentState = ContentState.createFromBlockArray( contentBlock.contentBlocks ) ;

            setEidtorState( EditorState.createWithContent( contentState ) ) ;

        }
     
     } ;   


     // 上傳圖片 Callback
     const uploadImageCallBack = ( file : any ) => {

        return new Promise(

                    ( resolve , reject ) => {

                        const xhr = new XMLHttpRequest() ;

                        xhr.open( 'POST' , 'https://api.imgur.com/3/image' );
                        xhr.setRequestHeader( 'Authorization' , 'Client-ID cd1171acdc9d048' ) ; // 驗證 Imgurl 的 Clinet ID

                        const data = new FormData() ;
                        data.append( 'image' , file ) ;

                        xhr.send( data ) ;

                        // 成功
                        xhr.addEventListener( 'load' , () => {

                            const response = JSON.parse( xhr.responseText ) ;
                            console.log( response )
                            resolve( response ) ;

                        }) ;

                        // 錯誤
                        xhr.addEventListener( 'error' , () => {

                            const error = JSON.parse( xhr.responseText ) ;
                            console.log( error )
                            reject( error ) ;

                        });

                    }

              ) ;

     }


     // for 編輯 ( 設定 _ 資料庫資料 )
     useEffect( () => {
       
        const fromDatabase = "<p>gg<span style='color:red;'><strong>ggggg </strong></span></p>"  ;

        setMessageToEditorState( fromDatabase )
        
     } , [] ) ;


    return <>

              <Upload_SIngle_Image />

              <hr/>

              <div style = {{ border : '1px solid rgba( 0 , 0 ,0 , .1 )' }} >

                 <Editor editorState         = { eidtorState }
                         onEditorStateChange = { onEditorStateChange }
                         toolbarClassName    = "flex sticky top-0 z-50 !justify-center mx-atuo" 
                         editorClassName     = "p-3 bg-white shadow-md max-w-6xl mx-auto mb-12 border" 

                         toolbar = {{

                            inline    : { inDropdown : true } ,
                            list      : { inDropdown : true } ,
                            textAlign : { inDropdown : true } ,
                            link      : { inDropdown : true } ,
                            history   : { inDropdown : true } ,
                            image     : { 
                                          urlEnabled       : true ,   
                                          uploadEnabled    : true ,
                                          uploadCallback   : uploadImageCallBack , 
                                          previewImage     : true ,
                                          inputAccept      : "image/*" , 
                                          alt              : { present : true , mandatory: false  } ,
                                        } ,

                          }}


                        //  toolbar = {{
                        //                 options : [ 'inline', 'blockType' , 'fontSize' , 'textAlign' ,  'history', 'colorPicker' ],                                
                        //                 inline : {
                        //                             options: ['italic'],
                        //                             bold: { className : 'demo-option-custom' },
                        //                             italic: { className: 'demo-option-custom' },
                        //                             underline: { className: 'demo-option-custom' },
                        //                             strikethrough : {className: 'demo-option-custom' },
                        //                             monospace: { className: 'demo-option-custom' },
                        //                             superscript: {className: 'demo-option-custom'},
                        //                             subscript: { className: 'demo-option-custom' }
                        //                           },
                        //                 blockType : {className: 'demo-option-custom-wide',
                        //                 dropdownClassName: 'demo-dropdown-custom'},
                        //                 fontSize : { className: 'demo-option-custom-medium' }
                        //              }}
                         
                         />
              
              </div>

            </>

} ;

export default Product_Form
       