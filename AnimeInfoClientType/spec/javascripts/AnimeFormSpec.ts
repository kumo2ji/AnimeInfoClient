namespace AnimeFormSpec {
    const animeInfo = {
        id: '1',
        periodId: '1',
        publicUrl: 'http://test.com',
        sequel: '1',
        sex: '1',
        shortTitles: ['shortTitle0', 'shortTitle1'],
        title: 'title',
        twitterAccount: 'testAccount',
        twitterHashTags: ['hashTag0', 'hashTag1']
    }
    function buildPeriodSelect(): JQuery {
        var select = $('<select></select>')
        _.each(_.range(3), (value) => {
            select.append(ui.SelectUtils.create(value.toString(), 'text' + value))
        })
        var options = select.children('option').clone()
        ui.AnimeForm.buildPeriodSelect(options)
        return options
    }
    describe('AnimeForm', () => {
        beforeEach(() => {
            loadFixtures('indexFixture.html')
        })
        describe('buildPeriodSelect', () => {
            it('#animePeriodにoptionを追加できる', () => {
                var options: JQuery = buildPeriodSelect()

                var optionsInHtml = ui.AnimeForm.getPeriodOptions()
                _.each(options, (elem: Element, index) => {
                    expect(optionsInHtml.eq(index).val()).toBe($(elem).val())
                    expect(optionsInHtml.eq(index).text()).toBe($(elem).text())
                })
            })
        })
        describe('build', () => {
            it('formを初期化することができる', () => {
                buildPeriodSelect()
                ui.AnimeForm.build(animeInfo)
                expect(ui.AnimeForm.getInfo()).toEqual(animeInfo)
                var animeInfo2 = _.clone(animeInfo)
                animeInfo2.id = '2'
                animeInfo2.periodId = '2'
                animeInfo2.twitterHashTags = []
                ui.AnimeForm.build(animeInfo2)
                expect(ui.AnimeForm.getInfo()).not.toEqual(animeInfo)
                expect(ui.AnimeForm.getInfo()).toEqual(animeInfo2)
            })
        })
    })
}

