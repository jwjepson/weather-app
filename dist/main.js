(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(n){e(1,arguments);var r=Object.prototype.toString.call(n);return n instanceof Date||"object"===t(n)&&"[object Date]"===r?new Date(n.getTime()):"number"==typeof n||"[object Number]"===r?new Date(n):("string"!=typeof n&&"[object String]"!==r||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function r(t){e(1,arguments);var r=n(t),a=r.getDay();return a}Math.pow(10,8);var a=36e5;function o(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function i(t,n){var r;e(1,arguments);var a=o(null!==(r=null==n?void 0:n.additionalDigits)&&void 0!==r?r:2);if(2!==a&&1!==a&&0!==a)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var i,c=d(t);if(c.date){var u=f(c.date,a);i=p(u.restDateString,u.year)}if(!i||isNaN(i.getTime()))return new Date(NaN);var l,s=i.getTime(),m=0;if(c.time&&(m=g(c.time),isNaN(m)))return new Date(NaN);if(!c.timezone){var h=new Date(s+m),y=new Date(0);return y.setFullYear(h.getUTCFullYear(),h.getUTCMonth(),h.getUTCDate()),y.setHours(h.getUTCHours(),h.getUTCMinutes(),h.getUTCSeconds(),h.getUTCMilliseconds()),y}return l=w(c.timezone),isNaN(l)?new Date(NaN):new Date(s+m+l)}var c={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},u=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,l=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,s=/^([+-])(\d{2})(?::?(\d{2}))?$/;function d(e){var t,n={},r=e.split(c.dateTimeDelimiter);if(r.length>2)return n;if(/:/.test(r[0])?t=r[0]:(n.date=r[0],t=r[1],c.timeZoneDelimiter.test(n.date)&&(n.date=e.split(c.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var a=c.timezone.exec(t);a?(n.time=t.replace(a[1],""),n.timezone=a[1]):n.time=t}return n}function f(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),r=e.match(n);if(!r)return{year:NaN,restDateString:""};var a=r[1]?parseInt(r[1]):null,o=r[2]?parseInt(r[2]):null;return{year:null===o?a:100*o,restDateString:e.slice((r[1]||r[2]).length)}}function p(e,t){if(null===t)return new Date(NaN);var n=e.match(u);if(!n)return new Date(NaN);var r=!!n[4],a=m(n[1]),o=m(n[2])-1,i=m(n[3]),c=m(n[4]),l=m(n[5])-1;if(r)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,c,l)?function(e,t,n){var r=new Date(0);r.setUTCFullYear(e,0,4);var a=7*(t-1)+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+a),r}(t,c,l):new Date(NaN);var s=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(y[t]||(N(e)?29:28))}(t,o,i)&&function(e,t){return t>=1&&t<=(N(e)?366:365)}(t,a)?(s.setUTCFullYear(t,o,Math.max(a,i)),s):new Date(NaN)}function m(e){return e?parseInt(e):1}function g(e){var t=e.match(l);if(!t)return NaN;var n=h(t[1]),r=h(t[2]),o=h(t[3]);return function(e,t,n){return 24===e?0===t&&0===n:n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,r,o)?n*a+6e4*r+1e3*o:NaN}function h(e){return e&&parseFloat(e.replace(",","."))||0}function w(e){if("Z"===e)return 0;var t=e.match(s);if(!t)return 0;var n="+"===t[1]?-1:1,r=parseInt(t[2]),o=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,o)?n*(r*a+6e4*o):NaN}var y=[31,null,31,30,31,30,31,31,30,31,30,31];function N(e){return e%400==0||e%4==0&&e%100!=0}async function v(e){let t=await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${e}&appid=f73501bec87ccad60630d02e191c918e`);return await t.json()}navigator.geolocation.getCurrentPosition((async function(e){let t=e.coords.latitude,n=e.coords.longitude,r=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${n}&appid=f73501bec87ccad60630d02e191c918e`);U(await r.json());let a=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${n}&appid=f73501bec87ccad60630d02e191c918e`);q(await a.json())}),(e=>{console.log(e)}));const D=document.querySelector("#zipcode");document.querySelector("#search").addEventListener("click",(()=>{(async function(e){if(/^\d{5}(-\d{4})?$/.test(e)){let t=await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${e}&appid=f73501bec87ccad60630d02e191c918e`);return await t.json()}{let t=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=f73501bec87ccad60630d02e191c918e`);return await t.json()}})(D.value).then((e=>{U(e)})),v(D.value).then((e=>{q(e)}))}));const S=document.querySelector("#location"),b=document.querySelector("#temp"),C=document.querySelector("#conditions"),T=document.querySelector("#feelslike");function j(e){return Math.round(1.8*(e-273)+32)+"°"}function U(e){S.textContent=e.name,b.textContent=j(e.main.temp),C.textContent=function(e){e=(e=e.toLowerCase()).split(" ");for(let t=0;t<e.length;t++)e[t]=e[t].charAt(0).toUpperCase()+e[t].slice(1);return e.join(" ")}(e.weather[0].description),T.textContent="Feels like "+j(e.main.feels_like)}function $(e){return"Clear"==e?{src:"../src/clear.png",alt:"Clear weather icon"}:"Clouds"==e?{src:"../src/cloud.png",alt:"Cloudy weather icon"}:"Rain"==e?{src:"../src/rainy.png",alt:"Rainy weather icon"}:"Thunderstorm"==e?{src:"../src/storm.png",alt:"Stormy weather icon"}:"Snow"==e?{src:"../src/snow.png",alt:"Snowy weather icon"}:void 0}function q(e){const t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],n=document.querySelectorAll(".day"),a=document.querySelectorAll(".forcast-temp"),o=document.querySelectorAll(".weather-icon");console.log(e);for(let c=0,u=6;c<n.length;c++)n[c].textContent=t[r(i(e.list[u].dt_txt))],a[c].textContent=j(e.list[u].main.temp),o[c].src=$(e.list[u].weather[0].main).src,o[c].alt=$(e.list[u].weather[0].main).alt,u+=8}v().then((e=>{q(e)}))})();