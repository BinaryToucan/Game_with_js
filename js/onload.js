var result_save_str = null;

window.addEventListener("DOMContentLoaded", initRes);

function initRes() {

  if(sessionStorage.getItem("result_save_str")){

    result_save_str = sessionStorage.getItem("result_save_str");
        
  } else {
    result_save_str = '';
  }
}

var name_file = null;

window.addEventListener("DOMContentLoaded", initName);

function initName() {

  if(sessionStorage.getItem("name_file")){

    name_file = sessionStorage.getItem("name_file");
        
  } 
  else {
    name_file = 'empty';
  }
}

var level = null;

window.addEventListener("DOMContentLoaded", initLifeCount);

function initLifeCount() {

  if(sessionStorage.getItem("level")){

    level = parseInt(sessionStorage.getItem("level"), 10);

    if(level == 3){
      //sessionStorage.setItem("result_save_str", result_save_str);
      game_over_good();
      clearInterval(timer_set);
    }
        
  } else {
    level = 0;
  }
}

var start_vis = null;
window.addEventListener("DOMContentLoaded", initStartCount);

function initStartCount() {

  if(sessionStorage.getItem("start_vis")){

    start_vis = parseInt(sessionStorage.getItem("start_vis"), 10);
        
  } else {
    start_vis = 0;
  }
}

let level_raz = [3, 4, 6];
let level_kol = [6, 10, 20];
let color_rect = ['#ffffff', '#ff0000', '#ff00ff', '#4000ff', '#80ff00', '#ffff00','#00ffff'];
var rect_raz = 110;
var otstup_rect = 20;
var rect_width = rect_raz + 20;

var att_fir = 3;

var raz_window = [];
var window_kol_et = [];

var window_n = 3, window_m = 10;

for (var j = 0; j < window_m; j++){
    raz_window[j] = Math.floor(document.documentElement.clientWidth/window_m*j + 20);
}

for (var i = 0; i < window_n; i++){
	for (var j = 0; j < window_m; j++){
        window_kol_et[i*10+j] = i*10+j;
    }
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function draw_main(rect_main){
    ctx = rect_main.getContext('2d');
    draw(rect_main, rect_width, 10);
}

function draw_main_ram(rect_main){
    ctx = rect_main.getContext('2d');

    ctx.strokeStyle = '#B70A02';
    ctx.strokeRect(0, 0, rect_raz+20, rect_raz+20);
    ctx.strokeRect(5, 5, rect_raz+10, rect_raz+10);
}

function draw_answer(answer_rect){
    ctx = answer_rect.getContext('2d');

    answer_rect.width  = rect_width;
    answer_rect.height = rect_width;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0, rect_width, rect_width);

    ctx.strokeStyle = '#000000';
    ctx.strokeRect(0, 0, rect_raz+20, rect_raz+20);
    ctx.strokeRect(5, 5, rect_raz+10, rect_raz+10);
}

