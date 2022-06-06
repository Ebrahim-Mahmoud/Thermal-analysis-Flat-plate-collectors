// JavaScript code for the web application used for calculation 
// ****************************************************************
//function responsiple filling the inputs with sample numbering 
function full_input(){
   
    document.getElementById("gt").value=687.5;
    document.getElementById("tau").value=0.87;
    document.getElementById("alpha").value=0.92;
    document.getElementById("ul").value=6;
    document.getElementById("k").value=387;
    document.getElementById("delta").value=0.0005;
    document.getElementById("w").value=0.15;
    document.getElementById("do").value=0.015;
    document.getElementById("kb").value=330;
    document.getElementById("b").value=0.0075;
    document.getElementById("gamma").value=0.002;
    document.getElementById("di").value=0.0135;
    document.getElementById("hfi").value=800;
    document.getElementById("m_dot").value=0.02;
    document.getElementById("ac").value=2.1;
    document.getElementById("Tfi").value=50;
    document.getElementById("Ta").value=20;
    document.getElementById("Connection_pattern").value="2s 2p 2p";
}

// Function responsiple for reading the inputs from input buttons
function read_input(){
    gt = parseFloat(document.getElementById("gt").value);
    tau =parseFloat(document.getElementById("tau").value);
    alpha =parseFloat(document.getElementById("alpha").value);
    ul=parseFloat(document.getElementById("ul").value);
    k=parseFloat(document.getElementById("k").value);
    delta=parseFloat(document.getElementById("delta").value);
    W=parseFloat(document.getElementById("w").value);
    d_o=parseFloat(document.getElementById("do").value);
    kb=parseFloat(document.getElementById("kb").value);
    b=parseFloat(document.getElementById("b").value);
    gamma=parseFloat(document.getElementById("gamma").value);
    di=parseFloat(document.getElementById("di").value);
    hfi=parseFloat(document.getElementById("hfi").value)
    m_dot=parseFloat(document.getElementById("m_dot").value);
    Ac=parseFloat(document.getElementById("ac").value);
    Tfi=parseFloat(document.getElementById("Tfi").value);
    Ta=parseFloat(document.getElementById("Ta").value);
    // varaible for the connection pattern, EX: 4plates in series then 2 plates in parrell =>4s2p 
    s=document.getElementById("Connection_pattern").value;
}
// define list of rows of the table
var row =[];
// define list each cell in the row
var cell1=[];
var cell2=[];
var cell3=[];
var cell4=[];
var cell5=[];
// variable showen in No. column
index_table=1;
// Define variable to sum the total Q, then this variable will be shown in the table 
Q_u_total_final=0;
// Define list of all eta , then average of eta will be shown in the table
eta_list=[];
// Function responsiple for creating new row in the table
function row_table(index_table){
    i=index_table
    table = document.getElementById("myTable");
    row[i] = table.insertRow(-1); //insert row at the end of the table
    cell1[i] = row[i].insertCell(0);
    cell2[i] = row[i].insertCell(1);
    cell3[i] = row[i].insertCell(2);
    cell4[i] = row[i].insertCell(3);
    cell5[i] = row[i].insertCell(4);

    cell1[i].innerHTML = index_table;
    cell2[i].innerHTML = connection_N;
    cell3[i].innerHTML = Tfo.toFixed(2)+' &deg;C';
    cell4[i].innerHTML = Q_table;
    cell5[i].innerHTML = (eta*100).toFixed(2)+"%";
    
}
// function of the equation of one plate
function plate(){
    // calculate F
    m=Math.sqrt(ul/(k*delta))
    constant1=(W-d_o)/2
    F=Math.tanh(m*constant1)/(m*constant1)
    // calculate F_dash
    F_dash=(1/ul)/(W*(1/(ul*(d_o+(W-d_o)*F))+1/(Math.PI*di*hfi)))
    // calculate F_R
    cp=4186
    constant2=(m_dot*cp)/(Ac*ul)
    F_R=constant2*(1-Math.exp(-F_dash/constant2))
    // calculate Q_u & eta
    Q_u=Ac*F_R*(gt*tau*alpha-ul*(Tfi-Ta))
    eta=Q_u/(Ac*gt)
    // calculate outlet fluid temperature
    Tfo=Tfi+Q_u/(m_dot*cp)
}
// Function for calcutions in case of parrell connection
function parallel(N_parrell){
    m_dot=m_dot/N_parrell
    hfi_inital=hfi
    hfi=Math.sqrt(1/N_parrell)*hfi
    plate()
    Q_u_total=Q_u*N_parrell
    eta_total=eta
    Tfi=Tfo
    hfi=hfi_inital
    m_dot=m_dot*N_parrell
    console.log(N_parrell+" plates in parrell with Qu total="+Q_u_total+"and efficiency="+eta_total)
    // Qu for show in the table
    Q_table=Q_u.toFixed(2)+" Watt for 1 plate \n"+Q_u_total.toFixed(2)+" Watt for "+N_parrell+" plates"
    row_table(index_table)
    index_table+=1

    Q_u_total_final+=Q_u_total
    eta_list.push(eta_total)
}
// Function for calcutions in case of series connection
function series(N_series){
    Q_u_list=[]
    for (let i = 0; i < N_series; i++) {
        plate();
        Tfi=Tfo;
        Q_u_list[i]=Q_u;
        connection_N="1 plate in series"
        Q_table=Q_u.toFixed(2)+" Watt"
        row_table(index_table)
        index_table+=1
      }
      //sum of the list of  Q_u
      Q_u_total=Q_u_list.reduce((a, b) => a + b, 0); 
      eta_total=Q_u_total/(N_series*Ac*gt);
      Tfi=Tfo;

      Q_u_total_final+=Q_u_total
      eta_list.push(eta_total)
}
// Function responsiple for creating the "Total" row in the table
function total_row(){
    i=index_table
    table = document.getElementById("myTable");
    row[i] = table.insertRow(-1);
    row[i].bgColor="yellow";//change color to yellow
    cell1[i] = row[i].insertCell(0);
    cell2[i] = row[i].insertCell(1);
    cell3[i] = row[i].insertCell(2);
    cell4[i] = row[i].insertCell(3);
    cell5[i] = row[i].insertCell(4);

    cell1[i].innerHTML = "Total";
    cell2[i].innerHTML = s
    cell3[i].innerHTML = Tfo.toFixed(2)+' &deg;C';
    cell4[i].innerHTML = Q_u_total_final.toFixed(2)+" Watt";

    const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    // cell5[i].innerHTML = (eta*100).toFixed(2)+"%";
    cell5[i].innerHTML = (average(eta_list)*100).toFixed(2)+"%";
   
}
/*Function responsible for reading the connection pattern
if the connection is parrell => parallel calculations (parallel function) will be done
if the connection is series => series calculations (series function) will be done
*/
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
            series(N_series)
        }else if(last_letter=="p"){
            console.log("parallel")

            N_parallel=array_elmenent.slice(0,-1);
            connection_N=N_parallel+" plates in parrell";
            parallel(N_parallel)
        }
       ;
        }
}
// Solve Function is executed after pressing on Solve button
function Solve(){
    read_input()
    connection(s)
    total_row() 

    index_table=1 //set the start numbering =1
    Q_u_total_final=0 //return the sum of previous Q to zero
    eta_list=[] //empty the list of eta
}
// Function to clear the table after pressing of clear button
function del(){
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }
    }