# BioGenesis

Aplicación web académica para catálogo y cotización de tecnología médica. El proyecto fue actualizado para trabajar con React + Vite, `json-server`, estructura por páginas, servicios centralizados para API y variables de entorno.

## Requisitos

- Node.js 20 recomendado
- npm

## Instalación

```bash
npm install
```

## Variables de entorno

El archivo `.env` contiene la URL base del backend local:

```env
VITE_API_URL=http://localhost:5001
```

Si se cambia el puerto del backend, solo se debe modificar este valor.

## Ejecutar backend local

```bash
npm run server
```

Este comando levanta `json-server` usando `server.json` en el puerto `5001`.

## Ejecutar frontend

En otra terminal:

```bash
npm start
```

Abrir:

```text
http://localhost:3000
```

## Usuario de prueba

```text
Correo: demo@biogenesis.com
Contraseña: 123456
```

## Mejoras aplicadas

- Migración a Vite para reducir dependencias antiguas.
- API centralizada mediante `src/config/api.js` y `src/services/apiClient.js`.
- Separación de páginas por carpeta dentro de `src/pages`.
- Tarjetas de productos con diseño más limpio.
- Texto largo con opción `Ver más / Ver menos`.
- Página `/about` rediseñada con imágenes locales para evitar fallos de carga.
- Footer renovado.
- Imágenes de respaldo cuando una imagen externa no carga.