function draw(rect_new, width_ = rect_raz, otsup = 0){ //otsup = 10
    ctx = rect_new.getContext('2d');

    rect_new.width  = width_;
    rect_new.height = width_;

    ctx.strokeStyle = '#000000';
    //ctx.fillRect(0 , 0, rect_width, rect_width);
    //ctx.strokeRect(10 ,10, rect_raz, rect_raz);
    
    var raz_sqv = level_raz[level];
    for (i = 0; i < raz_sqv; i+=1){
        for (j = 0; j < raz_sqv; j+=1) {         
            ctx.fillStyle = color_rect[randomInteger(0, level + 2)];
            ctx.fillRect(i*(rect_raz/level_raz[level]) + otsup, j*(rect_raz/level_raz[level]) + otsup, (rect_raz/level_raz[level]), (rect_raz/level_raz[level]));
        }
    }
    for (i = 0; i <= raz_sqv; i+=1){
        for (j = 0; j <= raz_sqv; j+=1) {
            if(i == 0){
                ctx.strokeStyle = '#000000';
                ctx.beginPath();
                ctx.moveTo( otsup, j*(rect_raz/level_raz[level]) + otsup);
                ctx.lineTo( otsup + rect_raz, j*(rect_raz/level_raz[level]) + otsup);
                ctx.closePath();
                ctx.stroke();
            }
            if(j==0){
                ctx.strokeStyle = '#000000';
                ctx.beginPath();
                ctx.moveTo( i*(rect_raz/level_raz[level]) + otsup, otsup);
                ctx.lineTo( i*(rect_raz/level_raz[level]) + otsup , rect_raz + otsup);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
    if(otsup == 0){
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, width_ + otsup,  width_ + otsup);
    }
}

function cloneCanvas(oldCanvas) {

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width - 20;
    newCanvas.height = oldCanvas.height - 20;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 10, 10, rect_raz, rect_raz, 0, 0, rect_raz, rect_raz);

    context.lineWidth = 3;
    context.strokeRect(0, 0, newCanvas.width, newCanvas.width);
    //return the new canvas
    return newCanvas;
}

function many_rect(str){
  var new_rect = document.createElement("canvas");
    new_rect.style.position = 'absolute';
    draw(new_rect, rect_raz, 0);

    var parentPos = document.getElementById(str).getBoundingClientRect();

    new_rect.style.left = (parentPos.width- 50) +'px'; //window.screen.availWidth
    new_rect.style.top = (parentPos.height - 150) +'px';
    new_rect.style.transform = 'rotate(' + 60 + 'deg)';

    document.getElementById(str).appendChild(new_rect);
    
    var new_rect = document.createElement("canvas");
    new_rect.style.position = 'absolute';
    draw(new_rect, rect_raz, 0);

    new_rect.style.left = -100 +'px';
    new_rect.style.top = -50 +'px';
    new_rect.style.transform = 'rotate(' + 30 + 'deg)';

    document.getElementById(str).appendChild(new_rect);

    var new_rect = document.createElement("canvas");
    new_rect.style.position = 'absolute';
    draw(new_rect, rect_raz, 0);

    new_rect.style.left = (parentPos.width -100) +'px';
    new_rect.style.top = (parentPos.height - 100) +'px';
    new_rect.style.transform = 'rotate(' + 45 + 'deg)';

    document.getElementById(str).appendChild(new_rect);
}

window.onload = function(){

  if(start_vis == 0){
    document.getElementById("start").style.visibility = "visible";
    many_rect("start");
  }


  if(level>=0 && getComputedStyle(document.getElementById('good')).visibility == 'hidden' && getComputedStyle(document.getElementById('bad')).visibility == 'hidden' && start_vis == 1){
    document.body.style.background = "url(img/fon4.jpg)";
    document.getElementById("start").style.display = 'none';
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("game").style.visibility = "visible";
    start_inter();
  }
  if(level>2){
    document.getElementById("game").style.visibility = "hidden";
  }

    var rect_main = document.getElementById("main_rect");
    draw_main(rect_main);

    var rect_answer = cloneCanvas(rect_main);

    draw_main_ram(rect_main);

    var rect_main = document.getElementById("answer_rect");
    draw_answer(rect_main);

    document.getElementById("time").innerHTML = 30 + "s ";
    document.getElementById("pops").innerHTML = "Попыток: " + att_fir;
    document.getElementById("level").innerHTML = "Уровень " + (level + 1);

    for(let i = 0; i<level_kol[level] - 1; i+=1){
        var new_rect = document.createElement("canvas");
        new_rect.id = "rect_new";
        draw(new_rect, rect_raz, 0);

        var x = randomInteger(0,11)*30;
        var rand_int_wind = randomInteger(0, window_kol_et.length-1);
      
        new_rect.style.left = raz_window[window_kol_et[rand_int_wind] % 10]+'px';
        new_rect.style.top = Math.floor(window_kol_et[rand_int_wind]/10)*180+200 +'px';
        new_rect.style.transform = 'rotate(' + x + 'deg)';

        //console.log(Math.floor(window_kol_et[rand_int_wind]/10)*Math.floor(window.screen.availHeight/2)+300);
        window_kol_et.splice(rand_int_wind, 1);
    
        document.getElementById("game").appendChild(new_rect);
    }

    var x = randomInteger(0,12)*30;
    rect_answer.id = "rect_answer";
    var rand_int_wind = randomInteger(0, window_kol_et.length-1);

    rect_answer.style.left = raz_window[window_kol_et[rand_int_wind] % 10]+'px';
    rect_answer.style.top = Math.floor(window_kol_et[rand_int_wind]/10)*180+200 +'px';

    window_kol_et.splice(rand_int_wind, 1);
    rect_answer.style.transform = 'rotate(' + x + 'deg)';
    document.getElementById("game").appendChild(rect_answer);

}
/* Позиция в начале */
function random_posit(){ 
    let parent = document.getElementById('body');
    let all_rax = parent.getBoundingClientRect();
     for(let i=0; i <parent.childNodes.length; i+=1){
        if(parent.childNodes[i].id == 'rect_new'){
            parent.childNodes[i].style.left = randomInteger(all_rax.x, all_rax.x+all_rax.width-250)+'px';
            parent.childNodes[i].style.top = randomInteger(all_rax.y, all_rax.y+all_rax.height-250)+'px';
        }
    }
}

/*  перемещение (доработать)  */
document.ondragstart = function() {return false}
document.body.onselectstart = function() {return false}

document.onmousedown = function(event) {

rect_new = event.target;

if((rect_new.id !='rect_new' && rect_new.id !='rect_answer')|| rect_new.tagName != 'CANVAS' || rect_new.tagName == 'HTML') return;

  let shiftX = event.clientX - rect_new.offsetLeft;
  let shiftY = event.clientY - rect_new.offsetTop;

  rect_new.style.position = "absolute";
  rect_new.style.zIndex = 1000;
  document.body.append(rect_new);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
   let css_rotate = getComputedStyle(rect_new);
   var rot_deg = rotate_deg(css_rotate.transform);

    rect_new.style.left = pageX - shiftX + 'px';
    rect_new.style.top = pageY - shiftY + 'px';
  }

  document.body.onkeyup = function(e){
    dom = event.target;

    //console.log(dom.tagName);
    if(dom.tagName != 'CANVAS' || dom.tagName == 'HTML') return;

    let css_rotate = getComputedStyle(dom);

    //console.log(css_rotate.transform);
    var rot_deg = rotate_deg(css_rotate.transform);
    //console.log(rot_deg);
    dom.style.transform = 'rotate('+ (rot_deg + 30) +'deg)';

    dom.onmouseup= function(){
        document.onmousemove = null;
        dom.onmouseup=null;
      }

      dom.ondragstart = function() {
        return false;
      };

    }
 function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);    
}

  document.addEventListener('mousemove', onMouseMove);

  rect_new.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    rect_new.onmouseup = null;
  };

  rect_new.ondragstart = function() {
    return false;
  };

};

