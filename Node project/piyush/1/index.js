const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");

const multer = require('multer');

const storage = multer.diskStorage({
    // kon se folder main file ko store karna ha
    destination: function (req, file, cb) {
        // 1 error ko null kr dege
        return cb(null, "./uploads")
    },
    //
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage })

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
// form deta to pas karne k liye kyu ki deta json moan nhi mage mian aa rha ha
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    return res.render("homepage");
})

// dist storage

app.post("/uplord", upload.single("profileimage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/")

})

app.listen(PORT, () => {
    console.log(`app is running`)
})