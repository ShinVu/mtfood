<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
use Exception;

class ProfileController extends Controller
{

    public function updateProfile(UpdateProfileRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();
            /** @var \App\Models\Customer $customer */
            $customer = Customer::where('id', $data['id']);
            //Check request authorization
            if ($token != $customer->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }
            $customer->update(['name' => $data['name'], 'gender' => $data['gender'], 'date_of_birth' => date("Y-m-d H:i:s", $data['dateOfBirth']), 'identification_number' => $data['identificationNumber']]);
            $customer = $customer->first();
            //Create response data
            $user = ['id' => $customer['id'], 'googleId' => $customer['google_id'], 'name' => $customer['name'], 'phoneNumber' => $customer['phone_number'], 'email' => $customer['email'], 'identificationNumber' => $customer['identification_number'], 'gender' => $customer['gender'], 'dateOfBirth' => $customer['date_of_birth']];
            return response([
                'message' => 'updateProfileSuccessful',
                'result' => ['user' => $user]
            ], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();
            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['id']);

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            //Update customer password
            $password = Hash::make($data['password']);
            $user->update(['password' => $password]);

            return response(['message' => 'passwordChangeSuccessful', 'result' => []], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
