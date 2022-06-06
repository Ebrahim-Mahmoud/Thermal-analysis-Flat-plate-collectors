// JavaScript code for the program used for drawing the different configurations
// *********************************************************************** 

function draw_connection(){
    let canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    w=canvas.width;
    h=canvas.height;

    context.fillStyle='white';
    context.fillRect(0, 0, w, h);






    h=h-100

    x=100
    y2=200


    function vertical_line(x,y1,y2){
        context.beginPath();
        context.moveTo(x, y1);
        context.lineTo(x, y2);
        context.stroke()
    }
    function horizontal_line(x1,x2,y){
        context.beginPath();
        context.moveTo(x1, y);
        context.lineTo(x2, y);
        context.stroke()
    }

    // Green_Rect(150,h/2)
    function p(x,y) {
        window.onload 
        // var c = document.getElementById("myCanvas");
        var img = document.getElementById("i1");
        context.drawImage(img, x, y,50,50);
        context.shadowBlur=3;
        
        context.shadowColor='black';
    }
    function Green_Rect(x,y){
        // context.fillStyle='green';
        // context.shadowBlur=3;
        
        // context.shadowColor='black';
        // context.fillRect(x,y,50,50);
        
        p(x,y)
        
    
        
        context.beginPath();
        context.moveTo(x+50, y+25);
        context.lineTo(x+100, y+25);
        context.stroke();
        context.beginPath();
        context.moveTo(x, y+25);
        context.lineTo(x-50, y+25);
        context.stroke();
    }
    function draw_series(N_series){
        for (let i = 0; i < N_series; i++) {
            Green_Rect(x,h/2)
            x+=100
        }
        x+=50
    }
    function draw_parallel(N_pararllel) {
        for (let i = 0; i < N_pararllel; i++) {
            Green_Rect(x,(h/N_pararllel)-50+100*i)
        }
        y1=(h/N_pararllel)-50+25
        y2=(h/N_pararllel)-50+100*N_pararllel-75
        //y2=(h/N_pararllel)-50+100*N_pararllel-75

        vertical_line(x-50,y1,y2)
        vertical_line(x+100,y1,y2)
        
        x+=100
        horizontal_line(x,x+50,(h/2)+25)
        x+=100
    }
        

    function connection(s){
        s_after_split=s.split(" ")//seperate the connection pattern by empty space
        console.log(s_after_split)
        for (let i = 0; i < s_after_split.length; i+=1) {
            array_elmenent=s_after_split[i]
            last_letter=array_elmenent[array_elmenent.length-1]
            if(last_letter=="s"){
                console.log("series");
                
                N_series=array_elmenent.slice(0,-1);
                connection_N= N_series+" plates in series";
                draw_series(N_series)
            }else if(last_letter=="p"){
                console.log("parallel")

                N_parallel=array_elmenent.slice(0,-1);
                connection_N=N_parallel+" plates in parrell";
                draw_parallel(N_parallel)
                
            }
        ;
            }
    }
    // s="4s 2p 2p"
    connection(s)


    
    // canvas.height = window.innerHeight;
}

s="4s 4p 2s"
function btn() {
    s=document.getElementById("s").value
    draw_connection()
    canvas.width = x+20;
    canvas.height = y2+200;
    draw_connection()
}

    
    // draw_connection()
    // canvas.width = x+20;
    // canvas.height = y2+200;
    // draw_connection()

    

