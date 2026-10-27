# Autopilot Fit AI

Prototipo independiente para el proyecto Autopilot Income: asistente informativo de movimiento en casa y borradores de marketing orgánico.

## Funciones disponibles en el prototipo

- Planes generales de movimiento en casa para 5, 10, 15 o 30 minutos, con indicaciones básicas de seguridad.
- Borradores de marketing para contenido vertical y publicaciones.
- Plan semanal con siete ideas de contenido y una lista de revisión responsable.
- Prompt de producción para una herramienta externa de video IA: propone escenas, textos, formato vertical y pautas de accesibilidad. **No crea un archivo de video.**
- Pruebas automatizadas para la lógica principal y compilación de producción mediante GitHub Actions.

## Estado real: qué está y qué no está activo

- La generación actual es local y basada en plantillas; **no está conectada a un modelo de IA**.
- No hay base de datos, autenticación ni endpoints de la versión de Floot en este prototipo.
- No publica en redes, no programa tareas en segundo plano, no ejecuta campañas ni realiza gastos.
- El enlace de afiliado de Hotmart previamente reportado con error 404 permanece sin promocionar hasta verificar un HotLink válido desde la cuenta de afiliado.
- La versión original de Floot se conserva sin cambios: https://autopilot-income.floot.app

## Ejecutar localmente

Requisitos: Node.js LTS y npm. Desde la carpeta del repositorio:

```bash
npm install
npm test
npm run dev
```

Para validar la compilación de producción:

```bash
npm run build
npm run preview
```

La interfaz de desarrollo local no equivale a un sitio publicado en internet.

## Seguridad y costos

No guardes claves, tokens, credenciales ni datos de usuarios en este repositorio. No expongas claves de IA en variables `VITE_*` ni en código del navegador. Las dependencias declaradas son gratuitas y de código abierto; el uso de proveedores de IA, bases de datos o hosting puede tener límites, condiciones de privacidad o costos. No se habilitará ningún servicio pago sin autorización explícita.

## Próximas etapas

1. Elegir una opción de ejecución backend que tenga un nivel gratuito verificable y permita guardar secretos del lado del servidor.
2. Evaluar un proveedor de IA y sus límites, privacidad y condiciones antes de conectarlo.
3. Añadir un endpoint seguro con límites de uso para evitar abuso o consumos inesperados.
4. Verificar un enlace de afiliado válido antes de incluir ofertas en borradores.
5. Evaluar hosting gratuito y despliegue solo después de comprobar límites y solicitar aprobación cuando corresponda.
