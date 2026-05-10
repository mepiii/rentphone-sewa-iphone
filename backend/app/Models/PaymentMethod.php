<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentMethod extends Model
{
    use HasFactory;
    protected $fillable = ['name','type','description','account_number','account_name','instructions','image','is_active'];
    protected $casts = ['instructions'=>'array','is_active'=>'boolean'];
    public function rentalOrders(): HasMany { return $this->hasMany(RentalOrder::class); }
}
