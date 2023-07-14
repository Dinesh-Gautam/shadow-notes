import React, { useState } from "react";
import { AnchorWrapper, Menu, MenuProvider } from "../../elements/Menu/Menu";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Snackbar,
  Switch,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

import styles from "./ShareButton.module.scss";
import { useData } from "../../../context/DatabaseContext";
import ShareIcon from "@mui/icons-material/Share";

function ShareButton({ docId, data }) {
  const { updateDocField } = useData();
  const sharingUrl = useSharedUrl(docId);
  console.log(sharingUrl);
  return (
    <MenuProvider>
      <AnchorWrapper>
        <button>
          <ShareIcon fontSize="sm" />
          <span>Share</span>
        </button>
      </AnchorWrapper>

      <Menu outer={true}>
        <div className={styles.container}>
          <FormControl component="fieldset">
            <FormControlLabel
              sx={{
                gap: 4,
              }}
              value="Link Sharing"
              control={
                <Switch
                  onChange={(e) => {
                    updateDocField(docId, {
                      linkSharing: e.target.checked,
                    });
                  }}
                  checked={data?.linkSharing ?? false}
                  color="primary"
                />
              }
              label="Enable Sharing"
              labelPlacement="start"
            />
          </FormControl>
          {/* <div className={styles.linkContainer}>
            <span>{sharingUrl}</span>
          </div> */}
          {sharingUrl && <CopyToClipboardButton text={sharingUrl} />}
        </div>
      </Menu>
    </MenuProvider>
  );
}

const CopyToClipboardButton = ({ text }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <button onClick={handleClick}>Copy Link</button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Link Copied."
      />
    </>
  );
};

function useSharedUrl(docId) {
  const { currentUser } = useAuth();

  const websiteDomain = window.location.host;

  // Concatenate the URL components
  const sharingUrl = `http://${websiteDomain}/shared/${currentUser.uid}/${docId}`;

  return sharingUrl;
}

export default ShareButton;
