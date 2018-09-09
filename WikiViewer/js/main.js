$(document).ready(function() {  
  
    // Animation on page load
    function initAnimate() {
      $("#logo").addClass("slideInDown");
      $("#search-area").addClass("slideInUp");
      $("#random").addClass("zoomIn");
    }
    
    // Function to fetch JSON data on search
    function fetchAndUpdate(searchQuery) {
      // URL via which data shall be fetched
      var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+searchQuery+"&callback=?";
      
      $.getJSON(url, function(json) {
        // Object to store fetched data
        var appData = {
          title: ["default"],
          link: ["default"]
        };
        
        // Initialize appData with fetched data
        appData.title = json[1];
        appData.link = json[3];
        
        // Use fetched data to generate results-list
        generateListItems(appData);
      });
    }
    
    // Function to generate result list
    function generateListItems(appData) {
      var resultList = [];
      
      for(var i=0; i < appData.link.length; i++) {
        if(i%2 === 0) {
          resultList.push("<a href="+appData.link[i]+" class='collection-item white black-text' target='blank'>"+appData.title[i]+"<i class='material-icons grey-text text-darken-4 secondary-content'>link</i></a>");
        }
        else {
          resultList.push("<a href="+appData.link[i+1]+" class='collection-item grey darken-4 white-text' target='blank'>"+appData.title[i]+"<i class='material-icons white-text secondary-content'>send</i></a>");        
        }
      }
      
      // Update UI with fetched results
      var html = resultList.join("\n")
      updateResults(html);
    }
    
    // Function to update the UI with fetched results
    function updateResults(html) {
      $("#results-list").html(html);
      $("#search-input").val("");
      $("#search-input").addClass("hide");
      $("#search-area").addClass("hide");
      $("#random").addClass("hide");
      $("#results").removeClass("hide");
      $("#results").addClass("fadeInDown");
    }
    
    // Click handler on search button
    $("#search-btn").on("click", function() {
      // Check if the input-field is not hidden
      if(!$("#search-input").hasClass("hide")) {
        var searchQuery = $("#search-input").val();
        
        // If a search query is input
        if(Boolean(searchQuery)) {
          /*
          1. Fetch results for issued query & 
          2. Generate list of results
          3. Update UI (change button's icon too)
          */
          fetchAndUpdate(searchQuery);
        }
        // If no search query is input, hide the input-field again
        else {
          $("#search-input").addClass("hide");
          $("#search-input").removeClass("fadeInDown");
          $("#search-btn-icon").text("search");
          $("#search-btn-icon").removeClass("rotateIn");
          $("#search-btn-icon").addClass("rotateInDownRight");
        }
      }
      // If input-field is hidden, remove hide class
      else {
        $("#search-input").removeClass("hide");
        $("#search-input").addClass("fadeInDown");
        $("#search-btn-icon").text("send");
        $("#search-btn-icon").addClass("rotateIn");
        $("#search-btn-icon").removeClass("rotateInDownRight");
      }
    });
    
    // Click handler for results-dismiss button
    $("#results-dismiss").on("click", function() {
      $("#results").addClass("hide");
      $("#results-list").empty();
      $("#search-btn-icon").text("search");
      $("#search-area").removeClass("hide");
      $("#random").removeClass("hide");
    });
    
    initAnimate();
  });