
import { useState , useEffect } from 'react'

import { savePost } from './API' ;
import {Redirect} from 'react-router'



const Editor = ( { user } : { user: { id : string } } ) => {

    const [ isSaving , setIsSaving ] = useState( false ) ;  // 提交鈕
    const [ redirect , setRedirect ] = useState(false) ;    // Router 重導向

    // 提交
    const handleSubmit = async( e : any ) => {
    
        e.preventDefault() ;

        // 更改按鈕狀態
        setIsSaving( true ) ;


        // 新增 Post
        const { title , content , tags } = e.target.elements
        const newPost = {
                          title    : title.value ,
                          content  : content.value,
                          tags     : [ "tag1" , "tag2" ] ,
                          authorId : user.id
                        }

        await savePost( newPost ) ;
        await setRedirect( true ) ; // 提交完成後，重新導向 
    
    } ;


    // 提交後，重導向
    if( redirect ) return <Redirect to="/" />


    return <form onSubmit={ handleSubmit }>
 
                <label htmlFor="title-input"> 標 題 </label> 
                <input id = "title-input" name="title" />

                <label htmlFor="content-input"> 內 容 </label> 
                <input id = "content-input" name="content"  />

                <label htmlFor="tags-input"> 標 籤 </label> 
                <input id = "tags-input" name="tages"  />

                <button type="submit" disabled={ isSaving }> 提 交 </button> 

           </form>

} ;


export default Editor
       