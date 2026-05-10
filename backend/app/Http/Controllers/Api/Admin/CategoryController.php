<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    use RespondsWithJson;
    public function index() { return $this->success('Kategori berhasil dimuat', Category::latest()->get()); }
    public function show(Category $category) { return $this->success('Kategori berhasil dimuat', $category); }
    public function store(Request $request) { $data=$request->validate(['name'=>'required|string','slug'=>'nullable|string|unique:categories,slug','description'=>'nullable|string','image'=>'nullable|string','is_active'=>'boolean']); $data['slug']=$data['slug']??Str::slug($data['name']); return $this->success('Kategori berhasil dibuat', Category::create($data), 201); }
    public function update(Request $request, Category $category) { $data=$request->validate(['name'=>'sometimes|required|string','slug'=>['nullable','string',Rule::unique('categories')->ignore($category->id)],'description'=>'nullable|string','image'=>'nullable|string','is_active'=>'boolean']); $category->update($data); return $this->success('Kategori berhasil diperbarui', $category->fresh()); }
    public function destroy(Category $category) { $category->delete(); return $this->success('Kategori berhasil dihapus'); }
}
