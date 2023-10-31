<?php
/**
 * Created By PhpStorm
 * User: trungphuna
 * Date: 10/31/23
 * Time: 10:17 PM
 */

namespace App\Http\Middleware;

use Spatie\Permission\Exceptions\UnauthorizedException;
use Closure;

class PermissionMiddleware
{
    public function handle($request, Closure $next, $permission, $guard = 'web')
    {
        return $next($request);
        $authGuard = app('auth')->guard($guard);

        if ($authGuard->guest()) {
            return redirect()->route('get_admin.login');
        }

        $permissions = is_array($permission)
            ? $permission
            : explode('|', $permission);

        foreach ($permissions as $permission) {
            if ($authGuard->user()->can($permission)) {
                return $next($request);
            }
        }

        throw UnauthorizedException::forPermissions($permissions);
    }
}