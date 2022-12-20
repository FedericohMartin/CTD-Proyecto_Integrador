# Documentación de infraestructura

Bienvenido a la documentación de infraestructura de nuestro proyecto de renta de vehículos para Digital Booking. A continuación encontrarás información detallada sobre la arquitectura de la aplicación, el proceso de despliegue, la gestión de errores y mucho más.

<a name="inicio"></a>
## Índice

- [Descripción general del proyecto](#descripción-general-del-proyecto)
- [Arquitectura de la aplicación](#arquitectura-de-la-aplicación)
- [Detalles de despliegue](#detalles-de-despliegue)
- [Acceso a la aplicación](#acceso-a-la-aplicación)
- [Acceso a los servicios de AWS](#acceso-a-los-servicios-de-aws)
- [Configuración de pipelines](#configuración-de-pipelines)
- [Mantenimiento y actualizaciones](#mantenimiento-y-actualizaciones)
- [Gestión de integridad de datos](#gestión-de-integridad-de-datos)
- [Monitoreo y supervisión](#monitoreo-y-supervisión)
- [Gestión de dependencias](#gestión-de-dependencias)

## Descripción general del proyecto

El proyecto de renta de vehículos es una plataforma en línea que permite a los usuarios reservar y alquilar vehículos de una flota de distintos modelos y marcas. La aplicación ofrece una amplia variedad de opciones de alquiler, incluyendo alquileres a corto y largo plazo. Además, la aplicación incluye un panel de control de administrador para gestionar la flota y las reservas.

[Volver al inicio](#inicio)

## Arquitectura de la aplicación
[Diagrama de arquitectura](Diagrama_Infraestructura_Grupo_11_C12_Sprint_1.pdf)

La arquitectura de la aplicación incluye un front-end desarrollado con React y un back-end desarrollado con Java Springboot. El front-end se despliega en un Bucket S3 de AWS y se accede a través de una URL pública. El back-end se e

[Volver al inicio](#inicio)

## Detalles de despliegue
El proceso de CI/CD se realiza a través de GitLab. Cuando se realiza un push a la rama principal del repositorio, GitLab inicia un proceso de integración y entrega continua que incluye las pruebas automatizadas y el despliegue del front-end en un Bucket S3 de AWS y del back-end en una instancia EC2 de AWS. La instancia EC2 se encuentra configurada con un rol de IAM y un grupo de seguridad de red que permiten el acceso a la base de datos y al resto de servicios de AWS necesarios. La aplicación se escala horizontalmente en función de la carga de trabajo, aumentando el número de instancias EC2 cuando se requiere mayor capacidad.

[Volver al inicio](#inicio)

## Acceso a la aplicación
Para acceder a la aplicación, vaya a la siguiente URL: [http://front-dev-team11-c12.s3-website.us-east-2.amazonaws.com]. Se le pedirá que inicie sesión con su nombre de usuario y contraseña o en su defecto registrarse. Si tiene un rol de administrador, también tendrá acceso al panel de control de administrador con las respectivas credenciales.

[Volver al inicio](#inicio)

## Acceso a los servicios de AWS
Para acceder a la consola de AWS, vaya a [https://us-east-2.console.aws.amazon.com/console/home?region=us-east-2#] e inicie sesión con su cuenta de AWS. Puede acceder a otro servicio de AWS con la opcion de "Búsqueda", como los servicios de S3, EC2 que usamos para este proyecto, siga los pasos para la creacion de [Bucket S3](pasos_bucket_s3.md) e [instancia EC2](pasos_instancia_EC2.md) o si bien lo prefiere usar las instrucciones específicas proporcionadas en la documentación del servicio.

[Volver al inicio](#inicio)

## Configuración de pipelines
Los pipelines son los archivos que se usan para la gestión de Integración continua (CI) y despliegue continuo (CD), son de formato .yml, en el caso de GitLab se deben ubicar en la raíz del proyecto con el nombre .gitlab-ci.yml para que sea lo primero que reconozca del proyecto. En este proyecto por requerimiento del cliente se tenian el backend y el frontend en la misma carpeta root, para hacer la automatizacion correctamente se uso el .gitlab-ci.yml de root con triggers que redireccionaran a los .yml de front y back respectivamente

- [.yml Root](https://gitlab.ctd.academy/ctd/proyecto-integrador-1022/0521-pt-c12/grupo-11/-/blob/main/.gitlab-ci.yml)
- [.yml Back](https://gitlab.ctd.academy/ctd/proyecto-integrador-1022/0521-pt-c12/grupo-11/-/blob/main/back/digitalbooking-rentalcars/.gitlab-ci.yml)
- [.yml Front](https://gitlab.ctd.academy/ctd/proyecto-integrador-1022/0521-pt-c12/grupo-11/-/blob/main/front/booking/.gitlab-ci.yml)

[Volver al inicio](#inicio)

## Mantenimiento y actualizaciones
Para realizar el mantenimiento de la aplicación, siga las instrucciones específicas proporcionadas en la documentación de la aplicación. Para aplicar actualizaciones o cambios en el código o la configuración, siga el proceso de CI/CD estándar y realice un push a la rama principal del repositorio. Para realizar copias de seguridad de la aplicación, utilice la herramienta de copias de seguridad de AWS proporcionada (por ejemplo, EBS Snapshots). Para restaurar la aplicación en caso de fallos, siga las instrucciones específicas proporcionadas en la documentación de la aplicación.

[Volver al inicio](#inicio)

## Gestión de integridad de datos
Para garantizar la integridad y la privacidad de los datos de la aplicación, se recomienda seguir las siguientes medidas:

- Utilizar contraseñas seguras y cambiarlas regularmente
- Utilizar autenticación de dos factores
- Utilizar una conexión segura (SSL/TLS) para proteger la transmisión de datos
- Configurar reglas de firewall y grupos de seguridad de red para proteger la red
- Utilizar contraseñas encriptadas para proteger la base de datos
- Utilizar herramientas de monitoreo y detección de intrusiones para detectar y prevenir ataques.

[Volver al inicio](#inicio)

## Monitoreo y supervisión:
Para configurar y utilizar herramientas de monitoreo y supervisión, siga las instrucciones específicas proporcionadas por AWS. Algunas opciones comunes incluyen CloudWatch y X-Ray. Estas herramientas le permiten monitorear el rendimiento y la disponibilidad de la aplicación y detectar problemas de forma temprana. También puede utilizar herramientas de monitoreo de terceros, como New Relic o Datadog.

[Volver al inicio](#inicio)

## Gestión de dependencias:
La aplicación depende de las siguientes librerías y frameworks:

- React (versión 18.2.0)
- Java (versión 18.0.2-ea)
- Springboot (versión 2.7.5)
- Maven (versión 3.6.3)

Para gestionar y actualizar estas dependencias, siga las instrucciones específicas proporcionadas por cada librería o framework. Asegúrese de realizar pruebas exhaustivas antes de aplicar cualquier actualización para garantizar la estabilidad de la aplicación.

[Volver al inicio](#inicio)