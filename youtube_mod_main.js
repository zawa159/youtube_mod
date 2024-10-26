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
          try {
            chrome.runtime.sendMessage({ action: 'play_Without_List_NewTab_msg', url: url });
          } catch (error) {
            console.warn('play_Without_List_NewTab sendMessage Error :', error.message);
          }
        }
      }
    }
  });
}

/*****
 * URLが変更されたかチェック
 *****/

let previousUrl = window.location.href; // 初期状態の現在のURLを取得
let isUrlChangedFlg = false; // URL変更管理フラグ

const isVideoPageUrlChangedCheck = () => {
  // 現在のURLを取得
  const currentUrl = window.location.href;

  // URLが変更されているかの変数の初期化
  let isUrlChanged = false;

  // YouTubeの動画ページであるかどうかを判定
  if (isYouTubeVideoPage()) {
    // console.log("〒  currentUrl Before ", currentUrl);
    // console.log("〒  previousUrl Before ", previousUrl);
    // URLが変更されているか確認
    if (currentUrl !== previousUrl) {

      console.log("※※※※  URL変更を検知  ※※※※");
      isUrlChanged = true;

    }
  }
  // 現在のURLを取得
  previousUrl = window.location.href;
  // console.log("〒  currentUrl After ", currentUrl);
  // console.log("〒  previousUrl After ", previousUrl);
  isUrlChangedFlg = isUrlChanged;

  return isUrlChanged;

}

/*****
 *  概要欄を自動展開
 *****/

let isOpenSummaryFlg = false; // グローバルスコープで宣言

// 概要欄を自動で展開
const open_summary = () => {

  // 遅延時間を設定（ここでは1000ミリ秒＝1秒）
  const delay = 1000;

  // setTimeoutで指定の時間遅延させて処理を実行
  setTimeout(() => {

    if (isVideoPageUrlChangedCheck()) {
      isOpenSummaryFlg = false;  // フラグにfalseを設定
      // console.log("◆ isOpenSummaryFlg にfalseを設定")
    }
    // 一度実行済みかどうかの判定
    if (isOpenSummaryFlg === false) {
      // 概要欄を自動展開
      if (summary_click()) {
        // 実行完了したらフラグをtrueに設定
        isOpenSummaryFlg = true;
        // console.log("◆  open_summary実行●");
      }
    } else {
      // console.log("◆  open_summary実行済み×");
    }
  }, delay);  // 遅延時間後に処理を実行

  function summary_click() {

    let result = false; // 結果を格納
    // 概要欄を取得
    let summary = document.querySelector('#expand'); // 概要欄のIDを使用
    let summaryIsOpen = document.querySelector('#collapse'); // 「一部を表示」要素取得

    // 概要欄を取得出来ているか
    if (summary && summaryIsOpen) {

      // 概要欄の展開状態を確認
      if (summaryIsOpen.hasAttribute('hidden')) {
        // 概要欄を展開
        summary.click();
        result = true;
      } else {
        console.log('summary_click hidde属性が設定されていません。');
      }
    } else {
      console.log('summary_click 動作しませんでした。');

    }
    return result;
  };
};

/*****
 *  チャットのリプレイを表示欄を自動展開
 *****/

let isOpenChatReplaysFlg = false; // グローバルスコープで宣言

// チャットのリプレイを表示欄を自動で展開
const open_chat_replays = () => {

  // 自動展開ループ回数
  loopLimit = 25;
  // 遅延時間を設定（ここでは1000ミリ秒＝1秒）
  const delay = 1000;

  // setTimeoutで指定の時間遅延させて処理を実行
  setTimeout(() => {

    if (isUrlChangedFlg) {
      isOpenChatReplaysFlg = false;  // フラグにfalseを設定
      // console.log("★  open_chat_replays にfalseを設定")
    }
    // 一度実行済みかどうかの判定
    if (isOpenChatReplaysFlg === false) {
      for (loop = 0; loop <= loopLimit; loop++) {

        // チャットのリプレイを表示欄を自動展開
        if (chat_replays_click()) {
          isOpenChatReplaysFlg = true;  // フラグをtrueに設定
          break;
        } else if (loop >= loopLimit) {
          // チャットのリプレイを表示欄が無い動画ページとして判断
          isOpenChatReplaysFlg = true;
        }
      }
      // console.log("★  open_chat_replays実行●");
    } else {
      // console.log("★  open_chat_replays実行済み×");
    }
  }, delay);  // 遅延時間後に処理を実行

  // チャットのリプレイを表示欄を自動展開
  function chat_replays_click() {

    let result = false; // 結果を格納
    let chatReplays = document.querySelector('#show-hide-button'); // チャットのリプレイを表示ボタンを取得

    // チャットのリプレイを表示ボタンを取得出来ているか
    if (chatReplays) {
      let chatReplays_button = chatReplays.querySelector('.yt-spec-button-shape-next.yt-spec-button-shape-next--outline.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--size-m.yt-spec-button-shape-next--enable-backdrop-filter-experiment');
      if (chatReplays_button) {
        // チャットのリプレイを表示ボタンの展開状態を確認
        if (!chatReplays.hasAttribute('hidden')) {
          // チャットのリプレイを表示ボタンを展開
          chatReplays_button.click();
          result = true;
          // console.log('chat_replays_click 展開状態です。');
        } else {
          // console.log('chat_replays_click 未展開状態です。');
        }
      }
    } else {
      console.log('chat_replays_click 動作しませんでした。');
    }
    return result;
  };
};

