# Pasos Para crear Instancia EC2 con Apache

## Índice

- [Creacion de Instancia](#creacion-de-instancia)
- [Pasos para ingresar desde Local](#pasos-para-ingresar-desde-local)
- [Configurar entorno de la MV](#configurar-entorno-de-la-mv)
- [IP estatica](#ip-estatica)
- [Configurar System Service](#configurar-system-service)
- [Desplegar Back de forma manual](#desplegar-back-de-forma-manual)
- [Iniciar proyecto en segundo plano](#iniciar-proyecto-en-segundo-plano)


## Creacion de Instancia

En AWS ir a EC2, luego en el Menú de la izquierda escoger "Instancias" donde al al lado derecho se encuentra la opcion "Lanzar instancias" para crear una nueva, en esta opción se hara la siguiente configuración: 

Nombre de la instancia a crear

Imágenes de aplicaciones y sistemas operativos (Amazon Machine Image):

    Ubuntu Server 22.04

Tipo de instancia:

    t2.micro

Par de claves (inicio de sesión)

Crear par de claves:

    nombre

    Tipo de par de claves: RSA

    Formato de archivo de clave privada: .pem

######  &nbsp; &nbsp; &nbsp;  Guardar el archivo .pem en el pc y compartirlo a los miembros del equipo que deseen ingresar a la maquina

</br>

Crear grupo de seguridad o asignar uno ya creado (este paso se puede hacer despues)

	Nombre del grupo de seguridad:

	Descripcion: (Breve descripcion del titulo)

	Reglas IP:
		Tipo: SSH  
		Protocolo: TCP
		Rango de puertos: 22
		Origen: perzonalizada
		Descripcion: IP-Usuario

	Regla de Apache:
		Tipo: HTTP (Custom TCP rule)
		Protocolo: TCP 
		Rango de puertos: 80
		Origen: perzonalizada + IP del EC2 (Al lanzar primera vez dejar vacio IP o tipo Anywere)
		Descripcion:ApachePort

Dejar el resto de configuracion de la intancia como esta por defecto y dar en "Lanzar instancia"

(Dado el caso de quedar sin nombre la instancia buscarla por el nombre de clave - para renombrar instacia dar click derecho sobre el nombre)

# Pasos para ingresar desde Local

Por Git Bash ubicar carpeta donde se encuentre clave y darle permisos:

	chmod 400 nuestrakey.pem

Mosstrar los permisos:

	ls -al

Luego para conectarnos es:

	ssh -i nuestrakey.pem ubuntu@ipDeInstancia	

esta siempre servira para conectarnos a la MQ, ej: 

    ssh -i ubuntukey.pem ubuntu@5.46.92.04

el "-i" es para indicar la clave

Nota: en EC2 Instancias --> Acciones --> conectarse: Se ve el nombre de usuario y direccion de IP Publica de la instancia

Al conectarnos a la MQ por primera vez dar Si/yes para seguir conectandose


# Configurar entorno de la MV

hacer que se descarguen todas las actualizaciones (solo se hace una vez por 
estar conectados a la maquina de AWS)

    sudo apt-get update

Instalar todo lo que haga falta (paso no requerido)

    sudo apt-get upgrade

Instalar Apache-maven

    sudo apt-get install apache2


Instalar JDK 

	sudo apt-get install openjdk-18-jdk -y

Instalar Maven 3.8.6

	sudo apt-get install maven 



para que maven tome la jdk que queremos y no la que maven traiga como ultima

	sudo apt install default-jdk -y	

En dado caso que se necesite remover maven:

    sudo apt-get remove maven


Instalar AWS CLI

    sudo apt install awscli



Terminar proceso / desconectar pc de Maquina AWS

    Ctrl + c / exit


En la "Direccion publica" de la descripcion de nuestra instancia de EC2, copiar la direccion y abrirla en otra pestaña para ver corriendo el Apache

</br>

------------------------------------------------

# IP estatica
## Ruta para crearla
- Menu EC2
- Red y Seguridad
- Direcciones IP elásticas
- Asignar la direccion IP elástica
- config 
- Grupo fronterizo de red (el que tenga por defecto)
- Grupo de direcciones IPv4 de Amazon
- Asignar
## Ruta para asignarla a la instancia
Se selecciona la IP fija recien creada y en "Acciones" dar en "Asignar la direccion IP elástica"

- Tipo de recurso: instancia
- Instancia: (La EC2 de nosotros)
- Asociar

# Configurar  System Service
En el POM.xml del proyecto, definir el nombre del .jar generado al compilar:

```
<build>
    <finalName>consoleapp</finalName>
```

Luego en la instancia EC2 se crea el archivo .service:
```
$ touch consoleapp.service
```
Dentro de este archivo se guardara la siguiente información:
```
[Unit]
Description=REST Service
After=syslog.target

[Service]
User=ubuntu
ExecStart=/usr/bin/java -jar /home/ubuntu/consoleapp.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```
Mover el archivo service a su apropiada ubicacion:
```
$ sudo cp consoleapp.service /etc/systemd/system/consoleapp.service
```
seguido a esto se debe reiniciar la configuracion del Systemd manager con:
```
$ sudo systemctl daemon-reload
```
OPCIONAL: Si se quiere correr el servicio con spring boot app, se puede usar el siguiente comando:
```
$ sudo systemctl enable consoleapp.service
```
</br>


# Desplegar Back de forma manual

Recomendacion: remover jar antiguo en instancia ec2

En local instalar Maven y luego en la raiz del proyecto backend ejecutar el comando:

    mvn clean install

Para subir el .jar creado al compilar el proyecto en local a la instancia:

    scp -i clave.pem ruta_archivo_jar usuario@ip-Host:Ruta_destino

Ejemplo de comando anterior:

    scp -i Team78-Backend.pem consoleapp.jar ubuntu@5.46.92.04:/home/ubuntu/

Luego entramos a la instancia EC2 dando el siguiente comando para iniciar el proyecto:

    java -jar consoleapp.jar

# Iniciar proyecto en segundo plano

Correr proyecto en segundo plano para que no se pare al salir de instancia EC2:

    nohub <comando> &

Ejemplo con comando para iniciar proyecto:

	nohup java -jar consoleapp.jar &

Al ejecutar el comando, respondera un numero, ej: [1] 2635

para parar proceso en segundo plano es con el comando kill + numero, ej: kill 2635

###### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Si el comando kill no funciona, se puede reiniciar la instancia

