<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = 'iPhone '.fake()->randomElement(['11','12','13','14','15','16']).' '.fake()->randomElement(['Pro','Pro Max','']);
        return [
            'category_id'=>Category::factory(), 'name'=>trim($name), 'slug'=>Str::slug($name).'-'.fake()->unique()->numberBetween(1,99999), 'model'=>$name,
            'series'=>fake()->randomElement(['11 Series','12 Series','13 Series','14 Series','15 Series','16 Series','17 Series']), 'storage'=>'128GB', 'color'=>'Black', 'colors'=>['Black','White'],
            'description'=>'Unit rental siap pakai.', 'specifications'=>['Battery health baik','Kamera normal'], 'highlights'=>['Unit bersih','Siap rental'], 'image'=>null, 'device_image'=>null,
            'price_per_day'=>fake()->numberBetween(120000,350000), 'stock'=>fake()->numberBetween(1,5), 'status'=>'available', 'is_featured'=>false,
        ];
    }
}
