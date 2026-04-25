-- Seed: menú Takeaway de SushiFan
-- Ejecutar DESPUÉS de migration_modo.sql
-- Precios en centavos: $26.000 = 2600000, $37.500 = 3750000, etc.

-- ============================================================
-- CATEGORÍAS
-- ============================================================

INSERT INTO categorias (nombre, orden, activa, modo) VALUES
  ('Combos',                 1, true, 'takeaway'),
  ('Hot Rolls',              2, true, 'takeaway'),
  ('Rolls Veggies',          3, true, 'takeaway'),
  ('Roll Vegano',            4, true, 'takeaway'),
  ('Sushi Salad',            5, true, 'takeaway'),
  ('Entradas y Delicateses', 6, true, 'takeaway'),
  ('Extras',                 7, true, 'takeaway');

-- ============================================================
-- ÍTEMS — COMBOS
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '16 Piezas Classic',
  '4 Salmón palta y queso / 4 Langostinos palta y queso corona de cebollita malbec / 4 Salmón ahumado y queso / 4 Langostino Ebi Furai. Palitos y salsa incluidos.',
  2600000, 1, true
FROM categorias WHERE nombre = 'Combos' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '24 Piezas Delicious',
  '4 Salmón palta y queso / 4 Langostinos palta y queso corona cebollitas al malbec / 4 Nigiris de salmón flambeados / 4 Tamagos salmón ahumado corona de batata frita / 4 Salmón ahumado y queso / 4 Langostinos rebozado con palta y gota de Sriracha. Palitos y salsa incluidos.',
  3750000, 2, true
FROM categorias WHERE nombre = 'Combos' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '32 Piezas Queen',
  '4 Nigiris de salmón flambeados / 4 Tamagos salmón ahumado corona de batata frita / 4 Langostinos palta y queso corona cebollitas al malbec / 4 Langostinos Ebi Furai y palta / 8 Salmón palta y queso / 4 Geishas / 4 Makis con salsa teriyaki y corona crocante. Palitos y salsa incluidos.',
  4600000, 3, true
FROM categorias WHERE nombre = 'Combos' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '16 Piezas New',
  '4 Salmón palta y queso / 4 Langostinos palta y queso corona de cebollita malbec / 4 Kanikama y queso / 4 Capresse. Palitos y salsa incluidos.',
  2550000, 4, true
FROM categorias WHERE nombre = 'Combos' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '24 Piezas New',
  '4 Salmón palta y queso / 4 Langostinos palta y queso corona cebollitas al malbec / 4 Kanikama y queso / 4 Veggie / 4 Salmón ahumado y queso / 4 Langostinos rebozado con palta y gota de Sriracha. Palitos y salsa incluidos.',
  3700000, 5, true
FROM categorias WHERE nombre = 'Combos' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '32 Piezas New',
  '4 Nigiris de salmón flambeados / 4 Kanikama y queso / 4 Langostinos palta y queso corona cebollitas al malbec / 4 Langostinos Ebi Furai y palta / 8 Salmón palta y queso / 4 Capresse / 4 Makis con salsa teriyaki y corona crocante. Palitos y salsa incluidos.',
  4500000, 6, true
FROM categorias WHERE nombre = 'Combos' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '48 Piezas King',
  '4 Salmón palta y queso / 4 Nigiris de salmón / 4 Salmón ahumado y queso / 8 Langostino Ebi Furai y queso / 8 Langostino queso corona de cebollitas al malbec / 4 Geishas / 4 Sashimis / 8 Makis crocante de maní salsa teriyaki / 4 Tamagos salmón ahumado. Palitos y salsa incluidos.',
  7200000, 7, true
FROM categorias WHERE nombre = 'Combos' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '72 Piezas Imperial',
  '4 Salmón palta y queso / 4 Langostinos palta y queso / 6 Nigiris de salmón (3 clásicos, 3 flambeados) / 5 Geishas / 5 Sashimis / 8 Makis crocante de maní / 8 Langostino rebozado palta con gota de Sriracha / 4 Salmón ahumado y queso / 4 Langostino queso corona de cebollitas al malbec / 8 Tamago Ebi Furai queso con batatas fritas y salsa maracuyá / 8 Vegetariano / 8 Tamagos salmón ahumado. Palitos y salsa incluidos.',
  9600000, 8, true
FROM categorias WHERE nombre = 'Combos' AND modo = 'takeaway';

-- ============================================================
-- ÍTEMS — HOT ROLLS
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '8 Piezas Hot Roll',
  'A elección: salmón y palta, o langostinos y palta.',
  1600000, 1, true
FROM categorias WHERE nombre = 'Hot Rolls' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '16 Piezas Hot Roll',
  '8 salmón y palta / 8 langostinos y palta.',
  3000000, 2, true
FROM categorias WHERE nombre = 'Hot Rolls' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '24 Piezas Hot Roll',
  '12 salmón y palta / 12 langostinos y palta. Palitos y salsa incluidos.',
  4500000, 3, true
