<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DeliveryAddress extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'delivery_addresses';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string,string,string,string,int>
     */
    protected $fillable = [
        'name',
        'phone_number',
        'address',
        'ward_code',
        'customer_id',
        'type',
        'default'
    ];

    /**
     * Get the ward for the address.
     */
    public function ward(): HasOne
    {
        return $this->hasOne(Ward::class, 'code', 'ward_code');
    }
}
