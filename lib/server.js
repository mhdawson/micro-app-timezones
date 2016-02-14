// Copyright 2014-2015 the project authors as listed in the AUTHORS file.
// All rights reserved. Use of this source code is governed by the
// license that can be found in the LICENSE file.

var url = require('url');

const HEIGHT_PER_ENTRY = 26;
const PAGE_WIDTH = 160;

var Server = function() {
}

Server.getDefaults = function() {
  return { 'title': 'Timezones',
           'serverPort': 3000 };
}

var getDashboardEntriesFromUrl = function(request) {
  var urlDashboardEntries = new Array(); 

  var requestUrl = url.parse('http://' + request.url, true);
  if ((requestUrl.query !== null) && (requestUrl.query.size === undefined)) {
    for (var field in requestUrl.query) {
      if (requestUrl.query.hasOwnProperty(field)) {
        if (field !== 'windowopen') {
          urlDashboardEntries.push({ 'person': field, 'offset': requestUrl.query[field] });
        }
      }
    }
  }
  return urlDashboardEntries;
}

Server.getTemplateReplacments = function(request) {
  var config = Server.config;
  var entriesData = 'var entriesData = new Object();\n';
  var dashboardEntriesHTML = '';
  var height = 0;

  // the people we should show timezones for either come from the config
  // file or from url parameters if they are present
  var dashboardEntries = config.dashboardEntries;
  var urlDashboardEntries = getDashboardEntriesFromUrl(request);
  if (urlDashboardEntries.length > 0) {
    dashboardEntries = urlDashboardEntries;
  }

  for (i = 0; i < dashboardEntries.length; i++ ) {
    dashboardEntriesHTML = dashboardEntriesHTML + '<tr><td>' + dashboardEntries[i].person +
                                                  ':</td><td id="' + dashboardEntries[i].person +
                                                  '">pending</td></tr>';

    entriesData = entriesData + "         entriesData['" + dashboardEntries[i].person + 
                                "'] = " + dashboardEntries[i].offset + ";\n";
    height = height + HEIGHT_PER_ENTRY;
  }

  var replacements = [{ 'key': '<DASHBOARD_TITLE>', 'value': config.title },
                      { 'key': '<UNIQUE_WINDOW_ID>', 'value': config.title },
                      { 'key': '<DASHBOARD_ENTRIES>', 'value': dashboardEntriesHTML },
                      { 'key': '<ENTRIES_DATA>', 'value': entriesData },
                      { 'key': '<PAGE_WIDTH>', 'value': PAGE_WIDTH },
                      { 'key': '<PAGE_HEIGHT>', 'value': height }];

  return replacements;
}

if (require.main === module) {
  var path = require('path');
  var microAppFramework = require('micro-app-framework');
  microAppFramework(__dirname, Server);
}

module.exports = Server;
