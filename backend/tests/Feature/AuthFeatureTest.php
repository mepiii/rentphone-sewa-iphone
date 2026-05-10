<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_registers_a_user_and_returns_bearer_token(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'User Demo',
            'email' => 'user@example.com',
            'phone' => '081234567890',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('user.email', 'user@example.com')
            ->assertJsonStructure(['token']);
    }

    public function test_logs_in_a_user_and_rejects_wrong_password(): void
    {
        User::factory()->create(['email' => 'user@example.com', 'password' => Hash::make('password'), 'role' => 'user']);

        $this->postJson('/api/login', ['email' => 'user@example.com', 'password' => 'wrong'])->assertUnauthorized();

        $this->postJson('/api/login', ['email' => 'user@example.com', 'password' => 'password'])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonStructure(['token', 'user']);
    }

    public function test_blocks_user_from_admin_routes(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $this->actingAs($user, 'sanctum')->getJson('/api/admin/dashboard')->assertForbidden();
    }

    public function test_logs_in_admin_via_admin_endpoint(): void
    {
        User::factory()->create(['email' => 'admin@example.com', 'password' => Hash::make('password'), 'role' => 'admin']);

        $this->postJson('/api/admin/login', ['email' => 'admin@example.com', 'password' => 'password'])
            ->assertOk()
            ->assertJsonPath('user.role', 'admin')
            ->assertJsonStructure(['token']);
    }
}
