exports.mostrarTrabajos = (req,res) => {
    res.render('home', {
        nombrePagina: 'devJobs',
        tagLine: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        barra: true,
        boton: true
    })
}