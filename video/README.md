# Videos comerciales de GC GMAO (Remotion)

Video del sitio (guion A, 1:45, 1920×1080), sin voz: música de fondo, textos animados,
tomas de Envato y la interfaz del sistema.

## Material que no está en el repositorio

Los clips y la música tienen licencia de Envato y no se suben. Para renderizar hay que dejarlos aquí:

| Ruta | Qué es |
| --- | --- |
| `public/audio/tech.mp3` | ArrowHeartMedia — Tech (1:50, 112 BPM) |
| `public/clips/manos-laptop-celular.mp4` | Manos en laptop con celular sobre el escritorio |
| `public/clips/monitor-verde.mp4` | Hombre frente a monitor con pantalla verde |
| `public/clips/tecnico-alberca.mp4` | Técnico en el sistema de filtrado de una alberca |
| `public/clips/tecnico-celular.mov` | Trabajador con casco usando el celular |
| `public/clips/tecnico-laptop-planta.mp4` | Técnico con laptop en una planta |

## Comandos

```bash
npm install
npm run dev            # Remotion Studio para revisar
npm run render:sitio   # out/gcgmao-sitio.mp4
npm run comprimir:sitio  # versión < 8 MB para la landing
```

En el contenedor de la nube, Chrome no se descarga: `export REMOTION_CHROME=<ruta a headless_shell>`.

## Pantalla verde

`src/ui/esquinas-monitor.json` guarda las cuatro esquinas del verde en cada cuadro del clip
(medidas con `track_verde.py`). `MonitorVerde` coloca cualquier contenido de 1440×900 con esa perspectiva.
Para usar la grabación real del sistema, se cambia el contenido de `PlanoReveal` y
`PlanoValidacionVerde` en `src/SitioWeb.tsx` por un `<OffthreadVideo>` de la grabación.

## Música

El video arranca en el segundo 1.8 de la pista (`inicioMusica`), así el remate final de la canción
cae justo en el cierre con el logo.
