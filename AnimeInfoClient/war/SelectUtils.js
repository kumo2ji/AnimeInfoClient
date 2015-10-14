var ui;
(function (ui) {
    var SelectUtils;
    (function (SelectUtils) {
        var CREATE_OPTION_SELECTOR = '<option></option>';
        function create(value, text) {
            return $(CREATE_OPTION_SELECTOR, {
                value: value,
                text: text
            });
        }
        SelectUtils.create = create;
        function build(selector, pairs) {
            var select = $(selector);
            select.empty();
            select.off();
            _.each(pairs, function (pair) {
                var option = $('<option></option>', {
                    value: pair.key,
                    text: pair.value
                });
                select.append(option);
            });
            return select;
        }
        SelectUtils.build = build;
        function getOptions(selector) {
            return $(selector).children('option').clone();
        }
        SelectUtils.getOptions = getOptions;
        function getSelectedValue(selector) {
            return $(selector).val();
        }
        SelectUtils.getSelectedValue = getSelectedValue;
    })(SelectUtils = ui.SelectUtils || (ui.SelectUtils = {}));
})(ui || (ui = {}));
//# sourceMappingURL=SelectUtils.js.map