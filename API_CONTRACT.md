# RentPhone API Contract

Base URL: `http://127.0.0.1:8000/api`
Auth: Laravel Sanctum Bearer token.
Headers: `Accept: application/json`, `Authorization: Bearer <token>` for protected routes.

## Response Shape

Success:
```json
{ "message": "...", "data": {} }
```

Error:
```json
{ "message": "...", "errors": {} }
```

## Auth

| Method | Path | Auth | Body | Result |
|---|---|---|---|---|
| POST | `/register` | public | `name,email,phone,password,password_confirmation` | user + token |
| POST | `/login` | public | `email,password` | user token |
| POST | `/admin/login` | public | `email,password` | admin token |
| POST | `/logout` | user/admin | none | token revoked |
| GET | `/me` | user/admin | none | current user |
| PATCH | `/me` | user/admin | `name?,phone?,photo?` | updated user |
| POST | `/forgot-password` | public | `email` | accepted |
| POST | `/reset-password` | public | `email,password,password_confirmation,token?` | accepted |

## Public Catalog

| Method | Path | Query/Body | Result |
|---|---|---|---|
| GET | `/categories` | `active?` | categories |
| GET | `/categories/{category}` | none | category + products |
| GET | `/products` | `search?,category?,status?,featured?` | products |
| GET | `/products/{product}` | none | product + category + reviews |
| GET | `/products/{product}/reviews` | none | product reviews |
| GET | `/delivery-methods` | none | active delivery methods |
| GET | `/payment-methods` | none | active payment methods |

Product status values: `available`, `unavailable`, `maintenance`.
Frontend labels: `available` = `Tersedia`, `unavailable` = `Habis`.
Products with `unavailable` or `stock <= 0` must not be orderable.

## User Routes

| Method | Path | Body | Result |
|---|---|---|---|
| GET | `/favorites` | none | favorite products |
| POST | `/favorites/{product}` | none | favorite created/idempotent |
| DELETE | `/favorites/{product}` | none | favorite removed |
| GET | `/addresses` | none | user addresses |
| POST | `/addresses` | `recipient_name,phone,address_line,city,province?,postal_code?,notes?,is_default?` | address created |
| PATCH | `/addresses/{address}` | same optional fields | address updated |
| DELETE | `/addresses/{address}` | none | address deleted |
| GET | `/orders` | none | user orders |
| POST | `/orders` | checkout body | order created |
| GET | `/orders/{order}` | none | order detail |
| GET | `/returns` | none | user return reports |
| POST | `/returns` | `rental_order_id,reason,condition_notes?,photo?` | return report created |
| GET | `/returns/{returnReport}` | none | return report detail |
| POST | `/products/{product}/reviews` | `rating,text,name?` | review created |

Checkout body:
```json
{
  "items": [
    { "product_id": 1, "color": "Black", "quantity": 1 }
  ],
  "address_id": 1,
  "delivery_method_id": 1,
  "payment_method_id": 1,
  "rental_duration_type": "day",
  "rental_duration_value": 2,
  "notes": "optional"
}
```

Checkout total formula:
`sum(product.price_per_day * rental_duration_value * quantity) + delivery.price`.
Server price is source of truth.

## Admin Routes

All routes require admin token.

| Method | Path | Body | Result |
|---|---|---|---|
| GET | `/admin/dashboard` | none | dashboard stats |
| GET | `/admin/categories` | none | categories |
| POST | `/admin/categories` | `name,slug?,description?,is_active?` | category created |
| GET | `/admin/categories/{category}` | none | category |
| PATCH | `/admin/categories/{category}` | optional category fields | category updated |
| DELETE | `/admin/categories/{category}` | none | category deleted |
| GET | `/admin/products` | none | products |
| POST | `/admin/products` | product body | product created |
| GET | `/admin/products/{product}` | none | product |
| PATCH | `/admin/products/{product}` | optional product fields | product updated |
| DELETE | `/admin/products/{product}` | none | product deleted |
| GET | `/admin/customers` | none | users with role `user` |
| GET | `/admin/customers/{user}` | none | customer detail |
| GET | `/admin/orders` | `status?` | orders |
| GET | `/admin/orders/{order}` | none | order detail |
| PATCH | `/admin/orders/{order}/status` | `status,payment_status?` | order updated |
| GET | `/admin/returns` | none | return reports |
| GET | `/admin/returns/{returnReport}` | none | return report detail |
| PATCH | `/admin/returns/{returnReport}/status` | `status` | return updated |
| GET | `/admin/profile` | none | admin profile |
| PATCH | `/admin/profile` | `name?,phone?,photo?` | admin updated |

Product body:
```json
{
  "category_id": 1,
  "name": "iPhone 15 Pro Max",
  "slug": "iphone-15-pro-max",
  "model": "iPhone 15 Pro Max",
  "series": "15 Series",
  "storage": "128GB",
  "color": "Black",
  "colors": ["Black", "White"],
  "description": "...",
  "specifications": ["Battery health baik"],
  "highlights": ["Siap pakai"],
  "image": null,
  "device_image": null,
  "price_per_day": 300000,
  "stock": 2,
  "status": "available",
  "is_featured": true
}
```

## Seed Accounts

| Role | Email | Password |
|---|---|---|
| admin | `admin@example.com` | `password` |
| user | `user@example.com` | `password` |
| user | `rani@example.com` | `password` |

## Frontend Integration Notes

- Store returned `token` and send as Bearer token.
- Replace localStorage product overrides with `/admin/products/{id}` PATCH.
- Replace wishlist localStorage with `/favorites` endpoints.
- Replace checkout localStorage transaction creation with `/orders` POST.
- Disable rent buttons when product `status !== "available"` or `available === false`.
- Show empty availability text when status label is `Habis`.
