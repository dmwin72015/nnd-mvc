require('../less/dashboard.less');
define('dashboard', ['../lib/jQuery-3.1.1.min.js'], function($) {
    $(function() {
        //通用功能
        $('.menu-section').on('click', '.has-sub dt', function() {
            var $this = $(this);
            var $direct = $this.find('span.fa');
            // $this.toggleClass('active');
            var $sub = $this.nextAll();
            $this.parent().toggleClass('show-sub');
            if ($this.parent().hasClass('show-sub')) {
                $direct.removeClass('fa-caret-down').addClass('fa-caret-up');
            } else {
                $direct.removeClass('fa-caret-up').addClass('fa-caret-down');
            }
        });

        $('#j-hidebar').click(function() {
            $('body').toggleClass('hide-left');
        });
        $('#j-fullscreen').click(function() {
            $('body').toggleClass('full-screen');
        });

        $('.box').on('click', '.box-head .toggle-size', function() {
            var $box = $(this).closest('.box');
            $box.toggleClass('close');
            if ($box.hasClass('close')) {
                $(this).find('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            } else {
                $(this).find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            }
            return false;
        });
    });
    //投票
    $(function() {
        var $submitVote = $('#submitVoteBtn');
        var $cancleVote = $('#cancleVoteBtn');
        $submitVote.click(function() {
            var $form = $('#voteForm').serialize();
            $('#voteForm').submit();
            // $.ajax({
            //     url: '/note/add_new/',
            //     type: 'post',
            //     data: $form,
            //     success: function(data) {
            //         if(data && data.status == '0'){
            //             alert('OK');
            //         }
            //     },
            //     error: function() {
            //
            //     }
            // })
        });
    })
});
