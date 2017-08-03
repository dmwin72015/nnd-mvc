define('spider', ['../lib/jQuery-3.1.1.min.js'], function($) {
    $('#get_art').on('click' , function(ev){
        $.ajax({
            url:'',
            type:'post',
            data:{},
            success:function(data){

            }
        })
    });




    function showAllImg(data){
        var imgWrap = $('.art-content');

    }
});
