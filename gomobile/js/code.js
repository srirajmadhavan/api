var $ = jQuery.noConflict();
$(function () {
    $('.form').find('input, select, textarea').on('touchstart mousedown click', function (e) {
        e.stopPropagation();
    })
})

//Scroll Containers
$('.swiper-nested').each(function () {
    var swipernested = $(this).swiper({
        mode: 'vertical',
        scrollContainer: true,
        mousewheelControl: true,
        scrollbar: {
            container: $(this).find('.swiper-scrollbar')[0]
        }
    })
    $(".scrolltop").click(function () {
        swipernested.swipeTo(0);
    })
    $(".trigger").click(function () {
        function fixheighttrigger() {
            swipernested.reInit();
            setTimeout(fixheighttrigger, 1000);
        }
        setTimeout(fixheighttrigger, 1000);
    });
    $(".trigger_blog").click(function () {
        function fixheighttoogle() {
            swipernested.reInit();
            setTimeout(fixheighttoogle, 1000);
        }
        setTimeout(fixheighttoogle, 1000);
    });
    $(".tabsmenu li").click(function () {
        function fixheight() {
            swipernested.reInit();
            setTimeout(fixheight, 1000);
        }
        setTimeout(fixheight, 1000);
    });
    $("#loadMore").click(function () {
        function fixheightposts() {
            swipernested.reInit();
            setTimeout(fixheightposts, 1000);
        }
        setTimeout(fixheightposts, 1000);
    });

    $(".post_details_page li").hide();
    $(".posts li").click(function () {

        p_ID = this.id;

        $(".post_details_page").find("li").each(function () {
            if (this.id == p_ID) {
                $(".posts_archive_page").hide();
                var detailspostid = $(".post_details_page li#" + this.id);
                detailspostid.show();
                swipernested.reInit();
                swipernested.swipeTo(0);
                $('.backtoblog').click(function () {
                    detailspostid.hide();
                    $(".posts_archive_page").show();
                    swipernested.reInit();
                });
            }
        });

    });

})

$('.gohome').click(function () {
    swiperParent.swipeTo(0);
});

$(function () {
    $('#tabsmenu').tabify();
    $(".toggle_container").hide();
    $(".toggle_container_blog").hide();
    $(".trigger").click(function () {
        $(this).toggleClass("active").next().slideToggle("slow");
        return false;
    });
    $(".trigger_blog").click(function () {
        $(this).toggleClass("activeb").next().slideToggle("slow");
        return false;
    });
    $(".post_more").click(function () {
        $(this).toggleClass("activep").next().slideToggle("slow");
        return false;
    });
});