var ui;
(function (ui) {
    var AnimeForm;
    (function (AnimeForm) {
        var SELECTOR = 'form.form-anime';
        var ID_SELECTOR = '#animeId';
        var PERIOD_SELECTOR = '#animePeriod';
        var TITLE_SELECTOR = '#animeTitle';
        var PUBLIC_URL_SELECTOR = '#animePublicUrl';
        var TWITTER_ACCOUNT_SELECTOR = '#animeTwitterAccount';
        var SEQUEL_SELECTOR = '#animeSequel';
        var HASH_TAGS_SELECTOR = 'div.animeHashTags';
        var SHORT_TITLES_SELECTOR = 'div.animeShortTitles';
        var SEX_SELECTOR = 'div.animeSex';
        function buildPeriodSelect(options) {
            $(PERIOD_SELECTOR).append(options);
        }
        AnimeForm.buildPeriodSelect = buildPeriodSelect;
        function getPeriodOptions() {
            return $(PERIOD_SELECTOR).children('option');
        }
        AnimeForm.getPeriodOptions = getPeriodOptions;
        function build(anime) {
            clearForm(SELECTOR);
            $(ID_SELECTOR).val(anime.id);
            $(TITLE_SELECTOR).val(anime.title);
            $(PERIOD_SELECTOR).val(anime.periodId);
            $(PUBLIC_URL_SELECTOR).val(anime.publicUrl);
            $(TWITTER_ACCOUNT_SELECTOR).val(anime.twitterAccount);
            var hashTagInputs = $(HASH_TAGS_SELECTOR).find('input');
            _.each(anime.twitterHashTags, function (value, index) {
                hashTagInputs.eq(index).val(value);
            });
            var shortTitleInputs = $(SHORT_TITLES_SELECTOR).find('input');
            _.each(anime.shortTitles, function (value, index) {
                shortTitleInputs.eq(index).val(value);
            });
            $(SEQUEL_SELECTOR).val(anime.sequel);
            $(SEX_SELECTOR).find('input[value=' + anime.sex + ']').prop('checked', true);
        }
        AnimeForm.build = build;
        function getInfo() {
            var hashTags = _.map($(HASH_TAGS_SELECTOR).find('input'), function (input) {
                return $(input).val();
            });
            var shortsTitles = _.map($(SHORT_TITLES_SELECTOR).find('input'), function (input) {
                return $(input).val();
            });
            return {
                id: $(ID_SELECTOR).val(),
                title: $(TITLE_SELECTOR).val(),
                periodId: $(PERIOD_SELECTOR).val(),
                publicUrl: $(PUBLIC_URL_SELECTOR).val(),
                twitterAccount: $(TWITTER_ACCOUNT_SELECTOR).val(),
                twitterHashTags: _.compact(hashTags),
                shortTitles: _.compact(shortsTitles),
                sequel: $(SEQUEL_SELECTOR).val(),
                sex: $(SEX_SELECTOR).find('input:checked').val()
            };
        }
        AnimeForm.getInfo = getInfo;
        function clearForm(selector) {
            var form = $(selector);
            form.find("textarea, :text, select").val("");
            form.find(":checked").prop("checked", false);
        }
    })(AnimeForm = ui.AnimeForm || (ui.AnimeForm = {}));
})(ui || (ui = {}));
//# sourceMappingURL=AnimeForm.js.map