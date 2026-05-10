<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\DeliveryMethod;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\RentalOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    use RespondsWithJson;
    public function index(Request $request) { return $this->success('Pesanan berhasil dimuat', $request->user()->rentalOrders()->with(['items.product','deliveryMethod','paymentMethod','returnReport'])->latest()->get()); }
    public function show(Request $request, RentalOrder $order) { abort_if($order->user_id !== $request->user()->id, 403); return $this->success('Pesanan berhasil dimuat', $order->load(['items.product','address','deliveryMethod','paymentMethod','returnReport'])); }

    public function store(Request $request)
    {
        $data = $request->validate(['items'=>'required|array|min:1','items.*.product_id'=>'required|exists:products,id','items.*.color'=>'nullable|string','items.*.quantity'=>'required|integer|min:1','address_id'=>'required|exists:addresses,id','delivery_method_id'=>'required|exists:delivery_methods,id','payment_method_id'=>'required|exists:payment_methods,id','rental_duration_type'=>'required|string','rental_duration_value'=>'required|integer|min:1','notes'=>'nullable|string']);
        abort_unless($request->user()->addresses()->whereKey($data['address_id'])->exists(), 403);
        $delivery = DeliveryMethod::findOrFail($data['delivery_method_id']);
        $payment = PaymentMethod::findOrFail($data['payment_method_id']);

        return DB::transaction(function () use ($data, $request, $delivery, $payment) {
            $productTotal = 0; $items = [];
            foreach ($data['items'] as $item) {
                $product = Product::lockForUpdate()->findOrFail($item['product_id']);
                $quantity = $item['quantity'];
                if ($product->status !== 'available' || $product->stock < $quantity) return $this->error('Produk habis atau tidak tersedia', ['product_id'=>$product->id], 422);
                $subtotal = $product->price_per_day * $data['rental_duration_value'] * $quantity;
                $productTotal += $subtotal;
                $items[] = compact('product','quantity','subtotal') + ['color'=>$item['color'] ?? $product->color];
                $product->decrement('stock', $quantity);
                if ($product->fresh()->stock <= 0) $product->update(['status'=>'unavailable']);
            }
            $order = RentalOrder::create(['order_number'=>'ORD-'.now()->format('YmdHis').random_int(100,999),'user_id'=>$request->user()->id,'address_id'=>$data['address_id'],'delivery_method_id'=>$delivery->id,'payment_method_id'=>$payment->id,'rental_duration_type'=>$data['rental_duration_type'],'rental_duration_value'=>$data['rental_duration_value'],'product_price'=>$productTotal,'delivery_price'=>$delivery->price,'total_price'=>$productTotal + $delivery->price,'status'=>'pending','payment_status'=>'unpaid','notes'=>$data['notes'] ?? null]);
            foreach ($items as $item) $order->items()->create(['product_id'=>$item['product']->id,'product_name'=>$item['product']->name,'color'=>$item['color'],'quantity'=>$item['quantity'],'price_per_day'=>$item['product']->price_per_day,'subtotal'=>$item['subtotal']]);
            return $this->success('Pesanan berhasil dilakukan', ['order_number'=>$order->order_number,'total_price'=>(float)$order->total_price,'order'=>$order->load('items')], 201);
        });
    }
}