FROM categorias WHERE nombre = 'Hot Rolls' AND modo = 'takeaway';

-- ============================================================
-- ÍTEMS — ROLLS VEGGIES
-- TODO: confirmar precios con el cliente (no visibles en las imágenes)
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Zanahoria Palta y Queso',
  'Palitos y salsa incluidos.',
  0, 1, true
FROM categorias WHERE nombre = 'Rolls Veggies' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Pepino Palta y Queso',
  'Palitos y salsa incluidos.',
  0, 2, true
FROM categorias WHERE nombre = 'Rolls Veggies' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Tomate Seco Palta y Queso',
  'Palitos y salsa incluidos.',
  0, 3, true
FROM categorias WHERE nombre = 'Rolls Veggies' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Tomate Seco Palta Albahaca y Queso',
  'Palitos y salsa incluidos.',
  0, 4, true
FROM categorias WHERE nombre = 'Rolls Veggies' AND modo = 'takeaway';

-- ============================================================
-- ÍTEMS — ROLL VEGANO
-- TODO: confirmar precios con el cliente (no visibles en las imágenes)
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Zanahoria Palta y Pepinos',
  'Palitos y salsa incluidos.',
  0, 1, true
FROM categorias WHERE nombre = 'Roll Vegano' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Pepino Palta y Tomates Secos',
  'Palitos y salsa incluidos.',
  0, 2, true
FROM categorias WHERE nombre = 'Roll Vegano' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Tomate Seco Palta',
  'Palitos y salsa incluidos.',
  0, 3, true
FROM categorias WHERE nombre = 'Roll Vegano' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Tomate Seco Palta Pepinos y Zanahorias',
  'Palitos y salsa incluidos.',
  0, 4, true
FROM categorias WHERE nombre = 'Roll Vegano' AND modo = 'takeaway';

-- ============================================================
-- ÍTEMS — SUSHI SALAD
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Salad Salmón',
  'Colchón de arroz, palta, queso y salmón.',
  2200000, 1, true
FROM categorias WHERE nombre = 'Sushi Salad' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Salad Langostino Ebi Furai',
  'Colchón de arroz, palta, queso y langostinos rebozados.',
  2200000, 2, true
FROM categorias WHERE nombre = 'Sushi Salad' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Salad Mixta',
  'Colchón de arroz, palta, queso, salmón y langostinos.',
  2420000, 3, true
FROM categorias WHERE nombre = 'Sushi Salad' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Salad Vegetariana',
  'Colchón de arroz, palta, queso y verduras de estación.',
  2100000, 4, true
FROM categorias WHERE nombre = 'Sushi Salad' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Salad Kanikamas',
  'Colchón de arroz, palta, queso y kanikamas.',
  2100000, 5, true
FROM categorias WHERE nombre = 'Sushi Salad' AND modo = 'takeaway';

-- ============================================================
-- ÍTEMS — ENTRADAS Y DELICATESES
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '2 Arrolladitos Primavera', '', 580000, 1, true
FROM categorias WHERE nombre = 'Entradas y Delicateses' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '5 Sashimi', '', 1160000, 2, true
FROM categorias WHERE nombre = 'Entradas y Delicateses' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '4 Nigiris Clásico', '', 1050000, 3, true
FROM categorias WHERE nombre = 'Entradas y Delicateses' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '4 Nigiris Flambeados', '', 1150000, 4, true
FROM categorias WHERE nombre = 'Entradas y Delicateses' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '8 Tamago con Batatitas', '', 1600000, 5, true
FROM categorias WHERE nombre = 'Entradas y Delicateses' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, '8 Tamago Ebi Furai con Batatitas', '', 1600000, 6, true
FROM categorias WHERE nombre = 'Entradas y Delicateses' AND modo = 'takeaway';

-- ============================================================
-- ÍTEMS — EXTRAS
-- ============================================================

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Wasabi', '', 100000, 1, true
FROM categorias WHERE nombre = 'Extras' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Jengibre', '', 100000, 2, true
FROM categorias WHERE nombre = 'Extras' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Soja Blister', '', 100000, 3, true
FROM categorias WHERE nombre = 'Extras' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Salsa Buenos Aires', '', 100000, 4, true
FROM categorias WHERE nombre = 'Extras' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Salsa Agridulce', '', 100000, 5, true
FROM categorias WHERE nombre = 'Extras' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Salsa Teriyaki', '', 100000, 6, true
FROM categorias WHERE nombre = 'Extras' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Salsa Picante', '', 120000, 7, true
FROM categorias WHERE nombre = 'Extras' AND modo = 'takeaway';

INSERT INTO items (categoria_id, nombre, descripcion, precio, orden, disponible)
SELECT id, 'Palitos', '', 50000, 8, true
FROM categorias WHERE nombre = 'Extras' AND modo = 'takeaway';
