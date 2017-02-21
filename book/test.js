require(["gitbook"], function(gitbook) {

    gitbook.events.bind("page.change", function() {
      var aToc = $$(".atoc")[0];
      console.log(aToc);
    });

    gitbook.events.bind("exercise.submit", function() {

    });
});
