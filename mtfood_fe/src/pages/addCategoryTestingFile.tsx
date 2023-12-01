import {
    Button,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    TextareaAutosize,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useForm } from "react-hook-form";

export default function AddCategory() {
    const [categories, setCategories] = useState<any>(null);
    const [cat, setCat] = useState<any>(null);
    const [image, setImage] = useState<any>(null);
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
        setImage(event.target.files[0]);
    };

    const onSubmit = (data: any) => {
        const payload = new FormData();
        payload.append("name", data.name);
        payload.append("description", data.description);
        payload.append("price", data.price);
        payload.append("image", image);
        axiosClient
            .post("/createCategory", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(({ response }) => {
                console.log(response);
            });
    };
    return (
        <div className="bg-gray-100 flex min-h-screen h-full flex-col items-start space-y-8 p-8">
            <TextField
                label="tên danh mục"
                variant="outlined"
                className="bg-white w-1/2"
                {...register("name")}
            />
            <TextareaAutosize
                placeholder="mô tả"
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
            <FormControl className="bg-white w-1/2">
                <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cat && cat.name}
                    label="Danh mục"
                    onChange={(event) => setCat(event.target.value)}
                >
                    {categories &&
                        categories.map((cat: any) => (
                            <MenuItem value={cat}>{cat.name}</MenuItem>
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
