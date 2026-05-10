<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    use RespondsWithJson;
    public function show(Request $request) { return $this->success('Profil admin berhasil dimuat', $request->user()); }
    public function update(Request $request) { $user=$request->user(); $data=$request->validate(['name'=>'sometimes|required|string','email'=>['sometimes','required','email',Rule::unique('users')->ignore($user->id)],'phone'=>'nullable|string','photo'=>'nullable|string']); $user->update($data); return $this->success('Profil admin berhasil diperbarui', $user->fresh()); }
}
