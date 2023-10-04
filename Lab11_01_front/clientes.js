function listar() {
    console.log("Entrando a listar...");
    $.ajax({
        url: 'http://localhost:3999/api/clientes',
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            var dataFila = '';
            if (respuesta.clientes.length > 0) {
                for (const i in respuesta.clientes) {
                    var varCliente = respuesta.clientes[i];
                    dataFila += "<tr>";
                    dataFila += "<td>" + varCliente.idCliente + "</td>";
                    dataFila += "<td>" + varCliente.nomCliente + "</td>";
                    dataFila += "<td>" + varCliente.email + "</td>";
                    dataFila += "<td>" + varCliente.direccion + "</td>";
                    dataFila += "<td>" + varCliente.telefono + "</td>";
                    dataFila += "<td>" + varCliente.estado + "</td>";
                    dataFila += "<td>" +
                        "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal' onclick='buscar(" +
                        varCliente.idCliente + ")'>Editar</button>" +
                        "</td>";
                    dataFila += "</tr>"
                }
                document.getElementById("dataClientes").innerHTML = dataFila;
            }
        }
    });
}

function guardar() {
    console.log("ENTRANDO A GUARDAR...");
    $.ajax({
        url: 'http://localhost:3999/api/clientes/save',
        type: 'POST',
        data: {
            idCliente: $("#txtIdCliente").val(),
            nomCliente: $("#txtNomCliente").val(),
            email: $("#txtEmail").val(),
            direccion: $("#txtDireccion").val(),
            telefono: $("#txtTelefono").val(),
            estado: $("#txtEstado").val()
        },
        success: function (respuesta) {
            console.log(respuesta);
            listar();
        }
    });
}

function buscar(idCliente) {
    console.log("Buscando el idCliente:" + idCliente);
    $.ajax({
        url: 'http://localhost:3999/api/clientes/' + idCliente,
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            var varCliente = respuesta.cliente;
            $("#txtIdCliente").val(varCliente.idCliente);
            $("#txtNomCliente").val(varCliente.nomCliente);
            $("#txtEmail").val(varCliente.email);
            $("#txtDireccion").val(varCliente.direccion);
            $("#txtTelefono").val(varCliente.telefono);
            $("#txtEstado").val(varCliente.estado);

        }
    });
}
function limpiarForm(){
    $("#txtIdCliente").val(0);
    $("#txtNomCliente").val("");
    $("#txtEmail").val("");
    $("#txtDireccion").val("");
    $("#txtTelefono").val("");
    $("#txtEstado").val("");
}
function exportarPDF(){
    console.log("INGRESANDO A exportar PDF")
    Swal.fire({
        title:"Desea exportar a PDF?",
        showDenyButton: true,
        confirmButtonText: "SI",
        denyButtonText: "NO",    
    }).then((result)=> {
        if (result.isConfirmed){
            const doc = new jsPDF();
            var tablaCliente = document.getElementById("tablaClientes");
            var tablaJson = doc.autoTableHtmlToJson(tablaCliente);
            doc.autoTable( tablaJson.columns, tablaJson.data);
            doc.save("cliente.pdf");

        }
    })
   

}