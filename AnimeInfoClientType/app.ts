/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="animeselect.ts" />
/// <reference path="animeform.ts" />
/// <reference path="scripts/typings/gapi/gapi.animeinfo.d.ts" />

declare var init: Function

namespace app {
    export function init() {
        utils.AnimeInfoGapi.loadGapi(() => {
            buildPeriodSelectDefault()
            buildButton()
        })
    }

    function buildPeriodSelectDefault() {
        buildPeriodSelect((periodSelect) => {
            periodSelect.change(buildAnimeSelectDefault)
            buildAnimeSelectDefault()
            ui.AnimeForm.buildPeriodSelect(ui.PeriodSelect.getOptions())
        })
    }

    function buildAnimeSelectDefault() {
        buildAnimeSelect((animeSelect) => {
            animeSelect.change(buildAnimeForm)
            buildAnimeForm()
        })
    }

    function buildButton() {
        $('button.btn-new').click(() => {
            ui.AnimeForm.build({
                periodId: ui.PeriodSelect.getSelectedId()
            })
        })
        $('button.btn-save').click(() => {
            utils.AnimeInfoGapi.putAnime(ui.AnimeForm.getInfo(), (resp) => {
                var item = _.first(resp.items)
                if (item.periodId == ui.PeriodSelect.getSelectedId()) {
                    buildAnimeSelect((select) => {
                        select.change(buildAnimeForm)
                        select.val(item.id).change()
                    })
                } else {
                    buildPeriodSelectDefault()
                }
            })
        })
        $('button.btn-delete').click(() => {
            utils.AnimeInfoGapi.deleteAnime(parseInt(ui.AnimeForm.getInfo().id), () => {
                buildAnimeSelectDefault()
            })
        })
    }

    function buildPeriodSelect(callback: (select: JQuery) => void) {
        utils.AnimeInfoGapi.getPeriod((resp) => {
            var sorted = _.sortBy(resp.items, (item) => {
                return -parseInt(item.year + item.season)
            })
            var select = ui.PeriodSelect.build(sorted)
            callback(select)
        })
    }

    function buildAnimeSelect(callback: (select: JQuery) => void) {
        utils.AnimeInfoGapi.getAnime((resp) => {
            var animeInfos = resp.items
            utils.LocalStorage.setAnimeInfos(animeInfos)
            var select = ui.AnimeSelect.build(animeInfos)
            callback(select)
            
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

init = app.init