<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Product;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    use RespondsWithJson;
    public function index(Request $request) { return $this->success('Favorit berhasil dimuat', $request->user()->favorites()->with('product')->get()->pluck('product')); }
    public function store(Request $request, Product $product)
    {
        $favorite = Favorite::firstOrCreate(['user_id'=>$request->user()->id,'product_id'=>$product->id]);
        return $this->success('Favorit berhasil disimpan', $favorite->load('product'), $favorite->wasRecentlyCreated ? 201 : 200);
    }
    public function destroy(Request $request, Product $product)
    {
        Favorite::where('user_id',$request->user()->id)->where('product_id',$product->id)->delete();
        return $this->success('Favorit berhasil dihapus');
    }
}
