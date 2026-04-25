-- Schema SushiFan Menu
-- Ejecutar en el editor SQL de Supabase

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla: categorias
CREATE TABLE IF NOT EXISTS categorias (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre     TEXT NOT NULL CHECK (char_length(nombre) BETWEEN 1 AND 100),
  orden      INTEGER NOT NULL DEFAULT 0,
  activa     BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categorias_orden ON categorias (orden ASC);

-- Tabla: items
CREATE TABLE IF NOT EXISTS items (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  categoria_id UUID NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
  nombre       TEXT NOT NULL CHECK (char_length(nombre) BETWEEN 1 AND 150),
  descripcion  TEXT CHECK (char_length(descripcion) <= 500),
  precio       INTEGER NOT NULL CHECK (precio >= 0),
  imagen_url   TEXT,
  disponible   BOOLEAN NOT NULL DEFAULT true,
  orden        INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_items_orden ON items (categoria_id, orden ASC);

-- Trigger: updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_categorias ON categorias;
CREATE TRIGGER set_updated_at_categorias
  BEFORE UPDATE ON categorias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_items ON items;
CREATE TRIGGER set_updated_at_items
  BEFORE UPDATE ON items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Lectura pública (el menú no requiere autenticación)
DROP POLICY IF EXISTS "public_read_categorias" ON categorias;
CREATE POLICY "public_read_categorias" ON categorias
  FOR SELECT USING (activa = true);

DROP POLICY IF EXISTS "public_read_items" ON items;
CREATE POLICY "public_read_items" ON items
  FOR SELECT USING (true);

-- Escritura solo para usuarios autenticados (admin)
DROP POLICY IF EXISTS "auth_all_categorias" ON categorias;
CREATE POLICY "auth_all_categorias" ON categorias
  FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_all_items" ON items;
CREATE POLICY "auth_all_items" ON items
  FOR ALL USING (auth.role() = 'authenticated');

-- Storage: bucket público para imágenes
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_images" ON storage.objects;
CREATE POLICY "public_read_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'menu-images');

DROP POLICY IF EXISTS "auth_upload_images" ON storage.objects;
CREATE POLICY "auth_upload_images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'menu-images' AND auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "auth_delete_images" ON storage.objects;
CREATE POLICY "auth_delete_images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'menu-images' AND auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "auth_update_images" ON storage.objects;
CREATE POLICY "auth_update_images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'menu-images' AND auth.role() = 'authenticated'
  );
