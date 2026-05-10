<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\DeliveryMethod;
use App\Models\PaymentMethod;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RentalOrderFactory extends Factory
{
    public function definition(): array
    {
        return ['order_number'=>'ORD-'.fake()->unique()->numerify('######'),'user_id'=>User::factory(),'address_id'=>Address::factory(),'delivery_method_id'=>DeliveryMethod::factory(),'payment_method_id'=>PaymentMethod::factory(),'rental_duration_type'=>'day','rental_duration_value'=>2,'product_price'=>400000,'delivery_price'=>25000,'total_price'=>425000,'status'=>'processing','payment_status'=>'unpaid','notes'=>null];
    }
}
