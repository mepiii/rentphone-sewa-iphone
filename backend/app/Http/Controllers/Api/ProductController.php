<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use RespondsWithJson;

    public function index(Request $request)
    {
        $products = Product::with('category')
            ->when($request->search, fn ($q, $v) => $q->where(fn ($qq) => $qq->where('name','like',"%$v%")->orWhere('series','like',"%$v%")->orWhere('model','like',"%$v%")))
            ->when($request->category, fn ($q, $v) => $q->whereHas('category', fn ($c) => $c->where('slug',$v)->orWhere('name','like',"%$v%")))
            ->when($request->status, fn ($q, $v) => $q->where('status',$v))
            ->when($request->boolean('featured'), fn ($q) => $q->where('is_featured', true))
            ->latest()->get();
        return $this->success('Produk berhasil dimuat', $products);
    }

    public function show(Product $product) { return $this->success('Produk berhasil dimuat', $product->load(['category','reviews'])); }
}
