import { ActionTypes } from '..';
import { IAction } from '../schemas';

export interface IDialogProps {
  show?: boolean;
  message?: string;
  error?: string;
  requesting?: boolean;
}

export interface IDialogState {
  [index: string]: IDialogProps;
}

export default function Dialogs (
  state = {} as IDialogState,
  action: IAction
): IDialogState {
  const { type, params } = action;
  switch (type) {
    case ActionTypes.MODAL_DIALOG: {
      const {name, ...props}  = params;
      const dialogProps  = {
        show: false,
        message: '',
        error: '',
        requesting: false,
        ...props
      };
      return {
        ...state,
        [name]: dialogProps
      };
    }
  }
  return state;
}
