
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
    //console.log("n_iter "+n_iter)
//requestAnimationFrame(step);

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
//console.log("M="+M)

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
          

            //console.log(i+" "+j+" "+count)
        }
         
    }
    //console.log("M1="+M1)
    
   return M1;

}


let M = [];

let rows = N;
let columns = N;

for (let i = 0; i < rows; i++) {
  M[i] = [];
  for (let j = 0; j < columns; j++) {
    M[i][j] = 0;
  }
}
init();
draw();
//console.log(N)


M5=life_game()
M=M5;

step();

function change_N (){
init();
draw();
//console.log(N)


M5=life_game()
M=M5;

step();
}

function init() {
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

//return MM;

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
            if (M[i][j] == 0){ctx.fillStyle = "white";
            } else if (M[i][j] == 1){ctx.fillStyle = "green";
            }

            
            
            ctx.beginPath();
            ctx.rect(x_pos, y_pos, x_pos+delta_x_pos, y_pos+delta_y_pos);
            ctx.fill();
        }
    }
}

guns="..........................0,1,...........\
........................0,1,0,1,...........\
..............0,1,1,.....0,1,1,...........0,1,1,\
.............0,1,..0,1,...0,1,1,...........0,1,1\
..0,1,1,.......0,1,....0,1,..0,1,1,..............\
..0,1,1,.......0,1,..0,1,0,1,1,...0,1,0,1,...........\
............0,1,....0,1,......0,1,...........\
.............0,1,..0,1,....................\
..............0,1,1,......................\
.........................0,1,............\
..........................0,1,1,..........\
.........................0,1,1,...........\
.......................................\
.......................................\
.......................................\
....................0,1,1,................\
........0,1,0,1,.........0,1,1,...............\
........0,1,.0,1,.......0,1,.................\
0,1,.........0,1,1,..........0,1,1,............\
0,1,.......0,1,..0,1,1,.......0,1,0,1,............\
....0,1,1,....0,1,1,........0,1,.....0,1,1,.......\
...0,1,...0,1,.0,1,.........0,1,.0,1,.0,1,.0,1,......\
........0,1,0,1,..........0,1,.....0,1,0,1,......\
.......................0,1,0,1,....0,1,0,1,....\
........................0,1,1,.....0,1,0,1,...\
..................................0,1,...\
..................................0,1,1,.."

//var guns1 = guns.replace(/./, "-");
const search = '.';
const replaceWith = '0,';
const guns1 = guns.split(search).join(replaceWith);
console.log(guns)
console.log(guns1)
guns_num=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,10,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,]
console.log(guns_num.length)
