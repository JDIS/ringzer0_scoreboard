"use strict"
const cheerio = require('cheerio');
const rp = require('request-promise');

const loginUri = "https://pwnable.tw/user/login";

module.exports = {
  fetch: function({site_id, site_user_id, name}) {
    const jar = rp.jar();
    return rp({
      uri: loginUri,
      jar: jar,
      transform: function(body) {
        return cheerio.load(body);
      }
    }).then((body) => {
      return body("input[name='csrfmiddlewaretoken']").first().val();
    }).then((token) => {
      return rp({
        method: 'POST',
        uri: loginUri,
        jar: jar,
        followAllRedirects: true,
        form: {
          csrfmiddlewaretoken: token,
          username: "fegafubiv@mail4-us.org",
          password: "dkk9QxeY1QWfZ7me9wztGVaqfDcMIFc4",
          next: `/user/${site_user_id}`
        },
        transform: function(body) {
          return cheerio.load(body);
        },
        headers: { // complains if not explicit
          Referer: loginUri
        }
      })
    });
  },
  parse: function(body) {
    return body("div").eq(16).text(); // wow
  }
}
