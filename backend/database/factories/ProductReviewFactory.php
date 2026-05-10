<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductReviewFactory extends Factory
{
    public function definition(): array
    {
        return ['product_id'=>Product::factory(),'user_id'=>User::factory(),'name'=>fake()->name(),'rating'=>5,'text'=>fake()->sentence()];
    }
}
