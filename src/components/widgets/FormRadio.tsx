/* eslint-disable no-useless-computed-key */
import classNames from "classnames";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface FormRadioProps {
    label: string;
    name: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    options: string[];
    containerClassName?: string;
}

const FormRadio: FC<FormRadioProps> = ({ label, name, className, required = false, disabled, options, containerClassName }) => {
    const { register, formState: { errors } } = useFormContext()

    const isValid = errors[name] === undefined

    return (
        <div className={className}>
            <div className="mb-2">
                <label className="font-medium text-secondary" htmlFor={name}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            </div>

            <div className={classNames({
                ["inline-flex items-center space-x-4"]: !containerClassName,
                [`${containerClassName}`]: containerClassName,
                ['border-red-500']: !isValid,
                ['border-slate-300']: isValid,
            })}>
                {options.map((value, i) => {
                    return (
                        <label key={i} className="select-none transition-all ease-in-out hover:cursor-pointer text-base inline-flex items-center space-x-2 pl-4">
                            <input type="radio" className="checked:ring-primary text-primary hover:cursor-pointer checked:border-primary checked:bg-primary checked:hover:bg-primary focus:bg-primary" value={value} disabled={disabled} {...register(name, { required })} /><span>{value}</span>
                        </label>
                    )
                })}
            </div>
        </div>
    );
};

export default FormRadio;
