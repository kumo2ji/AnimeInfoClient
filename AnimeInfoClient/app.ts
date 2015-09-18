/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="animeselect.ts" />
/// <reference path="animeform.ts" />
/// <reference path="scripts/typings/gapi/gapi.animeinfo.d.ts" />

namespace app {
    export function init() {
        utils.AnimeInfoGapi.loadGapi(() => {
            buildPeriodSelect()
            $('button.btn-new').click(_.partial(ui.AnimeForm.build, {
                periodId: $('div.div-anime-select select.sel-period').val()
            }))
        })
    }

    function buildPeriodSelect() {
        utils.AnimeInfoGapi.getPeriod((resp) => {
            var sorted = _.sortBy(resp.items, (item) => {
                return -parseInt(item.year + item.season)
            })
            ui.PeriodSelect.build(sorted, buildAnimeSelect)
            ui.AnimeForm.buildPeriodSelect(ui.PeriodSelect.getOptions())
        })
    }

    function buildAnimeSelect() {
        utils.AnimeInfoGapi.getAnime((resp) => {
            var animeInfos = resp.items
            utils.LocalStorage.setAnimeInfos(animeInfos)
            ui.AnimeSelect.build(animeInfos, buildAnimeForm)
        }, { id: ui.PeriodSelect.getSelectedId() })
    }

    function buildAnimeForm() {
        var animeInfos = utils.LocalStorage.getAnimeInfos()
        var anime = _.find(animeInfos, (value) => {
            return value.id === ui.AnimeSelect.getSelectedId()
        })
        ui.AnimeForm.build(anime)
    }
}

$(document).ready(app.init)