function waitForLoading() {
    var loaderExist = setInterval(function() {
        if ($('#loading').css("display") == "block") {
            var loaderNotExist = setInterval(function() {
                if ($('#loading').css("display") == "none") {
                    clearInterval(loaderNotExist);
                    switchTask();
                }
            }, 100);
            clearInterval(loaderExist);
        }
    }, 100);
}
function switchTask() {
    var listExist = setInterval(function() {
        if ($('#list').html() !== "") {
            //nedokončení na první místo
            $('.col2:not(.last) .pad:nth-child(2)').each(function () {
                $(this).insertBefore($(this).prev('.col2:not(.last) .pad:first-child'));
            });
            $('.pad').each(function () {
                var h2 = $(this).find("h2");
                var tasks = $(this).find(".task").length;
                //počet tasků
                h2.append(" (" + tasks + ")");
                //možnost schování tasků
                if(tasks > 0) {
                    h2.append('&nbsp;&nbsp;<a href="#" class="showToggle" style="text-decoration: none;">&#9776;</a>');
                }
            });
            $('.showToggle').click(function (e) {
                e.preventDefault();
                $(this).closest("h2").next().slideToggle();
            });
            //defaultně schované tasky
            $('.col2:not(.last) .pad:nth-child(2) .block').hide();
            $('.col2:not(.last) .pad:nth-child(3) .block').hide();
            $('.col2.last .pad:last-child .block').hide();
            //předvyplnění výkazu
            if($('[name="param[report_activity_gid]"]').length) {
                if($('[name="param[report_activity_gid]"]').val() == "") {
                    $('[name="param[report_activity_gid]"]').val(2);
                }
                if($('[name="param[report_delay_min]"]').val() == "") {
                    $('[name="param[report_delay_min]"]').val(30);
                }
                if($('[name="param[report_description]"]').val() == "") {
                    $('[name="param[report_description]"]').val($('[name="param[name]"]').val());
                }
            }
            //problémy s datumem u nového tasku
            if($('[name="param[real_finished]"]').val() == "") {
                
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth()+1;
                var r = date.getYear()+1900;
                $('[name="param[real_finished]"]').val(d + "." + m + "." + r);
            }
            clearInterval(listExist);
            waitForLoading();
        }
    }, 100);
}
switchTask();
//rozšíření menu
$('#menuTask').next().find('li:nth-child(1)').after('<li><a href="https://app.taskpark.com/bm/task/week/?cond[resolver_id]=283">Můj týdenní přehled</a></li>');
$('#menuTask').next().find('li:nth-child(2)').after('<li><a href="https://app.taskpark.com/bm/task/month/?cond[resolver_id]=283">Můj měsíční přehled</a></li>');
var idInput = $('input[name="param[oid]"]');
var crumbsMenu = $("#crumbs");
if(idInput.length == 1 && idInput.val()) {
    crumbsMenu.append(" (" + idInput.val() + ")");
    crumbsMenu.append('&nbsp;&nbsp;<a href="#" id="copy-url" style="text-decoration: none;">&#x2398;</a>');
    crumbsMenu.append('<input type="text" id="input-url" style="opacity: 0; height: 0px;">');
    $("#input-url").val(window.location.href);
    $("#copy-url").click(function (e) {
        e.preventDefault();
        $("#input-url").select();
        document.execCommand('copy');
        $("#copy-url").animate({opacity: 0.5}, 200, function () {
            $("#copy-url").animate({opacity: 1}, 200);
        });
    });
}
//CSS
$('<style>').text(".userfilter-item{ width: auto; padding: 0 5px; margin: 0 7px; }").appendTo(document.head)
//Celá jména ve filtru
$('.userfilter-item').each(function(){ $(this).html($(this).attr("title")); })
