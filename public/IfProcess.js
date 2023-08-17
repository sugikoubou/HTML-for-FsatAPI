export default function resCheck(name) {
  console.log(name);
  const info = JSON.parse(name); //jsonからJSオブジェに変換
  
  if(info.Name === 'koiwa'){
      console.log('ここは小岩');
  }
  /*
  if (condition1)
    statement1
  else if (condition2)
    statement2
  else if (condition3)
    statement3
  else
    statementN
    */
}
