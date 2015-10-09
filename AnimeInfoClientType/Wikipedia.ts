namespace utils.Wikipedia {
    const ENDPOINT = 'https://ja.wikipedia.org/w/api.php?'
    const INFO_BASE_URL = ENDPOINT + 'action=query&prop=revisions&format=json&rvprop=content&redirects=&titles='
    const SEARCH_BASE_URL = ENDPOINT + 'action=query&list=search&format=json&srsearch='

    export function search(title: string, success: (infos: Array<SearchInfo>) => void, fail?: (jqXhr: JQueryXHR) => void) {
        var url = SEARCH_BASE_URL + encodeURIComponent(title)
        var xhr = $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: 'callback'
        })
        xhr.then((json: SearchResponseJson) => {
            success(json.query.search)
        }, fail)
    }

    interface SearchResponseJson {
        query: {
            search: Array<SearchInfo>
        }
    }

    export interface SearchInfo {
        title: string,
        snippet: string,
        wordcount: number,
        timestamp: string
    }

    export function getWikiInfo(title: string, success: (info: WikiInfo) => void, fail?: (jqXhr: JQueryXHR) => void) {
        var url = INFO_BASE_URL + encodeURIComponent(title)
        var xhr = $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: 'callback'
        })
        xhr.then((json: ContentResponseJson) => {
            var pages = json.query.pages
            var page: PageJson = _.first(_.values(pages))
            var revision = _.first(page.revisions)
            var content = revision['*']
            var tvAnimeInfobox = getTvAnimeInfoboxText(content)
            success({
                pageTitle: page.title,
                title: split(getValue(tvAnimeInfobox, 'タイトル')),
                director: split(getValue(tvAnimeInfobox, '監督')),
                writer: split(getValue(tvAnimeInfobox, '脚本')),
                music: split(getValue(tvAnimeInfobox, '音楽')),
                studio: split(getValue(tvAnimeInfobox, 'アニメーション制作'))
            })
        }, fail)
    }

    function getTvAnimeInfoboxText(input: string): string {
        var regex = /\{\{Infobox animanga\/TVAnime([\s\S]+?)\}\}/
        return regex.exec(input)[1]
    }

    function getValue(text: string, key: string): string {
        var regex = new RegExp('^\\| *' + key + ' *= *(.+?)$', 'm')
        var execArray = regex.exec(text)
        if (_.isEmpty(execArray)) {
            return ''
        } else {
            return removeSquareBracket(execArray[1])
        }
    }

    function removeSquareBracket(input: string) {
        return input.replace(/\[|\]/g, '')
    }

    function removeHtmlTag(input: string) {
        return input.replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g, '')
    }

    function split(input: string): Array<string> {
        var splitted = input.split(/<br ?\/?>/)
        var tagRemoved = _.map(splitted, (value) => {
            return removeHtmlTag(value)
        })
        return _.compact(tagRemoved)
    }

    interface ContentResponseJson {
        query: {
            pages: Object
        }
    }

    interface PageJson {
        pageId: number,
        title: string,
        revisions: Array<{
            '*': string
        }>
    }

    export interface WikiInfo {
        pageTitle: string,
        title: Array<string>,
        director: Array<string>,
        writer: Array<string>,
        music: Array<string>,
        studio: Array<string>
    }
}