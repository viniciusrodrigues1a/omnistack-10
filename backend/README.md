## Pré-requisitos

* yarn

## Configurando

Configurar a **conexão com banco de dados** em src/index.js

```js
mongoose.connect('string de conexão com mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});
```

Configurar a **porta** em src/index.js

```js
app.listen(porta);
```

## Instalando os módulos

```sh
yarn install axios cors express mongoose
```

## Iniciando o projeto

```sh
yarn start
```
