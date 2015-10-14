var PeriodSelectSpec;
(function (PeriodSelectSpec) {
    var periods = _.map(_.range(5), function (num) {
        return {
            id: num.toString(),
            year: (num * 100).toString(),
            season: (num % 4 + 1).toString()
        };
    });
    function build() {
        return ui.PeriodSelect.build(periods);
    }
    beforeEach(function () {
        loadFixtures('indexFixture.html');
    });
    describe('PeriodSelect', function () {
        it('Periodのselect要素が作られる', function () {
            var select = build();
            var options = select.children('option');
            expect(options).not.toBeEmpty();
            expect(options.length).toBe(periods.length);
            _.each(periods, function (period, index) {
                expect(options.eq(index).val()).toBe(period.id);
            });
        });
        it('onchangeイベントが期待通り動作する', function () {
            var select = build();
            var period = _.last(periods);
            select.change(function (e) {
                expect(select.val()).toBe(period.id);
            });
            select.val(period.id).change();
        });
        it('選択されているPeriod Idが取得できる', function () {
            var select = build();
            _.each(periods, function (period) {
                select.val(period.id);
                expect(ui.PeriodSelect.getSelectedId()).toBe(period.id);
            });
        });
    });
})(PeriodSelectSpec || (PeriodSelectSpec = {}));
//# sourceMappingURL=PeriodSelectSpec.js.map