import { decode } from './encode.js';

window.onload = () => {
  const video  = document.querySelector("#camera");
  const canvas = document.querySelector("#picture");
  let URL = "https://2888-153-252-13-4.ngrok-free.app/api/predict"

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


    // canvasをpng
    const test = canvas.toDataURL("image/png");
     
    const param  = {
      method: "POST",
      body: test
    };


    const imgFile = _convertToFile(test);
    //var imgFile = new Image();
    //imgFile.src = test;

    const fd = new FormData();
    fd.append('file', imgFile);

    console.log(fd.get('file')); // File情報

    const fc = new FormData();
        fc.append("file", test);

     console.log(fc.get('file')); // File情報

        fetch(URL, {
            method: 'POST',
            body: fd
            
        })
     
    //sendServer('https://c739-2400-4150-4341-1f00-31aa-6fac-bb85-b398.ngrok-free.app/api/predict', param);


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

  function _convertToFile (imgData) {
　　　　　  //const base64 = require('url-safe-base64')
            
　          let data = imgData
            // デコードデータの取り出し
            const predata = data.split(',')
　          const img = base64.decode(predata[1]) 
    
            return new File(img, "example.png", {type: "image/png"});
        }
  
};
