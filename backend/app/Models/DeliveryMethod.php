<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DeliveryMethod extends Model
{
    use HasFactory;
    protected $fillable = ['name','description','price','estimated_time','requires_address','image','is_active'];
    protected $casts = ['price'=>'decimal:2','requires_address'=>'boolean','is_active'=>'boolean'];
    public function rentalOrders(): HasMany { return $this->hasMany(RentalOrder::class); }
}
