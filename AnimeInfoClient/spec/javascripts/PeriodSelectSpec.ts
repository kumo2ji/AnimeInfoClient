namespace PeriodSelectSpec {
    const periods: Array<gapi.client.animeInfo.Period> = _.map(_.range(3), (num) => {
        return {
            id: num.toString(),
            year: (num * 100).toString(),
            season: (num * 10).toString()
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
                expect(options.eq(index).text()).toBe(period.year + ' ' + period.season)
            })
        })
    })
}