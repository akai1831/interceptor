// chrome.storage.sync.set({ pages_blocked:  [] }, function() {
//     console.log('Settings saved');
//     chrome.storage.sync.get('pages_blocked', function(data) {
//         console.log(data);
//     });
// });
var blockedPages;
chrome.webRequest.onBeforeRequest.addListener(manipulateURl, {urls: ["<all_urls>"]}, ["blocking"]);

chrome.storage.sync.get({ pages_blocked: [] }, function(data) {
  blockedPages = data.pages_blocked;
});

function manipulateURl(details) {
  if (typeof blockedPages.length !== 'undefined') {
    for (var i = 0; i < blockedPages.length; i++) {
      if (details.url === ('https://www.' + blockedPages[i].page_url + '.com/') && blockedPages[i].visits === 3) {
        return {
          cancel: true
        };
      } else if (details.url === ('https://www.' + blockedPages[i].page_url + '.com/') && blockedPages[i].visits < 3){
        blockedPages[i].visits++;
        chrome.storage.sync.set({ pages_blocked:  blockedPages }, function() {
            console.log('Settings saved');
        });
      }
    }
  }
}
