// List of popular channels
var channels = ["FreeCodeCamp","ESL_SC2","OgamingSC2", "cretetion","habathcx"];

// Key-value match for channel name-id
function getChannelID(name) {
  var channelID = {
    "FreeCodeCamp": "79776140",
    "ESL_SC2": "30220059",
    "OgamingSC2": "71852806",
    "cretetion": "90401618",
    "habathcx": "6726509"
  };
  
  return channelID[name];
}

// Key-value match for channel name-logo
function getChannelLogo(name) {
  var channelLogo = {
    "FreeCodeCamp": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
    "ESL_SC2": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg",
    "OgamingSC2": "https://static-cdn.jtvnw.net/jtv_user_pictures/ogamingsc2-profile_image-9021dccf9399929e-300x300.jpeg",
    "cretetion": "https://static-cdn.jtvnw.net/jtv_user_pictures/cretetion-profile_image-12bae34d9765f222-300x300.jpeg",
    "habathcx": "https://static-cdn.jtvnw.net/jtv_user_pictures/habathcx-profile_image-d75385dbe4f42a66-300x300.jpeg"
  };
  
  return channelLogo[name];
}

// Constructor for PopularData objects
function PopularData(name, logo, status, game, preview) {   
  this.link = "https://www.twitch.tv/"+name;
  this.logo = logo;
  this.name = name;
  this.game = game;
  this.status = status;
  this.preview = preview;
  this.border = "border-"+status;  
}

// Array of PopularData objects to store streams of popular channels
var popularChannels = [];

// Object constructor for live channels' data
function LiveData(logo, name, game, preview, link) {
  this.logo = logo;
  this.name = name;
  this.game = game;
  this.preview = preview;
  this.link = link;
}
// Array of LiveData objects to store streams of live channels
var liveChannels = [];

$(document).ready(function() {
  // Fetch and setup live channels' data
  function fetchLive() {
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/?limit=5",
      headers: {
        "Client-ID": "<removed>",
        "Accept": "application/vnd.twitchtv.v5+json"
      },
      success: function(json) {
        for(var i=0; i<5; i++) {
          // Extracting useful data 
          var logo = json.streams[i].channel.logo;
          var name = json.streams[i].channel.display_name;
          var game = json.streams[i].game;
          var preview = json.streams[i].preview.small;
          var link = json.streams[i].channel.url;

          // Create data object
          var liveObject = new LiveData(logo,name,game,preview,link);

          // Push data object into liveChannels array
          liveChannels.push(liveObject);
        }
        
        // Update the UI
        updateUI(liveChannels, false);
      }
    });
  }

  // Fetch and setup popular channels' data
  function fetchPopular(i) {
    var urlString = "https://api.twitch.tv/kraken/streams/"+getChannelID(channels[i]);
    $.ajax({
      type: "GET",
      url: urlString,
      headers: {
        "Client-ID": "<remove>",
        "Accept": "application/vnd.twitchtv.v5+json"
      },
      async: false,
      success: function(json) {
        // Temporary arguments variables
        var channelLogo, channelStatus, channelGame, channelPreview;
        
        // Check if stream is offline
        if(!Boolean(json.stream)) {
          channelStatus = "offline";
          channelLogo = getChannelLogo(channels[i]);
          channelGame = "No Game";
          channelPreview = "https://exa.vn/no-image.png";
        }
        // Else if stream is live
        else {
          channelStatus = "online";
          channelLogo = json.stream.channel.logo;
          channelGame = json.stream.channel.game;
          channelPreview = json.stream.preview.small;
        }
        
        // Create data object
        var channelData = new PopularData(channels[i], channelLogo, channelStatus, channelGame, channelPreview);
        
        // Push data object into popularChannels array
        popularChannels.push(channelData);
      }
    });
  }
  
  // Update UI for live & popular channels
  function updateUI(dataObject, flag) {
    // Update data
    for(var i=0; i<5; i++) {
      $("#item-link"+(i+1)).attr("href", dataObject[i].link);
      $("#item-avatar"+(i+1)).attr("src", dataObject[i].logo);
      $("#item-title"+(i+1)).text(dataObject[i].name);
      $("#item-game"+(i+1)).text(dataObject[i].game);
      $("#item-prev"+(i+1)).attr("src", dataObject[i].preview);
      
      // If updating UI for popular channels
      if(flag) {
        $("#item-status"+(i+1)).text(dataObject[i].status);
        $("#item-avatar"+(i+1)).addClass(dataObject[i].border);
      }
      // If updating UI for live channels
      else {
        $("#item-status"+(i+1)).text("");
        $("#item-avatar"+(i+1)).removeClass("border-online border-offline");
      }
    }    
  }
    
  // Handler for live channels' tab
  $("#live-channels").click(function() {
    // Animate
    $("#tab1").removeClass("slideInDown");
    $("#tab2").addClass("slideInDown");
    
    // Fetch data
    fetchLive();
  });
  
  // Handler for popular channels' tab
  $("#popular-channels").click(function() {
    // Animate
    $("#tab1").addClass("slideInDown");
    $("#tab2").removeClass("slideInDown");
    
    // Loop 5 times to fetch 5 streams data
    for(var i=0; i<5; i++) {
      fetchPopular(i);
    }
    
    // Update the UI
    updateUI(popularChannels, true);
  });
  
  (function init() {
    // Animate
    $(".nav-wrapper").addClass("animated fadeIn");
    $(".brand-logo").addClass("animated lightSpeedIn");
    $(".card").addClass("animated zoomIn");
    
    // Fetch data and initialize UI
    fetchLive();
  })();
});