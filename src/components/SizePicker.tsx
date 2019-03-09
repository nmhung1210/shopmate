import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export interface ISizePickerProps {
  sizes: string[];
  activeSize?: string;
  onSizeChange?: (size: string) => void;
}

export interface ISizePickerState {
  activeSize: string;
}

export default class SizePicker extends React.Component<ISizePickerProps, ISizePickerState> {
  constructor (props: ISizePickerProps) {
    super(props);
    this.state = {
      activeSize: props.activeSize || ''
    };
  }

  public render () {
    const props = this.props;
    const { activeSize } = this.state;
    return (
      <ButtonToolbar aria-label='Size picker'>
        <ButtonGroup className='mr-2'>
          {props.sizes.map((size) => (
            <Button
              style={{boxShadow: 'none'}}
              variant={size === activeSize ? 'danger' : 'light'}
              className='sm border-light rounded mr-2'
              onClick={() => {
                if (size !== activeSize) {
                  this.setState({ activeSize: size });
                  props.onSizeChange && props.onSizeChange(size);
                }
              }}>
              {size}
            </Button>
          ))}
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}
