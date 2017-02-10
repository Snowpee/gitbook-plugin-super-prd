require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function() {
    });

    gitbook.events.bind("exercise.submit", function() {
        // do something
    });
});