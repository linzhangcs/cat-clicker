document.addEventListener('DOMContentLoaded', function(){
    var catImage = document.getElementById('cat');
    var clickLabel = document.getElementById('counter-label');
    
        var counter = 0;
        catImage.addEventListener('click', function(){
            console.log("Clicked");
            counter ++;
            clickLabel.innerHTML = counter;
            console.log(clickLabel.textContent);
        },false);
});