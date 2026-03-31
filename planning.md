# Plan Proyecto CRM Autos - Latam

## 1. Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                     VPS (Railway/Render)                │
│  ┌─────────────────┐      ┌─────────────────────────┐  │
│  │   Vue SPA       │      │   Node.js API           │  │
│  │   (Frontend)    │ ◄──► │   (Backend)            │  │
│  └─────────────────┘      └───────────┬─────────────┘  │
│                                       │                │
│                             ┌─────────▼─────────────┐  │
│                             │   PostgreSQL         │  │
│                             │   (Prisma ORM)       │  │
│                             └───────────────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │   Servicios externos:                           │   │
│  │   - Mercado Pago (suscripciones)                │   │
│  │   - Email (Resend/SendGrid)                     │   │
│  │   - Cloudinary (imágenes)                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Stack Tecnológico

| Capa         | Tecnología                                  |
| ------------ | ------------------------------------------- |
| **Frontend** | Vue 3 + Tailwind CSS + Pinia + Vue Router   |
| **Backend**  | Node.js + Express o Fastify                 |
| **DB**       | PostgreSQL                                  |
| **ORM**      | Prisma                                      |
| **Auth**     | JWT con cookies httpOnly                    |
| **Pagos**    | Mercado Pago (suscripciones)                |
| **Storage**  | Cloudinary (imágenes)                       |
| **Email**    | Resend                                      |
| **Docker**   | Sí (obligatorio backend, opcional frontend) |
| **Hosting**  | Railway o Render                            |

---

## 3. Estructura de Repositorios

### Repo 1: `crm-autos-frontend`

```
crm-autos-frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/          # Buttons, inputs, modals
│   │   ├── dealers/         # Gestión dealers
│   │   ├── vehicles/        # Gestión autos
│   │   ├── subscriptions/   # Planes y pagos
│   │   └── dashboard/       # Métricas y analytics
│   ├── composables/        # Hooks reutilizables
│   ├── layouts/            # Layouts (auth, admin)
│   ├── pages/              # Vistas completas
│   ├── stores/             # Pinia stores
│   └── utils/              # Funciones helpers
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
└── package.json
```

**Justificación:**

- Separación pages/components: Las pages son vistas completas, los components son piezas reutilizables.
- Composables > mixins: Composition API permite mejor tipado y reutilización.
- Stores por dominio: Un store para auth, uno para vehicles, uno para dealers (no un store gigante).

### Repo 2: `crm-autos-backend`

```
crm-autos-backend/
├── src/
│   ├── config/             # Env vars, constants
│   ├── controllers/        # Lógica de endpoints
│   ├── middlewares/        # Auth, validation, errors
│   ├── routes/            # Definición de rutas
│   ├── services/          # Lógica de negocio
│   ├── utils/             # Helpers
│   └── index.ts           # Entry point
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── docker-compose.yml
├── Dockerfile
└── package.json
```

**Justificación:**

- Arquitectura Controller-Service: Los controllers solo reciben requests y delegan a services. Permite testing unitario y reutilizar servicios.
- Middlewares separados: Auth, validación, logging, errores en módulos independientes.
- Utils centralizados: Evitar duplicación de código helpers.

---

## 4. Modelo de Datos (Prisma Schema)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  DEALER_MANAGER
  DEALER_USER
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  TRIALING
}

