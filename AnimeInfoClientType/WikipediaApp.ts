declare var init: Function

namespace WikipediaApp {
    const selectGroup = new ui.AnimeSelectGroup()
    export function init() {
        utils.AnimeInfoGapi.loadGapi(() => {
            buildPeriodSelectDefault()
        })
    }

    function buildPeriodSelectDefault() {
        selectGroup.buildPeriodSelect((periodSelect) => {
            periodSelect.change(buildAnimeSelectDefault)
            buildAnimeSelectDefault()
        })
    }

    function buildAnimeSelectDefault() {
        selectGroup.buildAnimeSelect((animeSelect) => {
            animeSelect.change(() => {
                buildWikiTitleSelect(selectGroup.getAnime().title)
            })
            buildWikiTitleSelect(selectGroup.getAnime().title)
        })
    }

    var wikiSearchInfos: Array<utils.Wikipedia.SearchInfo>

    function buildWikiTitleSelect(title: string) {
        utils.Wikipedia.search(title, (infos) => {
            wikiSearchInfos = infos
            var select = ui.SelectUtils.build('.sel-wikiTitle', _.map(wikiSearchInfos, (info) => {
                return { key: info.title, value: info.title }
            }))
            select.change(onChange)
            onChange()
        })
    }

    function onChange() {
        var searchInfo = getSelectedSearchInfo()
        buildSnippet(searchInfo)
        buildInfoboxDiv(searchInfo.title)
    }

    function buildSnippet(info: utils.Wikipedia.SearchInfo) {
        $('.snippet').empty()
        $('.snippet').append(info.snippet)
    }

    function getSelectedSearchInfo(): utils.Wikipedia.SearchInfo {
        return _.find(wikiSearchInfos, (info) => {
            return ui.SelectUtils.getSelectedValue('.sel-wikiTitle') == info.title
        })
    }

    function buildInfoboxDiv(title: string) {
        $('div.infobox > ul').empty()
        utils.Wikipedia.getWikiInfo(title, (info) => {
            appendLi('.animeTitle', info.title)
            appendLi('.director', info.director)
            appendLi('.writer', info.writer)
            appendLi('.music', info.music)
            appendLi('.studio', info.studio)
        })
    }

    function appendLi(selector: string, values: Array<string>): JQuery {
        var ul = $(selector)
        _.each(values, (value) => {
            var li = $('<li></li>', {
                text: value,
                'class': 'list-group-item'
            })
            ul.append(li)
        })
        return ul
    }
}

init = WikipediaApp.init