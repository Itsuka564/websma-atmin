-- ==========================================
-- SKEMA DATABASE SMA NEGERI 1 PURWOREJO
-- Jalankan skrip ini di SQL Editor Supabase Anda
-- ==========================================

-- 1. TABEL BERITA
CREATE TABLE IF NOT EXISTS public.berita (
    id TEXT PRIMARY KEY,
    judul TEXT NOT NULL,
    tanggal TEXT NOT NULL,
    penulis TEXT DEFAULT '',
    ringkasan TEXT NOT NULL,
    isi TEXT NOT NULL,
    gambar TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk mempercepat query berdasarkan tanggal
CREATE INDEX IF NOT EXISTS idx_berita_tanggal ON public.berita (tanggal DESC);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS: Siapapun (publik) bisa membaca berita
CREATE POLICY "Semua orang bisa melihat berita" 
ON public.berita 
FOR SELECT 
USING (true);

-- Kebijakan RLS: Hanya service role / role admin yang dapat mengubah data
CREATE POLICY "Service role bebas mengelola berita" 
ON public.berita 
FOR ALL 
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');


-- 2. TABEL GALERI
CREATE TABLE IF NOT EXISTS public.galeri (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    kategori TEXT NOT NULL,
    src TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk mempercepat query urutan foto galeri
CREATE INDEX IF NOT EXISTS idx_galeri_created_at ON public.galeri (created_at DESC);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.galeri ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS: Siapapun (publik) bisa melihat galeri
CREATE POLICY "Semua orang bisa melihat foto galeri" 
ON public.galeri 
FOR SELECT 
USING (true);

-- Kebijakan RLS: Hanya service role / role admin yang dapat mengubah galeri
CREATE POLICY "Service role bebas mengelola galeri" 
ON public.galeri 
FOR ALL 
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');


-- 3. STORAGE BUCKET (UPLOADS)
-- Buat bucket penyimpanan foto/gambar dengan status publik
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Kebijakan Storage: Siapapun dapat melihat dan mengunduh gambar
CREATE POLICY "Publik dapat melihat objek uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');

-- Kebijakan Storage: Service role / authenticated dapat mengunggah dan mengelola gambar
CREATE POLICY "Service role dapat mengelola uploads"
ON storage.objects FOR ALL
USING (bucket_id = 'uploads' AND (auth.role() = 'service_role' OR auth.role() = 'authenticated'));


-- 4. TABEL PENGATURAN SITUS (CMS BERANDA, KEUANGAN, SPMB, INFORMASI)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aktifkan RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS: Siapapun (publik) bisa membaca pengaturan
CREATE POLICY "Semua orang bisa melihat pengaturan situs" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Kebijakan RLS: Hanya service role / role admin yang dapat mengubah pengaturan
CREATE POLICY "Service role bebas mengelola pengaturan situs" 
ON public.site_settings 
FOR ALL 
USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

