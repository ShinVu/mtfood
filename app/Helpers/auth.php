<?php
/**
 * Created By PhpStorm
 * User: trungphuna
 * Date: 9/24/23
 * Time: 5:03 PM
 */


if (!function_exists('get_data_user')) {
    function get_data_user($type, $field = 'id')
    {
        return Auth::guard($type)->user() ? Auth::guard($type)->user()->$field : '';
    }
}

function renderAgeVote($product)
{
    $age = 0;
    if ($product->total_vote <= 0 ) return 0;
    $age = round($product->total_stars / $product->total_vote, 1);
    return $age;
}
