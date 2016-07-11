function setEqualHeight(columns) {
    var tallestcolumn = 0;
    columns.each(
    function() {
        currentHeight = $(this).height();
        if(currentHeight > tallestcolumn) {
            tallestcolumn  = currentHeight;
            }
        }
    );
 columns.height(tallestcolumn);
}
var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
    };
})();
$(window).resize(function() {
    delay(function(){
    	$(".box-item").find("ul").css('height','auto'); //solve for all you browser stretchers out there!
        setEqualHeight($('.mobile-content'));
        $('.mobile-description').css('height','auto'); //solve for all you browser stretchers out there!
        setEqualHeight($('.mobile-description'));
    }, 100);
});
$(function() {
	$('.content-image').matchHeight();
	var setMobileContent = 0;
	var setMobileDescription = 0;
	var getMobileContent = $(".box-item").find("ul").height();
	var getMobileDescription = $('.mobile-description').height();
    if(setMobileContent < getMobileContent){
    	setMobileContent = getMobileContent;
    }
    if(setMobileDescription < getMobileDescription){
    	setMobileDescription = getMobileDescription;
    }
    $(".box-item").find("ul").css("height", setMobileContent);
    $(".mobile-description").css("height", setMobileDescription);
});

//LIGHTBOX


$(function() {
  $("a").click(function(e) {
    history.pushState({}, '', $(this).attr("href"));
    return false;
  });
});
var btnApply = $(".box-item").find("a");
var checkTerms = $("#checkTerms");
var checkFaqs = $("#checkFaqs");

function openTerms(){
	$(".termsModal").show();
};

function checkFrequent(){
	$(".faqs").show();
}
//open terms
checkTerms.bind("click", openTerms);
//open FAQS
checkFaqs.bind("click", checkFrequent);
//close lightbox
var termsClose = $("#termsClose");
var formClose = $("#formClose");
var faqsClose = $("#faqsClose");
var sbmtForm = $("#sbmtForm")
var thanksClose = $("#thanksClose");
var closeBtn = $(".submit-form");

closeBtn.click(function(e){
	$(".faqs").hide();
	$(".termsModal").hide();
	$(".thank-you").hide();
});

thanksClose.click(function(e){
	$(".thank-you").hide();
});
termsClose.click(function(e){
	$(".termsModal").hide();
});
formClose.click(function(e){
	var directUrl = window.location.href.split('#')[0];
	$(".formModal").hide();
	// console.log(window.location.href.split('#')[0]);
	window.location.href = directUrl;
	//window.location.href = "";
	console.log("CLOSE TEST");
});
faqsClose.click(function(e){
	$(".faqs").hide();
});
var dataValue = "";
function openForm(event){
	$(".formModal").show();
	var target = event.target;
	var index = target.getAttribute("data-value");
	dataValue = index;
	// console.log(dataValue);
};
//open form
for(var x = 0; x < btnApply.length; x++){
	$(btnApply[x]).bind("click",openForm);
}
//validating form
// console.log(window.location.hash);
// if(window.location.href == "http://localhost:3000/#/apply499/") {
// 	console.log("TEST MODAL");
// }
$("#sbmtForm").click(function(event){
	// e.preventDefault();
	// $("#btnSbmt").click();
	//get the url before the submit
	var url = window.location.href;
	//to get the number in the data-value
	var dataNum = dataValue.match(/\d+$/)[0];
	history.pushState({}, '', ''+url+'/thankyou'+dataNum+'');
});
$(function(){
	$("#contactForm").validate({
		rules: {
			email_add: {
				required: true,
				email: true
			},
			contact_number: {
				required: true,
				number: true,
				minlength: 7
			},
			account_number: {
				required: true,
				number: true
			}
		}
	});
});