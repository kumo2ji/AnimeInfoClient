/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="utils.ts" />
/// <reference path="animeselect.ts" />
/// <reference path="animeform.ts" />
/// <reference path="scripts/typings/gapi/gapi.animeinfo.d.ts" />
var app;
(function (app) {
    function init() {
        utils.AnimeInfoGapi.loadGapi(function () {
            buildPeriodSelectDefault();
            buildButton();
        });
    }
    app.init = init;
    function buildPeriodSelectDefault() {
        buildPeriodSelect(function (periodSelect) {
            periodSelect.change(buildAnimeSelectDefault);
            buildAnimeSelectDefault();
            ui.AnimeForm.buildPeriodSelect(ui.PeriodSelect.getOptions());
        });
    }
    function buildAnimeSelectDefault() {
        buildAnimeSelect(function (animeSelect) {
            animeSelect.change(buildAnimeForm);
            buildAnimeForm();
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
                    buildAnimeSelect(function (select) {
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
    function buildPeriodSelect(callback) {
        utils.AnimeInfoGapi.getPeriod(function (resp) {
            var sorted = _.sortBy(resp.items, function (item) {
                return -parseInt(item.year + item.season);
            });
            var select = ui.PeriodSelect.build(sorted);
            callback(select);
        });
    }
    function buildAnimeSelect(callback) {
        utils.AnimeInfoGapi.getAnime(function (resp) {
            var animeInfos = resp.items;
            utils.LocalStorage.setAnimeInfos(animeInfos);
            var select = ui.AnimeSelect.build(animeInfos);
            callback(select);
        }, { id: ui.PeriodSelect.getSelectedId() });
    }
    function buildAnimeForm() {
        var animeInfos = utils.LocalStorage.getAnimeInfos();
        var anime = _.find(animeInfos, function (value) {
            return value.id === ui.AnimeSelect.getSelectedId();
        });
        ui.AnimeForm.build(anime);
    }
})(app || (app = {}));
init = app.init;
//# sourceMappingURL=app.js.map