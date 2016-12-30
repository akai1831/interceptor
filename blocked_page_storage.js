document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  var blockedPages;
  chrome.storage.sync.get({ pages_blocked: [] }, function(data) {
      blockedPages = data.pages_blocked;
      if (typeof blockedPages.length !== 'undefined') {
        var blockedPagesString = '';
        for (var i = 0; i < blockedPages.length; i++) {
          blockedPagesString += (blockedPages[i].page_url + ', ');
        }
        document.getElementById('pageBlocked').innerHTML = blockedPagesString;
      }
  });
  document.getElementById('submitButton').addEventListener('click', function(){
    var d = new Date();
    blockedPages.push({
      'page_url': document.getElementById('pageDomain').value,
      'visits': 0,
      'sync_time': d.getTime()
    });
    chrome.storage.sync.set({ pages_blocked:  blockedPages }, function() {
        console.log('Settings saved');
        chrome.storage.sync.get('pages_blocked', function(data) {
            console.log(data);
        });
        window.close();
    });
  });
});
