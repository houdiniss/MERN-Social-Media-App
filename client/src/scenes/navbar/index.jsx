import { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from "@mui/icons-material";
import { useDispatch , useSelector } from "react-redux";
import { setMode , setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from 'components/FlexBetween';


const Navbar = () => {
  const [isMobileMenuToggled , setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const theme= useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const h3 = theme.typography.h3;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween 
      backgroundColor={alt} 
      p = {isNonMobileScreens ? "0.9rem 3.5rem" : "0.9rem 2.5rem"}
      >

        <FlexBetween gap="3rem">
            <Typography
              onClick={() => navigate("/home")}
              sx={{
                fontSize: h3,
                cursor:"pointer",
                color: "#00D5FA",
                fontWeight:"bold",
              }}
            >
              Sociopedia
            </Typography>
            
            {isNonMobileScreens && (
              <FlexBetween
                maxHeight= "30px"
                maxWidth= "250px"
                backgroundColor={neutralLight}
                borderRadius="9px"
                padding="0.1rem 1.5rem"
                gap="3rem"
              >
                  <InputBase sx={{fontSize: "12px"}} placeholder='Search...'/>
                  <IconButton>
                      <Search />
                  </IconButton>
              </FlexBetween>
            )}
        </FlexBetween>



        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
        <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{fontSize:"22px"}}/>
                ) : (
                  <LightMode sx={{fontSize:"22px" , color:dark}}/>
                )}
            </IconButton>
            <Message sx={{fontSize: "22px"}}/>
            <Notifications sx={{fontSize: "22px"}}/>
            <Help sx={{fontSize: "22px"}}/>
            <FormControl variant='standard' value={fullName}>
                <Select 
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root" : {
                      pr: "0.25rem",
                      width: "3rem"
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    }
                  }}
                  input={<InputBase />}
                >
                    <MenuItem>
                        <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem 
                      sx={{fontSize:"12px"}} 
                      onClick={() => dispatch(setLogout())}
                    >
                      Log Out
                    </MenuItem>
                </Select>
            </FormControl>
        </FlexBetween>
        ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
            <Menu />
        </IconButton>
        )}     



        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            bottom="0"
            right="0" 
            height="100%"
            zIndex="10"
            maxWidth="400px"
            minWidth="200px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
              <Box display="flex" justifyContent="flex-end" p="1rem">
                  <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                      <Close />
                  </IconButton>
              </Box>

            {/* MENU ITEMS */}
              <FlexBetween 
                display="flex" 
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2rem"
              >
                  <IconButton
                    onClick={() => dispatch(setMode())}
                    sx={{fontSize:"25px"}}
                  >
                        {theme.palette.mode === "dark" ? (
                          <DarkMode sx={{fontSize:"22px"}}/>
                        ) : (
                          <LightMode sx={{fontSize:"22px" , color:dark}}/>
                        )}
                  </IconButton>
                  <Message sx={{fontSize:"22px"}}/>
                  <Notifications sx={{fontSize:"22px"}}/>       
                  <Help sx={{fontSize:"22px"}}/>
                  <FormControl value={fullName} variant='standard'>
                      <Select
                        value={fullName}
                        sx={{
                          backgroundColor: neutralLight,
                          width: "150px",
                          borderRadius: "0.25rem",
                          p: "0.25rem 1rem",
                             "& .MuiSvgIcon-root": {
                               pr: "0.25rem",
                               width: "3rem",
                             },
                             "& .MuiSelect-select:focus": {
                               backgroundColor: neutralLight,
                             }
                        }}
                        input={<InputBase />}
                      >
                          <MenuItem>
                            <Typography>{fullName}</Typography>
                          </MenuItem>
                          <MenuItem 
                            onClick={() => dispatch(setLogout())}
                            sx={{fontSize: "12px"}}
                          >
                            Log Out</MenuItem>
                      </Select>
                  </FormControl>        
              </FlexBetween>
          </Box>
        )}

    </FlexBetween>
  )
};

export default Navbar;