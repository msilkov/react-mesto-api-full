import { forwardRef } from "react";

const InputLink = forwardRef(
	({ placeholder, link, value, onChange, ...restProps }, ref) => {
		return (
			<fieldset className="popup__input-group">
				<input
					placeholder={placeholder}
					ref={ref}
					value={value}
					onChange={onChange}
					{...restProps}
				/>
				<span
					id="img-input-error"
					className="img-input-error popup__input-error"
				/>
			</fieldset>
		);
	}
);

export default InputLink;
