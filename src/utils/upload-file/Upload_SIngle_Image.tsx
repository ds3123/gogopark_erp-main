/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react' ;


 
// @ 上傳、預覽 _ 單一圖片
const Upload_SIngle_Image = () => {


  const [ selectedImage , setSelectedImage ] = useState( null ) ;


  return <>
           
            { /* 如果有選擇圖片 */ }
            { selectedImage && (
                <>
                   <img src = { URL.createObjectURL( selectedImage ) } width = "250px" /> <br />
                   <button onClick = { () => setSelectedImage( null ) } > 刪除圖片 </button>
                </>
            )}

            <br/> <br/>

            <input type = "file" name = "myImage" 
                   onChange = { ( event : any ) => setSelectedImage( event.target.files[0] ) }  />
        
        </> ;

} ;


export default Upload_SIngle_Image
       