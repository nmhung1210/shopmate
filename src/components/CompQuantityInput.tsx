import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

export interface IQuantityInputProps {
  max?: number;
  min?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export interface IQuantityInputState {
  value: number;
  clear: boolean;
}

export default class CompQuantityInput extends React.Component<
  IQuantityInputProps,
  IQuantityInputState
> {
  constructor (props: IQuantityInputProps) {
    super(props);
    const { value = 1 } = props;
    this.state = {
      value,
      clear: false
    };
  }

  public render () {
    const { min = 1, max = 99, step = 1, onChange } = this.props;
    const { value, clear } = this.state;

    return (
      <ButtonToolbar aria-label='Size picker'>
        <ButtonGroup className='mr-2'>
          <Button
            style={{ width: '2rem', height: '2rem', padding: 0, boxShadow: 'none' }}
            variant='outline-secondary'
            className='rounded-circle mr-2 bg-light'
            onClick={() => {
              let val = value - step;
              val = Math.max(min, Math.min(val, max));
              this.setState({ value: val, clear: false });
              onChange && onChange(val);
            }}>
            <RemoveIcon />
          </Button>
          <input
            style={{ width: '4rem', height: '2rem', padding: 0, outline: 'none' }}
            className='border border-secondary rounded-pill mr-2 text-center'
            value={clear ? '' : value.toString(10)}
            onChange={(e) => {
              let val = parseInt(e.target.value, 10);
              val = Math.max(min, Math.min(val, max));
              if (isNaN(val)) {
                this.setState({ clear: true });
              } else {
                this.setState({ value: val, clear: false });
                onChange && onChange(val);
              }
              e.preventDefault();
            }}
          />
          <Button
            style={{ width: '2rem', height: '2rem', padding: 0, boxShadow: 'none' }}
            variant='outline-secondary'
            className='rounded-circle mr-2 bg-light'
            onClick={() => {
              let val = value + step;
              val = Math.max(min, Math.min(val, max));
              this.setState({ value: val, clear: false });
              onChange && onChange(val);
            }}>
            <AddIcon />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}