enum VehicleStatus {
  AVAILABLE
  SOLD
  RESERVED
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  role          Role      @default(DEALER_USER)
  dealerId      String
  dealer        Dealer    @relation(fields: [dealerId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([dealerId])
}

model Dealer {
  id                  String   @id @default(uuid())
  name                String
  rut                 String   @unique
  email               String
  phone               String?
  address             String?
  logoUrl             String?
  subscriptionId      String?  @unique
  subscription        Subscription? @relation(fields: [subscriptionId], references: [id])
  users               User[]
  vehicles            Vehicle[]
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@index([subscriptionId])
}

model Subscription {
  id                String             @id @default(uuid())
  dealer            Dealer             @relation(fields: [dealerId], references: [id])
  dealerId          String             @unique
  plan              String             // "basic", "pro", "enterprise"
  status            SubscriptionStatus @default(TRIALING)
  mpSubscriptionId  String?            // ID de Mercado Pago
  mpCustomerId      String?            // Customer de MP
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}

model Vehicle {
  id            String        @id @default(uuid())
  dealerId      String
  dealer        Dealer        @relation(fields: [dealerId], references: [id])
  brand         String
  model         String
  year          Int
  version       String?
  price         Decimal       @db.Decimal(12, 2)
  km            Int?
  color         String?
  fuel          String?       // nafta, diesel, eléctrico, híbrido
  transmission  String?       // manual, automático
  condition     String?      // nuevo, usado
  vin           String?       @unique
  status        VehicleStatus @default(AVAILABLE)

  // Atributos variables en JSON
  features      Json?         // equipamiento, extras
  images        String[]     // URLs de fotos

  description   String?      @db.Text
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  @@index([dealerId])
  @@index([status])
  @@index([brand, model])
}
```

---

## 5. Endpoints de API

### Auth

| Método | Endpoint             | Descripción         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Registrar usuario   |
| POST   | `/api/auth/login`    | Login (retorna JWT) |
| POST   | `/api/auth/refresh`  | Refresh token       |
| POST   | `/api/auth/logout`   | Logout              |

### Dealers

| Método | Endpoint           | Descripción            |
| ------ | ------------------ | ---------------------- |
| GET    | `/api/dealers`     | Listar dealers (admin) |
| GET    | `/api/dealers/:id` | Ver dealer             |
| POST   | `/api/dealers`     | Crear dealer           |
| PUT    | `/api/dealers/:id` | Actualizar dealer      |

### Vehicles

| Método | Endpoint                   | Descripción                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api/vehicles`            | Listar autos (con filtros) |
| GET    | `/api/vehicles/:id`        | Ver auto                   |
| POST   | `/api/vehicles`            | Crear auto                 |
| PUT    | `/api/vehicles/:id`        | Actualizar auto            |
| DELETE | `/api/vehicles/:id`        | Eliminar auto              |
| POST   | `/api/vehicles/:id/images` | Subir imágenes             |

### Suscripciones (Mercado Pago)

| Método | Endpoint                            | Descripción               |
| ------ | ----------------------------------- | ------------------------- |
| GET    | `/api/subscription/plans`           | Listar planes disponibles |
| POST   | `/api/subscription/create-checkout` | Crear checkout MP         |
| POST   | `/api/subscription/webhook`         | Webhook de MP             |
| GET    | `/api/subscription/status`          | Estado de suscripción     |
| POST   | `/api/subscription/cancel`          | Cancelar suscripción      |

---

## 6. Flujo de Suscripción con Mercado Pago

```
1. Dealer se registra → Estado: TRIALING (30 días)
2. Dealer elige plan → Backend crea preference/checkout en MP
3. User redirige a MP → Paga con Mercado Pago/Wallet
4. MP webhook → Backend recibe notificación → Actualiza status a ACTIVE
5. Período termina → MP cobra automáticamente
6. Si falla pago → Webhook notifica → Status PAST_DUE
```

---

## 7. Docker Compose (Desarrollo)

```yaml
# docker-compose.yml del backend
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/crm
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: crm
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

---

## 8. Gitflow

- `main` → producción
- `develop` → integración
- Features en branches `feature/nombre-ticket`

---

## 9. Milestones de Implementación

### Phase 1: Base (Semanas 1-2)

- [ ] Setup repo y Docker
- [ ] Prisma schema + DB
- [ ] Auth completo (JWT)
- [ ] CRUD dealers

### Phase 2: Core (Semanas 3-4)

- [ ] CRUD vehicles con imágenes
- [ ] Filtros y búsqueda
- [ ] Dashboard básico

### Phase 3: Pagos (Semanas 5-6)

- [ ] Integración Mercado Pago
- [ ] Webhook handling
- [ ] Planes de suscripción

### Phase 4: Polish (Semanas 7-8)

- [ ] Testing
- [ ] Deploy production
- [ ] Docs para el equipo

---

## 10. Decisiones Arquitectónicas Clave

| Decisión                       | Justificación                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| **PostgreSQL + Prisma**        | PostgreSQL es ideal para datos estructurados de autos; Prisma da type-safety completo en Node |
| **JWT en cookies httpOnly**    | Más seguro que localStorage, previene XSS (auth0 mejor)                                       |
| **Vue Composition API**        | Mejor TypeScript support que Options API, código más reutilizable                             |
| **Mercado Pago Subscriptions** | No hay que manejar renovaciones manualmente, MP cobra automáticamente                         |
| **Docker para back**           | Facilita onboarding de 3 desarrolladores backend, ambiente idéntico producción                |
| **2 repos separados**          | Deploy independiente, permisos claros entre equipos                                           |
| **Cloudinary**                 | Más fácil de integrar con Vue que AWS S3                                                      |
| **Resend**                     | API simple, buena integración con Node.js, tier gratuito generoso                             |

---

## Pendiente por definir

- [ ] Planes de suscripción (básico, pro, enterprise) y precios
- [ ] Selección de Cloudinary vs AWS S3
- [ ] Selección de email provider (Resend vs SendGrid)
