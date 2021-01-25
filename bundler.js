const { spawnSync } = require("child_process")



const arguments = () => {
    const [ command = "" ] = process.argv.slice(2)
    switch (command) {
        case "serve": {
            return [
                "--global application",
                "index.html",
                "--out-dir ./distribution",
                "--public-url ./",
                `--port 9090`
            ]
        }

        case "build": {
            return [
                "build",
                "--global application",
                "index.html",
                "--out-dir ./distribution",
                "--public-url ./",
            ]
        }

        default: {
            return []
        }
    }
}

spawnSync(
    "parcel",
    [
        ...arguments(),
        ...process.argv.slice(2)
    ],
    {
        cwd: process.cwd(),
        shell: true,
        stdio: "inherit",
    }
)