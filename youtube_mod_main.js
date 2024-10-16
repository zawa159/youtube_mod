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

/*****
 * 汎用スロットリング関数
 *****/
const throttle = (callback, delay) => {
  let throttleTimeout = null;

  return (...args) => {
    if (throttleTimeout) return; // 一定時間内に再度イベントが発生したら無視

    throttleTimeout = setTimeout(() => {
      throttleTimeout = null; // タイムアウト後に再び処理を許可
    }, delay);

    callback(...args); // コールバック関数を実行
  };
};

/*****
 * リストを使わず新しいタブで再生（中央ボタン）
 *****/
const handleClick = (event) => {
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
        try {
          chrome.runtime.sendMessage({ action: 'play_Without_List_NewTab_msg', url: url });
        } catch (error) {
          console.warn('play_Without_List_NewTab sendMessage Error :', error.message);
        }
      }
    }
  }
};
const play_Without_List_NewTab = () => {

  // スロットリングを適用してイベントリスナーを設定
  document.addEventListener('auxclick', throttle(handleClick, 200));
};


/*****
 *  概要欄を自動展開
 *****/
var isOpenSummaryFlg = false;
// 概要欄を自動で展開
const open_summary = () => {

  // 遅延時間を設定（ここでは1000ミリ秒＝1秒）
  const delay = 1000;

  // 一度実行済みかどうかの判定
  if (isOpenSummaryFlg === false) {

    // setTimeoutで指定の時間遅延させて処理を実行
    setTimeout(() => {
      summary_click();  // 概要欄を自動展開
      isOpenSummaryFlg = true;  // フラグをtrueに設定
      console.log("open_summary実行●");
    }, delay);  // 遅延時間後に処理を実行

  } else {
    console.log("open_summary実行済み×");
  }

  function summary_click() {

    // 概要欄を取得
    let summary = document.querySelector('#expand'); // 概要欄のIDを使用
    let summaryIsOpen = document.querySelector('#collapse'); // 「一部を表示」要素取得

    // 概要欄を取得出来ているか
    if (summary && summaryIsOpen) {

      // 概要欄の展開状態を確認
      if (summaryIsOpen.hasAttribute('hidden')) {
        // 概要欄を展開
        summary.click();
        hasUrlChanged = true; // 概要欄が展開済みのためtrueを設定

      } else {

        console.log('hidden属性が設定されています');
      }

    } else {
      console.log('動作しませんでした。');

    }
  };
};

/************************************************************************************************************************************/

/*****
 * URLが変更されたかチェック
 *****/
// 初期状態の現在のURLを取得
previousUrl = window.location.href;
// console.log("firest URL get");

const isUrlChangedCheck = () => {
  // URLが変更されているかの変数の初期化
  let isUrlChanged = false;

  // 現在のURLを取得
  const currentUrl = window.location.href;

  // console.log("currentUrl Before ", currentUrl);
  // console.log("previousUrl Before ", previousUrl);
  // URLが変更されているか確認
  if (currentUrl !== previousUrl) {

    console.log("※※※※  URL変更を検知  ※※※※");
    isUrlChanged = true;

  }
  // 現在のURLを取得
  previousUrl = window.location.href;
  // console.log("currentUrl After ", currentUrl);
  // console.log("previousUrl After ", previousUrl);

  return isUrlChanged;
}

/*****
 * YouTubeの動画ページである場合にのみ更新する関数の配列
 *****/

const functionVideoArray = [
  open_summary,             //概要欄を自動で展開
  menu_newline,             //グッドボタン等のメニューを1段下へ変更
  hidden_Thanks,            //Thanksボタン非表示
  hidden_clip,              //クリップボタン非表示
  play_Without_List_NewTab, //リストを使わず新しいタブで再生（中央ボタン）
  //move_Chat,                //チャット欄を画面下に移動させる
];

/*****
 * YouTubeのページである場合にのみ更新する関数の配列
 *****/

const functionArray = [
  play_Without_List_NewTab,  //リストを使わず新しいタブで再生（中央ボタン）
];

/*****
 * YouTubeの動画ページであるかどうかを判定する関数
 *****/
const isYouTubeVideoPage = () => {
  // 現在のURLを取得
  const currentUrl = window.location.href;
  // YouTubeの動画ページのURLパターン
  const youtubeVideoPattern = /^https?:\/\/(www\.)?youtube\.com\/watch\?.*v=.+/i;
  // URLがYouTubeの動画ページのパターンに一致するかどうかを返却
  return youtubeVideoPattern.test(currentUrl);
};

/*****
 * 実行する関数配列の呼出し
 *****/
const executeFunctions = () => {

  // YouTubeの動画ページの場合
  if (isYouTubeVideoPage()) {
    isOpenSummaryFlg = false;
    functionVideoArray.forEach(func => func());

    // YouTubeの動画ページ以外の場合
  } else {
    functionArray.forEach(func => func());
  }
};

/*****
 * 初期接続・画面更新・URL変更時の処理
 *****/
const initializePage = () => {
  console.log("initializePage が実行されました");
  isUrlChangedCheck(); // URLが変更された場合のチェック
  executeFunctions();  // 関数を実行
};

/*****
 * イベントリスナーの設定
 *****/
const setupEventListeners = () => {
  // ページが完全に読み込まれた時に動作（初回接続・画面更新時）
  window.onload = () => {
    console.log("window.onload が実行されました");
    initializePage();

    // URLが履歴の変更で変わった場合（戻る・進むボタン）
    window.addEventListener('popstate', () => {
      console.log("popstate イベントが発生しました");
      initializePage();
    });

    // URLのハッシュ部分が変更された場合
    window.addEventListener('hashchange', () => {
      console.log("hashchange イベントが発生しました");
      initializePage();
    });
  };

  // ページ遷移時（ページを離れる際に何か処理を行いたい場合）
  window.addEventListener('beforeunload', (event) => {
    console.log("beforeunload イベントが発生しました");
    // 必要に応じて遷移前に処理を追加
  });
};

/*****
 * 動的なDOM変更を監視して処理を実行
 *****/
const setupMutationObserver = () => {
  const target = document.body;

  const config = {
    childList: true, // 子ノードの追加・削除を監視
    attributes: true, // 属性変更を監視
    characterData: true, // テキスト内容の変更を監視
    subtree: false, // 子孫ノードも監視
  };

  const callback = (mutations) => {
    if (isYouTubeVideoPage()) {
      // console.log("MutationObserver: 動的変更を検出しました");
      functionVideoArray.forEach(func => func());
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(target, config);
};

/*****
 * 初期化処理
 *****/
const initialize = () => {
  setupEventListeners(); // 各種イベントリスナーの設定
  setupMutationObserver(); // 動的変更の監視
};

initialize(); // 初期化を実行