/*****
 *  プレイリスト画面に削除ボタン追加
 *****/

 const add_playList_remove_button = () => {
  console.log("★add_button が実行されました");
  const playlistItems = document.querySelectorAll("ytd-playlist-video-renderer");  // 動画リストを取得

  if (playlistItems.length > 0) {
    console.log("動画リスト取得OK");
    console.log(playlistItems);

    // 各動画アイテムごとにボタンを追加
    playlistItems.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item);

      // 既にボタンが追加されていないか確認してから追加
      if (!item.querySelector(".custom-button")) {
        // 各アイテム用のボタンを作成
        const button = document.createElement("button");
        // button.textContent = `Button ${index + 1}`;
        button.textContent = `[後で見る]から削除`;
        button.classList.add("custom-button"); // ボタンを識別するためのクラス

        // ボタンのスタイル設定
        button.style.position = "relative"; // 各アイテム内に相対的に配置
        button.style.marginTop = "10px";    // ボタンの位置を調整
        button.style.zIndex = "1000";       // 他の要素に隠れないように

        // ボタンのクリックイベントを設定
        button.addEventListener("click", () => {
          alert(`Item ${index + 1} のボタンがクリックされました！`);
        });

        // 各動画アイテム内の適切な位置にボタンを追加
        item.appendChild(button);
      }
    });
  }
}

// 初期化のためにadd_button関数を呼び出す
add_button();



/************************************************************************************************************************************/

/*****
 * YouTubeの動画ページである場合にのみ更新する関数の配列
 *****/

const functionVideoArray = [
  open_summary,                  // 概要欄を自動で展開
  open_chat_replays,             // チャットのリプレイを表示欄を自動展開
  menu_newline,                  // グッドボタン等のメニューを1段下へ変更
  hidden_Thanks,                 // Thanksボタン非表示
  hidden_clip,                   // クリップボタン非表示
  play_Without_List_NewTab,      // リストを使わず新しいタブで再生（中央ボタン）
  // move_Chat,                  // チャット欄を画面下に移動させる
  // add_playList_remove_button  // [後で見る]画面に削除ボタンを追加
];

/*****
 * YouTubeのページである場合にのみ更新する関数の配列
 *****/

const functionArray = [
  play_Without_List_NewTab,  // リストを使わず新しいタブで再生（中央ボタン）
  add_button                 // [後で見る]画面に削除ボタンを追加
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

  isOpenSummaryFlg = false;
  isOpenChatReplaysFlg = false;
  console.log("executeFunctions が実行されました");
  console.log("isOpenSummaryFlg : " + isOpenSummaryFlg);
  console.log("isOpenChatReplaysFlg : " + isOpenChatReplaysFlg);

  // YouTubeの動画ページの場合
  if (isYouTubeVideoPage()) {
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
  isOpenSummaryFlg = false;
  isOpenChatReplaysFlg = false;
  isVideoPageUrlChangedCheck();
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

    // タブがアクティブになった時に動作
    window.addEventListener('focus', () => {
      console.log("focus イベントが発生しました");
      // フォーカス時に実行したい処理をここに書く
      initializePage(); // 例: ページを再初期化する
    });
  };

  // ページ遷移時（ページを離れる際に何か処理を行いたい場合）
  window.addEventListener('beforeunload', (event) => {
    console.log("beforeunload イベントが発生しました");
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
  console.log("initialize 発生しました");
  setupEventListeners();    // 各種イベントリスナーの設定
  setupMutationObserver();  // 動的変更の監視
};

initialize(); // 初期化を実行
