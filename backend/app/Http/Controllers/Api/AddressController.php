<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    use RespondsWithJson;
    private function rules(): array { return ['recipient_name'=>'required|string','phone'=>'required|string','address_line'=>'required|string','city'=>'required|string','province'=>'nullable|string','postal_code'=>'nullable|string','notes'=>'nullable|string','is_default'=>'boolean']; }
    public function index(Request $request) { return $this->success('Alamat berhasil dimuat', $request->user()->addresses()->latest()->get()); }
    public function store(Request $request) { return $this->success('Alamat berhasil disimpan', $request->user()->addresses()->create($request->validate($this->rules())), 201); }
    public function update(Request $request, Address $address) { abort_if($address->user_id !== $request->user()->id, 403); $address->update($request->validate($this->rules())); return $this->success('Alamat berhasil diperbarui', $address->fresh()); }
    public function destroy(Request $request, Address $address) { abort_if($address->user_id !== $request->user()->id, 403); $address->delete(); return $this->success('Alamat berhasil dihapus'); }
}
