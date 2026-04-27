# Skill: Supabase Protocol

## Activación
Palabras clave: `query`, `tabla`, `migración`, `RLS`, `SQL`, `supabase`

## Reglas duras
- `SELECT` siempre con columnas específicas — **NUNCA** `SELECT *`
- Queries solo en `services/` — nunca en componentes `.jsx`
- RLS activado en toda tabla nueva
- Variables sensibles solo en `.env.local`
- Usar `.eq()`, `.filter()` con tipos correctos — nunca concatenar strings

## Formato respuesta
```sql
-- Ubicación: src/services/[modulo].js
-- Tabla: [nombre]

SELECT columna1, columna2
FROM tabla
WHERE condicion;
```
+ Política RLS si aplica:
```sql
CREATE POLICY "nombre" ON tabla
FOR SELECT USING (auth.uid() = user_id);
```

## NO
- Queries inline en componentes
- Escribir claves en código
- Deshabilitar RLS "temporalmente"
