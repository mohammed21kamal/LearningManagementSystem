import React from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

export default function Switch({checked}) {
  return (
    <>
      <BootstrapSwitchButton checked={checked?true:false} size="xs" />
    </>
  );
}