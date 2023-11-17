


// 取得 _ 給定數值之間，隨機整數
export const get_RandomInt = ( max : number ) =>{

    return Math.floor( Math.random() * Math.floor( max ) );

};


// 取得 _ 時間戳記 _ 最後 5 碼
export const get_TimeStamp_5 = ( ) =>{

   const time = new Date().getTime();   
   return time.toString().slice( -5 ) ;

};


// 取得 _ 總計數字
export const get_Sum = ( arr : number[] ) : number => {

  return arr.reduce( ( accu , curr ) => accu + curr  , 0 ) ;

}




