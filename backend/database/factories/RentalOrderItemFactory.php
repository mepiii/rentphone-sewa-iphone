<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\RentalOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

class RentalOrderItemFactory extends Factory
{
    public function definition(): array
    {
        return ['rental_order_id'=>RentalOrder::factory(),'product_id'=>Product::factory(),'product_name'=>'iPhone 13 Pro','color'=>'Black','quantity'=>1,'price_per_day'=>200000,'subtotal'=>400000];
    }
}
