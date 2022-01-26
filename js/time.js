var countDownDate;

var timer_set;

/*var element = document.getElementById('game'),
    style = window.getComputedStyle(element);
//var top = style.getPropertyValue('visibility');

console.log(getComputedStyle(element).visibility);*/

function start_inter(){

    countDownDate = new Date().getTime() + 32*1000;
    timer_set = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now an the count down date
        var distance = countDownDate - now;
    
        //var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
       
        document.getElementById("time").innerHTML = seconds + "s ";
        
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(timer_set);
            if(distance <= 0){
                game_over_bad();
            }
        }
    }, 1000);
}