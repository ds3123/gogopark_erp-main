
module.exports = {

  preset : 'ts-jest/presets/js-with-ts' ,
  
  // testEnvironment : "node" ,
  testEnvironment : "jsdom" ,
  
  // 配合 : 絕對路徑的設定
  moduleDirectories : ['node_modules' , 'src']  ,  
 
  // 配合 ：測試設定( Enzyme )
  //setupFiles : [ "<rootDir>/setupTests.ts" ] ,     
  
  // 設定 _ 等待環境設定完畢，再進行測試，其檔案路徑 ( 避免出現測試檔案中，某些測試方法 undefined Ex. setupTests.ts 中的 .beforeAll )
  setupFilesAfterEnv : [ "<rootDir>/setupTests.ts" ] ,

  // 利用套件 identity-obj-proxy : 處理 _ css / less ／scss / png 樣式
  moduleNameMapper : {
    "\\.(css|less|scss|png)$" : "identity-obj-proxy"   
  } ,

  
  // coverageDirectory : "coverage" , 

  // testRegex : "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$" ,
  // testRegex : "(/__tests__/.*.*"


  // transform: {
  //   "^.+\\.svg$": "<rootDir>/svgTransform.js" // 新增 svgTransform.js : 處理 SVG 圖片
  // } ,


} ;



