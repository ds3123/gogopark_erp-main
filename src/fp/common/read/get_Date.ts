import moment from "moment" ;


// 取得 _ 今天日期 : 格式 YYYY-MM-DD ( Ex. 2023-07-20 ) < T >
export const get_Hyphen_Today = () => moment( new Date() ).format( 'YYYY-MM-DD' ) ;



// 取得 _ 去除空白後的時間 < T >
export const get_Trim_Time = ( timeStr : string ) : string => {

  // 排除 _ 空字串 
  if( timeStr === '' ) return ''

  const cleanTimeStr              = timeStr ? timeStr.replace(/\s/g, '') : ""  ; // 去除空格
  const [ hoursStr , minutesStr ] = cleanTimeStr.split(':') ;    // 分割小时和分钟

  const hours   = parseInt( hoursStr , 10 ) ;
  const minutes = parseInt( minutesStr , 10 ) ;

  // 建立時間物件
  const time = new Date()  ;
  time.setHours( hours) ;
  time.setMinutes(minutes);

  
  // 回傳 _ 轉換 
  return moment( time ).format( 'HH:mm' )


} ;











