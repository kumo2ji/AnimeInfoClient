var ui;
(function (ui) {
    var AnimeSelect;
    (function (AnimeSelect) {
        var ANIME_SELECTOR = 'select.sel-anime';
        function build(animeInfos) {
            return ui.SelectUtils.build(ANIME_SELECTOR, _.map(animeInfos, function (item) {
                return {
                    key: item.id,
                    value: item.title
                };
            }));
        }
        AnimeSelect.build = build;
        function getOptions() {
            return ui.SelectUtils.getOptions(ANIME_SELECTOR);
        }
        AnimeSelect.getOptions = getOptions;
        function getSelectedId() {
            return ui.SelectUtils.getSelectedValue(ANIME_SELECTOR);
        }
        AnimeSelect.getSelectedId = getSelectedId;
        function append(anime) {
            var option = ui.SelectUtils.create(anime.id, anime.title);
            return $(ANIME_SELECTOR).append(option);
        }
        AnimeSelect.append = append;
        function select(id) {
            return $(ANIME_SELECTOR).val(id);
        }
        AnimeSelect.select = select;
    })(AnimeSelect = ui.AnimeSelect || (ui.AnimeSelect = {}));
})(ui || (ui = {}));
//# sourceMappingURL=AnimeSelect.js.map