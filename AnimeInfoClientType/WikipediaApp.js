var WikipediaApp;
(function (WikipediaApp) {
    var selectGroup = new ui.AnimeSelectGroup();
    function init() {
        utils.AnimeInfoGapi.loadGapi(function () {
            buildPeriodSelectDefault();
        });
    }
    WikipediaApp.init = init;
    function buildPeriodSelectDefault() {
        selectGroup.buildPeriodSelect(function (periodSelect) {
            periodSelect.change(buildAnimeSelectDefault);
            buildAnimeSelectDefault();
        });
    }
    function buildAnimeSelectDefault() {
        selectGroup.buildAnimeSelect(function (animeSelect) {
            animeSelect.change(function () {
                buildWikiTitleSelect(selectGroup.getAnime().title);
            });
            buildWikiTitleSelect(selectGroup.getAnime().title);
        });
    }
    var wikiSearchInfos;
    function buildWikiTitleSelect(title) {
        utils.Wikipedia.search(title, function (infos) {
            wikiSearchInfos = infos;
            var select = ui.SelectUtils.build('.sel-wikiTitle', _.map(wikiSearchInfos, function (info) {
                return { key: info.title, value: info.title };
            }));
            select.change(onChange);
            onChange();
        });
    }
    function onChange() {
        var searchInfo = getSelectedSearchInfo();
        buildSnippet(searchInfo);
        buildInfoboxDiv(searchInfo.title);
    }
    function buildSnippet(info) {
        $('.snippet').empty();
        $('.snippet').append(info.snippet);
    }
    function getSelectedSearchInfo() {
        return _.find(wikiSearchInfos, function (info) {
            return ui.SelectUtils.getSelectedValue('.sel-wikiTitle') == info.title;
        });
    }
    function buildInfoboxDiv(title) {
        $('div.infobox > ul').empty();
        utils.Wikipedia.getWikiInfo(title, function (info) {
            appendLi('.animeTitle', info.title);
            appendLi('.director', info.director);
            appendLi('.writer', info.writer);
            appendLi('.music', info.music);
            appendLi('.studio', info.studio);
        });
    }
    function appendLi(selector, values) {
        var ul = $(selector);
        _.each(values, function (value) {
            var li = $('<li></li>', {
                text: value,
                'class': 'list-group-item'
            });
            ul.append(li);
        });
        return ul;
    }
})(WikipediaApp || (WikipediaApp = {}));
init = WikipediaApp.init;
//# sourceMappingURL=WikipediaApp.js.map