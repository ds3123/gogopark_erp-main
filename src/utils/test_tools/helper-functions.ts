
import { screen, within }  from "@testing-library/react" ;
import user from "@testing-library/user-event" ;


// 取得 _ 特定 : 單一元素
export const element = ( selector : any ) => document.querySelector( selector ) ;

// 取得 _ <form> 元素
export const form = () => element( "form" ) ;


/*

    # 測試 <input type = "text">
      
     1. 是否存在 
     2. 類型 ( textbox )
     3. <label>
     4. name 屬性
     5. 是否必填 ( required )

*/ 
export const test_Input_Text = ( label : string , name : string , required : boolean ) => {

    const input = screen.getByRole( "textbox" , { name : label } ) ;

    expect( input ).toBeInTheDocument() ;
    expect( input ).toHaveAttribute( 'name' , name ) ;  // name 屬性

    //  是否必填
    if( required ){

        expect( input ).toBeRequired() ;

    }else{

        expect( input ).not.toBeRequired() ;

    }

} ;

/*

    # 測試 <input type = "number" >
      
     1. 是否存在 
     2. 類型 ( spinbutton )
     3. <label>
     4. name 屬性
     5. 是否必填 ( required )

*/ 
export const test_Input_Number = ( label : string , name : string , required : boolean ) => {

    const input = screen.getByRole( "spinbutton" , { name : label } ) ;

    expect( input ).toBeInTheDocument() ;
    expect( input ).toHaveAttribute( 'name' , name ) ;  // name 屬性

    
    //  是否必填
    if( required ){

        expect( input ).toBeRequired() ;

    }else{

        expect( input ).not.toBeRequired() ;

    }

} ;

/*

    # 測試 <select>
      
     1. 是否存在 
     2. 類型 ( combobox )
     3. <label>
     4. name 屬性
     5. 是否必填 ( required )
     6. 選項 ( options )

*/ 

export const test_Select = ( label : string , name : string , required : boolean , options? : string[] ) => {

    const select = screen.getByRole( "combobox" , { name : label } ) ;

    expect( select ).toBeInTheDocument() ;
    expect( select ).toHaveAttribute( 'name' , name ) ;  // name 屬性
    
    //  是否必填
    if( required ){

        expect( select ).toBeRequired() ;

    }else{

        expect( select ).not.toBeRequired() ;

    }

    // 選項

    const select_Options = within( select ).getAllByRole( "option" ) ; // 取得 <select> 的所有 <option> 選項

    if( options && select_Options && select_Options.length > 0 ){

        const arr = select_Options.map( ( x : any ) => x.value ) ; // 取得 <option> 值

        expect( arr ).toEqual( options )

    }


} ;

/*

    選擇 _ <select> 特定 <option>

*/
export const type_Select_Option = async( label : string , option : string ) => {


    const select = screen.getByRole( "combobox" , { name : label } ) ;
    await user.selectOptions( select , within( select ).getByRole( "option" , { name : option } ) ) ;


} ;



