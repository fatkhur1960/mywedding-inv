/* eslint-disable no-useless-computed-key */
import classNames from "classnames";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    pattern?: {
        value: RegExp;
        message: string;
    };
    rows?: number;
    min?: number;
    max?: number;
    children?: any;
    readOnly?: boolean;
}

const FormTextarea: FC<Props> = ({
    label,
    name,
    placeholder,
    className,
    children,
    pattern,
    required = false,
    readOnly,
    rows = 5,
    min,
    max
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const isInvalid = (): boolean => {
        const params = name.split('.')
        if (params.length === 2) {
            const [arg0, arg1] = params
            const field: any | undefined = errors[arg0!];
            return Boolean(field?.[arg1!])
        }

        return Boolean(errors[name])
    }

    return (
        <div className={className + " group"}>
            <label className="font-medium text-secondary group-hover:text-primary" htmlFor={name}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <textarea
                    id={name}
                    placeholder={placeholder}
                    className={classNames(
                        `transition-all ease-in-out border-[1.5px] mt-2 mb-2 resize-none block focus:ring focus:ring-opacity-20 read-only:cursor-default read-only:bg-[#F4F7FF] appearance-none w-full rounded-md shadow-sm`, 
                        "hover:border-primary hover:ring-primary hover:ring-opacity-20 hover:bg-primary hover:bg-opacity-5",
                        {
                        ["border-red-500 invalid:ring-red-200 focus:border-red-500 focus:ring-red-200"]: isInvalid(),
                        ["border-slate-300 focus:border-primary focus:ring-primary focus:ring-opacity-20 focus:bg-primary focus:bg-opacity-5"]: !isInvalid(),
                    })}
                    {...register(name, {
                        required: required && "This field is required",
                        pattern,
                    })}
                    rows={rows}
                    minLength={min}
                    maxLength={max}
                    readOnly={readOnly}
                />
            </div>

            {children && <div className="text-gray-500 text-xs">{children}</div>}
        </div>
    );
};

export default FormTextarea;
