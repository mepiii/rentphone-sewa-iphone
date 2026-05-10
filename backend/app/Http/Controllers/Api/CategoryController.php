<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    use RespondsWithJson;
    public function index() { return $this->success('Kategori berhasil dimuat', Category::where('is_active', true)->get()); }
    public function show(Category $category) { return $this->success('Kategori berhasil dimuat', $category); }
}
