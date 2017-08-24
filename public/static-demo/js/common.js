/**
 * Created by mjj on 2017/8/16.
 */
var $wrapper = $('.page-box');
$('#hideLeftBar').click(function () {

    $('.user-avator').toggleClass('pull-right');

    if ($('.page-box').hasClass('min-menu')) {
        $('.page-box').removeClass('min-menu');
        $('.nav-menu span').show();
        $('.user-name').show();

        $('.has-sub-menu').trigger('dm-max');

    } else {
        $('.page-box').addClass('min-menu');
        $('.nav-menu span').hide();
        $('.user-name').hide();

        $('.has-sub-menu').trigger('dm-min');
    }
});

$('.has-sub-menu').click(function () {
    if ($wrapper.hasClass('min-menu')) return;
    var that = $(this),
        $subMenu = that.find('.sub-menu');
    that.toggleClass('open');

    if (that.hasClass('open')) {
        $subMenu.slideDown();
    } else {
        $subMenu.slideUp();
    }

}).on('mouseenter', function () {
    // if (!$('.page-box').hasClass('min-menu')) return;
    // var $subMenu = $(this).find('.sub-menu').show();
    // setTimeout(function(){
    //     $subMenu.addClass('show');
    // },100)
}).on('mouseleave', function () {
    // if (!$('.page-box').hasClass('min-menu')) return;
    // var $subMenu = $(this).find('.sub-menu');
    // $subMenu.removeClass('show');
}).on('dm-min', function () {
    var menuName = $(this).find('.menu-name').text();
    $(this).find('.sub-menu').find('.father-menu-name').remove();
    $(this).find('.sub-menu').prepend('<li class="father-menu-name"><span>' + menuName + '</span></li>')
}).on('dm-max', function () {
    $(this).find('.sub-menu').find('.father-menu-name').remove();
});

(function () {
    var $wrapper = $('.page-box');
    $('#hideLeftBar').click(function () {
        $('.nav-menu span').toggle();
        $('.user-name').toggle();

        $('.page-box').toggleClass('min-menu');
        $('.user-avator').toggleClass('pull-right');

        if ($('.page-box').hasClass('min-menu')) {
            $('.has-sub-menu').trigger('dm-min');
        } else {
            $('.has-sub-menu').trigger('dm-max');
        }
    });

    $('#hideLeftBar').click();
    var oDom = document.querySelector('#time');
    oDom.style.letterSpacing = '1px';
    var dbNum = function (num) {
        return num > 9 ? num : '0' + num;
    };
    var oD = new Date(),
        oH = oD.getHours(),
        oM = oD.getMinutes(),
        oS = oD.getSeconds();
    document.querySelector('#datetime .apm').innerText = oH > 12 ? 'PM' :'AM';
    function setTime(){
        oD = new Date(), oH = oD.getHours(), oM = oD.getMinutes(),oS = oD.getSeconds();
        oDom.innerText = dbNum(oH>12 ? oH-12 :oH) + ':' + dbNum(oM) + ':' + dbNum(oS);
    }
    // setTime();
    // setInterval(setTime, 1000);
})();