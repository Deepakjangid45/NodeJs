const jwt = require("jsonwebtoken");

function checkToken() {

    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;
    console.log("Chek auth Token middleware is calleds")

    if (!authToken || !refreshToken) {
        return res.status(401).json({ message: "Autrigaction failed : not auth token refrash token provide" });
    }

    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decode) => {
        // expire
        if (err) {
            // refresh token is expires  & token is expires
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (refreshErr, refreshDecode) => {
                if (refreshErr) {
                    // Both takens are invalid send an error messages and prompt for login
                    return res.status(401).json({ message: "Authtiogion failed :Both tokens are invalid" })
                }
                // refresh not expires & token is expired
                else {
                    const newAuthToken = jwt.sign({ userId: refreshDecode.userId }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" })
                    const newRefreshToken = jwt.sign({ userId: refreshDecode.userId }, process.env.JEW_REFRASHE_KEY, { expiresIn: "40m" });

                    res.cookie("authToken", newAuthToken, { httpOnly: true });
                    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
                    req.userId = refreshDecode.userId;
                    next();

                }
            })
        }
        // not expires
        else {
            req.userId = decode.userId
            next();
        }
    })
}

module.exports = checkToken;