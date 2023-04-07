
var start_stop = document.getElementById("start_stop");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var start_stop = document.getElementById("start_stop");
var N = parseFloat(document.getElementById("valor_N").value);

var n_iter=0;

function step(){
    if (start_stop.value == "Stop"){ 
    var MJ = life_game();
    M=MJ
    draw();
    n_iter += 1;
setTimeout(function(){ //throttle requestAnimationFrame to 20fps
        
        requestAnimationFrame(step)
    }, 100)

}
}


function start(){

start_stop = document.getElementById("start_stop");
if(start_stop.value == "Stop"){   
      start_stop.value = "Start";
}
else if (start_stop.value == "Start"){
      start_stop.value = "Stop";
      step();}
}
function reset(){
    init();
    draw();
    
}


function life_game() {

    let M1 = [];

for (let i = 0; i < N; i++) {
  M1[i] = [];
  for (let j = 0; j < N; j++) {
    M1[i][j] = 0;
  }
}
    
var count = 0 ;


    var i_right,i_left, j_up,j_down, count;
 

    for (i=0;i<N;i++){
        //console.log(i)
       

        for (j=0;j<N;j++){
            
            
            if (i>0 && i<N-1 && j>0 && j<N-1) { 
                i_left=i-1 ;
                i_right=i+1;
                j_up=j-1;
                j_down=j+1; 
                count =  M[i_left][j] + M[i_left][j_up] + M[i_left][j_down] + M[i][j_down] + M[i][j_up] + M[i_right][j] + M[i_right][j_up] + M[i_right][j_down] ;
          
        } 
        else if (i==0  && j>0 && j<N-1) { 
                i_right=i+1;
                j_up=j-1;
                j_down=j+1; 
                count =   M[i][j_down] + M[i][j_up] + M[i_right][j] + M[i_right][j_up] + M[i_right][j_down] ;

            } 

            else if (i==N-1  && j>0 && j<N-1) { 
                i_left=i-1 ;
                j_up=j-1;
                j_down=j+1; 
                count =  M[i_left][j] + M[i_left][j_up] + M[i_left][j_down] + M[i][j_down] + M[i][j_up] ;         
            } 

            else if (i>0 && i<N-1  && j==0 ) { 
                i_left=i-1 ;
                i_right=i+1;
                j_down=j+1; 
                count =  M[i_left][j]  + M[i_left][j_down] + M[i][j_down] + M[i_right][j]  + M[i_right][j_down] ;
            } 

  
            else if (i>0 && i<N-1  && j==N-1 ) { 
                i_left=i-1 ;
                i_right=i+1;
                j_up=j-1;
                count =  M[i_left][j] + M[i_left][j_up] + M[i][j_up] + M[i_right][j] + M[i_right][j_up]  ;

             }
            else if (i==0 && j==0 ) { 
                count =  M[0][1] + M[1][0] + M[1,1]  ;
            }

            else if (i==N-1 && j==N-1 ) { 
                count =  M[N-1][N-2] + M[N-2][N-1] + M[N-2,N-2]  ; 
            }

            else if (i==N-1 && j==0 ) { 
                count =  M[N-1][1] + M[N-2][0] + M[N-2,1]  ; 
            }
            else if (i==0 && j==N-1 ) { 
                count =  M[0][N-2] + M[1][N-1] + M[1,N-2]  ; 
            }

            if (M[i][j] == 1 && count < 2 ){
                M1[i][j] = 0 // living cells with <2 or >3 neighbors die
            } else if (M[i][j] == 1 && count > 3 ){
                M1[i][j] = 0 // living cells with <2 or >3 neighbors die
            } else if (M[i][j] == 1 && (count == 2 || count == 3)){
                M1[i][j] = 1 // living cells with 2 or 3 neighbors live
            } else if (M[i][j] == 0 &&  count == 3){
                M1[i][j] = 1 // dead cells with 3 neighbors are born
            }
          

        }    
    }    
   return M1;

}
let M = [];


for (let i = 0; i < N; i++) {
  M[i] = [];
  for (let j = 0; j < N; j++) {
    M[i][j] = 0;
  }
}
init();
draw();



M5=life_game()
M=M5;

step();

function change_N (){
init();
draw();

M5=life_game()
M=M5;

step();
}

