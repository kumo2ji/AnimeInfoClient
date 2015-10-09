var ui;
(function (ui) {
    var AnimeSelectCommon = (function () {
        function AnimeSelectCommon() {
        }
        AnimeSelectCommon.prototype.buildPeriodSelect = function (callback) {
            utils.AnimeInfoGapi.getPeriod(function (resp) {
                var sorted = _.sortBy(resp.items, function (item) {
                    return -parseInt(item.year + item.season);
                });
                var select = ui.PeriodSelect.build(sorted);
                callback(select);
            });
        };
        AnimeSelectCommon.prototype.buildAnimeSelect = function (callback) {
            var _this = this;
            utils.AnimeInfoGapi.getAnime(function (resp) {
                _this.animeInfos = resp.items;
                var select = ui.AnimeSelect.build(_this.animeInfos);
                callback(select);
            }, { id: ui.PeriodSelect.getSelectedId() });
        };
        AnimeSelectCommon.prototype.getAnime = function () {
            return _.find(this.animeInfos, function (value) {
                return value.id === ui.AnimeSelect.getSelectedId();
            });
        };
        return AnimeSelectCommon;
    })();
    ui.AnimeSelectCommon = AnimeSelectCommon;
})(ui || (ui = {}));
//# sourceMappingURL=AnimeSelectCommon.js.map