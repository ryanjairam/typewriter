$(document).ready(function(){
    // set the workspace as closed
    $('#workspace').data('isOpen', false);

    // open the workspace if "How to use it" or "Examples" is clicked
    $('.workspace-toggle').click(function(){
        var workspace = $('#workspace');
        var targetPage = $(this).attr('data-target');
        $('.doc-page').hide();
        $('#' + targetPage).show();
        $('.doc-section-button-active').removeClass('doc-section-button-active');
        $('#' + targetPage + '-toggle').addClass('doc-section-button-active');

        if (!workspace.data('isOpen'))
        {
            $('#container').css('right', '50%');
            $('#workspace').data('isOpen', true);
        }
    });

    // workspace close button
    $('#workspace-close-button').click(function(){
        $('#container').css('right', '0');
        $('#workspace').data('isOpen', false);
    });

    // switch documentation section when "Usage" or "Examples" is clicked
    $('.doc-section-button').click(function(){
        var target = $(this).attr('data-target');
        $('.doc-page').hide();
        $('#' + target).show();
        $('.doc-section-button-active').removeClass('doc-section-button-active');
        $(this).addClass('doc-section-button-active');
    });

    // type the description on doc ready
    $('#description')
        .typeIt('A jQuery plugin for displaying text using a typewriter effect.', 0.06, 'text')
        .pauseIt(0.5)
        .typeIt(' :)', 0, 'text')
        .hideCursor();

    // show the typewriter demo
    $('#whats-that').click(function(){
        $('#whats-that-sample').typeIt('This is the typewriter effect.', 0.05, 'text').pauseIt(1).hideCursor();
    });


    // Show example 1
    $('#example-run-1').click(function(){
        var target = $(this).siblings('.example-output');
        target.clearIt().typeIt('This is a sentence that was typed.', 0.06, 'text').hideCursor();
    });

    // Show example 2
    $('#example-run-2').click(function(){
        var target = $(this).siblings('.example-output');
        target.clearIt().typeIt('There is an eraaasasa in this sentence!', 0.06, 'text').pauseIt(1).deleteIt(30, 0.09).typeIt('are no errors in this sentence. ;)', 0.05, 'text').hideCursor();
    });

    // Show example 3
    $('#example-run-3').click(function(){
        var target = $(this).siblings('.example-output');
        target.clearIt().typeIt('This is the first sentence.', 0.04, 'text')
                    .pauseIt(0.5)
                    .typeIt('\n This is a new line using the text format.', 0.07, 'text')
                    .typeIt('<br> This is a new line using the html format.', 0.04, 'html')
                    .hideCursor();
    });

    // download the file
    $('#download-button').click(function(){
        window.location.href = 'js/typewriter.min.js';
    });
});