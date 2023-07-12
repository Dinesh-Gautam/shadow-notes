import React from "react";
import { AnchorWrapper, Menu, MenuProvider } from "../../elements/Menu/Menu";
import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Switch,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

function ShareButton({ docId }) {
  const sharingUrl = useSharedUrl(docId);
  console.log(sharingUrl);
  return (
    <MenuProvider>
      <AnchorWrapper>
        <button>Share</button>
      </AnchorWrapper>

      <Menu outer={true}>
        <Box sx={{ minWidth: 0, p: 2 }}>
          <FormControl component="fieldset">
            <FormControlLabel
              sx={{
                gap: 4,
              }}
              value="Link Sharing"
              control={<Switch color="primary" />}
              label="Enable Link Sharing"
              labelPlacement="start"
            />
          </FormControl>

          <Paper
            sx={{
              maxWidth: "40%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              p: 1,
            }}
            variant="outlined"
          >
            {sharingUrl}
          </Paper>
        </Box>
      </Menu>
    </MenuProvider>
  );
}

function useSharedUrl(docId) {
  const { currentUser } = useAuth();

  const websiteDomain = window.location.host;

  // Concatenate the URL components
  const sharingUrl = `http://${websiteDomain}/shared/${currentUser.uid}/${docId}`;

  return sharingUrl;
}

export default ShareButton;
