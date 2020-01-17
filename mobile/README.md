## Pré-requisitos

* yarn
* expo

## Configurando

Configurar a *baseURL* do axios em src/services/api.json

```js
const api = axios.create({
  baseURL: *baseURL*,
});
```

## Instalando os módulos

```sh
yarn install expo-location react-native-gesture-handler react-native-maps react-native-reanimated react-native-safe-area-context react-native-screens react-native-webview react-navigation react-navigation-stack @react-native-community/masked-view
```

## Iniciando o projeto

```sh
yarn start
```
