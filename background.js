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

// メニューがクリックされたときの動作
chrome.contextMenus.onClicked.addListener((info, tab) => {
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
                        // 新しいタブで開く
                        chrome.tabs.create({ url: newUrl });
                    }
                }
            }
        }
    }
});
