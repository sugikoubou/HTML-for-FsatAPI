export default function resCheck(respo) {
  console.log(respo);
  const test = JSON.stringify(respo);
  console.log(test);
  const test2 = test.replace('[', '').replace(']', '');
  console.log(test2,test2.Credit);
  
  if(test.Name === 'koiwa'){
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
