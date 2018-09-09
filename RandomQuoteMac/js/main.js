$(document).ready(function() {
    // Array of background-color hexcodes
    var color = [["#48e5c2", "#1d4e7e"], ["#ff5c5c", "#7e3085"], ["#f33", "#4d0000"], ["#ff1aff", "#303"], ["#ffff80", "#808000"], ["#ffa366", "#e65c00"], ["#f2f2f2", "#333"], ["#ffb3d1", "#99003d"], ["#b3d9ff", "#004d99"], ["#acac86", "#2e2e1f"]];
    
    // Instantiating new clipboard object for copy functionality
    new Clipboard(".btn");
    
    function fetchQuote() {
      $.getJSON("https://got-quotes.herokuapp.com/quotes", function(json) {
        var fetchedQuote = json.quote;
        var author = "- "+json.character;
        
        $("#quote").text(fetchedQuote);
        $("#author").text(author);
        
        var random = Math.round(Math.random() * color.length);
  
        $("body").css("background", "linear-gradient("+color[random][0] +","+ color[random][1]+")");
        $("#new-quote").css("background", "linear-gradient("+color[random][0] +","+ color[random][1]+")");
              
        // Setting up response for Twitter button
        var tweet = "http://twitter.com/intent/tweet?text="+fetchedQuote;
        $("#twitter").attr("href", tweet);
        
      });
    }
    
    // Handler for new-quote button
    $("#new-quote").on("click", function() {
      fetchQuote();
    });
      
    // Invoke fetchQuote() at least once
    fetchQuote();
  });