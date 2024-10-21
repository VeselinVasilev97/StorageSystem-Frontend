import React, { useState } from 'react';
import classes from './SwitchButton.module.css';

interface SwitchProps {
  isOn: boolean;
  onColor?: string;
  nameFor:string;
  handleToggle: () => void;
}

const SwitchButton: React.FC<SwitchProps> = ({ isOn, onColor = '#4caf50', nameFor , handleToggle }) => {
  return (
    <div className={classes.switchContainer}>
      <input
        className={classes.switchCheckbox}
        id={nameFor}
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
      />
      <label
        className={classes.switchLabel}
        htmlFor={nameFor}
        style={{ background: isOn ? onColor : '#ccc' }}
      >
        <span className={classes.switchButton} />
      </label>
    </div>
  );
};

export default SwitchButton;
