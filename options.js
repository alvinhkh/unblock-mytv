var storage = chrome.storage.local;
var messages = chrome.i18n.getMessage;

/**
 * Show a saved message and disappear after 10 seconds
 */
var messageTimer;
function showMessage(message) {
	message = message ? message : "";
	document.getElementById('reminder').style.display = "none";
	document.getElementById('response_message').innerText = message;
	document.getElementById('response_message').style.display = "block";
	
	clearTimeout(messageTimer);
	messageTimer = setTimeout(function (){
		document.getElementById('reminder').style.display = "block";
		document.getElementById('response_message').style.display = "none";
		document.getElementById('response_message').innerText = "";
	}, 5000);
}

/**
 * Function to check is a vaild ipv4 address
 */
function isVaildIPAddress (ip_address) {
	if (ip_address && ip_address.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
		return true;
	}
	return false;
}

/**
 * Function to Get Synced Options
 */
function getSyncedOptions() {
	storage.get(null, function(value){ 
		if (value['custom_ip_address'] && isVaildIPAddress(value['custom_ip_address']) != true) {
			storage.clear();
			storage.set({
				"custom_ip_address": null
			});
			return;
		}
		document.getElementById('custom_ip_address').value = value['custom_ip_address'] ? value['custom_ip_address'] : "";
	});
}

/**
 * Function to Check and Save Options
 */
function saveOptions(){
	var id = 'custom_ip_address',
		newValue = document.getElementById(id).value.toString();
	if (isVaildIPAddress(newValue) != true && newValue != "") {
		showMessage(messages('message_invaild_ip'));
	} else {
		storage.clear();
		storage.set({
			"custom_ip_address": newValue
		});
	}
}

/**
 * Get Options via Chrome Storage API
 */
chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		var storageChange = changes[key];
		if (key == 'custom_ip_address' && document.getElementById('custom_ip_address') && storageChange.newValue != undefined) {
			showMessage(storageChange.newValue == "" ? messages('message_saved_empty_ip') : messages('message_saved_ip'));
			document.getElementById(key).setAttribute('placeholder', storageChange.newValue == "" ? messages('disabled') : "");
			document.getElementById(key).value = storageChange.newValue;
		}
	}
});

document.addEventListener ('DOMContentLoaded', function() {
	/**
	 * Display translated texts
	 */
	document.title = messages('extension_name');
	document.getElementById('title').innerText = messages('title');
	document.getElementById('custom_ip_address').setAttribute('placeholder', messages('disabled'));
	document.getElementById('response_message').style.display = "none";
	document.getElementById('reminder').innerText = messages('message_empty_ip');
	document.getElementById('button_save').innerText = messages('button_save');
	document.getElementById('button_clear').innerText = messages('button_clear');
	/**
	 * Get and display synced options value
	 */
	getSyncedOptions();
	/**
	 * Event that trigger to save options
	 */
	document.getElementById('custom_ip_address').addEventListener('change', saveOptions, false);
	document.getElementById('button_save').addEventListener('click', saveOptions, false);
	/**
	 * Event that trigger to clear input value
	 */
	document.getElementById('button_clear').addEventListener('click', function() {
		document.getElementById('custom_ip_address').value = "";
		saveOptions();
	}, false);
}, false);