/*
  MANIFIESTO DE IMÁGENES IA — fuente única de verdad.
  ---------------------------------------------------
  Cómo funciona: la presentación intenta cargar cada archivo `file` desde esta misma carpeta
  (Presentacion/assets/img-ia/). Si existe, lo muestra con la nota "Imagen generada con IA".
  Si no existe, usa el `fallback` (fotograma real de la campaña o ilustración SVG) con su crédito.
  => El usuario SOLO tiene que guardar el PNG con el nombre exacto aquí. No hay que tocar código.

  Campos:
    id      : identificador corto (coincide con el prompt en Documentacion/03-Prompts-Imagenes)
    file    : nombre EXACTO del archivo a guardar (minúsculas, sin espacios, .png)
    ratio   : relación de aspecto que se pide en ChatGPT
    slide   : escena de la v4 donde aparece (1 = portada … 12 = gracias)
    usado   : false = la v4 ya no lo usa (se deja por si se recupera; no hay que generarlo)
    kind    : 'scene' (foto con fondo de estudio blanco, se integra con mezcla multiply)
              'face'  (retrato de emoción, fondo blanco liso)
              'object'(objeto aislado; se pide fondo transparente, y si no, fondo blanco liso)
    desc    : qué muestra
    fallback: (lo completa el diseño) ruta relativa a /Presentacion del respaldo, o 'svg:<nombre>'
*/
window.IMG_SLOTS = [
  { id: 'p01', file: 'p01-portada-bebe-sofa.png',        ratio: '16:9', slide: 6,  kind: 'scene',  desc: 'Bebé sentado en el centro de un sofá barroco dorado capitoné crema, estudio blanco infinito', fallback: 'assets/fallback/p01.jpg', usado: false },
  { id: 'p02', file: 'p02-bebe-ready-to-poop.png',       ratio: '2:3',  slide: 2,  kind: 'scene',  desc: 'Primer plano: bebé niña con moño rojo, boca abierta, expresión de “a punto de”', fallback: 'assets/fallback/p02.jpg', usado: false },
  { id: 'p03', file: 'p03-bebe-mirada-seria.png',        ratio: '2:3',  slide: 2,  kind: 'scene',  desc: 'Primer plano: bebé de piel morena, ojos grandes, mirada seria y sospechosa', fallback: 'assets/fallback/p03.jpg', usado: false },
  { id: 'p04', file: 'p04-bebe-alfombra-gateando.png',   ratio: '1:1',  slide: 9,  kind: 'object', desc: 'Bebé de cuerpo entero gateando de perfil de IZQUIERDA a DERECHA, aislado (recorre la alfombra-línea de tiempo)', fallback: 'assets/fallback/p04.jpg' },
  { id: 'p05', file: 'p05-bebe-convertible.png',         ratio: '3:2',  slide: 6,  kind: 'scene',  desc: 'Bebé sentado en el asiento de cuero blanco de un convertible blanco de lujo sin logos', fallback: 'assets/fallback/p05.jpg', usado: false },
  { id: 'p06', file: 'p06-bandeja-panal.png',            ratio: '1:1',  slide: 1,  kind: 'object', desc: 'Mano con guante blanco sosteniendo una bandeja de plata con un pañal blanco liso doblado', fallback: 'svg:bandeja' },
  { id: 'p07', file: 'p07-bebe-sofa-pujo.png',           ratio: '3:2',  slide: 6,  kind: 'scene',  desc: 'Bebé sentado en el sofá capitoné con cara de pujo (concentrado, mejillas rojas)', fallback: 'assets/fallback/p07.jpg' },
  { id: 'p08', file: 'p08-bebe-vestido-novia.png',       ratio: '3:2',  slide: 8,  kind: 'scene',  desc: 'Bebé sentado sobre la cola de encaje de un vestido de novia en maniquí', fallback: 'assets/fallback/p08.jpg', usado: false },
  { id: 'p09', file: 'p09-bebe-cama-blanca.png',         ratio: '16:9', slide: 6,  kind: 'scene',  desc: 'Bebé acostado boca arriba en cama de lino blanco con cojines tejidos y cabecero barroco dorado', fallback: 'assets/fallback/p09.jpg', usado: false },
  { id: 'p10', file: 'p10-papa-bomba.png',               ratio: '16:9', slide: 6, kind: 'scene',  desc: 'Papá de camisa blanca carga al bebé con los brazos estirados “como una bomba”, cara de pánico contenido', fallback: 'assets/fallback/p10.jpg' },
  { id: 'p11', file: 'p11-guantes-cojin.png',            ratio: '3:2',  slide: 10, kind: 'scene',  desc: 'Manos de mayordomo con guantes blancos acomodando un cojín de seda blanca', fallback: 'assets/fallback/p11.jpg', usado: false },
  { id: 'p12', file: 'p12-violinista-bebes.png',         ratio: '16:9', slide: 11, kind: 'scene',  desc: 'Violinista de traje blanco tocando detrás de un sofá dorado con dos bebés sentados', fallback: 'assets/fallback/p12.jpg', usado: false },
  { id: 'p13', file: 'p13-mayordomos-sofa.png',          ratio: '16:9', slide: 12, kind: 'scene',  desc: 'Dos mayordomos de blanco con guantes cargan un sofá dorado por el estudio; un bebé sentado en el piso los mira', fallback: 'assets/fallback/p13.jpg', usado: false },
  { id: 'p14', file: 'p14-gracias-bebe-dormido.png',     ratio: '16:9', slide: 12, kind: 'scene',  desc: 'Bebé dormido plácidamente sobre un cojín de seda blanca, luz suave', fallback: 'assets/fallback/p14.jpg' },
  { id: 'e01', file: 'e01-alegria.png',                  ratio: '1:1',  slide: 8,  kind: 'face',   desc: 'Emoción ALEGRÍA: bebé con carcajada genuina', fallback: 'svg:alegria' },
  { id: 'e02', file: 'e02-tristeza.png',                 ratio: '1:1',  slide: 8,  kind: 'face',   desc: 'Emoción TRISTEZA: bebé haciendo puchero, a punto de llorar', fallback: 'svg:tristeza' },
  { id: 'e03', file: 'e03-furia.png',                    ratio: '1:1',  slide: 8,  kind: 'face',   desc: 'Emoción FURIA: bebé enojado, cejas fruncidas, cara roja', fallback: 'svg:furia' },
  { id: 'e04', file: 'e04-temor.png',                    ratio: '1:1',  slide: 8,  kind: 'face',   desc: 'Emoción TEMOR: bebé con ojos muy abiertos, tenso, mirando a un lado', fallback: 'svg:temor' },
  { id: 'e05', file: 'e05-desagrado.png',                ratio: '1:1',  slide: 8,  kind: 'face',   desc: 'Emoción DESAGRADO: bebé con nariz arrugada y labio arriba (cara de limón)', fallback: 'svg:desagrado' },
  { id: 'e06', file: 'e06-sorpresa.png',                 ratio: '1:1',  slide: 8,  kind: 'face',   desc: 'Emoción SORPRESA: bebé con cejas arriba y boca en “O”', fallback: 'svg:sorpresa' },
  { id: 'o01', file: 'o01-sofa-barroco.png',             ratio: '3:2',  slide: 3,  kind: 'object', desc: 'Sofá francés antiguo capitoné crema con marco dorado tallado, aislado', fallback: 'assets/fallback/o01-v4.jpg' },
  { id: 'o02', file: 'o02-cama-barroca.png',             ratio: '3:2',  slide: 3,  kind: 'object', desc: 'Cama barroca dorada tallada con tendido de lino blanco y cojines, aislada', fallback: 'assets/fallback/o02.jpg', usado: false },
  { id: 'o03', file: 'o03-convertible-blanco.png',       ratio: '16:9', slide: 3,  kind: 'object', desc: 'Convertible de lujo blanco perla, capota abajo, interior de cuero blanco, sin logos, aislado', fallback: 'assets/fallback/o03.jpg' },
  { id: 'o04', file: 'o04-vestido-novia.png',            ratio: '2:3',  slide: 3,  kind: 'object', desc: 'Vestido de novia de alta costura en maniquí, encaje, cola catedral, aislado', fallback: 'assets/fallback/o04.jpg' },
  { id: 'o05', file: 'o05-alfombra-oushak.png',          ratio: '3:2',  slide: 3,  kind: 'object', desc: 'Alfombra turca Oushak antigua vista cenital, tonos crema, terracota y oro, aislada', fallback: 'assets/fallback/o05-v4.jpg' },
  { id: 'o06', file: 'o06-violin.png',                   ratio: '2:3',  slide: 3,  kind: 'object', desc: 'Violín antiguo con arco, aislado', fallback: 'assets/fallback/o06.jpg', usado: false },
  { id: 'o07', file: 'o07-guantes-blancos.png',          ratio: '1:1',  slide: 3,  kind: 'object', desc: 'Par de guantes blancos de mayordomo, aislado', fallback: 'assets/fallback/o07.jpg', usado: false }
];
