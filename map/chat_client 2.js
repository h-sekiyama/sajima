// WebSocketサーバに接続
var ws = new WebSocket('ws://192.168.43.253:8888');
 
// エラー処理
ws.onerror = function(e){
  $('#chat-area').empty()
    .append(
      $('<i/>').addClass('icon-warning-sign'),
      'サーバに接続できませんでした。'
    );
}
 
// ユーザ名をランダムに生成
var userName = location.hostname;
// チャットボックスの前にユーザ名を表示
$('#user-name').append(userName);
 
// WebSocketサーバ接続イベント
ws.onopen = function() {
  $('#textbox').focus();
  // 入室情報を文字列に変換して送信
  ws.send(JSON.stringify({
    type: 'join',
    user: userName
  }));
};
 
// メッセージ受信イベントを処理
ws.onmessage = function(event) {
  // 受信したメッセージを復元
  var data = JSON.parse(event.data);
  var item = $('<li/>').append(
    $('<div/>').append(
      $('<i/>').addClass('icon-user'),
      $('<small/>').addClass('meta chat-time').append(data.time))
  );
 
  // pushされたメッセージを解釈し、要素を生成する
  if (data.type === 'join') {
    item.addClass('alert alert-info')
    .children('div').children('i').after(data.user + 'の追跡開始');
    // 現在位置を取得する
    var watchId = navigator.geolocation.watchPosition( successFunc , errorFunc , optionObj );
  } else if (data.type === 'defect') {
    item.addClass('alert')
    .children('div').children('i').after(data.user + 'の追跡終了');
    // 位置情報の追跡を中止する
    navigator.geolocation.clearWatch( watchId );
  } else {
    item.addClass('alert alert-error')
    .children('div').children('i').removeClass('icon-user').addClass('icon-warning-sign')
      .after('不正なメッセージを受信しました');
  }
  $('#chat-history').prepend(item).hide().fadeIn(500);
};

// 位置情報取得を成功した時の関数
function successFunc( position )
{
  var googleMap = $('[data-google-map]');
  var mapCoordinateX = position.coords.latitude;
  var mapCoordinateY = position.coords.longitude;
  var mapUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCefs07HExKigFfi5VfNNvJTkna5Vzerjw&q=' + mapCoordinateX + ',' + mapCoordinateY + '&zoom=15';
  googleMap.attr('src', mapUrl);
}

// 位置情報取得を失敗した時の関数
function errorFunc( error )
{
  // エラーコードのメッセージを定義
  var errorMessage = {
    0: "原因不明のエラーが発生しました…。" ,
    1: "位置情報の取得が許可されませんでした…。" ,
    2: "電波状況などで位置情報が取得できませんでした…。" ,
    3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。" ,
  } ;

  // エラーコードに合わせたエラー内容をアラート表示
  alert( errorMessage[error.code] ) ;
}

// オプション・オブジェクト
var optionObj = {
  "enableHighAccuracy": false ,
  "timeout": 8000 ,
  "maximumAge": 5000 ,
} ;
 
// ブラウザ終了イベント
window.onbeforeunload = function () {
  ws.send(JSON.stringify({
    type: 'defect',
    user: userName,
  }));
};
