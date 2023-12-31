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
    protected $primaryKey = 'order_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'order_code',
        'account_id',
        'delivery_id',
        'GHN_code',
        'order_date',
        'order_flag',
        'order_status',
        'total_amount',
        'order_type',
        'parent_id',
        'wholesale',
        'GHN_fee',
    ];
}
