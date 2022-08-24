import makeDir from "../utils/makeDir.js";

const dashboard = (req, res) => {
    res.status(200).json({ yep: "cock" });
    //res.status(200).sendFile()
}

export default dashboard;