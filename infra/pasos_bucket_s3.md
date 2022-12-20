# Pasos Para crear Bucket S3

## Índice

- [Crear Bucket](#crear-bucket)
- [Editar propiedades y permisos](#editar-propiedades-y-permisos)
- [Subir archivos manualmente](#subir-archivos-manualmente)
- [Borrar archivos](#borrar-archivos)
- [Link del Bucket](#link-del-bucket)
- [Desplegar proyecto manualmente](#desplegar-proyecto-manualmente)


# Crear Bucket

Ingresar a AWS, en el buscador escribir S3, en el menú de la derecha seleccionar "Buckets", luego en las opciones de Buckets dar en "Crear Bucket" con las siguiente configuracion:

	Bucket name: Nombre_unico_para_el_bucket

	AWS Region: US East (Ohio) us-east-2

	- Desamarcar Block all public access
	(Marcar la advertencia "I acknowledge that the current settings...")

	- Bucket Versioning: Disable
	- Default encryption: Disable
	
	Advance Settings
	- Object Lock: Disable
	
Las demas opciones se dejan como estan por defecto y se da a <b>Crear Bucket</b>.

En <i>Buckets</i> podemos observar el que se creo donde configuraremos las siguientes opciones.

# Editar propiedades y permisos

En Properties editamos <b>Bucket Versioning</b>:
		
	Bucket Versioning: Enable

<u><i>guardamos los cambios.</i></u>

En Properties editamos <b>Static website hosting</b>:

	Static website hosting: Enable

	Index document: index.html (html inicial del proyecto)

	Error document: index.html (El mismo por ser proyecto react)

<u><i>guardamos los cambios.</i></u>


En Permissions editamos <b>Bucket policy</b>:
```
Bucket ARN: arn:aws:s3:::nombreDeNuestroS3

Policy (Pegar el siguente codigo JSON)
			
{
  "Version": "2012-10-17",
  "Id": "Policy1598060850951",
  "Statement": [
    {
      "Sid": "Stnt1598060848589",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nombreDeNuestroS3/*"
    }
  ]
}
```
<u><i>guardamos los cambios.</i></u>

###### Nota: para probar que está público podemos probar subiendo archivos al bucket

</br>

# Subir archivos manualmente

En Buckets nos dirigimos al <i>nombreDeNuestroS3</i>, escogemos <b>Upload</b>, luego <b>Add files</b> (Ej: imagenEjemplo.png) y los subimos

Objetos:

	Name: Imagen.png (Dar click sobre el nombre)

Esto nos dirige a las propiedades del archivo en cuestion, donde en la seccion de <i>Información general sobre el objeto</i> se puede obtener el <b>Object URL</b> y con ésta direccion podemos ver, por ejemplo, si muestra bien el archivo en una pagina incognita.

# Borrar archivos
Desde el buckets propio, seleccionamos los archivos a borrar, donde ql confirmar la eliminacion se debe escribir "delete":
	
	Delete objects?: delete (Escrito)


# Link del Bucket 
Estando en el bucket, escoger la opcion <i><b>Propiedades</b></i>, ir hasta abajo a <i><b>Alojamiento de sitios web estáticos</b></i>, donde en <i><b>Punto de enlace de sitio web del bucket</b></i> se podra obtener el link para ver un proyecto web en funcionamiento.

# Desplegar proyecto manualmente

En la raiz del proyecto React, ejecutamos el comando para compilar:

    npm run build

Cuando termine de compilar, se tomaran todos los archivos que contenga la carpeta <b>build</b> (Esta carpeta se crea al ejecutar el comando de compilación) y se cargan al Bucket