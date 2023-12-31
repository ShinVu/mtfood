<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'inventory';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'inventory_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string,string,string,string,string,int,int,float,date>
     */
    protected $fillable = [
        'inventory_id',
        'inventory_code',
        'inventory_note',
        'staf_name',
        'supplier_name',
        'supplier_phone',
        'account_id',
        'inventory_status',
        'total_amount',
        'inventory_date'
    ];
}
