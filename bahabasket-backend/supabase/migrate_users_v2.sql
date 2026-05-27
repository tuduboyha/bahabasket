-- Migration: add dob, bio, language columns + rename avatar → avatar_url
-- Run this once in the Supabase SQL Editor

-- 1. Rename existing 'avatar' column to 'avatar_url'
ALTER TABLE users RENAME COLUMN avatar TO avatar_url;

-- 2. Add missing profile columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS dob      TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio      TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS language TEXT DEFAULT '';
