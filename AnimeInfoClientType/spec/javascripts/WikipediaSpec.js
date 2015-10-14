var WikipediaSpec;
(function (WikipediaSpec) {
    describe('Wikipedia', function () {
        describe('search', function () {
            var infos;
            beforeEach(function (done) {
                utils.Wikipedia.search('WORKING', function (value) {
                    infos = value;
                    done();
                });
            });
            it('Wikipediaからタイトルを検索できる', function () {
                expect(_.isArray(infos)).toBeTruthy();
                _.each(infos, function (info) {
                    expect(_.isEmpty(info)).toBeFalsy();
                    expect(_.isString(info.title)).toBeTruthy();
                    expect(_.isString(info.snippet)).toBeTruthy();
                    expect(_.isString(info.timestamp)).toBeTruthy();
                    expect(_.isNumber(info.wordcount)).toBeTruthy();
                    expect(info.wordcount).toBeGreaterThan(0);
                    var timestamp = new Date(info.timestamp);
                    expect(_.isDate(timestamp)).toBeTruthy();
                });
            });
        });
        describe('getWikiInfo', function () {
            var info;
            beforeEach(function (done) {
                utils.Wikipedia.getWikiInfo('WORKING!!', function (value) {
                    info = value;
                    done();
                });
            });
            it('Wikipediaからアニメ情報を取得できる', function () {
                expect(_.isEmpty(info)).toBeFalsy();
                expect(info.pageTitle).toBe('WORKING!!');
                expect(_.isEmpty(info.title)).toBeFalsy();
                expect(_.isEmpty(info.director)).toBeFalsy();
                expect(_.isEmpty(info.writer)).toBeFalsy();
                expect(_.isEmpty(info.music)).toBeFalsy();
                expect(_.isEmpty(info.studio)).toBeFalsy();
            });
        });
    });
})(WikipediaSpec || (WikipediaSpec = {}));
//# sourceMappingURL=WikipediaSpec.js.map