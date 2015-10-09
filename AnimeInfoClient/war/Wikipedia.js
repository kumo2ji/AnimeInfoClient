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
                var pages = json.query.pages;
                var page = _.first(_.values(pages));
                var revision = _.first(page.revisions);
                var content = revision['*'];
                var tvAnimeInfobox = getTvAnimeInfoboxText(content);
                success({
                    pageTitle: page.title,
                    title: split(getValue(tvAnimeInfobox, 'タイトル')),
                    director: split(getValue(tvAnimeInfobox, '監督')),
                    writer: split(getValue(tvAnimeInfobox, '脚本')),
                    music: split(getValue(tvAnimeInfobox, '音楽')),
                    studio: split(getValue(tvAnimeInfobox, 'アニメーション制作'))
                });
            }, fail);
        }
        Wikipedia.getWikiInfo = getWikiInfo;
        function getTvAnimeInfoboxText(input) {
            var regex = /\{\{Infobox animanga\/TVAnime([\s\S]+?)\}\}/;
            return regex.exec(input)[1];
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