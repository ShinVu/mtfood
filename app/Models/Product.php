<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';
    protected $primaryKey = 'product_id';
    protected $guarded = [''];

    const STATUS_DEFAULT = 1;
    const STATUS_SUCCESS = 2;
    const STATUS_CANCEL = -1;
    const STATUS_FINISH = 3;

    public $setStatus = [
        self::STATUS_DEFAULT => [
            'name' => 'Khởi tạo',
            'class' => 'badge badge-light'
        ],
        self::STATUS_SUCCESS => [
            'name' => 'Active',
            'class' => 'badge badge-primary'
        ],
        self::STATUS_CANCEL => [
            'name' => 'Huỷ bỏ',
            'class' => 'badge badge-danger'
        ],
        self::STATUS_FINISH => [
            'name' => 'Hoàn thành',
            'class' => 'badge badge-success'
        ],
    ];

    public function getStatus()
    {
        return Arr::get($this->setStatus, $this->status, []);
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
