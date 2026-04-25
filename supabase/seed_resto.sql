-- Seed: menú Restó de SushiFan
-- Ejecutar DESPUÉS de migration_modo.sql
-- Precios en centavos: $9.500 = 950000, $10.000 = 1000000, etc.

-- ============================================================
-- CATEGORÍAS
-- ============================================================

INSERT INTO categorias (nombre, orden, activa, modo) VALUES
  ('Tapeo',         1, true, 'resto'),
  ('Entradas',      2, true, 'resto'),
  ('Roll',          3, true, 'resto'),
  ('Hot Rolls',     4, true, 'resto'),
  ('Rolls Veggies', 5, true, 'resto'),
  ('Delicatessen',  6, true, 'resto');

-- ============================================================
-- ÍTEMS — TAPEO
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Tapeo Uno',
  'Dos piezas de langostinos marinados en limón, jengibre y ajo y queso Finlandia / dos piezas de langostinos Ebi Furai rebozado en panko y queso Finlandia.',
  950000, 1, true
FROM categorias WHERE nombre = 'Tapeo';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Tapeo Dos',
  'Dos piezas de salmón, palta y queso Finlandia / dos piezas de salmón ahumado y queso Finlandia.',
  950000, 2, true
FROM categorias WHERE nombre = 'Tapeo';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Tapeo Tres',
  'Dos piezas de kanikama y queso Finlandia / dos piezas de salmón ahumado y queso Finlandia.',
  950000, 3, true
FROM categorias WHERE nombre = 'Tapeo';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Tapeo Cuatro',
  'Dos arrolladitos primavera, relleno de carne vacuna con verdeo y zanahoria.',
  950000, 4, true
FROM categorias WHERE nombre = 'Tapeo';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Tapeo Cinco',
  'Cuatro tiraditos de salmón con salsa maracuyá, corona de batatas.',
  950000, 5, true
FROM categorias WHERE nombre = 'Tapeo';

-- ============================================================
-- ÍTEMS — ENTRADAS
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Entrada 1',
  'Cuatro tiraditos de salmón con salsa de maracuyá, corona de batatas y gota de Siracha.',
  700000, 1, true
FROM categorias WHERE nombre = 'Entradas';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Entrada 2',
  'Dos arrolladitos primavera con salsa agridulce.',
  700000, 2, true
FROM categorias WHERE nombre = 'Entradas';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Entrada 3',
  'Cuatro langostinos Ebi Furai apanados con panko.',
  700000, 3, true
FROM categorias WHERE nombre = 'Entradas';

-- ============================================================
-- ÍTEMS — ROLL (con precio dual: 4P. / 8P.)
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Roll 1',
  'Ocho piezas de langostinos marinados, jengibre, ajo y queso Finlandia. Con altura de batatas fritas y salsa lacrema de Siracha.',
  950000, '4P.', 1600000, '8P.', 1, true
FROM categorias WHERE nombre = 'Roll';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Roll 2',
  'Ocho piezas de langostinos Ebi Furai, queso Finlandia con topping de salmón, altura de batatas fritas y salsa maracuyá.',
  1000000, '4P.', 1700000, '8P.', 2, true
FROM categorias WHERE nombre = 'Roll';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Roll 3',
  'Ocho piezas de salmón y queso Finlandia con topping de guacamole.',
  1000000, '4P.', 1700000, '8P.', 3, true
FROM categorias WHERE nombre = 'Roll';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Roll 4',
  'Ocho piezas de kanikama y queso Finlandia. Altura de crocante miami.',
  900000, '4P.', 1500000, '8P.', 4, true
FROM categorias WHERE nombre = 'Roll';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Roll 5',
  'Ocho piezas de salmón y palta con topping de maracuyá.',
  1000000, '4P.', 1700000, '8P.', 5, true
FROM categorias WHERE nombre = 'Roll';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Roll 6',
  'Cuatro piezas de langostinos Ebi Furai / cuatro piezas de tartar de salmón / cuatro piezas de langostinos marinados en limón, ajo, jengibre y queso Finlandia. Altura de batatas fritas y salsa maracuyá.',
  1000000, '4P.', 1700000, '8P.', 6, true
