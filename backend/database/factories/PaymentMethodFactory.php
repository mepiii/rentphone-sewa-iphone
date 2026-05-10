<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentMethodFactory extends Factory
{
    public function definition(): array
    {
        return ['name'=>'DANA','type'=>'ewallet','description'=>'Pembayaran DANA','account_number'=>'085766282094','account_name'=>'RentPhone','instructions'=>['Transfer sesuai total checkout'],'is_active'=>true];
    }
}
