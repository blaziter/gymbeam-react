const defaultLineTemplate = (file) => `export * from '${file}';`;
const fileTemplate = (files, lineTemplate = defaultLineTemplate) =>
    `${files.map((file) => lineTemplate(file)).join('\n')}`;

/**
 * BarrelGun configuration file
 * @see https://www.npmjs.com/package/barrelgun
 * @type {import("barrelgun").BarrelgunConfig["barrels"]} */
const barrels = [
    {
        path: [
            'src/app/**/_components/index.ts',
            'src/assets/index.ts',
            'src/components/index.ts',
            'src/components/**/index.ts',
        ],
        files: ['*.tsx'],
        fileTemplate: fileTemplate,
    },
    {
        path: ['src/lib/index.ts', 'src/lib/**/index.ts'],
        files: ['*.{ts,tsx}'],
        fileTemplate: fileTemplate,
    },
];

module.exports = { barrels };
