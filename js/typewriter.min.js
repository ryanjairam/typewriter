/*
MIT License

Copyright (c) 2016 Ryan Jairam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
jQuery.fn.extend({typeIt:function(c,a,b){TYPEWRITER.addStyle();b=(typeof b==="undefined")?"text":b.toLowerCase();$(this).queue(function(){if($(this).find(".twrt").length==0){$(this).append('<span class="twrt"></span>')}if($(this).find(".twrc").length==0){$(this).append('<span class="twrc">|</span>')}TYPEWRITER.type($(this),c,b,0,a)});return $(this)},deleteIt:function(a,b){$(this).queue(function(){TYPEWRITER.backspace($(this),a,b)});return $(this)},pauseIt:function(a){$(this).queue(function(){var b=$(this);setTimeout(function(){b.dequeue()},a*1000)});return $(this)},hideCursor:function(){$(this).queue(function(){var a=$(this);$(this).find("span.twrc").hide(0,function(){a.dequeue()})});return $(this)},showCursor:function(){$(this).queue(function(){var a=$(this);$(this).find("span.twrc").show(0,function(){a.dequeue()})});return $(this)},clearIt:function(){$(this).queue(function(){$(this).html("");$(this).dequeue()});return $(this)},destroyIt:function(){$(this).queue(function(){$(this).find("span.twrt, span.twrc").remove();$(this).dequeue()})}});TYPEWRITER={type:function(e,g,f,b,d){if(e.length==0){return false}var c=e.find("span.twrt");if(c.length==0){return false}if(f=="html"){var a=TYPEWRITER.detectHTML(g,b)}else{var a=TYPEWRITER.detectNewLine(g,b)}c.append(a.insert);b=b+a.advanceIndex;if(b<g.length){setTimeout(function(){TYPEWRITER.type(e,g,f,b,d)},d*Math.random()*1000)}else{e.dequeue()}},backspace:function(e,a,c){if(e.length==0){return false}var b=e.find("span.twrt");if(b.length==0){return false}var d=b.html().split("");d.pop();b.html(d.join(""));a--;if(a>0){setTimeout(function(){TYPEWRITER.backspace(e,a,c)},c*Math.random()*1000)}else{e.dequeue()}},addStyle:function(){$("<style>.twrc{animation: blinker 0.75s linear infinite;}@keyframes blinker{10% { opacity: 0.0; }}</style>").appendTo("head")},detectHTML:function(d,a){var c={advanceIndex:null,insert:null};var b=d.toLowerCase().substring(a);if(b.indexOf("<br>")==0){c.insert="<br>";c.advanceIndex=4}else{c.insert=d[a];c.advanceIndex=1}return c},detectNewLine:function(d,a){var c={advanceIndex:null,insert:null};var b=d.toLowerCase().substring(a);if(b.indexOf("\n ")==0){c.insert="<br>";c.advanceIndex=2}else{c.insert=d[a];c.advanceIndex=1}return c}};