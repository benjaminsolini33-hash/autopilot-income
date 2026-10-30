# Autopilot Fit AI

Prototipo independiente para Autopilot Income: asistente de movimiento en casa, borradores de marketing y backend opcional de IA.

## Funciones del prototipo

- Plantillas locales de planes generales de movimiento y marketing.
- Backend Node.js para generación de texto con Gemini 3.8 Flash.
- Tareas permitidas: fitness, marketing y guiones de video.
- Pruebas automatizadas y compilación mediante GitHub Actions.
- Los guiones y prompts son borradores; no equivalen a un archivo de video terminado.

## Estado y límites

- El backend usa `GEMINI_API_KEY` solo en el servidor; nunca usar una variable `VITE_*` para secretos.
- El modelo queda fijado en `gemini-3.8-flash`; el navegador no puede elegir modelos ni enviar claves.
- Límite básico: 8 solicitudes por minuto y por IP en cada instancia. Es una protección inicial en memoria, no un limitador distribuido para producción.
- Sin autenticación, base de datos, publicación social, campañas ni tareas programadas.
- No se activa facturación ni se configura hosting. La disponibilidad gratuita depende de las cuotas vigentes de Google.
- El uso de la API gratuita puede estar sujeto a condiciones de tratamiento de datos del proveedor; no enviar datos personales sensibles.
- El enlace Hotmart con error 404 sigue sin promocionarse hasta verificar un HotLink válido.
- La aplicación Floot original se conserva sin cambios: https://autopilot-income.floot.app

## Requisitos

Node.js 22 o superior y npm. No hace falta instalar Python.

## Arranque local (Windows PowerShell)

1. Copiá `.env.example` a un archivo local llamado `.env` y cargá `GEMINI_API_KEY` allí. El archivo `.env` está excluido de Git.
2. PowerShell no carga automáticamente archivos `.env`; para esta versión, en la terminal del servidor ejecutá:
   `$env:GEMINI_API_KEY="TU_CLAVE"`
3. En una terminal: `npm install` y luego `npm run server`.
4. En otra terminal: `npm run dev`.
5. Abrí la URL local que informa Vite. El frontend usa el proxy `/api` hacia el backend local.

No pegues la clave en el código, en el navegador, en GitHub ni en este chat. No configures facturación para probar. Si la cuota gratuita se agota, la API debe devolver un error sin habilitar pagos.

## Comandos de validación

```bash
npm test
npm run build
```

## Próximos pasos antes de producción

1. Integrar los formularios del frontend con el endpoint y mostrar estados de carga/error.
2. Agregar autenticación, cuotas persistentes, observabilidad y controles antiabuso.
3. Elegir hosting gratuito y validar sus límites antes de desplegar.
4. Verificar enlaces afiliados y permisos de publicación.
5. Mantener revisión humana antes de publicar cualquier contenido.
