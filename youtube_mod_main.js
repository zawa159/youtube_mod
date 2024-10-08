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
      //console.log('youtube_mod menu_newline Loading complete');
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
    metadata.remove();
    //console.log('youtube_mod clip_button add_hidden');
  }
};

/******
 *  Thanksボタン非表示 
 *****/
const hidden_Thanks = () => {
  //Thanksボタン非表示
  const metadata = document.querySelector('[aria-label="Thanks"]');
  if (metadata !== null) {
    metadata.remove();
    //console.log('youtube_mod Thanks_button add_hidden');
  }
};


/******
 *  チャット欄を画面下に移動
 *****/
const move_Chat = () => {
  //シアターモードのchat欄を下に移動
  //chat欄の[position]を[fixed]⇒[static]へ変更
  const metadata_chat = document.getElementById('chat');
  if (metadata_chat !== null) {
    const computedStyle_chat = window.getComputedStyle(metadata_chat);
    if (computedStyle_chat.position !== null) {
      if (computedStyle_chat.position === 'fixed') {
        metadata_chat.style.position = 'static';
      }
    }
  }

  //チャット欄下に動画一覧を移動
  //chat-container 内に secondary を移動
  const metadata_cinematics = document.getElementById('cinematics');  //シアターモード判定用
  const metadata_chatContainer = document.getElementById('chat-container');  //チャットコンテナ取得
  //シアターモードか判定
  if (metadata_cinematics !== null) {
    if (metadata_chatContainer !== null) {
      if (!metadata_chatContainer.querySelector('#secondary')) {
        const metadata_secondary = document.getElementById('secondary');
        // metadata_secondaryをmetadata_chat_container内に移動させる
        metadata_chatContainer.appendChild(metadata_secondary);
        console.log('youtube_mod move_Chat secondary in chat-container');
      }
    }
  } else {
    if (metadata_chatContainer !== null) {
      const metadata_secondary_inner = document.getElementById('secondary-inner');
      if (metadata_secondary_inner !== null) {
        // metadata_secondaryをmetadata_chat_container内に移動させる
        metadata_secondary_inner.appendChild(metadata_chatContainer);
        console.log('youtube_mod move_Chat secondary out chat-container');
      }
    }
  }

  //チャット欄を縦に延ばす
  if (metadata_chat !== null) {
    if (metadata_chat.style.height !== null) {
      if (metadata_chat.style.height !== '1024px') {
        const add_element = style = "height: 1024px;";
        metadata_chat.style = add_element;
        //console.log('youtube_mod move_Chat height: 1024px;');
      }
    }
  }

  //下に移動させたチャット欄を右に詰める
  //id columns  class="style-scope ytd-watch-flexy" に  「style="padding-right: 0px;"」を追加
  const metadata_columns = document.getElementById('columns');
  // スタイルを追加
  if (metadata_columns !== null) {
    if (metadata_columns.style.paddingRight === '') { // padding-rightの値が未設定の場合
      metadata_columns.setAttribute('style', 'padding-right: 0px;');
      //console.log('youtube_mod move_Chat padding-right: 0px;');
    }
  }

  //チャット欄を移動させた跡のスペースを削除
  //full-bleed-container内のid="panels-full-bleed-container"を削除
  //const panel_full_bleed_container = document.querySelector('.full-bleed-container > #panels-full-bleed-container');
  const panel_full_bleed_container = document.getElementById('panels-full-bleed-container');
  if (panel_full_bleed_container !== null) {
    panel_full_bleed_container.parentNode.removeChild(panel_full_bleed_container);
    //console.log('youtube_mod move_Chat removeChild(panels-full-bleed-container)');
  }
}

/******
 *  リストを使わず新しいタブで再生（中央ボタン）
 *****/
let throttleTimeout = null; // スロットリングのためのタイムアウト
const throttleDelay = 0.2; // ミリ秒単位での遅延時間

