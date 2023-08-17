export default function resCheck(respo) {
  const test = JSON.stringify(respo);
  console.log(test);
  const test2 = test.replace('[', '').replace(']', '');
  console.log(test2);
  respo = JSON.parse(test2);
  alert(respo.Name);
  
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
