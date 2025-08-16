import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Chọn một tùy chọn...",
  error,
  disabled = false,
  required = false,
  multiple = false,
  searchable = false,
  fullWidth = true,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchTerm) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, searchable]);

  const getDisplayValue = () => {
    if (multiple) {
      if (!value || value.length === 0) return placeholder;
      if (value.length === 1) {
        const option = options.find(opt => opt.value === value[0]);
        return option ? option.label : placeholder;
      }
      return `${value.length} mục đã chọn`;
    }
    
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const handleChange = (selectedValue) => {
    if (multiple) {
      const newValue = value || [];
      if (newValue.includes(selectedValue)) {
        onChange(newValue.filter(v => v !== selectedValue));
      } else {
        onChange([...newValue, selectedValue]);
      }
    } else {
      onChange(selectedValue);
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <Listbox value={value} onChange={onChange} disabled={disabled} multiple={multiple}>
        <div className="relative">
          <Listbox.Button
            className={`
              relative w-full cursor-default rounded-lg bg-white py-2.5 pl-4 pr-10 text-left border
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
              ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'text-gray-900'}
              focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors
              ${className}
            `}
          >
            <span className={`block truncate ${!value || (multiple && (!value || value.length === 0)) ? 'text-gray-400' : ''}`}>
              {getDisplayValue()}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
            {error && (
              <span className="pointer-events-none absolute inset-y-0 right-8 flex items-center pr-2">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              </span>
            )}
          </Listbox.Button>
          
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {searchable && (
                <div className="sticky top-0 bg-white p-2 border-b">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              
              {filteredOptions.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  {searchTerm ? 'Không tìm thấy kết quả' : 'Không có tùy chọn'}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                      }`
                    }
                    value={option.value}
                    onClick={() => !multiple && handleChange(option.value)}
                  >
                    {({ selected }) => {
                      const isSelected = multiple 
                        ? value && value.includes(option.value)
                        : selected;
                        
                      return (
                        <>
                          <span className={`block truncate ${isSelected ? 'font-medium' : 'font-normal'}`}>
                            {option.label}
                          </span>
                          {isSelected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      );
                    }}
                  </Listbox.Option>
                ))
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center mt-1">
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  searchable: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default Select;
