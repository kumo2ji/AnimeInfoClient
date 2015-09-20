namespace ui.SelectUtils {
    const CREATE_OPTION_SELECTOR = '<option></option>'
    export function create(value: string, text: string): JQuery {
        return $(CREATE_OPTION_SELECTOR, {
            value: value,
            text: text
        })
    }
    export function build(selector: string, pairs: Array<utils.KeyValuePair<String, String>>): JQuery {
        var select = $(selector)
        select.children().remove()
        _.each(pairs, (pair) => {
            var option = $('<option></option>', {
                value: pair.key,
                text: pair.value
            })
            select.append(option)
        })
        return select
    }
    export function getOptions(selector: string) {
        return $(selector).children('option').clone()
    }
    export function getSelectedValue(selector: string): string {
        return $(selector).val()
    }
}