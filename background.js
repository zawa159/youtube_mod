/******
 *  右クリックした際のコンテキストメニュー作成処理
 *****/
chrome.runtime.onInstalled.addListener(() => {
    // 「リストを使わず再生」のメニューを作成
    /*  
     * メニューがまとまってしまい、使い勝手悪いため、保留
     *
    const parent = chrome.contextMenus.create({
      id: "playWithoutList",
      title: "リストを使わず再生",
      contexts: ["link"],
      targetUrlPatterns: ["*://*.youtube.com/watch*"]
    });
    */

    // 「リストを使わず新しいタブで再生」のメニューを作成
    chrome.contextMenus.create({
        id: "playWithoutListNewTab",
        title: "リストを使わず新しいタブで再生",
        contexts: ["link"],
        targetUrlPatterns: ["*://*.youtube.com/watch*"]
    });
});

/******
 *  コンテキストメニューがクリックされたときの動作
 *****/
chrome.contextMenus.onClicked.addListener((info, tab) => {

    // リストを使わず新しいタブで再生の処理
    if (info.menuItemId === "playWithoutList" || info.menuItemId === "playWithoutListNewTab") {
        if (info.linkUrl) {
            const url = new URL(info.linkUrl);
            if (url.hostname === "www.youtube.com" && url.pathname === "/watch") {
                const videoId = url.searchParams.get("v");
                if (videoId) {
                    const newUrl = `https://www.youtube.com/watch?v=${videoId}`;
                    if (info.menuItemId === "playWithoutList") {
                        // 現在のタブで開く
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: (newUrl) => { window.location.href = newUrl; },
                            args: [newUrl]
                        });
                    } else if (info.menuItemId === "playWithoutListNewTab") {
                        // 現在タブのindex(位置)を取得する
                        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                            // 現在タブ+1の場所を取得
                            const currentIndex = tabs[0].index + 1;
                            // 新しいタブで開く
                            chrome.tabs.create({
                                url: newUrl,
                                // active: false, // 新しいタブで開く（フォーカスされない）
                                active: true,    // 新しいタブで開く（フォーカスされる）
                                index: currentIndex,
                            });
                        });
                    }
                }
            }
        }
    }
});

/******
 *  youtube_mod_main.jsのリストを使わず新しいタブで再生（中央ボタン）（play_Without_List_NewTab）から
 *  メッセージを受け取った際の処理
 *****/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    // メッセージ内容がplay_Without_List_NewTabか判定
    if (request.action === 'play_Without_List_NewTab_msg') {

        console.log("request" + request);
        // URLオブジェクト作成
        const url = new URL(request.url);

        // URLが動画形式か判定
        if (url.hostname === "www.youtube.com" && url.pathname === "/watch") {

            // videoIDパラメータ取得
            const videoId = url.searchParams.get("v");

            // videoIDパラメータが取得出来ているか判定
            if (videoId) {

                // パラメータを除いたURLを作成
                const newUrl = `https://www.youtube.com/watch?v=${videoId}`;

                // 現在タブのindex(位置)を取得する
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    // 現在タブ+1の場所を取得
                    const currentIndex = tabs[0].index + 1;

                    // 新しいタブで開く
                    chrome.tabs.create({
                        url: newUrl,
                        active: false, // 新しいタブで開く（フォーカスされない）
                        index: currentIndex,
                    });
                });
            }
        }
    }
});
