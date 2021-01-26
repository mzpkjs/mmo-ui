const { spawnSync } = require("child_process")



const arguments = () => {
    const [ command = "", input = "" ] = process.argv.slice(2)
    switch (command) {
        case "serve": {
            return [
                input,
                "--global application",
                "--out-dir ./distribution",
            ]
        }

        case "build": {
            return [
                "build",
                "--global application",
                input,
                "--out-dir ./distribution",
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