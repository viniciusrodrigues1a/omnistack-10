## :bookmark_tabs: Pré-requisitos

* yarn

## :wrench: Configurando

Configurar a **conexão com banco de dados** em src/index.js

```js
mongoose.connect('string de conexão com mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});
```

Configurar a **porta de conexão** em src/index.js

```js
app.listen(porta);
```

## :inbox_tray: Instalando os módulos

```sh
yarn install axios cors express mongoose
```

## :rocket: Iniciando o projeto

```sh
yarn start
```
