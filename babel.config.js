module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
};

module.exports = api => {
    const isTest = api.env('test');

    return {
        // ...
    };
};