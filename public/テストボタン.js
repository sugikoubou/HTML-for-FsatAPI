const Banner = {
  bgcolor: "#FFFFFF",  // 背景色
  font: "48px serif",  // フォント
  fontcolor: "Blue",   // 文字色
  text: "Hello World", // テキスト



//---------------------------------------------
// [event] ページ読み込み完了
//---------------------------------------------
window.onload = ()=>{
  // Canvasの情報を代入
  const board = document.querySelector("#board");
  Banner.canvas.ctx    = board.getContext("2d");
  Banner.canvas.width  = board.width;   // 横幅
  Banner.canvas.height = board.height;  // 高さ


  const img = new Image();    //画像オブジェクト作成
  img.src = "/nakanoya (31).jpg";  //写真のパスを指定する
  
  Banner.drawImage(img, 0, 0, canvas.width, canvas.height);


const button = document.querySelector('input');

button.addEventListener('click', updateButton);

function updateButton() {
  if (button.value === 'クリックしてね') {
    button.value = 'マシンを停止';

    const canvas = board.toDataURL("image/jpg");  // DataURI Schemaが返却される


    const param  = {
      method: "POST",
      body: canvas
    };
    
    sendServer('https://7035-2400-4150-4341-1f00-b562-68d1-b7c1-fd5e.ngrok-free.app/api/predict', param);


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

}
