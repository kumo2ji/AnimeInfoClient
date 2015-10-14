/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="animeselect.ts" />
/// <reference path="animeform.ts" />
/// <reference path="scripts/typings/gapi/gapi.animeinfo.d.ts" />
var IndexApp;
(function (IndexApp) {
    var selectGroup = new ui.AnimeSelectGroup();
    function init() {
        utils.AnimeInfoGapi.loadGapi(function () {
            buildPeriodSelectDefault();
            buildButton();
        });
    }
    IndexApp.init = init;
    function buildPeriodSelectDefault() {
        selectGroup.buildPeriodSelect(function (periodSelect) {
            periodSelect.change(buildAnimeSelectDefault);
            buildAnimeSelectDefault();
            ui.AnimeForm.buildPeriodSelect(ui.PeriodSelect.getOptions());
        });
    }
    function buildAnimeSelectDefault() {
        selectGroup.buildAnimeSelect(function (animeSelect) {
            animeSelect.change(function () {
                buildAnimeForm(selectGroup.getAnime());
            });
            buildAnimeForm(selectGroup.getAnime());
        });
    }
    function buildButton() {
        $('button.btn-new').click(function () {
            ui.AnimeForm.build({
                periodId: ui.PeriodSelect.getSelectedId()
            });
        });
        $('button.btn-save').click(function () {
            utils.AnimeInfoGapi.putAnime(ui.AnimeForm.getInfo(), function (resp) {
                var item = _.first(resp.items);
                if (item.periodId == ui.PeriodSelect.getSelectedId()) {
                    selectGroup.buildAnimeSelect(function (select) {
                        select.change(buildAnimeForm);
                        select.val(item.id).change();
                    });
                }
                else {
                    buildPeriodSelectDefault();
                }
            });
        });
        $('button.btn-delete').click(function () {
            utils.AnimeInfoGapi.deleteAnime(parseInt(ui.AnimeForm.getInfo().id), function () {
                buildAnimeSelectDefault();
            });
        });
    }
    function buildAnimeForm(anime) {
        ui.AnimeForm.build(anime);
    }
})(IndexApp || (IndexApp = {}));
init = IndexApp.init;
//# sourceMappingURL=IndexApp.js.map