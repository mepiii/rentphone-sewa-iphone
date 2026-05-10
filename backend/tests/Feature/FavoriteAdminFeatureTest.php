<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\RentalOrder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FavoriteAdminFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_adds_removes_and_lists_favorites_without_duplicates(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $product = Product::factory()->create();

        $this->actingAs($user, 'sanctum')->postJson("/api/favorites/{$product->id}")->assertCreated();
        $this->actingAs($user, 'sanctum')->postJson("/api/favorites/{$product->id}")->assertOk();
        $this->actingAs($user, 'sanctum')->getJson('/api/favorites')->assertOk()->assertJsonCount(1, 'data');
        $this->actingAs($user, 'sanctum')->deleteJson("/api/favorites/{$product->id}")->assertOk();
        $this->assertDatabaseCount('favorites', 0);
    }

    public function test_manages_categories_and_customers_as_admin(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $customer = User::factory()->create(['role' => 'user']);

        $category = $this->actingAs($admin, 'sanctum')->postJson('/api/admin/categories', [
            'name' => '17 Series',
            'slug' => '17-series',
        ])->assertCreated()->json('data');

        $this->actingAs($admin, 'sanctum')->patchJson("/api/admin/categories/{$category['id']}", ['name' => 'iPhone 17 Series'])->assertOk();
        $this->actingAs($admin, 'sanctum')->getJson('/api/admin/customers')->assertOk()->assertJsonFragment(['email' => $customer->email]);
    }

    public function test_lets_admin_update_order_status_and_profile(): void
    {
        $admin = User::factory()->create(['role' => 'admin', 'name' => 'Admin']);
        $order = RentalOrder::factory()->create(['status' => 'processing']);

        $this->actingAs($admin, 'sanctum')->patchJson("/api/admin/orders/{$order->id}/status", [
            'status' => 'completed',
            'payment_status' => 'paid',
        ])->assertOk()->assertJsonPath('data.status', 'completed');

        $this->actingAs($admin, 'sanctum')->patchJson('/api/admin/profile', [
            'name' => 'Admin Baru',
            'email' => $admin->email,
        ])->assertOk()->assertJsonPath('data.name', 'Admin Baru');
    }
}
