namespace utils.Wikipedia {
    const ENDPOINT = 'https://ja.wikipedia.org/w/api.php?'
    const INFO_BASE_URL = ENDPOINT + 'action=query&prop=revisions&format=json&rvprop=content&redirects=&titles='
    const TITLE_BASE_URL = ENDPOINT + 'action=query&list=search&format=json&srsearch='

    export function search(title: string, success: (infos: Array<SearchInfo>) => void, fail?: (jqXhr: JQueryXHR) => void) {
        var url = TITLE_BASE_URL + encodeURIComponent(title)
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
}