

/* @ 編輯字串 */


// 擷取 _ 長字串 ( ... )
export const string_Short = ( str : string , length? : number ) : string => {

    if( !str ) return "" ;

    if( !length && str.length > 3 )  return str.slice(0,3) +'...' ;

    if( length ) return str.length > length ? str.slice(0,length) +'...' : str

    return str

    
};



// 轉換 : 字串分割格式 _ 斜線
export const string_Format_Slash = ( str : string ) => {

    const str_Arr = str.split( ',' ) ;

    return str_Arr.join( ' / ' )

} ;


// 擷取 _ 最後 1 個數字，到倒数第 6 個數字 ( for 寵物編號 )
export const extract_Last_6_Nums = ( inputString : string ) => {

    // 使用正则表达式匹配数字
    const numbers = inputString.match(/\d/g);
  
    // 如果没有找到数字，返回空字符串
    if (!numbers) {
      return "";
    }
  
    // 检查数字数量是否足够，至少要有六个数字
    if (numbers.length >= 6) {
      // 使用数组的 slice 方法擷取最后一个数字到倒数第六个数字
      const extractedNumbers = numbers.slice(-6).join("");
      return extractedNumbers;
    } else {
      // 如果数字不够六个，返回空字符串或者你需要的错误处理
      return "";
    }
  }
  


//  將字串第二個字以後，改以 * 代替
export const string_Replace_WithAsterisks = ( inputString : string) => {

  // 字串長度小於 2，不替换
  if ( inputString.length < 2 ) return inputString ; 
  
  // 取出第一個字
  const firstCharacter = inputString.charAt( 0 );
 
  // 建立與剩餘字串數量相同的星號字串
  const asterisks      = '*'.repeat( inputString.length - 1 ); 

  return firstCharacter + asterisks ;

}
