var ui;
(function (ui) {
    var AnimeSelectGroup = (function () {
        function AnimeSelectGroup() {
        }
        AnimeSelectGroup.prototype.buildPeriodSelect = function (callback) {
            utils.AnimeInfoGapi.getPeriod(function (resp) {
                var sorted = _.sortBy(resp.items, function (item) {
                    return -parseInt(item.year + item.season);
                });
                var select = ui.PeriodSelect.build(sorted);
                callback(select);
            });
        };
        AnimeSelectGroup.prototype.buildAnimeSelect = function (callback) {
            var _this = this;
            utils.AnimeInfoGapi.getAnime(function (resp) {
                _this.animeInfos = resp.items;
                var select = ui.AnimeSelect.build(_this.animeInfos);
                callback(select);
            }, { id: ui.PeriodSelect.getSelectedId() });
        };
        AnimeSelectGroup.prototype.getAnime = function () {
            return _.find(this.animeInfos, function (value) {
                return value.id === ui.AnimeSelect.getSelectedId();
            });
        };
        return AnimeSelectGroup;
    })();
    ui.AnimeSelectGroup = AnimeSelectGroup;
})(ui || (ui = {}));
//# sourceMappingURL=AnimeSelectGroup.js.map