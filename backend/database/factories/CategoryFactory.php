<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->randomElement(['11 Series','12 Series','13 Series','14 Series','15 Series','16 Series','17 Series']);
        return ['name'=>$name,'slug'=>Str::slug($name).'-'.fake()->unique()->numberBetween(1,9999),'description'=>fake()->sentence(),'image'=>null,'is_active'=>true];
    }
}
