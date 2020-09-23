import React, { useEffect, useState } from 'react';
import './styles/OakDate.scss';
import { format } from 'date-fns';

interface Props {
  label?: string;
  id: string;
  data: any;
  errorData?: any;
  handleChange: any;
  errorFields?: any;
  disabled?: boolean;
  handleFocus?: Function;
  placeholder?: string;
  showTime?: boolean;
  min?: Date;
  max?: Date;
}

const OakDate = (props: Props) => {
  useEffect(() => {
    console.log(props.data[props.id]);
    console.log(typeof props.data[props.id]);
    if (props.data[props.id]) {
      console.log(format(new Date(props.data[props.id]), "yyyy-MM-dd'T'hh:mm"));
      setValue(format(new Date(props.data[props.id]), "yyyy-MM-dd'T'hh:mm"));
    }
    // setValue(new Date(props.data[props.id]));
  }, [props.data[props.id]]);

  const [value, setValue] = useState(props.data[props.id]);

  return (
    <div className="oak-date">
      <input
        disabled={props.disabled}
        className={
          (props.errorFields && props.errorFields[props.id] ? 'error' : '') +
          (props.disabled ? ' disabled' : '')
        }
        type={props.showTime ? 'datetime-local' : 'date'}
        name={props.id}
        id={props.id}
        value={value}
        onChange={props.handleChange}
        min={props.min ? format(props.min, "yyyy-MM-dd'T'hh:mm") : ''}
        max={props.max ? format(props.max, "yyyy-MM-dd'T'hh:mm") : ''}
      />
      <label
        htmlFor={props.id}
        className={props.data[props.id] ? 'active' : ''}
      >
        {props.label}
      </label>
      {props.errorData && props.errorData[props.id] && (
        <div className="text-field-error">
          <i className="material-icons">warning</i>
          {props.errorData[props.id]}
        </div>
      )}
    </div>
  );
};

export default OakDate;
