# Autopilot Fit AI

Prototipo independiente de Autopilot Income: asistente de movimiento en casa, borradores de marketing y backend opcional de generación de texto.

## Funciones implementadas en el repositorio

- Plantillas locales para planes generales de movimiento y borradores de marketing.
- Generación local de calendarios semanales, textos y prompts/guiones de video.
- Backend Node.js opcional para generación de texto mediante Gemini.
- Tareas admitidas por el endpoint: `fitness`, `marketing` y `video_script`.
- Tests automatizados y comandos de compilación.
- Los guiones y prompts son borradores; no equivalen a un archivo de video terminado.

## Estado y límites

- El backend usa `GEMINI_API_KEY` solo en el servidor; nunca usar una variable `VITE_*` para secretos.
- El modelo está fijado en el backend como `gemini-3.8-flash`. La disponibilidad y cuota deben verificarse en la cuenta de Google correspondiente.
- Límite básico: 8 solicitudes por minuto y por IP en cada instancia. Se almacena en memoria; no es un limitador distribuido ni persistente.
- No hay autenticación, base de datos, cola de trabajos, orquestador MCP, publicación social ni campañas automáticas implementadas en este prototipo.
- La interfaz (`src/App.jsx`) consulta `/api/health` al abrirse y llama a `/api/generate` cuando el usuario solicita generación con Gemini. La integración frontend/backend está implementada para desarrollo local; la conexión real con Google requiere una clave válida y cuota disponible.
- No se configura hosting ni facturación. La disponibilidad gratuita depende de las cuotas y condiciones vigentes del proveedor.
- No enviar datos personales sensibles a proveedores externos.
- La aplicación Floot original se conserva sin cambios: https://autopilot-income.floot.app

Para el estado técnico detallado, alcance y próximos pasos, consultar [docs/PROJECT_STATUS_AND_ARCHITECTURE.md](docs/PROJECT_STATUS_AND_ARCHITECTURE.md).

## Requisitos

Node.js 22 o superior y npm. No hace falta instalar Python.

## Arranque local (Windows PowerShell)

1. Copiá `.env.example` a un archivo local llamado `.env` y cargá `GEMINI_API_KEY` allí. El archivo `.env` debe permanecer excluido de Git.
2. PowerShell no carga automáticamente archivos `.env`; para esta versión, en la terminal del servidor ejecutá:
   `$env:GEMINI_API_KEY="TU_CLAVE"`
3. En una terminal: `npm install` y luego `npm run server`.
4. En otra terminal: `npm run dev`.
5. Abrí la URL local que informa Vite. El frontend usa el proxy `/api` hacia el backend local.

No pegues la clave en el código, en el navegador, en GitHub ni en chats. No configures facturación para probar. Si la cuota gratuita se agota, la API debe devolver un error sin habilitar pagos.

## Comandos de validación

```bash
npm test
npm run build
```

## Próximos pasos antes de producción

1. Probar una solicitud real a Gemini con una clave configurada por el usuario, sin habilitar facturación, y verificar los estados de carga, éxito y error.
2. Agregar autenticación, cuotas persistentes, observabilidad y controles antiabuso antes de exponer el endpoint públicamente.
3. Elegir hosting y validar sus límites, costos y manejo de secretos antes de desplegar.
4. Verificar enlaces afiliados, condiciones comerciales y permisos de publicación.
5. Mantener revisión humana antes de publicar cualquier contenido.

## Seguridad y alcance

Este repositorio es un prototipo. No promete operación 24/7, ingresos, resultados de salud ni automatización autónoma. Las integraciones externas, cuotas y permisos deben probarse por separado. Ninguna función de este repositorio autoriza compras, contratación de servicios o publicación automática.
