<?php
/**
 * Created By PhpStorm
 * User: trungphuna
 * Date: 9/24/23
 * Time: 5:03 PM
 */


if( !function_exists('replace_url'))
{
    function replace_url($url)
    {
        return parse_url($url)['path'] ?? '';
    }
}
