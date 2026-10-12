# Employee Manager App (Frontend)

SPA en **Angular 21** (Standalone Components, Signals) con Bootstrap 5. Consume la API REST de `../employeemanager`.

## Estructura

```
src/app/
├── app.ts / app.html     # Shell: <app-header /> + <router-outlet /> + <app-footer />
├── app.routes.ts         # '' → EmployeeList
├── app.config.ts         # provideRouter, provideHttpClient(withFetch()), hidratación SSR
├── employee.ts           # Interface Employee
├── employee-service.ts   # CRUD HTTP (usa environment.apiUrl)
├── layout/               # header y footer globales
└── employees/            # employee-list: toolbar (add + búsqueda), cards y modales
```

Convención: archivos sin sufijo `.component` (`employee-list.ts`, `employee-list.html`), agrupados por feature.

## Comandos

```bash
npm install
ng serve                    # http://localhost:4200
ng build                    # build + prerender (SSR)
ng test --watch=false       # pruebas con Vitest
```

La URL del backend se define en `src/environments/environment.ts` (`apiUrl`, por defecto `http://localhost:8080`). Arranca el backend antes que el frontend.

## Notas

- `HttpClient` usa `withFetch()` (recomendado para SSR).
- El código que usa APIs del navegador (`document`, `alert`) debe protegerse: SSR corre en Node.
- Bootstrap CSS y JS se cargan desde `angular.json`; no añadas CDNs en `index.html`.
