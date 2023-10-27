<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddAddressRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\GetDistrict;
use App\Http\Requests\GetProvince;
use App\Http\Requests\GetWard;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\DeliveryAddress;
use App\Models\District;
use App\Models\Province;
use App\Models\Ward;
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

    public function addAddress(AddAddressRequest $request)
    {
        try {
            $data = $request->validated();
            $token = $request->bearerToken();


            /** @var \App\Models\Customer $customer */
            //Customer collection that matches id
            $user = Customer::where('id', $data['customerId']);

            //Check if customer id exists
            if (!$user->exists()) {
                return response(['message' => 'userInvalid', 'result' => []], 422);
            }

            //Check request authorization
            if ($token != $user->first()['remember_token']) {
                return response(['message' => 'invalidAccess', 'result' => []], 401);
            }

            //Check if ward exists
            if (!Ward::where('code', $data['wardCode'])->exists()) {
                return response(['message' => 'wardInvalid', 'result' => []], 422);
            }
            //Add new customer address
            /** @var \App\Models\DeliveryAddress $newAddress */

            $newAddress = DeliveryAddress::create(
                [
                    'name' => $data['name'],
                    'phone_number' => $data['phoneNumber'],
                    'address' => $data['address'],
                    'ward_code' => $data['wardCode'],
                    'customer_id' => $data['customerId']
                ]
            );

            return response(['message' => 'addAddressSuccessfully', 'result' => ['address' => $newAddress]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getProvince(GetProvince $request)
    {
        try {
            /** @var \App\Models\Province $province */
            $province = Province::all(['code', 'full_name']);
            return response(['message' => 'getProvinceSuccess', 'result' => ['province' => $province]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getDistrict(GetDistrict $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\District $district */
            $district = District::where('province_code', $data['provinceCode'])->get(['code', 'full_name']);
            return response(['message' => 'getDistrictSuccess', 'result' => ['district' => $district]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }

    public function getWard(GetWard $request)
    {
        try {
            $data = $request->validated();
            /** @var \App\Models\Ward $ward */
            $ward = Ward::where('district_code', $data['districtCode'])->get(['code', 'full_name']);
            return response(['message' => 'getWardSuccess', 'result' => ['ward' => $ward]], 200);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage(), 'result' => []], 500);
        }
    }
}
