/// <reference path="gapiutils.ts" />
/// <reference path="scripts/typings/jasmine/jasmine.d.ts" />

describe('gapiUtilsモジュール', () => {
    beforeAll((done) => {
        gapiUtils.loadGapi(() => {
            done()
        })
    })
    describe('getAnimeメソッドのテスト', () => {
        var response: gapi.client.animeInfo.Response<gapi.client.animeInfo.AnimeInfo>
        beforeEach((done) => {
            gapiUtils.getAnime((resp) => {
                response = resp
                done()
            })
        })
        it('アニメ情報が取得できている', () => {
            expect(response).not.toBeNull()
            expect(response.items).not.toBeUndefined()
            expect(response.items.length).toBeGreaterThan(0)
            _.each(response.items, (value) => {
                expect(value.id).toBeGreaterThan(0)
                expect(value.title.length).toBeGreaterThan(0)
            })
        })
    })
    describe('getCoursObjectメソッドのテスト', () => {
        var response: gapi.client.animeInfo.Response<gapi.client.animeInfo.CoursObject>
        beforeEach((done) => {
            gapiUtils.getCoursObjects((resp) => {
                response = resp
                done()
            })
        })
        it('クール情報が取得できている', () => {
            expect(response).not.toBeNull()
            expect(response.items).not.toBeUndefined()
            expect(response.items.length).toBeGreaterThan(0)
            _.each(response.items, (value) => {
                expect(value.id).toBeGreaterThan(0)
                expect(value.year).toBeGreaterThan(2000)
                expect(value.year).toBeLessThan(3000)
                expect(value.cours).toBeGreaterThan(0)
                expect(value.cours).toBeLessThan(5)
            })
        })
    })
})