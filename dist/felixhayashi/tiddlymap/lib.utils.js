/*\

title: $:/plugins/felixhayashi/tiddlymap/js/utils
type: application/javascript
module-type: library

ATTENTION: THIS CLASS MUST NOT REQUIRE ANY OTHER TIDDLYMAP FILE
IN ORDER TO AVOID ACYCLIC DEPENDENCIES!

@module TiddlyMap
@preserve

\*/
(function(){"use strict";var e=require("$:/plugins/felixhayashi/vis/vis.js");var t=require("$:/plugins/felixhayashi/tiddlymap/js/exception").Exception;var r={};r.deleteTiddlers=function(e){var t=Object.keys(e);var i=$tw.wiki.getTiddlerList("$:/StoryList");for(var n=t.length;n--;){var l=r.getTiddlerRef(e[t[n]]);if(!$tw.wiki.tiddlerExists(e[t[n]])){continue}var a=i.indexOf(l);if(a!==-1){i.splice(a,1);r.setField("$:/StoryList","list",i)}$tw.wiki.deleteTiddler(l)}};r.moveFieldValues=function(e,t,i,n,l){if(e===t)return;var a=l||$tw.wiki.allTitles();for(var f=a.length;f--;){var u=r.getTiddler(a[f]);if(u.isDraft()||!u.fields[e]||!n&&$tw.wiki.isSystemTiddler(a[f])){continue}var s={};s[t]=u.fields[e];if(i){s[e]=undefined}$tw.wiki.addTiddler(new $tw.Tiddler(u,s))}};r.getLabel=function(e,t){var i=r.getTiddler(e);return i&&i.fields[t]?i.fields[t]:i.fields.title};r.ucFirst=function(e){return e&&e[0].toUpperCase()+e.slice(1)};r.convert=function(t,i){if(typeof t!=="object")return;switch(i){case"array":return r.getValues(t);case"hashmap":case"object":if(t instanceof e.DataSet){return t.get({returnType:"Object"})}else{return t}case"dataset":default:if(t instanceof e.DataSet){return t}if(!Array.isArray(t)){t=r.getValues(t)}return new e.DataSet(t)}};r.inject=function(t,i){if(i instanceof e.DataSet){i.update(r.convert(t,"array"))}else if(Array.isArray(i)){t=r.convert(t,"object");for(var n in t){if(!r.inArray(t[n],i)){i.push(t[n])}}}else{$tw.utils.extend(i,r.convert(t,"object"))}return i};r.getValues=function(t){if(Array.isArray(t)){return t}if(t instanceof e.DataSet){return t.get({returnType:"Array"})}var r=[];var i=Object.keys(t);for(var n=i.length;n--;){r.push(t[i[n]])}return r};r.hasOwnProp=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};r.getDataMap=function(){var e=Object.create(null);Object.defineProperty(e,"hasOwnProperty",{enumerable:false,configurable:false,writable:false,value:Object.prototype.hasOwnProperty.bind(e)});return e};r.getMatches=function(e,t,i){var n=undefined;if(t!=null&&typeof t==="object"){var l=Object.keys(t);n=function(e){for(var i=l.length;i--;){var n=r.getTiddler(t[l[i]]);if(n){e(n,n.fields.title)}}}}if(typeof e==="string"){e=$tw.wiki.compileFilter(e)}var a=e.call($tw.wiki,n);if(i){var f=r.getDataMap();for(var u=a.length;u--;){f[a[u]]=$tw.wiki.getTiddler(a[u])}return f}else{return a}};r.isMatch=function(e,t){var i=r.getTiddlerRef(e);return r.getMatches(t,[i]).length>0};r.isInteger=Number.isInteger||function(e){return typeof e==="number"&&isFinite(e)&&Math.floor(e)===e};r.escapeRegex=function(e){return e.replace(/[-$^?.+*[\]\\(){}|]/g,"\\$&")};r.isTrue=function(e,t){if(e==null){return!!t}else if(typeof e==="string"){var r=parseInt(e);return isNaN(r)?e==="true":r!==0}else if(typeof e==="boolean"){return e}else if(typeof e==="number"){return r!==0}return false};r.getTiddlerRef=function(e){if(e instanceof $tw.Tiddler){return e.fields.title}else if(typeof e==="string"){return e}};r.getTiddler=function(e,t){if(e instanceof $tw.Tiddler){if(!t){return e}e=e.fields.title}return $tw.wiki.getTiddler(e)};r.getBasename=function(e){return e.substring(e.lastIndexOf("/")+1)};r.notify=function(e){var t="$:/temp/tiddlymap/notify";$tw.wiki.addTiddler(new $tw.Tiddler({title:t,text:e}));$tw.notifier.display(t)};r.tiddlerExists=function(e){var t=r.getTiddlerRef(e);return t&&($tw.wiki.tiddlerExists(t)||$tw.wiki.isShadowTiddler(t))};r.addListeners=function(e,t,r){for(var i in e){t.addEventListener(i,e[i].bind(r))}};r.isPreviewed=function(e){if(e){if(e.getVariable("tv-tiddler-preview")){return true}else{var t="tc-tiddler-preview-preview";return!!r.getAncestorWithClass(e.parentDomNode,t)}}return false};r.getAncestorWithClass=function(e,t){if(typeof e!=="object"||typeof t!=="string")return;while(e.parentNode){e=e.parentNode;if($tw.utils.hasClass(e,t)){return e}}};r.getPropertiesByPrefix=function(e,t,i){var n=r.getDataMap();for(var l in e){if(r.startsWith(l,t)){n[i?l.substr(t.length):l]=e[l]}}return n};r.getWithoutPrefix=function(e,t){return r.startsWith(e,t)?e.substr(t.length):e};r.hasPropWithPrefix=function(e,t){for(var i in e){if(r.startsWith(i,t)){return true}}return false};r.startsWith=function(e,t){return e.substring(0,t.length)===t};r.hasElements=function(e){return Object.keys(e).length>0};r.groupByProperty=function(e,t){e=r.getIterableCollection(e);var i=r.getDataMap();var n=Object.keys(e);for(var l in n){var a=e[n[l]];var f=a[t];if(f==null){throw"Cannot group by property "+t}else{if(!Array.isArray(i[f])){i[f]=[]}i[f].push(a)}}return i};r.findAndRemoveClassNames=function(e){for(var t=e.length;t--;){var r=document.getElementsByClassName(e[t]);for(var i=r.length;i--;){$tw.utils.removeClass(r[i],e[t])}}};r.parseFieldData=function(e,t,i){var n=r.getTiddler(e);if(!n)return i;if(!t)t="text";return r.parseJSON(n.fields[t],i)};r.parseJSON=function(e,t){try{return JSON.parse(e)}catch(r){return t}};r.writeFieldData=function(e,t,i){if(typeof i==="object"){r.setField(e,t,JSON.stringify(i))}};r.getPrettyFilter=function(e){e=e.trim().replace("][","] [");var t=/[\+\-]?\[.+?[\]\}\>]\]/g;var r=e.match(t);e=e.replace(t," [] ").trim();var i=e.split(/\s+/);var n=0;var l=[];for(var a=0;a<i.length;a++){l[a]=i[a]==="[]"?r[n++]:i[a]}return l.join("\n")};r.setField=function(e,t,i){if(e&&t){var n={title:r.getTiddlerRef(e)};n[t]=i;var l=r.getTiddler(e,true);$tw.wiki.addTiddler(new $tw.Tiddler(l,n))}};r.setEntry=function(e,t,i){$tw.wiki.setText(r.getTiddlerRef(e),null,t,i)};r.getEntry=function(e,t,i){var n=$tw.wiki.getTiddlerData(r.getTiddlerRef(e),{});return n[t]==null?i:n[t]};r.isLeftVersionGreater=function(e,t){return e!==t&&$tw.utils.checkVersions(e,t)};r.getField=function(e,t,i){i=i||"";var n=r.getTiddler(e);return!n?i:n.fields[t]||i};r.getText=function(e,t){return r.getField(e,"text",t)};r.setText=function(e,t){r.setField(e,"text",t)};r.getFirstElementByClassName=function(e,t,i){var n=(t||document).getElementsByClassName(e)[0];if(!n&&i!==false){var l="Missing element with class "+e+" inside "+t;throw new r.Exception.EnvironmentError(l)}return n};r.isDraft=function(e){var t=r.getTiddler(e);return t&&t.isDraft()};r.merge=function(e){var t=function(e,r){if(typeof e!=="object"){e={}}for(var i in r){if(r.hasOwnProperty(i)){if(r[i]!=null){e[i]=typeof r[i]==="object"?t(e[i],r[i]):r[i]}}}return e};for(var r=1,i=arguments.length;r<i;r++){var n=arguments[r];if(n!=null&&typeof n==="object"){e=t(e,n)}}return e};r.drawRaster=function(e,t,r,i,n){var i=parseInt(i)||10;var l=e.canvas;var a=l.width/t;var f=l.width/t;var u=r.x-a/2;var s=r.y-f/2;for(var o=u;o<a;o+=i){e.moveTo(o,s);e.lineTo(o,f)}for(var d=s;d<f;d+=i){e.moveTo(u,d);e.lineTo(a,d)}e.strokeStyle=n||"#D9D9D9";e.stroke()};r.isSystemOrDraft=function(e){return $tw.wiki.isSystemTiddler(r.getTiddlerRef(e))?true:r.isDraft(e)};r.changePrefix=function(e,t,i,n){if(e===t||!e||!t)return;n=n!==false;var l=r.getTiddlersByPrefix(e);var a=r.getDataMap();for(var f=l.length;f--;){var u=l[f];var s=u.replace(e,t);if($tw.wiki.tiddlerExists(s)&&!i){return}a[u]=s}for(var u in a){r.setField(u,"title",a[u]);if(n)$tw.wiki.deleteTiddler(u)}return a};r.inArray=function(e,t){return t.indexOf(e)!==-1};r.hasSubString=function(e,t){return e.indexOf(t)!==-1};r.joinAndWrap=function(e,t,r,i){if(!i)i=" ";return t+e.join(r+i+t)+r};r.keysOfItemsWithProperty=function(e,t,i,n){e=r.getIterableCollection(e);var l=Object.keys(e);var a=[];var n=typeof n==="number"?n:l.length;for(var f=0,u=l.length;f<u;f++){var s=l[f];if(typeof e[s]==="object"&&e[s][t]){if(!i||e[s][t]===i){a.push(s);if(a.length===n){break}}}}return a};r.keyOfItemWithProperty=function(e,t,i){var n=r.keysOfItemsWithProperty(e,t,i,1);return n.length?n[0]:undefined};r.deleteByPrefix=function(e,t){if(!e)return;t=t||$tw.wiki.allTitles();var i=[];for(var n=t.length;n--;){if(r.startsWith(t[n],e)){$tw.wiki.deleteTiddler(t[n]);i.push(i[n])}}return i};r.getByPrefix=function(e){return r.getMatches("[prefix["+e+"]]")};r.getIterableCollection=function(t){return t instanceof e.DataSet?t.get():t};r.getLookupTable=function(e,t){e=r.getIterableCollection(e);var i=r.getDataMap();var n=Object.keys(e);for(var l=0,a=n.length;l<a;l++){var f=n[l];var u=t?e[f][t]:e[f];var s=typeof u;if(s==="string"&&u!==""||s==="number"){if(!i[u]){i[u]=t?e[f]:true;continue}}throw'TiddlyMap: Cannot use "'+ltIndex+'" as lookup table index'}return i};r.getWithoutNewLines=function(e){if(typeof e==="string"){return e.replace(/[\n\r]/g," ")}};r.getArrayValuesAsHashmapKeys=function(e){return r.getLookupTable(e)};r.getTiddlersWithField=function(e,t,i){if(!i||typeof i!=="object")i={};var n=i.tiddlers||$tw.wiki.allTitles();var l=i.limit||0;var a=i.isIncludeDrafts===true;var f=r.getDataMap();var u=Object.keys(n);var s=$tw.utils.hop;for(var o=u.length;o--;){var d=r.getTiddler(n[u[o]]);var c=d.fields;if(s(c,e)&&(!s(c,"draft.of")||a)){if(!t||c[e]===t){f[c.title]=d;if(--l===0)break}}}return f};r.getTiddlerWithField=function(e,t){var i=r.getTiddlersWithField(e,t,{limit:1});return Object.keys(i)[0]};r.getTiddlersByPrefix=function(e,t){var t=t||$tw.wiki.allTitles();var i=[];var n=Object.keys(t);for(var l=n.length;l--;){var a=r.getTiddlerRef(t[n[l]]);if(r.startsWith(a,e)){i.push(a)}}return i};r.Exception=t;r.makeDraftTiddler=function(e){var t=$tw.wiki.findDraft(e);if(t){return $tw.wiki.getTiddler(t)}var i=$tw.wiki.getTiddler(e);t=r.generateDraftTitle(e);var n=new $tw.Tiddler(i,{title:t,"draft.title":e,"draft.of":e},$tw.wiki.getModificationFields());$tw.wiki.addTiddler(n);return n};r.generateDraftTitle=function(e){var t=0,r;do{r="Draft "+(t?t+1+" ":"")+"of '"+e+"'";t++}while($tw.wiki.tiddlerExists(r));return r};r.touch=function(e){r.setField(e,"modified",new Date)};r.getFullScreenApis=function(){var e=document,t=e.body,r={_requestFullscreen:t.webkitRequestFullscreen!==undefined?"webkitRequestFullscreen":t.mozRequestFullScreen!==undefined?"mozRequestFullScreen":t.msRequestFullscreen!==undefined?"msRequestFullscreen":t.requestFullscreen!==undefined?"requestFullscreen":"",_exitFullscreen:e.webkitExitFullscreen!==undefined?"webkitExitFullscreen":e.mozCancelFullScreen!==undefined?"mozCancelFullScreen":e.msExitFullscreen!==undefined?"msExitFullscreen":e.exitFullscreen!==undefined?"exitFullscreen":"",_fullscreenElement:e.webkitFullscreenElement!==undefined?"webkitFullscreenElement":e.mozFullScreenElement!==undefined?"mozFullScreenElement":e.msFullscreenElement!==undefined?"msFullscreenElement":e.fullscreenElement!==undefined?"fullscreenElement":"",_fullscreenChange:e.webkitFullscreenElement!==undefined?"webkitfullscreenchange":e.mozFullScreenElement!==undefined?"mozfullscreenchange":e.msFullscreenElement!==undefined?"MSFullscreenChange":e.fullscreenElement!==undefined?"fullscreenchange":""};if(!r._requestFullscreen||!r._exitFullscreen||!r._fullscreenElement){return null}else{return r}};r.flatten=function(e,t){t=t||{};var r=t.delimiter||".";var i=t.prefix||"";var n={};function l(e,a){Object.keys(e).forEach(function(f){var u=e[f];var s=t.safe&&Array.isArray(u);var o=Object.prototype.toString.call(u);var d=o==="[object Object]"||o==="[object Array]";var c=a?a+r+f:i+f;if(!s&&d){return l(u,c)}n[c]=u})}l(e);return n};r.unflatten=function(e,t){t=t||{};var i=t.delimiter||".";var n={};if(Object.prototype.toString.call(e)!=="[object Object]"){return e}function l(e){var t=Number(e);return isNaN(t)||e.indexOf(".")!==-1?e:t}Object.keys(e).forEach(function(a){var f=a.split(i);var u=l(f.shift());var s=l(f[0]);var o=n;while(s!==undefined){if(o[u]===undefined){o[u]=typeof s==="number"&&!t.object?[]:{}}o=o[u];if(f.length>0){u=l(f.shift());s=l(f[0])}}o[u]=r.unflatten(e[a],t)});return n};r.genUUID=function(){var e="0123456789abcdefghijklmnopqrstuvwxyz".split("");return function(){var t=e,r=new Array(36);var i=0,n;for(var l=0;l<36;l++){if(l==8||l==13||l==18||l==23){r[l]="-"}else if(l==14){r[l]="4"}else{if(i<=2)i=33554432+Math.random()*16777216|0;n=i&15;i=i>>4;r[l]=t[l==19?n&3|8:n]}}return r.join("")}}();exports.utils=r})();