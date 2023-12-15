import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import logoImage from "../assets/logo.png";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import Dropdown from "@mui/joy/Dropdown";
import { notification } from "antd";
import { useFetchNotificationQuery } from "../../store";
import { useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar({ items, sideBarOpen, setSideBarOpen, socket }) {
  const { userRoleClinic } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [margin, setMargin] = useState(0);

  const { data, isFetching, error } = useFetchNotificationQuery();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!isFetching) {
      if (!data) return;
      console.log("NOTIF1", data.notifications);

      const notif = data.notifications
        .filter((notification) => notification != null)
        .map((notification, index) => notification.content);
      setNotifications(notif);
    }
  }, [isFetching]);

  useEffect(() => {
    const handleReceiveNotification = ({ contentDoctor, contentPatient }) => {
      console.log(contentDoctor);
      if (contentDoctor) setNotifications((prev) => [...prev, contentDoctor]);

      if (contentPatient) setNotifications((prev) => [...prev, contentPatient]);
    };

    // Attach the event listener
    if (!socket) return;
    socket.on("receive_notification_booked", handleReceiveNotification);
    socket.on("receive_notification_cancelled_by_patient", handleReceiveNotification);
    socket.on("receive_notification_cancelled_by_doctor", handleReceiveNotification);
    socket.on("receive_notification_rescheduled_by_patient", handleReceiveNotification);
    socket.on("receive_notification_rescheduled_by_doctor", handleReceiveNotification);
  }, [socket]);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsProfileOpen(true);
    setIsMessageOpen(false);
    setIsNotificationOpen(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = () => {
    setAnchorEl(true);
    setIsNotificationOpen(true);
    setIsMessageOpen(false);
    setIsProfileOpen(false);
  };
  const handleMessageClick = () => {
    setAnchorEl(true);
    setIsMessageOpen(true);
    setIsNotificationOpen(false);
    setIsProfileOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{
        marginTop: "35px", // Add margin-top property
        marginRight: `10px`,
      }}
      size="sm"
    >
      {isProfileOpen &&
        items.map(({ name, to }) => {
          return (
            <MenuItem onClick={handleMenuClose}>
              <Link to={to}>{name}</Link>
            </MenuItem>
          );
        })}

      {isNotificationOpen &&
        notifications.map((notification) => {
          return (
            <MenuItem size="sm" onClick={handleMenuClose}>
              <div>{notification}</div>
            </MenuItem>
          );
        })}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 5 new notifications" color="inherit">
          <Badge badgeContent={5} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} className="sticky top-0 z-10">
      <AppBar sx={{ backgroundColor: "#ffffff", color: "#5090d3" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleSideBar}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Clinic
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {socket && (
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleMessageClick}
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            )}

            {socket && (
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                onClick={handleNotificationClick}
              >
                {notifications.length > 0 ? (
                  <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                ) : (
                  <NotificationsIcon />
                )}
              </IconButton>
            )}

            {/* <Dropdown>
                <Badge badgeContent={5} color="error">
                  <NotificationsIcon />
                </Badge>             
                 <Menu>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>My account</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </Menu>
            </Dropdown> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
