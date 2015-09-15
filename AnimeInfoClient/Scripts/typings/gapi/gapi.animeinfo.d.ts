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
            export function cours(): HttpRequest<Response<CoursObject>>
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
        }
        export interface CoursObject {
            id?: string
            year?: string
            cours?: string
        }
        export interface GetAnimeInfoRequest {
            coursObject?: CoursObject
            limit?: number
            cursor?: string
        }
    }
}