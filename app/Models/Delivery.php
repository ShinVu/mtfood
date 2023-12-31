<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'delivery';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'delivery_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'delivery_id',
        'account_id',
        'delivery_address',
        'delivery_name',
        'delivery_note',
        'delivery_phone',
        'district',
        'province',
        'ward'
    ];
}
