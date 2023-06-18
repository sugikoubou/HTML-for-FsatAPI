const button = document.querySelector('input');

button.addEventListener('click', updateButton);

function updateButton() {
  if (button.value === 'クリックしてね') {
    button.value = 'マシンを停止';

    var img = new Image();    //画像オブジェクト作成
    img.src = "/nakanoya (31).jpg";  //写真のパスを指定する

    const param  = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({data: img})
    };
    
    sendServer('https://a13a-2400-4150-4341-1f00-b562-68d1-b7c1-fd5e.ngrok-free.app/api/predict', param);


/**
 * サーバへJSON送信
 *
 * @param url   {string} 送信先URL
 * @param param {object} fetchオプション
 */
function sendServer(url, param){
  fetch(url, param)
    .then((response)=>{
      return response.json();
    })
    .then((json)=>{
      if(json.status){
        alert("送信に『成功』しました");
        setImage(json.result);    //json.resultにはファイル名が入っている
      }
      else{
        alert("送信に『失敗』しましたよ");
        console.log(`[error1] ${json.result}`);
      }
    })
    .catch((error)=>{
      alert("送信に『失敗』しました");
      console.log(`[error2] ${error}`);
    });
}

    
  } 
}
