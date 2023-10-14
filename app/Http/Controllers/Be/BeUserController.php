<?php

namespace App\Http\Controllers\Be;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Mail\SendEmailRegisterUser;
use App\Models\User;
use App\Models\UserHasType;
use App\Models\UserType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Role;

class BeUserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::whereRaw(1);
        if ($n = $request->n) $users->where('name', 'like', '%' . $n . '%');

        $users = $users->orderByDesc('id')
            ->paginate(20);

        $viewData = [
            'users' => $users,
            'query' => $request->query()
        ];

        return view('be.user.index', $viewData);
    }

    public function create()
    {
        $roles      = Role::all();
        $roleActive = $userHasType = [];

        return view('be.user.create', compact( 'roles', 'roleActive', 'userHasType'));
    }

    public function store(Request $request)
    {
        try {
            $data                      = $request->except('_token', 'avatar', 'user_type', 'roles');
            $data['created_at']        = Carbon::now();
            $data['email_verified_at'] = Carbon::now();
            $data['password']          = bcrypt(Carbon::now());
            $data['status']            = $request->status ?? 1;


            if ($request->avatar) {
                $file = upload_image('avatar');
                if (isset($file['code']) && $file['code'] == 1) $data['avatar'] = $file['name'];
            }

            $user = User::create($data);
//            if ($user) {
//                $this->insertOrUpdateUserHasType($user, $request->user_type);
//                if ($request->roles)
//                    $user->assignRole($request->roles);
//
//                Mail::to($user->email)->queue(new SendEmailRegisterUser($user));
//            }
        } catch (\Exception $exception) {
            toastr()->error('Thêm mới thất bại!', 'Thông báo');
            Log::error("ERROR => UserController@store => " . $exception->getMessage());
            return redirect()->back();
        }

        toastr()->success('Thêm mới thành công!', 'Thông báo');
        return redirect()->route('get_admin.user.index');
    }

    public function edit($id)
    {
        $user        = User::findOrFail($id);

        $roles       = Role::all();
//        $userHasType = DB::table('users_has_types')->where('user_id', $id)->pluck('user_type_id')->toArray();
        $roleActive  = DB::table('model_has_roles')->where('model_id', $id)->pluck('role_id')->toArray();

        return view('be.user.update', compact('user', 'roles', 'roleActive'));
    }

    protected function insertOrUpdateUserHasType($user, $typeID)
    {
        $check = UserHasType::where('user_id', $user->id)->first();

        if ($check) {
            $check->user_type_id = $typeID;
            $check->updated_at   = Carbon::now();
            $check->save();
        } else {
            DB::table('users_has_types')->insert([
                'user_type_id' => $typeID,
                'created_at'   => Carbon::now(),
                'user_id'      => $user->id
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $data               = $request->except('_token', 'avatar', 'user_type', 'roles');
            $data['updated_at'] = Carbon::now();

            if ($request->avatar) {
                $file = upload_image('avatar');
                if (isset($file['code']) && $file['code'] == 1) $data['avatar'] = $file['name'];
            }

            $update = User::find($id)->update($data);
            if ($update) {
                $user = User::find($id);
//                $this->insertOrUpdateUserHasType($user, $request->user_type);

                if ($request->roles) {
                    $roleActive = DB::table('model_has_roles')->where('model_id', $id)->pluck('role_id')->toArray();
                    if (!empty($roleActive)) {
                        foreach ($roleActive as $item)
                            $user->removeRole($item);
                    }

                    $user->assignRole($request->roles);
                }

            }
        } catch (\Exception $exception) {
            Log::error("ERROR => BeUserController@store => " . $exception->getMessage());
            toastr()->error('Update thất bại!', 'Thông báo');
            return redirect()->route('get_admin.user.update', $id);
        }

        toastr()->success('Update thành công!', 'Thông báo');
        return redirect()->route('get_admin.user.index');
    }

    public function delete(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            if ($user) {
                $user->delete();
            }

        } catch (\Exception $exception) {
            toastr()->error('Update thất bại!', 'Thông báo');
            Log::error("ERROR => BeUserController@delete => " . $exception->getMessage());
            return redirect()->route('get_admin.user.index');
        }

        toastr()->success('Update thành công!', 'Thông báo');
        return redirect()->route('get_admin.user.index');
    }
}
