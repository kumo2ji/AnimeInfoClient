/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="scripts/typings/gapi/gapi.animeinfo.d.ts" />
declare var init: Function

namespace app {
    export function init() {
        gapiUtils.loadGapi(buildCoursSelect)
    }

    function buildCoursSelect() {
        gapiUtils.getCoursObjects((resp) => {
            var select = $('select.sel-cours')
            select.children().remove()
            _.each(resp.items, (item) => {
                var option = $('<option></option>', {
                    value: item.id,
                    text: item.year + ' ' + toSeasonString(item.cours)
                })
                select.append(option)
            })
            buildAnimeSelect()
            select.change(buildAnimeSelect)
        })
    }

    var animeInfos: Array <gapi.client.animeInfo.AnimeInfo>

    function buildAnimeSelect() {
        gapiUtils.getAnime((resp) => {
            animeInfos = resp.items
            var select = $('select.sel-anime')
            select.children().remove()
            _.each(animeInfos, (item) => {
                var option = $('<option></option>', {
                    value: item.id,
                    text: item.title
                })
                select.append(option)
            })
            buildAnimeForm()
            select.change(buildAnimeForm)
        }, { id: $('select.sel-cours').val() })
    }

    function buildAnimeForm() {
        $('form.form-anime').find("textarea, :text, select").val("").end().find(":checked").prop("checked", false)
        var id = $('select.sel-anime').val()
        $('#animeId').val(id)
        var anime = _.find(animeInfos, (value) => {
            return value.id === id
        })
        $('#animeTitle').val(anime.title)
        $('#animePublicTitle').val(anime.publicUrl)
        $('#animeTwitterAccount').val(anime.twitterAccount)
        anime.twitterHashTags.forEach((value, index) => {
            var selector = '#animeHashtag' + index
            $(selector).val(value)
        })
        anime.shortTitles.forEach((value, index) => {
            var selector = '#animeShortTitle' + index
            $(selector).val(value)
        })
        $('#animeSequel').val((parseInt(anime.sequel) + 1).toString())
        switch (anime.sex) {
            case '0':
                $('#animeSex1').prop('checked', true)
                break
            case '1':
                $('#animeSex2').prop('checked', true)
                break
        }
    }

    function toSeasonString(cours: string): string {
        switch (cours) {
            case '1':
                return '春'
            case '2':
                return '夏'
            case '3':
                return '秋'
            case '4':
                return '冬'
        }
    }
}

init = app.init