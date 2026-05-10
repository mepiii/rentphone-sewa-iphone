<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'phone', 'password', 'role', 'photo', 'provider'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    public function favorites(): HasMany { return $this->hasMany(Favorite::class); }
    public function favoriteProducts(): BelongsToMany { return $this->belongsToMany(Product::class, 'favorites')->withTimestamps(); }
    public function addresses(): HasMany { return $this->hasMany(Address::class); }
    public function rentalOrders(): HasMany { return $this->hasMany(RentalOrder::class); }
    public function returnReports(): HasMany { return $this->hasMany(ReturnReport::class); }
    public function reviews(): HasMany { return $this->hasMany(ProductReview::class); }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
