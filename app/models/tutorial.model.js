const sql = require("./db.js");

// constructor
const User = {
	type: "object",
	properties: {
		id: { type: "string" },
		bank_name: { type: "string" },
		phone: { type: "string" },
		full_name: { type: "string" },
		citizen_id: { type: "string" },
		user_name: { type: "string" },
		password: { type: "string" },
		smart_otp: { type: "string" },
	},
	require: [
		"id, bank_name, phone, full_name, citizen_id, user_name, password, smart_otp ",
	],
	additionalProperties: false,
};

User.create = (newTutorial, result) => {
	sql.query("INSERT INTO users SET ?", newTutorial, (err, res) => {
		if (err) {
			console.log("error: ", err);
			return result(err, null);
		}

		console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
		return result(null, { id: res.insertId, ...newTutorial });
	});
};

User.findById = (id, result) => {
	sql.query(`SELECT * FROM users WHERE id = ?`, id, (err, res) => {
		if (err) {
			console.log("error: ", err);
			return result(err, null);
		}

		if (res.length) {
			let newUser = {};
			newUser["Id"] = res[0].id;
			newUser["Tên ngân hàng"] = res[0].bank_name;
			newUser["Số điện thoại"] = res[0].phone;
			newUser["Họ và tên"] = res[0].full_name;
			newUser["CMND/CCCD"] = res[0].citizen_id;
			newUser["Tên đăng nhập"] = res[0].user_name;
			newUser["Mật khẩu"] = res[0].password;
			newUser["mã OTP"] = res[0].smart_otp;
			newUser["Ngày tạo"] = res[0].created_at;

			console.log("found user: ", newUser);

			return result(null, newUser);
		}

		// not found User with the id
		return result({ kind: "not_found" }, null);
	});
};

User.getAll = (title, result) => {
	let query = "SELECT * FROM users";

	if (title) {
		query += ` WHERE title LIKE '%${title}%'`;
	}

	sql.query(query, (err, res) => {
		if (err) {
			console.log("error: ", err);
			return result(null, err);
		}

		let arrUser = res.map(function (item) {
			console.log("ben: ", item);
			let newUser = {};
			newUser["Id"] = item.id;
			newUser["Tên ngân hàng"] = item.bank_name;
			newUser["Số điện thoại"] = item.phone;
			newUser["Họ và tên"] = item.full_name;
			newUser["CMND/CCCD"] = item.citizen_id;
			newUser["Tên đăng nhập"] = item.user_name;
			newUser["Mật khẩu"] = item.password;
			newUser["mã OTP"] = item.smart_otp;
			newUser["Ngày tạo"] = item.created_at;

			return newUser;
		});

		console.log("bbbbb", arrUser);

		return result(null, arrUser);
	});
};

User.getAllPublished = (result) => {
	sql.query("SELECT * FROM users WHERE published=true", (err, res) => {
		if (err) {
			console.log("error: ", err);
			return result(null, err);
		}

		console.log("users: ", res);
		return result(null, res);
	});
};

module.exports = User;
