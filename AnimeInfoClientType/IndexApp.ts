/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="animeselect.ts" />
/// <reference path="animeform.ts" />
/// <reference path="scripts/typings/gapi/gapi.animeinfo.d.ts" />

declare var init: Function

namespace IndexApp {
    const selectGroup = new ui.AnimeSelectGroup()
    export function init() {
        utils.AnimeInfoGapi.loadGapi(() => {
            buildPeriodSelectDefault()
            buildButton()
        })
    }

    function buildPeriodSelectDefault() {
        selectGroup.buildPeriodSelect((periodSelect) => {
            periodSelect.change(buildAnimeSelectDefault)
            buildAnimeSelectDefault()
            ui.AnimeForm.buildPeriodSelect(ui.PeriodSelect.getOptions())
        })
    }

    function buildAnimeSelectDefault() {
        selectGroup.buildAnimeSelect((animeSelect) => {
            animeSelect.change(() => {
                buildAnimeForm(selectGroup.getAnime())
            })
            buildAnimeForm(selectGroup.getAnime())
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
                    selectGroup.buildAnimeSelect((select) => {
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

    function buildAnimeForm(anime: gapi.client.animeInfo.AnimeInfo) {
        ui.AnimeForm.build(anime)
    }
}

init = IndexApp.init