function rotate_deg(tr){
    var values = tr.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var scale = Math.sqrt(a*a + b*b);
    var sin = b/scale;
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    //if(angle < 0) angle +=360;

    return angle;

}

function game_over_bad(){
  clearInterval(timer_set);
  document.body.style.background = "url(img/fon2.jpg) no-repeat";
  document.body.style.backgroundSize = '100%';

  document.getElementById("game").style.display = 'none';
  document.getElementById("game").style.visibility = "hidden";
  document.getElementById("bad").style.visibility = "visible";
  document.querySelectorAll('#bad > #score')[0].innerHTML = "Ваш счет: " + level;

  if(result_save_str != '' && result_save_str != null) result_save_str = result_save_str + "\n" + new Date().toLocaleString() + " Ваш счет: " + level;
  else result_save_str = new Date().toLocaleString()+ " Ваш счет: " + level;

  many_rect1("bad");

  for (let i = 0; i < document.body.childNodes.length; i++) {
    if(document.body.childNodes[i].tagName == 'CANVAS'){
      document.body.childNodes[i].style.visibility = 'hidden';
    }
  }
}

function game_over_good(){
  clearInterval(timer_set);
  document.body.style.background = "url(img/fon2.jpg) no-repeat";
  document.body.style.backgroundSize = '100%';

  if(result_save_str != '' && result_save_str != null) result_save_str = result_save_str + '\n' + new Date().toLocaleString() + " Ваш счет: 3";
  else result_save_str = new Date().toLocaleString() + " Ваш счет: 3";
  sessionStorage.setItem("result_save_str", result_save_str);

  level = 1;
  many_rect_("good");

  document.getElementById("game").style.display = 'none';
  document.getElementById("game").style.visibility = "hidden";
  document.getElementById("good").style.visibility = "visible";
  document.querySelectorAll('#good > #score')[0].innerHTML = "Ваш счет: " + 3;

  for (let i = 0; i < document.body.childNodes.length; i++) {
    if(document.body.childNodes[i].tagName == 'CANVAS'){
      document.body.childNodes[i].style.visibility = 'hidden';
    }
  }
}

