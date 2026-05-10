<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DeliveryMethodFactory extends Factory
{
    public function definition(): array
    {
        return ['name'=>'Gojek','description'=>'Pengiriman via Gojek','price'=>25000,'estimated_time'=>'1-2 jam','requires_address'=>true,'is_active'=>true];
    }
}
