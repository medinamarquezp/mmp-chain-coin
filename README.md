# 💲MMP blockchain y criptomoneda
El principal objetivo de este proyecto es poner en práctica ciertos conceptos clave del mundo *crypto* a través de la creación de mi propia criptomoneda, así como mediante la implementación de una *blockchain* descentralizada. Inicialmente pensaba implementar únicamente algunos módulos o entidades que solo pudieran ser ejecutadas a través de los test unitarios pero, a medida que avanazaba, la curiosidad ha hecho que se me haya ido un poco de las manos y he acabado creando una interfaz API desde la cual poder operar con las entidades de este proyecto.

La complejidad esencial en proyectos relacionados con criptomonedas o con la *blockchain* es bastante elevada y más para una persona que se está iniciando en este maravilloso e interesante mundo. Operaciones como minar bloques, crear pruebas de trabajo (POW) calculando la dificultad de manera dinámica, recompensar a mineros o retransmitir las transacciones para que la cadena pueda funcionar de manera totalmente descentralizada son algunos ejemplos de operaciones que pueden hacerte rascar la cabeza en más de una ocasión 🤯... Debido a esto, he decidido llevar a cabo la implementación utilizando únicamente JS, haciendo uso de sintaxis de ES6 (evitando de este modo cualquier configuración adicional como Babel o TS). Para el manejo del estado en la API he utilizado objetos en memoria implementando todas las operaciones relacionadas con estos como métodos propios de cada clase.

La API ofrece las siguientes operaciones:
* 🔒 **Autenticación:** creación de usuarios y registro.
* 👛 **Wallet (carteras de usuarios):** los usuarios pueden disponer de carteras y, mediante este endpoint, pueden crear nuevas, listar sus carteras y operar con cada una de estas.
* 🧮 **Pool de transacciones:** mediante el cual se pueden listar las transacciones pendientes de minar y minarlas.
* ⛓ **Blockchain:** permite consultar la blockchain, así como minar bloques de contenido estático.

La API a su vez se comunica con un *socket server* que permite retransmitir las operaciones a todos los nodos de la *blockchain*. Inicialmente la aplicación se ejecuta en los siguientes puertos:
* **API:** 3000 modificable a través de la variable de entorno HTTP_PORT
* **SOCKET:** 5001 modificable a través de la variable de entorno P2P_PORT

La complejidad a la hora de minar bloques se puede controlar mediante las variables DIFFICULTY y MINE_EXECUTION_TIME_MILLISECONDS. Estas se encuentran en los ficheros de configuración, disponibles en `/src/config`.

La variable DIFFICULTY impacta sobre la POW, haciendo que el valor de esta se traduzca en el número de ceros por los que deberá comenzar el *hash* de cada bloque. La variable MINE_EXECUTION_TIME_MILLISECONDS permite controlar la complejidad de la variable DIFFICULTY de manera dinámica, indicando el tiempo máximo para el minado de los bloques. 

Otras dos variables disponibles en el fichero config son INITIAL_BALANCE (balance inicial con el cual se crean las nuevas carteras) y MINING_REWARD (recompensa que se lleva el minero al minar un nuevo bloque).

Quedan refactors por hacer y mejoras que implementar, pero la aplicación es totalmente operativa.

**Es importante tener en cuenta que esta es una blockchain y criptomoneda amateur y no debe ser usada con otro objetivo que el de testeo y aprendizaje**.

Pull request y comentarios son bienvenidos 😉
