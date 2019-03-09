import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export interface IColorPickerProps {
  colors: string[];
  activeColor?: string;
  onColorChange?: (color: string) => void;
}

export interface IColorPickerState {
  activeColor: string;
}

export default class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
  constructor (props: IColorPickerProps) {
    super(props);
    this.state = {
      activeColor: props.activeColor || ''
    };
  }

  public render () {
    const props = this.props;
    const { activeColor } = this.state;
    return (
      <ButtonToolbar aria-label='Color picker'>
        <ButtonGroup className='mr-2'>
          {props.colors.map((color) => (
            <Button
              className='rounded-circle mr-3'
              style={{
                width: '1rem',
                height: '1rem',
                backgroundColor: color,
                padding: 0,
                border: 'solid 3px #fff',
                boxShadow: `0px 0px 2px 2px ${color === activeColor ? '#f62f5e' : 'rgba(0,0,0,0.2)'}`
              }}
              onClick={() => {
                if (color !== activeColor) {
                  this.setState({ activeColor: color });
                  props.onColorChange && props.onColorChange(color);
                }
              }}
            />
          ))}
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}
