/* eslint-disable jsx-a11y/alt-text */

import { useState } from 'react';

// Material UI
import TextField from '@material-ui/core/TextField' ;
import { makeStyles } from '@material-ui/core/styles' ;
import Container from '@material-ui/core/Container' ;

import logo from 'imgs/logo.png' ;
import { useHistory } from "react-router-dom" ;

// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" ;
import { yupResolver } from "@hookform/resolvers/yup" ;
import * as yup from "yup" ;
import { Toast } from 'templates/note/Toast' ;
import { useFetch_Employees } from "hooks/react-query/employee/useFetchEmployees" ;
import cookie from 'react-cookies';


// 員工資料
interface ISignin {
    signin_Account  : string ; // 帳號
    signin_Password : string ; // 密碼
}


const useStyles = makeStyles((theme) => ({

    paper: {
             marginTop     : theme.spacing( 8 ) ,
             display       : 'flex' ,
             flexDirection : 'column' ,
             alignItems    : 'center' ,
           }

}));




// @ 登入
const Sign_In = () => {


    const history     = useHistory() ;
    const accountData = useFetch_Employees() ;  // 取得 _ 所有員工資料

    const [ is_Account_Error , set_Is_Account_Error ] = useState( false ) ; // 帳號或密碼錯誤

    
    const schema = yup.object().shape({
        signin_Account  : yup.string().required("必填欄位") ,
        signin_Password : yup.string().required("必填欄位") ,
    });

    // React Hook Form
    const { setValue , handleSubmit , control , formState: { errors , isDirty , isValid } } =
            useForm<ISignin>({
                mode     : "all" ,
                resolver : yupResolver( schema ) ,
            }) ;


    // 提交表單
    const onSubmit : SubmitHandler<ISignin> = ( data : any ) => {

       const account  = data['signin_Account'] ;   // 帳號
       const password = data['signin_Password'] ;  // 密碼

        if( accountData.length > 0 ){

            accountData.forEach( x => {

                // 帳號密碼 _ 正確
                if( x['account'] === account && x['password'] === password ){


                    // 設定 _ Cookie
                    cookie.save( 'userInfo' , x , { path : '/'  } ) ;


                    Toast( "登入成功" ) ;

                    // 跳轉頁面
                    history.push('/index') ;

                    return false ;

                }

                // 帳號密碼 _ 錯誤
                set_Is_Account_Error( true ) ;

            }) ;

            return false ;

        }

        // 帳號密碼 _ 錯誤
        set_Is_Account_Error( true ) ;

    } ;


    const classes = useStyles();
    const lS      = { position : "relative" , top:"40px" , left:"15px" , width:"350px" , height : "120px"  } as const ;

    return <Container component="main" maxWidth="xs">

              <img src={ logo } className="m_Top_150" width='350px' style={ lS }/>

              { /* 錯誤提示 */ }
              { is_Account_Error &&
                   <>
                      <br/>
                          <b className="tag is-large is-danger relative w-full" style={{ top:"60px" }}>
                              <i className="fas fa-exclamation"></i> &nbsp; 帳 號 或 密 碼 錯 誤
                          </b>
                       <br/>
                   </>
              }

              <div className={classes.paper}>

                <form onSubmit = { handleSubmit( onSubmit ) }   >

                    { /* 帳號 */ }
                    <Controller control = { control }
                                name    = "signin_Account"
                                render  = { ({ field,formState}) => (
                                                    <TextField variant  = "outlined"
                                                               error    = {!!formState.errors?.signin_Account}
                                                               margin   = "normal"
                                                               fullWidth
                                                               label    = "請輸入 : 帳號"
                                                               autoFocus
                                                               onChange = { ( e ) => field.onChange( e ) } />
                                                 )}  />


                    { /* 密碼 */ }
                    <Controller control = { control }
                                name    = "signin_Password"
                                render  = {({ field, formState}) => (
                                                    <TextField variant  = "outlined"
                                                               error    = {!!formState.errors?.signin_Account}
                                                               margin   = "normal"
                                                               fullWidth
                                                               label    = "請輸入 : 密碼"
                                                               type     = "password"
                                                               autoComplete = "current-password"
                                                               onChange = { ( e ) => field.onChange( e ) } />
                                              )}    />


                    {/*<FormControlLabel control = {<Checkbox value="remember" color="primary" />}*/}
                    {/*                  label   = "記住我" style={{ float:"right" }} />*/}


                    <br/> <br/>

                    <button disabled = { !isValid } type="submit" className="button is-primary relative is-medium"  style={{ width:'100%', height:"60px" }}>
                        登 入 系 統
                    </button>

                    <div className = "has-text-centered m_Top_30" > 
                       更新時間 : 2023.11.07
                    </div>

                </form>

            </div>

            </Container>

} ;

export default Sign_In