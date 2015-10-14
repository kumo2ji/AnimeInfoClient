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
            var info = parse(json)
            success(info)
        }, fail)
    }

    function parse(json: ContentResponseJson): WikiInfo {
        var page = getPage(json)
        var content = getContent(page)
        var tvAnimeInfobox = getTvAnimeInfoboxText(content)
        return {
            pageTitle: page.title,
            title: getValueAndSplit(tvAnimeInfobox, 'タイトル'),
            director: getValueAndSplit(tvAnimeInfobox, '監督'),
            writer: getValueAndSplit(tvAnimeInfobox, '脚本'),
            music: getValueAndSplit(tvAnimeInfobox, '音楽'),
            studio: getValueAndSplit(tvAnimeInfobox, 'アニメーション制作')
        }
    }

    function getPage(json: ContentResponseJson): PageJson {
        var pages = json.query.pages
        return _.first(_.values(pages))
    }

    function getContent(page: PageJson): string {
        var revision = _.first(page.revisions)
        return revision['*']
    }

    function getValueAndSplit(text: string, key: string): Array<string> {
        var value = getValue(text, key)
        return split(value)
    }

    function getTvAnimeInfoboxText(input: string): string {
        var regex = /\{\{Infobox animanga\/TVAnime([\s\S]+?)\}\}/
        var execArray = regex.exec(input)
        if (_.isNull(execArray)) {
            return ''
        }
        return execArray[1]
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