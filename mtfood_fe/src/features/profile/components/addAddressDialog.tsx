import React, { useState, useEffect, useCallback } from "react";
//Import MUI element
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//Import i18-next
import { useTranslation } from "react-i18next";

//Import color
import { colors } from "../../../../public/theme";

//Import components
import {
    ContainedButton,
    OutlinedButton,
    TextButton,
} from "../../../components/button";
import useWindowSizeDimensions from "../../../hooks/useWindowResponsiveDimensions";
import { getSizeDialog } from "../../../utils";

const box1 = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
        label: "The Lord of the Rings: The Return of the King",
        year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
    {
        label: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
    },
    {
        label: "Star Wars: Episode V - The Empire Strikes Back",
        year: 1980,
    },
    { label: "Forrest Gump", year: 1994 },
    { label: "Inception", year: 2010 },
    {
        label: "The Lord of the Rings: The Two Towers",
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: "Goodfellas", year: 1990 },
    { label: "The Matrix", year: 1999 },
    { label: "Seven Samurai", year: 1954 },
    {
        label: "Star Wars: Episode IV - A New Hope",
        year: 1977,
    },
    { label: "City of God", year: 2002 },
    { label: "Se7en", year: 1995 },
    { label: "The Silence of the Lambs", year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: "Life Is Beautiful", year: 1997 },
    { label: "The Usual Suspects", year: 1995 },
    { label: "Léon: The Professional", year: 1994 },
    { label: "Spirited Away", year: 2001 },
    { label: "Saving Private Ryan", year: 1998 },
    { label: "Once Upon a Time in the West", year: 1968 },
    { label: "American History X", year: 1998 },
    { label: "Interstellar", year: 2014 },
    { label: "Casablanca", year: 1942 },
    { label: "City Lights", year: 1931 },
    { label: "Psycho", year: 1960 },
    { label: "The Green Mile", year: 1999 },
    { label: "The Intouchables", year: 2011 },
    { label: "Modern Times", year: 1936 },
    { label: "Raiders of the Lost Ark", year: 1981 },
    { label: "Rear Window", year: 1954 },
    { label: "The Pianist", year: 2002 },
    { label: "The Departed", year: 2006 },
    { label: "Terminator 2: Judgment Day", year: 1991 },
    { label: "Back to the Future", year: 1985 },
    { label: "Whiplash", year: 2014 },
    { label: "Gladiator", year: 2000 },
    { label: "Memento", year: 2000 },
    { label: "The Prestige", year: 2006 },
    { label: "The Lion King", year: 1994 },
    { label: "Apocalypse Now", year: 1979 },
    { label: "Alien", year: 1979 },
    { label: "Sunset Boulevard", year: 1950 },
    {
        label: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        year: 1964,
    },
    { label: "The Great Dictator", year: 1940 },
    { label: "Cinema Paradiso", year: 1988 },
    { label: "The Lives of Others", year: 2006 },
    { label: "Grave of the Fireflies", year: 1988 },
    { label: "Paths of Glory", year: 1957 },
    { label: "Django Unchained", year: 2012 },
    { label: "The Shining", year: 1980 },
    { label: "WALL·E", year: 2008 },
    { label: "American Beauty", year: 1999 },
    { label: "The Dark Knight Rises", year: 2012 },
    { label: "Princess Mononoke", year: 1997 },
    { label: "Aliens", year: 1986 },
    { label: "Oldboy", year: 2003 },
    { label: "Once Upon a Time in America", year: 1984 },
    { label: "Witness for the Prosecution", year: 1957 },
    { label: "Das Boot", year: 1981 },
    { label: "Citizen Kane", year: 1941 },
    { label: "North by Northwest", year: 1959 },
    { label: "Vertigo", year: 1958 },
    {
        label: "Star Wars: Episode VI - Return of the Jedi",
        year: 1983,
    },
    { label: "Reservoir Dogs", year: 1992 },
    { label: "Braveheart", year: 1995 },
    { label: "M", year: 1931 },
    { label: "Requiem for a Dream", year: 2000 },
    { label: "Amélie", year: 2001 },
    { label: "A Clockwork Orange", year: 1971 },
    { label: "Like Stars on Earth", year: 2007 },
    { label: "Taxi Driver", year: 1976 },
    { label: "Lawrence of Arabia", year: 1962 },
    { label: "Double Indemnity", year: 1944 },
    {
        label: "Eternal Sunshine of the Spotless Mind",
        year: 2004,
    },
    { label: "Amadeus", year: 1984 },
    { label: "To Kill a Mockingbird", year: 1962 },
    { label: "Toy Story 3", year: 2010 },
    { label: "Logan", year: 2017 },
    { label: "Full Metal Jacket", year: 1987 },
    { label: "Dangal", year: 2016 },
    { label: "The Sting", year: 1973 },
    { label: "2001: A Space Odyssey", year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: "Toy Story", year: 1995 },
    { label: "Bicycle Thieves", year: 1948 },
    { label: "The Kid", year: 1921 },
    { label: "Inglourious Basterds", year: 2009 },
    { label: "Snatch", year: 2000 },
    { label: "3 Idiots", year: 2009 },
    { label: "Monty Python and the Holy Grail", year: 1975 },
];
const box2 = [{ label: "2" }];
const box3 = [{ label: "3" }];
export default function AddAddressDialog(props) {
    const { t } = useTranslation();
    const size = useWindowSizeDimensions();
    const { open, handleModalOpen, handleClose } = props;
    const [type, setType] = useState("home");
    const handleAddressType = (addressType) => {
        setType(addressType);
    };
    const PopperMy = useCallback((props) => {
        const anchorEl = document.getElementById("autocompleteContainer");
        return (
            <Popper
                {...props}
                anchorEl={anchorEl}
                style={{ width: anchorEl.clientWidth }}
                placement="bottom"
            />
        );
    }, []);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={getSizeDialog(size)}
            disableScrollLock
        >
            <DialogTitle>
                {" "}
                <span>{t("addAddress")}</span>
            </DialogTitle>
            <DialogContent>
                <div className="flex flex-1 flex-col space-y-8">
                    <div className="flex flex-row flex-1 space-x-8">
                        <div className="w-3/4 min-w-fit">
                            <TextField
                                required
                                id="outlined-required"
                                placeholder={t("nameFAL")}
                                className="w-full"
                            />
                        </div>
                        <div className="w-1/4 min-w-fit">
                            <TextField
                                required
                                id="outlined-required"
                                placeholder={t("phoneNumber")}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div
                        className="flex flex-1 flex-row space-x-4"
                        id="autocompleteContainer"
                    >
                        <div className="w-1/3">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={box1}
                                className="w-full"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={t("province")}
                                    />
                                )}
                                PopperComponent={PopperMy}
                            />
                        </div>
                        <div className="w-1/3">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={box2}
                                className="w-full"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={t("district")}
                                    />
                                )}
                                PopperComponent={PopperMy}
                            />
                        </div>
                        <div className="w-1/3">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={box3}
                                className="w-full"
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={t("ward")}
                                    />
                                )}
                                PopperComponent={PopperMy}
                            />
                        </div>
                    </div>
                    <div className="flex flex-1">
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            className="w-full"
                            placeholder={t("addressField")}
                        />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h1 className="font-medium text-sm text-black">
                            {t("addressType")}
                        </h1>
                        <div className="flex flex-1 space-x-4">
                            <OutlinedButton
                                sx={
                                    !(type === "home") && {
                                        color: colors.gray[100],
                                        borderColor: colors.gray[100],
                                    }
                                }
                                onClick={() => handleAddressType("home")}
                            >
                                <span>Nhà riêng / chung cư</span>
                            </OutlinedButton>
                            <OutlinedButton
                                sx={
                                    !(type === "office") && {
                                        color: colors.gray[100],
                                        borderColor: colors.gray[100],
                                    }
                                }
                                onClick={() => handleAddressType("office")}
                            >
                                <span>Cơ quan / công ty</span>
                            </OutlinedButton>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-row">
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={
                                <span className="text-gray-100 text-sm">
                                    {t("setDefault")}
                                </span>
                            }
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <TextButton
                    sx={{ color: colors.gray[200] }}
                    onClick={handleClose}
                >
                    {t("cancel")}
                </TextButton>
                <Button onClick={handleClose}>{t("confirm")}</Button>
            </DialogActions>
        </Dialog>
    );
}
