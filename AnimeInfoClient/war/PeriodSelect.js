var ui;
(function (ui) {
    var PeriodSelect;
    (function (PeriodSelect) {
        var SEASON_NAMES = [null, '冬', '春', '夏', '秋'];
        var PERIOD_SELECTOR = 'div.div-anime-select select.sel-period';
        function build(periods) {
            return ui.SelectUtils.build(PERIOD_SELECTOR, _.map(periods, function (item) {
                return {
                    key: item.id,
                    value: item.year + ' ' + SEASON_NAMES[item.season]
                };
            }));
        }
        PeriodSelect.build = build;
        function getOptions() {
            return ui.SelectUtils.getOptions(PERIOD_SELECTOR);
        }
        PeriodSelect.getOptions = getOptions;
        function getSelectedId() {
            return ui.SelectUtils.getSelectedValue(PERIOD_SELECTOR);
        }
        PeriodSelect.getSelectedId = getSelectedId;
    })(PeriodSelect = ui.PeriodSelect || (ui.PeriodSelect = {}));
})(ui || (ui = {}));
//# sourceMappingURL=PeriodSelect.js.map