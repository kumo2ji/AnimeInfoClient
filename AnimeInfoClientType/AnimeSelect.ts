namespace ui.AnimeSelect {
    const ANIME_SELECTOR = 'select.sel-anime'

    export function build(animeInfos: Array<gapi.client.animeInfo.AnimeInfo>): JQuery {
        return SelectUtils.build(ANIME_SELECTOR, _.map(animeInfos, (item) => {
            return {
                key: item.id,
                value: item.title
            }
        }))
    }

    export function getOptions(): JQuery {
        return SelectUtils.getOptions(ANIME_SELECTOR)
    }

    export function getSelectedId(): string {
        return SelectUtils.getSelectedValue(ANIME_SELECTOR)
    }

    export function append(anime: gapi.client.animeInfo.AnimeInfo): JQuery {
        var option = ui.SelectUtils.create(anime.id, anime.title)
        return $(ANIME_SELECTOR).append(option)
    }

    export function select(id: string): JQuery {
        return $(ANIME_SELECTOR).val(id)
    }
}