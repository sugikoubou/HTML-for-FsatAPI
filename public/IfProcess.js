export default function resCheck(respo) {
  const tmp = JSON.stringify(respo);
  respo = JSON.parse(tmp.replace('[', '').replace(']', ''));
  alert(respo.Name);
  
  if(respo.Name === 'koiwa'){
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
