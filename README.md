## Guia de usuario

- Abrir el proyecto BackendTodo con Visual Studio
- Editar el campo "DevConnection" del archivo "appsettings.json" de la carpeta raiz con la cadena de coneccion a la base de datos
- Para crear la base de datos. En el menu superior de visual studio Herramientas > Administracion de paquete NuGet > Consola del Administrador de paquetes. Correr el comando:
```sh
Update-database
```
- Dejar corriendo el proyecto en el background

##

- Abrir una consola en la carpeta CRUDTodo
- Correr el siguiente comando para correr el frontend de forma local(Angular CLI)
```sh
ng serve --o
```

## Consigna

Implementar una solución que permita guardar y listar una/s Entidad/es TODOs con 
las siguientes características:

TODO (To do, listado de tareas por hacer)

A) ID

B) DESCRIPCION (EL TODO a hacer)

C) Estado

D) Foto/Imagen/Documento adjunta a la DESCRIPCION

A implementar:
1. Listado de TODOs: METHOD GET (Respetar convenciones en la url)
2. Listado filtrado por A B y C: METHOD GET (Utilizar query parameters y respetar 
convenciones)
3. Alta del TODO: METHOD POST (Respetar convenciones en la url). Que reciba la 
foto/imagen/documento también.
4. Cambio de estado, de pendiente a resuelta

Consideraciones:
1. Construir una Solución Back End utilizando alguna de las siguientes tecnologías:
a. .NET /NodeJS/PHP
b. API REST con los servicios a consumir desde el front
c. Proyecto Angular/React/otra tecnología Front para gestionar los TODOs, que 
consuma los servicios del proyecto API REST.
2. Persistencia en DB a elección
3. Incluir el archivo de configuracion README.md en el directorio raíz del proyecto, con 
los pasos a seguir para la instalación y prueba del mismo luego del clonado del 
repositorio.
Todos los pasos para la correcta instalación del mismo deben estar especificados, por 
lo cual se aconseja seguir los lineamientos recomendados: https://el-bid.github.io/guia-de-publicacion/documents/documentacion/
