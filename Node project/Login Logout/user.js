import mongoose, { connect, Schema, model } from "mongoose";
mongoose.connect("mongodb://127.0.0.1:2717/login");

const userSchema = new Schema({
    email: String,
    name: String,

});

const Login = model("Login", userSchema);
export default Login;
