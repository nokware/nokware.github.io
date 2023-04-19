window.addEventListener("DOMContentLoaded", function() {    
  /** This section is only needed once per page if manually copying **/
  if (typeof MauticSDKLoaded == 'undefined') {
      var MauticSDKLoaded = true;
      var head            = document.getElementsByTagName('head')[0];
      var script          = document.createElement('script');
      script.type         = 'text/javascript';
      script.src          = 'https://mautic.nokware.net/index.php/media/js/mautic-form.js?vf6fd3319';
      script.onload       = function() {
          MauticSDK.onLoad();
      };
      head.appendChild(script);
      var MauticDomain = 'https://mautic.nokware.net/index.php';
      var MauticLang   = {
          'submittingMessage': "Please wait..."
      }
  }else if (typeof MauticSDK != 'undefined') {
      MauticSDK.onLoad();
  }
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

    
