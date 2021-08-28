import React from "react";
import UseSvg from "../../elements/UseSvg";
import Button from "../../MainInput/inputs/elements/Button";

function TrashBtn() {
  return (
    <div>
      <Button text={<UseSvg type="trash" />} />
    </div>
  );
}

export default TrashBtn;
