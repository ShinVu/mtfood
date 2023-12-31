<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'brand';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'brand_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string,string,string,string>
     */
    protected $fillable = [
        'brand_id',
        'brand_name'
    ];
}
