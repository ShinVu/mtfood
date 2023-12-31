<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Metric extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'metrics';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'metric_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'metric_id',
        'metric_order',
        'metric_quantity',
        'metric_sales',
        'metric_date'
    ];
}
