

var readyToRun = function() {
	console.log("ready");
}

var botTurn = 1;
var personality1 = 0;
var personality2 = 0;
var convoState = "";
var convoList = [];

$("#talk").click(function(e) {
	e.preventDefault();
	var value = '<span style="color: '
	+ (botTurn == 1 ? "blue" : "red") + ';">'
	+ $("#topic").val()
	+ '</span>';
	if ($("#topic").val().length > 0)
	{
		$("#chatbox").html(value);
		$("#topic").val("");
		convoState = "";
		convoList = [];
		convoList.push(value);
		if (botTurn == 1) botTurn = 2;
		else botTurn = 1;
		return;
	}
	var myurl= "http://www.cleverbot.com/getreply?key=KEY"
		+ "&input=" + $("#chatbox").text()
		+ "&cs=" + convoState
		+ "&cb_settings_tweak1" + getPersonality(botTurn, 0)
		+ "&cb_settings_tweak2" + getPersonality(botTurn, 1)
		+ "&cb_settings_tweak3" + getPersonality(botTurn, 2);
	$.ajax({
	    url : myurl,
	    dataType : "json",
	    success : addChat
	});
});

var addChat = function(json){
	console.log(json);
	if (convoList.push(
	'<span style="color: '
	+ (botTurn == 1 ? "blue" : "red") + ';">'
	+ json.output + '</span>'
	) > 9)
	{
		convoList.shift();
	}
	console.log(json.output);
	var chat = "";
	for (i = 0; i < convoList.length; i++)
	{
		chat += convoList[i] + "</br>";
	}
	$("#chatbox").html(chat);
	convoState = json.cs;
	if (botTurn == 1) botTurn = 2;
	else botTurn = 1;
}

var personalityValues = [[20, 50, 80], [90, 50, 80], [20, 90, 80], [20, 10, 80]]

var getPersonality = function(botNum, pSetting){
	if (botNum == 2)
	{
		console.log(personalityValues[parseInt($("#pbot1").prop('selectedIndex'))][pSetting]);
		return personalityValues[parseInt($("#pbot1").prop('selectedIndex'))][pSetting];
	}
	if (botNum == 1)
	{
		console.log(personalityValues[parseInt($("#pbot2").prop('selectedIndex'))][pSetting]);
		return personalityValues[parseInt($("#pbot2").prop('selectedIndex'))][pSetting];
	}
	return personalityValues[parseInt($("#pbot1").prop('selectedIndex'))][pSetting];
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

