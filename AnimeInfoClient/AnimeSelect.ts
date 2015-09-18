namespace ui.AnimeSelect {
    const ANIME_SELECTOR = 'select.sel-anime'

    export function build(animeInfos: Array<gapi.client.animeInfo.AnimeInfo>,
        onchange: () => void = null): JQuery {
        return SelectUtils.build(ANIME_SELECTOR, _.map(animeInfos, (item) => {
            return {
                key: item.id,
                value: item.title
            }
        }), onchange)
    }

    export function getOptions(): JQuery {
        return SelectUtils.getOptions(ANIME_SELECTOR)
    }

    export function getSelectedId(): string {
        return SelectUtils.getSelectedValue(ANIME_SELECTOR)
    }
}