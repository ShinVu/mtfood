<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryDetail extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'inventory_detail';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'inventory_detail_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string,date,int,float,int>
     */
    protected $fillable = [
        'inventory_detail_id',
        'inventory_code',
        'product_id',
        'product_date_import',
        'product_quantity',
        'product_price_import',
        'product_quantity'
    ];
}
