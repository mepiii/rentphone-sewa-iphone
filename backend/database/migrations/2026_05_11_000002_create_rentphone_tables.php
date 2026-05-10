<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('model');
            $table->string('series')->index();
            $table->string('storage')->nullable();
            $table->string('color')->nullable();
            $table->json('colors')->nullable();
            $table->text('description');
            $table->json('specifications')->nullable();
            $table->json('highlights')->nullable();
            $table->string('image')->nullable();
            $table->string('device_image')->nullable();
            $table->decimal('price_per_day', 12, 2);
            $table->decimal('price_per_week', 12, 2)->nullable();
            $table->decimal('price_per_month', 12, 2)->nullable();
            $table->unsignedInteger('stock')->default(0);
            $table->string('status')->default('available')->index();
            $table->boolean('is_featured')->default(false)->index();
            $table->timestamps();
            $table->index(['name','series']);
        });

        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['user_id','product_id']);
        });

        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('recipient_name');
            $table->string('phone');
            $table->text('address_line');
            $table->string('city');
            $table->string('province')->default('Sumatera Selatan');
            $table->string('postal_code')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });

        Schema::create('delivery_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 12, 2)->default(0);
            $table->string('estimated_time')->nullable();
            $table->boolean('requires_address')->default(true);
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->default('ewallet');
            $table->text('description')->nullable();
            $table->string('account_number')->nullable();
            $table->string('account_name')->nullable();
            $table->json('instructions')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('rental_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('address_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('delivery_method_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('payment_method_id')->nullable()->constrained()->nullOnDelete();
            $table->string('rental_duration_type')->default('day');
            $table->unsignedInteger('rental_duration_value')->default(1);
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->decimal('product_price', 12, 2)->default(0);
            $table->decimal('delivery_price', 12, 2)->default(0);
            $table->decimal('total_price', 12, 2)->default(0);
            $table->string('status')->default('pending')->index();
            $table->string('payment_status')->default('unpaid')->index();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('rental_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rental_order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->restrictOnDelete();
            $table->string('product_name');
            $table->string('color')->nullable();
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('price_per_day', 12, 2);
            $table->decimal('subtotal', 12, 2);
            $table->timestamps();
        });

        Schema::create('return_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rental_order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('reason')->nullable();
            $table->text('condition_notes')->nullable();
            $table->string('image')->nullable();
            $table->string('status')->default('submitted')->index();
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('product_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->unsignedTinyInteger('rating');
            $table->text('text');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_reviews');
        Schema::dropIfExists('return_reports');
        Schema::dropIfExists('rental_order_items');
        Schema::dropIfExists('rental_orders');
        Schema::dropIfExists('payment_methods');
        Schema::dropIfExists('delivery_methods');
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('favorites');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
    }
};
