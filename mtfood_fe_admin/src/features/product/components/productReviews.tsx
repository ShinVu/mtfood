import Avatar from "@mui/material/Avatar";
import { Rating } from "@mui/material";
import { IconButton } from "../../../components/button";
import { useTranslation } from "react-i18next";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { colors } from "../../../../public/theme";
function stringAvatar(name: string) {
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

export default function Review({ review }: { review: any }) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-row items-start">
            {review.avatar ? (
                <Avatar alt={review.name} src={review.avatar} />
            ) : (
                <Avatar {...stringAvatar(review.name)} />
            )}
            <div className="ml-5 flex flex-col ">
                <p className="text-base font-semibold text-black my-0 py-0">
                    {review.name}
                </p>
                <Rating
                    name="simple-controlled"
                    value={review.rating}
                    className="-mx-1 my-0"
                    size="small"
                    readOnly
                />
                <p className="text-xs font-regular text-gray-100">
                    {review.updated_at}
                </p>
                <p className="text-xs font-regular text-justify">
                    {review.content}
                </p>
                <div className="flex flex-1">
                    <img
                        src={review.image_url}
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
                            {`${t("useful")} (${review.nums_of_rate_useful})`}
                        </span>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
