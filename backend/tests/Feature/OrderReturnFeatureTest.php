<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\DeliveryMethod;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\RentalOrder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderReturnFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_creates_order_and_calculates_total_price_server_side(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $product = Product::factory()->create(['price_per_day' => 200000, 'stock' => 3, 'status' => 'available']);
        $address = Address::factory()->create(['user_id' => $user->id]);
        $delivery = DeliveryMethod::factory()->create(['price' => 25000]);
        $payment = PaymentMethod::factory()->create();

        $this->actingAs($user, 'sanctum')->postJson('/api/orders', [
            'items' => [['product_id' => $product->id, 'color' => 'Black', 'quantity' => 2]],
            'address_id' => $address->id,
            'delivery_method_id' => $delivery->id,
            'payment_method_id' => $payment->id,
            'rental_duration_type' => 'day',
            'rental_duration_value' => 3,
            'notes' => 'antar sore',
        ])->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.total_price', 1225000)
            ->assertJsonStructure(['data' => ['order_number']]);
    }

    public function test_rejects_unavailable_product_order(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $product = Product::factory()->create(['status' => 'unavailable', 'stock' => 0]);
        $address = Address::factory()->create(['user_id' => $user->id]);
        $delivery = DeliveryMethod::factory()->create();
        $payment = PaymentMethod::factory()->create();

        $this->actingAs($user, 'sanctum')->postJson('/api/orders', [
            'items' => [['product_id' => $product->id, 'quantity' => 1]],
            'address_id' => $address->id,
            'delivery_method_id' => $delivery->id,
            'payment_method_id' => $payment->id,
            'rental_duration_type' => 'day',
            'rental_duration_value' => 1,
        ])->assertUnprocessable();
    }

    public function test_creates_return_report_only_for_own_order(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $other = User::factory()->create(['role' => 'user']);
        $order = RentalOrder::factory()->create(['user_id' => $user->id, 'status' => 'active']);

        $this->actingAs($other, 'sanctum')->postJson('/api/returns', [
            'rental_order_id' => $order->id,
            'reason' => 'Selesai',
            'condition_notes' => 'Baik',
        ])->assertForbidden();

        $this->actingAs($user, 'sanctum')->postJson('/api/returns', [
            'rental_order_id' => $order->id,
            'reason' => 'Selesai',
            'condition_notes' => 'Baik',
        ])->assertCreated()->assertJsonPath('data.status', 'submitted');
    }
}
