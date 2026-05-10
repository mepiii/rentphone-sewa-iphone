<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RentalOrderItem extends Model
{
    use HasFactory;
    protected $fillable = ['rental_order_id','product_id','product_name','color','quantity','price_per_day','subtotal'];
    protected $casts = ['price_per_day'=>'decimal:2','subtotal'=>'decimal:2'];
    public function rentalOrder(): BelongsTo { return $this->belongsTo(RentalOrder::class); }
    public function product(): BelongsTo { return $this->belongsTo(Product::class); }
}
