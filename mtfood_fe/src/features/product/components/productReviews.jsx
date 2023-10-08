import Avatar from "@mui/material/Avatar";
import { Rating } from "@mui/material";
import { IconButton } from "../../../components/Button";
import { useTranslation } from "react-i18next";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { colors } from "../../../../public/theme";
function stringAvatar(name) {
    return {
        sx: {},
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

const user = {
    address: "Bạch Đằng, Quận Tân Bình, TP.HCM",
    avatar: "./assets/image_15.png",
    name: "Lorem",
};

const product = {
    name: "Khô bò",
    imgList: ["/assets/image_15.png"],
    numsOfRating: 10,
    rating: 4.6,
    stock: 200,
};

export default function Review() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-row items-start">
            {user.avatar ? (
                <Avatar alt={user.name} src={user.avatar} />
            ) : (
                <Avatar {...stringAvatar("Kent Dodds")} />
            )}
            <div className="ml-5 flex flex-col ">
                <p className="text-base font-semibold text-black my-0 py-0">
                    {user.name}
                </p>
                <Rating
                    name="simple-controlled"
                    defaultValue={product.rating}
                    className="-mx-1 my-0"
                    size="small"
                    precision={0.5}
                    readOnly
                />
                <p className="text-xs font-regular text-gray-100">
                    02-9-2023 | 03.00
                </p>
                <p className="text-xs font-regular text-justify">
                    {" "}
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div className="flex flex-1">
                    <img
                        src="/assets/image_14.png"
                        className="w-24 h-24 object-center object-cover"
                    />
                </div>
                <div className="flex m-w-fit mt-4">
                    <IconButton
                        startIcon={
                            <ThumbUpOffAltIcon
                                sx={{ color: colors.gray[100] }}
                                size={24}
                            />
                        }
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        <span className="text-xs text-gray-100 my-0">
                            {t("useful")}
                        </span>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
