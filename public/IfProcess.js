export default function resCheck(respo) {
  const tmp = JSON.stringify(respo);
  respo = JSON.parse(tmp.replace('[', '').replace(']', ''));
  alert(respo.Name);
  
  if(respo.Name === 'koiwa'){
      console.log('ここは小岩');
  }
  
  else if (respo.Name ==='kizan'){

    
  }
  
  else if (respo.Name === 'nukunuku'){

    
  else if (respo.Name === 'nakanoya'){

    
  else if (respo.Name === 'syouki'){
  }

  else{
    console.log(err.name + ": " + err.message);
  }

    
}


function castInfo()
