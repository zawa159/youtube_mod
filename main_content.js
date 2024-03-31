/*****
 *  グッドボタン等のメニューを1段下へ変更
 *****/

//グッドボタン等のメニューを1段下へ変更
const menu_newline = () => {
  //menuを２段に変更
  const metadata = document.getElementById('top-row');
  if (metadata !== null) {
    if (metadata.style.display !== 'inline-block') {
      metadata.style.display = 'inline-block';
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
  console.log(metadata);
  if (metadata.hasAttribute('hidden') === false) {
    if (metadata.hidden == false) {
      metadata.setAttribute('hidden', 'hidden');
      console.log('youtube_mod clip_button add_hidden');
    }
  }
  /*
  if (metadata !== null) {
    //metadata.remove();
    console.log('youtube_mod clip_button add_hidden');
  }
  */
};

/******
 *  Thanksボタン非表示 
 *****/
const hidden_Thanks = () => {
  //Thanksボタン非表示
  const metadata = document.querySelector('[aria-label="Thanks"]');
  if (metadata !== null) {
    metadata.remove();
    console.log('youtube_mod Thanks_button add_hidden');
  }
};

/******
 *  保存ボタン追加 
 *****/
const add_save = () => {
  // チャンネル登録ボタンの下にあるメニュー要素を取得
  const menu = document.querySelector('#menu > ytd-menu-renderer');
  if (!menu) {
    console.log('メニュー要素が見つかりませんでした');
    return;
  }

  // 保存ボタンがすでに存在するかどうかを確認
  const existingSaveButton = menu.querySelector('[aria-label="再生リストに保存"]');
  if (existingSaveButton) {
    console.log('保存ボタンはすでに存在します');
    return;
  }

  // 保存ボタンを作成
  const saveButton = document.createElement('button');
  saveButton.className = 'yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading';
  saveButton.setAttribute('aria-label', '再生リストに保存');
  saveButton.setAttribute('title', '保存');
  const elements = `
  <button class="yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading" aria-label="再生リストに保存" title="保存" style="">
    <div class="yt-spec-button-shape-next__icon" aria-hidden="true">
      <yt-icon style="width: 24px; height: 24px;">
        <!--css-build:shady-->
        <!--css-build:shady-->
        <yt-icon-shape class="style-scope yt-icon">
          <icon-shape class="yt-spec-icon-shape">
            <div style="width: 100%; height: 100%; display: block; fill: currentcolor;">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                <path d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z"></path>
              </svg>
            </div>
          </icon-shape>
        </yt-icon-shape>
      </yt-icon>
    </div>
    <div class="yt-spec-button-shape-next__button-text-content">保存</div>
    <yt-touch-feedback-shape style="border-radius: inherit;">
      <div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true">
        <div class="yt-spec-touch-feedback-shape__stroke" style=""></div>
        <div class="yt-spec-touch-feedback-shape__fill" style=""></div>
      </div>
    </yt-touch-feedback-shape>
  </button>
  `;

  // 保存ボタンをメニューに追加
  menu.appendChild(saveButton);

  console.log('保存ボタンを追加しました');
};

/******
 *  保存ボタン追加 
 *****/
/*
const add_save = () => {
  //クリップボタン非表示
  //メニューバー取得
  //const metadata = document.querySelector('[aria-label="再生リストに保存"]');
  const metadata = document.querySelector('#menu > ytd-menu-renderer');
  const add_button = document.querySelector('[aria-label="再生リストに保存"]');
  const elements = `
  <button class="yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading" aria-label="再生リストに保存" title="保存" style="">
    <div class="yt-spec-button-shape-next__icon" aria-hidden="true">
      <yt-icon style="width: 24px; height: 24px;">
        <!--css-build:shady-->
        <!--css-build:shady-->
        <yt-icon-shape class="style-scope yt-icon">
          <icon-shape class="yt-spec-icon-shape">
            <div style="width: 100%; height: 100%; display: block; fill: currentcolor;">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
                <path d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z"></path>
              </svg>
            </div>
          </icon-shape>
        </yt-icon-shape>
      </yt-icon>
    </div>
    <div class="yt-spec-button-shape-next__button-text-content">保存</div>
    <yt-touch-feedback-shape style="border-radius: inherit;">
      <div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true">
        <div class="yt-spec-touch-feedback-shape__stroke" style=""></div>
        <div class="yt-spec-touch-feedback-shape__fill" style=""></div>
      </div>
    </yt-touch-feedback-shape>
  </button>
  `;
  const add_element = new DOMParser().parseFromString(elements, "text/html");
  console.log(add_element);
  console.log(metadata);
  console.log(add_button);
  if (metadata !== null) {
    if (add_button !== null) {
      if (add_button !== null) {
        metadata.appendChild(add_element);
        console.log('youtube_mod add_save add_element');
      }
    }
  }
};

/******
 *  チャット欄動画下に移動
 *****/

/* メモ
1.position  fixed  ⇒  static  で下部に移動
  css ytd-watch-flexy[fixed-panels] #chat.ytd-watch-flexy

2.chat-container 内に secondary を移動

3.id columns  class="style-scope ytd-watch-flexy" に  「style="padding-right: 0px;"」を追加
  移動先親要素.appendChild(移動する要素);

4.full-bleed-container内のid="panels-full-bleed-container"を削除
　※２つあり、空が対象
*/



/*****
 * 更新する関数の配列
 *****/

const functionArray = [
  menu_newline,  //グッドボタン等のメニューを1段下へ変更
  hidden_Thanks, //Thanksボタン非表示
  hidden_clip,   //クリップボタン非表示
  add_save       //保存ボタン追加
];




/*****
 * ページ更新時の動作
 *****/
// URLの変更を監視する関数
function handleUrlChange() {
  functionArray.forEach(func => func());
}

// ページが読み込まれたときと、URLが変更されたときに実行される関数を設定
window.onload = function () {
  handleUrlChange(); // 初期URLの取得
  window.addEventListener('popstate', handleUrlChange); // ブラウザの戻る・進むボタンなどでURLが変更されたときのイベント
  window.addEventListener('hashchange', handleUrlChange); // URLのハッシュが変更されたときのイベント
};


/*****
 * 監視をすることで動的に動作する
 *****/

//コールバック関数
const callback = (mutations) => {
  //第一引数 mutations は変化の内容を表す MutationRecord オブジェクトの配列  （複数の関数を呼べる）
  functionArray.forEach(func => func());
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
