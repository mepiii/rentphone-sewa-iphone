<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_lists_searches_and_shows_products_publicly(): void
    {
        $category = Category::factory()->create(['name' => '13 Series', 'slug' => '13-series']);
        $product = Product::factory()->create(['category_id' => $category->id, 'name' => 'iPhone 13 Pro', 'status' => 'available']);

        $this->getJson('/api/categories')->assertOk()->assertJsonPath('data.0.slug', '13-series');
        $this->getJson('/api/products?search=13')->assertOk()->assertJsonPath('data.0.name', 'iPhone 13 Pro');
        $this->getJson("/api/products/{$product->id}")->assertOk()->assertJsonPath('data.id', $product->id);
    }

    public function test_lets_admin_create_update_status_and_delete_product(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $category = Category::factory()->create();

        $created = $this->actingAs($admin, 'sanctum')->postJson('/api/admin/products', [
            'category_id' => $category->id,
            'name' => 'iPhone 15 Pro Max',
            'model' => 'iPhone 15',
            'series' => '15 Series',
            'description' => 'Unit rental siap pakai.',
            'price_per_day' => 300000,
            'stock' => 2,
            'status' => 'available',
        ])->assertCreated()->json('data');

        $this->actingAs($admin, 'sanctum')->patchJson("/api/admin/products/{$created['id']}", [
            'status' => 'unavailable',
            'stock' => 0,
        ])->assertOk()->assertJsonPath('data.status', 'unavailable');

        $this->actingAs($admin, 'sanctum')->deleteJson("/api/admin/products/{$created['id']}")->assertOk();
    }
}
