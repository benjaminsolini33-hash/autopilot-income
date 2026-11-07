# Estado técnico y arquitectura actual

> Documento de auditoría del código de la rama `main`, revisado el 7 de noviembre de 2026. Describe lo que está implementado en el repositorio; no implica que esté desplegado ni conectado a la aplicación Floot.

## Resumen

Autopilot Fit AI es un prototipo web con plantillas locales de fitness y marketing, más un backend Node.js opcional para generación de texto mediante Gemini. No es todavía una plataforma autónoma de agentes ni un servicio multiusuario listo para producción.

## Componentes verificados

### Frontend y lógica local
- `src/agentLogic.js` exporta `createFitnessPlan()` y `makeDraft()`.
- Las plantillas locales generan orientación general de movimiento, borradores de marketing, calendarios semanales y prompts/guiones de video.
- Los textos generados son borradores. No se genera un archivo de video, no se publica en redes y no se ejecutan campañas desde estas funciones.
- La lógica local contiene un CTA hacia `https://autopilot-income.floot.app/entrenador`; verificar manualmente disponibilidad y comportamiento antes de usarlo en una campaña.

### Backend de generación de texto
Archivo: `server/index.js`

- Servidor HTTP Node.js.
- `GET /api/health`: informa proveedor, modelo configurado y si existe una clave; no devuelve la clave.
- `POST /api/generate`: acepta las tareas `fitness`, `marketing` y `video_script`.
- La clave `GEMINI_API_KEY` se lee del entorno del servidor y se envía a Gemini desde el backend.
- Validación de tarea y longitud de entrada; cuerpo máximo de 12.000 caracteres.
- Límite básico de 8 solicitudes por minuto por IP, almacenado en memoria por instancia.
- Manejo de errores de cuota, autenticación, proveedor y timeout.

El nombre del modelo está fijado en el código como `gemini-3.8-flash`. Este documento no afirma que el modelo esté disponible para cada cuenta ni que la API tenga cuota gratuita; eso debe verificarse en el proyecto de Google correspondiente.

### Desarrollo local
- Node.js 22 o superior y npm, según el README.
- Vite sirve el frontend y configura un proxy de `/api` hacia `http://127.0.0.1:8787`.
- `npm run server` inicia el backend; `npm run dev` inicia Vite.
- `npm test` ejecuta los tests declarados en `package.json`.
- `npm run build` genera la compilación de producción.

## Límites y riesgos pendientes

1. No se verificó en esta auditoría que los formularios de la interfaz estén conectados a `POST /api/generate`; la existencia del endpoint no demuestra integración desde el navegador.
2. No hay autenticación de usuarios ni autorización por cuenta.
3. El rate limit es local a cada proceso y se pierde al reiniciar; no es una cuota persistente ni distribuida.
4. No hay base de datos, cola de tareas, workers remotos ni orquestador MCP implementados en este prototipo.
5. No hay publicación social, programación de publicaciones, analítica de afiliados ni ejecución automática de campañas.
6. El backend escucha en `127.0.0.1`; el proxy de Vite también apunta a loopback. No constituye por sí solo un despliegue remoto.
7. La protección de secretos depende de configurar `GEMINI_API_KEY` únicamente en el entorno del servidor y excluir `.env` de Git.
8. La disponibilidad, precio y tratamiento de datos de Gemini dependen de la cuenta y las condiciones vigentes del proveedor.

## Próximos pasos recomendados

### P0 — Verificación antes de ampliar
- Confirmar si la UI llama al backend y probar los estados de carga, error y éxito.
- Ejecutar `npm test` y `npm run build` en un entorno limpio.
- Verificar el modelo y las cuotas en la consola oficial de Google sin habilitar facturación.
- Confirmar que no haya secretos en el historial de Git.

### P1 — Endurecimiento
- Añadir autenticación y autorización antes de ofrecer el endpoint públicamente.
- Aplicar límites persistentes por usuario/IP y protección contra abuso.
- Añadir logs sin datos sensibles, métricas y manejo de errores operativos.
- Definir política de retención y consentimiento antes de enviar datos de usuarios a un proveedor externo.

### P2 — Agentes y automatización
- Diseñar contratos tipados para Fitness, Marketing y Video Script.
- Incorporar cola de trabajos y estados persistentes solo cuando exista un caso de uso y hosting adecuados.
- Añadir integraciones MCP con permisos mínimos, registro de acciones y aprobación humana.
- Mantener publicación, gasto, compra de créditos y cambios comerciales detrás de aprobación explícita.

## Criterios de aceptación para producción

- Autenticación y autorización probadas.
- Secretos solo en el servidor y sin exposición en logs o cliente.
- Límites persistentes y controles antiabuso.
- Tests automatizados y build aprobados en CI.
- Despliegue y endpoint de salud verificados en el hosting elegido.
- Revisión humana para contenido, enlaces afiliados y cualquier publicación.
- Documentación de costos, cuotas, tratamiento de datos y rollback.

## Alcance de esta rama

Esta actualización es documental. No modifica el backend, la interfaz, las claves, las dependencias, la configuración de hosting ni la aplicación Floot. No despliega ni publica contenido.
