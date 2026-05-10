<?php

namespace Database\Factories;

use App\Models\RentalOrder;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReturnReportFactory extends Factory
{
    public function definition(): array
    {
        return ['rental_order_id'=>RentalOrder::factory(),'user_id'=>User::factory(),'reason'=>'Sewa selesai','condition_notes'=>'Baik','image'=>null,'status'=>'submitted','admin_notes'=>null];
    }
}
