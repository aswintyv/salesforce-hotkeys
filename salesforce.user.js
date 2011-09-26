// ==UserScript==
// @name		   salesforce-keys
// @namespace	   https://*.salesforce.com
// @description	   keyboard shortcuts for Salesforce
// @include		   https://*.salesforce.com/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);

	}, false);
	document.body.appendChild(script);
}

// load jQuery and execute the main function

addJQuery(salesforceKeys);

function salesforceKeys() {
	var $j = jQuery.noConflict();
	$j(document).ready(function(){
		var commandMode = false;
		$j('.msgContent').append('<div id = "salesforcehotkeysheader" style="color:white;background-color:#222;height:22px; width:300px;display:inline; padding-top:4px; padding-bottom:4px;">|| Salesforce shortcut keys enabled ! </div>');
		var messagediv = $j(document.createElement('div'));
		var helptext = 'This plugin is adds shortcut keys for the Salesforce Setup pages. <br /> ';
		helptext += '<br /> From any setup page, select press " f " to select the "Quick Find" menu , type the what you are looking for to filter the menu. Use the arrow keys to navigate through the selections and "enter" key to select and go to that page. ';
		messagediv.html(helptext);
		messagediv.css({"z-index": "100", "background-color": '#35B4E9', 'width':$j('#salesforcehotkeysheader').width()+'px', 'position':'absolute', 'left':$j('#salesforcehotkeysheader').offset().left + 'px', 'white-space': 'normal', 'padding-left': '4px', 'padding-right':'4px', 'text-align':'left','font-weight':'normal' });
		messagediv.hide();
		messagediv.attr('id', 'salesforcehotkeyshelp')
		$j('#salesforcehotkeysheader').append(messagediv);
		
		$j('#salesforcehotkeysheader').mouseover(function(){
		$j('#salesforcehotkeyshelp').slideToggle('fast');
		});
		// do this only in the setup pages... 				
		if($j('#setupSearch').size() ==1){
		var nth = 0;
			$j(document).keydown(function(e){
				var isInCommand = false;	
				var code = e.which;
				console.log("command key " + code); 
				if(($j("input:focus").size() > 0 || $j("select:focus").size() > 0 || $j("texture:focus").size() > 0) && !isInCommand){//don't act while in text boxes and whatnot
					if($j('#setupSearch:focus').size() ==1){
						if(code == 40 && $j('#setupSearch').val().length > 0 && nth < $j('.filterselected').size()){
							console.log('arrow key logged');
							nth++;
						}
						else if(code == 38 && $j('#setupSearch').val().length > 0 && nth >= 0){
							console.log('arrow key logged');
							nth--;
						}
						else if(code == 13 && $j('#setupSearch').val().length > 0 && nth >= 0){
							console.log('enter key logged');
							window.location = $j('.filterselected:eq('+nth+')').attr('href');
						}
						else{
							nth = 0;
						}
						$j('.filterselected').css('background-color','').removeClass('filterselected');
						$j('a.se_highlight').addClass("filterselected");
						$j('div.se_highlight a:nth-child(2)').addClass("filterselected");
					//	$j('.filterselected').css('background-color','#ff0');
						$j('.filterselected:eq('+nth+')').css('background-color','#35B4E9');

						return;
					}
					
					console.log("command key blocked by focus on:" + $j("*:focus").attr("id"));
					return;
				}
				console.log("command key " + e.which); 
				if(code == 70){	 //j
					$j('#setupSearch').focus();		
					return false;
				}	
				
			});
			$j('#setupSearch').blur(function(){
				$j('.filterselected').css('background-color','').removeClass('filterselected');	
			});
		}
	});
}

