<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;

class PaymentMethodController extends Controller
{
    use RespondsWithJson;
    public function index() { return $this->success('Metode pembayaran berhasil dimuat', PaymentMethod::where('is_active', true)->get()); }
}
