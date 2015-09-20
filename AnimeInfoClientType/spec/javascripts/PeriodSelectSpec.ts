namespace PeriodSelectSpec {
    const periods: Array<gapi.client.animeInfo.Period> = _.map(_.range(5), (num) => {
        return {
            id: num.toString(),
            year: (num * 100).toString(),
            season: (num % 4 + 1).toString()
        }
    })
    function build(): JQuery {
        return ui.PeriodSelect.build(periods)
    }
    beforeEach(() => {
        loadFixtures('indexFixture.html')
    })
    describe('PeriodSelect', () => {
        it('Periodのselect要素が作られる', () => {
            var select = build()
            var options = select.children('option')
            expect(options).not.toBeEmpty()
            expect(options.length).toBe(periods.length)
            _.each(periods, (period, index) => {
                expect(options.eq(index).val()).toBe(period.id)
            })
        })
        it('onchangeイベントが期待通り動作する', () => {
            var select = build()
            var period = _.last(periods)
            select.change((e) => {
                expect(select.val()).toBe(period.id)
            })
            select.val(period.id).change()
        })
        it('選択されているPeriod Idが取得できる', () => {
            var select = build()
            _.each(periods, (period) => {
                select.val(period.id)
                expect(ui.PeriodSelect.getSelectedId()).toBe(period.id)
            })
        })
    })
}