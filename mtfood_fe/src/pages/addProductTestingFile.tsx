import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    TextareaAutosize,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useForm } from "react-hook-form";

export default function AddProduct() {
    const [categories, setCategories] = useState<any>(null);
    const [cat, setCat] = useState<any>(null);
    const [imageFiles, setImageFiles] = useState<any>(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        const fetchCategory = () => {
            axiosClient
                .get("./category")
                .then(({ data }) => {
                    const category = data.result.category;
                    setCategories(category);
                })
                .catch(({ response }) => {
                    console.log(response);
                });
        };

        fetchCategory();
    }, []);

    const handleUpload = (event: any) => {
        setImageFiles(event.target.files);
    };

    const onSubmit = (data: any) => {
        const payload = new FormData();
        payload.append("name", data.name);
        payload.append("description", data.description);
        payload.append("price", data.price);
        payload.append("exp_date", data.exp_date);
        payload.append(
            "directionForPreservation",
            data.directionForPreservation
        );
        payload.append("directionForUse", data.directionForUse);
        payload.append("weight", data.weight);
        payload.append("pack", data.pack);
        payload.append("ingredient", data.ingredient);
        payload.append("is_wholesale", data.is_wholesale);
        payload.append("category", cat.id);
        if (imageFiles) {
            for (let x = 0; x < imageFiles.length; x++) {
                payload.append("images[]", imageFiles[x]);
            }
        }
        axiosClient
            .post("/createProduct", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => console.log(data))
            .catch(({ response }) => console.log(response));
    };
    return (
        <div className="bg-gray-100 flex min-h-screen h-full flex-col items-start space-y-8 p-8">
            <TextField
                label="tên sản phẩm"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("name")}
            />
            <TextareaAutosize
                placeholder="Maximum 4 rows"
                minRows={10}
                className="bg-white w-1/2"
                {...register("description")}
            />
            <TextField
                label="giá"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("price")}
            />
            <TextField
                label="hạn sử dụng"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("exp_date")}
            />
            <TextField
                label="hướng dẫn bảo quản"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("directionForPreservation")}
            />
            <TextField
                label="hướng dẫn sử dụng"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("directionForUse")}
            />
            <TextField
                label="khối lượng"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("weight")}
            />
            <TextField
                label="quy cách đóng gói"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("pack")}
            />
            <TextField
                label="nguyên liệu"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("ingredient")}
            />
            <TextField
                label="là sản phẩm sỉ?"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("is_wholesale")}
            />
            <FormControl className="bg-white w-1/2">
                <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cat}
                    label="Danh mục"
                    onChange={(event) => setCat(event.target.value)}
                >
                    {categories &&
                        categories.map((cat: any) => (
                            <MenuItem value={cat} key={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <Button variant="contained" component="label">
                Upload File
                <input
                    type="file"
                    onChange={handleUpload}
                    hidden
                    multiple
                    accept="image/*"
                />
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>gửi</Button>
        </div>
    );
}