function init_r() {
    start_stop = document.getElementById("start_stop");
    start_stop.value == "Stop"
    N = parseFloat(document.getElementById("valor_N").value);
    M= [];

for (let i = 0; i < N; i++) {
  M[i] = [];
  for (let j = 0; j < N; j++) {
    M[i][j] = Math.round(Math.random());
  }
}


}
  

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var delta_x_pos = canvas.width/N;
    var delta_y_pos = canvas.height/N;
    for (var i = 0; i < N; i++) {
        var x_pos =  delta_x_pos*i;
        ctx.beginPath()
        ctx.lineWidth = 1;
          // set line color
          ctx.strokeStyle = '#00b5e2';
        ctx.moveTo(x_pos, 0)
        ctx.lineTo(x_pos, canvas.height)
        ctx.stroke()
        for (var j = 0; j < N; j++) {
            var y_pos =  delta_y_pos*j;
            ctx.moveTo(0,y_pos)
            ctx.lineTo(canvas.width,y_pos)
            ctx.stroke()
            //ctx.strokeStyle = 'black';
            if (M[j][i] == 0){ctx.fillStyle = "white";
            } else if (M[j][i] == 1){ctx.fillStyle = "green";
            }

            
            
            ctx.beginPath();
            ctx.rect(x_pos, y_pos, x_pos+delta_x_pos, y_pos+delta_y_pos);
            ctx.fill();
        }
    }
}


