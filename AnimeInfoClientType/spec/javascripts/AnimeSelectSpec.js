var AnimeSelectSpec;
(function (AnimeSelectSpec) {
    var animeInfos = _.map(_.range(3), function (num) {
        return {
            id: num.toString(),
            title: 'title' + num
        };
    });
    function build() {
        return ui.AnimeSelect.build(animeInfos);
    }
    beforeEach(function () {
        loadFixtures('indexFixture.html');
    });
    describe('AnimeSelect', function () {
        it('Animeのselect要素が作られる', function () {
            var select = build();
            var options = select.children('option');
            expect(options).not.toBeEmpty();
            expect(options.length).toBe(animeInfos.length);
            _.each(animeInfos, function (animeInfo, index) {
                expect(options.eq(index).val()).toBe(animeInfo.id);
                expect(options.eq(index).text()).toBe(animeInfo.title);
            });
        });
    });
})(AnimeSelectSpec || (AnimeSelectSpec = {}));
//# sourceMappingURL=AnimeSelectSpec.js.map