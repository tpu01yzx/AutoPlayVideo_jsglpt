// ==UserScript==
// @name         继续教育自动刷视频
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  auto play videos!
// @author       tpu01yzx
// @match        https://jsglpt.gdedu.gov.cn/ncts/*
// @icon         https://www.google.com/s2/favicons?domain=gdedu.gov.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //var ajaxHook = function() {
    //    var $ = $ || window.$;
    //    $.ajaxSetup({beforeSend: function(xhr, settings) {
    //        //fix a error in updateLastViewTime for the old version.
    //        settings.url = settings.url.replace("/nctsa_", "/ncts/a_");
    //    }});
    //};
    //setTimeout(ajaxHook,1000);

    var main_func = function() {
        var $ = $ || window.$;

        var times = $('input[id^="time_"]');
        if(times && times.length > 0) {
            times.each(function(){ this.remove(); });
        }

        var player = player || window.player;
        var isComplete = isComplete || window.isComplete;

        if(isComplete && $('a[class="btn next crt"]')) {
            $('a[class="btn next crt"]').click();
        }
        if(player && player.V && player.loaded && !player.V.ended) {
            if(player.V.paused) player.videoPlay();
        }
        setTimeout(main_func, 1000);
    }
    if(window.player) setTimeout(main_func,1000);

    // Your code here...
})();
