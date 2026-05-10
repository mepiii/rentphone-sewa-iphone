<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\RentalOrder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    use RespondsWithJson;
    public function index(Request $request) { return $this->success('Pesanan berhasil dimuat', RentalOrder::with(['user','items.product','deliveryMethod','paymentMethod','returnReport'])->when($request->status, fn($q,$v)=>$q->where('status',$v))->latest()->get()); }
    public function show(RentalOrder $order) { return $this->success('Pesanan berhasil dimuat', $order->load(['user','items.product','address','deliveryMethod','paymentMethod','returnReport'])); }
    public function updateStatus(Request $request, RentalOrder $order) { $data=$request->validate(['status'=>['required',Rule::in(['pending','processing','active','returned','completed','cancelled'])],'payment_status'=>['nullable',Rule::in(['unpaid','pending','paid','failed','refunded'])]]); $order->update($data); return $this->success('Status pesanan berhasil diperbarui', $order->fresh()->load(['user','items.product','address','deliveryMethod','paymentMethod','returnReport'])); }
}
