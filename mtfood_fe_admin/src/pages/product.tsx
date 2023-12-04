import Header from "../components/header";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axiosClient from "../../axios-client";
import { product } from "../models/product.model";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "name", headerName: "First name", width: 130 },
    { field: "description", headerName: "Last name", width: 130 },
    {
        field: "price",
        headerName: "Age",
        type: "number",
        width: 90,
    },
    {
        field: "quantity_available",
        type: "number",
        width: 160,
    },
    { field: "sold" },
];

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
];
export default function Product() {
    const [products, setProducts] = React.useState<product>([]);
    React.useEffect(() => {
        const fetchProducts = () => {
            const payload = {
                sort: "common",
                offset: 0,
                limit: 10,
            };

            axiosClient
                .get("/productByFilter", {
                    params: {
                        ...payload,
                    },
                })
                .then(({ data }) => setProducts(data.result.product))
                .catch(({ response }) => console.log(response));
        };
        if (products) {
            fetchProducts();
        }
    });

    return (
        <div>
            <Header />
            <div className="flex flex-1 flex-col w-full h-full space-y-4">
                <p className="font-bold text-lg">Danh sách sản phẩm</p>
                <DataGrid
                    rows={products}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}
