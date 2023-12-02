<?php

namespace App\Models;

use Carbon\Traits\Serialization;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Order extends Model
{
    use HasFactory;
    use Searchable;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

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
        'subtotal',
        'shipping_subtotal',
        'shipping_discount',
        'voucher_discount',
        'products_discount',
        'order_discount',
        'vat',
        'payment_method',
        'delivery_method',
        'notes',
        'order_code',
        'status',
        'confirmed_at',
        'shipping_at',
        'delivered_at',
        'reviewed_at',
        'employee_id',
        'customer_id',
        'delivery_address_id',
        'order_discount_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
    /**
     * Get the order details for the order.
     */
    public function orderDetail(): HasMany
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }
}
