namespace AnimeInfoGapiSpec {
    describe('AnimeInfoGapi', () => {
        
        beforeAll((done) => {
            utils.AnimeInfoGapi.loadGapi(() => {
                done()
            })
        })
        describe('getAnime', () => {
            var animeResponse: gapi.client.animeInfo.Response<gapi.client.animeInfo.AnimeInfo>
            beforeEach((done) => {
                utils.AnimeInfoGapi.getAnime((resp) => {
                    animeResponse = resp
                    done()
                })
            })
            it('アニメ情報が取得できている', () => {
                expect(animeResponse).not.toBeNull()
                expect(animeResponse.items).not.toBeUndefined()
                expect(animeResponse.items.length).toBeGreaterThan(0)
                _.each(animeResponse.items, (value) => {
                    expect(value.id).toBeGreaterThan(0)
                    expect(value.title.length).toBeGreaterThan(0)
                })
            })
            describe('Period引数あり', () => {
                var period: gapi.client.animeInfo.Period = null
                beforeEach((done) => {
                    utils.AnimeInfoGapi.getPeriod((periodResp) => {
                        period = _.last(periodResp.items)
                        utils.AnimeInfoGapi.getAnime((animeResp) => {
                            animeResponse = animeResp
                            done()
                        }, period)
                    })
                })
                it('アニメ情報が取得できている', () => {
                    expect(period).not.toBeNull()
                    expect(animeResponse).not.toBeNull()
                    expect(animeResponse.items).not.toBeUndefined()
                    expect(animeResponse.items.length).toBeGreaterThan(0)
                    _.each(animeResponse.items, (value) => {
                        expect(value.id).toBeGreaterThan(0)
                        expect(value.title.length).toBeGreaterThan(0)
                        expect(value.periodId).toBe(period.id)
                    })
                })
            })
        })
        describe('getPeriod', () => {
            var response: gapi.client.animeInfo.Response<gapi.client.animeInfo.Period>
            beforeEach((done) => {
                utils.AnimeInfoGapi.getPeriod((resp) => {
                    response = resp
                    done()
                })
            })
            it('Period情報が取得できている', () => {
                expect(response).not.toBeNull()
                expect(response.items).not.toBeUndefined()
                expect(response.items.length).toBeGreaterThan(0)
                _.each(response.items, (value) => {
                    expect(value.id).toBeGreaterThan(0)
                    expect(value.year).toBeGreaterThan(2000)
                    expect(value.year).toBeLessThan(3000)
                    expect(value.season).toBeGreaterThan(0)
                    expect(value.season).toBeLessThan(5)
                })
            })
        })
    })
}