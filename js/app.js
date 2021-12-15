//@ts-check
var grid = new Muuri('.grid', {
    layout: {
        fillGaps: false,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: false
    }
});
window.addEventListener('load', function () {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');
    var enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach(function (elemento) {
        elemento.addEventListener('click', function (evento) {
            evento.preventDefault();
            enlaces.forEach(function (enlaces) { return enlaces.classList.remove('activo'); });
            evento.target.classList.add('activo');
            var categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter("[data-categoria = ".concat(categoria, "]"));
        });
    });
    document.querySelector('#barra-busqueda').addEventListener('input', function (evento) {
        var busqueda = evento.target.value;
        grid.filter(function (item) { return item.getElement().dataset.etiquetas.includes(busqueda); });
    });
    var overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach(function (elemento) {
        elemento.addEventListener(('click'), function () {
            var ruta = elemento.getAttribute('src');
            var descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });
    document.querySelector('#btn-cerrar').addEventListener('click', function () {
        overlay.classList.remove('activo');
    });
    overlay.addEventListener('click', function (evento) {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });
});
