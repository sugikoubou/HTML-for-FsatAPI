export default function resCheck(json) {
  console.log(json);
  console.log(json['Name']);
  
  alert(json.Credit);
  if(json.Name === 'koiwa'){
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
