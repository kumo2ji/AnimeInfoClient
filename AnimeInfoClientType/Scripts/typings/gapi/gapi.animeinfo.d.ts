/// <reference path="gapi.d.ts" />
// Type definitions for Google API Client
// Project: https://code.google.com/p/google-api-javascript-client/
// Definitions by: Frank M <https://github.com/sgtfrankieboy>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare namespace gapi.client {
    export function load(name: string, version: string, callback: () => any, root: string): void
    namespace animeInfo {
        namespace get {
            export function anime(): HttpRequest<Response<AnimeInfo>>
            export function anime(request: GetAnimeInfoRequest): HttpRequest<Response<AnimeInfo>>
            export function period(): HttpRequest<Response<Period>>
        }
        namespace put {
            export function anime(request: PostAnimeInfoRequest): HttpRequest<Response<AnimeInfo>>
        }
        namespace erase {
            export function anime(request: IdRequest): HttpRequest<BooleanResponse>
        }
        export interface Response<T> {
            items: Array<T>
            nextPageToken: string
        }
        export interface AnimeInfo {
            id?: string
            title?: string
            shortTitles?: Array<string>
            publicUrl?: string
            sequel?: string
            sex?: string
            twitterAccount?: string
            twitterHashTags?: Array<string>
            periodId?: string
        }
        export interface Period {
            id?: string
            year?: string
            season?: string
        }
        export interface GetAnimeInfoRequest {
            period?: Period
            limit?: number
            cursor?: string
        }
        export interface PostAnimeInfoRequest {
            items?: Array<AnimeInfo>
        }
        export interface IdRequest {
            ids?: Array<number>
        }
        export interface BooleanResponse {
            value?: boolean,
            message?: string
        }
    }
}