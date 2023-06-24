///////////////////GET, POST, PUT Y DELETE

function getReservaciones(){
    $.ajax({
        url:"http://129.151.123.186:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarReservation(respuesta);
        }
    });

}

function postReservaciones(){

    if ( 
        $("#startDate").val().length==0 || 
        $("#devolutionDate").val().length==0 ){
        alert("Todos los campos son obligatorios");
}else{
    let cajas = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        client:{idClient:+$("#select-client").val()},
        Tool:{idTool:+$("#select-tool").val()},
    };
    console.log(cajas);
     $.ajax({
        url:"http://129.151.123.186:8080/api/Reservation/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la reservacion");
           window.location.reload();
            }
        });
    }
    
}
function putReservaciones(){
    
}
function deleteReservaciones(){
    
}
function getTool_Reservaciones(){
    $.ajax({
        url:"http://129.151.123.186:8080/api/Tool/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        console.log(respuesta);
            let $select = $("#select-tool");
            $.each(respuesta, function (id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });
    
}
function getClient_Reservaciones(){
    $.ajax({
        url:"http://129.151.123.186:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            })
        }
    });
}
function pintarReservation(respuesta){
    let myTable="<table class='min-w-full border text-center'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].tool.name+"</td>";
        myTable+="<td> <button onclick='putReservaciones("+respuesta[i].id+")'class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteReservaciones("+respuesta[i].id+")'class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Borrar</button> "
       
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}