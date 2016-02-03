$(document).ready(function(){
  /*var counter = 0;
  $('#container').append("<div id=\"cat-name\"></div>");
  $('#container').append("<div id=\"cat\"><img src='images/Jeff-the-Cat.jpg'/></div>");
  $('#container').append("<div id=\"cat-click-counter\"></div>");

  $('#cat').click(function(){
    counter++;
    $('#cat-click-counter').text(counter);
  });*/

  var catOne = new catClicker("Kitty","images/Jeff-the-Cat.jpg", "catOne");
  var catTwo = new catClicker("Kat","images/Jeff-the-Cat.jpg", "catTwo");
  var catThree = new catClicker("Ken","images/Jeff-the-Cat.jpg", "catThree");

  // clear the screen for testing
  document.body.innerHTML = '';
  document.body.style.background="white";
  var nums = [1,2,3]; // Let's loop over the numbers in our array
  for (var i = 0; i < nums.length; i++) {
    // This is the number we're on...
    var num = nums[i];
    // We're creating a DOM element for the number
    var elem = document.createElement('div');
    elem.textContent = num;
    // ... and when we click, alert the value of `num`
    /*elem.addEventListener('click', function() {
      alert(elem.innerText);
    });*/

    //We immediately invoke it by wrapping it in parentheses and calling it right away, passing in num.
    //This method of wrapping an anonymous function in parentheses and calling it right away is
    //called an IIFE (Immediately-Invoked Function Expression, pronounced like "iffy")
    elem.addEventListener('click', (function(numCopy){
      return function(){
        alert(numCopy)
      };
    })(num));
      // finally, let's add this element to the document
    document.body.appendChild(elem);
  };

});

var catClicker = function(name, picture, id){
  this.catName = name;
  this.picture = picture;
  this.catId = id;
  this.counter = 0;
  this.init();
}
catClicker.prototype.init = function (){
  this.display();
  this.addCatClicker();
}
catClicker.prototype.display = function(){
  $('#container').append("<div class=\"cat-name\">"+this.catName+"</div>");
  $('#container').append("<div class=\"cat-pic\" id=\""+this.catId+"pic"+"\"><img src='"+this.picture+"'/></div>");
  $('#container').append("<div class=\"cat-click-counter\" id=\""+this.catId+"\">"+this.counter+"</div>");
};
catClicker.prototype.addCatClicker = function(){
  var catPic = "#"+this.catId+"pic";
  var counter = this.counter;
  var catId = this.catId;
  $(catPic).on('click', function(){
    counter++;
    $("#"+ catId).text(counter);
  });
  this.counter = counter;
}
