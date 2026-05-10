<?php

// Purpose: Expand category image storage for base64 uploads from admin UI.
// Callers: Laravel migration runner.
// Deps: categories table, doctrine/dbal-compatible column change support.
// API: migration up/down methods.
// Side effects: changes categories.image column type.

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->longText('image')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('image')->nullable()->change();
        });
    }
};
