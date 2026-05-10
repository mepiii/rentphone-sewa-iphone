<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    public function definition(): array
    {
        return ['user_id'=>User::factory(),'recipient_name'=>fake()->name(),'phone'=>'081234567890','address_line'=>fake()->streetAddress(),'city'=>'Palembang','province'=>'Sumatera Selatan','postal_code'=>'30111','notes'=>fake()->sentence(),'is_default'=>true];
    }
}
