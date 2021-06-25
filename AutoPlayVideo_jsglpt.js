// ==UserScript==
// @name         继续教育自动刷视频
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  auto play videos!
// @author       tpu01yzx
// @match        https://jsglpt.gdedu.gov.cn/ncts/*
// @require      https://jsglpt.gdedu.gov.cn/js/jquery/jquery-1.12.4.min.js
// @icon         https://www.google.com/s2/favicons?domain=gdedu.gov.cn
// @downloadURL  https://raw.githubusercontent.com/tpu01yzx/AutoPlayVideo_jsglpt/main/AutoPlayVideo_jsglpt.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var main_func = function() {
        var $ = $ || window.$;

        //var times = $('input[id^="time_"]');
        //if(times && times.length > 0) {
        //    times.each(function(){ this.remove(); });
        //}

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

    var reload_func = function() {
        var $ = $ || window.$;
        if($.ajaxSubmitValue == undefined) {
            $.ajaxSubmitValue = function(urlValue) {
                var rData = $.ajax({
                    url: urlValue,
                    type: "post",
                    async: false,
                    success: function (data) {
                    }
                }).responseText;
                return rData;
            };
        }
        var div0 = $('div[class="g-active-time"]');
        if(div0 && div0.length == 1 && div0[0].innerText.indexOf("请您稍后再尝试登陆") >= 0) {
//            window.location.reload();
            var ticket = $.ajaxSubmitValue('/teacher/ssoItlmsTicket.action');
            if(ticket && ticket.toString().indexOf('ITLMS-') == 0) {
                var htmlForm = $('<form id="SSO_ITLMS_PUBLIC_STUDY_FORM" action="https://jsglpt.gdedu.gov.cn/ncts/nts/loginToStoreByAccount" method="post">  </form>');
                htmlForm.append('<input type="hidden" id="ticket_public" name="ticket" value="' + ticket +'" />');
                $(document.body).append(htmlForm);
                htmlForm.submit();
            } else {
                setTimeout(reload_func,5000);
            }
        }
    };
    if(window.location.href == "https://jsglpt.gdedu.gov.cn/ncts/nts/loginToStoreByAccount") {
       setTimeout(reload_func,5000);
    }

    // Your code here...
})();
