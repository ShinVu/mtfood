<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderDetail extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'order_details';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'quantity',
        'unit_price',
        'unit_discount',
        'batch_code',
        'pricing_id',
        'discount_id',
        'batch_id',
        'order_id',
        'product_id'
    ];

    /**
     * Get the product associated with order_detail
     */
    public function product(): HasOne
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }

    /**
     * Get the batch associated with order_detail
     */
    public function batch(): HasOne
    {
        return $this->hasOne(ProductBatch::class, 'id', 'batch_id');
    }

    /**
     * Get the order associated with order_detail
     */
    public function order(): HasOne
    {
        return $this->hasOne(Order::class, 'id', 'order_id');
    }

    /**
     * Get the discount  associated with order_detail
     */
    public function discount(): HasOne
    {
        return $this->hasOne(ProductDiscount::class, 'id', 'discount_id');
    }

    /**
     * Get the pricing associated with order_detail
     */
    public function pricing(): HasOne
    {
        return $this->hasOne(ProductPricing::class, 'id', 'pricing_id');
    }
}
