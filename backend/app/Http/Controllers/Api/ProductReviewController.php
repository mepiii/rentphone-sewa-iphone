<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductReviewController extends Controller
{
    use RespondsWithJson;
    public function index(Product $product) { return $this->success('Ulasan berhasil dimuat', $product->reviews()->latest()->get()); }
    public function store(Request $request, Product $product)
    {
        $data = $request->validate(['name'=>'nullable|string','rating'=>'required|integer|min:1|max:5','text'=>'required|string']);
        $review = $product->reviews()->create([...$data, 'user_id'=>$request->user()->id, 'name'=>$data['name'] ?? $request->user()->name]);
        return $this->success('Ulasan berhasil dikirim', $review, 201);
    }
}
