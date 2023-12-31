<?php
/**
 * Created by PhpStorm .
 * User: trungphuna .
 * Date: 4/30/23 .
 * Time: 12:46 AM .
 */


return [
    [
        'icon'   => 'home',
        'name'   => 'Tổng quan',
        'route'  => 'get_admin.home',
        'prefix' => [''],
        'group' => '',
        'childs' => []
    ],
    [
        'icon'   => 'list',
        'name'   => 'Sản phẩm',
        'route'  => 'get_admin.product.index',
        'prefix' => ['product'],
        'group' => 'product',
        'childs' => [
            [
                'icon'   => 'database',
                'name'   => 'Danh sách sản phẩm',
                'route'  => 'get_admin.product.index',
                'prefix' => ['product'],
                'group' => 'product'
            ],
            [
                'icon'   => 'list',
                'name'   => 'Danh mục sản phẩm',
                'route'  => 'get_admin.category.index',
                'prefix' => ['category'],
                'group' => 'category',
            ],
            [
                'icon'   => 'list',
                'name'   => 'Hàng hóa theo nguồn gốc',
                'route'  => 'get_admin.brand.index',
                'prefix' => ['brand'],
                'group' => 'brand',
            ]
        ]
    ],
    [
        'icon'   => 'list',
        'name'   => 'Quản lý sỉ',
        'route'  => 'get_admin.wholesale.indexWholesaleApprove',
        'prefix' => ['wholesale'],
        'group' => 'wholesale',
        'childs' => [
            [
                'icon'   => 'list',
                'name'   => 'Xác nhận khách sỉ',
                'route'  => 'get_admin.wholesale.indexWholesaleApprove',
                'prefix' => ['wholesale'],
                'group' => 'wholesale'
            ],
            [
                'icon'   => 'shopping-cart',
                'name'   => 'Đơn hàng sỉ',
                'route'  => 'get_admin.order.indexWholesale',
                'prefix' => ['order'],
                'group' => 'order',
                'childs' => []
            ],
            [
                'icon'   => 'shopping-cart',
                'name'   => 'Công nợ',
                'route'  => 'get_admin.order.indexDebt',
                'prefix' => ['order'],
                'group' => 'order',
                'childs' => []
            ],
        ]
    ],
    [
        'icon'   => 'list',
        'name'   => 'Quản Lý Kho',
        'route'  => 'get_admin.inventory.index',
        'prefix' => ['inventory'],
        'group' => 'inventory',
        'childs' => [
            [
                'icon'   => 'list',
                'name'   => 'Phiếu nhập kho',
                'route'  => 'get_admin.inventory.index',
                'prefix' => ['inventory'],
                'group' => 'inventory'
            ],
            [
                'icon'   => 'database',
                'name'   => 'Hàng tồn kho',
                'route'  => 'get_admin.product.indexExists',
                'prefix' => ['product'],
                'group' => 'product'
            ],
        ]
    ],
    [
        'icon'   => 'shopping-cart',
        'name'   => 'Đơn hàng',
        'route'  => 'get_admin.order.index',
        'prefix' => ['order'],
        'group' => 'order',
        'childs' => [
            [
                'icon'   => 'shopping-cart',
                'name'   => 'Đơn hàng trực tuyến',
                'route'  => 'get_admin.order.index',
                'prefix' => ['order'],
                'group' => 'order',
                'childs' => []
            ],
            [
                'icon'   => 'shopping-cart',
                'name'   => 'Đơn hàng tại quầy',
                'route'  => 'get_admin.order.indexOffline',
                'prefix' => ['order'],
                'group' => 'order',
                'childs' => []
            ],
        ]
    ],
    [
        'icon'   => 'message-circle',
        'name'   => 'Chat',
        'route'  => 'get_admin.chat.index',
        'prefix' => ['product'],
        'group' => 'product',
        'childs' => []
    ],
    [
        'icon'   => 'user',
        'name'   => 'User',
        'route'  => 'get_admin.user.index',
        'prefix' => ['user'],
        'group' => 'user',
        'childs' => []
    ],
    [
        'icon'   => 'user',
        'name'   => 'QL Nhân viên',
        'route'  => 'get_admin.user.index',
        'prefix' => ['admin'],
        'group' => 'admin',
        'childs' => []
    ],
    [
        'icon'   => 'key',
        'name'   => 'Role',
        'route'  => 'get_admin.role.index',
        'prefix' => ['role'],
        'group' => 'role',
        'childs' => []
    ],
    [
        'icon'   => 'key',
        'name'   => 'Permission',
        'route'  => 'get_admin.permission.index',
        'prefix' => ['permission'],
        'group' => 'permission',
        'childs' => []
    ]
];
