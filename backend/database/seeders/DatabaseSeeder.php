<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Category;
use App\Models\DeliveryMethod;
use App\Models\Favorite;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\RentalOrder;
use App\Models\RentalOrderItem;
use App\Models\ReturnReport;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = User::updateOrCreate(['email' => 'admin@example.com'], ['name' => 'Admin RentPhone', 'phone' => '081111111111', 'password' => Hash::make('password'), 'role' => 'admin']);
        $user = User::updateOrCreate(['email' => 'user@example.com'], ['name' => 'User Demo', 'phone' => '082222222222', 'password' => Hash::make('password'), 'role' => 'user']);
        $other = User::updateOrCreate(['email' => 'rani@example.com'], ['name' => 'Rani Customer', 'phone' => '083333333333', 'password' => Hash::make('password'), 'role' => 'user']);

        $categories = collect(['11 Series','12 Series','13 Series','14 Series','15 Series','16 Series','17 Series'])->mapWithKeys(fn ($name) => [$name => Category::updateOrCreate(['slug' => Str::slug($name)], ['name' => $name, 'is_active' => true])]);

        $products = collect([
            ['iPhone 13 Pro', '13 Series', 180000, 4],
            ['iPhone 14 Pro', '14 Series', 220000, 3],
            ['iPhone 15 Pro Max', '15 Series', 300000, 2],
            ['iPhone 16 Pro', '16 Series', 350000, 1],
            ['iPhone 11', '11 Series', 120000, 0, 'unavailable'],
        ])->map(fn ($row) => Product::updateOrCreate(['slug' => Str::slug($row[0])], [
            'category_id' => $categories[$row[1]]->id,
            'name' => $row[0],
            'model' => $row[0],
            'series' => $row[1],
            'storage' => '128GB',
            'color' => 'Black',
            'colors' => ['Black', 'White', 'Gold'],
            'description' => $row[0].' kondisi terawat, siap rental.',
            'specifications' => ['Battery health baik', 'Kamera normal', 'Face ID normal'],
            'highlights' => ['Unit bersih', 'Siap pakai', 'QC sebelum sewa'],
            'price_per_day' => $row[2],
            'stock' => $row[3],
            'status' => $row[4] ?? 'available',
            'is_featured' => in_array($row[0], ['iPhone 14 Pro','iPhone 15 Pro Max']),
        ]));

        $pickup = DeliveryMethod::updateOrCreate(['name' => 'Ambil di Studio'], ['description' => 'Ambil langsung di studio RentPhone.', 'price' => 0, 'requires_address' => false, 'is_active' => true]);
        $gojek = DeliveryMethod::updateOrCreate(['name' => 'Gojek'], ['description' => 'Pengiriman via Gojek.', 'price' => 25000, 'estimated_time' => '1-2 jam', 'requires_address' => true, 'is_active' => true]);
        $dana = PaymentMethod::updateOrCreate(['name' => 'DANA'], ['type' => 'ewallet', 'account_number' => '085766282094', 'account_name' => 'RentPhone', 'instructions' => ['Buka DANA', 'Transfer sesuai total checkout'], 'is_active' => true]);
        PaymentMethod::updateOrCreate(['name' => 'GoPay'], ['type' => 'ewallet', 'account_number' => '085766282094', 'account_name' => 'RentPhone', 'instructions' => ['Buka GoPay', 'Transfer sesuai total checkout'], 'is_active' => true]);
        PaymentMethod::updateOrCreate(['name' => 'BCA Virtual Account'], ['type' => 'va', 'account_number' => '8808085766282094', 'account_name' => 'RentPhone', 'instructions' => ['Pilih BCA VA', 'Bayar sesuai total checkout'], 'is_active' => true]);

        $address = Address::updateOrCreate(['user_id' => $user->id, 'address_line' => 'Jl. Merdeka No. 1'], ['recipient_name' => 'User Demo', 'phone' => '082222222222', 'city' => 'Palembang', 'province' => 'Sumatera Selatan', 'postal_code' => '30111', 'notes' => 'Rumah pagar putih', 'is_default' => true]);
        Favorite::firstOrCreate(['user_id' => $user->id, 'product_id' => $products[1]->id]);
        ProductReview::firstOrCreate(['product_id' => $products[1]->id, 'user_id' => $user->id], ['name' => $user->name, 'rating' => 5, 'text' => 'Unit bersih dan pickup cepat.']);

        $order = RentalOrder::updateOrCreate(['order_number' => 'ORD-DEMO-001'], ['user_id' => $user->id, 'address_id' => $address->id, 'delivery_method_id' => $gojek->id, 'payment_method_id' => $dana->id, 'rental_duration_type' => 'day', 'rental_duration_value' => 2, 'product_price' => 440000, 'delivery_price' => 25000, 'total_price' => 465000, 'status' => 'active', 'payment_status' => 'paid']);
        RentalOrderItem::updateOrCreate(['rental_order_id' => $order->id, 'product_id' => $products[1]->id], ['product_name' => $products[1]->name, 'color' => 'Black', 'quantity' => 1, 'price_per_day' => 220000, 'subtotal' => 440000]);
        ReturnReport::updateOrCreate(['rental_order_id' => $order->id], ['user_id' => $user->id, 'reason' => 'Sewa selesai', 'condition_notes' => 'Baik', 'status' => 'submitted']);

        collect([
            ['ORD-DEMO-002', 'processing', 'unpaid', $products[0]],
            ['ORD-DEMO-003', 'processing', 'pending', $products[2]],
            ['ORD-DEMO-004', 'completed', 'paid', $products[3]],
            ['ORD-DEMO-005', 'completed', 'paid', $products[0]],
        ])->each(function ($row) use ($other, $pickup, $dana) {
            $order = RentalOrder::updateOrCreate(['order_number' => $row[0]], ['user_id' => $other->id, 'delivery_method_id' => $pickup->id, 'payment_method_id' => $dana->id, 'rental_duration_type' => 'day', 'rental_duration_value' => 1, 'product_price' => $row[3]->price_per_day, 'delivery_price' => 0, 'total_price' => $row[3]->price_per_day, 'status' => $row[1], 'payment_status' => $row[2]]);
            RentalOrderItem::updateOrCreate(['rental_order_id' => $order->id, 'product_id' => $row[3]->id], ['product_name' => $row[3]->name, 'quantity' => 1, 'price_per_day' => $row[3]->price_per_day, 'subtotal' => $row[3]->price_per_day]);
        });
    }
}
