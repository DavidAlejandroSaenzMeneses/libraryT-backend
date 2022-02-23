# 📖Library-T-Backend

_Backend de la app library-T, la cual es una simulacion de prestamos de una biblioteca_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos._

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_Debemos tener instaladas las siguientes aplicacion o marcos de trabajo_
* Node.js
* PostgresSql

### Instalación 🔧

_Pasos Para Instalacion y Configuracion Inicial_

_Obtener copia del repositorio_
_Puede descargar directamente desde de GitHub o ejecutar el siguiente comando en su consola_
```
gh repo clone DavidAlejandroSaenzMeneses/libraryT-backend
```

_Una vez tenemos la copia local, accedemos a ella desde lina de comando y procedemos a intalar las dependencias_

```
npm install
```
_Es muy importante configurar las credenciales de la base de datos para que los pasos posteriores funcionen correctamente, por eso debemos abrir el archivo config.json que se encuentra en la carpeta (./config/config.json) y modificar los valores, a continuacion un ejemplo:_

```
"development": {
    "username": "postgres",
    "password": "5b05b7717",
    "database": "library-t",
    "host": "127.0.0.1",
    "logging": false,
    "dialect": "postgres",
    "define": {
      "timestamps": false
    }
  }
```
_

## Despliegue 📦


_Si realizamos todos los pasos previos deberiamos tener todo lo necesario para generar el demo con todos los datos, para esto vamos a ejecutar el siguiente comando_

```
npm run build:demo
```

_Ya tenemos el demo listo, podemos iniciar nuestro servidor y conectarnos desde el front, ejecutamos _

```
npm start
```

## Construido con 🛠️

_Tecnologias utilizadas_

* [Express](https://expressjs.com/es/) - Libreria gestion del API
* [Sequelize](https://sequelize.org/) - ORM utilizado para la gestion de BD
* [Sequelize-cli](https://sequelize.org/master/manual/migrations.html) - Interfaz utilizada para el levantamiento y gestion de la BD
* [PostgreSQL](https://www.postgresql.org/) - Base de datos


## Autores ✒️

* **David Alejandro Saenz Meneses** - *Desarrollo Full Stack* 

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto. 



---
⌨️ con ❤️ por [David Saenz😊]