

var readyToRun = function() {
	console.log("ready");
}

var botTurn = 1;
var personality1 = 0;
var personality2 = 0;
var convoState = "";

$("#talk").click(function(e) {
	e.preventDefault();
	var value = $("#topic").val();
	if (value == undefined)
	{
		value = $("#chatbox").text();
	}
	var myurl= "http://www.cleverbot.com/getreply?key=MYKEY"
		+ "&input=" + $("#chatbox").val
		+ "&cs=" + convoState
		+ "&cb_settings_tweak1" + getPersonality(botTurn, 1)
		+ "&cb_settings_tweak2" + getPersonality(botTurn, 2)
		+ "&cb_settings_tweak3" + getPersonality(botTurn, 3);
	$.ajax({
	    url : myurl,
	    dataType : "json",
	    success : setChat
	});
});

$("#new").click(function(e) {
	e.preventDefault();
	botTurn = 1;
	convoState = "";
	$("#chatbox").text("");
});

var setChat = function(json){
	console.log(json);
	convoState = json.cs;
	$("#chatbox").text(json.output);
	if (botTurn == 1) botTurn = 2;
	else botTurn = 1;
	$("#topic").val = undefined;
}

var personalityValues = [[30, 50, 70], [70, 50, 70], [30, 80, 70], [30, 20, 70]]

var getPersonality = function(botNum, pSetting){
	if (botNum == 1)
	{
		return personalityValues[personality1][pSetting];
	}
	if (botNum == 2)
	{
		return personalityValues[personality2][pSetting];
	}
}

function drop() {
    $("#myDropdown").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

$(document).ready(readyToRun);

