namespace WikipediaSpec {
    describe('Wikipedia', () => {
        describe('search', () => {
            var infos: Array<utils.Wikipedia.SearchInfo>
            beforeEach((done) => {
                utils.Wikipedia.search('WORKING', (value) => {
                    infos = value
                    done()
                })
            })
            it('Wikipediaからタイトルを検索できる', () => {
                expect(_.isArray(infos)).toBeTruthy()
                _.each(infos, (info) => {
                    expect(_.isEmpty(info)).toBeFalsy()
                    expect(_.isString(info.title)).toBeTruthy()
                    expect(_.isString(info.snippet)).toBeTruthy()
                    expect(_.isString(info.timestamp)).toBeTruthy()
                    expect(_.isNumber(info.wordcount)).toBeTruthy()
                    expect(info.wordcount).toBeGreaterThan(0)
                    var timestamp = new Date(info.timestamp)
                    expect(_.isDate(timestamp)).toBeTruthy()
                })
            })
        })
    })
}