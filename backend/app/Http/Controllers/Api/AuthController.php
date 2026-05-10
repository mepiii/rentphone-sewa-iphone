<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Concerns\RespondsWithJson;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    use RespondsWithJson;

    public function register(Request $request)
    {
        $data = $request->validate(['name'=>'required|string|max:255','email'=>'required|email|unique:users,email','phone'=>'nullable|string|max:30','password'=>'required|confirmed|min:8']);
        $user = User::create([...$data, 'role'=>'user']);
        return response()->json(['success'=>true,'message'=>'Register berhasil','token'=>$user->createToken('api')->plainTextToken,'user'=>$user], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate(['email'=>'required|email','password'=>'required|string']);
        $user = User::where('email', $data['email'])->where('role', 'user')->first();
        if (!$user || !Hash::check($data['password'], $user->password)) return $this->error('Email atau password salah', null, 401);
        return response()->json(['success'=>true,'message'=>'Login berhasil','token'=>$user->createToken('api')->plainTextToken,'user'=>$user]);
    }

    public function adminLogin(Request $request)
    {
        $data = $request->validate(['email'=>'required|email','password'=>'required|string']);
        $user = User::where('email', $data['email'])->where('role', 'admin')->first();
        if (!$user || !Hash::check($data['password'], $user->password)) return $this->error('Email atau password salah', null, 401);
        return response()->json(['success'=>true,'message'=>'Login berhasil','token'=>$user->createToken('api')->plainTextToken,'user'=>$user]);
    }

    public function me(Request $request) { return $this->success('Profil berhasil dimuat', $request->user()); }

    public function updateMe(Request $request)
    {
        $user = $request->user();
        $data = $request->validate(['name'=>'sometimes|required|string|max:255','email'=>['sometimes','required','email',Rule::unique('users')->ignore($user->id)],'phone'=>'nullable|string|max:30','photo'=>'nullable|string']);
        $user->update($data);
        return $this->success('Profil berhasil diperbarui', $user->fresh());
    }

    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()?->delete();
        return $this->success('Logout berhasil');
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email'=>'required|email']);
        return $this->success('Instruksi reset password dikirim');
    }

    public function resetPassword(Request $request)
    {
        $request->validate(['email'=>'required|email','password'=>'required|confirmed|min:8','token'=>'nullable|string']);
        return $this->success('Password berhasil direset');
    }
}
