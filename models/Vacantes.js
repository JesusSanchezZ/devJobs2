const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortid = require('shortid');

const vacanteSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: 'El nombre de la vacante es obligatorio',
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    ubicacion: {
        type: String,
        trim: true,
        required: 'La ubicación es obligatoria'
    },
    salario: {
        type: String,
        default: 0,
        trim: true
    },
    contrato: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        lowercase: true
    },
    skills: [String],
    candidatos: [{
        nombre: String,
        email: String,
        cv: String
    }]
});

vacanteSchema.pre('save', function(next) {
    // crear url
    const url = slug(this.titulo);                          // Optiene el valor del titulo, lo pone en minusculas y cambia los espacios por guiones medios, tambíen quita los espacios en blanco al inicio y al final
    this.url = `${url}-${shortid.generate()}`;              // al url al final le agrega un número generado aleatoriamente

    next();
})

module.exports = mongoose.model('Vacante', vacanteSchema);