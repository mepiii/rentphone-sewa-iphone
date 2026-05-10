# Purpose: Railway production image for Laravel API on PHP 8.4.
# Callers: Railway deployment builder.
# Deps: PHP extensions, Composer, Laravel artisan.
# API: container start command.
# Side effects: runs migrations and seed before serving.

FROM php:8.4-cli

RUN apt-get update \
    && apt-get install -y --no-install-recommends git unzip libzip-dev libicu-dev \
    && docker-php-ext-install pdo_mysql intl zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction
RUN php artisan config:cache && php artisan route:cache

CMD php artisan migrate --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=${PORT}
