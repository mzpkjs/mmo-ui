const { spawnSync } = require("child_process")



const arguments = () => {
    const [ command = "" ] = process.argv.slice(2)
    switch (command) {
        case "serve": {
            return [
                "--global application",
                process.env.npm_package_main,
                "--out-dir ./distribution",
                "--public-url ./distribution/",
                `--port ${process.env.npm_package_config_port}`
            ]
        }

        case "build": {
            return [
                "build",
                "--global application",
                process.env.npm_package_main,
                "--out-dir ./distribution",
                "--public-url ./distribution/",
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