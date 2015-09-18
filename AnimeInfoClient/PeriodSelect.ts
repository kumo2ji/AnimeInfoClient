namespace ui.PeriodSelect {
    const SEASON_NAMES: Array<string> = [null, '春', '夏', '秋', '冬']
    const PERIOD_SELECTOR = 'div.div-anime-select select.sel-period'
    export function build(periods: Array<gapi.client.animeInfo.Period>, onchange: () => void = null): JQuery {
        return SelectUtils.build(PERIOD_SELECTOR, _.map(periods, (item) => {
            return {
                key: item.id,
                value: item.year + ' ' + SEASON_NAMES[item.season]
            }
        }), onchange)
    }
    export function getOptions(): JQuery {
        return SelectUtils.getOptions(PERIOD_SELECTOR)
    }

    export function getSelectedId(): string {
        return SelectUtils.getSelectedValue(PERIOD_SELECTOR)
    }
}