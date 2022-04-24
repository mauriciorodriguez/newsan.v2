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
