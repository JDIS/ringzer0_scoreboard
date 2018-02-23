"use strict"
const cheerio = require('cheerio');
const rp = require('request-promise');

module.exports = {
  fetch: function({site_id, site_user_id, name}) {
    return rp({
      uri: `https://ringzer0team.com/profile/${site_user_id}/${name}`,
      transform: function(body) {
        return cheerio.load(body);
      }
    });
  },
  parse: function(body) {
    return body(".points").first().text();
  }
}
