<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\DeliveryMethod;

class DeliveryMethodController extends Controller
{
    use RespondsWithJson;
    public function index() { return $this->success('Metode pengiriman berhasil dimuat', DeliveryMethod::where('is_active', true)->get()); }
}
