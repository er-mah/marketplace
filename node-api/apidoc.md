FORMAT: 1A
HOST: https://api-test.miautohoy.com/

# MAH

Lista de rutas del consumo de api de miautohoy.

Para mas informacion de 123 revisar: 
Para más información de su api, revisar:  
https://test.123cotizarservice-ci.123seguro.com/swagger/index.html#/

# Group Usuarios



##LOGIN [/login]

###login [POST]

- Request (application/json)

        {   "email":"info@as-one.com.ar",
            "password": "123123"}

- Response 200 (application/json)

  - Body

            {
                "status": "ok",
                "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkFkbWluIiwidXNlclR5cGUiOiJBZG1pbiIsImlhdCI6MTU0NDczNDgzMH0.cO_JIxvkVedUNc2VhFbFyjMKTw2rSFN5Ht2QXwwqJV4"
            }
            
##Facebook [/checkFacebookLogin]

###checkLogin [POST]

- Request (application/json)

        {   "email":"info@as-one.com.ar" }

- Response 200 (application/json)

  - Body

            {
                "status": "ok",
                "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkFkbWluIiwidXNlclR5cGUiOiJBZG1pbiIsImlhdCI6MTU0NDczNDgzMH0.cO_JIxvkVedUNc2VhFbFyjMKTw2rSFN5Ht2QXwwqJV4"
            }
            
##Provinces [/getProvinces]

###getProvinces [GET]

- Response 200 (application/json)

  - Body

            {"status":"ok","data":[{"id":1,"name":"Buenos Aires"},{"id":2,"name":"Buenos Aires-GBA"},{"id":3,"name":"Capital Federal"},{"id":4,"name":"Catamarca"},{"id":5,"name":"Chaco"},{"id":6,"name":"Chubut"},{"id":7,"name":"Córdoba"},{"id":8,"name":"Corrientes"},{"id":9,"name":"Entre Ríos"},{"id":10,"name":"Formosa"},{"id":11,"name":"Jujuy"},{"id":12,"name":"La Pampa"},{"id":13,"name":"La Rioja"},{"id":14,"name":"Mendoza"},{"id":15,"name":"Misiones"},{"id":16,"name":"Neuquén"},{"id":17,"name":"Río Negro"},{"id":18,"name":"Salta"},{"id":19,"name":"San Juan"},{"id":20,"name":"San Luis"},{"id":21,"name":"Santa Cruz"},{"id":22,"name":"Santa Fe"},{"id":23,"name":"Santiago del Estero"},{"id":24,"name":"Tierra del Fuego"},{"id":25,"name":"Tucumán"}]}
            

##Towns [/getTowns/{province_id}]

###getTowns [GET]
 
+ Parameters

    + province_id: 14 (number) - El id de la provincia

- Request(application/json)

- Response 200 (application/json)
       
            {"status":"ok","data":[{"id":1438,"name":"Capital","province_id":14},{"id":1439,"name":"Chacras de Coria","province_id":14},{"id":1440,"name":"Dorrego","province_id":14},{"id":1441,"name":"Gllen","province_id":14},{"id":1442,"name":"Godoy Cruz","province_id":14},{"id":1443,"name":"Gral. Alvear","province_id":14},{"id":1444,"name":"Guaymallén","province_id":14},{"id":1445,"name":"Junín","province_id":14},{"id":1446,"name":"La Paz","province_id":14},{"id":1447,"name":"Las Heras","province_id":14},{"id":1448,"name":"Lavalle","province_id":14},{"id":1449,"name":"Luján","province_id":14},{"id":1450,"name":"Luján De Cuyo","province_id":14},{"id":1451,"name":"Maipú","province_id":14},{"id":1452,"name":"Malargüe","province_id":14},{"id":1453,"name":"Rivadavia","province_id":14},{"id":1454,"name":"San Carlos","province_id":14},{"id":1455,"name":"San Martín","province_id":14},{"id":1456,"name":"San Rafael","province_id":14},{"id":1457,"name":"Sta. Rosa","province_id":14},{"id":1458,"name":"Tunuyán","province_id":14},{"id":1459,"name":"Tupungato","province_id":14},{"id":1460,"name":"Villa Nueva","province_id":14}]}

##Registrar un usuario [/registerUser]

###registerUser [POST]

- Request (application/json)

      {email: "prueba@yopmail.com",
      name: "Prueba",
      phone: 2515634123,
      address: "Los Tilos 1114",
      dni: 35512442,
      password: 123123,
      province_id: 14,
      town_id: 1459,
      };

- Response 200 (application/json)

  - Body

            {
                "status": "ok",
                "message": "Usuario registrado con éxito"
            }
            




##Register Facebook [/loginOrRegisterFacebook]

###resgister [POST]

- Request (application/json)

        {   "email":"info@as-one.com.ar", "name":"Juan" }

- Response 200 (application/json)

  - Body

            {
                "status": "ok",
                "message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkFkbWluIiwidXNlclR5cGUiOiJBZG1pbiIsImlhdCI6MTU0NDczNDgzMH0.cO_JIxvkVedUNc2VhFbFyjMKTw2rSFN5Ht2QXwwqJV4"
            }
            



##Recupero contraseña [/recoverPassword]

###recoverPassword [POST]

- Request (application/json)

        {   "email":"info@as-one.com.ar" }

- Response 200 (application/json)

         {"status":"ok", "message": 'Se envió un link a tu correo para recuperar la contraseña'}

##Cambiar contraseña [/changePassword]

###changePassword [POST]
   Esta request se usa desde el superAdmin, solo ellos pueden cambiar la contraseña de un usuario si lo desean.

- Request (application/json)

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkFkbWluIiwidXNlclR5cGUiOiJBZG1pbiIsImlhdCI6MTU0NTMyMDMyNH0.6hnqEh6NEyleqZ10rd6pmu4RmxquDke3e8-yYziukyg",