function click_button(){
    var rect_answer = document.getElementById("rect_answer").getBoundingClientRect();
    var rect_for = document.getElementById("answer_rect").getBoundingClientRect();

    if((rect_for.left <= rect_answer.left + 20) &&  (rect_answer.left + 20<= rect_for.width + rect_for.left)){
      if((rect_for.top <= rect_answer.top + 20)&& (rect_answer.top + 20<= rect_for.height + rect_for.top)){
        sessionStorage.setItem("level", level+1);
        sessionStorage.setItem("name_file", name_file);
        localStorage.setItem("result_save_str", result_save_str);
        clearInterval(timer_set);
        end_level();
        document.querySelector('#id').onclick = '';

        for (let i = 0; i < document.body.childNodes.length; i++) {
          if(document.body.childNodes[i].tagName == 'CANVAS'){
            var box = document.body.childNodes[i];
            end_round(box);
          }
        }
        for (let i = 0; i < document.getElementById("game").childNodes.length; i++) {
          if(document.getElementById("game").childNodes[i].id == 'rect_new'){
            var box = document.getElementById("game").childNodes[i];
            end_round(box);
          }
        }
        //window.location.reload();
      }
      else{
        att_fir--;
        if(att_fir <= 0){
          game_over_bad();
        }
        document.getElementById("pops").innerHTML = "Попыток: " + att_fir;
      }
    }
    else{
      att_fir--;
      if(att_fir <= 0){
        game_over_bad();
      }
      document.getElementById("pops").innerHTML = "Попыток: " + att_fir;
    }
}

function new_game(){
    sessionStorage.setItem("name_file", name_file);
    if(name_file == null || name_file == 'empty'){
      document.getElementById('name_player').style.display = 'block';
    }
    else
    {
      localStorage.setItem("result_save_str", result_save_str);
      sessionStorage.setItem("start_vis", 1);
      sessionStorage.setItem("result_save_str", result_save_str);
      document.getElementById("start").style.display = 'none';
      document.getElementById("start").style.visibility = "hidden";
      document.getElementById("game").style.visibility = "visible";
      document.body.style.background = "url(img/fon4.jpg)";
      //document.body.style.backgroundSize = '100%';
      start_inter();
    }
}

function new_game_new(){
    sessionStorage.setItem("level", 0);
    sessionStorage.setItem("start_vis", 0);
    sessionStorage.setItem("result_save_str", result_save_str);
    sessionStorage.setItem("name_file", name_file);
    window.location.reload();
}

