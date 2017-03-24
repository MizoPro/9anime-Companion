/**
 *  MIT License
 *
 *  Copyright (c) 2017 Jewel Mahanta
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

var gulp = require("gulp");
var zip = require("gulp-zip");


gulp.task("make_chrome", function () {
    gulp.src([
        "src/**/*.{js,css,png,html,eot,svg,ttf,woff,woff2}",
        "platform/chromium/**/*"
    ])
        .pipe(gulp.dest("dist/chromium"));
});

gulp.task("zip_chrome", function () {
    gulp.src([
        "src/**/*.{js,css,png,html,eot,svg,ttf,woff,woff2}",
        "platform/chromium/**/*"
    ])
        .pipe(zip("9anime_Companion_chrome.zip"))
        .pipe(gulp.dest("dist"));
});

gulp.task("make_firefox", function () {
    gulp.src([
        "src/**/*.{js,css,png,html,eot,svg,ttf,woff,woff2}",
        "platform/firefox/**/*"
    ])
        .pipe(gulp.dest("dist/firefox"));
});

gulp.task("zip_firefox", function () {
    gulp.src([
        "src/**/*.{js,css,png,html,eot,svg,ttf,woff,woff2}",
        "platform/firefox/**/*"
    ])
        .pipe(zip("9anime_Companion_firefox.zip"))
        .pipe(gulp.dest("dist"));
});