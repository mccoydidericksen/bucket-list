import clsx from "clsx";
import React, { useState } from "react";

function BucketForm(props) {
	let edit = props.edit ?? {};
	const [input, setInput] = useState(edit.text ?? "");
	let [eagerness, setEagerness] = useState(edit.eagerness ?? "");

	const eagernessLevel = ["high", "medium", "low"];

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!eagerness) {
			eagerness = "low";
		}

		props.onSubmit({
			id: edit.id ?? Math.floor(Math.random() * 1000),
			text: input,
			eagerness: eagerness,
		});

		setInput("");
		setEagerness("");
	};

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	// First we check to see if "edit" prop exists. If not, we render the normal form
	// If the prop "edit" exists, we know to render the update form instead
	return !props.edit ? (
		<div>
			<form className="bucket-form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Add to your bucket list"
					value={input}
					name="text"
					className="bucket-input"
					onChange={handleChange}
				></input>
				<div className="dropdown">
					<button className={clsx(`dropbtn`, eagerness)}>
						{eagerness || "Priority"}
					</button>
					<div className="dropdown-content">
						{/* TODO: Add an onClick event that will set the corresponding eagerness level from the `eagernessLevel` array */}
						<p onClick={() => setEagerness(eagernessLevel[0])}>Must do</p>
						<p onClick={() => setEagerness(eagernessLevel[1])}>Want to do</p>
						<p onClick={() => setEagerness(eagernessLevel[2])}>
							Take it or leave it
						</p>
					</div>
				</div>
				<button className="bucket-button">Add bucket list item</button>
			</form>
		</div>
	) : (
		<div>
			<h3>Update entry: {props.edit.value}</h3>
			<form className="bucket-form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder={props.edit.value}
					value={input}
					name="text"
					className="bucket-input"
					onChange={handleChange}
				></input>
				<div className="dropdown">
					<button className={clsx(`dropbtn`, eagerness)}>
						{eagerness || "Priority"}
					</button>
					<div className="dropdown-content">
						{/* TODO: Add an onClick event that will set the corresponding eagerness level from the `eagernessLevel` array */}
						<p onClick={() => setEagerness(eagernessLevel[0])}>Must do</p>
						<p onClick={() => setEagerness(eagernessLevel[1])}>Want to do</p>
						<p onClick={() => setEagerness(eagernessLevel[2])}>
							Take it or leave it
						</p>
					</div>
				</div>
				<button className="bucket-button">Update</button>
			</form>
		</div>
	);
}

export default BucketForm;
