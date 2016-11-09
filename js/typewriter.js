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

jQuery.fn.extend({
	typeIt: function(text, rate, mode){
		TYPEWRITER.addStyle();
		
		// check if the text should be handled as text or html
		mode = (typeof mode === 'undefined') ? 'text' : mode.toLowerCase();
		
		$(this).queue(function(){
			if ($(this).find('.twrt').length == 0)
			{
				$(this).append('<span class="twrt"></span>');
			}

			if ($(this).find('.twrc').length == 0)
			{
				$(this).append('<span class="twrc">|</span>');	
			}
			TYPEWRITER.type($(this), text, mode, 0, rate);
		});
		return $(this);
	},
	
	deleteIt: function(amount, rate)
	{
		$(this).queue(function(){
			TYPEWRITER.backspace($(this), amount, rate);	
		});
		return $(this);
	},
	
	pauseIt: function(delayInSeconds)
	{
		$(this).queue(function(){
			var tgt = $(this);
			setTimeout(function(){
				tgt.dequeue();
			}, delayInSeconds * 1000);
		});
		return $(this);
	},
	
	
	hideCursor: function()
	{
		$(this).queue(function(){
			var tgt = $(this);
			$(this).find('span.twrc').hide(0, function(){
				tgt.dequeue();
			});	
		});
		return $(this);
	},
	
	
	showCursor: function()
	{
		$(this).queue(function(){
			var tgt = $(this);
			$(this).find('span.twrc').show(0, function(){
				tgt.dequeue();
			});
		});
		return $(this);
	},
	
	
	clearIt: function()
	{
		$(this).queue(function(){
			$(this).html('');
			$(this).dequeue();
		});
		return $(this);
	},
	
	
	destroyIt: function()
	{
		$(this).queue(function(){
			$(this).find('span.twrt, span.twrc').remove();
			$(this).dequeue();
		});
	}
});

TYPEWRITER = {
		type: function(target, text, mode, idx, rate){
			if (target.length == 0) { return false; }
			var span = target.find('span.twrt');
			if (span.length == 0) { return false; }
			
			if (mode == 'html')
			{
				var result = TYPEWRITER.detectHTML(text, idx);
			}
			else
			{
				var result = TYPEWRITER.detectNewLine(text, idx);
			}
			
			span.append(result.insert);
			
			idx = idx + result.advanceIndex;
			
			if (idx < text.length)
			{
				setTimeout(function(){
					TYPEWRITER.type(target, text, mode, idx, rate)
				}, rate * Math.random() * 1000);		
			}
			else
			{
				target.dequeue();
			}
		},
		
		backspace: function(target, amount, rate)
		{
			
			if (target.length == 0) { return false; }
			var span = target.find('span.twrt');
			if (span.length == 0) { return false; }
			
			var ts = span.html().split('');
			ts.pop();
			span.html(ts.join(''));
			
			amount--;
			if (amount > 0)
			{
				setTimeout(function(){
					TYPEWRITER.backspace(target, amount, rate)
				}, rate * Math.random() * 1000);		
			}
			else
			{
				target.dequeue();
			}
		},
		
		
		addStyle: function()
		{
			$('<style>.twrc{animation: blinker 0.75s linear infinite;}@keyframes blinker{10% { opacity: 0.0; }}</style>').appendTo('head');
		},
		
		
		detectHTML: function(text, idx)
		{
			var obj = {
				advanceIndex: null,
				insert: null
			};
			
			var sub = text.toLowerCase().substring(idx);
			if (sub.indexOf('<br>') == 0)
			{
				obj.insert = '<br>';
				obj.advanceIndex = 4;
			}
			else
			{
				obj.insert = text[idx];
				obj.advanceIndex = 1;
			}
			return obj;
		},
		
		
		detectNewLine: function(text, idx)
		{
			var obj = {
				advanceIndex: null,
				insert: null
			};
			
			var sub = text.toLowerCase().substring(idx);
			if (sub.indexOf('\n ') == 0)
			{
				obj.insert = '<br>';
				obj.advanceIndex = 2;
			}
			else
			{
				obj.insert = text[idx];
				obj.advanceIndex = 1; 
			}
			return obj;
		}
}
