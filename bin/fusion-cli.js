#!/usr/bin/env node

require('app-module-path').addPath(process.cwd() + '/node_modules');

require('@babel/register')({
        "plugins": [
            ["@babel/plugin-proposal-decorators", {"legacy": true}],
            "babel-plugin-dynamic-import-node"
        ],
        "presets": [
            [
                "@babel/preset-env",
                {
                    "targets": {
                        "node": "8"
                    }
                }
            ]
        ]
    }
);

require('./../run.js');