FROM categorias WHERE nombre = 'Roll';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Roll 7',
  'Cuatro piezas de salmón, palta y queso Finlandia con topping de salmón ahumado / cuatro piezas de langostinos marinados con topping de guacamole.',
  1000000, '4P.', 1700000, '8P.', 7, true
FROM categorias WHERE nombre = 'Roll';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Roll 8',
  'Cuatro piezas sakeroll de salmón con lacrema de Wasabi / cuatro piezas de langostinos marinados en limón, ajo, jengibre y queso Finlandia.',
  1000000, '4P.', 1700000, '8P.', 8, true
FROM categorias WHERE nombre = 'Roll';

-- ============================================================
-- ÍTEMS — HOT ROLLS
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Hot 1',
  'Ocho piezas de salmón y palta rebozado en panko.',
  1700000, 1, true
FROM categorias WHERE nombre = 'Hot Rolls';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Hot 2',
  'Ocho piezas de langostino y palta rebozado en panko.',
  1700000, 2, true
FROM categorias WHERE nombre = 'Hot Rolls';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Hot 3',
  'Cuatro piezas de langostinos y palta rebozado en panko / cuatro piezas de salmón y palta rebozado en panko.',
  1700000, 3, true
FROM categorias WHERE nombre = 'Hot Rolls';

-- ============================================================
-- ÍTEMS — ROLLS VEGGIES (con precio dual: 4P. / 8P.)
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Veggie 1',
  'Ocho piezas de zanahoria, pepino, palta y queso Finlandia. Topping de Tamago. Corona de batatas y salsa Siracha.',
  900000, '4P.', 1500000, '8P.', 1, true
FROM categorias WHERE nombre = 'Rolls Veggies';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Veggie 2',
  'Ocho piezas de tomate seco, palta y queso Finlandia. Topping de remolacha. Lacrema de Kewpie.',
  900000, '4P.', 1500000, '8P.', 2, true
FROM categorias WHERE nombre = 'Rolls Veggies';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Veggie 3',
  'Ocho piezas de tomate seco, palta y queso Finlandia. Altura de flores. Salsa maracuyá.',
  900000, '4P.', 1500000, '8P.', 3, true
FROM categorias WHERE nombre = 'Rolls Veggies';

INSERT INTO items (categoria_id, nombre, descripcion, precio, etiqueta_precio, precio_alternativo, etiqueta_precio_alt, orden, disponible)
SELECT id, 'Veggie 4',
  'Ocho piezas de remolacha, zanahoria y queso Finlandia. Topping de Tamagoyaki. Salsa lacrema de Siracha.',
  900000, '4P.', 1500000, '8P.', 4, true
FROM categorias WHERE nombre = 'Rolls Veggies';

-- ============================================================
-- ÍTEMS — DELICATESSEN
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Delicatessen 1',
  'Cuatro piezas de Tamago con salmón ahumado, queso Finlandia, corona de batatas y salsa maracuyá.',
  1000000, 1, true
FROM categorias WHERE nombre = 'Delicatessen';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Delicatessen 2',
  'Cuatro geishas de salmón y queso Finlandia.',
  1000000, 2, true
FROM categorias WHERE nombre = 'Delicatessen';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Delicatessen 3',
  'Cuatro geishas de salmón, langostino Ebi Furai y queso Finlandia.',
  1000000, 3, true
FROM categorias WHERE nombre = 'Delicatessen';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Delicatessen 4',
  'Cuatro Nigris flameados con salsa teriyaki.',
  1000000, 4, true
FROM categorias WHERE nombre = 'Delicatessen';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Delicatessen 5',
  'Cuatro Nigris clásicos.',
  1000000, 5, true
FROM categorias WHERE nombre = 'Delicatessen';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Delicatessen 6',
  'Cuatro sashimis.',
  1300000, 6, true
FROM categorias WHERE nombre = 'Delicatessen';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Delicatessen 7',
  'Cuatro sashimis tataki.',
  1500000, 7, true
FROM categorias WHERE nombre = 'Delicatessen';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Delicatessen 8',
  'Cuatro piezas de Tamago, langostino Ebi Furai y queso Finlandia. Corona de batatas.',
  1000000, 8, true
FROM categorias WHERE nombre = 'Delicatessen';
