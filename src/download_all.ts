declare function require(arg: string): string;
import * as $ from "jquery";
import * as utils from "./utils";

// The list of servers that 9anime Companion can
// currently download from. PR's are welcome to
// help expand the server pool.
export enum Servers {
    "Default", /* default means the 9anime server */
    "RapidVideo",
}

interface IEpisode {
    id: string; /* The actual episode id. ex: 42m48j */
    num: string; /* The  digit episode number. ex: 001 */
}

// This array hold's all the id's of the episodes of
// a particular server (ex: RapidVideo or 9anime) of
// the current anime.
let Episodes: IEpisode[] = [];
let selectedEpisodes: IEpisode[] = [];

// 9anime Companion can only download from 1 server at
// a time. This variable holds the type of server from
// which we are currently downloading/will download.
let currentServer: Servers;

export function showEpModal(): void {
    $("#nac__dl-all__ep-modal").show();
}

export function hideEpModal(): void {
    $("#nac__dl-all__ep-modal").hide();
}

/**
 * Returns a 'Download' button.
 * @param {string} server
 *      The server from which episodes will be downloaded.
 *      Allowed types are 9anime and RapidVideo.
 * @returns {JQuery<HTMLElement>} 'Download' button
 */
export function generateDlBtn(server: Servers): JQuery<HTMLElement> {
    let btn = $(`<button data-type="${server}" class="nac__dl-all">Download</button>`);
    btn.on("click", e => {
        Episodes = [];
        currentServer = $(e.currentTarget).data("type");

        // TODO: maybe all of this should be generated only once or somehow cached
        // Every time the 'Download' button is clicked,
        // all the episodes for the current server are
        // fetched and added to the dlEpisodeIds.
        let epLinks = $(e.currentTarget).parents(".server.row").find(".episodes > li > a");
        for (let ep of epLinks) {
            let id = $(ep).data("id");
            let num = $(ep).data("base");
            if (id && num) {
                Episodes.push({
                    id, /* short hand property. "id" means id: id */
                    num: utils.pad(num),
                });
            }
        }

        // Then we iterate through dlEpisodeIds and add the
        // episode to the epSelectModal. The user can then
        // take further action.
        let modalBody = $("#nac__dl-all__ep-modal").find(".body");
        modalBody.empty();
        /* delete the earlier episodes and start fresh */
        for (let ep of Episodes) {
            let epSpan = $(
                `<span class="nac__dl-all__episode">
                    <input type="checkbox" id="${ep.id}" data-num="${ep.num}">
                    <label for="${ep.id}">${ep.num}</label>
                </span>`);
            modalBody.append(epSpan);
        }
        // console.info(currentServer, dlEpisodeIds);
        showEpModal();
    });
    return btn;
}

/**
 * Returns string template of a modal which will be used for
 * displaying the episodes checklist, quality preference and
 * downloader select before the user downloads.
 * @param {string} name - Name of the current anime
 * @returns {string} Episode Select Modal
 */
export function epModal(name: string): JQuery<HTMLElement> {
    // We wil start by loading the template from an external file.
    let template = require("html-loader!./templates/dlAll_epModal.html");
    let modal = $(template);
    // Add the anime name to the "header"
    modal.find(".title").text(name);
    // When the overlay is clicked, the modal hides
    modal.on("click", e => {
        if (e.target === modal[0]) {
            hideEpModal();
        }
    });
    // Bind functionality for the "Select All" button
    modal.find("#nac__dl-all__select-all").on("click", () => {
        $("#nac__dl-all__ep-modal").find(".body input[type='checkbox']").prop("checked", true);
    });
    // Bind functionality for the "Download" button
    modal.find("#nac__dl-all__download").on("click", () => {
        // First, we get all the episodes that are
        // checked in the modal and push these to
        // selectedEpisodes.
        $("#nac__dl-all__ep-modal")
            .find(".body input[type='checkbox']:checked")
            .each((i, el) => {
                selectedEpisodes.push({
                    id: $(el).attr("id") || "",
                    num: $(el).data("num"),
                });
            });
        console.info("Downloading...", selectedEpisodes);
    });
    modal.hide();
    return modal;
}