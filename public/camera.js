window.onload = () => {
  const video  = document.querySelector("#camera");
  const canvas = document.querySelector("#picture");

  /** カメラ設定 */
  const constraints = {
    audio: false,
    video: {
      width: 400,
      height: 400,
      facingMode: "environment"   // フロントカメラを利用する = user
      // facingMode: { exact: "environment" or user}  // リアカメラを利用する場合
    }
  };

  /**
   * カメラを<video>と同期
   */
  navigator.mediaDevices.getUserMedia(constraints)
  .then( (stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
    };
  })
  .catch( (err) => {
    console.log(err.name + ": " + err.message);
  });

  /**
   * シャッターボタンが押されたらの動作が下
   */
   document.querySelector("#shutter").addEventListener("click", () => {
    const ctx = canvas.getContext("2d");

    // 演出的な目的で一度映像を止めてSEを再生する
    video.pause();  // 映像を停止
   
    setTimeout( () => {
      video.play();    // 0.5秒後にカメラ再開
    }, 500);

    // canvasに画像を貼り付ける
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
     
    const test = canvas.toDataURL("image/png");
     
    const param  = {
      method: "POST",
      body: test
    };

    const fd = new FormData();
        fd.append("file", test);

        fetch('https://7035-2400-4150-4341-1f00-b562-68d1-b7c1-fd5e.ngrok-free.app/api/predict', {
            method: 'POST',
            body: test
            
        })
     
    //sendServer('https://7035-2400-4150-4341-1f00-b562-68d1-b7c1-fd5e.ngrok-free.app/api/predict', param);


    });
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
     
  
};
