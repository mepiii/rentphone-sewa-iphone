<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    use RespondsWithJson;
    public function index() { return $this->success('Produk berhasil dimuat', Product::with('category')->latest()->get()); }
    public function show(Product $product) { return $this->success('Produk berhasil dimuat', $product->load('category')); }
    public function store(Request $request) { $data=$this->validateProduct($request); $data['slug']=$data['slug']??Str::slug($data['name']).'-'.Str::random(5); return $this->success('Produk berhasil dibuat', Product::create($data), 201); }
    public function update(Request $request, Product $product) { $data=$this->validateProduct($request, $product); if (($data['stock'] ?? $product->stock) <= 0 && ($data['status'] ?? $product->status) === 'available') $data['status']='unavailable'; $product->update($data); return $this->success('Produk berhasil diperbarui', $product->fresh()); }
    public function destroy(Product $product) { $product->delete(); return $this->success('Produk berhasil dihapus'); }
    private function validateProduct(Request $request, ?Product $product=null): array
    {
        return $request->validate(['category_id'=>[$product?'sometimes':'required','exists:categories,id'],'name'=>[$product?'sometimes':'required','string'],'slug'=>['nullable','string',Rule::unique('products')->ignore($product?->id)],'model'=>[$product?'sometimes':'required','string'],'series'=>'nullable|string','storage'=>'nullable|string','color'=>'nullable|string','colors'=>'nullable|array','description'=>[$product?'sometimes':'required','string'],'specifications'=>'nullable|array','highlights'=>'nullable|array','image'=>'nullable|string','device_image'=>'nullable|string','price_per_day'=>[$product?'sometimes':'required','numeric','min:0'],'price_per_week'=>'nullable|numeric|min:0','price_per_month'=>'nullable|numeric|min:0','stock'=>[$product?'sometimes':'required','integer','min:0'],'status'=>[$product?'sometimes':'required',Rule::in(['available','unavailable','maintenance'])],'is_featured'=>'boolean']);
    }
}
