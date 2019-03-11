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

export default class CompSizePicker extends React.Component<
  ISizePickerProps,
  ISizePickerState
> {
  constructor (props: ISizePickerProps) {
    super(props);
    this.state = {
      activeSize: props.activeSize || ''
    };
  }

  public sizeChangeHandler = (size: string) => () => {
    const { activeSize } = this.state;
    const { onSizeChange } = this.props;
    if (size !== activeSize) {
      this.setState({ activeSize: size });
      onSizeChange && onSizeChange(size);
    }
  }

  public render () {
    const props = this.props;
    const { activeSize } = this.state;
    if (!activeSize && props.sizes.length) {
      this.sizeChangeHandler(props.sizes[0])();
    }

    return (
      <div className='mr-2 mb-2'>
        {props.sizes.map((size) => (
          <Button
            style={{ boxShadow: 'none' }}
            variant={size === activeSize ? 'danger' : 'light'}
            className='sm border-light rounded mb-2 mr-2'
            onClick={this.sizeChangeHandler(size)}>
            {size}
          </Button>
        ))}
      </div>
    );
  }
}
