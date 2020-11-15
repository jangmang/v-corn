$(function(){   
    commonInit();    
});

function commonInit(){
    //util.redirectUrl(); //PC 리다이렉트   


    //헤드고정 스크롤높이
    if($(".tab_menu").length > 0) {
        var headFixTop = $(".tab_menu").offset().top; // 탭메뉴 스크롤높이
    } else {
        var headFixTop = 10;
    } 
    
    // 윈도우스크롤
    $(window).on("scroll", function(){
        headFix();
    });
    
    // 전체동의
    $(".agreement_area .total_chk input").on("click", function(){
        if($(this).is(":checked")) $(".agreement_box input").prop("checked", true);
        else $(".agreement_box input").prop("checked", false);        
    });
    $(".agreement_box input").each(function(){
        $(this).on("click", function(){ 
            if($(".agreement_box input").length > $(".agreement_box input:checked").length) {
                $(".agreement_area .total_chk input").prop("checked", false);
            }else {
                $(".agreement_area .total_chk input").prop("checked", true);
            } 
        });
    });
    
    // INPUT 텍스트 삭제버튼
    $(".btn_del").on("click", function(){
        $(this).parent().find("input").val("");
    });

    // 전체동의
    $(".agreement_box .total_chk input").on("click", function(){
        if($(this).is(":checked")) $(".agree_list input").prop("checked", true);
        else $(".agree_list input").prop("checked", false);        
    });
    $(".agree_list input").each(function(){
        $(this).on("click", function(){ 
            if($(".agree_list input").length > $(".agree_list input:checked").length) {
                $(".agreement_box .total_chk input").prop("checked", false);
            }else {
                $(".agreement_box .total_chk input").prop("checked", true);
            } 
        });
    });

    // board_list 열고닫기
    $(".board_list li a").on("click", function(){
        if($(this).parent().hasClass("on")){    
            $(this).parent().removeClass("on");
        } else {
            $(".board_list li").removeClass("on");
            $(this).parent().addClass("on");
        }
    });
   
    // 상단헤드고정    
    function headFix(){        
        if($("header").is(":hidden") || $(".tab_menu").length == 0) return false;
        if($(window).scrollTop() > headFixTop) $("#wrap").addClass("head_fix");            
        else $("#wrap").removeClass("head_fix");
    }

   

}





// 레이어 팝업
var dimLayer = "<div id='dimLayer'></div>";

function togglePopup(id) {
    // 팝업 열고 닫기	togglePopup(#id)
    // 팝업 창 전환	togglePopup(#current_id, #open_id)
    if (arguments.length < 2) {
        if ($(id).is(":visible")) {
            
            $(id).fadeOut("fast").removeClass("on");
            $("#dimLayer").fadeOut("fast", function () {
                $("#dimLayer").remove();
            });
            if(id == "#full_popup"){//풀팝업 닫기
                var currentTop = $("body").css('top');
                $("body").removeClass("overflow");
                $(window).scrollTop(-1 * currentTop.split("px")[0]);
                try{
                    $("input[name='org_file_name']").val('');//데이터 초기화
                    $("input[name='uploadfile']").val('');//데이터 초기화
                    $("textarea.edit_box").val('');//데이터 초기화
                }catch(e){

                }
            }            
        } else {            
            $("body").append(dimLayer);            
            $(id).fadeIn("fast").addClass("on");
            if(id == "#full_popup"){//풀팝업 열기
                var currentTop = $(window).scrollTop();
                $("body").addClass("overflow").css('top',-1 * currentTop);
            } else {
                popSetPos(id);
            }
        }
    } else {
        var pop1 = arguments[0];
        var pop2 = arguments[1];

        if ($(pop1).is(":visible")) {
            $(pop1).fadeOut("fast").removeClass("on");
            popSetPos(pop2); 
            $(pop2).fadeIn("fast").addClass("on");
        }
    }
}

function popSetPos(id) {
    var scroll_top = -$(id).height()/2;
    $(id).css({ 'margin-top': scroll_top }); //Fixed 수평정렬
}