- Response 200 (application/json)

         {"status":"ok", "message": 'Se envió un link a tu correo para recuperar la contraseña'}

##Actualizar imágenes de agencia [/uploadAgencyImages]
Esta ruta se usa para actualizar las imágenes de perfil y banner de las agencias
###uploadAgencyImages [POST]

- Request 

   + Headers
   
            mimeType: 'multipart/form-data',
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",
         
    + Attributes

        + Part
            + profileImage: `profileImage.jpeg`
        
        + Part
            + bannerImage : `bannerImage.jpeg`
   

- Response 200 (application/json)

  - Body

            {            
            status: 'ok',
            message: 'Cambios guardados con éxito.',
            }
            
# Group Publicaciones

El flujo de creación de publicaciones va a cambiar dependiendo de como vamos a integrarnos con Mercado Libre y con Infoauto.

## Publicaciones vendidas [/getSoldPublications]

### getSoldPublications [GET]

- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",
         
- Response 200 (application/json)

        {"status":"ok","data":[{"id":1,"brand":"Audi,"modelName":"A1"....}]}
        
## Imágenes [/getImages/{publication_id}]

### Obtener imágenes de publicación [GET]

Este método se llama al momento de editar una publicación para mostrar las imágenes previas que estan cargadas. Y ahi que el usuario decida si las quiere reemplazar o no.

+ Parameters

    + publication_id: 24 (number) - El id de la publicación

- Request(application/json)

- Response 200 (application/json)

         {
         "status": "ok",
         "data": [
         "DSCN5807.jpg",
         "DSCN5809.jpg",
         "DSCN5810.jpg"
         ]
         }

# Group Integración Mercado Libre

## Autenticación [/getMeliAuthURL]

### Devuelve AuthURL o refresca el token [GET]


- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",
         
- Response 200 (application/json)

             {status: 'error',
             message: 'Su sesión expiró.',
             url: 'URL'}

## Categorias [/meliCategory/{category}/{?attributes}]

###Consulta categorias [GET]
 Consulta categorías y atributos siempre pegando a esta ruta devuelve una lista de subcategorías, para ver las categorias de esta ultima utilizar esta misma ruta así para marca y modelo, y en esta ultima instancia usar el atributo `atributtes` para conocer los campos que necesitan enviar en conjunto con la publicación

- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

- Parameters

     + category: MLA117198 (string) - El id de la categoria que puede o no tener subcategorías (EJ: MLA117198)
     
     + attributes: attributes (string) - Agregando al final la palabra `attributes` obtenemos los atributos disponibles que se pueden enviar en conjunto con la publicación.

- Response 200 (application/json)

         {
            "status": "ok",
            "data": {
               "id": "MLA117198",
               "name": "Prisma",
               "picture": null,
               "permalink": null,
               "total_items_in_this_category": 1416,
               "path_from_root": [
                     {
                        "id": "MLA1743",
                        "name": "Autos, Motos y Otros"
                     },...
                     ]
            }
         }

## Provincias [/provinceMeli]

### Listado de provincias [GET]
Listado de Mercado Libre (la ubicación hasta el límite de BARRIO es necesaria para la correcta creación de la publicación)

- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",
      
- Response 200 (application/json)

         {
            "status": "ok",
            "data": {
               "id": "AR",
               "name": "Argentina",
               "locale": "es_AR",
               "currency_id": "ARS",
               "decimal_separator": ",",
               "thousands_separator": ".",
               "time_zone": "GMT-03:00",
               "geo_information": {
                     "location": {
                        "latitude": -38.416096,
                        "longitude": -63.616673
                     }
               },
               "states": [
                     {
                        "id": "TUxBUEJSQWwyMzA1",
                        "name": "Brasil"
                     },
                     {
                        "id": "TUxBUENPU2ExMmFkMw",
                        "name": "Bs.As. Costa Atlántica"
                     },
                     {
                        "id": "TUxBUEdSQWU4ZDkz",
                        "name": "Bs.As. G.B.A. Norte"
                     },
                     {
                        "id": "TUxBUEdSQWVmNTVm",
                        "name": "Bs.As. G.B.A. Oeste"
                     },
                     {
                        "id": "TUxBUEdSQXJlMDNm",
                        "name": "Bs.As. G.B.A. Sur"
                     },
                     {
                        "id": "TUxBUFpPTmFpbnRl",
                        "name": "Buenos Aires Interior"
                     },
                     {
                        "id": "TUxBUENBUGw3M2E1",
                        "name": "Capital Federal"
                     },
                     {
                        "id": "TUxBUENBVGFiY2Fm",
                        "name": "Catamarca"
                     },
                     {
                        "id": "TUxBUENIQW8xMTNhOA",
                        "name": "Chaco"
                     },
                     {
                        "id": "TUxBUENIVXQxNDM1MQ",
                        "name": "Chubut"
                     },
                     {
                        "id": "TUxBUENPUnM5MjI0",
                        "name": "Corrientes"
                     },
                     {
                        "id": "TUxBUENPUmFkZGIw",
                        "name": "Córdoba"
                     },
                     {
                        "id": "TUxBUEVOVHMzNTdm",
                        "name": "Entre Ríos"
                     },
                     {
                        "id": "TUxBUEZPUmE1OTk5",
                        "name": "Formosa"
                     },
                     {
                        "id": "TUxBUEpVSnk3YmUz",
                        "name": "Jujuy"
                     },
                     {
                        "id": "TUxBUExBWmE1OWMy",
                        "name": "La Pampa"
                     },
                     {
                        "id": "TUxBUExBWmEyNzY0",
                        "name": "La Rioja"
                     },
                     {
                        "id": "TUxBUE1FTmE5OWQ4",
                        "name": "Mendoza"
                     },
                     {
                        "id": "TUxBUE1JU3MzNjIx",
                        "name": "Misiones"
                     },
                     {
                        "id": "TUxBUE5FVW4xMzMzNQ",
                        "name": "Neuquén"
                     },
                     {
                        "id": "TUxBUFJFUDQyMjQ4Ng",
                        "name": "República Dominicana"
                     },
                     {
                        "id": "TUxBUFLNT29iZmZm",
                        "name": "Río Negro"
                     },
                     {
                        "id": "TUxBUFNBTGFjMTJi",
                        "name": "Salta"
                     },
                     {
                        "id": "TUxBUFNBTm5lYjU4",
                        "name": "San Juan"
                     },
                     {
                        "id": "TUxBUFNBTnM0ZTcz",
                        "name": "San Luis"
                     },
                     {
                        "id": "TUxBUFNBTno3ZmY5",
                        "name": "Santa Cruz"
                     },
                     {
                        "id": "TUxBUFNBTmU5Nzk2",
                        "name": "Santa Fe"
                     },
                     {
                        "id": "TUxBUFNBTm9lOTlk",
                        "name": "Santiago del Estero"
                     },
                     {
                        "id": "TUxBUFRJRVoxM2M5YQ",
                        "name": "Tierra del Fuego"
                     },
                     {
                        "id": "TUxBUFRVQ244NmM3",
                        "name": "Tucumán"
                     },
                     {
                        "id": "TUxBUFVSVXllZDVl",
                        "name": "Uruguay"
                     },
                     {
                        "id": "TUxBUFVTQWl1cXdlMg",
                        "name": "USA"
                     }
               ]
            }
         }

## Departamentos [/stateMeli/{province_id}]

### Devuelve los diferentes departamentos de esa provincia [GET]

- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

- Parameters

     + province_id: TUxBUE1FTmE5OWQ4 (string) - El id de la provincia (EJ: TUxBUE1FTmE5OWQ4)

- Response 200 (application/json)

         {
            "status": "ok",
            "data": {
               "id": "TUxBUE1FTmE5OWQ4",
               "name": "Mendoza",
               "country": {
                     "id": "AR",
                     "name": "Argentina"
               },
               "geo_information": {
                     "location": {
                        "latitude": -34.5869034,
                        "longitude": -68.1431414
                     }
               },
               "cities": [
                     {
                        "id": "TUxBQ0dFTmI4MzRj",
                        "name": "General Alvear"
                     },
                     {
                        "id": "TUxBQ0dPRDIyMDlm",
                        "name": "Godoy Cruz"
                     },
                     {
                        "id": "TUxBQ0dVQTI0Yjcw",
                        "name": "Guaymallén"
                     },
                     {
                        "id": "TUxBQ0pVTjhkMzk1",
                        "name": "Junín"
                     },
                     {
                        "id": "TUxBQ0xBWmNkODhm",
                        "name": "La Paz"
                     },
                     {
                        "id": "TUxBQ0xBU2YzZWNh",
                        "name": "Las Heras"
                     },
                     {
                        "id": "TUxBQ0xBVjcxNjJh",
                        "name": "Lavalle"
                     },
                     {
                        "id": "TUxBQ0xVSjRiOWZh",
                        "name": "Luján de Cuyo"
                     },
                     {
                        "id": "TUxBQ01BSWEyMzA",
                        "name": "Maipú"
                     },
                     {
                        "id": "TUxBQ01BTDZjYjM4",
                        "name": "Malargüe"
                     },
                     {
                        "id": "TUxBQ0NBUDFmNDY3",
                        "name": "Mendoza"
                     },
                     {
                        "id": "TUxBQ1JJVmNhOWUw",
                        "name": "Rivadavia"
                     },
                     {
                        "id": "TUxBQ1NBTmM0ZmYz",
                        "name": "San Carlos"
                     },
                     {
                        "id": "TUxBQ1NBTmQ4N2U4",
                        "name": "San Martín"
                     },
                     {
                        "id": "TUxBQ1NBTjdmNmMy",
                        "name": "San Rafael"
                     },
                     {
                        "id": "TUxBQ1NBTjQ2Y2Nm",
                        "name": "Santa Rosa"
                     },
                     {
                        "id": "TUxBQ1RVTjk4YjBm",
                        "name": "Tunuyán"
                     },
                     {
                        "id": "TUxBQ1RVUDk3Y2Nl",
                        "name": "Tupungato"
                     }
               ]
            }
         }


## Ciudades [/cityMeli/{state_id}]

### Ciudades de un departamento [GET]

- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

- Parameters

     + state_id: TUxBQ0xBU2YzZWNh (string) - El id de un departamento (EJ: TUxBQ0xBU2YzZWNh)

- Response 200 (application/json)

         {
            "status": "ok",
            "data": {
               "id": "TUxBQ0xBU2YzZWNh",
               "name": "Las Heras",
               "state": {
                     "id": "TUxBUE1FTmE5OWQ4",
                     "name": "Mendoza"
               },
               "country": {
                     "id": "AR",
                     "name": "Argentina"
               },
               "neighborhoods": [
                     {
                        "id": "TUxBQkJMQTY5NTBa",
                        "name": "Blanco Encalada"
                     },
                     {
                        "id": "TUxBQkNBUDEyNTJa",
                        "name": "Capdeville"
                     },
                     {
                        "id": "TUxBQkpPQzE2ODNa",
                        "name": "Jocolí"
                     },
                     {
                        "id": "TUxBQkxBUzgxMDla",
                        "name": "Las Cuevas"
                     },
                     {
                        "id": "TUxBQkxBUzgzOTZa",
                        "name": "Las Heras"
                     },
                     {
                        "id": "TUxBQkxPUzk4MzNa",
                        "name": "Los Penitentes"
                     },
                     {
                        "id": "TVhYUGFucXVlaHVhVFV4QlEweEJVMll6WldOa",
                        "name": "Panquehua"
                     },
                     {
                        "id": "TUxBQlBBUDYwMTBa",
                        "name": "Papagayos"
                     },
                     {
                        "id": "TUxBQlBPTDU4OTda",
                        "name": "Polvaredas"
                     },
                     {
                        "id": "TUxBQlBVRTk2ODha",
                        "name": "Puente del Inca"
                     },
                     {
                        "id": "TUxBQlBVTjg5ODVa",
                        "name": "Punta de Vacas"
                     },
                     {
                        "id": "TUxBQlVTUDQ5MjRa",
                        "name": "Uspallata"
                     }
               ],
               "geo_information": {
                     "location": {
                        "latitude": -32.5378848,
                        "longitude": -69.097023
                     }
               }
            }
         }

## Barrios [/neighborhoodMeli/{city_id}]

### Lista de barrios [GET]
Si no posee ningún barrio con el id de la ciudad alcanza.

- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

- Parameters

     + city_id: TUxBQkNBQjM4MDda (string) - El id de una ciudad (EJ: TUxBQkNBQjM4MDda)

- Response 200 (application/json)

         {
            "status": "ok",
            "data": {
               "id": "TUxBQkNBQjM4MDda",
               "name": "Caballito",
               "state": {
                     "id": "AR-C",
                     "name": "Capital Federal"
               },
               "country": {
                     "id": "AR",
                     "name": "Argentina"
               },
               "geo_information": {
                     "location": {
                        "latitude": -34.6166667,
                        "longitude": -58.45
                     }
               }
            }
         }

##Estado del usuario [/userStatusMeli]
   En esta instancia se verifica si el usuario posee paquetes (gold, silver, etc) bajo los cuales crear una publicación, en caso de que no posea la publicación se crea igual, pero no estará visible, deberá obtener alguno ingresando a Mercado Libre, el API de ML no ofrece una opción para comprar paquetes de publicación por API.


### ¿Posee paquetes para publicar? [GET]

- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

- Response 200 (application/json)

         {
            "status": "ok",
            "data": {
               "message": "User promotion packs not found for user 388243779",
               "error": "not_found",
               "status": 404,
               "cause": []
            }
         }

##Validación [/validatePublicationMeli]

Utilizar este paso antes de publicar para validar que la publicación tenga los atributos necesarios tanto de localidad como del auto para no recibir ninguna penalización y poder ser publicada con éxito.

### Validar Publicación [POST]
- Request (application/json) 

   + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",
   + Body

             {
                "title":"Chevrolet Prisma Joy LS+ 4p",
                "description":"Como nuevo",
                "category_id":"MLA117198",
                "price":"300000",
                "currency_id":"ARS",
                "listing_type_id":"silver",
                "address":"Formosa 223",
                "state":"TUxBUE1FTmE5OWQ4",
                "city":"TUxBQ0NBUDFmNDY3",
                "neighborhood":"TUxBQk9UUjYxNjJa",
                "cp":"5500",
                "condition":"used",
                "attributes":{"TRIM": "LS +","VEHICLE_YEAR": "2017", "DOORS":"5", "FUEL_TYPE": "Nafta", "KILOMETERS": "20000 km"},
                "brand":"Chevrolet",
                "modelName":"Prisma"
             }
- Response 200 (application/json)

         {
            "status": "ok",
            "data": {
               "id": null,
               "site_id": "MLA",
               "title": "Chevrolet Prisma Chevrolet Prisma Joy Ls+ 4p",
               "subtitle": null,
               "seller_id": 388243779,
               "category_id": "MLA117198",
               "official_store_id": null,
               "price": 300000,
               "base_price": 300000,
               "original_price": null,
               "currency_id": "ARS",
               "initial_quantity": 1,
               "available_quantity": 1,
               "sold_quantity": 0,
               "sale_terms": [...]
               }
         }

## Publicar [/publicationMeli]

### Crear Publicacion [POST]

Crear una publicación en Mercado Libre y en MAH simultáneamente (Es un multipart, las imágenes pueden ser hasta SEIS dentro del atributo imageGroup)

- Request (multipart/form-data)
   + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

   + Body

             {
                "title":"Chevrolet Prisma Joy LS+ 4p",
                "description":"Como nuevo",
                "category_id":"MLA117198",
                "price":"300000",
                "currency_id":"ARS",
                "listing_type_id":"silver",
                "address":"Formosa 223",
                "state":"TUxBUE1FTmE5OWQ4",
                "city":"TUxBQ0NBUDFmNDY3",
                "neighborhood":"TUxBQk9UUjYxNjJa",
                "cp":"5500",
                "condition":"used",
                "imageGroup": "/Users/mariano/Pictures/13669169_1182797621762500_7738535480035521501_n.png.jpg"
                "attributes":{"TRIM": "LS +","VEHICLE_YEAR": "2017", "DOORS":"5", "FUEL_TYPE": "Nafta", "KILOMETERS": "20000 km"},
                "brand":"Chevrolet",
                "modelName":"Prisma"
             }

- Response 200 (application/json)

         {"status": "ok",
            "data": {
            "id": "MLB1045563828",
            "site_id": "MLB",
            "title": "Anuncio Teste Prova Carro - Nao Comprar",
            "subtitle": null,
            "seller_id": 307415664,
            "category_id": "MLB76395",
            "official_store_id": null,
            "price": 100000,
            "base_price": 100000,
            "original_price": null,
            "currency_id": "BRL",
            "initial_quantity": 1,
            "available_quantity": 1,
            "sold_quantity": 0,...
            }
         }

### Editar Publicacion [PATCH]
 Las publicaciones se pueden editar, el atributo id hace referencia al id de la publicación dentro de MAH.
 Se pueden modificar las siguientes cosas:
      Título
      Precio
      Video
      Imágenes
      Descripción*
      Envío
      Location
      Atributos de la publicación (array “attributes”)
      Categoría

- Request (multipart/form-data)
   + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

   + Body

             {"id":"948", "title" :"Joy LS+ 4p Prueba de integración", "description" :"Esto es una prueba, no ofertar ni reservar",
             "imageGroup": "IMAGEN ARCHIVO", "category_id" :"MLA117198", "price" :"200000", "attributes": {"TRIM": "LS +", "VEHICLE_YEAR": "2017", "DOORS":"5", "FUEL_TYPE": "Nafta", "KILOMETERS": "20000 km"}
             }

- Response 200 (application/json)

         {"status": "ok",
            "data": {
            "id": "MLB1045563828",
            "site_id": "MLB",
            "title": "Anuncio Teste Prova Carro - Nao Comprar",
            "subtitle": null,
            "seller_id": 307415664,
            "category_id": "MLB76395",
            "official_store_id": null,
            "price": 100000,
            "base_price": 100000,
            "original_price": null,
            "currency_id": "BRL",
            "initial_quantity": 1,
            "available_quantity": 1,
            "sold_quantity": 0,...
            }
         }

## Obtener Consultas [/getQuestionsMeli/{publication_id}/{?from}/{?seller}/{?status}]

### Listado de Consultas [GET]
Consultas que se han realizado dentro de Mercado Libre en la publicación del usuario de MAH.

- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

- Parameters

     + publication_id: 948 (string) - El id de una publicación (EJ: 948)
     + from: 32412 (integer) - El id de un usuario de Mercado Libre
     + seller: 32412 (integer) - El id de un usuario de Mercado Libre
     + status: ANSWERED (integer) - El status de una publicacion, puede ser ANSWERED, "BANNED", "CLOSED_UNANSWERED", "DELETED", "DISABLED","UNANSWERED", "UNDER_REVIEW"
 
- Response 200 (application/json)

        {"status": "ok",
         "data": {
            "total": 0,
            "limit": 50,
            "questions": [],
            "filters": {
                  "limit": 50,
                  "offset": 0,
                  "is_admin": false,
                  "sorts": [],
                  "caller": 388243779,
                  "item": "MLA764521113"
            },
            "available_filters": [
                  {
                     "id": "from",
                     "name": "From user id",
                     "type": "number"
                  },
                  {
                     "id": "seller",
                     "name": "Seller id",
                     "type": "number"
                  },
                  {
                     "id": "totalDivisions",
                     "name": "total divisions",
                     "type": "number"
                  },
                  {
                     "id": "division",
                     "name": "Division",
                     "type": "number"
                  },
                  {
                     "id": "status",
                     "name": "Status",
                     "type": "text",
                     "values": [
                        "ANSWERED",
                        "BANNED",
                        "CLOSED_UNANSWERED",
                        "DELETED",
                        "DISABLED",
                        "UNANSWERED",
                        "UNDER_REVIEW"
                     ]
                  }
            ],
            "available_sorts": [
                  "item_id",
                  "from_id",
                  "date_created",
                  "seller_id"
            ]
         }
        }   

## Borrar Consultas [/getQuestionsMeli/{question_id}/]

### Borra una consulta [DELETE]
- Request

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

- Parameters

     + question_id: MD234234m (string) - El id de una publicación (EJ: 948)
 
- Response 200 (application/json)

        {"status": "ok"}

## Responder una Consulta [/answerMeli]

### Enviar respuesta [POST]
- Request(application/json)

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAyLCJuYW1lIjoiSnVhbiBBc2d1YW4iLCJ1c2VyVHlwZSI6IlVzdWFyaW8iLCJpYXQiOjE1NDUzMTg4ODV9.JXOlNys2zC_R6hkLPDEJIrM0A0_J3j-TGzXPk1b72Z0",

    + Body

            {
            "question_id":"ML23492235",
            "text":"Puede ser",
            }

- Response 200 (application/json)

         {"status": "ok"}

# Group Integración 123Seguro

## Marcas 123 [/get123Brands]

### Trae las marcas que maneja 123Seguro [GET]

- Response 200 (application/json)

         {
         "status": "ok",
         "data": [
            {
                  "id": 1,
                  "nombre": "ACURA"
            },
            {
                  "id": 2,
                  "nombre": "ALEKO"
            },
            {
                  "id": 3,
                  "nombre": "ALFA ROMEO"
            },
            {
                  "id": 4,
                  "nombre": "ARO"
            },
            {
                  "id": 5,
                  "nombre": "ASIA"
            },
               ]
         }

## Años 123 [/get123Years]

### Trae los años de la marca seleccionada [GET]

- Request (application/json)

   + Parameters
   
         + brand_id: 12 (number) - El numero de la marca

- Response 200 (application/json)

         {
         "status": "ok",
         "data": [
         2019,
         2018,
         2017,
         2016,
         2015,
         2014,
         2013,
         ]
        }

##Familias 123 [/get123Family/{brand_id}/{year}]

### Trae las familias de autos [GET]

- Request (application/json)

   + Parameters

        + brand_id: 12 (number) - El numero de la marca
            
        + year: 2018 (number) - El numero de año
         
- Response 200 (application/json)

         {
            "status": "ok",
            "data": [
               {
                     "id": 7,
                     "nombre": "CAMARO",
                     "anio": 2018,
                     "marca_id": 12
               },
               {
                     "id": 39,
                     "nombre": "PICK-UP S-10",
                     "anio": 2018,
                     "marca_id": 12
               },
               {
                     "id": 51,
                     "nombre": "CAPTIVA",
                     "anio": 2018,
                     "marca_id": 12
               },
               {
                     "id": 57,
                     "nombre": "CRUZE",
                     "anio": 2018,
                     "marca_id": 12
               },
               {
                     "id": 58,
                     "nombre": "MONTANA",
                     "anio": 2018,
                     "marca_id": 12
               },
            ]
         }
         
##Modelos 123 [/get123Models/{brand_id}/{year}/{family_id}]

### Trae las familias de autos [GET]

- Request (application/json)

   + Parameters

        + brand_id: 12 (number) - El numero de la marca
            
        + year: 2018 (number) - El numero de año
        
        + family_id: 60 (number) - El numero de family
         
- Response 200 (application/json)

         {
         "status": "ok",
         "data": [
         {
            "id": 120525,
            "nombre": "PRISMA 1.4 LS JOY L/17",
            "anio": 2018,
            "marca_id": 12,
            "familia_id": 60
         },
         {
            "id": 120532,
            "nombre": "PRISMA 1.4 LS JOY + L/17",
            "anio": 2018,
            "marca_id": 12,
            "familia_id": 60
         },
         {
            "id": 120533,
            "nombre": "PRISMA 1.4 LT L/17",
            "anio": 2018,
            "marca_id": 12,
            "familia_id": 60
         },
         {
            "id": 120534,
            "nombre": "PRISMA 1.4 LTZ L/17",
            "anio": 2018,
            "marca_id": 12,
            "familia_id": 60
         },
         {
            "id": 120535,
            "nombre": "PRISMA 1.4 LTZ AUT L/17",
            "anio": 2018,
            "marca_id": 12,
            "familia_id": 60
         }
         ]
         }


## Provincias [/get123Provinces]

### Trae las provincias que usa 123Seguro [GET]

- Response 200 (application/json)

        {"status":"ok","data":[{"id":1,"nombre":"BUENOS AIRES","pais_id":1},{"id":2,"nombre":"CATAMARCA","pais_id":1}]}

## Localidades [/get123Localities]

### Trae las localidades que usa 123Seguro [GET]

- Response 200 (application/json)

        {
        "status": "ok",
        "data": [
        {
        "id": 15252,
        "nombre": "AARON CASTELLANOS",
        "provincia_id": 23,
        "cp": "6106"
        },
        {
        "id": 15253,
        "nombre": "ABIPONES",
        "provincia_id": 23,
        "cp": "3042"
        },
        {
        "id": 15254,
        "nombre": "ACEBAL",
        "provincia_id": 23,
        "cp": "2109"
        },
        {
        "id": 15255,
        "nombre": "ADOLFO ALSINA",
        "provincia_id": 23,
        "cp": "2311"
        },
        {
        "id": 15256,
        "nombre": "AERO CLUB ROSARIO (APEADERO FCGM)",
        "provincia_id": 23,
        "cp": "2132"
        },
        ]
        }
        
## Crear usuario 123 y Auto [/addUserAndCarData]

### Crear usuario y añadir auto [POST]

Acá se realizan dos pasos en uno, se envían los datos del usuario (con la provincia y localidad que se buscó previamente) y del auto que consultó. vehículo_id equivale al CODIA de infoauto

- Request (application/json)

        {   anio: 2018,
            apellido: "Prueba"
            localidad_id: 11270,
            mail: "prueba123@yopmail.com",
            nombre: "Juan",
            telefono: "2615384934",
            vehiculo_id: "120527"}

- Response 200 (application/json)

  - Body

            {{  
            "status":"ok",
            "data":{  
                "anio":2018,
                "vehiculo_id":"120527",
                "patente":"",
                "id":556379,
                "canal":{  
                    "id":262,
                    "nombre":"Mi Auto Hoy",
                    "icono":null
                }
            },
            "companias":[  
                {  
                    "id":7,
                    "name":"allianz"
                },
                {  
                    "id":1,
                    "name":"mapfre"
                },
                {  
                    "id":5,
                    "name":"meridional"
                },
                {  
                    "id":4,
                    "name":"provincia"
                },
                {  
                    "id":4,
                    "name":"mercantil"
                },
                {  
                    "id":2,
                    "name":"orbis"
                },
                {  
                    "id":13,
                    "name":"sancor"
                },
                {  
                    "id":6,
                    "name":"zurich"
                }
            ],
            "coberturas":[  
                {  
                    "id":2,
                    "nombre":"Cobertura B0",
                    "descripcion":"DaÃ±os Totales con limites",
                    "tipo":"B0"
                },
                {  
                    "id":4,
                    "nombre":"Cobertura C0",
                    "descripcion":"Perdidas parciales que sufra el vehiculo",
                    "tipo":"C0"
                },
                {  
                    "id":5,
                    "nombre":"Cobertura C Premium",
                    "descripcion":"Todo riesgo menos danos parciales por accidente con franq.",
                    "tipo":"C+"
                },
                {  
                    "id":6,
                    "nombre":"Cobertura C - Granizo",
                    "descripcion":"Incluye daÃ±os ocasionados por Granizo",
                    "tipo":"CG"
                },
                {  
                    "id":7,
                    "nombre":"Cobertura D",
                    "descripcion":"Todo Riesgo",
                    "tipo":"D"
                },
                {  
                    "id":8,
                    "nombre":"Responsabilidad Civil",
                    "descripcion":"Responsabilidad Civil con casco",
                    "tipo":"A"
                },
                {  
                    "id":9,
                    "nombre":"Responsabilidad Civil con casco",
                    "descripcion":"Responsabilidad Civil",
                    "tipo":"RC"
                },
                {  
                    "id":10,
                    "nombre":"Cobertura DZ",
                    "descripcion":"Todo Riesgo Z",
                    "tipo":"DZ"
                }
            ]
            }

## Obtener cotizaciones [/get123Quotes]

Hay que hacer una request de este tipo por cada tipo de compañia habilitado para mah, las mismas son: 

    [  
        { id: 7, name: 'allianz' },  
        { id: 1, name: 'mapfre' },  
        { id: 5, name: 'meridional' },  
        { id: 4, name: 'provincia' },  
        { id: 4, name: 'mercantil' },  
        { id: 2, name: 'orbis' },  
        { id: 13, name: 'sancor' },  
        { id: 6, name: 'zurich' }  
    ];
Devuelvo las coberturas para disponer de más información.

###Quotes [POST]

- Request (application/json)

        {"company_id":13,"company":"sancor","producto_id":556379}
        
- Response 200 (application/json)

  - Body

            {  
               "status":200,
               "data":{  
                  "prices":{  
                     "4":{  
                        "prima":{  
                           "23":1398.88,
                           "24":1398.88,
                           "41":1398.88
                        },
                        "premio":{  
                           "23":1853,
                           "24":1853,
                           "41":1853
                        },
                        "cobertura_interna_id":{  
                           "23":114,
                           "24":114,
                           "41":114
                        },
                        "transaccion_id":{  
                           "23":"236360367",
                           "24":"236360394",
                           "41":"236360423"
                        },
                        "items":[  
                           "- Vigencia de Póliza: Anual con actualización de cuota mensual",
                           "- Daños físicos o materiales a terceros hasta $6.000.000",
                           "- Robo Total y Parcial",
                           "- Incendio Total y Parcial",
                           "- Destrucción Total",
                           "- Granizo e Inundación",
                           "- Cobertura en países limítrofes",
                           "- Auxilio Mecánico"
                        ],
                        "must_have_track_system":{  
                           "23":"0",
                           "24":"0",
                           "41":"0"
                        }
                     },
                     "6":{  
                        "prima":{  
                           "23":1429.97,
                           "24":1429.97,
                           "41":1429.97
                        },
                        "premio":{  
                           "23":1894,
                           "24":1894,
                           "41":1894
                        },
                        "cobertura_interna_id":{  
                           "23":115,
                           "24":115,
                           "41":115
                        },
                        "transaccion_id":{  
                           "23":"236360366",
                           "24":"236360399",
                           "41":"236360422"
                        },
                        "items":[  
                           "- Vigencia de Póliza: Anual con actualización de cuota mensual",
                           "- Daños físicos o materiales a terceros hasta $6.000.000 ",
                           "- Destrucción Total",
                           "- Incendio Total y Parcial",
                           "- Robo Total y Parcial",
                           "- Cristales Laterales y Cerraduras",
                           "- Daños por robo y aparición del auto",
                           "- Granizo e Inundación",
                           "- Luneta, Parabrisas y Techo solar",
                           "- Cobertura en países limítrofes",
                           "- Auxilio Mecánico"
                        ],
                        "must_have_track_system":{  
                           "23":"0",
                           "24":"0",
                           "41":"0"
                        }
                     },
                     "7":{  
                        "prima":{  
                           "23":2399.41,
                           "24":2399.41,
                           "41":2399.41
                        },
                        "premio":{  
                           "23":3181,
                           "24":3181,
                           "41":3181
                        },
                        "cobertura_interna_id":{  
                           "23":116,
                           "24":116,
                           "41":116
                        },
                        "transaccion_id":{  
                           "23":"236360371",
                           "24":"236360396",
                           "41":"236360421"
                        },
                        "items":[  
                           "- Vigencia de Póliza: Anual con actualización de cuota mensual",
                           "- Daños físicos o materiales a terceros hasta $6.000.000",
                           "- Destrucción Total",
                           "- Incendio Total y Parcial",
                           "- Robo Total y Parcial",
                           "- Cristales Laterales y Cerraduras",
                           "- Daños parciales con participación del cliente en la reparación de $7.500",
                           "- Daños por robo y aparición del auto",
                           "- Granizo e Inundación",
                           "- Luneta, Parabrisas y Techo solar",
                           "- Cobertura en países limítrofes",
                           "- Auxilio Mecánico "
                        ],
                        "must_have_track_system":{  
                           "23":"0",
                           "24":"0",
                           "41":"0"
                        }
                     },
                     "8":{  
                        "prima":{  
                           "23":775.48,
                           "24":775.48,
                           "41":775.48
                        },
                        "premio":{  
                           "23":1026,
                           "24":1026,
                           "41":1026
                        },
                        "cobertura_interna_id":{  
                           "23":270,
                           "24":270,
                           "41":270
                        },
                        "transaccion_id":{  
                           "23":"236360363",
                           "24":"236360391",
                           "41":"236360417"
                        },
                        "items":[  
                           "- Daños físicos o materiales a terceros hasta $6.000.000 / Para comerciales $18.000.000"
                        ],
                        "must_have_track_system":{  
                           "23":"0",
                           "24":"0",
                           "41":"0"
                        }
                     },
                     "10":{  
                        "prima":{  
                           "23":1976.6,
                           "24":1976.6,
                           "41":1976.6
                        },
                        "premio":{  
                           "23":2620,
                           "24":2620,
                           "41":2620
                        },
                        "cobertura_interna_id":{  
                           "23":117,
                           "24":117,
                           "41":117
                        },
                        "transaccion_id":{  
                           "23":"236360370",
                           "24":"236360398",
                           "41":"236360420"
                        },
                        "items":[  
                           "- Vigencia de Póliza: Anual con actualización de cuota mensual.",
                           "- Daños físicos o materiales a terceros hasta $6.000.000 ",
                           "- Destrucción Total",
                           "- Incendio Total y Parcial",
                           "- Robo Total y Parcial",
                           "- Cristales Laterales y Cerraduras",
                           "- Daños parciales con participación del cliente en la reparación de $12.000",
                           "- Daños por robo y aparición del auto",
                           "- Granizo e Inundación",
                           "- Luneta, Parabrisas y Techo solar",
                           "- Cobertura en países limítrofes",
                           "- Auxilio Mecánico"
                        ],
                        "must_have_track_system":{  
                           "23":"0",
                           "24":"0",
                           "41":"0"
                        }
                     }
                  },
                  "suma_asegurada":448000,
                  "cc":{  
                     "no":23,
                     "si":24,
                     "promo":41
                  }
               },
               "coberturasCompania":[  
                  {  
                     "id":153,
                     "nombre":"B",
                     "activo":1,
                     "idws":"02",
                     "riesgo_id":1,
                     "compania_id":13,
                     "cobertura":{  
                        "id":2,
                        "nombre":"Cobertura B0",
                        "descripcion":"DaÃ±os Totales con limites",
                        "tipo":"B0"
                     }
                  },
                  {  
                     "id":154,
                     "nombre":"C",
                     "activo":1,
                     "idws":"04",
                     "riesgo_id":1,
                     "compania_id":13,
                     "cobertura":{  
                        "id":4,
                        "nombre":"Cobertura C0",
                        "descripcion":"Perdidas parciales que sufra el vehiculo",
                        "tipo":"C0"
                     }
                  },
                  {  
                     "id":327,
                     "nombre":"C",
                     "activo":1,
                     "idws":"4",
                     "riesgo_id":1,
                     "compania_id":13,
                     "cobertura":{  
                        "id":4,
                        "nombre":"Cobertura C0",
                        "descripcion":"Perdidas parciales que sufra el vehiculo",
                        "tipo":"C0"
                     }
                  },
                  {  
                     "id":284,
                     "nombre":"C TOTAL",
                     "activo":1,
                     "idws":"14",
                     "riesgo_id":1,
                     "compania_id":13,
                     "cobertura":{  
                        "id":5,
                        "nombre":"Cobertura C Premium",
                        "descripcion":"Todo riesgo menos danos parciales por accidente con franq.",
                        "tipo":"C+"
                     }
                  },
                  {  
                     "id":155,
                     "nombre":"C Total Premium",
                     "activo":1,
                     "idws":"16",
                     "riesgo_id":1,
                     "compania_id":13,
                     "cobertura":{  
                        "id":6,
                        "nombre":"Cobertura C - Granizo",
                        "descripcion":"Incluye daÃ±os ocasionados por Granizo",
                        "tipo":"CG"
                     }
                  },
                  {  
                     "id":156,
                     "nombre":"D Full Car Total Franq Fija",
                     "activo":1,
                     "idws":"17",
                     "riesgo_id":1,
                     "compania_id":13,
                     "cobertura":{  
                        "id":7,
                        "nombre":"Cobertura D",
                        "descripcion":"Todo Riesgo",
                        "tipo":"D"
                     }
                  },
                  {  
                     "id":230,
                     "nombre":"D Full Car Total Franq Fija",
                     "activo":1,
                     "idws":"18",
                     "riesgo_id":1,
                     "compania_id":13,
                     "cobertura":{  
                        "id":7,
                        "nombre":"Cobertura D",
                        "descripcion":"Todo Riesgo",
                        "tipo":"D"
                     }
                  },
                  {  
                     "id":158,
                     "nombre":"D Full Car Total Franq Variable",
                     "activo":1,
                     "idws":"37",
                     "riesgo_id":1,
                     "compania_id":13,
                     "cobertura":{  
                        "id":10,
                        "nombre":"Cobertura DZ",
                        "descripcion":"Todo Riesgo Z",
                        "tipo":"DZ"
                     }
                  }
               ],
               "coberturas":[  
                  {  
                     "id":2,
                     "nombre":"Cobertura B0",
                     "descripcion":"DaÃ±os Totales con limites",
                     "tipo":"B0"
                  },
                  {  
                     "id":4,
                     "nombre":"Cobertura C0",
                     "descripcion":"Perdidas parciales que sufra el vehiculo",
                     "tipo":"C0"
                  },
                  {  
                     "id":5,
                     "nombre":"Cobertura C Premium",
                     "descripcion":"Todo riesgo menos danos parciales por accidente con franq.",
                     "tipo":"C+"
                  },
                  {  
                     "id":6,
                     "nombre":"Cobertura C - Granizo",
                     "descripcion":"Incluye daÃ±os ocasionados por Granizo",
                     "tipo":"CG"
                  },
                  {  
                     "id":7,
                     "nombre":"Cobertura D",
                     "descripcion":"Todo Riesgo",
                     "tipo":"D"
                  },
                  {  
                     "id":8,
                     "nombre":"Responsabilidad Civil",
                     "descripcion":"Responsabilidad Civil con casco",
                     "tipo":"A"
                  },
                  {  
                     "id":9,
                     "nombre":"Responsabilidad Civil con casco",
                     "descripcion":"Responsabilidad Civil",
                     "tipo":"RC"
                  },
                  {  
                     "id":10,
                     "nombre":"Cobertura DZ",
                     "descripcion":"Todo Riesgo Z",
                     "tipo":"DZ"
                  }
               ]
            }

##Crear contratación de  123Seguro [/assurance123Seguro]
   Envia información a 123seguro y registra la transacción en nuestra base de datos para poder consultarla despues

###Hire123 [POST]
- Request (application/json)

        {     "cobertura_id": "123", "cobertura_interna_id": "123", "compania_id": "123", "prima": "123", "premio": "123", "nombre": "Juan", "apellido": "Mirillo", "mail": "juanma_er@yahoo.com.ar", "telefono": "3423234", "user_id": "32", "car_id": "24123",}

- Response 200 (application/json)

  - Body

            {
                "status": "ok",
                "message": "Lead registrado con éxito"
            }
            
##Buscar contrataciones 123Seguro [/assurance123Seguro/{page}]

### Get 123Leads[GET]

- Request (application/json)

    + Headers
    
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkFkbWluIiwidXNlclR5cGUiOiJBZG1pbiIsImlhdCI6MTU0NTMyMDMyNH0.6hnqEh6NEyleqZ10rd6pmu4RmxquDke3e8-yYziukyg",

   + Parameters
   
         + page: 1 (number) - El número de página deseado

- Response 200 (application/json)

         {"status":"ok", "data": [{
            "id":"1",
             "name":"Juan" ,
            "secondName": "Mirillo",
            "email": "juanma_er@yahoo.com.ar",
            "phone": "3543123123",
            "prima": "123",
            "premio": "123",
            "company": "Assurance"
         }]}