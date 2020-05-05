(function () {

    var queryOrCookieStrToObj = function (str) {
      if (str && str !== '') {
        return JSON.parse('{"' +
          str
            .replace(/^(.*)\?/, '')
            .split(/[&;]\s?/g)
            .map(function (keyval) {
              return keyval.replace(/=/, '":"')
            })
            .join('","')
          + '"}', function (key, value) {
          return key === "" ? value : decodeURIComponent(value)
        })
      }
      return {}
    }

    var search = location.search.substring(1);
    var queryParams = queryOrCookieStrToObj(search)

    var cookieParams = {};
    document.cookie && document.cookie.split(/\s*;\s*/).forEach(function (pair) {
      pair = pair.split(/\s*=\s*/);
      cookieParams[pair[0]] = pair.splice(1).join('=')
    });

    if (queryParams.StoreGuid) {
      cookieParams._storeID = queryParams.StoreGuid
      document.cookie = "_storeID=" + queryParams.StoreGuid + '; path=/;'
    }

    var caltureRegex = /\/([a-z]{2}-[A-Za-z]{2})/;
    var culture = location.pathname.match(caltureRegex)

    var url = window.location.href

    if (culture && url && culture.length >= 2 && url.length > 0) {

      // window.onload = function () {
      //   // add google analytics code and include
      //   fetch('/uStoreRestAPI/v1/store/resourceByUrl?url=' + encodeURIComponent(url) + '&type=5&cultureCode=' + culture[1] + '&isDraft=false')
      //     .then(function (r) {
      //       return r.text()
      //     })
      //     .then(function (text) {
      //       var reCleanRemarks = /<!--.*?-->/igm
      //       var reGetIncludeScript = /<script.*src="(.*)".*?<\/script>/igm
      //       var reScriptContent = /<script>(.*?)<\/script>/igm
      //       var clean = text.replace(/\r?\n|\r/igm, '').replace(reCleanRemarks, '')
      //       var mGoogleInclude = reGetIncludeScript.exec(clean)
      //
      //       if (mGoogleInclude && mGoogleInclude.length > 1) {
      //         var elInclude = document.createElement('script')
      //         elInclude.setAttribute('src', mGoogleInclude[1])
      //         document.body.appendChild(elInclude)
      //       }
      //
      //       var mGoogleInline = reScriptContent.exec(clean)
      //
      //       if (mGoogleInline && mGoogleInline.length > 1) {
      //         var elInlineScript = document.createElement('script')
      //         elInlineScript.innerText = mGoogleInline[1]
      //         document.body.appendChild(elInlineScript)
      //       }
      //     })
      // }

      // add localization
      document.writeln('<script type="application/javascript" src="/uStoreRestAPI/v1/store/resourceByUrl?url=' + encodeURIComponent(url) + '&type=1&cultureCode=' + culture[1] + '&isDraft=false"></script>')
    }
  }
)()

