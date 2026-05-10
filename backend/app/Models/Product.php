<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['category_id','name','slug','model','series','storage','color','colors','description','specifications','highlights','image','device_image','price_per_day','price_per_week','price_per_month','stock','status','is_featured'];
    protected $casts = ['colors'=>'array','specifications'=>'array','highlights'=>'array','is_featured'=>'boolean','price_per_day'=>'decimal:2','price_per_week'=>'decimal:2','price_per_month'=>'decimal:2'];

    public function category(): BelongsTo { return $this->belongsTo(Category::class); }
    public function favorites(): HasMany { return $this->hasMany(Favorite::class); }
    public function orderItems(): HasMany { return $this->hasMany(RentalOrderItem::class); }
    public function reviews(): HasMany { return $this->hasMany(ProductReview::class); }
    public function getAvailableAttribute(): bool { return $this->status === 'available' && $this->stock > 0; }
}
