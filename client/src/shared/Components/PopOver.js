import React from 'react';
import { Popover } from 'antd';

export default function PopOver({ logo, content, placement, trigger }) {
  return (
    <Popover content={content} placement={placement} trigger={trigger}>
      {logo}
    </Popover>
  );
}

// see https://ant.design/components/modal for more help

