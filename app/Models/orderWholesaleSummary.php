<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class orderWholesaleSummary extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'order_wholesale_summary';

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
    protected $guarded = [];

    /**
     * Get the order summary details for the order summary.
     */
    public function orderSummaryDetail(): HasMany
    {
        return $this->hasMany(orderWholesaleSummaryDetail::class, 'order_wholesale_summary_id', 'id');
    }
}
