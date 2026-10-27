# Autopilot Fit AI

Prototipo independiente para el proyecto Autopilot Income: asistente informativo de movimiento en casa y borradores de marketing orgánico.

## Estado actual

- Interfaz React/Vite con generación local de borradores.
- No está conectada a la IA, base de datos, autenticación ni endpoints de la versión de Floot.
- No publica en redes, no ejecuta tareas en segundo plano y no realiza gastos.
- El enlace de afiliado de Hotmart previamente reportado con error 404 permanece sin promocionar hasta verificar un HotLink válido.
- La versión original de Floot se conserva sin cambios: https://autopilot-income.floot.app

## Ejecutar localmente

Requisitos: Node.js LTS y npm. Desde la carpeta del repositorio:

```bash
npm install
npm run dev
```

Para validar la compilación de producción:

```bash
npm run build
npm run preview
```

## Seguridad y costos

No guardes claves, tokens, credenciales ni datos de usuarios en este repositorio. Usá variables de entorno locales basadas en `.env.example` y mantené los secretos fuera de Git. Las dependencias declaradas son gratuitas y de código abierto; el uso de proveedores de IA, bases de datos o hosting puede tener límites o costos y no se habilitará sin autorización explícita.

## Próximas etapas de migración

1. Validar compilación local reproducible.
2. Migrar las páginas y estilos originales sin copiar secretos.
3. Sustituir servicios específicos de Floot por alternativas compatibles y gratuitas cuando sea viable.
4. Añadir pruebas y documentar límites antes de cualquier despliegue.
