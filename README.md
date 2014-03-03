# Unblock myTV

A chrome extension that bypass oversea restriction of myTV player in tvb.com


## Install
Install from [Chrome Web Store](http://bit.ly/unblockmytv)
To switch channel from stable Chrome visit [here](http://www.chromium.org/getting-involved/dev-channel)

## Technical details

- Uses [X-Forwarded-For](http://en.wikipedia.org/wiki/X-Forwarded-For) to pretend request connection from accessible places (like from Hong Kong).
- Uses [declarativeWebRequest](https://developer.chrome.com/extensions/declarativeWebRequest.html) API (in beta and dev channel, as of March 2014).
 - Unlike [chrome.webRequest](https://developer.chrome.com/extensions/webRequest.html), [declarativeWebRequest](https://developer.chrome.com/extensions/declarativeWebRequest.html) + [event page](http://developer.chrome.com/extensions/event_pages.html) makes the extension loaded only when they are needed, which means no background pages and would not hold memory resourses.
- Uses [chrome.storage](http://developer.chrome.com/extensions/storage.html) API to handle custom IP address.

## License

	Copyright (c) 2014, AlvinHKH
	http://alvinhkh.com
	All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, 
	are permitted provided that the following conditions are met:

	1. Redistributions of source code must retain the above copyright notice, 
	this list of conditions and the following disclaimer.
	
	2. Redistributions in binary form must reproduce the above copyright notice, 
	this list of conditions and the following disclaimer in the documentation and/or 
	other materials provided with the distribution.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR 
	IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND 
	FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR 
	CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
	DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
	DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
	IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
	OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.