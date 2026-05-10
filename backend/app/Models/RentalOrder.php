<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RentalOrder extends Model
{
    use HasFactory;
    protected $fillable = ['order_number','user_id','address_id','delivery_method_id','payment_method_id','rental_duration_type','rental_duration_value','start_date','end_date','product_price','delivery_price','total_price','status','payment_status','notes'];
    protected $casts = ['start_date'=>'date','end_date'=>'date','product_price'=>'decimal:2','delivery_price'=>'decimal:2','total_price'=>'decimal:2'];
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function address(): BelongsTo { return $this->belongsTo(Address::class); }
    public function deliveryMethod(): BelongsTo { return $this->belongsTo(DeliveryMethod::class); }
    public function paymentMethod(): BelongsTo { return $this->belongsTo(PaymentMethod::class); }
    public function items(): HasMany { return $this->hasMany(RentalOrderItem::class); }
    public function returnReport(): HasOne { return $this->hasOne(ReturnReport::class); }
}
