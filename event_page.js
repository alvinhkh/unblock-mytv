/**
 * Range of IPv4 Addresses that Accessible
 * [FROM, TO]
 */
var ip_address_range = [
	["1.36.0.0", "1.36.255.255"],
	["1.64.0.0", "1.65.255.255"],
	["14.198.0.0", "14.198.127.255"],
	["59.148.0.0", "59.149.255.255"],
	["121.202.0.0", "121.202.0.255"],
	["121.203.0.0", "121.203.255.255"],
	["180.219.0.0", "180.219.255.255"],
	["183.178.0.0", "183.179.255.255"],
	["218.102.0.0", "218.103.255.255"],
	["218.188.0.0", "218.189.255.255"],
	["221.124.0.0", "221.127.255.255"],	
];

/**
 * Returns a random integer between min and max
 */
function random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Convert IPv4 Address to number
 */
function dot_to_number(dot) {
	var d = dot.split('.');
	return ( ( ( ( ( ( +d[0] ) * 256 ) + ( + d[1] ) ) * 256 ) + ( + d[2] ) ) * 256 ) + ( + d[3] );
}

/**
 * Convert number to IPv4 Address
 */
function number_to_dot(number) {
	var dot = number % 256;
	for (var i = 3; i > 0; i--) { 
		number = Math.floor( number / 256 );
		dot = number % 256 + '.' + dot;
	}
	return dot;
}

/**
 * Random select a range from ip_address_range
 */
var random_selected_range = ip_address_range[random_number(0, ip_address_range.length-1)];

/**
 * Random select an ip address in selected range
 */
var random_ip_address = number_to_dot(
	random_number(
		dot_to_number(
			random_selected_range[0]
		), 
		dot_to_number(
			random_selected_range[1]
		)
	)
);

/**
 * Add Rules to SetRequestHeader for X-Forwarded-For by using
 * chrome.declarativeWebRequest API
 */
var RequestMatcher = chrome.declarativeWebRequest.RequestMatcher;
var SetRequestHeader = chrome.declarativeWebRequest.SetRequestHeader;
var onRequest = chrome.declarativeWebRequest.onRequest;

function registerRules() {
	var ip_address = localStorage['custom_ip_address'] && localStorage['custom_ip_address'] != "" ? localStorage['custom_ip_address'] : random_ip_address;
	
	var redirectRule = {
		priority: 100,
		conditions: [
			new RequestMatcher({
				url: {
					hostSuffix: '.tvb.com'
				},
			}),
		],
		actions: [
			new SetRequestHeader({
				name: 'X-Forwarded-For', 
				value: ip_address
			}),
		]
	};
	
	/**
	 * Callback function after addRules
	 */
	var callback = function() {
		if (chrome.extension.lastError) {
			console.error('Error when adding rules:', chrome.extension.lastError.message);
		} else {
			console.info('Rules successfully added.');
			onRequest.getRules(null, function(rules) {
				console.info('Rules that added:', JSON.stringify(rules, null, 2));
			});
		}
	};

	/**
	 * Add Rules
	 */
	onRequest.addRules([
		redirectRule
	], callback);
}

function setup() {
	/**
	 * Remove previously added rules before adding new ones
	 */
	onRequest.removeRules(null, function() {
		if (chrome.extension.lastError) {
			console.error('Error when clearing rules:', chrome.extension.lastError.message);
		} else {
			registerRules();
		}
	});
}

/**
 * Get synced options and save them in localStorage
 */
chrome.storage.local.get(null, function(value){ 
	localStorage['custom_ip_address'] = value['custom_ip_address'] ? value['custom_ip_address'] : "0.0.0.0";
});

/**
 * Run when the extension installed / updated
 */
chrome.runtime.onInstalled.addListener(setup);

/**
 * Get Rules when inspect event_page in console
 */
onRequest.getRules(null, function(rules) {
	console.info('Rules that added:', JSON.stringify(rules, null, 2));
});

/**
 * Get new sync options via Chrome Storage API
 */
chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		var storageChange = changes[key];
		if (key == 'custom_ip_address') {
			localStorage['custom_ip_address'] = storageChange.newValue;
			setup();
		}
	}
});