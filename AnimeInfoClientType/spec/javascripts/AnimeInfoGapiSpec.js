var AnimeInfoGapiSpec;
(function (AnimeInfoGapiSpec) {
    describe('AnimeInfoGapi', function () {
        beforeAll(function (done) {
            utils.AnimeInfoGapi.loadGapi(function () {
                done();
            });
        });
        describe('getAnime', function () {
            var animeResponse;
            beforeEach(function (done) {
                utils.AnimeInfoGapi.getAnime(function (resp) {
                    animeResponse = resp;
                    done();
                });
            });
            it('アニメ情報が取得できている', function () {
                expect(animeResponse).not.toBeNull();
                expect(animeResponse.items).not.toBeUndefined();
                expect(animeResponse.items.length).toBeGreaterThan(0);
                _.each(animeResponse.items, function (value) {
                    expect(value.id).toBeGreaterThan(0);
                    expect(value.title.length).toBeGreaterThan(0);
                });
            });
            describe('Period引数あり', function () {
                var period = null;
                beforeEach(function (done) {
                    utils.AnimeInfoGapi.getPeriod(function (periodResp) {
                        period = _.last(periodResp.items);
                        utils.AnimeInfoGapi.getAnime(function (animeResp) {
                            animeResponse = animeResp;
                            done();
                        }, period);
                    });
                });
                it('アニメ情報が取得できている', function () {
                    expect(period).not.toBeNull();
                    expect(animeResponse).not.toBeNull();
                    expect(animeResponse.items).not.toBeUndefined();
                    expect(animeResponse.items.length).toBeGreaterThan(0);
                    _.each(animeResponse.items, function (value) {
                        expect(value.id).toBeGreaterThan(0);
                        expect(value.title.length).toBeGreaterThan(0);
                        expect(value.periodId).toBe(period.id);
                    });
                });
            });
        });
        describe('getPeriod', function () {
            var response;
            beforeEach(function (done) {
                utils.AnimeInfoGapi.getPeriod(function (resp) {
                    response = resp;
                    done();
                });
            });
            it('Period情報が取得できている', function () {
                expect(response).not.toBeNull();
                expect(response.items).not.toBeUndefined();
                expect(response.items.length).toBeGreaterThan(0);
                _.each(response.items, function (value) {
                    expect(value.id).toBeGreaterThan(0);
                    expect(value.year).toBeGreaterThan(2000);
                    expect(value.year).toBeLessThan(3000);
                    expect(value.season).toBeGreaterThan(0);
                    expect(value.season).toBeLessThan(5);
                });
            });
        });
    });
})(AnimeInfoGapiSpec || (AnimeInfoGapiSpec = {}));
//# sourceMappingURL=AnimeInfoGapiSpec.js.map