function end_round(box){
  let coordY = box.getBoundingClientRect().top;
  let time = setInterval(frame, 2);
  function frame() {
      if (coordY >= document.documentElement.clientHeight - rect_raz - 20) {
          clearInterval(time);
          
          if(box.id == 'rect_answer') 
          {
            //sessionStorage.setItem("result_save_str", result_save_str);
            window.location.reload();
          }
      } else {
          coordY++;
          box.style.top = coordY + 'px';
     }
  }
}

function many_rect_(str){
  var new_rect = document.createElement("canvas");
    new_rect.style.position = 'absolute';
    draw(new_rect, rect_raz, 0);

    var parentPos = document.getElementById(str).getBoundingClientRect();

    new_rect.style.left = (parentPos.width- 50) +'px'; //window.screen.availWidth
    new_rect.style.top = (parentPos.height - 50) +'px';
    new_rect.style.transform = 'rotate(' + 60 + 'deg)';

    document.getElementById(str).appendChild(new_rect);
    
    var new_rect = document.createElement("canvas");
    new_rect.style.position = 'absolute';
    draw(new_rect, rect_raz, 0);

    new_rect.style.left = -100 +'px';
    new_rect.style.top = -50 +'px';
    new_rect.style.transform = 'rotate(' + 30 + 'deg)';

    document.getElementById(str).appendChild(new_rect);

    var new_rect = document.createElement("canvas");
    new_rect.style.position = 'absolute';
    draw(new_rect, rect_raz, 0);

    new_rect.style.left = (parentPos.width -100) +'px';
    new_rect.style.top = (parentPos.height - 50) +'px';
    new_rect.style.transform = 'rotate(' + 45 + 'deg)';

    document.getElementById(str).appendChild(new_rect);
}

function end_level(){
  var new_rect = document.createElement("div");
  new_rect.id = "end_level";
  new_rect.innerHTML = "Верно";

  //console.log(result_save_str);

  document.getElementById("game").appendChild(new_rect);
}

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  
  a.href= URL.createObjectURL(file);
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(a.href);
};

/*document.querySelectorAll('#bad > #btnSave')[0].addEventListener('click', () => {
  const textArea = document.querySelector('#result');
  
  downloadToFile(textArea.value, 'result.txt', 'text/plain');
});
*/

/*document.getElementById('btnSave').addEventListener('click', () => {
  const textArea = document.querySelector('#result');
  
  downloadToFile(textArea.value, 'result.txt', 'text/plain');
});*/

function result_save(){
    downloadToFile(result_save_str, name_file+'.txt', 'text/plain');
}

function many_rect1(str){
  var new_rect = document.createElement("canvas");
    new_rect.style.position = 'absolute';
    draw(new_rect, rect_raz, 0);

    var parentPos = document.getElementById(str).getBoundingClientRect();

    new_rect.style.left = (parentPos.width- 10) +'px'; //window.screen.availWidth
    new_rect.style.top = (parentPos.height - 30) +'px';
    new_rect.style.transform = 'rotate(' + 60 + 'deg)';

    document.getElementById(str).appendChild(new_rect);
    
    var new_rect = document.createElement("canvas");
    new_rect.style.position = 'absolute';
    draw(new_rect, rect_raz, 0);

    new_rect.style.left = -100 +'px';
    new_rect.style.top = -50 +'px';
    new_rect.style.transform = 'rotate(' + 30 + 'deg)';

    document.getElementById(str).appendChild(new_rect);

    var new_rect = document.createElement("canvas");
    new_rect.style.position = 'absolute';
    draw(new_rect, rect_raz, 0);

    new_rect.style.left = (parentPos.width -0) +'px';
    new_rect.style.top = (parentPos.height - 80) +'px';
    new_rect.style.transform = 'rotate(' + 45 + 'deg)';

    document.getElementById(str).appendChild(new_rect);
}

function input_name(){
    if(document.getElementById('name_input').value != '') {
      name_file = document.getElementById('name_input').value;
      sessionStorage.setItem("name_file", name_file);
      document.getElementById('name_player').style.display = 'none';
    }
    else{
      alert("Введите имя");
    }
}