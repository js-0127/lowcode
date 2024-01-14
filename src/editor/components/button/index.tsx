import { Button as AntdButton } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const Button = (props: any, ref: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        startLoading: () => {
          setLoading(true);
        },
        endLoading: () => {
          setLoading(false);
        },
      };
    },
    []
  );

  return (
    <AntdButton loading={loading} {...props}>
      {props?.children}
    </AntdButton>
  );
};

export default forwardRef(Button);
