<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->longText('image')->nullable()->change();
            $table->longText('device_image')->nullable()->change();
        });

        Schema::table('return_reports', function (Blueprint $table) {
            $table->longText('image')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('image')->nullable()->change();
            $table->string('device_image')->nullable()->change();
        });

        Schema::table('return_reports', function (Blueprint $table) {
            $table->string('image')->nullable()->change();
        });
    }
};
