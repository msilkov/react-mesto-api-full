export default function InputText({
	placeholder,
	value,
	onChange,
	...restProps
}) {
	return (
		<fieldset className="popup__input-group">
			<input
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				{...restProps}
			/>
			<span
				id="place-input-error"
				className="place-input-error popup__input-error"
			/>
		</fieldset>
	);
}
