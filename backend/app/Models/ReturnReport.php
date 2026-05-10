<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnReport extends Model
{
    use HasFactory;
    protected $fillable = ['rental_order_id','user_id','reason','condition_notes','image','status','admin_notes'];
    public function rentalOrder(): BelongsTo { return $this->belongsTo(RentalOrder::class); }
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
}
