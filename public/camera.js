import resCheck from './IfProcess';
var reset = 0;


window.onload = () => {
  const video  = document.querySelector("#camera");
  const canvas = document.querySelector("#picture");
  let URL = "https://183e-158-217-104-43.ngrok-free.app/api/predict"
  const overlay = document.getElementById('overlay');
  var SZ = 250;

  const overlayInner = document.getElementById('overlay-inner');
  overlayInner.addEventListener('click', stopEvent, false);
  
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
  //a href使った処理時にid=doomでこれ　document.getElementById("doom").addEventListener("click", getVideo, false);
  document.querySelector("#shutter").addEventListener("click", () => {
    const ctx = canvas.getContext("2d");

    if(reset == 1){
	    window.location.reload();
    }
    else{
	    reset += 1;
    }


    // 演出的な目的で一度映像を止めてSEを再生する
    video.pause();  // 映像を停止
    setTimeout( () => {
      video.play();    // 0.5秒後にカメラ再開
    }, 500);

    // canvasに画像を貼り付ける
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
     
    // canvasをpngに変換
    //食べログから画像引っ張ってるから再読み込みしないとキャンバス汚染で作動しない
　　const data = canvas.toDataURL("image/png");
    
    POST(data);
    scrollTo(0, 1000);

});

  function getVideo(){
	  
	  const ctx = canvas.getContext("2d");
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  // 演出的な目的で一度映像を止めてSEを再生する
	  video.pause();  // 映像を停止
	  setTimeout( () => {
          video.play();    // 0.5秒後にカメラ再開
	  }, 500);
    	  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	  // canvasをpng
	  const data = canvas.toDataURL("image/png");
	  POST(data);}
	
/*
  document.querySelector("#result").addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    const imgs = ['info/1/syouki.jpg', 'info/2/syouki.jpg', 'info/3/syouki.jpg','https://tblg.k-img.com/restaurant/images/Rvw/180968/640x640_rect_150a2a04531912b3b9067794ce5866e4.jpg'];
    var info1 = new Image();
    info1.src = imgs[0];
	  
    info1.onload = () => {
      let g = ctx.createLinearGradient(0, 0, SZ+4, SZ+4);
      g.addColorStop(0.0, 'red');
      g.addColorStop(0.5, 'blue');
      g.addColorStop(1.0, 'yellow');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, SZ+4, SZ+4);
      ctx.drawImage(info1, 2, 2, SZ, SZ);
};

    
    var info4 = new Image();
    info4.src = imgs[3];
    info4.onload = () => {
      let g = ctx.createLinearGradient(487, 487, 800, 800);
      g.addColorStop(0.0, 'red');
      g.addColorStop(0.5, 'blue');
      g.addColorStop(1.0, 'yellow');
      ctx.fillStyle = g;
      ctx.fillRect(487, 487, 306, 306);
      ctx.drawImage(info4, 490, 490, SZ+50, SZ+50);
    };

    canvas.addEventListener("click", Aim);
});
*/

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
	    .then(JSON.stringify)
	  	.then(show)
  　}

function show(tmp){
	const info = JSON.parse(tmp.replace('[', '').replace(']', ''));
	const ctx = canvas.getContext("2d");
	const imgs = ['info/credit/'+ info.Credit+'.jpg', info.Food, info.Inside];
	var infoA = new Image();
	var infoB = new Image();
	var infoC = new Image();

	
	infoA.src = imgs[0]
	infoB.src = imgs[1]
	infoC.src = imgs[2]

	infoA.onload = () => {
		ctx.drawImage(infoA, 0, canvas.height - 120, 298, 101);
		ctx.drawImage(infoB, 160, 0, 400, 400);
		ctx.drawImage(infoC, 560, 0, 400, 400);
	 }
}

	
	






	








  
  function Aim(e) {
  
    //クリックされた場所の座標をcanvas内座標に変換offsetX, offsetYでもいいかもしれない
    var rect = canvas.getBoundingClientRect();
    var point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    var hit =
        (0 <= point.x && point.x <= 200) 
     && (0 <= point.y && point.y <= 200)

    if (hit) { window.open('https://tabelog.com/osaka/A2701/A270302/27131021/dtlphotolst/1/smp2/', '_blank', 'noreferrer'); }

    var hit2 = 
      (490 <= point.x && point.x <= 800) 
     && (490 <= point.y && point.y <= 800)

    if (hit2) { overlayToggle() }
      
 
  }
  
  // オーバレイを開閉する関数
  function overlayToggle() {
      overlay.classList.toggle('overlay-on');
  }
    // 指定した要素に対して上記関数を実行するクリックイベントを設定
    const clickArea = document.getElementsByClassName('overlay-event');
    for(let i = 0; i < clickArea.length; i++) {
      clickArea[i].addEventListener('click', overlayToggle, false);
    }
  
    // イベントに対してバブリングを停止
  function stopEvent(event) {
      event.stopPropagation();
  }

  
};