//  3 functions and PATTERNS were taken from https://github.com/yuanchuan/game-of-life/blob/master/src/index.js

  /*  Transform RLE format into a 2-dimensional array of 0 and 1s
   */
  function rle(x, y, pattern) {
    return {
      row: y,
      col: x,
      mapping: pattern
        .replace(/(\d+)(\$)/g, ignoreHeadArg(repeat))
        .split('$')
        .map(function(line) {
          var pat = line
            .replace(/\!|\s+/g, '')
            .replace(/(\d+)([bo])/g, ignoreHeadArg(repeat))
          pat += repeat(x - pat.length, 'b')
          return pat.split('').map(function(c) {
            return c === 'b' ? 0 : 1
          })
        })
    }
  }

    function ignoreHeadArg(fn) {
    return function() {
      return fn.apply(null, [].slice.call(arguments, 1))
    }
  }

    function repeat(times, str) {
    if (str.repeat) return str.repeat(+times)
    return new Array(+times + 1).join(str)
  }

   var PATTERNS = {
    "Gosper glider gun -- Bill Gosper 1970": rle(
      36, 9,  '24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b\
               o3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!'
    ),
    "Queen bee shuttle -- Bill Gosper 1970": rle(
      22, 7,  '9bo12b$7bobo12b$6bobo13b$2o3bo2bo11b2o$2o4bobo11b2o$7bobo12b$9bo!'
    ),
    "Lightweight spaceship -- John Conway 1970": rle(
      5, 4,   'bo2bo$o4b$o3bo$4o!'
    ),
    "Washerwoman -- Earl Abbe 1971": rle(
      56, 5,  'o55b$2o4bo5bo5bo5bo5bo5bo5bo5bo5bob$3o2bobo3bobo3bobo3bobo3bobo3bobo3b\
               obo3bobo3bobo$2o4bo5bo5bo5bo5bo5bo5bo5bo5bob$o!'
    ),
    "Ants -- Unknown": rle(
      44, 4,  '2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o2b$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o\
               3b2o$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o$2o3b2o3b2o3b2o3b2o3b2o3b2o3b\
               2o3b2o!'
    ),
    "Bi-clock -- Dale Edwin Cole 1971": rle(
      7, 7,   '2bo4b$2o5b$2b2o3b$bo3bob$3b2o2b$5b2o$4bo!'
    ),
    "4-8-12 diamond -- Honeywell group 1971": rle(
      12, 9,  '4b4o4b2$2b8o2b2$12o2$2b8o2b2$4b4o!'
    ),
    "Pinwheel -- Simon Norton 1970": rle(
      12, 12, '6b2o4b$6b2o4b2$4b4o4b$2obo4bo3b$2obo2bobo3b$3bo3b2ob2o$3bobo2bob2o$4b\
               4o4b2$4b2o6b$4b2o!'
    ),
    "Radial pseudo-barberpole -- Gabriel Nivasch 1994": rle(
      13, 13, '10b2ob$2o9bob$o8bo3b$2b2o3bobo3b2$3bobobo5b2$5bobobo3b2$3bobo3b2o2b$3b\
               o8bo$bo9b2o$b2o!'
    ),
    "Tumbler -- George Collins 1970": rle(
      9, 5,   'bo5bob$obo3bobo$o2bobo2bo$2bo3bo2b$2b2ob2o!'
    ),
    "Turning toads -- Dean Hickerson 1989": rle(
      37, 8,  '15bo6bo14b$14b2o5b2o6b2o6b$6b3obobob2obobob2obobo10b$2b2obo6bobo4bobo\
               4bobo2bob2o2b$o2bobo3bo18b4obo2bo$2obobo27bob2o$3bo29bo3b$3b2o27b2o!'
    ),
    "38P7.2 -- Nicolay Beluchenko 2009": rle(
      13, 11, '4bo3bo4b$o2bobobobo2bo$obo2bobo2bobo$bo2b2ob2o2bob$5bobo5b$2b2o5b2o2b$\
               2bo7bo2b$4bo3bo4b2$bo2bo3bo2bob$2b2o5b2o!'
    ),
    "Blonker -- Nicolay Beluchenko 2004": rle(
      12, 8,  'o2b2o4bo$2o2bob2obo$4bobo$5b2o$7bo$7bo3bo$9bobo$10bo!'
    ),
    "Octagon 2 -- Arthur Taber 1971": rle(
      8, 8,   '3b2o3b$2bo2bo2b$bo4bob$o6bo$o6bo$bo4bob$2bo2bo2b$3b2o!'
    ),
    "Star -- Hartmut Holzwart 1993": rle(
      11, 11, '4b3o4b2$2bobobobo2b2$obo5bobo$o9bo$obo5bobo2$2bobobobo2b2$4b3o!'
    ),
    "Pentadecathlon -- John Conway 1970": rle(
      10, 3,  '2bo4bo2b$2ob4ob2o$2bo4bo!'
    ),
    "Pentapole -- Unknown 1970": rle(
      8, 8,   '2o6b$obo5b2$2bobo3b2$4bobob$7bo$6b2o!'
    ),
    "Cow -- Unknown": rle(
      40, 7,  '2o7b2o2b2o2b2o2b2o2b2o2b2o2b2o5b$2o4bob3o2b2o2b2o2b2o2b2o2b2o2b2o3b2o$\
               4b2obo29bobo$4b2o3b29o2b$4b2obo30bob$2o4bob3o2b2o2b2o2b2o2b2o2b2o2b2o\
               2b2ob$2o7b2o2b2o2b2o2b2o2b2o2b2o2b2o!'
    ),
    "Ellison p4 HW emulator -- Scot Ellison 2010": rle(
      24, 9,  '11b2o11b$4bo3bo6bo3bo4b$3bobo12bobo3b$3bobo12bobo3b$2obobob10obobob2o$\
               2obo16bob2o$3bo16bo3b$3bobo4b2obo4bobo3b$4b2o4bob2o4b2o!'
    ),
    "Swine -- Scot Ellison 2011": rle(
      37, 10, '33bo$9bo2b2o7bo10bobo$o2b2o2bobobo5bo3bo7bo2b2o$o10bo2bobo3bo4bo2bobob\
               2ob2o$o3bo4bo4b2obobo2bob2obo4b2o$3b2o4bob2obo2bobob2o4bo4bo3bo$2ob2ob\
               obo2bo4bo3bobo2bo10bo$3b2o2bo7bo3bo5bobobo2b2o2bo$2bobo10bo7b2o2bo$3bo!'
    ),
    "Caterer on figure eight -- Unknown": rle(
      18, 6,  '4b2o6bo5b$2bob2o4bo3b4o$bo8bo3bo3b$4bo5bo7b$2obo9bo4b$2o9b2o!'
    ),
    "Almosymmetric -- Unknown 1971": rle(
      9, 8,   '4bo4b$2o2bobo2b$obo6b$7b2o$bo7b$o6bob$2obobo3b$5bo!'
    ),
    "Circle of fire -- Unknown": rle(
      11, 11, '4bobo$2bo2bo2bo$3bobobo$b3obob3o$5bo$5ob5o$5bo$b3obob3o$3bobobo$2bo2\
               bo2bo$4bobo!'
    ),
    "Carnival shuttle -- Robert Wainwright 1984": rle(
      38, 7,  '33bo3bo$2o3b2o26b5o$bobobo3bo2bo6b2o3bo2bo7bo2b$b2ob2o2b2o3b2o4b2o2b2o\
               3b2o4bobob$bobobo3bo2bo6b2o3bo2bo7bo2b$2o3b2o26b5o$33bo3bo!'
    )
  }
 

function init() {
    
    
    start_stop = document.getElementById("start_stop");
    start_stop.value == "Stop"
    N = parseFloat(document.getElementById("valor_N").value);
    pattern = document.getElementById("patterns").value;
    if (pattern=="Random"){
        init_r()
    } else {
    console.log(pattern)
    var A = PATTERNS[pattern]
    M= [];
    //console.log(A.mapping.length+" "+A.mapping[0].length)

for (let i = 0; i < N; i++) {
  M[i] = [];

  for (let j = 0; j < N; j++) {

    if (i >= 20 && i<20+A.mapping.length && j >= 20 && j<20+A.mapping[0].length){
            M[i][j] = A.mapping[i-20][j-20];
            //console.log(A.mapping[i-20][j-20])
            //console.log("hola")
    }else {
    M[i][j] = Math.round(0); 
}
}
  }
}

draw();
}

var element = '';
const select = document.getElementById('patterns');

    for (let x = 0; x < Object.keys(PATTERNS).length; x++) {
        let newOption = new Option(String(Object.keys(PATTERNS)[x]),Object.keys(PATTERNS)[x]);
        select.add(newOption,undefined);       
    }