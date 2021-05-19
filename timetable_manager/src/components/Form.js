import React from 'react';
import Select from 'react-select'

const FormInput =  props => {
    return(
      <div>
    <label className={`${props.error && 'text-danger'} form-label`}>{props.label}</label>
    <input {...props}  
    placeholder={props.placeholder && !props.error ? props.placeholder : ''}
    className={`${props.error && 'error'} form-control form-control-sm`} 
    type={props.type ? props.type :'text'}    ></input>
    { props.error && <span className="error small text-danger">
        { props.error_meesage ? props.error_meesage : '* field required'}</span>}
    </div>);
}
const FormInputReadOnly =  props => {
    return(
      <div>
    <label className={`${props.error && 'text-danger'} form-label`}>{props.label}</label>
    <input {...props} 
    placeholder={props.placeholder && !props.error ? props.placeholder : ''}
    className={`${props.error && 'error'} form-control form-control-sm`} 
    type={props.type ? props.type :'text'}   readOnly ></input>
    { props.error && <span className="error small text-danger">
        { props.error_meesage ? props.error_meesage : '* field required'}</span>}
    </div>);
}

const FormSelect =  props => {
    return(
      <div>
    <label className={`${props.error && 'text-danger'} form-label`}>{props.label}</label>
       
    <select  {...props} 
    className={`${props.error && 'error'} form-control form-control-sm`} 
    >
    { props.options && props.options.map( (op,i) => {
           return (
           <option key={i} value={op.value} selected={props.selected && props.selected == op.value }>{op.label}</option>
           );
       }) } 
    </select>

    { props.error && <span className="error small text-danger">
        { props.error_meesage ? props.error_meesage : '* field required'}</span>}
    </div>);
}


const MultiFormSelect =  props => {
    return(
      <div>
    <label className={`${props.error && 'text-danger'} form-label`}>{props.label}</label>
       
    <Select placeholder={props.placeholder ? props.placeholder : ''}
     onChange={props.onChange}  
     isDisabled={props.isDisabled ? props.isDisabled : false }
     defaultValue={props.defaultValue ? props.defaultValue : [] }
     options={props.options}  isMulti className={`${props.error && 'error'} form-multi`} />

    { props.error && <span className="error small text-danger">
        { props.error_meesage ? props.error_meesage : '* field required'}</span>}
    </div>);
}

export const lightTheme = {
    body: '#9a8ba5',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#9a8ba5',
}
export const darkTheme = {
    body: '#9a8ba5',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#9a8ba5',
}

export {FormInput , FormSelect , MultiFormSelect, FormInputReadOnly};