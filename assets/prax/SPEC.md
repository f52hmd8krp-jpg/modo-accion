# PRAX — Spec de archivos

Suelta aquí los PNGs con estos nombres exactos. El componente los carga automáticamente. Si falta alguno, se renderiza el SVG paramétrico como fallback (no rompe nada).

## Estados (5)
Usar cuando PRAX representa el estado global del usuario.

- `prax-neutro.png` — base, sin halo, sin glow
- `prax-activo.png` — rayo blanco, posibilidad de halo verde
- `prax-enfocado.png` — rayo blanco, halo azul
- `prax-bajo.png` — rayo amarillo
- `prax-roto.png` — grietas rojas en cuerpo
- `prax-recuperando.png` — partículas blancas alrededor

## Variantes por hábito (7)
Usar cuando PRAX representa un hábito concreto.

- `prax-ejercicio.png` — con mancuernas
- `prax-lectura.png` — con libro
- `prax-estudio.png` — con portátil
- `prax-agua.png` — con botella
- `prax-meditacion.png` — postura meditación / ondas
- `prax-running.png` — cinta en la cabeza + líneas velocidad
- `prax-sueno.png` — gorro de dormir + ZZZ

## Especificaciones técnicas

- **Formato**: PNG con fondo transparente (preferido) o fondo oscuro uniforme `#07080a`
- **Resolución mínima**: 512×640 px (proporción 4:5)
- **Encuadre**: cuerpo completo centrado, ~10% margen
- **Estilo**: mate plástico, iluminación cenital suave, sin reflejos extremos

## Prompt base para Bing/Leonardo/ImageFX

```
3D character mascot, small black plastic figurine, large rounded teardrop-shaped head pointing up, small chubby body with tiny arms and feet, glowing white lightning bolt symbol on the chest, matte black material, soft studio lighting, dark background, centered, full body, isolated, octane render style, 4k
```

Variaciones al final:
- ` + green ambient glow halo` → activo
- ` + blue rim light` → enfocado
- ` + yellow lightning bolt instead of white` → bajo
- ` + red glowing cracks on body surface` → roto
- ` + white sparkle particles floating around` → recuperando
- ` + holding small dumbbells` → ejercicio
- ` + reading a book` → lectura
- ` + sitting in front of a laptop` → estudio
- ` + holding a water bottle` → agua
- ` + sitting in meditation pose, aura waves` → meditación
- ` + wearing white headband, motion lines` → running
- ` + wearing a sleeping cap with Zzz floating above` → sueño

## Tras generar

1. Pasa cada imagen por [remove.bg](https://remove.bg) o [photoroom.com](https://photoroom.com) para fondo transparente
2. Renombra al nombre exacto de la lista
3. Suéltalas en esta carpeta (`/www/assets/prax/`)
4. Recarga la app — aparecen automáticamente
