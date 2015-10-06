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

    function buildWikiTitleSelect(title: string) {
        utils.Wikipedia.search(title, (infos) => {
            var select = ui.SelectUtils.build('.sel-wikiTitle', _.map(infos, (info) => {
                return { key: info.title, value: info.title }
            }))
            select.change(() => {
                buildSnippet(findSelectedWikiInfo(infos))
            })
            buildSnippet(findSelectedWikiInfo(infos))
        })
    }

    function buildSnippet(info: utils.Wikipedia.SearchInfo) {
        $('.snippet').empty()
        $('.snippet').append(info.snippet)
    }

    function findSelectedWikiInfo(infos: Array<utils.Wikipedia.SearchInfo>): utils.Wikipedia.SearchInfo {
        return _.find(infos, (info) => {
            return ui.SelectUtils.getSelectedValue('.sel-wikiTitle') == info.title
        })
    }
}

init = WikipediaApp.init