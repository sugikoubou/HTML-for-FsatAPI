window.onload = () => {
  const video  = document.querySelector("#camera");
  const canvas = document.querySelector("#picture");
  let URL = "https://93d0-2400-4150-4341-1f00-940b-675b-8e2e-40c7.ngrok-free.app/api/predict"


  
  
  /** カメラ設定 */
  const constraints = {
    audio: false,
    video: {
      width: { min: 400, ideal: 1080, max: 1440 },
      height: { min: 400, ideal: 1080, max: 1440 },
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

  //シャッターボタンが押されたらの動作が下
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
　　const data = canvas.toDataURL("image/png");
    
    POST(data);

});

  document.querySelector("#result").addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    const imgs = ['info/1/syouki.jpg', 'info/2/syouki.jpg', 'info/3/syouki.jpg','https://tblg.k-img.com/restaurant/images/Rvw/180968/640x640_rect_150a2a04531912b3b9067794ce5866e4.jpg'];
    var info1 = new Image();
    info1.src = imgs[0];
    info1.onload = () => {
      ctx.drawImage(info1, 0, 0, canvas.width/4, canvas.height/4);
    };

    
    var info4 = new Image();
    info4.src = imgs[3];
    info4.onload = () => {
      ctx.drawImage(info4, 600, 600, canvas.width/4, canvas.height/4);
    };

    canvas.addEventListener("click", hoge);

  });


  

  function POST(imgNE) {
    const data = imgNE
　　const filename="sample.png";
    const type="image/png";
    const bin = atob(data.replace(/^.*,/, ''));
    const buffer = new Uint8Array(bin.length).map((_,x)=>bin.charCodeAt(x));
    const blob = new Blob([buffer.buffer], {type});
    const method="post";
    const body=new FormData();
    body.append("file",blob,filename);
    //.then(res=>res.json()).then(console.log)
    fetch(URL,{method,body})
    .then(res=>res.json())
      .then(get_func)
      
      //.then(console.log)
    
  　}

  function get_func(url) {
      fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(function(text) {
        let view = document.getElementById("view")
        view.textContent = ""
        // 取得テキストを一行ごとにループ（ただ改行して表示しているだけ）
        text.split("\n").forEach((value) => {
          view.insertAdjacentHTML('beforeend', value);
          view.insertAdjacentHTML('beforeend', "<br>");
        })
      });
    }

  function Aim(e) {
  
    //クリックされた場所の座標をcanvas内座標に変換offsetX, offsetYでもいいかもしれない
    var rect = canvas.getBoundingClientRect();
    var point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    //クリックした座標が画像の上にあるか判定（丸いボタンなので四隅は無いけどクリックしたことにする）
    var hit =
        (0 <= point.x && point.x <= 200) 
     && (0 <= point.y && point.y <= 200)

    if (hit) { window.alert('pushed!'); }
 
}

  
};
