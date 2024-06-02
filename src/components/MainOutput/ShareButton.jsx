import {
  Badge,
  FormControl,
  FormControlLabel,
  Snackbar,
  Switch,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AnchorWrapper, Menu, MenuProvider } from "../elements/Menu";
import ShareIcon from "@mui/icons-material/Share";
import { useData } from "../../context/DatabaseContext";
import styles from "styles/components/ShareButton.module.scss";

function ShareButton({ docId, data }) {
  const { updateDocField } = useData();
  const sharingUrl = useSharedUrl(docId);

  return (
    <MenuProvider>
      <AnchorWrapper>
        <button>
          <Badge
            color="primary"
            variant="dot"
            fontSize="small"
            invisible={!data?.linkSharing ?? true}
          >
            <ShareIcon fontSize="small" />
          </Badge>
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
