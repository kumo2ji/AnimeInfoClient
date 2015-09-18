namespace AnimeSelectSpec {
    const animeInfos: Array<gapi.client.animeInfo.AnimeInfo> = _.map(_.range(3), (num) => {
        return {
            id: num.toString(),
            title: 'title' + num
        }
    })
    function build(): JQuery {
        return ui.AnimeSelect.build(animeInfos)
    }
    beforeEach(() => {
        loadFixtures('indexFixture.html')
    })
    describe('AnimeSelect', () => {
        it('Animeのselect要素が作られる', () => {
            var select = build()
            var options = select.children('option')
            expect(options).not.toBeEmpty()
            expect(options.length).toBe(animeInfos.length)
            _.each(animeInfos, (animeInfo, index) => {
                expect(options.eq(index).val()).toBe(animeInfo.id)
                expect(options.eq(index).text()).toBe(animeInfo.title)
            })
        })
    })
}