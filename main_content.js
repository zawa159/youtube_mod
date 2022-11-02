//グッドボタン等のメニューを２列へ変更
const menu_newline = () => {
  //menuを２段に変更
  const metadata = document.getElementById('top-row')
  console.log(metadata.style.display);
  metadata.style.display = 'inline';
  console.log(metadata.style.display);
}

const delayExec = () => {
  setTimeout(menu_newline(), 150000);
}

/*
const hide_share_button = () => {
  //共有ボタンを取得
  let shareButton = document.querySelectorAll('ytd-button-renderer')
 
  //共有を非表示へ
  shareButton.style.display = "none";
}
*/
// ページ読み込み後に実行するよう設定
//window.addEventListener('load', () => menu_newline(), false);
//window.onload = menu_newline;
window.ontransitionend  = menu_newline;