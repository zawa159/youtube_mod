/*****
 *  グッドボタン等のメニューを1段下へ変更
 *****/

//グッドボタン等のメニューを1段下へ変更
const menu_newline = () => {
  //menuを２段に変更
  const metadata = document.getElementById('top-row');
  if (metadata.style.display !== null) {
    if (metadata.style.display !== 'inline') {
      metadata.style.display = 'inline';
      console.log('youtube_mod menu_newline Loading complete');
    }
  }
};

  /******
   *  クリップボタン非表示 
   *****/
  const hidden_clip = () => {
    //クリップボタン非表示
    const metadata = document.querySelector('[aria-label="クリップ"]');
    if (metadata !== null) {
      if (metadata.hasAttribute('hidden') === false) {
        if (metadata.hidden == false) {
          metadata.setAttribute('hidden', 'hidden');
          console.log('youtube_mod clip_button add_hidden');
        }
      }
    }
  };

  /******
   *  Thanksボタン非表示 
   *****/
  const hidden_Thanks = () => {
    //Thanksボタン非表示
    const metadata = document.querySelector('[aria-label="Thanks"]');
    if (metadata !== null) {
      if (metadata.hasAttribute('hidden') === false) {
        if (metadata.hidden == false) {
          metadata.setAttribute('hidden', 'hidden');
          console.log('youtube_mod Thanks_button add_hidden');
        }
      }
    }
  };

  /*****
   * 監視をすることで動的に動作する
   *****/

  //コールバック関数
  const callback = (mutations) => {
    //第一引数 mutations は変化の内容を表す MutationRecord オブジェクトの配列  （複数の関数を呼べる）
    mutations.forEach((mutation) => {
      menu_newline();  //グッドボタン等のメニューを1段下へ変更
      hidden_clip();   //クリップボタン非表示
      hidden_Thanks(); //Thanksボタン非表示
    })
  };

  //コンストラクターにコールバック関数を渡してオブザーバーを生成
  const observer = new MutationObserver(callback);

  //監視対象の DOM（ノードや要素）この場合は body を監視
  const target = document.body;

  //監視のオプション
  const config = {
    childList: true, //対象ノードの子ノードに対する追加・削除の監視を有効に
    attributes: false, //対象ノードの属性に対する変更の監視を有効に
    characterData: false, //対象ノードのテキストデータの変更の監視を有効に
    subtree: false, //対象ノードとその子孫ノードに対する変更の監視を有効に
  };

  //observe() メソッドに監視対象と監視オプションを指定して実行（監視を開始）
  observer.observe(target, config);
