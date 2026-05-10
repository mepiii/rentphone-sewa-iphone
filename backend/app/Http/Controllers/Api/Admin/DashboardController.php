<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\RentalOrder;
use App\Models\ReturnReport;
use App\Models\User;

class DashboardController extends Controller
{
    use RespondsWithJson;
    public function __invoke()
    {
        return $this->success('Dashboard berhasil dimuat', [
            'products' => Product::count(),
            'customers' => User::where('role', 'user')->count(),
            'orders' => RentalOrder::count(),
            'returns' => ReturnReport::count(),
            'revenue' => RentalOrder::where('payment_status', 'paid')->sum('total_price'),
            'recent_orders' => RentalOrder::with('user')->latest()->limit(5)->get(),
            'low_stock_products' => Product::where('stock', '<=', 2)->orderBy('stock')->limit(5)->get(),
        ]);
    }
}
