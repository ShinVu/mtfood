<?php
/**
 * Created by PhpStorm .
 * User: trungphuna .
 * Date: 4/30/23 .
 * Time: 9:53 AM .
 */



if (!function_exists('upload_image')) {
    /**
     * @param $file [tên file trùng tên input]
     * @param array $extend [ định dạng file có thể upload được]
     * @return array|int [ tham số trả về là 1 mảng - nếu lỗi trả về int ]
     */
    function upload_image($file, $folder = '', array $extend = array())
    {
        $code = 1;
        // lay duong dan anh
        $baseFilename = public_path() . '/uploads/' . $_FILES[$file]['name'];

        $size = $_FILES[$file]['size'];
        $size =  round($size / (1024),1);

        // thong tin file
        $info = new SplFileInfo($baseFilename);

        // duoi file
        $ext = strtolower($info->getExtension());

        // kiem tra dinh dang file
        if (!$extend)
            $extend = ['png', 'jpg', 'jpeg', 'webp', 'gif'];

        if (!in_array($ext, $extend))
            return $data['code'] = 0;

        // Tên file mới
        $nameFile = trim(str_replace('.' . $ext, '', strtolower($info->getFilename())));
        $filename = date('Y-m-d__') . \Illuminate\Support\Str::slug($nameFile) . '.' . $ext;;

        // thu muc goc de upload
        $path = public_path() . '/uploads/' . date('Y/m/d/');
        if ($folder)
            $path = public_path() . '/' . $folder . '/' . date('Y/m/d/');

        if (!\File::exists($path))
            @mkdir($path, 0777, true);

        // di chuyen file vao thu muc uploads
        move_uploaded_file($_FILES[$file]['tmp_name'], $path . $filename);
        $data = [
            'name'     => $filename,
            'code'     => $code,
            'ext'      => $ext,
            'path'     => $path,
            'size'     => $size,
            'path_img' => 'uploads/' . $filename
        ];

        return $data;
    }
}


if (!function_exists('pare_url_file')) {
    function pare_url_file($image, $folder = 'uploads')
    {
        if (!$image) {
            return 'https://123code.net/images/preloader.png';
//            return '/images//preloader.png';
        }
        $explode = explode('__', $image);

        if (isset($explode[0])) {
            $time = str_replace('_', '/', $explode[0]);
            return '/' . $folder . '/' . date('Y/m/d', strtotime($time)) . '/' . $image;
        }
    }
}
