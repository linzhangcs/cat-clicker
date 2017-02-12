$(document).ready(function(){

  /***************************** MODEL ****************************/
  var cat = {
    init: function(){
      // localStorage.clear();
      if(!localStorage.cats){
        localStorage.cats = JSON.stringify([]);
        totalCatCounter = 0;
        var catOne = cat.addCat("Kitty","images/Jeff-the-Cat.jpg");
        var catTwo = cat.addCat("Kat","images/Jeff-the-Cat.jpg");
        var catThree = cat.addCat("Ken","images/Jeff-the-Cat.jpg");
      }
    },
    addCat: function(name, pic){
      var totalCatCounter;
      var obj = {
        catId: totalCatCounter,
        catName: name,
        catPic: pic,
        counter: 0
      }
      var c = JSON.parse(localStorage.cats);
      c.push(obj);
      totalCatCounter++;
      localStorage.cats = JSON.stringify(c);
    },
    updateCatCounter: function(id){
      var cats = JSON.parse(localStorage.cats);
      cats[id].counter++;
      localStorage.cats = JSON.stringify(cats);
    },
    updateCatInfo: function(id, name, pic, counter){
      var cats = JSON.parse(localStorage.cats);
      cats[id].catName = name;
      cats[id].catPic = pic;
      cats[id].counter = counter;

      localStorage.cats = JSON.stringify(cats);
    },
    getAllCats: function(){
      return JSON.parse(localStorage.cats);
    }
  };

  /***************************** controller ****************************/
  var controller = {
    init: function(){
      cat.init();
      view.init();
    },
    getCatNames: function(){
      var catObjs = this.getCats();
      var names = [];
      for(var i = 0; i < catObjs.length; i++){
        console.log(catObjs[i].catName)
        names.push(catObjs[i].catName);
      }
      return names;
    },
    getCats: function(){
      return cat.getAllCats();
    },
    getAllCatsInfo: function(){
      var cats = this.getCats();
      return
    },
    getCatInfo: function(id){
      var cats = this.getCats();
      var clickedCat = cats[id];
      return clickedCat;
    },
    updateCatCounter: function(id){
      cat.updateCatCounter(id);
      view.updateCounterView(id);
    },
    addCounterClickListener: function(elem, id){
      if(elem){
        $(elem).click(function(){
          controller.updateCatCounter(id);
        });
      }
    },
    showCatInfo: function(id){
      var info = this.getCatInfo(id);
      view.displayCatInfo(info, id);
    },
    addAdminClickListener: function(elem, id){
      if(elem){
        $(elem).click(function(){
          adminView.init(id);
        });
      }
    },
    addAdminUpdateListener: function(elem, id){
      if(elem){
        $(elem).click(function(){
          adminView.updateCatInfo(id);
        });
      }
    },
    addNameClickListener: function(elem, id){
      if(elem){
        $(elem).click(function(){
          controller.showCatInfo(id);
        });
      }
    }
  };

  /***************************** VIEW ****************************/
  var view = {
    init: function(){
       var cats = controller.getCatNames();
       for(var i = 0; i < cats.length; i++){
         $('#cat-names').append("<li id='cat"+ i +"'>"+cats[i]+"</li>");
         controller.addNameClickListener($('#cat'+i), i);
       }
    },
    displayCatInfo: function(info, id){
      console.log(info);
      $('#cat-info').empty();
      $('#cat-info').append("<div class=\"cat-name\">"+info.catName+"</div>");
      $('#cat-info').append("<div class=\"cat-pic\" id=\""+id+"pic"+"\"><img src='"+info.catPic+"'/></div>");
      $('#cat-info').append("<div class=\"cat-click-counter\" id=\""+id+"\">"+info.counter+"</div>");
      $('#cat-info').append("<input type=\"button\" id=\"adminBtn\">Admin</input>");
      controller.addCounterClickListener($('#'+id+'pic'), id);
      controller.addAdminClickListener($('#adminBtn'), id);
      controller.addAdminUpdateListener($('#admin-update'), id);
    },
    updateCounterView: function(id){
      console.log(id);
      var info = controller.getCatInfo(id).counter;
      $('#'+id).text(info);
    }
  };

  var adminView = {
    init: function(id){
      var info = controller.getCatInfo(id);
      $('#admin-name').val(info.catName);
      $('#admin-pic').val(info.catPic);
      $('#admin-counter').val(info.counter);

      $('#admin-view').show();
    },
    updateCatInfo: function(id){
      var name = $('#admin-name').val();
      var pic = $('#admin-pic').val();
      var counter = $('#admin-counter').val();

      cat.updateCatInfo(id, name, pic, counter);
      view.displayCatInfo(id);
    }
  };
  controller.init();
});
