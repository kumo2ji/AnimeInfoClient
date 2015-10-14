var utils;
(function (utils) {
    var Wikipedia;
    (function (Wikipedia) {
        var ENDPOINT = 'https://ja.wikipedia.org/w/api.php?';
        var INFO_BASE_URL = ENDPOINT + 'action=query&prop=revisions&format=json&rvprop=content&redirects=&titles=';
        var SEARCH_BASE_URL = ENDPOINT + 'action=query&list=search&format=json&srsearch=';
        function search(title, success, fail) {
            var url = SEARCH_BASE_URL + encodeURIComponent(title);
            var xhr = $.ajax({
                url: url,
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: 'callback'
            });
            xhr.then(function (json) {
                success(json.query.search);
            }, fail);
        }
        Wikipedia.search = search;
        function getWikiInfo(title, success, fail) {
            var url = INFO_BASE_URL + encodeURIComponent(title);
            var xhr = $.ajax({
                url: url,
                type: 'GET',
                dataType: 'jsonp',
                jsonpCallback: 'callback'
            });
            xhr.then(function (json) {
                var info = parse(json);
                success(info);
            }, fail);
        }
        Wikipedia.getWikiInfo = getWikiInfo;
        function parse(json) {
            var page = getPage(json);
            var content = getContent(page);
            var tvAnimeInfobox = getTvAnimeInfoboxText(content);
            return {
                pageTitle: page.title,
                title: getValueAndSplit(tvAnimeInfobox, 'タイトル'),
                director: getValueAndSplit(tvAnimeInfobox, '監督'),
                writer: getValueAndSplit(tvAnimeInfobox, '脚本'),
                music: getValueAndSplit(tvAnimeInfobox, '音楽'),
                studio: getValueAndSplit(tvAnimeInfobox, 'アニメーション制作')
            };
        }
        function getPage(json) {
            var pages = json.query.pages;
            return _.first(_.values(pages));
        }
        function getContent(page) {
            var revision = _.first(page.revisions);
            return revision['*'];
        }
        function getValueAndSplit(text, key) {
            var value = getValue(text, key);
            return split(value);
        }
        function getTvAnimeInfoboxText(input) {
            var regex = /\{\{Infobox animanga\/TVAnime([\s\S]+?)\}\}/;
            var execArray = regex.exec(input);
            if (_.isNull(execArray)) {
                return '';
            }
            return execArray[1];
        }
        function getValue(text, key) {
            var regex = new RegExp('^\\| *' + key + ' *= *(.+?)$', 'm');
            var execArray = regex.exec(text);
            if (_.isEmpty(execArray)) {
                return '';
            }
            else {
                return removeSquareBracket(execArray[1]);
            }
        }
        function removeSquareBracket(input) {
            return input.replace(/\[|\]/g, '');
        }
        function removeHtmlTag(input) {
            return input.replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g, '');
        }
        function split(input) {
            var splitted = input.split(/<br ?\/?>/);
            var tagRemoved = _.map(splitted, function (value) {
                return removeHtmlTag(value);
            });
            return _.compact(tagRemoved);
        }
    })(Wikipedia = utils.Wikipedia || (utils.Wikipedia = {}));
})(utils || (utils = {}));
//# sourceMappingURL=Wikipedia.js.map