# Data Modelling

## Embebido

### Embeber datos directamente en la DB

```js
const gatito = {
  nombre: 'Trufa',
  edad: 27,
  colores: ['gris', 'negro', 'rojo'],
  refugio: {
    nombre: 'Hogar gatuno',
    localidad: 'CABA',
    voluntarios: [{}, {}],
  },
};
```

### Embeber datos mediante una query

```js
const adoptante = {
  id: '',
  nombre: 'Estefania Avalos',
  gatitos: [
    '5f8b515431281d4c9ace7695',
  ],
};
```

## Referencing 

Para cuando no queremos toda la informacion, solo una referencia

### Child referencing

En el schema de mongoose lo escribimos asi 

```js
  gatitos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Gatito',
    },
  ],
  ```

Y luego "populamos" (perdon, Ivi) la query 

```js
const refugios = await Refugio.findById(req.params.id).populate('gatitos');
```

### Parent referencing 

Se utiliza "virtual populate". 

El padre no tiene referencia a quienes son sus hijos, pero en otra coleccion tenemos los hijos, cada uno de ellos guardando referencia a quien es su padre. 

El virtual populate nos permite completar el documento del padre, mirando la informacion de los hijos. 

Pasamos un segundo parametro en Schema: 
```js
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
```

y luego la funcion para el virtual: 
```js
refugiosSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'refugio', 
  localField: '_id'
})
```

Finalmente, el populate en el controller: 

```js
const refugios = await Refugio.findById(req.params.id).populate('gatitos').populate('reviews');
```
