// Function to convert Arabic number into Roman
function convertToRoman(num) {
    var digits = [];
    
    while(num !== 0) {
      digits.push(num%10);
      num = Math.floor(num/10);
    }
    
    var i = 0.1;
    digits = digits.map(function(e) {
      i *= 10;
      
      if(e === 4) {
        if(i === 1) {
          return "IV";
        }
        else if(i === 10) {
          return "XL";
        }
        else if(i === 100) {
          return "CD";
        }
      }
      else if(e === 9) {
        if(i === 1) {
          return "IX";
        }
        else if(i === 10) {
          return "XC";
        }
        else if(i === 100) {
          return "CM";
        }
      }
      else if(e === 0) {
        return "";
      }
      else {
        var mod = e%5;
        var prefix, suffix, word;
        
        switch(i) {
          case 1:
            prefix = "V";
            suffix = "I";
            break;
          case 10:
            prefix = "L";
            suffix = "X";
            break;
          case 100:
            prefix = "D";
            suffix = "C";
            break;
          case 1000:
            suffix = "M";
        }
        
        var temp = suffix;
        for(var j=1; j<mod; j++) {
          suffix += temp;
        }
        
        if(mod === 0) {
          word = prefix;
        }
        else if(5-e > 0) {
          word = suffix;
        }
        else if(5-e < 0) {
          word = prefix+suffix;
        }
        
        return word;
      }    
    });
    
    num = digits.reverse().join("");
   return num;
  }
  
  $(document).ready(function() {
    // Click handler on convert button
    $("#convert").on("click", function() {
      // Fetch value of input field
      var number = $("#input-number").val();
      number = parseInt(number);
      
      // Check if the variable holds a number
      if(Boolean(number)) {
        var answer;
        
        if(number > 3999) {
          answer = "Works for numbers < 4000";
        }
        else {
          answer = convertToRoman(number);
        }
        
        // Un-hide the answer panel and show answer
        $("#answer-panel").removeClass("hide");
        $("#answer-panel").addClass("slideInDown");
        $("#search-panel").css("margin-top","10px");
        $("#answer").text(answer);
        $("#input-number").val("");
      }
    });
    
    // Click handler for dismiss button
    $("#dismiss").click(function() {
      $("#answer-panel").addClass("hide");
      $("#answer-panel").removeClass("slideInDown");
      $("#search-panel").css("margin-top", "100px");
      $("#input-number").val("");
    });
  });