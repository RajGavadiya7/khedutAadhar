import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Burger } from '@mantine/core';
import { useState } from "react";

export default function BasicMenu() {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <Burger color="white" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="/" style={{ textDecoration: "none", color: "green" }}>
                        Home
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link
                        to="/buy_crop"
                        style={{ textDecoration: "none", color: "green" }}
                    >
                        Buy Crop
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/price" style={{ textDecoration: "none", color: "green" }}>
                        Daily Crop Price
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link
                        to="/sell_crop"
                        style={{ textDecoration: "none", color: "green" }}
                    >
                        Sell Crop
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link
                        to="/hireTractor"
                        style={{ textDecoration: "none", color: "green" }}
                    >
                        Hire Tractor
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link
                        to="/profile"
                        style={{ textDecoration: "none", color: "green" }}
                    >
                        Profile
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
}