namespace ui {
    export class AnimeSelectGroup {
        animeInfos: Array<gapi.client.animeInfo.AnimeInfo>
        buildPeriodSelect(callback: (select: JQuery) => void) {
            utils.AnimeInfoGapi.getPeriod((resp) => {
                var sorted = _.sortBy(resp.items, (item) => {
                    return -parseInt(item.year + item.season)
                })
                var select = ui.PeriodSelect.build(sorted)
                callback(select)
            })
        }

        buildAnimeSelect(callback: (select: JQuery) => void) {
            utils.AnimeInfoGapi.getAnime((resp) => {
                this.animeInfos = resp.items
                var select = ui.AnimeSelect.build(this.animeInfos)
                callback(select)
            }, { id: ui.PeriodSelect.getSelectedId() })
        }

        getAnime(): gapi.client.animeInfo.AnimeInfo {
            return _.find(this.animeInfos, (value) => {
                return value.id === ui.AnimeSelect.getSelectedId()
            })
        }
    }
}