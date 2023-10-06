<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
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
}
