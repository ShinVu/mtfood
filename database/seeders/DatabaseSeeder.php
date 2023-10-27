<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\ProductHaveTag;
use App\Models\ProductWholesalePricing;
use Database\Factories\OrderDiscountFactory;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // SqlFileSeeder::class,  //Seeder to import locations file, only work if config {1. Go to PhpMyadmin, 2. Query: SET GLOBAL max_allowed_packet=1073741824;}
            EmployeeSeeder::class,
            ShiftSeeder::class,
            ParticipationSeeder::class,
            CustomerSeeder::class,
            ProductCategorySeeder::class,
            ProductSeeder::class,
            ProductDiscountSeeder::class,
            ProductPricingSeeder::class,
            ProductWholesalePricingSeeder::class,
            ProductBatchSeeder::class,
            ProductTagSeeder::class,
            SupplierSeeder::class,
            ImportOrderSeeder::class,
            ImportOrderDetailSeeder::class,
            ChatSessionSeeder::class,
            ChatSessionParticipationSeeder::class,
            ChatMessageSeeder::class,
            ProductHaveTagSeeder::class,
            DeliveryAddressSeeder::class,
            OrderDiscountSeeder::class,
            OrderSeeder::class,
            OrderDetailSeeder::class,
        ]);
    }
}
