<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','recipient_name','phone','address_line','city','province','postal_code','notes','is_default'];
    protected $casts = ['is_default'=>'boolean'];
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function rentalOrders(): HasMany { return $this->hasMany(RentalOrder::class); }
}
