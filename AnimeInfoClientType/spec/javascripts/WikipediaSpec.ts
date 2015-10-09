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
        describe('getWikiInfo', () => {
            var info: utils.Wikipedia.WikiInfo
            beforeEach((done) => {
                utils.Wikipedia.getWikiInfo('WORKING!!', (value) => {
                    info = value
                    done()
                })
            })
            it('Wikipediaからアニメ情報を取得できる', () => {
                expect(_.isEmpty(info)).toBeFalsy()
                expect(info.pageTitle).toBe('WORKING!!')
                expect(_.isEmpty(info.title)).toBeFalsy()
                expect(_.isEmpty(info.director)).toBeFalsy()
                expect(_.isEmpty(info.writer)).toBeFalsy()
                expect(_.isEmpty(info.music)).toBeFalsy()
                expect(_.isEmpty(info.studio)).toBeFalsy()
            })
        })
    })
}