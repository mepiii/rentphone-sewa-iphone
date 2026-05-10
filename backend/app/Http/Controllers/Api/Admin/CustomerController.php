<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\User;

class CustomerController extends Controller
{
    use RespondsWithJson;
    public function index() { return $this->success('Customer berhasil dimuat', User::where('role','user')->withCount('rentalOrders')->latest()->get()); }
    public function show(User $user) { abort_if($user->role !== 'user', 404); return $this->success('Customer berhasil dimuat', $user->load(['addresses','rentalOrders.items'])); }
    public function destroy(User $user)
    {
        abort_if($user->role !== 'user', 404);
        $user->delete();
        return $this->success('Customer berhasil dihapus');
    }
}
