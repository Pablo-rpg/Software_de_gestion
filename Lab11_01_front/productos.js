function listar() {
    console.log("Entrando a listar...");
    $.ajax({
        url: 'http://localhost:3999/api/productos',
        type: 'GET',
        success: function (respuesta) {
            cargarCategoria();
            console.log(respuesta);
            var dataFila = '';
            if (respuesta.productos.length > 0) {
                for (const i in respuesta.productos) {
                    var varProducto = respuesta.productos[i];
                    dataFila += "<tr>";
                    dataFila += "<td>" + varProducto.idProducto + "</td>";
                    dataFila += "<td>" + varProducto.descripcion + "</td>";
                    dataFila += "<td>" + varProducto.precio + "</td>";
                    dataFila += "<td>" + varProducto.unidades + "</td>";
                    dataFila += "<td>" + varProducto.categoria[0].nomCategoria + "</td>";
                    dataFila += "<td>" +
                        "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal' onclick='buscar(" +
                        varProducto.idProducto + ")'>Editar</button>" +
                        "</td>";
                    dataFila += "</tr>"
                }
                document.getElementById("dataProductos").innerHTML = dataFila;
            }
        }
    });
}

function guardar() {
    console.log("ENTRANDO A GUARDAR...");
    $.ajax({
        url: 'http://localhost:3999/api/productos/save',
        type: 'POST',
        data: {
            idProducto: $("#txtIdProducto").val(),
            descripcion: $("#txtDescripcion").val(),
            precio: $("#txtPrecio").val(),
            unidades: $("#txtUnidades").val(),
            idCategoria: $("#cboCategoria").val()
        },
        success: function (respuesta) {
            console.log(respuesta);
            listar();
        }
    });
}

function buscar(idProducto) {
    console.log("Buscando el idProducto:" + idProducto);
    $.ajax({
        url: 'http://localhost:3999/api/productos/' + idProducto,
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            var varProducto = respuesta.producto;
            $("#txtIdProducto").val(varProducto.idProducto);
            $("#txtDescripcion").val(varProducto.descripcion);
            $("#txtPrecio").val(varProducto.precio);
            $("#txtUnidades").val(varProducto.unidades);
            $("#cboCategoria").val(varProducto.idCategoria);
            

        }
    });
}
function limpiarForm(){
    $("#txtIdProducto").val(0);
    $("#txtDescripcion").val("");
    $("#txtPrecio").val("");
    $("#txtUnidades").val("");
    cargarCategoria();
}
function cargarCategoria() {
    $.ajax({
        url: 'http://localhost:3999/api/categorias',
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            var dataFila = '';
            var dataCategorias = respuesta.categorias;
            if( dataCategorias.length > 0){
                dataFila +="<option value='0'>-- SELECCIONE -- </option>";
                for( const i in dataCategorias){
                    var varCategoria = dataCategorias[i];
                    dataFila += "<option value='"+varCategoria.idCategoria+"'>"+
                                varCategoria.nomCategoria +
                                "</option>";
                }
            }
            document.getElementById("cboCategoria").innerHTML = dataFila;
        }
    });
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
            var tablaProducto = document.getElementById("tablaProductos");
            var tablaJson = doc.autoTableHtmlToJson(tablaProducto);
            doc.autoTable( tablaJson.columns, tablaJson.data);
            doc.save("producto.pdf");

        }
    })
   

}
function crearReporte() {
    console.log("Ingresando a la funcion crearReporte");
    $.ajax({
        url: 'http://localhost:3999/api/reporte/productosPorCategoria',
        type: 'GET',
        success: function (respuesta) {
            var dataProductos = respuesta.productos;
            console.log(dataProductos);
            var xValues = [];
            var yValues = [];
            if (dataProductos.length > 0) {
                for (const i in dataProductos) {
                    // console.log(dataProductos[i].count + ':'+ dataProductos[i].categoria[0])
                    xValues.push(dataProductos[i].categoria[0]);
                    yValues.push(dataProductos[i].count);
                }
            }
            var canvas = document.getElementById("grafico");
            var context = canvas.getContext("2d");
            if(typeof chart != "undefined"){
                chart.destroy();
            }


            new Chart(
                context,// ID DEL CANVAS
                {
                    type: 'bar',
                    data: {
                        labels: xValues,
                        datasets: [{
                            label: 'REPORTE',
                            backgroundColor:'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            borderWith: 1,
                            data: yValues
                        }]
                    }
                }
            );
        }
    });
}