const play_Without_List_NewTab = () => {
  document.addEventListener('auxclick', function (event) {

    // スロットリング処理(複数回呼び出されるため)
    if (throttleTimeout) return;  // 一定時間内に再度イベントが発生したら無視

    // タイムアウト時間設定
    throttleTimeout = setTimeout(() => {
      throttleTimeout = null;  // タイムアウト後に再び処理を許可
    }, throttleDelay);

    // 中央ボタン（ボタン値1）かを確認
    if (event.button === 1) {

      // クリックした要素からリンクを取得
      const target = event.target.closest('a');

      // 取得要素がリンクか判定
      if (target && target.href) {

        // URLを取得
        const url = target.href;

        // URLが動画か確認するパターン作成
        const youtubeVideoPattern = /^https?:\/\/(www\.)?youtube\.com\/watch\?.*v=.+/i;

        // URLがYouTubeの動画ページのパターンに一致するかどうかを判定
        const isvideo = youtubeVideoPattern.test(url);

        // 正規表現結果が動画ページだった場合
        if (isvideo === true) {

          // マウス中央ボタンのデフォルトの動作を停止させる
          event.preventDefault();

          // メッセージをbackgroundスクリプトに送信
          chrome.runtime.sendMessage({ action: 'play_Without_List_NewTab_msg', url: url });
        }
      }
    }
  });
}

/*****
 *  概要欄を自動展開
 *****/
let isOpenSummaryFlg = false;  // 概要欄が展開済みかどうかの判定フラグ

// 概要欄を自動で展開
const open_summary = () => {
  // console.log(isOpenSummaryFlg);
  // 一度実行済みかどうかの判定
  // if (isOpenSummaryFlg === false) {

  // 概要欄を取得
  const summary = document.querySelector('#expand'); // IDを使用

  if (summary) {

    // 概要欄を展開
    summary.click();
  }
  // isOpenSummaryFlg = true; // 概要欄が展開済みのためtrueを設定
  // }
};




/*****
 * YouTubeの動画ページである場合にのみ更新する関数の配列
 *****/

const functionVideoArray = [
  open_summary,             //概要欄を自動で展開
  menu_newline,             //グッドボタン等のメニューを1段下へ変更
  hidden_Thanks,            //Thanksボタン非表示
  hidden_clip,              //クリップボタン非表示
  play_Without_List_NewTab, //リストを使わず新しいタブで再生（中央ボタン）
  move_Chat,                //チャット欄を画面下に移動させる
];

/*****
 * YouTubeのページである場合にのみ更新する関数の配列
 *****/

const functionArray = [
  play_Without_List_NewTab,  //リストを使わず新しいタブで再生（中央ボタン）
];

// YouTubeの動画ページであるかどうかを判定する関数
const isYouTubeVideoPage = () => {
  // 現在のURLを取得
  const currentUrl = window.location.href;
  // YouTubeの動画ページのURLパターン
  const youtubeVideoPattern = /^https?:\/\/(www\.)?youtube\.com\/watch\?.*v=.+/i;
  // URLがYouTubeの動画ページのパターンに一致するかどうかを判定
  //console.log("isYouTubeVideoPage");
  return youtubeVideoPattern.test(currentUrl);
};



/*****
 * ページ更新時の動作
 *****/
// URLの変更を監視する関数
function handleUrlChange() {
  if (isYouTubeVideoPage()) {
    // YouTubeの動画ページである場合にのみ
    functionVideoArray.forEach(func => func());
  } else {
    // YouTubeのページである場合にのみ
    functionArray.forEach(func => func());
  }
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
  if (isYouTubeVideoPage()) {
    console.log("youtube_mod MutationObserver Start");
    functionVideoArray.forEach(func => func());
  };
}

//コンストラクターにコールバック関数を渡してオブザーバーを生成
const observer = new MutationObserver(callback);

//監視対象の DOM（ノードや要素）この場合は body を監視
const target = document.body;

//監視のオプション
const config = {
  childList: true, //対象ノードの子ノードに対する追加・削除の監視を有効に
  attributes: true, //対象ノードの属性に対する変更の監視を有効に
  characterData: true, //対象ノードのテキストデータの変更の監視を有効に
  subtree: false, //対象ノードとその子孫ノードに対する変更の監視を有効に
};

//observe() メソッドに監視対象と監視オプションを指定して実行（監視を開始）
observer.observe(target, config);
