<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'category';
    protected $guarded = [''];
    protected $primaryKey = 'category_id';

    public function products()
    {
        return $this->hasMany(Product::class, 'product_category');
    }
}
