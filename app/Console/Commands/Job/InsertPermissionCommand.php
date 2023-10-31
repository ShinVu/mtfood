<?php

namespace App\Console\Commands\Job;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;

class InsertPermissionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permission:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $permissions = [
            [
                "name" => 'full',
                'guard_name' => 'web',
                'group' => 'full',
                'description' => 'Toàn quyền'
            ],
            [
                "name" => 'admin_home',
                'guard_name' => 'web',
                'group' => 'admin_home',
                'description' => 'Trang home, thống kê'
            ],
            [
                "name" => 'order_index',
                'guard_name' => 'web',
                'group' => 'order',
                'description' => 'Quản lý đơn hàng'
            ],
            [
                "name" => 'product_index',
                'guard_name' => 'web',
                'group' => 'product',
                'description' => 'Danh sách sản phẩm'
            ],
            [
                "name" => 'product_store',
                'guard_name' => 'web',
                'group' => 'product',
                'description' => 'Thêm mới sản phẩm'
            ],
            [
                "name" => 'product_update',
                'guard_name' => 'web',
                'group' => 'product',
                'description' => 'Cập nhật sản phẩm'
            ],
            [
                "name" => 'product_delete',
                'guard_name' => 'web',
                'group' => 'product',
                'description' => 'Xoá sản phẩm'
            ],
            [
                "name" => 'chat_index',
                'guard_name' => 'web',
                'group' => 'chat',
                'description' => 'Quản lý chat'
            ],
            [
                "name" => 'user_index',
                'guard_name' => 'web',
                'group' => 'user',
                'description' => 'Quản lý thành viên'
            ],
            [
                "name" => 'user_store',
                'guard_name' => 'web',
                'group' => 'user',
                'description' => 'Thêm mới thành viên'
            ],
            [
                "name" => 'user_update',
                'guard_name' => 'web',
                'group' => 'user',
                'description' => 'Cập nhật thành viên'
            ],
            [
                "name" => 'user_delete',
                'guard_name' => 'web',
                'group' => 'user',
                'description' => 'Xoá thành viên'
            ],
            [
                "name" => 'category_index',
                'guard_name' => 'web',
                'group' => 'category',
                'description' => 'Danh sách danh mục'
            ],
            [
                "name" => 'category_store',
                'guard_name' => 'web',
                'group' => 'category',
                'description' => 'Thêm mới danh mục'
            ],
            [
                "name" => 'category_update',
                'guard_name' => 'web',
                'group' => 'category',
                'description' => 'Cập nhật danh mục'
            ],
            [
                "name" => 'category_delete',
                'guard_name' => 'web',
                'group' => 'category',
                'description' => 'Xoá danh mục'
            ],
            [
                "name" => 'admin_index',
                'guard_name' => 'web',
                'group' => 'admin',
                'description' => 'Danh sách admin'
            ],
            [
                "name" => 'role_index',
                'guard_name' => 'web',
                'group' => 'role',
                'description' => 'Danh sách role'
            ],
            [
                "name" => 'role_store',
                'guard_name' => 'web',
                'group' => 'role',
                'description' => 'Thêm mới Role'
            ],
            [
                "name" => 'role_update',
                'guard_name' => 'web',
                'group' => 'role',
                'description' => 'Cập nhật Role'
            ],
            [
                "name" => 'role_delete',
                'guard_name' => 'web',
                'group' => 'role',
                'description' => 'Xoá role'
            ],
            [
                "name" => 'permission_index',
                'guard_name' => 'web',
                'group' => 'permission',
                'description' => 'Danh sách permission'
            ],
            [
                "name" => 'permission_store',
                'guard_name' => 'web',
                'group' => 'permission',
                'description' => 'Thêm mới permission'
            ],
            [
                "name" => 'permission_update',
                'guard_name' => 'web',
                'group' => 'permission',
                'description' => 'Cập nhật permission'
            ],
            [
                "name" => 'permission_delete',
                'guard_name' => 'web',
                'group' => 'permission',
                'description' => 'Xoá permission'
            ]
        ];

        foreach ($permissions as $item)
        {
            $check = Permission::where("name", $item["name"])->first();
            if (!$check) {
                $item['created_at'] = Carbon::now();
                Permission::create($item);
            }
        }

        $this->info("=========== INIT ============");
    }
}
