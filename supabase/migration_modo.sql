-- Migration: soporte para menú Restó / Takeaway + precios duales
-- Ejecutar en el editor SQL de Supabase

-- 1. Agregar campo modo a categorias
ALTER TABLE categorias
  ADD COLUMN IF NOT EXISTS modo TEXT NOT NULL DEFAULT 'resto'
  CHECK (modo IN ('resto', 'takeaway', 'ambos'));

-- 2. Agregar precios duales a items (para ítems con dos porciones, ej: 4P. $10.000 / $17.000)
ALTER TABLE items
  ADD COLUMN IF NOT EXISTS precio_alternativo INTEGER CHECK (precio_alternativo >= 0),
  ADD COLUMN IF NOT EXISTS etiqueta_precio TEXT,
  ADD COLUMN IF NOT EXISTS etiqueta_precio_alt TEXT;
