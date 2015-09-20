namespace ui.AnimeForm {
    const SELECTOR = 'form.form-anime'
    const ID_SELECTOR = '#animeId'
    const PERIOD_SELECTOR = '#animePeriod'
    const TITLE_SELECTOR = '#animeTitle'
    const PUBLIC_URL_SELECTOR = '#animePublicUrl'
    const TWITTER_ACCOUNT_SELECTOR = '#animeTwitterAccount'
    const SEQUEL_SELECTOR = '#animeSequel'
    const HASH_TAGS_SELECTOR = 'div.animeHashTags'
    const SHORT_TITLES_SELECTOR = 'div.animeShortTitles'
    const SEX_SELECTOR = 'div.animeSex'

    export function buildPeriodSelect(options: JQuery) {
        $(PERIOD_SELECTOR).append(options)
    }

    export function getPeriodOptions(): JQuery {
        return $(PERIOD_SELECTOR).children('option')
    }

    export function build(anime: gapi.client.animeInfo.AnimeInfo) {
        clearForm(SELECTOR)
        $(ID_SELECTOR).val(anime.id)
        $(TITLE_SELECTOR).val(anime.title)
        $(PERIOD_SELECTOR).val(anime.periodId)
        $(PUBLIC_URL_SELECTOR).val(anime.publicUrl)
        $(TWITTER_ACCOUNT_SELECTOR).val(anime.twitterAccount)
        var hashTagInputs = $(HASH_TAGS_SELECTOR).find('input')
        _.each(anime.twitterHashTags, (value, index) => {
            hashTagInputs.eq(index).val(value)
        })
        var shortTitleInputs = $(SHORT_TITLES_SELECTOR).find('input')
        _.each(anime.shortTitles, (value, index) => {
            shortTitleInputs.eq(index).val(value)
        })
        $(SEQUEL_SELECTOR).val(anime.sequel)
        $(SEX_SELECTOR).find('input[value=' + anime.sex + ']').prop('checked', true)
    }
    export function getInfo(): gapi.client.animeInfo.AnimeInfo {
        var hashTags = _.map($(HASH_TAGS_SELECTOR).find('input'), (input: Element) => {
            return $(input).val()
        })
        var shortsTitles = _.map($(SHORT_TITLES_SELECTOR).find('input'), (input: Element) => {
            return $(input).val()
        })
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
        }
    }
    function clearForm(selector: string) {
        var form = $(selector)
        form.find("textarea, :text, select").val("")
        form.find(":checked").prop("checked", false)
    }
}