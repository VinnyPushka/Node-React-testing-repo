// routing main/
const fs = require("fs");

module.exports = function (app) {
    function isFolder(path) {
        return fs.lstatSync(path).isDirectory() && fs.existsSync(path);
    }

    app.get("/", (req, res) => {
        const base = "./files/";
        let path = "";

        if ("path" in req.query) {
            path = req.query.path;
        }

        let fullpath = base + path;

        if (isFolder(fullpath)) {
            //если переданный параметр - папка
            let files = fs.readdirSync(fullpath).map((item) => {
                const isDir = fs.lstatSync(fullpath + "/" + item).isDirectory();
                let size = 0;
                if (!isDir) {
                    size = fs.statSync(fullpath + "/" + item);
                }

                return {
                    name: item,
                    dir: isDir,
                    size: size.size ?? 0,
                };
            });
            res.json({
                path: path,
                result: true,
                files: files,
            });
        }
    });
};
